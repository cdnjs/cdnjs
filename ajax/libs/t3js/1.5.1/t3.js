/*! t3 v 1.5.1*/
/*!
Copyright 2015 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Start wrapper
// We use this to make sure we don't assign globals unless we actually want to
(function(window) {

/**
 * @fileoverview Base namespaces for Box JavaScript.
 * @author Box
 */

/* eslint-disable no-unused-vars */

/**
 * The one global object for Box JavaScript.
 * @namespace
 */
var Box = {};
/* eslint-enable no-unused-vars */

/**
 * @fileoverview Definition of a custom event type. This is used as a utility
 * throughout the framework whenever custom events are used. It is intended to
 * be inherited from, either through the prototype or via mixin.
 * @author Box
 */

Box.EventTarget = (function() {

	'use strict';

	/**
	 * An object that is capable of generating custom events and also
	 * executing handlers for events when they occur.
	 * @constructor
	 */
	function EventTarget() {

		/**
		 * Map of events to handlers. The keys in the object are the event names.
		 * The values in the object are arrays of event handler functions.
		 * @type {Object}
		 * @private
		 */
		this._handlers = {};
	}

	EventTarget.prototype = {

		// restore constructor
		constructor: EventTarget,

		/**
		 * Adds a new event handler for a particular type of event.
		 * @param {string} type The name of the event to listen for.
		 * @param {Function} handler The function to call when the event occurs.
		 * @returns {void}
		 */
		on: function(type, handler) {

			var handlers = this._handlers[type],
				i,
				len;

			if (typeof handlers === 'undefined') {
				handlers = this._handlers[type] = [];
			}

			for (i = 0, len = handlers.length; i < len; i++) {
				if (handlers[i] === handler) {
					// prevent duplicate handlers
					return;
				}
			}

			handlers.push(handler);
		},

		/**
		 * Fires an event with the given name and data.
		 * @param {string} type The type of event to fire.
		 * @param {Object} [data] An object with properties that should end up on
		 *                        the event object for the given event.
		 * @returns {void}
		 */
		fire: function(type, data) {

			var handlers,
				i,
				len,
				event = {
					type: type,
					data: data
				};

			// if there are handlers for the event, call them in order
			handlers = this._handlers[event.type];
			if (handlers instanceof Array) {
				// @NOTE: do a concat() here to create a copy of the handlers array,
				// so that if another handler is removed of the same type, it doesn't
				// interfere with the handlers array during this loop
				handlers = handlers.concat();
				for (i = 0, len = handlers.length; i < len; i++) {
					handlers[i].call(this, event);
				}
			}
		},

		/**
		 * Removes an event handler from a given event.
		 * @param {string} type The name of the event to remove from.
		 * @param {Function} handler The function to remove as a handler.
		 * @returns {void}
		 */
		off: function(type, handler) {

			var handlers = this._handlers[type],
				i,
				len;

			if (handlers instanceof Array) {
				for (i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						handlers.splice(i, 1);
						break;
					}
				}
			}
		}
	};

	return EventTarget;

}());

/**
 * @fileoverview DOM abstraction to use jquery to add and remove event listeners
 * in T3
 * @author jdivock
 */

Box.JQueryDOM = (function() {
    'use strict';

    return {

		type: 'jquery',

		/**
		 * Returns the first element that is a descendant of the element
		 * on which it is invoked that matches the specified group of selectors.
		 * @param {HTMLElement} root parent element to query off of
		 * @param {string} selector query string to match on
		 *
		 * @returns {HTMLElement} first element found matching query
		 */
		query: function(root, selector) {
			// Aligning with native which returns null if not found
			return $(root).find(selector)[0] || null;
		},

		/**
		 * Returns a non-live NodeList of all elements descended from the
		 * element on which it is invoked that match the specified group of CSS selectors.
		 * @param {HTMLElement} root parent element to query off of
		 * @param {string} selector query string to match on
		 *
		 * @returns {Array} elements found matching query
		 */
		queryAll: function(root, selector) {
			return $.makeArray($(root).find(selector));
		},

		/**
		 * Adds event listener to element via jquery
		 * @param {HTMLElement} element Target to attach listener to
		 * @param {string} type Name of the action to listen for
		 * @param {function} listener Function to be executed on action
		 *
		 * @returns {void}
		 */
		on: function(element, type, listener) {
			$(element).on(type, listener);
		},

		/**
		 * Removes event listener to element via jquery
		 * @param {HTMLElement} element Target to remove listener from
		 * @param {string} type Name of the action remove listener from
		 * @param {function} listener Function to be removed from action
		 *
		 * @returns {void}
		 */
		off: function(element, type, listener) {
			$(element).off(type, listener);
		}
    };
}());

