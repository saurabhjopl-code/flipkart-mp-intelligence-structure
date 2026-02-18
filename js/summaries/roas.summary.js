export function getRoiSummary() {

  const GMV = window.dataStore.GMV || [];
  const CDR = window.dataStore.CDR || [];

  let netSales = 0;
  let totalSpend = 0;

  GMV.forEach(row => {
    netSales += Number(row["Final Sale Amount"] || 0);
  });

  CDR.forEach(row => {
    totalSpend += Number(row["Ad Spend"] || 0);
  });

  const roi = totalSpend > 0
    ? netSales / totalSpend
    : 0;

  return {
    roi
  };
}
