/**
 * Globalize v1.2.3
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2017-03-17T01:41Z
 */
/*!
 * Globalize v1.2.3 2017-03-17T01:41Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize",
			"cldr/event",
			"cldr/supplemental"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "../globalize" ) );
	} else {

		// Global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var createError = Globalize._createError,
	regexpEscape = Globalize._regexpEscape,
	runtimeBind = Globalize._runtimeBind,
	stringPad = Globalize._stringPad,
	validateCldr = Globalize._validateCldr,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterRange = Globalize._validateParameterRange,
	validateParameterType = Globalize._validateParameterType,
	validateParameterTypePlainObject = Globalize._validateParameterTypePlainObject;


var createErrorUnsupportedFeature = function( feature ) {
	return createError( "E_UNSUPPORTED", "Unsupported {feature}.", {
		feature: feature
	});
};




var validateParameterTypeNumber = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "number",
		"Number"
	);
};




var validateParameterTypeString = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string",
		"a string"
	);
};




/**
 * goupingSeparator( number, primaryGroupingSize, secondaryGroupingSize )
 *
 * @number [Number].
 *
 * @primaryGroupingSize [Number]
 *
 * @secondaryGroupingSize [Number]
 *
 * Return the formatted number with group separator.
 */
var numberFormatGroupingSeparator = function( number, primaryGroupingSize, secondaryGroupingSize ) {
	var index,
		currentGroupingSize = primaryGroupingSize,
		ret = "",
		sep = ",",
		switchToSecondary = secondaryGroupingSize ? true : false;

	number = String( number ).split( "." );
	index = number[ 0 ].length;

	while ( index > currentGroupingSize ) {
		ret = number[ 0 ].slice( index - currentGroupingSize, index ) +
			( ret.length ? sep : "" ) + ret;
		index -= currentGroupingSize;
		if ( switchToSecondary ) {
			currentGroupingSize = secondaryGroupingSize;
			switchToSecondary = false;
		}
	}

	number[ 0 ] = number[ 0 ].slice( 0, index ) + ( ret.length ? sep : "" ) + ret;
	return number.join( "." );
};




/**
 * integerFractionDigits( number, minimumIntegerDigits, minimumFractionDigits,
 * maximumFractionDigits, round, roundIncrement )
 *
 * @number [Number]
 *
 * @minimumIntegerDigits [Number]
 *
 * @minimumFractionDigits [Number]
 *
 * @maximumFractionDigits [Number]
 *
 * @round [Function]
 *
 * @roundIncrement [Function]
 *
 * Return the formatted integer and fraction digits.
 */
var numberFormatIntegerFractionDigits = function( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round,
	roundIncrement ) {

	// Fraction
	if ( maximumFractionDigits ) {

		// Rounding
		if ( roundIncrement ) {
			number = round( number, roundIncrement );

		// Maximum fraction digits
		} else {
			number = round( number, { exponent: -maximumFractionDigits } );
		}

		// Minimum fraction digits
		if ( minimumFractionDigits ) {
			number = String( number ).split( "." );
			number[ 1 ] = stringPad( number[ 1 ] || "", minimumFractionDigits, true );
			number = number.join( "." );
		}
	} else {
		number = round( number );
	}

	number = String( number );

	// Minimum integer digits
	if ( minimumIntegerDigits ) {
		number = number.split( "." );
		number[ 0 ] = stringPad( number[ 0 ], minimumIntegerDigits );
		number = number.join( "." );
	}

	return number;
};




/**
 * toPrecision( number, precision, round )
 *
 * @number (Number)
 *
 * @precision (Number) significant figures precision (not decimal precision).
 *
 * @round (Function)
 *
 * Return number.toPrecision( precision ) using the given round function.
 */
var numberToPrecision = function( number, precision, round ) {
	var roundOrder;

	// Get number at two extra significant figure precision.
	number = number.toPrecision( precision + 2 );

	// Then, round it to the required significant figure precision.
	roundOrder = Math.ceil( Math.log( Math.abs( number ) ) / Math.log( 10 ) );
	roundOrder -= precision;

	return round( number, { exponent: roundOrder } );
};




/**
 * toPrecision( number, minimumSignificantDigits, maximumSignificantDigits, round )
 *
 * @number [Number]
 *
 * @minimumSignificantDigits [Number]
 *
 * @maximumSignificantDigits [Number]
 *
 * @round [Function]
 *
 * Return the formatted significant digits number.
 */