Box.DOM = Box.JQueryDOM;

/**
 * @fileoverview An object that encapsulates event delegation wireup for a
 * DOM element.
 * @author Box
 */

Box.DOMEventDelegate = (function() {

	'use strict';

	// Supported events for modules. Only events that bubble properly can be used in T3.
	var EVENT_TYPES = ['click', 'mouseover', 'mouseout', 'mousedown', 'mouseup',
			'mouseenter', 'mouseleave', 'keydown', 'keyup', 'submit', 'change',
			'contextmenu', 'dblclick', 'input', 'focusin', 'focusout'];


	/**
	 * Determines if a given element represents a module.
	 * @param {HTMLElement} element The element to check.
	 * @returns {boolean} True if the element represents a module, false if not.
	 * @private
	 */
	function isModuleElement(element) {
		return element && element.hasAttribute('data-module');
	}

	/**
	 * Determines if a given element represents a T3 type.
	 * @param {HTMLElement} element The element to check.
	 * @returns {boolean} True if the element represents a T3 type, false if not.
	 * @private
	 */
	function isTypeElement(element) {
		return element && element.hasAttribute('data-type');
	}

	/**
	 * Finds the closest ancestor that of an element that has a data-type
	 * attribute.
	 * @param {HTMLElement} element The element to start searching from.
	 * @returns {HTMLElement} The matching element or null if not found.
	 */
	function getNearestTypeElement(element) {
		var found = isTypeElement(element);

		// We need to check for the existence of 'element' since occasionally we call this on a detached element node.
		// For example:
		//  1. event handlers like mouseout may sometimes detach nodes from the DOM
		//  2. event handlers like mouseleave will still fire on the detached node
		// Without checking the existence of a parentNode and returning null, we would throw errors
		while (!found && element && !isModuleElement(element)) {
			element = element.parentNode;
			found = isTypeElement(element);
		}

		return found ? element : null;
	}

	/**
	 * Iterates over each supported event type that is also in the handler, applying
	 * a callback function. This is used to more easily attach/detach all events.
	 * @param {Object} handler An object with onclick, onmouseover, etc. methods.
	 * @param {Function} callback The function to call on each event type.
	 * @param {Object} [thisValue] The value of "this" inside the callback.
	 * @returns {void}
	 * @private
	 */
	function forEachEventType(handler, callback, thisValue) {

		var i,
			type;

		for (i = 0; i < EVENT_TYPES.length; i++) {
			type = EVENT_TYPES[i];

			// only call the callback if the event is on the handler
			if (handler['on' + type]) {
				callback.call(thisValue, type);
			}
		}
	}

	/**
	 * An object that manages events within a single DOM element.
	 * @param {HTMLElement} element The DOM element to handle events for.
	 * @param {Object} handler An object containing event handlers such as "onclick".
	 * @constructor
	 */
	function DOMEventDelegate(element, handler) {

		/**
		 * The DOM element that this object is handling events for.
		 * @type {HTMLElement}
		 */
		this.element = element;

		/**
		 * Object on which event handlers are available.
		 * @type {Object}
		 * @private
		 */
		this._handler = handler;

		/**
		 * Tracks event handlers whose this-value is bound to the correct
		 * object.
		 * @type {Object}
		 * @private
		 */
		this._boundHandler = {};

		/**
		 * Indicates if events have been attached.
		 * @type {boolean}
		 * @private
		 */
		this._attached = false;
	}


	DOMEventDelegate.prototype = {

		// restore constructor
		constructor: DOMEventDelegate,

		_handleEvent: function(event) {
			var targetElement = getNearestTypeElement(event.target),
				elementType = targetElement ? targetElement.getAttribute('data-type') : '';

			this._handler['on' + event.type](event, targetElement, elementType);
		},

		/**
		 * Attaches all event handlers for the DOM element.
		 * @returns {void}
		 */
		attachEvents: function() {
			if (!this._attached) {

				forEachEventType(this._handler, function(eventType) {
					var that = this;

					function handleEvent() {
						that._handleEvent.apply(that, arguments);
					}

					Box.DOM.on(this.element, eventType, handleEvent);

					this._boundHandler[eventType] = handleEvent;
				}, this);

				this._attached = true;
			}
		},

		/**
		 * Detaches all event handlers for the DOM element.
		 * @returns {void}
		 */
		detachEvents: function() {
			forEachEventType(this._handler, function(eventType) {
				Box.DOM.off(this.element, eventType, this._boundHandler[eventType]);
			}, this);
		}
	};

	return DOMEventDelegate;
}());


