/*!
 * accounting.js javascript library v0.1
 * https://github.com/josscrowcroft/accounting.js
 *
 * Copyright 2011 by Joss Crowcroft
 * Licensed under GPL v3 | http://www.gnu.org/licenses/gpl-3.0.txt
 */
var accounting = (function () {
	
	/**
	 * Removes currency formatting from a number or array of numbers, returning numeric values
	 * 
	 * Decimal must be included in the regular expression to match floats (default: ".")
	 */
	function unformat(number, decimal) {
		// Recursively unformat arrays:
		if (typeof number === "object" && number.length > 1) {
			for (var i = 0, values = []; i < number.length;
				values.push(unformat(number[i], decimal)), i++
			)
			return values;
		}
		
		// Default decimal point is "." but could be set to eg. ",":
	    decimal = decimal || ".";
	    
	    // Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]);
		
		// Perform the unformatting regex if number is a single value:
		return parseFloat(("" + number).replace(regex, '').replace(decimal, '.'));
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
			)
			return values;
		}
		
		// Clean up parameters:
		number = unformat(number);
		precision = isNaN(precision = Math.abs(precision)) ? 0 : precision;
		thousand = !thousand ? "," : thousand;
		decimal = !decimal ? "." : decimal;
		
		// Do some calc:
		var negative = number < 0 ? "-" : "",
		    base = parseInt(number = Math.abs(+number || 0).toFixed(precision), 10) + "",
		    mod = base.length > 3 ? base.length % 3 : 0;
		
		// Format the number:
		return negative + (mod ? base.substr(0, mod) + thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (precision ? decimal + Math.abs(number - base).toFixed(precision).slice(2) : "");
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
		
		// Format the numbers according to options, and store the length of
		// the longest string in the array:
		for (i = 0; i < list.length; i++) {
			formatted.push(formatMoney(list[i], symbol, precision, thousand, decimal));
			
			if (formatted[i].length > maxLength) {
				maxLength = formatted[i].length;
			}
		}
		
		
		// Second param can be an object, but symbol is needed for next part:
		if (typeof symbol === "object") {
			symbol = symbol.symbol;
		}
		if (typeof symbol === undefined) {
			symbol = "$";
		}
		
		// Add space between currency symbol and number to pad strings:
		for (i = 0; i < formatted.length; i++) {
			if (formatted[i].length < maxLength) {
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
		unformat: unformat
	};
}());