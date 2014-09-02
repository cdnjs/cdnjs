YUI.add('event-mouseenter', function(Y) {

/**
 * Adds support for mouseenter/mouseleave events
 * @module event
 * @submodule event-mouseenter
 */
var Event = Y.Event,
	Lang = Y.Lang,

	plugins = Y.Env.evt.plugins,
	
	listeners = {},

	eventConfig = {

    	on: function(type, fn, el) {

		    var args = Y.Array(arguments, 0, true),	    
				element = el,
				availHandle;


			if (Lang.isString(el)) {

				//	Need to use Y.all because if el is a string it could be a 
				//	selector that returns a NodeList

				element = Y.all(el);

				if (element.size() === 0) { // Not found, check using onAvailable

		            availHandle = Event.onAvailable(el, function() {

		                availHandle.handle = Y.on.apply(Y, args);

		            }, Event, true, false);
		
					return availHandle;

				}

			}
			

	        var sDOMEvent = (type === "mouseenter") ? "mouseover" : "mouseout",

				//	The name of the custom event
				sEventName = type + ":" + Y.stamp(element) + sDOMEvent,

				listener = listeners[sEventName],

				domEventHandle,
				
				ceHandle,
				
				nListeners;


			//	Bind an actual DOM event listener that will call the 
			//	the custom event				
			if (!listener) {
				
				domEventHandle = Y.on(sDOMEvent, Y.rbind(Event._fireMouseEnter, Y, sEventName), element);

				//	Hook into the _delete method for the Custom Event wrapper of this
				//	DOM Event in order to clean up the 'listeners' map and unsubscribe
				//	the associated Custom Event listeners fired by this DOM event
				//	listener if/when the user calls "purgeElement" OR removes all 
				//	listeners of the Custom Event.

				Y.after(function (sub) {

					if (domEventHandle.sub == sub) {

						//	Delete this event from the map of known mouseenter 
						//	and mouseleave listeners
						delete listeners[sEventName];

						Y.log("DOM event listener associated with the " + sEventName + " Custom Event removed.  Removing all " + sEventName + " listeners.", "info", "Event");

						//	Unsubscribe all listeners of the Custom Event fired 
						//	by this DOM event.
						Y.detachAll(sEventName);

					}

				}, domEventHandle.evt, "_delete");
				

				listener = {};				
				listener.handle = domEventHandle;				

				listeners[sEventName] = listener;

			}

			nListeners = listener.count;

			listener.count = nListeners ? (nListeners + 1) : 1;

	        args[0] = sEventName;

	        // Remove the element from the args
			args.splice(2, 1);

	        // Subscribe to the custom event
	        ceHandle = Y.on.apply(Y, args);
	
			//	Hook into the detach method of the handle in order to clean up the 
			//	'listeners' map and remove the associated DOM event handler 
			//	responsible for firing this Custom Event if all listener for this 
			//	event have been removed.

			Y.after(function () {

				listener.count = (listener.count - 1);

				if (listener.count === 0) {
					Y.log("No more listeners for the " + sEventName + " Custom Event.  Removing its associated DOM event listener.", "info", "Event");
					listener.handle.detach();
				}

			}, ceHandle, "detach");	
	
	
			return ceHandle;

	    }

	};
	

Event._fireMouseEnter = function (e, eventName) {

	var relatedTarget = e.relatedTarget,
		currentTarget = e.currentTarget;

	if (currentTarget !== relatedTarget && 
		!currentTarget.contains(relatedTarget)) {

		Y.publish(eventName, {
               contextFn: function() {
                   return currentTarget;
               }
           });			

		Y.fire(eventName, e);

	}

};	


/**
 * Sets up a "mouseenter" listener&#151;a listener that is called the first time 
 * the user's mouse enters the specified element(s).
 * 
 * @event mouseenter
 * @param type {string} "mouseenter"
 * @param fn {function} The method the event invokes.
 * @param el {string|node} The element(s) to assign the listener to.
 * @param spec {string} Optional.  String representing a selector that must 
 * match the target of the event in order for the listener to be called.
 * @return {EventHandle} the detach handle
 * @for YUI
 */
plugins.mouseenter = eventConfig;

/**
* Sets up a "mouseleave" listener&#151;a listener that is called the first time 
* the user's mouse leaves the specified element(s).
* 
* @event mouseleave
* @param type {string} "mouseleave"
* @param fn {function} The method the event invokes.
* @param el {string|node} The element(s) to assign the listener to.
* @param spec {string} Optional.  String representing a selector that must 
* match the target of the event in order for the listener to be called.
* @return {EventHandle} the detach handle
* @for YUI
 */
plugins.mouseleave = eventConfig;


}, '@VERSION@' ,{requires:['node-base']});
