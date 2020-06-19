import * as React from 'react';
import { useStore } from 'effector-react';
import moment from 'moment';

import 'moment/locale/ru';

import { $user, $isUserPending, useAuth } from 'features/user';
import { GenericTemplate } from 'ui/templates';

import { Routing } from './routing';

moment.locale('ru');

export const App = () => {
  const isUserPending = useStore($isUserPending);
  const user = useStore($user);

  return (
    <GenericTemplate isAuthed={Boolean(user.role)} isPending={isUserPending}>
      <Routing />
    </GenericTemplate>
  );
};
