/**
 * Globalize Runtime v1.4.0
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2018-07-17T20:38Z
 */
/*!
 * Globalize Runtime v1.4.0 2018-07-17T20:38Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	"use strict";

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"../globalize-runtime"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "../globalize-runtime" ) );
	} else {

		// Extend global
		factory( root.Globalize );
	}
}(this, function( Globalize ) {



var createError = Globalize._createError,
	regexpEscape = Globalize._regexpEscape,
	runtimeKey = Globalize._runtimeKey,
	stringPad = Globalize._stringPad,
	validateParameterType = Globalize._validateParameterType,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterTypeString = Globalize._validateParameterTypeString;


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




/**
 * EBNF representation:
 *
 * compact_pattern_re =       prefix?
 *                            number_pattern_re
 *                            suffix?
 *
 * number_pattern_re =        0+
 *
 * Regexp groups:
 *
 *  0: compact_pattern_re
 *  1: prefix
 *  2: number_pattern_re (the number pattern to use in compact mode)
 *  3: suffix
 */
var numberCompactPatternRe = ( /^([^0]*)(0+)([^0]*)$/ );




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

	} else {
		number = round( number );
	}

	number = String( number );

	// Maximum integer digits (post string phase)
	if ( maximumFractionDigits && /e-/.test( number ) ) {

		// Use toFixed( maximumFractionDigits ) to make sure small numbers like 1e-7 are
		// displayed using plain digits instead of scientific notation.
		// 1: Remove leading decimal zeros.
		// 2: Remove leading decimal separator.
		// Note: String() is still preferred so it doesn't mess up with a number precision
		// unnecessarily, e.g., (123456789.123).toFixed(10) === "123456789.1229999959",
		// String(123456789.123) === "123456789.123".
		number = ( +number ).toFixed( maximumFractionDigits )
			.replace( /0+$/, "" ) /* 1 */
			.replace( /\.$/, "" ) /* 2 */;
	}

	// Minimum fraction digits (post string phase)
	if ( minimumFractionDigits ) {
		number = number.split( "." );
		number[ 1 ] = stringPad( number[ 1 ] || "", minimumFractionDigits, true );
		number = number.join( "." );
	}

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
var numberFormat = function( number, properties, pluralGenerator ) {
	var compactMap, infinitySymbol, maximumFractionDigits, maximumSignificantDigits,
	minimumFractionDigits, minimumIntegerDigits, minimumSignificantDigits, nanSymbol, nuDigitsMap,
	padding, prefix, primaryGroupingSize, pattern, ret, round, roundIncrement,
	secondaryGroupingSize, suffix, symbolMap;

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
	compactMap = properties[ 20 ];

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

	// Percent
	if ( pattern.indexOf( "%" ) !== -1 ) {
		number *= 100;

	// Per mille
	} else if ( pattern.indexOf( "\u2030" ) !== -1 ) {
		number *= 1000;
	}

	var compactPattern, compactDigits, compactProperties, divisor, numberExponent, pluralForm;

	// Compact mode: initial number digit processing
	if ( compactMap ) {
		numberExponent = Math.abs( Math.floor( number ) ).toString().length - 1;
		numberExponent = Math.min( numberExponent, compactMap.maxExponent );

		// Use default plural form to perform initial decimal shift
		if ( numberExponent >= 3 ) {
			compactPattern = compactMap[ numberExponent ] && compactMap[ numberExponent ].other;
		}

		if ( compactPattern === "0" ) {
			compactPattern = null;
		} else if ( compactPattern ) {
			compactDigits = compactPattern.split( "0" ).length - 1;
			divisor = numberExponent - ( compactDigits - 1 );
			number = number / Math.pow( 10, divisor );
		}
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

	// Compact mode: apply formatting
	if ( compactMap && compactPattern ) {

		// Get plural form after possible roundings
		pluralForm = pluralGenerator ? pluralGenerator( +number ) : "other";

		compactPattern = compactMap[ numberExponent ][ pluralForm ] || compactPattern;
		compactProperties = compactPattern.match( numberCompactPatternRe );

		// update prefix/suffix with compact prefix/suffix
		prefix += compactProperties[ 1 ];
		suffix = compactProperties[ 3 ] + suffix;
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			secondaryGroupingSize );
	}

	ret = prefix;

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




var numberFormatterFn = function( properties, pluralGenerator ) {
	return function numberFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return numberFormat( value, properties, pluralGenerator );
	};
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
 * Loose Matching:
 * - Ignore all format characters, which includes RLM, LRM or ALM used to control BIDI
 *   formatting.
 * - Map all characters in [:Zs:] to U+0020 SPACE;
 * - Map all characters in [:Dash:] to U+002D HYPHEN-MINUS;
 */
var looseMatching = function( value ) {
	return value
		.replace( regexpCfG, "" )
		.replace( regexpDashG, "-" )
		.replace( regexpZsG, " " );
};




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

	value = looseMatching( value );

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




Globalize._createErrorUnsupportedFeature = createErrorUnsupportedFeature;
Globalize._looseMatching = looseMatching;
Globalize._numberFormat = numberFormat;
Globalize._numberFormatterFn = numberFormatterFn;
Globalize._numberParse = numberParse;
Globalize._numberParserFn = numberParserFn;
Globalize._numberRound = numberRound;
Globalize._removeLiteralQuotes = removeLiteralQuotes;
Globalize._validateParameterPresence = validateParameterPresence;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;
Globalize._validateParameterTypeString = validateParameterTypeString;

// Stamp runtimeKey and return cached fn.
// Note, this function isn't made common to all formatters and parsers, because in practice this is
// only used (at the moment) for numberFormatter used by unitFormatter.
// TODO: Move this function into a common place when this is used by different formatters.
function cached( runtimeKey ) {
	Globalize[ runtimeKey ].runtimeKey = runtimeKey;
	return Globalize[ runtimeKey ];
}

Globalize.numberFormatter =
Globalize.prototype.numberFormatter = function( options ) {
	options = options || {};
	return cached( runtimeKey( "numberFormatter", this._locale, [ options ] ) );
};

Globalize.numberParser =
Globalize.prototype.numberParser = function( options ) {
	options = options || {};
	return Globalize[ runtimeKey( "numberParser", this._locale, [ options ] ) ];
};

Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.numberFormatter( options )( value );
};

Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.numberParser( options )( value );
};

return Globalize;




}));