var numberFormatSignificantDigits = function( number, minimumSignificantDigits, maximumSignificantDigits, round ) {
	var atMinimum, atMaximum;

	// Sanity check.
	if ( minimumSignificantDigits > maximumSignificantDigits ) {
		maximumSignificantDigits = minimumSignificantDigits;
	}

	atMinimum = numberToPrecision( number, minimumSignificantDigits, round );
	atMaximum = numberToPrecision( number, maximumSignificantDigits, round );

	// Use atMaximum only if it has more significant digits than atMinimum.
	number = +atMinimum === +atMaximum ? atMinimum : atMaximum;

	// Expand integer numbers, eg. 123e5 to 12300.
	number = ( +number ).toString( 10 );

	if ( ( /e/ ).test( number ) ) {
		throw createErrorUnsupportedFeature({
			feature: "integers out of (1e21, 1e-7)"
		});
	}

	// Add trailing zeros if necessary.
	if ( minimumSignificantDigits - number.replace( /^0+|\./g, "" ).length > 0 ) {
		number = number.split( "." );
		number[ 1 ] = stringPad( number[ 1 ] || "", minimumSignificantDigits - number[ 0 ].replace( /^0+/, "" ).length, true );
		number = number.join( "." );
	}

	return number;
};




/**
 * removeLiteralQuotes( string )
 *
 * Return:
 * - `` if input string is `''`.
 * - `o'clock` if input string is `'o''clock'`.
 * - `foo` if input string is `foo`, i.e., return the same value in case it isn't a single-quoted
 *   string.
 */
var removeLiteralQuotes = function( string ) {
	if ( string[ 0 ] + string[ string.length - 1 ] !== "''" ) {
		return string;
	}
	if ( string === "''" ) {
		return "";
	}
	return string.replace( /''/g, "'" ).slice( 1, -1 );
};




/**
 * format( number, properties )
 *
 * @number [Number].
 *
 * @properties [Object] Output of number/format-properties.
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
var numberFormat = function( number, properties ) {
	var infinitySymbol, maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
	minimumIntegerDigits, minimumSignificantDigits, nanSymbol, nuDigitsMap, padding, prefix,
	primaryGroupingSize, pattern, ret, round, roundIncrement, secondaryGroupingSize, suffix,
	symbolMap;

	padding = properties[ 1 ];
	minimumIntegerDigits = properties[ 2 ];
	minimumFractionDigits = properties[ 3 ];
	maximumFractionDigits = properties[ 4 ];
	minimumSignificantDigits = properties[ 5 ];
	maximumSignificantDigits = properties[ 6 ];
	roundIncrement = properties[ 7 ];
	primaryGroupingSize = properties[ 8 ];
	secondaryGroupingSize = properties[ 9 ];
	round = properties[ 15 ];
	infinitySymbol = properties[ 16 ];
	nanSymbol = properties[ 17 ];
	symbolMap = properties[ 18 ];
	nuDigitsMap = properties[ 19 ];

	// NaN
	if ( isNaN( number ) ) {
		return nanSymbol;
	}

	if ( number < 0 ) {
		pattern = properties[ 12 ];
		prefix = properties[ 13 ];
		suffix = properties[ 14 ];
	} else {
		pattern = properties[ 11 ];
		prefix = properties[ 0 ];
		suffix = properties[ 10 ];
	}

	// Infinity
	if ( !isFinite( number ) ) {
		return prefix + infinitySymbol + suffix;
	}

	ret = prefix;

	// Percent
	if ( pattern.indexOf( "%" ) !== -1 ) {
		number *= 100;

	// Per mille
	} else if ( pattern.indexOf( "\u2030" ) !== -1 ) {
		number *= 1000;
	}

	// Significant digit format
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) ) {
		number = numberFormatSignificantDigits( number, minimumSignificantDigits,
			maximumSignificantDigits, round );

	// Integer and fractional format
	} else {
		number = numberFormatIntegerFractionDigits( number, minimumIntegerDigits,
			minimumFractionDigits, maximumFractionDigits, round, roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			secondaryGroupingSize );
	}

	ret += number;

	// Scientific notation
	// TODO implement here

	// Padding/'([^']|'')+'|''|[.,\-+E%\u2030]/g
	// TODO implement here

	ret += suffix;

	return ret.replace( /('([^']|'')+'|'')|./g, function( character, literal ) {

		// Literals
		if ( literal ) {
			return removeLiteralQuotes( literal );
		}

		// Symbols
		character = character.replace( /[.,\-+E%\u2030]/, function( symbol ) {
			return symbolMap[ symbol ];
		});

		// Numbering system
		if ( nuDigitsMap ) {
			character = character.replace( /[0-9]/, function( digit ) {
				return nuDigitsMap[ +digit ];
			});
		}

		return character;
	});
};




var numberFormatterFn = function( properties ) {
	return function numberFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return numberFormat( value, properties );
	};
};




/**
 * NumberingSystem( cldr )
 *
 * - http://www.unicode.org/reports/tr35/tr35-numbers.html#otherNumberingSystems
 * - http://cldr.unicode.org/index/bcp47-extension
 * - http://www.unicode.org/reports/tr35/#u_Extension
 */
var numberNumberingSystem = function( cldr ) {
	var nu = cldr.attributes[ "u-nu" ];

	if ( nu ) {
		if ( nu === "traditio" ) {
			nu = "traditional";
		}
		if ( [ "native", "traditional", "finance" ].indexOf( nu ) !== -1 ) {

			// Unicode locale extension `u-nu` is set using either (native, traditional or
			// finance). So, lookup the respective locale's numberingSystem and return it.
			return cldr.main([ "numbers/otherNumberingSystems", nu ]);
		}

		// Unicode locale extension `u-nu` is set with an explicit numberingSystem. Return it.
		return nu;
	}

	// Return the default numberingSystem.
	return cldr.main( "numbers/defaultNumberingSystem" );
};




