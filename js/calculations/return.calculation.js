export function calculateReturnPercent(returnAmount, totalRevenue) {
  if (totalRevenue === 0) return 0;
  return (returnAmount / totalRevenue) * 100;
}
