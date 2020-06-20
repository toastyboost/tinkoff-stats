import { Guard } from 'router-guards';
import { UserSession } from './model';

export function onlyAnon(): Guard<UserSession> {
  return (route, context) => (context && context.role ? null : route);
}

export function onlyUsers(): Guard<UserSession> {
  return (route, context) => (context && context.role ? route : null);
}
