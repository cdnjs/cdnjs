/**
 * CLDR JavaScript Library v0.0.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-10-02T12:14Z
 */
(function( root, factory ) {

	if ( typeof define === "function" && define.amd ) {
		// AMD.
		define( factory );
	} else if ( typeof module === "object" && typeof module.exports === "object" ) {
		// Node. CommonJS.
		module.exports = factory();
	} else {
		// Global
		root.cldr = factory();
	}

}( this, function() {



	var init = function( locale ) {
		// When a locale id does not specify a region, they are obtained from Likely Subtags.

		// TODO normalize locale
		this.locale = locale;
	};




	// @path: normalized path
	var resourceGet = function( data, path ) {
		var i,
			node = data,
			length = path.length;

		for ( i = 0; i < length - 1; i++ ) {
			node = node[ path[ i ] ];
			if ( !node ) {
				return undefined;
			}
		}
		return node[ path[ i ] ];
	};




	var arrayIsArray = Array.isArray || function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Array]";
	};




	var pathNormalize = function( locale, path ) {
		if ( arrayIsArray( path ) ) {
			path = path.join( "/" );
		}
		if ( typeof path !== "string" ) {
			throw new Error( "invalid path \"" + path + "\"" );
		}
		// 1: Ignore leading slash `/`
		// 2: Ignore leading `cldr/`
		path = path
			.replace( /^\// , "" ) /* 1 */
			.replace( /^cldr\// , "" ) /* 2 */
			.split( "/" );

		// Supplemental
		if ( path[ 0 ] === "supplemental" ) {
			return path;
		}

		// Main, Casing, Collation, Rbnf: insert locale on path[ 1 ].
		path.splice( 1, 0, locale );

		return path;
	};




	var bundleParentLookup = function( Cldr, locale ) {
		var parent;

		if ( locale === "root" ) {
			return;
		}

		// First, try to find parent on supplemental data.
		parent = resourceGet( Cldr._resolved, pathNormalize( "root", "supplemental/parentLocales/parentLocale/" + locale ) );
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
				node = node[ path[ i ] ];
			}
		}
		node[ path[ i ] ] = value;
	};


	var itemLookup = (function() {

	var lookup;

	lookup = function( Cldr, cldr, locale, path, childLocale ) {
		var normalizedPath, value;

		// 1: Finish recursion
		// 2: Avoid infinite loop
		if ( !locale /* 1 */ || locale === childLocale /* 2 */ ) {
			return;
		}

		// Resolve path
		normalizedPath = pathNormalize( locale, path );

		// Check resolved (cached) data first
		value = resourceGet( Cldr._resolved, normalizedPath );
		if ( value ) {
			return value;
		}

		// Check raw data
		value = resourceGet( Cldr._raw, normalizedPath );

		if ( !value ) {
			// Or, lookup at parent locale
			value = lookup( Cldr, cldr, bundleParentLookup( Cldr, locale ), path, locale );
		}

		// Set resolved (cached)
		resourceSet( Cldr._resolved, normalizedPath, value );

		return value;
	};

	return lookup;

}());


	var itemGetResolved = function( Cldr, locale, path ) {
		// Resolve path
		path = pathNormalize( locale, path );

		return resourceGet( Cldr._resolved, path );
	};




	// Returns merged JSON.
	//
	// Eg.
	// merge( { a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } } )
	// -> { a: { b: 3, d: 4 } }
	//
	// @arguments JSON's
	// 
	var jsonMerge = function() {
		var i, json,
			jsons = [];
		for ( i = 0; i < arguments.length; i++ ) {
			json = JSON.stringify( arguments[ i ] ).replace( /^{/, "" ).replace( /}$/, "" );
			if ( json ) {
				jsons.push( json );
			}
		}
		return JSON.parse( "{" + jsons.join( "," ) + "}" );
	};




	var Cldr = function() {
		init.apply( this, arguments );
	};

	Cldr._resolved = {};
	Cldr._raw = {};

	// Load unresolved cldr data
	// @json [JSON]
	Cldr.loadUnresolved = function( json ) {
		if ( typeof json !== "object" ) {
			throw new Error( "invalid json" );
		}
		Cldr._raw = jsonMerge( Cldr._raw, json );
	};

	// Load resolved cldr data
	// @json [JSON]
	Cldr.load = function( json ) {
		if ( typeof json !== "object" ) {
			throw new Error( "invalid json" );
		}
		Cldr._resolved = jsonMerge( Cldr._resolved, json );
	};

	Cldr.prototype = {
		get: function( path ) {
			return itemGetResolved( Cldr, this.locale, path ) ||
				itemLookup( Cldr, this, this.locale, path );
		}
	};

	return Cldr;



}));
