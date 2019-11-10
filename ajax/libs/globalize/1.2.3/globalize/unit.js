/**
 * Globalize v1.2.3
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
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
			"./number",
			"./plural"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "../globalize" ) );
	} else {

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var formatMessage = Globalize._formatMessage,
	runtimeBind = Globalize._runtimeBind,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterTypePlainObject = Globalize._validateParameterTypePlainObject,
	validateParameterTypeNumber = Globalize._validateParameterTypeNumber,
	validateParameterTypeString = Globalize._validateParameterTypeString;


/**
 * format( value, numberFormatter, pluralGenerator, unitProperies )
 *
 * @value [Number]
 *
 * @numberFormatter [Object]: A numberFormatter from Globalize.numberFormatter.
 *
 * @pluralGenerator [Object]: A pluralGenerator from Globalize.pluralGenerator.
 *
 * @unitProperies [Object]: localized unit data from cldr.
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 *
 * OBS:
 *
 * Unit Sequences are not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#Unit_Sequences
 *
 * Duration Unit (for composed time unit durations) is not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#durationUnit
 */
var unitFormat = function( value, numberFormatter, pluralGenerator, unitProperties ) {
	var compoundUnitPattern = unitProperties.compoundUnitPattern, dividend, dividendProperties,
		formattedValue, divisor, divisorProperties, message, pluralValue;

	unitProperties = unitProperties.unitProperties;
	formattedValue = numberFormatter( value );
	pluralValue = pluralGenerator( value );

	// computed compound unit, eg. "megabyte-per-second".
	if ( unitProperties instanceof Array ) {
		dividendProperties = unitProperties[ 0 ];
		divisorProperties = unitProperties[ 1 ];

		dividend = formatMessage( dividendProperties[ pluralValue ], [ value ] );
		divisor = formatMessage( divisorProperties.one, [ "" ] ).trim();

		return formatMessage( compoundUnitPattern, [ dividend, divisor ] );
	}

	message = unitProperties[ pluralValue ];

	return formatMessage( message, [ formattedValue ] );
};




var unitFormatterFn = function( numberFormatter, pluralGenerator, unitProperties ) {
	return function unitFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return unitFormat( value, numberFormatter, pluralGenerator, unitProperties );
	};

};




/**
 * categories()
 *
 * Return all unit categories.
 */
var unitCategories = [ "acceleration", "angle", "area", "digital", "duration", "length", "mass", "power",
"pressure", "speed", "temperature", "volume" ];




function stripPluralGarbage( data ) {
	var aux, pluralCount;

	if ( data ) {
		aux = {};
		for ( pluralCount in data ) {
			aux[ pluralCount.replace( /unitPattern-count-/, "" ) ] = data[ pluralCount ];
		}
	}

	return aux;
}

/**
 * get( unit, form, cldr )
 *
 * @unit [String] The full type-unit name (eg. duration-second), or the short unit name
 * (eg. second).
 *
 * @form [String] A string describing the form of the unit representation (eg. long,
 * short, narrow).
 *
 * @cldr [Cldr instance].
 *
 * Return the plural map of a unit, eg: "second"
 * { "one": "{0} second",
 *   "other": "{0} seconds" }
 * }
 *
 * Or the Array of plural maps of a compound-unit, eg: "foot-per-second"
 * [ { "one": "{0} foot",
 *     "other": "{0} feet" },
 *   { "one": "{0} second",
 *     "other": "{0} seconds" } ]
 *
 * Uses the precomputed form of a compound-unit if available, eg: "mile-per-hour"
 * { "displayName": "miles per hour",
 *    "unitPattern-count-one": "{0} mile per hour",
 *    "unitPattern-count-other": "{0} miles per hour"
 * },
 *
 * Also supports "/" instead of "-per-", eg. "foot/second", using the precomputed form if
 * available.
 *
 * Or the Array of plural maps of a compound-unit, eg: "foot-per-second"
 * [ { "one": "{0} foot",
 *     "other": "{0} feet" },
 *   { "one": "{0} second",
 *     "other": "{0} seconds" } ]
 *
 * Or undefined in case the unit (or a unit of the compound-unit) doesn't exist.
 */
var get = function( unit, form, cldr ) {
	var ret;

	// Ensure that we get the 'precomputed' form, if present.
	unit = unit.replace( /\//, "-per-" );

	// Get unit or <category>-unit (eg. "duration-second").
	[ "" ].concat( unitCategories ).some(function( category ) {
		return ret = cldr.main([
			"units",
			form,
			category.length ? category + "-" + unit : unit
		]);
	});

	// Rename keys s/unitPattern-count-//g.
	ret = stripPluralGarbage( ret );

	// Compound Unit, eg. "foot-per-second" or "foot/second".
	if ( !ret && ( /-per-/ ).test( unit ) ) {

		// "Some units already have 'precomputed' forms, such as kilometer-per-hour;
		// where such units exist, they should be used in preference" UTS#35.
		// Note that precomputed form has already been handled above (!ret).

		// Get both recursively.
		unit = unit.split( "-per-" );
		ret = unit.map(function( unit ) {
			return get( unit, form, cldr );
		});
		if ( !ret[ 0 ] || !ret[ 1 ] ) {
			return;
		}
	}

	return ret;
};

var unitGet = get;




/**
 * properties( unit, form, cldr )
 *
 * @unit [String] The full type-unit name (eg. duration-second), or the short unit name
 * (eg. second).
 *
 * @form [String] A string describing the form of the unit representation (eg. long,
 * short, narrow).
 *
 * @cldr [Cldr instance].
 */
var unitProperties = function( unit, form, cldr ) {
	var compoundUnitPattern, unitProperties;

	compoundUnitPattern = cldr.main( [ "units", form, "per/compoundUnitPattern" ] );
	unitProperties = unitGet( unit, form, cldr );

	return {
		compoundUnitPattern: compoundUnitPattern,
		unitProperties: unitProperties
	};
};




/**
 * Globalize.formatUnit( value, unit, options )
 *
 * @value [Number]
 *
 * @unit [String]: The unit (e.g "second", "day", "year")
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 */
Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.unitFormatter( unit, options )( value );
};

/**
 * Globalize.unitFormatter( unit, options )
 *
 * @unit [String]: The unit (e.g "second", "day", "year")
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * - numberFormatter: [Function] a number formatter function. Defaults to Globalize
 *   `.numberFormatter()` for the current locale using the default options.
 */
Globalize.unitFormatter =
Globalize.prototype.unitFormatter = function( unit, options ) {
	var args, form, numberFormatter, pluralGenerator, returnFn, properties;

	validateParameterPresence( unit, "unit" );
	validateParameterTypeString( unit, "unit" );

	validateParameterTypePlainObject( options, "options" );

	options = options || {};

	args = [ unit, options ];
	form = options.form || "long";
	properties = unitProperties( unit, form, this.cldr );

	numberFormatter = options.numberFormatter || this.numberFormatter();
	pluralGenerator = this.pluralGenerator();
	returnFn = unitFormatterFn( numberFormatter, pluralGenerator, properties );

	runtimeBind( args, this.cldr, returnFn, [ numberFormatter, pluralGenerator, properties ] );

	return returnFn;
};

return Globalize;




}));
