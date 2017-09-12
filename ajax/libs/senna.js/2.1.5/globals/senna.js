/**
 * Senna.js - A blazing-fast Single Page Application engine
 * @author Liferay, Inc.
 * @version v2.1.4
 * @link http://sennajs.com
 * @license BSD-3-Clause
 */
(function() {
this.senna = this.senna || {};
this.sennaNamed = this.sennaNamed || {};
var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers.slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

babelHelpers;
'use strict';

(function () {
	var globals = globals || {};

	if (typeof window !== 'undefined') {
		globals.window = window;
	}

	if (typeof document !== 'undefined') {
		globals.document = document;
	}

	this['senna']['globals'] = globals;
}).call(this);
'use strict';

/**
 * A collection of core utility functions.
 * @const
 */

(function () {
  var compatibilityModeData_ = void 0;

  /**
   * Counter for unique id.
   * @type {Number}
   * @private
   */
  var uniqueIdCounter_ = 1;

  /**
   * Unique id property prefix.
   * @type {String}
   * @protected
   */
  var UID_PROPERTY = 'core_' + (Math.random() * 1e9 >>> 0);

  this['sennaNamed']['coreNamed'] = this['sennaNamed']['coreNamed'] || {};
  this['sennaNamed']['coreNamed']['UID_PROPERTY'] = UID_PROPERTY; /**
                                                                   * When defining a class Foo with an abstract method bar(), you can do:
                                                                   * Foo.prototype.bar = abstractMethod
                                                                   *
                                                                   * Now if a subclass of Foo fails to override bar(), an error will be thrown
                                                                   * when bar() is invoked.
                                                                   *
                                                                   * @type {!Function}
                                                                   * @throws {Error} when invoked to indicate the method should be overridden.
                                                                   */

  function abstractMethod() {
    throw Error('Unimplemented abstract method');
  }

  this['sennaNamed']['coreNamed']['abstractMethod'] = abstractMethod; /**
                                                                       * Disables Metal.js's compatibility mode.
                                                                       */

  function disableCompatibilityMode() {
    compatibilityModeData_ = undefined;
  }

  this['sennaNamed']['coreNamed']['disableCompatibilityMode'] = disableCompatibilityMode; /**
                                                                                           * Enables Metal.js's compatibility mode with the following features from rc
                                                                                           * and 1.x versions:
                                                                                           *     - Using "key" to reference component instances. In the current version
                                                                                           *       this should be done via "ref" instead. This allows old code still
                                                                                           *       using "key" to keep working like before. NOTE: this may cause
                                                                                           *       problems, since "key" is meant to be used differently. Only use this
                                                                                           *       if it's not possible to upgrade the code to use "ref" instead.
                                                                                           * @param {Object=} opt_data Optional object with data to specify more
                                                                                           *     details, such as:
                                                                                           *         - renderers {Array} the template renderers that should be in
                                                                                           *           compatibility mode, either their constructors or strings
                                                                                           *           representing them (e.g. 'soy' or 'jsx'). By default, all the ones
                                                                                           *           that extend from IncrementalDomRenderer.
                                                                                           * @type {Object}
                                                                                           */

  function enableCompatibilityMode() {
    var opt_data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    compatibilityModeData_ = opt_data;
  }

  this['sennaNamed']['coreNamed']['enableCompatibilityMode'] = enableCompatibilityMode; /**
                                                                                         * Returns the data used for compatibility mode, or nothing if it hasn't been
                                                                                         * enabled.
                                                                                         * @return {Object}
                                                                                         */

  function getCompatibilityModeData() {
    // Compatibility mode can be set via the __METAL_COMPATIBILITY__ global var.
    if (compatibilityModeData_ === undefined) {
      if (typeof window !== 'undefined' && window.__METAL_COMPATIBILITY__) {
        enableCompatibilityMode(window.__METAL_COMPATIBILITY__);
      }
    }
    return compatibilityModeData_;
  }

  this['sennaNamed']['coreNamed']['getCompatibilityModeData'] = getCompatibilityModeData; /**
                                                                                           * Returns the first argument if it's truthy, or the second otherwise.
                                                                                           * @param {*} a
                                                                                           * @param {*} b
                                                                                           * @return {*}
                                                                                           * @protected
                                                                                           */

  function getFirstTruthy_(a, b) {
    return a || b;
  }

  /**
   * Gets the name of the given function. If the current browser doesn't
   * support the `name` property, this will calculate it from the function's
   * content string.
   * @param {!function()} fn
   * @return {string}
   */
  function getFunctionName(fn) {
    if (!fn.name) {
      var str = fn.toString();
      fn.name = str.substring(9, str.indexOf('('));
    }
    return fn.name;
  }

  this['sennaNamed']['coreNamed']['getFunctionName'] = getFunctionName; /**
                                                                         * Gets the value of a static property in the given class. The value will be
                                                                         * inherited from ancestors as expected, unless a custom merge function is given,
                                                                         * which can change how the super classes' value for that property will be merged
                                                                         * together.
                                                                         * The final merged value will be stored in another property, so that it won't
                                                                         * be recalculated even if this function is called multiple times.
                                                                         * @param {!function()} ctor Class constructor.
                                                                         * @param {string} propertyName Property name to be merged.
                                                                         * @param {function(*, *):*=} opt_mergeFn Function that receives the merged
                                                                         *     value of the property so far and the next value to be merged to it.
                                                                         *     Should return these two merged together. If not passed the final property
                                                                         *     will be the first truthy value among ancestors.
                                                                         */

  function getStaticProperty(ctor, propertyName, opt_mergeFn) {
    var mergedName = propertyName + '_MERGED';
    if (!ctor.hasOwnProperty(mergedName)) {
      var merged = ctor.hasOwnProperty(propertyName) ? ctor[propertyName] : null;
      if (ctor.__proto__ && !ctor.__proto__.isPrototypeOf(Function)) {
        var mergeFn = opt_mergeFn || getFirstTruthy_;
        merged = mergeFn(merged, getStaticProperty(ctor.__proto__, propertyName, mergeFn));
      }
      ctor[mergedName] = merged;
    }
    return ctor[mergedName];
  }

  this['sennaNamed']['coreNamed']['getStaticProperty'] = getStaticProperty; /**
                                                                             * Gets an unique id. If `opt_object` argument is passed, the object is
                                                                             * mutated with an unique id. Consecutive calls with the same object
                                                                             * reference won't mutate the object again, instead the current object uid
                                                                             * returns. See {@link UID_PROPERTY}.
                                                                             * @param {Object=} opt_object Optional object to be mutated with the uid. If
                                                                             *     not specified this method only returns the uid.
                                                                             * @param {boolean=} opt_noInheritance Optional flag indicating if this
                                                                             *     object's uid property can be inherited from parents or not.
                                                                             * @throws {Error} when invoked to indicate the method should be overridden.
                                                                             */

  function getUid(opt_object, opt_noInheritance) {
    if (opt_object) {
      var id = opt_object[UID_PROPERTY];
      if (opt_noInheritance && !opt_object.hasOwnProperty(UID_PROPERTY)) {
        id = null;
      }
      return id || (opt_object[UID_PROPERTY] = uniqueIdCounter_++);
    }
    return uniqueIdCounter_++;
  }

  this['sennaNamed']['coreNamed']['getUid'] = getUid; /**
                                                       * The identity function. Returns its first argument.
                                                       * @param {*=} opt_returnValue The single value that will be returned.
                                                       * @return {?} The first argument.
                                                       */

  function identityFunction(opt_returnValue) {
    return opt_returnValue;
  }

  this['sennaNamed']['coreNamed']['identityFunction'] = identityFunction; /**
                                                                           * Returns true if the specified value is a boolean.
                                                                           * @param {?} val Variable to test.
                                                                           * @return {boolean} Whether variable is boolean.
                                                                           */

  function isBoolean(val) {
    return typeof val === 'boolean';
  }

  this['sennaNamed']['coreNamed']['isBoolean'] = isBoolean; /**
                                                             * Returns true if the specified value is not undefined.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is defined.
                                                             */

  function isDef(val) {
    return val !== undefined;
  }

  this['sennaNamed']['coreNamed']['isDef'] = isDef; /**
                                                     * Returns true if value is not undefined or null.
                                                     * @param {*} val
                                                     * @return {boolean}
                                                     */

  function isDefAndNotNull(val) {
    return isDef(val) && !isNull(val);
  }

  this['sennaNamed']['coreNamed']['isDefAndNotNull'] = isDefAndNotNull; /**
                                                                         * Returns true if value is a document.
                                                                         * @param {*} val
                                                                         * @return {boolean}
                                                                         */

  function isDocument(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 9;
  }

  this['sennaNamed']['coreNamed']['isDocument'] = isDocument; /**
                                                               * Returns true if value is a document-fragment.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isDocumentFragment(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 11;
  }

  this['sennaNamed']['coreNamed']['isDocumentFragment'] = isDocumentFragment; /**
                                                                               * Returns true if value is a dom element.
                                                                               * @param {*} val
                                                                               * @return {boolean}
                                                                               */

  function isElement(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && val.nodeType === 1;
  }

  this['sennaNamed']['coreNamed']['isElement'] = isElement; /**
                                                             * Returns true if the specified value is a function.
                                                             * @param {?} val Variable to test.
                                                             * @return {boolean} Whether variable is a function.
                                                             */

  function isFunction(val) {
    return typeof val === 'function';
  }

  this['sennaNamed']['coreNamed']['isFunction'] = isFunction; /**
                                                               * Returns true if value is null.
                                                               * @param {*} val
                                                               * @return {boolean}
                                                               */

  function isNull(val) {
    return val === null;
  }

  this['sennaNamed']['coreNamed']['isNull'] = isNull; /**
                                                       * Returns true if the specified value is a number.
                                                       * @param {?} val Variable to test.
                                                       * @return {boolean} Whether variable is a number.
                                                       */

  function isNumber(val) {
    return typeof val === 'number';
  }

  this['sennaNamed']['coreNamed']['isNumber'] = isNumber; /**
                                                           * Returns true if value is a window.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isWindow(val) {
    return val !== null && val === val.window;
  }

  this['sennaNamed']['coreNamed']['isWindow'] = isWindow; /**
                                                           * Returns true if the specified value is an object. This includes arrays
                                                           * and functions.
                                                           * @param {?} val Variable to test.
                                                           * @return {boolean} Whether variable is an object.
                                                           */

  function isObject(val) {
    var type = typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val);
    return type === 'object' && val !== null || type === 'function';
  }

  this['sennaNamed']['coreNamed']['isObject'] = isObject; /**
                                                           * Returns true if value is a Promise.
                                                           * @param {*} val
                                                           * @return {boolean}
                                                           */

  function isPromise(val) {
    return val && (typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object' && typeof val.then === 'function';
  }

  this['sennaNamed']['coreNamed']['isPromise'] = isPromise; /**
                                                             * Returns true if value is a string.
                                                             * @param {*} val
                                                             * @return {boolean}
                                                             */

  function isString(val) {
    return typeof val === 'string' || val instanceof String;
  }

  this['sennaNamed']['coreNamed']['isString'] = isString; /**
                                                           * Null function used for default values of callbacks, etc.
                                                           * @return {void} Nothing.
                                                           */

  function nullFunction() {}
  this['sennaNamed']['coreNamed']['nullFunction'] = nullFunction;
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var core = this['sennaNamed']['coreNamed'];
  this['senna']['core'] = core;
  this['sennaNamed']['core'] = this['sennaNamed']['core'] || {};
  this['sennaNamed']['core']['core'] = core;
  Object.keys(this['sennaNamed']['coreNamed']).forEach(function (key) {
    this['sennaNamed']['core'][key] = this['sennaNamed']['coreNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var isDef = this['sennaNamed']['core']['isDef'];

	var array = function () {
		function array() {
			babelHelpers.classCallCheck(this, array);
		}

		babelHelpers.createClass(array, null, [{
			key: 'equal',

			/**
    * Checks if the given arrays have the same content.
    * @param {!Array<*>} arr1
    * @param {!Array<*>} arr2
    * @return {boolean}
    */
			value: function equal(arr1, arr2) {
				if (arr1 === arr2) {
					return true;
				}
				if (arr1.length !== arr2.length) {
					return false;
				}
				for (var i = 0; i < arr1.length; i++) {
					if (arr1[i] !== arr2[i]) {
						return false;
					}
				}
				return true;
			}

			/**
    * Returns the first value in the given array that isn't undefined.
    * @param {!Array} arr
    * @return {*}
    */

		}, {
			key: 'firstDefinedValue',
			value: function firstDefinedValue(arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] !== undefined) {
						return arr[i];
					}
				}
			}

			/**
    * Transforms the input nested array to become flat.
    * @param {Array.<*|Array.<*>>} arr Nested array to flatten.
    * @param {Array.<*>} opt_output Optional output array.
    * @return {Array.<*>} Flat array.
    */

		}, {
			key: 'flatten',
			value: function flatten(arr, opt_output) {
				var output = opt_output || [];
				for (var i = 0; i < arr.length; i++) {
					if (Array.isArray(arr[i])) {
						array.flatten(arr[i], output);
					} else {
						output.push(arr[i]);
					}
				}
				return output;
			}

			/**
    * Removes the first occurrence of a particular value from an array.
    * @param {Array.<T>} arr Array from which to remove value.
    * @param {T} obj Object to remove.
    * @return {boolean} True if an element was removed.
    * @template T
    */

		}, {
			key: 'remove',
			value: function remove(arr, obj) {
				var i = arr.indexOf(obj);
				var rv = void 0;
				if (rv = i >= 0) {
					array.removeAt(arr, i);
				}
				return rv;
			}

			/**
    * Removes from an array the element at index i
    * @param {Array} arr Array or array like object from which to remove value.
    * @param {number} i The index to remove.
    * @return {boolean} True if an element was removed.
    */

		}, {
			key: 'removeAt',
			value: function removeAt(arr, i) {
				return Array.prototype.splice.call(arr, i, 1).length === 1;
			}

			/**
    * Slices the given array, just like Array.prototype.slice, but this
    * is faster and working on all array-like objects (like arguments).
    * @param {!Object} arr Array-like object to slice.
    * @param {number} start The index that should start the slice.
    * @param {number=} opt_end The index where the slice should end, not
    *   included in the final array. If not given, all elements after the
    *   start index will be included.
    * @return {!Array}
    */

		}, {
			key: 'slice',
			value: function slice(arr, start, opt_end) {
				var sliced = [];
				var end = isDef(opt_end) ? opt_end : arr.length;
				for (var i = start; i < end; i++) {
					sliced.push(arr[i]);
				}
				return sliced;
			}
		}]);
		return array;
	}();

	this['senna']['array'] = array;
}).call(this);
/*!
 * Polyfill from Google's Closure Library.
 * Copyright 2013 The Closure Library Authors. All Rights Reserved.
 */

'use strict';

(function () {
	var async = {};

	/**
  * Throw an item without interrupting the current execution context.  For
  * example, if processing a group of items in a loop, sometimes it is useful
  * to report an error while still allowing the rest of the batch to be
  * processed.
  * @param {*} exception
  */
	async.throwException = function (exception) {
		// Each throw needs to be in its own context.
		async.nextTick(function () {
			throw exception;
		});
	};

	/**
  * Fires the provided callback just before the current callstack unwinds, or as
  * soon as possible after the current JS execution context.
  * @param {function(this:THIS)} callback
  * @param {THIS=} opt_context Object to use as the "this value" when calling
  *     the provided function.
  * @template THIS
  */
	async.run = function (callback, opt_context) {
		if (!async.run.workQueueScheduled_) {
			// Nothing is currently scheduled, schedule it now.
			async.nextTick(async.run.processWorkQueue);
			async.run.workQueueScheduled_ = true;
		}

		async.run.workQueue_.push(new async.run.WorkItem_(callback, opt_context));
	};

	/** @private {boolean} */
	async.run.workQueueScheduled_ = false;

	/** @private {!Array.<!async.run.WorkItem_>} */
	async.run.workQueue_ = [];

	/**
  * Run any pending async.run work items. This function is not intended
  * for general use, but for use by entry point handlers to run items ahead of
  * async.nextTick.
  */
	async.run.processWorkQueue = function () {
		// NOTE: additional work queue items may be pushed while processing.
		while (async.run.workQueue_.length) {
			// Don't let the work queue grow indefinitely.
			var workItems = async.run.workQueue_;
			async.run.workQueue_ = [];
			for (var i = 0; i < workItems.length; i++) {
				var workItem = workItems[i];
				try {
					workItem.fn.call(workItem.scope);
				} catch (e) {
					async.throwException(e);
				}
			}
		}

		// There are no more work items, reset the work queue.
		async.run.workQueueScheduled_ = false;
	};

	/**
  * @constructor
  * @final
  * @struct
  * @private
  *
  * @param {function()} fn
  * @param {Object|null|undefined} scope
  */
	async.run.WorkItem_ = function (fn, scope) {
		/** @const */
		this.fn = fn;
		/** @const */
		this.scope = scope;
	};

	/**
  * Fires the provided callbacks as soon as possible after the current JS
  * execution context. setTimeout(…, 0) always takes at least 5ms for legacy
  * reasons.
  * @param {function(this:SCOPE)} callback Callback function to fire as soon as
  *     possible.
  * @param {SCOPE=} opt_context Object in whose scope to call the listener.
  * @template SCOPE
  */
	async.nextTick = function (callback, opt_context) {
		var cb = callback;
		if (opt_context) {
			cb = callback.bind(opt_context);
		}
		cb = async.nextTick.wrapCallback_(cb);
		// Introduced and currently only supported by IE10.
		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof setImmediate === 'function') {
			setImmediate(cb);
			return;
		}
		// Look for and cache the custom fallback version of setImmediate.
		if (!async.nextTick.setImmediate_) {
			async.nextTick.setImmediate_ = async.nextTick.getSetImmediateEmulator_();
		}
		async.nextTick.setImmediate_(cb);
	};

	/**
  * Cache for the setImmediate implementation.
  * @type {function(function())}
  * @private
  */
	async.nextTick.setImmediate_ = null;

	/**
  * Determines the best possible implementation to run a function as soon as
  * the JS event loop is idle.
  * @return {function(function())} The "setImmediate" implementation.
  * @private
  */
	async.nextTick.getSetImmediateEmulator_ = function () {
		// Create a private message channel and use it to postMessage empty messages
		// to ourselves.
		var Channel = void 0;

		// Verify if variable is defined on the current runtime (i.e., node, browser).
		// Can't use typeof enclosed in a function (such as core.isFunction) or an
		// exception will be thrown when the function is called on an environment
		// where the variable is undefined.
		if (typeof MessageChannel === 'function') {
			Channel = MessageChannel;
		}

		// If MessageChannel is not available and we are in a browser, implement
		// an iframe based polyfill in browsers that have postMessage and
		// document.addEventListener. The latter excludes IE8 because it has a
		// synchronous postMessage implementation.
		if (typeof Channel === 'undefined' && typeof window !== 'undefined' && window.postMessage && window.addEventListener) {
			/** @constructor */
			Channel = function Channel() {
				// Make an empty, invisible iframe.
				var iframe = document.createElement('iframe');
				iframe.style.display = 'none';
				iframe.src = '';
				document.documentElement.appendChild(iframe);
				var win = iframe.contentWindow;
				var doc = win.document;
				doc.open();
				doc.write('');
				doc.close();
				var message = 'callImmediate' + Math.random();
				var origin = win.location.protocol + '//' + win.location.host;
				var onmessage = function (e) {
					// Validate origin and message to make sure that this message was
					// intended for us.
					if (e.origin !== origin && e.data !== message) {
						return;
					}
					this.port1.onmessage();
				}.bind(this);
				win.addEventListener('message', onmessage, false);
				this.port1 = {};
				this.port2 = {
					postMessage: function postMessage() {
						win.postMessage(message, origin);
					}
				};
			};
		}
		if (typeof Channel !== 'undefined') {
			var _ret = function () {
				var channel = new Channel();
				// Use a fifo linked list to call callbacks in the right order.
				var head = {};
				var tail = head;
				channel.port1.onmessage = function () {
					head = head.next;
					var cb = head.cb;
					head.cb = null;
					cb();
				};
				return {
					v: function v(cb) {
						tail.next = {
							cb: cb
						};
						tail = tail.next;
						channel.port2.postMessage(0);
					}
				};
			}();

			if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
		}
		// Implementation for IE6-8: Script elements fire an asynchronous
		// onreadystatechange event when inserted into the DOM.
		if (typeof document !== 'undefined' && 'onreadystatechange' in document.createElement('script')) {
			return function (cb) {
				var script = document.createElement('script');
				script.onreadystatechange = function () {
					// Clean up and call the callback.
					script.onreadystatechange = null;
					script.parentNode.removeChild(script);
					script = null;
					cb();
					cb = null;
				};
				document.documentElement.appendChild(script);
			};
		}
		// Fall back to setTimeout with 0. In browsers this creates a delay of 5ms
		// or more.
		return function (cb) {
			setTimeout(cb, 0);
		};
	};

	/**
  * Helper function that is overrided to protect callbacks with entry point
  * monitor if the application monitors entry points.
  * @param {function()} callback Callback function to fire as soon as possible.
  * @return {function()} The wrapped callback.
  * @private
  */
	async.nextTick.wrapCallback_ = function (opt_returnValue) {
		return opt_returnValue;
	};

	this['senna']['async'] = async;
}).call(this);
'use strict';

/**
 * Disposable utility. When inherited provides the `dispose` function to its
 * subclass, which is responsible for disposing of any object references
 * when an instance won't be used anymore. Subclasses should override
 * `disposeInternal` to implement any specific disposing logic.
 * @constructor
 */

(function () {
	var Disposable = function () {
		function Disposable() {
			babelHelpers.classCallCheck(this, Disposable);

			/**
    * Flag indicating if this instance has already been disposed.
    * @type {boolean}
    * @protected
    */
			this.disposed_ = false;
		}

		/**
   * Disposes of this instance's object references. Calls `disposeInternal`.
   */


		babelHelpers.createClass(Disposable, [{
			key: 'dispose',
			value: function dispose() {
				if (!this.disposed_) {
					this.disposeInternal();
					this.disposed_ = true;
				}
			}

			/**
    * Subclasses should override this method to implement any specific
    * disposing logic (like clearing references and calling `dispose` on other
    * disposables).
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {}

			/**
    * Checks if this instance has already been disposed.
    * @return {boolean}
    */

		}, {
			key: 'isDisposed',
			value: function isDisposed() {
				return this.disposed_;
			}
		}]);
		return Disposable;
	}();

	this['senna']['Disposable'] = Disposable;
}).call(this);
'use strict';

(function () {
	var object = function () {
		function object() {
			babelHelpers.classCallCheck(this, object);
		}

		babelHelpers.createClass(object, null, [{
			key: 'mixin',

			/**
    * Copies all the members of a source object to a target object.
    * @param {Object} target Target object.
    * @param {...Object} var_args The objects from which values will be copied.
    * @return {Object} Returns the target object reference.
    */
			value: function mixin(target) {
				var key = void 0,
				    source = void 0;
				for (var i = 1; i < arguments.length; i++) {
					source = arguments[i];
					for (key in source) {
						target[key] = source[key];
					}
				}
				return target;
			}

			/**
    * Returns an object based on its fully qualified external name.
    * @param {string} name The fully qualified name.
    * @param {object=} opt_obj The object within which to look; default is
    *     <code>window</code>.
    * @return {?} The value (object or primitive) or, if not found, undefined.
    */

		}, {
			key: 'getObjectByName',
			value: function getObjectByName(name, opt_obj) {
				var scope = opt_obj || window;
				var parts = name.split('.');
				return parts.reduce(function (part, key) {
					return part[key];
				}, scope);
			}

			/**
    * Returns a new object with the same keys as the given one, but with
    * their values set to the return values of the specified function.
    * @param {!Object} obj
    * @param {!function(string, *)} fn
    * @return {!Object}
    */

		}, {
			key: 'map',
			value: function map(obj, fn) {
				var mappedObj = {};
				var keys = Object.keys(obj);
				for (var i = 0; i < keys.length; i++) {
					mappedObj[keys[i]] = fn(keys[i], obj[keys[i]]);
				}
				return mappedObj;
			}

			/**
    * Checks if the two given objects are equal. This is done via a shallow
    * check, including only the keys directly contained by the 2 objects.
    * @return {boolean}
    */

		}, {
			key: 'shallowEqual',
			value: function shallowEqual(obj1, obj2) {
				if (obj1 === obj2) {
					return true;
				}

				var keys1 = Object.keys(obj1);
				var keys2 = Object.keys(obj2);
				if (keys1.length !== keys2.length) {
					return false;
				}

				for (var i = 0; i < keys1.length; i++) {
					if (obj1[keys1[i]] !== obj2[keys1[i]]) {
						return false;
					}
				}
				return true;
			}
		}]);
		return object;
	}();

	this['senna']['object'] = object;
}).call(this);
'use strict';

(function () {
	var string = function () {
		function string() {
			babelHelpers.classCallCheck(this, string);
		}

		babelHelpers.createClass(string, null, [{
			key: 'caseInsensitiveCompare',

			/**
    * Compares the given strings without taking the case into account.
    * @param {string|number} str1
    * @param {string|number} str2
    * @return {number} Either -1, 0 or 1, according to if the first string is
    *     "smaller", equal or "bigger" than the second given string.
    */
			value: function caseInsensitiveCompare(str1, str2) {
				var test1 = String(str1).toLowerCase();
				var test2 = String(str2).toLowerCase();

				if (test1 < test2) {
					return -1;
				} else if (test1 === test2) {
					return 0;
				} else {
					return 1;
				}
			}

			/**
    * Removes the breaking spaces from the left and right of the string and
    * collapses the sequences of breaking spaces in the middle into single spaces.
    * The original and the result strings render the same way in HTML.
    * @param {string} str A string in which to collapse spaces.
    * @return {string} Copy of the string with normalized breaking spaces.
    */

		}, {
			key: 'collapseBreakingSpaces',
			value: function collapseBreakingSpaces(str) {
				return str.replace(/[\t\r\n ]+/g, ' ').replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, '');
			}

			/**
   * Escapes characters in the string that are not safe to use in a RegExp.
   * @param {*} str The string to escape. If not a string, it will be casted
   *     to one.
   * @return {string} A RegExp safe, escaped copy of {@code s}.
   */

		}, {
			key: 'escapeRegex',
			value: function escapeRegex(str) {
				return String(str).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
			}

			/**
   * Returns a string with at least 64-bits of randomness.
   * @return {string} A random string, e.g. sn1s7vb4gcic.
   */

		}, {
			key: 'getRandomString',
			value: function getRandomString() {
				var x = 2147483648;
				return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ Date.now()).toString(36);
			}

			/**
    * Calculates the hashcode for a string. The hashcode value is computed by
    * the sum algorithm: s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. A nice
    * property of using 31 prime is that the multiplication can be replaced by
    * a shift and a subtraction for better performance: 31*i == (i<<5)-i.
    * Modern VMs do this sort of optimization automatically.
    * @param {String} val Target string.
    * @return {Number} Returns the string hashcode.
    */

		}, {
			key: 'hashCode',
			value: function hashCode(val) {
				var hash = 0;
				for (var i = 0, len = val.length; i < len; i++) {
					hash = 31 * hash + val.charCodeAt(i);
					hash %= 0x100000000;
				}
				return hash;
			}

			/**
    * Replaces interval into the string with specified value, e.g.
    * `replaceInterval("abcde", 1, 4, "")` returns "ae".
    * @param {string} str The input string.
    * @param {Number} start Start interval position to be replaced.
    * @param {Number} end End interval position to be replaced.
    * @param {string} value The value that replaces the specified interval.
    * @return {string}
    */

		}, {
			key: 'replaceInterval',
			value: function replaceInterval(str, start, end, value) {
				return str.substring(0, start) + value + str.substring(end);
			}
		}]);
		return string;
	}();

	this['senna']['string'] = string;
}).call(this);
'use strict';

(function () {
  var core = this['senna']['core'];
  var array = this['senna']['array'];
  var async = this['senna']['async'];
  var Disposable = this['senna']['Disposable'];
  var object = this['senna']['object'];
  var string = this['senna']['string'];
  this['sennaNamed']['metal'] = this['sennaNamed']['metal'] || {};
  Object.keys(this['sennaNamed']['core']).forEach(function (key) {
    this['sennaNamed']['metal'][key] = this['sennaNamed']['core'][key];
  });
  this['sennaNamed']['metal']['array'] = array;
  this['sennaNamed']['metal']['async'] = async;
  this['sennaNamed']['metal']['Disposable'] = Disposable;
  this['sennaNamed']['metal']['object'] = object;
  this['sennaNamed']['metal']['string'] = string;
  this['senna']['metal'] = core;
}).call(this);
'use strict';

/**
 * Parses the given uri string into an object.
 * @param {*=} opt_uri Optional string URI to parse
 */

(function () {
	function parseFromAnchor(opt_uri) {
		var link = document.createElement('a');
		link.href = opt_uri;
		return {
			hash: link.hash,
			hostname: link.hostname,
			password: link.password,
			pathname: link.pathname[0] === '/' ? link.pathname : '/' + link.pathname,
			port: link.port,
			protocol: link.protocol,
			search: link.search,
			username: link.username
		};
	}

	this['senna']['parseFromAnchor'] = parseFromAnchor;
}).call(this);
'use strict';

(function () {
	var isFunction = this['sennaNamed']['metal']['isFunction'];
	var parseFromAnchor = this['senna']['parseFromAnchor'];

	/**
  * Parses the given uri string into an object. The URL function will be used
  * when present, otherwise we'll fall back to the anchor node element.
  * @param {*=} opt_uri Optional string URI to parse
  */

	function parse(opt_uri) {
		if (isFunction(URL) && URL.length) {
			return new URL(opt_uri);
		} else {
			return parseFromAnchor(opt_uri);
		}
	}

	this['senna']['parse'] = parse;
}).call(this);
'use strict';

