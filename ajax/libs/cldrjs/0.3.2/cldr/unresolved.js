/**
 * CLDR JavaScript Library v0.3.2
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-08T17:12Z
 */
/*!
 * CLDR JavaScript Library v0.3.2 2014-04-08T17:12Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
 */
(function( factory ) {

	if ( typeof define === "function" && define.amd ) {
		// AMD.
		define( [ "../cldr" ], factory );
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory( require( "cldr.js" ) );
	} else {
		// Global
		factory( Cldr );
	}

}(function( Cldr ) {

	// Build optimization hack to avoid duplicating functions across modules.
	var jsonMerge = Cldr._jsonMerge;
	var pathNormalize = Cldr._pathNormalize;
	var resourceGet = Cldr._resourceGet;




	var bundleParentLookup = function( Cldr, locale ) {
		var normalizedPath, parent;

		if ( locale === "root" ) {
			return;
		}

		// First, try to find parent on supplemental data.
		normalizedPath = pathNormalize( [ "supplemental/parentLocales/parentLocale", locale ] );
		parent = resourceGet( Cldr._resolved, normalizedPath ) || resourceGet( Cldr._raw, normalizedPath );
		if ( parent ) {
			return parent;
		}

		// Or truncate locale.
		parent = locale.substr( 0, locale.lastIndexOf( "_" ) );
		if ( !parent ) {
			return "root";
		}

		return parent;
	};




	// @path: normalized path
	var resourceSet = function( data, path, value ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			if ( !node[ path[ i ] ] ) {
				node[ path[ i ] ] = {};
			}
			node = node[ path[ i ] ];
		}
		node[ path[ i ] ] = value;
	};


	var itemLookup = (function() {

	var lookup;

	lookup = function( Cldr, locale, path, attributes, childLocale ) {
		var normalizedPath, parent, value;

		// 1: Finish recursion
		// 2: Avoid infinite loop
		if ( typeof locale === "undefined" /* 1 */ || locale === childLocale /* 2 */ ) {
			return;
		}

		// Resolve path
		normalizedPath = pathNormalize( path, attributes );

		// Check resolved (cached) data first
		value = resourceGet( Cldr._resolved, normalizedPath );
		if ( value ) {
			return value;
		}

		// Check raw data
		value = resourceGet( Cldr._raw, normalizedPath );

		if ( !value ) {
			// Or, lookup at parent locale
			parent = bundleParentLookup( Cldr, locale );
			value = lookup( Cldr, parent, path, jsonMerge( attributes, { languageId: parent }), locale );
		}

		// Set resolved (cached)
		resourceSet( Cldr._resolved, normalizedPath, value );

		return value;
	};

	return lookup;

}());


	var getSuper;

	Cldr._raw = {};

	// Load resolved or unresolved cldr data
	// @json [JSON]
	//
	// Overwrite Cldr.load().
	Cldr.load = function( json ) {
		if ( typeof json !== "object" ) {
			throw new Error( "invalid json" );
		}
		Cldr._raw = jsonMerge( Cldr._raw, json );
	};

	// Overload Cldr.prototype.get().
	getSuper = Cldr.prototype.get;
	Cldr.prototype.get = function( path ) {
		// 1: use languageId as locale on item lookup for simplification purposes, because no other extended subtag is used anyway on bundle parent lookup.
		// 2: during init(), this method is called, but languageId is yet not defined. Use "" as a workaround in this very specific scenario.
		return getSuper.apply( this, arguments ) ||
			itemLookup( Cldr, this.attributes && this.attributes.languageId /* 1 */ || "" /* 2 */, path, this.attributes );
	};

	return Cldr;



}));
