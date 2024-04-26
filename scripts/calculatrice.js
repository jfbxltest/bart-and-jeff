const op = [
  {
    ["^"]: (a, b) => Math.pow(a, b),
  },
  {
    ["*"]: (a, b) => a * b,
    ["/"]: (a, b) => a / b,
  },
  {
    ["+"]: (a, b) => a + b,
    ["-"]: (a, b) => a - b,
  },
];

function getValue(p) {
  let value = 0;
  let sign = 1;
  console.log("get value ******");
  if (p[0] == "-") {
    p.shift();
    sign = -1;
  }

  if (p[0] == "(") {
    p.shift();
    value = getExpr(p);
    p.shift();
    return sign * value;
  }

  while (!isNaN(p[0])) {
    value *= 10;
    value += +p.shift();
  }

  if (p[0] == ".") {
    p.shift();
    let rang = 0;
    let decimale = 0;

    while (!isNaN(p[0])) {
      rang++;
      decimale *= 10;
      decimale += +p.shift();
    }
    value + decimale / Math.pow(10, rang);
  }

  return value;
}

function factorize(p, n) {
  let expr = [null, null, null];
  expr[1] = n > 0 ? factorize(p, n - 1) : getValue(p);
  // console.log("oprateur ", p, n);
  if (op[n][p[0]]) {
    expr[0] = op[n][p.shift()];
    expr[2] = factorize(p, n);
    return expr;
  }
  return expr[1];
}

function calcuExpression(phrase) {
  solve = (exp) => {
    if (exp.length) {
      return exp[0](solve(exp[1]), solve(exp[2]));
    }
    return exp;
  };

  console.log(factorize(phrase.split(""), 2));
  return solve(factorize(phrase.split(""), 2));
}

/*
const getFact = (p) => {
  let fact = [null, null, null];
  fact[1] = getValue(p);
  if (op3[p[0]]) {
    fact[0] = op2[p.shift()];
    fact[2] = getFact(p);
  }
  return term;
};

const getTerm = (p) => {
  let term = [null, null, null];
  term[1] = getFact(p);
  if (op2[p[0]]) {
    term[0] = op2[p.shift()];
    term[2] = getTerm(p);
  }
  return term;
};

const getExpr = (p) => {
  let expr = [null, null, null];
  expr[1] = getTerm(p);
  if (op1[p[0]]) {
    expr[0] = op1[p.shift()];
    expr[2] = getExpr(p);
  }
  return expr;
};

*/
