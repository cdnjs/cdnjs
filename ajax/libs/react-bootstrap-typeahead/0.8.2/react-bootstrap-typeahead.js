(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTypeahead"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrapTypeahead"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Typeahead = __webpack_require__(28);

	module.exports = Typeahead;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * KeyCode
	 *
	 * Map of common (non-printable) keycodes for the `keydown` and `keyup` events.
	 * Note that `keypress` handles things differently and may not return the same
	 * values.
	 */
	module.exports = {
	  BACKSPACE: 8,
	  TAB: 9,
	  RETURN: 13,
	  ESC: 27,
	  SPACE: 32,
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(59);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(16);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	var baseKeys = overArg(nativeKeys, Object);

	module.exports = baseKeys;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(4);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(4);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(4);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(4);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Creates a function that invokes `func` with its first argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(53),
	    isFunction = __webpack_require__(19),
	    isLength = __webpack_require__(66);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(43);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent,
	 *  else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(38),
	    baseFlatten = __webpack_require__(41),
	    basePick = __webpack_require__(45),
	    baseRest = __webpack_require__(48),
	    toKey = __webpack_require__(58);

	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = baseRest(function(object, props) {
	  return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
	});

	module.exports = pick;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * A higher-order-component for handling onClickOutside for React components.
	 */
	(function(root) {
	  "use strict";

	  // administrative
	  var registeredComponents = [];
	  var handlers = [];
	  var IGNORE_CLASS = 'ignore-react-onclickoutside';
	  var DEFAULT_EVENTS = ['mousedown', 'touchstart'];

	  /**
	   * Check whether some DOM node is our Component's node.
	   */
	  var isNodeFound = function(current, componentNode, ignoreClass) {
	    if (current === componentNode) {
	      return true;
	    }
	    // SVG <use/> elements do not technically reside in the rendered DOM, so
	    // they do not have classList directly, but they offer a link to their
	    // corresponding element, which can have classList. This extra check is for
	    // that case.
	    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
	    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
	    if (current.correspondingElement) {
	      return current.correspondingElement.classList.contains(ignoreClass);
	    }
	    return current.classList.contains(ignoreClass);
	  };

	  /**
	   * Generate the event handler that checks whether a clicked DOM node
	   * is inside of, or lives outside of, our Component's node tree.
	   */
	  var generateOutsideCheck = function(componentNode, componentInstance, ignoreClass, preventDefault, stopPropagation) {
	    return function(evt) {
	      if (preventDefault) {
	        evt.preventDefault();
	      }
	      if (stopPropagation) {
	        evt.stopPropagation();
	      }
	      var current = evt.target;
	      var found = false;
	      // If source=local then this event came from "somewhere"
	      // inside and should be ignored. We could handle this with
	      // a layered approach, too, but that requires going back to
	      // thinking in terms of Dom node nesting, running counter
	      // to React's "you shouldn't care about the DOM" philosophy.
	      while(current.parentNode) {
	        found = isNodeFound(current, componentNode, ignoreClass);
	        if(found) return;
	        current = current.parentNode;
	      }
	      // If element is in a detached DOM, consider it "not clicked
	      // outside", as it cannot be known whether it was outside.
	      if(current !== document) return;
	      componentInstance.handleClickOutside.bind(componentInstance, evt)();
	    }
	  };


	  /**
	   * This function generates the HOC function that you'll use
	   * in order to impart onOutsideClick listening to an
	   * arbitrary component.
	   */
	  function setupHOC(root, React, ReactDOM) {

	    // The actual Component-wrapping HOC:
	    return function(Component) {
	      var wrapComponentWithOnClickOutsideHandling = React.createClass({
	        statics: {
	          /**
	           * Access the wrapped Component's class.
	           */
	          getClass: function() {
	            if (Component.getClass) {
	              return Component.getClass();
	            }
	            return Component;
	          }
	        },

	        /**
	         * Access the wrapped Component's instance.
	         */
	        getInstance: function() {
	          return this.refs.instance;
	        },

	        // this is given meaning in componentDidMount
	        __outsideClickHandler: function(evt) {},

	        /**
	         * Add click listeners to the current document,
	         * linked to this component's state.
	         */
	        componentDidMount: function() {
	          var instance = this.getInstance();

	          if(typeof instance.handleClickOutside !== "function") {
	            throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");
	          }

	          var fn = this.__outsideClickHandler = generateOutsideCheck(
	            ReactDOM.findDOMNode(instance),
	            instance,
	            this.props.outsideClickIgnoreClass || IGNORE_CLASS,
	            this.props.preventDefault || false,
	            this.props.stopPropagation || false
	          );

	          var pos = registeredComponents.length;
	          registeredComponents.push(this);
	          handlers[pos] = fn;

	          // If there is a truthy disableOnClickOutside property for this
	          // component, don't immediately start listening for outside events.
	          if (!this.props.disableOnClickOutside) {
	            this.enableOnClickOutside();
	          }
	        },

	        /**
	        * Track for disableOnClickOutside props changes and enable/disable click outside
	        */
	        componentWillReceiveProps: function(nextProps) {
	          if (this.props.disableOnClickOutside && !nextProps.disableOnClickOutside) {
	            this.enableOnClickOutside();
	          } else if (!this.props.disableOnClickOutside && nextProps.disableOnClickOutside) {
	            this.disableOnClickOutside();
	          }
	        },

	        /**
	         * Remove the document's event listeners
	         */
	        componentWillUnmount: function() {
	          this.disableOnClickOutside();
	          this.__outsideClickHandler = false;
	          var pos = registeredComponents.indexOf(this);
	          if( pos>-1) {
	            // clean up so we don't leak memory
	            if (handlers[pos]) { handlers.splice(pos, 1); }
	            registeredComponents.splice(pos, 1);
	          }
	        },

	        /**
	         * Can be called to explicitly enable event listening
	         * for clicks and touches outside of this element.
	         */
	        enableOnClickOutside: function() {
	          var fn = this.__outsideClickHandler;
	          if (typeof document !== "undefined") {
	            var events = this.props.eventTypes || DEFAULT_EVENTS;
	            if (!events.forEach) { events = [events] };
	            events.forEach(function (eventName) {
	              document.addEventListener(eventName, fn);
	            });
	          }
	        },

	        /**
	         * Can be called to explicitly disable event listening
	         * for clicks and touches outside of this element.
	         */
	        disableOnClickOutside: function() {
	          var fn = this.__outsideClickHandler;
	          if (typeof document !== "undefined") {
	            var events = this.props.eventTypes || DEFAULT_EVENTS;
	            if (!events.forEach) { events = [events] };
	            events.forEach(function (eventName) {
	              document.removeEventListener(eventName, fn);
	            });
	          }
	        },

	        /**
	         * Pass-through render
	         */
	        render: function() {
	          var passedProps = this.props;
	          var props = { ref: 'instance' };
	          Object.keys(this.props).forEach(function(key) {
	            props[key] = passedProps[key];
	          });
	          return React.createElement(Component,  props);
	        }
	      });

	      // Add display name for React devtools
	      (function bindWrappedComponentName(c, wrapper) {
	        var componentName = c.displayName || c.name || 'Component'
	        wrapper.displayName = 'OnClickOutside(' + componentName + ')';
	      }(Component, wrapComponentWithOnClickOutsideHandling));

	      return wrapComponentWithOnClickOutsideHandling;
	    };
	  }

	  /**
	   * This function sets up the library in ways that
	   * work with the various modulde loading solutions
	   * used in JavaScript land today.
	   */
	  function setupBinding(root, factory) {
	    if (true) {
	      // AMD. Register as an anonymous module.
	      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(React, ReactDom) {
	        return factory(root, React, ReactDom);
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	      // Node. Note that this does not work with strict
	      // CommonJS, but only CommonJS-like environments
	      // that support module.exports
	      module.exports = factory(root, require('react'), require('react-dom'));
	    } else {
	      // Browser globals (root is window)
	      root.onClickOutside = factory(root, React, ReactDOM);
	    }
	  }

	  // Make it all happen
	  setupBinding(root, setupHOC);

	}(this));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = function Menu(props) {
	  return _react2.default.createElement(
	    'ul',
	    _extends({}, props, {
	      className: (0, _classnames2.default)('dropdown-menu', props.className) }),
	    props.children
	  );
	};

	exports.default = Menu;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _noop2 = __webpack_require__(21);

	var _noop3 = _interopRequireDefault(_noop2);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MenuItem = _react2.default.createClass({
	  displayName: 'MenuItem',

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onClick: _noop3.default
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.active) {
	      // This ensures that if the menu items exceed the max-height of the menu,
	      // the menu will scroll up or down as the user hits the arrow keys.
	      (0, _reactDom.findDOMNode)(this).firstChild.focus();
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var children = _props.children;
	    var className = _props.className;
	    var disabled = _props.disabled;


	    return _react2.default.createElement(
	      'li',
	      {
	        className: (0, _classnames2.default)({
	          'active': active,
	          'disabled': disabled
	        }, className) },
	      _react2.default.createElement(
	        'a',
	        { href: '#', onClick: this._handleClick },
	        children
	      )
	    );
	  },
	  _handleClick: function _handleClick(e) {
	    var _props2 = this.props;
	    var disabled = _props2.disabled;
	    var onClick = _props2.onClick;


	    e.preventDefault();
	    !disabled && onClick(e);
	  }
	});

	exports.default = MenuItem;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(5);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _keyCode = __webpack_require__(3);

	var _keyCode2 = _interopRequireDefault(_keyCode);

	var _reactOnclickoutside = __webpack_require__(23);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Token
	 *
	 * Individual token component, generally displayed within the TokenizerInput
	 * component, but can also be rendered on its own.
	 */
	var Token = _react2.default.createClass({
	  displayName: 'Token',

	  propTypes: {
	    /**
	     * Handler for removing/deleting the token. If not defined, the token will
	     * be rendered in a read-only state.
	     */
	    onRemove: _react.PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return {
	      selected: false
	    };
	  },
	  render: function render() {
	    return this.props.onRemove && !this.props.disabled ? this._renderRemoveableToken() : this._renderToken();
	  },
	  _renderRemoveableToken: function _renderRemoveableToken() {
	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames2.default)('token', 'token-removeable', {
	          'token-selected': this.state.selected
	        }, this.props.className),
	        onBlur: this._handleBlur,
	        onClick: this._handleSelect,
	        onFocus: this._handleSelect,
	        onKeyDown: this._handleKeyDown,
	        tabIndex: 0 },
	      this.props.children,
	      _react2.default.createElement(
	        'span',
	        {
	          className: 'close-button',
	          onClick: this._handleRemove,
	          role: 'button' },
	        '×'
	      )
	    );
	  },
	  _renderToken: function _renderToken() {
	    var _props = this.props;
	    var className = _props.className;
	    var disabled = _props.disabled;
	    var href = _props.href;

	    var classnames = (0, _classnames2.default)('token', className);

	    if (href) {
	      return _react2.default.createElement(
	        'a',
	        { className: classnames, disabled: disabled, href: href },
	        this.props.children
	      );
	    }

	    return _react2.default.createElement(
	      'div',
	      { className: classnames, disabled: disabled },
	      this.props.children
	    );
	  },
	  _handleBlur: function _handleBlur(e) {
	    (0, _reactDom.findDOMNode)(this).blur();
	    this.setState({ selected: false });
	  },
	  _handleKeyDown: function _handleKeyDown(e) {
	    switch (e.keyCode) {
	      case _keyCode2.default.BACKSPACE:
	        if (this.state.selected) {
	          // Prevent backspace keypress from triggering the browser "back"
	          // action.
	          e.preventDefault();
	          this._handleRemove();
	        }
	        break;
	    }
	  },


	  /**
	   * From `onClickOutside` mixin.
	   */
	  handleClickOutside: function handleClickOutside(e) {
	    this._handleBlur();
	  },
	  _handleRemove: function _handleRemove(e) {
	    this.props.onRemove && this.props.onRemove();
	  },
	  _handleSelect: function _handleSelect(e) {
	    e.stopPropagation();
	    this.setState({ selected: true });
	  }
	});

	exports.default = (0, _reactOnclickoutside2.default)(Token);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _reactInputAutosize = __webpack_require__(74);

	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Token = __webpack_require__(26);

	var _Token2 = _interopRequireDefault(_Token);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactDom = __webpack_require__(5);

	var _keyCode = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * TokenizerInput
	 *
	 * Accepts multiple selections from a Typeahead component and renders them as
	 * tokens within an input.
	 */
	var TokenizerInput = _react2.default.createClass({
	  displayName: 'TokenizerInput',

	  propTypes: {
	    disabled: _react.PropTypes.bool,
	    labelKey: _react.PropTypes.string,
	    placeholder: _react.PropTypes.string,
	    selected: _react.PropTypes.array
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isFocused: false
	    };
	  },
	  render: function render() {
	    var _props = this.props;
	    var disabled = _props.disabled;
	    var placeholder = _props.placeholder;
	    var selected = _props.selected;
	    var text = _props.text;


	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames2.default)('bootstrap-tokenizer', 'clearfix', 'form-control', { 'focus': this.state.isFocused }),
	        disabled: disabled,
	        onClick: this._handleInputFocus,
	        onFocus: this._handleInputFocus,
	        style: {
	          cursor: 'text',
	          height: 'auto'
	        },
	        tabIndex: -1 },
	      selected.map(this._renderToken),
	      _react2.default.createElement(_reactInputAutosize2.default, {
	        className: 'bootstrap-tokenizer-input',
	        disabled: disabled,
	        inputStyle: {
	          backgroundColor: 'inherit',
	          border: 0,
	          boxShadow: 'none',
	          cursor: 'inherit',
	          outline: 'none',
	          padding: 0
	        },
	        onBlur: this._handleBlur,
	        onChange: this._handleChange,
	        onFocus: this.props.onFocus,
	        onKeyDown: this._handleKeydown,
	        placeholder: selected.length ? null : placeholder,
	        ref: 'input',
	        type: 'text',
	        value: text
	      })
	    );
	  },
	  blur: function blur() {
	    this.refs.input.blur();
	  },
	  focus: function focus() {
	    this._handleInputFocus();
	  },
	  _renderToken: function _renderToken(option, idx) {
	    var _props2 = this.props;
	    var disabled = _props2.disabled;
	    var labelKey = _props2.labelKey;
	    var _onRemove = _props2.onRemove;


	    return _react2.default.createElement(
	      _Token2.default,
	      {
	        disabled: disabled,
	        key: idx,
	        onRemove: function onRemove() {
	          return _onRemove(option);
	        } },
	      option[labelKey]
	    );
	  },
	  _handleBlur: function _handleBlur(e) {
	    this.setState({ isFocused: false });
	    this.props.onBlur(e);
	  },
	  _handleChange: function _handleChange(e) {
	    this.props.onChange(e.target.value);
	  },
	  _handleKeydown: function _handleKeydown(e) {
	    switch (e.keyCode) {
	      case _keyCode.BACKSPACE:
	        var inputNode = (0, _reactDom.findDOMNode)(this.refs.input);
	        if (inputNode && inputNode.contains(document.activeElement) && !this.props.text) {
	          // If the input is selected and there is no text, select the last
	          // token when the user hits backspace.
	          var sibling = inputNode.previousSibling;
	          sibling && sibling.focus();
	        }
	        break;
	    }

	    this.props.onKeyDown(e);
	  },
	  _handleInputFocus: function _handleInputFocus(e) {
	    if (this.props.disabled) {
	      e.target.blur();
	      return;
	    }

	    // If the user clicks anywhere inside the tokenizer besides a token,
	    // focus the input.
	    this.refs.input.focus();
	    this.setState({ isFocused: true });
	  }
	});

	exports.default = TokenizerInput;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pick2 = __webpack_require__(22);

	var _pick3 = _interopRequireDefault(_pick2);

	var _noop2 = __webpack_require__(21);

	var _noop3 = _interopRequireDefault(_noop2);

	var _isEqual2 = __webpack_require__(18);

	var _isEqual3 = _interopRequireDefault(_isEqual2);

	var _isEmpty2 = __webpack_require__(65);

	var _isEmpty3 = _interopRequireDefault(_isEmpty2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _TokenizerInput = __webpack_require__(27);

	var _TokenizerInput2 = _interopRequireDefault(_TokenizerInput);

	var _TypeaheadInput = __webpack_require__(29);

	var _TypeaheadInput2 = _interopRequireDefault(_TypeaheadInput);

	var _TypeaheadMenu = __webpack_require__(30);

	var _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);

	var _getFilteredOptions = __webpack_require__(31);

	var _getFilteredOptions2 = _interopRequireDefault(_getFilteredOptions);

	var _reactOnclickoutside = __webpack_require__(23);

	var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

	var _keyCode = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	/**
	 * Typeahead
	 */
	var Typeahead = _react2.default.createClass({
	  displayName: 'Typeahead',

	  propTypes: {
	    /**
	     * Specify menu alignment. The default value is `justify`, which makes the
	     * menu as wide as the input and truncates long values. Specifying `left`
	     * or `right` will align the menu to that side and the width will be
	     * determined by the length of menu item values.
	     */
	    align: _react.PropTypes.oneOf(['justify', 'left', 'right']),
	    /**
	     * Allows the creation of new selections on the fly. Note that any new items
	     * will be added to the list of selections, but not the list of original
	     * options unless handled as such by `Typeahead`'s parent.
	     */
	    allowNew: _react.PropTypes.bool,
	    /**
	     * Specify any pre-selected options. Use only if you want the component to
	     * be uncontrolled.
	     */
	    defaultSelected: _react.PropTypes.array,
	    /**
	     * Whether to disable the input. Will also disable selections when
	     * `multiple={true}`.
	     */
	    disabled: _react.PropTypes.bool,
	    /**
	     * Message to display in the menu if there are no valid results.
	     */
	    emptyLabel: _react.PropTypes.string,
	    /**
	     * Specify which option key to use for display. By default, the selector
	     * will use the `label` key.
	     */
	    labelKey: _react.PropTypes.string,
	    /**
	     * Maximum height of the dropdown menu, in px.
	     */
	    maxHeight: _react.PropTypes.number,
	    /**
	     * Number of input characters that must be entered before showing results.
	     */
	    minLength: _react.PropTypes.number,
	    /**
	     * Whether or not multiple selections are allowed.
	     */
	    multiple: _react.PropTypes.bool,
	    /**
	     * Provides the ability to specify a prefix before the user-entered text to
	     * indicate that the selection will be new. No-op unless `allowNew={true}`.
	     */
	    newSelectionPrefix: _react.PropTypes.string,
	    /**
	     * Callback fired when the input is blurred. Receives an event.
	     */
	    onBlur: _react.PropTypes.func,
	    /**
	     * Callback fired whenever items are added or removed. Receives an array of
	     * the selected options.
	     */
	    onChange: _react.PropTypes.func,
	    /**
	     * Callback for handling changes to the user-input text.
	     */
	    onInputChange: _react.PropTypes.func,
	    /**
	     * Full set of options, including pre-selected options.
	     */
	    options: _react.PropTypes.array.isRequired,
	    /**
	     * For large option sets, initially display a subset of results for improved
	     * performance. If users scroll to the end, the last item will be a link to
	     * display the next set of results. Value represents the number of results
	     * to display. `0` will display all results.
	     */
	    paginateResults: _react.PropTypes.number,
	    /**
	     * Prompt displayed when large data sets are paginated.
	     */
	    paginationText: _react.PropTypes.string,
	    /**
	     * Placeholder text for the input.
	     */
	    placeholder: _react.PropTypes.string,
	    /**
	     * Provides a hook for customized rendering of menu item contents.
	     */
	    renderMenuItemChildren: _react.PropTypes.func,
	    /**
	     * The selected option(s) displayed in the input. Use this prop if you want
	     * to control the component via its parent.
	     */
	    selected: _react.PropTypes.array
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      allowNew: false,
	      defaultSelected: [],
	      labelKey: 'label',
	      onBlur: _noop3.default,
	      onChange: _noop3.default,
	      onInputChange: _noop3.default,
	      minLength: 0,
	      multiple: false,
	      selected: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    var defaultSelected = this.props.defaultSelected;


	    var selected = this.props.selected.slice();
	    if (!(0, _isEmpty3.default)(defaultSelected)) {
	      selected = defaultSelected;
	    }

	    return {
	      activeIndex: -1,
	      selected: selected,
	      showMenu: false,
	      text: ''
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var multiple = nextProps.multiple;
	    var selected = nextProps.selected;


	    if (!(0, _isEqual3.default)(selected, this.props.selected)) {
	      // If new selections are passed in via props, treat the component as a
	      // controlled input.
	      this.setState({ selected: selected });
	    }

	    if (multiple !== this.props.multiple) {
	      this.setState({ text: '' });
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var options = _props.options;

	    var props = _objectWithoutProperties(_props, ['options']);

	    var _state = this.state;
	    var selected = _state.selected;
	    var text = _state.text;

	    var filteredOptions = (0, _getFilteredOptions2.default)(options, text, selected, props);

	    return _react2.default.createElement(
	      'div',
	      {
	        className: 'bootstrap-typeahead open',
	        style: { position: 'relative' } },
	      this._renderInput(filteredOptions),
	      this._renderMenu(filteredOptions)
	    );
	  },
	  blur: function blur() {
	    this.refs.input.blur();
	  },


	  /**
	   * Public method to allow external clearing of the input. Clears both text
	   * and selection(s).
	   */
	  clear: function clear() {
	    var _getInitialState = this.getInitialState();

	    var activeIndex = _getInitialState.activeIndex;
	    var showMenu = _getInitialState.showMenu;

	    var selected = [];
	    var text = '';

	    this.setState({
	      activeIndex: activeIndex,
	      selected: selected,
	      showMenu: showMenu,
	      text: text
	    });

	    this.props.onChange(selected);
	    this.props.onInputChange(text);
	  },
	  focus: function focus() {
	    this.refs.input.focus();
	  },
	  _renderInput: function _renderInput(filteredOptions) {
	    var _this = this;

	    var _props2 = this.props;
	    var labelKey = _props2.labelKey;
	    var multiple = _props2.multiple;
	    var _state2 = this.state;
	    var activeIndex = _state2.activeIndex;
	    var selected = _state2.selected;
	    var text = _state2.text;

	    var Input = multiple ? _TokenizerInput2.default : _TypeaheadInput2.default;
	    var inputProps = (0, _pick3.default)(this.props, ['disabled', 'placeholder']);

	    return _react2.default.createElement(Input, _extends({}, inputProps, {
	      activeIndex: activeIndex,
	      labelKey: labelKey,
	      onAdd: this._handleAddOption,
	      onBlur: this._handleBlur,
	      onChange: this._handleTextChange,
	      onFocus: this._handleFocus,
	      onKeyDown: function onKeyDown(e) {
	        return _this._handleKeydown(filteredOptions, e);
	      },
	      onRemove: this._handleRemoveOption,
	      options: filteredOptions,
	      ref: 'input',
	      selected: selected.slice(),
	      text: text
	    }));
	  },
	  _renderMenu: function _renderMenu(filteredOptions) {
	    var _props3 = this.props;
	    var labelKey = _props3.labelKey;
	    var minLength = _props3.minLength;
	    var _state3 = this.state;
	    var activeIndex = _state3.activeIndex;
	    var showMenu = _state3.showMenu;
	    var text = _state3.text;


	    if (!(showMenu && text.length >= minLength)) {
	      return null;
	    }

	    var menuProps = (0, _pick3.default)(this.props, ['align', 'emptyLabel', 'maxHeight', 'newSelectionPrefix', 'paginationText', 'renderMenuItemChildren']);

	    return _react2.default.createElement(_TypeaheadMenu2.default, _extends({}, menuProps, {
	      activeIndex: activeIndex,
	      initialResultCount: this.props.paginateResults,
	      labelKey: labelKey,
	      onClick: this._handleAddOption,
	      options: filteredOptions,
	      text: text
	    }));
	  },
	  _handleBlur: function _handleBlur(e) {
	    // Note: Don't hide the menu here, since that interferes with other actions
	    // like making a selection by clicking on a menu item.
	    this.props.onBlur(e);
	  },
	  _handleFocus: function _handleFocus() {
	    this.setState({ showMenu: true });
	  },
	  _handleTextChange: function _handleTextChange(text) {
	    var _getInitialState2 = this.getInitialState();

	    var activeIndex = _getInitialState2.activeIndex;

	    this.setState({
	      activeIndex: activeIndex,
	      showMenu: true,
	      text: text
	    });

	    this.props.onInputChange(text);
	  },
	  _handleKeydown: function _handleKeydown(options, e) {
	    var activeIndex = this.state.activeIndex;


	    switch (e.keyCode) {
	      case _keyCode.BACKSPACE:
	        // Don't let the browser go back.
	        e.stopPropagation();
	        break;
	      case _keyCode.UP:
	      case _keyCode.DOWN:
	        // Prevent page from scrolling.
	        e.preventDefault();

	        // Increment or decrement index based on user keystroke.
	        activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;

	        // If we've reached the end, go back to the beginning or vice-versa.
	        if (activeIndex === options.length) {
	          activeIndex = -1;
	        } else if (activeIndex === -2) {
	          activeIndex = options.length - 1;
	        }

	        this.setState({ activeIndex: activeIndex });
	        break;
	      case _keyCode.ESC:
	      case _keyCode.TAB:
	        // Prevent things like unintentionally closing dialogs.
	        e.stopPropagation();
	        this._hideDropdown();
	        break;
	      case _keyCode.RETURN:
	        if (this.state.showMenu) {
	          var selected = options[activeIndex];
	          selected && this._handleAddOption(selected);
	        }
	        break;
	    }
	  },
	  _handleAddOption: function _handleAddOption(selectedOption) {
	    var _props4 = this.props;
	    var multiple = _props4.multiple;
	    var labelKey = _props4.labelKey;
	    var onChange = _props4.onChange;
	    var onInputChange = _props4.onInputChange;


	    var selected = void 0;
	    var text = void 0;

	    if (multiple) {
	      // If multiple selections are allowed, add the new selection to the
	      // existing selections.
	      selected = this.state.selected.concat(selectedOption);
	      text = '';
	    } else {
	      // If only a single selection is allowed, replace the existing selection
	      // with the new one.
	      selected = [selectedOption];
	      text = selectedOption[labelKey];
	    }

	    this.setState({ selected: selected, text: text });
	    this._hideDropdown();

	    onChange(selected);
	    onInputChange(text);
	  },
	  _handleRemoveOption: function _handleRemoveOption(removedOption) {
	    var selected = this.state.selected.slice();
	    selected = selected.filter(function (option) {
	      return !(0, _isEqual3.default)(option, removedOption);
	    });

	    this.setState({ selected: selected });
	    this._hideDropdown();

	    this.props.onChange(selected);
	  },


	  /**
	   * From `listensToClickOutside` HOC.
	   */
	  handleClickOutside: function handleClickOutside(e) {
	    this._hideDropdown();
	  },
	  _hideDropdown: function _hideDropdown() {
	    var _getInitialState3 = this.getInitialState();

	    var activeIndex = _getInitialState3.activeIndex;
	    var showMenu = _getInitialState3.showMenu;

	    this.setState({
	      activeIndex: activeIndex,
	      showMenu: showMenu
	    });
	  }
	});

	exports.default = (0, _reactOnclickoutside2.default)(Typeahead);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _pick2 = __webpack_require__(22);

	var _pick3 = _interopRequireDefault(_pick2);

	var _head2 = __webpack_require__(62);

	var _head3 = _interopRequireDefault(_head2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _keyCode = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * TypeaheadInput
	 *
	 * Handles a single selection from the Typeahead component.
	 */
	var TypeaheadInput = _react2.default.createClass({
	  displayName: 'TypeaheadInput',

	  propTypes: {
	    disabled: _react.PropTypes.bool,
	    labelKey: _react.PropTypes.string,
	    onBlur: _react.PropTypes.func,
	    onChange: _react.PropTypes.func,
	    onFocus: _react.PropTypes.func,
	    options: _react.PropTypes.array,
	    placeholder: _react.PropTypes.string,
	    selected: _react.PropTypes.array,
	    text: _react.PropTypes.string
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isFocused: false
	    };
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    if (this.props.activeIndex !== prevProps.activeIndex) {
	      var inputText = this._getInputText();
	      this.refs.input.selectionStart = inputText.length;
	    }
	  },
	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var disabled = _props.disabled;
	    var selected = _props.selected;

	    var inputProps = (0, _pick3.default)(this.props, ['disabled', 'onFocus', 'placeholder']);

	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames2.default)('bootstrap-typeahead-input', className),
	        onClick: this._handleInputFocus,
	        onFocus: this._handleInputFocus,
	        style: { outline: 'none' },
	        tabIndex: -1 },
	      _react2.default.createElement('input', _extends({}, inputProps, {
	        className: (0, _classnames2.default)('bootstrap-typeahead-input-main', 'form-control', {
	          'has-selection': !!selected.length
	        }),
	        onBlur: this._handleBlur,
	        onChange: this._handleChange,
	        onKeyDown: this._handleKeydown,
	        ref: 'input',
	        style: {
	          backgroundColor: !disabled && 'transparent',
	          display: 'block',
	          position: 'relative',
	          zIndex: 1
	        },
	        type: 'text',
	        value: this._getInputText()
	      })),
	      _react2.default.createElement('input', {
	        className: 'bootstrap-typeahead-input-hint form-control',
	        style: {
	          borderColor: 'transparent',
	          bottom: 0,
	          boxShadow: 'none',
	          display: 'block',
	          opacity: 0.6,
	          position: 'absolute',
	          top: 0,
	          width: '100%',
	          zIndex: 0
	        },
	        tabIndex: -1,
	        type: 'text',
	        value: this._getHintText()
	      })
	    );
	  },
	  blur: function blur() {
	    this.refs.input.blur();
	  },
	  focus: function focus() {
	    this._handleInputFocus();
	  },
	  _getHintText: function _getHintText() {
	    var _props2 = this.props;
	    var activeIndex = _props2.activeIndex;
	    var options = _props2.options;
	    var labelKey = _props2.labelKey;
	    var selected = _props2.selected;
	    var text = _props2.text;

	    var firstOption = (0, _head3.default)(options);
	    var firstOptionString = firstOption && firstOption[labelKey];

	    // Only show the hint if:
	    if (
	    // The input is focused.
	    this.state.isFocused &&
	    // The input contains text.
	    text &&
	    // None of the menu options are focused.
	    activeIndex === -1 &&
	    // There are no current selections.
	    !selected.length &&
	    // The input text corresponds to the beginning of the first option.
	    firstOptionString && firstOptionString.toLowerCase().indexOf(text.toLowerCase()) === 0) {
	      // Text matching is case-insensitive, so to display the hint correctly,
	      // splice the input text with the rest of the actual string.
	      return text + firstOptionString.slice(text.length, firstOptionString.length);
	    }

	    return '';
	  },
	  _getInputText: function _getInputText() {
	    var _props3 = this.props;
	    var activeIndex = _props3.activeIndex;
	    var labelKey = _props3.labelKey;
	    var options = _props3.options;
	    var selected = _props3.selected;
	    var text = _props3.text;


	    var selectedItem = !!selected.length && (0, _head3.default)(selected);
	    if (selectedItem) {
	      return selectedItem[labelKey];
	    }

	    if (activeIndex >= 0) {
	      return options[activeIndex][labelKey];
	    }

	    return text;
	  },
	  _handleBlur: function _handleBlur(e) {
	    this.setState({ isFocused: false });
	    this.props.onBlur(e);
	  },
	  _handleChange: function _handleChange(e) {
	    // Clear any selections when text is entered.
	    var _props4 = this.props;
	    var onRemove = _props4.onRemove;
	    var selected = _props4.selected;

	    !!selected.length && onRemove((0, _head3.default)(selected));

	    this.props.onChange(e.target.value);
	  },


	  /**
	   * If the containing parent div is focused or clicked, focus the input.
	   */
	  _handleInputFocus: function _handleInputFocus(e) {
	    this.setState({ isFocused: true });
	    this.refs.input.focus();
	  },
	  _handleKeydown: function _handleKeydown(e) {
	    var _props5 = this.props;
	    var activeIndex = _props5.activeIndex;
	    var options = _props5.options;
	    var onAdd = _props5.onAdd;
	    var selected = _props5.selected;
	    var text = _props5.text;


	    switch (e.keyCode) {
	      case _keyCode.RIGHT:
	      case _keyCode.TAB:
	        var cursorPos = this.refs.input.selectionStart;
	        var hasHintText = !!this._getHintText();

	        // Autocomplete the selection if all of the following are true:
	        if (
	        // There's a hint or a menu item is highlighted.
	        (hasHintText || activeIndex !== -1) &&
	        // There's no current selection.
	        !selected.length &&
	        // The input cursor is at the end of the text string when the user
	        // hits the right arrow key.
	        !(e.keyCode === _keyCode.RIGHT && cursorPos !== text.length)) {
	          e.preventDefault();

	          var selectedOption = hasHintText ? (0, _head3.default)(options) : options[activeIndex];

	          onAdd && onAdd(selectedOption);
	        }
	        break;
	    }

	    this.props.onKeyDown(e);
	  }
	});

	exports.default = TypeaheadInput;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classnames = __webpack_require__(2);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _reactHighlighter = __webpack_require__(72);

	var _reactHighlighter2 = _interopRequireDefault(_reactHighlighter);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Menu = __webpack_require__(24);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuItem = __webpack_require__(25);

	var _MenuItem2 = _interopRequireDefault(_MenuItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TypeaheadMenu = _react2.default.createClass({
	  displayName: 'TypeaheadMenu',

	  propTypes: {
	    activeIndex: _react.PropTypes.number,
	    align: _react.PropTypes.oneOf(['justify', 'left', 'right']),
	    emptyLabel: _react.PropTypes.string,
	    initialResultCount: _react.PropTypes.number,
	    labelKey: _react.PropTypes.string.isRequired,
	    maxHeight: _react.PropTypes.number,
	    newSelectionPrefix: _react.PropTypes.string,
	    options: _react.PropTypes.array,
	    paginationText: _react.PropTypes.string,
	    renderMenuItemChildren: _react.PropTypes.func,
	    text: _react.PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      align: 'justify',
	      emptyLabel: 'No matches found.',
	      initialResultCount: 100,
	      maxHeight: 300,
	      newSelectionPrefix: 'New selection:',
	      paginationText: 'Display additional results...'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      /**
	       * Max number of results to display, for performance reasons. If this
	       * number is less than the number of available results, the user will see
	       * an option to display more results.
	       */
	      resultCount: this.props.initialResultCount
	    };
	  },
	  render: function render() {
	    var _props = this.props;
	    var align = _props.align;
	    var emptyLabel = _props.emptyLabel;
	    var maxHeight = _props.maxHeight;
	    var options = _props.options;

	    // Render the max number of results or all results.

	    var results = options.slice(0, this.state.resultCount || options.length);
	    var menuItems = results.length ? results.map(this._renderMenuItem) : _react2.default.createElement(
	      _MenuItem2.default,
	      { disabled: true },
	      emptyLabel
	    );

	    return _react2.default.createElement(
	      _Menu2.default,
	      {
	        className: (0, _classnames2.default)('bootstrap-typeahead-menu', {
	          'dropdown-menu-justify': align === 'justify',
	          'dropdown-menu-right': align === 'right'
	        }),
	        style: {
	          maxHeight: maxHeight + 'px',
	          overflow: 'auto'
	        } },
	      menuItems,
	      this._renderPaginationMenuItem(results)
	    );
	  },
	  _renderMenuItem: function _renderMenuItem(option, idx) {
	    var _props2 = this.props;
	    var activeIndex = _props2.activeIndex;
	    var labelKey = _props2.labelKey;
	    var newSelectionPrefix = _props2.newSelectionPrefix;
	    var _onClick = _props2.onClick;
	    var renderMenuItemChildren = _props2.renderMenuItemChildren;
	    var text = _props2.text;


	    var menuItemProps = {
	      active: idx === activeIndex,
	      key: idx,
	      onClick: function onClick() {
	        return _onClick(option);
	      }
	    };

	    return renderMenuItemChildren ? _react2.default.createElement(
	      _MenuItem2.default,
	      menuItemProps,
	      renderMenuItemChildren(this.props, option, idx)
	    ) : _react2.default.createElement(
	      _MenuItem2.default,
	      menuItemProps,
	      option.customOption && newSelectionPrefix + ' ',
	      _react2.default.createElement(
	        _reactHighlighter2.default,
	        { search: text },
	        option[labelKey]
	      )
	    );
	  },


	  /**
	   * Allow user to see more results, if available.
	   */
	  _renderPaginationMenuItem: function _renderPaginationMenuItem(results) {
	    var _props3 = this.props;
	    var options = _props3.options;
	    var paginationText = _props3.paginationText;


	    if (results.length < options.length) {
	      return [_react2.default.createElement('li', {
	        className: 'divider',
	        key: 'pagination-item-divider',
	        role: 'separator'
	      }), _react2.default.createElement(
	        _MenuItem2.default,
	        {
	          className: 'bootstrap-typeahead-menu-paginator',
	          key: 'pagination-item',
	          onClick: this._handlePagination },
	        paginationText
	      )];
	    }
	  },
	  _handlePagination: function _handlePagination(e) {
	    var resultCount = this.state.resultCount + this.props.initialResultCount;
	    this.setState({ resultCount: resultCount });
	  }
	});

	exports.default = TypeaheadMenu;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _uniqueId2 = __webpack_require__(71);

	var _uniqueId3 = _interopRequireDefault(_uniqueId2);

	var _isEqual2 = __webpack_require__(18);

	var _isEqual3 = _interopRequireDefault(_isEqual2);

	var _find2 = __webpack_require__(60);

	var _find3 = _interopRequireDefault(_find2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Filter out options that don't match the input string or, if multiple
	 * selections are allowed, that have already been selected.
	 */
	function getFilteredOptions() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var selected = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	  var props = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	  var allowNew = props.allowNew;
	  var labelKey = props.labelKey;
	  var minLength = props.minLength;
	  var multiple = props.multiple;


	  if (text.length < minLength) {
	    return [];
	  }

	  var filteredOptions = options.filter(function (option) {
	    var labelString = option[labelKey];
	    if (!labelString || typeof labelString !== 'string') {
	      throw new Error('One or more options does not have a valid label string. Please ' + 'check the `labelKey` prop to ensure that it matches the correct ' + 'option key and provides a string for filtering and display.');
	    }

	    return !(labelString.toLowerCase().indexOf(text.toLowerCase()) === -1 || multiple && (0, _find3.default)(selected, function (o) {
	      return (0, _isEqual3.default)(o, option);
	    }));
	  });

	  if (!filteredOptions.length && allowNew && !!text.trim()) {
	    var newOption = {
	      id: (0, _uniqueId3.default)('new-id-'),
	      customOption: true
	    };
	    newOption[labelKey] = text;
	    filteredOptions = [newOption];
	  }

	  return filteredOptions;
	}

	exports.default = getFilteredOptions;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function blacklist (src) {
	  var copy = {}
	  var filter = arguments[1]

	  if (typeof filter === 'string') {
	    filter = {}
	    for (var i = 1; i < arguments.length; i++) {
	      filter[arguments[i]] = true
	    }
	  }

	  for (var key in src) {
	    // blacklist?
	    if (filter[key]) continue

	    copy[key] = src[key]
	  }

	  return copy
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(11),
	    listCacheDelete = __webpack_require__(12),
	    listCacheGet = __webpack_require__(13),
	    listCacheHas = __webpack_require__(14),
	    listCacheSet = __webpack_require__(15);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(34),
	    setCacheAdd = __webpack_require__(56),
	    setCacheHas = __webpack_require__(57);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(11),
	    listCacheDelete = __webpack_require__(12),
	    listCacheGet = __webpack_require__(13),
	    listCacheHas = __webpack_require__(14),
	    listCacheSet = __webpack_require__(15);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(54);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}

	module.exports = baseHas;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(44),
	    isObject = __webpack_require__(20),
	    isObjectLike = __webpack_require__(7);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(36),
	    equalArrays = __webpack_require__(50),
	    equalByTag = __webpack_require__(51),
	    equalObjects = __webpack_require__(52),
	    getTag = __webpack_require__(10),
	    isArray = __webpack_require__(6),
	    isHostObject = __webpack_require__(55),
	    isTypedArray = __webpack_require__(68);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var basePickBy = __webpack_require__(46);

	/**
	 * The base implementation of `_.pick` without support for individual
	 * property identifiers.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return basePickBy(object, props, function(value, key) {
	    return key in object;
	  });
	}

	module.exports = basePick;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index],
	        value = object[key];

	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(37);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = baseRest;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(9),
	    isArrayLike = __webpack_require__(17),
	    keys = __webpack_require__(8);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    if (!isArrayLike(collection)) {
	      var iteratee = baseIteratee(predicate, 3);
	      collection = keys(collection);
	      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
	    }
	    var index = findIndexFunc(collection, predicate, fromIndex);
	    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
	  };
	}

	module.exports = createFind;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(35),
	    arraySome = __webpack_require__(39);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(42),
	    keys = __webpack_require__(8);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(47);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(16);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	var getPrototype = overArg(nativeGetPrototype, Object);

	module.exports = getPrototype;


/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(49),
	    findIndex = __webpack_require__(61);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);

	module.exports = find;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(40),
	    baseIteratee = __webpack_require__(9),
	    toInteger = __webpack_require__(69);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Function} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Gets the first element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias first
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the first element of `array`.
	 * @example
	 *
	 * _.head([1, 2, 3]);
	 * // => 1
	 *
	 * _.head([]);
	 * // => undefined
	 */
	function head(array) {
	  return (array && array.length) ? array[0] : undefined;
	}

	module.exports = head;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(10),
	    isArguments = __webpack_require__(63),
	    isArray = __webpack_require__(6),
	    isArrayLike = __webpack_require__(17),
	    isBuffer = __webpack_require__(64),
	    isFunction = __webpack_require__(19),
	    isObjectLike = __webpack_require__(7),
	    isString = __webpack_require__(67),
	    keys = __webpack_require__(8);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || isString(value) || isFunction(value.splice) ||
	        isArguments(value) || isBuffer(value))) {
	    return !value.length;
	  }
	  if (isObjectLike(value)) {
	    var tag = getTag(value);
	    if (tag == mapTag || tag == setTag) {
	      return !value.size;
	    }
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return !(nonEnumShadows && keys(value).length);
	}

	module.exports = isEmpty;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(6),
	    isObjectLike = __webpack_require__(7);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(70);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var RegExpPropType = __webpack_require__(73);
	var escapeStringRegexp = __webpack_require__(33);
	var blacklist = __webpack_require__(32);

	var Highlighter = React.createClass({displayName: "Highlighter",
	  count: 0,

	  propTypes: {
	    search: React.PropTypes.oneOfType([
	      React.PropTypes.string,
	      React.PropTypes.number,
	      React.PropTypes.bool,
	      RegExpPropType
	    ]).isRequired,
	    caseSensitive: React.PropTypes.bool,
	    matchElement: React.PropTypes.string,
	    matchClass: React.PropTypes.string,
	    matchStyle: React.PropTypes.object
	  },

	  getDefaultProps: function() {
	    return {
	      caseSensitive: false,
	      matchElement: 'strong',
	      matchClass: 'highlight',
	      matchStyle: {}
	    }
	  },

	  render: function() {
	    var props = blacklist(this.props, 'search', 'caseSensitive', 'matchElement', 'matchClass', 'matchStyle');

	    return React.createElement('span', props, this.renderElement(this.props.children));
	  },

	  /**
	   * A wrapper to the highlight method to determine when the highlighting
	   * process should occur.
	   *
	   * @param  {string} subject
	   *   The body of text that will be searched for highlighted words.
	   *
	   * @return {Array}
	   *   An array of ReactElements
	   */
	  renderElement: function(subject) {
	    if (this.isScalar() && this.hasSearch()) {
	      var search = this.getSearch();
	      return this.highlightChildren(subject, search);
	    }

	    return this.props.children;
	  },

	  /**
	   * Determine if props are valid types for processing.
	   *
	   * @return {Boolean}
	   */
	  isScalar: function() {
	    return (/string|number|boolean/).test(typeof this.props.children);
	  },

	  /**
	   * Determine if required search prop is defined and valid.
	   *
	   * @return {Boolean}
	   */
	  hasSearch: function() {
	    return (typeof this.props.search !== 'undefined') && this.props.search;
	  },

	  /**
	   * Get the search prop, but always in the form of a regular expression. Use
	   * this as a proxy to this.props.search for consistency.
	   *
	   * @return {RegExp}
	   */
	  getSearch: function() {
	    if (this.props.search instanceof RegExp) {
	      return this.props.search;
	    }

	    var flags = '';
	    if (!this.props.caseSensitive) {
	      flags +='i';
	    }

	    var search = this.props.search;
	    if (typeof this.props.search === 'string') {
	      search = escapeStringRegexp(search);
	    }

	    return new RegExp(search, flags);
	  },

	  /**
	   * Get the indexes of the first and last characters of the matched string.
	   *
	   * @param  {string} subject
	   *   The string to search against.
	   *
	   * @param  {RegExp} search
	   *   The regex search query.
	   *
	   * @return {Object}
	   *   An object consisting of "first" and "last" properties representing the
	   *   indexes of the first and last characters of a matching string.
	   */
	  getMatchBoundaries: function(subject, search) {
	    var matches = search.exec(subject);
	    if (matches) {
	      return {
	        first: matches.index,
	        last: matches.index + matches[0].length
	      };
	    }
	  },

	  /**
	   * Determines which strings of text should be highlighted or not.
	   *
	   * @param  {string} subject
	   *   The body of text that will be searched for highlighted words.
	   * @param  {string} search
	   *   The search used to search for highlighted words.
	   *
	   * @return {Array}
	   *   An array of ReactElements
	   */
	  highlightChildren: function(subject, search) {
	    var children = [];
	    var matchElement = this.props.matchElement;
	    var remaining = subject;

	    while (remaining) {
	      if (!search.test(remaining)) {
	        children.push(this.renderPlain(remaining));
	        return children;
	      }

	      var boundaries = this.getMatchBoundaries(remaining, search);

	      // Capture the string that leads up to a match...
	      var nonMatch = remaining.slice(0, boundaries.first);
	      if (nonMatch) {
	        children.push(this.renderPlain(nonMatch));
	      }

	      // Now, capture the matching string...
	      var match = remaining.slice(boundaries.first, boundaries.last);
	      if (match) {
	        children.push(this.renderHighlight(match, matchElement));
	      }

	      // And if there's anything left over, recursively run this method again.
	      remaining = remaining.slice(boundaries.last);

	    }

	    return children;
	  },

	  /**
	   * Responsible for rending a non-highlighted element.
	   *
	   * @param  {string} string
	   *   A string value to wrap an element around.
	   *
	   * @return {ReactElement}
	   */
	  renderPlain: function(string) {
	    this.count++;
	    return React.DOM.span({'key': this.count}, string);
	  },

	  /**
	   * Responsible for rending a highlighted element.
	   *
	   * @param  {string} string
	   *   A string value to wrap an element around.
	   *
	   * @return {ReactElement}
	   */
	  renderHighlight: function(string) {
	    this.count++;
	    return React.DOM[this.props.matchElement]({
	      key: this.count,
	      className: this.props.matchClass,
	      style: this.props.matchStyle
	    }, string);
	  }
	});

	module.exports = Highlighter;