/**
 * @fileoverview Contains the Context type which is used by modules to interact
 *               with the environment.
 * @author Box
 */

Box.Context = (function() {

	'use strict';

	/**
	 * The object type that modules use to interact with the environment. Used
	 * exclusively within Box.Application, but exposed publicly for easy testing.
	 * @param {Box.Application} application The application object to wrap.
	 * @param {HTMLElement} element Module's DOM element
	 * @constructor
	 */
	function Context(application, element) {
		this.application = application;
		this.element = element;
	}

	//-------------------------------------------------------------------------
	// Passthrough Methods
	//-------------------------------------------------------------------------

	Context.prototype = {

		/**
		 * Passthrough method to application that broadcasts messages.
		 * @param {string} name Name of the message event
		 * @param {*} [data] Custom parameters for the message
		 * @returns {void}
		 */
		broadcast: function(name, data) {
			this.application.broadcast(name, data);
		},

		/**
		 * Passthrough method to application that retrieves services.
		 * @param {string} serviceName The name of the service to retrieve.
		 * @returns {Object|null} An object if the service is found or null if not.
		 */
		getService: function(serviceName) {
			return this.application.getService(serviceName);
		},

		/**
		 * Returns any configuration information that was output into the page
		 * for this instance of the module.
		 * @param {string} [name] Specific config parameter
		 * @returns {*} config value or the entire configuration JSON object
		 *                if no name is specified (null if either not found)
		 */
		getConfig: function(name) {
			return this.application.getModuleConfig(this.element, name);
		},

		/**
		 * Returns a global variable
		 * @param {string} name Specific global var name
		 * @returns {*} returns the window-scope variable matching the name, null otherwise
		 */
		getGlobal: function(name) {
			return this.application.getGlobal(name);
		},

		/**
		 * Returns global configuration data
		 * @param {string} [name] Specific config parameter
		 * @returns {*} config value or the entire configuration JSON object
		 *                if no name is specified (null if either not found)
		 */
		getGlobalConfig: function(name) {
			return this.application.getGlobalConfig(name);
		},

		/**
		 * Passthrough method that signals that an error has occurred. If in development mode, an error
		 * is thrown. If in production mode, an event is fired.
		 * @param {Error} [exception] The exception object to use.
		 * @returns {void}
		 */
		reportError: function(exception) {
			this.application.reportError(exception);
		},

		//-------------------------------------------------------------------------
		// Service Shortcuts
		//-------------------------------------------------------------------------

		/**
		 * Returns the element that represents the module.
		 * @returns {HTMLElement} The element representing the module.
		 */
		getElement: function() {
			return this.element;
		}

	};

	return Context;

}());

/**
 * @fileoverview Contains the main application object that is the heart of the
 *               JavaScript architecture.
 * @author Box
 */

/**
 * The core application object where components are registered and managed
 * @mixes Box.EventTarget
 * @namespace
 */
