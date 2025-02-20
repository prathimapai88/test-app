convertFilterToArray(filter: any): { attributename: string; atttributeVal: any[] }[] {
  const result: { attributename: string; atttributeVal: any[] }[] = [];

  if (!filter) return result;

  function processFilter(condition: any) {
    if (Array.isArray(condition) && typeof condition[0] === 'string') {
      // Simple condition ["column1", "=", value]
      let attributeName = condition[0];
      let operator = condition[1];
      let value = condition[2];

      if (operator === "=" || operator === "in") {
        let existing = result.find(item => item.attributename === attributeName);
        if (existing) {
          existing.atttributeVal = Array.isArray(value) ? value : [...existing.atttributeVal, value];
        } else {
          result.push({ attributename: attributeName, atttributeVal: Array.isArray(value) ? value : [value] });
        }
      }
    } else if (Array.isArray(condition)) {
      // Complex conditions with "and" or "or"
      let logicalOperator = condition[1];
      if (logicalOperator === "and" || logicalOperator === "or") {
        condition.forEach(subCondition => {
          if (Array.isArray(subCondition)) {
            processFilter(subCondition);
          }
        });
      }
    }
  }

  processFilter(filter);
  return result;
}