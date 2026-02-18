export function aggregateGMV() {
  const GMV = window.dataStore.GMV || [];

  let totalRevenue = 0;
  let netSales = 0;
  let returnAmount = 0;

  GMV.forEach(row => {
    totalRevenue += Number(row["GMV"] || 0);
    netSales += Number(row["Final Sale Amount"] || 0);
    returnAmount += Number(row["Return Amount"] || 0);
  });

  return {
    totalRevenue,
    netSales,
    returnAmount
  };
}
