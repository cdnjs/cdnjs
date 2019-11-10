/*!
* TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/


//##############################################################################
// extend.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Sets up the prototype chain and constructor property for a new class.
 *
 * This should be called right after creating the class constructor.
 *
 * 	function MySubClass() {}
 * 	createjs.extend(MySubClass, MySuperClass);
 * 	MySubClass.prototype.doSomething = function() { }
 *
 * 	var foo = new MySubClass();
 * 	console.log(foo instanceof MySuperClass); // true
 * 	console.log(foo.prototype.constructor === MySubClass); // true
 *
 * @method extend
 * @param {Function} subclass The subclass.
 * @param {Function} superclass The superclass to extend.
 * @return {Function} Returns the subclass's new prototype.
 */
createjs.extend = function(subclass, superclass) {
	"use strict";

	function o() { this.constructor = subclass; }
	o.prototype = superclass.prototype;
	return (subclass.prototype = new o());
};

//##############################################################################
// promote.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Promotes any methods on the super class that were overridden, by creating an alias in the format `prefix_methodName`.
 * It is recommended to use the super class's name as the prefix.
 * An alias to the super class's constructor is always added in the format `prefix_constructor`.
 * This allows the subclass to call super class methods without using `function.call`, providing better performance.
 *
 * For example, if `MySubClass` extends `MySuperClass`, and both define a `draw` method, then calling `promote(MySubClass, "MySuperClass")`
 * would add a `MySuperClass_constructor` method to MySubClass and promote the `draw` method on `MySuperClass` to the
 * prototype of `MySubClass` as `MySuperClass_draw`.
 *
 * This should be called after the class's prototype is fully defined.
 *
 * 	function ClassA(name) {
 * 		this.name = name;
 * 	}
 * 	ClassA.prototype.greet = function() {
 * 		return "Hello "+this.name;
 * 	}
 *
 * 	function ClassB(name, punctuation) {
 * 		this.ClassA_constructor(name);
 * 		this.punctuation = punctuation;
 * 	}
 * 	createjs.extend(ClassB, ClassA);
 * 	ClassB.prototype.greet = function() {
 * 		return this.ClassA_greet()+this.punctuation;
 * 	}
 * 	createjs.promote(ClassB, "ClassA");
 *
 * 	var foo = new ClassB("World", "!?!");
 * 	console.log(foo.greet()); // Hello World!?!
 *
 * @method promote
 * @param {Function} subclass The class to promote super class methods on.
 * @param {String} prefix The prefix to add to the promoted method names. Usually the name of the superclass.
 * @return {Function} Returns the subclass.
 */
createjs.promote = function(subclass, prefix) {
	"use strict";

	var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
	if (supP) {
		subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
		for (var n in supP) {
			if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
		}
	}
	return subclass;
};

//##############################################################################
// deprecate.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Wraps deprecated methods so they still be used, but throw warnings to developers.
 *
 *	obj.deprecatedMethod = createjs.deprecate("Old Method Name", obj._fallbackMethod);
 *
 * The recommended approach for deprecated properties is:
 *
 *	try {
 *		Obj	ect.defineProperties(object, {
 *			readyOnlyProp: { get: createjs.deprecate("readOnlyProp", function() { return this.alternateProp; }) },
 *			readWriteProp: {
 *				get: createjs.deprecate("readOnlyProp", function() { return this.alternateProp; }),
 *				set: createjs.deprecate("readOnlyProp", function(val) { this.alternateProp = val; })
 *		});
 *	} catch (e) {}
 *
 * @method deprecate
 * @param {Function} [fallbackMethod=null] A method to call when the deprecated method is used. See the example for how
 * @param {String} [name=null] The name of the method or property to display in the console warning.
 * to deprecate properties.
 * @return {Function} If a fallbackMethod is supplied, returns a closure that will call the fallback method after
 * logging the warning in the console.
 */
createjs.deprecate = function(fallbackMethod, name) {
	"use strict";
	return function() {
		var msg = "Deprecated property or method '"+name+"'. See docs for info.";
		console && (console.warn ? console.warn(msg) : console.log(msg));
		return fallbackMethod && fallbackMethod.apply(this, arguments);
	}
};

//##############################################################################
// Event.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

// constructor:
	/**
	 * Contains properties and methods shared by all events for use with
	 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
	 * 
	 * Note that Event objects are often reused, so you should never
	 * rely on an event object's state outside of the call stack it was received in.
	 * @class Event
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @constructor
	 **/
	function Event(type, bubbles, cancelable) {
		
	
	// public properties:
		/**
		 * The type of event.
		 * @property type
		 * @type String
		 **/
		this.type = type;
	
		/**
		 * The object that generated an event.
		 * @property target
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.target = null;
	
		/**
		 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
		 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
		 * is generated from childObj, then a listener on parentObj would receive the event with
		 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
		 * @property currentTarget
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.currentTarget = null;
	
		/**
		 * For bubbling events, this indicates the current event phase:<OL>
		 * 	<LI> capture phase: starting from the top parent to the target</LI>
		 * 	<LI> at target phase: currently being dispatched from the target</LI>
		 * 	<LI> bubbling phase: from the target to the top parent</LI>
		 * </OL>
		 * @property eventPhase
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.eventPhase = 0;
	
		/**
		 * Indicates whether the event will bubble through the display list.
		 * @property bubbles
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.bubbles = !!bubbles;
	
		/**
		 * Indicates whether the default behaviour of this event can be cancelled via
		 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
		 * @property cancelable
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.cancelable = !!cancelable;
	
		/**
		 * The epoch time at which this event was created.
		 * @property timeStamp
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.timeStamp = (new Date()).getTime();
	
		/**
		 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
		 * on this event.
		 * @property defaultPrevented
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.defaultPrevented = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
		 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
		 * @property propagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.propagationStopped = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
		 * on this event.
		 * @property immediatePropagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.immediatePropagationStopped = false;
		
		/**
		 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
		 * @property removed
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.removed = false;
	}
	var p = Event.prototype;

// public methods:
	/**
	 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true if the event is cancelable.
	 * Mirrors the DOM level 2 event standard. In general, cancelable events that have `preventDefault()` called will
	 * cancel the default behaviour associated with the event.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = this.cancelable&&true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * Causes the active listener to be removed via removeEventListener();
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * Returns a clone of the Event instance.
	 * @method clone
	 * @return {Event} a clone of the Event instance.
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on the instance.
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the instance.
	 * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
	 * @chainable
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

	createjs.Event = Event;
}());

//##############################################################################
// EventDispatcher.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
	 *
	 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
	 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
	 * 
	 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
	 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
	 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
	 * 
	 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
	 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
	 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
	 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
	 * 
	 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
	 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
	 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
	 *
	 * <h4>Example</h4>
	 * Add EventDispatcher capabilities to the "MyClass" class.
	 *
	 *      EventDispatcher.initialize(MyClass.prototype);
	 *
	 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
	 *
	 *      instance.addEventListener("eventName", handlerMethod);
	 *      function handlerMethod(event) {
	 *          console.log(event.target + " Was Clicked");
	 *      }
	 *
	 * <b>Maintaining proper scope</b><br />
	 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
	 * method to subscribe to events simplifies this.
	 *
	 *      instance.addEventListener("click", function(event) {
	 *          console.log(instance == this); // false, scope is ambiguous.
	 *      });
	 *      
	 *      instance.on("click", function(event) {
	 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
	 *      });
	 * 
	 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage
	 * scope.
	 *
	 * <b>Browser support</b>
	 * The event model in CreateJS can be used separately from the suite in any project, however the inheritance model
	 * requires modern browsers (IE9+).
	 *      
	 *
	 * @class EventDispatcher
	 * @constructor
	 **/
	function EventDispatcher() {
	
	
	// private properties:
		/**
		 * @protected
		 * @property _listeners
		 * @type Object
		 **/
		this._listeners = null;
		
		/**
		 * @protected
		 * @property _captureListeners
		 * @type Object
		 **/
		this._captureListeners = null;
	}
	var p = EventDispatcher.prototype;

// static public methods:
	/**
	 * Static initializer to mix EventDispatcher methods into a target object or prototype.
	 * 
	 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
	 * 		EventDispatcher.initialize(myObject); // add to a specific instance
	 * 
	 * @method initialize
	 * @static
	 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
	 * prototype.
	 **/
	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
		target.willTrigger = p.willTrigger;
	};
	

// public methods:
	/**
	 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
	 * multiple callbacks getting fired.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *         // Click happened.
	 *      }
	 *
	 * @method addEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function | Object} Returns the listener for chaining or assignment.
	 **/
	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; // remove may have deleted the array
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	
	/**
	 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
	 * only run once, associate arbitrary data with the listener, and remove the listener.
	 * 
	 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
	 * The wrapper function is returned for use with `removeEventListener` (or `off`).
	 * 
	 * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener, or use
	 * {{#crossLink "Event/remove"}}{{/crossLink}}. Likewise, each time you call `on` a NEW wrapper function is subscribed, so multiple calls
	 * to `on` with the same params will create multiple listeners.
	 * 
	 * <h4>Example</h4>
	 * 
	 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
	 * 		function handleClick(evt, data) {
	 * 			data.count -= 1;
	 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
	 * 			if (data.count == 0) {
	 * 				alert("clicked 3 times!");
	 * 				myBtn.off("click", listener);
	 * 				// alternately: evt.remove();
	 * 			}
	 * 		}
	 * 
	 * @method on
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
	 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
	 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
	 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
	 **/
	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};

	/**
	 * Removes the specified event listener.
	 *
	 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
	 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
	 * closure will not work.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.removeEventListener("click", handleClick);
	 *
	 * @method removeEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } // allows for faster checks.
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	
	/**
	 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
	 * .on method.
	 * 
	 * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener. See 
	 * {{#crossLink "EventDispatcher/on"}}{{/crossLink}} for an example.
	 *
	 * @method off
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.off = p.removeEventListener;

	/**
	 * Removes all listeners for the specified type, or all listeners of all types.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Remove all listeners
	 *      displayObject.removeAllEventListeners();
	 *
	 *      // Remove all click listeners
	 *      displayObject.removeAllEventListeners("click");
	 *
	 * @method removeAllEventListeners
	 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
	 **/
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};

	/**
	 * Dispatches the specified event to all listeners.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Use a string event
	 *      this.dispatchEvent("complete");
	 *
	 *      // Use an Event instance
	 *      var event = new createjs.Event("progress");
	 *      this.dispatchEvent(event);
	 *
	 * @method dispatchEvent
	 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
	 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
	 * dispatchEvent will construct an Event instance if necessary with the specified type. This latter approach can
	 * be used to avoid event object instantiation for non-bubbling events that may not have any listeners.
	 * @param {Boolean} [bubbles] Specifies the `bubbles` value when a string was passed to eventObj.
	 * @param {Boolean} [cancelable] Specifies the `cancelable` value when a string was passed to eventObj.
	 * @return {Boolean} Returns false if `preventDefault()` was called on a cancelable event, true otherwise.
	 **/
	p.dispatchEvent = function(eventObj, bubbles, cancelable) {
		if (typeof eventObj == "string") {
			// skip everything if there's no listeners and it doesn't bubble:
			var listeners = this._listeners;
			if (!bubbles && (!listeners || !listeners[eventObj])) { return true; }
			eventObj = new createjs.Event(eventObj, bubbles, cancelable);
		} else if (eventObj.target && eventObj.clone) {
			// redispatching an active event object, so clone it:
			eventObj = eventObj.clone();
		}
		
		// TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent
		try { eventObj.target = this; } catch (e) {} // try/catch allows redispatching of native events

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			// capture & atTarget
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			// bubbling
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return !eventObj.defaultPrevented;
	};

	/**
	 * Indicates whether there is at least one listener for the specified event type.
	 * @method hasEventListener
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns true if there is at least one listener for the specified event.
	 **/
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};
	
	/**
	 * Indicates whether there is at least one listener for the specified event type on this object or any of its
	 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
	 * specified type is dispatched from this object, it will trigger at least one listener.
	 * 
	 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
	 * event flow for a listener, not just this object.
	 * @method willTrigger
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns `true` if there is at least one listener for the specified event.
	 **/
	p.willTrigger = function(type) {
		var o = this;
		while (o) {
			if (o.hasEventListener(type)) { return true; }
			o = o.parent;
		}
		return false;
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[EventDispatcher]";
	};


