/*!
 * accounting.js javascript library v0.1.2
 * https://josscrowcroft.github.com/accounting.js/
 *
 * Copyright 2011 by Joss Crowcroft
 * Licensed under GPL v3 | http://www.gnu.org/licenses/gpl-3.0.txt
 */
var accounting = (function () {
	
	/**
	 * Removes currency formatting from a number or array of numbers, returning numeric values
	 * 
	 * Decimal must be included in the regular expression to match floats (default: ".")
	 * To do: rewrite this to be a little more elegant and maybe throw useful errors.
	 */
	function unformat(number, decimal) {
		// Recursively unformat arrays:
		if (typeof number === "object" && number.length > 1) {
			for (var i = 0, values = []; i < number.length;
				values.push(unformat(number[i], decimal)), i++
			);
			return values;
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
		precision = isNaN(precision = Math.abs(precision)) ? 0 : precision;
		var power = Math.pow(10, precision);
		
		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(value * power) / power).toFixed(precision);
	}
	
	
	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * 
	 * Localise by overriding the precision and thousand / decimal separators
	 */
	function formatNumber(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (typeof number === "object" && number.length > 1) {
			for (var i = 0, values = []; i < number.length;
				values.push(formatNumber(number[i], precision, thousand, decimal)) && i++
			);
			return values;
		}
		
		// Clean up parameters:
		number = unformat(number);
		precision = isNaN(precision = Math.abs(precision)) ? 0 : precision;
		thousand = !thousand ? "," : thousand;
		decimal = !decimal ? "." : decimal;
		
		// Do some calc:
		var negative = number < 0 ? "-" : "",
		    base = parseInt(toFixed(Math.abs(number || 0), precision), 10) + "",
		    mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (precision ? decimal + toFixed(Math.abs(number), precision).split('.')[1] : "");
	}


	/**
	 * Format a number into currency
	 * 
	 * Usage: accounting.formatMoney(number, precision, symbol, thousandsSep, decimalSep)
	 * defaults: (0, 2, "$", ",", ".")
	 * 
	 * Localise by overriding the precision and thousand / decimal separators
	 * Second param can be an object with keys matching the param names
	 */
	function formatMoney(number, symbol, precision, thousand, decimal) {
		var symbolAfter;
		
		// Second param can be an object:
		if (typeof symbol === "object") {
			precision = symbol.precision;
			thousand = symbol.thousand;
			decimal = symbol.decimal;
			symbolAfter = symbol.symbolAfter;
			symbol = symbol.symbol;
		}

		// formatMoney's default precision is 2 decimal places:
		precision = !isNaN(precision = Math.abs(precision)) ? precision : 2;
		
		// Default symbol is '$':
		symbol = symbol !== undefined ? symbol : "$";
		
		// Default  symbol position is before value:
		if (typeof symbolAfter === "undefined") {
			symbolAfter = false;
		}
		
		// Format the number:
		var formatted = formatNumber(number, precision, thousand, decimal);
		
		// Return with currency symbol added:
		return symbolAfter ? formatted + symbol : symbol + formatted;
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
		// (tl;dr: `symbol` = "$" [default] if no symbol set, or else `opts.symbol` if set, or else just `symbol`)
		symbol = (!symbol ? "$" : symbol.symbol ? symbol.symbol : symbol);
		
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
		formatMoney: formatMoney,
		formatNumber: formatNumber,
		formatColumn: formatColumn,
		toFixed: toFixed,
		unformat: unformat
	};
}());