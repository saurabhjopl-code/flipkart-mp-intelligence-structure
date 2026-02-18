export function getReturnSummary() {

  const GMV = window.dataStore.GMV || [];

  let totalRevenue = 0;
  let returnAmount = 0;

  GMV.forEach(row => {
    totalRevenue += Number(row["GMV"] || 0);
    returnAmount += Number(row["Return Amount"] || 0);
  });

  const returnPercent = totalRevenue > 0
    ? (returnAmount / totalRevenue) * 100
    : 0;

  return {
    returnPercent
  };
}
