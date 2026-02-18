const sheets = {
  CDR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=0&single=true&output=csv",
  CFR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=70878993&single=true&output=csv",
  PPR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=83055390&single=true&output=csv",
  CKR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1766288207&single=true&output=csv",
  GMV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1218209311&single=true&output=csv",
  CTR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1305519024&single=true&output=csv",
  PRICING: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1745171914&single=true&output=csv",
  SKU_MAPPING: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=386120937&single=true&output=csv"
};

const progressFill = document.getElementById("progressFill");
const progressStatus = document.getElementById("progressStatus");
const overlay = document.getElementById("progressOverlay");

let loaded = 0;
const totalSheets = Object.keys(sheets).length;
let masterData = {};

async function fetchSheet(name, url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.trim().split("\n").length - 1;
  masterData[name] = rows;

  loaded++;
  const percent = (loaded / totalSheets) * 100;
  progressFill.style.width = percent + "%";
  progressStatus.innerHTML += `✔ ${name} Loaded (${rows} rows)<br>`;

  if (loaded === totalSheets) {
    setTimeout(() => {
      overlay.style.display = "none";
      populateSummary();
      populateAccounts();
    }, 800);
  }
}

function populateSummary() {
  const grid = document.getElementById("summaryGrid");
  grid.innerHTML = `
    <div class="summary-card">
      <h3>Total Sheets Loaded</h3>
      <p class="summary-value">${totalSheets}</p>
    </div>
    <div class="summary-card">
      <h3>Total Rows</h3>
      <p class="summary-value">
        ${Object.values(masterData).reduce((a,b)=>a+b,0)}
      </p>
    </div>
    <div class="summary-card">
      <h3>ROI (Sample)</h3>
      <p class="summary-value">3.5</p>
    </div>
  `;
}

function populateAccounts() {
  const accountSelect = document.getElementById("accountFilter");
  accountSelect.innerHTML += `<option>Sample Account 1</option>`;
}

for (const [name, url] of Object.entries(sheets)) {
  fetchSheet(name, url);
}
