import moment from 'moment';

export const BREAKPOINTS = {
  DESKTOP: 1024,
  TABLET: 768,
  SMARTPHONE: 425,
  PHONE: 320,
};

export const errorCodes = {
  NOT_AUTHED: 401,
};

export const absoluteCenterPosition: any = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  margin: 'auto',
  width: 40,
  height: 40,
};

export const operationTranslations = {
  Buy: 'Покупка (cо счёта)',
  BuyCard: 'Покупка (с карты)',
  Sell: 'Продажа (со счёта)',
  BrokerCommission: 'Комиссия (брокер)',
  ExchangeCommission: 'Комиссия (биржа)',
  ServiceCommission: 'Комиссия (сервис)',
  MarginCommission: 'Комиссия (плечо)',
  OtherCommission: 'Другая комиссия',
  PayIn: 'Пополнение',
  PayOut: 'Снятие',
  Tax: 'Налог',
  TaxLucre: 'Налог (прибыль)',
  TaxDividend: 'Налог (дивиденды)',
  TaxCoupon: 'Налог (купоны)',
  TaxBack: 'Возврат налога',
  Repayment: 'Погашение',
  PartRepayment: 'Частичное погашение',
  Coupon: 'Купон',
  Dividend: 'Дивиденды',
  SecurityIn: 'SecurityIn',
  SecurityOut: 'SecurityOut',
};

export const operationTypes = [
  'Buy',
  'Sell',
  'BuyCard',
  'BrokerCommission',
  'ExchangeCommission',
  'ServiceCommission',
  'MarginCommission',
  'OtherCommission',
  'PayIn',
  'PayOut',
  'Tax',
  'TaxLucre',
  'TaxDividend',
  'TaxCoupon',
  'TaxBack',
  'Repayment',
  'PartRepayment',
  'Coupon',
  'Dividend',
  'SecurityIn',
  'SecurityOut',
];

export const instrumentTranslations = {
  Stock: 'Акции',
  Currency: 'Валюта',
  Bond: 'Облигация',
  Etf: 'Фонды',
};

export const statusTranslations = {
  Done: 'Выполнено',
  Decline: 'Отклонено',
  Progress: 'Progress',
};

export const instrumentTypes = ['Stock', 'Currency', 'Bond', 'Etf'];

export const operationTypeColor = {
  Buy: '#ff4d4f',
  Sell: '#52c41a',
  BrokerCommission: '#faad14',
  PayIn: '#2db7f5',
  PayOut: '#faad14',
  Dividend: '#faad14',
  BuyCard: '#ff4d4f',
  SellCard: '#52c41a',
};

export const currencySymbols = {
  USD: '$',
  RUB: '₽',
};

export const commisionTypes = [
  'BrokerCommission',
  'ExchangeCommission',
  'ServiceCommission',
  'MarginCommission',
  'OtherCommission',
];

export const lossTypes = ['Buy', 'BuyCard'];
export const profitTypes = ['Sell'];

export const timeRanges = [
  {
    range: 'today',
    color: '#4dc21f',
    label: 'Сегодня',
    from: moment().startOf('day').add(2, 'hours').toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'yesterday',
    color: '#4dc21f',
    label: 'Вчера',
    from: moment()
      .subtract('1', 'days')
      .startOf('day')
      .add(2, 'hours')
      .toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'weekAgo',
    color: '#47c03f',
    label: 'Неделя',
    from: moment()
      .startOf('day')
      .subtract('7', 'days')
      .add(2, 'hours')
      .toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'monthAgo',
    color: '#42be5e',
    label: 'Месяц',
    from: moment()
      .startOf('day')
      .subtract('1', 'month')
      .add(2, 'hours')
      .toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'quaterAgo',
    color: '#3dbd7d',
    label: 'Квартал',
    from: moment()
      .startOf('day')
      .subtract('4', 'month')
      .add(2, 'hours')
      .toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'yearAgo',
    color: '#38bb9c',
    label: 'Год',
    from: moment().startOf('year').add(2, 'hours').toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
  {
    range: 'all',
    color: '#32b9bc',
    label: 'Всё время',
    from: moment()
      .startOf('day')
      .subtract('6', 'year')
      .add(2, 'hours')
      .toISOString(),
    to: moment().endOf('day').add(2, 'hours').toISOString(),
  },
];

export const getRangeByName = (rangeName: string) => {
  const initialDate = {
    from: '',
    to: '',
  };

  const date = timeRanges.find((item) => item.range === rangeName);

  return date || initialDate;
};
