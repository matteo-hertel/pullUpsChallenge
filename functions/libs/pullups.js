function createSet(total, upperTreshold, lowerTreshold) {
  let remaining = total;
  const sets = [];
  while (remaining > 0) {
    if (remaining <= lowerTreshold) {
      sets.push(remaining);
      break;
    }
    const set = Math.round(Math.random() * remaining);
    if (set < lowerTreshold || set > upperTreshold) continue;
    sets.push(set);
    remaining -= set;
  }
  return sets;
}

module.exports = { createSet };