// private methods:
	/**
	 * @method _dispatchEvent
	 * @param {Object | Event} eventObj
	 * @param {Object} eventPhase
	 * @protected
	 **/
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, arr, listeners = (eventPhase <= 2) ? this._captureListeners : this._listeners;
		if (eventObj && listeners && (arr = listeners[eventObj.type]) && (l=arr.length)) {
			try { eventObj.currentTarget = this; } catch (e) {}
			try { eventObj.eventPhase = eventPhase|0; } catch (e) {}
			eventObj.removed = false;
			
			arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
		if (eventPhase === 2) { this._dispatchEvent(eventObj, 2.1); }
	};


	createjs.EventDispatcher = EventDispatcher;
}());

//##############################################################################
// Ticker.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * The Ticker provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
	 * event to be notified when a set time interval has elapsed.
	 *
	 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
	 * when under high CPU load. The Ticker class uses a static interface (ex. `Ticker.framerate = 30;`) and
	 * can not be instantiated.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          // Actions carried out each tick (aka frame)
	 *          if (!event.paused) {
	 *              // Actions carried out when the Ticker is not paused.
	 *          }
	 *      }
	 *
	 * @class Ticker
	 * @uses EventDispatcher
	 * @static
	 **/
	function Ticker() {
		throw "Ticker cannot be instantiated.";
	}


// constants:
	/**
	 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
	 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
	 * dispatches the tick when the time is within a certain threshold.
	 *
	 * This mode has a higher variance for time between frames than {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}},
	 * but does not require that content be time based as with {{#crossLink "Ticker/RAF:property"}}{{/crossLink}} while
	 * gaining the benefits of that API (screen synch, background throttling).
	 *
	 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
	 * framerates of 10, 12, 15, 20, and 30 work well.
	 *
	 * Falls back to {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
	 * supported.
	 * @property RAF_SYNCHED
	 * @static
	 * @type {String}
	 * @default "synched"
	 * @readonly
	 **/
	Ticker.RAF_SYNCHED = "synched";

	/**
	 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
	 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
	 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
	 * event object's "delta" properties to make this easier.
	 *
	 * Falls back on {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
	 * supported.
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "raf"
	 * @readonly
	 **/
	Ticker.RAF = "raf";

	/**
	 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
	 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
	 * @property TIMEOUT
	 * @static
	 * @type {String}
	 * @default "timeout"
	 * @readonly
	 **/
	Ticker.TIMEOUT = "timeout";


// static events:
	/**
	 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
	 * {{#crossLink "Ticker/paused:property"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, event.delta);
	 *      }
	 *
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Boolean} paused Indicates whether the ticker is currently paused.
	 * @param {Number} delta The time elapsed in ms since the last tick.
	 * @param {Number} time The total time in ms since Ticker was initialized.
	 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
	 * 	you could determine the amount of time that the Ticker has been paused since initialization with `time-runTime`.
	 * @since 0.6.0
	 */


// public static properties:
	/**
	 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
	 * {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}}, {{#crossLink "Ticker/RAF:property"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED:property"}}{{/crossLink}} for mode details.
	 * @property timingMode
	 * @static
	 * @type {String}
	 * @default Ticker.TIMEOUT
	 **/
	Ticker.timingMode = null;

	/**
	 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
	 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
	 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
	 * (ex. maxDelta=50 when running at 40fps).
	 * 
	 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
	 * when using both delta and other values.
	 * 
	 * If 0, there is no maximum.
	 * @property maxDelta
	 * @static
	 * @type {number}
	 * @default 0
	 */
	Ticker.maxDelta = 0;
	
	/**
	 * When the ticker is paused, all listeners will still receive a tick event, but the <code>paused</code> property
	 * of the event will be `true`. Also, while paused the `runTime` will not increase. See {{#crossLink "Ticker/tick:event"}}{{/crossLink}},
	 * {{#crossLink "Ticker/getTime"}}{{/crossLink}}, and {{#crossLink "Ticker/getEventTime"}}{{/crossLink}} for more
	 * info.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.paused = true;
	 *      function handleTick(event) {
	 *          console.log(event.paused,
	 *          	createjs.Ticker.getTime(false),
	 *          	createjs.Ticker.getTime(true));
	 *      }
	 *
	 * @property paused
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	Ticker.paused = false;


// mix-ins:
	// EventDispatcher methods:
	Ticker.removeEventListener = null;
	Ticker.removeAllEventListeners = null;
	Ticker.dispatchEvent = null;
	Ticker.hasEventListener = null;
	Ticker._listeners = null;
	createjs.EventDispatcher.initialize(Ticker); // inject EventDispatcher methods.
	Ticker._addEventListener = Ticker.addEventListener;
	Ticker.addEventListener = function() {
		!Ticker._inited&&Ticker.init();
		return Ticker._addEventListener.apply(Ticker, arguments);
	};


// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @private
	 **/
	Ticker._inited = false;

	/**
	 * @property _startTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._startTime = 0;

	/**
	 * @property _pausedTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._pausedTime=0;

	/**
	 * The number of ticks that have passed
	 * @property _ticks
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._ticks = 0;

	/**
	 * The number of ticks that have passed while Ticker has been paused
	 * @property _pausedTicks
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._pausedTicks = 0;

	/**
	 * @property _interval
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._interval = 50;

	/**
	 * @property _lastTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._lastTime = 0;

	/**
	 * @property _times
	 * @static
	 * @type {Array}
	 * @private
	 **/
	Ticker._times = null;

	/**
	 * @property _tickTimes
	 * @static
	 * @type {Array}
	 * @private
	 **/
	Ticker._tickTimes = null;

	/**
	 * Stores the timeout or requestAnimationFrame id.
	 * @property _timerId
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._timerId = null;
	
	/**
	 * True if currently using requestAnimationFrame, false if using setTimeout. This may be different than timingMode
	 * if that property changed and a tick hasn't fired.
	 * @property _raf
	 * @static
	 * @type {Boolean}
	 * @private
	 **/
	Ticker._raf = true;
	

// static getter / setters:
	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method _setInterval
	 * @private
	 * @static
	 * @param {Number} interval
	 **/
	Ticker._setInterval = function(interval) {
		Ticker._interval = interval;
		if (!Ticker._inited) { return; }
		Ticker._setupTick();
	};
	// Ticker.setInterval is @deprecated. Remove for 1.1+
	Ticker.setInterval = createjs.deprecate(Ticker._setInterval, "Ticker.setInterval");

	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method _getInterval
	 * @private
	 * @static
	 * @return {Number}
	 **/
	Ticker._getInterval = function() {
		return Ticker._interval;
	};
	// Ticker.getInterval is @deprecated. Remove for 1.1+
	Ticker.getInterval = createjs.deprecate(Ticker._getInterval, "Ticker.getInterval");

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method _setFPS
	 * @private
	 * @static
	 * @param {Number} value
	 **/
	Ticker._setFPS = function(value) {
		Ticker._setInterval(1000/value);
	};
	// Ticker.setFPS is @deprecated. Remove for 1.1+
	Ticker.setFPS = createjs.deprecate(Ticker._setFPS, "Ticker.setFPS");

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method _getFPS
	 * @static
	 * @private
	 * @return {Number}
	 **/
	Ticker._getFPS = function() {
		return 1000/Ticker._interval;
	};
	// Ticker.getFPS is @deprecated. Remove for 1.1+
	Ticker.getFPS = createjs.deprecate(Ticker._getFPS, "Ticker.getFPS");

	/**
	 * Indicates the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
	 * Note that actual time between ticks may be more than specified depending on CPU load.
	 * This property is ignored if the ticker is using the `RAF` timing mode.
	 * @property interval
	 * @static
	 * @type {Number}
	 **/
	 
	/**
	 * Indicates the target frame rate in frames per second (FPS). Effectively just a shortcut to `interval`, where
	 * `framerate == 1000/interval`.
	 * @property framerate
	 * @static
	 * @type {Number}
	 **/
	try {
		Object.defineProperties(Ticker, {
			interval: { get: Ticker._getInterval, set: Ticker._setInterval },
			framerate: { get: Ticker._getFPS, set: Ticker._setFPS }
		});
	} catch (e) { console.log(e); }


// public static methods:
	/**
	 * Starts the tick. This is called automatically when the first listener is added.
	 * @method init
	 * @static
	 **/
	Ticker.init = function() {
		if (Ticker._inited) { return; }
		Ticker._inited = true;
		Ticker._times = [];
		Ticker._tickTimes = [];
		Ticker._startTime = Ticker._getTime();
		Ticker._times.push(Ticker._lastTime = 0);
		Ticker.interval = Ticker._interval;
	};
	
	/**
	 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
	 * @method reset
	 * @static
	 **/
	Ticker.reset = function() {
		if (Ticker._raf) {
			var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			f&&f(Ticker._timerId);
		} else {
			clearTimeout(Ticker._timerId);
		}
		Ticker.removeAllEventListeners("tick");
		Ticker._timerId = Ticker._times = Ticker._tickTimes = null;
		Ticker._startTime = Ticker._lastTime = Ticker._ticks = Ticker._pausedTime = 0;
		Ticker._inited = false;
	};

	/**
	 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
	 * because it only measures the time spent within the tick execution stack. 
	 * 
	 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
	 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
	 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
	 *
	 * Example 2: With a target FPS of 30, {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} returns 10fps, which
	 * indicates an average of 100ms between the end of one tick and the end of the next. However, {{#crossLink "Ticker/getMeasuredTickTime"}}{{/crossLink}}
	 * returns 20ms. This would indicate that something other than the tick is using ~80ms (another script, DOM
	 * rendering, etc).
	 * @method getMeasuredTickTime
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
	 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
	 * @return {Number} The average time spent in a tick in milliseconds.
	 **/
	Ticker.getMeasuredTickTime = function(ticks) {
		var ttl=0, times=Ticker._tickTimes;
		if (!times || times.length < 1) { return -1; }

		// by default, calculate average for the past ~1 second:
		ticks = Math.min(times.length, ticks||(Ticker._getFPS()|0));
		for (var i=0; i<ticks; i++) { ttl += times[i]; }
		return ttl/ticks;
	};

	/**
	 * Returns the actual frames / ticks per second.
	 * @method getMeasuredFPS
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
	 * Defaults to the number of ticks per second.
	 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
	 * from the target frames per second.
	 **/
	Ticker.getMeasuredFPS = function(ticks) {
		var times = Ticker._times;
		if (!times || times.length < 2) { return -1; }

		// by default, calculate fps for the past ~1 second:
		ticks = Math.min(times.length-1, ticks||(Ticker._getFPS()|0));
		return 1000/((times[0]-times[ticks])/ticks);
	};

	/**
	 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
	 * Returns -1 if Ticker has not been initialized. For example, you could use
	 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
	 * @method getTime
	 * @static
	 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
	 * If false, the value returned will be total time elapsed since the first tick event listener was added.
	 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
	 **/
	Ticker.getTime = function(runTime) {
		return Ticker._startTime ? Ticker._getTime() - (runTime ? Ticker._pausedTime : 0) : -1;
	};

	/**
	 * Similar to the {{#crossLink "Ticker/getTime"}}{{/crossLink}} method, but returns the time on the most recent {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
	 * event object.
	 * @method getEventTime
	 * @static
	 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
	 * @returns {number} The time or runTime property from the most recent tick event or -1.
	 */
	Ticker.getEventTime = function(runTime) {
		return Ticker._startTime ? (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0) : -1;
	};
	
	/**
	 * Returns the number of ticks that have been broadcast by Ticker.
	 * @method getTicks
	 * @static
	 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
	 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
	 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
	 * value. The default value is false.
	 * @return {Number} of ticks that have been broadcast.
	 **/
	Ticker.getTicks = function(pauseable) {
		return  Ticker._ticks - (pauseable ? Ticker._pausedTicks : 0);
	};


