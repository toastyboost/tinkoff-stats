import { request } from 'lib/request';

import * as API from 'api/operations';

export type Figi = {
  figi: string;
};

export type TickerByFigiPayload = {
  payload: TickerByFigi;
};

export type Stock = {
  figi: string;
  ticker: string;
  isin: string;
  minPriceIncrement: number;
  lot: number;
  currency: API.CurrencyTypes;
  name: string;
  type: API.InstrumentTypes;
};

export type StocksPayload = {
  payload: {
    instruments: Stock[];
  };
};

export const getStocks = (): Promise<StocksPayload> =>
  request({
    url: `/market/stocks`,
  });

export type Currency = {
  figi: string;
  ticker: string;
  isin: string;
  minPriceIncrement: number;
  lot: number;
  currency: API.CurrencyTypes;
  name: string;
  type: API.InstrumentTypes;
};

export type CurrencyPayload = {
  payload: {
    instruments: Currency[];
  };
};

export const getCurrencies = (): Promise<CurrencyPayload> =>
  request({
    url: `/market/currencies`,
  });

export type TradeStatus = 'NormalTrading' | string;

export type Orderbook = {
  trackingId: string;
  status: string;
  payload: {
    figi: string;
    depth: number;
    bids: [
      {
        price: number;
        quantity: number;
      },
    ];
    asks: [
      {
        price: number;
        quantity: number;
      },
    ];
    tradeStatus: TradeStatus;
    minPriceIncrement: number;
    faceValue: number;
    lastPrice: number;
    closePrice: number;
    limitUp: number;
    limitDown: number;
  };
};

export const getOrderbook = ({ figi }: Figi): Promise<Orderbook> =>
  request({
    url: `/market/orderbook?figi=${figi}&depth=1`,
  });

export type TickerByFigi = {
  figi: string;
  ticker: string;
  isin: string;
  minPriceIncrement: number;
  lot: number;
  currency: string;
  name: string;
  type: string;
};

export const getTickerByFigi = ({ figi }: Figi): Promise<TickerByFigiPayload> =>
  request({
    url: `/market/search/by-figi?figi=${figi}`,
  });
