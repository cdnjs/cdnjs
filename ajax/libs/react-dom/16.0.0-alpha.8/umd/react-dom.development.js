/**
 * react-dom.development.js v16.0.0-alpha.8
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactDOM = factory(global.React));
}(this, (function (React) { 'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reactProdInvariant
 * 
 */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

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

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? invariant_1(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? invariant_1(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant_1(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant_1(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? invariant_1(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  {
    var lowerCasedName = registrationName.toLowerCase();
    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {
  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in true.
   * @type {Object}
   */
  possibleRegistrationNames: {},
  // Trust the developer to only use possibleRegistrationNames in true

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (injectedEventPluginOrder) {
    !!eventPluginOrder ? invariant_1(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
        !!namesToPlugins[pluginName] ? invariant_1(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  }
};

var EventPluginRegistry_1 = EventPluginRegistry;

var caughtError = null;

var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    return error;
  }
  return null;
};

{
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    var depth = 0;

    invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
      depth++;
      var thisDepth = depth;
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      var boundFunc = function () {
        func.apply(context, funcArgs);
      };
      var fakeEventError = null;
      var onFakeEventError = function (event) {
        // Don't capture nested errors
        if (depth === thisDepth) {
          fakeEventError = event.error;
        }
      };
      var evtType = 'react-' + (name ? name : 'invokeguardedcallback') + '-' + depth;
      window.addEventListener('error', onFakeEventError);
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
      window.removeEventListener('error', onFakeEventError);
      depth--;
      return fakeEventError;
    };
  }
}

var rethrowCaughtError = function () {
  if (caughtError) {
    var error = caughtError;
    caughtError = null;
    throw error;
  }
};

var ReactErrorUtils = {
  injection: {
    injectErrorUtils: function (injectedErrorUtils) {
      invariant_1(typeof injectedErrorUtils.invokeGuardedCallback === 'function', 'Injected invokeGuardedCallback() must be a function.');
      invokeGuardedCallback = injectedErrorUtils.invokeGuardedCallback;
    }
  },

  /**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
    return invokeGuardedCallback.apply(this, arguments);
  },

  /**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
    var error = ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
    if (error !== null && caughtError === null) {
      caughtError = error;
    }
  },

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    return rethrowCaughtError.apply(this, arguments);
  }
};

var ReactErrorUtils_1 = ReactErrorUtils;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

var warning_1 = warning;

/**
 * Injected dependencies:
 */

/**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */
var ComponentTree;
var injection = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    {
      warning_1(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.');
    }
  }
};

function isEndish(topLevelType) {
  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
}

function isMoveish(topLevelType) {
  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
}
function isStartish(topLevelType) {
  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
}

var validateEventDispatches;
{
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    warning_1(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.');
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
  ReactErrorUtils_1.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? invariant_1(false, 'executeDirectDispatch(...): Invalid `event`.') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getFiberCurrentPropsFromNode: function (node) {
    return ComponentTree.getFiberCurrentPropsFromNode(node);
  },
  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },

  injection: injection
};

var EventPluginUtils_1 = EventPluginUtils;

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? invariant_1(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

var accumulateInto_1 = accumulateInto;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule forEachAccumulated
 * 
 */

/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */

function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

var forEachAccumulated_1 = forEachAccumulated;

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    EventPluginUtils_1.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {
  /**
   * Methods for injecting dependencies.
   */
  injection: {
    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry_1.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry_1.injectEventPluginsByName
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function (inst, registrationName) {
    var listener;

    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
    // live here; needs to be moved to a better place soon
    if (typeof inst.tag === 'number') {
      var stateNode = inst.stateNode;
      if (!stateNode) {
        // Work in progress (ex: onload events in incremental mode).
        return null;
      }
      var props = EventPluginUtils_1.getFiberCurrentPropsFromNode(stateNode);
      if (!props) {
        // Work in progress.
        return null;
      }
      listener = props[registrationName];
      if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
        return null;
      }
    } else {
      var currentElement = inst._currentElement;
      if (typeof currentElement === 'string' || typeof currentElement === 'number') {
        // Text node, let it bubble through.
        return null;
      }
      if (!inst._rootNodeID) {
        // If the instance is already unmounted, we have no listeners.
        return null;
      }
      var _props = currentElement.props;
      listener = _props[registrationName];
      if (shouldPreventMouseEvent(registrationName, currentElement.type, _props)) {
        return null;
      }
    }

    !(!listener || typeof listener === 'function') ? invariant_1(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : void 0;
    return listener;
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry_1.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto_1(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function (events) {
    if (events) {
      eventQueue = accumulateInto_1(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function (simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated_1(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated_1(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? invariant_1(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils_1.rethrowCaughtError();
  }
};

var EventPluginHub_1 = EventPluginHub;

function runEventQueueInBatch(events) {
  EventPluginHub_1.enqueueEvents(events);
  EventPluginHub_1.processEventQueue(false);
}

var ReactEventEmitterMixin = {
  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   */
  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub_1.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    runEventQueueInBatch(events);
  }
};

var ReactEventEmitterMixin_1 = ReactEventEmitterMixin;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

var ExecutionEnvironment_1 = ExecutionEnvironment;

/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

/**
 * A list of event names to a configurable list of vendor prefixes.
 */
var vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
  animationstart: makePrefixMap('Animation', 'AnimationStart'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
 * Event names that have already been detected and prefixed (if applicable).
 */
var prefixedEventNames = {};

/**
 * Element to check for prefixes on.
 */
var style = {};

/**
 * Bootstrap if a DOM exists.
 */
if (ExecutionEnvironment_1.canUseDOM) {
  style = document.createElement('div').style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are usable, and if not remove them from the map.
  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }

  // Same as above
  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  } else if (!vendorPrefixes[eventName]) {
    return eventName;
  }

  var prefixMap = vendorPrefixes[eventName];

  for (var styleProp in prefixMap) {
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
      return prefixedEventNames[eventName] = prefixMap[styleProp];
    }
  }

  return '';
}

var getVendorPrefixedEventName_1 = getVendorPrefixedEventName;

var useHasFeature;
if (ExecutionEnvironment_1.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment_1.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var isEventSupported_1 = isEventSupported;

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var alreadyListeningTo = {};
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName_1('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName_1('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName_1('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCancel: 'cancel',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topClose: 'close',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topToggle: 'toggle',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName_1('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

var ReactBrowserEventEmitter = index({}, ReactEventEmitterMixin_1, {
  /**
   * Injectable event backend
   */
  ReactEventListener: null,

  injection: {
    /**
     * @param {object} ReactEventListener
     */
    injectReactEventListener: function (ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function (enabled) {
    if (ReactBrowserEventEmitter.ReactEventListener) {
      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function () {
    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */
  listenTo: function (registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry_1.registrationNameDependencies[registrationName];

    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === 'topWheel') {
          if (isEventSupported_1('wheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
          } else if (isEventSupported_1('mousewheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === 'topScroll') {
          ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
        } else if (dependency === 'topFocus' || dependency === 'topBlur') {
          ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
          ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);

          // to make sure blur and focus event listeners are only attached once
          isListening.topBlur = true;
          isListening.topFocus = true;
        } else if (dependency === 'topCancel') {
          if (isEventSupported_1('cancel', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topCancel', 'cancel', mountAt);
          }
          isListening.topCancel = true;
        } else if (dependency === 'topClose') {
          if (isEventSupported_1('close', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topClose', 'close', mountAt);
          }
          isListening.topClose = true;
        } else if (topEventMapping.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  isListeningToAllDependencies: function (registrationName, mountAt) {
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry_1.registrationNameDependencies[registrationName];
    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        return false;
      }
    }
    return true;
  },

  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  }
});

var ReactBrowserEventEmitter_1 = ReactBrowserEventEmitter;

// Use to restore controlled state after a change event has fired.

var fiberHostComponent = null;

var ReactControlledComponentInjection = {
  injectFiberControlledHostComponent: function (hostComponentImpl) {
    // The fiber implementation doesn't use dynamic dispatch so we need to
    // inject the implementation.
    fiberHostComponent = hostComponentImpl;
  }
};

var restoreTarget = null;
var restoreQueue = null;

function restoreStateOfTarget(target) {
  // We perform this translation at the end of the event loop so that we
  // always receive the correct fiber here
  var internalInstance = EventPluginUtils_1.getInstanceFromNode(target);
  if (!internalInstance) {
    // Unmounted
    return;
  }
  if (typeof internalInstance.tag === 'number') {
    invariant_1(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function', 'Fiber needs to be injected to handle a fiber target for controlled ' + 'events.');
    var props = EventPluginUtils_1.getFiberCurrentPropsFromNode(internalInstance.stateNode);
    fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
    return;
  }
  invariant_1(typeof internalInstance.restoreControlledState === 'function', 'The internal instance must be a React host component.');
  // If it is not a Fiber, we can just use dynamic dispatch.
  internalInstance.restoreControlledState();
}

var ReactControlledComponent = {
  injection: ReactControlledComponentInjection,

  enqueueStateRestore: function (target) {
    if (restoreTarget) {
      if (restoreQueue) {
        restoreQueue.push(target);
      } else {
        restoreQueue = [target];
      }
    } else {
      restoreTarget = target;
    }
  },
  restoreStateIfNeeded: function () {
    if (!restoreTarget) {
      return;
    }
    var target = restoreTarget;
    var queuedTargets = restoreQueue;
    restoreTarget = null;
    restoreQueue = null;

    restoreStateOfTarget(target);
    if (queuedTargets) {
      for (var i = 0; i < queuedTargets.length; i++) {
        restoreStateOfTarget(queuedTargets[i]);
      }
    }
  }
};

var ReactControlledComponent_1 = ReactControlledComponent;

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? invariant_1(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.', propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant_1(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s', propName) : void 0;

      {
        DOMProperty.getPossibleStandardName[lowerCased] = propName;
      }

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
        {
          DOMProperty.getPossibleStandardName[attributeName] = propName;
        }
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
/* eslint-enable max-len */

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {
  ID_ATTRIBUTE_NAME: 'data-reactid',
  ROOT_ATTRIBUTE_NAME: 'data-reactroot',

  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties. Available only in true.
   *
   * autofocus is predefined, because adding it to the property whitelist
   * causes unintended side effects.
   *
   * @type {Object}
   */
  getPossibleStandardName: { autofocus: 'autoFocus' },

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function (attributeName) {
    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  injection: DOMPropertyInjection
};

var DOMProperty_1 = DOMProperty;

/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMComponentFlags
 */

var ReactDOMComponentFlags = {
  hasCachedChildNodes: 1 << 0
};

var ReactDOMComponentFlags_1 = ReactDOMComponentFlags;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactTypeOfWork
 * 
 */

var ReactTypeOfWork = {
  IndeterminateComponent: 0, // Before we know whether it is functional or class
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10
};

var HostComponent = ReactTypeOfWork.HostComponent;
var HostText = ReactTypeOfWork.HostText;



var ATTR_NAME = DOMProperty_1.ID_ATTRIBUTE_NAME;
var Flags = ReactDOMComponentFlags_1;

var randomKey = Math.random().toString(36).slice(2);

var internalInstanceKey = '__reactInternalInstance$' + randomKey;

var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

/**
 * Check if a given node should be cached.
 */
function shouldPrecacheNode(node, nodeID) {
  return node.nodeType === 1 && node.getAttribute(ATTR_NAME) === '' + nodeID || node.nodeType === 8 && node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 && node.nodeValue === ' react-empty: ' + nodeID + ' ';
}

/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}

/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */
function precacheNode(inst, node) {
  var hostInst = getRenderedHostOrTextFromComponent(inst);
  hostInst._hostNode = node;
  node[internalInstanceKey] = hostInst;
}

function precacheFiberNode$1(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

function uncacheNode(inst) {
  var node = inst._hostNode;
  if (node) {
    delete node[internalInstanceKey];
    inst._hostNode = null;
  }
}

/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target
 * node every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 */
function precacheChildNodes(inst, node) {
  if (inst._flags & Flags.hasCachedChildNodes) {
    return;
  }
  var children = inst._renderedChildren;
  var childNode = node.firstChild;
  outer: for (var name in children) {
    if (!children.hasOwnProperty(name)) {
      continue;
    }
    var childInst = children[name];
    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
    if (childID === 0) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }
    // We assume the child nodes are in the same order as the child instances.
    for (; childNode !== null; childNode = childNode.nextSibling) {
      if (shouldPrecacheNode(childNode, childID)) {
        precacheNode(childInst, childNode);
        continue outer;
      }
    }
    // We reached the end of the DOM children without finding an ID match.
    invariant_1(false, 'Unable to find element with ID %s.', childID);
  }
  inst._flags |= Flags.hasCachedChildNodes;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest;
  var inst = node[internalInstanceKey];
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber, this will always be the deepest root.
    return inst;
  }
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
    if (parents.length) {
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
  var inst = node[internalInstanceKey];
  if (inst) {
    if (inst.tag === HostComponent || inst.tag === HostText) {
      return inst;
    } else if (inst._hostNode === node) {
      return inst;
    } else {
      return null;
    }
  }
  inst = getClosestInstanceFromNode(node);
  if (inst != null && inst._hostNode === node) {
    return inst;
  } else {
    return null;
  }
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber this, is just the state node right now. We assume it will be
    // a host component or host text.
    return inst.stateNode;
  }

  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  !(inst._hostNode !== undefined) ? invariant_1(false, 'getNodeFromInstance: Invalid argument.') : void 0;

  if (inst._hostNode) {
    return inst._hostNode;
  }

  // Walk up the tree until we find an ancestor whose DOM node we have cached.
  var parents = [];
  while (!inst._hostNode) {
    parents.push(inst);
    !inst._hostParent ? invariant_1(false, 'React DOM tree root should always have a node reference.') : void 0;
    inst = inst._hostParent;
  }

  // Now parents contains each ancestor that does *not* have a cached native
  // node, and `inst` is the deepest ancestor that does.
  for (; parents.length; inst = parents.pop()) {
    precacheChildNodes(inst, inst._hostNode);
  }

  return inst._hostNode;
}

function getFiberCurrentPropsFromNode(node) {
  return node[internalEventHandlersKey] || null;
}

function updateFiberProps$1(node, props) {
  node[internalEventHandlersKey] = props;
}

var ReactDOMComponentTree = {
  getClosestInstanceFromNode: getClosestInstanceFromNode,
  getInstanceFromNode: getInstanceFromNode,
  getNodeFromInstance: getNodeFromInstance,
  precacheChildNodes: precacheChildNodes,
  precacheNode: precacheNode,
  uncacheNode: uncacheNode,
  precacheFiberNode: precacheFiberNode$1,
  getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode,
  updateFiberProps: updateFiberProps$1
};

var ReactDOMComponentTree_1 = ReactDOMComponentTree;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactFeatureFlags
 * 
 */

var ReactFeatureFlags = {
  // When true, call console.time() before and .timeEnd() after each top-level
  // render (both initial renders and updates). Useful when looking at prod-mode
  // timeline profiles in Chrome, for example.
  logTopLevelRenders: false,
  prepareNewChildrenBeforeUnmountInStack: true,
  disableNewFiberFeatures: false
};

var ReactFeatureFlags_1 = ReactFeatureFlags;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFeatureFlags
 */

var ReactDOMFeatureFlags = {
  fiberAsyncScheduling: false,
  useCreateElement: true,
  useFiber: true
};

var ReactDOMFeatureFlags_1 = ReactDOMFeatureFlags;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

var CSSProperty_1 = CSSProperty;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

var camelize_1 = camelize;

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize_1(string.replace(msPattern, 'ms-'));
}

var camelizeStyleName_1 = camelizeStyleName;

var isUnitlessNumber$1 = CSSProperty_1.isUnitlessNumber;

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (typeof value === 'number' && value !== 0 && !(isUnitlessNumber$1.hasOwnProperty(name) && isUnitlessNumber$1[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var dangerousStyleValue_1 = dangerousStyleValue;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate;

var msPattern$1 = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate_1(string).replace(msPattern$1, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

var memoizeStringOnly_1 = memoizeStringOnly;

var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
var ClassComponent = ReactTypeOfWork.ClassComponent;
var HostComponent$1 = ReactTypeOfWork.HostComponent;



function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent$1:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName_1(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName_1(owner);
      }
      return describeComponentFrame(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

var ReactFiberComponentTreeHook = {
  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1,
  describeComponentFrame: describeComponentFrame
};

{
  var getComponentName$1 = getComponentName_1;

  var _require$1 = ReactFiberComponentTreeHook,
      getStackAddendumByWorkInProgressFiber = _require$1.getStackAddendumByWorkInProgressFiber;
}

function getCurrentFiberOwnerName$2() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    if (fiber._debugOwner != null) {
      return getComponentName$1(fiber._debugOwner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

var ReactDebugCurrentFiber = {
  current: null,
  phase: null,

  getCurrentFiberOwnerName: getCurrentFiberOwnerName$2,
  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
};

var ReactDebugCurrentFiber_1 = ReactDebugCurrentFiber;

{
  var _require = ReactDebugCurrentFiber_1,
      getCurrentFiberOwnerName$1 = _require.getCurrentFiberOwnerName;
}

var processStyleName = memoizeStringOnly_1(function (styleName) {
  return hyphenateStyleName_1(styleName);
});

var hasShorthandPropertyBug = false;
if (ExecutionEnvironment_1.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
}

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;

  var warnHyphenatedStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning_1(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName_1(name), checkRenderMessage(owner));
  };

  var warnBadVendoredStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning_1(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner));
  };

  var warnStyleValueWithSemicolon = function (name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    warning_1(false, "Style property values shouldn't contain a semicolon.%s " + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, ''));
  };

  var warnStyleValueIsNaN = function (name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    warning_1(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner));
  };

  var checkRenderMessage = function (owner) {
    var ownerName;
    if (owner != null) {
      // Stack passes the owner manually all the way to CSSPropertyOperations.
      ownerName = getComponentName_1(owner);
    } else {
      // Fiber doesn't pass it but uses ReactDebugCurrentFiber to track it.
      // It is only enabled in development and tracks host components too.
      ownerName = getCurrentFiberOwnerName$1();
      // TODO: also report the stack.
    }
    if (ownerName) {
      return '\n\nCheck the render method of `' + ownerName + '`.';
    }
    return '';
  };

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function (name, value, component) {
    var owner;
    if (component) {
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner);
    }
  };
}

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {
  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */
  createMarkupForStyles: function (styles, component) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      {
        warnValidStyle(styleName, styleValue, component);
      }
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue_1(styleName, styleValue, component) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
  setValueForStyles: function (node, styles, component) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      {
        warnValidStyle(styleName, styles[styleName], component);
      }
      var styleValue = dangerousStyleValue_1(styleName, styles[styleName], component);
      if (styleName === 'float') {
        styleName = 'cssFloat';
      }
      if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty_1.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }
};

var CSSPropertyOperations_1 = CSSPropertyOperations;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMNamespaces
 */

var DOMNamespaces = {
  html: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg'
};

var DOMNamespaces_1 = DOMNamespaces;

var ReactInvalidSetStateWarningHook = {};

{
  var processingChildContext = false;

  var warnInvalidSetState = function () {
    warning_1(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()');
  };

  ReactInvalidSetStateWarningHook = {
    onBeginProcessingChildContext: function () {
      processingChildContext = true;
    },
    onEndProcessingChildContext: function () {
      processingChildContext = false;
    },
    onSetState: function () {
      warnInvalidSetState();
    }
  };
}

var ReactInvalidSetStateWarningHook_1 = ReactInvalidSetStateWarningHook;

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactHostOperationHistoryHook
 * 
 */

// Trust the developer to only use this with a true check
var ReactHostOperationHistoryHook = null;

{
  var history = [];

  ReactHostOperationHistoryHook = {
    onHostOperation: function (operation) {
      history.push(operation);
    },
    clearHistory: function () {
      if (ReactHostOperationHistoryHook._preventClearing) {
        // Should only be used for tests.
        return;
      }

      history = [];
    },
    getHistory: function () {
      return history;
    }
  };
}

var ReactHostOperationHistoryHook_1 = ReactHostOperationHistoryHook;

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactComponentTreeHookRollupShim = ReactInternals.ReactComponentTreeHook;

var performance$1;

if (ExecutionEnvironment_1.canUseDOM) {
  performance$1 = window.performance || window.msPerformance || window.webkitPerformance;
}

var performance_1 = performance$1 || {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance_1.now) {
  performanceNow = function performanceNow() {
    return performance_1.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

var performanceNow_1 = performanceNow;

// Trust the developer to only use this with a true check
var ReactDebugTool$1 = null;

{
  var hooks = [];
  var didHookThrowForEvent = {};

  var callHook = function (event, fn, context, arg1, arg2, arg3, arg4, arg5) {
    try {
      fn.call(context, arg1, arg2, arg3, arg4, arg5);
    } catch (e) {
      warning_1(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack);
      didHookThrowForEvent[event] = true;
    }
  };

  var emitEvent = function (event, arg1, arg2, arg3, arg4, arg5) {
    for (var i = 0; i < hooks.length; i++) {
      var hook = hooks[i];
      var fn = hook[event];
      if (fn) {
        callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
      }
    }
  };

  var isProfiling = false;
  var flushHistory = [];
  var lifeCycleTimerStack = [];
  var currentFlushNesting = 0;
  var currentFlushMeasurements = [];
  var currentFlushStartTime = 0;
  var currentTimerDebugID = null;
  var currentTimerStartTime = 0;
  var currentTimerNestedFlushDuration = 0;
  var currentTimerType = null;

  var lifeCycleTimerHasWarned = false;

  var clearHistory = function () {
    ReactComponentTreeHookRollupShim.purgeUnmountedComponents();
    ReactHostOperationHistoryHook_1.clearHistory();
  };

  var getTreeSnapshot = function (registeredIDs) {
    return registeredIDs.reduce(function (tree, id) {
      var ownerID = ReactComponentTreeHookRollupShim.getOwnerID(id);
      var parentID = ReactComponentTreeHookRollupShim.getParentID(id);
      tree[id] = {
        displayName: ReactComponentTreeHookRollupShim.getDisplayName(id),
        text: ReactComponentTreeHookRollupShim.getText(id),
        updateCount: ReactComponentTreeHookRollupShim.getUpdateCount(id),
        childIDs: ReactComponentTreeHookRollupShim.getChildIDs(id),
        // Text nodes don't have owners but this is close enough.
        ownerID: ownerID || parentID && ReactComponentTreeHookRollupShim.getOwnerID(parentID) || 0,
        parentID: parentID
      };
      return tree;
    }, {});
  };

  var resetMeasurements = function () {
    var previousStartTime = currentFlushStartTime;
    var previousMeasurements = currentFlushMeasurements;
    var previousOperations = ReactHostOperationHistoryHook_1.getHistory();

    if (currentFlushNesting === 0) {
      currentFlushStartTime = 0;
      currentFlushMeasurements = [];
      clearHistory();
      return;
    }

    if (previousMeasurements.length || previousOperations.length) {
      var registeredIDs = ReactComponentTreeHookRollupShim.getRegisteredIDs();
      flushHistory.push({
        duration: performanceNow_1() - previousStartTime,
        measurements: previousMeasurements || [],
        operations: previousOperations || [],
        treeSnapshot: getTreeSnapshot(registeredIDs)
      });
    }

    clearHistory();
    currentFlushStartTime = performanceNow_1();
    currentFlushMeasurements = [];
  };

  var checkDebugID = function (debugID) {
    var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (allowRoot && debugID === 0) {
      return;
    }
    if (!debugID) {
      warning_1(false, 'ReactDebugTool: debugID may not be empty.');
    }
  };

  var beginLifeCycleTimer = function (debugID, timerType) {
    if (currentFlushNesting === 0) {
      return;
    }
    if (currentTimerType && !lifeCycleTimerHasWarned) {
      warning_1(false, 'There is an internal error in the React performance measurement code.' + '\n\nDid not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another');
      lifeCycleTimerHasWarned = true;
    }
    currentTimerStartTime = performanceNow_1();
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = debugID;
    currentTimerType = timerType;
  };

  var endLifeCycleTimer = function (debugID, timerType) {
    if (currentFlushNesting === 0) {
      return;
    }
    if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
      warning_1(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another');
      lifeCycleTimerHasWarned = true;
    }
    if (isProfiling) {
      currentFlushMeasurements.push({
        timerType: timerType,
        instanceID: debugID,
        duration: performanceNow_1() - currentTimerStartTime - currentTimerNestedFlushDuration
      });
    }
    currentTimerStartTime = 0;
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = null;
    currentTimerType = null;
  };

  var pauseCurrentLifeCycleTimer = function () {
    var currentTimer = {
      startTime: currentTimerStartTime,
      nestedFlushStartTime: performanceNow_1(),
      debugID: currentTimerDebugID,
      timerType: currentTimerType
    };
    lifeCycleTimerStack.push(currentTimer);
    currentTimerStartTime = 0;
    currentTimerNestedFlushDuration = 0;
    currentTimerDebugID = null;
    currentTimerType = null;
  };

  var resumeCurrentLifeCycleTimer = function () {
    var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
        startTime = _lifeCycleTimerStack$.startTime,
        nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
        debugID = _lifeCycleTimerStack$.debugID,
        timerType = _lifeCycleTimerStack$.timerType;

    var nestedFlushDuration = performanceNow_1() - nestedFlushStartTime;
    currentTimerStartTime = startTime;
    currentTimerNestedFlushDuration += nestedFlushDuration;
    currentTimerDebugID = debugID;
    currentTimerType = timerType;
  };

  var lastMarkTimeStamp = 0;
  var canUsePerformanceMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  var shouldMark = function (debugID) {
    if (!isProfiling || !canUsePerformanceMeasure) {
      return false;
    }
    var element = ReactComponentTreeHookRollupShim.getElement(debugID);
    if (element == null || typeof element !== 'object') {
      return false;
    }
    var isHostElement = typeof element.type === 'string';
    if (isHostElement) {
      return false;
    }
    return true;
  };

  var markBegin = function (debugID, markType) {
    if (!shouldMark(debugID)) {
      return;
    }

    var markName = debugID + '::' + markType;
    lastMarkTimeStamp = performanceNow_1();
    performance.mark(markName);
  };

  var markEnd = function (debugID, markType) {
    if (!shouldMark(debugID)) {
      return;
    }

    var markName = debugID + '::' + markType;
    var displayName = ReactComponentTreeHookRollupShim.getDisplayName(debugID) || 'Unknown';

    // Chrome has an issue of dropping markers recorded too fast:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=640652
    // To work around this, we will not report very small measurements.
    // I determined the magic number by tweaking it back and forth.
    // 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
    // When the bug is fixed, we can `measure()` unconditionally if we want to.
    var timeStamp = performanceNow_1();
    if (timeStamp - lastMarkTimeStamp > 0.1) {
      var measurementName = displayName + ' [' + markType + ']';
      performance.measure(measurementName, markName);
    }

    performance.clearMarks(markName);
    performance.clearMeasures(measurementName);
  };

  ReactDebugTool$1 = {
    addHook: function (hook) {
      hooks.push(hook);
    },
    removeHook: function (hook) {
      for (var i = 0; i < hooks.length; i++) {
        if (hooks[i] === hook) {
          hooks.splice(i, 1);
          i--;
        }
      }
    },
    isProfiling: function () {
      return isProfiling;
    },
    beginProfiling: function () {
      if (isProfiling) {
        return;
      }

      isProfiling = true;
      flushHistory.length = 0;
      resetMeasurements();
      ReactDebugTool$1.addHook(ReactHostOperationHistoryHook_1);
    },
    endProfiling: function () {
      if (!isProfiling) {
        return;
      }

      isProfiling = false;
      resetMeasurements();
      ReactDebugTool$1.removeHook(ReactHostOperationHistoryHook_1);
    },
    getFlushHistory: function () {
      return flushHistory;
    },
    onBeginFlush: function () {
      currentFlushNesting++;
      resetMeasurements();
      pauseCurrentLifeCycleTimer();
      emitEvent('onBeginFlush');
    },
    onEndFlush: function () {
      resetMeasurements();
      currentFlushNesting--;
      resumeCurrentLifeCycleTimer();
      emitEvent('onEndFlush');
    },
    onBeginLifeCycleTimer: function (debugID, timerType) {
      checkDebugID(debugID);
      emitEvent('onBeginLifeCycleTimer', debugID, timerType);
      markBegin(debugID, timerType);
      beginLifeCycleTimer(debugID, timerType);
    },
    onEndLifeCycleTimer: function (debugID, timerType) {
      checkDebugID(debugID);
      endLifeCycleTimer(debugID, timerType);
      markEnd(debugID, timerType);
      emitEvent('onEndLifeCycleTimer', debugID, timerType);
    },
    onBeginProcessingChildContext: function () {
      emitEvent('onBeginProcessingChildContext');
    },
    onEndProcessingChildContext: function () {
      emitEvent('onEndProcessingChildContext');
    },
    onHostOperation: function (operation) {
      checkDebugID(operation.instanceID);
      emitEvent('onHostOperation', operation);
    },
    onSetState: function () {
      emitEvent('onSetState');
    },
    onSetChildren: function (debugID, childDebugIDs) {
      checkDebugID(debugID);
      childDebugIDs.forEach(checkDebugID);
      emitEvent('onSetChildren', debugID, childDebugIDs);
    },
    onBeforeMountComponent: function (debugID, element, parentDebugID) {
      checkDebugID(debugID);
      checkDebugID(parentDebugID, true);
      emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
      markBegin(debugID, 'mount');
    },
    onMountComponent: function (debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'mount');
      emitEvent('onMountComponent', debugID);
    },
    onBeforeUpdateComponent: function (debugID, element) {
      checkDebugID(debugID);
      emitEvent('onBeforeUpdateComponent', debugID, element);
      markBegin(debugID, 'update');
    },
    onUpdateComponent: function (debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'update');
      emitEvent('onUpdateComponent', debugID);
    },
    onBeforeUnmountComponent: function (debugID) {
      checkDebugID(debugID);
      emitEvent('onBeforeUnmountComponent', debugID);
      markBegin(debugID, 'unmount');
    },
    onUnmountComponent: function (debugID) {
      checkDebugID(debugID);
      markEnd(debugID, 'unmount');
      emitEvent('onUnmountComponent', debugID);
    },
    onTestEvent: function () {
      emitEvent('onTestEvent');
    }
  };

  ReactDebugTool$1.addHook(ReactInvalidSetStateWarningHook_1);
  ReactDebugTool$1.addHook(ReactComponentTreeHookRollupShim);
  var url = ExecutionEnvironment_1.canUseDOM && window.location.href || '';
  if (/[?&]react_perf\b/.test(url)) {
    ReactDebugTool$1.beginProfiling();
  }
}

var ReactDebugTool_1 = ReactDebugTool$1;

// Trust the developer to only use ReactInstrumentation with a true check

var debugTool = null;

{
  var ReactDebugTool = ReactDebugTool_1;
  debugTool = ReactDebugTool;
}

var ReactInstrumentation = { debugTool: debugTool };

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule escapeTextContentForBrowser
 */

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

var escapeTextContentForBrowser_1 = escapeTextContentForBrowser;

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser_1(value) + '"';
}

var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser;

var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty_1.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};

function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  warning_1(false, 'Invalid attribute name: `%s`', attributeName);
  return false;
}

function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations = {
  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function (id) {
    return DOMProperty_1.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser_1(id);
  },

  setAttributeForID: function (node, id) {
    node.setAttribute(DOMProperty_1.ID_ATTRIBUTE_NAME, id);
  },

  createMarkupForRoot: function () {
    return DOMProperty_1.ROOT_ATTRIBUTE_NAME + '=""';
  },

  setAttributeForRoot: function (node) {
    node.setAttribute(DOMProperty_1.ROOT_ATTRIBUTE_NAME, '');
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function (name, value) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      if (shouldIgnoreValue(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      }
      return attributeName + '=' + quoteAttributeValueForBrowser_1(value);
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser_1(value);
    }
    return null;
  },

  /**
   * Creates markup for a custom property.
   *
   * @param {string} name
   * @param {*} value
   * @return {string} Markup string, or empty string if the property was invalid.
   */
  createMarkupForCustomAttribute: function (name, value) {
    if (!isAttributeNameSafe(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser_1(value);
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function (node, name, value) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(propertyInfo, value)) {
        DOMPropertyOperations.deleteValueForProperty(node, name);
        return;
      } else if (propertyInfo.mustUseProperty) {
        // Contrary to `setAttribute`, object properties are properly
        // `toString`ed by IE8/9.
        node[propertyInfo.propertyName] = value;
      } else {
        var attributeName = propertyInfo.attributeName;
        var namespace = propertyInfo.attributeNamespace;
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        if (namespace) {
          node.setAttributeNS(namespace, attributeName, '' + value);
        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
          node.setAttribute(attributeName, '');
        } else {
          node.setAttribute(attributeName, '' + value);
        }
      }
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      DOMPropertyOperations.setValueForAttribute(node, name, value);
      return;
    }

    {
      var payload = {};
      payload[name] = value;
      ReactInstrumentation.debugTool.onHostOperation({
        instanceID: ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,
        type: 'update attribute',
        payload: payload
      });
    }
  },

  setValueForAttribute: function (node, name, value) {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (value == null) {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, '' + value);
    }

    {
      var payload = {};
      payload[name] = value;
      ReactInstrumentation.debugTool.onHostOperation({
        instanceID: ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,
        type: 'update attribute',
        payload: payload
      });
    }
  },

  /**
   * Deletes an attributes from a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForAttribute: function (node, name) {
    node.removeAttribute(name);
    {
      ReactInstrumentation.debugTool.onHostOperation({
        instanceID: ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,
        type: 'remove attribute',
        payload: name
      });
    }
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function (node, name) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (propertyInfo.mustUseProperty) {
        var propName = propertyInfo.propertyName;
        if (propertyInfo.hasBooleanValue) {
          node[propName] = false;
        } else {
          node[propName] = '';
        }
      } else {
        node.removeAttribute(propertyInfo.attributeName);
      }
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      node.removeAttribute(name);
    }

    {
      ReactInstrumentation.debugTool.onHostOperation({
        instanceID: ReactDOMComponentTree_1.getInstanceFromNode(node)._debugID,
        type: 'remove attribute',
        payload: name
      });
    }
  }
};

var DOMPropertyOperations_1 = DOMPropertyOperations;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @providesModule ReactPropTypesSecret
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var hasReadOnlyValue = {
  button: true,
  checkbox: true,
  image: true,
  hidden: true,
  radio: true,
  reset: true,
  submit: true
};

var propTypes = {
  value: function (props, propName, componentName) {
    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  checked: function (props, propName, componentName) {
    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  onChange: React.PropTypes.func
};

var loggedTypeFailures = {};
function getDeclarationErrorAddendum$1(ownerName) {
  if (ownerName) {
    return '\n\nCheck the render method of `' + ownerName + '`.';
  }
  return '';
}

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var ReactControlledValuePropTypes = {
  checkPropTypes: function (tagName, props, ownerName) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error = propTypes[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret_1);
      }
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var addendum = getDeclarationErrorAddendum$1(ownerName);
        warning_1(false, 'Failed form propType: %s%s', error.message, addendum);
      }
    }
  }
};

var ReactControlledValuePropTypes_1 = ReactControlledValuePropTypes;

var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;




var didWarnValueDefaultValue = false;
var didWarnCheckedDefaultChecked = false;
var didWarnControlledToUncontrolled = false;
var didWarnUncontrolledToControlled = false;

function isControlled(props) {
  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
  return usesChecked ? props.checked != null : props.value != null;
}

/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = {
  getHostProps: function (element, props) {
    var node = element;
    var value = props.value;
    var checked = props.checked;

    var hostProps = index({
      // Make sure we set .type before any other properties (setting .value
      // before .type means .value is lost in IE11 and below)
      type: undefined,
      // Make sure we set .step before .value (setting .value before .step
      // means .value is rounded on mount, based upon step precision)
      step: undefined,
      // Make sure we set .min & .max before .value (to ensure proper order
      // in corner cases such as min or max deriving from value, e.g. Issue #7170)
      min: undefined,
      max: undefined
    }, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : node._wrapperState.initialValue,
      checked: checked != null ? checked : node._wrapperState.initialChecked
    });

    return hostProps;
  },

  mountWrapper: function (element, props) {
    {
      ReactControlledValuePropTypes_1.checkPropTypes('input', props, getCurrentFiberOwnerName$3());

      if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
        warning_1(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$3() || 'A component', props.type);
        didWarnCheckedDefaultChecked = true;
      }
      if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
        warning_1(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$3() || 'A component', props.type);
        didWarnValueDefaultValue = true;
      }
    }

    var defaultValue = props.defaultValue;
    var node = element;
    node._wrapperState = {
      initialChecked: props.checked != null ? props.checked : props.defaultChecked,
      initialValue: props.value != null ? props.value : defaultValue,
      controlled: isControlled(props)
    };
  },

  updateWrapper: function (element, props) {
    var node = element;
    {
      var controlled = isControlled(props);

      if (!node._wrapperState.controlled && controlled && !didWarnUncontrolledToControlled) {
        warning_1(false, '%s is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', getCurrentFiberOwnerName$3() || 'A component', props.type);
        didWarnUncontrolledToControlled = true;
      }
      if (node._wrapperState.controlled && !controlled && !didWarnControlledToUncontrolled) {
        warning_1(false, '%s is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', getCurrentFiberOwnerName$3() || 'A component', props.type);
        didWarnControlledToUncontrolled = true;
      }
    }

    var checked = props.checked;
    if (checked != null) {
      DOMPropertyOperations_1.setValueForProperty(node, 'checked', checked || false);
    }

    var value = props.value;
    if (value != null) {
      if (value === 0 && node.value === '') {
        node.value = '0';
        // Note: IE9 reports a number inputs as 'text', so check props instead.
      } else if (props.type === 'number') {
        // Simulate `input.valueAsNumber`. IE9 does not support it
        var valueAsNumber = parseFloat(node.value, 10) || 0;

        // eslint-disable-next-line
        if (value != valueAsNumber) {
          // Cast `value` to a string to ensure the value is set correctly. While
          // browsers typically do this as necessary, jsdom doesn't.
          node.value = '' + value;
        }
        // eslint-disable-next-line
      } else if (value != node.value) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        node.value = '' + value;
      }
    } else {
      if (props.value == null && props.defaultValue != null) {
        // In Chrome, assigning defaultValue to certain input types triggers input validation.
        // For number inputs, the display value loses trailing decimal points. For email inputs,
        // Chrome raises "The specified value <x> is not a valid email address".
        //
        // Here we check to see if the defaultValue has actually changed, avoiding these problems
        // when the user is inputting text
        //
        // https://github.com/facebook/react/issues/7253
        if (node.defaultValue !== '' + props.defaultValue) {
          node.defaultValue = '' + props.defaultValue;
        }
      }
      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }
  },

  postMountWrapper: function (element, props) {
    var node = element;

    // Detach value from defaultValue. We won't do anything if we're working on
    // submit or reset inputs as those values & defaultValues are linked. They
    // are not resetable nodes so this operation doesn't matter and actually
    // removes browser-default values (eg "Submit Query") when no value is
    // provided.

    switch (props.type) {
      case 'submit':
      case 'reset':
        break;
      case 'color':
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'month':
      case 'time':
      case 'week':
        // This fixes the no-show issue on iOS Safari and Android Chrome:
        // https://github.com/facebook/react/issues/7233
        node.value = '';
        node.value = node.defaultValue;
        break;
      default:
        node.value = node.value;
        break;
    }

    // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
    // this is needed to work around a chrome bug where setting defaultChecked
    // will sometimes influence the value of checked (even after detachment).
    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
    // We need to temporarily unset name to avoid disrupting radio button groups.
    var name = node.name;
    if (name !== '') {
      node.name = '';
    }
    node.defaultChecked = !node.defaultChecked;
    node.defaultChecked = !node.defaultChecked;
    if (name !== '') {
      node.name = name;
    }
  },

  restoreControlledState: function (element, props) {
    var node = element;
    ReactDOMInput.updateWrapper(node, props);
    updateNamedCousins(node, props);
  }
};

function updateNamedCousins(rootNode, props) {
  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form. It might not even be in the
    // document. Let's just use the local `querySelectorAll` to ensure we don't
    // miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React radio buttons with non-React ones.
      var otherProps = ReactDOMComponentTree_1.getFiberCurrentPropsFromNode(otherNode);
      !otherProps ? invariant_1(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      ReactDOMInput.updateWrapper(otherNode, otherProps);
    }
  }
}

var ReactDOMFiberInput = ReactDOMInput;

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  // We can silently skip them because invalid DOM nesting warning
  // catches these cases in Fiber.
  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */
var ReactDOMOption = {
  mountWrapper: function (element, props) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    {
      warning_1(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
    }
  },

  postMountWrapper: function (element, props) {
    // value="" should make a value attribute (#6219)
    if (props.value != null) {
      element.setAttribute('value', props.value);
    }
  },

  getHostProps: function (element, props) {
    var hostProps = index({ children: undefined }, props);

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  }
};

var ReactDOMFiberOption = ReactDOMOption;

var getCurrentFiberOwnerName$4 = ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;



var didWarnValueDefaultValue$1 = false;

function getDeclarationErrorAddendum$2() {
  var ownerName = getCurrentFiberOwnerName$4();
  if (ownerName) {
    return '\n\nCheck the render method of `' + ownerName + '`.';
  }
  return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
 * Validation function for `value` and `defaultValue`.
 */
function checkSelectPropTypes(props) {
  ReactControlledValuePropTypes_1.checkPropTypes('select', props, getCurrentFiberOwnerName$4());

  for (var i = 0; i < valuePropNames.length; i++) {
    var propName = valuePropNames[i];
    if (props[propName] == null) {
      continue;
    }
    var isArray = Array.isArray(props[propName]);
    if (props.multiple && !isArray) {
      warning_1(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum$2());
    } else if (!props.multiple && isArray) {
      warning_1(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum$2());
    }
  }
}

function updateOptions(node, multiple, propValue) {
  var options = node.options;

  if (multiple) {
    var selectedValues = propValue;
    var selectedValue = {};
    for (var i = 0; i < selectedValues.length; i++) {
      selectedValue['' + selectedValues[i]] = true;
    }
    for (var _i = 0; _i < options.length; _i++) {
      var selected = selectedValue.hasOwnProperty(options[_i].value);
      if (options[_i].selected !== selected) {
        options[_i].selected = selected;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    var _selectedValue = '' + propValue;
    for (var _i2 = 0; _i2 < options.length; _i2++) {
      if (options[_i2].value === _selectedValue) {
        options[_i2].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = {
  getHostProps: function (element, props) {
    return index({}, props, {
      value: undefined
    });
  },

  mountWrapper: function (element, props) {
    var node = element;
    {
      checkSelectPropTypes(props);
    }

    var value = props.value;
    node._wrapperState = {
      initialValue: value != null ? value : props.defaultValue,
      wasMultiple: !!props.multiple
    };

    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
      warning_1(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
      didWarnValueDefaultValue$1 = true;
    }

    node.multiple = !!props.multiple;
    if (value != null) {
      updateOptions(node, !!props.multiple, value);
    } else if (props.defaultValue != null) {
      updateOptions(node, !!props.multiple, props.defaultValue);
    }
  },

  postUpdateWrapper: function (element, props) {
    var node = element;
    // After the initial mount, we control selected-ness manually so don't pass
    // this value down
    node._wrapperState.initialValue = undefined;

    var wasMultiple = node._wrapperState.wasMultiple;
    node._wrapperState.wasMultiple = !!props.multiple;

    var value = props.value;
    if (value != null) {
      updateOptions(node, !!props.multiple, value);
    } else if (wasMultiple !== !!props.multiple) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(node, !!props.multiple, props.defaultValue);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(node, !!props.multiple, props.multiple ? [] : '');
      }
    }
  },

  restoreControlledState: function (element, props) {
    var node = element;
    var value = props.value;

    if (value != null) {
      updateOptions(node, !!props.multiple, value);
    }
  }
};

var ReactDOMFiberSelect = ReactDOMSelect;

var getCurrentFiberOwnerName$5 = ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;




var didWarnValDefaultVal = false;

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = {
  getHostProps: function (element, props) {
    var node = element;
    !(props.dangerouslySetInnerHTML == null) ? invariant_1(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.  We could add a check in setTextContent
    // to only set the value if/when the value differs from the node value (which would
    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
    // The value can be a boolean or object so that's why it's forced to be a string.
    var hostProps = index({}, props, {
      value: undefined,
      defaultValue: undefined,
      children: '' + node._wrapperState.initialValue
    });

    return hostProps;
  },

  mountWrapper: function (element, props) {
    var node = element;
    {
      ReactControlledValuePropTypes_1.checkPropTypes('textarea', props, getCurrentFiberOwnerName$5());
      if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
        warning_1(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
        didWarnValDefaultVal = true;
      }
    }

    var value = props.value;
    var initialValue = value;

    // Only bother fetching default value if we're going to use it
    if (value == null) {
      var defaultValue = props.defaultValue;
      // TODO (yungsters): Remove support for children content in <textarea>.
      var children = props.children;
      if (children != null) {
        {
          warning_1(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
        }
        !(defaultValue == null) ? invariant_1(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
        if (Array.isArray(children)) {
          !(children.length <= 1) ? invariant_1(false, '<textarea> can only have at most one child.') : void 0;
          children = children[0];
        }

        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      initialValue = defaultValue;
    }

    node._wrapperState = {
      initialValue: '' + initialValue
    };
  },

  updateWrapper: function (element, props) {
    var node = element;
    var value = props.value;
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = '' + value;

      // To avoid side effects (such as losing text selection), only set value if changed
      if (newValue !== node.value) {
        node.value = newValue;
      }
      if (props.defaultValue == null) {
        node.defaultValue = newValue;
      }
    }
    if (props.defaultValue != null) {
      node.defaultValue = props.defaultValue;
    }
  },

  postMountWrapper: function (element, props) {
    var node = element;
    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var textContent = node.textContent;

    // Only set node.value if textContent is equal to the expected
    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
    // will populate textContent as well.
    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
    if (textContent === node._wrapperState.initialValue) {
      node.value = textContent;
    }
  },

  restoreControlledState: function (element, props) {
    // DOM component is still mounted; update
    ReactDOMTextarea.updateWrapper(element, props);
  }
};

var ReactDOMFiberTextarea = ReactDOMTextarea;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule createMicrosoftUnsafeLocalFunction
 */

/* globals MSApp */

/**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */

var createMicrosoftUnsafeLocalFunction = function (func) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

var createMicrosoftUnsafeLocalFunction_1 = createMicrosoftUnsafeLocalFunction;

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer;

/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = createMicrosoftUnsafeLocalFunction_1(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node
  if (node.namespaceURI === DOMNamespaces_1.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var svgNode = reusableSVGContainer.firstChild;
    while (svgNode.firstChild) {
      node.appendChild(svgNode.firstChild);
    }
  } else {
    node.innerHTML = html;
  }
});

var setInnerHTML_1 = setInnerHTML;

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

if (ExecutionEnvironment_1.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function (node, text) {
      if (node.nodeType === 3) {
        node.nodeValue = text;
        return;
      }
      setInnerHTML_1(node, escapeTextContentForBrowser_1(text));
    };
  }
}

var setTextContent_1 = setTextContent;

function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}

function getTracker(inst) {
  if (typeof inst.tag === 'number') {
    inst = inst.stateNode;
  }
  return inst._wrapperState.valueTracker;
}

function attachTracker(inst, tracker) {
  inst._wrapperState.valueTracker = tracker;
}

function detachTracker(inst) {
  delete inst._wrapperState.valueTracker;
}

function getValueFromNode(node) {
  var value;
  if (node) {
    value = isCheckable(node) ? '' + node.checked : node.value;
  }
  return value;
}

function trackValueOnNode(node, inst) {
  var valueField = isCheckable(node) ? 'checked' : 'value';
  var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

  var currentValue = '' + node[valueField];

  // if someone has already defined a value or Safari, then bail
  // and don't track value will cause over reporting of changes,
  // but it's better then a hard failure
  // (needed for certain tests that spyOn input values and Safari)
  if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
    return;
  }

  Object.defineProperty(node, valueField, {
    enumerable: descriptor.enumerable,
    configurable: true,
    get: function () {
      return descriptor.get.call(this);
    },
    set: function (value) {
      currentValue = '' + value;
      descriptor.set.call(this, value);
    }
  });

  var tracker = {
    getValue: function () {
      return currentValue;
    },
    setValue: function (value) {
      currentValue = '' + value;
    },
    stopTracking: function () {
      detachTracker(inst);
      delete node[valueField];
    }
  };
  return tracker;
}

var inputValueTracking = {
  // exposed for testing
  _getTrackerFromNode: function (node) {
    return getTracker(ReactDOMComponentTree_1.getInstanceFromNode(node));
  },


  trackNode: function (node) {
    if (node._wrapperState.valueTracker) {
      return;
    }
    node._wrapperState.valueTracker = trackValueOnNode(node, node);
  },

  track: function (inst) {
    if (getTracker(inst)) {
      return;
    }
    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    attachTracker(inst, trackValueOnNode(node, inst));
  },

  updateValueIfChanged: function (inst) {
    if (!inst) {
      return false;
    }
    var tracker = getTracker(inst);

    if (!tracker) {
      if (typeof inst.tag === 'number') {
        inputValueTracking.trackNode(inst.stateNode);
      } else {
        inputValueTracking.track(inst);
      }
      return true;
    }

    var lastValue = tracker.getValue();
    var nextValue = getValueFromNode(ReactDOMComponentTree_1.getNodeFromInstance(inst));

    if (nextValue !== lastValue) {
      tracker.setValue(nextValue);
      return true;
    }

    return false;
  },
  stopTracking: function (inst) {
    var tracker = getTracker(inst);
    if (tracker) {
      tracker.stopTracking();
    }
  }
};

var inputValueTracking_1 = inputValueTracking;

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');

{
  var _require$2 = ReactComponentTreeHookRollupShim,
      getStackAddendumByID = _require$2.getStackAddendumByID;
}

function getStackAddendum(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return getStackAddendumByID(debugID);
  } else {
    // This can only happen on Fiber
    return ReactDebugCurrentFiber_1.getCurrentFiberStackAddendum();
  }
}

function validateProperty(tagName, name, debugID) {
  if (warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
    return true;
  }

  if (rARIA.test(name)) {
    var lowerCasedName = name.toLowerCase();
    var standardName = DOMProperty_1.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty_1.getPossibleStandardName[lowerCasedName] : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (standardName == null) {
      warnedProperties[name] = true;
      return false;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== standardName) {
      warning_1(false, 'Unknown ARIA attribute %s. Did you mean %s?%s', name, standardName, getStackAddendum(debugID));
      warnedProperties[name] = true;
      return true;
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props, debugID) {
  var invalidProps = [];

  for (var key in props) {
    var isValid = validateProperty(type, key, debugID);
    if (!isValid) {
      invalidProps.push(key);
    }
  }

  var unknownPropString = invalidProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (invalidProps.length === 1) {
    warning_1(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum(debugID));
  } else if (invalidProps.length > 1) {
    warning_1(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum(debugID));
  }
}

function validateProperties(type, props, debugID /* Stack only */) {
  if (type.indexOf('-') >= 0 || props.is) {
    return;
  }
  warnInvalidARIAProps(type, props, debugID);
}

var ReactDOMInvalidARIAHook$1 = {
  // Fiber
  validateProperties: validateProperties,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties(element.type, element.props, debugID);
    }
  }
};

var ReactDOMInvalidARIAHook_1 = ReactDOMInvalidARIAHook$1;

{
  var _require$3 = ReactComponentTreeHookRollupShim,
      getStackAddendumByID$1 = _require$3.getStackAddendumByID;
}

var didWarnValueNull = false;

function getStackAddendum$1(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return getStackAddendumByID$1(debugID);
  } else {
    // This can only happen on Fiber
    return ReactDebugCurrentFiber_1.getCurrentFiberStackAddendum();
  }
}

function validateProperties$1(type, props, debugID /* Stack only */) {
  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
    return;
  }
  if (props != null && props.value === null && !didWarnValueNull) {
    warning_1(false, '`value` prop on `%s` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1(debugID));

    didWarnValueNull = true;
  }
}

var ReactDOMNullInputValuePropHook$1 = {
  // Fiber
  validateProperties: validateProperties$1,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties$1(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties$1(element.type, element.props, debugID);
    }
  }
};

var ReactDOMNullInputValuePropHook_1 = ReactDOMNullInputValuePropHook$1;

function getStackAddendum$2(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return ReactComponentTreeHookRollupShim.getStackAddendumByID(debugID);
  } else {
    // This can only happen on Fiber
    return ReactDebugCurrentFiber_1.getCurrentFiberStackAddendum();
  }
}

{
  var reactProps = {
    children: true,
    dangerouslySetInnerHTML: true,
    key: true,
    ref: true,

    autoFocus: true,
    defaultValue: true,
    defaultChecked: true,
    innerHTML: true,
    suppressContentEditableWarning: true,
    onFocusIn: true,
    onFocusOut: true
  };
  var warnedProperties$1 = {};

  var validateProperty$1 = function (tagName, name, debugID) {
    if (DOMProperty_1.properties.hasOwnProperty(name) || DOMProperty_1.isCustomAttribute(name)) {
      return true;
    }
    if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties$1.hasOwnProperty(name) && warnedProperties$1[name]) {
      return true;
    }
    if (EventPluginRegistry_1.registrationNameModules.hasOwnProperty(name)) {
      return true;
    }
    warnedProperties$1[name] = true;
    var lowerCasedName = name.toLowerCase();

    // data-* attributes should be lowercase; suggest the lowercase version
    var standardName = DOMProperty_1.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty_1.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty_1.getPossibleStandardName[lowerCasedName] : null;

    var registrationName = EventPluginRegistry_1.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry_1.possibleRegistrationNames[lowerCasedName] : null;

    if (standardName != null) {
      warning_1(false, 'Unknown DOM property %s. Did you mean %s?%s', name, standardName, getStackAddendum$2(debugID));
      return true;
    } else if (registrationName != null) {
      warning_1(false, 'Unknown event handler property %s. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2(debugID));
      return true;
    } else {
      // We were unable to guess which prop the user intended.
      // It is likely that the user was just blindly spreading/forwarding props
      // Components should be careful to only render valid props/attributes.
      // Warning will be invoked in warnUnknownProperties to allow grouping.
      return false;
    }
  };
}

var warnUnknownProperties = function (type, props, debugID) {
  var unknownProps = [];
  for (var key in props) {
    var isValid = validateProperty$1(type, key, debugID);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (unknownProps.length === 1) {
    warning_1(false, 'Unknown prop %s on <%s> tag. Remove this prop from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, type, getStackAddendum$2(debugID));
  } else if (unknownProps.length > 1) {
    warning_1(false, 'Unknown props %s on <%s> tag. Remove these props from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, type, getStackAddendum$2(debugID));
  }
};

function validateProperties$2(type, props, debugID /* Stack only */) {
  if (type.indexOf('-') >= 0 || props.is) {
    return;
  }
  warnUnknownProperties(type, props, debugID);
}

var ReactDOMUnknownPropertyHook$1 = {
  // Fiber
  validateProperties: validateProperties$2,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties$2(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if ('development' !== 'production' && element != null && typeof element.type === 'string') {
      validateProperties$2(element.type, element.props, debugID);
    }
  }
};

var ReactDOMUnknownPropertyHook_1 = ReactDOMUnknownPropertyHook$1;

var _extends = index || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };














var getCurrentFiberOwnerName = ReactDebugCurrentFiber_1.getCurrentFiberOwnerName;








{
  var ReactDOMInvalidARIAHook = ReactDOMInvalidARIAHook_1;
  var ReactDOMNullInputValuePropHook = ReactDOMNullInputValuePropHook_1;
  var ReactDOMUnknownPropertyHook = ReactDOMUnknownPropertyHook_1;
  var validateARIAProperties = ReactDOMInvalidARIAHook.validateProperties;
  var validateInputPropertes = ReactDOMNullInputValuePropHook.validateProperties;
  var validateUnknownPropertes = ReactDOMUnknownPropertyHook.validateProperties;
}

var didWarnShadyDOM = false;

var listenTo = ReactBrowserEventEmitter_1.listenTo;
var registrationNameModules = EventPluginRegistry_1.registrationNameModules;

var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
var CHILDREN = 'children';
var STYLE = 'style';
var HTML = '__html';

var HTML_NAMESPACE = DOMNamespaces_1.html;
var SVG_NAMESPACE = DOMNamespaces_1.svg;
var MATH_NAMESPACE = DOMNamespaces_1.mathml;

// Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).

var DOC_FRAGMENT_TYPE = 11;

function getDeclarationErrorAddendum() {
  {
    var ownerName = getCurrentFiberOwnerName();
    if (ownerName) {
      // TODO: also report the stack.
      return '\n\nThis DOM node was rendered by `' + ownerName + '`.';
    }
  }
  return '';
}

function assertValidProps(tag, props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant_1(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getDeclarationErrorAddendum()) : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? invariant_1(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? invariant_1(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
  }
  {
    warning_1(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
    warning_1(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
    warning_1(props.onFocusIn == null && props.onFocusOut == null, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
  }
  !(props.style == null || typeof props.style === 'object') ? invariant_1(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum()) : void 0;
}

{
  var validatePropertiesInDevelopment = function (type, props) {
    validateARIAProperties(type, props);
    validateInputPropertes(type, props);
    validateUnknownPropertes(type, props);
  };
}

function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentFragment = rootContainerElement.nodeType === DOC_FRAGMENT_TYPE;
  var doc = isDocumentFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  listenTo(registrationName, doc);
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapClickOnNonInteractiveElement(node) {
  // Mobile Safari does not fire properly bubble click events on
  // non-interactive elements, which means delegated click listeners do not
  // fire. The workaround for this bug involves attaching an empty click
  // listener on the target node.
  // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
  // Just set it using the onclick property so that we don't have to manage any
  // bookkeeping for it. Not sure if we need to clear it when the listener is
  // removed.
  // TODO: Only do this for the relevant Safaris maybe?
  node.onclick = emptyFunction_1;
}

function trapBubbledEventsLocal(node, tag) {
  // If a component renders to null or if another component fatals and causes
  // the state of the tree to be corrupted, `node` here can be null.

  // TODO: Make sure that we check isMounted before firing any of these events.
  // TODO: Inline these below since we're calling this from an equivalent
  // switch statement.
  switch (tag) {
    case 'iframe':
    case 'object':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad', 'load', node);
      break;
    case 'video':
    case 'audio':
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          ReactBrowserEventEmitter_1.trapBubbledEvent(event, mediaEvents[event], node);
        }
      }
      break;
    case 'source':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topError', 'error', node);
      break;
    case 'img':
    case 'image':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topError', 'error', node);
      ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad', 'load', node);
      break;
    case 'form':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topReset', 'reset', node);
      ReactBrowserEventEmitter_1.trapBubbledEvent('topSubmit', 'submit', node);
      break;
    case 'input':
    case 'select':
    case 'textarea':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid', 'invalid', node);
      break;
    case 'details':
      ReactBrowserEventEmitter_1.trapBubbledEvent('topToggle', 'toggle', node);
      break;
  }
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _extends({
  menuitem: true
}, omittedCloseTags);

function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

function setInitialDOMProperties(domElement, rootContainerElement, nextProps, isCustomComponentTag) {
  for (var propKey in nextProps) {
    var nextProp = nextProps[propKey];
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    if (propKey === STYLE) {
      {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      // Relies on `updateStylesByID` not mutating `styleUpdates`.
      // TODO: call ReactInstrumentation.debugTool.onHostOperation in DEV.
      CSSPropertyOperations_1.setValueForStyles(domElement, nextProp);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      if (nextHtml != null) {
        setInnerHTML_1(domElement, nextHtml);
      }
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === 'string') {
        setTextContent_1(domElement, nextProp);
      } else if (typeof nextProp === 'number') {
        setTextContent_1(domElement, '' + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING) {
      // Noop
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp) {
        ensureListeningTo(rootContainerElement, propKey);
      }
    } else if (isCustomComponentTag) {
      DOMPropertyOperations_1.setValueForAttribute(domElement, propKey, nextProp);
    } else if (DOMProperty_1.properties[propKey] || DOMProperty_1.isCustomAttribute(propKey)) {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      if (nextProp != null) {
        DOMPropertyOperations_1.setValueForProperty(domElement, propKey, nextProp);
      }
    }
  }
}

function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
  // TODO: Handle wasCustomComponentTag
  for (var i = 0; i < updatePayload.length; i += 2) {
    var propKey = updatePayload[i];
    var propValue = updatePayload[i + 1];
    if (propKey === STYLE) {
      // TODO: call ReactInstrumentation.debugTool.onHostOperation in DEV.
      CSSPropertyOperations_1.setValueForStyles(domElement, propValue);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      setInnerHTML_1(domElement, propValue);
    } else if (propKey === CHILDREN) {
      setTextContent_1(domElement, propValue);
    } else if (isCustomComponentTag) {
      if (propValue != null) {
        DOMPropertyOperations_1.setValueForAttribute(domElement, propKey, propValue);
      } else {
        DOMPropertyOperations_1.deleteValueForAttribute(domElement, propKey);
      }
    } else if (DOMProperty_1.properties[propKey] || DOMProperty_1.isCustomAttribute(propKey)) {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      if (propValue != null) {
        DOMPropertyOperations_1.setValueForProperty(domElement, propKey, propValue);
      } else {
        DOMPropertyOperations_1.deleteValueForProperty(domElement, propKey);
      }
    }
  }
}

// Assumes there is no parent namespace.
function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}

var ReactDOMFiberComponent = {
  getChildNamespace: function (parentNamespace, type) {
    if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
      // No (or default) parent namespace: potential entry point.
      return getIntrinsicNamespace(type);
    }
    if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
      // We're leaving SVG.
      return HTML_NAMESPACE;
    }
    // By default, pass namespace below.
    return parentNamespace;
  },
  createElement: function (type, props, rootContainerElement, parentNamespace) {
    // We create tags in the namespace of their parent container, except HTML
    // tags get no namespace.
    var ownerDocument = rootContainerElement.ownerDocument;
    var domElement;
    var namespaceURI = parentNamespace;
    if (namespaceURI === HTML_NAMESPACE) {
      namespaceURI = getIntrinsicNamespace(type);
    }
    if (namespaceURI === HTML_NAMESPACE) {
      {
        warning_1(type === type.toLowerCase() || isCustomComponent(type, props), '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', type);
      }

      if (type === 'script') {
        // Create the script via .innerHTML so its "parser-inserted" flag is
        // set to true and it does not execute
        var div = ownerDocument.createElement('div');
        div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
        // This is guaranteed to yield a script element.
        var firstChild = div.firstChild;
        domElement = div.removeChild(firstChild);
      } else if (props.is) {
        domElement = ownerDocument.createElement(type, props.is);
      } else {
        // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
        // See discussion in https://github.com/facebook/react/pull/6896
        // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
        domElement = ownerDocument.createElement(type);
      }
    } else {
      domElement = ownerDocument.createElementNS(namespaceURI, type);
    }

    return domElement;
  },
  setInitialProperties: function (domElement, tag, rawProps, rootContainerElement) {
    var isCustomComponentTag = isCustomComponent(tag, rawProps);
    {
      validatePropertiesInDevelopment(tag, rawProps);
      if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
        warning_1(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName() || 'A component');
        didWarnShadyDOM = true;
      }
    }

    var props;
    switch (tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'image':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
      case 'details':
        trapBubbledEventsLocal(domElement, tag);
        props = rawProps;
        break;
      case 'input':
        ReactDOMFiberInput.mountWrapper(domElement, rawProps);
        props = ReactDOMFiberInput.getHostProps(domElement, rawProps);
        trapBubbledEventsLocal(domElement, tag);
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, 'onChange');
        break;
      case 'option':
        ReactDOMFiberOption.mountWrapper(domElement, rawProps);
        props = ReactDOMFiberOption.getHostProps(domElement, rawProps);
        break;
      case 'select':
        ReactDOMFiberSelect.mountWrapper(domElement, rawProps);
        props = ReactDOMFiberSelect.getHostProps(domElement, rawProps);
        trapBubbledEventsLocal(domElement, tag);
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, 'onChange');
        break;
      case 'textarea':
        ReactDOMFiberTextarea.mountWrapper(domElement, rawProps);
        props = ReactDOMFiberTextarea.getHostProps(domElement, rawProps);
        trapBubbledEventsLocal(domElement, tag);
        // For controlled components we always need to ensure we're listening
        // to onChange. Even if there is no listener.
        ensureListeningTo(rootContainerElement, 'onChange');
        break;
      default:
        props = rawProps;
    }

    assertValidProps(tag, props);

    setInitialDOMProperties(domElement, rootContainerElement, props, isCustomComponentTag);

    switch (tag) {
      case 'input':
        // TODO: Make sure we check if this is still unmounted or do any clean
        // up necessary since we never stop tracking anymore.
        inputValueTracking_1.trackNode(domElement);
        ReactDOMFiberInput.postMountWrapper(domElement, rawProps);
        break;
      case 'textarea':
        // TODO: Make sure we check if this is still unmounted or do any clean
        // up necessary since we never stop tracking anymore.
        inputValueTracking_1.trackNode(domElement);
        ReactDOMFiberTextarea.postMountWrapper(domElement, rawProps);
        break;
      case 'option':
        ReactDOMFiberOption.postMountWrapper(domElement, rawProps);
        break;
      default:
        if (typeof props.onClick === 'function') {
          // TODO: This cast may not be sound for SVG, MathML or custom elements.
          trapClickOnNonInteractiveElement(domElement);
        }
        break;
    }
  },


  // Calculate the diff between the two objects.
  diffProperties: function (domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
    {
      validatePropertiesInDevelopment(tag, nextRawProps);
    }

    var updatePayload = null;

    var lastProps;
    var nextProps;
    switch (tag) {
      case 'input':
        lastProps = ReactDOMFiberInput.getHostProps(domElement, lastRawProps);
        nextProps = ReactDOMFiberInput.getHostProps(domElement, nextRawProps);
        updatePayload = [];
        break;
      case 'option':
        lastProps = ReactDOMFiberOption.getHostProps(domElement, lastRawProps);
        nextProps = ReactDOMFiberOption.getHostProps(domElement, nextRawProps);
        updatePayload = [];
        break;
      case 'select':
        lastProps = ReactDOMFiberSelect.getHostProps(domElement, lastRawProps);
        nextProps = ReactDOMFiberSelect.getHostProps(domElement, nextRawProps);
        updatePayload = [];
        break;
      case 'textarea':
        lastProps = ReactDOMFiberTextarea.getHostProps(domElement, lastRawProps);
        nextProps = ReactDOMFiberTextarea.getHostProps(domElement, nextRawProps);
        updatePayload = [];
        break;
      default:
        lastProps = lastRawProps;
        nextProps = nextRawProps;
        if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
          // TODO: This cast may not be sound for SVG, MathML or custom elements.
          trapClickOnNonInteractiveElement(domElement);
        }
        break;
    }

    assertValidProps(tag, nextProps);

    var propKey;
    var styleName;
    var styleUpdates = null;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = lastProps[propKey];
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
        // Noop. This is handled by the clear text mechanism.
      } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING) {
        // Noop
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        // This is a special case. If any listener updates we need to ensure
        // that the "current" fiber pointer gets updated so we need a commit
        // to update this element.
        if (!updatePayload) {
          updatePayload = [];
        }
      } else {
        // For all other deleted properties we add it to the queue. We use
        // the whitelist in the commit phase instead.
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps != null ? lastProps[propKey] : undefined;
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      if (propKey === STYLE) {
        {
          if (nextProp) {
            // Freeze the next style object so that we can assume it won't be
            // mutated. We have already warned for this in the past.
            Object.freeze(nextProp);
          }
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          if (!styleUpdates) {
            if (!updatePayload) {
              updatePayload = [];
            }
            updatePayload.push(propKey, styleUpdates);
          }
          styleUpdates = nextProp;
        }
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        var nextHtml = nextProp ? nextProp[HTML] : undefined;
        var lastHtml = lastProp ? lastProp[HTML] : undefined;
        if (nextHtml != null) {
          if (lastHtml !== nextHtml) {
            (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
          }
        } else {
          // TODO: It might be too late to clear this if we have children
          // inserted already.
        }
      } else if (propKey === CHILDREN) {
        if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
        }
      } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING) {
        // Noop
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          // We eagerly listen to this even though we haven't committed yet.
          ensureListeningTo(rootContainerElement, propKey);
        }
        if (!updatePayload && lastProp !== nextProp) {
          // This is a special case. If any listener updates we need to ensure
          // that the "current" props pointer gets updated so we need a commit
          // to update this element.
          updatePayload = [];
        }
      } else {
        // For any other property we always add it to the queue and then we
        // filter it out using the whitelist during the commit.
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
    if (styleUpdates) {
      (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
    }
    return updatePayload;
  },


  // Apply the diff.
  updateProperties: function (domElement, updatePayload, tag, lastRawProps, nextRawProps) {
    var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
    var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
    // Apply the diff.
    updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

    // TODO: Ensure that an update gets scheduled if any of the special props
    // changed.
    switch (tag) {
      case 'input':
        // Update the wrapper around inputs *after* updating props. This has to
        // happen after `updateDOMProperties`. Otherwise HTML5 input validations
        // raise warnings and prevent the new value from being assigned.
        ReactDOMFiberInput.updateWrapper(domElement, nextRawProps);
        break;
      case 'textarea':
        ReactDOMFiberTextarea.updateWrapper(domElement, nextRawProps);
        break;
      case 'select':
        // <select> value update needs to occur after <option> children
        // reconciliation
        ReactDOMFiberSelect.postUpdateWrapper(domElement, nextRawProps);
        break;
    }
  },
  restoreControlledState: function (domElement, tag, props) {
    switch (tag) {
      case 'input':
        ReactDOMFiberInput.restoreControlledState(domElement, props);
        return;
      case 'textarea':
        ReactDOMFiberTextarea.restoreControlledState(domElement, props);
        return;
      case 'select':
        ReactDOMFiberSelect.restoreControlledState(domElement, props);
        return;
    }
  }
};

var ReactDOMFiberComponent_1 = ReactDOMFiberComponent;

// This a built-in polyfill for requestIdleCallback. It works by scheduling
// a requestAnimationFrame, store the time for the start of the frame, then
// schedule a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.



// TODO: There's no way to cancel these, because Fiber doesn't atm.
var rAF = void 0;
var rIC = void 0;
if (typeof requestAnimationFrame !== 'function') {
  invariant_1(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers.');
} else if (typeof requestIdleCallback !== 'function') {
  // Wrap requestAnimationFrame and polyfill requestIdleCallback.

  var scheduledRAFCallback = null;
  var scheduledRICCallback = null;

  var isIdleScheduled = false;
  var isAnimationFrameScheduled = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  var frameDeadlineObject = {
    timeRemaining: typeof performance === 'object' && typeof performance.now === 'function' ? function () {
      // We assume that if we have a performance timer that the rAF callback
      // gets a performance timer value. Not sure if this is always true.
      return frameDeadline - performance.now();
    } : function () {
      // As a fallback we use Date.now.
      return frameDeadline - Date.now();
    }
  };

  // We use the postMessage trick to defer idle work until after the repaint.
  var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
  var idleTick = function (event) {
    if (event.source !== window || event.data !== messageKey) {
      return;
    }
    isIdleScheduled = false;
    var callback = scheduledRICCallback;
    scheduledRICCallback = null;
    if (callback) {
      callback(frameDeadlineObject);
    }
  };
  // Assumes that we have addEventListener in this environment. Might need
  // something better for old IE.
  window.addEventListener('message', idleTick, false);

  var animationTick = function (rafTime) {
    isAnimationFrameScheduled = false;
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If we get lower than that, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isIdleScheduled) {
      isIdleScheduled = true;
      window.postMessage(messageKey, '*');
    }
    var callback = scheduledRAFCallback;
    scheduledRAFCallback = null;
    if (callback) {
      callback(rafTime);
    }
  };

  rAF = function (callback) {
    // This assumes that we only schedule one callback at a time because that's
    // how Fiber uses it.
    scheduledRAFCallback = callback;
    if (!isAnimationFrameScheduled) {
      // If rIC didn't already schedule one, we need to schedule a frame.
      isAnimationFrameScheduled = true;
      requestAnimationFrame(animationTick);
    }
    return 0;
  };

  rIC = function (callback) {
    // This assumes that we only schedule one callback at a time because that's
    // how Fiber uses it.
    scheduledRICCallback = callback;
    if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrame(animationTick);
    }
    return 0;
  };
} else {
  rAF = requestAnimationFrame;
  rIC = requestIdleCallback;
}

var rAF_1 = rAF;
var rIC_1 = rIC;

var ReactDOMFrameScheduling = {
	rAF: rAF_1,
	rIC: rIC_1
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ARIADOMPropertyConfig
 */

var ARIADOMPropertyConfig = {
  Properties: {
    // Global States and Properties
    'aria-current': 0, // state
    'aria-details': 0,
    'aria-disabled': 0, // state
    'aria-hidden': 0, // state
    'aria-invalid': 0, // state
    'aria-keyshortcuts': 0,
    'aria-label': 0,
    'aria-roledescription': 0,
    // Widget Attributes
    'aria-autocomplete': 0,
    'aria-checked': 0,
    'aria-expanded': 0,
    'aria-haspopup': 0,
    'aria-level': 0,
    'aria-modal': 0,
    'aria-multiline': 0,
    'aria-multiselectable': 0,
    'aria-orientation': 0,
    'aria-placeholder': 0,
    'aria-pressed': 0,
    'aria-readonly': 0,
    'aria-required': 0,
    'aria-selected': 0,
    'aria-sort': 0,
    'aria-valuemax': 0,
    'aria-valuemin': 0,
    'aria-valuenow': 0,
    'aria-valuetext': 0,
    // Live Region Attributes
    'aria-atomic': 0,
    'aria-busy': 0,
    'aria-live': 0,
    'aria-relevant': 0,
    // Drag-and-Drop Attributes
    'aria-dropeffect': 0,
    'aria-grabbed': 0,
    // Relationship Attributes
    'aria-activedescendant': 0,
    'aria-colcount': 0,
    'aria-colindex': 0,
    'aria-colspan': 0,
    'aria-controls': 0,
    'aria-describedby': 0,
    'aria-errormessage': 0,
    'aria-flowto': 0,
    'aria-labelledby': 0,
    'aria-owns': 0,
    'aria-posinset': 0,
    'aria-rowcount': 0,
    'aria-rowindex': 0,
    'aria-rowspan': 0,
    'aria-setsize': 0
  },
  DOMAttributeNames: {},
  DOMPropertyNames: {}
};

var ARIADOMPropertyConfig_1 = ARIADOMPropertyConfig;

var HostComponent$2 = ReactTypeOfWork.HostComponent;

function getParent(inst) {
  if (inst._hostParent !== undefined) {
    return inst._hostParent;
  }
  if (typeof inst.tag === 'number') {
    do {
      inst = inst['return'];
      // TODO: If this is a HostRoot we might want to bail out.
      // That is depending on if we want nested subtrees (layers) to bubble
      // events to their parent. We could also go through parentNode on the
      // host node but that wouldn't work for React Native and doesn't let us
      // do the portal feature.
    } while (inst && inst.tag !== HostComponent$2);
    if (inst) {
      return inst;
    }
  }
  return null;
}

/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */
function getLowestCommonAncestor(instA, instB) {
  var depthA = 0;
  for (var tempA = instA; tempA; tempA = getParent(tempA)) {
    depthA++;
  }
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = getParent(tempB)) {
    depthB++;
  }

  // If A is deeper, crawl up.
  while (depthA - depthB > 0) {
    instA = getParent(instA);
    depthA--;
  }

  // If B is deeper, crawl up.
  while (depthB - depthA > 0) {
    instB = getParent(instB);
    depthB--;
  }

  // Walk in lockstep until we find a match.
  var depth = depthA;
  while (depth--) {
    if (instA === instB || instA === instB.alternate) {
      return instA;
    }
    instA = getParent(instA);
    instB = getParent(instB);
  }
  return null;
}

/**
 * Return if A is an ancestor of B.
 */
function isAncestor(instA, instB) {
  while (instB) {
    if (instA === instB || instA === instB.alternate) {
      return true;
    }
    instB = getParent(instB);
  }
  return false;
}

/**
 * Return the parent instance of the passed-in instance.
 */
function getParentInstance(inst) {
  return getParent(inst);
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  var i;
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}

/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (from && from !== common) {
    pathFrom.push(from);
    from = getParent(from);
  }
  var pathTo = [];
  while (to && to !== common) {
    pathTo.push(to);
    to = getParent(to);
  }
  var i;
  for (i = 0; i < pathFrom.length; i++) {
    fn(pathFrom[i], 'bubbled', argFrom);
  }
  for (i = pathTo.length; i-- > 0;) {
    fn(pathTo[i], 'captured', argTo);
  }
}

var ReactTreeTraversal = {
  isAncestor: isAncestor,
  getLowestCommonAncestor: getLowestCommonAncestor,
  getParentInstance: getParentInstance,
  traverseTwoPhase: traverseTwoPhase,
  traverseEnterLeave: traverseEnterLeave
};

var getListener = EventPluginHub_1.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  {
    warning_1(inst, 'Dispatching inst must not be null');
  }
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto_1(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto_1(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    ReactTreeTraversal.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? ReactTreeTraversal.getParentInstance(targetInst) : null;
    ReactTreeTraversal.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto_1(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto_1(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated_1(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated_1(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  ReactTreeTraversal.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated_1(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

var EventPropagators_1 = EventPropagators;

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? invariant_1(false, 'Trying to release an instance into a pool of a different type.') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

var PooledClass_1 = PooledClass;

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment_1.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

var getTextContentAccessor_1 = getTextContentAccessor;

/**
 * This helper class stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

index(FallbackCompositionState.prototype, {
  destructor: function () {
    this._root = null;
    this._startText = null;
    this._fallbackText = null;
  },

  /**
   * Get current text of input.
   *
   * @return {string}
   */
  getText: function () {
    if ('value' in this._root) {
      return this._root.value;
    }
    return this._root[getTextContentAccessor_1()];
  },

  /**
   * Determine the differing substring between the initially stored
   * text content and the current content.
   *
   * @return {string}
   */
  getData: function () {
    if (this._fallbackText) {
      return this._fallbackText;
    }

    var start;
    var startValue = this._startText;
    var startLength = startValue.length;
    var end;
    var endValue = this.getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    this._fallbackText = endValue.slice(start, sliceTail);
    return this._fallbackText;
  }
});

PooledClass_1.addPoolingTo(FallbackCompositionState);

var FallbackCompositionState_1 = FallbackCompositionState;

var didWarnForAddedNewProperty = false;
var isProxySupported = typeof Proxy === 'function';

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction_1.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    {
      delete this[propName]; // this has a getter/setter for warnings
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction_1.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction_1.thatReturnsFalse;
  return this;
}

index(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction_1.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction_1.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction_1.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      {
        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    {
      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction_1));
      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction_1));
    }
  }
});

SyntheticEvent.Interface = EventInterface;

{
  if (isProxySupported) {
    /*eslint-disable no-func-assign */
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function (target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function (constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function (target, prop, value) {
            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
              warning_1(didWarnForAddedNewProperty || target.isPersistent(), "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.');
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
    });
    /*eslint-enable no-func-assign */
  }
}
/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  index(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = index({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass_1.addPoolingTo(Class, PooledClass_1.fourArgumentPooler);
};

PooledClass_1.addPoolingTo(SyntheticEvent, PooledClass_1.fourArgumentPooler);

var SyntheticEvent_1 = SyntheticEvent;

/**
  * Helper to nullify syntheticEvent instance properties when destructing
  *
  * @param {object} SyntheticEvent
  * @param {String} propName
  * @return {object} defineProperty object
  */
function getPooledWarningPropertyDefinition(propName, getVal) {
  var isFunction = typeof getVal === 'function';
  return {
    configurable: true,
    set: set,
    get: get
  };

  function set(val) {
    var action = isFunction ? 'setting the method' : 'setting the property';
    warn(action, 'This is effectively a no-op');
    return val;
  }

  function get() {
    var action = isFunction ? 'accessing the method' : 'accessing the property';
    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
    warn(action, result);
    return getVal;
  }

  function warn(action, result) {
    var warningCondition = false;
    warning_1(warningCondition, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result);
  }
}

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

var SyntheticCompositionEvent_1 = SyntheticCompositionEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticInputEvent, InputEventInterface);

var SyntheticInputEvent_1 = SyntheticInputEvent;

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment_1.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment_1.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment_1.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment_1.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture'
    },
    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture'
    },
    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture'
    },
    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture'
    },
    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case 'topCompositionStart':
      return eventTypes.compositionStart;
    case 'topCompositionEnd':
      return eventTypes.compositionEnd;
    case 'topCompositionUpdate':
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topKeyUp':
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case 'topKeyDown':
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case 'topKeyPress':
    case 'topMouseDown':
    case 'topBlur':
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition fallback object, if any.
var currentComposition = null;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!currentComposition) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!currentComposition && eventType === eventTypes.compositionStart) {
      currentComposition = FallbackCompositionState_1.getPooled(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (currentComposition) {
        fallbackData = currentComposition.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent_1.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topCompositionEnd':
      return getDataFromCustomEvent(nativeEvent);
    case 'topKeyPress':
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case 'topTextInput':
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (currentComposition) {
    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = currentComposition.getData();
      FallbackCompositionState_1.release(currentComposition);
      currentComposition = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case 'topPaste':
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case 'topKeyPress':
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case 'topCompositionEnd':
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent_1.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {
  eventTypes: eventTypes,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

var BeforeInputEventPlugin_1 = BeforeInputEventPlugin;

// Used as a way to call batchedUpdates when we don't know if we're in a Fiber
// or Stack context. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.

// Defaults
var stackBatchedUpdates = function (fn, a, b, c, d, e) {
  return fn(a, b, c, d, e);
};
var fiberBatchedUpdates = function (fn, bookkeeping) {
  return fn(bookkeeping);
};

function performFiberBatchedUpdates(fn, bookkeeping) {
  // If we have Fiber loaded, we need to wrap this in a batching call so that
  // Fiber can apply its default priority for this call.
  return fiberBatchedUpdates(fn, bookkeeping);
}
function batchedUpdates(fn, bookkeeping) {
  // We first perform work with the stack batching strategy, by passing our
  // indirection to it.
  return stackBatchedUpdates(performFiberBatchedUpdates, fn, bookkeeping);
}

var isNestingBatched = false;
function batchedUpdatesWithControlledComponents(fn, bookkeeping) {
  if (isNestingBatched) {
    // If we are currently inside another batch, we need to wait until it
    // fully completes before restoring state. Therefore, we add the target to
    // a queue of work.
    return batchedUpdates(fn, bookkeeping);
  }
  isNestingBatched = true;
  try {
    return batchedUpdates(fn, bookkeeping);
  } finally {
    // Here we wait until all updates have propagated, which is important
    // when using controlled components within layers:
    // https://github.com/facebook/react/issues/1698
    // Then we restore state of any controlled component.
    isNestingBatched = false;
    ReactControlledComponent_1.restoreStateIfNeeded();
  }
}

var ReactGenericBatchingInjection = {
  injectStackBatchedUpdates: function (_batchedUpdates) {
    stackBatchedUpdates = _batchedUpdates;
  },
  injectFiberBatchedUpdates: function (_batchedUpdates) {
    fiberBatchedUpdates = _batchedUpdates;
  }
};

var ReactGenericBatching = {
  batchedUpdates: batchedUpdatesWithControlledComponents,
  injection: ReactGenericBatchingInjection
};

var ReactGenericBatching_1 = ReactGenericBatching;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventTarget
 */

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

var getEventTarget_1 = getEventTarget;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule isTextInputElement
 * 
 */

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */

var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  'datetime-local': true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

  if (nodeName === 'input') {
    return !!supportedInputTypes[elem.type];
  }

  if (nodeName === 'textarea') {
    return true;
  }

  return false;
}

var isTextInputElement_1 = isTextInputElement;

var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: 'onChange',
      captured: 'onChangeCapture'
    },
    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
  }
};

function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  var event = SyntheticEvent_1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  event.type = 'change';
  // Flag this event loop as needing state restore.
  ReactControlledComponent_1.enqueueStateRestore(target);
  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}
/**
 * For IE shims
 */
var activeElement = null;
var activeElementInst = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget_1(nativeEvent));

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  ReactGenericBatching_1.batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  EventPluginHub_1.enqueueEvents(event);
  EventPluginHub_1.processEventQueue(false);
}

function getInstIfValueChanged(targetInst) {
  if (inputValueTracking_1.updateValueIfChanged(targetInst)) {
    return targetInst;
  }
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topChange') {
    return targetInst;
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment_1.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events.
  isInputEventSupported = isEventSupported_1('input') && (!document.documentMode || document.documentMode > 9);
}

/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onpropertychange', handlePropertyChange);
  activeElement = null;
  activeElementInst = null;
}

/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  if (getInstIfValueChanged(activeElementInst)) {
    manualDispatchChangeEvent(nativeEvent);
  }
}

function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  if (topLevelType === 'topFocus') {
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === 'topBlur') {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    return getInstIfValueChanged(activeElementInst);
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst) {
  if (topLevelType === 'topClick') {
    return getInstIfValueChanged(targetInst);
  }
}

function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
    return getInstIfValueChanged(targetInst);
  }
}

function handleControlledInputBlur(inst, node) {
  // TODO: In IE, inst is occasionally null. Why?
  if (inst == null) {
    return;
  }

  // Fiber and ReactDOM keep wrapper state in separate places
  var state = inst._wrapperState || node._wrapperState;

  if (!state || !state.controlled || node.type !== 'number') {
    return;
  }

  // If controlled, assign the value attribute to the current value on blur
  var value = '' + node.value;
  if (node.getAttribute('value') !== value) {
    node.setAttribute('value', value);
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,

  _isInputEventSupported: isInputEventSupported,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var targetNode = targetInst ? ReactDOMComponentTree_1.getNodeFromInstance(targetInst) : window;

    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForChangeEvent;
    } else if (isTextInputElement_1(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }

    // When blurring, set the value attribute for number inputs
    if (topLevelType === 'topBlur') {
      handleControlledInputBlur(targetInst, targetNode);
    }
  }
};

var ChangeEventPlugin_1 = ChangeEventPlugin;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DOMEventPluginOrder
 */

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */

var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

var DOMEventPluginOrder_1 = DOMEventPluginOrder;

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget_1(event);
    if (target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticUIEvent, UIEventInterface);

var SyntheticUIEvent_1 = SyntheticUIEvent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventModifierState
 */

/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */

var modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}

var getEventModifierState_1 = getEventModifierState;

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState_1,
  button: null,
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticMouseEvent, MouseEventInterface);

var SyntheticMouseEvent_1 = SyntheticMouseEvent;

var eventTypes$2 = {
  mouseEnter: {
    registrationName: 'onMouseEnter',
    dependencies: ['topMouseOut', 'topMouseOver']
  },
  mouseLeave: {
    registrationName: 'onMouseLeave',
    dependencies: ['topMouseOut', 'topMouseOver']
  }
};

var EnterLeaveEventPlugin = {
  eventTypes: eventTypes$2,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === 'topMouseOut') {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? ReactDOMComponentTree_1.getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : ReactDOMComponentTree_1.getNodeFromInstance(from);
    var toNode = to == null ? win : ReactDOMComponentTree_1.getNodeFromInstance(to);

    var leave = SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    EventPropagators_1.accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }
};

