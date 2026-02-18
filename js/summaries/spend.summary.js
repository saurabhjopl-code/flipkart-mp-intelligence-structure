import { aggregateGMV } from "../aggregations/gmv.aggregation.js";
import { calculateReturnPercent } from "../calculations/return.calculation.js";

export function getReturnSummary() {
  const { totalRevenue, returnAmount } = aggregateGMV();

  const returnPercent = calculateReturnPercent(returnAmount, totalRevenue);

  return {
    returnPercent
  };
}
