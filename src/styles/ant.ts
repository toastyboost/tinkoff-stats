import { createGlobalStyle } from 'styled-components';

export const AntStylesOveride = createGlobalStyle`
  .ant-layout {
    min-height: 100vh;
    background: var(--body-bg) !important;
  }

  .ant-spin-nested-loading > div > .ant-spin {
    max-height: 100%;
  }

  .ant-table-column-sorters {
    width: 100%;
  }
  
  .ant-table-column-sorter {
    margin-left: auto;
  }

  .ant-table-filter-dropdown .ant-dropdown-menu {
    max-height: calc(516px - 130px);
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent;
    box-shadow: inset 0px -4px 0 #1890ff;
    transition: 0.3s;
  }

  .ant-badge-status-text {
    margin-left: 0;
  }
`;