var EnterLeaveEventPlugin_1 = EnterLeaveEventPlugin;

var MUST_USE_PROPERTY = DOMProperty_1.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = DOMProperty_1.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty_1.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$')),
  Properties: {
    /**
     * Standard Properties
     */
    accept: 0,
    acceptCharset: 0,
    accessKey: 0,
    action: 0,
    allowFullScreen: HAS_BOOLEAN_VALUE,
    allowTransparency: 0,
    alt: 0,
    // specifies target context for links with `preload` type
    as: 0,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: 0,
    // autoFocus is polyfilled/normalized by AutoFocusUtils
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_BOOLEAN_VALUE,
    cellPadding: 0,
    cellSpacing: 0,
    charSet: 0,
    challenge: 0,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cite: 0,
    classID: 0,
    className: 0,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: 0,
    content: 0,
    contentEditable: 0,
    contextMenu: 0,
    controls: HAS_BOOLEAN_VALUE,
    coords: 0,
    crossOrigin: 0,
    data: 0, // For `<object />` acts as `src`.
    dateTime: 0,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    dir: 0,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: 0,
    encType: 0,
    form: 0,
    formAction: 0,
    formEncType: 0,
    formMethod: 0,
    formNoValidate: HAS_BOOLEAN_VALUE,
    formTarget: 0,
    frameBorder: 0,
    headers: 0,
    height: 0,
    hidden: HAS_BOOLEAN_VALUE,
    high: 0,
    href: 0,
    hrefLang: 0,
    htmlFor: 0,
    httpEquiv: 0,
    id: 0,
    inputMode: 0,
    integrity: 0,
    is: 0,
    keyParams: 0,
    keyType: 0,
    kind: 0,
    label: 0,
    lang: 0,
    list: 0,
    loop: HAS_BOOLEAN_VALUE,
    low: 0,
    manifest: 0,
    marginHeight: 0,
    marginWidth: 0,
    max: 0,
    maxLength: 0,
    media: 0,
    mediaGroup: 0,
    method: 0,
    min: 0,
    minLength: 0,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: 0,
    nonce: 0,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    optimum: 0,
    pattern: 0,
    placeholder: 0,
    playsInline: HAS_BOOLEAN_VALUE,
    poster: 0,
    preload: 0,
    profile: 0,
    radioGroup: 0,
    readOnly: HAS_BOOLEAN_VALUE,
    referrerPolicy: 0,
    rel: 0,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    role: 0,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    sandbox: 0,
    scope: 0,
    scoped: HAS_BOOLEAN_VALUE,
    scrolling: 0,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    shape: 0,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    sizes: 0,
    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
    slot: 0,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: 0,
    src: 0,
    srcDoc: 0,
    srcLang: 0,
    srcSet: 0,
    start: HAS_NUMERIC_VALUE,
    step: 0,
    style: 0,
    summary: 0,
    tabIndex: 0,
    target: 0,
    title: 0,
    // Setting .type throws on non-<input> tags
    type: 0,
    useMap: 0,
    value: 0,
    width: 0,
    wmode: 0,
    wrap: 0,

    /**
     * RDFa Properties
     */
    about: 0,
    datatype: 0,
    inlist: 0,
    prefix: 0,
    // property is also supported for OpenGraph in meta tags.
    property: 0,
    resource: 0,
    'typeof': 0,
    vocab: 0,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: 0,
    autoCorrect: 0,
    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
    autoSave: 0,
    // color is for Safari mask-icon link
    color: 0,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: 0,
    itemScope: HAS_BOOLEAN_VALUE,
    itemType: 0,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: 0,
    itemRef: 0,
    // results show looking glass icon and recent searches on input
    // search fields in WebKit/Blink
    results: 0,
    // IE-only attribute that specifies security restrictions on an iframe
    // as an alternative to the sandbox attribute on IE<10
    security: 0,
    // IE-only attribute that controls focus behavior
    unselectable: 0
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMPropertyNames: {},
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks
 */



/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction_1
      };
    }
  },

  registerDefault: function registerDefault() {}
};

