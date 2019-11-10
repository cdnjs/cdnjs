/*!
 * jquery.requestanimationframe - 0.1.3-pre
 * https://github.com/gnarf37/jquery-requestAnimationFrame
 * Requires jQuery 1.8+
 *
 * Copyright (c) 2016 Corey Frang
 * Licensed under the MIT license.
 */
 // UMD factory https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( jQuery ) {

if ( Number( jQuery.fn.jquery.split( "." )[ 0 ] ) >= 3 ) {
	if ( window.console && window.console.warn ) {
		window.console.warn( "The jquery.requestanimationframe plugin is not needed " +
			"in jQuery 3.0 or newer as they handle it natively." );
	}
	return;
}

var animating;

function raf() {
	if ( animating ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

if ( window.requestAnimationFrame ) {
	jQuery.fx.timer = function( timer ) {
		if ( timer() && jQuery.timers.push( timer ) && !animating ) {
			animating = true;
			raf();
		}
	};

	jQuery.fx.stop = function() {
		animating = false;
	};
}

} );
