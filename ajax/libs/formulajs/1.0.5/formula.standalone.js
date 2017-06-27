(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["formulajs"] = factory();
	else
		root["formulajs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var categories = [
	  __webpack_require__(1),
	  __webpack_require__(2),
	  __webpack_require__(3),
	  __webpack_require__(4),
	  __webpack_require__(5),
	  __webpack_require__(6),
	  __webpack_require__(7),
	  __webpack_require__(8),
	  __webpack_require__(9),
	  __webpack_require__(10),
	  __webpack_require__(11),
	  __webpack_require__(12)
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

	var mathTrig = __webpack_require__(5);
	var statistical = __webpack_require__(11);
	var engineering = __webpack_require__(3);
	var dateTime = __webpack_require__(7);

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

	var error = __webpack_require__(13);
	var stats = __webpack_require__(11);
	var maths = __webpack_require__(5);
	var utils = __webpack_require__(14);

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
	          currentCriteriaResult = currentCriteriaResult || eval(database[k][l] + criteria[p]);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);
	var jStat = __webpack_require__(18).jStat;
	var text = __webpack_require__(6);
	var utils = __webpack_require__(14);
	var bessel = __webpack_require__(15);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);
	var utils = __webpack_require__(14);
	var information = __webpack_require__(9);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var numeric = __webpack_require__(16);
	var utils = __webpack_require__(14);
	var error = __webpack_require__(13);
	var statistical = __webpack_require__(11);
	var information = __webpack_require__(9);

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
	  var coefficients = utils.parseNumberArray(coefficients);
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
	  var numbers = utils.numbers(utils.flatten(arguments));
	  var result = 0;
	  var i = numbers.length;
	  while (i--) {
	    result += numbers[i];
	  }

	  return result;
	};

	exports.SUMIF = function(range, criteria) {
	  var range = utils.parseNumberArray(utils.flatten(range));
	  if (range instanceof Error) {
	    return range;
	  }
	  var result = 0;
	  for (var i = 0; i < range.length; i++) {
	    result += (eval(range[i] + criteria)) ? range[i] : 0;
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
	    if (eval(condition)) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var utils = __webpack_require__(14);
	var error = __webpack_require__(13);
	var numeral = __webpack_require__(17);

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
	  return text.substring(start - 1, number);
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
	  if (typeof find_text !== 'string' || typeof within_text !== 'string') {
	    return error.value;
	  }
	  position = (position === undefined) ? 0 : position;
	  return within_text.toLowerCase().indexOf(find_text.toLowerCase(), position - 1) + 1;
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);
	var utils = __webpack_require__(14);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);
	var dateTime = __webpack_require__(7);
	var utils = __webpack_require__(14);

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
	  var epsMax = 1e-10;

	  // Set maximum number of iterations
	  var iterMax = 50;

	  // Implement Newton's method
	  var y, y0, y1, x0, x1 = 0,
	    f = 0,
	    i = 0;
	  var rate = guess;
	  if (Math.abs(rate) < epsMax) {
	    y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	  } else {
	    f = Math.exp(periods * Math.log(1 + rate));
	    y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  }
	  y0 = present + payment * periods + future;
	  y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
	  i = x0 = 0;
	  x1 = rate;
	  while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
	    rate = (y1 * x0 - y0 * x1) / (y1 - y0);
	    x0 = x1;
	    x1 = rate;
	    if (Math.abs(rate) < epsMax) {
	      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
	    } else {
	      f = Math.exp(periods * Math.log(1 + rate));
	      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
	    }
	    y0 = y1;
	    y1 = y;
	    ++i;
	  }
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);

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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var mathTrig = __webpack_require__(5);
	var text = __webpack_require__(6);
	var jStat = __webpack_require__(18).jStat;
	var utils = __webpack_require__(14);
	var error = __webpack_require__(13);
	var misc = __webpack_require__(12);

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
	    if (eval(range[i] + criteria)) {
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
	    if (eval(condition)) {
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
	      if (eval(range[i] + criteria)) {
	        matches++;
	      }
	    } else {
	      if (eval('"' + range[i] + '"' + criteria)) {
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
	        results[j] = results[j] && eval(range[j] + criteria);
	      } else {
	        results[j] = results[j] && eval('"' + range[j] + '"' + criteria);
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

	  return jStat.centralF.inv(1.0 - p, d1, d2)
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var utils   = __webpack_require__(14);
	var numeral = __webpack_require__(17);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var error = __webpack_require__(13);

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var numeric = (false)?(function numeric() {}):(exports);
	if(typeof global !== "undefined") { global.numeric = numeric; }

	numeric.version = "1.2.6";

	// 1. Utility functions
	numeric.bench = function bench (f,interval) {
	    var t1,t2,n,i;
	    if(typeof interval === "undefined") { interval = 15; }
	    n = 0.5;
	    t1 = new Date();
	    while(1) {
	        n*=2;
	        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	        while(i>0) { f(); i--; }
	        t2 = new Date();
	        if(t2-t1 > interval) break;
	    }
	    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	    while(i>0) { f(); i--; }
	    t2 = new Date();
	    return 1000*(3*n-1)/(t2-t1);
	}

	numeric._myIndexOf = (function _myIndexOf(w) {
	    var n = this.length,k;
	    for(k=0;k<n;++k) if(this[k]===w) return k;
	    return -1;
	});
	numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;

	numeric.Function = Function;
	numeric.precision = 4;
	numeric.largeArray = 50;

	numeric.prettyPrint = function prettyPrint(x) {
	    function fmtnum(x) {
	        if(x === 0) { return '0'; }
	        if(isNaN(x)) { return 'NaN'; }
	        if(x<0) { return '-'+fmtnum(-x); }
	        if(isFinite(x)) {
	            var scale = Math.floor(Math.log(x) / Math.log(10));
	            var normalized = x / Math.pow(10,scale);
	            var basic = normalized.toPrecision(numeric.precision);
	            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
	            return parseFloat(basic).toString()+'e'+scale.toString();
	        }
	        return 'Infinity';
	    }
	    var ret = [];
	    function foo(x) {
	        var k;
	        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
	        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
	        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
	        if(typeof x === "number") {
	            var a = fmtnum(x);
	            var b = x.toPrecision(numeric.precision);
	            var c = parseFloat(x.toString()).toString();
	            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
	            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
	            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
	            return false;
	        }
	        if(x === null) { ret.push("null"); return false; }
	        if(typeof x === "function") { 
	            ret.push(x.toString());
	            var flag = false;
	            for(k in x) { if(x.hasOwnProperty(k)) { 
	                if(flag) ret.push(',\n');
	                else ret.push('\n{');
	                flag = true; 
	                ret.push(k); 
	                ret.push(': \n'); 
	                foo(x[k]); 
	            } }
	            if(flag) ret.push('}\n');
	            return true;
	        }
	        if(x instanceof Array) {
	            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
	            var flag = false;
	            ret.push('[');
	            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
	            ret.push(']');
	            return true;
	        }
	        ret.push('{');
	        var flag = false;
	        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
	        ret.push('}');
	        return true;
	    }
	    foo(x);
	    return ret.join('');
	}

	numeric.parseDate = function parseDate(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
	        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}

	numeric.parseFloat = function parseFloat_(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return parseFloat(d); }
	        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}

	numeric.parseCSV = function parseCSV(t) {
	    var foo = t.split('\n');
	    var j,k;
	    var ret = [];
	    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
	    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
	    var stripper = function(n) { return n.substr(0,n.length-1); }
	    var count = 0;
	    for(k=0;k<foo.length;k++) {
	      var bar = (foo[k]+",").match(pat),baz;
	      if(bar.length>0) {
	          ret[count] = [];
	          for(j=0;j<bar.length;j++) {
	              baz = stripper(bar[j]);
	              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
	              else ret[count][j] = baz;
	          }
	          count++;
	      }
	    }
	    return ret;
	}

	numeric.toCSV = function toCSV(A) {
	    var s = numeric.dim(A);
	    var i,j,m,n,row,ret;
	    m = s[0];
	    n = s[1];
	    ret = [];
	    for(i=0;i<m;i++) {
	        row = [];
	        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
	        ret[i] = row.join(', ');
	    }
	    return ret.join('\n')+'\n';
	}

	numeric.getURL = function getURL(url) {
	    var client = new XMLHttpRequest();
	    client.open("GET",url,false);
	    client.send();
	    return client;
	}

	numeric.imageURL = function imageURL(img) {
	    function base64(A) {
	        var n = A.length, i,x,y,z,p,q,r,s;
	        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	        var ret = "";
	        for(i=0;i<n;i+=3) {
	            x = A[i];
	            y = A[i+1];
	            z = A[i+2];
	            p = x >> 2;
	            q = ((x & 3) << 4) + (y >> 4);
	            r = ((y & 15) << 2) + (z >> 6);
	            s = z & 63;
	            if(i+1>=n) { r = s = 64; }
	            else if(i+2>=n) { s = 64; }
	            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
	            }
	        return ret;
	    }
	    function crc32Array (a,from,to) {
	        if(typeof from === "undefined") { from = 0; }
	        if(typeof to === "undefined") { to = a.length; }
	        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
	                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
	                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
	                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
	                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
	                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
	                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
	                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
	                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
	                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
	                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
	                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
	                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
	                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
	                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
	                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
	                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
	                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
	                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
	                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
	                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
	                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
	                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
	                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
	                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
	                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
	                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
	                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
	                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
	                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
	                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
	                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
	     
	        var crc = -1, y = 0, n = a.length,i;

	        for (i = from; i < to; i++) {
	            y = (crc ^ a[i]) & 0xFF;
	            crc = (crc >>> 8) ^ table[y];
	        }
	     
	        return crc ^ (-1);
	    }

	    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
	    var stream = [
	                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
	                  0,0,0,13,                                                  //  8: IHDR Chunk length
	                  73, 72, 68, 82,                                            // 12: "IHDR" 
	                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
	                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
	                  8,                                                         // 24: bit depth
	                  2,                                                         // 25: RGB
	                  0,                                                         // 26: deflate
	                  0,                                                         // 27: no filter
	                  0,                                                         // 28: no interlace
	                  -1,-2,-3,-4,                                               // 29: CRC
	                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
	                  73, 68, 65, 84,                                            // 37: "IDAT"
	                  // RFC 1950 header starts here
	                  8,                                                         // 41: RFC1950 CMF
	                  29                                                         // 42: RFC1950 FLG
	                  ];
	    crc32 = crc32Array(stream,12,29);
	    stream[29] = (crc32>>24)&255;
	    stream[30] = (crc32>>16)&255;
	    stream[31] = (crc32>>8)&255;
	    stream[32] = (crc32)&255;
	    s1 = 1;
	    s2 = 0;
	    for(i=0;i<h;i++) {
	        if(i<h-1) { stream.push(0); }
	        else { stream.push(1); }
	        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
	        stream.push(a); stream.push(b);
	        stream.push((~a)&255); stream.push((~b)&255);
	        if(i===0) stream.push(0);
	        for(j=0;j<w;j++) {
	            for(k=0;k<3;k++) {
	                a = img[k][i][j];
	                if(a>255) a = 255;
	                else if(a<0) a=0;
	                else a = Math.round(a);
	                s1 = (s1 + a )%65521;
	                s2 = (s2 + s1)%65521;
	                stream.push(a);
	            }
	        }
	        stream.push(0);
	    }
	    adler32 = (s2<<16)+s1;
	    stream.push((adler32>>24)&255);
	    stream.push((adler32>>16)&255);
	    stream.push((adler32>>8)&255);
	    stream.push((adler32)&255);
	    length = stream.length - 41;
	    stream[33] = (length>>24)&255;
	    stream[34] = (length>>16)&255;
	    stream[35] = (length>>8)&255;
	    stream[36] = (length)&255;
	    crc32 = crc32Array(stream,37);
	    stream.push((crc32>>24)&255);
	    stream.push((crc32>>16)&255);
	    stream.push((crc32>>8)&255);
	    stream.push((crc32)&255);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	//    a = stream.length;
	    stream.push(73);  // I
	    stream.push(69);  // E
	    stream.push(78);  // N
	    stream.push(68);  // D
	    stream.push(174); // CRC1
	    stream.push(66);  // CRC2
	    stream.push(96);  // CRC3
	    stream.push(130); // CRC4
	    return 'data:image/png;base64,'+base64(stream);
	}

	// 2. Linear algebra with Arrays.
	numeric._dim = function _dim(x) {
	    var ret = [];
	    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
	    return ret;
	}

	numeric.dim = function dim(x) {
	    var y,z;
	    if(typeof x === "object") {
	        y = x[0];
	        if(typeof y === "object") {
	            z = y[0];
	            if(typeof z === "object") {
	                return numeric._dim(x);
	            }
	            return [x.length,y.length];
	        }
	        return [x.length];
	    }
	    return [];
	}

	numeric.mapreduce = function mapreduce(body,init) {
	    return Function('x','accum','_s','_k',
	            'if(typeof accum === "undefined") accum = '+init+';\n'+
	            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
	            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i,xi;\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) {\n'+
	            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
	            '    }'+
	            '    return accum;\n'+
	            '}\n'+
	            'for(i=_n-1;i>=1;i-=2) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '    xi = x[i-1];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'if(i === 0) {\n'+
	            '    xi = x[i];\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	numeric.mapreduce2 = function mapreduce2(body,setup) {
	    return Function('x',
	            'var n = x.length;\n'+
	            'var i,xi;\n'+setup+';\n'+
	            'for(i=n-1;i!==-1;--i) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'return accum;'
	            );
	}


	numeric.same = function same(x,y) {
	    var i,n;
	    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
	    n = x.length;
	    if(n !== y.length) { return false; }
	    for(i=0;i<n;i++) {
	        if(x[i] === y[i]) { continue; }
	        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
	        else { return false; }
	    }
	    return true;
	}

	numeric.rep = function rep(s,v,k) {
	    if(typeof k === "undefined") { k=0; }
	    var n = s[k], ret = Array(n), i;
	    if(k === s.length-1) {
	        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
	        if(i===-1) { ret[0] = v; }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
	    return ret;
	}


	numeric.dotMMsmall = function dotMMsmall(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
	    p = x.length; q = y.length; r = y[0].length;
	    ret = Array(p);
	    for(i=p-1;i>=0;i--) {
	        foo = Array(r);
	        bar = x[i];
	        for(k=r-1;k>=0;k--) {
	            woo = bar[q-1]*y[q-1][k];
	            for(j=q-2;j>=1;j-=2) {
	                i0 = j-1;
	                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
	            }
	            if(j===0) { woo += bar[0]*y[0][k]; }
	            foo[k] = woo;
	        }
	        ret[i] = foo;
	    }
	    return ret;
	}
	numeric._getCol = function _getCol(A,j,x) {
	    var n = A.length, i;
	    for(i=n-1;i>0;--i) {
	        x[i] = A[i][j];
	        --i;
	        x[i] = A[i][j];
	    }
	    if(i===0) x[0] = A[0][j];
	}
	numeric.dotMMbig = function dotMMbig(x,y){
	    var gc = numeric._getCol, p = y.length, v = Array(p);
	    var m = x.length, n = y[0].length, A = new Array(m), xj;
	    var VV = numeric.dotVV;
	    var i,j,k,z;
	    --p;
	    --m;
	    for(i=m;i!==-1;--i) A[i] = Array(n);
	    --n;
	    for(i=n;i!==-1;--i) {
	        gc(y,i,v);
	        for(j=m;j!==-1;--j) {
	            z=0;
	            xj = x[j];
	            A[j][i] = VV(xj,v);
	        }
	    }
	    return A;
	}

	numeric.dotMV = function dotMV(x,y) {
	    var p = x.length, q = y.length,i;
	    var ret = Array(p), dotVV = numeric.dotVV;
	    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
	    return ret;
	}

	numeric.dotVM = function dotVM(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
	    p = x.length; q = y[0].length;
	    ret = Array(q);
	    for(k=q-1;k>=0;k--) {
	        woo = x[p-1]*y[p-1][k];
	        for(j=p-2;j>=1;j-=2) {
	            i0 = j-1;
	            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
	        }
	        if(j===0) { woo += x[0]*y[0][k]; }
	        ret[k] = woo;
	    }
	    return ret;
	}

	numeric.dotVV = function dotVV(x,y) {
	    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
	    for(i=n-2;i>=1;i-=2) {
	        i1 = i-1;
	        ret += x[i]*y[i] + x[i1]*y[i1];
	    }
	    if(i===0) { ret += x[0]*y[0]; }
	    return ret;
	}

	numeric.dot = function dot(x,y) {
	    var d = numeric.dim;
	    switch(d(x).length*1000+d(y).length) {
	    case 2002:
	        if(y.length < 10) return numeric.dotMMsmall(x,y);
	        else return numeric.dotMMbig(x,y);
	    case 2001: return numeric.dotMV(x,y);
	    case 1002: return numeric.dotVM(x,y);
	    case 1001: return numeric.dotVV(x,y);
	    case 1000: return numeric.mulVS(x,y);
	    case 1: return numeric.mulSV(x,y);
	    case 0: return x*y;
	    default: throw new Error('numeric.dot only works on vectors and matrices');
	    }
	}

	numeric.diag = function diag(d) {
	    var i,i1,j,n = d.length, A = Array(n), Ai;
	    for(i=n-1;i>=0;i--) {
	        Ai = Array(n);
	        i1 = i+2;
	        for(j=n-1;j>=i1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j>i) { Ai[j] = 0; }
	        Ai[i] = d[i];
	        for(j=i-1;j>=1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j===0) { Ai[0] = 0; }
	        A[i] = Ai;
	    }
	    return A;
	}
	numeric.getDiag = function(A) {
	    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
	    for(i=n-1;i>=1;--i) {
	        ret[i] = A[i][i];
	        --i;
	        ret[i] = A[i][i];
	    }
	    if(i===0) {
	        ret[0] = A[0][0];
	    }
	    return ret;
	}

	numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
	numeric.pointwise = function pointwise(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = '_s';
	    fun[params.length+1] = '_k';
	    fun[params.length+2] = (
	            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
	            '    return ret;\n'+
	            '}\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric.pointwise2 = function pointwise2(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = (
	            'var _n = '+thevec+'.length;\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric._biforeach = (function _biforeach(x,y,s,k,f) {
	    if(k === s.length-1) { f(x,y); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	});
	numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
	    if(k === s.length-1) { return f(x,y); }
	    var i,n=s[k],ret = Array(n);
	    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	    return ret;
	});
	numeric._foreach = (function _foreach(x,s,k,f) {
	    if(k === s.length-1) { f(x); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
	});
	numeric._foreach2 = (function _foreach2(x,s,k,f) {
	    if(k === s.length-1) { return f(x); }
	    var i,n=s[k], ret = Array(n);
	    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
	    return ret;
	});

	/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
	numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
	numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
	numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/

	numeric.ops2 = {
	        add: '+',
	        sub: '-',
	        mul: '*',
	        div: '/',
	        mod: '%',
	        and: '&&',
	        or:  '||',
	        eq:  '===',
	        neq: '!==',
	        lt:  '<',
	        gt:  '>',
	        leq: '<=',
	        geq: '>=',
	        band: '&',
	        bor: '|',
	        bxor: '^',
	        lshift: '<<',
	        rshift: '>>',
	        rrshift: '>>>'
	};
	numeric.opseq = {
	        addeq: '+=',
	        subeq: '-=',
	        muleq: '*=',
	        diveq: '/=',
	        modeq: '%=',
	        lshifteq: '<<=',
	        rshifteq: '>>=',
	        rrshifteq: '>>>=',
	        bandeq: '&=',
	        boreq: '|=',
	        bxoreq: '^='
	};
	numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
	                    'exp','floor','log','round','sin','sqrt','tan',
	                    'isNaN','isFinite'];
	numeric.mathfuns2 = ['atan2','pow','max','min'];
	numeric.ops1 = {
	        neg: '-',
	        not: '!',
	        bnot: '~',
	        clone: ''
	};
	numeric.mapreducers = {
	        any: ['if(xi) return true;','var accum = false;'],
	        all: ['if(!xi) return false;','var accum = true;'],
	        sum: ['accum += xi;','var accum = 0;'],
	        prod: ['accum *= xi;','var accum = 1;'],
	        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
	        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
	        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
	        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
	        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
	};

	(function () {
	    var i,o;
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        numeric.ops2[o] = o;
	    }
	    for(i in numeric.ops2) {
	        if(numeric.ops2.hasOwnProperty(i)) {
	            o = numeric.ops2[i];
	            var code, codeeq, setup = '';
	            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
	                setup = 'var '+o+' = Math.'+o+';\n';
	                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
	                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
	            } else {
	                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
	                if(numeric.opseq.hasOwnProperty(i+'eq')) {
	                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
	                } else {
	                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
	                }
	            }
	            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
	            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
	            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
	            numeric[i] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
	                    'var dim = numeric.dim;\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof x === "object") {\n'+
	                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
	                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
	                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
	                    '  else '+codeeq('x','y')+'\n'+
	                    '}\nreturn x;\n');
	            numeric[o] = numeric[i];
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
	            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
	            numeric[i+'eq'] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
	                    '  else numeric._biforeach(x,y,s,0,S);\n'+
	                    '}\nreturn x;\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        delete numeric.ops2[o];
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        numeric.ops1[o] = o;
	    }
	    for(i in numeric.ops1) {
	        if(numeric.ops1.hasOwnProperty(i)) {
	            setup = '';
	            o = numeric.ops1[i];
	            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
	                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
	            }
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
	            numeric[i+'eq'] = Function('x',
	                    'if(typeof x !== "object") return '+o+'x\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'eqV;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'numeric._foreach(x,s,0,V);\n'+
	                    'return x;\n');
	            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
	            numeric[i] = Function('x',
	                    'if(typeof x !== "object") return '+o+'(x)\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'V;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'return numeric._foreach2(x,s,0,V);\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        delete numeric.ops1[o];
	    }
	    for(i in numeric.mapreducers) {
	        if(numeric.mapreducers.hasOwnProperty(i)) {
	            o = numeric.mapreducers[i];
	            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
	            numeric[i] = Function('x','s','k',
	                    o[1]+
	                    'if(typeof x !== "object") {'+
	                    '    xi = x;\n'+
	                    o[0]+';\n'+
	                    '    return accum;\n'+
	                    '}'+
	                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
	                    'if(typeof k === "undefined") k = 0;\n'+
	                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
	                    'var xi;\n'+
	                    'var n = x.length, i;\n'+
	                    'for(i=n-1;i!==-1;--i) {\n'+
	                    '   xi = arguments.callee(x[i]);\n'+
	                    o[0]+';\n'+
	                    '}\n'+
	                    'return accum;\n');
	        }
	    }
	}());

	numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
	numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
	numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
	numeric.trunc = function trunc(x,y) {
	    if(typeof x === "object") {
	        if(typeof y === "object") return numeric.truncVV(x,y);
	        return numeric.truncVS(x,y);
	    }
	    if (typeof y === "object") return numeric.truncSV(x,y);
	    return Math.round(x/y)*y;
	}

	numeric.inv = function inv(x) {
	    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
	    var A = numeric.clone(x), Ai, Aj;
	    var I = numeric.identity(m), Ii, Ij;
	    var i,j,k,x;
	    for(j=0;j<n;++j) {
	        var i0 = -1;
	        var v0 = -1;
	        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
	        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
	        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
	        x = Aj[j];
	        for(k=j;k!==n;++k)    Aj[k] /= x; 
	        for(k=n-1;k!==-1;--k) Ij[k] /= x;
	        for(i=m-1;i!==-1;--i) {
	            if(i!==j) {
	                Ai = A[i];
	                Ii = I[i];
	                x = Ai[j];
	                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
	                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
	                if(k===0) Ii[0] -= Ij[0]*x;
	            }
	        }
	    }
	    return I;
	}

	numeric.det = function det(x) {
	    var s = numeric.dim(x);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
	    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
	    for(j=0;j<n-1;j++) {
	        k=j;
	        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
	        if(k !== j) {
	            temp = A[k]; A[k] = A[j]; A[j] = temp;
	            ret *= -1;
	        }
	        Aj = A[j];
	        for(i=j+1;i<n;i++) {
	            Ai = A[i];
	            alpha = Ai[j]/Aj[j];
	            for(k=j+1;k<n-1;k+=2) {
	                k1 = k+1;
	                Ai[k] -= Aj[k]*alpha;
	                Ai[k1] -= Aj[k1]*alpha;
	            }
	            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
	        }
	        if(Aj[j] === 0) { return 0; }
	        ret *= Aj[j];
	    }
	    return ret*A[j][j];
	}

	numeric.transpose = function transpose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = A0[j];
	            --j;
	            ret[j][0] = A0[j];
	        }
	        if(j===0) { ret[0][0] = A0[0]; }
	    }
	    return ret;
	}
	numeric.negtranspose = function negtranspose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = -A0[j];
	            --j;
	            ret[j][0] = -A0[j];
	        }
	        if(j===0) { ret[0][0] = -A0[0]; }
	    }
	    return ret;
	}

	numeric._random = function _random(s,k) {
	    var i,n=s[k],ret=Array(n), rnd;
	    if(k === s.length-1) {
	        rnd = Math.random;
	        for(i=n-1;i>=1;i-=2) {
	            ret[i] = rnd();
	            ret[i-1] = rnd();
	        }
	        if(i===0) { ret[0] = rnd(); }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
	    return ret;
	}
	numeric.random = function random(s) { return numeric._random(s,0); }

	numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }

	numeric.linspace = function linspace(a,b,n) {
	    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
	    if(n<2) { return n===1?[a]:[]; }
	    var i,ret = Array(n);
	    n--;
	    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
	    return ret;
	}

	numeric.getBlock = function getBlock(x,from,to) {
	    var s = numeric.dim(x);
	    function foo(x,k) {
	        var i,a = from[k], n = to[k]-a, ret = Array(n);
	        if(k === s.length-1) {
	            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
	            return ret;
	        }
	        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
	        return ret;
	    }
	    return foo(x,0);
	}

	numeric.setBlock = function setBlock(x,from,to,B) {
	    var s = numeric.dim(x);
	    function foo(x,y,k) {
	        var i,a = from[k], n = to[k]-a;
	        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
	        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
	    }
	    foo(x,B,0);
	    return x;
	}

	numeric.getRange = function getRange(A,I,J) {
	    var m = I.length, n = J.length;
	    var i,j;
	    var B = Array(m), Bi, AI;
	    for(i=m-1;i!==-1;--i) {
	        B[i] = Array(n);
	        Bi = B[i];
	        AI = A[I[i]];
	        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
	    }
	    return B;
	}

	numeric.blockMatrix = function blockMatrix(X) {
	    var s = numeric.dim(X);
	    if(s.length<4) return numeric.blockMatrix([X]);
	    var m=s[0],n=s[1],M,N,i,j,Xij;
	    M = 0; N = 0;
	    for(i=0;i<m;++i) M+=X[i][0].length;
	    for(j=0;j<n;++j) N+=X[0][j][0].length;
	    var Z = Array(M);
	    for(i=0;i<M;++i) Z[i] = Array(N);
	    var I=0,J,ZI,k,l,Xijk;
	    for(i=0;i<m;++i) {
	        J=N;
	        for(j=n-1;j!==-1;--j) {
	            Xij = X[i][j];
	            J -= Xij[0].length;
	            for(k=Xij.length-1;k!==-1;--k) {
	                Xijk = Xij[k];
	                ZI = Z[I+k];
	                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
	            }
	        }
	        I += X[i][0].length;
	    }
	    return Z;
	}

	numeric.tensor = function tensor(x,y) {
	    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
	    var s1 = numeric.dim(x), s2 = numeric.dim(y);
	    if(s1.length !== 1 || s2.length !== 1) {
	        throw new Error('numeric: tensor product is only defined for vectors');
	    }
	    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
	    for(i=m-1;i>=0;i--) {
	        Ai = Array(n);
	        xi = x[i];
	        for(j=n-1;j>=3;--j) {
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	        }
	        while(j>=0) { Ai[j] = xi * y[j]; --j; }
	        A[i] = Ai;
	    }
	    return A;
	}

	// 3. The Tensor type T
	numeric.T = function T(x,y) { this.x = x; this.y = y; }
	numeric.t = function t(x,y) { return new numeric.T(x,y); }

	numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
	    var io = numeric.indexOf;
	    if(typeof setup !== "string") {
	        var k;
	        setup = '';
	        for(k in numeric) {
	            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
	                setup += 'var '+k+' = numeric.'+k+';\n';
	            }
	        }
	    }
	    return Function(['y'],
	            'var x = this;\n'+
	            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
	            setup+'\n'+
	            'if(x.y) {'+
	            '  if(y.y) {'+
	            '    return new numeric.T('+cc+');\n'+
	            '  }\n'+
	            '  return new numeric.T('+cr+');\n'+
	            '}\n'+
	            'if(y.y) {\n'+
	            '  return new numeric.T('+rc+');\n'+
	            '}\n'+
	            'return new numeric.T('+rr+');\n'
	    );
	}

	numeric.T.prototype.add = numeric.Tbinop(
	        'add(x.x,y.x)',
	        'add(x.x,y.x),y.y',
	        'add(x.x,y.x),x.y',
	        'add(x.x,y.x),add(x.y,y.y)');
	numeric.T.prototype.sub = numeric.Tbinop(
	        'sub(x.x,y.x)',
	        'sub(x.x,y.x),neg(y.y)',
	        'sub(x.x,y.x),x.y',
	        'sub(x.x,y.x),sub(x.y,y.y)');
	numeric.T.prototype.mul = numeric.Tbinop(
	        'mul(x.x,y.x)',
	        'mul(x.x,y.x),mul(x.x,y.y)',
	        'mul(x.x,y.x),mul(x.y,y.x)',
	        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');

	numeric.T.prototype.reciprocal = function reciprocal() {
	    var mul = numeric.mul, div = numeric.div;
	    if(this.y) {
	        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
	        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
	    }
	    return new T(div(1,this.x));
	}
	numeric.T.prototype.div = function div(y) {
	    if(!(y instanceof numeric.T)) y = new numeric.T(y);
	    if(y.y) { return this.mul(y.reciprocal()); }
	    var div = numeric.div;
	    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
	    return new numeric.T(div(this.x,y.x));
	}
	numeric.T.prototype.dot = numeric.Tbinop(
	        'dot(x.x,y.x)',
	        'dot(x.x,y.x),dot(x.x,y.y)',
	        'dot(x.x,y.x),dot(x.y,y.x)',
	        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
	        );
	numeric.T.prototype.transpose = function transpose() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),t(y)); }
	    return new numeric.T(t(x));
	}
	numeric.T.prototype.transjugate = function transjugate() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
	    return new numeric.T(t(x));
	}
	numeric.Tunop = function Tunop(r,c,s) {
	    if(typeof s !== "string") { s = ''; }
	    return Function(
	            'var x = this;\n'+
	            s+'\n'+
	            'if(x.y) {'+
	            '  '+c+';\n'+
	            '}\n'+
	            r+';\n'
	    );
	}

	numeric.T.prototype.exp = numeric.Tunop(
	        'return new numeric.T(ex)',
	        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
	        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
	numeric.T.prototype.conj = numeric.Tunop(
	        'return new numeric.T(x.x);',
	        'return new numeric.T(x.x,numeric.neg(x.y));');
	numeric.T.prototype.neg = numeric.Tunop(
	        'return new numeric.T(neg(x.x));',
	        'return new numeric.T(neg(x.x),neg(x.y));',
	        'var neg = numeric.neg;');
	numeric.T.prototype.sin = numeric.Tunop(
	        'return new numeric.T(numeric.sin(x.x))',
	        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
	numeric.T.prototype.cos = numeric.Tunop(
	        'return new numeric.T(numeric.cos(x.x))',
	        'return x.exp().add(x.neg().exp()).div(2);');
	numeric.T.prototype.abs = numeric.Tunop(
	        'return new numeric.T(numeric.abs(x.x));',
	        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
	        'var mul = numeric.mul;');
	numeric.T.prototype.log = numeric.Tunop(
	        'return new numeric.T(numeric.log(x.x));',
	        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
	        'return new numeric.T(numeric.log(r.x),theta.x);');
	numeric.T.prototype.norm2 = numeric.Tunop(
	        'return numeric.norm2(x.x);',
	        'var f = numeric.norm2Squared;\n'+
	        'return Math.sqrt(f(x.x)+f(x.y));');
	numeric.T.prototype.inv = function inv() {
	    var A = this;
	    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
	    var n = A.x.length, i, j, k;
	    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
	    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
	    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
	    var i,j,k,d,d1,ax,ay,bx,by,temp;
	    for(i=0;i<n;i++) {
	        ax = Ax[i][i]; ay = Ay[i][i];
	        d = ax*ax+ay*ay;
	        k = i;
	        for(j=i+1;j<n;j++) {
	            ax = Ax[j][i]; ay = Ay[j][i];
	            d1 = ax*ax+ay*ay;
	            if(d1 > d) { k=j; d = d1; }
	        }
	        if(k!==i) {
	            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
	            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
	            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
	            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
	        }
	        Aix = Ax[i]; Aiy = Ay[i];
	        Rix = Rx[i]; Riy = Ry[i];
	        ax = Aix[i]; ay = Aiy[i];
	        for(j=i+1;j<n;j++) {
	            bx = Aix[j]; by = Aiy[j];
	            Aix[j] = (bx*ax+by*ay)/d;
	            Aiy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=0;j<n;j++) {
	            bx = Rix[j]; by = Riy[j];
	            Rix[j] = (bx*ax+by*ay)/d;
	            Riy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=i+1;j<n;j++) {
	            Ajx = Ax[j]; Ajy = Ay[j];
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ajx[i]; ay = Ajy[i];
	            for(k=i+1;k<n;k++) {
	                bx = Aix[k]; by = Aiy[k];
	                Ajx[k] -= bx*ax-by*ay;
	                Ajy[k] -= by*ax+bx*ay;
	            }
	            for(k=0;k<n;k++) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= bx*ax-by*ay;
	                Rjy[k] -= by*ax+bx*ay;
	            }
	        }
	    }
	    for(i=n-1;i>0;i--) {
	        Rix = Rx[i]; Riy = Ry[i];
	        for(j=i-1;j>=0;j--) {
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ax[j][i]; ay = Ay[j][i];
	            for(k=n-1;k>=0;k--) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= ax*bx - ay*by;
	                Rjy[k] -= ax*by + ay*bx;
	            }
	        }
	    }
	    return new numeric.T(Rx,Ry);
	}
	numeric.T.prototype.get = function get(i) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length;
	    if(y) {
	        while(k<n) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        return new numeric.T(x,y);
	    }
	    while(k<n) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    return new numeric.T(x);
	}
	numeric.T.prototype.set = function set(i,v) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
	    if(n===0) {
	        if(vy) { this.y = vy; }
	        else if(y) { this.y = undefined; }
	        this.x = x;
	        return this;
	    }
	    if(vy) {
	        if(y) { /* ok */ }
	        else {
	            y = numeric.rep(numeric.dim(x),0);
	            this.y = y;
	        }
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        y[ik] = vy;
	        return this;
	    }
	    if(y) {
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
	        else y[ik] = 0;
	        return this;
	    }
	    while(k<n-1) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    ik = i[k];
	    x[ik] = vx;
	    return this;
	}
	numeric.T.prototype.getRows = function getRows(i0,i1) {
	    var n = i1-i0+1, j;
	    var rx = Array(n), ry, x = this.x, y = this.y;
	    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
	    if(y) {
	        ry = Array(n);
	        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
	        return new numeric.T(rx,ry);
	    }
	    return new numeric.T(rx);
	}
	numeric.T.prototype.setRows = function setRows(i0,i1,A) {
	    var j;
	    var rx = this.x, ry = this.y, x = A.x, y = A.y;
	    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
	    } else if(ry) {
	        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
	    }
	    return this;
	}
	numeric.T.prototype.getRow = function getRow(k) {
	    var x = this.x, y = this.y;
	    if(y) { return new numeric.T(x[k],y[k]); }
	    return new numeric.T(x[k]);
	}
	numeric.T.prototype.setRow = function setRow(i,v) {
	    var rx = this.x, ry = this.y, x = v.x, y = v.y;
	    rx[i] = x;
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        ry[i] = y;
	    } else if(ry) {
	        ry = numeric.rep([x.length],0);
	    }
	    return this;
	}

	numeric.T.prototype.getBlock = function getBlock(from,to) {
	    var x = this.x, y = this.y, b = numeric.getBlock;
	    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
	    return new numeric.T(b(x,from,to));
	}
	numeric.T.prototype.setBlock = function setBlock(from,to,A) {
	    if(!(A instanceof numeric.T)) A = new numeric.T(A);
	    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
	    if(Ay) {
	        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
	        b(x,from,to,Ax);
	        b(y,from,to,Ay);
	        return this;
	    }
	    b(x,from,to,Ax);
	    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
	}
	numeric.T.rep = function rep(s,v) {
	    var T = numeric.T;
	    if(!(v instanceof T)) v = new T(v);
	    var x = v.x, y = v.y, r = numeric.rep;
	    if(y) return new T(r(s,x),r(s,y));
	    return new T(r(s,x));
	}
	numeric.T.diag = function diag(d) {
	    if(!(d instanceof numeric.T)) d = new numeric.T(d);
	    var x = d.x, y = d.y, diag = numeric.diag;
	    if(y) return new numeric.T(diag(x),diag(y));
	    return new numeric.T(diag(x));
	}
	numeric.T.eig = function eig() {
	    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
	    return numeric.eig(this.x);
	}
	numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
	numeric.T.prototype.getDiag = function getDiag() {
	    var n = numeric;
	    var x = this.x, y = this.y;
	    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
	    return new n.T(n.getDiag(x));
	}

	// 4. Eigenvalues of real matrices

	numeric.house = function house(x) {
	    var v = numeric.clone(x);
	    var s = x[0] >= 0 ? 1 : -1;
	    var alpha = s*numeric.norm2(x);
	    v[0] += alpha;
	    var foo = numeric.norm2(v);
	    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
	    return numeric.div(v,foo);
	}

	numeric.toUpperHessenberg = function toUpperHessenberg(me) {
	    var s = numeric.dim(me);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
	    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
	    for(j=0;j<m-2;j++) {
	        x = Array(m-j-1);
	        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
	        if(numeric.norm2(x)>0) {
	            v = numeric.house(x);
	            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
	            B = Array(m-j-1);
	            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    return {H:A, Q:Q};
	}

	numeric.epsilon = 2.220446049250313e-16;

	numeric.QRFrancis = function(H,maxiter) {
	    if(typeof maxiter === "undefined") { maxiter = 10000; }
	    H = numeric.clone(H);
	    var H0 = numeric.clone(H);
	    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
	    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
	    var epsilon = numeric.epsilon;
	    for(iter=0;iter<maxiter;iter++) {
	        for(j=0;j<m-1;j++) {
	            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
	                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
	                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
	                B = Array(j+1);
	                for(i=0;i<=j;i++) { B[i] = Q[i]; }
	                C = numeric.dot(QH1.Q,B);
	                for(i=0;i<=j;i++) { Q[i] = C[i]; }
	                B = Array(m-j-1);
	                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
	                C = numeric.dot(QH2.Q,B);
	                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
	                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
	            }
	        }
	        a = H[m-2][m-2]; b = H[m-2][m-1];
	        c = H[m-1][m-2]; d = H[m-1][m-1];
	        tr = a+d;
	        det = (a*d-b*c);
	        Hloc = numeric.getBlock(H, [0,0], [2,2]);
	        if(tr*tr>=4*det) {
	            var s1,s2;
	            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
	            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,s1+s2)),
	                               numeric.diag(numeric.rep([3],s1*s2)));
	        } else {
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,tr)),
	                               numeric.diag(numeric.rep([3],det)));
	        }
	        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
	        v = numeric.house(x);
	        B = [H[0],H[1],H[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
	        B = numeric.getBlock(H, [0,0],[m-1,2]);
	        C = numeric.tensor(numeric.dot(B,v),v);
	        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
	        B = [Q[0],Q[1],Q[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        var J;
	        for(j=0;j<m-2;j++) {
	            for(k=j;k<=j+1;k++) {
	                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
	                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
	                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
	                    B = Array(k+1);
	                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
	                    C = numeric.dot(QH1.Q,B);
	                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
	                    B = Array(m-k-1);
	                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
	                    C = numeric.dot(QH2.Q,B);
	                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
	                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
	                }
	            }
	            J = Math.min(m-1,j+3);
	            x = Array(J-j);
	            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
	            v = numeric.house(x);
	            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
	            B = Array(J-j);
	            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
	}

	numeric.eig = function eig(A,maxiter) {
	    var QH = numeric.toUpperHessenberg(A);
	    var QB = numeric.QRFrancis(QH.H,maxiter);
	    var T = numeric.T;
	    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
	    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
	    var m = B.length,j;
	    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
	    var sqrt = Math.sqrt;
	    for(k=0;k<m;k++) {
	        i = B[k][0];
	        if(i === B[k][1]) {
	            // nothing
	        } else {
	            j = i+1;
	            a = H[i][i];
	            b = H[i][j];
	            c = H[j][i];
	            d = H[j][j];
	            if(b === 0 && c === 0) continue;
	            p1 = -a-d;
	            p2 = a*d-b*c;
	            disc = p1*p1-4*p2;
	            if(disc>=0) {
	                if(p1<0) x = -0.5*(p1-sqrt(disc));
	                else     x = -0.5*(p1+sqrt(disc));
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                } else {
	                    n2 = sqrt(n2);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                }
	                Q0 = new T([[q,-p],[p,q]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            } else {
	                x = -0.5*p1;
	                y = 0.5*sqrt(-disc);
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1+y*y);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                    x = 0;
	                    y /= n1;
	                } else {
	                    n2 = sqrt(n2+y*y);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                    x = y/n2;
	                    y = 0;
	                }
	                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            }
	        }
	    }
	    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
	    for(j=0;j<n;j++) {
	        if(j>0) {
	            for(k=j-1;k>=0;k--) {
	                var Rk = R.get([k,k]), Rj = R.get([j,j]);
	                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
	                    x = R.getRow(k).getBlock([k],[j-1]);
	                    y = E.getRow(j).getBlock([k],[j-1]);
	                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
	                } else {
	                    E.setRow(j,E.getRow(k));
	                    continue;
	                }
	            }
	        }
	    }
	    for(j=0;j<n;j++) {
	        x = E.getRow(j);
	        E.setRow(j,x.div(x.norm2()));
	    }
	    E = E.transpose();
	    E = Q.transjugate().dot(E);
	    return { lambda:R.getDiag(), E:E };
	};

	// 5. Compressed Column Storage matrices
	numeric.ccsSparse = function ccsSparse(A) {
	    var m = A.length,n,foo, i,j, counts = [];
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            j = parseInt(j);
	            while(j>=counts.length) counts[counts.length] = 0;
	            if(foo[j]!==0) counts[j]++;
	        }
	    }
	    var n = counts.length;
	    var Ai = Array(n+1);
	    Ai[0] = 0;
	    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
	    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            if(foo[j]!==0) {
	                counts[j]--;
	                Aj[Ai[j]+counts[j]] = i;
	                Av[Ai[j]+counts[j]] = foo[j];
	            }
	        }
	    }
	    return [Ai,Aj,Av];
	}
	numeric.ccsFull = function ccsFull(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
	    var B = numeric.rep([m,n],0);
	    for(i=0;i<n;i++) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
	    }
	    return B;
	}
	numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
	    if(typeof bj === "undefined") x = numeric.rep([m],0);
	    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
	    if(typeof xj === "undefined") xj = [];
	    function dfs(j) {
	        var k;
	        if(x[j] !== 0) return;
	        x[j] = 1;
	        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
	        xj[n] = j;
	        ++n;
	    }
	    var i,j,j0,j1,k,l,l0,l1,a;
	    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
	    xj.length = n;
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = max(Ai[j+1],j0);
	        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k!==j1;++k) {
	            l = Aj[k];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsDFS = function ccsDFS(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[J];
	    k1[0] = k11 = Ai[J+1];
	    while(1) {
	        if(km >= k11) {
	            xj[n] = j[m];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Pinv[Aj[km]];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k<j1;++k) {
	            l = Pinv[Aj[k]];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,x,xj,i,Pinv,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(x[k]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(x[i])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	            a = x[i]; x[i] = x[e]; x[e] = a;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = x[i];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = x[k];
	            xj[j] = 0;
	            x[k] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsDFS0 = function ccsDFS0(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[Pinv[J]];
	    k1[0] = k11 = Ai[Pinv[J]+1];
	    while(1) {
	        if(isNaN(km)) throw new Error("Ow!");
	        if(km >= k11) {
	            xj[n] = Pinv[j[m]];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Aj[km];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                foo = Pinv[foo];
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
	    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        l = P[j];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
	        a = y[l];
	        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
	        y[l] = a;
	    }
	}
	numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS0(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,y,xj,i,Pinv,P,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(y[P[k]]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(y[P[i]])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = y[P[i]];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = y[P[k]];
	            xj[j] = 0;
	            y[P[k]] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsLUP = numeric.ccsLUP0;

	numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
	numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
	    var s = numeric.ccsDim(A),m=s[0],n=s[1];
	    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
	    else if(typeof i === "number") { i = [i]; }
	    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
	    else if(typeof j === "number") { j = [j]; }
	    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
	    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
	    for(q=0;q<Q;++q) {
	        jq = j[q];
	        var q0 = Ai[jq];
	        var q1 = Ai[jq+1];
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 1;
	            x[r] = Av[p];
	        }
	        for(p=0;p<P;++p) {
	            ip = i[p];
	            if(flags[ip]) {
	                Bj[count] = p;
	                Bv[count] = x[i[p]];
	                ++count;
	            }
	        }
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 0;
	        }
	        Bi[q+1] = count;
	    }
	    return B;
	}

	numeric.ccsDot = function ccsDot(A,B) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
	    var m = sA[0], n = sA[1], o = sB[1];
	    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
	    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
	    var i,j,k,j0,j1,i0,i1,l,p,a,b;
	    for(k=0;k!==o;++k) {
	        j0 = Bi[k];
	        j1 = Bi[k+1];
	        p = 0;
	        for(j=j0;j<j1;++j) {
	            a = Bj[j];
	            b = Bv[j];
	            i0 = Ai[a];
	            i1 = Ai[a+1];
	            for(i=i0;i<i1;++i) {
	                l = Aj[i];
	                if(flags[l]===0) {
	                    xj[p] = l;
	                    flags[l] = 1;
	                    p = p+1;
	                }
	                x[l] = x[l] + Av[i]*b;
	            }
	        }
	        j0 = Ci[k];
	        j1 = j0+p;
	        Ci[k+1] = j1;
	        for(j=p-1;j!==-1;--j) {
	            b = j0+j;
	            i = xj[j];
	            Cj[b] = i;
	            Cv[b] = x[i];
	            flags[i] = 0;
	            x[i] = 0;
	        }
	        Ci[k+1] = Ci[k]+p;
	    }
	    return C;
	}

	numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
	    var L = LUP.L, U = LUP.U, P = LUP.P;
	    var Bi = B[0];
	    var flag = false;
	    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
	    var Bj = B[1], Bv = B[2];
	    var n = L[0].length-1, m = Bi.length-1;
	    var x = numeric.rep([n],0), xj = Array(n);
	    var b = numeric.rep([n],0), bj = Array(n);
	    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
	    var sol = numeric.ccsTSolve;
	    var i,j,j0,j1,k,J,N=0;
	    for(i=0;i<m;++i) {
	        k = 0;
	        j0 = Bi[i];
	        j1 = Bi[i+1];
	        for(j=j0;j<j1;++j) { 
	            J = LUP.Pinv[Bj[j]];
	            bj[k] = J;
	            b[J] = Bv[j];
	            ++k;
	        }
	        bj.length = k;
	        sol(L,b,x,bj,xj);
	        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
	        sol(U,x,b,xj,bj);
	        if(flag) return b;
	        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
	        for(j=bj.length-1;j!==-1;--j) {
	            J = bj[j];
	            Xj[N] = J;
	            Xv[N] = b[J];
	            b[J] = 0;
	            ++N;
	        }
	        Xi[i+1] = N;
	    }
	    return [Xi,Xj,Xv];
	}

	numeric.ccsbinop = function ccsbinop(body,setup) {
	    if(typeof setup === "undefined") setup='';
	    return Function('X','Y',
	            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
	            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
	            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
	            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
	            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
	            'var xk,yk,zk;\n'+
	            'var i,j,j0,j1,k,p=0;\n'+
	            setup+
	            'for(i=0;i<n;++i) {\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Xj[j];\n'+
	            '    x[k] = 1;\n'+
	            '    Zj[p] = k;\n'+
	            '    ++p;\n'+
	            '  }\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Yj[j];\n'+
	            '    y[k] = Yv[j];\n'+
	            '    if(x[k] === 0) {\n'+
	            '      Zj[p] = k;\n'+
	            '      ++p;\n'+
	            '    }\n'+
	            '  }\n'+
	            '  Zi[i+1] = p;\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
	            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Zj[j];\n'+
	            '    xk = x[k];\n'+
	            '    yk = y[k];\n'+
	            body+'\n'+
	            '    Zv[j] = zk;\n'+
	            '  }\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
	            '}\n'+
	            'return [Zi,Zj,Zv];'
	            );
	};

	(function() {
	    var k,A,B,C;
	    for(k in numeric.ops2) {
	        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
	        else A = 'NaN';
	        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
	        else B = 'NaN';
	        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
	        else C = 'NaN';
	        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
	        numeric['ccs'+k] = Function('X','Y',
	                'if(typeof X === "number") return '+A+';\n'+
	                'if(typeof Y === "number") return '+B+';\n'+
	                'return '+C+';\n'
	                );
	    }
	}());

	numeric.ccsScatter = function ccsScatter(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = numeric.sup(Aj)+1,m=Ai.length;
	    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
	    var counts = numeric.rep([n],0),i;
	    for(i=0;i<m;++i) counts[Aj[i]]++;
	    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
	    var ptr = Ri.slice(0),k,Aii;
	    for(i=0;i<m;++i) {
	        Aii = Aj[i];
	        k = ptr[Aii];
	        Rj[k] = Ai[i];
	        Rv[k] = Av[i];
	        ptr[Aii]=ptr[Aii]+1;
	    }
	    return [Ri,Rj,Rv];
	}

	numeric.ccsGather = function ccsGather(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = Ai.length-1,m = Aj.length;
	    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
	    var i,j,j0,j1,p;
	    p=0;
	    for(i=0;i<n;++i) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j!==j1;++j) {
	            Rj[p] = i;
	            Ri[p] = Aj[j];
	            Rv[p] = Av[j];
	            ++p;
	        }
	    }
	    return [Ri,Rj,Rv];
	}

	// The following sparse linear algebra routines are deprecated.

	numeric.sdim = function dim(A,ret,k) {
	    if(typeof ret === "undefined") { ret = []; }
	    if(typeof A !== "object") return ret;
	    if(typeof k === "undefined") { k=0; }
	    if(!(k in ret)) { ret[k] = 0; }
	    if(A.length > ret[k]) ret[k] = A.length;
	    var i;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
	    }
	    return ret;
	};

	numeric.sclone = function clone(A,k,n) {
	    if(typeof k === "undefined") { k=0; }
	    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
	    var i,ret = Array(A.length);
	    if(k === n-1) {
	        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
	        return ret;
	    }
	    for(i in A) {
	        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
	    }
	    return ret;
	}

	numeric.sdiag = function diag(d) {
	    var n = d.length,i,ret = Array(n),i1,i2,i3;
	    for(i=n-1;i>=1;i-=2) {
	        i1 = i-1;
	        ret[i] = []; ret[i][i] = d[i];
	        ret[i1] = []; ret[i1][i1] = d[i1];
	    }
	    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
	    return ret;
	}

	numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }

	numeric.stranspose = function transpose(A) {
	    var ret = [], n = A.length, i,j,Ai;
	    for(i in A) {
	        if(!(A.hasOwnProperty(i))) continue;
	        Ai = A[i];
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(typeof ret[j] !== "object") { ret[j] = []; }
	            ret[j][i] = Ai[j];
	        }
	    }
	    return ret;
	}

	numeric.sLUP = function LUP(A,tol) {
	    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
	};

	numeric.sdotMM = function dotMM(A,B) {
	    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
	    var i,j,k,accum;
	    var ret = Array(p),reti;
	    for(i=p-1;i>=0;i--) {
	        reti = [];
	        Ai = A[i];
	        for(k=r-1;k>=0;k--) {
	            accum = 0;
	            BTk = BT[k];
	            for(j in Ai) {
	                if(!(Ai.hasOwnProperty(j))) continue;
	                if(j in BTk) { accum += Ai[j]*BTk[j]; }
	            }
	            if(accum) reti[k] = accum;
	        }
	        ret[i] = reti;
	    }
	    return ret;
	}

	numeric.sdotMV = function dotMV(A,x) {
	    var p = A.length, Ai, i,j;
	    var ret = Array(p), accum;
	    for(i=p-1;i>=0;i--) {
	        Ai = A[i];
	        accum = 0;
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(x[j]) accum += Ai[j]*x[j];
	        }
	        if(accum) ret[i] = accum;
	    }
	    return ret;
	}

	numeric.sdotVM = function dotMV(x,A) {
	    var i,j,Ai,alpha;
	    var ret = [], accum;
	    for(i in x) {
	        if(!x.hasOwnProperty(i)) continue;
	        Ai = A[i];
	        alpha = x[i];
	        for(j in Ai) {
	            if(!Ai.hasOwnProperty(j)) continue;
	            if(!ret[j]) { ret[j] = 0; }
	            ret[j] += alpha*Ai[j];
	        }
	    }
	    return ret;
	}

	numeric.sdotVV = function dotVV(x,y) {
	    var i,ret=0;
	    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
	    return ret;
	}

	numeric.sdot = function dot(A,B) {
	    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
	    var k = m*1000+n;
	    switch(k) {
	    case 0: return A*B;
	    case 1001: return numeric.sdotVV(A,B);
	    case 2001: return numeric.sdotMV(A,B);
	    case 1002: return numeric.sdotVM(A,B);
	    case 2002: return numeric.sdotMM(A,B);
	    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
	    }
	}

	numeric.sscatter = function scatter(V) {
	    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
	    for(i=n-1;i>=0;--i) {
	        if(!V[m-1][i]) continue;
	        Aj = A;
	        for(j=0;j<m-2;j++) {
	            Vij = V[j][i];
	            if(!Aj[Vij]) Aj[Vij] = [];
	            Aj = Aj[Vij];
	        }
	        Aj[V[j][i]] = V[j+1][i];
	    }
	    return A;
	}

	numeric.sgather = function gather(A,ret,k) {
	    if(typeof ret === "undefined") ret = [];
	    if(typeof k === "undefined") k = [];
	    var n,i,Ai;
	    n = k.length;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) {
	            k[n] = parseInt(i);
	            Ai = A[i];
	            if(typeof Ai === "number") {
	                if(Ai) {
	                    if(ret.length === 0) {
	                        for(i=n+1;i>=0;--i) ret[i] = [];
	                    }
	                    for(i=n;i>=0;--i) ret[i].push(k[i]);
	                    ret[n+1].push(Ai);
	                }
	            } else gather(Ai,ret,k);
	        }
	    }
	    if(k.length>n) k.pop();
	    return ret;
	}

	// 6. Coordinate matrices
	numeric.cLU = function LU(A) {
	    var I = A[0], J = A[1], V = A[2];
	    var p = I.length, m=0, i,j,k,a,b,c;
	    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
	    m++;
	    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
	    var Ui, Uj,alpha;
	    for(k=0;k<p;k++) {
	        i = I[k];
	        j = J[k];
	        if(j<left[i]) left[i] = j;
	        if(j>right[i]) right[i] = j;
	    }
	    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
	    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
	    var countL = 0, countU = 0;
	    for(i=0;i<m;i++) {
	        U[i] = numeric.rep([right[i]-left[i]+1],0);
	        L[i] = numeric.rep([i-left[i]],0);
	        countL += i-left[i]+1;
	        countU += right[i]-i+1;
	    }
	    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
	    for(i=0;i<m-1;i++) {
	        a = i-left[i];
	        Ui = U[i];
	        for(j=i+1;left[j]<=i && j<m;j++) {
	            b = i-left[j];
	            c = right[i]-i;
	            Uj = U[j];
	            alpha = Uj[b]/Ui[a];
	            if(alpha) {
	                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
	                L[j][i-left[j]] = alpha;
	            }
	        }
	    }
	    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
	    var p,q,foo;
	    p=0; q=0;
	    for(i=0;i<m;i++) {
	        a = left[i];
	        b = right[i];
	        foo = U[i];
	        for(j=i;j<=b;j++) {
	            if(foo[j-a]) {
	                Ui[p] = i;
	                Uj[p] = j;
	                Uv[p] = foo[j-a];
	                p++;
	            }
	        }
	        foo = L[i];
	        for(j=a;j<i;j++) {
	            if(foo[j-a]) {
	                Li[q] = i;
	                Lj[q] = j;
	                Lv[q] = foo[j-a];
	                q++;
	            }
	        }
	        Li[q] = i;
	        Lj[q] = i;
	        Lv[q] = 1;
	        q++;
	    }
	    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
	};

	numeric.cLUsolve = function LUsolve(lu,b) {
	    var L = lu.L, U = lu.U, ret = numeric.clone(b);
	    var Li = L[0], Lj = L[1], Lv = L[2];
	    var Ui = U[0], Uj = U[1], Uv = U[2];
	    var p = Ui.length, q = Li.length;
	    var m = ret.length,i,j,k;
	    k = 0;
	    for(i=0;i<m;i++) {
	        while(Lj[k] < i) {
	            ret[i] -= Lv[k]*ret[Lj[k]];
	            k++;
	        }
	        k++;
	    }
	    k = p-1;
	    for(i=m-1;i>=0;i--) {
	        while(Uj[k] > i) {
	            ret[i] -= Uv[k]*ret[Uj[k]];
	            k--;
	        }
	        ret[i] /= Uv[k];
	        k--;
	    }
	    return ret;
	};

	numeric.cgrid = function grid(n,shape) {
	    if(typeof n === "number") n = [n,n];
	    var ret = numeric.rep(n,-1);
	    var i,j,count;
	    if(typeof shape !== "function") {
	        switch(shape) {
	        case 'L':
	            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
	            break;
	        default:
	            shape = function(i,j) { return true; };
	            break;
	        }
	    }
	    count=0;
	    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
	        if(shape(i,j)) {
	            ret[i][j] = count;
	            count++;
	        }
	    return ret;
	}

	numeric.cdelsq = function delsq(g) {
	    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
	    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
	    var Li = [], Lj = [], Lv = [];
	    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
	        if(g[i][j]<0) continue;
	        for(k=0;k<4;k++) {
	            p = i+dir[k][0];
	            q = j+dir[k][1];
	            if(g[p][q]<0) continue;
	            Li.push(g[i][j]);
	            Lj.push(g[p][q]);
	            Lv.push(-1);
	        }
	        Li.push(g[i][j]);
	        Lj.push(g[i][j]);
	        Lv.push(4);
	    }
	    return [Li,Lj,Lv];
	}

	numeric.cdotMV = function dotMV(A,x) {
	    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
	    N=0;
	    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
	    N++;
	    ret = numeric.rep([N],0);
	    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
	    return ret;
	}

	// 7. Splines

	numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
	numeric.Spline.prototype._at = function _at(x1,p) {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var x1,a,b,t;
	    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
	    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
	    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
	    t = (x1-x[p])/(x[p+1]-x[p]);
	    var s = t*(1-t);
	    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
	}
	numeric.Spline.prototype.at = function at(x0) {
	    if(typeof x0 === "number") {
	        var x = this.x;
	        var n = x.length;
	        var p,q,mid,floor = Math.floor,a,b,t;
	        p = 0;
	        q = n-1;
	        while(q-p>1) {
	            mid = floor((p+q)/2);
	            if(x[mid] <= x0) p = mid;
	            else q = mid;
	        }
	        return this._at(x0,p);
	    }
	    var n = x0.length, i, ret = Array(n);
	    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
	    return ret;
	}
	numeric.Spline.prototype.diff = function diff() {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var n = yl.length;
	    var i,dx,dy;
	    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
	    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
	    for(i=n-1;i!==-1;--i) {
	        dx = x[i+1]-x[i];
	        dy = sub(yr[i+1],yl[i]);
	        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
	        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
	    }
	    return new numeric.Spline(x,zl,zr,pl,pr);
	}
	numeric.Spline.prototype.roots = function roots() {
	    function sqr(x) { return x*x; }
	    function heval(y0,y1,k0,k1,x) {
	        var A = k0*2-(y1-y0);
	        var B = -k1*2+(y1-y0);
	        var t = (x+1)*0.5;
	        var s = t*(1-t);
	        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
	    }
	    var ret = [];
	    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
	    if(typeof yl[0] === "number") {
	        yl = [yl];
	        yr = [yr];
	        kl = [kl];
	        kr = [kr];
	    }
	    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
	    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
	    var sqrt = Math.sqrt;
	    for(i=0;i!==m;++i) {
	        ai = yl[i];
	        bi = yr[i];
	        ci = kl[i];
	        di = kr[i];
	        ri = [];
	        for(j=0;j!==n;j++) {
	            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
	            dx = (x[j+1]-x[j]);
	            cx = x[j];
	            y0 = ai[j];
	            y1 = bi[j+1];
	            k0 = ci[j]/dx;
	            k1 = di[j+1]/dx;
	            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
	            A = k1+3*y0+2*k0-3*y1;
	            B = 3*(k1+k0+2*(y0-y1));
	            if(D<=0) {
	                z0 = A/B;
	                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
	                else stops = [x[j],x[j+1]];
	            } else {
	                z0 = (A-sqrt(D))/B;
	                z1 = (A+sqrt(D))/B;
	                stops = [x[j]];
	                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
	                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
	                stops.push(x[j+1]);
	            }
	            t0 = stops[0];
	            z0 = this._at(t0,j);
	            for(k=0;k<stops.length-1;k++) {
	                t1 = stops[k+1];
	                z1 = this._at(t1,j);
	                if(z0 === 0) {
	                    ri.push(t0); 
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                if(z1 === 0 || z0*z1>0) {
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                var side = 0;
	                while(1) {
	                    tm = (z0*t1-z1*t0)/(z0-z1);
	                    if(tm <= t0 || tm >= t1) { break; }
	                    zm = this._at(tm,j);
	                    if(zm*z1>0) {
	                        t1 = tm;
	                        z1 = zm;
	                        if(side === -1) z0*=0.5;
	                        side = -1;
	                    } else if(zm*z0>0) {
	                        t0 = tm;
	                        z0 = zm;
	                        if(side === 1) z1*=0.5;
	                        side = 1;
	                    } else break;
	                }
	                ri.push(tm);
	                t0 = stops[k+1];
	                z0 = this._at(t0, j);
	            }
	            if(z1 === 0) ri.push(t1);
	        }
	        ret[i] = ri;
	    }
	    if(typeof this.yl[0] === "number") return ret[0];
	    return ret;
	}
	numeric.spline = function spline(x,y,k1,kn) {
	    var n = x.length, b = [], dx = [], dy = [];
	    var i;
	    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
	    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
	    if(typeof k1 === "string" || typeof kn === "string") { 
	        k1 = kn = "periodic";
	    }
	    // Build sparse tridiagonal system
	    var T = [[],[],[]];
	    switch(typeof k1) {
	    case "undefined":
	        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
	        T[0].push(0,0);
	        T[1].push(0,1);
	        T[2].push(2/dx[0],1/dx[0]);
	        break;
	    case "string":
	        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
	        T[0].push(0,0,0);
	        T[1].push(n-2,0,1);
	        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
	        break;
	    default:
	        b[0] = k1;
	        T[0].push(0);
	        T[1].push(0);
	        T[2].push(1);
	        break;
	    }
	    for(i=1;i<n-1;i++) {
	        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
	        T[0].push(i,i,i);
	        T[1].push(i-1,i,i+1);
	        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
	    }
	    switch(typeof kn) {
	    case "undefined":
	        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
	        T[0].push(n-1,n-1);
	        T[1].push(n-2,n-1);
	        T[2].push(1/dx[n-2],2/dx[n-2]);
	        break;
	    case "string":
	        T[1][T[1].length-1] = 0;
	        break;
	    default:
	        b[n-1] = kn;
	        T[0].push(n-1);
	        T[1].push(n-1);
	        T[2].push(1);
	        break;
	    }
	    if(typeof b[0] !== "number") b = numeric.transpose(b);
	    else b = [b];
	    var k = Array(b.length);
	    if(typeof k1 === "string") {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
	            k[i][n-1] = k[i][0];
	        }
	    } else {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
	        }
	    }
	    if(typeof y[0] === "number") k = k[0];
	    else k = numeric.transpose(k);
	    return new numeric.Spline(x,y,y,k,k);
	}

	// 8. FFT
	numeric.fftpow2 = function fftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    fftpow2(xe,ye);
	    fftpow2(xo,yo);
	    j = n/2;
	    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric._ifftpow2 = function _ifftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    _ifftpow2(xe,ye);
	    _ifftpow2(xo,yo);
	    j = n/2;
	    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric.ifftpow2 = function ifftpow2(x,y) {
	    numeric._ifftpow2(x,y);
	    numeric.diveq(x,x.length);
	    numeric.diveq(y,y.length);
	}
	numeric.convpow2 = function convpow2(ax,ay,bx,by) {
	    numeric.fftpow2(ax,ay);
	    numeric.fftpow2(bx,by);
	    var i,n = ax.length,axi,bxi,ayi,byi;
	    for(i=n-1;i!==-1;--i) {
	        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
	        ax[i] = axi*bxi-ayi*byi;
	        ay[i] = axi*byi+ayi*bxi;
	    }
	    numeric.ifftpow2(ax,ay);
	}
	numeric.T.prototype.fft = function fft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X;
	}
	numeric.T.prototype.ifft = function ifft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X.div(n);
	}

	//9. Unconstrained optimization
	numeric.gradient = function gradient(f,x) {
	    var n = x.length;
	    var f0 = f(x);
	    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
	    var max = Math.max;
	    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
	    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
	    var t0,t1,t2,it=0,d1,d2,N;
	    for(i=0;i<n;i++) {
	        var h = max(1e-6*f0,1e-8);
	        while(1) {
	            ++it;
	            if(it>20) { throw new Error("Numerical gradient fails"); }
	            x0[i] = x[i]+h;
	            f1 = f(x0);
	            x0[i] = x[i]-h;
	            f2 = f(x0);
	            x0[i] = x[i];
	            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
	            J[i] = (f1-f2)/(2*h);
	            t0 = x[i]-h;
	            t1 = x[i];
	            t2 = x[i]+h;
	            d1 = (f1-f0)/h;
	            d2 = (f0-f2)/h;
	            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
	            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
	            if(errest>eps) { h/=16; }
	            else break;
	            }
	    }
	    return J;
	}

	numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
	    var grad = numeric.gradient;
	    if(typeof options === "undefined") { options = {}; }
	    if(typeof tol === "undefined") { tol = 1e-8; }
	    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
	    if(typeof maxit === "undefined") maxit = 1000;
	    x0 = numeric.clone(x0);
	    var n = x0.length;
	    var f0 = f(x0),f1,df0;
	    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	    var max = Math.max, norm2 = numeric.norm2;
	    tol = max(tol,numeric.epsilon);
	    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
	    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
	    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
	    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
	    var msg = "";
	    g0 = gradient(x0);
	    while(it<maxit) {
	        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
	        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
	        step = neg(dot(H1,g0));
	        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
	        nstep = norm2(step);
	        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
	        t = 1;
	        df0 = dot(g0,step);
	        // line search
	        x1 = x0;
	        while(it < maxit) {
	            if(t*nstep < tol) { break; }
	            s = mul(step,t);
	            x1 = add(x0,s);
	            f1 = f(x1);
	            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
	                t *= 0.5;
	                ++it;
	                continue;
	            }
	            break;
	        }
	        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
	        if(it === maxit) { msg = "maxit reached during line search"; break; }
	        g1 = gradient(x1);
	        y = sub(g1,g0);
	        ys = dot(y,s);
	        Hy = dot(H1,y);
	        H1 = sub(add(H1,
	                mul(
	                        (ys+dot(y,Hy))/(ys*ys),
	                        ten(s,s)    )),
	                div(add(ten(Hy,s),ten(s,Hy)),ys));
	        x0 = x1;
	        f0 = f1;
	        g0 = g1;
	        ++it;
	    }
	    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
	}

	// 10. Ode solver (Dormand-Prince)
	numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
	    this.x = x;
	    this.y = y;
	    this.f = f;
	    this.ymid = ymid;
	    this.iterations = iterations;
	    this.events = events;
	    this.message = msg;
	}
	numeric.Dopri.prototype._at = function _at(xi,j) {
	    function sqr(x) { return x*x; }
	    var sol = this;
	    var xs = sol.x;
	    var ys = sol.y;
	    var k1 = sol.f;
	    var ymid = sol.ymid;
	    var n = xs.length;
	    var x0,x1,xh,y0,y1,yh,xi;
	    var floor = Math.floor,h;
	    var c = 0.5;
	    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
	    x0 = xs[j];
	    x1 = xs[j+1];
	    y0 = ys[j];
	    y1 = ys[j+1];
	    h  = x1-x0;
	    xh = x0+c*h;
	    yh = ymid[j];
	    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
	    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
	    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
	         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
	         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
	         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
	         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
	    return add(add(add(add(mul(y0,w[0]),
	                           mul(yh,w[1])),
	                           mul(y1,w[2])),
	                           mul( p,w[3])),
	                           mul( q,w[4]));
	}
	numeric.Dopri.prototype.at = function at(x) {
	    var i,j,k,floor = Math.floor;
	    if(typeof x !== "number") {
	        var n = x.length, ret = Array(n);
	        for(i=n-1;i!==-1;--i) {
	            ret[i] = this.at(x[i]);
	        }
	        return ret;
	    }
	    var x0 = this.x;
	    i = 0; j = x0.length-1;
	    while(j-i>1) {
	        k = floor(0.5*(i+j));
	        if(x0[k] <= x) i = k;
	        else j = k;
	    }
	    return this._at(x,i);
	}

	numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
	    if(typeof tol === "undefined") { tol = 1e-6; }
	    if(typeof maxit === "undefined") { maxit = 1000; }
	    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
	    var A2 = 1/5;
	    var A3 = [3/40,9/40];
	    var A4 = [44/45,-56/15,32/9];
	    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
	    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
	    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
	    var bm = [0.5*6025192743/30085553152,
	              0,
	              0.5*51252292925/65400821598,
	              0.5*-2691868925/45128329728,
	              0.5*187940372067/1594534317056,
	              0.5*-1776094331/19743644256,
	              0.5*11237099/235043384];
	    var c = [1/5,3/10,4/5,8/9,1,1];
	    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
	    var i = 0,er,j;
	    var h = (x1-x0)/10;
	    var it = 0;
	    var add = numeric.add, mul = numeric.mul, y1,erinf;
	    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
	    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
	    var e0, e1, ev;
	    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
	    if(typeof event === "function") e0 = event(x0,y0);
	    while(x0<x1 && it<maxit) {
	        ++it;
	        if(x0+h>x1) h = x1-x0;
	        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
	        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
	        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
	        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
	        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
	        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
	        k7 = f(x0+h,y1);
	        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
	        if(typeof er === "number") erinf = abs(er);
	        else erinf = norminf(er);
	        if(erinf > tol) { // reject
	            h = 0.2*h*pow(tol/erinf,0.25);
	            if(x0+h === x0) {
	                ret.msg = "Step size became too small";
	                break;
	            }
	            continue;
	        }
	        ymid[i] = add(add(add(add(add(add(y0,
	                mul(k1[i],h*bm[0])),
	                mul(k3   ,h*bm[2])),
	                mul(k4   ,h*bm[3])),
	                mul(k5   ,h*bm[4])),
	                mul(k6   ,h*bm[5])),
	                mul(k7   ,h*bm[6]));
	        ++i;
	        xs[i] = x0+h;
	        ys[i] = y1;
	        k1[i] = k7;
	        if(typeof event === "function") {
	            var yi,xl = x0,xr = x0+0.5*h,xi;
	            e1 = event(xr,ymid[i-1]);
	            ev = and(lt(e0,0),lt(0,e1));
	            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
	            if(any(ev)) {
	                var xc, yc, en,ei;
	                var side=0, sl = 1.0, sr = 1.0;
	                while(1) {
	                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
	                    else {
	                        xi = xr;
	                        for(j=e0.length-1;j!==-1;--j) {
	                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
	                        }
	                    }
	                    if(xi <= xl || xi >= xr) break;
	                    yi = ret._at(xi, i-1);
	                    ei = event(xi,yi);
	                    en = and(lt(e0,0),lt(0,ei));
	                    if(any(en)) {
	                        xr = xi;
	                        e1 = ei;
	                        ev = en;
	                        sr = 1.0;
	                        if(side === -1) sl *= 0.5;
	                        else sl = 1.0;
	                        side = -1;
	                    } else {
	                        xl = xi;
	                        e0 = ei;
	                        sl = 1.0;
	                        if(side === 1) sr *= 0.5;
	                        else sr = 1.0;
	                        side = 1;
	                    }
	                }
	                y1 = ret._at(0.5*(x0+xi),i-1);
	                ret.f[i] = f(xi,yi);
	                ret.x[i] = xi;
	                ret.y[i] = yi;
	                ret.ymid[i-1] = y1;
	                ret.events = ev;
	                ret.iterations = it;
	                return ret;
	            }
	        }
	        x0 += h;
	        y0 = y1;
	        e0 = e1;
	        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
	    }
	    ret.iterations = it;
	    return ret;
	}

	// 11. Ax = b
	numeric.LU = function(A, fast) {
	  fast = fast || false;

	  var abs = Math.abs;
	  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
	  var max;
	  var n = A.length, n1 = n-1;
	  var P = new Array(n);
	  if(!fast) A = numeric.clone(A);

	  for (k = 0; k < n; ++k) {
	    Pk = k;
	    Ak = A[k];
	    max = abs(Ak[k]);
	    for (j = k + 1; j < n; ++j) {
	      absAjk = abs(A[j][k]);
	      if (max < absAjk) {
	        max = absAjk;
	        Pk = j;
	      }
	    }
	    P[k] = Pk;

	    if (Pk != k) {
	      A[k] = A[Pk];
	      A[Pk] = Ak;
	      Ak = A[k];
	    }

	    Akk = Ak[k];

	    for (i = k + 1; i < n; ++i) {
	      A[i][k] /= Akk;
	    }

	    for (i = k + 1; i < n; ++i) {
	      Ai = A[i];
	      for (j = k + 1; j < n1; ++j) {
	        Ai[j] -= Ai[k] * Ak[j];
	        ++j;
	        Ai[j] -= Ai[k] * Ak[j];
	      }
	      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
	    }
	  }

	  return {
	    LU: A,
	    P:  P
	  };
	}

	numeric.LUsolve = function LUsolve(LUP, b) {
	  var i, j;
	  var LU = LUP.LU;
	  var n   = LU.length;
	  var x = numeric.clone(b);
	  var P   = LUP.P;
	  var Pi, LUi, LUii, tmp;

	  for (i=n-1;i!==-1;--i) x[i] = b[i];
	  for (i = 0; i < n; ++i) {
	    Pi = P[i];
	    if (P[i] !== i) {
	      tmp = x[i];
	      x[i] = x[Pi];
	      x[Pi] = tmp;
	    }

	    LUi = LU[i];
	    for (j = 0; j < i; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	  }

	  for (i = n - 1; i >= 0; --i) {
	    LUi = LU[i];
	    for (j = i + 1; j < n; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }

	    x[i] /= LUi[i];
	  }

	  return x;
	}

	numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }

	// 12. Linear programming
	numeric.echelonize = function echelonize(A) {
	    var s = numeric.dim(A), m = s[0], n = s[1];
	    var I = numeric.identity(m);
	    var P = Array(m);
	    var i,j,k,l,Ai,Ii,Z,a;
	    var abs = Math.abs;
	    var diveq = numeric.diveq;
	    A = numeric.clone(A);
	    for(i=0;i<m;++i) {
	        k = 0;
	        Ai = A[i];
	        Ii = I[i];
	        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
	        P[i] = k;
	        diveq(Ii,Ai[k]);
	        diveq(Ai,Ai[k]);
	        for(j=0;j<m;++j) if(j!==i) {
	            Z = A[j]; a = Z[k];
	            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
	            Z = I[j];
	            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
	        }
	    }
	    return {I:I, A:A, P:P};
	}

	numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var m = c.length, n = b.length,y;
	    var unbounded = false, cb,i0=0;
	    var alpha = 1.0;
	    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
	    var muleq = numeric.muleq;
	    var norm = numeric.norminf, any = numeric.any,min = Math.min;
	    var all = numeric.all, gt = numeric.gt;
	    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
	    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
	    var dotcc = dot(c,c);
	    var g;
	    for(count=i0;count<maxit;++count) {
	        var i,j,d;
	        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
	        var A1 = transpose(A0);
	        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
	        alpha = 0.25*abs(dotcc/dot(c,p));
	        var a1 = 100*sqrt(dotcc/dot(p,p));
	        if(!isFinite(alpha) || alpha>a1) alpha = a1;
	        g = add(c,mul(alpha,p));
	        H = dot(A1,A0);
	        for(i=m-1;i!==-1;--i) H[i][i] += 1;
	        d = solve(H,div(g,alpha),true);
	        var t0 = div(z,dot(A,d));
	        var t = 1.0;
	        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
	        y = sub(x,mul(d,t));
	        z = sub(b,dot(A,y));
	        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
	        x = y;
	        if(alpha<tol) return { solution: y, message: "", iterations: count };
	        if(flag) {
	            var s = dot(c,g), Ag = dot(A,g);
	            unbounded = true;
	            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
	        } else {
	            if(x[m-1]>=0) unbounded = false;
	            else unbounded = true;
	        }
	        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
	    }
	    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
	}

	numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
	    var m = c.length, n = b.length,y;
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var c0 = numeric.rep([m],0).concat([1]);
	    var J = numeric.rep([n,1],-1);
	    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
	    var b0 = b;
	    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
	    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
	    var x = numeric.clone(x0.solution);
	    x.length = m;
	    var foo = numeric.inf(sub(b,dot(A,x)));
	    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
	    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
	    ret.iterations += x0.iterations;
	    return ret;
	};

	numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
	    if(typeof maxit === "undefined") maxit = 1000;
	    if(typeof tol === "undefined") tol = numeric.epsilon;
	    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
	    var m = Aeq.length, n = Aeq[0].length, o = A.length;
	    var B = numeric.echelonize(Aeq);
	    var flags = numeric.rep([n],0);
	    var P = B.P;
	    var Q = [];
	    var i;
	    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
	    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
	    var g = numeric.getRange;
	    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
	    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
	    var A3 = dot(A1,B.I);
	    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
	    var c1 = Array(P.length), c2 = Array(Q.length);
	    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
	    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
	    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
	    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
	    var x2 = S.solution;
	    if(x2!==x2) return S;
	    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
	    var x = Array(c.length);
	    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
	    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
	    return { solution: x, message:S.message, iterations: S.iterations };
	}

	numeric.MPStoLP = function MPStoLP(MPS) {
	    if(MPS instanceof String) { MPS.split('\n'); }
	    var state = 0;
	    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
	    var n = MPS.length;
	    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
	    var name;
	    var c = [], A = [], b = [];
	    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
	    for(i=0;i<n;++i) {
	        z = MPS[i];
	        var w0 = z.match(/\S*/g);
	        var w = [];
	        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
	        if(w.length === 0) continue;
	        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
	        if(j<states.length) {
	            state = j;
	            if(j===1) { name = w[1]; }
	            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
	            continue;
	        }
	        switch(state) {
	        case 0: case 1: err('Unexpected line');
	        case 2: 
	            switch(w[0]) {
	            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
	            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
	            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
	            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
	            default: err('Parse error '+numeric.prettyPrint(w));
	            }
	            break;
	        case 3:
	            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
	            var p = vars[w[0]];
	            for(j=1;j<w.length;j+=2) {
	                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
	                var q = rows[w[j]];
	                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
	            }
	            break;
	        case 4:
	            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
	            break;
	        case 5: /*FIXME*/ break;
	        case 6: err('Internal error');
	        }
	    }
	    err('Reached end of file without ENDATA');
	}
	// seedrandom.js version 2.0.
	// Author: David Bau 4/2/2011
	//
	// Defines a method Math.seedrandom() that, when called, substitutes
	// an explicitly seeded RC4-based algorithm for Math.random().  Also
	// supports automatic seeding from local or network sources of entropy.
	//
	// Usage:
	//
	//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
	//
	//   Math.seedrandom('yipee'); Sets Math.random to a function that is
	//                             initialized using the given explicit seed.
	//
	//   Math.seedrandom();        Sets Math.random to a function that is
	//                             seeded using the current time, dom state,
	//                             and other accumulated local entropy.
	//                             The generated seed string is returned.
	//
	//   Math.seedrandom('yowza', true);
	//                             Seeds using the given explicit seed mixed
	//                             together with accumulated entropy.
	//
	//   <script src="http://bit.ly/srandom-512"></script>
	//                             Seeds using physical random bits downloaded
	//                             from random.org.
	//
	//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
	//   </script>                 Seeds using urandom bits from call.jsonlib.com,
	//                             which is faster than random.org.
	//
	// Examples:
	//
	//   Math.seedrandom("hello");            // Use "hello" as the seed.
	//   document.write(Math.random());       // Always 0.5463663768140734
	//   document.write(Math.random());       // Always 0.43973793770592234
	//   var rng1 = Math.random;              // Remember the current prng.
	//
	//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
	//   document.write(Math.random());       // Pretty much unpredictable.
	//
	//   Math.random = rng1;                  // Continue "hello" prng sequence.
	//   document.write(Math.random());       // Always 0.554769432473455
	//
	//   Math.seedrandom(autoseed);           // Restart at the previous seed.
	//   document.write(Math.random());       // Repeat the 'unpredictable' value.
	//
	// Notes:
	//
	// Each time seedrandom('arg') is called, entropy from the passed seed
	// is accumulated in a pool to help generate future seeds for the
	// zero-argument form of Math.seedrandom, so entropy can be injected over
	// time by calling seedrandom with explicit data repeatedly.
	//
	// On speed - This javascript implementation of Math.random() is about
	// 3-10x slower than the built-in Math.random() because it is not native
	// code, but this is typically fast enough anyway.  Seeding is more expensive,
	// especially if you use auto-seeding.  Some details (timings on Chrome 4):
	//
	// Our Math.random()            - avg less than 0.002 milliseconds per call
	// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
	// seedrandom('explicit', true) - avg less than 2 milliseconds per call
	// seedrandom()                 - avg about 38 milliseconds per call
	//
	// LICENSE (BSD):
	//
	// Copyright 2010 David Bau, all rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are met:
	// 
	//   1. Redistributions of source code must retain the above copyright
	//      notice, this list of conditions and the following disclaimer.
	//
	//   2. Redistributions in binary form must reproduce the above copyright
	//      notice, this list of conditions and the following disclaimer in the
	//      documentation and/or other materials provided with the distribution.
	// 
	//   3. Neither the name of this module nor the names of its contributors may
	//      be used to endorse or promote products derived from this software
	//      without specific prior written permission.
	// 
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	/**
	 * All code is in an anonymous closure to keep the global namespace clean.
	 *
	 * @param {number=} overflow 
	 * @param {number=} startdenom
	 */

	// Patched by Seb so that seedrandom.js does not pollute the Math object.
	// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
	// slower.
	numeric.seedrandom = { pow:Math.pow, random:Math.random };

	(function (pool, math, width, chunks, significance, overflow, startdenom) {


	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	math['seedrandom'] = function seedrandom(seed, use_entropy) {
	  var key = [];
	  var arc4;

	  // Flatten the seed string or build one from local entropy if needed.
	  seed = mixkey(flatten(
	    use_entropy ? [seed, pool] :
	    arguments.length ? seed :
	    [new Date().getTime(), pool, window], 3), key);

	  // Use the seed to initialize an ARC4 generator.
	  arc4 = new ARC4(key);

	  // Mix the randomness into accumulated entropy.
	  mixkey(arc4.S, pool);

	  // Override Math.random

	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.

	  math['random'] = function random() {  // Closure to return a random double:
	    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
	    var d = startdenom;                 //   and denominator d = 2 ^ 48.
	    var x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };

	  // Return the seed that was used
	  return seed;
	};

	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	/** @constructor */
	function ARC4(key) {
	  var t, u, me = this, keylen = key.length;
	  var i = 0, j = me.i = me.j = me.m = 0;
	  me.S = [];
	  me.c = [];

	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }

	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) { me.S[i] = i++; }
	  for (i = 0; i < width; i++) {
	    t = me.S[i];
	    j = lowbits(j + t + key[i % keylen]);
	    u = me.S[j];
	    me.S[i] = u;
	    me.S[j] = t;
	  }

	  // The "g" method returns the next (count) outputs as one number.
	  me.g = function getnext(count) {
	    var s = me.S;
	    var i = lowbits(me.i + 1); var t = s[i];
	    var j = lowbits(me.j + t); var u = s[j];
	    s[i] = u;
	    s[j] = t;
	    var r = s[lowbits(t + u)];
	    while (--count) {
	      i = lowbits(i + 1); t = s[i];
	      j = lowbits(j + t); u = s[j];
	      s[i] = u;
	      s[j] = t;
	      r = r * width + s[lowbits(t + u)];
	    }
	    me.i = i;
	    me.j = j;
	    return r;
	  };
	  // For robust unpredictability discard an initial batch of values.
	  // See http://www.rsa.com/rsalabs/node.asp?id=2009
	  me.g(width);
	}

	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	/** @param {Object=} result 
	  * @param {string=} prop
	  * @param {string=} typ */
	function flatten(obj, depth, result, prop, typ) {
	  result = [];
	  typ = typeof(obj);
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
	        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	      }
	    }
	  }
	  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
	}

	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	/** @param {number=} smear 
	  * @param {number=} j */
	function mixkey(seed, key, smear, j) {
	  seed += '';                         // Ensure the seed is a string
	  smear = 0;
	  for (j = 0; j < seed.length; j++) {
	    key[lowbits(j)] =
	      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
	  }
	  seed = '';
	  for (j in key) { seed += String.fromCharCode(key[j]); }
	  return seed;
	}

	//
	// lowbits()
	// A quick "n mod width" for width a power of 2.
	//
	function lowbits(n) { return n & (width - 1); }

	//
	// The following constants are related to IEEE 754 limits.
	//
	startdenom = math.pow(width, chunks);
	significance = math.pow(2, significance);
	overflow = significance * 2;

	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to intefere with determinstic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);

	// End anonymous scope, and pass initial values.
	}(
	  [],   // pool: entropy pool starts empty
	  numeric.seedrandom, // math: package containing random, pow, and seedrandom
	  256,  // width: each RC4 output is 0 <= x < 256
	  6,    // chunks: at least six RC4 outputs for each double
	  52    // significance: there are 52 significant digits in a double
	  ));
	/* This file is a slightly modified version of quadprog.js from Alberto Santini.
	 * It has been slightly modified by Sébastien Loisel to make sure that it handles
	 * 0-based Arrays instead of 1-based Arrays.
	 * License is in resources/LICENSE.quadprog */
	(function(exports) {

	function base0to1(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
	    return ret;
	}
	function base1to0(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
	    return ret;
	}

	function dpori(a, lda, n) {
	    var i, j, k, kp1, t;

	    for (k = 1; k <= n; k = k + 1) {
	        a[k][k] = 1 / a[k][k];
	        t = -a[k][k];
	        //~ dscal(k - 1, t, a[1][k], 1);
	        for (i = 1; i < k; i = i + 1) {
	            a[i][k] = t * a[i][k];
	        }

	        kp1 = k + 1;
	        if (n < kp1) {
	            break;
	        }
	        for (j = kp1; j <= n; j = j + 1) {
	            t = a[k][j];
	            a[k][j] = 0;
	            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
	            for (i = 1; i <= k; i = i + 1) {
	                a[i][j] = a[i][j] + (t * a[i][k]);
	            }
	        }
	    }

	}

	function dposl(a, lda, n, b) {
	    var i, k, kb, t;

	    for (k = 1; k <= n; k = k + 1) {
	        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
	        t = 0;
	        for (i = 1; i < k; i = i + 1) {
	            t = t + (a[i][k] * b[i]);
	        }

	        b[k] = (b[k] - t) / a[k][k];
	    }

	    for (kb = 1; kb <= n; kb = kb + 1) {
	        k = n + 1 - kb;
	        b[k] = b[k] / a[k][k];
	        t = -b[k];
	        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
	        for (i = 1; i < k; i = i + 1) {
	            b[i] = b[i] + (t * a[i][k]);
	        }
	    }
	}

	function dpofa(a, lda, n, info) {
	    var i, j, jm1, k, t, s;

	    for (j = 1; j <= n; j = j + 1) {
	        info[1] = j;
	        s = 0;
	        jm1 = j - 1;
	        if (jm1 < 1) {
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        } else {
	            for (k = 1; k <= jm1; k = k + 1) {
	                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
	                t = a[k][j];
	                for (i = 1; i < k; i = i + 1) {
	                    t = t - (a[i][j] * a[i][k]);
	                }
	                t = t / a[k][k];
	                a[k][j] = t;
	                s = s + t * t;
	            }
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        }
	        info[1] = 0;
	    }
	}

	function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
	    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {

	    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
	        temp, sum, t1, tt, gc, gs, nu,
	        t1inf, t2min,
	        vsmall, tmpa, tmpb,
	        go;

	    r = Math.min(n, q);
	    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

	    vsmall = 1.0e-60;
	    do {
	        vsmall = vsmall + vsmall;
	        tmpa = 1 + 0.1 * vsmall;
	        tmpb = 1 + 0.2 * vsmall;
	    } while (tmpa <= 1 || tmpb <= 1);

	    for (i = 1; i <= n; i = i + 1) {
	        work[i] = dvec[i];
	    }
	    for (i = n + 1; i <= l; i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }

	    info = [];

	    if (ierr[1] === 0) {
	        dpofa(dmat, fddmat, n, info);
	        if (info[1] !== 0) {
	            ierr[1] = 2;
	            return;
	        }
	        dposl(dmat, fddmat, n, dvec);
	        dpori(dmat, fddmat, n);
	    } else {
	        for (j = 1; j <= n; j = j + 1) {
	            sol[j] = 0;
	            for (i = 1; i <= j; i = i + 1) {
	                sol[j] = sol[j] + dmat[i][j] * dvec[i];
	            }
	        }
	        for (j = 1; j <= n; j = j + 1) {
	            dvec[j] = 0;
	            for (i = j; i <= n; i = i + 1) {
	                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
	            }
	        }
	    }

	    crval[1] = 0;
	    for (j = 1; j <= n; j = j + 1) {
	        sol[j] = dvec[j];
	        crval[1] = crval[1] + work[j] * sol[j];
	        work[j] = 0;
	        for (i = j + 1; i <= n; i = i + 1) {
	            dmat[i][j] = 0;
	        }
	    }
	    crval[1] = -crval[1] / 2;
	    ierr[1] = 0;

	    iwzv = n;
	    iwrv = iwzv + n;
	    iwuv = iwrv + r;
	    iwrm = iwuv + r + 1;
	    iwsv = iwrm + (r * (r + 1)) / 2;
	    iwnbv = iwsv + q;

	    for (i = 1; i <= q; i = i + 1) {
	        sum = 0;
	        for (j = 1; j <= n; j = j + 1) {
	            sum = sum + amat[j][i] * amat[j][i];
	        }
	        work[iwnbv + i] = Math.sqrt(sum);
	    }
	    nact = 0;
	    iter[1] = 0;
	    iter[2] = 0;

	    function fn_goto_50() {
	        iter[1] = iter[1] + 1;

	        l = iwsv;
	        for (i = 1; i <= q; i = i + 1) {
	            l = l + 1;
	            sum = -bvec[i];
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + amat[j][i] * sol[j];
	            }
	            if (Math.abs(sum) < vsmall) {
	                sum = 0;
	            }
	            if (i > meq) {
	                work[l] = sum;
	            } else {
	                work[l] = -Math.abs(sum);
	                if (sum > 0) {
	                    for (j = 1; j <= n; j = j + 1) {
	                        amat[j][i] = -amat[j][i];
	                    }
	                    bvec[i] = -bvec[i];
	                }
	            }
	        }

	        for (i = 1; i <= nact; i = i + 1) {
	            work[iwsv + iact[i]] = 0;
	        }

	        nvl = 0;
	        temp = 0;
	        for (i = 1; i <= q; i = i + 1) {
	            if (work[iwsv + i] < temp * work[iwnbv + i]) {
	                nvl = i;
	                temp = work[iwsv + i] / work[iwnbv + i];
	            }
	        }
	        if (nvl === 0) {
	            return 999;
	        }

	        return 0;
	    }

	    function fn_goto_55() {
	        for (i = 1; i <= n; i = i + 1) {
	            sum = 0;
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + dmat[j][i] * amat[j][nvl];
	            }
	            work[i] = sum;
	        }

	        l1 = iwzv;
	        for (i = 1; i <= n; i = i + 1) {
	            work[l1 + i] = 0;
	        }
	        for (j = nact + 1; j <= n; j = j + 1) {
	            for (i = 1; i <= n; i = i + 1) {
	                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
	            }
	        }

	        t1inf = true;
	        for (i = nact; i >= 1; i = i - 1) {
	            sum = work[i];
	            l = iwrm + (i * (i + 3)) / 2;
	            l1 = l - i;
	            for (j = i + 1; j <= nact; j = j + 1) {
	                sum = sum - work[l] * work[iwrv + j];
	                l = l + j;
	            }
	            sum = sum / work[l1];
	            work[iwrv + i] = sum;
	            if (iact[i] < meq) {
	                // continue;
	                break;
	            }
	            if (sum < 0) {
	                // continue;
	                break;
	            }
	            t1inf = false;
	            it1 = i;
	        }

	        if (!t1inf) {
	            t1 = work[iwuv + it1] / work[iwrv + it1];
	            for (i = 1; i <= nact; i = i + 1) {
	                if (iact[i] < meq) {
	                    // continue;
	                    break;
	                }
	                if (work[iwrv + i] < 0) {
	                    // continue;
	                    break;
	                }
	                temp = work[iwuv + i] / work[iwrv + i];
	                if (temp < t1) {
	                    t1 = temp;
	                    it1 = i;
	                }
	            }
	        }

	        sum = 0;
	        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
	            sum = sum + work[i] * work[i];
	        }
	        if (Math.abs(sum) <= vsmall) {
	            if (t1inf) {
	                ierr[1] = 1;
	                // GOTO 999
	                return 999;
	            } else {
	                for (i = 1; i <= nact; i = i + 1) {
	                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
	                }
	                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
	                // GOTO 700
	                return 700;
	            }
	        } else {
	            sum = 0;
	            for (i = 1; i <= n; i = i + 1) {
	                sum = sum + work[iwzv + i] * amat[i][nvl];
	            }
	            tt = -work[iwsv + nvl] / sum;
	            t2min = true;
	            if (!t1inf) {
	                if (t1 < tt) {
	                    tt = t1;
	                    t2min = false;
	                }
	            }

	            for (i = 1; i <= n; i = i + 1) {
	                sol[i] = sol[i] + tt * work[iwzv + i];
	                if (Math.abs(sol[i]) < vsmall) {
	                    sol[i] = 0;
	                }
	            }

	            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
	            for (i = 1; i <= nact; i = i + 1) {
	                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
	            }
	            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

	            if (t2min) {
	                nact = nact + 1;
	                iact[nact] = nvl;

	                l = iwrm + ((nact - 1) * nact) / 2 + 1;
	                for (i = 1; i <= nact - 1; i = i + 1) {
	                    work[l] = work[i];
	                    l = l + 1;
	                }

	                if (nact === n) {
	                    work[l] = work[n];
	                } else {
	                    for (i = n; i >= nact + 1; i = i - 1) {
	                        if (work[i] === 0) {
	                            // continue;
	                            break;
	                        }
	                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        if (work[i - 1] >= 0) {
	                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        } else {
	                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        }
	                        gc = work[i - 1] / temp;
	                        gs = work[i] / temp;

	                        if (gc === 1) {
	                            // continue;
	                            break;
	                        }
	                        if (gc === 0) {
	                            work[i - 1] = gs * temp;
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = dmat[j][i - 1];
	                                dmat[j][i - 1] = dmat[j][i];
	                                dmat[j][i] = temp;
	                            }
	                        } else {
	                            work[i - 1] = temp;
	                            nu = gs / (1 + gc);
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
	                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
	                                dmat[j][i - 1] = temp;

	                            }
	                        }
	                    }
	                    work[l] = work[nact];
	                }
	            } else {
	                sum = -bvec[nvl];
	                for (j = 1; j <= n; j = j + 1) {
	                    sum = sum + sol[j] * amat[j][nvl];
	                }
	                if (nvl > meq) {
	                    work[iwsv + nvl] = sum;
	                } else {
	                    work[iwsv + nvl] = -Math.abs(sum);
	                    if (sum > 0) {
	                        for (j = 1; j <= n; j = j + 1) {
	                            amat[j][nvl] = -amat[j][nvl];
	                        }
	                        bvec[nvl] = -bvec[nvl];
	                    }
	                }
	                // GOTO 700
	                return 700;
	            }
	        }

	        return 0;
	    }

	    function fn_goto_797() {
	        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
	        l1 = l + it1;
	        if (work[l1] === 0) {
	            // GOTO 798
	            return 798;
	        }
	        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        if (work[l1 - 1] >= 0) {
	            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        } else {
	            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        }
	        gc = work[l1 - 1] / temp;
	        gs = work[l1] / temp;

	        if (gc === 1) {
	            // GOTO 798
	            return 798;
	        }
	        if (gc === 0) {
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = work[l1 - 1];
	                work[l1 - 1] = work[l1];
	                work[l1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = dmat[i][it1];
	                dmat[i][it1] = dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = temp;
	            }
	        } else {
	            nu = gs / (1 + gc);
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = gc * work[l1 - 1] + gs * work[l1];
	                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
	                work[l1 - 1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
	                dmat[i][it1] = temp;
	            }
	        }

	        return 0;
	    }

	    function fn_goto_798() {
	        l1 = l - it1;
	        for (i = 1; i <= it1; i = i + 1) {
	            work[l1] = work[l];
	            l = l + 1;
	            l1 = l1 + 1;
	        }

	        work[iwuv + it1] = work[iwuv + it1 + 1];
	        iact[it1] = iact[it1 + 1];
	        it1 = it1 + 1;
	        if (it1 < nact) {
	            // GOTO 797
	            return 797;
	        }

	        return 0;
	    }

	    function fn_goto_799() {
	        work[iwuv + nact] = work[iwuv + nact + 1];
	        work[iwuv + nact + 1] = 0;
	        iact[nact] = 0;
	        nact = nact - 1;
	        iter[2] = iter[2] + 1;

	        return 0;
	    }

	    go = 0;
	    while (true) {
	        go = fn_goto_50();
	        if (go === 999) {
	            return;
	        }
	        while (true) {
	            go = fn_goto_55();
	            if (go === 0) {
	                break;
	            }
	            if (go === 999) {
	                return;
	            }
	            if (go === 700) {
	                if (it1 === nact) {
	                    fn_goto_799();
	                } else {
	                    while (true) {
	                        fn_goto_797();
	                        go = fn_goto_798();
	                        if (go !== 797) {
	                            break;
	                        }
	                    }
	                    fn_goto_799();
	                }
	            }
	        }
	    }

	}

	function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
	    Dmat = base0to1(Dmat);
	    dvec = base0to1(dvec);
	    Amat = base0to1(Amat);
	    var i, n, q,
	        nact, r,
	        crval = [], iact = [], sol = [], work = [], iter = [],
	        message;

	    meq = meq || 0;
	    factorized = factorized ? base0to1(factorized) : [undefined, 0];
	    bvec = bvec ? base0to1(bvec) : [];

	    // In Fortran the array index starts from 1
	    n = Dmat.length - 1;
	    q = Amat[1].length - 1;

	    if (!bvec) {
	        for (i = 1; i <= q; i = i + 1) {
	            bvec[i] = 0;
	        }
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	    nact = 0;
	    r = Math.min(n, q);
	    for (i = 1; i <= n; i = i + 1) {
	        sol[i] = 0;
	    }
	    crval[1] = 0;
	    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= 2; i = i + 1) {
	        iter[i] = 0;
	    }

	    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
	        bvec, n, q, meq, iact, nact, iter, work, factorized);

	    message = "";
	    if (factorized[1] === 1) {
	        message = "constraints are inconsistent, no solution!";
	    }
	    if (factorized[1] === 2) {
	        message = "matrix D in quadratic function is not positive definite!";
	    }

	    return {
	        solution: base1to0(sol),
	        value: base1to0(crval),
	        unconstrained_solution: base1to0(dvec),
	        iterations: base1to0(iter),
	        iact: base1to0(iact),
	        message: message
	    };
	}
	exports.solveQP = solveQP;
	}(numeric));
	/*
	Shanti Rao sent me this routine by private email. I had to modify it
	slightly to work on Arrays instead of using a Matrix object.
	It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
	*/

	numeric.svd= function svd(A) {
	    var temp;
	//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
		var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
		var tolerance= 1.e-64/prec;
		var itmax= 50;
		var c=0;
		var i=0;
		var j=0;
		var k=0;
		var l=0;
		
		var u= numeric.clone(A);
		var m= u.length;
		
		var n= u[0].length;
		
		if (m < n) throw "Need more rows than columns"
		
		var e = new Array(n);
		var q = new Array(n);
		for (i=0; i<n; i++) e[i] = q[i] = 0.0;
		var v = numeric.rep([n,n],0);
	//	v.zero();
		
	 	function pythag(a,b)
	 	{
			a = Math.abs(a)
			b = Math.abs(b)
			if (a > b)
				return a*Math.sqrt(1.0+(b*b/a/a))
			else if (b == 0.0) 
				return a
			return b*Math.sqrt(1.0+(a*a/b/b))
		}

		//Householder's reduction to bidiagonal form

		var f= 0.0;
		var g= 0.0;
		var h= 0.0;
		var x= 0.0;
		var y= 0.0;
		var z= 0.0;
		var s= 0.0;
		
		for (i=0; i < n; i++)
		{	
			e[i]= g;
			s= 0.0;
			l= i+1;
			for (j=i; j < m; j++) 
				s += (u[j][i]*u[j][i]);
			if (s <= tolerance)
				g= 0.0;
			else
			{	
				f= u[i][i];
				g= Math.sqrt(s);
				if (f >= 0.0) g= -g;
				h= f*g-s
				u[i][i]=f-g;
				for (j=l; j < n; j++)
				{
					s= 0.0
					for (k=i; k < m; k++) 
						s += u[k][i]*u[k][j]
					f= s/h
					for (k=i; k < m; k++) 
						u[k][j]+=f*u[k][i]
				}
			}
			q[i]= g
			s= 0.0
			for (j=l; j < n; j++) 
				s= s + u[i][j]*u[i][j]
			if (s <= tolerance)
				g= 0.0
			else
			{	
				f= u[i][i+1]
				g= Math.sqrt(s)
				if (f >= 0.0) g= -g
				h= f*g - s
				u[i][i+1] = f-g;
				for (j=l; j < n; j++) e[j]= u[i][j]/h
				for (j=l; j < m; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += (u[j][k]*u[i][k])
					for (k=l; k < n; k++) 
						u[j][k]+=s*e[k]
				}	
			}
			y= Math.abs(q[i])+Math.abs(e[i])
			if (y>x) 
				x=y
		}
		
		// accumulation of right hand gtransformations
		for (i=n-1; i != -1; i+= -1)
		{	
			if (g != 0.0)
			{
			 	h= g*u[i][i+1]
				for (j=l; j < n; j++) 
					v[j][i]=u[i][j]/h
				for (j=l; j < n; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += u[i][k]*v[k][j]
					for (k=l; k < n; k++) 
						v[k][j]+=(s*v[k][i])
				}	
			}
			for (j=l; j < n; j++)
			{
				v[i][j] = 0;
				v[j][i] = 0;
			}
			v[i][i] = 1;
			g= e[i]
			l= i
		}
		
		// accumulation of left hand transformations
		for (i=n-1; i != -1; i+= -1)
		{	
			l= i+1
			g= q[i]
			for (j=l; j < n; j++) 
				u[i][j] = 0;
			if (g != 0.0)
			{
				h= u[i][i]*g
				for (j=l; j < n; j++)
				{
					s=0.0
					for (k=l; k < m; k++) s += u[k][i]*u[k][j];
					f= s/h
					for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
				}
				for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
			}
			else
				for (j=i; j < m; j++) u[j][i] = 0;
			u[i][i] += 1;
		}
		
		// diagonalization of the bidiagonal form
		prec= prec*x
		for (k=n-1; k != -1; k+= -1)
		{
			for (var iteration=0; iteration < itmax; iteration++)
			{	// test f splitting
				var test_convergence = false
				for (l=k; l != -1; l+= -1)
				{	
					if (Math.abs(e[l]) <= prec)
					{	test_convergence= true
						break 
					}
					if (Math.abs(q[l-1]) <= prec)
						break 
				}
				if (!test_convergence)
				{	// cancellation of e[l] if l>0
					c= 0.0
					s= 1.0
					var l1= l-1
					for (i =l; i<k+1; i++)
					{	
						f= s*e[i]
						e[i]= c*e[i]
						if (Math.abs(f) <= prec)
							break
						g= q[i]
						h= pythag(f,g)
						q[i]= h
						c= g/h
						s= -f/h
						for (j=0; j < m; j++)
						{	
							y= u[j][l1]
							z= u[j][i]
							u[j][l1] =  y*c+(z*s)
							u[j][i] = -y*s+(z*c)
						} 
					}	
				}
				// test f convergence
				z= q[k]
				if (l== k)
				{	//convergence
					if (z<0.0)
					{	//q[k] is made non-negative
						q[k]= -z
						for (j=0; j < n; j++)
							v[j][k] = -v[j][k]
					}
					break  //break out of iteration loop and move on to next k value
				}
				if (iteration >= itmax-1)
					throw 'Error: no convergence.'
				// shift from bottom 2x2 minor
				x= q[l]
				y= q[k-1]
				g= e[k-1]
				h= e[k]
				f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
				g= pythag(f,1.0)
				if (f < 0.0)
					f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
				else
					f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
				// next QR transformation
				c= 1.0
				s= 1.0
				for (i=l+1; i< k+1; i++)
				{	
					g= e[i]
					y= q[i]
					h= s*g
					g= c*g
					z= pythag(f,h)
					e[i-1]= z
					c= f/z
					s= h/z
					f= x*c+g*s
					g= -x*s+g*c
					h= y*s
					y= y*c
					for (j=0; j < n; j++)
					{	
						x= v[j][i-1]
						z= v[j][i]
						v[j][i-1] = x*c+z*s
						v[j][i] = -x*s+z*c
					}
					z= pythag(f,h)
					q[i-1]= z
					c= f/z
					s= h/z
					f= c*g+s*y
					x= -s*g+c*y
					for (j=0; j < m; j++)
					{
						y= u[j][i-1]
						z= u[j][i]
						u[j][i-1] = y*c+z*s
						u[j][i] = -y*s+z*c
					}
				}
				e[l]= 0.0
				e[k]= f
				q[k]= x
			} 
		}
			
		//vt= transpose(v)
		//return (u,q,vt)
		for (i=0;i<q.length; i++) 
		  if (q[i] < prec) q[i] = 0
		  
		//sort eigenvalues	
		for (i=0; i< n; i++)
		{	 
		//writeln(q)
		 for (j=i-1; j >= 0; j--)
		 {
		  if (q[j] < q[i])
		  {
		//  writeln(i,'-',j)
		   c = q[j]
		   q[j] = q[i]
		   q[i] = c
		   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
		   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
	//	   u.swapCols(i,j)
	//	   v.swapCols(i,j)
		   i = j	   
		  }
		 }	
		}
		
		return {U:u,S:q,V:v}
	};

	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */

	(function () {

	    /************************************
	        Constants
	    ************************************/

	    var numeral,
	        VERSION = '1.5.3',
	        // internal storage for language config files
	        languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        // check for nodeJS
	        hasModule = (typeof module !== 'undefined' && module.exports);


	    /************************************
	        Constructors
	    ************************************/


	    // Numeral prototype object
	    function Numeral (number) {
	        this._value = number;
	    }

	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed (value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	            
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);

	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }

	        return output;
	    }

	    /************************************
	        Formatting
	    ************************************/

	    // determine what type of formatting we need to do
	    function formatNumeral (n, format, roundingFunction) {
	        var output;

	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) { // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) { // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) { // time
	            output = formatTime(n, format);
	        } else { // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }

	        // return string
	        return output;
	    }

	    // revert to number
	    function unformatNumeral (n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;

	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }

	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

	                    if (bytesMultiplier) {
	                        break;
	                    }
	                }

	                // do some math to create our number
	                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

	                // round if we are talking about bytes
	                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }

	    function formatCurrency (n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;

	        // check for space before or after currency
	        if (format.indexOf(' $') > -1) {
	            space = ' ';
	            format = format.replace(' $', '');
	        } else if (format.indexOf('$ ') > -1) {
	            space = ' ';
	            format = format.replace('$ ', '');
	        } else {
	            format = format.replace('$', '');
	        }

	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);

	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
	            }
	        }

	        return output;
	    }

	    function formatPercentage (n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;

	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }

	        output = formatNumber(value, format, roundingFunction);
	        
	        if (output.indexOf(')') > -1 ) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }

	        return output;
	    }

	    function formatTime (n) {
	        var hours = Math.floor(n._value/60/60),
	            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
	            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
	        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
	    }

	    function unformatTime (string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
	            // minutes
	            seconds = seconds + (Number(timeArray[1]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + (Number(timeArray[0]) * 60);
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }

	    function formatNumber (value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            abbrK = false, // force abbreviation to thousands
	            abbrM = false, // force abbreviation to millions
	            abbrB = false, // force abbreviation to billions
	            abbrT = false, // force abbreviation to trillions
	            abbrForce = false, // force abbreviation
	            bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;

	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }

	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
	                // check if abbreviation is specified
	                abbrK = format.indexOf('aK') >= 0;
	                abbrM = format.indexOf('aM') >= 0;
	                abbrB = format.indexOf('aB') >= 0;
	                abbrT = format.indexOf('aT') >= 0;
	                abbrForce = abbrK || abbrM || abbrB || abbrT;

	                // check for space before abbreviation
	                if (format.indexOf(' a') > -1) {
	                    abbr = ' ';
	                    format = format.replace(' a', '');
	                } else {
	                    format = format.replace('a', '');
	                }

	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }

	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }

	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power+1);

	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
	                        if (min > 0) {
	                            value = value / min;
	                        }
	                        break;
	                    }
	                }
	            }

	            // see if ordinal is wanted
	            if (format.indexOf('o') > -1) {
	                // check for space before
	                if (format.indexOf(' o') > -1) {
	                    ord = ' ';
	                    format = format.replace(' o', '');
	                } else {
	                    format = format.replace('o', '');
	                }

	                ord = ord + languages[currentLanguage].ordinal(value);
	            }

	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }

	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');

	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }

	                w = d.split('.')[0];

	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }

	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }

	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }

	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }

	            if (format.indexOf('.') === 0) {
	                w = '';
	            }

	            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
	        }
	    }

	    /************************************
	        Top Level Functions
	    ************************************/

	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }

	        return new Numeral(Number(input));
	    };

	    // version number
	    numeral.version = VERSION;

	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };

	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }

	        if (key && !values) {
	            if(!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }

	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }

	        return numeral;
	    };
	    
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	        
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	        
	        return languages[key];
	    };

	    numeral.language('en', {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function (number) {
	            var b = number % 10;
	            return (~~ (number % 100 / 10) === 1) ? 'th' :
	                (b === 1) ? 'st' :
	                (b === 2) ? 'nd' :
	                (b === 3) ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$'
	        }
	    });

	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof(format) === 'string' ? format : null;
	    };

	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof(format) === 'string' ? format : '0.0';
	    };

	    /************************************
	        Helpers
	    ************************************/

	    function loadLanguage(key, values) {
	        languages[key] = values;
	    }

	    /************************************
	        Floating-point helpers
	    ************************************/

	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	            
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	            
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }

	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;

	            if (1 < arguments.length) {
	                value = opt_initialValue;
	                isValueSet = true;
	            }

	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }

	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }

	            return value;
	        };
	    }

	    
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }

	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	        return mp > mn ? mp : mn;
	        }, -Infinity);
	    }        


	    /************************************
	        Numeral Prototype
	    ************************************/


	    numeral.fn = Numeral.prototype = {

	        clone : function () {
	            return numeral(this);
	        },

	        format : function (inputString, roundingFunction) {
	            return formatNumeral(this, 
	                  inputString ? inputString : defaultFormat, 
	                  (roundingFunction !== undefined) ? roundingFunction : Math.round
	              );
	        },

	        unformat : function (inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
	                return inputString; 
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
	        },

	        value : function () {
	            return this._value;
	        },

	        valueOf : function () {
	            return this._value;
	        },

	        set : function (value) {
	            this._value = Number(value);
	            return this;
	        },

	        add : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },

	        subtract : function (value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
	            return this;
	        },

	        multiply : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) * (curr * corrFactor) /
	                    (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },

	        divide : function (value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return (accum * corrFactor) / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);            
	            return this;
	        },

	        difference : function (value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }

	    };

	    /************************************
	        Exposing Numeral
	    ************************************/

	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }

	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }

	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(this);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	this.j$ = this.jStat = (function(Math, undefined) {

	// For quick reference.
	var concat = Array.prototype.concat;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	// Calculate correction for IEEE error
	// TODO: This calculation can be improved.
	function calcRdx(n, m) {
	  var val = n > m ? n : m;
	  return Math.pow(10,
	                  17 - ~~(Math.log(((val > 0) ? val : -val)) * Math.LOG10E));
	}


	var isArray = Array.isArray || function isArray(arg) {
	  return toString.call(arg) === '[object Array]';
	};


	function isFunction(arg) {
	  return toString.call(arg) === '[object Function]';
	}


	function isNumber(arg) {
	  return typeof arg === 'number' && arg === arg;
	}


	// Converts the jStat matrix to vector.
	function toVector(arr) {
	  return concat.apply([], arr);
	}


	// The one and only jStat constructor.
	function jStat() {
	  return new jStat._init(arguments);
	}


	// TODO: Remove after all references in src files have been removed.
	jStat.fn = jStat.prototype;


	// By separating the initializer from the constructor it's easier to handle
	// always returning a new instance whether "new" was used or not.
	jStat._init = function _init(args) {
	  var i;

	  // If first argument is an array, must be vector or matrix.
	  if (isArray(args[0])) {
	    // Check if matrix.
	    if (isArray(args[0][0])) {
	      // See if a mapping function was also passed.
	      if (isFunction(args[1]))
	        args[0] = jStat.map(args[0], args[1]);
	      // Iterate over each is faster than this.push.apply(this, args[0].
	      for (i = 0; i < args[0].length; i++)
	        this[i] = args[0][i];
	      this.length = args[0].length;

	    // Otherwise must be a vector.
	    } else {
	      this[0] = isFunction(args[1]) ? jStat.map(args[0], args[1]) : args[0];
	      this.length = 1;
	    }

	  // If first argument is number, assume creation of sequence.
	  } else if (isNumber(args[0])) {
	    this[0] = jStat.seq.apply(null, args);
	    this.length = 1;

	  // Handle case when jStat object is passed to jStat.
	  } else if (args[0] instanceof jStat) {
	    // Duplicate the object and pass it back.
	    return jStat(args[0].toArray());

	  // Unexpected argument value, return empty jStat object.
	  // TODO: This is strange behavior. Shouldn't this throw or some such to let
	  // the user know they had bad arguments?
	  } else {
	    this[0] = [];
	    this.length = 1;
	  }

	  return this;
	};
	jStat._init.prototype = jStat.prototype;
	jStat._init.constructor = jStat;


	// Utility functions.
	// TODO: for internal use only?
	jStat.utils = {
	  calcRdx: calcRdx,
	  isArray: isArray,
	  isFunction: isFunction,
	  isNumber: isNumber,
	  toVector: toVector
	};


	// Easily extend the jStat object.
	// TODO: is this seriously necessary?
	jStat.extend = function extend(obj) {
	  var i, j;

	  if (arguments.length === 1) {
	    for (j in obj)
	      jStat[j] = obj[j];
	    return this;
	  }

	  for (i = 1; i < arguments.length; i++) {
	    for (j in arguments[i])
	      obj[j] = arguments[i][j];
	  }

	  return obj;
	};


	// Returns the number of rows in the matrix.
	jStat.rows = function rows(arr) {
	  return arr.length || 1;
	};


	// Returns the number of columns in the matrix.
	jStat.cols = function cols(arr) {
	  return arr[0].length || 1;
	};


	// Returns the dimensions of the object { rows: i, cols: j }
	jStat.dimensions = function dimensions(arr) {
	  return {
	    rows: jStat.rows(arr),
	    cols: jStat.cols(arr)
	  };
	};


	// Returns a specified row as a vector
	jStat.row = function row(arr, index) {
	  return arr[index];
	};


	// Returns the specified column as a vector
	jStat.col = function cols(arr, index) {
	  var column = new Array(arr.length);
	  for (var i = 0; i < arr.length; i++)
	    column[i] = [arr[i][index]];
	  return column;
	};


	// Returns the diagonal of the matrix
	jStat.diag = function diag(arr) {
	  var nrow = jStat.rows(arr);
	  var res = new Array(nrow);
	  for (var row = 0; row < nrow; row++)
	    res[row] = [arr[row][row]];
	  return res;
	};


	// Returns the anti-diagonal of the matrix
	jStat.antidiag = function antidiag(arr) {
	  var nrow = jStat.rows(arr) - 1;
	  var res = new Array(nrow);
	  for (var i = 0; nrow >= 0; nrow--, i++)
	    res[i] = [arr[i][nrow]];
	  return res;
	};

	// Transpose a matrix or array.
	jStat.transpose = function transpose(arr) {
	  var obj = [];
	  var objArr, rows, cols, j, i;

	  // Make sure arr is in matrix format.
	  if (!isArray(arr[0]))
	    arr = [arr];

	  rows = arr.length;
	  cols = arr[0].length;

	  for (i = 0; i < cols; i++) {
	    objArr = new Array(rows);
	    for (j = 0; j < rows; j++)
	      objArr[j] = arr[j][i];
	    obj.push(objArr);
	  }

	  // If obj is vector, return only single array.
	  return obj.length === 1 ? obj[0] : obj;
	};


	// Map a function to an array or array of arrays.
	// "toAlter" is an internal variable.
	jStat.map = function map(arr, func, toAlter) {
	  var row, nrow, ncol, res, col;

	  if (!isArray(arr[0]))
	    arr = [arr];

	  nrow = arr.length;
	  ncol = arr[0].length;
	  res = toAlter ? arr : new Array(nrow);

	  for (row = 0; row < nrow; row++) {
	    // if the row doesn't exist, create it
	    if (!res[row])
	      res[row] = new Array(ncol);
	    for (col = 0; col < ncol; col++)
	      res[row][col] = func(arr[row][col], row, col);
	  }

	  return res.length === 1 ? res[0] : res;
	};


	// Destructively alter an array.
	jStat.alter = function alter(arr, func) {
	  return jStat.map(arr, func, true);
	};


	// Generate a rows x cols matrix according to the supplied function.
	jStat.create = function  create(rows, cols, func) {
	  var res = new Array(rows);
	  var i, j;

	  if (isFunction(cols)) {
	    func = cols;
	    cols = rows;
	  }

	  for (i = 0; i < rows; i++) {
	    res[i] = new Array(cols);
	    for (j = 0; j < cols; j++)
	      res[i][j] = func(i, j);
	  }

	  return res;
	};


	function retZero() { return 0; }


	// Generate a rows x cols matrix of zeros.
	jStat.zeros = function zeros(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retZero);
	};


	function retOne() { return 1; }


	// Generate a rows x cols matrix of ones.
	jStat.ones = function ones(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retOne);
	};


	// Generate a rows x cols matrix of uniformly random numbers.
	jStat.rand = function rand(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, Math.random);
	};


	function retIdent(i, j) { return i === j ? 1 : 0; }


	// Generate an identity matrix of size row x cols.
	jStat.identity = function identity(rows, cols) {
	  if (!isNumber(cols))
	    cols = rows;
	  return jStat.create(rows, cols, retIdent);
	};


	// Tests whether a matrix is symmetric
	jStat.symmetric = function symmetric(arr) {
	  var issymmetric = true;
	  var size = arr.length;
	  var row, col;

	  if (arr.length !== arr[0].length)
	    return false;

	  for (row = 0; row < size; row++) {
	    for (col = 0; col < size; col++)
	      if (arr[col][row] !== arr[row][col])
	        return false;
	  }

	  return true;
	};


	// Set all values to zero.
	jStat.clear = function clear(arr) {
	  return jStat.alter(arr, retZero);
	};


	// Generate sequence.
	jStat.seq = function seq(min, max, length, func) {
	  if (!isFunction(func))
	    func = false;

	  var arr = [];
	  var hival = calcRdx(min, max);
	  var step = (max * hival - min * hival) / ((length - 1) * hival);
	  var current = min;
	  var cnt;

	  // Current is assigned using a technique to compensate for IEEE error.
	  // TODO: Needs better implementation.
	  for (cnt = 0;
	       current <= max;
	       cnt++, current = (min * hival + step * hival * cnt) / hival) {
	    arr.push((func ? func(current, cnt) : current));
	  }

	  return arr;
	};


	// TODO: Go over this entire implementation. Seems a tragic waste of resources
	// doing all this work. Instead, and while ugly, use new Function() to generate
	// a custom function for each static method.

	// Quick reference.
	var jProto = jStat.prototype;

	// Default length.
	jProto.length = 0;

	// For internal use only.
	// TODO: Check if they're actually used, and if they are then rename them
	// to _*
	jProto.push = Array.prototype.push;
	jProto.sort = Array.prototype.sort;
	jProto.splice = Array.prototype.splice;
	jProto.slice = Array.prototype.slice;


	// Return a clean array.
	jProto.toArray = function toArray() {
	  return this.length > 1 ? slice.call(this) : slice.call(this)[0];
	};


	// Map a function to a matrix or vector.
	jProto.map = function map(func, toAlter) {
	  return jStat(jStat.map(this, func, toAlter));
	};


	// Destructively alter an array.
	jProto.alter = function alter(func) {
	  jStat.alter(this, func);
	  return this;
	};


	// Extend prototype with methods that have no argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(func) {
	      var self = this,
	      results;
	      // Check for callback.
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self));
	        });
	        return this;
	      }
	      results = jStat[passfunc](this);
	      return isArray(results) ? jStat(results) : results;
	    };
	  })(funcs[i]);
	})('transpose clear symmetric rows cols dimensions diag antidiag'.split(' '));


	// Extend prototype with methods that have one argument.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function(index, func) {
	      var self = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(self, jProto[passfunc].call(self, index));
	        });
	        return this;
	      }
	      return jStat(jStat[passfunc](this, index));
	    };
	  })(funcs[i]);
	})('row col'.split(' '));


	// Extend prototype with simple shortcut methods.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = new Function(
	        'return jStat(jStat.' + passfunc + '.apply(null, arguments));');
	  })(funcs[i]);
	})('create zeros ones rand identity'.split(' '));


	// Exposing jStat.
	return jStat;

	}(Math));
	(function(jStat, Math) {

	var isFunction = jStat.utils.isFunction;

	// Ascending functions for sort
	function ascNum(a, b) { return a - b; }

	function clip(arg, min, max) {
	  return Math.max(min, Math.min(arg, max));
	}


	// sum of an array
	jStat.sum = function sum(arr) {
	  var sum = 0;
	  var i = arr.length;
	  var tmp;
	  while (--i >= 0)
	    sum += arr[i];
	  return sum;
	};


	// sum squared
	jStat.sumsqrd = function sumsqrd(arr) {
	  var sum = 0;
	  var i = arr.length;
	  while (--i >= 0)
	    sum += arr[i] * arr[i];
	  return sum;
	};


	// sum of squared errors of prediction (SSE)
	jStat.sumsqerr = function sumsqerr(arr) {
	  var mean = jStat.mean(arr);
	  var sum = 0;
	  var i = arr.length;
	  var tmp;
	  while (--i >= 0) {
	    tmp = arr[i] - mean;
	    sum += tmp * tmp;
	  }
	  return sum;
	};


	// product of an array
	jStat.product = function product(arr) {
	  var prod = 1;
	  var i = arr.length;
	  while (--i >= 0)
	    prod *= arr[i];
	  return prod;
	};


	// minimum value of an array
	jStat.min = function min(arr) {
	  var low = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] < low)
	      low = arr[i];
	  return low;
	};


	// maximum value of an array
	jStat.max = function max(arr) {
	  var high = arr[0];
	  var i = 0;
	  while (++i < arr.length)
	    if (arr[i] > high)
	      high = arr[i];
	  return high;
	};


	// mean value of an array
	jStat.mean = function mean(arr) {
	  return jStat.sum(arr) / arr.length;
	};


	// mean squared error (MSE)
	jStat.meansqerr = function meansqerr(arr) {
	  return jStat.sumsqerr(arr) / arr.length;
	};


	// geometric mean of an array
	jStat.geomean = function geomean(arr) {
	  return Math.pow(jStat.product(arr), 1 / arr.length);
	};


	// median of an array
	jStat.median = function median(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  // check if array is even or odd, then return the appropriate
	  return !(arrlen & 1)
	    ? (_arr[(arrlen / 2) - 1 ] + _arr[(arrlen / 2)]) / 2
	    : _arr[(arrlen / 2) | 0 ];
	};


	// cumulative sum of an array
	jStat.cumsum = function cumsum(arr) {
	  var len = arr.length;
	  var sums = new Array(len);
	  var i;
	  sums[0] = arr[0];
	  for (i = 1; i < len; i++)
	    sums[i] = sums[i - 1] + arr[i];
	  return sums;
	};


	// successive differences of a sequence
	jStat.diff = function diff(arr) {
	  var diffs = [];
	  var arrLen = arr.length;
	  var i;
	  for (i = 1; i < arrLen; i++)
	    diffs.push(arr[i] - arr[i - 1]);
	  return diffs;
	};


	// mode of an array
	// if there are multiple modes of an array, return all of them
	// is this the appropriate way of handling it?
	jStat.mode = function mode(arr) {
	  var arrLen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  var count = 1;
	  var maxCount = 0;
	  var numMaxCount = 0;
	  var mode_arr = [];
	  var i;

	  for (i = 0; i < arrLen; i++) {
	    if (_arr[i] === _arr[i + 1]) {
	      count++;
	    } else {
	      if (count > maxCount) {
	        mode_arr = [_arr[i]];
	        maxCount = count;
	        numMaxCount = 0;
	      }
	      // are there multiple max counts
	      else if (count === maxCount) {
	        mode_arr.push(_arr[i]);
	        numMaxCount++;
	      }
	      // resetting count for new value in array
	      count = 1;
	    }
	  }

	  return numMaxCount === 0 ? mode_arr[0] : mode_arr;
	};


	// range of an array
	jStat.range = function range(arr) {
	  return jStat.max(arr) - jStat.min(arr);
	};

	// variance of an array
	// flag indicates population vs sample
	jStat.variance = function variance(arr, flag) {
	  return jStat.sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
	};


	// standard deviation of an array
	// flag indicates population vs sample
	jStat.stdev = function stdev(arr, flag) {
	  return Math.sqrt(jStat.variance(arr, flag));
	};


	// mean deviation (mean absolute deviation) of an array
	jStat.meandev = function meandev(arr) {
	  var devSum = 0;
	  var mean = jStat.mean(arr);
	  var i;
	  for (i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - mean);
	  return devSum / arr.length;
	};


	// median deviation (median absolute deviation) of an array
	jStat.meddev = function meddev(arr) {
	  var devSum = 0;
	  var median = jStat.median(arr);
	  var i;
	  for (i = arr.length - 1; i >= 0; i--)
	    devSum += Math.abs(arr[i] - median);
	  return devSum / arr.length;
	};


	// coefficient of variation
	jStat.coeffvar = function coeffvar(arr) {
	  return jStat.stdev(arr) / jStat.mean(arr);
	};


	// quartiles of an array
	jStat.quartiles = function quartiles(arr) {
	  var arrlen = arr.length;
	  var _arr = arr.slice().sort(ascNum);
	  return [
	    _arr[ Math.round((arrlen) / 4) - 1 ],
	    _arr[ Math.round((arrlen) / 2) - 1 ],
	    _arr[ Math.round((arrlen) * 3 / 4) - 1 ]
	  ];
	};


	// Arbitary quantiles of an array. Direct port of the scipy.stats
	// implementation by Pierre GF Gerard-Marchant.
	jStat.quantiles = function quantiles(arr, quantilesArray, alphap, betap) {
	  var sortedArray = arr.slice().sort(ascNum);
	  var quantileVals = [quantilesArray.length];
	  var n = arr.length;
	  var i, p, m, aleph, k, gamma;

	  if (typeof alphap === 'undefined')
	    alphap = 3 / 8;
	  if (typeof betap === 'undefined')
	    betap = 3 / 8;

	  for (i = 0; i < quantilesArray.length; i++) {
	    p = quantilesArray[i];
	    m = alphap + p * (1 - alphap - betap);
	    aleph = n * p + m;
	    k = Math.floor(clip(aleph, 1, n - 1));
	    gamma = clip(aleph - k, 0, 1);
	    quantileVals[i] = (1 - gamma) * sortedArray[k - 1] + gamma * sortedArray[k];
	  }

	  return quantileVals;
	};

	// The percentile rank of score in a given array. Returns the percentage
	// of all values in the input array that are less than (kind='strict') or
	// less or equal than (kind='weak') score. Default is weak.
	jStat.percentileOfScore = function percentileOfScore(arr, score, kind) {
	  var counter = 0;
	  var len = arr.length;
	  var strict = false;
	  var value, i;

	  if (kind === 'strict')
	    strict = true;

	  for (i = 0; i < len; i++) {
	    value = arr[i];
	    if ((strict && value < score) ||
	        (!strict && value <= score)) {
	      counter++;
	    }
	  }

	  return counter / len;
	};

	// covariance of two arrays
	jStat.covariance = function covariance(arr1, arr2) {
	  var u = jStat.mean(arr1);
	  var v = jStat.mean(arr2);
	  var arr1Len = arr1.length;
	  var sq_dev = new Array(arr1Len);
	  var i;

	  for (i = 0; i < arr1Len; i++)
	    sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);

	  return jStat.sum(sq_dev) / (arr1Len - 1);
	};


	// (pearson's) population correlation coefficient, rho
	jStat.corrcoeff = function corrcoeff(arr1, arr2) {
	  return jStat.covariance(arr1, arr2) /
	      jStat.stdev(arr1, 1) /
	      jStat.stdev(arr2, 1);
	};


	var jProto = jStat.prototype;


	// Extend jProto with method for calculating cumulative sums, as it does not
	// run again in case of true.
	// If a matrix is passed, automatically assume operation should be done on the
	// columns.
	jProto.cumsum = function(fullbool, func) {
	  var arr = [];
	  var i = 0;
	  var tmpthis = this;

	  // Assignment reassignation depending on how parameters were passed in.
	  if (isFunction(fullbool)) {
	    func = fullbool;
	    fullbool = false;
	  }

	  // Check if a callback was passed with the function.
	  if (func) {
	    setTimeout(function() {
	      func.call(tmpthis, jProto.cumsum.call(tmpthis, fullbool));
	    });
	    return this;
	  }

	  // Check if matrix and run calculations.
	  if (this.length > 1) {
	    tmpthis = fullbool === true ? this : this.transpose();
	    for (; i < tmpthis.length; i++)
	      arr[i] = jStat.cumsum(tmpthis[i]);
	    return arr;
	  }

	  return jStat.cumsum(this[0], fullbool);
	};


	// Extend jProto with methods which don't require arguments and work on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    // If a matrix is passed, automatically assume operation should be done on
	    // the columns.
	    jProto[passfunc] = function(fullbool, func) {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      // Assignment reassignation depending on how parameters were passed in.
	      if (isFunction(fullbool)) {
	        func = fullbool;
	        fullbool = false;
	      }
	      // Check if a callback was passed with the function.
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jProto[passfunc].call(tmpthis, fullbool));
	        });
	        return this;
	      }
	      // Check if matrix and run calculations.
	      if (this.length > 1) {
	        tmpthis = fullbool === true ? this : this.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = jStat[passfunc](tmpthis[i]);
	        return fullbool === true
	            ? jStat[passfunc](jStat.utils.toVector(arr))
	            : arr;
	      }
	      // Pass fullbool if only vector, not a matrix. for variance and stdev.
	      return jStat[passfunc](this[0], fullbool);
	    };
	  })(funcs[i]);
	})(('sum sumsqrd sumsqerr product min max mean meansqerr geomean median diff ' +
	    'mode range variance stdev meandev meddev coeffvar quartiles').split(' '));


	// Extend jProto with functions that take arguments. Operations on matrices are
	// done on columns.
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jProto[passfunc] = function() {
	      var arr = [];
	      var i = 0;
	      var tmpthis = this;
	      var args = Array.prototype.slice.call(arguments);

	      // If the last argument is a function, we assume it's a callback; we
	      // strip the callback out and call the function again.
	      if (isFunction(args[args.length - 1])) {
	        var callbackFunction = args[args.length - 1];
	        var argsToPass = args.slice(0, args.length - 1);

	        setTimeout(function() {
	          callbackFunction.call(tmpthis,
	                                jProto[passfunc].apply(tmpthis, argsToPass));
	        });
	        return this;

	      // Otherwise we curry the function args and call normally.
	      } else {
	        var callbackFunction = undefined;
	        var curriedFunction = function curriedFunction(vector) {
	          return jStat[passfunc].apply(tmpthis, [vector].concat(args));
	        }
	      }

	      // If this is a matrix, run column-by-column.
	      if (this.length > 1) {
	        tmpthis = tmpthis.transpose();
	        for (; i < tmpthis.length; i++)
	          arr[i] = curriedFunction(tmpthis[i]);
	        return arr;
	      }

	      // Otherwise run on the vector.
	      return curriedFunction(this[0]);
	    };
	  })(funcs[i]);
	})('quantiles percentileOfScore'.split(' '));

	}(this.jStat, Math));
	// Special functions //
	(function(jStat, Math) {

	// Log-gamma function
	jStat.gammaln = function gammaln(x) {
	  var j = 0;
	  var cof = [
	    76.18009172947146, -86.50532032941677, 24.01409824083091,
	    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
	  ];
	  var ser = 1.000000000190015;
	  var xx, y, tmp;
	  tmp = (y = xx = x) + 5.5;
	  tmp -= (xx + 0.5) * Math.log(tmp);
	  for (; j < 6; j++)
	    ser += cof[j] / ++y;
	  return Math.log(2.5066282746310005 * ser / xx) - tmp;
	};


	// gamma of x
	jStat.gammafn = function gammafn(x) {
	  var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
	           629.3311553128184, 866.9662027904133, -31451.272968848367,
	           -36144.413418691176, 66456.14382024054
	  ];
	  var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
	           -3107.771671572311, 22538.118420980151, 4755.8462775278811,
	           -134659.9598649693, -115132.2596755535];
	  var fact = false;
	  var n = 0;
	  var xden = 0;
	  var xnum = 0;
	  var y = x;
	  var i, z, yi, res, sum, ysq;
	  if (y <= 0) {
	    res = y % 1 + 3.6e-16;
	    if (res) {
	      fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
	      y = 1 - y;
	    } else {
	      return Infinity;
	    }
	  }
	  yi = y;
	  if (y < 1) {
	    z = y++;
	  } else {
	    z = (y -= n = (y | 0) - 1) - 1;
	  }
	  for (i = 0; i < 8; ++i) {
	    xnum = (xnum + p[i]) * z;
	    xden = xden * z + q[i];
	  }
	  res = xnum / xden + 1;
	  if (yi < y) {
	    res /= yi;
	  } else if (yi > y) {
	    for (i = 0; i < n; ++i) {
	      res *= y;
	      y++;
	    }
	  }
	  if (fact) {
	    res = fact / res;
	  }
	  return res;
	};


	// lower incomplete gamma function P(a,x)
	jStat.gammap = function gammap(a, x) {
	  var aln = jStat.gammaln(a);
	  var ap = a;
	  var sum = 1 / a;
	  var del = sum;
	  var b = x + 1 - a;
	  var c = 1 / 1.0e-30;
	  var d = 1 / b;
	  var h = d;
	  var i = 1;
	  // calculate maximum number of itterations required for a
	  var ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
	  var an, endval;

	  if (x < 0 || a <= 0) {
	    return NaN;
	  } else if (x < a + 1) {
	    for (; i <= ITMAX; i++) {
	      sum += del *= x / ++ap;
	    }
	    return sum * Math.exp(-x + a * Math.log(x) - (aln));
	  }

	  for (; i <= ITMAX; i++) {
	    an = -i * (i - a);
	    b += 2;
	    d = an * d + b;
	    c = b + an / c;
	    d = 1 / d;
	    h *= d * c;
	  }

	  return 1 - h * Math.exp(-x + a * Math.log(x) - (aln));
	};


	// natural log factorial of n
	jStat.factorialln = function factorialln(n) {
	  return n < 0 ? NaN : jStat.gammaln(n + 1);
	};

	// factorial of n
	jStat.factorial = function factorial(n) {
	  return n < 0 ? NaN : jStat.gammafn(n + 1);
	};

	// combinations of n, m
	jStat.combination = function combination(n, m) {
	  // make sure n or m don't exceed the upper limit of usable values
	  return (n > 170 || m > 170)
	      ? Math.exp(jStat.combinationln(n, m))
	      : (jStat.factorial(n) / jStat.factorial(m)) / jStat.factorial(n - m);
	};


	jStat.combinationln = function combinationln(n, m){
	  return jStat.factorialln(n) - jStat.factorialln(m) - jStat.factorialln(n - m);
	};


	// permutations of n, m
	jStat.permutation = function permutation(n, m) {
	  return jStat.factorial(n) / jStat.factorial(n - m);
	};


	// beta function
	jStat.betafn = function betafn(x, y) {
	  // ensure arguments are positive
	  if (x <= 0 || y <= 0)
	    return undefined;
	  // make sure x + y doesn't exceed the upper limit of usable values
	  return (x + y > 170)
	      ? Math.exp(jStat.betaln(x, y))
	      : jStat.gammafn(x) * jStat.gammafn(y) / jStat.gammafn(x + y);
	};


	// natural logarithm of beta function
	jStat.betaln = function betaln(x, y) {
	  return jStat.gammaln(x) + jStat.gammaln(y) - jStat.gammaln(x + y);
	};


	// Evaluates the continued fraction for incomplete beta function by modified
	// Lentz's method.
	jStat.betacf = function betacf(x, a, b) {
	  var fpmin = 1e-30;
	  var m = 1;
	  var qab = a + b;
	  var qap = a + 1;
	  var qam = a - 1;
	  var c = 1;
	  var d = 1 - qab * x / qap;
	  var m2, aa, del, h;

	  // These q's will be used in factors that occur in the coefficients
	  if (Math.abs(d) < fpmin)
	    d = fpmin;
	  d = 1 / d;
	  h = d;

	  for (; m <= 100; m++) {
	    m2 = 2 * m;
	    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
	    // One step (the even one) of the recurrence
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    h *= d * c;
	    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
	    // Next step of the recurrence (the odd one)
	    d = 1 + aa * d;
	    if (Math.abs(d) < fpmin)
	      d = fpmin;
	    c = 1 + aa / c;
	    if (Math.abs(c) < fpmin)
	      c = fpmin;
	    d = 1 / d;
	    del = d * c;
	    h *= del;
	    if (Math.abs(del - 1.0) < 3e-7)
	      break;
	  }

	  return h;
	};


	// Returns the inverse incomplte gamma function
	jStat.gammapinv = function gammapinv(p, a) {
	  var j = 0;
	  var a1 = a - 1;
	  var EPS = 1e-8;
	  var gln = jStat.gammaln(a);
	  var x, err, t, u, pp, lna1, afac;

	  if (p >= 1)
	    return Math.max(100, a + 100 * Math.sqrt(a));
	  if (p <= 0)
	    return 0;
	  if (a > 1) {
	    lna1 = Math.log(a1);
	    afac = Math.exp(a1 * (lna1 - 1) - gln);
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    x = Math.max(1e-3,
	                 a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3));
	  } else {
	    t = 1 - a * (0.253 + a * 0.12);
	    if (p < t)
	      x = Math.pow(p / t, 1 / a);
	    else
	      x = 1 - Math.log(1 - (p - t) / (1 - t));
	  }

	  for(; j < 12; j++) {
	    if (x <= 0)
	      return 0;
	    err = jStat.gammap(a, x) - p;
	    if (a > 1)
	      t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
	    else
	      t = Math.exp(-x + a1 * Math.log(x) - gln);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (Math.abs(t) < EPS * x)
	      break;
	  }

	  return x;
	};


	// Returns the error function erf(x)
	jStat.erf = function erf(x) {
	  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
	             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
	             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
	             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
	             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
	             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
	             -6.886027e-12, 8.94487e-13, 3.13092e-13,
	             -1.12708e-13, 3.81e-16, 7.106e-15,
	             -1.523e-15, -9.4e-17, 1.21e-16,
	             -2.8e-17];
	  var j = cof.length - 1;
	  var isneg = false;
	  var d = 0;
	  var dd = 0;
	  var t, ty, tmp, res;

	  if (x < 0) {
	    x = -x;
	    isneg = true;
	  }

	  t = 2 / (2 + x);
	  ty = 4 * t - 2;

	  for(; j > 0; j--) {
	    tmp = d;
	    d = ty * d - dd + cof[j];
	    dd = tmp;
	  }

	  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
	  return isneg ? res - 1 : 1 - res;
	};


	// Returns the complmentary error function erfc(x)
	jStat.erfc = function erfc(x) {
	  return 1 - jStat.erf(x);
	};


	// Returns the inverse of the complementary error function
	jStat.erfcinv = function erfcinv(p) {
	  var j = 0;
	  var x, err, t, pp;
	  if (p >= 2)
	    return -100;
	  if (p <= 0)
	    return 100;
	  pp = (p < 1) ? p : 2 - p;
	  t = Math.sqrt(-2 * Math.log(pp / 2));
	  x = -0.70711 * ((2.30753 + t * 0.27061) /
	                  (1 + t * (0.99229 + t * 0.04481)) - t);
	  for (; j < 2; j++) {
	    err = jStat.erfc(x) - pp;
	    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
	  }
	  return (p < 1) ? x : -x;
	};


	// Returns the inverse of the incomplete beta function
	jStat.ibetainv = function ibetainv(p, a, b) {
	  var EPS = 1e-8;
	  var a1 = a - 1;
	  var b1 = b - 1;
	  var j = 0;
	  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
	  if (p <= 0)
	    return 0;
	  if (p >= 1)
	    return 1;
	  if (a >= 1 && b >= 1) {
	    pp = (p < 0.5) ? p : 1 - p;
	    t = Math.sqrt(-2 * Math.log(pp));
	    x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
	    if (p < 0.5)
	      x = -x;
	    al = (x * x - 3) / 6;
	    h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
	    w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
	        (al + 5 / 6 - 2 / (3 * h));
	    x = a / (a + b * Math.exp(2 * w));
	  } else {
	    lna = Math.log(a / (a + b));
	    lnb = Math.log(b / (a + b));
	    t = Math.exp(a * lna) / a;
	    u = Math.exp(b * lnb) / b;
	    w = t + u;
	    if (p < t / w)
	      x = Math.pow(a * w * p, 1 / a);
	    else
	      x = 1 - Math.pow(b * w * (1 - p), 1 / b);
	  }
	  afac = -jStat.gammaln(a) - jStat.gammaln(b) + jStat.gammaln(a + b);
	  for(; j < 10; j++) {
	    if (x === 0 || x === 1)
	      return x;
	    err = jStat.ibeta(x, a, b) - p;
	    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
	    u = err / t;
	    x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
	    if (x <= 0)
	      x = 0.5 * (x + t);
	    if (x >= 1)
	      x = 0.5 * (x + t + 1);
	    if (Math.abs(t) < EPS * x && j > 0)
	      break;
	  }
	  return x;
	};


	// Returns the incomplete beta function I_x(a,b)
	jStat.ibeta = function ibeta(x, a, b) {
	  // Factors in front of the continued fraction.
	  var bt = (x === 0 || x === 1) ?  0 :
	    Math.exp(jStat.gammaln(a + b) - jStat.gammaln(a) -
	             jStat.gammaln(b) + a * Math.log(x) + b *
	             Math.log(1 - x));
	  if (x < 0 || x > 1)
	    return false;
	  if (x < (a + 1) / (a + b + 2))
	    // Use continued fraction directly.
	    return bt * jStat.betacf(x, a, b) / a;
	  // else use continued fraction after making the symmetry transformation.
	  return 1 - bt * jStat.betacf(1 - x, b, a) / b;
	};


	// Returns a normal deviate (mu=0, sigma=1).
	// If n and m are specified it returns a object of normal deviates.
	jStat.randn = function randn(n, m) {
	  var u, v, x, y, q, mat;
	  if (!m)
	    m = n;
	  if (n)
	    return jStat.create(n, m, function() { return jStat.randn(); });
	  do {
	    u = Math.random();
	    v = 1.7156 * (Math.random() - 0.5);
	    x = u - 0.449871;
	    y = Math.abs(v) + 0.386595;
	    q = x * x + y * (0.19600 * y - 0.25472 * x);
	  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
	  return v / u;
	};


	// Returns a gamma deviate by the method of Marsaglia and Tsang.
	jStat.randg = function randg(shape, n, m) {
	  var oalph = shape;
	  var a1, a2, u, v, x, mat;
	  if (!m)
	    m = n;
	  if (!shape)
	    shape = 1;
	  if (n) {
	    mat = jStat.zeros(n,m);
	    mat.alter(function() { return jStat.randg(shape); });
	    return mat;
	  }
	  if (shape < 1)
	    shape += 1;
	  a1 = shape - 1 / 3;
	  a2 = 1 / Math.sqrt(9 * a1);
	  do {
	    do {
	      x = jStat.randn();
	      v = 1 + a2 * x;
	    } while(v <= 0);
	    v = v * v * v;
	    u = Math.random();
	  } while(u > 1 - 0.331 * Math.pow(x, 4) &&
	          Math.log(u) > 0.5 * x*x + a1 * (1 - v + Math.log(v)));
	  // alpha > 1
	  if (shape == oalph)
	    return a1 * v;
	  // alpha < 1
	  do {
	    u = Math.random();
	  } while(u === 0);
	  return Math.pow(u, 1 / oalph) * a1 * v;
	};


	// making use of static methods on the instance
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(
	          jStat.map(this, function(value) { return jStat[passfunc](value); }));
	    }
	  })(funcs[i]);
	})('gammaln gammafn factorial factorialln'.split(' '));


	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function() {
	      return jStat(jStat[passfunc].apply(null, arguments));
	    };
	  })(funcs[i]);
	})('randn'.split(' '));

	}(this.jStat, Math));
	(function(jStat, Math) {

	// generate all distribution instance methods
	(function(list) {
	  for (var i = 0; i < list.length; i++) (function(func) {
	    // distribution instance method
	    jStat[func] = function(a, b, c) {
	      if (!(this instanceof arguments.callee))
	        return new arguments.callee(a, b, c);
	      this._a = a;
	      this._b = b;
	      this._c = c;
	      return this;
	    };
	    // distribution method to be used on a jStat instance
	    jStat.fn[func] = function(a, b, c) {
	      var newthis = jStat[func](a, b, c);
	      newthis.data = this;
	      return newthis;
	    };
	    // sample instance method
	    jStat[func].prototype.sample = function(arr) {
	      var a = this._a;
	      var b = this._b;
	      var c = this._c;
	      if (arr)
	        return jStat.alter(arr, function() {
	          return jStat[func].sample(a, b, c);
	        });
	      else
	        return jStat[func].sample(a, b, c);
	    };
	    // generate the pdf, cdf and inv instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function(x) {
	          var a = this._a;
	          var b = this._b;
	          var c = this._c;
	          if (!x && x !== 0)
	            x = this.data;
	          if (typeof x !== 'number') {
	            return jStat.fn.map.call(x, function(x) {
	              return jStat[func][fnfunc](x, a, b, c);
	            });
	          }
	          return jStat[func][fnfunc](x, a, b, c);
	        };
	      })(vals[i]);
	    })('pdf cdf inv'.split(' '));
	    // generate the mean, median, mode and variance instance methods
	    (function(vals) {
	      for (var i = 0; i < vals.length; i++) (function(fnfunc) {
	        jStat[func].prototype[fnfunc] = function() {
	          return jStat[func][fnfunc](this._a, this._b, this._c);
	        };
	      })(vals[i]);
	    })('mean median mode variance'.split(' '));
	  })(list[i]);
	})((
	  'beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy ' +
	  'lognormal normal pareto studentt weibull uniform  binomial negbin hypgeom ' +
	  'poisson triangular'
	).split(' '));



	// extend beta function with static methods
	jStat.extend(jStat.beta, {
	  pdf: function pdf(x, alpha, beta) {
	    // PDF is zero outside the support
	    if (x > 1 || x < 0)
	      return 0;
	    // PDF is one for the uniform case
	    if (alpha == 1 && beta == 1)
	      return 1;

	    if (alpha < 512 || beta < 512) {
	      return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) /
	          jStat.betafn(alpha, beta);
	    } else {
	      return Math.exp((alpha - 1) * Math.log(x) +
	                      (beta - 1) * Math.log(1 - x) -
	                      jStat.betaln(alpha, beta));
	    }
	  },

	  cdf: function cdf(x, alpha, beta) {
	    return (x > 1 || x < 0) ? (x > 1) * 1 : jStat.ibeta(x, alpha, beta);
	  },

	  inv: function inv(x, alpha, beta) {
	    return jStat.ibetainv(x, alpha, beta);
	  },

	  mean: function mean(alpha, beta) {
	    return alpha / (alpha + beta);
	  },

	  median: function median(alpha, beta) {
	    throw new Error('median not yet implemented');
	  },

	  mode: function mode(alpha, beta) {
	    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
	  },

	  // return a random sample
	  sample: function sample(alpha, beta) {
	    var u = jStat.randg(alpha);
	    return u / (u + jStat.randg(beta));
	  },

	  variance: function variance(alpha, beta) {
	    return (alpha * beta) / (Math.pow(alpha + beta, 2) * (alpha + beta + 1));
	  }
	});

	// extend F function with static methods
	jStat.extend(jStat.centralF, {
	  pdf: function pdf(x, df1, df2) {
	    if (x < 0)
	      return undefined;
	    return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
	                     (Math.pow(df1 * x + df2, df1 + df2))) /
	                     (x * jStat.betafn(df1/2, df2/2));

	  },

	  cdf: function cdf(x, df1, df2) {
	    return jStat.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
	  },

	  inv: function inv(x, df1, df2) {
	    return df2 / (df1 * (1 / jStat.ibetainv(x, df1 / 2, df2 / 2) - 1));
	  },

	  mean: function mean(df1, df2) {
	    return (df2 > 2) ? df2 / (df2 - 2) : undefined;
	  },

	  mode: function mode(df1, df2) {
	    return (df1 > 2) ? (df2 * (df1 - 2)) / (df1 * (df2 + 2)) : undefined;
	  },

	  // return a random sample
	  sample: function sample(df1, df2) {
	    var x1 = jStat.randg(df1 / 2) * 2;
	    var x2 = jStat.randg(df2 / 2) * 2;
	    return (x1 / df1) / (x2 / df2);
	  },

	  variance: function variance(df1, df2) {
	    if (df2 <= 4)
	      return undefined;
	    return 2 * df2 * df2 * (df1 + df2 - 2) /
	        (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4));
	  }
	});


	// extend cauchy function with static methods
	jStat.extend(jStat.cauchy, {
	  pdf: function pdf(x, local, scale) {
	    return (scale / (Math.pow(x - local, 2) + Math.pow(scale, 2))) / Math.PI;
	  },

	  cdf: function cdf(x, local, scale) {
	    return Math.atan((x - local) / scale) / Math.PI + 0.5;
	  },

	  inv: function(p, local, scale) {
	    return local + scale * Math.tan(Math.PI * (p - 0.5));
	  },

	  median: function median(local, scale) {
	    return local;
	  },

	  mode: function mode(local, scale) {
	    return local;
	  },

	  sample: function sample(local, scale) {
	    return jStat.randn() *
	        Math.sqrt(1 / (2 * jStat.randg(0.5))) * scale + local;
	  }
	});



	// extend chisquare function with static methods
	jStat.extend(jStat.chisquare, {
	  pdf: function pdf(x, dof) {
	    return Math.exp((dof / 2 - 1) * Math.log(x) - x / 2 - (dof / 2) *
	                    Math.log(2) - jStat.gammaln(dof / 2));
	  },

	  cdf: function cdf(x, dof) {
	    return jStat.gammap(dof / 2, x / 2);
	  },

	  inv: function(p, dof) {
	    return 2 * jStat.gammapinv(p, 0.5 * dof);
	  },

	  mean : function(dof) {
	    return dof;
	  },

	  // TODO: this is an approximation (is there a better way?)
	  median: function median(dof) {
	    return dof * Math.pow(1 - (2 / (9 * dof)), 3);
	  },

	  mode: function mode(dof) {
	    return (dof - 2 > 0) ? dof - 2 : 0;
	  },

	  sample: function sample(dof) {
	    return jStat.randg(dof / 2) * 2;
	  },

	  variance: function variance(dof) {
	    return 2 * dof;
	  }
	});



	// extend exponential function with static methods
	jStat.extend(jStat.exponential, {
	  pdf: function pdf(x, rate) {
	    return x < 0 ? 0 : rate * Math.exp(-rate * x);
	  },

	  cdf: function cdf(x, rate) {
	    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
	  },

	  inv: function(p, rate) {
	    return -Math.log(1 - p) / rate;
	  },

	  mean : function(rate) {
	    return 1 / rate;
	  },

	  median: function (rate) {
	    return (1 / rate) * Math.log(2);
	  },

	  mode: function mode(rate) {
	    return 0;
	  },

	  sample: function sample(rate) {
	    return -1 / rate * Math.log(Math.random());
	  },

	  variance : function(rate) {
	    return Math.pow(rate, -2);
	  }
	});



	// extend gamma function with static methods
	jStat.extend(jStat.gamma, {
	  pdf: function pdf(x, shape, scale) {
	    return Math.exp((shape - 1) * Math.log(x) - x / scale -
	                    jStat.gammaln(shape) - shape * Math.log(scale));
	  },

	  cdf: function cdf(x, shape, scale) {
	    return jStat.gammap(shape, x / scale);
	  },

	  inv: function(p, shape, scale) {
	    return jStat.gammapinv(p, shape) * scale;
	  },

	  mean : function(shape, scale) {
	    return shape * scale;
	  },

	  mode: function mode(shape, scale) {
	    if(shape > 1) return (shape - 1) * scale;
	    return undefined;
	  },

	  sample: function sample(shape, scale) {
	    return jStat.randg(shape) * scale;
	  },

	  variance: function variance(shape, scale) {
	    return shape * scale * scale;
	  }
	});

	// extend inverse gamma function with static methods
	jStat.extend(jStat.invgamma, {
	  pdf: function pdf(x, shape, scale) {
	    return Math.exp(-(shape + 1) * Math.log(x) - scale / x -
	                    jStat.gammaln(shape) + shape * Math.log(scale));
	  },

	  cdf: function cdf(x, shape, scale) {
	    return 1 - jStat.gammap(shape, scale / x);
	  },

	  inv: function(p, shape, scale) {
	    return scale / jStat.gammapinv(1 - p, shape);
	  },

	  mean : function(shape, scale) {
	    return (shape > 1) ? scale / (shape - 1) : undefined;
	  },

	  mode: function mode(shape, scale) {
	    return scale / (shape + 1);
	  },

	  sample: function sample(shape, scale) {
	    return scale / jStat.randg(shape);
	  },

	  variance: function variance(shape, scale) {
	    if (shape <= 2)
	      return undefined;
	    return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2));
	  }
	});


	// extend kumaraswamy function with static methods
	jStat.extend(jStat.kumaraswamy, {
	  pdf: function pdf(x, alpha, beta) {
	    return Math.exp(Math.log(alpha) + Math.log(beta) + (alpha - 1) *
	                    Math.log(x) + (beta - 1) *
	                    Math.log(1 - Math.pow(x, alpha)));
	  },

	  cdf: function cdf(x, alpha, beta) {
	    return (1 - Math.pow(1 - Math.pow(x, alpha), beta));
	  },

	  mean : function(alpha, beta) {
	    return (beta * jStat.gammafn(1 + 1 / alpha) *
	            jStat.gammafn(beta)) / (jStat.gammafn(1 + 1 / alpha + beta));
	  },

	  median: function median(alpha, beta) {
	    return Math.pow(1 - Math.pow(2, -1 / beta), 1 / alpha);
	  },

	  mode: function mode(alpha, beta) {
	    if (!(alpha >= 1 && beta >= 1 && (alpha !== 1 && beta !== 1)))
	      return undefined;
	    return Math.pow((alpha - 1) / (alpha * beta - 1), 1 / alpha);
	  },

	  variance: function variance(alpha, beta) {
	    throw new Error('variance not yet implemented');
	    // TODO: complete this
	  }
	});



	// extend lognormal function with static methods
	jStat.extend(jStat.lognormal, {
	  pdf: function pdf(x, mu, sigma) {
	    return Math.exp(-Math.log(x) - 0.5 * Math.log(2 * Math.PI) -
	                    Math.log(sigma) - Math.pow(Math.log(x) - mu, 2) /
	                    (2 * sigma * sigma));
	  },

	  cdf: function cdf(x, mu, sigma) {
	    return 0.5 +
	        (0.5 * jStat.erf((Math.log(x) - mu) / Math.sqrt(2 * sigma * sigma)));
	  },

	  inv: function(p, mu, sigma) {
	    return Math.exp(-1.41421356237309505 * sigma * jStat.erfcinv(2 * p) + mu);
	  },

	  mean: function mean(mu, sigma) {
	    return Math.exp(mu + sigma * sigma / 2);
	  },

	  median: function median(mu, sigma) {
	    return Math.exp(mu);
	  },

	  mode: function mode(mu, sigma) {
	    return Math.exp(mu - sigma * sigma);
	  },

	  sample: function sample(mu, sigma) {
	    return Math.exp(jStat.randn() * sigma + mu);
	  },

	  variance: function variance(mu, sigma) {
	    return (Math.exp(sigma * sigma) - 1) * Math.exp(2 * mu + sigma * sigma);
	  }
	});



	// extend normal function with static methods
	jStat.extend(jStat.normal, {
	  pdf: function pdf(x, mean, std) {
	    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
	                    Math.log(std) - Math.pow(x - mean, 2) / (2 * std * std));
	  },

	  cdf: function cdf(x, mean, std) {
	    return 0.5 * (1 + jStat.erf((x - mean) / Math.sqrt(2 * std * std)));
	  },

	  inv: function(p, mean, std) {
	    return -1.41421356237309505 * std * jStat.erfcinv(2 * p) + mean;
	  },

	  mean : function(mean, std) {
	    return mean;
	  },

	  median: function median(mean, std) {
	    return mean;
	  },

	  mode: function (mean, std) {
	    return mean;
	  },

	  sample: function sample(mean, std) {
	    return jStat.randn() * std + mean;
	  },

	  variance : function(mean, std) {
	    return std * std;
	  }
	});



	// extend pareto function with static methods
	jStat.extend(jStat.pareto, {
	  pdf: function pdf(x, scale, shape) {
	    if (x <= scale)
	      return undefined;
	    return (shape * Math.pow(scale, shape)) / Math.pow(x, shape + 1);
	  },

	  cdf: function cdf(x, scale, shape) {
	    return 1 - Math.pow(scale / x, shape);
	  },

	  mean: function mean(scale, shape) {
	    if (shape <= 1)
	      return undefined;
	    return (shape * Math.pow(scale, shape)) / (shape - 1);
	  },

	  median: function median(scale, shape) {
	    return scale * (shape * Math.SQRT2);
	  },

	  mode: function mode(scale, shape) {
	    return scale;
	  },

	  variance : function(scale, shape) {
	    if (shape <= 2)
	      return undefined;
	    return (scale*scale * shape) / (Math.pow(shape - 1, 2) * (shape - 2));
	  }
	});



	// extend studentt function with static methods
	jStat.extend(jStat.studentt, {
	  pdf: function pdf(x, dof) {
	    return (jStat.gammafn((dof + 1) / 2) / (Math.sqrt(dof * Math.PI) *
	        jStat.gammafn(dof / 2))) *
	        Math.pow(1 + ((x * x) / dof), -((dof + 1) / 2));
	  },

	  cdf: function cdf(x, dof) {
	    var dof2 = dof / 2;
	    return jStat.ibeta((x + Math.sqrt(x * x + dof)) /
	                       (2 * Math.sqrt(x * x + dof)), dof2, dof2);
	  },

	  inv: function(p, dof) {
	    var x = jStat.ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
	    x = Math.sqrt(dof * (1 - x) / x);
	    return (p > 0.5) ? x : -x;
	  },

	  mean: function mean(dof) {
	    return (dof > 1) ? 0 : undefined;
	  },

	  median: function median(dof) {
	    return 0;
	  },

	  mode: function mode(dof) {
	    return 0;
	  },

	  sample: function sample(dof) {
	    return jStat.randn() * Math.sqrt(dof / (2 * jStat.randg(dof / 2)));
	  },

	  variance: function variance(dof) {
	    return (dof  > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined;
	  }
	});



	// extend weibull function with static methods
	jStat.extend(jStat.weibull, {
	  pdf: function pdf(x, scale, shape) {
	    if (x < 0)
	      return 0;
	    return (shape / scale) * Math.pow((x / scale), (shape - 1)) *
	        Math.exp(-(Math.pow((x / scale), shape)));
	  },

	  cdf: function cdf(x, scale, shape) {
	    return x < 0 ? 0 : 1 - Math.exp(-Math.pow((x / scale), shape));
	  },

	  inv: function(p, scale, shape) {
	    return scale * Math.pow(-Math.log(1 - p), 1 / shape);
	  },

	  mean : function(scale, shape) {
	    return scale * jStat.gammafn(1 + 1 / shape);
	  },

	  median: function median(scale, shape) {
	    return scale * Math.pow(Math.log(2), 1 / shape);
	  },

	  mode: function mode(scale, shape) {
	    if (shape <= 1)
	      return undefined;
	    return scale * Math.pow((shape - 1) / shape, 1 / shape);
	  },

	  sample: function sample(scale, shape) {
	    return scale * Math.pow(-Math.log(Math.random()), 1 / shape);
	  },

	  variance: function variance(scale, shape) {
	    return scale * scale * jStat.gammafn(1 + 2 / shape) -
	        Math.pow(this.mean(scale, shape), 2);
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.uniform, {
	  pdf: function pdf(x, a, b) {
	    return (x < a || x > b) ? 0 : 1 / (b - a);
	  },

	  cdf: function cdf(x, a, b) {
	    if (x < a)
	      return 0;
	    else if (x < b)
	      return (x - a) / (b - a);
	    return 1;
	  },

	  mean: function mean(a, b) {
	    return 0.5 * (a + b);
	  },

	  median: function median(a, b) {
	    return jStat.mean(a, b);
	  },

	  mode: function mode(a, b) {
	    throw new Error('mode is not yet implemented');
	  },

	  sample: function sample(a, b) {
	    return (a / 2 + b / 2) + (b / 2 - a / 2) * (2 * Math.random() - 1);
	  },

	  variance: function variance(a, b) {
	    return Math.pow(b - a, 2) / 12;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.binomial, {
	  pdf: function pdf(k, n, p) {
	    return (p === 0 || p === 1) ?
	      ((n * p) === k ? 1 : 0) :
	      jStat.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
	  },

	  cdf: function cdf(x, n, p) {
	    var binomarr = [],
	    k = 0;
	    if (x < 0) {
	      return 0;
	    }
	    if (x < n) {
	      for (; k <= x; k++) {
	        binomarr[ k ] = jStat.binomial.pdf(k, n, p);
	      }
	      return jStat.sum(binomarr);
	    }
	    return 1;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.negbin, {
	  pdf: function pdf(k, r, p) {
	    return k !== k | 0
	      ? false
	      : k < 0
	        ? 0
	        : jStat.combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
	  },

	  cdf: function cdf(x, r, p) {
	    var sum = 0,
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sum += jStat.negbin.pdf(k, r, p);
	    }
	    return sum;
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.hypgeom, {
	  pdf: function pdf(k, N, m, n) {
	    // Hypergeometric PDF.

	    // A simplification of the CDF algorithm below.

	    // k = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population

	    if(k !== k | 0) {
	      return false;
	    } else if(k < 0 || k < m - (N - n)) {
	      // It's impossible to have this few successes drawn.
	      return 0;
	    } else if(k > n || k > m) {
	      // It's impossible to have this many successes drawn.
	      return 0;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.

	      if(n * 2 > N) {
	        // More than half the population is sampled.

	        return jStat.hypgeom.pdf(N - m - n + k, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.

	        return jStat.hypgeom.pdf(n - k, N, N - m, n);
	      }

	    } else if(n * 2 > N) {
	      // Half or less is successes.

	      return jStat.hypgeom.pdf(m - k, N, m, N - n);

	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.pdf(k, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.

	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate product to keep it in a numerically good region, and then
	      // finish the normalization at the end.

	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;

	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;

	      for(var i = 0; i < k; i++) {
	        // For every possible number of successes up to that observed...

	        while(scaledPDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.

	          scaledPDF *= 1 - (m / (N - samplesDone));

	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }

	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));
	      }

	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledPDF *= 1 - (m / (N - samplesDone));
	      }

	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledPDF));
	    }
	  },

	  cdf: function cdf(x, N, m, n) {
	    // Hypergeometric CDF.

	    // This algorithm is due to Prof. Thomas S. Ferguson, <tom@math.ucla.edu>,
	    // and comes from his hypergeometric test calculator at
	    // <http://www.math.ucla.edu/~tom/distributions/Hypergeometric.html>.

	    // x = number of successes drawn
	    // N = population size
	    // m = number of successes in population
	    // n = number of items drawn from population

	    if(x < 0 || x < m - (N - n)) {
	      // It's impossible to have this few successes drawn or fewer.
	      return 0;
	    } else if(x >= n || x >= m) {
	      // We will always have this many successes or fewer.
	      return 1;
	    } else if (m * 2 > N) {
	      // More than half the population is successes.

	      if(n * 2 > N) {
	        // More than half the population is sampled.

	        return jStat.hypgeom.cdf(N - m - n + x, N, N - m, N - n)
	      } else {
	        // Half or less of the population is sampled.

	        return 1 - jStat.hypgeom.cdf(n - x - 1, N, N - m, n);
	      }

	    } else if(n * 2 > N) {
	      // Half or less is successes.

	      return 1 - jStat.hypgeom.cdf(m - x - 1, N, m, N - n);

	    } else if(m < n) {
	      // We want to have the number of things sampled to be less than the
	      // successes available. So swap the definitions of successful and sampled.
	      return jStat.hypgeom.cdf(x, N, n, m);
	    } else {
	      // If we get here, half or less of the population was sampled, half or
	      // less of it was successes, and we had fewer sampled things than
	      // successes. Now we can do this complicated iterative algorithm in an
	      // efficient way.

	      // The basic premise of the algorithm is that we partially normalize our
	      // intermediate sum to keep it in a numerically good region, and then
	      // finish the normalization at the end.

	      // Holds the intermediate, scaled total CDF.
	      var scaledCDF = 1;

	      // This variable holds the scaled probability of the current number of
	      // successes.
	      var scaledPDF = 1;

	      // This keeps track of how much we have normalized.
	      var samplesDone = 0;

	      for(var i = 0; i < x; i++) {
	        // For every possible number of successes up to that observed...

	        while(scaledCDF > 1 && samplesDone < n) {
	          // Intermediate result is growing too big. Apply some of the
	          // normalization to shrink everything.

	          var factor = 1 - (m / (N - samplesDone));

	          scaledPDF *= factor;
	          scaledCDF *= factor;

	          // Say we've normalized by this sample already.
	          samplesDone++;
	        }

	        // Work out the partially-normalized hypergeometric PDF for the next
	        // number of successes
	        scaledPDF *= (n - i) * (m - i) / ((i + 1) * (N - m - n + i + 1));

	        // Add to the CDF answer.
	        scaledCDF += scaledPDF;
	      }

	      for(; samplesDone < n; samplesDone++) {
	        // Apply all the rest of the normalization
	        scaledCDF *= 1 - (m / (N - samplesDone));
	      }

	      // Bound answer sanely before returning.
	      return Math.min(1, Math.max(0, scaledCDF));
	    }
	  }
	});



	// extend uniform function with static methods
	jStat.extend(jStat.poisson, {
	  pdf: function pdf(k, l) {
	    return Math.pow(l, k) * Math.exp(-l) / jStat.factorial(k);
	  },

	  cdf: function cdf(x, l) {
	    var sumarr = [],
	    k = 0;
	    if (x < 0) return 0;
	    for (; k <= x; k++) {
	      sumarr.push(jStat.poisson.pdf(k, l));
	    }
	    return jStat.sum(sumarr);
	  },

	  mean : function(l) {
	    return l;
	  },

	  variance : function(l) {
	    return l;
	  },

	  sample: function sample(l) {
	    var p = 1, k = 0, L = Math.exp(-l);
	    do {
	      k++;
	      p *= Math.random();
	    } while (p > L);
	    return k - 1;
	  }
	});

	// extend triangular function with static methods
	jStat.extend(jStat.triangular, {
	  pdf: function pdf(x, a, b, c) {
	    return (b <= a || c < a || c > b)
	      ? undefined
	      : (x < a || x > b)
	        ? 0
	        : (x <= c)
	          ? (2 * (x - a)) / ((b - a) * (c - a))
	          : (2 * (b - x)) / ((b - a) * (b - c));
	  },

	  cdf: function cdf(x, a, b, c) {
	    if (b <= a || c < a || c > b)
	      return undefined;
	    if (x < a) {
	      return 0;
	    } else {
	      if (x <= c)
	        return Math.pow(x - a, 2) / ((b - a) * (c - a));
	      return 1 - Math.pow(b - x, 2) / ((b - a) * (b - c));
	    }
	    // never reach this
	    return 1;
	  },

	  mean: function mean(a, b, c) {
	    return (a + b + c) / 3;
	  },

	  median: function median(a, b, c) {
	    if (c <= (a + b) / 2) {
	      return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
	    } else if (c > (a + b) / 2) {
	      return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
	    }
	  },

	  mode: function mode(a, b, c) {
	    return c;
	  },

	  sample: function sample(a, b, c) {
	    var u = Math.random();
	    if (u < ((c - a) / (b - a)))
	      return a + Math.sqrt(u * (b - a) * (c - a))
	    return b - Math.sqrt((1 - u) * (b - a) * (b - c));
	  },

	  variance: function variance(a, b, c) {
	    return (a * a + b * b + c * c - a * b - a * c - b * c) / 18;
	  }
	});

	}(this.jStat, Math));
	/* Provides functions for the solution of linear system of equations, integration, extrapolation,
	 * interpolation, eigenvalue problems, differential equations and PCA analysis. */

	(function(jStat, Math) {

	var push = Array.prototype.push;
	var isArray = jStat.utils.isArray;

	jStat.extend({

	  // add a vector/matrix to a vector/matrix or scalar
	  add: function add(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value + arg[row][col];
	      });
	    }
	    return jStat.map(arr, function(value) { return value + arg; });
	  },

	  // subtract a vector or scalar from the vector
	  subtract: function subtract(arr, arg) {
	    // check if arg is a vector or scalar
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.map(arr, function(value, row, col) {
	        return value - arg[row][col] || 0;
	      });
	    }
	    return jStat.map(arr, function(value) { return value - arg; });
	  },

	  // matrix division
	  divide: function divide(arr, arg) {
	    if (isArray(arg)) {
	      if (!isArray(arg[0])) arg = [ arg ];
	      return jStat.multiply(arr, jStat.inv(arg));
	    }
	    return jStat.map(arr, function(value) { return value / arg; });
	  },

	  // matrix multiplication
	  multiply: function multiply(arr, arg) {
	    var row, col, nrescols, sum,
	    nrow = arr.length,
	    ncol = arr[0].length,
	    res = jStat.zeros(nrow, nrescols = (isArray(arg)) ? arg[0].length : ncol),
	    rescols = 0;
	    if (isArray(arg)) {
	      for (; rescols < nrescols; rescols++) {
	        for (row = 0; row < nrow; row++) {
	          sum = 0;
	          for (col = 0; col < ncol; col++)
	          sum += arr[row][col] * arg[col][rescols];
	          res[row][rescols] = sum;
	        }
	      }
	      return (nrow === 1 && rescols === 1) ? res[0][0] : res;
	    }
	    return jStat.map(arr, function(value) { return value * arg; });
	  },

	  // Returns the dot product of two matricies
	  dot: function dot(arr, arg) {
	    if (!isArray(arr[0])) arr = [ arr ];
	    if (!isArray(arg[0])) arg = [ arg ];
	    // convert column to row vector
	    var left = (arr[0].length === 1 && arr.length !== 1) ? jStat.transpose(arr) : arr,
	    right = (arg[0].length === 1 && arg.length !== 1) ? jStat.transpose(arg) : arg,
	    res = [],
	    row = 0,
	    nrow = left.length,
	    ncol = left[0].length,
	    sum, col;
	    for (; row < nrow; row++) {
	      res[row] = [];
	      sum = 0;
	      for (col = 0; col < ncol; col++)
	      sum += left[row][col] * right[row][col];
	      res[row] = sum;
	    }
	    return (res.length === 1) ? res[0] : res;
	  },

	  // raise every element by a scalar
	  pow: function pow(arr, arg) {
	    return jStat.map(arr, function(value) { return Math.pow(value, arg); });
	  },

	  // generate the absolute values of the vector
	  abs: function abs(arr) {
	    return jStat.map(arr, function(value) { return Math.abs(value); });
	  },

	  // computes the p-norm of the vector
	  // In the case that a matrix is passed, uses the first row as the vector
	  norm: function norm(arr, p) {
	    var nnorm = 0,
	    i = 0;
	    // check the p-value of the norm, and set for most common case
	    if (isNaN(p)) p = 2;
	    // check if multi-dimensional array, and make vector correction
	    if (isArray(arr[0])) arr = arr[0];
	    // vector norm
	    for (; i < arr.length; i++) {
	      nnorm += Math.pow(Math.abs(arr[i]), p);
	    }
	    return Math.pow(nnorm, 1 / p);
	  },

	  // TODO: make compatible with matrices
	  // computes the angle between two vectors in rads
	  angle: function angle(arr, arg) {
	    return Math.acos(jStat.dot(arr, arg) / (jStat.norm(arr) * jStat.norm(arg)));
	  },

	  // augment one matrix by another
	  aug: function aug(a, b) {
	    var newarr = a.slice(),
	    i = 0;
	    for (; i < newarr.length; i++) {
	      push.apply(newarr[i], b[i]);
	    }
	    return newarr;
	  },

	  inv: function inv(a) {
	    var rows = a.length,
	    cols = a[0].length,
	    b = jStat.identity(rows, cols),
	    c = jStat.gauss_jordan(a, b),
	    obj = [],
	    i = 0,
	    j;
	    for (; i < rows; i++) {
	      obj[i] = [];
	      for (j = cols - 1; j < c[0].length; j++)
	      obj[i][j - cols] = c[i][j];
	    }
	    return obj;
	  },

	  // calculate the determinant of a matrix
	  det: function det(a) {
	    var alen = a.length,
	    alend = alen * 2,
	    vals = new Array(alend),
	    rowshift = alen - 1,
	    colshift = alend - 1,
	    mrow = rowshift - alen + 1,
	    mcol = colshift,
	    i = 0,
	    result = 0,
	    j;
	    // check for special 2x2 case
	    if (alen === 2) {
	      return a[0][0] * a[1][1] - a[0][1] * a[1][0];
	    }
	    for (; i < alend; i++) {
	      vals[i] = 1;
	    }
	    for (i = 0; i < alen; i++) {
	      for (j = 0; j < alen; j++) {
	        vals[(mrow < 0) ? mrow + alen : mrow ] *= a[i][j];
	        vals[(mcol < alen) ? mcol + alen : mcol ] *= a[i][j];
	        mrow++;
	        mcol--;
	      }
	      mrow = --rowshift - alen + 1;
	      mcol = --colshift;
	    }
	    for (i = 0; i < alen; i++) {
	      result += vals[i];
	    }
	    for (; i < alend; i++) {
	      result -= vals[i];
	    }
	    return result;
	  },

	  gauss_elimination: function gauss_elimination(a, b) {
	    var i = 0,
	    j = 0,
	    n = a.length,
	    m = a[0].length,
	    factor = 1,
	    sum = 0,
	    x = [],
	    maug, pivot, temp, k;
	    a = jStat.aug(a, b);
	    maug = a[0].length;
	    for(; i < n; i++) {
	      pivot = a[i][i];
	      j = i;
	      for (k = i + 1; k < m; k++) {
	        if (pivot < Math.abs(a[k][i])) {
	          pivot = a[k][i];
	          j = k;
	        }
	      }
	      if (j != i) {
	        for(k = 0; k < maug; k++) {
	          temp = a[i][k];
	          a[i][k] = a[j][k];
	          a[j][k] = temp;
	        }
	      }
	      for (j = i + 1; j < n; j++) {
	        factor = a[j][i] / a[i][i];
	        for(k = i; k < maug; k++) {
	          a[j][k] = a[j][k] - factor * a[i][k];
	        }
	      }
	    }
	    for (i = n - 1; i >= 0; i--) {
	      sum = 0;
	      for (j = i + 1; j<= n - 1; j++) {
	        sum = x[j] * a[i][j];
	      }
	      x[i] =(a[i][maug - 1] - sum) / a[i][i];
	    }
	    return x;
	  },

	  gauss_jordan: function gauss_jordan(a, b) {
	    var m = jStat.aug(a, b),
	    h = m.length,
	    w = m[0].length;
	    // find max pivot
	    for (var y = 0; y < h; y++) {
	      var maxrow = y;
	      for (var y2 = y+1; y2 < h; y2++) {
	        if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
	          maxrow = y2;
	      }
	      var tmp = m[y];
	      m[y] = m[maxrow];
	      m[maxrow] = tmp
	      for (var y2 = y+1; y2 < h; y2++) {
	        c = m[y2][y] / m[y][y];
	        for (var x = y; x < w; x++) {
	          m[y2][x] -= m[y][x] * c;
	        }
	      }
	    }
	    // backsubstitute
	    for (var y = h-1; y >= 0; y--) {
	      c = m[y][y];
	      for (var y2 = 0; y2 < y; y2++) {
	        for (var x = w-1; x > y-1; x--) {
	          m[y2][x] -= m[y][x] * m[y2][y] / c;
	        }
	      }
	      m[y][y] /= c;
	      for (var x = h; x < w; x++) {
	        m[y][x] /= c;
	      }
	    }
	    return m;
	  },

	  lu: function lu(a, b) {
	    throw new Error('lu not yet implemented');
	  },

	  cholesky: function cholesky(a, b) {
	    throw new Error('cholesky not yet implemented');
	  },

	  gauss_jacobi: function gauss_jacobi(a, b, x, r) {
	    var i = 0;
	    var j = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(d), jStat.add(l, u)), -1);
	    c = jStat.multiply(jStat.inv(d), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk,xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },

	  gauss_seidel: function gauss_seidel(a, b, x, r) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d, l)), u), -1);
	    c = jStat.multiply(jStat.inv(jStat.add(d, l)), b);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i = i + 1;
	    }
	    return xk;
	  },

	  SOR: function SOR(a, b, x, r, w) {
	    var i = 0;
	    var n = a.length;
	    var l = [];
	    var u = [];
	    var d = [];
	    var j, xv, c, h, xk;
	    for (; i < n; i++) {
	      l[i] = [];
	      u[i] = [];
	      d[i] = [];
	      for (j = 0; j < n; j++) {
	        if (i > j) {
	          l[i][j] = a[i][j];
	          u[i][j] = d[i][j] = 0;
	        } else if (i < j) {
	          u[i][j] = a[i][j];
	          l[i][j] = d[i][j] = 0;
	        } else {
	          d[i][j] = a[i][j];
	          l[i][j] = u[i][j] = 0;
	        }
	      }
	    }
	    h = jStat.multiply(jStat.inv(jStat.add(d, jStat.multiply(l, w))),
	                       jStat.subtract(jStat.multiply(d, 1 - w),
	                                      jStat.multiply(u, w)));
	    c = jStat.multiply(jStat.multiply(jStat.inv(jStat.add(d,
	        jStat.multiply(l, w))), b), w);
	    xv = x;
	    xk = jStat.add(jStat.multiply(h, x), c);
	    i = 2;
	    while (Math.abs(jStat.norm(jStat.subtract(xk, xv))) > r) {
	      xv = xk;
	      xk = jStat.add(jStat.multiply(h, xv), c);
	      i++;
	    }
	    return xk;
	  },

	  householder: function householder(a) {
	    var m = a.length;
	    var n = a[0].length;
	    var i = 0;
	    var w = [];
	    var p = [];
	    var alpha, r, k, j, factor;
	    for (; i < m - 1; i++) {
	      alpha = 0;
	      for (j = i + 1; j < n; j++)
	      alpha += (a[j][i] * a[j][i]);
	      factor = (a[i + 1][i] > 0) ? -1 : 1;
	      alpha = factor * Math.sqrt(alpha);
	      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
	      w = jStat.zeros(m, 1);
	      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
	      for (k = i + 2; k < m; k++) w[k][0] = a[k][i] / (2 * r);
	      p = jStat.subtract(jStat.identity(m, n),
	          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
	      a = jStat.multiply(p, jStat.multiply(a, p));
	    }
	    return a;
	  },

	  // TODO: not working properly.
	  QR: function QR(a, b) {
	    var m = a.length;
	    var n = a[0].length;
	    var i = 0;
	    var w = [];
	    var p = [];
	    var x = [];
	    var j, alpha, r, k, factor, sum;
	    for (; i < m - 1; i++) {
	      alpha = 0;
	      for (j = i + 1; j < n; j++)
	        alpha += (a[j][i] * a[j][i]);
	      factor = (a[i + 1][i] > 0) ? -1 : 1;
	      alpha = factor * Math.sqrt(alpha);
	      r = Math.sqrt((((alpha * alpha) - a[i + 1][i] * alpha) / 2));
	      w = jStat.zeros(m, 1);
	      w[i + 1][0] = (a[i + 1][i] - alpha) / (2 * r);
	      for (k = i + 2; k < m; k++)
	        w[k][0] = a[k][i] / (2 * r);
	      p = jStat.subtract(jStat.identity(m, n),
	          jStat.multiply(jStat.multiply(w, jStat.transpose(w)), 2));
	      a = jStat.multiply(p, a);
	      b = jStat.multiply(p, b);
	    }
	    for (i = m - 1; i >= 0; i--) {
	      sum = 0;
	      for (j = i + 1; j <= n - 1; j++)
	      sum = x[j] * a[i][j];
	      x[i] = b[i][0] / a[i][i];
	    }
	    return x;
	  },

	  jacobi: function jacobi(a) {
	    var condition = 1;
	    var count = 0;
	    var n = a.length;
	    var e = jStat.identity(n, n);
	    var ev = [];
	    var b, i, j, p, q, maxim, theta, s;
	    // condition === 1 only if tolerance is not reached
	    while (condition === 1) {
	      count++;
	      maxim = a[0][1];
	      p = 0;
	      q = 1;
	      for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	          if (i != j) {
	            if (maxim < Math.abs(a[i][j])) {
	              maxim = Math.abs(a[i][j]);
	              p = i;
	              q = j;
	            }
	          }
	        }
	      }
	      if (a[p][p] === a[q][q])
	        theta = (a[p][q] > 0) ? Math.PI / 4 : -Math.PI / 4;
	      else
	        theta = Math.atan(2 * a[p][q] / (a[p][p] - a[q][q])) / 2;
	      s = jStat.identity(n, n);
	      s[p][p] = Math.cos(theta);
	      s[p][q] = -Math.sin(theta);
	      s[q][p] = Math.sin(theta);
	      s[q][q] = Math.cos(theta);
	      // eigen vector matrix
	      e = jStat.multiply(e, s);
	      b = jStat.multiply(jStat.multiply(jStat.inv(s), a), s);
	      a = b;
	      condition = 0;
	      for (i = 1; i < n; i++) {
	        for (j = 1; j < n; j++) {
	          if (i != j && Math.abs(a[i][j]) > 0.001) {
	            condition = 1;
	          }
	        }
	      }
	    }
	    for (i = 0; i < n; i++) ev.push(a[i][i]);
	    //returns both the eigenvalue and eigenmatrix
	    return [e, ev];
	  },

	  rungekutta: function rungekutta(f, h, p, t_j, u_j, order) {
	    var k1, k2, u_j1, k3, k4;
	    if (order === 2) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h, u_j + k1);
	        u_j1 = u_j + (k1 + k2) / 2;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    if (order === 4) {
	      while (t_j <= p) {
	        k1 = h * f(t_j, u_j);
	        k2 = h * f(t_j + h / 2, u_j + k1 / 2);
	        k3 = h * f(t_j + h / 2, u_j + k2 / 2);
	        k4 = h * f(t_j +h, u_j + k3);
	        u_j1 = u_j + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
	        u_j = u_j1;
	        t_j = t_j + h;
	      }
	    }
	    return u_j;
	  },

	  romberg: function romberg(f, a, b, order) {
	    var i = 0;
	    var h = (b - a) / 2;
	    var x = [];
	    var h1 = [];
	    var g = [];
	    var m, a1, j, k, I, d;
	    while (i < order / 2) {
	      I = f(a);
	      for (j = a, k = 0; j <= b; j = j + h, k++) x[k] = j;
	      m = x.length;
	      for (j = 1; j < m - 1; j++) {
	        I += (((j % 2) !== 0) ? 4 : 2) * f(x[j]);
	      }
	      I = (h / 3) * (I + f(b));
	      g[i] = I;
	      h /= 2;
	      i++;
	    }
	    a1 = g.length;
	    m = 1;
	    while (a1 !== 1) {
	      for (j = 0; j < a1 - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a1 = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },

	  richardson: function richardson(X, f, x, h) {
	    function pos(X, x) {
	      var i = 0;
	      var n = X.length;
	      var p;
	      for (; i < n; i++)
	        if (X[i] === x) p = i;
	      return p;
	    }
	    var n = X.length,
	    h_min = Math.abs(x - X[pos(X, x) + 1]),
	    i = 0,
	    g = [],
	    h1 = [],
	    y1, y2, m, a, j;
	    while (h >= h_min) {
	      y1 = pos(X, x + h);
	      y2 = pos(X, x);
	      g[i] = (f[y1] - 2 * f[y2] + f[2 * y2 - y1]) / (h * h);
	      h /= 2;
	      i++;
	    }
	    a = g.length;
	    m = 1;
	    while (a != 1) {
	      for (j = 0; j < a - 1; j++)
	      h1[j] = ((Math.pow(4, m)) * g[j + 1] - g[j]) / (Math.pow(4, m) - 1);
	      a = h1.length;
	      g = h1;
	      h1 = [];
	      m++;
	    }
	    return g;
	  },

	  simpson: function simpson(f, a, b, n) {
	    var h = (b - a) / n;
	    var I = f(a);
	    var x = [];
	    var j = a;
	    var k = 0;
	    var i = 1;
	    var m;
	    for (; j <= b; j = j + h, k++)
	      x[k] = j;
	    m = x.length;
	    for (; i < m - 1; i++) {
	      I += ((i % 2 !== 0) ? 4 : 2) * f(x[i]);
	    }
	    return (h / 3) * (I + f(b));
	  },

	  hermite: function hermite(X, F, dF, value) {
	    var n = X.length;
	    var p = 0;
	    var i = 0;
	    var l = [];
	    var dl = [];
	    var A = [];
	    var B = [];
	    var j;
	    for (; i < n; i++) {
	      l[i] = 1;
	      for (j = 0; j < n; j++) {
	        if (i != j) l[i] *= (value - X[j]) / (X[i] - X[j]);
	      }
	      dl[i] = 0;
	      for (j = 0; j < n; j++) {
	        if (i != j) dl[i] += 1 / (X [i] - X[j]);
	      }
	      A[i] = (1 - 2 * (value - X[i]) * dl[i]) * (l[i] * l[i]);
	      B[i] = (value - X[i]) * (l[i] * l[i]);
	      p += (A[i] * F[i] + B[i] * dF[i]);
	    }
	    return p;
	  },

	  lagrange: function lagrange(X, F, value) {
	    var p = 0;
	    var i = 0;
	    var j, l;
	    var n = X.length;
	    for (; i < n; i++) {
	      l = F[i];
	      for (j = 0; j < n; j++) {
	        // calculating the lagrange polynomial L_i
	        if (i != j) l *= (value - X[j]) / (X[i] - X[j]);
	      }
	      // adding the lagrange polynomials found above
	      p += l;
	    }
	    return p;
	  },

	  cubic_spline: function cubic_spline(X, F, value) {
	    var n = X.length;
	    var i = 0, j;
	    var A = [];
	    var B = [];
	    var alpha = [];
	    var c = [];
	    var h = [];
	    var b = [];
	    var d = [];
	    for (; i < n - 1; i++)
	      h[i] = X[i + 1] - X[i];
	    alpha[0] = 0;
	    for (i = 1; i < n - 1; i++) {
	      alpha[i] = (3 / h[i]) * (F[i + 1] - F[i]) -
	          (3 / h[i-1]) * (F[i] - F[i-1]);
	    }
	    for (i = 1; i < n - 1; i++) {
	      A[i] = [];
	      B[i] = [];
	      A[i][i-1] = h[i-1];
	      A[i][i] = 2 * (h[i - 1] + h[i]);
	      A[i][i+1] = h[i];
	      B[i][0] = alpha[i];
	    }
	    c = jStat.multiply(jStat.inv(A), B);
	    for (j = 0; j < n - 1; j++) {
	      b[j] = (F[j + 1] - F[j]) / h[j] - h[j] * (c[j + 1][0] + 2 * c[j][0]) / 3;
	      d[j] = (c[j + 1][0] - c[j][0]) / (3 * h[j]);
	    }
	    for (j = 0; j < n; j++) {
	      if (X[j] > value) break;
	    }
	    j -= 1;
	    return F[j] + (value - X[j]) * b[j] + jStat.sq(value-X[j]) *
	        c[j] + (value - X[j]) * jStat.sq(value - X[j]) * d[j];
	  },

	  gauss_quadrature: function gauss_quadrature() {
	    throw new Error('gauss_quadrature not yet implemented');
	  },

	  PCA: function PCA(X) {
	    var m = X.length;
	    var n = X[0].length;
	    var flag = false;
	    var i = 0;
	    var j, temp1;
	    var u = [];
	    var D = [];
	    var result = [];
	    var temp2 = [];
	    var Y = [];
	    var Bt = [];
	    var B = [];
	    var C = [];
	    var V = [];
	    var Vt = [];
	    for (i = 0; i < m; i++) {
	      u[i] = jStat.sum(X[i]) / n;
	    }
	    for (i = 0; i < n; i++) {
	      B[i] = [];
	      for(j = 0; j < m; j++) {
	        B[i][j] = X[j][i] - u[j];
	      }
	    }
	    B = jStat.transpose(B);
	    for (i = 0; i < m; i++) {
	      C[i] = [];
	      for (j = 0; j < m; j++) {
	        C[i][j] = (jStat.dot([B[i]], [B[j]])) / (n - 1);
	      }
	    }
	    result = jStat.jacobi(C);
	    V = result[0];
	    D = result[1];
	    Vt = jStat.transpose(V);
	    for (i = 0; i < D.length; i++) {
	      for (j = i; j < D.length; j++) {
	        if(D[i] < D[j])  {
	          temp1 = D[i];
	          D[i] = D[j];
	          D[j] = temp1;
	          temp2 = Vt[i];
	          Vt[i] = Vt[j];
	          Vt[j] = temp2;
	        }
	      }
	    }
	    Bt = jStat.transpose(B);
	    for (i = 0; i < m; i++) {
	      Y[i] = [];
	      for (j = 0; j < Bt.length; j++) {
	        Y[i][j] = jStat.dot([Vt[i]], [Bt[j]]);
	      }
	    }
	    return [X, D, Vt, Y];
	  }
	});

	// extend jStat.fn with methods that require one argument
	(function(funcs) {
	  for (var i = 0; i < funcs.length; i++) (function(passfunc) {
	    jStat.fn[passfunc] = function(arg, func) {
	      var tmpthis = this;
	      // check for callback
	      if (func) {
	        setTimeout(function() {
	          func.call(tmpthis, jStat.fn[passfunc].call(tmpthis, arg));
	        }, 15);
	        return this;
	      }
	      if (typeof jStat[passfunc](this, arg) === 'number')
	        return jStat[passfunc](this, arg);
	      else
	        return jStat(jStat[passfunc](this, arg));
	    };
	  }(funcs[i]));
	}('add divide multiply subtract dot pow abs norm angle'.split(' ')));

	}(this.jStat, Math));
	(function(jStat, Math) {

	var slice = [].slice;
	var isNumber = jStat.utils.isNumber;

	// flag==true denotes use of sample standard deviation
	// Z Statistics
	jStat.extend({
	  // 2 different parameter lists:
	  // (value, mean, sd)
	  // (value, array, flag)
	  zscore: function zscore() {
	    var args = slice.call(arguments);
	    if (isNumber(args[1])) {
	      return (args[0] - args[1]) / args[2];
	    }
	    return (args[0] - jStat.mean(args[1])) / jStat.stdev(args[1], args[2]);
	  },

	  // 3 different paramter lists:
	  // (value, mean, sd, sides)
	  // (zscore, sides)
	  // (value, array, sides, flag)
	  ztest: function ztest() {
	    var args = slice.call(arguments);
	    if (args.length === 4) {
	      if(isNumber(args[1])) {
	        var z = jStat.zscore(args[0],args[1],args[2])
	        return (args[3] === 1) ?
	          (jStat.normal.cdf(-Math.abs(z),0,1)) :
	          (jStat.normal.cdf(-Math.abs(z),0,1)* 2);
	      }
	      var z = args[0]
	      return (args[2] === 1) ?
	        (jStat.normal.cdf(-Math.abs(z),0,1)) :
	        (jStat.normal.cdf(-Math.abs(z),0,1)*2);
	    }
	    var z = jStat.zscore(args[0],args[1],args[3])
	    return (args[1] === 1) ?
	      (jStat.normal.cdf(-Math.abs(z), 0, 1)) :
	      (jStat.normal.cdf(-Math.abs(z), 0, 1)*2);
	  }
	});

	jStat.extend(jStat.fn, {
	  zscore: function zscore(value, flag) {
	    return (value - this.mean()) / this.stdev(flag);
	  },

	  ztest: function ztest(value, sides, flag) {
	    var zscore = Math.abs(this.zscore(value, flag));
	    return (sides === 1) ?
	      (jStat.normal.cdf(-zscore, 0, 1)) :
	      (jStat.normal.cdf(-zscore, 0, 1) * 2);
	  }
	});

	// T Statistics
	jStat.extend({
	  // 2 parameter lists
	  // (value, mean, sd, n)
	  // (value, array)
	  tscore: function tscore() {
	    var args = slice.call(arguments);
	    return (args.length === 4) ?
	      ((args[0] - args[1]) / (args[2] / Math.sqrt(args[3]))) :
	      ((args[0] - jStat.mean(args[1])) /
	       (jStat.stdev(args[1], true) / Math.sqrt(args[1].length)));
	  },

	  // 3 different paramter lists:
	  // (value, mean, sd, n, sides)
	  // (tscore, n, sides)
	  // (value, array, sides)
	  ttest: function ttest() {
	    var args = slice.call(arguments);
	    var tscore;
	    if (args.length === 5) {
	      tscore = Math.abs(jStat.tscore(args[0], args[1], args[2], args[3]));
	      return (args[4] === 1) ?
	        (jStat.studentt.cdf(-tscore, args[3]-1)) :
	        (jStat.studentt.cdf(-tscore, args[3]-1)*2);
	    }
	    if (isNumber(args[1])) {
	      tscore = Math.abs(args[0])
	      return (args[2] == 1) ?
	        (jStat.studentt.cdf(-tscore, args[1]-1)) :
	        (jStat.studentt.cdf(-tscore, args[1]-1) * 2);
	    }
	    tscore = Math.abs(jStat.tscore(args[0], args[1]))
	    return (args[2] == 1) ?
	      (jStat.studentt.cdf(-tscore, args[1].length-1)) :
	      (jStat.studentt.cdf(-tscore, args[1].length-1) * 2);
	  }
	});

	jStat.extend(jStat.fn, {
	  tscore: function tscore(value) {
	    return (value - this.mean()) / (this.stdev(true) / Math.sqrt(this.cols()));
	  },

	  ttest: function ttest(value, sides) {
	    return (sides === 1) ?
	      (1 - jStat.studentt.cdf(Math.abs(this.tscore(value)), this.cols()-1)) :
	      (jStat.studentt.cdf(-Math.abs(this.tscore(value)), this.cols()-1)*2);
	  }
	});

	// F Statistics
	jStat.extend({
	  // Paramter list is as follows:
	  // (array1, array2, array3, ...)
	  // or it is an array of arrays
	  // array of arrays conversion
	  anovafscore: function anovafscore() {
	    var args = slice.call(arguments),
	    expVar, sample, sampMean, sampSampMean, tmpargs, unexpVar, i, j;
	    if (args.length === 1) {
	      tmpargs = new Array(args[0].length);
	      for (i = 0; i < args[0].length; i++) {
	        tmpargs[i] = args[0][i];
	      }
	      args = tmpargs;
	    }
	    // 2 sample case
	    if (args.length === 2) {
	      return jStat.variance(args[0]) / jStat.variance(args[1]);
	    }
	    // Builds sample array
	    sample = new Array();
	    for (i = 0; i < args.length; i++) {
	      sample = sample.concat(args[i]);
	    }
	    sampMean = jStat.mean(sample);
	    // Computes the explained variance
	    expVar = 0;
	    for (i = 0; i < args.length; i++) {
	      expVar = expVar + args[i].length * Math.pow(jStat.mean(args[i]) - sampMean, 2);
	    }
	    expVar /= (args.length - 1);
	    // Computes unexplained variance
	    unexpVar = 0;
	    for (i = 0; i < args.length; i++) {
	      sampSampMean = jStat.mean(args[i]);
	      for (j = 0; j < args[i].length; j++) {
	        unexpVar += Math.pow(args[i][j] - sampSampMean, 2);
	      }
	    }
	    unexpVar /= (sample.length - args.length);
	    return expVar / unexpVar;
	  },

	  // 2 different paramter setups
	  // (array1, array2, array3, ...)
	  // (anovafscore, df1, df2)
	  anovaftest: function anovaftest() {
	    var args = slice.call(arguments),
	    df1, df2, n, i;
	    if (isNumber(args[0])) {
	      return 1 - jStat.centralF.cdf(args[0], args[1], args[2]);
	    }
	    anovafscore = jStat.anovafscore(args);
	    df1 = args.length - 1;
	    n = 0;
	    for (i = 0; i < args.length; i++) {
	      n = n + args[i].length;
	    }
	    df2 = n - df1 - 1;
	    return 1 - jStat.centralF.cdf(anovafscore, df1, df2);
	  },

	  ftest: function ftest(fscore, df1, df2) {
	    return 1 - jStat.centralF.cdf(fscore, df1, df2);
	  }
	});

	jStat.extend(jStat.fn, {
	  anovafscore: function anovafscore() {
	    return jStat.anovafscore(this.toArray());
	  },

	  anovaftes: function anovaftes() {
	    var n = 0;
	    var i;
	    for (i = 0; i < this.length; i++) {
	      n = n + this[i].length;
	    }
	    return jStat.ftest(this.anovafscore(), this.length - 1, n - this.length);
	  }
	});

	// Error Bounds
	jStat.extend({
	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  normalci: function normalci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.normal.inv(args[1] / 2, 0, 1) *
	                        jStat.stdev(args[2]) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },

	  // 2 different parameter setups
	  // (value, alpha, sd, n)
	  // (value, alpha, array)
	  tci: function tci() {
	    var args = slice.call(arguments),
	    ans = new Array(2),
	    change;
	    if (args.length === 4) {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[3] - 1) *
	                        args[2] / Math.sqrt(args[3]));
	    } else {
	      change = Math.abs(jStat.studentt.inv(args[1] / 2, args[2].length - 1) *
	                        jStat.stdev(args[2], true) / Math.sqrt(args[2].length));
	    }
	    ans[0] = args[0] - change;
	    ans[1] = args[0] + change;
	    return ans;
	  },

	  significant: function significant(pvalue, alpha) {
	    return pvalue < alpha;
	  }
	});

	jStat.extend(jStat.fn, {
	  normalci: function normalci(value, alpha) {
	    return jStat.normalci(value, alpha, this.toArray());
	  },

	  tci: function tci(value, alpha) {
	    return jStat.tci(value, alpha, this.toArray());
	  }
	});

	}(this.jStat, Math));


/***/ }
/******/ ])
});