var EventListener_1 = EventListener;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

var getUnboundedScrollPosition_1 = getUnboundedScrollPosition;

var HostRoot = ReactTypeOfWork.HostRoot;

/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */

function findRootContainerNode(inst) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  if (typeof inst.tag === 'number') {
    while (inst['return']) {
      inst = inst['return'];
    }
    if (inst.tag !== HostRoot) {
      // This can happen if we're in a detached tree.
      return null;
    }
    return inst.stateNode.containerInfo;
  } else {
    while (inst._hostParent) {
      inst = inst._hostParent;
    }
    var rootNode = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    return rootNode.parentNode;
  }
}

// Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.targetInst = targetInst;
  this.ancestors = [];
}
index(TopLevelCallbackBookKeeping.prototype, {
  destructor: function () {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.targetInst = null;
    this.ancestors.length = 0;
  }
});
PooledClass_1.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass_1.threeArgumentPooler);

function handleTopLevelImpl(bookKeeping) {
  var targetInst = bookKeeping.targetInst;

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root = findRootContainerNode(ancestor);
    if (!root) {
      break;
    }
    bookKeeping.ancestors.push(ancestor);
    ancestor = ReactDOMComponentTree_1.getClosestInstanceFromNode(root);
  } while (ancestor);

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget_1(bookKeeping.nativeEvent));
  }
}