/**
 * nuMap( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return digits map if numbering system is different than `latn`.
 */
var numberNumberingSystemDigitsMap = function( cldr ) {
	var aux,
		nu = numberNumberingSystem( cldr );

	if ( nu === "latn" ) {
		return;
	}

	aux = cldr.supplemental([ "numberingSystems", nu ]);

	if ( aux._type !== "numeric" ) {
		throw createErrorUnsupportedFeature( "`" + aux._type + "` numbering system" );
	}

	return aux._digits;
};




/**
 * EBNF representation:
 *
 * number_pattern_re =        prefix?
 *                            padding?
 *                            (integer_fraction_pattern | significant_pattern)
 *                            scientific_notation?
 *                            suffix?
 *
 * prefix =                   non_number_stuff
 *
 * padding =                  "*" regexp(.)
 *
 * integer_fraction_pattern = integer_pattern
 *                            fraction_pattern?
 *
 * integer_pattern =          regexp([#,]*[0,]*0+)
 *
 * fraction_pattern =         "." regexp(0*[0-9]*#*)
 *
 * significant_pattern =      regexp([#,]*@+#*)
 *
 * scientific_notation =      regexp(E\+?0+)
 *
 * suffix =                   non_number_stuff
 *
 * non_number_stuff =         regexp(('[^']+'|''|[^*#@0,.E])*)
 *
 *
 * Regexp groups:
 *
 *  0: number_pattern_re
 *  1: prefix
 *  2: -
 *  3: -
 *  4: padding
 *  5: (integer_fraction_pattern | significant_pattern)
 *  6: integer_fraction_pattern
 *  7: integer_pattern
 *  8: fraction_pattern
 *  9: significant_pattern
 * 10: scientific_notation
 * 11: suffix
 * 12: -
 */
var numberPatternRe = ( /^(('([^']|'')*'|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/ );




/**
 * format( number, pattern )
 *
 * @number [Number].
 *
 * @pattern [String] raw pattern for numbers.
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
var numberPatternProperties = function( pattern ) {
	var aux1, aux2, fractionPattern, integerFractionOrSignificantPattern, integerPattern,
		maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
		minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize,
		roundIncrement, scientificNotation, secondaryGroupingSize, significantPattern, suffix;

	pattern = pattern.match( numberPatternRe );
	if ( !pattern ) {
		throw new Error( "Invalid pattern: " + pattern );
	}

	prefix = pattern[ 1 ];
	padding = pattern[ 4 ];
	integerFractionOrSignificantPattern = pattern[ 5 ];
	significantPattern = pattern[ 9 ];
	scientificNotation = pattern[ 10 ];
	suffix = pattern[ 11 ];

	// Significant digit format
	if ( significantPattern ) {
		significantPattern.replace( /(@+)(#*)/, function( match, minimumSignificantDigitsMatch, maximumSignificantDigitsMatch ) {
			minimumSignificantDigits = minimumSignificantDigitsMatch.length;
			maximumSignificantDigits = minimumSignificantDigits +
				maximumSignificantDigitsMatch.length;
		});

	// Integer and fractional format
	} else {
		fractionPattern = pattern[ 8 ];
		integerPattern = pattern[ 7 ];

		if ( fractionPattern ) {

			// Minimum fraction digits, and rounding.
			fractionPattern.replace( /[0-9]+/, function( match ) {
				minimumFractionDigits = match;
			});
			if ( minimumFractionDigits ) {
				roundIncrement = +( "0." + minimumFractionDigits );
				minimumFractionDigits = minimumFractionDigits.length;
			} else {
				minimumFractionDigits = 0;
			}

			// Maximum fraction digits
			// 1: ignore decimal character
			maximumFractionDigits = fractionPattern.length - 1 /* 1 */;
		}

		// Minimum integer digits
		integerPattern.replace( /0+$/, function( match ) {
			minimumIntegerDigits = match.length;
		});
	}

	// Scientific notation
	if ( scientificNotation ) {
		throw createErrorUnsupportedFeature({
			feature: "scientific notation (not implemented)"
		});
	}

	// Padding
	if ( padding ) {
		throw createErrorUnsupportedFeature({
			feature: "padding (not implemented)"
		});
	}

	// Grouping
	if ( ( aux1 = integerFractionOrSignificantPattern.lastIndexOf( "," ) ) !== -1 ) {

		// Primary grouping size is the interval between the last group separator and the end of
		// the integer (or the end of the significant pattern).
		aux2 = integerFractionOrSignificantPattern.split( "." )[ 0 ];
		primaryGroupingSize = aux2.length - aux1 - 1;

		// Secondary grouping size is the interval between the last two group separators.
		if ( ( aux2 = integerFractionOrSignificantPattern.lastIndexOf( ",", aux1 - 1 ) ) !== -1 ) {
			secondaryGroupingSize = aux1 - 1 - aux2;
		}
	}

	// Return:
	//  0: @prefix String
	//  1: @padding Array [ <character>, <count> ] TODO
	//  2: @minimumIntegerDigits non-negative integer Number value indicating the minimum integer
	//        digits to be used. Numbers will be padded with leading zeroes if necessary.
	//  3: @minimumFractionDigits and
	//  4: @maximumFractionDigits are non-negative integer Number values indicating the minimum and
	//        maximum fraction digits to be used. Numbers will be rounded or padded with trailing
	//        zeroes if necessary.
	//  5: @minimumSignificantDigits and
	//  6: @maximumSignificantDigits are positive integer Number values indicating the minimum and
	//        maximum fraction digits to be shown. Either none or both of these properties are
	//        present; if they are, they override minimum and maximum integer and fraction digits
	//        – the formatter uses however many integer and fraction digits are required to display
	//        the specified number of significant digits.
	//  7: @roundIncrement Decimal round increment or null
	//  8: @primaryGroupingSize
	//  9: @secondaryGroupingSize
	// 10: @suffix String
	return [
		prefix,
		padding,
		minimumIntegerDigits,
		minimumFractionDigits,
		maximumFractionDigits,
		minimumSignificantDigits,
		maximumSignificantDigits,
		roundIncrement,
		primaryGroupingSize,
		secondaryGroupingSize,
		suffix
	];
};




