/**
 * filesize
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2015 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/filesize.js/master/LICENSE>
 * @link http://filesizejs.com
 * @module filesize
 * @version 3.0.0
 */
( function ( global ) {
"use strict";

var bit = /b$/;

/**
 * filesize
 *
 * @method filesize
 * @param  {Mixed}   arg        String, Int or Float to transform
 * @param  {Object}  descriptor [Optional] Flags
 * @return {String}             Readable file size String
 */
function filesize ( arg, descriptor ) {
	var result = [],
		skip = false,
		val = 0,
		e, base, bits, ceil, neg, num, output, round, unix, spacer, suffixes;

	if ( isNaN( arg ) ) {
		throw new Error( "Invalid arguments" );
	}

	descriptor = descriptor || {};
	bits = ( descriptor.bits === true );
	unix = ( descriptor.unix === true );
	base = descriptor.base !== undefined ? descriptor.base : 2;
	round = descriptor.round !== undefined ? descriptor.round : unix ? 1 : 2;
	spacer = descriptor.spacer !== undefined ? descriptor.spacer : unix ? "" : " ";
	suffixes = descriptor.suffixes !== undefined ? descriptor.suffixes : {};
	output = descriptor.output !== undefined ? descriptor.output : "string";
	num = Number( arg );
	neg = ( num < 0 );
	ceil = base > 2 ? 1000 : 1024;

	// Flipping a negative number to determine the size
	if ( neg ) {
		num = -num;
	}

	// Zero is now a special case because bytes divide by 1
	if ( num === 0 ) {
		result[ 0 ] = 0;

		if ( unix ) {
			result[ 1 ] = "";
		}
		else {
			result[ 1 ] = "B";
		}
	}
	else {
		e = Math.floor( Math.log( num ) / Math.log( 1000 ) );

		// Exceeding supported length, time to reduce & multiply
		if ( e > 8 ) {
			val = val * ( 1000 * ( e - 8 ) );
			e = 8;
		}

		if ( base === 2 ) {
			val = num / Math.pow( 2, ( e * 10 ) );
		}
		else {
			val = num / Math.pow( 1000, e );
		}

		if ( bits ) {
			val = ( val * 8 );

			if ( val > ceil ) {
				val = val / ceil;
				e++;
			}
		}

		result[ 0 ] = Number( val.toFixed( e > 0 ? round : 0 ) );
		result[ 1 ] = si[ bits ? "bits" : "bytes" ][ e ];

		if ( !skip && unix ) {
			if ( bits && bit.test( result[ 1 ] ) ) {
				result[ 1 ] = result[ 1 ].toLowerCase();
			}

			result[ 1 ] = result[ 1 ].charAt( 0 );

			if ( result[ 1 ] === "B" ) {
				result[ 0 ] = Math.floor( result[ 0 ] );
				result[ 1 ] = "";
			}
			else if ( !bits && result[ 1 ] === "k" ) {
				result[ 1 ] = "K";
			}
		}
	}

	// Decorating a 'diff'
	if ( neg ) {
		result[ 0 ] = -result[ 0 ];
	}

	// Applying custom suffix
	result[ 1 ] = suffixes[ result[ 1 ] ] || result[ 1 ];

	// Returning Array, Object, or String (default)
	if ( output === "array" ) {
		return result;
	}
	else if ( output === "object" ) {
		return { value: result[ 0 ], suffix: result[ 1 ] };
	}
	else {
		return result.join( spacer );
	}
}

/**
 * SI suffixes
 *
 * @type {Object}
 */
var si = {
	bits: [ "B", "kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb" ],
	bytes: [ "B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ]
};

// CommonJS, AMD, script tag
if ( typeof exports !== "undefined" ) {
	module.exports = filesize;
}
else if ( typeof define === "function" ) {
	define( function () {
		return filesize;
	} );
}
else {
	global.filesize = filesize;
}
} )( this );