(function () {
	var Disposable = this['sennaNamed']['metal']['Disposable'];

	/**
  * A cached reference to the create function.
  */

	var create = Object.create;

	/**
  * Case insensitive string Multimap implementation. Allows multiple values for
  * the same key name.
  * @extends {Disposable}
  */

	var MultiMap = function (_Disposable) {
		babelHelpers.inherits(MultiMap, _Disposable);

		function MultiMap() {
			babelHelpers.classCallCheck(this, MultiMap);

			var _this = babelHelpers.possibleConstructorReturn(this, (MultiMap.__proto__ || Object.getPrototypeOf(MultiMap)).call(this));

			_this.keys = create(null);
			_this.values = create(null);
			return _this;
		}

		/**
   * Adds value to a key name.
   * @param {string} name
   * @param {*} value
   * @chainable
   */


		babelHelpers.createClass(MultiMap, [{
			key: 'add',
			value: function add(name, value) {
				this.keys[name.toLowerCase()] = name;
				this.values[name.toLowerCase()] = this.values[name.toLowerCase()] || [];
				this.values[name.toLowerCase()].push(value);
				return this;
			}

			/**
    * Clears map names and values.
    * @chainable
    */

		}, {
			key: 'clear',
			value: function clear() {
				this.keys = create(null);
				this.values = create(null);
				return this;
			}

			/**
    * Checks if map contains a value to the key name.
    * @param {string} name
    * @return {boolean}
    * @chainable
    */

		}, {
			key: 'contains',
			value: function contains(name) {
				return name.toLowerCase() in this.values;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.values = null;
			}

			/**
    * Creates a `MultiMap` instance from the given object.
    * @param {!Object} obj
    * @return {!MultiMap}
    */

		}, {
			key: 'get',


			/**
    * Gets the first added value from a key name.
    * @param {string} name
    * @return {*}
    * @chainable
    */
			value: function get(name) {
				var values = this.values[name.toLowerCase()];
				if (values) {
					return values[0];
				}
			}

			/**
    * Gets all values from a key name.
    * @param {string} name
    * @return {Array.<*>}
    */

		}, {
			key: 'getAll',
			value: function getAll(name) {
				return this.values[name.toLowerCase()];
			}

			/**
    * Returns true if the map is empty, false otherwise.
    * @return {boolean}
    */

		}, {
			key: 'isEmpty',
			value: function isEmpty() {
				return this.size() === 0;
			}

			/**
    * Gets array of key names.
    * @return {Array.<string>}
    */

		}, {
			key: 'names',
			value: function names() {
				var _this2 = this;

				return Object.keys(this.values).map(function (key) {
					return _this2.keys[key];
				});
			}

			/**
    * Removes all values from a key name.
    * @param {string} name
    * @chainable
    */

		}, {
			key: 'remove',
			value: function remove(name) {
				delete this.keys[name.toLowerCase()];
				delete this.values[name.toLowerCase()];
				return this;
			}

			/**
    * Sets the value of a key name. Relevant to replace the current values with
    * a new one.
    * @param {string} name
    * @param {*} value
    * @chainable
    */

		}, {
			key: 'set',
			value: function set(name, value) {
				this.keys[name.toLowerCase()] = name;
				this.values[name.toLowerCase()] = [value];
				return this;
			}

			/**
    * Gets the size of the map key names.
    * @return {number}
    */

		}, {
			key: 'size',
			value: function size() {
				return this.names().length;
			}

			/**
    * Returns the parsed values as a string.
    * @return {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				return JSON.stringify(this.values);
			}
		}], [{
			key: 'fromObject',
			value: function fromObject(obj) {
				var map = new MultiMap();
				var keys = Object.keys(obj);
				for (var i = 0; i < keys.length; i++) {
					map.set(keys[i], obj[keys[i]]);
				}
				return map;
			}
		}]);
		return MultiMap;
	}(Disposable);

	this['senna']['MultiMap'] = MultiMap;
}).call(this);
'use strict';

(function () {
	var array = this['sennaNamed']['metal']['array'];

	/**
  * Generic tree node data structure with arbitrary number of child nodes.
  * @param {V} value Value.
  * @constructor
  */

	var TreeNode = function () {
		function TreeNode(value) {
			babelHelpers.classCallCheck(this, TreeNode);

			/**
    * The value.
    * @private {V}
    */
			this.value_ = value;

			/**
    * Reference to the parent node or null if it has no parent.
    * @private {TreeNode}
    */
			this.parent_ = null;

			/**
    * Child nodes or null in case of leaf node.
    * @private {Array<!TreeNode>}
    */
			this.children_ = null;
		}

		/**
   * Appends a child node to this node.
   * @param {!TreeNode} child Orphan child node.
   */


		babelHelpers.createClass(TreeNode, [{
			key: 'addChild',
			value: function addChild(child) {
				assertChildHasNoParent(child);
				child.setParent(this);
				this.children_ = this.children_ || [];
				this.children_.push(child);
			}

			/**
    * Tells whether this node is the ancestor of the given node.
    * @param {!TreeNode} node A node.
    * @return {boolean} Whether this node is the ancestor of {@code node}.
    */

		}, {
			key: 'contains',
			value: function contains(node) {
				var current = node.getParent();
				while (current) {
					if (current === this) {
						return true;
					}
					current = current.getParent();
				}
				return false;
			}

			/**
    * @return {!Array<TreeNode>} All ancestor nodes in bottom-up order.
    */

		}, {
			key: 'getAncestors',
			value: function getAncestors() {
				var ancestors = [];
				var node = this.getParent();
				while (node) {
					ancestors.push(node);
					node = node.getParent();
				}
				return ancestors;
			}

			/**
    * Gets the child node of this node at the given index.
    * @param {number} index Child index.
    * @return {?TreeNode} The node at the given index
    * or null if not found.
    */

		}, {
			key: 'getChildAt',
			value: function getChildAt(index) {
				return this.getChildren()[index] || null;
			}

			/**
    * @return {?Array<!TreeNode>} Child nodes or null in case of leaf node.
    */

		}, {
			key: 'getChildren',
			value: function getChildren() {
				return this.children_ || TreeNode.EMPTY_ARRAY;
			}

			/**
    * @return {number} The number of children.
    */

		}, {
			key: 'getChildCount',
			value: function getChildCount() {
				return this.getChildren().length;
			}

			/**
    * @return {number} The number of ancestors of the node.
    */

		}, {
			key: 'getDepth',
			value: function getDepth() {
				var depth = 0;
				var node = this;
				while (node.getParent()) {
					depth++;
					node = node.getParent();
				}
				return depth;
			}

			/**
    * @return {?TreeNode} Parent node or null if it has no parent.
    */

		}, {
			key: 'getParent',
			value: function getParent() {
				return this.parent_;
			}

			/**
    * @return {!TreeNode} The root of the tree structure, i.e. the farthest
    * ancestor of the node or the node itself if it has no parents.
    */

		}, {
			key: 'getRoot',
			value: function getRoot() {
				var root = this;
				while (root.getParent()) {
					root = root.getParent();
				}
				return root;
			}

			/**
    * Gets the value.
    * @return {V} The value.
    */

		}, {
			key: 'getValue',
			value: function getValue() {
				return this.value_;
			}

			/**
    * @return {boolean} Whether the node is a leaf node.
    */

		}, {
			key: 'isLeaf',
			value: function isLeaf() {
				return !this.getChildCount();
			}

			/**
    * Removes the given child node of this node.
    * @param {TreeNode} child The node to remove.
    * @return {TreeNode} The removed node if any, null otherwise.
    */

		}, {
			key: 'removeChild',
			value: function removeChild(child) {
				if (array.remove(this.getChildren(), child)) {
					return child;
				}
				return null;
			}

			/**
    * Sets the parent node of this node. The callers must ensure that the
    * parent node and only that has this node among its children.
    * @param {TreeNode} parent The parent to set. If null, the node will be
    * detached from the tree.
    * @protected
    */

		}, {
			key: 'setParent',
			value: function setParent(parent) {
				this.parent_ = parent;
			}

			/**
    * Traverses the subtree. The first callback starts with this node,
    * and visits the descendant nodes depth-first, in preorder.
    * The second callback, starts with deepest child then visits
    * the ancestor nodes depth-first, in postorder. E.g.
    *
    *  	 A
    *    / \
    *   B   C
    *  /   / \
    * D   E   F
    *
    * preorder -> ['A', 'B', 'D', 'C', 'E', 'F']
    * postorder -> ['D', 'B', 'E', 'F', 'C', 'A']
    *
    * @param {function=} opt_preorderFn The callback to execute when visiting a node.
    * @param {function=} opt_postorderFn The callback to execute before leaving a node.
    */

		}, {
			key: 'traverse',
			value: function traverse(opt_preorderFn, opt_postorderFn) {
				if (opt_preorderFn) {
					opt_preorderFn(this);
				}
				this.getChildren().forEach(function (child) {
					return child.traverse(opt_preorderFn, opt_postorderFn);
				});
				if (opt_postorderFn) {
					opt_postorderFn(this);
				}
			}
		}]);
		return TreeNode;
	}();

	/**
  * Constant for empty array to avoid unnecessary allocations.
  * @private
  */


	TreeNode.EMPTY_ARRAY = [];

	/**
  * Asserts that child has no parent.
  * @param {TreeNode} child A child.
  * @private
  */
	var assertChildHasNoParent = function assertChildHasNoParent(child) {
		if (child.getParent()) {
			throw new Error('Cannot add child with parent.');
		}
	};

	this['senna']['TreeNode'] = TreeNode;
}).call(this);
'use strict';

(function () {
  var MultiMap = this['senna']['MultiMap'];
  var TreeNode = this['senna']['TreeNode'];
  this['sennaNamed']['structs'] = this['sennaNamed']['structs'] || {};
  this['sennaNamed']['structs']['MultiMap'] = MultiMap;
  this['sennaNamed']['structs']['TreeNode'] = TreeNode;
}).call(this);
'use strict';

(function () {
	var isDef = this['sennaNamed']['metal']['isDef'];
	var string = this['sennaNamed']['metal']['string'];
	var parse = this['senna']['parse'];
	var MultiMap = this['sennaNamed']['structs']['MultiMap'];


	var parseFn_ = parse;

	var Uri = function () {

		/**
   * This class contains setters and getters for the parts of the URI.
   * The following figure displays an example URIs and their component parts.
   *
   *                                  path
   *	                             ┌───┴────┐
   *	  abc://example.com:123/path/data?key=value#fragid1
   *	  └┬┘   └────┬────┘ └┬┘           └───┬───┘ └──┬──┘
   * protocol  hostname  port            search    hash
   *          └──────┬───────┘
   *                host
   *
   * @param {*=} opt_uri Optional string URI to parse
   * @constructor
   */
		function Uri() {
			var opt_uri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			babelHelpers.classCallCheck(this, Uri);

			this.url = Uri.parse(this.maybeAddProtocolAndHostname_(opt_uri));
		}

		/**
   * Adds parameters to uri from a <code>MultiMap</code> as source.
   * @param {MultiMap} multimap The <code>MultiMap</code> containing the
   *   parameters.
   * @protected
   * @chainable
   */


		babelHelpers.createClass(Uri, [{
			key: 'addParametersFromMultiMap',
			value: function addParametersFromMultiMap(multimap) {
				var _this = this;

				multimap.names().forEach(function (name) {
					multimap.getAll(name).forEach(function (value) {
						_this.addParameterValue(name, value);
					});
				});
				return this;
			}

			/**
    * Adds the value of the named query parameters.
    * @param {string} key The parameter to set.
    * @param {*} value The new value. Will be explicitly casted to String.
    * @chainable
    */

		}, {
			key: 'addParameterValue',
			value: function addParameterValue(name, value) {
				this.ensureQueryInitialized_();
				if (isDef(value)) {
					value = String(value);
				}
				this.query.add(name, value);
				return this;
			}

			/**
    * Adds the values of the named query parameter.
    * @param {string} key The parameter to set.
    * @param {*} value The new value.
    * @chainable
    */

		}, {
			key: 'addParameterValues',
			value: function addParameterValues(name, values) {
				var _this2 = this;

				values.forEach(function (value) {
					return _this2.addParameterValue(name, value);
				});
				return this;
			}

			/**
    * Ensures query internal map is initialized and synced with initial value
    * extracted from URI search part.
    * @protected
    */

		}, {
			key: 'ensureQueryInitialized_',
			value: function ensureQueryInitialized_() {
				var _this3 = this;

				if (this.query) {
					return;
				}
				this.query = new MultiMap();
				var search = this.url.search;
				if (search) {
					search.substring(1).split('&').forEach(function (param) {
						var _param$split = param.split('='),
						    _param$split2 = babelHelpers.slicedToArray(_param$split, 2),
						    key = _param$split2[0],
						    value = _param$split2[1];

						if (isDef(value)) {
							value = Uri.urlDecode(value);
						}
						_this3.addParameterValue(key, value);
					});
				}
			}

			/**
    * Gets the hash part of uri.
    * @return {string}
    */

		}, {
			key: 'getHash',
			value: function getHash() {
				return this.url.hash || '';
			}

			/**
    * Gets the host part of uri. E.g. <code>[hostname]:[port]</code>.
    * @return {string}
    */

		}, {
			key: 'getHost',
			value: function getHost() {
				var host = this.getHostname();
				if (host) {
					var port = this.getPort();
					if (port && port !== '80') {
						host += ':' + port;
					}
				}
				return host;
			}

			/**
    * Gets the hostname part of uri without protocol and port.
    * @return {string}
    */

		}, {
			key: 'getHostname',
			value: function getHostname() {
				var hostname = this.url.hostname;
				if (hostname === Uri.HOSTNAME_PLACEHOLDER) {
					return '';
				}
				return hostname;
			}

			/**
    * Gets the origin part of uri. E.g. <code>http://[hostname]:[port]</code>.
    * @return {string}
    */

		}, {
			key: 'getOrigin',
			value: function getOrigin() {
				var host = this.getHost();
				if (host) {
					return this.getProtocol() + '//' + host;
				}
				return '';
			}

			/**
    * Returns the first value for a given parameter or undefined if the given
    * parameter name does not appear in the query string.
    * @param {string} paramName Unescaped parameter name.
    * @return {string|undefined} The first value for a given parameter or
    *   undefined if the given parameter name does not appear in the query
    *   string.
    */

		}, {
			key: 'getParameterValue',
			value: function getParameterValue(name) {
				this.ensureQueryInitialized_();
				return this.query.get(name);
			}

			/**
    * Returns the value<b>s</b> for a given parameter as a list of decoded
    * query parameter values.
    * @param {string} name The parameter to get values for.
    * @return {!Array<?>} The values for a given parameter as a list of decoded
    *   query parameter values.
    */

		}, {
			key: 'getParameterValues',
			value: function getParameterValues(name) {
				this.ensureQueryInitialized_();
				return this.query.getAll(name);
			}

			/**
    * Returns the name<b>s</b> of the parameters.
    * @return {!Array<string>} The names for the parameters as a list of
    *   strings.
    */

		}, {
			key: 'getParameterNames',
			value: function getParameterNames() {
				this.ensureQueryInitialized_();
				return this.query.names();
			}

			/**
    * Gets the function currently being used to parse URIs.
    * @return {!function()}
    */

		}, {
			key: 'getPathname',


			/**
    * Gets the pathname part of uri.
    * @return {string}
    */
			value: function getPathname() {
				return this.url.pathname;
			}

			/**
    * Gets the port number part of uri as string.
    * @return {string}
    */

		}, {
			key: 'getPort',
			value: function getPort() {
				return this.url.port;
			}

			/**
    * Gets the protocol part of uri. E.g. <code>http:</code>.
    * @return {string}
    */

		}, {
			key: 'getProtocol',
			value: function getProtocol() {
				return this.url.protocol;
			}

			/**
    * Gets the search part of uri. Search value is retrieved from query
    * parameters.
    * @return {string}
    */

		}, {
			key: 'getSearch',
			value: function getSearch() {
				var _this4 = this;

				var search = '';
				var querystring = '';
				this.getParameterNames().forEach(function (name) {
					_this4.getParameterValues(name).forEach(function (value) {
						querystring += name;
						if (isDef(value)) {
							querystring += '=' + encodeURIComponent(value);
						}
						querystring += '&';
					});
				});
				querystring = querystring.slice(0, -1);
				if (querystring) {
					search += '?' + querystring;
				}
				return search;
			}

			/**
    * Checks if uri contains the parameter.
    * @param {string} name
    * @return {boolean}
    */

		}, {
			key: 'hasParameter',
			value: function hasParameter(name) {
				this.ensureQueryInitialized_();
				return this.query.contains(name);
			}

			/**
    * Makes this URL unique by adding a random param to it. Useful for avoiding
    * cache.
    */

		}, {
			key: 'makeUnique',
			value: function makeUnique() {
				this.setParameterValue(Uri.RANDOM_PARAM, string.getRandomString());
				return this;
			}

			/**
    * Maybe adds protocol and a hostname placeholder on a parial URI if needed.
    * Relevent for compatibility with <code>URL</code> native object.
    * @param {string=} opt_uri
    * @return {string} URI with protocol and hostname placeholder.
    */

		}, {
			key: 'maybeAddProtocolAndHostname_',
			value: function maybeAddProtocolAndHostname_(opt_uri) {
				var url = opt_uri;
				if (opt_uri.indexOf('://') === -1 && opt_uri.indexOf('javascript:') !== 0) {
					// jshint ignore:line

					url = Uri.DEFAULT_PROTOCOL;
					if (opt_uri[0] !== '/' || opt_uri[1] !== '/') {
						url += '//';
					}

					switch (opt_uri.charAt(0)) {
						case '.':
						case '?':
						case '#':
							url += Uri.HOSTNAME_PLACEHOLDER;
							url += '/';
							url += opt_uri;
							break;
						case '':
						case '/':
							if (opt_uri[1] !== '/') {
								url += Uri.HOSTNAME_PLACEHOLDER;
							}
							url += opt_uri;
							break;
						default:
							url += opt_uri;
					}
				}
				return url;
			}

			/**
    * Normalizes the parsed object to be in the expected standard.
    * @param {!Object}
    */

		}, {
			key: 'removeParameter',


			/**
    * Removes the named query parameter.
    * @param {string} name The parameter to remove.
    * @chainable
    */
			value: function removeParameter(name) {
				this.ensureQueryInitialized_();
				this.query.remove(name);
				return this;
			}

			/**
    * Removes uniqueness parameter of the uri.
    * @chainable
    */

		}, {
			key: 'removeUnique',
			value: function removeUnique() {
				this.removeParameter(Uri.RANDOM_PARAM);
				return this;
			}

			/**
    * Sets the hash.
    * @param {string} hash
    * @chainable
    */

		}, {
			key: 'setHash',
			value: function setHash(hash) {
				this.url.hash = hash;
				return this;
			}

			/**
    * Sets the hostname.
    * @param {string} hostname
    * @chainable
    */

		}, {
			key: 'setHostname',
			value: function setHostname(hostname) {
				this.url.hostname = hostname;
				return this;
			}

			/**
    * Sets the value of the named query parameters, clearing previous values
    * for that key.
    * @param {string} key The parameter to set.
    * @param {*} value The new value.
    * @chainable
    */

		}, {
			key: 'setParameterValue',
			value: function setParameterValue(name, value) {
				this.removeParameter(name);
				this.addParameterValue(name, value);
				return this;
			}

			/**
    * Sets the values of the named query parameters, clearing previous values
    * for that key.
    * @param {string} key The parameter to set.
    * @param {*} value The new value.
    * @chainable
    */

		}, {
			key: 'setParameterValues',
			value: function setParameterValues(name, values) {
				var _this5 = this;

				this.removeParameter(name);
				values.forEach(function (value) {
					return _this5.addParameterValue(name, value);
				});
				return this;
			}

			/**
    * Sets the pathname.
    * @param {string} pathname
    * @chainable
    */

		}, {
			key: 'setPathname',
			value: function setPathname(pathname) {
				this.url.pathname = pathname;
				return this;
			}

			/**
    * Sets the port number.
    * @param {*} port Port number.
    * @chainable
    */

		}, {
			key: 'setPort',
			value: function setPort(port) {
				this.url.port = port;
				return this;
			}

			/**
    * Sets the function that will be used for parsing the original string uri
    * into an object.
    * @param {!function()} parseFn
    */

		}, {
			key: 'setProtocol',


			/**
    * Sets the protocol. If missing <code>http:</code> is used as default.
    * @param {string} protocol
    * @chainable
    */
			value: function setProtocol(protocol) {
				this.url.protocol = protocol;
				if (this.url.protocol[this.url.protocol.length - 1] !== ':') {
					this.url.protocol += ':';
				}
				return this;
			}

			/**
    * @return {string} The string form of the url.
    * @override
    */

		}, {
			key: 'toString',
			value: function toString() {
				var href = '';
				var host = this.getHost();
				if (host) {
					href += this.getProtocol() + '//';
				}
				href += host + this.getPathname() + this.getSearch() + this.getHash();
				return href;
			}

			/**
    * Joins the given paths.
    * @param {string} basePath
    * @param {...string} ...paths Any number of paths to be joined with the base url.
    * @static
    */

		}], [{
			key: 'getParseFn',
			value: function getParseFn() {
				return parseFn_;
			}
		}, {
			key: 'normalizeObject',
			value: function normalizeObject(parsed) {
				var length = parsed.pathname ? parsed.pathname.length : 0;
				if (length > 1 && parsed.pathname[length - 1] === '/') {
					parsed.pathname = parsed.pathname.substr(0, length - 1);
				}
				return parsed;
			}

			/**
    * Parses the given uri string into an object.
    * @param {*=} opt_uri Optional string URI to parse
    */

		}, {
			key: 'parse',
			value: function parse(opt_uri) {
				return Uri.normalizeObject(parseFn_(opt_uri));
			}
		}, {
			key: 'setParseFn',
			value: function setParseFn(parseFn) {
				parseFn_ = parseFn;
			}
		}, {
			key: 'joinPaths',
			value: function joinPaths(basePath) {
				for (var _len = arguments.length, paths = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					paths[_key - 1] = arguments[_key];
				}

				if (basePath.charAt(basePath.length - 1) === '/') {
					basePath = basePath.substring(0, basePath.length - 1);
				}
				paths = paths.map(function (path) {
					return path.charAt(0) === '/' ? path.substring(1) : path;
				});
				return [basePath].concat(paths).join('/').replace(/\/$/, '');
			}

			/**
    * URL-decodes the string. We need to specially handle '+'s because
    * the javascript library doesn't convert them to spaces.
    * @param {string} str The string to url decode.
    * @return {string} The decoded {@code str}.
    */

		}, {
			key: 'urlDecode',
			value: function urlDecode(str) {
				return decodeURIComponent(str.replace(/\+/g, ' '));
			}
		}]);
		return Uri;
	}();

	/**
  * Default protocol value.
  * @type {string}
  * @default http:
  * @static
  */


	Uri.DEFAULT_PROTOCOL = 'http:';

	/**
  * Hostname placeholder. Relevant to internal usage only.
  * @type {string}
  * @static
  */
	Uri.HOSTNAME_PLACEHOLDER = 'hostname' + Date.now();

	/**
  * Name used by the param generated by `makeUnique`.
  * @type {string}
  * @static
  */
	Uri.RANDOM_PARAM = 'zx';

	this['senna']['Uri'] = Uri;
}).call(this);
'use strict';

(function () {
	var globals = this['senna']['globals'];
	var Uri = this['senna']['Uri'];

	/**
  * A collection of static utility functions.
  * @const
  */

	var utils = function () {
		function utils() {
			babelHelpers.classCallCheck(this, utils);
		}

		babelHelpers.createClass(utils, null, [{
			key: 'copyNodeAttributes',


			/**
    * Copies attributes form source node to target node.
    * @return {void}
    * @static
    */
			value: function copyNodeAttributes(source, target) {
				Array.prototype.slice.call(source.attributes).forEach(function (attribute) {
					return target.setAttribute(attribute.name, attribute.value);
				});
			}

			/**
    * Gets the current browser path including hashbang.
    * @return {!string}
    * @static
    */

		}, {
			key: 'getCurrentBrowserPath',
			value: function getCurrentBrowserPath() {
				return this.getCurrentBrowserPathWithoutHash() + globals.window.location.hash;
			}

			/**
    * Gets the current browser path excluding hashbang.
    * @return {!string}
    * @static
    */

		}, {
			key: 'getCurrentBrowserPathWithoutHash',
			value: function getCurrentBrowserPathWithoutHash() {
				return globals.window.location.pathname + globals.window.location.search;
			}

			/**
    * Extracts the path part of an url.
    * @return {!string}
    * @static
    */

		}, {
			key: 'getUrlPath',
			value: function getUrlPath(url) {
				var uri = new Uri(url);
				return uri.getPathname() + uri.getSearch() + uri.getHash();
			}

			/**
    * Extracts the path part of an url without hashbang.
    * @return {!string}
    * @static
    */

		}, {
			key: 'getUrlPathWithoutHash',
			value: function getUrlPathWithoutHash(url) {
				var uri = new Uri(url);
				return uri.getPathname() + uri.getSearch();
			}

			/**
    * Extracts the path part of an url without hashbang and query search.
    * @return {!string}
    * @static
    */

		}, {
			key: 'getUrlPathWithoutHashAndSearch',
			value: function getUrlPathWithoutHashAndSearch(url) {
				var uri = new Uri(url);
				return uri.getPathname();
			}

			/**
    * Checks if url is in the same browser current url excluding the hashbang.
    * @param  {!string} url
    * @return {boolean}
    * @static
    */

		}, {
			key: 'isCurrentBrowserPath',
			value: function isCurrentBrowserPath(url) {
				if (url) {
					var currentBrowserPath = this.getCurrentBrowserPathWithoutHash();
					// the getUrlPath will create a Uri and will normalize the path and
					// remove the trailling '/' for properly comparing paths.
					return utils.getUrlPathWithoutHash(url) === this.getUrlPath(currentBrowserPath);
				}
				return false;
			}

			/**
    * Returns true if HTML5 History api is supported.
    * @return {boolean}
    * @static
    */

		}, {
			key: 'isHtml5HistorySupported',
			value: function isHtml5HistorySupported() {
				return !!(globals.window.history && globals.window.history.pushState);
			}

			/**
    * Removes all attributes form node.
    * @return {void}
    * @static
    */

		}, {
			key: 'clearNodeAttributes',
			value: function clearNodeAttributes(node) {
				Array.prototype.slice.call(node.attributes).forEach(function (attribute) {
					return node.removeAttribute(attribute.name);
				});
			}
		}]);
		return utils;
	}();

	this['senna']['utils'] = utils;
}).call(this);
'use strict';

/**
  * Debounces function execution.
  * @param {!function()} fn
  * @param {number} delay
  * @return {!function()}
  */

(function () {
	function debounce(fn, delay) {
		return function debounced() {
			var args = arguments;
			cancelDebounce(debounced);
			debounced.id = setTimeout(function () {
				fn.apply(null, args);
			}, delay);
		};
	}

	/**
  * Cancels the scheduled debounced function.
  */
	function cancelDebounce(debounced) {
		clearTimeout(debounced.id);
	}

	this['senna']['debounce'] = debounce;
	this['sennaNamed']['debounce'] = this['sennaNamed']['debounce'] || {};
	this['sennaNamed']['debounce']['cancelDebounce'] = cancelDebounce;
	this['sennaNamed']['debounce']['debounce'] = debounce;
}).call(this);
'use strict';

(function () {
	var METAL_DATA = '__metal_data__';

	var domData = function () {
		function domData() {
			babelHelpers.classCallCheck(this, domData);
		}

		babelHelpers.createClass(domData, null, [{
			key: 'get',

			/**
    * Gets Metal.js's data for the given element.
    * @param {!Element} element
    * @param {string=} opt_name Optional property from the data to be returned.
    * @param {*} opt_initialVal Optinal value to the set the requested property
    *     to if it doesn't exist yet in the data.
    * @return {!Object}
    */
			value: function get(element, opt_name, opt_initialVal) {
				if (!element[METAL_DATA]) {
					element[METAL_DATA] = {};
				}
				if (!opt_name) {
					return element[METAL_DATA];
				}
				if (!element[METAL_DATA][opt_name] && opt_initialVal) {
					element[METAL_DATA][opt_name] = opt_initialVal;
				}
				return element[METAL_DATA][opt_name];
			}

			/**
    * Checks if the given element has data stored in it.
    * @param {!Element} element
    * @return {boolean}
    */

		}, {
			key: 'has',
			value: function has(element) {
				return !!element[METAL_DATA];
			}
		}]);
		return domData;
	}();

	this['senna']['domData'] = domData;
}).call(this);
'use strict';

(function () {
	var Disposable = this['sennaNamed']['metal']['Disposable'];

	/**
  * EventHandle utility. Holds information about an event subscription, and
  * allows removing them easily.
  * EventHandle is a Disposable, but it's important to note that the
  * EventEmitter that created it is not the one responsible for disposing it.
  * That responsibility is for the code that holds a reference to it.
  * @param {!EventEmitter} emitter Emitter the event was subscribed to.
  * @param {string} event The name of the event that was subscribed to.
  * @param {!Function} listener The listener subscribed to the event.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandle = function (_Disposable) {
		babelHelpers.inherits(EventHandle, _Disposable);

		function EventHandle(emitter, event, listener) {
			babelHelpers.classCallCheck(this, EventHandle);

			/**
    * The EventEmitter instance that the event was subscribed to.
    * @type {EventEmitter}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandle.__proto__ || Object.getPrototypeOf(EventHandle)).call(this));

			_this.emitter_ = emitter;

			/**
    * The name of the event that was subscribed to.
    * @type {string}
    * @protected
    */
			_this.event_ = event;

			/**
    * The listener subscribed to the event.
    * @type {Function}
    * @protected
    */
			_this.listener_ = listener;
			return _this;
		}

		/**
   * Disposes of this instance's object references.
   * @override
   */


		babelHelpers.createClass(EventHandle, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListener();
				this.emitter_ = null;
				this.listener_ = null;
			}

			/**
    * Removes the listener subscription from the emitter.
    */

		}, {
			key: 'removeListener',
			value: function removeListener() {
				if (!this.emitter_.isDisposed()) {
					this.emitter_.removeListener(this.event_, this.listener_);
				}
			}
		}]);
		return EventHandle;
	}(Disposable);

	this['senna']['EventHandle'] = EventHandle;
}).call(this);
'use strict';

