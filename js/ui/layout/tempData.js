const tempSummaryData = [
  { title: "Total Revenue", value: "₹12,45,000" },
  { title: "Ad Spend", value: "₹3,20,000" },
  { title: "ROI", value: "3.89" }
];

const summaryGrid = document.getElementById("summaryGrid");

tempSummaryData.forEach(item => {
  const card = document.createElement("div");
  card.className = "summary-card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p class="summary-value">${item.value}</p>
  `;
  summaryGrid.appendChild(card);
});