function scrollValueMonitor(cb) {
  var scrollPosition = getUnboundedScrollPosition_1(window);
  cb(scrollPosition);
}

var ReactEventListener = {
  _enabled: true,
  _handleTopLevel: null,

  setHandleTopLevel: function (handleTopLevel) {
    ReactEventListener._handleTopLevel = handleTopLevel;
  },

  setEnabled: function (enabled) {
    ReactEventListener._enabled = !!enabled;
  },

  isEnabled: function () {
    return ReactEventListener._enabled;
  },

  /**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
    if (!element) {
      return null;
    }
    return EventListener_1.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  /**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapCapturedEvent: function (topLevelType, handlerBaseName, element) {
    if (!element) {
      return null;
    }
    return EventListener_1.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  monitorScrollValue: function (refresh) {
    var callback = scrollValueMonitor.bind(null, refresh);
    EventListener_1.listen(window, 'scroll', callback);
  },

  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var nativeEventTarget = getEventTarget_1(nativeEvent);
    var targetInst = ReactDOMComponentTree_1.getClosestInstanceFromNode(nativeEventTarget);

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent, targetInst);

    try {
      // Event queue being processed in the same cycle allows
      // `preventDefault`.
      ReactGenericBatching_1.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
};

var ReactEventListener_1 = ReactEventListener;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SVGDOMPropertyConfig
 */

var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

// We use attributes for everything SVG so let's avoid some duplication and run
// code instead.
// The following are all specified in the HTML config already so we exclude here.
// - class (as className)
// - color
// - height
// - id
// - lang
// - max
// - media
// - method
// - min
// - name
// - style
// - target
// - type
// - width
var ATTRS = {
  accentHeight: 'accent-height',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 'alignment-baseline',
  allowReorder: 'allowReorder',
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 'arabic-form',
  ascent: 0,
  attributeName: 'attributeName',
  attributeType: 'attributeType',
  autoReverse: 'autoReverse',
  azimuth: 0,
  baseFrequency: 'baseFrequency',
  baseProfile: 'baseProfile',
  baselineShift: 'baseline-shift',
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 'calcMode',
  capHeight: 'cap-height',
  clip: 0,
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  clipPathUnits: 'clipPathUnits',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  contentScriptType: 'contentScriptType',
  contentStyleType: 'contentStyleType',
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 'diffuseConstant',
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 'dominant-baseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 'edgeMode',
  elevation: 0,
  enableBackground: 'enable-background',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 'externalResourcesRequired',
  fill: 0,
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 0,
  filterRes: 'filterRes',
  filterUnits: 'filterUnits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  focusable: 0,
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphRef',
  gradientTransform: 'gradientTransform',
  gradientUnits: 'gradientUnits',
  hanging: 0,
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  ideographic: 0,
  imageRendering: 'image-rendering',
  'in': 0,
  in2: 0,
  intercept: 0,
  k: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  kernelMatrix: 'kernelMatrix',
  kernelUnitLength: 'kernelUnitLength',
  kerning: 0,
  keyPoints: 'keyPoints',
  keySplines: 'keySplines',
  keyTimes: 'keyTimes',
  lengthAdjust: 'lengthAdjust',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  limitingConeAngle: 'limitingConeAngle',
  local: 0,
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerHeight: 'markerHeight',
  markerUnits: 'markerUnits',
  markerWidth: 'markerWidth',
  mask: 0,
  maskContentUnits: 'maskContentUnits',
  maskUnits: 'maskUnits',
  mathematical: 0,
  mode: 0,
  numOctaves: 'numOctaves',
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  paintOrder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathLength',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  patternUnits: 'patternUnits',
  pointerEvents: 'pointer-events',
  points: 0,
  pointsAtX: 'pointsAtX',
  pointsAtY: 'pointsAtY',
  pointsAtZ: 'pointsAtZ',
  preserveAlpha: 'preserveAlpha',
  preserveAspectRatio: 'preserveAspectRatio',
  primitiveUnits: 'primitiveUnits',
  r: 0,
  radius: 0,
  refX: 'refX',
  refY: 'refY',
  renderingIntent: 'rendering-intent',
  repeatCount: 'repeatCount',
  repeatDur: 'repeatDur',
  requiredExtensions: 'requiredExtensions',
  requiredFeatures: 'requiredFeatures',
  restart: 0,
  result: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  seed: 0,
  shapeRendering: 'shape-rendering',
  slope: 0,
  spacing: 0,
  specularConstant: 'specularConstant',
  specularExponent: 'specularExponent',
  speed: 0,
  spreadMethod: 'spreadMethod',
  startOffset: 'startOffset',
  stdDeviation: 'stdDeviation',
  stemh: 0,
  stemv: 0,
  stitchTiles: 'stitchTiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  surfaceScale: 'surfaceScale',
  systemLanguage: 'systemLanguage',
  tableValues: 'tableValues',
  targetX: 'targetX',
  targetY: 'targetY',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  textLength: 'textLength',
  to: 0,
  transform: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  unicode: 0,
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  vAlphabetic: 'v-alphabetic',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  vMathematical: 'v-mathematical',
  values: 0,
  vectorEffect: 'vector-effect',
  version: 0,
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  viewBox: 'viewBox',
  viewTarget: 'viewTarget',
  visibility: 0,
  widths: 0,
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  x: 0,
  xHeight: 'x-height',
  x1: 0,
  x2: 0,
  xChannelSelector: 'xChannelSelector',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xmlBase: 'xml:base',
  xmlns: 0,
  xmlnsXlink: 'xmlns:xlink',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  y: 0,
  y1: 0,
  y2: 0,
  yChannelSelector: 'yChannelSelector',
  z: 0,
  zoomAndPan: 'zoomAndPan'
};

var SVGDOMPropertyConfig = {
  Properties: {},
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  },
  DOMAttributeNames: {}
};