// private static methods:
	/**
	 * @method _handleSynch
	 * @static
	 * @private
	 **/
	Ticker._handleSynch = function() {
		Ticker._timerId = null;
		Ticker._setupTick();

		// run if enough time has elapsed, with a little bit of flexibility to be early:
		if (Ticker._getTime() - Ticker._lastTime >= (Ticker._interval-1)*0.97) {
			Ticker._tick();
		}
	};

	/**
	 * @method _handleRAF
	 * @static
	 * @private
	 **/
	Ticker._handleRAF = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _handleTimeout
	 * @static
	 * @private
	 **/
	Ticker._handleTimeout = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _setupTick
	 * @static
	 * @private
	 **/
	Ticker._setupTick = function() {
		if (Ticker._timerId != null) { return; } // avoid duplicates

		var mode = Ticker.timingMode;
		if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
			var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if (f) {
				Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
				Ticker._raf = true;
				return;
			}
		}
		Ticker._raf = false;
		Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
	};

	/**
	 * @method _tick
	 * @static
	 * @private
	 **/
	Ticker._tick = function() {
		var paused = Ticker.paused;
		var time = Ticker._getTime();
		var elapsedTime = time-Ticker._lastTime;
		Ticker._lastTime = time;
		Ticker._ticks++;
		
		if (paused) {
			Ticker._pausedTicks++;
			Ticker._pausedTime += elapsedTime;
		}
		
		if (Ticker.hasEventListener("tick")) {
			var event = new createjs.Event("tick");
			var maxDelta = Ticker.maxDelta;
			event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
			event.paused = paused;
			event.time = time;
			event.runTime = time-Ticker._pausedTime;
			Ticker.dispatchEvent(event);
		}
		
		Ticker._tickTimes.unshift(Ticker._getTime()-time);
		while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

		Ticker._times.unshift(time);
		while (Ticker._times.length > 100) { Ticker._times.pop(); }
	};

	/**
	 * @method _getTime
	 * @static
	 * @private
	 **/
	var w=window, now=w.performance.now || w.performance.mozNow || w.performance.msNow || w.performance.oNow || w.performance.webkitNow;
	Ticker._getTime = function() {
		return ((now&&now.call(w.performance))||(new Date().getTime())) - Ticker._startTime;
	};


	createjs.Ticker = Ticker;
}());

//##############################################################################
// AbstractTween.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor
	/**
	 * Base class that both {{#crossLink "Tween"}}{{/crossLink}} and {{#crossLink "Timeline"}}{{/crossLink}} extend. Should not be instantiated directly.
	 * @class AbstractTween
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @extends EventDispatcher
	 * @constructor
	 */
	function AbstractTween(props) {
		this.EventDispatcher_constructor();
		
	// public properties:
		/**
		 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
		 * then setting this to false (the default) will cause this tween to be paused when `Ticker.paused` is set to
		 * `true`. See the {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the `props`
		 * parameter.
		 * @property ignoreGlobalPause
		 * @type Boolean
		 * @default false
		 */
		this.ignoreGlobalPause = false;
	
		/**
		 * Indicates the number of times to loop. If set to -1, the tween will loop continuously.
		 *
		 * Note that a tween must loop at _least_ once to see it play in both directions when `{{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}}`
		 * is set to `true`.
		 * @property loop
		 * @type {Number}
		 * @default 0
		 */
		this.loop = 0;
	
		/**
		 * Uses ticks for all durations instead of milliseconds. This also changes the behaviour of some actions (such as `call`).
		 * Changing this value on a running tween could have unexpected results.
		 * @property useTicks
		 * @type {Boolean}
		 * @default false
		 * @readonly
		 */
		this.useTicks = false;
		
		/**
		 * Causes the tween to play in reverse.
		 * @property reversed
		 * @type {Boolean}
		 * @default false
		 */
		this.reversed = false;
		
		/**
		 * Causes the tween to reverse direction at the end of each loop. Each single-direction play-through of the
		 * tween counts as a single bounce. For example, to play a tween once forward, and once back, set the
		 * `{{#crossLink "AbstractTween/loop:property"}}{{/crossLink}}` to `1`.
		 * @property bounce
		 * @type {Boolean}
		 * @default false
		 */
		this.bounce = false;
		
		/**
		 * Changes the rate at which the tween advances. For example, a `timeScale` value of `2` will double the
		 * playback speed, a value of `0.5` would halve it.
		 * @property timeScale
		 * @type {Number}
		 * @default 1
		 */
		this.timeScale = 1;
	
		/**
		 * Indicates the duration of this tween in milliseconds (or ticks if `useTicks` is true), irrespective of `loops`.
		 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
		 * behaviour.
		 * @property duration
		 * @type {Number}
		 * @default 0
		 * @readonly
		 */
		this.duration = 0;
	
		/**
		 * The current normalized position of the tween. This will always be a value between 0 and `duration`.
		 * Changing this property directly will have unexpected results, use {{#crossLink "Tween/setPosition"}}{{/crossLink}}.
		 * @property position
		 * @type {Object}
		 * @default 0
		 * @readonly
		 */
		this.position = 0;
		
		/**
		 * The raw tween position. This value will be between `0` and `loops * duration` while the tween is active, or -1 before it activates.
		 * @property rawPosition
		 * @type {Number}
		 * @default -1
		 * @readonly
		 */
		this.rawPosition = -1;
		
		
	// private properties:
		/**
		 * @property _paused
		 * @type {Boolean}
		 * @default false
		 * @protected
		 */
		this._paused = true;
		
		/**
		 * @property _next
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._next = null;
		
		/**
		 * @property _prev
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._prev = null;
		
		/**
		 * @property _parent
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		this._parent = null;

		/**
		 * @property _labels
		 * @type Object
		 * @protected
		 **/
		this._labels = null;

		/**
		 * @property _labelList
		 * @type Array[Object]
		 * @protected
		 **/
		this._labelList = null;

		if (props) {
			this.useTicks = !!props.useTicks;
			this.ignoreGlobalPause = !!props.ignoreGlobalPause;
			this.loop = props.loop === true ? -1 : (props.loop||0);
			this.reversed = !!props.reversed;
			this.bounce = !!props.bounce;
			this.timeScale = props.timeScale||1;
			props.onChange && this.addEventListener("change", props.onChange);
			props.onComplete && this.addEventListener("complete", props.onComplete);
		}
		
		// while `position` is shared, it needs to happen after ALL props are set, so it's handled in _init()
	};

	var p = createjs.extend(AbstractTween, createjs.EventDispatcher);

// events:
	/**
	 * Dispatched whenever the tween's position changes. It occurs after all tweened properties are updated and actions
	 * are executed.
	 * @event change
	 **/
	 
	/**
	 * Dispatched when the tween reaches its end and has paused itself. This does not fire until all loops are complete;
	 * tweens that loop continuously will never fire a complete event.
	 * @event complete
	 **/
	
// getter / setters:
	
	/**
	 * Use the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} property instead.
	 * @method _setPaused
	 * @param {Boolean} [value=true] Indicates whether the tween should be paused (`true`) or played (`false`).
	 * @return {AbstractTween} This tween instance (for chaining calls)
	 * @protected
	 * @chainable
	 */
	p._setPaused = function(value) {
		createjs.Tween._register(this, value);
		return this;
	};
	p.setPaused = createjs.deprecate(p._setPaused, "AbstractTween.setPaused");
	
	/**
	 * Use the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} property instead.
	 * @method _getPaused
	 * @protected
	 */
	p._getPaused = function() {
		return this._paused;
	};
	p.getPaused = createjs.deprecate(p._getPaused, "AbstactTween.getPaused");
	
	/**
	 * Use the {{#crossLink "AbstractTween/currentLabel:property"}}{{/crossLink}} property instead.
	 * @method _getCurrentLabel
	 * @protected
	 * @return {String} The name of the current label or null if there is no label
	 **/
	p._getCurrentLabel = function(pos) {
		var labels = this.getLabels();
		if (pos == null) { pos = this.position; }
		for (var i = 0, l = labels.length; i<l; i++) { if (pos < labels[i].position) { break; } }
		return (i===0) ? null : labels[i-1].label;
	};
	p.getCurrentLabel = createjs.deprecate(p._getCurrentLabel, "AbstractTween.getCurrentLabel");
	
	/**
	 * Pauses or unpauses the tween. A paused tween is removed from the global registry and is eligible for garbage
	 * collection if no other references to it exist.
	 * @property paused
	 * @type Boolean
	 * @readonly
	 **/
	 
	/**
	 * Returns the name of the label on or immediately before the current position. For example, given a tween with
	 * two labels, "first" on frame index 4, and "second" on frame 8, `currentLabel` would return:
	 * <UL>
	 * 		<LI>null if the current position is 2.</LI>
	 * 		<LI>"first" if the current position is 4.</LI>
	 * 		<LI>"first" if the current position is 7.</LI>
	 * 		<LI>"second" if the current position is 15.</LI>
	 * </UL>
	 * @property currentLabel
	 * @type String
	 * @readonly
	 **/
	 
	try {
		Object.defineProperties(p, {
			paused: { set: p._setPaused, get: p._getPaused },
			currentLabel: { get: p._getCurrentLabel }
		});
	} catch (e) {}

