import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { NavContainer, NavLink, NavMenu, NavItem } from './styles';

type MenuItem = {
  path: string;
  title: string;
};

type MenuData = {
  data: Array<MenuItem>;
};

export const Nav: React.FC<MenuData> = ({ data }) => {
  const location = useLocation();
  const path = location.pathname.split('/').splice(0, 2).join('/');

  return (
    <NavContainer>
      <NavMenu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        selectedKeys={[path]}
      >
        {data.map(({ path, title }) => (
          <NavItem key={path}>
            <NavLink to={path}>{title}</NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </NavContainer>
  );
};
