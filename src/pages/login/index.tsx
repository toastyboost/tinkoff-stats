import * as React from 'react';
import styled from 'styled-components';

import { Button, Checkbox, Typography, Popover } from 'antd';

import { Form, Input } from 'ui/atoms';

import { tokenStore, keepStore, submitForm } from './model';

const fields = {
  token: {
    store: tokenStore,
    config: {
      placeholder: 'Токен',
      name: 'token',
      size: 'large' as const,
    },
  },
};

const PopContent: React.FC = () => (
  <PopContainer>
    <div>1. Перейдите по ссылке в Тинькофф</div>
    <div>2. Найдите секцию Токен для OpenAPI в нижней части сайта</div>
    <div>3. Скопируйте токен. Токен отображается только один раз.</div>
    <div>4. Вставьте токен в форму и нажмите «Войти»</div>
    <div>
      Полная инструкция для получению токена на&nbsp;
      <a
        href="https://tinkoffcreditsystems.github.io/invest-openapi/auth/"
        target="_blank"
        rel="noopener noreferrer"
      >
        официальном сайте Github Тинькофф
      </a>
    </div>
  </PopContainer>
);

export const LoginPage: React.FC = () => (
  <Container>
    <Typography.Title level={4}>Aналитика инвестиций</Typography.Title>
    <Form handleSubmit={submitForm}>
      <TokenInput {...fields.token} />
      <Actions>
        <Rember>
          <Checkbox
            defaultChecked={false}
            onChange={(e) => keepStore.changed(e.target.checked)}
          >
            Сохранить токен
          </Checkbox>
          <Popover content={PopContent} title="Как получить токен">
            <GetToken>
              <a
                href="https://www.tinkoff.ru/invest/settings"
                target="_blank"
                rel="noopener noreferrer"
              >
                Получить токен
              </a>
            </GetToken>
          </Popover>
        </Rember>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <Warning>
          <div>
            Приложение использует токен <b>только</b> для запроса данных по
            операциям и портфолио.
          </div>
          <div>
            Отозвать токен можно в&nbsp;
            <a
              href="https://id.tinkoff.ru/account"
              target="_blank"
              rel="noopener noreferrer"
            >
              ЛК Тинькофф
            </a>
          </div>
        </Warning>
      </Actions>
    </Form>
  </Container>
);

const Container = styled.div`
  margin: auto;
  background-color: #fff;
  padding: 24px 24px 24px 24px;
  border-radius: 3px;
  min-width: 320px;
  max-width: 360px;

  h4 {
    text-align: center;
    padding-bottom: 8px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  button {
    width: 100%;
    height: 40px;
  }
`;

const Rember = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;

  a {
    color: var(--blue);
  }
`;

const TokenInput = styled(Input)`
  text-align: center;
`;

const GetToken = styled.div`
  font-size: 14px;
`;

const PopContainer = styled.div`
  max-width: 260px;

  div {
    margin-bottom: 6px;
  }

  a {
    text-decoration: underline;
    color: var(--blue);
  }
`;

const Warning = styled.div`
  font-size: 14px;
  padding-top: 14px;

  div {
    margin-bottom: 6px;
  }

  a {
    text-decoration: underline;
    color: var(--blue);
  }
`;
