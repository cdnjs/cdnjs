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
		define( [ "cldr" ], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ) );
	} else {

		// Global
		root.Globalize = factory( root.Cldr );
	}
}( this, function( Cldr ) {


var defaultLocale,
	Globalize = {};

/**
 * Globalize.load( json )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function( json ) {
	Cldr.load( json );
};

/**
 * Globalize.locale( [locale] )
 *
 * @locale [String]
 *
 * Set default locale.
 * Get default locale if locale argument is undefined.
 * Somewhat equivalent to previous culture( selector ).
 */
Globalize.locale = function( locale ) {
	if ( arguments.length ) {
		defaultLocale = new Cldr( locale );
	}
	return defaultLocale;
};

return Globalize;




}));
