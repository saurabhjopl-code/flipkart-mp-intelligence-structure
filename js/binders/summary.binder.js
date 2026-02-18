function formatCurrency(value) {
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function formatPercent(value) {
  return value.toFixed(2) + "%";
}

function waitForDataAndRender() {

  const interval = setInterval(function () {

    if (window.dataStore && window.dataStore.isLoaded) {
      clearInterval(interval);
      renderSummaries();
    }

  }, 200);
}

function renderSummaries() {

  const revenue = getRevenueSummary();
  const returnData = getReturnSummary();
  const spend = getSpendSummary();
  const roi = getRoiSummary();
  const spendControl = getSpendControlSummary();

  document.getElementById("totalRevenue").innerText =
    formatCurrency(revenue.totalRevenue);

  document.getElementById("returnPercent").innerText =
    formatPercent(returnData.returnPercent);

  document.getElementById("netSales").innerText =
    formatCurrency(revenue.netSales);

  document.getElementById("adSpend").innerText =
    formatCurrency(spend.totalSpend);

  document.getElementById("roiValue").innerText =
    roi.roi.toFixed(2);

  document.getElementById("spendPercent").innerText =
    formatPercent(spendControl.spendPercent);
}

waitForDataAndRender();