/***/ },
/* 73 */
/***/ function(module, exports) {

	var regExpPropType = function (props, propName, componentName, location) {
	  if (!(props[propName] instanceof RegExp)) {
	    var propType = typeof props[propName];

	    return new Error(
	      ("Invalid " + location + " `" + propName + "` of type `" + propType + "` ") +
	        ("supplied to `" + componentName + "`, expected `RegExp`.")
	    );
	  }
	};

	module.exports = regExpPropType;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);

	var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };

	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',

		propTypes: {
			className: React.PropTypes.string, // className for the outer element
			defaultValue: React.PropTypes.any, // default field value
			inputClassName: React.PropTypes.string, // className for the input element
			inputStyle: React.PropTypes.object, // css styles for the input element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			placeholder: React.PropTypes.string, // placeholder text
			placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
			style: React.PropTypes.object, // css styles for the outer element
			value: React.PropTypes.any },
		// field value
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var inputProps = _extends({}, this.props);
			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.placeholderIsMinWidth;
			return React.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				React.createElement('input', _extends({}, inputProps, { ref: 'input' })),
				React.createElement(
					'div',
					{ ref: 'sizer', style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? React.createElement(
					'div',
					{ ref: 'placeholderSizer', style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	});

	module.exports = AutosizeInput;

/***/ }
/******/ ])
});
;