/**
 * Symbol( name, cldr )
 *
 * @name [String] Symbol name.
 *
 * @cldr [Cldr instance].
 *
 * Return the localized symbol given its name.
 */
var numberSymbol = function( name, cldr ) {
	return cldr.main([
		"numbers/symbols-numberSystem-" + numberNumberingSystem( cldr ),
		name
	]);
};




var numberSymbolName = {
	".": "decimal",
	",": "group",
	"%": "percentSign",
	"+": "plusSign",
	"-": "minusSign",
	"E": "exponential",
	"\u2030": "perMille"
};




/**
 * symbolMap( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return the (localized symbol, pattern symbol) key value pair, eg. {
 *   ".": "٫",
 *   ",": "٬",
 *   "%": "٪",
 *   ...
 * };
 */
var numberSymbolMap = function( cldr ) {
	var symbol,
		symbolMap = {};

	for ( symbol in numberSymbolName ) {
		symbolMap[ symbol ] = numberSymbol( numberSymbolName[ symbol ], cldr );
	}

	return symbolMap;
};




var numberTruncate = function( value ) {
	if ( isNaN( value ) ) {
		return NaN;
	}
	return Math[ value < 0 ? "ceil" : "floor" ]( value );
};




/**
 * round( method )
 *
 * @method [String] with either "round", "ceil", "floor", or "truncate".
 *
 * Return function( value, incrementOrExp ):
 *
 *   @value [Number] eg. 123.45.
 *
 *   @incrementOrExp [Number] optional, eg. 0.1; or
 *     [Object] Either { increment: <value> } or { exponent: <value> }
 *
 *   Return the rounded number, eg:
 *   - round( "round" )( 123.45 ): 123;
 *   - round( "ceil" )( 123.45 ): 124;
 *   - round( "floor" )( 123.45 ): 123;
 *   - round( "truncate" )( 123.45 ): 123;
 *   - round( "round" )( 123.45, 0.1 ): 123.5;
 *   - round( "round" )( 123.45, 10 ): 120;
 *
 *   Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 *   Ref: #376
 */
var numberRound = function( method ) {
	method = method || "round";
	method = method === "truncate" ? numberTruncate : Math[ method ];

	return function( value, incrementOrExp ) {
		var exp, increment;

		value = +value;

		// If the value is not a number, return NaN.
		if ( isNaN( value ) ) {
			return NaN;
		}

		// Exponent given.
		if ( typeof incrementOrExp === "object" && incrementOrExp.exponent ) {
			exp = +incrementOrExp.exponent;
			increment = 1;

			if ( exp === 0 ) {
				return method( value );
			}

			// If the exp is not an integer, return NaN.
			if ( !( typeof exp === "number" && exp % 1 === 0 ) ) {
				return NaN;
			}

		// Increment given.
		} else {
			increment = +incrementOrExp || 1;

			if ( increment === 1 ) {
				return method( value );
			}

			// If the increment is not a number, return NaN.
			if ( isNaN( increment ) ) {
				return NaN;
			}

			increment = increment.toExponential().split( "e" );
			exp = +increment[ 1 ];
			increment = +increment[ 0 ];
		}

		// Shift & Round
		value = value.toString().split( "e" );
		value[ 0 ] = +value[ 0 ] / increment;
		value[ 1 ] = value[ 1 ] ? ( +value[ 1 ] - exp ) : -exp;
		value = method( +( value[ 0 ] + "e" + value[ 1 ] ) );

		// Shift back
		value = value.toString().split( "e" );
		value[ 0 ] = +value[ 0 ] * increment;
		value[ 1 ] = value[ 1 ] ? ( +value[ 1 ] + exp ) : exp;
		return +( value[ 0 ] + "e" + value[ 1 ] );
	};
};




