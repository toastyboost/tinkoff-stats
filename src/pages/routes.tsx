import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { LoginPage, OperationsPage } from 'pages';
import { onlyAnon, onlyUsers } from 'features/user';

export const ROUTES = {
  login: {
    path: '/',
    component: LoginPage,
    guards: [onlyAnon()],
  },
  operations: {
    title: 'Операции',
    path: '/operations',
    component: OperationsPage,
    guards: [onlyUsers()],
  },
  notFoundForAnon: {
    component: () => <Redirect to="/" />,
    guards: [onlyAnon()],
    path: '*',
  },
  notFoundForUsers: {
    component: () => <Redirect to="/operations" />,
    guards: [onlyUsers()],
    path: '*',
  },
};

export const NAV_DATA = [
  {
    path: ROUTES.operations.path,
    title: ROUTES.operations.title,
  },
];
