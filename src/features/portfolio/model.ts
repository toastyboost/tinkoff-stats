import { createStore } from 'effector';

import * as API from 'api/portfolio';
import { sessionDomain } from 'features/user';

export const portfolioDomain = sessionDomain.createDomain();

export const $portfolio = createStore<API.PortfolioItem[] | null>(null);

export const getPortfolio = portfolioDomain.createEffect<
  void,
  API.PortfolioPayload
>();

getPortfolio.use(API.getPortfolio);

$portfolio.on(getPortfolio.done, (_, { result }) => result.payload.positions);