Object.keys(ATTRS).forEach(function (key) {
  SVGDOMPropertyConfig.Properties[key] = 0;
  if (ATTRS[key]) {
    SVGDOMPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
  }
});

var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getNodeForCharacterOffset
 */

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */

function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

var getNodeForCharacterOffset_1 = getNodeForCharacterOffset;

/**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */
function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);

  // In Firefox, range.startContainer and range.endContainer can be "anonymous
  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
  // divs do not seem to expose properties, triggering a "Permission denied
  // error" if any of its properties are accessed. The only seemingly possible
  // way to avoid erroring is to access a property that typically works for
  // non-anonymous divs and catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
  try {
    /* eslint-disable no-unused-expressions */
    currentRange.startContainer.nodeType;
    currentRange.endContainer.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  // If the node and offset values are the same, the selection is collapsed.
  // `Selection.isCollapsed` is available natively, but IE sometimes gets
  // this value wrong.
  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor_1()].length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset_1(node, start);
  var endMarker = getNodeForCharacterOffset_1(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

var ReactDOMSelection = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: getModernOffsets,

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: setModernOffsets
};

var ReactDOMSelection_1 = ReactDOMSelection;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

var isNode_1 = isNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode_1(object) && object.nodeType == 3;
}

var isTextNode_1 = isTextNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode_1(outerNode)) {
    return false;
  } else if (isTextNode_1(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

var containsNode_1 = containsNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

var focusNode_1 = focusNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

var getActiveElement_1 = getActiveElement;

function isInDocument(node) {
  return containsNode_1(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection = {
  hasSelectionCapabilities: function (elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
  },

  getSelectionInformation: function () {
    var focusedElem = getActiveElement_1();
    return {
      focusedElem: focusedElem,
      selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function (priorSelectionInformation) {
    var curFocusedElem = getActiveElement_1();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
      }

      // Focusing a node can change the scroll position, which is undesirable
      var ancestors = [];
      var ancestor = priorFocusedElem;
      while (ancestor = ancestor.parentNode) {
        if (ancestor.nodeType === 1) {
          ancestors.push({
            element: ancestor,
            left: ancestor.scrollLeft,
            top: ancestor.scrollTop
          });
        }
      }

      focusNode_1(priorFocusedElem);

      for (var i = 0; i < ancestors.length; i++) {
        var info = ancestors[i];
        info.element.scrollLeft = info.left;
        info.element.scrollTop = info.top;
      }
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function (input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection_1.getOffsets(input);
    }

    return selection || { start: 0, end: 0 };
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function (input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (end === undefined) {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else {
      ReactDOMSelection_1.setOffsets(input, offsets);
    }
  }
};

var ReactInputSelection_1 = ReactInputSelection;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

var skipSelectionChangeEvent = ExecutionEnvironment_1.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: 'onSelect',
      captured: 'onSelectCapture'
    },
    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
  }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

// Track whether all listeners exists for this plugin. If none exist, we do
// not extract events. See #3639.
var isListeningToAllDependencies = ReactBrowserEventEmitter_1.isListeningToAllDependencies;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && ReactInputSelection_1.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement_1()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement$1);
  if (!lastSelection || !shallowEqual_1(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent_1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement$1;

    EventPropagators_1.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {
  eventTypes: eventTypes$3,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === 9 ? nativeEventTarget : nativeEventTarget.ownerDocument;
    if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
      return null;
    }

    var targetNode = targetInst ? ReactDOMComponentTree_1.getNodeFromInstance(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case 'topFocus':
        if (isTextInputElement_1(targetNode) || targetNode.contentEditable === 'true') {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case 'topBlur':
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;

      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case 'topMouseDown':
        mouseDown = true;
        break;
      case 'topContextMenu':
      case 'topMouseUp':
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);

      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case 'topSelectionChange':
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case 'topKeyDown':
      case 'topKeyUp':
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  }
};

var SelectEventPlugin_1 = SelectEventPlugin;

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);

var SyntheticAnimationEvent_1 = SyntheticAnimationEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

var SyntheticClipboardEvent_1 = SyntheticClipboardEvent;

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticFocusEvent, FocusEventInterface);

var SyntheticFocusEvent_1 = SyntheticFocusEvent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventCharCode
 */

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */

function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

var getEventCharCode_1 = getEventCharCode;

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode_1(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

var getEventKey_1 = getEventKey;

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey_1,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState_1,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode_1(event);
    }
    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode_1(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

var SyntheticKeyboardEvent_1 = SyntheticKeyboardEvent;

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent_1.augmentClass(SyntheticDragEvent, DragEventInterface);

var SyntheticDragEvent_1 = SyntheticDragEvent;

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState_1
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticTouchEvent, TouchEventInterface);

var SyntheticTouchEvent_1 = SyntheticTouchEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */
var TransitionEventInterface = {
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);

var SyntheticTransitionEvent_1 = SyntheticTransitionEvent;

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent_1.augmentClass(SyntheticWheelEvent, WheelEventInterface);

var SyntheticWheelEvent_1 = SyntheticWheelEvent;

/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */
var eventTypes$4 = {};
var topLevelEventsToDispatchConfig = {};
['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'cancel', 'canPlay', 'canPlayThrough', 'click', 'close', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'toggle', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  var onEvent = 'on' + capitalizedEvent;
  var topEvent = 'top' + capitalizedEvent;

  var type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture'
    },
    dependencies: [topEvent]
  };
  eventTypes$4[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
});

var SimpleEventPlugin = {
  eventTypes: eventTypes$4,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case 'topAbort':
      case 'topCancel':
      case 'topCanPlay':
      case 'topCanPlayThrough':
      case 'topClose':
      case 'topDurationChange':
      case 'topEmptied':
      case 'topEncrypted':
      case 'topEnded':
      case 'topError':
      case 'topInput':
      case 'topInvalid':
      case 'topLoad':
      case 'topLoadedData':
      case 'topLoadedMetadata':
      case 'topLoadStart':
      case 'topPause':
      case 'topPlay':
      case 'topPlaying':
      case 'topProgress':
      case 'topRateChange':
      case 'topReset':
      case 'topSeeked':
      case 'topSeeking':
      case 'topStalled':
      case 'topSubmit':
      case 'topSuspend':
      case 'topTimeUpdate':
      case 'topToggle':
      case 'topVolumeChange':
      case 'topWaiting':
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent_1;
        break;
      case 'topKeyPress':
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode_1(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case 'topKeyDown':
      case 'topKeyUp':
        EventConstructor = SyntheticKeyboardEvent_1;
        break;
      case 'topBlur':
      case 'topFocus':
        EventConstructor = SyntheticFocusEvent_1;
        break;
      case 'topClick':
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case 'topDoubleClick':
      case 'topMouseDown':
      case 'topMouseMove':
      case 'topMouseUp':
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case 'topMouseOut':
      case 'topMouseOver':
      case 'topContextMenu':
        EventConstructor = SyntheticMouseEvent_1;
        break;
      case 'topDrag':
      case 'topDragEnd':
      case 'topDragEnter':
      case 'topDragExit':
      case 'topDragLeave':
      case 'topDragOver':
      case 'topDragStart':
      case 'topDrop':
        EventConstructor = SyntheticDragEvent_1;
        break;
      case 'topTouchCancel':
      case 'topTouchEnd':
      case 'topTouchMove':
      case 'topTouchStart':
        EventConstructor = SyntheticTouchEvent_1;
        break;
      case 'topAnimationEnd':
      case 'topAnimationIteration':
      case 'topAnimationStart':
        EventConstructor = SyntheticAnimationEvent_1;
        break;
      case 'topTransitionEnd':
        EventConstructor = SyntheticTransitionEvent_1;
        break;
      case 'topScroll':
        EventConstructor = SyntheticUIEvent_1;
        break;
      case 'topWheel':
        EventConstructor = SyntheticWheelEvent_1;
        break;
      case 'topCopy':
      case 'topCut':
      case 'topPaste':
        EventConstructor = SyntheticClipboardEvent_1;
        break;
    }
    !EventConstructor ? invariant_1(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : void 0;
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    EventPropagators_1.accumulateTwoPhaseDispatches(event);
    return event;
  }
};

var SimpleEventPlugin_1 = SimpleEventPlugin;

var alreadyInjected = false;

function inject() {
  if (alreadyInjected) {
    // TODO: This is currently true because these injections are shared between
    // the client and the server package. They should be built independently
    // and not share any injection state. Then this problem will be solved.
    return;
  }
  alreadyInjected = true;

  ReactBrowserEventEmitter_1.injection.injectReactEventListener(ReactEventListener_1);

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  EventPluginHub_1.injection.injectEventPluginOrder(DOMEventPluginOrder_1);
  EventPluginUtils_1.injection.injectComponentTree(ReactDOMComponentTree_1);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  EventPluginHub_1.injection.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin_1,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin_1,
    ChangeEventPlugin: ChangeEventPlugin_1,
    SelectEventPlugin: SelectEventPlugin_1,
    BeforeInputEventPlugin: BeforeInputEventPlugin_1
  });

  DOMProperty_1.injection.injectDOMPropertyConfig(ARIADOMPropertyConfig_1);
  DOMProperty_1.injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig_1);
  DOMProperty_1.injection.injectDOMPropertyConfig(SVGDOMPropertyConfig_1);
}

