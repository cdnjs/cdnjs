/*! 
 * jquery.event.wheel - v 1.0.0 - http://jquery-ux.com/
 * Copyright (c) 2010 Michael Helgeson, Three Dub Media
 * Open Source MIT License - http://jquery-ux.com/license 
 */
// Created: 2008-07-01
// Updated: 2010-01-08
// REQUIRES: jquery 1.3+

;(function( $ ){ // secure $ jQuery alias

// jquery method
$.fn.wheel = function( fn ){
	return this[ fn ? "bind" : "trigger" ]( "wheel", fn );
};

// special event config
var wheel = $.event.special.wheel = {
	events: "DOMMouseScroll mousewheel" // IE, opera, safari, firefox
		+( $.browser.mozilla && $.browser.version < "1.9" ? " mousemove" : "" ), // firefox 2
	setup: function(){
		$.event.add( this, wheel.events, wheel.handler, {} );
	},
	teardown: function(){
		$.event.remove( this, wheel.events, wheel.handler );
	},
	handler: function( event ){ 
		switch ( event.type ){
			case "mousewheel": // IE, opera, safari
				event.delta = event.wheelDelta/120; 
				if ( window.opera ){
					event.delta *= -1; 
				}
				break;
			case	 "DOMMouseScroll": // firefox
				$.extend( event, event.data ); // fix event properties in FF2
				event.delta = -event.detail/3; 
				break;
			case "mousemove": // FF2 has incorrect event positions
				return $.extend( event.data, { // store the correct properties
					clientX: event.clientX, pageX: event.pageX, 
					clientY: event.clientY, pageY: event.pageY
				});			
		}
		event.type = "wheel"; // hijack the event	
		return $.event.handle.call( this, event, event.delta );
	}
};
	
})( jQuery ); // confine scope