(function () {
	var array = this['sennaNamed']['metal']['array'];
	var Disposable = this['sennaNamed']['metal']['Disposable'];
	var isFunction = this['sennaNamed']['metal']['isFunction'];
	var isString = this['sennaNamed']['metal']['isString'];
	var EventHandle = this['senna']['EventHandle'];


	var singleArray_ = [0];

	/**
  * EventEmitter utility.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitter = function (_Disposable) {
		babelHelpers.inherits(EventEmitter, _Disposable);

		function EventEmitter() {
			babelHelpers.classCallCheck(this, EventEmitter);

			/**
    * Holds event listeners scoped by event type.
    * @type {Object<string, !Array<!function()>>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitter.__proto__ || Object.getPrototypeOf(EventEmitter)).call(this));

			_this.events_ = null;

			/**
    * Handlers that are triggered when an event is listened to.
    * @type {Array}
    */
			_this.listenerHandlers_ = null;

			/**
    * Configuration option which determines if an event facade should be sent
    * as a param of listeners when emitting events. If set to true, the facade
    * will be passed as the first argument of the listener.
    * @type {boolean}
    * @protected
    */
			_this.shouldUseFacade_ = false;
			return _this;
		}

		/**
   * Adds a handler to given holder variable. If the holder doesn't have a
   * value yet, it will receive the handler directly. If the holder is an array,
   * the value will just be added to it. Otherwise, the holder will be set to a
   * new array containing its previous value plus the new handler.
   * @param {*} holder
   * @param {!function()|Object} handler
   * @return {*} The holder's new value.
   * @protected
   */


		babelHelpers.createClass(EventEmitter, [{
			key: 'addHandler_',
			value: function addHandler_(holder, handler) {
				if (!holder) {
					holder = handler;
				} else {
					if (!Array.isArray(holder)) {
						holder = [holder];
					}
					holder.push(handler);
				}
				return holder;
			}

			/**
    * Adds a listener to the end of the listeners array for the specified events.
    * @param {!(Array|string)} event
    * @param {!Function} listener
    * @param {boolean} opt_default Flag indicating if this listener is a default
    *   action for this event. Default actions are run last, and only if no previous
    *   listener call `preventDefault()` on the received event facade.
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'addListener',
			value: function addListener(event, listener, opt_default) {
				this.validateListener_(listener);

				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.addSingleListener_(events[i], listener, opt_default);
				}

				return new EventHandle(this, event, listener);
			}

			/**
    * Adds a listener to the end of the listeners array for a single event.
    * @param {string} event
    * @param {!Function} listener
    * @param {boolean} opt_default Flag indicating if this listener is a default
    *   action for this event. Default actions are run last, and only if no previous
    *   listener call `preventDefault()` on the received event facade.
    * @return {!EventHandle} Can be used to remove the listener.
    * @param {Function=} opt_origin The original function that was added as a
    *   listener, if there is any.
    * @protected
    */

		}, {
			key: 'addSingleListener_',
			value: function addSingleListener_(event, listener, opt_default, opt_origin) {
				this.runListenerHandlers_(event);
				if (opt_default || opt_origin) {
					listener = {
						default: opt_default,
						fn: listener,
						origin: opt_origin
					};
				}
				this.events_ = this.events_ || {};
				this.events_[event] = this.addHandler_(this.events_[event], listener);
			}

			/**
    * Builds facade for the given event.
    * @param {string} event
    * @return {Object}
    * @protected
    */

		}, {
			key: 'buildFacade_',
			value: function buildFacade_(event) {
				var _this2 = this;

				if (this.getShouldUseFacade()) {
					var _ret = function () {
						var facade = {
							preventDefault: function preventDefault() {
								facade.preventedDefault = true;
							},
							target: _this2,
							type: event
						};
						return {
							v: facade
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.events_ = null;
			}

			/**
    * Execute each of the listeners in order with the supplied arguments.
    * @param {string} event
    * @param {*} opt_args [arg1], [arg2], [...]
    * @return {boolean} Returns true if event had listeners, false otherwise.
    */

		}, {
			key: 'emit',
			value: function emit(event) {
				var listeners = this.getRawListeners_(event);
				if (listeners.length === 0) {
					return false;
				}

				var args = array.slice(arguments, 1);
				this.runListeners_(listeners, args, this.buildFacade_(event));
				return true;
			}

			/**
    * Gets the listener objects for the given event, if there are any.
    * @param {string} event
    * @return {!Array}
    * @protected
    */

		}, {
			key: 'getRawListeners_',
			value: function getRawListeners_(event) {
				var directListeners = toArray(this.events_ && this.events_[event]);
				return directListeners.concat(toArray(this.events_ && this.events_['*']));
			}

			/**
    * Gets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @return {boolean}
    */

		}, {
			key: 'getShouldUseFacade',
			value: function getShouldUseFacade() {
				return this.shouldUseFacade_;
			}

			/**
    * Returns an array of listeners for the specified event.
    * @param {string} event
    * @return {Array} Array of listeners.
    */

		}, {
			key: 'listeners',
			value: function listeners(event) {
				return this.getRawListeners_(event).map(function (listener) {
					return listener.fn ? listener.fn : listener;
				});
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for the
    * events. After each event is triggered the specified amount of times, the
    * listener is removed for it.
    * @param {!(Array|string)} event
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'many',
			value: function many(event, amount, listener) {
				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.many_(events[i], amount, listener);
				}

				return new EventHandle(this, event, listener);
			}

			/**
    * Adds a listener that will be invoked a fixed number of times for a single
    * event. After the event is triggered the specified amount of times, the
    * listener is removed.
    * @param {string} event
    * @param {number} amount The amount of times this event should be listened
    * to.
    * @param {!Function} listener
    * @protected
    */

		}, {
			key: 'many_',
			value: function many_(event, amount, listener) {
				var self = this;

				if (amount <= 0) {
					return;
				}

				function handlerInternal() {
					if (--amount === 0) {
						self.removeListener(event, handlerInternal);
					}
					listener.apply(self, arguments);
				}

				self.addSingleListener_(event, handlerInternal, false, listener);
			}

			/**
    * Checks if a listener object matches the given listener function. To match,
    * it needs to either point to that listener or have it as its origin.
    * @param {!Object} listenerObj
    * @param {!Function} listener
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'matchesListener_',
			value: function matchesListener_(listenerObj, listener) {
				var fn = listenerObj.fn || listenerObj;
				return fn === listener || listenerObj.origin && listenerObj.origin === listener;
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'off',
			value: function off(event, listener) {
				this.validateListener_(listener);
				if (!this.events_) {
					return this;
				}

				var events = this.toEventsArray_(event);
				for (var i = 0; i < events.length; i++) {
					this.events_[events[i]] = this.removeMatchingListenerObjs_(toArray(this.events_[events[i]]), listener);
				}

				return this;
			}

			/**
    * Adds a listener to the end of the listeners array for the specified events.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'on',
			value: function on() {
				return this.addListener.apply(this, arguments);
			}

			/**
    * Adds handler that gets triggered when an event is listened to on this
    * instance.
    * @param {!function()}
    */

		}, {
			key: 'onListener',
			value: function onListener(handler) {
				this.listenerHandlers_ = this.addHandler_(this.listenerHandlers_, handler);
			}

			/**
    * Adds a one time listener for the events. This listener is invoked only the
    * next time each event is fired, after which it is removed.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!EventHandle} Can be used to remove the listener.
    */

		}, {
			key: 'once',
			value: function once(events, listener) {
				return this.many(events, 1, listener);
			}

			/**
    * Removes all listeners, or those of the specified events. It's not a good
    * idea to remove listeners that were added elsewhere in the code,
    * especially when it's on an emitter that you didn't create.
    * @param {(Array|string)=} opt_events
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners(opt_events) {
				if (this.events_) {
					if (opt_events) {
						var events = this.toEventsArray_(opt_events);
						for (var i = 0; i < events.length; i++) {
							this.events_[events[i]] = null;
						}
					} else {
						this.events_ = null;
					}
				}
				return this;
			}

			/**
    * Removes all listener objects from the given array that match the given
    * listener function.
    * @param {Array.<Object>} listenerObjs
    * @param {!Function} listener
    * @return {Array.<Object>|Object} The new listeners array for this event.
    * @protected
    */

		}, {
			key: 'removeMatchingListenerObjs_',
			value: function removeMatchingListenerObjs_(listenerObjs, listener) {
				var finalListeners = [];
				for (var i = 0; i < listenerObjs.length; i++) {
					if (!this.matchesListener_(listenerObjs[i], listener)) {
						finalListeners.push(listenerObjs[i]);
					}
				}
				return finalListeners.length > 0 ? finalListeners : null;
			}

			/**
    * Removes a listener for the specified events.
    * Caution: changes array indices in the listener array behind the listener.
    * @param {!(Array|string)} events
    * @param {!Function} listener
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'removeListener',
			value: function removeListener() {
				return this.off.apply(this, arguments);
			}

			/**
    * Runs the handlers when an event is listened to.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'runListenerHandlers_',
			value: function runListenerHandlers_(event) {
				var handlers = this.listenerHandlers_;
				if (handlers) {
					handlers = toArray(handlers);
					for (var i = 0; i < handlers.length; i++) {
						handlers[i](event);
					}
				}
			}

			/**
    * Runs the given listeners.
    * @param {!Array} listeners
    * @param {!Array} args
    * @param (Object) facade
    * @protected
    */

		}, {
			key: 'runListeners_',
			value: function runListeners_(listeners, args, facade) {
				if (facade) {
					args.push(facade);
				}

				var defaultListeners = [];
				for (var i = 0; i < listeners.length; i++) {
					var listener = listeners[i].fn || listeners[i];
					if (listeners[i].default) {
						defaultListeners.push(listener);
					} else {
						listener.apply(this, args);
					}
				}
				if (!facade || !facade.preventedDefault) {
					for (var j = 0; j < defaultListeners.length; j++) {
						defaultListeners[j].apply(this, args);
					}
				}
			}

			/**
    * Sets the configuration option which determines if an event facade should
    * be sent as a param of listeners when emitting events. If set to true, the
    * facade will be passed as the first argument of the listener.
    * @param {boolean} shouldUseFacade
    * @return {!Object} Returns emitter, so calls can be chained.
    */

		}, {
			key: 'setShouldUseFacade',
			value: function setShouldUseFacade(shouldUseFacade) {
				this.shouldUseFacade_ = shouldUseFacade;
				return this;
			}

			/**
    * Converts the parameter to an array if only one event is given. Reuses the
    * same array each time this conversion is done, to avoid using more memory
    * than necessary.
    * @param  {!(Array|string)} events
    * @return {!Array}
    * @protected
    */

		}, {
			key: 'toEventsArray_',
			value: function toEventsArray_(events) {
				if (isString(events)) {
					singleArray_[0] = events;
					events = singleArray_;
				}
				return events;
			}

			/**
    * Checks if the given listener is valid, throwing an exception when it's not.
    * @param  {*} listener
    * @protected
    */

		}, {
			key: 'validateListener_',
			value: function validateListener_(listener) {
				if (!isFunction(listener)) {
					throw new TypeError('Listener must be a function');
				}
			}
		}]);
		return EventEmitter;
	}(Disposable);

	function toArray(val) {
		val = val || [];
		return Array.isArray(val) ? val : [val];
	}

	this['senna']['EventEmitter'] = EventEmitter;
}).call(this);
'use strict';

(function () {
	var Disposable = this['sennaNamed']['metal']['Disposable'];

	/**
  * EventEmitterProxy utility. It's responsible for linking two EventEmitter
  * instances together, emitting events from the first emitter through the
  * second one. That means that listening to a supported event on the target
  * emitter will mean listening to it on the origin emitter as well.
  * @param {EventEmitter} originEmitter Events originated on this emitter
  *   will be fired for the target emitter's listeners as well.
  * @param {EventEmitter} targetEmitter Event listeners attached to this emitter
  *   will also be triggered when the event is fired by the origin emitter.
  * @param {Object} opt_blacklist Optional blacklist of events that should not be
  *   proxied.
  * @constructor
  * @extends {Disposable}
  */

	var EventEmitterProxy = function (_Disposable) {
		babelHelpers.inherits(EventEmitterProxy, _Disposable);

		function EventEmitterProxy(originEmitter, targetEmitter, opt_blacklist, opt_whitelist) {
			babelHelpers.classCallCheck(this, EventEmitterProxy);

			/**
    * Map of events that should not be proxied.
    * @type {Object}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventEmitterProxy.__proto__ || Object.getPrototypeOf(EventEmitterProxy)).call(this));

			_this.blacklist_ = opt_blacklist;

			/**
    * The origin emitter. This emitter's events will be proxied through the
    * target emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.originEmitter_ = originEmitter;

			/**
    * A list of events that are pending to be listened by an actual origin
    * emitter. Events are stored here when the origin doesn't exist, so they
    * can be set on a new origin when one is set.
    * @type {Array}
    * @protected
    */
			_this.pendingEvents_ = null;

			/**
    * Holds a map of events from the origin emitter that are already being proxied.
    * @type {Object<string, !EventHandle>}
    * @protected
    */
			_this.proxiedEvents_ = null;

			/**
    * The target emitter. This emitter will emit all events that come from
    * the origin emitter.
    * @type {EventEmitter}
    * @protected
    */
			_this.targetEmitter_ = targetEmitter;

			/**
    * Map of events that should be proxied. If whitelist is set blacklist is ignored.
    * @type {Object}
    * @protected
    */
			_this.whitelist_ = opt_whitelist;

			_this.startProxy_();
			return _this;
		}

		/**
   * Adds the given listener for the given event.
   * @param {string} event
   * @param {!function()} listener
   * @return {!EventHandle} The listened event's handle.
   * @protected
   */


		babelHelpers.createClass(EventEmitterProxy, [{
			key: 'addListener_',
			value: function addListener_(event, listener) {
				return this.originEmitter_.on(event, listener);
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.removeListeners_();
				this.proxiedEvents_ = null;
				this.originEmitter_ = null;
				this.targetEmitter_ = null;
			}

			/**
    * Emits the specified event type on the target emitter.
    * @protected
    */

		}, {
			key: 'emitOnTarget_',
			value: function emitOnTarget_() {
				this.targetEmitter_.emit.apply(this.targetEmitter_, arguments);
			}

			/**
    * Proxies the given event from the origin to the target emitter.
    * @param {string} event
    */

		}, {
			key: 'proxyEvent',
			value: function proxyEvent(event) {
				if (this.shouldProxyEvent_(event)) {
					this.tryToAddListener_(event);
				}
			}

			/**
    * Removes the proxy listener for all events.
    * @protected
    */

		}, {
			key: 'removeListeners_',
			value: function removeListeners_() {
				if (this.proxiedEvents_) {
					var events = Object.keys(this.proxiedEvents_);
					for (var i = 0; i < events.length; i++) {
						this.proxiedEvents_[events[i]].removeListener();
					}
					this.proxiedEvents_ = null;
				}
				this.pendingEvents_ = null;
			}

			/**
    * Changes the origin emitter. This automatically detaches any events that
    * were already being proxied from the previous emitter, and starts proxying
    * them on the new emitter instead.
    * @param {!EventEmitter} originEmitter
    */

		}, {
			key: 'setOriginEmitter',
			value: function setOriginEmitter(originEmitter) {
				var _this2 = this;

				var events = this.originEmitter_ && this.proxiedEvents_ ? Object.keys(this.proxiedEvents_) : this.pendingEvents_;
				this.originEmitter_ = originEmitter;
				if (events) {
					this.removeListeners_();
					events.forEach(function (event) {
						return _this2.proxyEvent(event);
					});
				}
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				if (this.whitelist_ && !this.whitelist_[event]) {
					return false;
				}
				if (this.blacklist_ && this.blacklist_[event]) {
					return false;
				}
				return !this.proxiedEvents_ || !this.proxiedEvents_[event];
			}

			/**
    * Starts proxying all events from the origin to the target emitter.
    * @protected
    */

		}, {
			key: 'startProxy_',
			value: function startProxy_() {
				this.targetEmitter_.onListener(this.proxyEvent.bind(this));
			}

			/**
    * Adds a listener to the origin emitter, if it exists. Otherwise, stores
    * the pending listener so it can be used on a future origin emitter.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'tryToAddListener_',
			value: function tryToAddListener_(event) {
				if (this.originEmitter_) {
					this.proxiedEvents_ = this.proxiedEvents_ || {};
					this.proxiedEvents_[event] = this.addListener_(event, this.emitOnTarget_.bind(this, event));
				} else {
					this.pendingEvents_ = this.pendingEvents_ || [];
					this.pendingEvents_.push(event);
				}
			}
		}]);
		return EventEmitterProxy;
	}(Disposable);

	this['senna']['EventEmitterProxy'] = EventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var Disposable = this['sennaNamed']['metal']['Disposable'];

	/**
  * EventHandler utility. It's useful for easily removing a group of
  * listeners from different EventEmitter instances.
  * @constructor
  * @extends {Disposable}
  */

	var EventHandler = function (_Disposable) {
		babelHelpers.inherits(EventHandler, _Disposable);

		function EventHandler() {
			babelHelpers.classCallCheck(this, EventHandler);

			/**
    * An array that holds the added event handles, so the listeners can be
    * removed later.
    * @type {Array.<EventHandle>}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (EventHandler.__proto__ || Object.getPrototypeOf(EventHandler)).call(this));

			_this.eventHandles_ = [];
			return _this;
		}

		/**
   * Adds event handles to be removed later through the `removeAllListeners`
   * method.
   * @param {...(!EventHandle)} var_args
   */


		babelHelpers.createClass(EventHandler, [{
			key: 'add',
			value: function add() {
				for (var i = 0; i < arguments.length; i++) {
					this.eventHandles_.push(arguments[i]);
				}
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.eventHandles_ = null;
			}

			/**
    * Removes all listeners that have been added through the `add` method.
    */

		}, {
			key: 'removeAllListeners',
			value: function removeAllListeners() {
				for (var i = 0; i < this.eventHandles_.length; i++) {
					this.eventHandles_[i].removeListener();
				}

				this.eventHandles_ = [];
			}
		}]);
		return EventHandler;
	}(Disposable);

	this['senna']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
  var EventEmitter = this['senna']['EventEmitter'];
  var EventEmitterProxy = this['senna']['EventEmitterProxy'];
  var EventHandle = this['senna']['EventHandle'];
  var EventHandler = this['senna']['EventHandler'];
  this['senna']['events'] = EventEmitter;
  this['sennaNamed']['events'] = this['sennaNamed']['events'] || {};
  this['sennaNamed']['events']['EventEmitter'] = EventEmitter;
  this['sennaNamed']['events']['EventEmitterProxy'] = EventEmitterProxy;
  this['sennaNamed']['events']['EventHandle'] = EventHandle;
  this['sennaNamed']['events']['EventHandler'] = EventHandler;
}).call(this);
'use strict';

(function () {
	var array = this['sennaNamed']['metal']['array'];
	var isString = this['sennaNamed']['metal']['isString'];
	var domData = this['senna']['domData'];
	var EventHandle = this['sennaNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom delegated events
  * (only the ones that receive a target element, not a selector string).
  * @extends {EventHandle}
  */

	var DomDelegatedEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomDelegatedEventHandle, _EventHandle);

		/**
   * The constructor for `DomDelegatedEventHandle`.
   * @param {!Event} emitter Element the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {string=} opt_selector An optional selector used when delegating
   *     the event.
   * @constructor
   */
		function DomDelegatedEventHandle(emitter, event, listener, opt_selector) {
			babelHelpers.classCallCheck(this, DomDelegatedEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomDelegatedEventHandle.__proto__ || Object.getPrototypeOf(DomDelegatedEventHandle)).call(this, emitter, event, listener));

			_this.selector_ = opt_selector;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomDelegatedEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				var delegating = domData.get(this.emitter_, 'delegating', {});
				var listeners = domData.get(this.emitter_, 'listeners', {});
				var selector = this.selector_;
				var arr = isString(selector) ? delegating[this.event_].selectors : listeners;
				var key = isString(selector) ? selector : this.event_;

				array.remove(arr[key] || [], this.listener_);
				if (arr[key] && arr[key].length === 0) {
					delete arr[key];
				}
			}
		}]);
		return DomDelegatedEventHandle;
	}(EventHandle);

	this['senna']['DomDelegatedEventHandle'] = DomDelegatedEventHandle;
}).call(this);
'use strict';

(function () {
	var EventHandle = this['sennaNamed']['events']['EventHandle'];

	/**
  * This is a special EventHandle, that is responsible for dom events, instead
  * of EventEmitter events.
  * @extends {EventHandle}
  */

	var DomEventHandle = function (_EventHandle) {
		babelHelpers.inherits(DomEventHandle, _EventHandle);

		/**
   * The constructor for `DomEventHandle`.
   * @param {!EventEmitter} emitter Emitter the event was subscribed to.
   * @param {string} event The name of the event that was subscribed to.
   * @param {!Function} listener The listener subscribed to the event.
   * @param {boolean} opt_capture Flag indicating if listener should be triggered
   *   during capture phase, instead of during the bubbling phase. Defaults to false.
   * @constructor
   */
		function DomEventHandle(emitter, event, listener, opt_capture) {
			babelHelpers.classCallCheck(this, DomEventHandle);

			var _this = babelHelpers.possibleConstructorReturn(this, (DomEventHandle.__proto__ || Object.getPrototypeOf(DomEventHandle)).call(this, emitter, event, listener));

			_this.capture_ = opt_capture;
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(DomEventHandle, [{
			key: 'removeListener',
			value: function removeListener() {
				this.emitter_.removeEventListener(this.event_, this.listener_, this.capture_);
			}
		}]);
		return DomEventHandle;
	}(EventHandle);

	this['senna']['DomEventHandle'] = DomEventHandle;
}).call(this);
'use strict';

(function () {
	var isDef = this['sennaNamed']['metal']['isDef'];
	var isDocument = this['sennaNamed']['metal']['isDocument'];
	var isDocumentFragment = this['sennaNamed']['metal']['isDocumentFragment'];
	var isElement = this['sennaNamed']['metal']['isElement'];
	var isObject = this['sennaNamed']['metal']['isObject'];
	var isString = this['sennaNamed']['metal']['isString'];
	var object = this['sennaNamed']['metal']['object'];
	var domData = this['senna']['domData'];
	var DomDelegatedEventHandle = this['senna']['DomDelegatedEventHandle'];
	var DomEventHandle = this['senna']['DomEventHandle'];


	var elementsByTag_ = {};
	var supportCache_ = {};
	var customEvents = {};

	this['sennaNamed']['domNamed'] = this['sennaNamed']['domNamed'] || {};
	this['sennaNamed']['domNamed']['customEvents'] = customEvents;
	var LAST_CONTAINER = '__metal_last_container__';
	var USE_CAPTURE = {
		blur: true,
		error: true,
		focus: true,
		invalid: true,
		load: true,
		scroll: true
	};

	/**
  * Adds the requested CSS classes to an element.
  * @param {!Element|!Nodelist} elements The element or elements to add CSS classes to.
  * @param {string} classes CSS classes to add.
  */
	function addClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				addClassesWithNative_(elements[i], classes);
			} else {
				addClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['sennaNamed']['domNamed']['addClasses'] = addClasses; /**
                                                             * Adds the requested CSS classes to an element using classList.
                                                             * @param {!Element} element The element to add CSS classes to.
                                                             * @param {string} classes CSS classes to add.
                                                             * @private
                                                             */

	function addClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.add(className);
			}
		});
	}

	/**
  * Adds the requested CSS classes to an element without using classList.
  * @param {!Element} element The element to add CSS classes to.
  * @param {string} classes CSS classes to add.
  * @private
  */
	function addClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';
		var classesToAppend = '';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			var className = classes[i];

			if (elementClassName.indexOf(' ' + className + ' ') === -1) {
				classesToAppend += ' ' + className;
			}
		}

		if (classesToAppend) {
			element.className = element.className + classesToAppend;
		}
	}

	/**
  * Adds an event listener to the given element, to be triggered via delegate.
  * @param {!Element} element
  * @param {string} eventName
  * @param {!function()} listener
  * @private
  */
	function addElementListener_(element, eventName, listener) {
		addToArr_(domData.get(element, 'listeners', {}), eventName, listener);
	}

	/**
  * Adds an event listener to the given element, to be triggered via delegate
  * selectors.
  * @param {!Element} element
  * @param {string} eventName
  * @param {string} selector
  * @param {!function()} listener
  * @private
  */
	function addSelectorListener_(element, eventName, selector, listener) {
		var delegatingData = domData.get(element, 'delegating', {});
		addToArr_(delegatingData[eventName].selectors, selector, listener);
	}

	/**
  * Adds a value to an array inside an object, creating it first if it doesn't
  * yet exist.
  * @param {!Array} arr
  * @param {string} key
  * @param {*} value
  * @private
  */
	function addToArr_(arr, key, value) {
		if (!arr[key]) {
			arr[key] = [];
		}
		arr[key].push(value);
	}

	/**
  * Attaches a delegate listener, unless there's already one attached.
  * @param {!Element} element
  * @param {string} eventName
  * @private
  */
	function attachDelegateEvent_(element, eventName) {
		var delegatingData = domData.get(element, 'delegating', {});
		if (!delegatingData[eventName]) {
			delegatingData[eventName] = {
				handle: on(element, eventName, handleDelegateEvent_, !!USE_CAPTURE[eventName]),
				selectors: {}
			};
		}
	}

	/**
  * Gets the closest element up the tree from the given element (including
  * itself) that matches the specified selector, or null if none match.
  * @param {Element} element
  * @param {string} selector
  * @return {Element}
  */
	function closest(element, selector) {
		while (element && !match(element, selector)) {
			element = element.parentNode;
		}
		return element;
	}

	this['sennaNamed']['domNamed']['closest'] = closest; /**
                                                       * Appends a child node with text or other nodes to a parent node. If
                                                       * child is a HTML string it will be automatically converted to a document
                                                       * fragment before appending it to the parent.
                                                       * @param {!Element} parent The node to append nodes to.
                                                       * @param {!(Element|NodeList|string)} child The thing to append to the parent.
                                                       * @return {!Element} The appended child.
                                                       */

	function append(parent, child) {
		if (isString(child)) {
			child = buildFragment(child);
		}
		if (child instanceof NodeList) {
			var childArr = Array.prototype.slice.call(child);
			for (var i = 0; i < childArr.length; i++) {
				parent.appendChild(childArr[i]);
			}
		} else {
			parent.appendChild(child);
		}
		return child;
	}

	this['sennaNamed']['domNamed']['append'] = append; /**
                                                     * Helper for converting a HTML string into a document fragment.
                                                     * @param {string} htmlString The HTML string to convert.
                                                     * @return {!Element} The resulting document fragment.
                                                     */

	function buildFragment(htmlString) {
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = '<br>' + htmlString;
		tempDiv.removeChild(tempDiv.firstChild);

		var fragment = document.createDocumentFragment();
		while (tempDiv.firstChild) {
			fragment.appendChild(tempDiv.firstChild);
		}
		return fragment;
	}

	this['sennaNamed']['domNamed']['buildFragment'] = buildFragment; /**
                                                                   * Checks if the first element contains the second one.
                                                                   * @param {!Element} element1
                                                                   * @param {!Element} element2
                                                                   * @return {boolean}
                                                                   */

	function contains(element1, element2) {
		if (isDocument(element1)) {
			// document.contains is not defined on IE9, so call it on documentElement instead.
			return element1.documentElement.contains(element2);
		} else {
			return element1.contains(element2);
		}
	}

	this['sennaNamed']['domNamed']['contains'] = contains; /**
                                                         * Listens to the specified event on the given DOM element, but only calls the
                                                         * given callback listener when it's triggered by elements that match the
                                                         * given selector or target element.
                                                         * @param {!Element} element The DOM element the event should be listened on.
                                                         * @param {string} eventName The name of the event to listen to.
                                                         * @param {!Element|string} selectorOrTarget Either an element or css selector
                                                         *     that should match the event for the listener to be triggered.
                                                         * @param {!function(!Object)} callback Function to be called when the event
                                                         *     is triggered. It will receive the normalized event object.
                                                         * @param {boolean=} opt_default Optional flag indicating if this is a default
                                                         *     listener. That means that it would only be executed after all non
                                                         *     default listeners, and only if the event isn't prevented via
                                                         *     `preventDefault`.
                                                         * @return {!EventHandle} Can be used to remove the listener.
                                                         */

	function delegate(element, eventName, selectorOrTarget, callback, opt_default) {
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.delegate) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}

		if (opt_default) {
			// Wrap callback so we don't set property directly on it.
			callback = callback.bind();
			callback.defaultListener_ = true;
		}

		attachDelegateEvent_(element, eventName);
		if (isString(selectorOrTarget)) {
			addSelectorListener_(element, eventName, selectorOrTarget, callback);
		} else {
			addElementListener_(selectorOrTarget, eventName, callback);
		}

		return new DomDelegatedEventHandle(isString(selectorOrTarget) ? element : selectorOrTarget, eventName, callback, isString(selectorOrTarget) ? selectorOrTarget : null);
	}

	this['sennaNamed']['domNamed']['delegate'] = delegate; /**
                                                         * Verifies if the element is able to trigger the Click event,
                                                         * simulating browsers behaviour, avoiding event listeners to be called by triggerEvent method.
                                                         * @param {Element} node Element to be checked.
                                                         * @param {string} eventName The event name.
                                                         * @private
                                                         */

	function isAbleToInteractWith_(node, eventName, opt_eventObj) {
		if (opt_eventObj && eventName === 'click' && opt_eventObj.button === 2) {
			// Firefox triggers "click" events on the document for right clicks. This
			// causes our delegate logic to trigger it for regular elements too, which
			// shouldn't happen. Ignoring them here.
			return false;
		}

		var matchesSelector = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'FIELDSET'];
		if (eventName === 'click' && matchesSelector.indexOf(node.tagName) > -1) {
			return !(node.disabled || parent(node, 'fieldset[disabled]'));
		}
		return true;
	}

	/**
  * Inserts node in document as last element.
  * @param {Element} node Element to remove children from.
  */
	function enterDocument(node) {
		node && append(document.body, node);
	}

	this['sennaNamed']['domNamed']['enterDocument'] = enterDocument; /**
                                                                   * Removes node from document.
                                                                   * @param {Element} node Element to remove children from.
                                                                   */

	function exitDocument(node) {
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	this['sennaNamed']['domNamed']['exitDocument'] = exitDocument; /**
                                                                 * This is called when an event is triggered by a delegate listener. All
                                                                 * matching listeners of this event type from `target` to `currentTarget` will
                                                                 * be triggered.
                                                                 * @param {!Event} event The event payload.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function handleDelegateEvent_(event) {
		normalizeDelegateEvent_(event);
		var ret = true;
		var container = event.currentTarget;
		var defFns = [];

		ret &= triggerDelegatedListeners_(container, event, defFns);
		ret &= triggerDefaultDelegatedListeners_(defFns, event);

		event.delegateTarget = null;
		event[LAST_CONTAINER] = container;
		return ret;
	}

	/**
  * Checks if the given element has the requested css class.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  */
	function hasClass(element, className) {
		if ('classList' in element) {
			return hasClassWithNative_(element, className);
		} else {
			return hasClassWithoutNative_(element, className);
		}
	}

	this['sennaNamed']['domNamed']['hasClass'] = hasClass; /**
                                                         * Checks if the given element has the requested css class using classList.
                                                         * @param {!Element} element
                                                         * @param {string} className
                                                         * @return {boolean}
                                                         * @private
                                                         */

	function hasClassWithNative_(element, className) {
		return element.classList.contains(className);
	}

	/**
  * Checks if the given element has the requested css class without using classList.
  * @param {!Element} element
  * @param {string} className
  * @return {boolean}
  * @private
  */
	function hasClassWithoutNative_(element, className) {
		return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
	}

	/**
  * Checks if the given element is empty or not.
  * @param {!Element} element
  * @return {boolean}
  */
	function isEmpty(element) {
		return element.childNodes.length === 0;
	}

	this['sennaNamed']['domNamed']['isEmpty'] = isEmpty; /**
                                                       * Check if an element matches a given selector.
                                                       * @param {Element} element
                                                       * @param {string} selector
                                                       * @return {boolean}
                                                       */

	function match(element, selector) {
		if (!element || element.nodeType !== 1) {
			return false;
		}

		var p = Element.prototype;
		var m = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector;
		if (m) {
			return m.call(element, selector);
		}

		return matchFallback_(element, selector);
	}

	this['sennaNamed']['domNamed']['match'] = match; /**
                                                   * Check if an element matches a given selector, using an internal implementation
                                                   * instead of calling existing javascript functions.
                                                   * @param {Element} element
                                                   * @param {string} selector
                                                   * @return {boolean}
                                                   * @private
                                                   */

	function matchFallback_(element, selector) {
		var nodes = document.querySelectorAll(selector, element.parentNode);
		for (var i = 0; i < nodes.length; ++i) {
			if (nodes[i] === element) {
				return true;
			}
		}
		return false;
	}

	/**
  * Returns the next sibling of the given element that matches the specified
  * selector, or null if there is none.
  * @param {!Element} element
  * @param {?string} selector
  */
	function next(element, selector) {
		do {
			element = element.nextSibling;
			if (element && match(element, selector)) {
				return element;
			}
		} while (element);
		return null;
	}

	this['sennaNamed']['domNamed']['next'] = next; /**
                                                 * Normalizes the event payload for delegate listeners.
                                                 * @param {!Event} event
                                                 * @private
                                                 */

	function normalizeDelegateEvent_(event) {
		event.stopPropagation = stopPropagation_;
		event.stopImmediatePropagation = stopImmediatePropagation_;
	}

	/**
  * Listens to the specified event on the given DOM element. This function normalizes
  * DOM event payloads and functions so they'll work the same way on all supported
  * browsers.
  * @param {!Element|string} element The DOM element to listen to the event on, or
  *   a selector that should be delegated on the entire document.
  * @param {string} eventName The name of the event to listen to.
  * @param {!function(!Object)} callback Function to be called when the event is
  *   triggered. It will receive the normalized event object.
  * @param {boolean} opt_capture Flag indicating if listener should be triggered
  *   during capture phase, instead of during the bubbling phase. Defaults to false.
  * @return {!DomEventHandle} Can be used to remove the listener.
  */
	function on(element, eventName, callback, opt_capture) {
		if (isString(element)) {
			return delegate(document, eventName, element, callback);
		}
		var customConfig = customEvents[eventName];
		if (customConfig && customConfig.event) {
			eventName = customConfig.originalEvent;
			callback = customConfig.handler.bind(customConfig, callback);
		}
		element.addEventListener(eventName, callback, opt_capture);
		return new DomEventHandle(element, eventName, callback, opt_capture);
	}

	this['sennaNamed']['domNamed']['on'] = on; /**
                                             * Listens to the specified event on the given DOM element once. This
                                             * function normalizes DOM event payloads and functions so they'll work the
                                             * same way on all supported browsers.
                                             * @param {!Element} element The DOM element to listen to the event on.
                                             * @param {string} eventName The name of the event to listen to.
                                             * @param {!function(!Object)} callback Function to be called when the event
                                             *   is triggered. It will receive the normalized event object.
                                             * @return {!DomEventHandle} Can be used to remove the listener.
                                             */

	function once(element, eventName, callback) {
		var domEventHandle = on(element, eventName, function () {
			domEventHandle.removeListener();
			return callback.apply(this, arguments);
		});
		return domEventHandle;
	}

	this['sennaNamed']['domNamed']['once'] = once; /**
                                                 * Gets the first parent from the given element that matches the specified
                                                 * selector, or null if none match.
                                                 * @param {!Element} element
                                                 * @param {string} selector
                                                 * @return {Element}
                                                 */

	function parent(element, selector) {
		return closest(element.parentNode, selector);
	}

	this['sennaNamed']['domNamed']['parent'] = parent; /**
                                                     * Registers a custom event.
                                                     * @param {string} eventName The name of the custom event.
                                                     * @param {!Object} customConfig An object with information about how the event
                                                     *   should be handled.
                                                     */

	function registerCustomEvent(eventName, customConfig) {
		customEvents[eventName] = customConfig;
	}

	this['sennaNamed']['domNamed']['registerCustomEvent'] = registerCustomEvent; /**
                                                                               * Removes all the child nodes on a DOM node.
                                                                               * @param {Element} node Element to remove children from.
                                                                               */

	function removeChildren(node) {
		var child = void 0;
		while (child = node.firstChild) {
			node.removeChild(child);
		}
	}

	this['sennaNamed']['domNamed']['removeChildren'] = removeChildren; /**
                                                                     * Removes the requested CSS classes from an element.
                                                                     * @param {!Element|!NodeList} elements The element or elements to remove CSS classes from.
                                                                     * @param {string} classes CSS classes to remove.
                                                                     */

	function removeClasses(elements, classes) {
		if (!isObject(elements) || !isString(classes)) {
			return;
		}

		if (!elements.length) {
			elements = [elements];
		}

		for (var i = 0; i < elements.length; i++) {
			if ('classList' in elements[i]) {
				removeClassesWithNative_(elements[i], classes);
			} else {
				removeClassesWithoutNative_(elements[i], classes);
			}
		}
	}

	this['sennaNamed']['domNamed']['removeClasses'] = removeClasses; /**
                                                                   * Removes the requested CSS classes from an element using classList.
                                                                   * @param {!Element} element The element to remove CSS classes from.
                                                                   * @param {string} classes CSS classes to remove.
                                                                   * @private
                                                                   */

	function removeClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			if (className) {
				element.classList.remove(className);
			}
		});
	}

	/**
  * Removes the requested CSS classes from an element without using classList.
  * @param {!Element} element The element to remove CSS classes from.
  * @param {string} classes CSS classes to remove.
  * @private
  */
	function removeClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			elementClassName = elementClassName.replace(' ' + classes[i] + ' ', ' ');
		}

		element.className = elementClassName.trim();
	}

	/**
  * Replaces the first element with the second.
  * @param {Element} element1
  * @param {Element} element2
  */
	function replace(element1, element2) {
		if (element1 && element2 && element1 !== element2 && element1.parentNode) {
			element1.parentNode.insertBefore(element2, element1);
			element1.parentNode.removeChild(element1);
		}
	}

	this['sennaNamed']['domNamed']['replace'] = replace; /**
                                                       * The function that replaces `stopImmediatePropagation_` for events.
                                                       * @private
                                                       */

	function stopImmediatePropagation_() {
		var event = this; // eslint-disable-line
		event.stopped = true;
		event.stoppedImmediate = true;
		Event.prototype.stopImmediatePropagation.call(event);
	}

	/**
  * The function that replaces `stopPropagation` for events.
  * @private
  */
	function stopPropagation_() {
		var event = this; // eslint-disable-line
		event.stopped = true;
		Event.prototype.stopPropagation.call(event);
	}

	/**
  * Checks if the given element supports the given event type.
  * @param {!Element|string} element The DOM element or element tag name to check.
  * @param {string} eventName The name of the event to check.
  * @return {boolean}
  */
	function supportsEvent(element, eventName) {
		if (customEvents[eventName]) {
			return true;
		}

		if (isString(element)) {
			if (!elementsByTag_[element]) {
				elementsByTag_[element] = document.createElement(element);
			}
			element = elementsByTag_[element];
		}

		var tag = element.tagName;
		if (!supportCache_[tag] || !supportCache_[tag].hasOwnProperty(eventName)) {
			supportCache_[tag] = supportCache_[tag] || {};
			supportCache_[tag][eventName] = 'on' + eventName in element;
		}
		return supportCache_[tag][eventName];
	}

	this['sennaNamed']['domNamed']['supportsEvent'] = supportsEvent; /**
                                                                   * This triggers all default matched delegated listeners of a given event type.
                                                                   * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                   * @param {!Event} event
                                                                   * @return {boolean} False if at least one of the triggered callbacks returns
                                                                   *     false, or true otherwise.
                                                                   * @private
                                                                   */

	function triggerDefaultDelegatedListeners_(defFns, event) {
		var ret = true;

		for (var i = 0; i < defFns.length && !event.defaultPrevented; i++) {
			event.delegateTarget = defFns[i].element;
			ret &= defFns[i].fn(event);
		}

		return ret;
	}

	/**
  * This triggers all matched delegated listeners of a given event type when its
  * delegated target is able to interact.
  * @param {!Element} container
  * @param {!Event} event
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerDelegatedListeners_(container, event, defaultFns) {
		var ret = true;
		var currElement = event.target;
		var limit = container.parentNode;

		while (currElement && currElement !== limit && !event.stopped) {
			if (isAbleToInteractWith_(currElement, event.type, event)) {
				event.delegateTarget = currElement;
				ret &= triggerElementListeners_(currElement, event, defaultFns);
				ret &= triggerSelectorListeners_(container, currElement, event, defaultFns);
			}
			currElement = currElement.parentNode;
		}

		return ret;
	}

	/**
  * Converts the given argument to a DOM element. Strings are assumed to
  * be selectors, and so a matched element will be returned. If the arg
  * is already a DOM element it will be the return value.
  * @param {string|Element|Document} selectorOrElement
  * @return {Element} The converted element, or null if none was found.
  */
	function toElement(selectorOrElement) {
		if (isElement(selectorOrElement) || isDocument(selectorOrElement) || isDocumentFragment(selectorOrElement)) {
			return selectorOrElement;
		} else if (isString(selectorOrElement)) {
			if (selectorOrElement[0] === '#' && selectorOrElement.indexOf(' ') === -1) {
				return document.getElementById(selectorOrElement.substr(1));
			} else {
				return document.querySelector(selectorOrElement);
			}
		} else {
			return null;
		}
	}

	this['sennaNamed']['domNamed']['toElement'] = toElement; /**
                                                           * Adds or removes one or more classes from an element. If any of the classes
                                                           * is present, it will be removed from the element, or added otherwise.
                                                           * @param {!Element} element The element which classes will be toggled.
                                                           * @param {string} classes The classes which have to added or removed from the element.
                                                           */

	function toggleClasses(element, classes) {
		if (!isObject(element) || !isString(classes)) {
			return;
		}

		if ('classList' in element) {
			toggleClassesWithNative_(element, classes);
		} else {
			toggleClassesWithoutNative_(element, classes);
		}
	}

	this['sennaNamed']['domNamed']['toggleClasses'] = toggleClasses; /**
                                                                   * Adds or removes one or more classes from an element using classList.
                                                                   * If any of the classes is present, it will be removed from the element,
                                                                   * or added otherwise.
                                                                   * @param {!Element} element The element which classes will be toggled.
                                                                   * @param {string} classes The classes which have to added or removed from the element.
                                                                   * @private
                                                                   */

	function toggleClassesWithNative_(element, classes) {
		classes.split(' ').forEach(function (className) {
			element.classList.toggle(className);
		});
	}

	/**
  * Adds or removes one or more classes from an element without using classList.
  * If any of the classes is present, it will be removed from the element,
  * or added otherwise.
  * @param {!Element} element The element which classes will be toggled.
  * @param {string} classes The classes which have to added or removed from the element.
  * @private
  */
	function toggleClassesWithoutNative_(element, classes) {
		var elementClassName = ' ' + element.className + ' ';

		classes = classes.split(' ');

		for (var i = 0; i < classes.length; i++) {
			var className = ' ' + classes[i] + ' ';
			var classIndex = elementClassName.indexOf(className);

			if (classIndex === -1) {
				elementClassName = '' + elementClassName + classes[i] + ' ';
			} else {
				var before = elementClassName.substring(0, classIndex);
				var after = elementClassName.substring(classIndex + className.length);
				elementClassName = before + ' ' + after;
			}
		}

		element.className = elementClassName.trim();
	}

	/**
  * Triggers all listeners for the given event type that are stored in the
  * specified element.
  * @param {!Element} element
  * @param {!Event} event
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerElementListeners_(element, event, defaultFns) {
		var lastContainer = event[LAST_CONTAINER];
		if (!isDef(lastContainer) || !contains(lastContainer, element)) {
			var listeners = domData.get(element, 'listeners', {})[event.type];
			return triggerListeners_(listeners, event, element, defaultFns);
		}
		return true;
	}

	/**
  * Triggers the specified event on the given element.
  * NOTE: This should mostly be used for testing, not on real code.
  * @param {!Element} element The node that should trigger the event.
  * @param {string} eventName The name of the event to be triggred.
  * @param {Object=} opt_eventObj An object with data that should be on the
  *   triggered event's payload.
  */
	function triggerEvent(element, eventName, opt_eventObj) {
		if (isAbleToInteractWith_(element, eventName, opt_eventObj)) {
			var eventObj = document.createEvent('HTMLEvents');
			eventObj.initEvent(eventName, true, true);
			object.mixin(eventObj, opt_eventObj);
			element.dispatchEvent(eventObj);
		}
	}

	this['sennaNamed']['domNamed']['triggerEvent'] = triggerEvent; /**
                                                                 * Triggers the given listeners array.
                                                                 * @param {Array<!function()>} listeners
                                                                 * @param {!Event} event
                                                                 * @param {!Element} element
                                                                 * @param {!Array} defaultFns Array to collect default listeners in, instead
                                                                 *     of running them.
                                                                 * @return {boolean} False if at least one of the triggered callbacks returns
                                                                 *     false, or true otherwise.
                                                                 * @private
                                                                 */

	function triggerListeners_(listeners, event, element, defaultFns) {
		var ret = true;
		listeners = listeners || [];
		for (var i = 0; i < listeners.length && !event.stoppedImmediate; i++) {
			if (listeners[i].defaultListener_) {
				defaultFns.push({
					element: element,
					fn: listeners[i]
				});
			} else {
				ret &= listeners[i](event);
			}
		}
		return ret;
	}

	/**
  * Triggers all selector listeners for the given event.
  * @param {!Element} container
  * @param {!Element} element
  * @param {!Event} event
  * @param {!Array} defaultFns Array to collect default listeners in, instead
  *     of running them.
  * @return {boolean} False if at least one of the triggered callbacks returns
  *     false, or true otherwise.
  * @private
  */
	function triggerSelectorListeners_(container, element, event, defaultFns) {
		var ret = true;
		var data = domData.get(container, 'delegating', {});
		var map = data[event.type].selectors;
		var selectors = Object.keys(map);
		for (var i = 0; i < selectors.length && !event.stoppedImmediate; i++) {
			if (match(element, selectors[i])) {
				var listeners = map[selectors[i]];
				ret &= triggerListeners_(listeners, event, element, defaultFns);
			}
		}
		return ret;
	}
}).call(this);
'use strict';

