function createSet(total, upperTreshold, lowerTreshold) {
  return new Array(parseInt(total, 10))
    .fill(lowerTreshold)
    .map(luckySet(upperTreshold));
}
function luckySet(max) {
  return function luckyDraw(n) {
    if (Math.random() > 0.5) return parseInt(max, 10);
    return parseInt(n, 10);
  };
}

module.exports = { createSet };
