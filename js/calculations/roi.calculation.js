export function calculateROI(netSales, totalSpend) {
  if (totalSpend === 0) return 0;
  return netSales / totalSpend;
}
