/**
 * Globalize Runtime v1.2.3
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
 * Globalize Runtime v1.2.3 2017-03-17T01:41Z Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"../globalize-runtime",
			"./number",
			"./plural"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory(
			require( "../globalize-runtime" ),
			require( "./number" ),
			require( "./plural" )
		);
	} else {

		// Extend global
		factory( root.Globalize );
	}
}(this, function( Globalize ) {

var formatMessage = Globalize._formatMessage,
	runtimeKey = Globalize._runtimeKey,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterTypeNumber = Globalize._validateParameterTypeNumber;


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




Globalize._unitFormatterFn = unitFormatterFn;

Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
	return this.unitFormatter( unit, options )( value );
};

Globalize.unitFormatter =
Globalize.prototype.unitFormatter = function( unit, options ) {
	options = options || {};
	return Globalize[ runtimeKey( "unitFormatter", this._locale, [ unit, options ] ) ];
};

return Globalize;




}));
