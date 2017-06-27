/*!
 * Globalize v1.0.0-alpha.1
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-11T16:26Z
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"cldr",
			"../globalize"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {


/**
 * getLocale( [locale] )
 *
 * @locale [String]
 *
 * Get locale instance given locale string.
 * Get default locale if locale argument is undefined.
 */
var commonGetLocale = function( locale ) {
	return locale ? new Cldr( locale ) : Globalize.locale();
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
		ret = number[ 0 ].slice( index - currentGroupingSize, index ) + ( ret.length ? sep : "" ) + ret;
		index -= currentGroupingSize;
		if ( switchToSecondary ) {
			currentGroupingSize = secondaryGroupingSize;
			switchToSecondary = false;
		}
	}

	number[ 0 ] = number[ 0 ].slice( 0, index ) + ( ret.length ? sep : "" ) + ret;
	return number.join( "." );
};




var numberTruncate = function( value ) {
	if ( isNaN( value ) ) {
		return NaN;
	}
	return Math[ value < 0 ? "ceil" : "floor" ]( value );
};




var stringPad = function( str, count, right ) {
	var length;
	if ( typeof str !== "string" ) {
		str = String( str );
	}
	for ( length = str.length; length < count; length += 1 ) {
		str = ( right ? ( str + "0" ) : ( "0" + str ) );
	}
	return str;
};




/**
 * integerFractionDigits( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round, roundIncrement )
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
var numberFormatIntegerFractionDigits = function( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round, roundIncrement ) {

	// Sanity check.
	if ( minimumFractionDigits > maximumFractionDigits ) {
		maximumFractionDigits = minimumFractionDigits;
	}

	// Fraction
	if ( maximumFractionDigits ) {

		// Rounding
		if ( roundIncrement ) {
			number = round( number, roundIncrement );

		// Maximum fraction digits
		} else {
			number = round( number, Math.pow( 10, -maximumFractionDigits ) );
		}

		// Minimum fraction digits
		if ( minimumFractionDigits ) {
			number = String( number ).split( "." );
			number[ 1 ] = stringPad( number[ 1 ] || "", minimumFractionDigits, true );
			number = number.join( "." );
		}
	} else {
		number = numberTruncate( number );
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
 *  3: padding
 *  4: (integer_fraction_pattern | significant_pattern)
 *  5: integer_fraction_pattern
 *  6: integer_pattern
 *  7: fraction_pattern
 *  8: significant_pattern
 *  9: scientific_notation
 * 10: suffix
 * 11: -
 */
