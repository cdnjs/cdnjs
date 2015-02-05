YUI.add('event-focus', function(Y) {

/**
 * Adds focus and blur event listener support.  These events normally
 * do not bubble, so this adds support for that so these events
 * can be used in event delegation scenarios.
 * 
 * @module event
 * @submodule event-focus
 */
(function() {

var UA = Y.UA,
	Event = Y.Event,
	plugins = Y.Env.evt.plugins,
	ie = UA.ie,
	bUseMutation = (UA.opera || UA.webkit),
	eventNames = {
		focus: (ie ? 'focusin' : (bUseMutation ? 'DOMFocusIn' : 'focus')),
		blur: (ie ? 'focusout' : (bUseMutation ? 'DOMFocusOut' : 'blur'))
	},

	//	Only need to use capture phase for Gecko since it doesn't support 
	//	focusin, focusout, DOMFocusIn, or DOMFocusOut
    CAPTURE_CONFIG = { capture: (UA.gecko ? true : false) },


	attach = function (args, config) {

	    var a = Y.Array(args, 0, true);
		a[0] = eventNames[a[0]];
	    return Event._attach(a, config);

	},
	
	eventAdapter = {

		on: function () {
			return attach(arguments, CAPTURE_CONFIG);
		}

	};


Event._attachFocus = attach;
Event._attachBlur = attach;

/**
 * Adds a DOM focus listener.  Uses the focusin event in IE, 
 * DOMFocusIn for Opera and Webkit, and the capture phase for Gecko so that
 * the event propagates in a way that enables event delegation.
 *
 * @for YUI
 * @event focus
 * @param type {string} 'focus'
 * @param fn {function} the callback function to execute
 * @param o {string|HTMLElement|collection} the element(s) to bind
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 */
plugins.focus = eventAdapter;

/**
 * Adds a DOM blur listener.  Uses the focusout event in IE, 
 * DOMFocusOut for Opera and Webkit, and the capture phase for Gecko so that
 * the event propagates in a way that enables event delegation.
 *
 * @for YUI
 * @event blur
 * @param type {string} 'blur'
 * @param fn {function} the callback function to execute
 * @param o {string|HTMLElement|collection} the element(s) to bind
 * @param context optional context object
 * @param args 0..n additional arguments to provide to the listener.
 * @return {EventHandle} the detach handle
 */
plugins.blur = eventAdapter;

})();


}, '@VERSION@' ,{requires:['node-base']});
