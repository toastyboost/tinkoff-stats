import * as React from 'react';
import { useStore } from 'effector-react';
import moment from 'moment';

import 'moment/locale/ru';

import { $user, $isAccountsPending, useAuth } from 'features/user';
import { GenericTemplate } from 'ui/templates';

import { Routing } from './routing';

moment.locale('ru');

export const App = () => {
  const isAccountsPending = useStore($isAccountsPending);
  const user = useStore($user);

  useAuth();

  return (
    <GenericTemplate
      isAuthed={Boolean(user.role)}
      isPending={isAccountsPending}
    >
      <Routing />
    </GenericTemplate>
  );
};