// public methods:
	/**
	 * Advances the tween by a specified amount.
	 * @method advance
	 * @param {Number} delta The amount to advance in milliseconds (or ticks if useTicks is true). Negative values are supported.
	 * @param {Number} [ignoreActions=false] If true, actions will not be executed due to this change in position.
	 */
	p.advance = function(delta, ignoreActions) {
		this.setPosition(this.rawPosition+delta*this.timeScale, ignoreActions);
	};
	
	/**
	 * Advances the tween to a specified position.
	 * @method setPosition
	 * @param {Number} rawPosition The raw position to seek to in milliseconds (or ticks if useTicks is true).
	 * @param {Boolean} [ignoreActions=false] If true, do not run any actions that would be triggered by this operation.
	 * @param {Boolean} [jump=false] If true, only actions at the new position will be run. If false, actions between the old and new position are run.
	 * @param {Function} [callback] Primarily for use with MovieClip, this callback is called after properties are updated, but before actions are run.
	 */
	p.setPosition = function(rawPosition, ignoreActions, jump, callback) {
		var d=this.duration, loopCount=this.loop, prevRawPos = this.rawPosition;
		var loop=0, t=0, end=false;
		
		// normalize position:
		if (rawPosition < 0) { rawPosition = 0; }
		
		if (d === 0) {
			// deal with 0 length tweens.
			end = true;
			if (prevRawPos !== -1) { return end; } // we can avoid doing anything else if we're already at 0.
		} else {
			loop = rawPosition/d|0;
			t = rawPosition-loop*d;
			
			end = (loopCount !== -1 && rawPosition >= loopCount*d+d);
			if (end) { rawPosition = (t=d)*(loop=loopCount)+d; }
			if (rawPosition === prevRawPos) { return end; } // no need to update
			
			var rev = !this.reversed !== !(this.bounce && loop%2); // current loop is reversed
			if (rev) { t = d-t; }
		}
		
		// set this in advance in case an action modifies position:
		this.position = t;
		this.rawPosition = rawPosition;
		
		this._updatePosition(jump, end);
		if (end) { this.paused = true; }
		
		callback&&callback(this);
		
		if (!ignoreActions) { this._runActions(prevRawPos, rawPosition, jump, !jump && prevRawPos === -1); }
		
		this.dispatchEvent("change");
		if (end) { this.dispatchEvent("complete"); }
	};
	
	/**
	 * Calculates a normalized position based on a raw position. For example, given a tween with a duration of 3000ms set to loop:
	 * 	console.log(myTween.calculatePosition(3700); // 700
	 * @method calculatePosition
	 * @param {Number} rawPosition A raw position.
	 */
	p.calculatePosition = function(rawPosition) {
		// largely duplicated from setPosition, but necessary to avoid having to instantiate generic objects to pass values (end, loop, position) back.
		var d=this.duration, loopCount=this.loop, loop=0, t=0;
		
		if (d===0) { return 0; }
		if (loopCount !== -1 && rawPosition >= loopCount*d+d) { t = d; loop = loopCount } // end
		else if (rawPosition < 0) { t = 0; }
		else { loop = rawPosition/d|0; t = rawPosition-loop*d;  }
		
		var rev = !this.reversed !== !(this.bounce && loop%2); // current loop is reversed
		return rev ? d-t : t;
	};
	
	/**
	 * Returns a list of the labels defined on this tween sorted by position.
	 * @method getLabels
	 * @return {Array[Object]} A sorted array of objects with label and position properties.
	 **/
	p.getLabels = function() {
		var list = this._labelList;
		if (!list) {
			list = this._labelList = [];
			var labels = this._labels;
			for (var n in labels) {
				list.push({label:n, position:labels[n]});
			}
			list.sort(function (a,b) { return a.position- b.position; });
		}
		return list;
	};
	

	/**
	 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
	 * @method setLabels
	 * @param {Object} labels An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}
	 * in the form `{myLabelName:time}` where time is in milliseconds (or ticks if `useTicks` is `true`).
	 **/
	p.setLabels = function(labels) {
		this._labels = labels;
		this._labelList = null;
	};

	/**
	 * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
	 * @method addLabel
	 * @param {String} label The label name.
	 * @param {Number} position The position this label represents.
	 **/
	p.addLabel = function(label, position) {
		if (!this._labels) { this._labels = {}; }
		this._labels[label] = position;
		var list = this._labelList;
		if (list) {
			for (var i= 0,l=list.length; i<l; i++) { if (position < list[i].position) { break; } }
			list.splice(i, 0, {label:label, position:position});
		}
	};
	
	/**
	 * Unpauses this timeline and jumps to the specified position or label.
	 * @method gotoAndPlay
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`)
	 * or label to jump to.
	 **/
	p.gotoAndPlay = function(positionOrLabel) {
		this.paused = false;
		this._goto(positionOrLabel);
	};

	/**
	 * Pauses this timeline and jumps to the specified position or label.
	 * @method gotoAndStop
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`) or label
	 * to jump to.
	 **/
	p.gotoAndStop = function(positionOrLabel) {
		this.paused = true;
		this._goto(positionOrLabel);
	};
	
	/**
	 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
	 * corresponding frame label will be returned, or `null` if a matching label is not defined.
	 * @method resolve
	 * @param {String|Number} positionOrLabel A numeric position value or label string.
	 **/
	p.resolve = function(positionOrLabel) {
		var pos = Number(positionOrLabel);
		if (isNaN(pos)) { pos = this._labels && this._labels[positionOrLabel]; }
		return pos;
	};
	

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[AbstractTween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("AbstractTween can not be cloned.")
	};


// private methods:
	/**
	 * Shared logic that executes at the end of the subclass constructor.
	 * @method _init
	 * @protected
	 */
	p._init = function(props) {
		if (!props || !props.paused) { this.paused = false; }
		if (props&&(props.position!=null)) { this.setPosition(props.position); }
	};

	/**
	 * @method _updatePosition
	 * @protected
	 */
	p._updatePosition = function(jump, end) {
		// abstract.
	};
	
	/**
	 * @method _goto
	 * @protected
	 **/
	p._goto = function(positionOrLabel) {
		var pos = this.resolve(positionOrLabel);
		if (pos != null) { this.setPosition(pos, false, true); }
	};
	
	/**
	 * @method _runActions
	 * @protected
	 */
	p._runActions = function(startRawPos, endRawPos, jump, includeStart) {
		// runs actions between startPos & endPos. Separated to support action deferral.
		
		//console.log(this.passive === false ? " > Tween" : "Timeline", "run", startRawPos, endRawPos, jump, includeStart);
		
		// if we don't have any actions, and we're not a Timeline, then return:
		// TODO: a cleaner way to handle this would be to override this method in Tween, but I'm not sure it's worth the overhead.
		if (!this._actionHead && !this.tweens) { return; } 
		
		var d=this.duration, reversed=this.reversed, bounce=this.bounce, loopCount=this.loop;
		var loop0, loop1, t0, t1;
		
		if (d === 0) {
			// deal with 0 length tweens:
			loop0 = loop1 = t0 = t1 = 0;
			reversed = bounce = false;
		} else {
			loop0=startRawPos/d|0;
			loop1=endRawPos/d|0;
			t0=startRawPos-loop0*d;
			t1=endRawPos-loop1*d;
		}
		
		// catch positions that are past the end:
		if (loopCount !== -1) {
			if (loop1 > loopCount) { t1=d; loop1=loopCount; }
			if (loop0 > loopCount) { t0=d; loop0=loopCount; }
		}
		
		// special cases:
		if (jump) { return this._runActionsRange(t1, t1, jump, includeStart); } // jump.
		else if (loop0 === loop1 && t0 === t1 && !jump && !includeStart) { return; } // no actions if the position is identical and we aren't including the start
		else if (loop0 === -1) { loop0 = t0 = 0; } // correct the -1 value for first advance, important with useTicks.
		
		var dir = (startRawPos <= endRawPos), loop = loop0;
		do {
			var rev = !reversed !== !(bounce && loop % 2);

			var start = (loop === loop0) ? t0 : dir ? 0 : d;
			var end = (loop === loop1) ? t1 : dir ? d : 0;
			
			if (rev) {
				start = d - start;
				end = d - end;
			}
			
			if (bounce && loop !== loop0 && start === end) { /* bounced onto the same time/frame, don't re-execute end actions */ }
			else if (this._runActionsRange(start, end, jump, includeStart || (loop !== loop0 && !bounce))) { return true; }
				
			includeStart = false;
		} while ((dir && ++loop <= loop1) || (!dir && --loop >= loop1));
	};
	
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		// abstract
	};

	createjs.AbstractTween = createjs.promote(AbstractTween, "EventDispatcher");
}());

