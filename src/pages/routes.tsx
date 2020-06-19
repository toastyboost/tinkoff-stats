import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { LoginPage, OperationsPage2 } from 'pages';
import { onlyAnon, onlyFor } from 'features/user';

export const ROUTES = {
  login: {
    path: '/',
    component: LoginPage,
    guards: [onlyAnon()],
  },
  operations: {
    title: 'Операции',
    path: '/operations',
    component: OperationsPage2,
    guards: [onlyFor(['CLIENT', 'ADMIN'])],
  },
  notFound: {
    component: () => <Redirect to="/operations" />,
    path: '*',
  },
};

export const NAV_DATA = [
  {
    path: ROUTES.operations.path,
    title: ROUTES.operations.title,
  },
];
