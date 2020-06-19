import { request } from 'lib/request';

import * as API from 'api/operations';

export type PortfolioItem = {
  figi: string;
  ticker: string;
  isin: string;
  instrumentType: string;
  balance: number;
  blocked: number;
  expectedYield: {
    currency: string;
    value: number;
  };
  lots: number;
  averagePositionPrice: {
    currency: API.CurrencyTypes;
    value: number;
  };
  averagePositionPriceNoNkd: {
    currency: string;
    value: number;
  };
  name: string;
};

export type PortfolioPayload = {
  payload: { positions: PortfolioItem[] };
};

export const getPortfolio = (): Promise<PortfolioPayload> =>
  request({
    url: `/portfolio`,
  });
