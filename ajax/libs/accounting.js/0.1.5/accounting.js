/*!
 * accounting.js javascript library v0.1.4
 * https://josscrowcroft.github.com/accounting.js/
 *
 * Copyright 2011 by Joss Crowcroft
 * Licensed under GPL v3 | http://www.gnu.org/licenses/gpl-3.0.txt
 */
var accounting = (function () {

	/* ===== Library Settings ===== */

	/**
	 * The library's settings configuration object
	 * 
	 * Contains default parameters for currency and number formatting
	 */
	var settings = {
		currency: {
			symbol : "$",   // default currency symbol is '$'
			format: "%s%v", // this controls string output: %s = symbol, %v = value/number
			decimal : ".",  // decimal point separator
			thousand: ",",  // thousands separator
			precision : 2,  // decimal places
			grouping : 3    // digit grouping (not implemented yet)
		},
		number: {
			precision : 0,	// default precision on numbers is 0
			grouping : 3,   // digit grouping (not implemented yet)
			thousand: ",",
			decimal : "."
		}
	};


	/* ===== Internal Helper Methods ===== */

	// Store reference to possibly-available ECMAScript 5 methods for later:
    var nativeMap = Array.prototype.map;

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 * 
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defaults) {
		var key;
		// Iterate over object non-prototype properties:
		for (key in defaults) {
			if (defaults.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defaults[key];
			}
		}
		return object;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer):
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
    function map(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;

        // Use native .map method if it exists:
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

        // Fallback for native .map:
        for (var i = 0; i < obj.length; i++ ) {
            results[i] = iterator.call(context, obj[i], i, obj);
        }
        return results;
    }
    

	/* ===== API Methods ===== */

	/**
	 * Removes currency formatting from a number/array of numbers, returning numeric values
	 * 
	 * Decimal must be included in the regular expression to match floats (default: ".")
	 * To do: rewrite this to be a little more elegant and maybe throw useful errors.
	 */
	function unformat(number, decimal) {
		// Recursively unformat arrays:
		if (typeof number === "object") {
			return map(number, function(val) {
                return unformat(val, decimal);
            });
		}

		// Fails silently (need decent errors):
		number = number || 0;

		// Default decimal point is "." but could be set to eg. ",":
	    decimal = decimal || ".";
	    
	    // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
		    unformatted = parseFloat(("" + number).replace(regex, '').replace(decimal, '.'));

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	}


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 * 
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present 
	 * problems for accounting- and finance-related software.
	 */
	function toFixed(value, precision) {
		precision = checkPrecision(precision, settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(value * power) / power).toFixed(precision);
	}


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * 
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	function formatNumber(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (typeof number === "object") {
			return map(number, function(val) {
                return formatNumber(val, precision, thousand, decimal);
            });
        }

		// Number isn't an array - do the formatting:
		var result, opts;

		// Second param precision can be an object matching settings.number:
		opts = (typeof precision === "object") ? precision : {
			precision: precision,
			thousand : thousand,
			decimal : decimal
		};

		// Extend opts with the default values in settings.number:
		opts = defaults(opts, settings.number);

		// Clean up number and precision:
		number = unformat(number);
		opts.precision = checkPrecision(opts.precision);

		// Do some calc:
		var negative = number < 0 ? "-" : "",
		    base = parseInt(toFixed(Math.abs(number || 0), opts.precision), 10) + "",
		    mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (opts.precision ? opts.decimal + toFixed(Math.abs(number), opts.precision).split('.')[1] : "");
	}


	/**
	 * Format a number into currency
	 * 
	 * Usage: accounting.formatMoney(number, precision, symbol, thousandsSep, decimalSep, format)
	 * defaults: (0, 2, "$", ",", ".", "%s%v")
	 * 
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 * 
	 * To do: tidy up the parameters
	 */
	function formatMoney(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (typeof number === "object") {
			return map(number, function(val){
                return formatMoney(val, symbol, precision, thousand, decimal, format);
            });
		}

		// Second param can be an object matching settings.currency:
		var opts = (typeof symbol === "object") ? symbol : {
			symbol : symbol,
			precision : precision,
			thousand : thousand,
			decimal : decimal,
			format : format
		};

		// Check precision value is ok:
		opts.precision = checkPrecision(opts.precision);

		// Extend opts with the default values in settings.number:
		opts = defaults(opts, settings.currency);

		// Return with currency symbol added:
		return opts.format.replace('%s', opts.symbol).replace('%v', formatNumber(number, opts.precision, opts.thousand, opts.decimal));
	}


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 * 
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 * 
	 * Returns array of accouting-formatted number strings of same length
	 * 
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	function formatColumn(list, symbol, precision, thousand, decimal) {
		if (!list) {
			return [];
		}

		var maxLength = 0,
		    formatted = [],
		    i;

		// Format the list according to options, store the length of the longest string:
		// Performs recursive formatting of nested arrays
		for (i = 0; i < list.length; i++) {
			if (typeof list[i] === "object") {
				// Recursively format columns if list is a multi-dimensional array:
				formatted.push(formatColumn(list[i], symbol, precision, thousand, decimal));
			} else {
				// Format this number, push into formatted list and save the length:
				formatted.push(formatMoney(list[i], symbol, precision, thousand, decimal));
				if (formatted[i].length > maxLength) {
					maxLength = formatted[i].length;
				}
			}
		}


		// Second param can be an object, but symbol is needed for next part, so get it:
		// tl;dr: `symbol` = default if no symbol set, or else `opts.symbol` if set, or else just `symbol`
		symbol = (!symbol ? settings.currency.symbol : symbol.symbol ? symbol.symbol : symbol);

		// Add space between currency symbol and number to pad strings:
		for (i = 0; i < formatted.length; i++) {
			// Only if this is a string (not a nested array):
			if (typeof formatted[i] === "string" && formatted[i].length < maxLength) {
				// Match first number in string and add enough padding:
				formatted[i] = formatted[i].replace(
					/(-?\d+)/,
					(new Array((maxLength - formatted[i].length) + 1).join(" ")) + "$1"
				);
			}
		}

		// Send back the list of numbers:
		return formatted;
	}


	// Return the library's API:
	return {
		settings: settings,
		formatMoney: formatMoney,
		formatNumber: formatNumber,
		formatColumn: formatColumn,
		toFixed: toFixed,
		unformat: unformat
	};
}());
