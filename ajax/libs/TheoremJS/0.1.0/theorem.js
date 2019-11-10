/*
**   © Arthur Guiot 2017
**         TheoremJS
*/

const BigNumber = require('bignumber.js');
BigNumber.config(20)
class TheoremJS {
  constructor() {
  	// code
  }
  
  factorial(n) {
      if (new BigNumber(n).equals(0)) {
          return new BigNumber(1);
      }
      return new BigNumber(n).times(this.factorial(new BigNumber(n).minus(1)))
  }
  gamma (z) {
  	const g = 7;
  	const p = [
  	    0.99999999999980993,
  	    676.5203681218851,
  	    -1259.1392167224028,
  	    771.32342877765313,
  	    -176.61502916214059,
  	    12.507343278686905,
  	    -0.13857109526572012,
  	    9.9843695780195716e-6,
  	    1.5056327351493116e-7
  	];
      if (z < 0.5) {
          return new BigNumber(Number(Math.PI / (Math.sin(Math.PI * z) * this.gamma(1 - z).toNumber())).toFixed(10));
      }
      else if(z > 100) return Math.exp(this.lngamma(z));
      else {
          z -= 1;
          let x = p[0];
          for (var i = 1; i < g + 2; i++) {
              x += p[i] / (z + i);
          }
          const t = z + g + 0.5;
  
          return new BigNumber(Number(Math.sqrt(2 * Math.PI)
              * Math.pow(t, z + 0.5)
              * Math.exp(-t)
              * x
          ).toFixed(10))
      }
  }
  ln(x, n = 15) {
      let buffer = new BigNumber(0);
      for (let i = 0; i < Math.ceil(n + (3 / 2 * x)); i++) {
  		const n = new BigNumber(1)
  					.div(new BigNumber(i).times(2).plus(1))
  					.times(
  						new BigNumber(x).minus(1)
  						.div(new BigNumber(x).plus(1))
  						.pow(new BigNumber(i).times(2).plus(1))
  					)
          buffer = buffer.plus(n)
      }
      return new BigNumber(buffer.times(2).toFixed(n - 1))
  }
  lngamma(z) {
  	const g_ln = 607/128;
  	const p_ln = [
  	    0.99999999999999709182,
  	    57.156235665862923517,
  	    -59.597960355475491248,
  	    14.136097974741747174,
  	    -0.49191381609762019978,
  	    0.33994649984811888699e-4,
  	    0.46523628927048575665e-4,
  	    -0.98374475304879564677e-4,
  	    0.15808870322491248884e-3,
  	    -0.21026444172410488319e-3,
  	    0.21743961811521264320e-3,
  	    -0.16431810653676389022e-3,
  	    0.84418223983852743293e-4,
  	    -0.26190838401581408670e-4,
  	    0.36899182659531622704e-5
  	];
      if(z < 0) return Number('0/0');
      let x = p_ln[0];
      for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
      const t = z + g_ln + 0.5;
      return new BigNumber(Number(.5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z)).toFixed(10));
  }
  log(x, base, n = 15) {
  	return new BigNumber(this.ln(x, n).div(this.ln(base, n)).toPrecision(n - 1))
  }
  pow(n, base) {
      if (typeof n != 'object' || n.isBigNumber) {
          n = [n]
      }
      let result = []
      for (var i = 0; i < n.length; i++) {
          result.push(new BigNumber(Math.pow(new BigNumber(n[i]).toNumber(), new BigNumber(base).toNumber()).toFixed(10)))
      }
      return result.length == 1 ? result[0] : result
  }
  root(n, base) {
  	if (typeof n != 'object' || n.isBigNumber) {
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(new BigNumber(Math.pow(new BigNumber(n[i]).toNumber(), new BigNumber(1).div(base).toNumber())))
      }
  	return result.length == 1 ? result[0] : result
  }
  sigmoid(x, n = 15) {
  	return new BigNumber(new BigNumber(1).div(this.e(n).pow(x).add(1)).toPrecision(n))
  }
  sqrt(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(new BigNumber(new BigNumber(n[i]).sqrt()))
      }
  	return result.length == 1 ? result[0] : result
  }
  zeta(x, n = 15) {
  	let buffer = 0
  	for (var i = 1; i < n * 10; i++) {
  		buffer = new BigNumber(buffer).plus(new BigNumber(x).pow(-i))
  	}
  	return new BigNumber(buffer.toPrecision(n))
  }
  apply(n, f) {
      if (typeof n != 'object') {
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(f(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  max() {
  	const sorted = this.sort(...arguments);
  	return sorted[sorted.length - 1]
  }
  min() {
  	const sorted = this.sort(...arguments);
  	return sorted[0]
  }
  product() {
  	return [...arguments].reduce((a, b) => new BigNumber(a).times(b))
  }
  sort() {
  	// https://gist.github.com/jasondscott/7073857
      Array.prototype.quickSort = function() {
  
          var r = this;
          if (this.length <= 1) {
              return this;
          }
          var less = [],
              greater = [];
  
          var pivot = r.splice(new BigNumber(r.length).div(2).floor(), 1);
  
          for (var i = r.length - 1; i >= 0; i--) {
              if (new BigNumber(r[i]).lessThanOrEqualTo(new BigNumber(pivot))) {
                  less.push(r[i]);
              } else {
                  greater.push(r[i]);
              }
          }
  
          var c = [];
  
          return c.concat(less.quickSort(), pivot, greater.quickSort());
      };
  
  	return [...arguments].quickSort()
  }
  sum() {
  	return [...arguments].reduce((a, b) => new BigNumber(a).plus(b))
  }
  average() {
  	const summed = this.sum(...arguments);
  	const average = new BigNumber(summed).div(arguments.length);
  	return average
  }
  correlation(array1, array2) {
      if (array1.length != array2.length) {
          throw "[TheoremJS]: Correlation error, arrays are not the same size"
      }
      const average1 = this.average(...array1).toNumber()
      const average2 = this.average(...array2).toNumber()
      let up = 0;
  	let down1 = 0;
  	let down2 = 0;
      for (var i = 0; i < array1.length; i++) {
          up += (array1[i] - average1)*(array2[i] - average2)
  		down1 += Math.pow(array1[i] - average1, 2)
  		down2 += Math.pow(array2[i] - average2, 2)
      }
  	const result = up / Math.sqrt(down1 * down2)
  	return result
  }
  median() {
  	let array = [...arguments]
  	array.sort( (a, b) => new BigNumber(a).sub(b) );
  	const half = Math.floor(new BigNumber(array.length).div(2).toNumber());
  	if(array.length % 2) {
  		return array[half]
  	}
  	else {
  		return new BigNumber(array[half-1]).add(array[half]).div(2).toNumber()
  	}
  }
  regression(data, deg) {
      if (deg == 1) {
          return this.linreg(data)
      } else {
          return this.polyreg(data, deg)
      }
  }
  linreg(array) {
      const x = Object.keys(array)
      const y = Object.values(array)
      const n = y.length;
      let sum_x = 0;
      let sum_y = 0;
      let sum_xy = 0;
      let sum_xx = 0;
      let sum_yy = 0;
  
      for (let i = 0; i < y.length; i++) {
          sum_x += parseFloat(x[i]);
          sum_y += parseFloat(y[i]);
          sum_xy += parseFloat(x[i] * y[i]);
          sum_xx += parseFloat(x[i] * x[i]);
          sum_yy += parseFloat(y[i] * y[i]);
      }
  
      const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
      const intercept = (sum_y - slope * sum_x) / n;
      return this.polynomial(slope, intercept)
  }
  polyreg(data, deg) {
      const x = Object.keys(data)
      for (let i in x) {
          x[i] = parseFloat(x[i])
      }
      const y = Object.values(data)
      for (let i in y) {
          y[i] = parseFloat(y[i])
      }
      const lhs = [];
      const rhs = [];
      let a = 0;
      let b = 0;
      let c;
      let k;
  
      var i;
      let j;
      let l;
      const len = x.length;
  
      let results;
      let equation;
      let string;
  
      if (typeof deg === 'undefined') {
          k = 3;
      } else {
          k = deg + 1;
      }
  
      for (i = 0; i < k; i++) {
          for (l = 0; l < len; l++) {
              if (y[l] !== null) {
                  a += x[l] ** i * y[l];
              }
          }
  
          lhs.push(a);
          a = 0;
  
          c = [];
          for (j = 0; j < k; j++) {
              for (l = 0; l < len; l++) {
                  if (y[l] !== null) {
                      b += x[l] ** (i + j);
                  }
              }
              c.push(b);
              b = 0;
          }
          rhs.push(c);
      }
      rhs.push(lhs);
      equation = this.gaussElimination(rhs, k);
  
      return this.polynomial(...equation.reverse())
  }
  acos(n) {
      if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.acos(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  acosh(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.acosh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  angle2Vec(rad) {
  	return [this.cos(rad), this.sin(rad)];
  }
  asin(n) {
      if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.asin(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  asinh(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.asinh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  atan(n) {
      if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.atan(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  atan2(x, y) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		x = x.isBigNumber == true ? x.toNumber() : x
          x = [x]
  		y = y.isBigNumber == true ? y.toNumber() : y
          y = [y]
      }
  	let result = []
      for (var i = 0; i < x.length; i++) {
      	result.push(Math.atan2(x[i], y[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  atanh(n) {
  	if (typeof n != 'object') {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.atanh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  cos(n) {
      if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.cos(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  cosh(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.cosh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  deg2rad(x) {
      return new BigNumber(x).times(this.pi()).div(180)
  }
  drawCircularPoints(n, r=1, start=[-r, 0]) {
  	const angle = this.pi().times(2).div(n)
  	let buffer = {}
  	buffer[start[0]] = start[1]
  	let angleState = this.atan2(...start.reverse()) + angle.toNumber()
  	for (var i = 0; i < n - 1; i++) {
  		const x = new BigNumber(r).times(`${this.cos(angleState)}`).toString()
  		const y = new BigNumber(r).times(`${this.sin(angleState)}`).toNumber()
  		buffer[x] = y
  		angleState += angle.toNumber()
  	}
  	return buffer
  }
  rad2deg(x) {
  	return new BigNumber(x).times(180).div(this.pi())
  }
  sin(n) {
      if (typeof n != 'object' || n.isBigNumber) {
          n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
      let result = []
      for (var i = 0; i < n.length; i++) {
          result.push(Math.sin(n[i]))
      }
      return result.length == 1 ? result[0] : result
  }
  sinh(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.sinh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  tan(n) {
      if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.tan(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  tanh(n) {
  	if (typeof n != 'object' || n.isBigNumber) {
  		n = n.isBigNumber == true ? n.toNumber() : n
          n = [n]
      }
  	let result = []
      for (var i = 0; i < n.length; i++) {
      	result.push(Math.tanh(n[i]))
      }
  	return result.length == 1 ? result[0] : result
  }
  derivate(poly) {
  	if (poly.type != 'polynomial') {
  		throw "TheoremJS: Derivative: Not a polynomial"
  		return 0;
  	}
  	let values = []
  	const arr = poly.values.reverse()
  	for (let i = 0; i < arr.length; i++) {
  		values.push(i * arr[i])
  	}
  	values.reverse()
  	values.pop()
  	const out = values.filter(a => !isNaN(a))
  
  	return this.polynomial(...out)
  }
  f(v, func) {
  	if (typeof v == 'function') {
  		return {
  			type: "function",
  			core: v
  		}
  	}
  	return {
  		type: "function",
  		v: v,
  		f: func,
  		core: x => {
  			let regex = new RegExp(v)
  			let newStr = func.replace(regex, `(${x})`)
  			return eval(newStr)
  		}
  	}
  }
  findRoots(f) {
      let exp = [];
      if (f.type == "polynomial") {
          switch (f.values.length - 1) {
              case 1:
                  exp.push(`${new BigNumber(f.values[1]).isNegative() ? '' : '-'}${f.values[1]} / ${f.values[0]}`)
                  break;
              case 2:
                  exp.push(`(${new BigNumber(f.values[1]).isNegative() ? '' : '-'}${new BigNumber(f.values[1]).abs()} + Math.sqrt(${new BigNumber(f.values[1]).pow(2).minus(new BigNumber(4).times(f.values[0]).times(f.values[2]))})) / ${new BigNumber(f.values[0]).times(2)}`)
                  exp.push(`(${new BigNumber(f.values[1]).isNegative() ? '' : '-'}${new BigNumber(f.values[1]).abs()} - Math.sqrt(${new BigNumber(f.values[1]).pow(2).minus(new BigNumber(4).times(f.values[0]).times(f.values[2]))})) / ${new BigNumber(f.values[0]).times(2)}`)
                  break;
              case 3:
                  let a = new BigNumber(f.values[0]).toNumber()
                  let b = new BigNumber(f.values[1]).toNumber()
                  let c = new BigNumber(f.values[2]).toNumber()
                  let d = new BigNumber(f.values[3]).toNumber()
  
                  // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
                  var p = (3 * a * c - b * b) / (3 * a * a);
                  var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
                  var roots;
  
                  if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
                      roots = [Math.cbrt(-q)];
                  } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
                      roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
                  } else {
                      var D = q * q / 4 + p * p * p / 27;
                      if (Math.abs(D) < 1e-8) { // D = 0 -> two roots
                          roots = [-1.5 * q / p, 3 * q / p];
                      } else if (D > 0) { // Only one real root
                          var u = Math.cbrt(-q / 2 - Math.sqrt(D));
                          roots = [u - p / (3 * u)];
                      } else { // D < 0, three roots, but needs to use complex numbers/trigonometric solution
                          var u = 2 * Math.sqrt(-p / 3);
                          var t = Math.acos(3 * q / p / u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
                          var k = 2 * Math.PI / 3;
                          roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
                      }
                  }
  
                  // Convert back from depressed cubic
                  for (var i = 0; i < roots.length; i++)
                      roots[i] -= b / (3 * a);
                  exp = roots;
                  break;
              default:
                  exp = [numeralSolve(f, 0)[0]]
          }
      } else {
          exp = [numeralSolve(f, 0)[0]]
      }
      return exp
  }
  gaussElimination(input, order) {
      const matrix = input;
      const n = input.length - 1;
      const coefficients = [order];
  
      for (let i = 0; i < n; i++) {
          let maxrow = i;
          for (let j = i + 1; j < n; j++) {
              if (Math.abs(matrix[i][j]) > Math.abs(matrix[i][maxrow])) {
                  maxrow = j;
              }
          }
  
          for (let k = i; k < n + 1; k++) {
              const tmp = matrix[k][i];
              matrix[k][i] = matrix[k][maxrow];
              matrix[k][maxrow] = tmp;
          }
  
          for (let j = i + 1; j < n; j++) {
              for (let k = n; k >= i; k--) {
                  matrix[k][j] -= (matrix[k][i] * matrix[i][j]) / matrix[i][i];
              }
          }
      }
  
      for (let j = n - 1; j >= 0; j--) {
          let total = 0;
          for (let k = j + 1; k < n; k++) {
              total += matrix[k][j] * coefficients[k];
          }
  
          coefficients[j] = (matrix[n][j] - total) / matrix[j][j];
      }
  
      return coefficients;
  }
  gradient(p1, p2) {
  	const x1 = Number(Object.keys(p1)[0])
  	const y1 = Number(Object.values(p1)[0])
  	const x2 = Number(Object.keys(p2)[0])
  	const y2 = Number(Object.values(p2)[0])
  
  	const slope = (y2 - y1) / (x2 - x1)
  	
  	return slope
  }
  graph(f, from=-100, to=100, step=0.1) {
  	let array = {}
  	for (var i = new BigNumber(from); i.lessThanOrEqualTo(new BigNumber(to)); i = i.plus(new BigNumber(step))) {
  		array[i.toString()] = f.core(i).toPrecision(15)
  	}
  	return array
  }
  integrate(poly) {
  	if (poly.type != 'polynomial') {
  		throw "TheoremJS: Integrate: Not a polynomial"
  		return 0;
  	}
  	let values = []
  	for (let i in poly.values.reverse()) {
  		values.push(poly.values[i] / (parseInt(i)+1))
  	}
  	values.reverse()
  	values.push(0)
  	const out = values.filter(a => !isNaN(a))
  
  	return this.polynomial(...out)
  }
  numeralSolve(f, end, from = -100, to = 100, step = 0.1) {
  	let p = this.graph(f, from, to, step)
  	let g = Object.values(p)
  	let y = []
  	for (let i in g) {
  		y.push(new BigNumber(g[i]).sub(end).abs().toNumber())
  	}
  	Object.prototype.getKey = function(value) {
  		var object = this;
  		return Object.keys(object).find(key => object[key] === value);
  	};
  	const min = this.min(...y)
  	return [p.getKey(min.toPrecision(15)), min]
  }
  polynomial() {
  	const args = [...arguments].reverse()
  	let buffer = "";
  	for (let i = 0; i < args.length; i++) {
  		buffer += `${args[i]} * x**${i} ${i == args.length -1 ? '': '+ '}`
  	}
  	return {
  		type: "polynomial",
  		v: "x",
  		f: buffer,
  		values: [...arguments],
  		core: x => {
  			let regex = new RegExp("x")
  			let newStr = buffer.replace(regex, x)
  			return eval(newStr)
  		}
  	}
  }
  run(f, x) {
  	return f.core(x)
  }
  slope(f, x=0, i=0.01) {
  	const f1 = f.core(x)
  	const x1 = x
  	const f2 = f.core(x + i)
  	const x2 = x + i
  	return new BigNumber(f2).minus(f1).div(new BigNumber(x2).minus(x1))
  }
  y_intercept(f) {
  	return f.core(0)
  }
  * collatz(n) {
  	while (n != 1) {
  		if(n % 2 == 0) {
  			n = n / 2
  		} else {
  			n = 3 * n + 1
  		}
  		yield n;
  	}
  }
  * fibonacci() {
      let fn1 = 0;
      let fn2 = 1;
      while (true) {
          const current = fn1;
          fn1 = fn2;
          fn2 = fn1 + current;
          const reset = yield current;
          if (reset) {
              fn1 = 0;
              fn2 = 1;
          }
      }
  }
  * sieve() {
  	// Eratosthenes algorithm to find all primes under n
      var array = [], upperLimit = Math.sqrt(n), output = [2];
  
      // Make an array from 2 to (n - 1)
      for (var i = 0; i < n; i++)
          array.push(1);
  
      // Remove multiples of primes starting from 2, 3, 5,...
      for (var i = 3; i <= upperLimit; i += 2) {
          if (array[i]) {
              for (var j = i * i; j < n; j += i*2)
                  array[j] = 0;
          }
      }
  
      // All array[i] set to 1 (true) are primes
      for (var i = 3; i < n; i += 2) {
          if(array[i]) {
              output.push(i);
          }
      }
  
      return output;
  }
  c(name, n = 15) {
  	const numbers = {
  		"pi": '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909',
  		"e": '2.718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427427466391932003059921817413596629043572900334295260595630738132328627943490763233829880753195251019011573834187930702154089149934884167509244761460668',
  		"sqrt(2)": '1.414213562373095048801688724209698078569671875376948073176679737990732478462107038850387534327641572735013846230912297024924836055850737212644121497099935831413222665927505592755799950501152782060571470109559971605970274534596862014728517418640889199',
  		"goldenRatio": '1.618033988749894848204586834365638117720309179805762862135448622705260462818902449707207204189391137484754088075386891752126633862223536931793180060766726354433389086595939582905638322661319928290267880675208766892501711696207032221043216269548626296',
  		"EulerGamma": '0.5772156649015328606065120900824024310421593359399235988057672348848677267776646709369470632917467495146314472498070824809605040144865428362241739976449235362535003337429373377376739427925952582470949160087352039481656708532331517766115286211995015080',
  		"UltimateAnswer": '42'
  	}
  	return new BigNumber(new BigNumber(numbers[name]).toPrecision(n))
  }
  e(n = 15) {
      let zero = new BigNumber(0);
      let one = new BigNumber(1);
      let rval;
  
      for (let i = 0; i <= n * 10; i++) {
          let fval = this.factorial(i);
          let invert = one.div(fval)
          zero = zero.plus(invert)
      }
      rval = zero.toPrecision(n)
      return new BigNumber(rval);
  }
  goldenRatio(n = 15) {
  	return new BigNumber(new BigNumber(1).plus(this.sqrt(5)).div(2).toPrecision(n))
  }
  isPrime(n) {
  	n = Number(n)
      if (n < 2) return false
  	if (n == 2) return true
  	if (n % 2 == 0) return false
  	for (var i = 3; i < this.sqrt(n).toNumber(); i += 2) {
  		if (n % i == 0) return false
  	}
  	return true
  }
  n(n) {
  	return new BigNumber(n)
  }
  pi(digits = 15) {
  	const Decimal = BigNumber.another({ DECIMAL_PLACES: digits })
      function arctan(x) {
          var y = x;
          var yPrev = NaN;
          var x2 = x.times(x);
          var num = x;
          var sign = -1;
  
          for (var k = 3; !y.equals(yPrev); k += 2) {
              num = num.times(x2);
  
              yPrev = y;
              y = (sign > 0) ? y.plus(num.div(k)) : y.minus(num.div(k));
              sign = -sign;
          }
  
          return y;
      }
  
      // Machin: Pi / 4 = 4 * arctan(1 / 5) - arctan(1 / 239)
      // http://milan.milanovic.org/math/english/pi/machin.html
  
      // we calculate pi with a few decimal places extra to prevent round off issues
      var DecimalPlus = BigNumber.another({ DECIMAL_PLACES: digits + 4 })
      var pi4th = new DecimalPlus(4).times(arctan(new DecimalPlus(1).div(5)))
          .minus(arctan(new DecimalPlus(1).div(239)));
  
      // the final pi has the requested number of decimals
      return new BigNumber(new Decimal(4).times(pi4th).toPrecision(digits))
  }
  round(n, precision = 2) {
  	n = Number(n)
  	return Math.round(n * 10 ** precision) / 10 ** precision
  }
  convertToBase(x, n) {
  	return new BigNumber(x).toString(n)
  }
  flatten(array) {
  	return array.reduce((a, b) => a.concat(b), []);
  }
  linspace(start, end, n) {
  	const diff = end - start;
  	const step = diff / n;
  	return this.arange(start, end, step);
  }
  arange(start, end, step, offset) {
  	const len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
  	const direction = start < end ? 1 : -1;
  	const startingPoint = start - (direction * (offset || 0));
  	const stepSize = direction * (step || 1);
  
  	return Array(len).fill(0).map((_, index) => startingPoint + (stepSize * index));
  }
  range(n) {
  	return this.arange(0, n, 1);
  }
  reshape(array, part) {
  	const tmp = [];
  	for (let i = 0; i < array.length; i += part) {
  		tmp.push(array.slice(i, i + part));
  	}
  	return tmp;
  }
}
// Browserify / Node.js
if (typeof define === "function" && define.amd) {
  define(() => new TheoremJS());
  // CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
  // Support Node.js specific `module.exports` (which can be a function)
  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = new TheoremJS();
  }
  // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
  exports.TheoremJS = new TheoremJS();
} else if (typeof global !== "undefined") {
  global.TheoremJS = new TheoremJS();
}