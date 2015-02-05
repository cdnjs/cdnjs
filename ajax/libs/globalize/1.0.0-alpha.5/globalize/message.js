/*!
 * Globalize v1.0.0-alpha.5
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-08-19T00:47Z
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

		// Extend global
		factory( root.Cldr, root.Globalize );
	}
}(this, function( Cldr, Globalize ) {

var alwaysArray = Globalize._alwaysArray,
	validateDefaultLocale = Globalize._validateDefaultLocale,
	validatePresence = Globalize._validatePresence,
	validateType = Globalize._validateType,
	validateTypePlainObject = Globalize._validateTypePlainObject;


/**
 * .loadTranslations( json )
 *
 * @json [JSON]
 *
 * Load translation data.
 */
Globalize.loadTranslations = function( json ) {
	var customData = {
		"globalize-translations": json
	};

	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

	Cldr.load( customData );
};

/**
 * .translate( path )
 *
 * @path [String or Array]
 *
 * Translate item given its path.
 */
Globalize.translate =
Globalize.prototype.translate = function( path ) {
	var cldr;

	validatePresence( path, "path" );
	validateType( path, "path", typeof path === "string" || Array.isArray( path ), "a String nor an Array");

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	return cldr.get( [ "globalize-translations/{languageId}" ].concat( path ) );
};

return Globalize;




}));
