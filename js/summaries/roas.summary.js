import { aggregateGMV } from "../aggregations/gmv.aggregation.js";
import { aggregateSpend } from "../aggregations/spend.aggregation.js";
import { calculateROI } from "../calculations/roi.calculation.js";

export function getRoiSummary() {
  const { netSales } = aggregateGMV();
  const { totalSpend } = aggregateSpend();

  const roi = calculateROI(netSales, totalSpend);

  return {
    roi
  };
}
