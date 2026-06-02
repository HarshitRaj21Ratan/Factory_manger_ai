// Custom raw SQL queries placeholder
export const getAggregateProductionQuery = () => {
  return `SELECT "lineId", SUM("producedUnits") FROM "Production" GROUP BY "lineId";`;
};
