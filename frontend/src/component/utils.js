// src/component/utils.js

// Return an integer between min and max (inclusive)
export function getRangeRandom(min = 0, max = 100) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

/**
 * getRandom(optionalFlagOrMax)
 * - Backwards compatible helper used in your charts.
 * - If called with a single positive number > 1, it's treated as "max" (1..max).
 * - If called with 0/1 or a truthy flag (legacy), returns an integer 1..100.
 * - If called with no args, returns 0..100 (float).
 */
export function getRandom(arg) {
  if (typeof arg === 'number' && arg > 1) {
    return getRangeRandom(1, Math.floor(arg));
  }
  // if called like getRandom(1) (legacy in your code), return integer 1..100
  if (arg) return getRangeRandom(1, 100);
  // default: return float 0..100 (keeps variety)
  return Math.random() * 100;
}

/**
 * generateMinuteWiseTimeSeries(baseval, count, yrange)
 * - baseval: timestamp in ms
 * - count: number of points
 * - yrange: { min: Number, max: Number }
 * returns: [[timestamp, value], ...]
 */
export function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  const series = [];
  let x = baseval;
  for (let i = 0; i < count; i++) {
    const y = getRangeRandom(yrange.min, yrange.max);
    series.push([x, y]);
    // increment by 5 minutes (300000 ms) — matches your code using +300000
    x += 300000;
  }
  return series;
}
