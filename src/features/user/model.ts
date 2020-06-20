import { createEvent, createStore, createDomain, forward } from 'effector';
import { message } from 'antd';

import * as API from 'api/user';

import { errorCodes } from 'lib/constants';

export const sessionDomain = createDomain();

export type UserSession = {
  role: API.Roles | null;
};

const tokenInitial = {
  token: null,
  keep: false,
};

const userInitial = {
  role: null,
};

export const $token = createStore<API.UserToken>(tokenInitial);
export const $accounts = createStore<API.Account[]>([]);
export const $user = createStore<UserSession>(userInitial);

export const setToken = createEvent<API.UserToken>();
export const deleteToken = createEvent();

export const getAccounts = sessionDomain.createEffect<
  void,
  API.UserAccountsPayload
>();

getAccounts.use(API.getUser);

export const $isAccountsPending = getAccounts.pending;

$token
  .on(setToken, (_, payload) => payload)
  .on(deleteToken, () => tokenInitial);

$accounts.on(getAccounts.done, (_, { result }) => result.payload.accounts);

$user.on(getAccounts.done, (_, { result }) => {
  if (result.payload.accounts.length > 0) {
    return { role: 'USER' };
  }
});

sessionDomain.onCreateEffect((effect) => {
  $user.on(effect.fail, (user, payload) => {
    const err = payload.error as any;

    if (err.code === errorCodes.NOT_AUTHED) {
      return userInitial;
    }
    return user;
  });

  effect.fail.watch(() => {
    message.warning('Ошибка авторизации, проверьте токен');
  });
});

forward({
  from: deleteToken,
  to: getAccounts,
});

setToken.watch(({ token, keep }) => {
  if (token) {
    localStorage.setItem('token', token);
  }
  if (keep) {
    localStorage.setItem('keep', 'keep');
  }
});

deleteToken.watch(() => {
  localStorage.clear();
});