/**
 * formatProperties( pattern, cldr [, options] )
 *
 * @pattern [String] raw pattern for numbers.
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]:
 * - minimumIntegerDigits [Number]
 * - minimumFractionDigits, maximumFractionDigits [Number]
 * - minimumSignificantDigits, maximumSignificantDigits [Number]
 * - round [String] "ceil", "floor", "round" (default), or "truncate".
 * - useGrouping [Boolean] default true.
 *
 * Return the processed properties that will be used in number/format.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
var numberFormatProperties = function( pattern, cldr, options ) {
	var negativePattern, negativePrefix, negativeProperties, negativeSuffix, positivePattern,
		roundFn, properties;

	function getOptions( attribute, propertyIndex ) {
		if ( attribute in options ) {
			properties[ propertyIndex ] = options[ attribute ];
		}
	}

	options = options || {};
	pattern = pattern.split( ";" );

	positivePattern = pattern[ 0 ];

	negativePattern = pattern[ 1 ] || "-" + positivePattern;
	negativeProperties = numberPatternProperties( negativePattern );
	negativePrefix = negativeProperties[ 0 ];
	negativeSuffix = negativeProperties[ 10 ];

	// Have runtime code to refer to numberRound() instead of including it explicitly.
	roundFn = numberRound( options.round );
	roundFn.generatorString = function() {
		return "numberRound(" + ( options.round ? "\"" + options.round + "\"" : "" ) + ")";
	};

	properties = numberPatternProperties( positivePattern ).concat([
		positivePattern,
		negativePrefix + positivePattern + negativeSuffix,
		negativePrefix,
		negativeSuffix,
		roundFn,
		numberSymbol( "infinity", cldr ),
		numberSymbol( "nan", cldr ),
		numberSymbolMap( cldr ),
		numberNumberingSystemDigitsMap( cldr )
	]);

	getOptions( "minimumIntegerDigits", 2 );
	getOptions( "minimumFractionDigits", 3 );
	getOptions( "maximumFractionDigits", 4 );
	getOptions( "minimumSignificantDigits", 5 );
	getOptions( "maximumSignificantDigits", 6 );

	// Grouping separators
	if ( options.useGrouping === false ) {
		properties[ 8 ] = null;
	}

	// Normalize number of digits if only one of either minimumFractionDigits or
	// maximumFractionDigits is passed in as an option
	if ( "minimumFractionDigits" in options && !( "maximumFractionDigits" in options ) ) {

		// maximumFractionDigits = Math.max( minimumFractionDigits, maximumFractionDigits );
		properties[ 4 ] = Math.max( properties[ 3 ], properties[ 4 ] );
	} else if ( !( "minimumFractionDigits" in options ) &&
			"maximumFractionDigits" in options ) {

		// minimumFractionDigits = Math.min( minimumFractionDigits, maximumFractionDigits );
		properties[ 3 ] = Math.min( properties[ 3 ], properties[ 4 ] );
	}

	// Return:
	// 0-10: see number/pattern-properties.
	// 11: @positivePattern [String] Positive pattern.
	// 12: @negativePattern [String] Negative pattern.
	// 13: @negativePrefix [String] Negative prefix.
	// 14: @negativeSuffix [String] Negative suffix.
	// 15: @round [Function] Round function.
	// 16: @infinitySymbol [String] Infinity symbol.
	// 17: @nanSymbol [String] NaN symbol.
	// 18: @symbolMap [Object] A bunch of other symbols.
	// 19: @nuDigitsMap [Array] Digits map if numbering system is different than `latn`.
	return properties;
};




/**
 * Generated by:
 *
 * var regenerate = require( "regenerate" );
 * var formatSymbols = require( * "unicode-8.0.0/General_Category/Format/symbols" );
 * regenerate().add( formatSymbols ).toString();
 *
 * https://github.com/mathiasbynens/regenerate
 * https://github.com/mathiasbynens/unicode-8.0.0
 */
var regexpCfG = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;




/**
 * Generated by:
 *
 * var regenerate = require( "regenerate" );
 * var dashSymbols = require( * "unicode-8.0.0/General_Category/Dash_Punctuation/symbols" );
 * regenerate().add( dashSymbols ).toString();
 *
 * https://github.com/mathiasbynens/regenerate
 * https://github.com/mathiasbynens/unicode-8.0.0
 *
 * NOTE: In addition to [:dash:],  the below includes MINUS SIGN U+2212.
 */
var regexpDashG = /[\-\u058A\u05BE\u1400\u1806\u2010-\u2015\u2E17\u2E1A\u2E3A\u2E3B\u2E40\u301C\u3030\u30A0\uFE31\uFE32\uFE58\uFE63\uFF0D\u2212]/g;




