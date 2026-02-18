export function getRevenueSummary() {

  const GMV = window.dataStore.GMV || [];

  let totalRevenue = 0;
  let netSales = 0;

  GMV.forEach(row => {
    totalRevenue += Number(row["GMV"] || 0);
    netSales += Number(row["Final Sale Amount"] || 0);
  });

  return {
    totalRevenue,
    netSales
  };
}
