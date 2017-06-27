steal('can/control/modifier', './jwerty.js' function(Control){

/**
 * Add templated-event-binding with keydown specific bindings
 * into CanJS(http://www.canjs.us) JavaScript framework.
 *
 * For example, the following would bind to keydown on "CTRL+P".
 *
 *	can.Control({
 * 		"keydown:(ctrl+p)":function(elm,ev){
 *			console.log("ctrl+p was pressed");
 *		}
 * 	});
 *
 */

// Hang on to original action
var originalShifter = can.Control._shifter;

// Redefine _isAction to handle new syntax
can.extend( can.Control, {

	_shifter: function( context, name ) {
			var fn = originalShifter.apply( this, arguments ),
			    parts = name.split(":");

		if ( parts[1] && parts[0] === "keydown" ) {
			fn = jwerty.event(parts[1].replace(/\(|\)/gi,''), fn);
		}

		return fn;
	}
});

});