/**
 * Generated by:
 *
 * var regenerate = require( "regenerate" );
 * var spaceSeparatorSymbols = require( "unicode-8.0.0/General_Category/Space_Separator/symbols" );
 * regenerate().add( spaceSeparatorSymbols ).toString();
 *
 * https://github.com/mathiasbynens/regenerate
 * https://github.com/mathiasbynens/unicode-8.0.0
 */
var regexpZsG = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;




/**
 * parse( value, properties )
 *
 * @value [String].
 *
 * @properties [Object] Parser properties is a reduced pre-processed cldr
 * data set returned by numberParserProperties().
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
var numberParse = function( value, properties ) {
	var grammar, invertedNuDigitsMap, invertedSymbolMap, negative, number, prefix, prefixNSuffix,
		suffix, tokenizer, valid;

	// Grammar:
	// - Value <=           NaN | PositiveNumber | NegativeNumber
	// - PositiveNumber <=  PositivePrefix NumberOrInf PositiveSufix
	// - NegativeNumber <=  NegativePrefix NumberOrInf
	// - NumberOrInf <=     Number | Inf
	grammar = [
		[ "nan" ],
		[ "prefix", "infinity", "suffix" ],
		[ "prefix", "number", "suffix" ],
		[ "negativePrefix", "infinity", "negativeSuffix" ],
		[ "negativePrefix", "number", "negativeSuffix" ]
	];

	invertedSymbolMap = properties[ 0 ];
	invertedNuDigitsMap = properties[ 1 ] || {};
	tokenizer = properties[ 2 ];

	// Loose Matching:
	// - Ignore all format characters, which includes RLM, LRM or ALM used to control BIDI
	//   formatting.
	// - Map all characters in [:Zs:] to U+0020 SPACE;
	// - Map all characters in [:Dash:] to U+002D HYPHEN-MINUS;
	value = value
		.replace( regexpCfG, "" )
		.replace( regexpDashG, "-" )
		.replace( regexpZsG, " " );

	function parse( type ) {
		return function( lexeme ) {

			// Reverse localized symbols and numbering system.
			lexeme = lexeme.split( "" ).map(function( character ) {
				return invertedSymbolMap[ character ] ||
					invertedNuDigitsMap[ character ] ||
					character;
			}).join( "" );

			switch ( type ) {
				case "infinity":
					number = Infinity;
					break;

				case "nan":
					number = NaN;
					break;

				case "number":

					// Remove grouping separators.
					lexeme = lexeme.replace( /,/g, "" );

					number = +lexeme;
					break;

				case "prefix":
				case "negativePrefix":
					prefix = lexeme;
					break;

				case "suffix":
					suffix = lexeme;
					break;

				case "negativeSuffix":
					suffix = lexeme;
					negative = true;
					break;

				// This should never be reached.
				default:
					throw new Error( "Internal error" );
			}
			return "";
		};
	}

	function tokenizeNParse( _value, grammar ) {
		return grammar.some(function( statement ) {
			var value = _value;

			// The whole grammar statement should be used (i.e., .every() return true) and value be
			// entirely consumed (i.e., !value.length).
			return statement.every(function( type ) {
				if ( value.match( tokenizer[ type ] ) === null ) {
					return false;
				}

				// Consume and parse it.
				value = value.replace( tokenizer[ type ], parse( type ) );
				return true;
			}) && !value.length;
		});
	}

	valid = tokenizeNParse( value, grammar );

	// NaN
	if ( !valid || isNaN( number ) ) {
		return NaN;
	}

	prefixNSuffix = "" + prefix + suffix;

	// Percent
	if ( prefixNSuffix.indexOf( "%" ) !== -1 ) {
		number /= 100;

	// Per mille
	} else if ( prefixNSuffix.indexOf( "\u2030" ) !== -1 ) {
		number /= 1000;
	}

	// Negative number
	if ( negative ) {
		number *= -1;
	}

	return number;
};




var numberParserFn = function( properties ) {
	return function numberParser( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return numberParse( value, properties );
	};

};




/**
 * symbolMap( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return the (localized symbol, pattern symbol) key value pair, eg. {
 *   "٫": ".",
 *   "٬": ",",
 *   "٪": "%",
 *   ...
 * };
 */
var numberSymbolInvertedMap = function( cldr ) {
	var symbol,
		symbolMap = {};

	for ( symbol in numberSymbolName ) {
		symbolMap[ numberSymbol( numberSymbolName[ symbol ], cldr ) ] = symbol;
	}

	return symbolMap;
};




/**
 * objectMap( object, fn)
 *
 * - object
 *
 * - fn( pair ) => pair
 */
var objectMap = function( object, fn ) {
	return Object.keys( object ).map(function( key ) {
		return fn([ key, object[ key ] ]);
	}).reduce(function( object, pair ) {
		object[ pair[ 0 ] ] = pair[ 1 ];
		return object;
	}, {});
};




/**
 * parseProperties( pattern, cldr )
 *
 * @pattern [String] raw pattern for numbers.
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties, used to feed parser function.
 *
 * TODO:
 * - Scientific_notation;
 * - Padding;
 */
