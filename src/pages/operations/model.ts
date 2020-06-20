import { createStore, createEvent, forward, combine } from 'effector';

import * as API from 'api/operations';
import { getOperations } from 'features/operations';
import {
  getStocks,
  getCurrency,
  getOrderbook,
  $usdPrice,
} from 'features/market';
import { getPortfolio, $portfolio } from 'features/portfolio';

import {
  instrumentTranslations,
  operationTranslations,
  statusTranslations,
  lossTypes,
  profitTypes,
} from 'lib/constants';

import { formatNumber } from 'lib/format';

type Filter = {
  text: string;
  value: string;
};

type TableFilters = {
  [P in keyof API.TableOperation]?: Filter[];
};
type ActiveFilters = {
  [P in keyof API.TableOperation]?: string[];
};

type OperationStats = {
  tradingProfit: number;
  totalCommisions: number;
  middleBuy: number;
  middleSell: number;
};

export const handleFilters = createEvent<any>();
export const includePortfolio = createEvent<boolean>();

export const $operationStats = createStore<OperationStats>({
  tradingProfit: 0,
  totalCommisions: 0,
  middleBuy: 0,
  middleSell: 0,
});

export const $operationsSource = createStore<API.TableOperation[]>([]);
export const $tableFilters = createStore<TableFilters>({});

export const initialFilters = {
  status: ['Done'],
};

export const $currentFilter = createStore<ActiveFilters>({
  status: initialFilters.status,
});

export const $potrfolioProfit = createStore<number>(0);
export const $isPortfolioIncluded = createStore<boolean>(false);

const ignore = ['BrokerCommission', 'PayIn', 'Currency'];

$operationsSource
  .on(getOperations.done, (_, { result }) =>
    result.payload.operations.filter(
      (item) =>
        !ignore.includes(item.operationType) &&
        !ignore.includes(item.instrumentType),
    ),
  )
  .on(getStocks.done, (operations, { result }) => {
    const stonks = result.payload.instruments;
    const stonksOperations = operations.map((operation) => {
      const found = stonks.find(
        (intstrument) => intstrument.figi === operation.figi,
      );

      return {
        ...operation,
        ...found,
        commissionValue: operation.commission?.value || 0,
        commissionCurrency: operation.commission?.currency || 0,
      };
    });

    return stonksOperations;
  });

export const $operationsTable = combine(
  $operationsSource,
  $currentFilter,
  $usdPrice,
  (operations, filters: any, usdPrice) => {
    const filtersFields =
      (Object.keys(filters) as (keyof API.TableOperation)[]) || [];

    const filteredOperations = operations.filter(
      (operation: API.TableOperation) =>
        filtersFields
          .map((filterKey) =>
            Boolean(filters[filterKey])
              ? filters[filterKey].includes(operation[filterKey])
              : true,
          )
          .every(Boolean),
    );

    const sameCurrency = filteredOperations.map((item) => {
      return {
        ...item,
        ...((item.currency === 'RUB' ||
          (item.ticker === 'TCS' && item.commissionCurrency === 'RUB')) && {
          currency: 'USD' as const,
          price: formatNumber(item.price / usdPrice),
          payment: formatNumber(item.payment / usdPrice),
          commissionValue:
            formatNumber((item?.commissionValue || 0) / usdPrice) || 0,
          commission: {
            currency: 'USD' as const,
            value: formatNumber(item.commission?.value / usdPrice),
          },
        }),
      };
    });

    return sameCurrency;
  },
);

$currentFilter.on(handleFilters, (_, payload) => payload);
$isPortfolioIncluded.on(includePortfolio, (_, payload) => payload);

// stats

forward({
  from: $operationsTable.map((operations) => {
    const buyOperations = operations.filter((item) =>
      lossTypes.includes(item.operationType),
    );

    const sellOperations = operations.filter((item) =>
      profitTypes.includes(item.operationType),
    );

    const tradingProfit = operations
      .map((item) => item.payment)
      .reduce((a, b) => a + b, 0);

    const totalCommisions = operations
      .map((item) => item?.commissionValue || 0)
      .reduce((a, b) => a + b, 0);

    const middleBuy = buyOperations
      .map((item) => item?.price || 0)
      .reduce((a, b) => a + b, 0);

    const middleSell = sellOperations
      .map((item) => item?.price || 0)
      .reduce((a, b) => a + b, 0);

    return {
      tradingProfit: formatNumber(tradingProfit) || 0,
      totalCommisions: Math.abs(formatNumber(totalCommisions)) || 0,
      middleBuy: Math.abs(formatNumber(middleBuy / buyOperations.length)) || 0,
      middleSell: formatNumber(middleSell / sellOperations.length) || 0,
    };
  }),
  to: $operationStats,
});

// all filters

forward({
  from: $operationsSource.map((operations) => {
    const status = [
      ...new Set(operations.map((o) => o.status)),
    ].map((item) => ({ text: statusTranslations[item], value: item }));

    const ticker = [...new Set(operations.map((o) => o.ticker))]
      .map((item = '') => ({ text: item, value: item }))
      .filter((item) => item.value !== '');

    const instrumentType = [
      ...new Set(operations.map((o) => o.instrumentType)),
    ].map((item) => ({ text: instrumentTranslations[item], value: item }));

    const payment = [
      ...new Set(operations.map((o) => o.currency)),
    ].map((item) => ({ text: item, value: item }));

    const operationType = [
      ...new Set(operations.map((o) => o.operationType)),
    ].map((item) => ({
      text: operationTranslations[item],
      value: item,
    }));

    return {
      status,
      ticker,
      instrumentType,
      payment,
      operationType,
    };
  }),
  to: $tableFilters,
});

// include portfolio

forward({
  from: combine(
    $portfolio,
    $operationsTable,
    $isPortfolioIncluded,
    (portfolio, operations) => {
      const tickers = [
        ...new Set(operations.map((item) => item?.ticker || '')),
      ];

      const portfolioBalance =
        portfolio
          ?.filter((item) => tickers.includes(item.ticker))
          .map(
            (item) =>
              item.averagePositionPrice.value * item.balance +
              item.expectedYield.value,
          )
          .reduce((a, b) => a + b, 0) || 0;

      return formatNumber(portfolioBalance);
    },
  ),
  to: $potrfolioProfit,
});

export const $isTableDataPending =
  getOperations.pending ||
  getStocks.pending ||
  getCurrency.pending ||
  getOrderbook.pending;

forward({
  from: getOperations.done,
  to: getPortfolio,
});

forward({
  from: getOperations.done,
  to: getStocks,
});
