;(function( $, window ){

/*
	http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel
*/

// jQuery method
$.fn.fire = function( type, opts ){
	// translate pageX to clientX
	if ( opts.pageX && !opts.clientX )	
		opts.clientX = opts.pageX - $( window ).scrollLeft();
	// translate pageY to clientY
	if ( opts.pageY && !opts.clientY )	
		opts.clientY = opts.pageY - $( window ).scrollTop();
	// iterate the jquery collection	
	return this.each(function(){
		// clone options uniquely for each instance
		opts = $.extend( {}, $.fire.defaults, opts );
		// instanitate a new event
		new $.fire( this, type, opts );
	});
};		   

// Constructor
$.fire = function( element, type, opts ){
	this.element = element;
	this.type = type;
	this.event = this.create( opts );
	this.dispatch();
};

// Defaults 
$.fire.defaults = {
	bubbles: true, 
	cancelable: true, 
	view: window, 
	detail: 0,
	screenX: 0, 
	screenY: 0, 
	clientX: 0, 
	clientY: 0,
	ctrlKey: false, 
	altKey: false, 
	shiftKey: false, 
	metaKey: false,
	button: 0
};

// Methods
$.fire.prototype = {
	create: function( opts ){
		switch ( this.type ){
			case "mousemove":
				opts.cancelable = false;
			case "mousedown":
			case "mouseup":
			case "mouseover":
			case "mouseout":
			case "click":
			case "dblclick":
			case "touchstart":
			case "touchmove":
			case "touchend":
				return this.mouse( opts );
			case "keyup":
			case "keypress":
			case "keydown":
				return this.key( opts );
			default:
				return this.event( opts );
		}
	},
	event: function( opts ){
		var event;
		if ( document.createEvent ){
			event = document.createEvent("HTMLEvents");
			event.initEvent(
				this.type, 
				opts.bubbles, 
				opts.cancelable
			);
			$.extend( event, { 
				view: opts.view,
				detail: opts.detail,
				screenX: opts.screenX, 
				screenY: opts.screenY, 
				clientX: opts.clientX, 
				clientY: opts.clientY,
				ctrlKey: opts.ctrlKey, 
				altKey: opts.altKey, 
				shiftKey: opts.shiftKey, 
				metaKey: opts.metaKey,
				keyCode: opts.keyCode, 
				charCode: opts.charCode,
				button: opts.button
			});
		} 
		else if ( document.createEventObject ) {
			event = $.extend( document.createEventObject(), opts );
		}
		return event;			
	},
	mouse: function( opts ){
		var event;
		if ( document.createEvent ){
			event = document.createEvent("MouseEvents");
			event.initMouseEvent(
				this.type, 
				opts.bubbles, 
				opts.cancelable, 
				opts.view, 
				opts.detail,
				opts.screenX, 
				opts.screenY, 
				opts.clientX, 
				opts.clientY,
				opts.ctrlKey, 
				opts.altKey, 
				opts.shiftKey, 
				opts.metaKey,
				opts.button, 
				$( opts.relatedTarget )[0] || document.body.parentNode 
			);
		} 
		else if ( document.createEventObject ) {
			event = this.event();
			event.button = { 0:1, 1:4, 2:2 }[ event.button ] || event.button;
		}
		return event;
	},
	key: function( opts ){
		var event;
		if ( document.createEvent ) {
			try {
				event = document.createEvent("KeyEvents");
				event.initKeyEvent(
					this.type, 
					opts.bubbles, 
					opts.cancelable, 
					opts.view,
					opts.ctrlKey, 
					opts.altKey, 
					opts.shiftKey, 
					opts.metaKey,
					opts.keyCode, 
					opts.charCode
				);
			} 
			catch ( err ){
				event = this.event( opts );
			}
		} 
		else if ( document.createEventObject ){
			event = this.event( opts );
		}
		if ( $.browser.msie || $.browser.opera ){
			event.keyCode = opts.charCode > 0 ? opts.charCode : opts.keyCode;
			event.charCode = undefined;
		}
		return event;
	},
	dispatch: function(){
		if ( this.element.dispatchEvent )
			this.element.dispatchEvent( this.event );
		else if ( this.element.fireEvent )
			this.element.fireEvent( 'on'+this.type, this.event );
	}
};

})( jQuery, window );