var numberParseProperties = function( pattern, cldr, options ) {
	var aux, decimalSymbolRe, digitsRe, groupingSeparatorRe, infinitySymbol, invertedNuDigitsMap,
		invertedSymbolMap, maximumFractionDigits, maximumSignificantDigits,
		minimumSignificantDigits, nanSymbol, negativePrefix, negativeSuffix, nuDigitsMap,
		numberTokenizer, prefix, primaryGroupingSize, secondaryGroupingSize, suffix, symbolMap,
		formatProperties = numberFormatProperties( pattern, cldr, options );

	// Loose Matching:
	// - Ignore all format characters, which includes RLM, LRM or ALM used to control BIDI
	//   formatting.
	// - Map all characters in [:Zs:] to U+0020 SPACE;
	// - Map all characters in [:Dash:] to U+002D HYPHEN-MINUS;
	function looseMatching( value ) {
		return value
			.replace( regexpCfG, "" )
			.replace( regexpDashG, "-" )
			.replace( regexpZsG, " " );
	}

	prefix = looseMatching( formatProperties[ 0 ] );
	maximumFractionDigits = formatProperties[ 4 ];
	minimumSignificantDigits = formatProperties[ 5 ];
	maximumSignificantDigits = formatProperties[ 6 ];
	primaryGroupingSize = formatProperties[ 8 ];
	secondaryGroupingSize = formatProperties[ 9 ];
	suffix = looseMatching( formatProperties[ 10 ] );
	negativePrefix = looseMatching( formatProperties[ 13 ] );
	negativeSuffix = looseMatching( formatProperties[ 14 ] );
	infinitySymbol = looseMatching( formatProperties[ 16 ] );
	nanSymbol = looseMatching( formatProperties[ 17 ] );
	symbolMap = objectMap( formatProperties[ 18 ], function( pair ) {
		return [ pair[ 0 ], looseMatching( pair[ 1 ] ) ];
	});
	nuDigitsMap = formatProperties[ 19 ];

	invertedSymbolMap = objectMap( numberSymbolInvertedMap( cldr ), function( pair ) {
		return [ looseMatching( pair[ 0 ] ), pair[ 1 ] ];
	});

	digitsRe = nuDigitsMap ? "[" + nuDigitsMap + "]" : "\\d";
	groupingSeparatorRe = regexpEscape( symbolMap[ "," ] );
	decimalSymbolRe = regexpEscape( symbolMap[ "." ] );

	if ( nuDigitsMap ) {
		invertedNuDigitsMap = nuDigitsMap.split( "" ).reduce(function( object, localizedDigit, i ) {
			object[ localizedDigit ] = String( i );
			return object;
		}, {} );
	}

	aux = [ prefix, suffix, negativePrefix, negativeSuffix ].map(function( value ) {
		return value.replace( /('([^']|'')+'|'')|./g, function( character, literal ) {

			// Literals
			if ( literal ) {
				return removeLiteralQuotes( literal );
			}

			// Symbols
			character = character.replace( /[\-+E%\u2030]/, function( symbol ) {
				return symbolMap[ symbol ];
			});

			return character;
		});
	});

	prefix = aux[ 0 ];
	suffix = aux[ 1 ];
	negativePrefix = aux[ 2 ];
	negativeSuffix = aux[ 3 ];

	// Number
	//
	// number_re =                       integer fraction?
	//
	// integer =                         digits | digits_using_grouping_separators
	//
	// fraction =                        regexp((.\d+)?)
	//
	// digits =                          regexp(\d+)
	//
	// digits_w_grouping_separators =    digits_w_1_grouping_separators |
	//                                   digits_w_2_grouping_separators
	//
	// digits_w_1_grouping_separators =  regexp(\d{1,3}(,\d{3})+)
	//
	// digits_w_2_grouping_separators =  regexp(\d{1,2}((,\d{2})*(,\d{3})))

	// Integer part
	numberTokenizer = digitsRe + "+";

	// Grouping separators
	if ( primaryGroupingSize ) {
		if ( secondaryGroupingSize ) {
			aux = digitsRe + "{1," + secondaryGroupingSize + "}((" + groupingSeparatorRe +
				digitsRe + "{" + secondaryGroupingSize + "})*(" + groupingSeparatorRe +
				digitsRe + "{" + primaryGroupingSize + "}))";
		} else {
			aux = digitsRe + "{1," + primaryGroupingSize + "}(" + groupingSeparatorRe +
				digitsRe + "{" + primaryGroupingSize + "})+";
		}
		numberTokenizer = "(" + aux + "|" + numberTokenizer + ")";
	}

	// Fraction part? Only included if 1 or 2.
	// 1: Using significant digit format.
	// 2: Using integer and fractional format && it has a maximumFractionDigits.
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) || /* 1 */
				maximumFractionDigits /* 2 */ ) {

		aux = decimalSymbolRe + digitsRe + "+";
		numberTokenizer = numberTokenizer + "(" + aux + ")?" +

			// Handle non-padded decimals, e.g., `".12"` => `0.12` by making the integer part
			// optional.
			"|(" + numberTokenizer + ")?" + aux;

		numberTokenizer = "(" + numberTokenizer + ")";
	}

	// 0: @invertedSymbolMap [Object] Inverted symbol map.
	// 1: @invertedNuDigitsMap [Object] Inverted digits map if numbering system is different than
	//    `latn`.
	// 2: @tokenizer [Object] Tokenizer map, used by parser to consume input.
	return [
		invertedSymbolMap,
		invertedNuDigitsMap,
		{
			infinity: new RegExp( "^" + regexpEscape( infinitySymbol ) ),
			nan:  new RegExp( "^" + regexpEscape( nanSymbol ) ),
			negativePrefix: new RegExp( "^" + regexpEscape( negativePrefix ) ),
			negativeSuffix: new RegExp( "^" + regexpEscape( negativeSuffix ) ),
			number: new RegExp( "^" + numberTokenizer ),
			prefix: new RegExp( "^" + regexpEscape( prefix ) ),
			suffix: new RegExp( "^" + regexpEscape( suffix ) )
		}
	];

};




