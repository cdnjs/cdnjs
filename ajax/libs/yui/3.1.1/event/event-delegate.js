YUI.add('event-delegate', function(Y) {

/**
 * Adds event delegation support to the library.
 * 
 * @module event
 * @submodule event-delegate
 */

var Event = Y.Event,
	Lang = Y.Lang,

	delegates = {},
	
	specialTypes = {
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	},

	resolveTextNode = function(n) {
	    try {
	        if (n && 3 == n.nodeType) {
	            return n.parentNode;
	        }
	    } catch(e) { }
	    return n;
	},

    delegateHandler = function(delegateKey, e, el) {

        var target = resolveTextNode((e.target || e.srcElement)), 
            tests  = delegates[delegateKey],
            spec, 
			ename,
			matched,
			fn,
			ev;


		var getMatch = function(el, selector, container) {
			
			var returnVal;
			
			if (!el || el === container) {
				returnVal = false;
			}
			else {
				returnVal = Y.Selector.test(el, selector, container) ? el: getMatch(el.parentNode, selector, container);
			}
			
			return returnVal;
			
		};


        for (spec in tests) {

            if (tests.hasOwnProperty(spec)) {

                ename  = tests[spec];
				fn	= tests.fn;
				matched = null;


				if (Y.Selector.test(target, spec, el)) {
					matched = target;
				}
                else if (Y.Selector.test(target, ((spec.replace(/,/gi, " *,")) + " *"), el)) {
                     
                 //  The target is a descendant of an element matching 
                 //  the selector, so crawl up to find the ancestor that 
                 //  matches the selector
                 
                 matched = getMatch(target, spec, el);
                 
                }


				if (matched) {

                    if (!ev) {
                        ev = new Y.DOMEventFacade(e, el);
                        ev.container = ev.currentTarget;
                    }

                    ev.currentTarget = Y.one(matched);

					Y.publish(ename, {
			               contextFn: function() {
			                   return ev.currentTarget;
			               }
			           });

					if (fn) {
						fn(ev, ename);
					}
					else {
                    	Y.fire(ename, ev);								
					}
					
				}

            }
        }

    },

	attach = function (type, key, element) {

		var focusMethods = {
				focus: Event._attachFocus,
				blur: Event._attachBlur
			},

			attachFn = focusMethods[type],

			args = [type, 
			function (e) {
	            delegateHandler(key, (e || window.event), element);
			}, 
			element];


		if (attachFn) {
			return attachFn(args, { capture: true, facade: false });
		}
		else {
			return Event._attach(args, { facade: false });
		}
		
	},

    sanitize = Y.cached(function(str) {
        return str.replace(/[|,:]/g, '~');
    });



/**
 * Sets up event delegation on a container element.  The delegated event
 * will use a supplied selector to test if the target or one of the
 * descendants of the target match it.  The supplied callback function 
 * will only be executed if a match was encountered, and, in fact, 
 * will be executed for each element that matches if you supply an 
 * ambiguous selector.
 *
 * The event object for the delegated event is supplied to the callback
 * function.  It is modified slightly in order to support all properties
 * that may be needed for event delegation.  'currentTarget' is set to
 * the element that matched the delegation specifcation.  'container' is
 * set to the element that the listener is bound to (this normally would
 * be the 'currentTarget').
 *
 * @method delegate
 * @param type {string} the event type to delegate
 * @param fn {function} the callback function to execute.  This function
 * will be provided the event object for the delegated event.
 * @param el {string|node} the element that is the delegation container
 * @param spec {string} a selector that must match the target of the
 * event.
 * @param context optional argument that specifies what 'this' refers to.
 * @param args* 0..n additional arguments to pass on to the callback function.
 * These arguments will be added after the event object.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
Event.delegate = function (type, fn, el, spec) {

    if (!spec) {
        return false;
    }


    var args = Y.Array(arguments, 0, true),	    
		element = el,	// HTML element serving as the delegation container
		availHandle;	


	if (Lang.isString(el)) {
		
		//	Y.Selector.query returns an array of matches unless specified 
		//	to return just the first match.  Since the primary use case for
		//	event delegation is to use a single event handler on a container,
		//	Y.delegate doesn't currently support being able to bind a 
		//	single listener to multiple containers.
		
		element = Y.Selector.query(el, null, true);
		
		if (!element) { // Not found, check using onAvailable

			availHandle = Event.onAvailable(el, function() {

				availHandle.handle = Event.delegate.apply(Event, args);

            }, Event, true, false);

            return availHandle;
			
		}
		
	}


	element = Y.Node.getDOMNode(element);


	var	guid = Y.stamp(element),
            
        // The Custom Event for the delegation spec
        ename = 'delegate:' + guid + type + sanitize(spec),

        // The key to the listener for the event type and container
        delegateKey = type + guid,

		delegate = delegates[delegateKey],

		domEventHandle,
		
		ceHandle,
		
		listeners;
	

    if (!delegate) {

		delegate = {};

		if (specialTypes[type]) {
			
			if (!Event._fireMouseEnter) {
				return false;				
			}
			
			type = specialTypes[type];
			delegate.fn = Event._fireMouseEnter;
			
		}

		//	Create the DOM Event wrapper that will fire the Custom Event

		domEventHandle = attach(type, delegateKey, element);


		//	Hook into the _delete method for the Custom Event wrapper of this
		//	DOM Event in order to clean up the 'delegates' map and unsubscribe
		//	the associated Custom Event listeners fired by this DOM event
		//	listener if/when the user calls "purgeElement" OR removes all 
		//	listeners of the Custom Event.
		
		Y.after(function (sub) {

			if (domEventHandle.sub == sub) {

				//	Delete this event from the map of known delegates
				delete delegates[delegateKey];


				//	Unsubscribe all listeners of the Custom Event fired 
				//	by this DOM event.
				Y.detachAll(ename);
				
			}

		}, domEventHandle.evt, "_delete");
			
		delegate.handle = domEventHandle;

        delegates[delegateKey] = delegate;

    }


	listeners = delegate.listeners;

	delegate.listeners = listeners ? (listeners + 1) : 1;
    delegate[spec] = ename;


    args[0] = ename;

    // Remove element, delegation spec
    args.splice(2, 2);
        

    // Subscribe to the Custom Event for the delegation spec

	ceHandle = Y.on.apply(Y, args);


	//	Hook into the detach method of the handle in order to clean up the 
	//	'delegates' map and remove the associated DOM event handler 
	//	responsible for firing this Custom Event if all listener for this 
	//	event have been removed.

	Y.after(function () {
			
		delegate.listeners = (delegate.listeners - 1);
		
		if (delegate.listeners === 0) {
			delegate.handle.detach();
		}

	}, ceHandle, "detach");

    return ceHandle;
	
};

Y.delegate = Event.delegate;


}, '@VERSION@' ,{requires:['node-base']});