var ReactDOMInjection = {
  inject: inject
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactTypeOfSideEffect
 * 
 */

var ReactTypeOfSideEffect = {
  NoEffect: 0, // 0b0000000
  Placement: 1, // 0b0000001
  Update: 2, // 0b0000010
  PlacementAndUpdate: 3, // 0b0000011
  Deletion: 4, // 0b0000100
  ContentReset: 8, // 0b0001000
  Callback: 16, // 0b0010000
  Err: 32, // 0b0100000
  Ref: 64 };

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPriorityLevel
 * 
 */

var ReactPriorityLevel = {
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. Synchronous side-effects.
  TaskPriority: 2, // Completes at the end of the current tick.
  AnimationPriority: 3, // Needs to complete before the next frame.
  HighPriority: 4, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 5, // Data fetching, or result from updating stores.
  OffscreenPriority: 6 };

var CallbackEffect = ReactTypeOfSideEffect.Callback;

var NoWork = ReactPriorityLevel.NoWork;
var SynchronousPriority = ReactPriorityLevel.SynchronousPriority;
var TaskPriority = ReactPriorityLevel.TaskPriority;


{
  var warning$3 = warning_1;
}

// Callbacks are not validated until invocation


// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.


function comparePriority(a, b) {
  // When comparing update priorities, treat sync and Task work as equal.
  // TODO: Could we avoid the need for this by always coercing sync priority
  // to Task when scheduling an update?
  if ((a === TaskPriority || a === SynchronousPriority) && (b === TaskPriority || b === SynchronousPriority)) {
    return 0;
  }
  if (a === NoWork && b !== NoWork) {
    return -255;
  }
  if (a !== NoWork && b === NoWork) {
    return 255;
  }
  return a - b;
}

// Ensures that a fiber has an update queue, creating a new one if needed.
// Returns the new or existing queue.
function ensureUpdateQueue(fiber) {
  if (fiber.updateQueue !== null) {
    // We already have an update queue.
    return fiber.updateQueue;
  }

  var queue = void 0;
  {
    queue = {
      first: null,
      last: null,
      hasForceUpdate: false,
      callbackList: null,
      isProcessing: false
    };
  }

  fiber.updateQueue = queue;
  return queue;
}

// Clones an update queue from a source fiber onto its alternate.
function cloneUpdateQueue(current, workInProgress) {
  var currentQueue = current.updateQueue;
  if (currentQueue === null) {
    // The source fiber does not have an update queue.
    workInProgress.updateQueue = null;
    return null;
  }
  // If the alternate already has a queue, reuse the previous object.
  var altQueue = workInProgress.updateQueue !== null ? workInProgress.updateQueue : {};
  altQueue.first = currentQueue.first;
  altQueue.last = currentQueue.last;

  // These fields are invalid by the time we clone from current. Reset them.
  altQueue.hasForceUpdate = false;
  altQueue.callbackList = null;
  altQueue.isProcessing = false;

  workInProgress.updateQueue = altQueue;

  return altQueue;
}
var cloneUpdateQueue_1 = cloneUpdateQueue;

function cloneUpdate(update) {
  return {
    priorityLevel: update.priorityLevel,
    partialState: update.partialState,
    callback: update.callback,
    isReplace: update.isReplace,
    isForced: update.isForced,
    isTopLevelUnmount: update.isTopLevelUnmount,
    next: null
  };
}

function insertUpdateIntoQueue(queue, update, insertAfter, insertBefore) {
  if (insertAfter !== null) {
    insertAfter.next = update;
  } else {
    // This is the first item in the queue.
    update.next = queue.first;
    queue.first = update;
  }

  if (insertBefore !== null) {
    update.next = insertBefore;
  } else {
    // This is the last item in the queue.
    queue.last = update;
  }
}

// Returns the update after which the incoming update should be inserted into
// the queue, or null if it should be inserted at beginning.
function findInsertionPosition(queue, update) {
  var priorityLevel = update.priorityLevel;
  var insertAfter = null;
  var insertBefore = null;
  if (queue.last !== null && comparePriority(queue.last.priorityLevel, priorityLevel) <= 0) {
    // Fast path for the common case where the update should be inserted at
    // the end of the queue.
    insertAfter = queue.last;
  } else {
    insertBefore = queue.first;
    while (insertBefore !== null && comparePriority(insertBefore.priorityLevel, priorityLevel) <= 0) {
      insertAfter = insertBefore;
      insertBefore = insertBefore.next;
    }
  }
  return insertAfter;
}

// The work-in-progress queue is a subset of the current queue (if it exists).
// We need to insert the incoming update into both lists. However, it's possible
// that the correct position in one list will be different from the position in
// the other. Consider the following case:
//
//     Current:             3-5-6
//     Work-in-progress:        6
//
// Then we receive an update with priority 4 and insert it into each list:
//
//     Current:             3-4-5-6
//     Work-in-progress:        4-6
//
// In the current queue, the new update's `next` pointer points to the update
// with priority 5. But in the work-in-progress queue, the pointer points to the
// update with priority 6. Because these two queues share the same persistent
// data structure, this won't do. (This can only happen when the incoming update
// has higher priority than all the updates in the work-in-progress queue.)
//
// To solve this, in the case where the incoming update needs to be inserted
// into two different positions, we'll make a clone of the update and insert
// each copy into a separate queue. This forks the list while maintaining a
// persistent structure, because the update that is added to the work-in-progress
// is always added to the front of the list.
//
// However, if incoming update is inserted into the same position of both lists,
// we shouldn't make a copy.
//
// If the update is cloned, it returns the cloned update.
function insertUpdate(fiber, update) {
  var queue1 = ensureUpdateQueue(fiber);
  var queue2 = fiber.alternate !== null ? ensureUpdateQueue(fiber.alternate) : null;

  // Warn if an update is scheduled from inside an updater function.
  {
    if (queue1.isProcessing || queue2 !== null && queue2.isProcessing) {
      warning$3(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
    }
  }

  // Find the insertion position in the first queue.
  var insertAfter1 = findInsertionPosition(queue1, update);
  var insertBefore1 = insertAfter1 !== null ? insertAfter1.next : queue1.first;

  if (queue2 === null) {
    // If there's no alternate queue, there's nothing else to do but insert.
    insertUpdateIntoQueue(queue1, update, insertAfter1, insertBefore1);
    return null;
  }

  // If there is an alternate queue, find the insertion position.
  var insertAfter2 = findInsertionPosition(queue2, update);
  var insertBefore2 = insertAfter2 !== null ? insertAfter2.next : queue2.first;

  // Now we can insert into the first queue. This must come after finding both
  // insertion positions because it mutates the list.
  insertUpdateIntoQueue(queue1, update, insertAfter1, insertBefore1);

  if (insertBefore1 !== insertBefore2) {
    // The insertion positions are different, so we need to clone the update and
    // insert the clone into the alternate queue.
    var update2 = cloneUpdate(update);
    insertUpdateIntoQueue(queue2, update2, insertAfter2, insertBefore2);
    return update2;
  } else {
    // The insertion positions are the same, so when we inserted into the first
    // queue, it also inserted into the alternate. All we need to do is update
    // the alternate queue's `first` and `last` pointers, in case they
    // have changed.
    if (insertAfter2 === null) {
      queue2.first = update;
    }
    if (insertBefore2 === null) {
      queue2.last = null;
    }
  }

  return null;
}

function addUpdate(fiber, partialState, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: partialState,
    callback: callback,
    isReplace: false,
    isForced: false,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addUpdate_1 = addUpdate;

function addReplaceUpdate(fiber, state, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: state,
    callback: callback,
    isReplace: true,
    isForced: false,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addReplaceUpdate_1 = addReplaceUpdate;

function addForceUpdate(fiber, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: null,
    callback: callback,
    isReplace: false,
    isForced: true,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addForceUpdate_1 = addForceUpdate;

function getPendingPriority(queue) {
  return queue.first !== null ? queue.first.priorityLevel : NoWork;
}
var getPendingPriority_1 = getPendingPriority;

function addTopLevelUpdate$1(fiber, partialState, callback, priorityLevel) {
  var isTopLevelUnmount = partialState.element === null;

  var update = {
    priorityLevel: priorityLevel,
    partialState: partialState,
    callback: callback,
    isReplace: false,
    isForced: false,
    isTopLevelUnmount: isTopLevelUnmount,
    next: null
  };
  var update2 = insertUpdate(fiber, update);

  if (isTopLevelUnmount) {
    // Drop all updates that are lower-priority, so that the tree is not
    // remounted. We need to do this for both queues.
    var queue1 = fiber.updateQueue;
    var queue2 = fiber.alternate !== null ? fiber.alternate.updateQueue : null;

    if (queue1 !== null && update.next !== null) {
      update.next = null;
      queue1.last = update;
    }
    if (queue2 !== null && update2 !== null && update2.next !== null) {
      update2.next = null;
      queue2.last = update;
    }
  }
}
var addTopLevelUpdate_1 = addTopLevelUpdate$1;

function getStateFromUpdate(update, instance, prevState, props) {
  var partialState = update.partialState;
  if (typeof partialState === 'function') {
    var updateFn = partialState;
    return updateFn.call(instance, prevState, props);
  } else {
    return partialState;
  }
}

function beginUpdateQueue(workInProgress, queue, instance, prevState, props, priorityLevel) {
  {
    // Set this flag so we can warn if setState is called inside the update
    // function of another setState.
    queue.isProcessing = true;
  }

  queue.hasForceUpdate = false;

  // Applies updates with matching priority to the previous state to create
  // a new state object.
  var state = prevState;
  var dontMutatePrevState = true;
  var callbackList = null;
  var update = queue.first;
  while (update !== null && comparePriority(update.priorityLevel, priorityLevel) <= 0) {
    // Remove each update from the queue right before it is processed. That way
    // if setState is called from inside an updater function, the new update
    // will be inserted in the correct position.
    queue.first = update.next;
    if (queue.first === null) {
      queue.last = null;
    }

    var _partialState = void 0;
    if (update.isReplace) {
      state = getStateFromUpdate(update, instance, state, props);
      dontMutatePrevState = true;
    } else {
      _partialState = getStateFromUpdate(update, instance, state, props);
      if (_partialState) {
        if (dontMutatePrevState) {
          state = index({}, state, _partialState);
        } else {
          state = index(state, _partialState);
        }
        dontMutatePrevState = false;
      }
    }
    if (update.isForced) {
      queue.hasForceUpdate = true;
    }
    // Second condition ignores top-level unmount callbacks if they are not the
    // last update in the queue, since a subsequent update will cause a remount.
    if (update.callback !== null && !(update.isTopLevelUnmount && update.next !== null)) {
      callbackList = callbackList || [];
      callbackList.push(update.callback);
      workInProgress.effectTag |= CallbackEffect;
    }
    update = update.next;
  }

  queue.callbackList = callbackList;

  if (queue.first === null && callbackList === null && !queue.hasForceUpdate) {
    // The queue is empty and there are no callbacks. We can reset it.
    workInProgress.updateQueue = null;
  }

  {
    queue.isProcessing = false;
  }

  return state;
}
var beginUpdateQueue_1 = beginUpdateQueue;

function commitCallbacks(finishedWork, queue, context) {
  var callbackList = queue.callbackList;
  if (callbackList === null) {
    return;
  }
  for (var i = 0; i < callbackList.length; i++) {
    var _callback = callbackList[i];
    invariant_1(typeof _callback === 'function', 'Invalid argument passed as callback. Expected a function. Instead ' + 'received: %s', _callback);
    _callback.call(context);
  }
}
var commitCallbacks_1 = commitCallbacks;

var ReactFiberUpdateQueue = {
	cloneUpdateQueue: cloneUpdateQueue_1,
	addUpdate: addUpdate_1,
	addReplaceUpdate: addReplaceUpdate_1,
	addForceUpdate: addForceUpdate_1,
	getPendingPriority: getPendingPriority_1,
	addTopLevelUpdate: addTopLevelUpdate_1,
	beginUpdateQueue: beginUpdateQueue_1,
	commitCallbacks: commitCallbacks_1
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var emptyObject = {};

{
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstanceMap
 */

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {
  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function (key) {
    key._reactInternalInstance = undefined;
  },

  get: function (key) {
    return key._reactInternalInstance;
  },

  has: function (key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function (key, value) {
    key._reactInternalInstance = value;
  }
};

var ReactInstanceMap_1 = ReactInstanceMap;

var ReactInternals$1 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactCurrentOwnerRollupShim = ReactInternals$1.ReactCurrentOwner;

{
  var warning$4 = warning_1;
}

var HostRoot$2 = ReactTypeOfWork.HostRoot;
var HostComponent$3 = ReactTypeOfWork.HostComponent;
var HostText$1 = ReactTypeOfWork.HostText;
var ClassComponent$2 = ReactTypeOfWork.ClassComponent;

var NoEffect = ReactTypeOfSideEffect.NoEffect;
var Placement = ReactTypeOfSideEffect.Placement;

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    if ((node.effectTag & Placement) !== NoEffect) {
      return MOUNTING;
    }
    while (node['return']) {
      node = node['return'];
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
    }
  } else {
    while (node['return']) {
      node = node['return'];
    }
  }
  if (node.tag === HostRoot$2) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return MOUNTED;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return UNMOUNTED;
}
var isFiberMounted$1 = function (fiber) {
  return isFiberMountedImpl(fiber) === MOUNTED;
};

var isMounted = function (component) {
  {
    var owner = ReactCurrentOwnerRollupShim.current;
    if (owner !== null && owner.tag === ClassComponent$2) {
      var ownerFiber = owner;
      var instance = ownerFiber.stateNode;
      warning$4(instance._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName_1(ownerFiber) || 'A component');
      instance._warnedAboutRefsInRender = true;
    }
  }

  var fiber = ReactInstanceMap_1.get(component);
  if (!fiber) {
    return false;
  }
  return isFiberMountedImpl(fiber) === MOUNTED;
};

function assertIsMounted(fiber) {
  invariant_1(isFiberMountedImpl(fiber) === MOUNTED, 'Unable to find node on an unmounted component.');
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var state = isFiberMountedImpl(fiber);
    invariant_1(state !== UNMOUNTED, 'Unable to find node on an unmounted component.');
    if (state === MOUNTING) {
      return null;
    }
    return fiber;
  }
  // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a['return'];
    var parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) {
      // We're at the root.
      break;
    }

    // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.
      invariant_1(false, 'Unable to find node on an unmounted component.');
    }

    if (a['return'] !== b['return']) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers pointer to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        invariant_1(didFindChild, 'Child was not found in either parent set. This indicates a bug ' + 'related to the return pointer.');
      }
    }

    invariant_1(a.alternate === b, "Return fibers should always be each others' alternates.");
  }
  // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.
  invariant_1(a.tag === HostRoot$2, 'Unable to find node on an unmounted component.');
  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  }
  // Otherwise B has to be current branch.
  return alternate;
}
var findCurrentFiberUsingSlowPath_1 = findCurrentFiberUsingSlowPath;

var findCurrentHostFiber$1 = function (parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent$3 || node.tag === HostText$1) {
      return node;
    } else if (node.child) {
      // TODO: If we hit a Portal, we're supposed to skip it.
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
};

var ReactFiberTreeReflection = {
	isFiberMounted: isFiberMounted$1,
	isMounted: isMounted,
	findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath_1,
	findCurrentHostFiber: findCurrentHostFiber$1
};

var valueStack = [];

{
  var fiberStack = [];
}

var index$2 = -1;

var createCursor$1 = function (defaultValue) {
  return {
    current: defaultValue
  };
};

var isEmpty = function () {
  return index$2 === -1;
};

var pop$1 = function (cursor, fiber) {
  if (index$2 < 0) {
    {
      warning_1(false, 'Unexpected pop.');
    }
    return;
  }

  {
    if (fiber !== fiberStack[index$2]) {
      warning_1(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index$2];

  valueStack[index$2] = null;

  {
    fiberStack[index$2] = null;
  }

  index$2--;
};

var push$1 = function (cursor, value, fiber) {
  index$2++;

  valueStack[index$2] = cursor.current;

  {
    fiberStack[index$2] = fiber;
  }

  cursor.current = value;
};

var reset = function () {
  while (index$2 > -1) {
    valueStack[index$2] = null;

    {
      fiberStack[index$2] = null;
    }

    index$2--;
  }
};

var ReactFiberStack = {
	createCursor: createCursor$1,
	isEmpty: isEmpty,
	pop: pop$1,
	push: push$1,
	reset: reset
};

var ReactInternals$2 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactDebugCurrentFrameRollupShim = ReactInternals$2.ReactDebugCurrentFrame;

// Trust the developer to only use this with a true check
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugFiberPerf
 * 
 */

var ReactDebugFiberPerf = null;

{
  var _require$4 = ReactTypeOfWork,
      HostRoot$3 = _require$4.HostRoot,
      HostComponent$4 = _require$4.HostComponent,
      HostText$2 = _require$4.HostText,
      HostPortal = _require$4.HostPortal,
      YieldComponent = _require$4.YieldComponent,
      Fragment = _require$4.Fragment;

  var getComponentName$4 = getComponentName_1;

  // Prefix measurements so that it's possible to filter them.
  // Longer prefixes are hard to read in DevTools.
  var reactEmoji = '\u269B';
  var warningEmoji = '\u26D4';
  var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  // Keep track of current fiber so that we know the path to unwind on pause.
  // TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
  var currentFiber = null;
  // If we're in the middle of user code, which fiber and method is it?
  // Reusing `currentFiber` would be confusing for this because user code fiber
  // can change during commit phase too, but we don't need to unwind it (since
  // lifecycles in the commit phase don't resemble a tree).
  var currentPhase = null;
  var currentPhaseFiber = null;
  // Did lifecycle hook schedule an update? This is often a performance problem,
  // so we will keep track of it, and include it in the report.
  // Track commits caused by cascading updates.
  var isCommitting = false;
  var hasScheduledUpdateInCurrentCommit = false;
  var hasScheduledUpdateInCurrentPhase = false;
  var commitCountInCurrentWorkLoop = 0;
  var effectCountInCurrentCommit = 0;
  // During commits, we only show a measurement once per method name
  // to avoid stretch the commit phase with measurement overhead.
  var labelsInCurrentCommit = new Set();

  var formatMarkName = function (markName) {
    return reactEmoji + ' ' + markName;
  };

  var formatLabel = function (label, warning) {
    var prefix = warning ? warningEmoji + ' ' : reactEmoji + ' ';
    var suffix = warning ? ' Warning: ' + warning : '';
    return '' + prefix + label + suffix;
  };

  var beginMark = function (markName) {
    performance.mark(formatMarkName(markName));
  };

  var clearMark = function (markName) {
    performance.clearMarks(formatMarkName(markName));
  };

  var endMark = function (label, markName, warning) {
    var formattedMarkName = formatMarkName(markName);
    var formattedLabel = formatLabel(label, warning);
    try {
      performance.measure(formattedLabel, formattedMarkName);
    } catch (err) {}
    // If previous mark was missing for some reason, this will throw.
    // This could only happen if React crashed in an unexpected place earlier.
    // Don't pile on with more errors.

    // Clear marks immediately to avoid growing buffer.
    performance.clearMarks(formattedMarkName);
    performance.clearMeasures(formattedLabel);
  };

  var getFiberMarkName = function (label, debugID) {
    return label + ' (#' + debugID + ')';
  };

  var getFiberLabel = function (componentName, isMounted, phase) {
    if (phase === null) {
      // These are composite component total time measurements.
      return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
    } else {
      // Composite component methods.
      return componentName + '.' + phase;
    }
  };

  var beginFiberMark = function (fiber, phase) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);

    if (isCommitting && labelsInCurrentCommit.has(label)) {
      // During the commit phase, we don't show duplicate labels because
      // there is a fixed overhead for every measurement, and we don't
      // want to stretch the commit phase beyond necessary.
      return false;
    }
    labelsInCurrentCommit.add(label);

    var markName = getFiberMarkName(label, debugID);
    beginMark(markName);
    return true;
  };

  var clearFiberMark = function (fiber, phase) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);
    var markName = getFiberMarkName(label, debugID);
    clearMark(markName);
  };

  var endFiberMark = function (fiber, phase, warning) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);
    var markName = getFiberMarkName(label, debugID);
    endMark(label, markName, warning);
  };

  var shouldIgnoreFiber = function (fiber) {
    // Host components should be skipped in the timeline.
    // We could check typeof fiber.type, but does this work with RN?
    switch (fiber.tag) {
      case HostRoot$3:
      case HostComponent$4:
      case HostText$2:
      case HostPortal:
      case YieldComponent:
      case Fragment:
        return true;
      default:
        return false;
    }
  };

  var clearPendingPhaseMeasurement = function () {
    if (currentPhase !== null && currentPhaseFiber !== null) {
      clearFiberMark(currentPhaseFiber, currentPhase);
    }
    currentPhaseFiber = null;
    currentPhase = null;
    hasScheduledUpdateInCurrentPhase = false;
  };

  var pauseTimers = function () {
    // Stops all currently active measurements so that they can be resumed
    // if we continue in a later deferred loop from the same unit of work.
    var fiber = currentFiber;
    while (fiber) {
      if (fiber._debugIsCurrentlyTiming) {
        endFiberMark(fiber, null, null);
      }
      fiber = fiber['return'];
    }
  };

  var resumeTimersRecursively = function (fiber) {
    if (fiber['return'] !== null) {
      resumeTimersRecursively(fiber['return']);
    }
    if (fiber._debugIsCurrentlyTiming) {
      beginFiberMark(fiber, null);
    }
  };

  var resumeTimers = function () {
    // Resumes all measurements that were active during the last deferred loop.
    if (currentFiber !== null) {
      resumeTimersRecursively(currentFiber);
    }
  };

  ReactDebugFiberPerf = {
    recordEffect: function () {
      effectCountInCurrentCommit++;
    },
    recordScheduleUpdate: function () {
      if (isCommitting) {
        hasScheduledUpdateInCurrentCommit = true;
      }
      if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
        hasScheduledUpdateInCurrentPhase = true;
      }
    },
    startWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // If we pause, this is the fiber to unwind from.
      currentFiber = fiber;
      if (!beginFiberMark(fiber, null)) {
        return;
      }
      fiber._debugIsCurrentlyTiming = true;
    },
    cancelWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // Remember we shouldn't complete measurement for this fiber.
      // Otherwise flamechart will be deep even for small updates.
      fiber._debugIsCurrentlyTiming = false;
      clearFiberMark(fiber, null);
    },
    stopWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // If we pause, its parent is the fiber to unwind from.
      currentFiber = fiber['return'];
      if (!fiber._debugIsCurrentlyTiming) {
        return;
      }
      fiber._debugIsCurrentlyTiming = false;
      endFiberMark(fiber, null, null);
    },
    startPhaseTimer: function (fiber, phase) {
      if (!supportsUserTiming) {
        return;
      }
      clearPendingPhaseMeasurement();
      if (!beginFiberMark(fiber, phase)) {
        return;
      }
      currentPhaseFiber = fiber;
      currentPhase = phase;
    },
    stopPhaseTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      if (currentPhase !== null && currentPhaseFiber !== null) {
        var warning = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
        endFiberMark(currentPhaseFiber, currentPhase, warning);
      }
      currentPhase = null;
      currentPhaseFiber = null;
    },
    startWorkLoopTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      commitCountInCurrentWorkLoop = 0;
      // This is top level call.
      // Any other measurements are performed within.
      beginMark('(React Tree Reconciliation)');
      // Resume any measurements that were in progress during the last loop.
      resumeTimers();
    },
    stopWorkLoopTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var warning = commitCountInCurrentWorkLoop > 1 ? 'There were cascading updates' : null;
      commitCountInCurrentWorkLoop = 0;
      // Pause any measurements until the next loop.
      pauseTimers();
      endMark('(React Tree Reconciliation)', '(React Tree Reconciliation)', warning);
    },
    startCommitTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      isCommitting = true;
      hasScheduledUpdateInCurrentCommit = false;
      labelsInCurrentCommit.clear();
      beginMark('(Committing Changes)');
    },
    stopCommitTimer: function () {
      if (!supportsUserTiming) {
        return;
      }

      var warning = null;
      if (hasScheduledUpdateInCurrentCommit) {
        warning = 'Lifecycle hook scheduled a cascading update';
      } else if (commitCountInCurrentWorkLoop > 0) {
        warning = 'Caused by a cascading update in earlier commit';
      }
      hasScheduledUpdateInCurrentCommit = false;
      commitCountInCurrentWorkLoop++;
      isCommitting = false;
      labelsInCurrentCommit.clear();

      endMark('(Committing Changes)', '(Committing Changes)', warning);
    },
    startCommitHostEffectsTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      effectCountInCurrentCommit = 0;
      beginMark('(Committing Host Effects)');
    },
    stopCommitHostEffectsTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var count = effectCountInCurrentCommit;
      effectCountInCurrentCommit = 0;
      endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
    },
    startCommitLifeCyclesTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      effectCountInCurrentCommit = 0;
      beginMark('(Calling Lifecycle Methods)');
    },
    stopCommitLifeCyclesTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var count = effectCountInCurrentCommit;
      effectCountInCurrentCommit = 0;
      endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
    }
  };
}

