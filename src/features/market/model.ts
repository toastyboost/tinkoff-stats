import { createStore, forward } from 'effector';

import * as API from 'api/market';

import { sessionDomain } from 'features/user';

export const marketDomain = sessionDomain.createDomain();

export const $stocks = createStore<API.Stock[]>([]);
export const $currencies = createStore<API.Currency[]>([]);
export const $usdPrice = createStore<number>(-1);

export const getStocks = marketDomain.createEffect<void, API.StocksPayload>();
export const getOrderbook = marketDomain.createEffect<
  API.Figi,
  API.Orderbook
>();

export const getCurrency = marketDomain.createEffect<
  void,
  API.CurrencyPayload
>();

getStocks.use(API.getStocks);
getCurrency.use(API.getCurrencies);
getOrderbook.use(API.getOrderbook);

$stocks.on(getStocks.done, (state, { result }) => result.payload.instruments);

$currencies.on(
  getCurrency.done,
  (state, { result }) => result.payload.instruments,
);

forward({
  from: getCurrency.done,
  to: getOrderbook.prepend((payload) => ({
    figi:
      payload.result.payload.instruments.find(
        (item) => item.name === 'Доллар США',
      )?.figi || '',
  })),
});

$usdPrice.on(getOrderbook.done, (_, { result }) => result.payload.lastPrice);
