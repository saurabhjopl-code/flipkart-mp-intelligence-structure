/* ===============================
   CENTRAL DATA STORE (GLOBAL)
   =============================== */

window.dataStore = {
  CDR: [],
  CFR: [],
  PPR: [],
  CKR: [],
  GMV: [],
  CTR: [],
  PRICING: [],
  SKU_MAPPING: [],
  isLoaded: false
};

/* ===============================
   SHEET URL CONFIG
   =============================== */

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

/* ===============================
   PROGRESS ELEMENTS
   =============================== */

const progressFill = document.getElementById("progressFill");
const progressStatus = document.getElementById("progressStatus");
const overlay = document.getElementById("progressOverlay");

let loaded = 0;
const totalSheets = Object.keys(sheets).length;

/* ===============================
   CSV PARSER (SAFE BASIC)
   =============================== */

function parseCSV(text) {
  const rows = [];
  const lines = text.split("\n");

  if (!lines.length) return rows;

  const headers = lines[0].split(",").map(h => h.trim());

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;

    const values = lines[i].split(",");
    const row = {};

    headers.forEach((header, index) => {
      let value = values[index] ? values[index].trim() : "";

      // Convert numeric values safely
      if (value !== "" && !isNaN(value)) {
        value = Number(value);
      }

      row[header] = value;
    });

    rows.push(row);
  }

  return rows;
}

/* ===============================
   FETCH & STORE
   =============================== */

async function fetchSheet(name, url) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    const parsedData = parseCSV(text);

    window.dataStore[name] = parsedData;

    loaded++;

    const percent = (loaded / totalSheets) * 100;
    progressFill.style.width = percent + "%";
    progressStatus.innerHTML += `✔ ${name} Loaded (${parsedData.length} rows)<br>`;

    if (loaded === totalSheets) {
      window.dataStore.isLoaded = true;

      setTimeout(() => {
        overlay.style.display = "none";
      }, 800);
    }

  } catch (error) {
    progressStatus.innerHTML += `❌ ${name} Failed<br>`;
  }
}

/* ===============================
   INIT LOAD
   =============================== */

for (const [name, url] of Object.entries(sheets)) {
  fetchSheet(name, url);
}
