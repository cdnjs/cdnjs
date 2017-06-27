/**
 * CLDR JavaScript Library v0.3.3
 * http://jquery.com/
 *
 * Copyright 2013 Rafael Xavier de Souza
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-11T15:28Z
 */
/*!
 * CLDR JavaScript Library v0.3.3 2014-04-11T15:28Z MIT license © Rafael Xavier
 * http://git.io/h4lmVg
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
		root.Cldr = factory();
	}

}( this, function() {



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




	var pathNormalize = function( path, attributes ) {
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
			.replace( /^cldr\// , "" ); /* 2 */

		// Replace {attribute}'s
		path = path.replace( /{[a-zA-Z]+}/g, function( name ) {
			name = name.replace( /^{([^}]*)}$/, "$1" );
			return attributes[ name ];
		});

		return path.split( "/" );
	};




	var itemGetResolved = function( Cldr, path, attributes ) {
		// Resolve path
		var normalizedPath = pathNormalize( path, attributes );

		return resourceGet( Cldr._resolved, normalizedPath );
	};




	var arraySome = function( array, callback ) {
		var i, length;
		if ( array.some ) {
			return array.some( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			if ( callback( array[ i ], i, array ) ) {
				return true;
			}
		}
		return false;
	};




	// Return the maximized language id as defined in
	// http://www.unicode.org/reports/tr35/#Likely_Subtags
	// 1. Canonicalize.
	// 1.1 Make sure the input locale is in canonical form: uses the right separator, and has the right casing.
	// TODO Right casing? What df? It seems languages are lowercase, scripts are Capitalized, territory is uppercase. I am leaving this as an exercise to the user.

	// 1.2 Replace any deprecated subtags with their canonical values using the <alias> data in supplemental metadata. Use the first value in the replacement list, if it exists. Language tag replacements may have multiple parts, such as "sh" ➞ "sr_Latn" or mo" ➞ "ro_MD". In such a case, the original script and/or region are retained if there is one. Thus "sh_Arab_AQ" ➞ "sr_Arab_AQ", not "sr_Latn_AQ".
	// TODO What <alias> data?

	// 1.3 If the tag is grandfathered (see <variable id="$grandfathered" type="choice"> in the supplemental data), then return it.
	// TODO grandfathered?

	// 1.4 Remove the script code 'Zzzz' and the region code 'ZZ' if they occur.
	// 1.5 Get the components of the cleaned-up source tag (languages, scripts, and regions), plus any variants and extensions.
	// 2. Lookup. Lookup each of the following in order, and stop on the first match:
	// 2.1 languages_scripts_regions
	// 2.2 languages_regions
	// 2.3 languages_scripts
	// 2.4 languages
	// 2.5 und_scripts
	// 3. Return
	// 3.1 If there is no match, either return an error value, or the match for "und" (in APIs where a valid language tag is required).
	// 3.2 Otherwise there is a match = languagem_scriptm_regionm
	// 3.3 Let xr = xs if xs is not empty, and xm otherwise.
	// 3.4 Return the language tag composed of languager _ scriptr _ regionr + variants + extensions .

	//
	// @subtags [Array] normalized language id subtags tuple (see init.js).
	var likelySubtags = function( cldr, subtags, options ) {
		var match, matchFound,
			language = subtags[ 0 ],
			script = subtags[ 1 ],
			territory = subtags[ 2 ];
		options = options || {};

		// Skip if (language, script, territory) is not empty [3.3]
		if ( language !== "und" && script !== "Zzzz" && territory !== "ZZ" ) {
			return [ language, script, territory ];
		}

		// Skip if no supplemental likelySubtags data is present
		if ( typeof cldr.get( "supplemental/likelySubtags" ) === "undefined" ) {
			return;
		}

		// [2]
		matchFound = arraySome([
			[ language, script, territory ],
			[ language, territory ],
			[ language, script ],
			[ language ],
			[ "und", script ]
		], function( test ) {
			return match = !(/\b(Zzzz|ZZ)\b/).test( test.join( "_" ) ) /* [1.4] */ && cldr.get( [ "supplemental/likelySubtags", test.join( "_" ) ] );
		});

		// [3]
		if ( matchFound ) {
			// [3.2 .. 3.4]
			match = match.split( "_" );
			return [
				language !== "und" ? language : match[ 0 ],
				script !== "Zzzz" ? script : match[ 1 ],
				territory !== "ZZ" ? territory : match[ 2 ]
			];
		} else if ( options.force ) {
			// [3.1.2]
			return cldr.get( "supplemental/likelySubtags/und" ).split( "_" );
		} else {
			// [3.1.1]
			return;
		}
	};



	// Given a locale, remove any fields that Add Likely Subtags would add.
	// http://www.unicode.org/reports/tr35/#Likely_Subtags
	// 1. First get max = AddLikelySubtags(inputLocale). If an error is signaled, return it.
	// 2. Remove the variants from max.
	// 3. Then for trial in {language, language _ region, language _ script}. If AddLikelySubtags(trial) = max, then return trial + variants.
	// 4. If you do not get a match, return max + variants.
	// 
	// @maxLanguageId [Array] maxLanguageId tuple (see init.js).
	var removeLikelySubtags = function( cldr, maxLanguageId ) {
		var match, matchFound,
			language = maxLanguageId[ 0 ],
			script = maxLanguageId[ 1 ],
			territory = maxLanguageId[ 2 ];

		// [3]
		matchFound = arraySome([
			[ [ language, "Zzzz", "ZZ" ], [ language ] ],
			[ [ language, "Zzzz", territory ], [ language, territory ] ],
			[ [ language, script, "ZZ" ], [ language, script ] ]
		], function( test ) {
			var result = likelySubtags( cldr, test[ 0 ] );
			match = test[ 1 ];
			return result && result[ 0 ] === maxLanguageId[ 0 ] &&
				result[ 1 ] === maxLanguageId[ 1 ] &&
				result[ 2 ] === maxLanguageId[ 2 ];
		});

		// [4]
		return matchFound ?  match : maxLanguageId;
	};




	var alwaysArray = function( stringOrArray ) {
		return typeof stringOrArray === "string" ?  [ stringOrArray ] : stringOrArray;
	};




	var arrayForEach = function( array, callback ) {
		var i, length;
		if ( array.forEach ) {
			return array.forEach( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			callback( array[ i ], i, array );
		}
	};


	var jsonMerge = (function() {

	// Returns new deeply merged JSON.
	//
	// Eg.
	// merge( { a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } } )
	// -> { a: { b: 3, c: 2, d: 4 } }
	//
	// @arguments JSON's
	// 
	var merge = function() {
		var destination = {},
			sources = [].slice.call( arguments, 0 );
		arrayForEach( sources, function( source ) {
			var prop;
			for ( prop in source ) {
				if ( prop in destination && arrayIsArray( destination[ prop ] ) ) {

					// Concat Arrays
					destination[ prop ] = destination[ prop ].concat( source[ prop ] );

				} else if ( prop in destination && typeof destination[ prop ] === "object" ) {

					// Merge Objects
					destination[ prop ] = merge( destination[ prop ], source[ prop ] );

				} else {

					// Set new values
					destination[ prop ] = source[ prop ];

				}
			}
		});
		return destination;
	};

	return merge;

}());


	var Cldr = function( locale ) {
		this.init( locale );
	};

	Cldr._resolved = {};

	// Load resolved cldr data
	// @json [JSON]
	Cldr.load = function( json ) {
		if ( typeof json !== "object" ) {
			throw new Error( "invalid json" );
		}
		Cldr._resolved = jsonMerge( Cldr._resolved, json );
	};

	// Build optimization hack to avoid duplicating functions across modules.
	Cldr._alwaysArray = alwaysArray;
	Cldr._jsonMerge = jsonMerge;
	Cldr._pathNormalize = pathNormalize;
	Cldr._resourceGet = resourceGet;

	Cldr.prototype.init = function( locale ) {
		var language, languageId, maxLanguageId, script, territory, unicodeLanguageId, variant;

		if ( typeof locale !== "string" ) {
			throw new Error( "invalid locale type: \"" + JSON.stringify( locale ) + "\"" );
		}

		// Normalize locale code.
		// Get (or deduce) the "triple subtags": language, territory (also aliased as region), and script subtags.
		// Get the variant subtags (calendar, collation, currency, etc).
		// refs:
		// - http://www.unicode.org/reports/tr35/#Field_Definitions
		// - http://www.unicode.org/reports/tr35/#Language_and_Locale_IDs
		// - http://www.unicode.org/reports/tr35/#Unicode_locale_identifier

		locale = locale.replace( /-/, "_" );

		// TODO normalize unicode locale extensions. Currently, skipped.
		// unicodeLocaleExtensions = locale.split( "_u_" )[ 1 ];
		locale = locale.split( "_u_" )[ 0 ];

		// TODO normalize transformed extensions. Currently, skipped.
		// transformedExtensions = locale.split( "_t_" )[ 1 ];
		locale = locale.split( "_t_" )[ 0 ];

		unicodeLanguageId = locale;

		// unicodeLanguageId = ...
		switch ( true ) {

			// language_script_territory..
			case /^[a-z]{2}_[A-Z][a-z]{3}_[A-Z0-9]{2}(\b|_)/.test( unicodeLanguageId ):
				language = unicodeLanguageId.split( "_" )[ 0 ];
				script = unicodeLanguageId.split( "_" )[ 1 ];
				territory = unicodeLanguageId.split( "_" )[ 2 ];
				variant = unicodeLanguageId.split( "_" )[ 3 ];
				break;

			// language_script..
			case /^[a-z]{2}_[A-Z][a-z]{3}(\b|_)/.test( unicodeLanguageId ):
				language = unicodeLanguageId.split( "_" )[ 0 ];
				script = unicodeLanguageId.split( "_" )[ 1 ];
				territory = "ZZ";
				variant = unicodeLanguageId.split( "_" )[ 2 ];
				break;

			// language_territory..
			case /^[a-z]{2}_[A-Z0-9]{2}(\b|_)/.test( unicodeLanguageId ):
				language = unicodeLanguageId.split( "_" )[ 0 ];
				script = "Zzzz";
				territory = unicodeLanguageId.split( "_" )[ 1 ];
				variant = unicodeLanguageId.split( "_" )[ 2 ];
				break;

			// language.., or root
			case /^([a-z]{2}|root)(\b|_)/.test( unicodeLanguageId ):
				language = unicodeLanguageId.split( "_" )[ 0 ];
				script = "Zzzz";
				territory = "ZZ";
				variant = unicodeLanguageId.split( "_" )[ 1 ];
				break;

			default:
				language = "und";
				break;
		}

		// When a locale id does not specify a language, or territory (region), or script, they are obtained by Likely Subtags.
		maxLanguageId = likelySubtags( this, [ language, script, territory ], { force: true } ) || unicodeLanguageId.split( "_" );
		language = maxLanguageId[ 0 ];
		script = maxLanguageId[ 1 ];
		territory  = maxLanguageId[ 2 ];

		// TODO json content distributed on zip file use languageId with `-` on main.<lang>. Why `-` vs. `_` ?
		languageId = removeLikelySubtags( this, maxLanguageId ).join( "_" );

		// Set attributes
		this.attributes = {

			// Unicode Language Id
			languageId: languageId,
			maxLanguageId: maxLanguageId.join( "_" ),

			// Unicode Language Id Subtabs
			language: language,
			script: script,
			territory: territory,
			region: territory, /* alias */
			variant: variant
		};

		this.locale = variant ? [ languageId, variant ].join( "_" ) : languageId;
	};

	Cldr.prototype.get = function( path ) {
		return itemGetResolved( Cldr, path, this.attributes );
	};

	Cldr.prototype.main = function( path ) {
		path = alwaysArray( path );
		return this.get( [ "main/{languageId}" ].concat( path ) );
	};

	return Cldr;



}));