Box.Application = (function() {

	'use strict';

	//--------------------------------------------------------------------------
	// Virtual Types
	//--------------------------------------------------------------------------

	/**
	 * An object representing information about a module.
	 * @typedef {Object} Box.Application~ModuleData
	 * @property {Function} creator The function that creates an instance of this module.
	 * @property {int} counter The number of module instances.
	 */

	/**
	 * An object representing information about a module instance.
	 * @typedef {Object} Box.Application~ModuleInstanceData
	 * @property {string} moduleName The name of the module.
	 * @property {Box.Application~ModuleInstance} instance The module instance.
	 * @property {Box.Context} context The context object for the module.
	 * @property {HTMLElement} element The DOM element associated with the module.
	 * @property {Object} eventHandlers Handler callback functions by event type.
	 */

	/**
	 * A module object.
	 * @typedef {Object} Box.Application~Module
	 */

	//--------------------------------------------------------------------------
	// Private
	//--------------------------------------------------------------------------

	var MODULE_SELECTOR = '[data-module]';

	var globalConfig = {},   // Global configuration
		modules = {},        // Information about each registered module by moduleName
		serviceStack = [],   // Track circular dependencies while loading services
		services = {},       // Information about each registered service by serviceName
		behaviors = {},      // Information about each registered behavior by behaviorName
		instances = {},      // Module instances keyed by DOM element id
		exports = [],        // Method names that were added to application/context by services
		initialized = false, // Flag whether the application has been initialized

		application = new Box.EventTarget();	// base object for application

	/**
	 * Simple implementation of ES6 Object.assign() with just two parameters.
	 * @param {Object} receiver The object to receive properties
	 * @param {Object} supplier The object whose properties should be copied.
	 * @returns {Object} The receiver object.
	 * @private
	 */
	function assign(receiver, supplier) {

		for (var prop in supplier) {
			if (supplier.hasOwnProperty(prop)) {
				receiver[prop] = supplier[prop];
			}
		}

		return receiver;
	}

	/**
	 * Creates a new version of a function whose this-value is bound to a specific
	 * object.
	 * @param {Function} method The function to bind.
	 * @param {Object} thisValue The this-value to set for the function.
	 * @returns {Function} A bound version of the function.
	 * @private
	 */
	function bind(method, thisValue) {
		return function() {
			return method.apply(thisValue, arguments);
		};
	}

	/**
	 * Simple implementation of Array.prototype.indexOf().
	 * @param {*[]} items An array of items to search.
	 * @param {*} item The item to search for in the array.
	 * @returns {int} The index of the item in the array if found, -1 if not found.
	 * @private
	 */
	function indexOf(items, item) {
		for (var i = 0, len = items.length; i < len; i++) {
			if (items[i] === item) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Reset all state to its default values
	 * @returns {void}
	 * @private
	 */
	function reset() {
		globalConfig = {};
		modules = {};
		services = {};
		serviceStack = [];
		behaviors = {};
		instances = {};
		initialized = false;

		for (var i = 0; i < exports.length; i++) {
			delete application[exports[i]];
			delete Box.Context.prototype[exports[i]];
		}
		exports = [];
	}


	/**
	 * Indicates if a given service is being instantiated. This is used to check
	 * for circular dependencies in service instantiation. If two services
	 * reference each other, it causes a stack overflow and is really hard to
	 * track down, so we provide an extra check to make finding this issue
	 * easier.
	 * @param {string} serviceName The name of the service to check.
	 * @returns {boolean} True if the service is already being instantiated,
	 *		false if not.
	 * @private
	 */
	function isServiceBeingInstantiated(serviceName) {
		for (var i = 0, len = serviceStack.length; i < len; i++) {
			if (serviceStack[i] === serviceName) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Signals that an error has occurred. If in development mode, an error
	 * is thrown. If in production mode, an event is fired.
	 * @param {Error} [exception] The exception object to use.
	 * @returns {void}
	 * @private
	 */
	function error(exception) {

		if (globalConfig.debug) {
			throw exception;
		} else {
			application.fire('error', {
				exception: exception
			});
		}
	}

	/**
	 * Wraps all methods on an object with try-catch so that objects don't need
	 * to worry about trapping their own errors. When an error occurs, the
	 * error event is fired with the error information.
	 * @see http://www.nczonline.net/blog/2009/04/28/javascript-error-handling-anti-pattern/
	 * @param {Object} object Any object whose public methods should be wrapped.
	 * @param {string} objectName The name that should be reported for the object
	 *                            when an error occurs.
	 * @returns {void}
	 * @private
	 */
	function captureObjectErrors(object, objectName) {

		var propertyName,
			propertyValue;

		/* eslint-disable guard-for-in, no-loop-func */
		for (propertyName in object) {
			propertyValue = object[propertyName];

			// only do this for methods, be sure to check before making changes!
			if (typeof propertyValue === 'function') {
				/*
				 * This creates a new function that wraps the original function
				 * in a try-catch. The outer function executes immediately with
				 * the name and actual method passed in as values. This allows
				 * us to create a function with specific information even though
				 * it's inside of a loop.
				 */
				object[propertyName] = (function(methodName, method) {
					return function() {
						var errorPrefix = objectName + '.' + methodName + '() - ';
						try {
							return method.apply(this, arguments);
						} catch (ex) {
							ex.methodName = methodName;
							ex.objectName = objectName;
							ex.name = errorPrefix + ex.name;
							ex.message = errorPrefix + ex.message;
							error(ex);
						}
					};

				}(propertyName, propertyValue));
			}
		}
		/* eslint-enable guard-for-in, no-loop-func */
	}

	/**
	 * Returns the name of the module associated with a DOM element
	 * @param {HTMLElement} element DOM element associated with the module
	 * @returns {string} Name of the module (empty if not a module)
	 * @private
	 */
	function getModuleName(element) {
		var moduleAttribute = element.getAttribute('data-module');

		if (moduleAttribute) {
			return moduleAttribute.split(' ')[0];
		}
		return '';
	}

	/**
	 * Calls a method on an object if it exists
	 * @param {Box.Application~ModuleInstance} instance Module object to call the method on.
	 * @param {string} method Name of method
	 * @param {...*} [args] Any additional arguments are passed as function parameters (Optional)
	 * @returns {void}
	 * @private
	 */
	function callModuleMethod(instance, method) {
		if (typeof instance[method] === 'function') {
			// Getting the rest of the parameters (the ones other than instance and method)
			instance[method].apply(instance, Array.prototype.slice.call(arguments, 2));
		}
	}

	/**
	 * Returns the requested service
	 * @param {string} serviceName The name of the service to retrieve.
	 * @returns {!Object} An object if the service is found or null if not.
	 * @private
	 */
	function getService(serviceName) {

		var serviceData = services[serviceName];

		if (serviceData) {

			// check for circular dependencies
			if (isServiceBeingInstantiated(serviceName)) {
				error(new ReferenceError('Circular service dependency: ' + serviceStack.join(' -> ') + ' -> ' + serviceName));
				return null;
			}

			// flag that this service is being initialized just in case there's a circular dependency issue
			serviceStack.push(serviceName);

			if (!serviceData.instance) {
				serviceData.instance = serviceData.creator(application);
			}

			// no error was thrown for circular dependencies, so we're done
			serviceStack.pop();

			return serviceData.instance;
		}

		return null;
	}

	/**
	 * Gets the behaviors associated with a particular module
	 * @param {Box.Application~ModuleInstanceData} instanceData Module with behaviors
	 * @returns {Array} Array of behavior instances
	 * @private
	 */
	function getBehaviors(instanceData) {
		var i,
			behaviorNames,
			behaviorData,
			behaviorInstances = [],
			moduleBehaviorInstances;

		behaviorNames = instanceData.instance.behaviors || [];

		for (i = 0; i < behaviorNames.length; i++) {

			if (!('behaviorInstances' in instanceData)) {
				instanceData.behaviorInstances = {};
			}

			moduleBehaviorInstances = instanceData.behaviorInstances;
			behaviorData = behaviors[behaviorNames[i]];

			if (behaviorData) {

				if (!moduleBehaviorInstances[behaviorNames[i]]) {
					moduleBehaviorInstances[behaviorNames[i]] = behaviorData.creator(instanceData.context);
				}

				behaviorInstances.push(moduleBehaviorInstances[behaviorNames[i]]);
			} else {
				error(new Error('Behavior "' + behaviorNames[i] + '" not found'));
			}
		}

		return behaviorInstances;
	}

	/**
	 * Creates a new event delegate and sets up its event handlers.
	 * @param {Array} eventDelegates The array of event delegates to add to.
	 * @param {HTMLElement} element The HTML element to bind to.
	 * @param {Object} handler The handler object for the delegate (either the
	 *		module instance or behavior instance).
	 * @returns {void}
	 * @private
	 */
	function createAndBindEventDelegate(eventDelegates, element, handler) {
		var delegate = new Box.DOMEventDelegate(element, handler);
		eventDelegates.push(delegate);
		delegate.attachEvents();
	}

	/**
	 * Binds the user events listed in the module to its toplevel element
	 * @param {Box.Application~ModuleInstanceData} instanceData Events will be bound to the module defined in the Instance object
	 * @returns {void}
	 * @private
	 */
	function bindEventListeners(instanceData) {
		var eventDelegates = instanceData.eventDelegates,
			moduleBehaviors = getBehaviors(instanceData);

		// bind the module events
		createAndBindEventDelegate(eventDelegates, instanceData.element, instanceData.instance);

		// bind the behavior(s) events
		for (var i = 0; i < moduleBehaviors.length; i++) {
			createAndBindEventDelegate(eventDelegates, instanceData.element, moduleBehaviors[i]);
		}
	}

	/**
	 * Unbinds the user events listed in the module
	 * @param {Box.Application~ModuleInstanceData} instanceData Events will be unbound from the module defined in the Instance object
	 * @returns {void}
	 * @private
	 */
	function unbindEventListeners(instanceData) {

		var eventDelegates = instanceData.eventDelegates;

		for (var i = 0; i < eventDelegates.length; i++) {
			eventDelegates[i].detachEvents();
		}

		instanceData.eventDelegates = [];
	}

	/**
	 * Gets the module instance associated with a DOM element
	 * @param {HTMLElement} element DOM element associated with module
	 * @returns {Box.Application~ModuleInstance} Instance object of the module (undefined if not found)
	 * @private
	 */
	function getInstanceDataByElement(element) {
		return instances[element.id];
	}

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	/** @lends Box.Application */
	return assign(application, {

		//----------------------------------------------------------------------
		// Application Lifecycle
		//----------------------------------------------------------------------

		/**
		 * Initializes the application
		 * @param {Object} [params] Configuration object
		 * @returns {Box.Application} The application object.
		 */
		init: function(params) {
			assign(globalConfig, params || {});

			this.startAll(document.documentElement);

			this.fire('init');
			initialized = true;
			return this;
		},

		/**
		 * Stops all modules and clears all saved state
		 * @returns {Box.Application} The application object.
		 */
		destroy: function() {
			this.stopAll(document.documentElement);

			reset();

			return this;
		},

		//----------------------------------------------------------------------
		// Module Lifecycle
		//----------------------------------------------------------------------

		/**
		 * Determines if a module represented by the HTML element is started.
		 * If the element doesn't have a data-module attribute, this method
		 * always returns false.
		 * @param {HTMLElement} element The element that represents a module.
		 * @returns {boolean} True if the module is started, false if not.
		 */
		isStarted: function(element) {
			var instanceData = getInstanceDataByElement(element);
			return (typeof instanceData === 'object');
		},

		/**
		 * Begins the lifecycle of a module (registers and binds listeners)
		 * @param {HTMLElement} element DOM element associated with module to be started
		 * @returns {Box.Application} The application object.
		 */
		start: function(element) {
			var moduleName = getModuleName(element),
				moduleData = modules[moduleName],
				instanceData,
				context,
				module;

			if (!moduleData) {
				error(new Error('Module type "' + moduleName + '" is not defined.'));
				return this;
			}

			if (!this.isStarted(element)) {
				// Auto-assign module id to element
				if (!element.id) {
					element.id = 'mod-' + moduleName + '-' + moduleData.counter;
				}

				moduleData.counter++;

				context = new Box.Context(this, element);

				module = moduleData.creator(context);

				// Prevent errors from showing the browser, fire event instead
				if (!globalConfig.debug) {
					captureObjectErrors(module, moduleName);
				}

				instanceData = {
					moduleName: moduleName,
					instance: module,
					context: context,
					element: element,
					eventDelegates: []
				};

				bindEventListeners(instanceData);

				instances[element.id] = instanceData;

				callModuleMethod(instanceData.instance, 'init');

				var moduleBehaviors = getBehaviors(instanceData),
					behaviorInstance;

				for (var i = 0, len = moduleBehaviors.length; i < len; i++) {
					behaviorInstance = moduleBehaviors[i];
					callModuleMethod(behaviorInstance, 'init');
				}

			}

			return this;
		},

		/**
		 * Ends the lifecycle of a module (unregisters and unbinds listeners)
		 * @param {HTMLElement} element DOM element associated with module to be stopped
		 * @returns {Box.Application} The application object.
		 */
		stop: function(element) {
			var instanceData = getInstanceDataByElement(element);

			if (!instanceData) {

				if (globalConfig.debug) {
					error(new Error('Unable to stop module associated with element: ' + element.id));
					return this;
				}

			} else {

				unbindEventListeners(instanceData);

				// Call these in reverse order
				var moduleBehaviors = getBehaviors(instanceData);
				var behaviorInstance;
				for (var i = moduleBehaviors.length - 1; i >= 0; i--) {
					behaviorInstance = moduleBehaviors[i];
					callModuleMethod(behaviorInstance, 'destroy');
				}

				callModuleMethod(instanceData.instance, 'destroy');

				delete instances[element.id];
			}

			return this;
		},

		/**
		 * Starts all modules contained within an element
		 * @param {HTMLElement} root DOM element which contains modules
		 * @returns {Box.Application} The application object.
		 */
		startAll: function(root) {
			var moduleElements = Box.DOM.queryAll(root, MODULE_SELECTOR);

			for (var i = 0, len = moduleElements.length; i < len; i++) {
				this.start(moduleElements[i]);
			}

			return this;
		},

		/**
		 * Stops all modules contained within an element
		 * @param {HTMLElement} root DOM element which contains modules
		 * @returns {Box.Application} The application object.
		 */
		stopAll: function(root) {
			var moduleElements = Box.DOM.queryAll(root, MODULE_SELECTOR);

			for (var i = 0, len = moduleElements.length; i < len; i++) {
				this.stop(moduleElements[i]);
			}

			return this;
		},

		//----------------------------------------------------------------------
		// Module-Related
		//----------------------------------------------------------------------

		/**
		 * Registers a new module
		 * @param {string} moduleName Unique module identifier
		 * @param {Function} creator Factory function used to generate the module
		 * @returns {Box.Application} The application object.
		 */
		addModule: function(moduleName, creator) {
			if (typeof modules[moduleName] !== 'undefined') {
				error(new Error('Module ' + moduleName + ' has already been added.'));
				return this;
			}

			modules[moduleName] = {
				creator: creator,
				counter: 1 // increments for each new instance
			};

			return this;
		},

		/**
		 * Returns any configuration information that was output into the page
		 * for this instance of the module.
		 * @param {HTMLElement} element The HTML element associated with a module.
		 * @param {string} [name] Specific config parameter
		 * @returns {*} config value or the entire configuration JSON object
		 *                if no name is specified (null if either not found)
		 */
		getModuleConfig: function(element, name) {

			var instanceData = getInstanceDataByElement(element),
				configElement;

			if (instanceData) {

				if (!instanceData.config) {
					// <script type="text/x-config"> is used to store JSON data
					configElement = Box.DOM.query(element, 'script[type="text/x-config"]');

					// <script> tag supports .text property
					if (configElement) {
						instanceData.config = JSON.parse(configElement.text);
					}
				}

				if (!instanceData.config) {
					return null;
				} else if (typeof name === 'undefined') {
					return instanceData.config;
				} else if (name in instanceData.config) {
					return instanceData.config[name];
				} else {
					return null;
				}
			}

			return null;
		},

		//----------------------------------------------------------------------
		// Service-Related
		//----------------------------------------------------------------------

		/**
		 * Registers a new service
		 * @param {string} serviceName Unique service identifier
		 * @param {Function} creator Factory function used to generate the service
		 * @param {Object} [options] Additional options
		 * @param {string[]} [options.exports] Method names to expose on context and application
		 * @returns {Box.Application} The application object.
		 */
		addService: function(serviceName, creator, options) {

			if (typeof services[serviceName] !== 'undefined') {
				error(new Error('Service ' + serviceName + ' has already been added.'));
				return this;
			}

			options = options || {};

			services[serviceName] = {
				creator: creator,
				instance: null
			};

			if (options.exports) {
				var i,
					length = options.exports.length;

				for (i = 0; i < length; i++) {

					var exportedMethodName = options.exports[i];

					/* eslint-disable no-loop-func */
					var handler = (function(methodName) {
						return function() {
							var service = getService(serviceName);
							return service[methodName].apply(service, arguments);
						};
					}(exportedMethodName));
					/* eslint-enable no-loop-func */

					if (exportedMethodName in this) {
						error(new Error(exportedMethodName + ' already exists on Application object'));
						return this;
					} else {
						this[exportedMethodName] = handler;
					}

					if (exportedMethodName in Box.Context.prototype) {
						error(new Error(exportedMethodName + ' already exists on Context prototype'));
						return this;
					} else {
						Box.Context.prototype[exportedMethodName] = handler;
					}

					exports.push(exportedMethodName);
				}
			}

			return this;
		},

		/**
		 * Returns the requested service
		 * @param {string} serviceName The name of the service to retrieve.
		 * @returns {!Object} An object if the service is found or null if not.
		 */
		getService: getService,


		//----------------------------------------------------------------------
		// Behavior-Related
		//----------------------------------------------------------------------

		/**
		 * Registers a new behavior
		 * @param {string} behaviorName Unique behavior identifier
		 * @param {Function} creator Factory function used to generate the behavior
		 * @returns {Box.Application} The application object.
		 */
		addBehavior: function(behaviorName, creator) {
			if (typeof behaviors[behaviorName] !== 'undefined') {
				error(new Error('Behavior ' + behaviorName + ' has already been added.'));
				return this;
			}

			behaviors[behaviorName] = {
				creator: creator,
				instance: null
			};

			return this;
		},

		//----------------------------------------------------------------------
		// Messaging
		//----------------------------------------------------------------------

		/**
		 * Broadcasts a message to all registered listeners
		 * @param {string} name Name of the message
		 * @param {*} [data] Custom parameters for the message
		 * @returns {Box.Application} The application object.
		 */
		broadcast: function(name, data) {
			var i,
				id,
				instanceData,
				behaviorInstance,
				moduleBehaviors,
				messageHandlers;

			for (id in instances) {

				if (instances.hasOwnProperty(id)) {
					messageHandlers = [];
					instanceData = instances[id];

					// Module message handler is called first
					if (indexOf(instanceData.instance.messages || [], name) !== -1) {
						messageHandlers.push(bind(instanceData.instance.onmessage, instanceData.instance));
					}

					// And then any message handlers defined in module's behaviors
					moduleBehaviors = getBehaviors(instanceData);
					for (i = 0; i < moduleBehaviors.length; i++) {
						behaviorInstance = moduleBehaviors[i];

						if (indexOf(behaviorInstance.messages || [], name) !== -1) {
							messageHandlers.push(bind(behaviorInstance.onmessage, behaviorInstance));
						}
					}

					for (i = 0; i < messageHandlers.length; i++) {
						messageHandlers[i](name, data);
					}
				}

			}

			// also fire an event so non-T3 code can listen for the message
			this.fire('message', {
				message: name,
				messageData: data
			});

			return this;
		},

		//----------------------------------------------------------------------
		// Global Configuration
		//----------------------------------------------------------------------

		/**
		 * Returns a global variable
		 * @param {string} name Specific global var name
		 * @returns {*} returns the window-scope variable matching the name, null otherwise
		 */
		getGlobal: function(name) {
			if (name in window) {
				return window[name];
			} else {
				return null;
			}
		},

		/**
		 * Returns global configuration data
		 * @param {string} [name] Specific config parameter
		 * @returns {*} config value or the entire configuration JSON object
		 *                if no name is specified (null if neither not found)
		 */
		getGlobalConfig: function(name) {
			if (typeof name === 'undefined') {
				return globalConfig;
			} else if (name in globalConfig) {
				return globalConfig[name];
			} else {
				return null;
			}
		},

		/**
		 * Sets the global configuration data
		 * @param {Object} config Global configuration object
		 * @returns {Box.Application} The application object.
		 */
		setGlobalConfig: function(config) {
			if (initialized) {
				error(new Error('Cannot set global configuration after application initialization'));
				return this;
			}

			assign(globalConfig, config);
			return this;
		},

		//----------------------------------------------------------------------
		// Error reporting
		//----------------------------------------------------------------------

		/**
		 * Signals that an error has occurred. If in development mode, an error
		 * is thrown. If in production mode, an event is fired.
		 * @param {Error} [exception] The exception object to use.
		 * @returns {void}
		 */
		reportError: error
	});

}());

	if (typeof define === 'function' && define.amd) {
		// AMD
		define('t3', [], function() {
			return Box;
		});
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS/npm, we want to export Box instead of assigning to global Window
		module.exports = Box;
	} else {
		// Make sure not to override Box namespace
		window.Box = window.Box || {};

		// Copy all properties onto namespace (ES3 safe for loop)
		for (var key in Box) {
			if (Box.hasOwnProperty(key)) {
				window.Box[key] = Box[key];
			}
		}
	}

// Potentially window is not defined yet, so bind to 'this' instead
}(typeof window !== 'undefined' ? window : this));
// End Wrapper

