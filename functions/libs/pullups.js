function pullupsWithConfig(config) {
  function createSet() {
    const { upperTreshold, lowerTreshold } = config;
    let { totalAmount } = config;
    const sets = [];
    while (totalAmount > 0) {
      if (totalAmount <= lowerTreshold) {
        sets.push(totalAmount);
        break;
      }
      const set = Math.round(Math.random() * totalAmount);
      if (set < lowerTreshold || set > upperTreshold) continue;
      sets.push(set);
      totalAmount -= set;
    }
    return sets;
  }

  return { createSet };
}
module.exports = pullupsWithConfig(require("./../config"));
