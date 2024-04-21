class Graph {
  static calculPoints = (formula, min = -100, max = 100, step = 2) => {
    if (typeof formula !== "function") return [];
    const pts = [];
    for (let i = min; i <= max; i += step) {
      const result = formula(i);
      if (Number.isFinite(result)) {
        pts.push([i, result]);
      }
    }
    return pts;
  };

  min = -100;
  max = 100;

  constructor(formula, calculPoints = Graph.calculPoints) {
    this.formula = formula;
    this.calculPoints = calculPoints;
  }

  setMinMax(min, max) {
    this.min = min;
    this.max = max;
  }

  getPoints(step, args) {
    const pts = this.calculPoints(this.formula(args), this.min, this.max, step);
    return pts;
  }

  drawIntoPolyline(polyline, step, args) {
    const pts = this.getPoints(step, args);
    polyline.setAttribute(
      "points",
      pts.map((pt) => `${pt[0]},${pt[1]}`).join(" ")
    );
  }
}
