import { sheetConfig } from "../config/sheet.config.js";
import { parseCSV } from "./csvParser.js";
import { dataStore } from "./dataStore.js";

export async function loadAllSheets(progressCallback) {
  const sheetKeys = Object.keys(sheetConfig);
  let loadedCount = 0;

  for (const key of sheetKeys) {
    const response = await fetch(sheetConfig[key].url);
    const text = await response.text();

    const parsedData = parseCSV(text);
    dataStore[key] = parsedData;

    loadedCount++;

    if (progressCallback) {
      progressCallback({
        sheet: key,
        loaded: loadedCount,
        total: sheetKeys.length
      });
    }
  }

  dataStore.isLoaded = true;
}
