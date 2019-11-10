/*! 
 * jquery.event.linger - v 1.0.0 
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
// Created: 2008-06-02
// Updated: 2010-09-13
// REQUIRES: jquery 1.4.2+

;(function($){ // secure $ jQuery alias

// add the jquery instance method
$.fn.linger = function( str, arg, opts ){
	// figure out the event type
	var type = typeof str == "string" ? str : "",
	// figure out the event handler...
	fn = $.isFunction( str ) ? str : $.isFunction( arg ) ? arg : null;
	// fix the event type
	if ( type.indexOf("linger") !== 0 ) 
		type = "linger"+ type;
	// were options passed
	opts = ( str == fn ? arg : opts ) || {};
	// trigger or bind event handler
	return fn ? this.bind( type, opts, fn ) : this.trigger( type );
};


// local refs (increase compression)
var $event = $.event, 
$special = $event.special,
// special event configuration
linger = $special.linger = {
	
	// default settings
	defaults: {
		speed: 100, // speed limit (pixels per second)
		delay: 100, // milliseconds per speed check
		persist: 400 // milliseconds after mouseleave
	},
	
	// the key name for stored data
	datakey: "lingerdata",
	
	// count bound related events
	add: function( obj ){
		// read the interaction data
		var data = $.data( this, linger.datakey ),
		// read any passed options 
		opts = obj.data || {};
		// count another realted event
		data.related += 1;
		// extend data options bound with this event
		// don't iterate "opts" in case it is a node 
		$.each( linger.defaults, function( key, def ){
			if ( opts[ key ] !== undefined )
				data[ key ] = opts[ key ];
		});
	},
	
	// forget unbound related events
	remove: function(){
		$.data( this, linger.datakey ).related -= 1;
	},
	
	// configure interaction
	setup: function(){
		// check for related events
		if ( $.data( this, linger.datakey ) ) 
			return;
		// initialize the drag data with copied defaults
		var data = $.extend({ related:0 }, linger.defaults );
		// store the interaction data
		$.data( this, linger.datakey, data );
		// bind the mouse events with data
		$event.add( this, "mouseenter mouseleave", linger.handler, data );
	},
	
	// destroy configured interaction
	teardown: function(){
		// check for related events
		if ( $.data( this, linger.datakey ).related ) 
			return;
		// remove the stored data
		$.removeData( this, linger.datakey );
		// remove the mouse events
		$event.remove( this, "mouseenter mousemove mouseleave", linger.handler );
	},
	
	// handle mouse events
	handler: function( event ){ 
		var data = event.data || {};
		// initialize props for new interaction
		if ( event.type == "mouseenter" && !data.lingered ){
			// mouse distance squared
			data.dist2 = 0; 
			// ( speed * time ) squared
			data.limit = Math.pow( data.speed * ( data.delay/1e3 ), 2 );
			// the interacted element
			data.elem = this; 
			// handle the start event (handler may return false to cancel)
			if ( linger.hijack( event, "lingerstart", this ) ){ 
				// store the event, to compare later
				data.event = event; 
				// begin tracking the mouse movement
				$event.add( this, "mousemove", linger.handler, data ); 
				// start comparing mouse speed at fixed intervals
				data.timer = setTimeout(function(){ 
					// check the current speed against the limit
					if ( data.dist2 <= data.limit )
						// handle the linger event (handler may return false to cancel)
						data.lingered = linger.hijack( data.event, "linger", data.elem );
					// stop tracking the mouse
					if ( data.lingered )  
						$event.remove( data.elem, "mousemove", linger.handler ); 		
					// recurse
					else
						data.timer = setTimeout( arguments.callee, data.delay );
					// reset distance for next comparison
					data.dist2 = 0;
				}, data.delay ); 
			}
		}
		// stop if not properly initialized
		if ( !data.event )
			return;
		// handle other events	
		switch ( event.type ){
			// mouse re-entry
			case data.lingered && 'mouseenter':
				// stop the current timer
				clearTimeout( data.timer ); 
				break;
			// track mouse movement
			case 'mousemove': 
				// distance² = x² + y²
				data.dist2 += Math.pow( event.pageX - data.event.pageX, 2 ) 
					+ Math.pow( event.pageY - data.event.pageY, 2 ); 
				// store current event	
				data.event = event; 
				break;
			// handle leaving after lingering
			case data.lingered && 'mouseleave': 
				// optionally delay the end event 
				data.timer = setTimeout(function(){
					// handle the end event, flip flag for lingering
					data.lingered = !linger.hijack( event, "lingerend", data.elem );
					// if still lingering, recurse
					if ( data.lingered )
						setTimeout( arguments.callee, data.persist );
				}, data.persist );
				break;
			// handle leaving after no lingering
			case !data.lingered && 'mouseleave':		
				// stop the current timer
				clearTimeout( data.timer ); 
				// stop tracking the mouse movement
				$event.remove( data.elem, "mousemove", linger.handler ); 
				// clean the data for next interaction
				data.event = null;
				break;
		} 
	},
		
	// re-use event object for custom events
	hijack: function( event, type, elem ){ 
		// remember the original event and type
		var result, orig = { 
			event: event.originalEvent, 
			type: event.type 
		};
		// modify the event type
		event.type = type;
		// remove the original event
		event.originalEvent = null;
		// remove any previous event result
		event.result = null;
		// handle the custom event
		result = $event.handle.call( elem, event );
		// restore the original event & type
		event.type = orig.type;
		event.originalEvent = orig.event;
		// return handled result
		return ( result !== false );
	}
};

// share the same special event configuration with related events...
$special.lingerstart = $special.lingerend = linger;
	
})(jQuery); // confine scope