export const getSignColor = (number: number) =>
  Math.sign(number) < 0 ? 'var(--red)' : 'var(--green)';
