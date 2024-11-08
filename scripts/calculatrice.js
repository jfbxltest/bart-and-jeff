const op = [
	{
		["^"]: (a, b) => Math.pow(a, b),
	},
	{
		[":"]: (a, b) => a / b,
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

function getFunctionMath(p) {
	let name = "";
	while (p && p[0] !== "(") {
		name += p.shift();
	}
	return [Math[name], getValue(p)];
}

function getValue(p) {
	let value = 0;

	if (p[0] == "-") {
		p.shift();
		//universel unary minus operator
		return [op["*"], -1, getValue];
	}
	if (p[0] == "+") {
		p.shift();
		//maybe a error ??? !!!!
	}

	if (p[0] == "(") {
		p.shift();
		value = factorize(p, 3);
		p.shift(); // remove ")"
		return value;
	}

	if (p[0] == "$") {
		p.shift();
		return getFunctionMath(p);
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
		console.log("on decimale", decimale, rang);
		value += decimale / Math.pow(10, rang);
	}

	return value;
}

function factorize(p, n) {
	let expr = [null, null, null];
	expr[1] = n > 0 ? factorize(p, n - 1) : getValue(p);
	if (op[n][p[0]]) {
		expr[0] = op[n][p.shift()];
		expr[2] = factorize(p, n);
		return expr;
	}
	return expr[1];
}

function controlBrackets(phrase) {
	let brackets = 0;
	phrase.split("").forEach((c) => {
		if (c === "(") {
			brackets++;
		} else if (c === ")") {
			if (brackets < 1) {
				return false;
			}
			brackets--;
		}
	});
	return brackets === 0;
}

/**
 *  USAGE
 */
function calcuExpression(phrase) {
	const solve = (exp) => {
		if (exp.length === 3) {
			console.log(exp);
			return exp[0](solve(exp[1]), solve(exp[2]));
		}
		if (exp.length === 2) {
			return exp[0](solve(exp[1]));
		}
		return exp;
	};

	if (typeof phrase === "string") {
		phrase = phrase.replaceAll(" ", "").split("");
		// console.log(phrase);
		const factors = factorize(phrase, 3);
		// console.log(factors);
		return solve(factors);
	}

	console.log(phrase);
	return "Opps, see at console";
}

//function:
// On utilise $ pour designer une fonction Math
// une fonction est désigner par ce qui a entre "$"" et "("
// le nom de la function correspondra à une function dans Math (p.e Math.sin)
// On utilise £ pour designer une fonction personnalisée

/* OLD - FIRST
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
