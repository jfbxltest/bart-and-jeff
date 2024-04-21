function calculPoints(formula, min = -100, max = 100, step = 2) {
  if (typeof formula !== "function") return [];
  const pts = [];
  for (let i = min; i <= max; i += step) {
    const result = formula(i / 100);
    if (Number.isFinite(result)) {
      pts.push([i, result]);
    }
  }
  return pts;
}

// template
const getFunctionGraph = (formula) => (min, max) => (args, step) =>
  calculPoints(formula(args), min, max, step);

// definitions ("Variation")
const formulaVariation =
  ({ d, v }) =>
  (x) =>
    (2 * (d / v)) / (1 - x * x);

// instanciation
const graphVariation = (min, max) =>
  getFunctionGraph(formulaVariation)(min, max);

function getPointsPolyline(pts) {
  const mapped = pts.map((pt) => `${pt[0]},${pt[1]}`);
  return mapped.join(" ");
}

function drawVariationIntoPolyline(polyline, v, d, p) {
  polyline.setAttribute(
    "points",
    getPointsPolyline(graphVariation()(d / v, p))
  );
}
