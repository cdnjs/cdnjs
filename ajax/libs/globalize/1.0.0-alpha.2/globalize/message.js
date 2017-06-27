/*!
 * Globalize v1.0.0-alpha.2
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18T14:47Z
 */
(function( root, factory ) {

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define( [ "cldr", "../globalize" ], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "cldrjs" ), require( "globalize" ) );
	} else {

		// Extend global
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




var arrayIsArray = Array.isArray || function( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Array]";
};




var alwaysArray = function( stringOrArray ) {
	return arrayIsArray( stringOrArray ) ?  stringOrArray : [ stringOrArray ];
};




/**
 * Globalize.loadMessages( locale, json )
 *
 * @locale [String]
 *
 * @json [JSON]
 *
 * Load messages (translation) data per locale.
 */
Globalize.loadMessages = function( locale, json ) {
	var customData = {
		"globalize-messages": {}
	};
	locale = new Cldr( locale );
	customData[ "globalize-messages" ][ locale.attributes.languageId ] = json;
	Cldr.load( customData );
};

/**
 * Globalize.translate( path, locale )
 *
 * @path [String or Array]
 *
 * @locale [String]
 *
 * Translate item given its path.
 */
Globalize.translate = function( path , locale ) {
	locale = commonGetLocale( locale );
	path = alwaysArray( path );
	return locale.get( [ "globalize-messages/{languageId}" ].concat( path ) );
};

return Globalize;




}));
