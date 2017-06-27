!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Fux=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _slice = Array.prototype.slice;
var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

"use strict";

var Dispatcher = _dereq_("flux").Dispatcher;
var EventEmitter = _dereq_("eventemitter3");
var Symbol = _dereq_("./polyfills/es6-symbol");
Object.assign = Object.assign || _dereq_("object-assign");

var now = Date.now();
var PrivateSymbol = function (desc) {
  return Symbol("" + now + "" + desc);
};

var ACTION_DISPATCHER = Symbol("action dispatcher storage");
var ACTION_HANDLER = Symbol("action creator handler");
var ACTION_KEY = Symbol("holds the actions uid symbol for listening");
var ACTION_UID = Symbol("the actions uid name");
var BOOTSTRAP_FLAG = PrivateSymbol("have you bootstrapped yet?");
var LISTENERS = Symbol("stores action listeners storage");
var STATE_CONTAINER = Symbol("" + now + " the state container");
var STORE_BOOTSTRAP = Symbol("event handler onBootstrap");
var STORE_SNAPSHOT = Symbol("event handler onTakeSnapshot");
var STORES_STORE = Symbol("stores storage");

var formatAsConstant = function (name) {
  return name.replace(/[a-z]([A-Z])/g, function (i) {
    return "" + i[0] + "_" + i[1].toLowerCase();
  }).toUpperCase();
};

var AltStore = (function (EventEmitter) {
  var AltStore = function AltStore(dispatcher, state) {
    var _this = this;
    this[STATE_CONTAINER] = state;
    if (state.onBootstrap) {
      this[STORE_BOOTSTRAP] = state.onBootstrap.bind(state);
    }
    if (state.onTakeSnapshot) {
      this[STORE_SNAPSHOT] = state.onTakeSnapshot.bind(state);
    }

    // Register dispatcher
    this.dispatchToken = dispatcher.register(function (payload) {
      if (state[LISTENERS][payload.action]) {
        var result = state[LISTENERS][payload.action](payload.data);
        result !== false && _this.emitChange();
      }
    });
  };

  _extends(AltStore, EventEmitter);

  AltStore.prototype.emitChange = function () {
    this.emit("change", this[STATE_CONTAINER]);
  };

  AltStore.prototype.listen = function (cb) {
    this.on("change", cb);
  };

  AltStore.prototype.unlisten = function (cb) {
    this.removeListener("change", cb);
  };

  AltStore.prototype.getState = function () {
    // Copy over state so it's RO.
    return Object.assign({}, this[STATE_CONTAINER]);
  };

  return AltStore;
})(EventEmitter);

var ActionCreator = (function () {
  var ActionCreator = function ActionCreator(dispatcher, name, action, actions) {
    this[ACTION_DISPATCHER] = dispatcher;
    this[ACTION_UID] = name;
    this[ACTION_HANDLER] = action.bind(this);
    this.actions = actions;
  };

  ActionCreator.prototype.dispatch = function (data) {
    this[ACTION_DISPATCHER].dispatch({
      action: this[ACTION_UID],
      data: data
    });
  };

  return ActionCreator;
})();

var StoreMixin = (function () {
  var StoreMixin = function StoreMixin(key, dispatcher) {
    this[LISTENERS] = {};
    this._storeName = key;
    this.dispatcher = dispatcher;
  };

  StoreMixin.prototype.bindAction = function (symbol, handler) {
    if (!symbol) {
      throw new ReferenceError("Invalid action reference passed in");
    }
    if (typeof handler !== "function") {
      throw new TypeError("bindAction expects a function");
    }

    if (handler.length > 1) {
      throw new TypeError("Action handler in store " + this._storeName + " for " + (symbol[ACTION_KEY] || symbol) + " was defined with 2 parameters. " + " Only a single parameter is passed" + " through the dispatcher, did you mean to pass in an Object instead?");
    }

    // You can pass in the constant or the function itself
    if (symbol[ACTION_KEY]) {
      this[LISTENERS][symbol[ACTION_KEY]] = handler.bind(this);
    } else {
      this[LISTENERS][symbol] = handler.bind(this);
    }
  };

  StoreMixin.prototype.bindActions = function (actions) {
    var _this2 = this;
    Object.keys(actions).forEach(function (action) {
      var symbol = actions[action];
      var matchFirstCharacter = /./;
      var assumedEventHandler = action.replace(matchFirstCharacter, function (x) {
        return "on" + x[0].toUpperCase();
      });
      var handler = null;

      // If you have both action and onAction
      if (_this2[action] && _this2[assumedEventHandler]) {
        throw new ReferenceError("You have multiple action handlers bound to an action: " + action + " and " + assumedEventHandler)
        // action
        ;
      } else if (_this2[action]) {
        handler = _this2[action]
        // onAction
        ;
      } else if (_this2[assumedEventHandler]) {
        handler = _this2[assumedEventHandler];
      }

      if (handler) {
        _this2.bindAction(symbol, handler);
      }
    });
  };

  StoreMixin.prototype.waitFor = function (tokens) {
    if (!tokens) {
      throw new ReferenceError("Dispatch tokens not provided");
    }
    tokens = Array.isArray(tokens) ? tokens : [tokens];
    this.dispatcher.waitFor(tokens);
  };

  return StoreMixin;
})();