var ReactDebugFiberPerf_1 = ReactDebugFiberPerf;

var _extends$1 = index || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };









var isFiberMounted = ReactFiberTreeReflection.isFiberMounted;

var ClassComponent$1 = ReactTypeOfWork.ClassComponent;
var HostRoot$1 = ReactTypeOfWork.HostRoot;

var createCursor = ReactFiberStack.createCursor;
var pop = ReactFiberStack.pop;
var push = ReactFiberStack.push;

{
  var ReactDebugCurrentFrame = ReactDebugCurrentFrameRollupShim;
  var ReactDebugCurrentFiber$2 = ReactDebugCurrentFiber_1;

  var _require4$2 = ReactDebugFiberPerf_1,
      startPhaseTimer = _require4$2.startPhaseTimer,
      stopPhaseTimer = _require4$2.stopPhaseTimer;

  var warnedAboutMissingGetChildContext = {};
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyObject_1);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyObject_1;

function getUnmaskedContext(workInProgress) {
  var hasOwnContext = isContextProvider$1(workInProgress);
  if (hasOwnContext) {
    // If the fiber is a context provider itself, when we read its context
    // we have already pushed its own child context on the stack. A context
    // provider should not "see" its own child context. Therefore we read the
    // previous (parent) context instead for a context provider.
    return previousContext;
  }
  return contextStackCursor.current;
}
var getUnmaskedContext_1 = getUnmaskedContext;

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  var instance = workInProgress.stateNode;
  instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
  instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}
var cacheContext_1 = cacheContext;

var getMaskedContext = function (workInProgress, unmaskedContext) {
  var type = workInProgress.type;
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject_1;
  }

  // Avoid recreating masked context unless unmasked context has changed.
  // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
  // This may trigger infinite loops if componentWillReceiveProps calls setState.
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
    return instance.__reactInternalMemoizedMaskedChildContext;
  }

  var context = {};
  for (var key in contextTypes) {
    context[key] = unmaskedContext[key];
  }

  {
    var name = getComponentName_1(workInProgress) || 'Unknown';
    ReactDebugCurrentFrame.current = workInProgress;
    // $FlowFixMe - We know this export exists now, need to wait for Flow update
    React.checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFrame.getStackAddendum);
    ReactDebugCurrentFrame.current = null;
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // Context is created before the class component is instantiated so check for instance.
  if (instance) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return context;
};

var hasContextChanged = function () {
  return didPerformWorkStackCursor.current;
};

function isContextConsumer(fiber) {
  return fiber.tag === ClassComponent$1 && fiber.type.contextTypes != null;
}
var isContextConsumer_1 = isContextConsumer;

function isContextProvider$1(fiber) {
  return fiber.tag === ClassComponent$1 && fiber.type.childContextTypes != null;
}
var isContextProvider_1 = isContextProvider$1;

function popContextProvider(fiber) {
  if (!isContextProvider$1(fiber)) {
    return;
  }

  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
var popContextProvider_1 = popContextProvider;

var pushTopLevelContextObject = function (fiber, context, didChange) {
  invariant_1(contextStackCursor.cursor == null, 'Unexpected context found on stack');

  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
};

function processChildContext$1(fiber, parentContext, isReconciling) {
  var instance = fiber.stateNode;
  var childContextTypes = fiber.type.childContextTypes;

  // TODO (bvaughn) Replace this behavior with an invariant() in the future.
  // It has only been added in Fiber to match the (unintentional) behavior in Stack.
  if (typeof instance.getChildContext !== 'function') {
    {
      var componentName = getComponentName_1(fiber) || 'Unknown';

      if (!warnedAboutMissingGetChildContext[componentName]) {
        warnedAboutMissingGetChildContext[componentName] = true;
        warning_1(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
      }
    }
    return parentContext;
  }

  var childContext = void 0;
  {
    ReactDebugCurrentFiber$2.phase = 'getChildContext';
    startPhaseTimer(fiber, 'getChildContext');
    childContext = instance.getChildContext();
    stopPhaseTimer();
    ReactDebugCurrentFiber$2.phase = null;
  }
  for (var contextKey in childContext) {
    !(contextKey in childContextTypes) ? invariant_1(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName_1(fiber) || 'Unknown', contextKey) : void 0;
  }
  {
    var name = getComponentName_1(fiber) || 'Unknown';
    // We can only provide accurate element stacks if we pass work-in-progress tree
    // during the begin or complete phase. However currently this function is also
    // called from unstable_renderSubtree legacy implementation. In this case it unsafe to
    // assume anything about the given fiber. We won't pass it down if we aren't sure.
    // TODO: remove this hack when we delete unstable_renderSubtree in Fiber.
    var workInProgress = isReconciling ? fiber : null;
    ReactDebugCurrentFrame.current = workInProgress;
    // $FlowFixMe - We know this export exists now, need to wait for Flow update
    React.checkPropTypes(childContextTypes, childContext, 'child context', name, ReactDebugCurrentFrame.getStackAddendum);
    ReactDebugCurrentFrame.current = null;
  }

  return _extends$1({}, parentContext, childContext);
}
var processChildContext_1 = processChildContext$1;

var pushContextProvider = function (workInProgress) {
  if (!isContextProvider$1(workInProgress)) {
    return false;
  }

  var instance = workInProgress.stateNode;
  // We push the context as early as possible to ensure stack integrity.
  // If the instance does not exist yet, we will push null at first,
  // and replace it on the stack later when invalidating the context.
  var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject_1;

  // Remember the parent context so we can merge with it later.
  previousContext = contextStackCursor.current;
  push(contextStackCursor, memoizedMergedChildContext, workInProgress);
  push(didPerformWorkStackCursor, false, workInProgress);

  return true;
};

var invalidateContextProvider = function (workInProgress) {
  var instance = workInProgress.stateNode;
  invariant_1(instance, 'Expected to have an instance by this point.');

  // Merge parent and own context.
  var mergedContext = processChildContext$1(workInProgress, previousContext, true);
  instance.__reactInternalMemoizedMergedChildContext = mergedContext;

  // Replace the old (or empty) context with the new one.
  // It is important to unwind the context in the reverse order.
  pop(didPerformWorkStackCursor, workInProgress);
  pop(contextStackCursor, workInProgress);
  // Now push the new context and mark that it has changed.
  push(contextStackCursor, mergedContext, workInProgress);
  push(didPerformWorkStackCursor, true, workInProgress);
};

var resetContext = function () {
  previousContext = emptyObject_1;
  contextStackCursor.current = emptyObject_1;
  didPerformWorkStackCursor.current = false;
};

var findCurrentUnmaskedContext$1 = function (fiber) {
  // Currently this is only used with renderSubtreeIntoContainer; not sure if it
  // makes sense elsewhere
  invariant_1(isFiberMounted(fiber) && fiber.tag === ClassComponent$1, 'Expected subtree parent to be a mounted class component');

  var node = fiber;
  while (node.tag !== HostRoot$1) {
    if (isContextProvider$1(node)) {
      return node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    var parent = node['return'];
    invariant_1(parent, 'Found unexpected detached subtree parent');
    node = parent;
  }
  return node.stateNode.context;
};

var ReactFiberContext = {
	getUnmaskedContext: getUnmaskedContext_1,
	cacheContext: cacheContext_1,
	getMaskedContext: getMaskedContext,
	hasContextChanged: hasContextChanged,
	isContextConsumer: isContextConsumer_1,
	isContextProvider: isContextProvider_1,
	popContextProvider: popContextProvider_1,
	pushTopLevelContextObject: pushTopLevelContextObject,
	processChildContext: processChildContext_1,
	pushContextProvider: pushContextProvider,
	invalidateContextProvider: invalidateContextProvider,
	resetContext: resetContext,
	findCurrentUnmaskedContext: findCurrentUnmaskedContext$1
};

var IndeterminateComponent$1 = ReactTypeOfWork.IndeterminateComponent;
var ClassComponent$3 = ReactTypeOfWork.ClassComponent;
var HostRoot$4 = ReactTypeOfWork.HostRoot;
var HostComponent$5 = ReactTypeOfWork.HostComponent;
var HostText$3 = ReactTypeOfWork.HostText;
var HostPortal$1 = ReactTypeOfWork.HostPortal;
var CoroutineComponent = ReactTypeOfWork.CoroutineComponent;
var YieldComponent$1 = ReactTypeOfWork.YieldComponent;
var Fragment$1 = ReactTypeOfWork.Fragment;

var NoWork$1 = ReactPriorityLevel.NoWork;

var NoEffect$1 = ReactTypeOfSideEffect.NoEffect;

var cloneUpdateQueue$1 = ReactFiberUpdateQueue.cloneUpdateQueue;



{
  var getComponentName$5 = getComponentName_1;
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


{
  var debugCounter = 1;
}

// This is a constructor of a POJO instead of a constructor function for a few
// reasons:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We can easily go from a createFiber call to calling a constructor if that
//    is faster. The opposite is not true.
// 4) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, key) {
  var fiber = {
    // Instance

    tag: tag,

    key: key,

    type: null,

    stateNode: null,

    // Fiber

    'return': null,

    child: null,
    sibling: null,
    index: 0,

    ref: null,

    pendingProps: null,
    memoizedProps: null,
    updateQueue: null,
    memoizedState: null,

    effectTag: NoEffect$1,
    nextEffect: null,
    firstEffect: null,
    lastEffect: null,

    pendingWorkPriority: NoWork$1,
    progressedPriority: NoWork$1,
    progressedChild: null,
    progressedFirstDeletion: null,
    progressedLastDeletion: null,

    alternate: null
  };

  {
    fiber._debugID = debugCounter++;
    fiber._debugSource = null;
    fiber._debugOwner = null;
    fiber._debugIsCurrentlyTiming = false;
    if (typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(fiber);
    }
  }

  return fiber;
};

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

// This is used to create an alternate fiber to do work on.
// TODO: Rename to createWorkInProgressFiber or something like that.
var cloneFiber = function (fiber, priorityLevel) {
  // We clone to get a work in progress. That means that this fiber is the
  // current. To make it safe to reuse that fiber later on as work in progress
  // we need to reset its work in progress flag now. We don't have an
  // opportunity to do this earlier since we don't traverse the tree when
  // the work in progress tree becomes the current tree.
  // fiber.progressedPriority = NoWork;
  // fiber.progressedChild = null;

  // We use a double buffering pooling technique because we know that we'll only
  // ever need at most two versions of a tree. We pool the "other" unused node
  // that we're free to reuse. This is lazily created to avoid allocating extra
  // objects for things that are never updated. It also allow us to reclaim the
  // extra memory if needed.
  var alt = fiber.alternate;
  if (alt !== null) {
    // If we clone, then we do so from the "current" state. The current state
    // can't have any side-effects that are still valid so we reset just to be
    // sure.
    alt.effectTag = NoEffect$1;
    alt.nextEffect = null;
    alt.firstEffect = null;
    alt.lastEffect = null;
  } else {
    // This should not have an alternate already
    alt = createFiber(fiber.tag, fiber.key);
    alt.type = fiber.type;

    alt.progressedChild = fiber.progressedChild;
    alt.progressedPriority = fiber.progressedPriority;

    alt.alternate = fiber;
    fiber.alternate = alt;
  }

  alt.stateNode = fiber.stateNode;
  alt.child = fiber.child;
  alt.sibling = fiber.sibling; // This should always be overridden. TODO: null
  alt.index = fiber.index; // This should always be overridden.
  alt.ref = fiber.ref;
  // pendingProps is here for symmetry but is unnecessary in practice for now.
  // TODO: Pass in the new pendingProps as an argument maybe?
  alt.pendingProps = fiber.pendingProps;
  cloneUpdateQueue$1(fiber, alt);
  alt.pendingWorkPriority = priorityLevel;

  alt.memoizedProps = fiber.memoizedProps;
  alt.memoizedState = fiber.memoizedState;

  {
    alt._debugID = fiber._debugID;
    alt._debugSource = fiber._debugSource;
    alt._debugOwner = fiber._debugOwner;
  }

  return alt;
};

var createHostRootFiber$1 = function () {
  var fiber = createFiber(HostRoot$4, null);
  return fiber;
};

var createFiberFromElement = function (element, priorityLevel) {
  var owner = null;
  {
    owner = element._owner;
  }

  var fiber = createFiberFromElementType(element.type, element.key, owner);
  fiber.pendingProps = element.props;
  fiber.pendingWorkPriority = priorityLevel;

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }

  return fiber;
};

var createFiberFromFragment = function (elements, priorityLevel) {
  // TODO: Consider supporting keyed fragments. Technically, we accidentally
  // support that in the existing React.
  var fiber = createFiber(Fragment$1, null);
  fiber.pendingProps = elements;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

var createFiberFromText = function (content, priorityLevel) {
  var fiber = createFiber(HostText$3, null);
  fiber.pendingProps = content;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

function createFiberFromElementType(type, key, debugOwner) {
  var fiber = void 0;
  if (typeof type === 'function') {
    fiber = shouldConstruct(type) ? createFiber(ClassComponent$3, key) : createFiber(IndeterminateComponent$1, key);
    fiber.type = type;
  } else if (typeof type === 'string') {
    fiber = createFiber(HostComponent$5, key);
    fiber.type = type;
  } else if (typeof type === 'object' && type !== null && typeof type.tag === 'number') {
    // Currently assumed to be a continuation and therefore is a fiber already.
    // TODO: The yield system is currently broken for updates in some cases.
    // The reified yield stores a fiber, but we don't know which fiber that is;
    // the current or a workInProgress? When the continuation gets rendered here
    // we don't know if we can reuse that fiber or if we need to clone it.
    // There is probably a clever way to restructure this.
    fiber = type;
  } else {
    var info = '';
    {
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }
      var ownerName = debugOwner ? getComponentName$5(debugOwner) : null;
      if (ownerName) {
        info += '\n\nCheck the render method of `' + ownerName + '`.';
      }
    }
    invariant_1(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
  }
  return fiber;
}

var createFiberFromElementType_1 = createFiberFromElementType;

var createFiberFromCoroutine = function (coroutine, priorityLevel) {
  var fiber = createFiber(CoroutineComponent, coroutine.key);
  fiber.type = coroutine.handler;
  fiber.pendingProps = coroutine;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

var createFiberFromYield = function (yieldNode, priorityLevel) {
  var fiber = createFiber(YieldComponent$1, null);
  return fiber;
};

var createFiberFromPortal = function (portal, priorityLevel) {
  var fiber = createFiber(HostPortal$1, portal.key);
  fiber.pendingProps = portal.children || [];
  fiber.pendingWorkPriority = priorityLevel;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    implementation: portal.implementation
  };
  return fiber;
};

var ReactFiber = {
	cloneFiber: cloneFiber,
	createHostRootFiber: createHostRootFiber$1,
	createFiberFromElement: createFiberFromElement,
	createFiberFromFragment: createFiberFromFragment,
	createFiberFromText: createFiberFromText,
	createFiberFromElementType: createFiberFromElementType_1,
	createFiberFromCoroutine: createFiberFromCoroutine,
	createFiberFromYield: createFiberFromYield,
	createFiberFromPortal: createFiberFromPortal
};

var createHostRootFiber = ReactFiber.createHostRootFiber;

var createFiberRoot$1 = function (containerInfo) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    isScheduled: false,
    nextScheduledRoot: null,
    context: null,
    pendingContext: null
  };
  uninitializedFiber.stateNode = root;
  return root;
};

var ReactFiberRoot = {
	createFiberRoot: createFiberRoot$1
};

var defaultShowDialog = function () {
  return true;
};

var showDialog = defaultShowDialog;

function logCapturedError$1(capturedError) {
  var logError = showDialog(capturedError);

  // Allow injected showDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  {
    var componentName = capturedError.componentName,
        componentStack = capturedError.componentStack,
        error = capturedError.error,
        errorBoundaryName = capturedError.errorBoundaryName,
        errorBoundaryFound = capturedError.errorBoundaryFound,
        willRetry = capturedError.willRetry;
    var message = error.message,
        name = error.name,
        stack = error.stack;


    var errorSummary = message ? name + ': ' + message : name;

    var componentNameMessage = componentName ? 'React caught an error thrown by ' + componentName + '.' : 'React caught an error thrown by one of your components.';

    // Error stack varies by browser, eg:
    // Chrome prepends the Error name and type.
    // Firefox, Safari, and IE don't indent the stack lines.
    // Format it in a consistent way for error logging.
    var formattedCallStack = stack.slice(0, errorSummary.length) === errorSummary ? stack.slice(errorSummary.length) : stack;
    formattedCallStack = formattedCallStack.trim().split('\n').map(function (line) {
      return '\n    ' + line.trim();
    }).join();

    var errorBoundaryMessage = void 0;
    // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
    if (errorBoundaryFound && errorBoundaryName) {
      if (willRetry) {
        errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
      } else {
        errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '. ' + 'Recreating the tree from scratch failed so React will unmount the tree.';
      }
    } else {
      // TODO Link to unstable_handleError() documentation once it exists.
      errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.';
    }

    console.error(componentNameMessage + ' You should fix this error in your code. ' + errorBoundaryMessage + '\n\n' + (errorSummary + '\n\n') + ('The error is located at: ' + componentStack + '\n\n') + ('The error was thrown at: ' + formattedCallStack));
  }

  
}

var injection$1 = {
  /**
   * Display custom dialog for lifecycle errors.
   * Return false to prevent default behavior of logging to console.error.
   */
  injectDialog: function (fn) {
    invariant_1(showDialog === defaultShowDialog, 'The custom dialog was already injected.');
    invariant_1(typeof fn === 'function', 'Injected showDialog() must be a function.');
    showDialog = fn;
  }
};

var logCapturedError_1 = logCapturedError$1;

var ReactFiberErrorLogger = {
	injection: injection$1,
	logCapturedError: logCapturedError_1
};

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementSymbol
 * 
 */

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var ReactElementSymbol = REACT_ELEMENT_TYPE;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCoroutine
 * 
 */

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_COROUTINE_TYPE$1;
var REACT_YIELD_TYPE$1;
if (typeof Symbol === 'function' && Symbol['for']) {
  REACT_COROUTINE_TYPE$1 = Symbol['for']('react.coroutine');
  REACT_YIELD_TYPE$1 = Symbol['for']('react.yield');
} else {
  REACT_COROUTINE_TYPE$1 = 0xeac8;
  REACT_YIELD_TYPE$1 = 0xeac9;
}

var createCoroutine = function (children, handler, props) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var coroutine = {
    // This tag allow us to uniquely identify this as a React Coroutine
    $$typeof: REACT_COROUTINE_TYPE$1,
    key: key == null ? null : '' + key,
    children: children,
    handler: handler,
    props: props
  };

  {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(coroutine.props);
      Object.freeze(coroutine);
    }
  }

  return coroutine;
};

