/**
 * filesize
 *
 * @copyright 2022 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 9.0.7
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.filesize = factory());
})(this, (function () { 'use strict';

	var strings = {
	  symbol: {
	    iec: {
	      bits: ["bit", "Kibit", "Mibit", "Gibit", "Tibit", "Pibit", "Eibit", "Zibit", "Yibit"],
	      bytes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
	    },
	    jedec: {
	      bits: ["bit", "Kbit", "Mbit", "Gbit", "Tbit", "Pbit", "Ebit", "Zbit", "Ybit"],
	      bytes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
	    }
	  },
	  fullform: {
	    iec: ["", "kibi", "mebi", "gibi", "tebi", "pebi", "exbi", "zebi", "yobi"],
	    jedec: ["", "kilo", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta"]
	  }
	};

	/**
	 * filesize
	 *
	 * @method filesize
	 * @param  {Mixed}   arg        String, Int or Float to transform
	 * @param  {Object}  descriptor [Optional] Flags
	 * @return {String}             Readable file size String
	 */

	function filesize(arg) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$bits = _ref.bits,
	      bits = _ref$bits === void 0 ? false : _ref$bits,
	      _ref$pad = _ref.pad,
	      pad = _ref$pad === void 0 ? false : _ref$pad,
	      _ref$base = _ref.base,
	      base = _ref$base === void 0 ? -1 : _ref$base,
	      _ref$round = _ref.round,
	      round = _ref$round === void 0 ? 2 : _ref$round,
	      _ref$locale = _ref.locale,
	      locale = _ref$locale === void 0 ? "" : _ref$locale,
	      _ref$localeOptions = _ref.localeOptions,
	      localeOptions = _ref$localeOptions === void 0 ? {} : _ref$localeOptions,
	      _ref$separator = _ref.separator,
	      separator = _ref$separator === void 0 ? "" : _ref$separator,
	      _ref$spacer = _ref.spacer,
	      spacer = _ref$spacer === void 0 ? " " : _ref$spacer,
	      _ref$symbols = _ref.symbols,
	      symbols = _ref$symbols === void 0 ? {} : _ref$symbols,
	      _ref$standard = _ref.standard,
	      standard = _ref$standard === void 0 ? "" : _ref$standard,
	      _ref$output = _ref.output,
	      output = _ref$output === void 0 ? "string" : _ref$output,
	      _ref$fullform = _ref.fullform,
	      fullform = _ref$fullform === void 0 ? false : _ref$fullform,
	      _ref$fullforms = _ref.fullforms,
	      fullforms = _ref$fullforms === void 0 ? [] : _ref$fullforms,
	      _ref$exponent = _ref.exponent,
	      exponent = _ref$exponent === void 0 ? -1 : _ref$exponent,
	      _ref$roundingMethod = _ref.roundingMethod,
	      roundingMethod = _ref$roundingMethod === void 0 ? "round" : _ref$roundingMethod,
	      _ref$precision = _ref.precision,
	      precision = _ref$precision === void 0 ? 0 : _ref$precision;

	  var e = exponent,
	      num = Number(arg),
	      result = [],
	      val = 0,
	      u = ""; // Sync base & standard

	  if (base === -1 && standard.length === 0) {
	    base = 10;
	    standard = "iec";
	  } else if (base === -1 && standard.length > 0) {
	    standard = standard === "iec" ? "iec" : "jedec";
	    base = standard === "iec" ? 10 : 2;
	  } else {
	    base = base === 2 ? 2 : 10;
	    standard = base === 10 ? "iec" : "jedec";
	  }

	  var ceil = base === 10 ? 1000 : 1024,
	      full = fullform === true,
	      neg = num < 0,
	      roundingFunc = Math[roundingMethod];

	  if (isNaN(arg)) {
	    throw new TypeError("Invalid number");
	  }

	  if (typeof roundingFunc !== "function") {
	    throw new TypeError("Invalid rounding method");
	  } // Flipping a negative number to determine the size


	  if (neg) {
	    num = -num;
	  } // Determining the exponent


	  if (e === -1 || isNaN(e)) {
	    e = Math.floor(Math.log(num) / Math.log(ceil));

	    if (e < 0) {
	      e = 0;
	    }
	  } // Exceeding supported length, time to reduce & multiply


	  if (e > 8) {
	    if (precision > 0) {
	      precision += 8 - e;
	    }

	    e = 8;
	  }

	  if (output === "exponent") {
	    return e;
	  } // Zero is now a special case because bytes divide by 1


	  if (num === 0) {
	    result[0] = 0;
	    u = result[1] = strings.symbol[standard][bits ? "bits" : "bytes"][e];
	  } else {
	    val = num / (base === 2 ? Math.pow(2, e * 10) : Math.pow(1000, e));

	    if (bits) {
	      val = val * 8;

	      if (val >= ceil && e < 8) {
	        val = val / ceil;
	        e++;
	      }
	    }

	    var p = Math.pow(10, e > 0 ? round : 0);
	    result[0] = roundingFunc(val * p) / p;

	    if (result[0] === ceil && e < 8 && exponent === -1) {
	      result[0] = 1;
	      e++;
	    }

	    u = result[1] = strings.symbol[standard][bits ? "bits" : "bytes"][e];
	  } // Decorating a 'diff'


	  if (neg) {
	    result[0] = -result[0];
	  } // Setting optional precision


	  if (precision > 0) {
	    result[0] = result[0].toPrecision(precision);
	  } // Applying custom symbol


	  result[1] = symbols[result[1]] || result[1];

	  if (locale === true) {
	    result[0] = result[0].toLocaleString();
	  } else if (locale.length > 0) {
	    result[0] = result[0].toLocaleString(locale, localeOptions);
	  } else if (separator.length > 0) {
	    result[0] = result[0].toString().replace(".", separator);
	  }

	  if (pad && Number.isInteger(result[0]) === false && round > 0) {
	    var x = separator || ".",
	        tmp = result[0].toString().split(x),
	        s = tmp[1] || "",
	        l = s.length,
	        n = round - l;
	    result[0] = "".concat(tmp[0]).concat(x).concat(s.padEnd(l + n, "0"));
	  }

	  if (full) {
	    result[1] = fullforms[e] ? fullforms[e] : strings.fullform[standard][e] + (bits ? "bit" : "byte") + (result[0] === 1 ? "" : "s");
	  } // Returning Array, Object, or String (default)


	  return output === "array" ? result : output === "object" ? {
	    value: result[0],
	    symbol: result[1],
	    exponent: e,
	    unit: u
	  } : result.join(spacer);
	} // Partial application for functional programming


	filesize.partial = function (opt) {
	  return function (arg) {
	    return filesize(arg, opt);
	  };
	};

	return filesize;

}));