var Alt = (function () {
  var Alt = function Alt() {
    this.dispatcher = new Dispatcher();
    this[STORES_STORE] = {};
    this[BOOTSTRAP_FLAG] = false;
  };

  Alt.prototype.createStore = function (StoreModel) {
    var key = StoreModel.displayName || StoreModel.name;
    // Creating a class here so we don't overload the store's prototype with
    // the mixin behaviour
    // and I'm extending from StoreModel so we can inherit any extensions
    // from the store.
    var Store = (function (StoreModel) {
      var Store = function Store() {
        StoreModel.call(this);
      };

      _extends(Store, StoreModel);

      return Store;
    })(StoreModel);

    Object.assign(Store.prototype, new StoreMixin(key, this.dispatcher), StoreMixin.prototype);
    var store = new Store();

    // Assign StoreModel so static methods are available
    return this[STORES_STORE][key] = Object.assign(new AltStore(this.dispatcher, store), StoreModel);
  };

  Alt.prototype.createActions = function (ActionsClass) {
    var _this3 = this;
    var actions = Object.assign({}, ActionsClass.prototype);
    ActionsClass.call({
      generateActions: function () {
        var actionNames = _slice.call(arguments);

        actionNames.forEach(function (actionName) {
          // This is a function so we can later bind this to ActionCreator
          actions[actionName] = function (x) {
            var a = _slice.call(arguments, 1);

            this.dispatch(a.length ? [x].concat(a) : x);
          };
        });
      }
    });

    return Object.keys(actions).reduce(function (obj, action) {
      var key = ActionsClass.displayName || ActionsClass.name;
      var constant = formatAsConstant(action);
      var actionName = Symbol("action " + key + ".prototype." + action);

      // Wrap the action so we can provide a dispatch method
      var newAction = new ActionCreator(_this3.dispatcher, actionName, actions[action], obj);

      // Set all the properties on action
      obj[action] = newAction[ACTION_HANDLER];
      obj[action].defer = function (x) {
        return setTimeout(function () {
          return newAction[ACTION_HANDLER](x);
        });
      };
      obj[action][ACTION_KEY] = actionName;
      obj[constant] = actionName;

      return obj;
    }, {});
  };

  Alt.prototype.takeSnapshot = function () {
    var _this4 = this;
    var state = JSON.stringify(Object.keys(this[STORES_STORE]).reduce(function (obj, key) {
      if (_this4[STORES_STORE][key][STORE_SNAPSHOT]) {
        _this4[STORES_STORE][key][STORE_SNAPSHOT]();
      }
      obj[key] = _this4[STORES_STORE][key].getState();
      return obj;
    }, {}));
    this._lastSnapshot = state;
    return state;
  };

  Alt.prototype.rollback = function () {
    this[BOOTSTRAP_FLAG] = false;
    this.bootstrap(this._lastSnapshot);
  };

  Alt.prototype.bootstrap = function (data) {
    var _this5 = this;
    if (this[BOOTSTRAP_FLAG]) {
      throw new ReferenceError("Stores have already been bootstrapped");
    }
    var obj = JSON.parse(data);
    Object.keys(obj).forEach(function (key) {
      Object.assign(_this5[STORES_STORE][key][STATE_CONTAINER], obj[key]);
      if (_this5[STORES_STORE][key][STORE_BOOTSTRAP]) {
        _this5[STORES_STORE][key][STORE_BOOTSTRAP]();
      }
    });
    this[BOOTSTRAP_FLAG] = true;
  };

  return Alt;
})();