// This file exists just for backwards compatibility, making sure that old
// default imports for this file still work. It's best to use the named exports
// for each function instead though, since that allows bundlers like Rollup to
// reduce the bundle size by removing unused code.

(function () {
  var dom = this['sennaNamed']['domNamed'];
  this['senna']['dom'] = dom;
  this['sennaNamed']['dom'] = this['sennaNamed']['dom'] || {};
  this['sennaNamed']['dom']['dom'] = dom;
  Object.keys(this['sennaNamed']['domNamed']).forEach(function (key) {
    this['sennaNamed']['dom'][key] = this['sennaNamed']['domNamed'][key];
  });
}).call(this);
'use strict';

(function () {
	var delegate = this['sennaNamed']['dom']['delegate'];
	var on = this['sennaNamed']['dom']['on'];
	var supportsEvent = this['sennaNamed']['dom']['supportsEvent'];
	var EventEmitterProxy = this['sennaNamed']['events']['EventEmitterProxy'];

	/**
  * DomEventEmitterProxy utility. It extends `EventEmitterProxy` to also accept
  * dom elements as origin emitters.
  * @extends {EventEmitterProxy}
  */

	var DomEventEmitterProxy = function (_EventEmitterProxy) {
		babelHelpers.inherits(DomEventEmitterProxy, _EventEmitterProxy);

		function DomEventEmitterProxy() {
			babelHelpers.classCallCheck(this, DomEventEmitterProxy);
			return babelHelpers.possibleConstructorReturn(this, (DomEventEmitterProxy.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy)).apply(this, arguments));
		}

		babelHelpers.createClass(DomEventEmitterProxy, [{
			key: 'addListener_',

			/**
    * Adds the given listener for the given event.
    * @param {string} event
    * @param {!function()} listener
    * @return {!EventHandle} The listened event's handle.
    * @protected
    * @override
    */
			value: function addListener_(event, listener) {
				if (this.originEmitter_.addEventListener) {
					if (this.isDelegateEvent_(event)) {
						var index = event.indexOf(':', 9);
						var eventName = event.substring(9, index);
						var selector = event.substring(index + 1);
						return delegate(this.originEmitter_, eventName, selector, listener);
					} else {
						return on(this.originEmitter_, event, listener);
					}
				} else {
					return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'addListener_', this).call(this, event, listener);
				}
			}

			/**
    * Checks if the given event is of the delegate type.
    * @param {string} event
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isDelegateEvent_',
			value: function isDelegateEvent_(event) {
				return event.substr(0, 9) === 'delegate:';
			}

			/**
    * Checks if the given event is supported by the origin element.
    * @param {string} event
    * @protected
    */

		}, {
			key: 'isSupportedDomEvent_',
			value: function isSupportedDomEvent_(event) {
				if (!this.originEmitter_ || !this.originEmitter_.addEventListener) {
					return true;
				}
				return this.isDelegateEvent_(event) && event.indexOf(':', 9) !== -1 || supportsEvent(this.originEmitter_, event);
			}

			/**
    * Checks if the given event should be proxied.
    * @param {string} event
    * @return {boolean}
    * @protected
    * @override
    */

		}, {
			key: 'shouldProxyEvent_',
			value: function shouldProxyEvent_(event) {
				return babelHelpers.get(DomEventEmitterProxy.prototype.__proto__ || Object.getPrototypeOf(DomEventEmitterProxy.prototype), 'shouldProxyEvent_', this).call(this, event) && this.isSupportedDomEvent_(event);
			}
		}]);
		return DomEventEmitterProxy;
	}(EventEmitterProxy);

	this['senna']['DomEventEmitterProxy'] = DomEventEmitterProxy;
}).call(this);
'use strict';

(function () {
	var append = this['sennaNamed']['dom']['append'];
	var string = this['sennaNamed']['metal']['string'];

	/**
  * Class with static methods responsible for doing browser feature checks.
  */

	var features = function () {
		function features() {
			babelHelpers.classCallCheck(this, features);
		}

		babelHelpers.createClass(features, null, [{
			key: 'checkAnimationEventName',

			/**
    * Some browsers still supports prefixed animation events. This method can
    * be used to retrieve the current browser event name for both, animation
    * and transition.
    * @return {object}
    */
			value: function checkAnimationEventName() {
				if (features.animationEventName_ === undefined) {
					features.animationEventName_ = {
						animation: features.checkAnimationEventName_('animation'),
						transition: features.checkAnimationEventName_('transition')
					};
				}
				return features.animationEventName_;
			}

			/**
    * @protected
    * @param {string} type Type to test: animation, transition.
    * @return {string} Browser event name.
    */

		}, {
			key: 'checkAnimationEventName_',
			value: function checkAnimationEventName_(type) {
				var prefixes = ['Webkit', 'MS', 'O', ''];
				var typeTitleCase = string.replaceInterval(type, 0, 1, type.substring(0, 1).toUpperCase());
				var suffixes = [typeTitleCase + 'End', typeTitleCase + 'End', typeTitleCase + 'End', type + 'end'];
				for (var i = 0; i < prefixes.length; i++) {
					if (features.animationElement_.style[prefixes[i] + typeTitleCase] !== undefined) {
						return prefixes[i].toLowerCase() + suffixes[i];
					}
				}
				return type + 'end';
			}

			/**
    * Some browsers (like IE9) change the order of element attributes, when html
    * is rendered. This method can be used to check if this behavior happens on
    * the current browser.
    * @return {boolean}
    */

		}, {
			key: 'checkAttrOrderChange',
			value: function checkAttrOrderChange() {
				if (features.attrOrderChange_ === undefined) {
					var originalContent = '<div data-component="" data-ref=""></div>';
					var element = document.createElement('div');
					append(element, originalContent);
					features.attrOrderChange_ = originalContent !== element.innerHTML;
				}
				return features.attrOrderChange_;
			}
		}]);
		return features;
	}();

	features.animationElement_ = document.createElement('div');
	features.animationEventName_ = undefined;
	features.attrOrderChange_ = undefined;

	this['senna']['features'] = features;
}).call(this);
'use strict';

