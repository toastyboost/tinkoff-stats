import * as React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';

type FilterDropdown = {
  setSelectedKeys: (keys: string[]) => string;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
};

type SearchTypes<T> = {
  ref: React.RefObject<any>;
  placeholder: string;
  state: any;
};

export function addSearch<T>({ placeholder, ref, state }: SearchTypes<T>) {
  const [visible, setVisible] = state;

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
    }: FilterDropdown) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={ref}
          placeholder={placeholder}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm();
            setVisible(true);
          }}
          onPressEnter={confirm}
          style={{ width: 208, marginBottom: 8, display: 'block' }}
        />
        <Button
          onClick={() => {
            confirm();
            setVisible(false);
          }}
          type="primary"
          size="small"
          style={{ width: 100, marginRight: 8 }}
        >
          Найти
        </Button>
        <Button
          onClick={() => {
            setSelectedKeys(['']);
            confirm();
            setVisible(false);
          }}
          size="small"
          style={{ width: 100 }}
        >
          Сбросить
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? '#1890ff' : undefined }}
        onClick={() => {
          setVisible(!visible);
          setTimeout(() => ref?.current?.focus(), 1000);
        }}
      />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => ref?.current?.focus(), 1000);
        setVisible(true);
      }
    },
    filterDropdownVisible: visible,
  };
}

export function addRangeSearch() {
  return {
    filterDropdown: () => <>!</>,
    onFilter: () => true,
    filterIcon: (filtered: boolean) => (
      <CalendarOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  };
}

export function addFilter<T>(fields: (keyof T)[], type?: 'search' | 'list') {
  return {
    onFilter: (value: string | number | boolean, record: T) => {
      const normalize = (value: any): string => String(value).toLowerCase();
      const elements = fields.map((item) => normalize(record[item]));

      return type === 'search'
        ? elements.join(' ').includes(normalize(value))
        : elements.join(' ') === normalize(value);
    },
  };
}

export function addSorter<T>(field: keyof T) {
  return {
    sorter: (a: T, b: T) => {
      if (a[field] > b[field]) return 1;
      if (a[field] < b[field]) return -1;
      return 0;
    },
  };
}
