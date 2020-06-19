import { createStore, createDomain, forward } from 'effector';

import * as API from 'api/operations';

export const operationsDomain = createDomain();

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