//##############################################################################
// Tween.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor
	/**
	 * Tweens properties for a single target. Methods can be chained to create complex animation sequences:
	 *
	 * <h4>Example</h4>
	 *
	 *	createjs.Tween.get(target)
	 *		.wait(500)
	 *		.to({alpha:0, visible:false}, 1000)
	 *		.call(handleComplete);
	 *
	 * Multiple tweens can share a target, however if they affect the same properties there could be unexpected
	 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass `override:true`
	 * in the props argument.
	 *
	 * 	createjs.Tween.get(target, {override:true}).to({x:100});
	 *
	 * Subscribe to the {{#crossLink "Tween/change:event"}}{{/crossLink}} event to be notified when the tween position changes.
	 *
	 * 	createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
	 * 	function handleChange(event) {
	 * 		// The tween changed.
	 * 	}
	 *
	 * See the {{#crossLink "Tween/get"}}{{/crossLink}} method also.
	 * @class Tween
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {object} [props.pluginData] See the {{#crossLink "Tween/pluginData:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.paused=false] See the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.position=0] The initial position for this tween. See {{#crossLink "AbstractTween/position:property"}}{{/crossLink}}
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @param {boolean} [props.override=false] Removes all existing tweens for the target when set to `true`.
	 * </UL>
	 * @extends AbstractTween
	 * @constructor
	 */
	function Tween(target, props) {
		this.AbstractTween_constructor(props);
		
	// public properties:
	
		/**
		 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
		 * you specify data by assigning it to a property of `pluginData` with the same name as the plugin.
		 * Note that in many cases, this data is used as soon as the plugin initializes itself for the tween.
		 * As such, this data should be set before the first `to` call in most cases.
		 * @example
		 *	myTween.pluginData.SmartRotation = data;
		 * 
		 * Most plugins also support a property to disable them for a specific tween. This is typically the plugin name followed by "_disabled".
		 * @example
		 *	myTween.pluginData.SmartRotation_disabled = true;
		 * 
		 * Some plugins also store working data in this object, usually in a property named `_PluginClassName`.
		 * See the documentation for individual plugins for more details.
		 * @property pluginData
		 * @type {Object}
		 */
		this.pluginData = null;
	
		/**
		 * The target of this tween. This is the object on which the tweened properties will be changed.
		 * @property target
		 * @type {Object}
		 * @readonly
		 */
		this.target = target;
	
		/**
		 * Indicates the tween's current position is within a passive wait.
		 * @property passive
		 * @type {Boolean}
		 * @default false
		 * @readonly
		 **/
		this.passive = false;
		
		
	// private properties:
	
		/**
		 * @property _stepHead
		 * @type {TweenStep}
		 * @protected
		 */
		this._stepHead = new TweenStep(null, 0, 0, {}, null, true);
		
		/**
		 * @property _stepTail
		 * @type {TweenStep}
		 * @protected
		 */
		this._stepTail = this._stepHead;
		
		/**
		 * The position within the current step. Used by MovieClip.
		 * @property _stepPosition
		 * @type {Number}
		 * @default 0
		 * @protected
		 */
		this._stepPosition = 0;
		
		/**
		 * @property _actionHead
		 * @type {TweenAction}
		 * @protected
		 */
		this._actionHead = null;
		
		/**
		 * @property _actionTail
		 * @type {TweenAction}
		 * @protected
		 */
		this._actionTail = null;
		
		/**
		 * Plugins added to this tween instance.
		 * @property _plugins
		 * @type Array[Object]
		 * @default null
		 * @protected
		 */
		this._plugins = null;
		
		/**
		 * Hash for quickly looking up added plugins. Null until a plugin is added.
		 * @property _plugins
		 * @type Object
		 * @default null
		 * @protected
		 */
		this._pluginIds = null;
		
		/**
		 * Used by plugins to inject new properties.
		 * @property _injected
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		this._injected = null;

		if (props) {
			this.pluginData = props.pluginData;
			if (props.override) { Tween.removeTweens(target); }
		}
		if (!this.pluginData) { this.pluginData = {}; }
		
		this._init(props);
	};

	var p = createjs.extend(Tween, createjs.AbstractTween);

// static properties

	/**
	 * Constant returned by plugins to tell the tween not to use default assignment.
	 * @property IGNORE
	 * @type Object
	 * @static
	 */
	Tween.IGNORE = {};

	/**
	 * @property _listeners
	 * @type Array[Tween]
	 * @static
	 * @protected
	 */
	Tween._tweens = [];

	/**
	 * @property _plugins
	 * @type Object
	 * @static
	 * @protected
	 */
	Tween._plugins = null;
	
	/**
	 * @property _tweenHead
	 * @type Tween
	 * @static
	 * @protected
	 */
	Tween._tweenHead = null;
	
	/**
	 * @property _tweenTail
	 * @type Tween
	 * @static
	 * @protected
	 */
	Tween._tweenTail = null;


// static methods	
	/**
	 * Returns a new tween instance. This is functionally identical to using `new Tween(...)`, but may look cleaner
	 * with the chained syntax of TweenJS.
	 * <h4>Example</h4>
	 *
	 *	var tween = createjs.Tween.get(target).to({x:100}, 500);
	 *	// equivalent to:
	 *	var tween = new createjs.Tween(target).to({x:100}, 500);
	 *
	 * @method get
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {object} [props.pluginData] See the {{#crossLink "Tween/pluginData:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.paused=false] See the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.position=0] The initial position for this tween. See {{#crossLink "AbstractTween/position:property"}}{{/crossLink}}
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @param {boolean} [props.override=false] Removes all existing tweens for the target when set to `true`.
	 * @return {Tween} A reference to the created tween.
	 * @static
	 */
	Tween.get = function(target, props) {
		return new Tween(target, props);
	};

	/**
	 * Advances all tweens. This typically uses the {{#crossLink "Ticker"}}{{/crossLink}} class, but you can call it
	 * manually if you prefer to use your own "heartbeat" implementation.
	 * @method tick
	 * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
	 * `useTicks` set to true.
	 * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}}
	 * will ignore this, but all others will pause if this is `true`.
	 * @static
	 */
	Tween.tick = function(delta, paused) {
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next; // in case it completes and wipes its _next property
			if ((paused && !tween.ignoreGlobalPause) || tween._paused) { /* paused */ }
			else { tween.advance(tween.useTicks?1:delta); }
			tween = next;
		}
	};

	/**
	 * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
	 * {{#crossLink "Ticker/tick:event"}}{{/crossLink}} events from the createjs {{#crossLink "Ticker"}}{{/crossLink}}.
	 * No other events are handled in Tween.
	 * @method handleEvent
	 * @param {Object} event An event object passed in by the {{#crossLink "EventDispatcher"}}{{/crossLink}}. Will
	 * usually be of type "tick".
	 * @private
	 * @static
	 * @since 0.4.2
	 */
	Tween.handleEvent = function(event) {
		if (event.type === "tick") {
			this.tick(event.delta, event.paused);
		}
	};

	/**
	 * Removes all existing tweens for a target. This is called automatically by new tweens if the `override`
	 * property is `true`.
	 * @method removeTweens
	 * @param {Object} target The target object to remove existing tweens from.
	 * @static
	 */
	Tween.removeTweens = function(target) {
		if (!target.tweenjs_count) { return; }
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next;
			if (tween.target === target) { Tween._register(tween, true); }
			tween = next;
		}
		target.tweenjs_count = 0;
	};

	/**
	 * Stop and remove all existing tweens.
	 * @method removeAllTweens
	 * @static
	 * @since 0.4.1
	 */
	Tween.removeAllTweens = function() {
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next;
			tween._paused = true;
			tween.target&&(tween.target.tweenjs_count = 0);
			tween._next = tween._prev = null;
			tween = next;
		}
		Tween._tweenHead = Tween._tweenTail = null;
	};

	/**
	 * Indicates whether there are any active tweens on the target object (if specified) or in general.
	 * @method hasActiveTweens
	 * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
	 * if there are any active tweens on any target.
	 * @return {Boolean} Indicates if there are active tweens.
	 * @static
	 */
	Tween.hasActiveTweens = function(target) {
		if (target) { return !!target.tweenjs_count; }
		return !!Tween._tweenHead;
	};

	/**
	 * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "SamplePlugin"}}{{/crossLink}}
	 * for an example of how to write TweenJS plugins. Plugins should generally be installed via their own `install` method, in order to provide
	 * the plugin with an opportunity to configure itself.
	 * @method _installPlugin
	 * @param {Object} plugin The plugin to install
	 * @static
	 * @protected
	 */
	Tween._installPlugin = function(plugin) {
		var priority = (plugin.priority = plugin.priority||0), arr = (Tween._plugins = Tween._plugins || []);
		for (var i=0,l=arr.length;i<l;i++) {
			if (priority < arr[i].priority) { break; }
		}
		arr.splice(i,0,plugin);
	};

	/**
	 * Registers or unregisters a tween with the ticking system.
	 * @method _register
	 * @param {Tween} tween The tween instance to register or unregister.
	 * @param {Boolean} paused If `false`, the tween is registered. If `true` the tween is unregistered.
	 * @static
	 * @protected
	 */
	Tween._register = function(tween, paused) {
		var target = tween.target;
		if (!paused && tween._paused) {
			// TODO: this approach might fail if a dev is using sealed objects
			if (target) { target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count+1 : 1; }
			var tail = Tween._tweenTail;
			if (!tail) { Tween._tweenHead = Tween._tweenTail = tween; }
			else {
				Tween._tweenTail = tail._next = tween;
				tween._prev = tail;
			}
			if (!Tween._inited && createjs.Ticker) { createjs.Ticker.addEventListener("tick", Tween); Tween._inited = true; }
		} else if (paused && !tween._paused) {
			if (target) { target.tweenjs_count--; }
			var next = tween._next, prev = tween._prev;
			
			if (next) { next._prev = prev; }
			else { Tween._tweenTail = prev; } // was tail
			if (prev) { prev._next = next; }
			else { Tween._tweenHead = next; } // was head.
			
			tween._next = tween._prev = null;
		}
		tween._paused = paused;
	};


// events:

// public methods:
	/**
	 * Adds a wait (essentially an empty tween).
	 * <h4>Example</h4>
	 *
	 *	//This tween will wait 1s before alpha is faded to 0.
	 *	createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
	 *
	 * @method wait
	 * @param {Number} duration The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Boolean} [passive=false] Tween properties will not be updated during a passive wait. This
	 * is mostly useful for use with {{#crossLink "Timeline"}}{{/crossLink}} instances that contain multiple tweens
	 * affecting the same target at different times.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 **/
	p.wait = function(duration, passive) {
		if (duration > 0) { this._addStep(+duration, this._stepTail.props, null, passive); }
		return this;
	};

	/**
	 * Adds a tween from the current values to the specified properties. Set duration to 0 to jump to these value.
	 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
	 * properties will be set at the end of the specified duration.
	 * <h4>Example</h4>
	 *
	 *	createjs.Tween.get(target).to({alpha:0, visible:false}, 1000);
	 *
	 * @method to
	 * @param {Object} props An object specifying property target values for this tween (Ex. `{x:300}` would tween the x
	 * property of the target to 300).
	 * @param {Number} [duration=0] The duration of the tween in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Function} [ease="linear"] The easing function to use for this tween. See the {{#crossLink "Ease"}}{{/crossLink}}
	 * class for a list of built-in ease functions.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.to = function(props, duration, ease) {
		if (duration == null || duration < 0) { duration = 0; }
		var step = this._addStep(+duration, null, ease);
		this._appendProps(props, step);
		return this;
	};
	
	/**
	 * Adds a label that can be used with {{#crossLink "Tween/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Tween/gotoAndStop"}}{{/crossLink}}
	 * at the current point in the tween. For example:
	 * 
	 * 	var tween = createjs.Tween.get(foo)
	 * 					.to({x:100}, 1000)
	 * 					.label("myLabel")
	 * 					.to({x:200}, 1000);
	 * // ...
	 * tween.gotoAndPlay("myLabel"); // would play from 1000ms in.
	 * 
	 * @method addLabel
	 * @param {String} label The label name.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 **/
	p.label = function(name) {
		this.addLabel(name, this.duration);
		return this;
	};

	/**
	 * Adds an action to call the specified function.
	 * <h4>Example</h4>
	 *
	 * 	//would call myFunction() after 1 second.
	 * 	createjs.Tween.get().wait(1000).call(myFunction);
	 *
	 * @method call
	 * @param {Function} callback The function to call.
	 * @param {Array} [params]. The parameters to call the function with. If this is omitted, then the function
	 * will be called with a single param pointing to this tween.
	 * @param {Object} [scope]. The scope to call the function in. If omitted, it will be called in the target's scope.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.call = function(callback, params, scope) {
		return this._addAction(scope||this.target, callback, params||[this]);
	};

	/**
	 * Adds an action to set the specified props on the specified target. If `target` is null, it will use this tween's
	 * target. Note that for properties on the target object, you should consider using a zero duration {{#crossLink "Tween/to"}}{{/crossLink}}
	 * operation instead so the values are registered as tweened props.
	 * <h4>Example</h4>
	 *
	 *	myTween.wait(1000).set({visible:false}, foo);
	 *
	 * @method set
	 * @param {Object} props The properties to set (ex. `{visible:false}`).
	 * @param {Object} [target] The target to set the properties on. If omitted, they will be set on the tween's target.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.set = function(props, target) {
		return this._addAction(target||this.target, this._set, [props]);
	};

	/**
	 * Adds an action to play (unpause) the specified tween. This enables you to sequence multiple tweens.
	 * <h4>Example</h4>
	 *
	 *	myTween.to({x:100}, 500).play(otherTween);
	 *
	 * @method play
	 * @param {Tween} [tween] The tween to play. Defaults to this tween.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.play = function(tween) {
		return this._addAction(tween||this, this._set, [{paused:false}]);
	};

	/**
	 * Adds an action to pause the specified tween.
	 * 
	 * 	myTween.pause(otherTween).to({alpha:1}, 1000).play(otherTween);
	 * 
	 * Note that this executes at the end of a tween update, so the tween may advance beyond the time the pause
	 * action was inserted at. For example:
	 * 
	 * myTween.to({foo:0}, 1000).pause().to({foo:1}, 1000);
	 * 
	 * At 60fps the tween will advance by ~16ms per tick, if the tween above was at 999ms prior to the current tick, it
	 * will advance to 1015ms (15ms into the second "step") and then pause.
	 * 
	 * @method pause
	 * @param {Tween} [tween] The tween to pause. Defaults to this tween.
	 * @return {Tween} This tween instance (for chaining calls)
	 * @chainable
	 */
	p.pause = function(tween) {
		return this._addAction(tween||this, this._set, [{paused:true}]);
	};

	// tiny api (primarily for tool output):
	p.w = p.wait;
	p.t = p.to;
	p.c = p.call;
	p.s = p.set;

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[Tween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("Tween can not be cloned.")
	};


