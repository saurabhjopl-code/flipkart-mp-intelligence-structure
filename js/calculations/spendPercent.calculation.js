export function calculateSpendPercent(totalSpend, netSales) {
  if (netSales === 0) return 0;
  return (totalSpend / netSales) * 100;
}
