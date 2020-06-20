import * as React from 'react';
import { getAccounts, setToken } from './model';

const token = localStorage.getItem('token');
const keep = localStorage.getItem('keep');

export const useAuth = () => {
  React.useEffect(() => {
    if (token) {
      setToken({ token, keep: keep === 'keep' });
    }
    getAccounts();
  }, []);
};

window.onbeforeunload = function () {
  const clouserToken = localStorage.getItem('token');
  const closureKeep = localStorage.getItem('keep');

  if (!closureKeep || !clouserToken) {
    localStorage.clear();
  }
};
