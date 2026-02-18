import { aggregateGMV } from "../aggregations/gmv.aggregation.js";
import { aggregateSpend } from "../aggregations/spend.aggregation.js";
import { calculateSpendPercent } from "../calculations/spendPercent.calculation.js";

export function getSpendControlSummary() {
  const { netSales } = aggregateGMV();
  const { totalSpend } = aggregateSpend();

  const spendPercent = calculateSpendPercent(totalSpend, netSales);

  return {
    spendPercent
  };
}
