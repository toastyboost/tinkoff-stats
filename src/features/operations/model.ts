import { createStore } from 'effector';

import * as API from 'api/operations';

import { sessionDomain } from 'features/user';

export const operationsDomain = sessionDomain.createDomain();

export const $operations = createStore<API.Operation[]>([]);

export const getOperations = operationsDomain.createEffect<
  API.OperationsProps,
  API.OperationsPayload
>();

getOperations.use(API.getOperations);

$operations.on(
  getOperations.done,
  (_, { result }) => result.payload.operations,
);

// stockImage: `http://static.tinkoff.ru/brands/traiding/${
//         imagesDomain[item.instrumentType]
//       }x160.png`
