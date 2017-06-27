/**
 * @preserve EventEmitter v1.1.0
 *
 * Copyright 2011, Oliver Caldwell (flowdev.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/EventEmitter
 */

// Initialise the class
function EventEmitter() {
	// Initialise the storage variables
	this._events = {};
	this._listeners = [];
	this._maxListeners = 10;
}

/**
 * Converts an event name to a RegExp pattern
 *
 * @param {String} name Name of the event
 *
 * @return {String} RegExp pattern
 */
EventEmitter.prototype._convertNameToRegExp = function(name) {
	return name.replace(/\./g, '\\.').replace(/\*\./g, '[\\w\\-]+\\.').replace(/\*$/gi, '.+');
};

/**
 * Adds a listener for a specified event
 *
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 * @param {Boolean} once If true, the listener will only be run once, use EventEmitter.once instead, this is mainly for internal use
 */
EventEmitter.prototype.addListener = function(name, listener, once) {
	// Grab the index of the listener
	var index = this._listeners.length;
	
	// Emit the newListener event
	this.emit('newListener', name, listener);
	
	// Add the listener
	this._listeners.push({
		listener: listener,
		once: (once) ? true : false
	});
	
	// Convert event name to RegExp
	name = this._convertNameToRegExp(name);
	
	// Add the event to the events object if required
	if(typeof this._events[name] === 'undefined') {
		this._events[name] = [];
	}
	
	// Add the listeners index to the event
	this._events[name].push(index);
	
	// Check if we have exceeded the max listeners
	if(this._events[name].length === this._maxListeners) {
		// We have, let the developer know
		console.log('Maximum number of listeners (' + this._maxListeners + ') reached for the "' + name + '" event!');
	}
};

/**
 * Adds a listener for a specified event (alias of EventEmitter.addListener)
 *
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 * @param {Boolean} once If true, the listener will only be run once, use EventEmitter.once instead, this is mainly for internal use
 */
EventEmitter.prototype.on = EventEmitter.prototype.addListener;

/**
 * Adds a listener for a specified event that will only be called once
 *
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 */
EventEmitter.prototype.once = function(name, listener) {
	this.addListener(name, listener, true);
};

/**
 * Removes a listener for a specified event
 *
 * @param {String} name Name of the event
 * @param {Function} listener Reference to the listener function
 */
EventEmitter.prototype.removeListener = function(name, listener) {
	// Initialise any required variables
	var i = null,
		indexes = null;
	
	// Convert event name to RegExp
	name = this._convertNameToRegExp(name);
	
	// Make sure the event exists
	if(this._events[name] instanceof Array) {
		// Grab the listeners indexes
		indexes = this._events[name];
		
		// Loop through all of the indexes
		for(i = 0; i < indexes.length; i++) {
			// Check if we have found the listener
			if(this._listeners[indexes[i]].listener === listener) {
				// It is, remove it and return
				indexes.splice(i, 1);
			}
		}
	}
};

/**
 * Removes all the listeners for a specified event
 *
 * @param {String} name Name of the event
 */
EventEmitter.prototype.removeAllListeners = function(name) {
	name = this._convertNameToRegExp(name);
	this._events[name] = [];
};


/**
 * Sets the max number of listeners before a message is displayed
 * If it is set to 0 then there is no limit
 *
 * @param {Number} n Max number of listeners before a message is displayed
 */
EventEmitter.prototype.setMaxListeners = function(n) {
	this._maxListeners = n;
};

/**
 * Returns an array of listeners for the specified event
 *
 * @param {String} name Name of the event
 * @param {Boolean} checkOnce Mainly for internal use, but if true, it will check if the once flag is set on the listener and remove it if it is
 * @returns {Array} An array of the assigned listeners
 */
EventEmitter.prototype.listeners = function(name, checkOnce) {
	// Initialise any required variables
	var eventRegExp = null,
		i = null,
		built = [],
		l = null;
	
	// Loop through each event RegExp
	for(eventRegExp in this._events) {
		// If the event RegExp matches the event name
		if(name.match(new RegExp('^'+eventRegExp+'$')) && this._events[eventRegExp] instanceof Array) {
			// Grab the listeners indexes
			indexes = this._events[eventRegExp];
			
			// Loop through all of the indexes
			for(i = 0; i < indexes.length; i++) {
				// Grab the listener
				l = this._listeners[indexes[i]];
				
				if(checkOnce) {
					if(l.once) {
						// Add it to the array
						built.push(l.listener);

						// Remove the reference
						this._events[eventRegExp].splice(i, 1);
					}
					else {
						// Add it to the array
						built.push(l.listener);
					}
				}
				else {
					// Add it to the array
					built.push(l.listener);
				}
			}
		}
	}
	
	// Return the found listeners
	return built;
};

/**
 * Emits the specified event with optional arguments
 *
 * @param {String} name Name of the event to be emitted
 * @param {Mixed} An argument to be passed to the listeners, you can have as many of these as you want
 */
EventEmitter.prototype.emit = function(name) {
	// Initialise any required variables
	var i = null,
		args = Array.prototype.slice.call(arguments),
		listeners = this.listeners(name, true);
	
	// Splice out the first argument
	args.splice(0, 1);
	
	// Loop through the listeners
	for(i = 0; i < listeners.length; i++) {
		// Call the function
		listeners[i].apply(null, args);
	}
};
