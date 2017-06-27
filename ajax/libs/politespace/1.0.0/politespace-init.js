/*! politespace - v1.0.0 - 2017-06-05
Politely add spaces to input values to increase readability (credit card numbers, phone numbers, etc).
 * https://github.com/filamentgroup/politespace
 * Copyright (c) 2017 Filament Group (@filamentgroup)
 * MIT License */

(function( win ) {
	"use strict";

	var $;
	if( 'shoestring' in win ) {
		$ = win.shoestring;
	} else if( 'jQuery' in win ) {
		$ = win.jQuery;
	} else {
		throw new Error( "politespace: DOM library not found." );
	}

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ) {
		var $sel = $( e.target ).is( "[data-politespace]" ) ? $( e.target ) : $( "[data-politespace]", e.target );
		$sel.politespace();
	});

})( typeof window !== "undefined" ? window : this );