// private methods:
	/**
	 * Adds a plugin to this tween.
	 * @method _addPlugin
	 * @param {Object} plugin
	 * @protected
	 */
	p._addPlugin = function(plugin) {
		var ids = this._pluginIds || (this._pluginIds = {}), id = plugin.ID;
		if (!id || ids[id]) { return; } // already added
		
		ids[id] = true;
		var plugins = this._plugins || (this._plugins = []), priority = plugin.priority || 0;
		for (var i=0,l=plugins.length; i<l; i++) {
			if (priority < plugins[i].priority) {
				plugins.splice(i,0,plugin);
				return;
			}
		}
		plugins.push(plugin);
	};
	
	// Docced in AbstractTween
	p._updatePosition = function(jump, end) {
		var step = this._stepHead.next, t=this.position, d=this.duration;
		if (this.target && step) {
			// find our new step index:
			var stepNext = step.next;
			while (stepNext && stepNext.t <= t) { step = step.next; stepNext = step.next; }
			var ratio = end ? d === 0 ? 1 : t/d : (t-step.t)/step.d; // TODO: revisit this.
			this._updateTargetProps(step, ratio, end);
		}
		this._stepPosition = step ? t-step.t : 0;
	};
	
	/**
	 * @method _updateTargetProps
	 * @param {Object} step
	 * @param {Number} ratio
	 * @param {Boolean} end Indicates to plugins that the full tween has ended.
	 * @protected
	 */
	p._updateTargetProps = function(step, ratio, end) {
		if (this.passive = !!step.passive) { return; } // don't update props.
		
		var v, v0, v1, ease;
		var p0 = step.prev.props;
		var p1 = step.props;
		if (ease = step.ease) { ratio = ease(ratio,0,1,1); }
		
		var plugins = this._plugins;
		proploop : for (var n in p0) {
			v0 = p0[n];
			v1 = p1[n];
			
			// values are different & it is numeric then interpolate:
			if (v0 !== v1 && (typeof(v0) === "number")) {
				v = v0+(v1-v0)*ratio;
			} else {
				v = ratio >= 1 ? v1 : v0;
			}
			
			if (plugins) {
				for (var i=0,l=plugins.length;i<l;i++) {
					var value = plugins[i].change(this, step, n, v, ratio, end);
					if (value === Tween.IGNORE) { continue proploop; }
					if (value !== undefined) { v = value; }
				}
			}
			this.target[n] = v;
		}

	};
	
	/**
	 * @method _runActionsRange
	 * @param {Number} startPos
	 * @param {Number} endPos
	 * @param {Boolean} includeStart
	 * @protected
	 */
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		var rev = startPos > endPos;
		var action = rev ? this._actionTail : this._actionHead;
		var ePos = endPos, sPos = startPos;
		if (rev) { ePos=startPos; sPos=endPos; }
		var t = this.position;
		while (action) {
			var pos = action.t;
			if (pos === endPos || (pos > sPos && pos < ePos) || (includeStart && pos === startPos)) {
				action.funct.apply(action.scope, action.params);
				if (t !== this.position) { return true; }
			}
			action = rev ? action.prev : action.next;
		}
	};

	/**
	 * @method _appendProps
	 * @param {Object} props
	 * @protected
	 */
	p._appendProps = function(props, step, stepPlugins) {
		var initProps = this._stepHead.props, target = this.target, plugins = Tween._plugins;
		var n, i, value, initValue, inject;
		var oldStep = step.prev, oldProps = oldStep.props;
		var stepProps = step.props || (step.props = this._cloneProps(oldProps));
		var cleanProps = {}; // TODO: is there some way to avoid this additional object?

		for (n in props) {
			if (!props.hasOwnProperty(n)) { continue; }
			cleanProps[n] = stepProps[n] = props[n];

			if (initProps[n] !== undefined) { continue; }

			initValue = undefined; // accessing missing properties on DOMElements when using CSSPlugin is INSANELY expensive, so we let the plugin take a first swing at it.
			if (plugins) {
				for (i = plugins.length-1; i >= 0; i--) {
					value = plugins[i].init(this, n, initValue);
					if (value !== undefined) { initValue = value; }
					if (initValue === Tween.IGNORE) {
						delete(stepProps[n]);
						delete(cleanProps[n]);
						break;
					}
				}
			}

			if (initValue !== Tween.IGNORE) {
				if (initValue === undefined) { initValue = target[n]; }
				oldProps[n] = (initValue === undefined) ? null : initValue;
			}
		}
		
		for (n in cleanProps) {
			value = props[n];

			// propagate old value to previous steps:
			var o, prev=oldStep;
			while ((o = prev) && (prev = o.prev)) {
				if (prev.props === o.props) { continue; } // wait step
				if (prev.props[n] !== undefined) { break; } // already has a value, we're done.
				prev.props[n] = oldProps[n];
			}
		}
		
		if (stepPlugins !== false && (plugins = this._plugins)) {
			for (i = plugins.length-1; i >= 0; i--) {
				plugins[i].step(this, step, cleanProps);
			}
		}
		
		if (inject = this._injected) {
			this._injected = null;
			this._appendProps(inject, step, false);
		}
	};
	
	/**
	 * Used by plugins to inject properties onto the current step. Called from within `Plugin.step` calls.
	 * For example, a plugin dealing with color, could read a hex color, and inject red, green, and blue props into the tween.
	 * See the SamplePlugin for more info.
	 * @method _injectProp
	 * @param {String} name
	 * @param {Object} value
	 * @protected
	 */
	p._injectProp = function(name, value) {
		var o = this._injected || (this._injected = {});
		o[name] = value;
	};

	/**
	 * @method _addStep
	 * @param {Number} duration
	 * @param {Object} props
	 * @param {Function} ease
	 * @param {Boolean} passive
	 * @protected
	 */
	p._addStep = function(duration, props, ease, passive) {
		var step = new TweenStep(this._stepTail, this.duration, duration, props, ease, passive||false);
		this.duration += duration;
		return this._stepTail = (this._stepTail.next = step);
	};

	/**
	 * @method _addAction
	 * @param {Object} scope
	 * @param {Function} funct
	 * @param {Array} params
	 * @protected
	 */
	p._addAction = function(scope, funct, params) {
		var action = new TweenAction(this._actionTail, this.duration, scope, funct, params);
		if (this._actionTail) { this._actionTail.next = action; }
		else { this._actionHead = action; }
		this._actionTail = action;
		return this;
	};

	/**
	 * @method _set
	 * @param {Object} props
	 * @protected
	 */
	p._set = function(props) {
		for (var n in props) {
			this[n] = props[n];
		}
	};

	/**
	 * @method _cloneProps
	 * @param {Object} props
	 * @protected
	 */
	p._cloneProps = function(props) {
		var o = {};
		for (var n in props) { o[n] = props[n]; }
		return o;
	};

	createjs.Tween = createjs.promote(Tween, "AbstractTween");
	
	function TweenStep(prev, t, d, props, ease, passive) {
		this.next = null;
		this.prev = prev;
		this.t = t;
		this.d = d;
		this.props = props;
		this.ease = ease;
		this.passive = passive;
		this.index = prev ? prev.index+1 : 0;
	};
	
	function TweenAction(prev, t, scope, funct, params) {
		this.next = null;
		this.prev = prev;
		this.t = t;
		this.d = 0;
		this.scope = scope;
		this.funct = funct;
		this.params = params;
	};
}());

//##############################################################################
// Timeline.js
//##############################################################################

this.createjs = this.createjs||{};


(function() {
	"use strict";
	

// constructor	
	/**
	 * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
	 * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
	 * 
	 * NOTE: Timeline currently also accepts a param list in the form: `tweens, labels, props`. This is for backwards
	 * compatibility only and will be removed in the future. Include tweens and labels as properties on the props object.
	 * @class Timeline
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.<UL>
	 *    <LI> `useTicks`</LI>
	 *    <LI> `ignoreGlobalPause`</LI>
	 *    <LI> `loop`</LI>
	 *    <LI> `reversed`</LI>
	 *    <LI> `bounce`</LI>
	 *    <LI> `timeScale`</LI>
	 *    <LI> `paused`</LI>
	 *    <LI> `position`: indicates the initial position for this tween.</LI>
	 *    <LI> `onChange`: adds the specified function as a listener to the `change` event</LI>
	 *    <LI> `onComplete`: adds the specified function as a listener to the `complete` event</LI>
	 * </UL>
	 * @extends AbstractTween
	 * @constructor
	 **/
	function Timeline(props) {
		var tweens, labels;
		// handle old params (tweens, labels, props):
		// TODO: deprecated.
		if (props instanceof Array || (props == null && arguments.length > 1)) {
			tweens = props;
			labels = arguments[1];
			props = arguments[2];
		} else if (props) {
			tweens = props.tweens;
			labels = props.labels;
		}
		
		this.AbstractTween_constructor(props);

	// private properties:
		/**
		 * The array of tweens in the timeline. It is *strongly* recommended that you use
		 * {{#crossLink "Tween/addTween"}}{{/crossLink}} and {{#crossLink "Tween/removeTween"}}{{/crossLink}},
		 * rather than accessing this directly, but it is included for advanced uses.
		 * @property tweens
		 * @type Array
		 **/
		this.tweens = [];
		
		if (tweens) { this.addTween.apply(this, tweens); }
		this.setLabels(labels);
		
		this._init(props);
	};
	
	var p = createjs.extend(Timeline, createjs.AbstractTween);

	
// events:
	// docced in AbstractTween.


// public methods:
	/**
	 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the
	 * normal ticking system) and managed by this timeline. Adding a tween to multiple timelines will result in
	 * unexpected behaviour.
	 * @method addTween
	 * @param {Tween} ...tween The tween(s) to add. Accepts multiple arguments.
	 * @return {Tween} The first tween that was passed in.
	 **/
	p.addTween = function(tween) {
		if (tween._parent) { tween._parent.removeTween(tween); }
		
		var l = arguments.length;
		if (l > 1) {
			for (var i=0; i<l; i++) { this.addTween(arguments[i]); }
			return arguments[l-1];
		} else if (l === 0) { return null; }
		
		this.tweens.push(tween);
		tween._parent = this;
		tween.paused = true;
		var d = tween.duration;
		if (tween.loop > 0) { d *= tween.loop+1; }
		if (d > this.duration) { this.duration = d; }
		
		if (this.rawPosition >= 0) { tween.setPosition(this.rawPosition); }
		return tween;
	};

	/**
	 * Removes one or more tweens from this timeline.
	 * @method removeTween
	 * @param {Tween} ...tween The tween(s) to remove. Accepts multiple arguments.
	 * @return Boolean Returns `true` if all of the tweens were successfully removed.
	 **/
	p.removeTween = function(tween) {
		var l = arguments.length;
		if (l > 1) {
			var good = true;
			for (var i=0; i<l; i++) { good = good && this.removeTween(arguments[i]); }
			return good;
		} else if (l === 0) { return true; }

		var tweens = this.tweens;
		var i = tweens.length;
		while (i--) {
			if (tweens[i] === tween) {
				tweens.splice(i, 1);
				tween._parent = null;
				if (tween.duration >= this.duration) { this.updateDuration(); }
				return true;
			}
		}
		return false;
	};

	/**
	 * Recalculates the duration of the timeline. The duration is automatically updated when tweens are added or removed,
	 * but this method is useful if you modify a tween after it was added to the timeline.
	 * @method updateDuration
	 **/
	p.updateDuration = function() {
		this.duration = 0;
		for (var i=0,l=this.tweens.length; i<l; i++) {
			var tween = this.tweens[i];
			var d = tween.duration;
			if (tween.loop > 0) { d *= tween.loop+1; }
			if (d > this.duration) { this.duration = d; }
		}
	};

	/**
	* Returns a string representation of this object.
	* @method toString
	* @return {String} a string representation of the instance.
	**/
	p.toString = function() {
		return "[Timeline]";
	};

	/**
	 * @method clone
	 * @protected
	 **/
	p.clone = function() {
		throw("Timeline can not be cloned.")
	};

// private methods:
	
	// Docced in AbstractTween
	p._updatePosition = function(jump, end) {
		var t = this.position;
		for (var i=0, l=this.tweens.length; i<l; i++) {
			this.tweens[i].setPosition(t, true, jump); // actions will run after all the tweens update.
		}
	};
	
	// Docced in AbstractTween
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		//console.log("	range", startPos, endPos, jump, includeStart);
		var t = this.position;
		for (var i=0, l=this.tweens.length; i<l; i++) {
			this.tweens[i]._runActions(startPos, endPos, jump, includeStart);
			if (t !== this.position) { return true; } // an action changed this timeline's position.
		}
	};


	createjs.Timeline = createjs.promote(Timeline, "AbstractTween");

}());

