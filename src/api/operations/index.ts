import { request } from 'lib/request';
import * as API from 'api/market';

export type OperationsProps = {
  from: string;
  to: string;
  id?: number;
};

export type OperationTypes =
  | 'Buy'
  | 'BuyCard'
  | 'Sell'
  | 'BrokerCommission'
  | 'ExchangeCommission'
  | 'ServiceCommission'
  | 'MarginCommission'
  | 'OtherCommission'
  | 'PayIn'
  | 'PayOut'
  | 'Tax'
  | 'TaxLucre'
  | 'TaxDividend'
  | 'TaxCoupon'
  | 'TaxBack'
  | 'Repayment'
  | 'PartRepayment'
  | 'Coupon'
  | 'Dividend'
  | 'SecurityIn'
  | 'SecurityOut';

export type OperationStatus = 'Decline' | 'Done' | 'Progress';
export type InstrumentTypes = 'Stock' | 'Currency' | 'Bond' | 'Etf';
export type CurrencyTypes = 'USD' | 'RUB';

export type Operation = {
  commission: {
    currency: CurrencyTypes;
    value: number;
  };
  currency: CurrencyTypes;
  date: string;
  figi: string;
  id: string;
  instrumentType: InstrumentTypes;
  isMarginCall: boolean;
  operationType: OperationTypes;
  payment: number;
  price: number;
  quantity: number;
  status: OperationStatus;
  trades: string[];
};

type TableItem = {
  commissionValue: number;
  commissionCurrency: CurrencyTypes;
};

export type TableOperation = Operation &
  Partial<API.Stock> &
  Partial<TableItem>;

export type OperationsPayload = {
  payload: {
    operations: Operation[];
  };
};

export const getOperations = ({
  from,
  to,
  id,
}: OperationsProps): Promise<OperationsPayload> =>
  request({
    url: `/operations?from=${from}&to=${to}${
      id ? `&brokerAccountId=${id}` : ''
    }`,
  });
