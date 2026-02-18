export function parseCSV(text) {
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

      // Convert numeric values automatically
      if (!isNaN(value) && value !== "") {
        value = Number(value);
      }

      row[header] = value;
    });

    rows.push(row);
  }

  return rows;
}
