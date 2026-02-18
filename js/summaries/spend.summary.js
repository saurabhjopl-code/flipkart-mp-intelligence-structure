function getSpendSummary() {

  const CDR = window.dataStore.CDR || [];

  let totalSpend = 0;

  CDR.forEach(row => {
    totalSpend += Number(row["Ad Spend"] || 0);
  });

  return {
    totalSpend
  };
}