//##############################################################################
// Ease.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
	 * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
	 *
	 * Most methods on Ease can be passed directly as easing functions:
	 *
	 *      Tween.get(target).to({x:100}, 500, Ease.linear);
	 *
	 * However, methods beginning with "get" will return an easing function based on parameter values:
	 *
	 *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
	 *
	 * Please see the <a href="http://www.createjs.com/Demos/TweenJS/Tween_SparkTable">spark table demo</a> for an
	 * overview of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
	 *
	 * <em>Equations derived from work by Robert Penner.</em>
	 * @class Ease
	 * @static
	 **/
	function Ease() {
		throw "Ease cannot be instantiated.";
	}


// static methods and properties
	/**
	 * @method linear
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.linear = function(t) { return t; };

	/**
	 * Identical to linear.
	 * @method none
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.none = Ease.linear;

	/**
	 * Mimics the simple -100 to 100 easing in Adobe Flash/Animate.
	 * @method get
	 * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.get = function(amount) {
		if (amount < -1) { amount = -1; }
		else if (amount > 1) { amount = 1; }
		return function(t) {
			if (amount==0) { return t; }
			if (amount<0) { return t*(t*-amount+1+amount); }
			return t*((2-t)*amount+(1-amount));
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowIn
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowIn = function(pow) {
		return function(t) {
			return Math.pow(t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowOut = function(pow) {
		return function(t) {
			return 1-Math.pow(1-t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowInOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowInOut = function(pow) {
		return function(t) {
			if ((t*=2)<1) return 0.5*Math.pow(t,pow);
			return 1-0.5*Math.abs(Math.pow(2-t,pow));
		};
	};

	/**
	 * @method quadIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadIn = Ease.getPowIn(2);
	/**
	 * @method quadOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadOut = Ease.getPowOut(2);
	/**
	 * @method quadInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadInOut = Ease.getPowInOut(2);

	/**
	 * @method cubicIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicIn = Ease.getPowIn(3);
	/**
	 * @method cubicOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicOut = Ease.getPowOut(3);
	/**
	 * @method cubicInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicInOut = Ease.getPowInOut(3);

	/**
	 * @method quartIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartIn = Ease.getPowIn(4);
	/**
	 * @method quartOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartOut = Ease.getPowOut(4);
	/**
	 * @method quartInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartInOut = Ease.getPowInOut(4);

	/**
	 * @method quintIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintIn = Ease.getPowIn(5);
	/**
	 * @method quintOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintOut = Ease.getPowOut(5);
	/**
	 * @method quintInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintInOut = Ease.getPowInOut(5);

	/**
	 * @method sineIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineIn = function(t) {
		return 1-Math.cos(t*Math.PI/2);
	};

	/**
	 * @method sineOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineOut = function(t) {
		return Math.sin(t*Math.PI/2);
	};

	/**
	 * @method sineInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineInOut = function(t) {
		return -0.5*(Math.cos(Math.PI*t) - 1);
	};

	/**
	 * Configurable "back in" ease.
	 * @method getBackIn
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackIn = function(amount) {
		return function(t) {
			return t*t*((amount+1)*t-amount);
		};
	};
	/**
	 * @method backIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backIn = Ease.getBackIn(1.7);

	/**
	 * Configurable "back out" ease.
	 * @method getBackOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackOut = function(amount) {
		return function(t) {
			return (--t*t*((amount+1)*t + amount) + 1);
		};
	};
	/**
	 * @method backOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backOut = Ease.getBackOut(1.7);

	/**
	 * Configurable "back in out" ease.
	 * @method getBackInOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackInOut = function(amount) {
		amount*=1.525;
		return function(t) {
			if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
			return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
		};
	};
	/**
	 * @method backInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backInOut = Ease.getBackInOut(1.7);

	/**
	 * @method circIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circIn = function(t) {
		return -(Math.sqrt(1-t*t)- 1);
	};

	/**
	 * @method circOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circOut = function(t) {
		return Math.sqrt(1-(--t)*t);
	};

	/**
	 * @method circInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circInOut = function(t) {
		if ((t*=2) < 1) return -0.5*(Math.sqrt(1-t*t)-1);
		return 0.5*(Math.sqrt(1-(t-=2)*t)+1);
	};

	/**
	 * @method bounceIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceIn = function(t) {
		return 1-Ease.bounceOut(1-t);
	};

	/**
	 * @method bounceOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceOut = function(t) {
		if (t < 1/2.75) {
			return (7.5625*t*t);
		} else if (t < 2/2.75) {
			return (7.5625*(t-=1.5/2.75)*t+0.75);
		} else if (t < 2.5/2.75) {
			return (7.5625*(t-=2.25/2.75)*t+0.9375);
		} else {
			return (7.5625*(t-=2.625/2.75)*t +0.984375);
		}
	};

	/**
	 * @method bounceInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceInOut = function(t) {
		if (t<0.5) return Ease.bounceIn (t*2) * .5;
		return Ease.bounceOut(t*2-1)*0.5+0.5;
	};

	/**
	 * Configurable elastic ease.
	 * @method getElasticIn
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticIn = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2*Math.asin(1/amplitude);
			return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
		};
	};
	/**
	 * @method elasticIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticIn = Ease.getElasticIn(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2 * Math.asin(1/amplitude);
			return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
		};
	};
	/**
	 * @method elasticOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticOut = Ease.getElasticOut(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticInOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticInOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			var s = period/pi2 * Math.asin(1/amplitude);
			if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
			return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
		};
	};
	/**
	 * @method elasticInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticInOut = Ease.getElasticInOut(1,0.3*1.5);

	createjs.Ease = Ease;

}());

//##############################################################################
// MotionGuidePlugin.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * A TweenJS plugin for working with motion guides. Defined paths which objects can follow or orient along.
	 *
	 * To use the plugin, install the plugin after TweenJS has loaded. To define a path, add
	 *
	 * 		createjs.MotionGuidePlugin.install();
	 *
	 * <h4>Example</h4>
	 *
	 * 		// Using a Motion Guide
	 * 		createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
	 * 		// Visualizing the line
	 * 		graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
	 *
	 * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
	 * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
	 * 		<LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
	 * 		<LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
	 * 		<LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
	 * 		<LI> orient: Optional, string : "fixed"/"auto"/"cw"/"ccw"<UL>
	 *				<LI>"fixed" forces the object to face down the path all movement (relative to start rotation),</LI>
	 * 				<LI>"auto" rotates the object along the path relative to the line.</LI>
	 * 				<LI>"cw"/"ccw" force clockwise or counter clockwise rotations including Adobe Flash/Animate-like
	 * 				behaviour. This may override your end rotation value.</LI>
	 * 		</UL></LI>
	 * </UL>
	 * Guide objects should not be shared between tweens even if all properties are identical, the library stores
	 * information on these objects in the background and sharing them can cause unexpected behaviour. Values
	 * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
	 *
	 * @class MotionGuidePlugin
	 * @constructor
	 */
	function MotionGuidePlugin() {
		throw("MotionGuidePlugin cannot be instantiated.")
	}
	var s = MotionGuidePlugin;


// static properties:
	/**
	 * @property priority
	 * @protected
	 * @static
	 */
	s.priority = 0; // high priority, should run sooner

	/**
	 * READ-ONLY. A unique identifying string for this plugin. Used by TweenJS to ensure duplicate plugins are not installed on a tween.
	 * @property ID
	 * @type {String}
	 * @static
	 * @readonly
	 */
	s.ID = "MotionGuide";

// static methods
	/**
	 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
	 * @method install
	 * @static
	 */
	s.install = function() {
		createjs.Tween._installPlugin(MotionGuidePlugin);
		return createjs.Tween.IGNORE;
	};

	/**
	 * Called by TweenJS when a new property initializes on a tween.
	 * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
	 * @method init
	 * @param {Tween} tween
	 * @param {String} prop
	 * @param {any} value
	 * @return {any}
	 * @static
	 */
	s.init = function(tween, prop, value) {
		if(prop == "guide") {
			tween._addPlugin(s);
		}
	};

	/**
	 * Called when a new step is added to a tween (ie. a new "to" action is added to a tween).
	 * See {{#crossLink "SamplePlugin/step"}}{{/crossLink}} for more info.
	 * @method step
	 * @param {Tween} tween
	 * @param {TweenStep} step
	 * @param {Object} props
	 * @static
	 */
	s.step = function(tween, step, props) {
		for (var n in props) {
			if(n !== "guide") { continue; }

			var guideData = step.props.guide;
			var error = s._solveGuideData(props.guide, guideData);
			guideData.valid = !error;

			var end = guideData.endData;
			tween._injectProp("x", end.x);
			tween._injectProp("y", end.y);

			if(error || !guideData.orient) { break; }

			var initRot = step.prev.props.rotation === undefined ? (tween.target.rotation || 0) : step.prev.props.rotation;

			guideData.startOffsetRot = initRot - guideData.startData.rotation;

			if(guideData.orient == "fixed") {
				// controlled rotation
				guideData.endAbsRot = end.rotation + guideData.startOffsetRot;
				guideData.deltaRotation = 0;
			} else {
				// interpreted rotation

				var finalRot = props.rotation === undefined ? (tween.target.rotation || 0) : props.rotation;
				var deltaRot = (finalRot - guideData.endData.rotation) - guideData.startOffsetRot;
				var modRot = deltaRot % 360;

				guideData.endAbsRot = finalRot;

				switch(guideData.orient) {
					case "auto":
						guideData.deltaRotation = deltaRot;
						break;
					case "cw":
						guideData.deltaRotation = ((modRot + 360) % 360) + (360 * Math.abs((deltaRot/360) |0));
						break;
					case "ccw":
						guideData.deltaRotation = ((modRot - 360) % 360) + (-360 * Math.abs((deltaRot/360) |0));
						break;
				}
			}

			tween._injectProp("rotation", guideData.endAbsRot);
		}
	};

	/**
	 * Called before a property is updated by the tween.
	 * See {{#crossLink "SamplePlugin/change"}}{{/crossLink}} for more info.
	 * @method change
	 * @param {Tween} tween
	 * @param {TweenStep} step
	 * @param {String} prop
	 * @param {any} value
	 * @param {Number} ratio
	 * @param {Boolean} end
	 * @return {any}
	 * @static
	 */
	s.change = function(tween, step, prop, value, ratio, end) {
		var guideData = step.props.guide;

		if(
				!guideData ||							// Missing data
				(step.props === step.prev.props) || 	// In a wait()
				(guideData === step.prev.props.guide) 	// Guide hasn't changed
		) {
			return; // have no business making decisions
		}
		if(
				(prop === "guide" && !guideData.valid) ||		// this data is broken
				(prop == "x" || prop == "y") ||					// these always get over-written
				(prop === "rotation" && guideData.orient)		// currently over-written
		){
			return createjs.Tween.IGNORE;
		}

		s._ratioToPositionData(ratio, guideData, tween.target);
	};

