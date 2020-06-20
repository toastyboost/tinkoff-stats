import { request } from 'lib/request';

export type Roles = 'USER';

export type UserToken = {
  token: string | null;
  keep: boolean;
};

export type Account = {
  brokerAccountType: string;
  brokerAccountId: string;
};

export type UserAccountsPayload = {
  payload: {
    accounts: Account[];
  };
};

export const getUser = (): Promise<UserAccountsPayload> =>
  request({
    method: 'get',
    url: '/user/accounts',
  });

export type Credentials = {
  login: string;
  password: string;
};

export const logOut = (): Promise<void> =>
  request({
    method: 'get',
    url: '/user/logout',
  });

export const logIn = (): Promise<void> =>
  request({
    method: 'post',
    url: '/user/login',
  });
