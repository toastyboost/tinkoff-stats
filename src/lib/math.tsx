import * as React from 'react';

export const getSum = (arr: number[]) => {
  const result = arr.reduce((a, b) => {
    return a + b;
  }, 0);

  return Number(result.toFixed(2));
};

export const getSignColor = (number: number) =>
  Math.sign(number) < 0 ? 'var(--red)' : 'var(--green)';
