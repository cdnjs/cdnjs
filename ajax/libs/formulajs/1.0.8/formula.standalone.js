(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("numeric"), require("numeral"), require("jStat"));
	else if(typeof define === 'function' && define.amd)
		define(["numeric", "numeral", "jStat"], factory);
	else if(typeof exports === 'object')
		exports["formulajs"] = factory(require("numeric"), require("numeral"), require("jStat"));
	else
		root["formulajs"] = factory(root["numeric"], root["numeral"], root["jStat"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var categories = [
	  __webpack_require__(1),
	  __webpack_require__(15),
	  __webpack_require__(12),
	  __webpack_require__(16),
	  __webpack_require__(2),
	  __webpack_require__(7),
	  __webpack_require__(14),
	  __webpack_require__(17),
	  __webpack_require__(11),
	  __webpack_require__(18),
	  __webpack_require__(6),
	  __webpack_require__(10)
	];

	for (var c in categories) {
	  var category = categories[c];
	  for (var f in category) {
	    exports[f] = exports[f] || category[f];
	  }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(2);
	var statistical = __webpack_require__(6);
	var engineering = __webpack_require__(12);
	var dateTime = __webpack_require__(14);

	function set(fn, root) {
	  if (root) {
	    for (var i in root) {
	      fn[i] = root[i];
	    }
	  }
	  return fn;
	}

	exports.BETADIST = statistical.BETA.DIST;
	exports.BETAINV = statistical.BETA.INV;
	exports.BINOMDIST = statistical.BINOM.DIST;
	exports.CEILING = exports.ISOCEILING = set(mathTrig.CEILING.MATH, mathTrig.CEILING);
	exports.CEILINGMATH = mathTrig.CEILING.MATH;
	exports.CEILINGPRECISE = mathTrig.CEILING.PRECISE;
	exports.CHIDIST = statistical.CHISQ.DIST;
	exports.CHIDISTRT = statistical.CHISQ.DIST.RT;
	exports.CHIINV = statistical.CHISQ.INV;
	exports.CHIINVRT = statistical.CHISQ.INV.RT;
	exports.CHITEST = statistical.CHISQ.TEST;
	exports.CONFIDENCE = set(statistical.CONFIDENCE.NORM, statistical.CONFIDENCE);
	exports.COVAR = statistical.COVARIANCE.P;
	exports.COVARIANCEP = statistical.COVARIANCE.P;
	exports.COVARIANCES = statistical.COVARIANCE.S;
	exports.CRITBINOM = statistical.BINOM.INV;
	exports.EXPONDIST = statistical.EXPON.DIST;
	exports.ERFCPRECISE = engineering.ERFC.PRECISE;
	exports.ERFPRECISE = engineering.ERF.PRECISE;
	exports.FDIST = statistical.F.DIST;
	exports.FDISTRT = statistical.F.DIST.RT;
	exports.FINVRT = statistical.F.INV.RT;
	exports.FINV = statistical.F.INV;
	exports.FLOOR = set(mathTrig.FLOOR.MATH, mathTrig.FLOOR);
	exports.FLOORMATH = mathTrig.FLOOR.MATH;
	exports.FLOORPRECISE = mathTrig.FLOOR.PRECISE;
	exports.FTEST = statistical.F.TEST;
	exports.GAMMADIST = statistical.GAMMA.DIST;
	exports.GAMMAINV = statistical.GAMMA.INV;
	exports.GAMMALNPRECISE = statistical.GAMMALN.PRECISE;
	exports.HYPGEOMDIST = statistical.HYPGEOM.DIST;
	exports.LOGINV = statistical.LOGNORM.INV;
	exports.LOGNORMINV = statistical.LOGNORM.INV;
	exports.LOGNORMDIST = statistical.LOGNORM.DIST;
	exports.MODE = set(statistical.MODE.SNGL, statistical.MODE);
	exports.MODEMULT = statistical.MODE.MULT;
	exports.MODESNGL = statistical.MODE.SNGL;
	exports.NEGBINOMDIST = statistical.NEGBINOM.DIST;
	exports.NETWORKDAYSINTL = dateTime.NETWORKDAYS.INTL;
	exports.NORMDIST = statistical.NORM.DIST;
	exports.NORMINV = statistical.NORM.INV;
	exports.NORMSDIST = statistical.NORM.S.DIST;
	exports.NORMSINV = statistical.NORM.S.INV;
	exports.PERCENTILE = set(statistical.PERCENTILE.EXC, statistical.PERCENTILE);
	exports.PERCENTILEEXC = statistical.PERCENTILE.EXC;
	exports.PERCENTILEINC = statistical.PERCENTILE.INC;
	exports.PERCENTRANK = set(statistical.PERCENTRANK.INC, statistical.PERCENTRANK);
	exports.PERCENTRANKEXC = statistical.PERCENTRANK.EXC;
	exports.PERCENTRANKINC = statistical.PERCENTRANK.INC;
	exports.POISSON = set(statistical.POISSON.DIST, statistical.POISSON);
	exports.POISSONDIST = statistical.POISSON.DIST;
	exports.QUARTILE = set(statistical.QUARTILE.INC, statistical.QUARTILE);
	exports.QUARTILEEXC = statistical.QUARTILE.EXC;
	exports.QUARTILEINC = statistical.QUARTILE.INC;
	exports.RANK = set(statistical.RANK.EQ, statistical.RANK);
	exports.RANKAVG = statistical.RANK.AVG;
	exports.RANKEQ = statistical.RANK.EQ;
	exports.SKEWP = statistical.SKEW.P;
	exports.STDEV = set(statistical.STDEV.S, statistical.STDEV);
	exports.STDEVP = statistical.STDEV.P;
	exports.STDEVS = statistical.STDEV.S;
	exports.TDIST = statistical.T.DIST;
	exports.TDISTRT = statistical.T.DIST.RT;
	exports.TINV = statistical.T.INV;
	exports.TTEST = statistical.T.TEST;
	exports.VAR = set(statistical.VAR.S, statistical.VAR);
	exports.VARP = statistical.VAR.P;
	exports.VARS = statistical.VAR.S;
	exports.WEIBULL = set(statistical.WEIBULL.DIST, statistical.WEIBULL);
	exports.WEIBULLDIST = statistical.WEIBULL.DIST;
	exports.WORKDAYINTL = dateTime.WORKDAY.INTL;
	exports.ZTEST = statistical.Z.TEST;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var numeric = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var statistical = __webpack_require__(6);
	var information = __webpack_require__(11);

	exports.ABS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.abs(utils.parseNumber(number));
	};

	exports.ACOS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.acos(number);
	};

	exports.ACOSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number + Math.sqrt(number * number - 1));
	};

	exports.ACOT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.atan(1 / number);
	};

	exports.ACOTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 0.5 * Math.log((number + 1) / (number - 1));
	};

	//TODO: use options
	exports.AGGREGATE = function(function_num, options, ref1, ref2) {
	  function_num = utils.parseNumber(function_num);
	  options = utils.parseNumber(function_num);
	  if (utils.anyIsError(function_num, options)) {
	    return error.value;
	  }
	  switch (function_num) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	    case 12:
	      return statistical.MEDIAN(ref1);
	    case 13:
	      return statistical.MODE.SNGL(ref1);
	    case 14:
	      return statistical.LARGE(ref1, ref2);
	    case 15:
	      return statistical.SMALL(ref1, ref2);
	    case 16:
	      return statistical.PERCENTILE.INC(ref1, ref2);
	    case 17:
	      return statistical.QUARTILE.INC(ref1, ref2);
	    case 18:
	      return statistical.PERCENTILE.EXC(ref1, ref2);
	    case 19:
	      return statistical.QUARTILE.EXC(ref1, ref2);
	  }
	};

	exports.ARABIC = function(text) {
	  // Credits: Rafa? Kukawski
	  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
	    return error.value;
	  }
	  var r = 0;
	  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function(i) {
	    r += {
	      M: 1000,
	      CM: 900,
	      D: 500,
	      CD: 400,
	      C: 100,
	      XC: 90,
	      L: 50,
	      XL: 40,
	      X: 10,
	      IX: 9,
	      V: 5,
	      IV: 4,
	      I: 1
	    }[i];
	  });
	  return r;
	};

	exports.ASIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.asin(number);
	};

	exports.ASINH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number + Math.sqrt(number * number + 1));
	};

	exports.ATAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.atan(number);
	};

	exports.ATAN2 = function(number_x, number_y) {
	  number_x = utils.parseNumber(number_x);
	  number_y = utils.parseNumber(number_y);
	  if (utils.anyIsError(number_x, number_y)) {
	    return error.value;
	  }
	  return Math.atan2(number_x, number_y);
	};

	exports.ATANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log((1 + number) / (1 - number)) / 2;
	};

	exports.BASE = function(number, radix, min_length) {
	  min_length = min_length || 0;

	  number = utils.parseNumber(number);
	  radix = utils.parseNumber(radix);
	  min_length = utils.parseNumber(min_length);
	  if (utils.anyIsError(number, radix, min_length)) {
	    return error.value;
	  }
	  min_length = (min_length === undefined) ? 0 : min_length;
	  var result = number.toString(radix);
	  return new Array(Math.max(min_length + 1 - result.length, 0)).join('0') + result;
	};

	exports.CEILING = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : Math.abs(significance);
	  mode = mode || 0;

	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.ceil(number / significance) * significance, precision);
	  } else {
	    if (mode === 0) {
	      return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	    } else {
	      return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	    }
	  }
	};

	exports.CEILING.MATH = exports.CEILING;

	exports.CEILING.PRECISE = exports.CEILING;

	exports.COMBIN = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return exports.FACT(number) / (exports.FACT(number_chosen) * exports.FACT(number - number_chosen));
	};

	exports.COMBINA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return (number === 0 && number_chosen === 0) ? 1 : exports.COMBIN(number + number_chosen - 1, number - 1);
	};

	exports.COS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.cos(number);
	};

	exports.COSH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return (Math.exp(number) + Math.exp(-number)) / 2;
	};

	exports.COT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.tan(number);
	};

	exports.COTH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 + 1) / (e2 - 1);
	};

	exports.CSC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.sin(number);
	};

	exports.CSCH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) - Math.exp(-number));
	};

	exports.DECIMAL = function(number, radix) {
	  if (arguments.length < 1) {
	    return error.value;
	  }


	  return parseInt(number, radix);
	};

	exports.DEGREES = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * 180 / Math.PI;
	};

	exports.EVEN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return exports.CEILING(number, -2, -1);
	};

	exports.EXP = Math.exp;

	var MEMOIZED_FACT = [];
	exports.FACT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n === 0 || n === 1) {
	    return 1;
	  } else if (MEMOIZED_FACT[n] > 0) {
	    return MEMOIZED_FACT[n];
	  } else {
	    MEMOIZED_FACT[n] = exports.FACT(n - 1) * n;
	    return MEMOIZED_FACT[n];
	  }
	};

	exports.FACTDOUBLE = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var n = Math.floor(number);
	  if (n <= 0) {
	    return 1;
	  } else {
	    return n * exports.FACTDOUBLE(n - 2);
	  }
	};

	exports.FLOOR = function(number, significance) {
	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(number, significance)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }

	  if (!(number > 0 && significance > 0) && !(number < 0 && significance < 0)) {
	    return error.num;
	  }

	  significance = Math.abs(significance);
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance), precision);
	  }
	};

	//TODO: Verify
	exports.FLOOR.MATH = function(number, significance, mode) {
	  significance = (significance === undefined) ? 1 : significance;
	  mode = (mode === undefined) ? 0 : mode;

	  number = utils.parseNumber(number);
	  significance = utils.parseNumber(significance);
	  mode = utils.parseNumber(mode);
	  if (utils.anyIsError(number, significance, mode)) {
	    return error.value;
	  }
	  if (significance === 0) {
	    return 0;
	  }

	  significance = significance ? Math.abs(significance) : 1;
	  var precision = -Math.floor(Math.log(significance) / Math.log(10));
	  if (number >= 0) {
	    return exports.ROUND(Math.floor(number / significance) * significance, precision);
	  } else if (mode === 0 || mode === undefined) {
	    return -exports.ROUND(Math.ceil(Math.abs(number) / significance) * significance, precision);
	  }
	  return -exports.ROUND(Math.floor(Math.abs(number) / significance) * significance, precision);
	};

	// Deprecated
	exports.FLOOR.PRECISE = exports.FLOOR.MATH;

	// adapted http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
	exports.GCD = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var r0 = range[0];
	  var x = r0 < 0 ? -r0 : r0;
	  for (var i = 1; i < n; i++) {
	    var ri = range[i];
	    var y = ri < 0 ? -ri : ri;
	    while (x && y) {
	      if (x > y) {
	        x %= y;
	      } else {
	        y %= x;
	      }
	    }
	    x += y;
	  }
	  return x;
	};


	exports.INT = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.floor(number);
	};

	//TODO: verify
	exports.ISO = {
	  CEILING: exports.CEILING
	};

	exports.LCM = function() {
	  // Credits: Jonas Raoni Soares Silva
	  var o = utils.parseNumberArray(utils.flatten(arguments));
	  if (o instanceof Error) {
	    return o;
	  }
	  for (var i, j, n, d, r = 1;
	    (n = o.pop()) !== undefined;) {
	    while (n > 1) {
	      if (n % 2) {
	        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {
	          //empty
	        }
	        d = (i <= j) ? i : n;
	      } else {
	        d = 2;
	      }
	      for (n /= d, r *= d, i = o.length; i;
	        (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {
	        //empty
	      }
	    }
	  }
	  return r;
	};

	exports.LN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number);
	};

	exports.LOG = function(number, base) {
	  number = utils.parseNumber(number);
	  base = utils.parseNumber(base);
	  if (utils.anyIsError(number, base)) {
	    return error.value;
	  }
	  base = (base === undefined) ? 10 : base;
	  return Math.log(number) / Math.log(base);
	};

	exports.LOG10 = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.log(number) / Math.log(10);
	};

	exports.MDETERM = function(matrix) {
	  matrix = utils.parseMatrix(matrix);
	  if (matrix instanceof Error) {
	    return matrix;
	  }
	  return numeric.det(matrix);
	};

	exports.MINVERSE = function(matrix) {
	  matrix = utils.parseMatrix(matrix);
	  if (matrix instanceof Error) {
	    return matrix;
	  }
	  return numeric.inv(matrix);
	};

	exports.MMULT = function(matrix1, matrix2) {
	  matrix1 = utils.parseMatrix(matrix1);
	  matrix2 = utils.parseMatrix(matrix2);
	  if (utils.anyIsError(matrix1, matrix2)) {
	    return error.value;
	  }
	  return numeric.dot(matrix1, matrix2);
	};

	exports.MOD = function(dividend, divisor) {
	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }
	  if (divisor === 0) {
	    return error.div0;
	  }
	  var modulus = Math.abs(dividend % divisor);
	  return (divisor > 0) ? modulus : -modulus;
	};

	  exports.MROUND = function(number, multiple) {
	  number = utils.parseNumber(number);
	  multiple = utils.parseNumber(multiple);
	  if (utils.anyIsError(number, multiple)) {
	    return error.value;
	  }
	  if (number * multiple < 0) {
	    return error.num;
	  }

	  return Math.round(number / multiple) * multiple;
	};

	exports.MULTINOMIAL = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var sum = 0;
	  var divisor = 1;
	  for (var i = 0; i < args.length; i++) {
	    sum += args[i];
	    divisor *= exports.FACT(args[i]);
	  }
	  return exports.FACT(sum) / divisor;
	};

	exports.MUNIT = function(dimension) {
	  dimension = utils.parseNumber(dimension);
	  if (dimension instanceof Error) {
	    return dimension;
	  }
	  return numeric.identity(dimension);
	};

	exports.ODD = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var temp = Math.ceil(Math.abs(number));
	  temp = (temp & 1) ? temp : temp + 1;
	  return (number > 0) ? temp : -temp;
	};

	exports.PI = function() {
	  return Math.PI;
	};

	exports.POWER = function(number, power) {
	  number = utils.parseNumber(number);
	  power = utils.parseNumber(power);
	  if (utils.anyIsError(number, power)) {
	    return error.value;
	  }
	  var result = Math.pow(number, power);
	  if (isNaN(result)) {
	    return error.num;
	  }

	  return result;
	};

	exports.PRODUCT = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  var result = 1;
	  for (var i = 0; i < args.length; i++) {
	    result *= args[i];
	  }
	  return result;
	};

	exports.QUOTIENT = function(numerator, denominator) {
	  numerator = utils.parseNumber(numerator);
	  denominator = utils.parseNumber(denominator);
	  if (utils.anyIsError(numerator, denominator)) {
	    return error.value;
	  }
	  return parseInt(numerator / denominator, 10);
	};

	exports.RADIANS = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return number * Math.PI / 180;
	};

	exports.RAND = function() {
	  return Math.random();
	};

	exports.RANDBETWEEN = function(bottom, top) {
	  bottom = utils.parseNumber(bottom);
	  top = utils.parseNumber(top);
	  if (utils.anyIsError(bottom, top)) {
	    return error.value;
	  }
	  // Creative Commons Attribution 3.0 License
	  // Copyright (c) 2012 eqcode
	  return bottom + Math.ceil((top - bottom + 1) * Math.random()) - 1;
	};

	// TODO
	exports.ROMAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  // The MIT License
	  // Copyright (c) 2008 Steven Levithan
	  var digits = String(number).split('');
	  var key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
	  var roman = '';
	  var i = 3;
	  while (i--) {
	    roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	  }
	  return new Array(+digits.join('') + 1).join('M') + roman;
	};

	exports.ROUND = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
	};

	exports.ROUNDDOWN = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

	exports.ROUNDUP = function(number, digits) {
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

	exports.SEC = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 1 / Math.cos(number);
	};

	exports.SECH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return 2 / (Math.exp(number) + Math.exp(-number));
	};

	exports.SERIESSUM = function(x, n, m, coefficients) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  m = utils.parseNumber(m);
	  coefficients = utils.parseNumberArray(coefficients);
	  if (utils.anyIsError(x, n, m, coefficients)) {
	    return error.value;
	  }
	  var result = coefficients[0] * Math.pow(x, n);
	  for (var i = 1; i < coefficients.length; i++) {
	    result += coefficients[i] * Math.pow(x, n + i * m);
	  }
	  return result;
	};

	exports.SIGN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  if (number < 0) {
	    return -1;
	  } else if (number === 0) {
	    return 0;
	  } else {
	    return 1;
	  }
	};

	exports.SIN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.sin(number);
	};

	  exports.SINH = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    return (Math.exp(number) - Math.exp(-number)) / 2;
	  };

	  exports.SQRT = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    if (number < 0) {
	      return error.num;
	    }
	    return Math.sqrt(number);
	  };

	  exports.SQRTPI = function(number) {
	    number = utils.parseNumber(number);
	    if (number instanceof Error) {
	      return number;
	    }
	    return Math.sqrt(number * Math.PI);
	  };

	exports.SUBTOTAL = function(function_code, ref1) {
	  function_code = utils.parseNumber(function_code);
	  if (function_code instanceof Error) {
	    return function_code;
	  }
	  switch (function_code) {
	    case 1:
	      return statistical.AVERAGE(ref1);
	    case 2:
	      return statistical.COUNT(ref1);
	    case 3:
	      return statistical.COUNTA(ref1);
	    case 4:
	      return statistical.MAX(ref1);
	    case 5:
	      return statistical.MIN(ref1);
	    case 6:
	      return exports.PRODUCT(ref1);
	    case 7:
	      return statistical.STDEV.S(ref1);
	    case 8:
	      return statistical.STDEV.P(ref1);
	    case 9:
	      return exports.SUM(ref1);
	    case 10:
	      return statistical.VAR.S(ref1);
	    case 11:
	      return statistical.VAR.P(ref1);
	      // no hidden values for us
	    case 101:
	      return statistical.AVERAGE(ref1);
	    case 102:
	      return statistical.COUNT(ref1);
	    case 103:
	      return statistical.COUNTA(ref1);
	    case 104:
	      return statistical.MAX(ref1);
	    case 105:
	      return statistical.MIN(ref1);
	    case 106:
	      return exports.PRODUCT(ref1);
	    case 107:
	      return statistical.STDEV.S(ref1);
	    case 108:
	      return statistical.STDEV.P(ref1);
	    case 109:
	      return exports.SUM(ref1);
	    case 110:
	      return statistical.VAR.S(ref1);
	    case 111:
	      return statistical.VAR.P(ref1);

	  }
	};

	exports.ADD = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }

	  return num1 + num2;
	};

	exports.MINUS = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.value;
	  }

	  return num1 - num2;
	};

	exports.DIVIDE = function (dividend, divisor) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  dividend = utils.parseNumber(dividend);
	  divisor = utils.parseNumber(divisor);
	  if (utils.anyIsError(dividend, divisor)) {
	    return error.value;
	  }

	  if (divisor === 0) {
	    return error.div0;
	  }

	  return dividend / divisor;
	};

	exports.MULTIPLY = function (factor1, factor2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  factor1 = utils.parseNumber(factor1);
	  factor2 = utils.parseNumber(factor2);
	  if (utils.anyIsError(factor1, factor2)) {
	    return error.value;
	  }

	  return factor1 * factor2;
	};

	exports.GTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 >= num2;
	};

	exports.LT = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 < num2;
	};


	exports.LTE = function (num1, num2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  num1 = utils.parseNumber(num1);
	  num2 = utils.parseNumber(num2);
	  if (utils.anyIsError(num1, num2)) {
	    return error.error;
	  }

	  return num1 <= num2;
	};

	exports.EQ = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  return value1 === value2;
	};

	exports.NE = function (value1, value2) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  return value1 !== value2;
	};

	exports.POW = function (base, exponent) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  base = utils.parseNumber(base);
	  exponent = utils.parseNumber(exponent);
	  if (utils.anyIsError(base, exponent)) {
	    return error.error;
	  }

	  return exports.POWER(base, exponent);
	};

	exports.SUM = function() {
	  var result = 0;
	  var argsKeys = Object.keys(arguments);
	  for (var i = 0; i < argsKeys.length; ++i) {
	    var elt = arguments[argsKeys[i]];
	    if (typeof elt === 'number') {
	      result += elt;
	    } else if (typeof elt === 'string') {
	      var parsed = parseFloat(elt);
	      !isNaN(parsed) && (result += parsed);
	    } else if (Array.isArray(elt)) {
	      result += exports.SUM.apply(null, elt);
	    }
	  }
	  return result;
	};

	exports.SUMIF = function(range, criteria) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (range instanceof Error) {
	    return range;
	  }
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += (eval(range[i] + criteria)) ? range[i] : 0; // jshint ignore:line
	  }
	  return result;
	};

	exports.SUMIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var range = utils.parseNumberArray(utils.flatten(args.shift()));
	  if (range instanceof Error) {
	    return range;
	  }
	  var criteria = args;

	  var n_range_elements = range.length;
	  var n_criterias = criteria.length;

	  var result = 0;
	  for (var i = 0; i < n_range_elements; i++) {
	    var el = range[i];
	    var condition = '';
	    for (var c = 0; c < n_criterias; c++) {
	      condition += el + criteria[c];
	      if (c !== n_criterias - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += el;
	    }
	  }
	  return result;
	};

	exports.SUMPRODUCT = function() {
	  if (!arguments || arguments.length === 0) {
	    return error.value;
	  }
	  var arrays = arguments.length + 1;
	  var result = 0;
	  var product;
	  var k;
	  var _i;
	  var _ij;
	  for (var i = 0; i < arguments[0].length; i++) {
	    if (!(arguments[0][i] instanceof Array)) {
	      product = 1;
	      for (k = 1; k < arrays; k++) {
	        _i = utils.parseNumber(arguments[k - 1][i]);
	        if (_i instanceof Error) {
	          return _i;
	        }
	        product *= _i;
	      }
	      result += product;
	    } else {
	      for (var j = 0; j < arguments[0][i].length; j++) {
	        product = 1;
	        for (k = 1; k < arrays; k++) {
	          _ij = utils.parseNumber(arguments[k - 1][i][j]);
	          if (_ij instanceof Error) {
	            return _ij;
	          }
	          product *= _ij;
	        }
	        result += product;
	      }
	    }
	  }
	  return result;
	};

	exports.SUMSQ = function() {
	  var numbers = utils.parseNumberArray(utils.flatten(arguments));
	  if (numbers instanceof Error) {
	    return numbers;
	  }
	  var result = 0;
	  var length = numbers.length;
	  for (var i = 0; i < length; i++) {
	    result += (information.ISNUMBER(numbers[i])) ? numbers[i] * numbers[i] : 0;
	  }
	  return result;
	};

	exports.SUMX2MY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] - array_y[i] * array_y[i];
	  }
	  return result;
	};

	exports.SUMX2PY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  for (var i = 0; i < array_x.length; i++) {
	    result += array_x[i] * array_x[i] + array_y[i] * array_y[i];
	  }
	  return result;
	};

	exports.SUMXMY2 = function(array_x, array_y) {
	  array_x = utils.parseNumberArray(utils.flatten(array_x));
	  array_y = utils.parseNumberArray(utils.flatten(array_y));
	  if (utils.anyIsError(array_x, array_y)) {
	    return error.value;
	  }
	  var result = 0;
	  array_x = utils.flatten(array_x);
	  array_y = utils.flatten(array_y);
	  for (var i = 0; i < array_x.length; i++) {
	    result += Math.pow(array_x[i] - array_y[i], 2);
	  }
	  return result;
	};

	exports.TAN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return Math.tan(number);
	};

	exports.TANH = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  var e2 = Math.exp(2 * number);
	  return (e2 - 1) / (e2 + 1);
	};

	exports.TRUNC = function(number, digits) {
	  digits = (digits === undefined) ? 0 : digits;
	  number = utils.parseNumber(number);
	  digits = utils.parseNumber(digits);
	  if (utils.anyIsError(number, digits)) {
	    return error.value;
	  }
	  var sign = (number > 0) ? 1 : -1;
	  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	function flattenShallow(array) {
	  if (!array || !array.reduce) { return array; }
	  return array.reduce(function(a, b) {
	    var aIsArray = Array.isArray(a);
	    var bIsArray = Array.isArray(b);
	    if (aIsArray && bIsArray ) {
	      return a.concat(b);
	    }
	    if (aIsArray) {
	      a.push(b);
	      return a;
	    }
	    if (bIsArray) {
	      return [a].concat(b);
	    }
	    return [a, b];
	  });
	}

	function isFlat(array) {
	  if (!array) { return false; }
	  for (var i = 0; i < array.length; ++i) {
	    if (Array.isArray(array[i])) {
	      return false;
	    }
	  }
	  return true;
	}

	exports.flatten = function() {
	  var result = exports.argsToArray.apply(null, arguments);
	  while (!isFlat(result)) {
	    result = flattenShallow(result);
	  }
	  return result;
	};

	exports.argsToArray = function(args) {
	  return Array.prototype.slice.call(args, 0);
	};

	exports.numbers = function() {
	  var possibleNumbers = this.flatten.apply(null, arguments);
	  return possibleNumbers.filter(function(el) {
	    return typeof el === 'number';
	  });
	};

	exports.cleanFloat = function(number) {
	  var power = 1e14;
	  return Math.round(number * power) / power;
	};

	exports.parseBool = function(bool) {
	  if (typeof bool === 'boolean') {
	    return bool;
	  }

	  if (bool instanceof Error) {
	    return bool;
	  }

	  if (typeof bool === 'number') {
	    return bool !== 0;
	  }

	  if (typeof bool === 'string') {
	    var up = bool.toUpperCase();
	    if (up === 'TRUE') {
	      return true;
	    }

	    if (up === 'FALSE') {
	      return false;
	    }
	  }

	  if (bool instanceof Date && !isNaN(bool)) {
	    return true;
	  }

	  return error.value;
	};

	exports.parseNumber = function(string) {
	  if (string === undefined || string === '') {
	    return error.value;
	  }
	  if (!isNaN(string)) {
	    return parseFloat(string);
	  }
	  return error.value;
	};

	exports.parseNumberArray = function(arr) {
	  var len;
	  if (!arr || (len = arr.length) === 0) {
	    return error.value;
	  }
	  var parsed;
	  while (len--) {
	    parsed = exports.parseNumber(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	  return arr;
	};

	exports.parseMatrix = function(matrix) {
	  var n;
	  if (!matrix || (n = matrix.length) === 0) {
	    return error.value;
	  }
	  var pnarr;
	  for (var i = 0; i < matrix.length; i++) {
	    pnarr = exports.parseNumberArray(matrix[i]);
	    matrix[i] = pnarr;
	    if (pnarr instanceof Error) {
	      return pnarr;
	    }
	  }
	  return matrix;
	};

	var d1900 = new Date(1900, 0, 1);
	exports.parseDate = function(date) {
	  if (!isNaN(date)) {
	    if (date instanceof Date) {
	      return new Date(date);
	    }
	    var d = parseInt(date, 10);
	    if (d < 0) {
	      return error.num;
	    }
	    if (d <= 60) {
	      return new Date(d1900.getTime() + (d - 1) * 86400000);
	    }
	    return new Date(d1900.getTime() + (d - 2) * 86400000);
	  }
	  if (typeof date === 'string') {
	    date = new Date(date);
	    if (!isNaN(date)) {
	      return date;
	    }
	  }
	  return error.value;
	};

	exports.parseDateArray = function(arr) {
	  var len = arr.length;
	  var parsed;
	  while (len--) {
	    parsed = this.parseDate(arr[len]);
	    if (parsed === error.value) {
	      return parsed;
	    }
	    arr[len] = parsed;
	  }
	  return arr;
	};

	exports.anyIsError = function() {
	  var n = arguments.length;
	  while (n--) {
	    if (arguments[n] instanceof Error) {
	      return true;
	    }
	  }
	  return false;
	};

	exports.arrayValuesToNumbers = function(arr) {
	  var n = arr.length;
	  var el;
	  while (n--) {
	    el = arr[n];
	    if (typeof el === 'number') {
	      continue;
	    }
	    if (el === true) {
	      arr[n] = 1;
	      continue;
	    }
	    if (el === false) {
	      arr[n] = 0;
	      continue;
	    }
	    if (typeof el === 'string') {
	      var number = this.parseNumber(el);
	      if (number instanceof Error) {
	        arr[n] = 0;
	      } else {
	        arr[n] = number;
	      }
	    }
	  }
	  return arr;
	};

	exports.rest = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(idx);
	};

	exports.initial = function(array, idx) {
	  idx = idx || 1;
	  if (!array || typeof array.slice !== 'function') {
	    return array;
	  }
	  return array.slice(0, array.length - idx);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	exports.nil = new Error('#NULL!');
	exports.div0 = new Error('#DIV/0!');
	exports.value = new Error('#VALUE?');
	exports.ref = new Error('#REF!');
	exports.name = new Error('#NAME?');
	exports.num = new Error('#NUM!');
	exports.na = new Error('#N/A');
	exports.error = new Error('#ERROR!');
	exports.data = new Error('#GETTING_DATA');


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(2);
	var text = __webpack_require__(7);
	var jStat = __webpack_require__(9).jStat;
	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var misc = __webpack_require__(10);

	var SQRT2PI = 2.5066282746310002;

	exports.AVEDEV = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return jStat.sum(jStat(range).subtract(jStat.mean(range)).abs()[0]) / range.length;
	};

	exports.AVERAGE = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  for (var i = 0; i < n; i++) {
	    sum += range[i];
	    count += 1;
	  }
	  return sum / count;
	};

	exports.AVERAGEA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sum = 0;
	  var count = 0;
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sum += el;
	    }
	    if (el === true) {
	      sum++;
	    }
	    if (el !== null) {
	      count++;
	    }
	  }
	  return sum / count;
	};

	exports.AVERAGEIF = function(range, criteria, average_range) {
	  average_range = average_range || range;
	  range = utils.flatten(range);
	  average_range = utils.parseNumberArray(utils.flatten(average_range));
	  if (average_range instanceof Error) {
	    return average_range;
	  }
	  var average_count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (eval(range[i] + criteria)) { // jshint ignore:line
	      result += average_range[i];
	      average_count++;
	    }
	  }
	  return result / average_count;
	};

	exports.AVERAGEIFS = function() {
	  // Does not work with multi dimensional ranges yet!
	  //http://office.microsoft.com/en-001/excel-help/averageifs-function-HA010047493.aspx
	  var args = utils.argsToArray(arguments);
	  var criteria = (args.length - 1) / 2;
	  var range = utils.flatten(args[0]);
	  var count = 0;
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    var condition = '';
	    for (var j = 0; j < criteria; j++) {
	      condition += args[2 * j + 1][i] + args[2 * j + 2];
	      if (j !== criteria - 1) {
	        condition += '&&';
	      }
	    }
	    if (eval(condition)) { // jshint ignore:line
	      result += range[i];
	      count++;
	    }
	  }

	  var average = result / count;
	  if (isNaN(average)) {
	    return 0;
	  } else {
	    return average;
	  }
	};

	exports.BETA = {};

	exports.BETA.DIST = function(x, alpha, beta, cumulative, A, B) {
	  if (arguments.length < 4) {
	    return error.value;
	  }

	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;

	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(x, alpha, beta, A, B)) {
	    return error.value;
	  }

	  x = (x - A) / (B - A);
	  return (cumulative) ? jStat.beta.cdf(x, alpha, beta) : jStat.beta.pdf(x, alpha, beta);
	};

	exports.BETA.INV = function(probability, alpha, beta, A, B) {
	  A = (A === undefined) ? 0 : A;
	  B = (B === undefined) ? 1 : B;

	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  A = utils.parseNumber(A);
	  B = utils.parseNumber(B);
	  if (utils.anyIsError(probability, alpha, beta, A, B)) {
	    return error.value;
	  }

	  return jStat.beta.inv(probability, alpha, beta) * (B - A) + A;
	};

	exports.BINOM = {};

	exports.BINOM.DIST = function(successes, trials, probability, cumulative) {
	  successes = utils.parseNumber(successes);
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  cumulative = utils.parseNumber(cumulative);
	  if (utils.anyIsError(successes, trials, probability, cumulative)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.binomial.cdf(successes, trials, probability) : jStat.binomial.pdf(successes, trials, probability);
	};

	exports.BINOM.DIST.RANGE = function(trials, probability, successes, successes2) {
	  successes2 = (successes2 === undefined) ? successes : successes2;

	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  successes = utils.parseNumber(successes);
	  successes2 = utils.parseNumber(successes2);
	  if (utils.anyIsError(trials, probability, successes, successes2)) {
	    return error.value;
	  }

	  var result = 0;
	  for (var i = successes; i <= successes2; i++) {
	    result += mathTrig.COMBIN(trials, i) * Math.pow(probability, i) * Math.pow(1 - probability, trials - i);
	  }
	  return result;
	};

	exports.BINOM.INV = function(trials, probability, alpha) {
	  trials = utils.parseNumber(trials);
	  probability = utils.parseNumber(probability);
	  alpha = utils.parseNumber(alpha);
	  if (utils.anyIsError(trials, probability, alpha)) {
	    return error.value;
	  }

	  var x = 0;
	  while (x <= trials) {
	    if (jStat.binomial.cdf(x, trials, probability) >= alpha) {
	      return x;
	    }
	    x++;
	  }
	};

	exports.CHISQ = {};

	exports.CHISQ.DIST = function(x, k, cumulative) {
	  x = utils.parseNumber(x);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(x, k)) {
	    return error.value;
	  }

	  return (cumulative) ? jStat.chisquare.cdf(x, k) : jStat.chisquare.pdf(x, k);
	};

	exports.CHISQ.DIST.RT = function(x, k) {
	  if (!x | !k) {
	    return error.na;
	  }

	  if (x < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }

	  return 1 -  jStat.chisquare.cdf(x, k);
	};

	exports.CHISQ.INV = function(probability, k) {
	  probability = utils.parseNumber(probability);
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(probability, k)) {
	    return error.value;
	  }
	  return jStat.chisquare.inv(probability, k);
	};

	exports.CHISQ.INV.RT = function(p, k) {
	  if (!p | !k) {
	    return error.na;
	  }

	  if (p < 0 || p > 1 || k < 1 || k > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof p !== 'number') || (typeof k !== 'number')) {
	    return error.value;
	  }

	  return jStat.chisquare.inv(1.0 - p, k);
	};

	exports.CHISQ.TEST = function(observed, expected) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if ((!(observed instanceof Array)) || (!(expected instanceof Array))) {
	    return error.value;
	  }

	  if (observed.length !== expected.length) {
	    return error.value;
	  }

	  if (observed[0] && expected[0] &&
	      observed[0].length !== expected[0].length) {
	    return error.value;
	  }

	  var row = observed.length;
	  var tmp, i, j;

	  // Convert single-dimension array into two-dimension array
	  for (i = 0; i < row; i ++) {
	    if (!(observed[i] instanceof Array)) {
	      tmp = observed[i];
	      observed[i] = [];
	      observed[i].push(tmp);
	    }
	    if (!(expected[i] instanceof Array)) {
	      tmp = expected[i];
	      expected[i] = [];
	      expected[i].push(tmp);
	    }
	  }

	  var col = observed[0].length;
	  var dof = (col === 1) ? row-1 : (row-1)*(col-1);
	  var xsqr = 0;
	  var Pi =Math.PI;

	  for (i = 0; i < row; i ++) {
	    for (j = 0; j < col; j ++) {
	      xsqr += Math.pow((observed[i][j] - expected[i][j]), 2) / expected[i][j];
	    }
	  }

	  // Get independency by X square and its degree of freedom
	  function ChiSq(xsqr, dof) {
	    var p = Math.exp(-0.5 * xsqr);
	    if((dof%2) === 1) {
	      p = p * Math.sqrt(2 * xsqr/Pi);
	    }
	    var k = dof;
	    while(k >= 2) {
	      p = p * xsqr/k;
	      k = k - 2;
	    }
	    var t = p;
	    var a = dof;
	    while (t > 0.0000000001*p) {
	      a = a + 2;
	      t = t * xsqr/a;
	      p = p + t;
	    }
	    return 1-p;
	  }

	  return Math.round(ChiSq(xsqr, dof) * 1000000) / 1000000;
	};

	exports.COLUMN = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (index < 0) {
	    return error.num;
	  }

	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return undefined;
	  }

	  return jStat.col(matrix, index);
	};

	exports.COLUMNS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return 0;
	  }

	  return jStat.cols(matrix);
	};

	exports.CONFIDENCE = {};

	exports.CONFIDENCE.NORM = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.normalci(1, alpha, sd, n)[1] - 1;
	};

	exports.CONFIDENCE.T = function(alpha, sd, n) {
	  alpha = utils.parseNumber(alpha);
	  sd = utils.parseNumber(sd);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(alpha, sd, n)) {
	    return error.value;
	  }
	  return jStat.tci(1, alpha, sd, n)[1] - 1;
	};

	exports.CORREL = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.corrcoeff(array1, array2);
	};

	exports.COUNT = function() {
	  return utils.numbers(utils.flatten(arguments)).length;
	};

	exports.COUNTA = function() {
	  var range = utils.flatten(arguments);
	  return range.length - exports.COUNTBLANK(range);
	};

	exports.COUNTIN = function (range, value) {
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (range[i] === value) {
	      result++;
	    }
	  }
	  return result;
	};


	exports.COUNTBLANK = function() {
	  var range = utils.flatten(arguments);
	  var blanks = 0;
	  var element;
	  for (var i = 0; i < range.length; i++) {
	    element = range[i];
	    if (element === null || element === '') {
	      blanks++;
	    }
	  }
	  return blanks;
	};

	exports.COUNTIF = function(range, criteria) {
	  range = utils.flatten(range);
	  if (!/[<>=!]/.test(criteria)) {
	    criteria = '=="' + criteria + '"';
	  }
	  var matches = 0;
	  for (var i = 0; i < range.length; i++) {
	    if (typeof range[i] !== 'string') {
	      if (eval(range[i] + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    } else {
	      if (eval('"' + range[i] + '"' + criteria)) { // jshint ignore:line
	        matches++;
	      }
	    }
	  }
	  return matches;
	};

	exports.COUNTIFS = function() {
	  var args = utils.argsToArray(arguments);
	  var results = new Array(utils.flatten(args[0]).length);
	  for (var i = 0; i < results.length; i++) {
	    results[i] = true;
	  }
	  for (i = 0; i < args.length; i += 2) {
	    var range = utils.flatten(args[i]);
	    var criteria = args[i + 1];
	    if (!/[<>=!]/.test(criteria)) {
	      criteria = '=="' + criteria + '"';
	    }
	    for (var j = 0; j < range.length; j++) {
	      if (typeof range[j] !== 'string') {
	        results[j] = results[j] && eval(range[j] + criteria); // jshint ignore:line
	      } else {
	        results[j] = results[j] && eval('"' + range[j] + '"' + criteria); // jshint ignore:line
	      }
	    }
	  }
	  var result = 0;
	  for (i = 0; i < results.length; i++) {
	    if (results[i]) {
	      result++;
	    }
	  }
	  return result;
	};

	exports.COUNTUNIQUE = function () {
	  return misc.UNIQUE.apply(null, utils.flatten(arguments)).length;
	};

	exports.COVARIANCE = {};

	exports.COVARIANCE.P = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  var mean1 = jStat.mean(array1);
	  var mean2 = jStat.mean(array2);
	  var result = 0;
	  var n = array1.length;
	  for (var i = 0; i < n; i++) {
	    result += (array1[i] - mean1) * (array2[i] - mean2);
	  }
	  return result / n;
	};

	exports.COVARIANCE.S = function(array1, array2) {
	  array1 = utils.parseNumberArray(utils.flatten(array1));
	  array2 = utils.parseNumberArray(utils.flatten(array2));
	  if (utils.anyIsError(array1, array2)) {
	    return error.value;
	  }
	  return jStat.covariance(array1, array2);
	};

	exports.DEVSQ = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += Math.pow((range[i] - mean), 2);
	  }
	  return result;
	};

	exports.EXPON = {};

	exports.EXPON.DIST = function(x, lambda, cumulative) {
	  x = utils.parseNumber(x);
	  lambda = utils.parseNumber(lambda);
	  if (utils.anyIsError(x, lambda)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.exponential.cdf(x, lambda) : jStat.exponential.pdf(x, lambda);
	};

	exports.F = {};

	exports.F.DIST = function(x, d1, d2, cumulative) {
	  x = utils.parseNumber(x);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(x, d1, d2)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.centralF.cdf(x, d1, d2) : jStat.centralF.pdf(x, d1, d2);
	};

	exports.F.DIST.RT = function(x, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (x < 0 || d1 < 1 || d2 < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }

	  return 1 - jStat.centralF.cdf(x, d1, d2);
	};

	exports.F.INV = function(probability, d1, d2) {
	  probability = utils.parseNumber(probability);
	  d1 = utils.parseNumber(d1);
	  d2 = utils.parseNumber(d2);
	  if (utils.anyIsError(probability, d1, d2)) {
	    return error.value;
	  }
	  if (probability <= 0.0 || probability > 1.0) {
	    return error.num;
	  }

	  return jStat.centralF.inv(probability, d1, d2);
	};

	exports.F.INV.RT = function(p, d1, d2) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (p < 0 || p > 1 || d1 < 1 || d1 > Math.pow(10, 10) || d2 < 1 || d2 > Math.pow(10, 10)) {
	    return error.num;
	  }

	  if ((typeof p !== 'number') || (typeof d1 !== 'number') || (typeof d2 !== 'number')) {
	    return error.value;
	  }

	  return jStat.centralF.inv(1.0 - p, d1, d2);
	};

	exports.F.TEST = function(array1, array2) {
	  if (!array1 || !array2) {
	    return error.na;
	  }

	  if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
	    return error.na;
	  }

	  if (array1.length < 2 || array2.length < 2) {
	    return error.div0;
	  }

	  var sumOfSquares = function(values, x1) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	      sum +=Math.pow((values[i] - x1), 2);
	    }
	    return sum;
	  };

	  var x1 = mathTrig.SUM(array1) / array1.length;
	  var x2 = mathTrig.SUM(array2) / array2.length;
	  var sum1 = sumOfSquares(array1, x1) / (array1.length - 1);
	  var sum2 = sumOfSquares(array2, x2) / (array2.length - 1);

	  return sum1 / sum2;
	};

	exports.FISHER = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return x;
	  }
	  return Math.log((1 + x) / (1 - x)) / 2;
	};

	exports.FISHERINV = function(y) {
	  y = utils.parseNumber(y);
	  if (y instanceof Error) {
	    return y;
	  }
	  var e2y = Math.exp(2 * y);
	  return (e2y - 1) / (e2y + 1);
	};

	exports.FORECAST = function(x, data_y, data_x) {
	  x = utils.parseNumber(x);
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(x, data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var b = num / den;
	  var a = ymean - b * xmean;
	  return a + b * x;
	};

	exports.FREQUENCY = function(data, bins) {
	  data = utils.parseNumberArray(utils.flatten(data));
	  bins = utils.parseNumberArray(utils.flatten(bins));
	  if (utils.anyIsError(data, bins)) {
	    return error.value;
	  }
	  var n = data.length;
	  var b = bins.length;
	  var r = [];
	  for (var i = 0; i <= b; i++) {
	    r[i] = 0;
	    for (var j = 0; j < n; j++) {
	      if (i === 0) {
	        if (data[j] <= bins[0]) {
	          r[0] += 1;
	        }
	      } else if (i < b) {
	        if (data[j] > bins[i - 1] && data[j] <= bins[i]) {
	          r[i] += 1;
	        }
	      } else if (i === b) {
	        if (data[j] > bins[b - 1]) {
	          r[b] += 1;
	        }
	      }
	    }
	  }
	  return r;
	};


	exports.GAMMA = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  if (number === 0) {
	    return error.num;
	  }

	  if (parseInt(number, 10) === number && number < 0) {
	    return error.num;
	  }

	  return jStat.gammafn(number);
	};

	exports.GAMMA.DIST = function(value, alpha, beta, cumulative) {
	  if (arguments.length !== 4) {
	    return error.na;
	  }

	  if (value < 0 || alpha <= 0 || beta <= 0) {
	    return error.value;
	  }

	  if ((typeof value !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }

	  return cumulative ? jStat.gamma.cdf(value, alpha, beta, true) : jStat.gamma.pdf(value, alpha, beta, false);
	};

	exports.GAMMA.INV = function(probability, alpha, beta) {
	  if (arguments.length !== 3) {
	    return error.na;
	  }

	  if (probability < 0 || probability > 1 || alpha <= 0 || beta <= 0) {
	    return error.num;
	  }

	  if ((typeof probability !== 'number') || (typeof alpha !== 'number') || (typeof beta !== 'number')) {
	    return error.value;
	  }

	  return jStat.gamma.inv(probability, alpha, beta);
	};

	exports.GAMMALN = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return jStat.gammaln(number);
	};

	exports.GAMMALN.PRECISE = function(x) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (x <= 0) {
	    return error.num;
	  }

	  if (typeof x !== 'number') {
	    return error.value;
	  }

	  return jStat.gammaln(x);
	};

	exports.GAUSS = function(z) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return z;
	  }
	  return jStat.normal.cdf(z, 0, 1) - 0.5;
	};

	exports.GEOMEAN = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }
	  return jStat.geomean(args);
	};

	exports.GROWTH = function(known_y, known_x, new_x, use_const) {
	  // Credits: Ilmari Karonen (http://stackoverflow.com/questions/14161990/how-to-implement-growth-function-in-javascript)

	  known_y = utils.parseNumberArray(known_y);
	  if (known_y instanceof Error) {
	    return known_y;
	  }

	  // Default values for optional parameters:
	  var i;
	  if (known_x === undefined) {
	    known_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      known_x.push(i);
	    }
	  }
	  if (new_x === undefined) {
	    new_x = [];
	    for (i = 1; i <= known_y.length; i++) {
	      new_x.push(i);
	    }
	  }

	  known_x = utils.parseNumberArray(known_x);
	  new_x = utils.parseNumberArray(new_x);
	  if (utils.anyIsError(known_x, new_x)) {
	    return error.value;
	  }


	  if (use_const === undefined) {
	    use_const = true;
	  }

	  // Calculate sums over the data:
	  var n = known_y.length;
	  var avg_x = 0;
	  var avg_y = 0;
	  var avg_xy = 0;
	  var avg_xx = 0;
	  for (i = 0; i < n; i++) {
	    var x = known_x[i];
	    var y = Math.log(known_y[i]);
	    avg_x += x;
	    avg_y += y;
	    avg_xy += x * y;
	    avg_xx += x * x;
	  }
	  avg_x /= n;
	  avg_y /= n;
	  avg_xy /= n;
	  avg_xx /= n;

	  // Compute linear regression coefficients:
	  var beta;
	  var alpha;
	  if (use_const) {
	    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
	    alpha = avg_y - beta * avg_x;
	  } else {
	    beta = avg_xy / avg_xx;
	    alpha = 0;
	  }

	  // Compute and return result array:
	  var new_y = [];
	  for (i = 0; i < new_x.length; i++) {
	    new_y.push(Math.exp(alpha + beta * new_x[i]));
	  }
	  return new_y;
	};

	exports.HARMEAN = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    den += 1 / range[i];
	  }
	  return n / den;
	};

	exports.HYPGEOM = {};

	exports.HYPGEOM.DIST = function(x, n, M, N, cumulative) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  M = utils.parseNumber(M);
	  N = utils.parseNumber(N);
	  if (utils.anyIsError(x, n, M, N)) {
	    return error.value;
	  }

	  function pdf(x, n, M, N) {
	    return mathTrig.COMBIN(M, x) * mathTrig.COMBIN(N - M, n - x) / mathTrig.COMBIN(N, n);
	  }

	  function cdf(x, n, M, N) {
	    var result = 0;
	    for (var i = 0; i <= x; i++) {
	      result += pdf(i, n, M, N);
	    }
	    return result;
	  }

	  return (cumulative) ? cdf(x, n, M, N) : pdf(x, n, M, N);
	};

	exports.INTERCEPT = function(known_y, known_x) {
	  known_y = utils.parseNumberArray(known_y);
	  known_x = utils.parseNumberArray(known_x);
	  if (utils.anyIsError(known_y, known_x)) {
	    return error.value;
	  }
	  if (known_y.length !== known_x.length) {
	    return error.na;
	  }
	  return exports.FORECAST(0, known_y, known_x);
	};

	exports.KURT = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 4);
	  }
	  sigma = sigma / Math.pow(jStat.stdev(range, true), 4);
	  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
	};

	exports.LARGE = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return b - a;
	  })[k - 1];
	};

	exports.LINEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var ymean = jStat.mean(data_y);
	  var xmean = jStat.mean(data_x);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  var m = num / den;
	  var b = ymean - m * xmean;
	  return [m, b];
	};

	// According to Microsoft:
	// http://office.microsoft.com/en-us/starter-help/logest-function-HP010342665.aspx
	// LOGEST returns are based on the following linear model:
	// ln y = x1 ln m1 + ... + xn ln mn + ln b
	exports.LOGEST = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  for (var i = 0; i < data_y.length; i ++) {
	    data_y[i] = Math.log(data_y[i]);
	  }

	  var result = exports.LINEST(data_y, data_x);
	  result[0] = Math.round(Math.exp(result[0])*1000000)/1000000;
	  result[1] = Math.round(Math.exp(result[1])*1000000)/1000000;
	  return result;
	};

	exports.LOGNORM = {};

	exports.LOGNORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.lognormal.cdf(x, mean, sd) : jStat.lognormal.pdf(x, mean, sd);
	};

	exports.LOGNORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.lognormal.inv(probability, mean, sd);
	};

	exports.MAX = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};

	exports.MAXA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.max.apply(Math, range);
	};

	exports.MEDIAN = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return jStat.median(range);
	};

	exports.MIN = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};

	exports.MINA = function() {
	  var range = utils.arrayValuesToNumbers(utils.flatten(arguments));
	  return (range.length === 0) ? 0 : Math.min.apply(Math, range);
	};

	exports.MODE = {};

	exports.MODE.MULT = function() {
	  // Credits: Roönaän
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var n = range.length;
	  var count = {};
	  var maxItems = [];
	  var max = 0;
	  var currentItem;

	  for (var i = 0; i < n; i++) {
	    currentItem = range[i];
	    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
	    if (count[currentItem] > max) {
	      max = count[currentItem];
	      maxItems = [];
	    }
	    if (count[currentItem] === max) {
	      maxItems[maxItems.length] = currentItem;
	    }
	  }
	  return maxItems;
	};

	exports.MODE.SNGL = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  return exports.MODE.MULT(range).sort(function(a, b) {
	    return a - b;
	  })[0];
	};

	exports.NEGBINOM = {};

	exports.NEGBINOM.DIST = function(k, r, p, cumulative) {
	  k = utils.parseNumber(k);
	  r = utils.parseNumber(r);
	  p = utils.parseNumber(p);
	  if (utils.anyIsError(k, r, p)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.negbin.cdf(k, r, p) : jStat.negbin.pdf(k, r, p);
	};

	exports.NORM = {};

	exports.NORM.DIST = function(x, mean, sd, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  if (sd <= 0) {
	    return error.num;
	  }

	  // Return normal distribution computed by jStat [http://jstat.org]
	  return (cumulative) ? jStat.normal.cdf(x, mean, sd) : jStat.normal.pdf(x, mean, sd);
	};

	exports.NORM.INV = function(probability, mean, sd) {
	  probability = utils.parseNumber(probability);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(probability, mean, sd)) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, mean, sd);
	};

	exports.NORM.S = {};

	exports.NORM.S.DIST = function(z, cumulative) {
	  z = utils.parseNumber(z);
	  if (z instanceof Error) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.normal.cdf(z, 0, 1) : jStat.normal.pdf(z, 0, 1);
	};

	exports.NORM.S.INV = function(probability) {
	  probability = utils.parseNumber(probability);
	  if (probability instanceof Error) {
	    return error.value;
	  }
	  return jStat.normal.inv(probability, 0, 1);
	};

	exports.PEARSON = function(data_x, data_y) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den1 = 0;
	  var den2 = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den1 += Math.pow(data_x[i] - xmean, 2);
	    den2 += Math.pow(data_y[i] - ymean, 2);
	  }
	  return num / Math.sqrt(den1 * den2);
	};

	exports.PERCENTILE = {};

	exports.PERCENTILE.EXC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    {
	      return a - b;
	    }
	  });
	  var n = array.length;
	  if (k < 1 / (n + 1) || k > 1 - 1 / (n + 1)) {
	    return error.num;
	  }
	  var l = k * (n + 1) - 1;
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};

	exports.PERCENTILE.INC = function(array, k) {
	  array = utils.parseNumberArray(utils.flatten(array));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(array, k)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var n = array.length;
	  var l = k * (n - 1);
	  var fl = Math.floor(l);
	  return utils.cleanFloat((l === fl) ? array[l] : array[fl] + (l - fl) * (array[fl + 1] - array[fl]));
	};

	exports.PERCENTRANK = {};

	exports.PERCENTRANK.EXC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = (array.indexOf(uniques[i]) + 1) / (n + 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};

	exports.PERCENTRANK.INC = function(array, x, significance) {
	  significance = (significance === undefined) ? 3 : significance;
	  array = utils.parseNumberArray(utils.flatten(array));
	  x = utils.parseNumber(x);
	  significance = utils.parseNumber(significance);
	  if (utils.anyIsError(array, x, significance)) {
	    return error.value;
	  }
	  array = array.sort(function(a, b) {
	    return a - b;
	  });
	  var uniques = misc.UNIQUE.apply(null, array);
	  var n = array.length;
	  var m = uniques.length;
	  var power = Math.pow(10, significance);
	  var result = 0;
	  var match = false;
	  var i = 0;
	  while (!match && i < m) {
	    if (x === uniques[i]) {
	      result = array.indexOf(uniques[i]) / (n - 1);
	      match = true;
	    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
	      result = (array.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
	      match = true;
	    }
	    i++;
	  }
	  return Math.floor(result * power) / power;
	};

	exports.PERMUT = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return mathTrig.FACT(number) / mathTrig.FACT(number - number_chosen);
	};

	exports.PERMUTATIONA = function(number, number_chosen) {
	  number = utils.parseNumber(number);
	  number_chosen = utils.parseNumber(number_chosen);
	  if (utils.anyIsError(number, number_chosen)) {
	    return error.value;
	  }
	  return Math.pow(number, number_chosen);
	};

	exports.PHI = function(x) {
	  x = utils.parseNumber(x);
	  if (x instanceof Error) {
	    return error.value;
	  }
	  return Math.exp(-0.5 * x * x) / SQRT2PI;
	};

	exports.POISSON = {};

	exports.POISSON.DIST = function(x, mean, cumulative) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  if (utils.anyIsError(x, mean)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.poisson.cdf(x, mean) : jStat.poisson.pdf(x, mean);
	};

	exports.PROB = function(range, probability, lower, upper) {
	  if (lower === undefined) {
	    return 0;
	  }
	  upper = (upper === undefined) ? lower : upper;

	  range = utils.parseNumberArray(utils.flatten(range));
	  probability = utils.parseNumberArray(utils.flatten(probability));
	  lower = utils.parseNumber(lower);
	  upper = utils.parseNumber(upper);
	  if (utils.anyIsError(range, probability, lower, upper)) {
	    return error.value;
	  }

	  if (lower === upper) {
	    return (range.indexOf(lower) >= 0) ? probability[range.indexOf(lower)] : 0;
	  }

	  var sorted = range.sort(function(a, b) {
	    return a - b;
	  });
	  var n = sorted.length;
	  var result = 0;
	  for (var i = 0; i < n; i++) {
	    if (sorted[i] >= lower && sorted[i] <= upper) {
	      result += probability[range.indexOf(sorted[i])];
	    }
	  }
	  return result;
	};

	exports.QUARTILE = {};

	exports.QUARTILE.EXC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.EXC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.EXC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.EXC(range, 0.75);
	    default:
	      return error.num;
	  }
	};

	exports.QUARTILE.INC = function(range, quart) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  quart = utils.parseNumber(quart);
	  if (utils.anyIsError(range, quart)) {
	    return error.value;
	  }
	  switch (quart) {
	    case 1:
	      return exports.PERCENTILE.INC(range, 0.25);
	    case 2:
	      return exports.PERCENTILE.INC(range, 0.5);
	    case 3:
	      return exports.PERCENTILE.INC(range, 0.75);
	    default:
	      return error.num;
	  }
	};

	exports.RANK = {};

	exports.RANK.AVG = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  range = utils.flatten(range);
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);

	  var length = range.length;
	  var count = 0;
	  for (var i = 0; i < length; i++) {
	    if (range[i] === number) {
	      count++;
	    }
	  }

	  return (count > 1) ? (2 * range.indexOf(number) + count + 1) / 2 : range.indexOf(number) + 1;
	};

	exports.RANK.EQ = function(number, range, order) {
	  number = utils.parseNumber(number);
	  range = utils.parseNumberArray(utils.flatten(range));
	  if (utils.anyIsError(number, range)) {
	    return error.value;
	  }
	  order = order || false;
	  var sort = (order) ? function(a, b) {
	    return a - b;
	  } : function(a, b) {
	    return b - a;
	  };
	  range = range.sort(sort);
	  return range.indexOf(number) + 1;
	};

	exports.ROW = function(matrix, index) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (index < 0) {
	    return error.num;
	  }

	  if (!(matrix instanceof Array) || (typeof index !== 'number')) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return undefined;
	  }

	  return jStat.row(matrix, index);
	};

	exports.ROWS = function(matrix) {
	  if (arguments.length !== 1) {
	    return error.na;
	  }

	  if (!(matrix instanceof Array)) {
	    return error.value;
	  }

	  if (matrix.length === 0) {
	    return 0;
	  }

	  return jStat.rows(matrix);
	};

	exports.RSQ = function(data_x, data_y) { // no need to flatten here, PEARSON will take care of that
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }
	  return Math.pow(exports.PEARSON(data_x, data_y), 2);
	};

	exports.SKEW = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var sigma = 0;
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 3);
	  }
	  return n * sigma / ((n - 1) * (n - 2) * Math.pow(jStat.stdev(range, true), 3));
	};

	exports.SKEW.P = function() {
	  var range = utils.parseNumberArray(utils.flatten(arguments));
	  if (range instanceof Error) {
	    return range;
	  }
	  var mean = jStat.mean(range);
	  var n = range.length;
	  var m2 = 0;
	  var m3 = 0;
	  for (var i = 0; i < n; i++) {
	    m3 += Math.pow(range[i] - mean, 3);
	    m2 += Math.pow(range[i] - mean, 2);
	  }
	  m3 = m3 / n;
	  m2 = m2 / n;
	  return m3 / Math.pow(m2, 3 / 2);
	};

	exports.SLOPE = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return num / den;
	};

	exports.SMALL = function(range, k) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  k = utils.parseNumber(k);
	  if (utils.anyIsError(range, k)) {
	    return range;
	  }
	  return range.sort(function(a, b) {
	    return a - b;
	  })[k - 1];
	};

	exports.STANDARDIZE = function(x, mean, sd) {
	  x = utils.parseNumber(x);
	  mean = utils.parseNumber(mean);
	  sd = utils.parseNumber(sd);
	  if (utils.anyIsError(x, mean, sd)) {
	    return error.value;
	  }
	  return (x - mean) / sd;
	};

	exports.STDEV = {};

	exports.STDEV.P = function() {
	  var v = exports.VAR.P.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEV.S = function() {
	  var v = exports.VAR.S.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEVA = function() {
	  var v = exports.VARA.apply(this, arguments);
	  return Math.sqrt(v);
	};

	exports.STDEVPA = function() {
	  var v = exports.VARPA.apply(this, arguments);
	  return Math.sqrt(v);
	};


	exports.STEYX = function(data_y, data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  if (utils.anyIsError(data_y, data_x)) {
	    return error.value;
	  }
	  var xmean = jStat.mean(data_x);
	  var ymean = jStat.mean(data_y);
	  var n = data_x.length;
	  var lft = 0;
	  var num = 0;
	  var den = 0;
	  for (var i = 0; i < n; i++) {
	    lft += Math.pow(data_y[i] - ymean, 2);
	    num += (data_x[i] - xmean) * (data_y[i] - ymean);
	    den += Math.pow(data_x[i] - xmean, 2);
	  }
	  return Math.sqrt((lft - num * num / den) / (n - 2));
	};

	exports.TRANSPOSE = function(matrix) {
	  if (!matrix) {
	    return error.na;
	  }
	  return jStat.transpose(matrix);
	};

	exports.T = text.T;

	exports.T.DIST = function(x, df, cumulative) {
	  x = utils.parseNumber(x);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(x, df)) {
	    return error.value;
	  }
	  return (cumulative) ? jStat.studentt.cdf(x, df) : jStat.studentt.pdf(x, df);
	};

	exports.T.DIST['2T'] = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (x < 0 || df < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }

	  return (1 - jStat.studentt.cdf(x , df)) * 2;
	};

	exports.T.DIST.RT = function(x, df) {
	  if (arguments.length !== 2) {
	    return error.na;
	  }

	  if (x < 0 || df < 1) {
	    return error.num;
	  }

	  if ((typeof x !== 'number') || (typeof df !== 'number')) {
	    return error.value;
	  }

	  return 1 - jStat.studentt.cdf(x , df);
	};

	exports.T.INV = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return jStat.studentt.inv(probability, df);
	};

	exports.T.INV['2T'] = function(probability, df) {
	  probability = utils.parseNumber(probability);
	  df = utils.parseNumber(df);
	  if (probability <= 0 || probability > 1 || df < 1) {
	    return error.num;
	  }
	  if (utils.anyIsError(probability, df)) {
	    return error.value;
	  }
	  return Math.abs(jStat.studentt.inv(probability/2, df));
	};

	// The algorithm can be found here:
	// http://www.chem.uoa.gr/applets/AppletTtest/Appl_Ttest2.html
	exports.T.TEST = function(data_x, data_y) {
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  if (utils.anyIsError(data_x, data_y)) {
	    return error.value;
	  }

	  var mean_x = jStat.mean(data_x);
	  var mean_y = jStat.mean(data_y);
	  var s_x = 0;
	  var s_y = 0;
	  var i;

	  for (i = 0; i < data_x.length; i++) {
	    s_x += Math.pow(data_x[i] - mean_x, 2);
	  }
	  for (i = 0; i < data_y.length; i++) {
	    s_y += Math.pow(data_y[i] - mean_y, 2);
	  }

	  s_x = s_x / (data_x.length-1);
	  s_y = s_y / (data_y.length-1);

	  var t = Math.abs(mean_x - mean_y) / Math.sqrt(s_x/data_x.length + s_y/data_y.length);

	  return exports.T.DIST['2T'](t, data_x.length+data_y.length-2);
	};

	exports.TREND = function(data_y, data_x, new_data_x) {
	  data_y = utils.parseNumberArray(utils.flatten(data_y));
	  data_x = utils.parseNumberArray(utils.flatten(data_x));
	  new_data_x = utils.parseNumberArray(utils.flatten(new_data_x));
	  if (utils.anyIsError(data_y, data_x, new_data_x)) {
	    return error.value;
	  }
	  var linest = exports.LINEST(data_y, data_x);
	  var m = linest[0];
	  var b = linest[1];
	  var result = [];

	  new_data_x.forEach(function(x) {
	    result.push(m * x + b);
	  });

	  return result;
	};

	exports.TRIMMEAN = function(range, percent) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  percent = utils.parseNumber(percent);
	  if (utils.anyIsError(range, percent)) {
	    return error.value;
	  }
	  var trim = mathTrig.FLOOR(range.length * percent, 2) / 2;
	  return jStat.mean(utils.initial(utils.rest(range.sort(function(a, b) {
	    return a - b;
	  }), trim), trim));
	};

	exports.VAR = {};

	exports.VAR.P = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / n;
	};

	exports.VAR.S = function() {
	  var range = utils.numbers(utils.flatten(arguments));
	  var n = range.length;
	  var sigma = 0;
	  var mean = exports.AVERAGE(range);
	  for (var i = 0; i < n; i++) {
	    sigma += Math.pow(range[i] - mean, 2);
	  }
	  return sigma / (n - 1);
	};

	exports.VARA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }

	    if (el !== null) {
	      count++;
	    }
	  }
	  return sigma / (count - 1);
	};

	exports.VARPA = function() {
	  var range = utils.flatten(arguments);
	  var n = range.length;
	  var sigma = 0;
	  var count = 0;
	  var mean = exports.AVERAGEA(range);
	  for (var i = 0; i < n; i++) {
	    var el = range[i];
	    if (typeof el === 'number') {
	      sigma += Math.pow(el - mean, 2);
	    } else if (el === true) {
	      sigma += Math.pow(1 - mean, 2);
	    } else {
	      sigma += Math.pow(0 - mean, 2);
	    }

	    if (el !== null) {
	      count++;
	    }
	  }
	  return sigma / count;
	};

	exports.WEIBULL = {};

	exports.WEIBULL.DIST = function(x, alpha, beta, cumulative) {
	  x = utils.parseNumber(x);
	  alpha = utils.parseNumber(alpha);
	  beta = utils.parseNumber(beta);
	  if (utils.anyIsError(x, alpha, beta)) {
	    return error.value;
	  }
	  return (cumulative) ? 1 - Math.exp(-Math.pow(x / beta, alpha)) : Math.pow(x, alpha - 1) * Math.exp(-Math.pow(x / beta, alpha)) * alpha / Math.pow(beta, alpha);
	};

	exports.Z = {};

	exports.Z.TEST = function(range, x, sd) {
	  range = utils.parseNumberArray(utils.flatten(range));
	  x = utils.parseNumber(x);
	  if (utils.anyIsError(range, x)) {
	    return error.value;
	  }

	  sd = sd || exports.STDEV.S(range);
	  var n = range.length;
	  return 1 - exports.NORM.S.DIST((exports.AVERAGE(range) - x) / (sd / Math.sqrt(n)), true);
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(4);
	var error = __webpack_require__(5);
	var numeral = __webpack_require__(8);

	//TODO
	exports.ASC = function() {
	 throw new Error('ASC is not implemented');
	};

	//TODO
	exports.BAHTTEXT = function() {
	 throw new Error('BAHTTEXT is not implemented');
	};

	exports.CHAR = function(number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return String.fromCharCode(number);
	};

	exports.CLEAN = function(text) {
	  text = text || '';
	  var re = /[\0-\x1F]/g;
	  return text.replace(re, "");
	};

	exports.CODE = function(text) {
	  text = text || '';
	  return text.charCodeAt(0);
	};

	exports.CONCATENATE = function() {
	  var args = utils.flatten(arguments);

	  var trueFound = 0;
	  while ((trueFound = args.indexOf(true)) > -1) {
	    args[trueFound] = 'TRUE';
	  }

	  var falseFound = 0;
	  while ((falseFound = args.indexOf(false)) > -1) {
	    args[falseFound] = 'FALSE';
	  }

	  return args.join('');
	};

	//TODO
	exports.DBCS = function() {
	 throw new Error('DBCS is not implemented');
	};

	exports.DOLLAR = function(number, decimals) {
	  decimals = (decimals === undefined) ? 2 : decimals;

	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }
	  var format = '';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	    format = '($0,0)';
	  } else if (decimals > 0) {
	    format = '($0,0.' + new Array(decimals + 1).join('0') + ')';
	  }
	  return numeral(number).format(format);
	};

	exports.EXACT = function(text1, text2) {
	  return text1 === text2;
	};

	exports.FIND = function(find_text, within_text, position) {
	  position = (position === undefined) ? 0 : position;
	  return within_text ? within_text.indexOf(find_text, position - 1) + 1 : null;
	};

	exports.FIXED = function(number, decimals, no_commas) {
	  decimals = (decimals === undefined) ? 2 : decimals;
	  no_commas = (no_commas === undefined) ? false : no_commas;

	  number = utils.parseNumber(number);
	  decimals = utils.parseNumber(decimals);
	  if (utils.anyIsError(number, decimals)) {
	    return error.value;
	  }

	  var format = no_commas ? '0' : '0,0';
	  if (decimals <= 0) {
	    number = Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	  } else if (decimals > 0) {
	    format += '.' + new Array(decimals + 1).join('0');
	  }
	  return numeral(number).format(format);
	};

	exports.HTML2TEXT = function (value) {
	  var result = '';

	  if (value) {
	    if (value instanceof Array) {
	      value.forEach(function (line) {
	        if (result !== '') {
	          result += '\n';
	        }
	        result += (line.replace(/<(?:.|\n)*?>/gm, ''));
	      });
	    } else {
	      result = value.replace(/<(?:.|\n)*?>/gm, '');
	    }
	  }

	  return result;
	};

	exports.LEFT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error || typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.substring(0, number) : null;
	};

	exports.LEN = function(text) {
	  if (arguments.length === 0) {
	    return error.error;
	  }

	  if (typeof text === 'string') {
	    return text ? text.length : 0;
	  }

	  if (text.length) {
	    return text.length;
	  }

	  return error.value;
	};

	exports.LOWER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text ? text.toLowerCase() : text;
	};

	exports.MID = function(text, start, number) {
	  start = utils.parseNumber(start);
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(start, number) || typeof text !== 'string') {
	    return number;
	  }

	  var begin = start - 1;
	  var end = begin + number;

	  return text.substring(begin, end);
	};

	// TODO
	exports.NUMBERVALUE = function (text, decimal_separator, group_separator)  {
	  decimal_separator = (typeof decimal_separator === 'undefined') ? '.' : decimal_separator;
	  group_separator = (typeof group_separator === 'undefined') ? ',' : group_separator;
	  return Number(text.replace(decimal_separator, '.').replace(group_separator, ''));
	};

	// TODO
	exports.PRONETIC = function() {
	 throw new Error('PRONETIC is not implemented');
	};

	exports.PROPER = function(text) {
	  if (text === undefined || text.length === 0) {
	    return error.value;
	  }
	  if (text === true) {
	    text = 'TRUE';
	  }
	  if (text === false) {
	    text = 'FALSE';
	  }
	  if (isNaN(text) && typeof text === 'number') {
	    return error.value;
	  }
	  if (typeof text === 'number') {
	    text = '' + text;
	  }

	  return text.replace(/\w\S*/g, function(txt) {
	    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	  });
	};

	exports.REGEXEXTRACT = function (text, regular_expression) {
	  var match = text.match(new RegExp(regular_expression));
	  return match ? (match[match.length > 1 ? match.length - 1 : 0]) : null;
	};

	exports.REGEXMATCH = function (text, regular_expression, full) {
	  var match = text.match(new RegExp(regular_expression));
	  return full ? match : !!match;
	};

	exports.REGEXREPLACE = function (text, regular_expression, replacement) {
	  return text.replace(new RegExp(regular_expression), replacement);
	};

	exports.REPLACE = function(text, position, length, new_text) {
	  position = utils.parseNumber(position);
	  length = utils.parseNumber(length);
	  if (utils.anyIsError(position, length) ||
	    typeof text !== 'string' ||
	    typeof new_text !== 'string') {
	    return error.value;
	  }
	  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
	};

	exports.REPT = function(text, number) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return new Array(number + 1).join(text);
	};

	exports.RIGHT = function(text, number) {
	  number = (number === undefined) ? 1 : number;
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }
	  return text ? text.substring(text.length - number) : null;
	};

	exports.SEARCH = function(find_text, within_text, position) {
	  var foundAt;
	  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
	    return error.value;
	  }
	  position = (position === undefined) ? 0 : position;
	  foundAt = within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1)+1;
	  return (foundAt === 0)?error.value:foundAt;
	};

	exports.SPLIT = function (text, separator) {
	  return text.split(separator);
	};

	exports.SUBSTITUTE = function(text, old_text, new_text, occurrence) {
	  if (!text || !old_text || !new_text) {
	    return text;
	  } else if (occurrence === undefined) {
	    return text.replace(new RegExp(old_text, 'g'), new_text);
	  } else {
	    var index = 0;
	    var i = 0;
	    while (text.indexOf(old_text, index) > 0) {
	      index = text.indexOf(old_text, index + 1);
	      i++;
	      if (i === occurrence) {
	        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
	      }
	    }
	  }
	};

	exports.T = function(value) {
	  return (typeof value === "string") ? value : '';
	};

	// TODO incomplete implementation
	exports.TEXT = function(value, format) {
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(value)) {
	    return error.na;
	  }

	  return numeral(value).format(format);
	};

	exports.TRIM = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.replace(/ +/g, ' ').trim();
	};

	exports.UNICHAR = this.CHAR;

	exports.UNICODE = this.CODE;

	exports.UPPER = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return text.toUpperCase();
	};

	exports.VALUE = function(text) {
	  if (typeof text !== 'string') {
	    return error.value;
	  }
	  return numeral().unformat(text);
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var utils   = __webpack_require__(4);
	var numeral = __webpack_require__(8);

	exports.UNIQUE = function () {
	  var result = [];
	  for (var i = 0; i < arguments.length; ++i) {
	    var hasElement = false;
	    var element    = arguments[i];

	    // Check if we've already seen this element.
	    for (var j = 0; j < result.length; ++j) {
	      hasElement = result[j] === element;
	      if (hasElement) { break; }
	    }

	    // If we did not find it, add it to the result.
	    if (!hasElement) {
	      result.push(element);
	    }
	  }
	  return result;
	};

	exports.FLATTEN = utils.flatten;

	exports.ARGS2ARRAY = function () {
	  return Array.prototype.slice.call(arguments, 0);
	};

	exports.REFERENCE = function (context, reference) {
	  try {
	    var path = reference.split('.');
	    var result = context;
	    for (var i = 0; i < path.length; ++i) {
	      var step = path[i];
	      if (step[step.length - 1] === ']') {
	        var opening = step.indexOf('[');
	        var index = step.substring(opening + 1, step.length - 1);
	        result = result[step.substring(0, opening)][index];
	      } else {
	        result = result[step];
	      }
	    }
	    return result;
	  } catch (error) {}
	};

	exports.JOIN = function (array, separator) {
	  return array.join(separator);
	};

	exports.NUMBERS = function () {
	  var possibleNumbers = utils.flatten(arguments);
	  return possibleNumbers.filter(function (el) {
	    return typeof el === 'number';
	  });
	};

	exports.NUMERAL = function (number, format) {
	  return numeral(number).format(format);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	// TODO
	exports.CELL = function() {
	 throw new Error('CELL is not implemented');
	};

	exports.ERROR = {};
	exports.ERROR.TYPE = function(error_val) {
	  switch (error_val) {
	    case error.nil: return 1;
	    case error.div0: return 2;
	    case error.value: return 3;
	    case error.ref: return 4;
	    case error.name: return 5;
	    case error.num: return 6;
	    case error.na: return 7;
	    case error.data: return 8;
	  }
	  return error.na;
	};

	// TODO
	exports.INFO = function() {
	 throw new Error('INFO is not implemented');
	};

	exports.ISBLANK = function(value) {
	  return value === null;
	};

	exports.ISBINARY = function (number) {
	  return (/^[01]{1,10}$/).test(number);
	};

	exports.ISERR = function(value) {
	  return ([error.value, error.ref, error.div0, error.num, error.name, error.nil]).indexOf(value) >= 0 ||
	    (typeof value === 'number' && (isNaN(value) || !isFinite(value)));
	};

	exports.ISERROR = function(value) {
	  return exports.ISERR(value) || value === error.na;
	};

	exports.ISEVEN = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? false : true;
	};

	// TODO
	exports.ISFORMULA = function() {
	  throw new Error('ISFORMULA is not implemented');
	};

	exports.ISLOGICAL = function(value) {
	  return value === true || value === false;
	};

	exports.ISNA = function(value) {
	  return value === error.na;
	};

	exports.ISNONTEXT = function(value) {
	  return typeof(value) !== 'string';
	};

	exports.ISNUMBER = function(value) {
	  return typeof(value) === 'number' && !isNaN(value) && isFinite(value);
	};

	exports.ISODD = function(number) {
	  return (Math.floor(Math.abs(number)) & 1) ? true : false;
	};

	// TODO
	exports.ISREF = function() {
	  throw new Error('ISREF is not implemented');
	};

	exports.ISTEXT = function(value) {
	  return typeof(value) === 'string';
	};

	exports.N = function(value) {
	  if (this.ISNUMBER(value)) {
	    return value;
	  }
	  if (value instanceof Date) {
	    return value.getTime();
	  }
	  if (value === true) {
	    return 1;
	  }
	  if (value === false) {
	    return 0;
	  }
	  if (this.ISERROR(value)) {
	    return value;
	  }
	  return 0;
	};

	exports.NA = function() {
	  return error.na;
	};


	// TODO
	exports.SHEET = function() {
	  throw new Error('SHEET is not implemented');
	};

	// TODO
	exports.SHEETS = function() {
	  throw new Error('SHEETS is not implemented');
	};

	exports.TYPE = function(value) {
	  if (this.ISNUMBER(value)) {
	    return 1;
	  }
	  if (this.ISTEXT(value)) {
	    return 2;
	  }
	  if (this.ISLOGICAL(value)) {
	    return 4;
	  }
	  if (this.ISERROR(value)) {
	    return 16;
	  }
	  if (Array.isArray(value)) {
	    return 64;
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var jStat = __webpack_require__(9).jStat;
	var text = __webpack_require__(7);
	var utils = __webpack_require__(4);
	var bessel = __webpack_require__(13);

	function isValidBinaryNumber(number) {
	  return (/^[01]{1,10}$/).test(number);
	}

	exports.BESSELI = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besseli(x, n);
	};

	exports.BESSELJ = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besselj(x, n);
	};

	exports.BESSELK = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.besselk(x, n);
	};

	exports.BESSELY = function(x, n) {
	  x = utils.parseNumber(x);
	  n = utils.parseNumber(n);
	  if (utils.anyIsError(x, n)) {
	    return error.value;
	  }
	  return bessel.bessely(x, n);
	};

	exports.BIN2DEC = function(number) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Convert binary number to decimal
	  var result = parseInt(number, 2);

	  // Handle negative numbers
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return parseInt(stringified.substring(1), 2) - 512;
	  } else {
	    return result;
	  }
	};


	exports.BIN2HEX = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1099511627264 + parseInt(stringified.substring(1), 2)).toString(16);
	  }

	  // Convert binary number to hexadecimal
	  var result = parseInt(number, 2).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BIN2OCT = function(number, places) {
	  // Return error if number is not binary or contains more than 10 characters (10 digits)
	  if (!isValidBinaryNumber(number)) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  var stringified = number.toString();
	  if (stringified.length === 10 && stringified.substring(0, 1) === '1') {
	    return (1073741312 + parseInt(stringified.substring(1), 2)).toString(8);
	  }

	  // Convert binary number to octal
	  var result = parseInt(number, 2).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.BITAND = function(number1, number2) {
	  // Return error if either number is a non-numeric value
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise AND of two numbers
	  return number1 & number2;
	};

	exports.BITLSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the left or to the right if shift is negative
	  return (shift >= 0) ? number << shift : number >> -shift;
	};

	exports.BITOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise OR of two numbers
	  return number1 | number2;
	};

	exports.BITRSHIFT = function(number, shift) {
	  number = utils.parseNumber(number);
	  shift = utils.parseNumber(shift);
	  if (utils.anyIsError(number, shift)) {
	    return error.value;
	  }

	  // Return error if number is less than 0
	  if (number < 0) {
	    return error.num;
	  }

	  // Return error if number is a non-integer
	  if (Math.floor(number) !== number) {
	    return error.num;
	  }

	  // Return error if number is greater than (2^48)-1
	  if (number > 281474976710655) {
	    return error.num;
	  }

	  // Return error if the absolute value of shift is greater than 53
	  if (Math.abs(shift) > 53) {
	    return error.num;
	  }

	  // Return number shifted by shift bits to the right or to the left if shift is negative
	  return (shift >= 0) ? number >> shift : number << -shift;
	};

	exports.BITXOR = function(number1, number2) {
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return error if either number is less than 0
	  if (number1 < 0 || number2 < 0) {
	    return error.num;
	  }

	  // Return error if either number is a non-integer
	  if (Math.floor(number1) !== number1 || Math.floor(number2) !== number2) {
	    return error.num;
	  }

	  // Return error if either number is greater than (2^48)-1
	  if (number1 > 281474976710655 || number2 > 281474976710655) {
	    return error.num;
	  }

	  // Return bitwise XOR of two numbers
	  return number1 ^ number2;
	};

	exports.COMPLEX = function(real, imaginary, suffix) {
	  real = utils.parseNumber(real);
	  imaginary = utils.parseNumber(imaginary);
	  if (utils.anyIsError(real, imaginary)) {
	    return real;
	  }

	  // Set suffix
	  suffix = (suffix === undefined) ? 'i' : suffix;

	  // Return error if suffix is neither "i" nor "j"
	  if (suffix !== 'i' && suffix !== 'j') {
	    return error.value;
	  }

	  // Return complex number
	  if (real === 0 && imaginary === 0) {
	    return 0;
	  } else if (real === 0) {
	    return (imaginary === 1) ? suffix : imaginary.toString() + suffix;
	  } else if (imaginary === 0) {
	    return real.toString();
	  } else {
	    var sign = (imaginary > 0) ? '+' : '';
	    return real.toString() + sign + ((imaginary === 1) ? suffix : imaginary.toString() + suffix);
	  }
	};

	exports.CONVERT = function(number, from_unit, to_unit) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // List of units supported by CONVERT and units defined by the International System of Units
	  // [Name, Symbol, Alternate symbols, Quantity, ISU, CONVERT, Conversion ratio]
	  var units = [
	    ["a.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["a.u. of charge", "e", null, "electric_charge", false, false, 1.60217653141414e-19],
	    ["a.u. of energy", "Eh", null, "energy", false, false, 4.35974417757576e-18],
	    ["a.u. of length", "a?", null, "length", false, false, 5.29177210818182e-11],
	    ["a.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["a.u. of time", "?/Eh", null, "time", false, false, 2.41888432650516e-17],
	    ["admiralty knot", "admkn", null, "speed", false, true, 0.514773333],
	    ["ampere", "A", null, "electric_current", true, false, 1],
	    ["ampere per meter", "A/m", null, "magnetic_field_intensity", true, false, 1],
	    ["ångström", "Å", ["ang"], "length", false, true, 1e-10],
	    ["are", "ar", null, "area", false, true, 100],
	    ["astronomical unit", "ua", null, "length", false, false, 1.49597870691667e-11],
	    ["bar", "bar", null, "pressure", false, false, 100000],
	    ["barn", "b", null, "area", false, false, 1e-28],
	    ["becquerel", "Bq", null, "radioactivity", true, false, 1],
	    ["bit", "bit", ["b"], "information", false, true, 1],
	    ["btu", "BTU", ["btu"], "energy", false, true, 1055.05585262],
	    ["byte", "byte", null, "information", false, true, 8],
	    ["candela", "cd", null, "luminous_intensity", true, false, 1],
	    ["candela per square metre", "cd/m?", null, "luminance", true, false, 1],
	    ["coulomb", "C", null, "electric_charge", true, false, 1],
	    ["cubic ångström", "ang3", ["ang^3"], "volume", false, true, 1e-30],
	    ["cubic foot", "ft3", ["ft^3"], "volume", false, true, 0.028316846592],
	    ["cubic inch", "in3", ["in^3"], "volume", false, true, 0.000016387064],
	    ["cubic light-year", "ly3", ["ly^3"], "volume", false, true, 8.46786664623715e-47],
	    ["cubic metre", "m?", null, "volume", true, true, 1],
	    ["cubic mile", "mi3", ["mi^3"], "volume", false, true, 4168181825.44058],
	    ["cubic nautical mile", "Nmi3", ["Nmi^3"], "volume", false, true, 6352182208],
	    ["cubic Pica", "Pica3", ["Picapt3", "Pica^3", "Picapt^3"], "volume", false, true, 7.58660370370369e-8],
	    ["cubic yard", "yd3", ["yd^3"], "volume", false, true, 0.764554857984],
	    ["cup", "cup", null, "volume", false, true, 0.0002365882365],
	    ["dalton", "Da", ["u"], "mass", false, false, 1.66053886282828e-27],
	    ["day", "d", ["day"], "time", false, true, 86400],
	    ["degree", "°", null, "angle", false, false, 0.0174532925199433],
	    ["degrees Rankine", "Rank", null, "temperature", false, true, 0.555555555555556],
	    ["dyne", "dyn", ["dy"], "force", false, true, 0.00001],
	    ["electronvolt", "eV", ["ev"], "energy", false, true, 1.60217656514141],
	    ["ell", "ell", null, "length", false, true, 1.143],
	    ["erg", "erg", ["e"], "energy", false, true, 1e-7],
	    ["farad", "F", null, "electric_capacitance", true, false, 1],
	    ["fluid ounce", "oz", null, "volume", false, true, 0.0000295735295625],
	    ["foot", "ft", null, "length", false, true, 0.3048],
	    ["foot-pound", "flb", null, "energy", false, true, 1.3558179483314],
	    ["gal", "Gal", null, "acceleration", false, false, 0.01],
	    ["gallon", "gal", null, "volume", false, true, 0.003785411784],
	    ["gauss", "G", ["ga"], "magnetic_flux_density", false, true, 1],
	    ["grain", "grain", null, "mass", false, true, 0.0000647989],
	    ["gram", "g", null, "mass", false, true, 0.001],
	    ["gray", "Gy", null, "absorbed_dose", true, false, 1],
	    ["gross registered ton", "GRT", ["regton"], "volume", false, true, 2.8316846592],
	    ["hectare", "ha", null, "area", false, true, 10000],
	    ["henry", "H", null, "inductance", true, false, 1],
	    ["hertz", "Hz", null, "frequency", true, false, 1],
	    ["horsepower", "HP", ["h"], "power", false, true, 745.69987158227],
	    ["horsepower-hour", "HPh", ["hh", "hph"], "energy", false, true, 2684519.538],
	    ["hour", "h", ["hr"], "time", false, true, 3600],
	    ["imperial gallon (U.K.)", "uk_gal", null, "volume", false, true, 0.00454609],
	    ["imperial hundredweight", "lcwt", ["uk_cwt", "hweight"], "mass", false, true, 50.802345],
	    ["imperial quart (U.K)", "uk_qt", null, "volume", false, true, 0.0011365225],
	    ["imperial ton", "brton", ["uk_ton", "LTON"], "mass", false, true, 1016.046909],
	    ["inch", "in", null, "length", false, true, 0.0254],
	    ["international acre", "uk_acre", null, "area", false, true, 4046.8564224],
	    ["IT calorie", "cal", null, "energy", false, true, 4.1868],
	    ["joule", "J", null, "energy", true, true, 1],
	    ["katal", "kat", null, "catalytic_activity", true, false, 1],
	    ["kelvin", "K", ["kel"], "temperature", true, true, 1],
	    ["kilogram", "kg", null, "mass", true, true, 1],
	    ["knot", "kn", null, "speed", false, true, 0.514444444444444],
	    ["light-year", "ly", null, "length", false, true, 9460730472580800],
	    ["litre", "L", ["l", "lt"], "volume", false, true, 0.001],
	    ["lumen", "lm", null, "luminous_flux", true, false, 1],
	    ["lux", "lx", null, "illuminance", true, false, 1],
	    ["maxwell", "Mx", null, "magnetic_flux", false, false, 1e-18],
	    ["measurement ton", "MTON", null, "volume", false, true, 1.13267386368],
	    ["meter per hour", "m/h", ["m/hr"], "speed", false, true, 0.00027777777777778],
	    ["meter per second", "m/s", ["m/sec"], "speed", true, true, 1],
	    ["meter per second squared", "m?s??", null, "acceleration", true, false, 1],
	    ["parsec", "pc", ["parsec"], "length", false, true, 30856775814671900],
	    ["meter squared per second", "m?/s", null, "kinematic_viscosity", true, false, 1],
	    ["metre", "m", null, "length", true, true, 1],
	    ["miles per hour", "mph", null, "speed", false, true, 0.44704],
	    ["millimetre of mercury", "mmHg", null, "pressure", false, false, 133.322],
	    ["minute", "?", null, "angle", false, false, 0.000290888208665722],
	    ["minute", "min", ["mn"], "time", false, true, 60],
	    ["modern teaspoon", "tspm", null, "volume", false, true, 0.000005],
	    ["mole", "mol", null, "amount_of_substance", true, false, 1],
	    ["morgen", "Morgen", null, "area", false, true, 2500],
	    ["n.u. of action", "?", null, "action", false, false, 1.05457168181818e-34],
	    ["n.u. of mass", "m?", null, "mass", false, false, 9.10938261616162e-31],
	    ["n.u. of speed", "c?", null, "speed", false, false, 299792458],
	    ["n.u. of time", "?/(me?c??)", null, "time", false, false, 1.28808866778687e-21],
	    ["nautical mile", "M", ["Nmi"], "length", false, true, 1852],
	    ["newton", "N", null, "force", true, true, 1],
	    ["œrsted", "Oe ", null, "magnetic_field_intensity", false, false, 79.5774715459477],
	    ["ohm", "Ω", null, "electric_resistance", true, false, 1],
	    ["ounce mass", "ozm", null, "mass", false, true, 0.028349523125],
	    ["pascal", "Pa", null, "pressure", true, false, 1],
	    ["pascal second", "Pa?s", null, "dynamic_viscosity", true, false, 1],
	    ["pferdestärke", "PS", null, "power", false, true, 735.49875],
	    ["phot", "ph", null, "illuminance", false, false, 0.0001],
	    ["pica (1/6 inch)", "pica", null, "length", false, true, 0.00035277777777778],
	    ["pica (1/72 inch)", "Pica", ["Picapt"], "length", false, true, 0.00423333333333333],
	    ["poise", "P", null, "dynamic_viscosity", false, false, 0.1],
	    ["pond", "pond", null, "force", false, true, 0.00980665],
	    ["pound force", "lbf", null, "force", false, true, 4.4482216152605],
	    ["pound mass", "lbm", null, "mass", false, true, 0.45359237],
	    ["quart", "qt", null, "volume", false, true, 0.000946352946],
	    ["radian", "rad", null, "angle", true, false, 1],
	    ["second", "?", null, "angle", false, false, 0.00000484813681109536],
	    ["second", "s", ["sec"], "time", true, true, 1],
	    ["short hundredweight", "cwt", ["shweight"], "mass", false, true, 45.359237],
	    ["siemens", "S", null, "electrical_conductance", true, false, 1],
	    ["sievert", "Sv", null, "equivalent_dose", true, false, 1],
	    ["slug", "sg", null, "mass", false, true, 14.59390294],
	    ["square ångström", "ang2", ["ang^2"], "area", false, true, 1e-20],
	    ["square foot", "ft2", ["ft^2"], "area", false, true, 0.09290304],
	    ["square inch", "in2", ["in^2"], "area", false, true, 0.00064516],
	    ["square light-year", "ly2", ["ly^2"], "area", false, true, 8.95054210748189e+31],
	    ["square meter", "m?", null, "area", true, true, 1],
	    ["square mile", "mi2", ["mi^2"], "area", false, true, 2589988.110336],
	    ["square nautical mile", "Nmi2", ["Nmi^2"], "area", false, true, 3429904],
	    ["square Pica", "Pica2", ["Picapt2", "Pica^2", "Picapt^2"], "area", false, true, 0.00001792111111111],
	    ["square yard", "yd2", ["yd^2"], "area", false, true, 0.83612736],
	    ["statute mile", "mi", null, "length", false, true, 1609.344],
	    ["steradian", "sr", null, "solid_angle", true, false, 1],
	    ["stilb", "sb", null, "luminance", false, false, 0.0001],
	    ["stokes", "St", null, "kinematic_viscosity", false, false, 0.0001],
	    ["stone", "stone", null, "mass", false, true, 6.35029318],
	    ["tablespoon", "tbs", null, "volume", false, true, 0.0000147868],
	    ["teaspoon", "tsp", null, "volume", false, true, 0.00000492892],
	    ["tesla", "T", null, "magnetic_flux_density", true, true, 1],
	    ["thermodynamic calorie", "c", null, "energy", false, true, 4.184],
	    ["ton", "ton", null, "mass", false, true, 907.18474],
	    ["tonne", "t", null, "mass", false, false, 1000],
	    ["U.K. pint", "uk_pt", null, "volume", false, true, 0.00056826125],
	    ["U.S. bushel", "bushel", null, "volume", false, true, 0.03523907],
	    ["U.S. oil barrel", "barrel", null, "volume", false, true, 0.158987295],
	    ["U.S. pint", "pt", ["us_pt"], "volume", false, true, 0.000473176473],
	    ["U.S. survey mile", "survey_mi", null, "length", false, true, 1609.347219],
	    ["U.S. survey/statute acre", "us_acre", null, "area", false, true, 4046.87261],
	    ["volt", "V", null, "voltage", true, false, 1],
	    ["watt", "W", null, "power", true, true, 1],
	    ["watt-hour", "Wh", ["wh"], "energy", false, true, 3600],
	    ["weber", "Wb", null, "magnetic_flux", true, false, 1],
	    ["yard", "yd", null, "length", false, true, 0.9144],
	    ["year", "yr", null, "time", false, true, 31557600]
	  ];

	  // Binary prefixes
	  // [Name, Prefix power of 2 value, Previx value, Abbreviation, Derived from]
	  var binary_prefixes = {
	    Yi: ["yobi", 80, 1208925819614629174706176, "Yi", "yotta"],
	    Zi: ["zebi", 70, 1180591620717411303424, "Zi", "zetta"],
	    Ei: ["exbi", 60, 1152921504606846976, "Ei", "exa"],
	    Pi: ["pebi", 50, 1125899906842624, "Pi", "peta"],
	    Ti: ["tebi", 40, 1099511627776, "Ti", "tera"],
	    Gi: ["gibi", 30, 1073741824, "Gi", "giga"],
	    Mi: ["mebi", 20, 1048576, "Mi", "mega"],
	    ki: ["kibi", 10, 1024, "ki", "kilo"]
	  };

	  // Unit prefixes
	  // [Name, Multiplier, Abbreviation]
	  var unit_prefixes = {
	    Y: ["yotta", 1e+24, "Y"],
	    Z: ["zetta", 1e+21, "Z"],
	    E: ["exa", 1e+18, "E"],
	    P: ["peta", 1e+15, "P"],
	    T: ["tera", 1e+12, "T"],
	    G: ["giga", 1e+09, "G"],
	    M: ["mega", 1e+06, "M"],
	    k: ["kilo", 1e+03, "k"],
	    h: ["hecto", 1e+02, "h"],
	    e: ["dekao", 1e+01, "e"],
	    d: ["deci", 1e-01, "d"],
	    c: ["centi", 1e-02, "c"],
	    m: ["milli", 1e-03, "m"],
	    u: ["micro", 1e-06, "u"],
	    n: ["nano", 1e-09, "n"],
	    p: ["pico", 1e-12, "p"],
	    f: ["femto", 1e-15, "f"],
	    a: ["atto", 1e-18, "a"],
	    z: ["zepto", 1e-21, "z"],
	    y: ["yocto", 1e-24, "y"]
	  };

	  // Initialize units and multipliers
	  var from = null;
	  var to = null;
	  var base_from_unit = from_unit;
	  var base_to_unit = to_unit;
	  var from_multiplier = 1;
	  var to_multiplier = 1;
	  var alt;

	  // Lookup from and to units
	  for (var i = 0; i < units.length; i++) {
	    alt = (units[i][2] === null) ? [] : units[i][2];
	    if (units[i][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	      from = units[i];
	    }
	    if (units[i][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	      to = units[i];
	    }
	  }

	  // Lookup from prefix
	  if (from === null) {
	    var from_binary_prefix = binary_prefixes[from_unit.substring(0, 2)];
	    var from_unit_prefix = unit_prefixes[from_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (from_unit.substring(0, 2) === 'da') {
	      from_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (from_binary_prefix) {
	      from_multiplier = from_binary_prefix[2];
	      base_from_unit = from_unit.substring(2);
	    } else if (from_unit_prefix) {
	      from_multiplier = from_unit_prefix[1];
	      base_from_unit = from_unit.substring(from_unit_prefix[2].length);
	    }

	    // Lookup from unit
	    for (var j = 0; j < units.length; j++) {
	      alt = (units[j][2] === null) ? [] : units[j][2];
	      if (units[j][1] === base_from_unit || alt.indexOf(base_from_unit) >= 0) {
	        from = units[j];
	      }
	    }
	  }

	  // Lookup to prefix
	  if (to === null) {
	    var to_binary_prefix = binary_prefixes[to_unit.substring(0, 2)];
	    var to_unit_prefix = unit_prefixes[to_unit.substring(0, 1)];

	    // Handle dekao unit prefix (only unit prefix with two characters)
	    if (to_unit.substring(0, 2) === 'da') {
	      to_unit_prefix = ["dekao", 1e+01, "da"];
	    }

	    // Handle binary prefixes first (so that 'Yi' is processed before 'Y')
	    if (to_binary_prefix) {
	      to_multiplier = to_binary_prefix[2];
	      base_to_unit = to_unit.substring(2);
	    } else if (to_unit_prefix) {
	      to_multiplier = to_unit_prefix[1];
	      base_to_unit = to_unit.substring(to_unit_prefix[2].length);
	    }

	    // Lookup to unit
	    for (var k = 0; k < units.length; k++) {
	      alt = (units[k][2] === null) ? [] : units[k][2];
	      if (units[k][1] === base_to_unit || alt.indexOf(base_to_unit) >= 0) {
	        to = units[k];
	      }
	    }
	  }

	  // Return error if a unit does not exist
	  if (from === null || to === null) {
	    return error.na;
	  }

	  // Return error if units represent different quantities
	  if (from[3] !== to[3]) {
	    return error.na;
	  }

	  // Return converted number
	  return number * from[6] * from_multiplier / (to[6] * to_multiplier);
	};

	exports.DEC2BIN = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -512, or is greater than 511
	  if (!/^-?[0-9]{1,3}$/.test(number) || number < -512 || number > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (number < 0) {
	    return '1' + text.REPT('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = parseInt(number, 10).toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2HEX = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,12}$/.test(number) || number < -549755813888 || number > 549755813887) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character hexadecimal number if number is negative
	  if (number < 0) {
	    return (1099511627776 + number).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = parseInt(number, 10).toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DEC2OCT = function(number, places) {
	  number = utils.parseNumber(number);
	  if (number instanceof Error) {
	    return number;
	  }

	  // Return error if number is not decimal, is lower than -549755813888, or is greater than 549755813887
	  if (!/^-?[0-9]{1,9}$/.test(number) || number < -536870912 || number > 536870911) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (number < 0) {
	    return (1073741824 + number).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = parseInt(number, 10).toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.DELTA = function(number1, number2) {
	  // Set number2 to zero if undefined
	  number2 = (number2 === undefined) ? 0 : number2;
	  number1 = utils.parseNumber(number1);
	  number2 = utils.parseNumber(number2);
	  if (utils.anyIsError(number1, number2)) {
	    return error.value;
	  }

	  // Return delta
	  return (number1 === number2) ? 1 : 0;
	};

	// TODO: why is upper_bound not used ? The excel documentation has no examples with upper_bound
	exports.ERF = function(lower_bound, upper_bound) {
	  // Set number2 to zero if undefined
	  upper_bound = (upper_bound === undefined) ? 0 : upper_bound;

	  lower_bound = utils.parseNumber(lower_bound);
	  upper_bound = utils.parseNumber(upper_bound);
	  if (utils.anyIsError(lower_bound, upper_bound)) {
	    return error.value;
	  }

	  return jStat.erf(lower_bound);
	};

	// TODO
	exports.ERF.PRECISE = function() {
	 throw new Error('ERF.PRECISE is not implemented');
	};

	exports.ERFC = function(x) {
	  // Return error if x is not a number
	  if (isNaN(x)) {
	    return error.value;
	  }

	  return jStat.erfc(x);
	};

	// TODO
	exports.ERFC.PRECISE = function() {
	 throw new Error('ERFC.PRECISE is not implemented');
	};

	exports.GESTEP = function(number, step) {
	  step = step || 0;
	  number = utils.parseNumber(number);
	  if (utils.anyIsError(step, number)) {
	    return number;
	  }

	  // Return delta
	  return (number >= step) ? 1 : 0;
	};

	exports.HEX2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1).toLowerCase() === 'f') ? true : false;

	  // Convert hexadecimal number to decimal
	  var decimal = (negative) ? parseInt(number, 16) - 1099511627776 : parseInt(number, 16);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.HEX2DEC = function(number) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return decimal number
	  return (decimal >= 549755813888) ? decimal - 1099511627776 : decimal;
	};

	exports.HEX2OCT = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-9A-Fa-f]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert hexadecimal number to decimal
	  var decimal = parseInt(number, 16);

	  // Return error if number is positive and greater than 0x1fffffff (536870911)
	  if (decimal > 536870911 && decimal < 1098974756864) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 1098974756864) {
	    return (decimal - 1098437885952).toString(8);
	  }

	  // Convert decimal number to octal
	  var result = decimal.toString(8);

	  // Return octal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.IMABS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return absolute value of complex number
	  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	};

	exports.IMAGINARY = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', 'j'].indexOf(inumber) >= 0) {
	    return 1;
	  }

	  // Normalize imaginary coefficient
	  inumber = inumber.replace('+i', '+1i').replace('-i', '-1i').replace('+j', '+1j').replace('-j', '-1j');

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }

	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return imaginary coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(plus + 1, inumber.length - 1));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        -Number(inumber.substring(minus + 1, inumber.length - 1));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : inumber.substring(0, inumber.length - 1);
	    } else {
	      return (isNaN(inumber)) ? error.num : 0;
	    }
	  }
	};

	exports.IMARGUMENT = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return error if inumber is equal to zero
	  if (x === 0 && y === 0) {
	    return error.div0;
	  }

	  // Return PI/2 if x is equal to zero and y is positive
	  if (x === 0 && y > 0) {
	    return Math.PI / 2;
	  }

	  // Return -PI/2 if x is equal to zero and y is negative
	  if (x === 0 && y < 0) {
	    return -Math.PI / 2;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x > 0) {
	    return 0;
	  }

	  // Return zero if x is negative and y is equal to zero
	  if (y === 0 && x < 0) {
	    return -Math.PI;
	  }

	  // Return argument of complex number
	  if (x > 0) {
	    return Math.atan(y / x);
	  } else if (x < 0 && y >= 0) {
	    return Math.atan(y / x) + Math.PI;
	  } else {
	    return Math.atan(y / x) - Math.PI;
	  }
	};

	exports.IMCONJUGATE = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return conjugate of complex number
	  return (y !== 0) ? exports.COMPLEX(x, -y, unit) : inumber;
	};

	exports.IMCOS = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return cosine of complex number
	  return exports.COMPLEX(Math.cos(x) * (Math.exp(y) + Math.exp(-y)) / 2, -Math.sin(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMCOSH = function(inumber) {
	  // Lookup real and imaginary coefficients using exports.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic cosine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) + Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) - Math.exp(-x)) / 2, unit);
	};

	exports.IMCOT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return cotangent of complex number
	  return exports.IMDIV(exports.IMCOS(inumber), exports.IMSIN(inumber));
	};

	exports.IMDIV = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = exports.IMREAL(inumber1);
	  var b = exports.IMAGINARY(inumber1);
	  var c = exports.IMREAL(inumber2);
	  var d = exports.IMAGINARY(inumber2);

	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return error if inumber2 is null
	  if (c === 0 && d === 0) {
	    return error.num;
	  }

	  // Return exponential of complex number
	  var den = c * c + d * d;
	  return exports.COMPLEX((a * c + b * d) / den, (b * c - a * d) / den, unit);
	};

	exports.IMEXP = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  var e = Math.exp(x);
	  return exports.COMPLEX(e * Math.cos(y), e * Math.sin(y), unit);
	};

	exports.IMLN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)), Math.atan(y / x), unit);
	};

	exports.IMLOG10 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(10), Math.atan(y / x) / Math.log(10), unit);
	};

	exports.IMLOG2 = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return exponential of complex number
	  return exports.COMPLEX(Math.log(Math.sqrt(x * x + y * y)) / Math.log(2), Math.atan(y / x) / Math.log(2), unit);
	};

	exports.IMPOWER = function(inumber, number) {
	  number = utils.parseNumber(number);
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);
	  if (utils.anyIsError(number, x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var p = Math.pow(exports.IMABS(inumber), number);

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(p * Math.cos(number * t), p * Math.sin(number * t), unit);
	};

	exports.IMPRODUCT = function() {
	  // Initialize result
	  var result = arguments[0];

	  // Loop on all numbers
	  for (var i = 1; i < arguments.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = exports.IMREAL(result);
	    var b = exports.IMAGINARY(result);
	    var c = exports.IMREAL(arguments[i]);
	    var d = exports.IMAGINARY(arguments[i]);

	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }

	    // Complute product of two complex numbers
	    result = exports.COMPLEX(a * c - b * d, a * d + b * c);
	  }

	  // Return product of complex numbers
	  return result;
	};

	exports.IMREAL = function(inumber) {
	  if (inumber === undefined || inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Return 0 if inumber is equal to 0
	  if (inumber === 0 || inumber === '0') {
	    return 0;
	  }

	  // Handle special cases
	  if (['i', '+i', '1i', '+1i', '-i', '-1i', 'j', '+j', '1j', '+1j', '-j', '-1j'].indexOf(inumber) >= 0) {
	    return 0;
	  }

	  // Lookup sign
	  var plus = inumber.indexOf('+');
	  var minus = inumber.indexOf('-');
	  if (plus === 0) {
	    plus = inumber.indexOf('+', 1);
	  }
	  if (minus === 0) {
	    minus = inumber.indexOf('-', 1);
	  }

	  // Lookup imaginary unit
	  var last = inumber.substring(inumber.length - 1, inumber.length);
	  var unit = (last === 'i' || last === 'j');

	  if (plus >= 0 || minus >= 0) {
	    // Return error if imaginary unit is neither i nor j
	    if (!unit) {
	      return error.num;
	    }

	    // Return real coefficient of complex number
	    if (plus >= 0) {
	      return (isNaN(inumber.substring(0, plus)) || isNaN(inumber.substring(plus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, plus));
	    } else {
	      return (isNaN(inumber.substring(0, minus)) || isNaN(inumber.substring(minus + 1, inumber.length - 1))) ?
	        error.num :
	        Number(inumber.substring(0, minus));
	    }
	  } else {
	    if (unit) {
	      return (isNaN(inumber.substring(0, inumber.length - 1))) ? error.num : 0;
	    } else {
	      return (isNaN(inumber)) ? error.num : inumber;
	    }
	  }
	};

	exports.IMSEC = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return secant of complex number
	  return exports.IMDIV('1', exports.IMCOS(inumber));
	};

	exports.IMSECH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return hyperbolic secant of complex number
	  return exports.IMDIV('1', exports.IMCOSH(inumber));
	};

	exports.IMSIN = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return sine of complex number
	  return exports.COMPLEX(Math.sin(x) * (Math.exp(y) + Math.exp(-y)) / 2, Math.cos(x) * (Math.exp(y) - Math.exp(-y)) / 2, unit);
	};

	exports.IMSINH = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Return hyperbolic sine of complex number
	  return exports.COMPLEX(Math.cos(y) * (Math.exp(x) - Math.exp(-x)) / 2, Math.sin(y) * (Math.exp(x) + Math.exp(-x)) / 2, unit);
	};

	exports.IMSQRT = function(inumber) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit = inumber.substring(inumber.length - 1);
	  unit = (unit === 'i' || unit === 'j') ? unit : 'i';

	  // Calculate power of modulus
	  var s = Math.sqrt(exports.IMABS(inumber));

	  // Calculate argument
	  var t = exports.IMARGUMENT(inumber);

	  // Return exponential of complex number
	  return exports.COMPLEX(s * Math.cos(t / 2), s * Math.sin(t / 2), unit);
	};

	exports.IMCSC = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }

	  // Return cosecant of complex number
	  return exports.IMDIV('1', exports.IMSIN(inumber));
	};

	exports.IMCSCH = function (inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  // Return error if either coefficient is not a number
	  if (utils.anyIsError(x, y)) {
	    return error.num;
	  }

	  // Return hyperbolic cosecant of complex number
	  return exports.IMDIV('1', exports.IMSINH(inumber));
	};

	exports.IMSUB = function(inumber1, inumber2) {
	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var a = this.IMREAL(inumber1);
	  var b = this.IMAGINARY(inumber1);
	  var c = this.IMREAL(inumber2);
	  var d = this.IMAGINARY(inumber2);

	  if (utils.anyIsError(a, b, c, d)) {
	    return error.value;
	  }

	  // Lookup imaginary unit
	  var unit1 = inumber1.substring(inumber1.length - 1);
	  var unit2 = inumber2.substring(inumber2.length - 1);
	  var unit = 'i';
	  if (unit1 === 'j') {
	    unit = 'j';
	  } else if (unit2 === 'j') {
	    unit = 'j';
	  }

	  // Return _ of two complex numbers
	  return this.COMPLEX(a - c, b - d, unit);
	};

	exports.IMSUM = function() {
	  var args = utils.flatten(arguments);

	  // Initialize result
	  var result = args[0];

	  // Loop on all numbers
	  for (var i = 1; i < args.length; i++) {
	    // Lookup coefficients of two complex numbers
	    var a = this.IMREAL(result);
	    var b = this.IMAGINARY(result);
	    var c = this.IMREAL(args[i]);
	    var d = this.IMAGINARY(args[i]);

	    if (utils.anyIsError(a, b, c, d)) {
	      return error.value;
	    }

	    // Complute product of two complex numbers
	    result = this.COMPLEX(a + c, b + d);
	  }

	  // Return sum of complex numbers
	  return result;
	};

	exports.IMTAN = function(inumber) {
	  // Return error if inumber is a logical value
	  if (inumber === true || inumber === false) {
	    return error.value;
	  }

	  // Lookup real and imaginary coefficients using Formula.js [http://formulajs.org]
	  var x = exports.IMREAL(inumber);
	  var y = exports.IMAGINARY(inumber);

	  if (utils.anyIsError(x, y)) {
	    return error.value;
	  }

	  // Return tangent of complex number
	  return this.IMDIV(this.IMSIN(inumber), this.IMCOS(inumber));
	};

	exports.OCT2BIN = function(number, places) {
	  // Return error if number is not hexadecimal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Check if number is negative
	  var negative = (number.length === 10 && number.substring(0, 1) === '7') ? true : false;

	  // Convert octal number to decimal
	  var decimal = (negative) ? parseInt(number, 8) - 1073741824 : parseInt(number, 8);

	  // Return error if number is lower than -512 or greater than 511
	  if (decimal < -512 || decimal > 511) {
	    return error.num;
	  }

	  // Ignore places and return a 10-character binary number if number is negative
	  if (negative) {
	    return '1' + text.REPT('0', 9 - (512 + decimal).toString(2).length) + (512 + decimal).toString(2);
	  }

	  // Convert decimal number to binary
	  var result = decimal.toString(2);

	  // Return binary number using the minimum number of characters necessary if places is undefined
	  if (typeof places === 'undefined') {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

	exports.OCT2DEC = function(number) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Return decimal number
	  return (decimal >= 536870912) ? decimal - 1073741824 : decimal;
	};

	exports.OCT2HEX = function(number, places) {
	  // Return error if number is not octal or contains more than ten characters (10 digits)
	  if (!/^[0-7]{1,10}$/.test(number)) {
	    return error.num;
	  }

	  // Convert octal number to decimal
	  var decimal = parseInt(number, 8);

	  // Ignore places and return a 10-character octal number if number is negative
	  if (decimal >= 536870912) {
	    return 'ff' + (decimal + 3221225472).toString(16);
	  }

	  // Convert decimal number to hexadecimal
	  var result = decimal.toString(16);

	  // Return hexadecimal number using the minimum number of characters necessary if places is undefined
	  if (places === undefined) {
	    return result;
	  } else {
	    // Return error if places is nonnumeric
	    if (isNaN(places)) {
	      return error.value;
	    }

	    // Return error if places is negative
	    if (places < 0) {
	      return error.num;
	    }

	    // Truncate places in case it is not an integer
	    places = Math.floor(places);

	    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
	    return (places >= result.length) ? text.REPT('0', places - result.length) + result : error.num;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var M = Math;
	function _horner(arr, v) { return arr.reduce(function(z,w){return v * z + w;},0); };
	function _bessel_iter(x, n, f0, f1, sign) {
	  if(!sign) sign = -1;
	  var tdx = 2 / x, f2;
	  if(n === 0) return f0;
	  if(n === 1) return f1;
	  for(var o = 1; o != n; ++o) {
	    f2 = f1 * o * tdx + sign * f0;
	    f0 = f1; f1 = f2;
	  }
	  return f1;
	}
	function _bessel_wrap(bessel0, bessel1, name, nonzero, sign) {
	  return function bessel(x,n) {
	    if(n === 0) return bessel0(x);
	    if(n === 1) return bessel1(x);
	    if(n < 0) throw name + ': Order (' + n + ') must be nonnegative';
	    if(nonzero == 1 && x === 0) throw name + ': Undefined when x == 0';
	    if(nonzero == 2 && x <= 0) throw name + ': Undefined when x <= 0';
	    var b0 = bessel0(x), b1 = bessel1(x);
	    return _bessel_iter(x, n, b0, b1, sign);
	  };
	}
	var besselj = (function() {
	  var b0_a1a = [57568490574.0,-13362590354.0,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse();
	  var b0_a2a = [57568490411.0,1029532985.0,9494680.718,59272.64853,267.8532712,1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934935152e-7].reverse();
	  var W = 0.636619772; // 2 / Math.PI

	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = M.abs(x) - 0.785398164;
	    if(M.abs(x) < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2;
	    }
	    else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	    }
	    return a;
	  }
	  var b1_a1a = [72362614232.0,-7895059235.0,242396853.1,-2972611.439, 15704.48260, -30.16036606].reverse();
	  var b1_a2a = [144725228442.0, 2300535178.0, 18583304.74, 99447.43394, 376.9991397, 1.0].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = M.abs(x) - 2.356194491;
	    if(Math.abs(x)< 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1 / a2;
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/M.abs(x))*(M.cos(xx)*a1-M.sin(xx)*a2*8/M.abs(x));
	      if(x < 0) a = -a;
	    }
	    return a;
	  }
	  return function besselj(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(M.abs(x));
	    if(n === 1) return bessel1(M.abs(x));
	    if(n < 0) throw 'BESSELJ: Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, jsum, sum, bjp, bj, bjm;
	    if(M.abs(x) > n) {
	      ret = _bessel_iter(x, n, bessel0(M.abs(x)), bessel1(M.abs(x)),-1);
	    } else {
	      m=2*M.floor((n+M.floor(M.sqrt(40*n)))/2);
	      jsum=0;
	      bjp=ret=sum=0.0;
	      bj=1.0;
	      for (j=m;j>0;j--) {
	        bjm=j*tox*bj-bjp;
	        bjp=bj;
	        bj=bjm;
	        if (M.abs(bj) > 1E10) {
	          bj *= 1E-10;
	          bjp *= 1E-10;
	          ret *= 1E-10;
	          sum *= 1E-10;
	        }
	        if (jsum) sum += bj;
	        jsum=!jsum;
	        if (j == n) ret=bjp;
	      }
	      sum=2.0*sum-bj;
	      ret /= sum;
	    }
	    return x < 0 && (n%2) ? -ret : ret;
	  };
	})();
	var bessely = (function() {
	  var b0_a1a = [-2957821389.0, 7062834065.0, -512359803.6, 10879881.29, -86327.92757, 228.4622733].reverse();
	  var b0_a2a = [40076544269.0, 745249964.8, 7189466.438, 47447.26470, 226.1030244, 1.0].reverse();
	  var b0_a1b = [1.0, -0.1098628627e-2, 0.2734510407e-4, -0.2073370639e-5, 0.2093887211e-6].reverse();
	  var b0_a2b = [-0.1562499995e-1, 0.1430488765e-3, -0.6911147651e-5, 0.7621095161e-6, -0.934945152e-7].reverse();

	  var W = 0.636619772;
	  function bessel0(x) {
	    var a, a1, a2, y = x * x, xx = x - 0.785398164;
	    if(x < 8) {
	      a1 = _horner(b0_a1a, y);
	      a2 = _horner(b0_a2a, y);
	      a = a1/a2 + W * besselj(x,0) * M.log(x);
	    } else {
	      y = 64 / y;
	      a1 = _horner(b0_a1b, y);
	      a2 = _horner(b0_a2b, y);
	      a = M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  var b1_a1a = [-0.4900604943e13, 0.1275274390e13, -0.5153438139e11, 0.7349264551e9, -0.4237922726e7, 0.8511937935e4].reverse();
	  var b1_a2a = [0.2499580570e14, 0.4244419664e12, 0.3733650367e10, 0.2245904002e8, 0.1020426050e6, 0.3549632885e3, 1].reverse();
	  var b1_a1b = [1.0, 0.183105e-2, -0.3516396496e-4, 0.2457520174e-5, -0.240337019e-6].reverse();
	  var b1_a2b = [0.04687499995, -0.2002690873e-3, 0.8449199096e-5, -0.88228987e-6, 0.105787412e-6].reverse();
	  function bessel1(x) {
	    var a, a1, a2, y = x*x, xx = x - 2.356194491;
	    if(x < 8) {
	      a1 = x*_horner(b1_a1a, y);
	      a2 = _horner(b1_a2a, y);
	      a = a1/a2 + W * (besselj(x,1) * M.log(x) - 1 / x);
	    } else {
	      y = 64 / y;
	      a1=_horner(b1_a1b, y);
	      a2=_horner(b1_a2b, y);
	      a=M.sqrt(W/x)*(M.sin(xx)*a1+M.cos(xx)*a2*8/x);
	    }
	    return a;
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELY', 1, -1);
	})();
	var besseli = (function() {
	  var b0_a = [1.0, 3.5156229, 3.0899424, 1.2067492, 0.2659732, 0.360768e-1, 0.45813e-2].reverse();
	  var b0_b = [0.39894228, 0.1328592e-1, 0.225319e-2, -0.157565e-2, 0.916281e-2, -0.2057706e-1, 0.2635537e-1, -0.1647633e-1, 0.392377e-2].reverse();
	  function bessel0(x) {
	    if(x <= 3.75) return _horner(b0_a, x*x/(3.75*3.75));
	    return M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b0_b, 3.75/M.abs(x));
	  }

	  var b1_a = [0.5, 0.87890594, 0.51498869, 0.15084934, 0.2658733e-1, 0.301532e-2, 0.32411e-3].reverse();
	  var b1_b = [0.39894228, -0.3988024e-1, -0.362018e-2, 0.163801e-2, -0.1031555e-1, 0.2282967e-1, -0.2895312e-1, 0.1787654e-1, -0.420059e-2].reverse();
	  function bessel1(x) {
	    if(x < 3.75) return x * _horner(b1_a, x*x/(3.75*3.75));
	    return (x < 0 ? -1 : 1) * M.exp(M.abs(x))/M.sqrt(M.abs(x))*_horner(b1_b, 3.75/M.abs(x));
	  }

	  return function besseli(x, n) {
	    n = Math.round(n);
	    if(n === 0) return bessel0(x);
	    if(n == 1) return bessel1(x);
	    if(n < 0) throw 'BESSELI Order (' + n + ') must be nonnegative';
	    if(M.abs(x) === 0) return 0;

	    var ret, j, tox = 2 / M.abs(x), m, bip, bi, bim;
	    m=2*M.round((n+M.round(M.sqrt(40*n)))/2);
	    bip=ret=0.0;
	    bi=1.0;
	    for (j=m;j>0;j--) {
	      bim=j*tox*bi + bip;
	      bip=bi; bi=bim;
	      if (M.abs(bi) > 1E10) {
	        bi *= 1E-10;
	        bip *= 1E-10;
	        ret *= 1E-10;
	      }
	      if(j == n) ret = bip;
	    }
	    ret *= besseli(x, 0) / bi;
	    return x < 0 && (n%2) ? -ret : ret;
	  };

	})();

	var besselk = (function() {
	  var b0_a = [-0.57721566, 0.42278420, 0.23069756, 0.3488590e-1, 0.262698e-2, 0.10750e-3, 0.74e-5].reverse();
	  var b0_b = [1.25331414, -0.7832358e-1, 0.2189568e-1, -0.1062446e-1, 0.587872e-2, -0.251540e-2, 0.53208e-3].reverse();
	  function bessel0(x) {
	    if(x <= 2) return -M.log(x/2)*besseli(x,0) + _horner(b0_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b0_b, 2/x);
	  }

	  var b1_a = [1.0, 0.15443144, -0.67278579, -0.18156897, -0.1919402e-1, -0.110404e-2, -0.4686e-4].reverse();
	  var b1_b = [1.25331414, 0.23498619, -0.3655620e-1, 0.1504268e-1, -0.780353e-2, 0.325614e-2, -0.68245e-3].reverse();
	  function bessel1(x) {
	    if(x <= 2) return M.log(x/2)*besseli(x,1) + (1/x)*_horner(b1_a, x*x/4);
	    return M.exp(-x)/M.sqrt(x)*_horner(b1_b, 2/x);
	  }

	  return _bessel_wrap(bessel0, bessel1, 'BESSELK', 2, 1);
	})();
	if(true) {
	  exports.besselj = besselj;
	  exports.bessely = bessely;
	  exports.besseli = besseli;
	  exports.besselk = besselk;
	}



/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);

	var d1900 = new Date(1900, 0, 1);
	var WEEK_STARTS = [
	  undefined,
	  0,
	  1,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  undefined,
	  1,
	  2,
	  3,
	  4,
	  5,
	  6,
	  0
	];
	var WEEK_TYPES = [
	  [],
	  [1, 2, 3, 4, 5, 6, 7],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 0, 1, 2, 3, 4, 5],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [],
	  [7, 1, 2, 3, 4, 5, 6],
	  [6, 7, 1, 2, 3, 4, 5],
	  [5, 6, 7, 1, 2, 3, 4],
	  [4, 5, 6, 7, 1, 2, 3],
	  [3, 4, 5, 6, 7, 1, 2],
	  [2, 3, 4, 5, 6, 7, 1],
	  [1, 2, 3, 4, 5, 6, 7]
	];
	var WEEKEND_TYPES = [
	  [],
	  [6, 0],
	  [0, 1],
	  [1, 2],
	  [2, 3],
	  [3, 4],
	  [4, 5],
	  [5, 6],
	  undefined,
	  undefined,
	  undefined, [0, 0],
	  [1, 1],
	  [2, 2],
	  [3, 3],
	  [4, 4],
	  [5, 5],
	  [6, 6]
	];

	exports.DATE = function(year, month, day) {
	  year = utils.parseNumber(year);
	  month = utils.parseNumber(month);
	  day = utils.parseNumber(day);
	  if (utils.anyIsError(year, month, day)) {
	    return error.value;
	  }
	  if (year < 0 || month < 0 || day < 0) {
	    return error.num;
	  }
	  var date = new Date(year, month - 1, day);
	  return date;
	};

	exports.DATEVALUE = function(date_text) {
	  if (typeof date_text !== 'string') {
	    return error.value;
	  }
	  var date = Date.parse(date_text);
	  if (isNaN(date)) {
	    return error.value;
	  }
	  if (date <= -2203891200000) {
	    return (date - d1900) / 86400000 + 1;
	  }
	  return (date - d1900) / 86400000 + 2;
	};

	exports.DAY = function(serial_number) {
	  var date = utils.parseDate(serial_number);
	  if (date instanceof Error) {
	    return date;
	  }
	  return date.getDate();
	};

	exports.DAYS = function(end_date, start_date) {
	  end_date = utils.parseDate(end_date);
	  start_date = utils.parseDate(start_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  return serial(end_date) - serial(start_date);
	};

	exports.DAYS360 = function(start_date, end_date, method) {
	  method = utils.parseBool(method);
	  start_date = utils.parseDate(start_date);
	  end_date = utils.parseDate(end_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (method instanceof Error) {
	    return method;
	  }
	  var sm = start_date.getMonth();
	  var em = end_date.getMonth();
	  var sd, ed;
	  if (method) {
	    sd = start_date.getDate() === 31 ? 30 : start_date.getDate();
	    ed = end_date.getDate() === 31 ? 30 : end_date.getDate();
	  } else {
	    var smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate();
	    var emd = new Date(end_date.getFullYear(), em + 1, 0).getDate();
	    sd = start_date.getDate() === smd ? 30 : start_date.getDate();
	    if (end_date.getDate() === emd) {
	      if (sd < 30) {
	        em++;
	        ed = 1;
	      } else {
	        ed = 30;
	      }
	    } else {
	      ed = end_date.getDate();
	    }
	  }
	  return 360 * (end_date.getFullYear() - start_date.getFullYear()) +
	    30 * (em - sm) + (ed - sd);
	};

	exports.EDATE = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  start_date.setMonth(start_date.getMonth() + months);
	  return serial(start_date);
	};

	exports.EOMONTH = function(start_date, months) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  if (isNaN(months)) {
	    return error.value;
	  }
	  months = parseInt(months, 10);
	  return serial(new Date(start_date.getFullYear(), start_date.getMonth() + months + 1, 0));
	};

	exports.HOUR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getHours();
	};

	exports.INTERVAL = function (second) {
	  if (typeof second !== 'number' && typeof second !== 'string') {
	    return error.value;
	  } else {
	    second = parseInt(second, 10);
	  }

	  var year  = Math.floor(second/946080000);
	  second    = second%946080000;
	  var month = Math.floor(second/2592000);
	  second    = second%2592000;
	  var day   = Math.floor(second/86400);
	  second    = second%86400;

	  var hour  = Math.floor(second/3600);
	  second    = second%3600;
	  var min   = Math.floor(second/60);
	  second    = second%60;
	  var sec   = second;

	  year  = (year  > 0) ? year  + 'Y' : '';
	  month = (month > 0) ? month + 'M' : '';
	  day   = (day   > 0) ? day   + 'D' : '';
	  hour  = (hour  > 0) ? hour  + 'H' : '';
	  min   = (min   > 0) ? min   + 'M' : '';
	  sec   = (sec   > 0) ? sec   + 'S' : '';

	  return 'P' + year + month + day +
	  'T' + hour + min + sec;
	};

	exports.ISOWEEKNUM = function(date) {
	  date = utils.parseDate(date);
	  if (date instanceof Error) {
	    return date;
	  }

	  date.setHours(0, 0, 0);
	  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
	  var yearStart = new Date(date.getFullYear(), 0, 1);
	  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
	};

	exports.MINUTE = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getMinutes();
	};

	exports.MONTH = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getMonth() + 1;
	};

	exports.NETWORKDAYS = function(start_date, end_date, holidays) {
	  return this.NETWORKDAYS.INTL(start_date, end_date, 1, holidays);
	};

	exports.NETWORKDAYS.INTL = function(start_date, end_date, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var days = (end_date - start_date) / (1000 * 60 * 60 * 24) + 1;
	  var total = days;
	  var day = start_date;
	  for (i = 0; i < days; i++) {
	    var d = (new Date().getTimezoneOffset() > 0) ? day.getUTCDay() : day.getDay();
	    var dec = false;
	    if (d === weekend[0] || d === weekend[1]) {
	      dec = true;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === day.getDate() &&
	        holiday.getMonth() === day.getMonth() &&
	        holiday.getFullYear() === day.getFullYear()) {
	        dec = true;
	        break;
	      }
	    }
	    if (dec) {
	      total--;
	    }
	    day.setDate(day.getDate() + 1);
	  }
	  return total;
	};

	exports.NOW = function() {
	  return new Date();
	};

	exports.SECOND = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getSeconds();
	};

	exports.TIME = function(hour, minute, second) {
	  hour = utils.parseNumber(hour);
	  minute = utils.parseNumber(minute);
	  second = utils.parseNumber(second);
	  if (utils.anyIsError(hour, minute, second)) {
	    return error.value;
	  }
	  if (hour < 0 || minute < 0 || second < 0) {
	    return error.num;
	  }
	  return (3600 * hour + 60 * minute + second) / 86400;
	};

	exports.TIMEVALUE = function(time_text) {
	  time_text = utils.parseDate(time_text);
	  if (time_text instanceof Error) {
	    return time_text;
	  }
	  return (3600 * time_text.getHours() +
	    60 * time_text.getMinutes() +
	    time_text.getSeconds()) / 86400;
	};

	exports.TODAY = function() {
	  return new Date();
	};

	exports.WEEKDAY = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  var day = serial_number.getDay();
	  return WEEK_TYPES[return_type][day];
	};

	exports.WEEKNUM = function(serial_number, return_type) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  if (return_type === undefined) {
	    return_type = 1;
	  }
	  if (return_type === 21) {
	    return this.ISOWEEKNUM(serial_number);
	  }
	  var week_start = WEEK_STARTS[return_type];
	  var jan = new Date(serial_number.getFullYear(), 0, 1);
	  var inc = jan.getDay() < week_start ? 1 : 0;
	  jan -= Math.abs(jan.getDay() - week_start) * 24 * 60 * 60 * 1000;
	  return Math.floor(((serial_number - jan) / (1000 * 60 * 60 * 24)) / 7 + 1) + inc;
	};

	exports.WORKDAY = function(start_date, days, holidays) {
	  return this.WORKDAY.INTL(start_date, days, 1, holidays);
	};

	exports.WORKDAY.INTL = function(start_date, days, weekend, holidays) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  days = utils.parseNumber(days);
	  if (days instanceof Error) {
	    return days;
	  }
	  if (days < 0) {
	    return error.num;
	  }
	  if (weekend === undefined) {
	    weekend = WEEKEND_TYPES[1];
	  } else {
	    weekend = WEEKEND_TYPES[weekend];
	  }
	  if (!(weekend instanceof Array)) {
	    return error.value;
	  }
	  if (holidays === undefined) {
	    holidays = [];
	  } else if (!(holidays instanceof Array)) {
	    holidays = [holidays];
	  }
	  for (var i = 0; i < holidays.length; i++) {
	    var h = utils.parseDate(holidays[i]);
	    if (h instanceof Error) {
	      return h;
	    }
	    holidays[i] = h;
	  }
	  var d = 0;
	  while (d < days) {
	    start_date.setDate(start_date.getDate() + 1);
	    var day = start_date.getDay();
	    if (day === weekend[0] || day === weekend[1]) {
	      continue;
	    }
	    for (var j = 0; j < holidays.length; j++) {
	      var holiday = holidays[j];
	      if (holiday.getDate() === start_date.getDate() &&
	        holiday.getMonth() === start_date.getMonth() &&
	        holiday.getFullYear() === start_date.getFullYear()) {
	        d--;
	        break;
	      }
	    }
	    d++;
	  }
	  return start_date;
	};

	exports.YEAR = function(serial_number) {
	  serial_number = utils.parseDate(serial_number);
	  if (serial_number instanceof Error) {
	    return serial_number;
	  }
	  return serial_number.getFullYear();
	};

	function isLeapYear(year) {
	  return new Date(year, 1, 29).getMonth() === 1;
	}

	// TODO : Use DAYS ?
	function daysBetween(start_date, end_date) {
	  return Math.ceil((end_date - start_date) / 1000 / 60 / 60 / 24);
	}

	exports.YEARFRAC = function(start_date, end_date, basis) {
	  start_date = utils.parseDate(start_date);
	  if (start_date instanceof Error) {
	    return start_date;
	  }
	  end_date = utils.parseDate(end_date);
	  if (end_date instanceof Error) {
	    return end_date;
	  }

	  basis = basis || 0;
	  var sd = start_date.getDate();
	  var sm = start_date.getMonth() + 1;
	  var sy = start_date.getFullYear();
	  var ed = end_date.getDate();
	  var em = end_date.getMonth() + 1;
	  var ey = end_date.getFullYear();

	  switch (basis) {
	    case 0:
	      // US (NASD) 30/360
	      if (sd === 31 && ed === 31) {
	        sd = 30;
	        ed = 30;
	      } else if (sd === 31) {
	        sd = 30;
	      } else if (sd === 30 && ed === 31) {
	        ed = 30;
	      }
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	    case 1:
	      // Actual/actual
	      var feb29Between = function(date1, date2) {
	        var year1 = date1.getFullYear();
	        var mar1year1 = new Date(year1, 2, 1);
	        if (isLeapYear(year1) && date1 < mar1year1 && date2 >= mar1year1) {
	          return true;
	        }
	        var year2 = date2.getFullYear();
	        var mar1year2 = new Date(year2, 2, 1);
	        return (isLeapYear(year2) && date2 >= mar1year2 && date1 < mar1year2);
	      };
	      var ylength = 365;
	      if (sy === ey || ((sy + 1) === ey) && ((sm > em) || ((sm === em) && (sd >= ed)))) {
	        if ((sy === ey && isLeapYear(sy)) ||
	            feb29Between(start_date, end_date) ||
	            (em === 1 && ed === 29)) {
	          ylength = 366;
	        }
	        return daysBetween(start_date, end_date) / ylength;
	      }
	      var years = (ey - sy) + 1;
	      var days = (new Date(ey + 1, 0, 1) - new Date(sy, 0, 1)) / 1000 / 60 / 60 / 24;
	      var average = days / years;
	      return daysBetween(start_date, end_date) / average;
	    case 2:
	      // Actual/360
	      return daysBetween(start_date, end_date) / 360;
	    case 3:
	      // Actual/365
	      return daysBetween(start_date, end_date) / 365;
	    case 4:
	      // European 30/360
	      return ((ed + em * 30 + ey * 360) - (sd + sm * 30 + sy * 360)) / 360;
	  }
	};

	function serial(date) {
	  var addOn = (date > -2203891200000)?2:1;
	  return (date - d1900) / 86400000 + addOn;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var stats = __webpack_require__(6);
	var maths = __webpack_require__(2);
	var utils = __webpack_require__(4);

	function compact(array) {
	  if (!array) { return array; }
	  var result = [];
	  for (var i = 0; i < array.length; ++i) {
	    if (!array[i]) { continue; }
	    result.push(array[i]);
	  }
	  return result;
	}

	exports.FINDFIELD = function(database, title) {
	  var index = null;
	  for (var i = 0; i < database.length; i++) {
	    if (database[i][0] === title) {
	      index = i;
	      break;
	    }
	  }

	  // Return error if the input field title is incorrect
	  if (index == null) {
	    return error.value;
	  }
	  return index;
	};

	function findResultIndex(database, criterias) {
	  var matches = {};
	  for (var i = 1; i < database[0].length; ++i) {
	    matches[i] = true;
	  }
	  var maxCriteriaLength = criterias[0].length;
	  for (i = 1; i < criterias.length; ++i) {
	    if (criterias[i].length > maxCriteriaLength) {
	      maxCriteriaLength = criterias[i].length;
	    }
	  }

	  for (var k = 1; k < database.length; ++k) {
	    for (var l = 1; l < database[k].length; ++l) {
	      var currentCriteriaResult = false;
	      var hasMatchingCriteria   = false;
	      for (var j = 0; j < criterias.length; ++j) {
	        var criteria = criterias[j];
	        if (criteria.length < maxCriteriaLength) {
	          continue;
	        }

	        var criteriaField = criteria[0];
	        if (database[k][0] !== criteriaField) {
	          continue;
	        }
	        hasMatchingCriteria = true;
	        for (var p = 1; p < criteria.length; ++p) {
	          currentCriteriaResult = currentCriteriaResult || eval(database[k][l] + criteria[p]);  // jshint ignore:line
	        }
	      }
	      if (hasMatchingCriteria) {
	        matches[l] = matches[l] && currentCriteriaResult;
	      }
	    }
	  }

	  var result = [];
	  for (var n = 0; n < database[0].length; ++n) {
	    if (matches[n]) {
	      result.push(n - 1);
	    }
	  }
	  return result;
	}

	// Database functions
	exports.DAVERAGE = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var sum = 0;
	  for (var i = 0; i < resultIndexes.length; i++) {
	    sum += targetFields[resultIndexes[i]];
	  }
	  return resultIndexes.length === 0 ? error.div0 : sum / resultIndexes.length;
	};

	exports.DCOUNT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.COUNT(targetValues);
	};

	exports.DCOUNTA = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.COUNTA(targetValues);
	};

	exports.DGET = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  // Return error if no record meets the criteria
	  if (resultIndexes.length === 0) {
	    return error.value;
	  }
	  // Returns the #NUM! error value because more than one record meets the
	  // criteria
	  if (resultIndexes.length > 1) {
	    return error.num;
	  }

	  return targetFields[resultIndexes[0]];
	};

	exports.DMAX = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var maxValue = targetFields[resultIndexes[0]];
	  for (var i = 1; i < resultIndexes.length; i++) {
	    if (maxValue < targetFields[resultIndexes[i]]) {
	      maxValue = targetFields[resultIndexes[i]];
	    }
	  }
	  return maxValue;
	};

	exports.DMIN = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var minValue = targetFields[resultIndexes[0]];
	  for (var i = 1; i < resultIndexes.length; i++) {
	    if (minValue > targetFields[resultIndexes[i]]) {
	      minValue = targetFields[resultIndexes[i]];
	    }
	  }
	  return minValue;
	};

	exports.DPRODUCT = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  var result = 1;
	  for (i = 0; i < targetValues.length; i++) {
	    result *= targetValues[i];
	  }
	  return result;
	};

	exports.DSTDEV = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  return stats.STDEV.S(targetValues);
	};

	exports.DSTDEVP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  targetValues = compact(targetValues);
	  return stats.STDEV.P(targetValues);
	};

	exports.DSUM = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return maths.SUM(targetValues);
	};

	exports.DVAR = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.VAR.S(targetValues);
	};

	exports.DVARP = function(database, field, criteria) {
	  // Return error if field is not a number and not a string
	  if (isNaN(field) && (typeof field !== "string")) {
	    return error.value;
	  }
	  var resultIndexes = findResultIndex(database, criteria);
	  var targetFields = [];
	  if (typeof field === "string") {
	    var index = exports.FINDFIELD(database, field);
	    targetFields = utils.rest(database[index]);
	  } else {
	    targetFields = utils.rest(database[field]);
	  }
	  var targetValues = [];
	  for (var i = 0; i < resultIndexes.length; i++) {
	    targetValues[i] = targetFields[resultIndexes[i]];
	  }
	  return stats.VAR.P(targetValues);
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var utils = __webpack_require__(4);
	var information = __webpack_require__(11);

	exports.AND = function() {
	  var args = utils.flatten(arguments);
	  var result = true;
	  for (var i = 0; i < args.length; i++) {
	    if (!args[i]) {
	      result = false;
	    }
	  }
	  return result;
	};

	exports.CHOOSE = function() {
	  if (arguments.length < 2) {
	    return error.na;
	  }

	  var index = arguments[0];
	  if (index < 1 || index > 254) {
	    return error.value;
	  }

	  if (arguments.length < index + 1) {
	    return error.value;
	  }

	  return arguments[index];
	};

	exports.FALSE = function() {
	  return false;
	};

	exports.IF = function(test, then_value, otherwise_value) {
	  return test ? then_value : otherwise_value;
	};

	exports.IFERROR = function(value, valueIfError) {
	  if (information.ISERROR(value)) {
	    return valueIfError;
	  }
	  return value;
	};

	exports.IFNA = function(value, value_if_na) {
	  return value === error.na ? value_if_na : value;
	};

	exports.NOT = function(logical) {
	  return !logical;
	};

	exports.OR = function() {
	  var args = utils.flatten(arguments);
	  var result = false;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result = true;
	    }
	  }
	  return result;
	};

	exports.TRUE = function() {
	  return true;
	};

	exports.XOR = function() {
	  var args = utils.flatten(arguments);
	  var result = 0;
	  for (var i = 0; i < args.length; i++) {
	    if (args[i]) {
	      result++;
	    }
	  }
	  return (Math.floor(Math.abs(result)) & 1) ? true : false;
	};

	exports.SWITCH = function () {
	  var result;
	  if (arguments.length > 0)  {
	    var targetValue = arguments[0];
	    var argc = arguments.length - 1;
	    var switchCount = Math.floor(argc / 2);
	    var switchSatisfied = false;
	    var defaultClause = argc % 2 === 0 ? null : arguments[arguments.length - 1];

	    if (switchCount) {
	      for (var index = 0; index < switchCount; index++) {
	        if (targetValue === arguments[index * 2 + 1]) {
	          result = arguments[index * 2 + 2];
	          switchSatisfied = true;
	          break;
	        }
	      }
	    }

	    if (!switchSatisfied && defaultClause) {
	      result = defaultClause;
	    }
	  }

	  return result;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);
	var dateTime = __webpack_require__(14);
	var utils = __webpack_require__(4);

	function validDate(d) {
	  return d && d.getTime && !isNaN(d.getTime());
	}

	function ensureDate(d) {
	  return (d instanceof Date)?d:new Date(d);
	}

	exports.ACCRINT = function(issue, first, settlement, rate, par, frequency, basis) {
	  // Return error if either date is invalid
	  issue      = ensureDate(issue);
	  first      = ensureDate(first);
	  settlement = ensureDate(settlement);
	  if (!validDate(issue) || !validDate(first) || !validDate(settlement)) {
	    return '#VALUE!';
	  }

	  // Return error if either rate or par are lower than or equal to zero
	  if (rate <= 0 || par <= 0) {
	    return '#NUM!';
	  }

	  // Return error if frequency is neither 1, 2, or 4
	  if ([1, 2, 4].indexOf(frequency) === -1) {
	    return '#NUM!';
	  }

	  // Return error if basis is neither 0, 1, 2, 3, or 4
	  if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
	    return '#NUM!';
	  }

	  // Return error if settlement is before or equal to issue
	  if (settlement <= issue) {
	    return '#NUM!';
	  }

	  // Set default values
	  par   = par   || 0;
	  basis = basis || 0;

	  // Compute accrued interest
	  return par * rate * dateTime.YEARFRAC(issue, settlement, basis);
	};

	// TODO
	exports.ACCRINTM = function() {
	 throw new Error('ACCRINTM is not implemented');
	};

	// TODO
	exports.AMORDEGRC = function() {
	 throw new Error('AMORDEGRC is not implemented');
	};

	// TODO
	exports.AMORLINC = function() {
	 throw new Error('AMORLINC is not implemented');
	};

	// TODO
	exports.COUPDAYBS = function() {
	 throw new Error('COUPDAYBS is not implemented');
	};

	// TODO
	exports.COUPDAYS = function() {
	 throw new Error('COUPDAYS is not implemented');
	};

	// TODO
	exports.COUPDAYSNC = function() {
	 throw new Error('COUPDAYSNC is not implemented');
	};

	// TODO
	exports.COUPNCD = function() {
	 throw new Error('COUPNCD is not implemented');
	};

	// TODO
	exports.COUPNUM = function() {
	 throw new Error('COUPNUM is not implemented');
	};

	// TODO
	exports.COUPPCD = function() {
	 throw new Error('COUPPCD is not implemented');
	};

	exports.CUMIPMT = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names
	  // Requires exports.FV() and exports.PMT() from exports.js [http://stoic.com/exports/]

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative interest
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var interest = 0;

	  if (start === 1) {
	    if (type === 0) {
	      interest = -value;
	      start++;
	    }
	  }

	  for (var i = start; i <= end; i++) {
	    if (type === 1) {
	      interest += exports.FV(rate, i - 2, payment, value, 1) - payment;
	    } else {
	      interest += exports.FV(rate, i - 1, payment, value, 0);
	    }
	  }
	  interest *= rate;

	  // Return cumulative interest
	  return interest;
	};

	exports.CUMPRINC = function(rate, periods, value, start, end, type) {
	  // Credits: algorithm inspired by Apache OpenOffice
	  // Credits: Hannes Stiebitzhofer for the translations of function and variable names

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, periods, value)) {
	    return error.value;
	  }

	  // Return error if either rate, periods, or value are lower than or equal to zero
	  if (rate <= 0 || periods <= 0 || value <= 0) {
	    return error.num;
	  }

	  // Return error if start < 1, end < 1, or start > end
	  if (start < 1 || end < 1 || start > end) {
	    return error.num;
	  }

	  // Return error if type is neither 0 nor 1
	  if (type !== 0 && type !== 1) {
	    return error.num;
	  }

	  // Compute cumulative principal
	  var payment = exports.PMT(rate, periods, value, 0, type);
	  var principal = 0;
	  if (start === 1) {
	    if (type === 0) {
	      principal = payment + value * rate;
	    } else {
	      principal = payment;
	    }
	    start++;
	  }
	  for (var i = start; i <= end; i++) {
	    if (type > 0) {
	      principal += payment - (exports.FV(rate, i - 2, payment, value, 1) - payment) * rate;
	    } else {
	      principal += payment - exports.FV(rate, i - 1, payment, value, 0) * rate;
	    }
	  }

	  // Return cumulative principal
	  return principal;
	};

	exports.DB = function(cost, salvage, life, period, month) {
	  // Initialize month
	  month = (month === undefined) ? 12 : month;

	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  month = utils.parseNumber(month);
	  if (utils.anyIsError(cost, salvage, life, period, month)) {
	    return error.value;
	  }

	  // Return error if any of the parameters is negative
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0) {
	    return error.num;
	  }

	  // Return error if month is not an integer between 1 and 12
	  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(month) === -1) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Rate is rounded to three decimals places
	  var rate = (1 - Math.pow(salvage / cost, 1 / life)).toFixed(3);

	  // Compute initial depreciation
	  var initial = cost * rate * month / 12;

	  // Compute total depreciation
	  var total = initial;
	  var current = 0;
	  var ceiling = (period === life) ? life - 1 : period;
	  for (var i = 2; i <= ceiling; i++) {
	    current = (cost - total) * rate;
	    total += current;
	  }

	  // Depreciation for the first and last periods are special cases
	  if (period === 1) {
	    // First period
	    return initial;
	  } else if (period === life) {
	    // Last period
	    return (cost - total) * rate;
	  } else {
	    return current;
	  }
	};

	exports.DDB = function(cost, salvage, life, period, factor) {
	  // Initialize factor
	  factor = (factor === undefined) ? 2 : factor;

	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  factor = utils.parseNumber(factor);
	  if (utils.anyIsError(cost, salvage, life, period, factor)) {
	    return error.value;
	  }

	  // Return error if any of the parameters is negative or if factor is null
	  if (cost < 0 || salvage < 0 || life < 0 || period < 0 || factor <= 0) {
	    return error.num;
	  }

	  // Return error if period is greater than life
	  if (period > life) {
	    return error.num;
	  }

	  // Return 0 (zero) if salvage is greater than or equal to cost
	  if (salvage >= cost) {
	    return 0;
	  }

	  // Compute depreciation
	  var total = 0;
	  var current = 0;
	  for (var i = 1; i <= period; i++) {
	    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
	    total += current;
	  }

	  // Return depreciation
	  return current;
	};

	// TODO
	exports.DISC = function() {
	 throw new Error('DISC is not implemented');
	};

	exports.DOLLARDE = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;

	  // Round result
	  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
	  result = Math.round(result * power) / power;

	  // Return converted dollar price
	  return result;
	};

	exports.DOLLARFR = function(dollar, fraction) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  dollar = utils.parseNumber(dollar);
	  fraction = utils.parseNumber(fraction);
	  if (utils.anyIsError(dollar, fraction)) {
	    return error.value;
	  }

	  // Return error if fraction is negative
	  if (fraction < 0) {
	    return error.num;
	  }

	  // Return error if fraction is greater than or equal to 0 and less than 1
	  if (fraction >= 0 && fraction < 1) {
	    return error.div0;
	  }

	  // Truncate fraction if it is not an integer
	  fraction = parseInt(fraction, 10);

	  // Compute integer part
	  var result = parseInt(dollar, 10);

	  // Add decimal part
	  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(fraction) / Math.LN10)) * fraction;

	  // Return converted dollar price
	  return result;
	};

	// TODO
	exports.DURATION = function() {
	 throw new Error('DURATION is not implemented');
	};

	exports.EFFECT = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return effective annual interest rate
	  return Math.pow(1 + rate / periods, periods) - 1;
	};

	exports.FV = function(rate, periods, payment, value, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  value = value || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  value = utils.parseNumber(value);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, value, type)) {
	    return error.value;
	  }

	  // Return future value
	  var result;
	  if (rate === 0) {
	    result = value + payment * periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = value * term + payment * (1 + rate) * (term - 1) / rate;
	    } else {
	      result = value * term + payment * (term - 1) / rate;
	    }
	  }
	  return -result;
	};

	exports.FVSCHEDULE = function(principal, schedule) {
	  principal = utils.parseNumber(principal);
	  schedule = utils.parseNumberArray(utils.flatten(schedule));
	  if (utils.anyIsError(principal, schedule)) {
	    return error.value;
	  }

	  var n = schedule.length;
	  var future = principal;

	  // Apply all interests in schedule
	  for (var i = 0; i < n; i++) {
	    // Apply scheduled interest
	    future *= 1 + schedule[i];
	  }

	  // Return future value
	  return future;
	};

	// TODO
	exports.INTRATE = function() {
	 throw new Error('INTRATE is not implemented');
	};

	exports.IPMT = function(rate, period, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, period, periods, present, future, type)) {
	    return error.value;
	  }

	  // Compute payment
	  var payment = exports.PMT(rate, periods, present, future, type);

	  // Compute interest
	  var interest;
	  if (period === 1) {
	    if (type === 1) {
	      interest = 0;
	    } else {
	      interest = -present;
	    }
	  } else {
	    if (type === 1) {
	      interest = exports.FV(rate, period - 2, payment, present, 1) - payment;
	    } else {
	      interest = exports.FV(rate, period - 1, payment, present, 0);
	    }
	  }

	  // Return interest
	  return interest * rate;
	};

	exports.IRR = function(values, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  guess = guess || 0;

	  values = utils.parseNumberArray(utils.flatten(values));
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(values, guess)) {
	    return error.value;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = (dates[i] - dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Initialize dates and check that values contains at least one positive value and one negative value
	  var dates = [];
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = (guess === undefined) ? 0.1 : guess;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.ISPMT = function(rate, period, periods, value) {
	  rate = utils.parseNumber(rate);
	  period = utils.parseNumber(period);
	  periods = utils.parseNumber(periods);
	  value = utils.parseNumber(value);
	  if (utils.anyIsError(rate, period, periods, value)) {
	    return error.value;
	  }

	  // Return interest
	  return value * rate * (period / periods - 1);
	};

	// TODO
	exports.MDURATION = function() {
	 throw new Error('MDURATION is not implemented');
	};

	exports.MIRR = function(values, finance_rate, reinvest_rate) {
	  values = utils.parseNumberArray(utils.flatten(values));
	  finance_rate = utils.parseNumber(finance_rate);
	  reinvest_rate = utils.parseNumber(reinvest_rate);
	  if (utils.anyIsError(values, finance_rate, reinvest_rate)) {
	    return error.value;
	  }

	  // Initialize number of values
	  var n = values.length;

	  // Lookup payments (negative values) and incomes (positive values)
	  var payments = [];
	  var incomes = [];
	  for (var i = 0; i < n; i++) {
	    if (values[i] < 0) {
	      payments.push(values[i]);
	    } else {
	      incomes.push(values[i]);
	    }
	  }

	  // Return modified internal rate of return
	  var num = -exports.NPV(reinvest_rate, incomes) * Math.pow(1 + reinvest_rate, n - 1);
	  var den = exports.NPV(finance_rate, payments) * (1 + finance_rate);
	  return Math.pow(num / den, 1 / (n - 1)) - 1;
	};

	exports.NOMINAL = function(rate, periods) {
	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  if (utils.anyIsError(rate, periods)) {
	    return error.value;
	  }

	  // Return error if rate <=0 or periods < 1
	  if (rate <= 0 || periods < 1) {
	    return error.num;
	  }

	  // Truncate periods if it is not an integer
	  periods = parseInt(periods, 10);

	  // Return nominal annual interest rate
	  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
	};

	exports.NPER = function(rate, payment, present, future, type) {
	  type = (type === undefined) ? 0 : type;
	  future = (future === undefined) ? 0 : future;

	  rate = utils.parseNumber(rate);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, payment, present, future, type)) {
	    return error.value;
	  }

	  // Return number of periods
	  var num = payment * (1 + rate * type) - future * rate;
	  var den = (present * rate + payment * (1 + rate * type));
	  return Math.log(num / den) / Math.log(1 + rate);
	};

	exports.NPV = function() {
	  var args = utils.parseNumberArray(utils.flatten(arguments));
	  if (args instanceof Error) {
	    return args;
	  }

	  // Lookup rate
	  var rate = args[0];

	  // Initialize net present value
	  var value = 0;

	  // Loop on all values
	  for (var j = 1; j < args.length; j++) {
	    value += args[j] / Math.pow(1 + rate, j);
	  }

	  // Return net present value
	  return value;
	};

	// TODO
	exports.ODDFPRICE = function() {
	 throw new Error('ODDFPRICE is not implemented');
	};

	// TODO
	exports.ODDFYIELD = function() {
	 throw new Error('ODDFYIELD is not implemented');
	};

	// TODO
	exports.ODDLPRICE = function() {
	 throw new Error('ODDLPRICE is not implemented');
	};

	// TODO
	exports.ODDLYIELD = function() {
	 throw new Error('ODDLYIELD is not implemented');
	};

	exports.PDURATION = function(rate, present, future) {
	  rate = utils.parseNumber(rate);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(rate, present, future)) {
	    return error.value;
	  }

	  // Return error if rate <=0
	  if (rate <= 0) {
	    return error.num;
	  }

	  // Return number of periods
	  return (Math.log(future) - Math.log(present)) / Math.log(1 + rate);
	};

	exports.PMT = function(rate, periods, present, future, type) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }

	  // Return payment
	  var result;
	  if (rate === 0) {
	    result = (present + future) / periods;
	  } else {
	    var term = Math.pow(1 + rate, periods);
	    if (type === 1) {
	      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
	    } else {
	      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
	    }
	  }
	  return -result;
	};

	exports.PPMT = function(rate, period, periods, present, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, present, future, type)) {
	    return error.value;
	  }

	  return exports.PMT(rate, periods, present, future, type) - exports.IPMT(rate, period, periods, present, future, type);
	};

	// TODO
	exports.PRICE = function() {
	 throw new Error('PRICE is not implemented');
	};

	// TODO
	exports.PRICEDISC = function() {
	 throw new Error('PRICEDISC is not implemented');
	};

	// TODO
	exports.PRICEMAT = function() {
	 throw new Error('PRICEMAT is not implemented');
	};

	exports.PV = function(rate, periods, payment, future, type) {
	  future = future || 0;
	  type = type || 0;

	  rate = utils.parseNumber(rate);
	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  if (utils.anyIsError(rate, periods, payment, future, type)) {
	    return error.value;
	  }

	  // Return present value
	  if (rate === 0) {
	    return -payment * periods - future;
	  } else {
	    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
	  }
	};

	exports.RATE = function(periods, payment, present, future, type, guess) {
	  // Credits: rabugento

	  guess = (guess === undefined) ? 0.01 : guess;
	  future = (future === undefined) ? 0 : future;
	  type = (type === undefined) ? 0 : type;

	  periods = utils.parseNumber(periods);
	  payment = utils.parseNumber(payment);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  type = utils.parseNumber(type);
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(periods, payment, present, future, type, guess)) {
	    return error.value;
	  }

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-6;

	  // Set maximum number of iterations
	  var iterMax = 100;
	  var iter = 0;
	  var close = false;
	  var rate = guess;

	  while (iter < iterMax && !close) {
	    var t1 = Math.pow(rate + 1, periods);
	    var t2 = Math.pow(rate + 1, periods - 1);

	    var f1 = future + t1 * present + payment * (t1 - 1) * (rate * type + 1) / rate;
	    var f2 = periods * t2 * present - payment * (t1 - 1) *(rate * type + 1) / Math.pow(rate,2);
	    var f3 = periods * payment * t2 * (rate * type + 1) / rate + payment * (t1 - 1) * type / rate;

	    var newRate = rate - f1 / (f2 + f3);

	    if (Math.abs(newRate - rate) < epsMax) close = true;
	    iter++
	    rate = newRate;
	  }

	  if (!close) return Number.NaN + rate;
	  return rate;
	};

	// TODO
	exports.RECEIVED = function() {
	 throw new Error('RECEIVED is not implemented');
	};

	exports.RRI = function(periods, present, future) {
	  periods = utils.parseNumber(periods);
	  present = utils.parseNumber(present);
	  future = utils.parseNumber(future);
	  if (utils.anyIsError(periods, present, future)) {
	    return error.value;
	  }

	  // Return error if periods or present is equal to 0 (zero)
	  if (periods === 0 || present === 0) {
	    return error.num;
	  }

	  // Return equivalent interest rate
	  return Math.pow(future / present, 1 / periods) - 1;
	};

	exports.SLN = function(cost, salvage, life) {
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  if (utils.anyIsError(cost, salvage, life)) {
	    return error.value;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return straight-line depreciation
	  return (cost - salvage) / life;
	};

	exports.SYD = function(cost, salvage, life, period) {
	  // Return error if any of the parameters is not a number
	  cost = utils.parseNumber(cost);
	  salvage = utils.parseNumber(salvage);
	  life = utils.parseNumber(life);
	  period = utils.parseNumber(period);
	  if (utils.anyIsError(cost, salvage, life, period)) {
	    return error.value;
	  }

	  // Return error if life equal to 0 (zero)
	  if (life === 0) {
	    return error.num;
	  }

	  // Return error if period is lower than 1 or greater than life
	  if (period < 1 || period > life) {
	    return error.num;
	  }

	  // Truncate period if it is not an integer
	  period = parseInt(period, 10);

	  // Return straight-line depreciation
	  return ((cost - salvage) * (life - period + 1) * 2) / (life * (life + 1));
	};

	exports.TBILLEQ = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (365 * discount) / (360 - discount * dateTime.DAYS360(settlement, maturity, false));
	};

	exports.TBILLPRICE = function(settlement, maturity, discount) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  discount = utils.parseNumber(discount);
	  if (utils.anyIsError(settlement, maturity, discount)) {
	    return error.value;
	  }

	  // Return error if discount is lower than or equal to zero
	  if (discount <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return 100 * (1 - discount * dateTime.DAYS360(settlement, maturity, false) / 360);
	};

	exports.TBILLYIELD = function(settlement, maturity, price) {
	  settlement = utils.parseDate(settlement);
	  maturity = utils.parseDate(maturity);
	  price = utils.parseNumber(price);
	  if (utils.anyIsError(settlement, maturity, price)) {
	    return error.value;
	  }

	  // Return error if price is lower than or equal to zero
	  if (price <= 0) {
	    return error.num;
	  }

	  // Return error if settlement is greater than maturity
	  if (settlement > maturity) {
	    return error.num;
	  }

	  // Return error if maturity is more than one year after settlement
	  if (maturity - settlement > 365 * 24 * 60 * 60 * 1000) {
	    return error.num;
	  }

	  // Return bond-equivalent yield
	  return (100 - price) * 360 / (price * dateTime.DAYS360(settlement, maturity, false));
	};

	// TODO
	exports.VDB = function() {
	 throw new Error('VDB is not implemented');
	};


	exports.XIRR = function(values, dates, guess) {
	  // Credits: algorithm inspired by Apache OpenOffice

	  values = utils.parseNumberArray(utils.flatten(values));
	  dates = utils.parseDateArray(utils.flatten(dates));
	  guess = utils.parseNumber(guess);
	  if (utils.anyIsError(values, dates, guess)) {
	    return error.value;
	  }

	  // Calculates the resulting amount
	  var irrResult = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = values[0];
	    for (var i = 1; i < values.length; i++) {
	      result += values[i] / Math.pow(r, dateTime.DAYS(dates[i], dates[0]) / 365);
	    }
	    return result;
	  };

	  // Calculates the first derivation
	  var irrResultDeriv = function(values, dates, rate) {
	    var r = rate + 1;
	    var result = 0;
	    for (var i = 1; i < values.length; i++) {
	      var frac = dateTime.DAYS(dates[i], dates[0]) / 365;
	      result -= frac * values[i] / Math.pow(r, frac + 1);
	    }
	    return result;
	  };

	  // Check that values contains at least one positive value and one negative value
	  var positive = false;
	  var negative = false;
	  for (var i = 0; i < values.length; i++) {
	    if (values[i] > 0) {
	      positive = true;
	    }
	    if (values[i] < 0) {
	      negative = true;
	    }
	  }

	  // Return error if values does not contain at least one positive value and one negative value
	  if (!positive || !negative) {
	    return error.num;
	  }

	  // Initialize guess and resultRate
	  guess = guess || 0.1;
	  var resultRate = guess;

	  // Set maximum epsilon for end of iteration
	  var epsMax = 1e-10;

	  // Implement Newton's method
	  var newRate, epsRate, resultValue;
	  var contLoop = true;
	  do {
	    resultValue = irrResult(values, dates, resultRate);
	    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
	    epsRate = Math.abs(newRate - resultRate);
	    resultRate = newRate;
	    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
	  } while (contLoop);

	  // Return internal rate of return
	  return resultRate;
	};

	exports.XNPV = function(rate, values, dates) {
	  rate = utils.parseNumber(rate);
	  values = utils.parseNumberArray(utils.flatten(values));
	  dates = utils.parseDateArray(utils.flatten(dates));
	  if (utils.anyIsError(rate, values, dates)) {
	    return error.value;
	  }

	  var result = 0;
	  for (var i = 0; i < values.length; i++) {
	    result += values[i] / Math.pow(1 + rate, dateTime.DAYS(dates[i], dates[0]) / 365);
	  }
	  return result;
	};

	// TODO
	exports.YIELD = function() {
	 throw new Error('YIELD is not implemented');
	};

	// TODO
	exports.YIELDDISC = function() {
	 throw new Error('YIELDDISC is not implemented');
	};

	// TODO
	exports.YIELDMAT = function() {
	 throw new Error('YIELDMAT is not implemented');
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(5);

	exports.MATCH = function(lookupValue, lookupArray, matchType) {
	  if (!lookupValue && !lookupArray) {
	    return error.na;
	  }

	  if (arguments.length === 2) {
	    matchType = 1;
	  }
	  if (!(lookupArray instanceof Array)) {
	    return error.na;
	  }

	  if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
	    return error.na;
	  }
	  var index;
	  var indexValue;
	  for (var idx = 0; idx < lookupArray.length; idx++) {
	    if (matchType === 1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] < lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] > indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    } else if (matchType === 0) {
	      if (typeof lookupValue === 'string') {
	        lookupValue = lookupValue.replace(/\?/g, '.');
	        if (lookupArray[idx].toLowerCase().match(lookupValue.toLowerCase())) {
	          return idx + 1;
	        }
	      } else {
	        if (lookupArray[idx] === lookupValue) {
	          return idx + 1;
	        }
	      }
	    } else if (matchType === -1) {
	      if (lookupArray[idx] === lookupValue) {
	        return idx + 1;
	      } else if (lookupArray[idx] > lookupValue) {
	        if (!indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        } else if (lookupArray[idx] < indexValue) {
	          index = idx + 1;
	          indexValue = lookupArray[idx];
	        }
	      }
	    }
	  }

	  return index ? index : error.na;
	};

/***/ }
/******/ ])
});
;