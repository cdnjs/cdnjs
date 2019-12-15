/**
 * Globalize Runtime v1.4.2
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2019-03-07T13:47Z
 */
/*!
 * Globalize Runtime v1.4.2 2019-03-07T13:47Z Released under the MIT license
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



var runtimeKey = Globalize._runtimeKey,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType;


var validateParameterTypeNumber = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "number",
		"Number"
	);
};




var pluralGeneratorFn = function( plural ) {
	return function pluralGenerator( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};




Globalize._pluralGeneratorFn = pluralGeneratorFn;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;

Globalize.plural =
Globalize.prototype.plural = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.pluralGenerator( options )( value );
};

Globalize.pluralGenerator =
Globalize.prototype.pluralGenerator = function( options ) {
	options = options || {};
	return Globalize[ runtimeKey( "pluralGenerator", this._locale, [ options ] ) ];
};

return Globalize;




}));
