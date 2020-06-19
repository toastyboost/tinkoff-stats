import { createStore, createDomain, createEvent, sample } from 'effector';

import * as API from 'api/portfolio';

import { getSum } from 'lib/math';

export const portfolioDomain = createDomain();

export const $portfolio = createStore<API.PortfolioItem[] | null>(null);

export const $portfolioProfit = createStore<number>(0);
export const getPortfolioProfitByTickers = createEvent<string[]>();

export const getPortfolio = portfolioDomain.createEffect<
  void,
  API.PortfolioPayload
>();

getPortfolio.use(API.getPortfolio);

$portfolio.on(getPortfolio.done, (_, { result }) => result.payload.positions);

sample({
  source: $portfolio,
  clock: getPortfolioProfitByTickers,
  fn: (portfolio, tickers) => {
    const ops =
      portfolio
        ?.filter(
          (item) =>
            item.expectedYield.currency === 'USD' &&
            tickers.includes(item.ticker),
        )
        .map(
          (item) =>
            item.expectedYield.value +
            item.averagePositionPrice.value * item.balance,
        ) || [];
    console.log(
      portfolio?.filter(
        (item) =>
          item.expectedYield.currency === 'USD' &&
          tickers.includes(item.ticker),
      ),
      ops,
    );
    return getSum(ops);
  },
  target: $portfolioProfit,
});
