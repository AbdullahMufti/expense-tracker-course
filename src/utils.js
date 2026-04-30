export const fmt = (n) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const roundCurrency = (n) => Math.round(n * 100) / 100;