(function () {
	var async = this['sennaNamed']['metal']['async'];
	var exitDocument = this['sennaNamed']['dom']['exitDocument'];
	var once = this['sennaNamed']['dom']['once'];

	/**
  * Utility functions for running javascript code in the global scope.
  */

	var globalEval = function () {
		function globalEval() {
			babelHelpers.classCallCheck(this, globalEval);
		}

		babelHelpers.createClass(globalEval, null, [{
			key: 'run',

			/**
    * Evaluates the given string in the global scope.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */
			value: function run(text, opt_appendFn) {
				var script = document.createElement('script');
				script.text = text;
				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}
				exitDocument(script);
				return script;
			}

			/**
    * Evaluates the given javascript file in the global scope.
    * @param {string} src The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runFile',
			value: function runFile(src, opt_callback, opt_appendFn) {
				var script = document.createElement('script');
				script.src = src;

				var callback = function callback() {
					exitDocument(script);
					opt_callback && opt_callback();
				};
				once(script, 'load', callback);
				once(script, 'error', callback);

				if (opt_appendFn) {
					opt_appendFn(script);
				} else {
					document.head.appendChild(script);
				}

				return script;
			}

			/**
    * Evaluates the code referenced by the given script element.
    * @param {!Element} script
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} script
    */

		}, {
			key: 'runScript',
			value: function runScript(script, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (script.type && script.type !== 'text/javascript') {
					async.nextTick(callback);
					return;
				}
				exitDocument(script);
				if (script.src) {
					return globalEval.runFile(script.src, opt_callback, opt_appendFn);
				} else {
					async.nextTick(callback);
					return globalEval.run(script.text, opt_appendFn);
				}
			}

			/**
    * Evaluates any script tags present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInElement',
			value: function runScriptsInElement(element, opt_callback, opt_appendFn) {
				var scripts = element.querySelectorAll('script');
				if (scripts.length) {
					globalEval.runScriptsInOrder(scripts, 0, opt_callback, opt_appendFn);
				} else if (opt_callback) {
					async.nextTick(opt_callback);
				}
			}

			/**
    * Runs the given scripts elements in the order that they appear.
    * @param {!NodeList} scripts
    * @param {number} index
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runScriptsInOrder',
			value: function runScriptsInOrder(scripts, index, opt_callback, opt_appendFn) {
				globalEval.runScript(scripts.item(index), function () {
					if (index < scripts.length - 1) {
						globalEval.runScriptsInOrder(scripts, index + 1, opt_callback, opt_appendFn);
					} else if (opt_callback) {
						async.nextTick(opt_callback);
					}
				}, opt_appendFn);
			}
		}]);
		return globalEval;
	}();

	this['senna']['globalEval'] = globalEval;
}).call(this);
'use strict';

(function () {
	var async = this['sennaNamed']['metal']['async'];
	var once = this['sennaNamed']['dom']['once'];

	/**
  * Utility functions for running styles.
  */

	var globalEvalStyles = function () {
		function globalEvalStyles() {
			babelHelpers.classCallCheck(this, globalEvalStyles);
		}

		babelHelpers.createClass(globalEvalStyles, null, [{
			key: 'run',

			/**
    * Evaluates the given style.
    * @param {string} text
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */
			value: function run(text, opt_appendFn) {
				var style = document.createElement('style');
				style.innerHTML = text;
				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}
				return style;
			}

			/**
    * Evaluates the given style file.
    * @param {string} href The file's path.
    * @param {function()=} opt_callback Optional function to be called
    *   when the styles has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    * @return {Element} style
    */

		}, {
			key: 'runFile',
			value: function runFile(href, opt_callback, opt_appendFn) {
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = href;
				globalEvalStyles.runStyle(link, opt_callback, opt_appendFn);
				return link;
			}

			/**
    * Evaluates the code referenced by the given style/link element.
    * @param {!Element} style
    * @param {function()=} opt_callback Optional function to be called
    *   when the script has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    *  @return {Element} style
    */

		}, {
			key: 'runStyle',
			value: function runStyle(style, opt_callback, opt_appendFn) {
				var callback = function callback() {
					opt_callback && opt_callback();
				};
				if (style.rel && style.rel !== 'stylesheet') {
					async.nextTick(callback);
					return;
				}

				if (style.tagName === 'STYLE') {
					async.nextTick(callback);
				} else {
					once(style, 'load', callback);
					once(style, 'error', callback);
				}

				if (opt_appendFn) {
					opt_appendFn(style);
				} else {
					document.head.appendChild(style);
				}

				return style;
			}

			/**
    * Evaluates any style present in the given element.
    * @param {!Element} element
    * @param {function()=} opt_callback Optional function to be called when the
    *   style has been run.
    * @param {function()=} opt_appendFn Optional function to append the node
    *   into document.
    */

		}, {
			key: 'runStylesInElement',
			value: function runStylesInElement(element, opt_callback, opt_appendFn) {
				var styles = element.querySelectorAll('style,link');
				if (styles.length === 0 && opt_callback) {
					async.nextTick(opt_callback);
					return;
				}

				var loadCount = 0;
				var callback = function callback() {
					if (opt_callback && ++loadCount === styles.length) {
						async.nextTick(opt_callback);
					}
				};
				for (var i = 0; i < styles.length; i++) {
					globalEvalStyles.runStyle(styles[i], callback, opt_appendFn);
				}
			}
		}]);
		return globalEvalStyles;
	}();

	this['senna']['globalEvalStyles'] = globalEvalStyles;
}).call(this);
'use strict';

(function () {
	var registerCustomEvent = this['sennaNamed']['dom']['registerCustomEvent'];
	var features = this['senna']['features'];


	var mouseEventMap = {
		mouseenter: 'mouseover',
		mouseleave: 'mouseout',
		pointerenter: 'pointerover',
		pointerleave: 'pointerout'
	};
	Object.keys(mouseEventMap).forEach(function (eventName) {
		registerCustomEvent(eventName, {
			delegate: true,
			handler: function handler(callback, event) {
				var related = event.relatedTarget;
				var target = event.delegateTarget;
				if (!related || related !== target && !target.contains(related)) {
					event.customType = eventName;
					return callback(event);
				}
			},
			originalEvent: mouseEventMap[eventName]
		});
	});

	var animationEventMap = {
		animation: 'animationend',
		transition: 'transitionend'
	};
	Object.keys(animationEventMap).forEach(function (eventType) {
		var eventName = animationEventMap[eventType];
		registerCustomEvent(eventName, {
			event: true,
			delegate: true,
			handler: function handler(callback, event) {
				event.customType = eventName;
				return callback(event);
			},
			originalEvent: features.checkAnimationEventName()[eventType]
		});
	});
}).call(this);
'use strict';

(function () {
  var dom = this['senna']['dom'];
  var domData = this['senna']['domData'];
  var DomEventEmitterProxy = this['senna']['DomEventEmitterProxy'];
  var DomEventHandle = this['senna']['DomEventHandle'];
  var features = this['senna']['features'];
  var globalEval = this['senna']['globalEval'];
  var globalEvalStyles = this['senna']['globalEvalStyles'];
  this['sennaNamed']['dom'] = this['sennaNamed']['dom'] || {};
  Object.keys(this['sennaNamed']['dom']).forEach(function (key) {
    this['sennaNamed']['dom'][key] = this['sennaNamed']['dom'][key];
  });
  this['sennaNamed']['dom']['domData'] = domData;
  this['sennaNamed']['dom']['DomEventEmitterProxy'] = DomEventEmitterProxy;
  this['sennaNamed']['dom']['DomEventHandle'] = DomEventHandle;
  this['sennaNamed']['dom']['features'] = features;
  this['sennaNamed']['dom']['globalEval'] = globalEval;
  this['sennaNamed']['dom']['globalEvalStyles'] = globalEvalStyles;
  this['senna']['dom'] = dom;
}).call(this);
/*!
 * Promises polyfill from Google's Closure Library.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore metal-promise is temporarily using Google's promises as polyfill.
 * It supports cancellable promises and has clean and fast implementation.
 */

'use strict';

(function () {
  var isDef = this['sennaNamed']['metal']['isDef'];
  var isFunction = this['sennaNamed']['metal']['isFunction'];
  var isObject = this['sennaNamed']['metal']['isObject'];
  var async = this['sennaNamed']['metal']['async'];

  /**
   * Provides a more strict interface for Thenables in terms of
   * http://promisesaplus.com for interop with {@see CancellablePromise}.
   *
   * @interface
   * @extends {IThenable.<TYPE>}
   * @template TYPE
   */

  var Thenable = function Thenable() {};

  /**
   * Adds callbacks that will operate on the result of the Thenable, returning a
   * new child Promise.
   *
   * If the Thenable is fulfilled, the {@code onFulfilled} callback will be
   * invoked with the fulfillment value as argument, and the child Promise will
   * be fulfilled with the return value of the callback. If the callback throws
   * an exception, the child Promise will be rejected with the thrown value
   * instead.
   *
   * If the Thenable is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value of the callback or thrown value.
   *
   * @param {?(function(this:THIS, TYPE):
   *             (RESULT|IThenable.<RESULT>|Thenable))=} opt_onFulfilled A
   *     function that will be invoked with the fulfillment value if the Promise
   *     is fullfilled.
   * @param {?(function(*): *)=} opt_onRejected A function that will be invoked
   *     with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     with the default this.
   * @return {!CancellablePromise.<RESULT>} A new Promise that will receive the
   *     result of the fulfillment or rejection callback.
   * @template RESULT,THIS
   */
  Thenable.prototype.then = function () {};

  /**
   * An expando property to indicate that an object implements
   * {@code Thenable}.
   *
   * {@see addImplementation}.
   *
   * @const
   */
  Thenable.IMPLEMENTED_BY_PROP = '$goog_Thenable';

  /**
   * Marks a given class (constructor) as an implementation of Thenable, so
   * that we can query that fact at runtime. The class must have already
   * implemented the interface.
   * Exports a 'then' method on the constructor prototype, so that the objects
   * also implement the extern {@see Thenable} interface for interop with
   * other Promise implementations.
   * @param {function(new:Thenable,...[?])} ctor The class constructor. The
   *     corresponding class must have already implemented the interface.
   */
  Thenable.addImplementation = function (ctor) {
    ctor.prototype.then = ctor.prototype.then;
    ctor.prototype.$goog_Thenable = true;
  };

  /**
   * @param {*} object
   * @return {boolean} Whether a given instance implements {@code Thenable}.
   *     The class/superclass of the instance must call {@code addImplementation}.
   */
  Thenable.isImplementedBy = function (object) {
    if (!object) {
      return false;
    }
    try {
      return !!object.$goog_Thenable;
    } catch (e) {
      // Property access seems to be forbidden.
      return false;
    }
  };

  /**
   * Like bind(), except that a 'this object' is not required. Useful when the
   * target function is already bound.
   *
   * Usage:
   * var g = partial(f, arg1, arg2);
   * g(arg3, arg4);
   *
   * @param {Function} fn A function to partially apply.
   * @param {...*} var_args Additional arguments that are partially applied to fn.
   * @return {!Function} A partially-applied form of the function bind() was
   *     invoked as a method of.
   */
  var partial = function partial(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      // Clone the array (with slice()) and append additional arguments
      // to the existing arguments.
      var newArgs = args.slice();
      newArgs.push.apply(newArgs, arguments);
      return fn.apply(this, newArgs);
    };
  };

  /**
   * Promises provide a result that may be resolved asynchronously. A Promise may
   * be resolved by being fulfilled or rejected with a value, which will be known
   * as the fulfillment value or the rejection reason. Whether fulfilled or
   * rejected, the Promise result is immutable once it is set.
   *
   * Promises may represent results of any type, including undefined. Rejection
   * reasons are typically Errors, but may also be of any type. Closure Promises
   * allow for optional type annotations that enforce that fulfillment values are
   * of the appropriate types at compile time.
   *
   * The result of a Promise is accessible by calling {@code then} and registering
   * {@code onFulfilled} and {@code onRejected} callbacks. Once the Promise
   * resolves, the relevant callbacks are invoked with the fulfillment value or
   * rejection reason as argument. Callbacks are always invoked in the order they
   * were registered, even when additional {@code then} calls are made from inside
   * another callback. A callback is always run asynchronously sometime after the
   * scope containing the registering {@code then} invocation has returned.
   *
   * If a Promise is resolved with another Promise, the first Promise will block
   * until the second is resolved, and then assumes the same result as the second
   * Promise. This allows Promises to depend on the results of other Promises,
   * linking together multiple asynchronous operations.
   *
   * This implementation is compatible with the Promises/A+ specification and
   * passes that specification's conformance test suite. A Closure Promise may be
   * resolved with a Promise instance (or sufficiently compatible Promise-like
   * object) created by other Promise implementations. From the specification,
   * Promise-like objects are known as "Thenables".
   *
   * @see http://promisesaplus.com/
   *
   * @param {function(
   *             this:RESOLVER_CONTEXT,
   *             function((TYPE|IThenable.<TYPE>|Thenable)),
   *             function(*)): void} resolver
   *     Initialization function that is invoked immediately with {@code resolve}
   *     and {@code reject} functions as arguments. The Promise is resolved or
   *     rejected with the first argument passed to either function.
   * @param {RESOLVER_CONTEXT=} opt_context An optional context for executing the
   *     resolver function. If unspecified, the resolver function will be executed
   *     in the default scope.
   * @constructor
   * @struct
   * @final
   * @implements {Thenable.<TYPE>}
   * @template TYPE,RESOLVER_CONTEXT
   */
  var CancellablePromise = function CancellablePromise(resolver, opt_context) {
    /**
     * The internal state of this Promise. Either PENDING, FULFILLED, REJECTED, or
     * BLOCKED.
     * @private {CancellablePromise.State_}
     */
    this.state_ = CancellablePromise.State_.PENDING;

    /**
     * The resolved result of the Promise. Immutable once set with either a
     * fulfillment value or rejection reason.
     * @private {*}
     */
    this.result_ = undefined;

    /**
     * For Promises created by calling {@code then()}, the originating parent.
     * @private {CancellablePromise}
     */
    this.parent_ = null;

    /**
     * The list of {@code onFulfilled} and {@code onRejected} callbacks added to
     * this Promise by calls to {@code then()}.
     * @private {Array.<CancellablePromise.CallbackEntry_>}
     */
    this.callbackEntries_ = null;

    /**
     * Whether the Promise is in the queue of Promises to execute.
     * @private {boolean}
     */
    this.executing_ = false;

    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      /**
       * A timeout ID used when the {@code UNHANDLED_REJECTION_DELAY} is greater
       * than 0 milliseconds. The ID is set when the Promise is rejected, and
       * cleared only if an {@code onRejected} callback is invoked for the
       * Promise (or one of its descendants) before the delay is exceeded.
       *
       * If the rejection is not handled before the timeout completes, the
       * rejection reason is passed to the unhandled rejection handler.
       * @private {number}
       */
      this.unhandledRejectionId_ = 0;
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      /**
       * When the {@code UNHANDLED_REJECTION_DELAY} is set to 0 milliseconds, a
       * boolean that is set if the Promise is rejected, and reset to false if an
       * {@code onRejected} callback is invoked for the Promise (or one of its
       * descendants). If the rejection is not handled before the next timestep,
       * the rejection reason is passed to the unhandled rejection handler.
       * @private {boolean}
       */
      this.hadUnhandledRejection_ = false;
    }

    try {
      var self = this;
      resolver.call(opt_context, function (value) {
        self.resolve_(CancellablePromise.State_.FULFILLED, value);
      }, function (reason) {
        self.resolve_(CancellablePromise.State_.REJECTED, reason);
      });
    } catch (e) {
      this.resolve_(CancellablePromise.State_.REJECTED, e);
    }
  };

  /**
   * The delay in milliseconds before a rejected Promise's reason is passed to
   * the rejection handler. By default, the rejection handler rethrows the
   * rejection reason so that it appears in the developer console or
   * {@code window.onerror} handler.
   * Rejections are rethrown as quickly as possible by default. A negative value
   * disables rejection handling entirely.
   * @type {number}
   */
  CancellablePromise.UNHANDLED_REJECTION_DELAY = 0;

  /**
   * The possible internal states for a Promise. These states are not directly
   * observable to external callers.
   * @enum {number}
   * @private
   */
  CancellablePromise.State_ = {
    /** The Promise is waiting for resolution. */
    PENDING: 0,

    /** The Promise is blocked waiting for the result of another Thenable. */
    BLOCKED: 1,

    /** The Promise has been resolved with a fulfillment value. */
    FULFILLED: 2,

    /** The Promise has been resolved with a rejection reason. */
    REJECTED: 3
  };

  /**
   * Typedef for entries in the callback chain. Each call to {@code then},
   * {@code thenCatch}, or {@code thenAlways} creates an entry containing the
   * functions that may be invoked once the Promise is resolved.
   *
   * @typedef {{
   *   child: CancellablePromise,
   *   onFulfilled: function(*),
   *   onRejected: function(*)
   * }}
   * @private
   */
  CancellablePromise.CallbackEntry_ = null;

  /**
   * @param {(TYPE|Thenable.<TYPE>|Thenable)=} opt_value
   * @return {!CancellablePromise.<TYPE>} A new Promise that is immediately resolved
   *     with the given value.
   * @template TYPE
   */
  CancellablePromise.resolve = function (opt_value) {
    return new CancellablePromise(function (resolve) {
      resolve(opt_value);
    });
  };

  /**
   * @param {*=} opt_reason
   * @return {!CancellablePromise} A new Promise that is immediately rejected with the
   *     given reason.
   */
  CancellablePromise.reject = function (opt_reason) {
    return new CancellablePromise(function (resolve, reject) {
      reject(opt_reason);
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the result of the
   *     first Promise (or Promise-like) input to complete.
   * @template TYPE
   */
  CancellablePromise.race = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      if (!promises.length) {
        resolve(undefined);
      }
      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(resolve, reject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<!Array.<TYPE>>} A Promise that receives a list of
   *     every fulfilled value once every input Promise (or Promise-like) is
   *     successfully fulfilled, or is rejected by the first rejection result.
   * @template TYPE
   */
  CancellablePromise.all = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toFulfill = promises.length;
      var values = [];

      if (!toFulfill) {
        resolve(values);
        return;
      }

      var onFulfill = function onFulfill(index, value) {
        toFulfill--;
        values[index] = value;
        if (toFulfill === 0) {
          resolve(values);
        }
      };

      var onReject = function onReject(reason) {
        reject(reason);
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(partial(onFulfill, i), onReject);
      }
    });
  };

  /**
   * @param {!Array.<!(Thenable.<TYPE>|Thenable)>} promises
   * @return {!CancellablePromise.<TYPE>} A Promise that receives the value of
   *     the first input to be fulfilled, or is rejected with a list of every
   *     rejection reason if all inputs are rejected.
   * @template TYPE
   */
  CancellablePromise.firstFulfilled = function (promises) {
    return new CancellablePromise(function (resolve, reject) {
      var toReject = promises.length;
      var reasons = [];

      if (!toReject) {
        resolve(undefined);
        return;
      }

      var onFulfill = function onFulfill(value) {
        resolve(value);
      };

      var onReject = function onReject(index, reason) {
        toReject--;
        reasons[index] = reason;
        if (toReject === 0) {
          reject(reasons);
        }
      };

      for (var i = 0, promise; promise = promises[i]; i++) {
        promise.then(onFulfill, partial(onReject, i));
      }
    });
  };

  /**
   * Adds callbacks that will operate on the result of the Promise, returning a
   * new child Promise.
   *
   * If the Promise is fulfilled, the {@code onFulfilled} callback will be invoked
   * with the fulfillment value as argument, and the child Promise will be
   * fulfilled with the return value of the callback. If the callback throws an
   * exception, the child Promise will be rejected with the thrown value instead.
   *
   * If the Promise is rejected, the {@code onRejected} callback will be invoked
   * with the rejection reason as argument, and the child Promise will be rejected
   * with the return value (or thrown value) of the callback.
   *
   * @override
   */
  CancellablePromise.prototype.then = function (opt_onFulfilled, opt_onRejected, opt_context) {
    return this.addChildPromise_(isFunction(opt_onFulfilled) ? opt_onFulfilled : null, isFunction(opt_onRejected) ? opt_onRejected : null, opt_context);
  };
  Thenable.addImplementation(CancellablePromise);

  /**
   * Adds a callback that will be invoked whether the Promise is fulfilled or
   * rejected. The callback receives no argument, and no new child Promise is
   * created. This is useful for ensuring that cleanup takes place after certain
   * asynchronous operations. Callbacks added with {@code thenAlways} will be
   * executed in the same order with other calls to {@code then},
   * {@code thenAlways}, or {@code thenCatch}.
   *
   * Since it does not produce a new child Promise, cancellation propagation is
   * not prevented by adding callbacks with {@code thenAlways}. A Promise that has
   * a cleanup handler added with {@code thenAlways} will be canceled if all of
   * its children created by {@code then} (or {@code thenCatch}) are canceled.
   *
   * @param {function(this:THIS): void} onResolved A function that will be invoked
   *     when the Promise is resolved.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise.<TYPE>} This Promise, for chaining additional calls.
   * @template THIS
   */
  CancellablePromise.prototype.thenAlways = function (onResolved, opt_context) {
    var callback = function callback() {
      try {
        // Ensure that no arguments are passed to onResolved.
        onResolved.call(opt_context);
      } catch (err) {
        CancellablePromise.handleRejection_.call(null, err);
      }
    };

    this.addCallbackEntry_({
      child: null,
      onRejected: callback,
      onFulfilled: callback
    });
    return this;
  };

  /**
   * Adds a callback that will be invoked only if the Promise is rejected. This
   * is equivalent to {@code then(null, onRejected)}.
   *
   * @param {!function(this:THIS, *): *} onRejected A function that will be
   *     invoked with the rejection reason if the Promise is rejected.
   * @param {THIS=} opt_context An optional context object that will be the
   *     execution context for the callbacks. By default, functions are executed
   *     in the global scope.
   * @return {!CancellablePromise} A new Promise that will receive the result of the
   *     callback.
   * @template THIS
   */
  CancellablePromise.prototype.thenCatch = function (onRejected, opt_context) {
    return this.addChildPromise_(null, onRejected, opt_context);
  };

  /**
   * Alias of {@link CancellablePromise.prototype.thenCatch}
   */
  CancellablePromise.prototype.catch = CancellablePromise.prototype.thenCatch;

  /**
   * Cancels the Promise if it is still pending by rejecting it with a cancel
   * Error. No action is performed if the Promise is already resolved.
   *
   * All child Promises of the canceled Promise will be rejected with the same
   * cancel error, as with normal Promise rejection. If the Promise to be canceled
   * is the only child of a pending Promise, the parent Promise will also be
   * canceled. Cancellation may propagate upward through multiple generations.
   *
   * @param {string=} opt_message An optional debugging message for describing the
   *     cancellation reason.
   */
  CancellablePromise.prototype.cancel = function (opt_message) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      async.run(function () {
        var err = new CancellablePromise.CancellationError(opt_message);
        err.IS_CANCELLATION_ERROR = true;
        this.cancelInternal_(err);
      }, this);
    }
  };

  /**
   * Cancels this Promise with the given error.
   *
   * @param {!Error} err The cancellation error.
   * @private
   */
  CancellablePromise.prototype.cancelInternal_ = function (err) {
    if (this.state_ === CancellablePromise.State_.PENDING) {
      if (this.parent_) {
        // Cancel the Promise and remove it from the parent's child list.
        this.parent_.cancelChild_(this, err);
      } else {
        this.resolve_(CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Cancels a child Promise from the list of callback entries. If the Promise has
   * not already been resolved, reject it with a cancel error. If there are no
   * other children in the list of callback entries, propagate the cancellation
   * by canceling this Promise as well.
   *
   * @param {!CancellablePromise} childPromise The Promise to cancel.
   * @param {!Error} err The cancel error to use for rejecting the Promise.
   * @private
   */
  CancellablePromise.prototype.cancelChild_ = function (childPromise, err) {
    if (!this.callbackEntries_) {
      return;
    }
    var childCount = 0;
    var childIndex = -1;

    // Find the callback entry for the childPromise, and count whether there are
    // additional child Promises.
    for (var i = 0, entry; entry = this.callbackEntries_[i]; i++) {
      var child = entry.child;
      if (child) {
        childCount++;
        if (child === childPromise) {
          childIndex = i;
        }
        if (childIndex >= 0 && childCount > 1) {
          break;
        }
      }
    }

    // If the child Promise was the only child, cancel this Promise as well.
    // Otherwise, reject only the child Promise with the cancel error.
    if (childIndex >= 0) {
      if (this.state_ === CancellablePromise.State_.PENDING && childCount === 1) {
        this.cancelInternal_(err);
      } else {
        var callbackEntry = this.callbackEntries_.splice(childIndex, 1)[0];
        this.executeCallback_(callbackEntry, CancellablePromise.State_.REJECTED, err);
      }
    }
  };

  /**
   * Adds a callback entry to the current Promise, and schedules callback
   * execution if the Promise has already been resolved.
   *
   * @param {CancellablePromise.CallbackEntry_} callbackEntry Record containing
   *     {@code onFulfilled} and {@code onRejected} callbacks to execute after
   *     the Promise is resolved.
   * @private
   */
  CancellablePromise.prototype.addCallbackEntry_ = function (callbackEntry) {
    if ((!this.callbackEntries_ || !this.callbackEntries_.length) && (this.state_ === CancellablePromise.State_.FULFILLED || this.state_ === CancellablePromise.State_.REJECTED)) {
      this.scheduleCallbacks_();
    }
    if (!this.callbackEntries_) {
      this.callbackEntries_ = [];
    }
    this.callbackEntries_.push(callbackEntry);
  };

  /**
   * Creates a child Promise and adds it to the callback entry list. The result of
   * the child Promise is determined by the state of the parent Promise and the
   * result of the {@code onFulfilled} or {@code onRejected} callbacks as
   * specified in the Promise resolution procedure.
   *
   * @see http://promisesaplus.com/#the__method
   *
   * @param {?function(this:THIS, TYPE):
   *          (RESULT|CancellablePromise.<RESULT>|Thenable)} onFulfilled A callback that
   *     will be invoked if the Promise is fullfilled, or null.
   * @param {?function(this:THIS, *): *} onRejected A callback that will be
   *     invoked if the Promise is rejected, or null.
   * @param {THIS=} opt_context An optional execution context for the callbacks.
   *     in the default calling context.
   * @return {!CancellablePromise} The child Promise.
   * @template RESULT,THIS
   * @private
   */
  CancellablePromise.prototype.addChildPromise_ = function (onFulfilled, onRejected, opt_context) {

    var callbackEntry = {
      child: null,
      onFulfilled: null,
      onRejected: null
    };

    callbackEntry.child = new CancellablePromise(function (resolve, reject) {
      // Invoke onFulfilled, or resolve with the parent's value if absent.
      callbackEntry.onFulfilled = onFulfilled ? function (value) {
        try {
          var result = onFulfilled.call(opt_context, value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } : resolve;

      // Invoke onRejected, or reject with the parent's reason if absent.
      callbackEntry.onRejected = onRejected ? function (reason) {
        try {
          var result = onRejected.call(opt_context, reason);
          if (!isDef(result) && reason.IS_CANCELLATION_ERROR) {
            // Propagate cancellation to children if no other result is returned.
            reject(reason);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      } : reject;
    });

    callbackEntry.child.parent_ = this;
    this.addCallbackEntry_(
    /** @type {CancellablePromise.CallbackEntry_} */callbackEntry);
    return callbackEntry.child;
  };

  /**
   * Unblocks the Promise and fulfills it with the given value.
   *
   * @param {TYPE} value
   * @private
   */
  CancellablePromise.prototype.unblockAndFulfill_ = function (value) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.FULFILLED, value);
  };

  /**
   * Unblocks the Promise and rejects it with the given rejection reason.
   *
   * @param {*} reason
   * @private
   */
  CancellablePromise.prototype.unblockAndReject_ = function (reason) {
    if (this.state_ !== CancellablePromise.State_.BLOCKED) {
      throw new Error('CancellablePromise is not blocked.');
    }
    this.state_ = CancellablePromise.State_.PENDING;
    this.resolve_(CancellablePromise.State_.REJECTED, reason);
  };

  /**
   * Attempts to resolve a Promise with a given resolution state and value. This
   * is a no-op if the given Promise has already been resolved.
   *
   * If the given result is a Thenable (such as another Promise), the Promise will
   * be resolved with the same state and result as the Thenable once it is itself
   * resolved.
   *
   * If the given result is not a Thenable, the Promise will be fulfilled or
   * rejected with that result based on the given state.
   *
   * @see http://promisesaplus.com/#the_promise_resolution_procedure
   *
   * @param {CancellablePromise.State_} state
   * @param {*} x The result to apply to the Promise.
   * @private
   */
  CancellablePromise.prototype.resolve_ = function (state, x) {
    if (this.state_ !== CancellablePromise.State_.PENDING) {
      return;
    }

    if (this === x) {
      state = CancellablePromise.State_.REJECTED;
      x = new TypeError('CancellablePromise cannot resolve to itself');
    } else if (Thenable.isImplementedBy(x)) {
      x = /** @type {!Thenable} */x;
      this.state_ = CancellablePromise.State_.BLOCKED;
      x.then(this.unblockAndFulfill_, this.unblockAndReject_, this);
      return;
    } else if (isObject(x)) {
      try {
        var then = x.then;
        if (isFunction(then)) {
          this.tryThen_(x, then);
          return;
        }
      } catch (e) {
        state = CancellablePromise.State_.REJECTED;
        x = e;
      }
    }

    this.result_ = x;
    this.state_ = state;
    this.scheduleCallbacks_();

    if (state === CancellablePromise.State_.REJECTED && !x.IS_CANCELLATION_ERROR) {
      CancellablePromise.addUnhandledRejection_(this, x);
    }
  };

  /**
   * Attempts to call the {@code then} method on an object in the hopes that it is
   * a Promise-compatible instance. This allows interoperation between different
   * Promise implementations, however a non-compliant object may cause a Promise
   * to hang indefinitely. If the {@code then} method throws an exception, the
   * dependent Promise will be rejected with the thrown value.
   *
   * @see http://promisesaplus.com/#point-70
   *
   * @param {Thenable} thenable An object with a {@code then} method that may be
   *     compatible with the Promise/A+ specification.
   * @param {!Function} then The {@code then} method of the Thenable object.
   * @private
   */
  CancellablePromise.prototype.tryThen_ = function (thenable, then) {
    this.state_ = CancellablePromise.State_.BLOCKED;
    var promise = this;
    var called = false;

    var resolve = function resolve(value) {
      if (!called) {
        called = true;
        promise.unblockAndFulfill_(value);
      }
    };

    var reject = function reject(reason) {
      if (!called) {
        called = true;
        promise.unblockAndReject_(reason);
      }
    };

    try {
      then.call(thenable, resolve, reject);
    } catch (e) {
      reject(e);
    }
  };

  /**
   * Executes the pending callbacks of a resolved Promise after a timeout.
   *
   * Section 2.2.4 of the Promises/A+ specification requires that Promise
   * callbacks must only be invoked from a call stack that only contains Promise
   * implementation code, which we accomplish by invoking callback execution after
   * a timeout. If {@code startExecution_} is called multiple times for the same
   * Promise, the callback chain will be evaluated only once. Additional callbacks
   * may be added during the evaluation phase, and will be executed in the same
   * event loop.
   *
   * All Promises added to the waiting list during the same browser event loop
   * will be executed in one batch to avoid using a separate timeout per Promise.
   *
   * @private
   */
  CancellablePromise.prototype.scheduleCallbacks_ = function () {
    if (!this.executing_) {
      this.executing_ = true;
      async.run(this.executeCallbacks_, this);
    }
  };

  /**
   * Executes all pending callbacks for this Promise.
   *
   * @private
   */
  CancellablePromise.prototype.executeCallbacks_ = function () {
    while (this.callbackEntries_ && this.callbackEntries_.length) {
      var entries = this.callbackEntries_;
      this.callbackEntries_ = [];

      for (var i = 0; i < entries.length; i++) {
        this.executeCallback_(entries[i], this.state_, this.result_);
      }
    }
    this.executing_ = false;
  };

  /**
   * Executes a pending callback for this Promise. Invokes an {@code onFulfilled}
   * or {@code onRejected} callback based on the resolved state of the Promise.
   *
   * @param {!CancellablePromise.CallbackEntry_} callbackEntry An entry containing the
   *     onFulfilled and/or onRejected callbacks for this step.
   * @param {CancellablePromise.State_} state The resolution status of the Promise,
   *     either FULFILLED or REJECTED.
   * @param {*} result The resolved result of the Promise.
   * @private
   */
  CancellablePromise.prototype.executeCallback_ = function (callbackEntry, state, result) {
    if (state === CancellablePromise.State_.FULFILLED) {
      callbackEntry.onFulfilled(result);
    } else {
      this.removeUnhandledRejection_();
      callbackEntry.onRejected(result);
    }
  };

  /**
   * Marks this rejected Promise as having being handled. Also marks any parent
   * Promises in the rejected state as handled. The rejection handler will no
   * longer be invoked for this Promise (if it has not been called already).
   *
   * @private
   */
  CancellablePromise.prototype.removeUnhandledRejection_ = function () {
    var p;
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      for (p = this; p && p.unhandledRejectionId_; p = p.parent_) {
        clearTimeout(p.unhandledRejectionId_);
        p.unhandledRejectionId_ = 0;
      }
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      for (p = this; p && p.hadUnhandledRejection_; p = p.parent_) {
        p.hadUnhandledRejection_ = false;
      }
    }
  };

  /**
   * Marks this rejected Promise as unhandled. If no {@code onRejected} callback
   * is called for this Promise before the {@code UNHANDLED_REJECTION_DELAY}
   * expires, the reason will be passed to the unhandled rejection handler. The
   * handler typically rethrows the rejection reason so that it becomes visible in
   * the developer console.
   *
   * @param {!CancellablePromise} promise The rejected Promise.
   * @param {*} reason The Promise rejection reason.
   * @private
   */
  CancellablePromise.addUnhandledRejection_ = function (promise, reason) {
    if (CancellablePromise.UNHANDLED_REJECTION_DELAY > 0) {
      promise.unhandledRejectionId_ = setTimeout(function () {
        CancellablePromise.handleRejection_.call(null, reason);
      }, CancellablePromise.UNHANDLED_REJECTION_DELAY);
    } else if (CancellablePromise.UNHANDLED_REJECTION_DELAY === 0) {
      promise.hadUnhandledRejection_ = true;
      async.run(function () {
        if (promise.hadUnhandledRejection_) {
          CancellablePromise.handleRejection_.call(null, reason);
        }
      });
    }
  };

  /**
   * A method that is invoked with the rejection reasons for Promises that are
   * rejected but have no {@code onRejected} callbacks registered yet.
   * @type {function(*)}
   * @private
   */
  CancellablePromise.handleRejection_ = async.throwException;

  /**
   * Sets a handler that will be called with reasons from unhandled rejected
   * Promises. If the rejected Promise (or one of its descendants) has an
   * {@code onRejected} callback registered, the rejection will be considered
   * handled, and the rejection handler will not be called.
   *
   * By default, unhandled rejections are rethrown so that the error may be
   * captured by the developer console or a {@code window.onerror} handler.
   *
   * @param {function(*)} handler A function that will be called with reasons from
   *     rejected Promises. Defaults to {@code async.throwException}.
   */
  CancellablePromise.setUnhandledRejectionHandler = function (handler) {
    CancellablePromise.handleRejection_ = handler;
  };

  /**
   * Error used as a rejection reason for canceled Promises.
   *
   * @param {string=} opt_message
   * @constructor
   * @extends {Error}
   * @final
   */
  CancellablePromise.CancellationError = function (_Error) {
    babelHelpers.inherits(_class, _Error);

    function _class(opt_message) {
      babelHelpers.classCallCheck(this, _class);

      var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, opt_message));

      if (opt_message) {
        _this.message = opt_message;
      }
      return _this;
    }

    return _class;
  }(Error);

  /** @override */
  CancellablePromise.CancellationError.prototype.name = 'cancel';

  this['sennaNamed']['Promise'] = this['sennaNamed']['Promise'] || {};
  this['sennaNamed']['Promise']['CancellablePromise'] = CancellablePromise;
  this['senna']['Promise'] = CancellablePromise;
}).call(this);
'use strict';

(function () {
	var core = this['senna']['metal'];


	var REGEX = /([\/])?(?:(?:\:(\w+)(?:\(((?:\\.|[^\\()])*)\))?|\(((?:\\.|[^\\()])+)\))([+*?])?)/g;

	/**
  * Converts the given array of regex matches to a more readable object format.
  * @param {!Array<string>} matches
  * @return {!Object}
  */
	function convertMatchesToObj(matches) {
		return {
			match: matches[0],
			prefix: matches[1],
			name: matches[2],
			paramPattern: matches[3],
			unnamedPattern: matches[4],
			modifier: matches[5]
		};
	}

	/**
  * Converts the given tokens parsed from a route format string to a regex.
  * @param {!Array<string|!Object>} tokens
  * @return {!RegExp}
  */
	function convertTokensToRegex(tokens) {
		var regex = '';
		for (var i = 0; i < tokens.length; i++) {
			if (core.isString(tokens[i])) {
				regex += escape(tokens[i]);
			} else {
				var capture = encloseNonCapturingGroup(tokens[i].pattern);
				if (tokens[i].repeat) {
					capture += encloseNonCapturingGroup('\\/' + capture) + '*';
				}
				capture = escape(tokens[i].prefix) + ('(' + capture + ')');
				if (tokens[i].optional) {
					if (!tokens[i].partial) {
						capture = encloseNonCapturingGroup(capture);
					}
					capture += '?';
				}
				regex += capture;
			}
		}
		return new RegExp('^' + makeTrailingSlashOptional(regex) + '$');
	}

	/**
  * Encloses the given regex pattern into a non capturing group.
  * @param {string} pattern
  * @return {string}
  */
	function encloseNonCapturingGroup(pattern) {
		return '(?:' + pattern + ')';
	}

	/**
  * Escapes the given string to show up in the path regex.
  * @param {string} str
  * @return {string}
  */
	function escape(str) {
		return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
	}

	/**
  * Makes trailing slash optional on paths.
  * @param {string} regex
  * @param {string}
  */
	function makeTrailingSlashOptional(regex) {
		if (/\/$/.test(regex)) {
			regex += '?';
		} else {
			regex += '\\/?';
		}
		return regex;
	}

	/**
  * Parses the given route format string into tokens representing its contents.
  * @param {!Array|string} routeOrTokens Either a route format string or tokens
  *     previously parsed via the `parse` function.
  * @return {!Array<string|!Object>} An array of tokens that can be either plain
  *     strings (part of the route) or objects containing informations on params.
  */
	function parse(routeOrTokens) {
		if (!core.isString(routeOrTokens)) {
			return routeOrTokens;
		}

		var route = routeOrTokens;
		var unnamedCount = 0;
		var tokens = [];
		var currPath = '';
		var index = 0;

		var matches = REGEX.exec(route);
		while (matches) {
			var data = convertMatchesToObj(matches);

			currPath = route.slice(index, matches.index);
			index = matches.index + data.match.length;
			tokens.push(currPath);

			tokens.push({
				name: data.name ? data.name : '' + unnamedCount++,
				partial: route[index] && route[index] !== data.prefix,
				prefix: data.prefix || '',
				pattern: data.paramPattern || data.unnamedPattern || '[^\\/]+',
				repeat: data.modifier === '*' || data.modifier === '+',
				optional: data.modifier === '*' || data.modifier === '?'
			});

			matches = REGEX.exec(route);
		}

		if (index < route.length) {
			tokens.push(route.substr(index));
		}
		return tokens;
	}

	this['sennaNamed']['pathParser'] = this['sennaNamed']['pathParser'] || {};
	this['sennaNamed']['pathParser']['parse'] = parse; /**
                                                     * Converts the given route format string to a regex that can extract param
                                                     * data from paths matching it.
                                                     * @param {!Array|string} routeOrTokens Either a route format string or tokens
                                                     *     previously parsed via the `parse` function.
                                                     * @return {!RegExp}
                                                     */

	function toRegex(routeOrTokens) {
		return convertTokensToRegex(parse(routeOrTokens));
	}

	this['sennaNamed']['pathParser']['toRegex'] = toRegex; /**
                                                         * Extracts data from the given path according to the specified route format.
                                                         * @param {!Array|string} routeOrTokens Either a route format string or tokens
                                                         *     previously parsed via the `parse` function.
                                                         * @param {string} The path to extract param data from.
                                                         * @return {Object<string, string>} The data object, or null if the path doesn't
                                                         *     match the given format.
                                                         */

	function extractData(routeOrTokens, path) {
		var data = {};
		var tokens = parse(routeOrTokens);
		var match = path.match(convertTokensToRegex(tokens));

		if (!match) {
			return null;
		}

		var paramIndex = 1;
		for (var i = 0; i < tokens.length; i++) {
			if (!core.isString(tokens[i])) {
				var value = match[paramIndex++];
				if (core.isDef(value)) {
					if (tokens[i].repeat) {
						value = value.split('/');
					}
					data[tokens[i].name] = value;
				}
			}
		}
		return data;
	}
	this['sennaNamed']['pathParser']['extractData'] = extractData;
}).call(this);
'use strict';

(function () {
	var core = this['sennaNamed']['metal']['core'];
	var extractData = this['sennaNamed']['pathParser']['extractData'];
	var parse = this['sennaNamed']['pathParser']['parse'];
	var toRegex = this['sennaNamed']['pathParser']['toRegex'];

	var Route = function () {

		/**
   * Route class.
   * @param {!string|RegExp|Function} path
   * @param {!Function} handler
   * @constructor
   */
		function Route(path, handler) {
			babelHelpers.classCallCheck(this, Route);

			if (!core.isDefAndNotNull(path)) {
				throw new Error('Route path not specified.');
			}
			if (!core.isFunction(handler)) {
				throw new Error('Route handler is not a function.');
			}

			/**
    * Defines the handler which will execute once a URL in the application
    * matches the path.
    * @type {!Function}
    * @protected
    */
			this.handler = handler;

			/**
    * Defines the path which will trigger the route handler.
    * @type {!string|RegExp|Function}
    * @protected
    */
			this.path = path;
		}

		/**
  * Builds parsed data (regex and tokens) for this route.
  * @return {!Object}
  * @protected
  */


		babelHelpers.createClass(Route, [{
			key: 'buildParsedData_',
			value: function buildParsedData_() {
				if (!this.parsedData_) {
					var tokens = parse(this.path);
					var regex = toRegex(tokens);
					this.parsedData_ = {
						regex: regex,
						tokens: tokens
					};
				}
				return this.parsedData_;
			}

			/**
    * Extracts param data from the given path, according to this route.
    * @param {string} path The url path to extract params from.
    * @return {Object} The extracted data, if the path matches this route, or
    *     null otherwise.
    */

		}, {
			key: 'extractParams',
			value: function extractParams(path) {
				if (core.isString(this.path)) {
					return extractData(this.buildParsedData_().tokens, path);
				}
				return {};
			}

			/**
    * Gets the route handler.
    * @return {!Function}
    */

		}, {
			key: 'getHandler',
			value: function getHandler() {
				return this.handler;
			}

			/**
    * Gets the route path.
    * @return {!string|RegExp|Function}
    */

		}, {
			key: 'getPath',
			value: function getPath() {
				return this.path;
			}

			/**
   	 * Matches if the router can handle the tested path.
   	 * @param {!string} value Path to test (may contain the querystring part).
    * @return {boolean} Returns true if matches any route.
    */

		}, {
			key: 'matchesPath',
			value: function matchesPath(value) {
				var path = this.path;

				if (core.isFunction(path)) {
					return path(value);
				}
				if (core.isString(path)) {
					path = this.buildParsedData_().regex;
				}
				if (path instanceof RegExp) {
					return value.search(path) > -1;
				}

				return false;
			}
		}]);
		return Route;
	}();

	this['senna']['Route'] = Route;
}).call(this);
'use strict';

(function () {
	var Disposable = this['sennaNamed']['metal']['Disposable'];

	var Cacheable = function (_Disposable) {
		babelHelpers.inherits(Cacheable, _Disposable);

		/**
   * Abstract class for defining cacheable behavior.
   * @constructor
   */
		function Cacheable() {
			babelHelpers.classCallCheck(this, Cacheable);

			/**
    * Holds the cached data.
    * @type {!Object}
    * @default null
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Cacheable.__proto__ || Object.getPrototypeOf(Cacheable)).call(this));

			_this.cache = null;

			/**
    * Holds whether class is cacheable.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.cacheable = false;
			return _this;
		}

		/**
   * Adds content to the cache.
   * @param {string} content Content to be cached.
   * @chainable
   */


		babelHelpers.createClass(Cacheable, [{
			key: 'addCache',
			value: function addCache(content) {
				if (this.cacheable) {
					this.cache = content;
				}
				return this;
			}

			/**
    * Clears the cache.
    * @chainable
    */

		}, {
			key: 'clearCache',
			value: function clearCache() {
				this.cache = null;
				return this;
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.clearCache();
			}

			/**
    * Gets the cached content.
    * @return {Object} Cached content.
    * @protected
    */

		}, {
			key: 'getCache',
			value: function getCache() {
				return this.cache;
			}

			/**
    * Whether the class is cacheable.
    * @return {boolean} Returns true when class is cacheable, false otherwise.
    */

		}, {
			key: 'isCacheable',
			value: function isCacheable() {
				return this.cacheable;
			}

			/**
    * Sets whether the class is cacheable.
    * @param {boolean} cacheable
    */

		}, {
			key: 'setCacheable',
			value: function setCacheable(cacheable) {
				if (!cacheable) {
					this.clearCache();
				}
				this.cacheable = cacheable;
			}
		}]);
		return Cacheable;
	}(Disposable);

	this['senna']['Cacheable'] = Cacheable;
}).call(this);
'use strict';

(function () {
	var core = this['sennaNamed']['metal']['core'];
	var globalEval = this['sennaNamed']['dom']['globalEval'];
	var Cacheable = this['senna']['Cacheable'];
	var CancellablePromise = this['senna']['Promise'];

	var Screen = function (_Cacheable) {
		babelHelpers.inherits(Screen, _Cacheable);

		/**
   * Screen class is a special type of route handler that provides helper
   * utilities that adds lifecycle and methods to provide content to each
   * registered surface.
   * @constructor
   * @extends {Cacheable}
   */
		function Screen() {
			babelHelpers.classCallCheck(this, Screen);

			/**
    * Holds the screen id.
    * @type {string}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this));

			_this.id = _this.makeId_(core.getUid());

			/**
    * Holds the screen title. Relevant when the page title should be
    * upadated when screen is rendered.
    * @type {?string=}
    * @default null
    * @protected
    */
			_this.title = null;
			return _this;
		}

		/**
   * Fires when the screen is active. Allows a screen to perform any setup
   * that requires its DOM to be visible. Lifecycle.
   */


		babelHelpers.createClass(Screen, [{
			key: 'activate',
			value: function activate() {
				void 0;
			}

			/**
    * Gives the Screen a chance to cancel the navigation and stop itself from
    * being deactivated. Can be used, for example, if the screen has unsaved
    * state. Lifecycle. Clean-up should not be preformed here, since the
    * navigation may still be cancelled. Do clean-up in deactivate.
    * @return {boolean=} If returns true, the current screen is locked and the
    *     next nagivation interrupted.
    */

		}, {
			key: 'beforeDeactivate',
			value: function beforeDeactivate() {
				void 0;
			}

			/**
    * Gives the Screen a chance format the path before history update.
    * @path {!string} path Navigation path.
    * @return {!string} Navigation path to use on history.
    */

		}, {
			key: 'beforeUpdateHistoryPath',
			value: function beforeUpdateHistoryPath(path) {
				return path;
			}

			/**
    * Gives the Screen a chance format the state before history update.
    * @path {!object} state History state.
    * @return {!object} History state to use on history.
    */

		}, {
			key: 'beforeUpdateHistoryState',
			value: function beforeUpdateHistoryState(state) {
				return state;
			}

			/**
    * Allows a screen to do any cleanup necessary after it has been
    * deactivated, for example cancelling outstanding requests or stopping
    * timers. Lifecycle.
    */

		}, {
			key: 'deactivate',
			value: function deactivate() {
				void 0;
			}

			/**
    * Dispose a screen, either after it is deactivated (in the case of a
    * non-cacheable view) or when the App is itself disposed for whatever
    * reason. Lifecycle.
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				babelHelpers.get(Screen.prototype.__proto__ || Object.getPrototypeOf(Screen.prototype), 'disposeInternal', this).call(this);
				void 0;
			}

			/**
    * Allows a screen to evaluate scripts before the element is made visible.
    * Lifecycle.
    * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
    * @return {?CancellablePromise=} This can return a promise, which will
    *     pause the navigation until it is resolved.
    */

		}, {
			key: 'evaluateScripts',
			value: function evaluateScripts(surfaces) {
				Object.keys(surfaces).forEach(function (sId) {
					if (surfaces[sId].activeChild) {
						globalEval.runScriptsInElement(surfaces[sId].activeChild);
					}
				});
				return CancellablePromise.resolve();
			}

			/**
    * Allows a screen to evaluate styles before the element is made visible.
    * Lifecycle.
    * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
    * @return {?CancellablePromise=} This can return a promise, which will
    *     pause the navigation until it is resolved.
    */

		}, {
			key: 'evaluateStyles',
			value: function evaluateStyles() {
				return CancellablePromise.resolve();
			}

			/**
    * Allows a screen to perform any setup immediately before the element is
    * made visible. Lifecycle.
    * @param {!object} surfaces Map of surfaces to flip keyed by surface id.
    * @return {?CancellablePromise=} This can return a promise, which will pause the
    *     navigation until it is resolved.
    */

		}, {
			key: 'flip',
			value: function flip(surfaces) {
				var _this2 = this;

				void 0;

				var transitions = [];

				Object.keys(surfaces).forEach(function (sId) {
					var surface = surfaces[sId];
					var deferred = surface.show(_this2.id);
					transitions.push(deferred);
				});

				return CancellablePromise.all(transitions);
			}

			/**
    * Gets the screen id.
    * @return {string}
    */

		}, {
			key: 'getId',
			value: function getId() {
				return this.id;
			}

			/**
    * Returns the content for the given surface, or null if the surface isn't
    * used by this screen. This will be called when a screen is initially
    * constructed or, if a screen is non-cacheable, when navigated.
    * @param {!string} surfaceId The id of the surface DOM element.
    * @param {!Object} params Params extracted from the current path.
    * @return {?string|Element=} This can return a string or node representing
    *     the content of the surface. If returns falsy values surface default
    *     content is restored.
    */

		}, {
			key: 'getSurfaceContent',
			value: function getSurfaceContent() {
				void 0;
			}

			/**
    * Gets the screen title.
    * @return {?string=}
    */

		}, {
			key: 'getTitle',
			value: function getTitle() {
				return this.title;
			}

			/**
    * Returns all contents for the surfaces. This will pass the loaded content
    * to <code>Screen.load</code> with all information you
    * need to fulfill the surfaces. Lifecycle.
    * @param {!string=} path The requested path.
    * @return {!CancellablePromise} This can return a string representing the
    *     contents of the surfaces or a promise, which will pause the navigation
    *     until it is resolved. This is useful for loading async content.
    */

		}, {
			key: 'load',
			value: function load() {
				void 0;
				return CancellablePromise.resolve();
			}

			/**
    * Makes the id for the screen.
    * @param {!string} id The screen id the content belongs too.
    * @return {string}
    * @private
    */

		}, {
			key: 'makeId_',
			value: function makeId_(id) {
				return 'screen_' + id;
			}

			/**
    * Sets the screen id.
    * @param {!string} id
    */

		}, {
			key: 'setId',
			value: function setId(id) {
				this.id = id;
			}

			/**
    * Sets the screen title.
    * @param {?string=} title
    */

		}, {
			key: 'setTitle',
			value: function setTitle(title) {
				this.title = title;
			}

			/**
    * @return {string}
    */

		}, {
			key: 'toString',
			value: function toString() {
				return this.id;
			}
		}]);
		return Screen;
	}(Cacheable);

	/**
  * @param {*} object
  * @return {boolean} Whether a given instance implements
  * <code>Screen</code>.
  */


	Screen.isImplementedBy = function (object) {
		return object instanceof Screen;
	};

	this['senna']['Screen'] = Screen;
}).call(this);
'use strict';

(function () {
	var globals = this['senna']['globals'];
	var core = this['sennaNamed']['metal']['core'];
	var Disposable = this['sennaNamed']['metal']['Disposable'];
	var dom = this['senna']['dom'];
	var CancellablePromise = this['senna']['Promise'];

	var Surface = function (_Disposable) {
		babelHelpers.inherits(Surface, _Disposable);

		/**
   * Surface class representing the references to elements on the page that
   * can potentially be updated by <code>App</code>.
   * @param {string} id
   * @constructor
   */
		function Surface(id) {
			babelHelpers.classCallCheck(this, Surface);

			var _this = babelHelpers.possibleConstructorReturn(this, (Surface.__proto__ || Object.getPrototypeOf(Surface)).call(this));

			if (!id) {
				throw new Error('Surface element id not specified. A surface element requires a valid id.');
			}

			/**
    * Holds the active child element.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.activeChild = null;

			/**
    * Holds the default child element.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.defaultChild = null;

			/**
    * Holds the element with the specified surface id, if not found creates a
    * new element with the specified id.
    * @type {Element}
    * @default null
    * @protected
    */
			_this.element = null;

			/**
    * Holds the surface id.
    * @type {String}
    * @default null
    * @protected
    */
			_this.id = id;

			/**
    * Holds the default transitionFn for the surfaces.
    * @param {?Element=} from The visible surface element.
    * @param {?Element=} to The surface element to be flipped.
    * @default null
    */
			_this.transitionFn = null;

			_this.defaultChild = _this.getChild(Surface.DEFAULT);
			_this.maybeWrapContentAsDefault_();
			_this.activeChild = _this.defaultChild;
			return _this;
		}

		/**
   * Adds screen content to a surface. If content hasn't been passed, see if
   * an element exists in the DOM that matches the id. By convention, the
   * element should already be nested in the right element and should have an
   * id that is a concatentation of the surface id + '-' + the screen id.
   * @param {!string} screenId The screen id the content belongs too.
   * @param {?string|Element=} opt_content The string content or element to
   *     add be added as surface content.
   * @return {Element}
   */


		babelHelpers.createClass(Surface, [{
			key: 'addContent',
			value: function addContent(screenId, opt_content) {
				var child = this.defaultChild;

				if (core.isDefAndNotNull(opt_content)) {
					child = this.getChild(screenId);
					if (child) {
						dom.removeChildren(child);
					} else {
						child = this.createChild(screenId);
						this.transition(child, null);
					}
					dom.append(child, opt_content);
				}

				var element = this.getElement();

				if (element && child) {
					dom.append(element, child);
				}

				return child;
			}

			/**
    * Creates child node for the surface.
    * @param {!string} screenId The screen id.
    * @return {Element}
    */

		}, {
			key: 'createChild',
			value: function createChild(screenId) {
				var child = globals.document.createElement('div');
				child.setAttribute('id', this.makeId_(screenId));
				return child;
			}

			/**
    * Gets child node of the surface.
    * @param {!string} screenId The screen id.
    * @return {?Element}
    */

		}, {
			key: 'getChild',
			value: function getChild(screenId) {
				return globals.document.getElementById(this.makeId_(screenId));
			}

			/**
    * Gets the surface element from element, and sets it to the el property of
    * the current instance.
    * <code>this.element</code> will be used.
    * @return {?Element} The current surface element.
    */

		}, {
			key: 'getElement',
			value: function getElement() {
				if (this.element) {
					return this.element;
				}
				this.element = globals.document.getElementById(this.id);
				return this.element;
			}

			/**
    * Gets the surface id.
    * @return {String}
    */

		}, {
			key: 'getId',
			value: function getId() {
				return this.id;
			}

			/**
    * Gets the surface transition function.
    * See <code>Surface.defaultTransition</code>.
    * @return {?Function=} The transition function.
    */

		}, {
			key: 'getTransitionFn',
			value: function getTransitionFn() {
				return this.transitionFn;
			}

			/**
    * Makes the id for the element that holds content for a screen.
    * @param {!string} screenId The screen id the content belongs too.
    * @return {String}
    * @private
    */

		}, {
			key: 'makeId_',
			value: function makeId_(screenId) {
				return this.id + '-' + screenId;
			}

			/**
    * If default child is missing, wraps surface content as default child. If
    * surface have static content, make sure to place a
    * <code>surfaceId-default</code> element inside surface, only contents
    * inside the default child will be replaced by navigation.
    */

		}, {
			key: 'maybeWrapContentAsDefault_',
			value: function maybeWrapContentAsDefault_() {
				var element = this.getElement();
				if (element && !this.defaultChild) {
					var fragment = globals.document.createDocumentFragment();
					while (element.firstChild) {
						fragment.appendChild(element.firstChild);
					}
					this.defaultChild = this.addContent(Surface.DEFAULT, fragment);
					this.transition(null, this.defaultChild);
				}
			}

			/**
    * Sets the surface id.
    * @param {!string} id
    */

		}, {
			key: 'setId',
			value: function setId(id) {
				this.id = id;
			}

			/**
    * Sets the surface transition function.
    * See <code>Surface.defaultTransition</code>.
    * @param {?Function=} transitionFn The transition function.
    */

		}, {
			key: 'setTransitionFn',
			value: function setTransitionFn(transitionFn) {
				this.transitionFn = transitionFn;
			}

			/**
    * Shows screen content from a surface.
    * @param {String} screenId The screen id to show.
    * @return {CancellablePromise} Pauses the navigation until it is resolved.
    */

		}, {
			key: 'show',
			value: function show(screenId) {
				var from = this.activeChild;
				var to = this.getChild(screenId);
				if (!to) {
					to = this.defaultChild;
				}
				this.activeChild = to;
				return this.transition(from, to).thenAlways(function () {
					if (from && from !== to) {
						dom.exitDocument(from);
					}
				});
			}

			/**
    * Removes screen content from a surface.
    * @param {!string} screenId The screen id to remove.
    */

		}, {
			key: 'remove',
			value: function remove(screenId) {
				var child = this.getChild(screenId);
				if (child) {
					dom.exitDocument(child);
				}
			}

			/**
    * @return {String}
    */

		}, {
			key: 'toString',
			value: function toString() {
				return this.id;
			}

			/**
    * Invokes the transition function specified on <code>transition</code> attribute.
    * @param {?Element=} from
    * @param {?Element=} to
    * @return {?CancellablePromise=} This can return a promise, which will pause the
    *     navigation until it is resolved.
    */

		}, {
			key: 'transition',
			value: function transition(from, to) {
				var transitionFn = this.transitionFn || Surface.defaultTransition;
				return CancellablePromise.resolve(transitionFn.call(this, from, to));
			}
		}]);
		return Surface;
	}(Disposable);

	/**
    * Holds the default surface name. Elements on the page must contain a child
    * element containing the default content, this element must be as following:
    *
    * Example:
    * <code>
    *   <div id="mysurface">
    *     <div id="mysurface-default">Default surface content.</div>
    *   </div>
    * </code>
    *
    * The default content is relevant for the initial page content. When a
    * screen doesn't provide content for the surface the default content is
    * restored into the page.
    *
    * @type {!String}
    * @default default
    * @static
    */


	Surface.DEFAULT = 'default';

	/**
  * Holds the default transition for all surfaces. Each surface could have its
  * own transition.
  *
  * Example:
  *
  * <code>
  * surface.setTransitionFn(function(from, to) {
  *   if (from) {
  *     from.style.display = 'none';
  *     from.classList.remove('flipped');
  *   }
  *   if (to) {
  *     to.style.display = 'block';
  *     to.classList.add('flipped');
  *   }
  *   return null;
  * });
  * </code>
  *
  * @param {?Element=} from The visible surface element.
  * @param {?Element=} to The surface element to be flipped.
  * @static
  */
	Surface.defaultTransition = function (from, to) {
		if (from) {
			from.style.display = 'none';
			from.classList.remove('flipped');
		}
		if (to) {
			to.style.display = 'block';
			to.classList.add('flipped');
		}
	};

	this['senna']['Surface'] = Surface;
}).call(this);
'use strict';

(function () {
	var array = this['sennaNamed']['metal']['array'];
	var async = this['sennaNamed']['metal']['async'];
	var core = this['sennaNamed']['metal']['core'];
	var debounce = this['senna']['debounce'];
	var dom = this['senna']['dom'];
	var CancellablePromise = this['senna']['Promise'];
	var EventEmitter = this['sennaNamed']['events']['EventEmitter'];
	var EventHandler = this['sennaNamed']['events']['EventHandler'];
	var utils = this['senna']['utils'];
	var globals = this['senna']['globals'];
	var Route = this['senna']['Route'];
	var Screen = this['senna']['Screen'];
	var Surface = this['senna']['Surface'];
	var Uri = this['senna']['Uri'];

	var App = function (_EventEmitter) {
		babelHelpers.inherits(App, _EventEmitter);

		/**
   * App class that handle routes and screens lifecycle.
   * @constructor
   * @extends {EventEmitter}
   */
		function App() {
			babelHelpers.classCallCheck(this, App);

			/**
    * Holds the active screen.
    * @type {?Screen}
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

			_this.activeScreen = null;

			/**
    * Holds the active path containing the query parameters.
    * @type {?string}
    * @protected
    */
			_this.activePath = null;

			/**
    * Allows prevent navigate from dom prevented event.
    * @type {boolean}
    * @default true
    * @protected
    */
			_this.allowPreventNavigate = true;

			/**
    * Holds link base path.
    * @type {!string}
    * @default ''
    * @protected
    */
			_this.basePath = '';

			/**
    * Holds the value of the browser path before a navigation is performed.
    * @type {!string}
    * @default the current browser path.
    * @protected
    */
			_this.browserPathBeforeNavigate = utils.getCurrentBrowserPathWithoutHash();

			/**
    * Captures scroll position from scroll event.
    * @type {!boolean}
    * @default true
    * @protected
    */
			_this.captureScrollPositionFromScrollEvent = true;

			/**
    * Holds the default page title.
    * @type {string}
    * @default null
    * @protected
    */
			_this.defaultTitle = globals.document.title;

			/**
    * Holds the form selector to define forms that are routed.
    * @type {!string}
    * @default form[enctype="multipart/form-data"]:not([data-senna-off])
    * @protected
    */
			_this.formSelector = 'form[enctype="multipart/form-data"]:not([data-senna-off])';

			/**
    * When enabled, the route matching ignores query string from the path.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.ignoreQueryStringFromRoutePath = false;

			/**
    * Holds the link selector to define links that are routed.
    * @type {!string}
    * @default a:not([data-senna-off])
    * @protected
    */
			_this.linkSelector = 'a:not([data-senna-off])';

			/**
    * Holds the loading css class.
    * @type {!string}
    * @default senna-loading
    * @protected
    */
			_this.loadingCssClass = 'senna-loading';

			/**
    * Using the History API to manage your URLs is awesome and, as it happens,
    * a crucial feature of good web apps. One of its downsides, however, is
    * that scroll positions are stored and then, more importantly, restored
    * whenever you traverse the history. This often means unsightly jumps as
    * the scroll position changes automatically, and especially so if your app
    * does transitions, or changes the contents of the page in any way.
    * Ultimately this leads to an horrible user experience. The good news is,
    * however, that there’s a potential fix: history.scrollRestoration.
    * https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
    * @type {boolean}
    * @protected
    */
			_this.nativeScrollRestorationSupported = 'scrollRestoration' in globals.window.history;

			/**
    * When set to true there is a pendingNavigate that has not yet been
    * resolved or rejected.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.isNavigationPending = false;

			/**
    * Holds a deferred with the current navigation.
    * @type {?CancellablePromise}
    * @default null
    * @protected
    */
			_this.pendingNavigate = null;

			/**
    * Holds the window horizontal scroll position when the navigation using
    * back or forward happens to be restored after the surfaces are updated.
    * @type {!Number}
    * @default 0
    * @protected
    */
			_this.popstateScrollLeft = 0;

			/**
    * Holds the window vertical scroll position when the navigation using
    * back or forward happens to be restored after the surfaces are updated.
    * @type {!Number}
    * @default 0
    * @protected
    */
			_this.popstateScrollTop = 0;

			/**
    * Holds the redirect path containing the query parameters.
    * @type {?string}
    * @protected
    */
			_this.redirectPath = null;

			/**
    * Holds the screen routes configuration.
    * @type {?Array}
    * @default []
    * @protected
    */
			_this.routes = [];

			/**
    * Maps the screen instances by the url containing the parameters.
    * @type {?Object}
    * @default {}
    * @protected
    */
			_this.screens = {};

			/**
    * When set to true the first erroneous popstate fired on page load will be
    * ignored, only if <code>globals.window.history.state</code> is also
    * <code>null</code>.
    * @type {boolean}
    * @default false
    * @protected
    */
			_this.skipLoadPopstate = false;

			/**
    * Maps that index the surfaces instances by the surface id.
    * @type {?Object}
    * @default {}
    * @protected
    */
			_this.surfaces = {};

			/**
    * When set to true, moves the scroll position after popstate, or to the
    * top of the viewport for new navigation. If false, the browser will
    * take care of scroll restoration.
    * @type {!boolean}
    * @default true
    * @protected
    */
			_this.updateScrollPosition = true;

			_this.appEventHandlers_ = new EventHandler();

			_this.appEventHandlers_.add(dom.on(globals.window, 'scroll', debounce(_this.onScroll_.bind(_this), 100)), dom.on(globals.window, 'load', _this.onLoad_.bind(_this)), dom.on(globals.window, 'popstate', _this.onPopstate_.bind(_this)));

			_this.on('startNavigate', _this.onStartNavigate_);
			_this.on('beforeNavigate', _this.onBeforeNavigate_);
			_this.on('beforeNavigate', _this.onBeforeNavigateDefault_, true);

			_this.setLinkSelector(_this.linkSelector);
			_this.setFormSelector(_this.formSelector);
			return _this;
		}

		/**
   * Adds one or more screens to the application.
   *
   * Example:
   *
   * <code>
   *   app.addRoutes({ path: '/foo', handler: FooScreen });
   *   or
   *   app.addRoutes([{ path: '/foo', handler: function(route) { return new FooScreen(); } }]);
   * </code>
   *
   * @param {Object} or {Array} routes Single object or an array of object.
   *     Each object should contain <code>path</code> and <code>screen</code>.
   *     The <code>path</code> should be a string or a regex that maps the
   *     navigation route to a screen class definition (not an instance), e.g:
   *         <code>{ path: "/home:param1", handler: MyScreen }</code>
   *         <code>{ path: /foo.+/, handler: MyScreen }</code>
   * @chainable
   */


		babelHelpers.createClass(App, [{
			key: 'addRoutes',
			value: function addRoutes(routes) {
				var _this2 = this;

				if (!Array.isArray(routes)) {
					routes = [routes];
				}
				routes.forEach(function (route) {
					if (!(route instanceof Route)) {
						route = new Route(route.path, route.handler);
					}
					_this2.routes.push(route);
				});
				return this;
			}

			/**
    * Adds one or more surfaces to the application.
    * @param {Surface|String|Array.<Surface|String>} surfaces
    *     Surface element id or surface instance. You can also pass an Array
    *     whichcontains surface instances or id. In case of ID, these should be
    *     the id of surface element.
    * @chainable
    */

		}, {
			key: 'addSurfaces',
			value: function addSurfaces(surfaces) {
				var _this3 = this;

				if (!Array.isArray(surfaces)) {
					surfaces = [surfaces];
				}
				surfaces.forEach(function (surface) {
					if (core.isString(surface)) {
						surface = new Surface(surface);
					}
					_this3.surfaces[surface.getId()] = surface;
				});
				return this;
			}

			/**
    * Returns if can navigate to path.
    * @param {!string} url
    * @return {boolean}
    */

		}, {
			key: 'canNavigate',
			value: function canNavigate(url) {
				var path = utils.getUrlPath(url);
				var uri = new Uri(url);

				if (!this.isLinkSameOrigin_(uri.getHostname())) {
					void 0;
					return false;
				}
				if (!this.isSameBasePath_(path)) {
					void 0;
					return false;
				}
				// Prevents navigation if it's a hash change on the same url.
				if (uri.getHash() && utils.isCurrentBrowserPath(path)) {
					return false;
				}
				if (!this.findRoute(path)) {
					void 0;
					return false;
				}

				return true;
			}

			/**
    * Clear screens cache.
    * @chainable
    */

		}, {
			key: 'clearScreensCache',
			value: function clearScreensCache() {
				var _this4 = this;

				Object.keys(this.screens).forEach(function (path) {
					if (path === _this4.activePath) {
						_this4.activeScreen.clearCache();
					} else {
						_this4.removeScreen(path);
					}
				});
			}

			/**
    * Retrieves or create a screen instance to a path.
    * @param {!string} path Path containing the querystring part.
    * @return {Screen}
    */

		}, {
			key: 'createScreenInstance',
			value: function createScreenInstance(path, route) {
				if (!this.pendingNavigate && path === this.activePath) {
					void 0;
					return this.activeScreen;
				}
				/* jshint newcap: false */
				var screen = this.screens[path];
				if (!screen) {
					var handler = route.getHandler();
					if (handler === Screen || Screen.isImplementedBy(handler.prototype)) {
						screen = new handler();
					} else {
						screen = handler(route) || new Screen();
					}
					void 0;
				}
				return screen;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				if (this.activeScreen) {
					this.removeScreen(this.activePath);
				}
				this.clearScreensCache();
				this.formEventHandler_.removeListener();
				this.linkEventHandler_.removeListener();
				this.appEventHandlers_.removeAllListeners();
				babelHelpers.get(App.prototype.__proto__ || Object.getPrototypeOf(App.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Dispatches to the first route handler that matches the current path, if
    * any.
    * @return {CancellablePromise} Returns a pending request cancellable promise.
    */

		}, {
			key: 'dispatch',
			value: function dispatch() {
				return this.navigate(utils.getCurrentBrowserPath(), true);
			}

			/**
    * Starts navigation to a path.
    * @param {!string} path Path containing the querystring part.
    * @param {boolean=} opt_replaceHistory Replaces browser history.
    * @return {CancellablePromise} Returns a pending request cancellable promise.
    */

		}, {
			key: 'doNavigate_',
			value: function doNavigate_(path, opt_replaceHistory) {
				var _this5 = this;

				if (this.activeScreen && this.activeScreen.beforeDeactivate()) {
					this.pendingNavigate = CancellablePromise.reject(new CancellablePromise.CancellationError('Cancelled by active screen'));
					return this.pendingNavigate;
				}

				var route = this.findRoute(path);
				if (!route) {
					this.pendingNavigate = CancellablePromise.reject(new CancellablePromise.CancellationError('No route for ' + path));
					return this.pendingNavigate;
				}

				void 0;

				this.stopPendingNavigate_();
				this.isNavigationPending = true;

				var nextScreen = this.createScreenInstance(path, route);

				return nextScreen.load(path).then(function () {
					if (_this5.activeScreen) {
						_this5.activeScreen.deactivate();
					}
					_this5.prepareNavigateHistory_(path, nextScreen, opt_replaceHistory);
					_this5.prepareNavigateSurfaces_(nextScreen, _this5.surfaces, _this5.extractParams(route, path));
				}).then(function () {
					return nextScreen.evaluateStyles(_this5.surfaces);
				}).then(function () {
					return nextScreen.flip(_this5.surfaces);
				}).then(function () {
					return nextScreen.evaluateScripts(_this5.surfaces);
				}).then(function () {
					return _this5.maybeUpdateScrollPositionState_();
				}).then(function () {
					return _this5.syncScrollPositionSyncThenAsync_();
				}).then(function () {
					return _this5.finalizeNavigate_(path, nextScreen);
				}).catch(function (reason) {
					_this5.isNavigationPending = false;
					_this5.handleNavigateError_(path, nextScreen, reason);
					throw reason;
				});
			}

			/**
    * Extracts params according to the given path and route.
    * @param {!Route} route
    * @param {string} path
    * @param {!Object}
    */

		}, {
			key: 'extractParams',
			value: function extractParams(route, path) {
				return route.extractParams(this.getRoutePath(path));
			}

			/**
    * Finalizes a screen navigation.
    * @param {!string} path Path containing the querystring part.
    * @param {!Screen} nextScreen
    * @protected
    */

		}, {
			key: 'finalizeNavigate_',
			value: function finalizeNavigate_(path, nextScreen) {
				nextScreen.activate();

				if (this.activeScreen && !this.activeScreen.isCacheable()) {
					if (this.activeScreen !== nextScreen) {
						this.removeScreen(this.activePath);
					}
				}

				this.activePath = path;
				this.activeScreen = nextScreen;
				this.browserPathBeforeNavigate = utils.getCurrentBrowserPathWithoutHash();
				this.screens[path] = nextScreen;
				this.isNavigationPending = false;
				this.pendingNavigate = null;
				globals.capturedFormElement = null;
				globals.capturedFormButtonElement = null;
				void 0;
			}

			/**
    * Finds a route for the test path. Returns true if matches has a route,
    * otherwise returns null.
    * @param {!string} path Path containing the querystring part.
    * @return {?Object} Route handler if match any or <code>null</code> if the
    *     path is the same as the current url and the path contains a fragment.
    */

		}, {
			key: 'findRoute',
			value: function findRoute(path) {
				path = this.getRoutePath(path);
				for (var i = 0; i < this.routes.length; i++) {
					var route = this.routes[i];
					if (route.matchesPath(path)) {
						return route;
					}
				}

				return null;
			}

			/**
    * Gets allow prevent navigate.
    * @return {boolean}
    */

		}, {
			key: 'getAllowPreventNavigate',
			value: function getAllowPreventNavigate() {
				return this.allowPreventNavigate;
			}

			/**
    * Gets link base path.
    * @return {!string}
    */

		}, {
			key: 'getBasePath',
			value: function getBasePath() {
				return this.basePath;
			}

			/**
    * Gets the default page title.
    * @return {string} defaultTitle
    */

		}, {
			key: 'getDefaultTitle',
			value: function getDefaultTitle() {
				return this.defaultTitle;
			}

			/**
    * Gets the form selector.
    * @return {!string}
    */

		}, {
			key: 'getFormSelector',
			value: function getFormSelector() {
				return this.formSelector;
			}

			/**
    * Check if route matching is ignoring query string from the route path.
    * @return {boolean}
    */

		}, {
			key: 'getIgnoreQueryStringFromRoutePath',
			value: function getIgnoreQueryStringFromRoutePath() {
				return this.ignoreQueryStringFromRoutePath;
			}

			/**
    * Gets the link selector.
    * @return {!string}
    */

		}, {
			key: 'getLinkSelector',
			value: function getLinkSelector() {
				return this.linkSelector;
			}

			/**
    * Gets the loading css class.
    * @return {!string}
    */

		}, {
			key: 'getLoadingCssClass',
			value: function getLoadingCssClass() {
				return this.loadingCssClass;
			}

			/**
    * Returns the given path formatted to be matched by a route. This will,
     * for example, remove the base path from it, but make sure it will end
     * with a '/'.
    * @param {string} path
    * @return {string}
    */

		}, {
			key: 'getRoutePath',
			value: function getRoutePath(path) {
				if (this.getIgnoreQueryStringFromRoutePath()) {
					path = utils.getUrlPathWithoutHashAndSearch(path);
					return utils.getUrlPathWithoutHashAndSearch(path.substr(this.basePath.length));
				}

				path = utils.getUrlPathWithoutHash(path);
				return utils.getUrlPathWithoutHash(path.substr(this.basePath.length));
			}

			/**
    * Gets the update scroll position value.
    * @return {boolean}
    */

		}, {
			key: 'getUpdateScrollPosition',
			value: function getUpdateScrollPosition() {
				return this.updateScrollPosition;
			}

			/**
    * Handle navigation error.
    * @param {!string} path Path containing the querystring part.
    * @param {!Screen} nextScreen
    * @param {!Error} error
    * @protected
    */

		}, {
			key: 'handleNavigateError_',
			value: function handleNavigateError_(path, nextScreen, err) {
				var _this6 = this;

				void 0;
				if (!utils.isCurrentBrowserPath(path)) {
					if (this.isNavigationPending && this.pendingNavigate) {
						this.pendingNavigate.thenAlways(function () {
							return _this6.removeScreen(path);
						}, this);
					} else {
						this.removeScreen(path);
					}
				}
			}

			/**
    * Checks if app has routes.
    * @return {boolean}
    */

		}, {
			key: 'hasRoutes',
			value: function hasRoutes() {
				return this.routes.length > 0;
			}

			/**
    * Tests if hostname is an offsite link.
    * @param {!string} hostname Link hostname to compare with
    *     <code>globals.window.location.hostname</code>.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isLinkSameOrigin_',
			value: function isLinkSameOrigin_(hostname) {
				return hostname === globals.window.location.hostname;
			}

			/**
    * Tests if link element has the same app's base path.
    * @param {!string} path Link path containing the querystring part.
    * @return {boolean}
    * @protected
    */

		}, {
			key: 'isSameBasePath_',
			value: function isSameBasePath_(path) {
				return path.indexOf(this.basePath) === 0;
			}

			/**
    * Lock the document scroll in order to avoid the browser native back and
    * forward navigation to change the scroll position. In the end of
    * navigation lifecycle scroll is repositioned.
    * @protected
    */

		}, {
			key: 'lockHistoryScrollPosition_',
			value: function lockHistoryScrollPosition_() {
				var state = globals.window.history.state;
				if (!state) {
					return;
				}
				// Browsers are inconsistent when re-positioning the scroll history on
				// popstate. At some browsers, history scroll happens before popstate, then
				// lock the scroll on the last known position as soon as possible after the
				// current JS execution context and capture the current value. Some others,
				// history scroll happens after popstate, in this case, we bind an once
				// scroll event to lock the las known position. Lastly, the previous two
				// behaviors can happen even on the same browser, hence the race will decide
				// the winner.
				var winner = false;
				var switchScrollPositionRace = function switchScrollPositionRace() {
					globals.document.removeEventListener('scroll', switchScrollPositionRace, false);
					if (!winner) {
						globals.window.scrollTo(state.scrollLeft, state.scrollTop);
						winner = true;
					}
				};
				async.nextTick(switchScrollPositionRace);
				globals.document.addEventListener('scroll', switchScrollPositionRace, false);
			}

			/**
    * If supported by the browser, disables native scroll restoration and
    * stores current value.
    */

		}, {
			key: 'maybeDisableNativeScrollRestoration',
			value: function maybeDisableNativeScrollRestoration() {
				if (this.nativeScrollRestorationSupported) {
					this.nativeScrollRestoration_ = globals.window.history.scrollRestoration;
					globals.window.history.scrollRestoration = 'manual';
				}
			}

			/**
    * Maybe navigate to a path.
    * @param {string} href Information about the link's href.
    * @param {Event} event Dom event that initiated the navigation.
    */

		}, {
			key: 'maybeNavigate_',
			value: function maybeNavigate_(href, event) {
				if (!this.canNavigate(href)) {
					return;
				}

				globals.capturedFormElement = event.capturedFormElement;
				globals.capturedFormButtonElement = event.capturedFormButtonElement;

				var navigateFailed = false;
				try {
					this.navigate(utils.getUrlPath(href), false, event);
				} catch (err) {
					// Do not prevent link navigation in case some synchronous error occurs
					navigateFailed = true;
				}

				if (!navigateFailed) {
					event.preventDefault();
				}
			}

			/**
    * Maybe reposition scroll to hashed anchor.
    */

		}, {
			key: 'maybeRepositionScrollToHashedAnchor',
			value: function maybeRepositionScrollToHashedAnchor() {
				var hash = globals.window.location.hash;
				if (hash) {
					var anchorElement = globals.document.getElementById(hash.substring(1));
					if (anchorElement) {
						globals.window.scrollTo(anchorElement.offsetLeft, anchorElement.offsetTop);
					}
				}
			}

			/**
    * If supported by the browser, restores native scroll restoration to the
    * value captured by `maybeDisableNativeScrollRestoration`.
    */

		}, {
			key: 'maybeRestoreNativeScrollRestoration',
			value: function maybeRestoreNativeScrollRestoration() {
				if (this.nativeScrollRestorationSupported && this.nativeScrollRestoration_) {
					globals.window.history.scrollRestoration = this.nativeScrollRestoration_;
				}
			}

			/**
    * Maybe restore redirected path hash in case both the current path and
    * the given path are the same.
    * @param {!string} path Path before navigation.
    * @param {!string} redirectPath Path after navigation.
    * @param {!string} hash Hash to be added to the path.
    * @return {!string} Returns the path with the hash restored.
    */

		}, {
			key: 'maybeRestoreRedirectPathHash_',
			value: function maybeRestoreRedirectPathHash_(path, redirectPath, hash) {
				if (redirectPath === utils.getUrlPathWithoutHash(path)) {
					return redirectPath + hash;
				}
				return redirectPath;
			}

			/**
    * Maybe update scroll position in history state to anchor on path.
    * @param {!string} path Path containing anchor
    */

		}, {
			key: 'maybeUpdateScrollPositionState_',
			value: function maybeUpdateScrollPositionState_() {
				var hash = globals.window.location.hash;
				var anchorElement = globals.document.getElementById(hash.substring(1));
				if (anchorElement) {
					this.saveHistoryCurrentPageScrollPosition_(anchorElement.offsetTop, anchorElement.offsetLeft);
				}
			}

			/**
    * Navigates to the specified path if there is a route handler that matches.
    * @param {!string} path Path to navigate containing the base path.
    * @param {boolean=} opt_replaceHistory Replaces browser history.
    * @param {Event=} event Optional event object that triggered the navigation.
    * @return {CancellablePromise} Returns a pending request cancellable promise.
    */

		}, {
			key: 'navigate',
			value: function navigate(path, opt_replaceHistory, opt_event) {
				if (!utils.isHtml5HistorySupported()) {
					throw new Error('HTML5 History is not supported. Senna will not intercept navigation.');
				}

				// When reloading the same path do replaceState instead of pushState to
				// avoid polluting history with states with the same path.
				if (path === this.activePath) {
					opt_replaceHistory = true;
				}

				this.emit('beforeNavigate', {
					event: opt_event,
					path: path,
					replaceHistory: !!opt_replaceHistory
				});

				return this.pendingNavigate;
			}

			/**
    * Befores navigation to a path.
    * @param {!Event} event Event facade containing <code>path</code> and
    *     <code>replaceHistory</code>.
    * @protected
    */

		}, {
			key: 'onBeforeNavigate_',
			value: function onBeforeNavigate_(event) {
				if (globals.capturedFormElement) {
					event.form = globals.capturedFormElement;
				}
			}

			/**
    * Befores navigation to a path. Runs after external listeners.
    * @param {!Event} event Event facade containing <code>path</code> and
    *     <code>replaceHistory</code>.
    * @protected
    */

		}, {
			key: 'onBeforeNavigateDefault_',
			value: function onBeforeNavigateDefault_(event) {
				if (this.pendingNavigate) {
					if (this.pendingNavigate.path === event.path) {
						void 0;
						return;
					}
				}

				this.emit('startNavigate', {
					form: event.form,
					path: event.path,
					replaceHistory: event.replaceHistory
				});
			}

			/**
    * Intercepts document clicks and test link elements in order to decide
    * whether Surface app can navigate.
    * @param {!Event} event Event facade
    * @protected
    */

		}, {
			key: 'onDocClickDelegate_',
			value: function onDocClickDelegate_(event) {
				if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.button) {
					void 0;
					return;
				}
				this.maybeNavigate_(event.delegateTarget.href, event);
			}

			/**
    * Intercepts document form submits and test action path in order to decide
    * whether Surface app can navigate.
    * @param {!Event} event Event facade
    * @protected
    */

		}, {
			key: 'onDocSubmitDelegate_',
			value: function onDocSubmitDelegate_(event) {
				var form = event.delegateTarget;
				if (form.method === 'get') {
					void 0;
					return;
				}
				event.capturedFormElement = form;
				var buttonSelector = 'button:not([type]),button[type=submit],input[type=submit]';
				if (dom.match(globals.document.activeElement, buttonSelector)) {
					event.capturedFormButtonElement = globals.document.activeElement;
				} else {
					event.capturedFormButtonElement = form.querySelector(buttonSelector);
				}
				this.maybeNavigate_(form.action, event);
			}

			/**
    * Listens to the window's load event in order to avoid issues with some browsers
    * that trigger popstate calls on the first load. For more information see
    * http://stackoverflow.com/questions/6421769/popstate-on-pages-load-in-chrome.
    * @protected
    */

		}, {
			key: 'onLoad_',
			value: function onLoad_() {
				var _this7 = this;

				this.skipLoadPopstate = true;
				setTimeout(function () {
					// The timeout ensures that popstate events will be unblocked right
					// after the load event occured, but not in the same event-loop cycle.
					_this7.skipLoadPopstate = false;
				}, 0);
				// Try to reposition scroll to the hashed anchor when page loads.
				this.maybeRepositionScrollToHashedAnchor();
			}

			/**
    * Handles browser history changes and fires app's navigation if the state
    * belows to us. If we detect a popstate and the state is <code>null</code>,
    * assume it is navigating to an external page or to a page we don't have
    * route, then <code>globals.window.location.reload()</code> is invoked in order to
    * reload the content to the current url.
    * @param {!Event} event Event facade
    * @protected
    */

		}, {
			key: 'onPopstate_',
			value: function onPopstate_(event) {
				if (this.skipLoadPopstate) {
					return;
				}

				// Do not navigate if the popstate was triggered by a hash change.
				if (utils.isCurrentBrowserPath(this.browserPathBeforeNavigate)) {
					this.maybeRepositionScrollToHashedAnchor();
					return;
				}

				var state = event.state;

				if (!state) {
					if (globals.window.location.hash) {
						// If senna is on an redirect path and a hash popstate happens
						// to a different url, reload the browser. This behavior doesn't
						// require senna to route hashed links and is closer to native
						// browser behavior.
						if (this.redirectPath && !utils.isCurrentBrowserPath(this.redirectPath)) {
							this.reloadPage();
						}
						// Always try to reposition scroll to the hashed anchor when
						// hash popstate happens.
						this.maybeRepositionScrollToHashedAnchor();
					} else {
						this.reloadPage();
					}
					return;
				}

				if (state.senna) {
					void 0;
					this.popstateScrollTop = state.scrollTop;
					this.popstateScrollLeft = state.scrollLeft;
					if (!this.nativeScrollRestorationSupported) {
						this.lockHistoryScrollPosition_();
					}
					this.navigate(state.path, true);
				}
			}

			/**
    * Listens document scroll changes in order to capture the possible lock
    * scroll position for history scrolling.
    * @protected
    */

		}, {
			key: 'onScroll_',
			value: function onScroll_() {
				if (this.captureScrollPositionFromScrollEvent) {
					this.saveHistoryCurrentPageScrollPosition_(globals.window.pageYOffset, globals.window.pageXOffset);
				}
			}

			/**
    * Starts navigation to a path.
    * @param {!Event} event Event facade containing <code>path</code> and
    *     <code>replaceHistory</code>.
    * @protected
    */

		}, {
			key: 'onStartNavigate_',
			value: function onStartNavigate_(event) {
				var _this8 = this;

				this.maybeDisableNativeScrollRestoration();
				this.captureScrollPositionFromScrollEvent = false;
				dom.addClasses(globals.document.documentElement, this.loadingCssClass);

				var endNavigatePayload = {
					form: event.form,
					path: event.path
				};

				this.pendingNavigate = this.doNavigate_(event.path, event.replaceHistory).catch(function (reason) {
					endNavigatePayload.error = reason;
					throw reason;
				}).thenAlways(function () {
					if (!_this8.pendingNavigate) {
						dom.removeClasses(globals.document.documentElement, _this8.loadingCssClass);
						_this8.maybeRestoreNativeScrollRestoration();
						_this8.captureScrollPositionFromScrollEvent = true;
					}
					_this8.emit('endNavigate', endNavigatePayload);
				});

				this.pendingNavigate.path = event.path;
			}

			/**
    * Prefetches the specified path if there is a route handler that matches.
    * @param {!string} path Path to navigate containing the base path.
    * @return {CancellablePromise} Returns a pending request cancellable promise.
    */

		}, {
			key: 'prefetch',
			value: function prefetch(path) {
				var _this9 = this;

				var route = this.findRoute(path);
				if (!route) {
					return CancellablePromise.reject(new CancellablePromise.CancellationError('No route for ' + path));
				}

				void 0;

				var nextScreen = this.createScreenInstance(path, route);

				return nextScreen.load(path).then(function () {
					return _this9.screens[path] = nextScreen;
				}).catch(function (reason) {
					_this9.handleNavigateError_(path, nextScreen, reason);
					throw reason;
				});
			}

			/**
    * Prepares screen flip. Updates history state and surfaces content.
    * @param {!string} path Path containing the querystring part.
    * @param {!Screen} nextScreen
    * @param {boolean=} opt_replaceHistory Replaces browser history.
    */

		}, {
			key: 'prepareNavigateHistory_',
			value: function prepareNavigateHistory_(path, nextScreen, opt_replaceHistory) {
				var title = nextScreen.getTitle();
				if (!core.isString(title)) {
					title = this.getDefaultTitle();
				}
				var redirectPath = nextScreen.beforeUpdateHistoryPath(path);
				var historyState = {
					form: core.isDefAndNotNull(globals.capturedFormElement),
					path: path,
					redirectPath: redirectPath,
					scrollLeft: 0,
					scrollTop: 0,
					senna: true
				};
				if (opt_replaceHistory) {
					historyState.scrollTop = this.popstateScrollTop;
					historyState.scrollLeft = this.popstateScrollLeft;
				}
				var hash = new Uri(path).getHash();
				redirectPath = this.maybeRestoreRedirectPathHash_(path, redirectPath, hash);
				this.updateHistory_(title, redirectPath, nextScreen.beforeUpdateHistoryState(historyState), opt_replaceHistory);
				this.redirectPath = redirectPath;
			}

			/**
    * Prepares screen flip. Updates history state and surfaces content.
    * @param {!Screen} nextScreen
    * @param {!Object} surfaces Map of surfaces to flip keyed by surface id.
    * @param {!Object} params Params extracted from the current path.
    */

		}, {
			key: 'prepareNavigateSurfaces_',
			value: function prepareNavigateSurfaces_(nextScreen, surfaces, params) {
				Object.keys(surfaces).forEach(function (id) {
					var surfaceContent = nextScreen.getSurfaceContent(id, params);
					surfaces[id].addContent(nextScreen.getId(), surfaceContent);
					void 0;
				});
			}

			/**
    * Reloads the page by performing `window.location.reload()`.
    */

		}, {
			key: 'reloadPage',
			value: function reloadPage() {
				globals.window.location.reload();
			}

			/**
    * Removes route instance from app routes.
    * @param {Route} route
    * @return {boolean} True if an element was removed.
    */

		}, {
			key: 'removeRoute',
			value: function removeRoute(route) {
				return array.remove(this.routes, route);
			}

			/**
    * Removes a screen.
    * @param {!string} path Path containing the querystring part.
    */

		}, {
			key: 'removeScreen',
			value: function removeScreen(path) {
				var _this10 = this;

				var screen = this.screens[path];
				if (screen) {
					Object.keys(this.surfaces).forEach(function (surfaceId) {
						return _this10.surfaces[surfaceId].remove(screen.getId());
					});
					screen.dispose();
					delete this.screens[path];
				}
			}

			/**
    * Saves given scroll position into history state.
    * @param {!number} scrollTop Number containing the top scroll position to be saved.
    * @param {!number} scrollLeft Number containing the left scroll position to be saved.
    */

		}, {
			key: 'saveHistoryCurrentPageScrollPosition_',
			value: function saveHistoryCurrentPageScrollPosition_(scrollTop, scrollLeft) {
				var state = globals.window.history.state;
				if (state && state.senna) {
					var _ref = [scrollTop, scrollLeft];
					state.scrollTop = _ref[0];
					state.scrollLeft = _ref[1];

					globals.window.history.replaceState(state, null, null);
				}
			}

			/**
    * Sets allow prevent navigate.
    * @param {boolean} allowPreventNavigate
    */

		}, {
			key: 'setAllowPreventNavigate',
			value: function setAllowPreventNavigate(allowPreventNavigate) {
				this.allowPreventNavigate = allowPreventNavigate;
			}

			/**
    * Sets link base path.
    * @param {!string} path
    */

		}, {
			key: 'setBasePath',
			value: function setBasePath(basePath) {
				this.basePath = basePath;
			}

			/**
    * Sets the default page title.
    * @param {string} defaultTitle
    */

		}, {
			key: 'setDefaultTitle',
			value: function setDefaultTitle(defaultTitle) {
				this.defaultTitle = defaultTitle;
			}

			/**
    * Sets the form selector.
    * @param {!string} formSelector
    */

		}, {
			key: 'setFormSelector',
			value: function setFormSelector(formSelector) {
				this.formSelector = formSelector;
				if (this.formEventHandler_) {
					this.formEventHandler_.removeListener();
				}
				this.formEventHandler_ = dom.delegate(document, 'submit', this.formSelector, this.onDocSubmitDelegate_.bind(this), this.allowPreventNavigate);
			}

			/**
    * Sets if route matching should ignore query string from the route path.
    * @param {boolean} ignoreQueryStringFromRoutePath
    */

		}, {
			key: 'setIgnoreQueryStringFromRoutePath',
			value: function setIgnoreQueryStringFromRoutePath(ignoreQueryStringFromRoutePath) {
				this.ignoreQueryStringFromRoutePath = ignoreQueryStringFromRoutePath;
			}

			/**
    * Sets the link selector.
    * @param {!string} linkSelector
    */

		}, {
			key: 'setLinkSelector',
			value: function setLinkSelector(linkSelector) {
				this.linkSelector = linkSelector;
				if (this.linkEventHandler_) {
					this.linkEventHandler_.removeListener();
				}
				this.linkEventHandler_ = dom.delegate(document, 'click', this.linkSelector, this.onDocClickDelegate_.bind(this), this.allowPreventNavigate);
			}

			/**
    * Sets the loading css class.
    * @param {!string} loadingCssClass
    */

		}, {
			key: 'setLoadingCssClass',
			value: function setLoadingCssClass(loadingCssClass) {
				this.loadingCssClass = loadingCssClass;
			}

			/**
    * Sets the update scroll position value.
    * @param {boolean} updateScrollPosition
    */

		}, {
			key: 'setUpdateScrollPosition',
			value: function setUpdateScrollPosition(updateScrollPosition) {
				this.updateScrollPosition = updateScrollPosition;
			}

			/**
    * Cancels pending navigate with <code>Cancel pending navigation</code> error.
    * @protected
    */

		}, {
			key: 'stopPendingNavigate_',
			value: function stopPendingNavigate_() {
				if (this.pendingNavigate) {
					this.pendingNavigate.cancel('Cancel pending navigation');
					this.pendingNavigate = null;
				}
			}

			/**
    * Sync document scroll position twice, the first one synchronous and then
    * one inside <code>async.nextTick</code>. Relevant to browsers that fires
    * scroll restoration asynchronously after popstate.
    * @protected
    * @return {?CancellablePromise=}
    */

		}, {
			key: 'syncScrollPositionSyncThenAsync_',
			value: function syncScrollPositionSyncThenAsync_() {
				var _this11 = this;

				var state = globals.window.history.state;
				if (!state) {
					return;
				}

				var scrollTop = state.scrollTop;
				var scrollLeft = state.scrollLeft;

				var sync = function sync() {
					if (_this11.updateScrollPosition) {
						globals.window.scrollTo(scrollLeft, scrollTop);
					}
				};

				return new CancellablePromise(function (resolve) {
					return sync() & async.nextTick(function () {
						return sync() & resolve();
					});
				});
			}

			/**
    * Updates or replace browser history.
    * @param {?string} title Document title.
    * @param {!string} path Path containing the querystring part.
    * @param {!object} state
    * @param {boolean=} opt_replaceHistory Replaces browser history.
    * @protected
    */

		}, {
			key: 'updateHistory_',
			value: function updateHistory_(title, path, state, opt_replaceHistory) {
				if (opt_replaceHistory) {
					globals.window.history.replaceState(state, title, path);
				} else {
					globals.window.history.pushState(state, title, path);
				}

				var titleNode = globals.document.querySelector('title');
				if (titleNode) {
					titleNode.innerHTML = title;
				} else {
					globals.document.title = title;
				}
			}
		}]);
		return App;
	}(EventEmitter);

	this['senna']['App'] = App;
}).call(this);
'use strict';

(function () {
	var isDef = this['sennaNamed']['metal']['isDef'];
	var isDefAndNotNull = this['sennaNamed']['metal']['isDefAndNotNull'];
	var Uri = this['senna']['Uri'];
	var Promise = this['sennaNamed']['Promise']['CancellablePromise'];

	var Ajax = function () {
		function Ajax() {
			babelHelpers.classCallCheck(this, Ajax);
		}

		babelHelpers.createClass(Ajax, null, [{
			key: 'parseResponseHeaders',


			/**
    * XmlHttpRequest's getAllResponseHeaders() method returns a string of
    * response headers according to the format described on the spec:
    * {@link http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method}.
    * This method parses that string into a user-friendly name/value pair
    * object.
    * @param {string} allHeaders All headers as string.
    * @return {!Array.<Object<string, string>>}
    */
			value: function parseResponseHeaders(allHeaders) {
				var headers = [];
				if (!allHeaders) {
					return headers;
				}
				var pairs = allHeaders.split('\r\n');
				for (var i = 0; i < pairs.length; i++) {
					var index = pairs[i].indexOf(': ');
					if (index > 0) {
						var name = pairs[i].substring(0, index);
						var value = pairs[i].substring(index + 2);
						headers.push({
							name: name,
							value: value
						});
					}
				}
				return headers;
			}

			/**
    * Requests the url using XMLHttpRequest.
    * @param {!string} url
    * @param {!string} method
    * @param {?string} body
    * @param {MultiMap=} opt_headers
    * @param {MultiMap=} opt_params
    * @param {number=} opt_timeout
    * @param {boolean=} opt_sync
    * @param {boolean=} opt_withCredentials
    * @return {Promise} Deferred ajax request.
    * @protected
    */

		}, {
			key: 'request',
			value: function request(url, method, body, opt_headers, opt_params, opt_timeout, opt_sync, opt_withCredentials) {
				url = url || '';
				method = method || 'GET';

				var request = new XMLHttpRequest();

				var promise = new Promise(function (resolve, reject) {
					request.onload = function () {
						if (request.aborted) {
							request.onerror();
							return;
						}
						resolve(request);
					};
					request.onerror = function () {
						var error = new Error('Request error');
						error.request = request;
						reject(error);
					};
				}).thenCatch(function (reason) {
					request.abort();
					throw reason;
				}).thenAlways(function () {
					clearTimeout(timeout);
				});

				if (opt_params) {
					url = new Uri(url).addParametersFromMultiMap(opt_params).toString();
				}

				request.open(method, url, !opt_sync);

				if (opt_withCredentials) {
					request.withCredentials = true;
				}

				if (opt_headers) {
					opt_headers.names().forEach(function (name) {
						request.setRequestHeader(name, opt_headers.getAll(name).join(', '));
					});
				}

				request.send(isDef(body) ? body : null);

				if (isDefAndNotNull(opt_timeout)) {
					var timeout = setTimeout(function () {
						promise.cancel('Request timeout');
					}, opt_timeout);
				}

				return promise;
			}
		}]);
		return Ajax;
	}();

	this['senna']['Ajax'] = Ajax;
}).call(this);
'use strict';

/**
 * Holds value error messages.
 * @const
 */

(function () {
  var errors = function errors() {
    babelHelpers.classCallCheck(this, errors);
  };

  /**
   * Invalid status error message.
   * @type {string}
   * @static
   */


  errors.INVALID_STATUS = 'Invalid status code';

  /**
   * Request error message.
   * @type {string}
   * @static
   */
  errors.REQUEST_ERROR = 'Request error';

  /**
   * Request timeout error message.
   * @type {string}
   * @static
   */
  errors.REQUEST_TIMEOUT = 'Request timeout';

  this['senna']['errors'] = errors;
}).call(this);
'use strict';

/**
 * Metal.js browser user agent detection. It's extremely recommended the usage
 * of feature checking over browser user agent sniffing. Unfortunately, in some
 * situations feature checking can be slow or even impossible, therefore use
 * this utility with caution.
 * @see <a href="http://www.useragentstring.com/">User agent strings</a>.
 */

(function () {
	var UA = function () {
		function UA() {
			babelHelpers.classCallCheck(this, UA);
		}

		babelHelpers.createClass(UA, null, [{
			key: 'getNativeUserAgent',

			/**
    * Gets the native userAgent string from navigator if it exists. If
    * navigator or navigator.userAgent string is missing, returns an empty
    * string.
    * @return {string}
    * @private
    * @static
    */
			value: function getNativeUserAgent() {
				var navigator = UA.globals.window.navigator;
				if (navigator) {
					var userAgent = navigator.userAgent;
					if (userAgent) {
						return userAgent;
					}
				}
				return '';
			}

			/**
    * Gets the native platform string from navigator if it exists. If
    * navigator or navigator.platform string is missing, returns an empty
    * string.
    * @return {string}
    * @private
    * @static
    */

		}, {
			key: 'getNativePlatform',
			value: function getNativePlatform() {
				var navigator = UA.globals.window.navigator;
				if (navigator) {
					var platform = navigator.platform;
					if (platform) {
						return platform;
					}
				}
				return '';
			}

			/**
    * Whether the platform contains the given string, ignoring case.
    * @param {string} str
    * @return {boolean}
    * @private
    * @static
   */

		}, {
			key: 'matchPlatform',
			value: function matchPlatform(str) {
				return UA.platform.indexOf(str) !== -1;
			}

			/**
    * Whether the user agent contains the given string, ignoring case.
    * @param {string} str
    * @return {boolean}
    * @private
    * @static
   */

		}, {
			key: 'matchUserAgent',
			value: function matchUserAgent(str) {
				return UA.userAgent.indexOf(str) !== -1;
			}

			/**
    * Tests the user agent.
    * @param {string} userAgent The user agent string.
    * @static
    */

		}, {
			key: 'testUserAgent',
			value: function testUserAgent() {
				var userAgent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

				/**
     * Holds the user agent value extracted from browser native user agent.
     * @type {string}
     * @static
     */
				UA.userAgent = userAgent;

				/**
     * Holds the platform value extracted from browser native platform.
     * @type {string}
     * @static
     */
				UA.platform = platform;

				/**
     * Whether the user's OS is Mac.
     * @type {boolean}
     * @static
     */
				UA.isMac = UA.matchPlatform('Mac');

				/**
     * Whether the user's OS is Win.
     * @type {boolean}
     * @static
     */
				UA.isWin = UA.matchPlatform('Win');

				/**
     * Whether the user's browser is Opera.
     * @type {boolean}
     * @static
     */
				UA.isOpera = UA.matchUserAgent('Opera') || UA.matchUserAgent('OPR');

				/**
     * Whether the user's browser is IE.
     * @type {boolean}
     * @static
     */
				UA.isIe = UA.matchUserAgent('Trident') || UA.matchUserAgent('MSIE');

				/**
     * Whether the user's browser is Edge.
     * @type {boolean}
     * @static
     */
				UA.isEdge = UA.matchUserAgent('Edge');

				/**
     * Whether the user's browser is IE or Edge.
     * @type {boolean}
     * @static
     */
				UA.isIeOrEdge = UA.isIe || UA.isEdge;

				/**
     * Whether the user's browser is Chrome.
     * @type {boolean}
     * @static
     */
				UA.isChrome = (UA.matchUserAgent('Chrome') || UA.matchUserAgent('CriOS')) && !UA.isOpera && !UA.isEdge;

				/**
     * Whether the user's browser is Safari.
     * @type {boolean}
     * @static
     */
				UA.isSafari = UA.matchUserAgent('Safari') && !(UA.isChrome || UA.isOpera || UA.isEdge);

				/**
     * Whether the user's browser is Firefox.
     * @type {boolean}
     * @static
     */
				UA.isFirefox = UA.matchUserAgent('Firefox');
			}
		}]);
		return UA;
	}();

	/**
  * Exposes global references.
  * @type {object}
  * @static
  */


	UA.globals = {
		window: window
	};

	UA.testUserAgent(UA.getNativeUserAgent(), UA.getNativePlatform());

	this['senna']['UA'] = UA;
}).call(this);
'use strict';

(function () {
	var core = this['sennaNamed']['metal']['core'];
	var Ajax = this['senna']['Ajax'];
	var MultiMap = this['sennaNamed']['structs']['MultiMap'];
	var CancellablePromise = this['senna']['Promise'];
	var errors = this['senna']['errors'];
	var utils = this['senna']['utils'];
	var globals = this['senna']['globals'];
	var Screen = this['senna']['Screen'];
	var Uri = this['senna']['Uri'];
	var UA = this['senna']['UA'];

	var RequestScreen = function (_Screen) {
		babelHelpers.inherits(RequestScreen, _Screen);

		/**
   * Request screen abstract class to perform io operations on descendant
   * screens.
   * @constructor
   * @extends {Screen}
   */
		function RequestScreen() {
			babelHelpers.classCallCheck(this, RequestScreen);

			/**
    * @inheritDoc
    * @default true
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (RequestScreen.__proto__ || Object.getPrototypeOf(RequestScreen)).call(this));

			_this.cacheable = true;

			/**
    * Holds default http headers to set on request.
    * @type {?Object=}
    * @default {
    *   'X-PJAX': 'true',
    *   'X-Requested-With': 'XMLHttpRequest'
    * }
    * @protected
    */
			_this.httpHeaders = {
				'X-PJAX': 'true',
				'X-Requested-With': 'XMLHttpRequest'
			};

			/**
    * Holds default http method to perform the request.
    * @type {!string}
    * @default RequestScreen.GET
    * @protected
    */
			_this.httpMethod = RequestScreen.GET;

			/**
    * Holds the XHR object responsible for the request.
    * @type {XMLHttpRequest}
    * @default null
    * @protected
    */
			_this.request = null;

			/**
    * Holds the request timeout in milliseconds.
    * @type {!number}
    * @default 30000
    * @protected
    */
			_this.timeout = 30000;
			return _this;
		}

		/**
   * Asserts that response status code is valid.
   * @param {number} status
   * @protected
   */


		babelHelpers.createClass(RequestScreen, [{
			key: 'assertValidResponseStatusCode',
			value: function assertValidResponseStatusCode(status) {
				if (!this.isValidResponseStatusCode(status)) {
					var error = new Error(errors.INVALID_STATUS);
					error.invalidStatus = true;
					error.statusCode = status;
					throw error;
				}
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'beforeUpdateHistoryPath',
			value: function beforeUpdateHistoryPath(path) {
				var redirectPath = this.getRequestPath();
				if (redirectPath && redirectPath !== path) {
					return redirectPath;
				}
				return path;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'beforeUpdateHistoryState',
			value: function beforeUpdateHistoryState(state) {
				// If state is ours and navigate to post-without-redirect-get set
				// history state to null, that way Senna will reload the page on
				// popstate since it cannot predict post data.
				if (state.senna && state.form && state.redirectPath === state.path) {
					return null;
				}
				return state;
			}

			/**
    * Formats load path before invoking ajax call.
    * @param {string} path
    * @return {string} Formatted path;
    * @protected
    */

		}, {
			key: 'formatLoadPath',
			value: function formatLoadPath(path) {
				var uri = new Uri(path);

				uri.setHostname(globals.window.location.hostname);
				uri.setProtocol(globals.window.location.protocol);

				if (globals.window.location.port) {
					uri.setPort(globals.window.location.port);
				}

				if (UA.isIeOrEdge && this.httpMethod === RequestScreen.GET) {
					return uri.makeUnique().toString();
				}

				return uri.toString();
			}

			/**
    * Gets the http headers.
    * @return {?Object=}
    */

		}, {
			key: 'getHttpHeaders',
			value: function getHttpHeaders() {
				return this.httpHeaders;
			}

			/**
    * Gets the http method.
    * @return {!string}
    */

		}, {
			key: 'getHttpMethod',
			value: function getHttpMethod() {
				return this.httpMethod;
			}

			/**
    * Gets request path.
    * @return {string=}
    */

		}, {
			key: 'getRequestPath',
			value: function getRequestPath() {
				var request = this.getRequest();
				if (request) {
					var requestPath = request.requestPath;
					var responseUrl = this.maybeExtractResponseUrlFromRequest(request);
					if (responseUrl) {
						requestPath = responseUrl;
					}
					if (UA.isIeOrEdge && this.httpMethod === RequestScreen.GET) {
						requestPath = new Uri(requestPath).removeUnique().toString();
					}
					return utils.getUrlPath(requestPath);
				}
				return null;
			}

			/**
    * Gets the request object.
    * @return {?Object}
    */

		}, {
			key: 'getRequest',
			value: function getRequest() {
				return this.request;
			}

			/**
    * Gets the request timeout.
    * @return {!number}
    */

		}, {
			key: 'getTimeout',
			value: function getTimeout() {
				return this.timeout;
			}

			/**
    * Checks if response succeeded. Any status code 2xx or 3xx is considered
    * valid.
    * @param {number} statusCode
    */

		}, {
			key: 'isValidResponseStatusCode',
			value: function isValidResponseStatusCode(statusCode) {
				return statusCode >= 200 && statusCode <= 399;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'load',
			value: function load(path) {
				var _this2 = this;

				var cache = this.getCache();
				if (core.isDefAndNotNull(cache)) {
					return CancellablePromise.resolve(cache);
				}
				var body = null;
				var httpMethod = this.httpMethod;
				var headers = new MultiMap();
				Object.keys(this.httpHeaders).forEach(function (header) {
					return headers.add(header, _this2.httpHeaders[header]);
				});
				if (globals.capturedFormElement) {
					body = new FormData(globals.capturedFormElement);
					this.maybeAppendSubmitButtonValue(body);
					httpMethod = RequestScreen.POST;
					if (UA.isIeOrEdge) {
						headers.add('If-None-Match', '"0"');
					}
				}
				var requestPath = this.formatLoadPath(path);
				return Ajax.request(requestPath, httpMethod, body, headers, null, this.timeout).then(function (xhr) {
					_this2.setRequest(xhr);
					_this2.assertValidResponseStatusCode(xhr.status);
					if (httpMethod === RequestScreen.GET && _this2.isCacheable()) {
						_this2.addCache(xhr.responseText);
					}
					xhr.requestPath = requestPath;
					return xhr.responseText;
				}).catch(function (reason) {
					switch (reason.message) {
						case errors.REQUEST_TIMEOUT:
							reason.timeout = true;
							break;
						case errors.REQUEST_ERROR:
							reason.requestError = true;
							break;
					}
					throw reason;
				});
			}

			/**
    * Adds aditional data to the body of the request in case a submit button
    * is captured during form submission.
    * @param {!FormData} body The FormData containing the request body.
    */

		}, {
			key: 'maybeAppendSubmitButtonValue',
			value: function maybeAppendSubmitButtonValue(body) {
				var button = globals.capturedFormButtonElement;
				if (button && button.name) {
					body.append(button.name, button.value);
				}
			}

			/**
    * The following method tries to extract the response url value by checking
    * the custom response header 'X-Request-URL' if proper value is not present
    * in XMLHttpRequest. The value of responseURL will be the final URL
    * obtained after any redirects. Internet Explorer, Edge and Safari <= 7
    * does not yet support the feature. For more information see:
    * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
    * https://xhr.spec.whatwg.org/#the-responseurl-attribute
    * @param {XMLHttpRequest} request
    * @return {?string} Response url best match.
    */

		}, {
			key: 'maybeExtractResponseUrlFromRequest',
			value: function maybeExtractResponseUrlFromRequest(request) {
				var responseUrl = request.responseURL;
				if (responseUrl) {
					return responseUrl;
				}
				return request.getResponseHeader(RequestScreen.X_REQUEST_URL_HEADER);
			}

			/**
    * Sets the http headers.
    * @param {?Object=} httpHeaders
    */

		}, {
			key: 'setHttpHeaders',
			value: function setHttpHeaders(httpHeaders) {
				this.httpHeaders = httpHeaders;
			}

			/**
    * Sets the http method.
    * @param {!string} httpMethod
    */

		}, {
			key: 'setHttpMethod',
			value: function setHttpMethod(httpMethod) {
				this.httpMethod = httpMethod.toLowerCase();
			}

			/**
    * Sets the request object.
    * @param {?Object} request
    */

		}, {
			key: 'setRequest',
			value: function setRequest(request) {
				this.request = request;
			}

			/**
    * Sets the request timeout in milliseconds.
    * @param {!number} timeout
    */

		}, {
			key: 'setTimeout',
			value: function setTimeout(timeout) {
				this.timeout = timeout;
			}
		}]);
		return RequestScreen;
	}(Screen);

	/**
  * Holds value for method get.
  * @type {string}
  * @default 'get'
  * @static
  */


	RequestScreen.GET = 'get';

	/**
  * Holds value for method post.
  * @type {string}
  * @default 'post'
  * @static
  */
	RequestScreen.POST = 'post';

	/**
  * Fallback http header to retrieve response request url.
  * @type {string}
  * @default 'X-Request-URL'
  * @static
  */
	RequestScreen.X_REQUEST_URL_HEADER = 'X-Request-URL';

	this['senna']['RequestScreen'] = RequestScreen;
}).call(this);
'use strict';

(function () {
	var core = this['sennaNamed']['metal']['core'];
	var dom = this['sennaNamed']['dom']['dom'];
	var globalEval = this['sennaNamed']['dom']['globalEval'];
	var globalEvalStyles = this['sennaNamed']['dom']['globalEvalStyles'];
	var CancellablePromise = this['senna']['Promise'];
	var globals = this['senna']['globals'];
	var RequestScreen = this['senna']['RequestScreen'];
	var Surface = this['senna']['Surface'];
	var UA = this['senna']['UA'];
	var Uri = this['senna']['Uri'];
	var utils = this['senna']['utils'];

	var HtmlScreen = function (_RequestScreen) {
		babelHelpers.inherits(HtmlScreen, _RequestScreen);

		/**
   * Screen class that perform a request and extracts surface contents from
   * the response content.
   * @constructor
   * @extends {RequestScreen}
   */
		function HtmlScreen() {
			babelHelpers.classCallCheck(this, HtmlScreen);

			/**
    * Holds the title selector. Relevant to extract the <code><title></code>
    * element from request fragments to use as the screen title.
    * @type {!string}
    * @default title
    * @protected
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (HtmlScreen.__proto__ || Object.getPrototypeOf(HtmlScreen)).call(this));

			_this.titleSelector = 'title';
			return _this;
		}

		/**
   * @inheritDoc
   */


		babelHelpers.createClass(HtmlScreen, [{
			key: 'activate',
			value: function activate() {
				babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'activate', this).call(this);
				this.releaseVirtualDocument();
				this.pendingStyles = null;
			}

			/**
    * Allocates virtual document for content. After allocated virtual document
    * can be accessed by <code>this.virtualDocument</code>.
    * @param {!string} htmlString
    */

		}, {
			key: 'allocateVirtualDocumentForContent',
			value: function allocateVirtualDocumentForContent(htmlString) {
				if (!this.virtualDocument) {
					this.virtualDocument = globals.document.createElement('html');
				}

				this.copyNodeAttributesFromContent_(htmlString, this.virtualDocument);

				this.virtualDocument.innerHTML = htmlString;
			}

			/**
    * Customizes logic to append styles into document. Relevant to when
    * tracking a style by id make sure to re-positions the new style in the
    * same dom order.
    * @param {Element} newStyle
    */

		}, {
			key: 'appendStyleIntoDocument_',
			value: function appendStyleIntoDocument_(newStyle) {
				var isTemporaryStyle = dom.match(newStyle, HtmlScreen.selectors.stylesTemporary);
				if (isTemporaryStyle) {
					this.pendingStyles.push(newStyle);
				}
				if (newStyle.id) {
					var styleInDoc = globals.document.getElementById(newStyle.id);
					if (styleInDoc) {
						styleInDoc.parentNode.insertBefore(newStyle, styleInDoc.nextSibling);
						return;
					}
				}
				globals.document.head.appendChild(newStyle);
			}

			/**
    * If body is used as surface forces the requested documents to have same id
    * of the initial page.
    */

		}, {
			key: 'assertSameBodyIdInVirtualDocument',
			value: function assertSameBodyIdInVirtualDocument() {
				var bodySurface = this.virtualDocument.querySelector('body');
				if (!globals.document.body.id) {
					globals.document.body.id = 'senna_surface_' + core.getUid();
				}
				if (bodySurface) {
					bodySurface.id = globals.document.body.id;
				}
			}

			/**
    * Copies attributes from the <html> tag of content to the given node.
    */

		}, {
			key: 'copyNodeAttributesFromContent_',
			value: function copyNodeAttributesFromContent_(content, node) {
				content = content.replace(/[<]\s*html/ig, '<senna');
				content = content.replace(/\/html\s*\>/ig, '/senna>');
				node.innerHTML = content;
				var placeholder = node.querySelector('senna');
				if (placeholder) {
					utils.clearNodeAttributes(node);
					utils.copyNodeAttributes(placeholder, node);
				}
			}

			/**
    * @Override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				this.disposePendingStyles();
				babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'disposeInternal', this).call(this);
			}

			/**
    * Disposes pending styles if screen get disposed prior to its loading.
    */

		}, {
			key: 'disposePendingStyles',
			value: function disposePendingStyles() {
				if (this.pendingStyles) {
					this.pendingStyles.forEach(function (style) {
						return dom.exitDocument(style);
					});
				}
			}

			/**
    * @Override
    */

		}, {
			key: 'evaluateScripts',
			value: function evaluateScripts(surfaces) {
				var _this2 = this;

				var evaluateTrackedScripts = this.evaluateTrackedResources_(globalEval.runScriptsInElement, HtmlScreen.selectors.scripts, HtmlScreen.selectors.scriptsTemporary, HtmlScreen.selectors.scriptsPermanent);

				return evaluateTrackedScripts.then(function () {
					return babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'evaluateScripts', _this2).call(_this2, surfaces);
				});
			}

			/**
    * @Override
    */

		}, {
			key: 'evaluateStyles',
			value: function evaluateStyles(surfaces) {
				var _this3 = this;

				this.pendingStyles = [];
				var evaluateTrackedStyles = this.evaluateTrackedResources_(globalEvalStyles.runStylesInElement, HtmlScreen.selectors.styles, HtmlScreen.selectors.stylesTemporary, HtmlScreen.selectors.stylesPermanent, this.appendStyleIntoDocument_.bind(this));

				return evaluateTrackedStyles.then(function () {
					return babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'evaluateStyles', _this3).call(_this3, surfaces);
				});
			}

			/**
    * Evaluates tracked resources inside incoming fragment and remove existing
    * temporary resources.
    * @param {?function()} appendFn Function to append the node into document.
    * @param {!string} selector Selector used to find resources to track.
    * @param {!string} selectorTemporary Selector used to find temporary
    *     resources to track.
    * @param {!string} selectorPermanent Selector used to find permanent
    *     resources to track.
    * @param {!function} opt_appendResourceFn Optional function used to
    *     evaluate fragment containing resources.
    * @return {CancellablePromise} Deferred that waits resources evaluation to
    *     complete.
    * @private
    */

		}, {
			key: 'evaluateTrackedResources_',
			value: function evaluateTrackedResources_(evaluatorFn, selector, selectorTemporary, selectorPermanent, opt_appendResourceFn) {
				var _this4 = this;

				var tracked = this.virtualQuerySelectorAll_(selector);
				var temporariesInDoc = this.querySelectorAll_(selectorTemporary);
				var permanentsInDoc = this.querySelectorAll_(selectorPermanent);

				// Adds permanent resources in document to cache.
				permanentsInDoc.forEach(function (resource) {
					var resourceKey = _this4.getResourceKey_(resource);
					if (resourceKey) {
						HtmlScreen.permanentResourcesInDoc[resourceKey] = true;
					}
				});

				var frag = dom.buildFragment();
				tracked.forEach(function (resource) {
					var resourceKey = _this4.getResourceKey_(resource);
					// Do not load permanent resources if already in document.
					if (!HtmlScreen.permanentResourcesInDoc[resourceKey]) {
						frag.appendChild(resource);
					}
					// If resource has key and is permanent add to cache.
					if (resourceKey && dom.match(resource, selectorPermanent)) {
						HtmlScreen.permanentResourcesInDoc[resourceKey] = true;
					}
				});

				return new CancellablePromise(function (resolve) {
					evaluatorFn(frag, function () {
						temporariesInDoc.forEach(function (resource) {
							return dom.exitDocument(resource);
						});
						resolve();
					}, opt_appendResourceFn);
				});
			}

			/**
    * @Override
    */

		}, {
			key: 'flip',
			value: function flip(surfaces) {
				var _this5 = this;

				return babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'flip', this).call(this, surfaces).then(function () {
					utils.clearNodeAttributes(document.documentElement);
					utils.copyNodeAttributes(_this5.virtualDocument, document.documentElement);
				});
			}

			/**
    * Extracts a key to identify the resource based on its attributes.
    * @param {Element} resource
    * @return {string} Extracted key based on resource attributes in order of
    *     preference: id, href, src.
    */

		}, {
			key: 'getResourceKey_',
			value: function getResourceKey_(resource) {
				return resource.id || resource.href || resource.src || '';
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'getSurfaceContent',
			value: function getSurfaceContent(surfaceId) {
				var surface = this.virtualDocument.querySelector('#' + surfaceId);
				if (surface) {
					var defaultChild = surface.querySelector('#' + surfaceId + '-' + Surface.DEFAULT);
					if (defaultChild) {
						return defaultChild.innerHTML;
					}
					return surface.innerHTML; // If default content not found, use surface content
				}
			}

			/**
    * Gets the title selector.
    * @return {!string}
    */

		}, {
			key: 'getTitleSelector',
			value: function getTitleSelector() {
				return this.titleSelector;
			}

			/**
    * @inheritDoc
    */

		}, {
			key: 'load',
			value: function load(path) {
				var _this6 = this;

				return babelHelpers.get(HtmlScreen.prototype.__proto__ || Object.getPrototypeOf(HtmlScreen.prototype), 'load', this).call(this, path).then(function (content) {
					_this6.allocateVirtualDocumentForContent(content);
					_this6.resolveTitleFromVirtualDocument();
					_this6.assertSameBodyIdInVirtualDocument();
					if (UA.isIe) {
						_this6.makeTemporaryStylesHrefsUnique_();
					}
					return content;
				});
			}

			/**
    * Queries temporary styles from virtual document, and makes them unique.
    * This is necessary for caching and load event firing issues specific to
    * IE11. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7940171/
    */

		}, {
			key: 'makeTemporaryStylesHrefsUnique_',
			value: function makeTemporaryStylesHrefsUnique_() {
				var _this7 = this;

				var temporariesInDoc = this.virtualQuerySelectorAll_(HtmlScreen.selectors.stylesTemporary);
				temporariesInDoc.forEach(function (style) {
					return _this7.replaceStyleAndMakeUnique_(style);
				});
			}

			/**
    * Creates a new element from given, copies attributes, mutates href to be
    * unique to prevent caching and more than one load/error event from firing.
    */

		}, {
			key: 'replaceStyleAndMakeUnique_',
			value: function replaceStyleAndMakeUnique_(style) {
				if (style.href) {
					var newStyle = globals.document.createElement(style.tagName);
					style.href = new Uri(style.href).makeUnique().toString();
					utils.copyNodeAttributes(style, newStyle);
					style.parentNode.replaceChild(newStyle, style);
					style.disabled = true;
				}
			}

			/**
    * Queries elements from virtual document and returns an array of elements.
    * @param {!string} selector
    * @return {array.<Element>}
    */

		}, {
			key: 'virtualQuerySelectorAll_',
			value: function virtualQuerySelectorAll_(selector) {
				return Array.prototype.slice.call(this.virtualDocument.querySelectorAll(selector));
			}

			/**
    * Queries elements from document and returns an array of elements.
    * @param {!string} selector
    * @return {array.<Element>}
    */

		}, {
			key: 'querySelectorAll_',
			value: function querySelectorAll_(selector) {
				return Array.prototype.slice.call(globals.document.querySelectorAll(selector));
			}

			/**
    * Releases virtual document allocated for content.
    */

		}, {
			key: 'releaseVirtualDocument',
			value: function releaseVirtualDocument() {
				this.virtualDocument = null;
			}

			/**
    * Resolves title from allocated virtual document.
    */

		}, {
			key: 'resolveTitleFromVirtualDocument',
			value: function resolveTitleFromVirtualDocument() {
				var title = this.virtualDocument.querySelector(this.titleSelector);
				if (title) {
					this.setTitle(title.textContent.trim());
				}
			}

			/**
    * Sets the title selector.
    * @param {!string} titleSelector
    */

		}, {
			key: 'setTitleSelector',
			value: function setTitleSelector(titleSelector) {
				this.titleSelector = titleSelector;
			}
		}]);
		return HtmlScreen;
	}(RequestScreen);

	/**
  * Helper selectors for tracking resources.
  * @type {object}
  * @protected
  * @static
  */


	HtmlScreen.selectors = {
		scripts: 'script[data-senna-track]',
		scriptsPermanent: 'script[data-senna-track="permanent"]',
		scriptsTemporary: 'script[data-senna-track="temporary"]',
		styles: 'style[data-senna-track],link[data-senna-track]',
		stylesPermanent: 'style[data-senna-track="permanent"],link[data-senna-track="permanent"]',
		stylesTemporary: 'style[data-senna-track="temporary"],link[data-senna-track="temporary"]'
	};

	/**
  * Caches permanent resource keys.
  * @type {object}
  * @protected
  * @static
  */
	HtmlScreen.permanentResourcesInDoc = {};

	this['senna']['HtmlScreen'] = HtmlScreen;
}).call(this);
'use strict';

(function () {
  var utils = this['senna']['utils'];
  var App = this['senna']['App'];
  var HtmlScreen = this['senna']['HtmlScreen'];
  var RequestScreen = this['senna']['RequestScreen'];
  var Route = this['senna']['Route'];
  var Screen = this['senna']['Screen'];
  this['senna']['senna'] = App;
  this['sennaNamed']['senna'] = this['sennaNamed']['senna'] || {};
  this['sennaNamed']['senna']['utils'] = utils;
  this['sennaNamed']['senna']['App'] = App;
  this['sennaNamed']['senna']['HtmlScreen'] = HtmlScreen;
  this['sennaNamed']['senna']['Route'] = Route;
  this['sennaNamed']['senna']['RequestScreen'] = RequestScreen;
  this['sennaNamed']['senna']['Screen'] = Screen;
}).call(this);
'use strict';

(function () {
	this['senna']['dataAttributes'] = {
		basePath: 'data-senna-base-path',
		linkSelector: 'data-senna-link-selector',
		loadingCssClass: 'data-senna-loading-css-class',
		senna: 'data-senna',
		dispatch: 'data-senna-dispatch',
		surface: 'data-senna-surface',
		updateScrollPosition: 'data-senna-update-scroll-position'
	};
}).call(this);
'use strict';

(function () {
	var core = this['sennaNamed']['metal']['core'];
	var object = this['sennaNamed']['metal']['object'];
	var Disposable = this['sennaNamed']['metal']['Disposable'];
	var dataAttributes = this['senna']['dataAttributes'];
	var globals = this['senna']['globals'];
	var App = this['senna']['App'];
	var HtmlScreen = this['senna']['HtmlScreen'];
	var Route = this['senna']['Route'];

	var AppDataAttributeHandler = function (_Disposable) {
		babelHelpers.inherits(AppDataAttributeHandler, _Disposable);

		/**
   * Initilizes App, register surfaces and routes from data attributes.
   * @constructor
   */
		function AppDataAttributeHandler() {
			babelHelpers.classCallCheck(this, AppDataAttributeHandler);

			/**
    * Holds the app reference initialized by data attributes.
    * @type {App}
    * @default null
    */
			var _this = babelHelpers.possibleConstructorReturn(this, (AppDataAttributeHandler.__proto__ || Object.getPrototypeOf(AppDataAttributeHandler)).call(this));

			_this.app = null;

			/**
    * Holds the base element to search initialization data attributes. This
    * element is the container used to enable initialization based on the
    * presence of `data-senna` attribute.
    * @type {Element}
    * @default null
    */
			_this.baseElement = null;
			return _this;
		}

		/**
   * Inits application based on information scanned from document.
   */


		babelHelpers.createClass(AppDataAttributeHandler, [{
			key: 'handle',
			value: function handle() {
				if (!core.isElement(this.baseElement)) {
					throw new Error('Senna data attribute handler base element ' + 'not set or invalid, try setting a valid element that ' + 'contains a `data-senna` attribute.');
				}

				if (!this.baseElement.hasAttribute(dataAttributes.senna)) {
					void 0;
					return;
				}

				if (this.app) {
					throw new Error('Senna app was already initialized.');
				}

				void 0;

				this.app = new App();
				this.maybeAddRoutes_();
				this.maybeAddSurfaces_();
				this.maybeSetBasePath_();
				this.maybeSetLinkSelector_();
				this.maybeSetLoadingCssClass_();
				this.maybeSetUpdateScrollPosition_();
				this.maybeDispatch_();
			}

			/**
    * Disposes of this instance's object references.
    * @override
    */

		}, {
			key: 'disposeInternal',
			value: function disposeInternal() {
				if (this.app) {
					this.app.dispose();
				}
			}

			/**
    * Gets the app reference.
    * @return {App}
    */

		}, {
			key: 'getApp',
			value: function getApp() {
				return this.app;
			}

			/**
    * Gets the base element.
    * @return {Element} baseElement
    */

		}, {
			key: 'getBaseElement',
			value: function getBaseElement() {
				return this.baseElement;
			}

			/**
    * Maybe adds app routes from link elements that are `senna-route`.
    */

		}, {
			key: 'maybeAddRoutes_',
			value: function maybeAddRoutes_() {
				var _this2 = this;

				var routesSelector = 'link[rel="senna-route"]';
				this.querySelectorAllAsArray_(routesSelector).forEach(function (link) {
					return _this2.maybeParseLinkRoute_(link);
				});
				if (!this.app.hasRoutes()) {
					this.app.addRoutes(new Route(/.*/, HtmlScreen));
					void 0;
				}
			}

			/**
    * Maybe adds app surfaces by scanning `data-senna-surface` data attribute.
    */

		}, {
			key: 'maybeAddSurfaces_',
			value: function maybeAddSurfaces_() {
				var _this3 = this;

				var surfacesSelector = '[' + dataAttributes.surface + ']';
				this.querySelectorAllAsArray_(surfacesSelector).forEach(function (surfaceElement) {
					_this3.updateElementIdIfSpecialSurface_(surfaceElement);
					_this3.app.addSurfaces(surfaceElement.id);
				});
			}

			/**
    * Dispatches app navigation to the current path when initializes.
    */

		}, {
			key: 'maybeDispatch_',
			value: function maybeDispatch_() {
				if (this.baseElement.hasAttribute(dataAttributes.dispatch)) {
					this.app.dispatch();
				}
			}

			/**
    * Adds app route by parsing valid link elements. A valid link element is of
    * the kind `rel="senna-route"`.
    * @param {Element} link
    */

		}, {
			key: 'maybeParseLinkRoute_',
			value: function maybeParseLinkRoute_(link) {
				var route = new Route(this.maybeParseLinkRoutePath_(link), this.maybeParseLinkRouteHandler_(link));
				this.app.addRoutes(route);
				void 0;
			}

			/**
    * Maybe parse link route handler.
    * @param {Element} link
    * @return {?string}
    */

		}, {
			key: 'maybeParseLinkRouteHandler_',
			value: function maybeParseLinkRouteHandler_(link) {
				var handler = link.getAttribute('type');
				if (core.isDefAndNotNull(handler)) {
					handler = object.getObjectByName(handler);
				}
				return handler;
			}

			/**
    * Maybe parse link route path.
    * @param {Element} link
    * @return {?string}
    */

		}, {
			key: 'maybeParseLinkRoutePath_',
			value: function maybeParseLinkRoutePath_(link) {
				var path = link.getAttribute('href');
				if (core.isDefAndNotNull(path)) {
					if (path.indexOf('regex:') === 0) {
						path = new RegExp(path.substring(6));
					}
				}
				return path;
			}

			/**
    * Maybe sets app base path from `data-senna-base-path` data attribute.
    */

		}, {
			key: 'maybeSetBasePath_',
			value: function maybeSetBasePath_() {
				var basePath = this.baseElement.getAttribute(dataAttributes.basePath);
				if (core.isDefAndNotNull(basePath)) {
					this.app.setBasePath(basePath);
					void 0;
				}
			}

			/**
    * Maybe sets app link selector from `data-senna-link-selector` data
    * attribute.
    */

		}, {
			key: 'maybeSetLinkSelector_',
			value: function maybeSetLinkSelector_() {
				var linkSelector = this.baseElement.getAttribute(dataAttributes.linkSelector);
				if (core.isDefAndNotNull(linkSelector)) {
					this.app.setLinkSelector(linkSelector);
					void 0;
				}
			}

			/**
    * Maybe sets app link loading css class from `data-senna-loading-css-class`
    * data attribute.
    */

		}, {
			key: 'maybeSetLoadingCssClass_',
			value: function maybeSetLoadingCssClass_() {
				var loadingCssClass = this.baseElement.getAttribute(dataAttributes.loadingCssClass);
				if (core.isDefAndNotNull(loadingCssClass)) {
					this.app.setLoadingCssClass(loadingCssClass);
					void 0;
				}
			}

			/**
    * Maybe sets app update scroll position from
    * `data-senna-update-scroll-position` data attribute.
    */

		}, {
			key: 'maybeSetUpdateScrollPosition_',
			value: function maybeSetUpdateScrollPosition_() {
				var updateScrollPosition = this.baseElement.getAttribute(dataAttributes.updateScrollPosition);
				if (core.isDefAndNotNull(updateScrollPosition)) {
					if (updateScrollPosition === 'false') {
						this.app.setUpdateScrollPosition(false);
					} else {
						this.app.setUpdateScrollPosition(true);
					}
					void 0;
				}
			}

			/**
    * Queries elements from document and returns an array of elements.
    * @param {!string} selector
    * @return {array.<Element>}
    */

		}, {
			key: 'querySelectorAllAsArray_',
			value: function querySelectorAllAsArray_(selector) {
				return Array.prototype.slice.call(globals.document.querySelectorAll(selector));
			}

			/**
    * Updates element id if handled as special surface element. Some surfaces
    * are slightly different from others, like when threating <code>body</code>
    * as surface.
    * @param {Element} element
    */

		}, {
			key: 'updateElementIdIfSpecialSurface_',
			value: function updateElementIdIfSpecialSurface_(element) {
				if (!element.id && element === globals.document.body) {
					element.id = 'senna_surface_' + core.getUid();
				}
			}

			/**
    * Sets the base element.
    * @param {Element} baseElement
    */

		}, {
			key: 'setBaseElement',
			value: function setBaseElement(baseElement) {
				this.baseElement = baseElement;
			}
		}]);
		return AppDataAttributeHandler;
	}(Disposable);

	this['senna']['AppDataAttributeHandler'] = AppDataAttributeHandler;
}).call(this);
'use strict';

(function () {
  var globals = this['senna']['globals'];
  var AppDataAttributeHandler = this['senna']['AppDataAttributeHandler'];

  /**
   * Data attribute handler.
   * @type {AppDataAttributeHandler}
   */

  var dataAttributeHandler = new AppDataAttributeHandler();

  globals.document.addEventListener('DOMContentLoaded', function () {
    dataAttributeHandler.setBaseElement(globals.document.body);
    dataAttributeHandler.handle();
  });

  this['senna']['dataAttributeHandler'] = dataAttributeHandler;
}).call(this);
}).call(this);
//# sourceMappingURL=senna.js.map