module.exports = Alt;

},{"./polyfills/es6-symbol":7,"eventemitter3":2,"flux":3,"object-assign":6}],2:[function(_dereq_,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],3:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = _dereq_('./lib/Dispatcher')

},{"./lib/Dispatcher":4}],4:[function(_dereq_,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var invariant = _dereq_('./invariant');

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *
 *         case 'city-update':
 *           FlightPriceStore.price =
 *             FlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

  function Dispatcher() {
    this.$Dispatcher_callbacks = {};
    this.$Dispatcher_isPending = {};
    this.$Dispatcher_isHandled = {};
    this.$Dispatcher_isDispatching = false;
    this.$Dispatcher_pendingPayload = null;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
  Dispatcher.prototype.register=function(callback) {
    var id = _prefix + _lastID++;
    this.$Dispatcher_callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
  Dispatcher.prototype.unregister=function(id) {
    invariant(
      this.$Dispatcher_callbacks[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.$Dispatcher_callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
  Dispatcher.prototype.waitFor=function(ids) {
    invariant(
      this.$Dispatcher_isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this.$Dispatcher_isPending[id]) {
        invariant(
          this.$Dispatcher_isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.$Dispatcher_callbacks[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.$Dispatcher_invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
  Dispatcher.prototype.dispatch=function(payload) {
    invariant(
      !this.$Dispatcher_isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.$Dispatcher_startDispatching(payload);
    try {
      for (var id in this.$Dispatcher_callbacks) {
        if (this.$Dispatcher_isPending[id]) {
          continue;
        }
        this.$Dispatcher_invokeCallback(id);
      }
    } finally {
      this.$Dispatcher_stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
  Dispatcher.prototype.isDispatching=function() {
    return this.$Dispatcher_isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_invokeCallback=function(id) {
    this.$Dispatcher_isPending[id] = true;
    this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
    this.$Dispatcher_isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_startDispatching=function(payload) {
    for (var id in this.$Dispatcher_callbacks) {
      this.$Dispatcher_isPending[id] = false;
      this.$Dispatcher_isHandled[id] = false;
    }
    this.$Dispatcher_pendingPayload = payload;
    this.$Dispatcher_isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  Dispatcher.prototype.$Dispatcher_stopDispatching=function() {
    this.$Dispatcher_pendingPayload = null;
    this.$Dispatcher_isDispatching = false;
  };


module.exports = Dispatcher;

},{"./invariant":5}],5:[function(_dereq_,module,exports){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

},{}],6:[function(_dereq_,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],7:[function(_dereq_,module,exports){
"use strict";

/* istanbul ignore next */
(function () {
  "use strict";

  var created = Object.create(null);
  var generateName = function (desc) {
    var postfix = 0;
    while (created[desc + (postfix || "")]) {
      ++postfix;
    }
    desc += (postfix || "");
    created[desc] = true;
    return "@@" + desc;
  };

  var def = function (value) {
    return {
      value: value,
      configurable: false,
      writable: false,
      enumerable: false
    };
  };

  var Symbol = function (description) {
    if (this instanceof Symbol) {
      throw new TypeError("TypeError: Symbol is not a constructor");
    }

    var symbol = Object.create(Symbol.prototype);

    description = (description === undefined ? "" : String(description));

    return Object.defineProperties(symbol, {
      __description__: def(description),
      __name__: def(generateName(description))
    });
  };

  Object.defineProperties(Symbol, {
    create: def(Symbol("create")),
    hasInstance: def(Symbol("hasInstance")),
    isConcatSpreadable: def(Symbol("isConcatSpreadable")),
    isRegExp: def(Symbol("isRegExp")),
    iterator: def(Symbol("iterator")),
    toPrimitive: def(Symbol("toPrimitive")),
    toStringTag: def(Symbol("toStringTag")),
    unscopables: def(Symbol("unscopables"))
  });

  Object.defineProperties(Symbol.prototype, {
    properToString: def(function () {
      return "Symbol (" + this.__description__ + ")";
    }),
    toString: def(function () {
      return this.__name__;
    })
  });

  Object.defineProperty(Symbol.prototype, Symbol.toPrimitive, def(function (hint) {
    throw new TypeError("Conversion of symbol objects is not allowed");
  }));

  Object.defineProperty(Symbol.prototype, Symbol.toStringTag, {
    value: "Symbol",
    configurable: true,
    writable: false,
    enumerable: false
  });

  module.exports = Symbol;
}());

},{}]},{},[1])(1)
});
