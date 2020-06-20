import * as React from 'react';
import { BankOutlined } from '@ant-design/icons';
import { deleteToken } from 'features/user';

import { Nav } from 'ui/molecules';
import { Logo } from 'ui/atoms';

import { HeaderContainer, LogoutButton } from './styles';
import { NAV_DATA } from 'pages/routes';

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/" icon={<BankOutlined />} />
      <Nav data={NAV_DATA} />
      <LogoutButton type="primary" onClick={() => deleteToken()}>
        Выйти
      </LogoutButton>
    </HeaderContainer>
  );
};