var createYield = function (value) {
  var yieldNode = {
    // This tag allow us to uniquely identify this as a React Yield
    $$typeof: REACT_YIELD_TYPE$1,
    value: value
  };

  {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(yieldNode);
    }
  }

  return yieldNode;
};

/**
 * Verifies the object is a coroutine object.
 */
var isCoroutine = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_COROUTINE_TYPE$1;
};

/**
 * Verifies the object is a yield object.
 */
var isYield = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_YIELD_TYPE$1;
};

var REACT_YIELD_TYPE_1 = REACT_YIELD_TYPE$1;
var REACT_COROUTINE_TYPE_1 = REACT_COROUTINE_TYPE$1;

var ReactCoroutine = {
	createCoroutine: createCoroutine,
	createYield: createYield,
	isCoroutine: isCoroutine,
	isYield: isYield,
	REACT_YIELD_TYPE: REACT_YIELD_TYPE_1,
	REACT_COROUTINE_TYPE: REACT_COROUTINE_TYPE_1
};

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPortal
 * 
 */

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_PORTAL_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.portal') || 0xeaca;

var createPortal = function (children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE$1,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
};

/**
 * Verifies the object is a portal object.
 */
var isPortal = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_PORTAL_TYPE$1;
};

var REACT_PORTAL_TYPE_1 = REACT_PORTAL_TYPE$1;

var ReactPortal = {
	createPortal: createPortal,
	isPortal: isPortal,
	REACT_PORTAL_TYPE: REACT_PORTAL_TYPE_1
};

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 * 
 */

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1 = getIteratorFn;

var REACT_COROUTINE_TYPE = ReactCoroutine.REACT_COROUTINE_TYPE;
var REACT_YIELD_TYPE = ReactCoroutine.REACT_YIELD_TYPE;

var REACT_PORTAL_TYPE = ReactPortal.REACT_PORTAL_TYPE;











{
  var _require3$2 = ReactDebugCurrentFiber_1,
      getCurrentFiberStackAddendum$1 = _require3$2.getCurrentFiberStackAddendum;

  var getComponentName$6 = getComponentName_1;
  var warning$7 = warning_1;
  var didWarnAboutMaps = false;
}

var cloneFiber$2 = ReactFiber.cloneFiber;
var createFiberFromElement$1 = ReactFiber.createFiberFromElement;
var createFiberFromFragment$1 = ReactFiber.createFiberFromFragment;
var createFiberFromText$1 = ReactFiber.createFiberFromText;
var createFiberFromCoroutine$1 = ReactFiber.createFiberFromCoroutine;
var createFiberFromYield$1 = ReactFiber.createFiberFromYield;
var createFiberFromPortal$1 = ReactFiber.createFiberFromPortal;


var isArray = Array.isArray;

var FunctionalComponent$2 = ReactTypeOfWork.FunctionalComponent;
var ClassComponent$6 = ReactTypeOfWork.ClassComponent;
var HostText$5 = ReactTypeOfWork.HostText;
var HostPortal$4 = ReactTypeOfWork.HostPortal;
var CoroutineComponent$2 = ReactTypeOfWork.CoroutineComponent;
var YieldComponent$3 = ReactTypeOfWork.YieldComponent;
var Fragment$3 = ReactTypeOfWork.Fragment;
var NoEffect$3 = ReactTypeOfSideEffect.NoEffect;
var Placement$3 = ReactTypeOfSideEffect.Placement;
var Deletion$1 = ReactTypeOfSideEffect.Deletion;


function coerceRef(current, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== 'function') {
    if (element._owner) {
      var owner = element._owner;
      var inst = void 0;
      if (owner) {
        if (typeof owner.tag === 'number') {
          var ownerFiber = owner;
          !(ownerFiber.tag === ClassComponent$6) ? invariant_1(false, 'Stateless function components cannot have refs.') : void 0;
          inst = ownerFiber.stateNode;
        } else {
          // Stack
          inst = owner.getPublicInstance();
        }
      }
      invariant_1(inst, 'Missing owner for string ref %s. This error is likely caused by a ' + 'bug in React. Please file an issue.', mixedRef);
      var stringRef = '' + mixedRef;
      // Check if previous string ref matches new string ref
      if (current !== null && current.ref !== null && current.ref._stringRef === stringRef) {
        return current.ref;
      }
      var ref = function (value) {
        var refs = inst.refs === emptyObject_1 ? inst.refs = {} : inst.refs;
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    }
  }
  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== 'textarea') {
    var addendum = '';
    {
      addendum = ' If you meant to render a collection of children, use an array ' + 'instead.';
      var owner = ReactCurrentOwnerRollupShim.owner || returnFiber._debugOwner;
      if (owner && typeof owner.tag === 'number') {
        var name = getComponentName$6(owner);
        if (name) {
          addendum += '\n\nCheck the render method of `' + name + '`.';
        }
      }
    }
    invariant_1(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
  }
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldClone, shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    if (!shouldClone) {
      // When we're reconciling in place we have a work in progress copy. We
      // actually want the current copy. If there is no current copy, then we
      // don't need to track deletion side-effects.
      if (childToDelete.alternate === null) {
        return;
      }
      childToDelete = childToDelete.alternate;
    }
    // Deletions are added in reversed order so we add it to the front.
    var last = returnFiber.progressedLastDeletion;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.progressedLastDeletion = childToDelete;
    } else {
      returnFiber.progressedFirstDeletion = returnFiber.progressedLastDeletion = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion$1;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    var existingChildren = new Map();

    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, priority) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    if (shouldClone) {
      var clone = cloneFiber$2(fiber, priority);
      clone.index = 0;
      clone.sibling = null;
      return clone;
    } else {
      // We override the pending priority even if it is higher, because if
      // we're reconciling at a lower priority that means that this was
      // down-prioritized.
      fiber.pendingWorkPriority = priority;
      fiber.effectTag = NoEffect$3;
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    var current = newFiber.alternate;
    if (current !== null) {
      var oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement$3;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement$3;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement$3;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, priority) {
    if (current === null || current.tag !== HostText$5) {
      // Insert
      var created = createFiberFromText$1(textContent, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = textContent;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, priority) {
    if (current === null || current.type !== element.type) {
      // Insert
      var created = createFiberFromElement$1(element, priority);
      created.ref = coerceRef(current, element);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.ref = coerceRef(current, element);
      existing.pendingProps = element.props;
      existing['return'] = returnFiber;
      {
        existing._debugSource = element._source;
        existing._debugOwner = element._owner;
      }
      return existing;
    }
  }

  function updateCoroutine(returnFiber, current, coroutine, priority) {
    // TODO: Should this also compare handler to determine whether to reuse?
    if (current === null || current.tag !== CoroutineComponent$2) {
      // Insert
      var created = createFiberFromCoroutine$1(coroutine, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.pendingProps = coroutine;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateYield(returnFiber, current, yieldNode, priority) {
    if (current === null || current.tag !== YieldComponent$3) {
      // Insert
      var created = createFiberFromYield$1(yieldNode, priority);
      created.type = yieldNode.value;
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.type = yieldNode.value;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updatePortal(returnFiber, current, portal, priority) {
    if (current === null || current.tag !== HostPortal$4 || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal$1(portal, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = portal.children || [];
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, priority) {
    if (current === null || current.tag !== Fragment$3) {
      // Insert
      var created = createFiberFromFragment$1(fragment, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = fragment;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, priority) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText$1('' + newChild, priority);
      created['return'] = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case ReactElementSymbol:
          {
            var _created = createFiberFromElement$1(newChild, priority);
            _created.ref = coerceRef(null, newChild);
            _created['return'] = returnFiber;
            return _created;
          }

        case REACT_COROUTINE_TYPE:
          {
            var _created2 = createFiberFromCoroutine$1(newChild, priority);
            _created2['return'] = returnFiber;
            return _created2;
          }

        case REACT_YIELD_TYPE:
          {
            var _created3 = createFiberFromYield$1(newChild, priority);
            _created3.type = newChild.value;
            _created3['return'] = returnFiber;
            return _created3;
          }

        case REACT_PORTAL_TYPE:
          {
            var _created4 = createFiberFromPortal$1(newChild, priority);
            _created4['return'] = returnFiber;
            return _created4;
          }
      }

      if (isArray(newChild) || getIteratorFn_1(newChild)) {
        var _created5 = createFiberFromFragment$1(newChild, priority);
        _created5['return'] = returnFiber;
        return _created5;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, priority) {
    // Update the fiber if the keys match, otherwise return null.

    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild, priority);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case ReactElementSymbol:
          {
            if (newChild.key === key) {
              return updateElement(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_COROUTINE_TYPE:
          {
            if (newChild.key === key) {
              return updateCoroutine(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_YIELD_TYPE:
          {
            // Yields doesn't have keys. If the previous node is implicitly keyed
            // we can continue to replace it without aborting even if it is not a
            // yield.
            if (key === null) {
              return updateYield(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }
      }

      if (isArray(newChild) || getIteratorFn_1(newChild)) {
        // Fragments doesn't have keys so if the previous key is implicit we can
        // update it.
        if (key !== null) {
          return null;
        }
        return updateFragment(returnFiber, oldFiber, newChild, priority);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, priority) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, priority);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case ReactElementSymbol:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateElement(returnFiber, _matchedFiber, newChild, priority);
          }

        case REACT_COROUTINE_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateCoroutine(returnFiber, _matchedFiber2, newChild, priority);
          }

        case REACT_YIELD_TYPE:
          {
            // Yields doesn't have keys, so we neither have to check the old nor
            // new node for the key. If both are yields, they match.
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateYield(returnFiber, _matchedFiber3, newChild, priority);
          }

        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber4 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber4, newChild, priority);
          }
      }

      if (isArray(newChild) || getIteratorFn_1(newChild)) {
        var _matchedFiber5 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber5, newChild, priority);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    return null;
  }

  function warnOnDuplicateKey(child, knownKeys) {
    {
      if (typeof child !== 'object' || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case ReactElementSymbol:
        case REACT_COROUTINE_TYPE:
        case REACT_PORTAL_TYPE:
          var key = child.key;
          if (typeof key !== 'string') {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          warning$7(false, 'Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, ' + 'only the first child will be used.%s', key, getCurrentFiberStackAddendum$1());
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, priority) {
    // This algorithm can't optimize by searching from boths ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    {
      // First, validate keys.
      var knownKeys = null;
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        knownKeys = warnOnDuplicateKey(child, knownKeys);
      }
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], priority);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], priority);
        if (!_newFiber) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], priority);
      if (_newFiber2) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, priority) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    var iteratorFn = getIteratorFn_1(newChildrenIterable);
    invariant_1(typeof iteratorFn === 'function', 'An object is not an iterable. This error is likely caused by a bug in ' + 'React. Please file an issue.');

    {
      // Warn about using Maps as children
      if (typeof newChildrenIterable.entries === 'function') {
        var possibleMap = newChildrenIterable;
        if (possibleMap.entries === iteratorFn) {
          var mapsAsChildrenAddendum = '';
          var owner = ReactCurrentOwnerRollupShim.owner || returnFiber._debugOwner;
          if (owner && typeof owner.tag === 'number') {
            var mapsAsChildrenOwnerName = getComponentName$6(owner);
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = '\n\nCheck the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          warning$7(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', mapsAsChildrenAddendum);
          didWarnAboutMaps = true;
        }
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      var _newChildren = iteratorFn.call(newChildrenIterable);
      if (_newChildren) {
        var knownKeys = null;
        var _step = _newChildren.next();
        for (; !_step.done; _step = _newChildren.next()) {
          var child = _step.value;
          knownKeys = warnOnDuplicateKey(child, knownKeys);
        }
      }
    }

    var newChildren = iteratorFn.call(newChildrenIterable);
    invariant_1(newChildren != null, 'An iterable object provided no iterator.');

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, priority);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (!oldFiber) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, priority);
        if (_newFiber3 === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, priority);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }
        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, priority) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText$5) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, priority);
      existing.pendingProps = textContent;
      existing['return'] = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText$1(textContent, priority);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, priority) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.type === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.ref = coerceRef(child, element);
          existing.pendingProps = element.props;
          existing['return'] = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromElement$1(element, priority);
    created.ref = coerceRef(currentFirstChild, element);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleCoroutine(returnFiber, currentFirstChild, coroutine, priority) {
    var key = coroutine.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === CoroutineComponent$2) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.pendingProps = coroutine;
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromCoroutine$1(coroutine, priority);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleYield(returnFiber, currentFirstChild, yieldNode, priority) {
    // There's no need to check for keys on yields since they're stateless.
    var child = currentFirstChild;
    if (child !== null) {
      if (child.tag === YieldComponent$3) {
        deleteRemainingChildren(returnFiber, child.sibling);
        var existing = useFiber(child, priority);
        existing.type = yieldNode.value;
        existing['return'] = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
      }
    }

    var created = createFiberFromYield$1(yieldNode, priority);
    created.type = yieldNode.value;
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, priority) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal$4 && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.pendingProps = portal.children || [];
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromPortal$1(portal, priority);
    created['return'] = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, priority) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    var disableNewFiberFeatures = ReactFeatureFlags_1.disableNewFiberFeatures;

    // Handle object types
    var isObject = typeof newChild === 'object' && newChild !== null;
    if (isObject) {
      // Support only the subset of return types that Stack supports. Treat
      // everything else as empty, but log a warning.
      if (disableNewFiberFeatures) {
        switch (newChild.$$typeof) {
          case ReactElementSymbol:
            return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, priority));

          case REACT_PORTAL_TYPE:
            return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, priority));
        }
      } else {
        switch (newChild.$$typeof) {
          case ReactElementSymbol:
            return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, priority));

          case REACT_COROUTINE_TYPE:
            return placeSingleChild(reconcileSingleCoroutine(returnFiber, currentFirstChild, newChild, priority));

          case REACT_YIELD_TYPE:
            return placeSingleChild(reconcileSingleYield(returnFiber, currentFirstChild, newChild, priority));

          case REACT_PORTAL_TYPE:
            return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, priority));
        }
      }
    }

    if (disableNewFiberFeatures) {
      // The new child is not an element. If it's not null or false,
      // and the return fiber is a composite component, throw an error.
      switch (returnFiber.tag) {
        case ClassComponent$6:
          {
            {
              var instance = returnFiber.stateNode;
              if (instance.render._isMockFunction && typeof newChild === 'undefined') {
                // We allow auto-mocks to proceed as if they're
                // returning null.
                break;
              }
            }
            var Component = returnFiber.type;
            !(newChild === null || newChild === false) ? invariant_1(false, '%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
            break;
          }
        case FunctionalComponent$2:
          {
            // Composites accept elements, portals, null, or false
            var _Component = returnFiber.type;
            !(newChild === null || newChild === false) ? invariant_1(false, '%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', _Component.displayName || _Component.name || 'Component') : void 0;
            break;
          }
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, priority));
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, priority);
    }

    if (getIteratorFn_1(newChild)) {
      return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, priority);
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    if (!disableNewFiberFeatures && typeof newChild === 'undefined') {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent$6:
          {
            {
              var _instance = returnFiber.stateNode;
              if (_instance.render._isMockFunction) {
                // We allow auto-mocks to proceed as if they're returning null.
                break;
              }
            }
          }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionalComponent$2:
          {
            var _Component2 = returnFiber.type;
            invariant_1(false, '%s(...): Nothing was returned from render. This usually means a ' + 'return statement is missing. Or, to render nothing, ' + 'return null.', _Component2.displayName || _Component2.name || 'Component');
          }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers$1 = ChildReconciler(true, true);

var reconcileChildFibersInPlace$1 = ChildReconciler(false, true);

var mountChildFibersInPlace$1 = ChildReconciler(false, false);

var cloneChildFibers$1 = function (current, workInProgress) {
  if (!workInProgress.child) {
    return;
  }
  if (current !== null && workInProgress.child === current.child) {
    // We use workInProgress.child since that lets Flow know that it can't be
    // null since we validated that already. However, as the line above suggests
    // they're actually the same thing.
    var currentChild = workInProgress.child;
    // TODO: This used to reset the pending priority. Not sure if that is needed.
    // workInProgress.pendingWorkPriority = current.pendingWorkPriority;
    // TODO: The below priority used to be set to NoWork which would've
    // dropped work. This is currently unobservable but will become
    // observable when the first sibling has lower priority work remaining
    // than the next sibling. At that point we should add tests that catches
    // this.
    var newChild = cloneFiber$2(currentChild, currentChild.pendingWorkPriority);
    workInProgress.child = newChild;

    newChild['return'] = workInProgress;
    while (currentChild.sibling !== null) {
      currentChild = currentChild.sibling;
      newChild = newChild.sibling = cloneFiber$2(currentChild, currentChild.pendingWorkPriority);
      newChild['return'] = workInProgress;
    }
    newChild.sibling = null;
  } else {
    // If there is no alternate, then we don't need to clone the children.
    // If the children of the alternate fiber is a different set, then we don't
    // need to clone. We need to reset the return fiber though since we'll
    // traverse down into them.
    var child = workInProgress.child;
    while (child !== null) {
      child['return'] = workInProgress;
      child = child.sibling;
    }
  }
};

var ReactChildFiber = {
	reconcileChildFibers: reconcileChildFibers$1,
	reconcileChildFibersInPlace: reconcileChildFibersInPlace$1,
	mountChildFibersInPlace: mountChildFibersInPlace$1,
	cloneChildFibers: cloneChildFibers$1
};

var Update$1 = ReactTypeOfSideEffect.Update;

var cacheContext$1 = ReactFiberContext.cacheContext;
var getMaskedContext$2 = ReactFiberContext.getMaskedContext;
var getUnmaskedContext$2 = ReactFiberContext.getUnmaskedContext;
var isContextConsumer$1 = ReactFiberContext.isContextConsumer;

var addUpdate$1 = ReactFiberUpdateQueue.addUpdate;
var addReplaceUpdate$1 = ReactFiberUpdateQueue.addReplaceUpdate;
var addForceUpdate$1 = ReactFiberUpdateQueue.addForceUpdate;
var beginUpdateQueue$2 = ReactFiberUpdateQueue.beginUpdateQueue;

var _require4$3 = ReactFiberContext;
var hasContextChanged$2 = _require4$3.hasContextChanged;

var isMounted$1 = ReactFiberTreeReflection.isMounted;







var isArray$1 = Array.isArray;

{
  var _require6$1 = ReactDebugFiberPerf_1,
      startPhaseTimer$1 = _require6$1.startPhaseTimer,
      stopPhaseTimer$1 = _require6$1.stopPhaseTimer;

  var warning$8 = warning_1;
  var warnOnInvalidCallback = function (callback, callerName) {
    warning$8(callback === null || typeof callback === 'function', '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
  };
}

var ReactFiberClassComponent = function (scheduleUpdate, getPriorityContext, memoizeProps, memoizeState) {
  // Class component state updater
  var updater = {
    isMounted: isMounted$1,
    enqueueSetState: function (instance, partialState, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'setState');
      }
      addUpdate$1(fiber, partialState, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueReplaceState: function (instance, state, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      addReplaceUpdate$1(fiber, state, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueForceUpdate: function (instance, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext();
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      addForceUpdate$1(fiber, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    }
  };

  function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      // If the workInProgress already has an Update effect, return true
      return true;
    }

    var instance = workInProgress.stateNode;
    if (typeof instance.shouldComponentUpdate === 'function') {
      {
        startPhaseTimer$1(workInProgress, 'shouldComponentUpdate');
      }
      var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
      {
        stopPhaseTimer$1();
      }

      {
        warning$8(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName_1(workInProgress) || 'Unknown');
      }

      return shouldUpdate;
    }

    var type = workInProgress.type;
    if (type.prototype && type.prototype.isPureReactComponent) {
      return !shallowEqual_1(oldProps, newProps) || !shallowEqual_1(oldState, newState);
    }

    return true;
  }

  function checkClassInstance(workInProgress) {
    var instance = workInProgress.stateNode;
    {
      var name = getComponentName_1(workInProgress);
      var renderPresent = instance.render;
      warning$8(renderPresent, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
      var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
      warning$8(noGetInitialStateOnES6, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
      var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
      warning$8(noGetDefaultPropsOnES6, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
      var noInstancePropTypes = !instance.propTypes;
      warning$8(noInstancePropTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
      var noInstanceContextTypes = !instance.contextTypes;
      warning$8(noInstanceContextTypes, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
      var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
      warning$8(noComponentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
      var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
      warning$8(noComponentDidUnmount, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
      var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
      warning$8(noComponentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
      var hasMutatedProps = instance.props !== workInProgress.pendingProps;
      warning$8(instance.props === undefined || !hasMutatedProps, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
    }

    var state = instance.state;
    if (state && (typeof state !== 'object' || isArray$1(state))) {
      invariant_1(false, '%s.state: must be