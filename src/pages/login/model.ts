import { createEvent, sample, guard, forward } from 'effector';
import { createField, createInput, createForm } from 'effector-form';

import { setToken, getAccounts } from 'features/user';
import { passValidator } from 'lib/validators';

export const submitForm = createEvent<void>();
export const resetForm = createEvent<void>();

export const tokenStore = createInput({
  name: 'token',
  validator: passValidator,
});

export const keepStore = createField<boolean>({
  name: 'keep',
  initialValue: false,
});

export const loginForm = createForm({
  name: 'loginForm',
  fields: [tokenStore, keepStore],
  submit: submitForm,
  reset: resetForm,
});

guard({
  source: sample(loginForm.$values, submitForm),
  filter: loginForm.$isValid,
  target: setToken,
});

forward({
  from: setToken,
  to: resetForm,
});

forward({
  from: setToken,
  to: getAccounts,
});
