import * as React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import { useStore } from 'effector-react';
import { Table, Tooltip, Badge, Tag, Switch, DatePicker } from 'antd';

import * as API from 'api/operations';
import { getOperations } from 'features/operations';
import { getCurrency } from 'features/market';
import { addSorter, addFilter } from 'lib/table';
import { getRangeByName } from 'lib/constants';

import {
  $operationsTable,
  $isTableDataPending,
  $tableFilters,
  $operationStats,
  $potrfolioProfit,
  handleFilters,
  includePortfolio,
  $isPortfolioIncluded,
  $currentFilter,
} from './model';

import {
  instrumentTranslations,
  operationTranslations,
  currencySymbols,
  timeRanges,
} from 'lib/constants';

import { formatNumber, getSignColor } from 'lib/format';

const defaultRange = getRangeByName('weekAgo');

const handlePickerDateChange = (_: any, dateStrings: string[]) => {
  const from = moment(dateStrings[0]).startOf('day').toISOString();
  const to = moment(dateStrings[1]).endOf('day').toISOString();

  getOperations({
    from,
    to,
  });
};

export const OperationsPage: React.FC = () => {
  const [currentRange, setRange] = React.useState('weekAgo');

  const operationsTable = useStore($operationsTable);
  const isTableDataPending = useStore($isTableDataPending);
  const tableFilters = useStore($tableFilters);
  const potrfolioProfit = useStore($potrfolioProfit);
  const isPortfolioIncluded = useStore($isPortfolioIncluded);
  const currentFilter = useStore($currentFilter);

  const { tradingProfit, totalCommisions, middleBuy, middleSell } = useStore(
    $operationStats,
  );

  const totalProfit = isPortfolioIncluded
    ? formatNumber(tradingProfit + potrfolioProfit)
    : tradingProfit;

  React.useEffect(() => {
    getCurrency();
    getOperations(defaultRange);
  }, []);

  const operationsColumns = [
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      filters: tableFilters.status,
      filteredValue: currentFilter.status,
      className: 'status-th-td',
      render: (_: string, item: API.TableOperation) => (
        <Tooltip title={item.id} arrowPointAtCenter>
          <Badge status={item.status === 'Done' ? 'success' : 'error'} />
        </Tooltip>
      ),
      width: 41,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      className: 'date-th-td',
      ...addSorter('date'),
      render: (date: string) => (
        <Tag style={{ marginRight: 0 }}>
          {moment(date).format('DD.MM.YYYY')} →{' '}
          {moment(date).format('HH:mm:ss')}
        </Tag>
      ),
      width: 180,
    },
    {
      title: <>Тип</>,
      dataIndex: 'instrumentType',
      key: 'instrumentType',
      className: 'instrument-th-td',
      filters: tableFilters.instrumentType,
      filteredValue: currentFilter.instrumentType,
      render: (_: string, item: API.TableOperation) =>
        instrumentTranslations[item.instrumentType],
      width: 120,
    },
    {
      title: <>Тикер</>,
      dataIndex: 'ticker',
      key: 'ticker',
      className: 'ticker-th-td',
      filters: tableFilters.ticker,
      filteredValue: currentFilter.ticker,
      ...addFilter<API.TableOperation>(['ticker']),
      render: (ticker: string) => <Tag>{ticker}</Tag>,
      width: 120,
    },
    {
      title: <>Сумма</>,
      dataIndex: 'payment',
      key: 'payment',
      className: 'payment-th-td',
      ...addSorter('payment'),
      render: (_: string, item: API.TableOperation) => (
        <Tag color={getSignColor(item.payment)}>
          {item.payment} {currencySymbols[item.currency]}
        </Tag>
      ),
      width: 120,
    },
    {
      title: <>Лоты</>,
      dataIndex: 'quantity',
      key: 'quantity',
      className: 'quantity-th-td',
      render: (_: string, item: API.TableOperation) => (
        <>
          <Tag color="blue">
            {item.quantity} ✕ {formatNumber(item.price)}&nbsp;
            {currencySymbols[item.currency]}
          </Tag>
        </>
      ),
      width: 150,
    },
    {
      title: <>Ком.</>,
      dataIndex: 'commissionValue',
      key: 'commissionValue',
      className: 'commisition-th-td',
      render: (com: number, item: API.TableOperation) => (
        <Tag color="var(--red)">
          {Math.abs(formatNumber(com))} {currencySymbols[item.currency]}
        </Tag>
      ),
      width: 120,
    },
    {
      title: <>Операция</>,
      dataIndex: 'operationType',
      key: 'operationType',
      filters: tableFilters.operationType,
      filteredValue: currentFilter.operationType,
      render: (_: string, item: API.TableOperation) =>
        operationTranslations[item.operationType],
      width: 200,
    },
    {
      title: 'Название компании',
      dataIndex: 'name',
      key: 'name',
      // width: 300,
    },
  ];

  return (
    <Container>
      <Table
        title={() => {
          const dates = getRangeByName(currentRange);

          return (
            <>
              <Options>
                <Range>
                  <DatePicker.RangePicker
                    placeholder={['Начало', 'Конец']}
                    onChange={handlePickerDateChange}
                    style={{
                      minWidth: '375px',
                    }}
                  />
                </Range>
                <Tags>
                  {timeRanges.map(({ range, label }, key) => (
                    <Tag
                      key={key}
                      color={currentRange === range ? '#108ee9' : ''}
                      onClick={() => {
                        setRange(range);
                        getOperations(getRangeByName(range));
                      }}
                    >
                      {label}
                    </Tag>
                  ))}
                </Tags>
                <Switches>
                  <Switch
                    defaultChecked={isPortfolioIncluded}
                    onChange={(isChecked) => {
                      includePortfolio(isChecked);
                    }}
                  />
                  &nbsp;&nbsp;Учитывать портфель
                </Switches>
              </Options>
              <Stats>
                <div className="status-th"></div>
                <div className="date-th">
                  <Tag>
                    с {moment(dates.from).format('D MMMM')} по{' '}
                    {moment(dates.to).format('D MMMM')}
                  </Tag>
                </div>
                <div className="type-th "></div>
                <div className="price-th">
                  <span className="label">Результат торговли</span>
                  <Tag color={getSignColor(totalProfit)}>
                    {totalProfit}
                    &nbsp;
                    {currencySymbols.USD}
                  </Tag>
                </div>
                <div className="quantity-th">
                  <span className="label">
                    Средняя
                    <br />
                    покупка/продажа
                  </span>
                  <Tag color="var(--red)">{middleBuy}</Tag>
                  &nbsp;~&nbsp;
                  <Tag color="var(--green)">{middleSell}</Tag>
                </div>
                <div className="commisition-th">
                  <span className="label">Общая комиссия</span>
                  <Tag color="var(--red)">
                    {totalCommisions}&nbsp;{currencySymbols.USD}
                  </Tag>
                </div>
                <div className="other-th"></div>
              </Stats>
            </>
          );
        }}
        columns={operationsColumns}
        loading={isTableDataPending}
        dataSource={isTableDataPending ? [] : operationsTable}
        rowKey="id"
        onChange={(pagination, filters) => {
          handleFilters(filters);
        }}
        showSorterTooltip={false}
        pagination={{ pageSize: 30 }}
      />
    </Container>
  );
};

