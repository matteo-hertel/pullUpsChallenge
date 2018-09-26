function createSet(total, upperTreshold, lowerTreshold) {
  return new Array(parseInt(total))
    .fill(lowerTreshold)
    .map(luckySet(upperTreshold));
}
function luckySet(max) {
  return function luckyDraw(n) {
    if (Math.random() > 0.5) return max;
    return n;
  };
}

module.exports = {createSet};