var numberPatternRe = (/^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/);




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
var numberFormatProperties = function( pattern ) {
	var aux1, aux2, fractionPattern, integerFractionOrSignificantPattern, integerPattern, maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits, minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize, roundIncrement, scientificNotation, secondaryGroupingSize, significantPattern, suffix;

	pattern = pattern.match( numberPatternRe );
	if ( !pattern ) {
		throw new Error( "Invalid pattern: " + pattern );
	}

	prefix = pattern[ 1 ];
	padding = pattern[ 3 ];
	integerFractionOrSignificantPattern = pattern[ 4 ];
	significantPattern = pattern[ 8 ];
	scientificNotation = pattern[ 9 ];
	suffix = pattern[ 10 ];

	// Significant digit format
	if ( significantPattern ) {
		significantPattern.replace( /(@+)(#*)/, function( match, minimumSignificantDigitsMatch, maximumSignificantDigitsMatch ) {
			minimumSignificantDigits = minimumSignificantDigitsMatch.length;
			maximumSignificantDigits = minimumSignificantDigits + maximumSignificantDigitsMatch.length;
		});

	// Integer and fractional format
	} else {
		fractionPattern = pattern[ 7 ];
		integerPattern = pattern[ 6 ];

		if ( fractionPattern ) {

			// Minimum fraction digits, and rounding.
			fractionPattern.replace( /[0-9]+/, function( match ) {
				minimumFractionDigits = match;
			});
			if ( minimumFractionDigits ) {
				roundIncrement = +( "0." + minimumFractionDigits );
				minimumFractionDigits = minimumFractionDigits.length;
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
		throw new Error( "Scientific notation not implemented" );
	}

	// Padding
	if ( padding ) {
		throw new Error( "Padding not implemented" );
	}

	// Grouping
	if ( ( aux1 = integerFractionOrSignificantPattern.lastIndexOf( "," ) ) !== -1 ) {

		// Primary grouping size is the interval between the last group separator and the end of the integer (or the end of the significant pattern).
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
	//  2: @minimumIntegerDigits non-negative integer Number value indicating the minimum integer digits to be used. Numbers will be padded with leading zeroes if necessary.
	//  3: @minimumFractionDigits and
	//  4: @maximumFractionDigits are non-negative integer Number values indicating the minimum and maximum fraction digits to be used. Numbers will be rounded or padded with trailing zeroes if necessary.
	//  5: @minimumSignificantDigits and
	//  6: @maximumSignificantDigits are positive integer Number values indicating the minimum and maximum fraction digits to be shown. Either none or both of these properties are present; if they are, they override minimum and maximum integer and fraction digits – the formatter uses however many integer and fraction digits are required to display the specified number of significant digits.
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
	var roundOrder, roundIncrement;

	// Get number at two extra significant figure precision.
	number = number.toPrecision( precision + 2 );

	// Then, round it to the required significant figure precision.
	roundOrder = Math.ceil( Math.log( Math.abs( number ) ) / Math.log( 10 ) );
	roundOrder -= precision;
	roundIncrement = Math.pow( 10, roundOrder );

	number = round( number, roundIncrement );

	// Ignore decimal error, eg. `1234 * 0.0001 = 0.12340000000000001`.
	if ( roundOrder < 0 ) {
		number = +number.toFixed( -roundOrder );
	}

	return number;
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

	if ( (/e/).test( number ) ) {
		throw new Error( "Ops! Integers out of (1e21, 1e-7) not supported" );
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
 * NumberingSystem( cldr )
 *
 * TODO support ( native | traditional | finance ).
 */
var numberNumberingSystem = function( cldr ) {
	return cldr.main( "numbers/defaultNumberingSystem" );
};




var numberSymbolName = {
	"." : "decimal",
	"," : "group",
	"%" : "percentSign",
	"+" : "plusSign",
	"-" : "minusSign",
	"E" : "exponential",
	"\u2030" : "perMille"
};




/**
 * MinusSign( symbol, cldr )
 *
 * Return the localized minus sign.
 */
var numberSymbol = function( symbol, cldr ) {
	return cldr.main([
		"numbers/symbols-numberSystem-" + numberNumberingSystem( cldr ),
		numberSymbolName[ symbol ]
	]);
};




/**
 * round( method )
 *
 * @method [String] with either "round", "ceil", "floor", or "truncate".
 *
 * Return function( value, increment ):
 *
 *   @value [Number] eg. 123.45.
 *
 *   @increment [Number] optional, eg. 0.1.
 *
 *   Return the rounded number, eg:
 *   - round( "round" )( 123.45 ): 123;
 *   - round( "ceil" )( 123.45 ): 124;
 *   - round( "floor" )( 123.45 ): 123;
 *   - round( "truncate" )( 123.45 ): 123;
 *   - round( "round" )( 123.45, 0.1 ): 123.5;
 *   - round( "round" )( 123.45, 10 ): 120;
 */
var numberRound = function( method ) {
	method = method || "round";
	method = method === "truncate" ? numberTruncate : Math[ method ];
	return function( value, increment ) {
		increment = increment || 1;
		return method( value / increment ) * increment;
	};
};




/**
 * format( number, pattern, cldr [, options] )
 *
 * @number [Number].
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
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
var numberFormat = function( number, pattern, cldr, options ) {
	var maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits, minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize, properties, ret, round, roundIncrement, secondaryGroupingSize, suffix;

	// NaN
	if ( isNaN( number ) ) {
		return numberSymbol( "nan", cldr );
	}

	pattern = pattern.split( ";" );

	options = options || {};
	round = numberRound( options.round );
	properties = numberFormatProperties( pattern[ 0 ] );
	padding = properties[ 1 ];
	minimumIntegerDigits = options.minimumIntegerDigits || properties[ 2 ];
	minimumFractionDigits = options.minimumFractionDigits || properties[ 3 ];
	maximumFractionDigits = options.maximumFractionDigits || properties[ 4 ];
	minimumSignificantDigits = options.minimumSignificantDigits || properties[ 5 ];
	maximumSignificantDigits = options.maximumSignificantDigits || properties[ 6 ];
	roundIncrement = properties[ 7 ];
	primaryGroupingSize = properties[ 8 ];
	secondaryGroupingSize = properties[ 9 ];

	// Negative pattern
	// "If there is an explicit negative subpattern, it serves only to specify the negative prefix and suffix" UTS#35
	if ( number < 0 ) {

		// "If there is no explicit negative subpattern, the negative subpattern is the localized minus sign prefixed to the positive subpattern" UTS#35
		pattern = pattern[ 1 ] || "-" + pattern[ 0 ];
		properties = numberFormatProperties( pattern );
	} else {
		pattern = pattern[ 0 ];
	}

	prefix = properties[ 0 ];
	suffix = properties[ 10 ];

	// Infinity (observe that isNaN() has been checked above)
	if ( !isFinite( number ) ) {
		return prefix + numberSymbol( "infinity", cldr ) + suffix;
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
	if ( minimumSignificantDigits && maximumSignificantDigits ) {
		number = numberFormatSignificantDigits( number, minimumSignificantDigits, maximumSignificantDigits, round );
	} else if ( minimumSignificantDigits || maximumSignificantDigits ) {
		throw new Error( "None or both the minimum and maximum significant digits must be present" );

	// Integer and fractional format
	} else {
		number = numberFormatIntegerFractionDigits( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round, roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize && !( "useGrouping" in options && !options.useGrouping ) ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize, secondaryGroupingSize );
	}

	ret += number;

	// Scientific notation
	if ( false ) {
		throw new Error( "Scientific notation not implemented" );
	}

	// Padding
	if ( false ) {
		throw new Error( "Padding not implemented" );
	}

	ret += suffix;

	// Symbols
	return ret.replace( /'[^']+'|[.,\-+E%\u2030]/g, function( symbol ) {
		if ( symbol.charAt( 0 ) === "'" ) {
			return symbol;
		}
		return numberSymbol( symbol, cldr );
	});
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




/**
 * Globalize.formatNumber( value, pattern, locale )
 *
 * @value [Number]
 *
 * @attributes [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * @locale [String]
 *
 * Format a number according to the given attributes and the given locale (or the default locale if not specified).
 */
Globalize.formatNumber = function( value, attributes, locale ) {
	var pattern;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	attributes = attributes || {};
	locale = commonGetLocale( locale );

	if ( !attributes.pattern ) {
		pattern = numberPattern( attributes.style || "decimal", locale );
	}

	return numberFormat( value, pattern, locale, attributes );
};

/**
 * Globalize.parseNumber( value, patterns, locale )
 *
 * @value [String]
 *
 * @patterns [TBD]
 *
 * @locale [String]
 *
 * Return a Number or null.
 */
Globalize.parseNumber = function( /*value, patterns, locale*/ ) {
	return null;
};

return Globalize;




}));