export const Container = styled.section`
  .ant-tag {
    margin-right: 0;
  }

  .ticker-th-td,
  .instrument-th-td,
  .date-th-td {
    text-align: center;
  }

  .payment-th-td,
  .quantity-th-td,
  .commisition-th-td {
    border-left: 1px solid #f0f0f0;
    text-align: center;
  }

  th.ticker-th-td,
  th.payment-th-td,
  th.quantity-th-td,
  th.commisition-th-td {
    text-align: left;
  }

  .commisition-th-td {
    border-right: 1px solid #f0f0f0;
  }

  .status-th-td {
    padding: 0;
    text-align: center;

    .ant-table-filter-column-title {
      padding: 0;
    }

    .ant-table-filter-trigger-container {
      left: 0;
    }
  }

  .ant-table-title {
    padding: 0;
  }
`;

export const Stats = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  background-color: #f3f3f3;
  border: 1px solid #e4e4e4;
  border-bottom: 1px solid #f0f0f0;

  .price-th,
  .quantity-th,
  .price-th,
  .commisition-th,
  .date-th,
  .other-th {
    padding: 12px 12px 11px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-th {
    width: 41px;
  }

  .date-th {
    width: 180px;
    flex-wrap: wrap;
  }

  .type-th {
    width: 240px;
  }

  .price-th {
    width: 120px;
  }

  .quantity-th {
    width: 150px;
  }

  .commisition-th {
    width: 120px;
  }

  .price-th,
  .quantity-th,
  .commisition-th {
    display: flex;
    flex-wrap: wrap;

    span.label {
      width: 100%;
      text-align: center;
      line-height: 1;
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
  }
`;

export const Options = styled.div`
  width: 100%;
  display: flex;
  padding: 18px 0;
`;

export const Range = styled.div`
  padding: 0 16px;
`;

export const Tags = styled.div`
  padding: 0 16px;

  .ant-tag {
    cursor: pointer;
    line-height: 30px;
    margin-right: 9px;
  }
`;

export const Switches = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;