// public methods
	/**
	 * Provide potentially useful debugging information, like running the error detection system, and rendering the path
	 * defined in the guide data.
	 *
	 * NOTE: you will need to transform your context 2D to the local space of the guide if you wish to line it up.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @param {DrawingContext2D} [ctx=undefined] The context to draw the object into.
	 * @param {Array} [higlight=undefined] Array of ratio positions to highlight
	 * @returns {undefined|String}
	 */
	s.debug = function(guideData, ctx, higlight) {
		guideData = guideData.guide || guideData;

		// errors
		var err = s._findPathProblems(guideData);
		if(err) {
			console.error("MotionGuidePlugin Error found: \n" + err);
		}

		// drawing
		if(!ctx){ return err; }

		var i;
		var path = guideData.path;
		var pathLength = path.length;
		var width = 3;
		var length = 9;

		ctx.save();
		//ctx.resetTransform();

		ctx.lineCap = "round";
		ctx.lineJoin = "miter";
		ctx.beginPath();

		// curve
		ctx.moveTo(path[0], path[1]);
		for(i=2; i < pathLength; i+=4) {
			ctx.quadraticCurveTo(
				path[i], path[i+1],
				path[i+2], path[i+3]
			);
		}

		ctx.strokeStyle = "black";
		ctx.lineWidth = width*1.5;
		ctx.stroke();
		ctx.strokeStyle = "white";
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();

		// highlights
		var hiCount = higlight.length;
		if(higlight && hiCount) {
			var tempStore = {};
			var tempLook = {};
			s._solveGuideData(guideData, tempStore);

			for(var i=0; i<hiCount; i++){
				tempStore.orient = "fixed";
				s._ratioToPositionData(higlight[i], tempStore, tempLook);

				ctx.beginPath();

				ctx.moveTo(tempLook.x, tempLook.y);
				ctx.lineTo(
					tempLook.x + Math.cos(tempLook.rotation * 0.0174533) * length,
					tempLook.y + Math.sin(tempLook.rotation * 0.0174533) * length
				);

				ctx.strokeStyle = "black";
				ctx.lineWidth = width*1.5;
				ctx.stroke();
				ctx.strokeStyle = "red";
				ctx.lineWidth = width;
				ctx.stroke();
				ctx.closePath();
			}
		}

		// end draw
		ctx.restore();

		return err;
	};

// private methods
	/**
	 * Calculate and store optimization data about the desired path to improve performance and accuracy of positions.
	 * @param {Object} source The guide data provided to the tween call
	 * @param {Object} storage the guide data used by the step calls and plugin to do the job, will be overwritten
	 * @returns {undefined|String} Can return an error if unable to generate the data.
	 * @private
	 */
	s._solveGuideData = function(source, storage) {
		var err = undefined;
		if(err = s.debug(source)) { return err; }

		var path = storage.path = source.path;
		var orient = storage.orient = source.orient;
		storage.subLines = [];
		storage.totalLength = 0;
		storage.startOffsetRot = 0;
		storage.deltaRotation = 0;
		storage.startData = {ratio: 0};
		storage.endData = {ratio: 1};
		storage.animSpan = 1;

		var pathLength = path.length;

		var precision = 10;
		var sx,sy, cx,cy, ex,ey, i,j, len, temp = {};

		sx = path[0];		sy = path[1];

		// get the data for each curve
		for(i=2; i < pathLength; i+=4) {
			cx = path[i];			cy = path[i+1];
			ex = path[i+2];			ey = path[i+3];

			var subLine = {
				weightings: [],
				estLength: 0,
				portion: 0
			};

			var subX = sx, subY = sy;
			// get the distance data for each point
			for(j=1; j <= precision;j++) {	// we need to evaluate t = 1 not t = 0
				s._getParamsForCurve(sx,sy, cx,cy, ex,ey, j/precision, false, temp);

				var dx = temp.x - subX, dy = temp.y - subY;
				len = Math.sqrt(dx*dx + dy*dy);
				subLine.weightings.push(len);
				subLine.estLength += len;

				subX = temp.x;
				subY = temp.y;
			}

			// figure out full lengths
			storage.totalLength += subLine.estLength;

			// use length to figure out proportional weightings
			for(j=0; j < precision; j++) {
				len = subLine.estLength;
				subLine.weightings[j] = subLine.weightings[j] / len;
			}

			storage.subLines.push(subLine);
			sx = ex;
			sy = ey;
		}

		// use length to figure out proportional weightings
		len = storage.totalLength;
		var l = storage.subLines.length;
		for(i=0; i<l; i++) {
			storage.subLines[i].portion = storage.subLines[i].estLength / len;
		}

		// determine start and end data
		var startRatio = isNaN(source.start) ? 0 : source.start;
		var endRatio = isNaN(source.end) ? 1 : source.end;
		s._ratioToPositionData(startRatio, storage, storage.startData);
		s._ratioToPositionData(endRatio, storage, storage.endData);

		// this has to be done last else the prev ratios will be out of place
		storage.startData.ratio = startRatio;
		storage.endData.ratio = endRatio;
		storage.animSpan = storage.endData.ratio - storage.startData.ratio;
	};

	/**
	 * Convert a percentage along the line into, a local line (start, control, end) t-value for calculation.
	 * @param {Number} ratio The (euclidean distance) percentage into the whole curve.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @param {Object} output Object to save output properties of x,y, and rotation onto.
	 * @returns {Object} The output object, useful for isolated calls.
	 * @private
	 */
	s._ratioToPositionData = function(ratio, guideData, output) {
		var lineSegments = guideData.subLines;

		var i,l, t, test, target;

		var look = 0;
		var precision = 10;
		var effRatio = (ratio * guideData.animSpan) + guideData.startData.ratio;

		// find subline
		l = lineSegments.length;
		for(i=0; i<l; i++) {
			test = lineSegments[i].portion;
			if(look + test >= effRatio){ target = i; break; }
			look += test;
		}
		if(target === undefined) { target = l-1;  look -= test; }

		// find midline weighting
		var subLines = lineSegments[target].weightings;
		var portion = test;
		l = subLines.length;
		for(i=0; i<l; i++) {
			test = subLines[i] * portion;
			if(look + test >= effRatio){ break; }
			look += test;
		}

		// translate the subline index into a position in the path data
		target = (target*4) + 2;
		// take the distance we've covered in our ratio, and scale it to distance into the weightings
		t = (i/precision) + (((effRatio-look) / test) * (1/precision));

		// position
		var pathData = guideData.path;
		s._getParamsForCurve(
			pathData[target-2],			pathData[target-1],
			pathData[target],			pathData[target+1],
			pathData[target+2],			pathData[target+3],
			t,
			guideData.orient,
			output
		);

		if(guideData.orient) {
			if(ratio >= 0.99999 && ratio <= 1.00001 && guideData.endAbsRot !== undefined) {
				output.rotation = guideData.endAbsRot;
			} else {
				output.rotation += guideData.startOffsetRot + (ratio * guideData.deltaRotation);
			}
		}

		return output;
	};

	/**
	 * For a given quadratic bezier t-value, what is the position and rotation. Save it onto the output object.
	 * @param {Number} sx Start x.
	 * @param {Number} sy Start y.
	 * @param {Number} cx Control x.
	 * @param {Number} cy Control y.
	 * @param {Number} ex End x.
	 * @param {Number} ey End y.
	 * @param {Number} t T value (parametric distance into curve).
	 * @param {Boolean} orient Save rotation data.
	 * @param {Object} output Object to save output properties of x,y, and rotation onto.
	 * @private
	 */
	s._getParamsForCurve = function(sx,sy, cx,cy, ex,ey, t, orient, output) {
		var inv = 1 - t;

		// finding a point on a bezier curve
		output.x =	inv*inv * sx + 2 * inv * t * cx + t*t * ex;
		output.y =	inv*inv * sy + 2 * inv * t * cy + t*t * ey;

		// finding an angle on a bezier curve
		if(orient) {
			// convert from radians back to degrees
			output.rotation = 57.2957795 * Math.atan2(
				(cy - sy)*inv + (ey - cy)*t,
				(cx - sx)*inv + (ex - cx)*t
			);
		}
	};

	/**
	 * Perform a check to validate path information so plugin can avoid later error checking.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @returns {undefined|String} The problem found, or undefined if no problems.
	 * @private
	 */
	s._findPathProblems = function(guideData) {
		var path = guideData.path;
		var valueCount = (path && path.length) || 0;	// ensure this is a number to simplify later logic
		if(valueCount < 6 || (valueCount-2) % 4) {
			var message =	"\tCannot parse 'path' array due to invalid number of entries in path. ";
			message +=		"There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). ";
			message +=		"See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n";
			message +=		"Only [ "+ valueCount +" ] values found. Expected: "+ Math.max(Math.ceil((valueCount-2)/4)*4+2, 6); //6, 10, 14,...
			return message;
		}

		for(var i=0; i<valueCount; i++) {
			if(isNaN(path[i])){
				return "All data in path array must be numeric";
			}
		}

		var start = guideData.start;
		if(isNaN(start) && !(start === undefined)/* || start < 0 || start > 1*/) {	// outside 0-1 is unpredictable, but not breaking
			return "'start' out of bounds. Expected 0 to 1, got: "+ start;
		}
		var end = guideData.end;
		if(isNaN(end) && (end !== undefined)/* || end < 0 || end > 1*/) {	// outside 0-1 is unpredictable, but not breaking
			return "'end' out of bounds. Expected 0 to 1, got: "+ end;
		}

		var orient = guideData.orient;
		if(orient) { // mirror the check used elsewhere
			if(orient != "fixed" && orient != "auto" && orient != "cw" && orient != "ccw") {
				return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: '+ orient;
			}
		}

		return undefined;
	};

	createjs.MotionGuidePlugin = MotionGuidePlugin;

}());

//##############################################################################
// version.js
//##############################################################################

this.createjs = this.createjs || {};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class TweenJS
	 **/
	var s = createjs.TweenJS = createjs.TweenJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*=version*/"1.0.0"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*=date*/"Thu, 14 Sep 2017 19:47:47 GMT"; // injected by build process

})();