/**
 * Pattern( style )
 *
 * @style [String] "decimal" (default) or "percent".
 *
 * @cldr [Cldr instance].
 */
var numberPattern = function( style, cldr ) {
	if ( style !== "decimal" && style !== "percent" ) {
		throw new Error( "Invalid style" );
	}

	return cldr.main([
		"numbers",
		style + "Formats-numberSystem-" + numberNumberingSystem( cldr ),
		"standard"
	]);
};




function validateDigits( properties ) {
	var minimumIntegerDigits = properties[ 2 ],
		minimumFractionDigits = properties[ 3 ],
		maximumFractionDigits = properties[ 4 ],
		minimumSignificantDigits = properties[ 5 ],
		maximumSignificantDigits = properties[ 6 ];

	// Validate significant digit format properties
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) ) {
		validateParameterRange( minimumSignificantDigits, "minimumSignificantDigits", 1, 21 );
		validateParameterRange( maximumSignificantDigits, "maximumSignificantDigits",
			minimumSignificantDigits, 21 );

	} else if ( !isNaN( minimumSignificantDigits ) || !isNaN( maximumSignificantDigits ) ) {
		throw new Error( "Neither or both the minimum and maximum significant digits must be " +
			"present" );

	// Validate integer and fractional format
	} else {
		validateParameterRange( minimumIntegerDigits, "minimumIntegerDigits", 1, 21 );
		validateParameterRange( minimumFractionDigits, "minimumFractionDigits", 0, 20 );
		validateParameterRange( maximumFractionDigits, "maximumFractionDigits",
			minimumFractionDigits, 20 );
	}
}

/**
 * .numberFormatter( [options] )
 *
 * @options [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * Return a function that formats a number according to the given options and default/instance
 * locale.
 */
Globalize.numberFormatter =
Globalize.prototype.numberFormatter = function( options ) {
	var args, cldr, pattern, properties, returnFn;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	args = [ options ];

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	if ( options.raw ) {
		pattern = options.raw;
	} else {
		pattern = numberPattern( options.style || "decimal", cldr );
	}

	properties = numberFormatProperties( pattern, cldr, options );

	cldr.off( "get", validateCldr );

	validateDigits( properties );

	returnFn = numberFormatterFn( properties );

	runtimeBind( args, cldr, returnFn, [ properties ] );

	return returnFn;
};

/**
 * .numberParser( [options] )
 *
 * @options [Object]:
 * - style: [String] "decimal" (default) or "percent".
 *
 * Return the number parser according to the default/instance locale.
 */
Globalize.numberParser =
Globalize.prototype.numberParser = function( options ) {
	var args, cldr, pattern, properties, returnFn;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	args = [ options ];

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	if ( options.raw ) {
		pattern = options.raw;
	} else {
		pattern = numberPattern( options.style || "decimal", cldr );
	}

	properties = numberParseProperties( pattern, cldr, options );

	cldr.off( "get", validateCldr );

	returnFn = numberParserFn( properties );

	runtimeBind( args, cldr, returnFn, [ properties ] );

	return returnFn;
};

/**
 * .formatNumber( value [, options] )
 *
 * @value [Number] number to be formatted.
 *
 * @options [Object]: see number/format-properties.
 *
 * Format a number according to the given options and default/instance locale.
 */
Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.numberFormatter( options )( value );
};

/**
 * .parseNumber( value [, options] )
 *
 * @value [String]
 *
 * @options [Object]: See numberParser().
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 */
Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.numberParser( options )( value );
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._createErrorUnsupportedFeature = createErrorUnsupportedFeature;
Globalize._numberNumberingSystem = numberNumberingSystem;
Globalize._numberPattern = numberPattern;
Globalize._numberSymbol = numberSymbol;
Globalize._removeLiteralQuotes = removeLiteralQuotes;
Globalize._stringPad = stringPad;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;
Globalize._validateParameterTypeString = validateParameterTypeString;

return Globalize;




}));
