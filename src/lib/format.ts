export const formatNumber = (number: number | string): number => {
  return Number(Number(number).toFixed(2));
};

export const getSignColor = (number: number) =>
  Math.sign(number) < 0 ? 'var(--red)' : 'var(--green)';
