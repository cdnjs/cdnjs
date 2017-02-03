(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else if(typeof exports === 'object')
		exports["SirTrevor"] = factory(require("jquery"));
	else
		root["SirTrevor"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_56__) {
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);

	// ES6 shims
	__webpack_require__(50).shim();
	__webpack_require__(53);
	__webpack_require__(54); // shims ES7 Array.prototype.includes

	__webpack_require__(55); // extends jQuery itself

	var utils = __webpack_require__(57);

	var SirTrevor = {

	  config: __webpack_require__(58),

	  log: utils.log,
	  Locales: __webpack_require__(59),

	  Events: __webpack_require__(60),
	  EventBus: __webpack_require__(62),

	  EditorStore: __webpack_require__(63),
	  Submittable: __webpack_require__(64),
	  FileUploader: __webpack_require__(65),

	  BlockMixins: __webpack_require__(66),
	  BlockPositioner: __webpack_require__(186),
	  BlockReorder: __webpack_require__(189),
	  BlockDeletion: __webpack_require__(190),
	  BlockValidations: __webpack_require__(191),
	  BlockStore: __webpack_require__(192),
	  BlockManager: __webpack_require__(193),

	  SimpleBlock: __webpack_require__(197),
	  Block: __webpack_require__(196),

	  Blocks: __webpack_require__(194),

	  BlockControl: __webpack_require__(208),
	  BlockControls: __webpack_require__(209),
	  FloatingBlockControls: __webpack_require__(210),

	  FormatBar: __webpack_require__(211),
	  Editor: __webpack_require__(212),

	  toMarkdown: __webpack_require__(215),
	  toHTML: __webpack_require__(200),

	  setDefaults: function(options) {
	    Object.assign(SirTrevor.config.defaults, options || {});
	  },

	  getInstance: utils.getInstance,

	  setBlockOptions: function(type, options) {
	    var block = SirTrevor.Blocks[type];

	    if (_.isUndefined(block)) {
	      return;
	    }

	    Object.assign(block.prototype, options || {});
	  },

	  runOnAllInstances: function(method) {
	    if (SirTrevor.Editor.prototype.hasOwnProperty(method)) {
	      var methodArgs = Array.prototype.slice.call(arguments, 1);
	      Array.prototype.forEach.call(SirTrevor.config.instances, function(i) {
	        i[method].apply(null, methodArgs);
	      });
	    } else {
	      SirTrevor.log("method doesn't exist");
	    }
	  },

	};

	Object.assign(SirTrevor, __webpack_require__(213));


	module.exports = SirTrevor;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.isEmpty = __webpack_require__(3);
	exports.isFunction = __webpack_require__(22);
	exports.isObject = __webpack_require__(11);
	exports.isString = __webpack_require__(30);
	exports.isUndefined = __webpack_require__(31);
	exports.result = __webpack_require__(32);
	exports.template = __webpack_require__(33);
	exports.uniqueId = __webpack_require__(49);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var forOwn = __webpack_require__(4),
	    isFunction = __webpack_require__(22);

	/** `Object#toString` result shortcuts */
	var argsClass = '[object Arguments]',
	    arrayClass = '[object Array]',
	    objectClass = '[object Object]',
	    stringClass = '[object String]';

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/**
	 * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	 * length of `0` and objects with no own enumerable properties are considered
	 * "empty".
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Array|Object|string} value The value to inspect.
	 * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({});
	 * // => true
	 *
	 * _.isEmpty('');
	 * // => true
	 */
	function isEmpty(value) {
	  var result = true;
	  if (!value) {
	    return result;
	  }
	  var className = toString.call(value),
	      length = value.length;

	  if ((className == arrayClass || className == stringClass || className == argsClass ) ||
	      (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	    return !length;
	  }
	  forOwn(value, function() {
	    return (result = false);
	  });
	  return result;
	}

	module.exports = isEmpty;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreateCallback = __webpack_require__(5),
	    keys = __webpack_require__(26),
	    objectTypes = __webpack_require__(29);

	/**
	 * Iterates over own enumerable properties of an object, executing the callback
	 * for each property. The callback is bound to `thisArg` and invoked with three
	 * arguments; (value, key, object). Callbacks may exit iteration early by
	 * explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [callback=identity] The function called per iteration.
	 * @param {*} [thisArg] The `this` binding of `callback`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	 *   console.log(key);
	 * });
	 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	 */
	var forOwn = function(collection, callback, thisArg) {
	  var index, iterable = collection, result = iterable;
	  if (!iterable) return result;
	  if (!objectTypes[typeof iterable]) return result;
	  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	    var ownIndex = -1,
	        ownProps = objectTypes[typeof iterable] && keys(iterable),
	        length = ownProps ? ownProps.length : 0;

	    while (++ownIndex < length) {
	      index = ownProps[ownIndex];
	      if (callback(iterable[index], index, collection) === false) return result;
	    }
	  return result
	};

	module.exports = forOwn;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var bind = __webpack_require__(6),
	    identity = __webpack_require__(23),
	    setBindData = __webpack_require__(14),
	    support = __webpack_require__(24);

	/** Used to detected named functions */
	var reFuncName = /^\s*function[ \n\r\t]+\w/;

	/** Used to detect functions containing a `this` reference */
	var reThis = /\bthis\b/;

	/** Native method shortcuts */
	var fnToString = Function.prototype.toString;

	/**
	 * The base implementation of `_.createCallback` without support for creating
	 * "_.pluck" or "_.where" style callbacks.
	 *
	 * @private
	 * @param {*} [func=identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of the created callback.
	 * @param {number} [argCount] The number of arguments the callback accepts.
	 * @returns {Function} Returns a callback function.
	 */
	function baseCreateCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  // exit early for no `thisArg` or already bound by `Function#bind`
	  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	    return func;
	  }
	  var bindData = func.__bindData__;
	  if (typeof bindData == 'undefined') {
	    if (support.funcNames) {
	      bindData = !func.name;
	    }
	    bindData = bindData || !support.funcDecomp;
	    if (!bindData) {
	      var source = fnToString.call(func);
	      if (!support.funcNames) {
	        bindData = !reFuncName.test(source);
	      }
	      if (!bindData) {
	        // checks if `func` references the `this` keyword and stores the result
	        bindData = reThis.test(source);
	        setBindData(func, bindData);
	      }
	    }
	  }
	  // exit early if there are no `this` references or `func` is bound
	  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 2: return function(a, b) {
	      return func.call(thisArg, a, b);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	  }
	  return bind(func, thisArg);
	}

	module.exports = baseCreateCallback;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var createWrapper = __webpack_require__(7),
	    slice = __webpack_require__(17);

	/**
	 * Creates a function that, when called, invokes `func` with the `this`
	 * binding of `thisArg` and prepends any additional `bind` arguments to those
	 * provided to the bound function.
	 *
	 * @static
	 * @memberOf _
	 * @category Functions
	 * @param {Function} func The function to bind.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {...*} [arg] Arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * var func = function(greeting) {
	 *   return greeting + ' ' + this.name;
	 * };
	 *
	 * func = _.bind(func, { 'name': 'fred' }, 'hi');
	 * func();
	 * // => 'hi fred'
	 */
	function bind(func, thisArg) {
	  return arguments.length > 2
	    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	    : createWrapper(func, 1, null, null, thisArg);
	}

	module.exports = bind;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseBind = __webpack_require__(8),
	    baseCreateWrapper = __webpack_require__(18),
	    isFunction = __webpack_require__(22),
	    slice = __webpack_require__(17);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push,
	    unshift = arrayRef.unshift;

	/**
	 * Creates a function that, when called, either curries or invokes `func`
	 * with an optional `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of method flags to compose.
	 *  The bitmask may be composed of the following flags:
	 *  1 - `_.bind`
	 *  2 - `_.bindKey`
	 *  4 - `_.curry`
	 *  8 - `_.curry` (bound)
	 *  16 - `_.partial`
	 *  32 - `_.partialRight`
	 * @param {Array} [partialArgs] An array of arguments to prepend to those
	 *  provided to the new function.
	 * @param {Array} [partialRightArgs] An array of arguments to append to those
	 *  provided to the new function.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new function.
	 */
	function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	  var isBind = bitmask & 1,
	      isBindKey = bitmask & 2,
	      isCurry = bitmask & 4,
	      isCurryBound = bitmask & 8,
	      isPartial = bitmask & 16,
	      isPartialRight = bitmask & 32;

	  if (!isBindKey && !isFunction(func)) {
	    throw new TypeError;
	  }
	  if (isPartial && !partialArgs.length) {
	    bitmask &= ~16;
	    isPartial = partialArgs = false;
	  }
	  if (isPartialRight && !partialRightArgs.length) {
	    bitmask &= ~32;
	    isPartialRight = partialRightArgs = false;
	  }
	  var bindData = func && func.__bindData__;
	  if (bindData && bindData !== true) {
	    // clone `bindData`
	    bindData = slice(bindData);
	    if (bindData[2]) {
	      bindData[2] = slice(bindData[2]);
	    }
	    if (bindData[3]) {
	      bindData[3] = slice(bindData[3]);
	    }
	    // set `thisBinding` is not previously bound
	    if (isBind && !(bindData[1] & 1)) {
	      bindData[4] = thisArg;
	    }
	    // set if previously bound but not currently (subsequent curried functions)
	    if (!isBind && bindData[1] & 1) {
	      bitmask |= 8;
	    }
	    // set curried arity if not yet set
	    if (isCurry && !(bindData[1] & 4)) {
	      bindData[5] = arity;
	    }
	    // append partial left arguments
	    if (isPartial) {
	      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	    }
	    // append partial right arguments
	    if (isPartialRight) {
	      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	    }
	    // merge flags
	    bindData[1] |= bitmask;
	    return createWrapper.apply(null, bindData);
	  }
	  // fast path for `_.bind`
	  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	}

	module.exports = createWrapper;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreate = __webpack_require__(9),
	    isObject = __webpack_require__(11),
	    setBindData = __webpack_require__(14),
	    slice = __webpack_require__(17);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push;

	/**
	 * The base implementation of `_.bind` that creates the bound function and
	 * sets its meta data.
	 *
	 * @private
	 * @param {Array} bindData The bind data array.
	 * @returns {Function} Returns the new bound function.
	 */
	function baseBind(bindData) {
	  var func = bindData[0],
	      partialArgs = bindData[2],
	      thisArg = bindData[4];

	  function bound() {
	    // `Function#bind` spec
	    // http://es5.github.io/#x15.3.4.5
	    if (partialArgs) {
	      // avoid `arguments` object deoptimizations by using `slice` instead
	      // of `Array.prototype.slice.call` and not assigning `arguments` to a
	      // variable as a ternary expression
	      var args = slice(partialArgs);
	      push.apply(args, arguments);
	    }
	    // mimic the constructor's `return` behavior
	    // http://es5.github.io/#x13.2.2
	    if (this instanceof bound) {
	      // ensure `new bound` is an instance of `func`
	      var thisBinding = baseCreate(func.prototype),
	          result = func.apply(thisBinding, args || arguments);
	      return isObject(result) ? result : thisBinding;
	    }
	    return func.apply(thisArg, args || arguments);
	  }
	  setBindData(bound, bindData);
	  return bound;
	}

	module.exports = baseBind;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(10),
	    isObject = __webpack_require__(11),
	    noop = __webpack_require__(13);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(prototype, properties) {
	  return isObject(prototype) ? nativeCreate(prototype) : {};
	}
	// fallback for browsers without `Object.create`
	if (!nativeCreate) {
	  baseCreate = (function() {
	    function Object() {}
	    return function(prototype) {
	      if (isObject(prototype)) {
	        Object.prototype = prototype;
	        var result = new Object;
	        Object.prototype = null;
	      }
	      return result || global.Object();
	    };
	  }());
	}

	module.exports = baseCreate;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(12);

	/**
	 * Checks if `value` is the language type of Object.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // check if the value is the ECMAScript language type of Object
	  // http://es5.github.io/#x8
	  // and avoid a V8 bug
	  // http://code.google.com/p/v8/issues/detail?id=2291
	  return !!(value && objectTypes[typeof value]);
	}

	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * A no-operation function.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // no operation performed
	}

	module.exports = noop;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(15),
	    noop = __webpack_require__(16);

	/** Used as the property descriptor for `__bindData__` */
	var descriptor = {
	  'configurable': false,
	  'enumerable': false,
	  'value': null,
	  'writable': false
	};

	/** Used to set meta data on functions */
	var defineProperty = (function() {
	  // IE 8 only accepts DOM elements
	  try {
	    var o = {},
	        func = isNative(func = Object.defineProperty) && func,
	        result = func(o, o, o) && func;
	  } catch(e) { }
	  return result;
	}());

	/**
	 * Sets `this` binding data on a given function.
	 *
	 * @private
	 * @param {Function} func The function to set data on.
	 * @param {Array} value The data array to set.
	 */
	var setBindData = !defineProperty ? noop : function(func, value) {
	  descriptor.value = value;
	  defineProperty(func, '__bindData__', descriptor);
	};

	module.exports = setBindData;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * A no-operation function.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // no operation performed
	}

	module.exports = noop;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Slices the `collection` from the `start` index up to, but not including,
	 * the `end` index.
	 *
	 * Note: This function is used instead of `Array#slice` to support node lists
	 * in IE < 9 and to ensure dense arrays are returned.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to slice.
	 * @param {number} start The start index.
	 * @param {number} end The end index.
	 * @returns {Array} Returns the new array.
	 */
	function slice(array, start, end) {
	  start || (start = 0);
	  if (typeof end == 'undefined') {
	    end = array ? array.length : 0;
	  }
	  var index = -1,
	      length = end - start || 0,
	      result = Array(length < 0 ? 0 : length);

	  while (++index < length) {
	    result[index] = array[start + index];
	  }
	  return result;
	}

	module.exports = slice;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var baseCreate = __webpack_require__(19),
	    isObject = __webpack_require__(11),
	    setBindData = __webpack_require__(14),
	    slice = __webpack_require__(17);

	/**
	 * Used for `Array` method references.
	 *
	 * Normally `Array.prototype` would suffice, however, using an array literal
	 * avoids issues in Narwhal.
	 */
	var arrayRef = [];

	/** Native method shortcuts */
	var push = arrayRef.push;

	/**
	 * The base implementation of `createWrapper` that creates the wrapper and
	 * sets its meta data.
	 *
	 * @private
	 * @param {Array} bindData The bind data array.
	 * @returns {Function} Returns the new function.
	 */
	function baseCreateWrapper(bindData) {
	  var func = bindData[0],
	      bitmask = bindData[1],
	      partialArgs = bindData[2],
	      partialRightArgs = bindData[3],
	      thisArg = bindData[4],
	      arity = bindData[5];

	  var isBind = bitmask & 1,
	      isBindKey = bitmask & 2,
	      isCurry = bitmask & 4,
	      isCurryBound = bitmask & 8,
	      key = func;

	  function bound() {
	    var thisBinding = isBind ? thisArg : this;
	    if (partialArgs) {
	      var args = slice(partialArgs);
	      push.apply(args, arguments);
	    }
	    if (partialRightArgs || isCurry) {
	      args || (args = slice(arguments));
	      if (partialRightArgs) {
	        push.apply(args, partialRightArgs);
	      }
	      if (isCurry && args.length < arity) {
	        bitmask |= 16 & ~32;
	        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	      }
	    }
	    args || (args = arguments);
	    if (isBindKey) {
	      func = thisBinding[key];
	    }
	    if (this instanceof bound) {
	      thisBinding = baseCreate(func.prototype);
	      var result = func.apply(thisBinding, args);
	      return isObject(result) ? result : thisBinding;
	    }
	    return func.apply(thisBinding, args);
	  }
	  setBindData(bound, bindData);
	  return bound;
	}

	module.exports = baseCreateWrapper;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(20),
	    isObject = __webpack_require__(11),
	    noop = __webpack_require__(21);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(prototype, properties) {
	  return isObject(prototype) ? nativeCreate(prototype) : {};
	}
	// fallback for browsers without `Object.create`
	if (!nativeCreate) {
	  baseCreate = (function() {
	    function Object() {}
	    return function(prototype) {
	      if (isObject(prototype)) {
	        Object.prototype = prototype;
	        var result = new Object;
	        Object.prototype = null;
	      }
	      return result || global.Object();
	    };
	  }());
	}

	module.exports = baseCreate;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * A no-operation function.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // no operation performed
	}

	module.exports = noop;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Checks if `value` is a function.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 */
	function isFunction(value) {
	  return typeof value == 'function';
	}

	module.exports = isFunction;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'name': 'fred' };
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(25);

	/** Used to detect functions containing a `this` reference */
	var reThis = /\bthis\b/;

	/**
	 * An object used to flag environments features.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	/**
	 * Detect if functions can be decompiled by `Function#toString`
	 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	 *
	 * @memberOf _.support
	 * @type boolean
	 */
	support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

	/**
	 * Detect if `Function#name` is supported (all but IE).
	 *
	 * @memberOf _.support
	 * @type boolean
	 */
	support.funcNames = typeof Function.name == 'string';

	module.exports = support;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(27),
	    isObject = __webpack_require__(11),
	    shimKeys = __webpack_require__(28);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array composed of the own enumerable property names of an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 * @example
	 *
	 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (!isObject(object)) {
	    return [];
	  }
	  return nativeKeys(object);
	};

	module.exports = keys;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(29);

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Native method shortcuts */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which produces an array of the
	 * given object's own enumerable property names.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 */
	var shimKeys = function(object) {
	  var index, iterable = object, result = [];
	  if (!iterable) return result;
	  if (!(objectTypes[typeof object])) return result;
	    for (index in iterable) {
	      if (hasOwnProperty.call(iterable, index)) {
	        result.push(index);
	      }
	    }
	  return result
	};

	module.exports = shimKeys;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** `Object#toString` result shortcuts */
	var stringClass = '[object String]';

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/**
	 * Checks if `value` is a string.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('fred');
	 * // => true
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    value && typeof value == 'object' && toString.call(value) == stringClass || false;
	}

	module.exports = isString;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 */
	function isUndefined(value) {
	  return typeof value == 'undefined';
	}

	module.exports = isUndefined;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isFunction = __webpack_require__(22);

	/**
	 * Resolves the value of property `key` on `object`. If `key` is a function
	 * it will be invoked with the `this` binding of `object` and its result returned,
	 * else the property value is returned. If `object` is falsey then `undefined`
	 * is returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {Object} object The object to inspect.
	 * @param {string} key The name of the property to resolve.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = {
	 *   'cheese': 'crumpets',
	 *   'stuff': function() {
	 *     return 'nonsense';
	 *   }
	 * };
	 *
	 * _.result(object, 'cheese');
	 * // => 'crumpets'
	 *
	 * _.result(object, 'stuff');
	 * // => 'nonsense'
	 */
	function result(object, key) {
	  if (object) {
	    var value = object[key];
	    return isFunction(value) ? object[key]() : value;
	  }
	}

	module.exports = result;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var defaults = __webpack_require__(34),
	    escape = __webpack_require__(40),
	    escapeStringChar = __webpack_require__(45),
	    keys = __webpack_require__(35),
	    reInterpolate = __webpack_require__(46),
	    templateSettings = __webpack_require__(47),
	    values = __webpack_require__(48);

	/** Used to match empty string literals in compiled template source */
	var reEmptyStringLeading = /\b__p \+= '';/g,
	    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	/**
	 * Used to match ES6 template delimiters
	 * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	 */
	var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	/** Used to ensure capturing order of template delimiters */
	var reNoMatch = /($^)/;

	/** Used to match unescaped characters in compiled string literals */
	var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

	/**
	 * A micro-templating method that handles arbitrary delimiters, preserves
	 * whitespace, and correctly escapes quotes within interpolated code.
	 *
	 * Note: In the development build, `_.template` utilizes sourceURLs for easier
	 * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	 *
	 * For more information on precompiling templates see:
	 * http://lodash.com/custom-builds
	 *
	 * For more information on Chrome extension sandboxes see:
	 * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} text The template text.
	 * @param {Object} data The data object used to populate the text.
	 * @param {Object} [options] The options object.
	 * @param {RegExp} [options.escape] The "escape" delimiter.
	 * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	 * @param {Object} [options.imports] An object to import into the template as local variables.
	 * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	 * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	 * @param {string} [variable] The data object variable name.
	 * @returns {Function|string} Returns a compiled function when no `data` object
	 *  is given, else it returns the interpolated text.
	 * @example
	 *
	 * // using the "interpolate" delimiter to create a compiled template
	 * var compiled = _.template('hello <%= name %>');
	 * compiled({ 'name': 'fred' });
	 * // => 'hello fred'
	 *
	 * // using the "escape" delimiter to escape HTML in data property values
	 * _.template('<b><%- value %></b>', { 'value': '<script>' });
	 * // => '<b>&lt;script&gt;</b>'
	 *
	 * // using the "evaluate" delimiter to generate HTML
	 * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	 * _.template(list, { 'people': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	 * _.template('hello ${ name }', { 'name': 'pebbles' });
	 * // => 'hello pebbles'
	 *
	 * // using the internal `print` function in "evaluate" delimiters
	 * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	 * // => 'hello barney!'
	 *
	 * // using a custom template delimiters
	 * _.templateSettings = {
	 *   'interpolate': /{{([\s\S]+?)}}/g
	 * };
	 *
	 * _.template('hello {{ name }}!', { 'name': 'mustache' });
	 * // => 'hello mustache!'
	 *
	 * // using the `imports` option to import jQuery
	 * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	 * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // using the `sourceURL` option to specify a custom sourceURL for the template
	 * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	 * compiled(data);
	 * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	 *
	 * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	 * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	 * compiled.source;
	 * // => function(data) {
	 *   var __t, __p = '', __e = _.escape;
	 *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	 *   return __p;
	 * }
	 *
	 * // using the `source` property to inline compiled templates for meaningful
	 * // line numbers in error messages and a stack trace
	 * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	 *   var JST = {\
	 *     "main": ' + _.template(mainText).source + '\
	 *   };\
	 * ');
	 */
	function template(text, data, options) {
	  // based on John Resig's `tmpl` implementation
	  // http://ejohn.org/blog/javascript-micro-templating/
	  // and Laura Doktorova's doT.js
	  // https://github.com/olado/doT
	  var settings = templateSettings.imports._.templateSettings || templateSettings;
	  text = String(text || '');

	  // avoid missing dependencies when `iteratorTemplate` is not defined
	  options = defaults({}, options, settings);

	  var imports = defaults({}, options.imports, settings.imports),
	      importsKeys = keys(imports),
	      importsValues = values(imports);

	  var isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // compile the regexp to match each delimiter
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // escape characters that cannot be included in string literals
	    source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // replace delimiters with snippets
	    if (escapeValue) {
	      source += "' +\n__e(" + escapeValue + ") +\n'";
	    }
	    if (evaluateValue) {
	      isEvaluating = true;
	      source += "';\n" + evaluateValue + ";\n__p += '";
	    }
	    if (interpolateValue) {
	      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	    }
	    index = offset + match.length;

	    // the JS engine embedded in Adobe products requires returning the `match`
	    // string in order to produce the correct `offset` value
	    return match;
	  });

	  source += "';\n";

	  // if `variable` is not specified, wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain
	  var variable = options.variable,
	      hasVariable = variable;

	  if (!hasVariable) {
	    variable = 'obj';
	    source = 'with (' + variable + ') {\n' + source + '\n}\n';
	  }
	  // cleanup code by stripping empty strings
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // frame code as the function body
	  source = 'function(' + variable + ') {\n' +
	    (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	    "var __t, __p = '', __e = _.escape" +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  try {
	    var result = Function(importsKeys, 'return ' + source ).apply(undefined, importsValues);
	  } catch(e) {
	    e.source = source;
	    throw e;
	  }
	  if (data) {
	    return result(data);
	  }
	  // provide the compiled function's source by its `toString` method, in
	  // supported environments, or the `source` property as a convenience for
	  // inlining compiled templates during the build process
	  result.source = source;
	  return result;
	}

	module.exports = template;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keys = __webpack_require__(35),
	    objectTypes = __webpack_require__(39);

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object for all destination properties that resolve to `undefined`. Once a
	 * property is set, additional defaults of the same property will be ignored.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Objects
	 * @param {Object} object The destination object.
	 * @param {...Object} [source] The source objects.
	 * @param- {Object} [guard] Allows working with `_.reduce` without using its
	 *  `key` and `object` arguments as sources.
	 * @returns {Object} Returns the destination object.
	 * @example
	 *
	 * var object = { 'name': 'barney' };
	 * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	 * // => { 'name': 'barney', 'employer': 'slate' }
	 */
	var defaults = function(object, source, guard) {
	  var index, iterable = object, result = iterable;
	  if (!iterable) return result;
	  var args = arguments,
	      argsIndex = 0,
	      argsLength = typeof guard == 'number' ? 2 : args.length;
	  while (++argsIndex < argsLength) {
	    iterable = args[argsIndex];
	    if (iterable && objectTypes[typeof iterable]) {
	    var ownIndex = -1,
	        ownProps = objectTypes[typeof iterable] && keys(iterable),
	        length = ownProps ? ownProps.length : 0;

	    while (++ownIndex < length) {
	      index = ownProps[ownIndex];
	      if (typeof result[index] == 'undefined') result[index] = iterable[index];
	    }
	    }
	  }
	  return result
	};

	module.exports = defaults;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var isNative = __webpack_require__(36),
	    isObject = __webpack_require__(11),
	    shimKeys = __webpack_require__(37);

	/* Native method shortcuts for methods with the same name as other `lodash` methods */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array composed of the own enumerable property names of an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 * @example
	 *
	 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  if (!isObject(object)) {
	    return [];
	  }
	  return nativeKeys(object);
	};

	module.exports = keys;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Used to resolve the internal [[Class]] of values */
	var toString = objectProto.toString;

	/** Used to detect if a method is native */
	var reNative = RegExp('^' +
	  String(toString)
	    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	    .replace(/toString| for [^\]]+/g, '.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	 */
	function isNative(value) {
	  return typeof value == 'function' && reNative.test(value);
	}

	module.exports = isNative;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var objectTypes = __webpack_require__(38);

	/** Used for native method references */
	var objectProto = Object.prototype;

	/** Native method shortcuts */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which produces an array of the
	 * given object's own enumerable property names.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property names.
	 */
	var shimKeys = function(object) {
	  var index, iterable = object, result = [];
	  if (!iterable) return result;
	  if (!(objectTypes[typeof object])) return result;
	    for (index in iterable) {
	      if (hasOwnProperty.call(iterable, index)) {
	        result.push(index);
	      }
	    }
	  return result
	};

	module.exports = shimKeys;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to determine if values are of the language type Object */
	var objectTypes = {
	  'boolean': false,
	  'function': true,
	  'object': true,
	  'number': false,
	  'string': false,
	  'undefined': false
	};

	module.exports = objectTypes;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var escapeHtmlChar = __webpack_require__(41),
	    keys = __webpack_require__(35),
	    reUnescapedHtml = __webpack_require__(43);

	/**
	 * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	 * corresponding HTML entities.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} string The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('Fred, Wilma, & Pebbles');
	 * // => 'Fred, Wilma, &amp; Pebbles'
	 */
	function escape(string) {
	  return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	}

	module.exports = escape;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var htmlEscapes = __webpack_require__(42);

	/**
	 * Used by `escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} match The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(match) {
	  return htmlEscapes[match];
	}

	module.exports = escapeHtmlChar;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Used to convert characters to HTML entities:
	 *
	 * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	 * don't require escaping in HTML and have no special meaning unless they're part
	 * of a tag or an unquoted attribute value.
	 * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	 */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;'
	};

	module.exports = htmlEscapes;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var htmlEscapes = __webpack_require__(44),
	    keys = __webpack_require__(35);

	/** Used to match HTML entities and HTML characters */
	var reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

	module.exports = reUnescapedHtml;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/**
	 * Used to convert characters to HTML entities:
	 *
	 * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	 * don't require escaping in HTML and have no special meaning unless they're part
	 * of a tag or an unquoted attribute value.
	 * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	 */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;'
	};

	module.exports = htmlEscapes;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to escape characters for inclusion in compiled string literals */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\t': 't',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	/**
	 * Used by `template` to escape characters for inclusion in compiled
	 * string literals.
	 *
	 * @private
	 * @param {string} match The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeStringChar(match) {
	  return '\\' + stringEscapes[match];
	}

	module.exports = escapeStringChar;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to match "interpolate" template delimiters */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var escape = __webpack_require__(40),
	    reInterpolate = __webpack_require__(46);

	/**
	 * By default, the template delimiters used by Lo-Dash are similar to those in
	 * embedded Ruby (ERB). Change the following template settings to use alternative
	 * delimiters.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var templateSettings = {

	  /**
	   * Used to detect `data` property values to be HTML-escaped.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'escape': /<%-([\s\S]+?)%>/g,

	  /**
	   * Used to detect code to be evaluated.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'evaluate': /<%([\s\S]+?)%>/g,

	  /**
	   * Used to detect `data` property values to inject.
	   *
	   * @memberOf _.templateSettings
	   * @type RegExp
	   */
	  'interpolate': reInterpolate,

	  /**
	   * Used to reference the data object in the template text.
	   *
	   * @memberOf _.templateSettings
	   * @type string
	   */
	  'variable': '',

	  /**
	   * Used to import variables into the compiled template.
	   *
	   * @memberOf _.templateSettings
	   * @type Object
	   */
	  'imports': {

	    /**
	     * A reference to the `lodash` function.
	     *
	     * @memberOf _.templateSettings.imports
	     * @type Function
	     */
	    '_': { 'escape': escape }
	  }
	};

	module.exports = templateSettings;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	var keys = __webpack_require__(35);

	/**
	 * Creates an array composed of the own enumerable property values of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Objects
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns an array of property values.
	 * @example
	 *
	 * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	 * // => [1, 2, 3] (property order is not guaranteed across environments)
	 */
	function values(object) {
	  var index = -1,
	      props = keys(object),
	      length = props.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = object[props[index]];
	  }
	  return result;
	}

	module.exports = values;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash modularize modern exports="npm" -o ./npm/`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */

	/** Used to generate unique IDs */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utilities
	 * @param {string} [prefix] The value to prefix the ID with.
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
	  return String(prefix == null ? '' : prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es6-shim
	var keys = __webpack_require__(51);
	var canBeObject = function (obj) {
		return typeof obj !== 'undefined' && obj !== null;
	};

	var assignShim = function assign(target, source1) {
		if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
		var objTarget = Object(target);
		var s, source, i, props;
		for (s = 1; s < arguments.length; ++s) {
			source = Object(arguments[s]);
			props = keys(source);
			for (i = 0; i < props.length; ++i) {
				objTarget[props[i]] = source[props[i]];
			}
		}
		return objTarget;
	};

	assignShim.shim = function shimObjectAssign() {
		if (!Object.assign) {
			Object.assign = assignShim;
		}
		return Object.assign || assignShim;
	};

	module.exports = assignShim;



/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(52);
	var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');
	var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var blacklistedKeys = {
		$window: true,
		$console: true,
		$parent: true,
		$self: true,
		$frames: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' && !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (!Object.keys) {
			Object.keys = keysShim;
		} else {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: https://github.com/paulmillr/array.prototype.find
	// Fixes and tests supplied by Duncan Hall <http://duncanhall.net> 
	(function(globals){
	  if (Array.prototype.find) return;

	  var find = function(predicate) {
	    var list = Object(this);
	    var length = list.length < 0 ? 0 : list.length >>> 0; // ES.ToUint32;
	    if (length === 0) return undefined;
	    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
	      throw new TypeError('Array#find: predicate must be a function');
	    }
	    var thisArg = arguments[1];
	    for (var i = 0, value; i < length; i++) {
	      value = list[i];
	      if (predicate.call(thisArg, value, i, list)) return value;
	    }
	    return undefined;
	  };

	  if (Object.defineProperty) {
	    try {
	      Object.defineProperty(Array.prototype, 'find', {
	        value: find, configurable: true, enumerable: false, writable: true
	      });
	    } catch(e) {}
	  }

	  if (!Array.prototype.find) {
	    Array.prototype.find = find;
	  }
	})(this);


/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	// jshint freeze: false, maxcomplexity: 11

	if (![].includes) {
	  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
	    if (this === undefined || this === null) {
	      throw new TypeError('Cannot convert this value to object');
	    }
	    var O = Object(this);
	    var len = parseInt(O.length) || 0;
	    if (len === 0) {
	      return false;
	    }
	    var n = parseInt(arguments[1]) || 0;
	    var k;
	    if (n >= 0) {
	      k = n;
	    } else {
	      k = len + n;
	      if (k < 0) {
	        k = 0;
	      }
	    }
	    while (k < len) {
	      var currentElement = O[k];
	      if (searchElement === currentElement ||
	         (searchElement !== searchElement && currentElement !== currentElement)) {
	        return true;
	      }
	      k++;
	    }
	    return false;
	  };
	}


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * Drop Area Plugin from @maccman
	 * http://blog.alexmaccaw.com/svbtle-image-uploading
	 * --
	 * Tweaked so we use the parent class of dropzone
	 */

	var $ = __webpack_require__(56);

	function dragEnter(e) {
	  e.preventDefault();
	}

	function dragOver(e) {
	  e.originalEvent.dataTransfer.dropEffect = "copy";
	  $(e.currentTarget).addClass('st-drag-over');
	  e.preventDefault();
	}

	function dragLeave(e) {
	  $(e.currentTarget).removeClass('st-drag-over');
	  e.preventDefault();
	}

	$.fn.dropArea = function(){
	  this.bind("dragenter", dragEnter).
	    bind("dragover",  dragOver).
	    bind("dragleave", dragLeave);
	  return this;
	};

	$.fn.noDropArea = function(){
	  this.unbind("dragenter").
	    unbind("dragover").
	    unbind("dragleave");
	  return this;
	};

	$.fn.caretToEnd = function(){
	  var range,selection;

	  range = document.createRange();
	  range.selectNodeContents(this[0]);
	  range.collapse(false);

	  selection = window.getSelection();
	  selection.removeAllRanges();
	  selection.addRange(range);

	  return this;
	};



/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_56__;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(56);
	var _ = __webpack_require__(2);
	var config = __webpack_require__(58);

	var urlRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

	var utils = {

	  getInstance: function(identifier) {
	    if (_.isUndefined(identifier)) {
	      return config.instances[0];
	    }

	    if (_.isString(identifier)) {
	      return config.instances.find(function(editor) {
	        return editor.ID === identifier;
	      });
	    }

	    return config.instances[identifier];
	  },

	  getInstanceBySelection: function() {
	    return utils.getInstance(
	      $(window.getSelection().anchorNode).
	        parents('.st-block').data('instance'));
	  },

	  getBlockBySelection: function() {
	    return utils.getInstanceBySelection().findBlockById(
	      $(window.getSelection().anchorNode).parents('.st-block').get(0).id
	    );
	  },

	  log: function() {
	    if (!_.isUndefined(console) && config.debug) {
	      console.log.apply(console, arguments);
	    }
	  },

	  isURI : function(string) {
	    return (urlRegex.test(string));
	  },

	  titleize: function(str){
	    if (str === null) {
	      return '';
	    }
	    str  = String(str).toLowerCase();
	    return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
	  },

	  classify: function(str){
	    return utils.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
	  },

	  capitalize : function(string) {
	    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	  },

	  flatten: function(obj) {
	    var x = {};
	    (Array.isArray(obj) ? obj : Object.keys(obj)).forEach(function (i) {
	      x[i] = true;
	    });
	    return x;
	  },

	  underscored: function(str){
	    return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
	    .replace(/[-\s]+/g, '_').toLowerCase();
	  },

	  reverse: function(str) {
	    return str.split("").reverse().join("");
	  },

	  toSlug: function(str) {
	    return str
	    .toLowerCase()
	    .replace(/[^\w ]+/g,'')
	    .replace(/ +/g,'-');
	  }

	};

	module.exports = utils;


/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	var drop_options = {
	  html: ['<div class="st-block__dropzone">',
	    '<span class="st-icon"><%= _.result(block, "icon_name") %></span>',
	    '<p><%= i18n.t("general:drop", { block: "<span>" + _.result(block, "title") + "</span>" }) %>',
	    '</p></div>'].join('\n'),
	    re_render_on_reorder: false
	};

	var paste_options = {
	  html: ['<input type="text" placeholder="<%= i18n.t("general:paste") %>"',
	    ' class="st-block__paste-input st-paste-block">'].join('')
	};

	var upload_options = {
	  html: [
	    '<div class="st-block__upload-container">',
	    '<input type="file" type="st-file-upload">',
	    '<button class="st-upload-btn"><%= i18n.t("general:upload") %></button>',
	    '</div>'
	  ].join('\n')
	};

	module.exports = {
	  debug: false,
	  scribeDebug: false,
	  skipValidation: false,
	  version: "0.4.0",
	  language: "en",

	  instances: [],

	  defaults: {
	    defaultType: false,
	    spinner: {
	      className: 'st-spinner',
	      lines: 9,
	      length: 8,
	      width: 3,
	      radius: 6,
	      color: '#000',
	      speed: 1.4,
	      trail: 57,
	      shadow: false,
	      left: '50%',
	      top: '50%'
	    },
	    Block: {
	      drop_options: drop_options,
	      paste_options: paste_options,
	      upload_options: upload_options,
	    },
	    blockLimit: 0,
	    blockTypeLimits: {},
	    required: [],
	    uploadUrl: '/attachments',
	    baseImageUrl: '/sir-trevor-uploads/',
	    errorsContainer: undefined,
	    convertFromMarkdown: true,
	    formatBar: {
	      commands: [
	        {
	          name: "Bold",
	          title: "bold",
	          cmd: "bold",
	          keyCode: 66,
	          text : "B"
	        },
	        {
	          name: "Italic",
	          title: "italic",
	          cmd: "italic",
	          keyCode: 73,
	          text : "i"
	        },
	        {
	          name: "Link",
	          title: "link",
	          iconName: "link",
	          cmd: "linkPrompt",
	          text : "link",
	        },
	        {
	          name: "Unlink",
	          title: "unlink",
	          iconName: "link",
	          cmd: "unlink",
	          text : "link",
	        },
	      ],
	    },
	  }
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var Locales = {
	  en: {
	    general: {
	      'delete':           'Delete?',
	      'drop':             'Drag __block__ here',
	      'paste':            'Or paste URL here',
	      'upload':           '...or choose a file',
	      'close':            'close',
	      'position':         'Position',
	      'wait':             'Please wait...',
	      'link':             'Enter a link'
	    },
	    errors: {
	      'title': "You have the following errors:",
	      'validation_fail': "__type__ block is invalid",
	      'block_empty': "__name__ must not be empty",
	      'type_missing': "You must have a block of type __type__",
	      'required_type_empty': "A required block type __type__ is empty",
	      'load_fail': "There was a problem loading the contents of the document"
	    },
	    blocks: {
	      text: {
	        'title': "Text"
	      },
	      list: {
	        'title': "List"
	      },
	      quote: {
	        'title': "Quote",
	        'credit_field': "Credit"
	      },
	      image: {
	        'title': "Image",
	        'upload_error': "There was a problem with your upload"
	      },
	      video: {
	        'title': "Video"
	      },
	      tweet: {
	        'title': "Tweet",
	        'fetch_error': "There was a problem fetching your tweet"
	      },
	      embedly: {
	        'title': "Embedly",
	        'fetch_error': "There was a problem fetching your embed",
	        'key_missing': "An Embedly API key must be present"
	      },
	      heading: {
	        'title': "Heading"
	      }
	    }
	  }
	};

	if (window.i18n === undefined) {
	  // Minimal i18n stub that only reads the English strings
	  utils.log("Using i18n stub");
	  window.i18n = {
	    t: function(key, options) {
	      var parts = key.split(':'), str, obj, part, i;

	      obj = Locales[config.language];

	      for(i = 0; i < parts.length; i++) {
	        part = parts[i];

	        if(!_.isUndefined(obj[part])) {
	          obj = obj[part];
	        }
	      }

	      str = obj;

	      if (!_.isString(str)) { return ""; }

	      if (str.indexOf('__') >= 0) {
	        Object.keys(options).forEach(function(opt) {
	          str = str.replace('__' + opt + '__', options[opt]);
	        });
	      }

	      return str;
	    }
	  };
	} else {
	  utils.log("Using i18next");
	  // Only use i18next when the library has been loaded by the user, keeps
	  // dependencies slim
	  i18n.init({ resStore: Locales, fallbackLng: config.language,
	            ns: { namespaces: ['general', 'blocks'], defaultNs: 'general' }
	  });
	}

	module.exports = Locales;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__(61);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    // AMD. Register as a module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return (root.Eventable = factory());
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined') {
	    // Node. Does not work with strict CommonJS, but only CommonJS-like
	    // enviroments that support module.exports, like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals
	    root.Eventable = factory();
	  }
	}(this, function() {

	  // Copy and pasted straight out of Backbone 1.0.0
	  // We'll try and keep this updated to the latest

	  var array = [];
	  var slice = array.slice;

	  function once(func) {
	    var memo, times = 2;

	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      } else {
	        func = null;
	      }
	      return memo;
	    };
	  }

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // custom events. You may bind with `on` or remove with `off` callback
	  // functions to an event; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Eventable = {

	    // Bind an event to a `callback` function. Passing `"all"` will bind
	    // the callback to all events fired.
	    on: function(name, callback, context) {
	      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	      this._events || (this._events = {});
	      var events = this._events[name] || (this._events[name] = []);
	      events.push({callback: callback, context: context, ctx: context || this});
	      return this;
	    },

	    // Bind an event to only be triggered a single time. After the first time
	    // the callback is invoked, it will be removed.
	    once: function(name, callback, context) {
	      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	      var self = this;
	      var func = once(function() {
	        self.off(name, func);
	        callback.apply(this, arguments);
	      });
	      func._callback = callback;
	      return this.on(name, func, context);
	    },

	    // Remove one or many callbacks. If `context` is null, removes all
	    // callbacks with that function. If `callback` is null, removes all
	    // callbacks for the event. If `name` is null, removes all bound
	    // callbacks for all events.
	    off: function(name, callback, context) {
	      var retain, ev, events, names, i, l, j, k;
	      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	      if (!name && !callback && !context) {
	        this._events = {};
	        return this;
	      }

	      names = name ? [name] : Object.keys(this._events);
	      for (i = 0, l = names.length; i < l; i++) {
	        name = names[i];
	        if (events = this._events[name]) {
	          this._events[name] = retain = [];
	          if (callback || context) {
	            for (j = 0, k = events.length; j < k; j++) {
	              ev = events[j];
	              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
	                  (context && context !== ev.context)) {
	                retain.push(ev);
	              }
	            }
	          }
	          if (!retain.length) delete this._events[name];
	        }
	      }

	      return this;
	    },

	    // Trigger one or many events, firing all bound callbacks. Callbacks are
	    // passed the same arguments as `trigger` is, apart from the event name
	    // (unless you're listening on `"all"`, which will cause your callback to
	    // receive the true name of the event as the first argument).
	    trigger: function(name) {
	      if (!this._events) return this;
	      var args = slice.call(arguments, 1);
	      if (!eventsApi(this, 'trigger', name, args)) return this;
	      var events = this._events[name];
	      var allEvents = this._events.all;
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, arguments);
	      return this;
	    },

	    // Tell this object to stop listening to either specific events ... or
	    // to every object it's currently listening to.
	    stopListening: function(obj, name, callback) {
	      var listeners = this._listeners;
	      if (!listeners) return this;
	      var deleteListener = !name && !callback;
	      if (typeof name === 'object') callback = this;
	      if (obj) (listeners = {})[obj._listenerId] = obj;
	      for (var id in listeners) {
	        listeners[id].off(name, callback, this);
	        if (deleteListener) delete this._listeners[id];
	      }
	      return this;
	    }

	  };

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Implement fancy features of the Events API such as multiple event
	  // names `"change blur"` and jQuery-style event maps `{change: action}`
	  // in terms of the existing API.
	  var eventsApi = function(obj, action, name, rest) {
	    if (!name) return true;

	    // Handle event maps.
	    if (typeof name === 'object') {
	      for (var key in name) {
	        obj[action].apply(obj, [key, name[key]].concat(rest));
	      }
	      return false;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return false;
	    }

	    return true;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
	    }
	  };

	  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

	  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
	  // listen to an event in another object ... keeping track of what it's
	  // listening to.
	  function addListenMethod(method, implementation) {
	    Eventable[method] = function(obj, name, callback) {
	      var listeners = this._listeners || (this._listeners = {});
	      var id = obj._listenerId || (obj._listenerId = (new Date()).getTime());
	      listeners[id] = obj;
	      if (typeof name === 'object') callback = this;
	      obj[implementation](name, callback, this);
	      return this;
	    };
	  }

	  addListenMethod('listenTo', 'on');
	  addListenMethod('listenToOnce', 'once');

	  // Aliases for backwards compatibility.
	  Eventable.bind   = Eventable.on;
	  Eventable.unbind = Eventable.off;

	  return Eventable;

	}));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = Object.assign({}, __webpack_require__(60));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * Sir Trevor Editor Store
	 * By default we store the complete data on the instances $el
	 * We can easily extend this and store it on some server or something
	 */

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);


	var EditorStore = function(data, mediator) {
	  this.mediator = mediator;
	  this.initialize(data ? data.trim() : '');
	};

	Object.assign(EditorStore.prototype, {

	  initialize: function(data) {
	    this.store = this._parseData(data) || { data: [] };
	  },

	  retrieve: function() {
	    return this.store;
	  },

	  toString: function(space) {
	    return JSON.stringify(this.store, undefined, space);
	  },

	  reset: function() {
	    utils.log("Resetting the EditorStore");
	    this.store = { data: [] };
	  },

	  addData: function(data) {
	    this.store.data.push(data);
	    return this.store;
	  },

	  _parseData: function(data) {
	    var result;

	    if (data.length === 0) { return result; }

	    try {
	      // Ensure the JSON string has a data element that's an array
	      var jsonStr = JSON.parse(data);
	      if (!_.isUndefined(jsonStr.data)) {
	        result = jsonStr;
	      }
	    } catch(e) {
	      this.mediator.trigger(
	        'errors:add',
	        { text: i18n.t("errors:load_fail") });

	      this.mediator.trigger('errors:render');

	      console.log('Sorry there has been a problem with parsing the JSON');
	      console.log(e);
	    }

	    return result;
	  }

	});

	module.exports = EditorStore;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor.Submittable
	 * --
	 * We need a global way of setting if the editor can and can't be submitted,
	 * and a way to disable the submit button and add messages (when appropriate)
	 * We also need this to be highly extensible so it can be overridden.
	 * This will be triggered *by anything* so it needs to subscribe to events.
	 */

	var $ = __webpack_require__(56);
	var utils = __webpack_require__(57);

	var EventBus = __webpack_require__(62);

	var Submittable = function($form) {
	  this.$form = $form;
	  this.initialize();
	};

	Object.assign(Submittable.prototype, {

	  initialize: function(){
	    this.submitBtn = this.$form.find("input[type='submit']");

	    var btnTitles = [];

	    this.submitBtn.each(function(i, btn){
	      btnTitles.push($(btn).attr('value'));
	    });

	    this.submitBtnTitles = btnTitles;
	    this.canSubmit = true;
	    this.globalUploadCount = 0;
	    this._bindEvents();
	  },

	  setSubmitButton: function(e, message) {
	    this.submitBtn.attr('value', message);
	  },

	  resetSubmitButton: function(){
	    var titles = this.submitBtnTitles;
	    this.submitBtn.each(function(index, item) {
	      $(item).attr('value', titles[index]);
	    });
	  },

	  onUploadStart: function(e){
	    this.globalUploadCount++;
	    utils.log('onUploadStart called ' + this.globalUploadCount);

	    if(this.globalUploadCount === 1) {
	      this._disableSubmitButton();
	    }
	  },

	  onUploadStop: function(e) {
	    this.globalUploadCount = (this.globalUploadCount <= 0) ? 0 : this.globalUploadCount - 1;

	    utils.log('onUploadStop called ' + this.globalUploadCount);

	    if(this.globalUploadCount === 0) {
	      this._enableSubmitButton();
	    }
	  },

	  onError: function(e){
	    utils.log('onError called');
	    this.canSubmit = false;
	  },

	  _disableSubmitButton: function(message){
	    this.setSubmitButton(null, message || i18n.t("general:wait"));
	    this.submitBtn
	    .attr('disabled', 'disabled')
	    .addClass('disabled');
	  },

	  _enableSubmitButton: function(){
	    this.resetSubmitButton();
	    this.submitBtn
	    .removeAttr('disabled')
	    .removeClass('disabled');
	  },

	  _events : {
	    "disableSubmitButton" : "_disableSubmitButton",
	    "enableSubmitButton"  : "_enableSubmitButton",
	    "setSubmitButton"     : "setSubmitButton",
	    "resetSubmitButton"   : "resetSubmitButton",
	    "onError"             : "onError",
	    "onUploadStart"       : "onUploadStart",
	    "onUploadStop"        : "onUploadStop"
	  },

	  _bindEvents: function(){
	    Object.keys(this._events).forEach(function(type) {
	      EventBus.on(type, this[this._events[type]], this);
	    }, this);
	  }

	});

	module.exports = Submittable;



/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	*   Sir Trevor Uploader
	*   Generic Upload implementation that can be extended for blocks
	*/

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var EventBus = __webpack_require__(62);

	module.exports = function(block, file, success, error) {

	  EventBus.trigger('onUploadStart');

	  var uid  = [block.blockID, (new Date()).getTime(), 'raw'].join('-');
	  var data = new FormData();

	  data.append('attachment[name]', file.name);
	  data.append('attachment[file]', file);
	  data.append('attachment[uid]', uid);

	  block.resetMessages();

	  var callbackSuccess = function(data) {
	    utils.log('Upload callback called');
	    EventBus.trigger('onUploadStop', data);

	    if (!_.isUndefined(success) && _.isFunction(success)) {
	      success.apply(block, arguments, data);
	    }
	  };

	  var callbackError = function(jqXHR, status, errorThrown) {
	    utils.log('Upload callback error called');
	    EventBus.trigger('onUploadStop', undefined, errorThrown, status, jqXHR);

	    if (!_.isUndefined(error) && _.isFunction(error)) {
	      error.call(block, status);
	    }
	  };

	  var url = block.uploadUrl || config.defaults.uploadUrl;

	  var xhr = $.ajax({
	    url: url,
	    data: data,
	    cache: false,
	    contentType: false,
	    processData: false,
	    dataType: 'json',
	    type: 'POST'
	  });

	  block.addQueuedItem(uid, xhr);

	  xhr.done(callbackSuccess)
	     .fail(callbackError)
	     .always(block.removeQueuedItem.bind(block, uid));

	  return xhr;
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Ajaxable: __webpack_require__(67),
	  Controllable: __webpack_require__(68),
	  Droppable: __webpack_require__(69),
	  Fetchable: __webpack_require__(70),
	  Pastable: __webpack_require__(71),
	  Uploadable: __webpack_require__(72),
	  MultiEditable: __webpack_require__(73)
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils = __webpack_require__(57);

	module.exports = {

	  mixinName: "Ajaxable",

	  ajaxable: true,

	  initializeAjaxable: function(){
	    this._queued = [];
	  },

	  addQueuedItem: function(name, deferred) {
	    utils.log("Adding queued item for " + this.blockID + " called " + name);

	    this._queued.push({ name: name, deferred: deferred });
	  },

	  removeQueuedItem: function(name) {
	    utils.log("Removing queued item for " + this.blockID + " called " + name);

	    this._queued = this._queued.filter(function(queued) {
	      return queued.name !== name;
	    });
	  },

	  hasItemsInQueue: function() {
	    return this._queued.length > 0;
	  },

	  resolveAllInQueue: function() {
	    this._queued.forEach(function(item){
	      utils.log("Aborting queued request: " + item.name);
	      item.deferred.abort();
	    }, this);
	  }

	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(56);

	var utils = __webpack_require__(57);

	module.exports = {

	  mixinName: "Controllable",

	  initializeControllable: function() {
	    utils.log("Adding controllable to block " + this.blockID);
	    this.$control_ui = $('<div>', {'class': 'st-block__control-ui'});
	    Object.keys(this.controls).forEach(
	      function(cmd) {
	        // Bind configured handler to current block context
	        this.addUiControl(cmd, this.controls[cmd].bind(this));
	      },
	      this
	    );
	    this.$inner.append(this.$control_ui);
	  },

	  getControlTemplate: function(cmd) {
	    return $("<a>",
	      { 'data-icon': cmd,
	        'class': 'st-icon st-block-control-ui-btn st-block-control-ui-btn--' + cmd
	      });
	  },

	  addUiControl: function(cmd, handler) {
	    this.$control_ui.append(this.getControlTemplate(cmd));
	    this.$control_ui.on('click', '.st-block-control-ui-btn--' + cmd, handler);
	  }
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/* Adds drop functionaltiy to this block */

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var EventBus = __webpack_require__(62);

	module.exports = {

	  mixinName: "Droppable",
	  valid_drop_file_types: ['File', 'Files', 'text/plain', 'text/uri-list'],
	  requireInputs: true,

	  initializeDroppable: function() {
	    utils.log("Adding droppable to block " + this.blockID);

	    this.drop_options = Object.assign({}, config.defaults.Block.drop_options, this.drop_options);

	    var drop_html = $(_.template(this.drop_options.html,
	                                 { block: this, _: _ }));

	    this.$editor.hide();
	    this.$inputs.append(drop_html);
	    this.$dropzone = drop_html;

	    // Bind our drop event
	    this.$dropzone.dropArea()
	                  .bind('drop', this._handleDrop.bind(this));

	    this.$inner.addClass('st-block__inner--droppable');
	  },

	  _handleDrop: function(e) {
	    e.preventDefault();

	    e = e.originalEvent;

	    var el = $(e.target),
	        types = e.dataTransfer.types;

	    el.removeClass('st-dropzone--dragover');

	    /*
	      Check the type we just received,
	      delegate it away to our blockTypes to process
	    */

	    if (types &&
	        types.some(function(type) {
	                     return this.valid_drop_file_types.includes(type);
	                   }, this)) {
	      this.onDrop(e.dataTransfer);
	    }

	    EventBus.trigger('block:content:dropped', this.blockID);
	  }

	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	module.exports = {

	  mixinName: "Fetchable",

	  initializeFetchable: function(){
	    this.withMixin(__webpack_require__(67));
	  },

	  fetch: function(options, success, failure){
	    var uid = _.uniqueId(this.blockID + "_fetch"),
	        xhr = $.ajax(options);

	    this.resetMessages();
	    this.addQueuedItem(uid, xhr);

	    if(!_.isUndefined(success)) {
	      xhr.done(success.bind(this));
	    }

	    if(!_.isUndefined(failure)) {
	      xhr.fail(failure.bind(this));
	    }

	    xhr.always(this.removeQueuedItem.bind(this, uid));

	    return xhr;
	  }

	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	module.exports = {

	  mixinName: "Pastable",
	  requireInputs: true,

	  initializePastable: function() {
	    utils.log("Adding pastable to block " + this.blockID);

	    this.paste_options = Object.assign(
	      {}, config.defaults.Block.paste_options, this.paste_options);
	    this.$inputs.append(_.template(this.paste_options.html, this));

	    this.$('.st-paste-block')
	      .bind('click', function(){ $(this).select(); })
	      .bind('paste', this._handleContentPaste)
	      .bind('submit', this._handleContentPaste);
	  }

	};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var fileUploader = __webpack_require__(65);

	module.exports = {

	  mixinName: "Uploadable",

	  uploadsCount: 0,
	  requireInputs: true,

	  initializeUploadable: function() {
	    utils.log("Adding uploadable to block " + this.blockID);
	    this.withMixin(__webpack_require__(67));

	    this.upload_options = Object.assign({}, config.defaults.Block.upload_options, this.upload_options);
	    this.$inputs.append(_.template(this.upload_options.html, this));
	  },

	  uploader: function(file, success, failure){
	    return fileUploader(this, file, success, failure);
	  }

	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var ScribeInterface = __webpack_require__(74);

	module.exports = {
	  mixinName: 'MultiEditable',

	  initializeMultiEditable: function() {
	    this.editors = {};
	  },

	  newTextEditor: function(template, content) {
	    // render template outside of dom
	    var wrapper = document.createElement('div');
	    wrapper.innerHTML = template;

	    var editor = wrapper.querySelector('.st-block__editor');
	    var id = _.uniqueId('editor-');
	    editor.dataset.editorId = id;
	    editor.addEventListener('keyup', this.getSelectionForFormatter);
	    editor.addEventListener('mouseup', this.getSelectionForFormatter);

	    var configureScribe =
	      _.isFunction(this.configureScribe) ? this.configureScribe.bind(this) : null;
	    var scribe = ScribeInterface.initScribeInstance(
	      editor, this.scribeOptions, configureScribe
	    );

	    scribe.setContent(content);

	    var editorObject = {
	      node: wrapper.removeChild(wrapper.firstChild),
	      el: editor,
	      scribe: scribe,
	      id: id
	    };

	    this.editors[id] = editorObject;

	    return editorObject;
	  },

	  getCurrentTextEditor: function() {
	    var id = document.activeElement.dataset.editorId;
	    var editor = this.getTextEditor(id);

	    if (editor) {
	      this.currentEditor = editor;
	    }

	    return this.currentEditor;
	  },

	  appendToTextEditor: function(id, content) {
	    var scribe = this.getTextEditor(id).scribe;
	    var selection = new scribe.api.Selection();
	    var range = selection.range.cloneRange();
	    var lastChild = scribe.el.lastChild;
	    range.setStartAfter(lastChild);
	    range.collapse(true);
	    selection.selection.removeAllRanges();
	    selection.selection.addRange(range);

	    if (content) {
	      scribe.insertHTML(content);
	    }
	  },

	  getCurrentScribeInstance: function() {
	    return this.getCurrentTextEditor().scribe;
	  },

	  getTextEditor: function(id) {
	    return this.editors[id];
	  },

	  removeTextEditor: function(id) {
	    delete this.editors[id];
	  },

	  // scribe commands for FormatBar
	  execTextBlockCommand: function(cmdName) {
	    return ScribeInterface.execTextBlockCommand(
	      this.getCurrentScribeInstance(), cmdName
	    );
	  },

	  queryTextBlockCommandState: function(cmdName) {
	    return ScribeInterface.queryTextBlockCommandState(
	      this.getCurrentScribeInstance(), cmdName
	    );
	  },
	};


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(75);
	var Scribe = __webpack_require__(77);
	var config = __webpack_require__(58);

	var scribePluginFormatterPlainTextConvertNewLinesToHTML = __webpack_require__(143);
	var scribePluginLinkPromptCommand = __webpack_require__(144);
	var scribePluginSanitizer = __webpack_require__(145);

	var sanitizeDefaults = {
	  p: true,
	  a: {
	    href: true,
	    target: '_blank',
	    rel: true
	  },
	  i: true,
	  b: true,
	  strong: true,
	  em: true
	};

	module.exports = {

	  initScribeInstance: function(el, scribeOptions, configureScribe) {

	    scribeOptions = scribeOptions || {};

	    var scribeConfig = {debug: config.scribeDebug};
	    var tags = sanitizeDefaults;

	    if (_.isObject(scribeOptions)) {
	      scribeConfig = Object.assign(scribeConfig, scribeOptions);
	    }

	    var scribe = new Scribe(el, scribeConfig);

	    if (scribeOptions.hasOwnProperty("tags")) {
	      tags = Object.assign(sanitizeDefaults, scribeOptions.tags);
	    }

	    scribe.use(scribePluginFormatterPlainTextConvertNewLinesToHTML());
	    scribe.use(scribePluginLinkPromptCommand());
	    scribe.use(scribePluginSanitizer({tags: tags}));

	    if (_.isFunction(configureScribe)) {
	      configureScribe.call(this, scribe);
	    }

	    return scribe;
	  },

	  execTextBlockCommand: function(scribeInstance, cmdName) {
	    if (_.isUndefined(scribeInstance)) {
	      throw "No Scribe instance found to query command";
	    }

	    var cmd = scribeInstance.getCommand(cmdName);
	    scribeInstance.el.focus();
	    return cmd.execute();
	  },

	  queryTextBlockCommandState: function(scribeInstance, cmdName) {
	    if (_.isUndefined(scribeInstance)) {
	      throw "No Scribe instance found to query command";
	    }

	    var cmd = scribeInstance.getCommand(cmdName),
	        sel = new scribeInstance.api.Selection();
	    return sel.range && cmd.queryState();
	  },
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * Lo-Dash 2.4.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre ES5 environments */
	  var undefined;

	  /** Used to pool arrays and objects used internally */
	  var arrayPool = [],
	      objectPool = [];

	  /** Used to generate unique IDs */
	  var idCounter = 0;

	  /** Used internally to indicate various things */
	  var indicatorObject = {};

	  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
	  var keyPrefix = +new Date + '';

	  /** Used as the size when optimizations are enabled for large arrays */
	  var largeArraySize = 75;

	  /** Used as the max size of the `arrayPool` and `objectPool` */
	  var maxPoolSize = 40;

	  /** Used to detect and test whitespace */
	  var whitespace = (
	    // whitespace
	    ' \t\x0B\f\xA0\ufeff' +

	    // line terminators
	    '\n\r\u2028\u2029' +

	    // unicode category "Zs" space separators
	    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
	  );

	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;

	  /** Used to detected named functions */
	  var reFuncName = /^\s*function[ \n\r\t]+\w/;

	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;

	  /** Used to match leading whitespace and zeros to be removed */
	  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;

	  /** Used to detect functions containing a `this` reference */
	  var reThis = /\bthis\b/;

	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

	  /** Used to assign default `context` object properties */
	  var contextProps = [
	    'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number', 'Object',
	    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
	    'parseInt', 'setTimeout'
	  ];

	  /** Used to fix the JScript [[DontEnum]] bug */
	  var shadowedProps = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];

	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;

	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      errorClass = '[object Error]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';

	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

	  /** Used as an internal `_.debounce` options object */
	  var debounceOptions = {
	    'leading': false,
	    'maxWait': 0,
	    'trailing': false
	  };

	  /** Used as the property descriptor for `__bindData__` */
	  var descriptor = {
	    'configurable': false,
	    'enumerable': false,
	    'value': null,
	    'writable': false
	  };

	  /** Used as the data object for `iteratorTemplate` */
	  var iteratorData = {
	    'args': '',
	    'array': null,
	    'bottom': '',
	    'firstArg': '',
	    'init': '',
	    'keys': null,
	    'loop': '',
	    'shadowedProps': null,
	    'support': null,
	    'top': '',
	    'useHas': false
	  };

	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };

	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;

	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect the popular CommonJS extension `module.exports` */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = objectTypes[typeof global] && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The base implementation of `_.indexOf` without support for binary searches
	   * or `fromIndex` constraints.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value or `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    var index = (fromIndex || 0) - 1,
	        length = array ? array.length : 0;

	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * An implementation of `_.contains` for cache objects that mimics the return
	   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
	   *
	   * @private
	   * @param {Object} cache The cache object to inspect.
	   * @param {*} value The value to search for.
	   * @returns {number} Returns `0` if `value` is found, else `-1`.
	   */
	  function cacheIndexOf(cache, value) {
	    var type = typeof value;
	    cache = cache.cache;

	    if (type == 'boolean' || value == null) {
	      return cache[value] ? 0 : -1;
	    }
	    if (type != 'number' && type != 'string') {
	      type = 'object';
	    }
	    var key = type == 'number' ? value : keyPrefix + value;
	    cache = (cache = cache[type]) && cache[key];

	    return type == 'object'
	      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
	      : (cache ? 0 : -1);
	  }

	  /**
	   * Adds a given value to the corresponding cache object.
	   *
	   * @private
	   * @param {*} value The value to add to the cache.
	   */
	  function cachePush(value) {
	    var cache = this.cache,
	        type = typeof value;

	    if (type == 'boolean' || value == null) {
	      cache[value] = true;
	    } else {
	      if (type != 'number' && type != 'string') {
	        type = 'object';
	      }
	      var key = type == 'number' ? value : keyPrefix + value,
	          typeCache = cache[type] || (cache[type] = {});

	      if (type == 'object') {
	        (typeCache[key] || (typeCache[key] = [])).push(value);
	      } else {
	        typeCache[key] = true;
	      }
	    }
	  }

	  /**
	   * Used by `_.max` and `_.min` as the default callback when a given
	   * collection is a string value.
	   *
	   * @private
	   * @param {string} value The character to inspect.
	   * @returns {number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }

	  /**
	   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ac = a.criteria,
	        bc = b.criteria,
	        index = -1,
	        length = ac.length;

	    while (++index < length) {
	      var value = ac[index],
	          other = bc[index];

	      if (value !== other) {
	        if (value > other || typeof value == 'undefined') {
	          return 1;
	        }
	        if (value < other || typeof other == 'undefined') {
	          return -1;
	        }
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to return the same value for
	    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See http://code.google.com/p/v8/issues/detail?id=90
	    return a.index - b.index;
	  }

	  /**
	   * Creates a cache object to optimize linear searches of large arrays.
	   *
	   * @private
	   * @param {Array} [array=[]] The array to search.
	   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
	   */
	  function createCache(array) {
	    var index = -1,
	        length = array.length,
	        first = array[0],
	        mid = array[(length / 2) | 0],
	        last = array[length - 1];

	    if (first && typeof first == 'object' &&
	        mid && typeof mid == 'object' && last && typeof last == 'object') {
	      return false;
	    }
	    var cache = getObject();
	    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

	    var result = getObject();
	    result.array = array;
	    result.cache = cache;
	    result.push = cachePush;

	    while (++index < length) {
	      result.push(array[index]);
	    }
	    return result;
	  }

	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {string} match The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }

	  /**
	   * Gets an array from the array pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Array} The array from the pool.
	   */
	  function getArray() {
	    return arrayPool.pop() || [];
	  }

	  /**
	   * Gets an object from the object pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Object} The object from the pool.
	   */
	  function getObject() {
	    return objectPool.pop() || {
	      'array': null,
	      'cache': null,
	      'criteria': null,
	      'false': false,
	      'index': 0,
	      'null': false,
	      'number': null,
	      'object': null,
	      'push': null,
	      'string': null,
	      'true': false,
	      'undefined': false,
	      'value': null
	    };
	  }

	  /**
	   * Checks if `value` is a DOM node in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
	   */
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }

	  /**
	   * Releases the given array back to the array pool.
	   *
	   * @private
	   * @param {Array} [array] The array to release.
	   */
	  function releaseArray(array) {
	    array.length = 0;
	    if (arrayPool.length < maxPoolSize) {
	      arrayPool.push(array);
	    }
	  }

	  /**
	   * Releases the given object back to the object pool.
	   *
	   * @private
	   * @param {Object} [object] The object to release.
	   */
	  function releaseObject(object) {
	    var cache = object.cache;
	    if (cache) {
	      releaseObject(cache);
	    }
	    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
	    if (objectPool.length < maxPoolSize) {
	      objectPool.push(object);
	    }
	  }

	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used instead of `Array#slice` to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to slice.
	   * @param {number} start The start index.
	   * @param {number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);

	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new `lodash` function using the given context object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns the `lodash` function.
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

	    /** Native constructor references */
	    var Array = context.Array,
	        Boolean = context.Boolean,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;

	    /**
	     * Used for `Array` method references.
	     *
	     * Normally `Array.prototype` would suffice, however, using an array literal
	     * avoids issues in Narwhal.
	     */
	    var arrayRef = [];

	    /** Used for native method references */
	    var errorProto = Error.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;

	    /** Used to restore the original `_` reference in `noConflict` */
	    var oldDash = context._;

	    /** Used to resolve the internal [[Class]] of values */
	    var toString = objectProto.toString;

	    /** Used to detect if a method is native */
	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );

	    /** Native method shortcuts */
	    var ceil = Math.ceil,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        fnToString = Function.prototype.toString,
	        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	        hasOwnProperty = objectProto.hasOwnProperty,
	        push = arrayRef.push,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        setTimeout = context.setTimeout,
	        splice = arrayRef.splice,
	        unshift = arrayRef.unshift;

	    /** Used to set meta data on functions */
	    var defineProperty = (function() {
	      // IE 8 only accepts DOM elements
	      try {
	        var o = {},
	            func = isNative(func = Object.defineProperty) && func,
	            result = func(o, o, o) && func;
	      } catch(e) { }
	      return result;
	    }());

	    /* Native method shortcuts for methods with the same name as other `lodash` methods */
	    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
	        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	        nativeIsFinite = context.isFinite,
	        nativeIsNaN = context.isNaN,
	        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;

	    /** Used to lookup a built-in constructor by [[Class]] */
	    var ctorByClass = {};
	    ctorByClass[arrayClass] = Array;
	    ctorByClass[boolClass] = Boolean;
	    ctorByClass[dateClass] = Date;
	    ctorByClass[funcClass] = Function;
	    ctorByClass[objectClass] = Object;
	    ctorByClass[numberClass] = Number;
	    ctorByClass[regexpClass] = RegExp;
	    ctorByClass[stringClass] = String;

	    /** Used to avoid iterating non-enumerable properties in IE < 9 */
	    var nonEnumProps = {};
	    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	    nonEnumProps[objectClass] = { 'constructor': true };

	    (function() {
	      var length = shadowedProps.length;
	      while (length--) {
	        var key = shadowedProps[length];
	        for (var className in nonEnumProps) {
	          if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
	            nonEnumProps[className][key] = false;
	          }
	        }
	      }
	    }());

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object which wraps the given value to enable intuitive
	     * method chaining.
	     *
	     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	     * and `unshift`
	     *
	     * Chaining is supported in custom builds as long as the `value` method is
	     * implicitly or explicitly included in the build.
	     *
	     * The chainable wrapper functions are:
	     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
	     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
	     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
	     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
	     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
	     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
	     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
	     * and `zip`
	     *
	     * The non-chainable wrapper functions are:
	     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
	     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
	     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
	     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
	     * `template`, `unescape`, `uniqueId`, and `value`
	     *
	     * The wrapper functions `first` and `last` return wrapped values when `n` is
	     * provided, otherwise they return unwrapped values.
	     *
	     * Explicit chaining can be enabled by using the `_.chain` method.
	     *
	     * @name _
	     * @constructor
	     * @category Chaining
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns a `lodash` instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(num) {
	     *   return num * num;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
	      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
	       ? value
	       : new lodashWrapper(value);
	    }

	    /**
	     * A fast path for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @param {boolean} chainAll A flag to enable chaining for all methods
	     * @returns {Object} Returns a `lodash` instance.
	     */
	    function lodashWrapper(value, chainAll) {
	      this.__chain__ = !!chainAll;
	      this.__wrapped__ = value;
	    }
	    // ensure `new lodashWrapper` is an instance of `lodash`
	    lodashWrapper.prototype = lodash.prototype;

	    /**
	     * An object used to flag environments features.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};

	    (function() {
	      var ctor = function() { this.x = 1; },
	          object = { '0': 1, 'length': 1 },
	          props = [];

	      ctor.prototype = { 'valueOf': 1, 'y': 1 };
	      for (var key in new ctor) { props.push(key); }
	      for (key in arguments) { }

	      /**
	       * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsClass = toString.call(arguments) == argsClass;

	      /**
	       * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);

	      /**
	       * Detect if `name` or `message` properties of `Error.prototype` are
	       * enumerable by default. (IE < 9, Safari < 5.1)
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

	      /**
	       * Detect if `prototype` properties are enumerable by default.
	       *
	       * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	       * (if the prototype or a property on the prototype has been set)
	       * incorrectly sets a function's `prototype` property [[Enumerable]]
	       * value to `true`.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

	      /**
	       * Detect if functions can be decompiled by `Function#toString`
	       * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

	      /**
	       * Detect if `Function#name` is supported (all but IE).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcNames = typeof Function.name == 'string';

	      /**
	       * Detect if `arguments` object indexes are non-enumerable
	       * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumArgs = key != 0;

	      /**
	       * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	       *
	       * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	       * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumShadows = !/valueOf/.test(props);

	      /**
	       * Detect if own properties are iterated after inherited properties (all but IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.ownLast = props[0] != 'x';

	      /**
	       * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
	       *
	       * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
	       * and `splice()` functions that fail to remove the last element, `value[0]`,
	       * of array-like objects even though the `length` property is set to `0`.
	       * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
	       * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);

	      /**
	       * Detect lack of support for accessing string characters by index.
	       *
	       * IE < 8 can't access characters by index and IE 8 can only access
	       * characters by index on string literals.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

	      /**
	       * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
	       * and that the JS engine errors when attempting to coerce an object to
	       * a string without a `toString` function.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      try {
	        support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
	      } catch(e) {
	        support.nodeClass = true;
	      }
	    }(1));

	    /**
	     * By default, the template delimiters used by Lo-Dash are similar to those in
	     * embedded Ruby (ERB). Change the following template settings to use alternative
	     * delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {

	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': /<%-([\s\S]+?)%>/g,

	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': /<%([\s\S]+?)%>/g,

	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,

	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',

	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {

	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };

	    /*--------------------------------------------------------------------------*/

	    /**
	     * The template used to create iterator functions.
	     *
	     * @private
	     * @param {Object} data The data object used to populate the text.
	     * @returns {string} Returns the interpolated text.
	     */
	    var iteratorTemplate = function(obj) {

	      var __p = 'var index, iterable = ' +
	      (obj.firstArg) +
	      ', result = ' +
	      (obj.init) +
	      ';\nif (!iterable) return result;\n' +
	      (obj.top) +
	      ';';
	       if (obj.array) {
	      __p += '\nvar length = iterable.length; index = -1;\nif (' +
	      (obj.array) +
	      ') {  ';
	       if (support.unindexedChars) {
	      __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
	       }
	      __p += '\n  while (++index < length) {\n    ' +
	      (obj.loop) +
	      ';\n  }\n}\nelse {  ';
	       } else if (support.nonEnumArgs) {
	      __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
	      (obj.loop) +
	      ';\n    }\n  } else {  ';
	       }

	       if (support.enumPrototypes) {
	      __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
	       }

	       if (support.enumErrorProps) {
	      __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
	       }

	          var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }

	       if (obj.useHas && obj.keys) {
	      __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
	          if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }  ';
	       } else {
	      __p += '\n  for (index in iterable) {\n';
	          if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }    ';
	       if (support.nonEnumShadows) {
	      __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
	       for (k = 0; k < 7; k++) {
	      __p += '\n    index = \'' +
	      (obj.shadowedProps[k]) +
	      '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
	              if (!obj.useHas) {
	      __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
	       }
	      __p += ') {\n      ' +
	      (obj.loop) +
	      ';\n    }      ';
	       }
	      __p += '\n  }    ';
	       }

	       }

	       if (obj.array || support.nonEnumArgs) {
	      __p += '\n}';
	       }
	      __p +=
	      (obj.bottom) +
	      ';\nreturn result';

	      return __p
	    };

	    /*--------------------------------------------------------------------------*/

	    /**
	     * The base implementation of `_.bind` that creates the bound function and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new bound function.
	     */
	    function baseBind(bindData) {
	      var func = bindData[0],
	          partialArgs = bindData[2],
	          thisArg = bindData[4];

	      function bound() {
	        // `Function#bind` spec
	        // http://es5.github.io/#x15.3.4.5
	        if (partialArgs) {
	          // avoid `arguments` object deoptimizations by using `slice` instead
	          // of `Array.prototype.slice.call` and not assigning `arguments` to a
	          // variable as a ternary expression
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        // mimic the constructor's `return` behavior
	        // http://es5.github.io/#x13.2.2
	        if (this instanceof bound) {
	          // ensure `new bound` is an instance of `func`
	          var thisBinding = baseCreate(func.prototype),
	              result = func.apply(thisBinding, args || arguments);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisArg, args || arguments);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }

	    /**
	     * The base implementation of `_.clone` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, callback, stackA, stackB) {
	      if (callback) {
	        var result = callback(value);
	        if (typeof result != 'undefined') {
	          return result;
	        }
	      }
	      // inspect [[Class]]
	      var isObj = isObject(value);
	      if (isObj) {
	        var className = toString.call(value);
	        if (!cloneableClasses[className] || (!support.nodeClass && isNode(value))) {
	          return value;
	        }
	        var ctor = ctorByClass[className];
	        switch (className) {
	          case boolClass:
	          case dateClass:
	            return new ctor(+value);

	          case numberClass:
	          case stringClass:
	            return new ctor(value);

	          case regexpClass:
	            result = ctor(value.source, reFlags.exec(value));
	            result.lastIndex = value.lastIndex;
	            return result;
	        }
	      } else {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isDeep) {
	        // check for circular references and return corresponding clone
	        var initedStack = !stackA;
	        stackA || (stackA = getArray());
	        stackB || (stackB = getArray());

	        var length = stackA.length;
	        while (length--) {
	          if (stackA[length] == value) {
	            return stackB[length];
	          }
	        }
	        result = isArr ? ctor(value.length) : {};
	      }
	      else {
	        result = isArr ? slice(value) : assign({}, value);
	      }
	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	      // exit for shallow clone
	      if (!isDeep) {
	        return result;
	      }
	      // add the source value to the stack of traversed objects
	      // and associate it with its clone
	      stackA.push(value);
	      stackB.push(result);

	      // recursively populate clone (susceptible to call stack limits)
	      (isArr ? baseEach : forOwn)(value, function(objValue, key) {
	        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
	      });

	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    function baseCreate(prototype, properties) {
	      return isObject(prototype) ? nativeCreate(prototype) : {};
	    }
	    // fallback for browsers without `Object.create`
	    if (!nativeCreate) {
	      baseCreate = (function() {
	        function Object() {}
	        return function(prototype) {
	          if (isObject(prototype)) {
	            Object.prototype = prototype;
	            var result = new Object;
	            Object.prototype = null;
	          }
	          return result || context.Object();
	        };
	      }());
	    }

	    /**
	     * The base implementation of `_.createCallback` without support for creating
	     * "_.pluck" or "_.where" style callbacks.
	     *
	     * @private
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     */
	    function baseCreateCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      // exit early for no `thisArg` or already bound by `Function#bind`
	      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	        return func;
	      }
	      var bindData = func.__bindData__;
	      if (typeof bindData == 'undefined') {
	        if (support.funcNames) {
	          bindData = !func.name;
	        }
	        bindData = bindData || !support.funcDecomp;
	        if (!bindData) {
	          var source = fnToString.call(func);
	          if (!support.funcNames) {
	            bindData = !reFuncName.test(source);
	          }
	          if (!bindData) {
	            // checks if `func` references the `this` keyword and stores the result
	            bindData = reThis.test(source);
	            setBindData(func, bindData);
	          }
	        }
	      }
	      // exit early if there are no `this` references or `func` is bound
	      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 2: return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	      }
	      return bind(func, thisArg);
	    }

	    /**
	     * The base implementation of `createWrapper` that creates the wrapper and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new function.
	     */
	    function baseCreateWrapper(bindData) {
	      var func = bindData[0],
	          bitmask = bindData[1],
	          partialArgs = bindData[2],
	          partialRightArgs = bindData[3],
	          thisArg = bindData[4],
	          arity = bindData[5];

	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          key = func;

	      function bound() {
	        var thisBinding = isBind ? thisArg : this;
	        if (partialArgs) {
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        if (partialRightArgs || isCurry) {
	          args || (args = slice(arguments));
	          if (partialRightArgs) {
	            push.apply(args, partialRightArgs);
	          }
	          if (isCurry && args.length < arity) {
	            bitmask |= 16 & ~32;
	            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	          }
	        }
	        args || (args = arguments);
	        if (isBindKey) {
	          func = thisBinding[key];
	        }
	        if (this instanceof bound) {
	          thisBinding = baseCreate(func.prototype);
	          var result = func.apply(thisBinding, args);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisBinding, args);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }

	    /**
	     * The base implementation of `_.difference` that accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {Array} [values] The array of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
	          result = [];

	      if (isLarge) {
	        var cache = createCache(values);
	        if (cache) {
	          indexOf = cacheIndexOf;
	          values = cache;
	        } else {
	          isLarge = false;
	        }
	      }
	      while (++index < length) {
	        var value = array[index];
	        if (indexOf(values, value) < 0) {
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseObject(values);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.flatten` without support for callback
	     * shorthands or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
	     * @param {number} [fromIndex=0] The index to start from.
	     * @returns {Array} Returns a new flattened array.
	     */
	    function baseFlatten(array, isShallow, isStrict, fromIndex) {
	      var index = (fromIndex || 0) - 1,
	          length = array ? array.length : 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index];

	        if (value && typeof value == 'object' && typeof value.length == 'number'
	            && (isArray(value) || isArguments(value))) {
	          // recursively flatten arrays (susceptible to call stack limits)
	          if (!isShallow) {
	            value = baseFlatten(value, isShallow, isStrict);
	          }
	          var valIndex = -1,
	              valLength = value.length,
	              resIndex = result.length;

	          result.length += valLength;
	          while (++valIndex < valLength) {
	            result[resIndex++] = value[valIndex];
	          }
	        } else if (!isStrict) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
	     * that allows partial "_.where" style comparisons.
	     *
	     * @private
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
	      // used to indicate that when comparing objects, `a` has at least the properties of `b`
	      if (callback) {
	        var result = callback(a, b);
	        if (typeof result != 'undefined') {
	          return !!result;
	        }
	      }
	      // exit early for identical values
	      if (a === b) {
	        // treat `+0` vs. `-0` as not equal
	        return a !== 0 || (1 / a == 1 / b);
	      }
	      var type = typeof a,
	          otherType = typeof b;

	      // exit early for unlike primitive values
	      if (a === a &&
	          !(a && objectTypes[type]) &&
	          !(b && objectTypes[otherType])) {
	        return false;
	      }
	      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
	      // http://es5.github.io/#x15.3.4.4
	      if (a == null || b == null) {
	        return a === b;
	      }
	      // compare [[Class]] names
	      var className = toString.call(a),
	          otherClass = toString.call(b);

	      if (className == argsClass) {
	        className = objectClass;
	      }
	      if (otherClass == argsClass) {
	        otherClass = objectClass;
	      }
	      if (className != otherClass) {
	        return false;
	      }
	      switch (className) {
	        case boolClass:
	        case dateClass:
	          // coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	          return +a == +b;

	        case numberClass:
	          // treat `NaN` vs. `NaN` as equal
	          return (a != +a)
	            ? b != +b
	            // but treat `+0` vs. `-0` as not equal
	            : (a == 0 ? (1 / a == 1 / b) : a == +b);

	        case regexpClass:
	        case stringClass:
	          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	          // treat string primitives and their corresponding object instances as equal
	          return a == String(b);
	      }
	      var isArr = className == arrayClass;
	      if (!isArr) {
	        // unwrap any `lodash` wrapped values
	        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
	            bWrapped = hasOwnProperty.call(b, '__wrapped__');

	        if (aWrapped || bWrapped) {
	          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
	        }
	        // exit for functions and DOM nodes
	        if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
	          return false;
	        }
	        // in older versions of Opera, `arguments` objects have `Array` constructors
	        var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
	            ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

	        // non `Object` object instances with different constructors are not equal
	        if (ctorA != ctorB &&
	              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	              ('constructor' in a && 'constructor' in b)
	            ) {
	          return false;
	        }
	      }
	      // assume cyclic structures are equal
	      // the algorithm for detecting cyclic structures is adapted from ES 5.1
	      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	      var initedStack = !stackA;
	      stackA || (stackA = getArray());
	      stackB || (stackB = getArray());

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == a) {
	          return stackB[length] == b;
	        }
	      }
	      var size = 0;
	      result = true;

	      // add `a` and `b` to the stack of traversed objects
	      stackA.push(a);
	      stackB.push(b);

	      // recursively compare objects and arrays (susceptible to call stack limits)
	      if (isArr) {
	        // compare lengths to determine if a deep comparison is necessary
	        length = a.length;
	        size = b.length;
	        result = size == length;

	        if (result || isWhere) {
	          // deep compare the contents, ignoring non-numeric properties
	          while (size--) {
	            var index = length,
	                value = b[size];

	            if (isWhere) {
	              while (index--) {
	                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
	                  break;
	                }
	              }
	            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
	              break;
	            }
	          }
	        }
	      }
	      else {
	        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	        // which, in this case, is more costly
	        forIn(b, function(value, key, b) {
	          if (hasOwnProperty.call(b, key)) {
	            // count the number of properties.
	            size++;
	            // deep compare each property value.
	            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
	          }
	        });

	        if (result && !isWhere) {
	          // ensure both objects have the same number of properties
	          forIn(a, function(value, key, a) {
	            if (hasOwnProperty.call(a, key)) {
	              // `size` will be `-1` if `a` has more properties than `b`
	              return (result = --size > -1);
	            }
	          });
	        }
	      }
	      stackA.pop();
	      stackB.pop();

	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.merge` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     */
	    function baseMerge(object, source, callback, stackA, stackB) {
	      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];

	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            var isShallow;
	            if (callback) {
	              result = callback(value, source);
	              if ((isShallow = typeof result != 'undefined')) {
	                value = result;
	              }
	            }
	            if (!isShallow) {
	              value = isArr
	                ? (isArray(value) ? value : [])
	                : (isPlainObject(value) ? value : {});
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);

	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!isShallow) {
	              baseMerge(value, source, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }

	    /**
	     * The base implementation of `_.random` without argument juggling or support
	     * for returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns a random number.
	     */
	    function baseRandom(min, max) {
	      return min + floor(nativeRandom() * (max - min + 1));
	    }

	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function} [callback] The function called per iteration.
	     * @returns {Array} Returns a duplicate-value-free array.
	     */
	    function baseUniq(array, isSorted, callback) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          result = [];

	      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
	          seen = (callback || isLarge) ? getArray() : result;

	      if (isLarge) {
	        var cache = createCache(seen);
	        indexOf = cacheIndexOf;
	        seen = cache;
	      }
	      while (++index < length) {
	        var value = array[index],
	            computed = callback ? callback(value, index, array) : value;

	        if (isSorted
	              ? !index || seen[seen.length - 1] !== computed
	              : indexOf(seen, computed) < 0
	            ) {
	          if (callback || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseArray(seen.array);
	        releaseObject(seen);
	      } else if (callback) {
	        releaseArray(seen);
	      }
	      return result;
	    }

	    /**
	     * Creates a function that aggregates a collection, creating an object composed
	     * of keys generated from the results of running each element of the collection
	     * through a callback. The given `setter` function sets the keys and values
	     * of the composed object.
	     *
	     * @private
	     * @param {Function} setter The setter function.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter) {
	      return function(collection, callback, thisArg) {
	        var result = {};
	        callback = lodash.createCallback(callback, thisArg, 3);

	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;

	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, callback(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, callback(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that, when called, either curries or invokes `func`
	     * with an optional `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of method flags to compose.
	     *  The bitmask may be composed of the following flags:
	     *  1 - `_.bind`
	     *  2 - `_.bindKey`
	     *  4 - `_.curry`
	     *  8 - `_.curry` (bound)
	     *  16 - `_.partial`
	     *  32 - `_.partialRight`
	     * @param {Array} [partialArgs] An array of arguments to prepend to those
	     *  provided to the new function.
	     * @param {Array} [partialRightArgs] An array of arguments to append to those
	     *  provided to the new function.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new function.
	     */
	    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          isPartial = bitmask & 16,
	          isPartialRight = bitmask & 32;

	      if (!isBindKey && !isFunction(func)) {
	        throw new TypeError;
	      }
	      if (isPartial && !partialArgs.length) {
	        bitmask &= ~16;
	        isPartial = partialArgs = false;
	      }
	      if (isPartialRight && !partialRightArgs.length) {
	        bitmask &= ~32;
	        isPartialRight = partialRightArgs = false;
	      }
	      var bindData = func && func.__bindData__;
	      if (bindData && bindData !== true) {
	        // clone `bindData`
	        bindData = slice(bindData);
	        if (bindData[2]) {
	          bindData[2] = slice(bindData[2]);
	        }
	        if (bindData[3]) {
	          bindData[3] = slice(bindData[3]);
	        }
	        // set `thisBinding` is not previously bound
	        if (isBind && !(bindData[1] & 1)) {
	          bindData[4] = thisArg;
	        }
	        // set if previously bound but not currently (subsequent curried functions)
	        if (!isBind && bindData[1] & 1) {
	          bitmask |= 8;
	        }
	        // set curried arity if not yet set
	        if (isCurry && !(bindData[1] & 4)) {
	          bindData[5] = arity;
	        }
	        // append partial left arguments
	        if (isPartial) {
	          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	        }
	        // append partial right arguments
	        if (isPartialRight) {
	          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	        }
	        // merge flags
	        bindData[1] |= bitmask;
	        return createWrapper.apply(null, bindData);
	      }
	      // fast path for `_.bind`
	      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	    }

	    /**
	     * Creates compiled iteration functions.
	     *
	     * @private
	     * @param {...Object} [options] The compile options object(s).
	     * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
	     * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
	     * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
	     * @param {string} [options.args] A comma separated string of iteration function arguments.
	     * @param {string} [options.top] Code to execute before the iteration branches.
	     * @param {string} [options.loop] Code to execute in the object loop.
	     * @param {string} [options.bottom] Code to execute after the iteration branches.
	     * @returns {Function} Returns the compiled function.
	     */
	    function createIterator() {
	      // data properties
	      iteratorData.shadowedProps = shadowedProps;

	      // iterator options
	      iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
	      iteratorData.init = 'iterable';
	      iteratorData.useHas = true;

	      // merge options into a template data object
	      for (var object, index = 0; object = arguments[index]; index++) {
	        for (var key in object) {
	          iteratorData[key] = object[key];
	        }
	      }
	      var args = iteratorData.args;
	      iteratorData.firstArg = /^[^,]+/.exec(args)[0];

	      // create the function factory
	      var factory = Function(
	          'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
	          'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
	          'objectTypes, nonEnumProps, stringClass, stringProto, toString',
	        'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
	      );

	      // return the compiled function
	      return factory(
	        baseCreateCallback, errorClass, errorProto, hasOwnProperty,
	        indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
	        objectTypes, nonEnumProps, stringClass, stringProto, toString
	      );
	    }

	    /**
	     * Used by `escape` to convert characters to HTML entities.
	     *
	     * @private
	     * @param {string} match The matched character to escape.
	     * @returns {string} Returns the escaped character.
	     */
	    function escapeHtmlChar(match) {
	      return htmlEscapes[match];
	    }

	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized, this method returns the custom method, otherwise it returns
	     * the `baseIndexOf` function.
	     *
	     * @private
	     * @returns {Function} Returns the "indexOf" function.
	     */
	    function getIndexOf() {
	      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
	      return result;
	    }

	    /**
	     * Checks if `value` is a native function.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	     */
	    function isNative(value) {
	      return typeof value == 'function' && reNative.test(value);
	    }

	    /**
	     * Sets `this` binding data on a given function.
	     *
	     * @private
	     * @param {Function} func The function to set data on.
	     * @param {Array} value The data array to set.
	     */
	    var setBindData = !defineProperty ? noop : function(func, value) {
	      descriptor.value = value;
	      defineProperty(func, '__bindData__', descriptor);
	      descriptor.value = null;
	    };

	    /**
	     * A fallback implementation of `isPlainObject` which checks if a given value
	     * is an object created by the `Object` constructor, assuming objects created
	     * by the `Object` constructor have no inherited enumerable properties and that
	     * there are no `Object.prototype` extensions.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     */
	    function shimIsPlainObject(value) {
	      var ctor,
	          result;

	      // avoid non Object objects, `arguments` objects, and DOM elements
	      if (!(value && toString.call(value) == objectClass) ||
	          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||
	          (!support.argsClass && isArguments(value)) ||
	          (!support.nodeClass && isNode(value))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      if (support.ownLast) {
	        forIn(value, function(value, key, object) {
	          result = hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result !== false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	    }

	    /**
	     * Used by `unescape` to convert HTML entities to characters.
	     *
	     * @private
	     * @param {string} match The matched character to unescape.
	     * @returns {string} Returns the unescaped character.
	     */
	    function unescapeHtmlChar(match) {
	      return htmlUnescapes[match];
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Checks if `value` is an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
	     * @example
	     *
	     * (function() { return _.isArguments(arguments); })(1, 2, 3);
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == argsClass || false;
	    }
	    // fallback for browsers that can't detect `arguments` objects by [[Class]]
	    if (!support.argsClass) {
	      isArguments = function(value) {
	        return value && typeof value == 'object' && typeof value.length == 'number' &&
	          hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
	      };
	    }

	    /**
	     * Checks if `value` is an array.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
	     * @example
	     *
	     * (function() { return _.isArray(arguments); })();
	     * // => false
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     */
	    var isArray = nativeIsArray || function(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == arrayClass || false;
	    };

	    /**
	     * A fallback implementation of `Object.keys` which produces an array of the
	     * given object's own enumerable property names.
	     *
	     * @private
	     * @type Function
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     */
	    var shimKeys = createIterator({
	      'args': 'object',
	      'init': '[]',
	      'top': 'if (!(objectTypes[typeof object])) return result',
	      'loop': 'result.push(index)'
	    });

	    /**
	     * Creates an array composed of the own enumerable property names of an object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     * @example
	     *
	     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      if (!isObject(object)) {
	        return [];
	      }
	      if ((support.enumPrototypes && typeof object == 'function') ||
	          (support.nonEnumArgs && object.length && isArguments(object))) {
	        return shimKeys(object);
	      }
	      return nativeKeys(object);
	    };

	    /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
	    var eachIteratorOptions = {
	      'args': 'collection, callback, thisArg',
	      'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
	      'array': "typeof length == 'number'",
	      'keys': keys,
	      'loop': 'if (callback(iterable[index], index, collection) === false) return result'
	    };

	    /** Reusable iterator options for `assign` and `defaults` */
	    var defaultsIteratorOptions = {
	      'args': 'object, source, guard',
	      'top':
	        'var args = arguments,\n' +
	        '    argsIndex = 0,\n' +
	        "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
	        'while (++argsIndex < argsLength) {\n' +
	        '  iterable = args[argsIndex];\n' +
	        '  if (iterable && objectTypes[typeof iterable]) {',
	      'keys': keys,
	      'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
	      'bottom': '  }\n}'
	    };

	    /** Reusable iterator options for `forIn` and `forOwn` */
	    var forOwnIteratorOptions = {
	      'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
	      'array': false
	    };

	    /**
	     * Used to convert characters to HTML entities:
	     *
	     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	     * don't require escaping in HTML and have no special meaning unless they're part
	     * of a tag or an unquoted attribute value.
	     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	     */
	    var htmlEscapes = {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#39;'
	    };

	    /** Used to convert HTML entities to characters */
	    var htmlUnescapes = invert(htmlEscapes);

	    /** Used to match HTML entities and HTML characters */
	    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
	        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

	    /**
	     * A function compiled to iterate `arguments` objects, arrays, objects, and
	     * strings consistenly across environments, executing the callback for each
	     * element in the collection. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index|key, collection). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @private
	     * @type Function
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEach = createIterator(eachIteratorOptions);

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources will overwrite property assignments of previous
	     * sources. If a callback is provided it will be executed to produce the
	     * assigned values. The callback is bound to `thisArg` and invoked with two
	     * arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @alias extend
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize assigning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
	     * // => { 'name': 'fred', 'employer': 'slate' }
	     *
	     * var defaults = _.partialRight(_.assign, function(a, b) {
	     *   return typeof a == 'undefined' ? b : a;
	     * });
	     *
	     * var object = { 'name': 'barney' };
	     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var assign = createIterator(defaultsIteratorOptions, {
	      'top':
	        defaultsIteratorOptions.top.replace(';',
	          ';\n' +
	          "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
	          '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
	          "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
	          '  callback = args[--argsLength];\n' +
	          '}'
	        ),
	      'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
	    });

	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
	     * be cloned, otherwise they will be assigned by reference. If a callback
	     * is provided it will be executed to produce the cloned values. If the
	     * callback returns `undefined` cloning will be handled by the method instead.
	     * The callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var shallow = _.clone(characters);
	     * shallow[0] === characters[0];
	     * // => true
	     *
	     * var deep = _.clone(characters, true);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * _.mixin({
	     *   'clone': _.partialRight(_.clone, function(value) {
	     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	     *   })
	     * });
	     *
	     * var clone = _.clone(document.body);
	     * clone.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, callback, thisArg) {
	      // allows working with "Collections" methods without using their `index`
	      // and `collection` arguments for `isDeep` and `callback`
	      if (typeof isDeep != 'boolean' && isDeep != null) {
	        thisArg = callback;
	        callback = isDeep;
	        isDeep = false;
	      }
	      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }

	    /**
	     * Creates a deep clone of `value`. If a callback is provided it will be
	     * executed to produce the cloned values. If the callback returns `undefined`
	     * cloning will be handled by the method instead. The callback is bound to
	     * `thisArg` and invoked with one argument; (value).
	     *
	     * Note: This method is loosely based on the structured clone algorithm. Functions
	     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var deep = _.cloneDeep(characters);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'node': element
	     * };
	     *
	     * var clone = _.cloneDeep(view, function(value) {
	     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
	     * });
	     *
	     * clone.node == view.node;
	     * // => false
	     */
	    function cloneDeep(value, callback, thisArg) {
	      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }

	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties) {
	      var result = baseCreate(prototype);
	      return properties ? assign(result, properties) : result;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional defaults of the same property will be ignored.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param- {Object} [guard] Allows working with `_.reduce` without using its
	     *  `key` and `object` arguments as sources.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var object = { 'name': 'barney' };
	     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var defaults = createIterator(defaultsIteratorOptions);

	    /**
	     * This method is like `_.findIndex` except that it returns the key of the
	     * first element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': false },
	     *   'fred': {    'age': 40, 'blocked': true },
	     *   'pebbles': { 'age': 1,  'blocked': false }
	     * };
	     *
	     * _.findKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (property order is not guaranteed across environments)
	     *
	     * // using "_.where" callback shorthand
	     * _.findKey(characters, { 'age': 1 });
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findKey(characters, 'blocked');
	     * // => 'fred'
	     */
	    function findKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * This method is like `_.findKey` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': true },
	     *   'fred': {    'age': 40, 'blocked': false },
	     *   'pebbles': { 'age': 1,  'blocked': true }
	     * };
	     *
	     * _.findLastKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastKey(characters, { 'age': 40 });
	     * // => 'fred'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastKey(characters, 'blocked');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwnRight(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * Iterates over own and inherited enumerable properties of an object,
	     * executing the callback for each property. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, key, object). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forIn(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
	     */
	    var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
	      'useHas': false
	    });

	    /**
	     * This method is like `_.forIn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forInRight(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
	     */
	    function forInRight(object, callback, thisArg) {
	      var pairs = [];

	      forIn(object, function(value, key) {
	        pairs.push(key, value);
	      });

	      var length = pairs.length;
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(pairs[length--], pairs[length], object) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * Iterates over own enumerable properties of an object, executing the callback
	     * for each property. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, key, object). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	     */
	    var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);

	    /**
	     * This method is like `_.forOwn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
	     */
	    function forOwnRight(object, callback, thisArg) {
	      var props = keys(object),
	          length = props.length;

	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        var key = props[length];
	        if (callback(object[key], key, object) === false) {
	          break;
	        }
	      }
	      return object;
	    }

	    /**
	     * Creates a sorted array of property names of all enumerable properties,
	     * own and inherited, of `object` that have function values.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names that have function values.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	     */
	    function functions(object) {
	      var result = [];
	      forIn(object, function(value, key) {
	        if (isFunction(value)) {
	          result.push(key);
	        }
	      });
	      return result.sort();
	    }

	    /**
	     * Checks if the specified property name exists as a direct property of `object`,
	     * instead of an inherited property.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to check.
	     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
	     * @example
	     *
	     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	     * // => true
	     */
	    function has(object, key) {
	      return object ? hasOwnProperty.call(object, key) : false;
	    }

	    /**
	     * Creates an object composed of the inverted keys and values of the given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to invert.
	     * @returns {Object} Returns the created inverted object.
	     * @example
	     *
	     * _.invert({ 'first': 'fred', 'second': 'barney' });
	     * // => { 'fred': 'first', 'barney': 'second' }
	     */
	    function invert(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index];
	        result[object[key]] = key;
	      }
	      return result;
	    }

	    /**
	     * Checks if `value` is a boolean value.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
	     * @example
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false ||
	        value && typeof value == 'object' && toString.call(value) == boolClass || false;
	    }

	    /**
	     * Checks if `value` is a date.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     */
	    function isDate(value) {
	      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
	    }

	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     */
	    function isElement(value) {
	      return value && value.nodeType === 1 || false;
	    }

	    /**
	     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	     * length of `0` and objects with no own enumerable properties are considered
	     * "empty".
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({});
	     * // => true
	     *
	     * _.isEmpty('');
	     * // => true
	     */
	    function isEmpty(value) {
	      var result = true;
	      if (!value) {
	        return result;
	      }
	      var className = toString.call(value),
	          length = value.length;

	      if ((className == arrayClass || className == stringClass ||
	          (support.argsClass ? className == argsClass : isArguments(value))) ||
	          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	        return !length;
	      }
	      forOwn(value, function() {
	        return (result = false);
	      });
	      return result;
	    }

	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent to each other. If a callback is provided it will be executed
	     * to compare values. If the callback returns `undefined` comparisons will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (a, b).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var copy = { 'name': 'fred' };
	     *
	     * object == copy;
	     * // => false
	     *
	     * _.isEqual(object, copy);
	     * // => true
	     *
	     * var words = ['hello', 'goodbye'];
	     * var otherWords = ['hi', 'goodbye'];
	     *
	     * _.isEqual(words, otherWords, function(a, b) {
	     *   var reGreet = /^(?:hello|hi)$/i,
	     *       aGreet = _.isString(a) && reGreet.test(a),
	     *       bGreet = _.isString(b) && reGreet.test(b);
	     *
	     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	     * });
	     * // => true
	     */
	    function isEqual(a, b, callback, thisArg) {
	      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
	    }

	    /**
	     * Checks if `value` is, or can be coerced to, a finite number.
	     *
	     * Note: This is not the same as native `isFinite` which will return true for
	     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
	     * @example
	     *
	     * _.isFinite(-101);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => true
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite('');
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	    }

	    /**
	     * Checks if `value` is a function.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     */
	    function isFunction(value) {
	      return typeof value == 'function';
	    }
	    // fallback for older versions of Chrome and Safari
	    if (isFunction(/x/)) {
	      isFunction = function(value) {
	        return typeof value == 'function' && toString.call(value) == funcClass;
	      };
	    }

	    /**
	     * Checks if `value` is the language type of Object.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // check if the value is the ECMAScript language type of Object
	      // http://es5.github.io/#x8
	      // and avoid a V8 bug
	      // http://code.google.com/p/v8/issues/detail?id=2291
	      return !!(value && objectTypes[typeof value]);
	    }

	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * Note: This is not the same as native `isNaN` which will return `true` for
	     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // `NaN` as a primitive is the only value that is not equal to itself
	      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	      return isNumber(value) && value != +value;
	    }

	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(undefined);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }

	    /**
	     * Checks if `value` is a number.
	     *
	     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4 * 5);
	     * // => true
	     */
	    function isNumber(value) {
	      return typeof value == 'number' ||
	        value && typeof value == 'object' && toString.call(value) == numberClass || false;
	    }

	    /**
	     * Checks if `value` is an object created by the `Object` constructor.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * _.isPlainObject(new Shape);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     */
	    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	      if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {
	        return false;
	      }
	      var valueOf = value.valueOf,
	          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	      return objProto
	        ? (value == objProto || getPrototypeOf(value) == objProto)
	        : shimIsPlainObject(value);
	    };

	    /**
	     * Checks if `value` is a regular expression.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
	     * @example
	     *
	     * _.isRegExp(/fred/);
	     * // => true
	     */
	    function isRegExp(value) {
	      return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;
	    }

	    /**
	     * Checks if `value` is a string.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('fred');
	     * // => true
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        value && typeof value == 'object' && toString.call(value) == stringClass || false;
	    }

	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     */
	    function isUndefined(value) {
	      return typeof value == 'undefined';
	    }

	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     *
	     * var characters = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.mapValues(characters, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 }
	     */
	    function mapValues(object, callback, thisArg) {
	      var result = {};
	      callback = lodash.createCallback(callback, thisArg, 3);

	      forOwn(object, function(value, key, object) {
	        result[key] = callback(value, key, object);
	      });
	      return result;
	    }

	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * will overwrite property assignments of previous sources. If a callback is
	     * provided it will be executed to produce the merged values of the destination
	     * and source properties. If the callback returns `undefined` merging will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var names = {
	     *   'characters': [
	     *     { 'name': 'barney' },
	     *     { 'name': 'fred' }
	     *   ]
	     * };
	     *
	     * var ages = {
	     *   'characters': [
	     *     { 'age': 36 },
	     *     { 'age': 40 }
	     *   ]
	     * };
	     *
	     * _.merge(names, ages);
	     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
	     *
	     * var food = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var otherFood = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(food, otherFood, function(a, b) {
	     *   return _.isArray(a) ? a.concat(b) : undefined;
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	     */
	    function merge(object) {
	      var args = arguments,
	          length = 2;

	      if (!isObject(object)) {
	        return object;
	      }
	      // allows working with `_.reduce` and `_.reduceRight` without using
	      // their `index` and `collection` arguments
	      if (typeof args[2] != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	      var sources = slice(arguments, 1, length),
	          index = -1,
	          stackA = getArray(),
	          stackB = getArray();

	      while (++index < length) {
	        baseMerge(object, sources[index], callback, stackA, stackB);
	      }
	      releaseArray(stackA);
	      releaseArray(stackB);
	      return object;
	    }

	    /**
	     * Creates a shallow clone of `object` excluding the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` omitting the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The properties to omit or the
	     *  function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object without the omitted properties.
	     * @example
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
	     * // => { 'name': 'fred' }
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
	     *   return typeof value == 'number';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function omit(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var props = [];
	        forIn(object, function(value, key) {
	          props.push(key);
	        });
	        props = baseDifference(props, baseFlatten(arguments, true, false, 1));

	        var index = -1,
	            length = props.length;

	        while (++index < length) {
	          var key = props[index];
	          result[key] = object[key];
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (!callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Creates a two dimensional array of an object's key-value pairs,
	     * i.e. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
	     */
	    function pairs(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }

	    /**
	     * Creates a shallow clone of `object` composed of the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` picking the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The function called per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object composed of the picked properties.
	     * @example
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
	     * // => { 'name': 'fred' }
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
	     *   return key.charAt(0) != '_';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function pick(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var index = -1,
	            props = baseFlatten(arguments, true, false, 1),
	            length = isObject(object) ? props.length : 0;

	        while (++index < length) {
	          var key = props[index];
	          if (key in object) {
	            result[key] = object[key];
	          }
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * An alternative to `_.reduce` this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable properties through a callback, with each callback execution
	     * potentially mutating the `accumulator` object. The callback is bound to
	     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
	     * Callbacks may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
	     *   num *= num;
	     *   if (num % 2) {
	     *     return result.push(num) < 3;
	     *   }
	     * });
	     * // => [1, 9, 25]
	     *
	     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     * });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function transform(object, callback, accumulator, thisArg) {
	      var isArr = isArray(object);
	      if (accumulator == null) {
	        if (isArr) {
	          accumulator = [];
	        } else {
	          var ctor = object && object.constructor,
	              proto = ctor && ctor.prototype;

	          accumulator = baseCreate(proto);
	        }
	      }
	      if (callback) {
	        callback = lodash.createCallback(callback, thisArg, 4);
	        (isArr ? baseEach : forOwn)(object, function(value, index, object) {
	          return callback(accumulator, value, index, object);
	        });
	      }
	      return accumulator;
	    }

	    /**
	     * Creates an array composed of the own enumerable property values of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property values.
	     * @example
	     *
	     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => [1, 2, 3] (property order is not guaranteed across environments)
	     */
	    function values(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements from the specified indexes, or keys, of the
	     * `collection`. Indexes may be specified as individual arguments or as arrays
	     * of indexes.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
	     *   to retrieve, specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns a new array of elements corresponding to the
	     *  provided indexes.
	     * @example
	     *
	     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	     * // => ['a', 'c', 'e']
	     *
	     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
	     * // => ['fred', 'pebbles']
	     */
	    function at(collection) {
	      var args = arguments,
	          index = -1,
	          props = baseFlatten(args, true, false, 1),
	          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
	          result = Array(length);

	      if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      while(++index < length) {
	        result[index] = collection[props[index]];
	      }
	      return result;
	    }

	    /**
	     * Checks if a given value is present in a collection using strict equality
	     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
	     * offset from the end of the collection.
	     *
	     * @static
	     * @memberOf _
	     * @alias include
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {*} target The value to check for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
	     * @example
	     *
	     * _.contains([1, 2, 3], 1);
	     * // => true
	     *
	     * _.contains([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.contains('pebbles', 'eb');
	     * // => true
	     */
	    function contains(collection, target, fromIndex) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = collection ? collection.length : 0,
	          result = false;

	      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	      if (isArray(collection)) {
	        result = indexOf(collection, target, fromIndex) > -1;
	      } else if (typeof length == 'number') {
	        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
	      } else {
	        baseEach(collection, function(value) {
	          if (++index >= fromIndex) {
	            return !(result = value === target);
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through the callback. The corresponding value
	     * of each key is the number of times the key was returned by the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });

	    /**
	     * Checks if the given callback returns truey value for **all** elements of
	     * a collection. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if all elements passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes']);
	     * // => false
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.every(characters, 'age');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.every(characters, { 'age': 36 });
	     * // => false
	     */
	    function every(collection, callback, thisArg) {
	      var result = true;
	      callback = lodash.createCallback(callback, thisArg, 3);

	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          if (!(result = !!callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return (result = !!callback(value, index, collection));
	        });
	      }
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, returning an array of all elements
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that passed the callback check.
	     * @example
	     *
	     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [2, 4, 6]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.filter(characters, 'blocked');
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     *
	     * // using "_.where" callback shorthand
	     * _.filter(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     */
	    function filter(collection, callback, thisArg) {
	      var result = [];
	      callback = lodash.createCallback(callback, thisArg, 3);

	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, returning the first element that
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect, findWhere
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.find(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
	     *
	     * // using "_.where" callback shorthand
	     * _.find(characters, { 'age': 1 });
	     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.find(characters, 'blocked');
	     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
	     */
	    function find(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);

	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            return value;
	          }
	        }
	      } else {
	        var result;
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result = value;
	            return false;
	          }
	        });
	        return result;
	      }
	    }

	    /**
	     * This method is like `_.find` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(num) {
	     *   return num % 2 == 1;
	     * });
	     * // => 3
	     */
	    function findLast(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forEachRight(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result = value;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * Iterates over elements of a collection, executing the callback for each
	     * element. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * Note: As with other "Collections" methods, objects with a `length` property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
	     * // => logs each number and returns '1,2,3'
	     *
	     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
	     * // => logs each number and returns the object (property order is not guaranteed across environments)
	     */
	    function forEach(collection, callback, thisArg) {
	      if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          if (callback(collection[index], index, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, callback, thisArg);
	      }
	      return collection;
	    }

	    /**
	     * This method is like `_.forEach` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
	     * // => logs each number from right to left and returns '3,2,1'
	     */
	    function forEachRight(collection, callback, thisArg) {
	      var iterable = collection,
	          length = collection ? collection.length : 0;

	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (length--) {
	          if (callback(collection[length], length, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        if (typeof length != 'number') {
	          var props = keys(collection);
	          length = props.length;
	        } else if (support.unindexedChars && isString(collection)) {
	          iterable = collection.split('');
	        }
	        baseEach(collection, function(value, key, collection) {
	          key = props ? props[--length] : --length;
	          return callback(iterable[key], key, collection);
	        });
	      }
	      return collection;
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of a collection through the callback. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of the collection through the given callback. The corresponding
	     * value of each key is the last element responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keys = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keys, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });

	    /**
	     * Invokes the method named by `methodName` on each element in the `collection`
	     * returning an array of the results of each invoked method. Additional arguments
	     * will be provided to each invoked method. If `methodName` is a function it
	     * will be invoked for, and `this` bound to, each element in the `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [arg] Arguments to invoke the method with.
	     * @returns {Array} Returns a new array of the results of each invoked method.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    function invoke(collection, methodName) {
	      var args = slice(arguments, 2),
	          index = -1,
	          isFunc = typeof methodName == 'function',
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      forEach(collection, function(value) {
	        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	      });
	      return result;
	    }

	    /**
	     * Creates an array of values by running each element in the collection
	     * through the callback. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of the results of each `callback` execution.
	     * @example
	     *
	     * _.map([1, 2, 3], function(num) { return num * 3; });
	     * // => [3, 6, 9]
	     *
	     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	     * // => [3, 6, 9] (property order is not guaranteed across environments)
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, callback, thisArg) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      callback = lodash.createCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (++index < length) {
	          result[index] = callback(collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, key, collection) {
	          result[++index] = callback(value, key, collection);
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the maximum value of a collection. If the collection is empty or
	     * falsey `-Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'fred', 'age': 40 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.max(characters, 'age');
	     * // => { 'name': 'fred', 'age': 40 };
	     */
	    function max(collection, callback, thisArg) {
	      var computed = -Infinity,
	          result = computed;

	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (value > result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);

	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current > computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the minimum value of a collection. If the collection is empty or
	     * falsey `Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'barney', 'age': 36 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.min(characters, 'age');
	     * // => { 'name': 'barney', 'age': 36 };
	     */
	    function min(collection, callback, thisArg) {
	      var computed = Infinity,
	          result = computed;

	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          var value = collection[index];
	          if (value < result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);

	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current < computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }

	    /**
	     * Retrieves the value of a specified property from all elements in the collection.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {string} property The name of the property to pluck.
	     * @returns {Array} Returns a new array of property values.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    var pluck = map;

	    /**
	     * Reduces a collection to a value which is the accumulated result of running
	     * each element in the collection through the callback, where each successive
	     * callback execution consumes the return value of the previous execution. If
	     * `accumulator` is not provided the first element of the collection will be
	     * used as the initial `accumulator` value. The callback is bound to `thisArg`
	     * and invoked with four arguments; (accumulator, value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var sum = _.reduce([1, 2, 3], function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function reduce(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);

	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        if (noaccum) {
	          accumulator = collection[++index];
	        }
	        while (++index < length) {
	          accumulator = callback(accumulator, collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          accumulator = noaccum
	            ? (noaccum = false, value)
	            : callback(accumulator, value, index, collection)
	        });
	      }
	      return accumulator;
	    }

	    /**
	     * This method is like `_.reduce` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var list = [[0, 1], [2, 3], [4, 5]];
	     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	      forEachRight(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }

	    /**
	     * The opposite of `_.filter` this method returns the elements of a
	     * collection that the callback does **not** return truey for.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that failed the callback check.
	     * @example
	     *
	     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [1, 3, 5]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.reject(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     *
	     * // using "_.where" callback shorthand
	     * _.reject(characters, { 'age': 36 });
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     */
	    function reject(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	      return filter(collection, function(value, index, collection) {
	        return !callback(value, index, collection);
	      });
	    }

	    /**
	     * Retrieves a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Allows working with functions like `_.map`
	     *  without using their `index` arguments as `n`.
	     * @returns {Array} Returns the random sample(s) of `collection`.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (collection && typeof collection.length != 'number') {
	        collection = values(collection);
	      } else if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      if (n == null || guard) {
	        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
	      }
	      var result = shuffle(collection);
	      result.length = nativeMin(nativeMax(0, n), result.length);
	      return result;
	    }

	    /**
	     * Creates an array of shuffled values, using a version of the Fisher-Yates
	     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns a new shuffled collection.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4, 5, 6]);
	     * // => [4, 1, 6, 3, 5, 2]
	     */
	    function shuffle(collection) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      forEach(collection, function(value) {
	        var rand = baseRandom(0, ++index);
	        result[index] = result[rand];
	        result[rand] = value;
	      });
	      return result;
	    }

	    /**
	     * Gets the size of the `collection` by returning `collection.length` for arrays
	     * and array-like objects or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns `collection.length` or number of own enumerable properties.
	     * @example
	     *
	     * _.size([1, 2]);
	     * // => 2
	     *
	     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => 3
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? collection.length : 0;
	      return typeof length == 'number' ? length : keys(collection).length;
	    }

	    /**
	     * Checks if the callback returns a truey value for **any** element of a
	     * collection. The function returns as soon as it finds a passing value and
	     * does not iterate over the entire collection. The callback is bound to
	     * `thisArg` and invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if any element passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.some(characters, 'blocked');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.some(characters, { 'age': 1 });
	     * // => false
	     */
	    function some(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);

	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;

	        while (++index < length) {
	          if ((result = callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return !(result = callback(value, index, collection));
	        });
	      }
	      return !!result;
	    }

	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through the callback. This method
	     * performs a stable sort, that is, it will preserve the original sort order
	     * of equal elements. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an array of property names is provided for `callback` the collection
	     * will be sorted by each property value.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of sorted elements.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	     * // => [3, 1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'barney',  'age': 26 },
	     *   { 'name': 'fred',    'age': 30 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(_.sortBy(characters, 'age'), _.values);
	     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
	     *
	     * // sorting by multiple properties
	     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
	     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
	     */
	    function sortBy(collection, callback, thisArg) {
	      var index = -1,
	          isArr = isArray(callback),
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);

	      if (!isArr) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      forEach(collection, function(value, key, collection) {
	        var object = result[++index] = getObject();
	        if (isArr) {
	          object.criteria = map(callback, function(key) { return value[key]; });
	        } else {
	          (object.criteria = getArray())[0] = callback(value, key, collection);
	        }
	        object.index = index;
	        object.value = value;
	      });

	      length = result.length;
	      result.sort(compareAscending);
	      while (length--) {
	        var object = result[length];
	        result[length] = object.value;
	        if (!isArr) {
	          releaseArray(object.criteria);
	        }
	        releaseObject(object);
	      }
	      return result;
	    }

	    /**
	     * Converts the `collection` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to convert.
	     * @returns {Array} Returns the new converted array.
	     * @example
	     *
	     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	     * // => [2, 3, 4]
	     */
	    function toArray(collection) {
	      if (collection && typeof collection.length == 'number') {
	        return (support.unindexedChars && isString(collection))
	          ? collection.split('')
	          : slice(collection);
	      }
	      return values(collection);
	    }

	    /**
	     * Performs a deep comparison of each element in a `collection` to the given
	     * `properties` object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Object} props The object of property values to filter by.
	     * @returns {Array} Returns a new array of elements that have the given properties.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.where(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
	     *
	     * _.where(characters, { 'pets': ['dino'] });
	     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
	     */
	    var where = filter;

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are all falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array excluding all values of the provided arrays using strict
	     * equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	     * // => [1, 3, 4]
	     */
	    function difference(array) {
	      return baseDifference(array, baseFlatten(arguments, true, true, 1));
	    }

	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.findIndex(characters, function(chr) {
	     *   return chr.age < 20;
	     * });
	     * // => 2
	     *
	     * // using "_.where" callback shorthand
	     * _.findIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findIndex(characters, 'blocked');
	     * // => 1
	     */
	    function findIndex(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;

	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        if (callback(array[index], index, array)) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': true },
	     *   { 'name': 'fred',    'age': 40, 'blocked': false },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
	     * ];
	     *
	     * _.findLastIndex(characters, function(chr) {
	     *   return chr.age > 30;
	     * });
	     * // => 1
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastIndex(characters, 'blocked');
	     * // => 2
	     */
	    function findLastIndex(array, callback, thisArg) {
	      var length = array ? array.length : 0;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(array[length], length, array)) {
	          return length;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Gets the first element or first `n` elements of an array. If a callback
	     * is provided elements at the beginning of the array are returned as long
	     * as the callback returns truey. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head, take
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the first element(s) of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.first([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.first(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function first(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[0] : undefined;
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }

	    /**
	     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
	     * is truey, the array will only be flattened a single level. If a callback
	     * is provided each element of the array is passed through the callback before
	     * flattening. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, 4];
	     *
	     * _.flatten([1, [2], [3, [[4]]]], true);
	     * // => [1, 2, 3, [[4]]];
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.flatten(characters, 'pets');
	     * // => ['hoppy', 'baby puss', 'dino']
	     */
	    function flatten(array, isShallow, callback, thisArg) {
	      // juggle arguments
	      if (typeof isShallow != 'boolean' && isShallow != null) {
	        thisArg = callback;
	        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
	        isShallow = false;
	      }
	      if (callback != null) {
	        array = map(array, callback, thisArg);
	      }
	      return baseFlatten(array, isShallow);
	    }

	    /**
	     * Gets the index at which the first occurrence of `value` is found using
	     * strict equality for comparisons, i.e. `===`. If the array is already sorted
	     * providing `true` for `fromIndex` will run a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 1
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 4
	     *
	     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      if (typeof fromIndex == 'number') {
	        var length = array ? array.length : 0;
	        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
	      } else if (fromIndex) {
	        var index = sortedIndex(array, value);
	        return array[index] === value ? index : -1;
	      }
	      return baseIndexOf(array, value, fromIndex);
	    }

	    /**
	     * Gets all but the last element or last `n` elements of an array. If a
	     * callback is provided elements at the end of the array are excluded from
	     * the result as long as the callback returns truey. The callback is bound
	     * to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.initial([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.initial([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [1]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.initial(characters, 'blocked');
	     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function initial(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : callback || n;
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	    }

	    /**
	     * Creates an array of unique values present in all provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of shared values.
	     * @example
	     *
	     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2]
	     */
	    function intersection() {
	      var args = [],
	          argsIndex = -1,
	          argsLength = arguments.length,
	          caches = getArray(),
	          indexOf = getIndexOf(),
	          trustIndexOf = indexOf === baseIndexOf,
	          seen = getArray();

	      while (++argsIndex < argsLength) {
	        var value = arguments[argsIndex];
	        if (isArray(value) || isArguments(value)) {
	          args.push(value);
	          caches.push(trustIndexOf && value.length >= largeArraySize &&
	            createCache(argsIndex ? args[argsIndex] : seen));
	        }
	      }
	      var array = args[0],
	          index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      outer:
	      while (++index < length) {
	        var cache = caches[0];
	        value = array[index];

	        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
	          argsIndex = argsLength;
	          (cache || seen).push(value);
	          while (--argsIndex) {
	            cache = caches[argsIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	      }
	      while (argsLength--) {
	        cache = caches[argsLength];
	        if (cache) {
	          releaseObject(cache);
	        }
	      }
	      releaseArray(caches);
	      releaseArray(seen);
	      return result;
	    }

	    /**
	     * Gets the last element or last `n` elements of an array. If a callback is
	     * provided elements at the end of the array are returned as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the last element(s) of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     *
	     * _.last([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.last([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.last(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.last(characters, { 'employer': 'na' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function last(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;

	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[length - 1] : undefined;
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }

	    /**
	     * Gets the index at which the last occurrence of `value` is found using strict
	     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	     * as the offset from the end of the collection.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 4
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 1
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var index = array ? array.length : 0;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Removes all provided values from the given array using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {...*} [value] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull(array) {
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = args.length,
	          length = array ? array.length : 0;

	      while (++argsIndex < argsLength) {
	        var index = -1,
	            value = args[argsIndex];
	        while (++index < length) {
	          if (array[index] === value) {
	            splice.call(array, index--, 1);
	            length--;
	          }
	        }
	      }
	      return array;
	    }

	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to but not including `end`. If `start` is less than `stop` a
	     * zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns a new range array.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      start = +start || 0;
	      step = typeof step == 'number' ? step : (+step || 1);

	      if (end == null) {
	        end = start;
	        start = 0;
	      }
	      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
	      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	      var index = -1,
	          length = nativeMax(0, ceil((end - start) / (step || 1))),
	          result = Array(length);

	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }

	    /**
	     * Removes all elements from an array that the callback returns truey for
	     * and returns an array of removed elements. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4, 5, 6];
	     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
	     *
	     * console.log(array);
	     * // => [1, 3, 5]
	     *
	     * console.log(evens);
	     * // => [2, 4, 6]
	     */
	    function remove(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];

	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (callback(value, index, array)) {
	          result.push(value);
	          splice.call(array, index--, 1);
	          length--;
	        }
	      }
	      return result;
	    }

	    /**
	     * The opposite of `_.initial` this method gets all but the first element or
	     * first `n` elements of an array. If a callback function is provided elements
	     * at the beginning of the array are excluded from the result as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias drop, tail
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.rest([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.rest([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.rest(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.rest(characters, { 'employer': 'slate' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function rest(array, callback, thisArg) {
	      if (typeof callback != 'number' && callback != null) {
	        var n = 0,
	            index = -1,
	            length = array ? array.length : 0;

	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	      }
	      return slice(array, n);
	    }

	    /**
	     * Uses a binary search to determine the smallest index at which a value
	     * should be inserted into a given sorted array in order to maintain the sort
	     * order of the array. If a callback is provided it will be executed for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([20, 30, 50], 40);
	     * // => 2
	     *
	     * // using "_.pluck" callback shorthand
	     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 2
	     *
	     * var dict = {
	     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	     * };
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return dict.wordToNumber[word];
	     * });
	     * // => 2
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return this.wordToNumber[word];
	     * }, dict);
	     * // => 2
	     */
	    function sortedIndex(array, value, callback, thisArg) {
	      var low = 0,
	          high = array ? array.length : low;

	      // explicitly reference `identity` for better inlining in Firefox
	      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
	      value = callback(value);

	      while (low < high) {
	        var mid = (low + high) >>> 1;
	        (callback(array[mid]) < value)
	          ? low = mid + 1
	          : high = mid;
	      }
	      return low;
	    }

	    /**
	     * Creates an array of unique values, in order, of the provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of combined values.
	     * @example
	     *
	     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2, 3, 5, 4]
	     */
	    function union() {
	      return baseUniq(baseFlatten(arguments, true, true));
	    }

	    /**
	     * Creates a duplicate-value-free version of an array using strict equality
	     * for comparisons, i.e. `===`. If the array is sorted, providing
	     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
	     * each element of `array` is passed through the callback before uniqueness
	     * is computed. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([1, 2, 1, 3, 1]);
	     * // => [1, 2, 3]
	     *
	     * _.uniq([1, 1, 2, 2, 3], true);
	     * // => [1, 2, 3]
	     *
	     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
	     * // => ['A', 'b', 'C']
	     *
	     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
	     * // => [1, 2.5, 3]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, callback, thisArg) {
	      // juggle arguments
	      if (typeof isSorted != 'boolean' && isSorted != null) {
	        thisArg = callback;
	        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
	        isSorted = false;
	      }
	      if (callback != null) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      return baseUniq(array, isSorted, callback);
	    }

	    /**
	     * Creates an array excluding all provided values using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to filter.
	     * @param {...*} [value] The values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	     * // => [2, 3, 4]
	     */
	    function without(array) {
	      return baseDifference(array, slice(arguments, 1));
	    }

	    /**
	     * Creates an array that is the symmetric difference of the provided arrays.
	     * See http://en.wikipedia.org/wiki/Symmetric_difference.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of values.
	     * @example
	     *
	     * _.xor([1, 2, 3], [5, 2, 1, 4]);
	     * // => [3, 5, 4]
	     *
	     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
	     * // => [1, 4, 5]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;

	      while (++index < length) {
	        var array = arguments[index];
	        if (isArray(array) || isArguments(array)) {
	          var result = result
	            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
	            : array;
	        }
	      }
	      return result || [];
	    }

	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second
	     * elements of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @alias unzip
	     * @category Arrays
	     * @param {...Array} [array] Arrays to process.
	     * @returns {Array} Returns a new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    function zip() {
	      var array = arguments.length > 1 ? arguments : arguments[0],
	          index = -1,
	          length = array ? max(pluck(array, 'length')) : 0,
	          result = Array(length < 0 ? 0 : length);

	      while (++index < length) {
	        result[index] = pluck(array, index);
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed from arrays of `keys` and `values`. Provide
	     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
	     * or two arrays, one of `keys` and one of corresponding `values`.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Arrays
	     * @param {Array} keys The array of keys.
	     * @param {Array} [values=[]] The array of values.
	     * @returns {Object} Returns an object composed of the given keys and
	     *  corresponding values.
	     * @example
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(keys, values) {
	      var index = -1,
	          length = keys ? keys.length : 0,
	          result = {};

	      if (!values && length && !isArray(keys[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = keys[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a function that executes `func`, with  the `this` binding and
	     * arguments of the created function, only after being called `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {number} n The number of times the function must be called before
	     *  `func` is executed.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('Done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'Done saving!', after all saves have completed
	     */
	    function after(n, func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }

	    /**
	     * Creates a function that, when called, invokes `func` with the `this`
	     * binding of `thisArg` and prepends any additional `bind` arguments to those
	     * provided to the bound function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var func = function(greeting) {
	     *   return greeting + ' ' + this.name;
	     * };
	     *
	     * func = _.bind(func, { 'name': 'fred' }, 'hi');
	     * func();
	     * // => 'hi fred'
	     */
	    function bind(func, thisArg) {
	      return arguments.length > 2
	        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	        : createWrapper(func, 1, null, null, thisArg);
	    }

	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all the function properties
	     * of `object` will be bound.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...string} [methodName] The object method names to
	     *  bind, specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() { console.log('clicked ' + this.label); }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs', when the button is clicked
	     */
	    function bindAll(object) {
	      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
	          index = -1,
	          length = funcs.length;

	      while (++index < length) {
	        var key = funcs[index];
	        object[key] = createWrapper(object[key], 1, null, null, object);
	      }
	      return object;
	    }

	    /**
	     * Creates a function that, when called, invokes the method at `object[key]`
	     * and prepends any additional `bindKey` arguments to those provided to the bound
	     * function. This method differs from `_.bind` by allowing bound functions to
	     * reference methods that will be redefined or don't yet exist.
	     * See http://michaux.ca/articles/lazy-function-definition-pattern.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'name': 'fred',
	     *   'greet': function(greeting) {
	     *     return greeting + ' ' + this.name;
	     *   }
	     * };
	     *
	     * var func = _.bindKey(object, 'greet', 'hi');
	     * func();
	     * // => 'hi fred'
	     *
	     * object.greet = function(greeting) {
	     *   return greeting + 'ya ' + this.name + '!';
	     * };
	     *
	     * func();
	     * // => 'hiya fred!'
	     */
	    function bindKey(object, key) {
	      return arguments.length > 2
	        ? createWrapper(key, 19, slice(arguments, 2), null, object)
	        : createWrapper(key, 3, null, null, object);
	    }

	    /**
	     * Creates a function that is the composition of the provided functions,
	     * where each function consumes the return value of the function that follows.
	     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	     * Each function is executed with the `this` binding of the composed function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {...Function} [func] Functions to compose.
	     * @returns {Function} Returns the new composed function.
	     * @example
	     *
	     * var realNameMap = {
	     *   'pebbles': 'penelope'
	     * };
	     *
	     * var format = function(name) {
	     *   name = realNameMap[name.toLowerCase()] || name;
	     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	     * };
	     *
	     * var greet = function(formatted) {
	     *   return 'Hiya ' + formatted + '!';
	     * };
	     *
	     * var welcome = _.compose(greet, format);
	     * welcome('pebbles');
	     * // => 'Hiya Penelope!'
	     */
	    function compose() {
	      var funcs = arguments,
	          length = funcs.length;

	      while (length--) {
	        if (!isFunction(funcs[length])) {
	          throw new TypeError;
	        }
	      }
	      return function() {
	        var args = arguments,
	            length = funcs.length;

	        while (length--) {
	          args = [funcs[length].apply(this, args)];
	        }
	        return args[0];
	      };
	    }

	    /**
	     * Creates a function which accepts one or more arguments of `func` that when
	     * invoked either executes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` can be specified
	     * if `func.length` is not sufficient.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var curried = _.curry(function(a, b, c) {
	     *   console.log(a + b + c);
	     * });
	     *
	     * curried(1)(2)(3);
	     * // => 6
	     *
	     * curried(1, 2)(3);
	     * // => 6
	     *
	     * curried(1, 2, 3);
	     * // => 6
	     */
	    function curry(func, arity) {
	      arity = typeof arity == 'number' ? arity : (+arity || func.length);
	      return createWrapper(func, 4, null, null, null, arity);
	    }

	    /**
	     * Creates a function that will delay the execution of `func` until after
	     * `wait` milliseconds have elapsed since the last time it was invoked.
	     * Provide an options object to indicate that `func` should be invoked on
	     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
	     * to the debounced function will return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to debounce.
	     * @param {number} wait The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * var lazyLayout = _.debounce(calculateLayout, 150);
	     * jQuery(window).on('resize', lazyLayout);
	     *
	     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * });
	     *
	     * // ensure `batchLog` is executed once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * source.addEventListener('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }, false);
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      wait = nativeMax(0, wait) || 0;
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = options.leading;
	        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      var delayed = function() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0) {
	          if (maxTimeoutId) {
	            clearTimeout(maxTimeoutId);
	          }
	          var isCalled = trailingCall;
	          maxTimeoutId = timeoutId = trailingCall = undefined;
	          if (isCalled) {
	            lastCalled = now();
	            result = func.apply(thisArg, args);
	            if (!timeoutId && !maxTimeoutId) {
	              args = thisArg = null;
	            }
	          }
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      };

	      var maxDelayed = function() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (trailing || (maxWait !== wait)) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = null;
	          }
	        }
	      };

	      return function() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);

	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0;

	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	        return result;
	      };
	    }

	    /**
	     * Defers executing the `func` function until the current call stack has cleared.
	     * Additional arguments will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to defer.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) { console.log(text); }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    function defer(func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 1);
	      return setTimeout(function() { func.apply(undefined, args); }, 1);
	    }

	    /**
	     * Executes the `func` function after `wait` milliseconds. Additional arguments
	     * will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay execution.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) { console.log(text); }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    function delay(func, wait) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 2);
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }

	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it will be used to determine the cache key for storing the result
	     * based on the arguments provided to the memoized function. By default, the
	     * first argument provided to the memoized function is used as the cache key.
	     * The `func` is executed with the `this` binding of the memoized function.
	     * The result cache is exposed as the `cache` property on the memoized function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] A function used to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var fibonacci = _.memoize(function(n) {
	     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	     * });
	     *
	     * fibonacci(9)
	     * // => 34
	     *
	     * var data = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // modifying the result cache
	     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
	     * get('pebbles');
	     * // => { 'name': 'pebbles', 'age': 1 }
	     *
	     * get.cache.pebbles.name = 'penelope';
	     * get('pebbles');
	     * // => { 'name': 'penelope', 'age': 1 }
	     */
	    function memoize(func, resolver) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var memoized = function() {
	        var cache = memoized.cache,
	            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

	        return hasOwnProperty.call(cache, key)
	          ? cache[key]
	          : (cache[key] = func.apply(this, arguments));
	      }
	      memoized.cache = {};
	      return memoized;
	    }

	    /**
	     * Creates a function that is restricted to execute `func` once. Repeat calls to
	     * the function will return the value of the first call. The `func` is executed
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` executes `createApplication` once
	     */
	    function once(func) {
	      var ran,
	          result;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (ran) {
	          return result;
	        }
	        ran = true;
	        result = func.apply(this, arguments);

	        // clear the `func` variable so the function may be garbage collected
	        func = null;
	        return result;
	      };
	    }

	    /**
	     * Creates a function that, when called, invokes `func` with any additional
	     * `partial` arguments prepended to those provided to the new function. This
	     * method is similar to `_.bind` except it does **not** alter the `this` binding.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) { return greeting + ' ' + name; };
	     * var hi = _.partial(greet, 'hi');
	     * hi('fred');
	     * // => 'hi fred'
	     */
	    function partial(func) {
	      return createWrapper(func, 16, slice(arguments, 1));
	    }

	    /**
	     * This method is like `_.partial` except that `partial` arguments are
	     * appended to those provided to the new function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	     *
	     * var options = {
	     *   'variable': 'data',
	     *   'imports': { 'jq': $ }
	     * };
	     *
	     * defaultsDeep(options, _.templateSettings);
	     *
	     * options.variable
	     * // => 'data'
	     *
	     * options.imports
	     * // => { '_': _, 'jq': $ }
	     */
	    function partialRight(func) {
	      return createWrapper(func, 32, null, slice(arguments, 1));
	    }

	    /**
	     * Creates a function that, when executed, will only call the `func` function
	     * at most once per every `wait` milliseconds. Provide an options object to
	     * indicate that `func` should be invoked on the leading and/or trailing edge
	     * of the `wait` timeout. Subsequent calls to the throttled function will
	     * return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to throttle.
	     * @param {number} wait The number of milliseconds to throttle executions to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * var throttled = _.throttle(updatePosition, 100);
	     * jQuery(window).on('scroll', throttled);
	     *
	     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;

	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? options.leading : leading;
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      debounceOptions.leading = leading;
	      debounceOptions.maxWait = wait;
	      debounceOptions.trailing = trailing;

	      return debounce(func, wait, debounceOptions);
	    }

	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Additional arguments provided to the function are appended
	     * to those provided to the wrapper function. The wrapper is executed with
	     * the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('Fred, Wilma, & Pebbles');
	     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      return createWrapper(wrapper, 16, [value]);
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var getter = _.constant(object);
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }

	    /**
	     * Produces a callback bound to an optional `thisArg`. If `func` is a property
	     * name the created callback will return the property value for a given element.
	     * If `func` is an object the created callback will return `true` for elements
	     * that contain the equivalent object properties, otherwise it will return `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
	     *   return !match ? func(callback, thisArg) : function(object) {
	     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(characters, 'age__gt38');
	     * // => [{ 'name': 'fred', 'age': 40 }]
	     */
	    function createCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (func == null || type == 'function') {
	        return baseCreateCallback(func, thisArg, argCount);
	      }
	      // handle "_.pluck" style callback shorthands
	      if (type != 'object') {
	        return property(func);
	      }
	      var props = keys(func),
	          key = props[0],
	          a = func[key];

	      // handle "_.where" style callback shorthands
	      if (props.length == 1 && a === a && !isObject(a)) {
	        // fast path the common case of providing an object with a single
	        // property containing a primitive value
	        return function(object) {
	          var b = object[key];
	          return a === b && (a !== 0 || (1 / a == 1 / b));
	        };
	      }
	      return function(object) {
	        var length = props.length,
	            result = false;

	        while (length--) {
	          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }

	    /**
	     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	     * corresponding HTML entities.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('Fred, Wilma, & Pebbles');
	     * // => 'Fred, Wilma, &amp; Pebbles'
	     */
	    function escape(string) {
	      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	    }

	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }

	    /**
	     * Adds function properties of a source object to the destination object.
	     * If `object` is a function methods will be added to its prototype as well.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Function|Object} [object=lodash] object The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
	     * @example
	     *
	     * function capitalize(string) {
	     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	     * }
	     *
	     * _.mixin({ 'capitalize': capitalize });
	     * _.capitalize('fred');
	     * // => 'Fred'
	     *
	     * _('fred').capitalize().value();
	     * // => 'Fred'
	     *
	     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
	     * _('fred').capitalize();
	     * // => 'Fred'
	     */
	    function mixin(object, source, options) {
	      var chain = true,
	          methodNames = source && functions(source);

	      if (!source || (!options && !methodNames.length)) {
	        if (options == null) {
	          options = source;
	        }
	        ctor = lodashWrapper;
	        source = object;
	        object = lodash;
	        methodNames = functions(source);
	      }
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      var ctor = object,
	          isFunc = isFunction(ctor);

	      forEach(methodNames, function(methodName) {
	        var func = object[methodName] = source[methodName];
	        if (isFunc) {
	          ctor.prototype[methodName] = function() {
	            var chainAll = this.__chain__,
	                value = this.__wrapped__,
	                args = [value];

	            push.apply(args, arguments);
	            var result = func.apply(object, args);
	            if (chain || chainAll) {
	              if (value === result && isObject(result)) {
	                return this;
	              }
	              result = new ctor(result);
	              result.__chain__ = chainAll;
	            }
	            return result;
	          };
	        }
	      });
	    }

	    /**
	     * Reverts the '_' variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      context._ = oldDash;
	      return this;
	    }

	    /**
	     * A no-operation function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // no operation performed
	    }

	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var stamp = _.now();
	     * _.defer(function() { console.log(_.now() - stamp); });
	     * // => logs the number of milliseconds it took for the deferred function to be called
	     */
	    var now = isNative(now = Date.now) && now || function() {
	      return new Date().getTime();
	    };

	    /**
	     * Converts the given value into an integer of the specified radix.
	     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
	     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
	     * implementations. See http://es5.github.io/#E.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} value The value to parse.
	     * @param {number} [radix] The radix used to interpret the value to parse.
	     * @returns {number} Returns the new integer value.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     */
	    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
	      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
	      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
	    };

	    /**
	     * Creates a "_.pluck" style function, which returns the `key` value of a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'fred',   'age': 40 },
	     *   { 'name': 'barney', 'age': 36 }
	     * ];
	     *
	     * var getName = _.property('name');
	     *
	     * _.map(characters, getName);
	     * // => ['barney', 'fred']
	     *
	     * _.sortBy(characters, getName);
	     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
	     */
	    function property(key) {
	      return function(object) {
	        return object[key];
	      };
	    }

	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number will be
	     * returned. If `floating` is truey or either `min` or `max` are floats a
	     * floating-point number will be returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating=false] Specify returning a floating-point number.
	     * @returns {number} Returns a random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      var noMin = min == null,
	          noMax = max == null;

	      if (floating == null) {
	        if (typeof min == 'boolean' && noMax) {
	          floating = min;
	          min = 1;
	        }
	        else if (!noMax && typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }

	    /**
	     * Resolves the value of property `key` on `object`. If `key` is a function
	     * it will be invoked with the `this` binding of `object` and its result returned,
	     * else the property value is returned. If `object` is falsey then `undefined`
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to resolve.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = {
	     *   'cheese': 'crumpets',
	     *   'stuff': function() {
	     *     return 'nonsense';
	     *   }
	     * };
	     *
	     * _.result(object, 'cheese');
	     * // => 'crumpets'
	     *
	     * _.result(object, 'stuff');
	     * // => 'nonsense'
	     */
	    function result(object, key) {
	      if (object) {
	        var value = object[key];
	        return isFunction(value) ? object[key]() : value;
	      }
	    }

	    /**
	     * A micro-templating method that handles arbitrary delimiters, preserves
	     * whitespace, and correctly escapes quotes within interpolated code.
	     *
	     * Note: In the development build, `_.template` utilizes sourceURLs for easier
	     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	     *
	     * For more information on precompiling templates see:
	     * https://lodash.com/custom-builds
	     *
	     * For more information on Chrome extension sandboxes see:
	     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} text The template text.
	     * @param {Object} data The data object used to populate the text.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as local variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [variable] The data object variable name.
	     * @returns {Function|string} Returns a compiled function when no `data` object
	     *  is given, else it returns the interpolated text.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= name %>');
	     * compiled({ 'name': 'fred' });
	     * // => 'hello fred'
	     *
	     * // using the "escape" delimiter to escape HTML in data property values
	     * _.template('<b><%- value %></b>', { 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to generate HTML
	     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	     * _.template('hello ${ name }', { 'name': 'pebbles' });
	     * // => 'hello pebbles'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using a custom template delimiters
	     * _.templateSettings = {
	     *   'interpolate': /{{([\s\S]+?)}}/g
	     * };
	     *
	     * _.template('hello {{ name }}!', { 'name': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using the `imports` option to import jQuery
	     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     *   var __t, __p = '', __e = _.escape;
	     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	     *   return __p;
	     * }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(text, data, options) {
	      // based on John Resig's `tmpl` implementation
	      // http://ejohn.org/blog/javascript-micro-templating/
	      // and Laura Doktorova's doT.js
	      // https://github.com/olado/doT
	      var settings = lodash.templateSettings;
	      text = String(text || '');

	      // avoid missing dependencies when `iteratorTemplate` is not defined
	      options = defaults({}, options, settings);

	      var imports = defaults({}, options.imports, settings.imports),
	          importsKeys = keys(imports),
	          importsValues = values(imports);

	      var isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";

	      // compile the regexp to match each delimiter
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');

	      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);

	        // escape characters that cannot be included in string literals
	        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	        // replace delimiters with snippets
	        if (escapeValue) {
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;

	        // the JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value
	        return match;
	      });

	      source += "';\n";

	      // if `variable` is not specified, wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain
	      var variable = options.variable,
	          hasVariable = variable;

	      if (!hasVariable) {
	        variable = 'obj';
	        source = 'with (' + variable + ') {\n' + source + '\n}\n';
	      }
	      // cleanup code by stripping empty strings
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');

	      // frame code as the function body
	      source = 'function(' + variable + ') {\n' +
	        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	        "var __t, __p = '', __e = _.escape" +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';

	      // Use a sourceURL for easier debugging.
	      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

	      try {
	        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	      } catch(e) {
	        e.source = source;
	        throw e;
	      }
	      if (data) {
	        return result(data);
	      }
	      // provide the compiled function's source by its `toString` method, in
	      // supported environments, or the `source` property as a convenience for
	      // inlining compiled templates during the build process
	      result.source = source;
	      return result;
	    }

	    /**
	     * Executes the callback `n` times, returning an array of the results
	     * of each callback execution. The callback is bound to `thisArg` and invoked
	     * with one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} n The number of times to execute the callback.
	     * @param {Function} callback The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns an array of the results of each `callback` execution.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) { mage.castSpell(n); });
	     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	     *
	     * _.times(3, function(n) { this.cast(n); }, mage);
	     * // => also calls `mage.castSpell(n)` three times
	     */
	    function times(n, callback, thisArg) {
	      n = (n = +n) > -1 ? n : 0;
	      var index = -1,
	          result = Array(n);

	      callback = baseCreateCallback(callback, thisArg, 1);
	      while (++index < n) {
	        result[index] = callback(index);
	      }
	      return result;
	    }

	    /**
	     * The inverse of `_.escape` this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	     * corresponding characters.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('Fred, Barney &amp; Pebbles');
	     * // => 'Fred, Barney & Pebbles'
	     */
	    function unescape(string) {
	      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
	    }

	    /**
	     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} [prefix] The value to prefix the ID with.
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
	      return String(prefix == null ? '' : prefix) + id;
	    }

	    /*--------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object that wraps the given value with explicit
	     * method chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(characters)
	     *     .sortBy('age')
	     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
	     *     .first()
	     *     .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      value = new lodashWrapper(value);
	      value.__chain__ = true;
	      return value;
	    }

	    /**
	     * Invokes `interceptor` with the `value` as the first argument and then
	     * returns `value`. The purpose of this method is to "tap into" a method
	     * chain in order to perform operations on intermediate results within
	     * the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3, 4])
	     *  .tap(function(array) { array.pop(); })
	     *  .reverse()
	     *  .value();
	     * // => [3, 2, 1]
	     */
	    function tap(value, interceptor) {
	      interceptor(value);
	      return value;
	    }

	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chaining
	     * @returns {*} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(characters).first();
	     * // => { 'name': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(characters).chain()
	     *   .first()
	     *   .pick('age')
	     *   .value();
	     * // => { 'age': 36 }
	     */
	    function wrapperChain() {
	      this.__chain__ = true;
	      return this;
	    }

	    /**
	     * Produces the `toString` result of the wrapped value.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chaining
	     * @returns {string} Returns the string result.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return String(this.__wrapped__);
	    }

	    /**
	     * Extracts the wrapped value.
	     *
	     * @name valueOf
	     * @memberOf _
	     * @alias value
	     * @category Chaining
	     * @returns {*} Returns the wrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).valueOf();
	     * // => [1, 2, 3]
	     */
	    function wrapperValueOf() {
	      return this.__wrapped__;
	    }

	    /*--------------------------------------------------------------------------*/

	    // add functions that return wrapped values when chaining
	    lodash.after = after;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.chain = chain;
	    lodash.compact = compact;
	    lodash.compose = compose;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.createCallback = createCallback;
	    lodash.curry = curry;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.map = map;
	    lodash.mapValues = mapValues;
	    lodash.max = max;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.min = min;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.pull = pull;
	    lodash.range = range;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.shuffle = shuffle;
	    lodash.sortBy = sortBy;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.values = values;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;

	    // add aliases
	    lodash.collect = map;
	    lodash.drop = rest;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;
	    lodash.unzip = zip;

	    // add functions to `lodash.prototype`
	    mixin(lodash);

	    /*--------------------------------------------------------------------------*/

	    // add functions that return unwrapped values when chaining
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.contains = contains;
	    lodash.escape = escape;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.indexOf = indexOf;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isNaN = isNaN;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isUndefined = isUndefined;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.mixin = mixin;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.result = result;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.template = template;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;

	    // add aliases
	    lodash.all = every;
	    lodash.any = some;
	    lodash.detect = find;
	    lodash.findWhere = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.include = contains;
	    lodash.inject = reduce;

	    mixin(function() {
	      var source = {}
	      forOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }(), false);

	    /*--------------------------------------------------------------------------*/

	    // add functions capable of returning wrapped and unwrapped values when chaining
	    lodash.first = first;
	    lodash.last = last;
	    lodash.sample = sample;

	    // add aliases
	    lodash.take = first;
	    lodash.head = first;

	    forOwn(lodash, function(func, methodName) {
	      var callbackable = methodName !== 'sample';
	      if (!lodash.prototype[methodName]) {
	        lodash.prototype[methodName]= function(n, guard) {
	          var chainAll = this.__chain__,
	              result = func(this.__wrapped__, n, guard);

	          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
	            ? result
	            : new lodashWrapper(result, chainAll);
	        };
	      }
	    });

	    /*--------------------------------------------------------------------------*/

	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = '2.4.2';

	    // add "Chaining" functions to the wrapper
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.value = wrapperValueOf;
	    lodash.prototype.valueOf = wrapperValueOf;

	    // add `Array` functions that return unwrapped values
	    baseEach(['join', 'pop', 'shift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        var chainAll = this.__chain__,
	            result = func.apply(this.__wrapped__, arguments);

	        return chainAll
	          ? new lodashWrapper(result, chainAll)
	          : result;
	      };
	    });

	    // add `Array` functions that return the existing wrapped value
	    baseEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        func.apply(this.__wrapped__, arguments);
	        return this;
	      };
	    });

	    // add `Array` functions that return new wrapped values
	    baseEach(['concat', 'slice', 'splice'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
	      };
	    });

	    // avoid array-like object bugs with `Array#shift` and `Array#splice`
	    // in IE < 9, Firefox < 10, Narwhal, and RingoJS
	    if (!support.spliceObjects) {
	      baseEach(['pop', 'shift', 'splice'], function(methodName) {
	        var func = arrayRef[methodName],
	            isSplice = methodName == 'splice';

	        lodash.prototype[methodName] = function() {
	          var chainAll = this.__chain__,
	              value = this.__wrapped__,
	              result = func.apply(value, arguments);

	          if (value.length === 0) {
	            delete value[0];
	          }
	          return (chainAll || isSplice)
	            ? new lodashWrapper(result, chainAll)
	            : result;
	        };
	      });
	    }

	    return lodash;
	  }

	  /*--------------------------------------------------------------------------*/

	  // expose Lo-Dash
	  var _ = runInContext();

	  // some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash is loaded with a RequireJS shim config.
	    // See http://requirejs.org/docs/api.html#config-shim
	    root._ = _;

	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // in Narwhal or Rhino -require
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    root._ = _;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)(module), (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(100),
	  __webpack_require__(129),
	  __webpack_require__(109),
	  __webpack_require__(114),
	  __webpack_require__(116),
	  __webpack_require__(124),
	  __webpack_require__(78),
	  __webpack_require__(137),
	  __webpack_require__(138),
	  __webpack_require__(105),
	  __webpack_require__(103),
	  __webpack_require__(139)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  plugins,
	  commands,
	  formatters,
	  events,
	  patches,
	  Api,
	  buildTransactionManager,
	  UndoManager,
	  EventEmitter,
	  nodeHelpers,
	  Immutable,
	  config
	) {

	  'use strict';

	  function Scribe(el, options) {
	    EventEmitter.call(this);

	    this.el = el;
	    this.commands = {};

	    this.options = config.checkOptions(options);

	    this.commandPatches = {};
	    this._plainTextFormatterFactory = new FormatterFactory();
	    this._htmlFormatterFactory = new HTMLFormatterFactory();

	    this.api = new Api(this);

	    this.Immutable = Immutable;

	    var TransactionManager = buildTransactionManager(this);
	    this.transactionManager = new TransactionManager();

	    //added for explicit checking later eg if (scribe.undoManager) { ... }
	    this.undoManager = false;
	    if (this.options.undo.enabled) {
	      if (this.options.undo.manager) {
	        this.undoManager = this.options.undo.manager;
	      }
	      else {
	        this.undoManager = new UndoManager(this.options.undo.limit, this.el);
	      }
	      this._merge = false;
	      this._forceMerge = false;
	      this._mergeTimer = 0;
	      this._lastItem = {content: ''};
	    }

	    this.setHTML(this.getHTML());

	    this.el.setAttribute('contenteditable', true);

	    this.el.addEventListener('input', function () {
	      /**
	       * This event triggers when either the user types something or a native
	       * command is executed which causes the content to change (i.e.
	       * `document.execCommand('bold')`). We can't wrap a transaction around
	       * these actions, so instead we run the transaction in this event.
	       */
	      this.transactionManager.run();
	    }.bind(this), false);

	    /**
	     * Core Plugins
	     */
	    var corePlugins = Immutable.OrderedSet(this.options.defaultPlugins)
	      .sort(config.sortByPlugin('setRootPElement')) // Ensure `setRootPElement` is always loaded first
	      .filter(config.filterByBlockLevelMode(this.allowsBlockElements()))
	      .map(function (plugin) { return plugins[plugin]; });

	    // Formatters
	    var defaultFormatters = Immutable.List(this.options.defaultFormatters)
	    .filter(function (formatter) { return !!formatters[formatter]; })
	    .map(function (formatter) { return formatters[formatter]; });

	    // Patches

	    var defaultPatches = Immutable.List.of(
	      patches.events
	    );

	    var defaultCommandPatches = Immutable.List(this.options.defaultCommandPatches).map(function(patch) { return patches.commands[patch]; });

	    var defaultCommands = Immutable.List.of(
	      'indent',
	      'insertList',
	      'outdent',
	      'redo',
	      'subscript',
	      'superscript',
	      'undo'
	    ).map(function(command) { return commands[command]; });

	    var allPlugins = Immutable.List().concat(
	      corePlugins,
	      defaultFormatters,
	      defaultPatches,
	      defaultCommandPatches,
	      defaultCommands);

	    allPlugins.forEach(function(plugin) {
	      this.use(plugin());
	    }.bind(this));

	    this.use(events());
	  }

	  Scribe.prototype = Object.create(EventEmitter.prototype);
	  Scribe.prototype.node = nodeHelpers;
	  Scribe.prototype.element= Scribe.prototype.node;

	  // For plugins
	  // TODO: tap combinator?
	  Scribe.prototype.use = function (configurePlugin) {
	    configurePlugin(this);
	    return this;
	  };

	  Scribe.prototype.setHTML = function (html, skipFormatters) {
	    this._lastItem.content = html;

	    if (skipFormatters) {
	      this._skipFormatters = true;
	    }
	    // IE11: Setting HTML to the value it already has causes breakages elsewhere (see #336)
	    if (this.el.innerHTML !== html) {
	      this.el.innerHTML = html;
	    }
	  };

	  Scribe.prototype.getHTML = function () {
	    return this.el.innerHTML;
	  };

	  Scribe.prototype.getContent = function () {
	    // Remove bogus BR element for Firefox — see explanation in BR mode files.
	    return this._htmlFormatterFactory.formatForExport(this.getHTML().replace(/<br>$/, ''));
	  };

	  Scribe.prototype.getTextContent = function () {
	    return this.el.textContent;
	  };

	  Scribe.prototype.pushHistory = function () {
	    /**
	     * Chrome and Firefox: If we did push to the history, this would break
	     * browser magic around `Document.queryCommandState` (http://jsbin.com/eDOxacI/1/edit?js,console,output).
	     * This happens when doing any DOM manipulation.
	     */
	    var scribe = this;

	    if (scribe.options.undo.enabled) {
	      // Get scribe previous content, and strip markers.
	      var lastContentNoMarkers = scribe._lastItem.content.replace(/<em [^>]*class="scribe-marker"[^>]*>[^<]*?<\/em>/g, '');

	      // We only want to push the history if the content actually changed.
	      if (scribe.getHTML() !== lastContentNoMarkers) {
	        var selection = new scribe.api.Selection();

	        selection.placeMarkers();
	        var content = scribe.getHTML();
	        selection.removeMarkers();

	        // Checking if there is a need to merge, and that the previous history item
	        // is the last history item of the same scribe instance.
	        // It is possible the last transaction is not for the same instance, or
	        // even not a scribe transaction (e.g. when using a shared undo manager).
	        var previousItem = scribe.undoManager.item(scribe.undoManager.position);
	        if ((scribe._merge || scribe._forceMerge) && previousItem && scribe._lastItem == previousItem[0]) {
	          // If so, merge manually with the last item to save more memory space.
	          scribe._lastItem.content = content;
	        }
	        else {
	          // Otherwise, create a new history item, and register it as a new transaction
	          scribe._lastItem = {
	            previousItem: scribe._lastItem,
	            content: content,
	            scribe: scribe,
	            execute: function () { },
	            undo: function () { this.scribe.restoreFromHistory(this.previousItem); },
	            redo: function () { this.scribe.restoreFromHistory(this); }
	          };

	          scribe.undoManager.transact(scribe._lastItem, false);
	        }

	        // Merge next transaction if it happens before the interval option, otherwise don't merge.
	        clearTimeout(scribe._mergeTimer);
	        scribe._merge = true;
	        scribe._mergeTimer = setTimeout(function() { scribe._merge = false; }, scribe.options.undo.interval);

	        return true;
	      }
	    }

	    return false;
	  };

	  Scribe.prototype.getCommand = function (commandName) {
	    return this.commands[commandName] || this.commandPatches[commandName] || new this.api.Command(commandName);
	  };

	  Scribe.prototype.restoreFromHistory = function (historyItem) {
	    this._lastItem = historyItem;

	    this.setHTML(historyItem.content, true);

	    // Restore the selection
	    var selection = new this.api.Selection();
	    selection.selectMarkers();

	    // Because we skip the formatters, a transaction is not run, so we have to
	    // emit this event ourselves.
	    this.trigger('content-changed');
	  };

	  // This will most likely be moved to another object eventually
	  Scribe.prototype.allowsBlockElements = function () {
	    return this.options.allowBlockElements;
	  };

	  Scribe.prototype.setContent = function (content) {
	    if (! this.allowsBlockElements()) {
	      // Set bogus BR element for Firefox — see explanation in BR mode files.
	      content = content + '<br>';
	    }

	    this.setHTML(content);

	    this.trigger('content-changed');
	  };

	  Scribe.prototype.insertPlainText = function (plainText) {
	    this.insertHTML('<p>' + this._plainTextFormatterFactory.format(plainText) + '</p>');
	  };

	  Scribe.prototype.insertHTML = function (html) {
	    /**
	     * When pasting text from Google Docs in both Chrome and Firefox,
	     * the resulting text will be wrapped in a B tag. So it would look
	     * something like <b><p>Text</p></b>, which is invalid HTML. The command
	     * insertHTML will then attempt to fix this content by moving the B tag
	     * inside the P. The result is: <p><b></b></p><p>Text</p>, which is valid
	     * but means an extra P is inserted into the text. To avoid this we run the
	     * formatters before the insertHTML command as the formatter will
	     * unwrap the P and delete the B tag. It is acceptable to remove invalid
	     * HTML as Scribe should only accept valid HTML.
	     *
	     * See http://jsbin.com/cayosada/3/edit for more
	     **/

	    // TODO: error if the selection is not within the Scribe instance? Or
	    // focus the Scribe instance if it is not already focused?
	    this.getCommand('insertHTML').execute(this._htmlFormatterFactory.format(html));
	  };

	  Scribe.prototype.isDebugModeEnabled = function () {
	    return this.options.debug;
	  };

	  /**
	   * Applies HTML formatting to all editor text.
	   * @param {String} phase sanitize/normalize/export are the standard phases
	   * @param {Function} fn Function that takes the current editor HTML and returns a formatted version.
	   */
	  Scribe.prototype.registerHTMLFormatter = function (phase, formatter) {
	    this._htmlFormatterFactory.formatters[phase]
	      = this._htmlFormatterFactory.formatters[phase].push(formatter);
	  };

	  Scribe.prototype.registerPlainTextFormatter = function (formatter) {
	    this._plainTextFormatterFactory.formatters
	      = this._plainTextFormatterFactory.formatters.push(formatter);
	  };

	  // TODO: abstract
	  function FormatterFactory() {
	    this.formatters = Immutable.List();
	  }

	  FormatterFactory.prototype.format = function (html) {
	    // Map the object to an array: Array[Formatter]
	    var formatted = this.formatters.reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);

	    return formatted;
	  };

	  function HTMLFormatterFactory() {
	    // Define phases
	    // For a list of formatters, see https://github.com/guardian/scribe/issues/126
	    this.formatters = {
	      // Configurable sanitization of the HTML, e.g. converting/filter/removing
	      // elements
	      sanitize: Immutable.List(),
	      // Normalize content to ensure it is ready for interaction
	      normalize: Immutable.List(),
	      'export': Immutable.List()
	    };
	  }

	  HTMLFormatterFactory.prototype = Object.create(FormatterFactory.prototype);
	  HTMLFormatterFactory.prototype.constructor = HTMLFormatterFactory;

	  HTMLFormatterFactory.prototype.format = function (html) {
	    var formatters = this.formatters.sanitize.concat(this.formatters.normalize);

	    var formatted = formatters.reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);

	    return formatted;
	  };

	  HTMLFormatterFactory.prototype.formatForExport = function (html) {
	    return this.formatters['export'].reduce(function (formattedData, formatter) {
	      return formatter(formattedData);
	    }, html);
	  };

	  return Scribe;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(79)], __WEBPACK_AMD_DEFINE_RESULT__ = function (assign) {

	  'use strict';

	  return function (scribe) {
	    function TransactionManager() {
	      this.history = [];
	    }

	    assign(TransactionManager.prototype, {
	      start: function () {
	        this.history.push(1);
	      },

	      end: function () {
	        this.history.pop();

	        if (this.history.length === 0) {
	          scribe.pushHistory();
	          scribe.trigger('content-changed');
	        }
	      },

	      run: function (transaction, forceMerge) {
	        this.start();
	        // If there is an error, don't prevent the transaction from ending.
	        try {
	          if (transaction) {
	            transaction();
	          }
	        } finally {
	          scribe._forceMerge = forceMerge === true;
	          this.end();
	          scribe._forceMerge = false;
	        }
	      }
	    });

	    return TransactionManager;
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(80), __webpack_require__(96)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseAssign, createAssigner) {

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources overwrite property assignments of previous sources.
	   * If `customizer` is provided it is invoked to produce the assigned values.
	   * The `customizer` is bound to `thisArg` and invoked with five arguments;
	   * (objectValue, sourceValue, key, object, source).
	   *
	   * @static
	   * @memberOf _
	   * @alias extend
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	   * // => { 'user': 'fred', 'age': 40 }
	   *
	   * // using a customizer callback
	   * var defaults = _.partialRight(_.assign, function(value, other) {
	   *   return typeof value == 'undefined' ? other : value;
	   * });
	   *
	   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  var assign = createAssigner(baseAssign);

	  return assign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(81), __webpack_require__(82)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseCopy, keys) {

	  /**
	   * The base implementation of `_.assign` without support for argument juggling,
	   * multiple sources, and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} [customizer] The function to customize assigning values.
	   * @returns {Object} Returns the destination object.
	   */
	  function baseAssign(object, source, customizer) {
	    var props = keys(source);
	    if (!customizer) {
	      return baseCopy(source, object, props);
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index],
	          value = object[key],
	          result = customizer(value, source[key], key, object, source);

	      if ((result === result ? (result !== value) : (value === value)) ||
	          (typeof value == 'undefined' && !(key in object))) {
	        object[key] = result;
	      }
	    }
	    return object;
	  }

	  return baseAssign;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Array} props The property names to copy.
	   * @returns {Object} Returns `object`.
	   */
	  function baseCopy(source, object, props) {
	    if (!props) {
	      props = object;
	      object = {};
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      object[key] = source[key];
	    }
	    return object;
	  }

	  return baseCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(83), __webpack_require__(84), __webpack_require__(88), __webpack_require__(89)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObject, shimKeys) {

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (object) {
	      var Ctor = object.constructor,
	          length = object.length;
	    }
	    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	        (typeof object != 'function' && (length && isLength(length)))) {
	      return shimKeys(object);
	    }
	    return isObject(object) ? nativeKeys(object) : [];
	  };

	  return keys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is based on ES `ToLength`. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  return isLength;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(85), __webpack_require__(87)], __WEBPACK_AMD_DEFINE_RESULT__ = function(escapeRegExp, isObjectLike) {

	  /** `Object#toString` result references. */
	  var funcTag = '[object Function]';

	  /** Used to detect host constructors (Safari > 5). */
	  var reHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to resolve the decompiled source of functions. */
	  var fnToString = Function.prototype.toString;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Used to detect if a method is native. */
	  var reNative = RegExp('^' +
	    escapeRegExp(objToString)
	    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	  );

	  /**
	   * Checks if `value` is a native function.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	   * @example
	   *
	   * _.isNative(Array.prototype.push);
	   * // => true
	   *
	   * _.isNative(_);
	   * // => false
	   */
	  function isNative(value) {
	    if (value == null) {
	      return false;
	    }
	    if (objToString.call(value) == funcTag) {
	      return reNative.test(fnToString.call(value));
	    }
	    return (isObjectLike(value) && reHostCtor.test(value)) || false;
	  }

	  return isNative;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(86)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseToString) {

	  /**
	   * Used to match `RegExp` special characters.
	   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	   * for more details.
	   */
	  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /**
	   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escapeRegExp('[lodash](https://lodash.com/)');
	   * // => '\[lodash\]\(https://lodash\.com/\)'
	   */
	  function escapeRegExp(string) {
	    string = baseToString(string);
	    return (string && reHasRegExpChars.test(string))
	      ? string.replace(reRegExpChars, '\\$&')
	      : string;
	  }

	  return escapeRegExp;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Converts `value` to a string if it is not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  return baseToString;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return (value && typeof value == 'object') || false;
	  }

	  return isObjectLike;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is the language type of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	   *
	   * @static
	   * @memberOf _
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
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // Avoid a V8 JIT bug in Chrome 19-20.
	    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	    var type = typeof value;
	    return type == 'function' || (value && type == 'object') || false;
	  }

	  return isObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(83), __webpack_require__(93), __webpack_require__(94)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, keysIn, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * A fallback implementation of `Object.keys` which creates an array of the
	   * own enumerable property names of `object`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   */
	  function shimKeys(object) {
	    var props = keysIn(object),
	        propsLength = props.length,
	        length = propsLength && object.length;

	    var allowIndexes = length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object)));

	    var index = -1,
	        result = [];

	    while (++index < propsLength) {
	      var key = props[index];
	      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return shimKeys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(83), __webpack_require__(87)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isObjectLike) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    var length = isObjectLike(value) ? value.length : undefined;
	    return (isLength(length) && objToString.call(value) == argsTag) || false;
	  }

	  return isArguments;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(83), __webpack_require__(84), __webpack_require__(87)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObjectLike) {

	  /** `Object#toString` result references. */
	  var arrayTag = '[object Array]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(function() { return arguments; }());
	   * // => false
	   */
	  var isArray = nativeIsArray || function(value) {
	    return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	  };

	  return isArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = +value;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  return isIndex;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(83), __webpack_require__(88), __webpack_require__(94)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, isObject, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    if (object == null) {
	      return [];
	    }
	    if (!isObject(object)) {
	      object = Object(object);
	    }
	    var length = object.length;
	    length = (length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

	    var Ctor = object.constructor,
	        index = -1,
	        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	        result = Array(length),
	        skipIndexes = length > 0;

	    while (++index < length) {
	      result[index] = (index + '');
	    }
	    for (var key in object) {
	      if (!(skipIndexes && isIndex(key, length)) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return keysIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(84), __webpack_require__(95)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative, root) {

	  /** Used to detect functions containing a `this` reference. */
	  var reThis = /\bthis\b/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to detect DOM support. */
	  var document = (document = root.window) && document.document;

	  /** Native method references. */
	  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /**
	   * An object environment feature flags.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  var support = {};

	  (function(x) {

	    /**
	     * Detect if functions can be decompiled by `Function#toString`
	     * (all but Firefox OS certified apps, older Opera mobile browsers, and
	     * the PlayStation 3; forced `false` for Windows 8 apps).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

	    /**
	     * Detect if `Function#name` is supported (all but IE).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcNames = typeof Function.name == 'string';

	    /**
	     * Detect if the DOM is supported.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.dom = document.createDocumentFragment().nodeType === 11;
	    } catch(e) {
	      support.dom = false;
	    }

	    /**
	     * Detect if `arguments` object indexes are non-enumerable.
	     *
	     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	     * checks for indexes that exceed their function's formal parameters with
	     * associated values of `0`.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	    } catch(e) {
	      support.nonEnumArgs = true;
	    }
	  }(0, 0));

	  return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window;

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it is the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || this;

	  return root;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)(module), (function() { return this; }())))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(97), __webpack_require__(99)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bindCallback, isIterateeCall) {

	  /**
	   * Creates a function that assigns properties of source object(s) to a given
	   * destination object.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return function() {
	      var args = arguments,
	          length = args.length,
	          object = args[0];

	      if (length < 2 || object == null) {
	        return object;
	      }
	      var customizer = args[length - 2],
	          thisArg = args[length - 1],
	          guard = args[3];

	      if (length > 3 && typeof customizer == 'function') {
	        customizer = bindCallback(customizer, thisArg, 5);
	        length -= 2;
	      } else {
	        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
	        length -= (customizer ? 1 : 0);
	      }
	      if (guard && isIterateeCall(args[1], args[2], guard)) {
	        customizer = length == 3 ? null : customizer;
	        length = 2;
	      }
	      var index = 0;
	      while (++index < length) {
	        var source = args[index];
	        if (source) {
	          assigner(object, source, customizer);
	        }
	      }
	      return object;
	    };
	  }

	  return createAssigner;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(98)], __WEBPACK_AMD_DEFINE_RESULT__ = function(identity) {

	  /**
	   * A specialized version of `baseCallback` which only supports `this` binding
	   * and specifying the number of arguments to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {number} [argCount] The number of arguments to provide to `func`.
	   * @returns {Function} Returns the callback.
	   */
	  function bindCallback(func, thisArg, argCount) {
	    if (typeof func != 'function') {
	      return identity;
	    }
	    if (typeof thisArg == 'undefined') {
	      return func;
	    }
	    switch (argCount) {
	      case 1: return function(value) {
	        return func.call(thisArg, value);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	      case 5: return function(value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	    }
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  }

	  return bindCallback;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * This method returns the first argument provided to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  return identity;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(92), __webpack_require__(83), __webpack_require__(88)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isIndex, isLength, isObject) {

	  /**
	   * Checks if the provided arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number') {
	      var length = object.length,
	          prereq = isLength(length) && isIndex(index, length);
	    } else {
	      prereq = type == 'string' && index in object;
	    }
	    if (prereq) {
	      var other = object[index];
	      return value === value ? (value === other) : (other !== other);
	    }
	    return false;
	  }

	  return isIterateeCall;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(101),
	  __webpack_require__(102),
	  __webpack_require__(104),
	  __webpack_require__(108)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  setRootPElement,
	  enforcePElements,
	  ensureSelectableContainers,
	  inlineElementsMode
	) {
	  'use strict';

	  return {
	    setRootPElement: setRootPElement,
	    enforcePElements: enforcePElements,
	    ensureSelectableContainers: ensureSelectableContainers,
	    inlineElementsMode: inlineElementsMode
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Sets the default content of the scribe so that each carriage return creates
	   * a P.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      // The content might have already been set, in which case we don't want
	      // to apply.
	      if (scribe.getHTML().trim() === '') {
	        /**
	         * We have to begin with the following HTML, because otherwise some
	         * browsers(?) will position the caret outside of the P when the scribe is
	         * focused.
	         */
	        scribe.setContent('<p><br></p>');
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  /**
	   * Chrome and Firefox: Upon pressing backspace inside of a P, the
	   * browser deletes the paragraph element, leaving the caret (and any
	   * content) outside of any P.
	   *
	   * Firefox: Erasing across multiple paragraphs, or outside of a
	   * whole paragraph (e.g. by ‘Select All’) will leave content outside
	   * of any P.
	   *
	   * Entering a new line in a pristine state state will insert
	   * `<div>`s (in Chrome) or `<br>`s (in Firefox) where previously we
	   * had `<p>`'s. This patches the behaviour of delete/backspace so
	   * that we do not end up in a pristine state.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      /**
	       * Wrap consecutive inline elements and text nodes in a P element.
	       */
	      function wrapChildNodes(parentNode) {
	        var index = 0;
	        Immutable.List(parentNode.childNodes)
	          .filter(function(node) {
	            return node.nodeType === Node.TEXT_NODE || !nodeHelpers.isBlockElement(node);
	          })
	          .groupBy(function(node, key, list) {
	            return key === 0 || node.previousSibling === list.get(key - 1) ?
	              index :
	              index += 1;
	          })
	          .forEach(function(nodeGroup) {
	            nodeHelpers.wrap(nodeGroup.toArray(), document.createElement('p'));
	          });
	      }

	      // Traverse the tree, wrapping child nodes as we go.
	      function traverse(parentNode) {
	        var i = 0, node;

	        while (node = parentNode.children[i++]) {
	          if (node.tagName === 'BLOCKQUOTE') {
	            wrapChildNodes(node);
	          }
	        }
	      }

	      scribe.registerHTMLFormatter('normalize', function (html) {
	        /**
	         * Ensure P mode.
	         *
	         * Wrap any orphan text nodes in a P element.
	         */
	        // TODO: This should be configurable and also correct markup such as
	        // `<ul>1</ul>` to <ul><li>2</li></ul>`. See skipped tests.
	        // TODO: This should probably be a part of HTML Janitor, or some other
	        // formatter.
	        var bin = document.createElement('div');
	        bin.innerHTML = html;

	        wrapChildNodes(bin);
	        traverse(bin);

	        return bin.innerHTML;
	      });

	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.Immutable = factory()
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    return index >= 0 ? (+index) : ensureSize(iter) + (+index);
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function src_Iterator__Iterator(next) {
	      this.next = next;
	    }

	    src_Iterator__Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  src_Iterator__Iterator.KEYS = ITERATE_KEYS;
	  src_Iterator__Iterator.VALUES = ITERATE_VALUES;
	  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;

	  src_Iterator__Iterator.prototype.inspect =
	  src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }
	  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  // #pragma Root Sequences

	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new src_Iterator__Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  var src_Math__imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function src_Math__imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    return hashJSObj(o);
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new src_Iterator__Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = src_Map__Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    sliceSeq.size = sliceSize;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new src_Iterator__Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new src_Iterator__Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new src_Iterator__Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new src_Iterator__Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(src_Map__Map, KeyedCollection);

	    // @pragma Construction

	    function src_Map__Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    src_Map__Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    src_Map__Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    src_Map__Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    src_Map__Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    src_Map__Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    src_Map__Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    src_Map__Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    src_Map__Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    src_Map__Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger(undefined), arguments);
	    };

	    src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMerger(merger), iters);
	    };

	    src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    src_Map__Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    src_Map__Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    src_Map__Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    src_Map__Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    src_Map__Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    src_Map__Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    src_Map__Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    src_Map__Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  src_Map__Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = src_Map__Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, src_Iterator__Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(merger) {
	    return function(existing, value, key) 
	      {return existing && existing.mergeDeepWith && isIterable(value) ?
	        existing.mergeDeepWith(merger, value) :
	        merger ? merger(existing, value, key) : value};
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index < 0 || index >= this.size) {
	        return notSetValue;
	      }
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger(undefined), arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMerger(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new src_Iterator__Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }
	      var removingLast = sizeIndex === this.array.length - 1;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingLast) {
	          return this;
	        }
	      }
	      if (removingLast && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingLast) {
	        editable.array.pop();
	      }
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, src_Map__Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new src_Iterator__Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  createClass(src_Set__Set, SetCollection);

	    // @pragma Construction

	    function src_Set__Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    src_Set__Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    src_Set__Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    src_Set__Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    src_Set__Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    src_Set__Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    src_Set__Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    src_Set__Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    src_Set__Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    src_Set__Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    src_Set__Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    src_Set__Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    src_Set__Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    src_Set__Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  src_Set__Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = src_Set__Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, src_Set__Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = src_Map__Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step > 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new src_Iterator__Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new src_Iterator__Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = src_Iterator__Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Map__Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    contains: function(searchValue) {
	      return this.includes(searchValue);
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    findEntry: function(predicate, context) {
	      var found;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findLastEntry: function(predicate, context) {
	      return this.toSeq().reverse().findEntry(predicate, context);
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    },


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;

	  // Temporary warning about using length
	  (function () {
	    try {
	      Object.defineProperty(IterablePrototype, 'length', {
	        get: function () {
	          if (!Iterable.noLengthWarning) {
	            var stack;
	            try {
	              throw new Error();
	            } catch (error) {
	              stack = error.stack;
	            }
	            if (stack.indexOf('_wrapObject') === -1) {
	              console && console.warn && console.warn(
	                'iterable.length has been deprecated, '+
	                'use iterable.size or iterable.count(). '+
	                'This warning will become a silent error in a future version. ' +
	                stack
	              );
	              return this.size;
	            }
	          }
	        }
	      });
	    } catch (e) {}
	  })();



	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLastKey: function(predicate, context) {
	      return this.toSeq().reverse().findKey(predicate, context);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    lastKeyOf: function(searchValue) {
	      return this.findLastKey(function(value ) {return is(value, searchValue)});
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    },

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.toKeyedSeq().keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      return this.toSeq().reverse().indexOf(searchValue);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      index = resolveBegin(index, this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var key = this.toKeyedSeq().findLastKey(predicate, context);
	      return key === undefined ? -1 : key;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    },

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    },

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : value;
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = src_Math__imul(h, 0xCC9E2D51);
	    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);
	    h = src_Math__imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: src_Map__Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: src_Set__Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS,

	  };

	  return Immutable;

	}));

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(105),
	    __webpack_require__(103)
	  ], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	    nodeHelpers,
	    Immutable
	  ) {

	  /**
	   * Chrome and Firefox: All elements need to contain either text or a `<br>` to
	   * remain selectable. (Unless they have a width and height explicitly set with
	   * CSS(?), as per: http://jsbin.com/gulob/2/edit?html,css,js,output)
	   */

	  'use strict';

	  // http://www.w3.org/TR/html-markup/syntax.html#syntax-elements
	  var html5VoidElements = Immutable.Set.of('AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR');

	  function parentHasNoTextContent(node) {
	    if (nodeHelpers.isCaretPositionNode(node)) {
	      return true;
	    } else {
	      return node.parentNode.textContent.trim() === '';
	    }
	  }


	  function traverse(parentNode) {
	    // Instead of TreeWalker, which gets confused when the BR is added to the dom,
	    // we recursively traverse the tree to look for an empty node that can have childNodes

	    var node = parentNode.firstElementChild;

	    function isEmpty(node) {

	      if ((node.children.length === 0 && nodeHelpers.isBlockElement(node))
	        || (node.children.length === 1 && nodeHelpers.isSelectionMarkerNode(node.children[0]))) {
	         return true;
	      }

	      // Do not insert BR in empty non block elements with parent containing text
	      if (!nodeHelpers.isBlockElement(node) && node.children.length === 0) {
	        return parentHasNoTextContent(node);
	      }

	      return false;
	    }

	    while (node) {
	      if (!nodeHelpers.isSelectionMarkerNode(node)) {
	        // Find any node that contains no child *elements*, or just contains
	        // whitespace, and is not self-closing
	        if (isEmpty(node) &&
	          node.textContent.trim() === '' &&
	          !html5VoidElements.includes(node.nodeName)) {
	          node.appendChild(document.createElement('br'));
	        } else if (node.children.length > 0) {
	          traverse(node);
	        }
	      }
	      node = node.nextElementSibling;
	    }
	  }

	  return function () {
	    return function (scribe) {

	      scribe.registerHTMLFormatter('normalize', function (html) {
	        var bin = document.createElement('div');
	        bin.innerHTML = html;

	        traverse(bin);

	        return bin.innerHTML;
	      });

	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(106),
	  __webpack_require__(107),
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (inlineElementNames, blockElementNames, Immutable) {

	  'use strict';

	  function isBlockElement(node) {
	    return blockElementNames.includes(node.nodeName);
	  }

	  function isInlineElement(node) {
	    return inlineElementNames.includes(node.nodeName);
	  }

	  // return true if nested inline tags ultimately just contain <br> or ""
	  function isEmptyInlineElement(node) {
	    if( node.children.length > 1 ) return false;
	    if( node.children.length === 1 && node.textContent.trim() !== '' ) return false;
	    if( node.children.length === 0 ) return node.textContent.trim() === '';
	    return isEmptyInlineElement(node.children[0]);
	  }

	  function isText(node) {
	    return node.nodeType === Node.TEXT_NODE;
	  }

	  function isEmptyTextNode(node) {
	    return isText(node) && node.data === '';
	  }

	  function isFragment(node) {
	    return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
	  }

	  function isBefore(node1, node2) {
	    return node1.compareDocumentPosition(node2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  }

	  function isSelectionMarkerNode(node) {
	    return (node.nodeType === Node.ELEMENT_NODE && node.className === 'scribe-marker');
	  }

	  function isCaretPositionNode(node) {
	    return (node.nodeType === Node.ELEMENT_NODE && node.className === 'caret-position');
	  }

	  function firstDeepestChild(node) {
	    var fs = node.firstChild;
	    return !fs || fs.nodeName === 'BR' ?
	      node :
	      firstDeepestChild(fs);
	  }

	  function insertAfter(newNode, referenceNode) {
	    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	  }

	  function removeNode(node) {
	    return node.parentNode.removeChild(node);
	  }

	  function getAncestor(node, rootElement, nodeFilter) {
	    function isTopContainerElement (element) {
	      return rootElement === element;
	    }
	    // TODO: should this happen here?
	    if (isTopContainerElement(node)) {
	      return;
	    }

	    var currentNode = node.parentNode;

	    // If it's a `contenteditable` then it's likely going to be the Scribe
	    // instance, so stop traversing there.
	    while (currentNode && ! isTopContainerElement(currentNode)) {
	      if (nodeFilter(currentNode)) {
	        return currentNode;
	      }
	      currentNode = currentNode.parentNode;
	    }
	  }

	  function nextSiblings(node) {
	    var all = Immutable.List();
	    while (node = node.nextSibling) {
	      all = all.push(node);
	    }
	    return all;
	  }

	  function wrap(nodes, parentNode) {
	    nodes[0].parentNode.insertBefore(parentNode, nodes[0]);
	    nodes.forEach(function (node) {
	      parentNode.appendChild(node);
	    });
	    return parentNode;
	  }

	  function unwrap(node, childNode) {
	    while (childNode.childNodes.length > 0) {
	      node.insertBefore(childNode.childNodes[0], childNode);
	    }
	    node.removeChild(childNode);
	  }

	  /**
	   * Chrome: If a parent node has a CSS `line-height` when we apply the
	   * insertHTML command, Chrome appends a SPAN to plain content with
	   * inline styling replicating that `line-height`, and adjusts the
	   * `line-height` on inline elements.
	   *
	   * As per: http://jsbin.com/ilEmudi/4/edit?css,js,output
	   * More from the web: http://stackoverflow.com/q/15015019/40352
	   */
	  function removeChromeArtifacts(parentElement) {
	    function isInlineWithStyle(parentStyle, element) {
	      return window.getComputedStyle(element).lineHeight === parentStyle.lineHeight;
	    }

	    var nodes = Immutable.List(parentElement.querySelectorAll(inlineElementNames
	      .map(function(elName) { return elName + '[style*="line-height"]' })
	      .join(',')
	      ));
	    nodes = nodes.filter(isInlineWithStyle.bind(null, window.getComputedStyle(parentElement)));

	    var emptySpans = Immutable.List();

	    nodes.forEach(function(node) {
	      node.style.lineHeight = null;
	      if (!node.getAttribute('style')) {
	        node.removeAttribute('style');
	      }
	      if (node.nodeName === 'SPAN' && node.attributes.length === 0) {
	        emptySpans = emptySpans.push(node);
	      }
	    });

	    emptySpans.forEach(function(node) {
	      unwrap(node.parentNode, node);
	    });
	  }

	  return {
	    isInlineElement: isInlineElement,
	    isBlockElement: isBlockElement,
	    isEmptyInlineElement: isEmptyInlineElement,
	    isText: isText,
	    isEmptyTextNode: isEmptyTextNode,
	    isFragment: isFragment,
	    isBefore: isBefore,
	    isSelectionMarkerNode: isSelectionMarkerNode,
	    isCaretPositionNode: isCaretPositionNode,
	    firstDeepestChild: firstDeepestChild,
	    insertAfter: insertAfter,
	    removeNode: removeNode,
	    getAncestor: getAncestor,
	    nextSiblings: nextSiblings,
	    wrap: wrap,
	    unwrap: unwrap,
	    removeChromeArtifacts: removeChromeArtifacts
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {
	  // Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente
	  var inlineElementNames = Immutable.Set.of('B', 'BIG', 'I', 'SMALL', 'TT',
	    'ABBR', 'ACRONYM', 'CITE', 'CODE', 'DFN', 'EM', 'KBD', 'STRONG', 'SAMP', 'VAR',
	    'A', 'BDO', 'BR', 'IMG', 'MAP', 'OBJECT', 'Q', 'SCRIPT', 'SPAN', 'SUB', 'SUP',
	    'BUTTON', 'INPUT', 'LABEL', 'SELECT', 'TEXTAREA');

	  return inlineElementNames;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Immutable) {
	  var blockElementNames = Immutable.Set.of('ADDRESS', 'ARTICLE', 'ASIDE', 'AUDIO', 'BLOCKQUOTE', 'CANVAS', 'DD',
	                           'DIV', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FOOTER', 'FORM', 'H1',
	                           'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'HGROUP', 'HR', 'LI',
	                           'NOSCRIPT', 'OL', 'OUTPUT', 'P', 'PRE', 'SECTION', 'TABLE', 'TD',
	                           'TH', 'TFOOT', 'UL', 'VIDEO');

	  return blockElementNames;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  // TODO: abstract
	  function hasContent(rootNode) {
	    var treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_ALL, null, false);

	    while (treeWalker.nextNode()) {
	      if (treeWalker.currentNode) {
	        // If the node is a non-empty element or has content
	        if (~['br'].indexOf(treeWalker.currentNode.nodeName.toLowerCase()) || treeWalker.currentNode.length > 0) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return function () {
	    return function (scribe) {
	      /**
	       * Firefox has a `insertBrOnReturn` command, but this is not a part of
	       * any standard. One day we might have an `insertLineBreak` command,
	       * proposed by this spec:
	       * https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#the-insertlinebreak-command
	       * As per: http://jsbin.com/IQUraXA/1/edit?html,js,output
	       */
	      scribe.el.addEventListener('keydown', function (event) {
	        if (event.keyCode === 13) { // enter
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var blockNode = selection.getContaining(function (node) {
	            return node.nodeName === 'LI' || (/^(H[1-6])$/).test(node.nodeName);
	          });

	          if (! blockNode) {
	            event.preventDefault();

	            scribe.transactionManager.run(function () {
	              /**
	               * Firefox: Delete the bogus BR as we insert another one later.
	               * We have to do this because otherwise the browser will believe
	               * there is content to the right of the selection.
	               */
	              if (scribe.el.lastChild.nodeName === 'BR') {
	                scribe.el.removeChild(scribe.el.lastChild);
	              }

	              var brNode = document.createElement('br');

	              range.insertNode(brNode);
	              // After inserting the BR into the range is no longer collapsed, so
	              // we have to collapse it again.
	              // TODO: Older versions of Firefox require this argument even though
	              // it is supposed to be optional. Proxy/polyfill?
	              range.collapse(false);

	              /**
	               * Chrome: If there is no right-hand side content, inserting a BR
	               * will not appear to create a line break.
	               * Firefox: If there is no right-hand side content, inserting a BR
	               * will appear to create a weird "half-line break".
	               *
	               * Possible solution: Insert two BRs.
	               * ✓ Chrome: Inserting two BRs appears to create a line break.
	               * Typing will then delete the bogus BR element.
	               * Firefox: Inserting two BRs will create two line breaks.
	               *
	               * Solution: Only insert two BRs if there is no right-hand
	               * side content.
	               *
	               * If the user types on a line immediately after a BR element,
	               * Chrome will replace the BR element with the typed characters,
	               * whereas Firefox will not. Thus, to satisfy Firefox we have to
	               * insert a bogus BR element on initialization (see below).
	               */

	              var contentToEndRange = range.cloneRange();
	              contentToEndRange.setEndAfter(scribe.el.lastChild, 0);

	              // Get the content from the range to the end of the heading
	              var contentToEndFragment = contentToEndRange.cloneContents();

	              // If there is not already a right hand side content we need to
	              // insert a bogus BR element.
	              if (! hasContent(contentToEndFragment)) {
	                var bogusBrNode = document.createElement('br');
	                range.insertNode(bogusBrNode);
	              }

	              var newRange = range.cloneRange();

	              newRange.setStartAfter(brNode, 0);
	              newRange.setEndAfter(brNode, 0);

	              selection.selection.removeAllRanges();
	              selection.selection.addRange(newRange);
	            });
	          }
	        }
	      }.bind(this));

	      if (scribe.getHTML().trim() === '') {
	        // Bogus BR element for Firefox — see explanation above.
	        // TODO: also append when consumer sets the content manually.
	        // TODO: hide when the user calls `getHTML`?
	        scribe.setContent('');
	      }
	    };
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(110),
	  __webpack_require__(111)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  replaceNbspCharsFormatter,
	  escapeHtmlCharactersFormatter
	) {
	  'use strict';

	  return {
	    replaceNbspCharsFormatter: replaceNbspCharsFormatter,
	    escapeHtmlCharactersFormatter: escapeHtmlCharactersFormatter
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Chrome:
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nbspCharRegExp = /(\s|&nbsp;)+/g;

	      // TODO: should we be doing this on paste?
	      scribe.registerHTMLFormatter('export', function (html) {
	        return html.replace(nbspCharRegExp, ' ');
	      });
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(112)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  escape
	) {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      scribe.registerPlainTextFormatter(escape);
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(86), __webpack_require__(113)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseToString, escapeHtmlChar) {

	  /** Used to match HTML entities and HTML characters. */
	  var reUnescapedHtml = /[&<>"'`]/g,
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /**
	   * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	   * their corresponding HTML entities.
	   *
	   * **Note:** No other characters are escaped. To escape additional characters
	   * use a third-party library like [_he_](https://mths.be/he).
	   *
	   * Though the ">" character is escaped for symmetry, characters like
	   * ">" and "/" don't require escaping in HTML and have no special meaning
	   * unless they're part of a tag or unquoted attribute value.
	   * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	   * (under "semi-related fun fact") for more details.
	   *
	   * Backticks are escaped because in Internet Explorer < 9, they can break out
	   * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
	   * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
	   * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
	   *
	   * When working with HTML you should always quote attribute values to reduce
	   * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escape('fred, barney, & pebbles');
	   * // => 'fred, barney, &amp; pebbles'
	   */
	  function escape(string) {
	    // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	    string = baseToString(string);
	    return (string && reHasUnescapedHtml.test(string))
	      ? string.replace(reUnescapedHtml, escapeHtmlChar)
	      : string;
	  }

	  return escape;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }

	  return escapeHtmlChar;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(115),
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  observeDomChanges,
	  Immutable
	) {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      /**
	       * Firefox: Giving focus to a `contenteditable` will place the caret
	       * outside of any block elements. Chrome behaves correctly by placing the
	       * caret at the  earliest point possible inside the first block element.
	       * As per: http://jsbin.com/eLoFOku/1/edit?js,console,output
	       *
	       * We detect when this occurs and fix it by placing the caret ourselves.
	       */
	      scribe.el.addEventListener('focus', function placeCaretOnFocus() {
	        var selection = new scribe.api.Selection();
	        // In Chrome, the range is not created on or before this event loop.
	        // It doesn’t matter because this is a fix for Firefox.
	        if (selection.range) {

	          var isFirefoxBug = scribe.allowsBlockElements() &&
	                  selection.range.startContainer === scribe.el;

	          if (isFirefoxBug) {
	            var focusElement = nodeHelpers.firstDeepestChild(scribe.el);

	            var range = selection.range;

	            range.setStart(focusElement, 0);
	            range.setEnd(focusElement, 0);

	            selection.selection.removeAllRanges();
	            selection.selection.addRange(range);
	          }
	        }
	      }.bind(scribe));

	      /**
	       * Apply the formatters when there is a DOM mutation.
	       */
	      var applyFormatters = function() {
	        if (!scribe._skipFormatters) {
	          var selection = new scribe.api.Selection();
	          var isEditorActive = selection.range;

	          var runFormatters = function () {
	            if (isEditorActive) {
	              selection.placeMarkers();
	            }
	            scribe.setHTML(scribe._htmlFormatterFactory.format(scribe.getHTML()));
	            selection.selectMarkers();
	          }.bind(scribe);

	          // We only want to wrap the formatting in a transaction if the editor is
	          // active. If the DOM is mutated when the editor isn't active (e.g.
	          // `scribe.setContent`), we do not want to push to the history. (This
	          // happens on the first `focus` event).

	          // The previous check is no longer needed, and the above comments are no longer valid.
	          // Now `scribe.setContent` updates the content manually, and `scribe.pushHistory`
	          // will not detect any changes, and nothing will be push into the history.
	          // Any mutations made without `scribe.getContent` will be pushed into the history normally.

	          // Pass content through formatters, place caret back
	          scribe.transactionManager.run(runFormatters);
	        }

	        delete scribe._skipFormatters;
	      }.bind(scribe);

	      observeDomChanges(scribe.el, applyFormatters);

	      // TODO: disconnect on tear down:
	      // observer.disconnect();

	      /**
	       * If the paragraphs option is set to true, we need to manually handle
	       * keyboard navigation inside a heading to ensure a P element is created.
	       */
	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.keyCode === 13) { // enter

	            var selection = new scribe.api.Selection();
	            var range = selection.range;

	            var headingNode = selection.getContaining(function (node) {
	              return (/^(H[1-6])$/).test(node.nodeName);
	            });

	            /**
	             * If we are at the end of the heading, insert a P. Otherwise handle
	             * natively.
	             */
	            if (headingNode && range.collapsed) {
	              var contentToEndRange = range.cloneRange();
	              contentToEndRange.setEndAfter(headingNode, 0);

	              // Get the content from the range to the end of the heading
	              var contentToEndFragment = contentToEndRange.cloneContents();

	              if (contentToEndFragment.firstChild.textContent === '') {
	                event.preventDefault();

	                scribe.transactionManager.run(function () {
	                  // Default P
	                  // TODO: Abstract somewhere
	                  var pNode = document.createElement('p');
	                  var brNode = document.createElement('br');
	                  pNode.appendChild(brNode);

	                  headingNode.parentNode.insertBefore(pNode, headingNode.nextElementSibling);

	                  // Re-apply range
	                  range.setStart(pNode, 0);
	                  range.setEnd(pNode, 0);

	                  selection.selection.removeAllRanges();
	                  selection.selection.addRange(range);
	                });
	              }
	            }
	          }
	        });
	      }

	      /**
	       * If the paragraphs option is set to true, we need to manually handle
	       * keyboard navigation inside list item nodes.
	       */
	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.keyCode === 13 || event.keyCode === 8) { // enter || backspace

	            var selection = new scribe.api.Selection();
	            var range = selection.range;

	            if (range.collapsed) {
	              var containerLIElement = selection.getContaining(function (node) {
	                return node.nodeName === 'LI';
	              });
	              if (containerLIElement && containerLIElement.textContent.trim() === '') {
	                /**
	                 * LIs
	                 */

	                event.preventDefault();

	                var listNode = selection.getContaining(function (node) {
	                  return node.nodeName === 'UL' || node.nodeName === 'OL';
	                });

	                var command = scribe.getCommand(listNode.nodeName === 'OL' ? 'insertOrderedList' : 'insertUnorderedList');

	                command.execute();
	              }
	            }
	          }
	        });
	      }

	      /**
	       * We have to hijack the paste event to ensure it uses
	       * `scribe.insertHTML`, which executes the Scribe version of the command
	       * and also runs the formatters.
	       */

	      /**
	       * TODO: could we implement this as a polyfill for `event.clipboardData` instead?
	       * I also don't like how it has the authority to perform `event.preventDefault`.
	       */

	      scribe.el.addEventListener('paste', function handlePaste(event) {
	        /**
	         * Browsers without the Clipboard API (specifically `ClipboardEvent.clipboardData`)
	         * will execute the second branch here.
	         */
	        if (event.clipboardData) {
	          event.preventDefault();

	          if (Immutable.List(event.clipboardData.types).includes('text/html')) {
	            scribe.insertHTML(event.clipboardData.getData('text/html'));
	          } else {
	            scribe.insertPlainText(event.clipboardData.getData('text/plain'));
	          }
	        } else {
	          /**
	           * If the browser doesn't have `ClipboardEvent.clipboardData`, we run through a
	           * sequence of events:
	           *
	           *   - Save the text selection
	           *   - Focus another, hidden textarea so we paste there
	           *   - Copy the pasted content of said textarea
	           *   - Give focus back to the scribe
	           *   - Restore the text selection
	           *
	           * This is required because, without access to the Clipboard API, there is literally
	           * no other way to manipulate content on paste.
	           * As per: https://github.com/jejacks0n/mercury/issues/23#issuecomment-2308347
	           *
	           * Firefox <= 21
	           * https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent.clipboardData
	           */

	          var selection = new scribe.api.Selection();

	          // Store the caret position
	          selection.placeMarkers();

	          var bin = document.createElement('div');
	          document.body.appendChild(bin);
	          bin.setAttribute('contenteditable', true);
	          bin.focus();

	          // Wait for the paste to happen (next loop?)
	          setTimeout(function () {
	            var data = bin.innerHTML;
	            bin.parentNode.removeChild(bin);

	            // Restore the caret position
	            selection.selectMarkers();
	            /**
	             * Firefox 19 (and maybe others): even though the applied range
	             * exists within the Scribe instance, we need to focus it.
	             */
	            scribe.el.focus();

	            scribe.insertHTML(data);
	          }, 1);
	        }
	      });

	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(105)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (nodeHelpers) {

	  var MutationObserver = window.MutationObserver ||
	    window.WebKitMutationObserver ||
	    window.MozMutationObserver;

	  function hasRealMutation(n) {
	    return ! nodeHelpers.isEmptyTextNode(n) &&
	      ! nodeHelpers.isSelectionMarkerNode(n);
	  }

	  function includeRealMutations(mutations) {
	    return mutations.some(function(mutation) {
	      return Array.prototype.some.call(mutation.addedNodes, hasRealMutation) ||
	        Array.prototype.some.call(mutation.removedNodes, hasRealMutation);
	    });
	  }

	  function observeDomChanges(el, callback) {
	    // Flag to avoid running recursively
	    var runningPostMutation = false;

	    var observer = new MutationObserver(function(mutations) {
	      if (! runningPostMutation && includeRealMutations(mutations)) {
	        runningPostMutation = true;

	        try {
	          callback();
	        } catch(e) {
	          // The catch block is required but we don't want to swallow the error
	          throw e;
	        } finally {
	          // We must yield to let any mutation we caused be triggered
	          // in the next cycle
	          setTimeout(function() {
	            runningPostMutation = false;
	          }, 0);
	        }
	      }
	    });

	    observer.observe(el, {
	      childList: true,
	      subtree: true
	    });

	    return observer;
	  }

	  return observeDomChanges;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(117),
	  __webpack_require__(118),
	  __webpack_require__(119),
	  __webpack_require__(120),
	  __webpack_require__(121),
	  __webpack_require__(122),
	  __webpack_require__(123)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  boldCommand,
	  indentCommand,
	  insertHTMLCommand,
	  insertListCommands,
	  outdentCommand,
	  createLinkCommand,
	  events
	) {

	  /**
	   * Command patches browser inconsistencies. They do not perform core features
	   * of the editor, such as ensuring P elements are created when
	   * applying/unapplying commands — that is the job of the core commands.
	   */

	  'use strict';

	  return {
	    commands: {
	      bold: boldCommand,
	      indent: indentCommand,
	      insertHTML: insertHTMLCommand,
	      insertList: insertListCommands,
	      outdent: outdentCommand,
	      createLink: createLinkCommand,
	    },
	    events: events
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var boldCommand = new scribe.api.CommandPatch('bold');

	      /**
	       * Chrome: Executing the bold command inside a heading corrupts the markup.
	       * Disabling for now.
	       */
	      boldCommand.queryEnabled = function () {
	        var selection = new scribe.api.Selection();
	        var headingNode = selection.getContaining(function (node) {
	          return (/^(H[1-6])$/).test(node.nodeName);
	        });

	        return scribe.api.CommandPatch.prototype.queryEnabled.apply(this, arguments) && ! headingNode;
	      };

	      // TODO: We can't use STRONGs because this would mean we have to
	      // re-implement the `queryState` command, which would be difficult.

	      scribe.commandPatches.bold = boldCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Prevent Chrome from inserting BLOCKQUOTEs inside of Ps, and also from
	   * adding a redundant `style` attribute to the created BLOCKQUOTE.
	   */

	  'use strict';

	  var INVISIBLE_CHAR = '\uFEFF';

	  return function () {
	    return function (scribe) {
	      var indentCommand = new scribe.api.CommandPatch('indent');

	      indentCommand.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          /**
	           * Chrome: If we apply the indent command on an empty P, the
	           * BLOCKQUOTE will be nested inside the P.
	           * As per: http://jsbin.com/oDOriyU/3/edit?html,js,output
	           */
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var isCaretOnNewLine =
	              (range.commonAncestorContainer.nodeName === 'P'
	               && range.commonAncestorContainer.innerHTML === '<br>');
	          if (isCaretOnNewLine) {
	            // FIXME: this text node is left behind. Tidy it up somehow,
	            // or don't use it at all.
	            var textNode = document.createTextNode(INVISIBLE_CHAR);

	            range.insertNode(textNode);

	            range.setStart(textNode, 0);
	            range.setEnd(textNode, 0);

	            selection.selection.removeAllRanges();
	            selection.selection.addRange(range);
	          }

	          scribe.api.CommandPatch.prototype.execute.call(this, value);

	          /**
	           * Chrome: The BLOCKQUOTE created contains a redundant style attribute.
	           * As per: http://jsbin.com/AkasOzu/1/edit?html,js,output
	           */

	          // Renew the selection
	          selection = new scribe.api.Selection();
	          var blockquoteNode = selection.getContaining(function (node) {
	            return node.nodeName === 'BLOCKQUOTE';
	          });

	          if (blockquoteNode) {
	            blockquoteNode.removeAttribute('style');
	          }
	        }.bind(this));
	      };

	      scribe.commandPatches.indent = indentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	  "use strict";
	  return function () {
	    return function (scribe) {
	      var insertHTMLCommandPatch = new scribe.api.CommandPatch('insertHTML');
	      var nodeHelpers = scribe.node;

	      insertHTMLCommandPatch.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);
	          nodeHelpers.removeChromeArtifacts(scribe.el);
	        }.bind(this));
	      };

	      scribe.commandPatches.insertHTML = insertHTMLCommandPatch;
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      var InsertListCommandPatch = function (commandName) {
	        scribe.api.CommandPatch.call(this, commandName);
	      };

	      InsertListCommandPatch.prototype = Object.create(scribe.api.CommandPatch.prototype);
	      InsertListCommandPatch.prototype.constructor = InsertListCommandPatch;

	      InsertListCommandPatch.prototype.execute = function (value) {
	        scribe.transactionManager.run(function () {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);

	          if (this.queryState()) {
	            var selection = new scribe.api.Selection();

	            var listElement = selection.getContaining(function (node) {
	              return node.nodeName === 'OL' || node.nodeName === 'UL';
	            });

	            /**
	             * Firefox: If we apply the insertOrderedList or the insertUnorderedList
	             * command on an empty block, a P will be inserted after the OL/UL.
	             * As per: http://jsbin.com/cubacoli/3/edit?html,js,output
	             */

	            if (listElement.nextElementSibling &&
	                listElement.nextElementSibling.childNodes.length === 0) {
	              nodeHelpers.removeNode(listElement.nextElementSibling);
	            }

	            /**
	             * Chrome: If we apply the insertOrderedList or the insertUnorderedList
	             * command on an empty block, the OL/UL will be nested inside the block.
	             * As per: http://jsbin.com/eFiRedUc/1/edit?html,js,output
	             */

	            if (listElement) {
	              var listParentNode = listElement.parentNode;
	              // If list is within a text block then split that block
	              if (listParentNode && /^(H[1-6]|P)$/.test(listParentNode.nodeName)) {
	                selection.placeMarkers();
	                // Move listElement out of the block
	                nodeHelpers.insertAfter(listElement, listParentNode);
	                selection.selectMarkers();

	                /**
	                 * Chrome 27-34: An empty text node is inserted.
	                 */
	                if (listParentNode.childNodes.length === 2 &&
	                    nodeHelpers.isEmptyTextNode(listParentNode.firstChild)) {
	                  nodeHelpers.removeNode(listParentNode);
	                }

	                // Remove the block if it's empty
	                if (listParentNode.childNodes.length === 0) {
	                  nodeHelpers.removeNode(listParentNode);
	                }
	              }
	            }

	            nodeHelpers.removeChromeArtifacts(listElement);
	          }
	        }.bind(this));
	      };

	      InsertListCommandPatch.prototype.queryState = function() {
	        try {
	          return scribe.api.CommandPatch.prototype.queryState.apply(this, arguments);
	        } catch (err) {
	          // Explicitly catch unexpected error when calling queryState - bug in Firefox: https://github.com/guardian/scribe/issues/208
	          if (err.name == 'NS_ERROR_UNEXPECTED') {
	            return false;
	          } else {
	            throw err;
	          }
	        }
	      };

	      scribe.commandPatches.insertOrderedList = new InsertListCommandPatch('insertOrderedList');
	      scribe.commandPatches.insertUnorderedList = new InsertListCommandPatch('insertUnorderedList');
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * Prevent Chrome from removing formatting of BLOCKQUOTE contents.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;
	      var outdentCommand = new scribe.api.CommandPatch('outdent');

	      outdentCommand.execute = function () {
	        scribe.transactionManager.run(function () {
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var blockquoteNode = selection.getContaining(function (node) {
	            return node.nodeName === 'BLOCKQUOTE';
	          });

	          if (range.commonAncestorContainer.nodeName === 'BLOCKQUOTE') {
	            /**
	             * Chrome: Applying the outdent command when a whole BLOCKQUOTE is
	             * selected removes the formatting of its contents.
	             * As per: http://jsbin.com/okAYaHa/1/edit?html,js,output
	             */

	            // Insert a copy of the selection before the BLOCKQUOTE, and then
	            // restore the selection on the copy.
	            selection.placeMarkers();
	            // We want to copy the selected nodes *with* the markers
	            selection.selectMarkers(true);
	            var selectedNodes = range.cloneContents();
	            blockquoteNode.parentNode.insertBefore(selectedNodes, blockquoteNode);
	            range.deleteContents();
	            selection.selectMarkers();

	            // Delete the BLOCKQUOTE if it's empty
	            if (blockquoteNode.textContent === '') {
	              blockquoteNode.parentNode.removeChild(blockquoteNode);
	            }
	          } else {
	            /**
	             * Chrome: If we apply the outdent command on a P, the contents of the
	             * P will be outdented instead of the whole P element.
	             * As per: http://jsbin.com/IfaRaFO/1/edit?html,js,output
	             */

	            var pNode = selection.getContaining(function (node) {
	              return node.nodeName === 'P';
	            });

	            if (pNode) {
	              /**
	               * If we are not at the start of end of a BLOCKQUOTE, we have to
	               * split the node and insert the P in the middle.
	               */

	              var nextSiblingNodes = nodeHelpers.nextSiblings(pNode);

	              if (!!nextSiblingNodes.size) {
	                var newContainerNode = document.createElement(blockquoteNode.nodeName);

	                while (!!nextSiblingNodes.size) {
	                  newContainerNode.appendChild(nextSiblingNodes.first());
	                  nextSiblingNodes = nextSiblingNodes.shift();
	                }

	                blockquoteNode.parentNode.insertBefore(newContainerNode, blockquoteNode.nextElementSibling);
	              }

	              selection.placeMarkers();
	              blockquoteNode.parentNode.insertBefore(pNode, blockquoteNode.nextElementSibling);
	              selection.selectMarkers();

	              // If the BLOCKQUOTE is now empty, clean it up.
	              if (blockquoteNode.innerHTML === '') {
	                blockquoteNode.parentNode.removeChild(blockquoteNode);
	              }
	            } else {
	              scribe.api.CommandPatch.prototype.execute.call(this);
	            }
	          }
	        }.bind(this));
	      };

	      scribe.commandPatches.outdent = outdentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var createLinkCommand = new scribe.api.CommandPatch('createLink');
	      scribe.commandPatches.createLink = createLinkCommand;

	      createLinkCommand.execute = function (value) {
	        var selection = new scribe.api.Selection();

	        /**
	         * Firefox does not create a link when selection is collapsed
	         * so we create it manually. http://jsbin.com/tutufi/2/edit?js,output
	         */
	        // using range.collapsed vs selection.isCollapsed - https://code.google.com/p/chromium/issues/detail?id=447523
	        if (selection.range.collapsed) {
	          var aElement = document.createElement('a');
	          aElement.setAttribute('href', value);
	          aElement.textContent = value;

	          selection.range.insertNode(aElement);

	          // Select the created link
	          var newRange = document.createRange();
	          newRange.setStartBefore(aElement);
	          newRange.setEndAfter(aElement);

	          selection.selection.removeAllRanges();
	          selection.selection.addRange(newRange);
	        } else {
	          scribe.api.CommandPatch.prototype.execute.call(this, value);
	        }
	      };
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      // TODO: do we need to run this on every key press, or could we
	      //       detect when the issue may have occurred?
	      // TODO: run in a transaction so as to record the change? how do
	      //       we know in advance whether there will be a change though?
	      // TODO: share somehow with `InsertList` command

	      var nodeHelpers = scribe.node;

	      if (scribe.allowsBlockElements()) {
	        scribe.el.addEventListener('keyup', function (event) {
	          if (event.keyCode === 8 || event.keyCode === 46) { // backspace or delete

	            var selection = new scribe.api.Selection();

	            // Note: the range is always collapsed on keyup here
	            var containerPElement = selection.getContaining(function (node) {
	              return node.nodeName === 'P';
	            });
	            if (containerPElement) {
	              /**
	               * The 'input' event listener has already triggered
	               * and recorded the faulty content as an item in the
	               * UndoManager. We interfere with the undoManager
	               * by force merging that transaction with the next
	               * transaction which produce a clean one instead.
	               *
	               * FIXME: ideally we would not trigger a
	               * 'content-changed' event with faulty HTML at all, but
	               * it's too late to cancel it at this stage (and it's
	               * not happened yet at keydown time).
	               */

	              scribe.transactionManager.run(function () {
	                // Store the caret position
	                selection.placeMarkers();
	                nodeHelpers.removeChromeArtifacts(containerPElement);
	                selection.selectMarkers();
	              }, true);
	            }
	          }
	        });
	      }
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(125),
	  __webpack_require__(126),
	  __webpack_require__(127),
	  __webpack_require__(128)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  buildCommandPatch,
	  buildCommand,
	  buildSelection,
	  buildSimpleCommand
	) {

	  'use strict';

	  return function Api(scribe) {
	    this.CommandPatch = buildCommandPatch(scribe);
	    this.Command = buildCommand(scribe);
	    this.Selection = buildSelection(scribe);
	    this.SimpleCommand = buildSimpleCommand(this, scribe);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    function CommandPatch(commandName) {
	      this.commandName = commandName;
	    }

	    CommandPatch.prototype.execute = function (value) {
	      scribe.transactionManager.run(function () {
	        document.execCommand(this.commandName, false, value || null);
	      }.bind(this));
	    };

	    CommandPatch.prototype.queryState = function () {
	      return document.queryCommandState(this.commandName);
	    };

	    CommandPatch.prototype.queryEnabled = function () {
	      return document.queryCommandEnabled(this.commandName);
	    };

	    return CommandPatch;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    function Command(commandName) {
	      this.commandName = commandName;
	      this.patch = scribe.commandPatches[this.commandName];
	    }

	    Command.prototype.execute = function (value) {
	      if (this.patch) {
	        this.patch.execute(value);
	      } else {
	        scribe.transactionManager.run(function () {
	          document.execCommand(this.commandName, false, value || null);
	        }.bind(this));
	      }
	    };

	    Command.prototype.queryState = function () {
	      if (this.patch) {
	        return this.patch.queryState();
	      } else {
	        return document.queryCommandState(this.commandName);
	      }
	    };

	    Command.prototype.queryEnabled = function () {
	      if (this.patch) {
	        return this.patch.queryEnabled();
	      } else {
	        return document.queryCommandEnabled(this.commandName);
	      }
	    };

	    return Command;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (scribe) {
	    var rootDoc = scribe.el.ownerDocument;
	    var nodeHelpers = scribe.node;

	    // find the parent document or document fragment
	    if( rootDoc.compareDocumentPosition(scribe.el) & Node.DOCUMENT_POSITION_DISCONNECTED ) {
	      var currentElement = scribe.el.parentNode;
	      while(currentElement && nodeHelpers.isFragment(currentElement)) {
	        currentElement = currentElement.parentNode;
	      }

	      // if we found a document fragment and it has a getSelection method, set it to the root doc
	      if (currentElement && currentElement.getSelection) {
	        rootDoc = currentElement;
	      }
	    }

	    function createMarker() {
	      var node = document.createElement('em');
	      node.style.display = 'none';
	      node.classList.add('scribe-marker');
	      return node;
	    }

	    function insertMarker(range, marker) {
	      range.insertNode(marker);

	      /**
	       * Chrome and Firefox: `Range.insertNode` inserts a bogus text node after
	       * the inserted element. We just remove it. This in turn creates several
	       * bugs when perfoming commands on selections that contain an empty text
	       * node (`removeFormat`, `unlink`).
	       * As per: http://jsbin.com/hajim/5/edit?js,console,output
	       */
	      if (marker.nextSibling && nodeHelpers.isEmptyTextNode(marker.nextSibling)) {
	        nodeHelpers.removeNode(marker.nextSibling);
	      }

	      /**
	       * Chrome and Firefox: `Range.insertNode` inserts a bogus text node before
	       * the inserted element when the child element is at the start of a block
	       * element. We just remove it.
	       * FIXME: Document why we need to remove this
	       * As per: http://jsbin.com/sifez/1/edit?js,console,output
	       */
	      if (marker.previousSibling && nodeHelpers.isEmptyTextNode(marker.previousSibling)) {
	        nodeHelpers.removeNode(marker.previousSibling);
	      }
	    }

	    /**
	     * Wrapper for object holding currently selected text.
	     */
	    function Selection() {
	      this.selection = rootDoc.getSelection();
	      if (this.selection.rangeCount && this.selection.anchorNode) {
	        var startNode   = this.selection.anchorNode;
	        var startOffset = this.selection.anchorOffset;
	        var endNode     = this.selection.focusNode;
	        var endOffset   = this.selection.focusOffset;

	        // if the range starts and ends on the same node, then we must swap the
	        // offsets if ever focusOffset is smaller than anchorOffset
	        if (startNode === endNode && endOffset < startOffset) {
	          var tmp = startOffset;
	          startOffset = endOffset;
	          endOffset = tmp;
	        }
	        // if the range ends *before* it starts, then we must reverse the range
	        else if (nodeHelpers.isBefore(endNode, startNode)) {
	          var tmpNode = startNode,
	            tmpOffset = startOffset;
	          startNode = endNode;
	          startOffset = endOffset;
	          endNode = tmpNode;
	          endOffset = tmpOffset;
	        }

	        // create the range to avoid chrome bug from getRangeAt / window.getSelection()
	        // https://code.google.com/p/chromium/issues/detail?id=380690
	        this.range = document.createRange();
	        this.range.setStart(startNode, startOffset);
	        this.range.setEnd(endNode, endOffset);
	      }
	    }

	    /**
	     * @returns Closest ancestor Node satisfying nodeFilter. Undefined if none exist before reaching Scribe container.
	     */
	    Selection.prototype.getContaining = function (nodeFilter) {
	      var range = this.range;
	      if (!range) { return; }

	      var node = this.range.commonAncestorContainer;
	      return ! (node && scribe.el === node) && nodeFilter(node) ?
	        node :
	        nodeHelpers.getAncestor(node, scribe.el, nodeFilter);
	    };

	    Selection.prototype.placeMarkers = function () {
	      var range = this.range;
	      if (!range) {
	        return;
	      }

	      //we need to ensure that the scribe's element lives within the current document to avoid errors with the range comparison (see below)
	      //one way to do this is to check if it's visible (is this the best way?).
	      if (!document.contains(scribe.el)) {
	        return;
	      }

	      //we want to ensure that the current selection is within the current scribe node
	      //if this isn't true scribe will place markers within the selections parent
	      //we want to ensure that scribe ONLY places markers within it's own element
	      if (scribe.el.contains(range.startContainer) && scribe.el.contains(range.endContainer)) {
	        // insert start marker
	        insertMarker(range.cloneRange(), createMarker());

	        if (! range.collapsed ) {
	          // End marker
	          var rangeEnd = range.cloneRange();
	          rangeEnd.collapse(false);
	          insertMarker(rangeEnd, createMarker());
	        }

	        this.selection.removeAllRanges();
	        this.selection.addRange(range);
	      }
	    };

	    Selection.prototype.getMarkers = function () {
	      return scribe.el.querySelectorAll('em.scribe-marker');
	    };

	    Selection.prototype.removeMarkers = function () {
	      Array.prototype.forEach.call(this.getMarkers(), function (marker) {
	        nodeHelpers.removeNode(marker);
	      });
	    };

	    // This will select markers if there are any. You will need to focus the
	    // Scribe instance’s element if it is not already for the selection to
	    // become active.
	    Selection.prototype.selectMarkers = function (keepMarkers) {
	      var markers = this.getMarkers();
	      if (!markers.length) {
	        return;
	      }

	      var newRange = document.createRange();

	      newRange.setStartBefore(markers[0]);
	      // We always reset the end marker because otherwise it will just
	      // use the current range’s end marker.
	      newRange.setEndAfter(markers.length >= 2 ? markers[1] : markers[0]);

	      if (! keepMarkers) {
	        this.removeMarkers();
	      }

	      this.selection.removeAllRanges();
	      this.selection.addRange(newRange);
	    };

	    Selection.prototype.isCaretOnNewLine = function () {
	      var containerPElement = this.getContaining(function (node) {
	        return node.nodeName === 'P';
	      });
	      return !! containerPElement && nodeHelpers.isEmptyInlineElement(containerPElement);
	    };

	    return Selection;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function (api, scribe) {
	    function SimpleCommand(commandName, nodeName) {
	      scribe.api.Command.call(this, commandName);

	      this._nodeName = nodeName;
	    }

	    SimpleCommand.prototype = Object.create(api.Command.prototype);
	    SimpleCommand.prototype.constructor = SimpleCommand;

	    SimpleCommand.prototype.queryState = function () {
	      var selection = new scribe.api.Selection();
	      return scribe.api.Command.prototype.queryState.call(this) && !! selection.getContaining(function (node) {
	        return node.nodeName === this._nodeName;
	      }.bind(this));
	    };

	    return SimpleCommand;
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(130),
	  __webpack_require__(131),
	  __webpack_require__(132),
	  __webpack_require__(133),
	  __webpack_require__(134),
	  __webpack_require__(135),
	  __webpack_require__(136)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  indent,
	  insertList,
	  outdent,
	  redo,
	  subscript,
	  superscript,
	  undo
	) {

	  'use strict';

	  return {
	    indent: indent,
	    insertList: insertList,
	    outdent: outdent,
	    redo: redo,
	    subscript: subscript,
	    superscript: superscript,
	    undo: undo
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var indentCommand = new scribe.api.Command('indent');

	      indentCommand.queryEnabled = function () {
	        /**
	         * FIXME: Chrome nests ULs inside of ULs
	         * Currently we just disable the command when the selection is inside of
	         * a list.
	         * As per: http://jsbin.com/ORikUPa/3/edit?html,js,output
	         */
	        var selection = new scribe.api.Selection();
	        var listElement = selection.getContaining(function (element) {
	          return element.nodeName === 'UL' || element.nodeName === 'OL';
	        });

	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements() && ! listElement;
	      };

	      scribe.commands.indent = indentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  /**
	   * If the paragraphs option is set to true, then when the list is
	   * unapplied, ensure that we enter a P element.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var nodeHelpers = scribe.node;

	      var InsertListCommand = function (commandName) {
	        scribe.api.Command.call(this, commandName);
	      };

	      InsertListCommand.prototype = Object.create(scribe.api.Command.prototype);
	      InsertListCommand.prototype.constructor = InsertListCommand;

	      InsertListCommand.prototype.execute = function (value) {
	        function splitList(listItemElements) {
	          if (!!listItemElements.size) {
	            var newListNode = document.createElement(listNode.nodeName);

	            while (!!listItemElements.size) {
	              newListNode.appendChild(listItemElements.first());
	              listItemElements = listItemElements.shift();
	            }

	            listNode.parentNode.insertBefore(newListNode, listNode.nextElementSibling);
	          }
	        }

	        if (this.queryState()) {
	          var selection = new scribe.api.Selection();
	          var range = selection.range;

	          var listNode = selection.getContaining(function (node) {
	            return node.nodeName === 'OL' || node.nodeName === 'UL';
	          });

	          var listItemElement = selection.getContaining(function (node) {
	            return node.nodeName === 'LI';
	          });

	          scribe.transactionManager.run(function () {
	            if (listItemElement) {
	              var nextListItemElements = nodeHelpers.nextSiblings(listItemElement);

	              /**
	               * If we are not at the start or end of a UL/OL, we have to
	               * split the node and insert the P(s) in the middle.
	               */
	              splitList(nextListItemElements);

	              /**
	               * Insert a paragraph in place of the list item.
	               */

	              selection.placeMarkers();

	              var pNode = document.createElement('p');
	              pNode.innerHTML = listItemElement.innerHTML;

	              listNode.parentNode.insertBefore(pNode, listNode.nextElementSibling);
	              listItemElement.parentNode.removeChild(listItemElement);
	            } else {
	              /**
	               * When multiple list items are selected, we replace each list
	               * item with a paragraph.
	               */

	              // We can't query for list items in the selection so we loop
	              // through them all and find the intersection ourselves.
	              var selectedListItemElements = Immutable.List(listNode.querySelectorAll('li'))
	                .filter(function (listItemElement) {
	                  return range.intersectsNode(listItemElement);
	                });
	              var lastSelectedListItemElement = selectedListItemElements.last();
	              var listItemElementsAfterSelection = nodeHelpers.nextSiblings(lastSelectedListItemElement);

	              /**
	               * If we are not at the start or end of a UL/OL, we have to
	               * split the node and insert the P(s) in the middle.
	               */
	              splitList(listItemElementsAfterSelection);

	              // Store the caret/range positioning inside of the list items so
	              // we can restore it from the newly created P elements soon
	              // afterwards.
	              selection.placeMarkers();

	              var documentFragment = document.createDocumentFragment();
	              selectedListItemElements.forEach(function (listItemElement) {
	                var pElement = document.createElement('p');
	                pElement.innerHTML = listItemElement.innerHTML;
	                documentFragment.appendChild(pElement);
	              });

	              // Insert the Ps
	              listNode.parentNode.insertBefore(documentFragment, listNode.nextElementSibling);

	              // Remove the LIs
	              selectedListItemElements.forEach(function (listItemElement) {
	                listItemElement.parentNode.removeChild(listItemElement);
	              });
	            }

	            // If the list is now empty, clean it up.
	            if (listNode.childNodes.length === 0) {
	              listNode.parentNode.removeChild(listNode);
	            }

	            selection.selectMarkers();
	          }.bind(this));
	        } else {
	          scribe.api.Command.prototype.execute.call(this, value);
	        }
	      };

	      InsertListCommand.prototype.queryEnabled = function () {
	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements();
	      };

	      scribe.commands.insertOrderedList = new InsertListCommand('insertOrderedList');
	      scribe.commands.insertUnorderedList = new InsertListCommand('insertUnorderedList');
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var outdentCommand = new scribe.api.Command('outdent');

	      outdentCommand.queryEnabled = function () {
	        /**
	         * FIXME: If the paragraphs option is set to true, then when the
	         * list is unapplied, ensure that we enter a P element.
	         * Currently we just disable the command when the selection is inside of
	         * a list.
	         */
	        var selection = new scribe.api.Selection();
	        var listElement = selection.getContaining(function (element) {
	          return element.nodeName === 'UL' || element.nodeName === 'OL';
	        });

	        // FIXME: define block element rule here?
	        return scribe.api.Command.prototype.queryEnabled.call(this) && scribe.allowsBlockElements() && ! listElement;
	      };

	      scribe.commands.outdent = outdentCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var redoCommand = new scribe.api.Command('redo');

	      redoCommand.execute = function () {
	        scribe.undoManager.redo();
	      };

	      redoCommand.queryEnabled = function () {
	        return scribe.undoManager.position > 0;
	      };

	      scribe.commands.redo = redoCommand;

	      //is scribe is configured to undo assign listener
	      if (scribe.options.undo.enabled) {
	        scribe.el.addEventListener('keydown', function (event) {
	          if (event.shiftKey && (event.metaKey || event.ctrlKey) && event.keyCode === 90) {
	            event.preventDefault();
	            redoCommand.execute();
	          }
	        });
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var subscriptCommand = new scribe.api.Command('subscript');

	      scribe.commands.subscript = subscriptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var superscriptCommand = new scribe.api.Command('superscript');

	      scribe.commands.superscript = superscriptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var undoCommand = new scribe.api.Command('undo');

	      undoCommand.execute = function () {
	        scribe.undoManager.undo();
	      };

	      undoCommand.queryEnabled = function () {
	        return scribe.undoManager.position < scribe.undoManager.length;
	      };

	      scribe.commands.undo = undoCommand;

	      if (scribe.options.undo.enabled) {
	        scribe.el.addEventListener('keydown', function (event) {
	          // TODO: use lib to abstract meta/ctrl keys?
	          if (! event.shiftKey && (event.metaKey || event.ctrlKey) && event.keyCode === 90) {
	            event.preventDefault();
	            undoCommand.execute();
	          }
	        });
	      }
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(103)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {
	  'use strict';

	  function UndoManager(limit, undoScopeHost) {
	    this._stack = Immutable.List();
	    this._limit = limit;
	    this._fireEvent = typeof CustomEvent != 'undefined' && undoScopeHost && undoScopeHost.dispatchEvent;
	    this._ush = undoScopeHost;

	    this.position = 0;
	    this.length = 0;
	  }

	  UndoManager.prototype.transact = function (transaction, merge) {
	    if (arguments.length < 2) {
	      throw new TypeError('Not enough arguments to UndoManager.transact.');
	    }

	    transaction.execute();

	    if (this.position > 0) {
	      this.clearRedo();
	    }

	    var transactions;
	    if (merge && this.length) {
	      transactions = this._stack.first().push(transaction);
	      this._stack = this._stack.shift().unshift(transactions);
	    }
	    else {
	      transactions = Immutable.List.of(transaction);
	      this._stack = this._stack.unshift(transactions);
	      this.length++;

	      if (this._limit && this.length > this._limit) {
	        this.clearUndo(this._limit);
	      }
	    }

	    this._dispatch('DOMTransaction', transactions);
	  };

	  UndoManager.prototype.undo = function () {
	    if (this.position >= this.length) { return; }

	    var transactions = this._stack.get(this.position);
	    var i = transactions.size;
	    while (i--) {
	      transactions.get(i).undo();
	    }
	    this.position++;

	    this._dispatch('undo', transactions);
	  };

	  UndoManager.prototype.redo = function () {
	    if (this.position === 0) { return; }

	    this.position--;
	    var transactions = this._stack.get(this.position);
	    for (var i = 0; i < transactions.size; i++) {
	      transactions.get(i).redo();
	    }

	    this._dispatch('redo', transactions);
	  };

	  UndoManager.prototype.item = function (index) {
	    return index >= 0 && index < this.length ?
	      this._stack.get(index).toArray() :
	      null;
	  };

	  UndoManager.prototype.clearUndo = function (position) {
	    this._stack = this._stack.take(position !== undefined ? position : this.position);
	    this.length = this._stack.size;
	  };

	  UndoManager.prototype.clearRedo = function () {
	    this._stack = this._stack.skip(this.position);
	    this.length = this._stack.size;
	    this.position = 0;
	  };

	  UndoManager.prototype._dispatch = function(event, transactions) {
	    if (this._fireEvent) {
	      this._ush.dispatchEvent(new CustomEvent(event, {
	        detail: {transactions: transactions.toArray()},
	        bubbles: true,
	        cancelable: false
	      }));
	    }
	  }

	  return UndoManager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(103)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Immutable) {

	  'use strict';

	  // TODO: once
	  // TODO: unit test
	  // Good example of a complete(?) implementation: https://github.com/Wolfy87/EventEmitter
	  function EventEmitter() {
	    this._listeners = {};
	  }

	  EventEmitter.prototype.on = function (eventName, fn) {
	    var listeners = this._listeners[eventName] || Immutable.Set();

	    this._listeners[eventName] = listeners.add(fn);
	  };

	  EventEmitter.prototype.off = function (eventName, fn) {
	    var listeners = this._listeners[eventName] || Immutable.Set();
	    if (fn) {
	      this._listeners[eventName] = listeners.delete(fn);
	    } else {
	      this._listeners[eventName] = listeners.clear();
	    }
	  };

	  EventEmitter.prototype.trigger = function (eventName, args) {

	    //fire events like my:custom:event -> my:custom -> my
	    var events = eventName.split(':');
	    while(!!events.length){
	      var currentEvent = events.join(':');
	      var listeners = this._listeners[currentEvent] || Immutable.Set();
	      //trigger handles
	      listeners.forEach(function (listener) {
	        listener.apply(null, args);
	      });
	      events.splice((events.length - 1), 1);
	    }
	  };

	  return EventEmitter;

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(140)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (defaults) {

	  var blockModePlugins = [
	    'setRootPElement',
	    'enforcePElements',
	    'ensureSelectableContainers',
	  ],
	  inlineModePlugins = [
	    'inlineElementsMode'
	  ],
	  defaultOptions = {
	    allowBlockElements: true,
	    debug: false,
	    undo: {
	      manager: false,
	      enabled: true,
	      limit: 100,
	      interval: 250
	    },
	    defaultCommandPatches: [
	      'bold',
	      'indent',
	      'insertHTML',
	      'insertList',
	      'outdent',
	      'createLink'
	    ],

	    defaultPlugins: blockModePlugins.concat(inlineModePlugins),

	    defaultFormatters: [
	      'escapeHtmlCharactersFormatter',
	      'replaceNbspCharsFormatter'
	    ]
	  };

	  /**
	   * Overrides defaults with user's options
	   *
	   * @param  {Object} userSuppliedOptions The user's options
	   * @return {Object}                     The overridden options
	   */
	  function checkOptions(userSuppliedOptions) {
	    var options = userSuppliedOptions || {};

	    // Remove invalid plugins
	    if (options.defaultPlugins) {
	      options.defaultPlugins    = options.defaultPlugins.filter(filterByPluginExists(defaultOptions.defaultPlugins));
	    }

	    if (options.defaultFormatters) {
	      options.defaultFormatters = options.defaultFormatters.filter(filterByPluginExists(defaultOptions.defaultFormatters));
	    }

	    return Object.freeze(defaults(options, defaultOptions));
	  }

	  /**
	   * Sorts a plugin list by a specified plugin name
	   *
	   * @param  {String} priorityPlugin The plugin name to be given priority
	   * @return {Function}              Sorting function for the given plugin name
	   */
	  function sortByPlugin(priorityPlugin) {
	    return function (pluginCurrent, pluginNext) {
	      if (pluginCurrent === priorityPlugin) {
	        // pluginCurrent comes before plugin next
	        return -1;
	      } else if (pluginNext === priorityPlugin) {
	        // pluginNext comes before pluginCurrent
	        return 1;
	      }

	      // Do no swap
	      return 0;
	    }
	  }

	  /**
	   * Filters a list of plugins by block level / inline level mode.
	   *
	   * @param  {Boolean} isBlockLevelMode Whether block level mode is enabled
	   * @return {Function}                 Filtering function based upon the given mode
	   */
	  function filterByBlockLevelMode(isBlockLevelMode) {
	    return function (plugin) {
	      return (isBlockLevelMode ? blockModePlugins : inlineModePlugins).indexOf(plugin) !== -1;
	    }
	  }

	  /**
	   * Filters a list of plugins by their validity
	   *
	   * @param  {Array<String>} pluginList   List of plugins to check against
	   * @return {Function}                   Filtering function based upon the given list
	   */
	  function filterByPluginExists(pluginList) {
	    return function (plugin) {
	      return pluginList.indexOf(plugin) !== -1;
	    }
	  }

	  return {
	    defaultOptions: defaultOptions,
	    checkOptions: checkOptions,
	    sortByPlugin: sortByPlugin,
	    filterByBlockLevelMode: filterByBlockLevelMode,
	    filterByPluginExists: filterByPluginExists
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(141), __webpack_require__(79), __webpack_require__(142)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, assign, assignDefaults) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties that resolve to `undefined`. Once a
	   * property is set, additional values of the same property are ignored.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	   * // => { 'user': 'barney', 'age': 36 }
	   */
	  function defaults(object) {
	    if (object == null) {
	      return object;
	    }
	    var args = arrayCopy(arguments);
	    args.push(assignDefaults);
	    return assign.apply(undefined, args);
	  }

	  return defaults;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayCopy(source, array) {
	    var index = -1,
	        length = source.length;

	    array || (array = Array(length));
	    while (++index < length) {
	      array[index] = source[index];
	    }
	    return array;
	  }

	  return arrayCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used by `_.defaults` to customize its `_.assign` use.
	   *
	   * @private
	   * @param {*} objectValue The destination object property value.
	   * @param {*} sourceValue The source object property value.
	   * @returns {*} Returns the value to assign to the destination object.
	   */
	  function assignDefaults(objectValue, sourceValue) {
	    return typeof objectValue == 'undefined' ? sourceValue : objectValue;
	  }

	  return assignDefaults;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  'use strict';

	  return function () {
	    return function (scribe) {
	      scribe.registerPlainTextFormatter(function (html) {
	        return html.replace(/\n([ \t]*\n)+/g, '</p><p>').replace(/\n/g, '<br>');
	      });
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	  /**
	   * This plugin adds a command for creating links, including a basic prompt.
	   */

	  'use strict';

	  return function () {
	    return function (scribe) {
	      var linkPromptCommand = new scribe.api.Command('createLink');

	      linkPromptCommand.nodeName = 'A';

	      linkPromptCommand.execute = function () {
	        var selection = new scribe.api.Selection();
	        var range = selection.range;
	        var anchorNode = selection.getContaining(function (node) {
	          return node.nodeName === this.nodeName;
	        }.bind(this));
	        var initialLink = anchorNode ? anchorNode.href : '';
	        var link = window.prompt('Enter a link.', initialLink);

	        if (anchorNode) {
	          range.selectNode(anchorNode);
	          selection.selection.removeAllRanges();
	          selection.selection.addRange(range);
	        }

	        // FIXME: I don't like how plugins like this do so much. Is there a way
	        // to compose?

	        if (link) {
	          // Prepend href protocol if missing
	          // If a http/s or mailto link is provided, then we will trust that an link is valid
	          var urlProtocolRegExp = /^https?\:\/\//;
	          var mailtoProtocolRegExp = /^mailto\:/;
	          if (! urlProtocolRegExp.test(link) && ! mailtoProtocolRegExp.test(link)) {
	            // For emails we just look for a `@` symbol as it is easier.
	            if (/@/.test(link)) {
	              var shouldPrefixEmail = window.confirm(
	                'The URL you entered appears to be an email address. ' +
	                'Do you want to add the required “mailto:” prefix?'
	              );
	              if (shouldPrefixEmail) {
	                link = 'mailto:' + link;
	              }
	            } else {
	              var shouldPrefixLink = window.confirm(
	                'The URL you entered appears to be a link. ' +
	                'Do you want to add the required “http://” prefix?'
	              );
	              if (shouldPrefixLink) {
	                link = 'http://' + link;
	              }
	            }
	          }

	          scribe.api.SimpleCommand.prototype.execute.call(this, link);
	        }
	      };

	      linkPromptCommand.queryState = function () {
	        /**
	         * We override the native `document.queryCommandState` for links because
	         * the `createLink` and `unlink` commands are not supported.
	         * As per: http://jsbin.com/OCiJUZO/1/edit?js,console,output
	         */
	        var selection = new scribe.api.Selection();
	        return !! selection.getContaining(function (node) {
	          return node.nodeName === this.nodeName;
	        }.bind(this));
	      };

	      scribe.commands.linkPrompt = linkPromptCommand;
	    };
	  };

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	  __webpack_require__(146),
	  __webpack_require__(147),
	  __webpack_require__(179)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (
	  HTMLJanitor,
	  merge,
	  cloneDeep
	) {

	  /**
	   * This plugin adds the ability to sanitize content when it is pasted into the
	   * scribe, adhering to a whitelist of allowed tags and attributes.
	   */

	  'use strict';

	  return function (config) {
	    // We extend the config to let through (1) Scribe position markers,
	    // otherwise we lose the caret position when running the Scribe content
	    // through this sanitizer, and (2) BR elements which are needed by the
	    // browser to ensure elements are selectable.
	    var configAllowMarkers = merge(cloneDeep(config), {
	      tags: {
	        em: {class: 'scribe-marker'},
	        br: {}
	      }
	    });

	    return function (scribe) {
	      var janitor = new HTMLJanitor(configAllowMarkers);

	      scribe.registerHTMLFormatter('sanitize', janitor.clean.bind(janitor));
	    };
	  };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.HTMLJanitor = factory();
	  }
	}(this, function () {

	  /**
	   * @param {Object} config.tags Dictionary of allowed tags.
	   * @param {boolean} config.keepNestedBlockElements Default false.
	   */
	  function HTMLJanitor(config) {
	    this.config = config;
	  }

	  // TODO: not exhaustive?
	  var blockElementNames = ['P', 'LI', 'TD', 'TH', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE'];
	  function isBlockElement(node) {
	    return blockElementNames.indexOf(node.nodeName) !== -1;
	  }

	  var inlineElementNames = ['A', 'B', 'STRONG', 'I', 'EM', 'SUB', 'SUP', 'U', 'STRIKE'];
	  function isInlineElement(node) {
	    return inlineElementNames.indexOf(node.nodeName) !== -1;
	  }

	  HTMLJanitor.prototype.clean = function (html) {
	    var sandbox = document.createElement('div');
	    sandbox.innerHTML = html;

	    this._sanitize(sandbox);

	    return sandbox.innerHTML;
	  };

	  HTMLJanitor.prototype._sanitize = function (parentNode) {
	    var treeWalker = createTreeWalker(parentNode);
	    var node = treeWalker.firstChild();
	    if (!node) { return; }

	    do {
	      var nodeName = node.nodeName.toLowerCase();
	      var allowedAttrs = this.config.tags[nodeName];

	      // Ignore nodes that have already been sanitized
	      if (node._sanitized) {
	        continue;
	      }

	      if (node.nodeType === Node.TEXT_NODE) {
	        // If this text node is just whitespace and the previous or next element
	        // sibling is a block element, remove it
	        // N.B.: This heuristic could change. Very specific to a bug with
	        // `contenteditable` in Firefox: http://jsbin.com/EyuKase/1/edit?js,output
	        // FIXME: make this an option?
	        if (node.data.trim() === ''
	            && ((node.previousElementSibling && isBlockElement(node.previousElementSibling))
	                 || (node.nextElementSibling && isBlockElement(node.nextElementSibling)))) {
	          parentNode.removeChild(node);
	          this._sanitize(parentNode);
	          break;
	        } else {
	          continue;
	        }
	      }

	      // Remove all comments
	      if (node.nodeType === Node.COMMENT_NODE) {
	        parentNode.removeChild(node);
	        this._sanitize(parentNode);
	        break;
	      }

	      var isInline = isInlineElement(node);
	      var containsBlockElement;
	      if (isInline) {
	        containsBlockElement = Array.prototype.some.call(node.childNodes, isBlockElement);
	      }

	      var isInvalid = isInline && containsBlockElement;

	      // Block elements should not be nested (e.g. <li><p>...); if
	      // they are, we want to unwrap the inner block element.
	      var isNotTopContainer = !! parentNode.parentNode;
	      var isNestedBlockElement =
	            isBlockElement(parentNode) &&
	            isBlockElement(node) &&
	            isNotTopContainer;

	      // Drop tag entirely according to the whitelist *and* if the markup
	      // is invalid.
	      if (!this.config.tags[nodeName] || isInvalid || (!this.config.keepNestedBlockElements && isNestedBlockElement)) {
	        // Do not keep the inner text of SCRIPT/STYLE elements.
	        if (! (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE')) {
	          while (node.childNodes.length > 0) {
	            parentNode.insertBefore(node.childNodes[0], node);
	          }
	        }
	        parentNode.removeChild(node);

	        this._sanitize(parentNode);
	        break;
	      }

	      // Sanitize attributes
	      for (var a = 0; a < node.attributes.length; a += 1) {
	        var attr = node.attributes[a];
	        var attrName = attr.name.toLowerCase();

	        // Allow attribute?
	        var allowedAttrValue = allowedAttrs[attrName] || allowedAttrs === true;
	        var notInAttrList = ! allowedAttrValue;
	        var valueNotAllowed = allowedAttrValue !== true && attr.value !== allowedAttrValue;
	        if (notInAttrList || valueNotAllowed) {
	          node.removeAttribute(attr.name);
	          // Shift the array to continue looping.
	          a = a - 1;
	        }
	      }

	      // Sanitize children
	      this._sanitize(node);

	      // Mark node as sanitized so it's ignored in future runs
	      node._sanitized = true;
	    } while ((node = treeWalker.nextSibling()));
	  };

	  function createTreeWalker(node) {
	    return document.createTreeWalker(node,
	                                     NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
	                                     null, false);
	  }

	  return HTMLJanitor;

	}));


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(148), __webpack_require__(175)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseMerge, createAssigner) {

	  /**
	   * Recursively merges own enumerable properties of the source object(s), that
	   * don't resolve to `undefined` into the destination object. Subsequent sources
	   * overwrite property assignments of previous sources. If `customizer` is
	   * provided it is invoked to produce the merged values of the destination and
	   * source properties. If `customizer` returns `undefined` merging is handled
	   * by the method instead. The `customizer` is bound to `thisArg` and invoked
	   * with five arguments; (objectValue, sourceValue, key, object, source).
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The destination object.
	   * @param {...Object} [sources] The source objects.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * var users = {
	   *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	   * };
	   *
	   * var ages = {
	   *   'data': [{ 'age': 36 }, { 'age': 40 }]
	   * };
	   *
	   * _.merge(users, ages);
	   * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	   *
	   * // using a customizer callback
	   * var object = {
	   *   'fruits': ['apple'],
	   *   'vegetables': ['beet']
	   * };
	   *
	   * var other = {
	   *   'fruits': ['banana'],
	   *   'vegetables': ['carrot']
	   * };
	   *
	   * _.merge(object, other, function(a, b) {
	   *   if (_.isArray(a)) {
	   *     return a.concat(b);
	   *   }
	   * });
	   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	   */
	  var merge = createAssigner(baseMerge);

	  return merge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(149), __webpack_require__(150), __webpack_require__(167), __webpack_require__(162), __webpack_require__(155), __webpack_require__(153), __webpack_require__(159), __webpack_require__(172)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayEach, baseForOwn, baseMergeDeep, isArray, isLength, isObject, isObjectLike, isTypedArray) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * The base implementation of `_.merge` without support for argument juggling,
	   * multiple sources, and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates values with source counterparts.
	   * @returns {Object} Returns the destination object.
	   */
	  function baseMerge(object, source, customizer, stackA, stackB) {
	    if (!isObject(object)) {
	      return object;
	    }
	    var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
	    (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
	      if (isObjectLike(srcValue)) {
	        stackA || (stackA = []);
	        stackB || (stackB = []);
	        return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	      }
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = typeof result == 'undefined';

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((isSrcArr || typeof result != 'undefined') &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    });
	    return object;
	  }

	  return baseMerge;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * A specialized version of `_.forEach` for arrays without support for callback
	   * shorthands or `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayEach(array, iteratee) {
	    var index = -1,
	        length = array.length;

	    while (++index < length) {
	      if (iteratee(array[index], index, array) === false) {
	        break;
	      }
	    }
	    return array;
	  }

	  return arrayEach;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(151), __webpack_require__(154)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseFor, keys) {

	  /**
	   * The base implementation of `_.forOwn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForOwn(object, iteratee) {
	    return baseFor(object, iteratee, keys);
	  }

	  return baseForOwn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(152)], __WEBPACK_AMD_DEFINE_RESULT__ = function(toObject) {

	  /**
	   * The base implementation of `baseForIn` and `baseForOwn` which iterates
	   * over `object` properties returned by `keysFunc` invoking `iteratee` for
	   * each property. Iterator functions may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {Function} keysFunc The function to get the keys of `object`.
	   * @returns {Object} Returns `object`.
	   */
	  function baseFor(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  }

	  return baseFor;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(153)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isObject) {

	  /**
	   * Converts `value` to an object if it is not one.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {Object} Returns the object.
	   */
	  function toObject(value) {
	    return isObject(value) ? value : Object(value);
	  }

	  return toObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is the language type of `Object`.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
	   *
	   * @static
	   * @memberOf _
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
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // Avoid a V8 JIT bug in Chrome 19-20.
	    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	    var type = typeof value;
	    return type == 'function' || (value && type == 'object') || false;
	  }

	  return isObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(155), __webpack_require__(156), __webpack_require__(153), __webpack_require__(160)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObject, shimKeys) {

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	  /**
	   * Creates an array of the own enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keys(new Foo);
	   * // => ['a', 'b'] (iteration order is not guaranteed)
	   *
	   * _.keys('hi');
	   * // => ['0', '1']
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (object) {
	      var Ctor = object.constructor,
	          length = object.length;
	    }
	    if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	        (typeof object != 'function' && (length && isLength(length)))) {
	      return shimKeys(object);
	    }
	    return isObject(object) ? nativeKeys(object) : [];
	  };

	  return keys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like length.
	   *
	   * **Note:** This function is based on ES `ToLength`. See the
	   * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	   */
	  function isLength(value) {
	    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	  }

	  return isLength;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(157), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(escapeRegExp, isObjectLike) {

	  /** `Object#toString` result references. */
	  var funcTag = '[object Function]';

	  /** Used to detect host constructors (Safari > 5). */
	  var reHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to resolve the decompiled source of functions. */
	  var fnToString = Function.prototype.toString;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Used to detect if a method is native. */
	  var reNative = RegExp('^' +
	    escapeRegExp(objToString)
	    .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	  );

	  /**
	   * Checks if `value` is a native function.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	   * @example
	   *
	   * _.isNative(Array.prototype.push);
	   * // => true
	   *
	   * _.isNative(_);
	   * // => false
	   */
	  function isNative(value) {
	    if (value == null) {
	      return false;
	    }
	    if (objToString.call(value) == funcTag) {
	      return reNative.test(fnToString.call(value));
	    }
	    return (isObjectLike(value) && reHostCtor.test(value)) || false;
	  }

	  return isNative;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(158)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseToString) {

	  /**
	   * Used to match `RegExp` special characters.
	   * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
	   * for more details.
	   */
	  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /**
	   * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
	   * "+", "(", ")", "[", "]", "{" and "}" in `string`.
	   *
	   * @static
	   * @memberOf _
	   * @category String
	   * @param {string} [string=''] The string to escape.
	   * @returns {string} Returns the escaped string.
	   * @example
	   *
	   * _.escapeRegExp('[lodash](https://lodash.com/)');
	   * // => '\[lodash\]\(https://lodash\.com/\)'
	   */
	  function escapeRegExp(string) {
	    string = baseToString(string);
	    return (string && reHasRegExpChars.test(string))
	      ? string.replace(reRegExpChars, '\\$&')
	      : string;
	  }

	  return escapeRegExp;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Converts `value` to a string if it is not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    if (typeof value == 'string') {
	      return value;
	    }
	    return value == null ? '' : (value + '');
	  }

	  return baseToString;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return (value && typeof value == 'object') || false;
	  }

	  return isObjectLike;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(161), __webpack_require__(162), __webpack_require__(163), __webpack_require__(155), __webpack_require__(164), __webpack_require__(165)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, keysIn, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * A fallback implementation of `Object.keys` which creates an array of the
	   * own enumerable property names of `object`.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   */
	  function shimKeys(object) {
	    var props = keysIn(object),
	        propsLength = props.length,
	        length = propsLength && object.length;

	    var allowIndexes = length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object)));

	    var index = -1,
	        result = [];

	    while (++index < propsLength) {
	      var key = props[index];
	      if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return shimKeys;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(155), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isObjectLike) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArguments(function() { return arguments; }());
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    var length = isObjectLike(value) ? value.length : undefined;
	    return (isLength(length) && objToString.call(value) == argsTag) || false;
	  }

	  return isArguments;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(155), __webpack_require__(156), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isNative, isObjectLike) {

	  /** `Object#toString` result references. */
	  var arrayTag = '[object Array]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /* Native method references for those with the same name as other `lodash` methods. */
	  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	  /**
	   * Checks if `value` is classified as an `Array` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   *
	   * _.isArray(function() { return arguments; }());
	   * // => false
	   */
	  var isArray = nativeIsArray || function(value) {
	    return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
	  };

	  return isArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Used as the maximum length of an array-like value.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	   * for more details.
	   */
	  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	  /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
	  function isIndex(value, length) {
	    value = +value;
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return value > -1 && value % 1 == 0 && value < length;
	  }

	  return isIndex;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(161), __webpack_require__(162), __webpack_require__(163), __webpack_require__(155), __webpack_require__(153), __webpack_require__(165)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isArguments, isArray, isIndex, isLength, isObject, support) {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Creates an array of the own and inherited enumerable property names of `object`.
	   *
	   * **Note:** Non-object values are coerced to objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Object
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns the array of property names.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.keysIn(new Foo);
	   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	   */
	  function keysIn(object) {
	    if (object == null) {
	      return [];
	    }
	    if (!isObject(object)) {
	      object = Object(object);
	    }
	    var length = object.length;
	    length = (length && isLength(length) &&
	      (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

	    var Ctor = object.constructor,
	        index = -1,
	        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	        result = Array(length),
	        skipIndexes = length > 0;

	    while (++index < length) {
	      result[index] = (index + '');
	    }
	    for (var key in object) {
	      if (!(skipIndexes && isIndex(key, length)) &&
	          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	        result.push(key);
	      }
	    }
	    return result;
	  }

	  return keysIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(156), __webpack_require__(166)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative, root) {

	  /** Used to detect functions containing a `this` reference. */
	  var reThis = /\bthis\b/;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to detect DOM support. */
	  var document = (document = root.window) && document.document;

	  /** Native method references. */
	  var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	  /**
	   * An object environment feature flags.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  var support = {};

	  (function(x) {

	    /**
	     * Detect if functions can be decompiled by `Function#toString`
	     * (all but Firefox OS certified apps, older Opera mobile browsers, and
	     * the PlayStation 3; forced `false` for Windows 8 apps).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcDecomp = !isNative(root.WinRTError) && reThis.test(function() { return this; });

	    /**
	     * Detect if `Function#name` is supported (all but IE).
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    support.funcNames = typeof Function.name == 'string';

	    /**
	     * Detect if the DOM is supported.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.dom = document.createDocumentFragment().nodeType === 11;
	    } catch(e) {
	      support.dom = false;
	    }

	    /**
	     * Detect if `arguments` object indexes are non-enumerable.
	     *
	     * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	     * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	     * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	     * checks for indexes that exceed their function's formal parameters with
	     * associated values of `0`.
	     *
	     * @memberOf _.support
	     * @type boolean
	     */
	    try {
	      support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
	    } catch(e) {
	      support.nonEnumArgs = true;
	    }
	  }(0, 0));

	  return support;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;

	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window;

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it is the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || this;

	  return root;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)(module), (function() { return this; }())))

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(168), __webpack_require__(161), __webpack_require__(162), __webpack_require__(155), __webpack_require__(169), __webpack_require__(172), __webpack_require__(173)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, isArguments, isArray, isLength, isPlainObject, isTypedArray, toPlainObject) {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /**
	   * A specialized version of `baseMerge` for arrays and objects which performs
	   * deep merges and tracks traversed objects enabling objects with circular
	   * references to be merged.
	   *
	   * @private
	   * @param {Object} object The destination object.
	   * @param {Object} source The source object.
	   * @param {string} key The key of the value to merge.
	   * @param {Function} mergeFunc The function to merge values.
	   * @param {Function} [customizer] The function to customize merging properties.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates values with source counterparts.
	   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	   */
	  function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	    var length = stackA.length,
	        srcValue = source[key];

	    while (length--) {
	      if (stackA[length] == srcValue) {
	        object[key] = stackB[length];
	        return;
	      }
	    }
	    var value = object[key],
	        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	        isCommon = typeof result == 'undefined';

	    if (isCommon) {
	      result = srcValue;
	      if (isLength(srcValue.length) && (isArray(srcValue) || isTypedArray(srcValue))) {
	        result = isArray(value)
	          ? value
	          : (value ? arrayCopy(value) : []);
	      }
	      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	        result = isArguments(value)
	          ? toPlainObject(value)
	          : (isPlainObject(value) ? value : {});
	      }
	      else {
	        isCommon = false;
	      }
	    }
	    // Add the source value to the stack of traversed objects and associate
	    // it with its merged value.
	    stackA.push(srcValue);
	    stackB.push(result);

	    if (isCommon) {
	      // Recursively merge objects and arrays (susceptible to call stack limits).
	      object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	    } else if (result === result ? (result !== value) : (value === value)) {
	      object[key] = result;
	    }
	  }

	  return baseMergeDeep;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the values of `source` to `array`.
	   *
	   * @private
	   * @param {Array} source The array to copy values from.
	   * @param {Array} [array=[]] The array to copy values to.
	   * @returns {Array} Returns `array`.
	   */
	  function arrayCopy(source, array) {
	    var index = -1,
	        length = source.length;

	    array || (array = Array(length));
	    while (++index < length) {
	      array[index] = source[index];
	    }
	    return array;
	  }

	  return arrayCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(156), __webpack_require__(170)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isNative, shimIsPlainObject) {

	  /** `Object#toString` result references. */
	  var objectTag = '[object Object]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /** Native method references. */
	  var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

	  /**
	   * Checks if `value` is a plain object, that is, an object created by the
	   * `Object` constructor or one with a `[[Prototype]]` of `null`.
	   *
	   * **Note:** This method assumes objects created by the `Object` constructor
	   * have no inherited enumerable properties.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	   * @example
	   *
	   * function Foo() {
	   *   this.a = 1;
	   * }
	   *
	   * _.isPlainObject(new Foo);
	   * // => false
	   *
	   * _.isPlainObject([1, 2, 3]);
	   * // => false
	   *
	   * _.isPlainObject({ 'x': 0, 'y': 0 });
	   * // => true
	   *
	   * _.isPlainObject(Object.create(null));
	   * // => true
	   */
	  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	    if (!(value && objToString.call(value) == objectTag)) {
	      return false;
	    }
	    var valueOf = value.valueOf,
	        objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	    return objProto
	      ? (value == objProto || getPrototypeOf(value) == objProto)
	      : shimIsPlainObject(value);
	  };

	  return isPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(171), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseForIn, isObjectLike) {

	  /** `Object#toString` result references. */
	  var objectTag = '[object Object]';

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * A fallback implementation of `_.isPlainObject` which checks if `value`
	   * is an object created by the `Object` constructor or has a `[[Prototype]]`
	   * of `null`.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	   */
	  function shimIsPlainObject(value) {
	    var Ctor;

	    // Exit early for non `Object` objects.
	    if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
	        (!hasOwnProperty.call(value, 'constructor') &&
	          (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	      return false;
	    }
	    // IE < 9 iterates inherited properties before own properties. If the first
	    // iterated property is an object's own property then there are no inherited
	    // enumerable properties.
	    var result;
	    // In most environments an object's own properties are iterated before
	    // its inherited properties. If the last iterated property is an object's
	    // own property then there are no inherited enumerable properties.
	    baseForIn(value, function(subValue, key) {
	      result = key;
	    });
	    return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	  }

	  return shimIsPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(151), __webpack_require__(164)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseFor, keysIn) {

	  /**
	   * The base implementation of `_.forIn` without support for callback
	   * shorthands and `this` binding.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Object} Returns `object`.
	   */
	  function baseForIn(object, iteratee) {
	    return baseFor(object, iteratee, keysIn);
	  }

	  return baseForIn;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(155), __webpack_require__(159)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isLength, isObjectLike) {

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	  typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * Checks if `value` is classified as a typed array.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   * @example
	   *
	   * _.isTypedArray(new Uint8Array);
	   * // => true
	   *
	   * _.isTypedArray([]);
	   * // => false
	   */
	  function isTypedArray(value) {
	    return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
	  }

	  return isTypedArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(174), __webpack_require__(164)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseCopy, keysIn) {

	  /**
	   * Converts `value` to a plain object flattening inherited enumerable
	   * properties of `value` to own properties of the plain object.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to convert.
	   * @returns {Object} Returns the converted plain object.
	   * @example
	   *
	   * function Foo() {
	   *   this.b = 2;
	   * }
	   *
	   * Foo.prototype.c = 3;
	   *
	   * _.assign({ 'a': 1 }, new Foo);
	   * // => { 'a': 1, 'b': 2 }
	   *
	   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	   * // => { 'a': 1, 'b': 2, 'c': 3 }
	   */
	  function toPlainObject(value) {
	    return baseCopy(value, keysIn(value));
	  }

	  return toPlainObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Copies the properties of `source` to `object`.
	   *
	   * @private
	   * @param {Object} source The object to copy properties from.
	   * @param {Object} [object={}] The object to copy properties to.
	   * @param {Array} props The property names to copy.
	   * @returns {Object} Returns `object`.
	   */
	  function baseCopy(source, object, props) {
	    if (!props) {
	      props = object;
	      object = {};
	    }
	    var index = -1,
	        length = props.length;

	    while (++index < length) {
	      var key = props[index];
	      object[key] = source[key];
	    }
	    return object;
	  }

	  return baseCopy;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(176), __webpack_require__(178)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bindCallback, isIterateeCall) {

	  /**
	   * Creates a function that assigns properties of source object(s) to a given
	   * destination object.
	   *
	   * @private
	   * @param {Function} assigner The function to assign values.
	   * @returns {Function} Returns the new assigner function.
	   */
	  function createAssigner(assigner) {
	    return function() {
	      var args = arguments,
	          length = args.length,
	          object = args[0];

	      if (length < 2 || object == null) {
	        return object;
	      }
	      var customizer = args[length - 2],
	          thisArg = args[length - 1],
	          guard = args[3];

	      if (length > 3 && typeof customizer == 'function') {
	        customizer = bindCallback(customizer, thisArg, 5);
	        length -= 2;
	      } else {
	        customizer = (length > 2 && typeof thisArg == 'function') ? thisArg : null;
	        length -= (customizer ? 1 : 0);
	      }
	      if (guard && isIterateeCall(args[1], args[2], guard)) {
	        customizer = length == 3 ? null : customizer;
	        length = 2;
	      }
	      var index = 0;
	      while (++index < length) {
	        var source = args[index];
	        if (source) {
	          assigner(object, source, customizer);
	        }
	      }
	      return object;
	    };
	  }

	  return createAssigner;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(177)], __WEBPACK_AMD_DEFINE_RESULT__ = function(identity) {

	  /**
	   * A specialized version of `baseCallback` which only supports `this` binding
	   * and specifying the number of arguments to provide to `func`.
	   *
	   * @private
	   * @param {Function} func The function to bind.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {number} [argCount] The number of arguments to provide to `func`.
	   * @returns {Function} Returns the callback.
	   */
	  function bindCallback(func, thisArg, argCount) {
	    if (typeof func != 'function') {
	      return identity;
	    }
	    if (typeof thisArg == 'undefined') {
	      return func;
	    }
	    switch (argCount) {
	      case 1: return function(value) {
	        return func.call(thisArg, value);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	      case 5: return function(value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	    }
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  }

	  return bindCallback;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * This method returns the first argument provided to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value Any value.
	   * @returns {*} Returns `value`.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   *
	   * _.identity(object) === object;
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }

	  return identity;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(163), __webpack_require__(155), __webpack_require__(153)], __WEBPACK_AMD_DEFINE_RESULT__ = function(isIndex, isLength, isObject) {

	  /**
	   * Checks if the provided arguments are from an iteratee call.
	   *
	   * @private
	   * @param {*} value The potential iteratee value argument.
	   * @param {*} index The potential iteratee index or key argument.
	   * @param {*} object The potential iteratee object argument.
	   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	   */
	  function isIterateeCall(value, index, object) {
	    if (!isObject(object)) {
	      return false;
	    }
	    var type = typeof index;
	    if (type == 'number') {
	      var length = object.length,
	          prereq = isLength(length) && isIndex(index, length);
	    } else {
	      prereq = type == 'string' && index in object;
	    }
	    if (prereq) {
	      var other = object[index];
	      return value === value ? (value === other) : (other !== other);
	    }
	    return false;
	  }

	  return isIterateeCall;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(180), __webpack_require__(176)], __WEBPACK_AMD_DEFINE_RESULT__ = function(baseClone, bindCallback) {

	  /**
	   * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	   * to produce the cloned values. If `customizer` returns `undefined` cloning
	   * is handled by the method instead. The `customizer` is bound to `thisArg`
	   * and invoked with two argument; (value [, index|key, object]).
	   *
	   * **Note:** This method is loosely based on the structured clone algorithm.
	   * The enumerable properties of `arguments` objects and objects created by
	   * constructors other than `Object` are cloned to plain `Object` objects. An
	   * empty object is returned for uncloneable values such as functions, DOM nodes,
	   * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
	   * for more details.
	   *
	   * @static
	   * @memberOf _
	   * @category Lang
	   * @param {*} value The value to deep clone.
	   * @param {Function} [customizer] The function to customize cloning values.
	   * @param {*} [thisArg] The `this` binding of `customizer`.
	   * @returns {*} Returns the deep cloned value.
	   * @example
	   *
	   * var users = [
	   *   { 'user': 'barney' },
	   *   { 'user': 'fred' }
	   * ];
	   *
	   * var deep = _.cloneDeep(users);
	   * deep[0] === users[0];
	   * // => false
	   *
	   * // using a customizer callback
	   * var el = _.cloneDeep(document.body, function(value) {
	   *   if (_.isElement(value)) {
	   *     return value.cloneNode(true);
	   *   }
	   * });
	   *
	   * el === document.body
	   * // => false
	   * el.nodeName
	   * // => BODY
	   * el.childNodes.length;
	   * // => 20
	   */
	  function cloneDeep(value, customizer, thisArg) {
	    customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
	    return baseClone(value, true, customizer);
	  }

	  return cloneDeep;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(168), __webpack_require__(149), __webpack_require__(174), __webpack_require__(150), __webpack_require__(184), __webpack_require__(181), __webpack_require__(185), __webpack_require__(162), __webpack_require__(153), __webpack_require__(154)], __WEBPACK_AMD_DEFINE_RESULT__ = function(arrayCopy, arrayEach, baseCopy, baseForOwn, initCloneArray, initCloneByTag, initCloneObject, isArray, isObject, keys) {

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] =
	  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	  cloneableTags[dateTag] = cloneableTags[float32Tag] =
	  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	  cloneableTags[numberTag] = cloneableTags[objectTag] =
	  cloneableTags[regexpTag] = cloneableTags[stringTag] =
	  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] =
	  cloneableTags[mapTag] = cloneableTags[setTag] =
	  cloneableTags[weakMapTag] = false;

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /**
	   * Used to resolve the `toStringTag` of values.
	   * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	   * for more details.
	   */
	  var objToString = objectProto.toString;

	  /**
	   * The base implementation of `_.clone` without support for argument juggling
	   * and `this` binding `customizer` functions.
	   *
	   * @private
	   * @param {*} value The value to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @param {Function} [customizer] The function to customize cloning values.
	   * @param {string} [key] The key of `value`.
	   * @param {Object} [object] The object `value` belongs to.
	   * @param {Array} [stackA=[]] Tracks traversed source objects.
	   * @param {Array} [stackB=[]] Associates clones with source counterparts.
	   * @returns {*} Returns the cloned value.
	   */
	  function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	    var result;
	    if (customizer) {
	      result = object ? customizer(value, key, object) : customizer(value);
	    }
	    if (typeof result != 'undefined') {
	      return result;
	    }
	    if (!isObject(value)) {
	      return value;
	    }
	    var isArr = isArray(value);
	    if (isArr) {
	      result = initCloneArray(value);
	      if (!isDeep) {
	        return arrayCopy(value, result);
	      }
	    } else {
	      var tag = objToString.call(value),
	          isFunc = tag == funcTag;

	      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	        result = initCloneObject(isFunc ? {} : value);
	        if (!isDeep) {
	          return baseCopy(value, result, keys(value));
	        }
	      } else {
	        return cloneableTags[tag]
	          ? initCloneByTag(value, tag, isDeep)
	          : (object ? value : {});
	      }
	    }
	    // Check for circular references and return corresponding clone.
	    stackA || (stackA = []);
	    stackB || (stackB = []);

	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == value) {
	        return stackB[length];
	      }
	    }
	    // Add the source value to the stack of traversed objects and associate it with its clone.
	    stackA.push(value);
	    stackB.push(result);

	    // Recursively populate clone (susceptible to call stack limits).
	    (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	      result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	    });
	    return result;
	  }

	  return baseClone;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(182)], __WEBPACK_AMD_DEFINE_RESULT__ = function(bufferClone) {

	  /** `Object#toString` result references. */
	  var boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      numberTag = '[object Number]',
	      regexpTag = '[object RegExp]',
	      stringTag = '[object String]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /**
	   * Initializes an object clone based on its `toStringTag`.
	   *
	   * **Note:** This function only supports cloning values with tags of
	   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	   *
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @param {string} tag The `toStringTag` of the object to clone.
	   * @param {boolean} [isDeep] Specify a deep clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneByTag(object, tag, isDeep) {
	    var Ctor = object.constructor;
	    switch (tag) {
	      case arrayBufferTag:
	        return bufferClone(object);

	      case boolTag:
	      case dateTag:
	        return new Ctor(+object);

	      case float32Tag: case float64Tag:
	      case int8Tag: case int16Tag: case int32Tag:
	      case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	        var buffer = object.buffer;
	        return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	      case numberTag:
	      case stringTag:
	        return new Ctor(object);

	      case regexpTag:
	        var result = new Ctor(object.source, reFlags.exec(object));
	        result.lastIndex = object.lastIndex;
	    }
	    return result;
	  }

	  return initCloneByTag;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(183), __webpack_require__(156), __webpack_require__(166)], __WEBPACK_AMD_DEFINE_RESULT__ = function(constant, isNative, root) {

	  /** Native method references. */
	  var ArrayBuffer = isNative(ArrayBuffer = root.ArrayBuffer) && ArrayBuffer,
	      bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
	      floor = Math.floor,
	      Uint8Array = isNative(Uint8Array = root.Uint8Array) && Uint8Array;

	  /** Used to clone array buffers. */
	  var Float64Array = (function() {
	    // Safari 5 errors when using an array buffer to initialize a typed array
	    // where the array buffer's `byteLength` is not a multiple of the typed
	    // array's `BYTES_PER_ELEMENT`.
	    try {
	      var func = isNative(func = root.Float64Array) && func,
	          result = new func(new ArrayBuffer(10), 0, 1) && func;
	    } catch(e) {}
	    return result;
	  }());

	  /** Used as the size, in bytes, of each `Float64Array` element. */
	  var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	  /**
	   * Creates a clone of the given array buffer.
	   *
	   * @private
	   * @param {ArrayBuffer} buffer The array buffer to clone.
	   * @returns {ArrayBuffer} Returns the cloned array buffer.
	   */
	  function bufferClone(buffer) {
	    return bufferSlice.call(buffer, 0);
	  }
	  if (!bufferSlice) {
	    // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	    bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
	      var byteLength = buffer.byteLength,
	          floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	          offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	          result = new ArrayBuffer(byteLength);

	      if (floatLength) {
	        var view = new Float64Array(result, 0, floatLength);
	        view.set(new Float64Array(buffer, 0, floatLength));
	      }
	      if (byteLength != offset) {
	        view = new Uint8Array(result, offset);
	        view.set(new Uint8Array(buffer, offset));
	      }
	      return result;
	    };
	  }

	  return bufferClone;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Creates a function that returns `value`.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {*} value The value to return from the new function.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var object = { 'user': 'fred' };
	   * var getter = _.constant(object);
	   *
	   * getter() === object;
	   * // => true
	   */
	  function constant(value) {
	    return function() {
	      return value;
	    };
	  }

	  return constant;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /** Used for native method references. */
	  var objectProto = Object.prototype;

	  /** Used to check objects for own properties. */
	  var hasOwnProperty = objectProto.hasOwnProperty;

	  /**
	   * Initializes an array clone.
	   *
	   * @private
	   * @param {Array} array The array to clone.
	   * @returns {Array} Returns the initialized clone.
	   */
	  function initCloneArray(array) {
	    var length = array.length,
	        result = new array.constructor(length);

	    // Add array properties assigned by `RegExp#exec`.
	    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	      result.index = array.index;
	      result.input = array.input;
	    }
	    return result;
	  }

	  return initCloneArray;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	  /**
	   * Initializes an object clone.
	   *
	   * @private
	   * @param {Object} object The object to clone.
	   * @returns {Object} Returns the initialized clone.
	   */
	  function initCloneObject(object) {
	    var Ctor = object.constructor;
	    if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	      Ctor = Object;
	    }
	    return new Ctor;
	  }

	  return initCloneObject;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var template = [
	  "<div class='st-block-positioner__inner'>",
	  "<span class='st-block-positioner__selected-value'></span>",
	  "<select class='st-block-positioner__select'></select>",
	  "</div>"
	].join("\n");

	var BlockPositioner = function(block_element, mediator) {
	  this.mediator = mediator;
	  this.$block = block_element;

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize();
	};

	Object.assign(BlockPositioner.prototype, __webpack_require__(187), __webpack_require__(188), {

	  total_blocks: 0,

	  bound: ['onBlockCountChange', 'onSelectChange', 'toggle', 'show', 'hide'],

	  className: 'st-block-positioner',
	  visibleClass: 'st-block-positioner--is-visible',

	  initialize: function(){
	    this.$el.append(template);
	    this.$select = this.$('.st-block-positioner__select');

	    this.$select.on('change', this.onSelectChange);

	    this.mediator.on("block:countUpdate", this.onBlockCountChange);
	  },

	  onBlockCountChange: function(new_count) {
	    if (new_count !== this.total_blocks) {
	      this.total_blocks = new_count;
	      this.renderPositionList();
	    }
	  },

	  onSelectChange: function() {
	    var val = this.$select.val();
	    if (val !== 0) {
	      this.mediator.trigger(
	        "block:changePosition", this.$block, val,
	        (val === 1 ? 'before' : 'after'));
	      this.toggle();
	    }
	  },

	  renderPositionList: function() {
	    var inner = "<option value='0'>" + i18n.t("general:position") + "</option>";
	    for(var i = 1; i <= this.total_blocks; i++) {
	      inner += "<option value="+i+">"+i+"</option>";
	    }
	    this.$select.html(inner);
	  },

	  toggle: function() {
	    this.$select.val(0);
	    this.$el.toggleClass(this.visibleClass);
	  },

	  show: function(){
	    this.$el.addClass(this.visibleClass);
	  },

	  hide: function(){
	    this.$el.removeClass(this.visibleClass);
	  }

	});

	module.exports = BlockPositioner;


/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";

	/* Generic function binding utility, used by lots of our classes */

	module.exports = {
	  bound: [],
	  _bindFunctions: function(){
	    this.bound.forEach(function(f) {
	      this[f] = this[f].bind(this);
	    }, this);
	  }
	};



/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	module.exports = {
	  tagName: 'div',
	  className: 'sir-trevor__view',
	  attributes: {},

	  $: function(selector) {
	    return this.$el.find(selector);
	  },

	  render: function() {
	    return this;
	  },

	  destroy: function() {
	    if (!_.isUndefined(this.stopListening)) { this.stopListening(); }
	    this.$el.remove();
	  },

	  _ensureElement: function() {
	    if (!this.el) {
	      var attrs = Object.assign({}, _.result(this, 'attributes')),
	      html;
	      if (this.id) { attrs.id = this.id; }
	      if (this.className) { attrs['class'] = this.className; }

	      if (attrs.html) {
	        html = attrs.html;
	        delete attrs.html;
	      }
	      var $el = $('<' + this.tagName + '>').attr(attrs);
	      if (html) { $el.html(html); }
	      this._setElement($el);
	    } else {
	      this._setElement(this.el);
	    }
	  },

	  _setElement: function(element) {
	    this.$el = $(element);
	    this.el = this.$el[0];
	    return this;
	  }
	};



/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var EventBus = __webpack_require__(62);

	var BlockReorder = function(block_element, mediator) {
	  this.$block = block_element;
	  this.blockID = this.$block.attr('id');
	  this.mediator = mediator;

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize();
	};

	Object.assign(BlockReorder.prototype, __webpack_require__(187), __webpack_require__(188), {

	  bound: ['onMouseDown', 'onDragStart', 'onDragEnd', 'onDrop'],

	  className: 'st-block-ui-btn st-block-ui-btn--reorder st-icon',
	  tagName: 'a',

	  attributes: function() {
	    return {
	      'html': 'reorder',
	      'draggable': 'true',
	      'data-icon': 'move'
	    };
	  },

	  initialize: function() {
	    this.$el.bind('mousedown touchstart', this.onMouseDown)
	      .bind('dragstart', this.onDragStart)
	      .bind('dragend touchend', this.onDragEnd);

	    this.$block.dropArea()
	      .bind('drop', this.onDrop);
	  },

	  blockId: function() {
	    return this.$block.attr('id');
	  },

	  onMouseDown: function() {
	    this.mediator.trigger("block-controls:hide");
	    EventBus.trigger("block:reorder:down");
	  },

	  onDrop: function(ev) {
	    ev.preventDefault();

	    var dropped_on = this.$block,
	    item_id = ev.originalEvent.dataTransfer.getData("text/plain"),
	    block = $('#' + item_id);

	    if (!_.isUndefined(item_id) && !_.isEmpty(block) &&
	        dropped_on.attr('id') !== item_id &&
	          dropped_on.attr('data-instance') === block.attr('data-instance')
	       ) {
	       dropped_on.after(block);
	     }
	     this.mediator.trigger("block:rerender", item_id);
	     EventBus.trigger("block:reorder:dropped", item_id);
	  },

	  onDragStart: function(ev) {
	    var btn = $(ev.currentTarget).parent();

	    ev.originalEvent.dataTransfer.setDragImage(this.$block[0], btn.position().left, btn.position().top);
	    ev.originalEvent.dataTransfer.setData('Text', this.blockId());

	    EventBus.trigger("block:reorder:dragstart");
	    this.$block.addClass('st-block--dragging');
	  },

	  onDragEnd: function(ev) {
	    EventBus.trigger("block:reorder:dragend");
	    this.$block.removeClass('st-block--dragging');
	  },

	  render: function() {
	    return this;
	  }

	});

	module.exports = BlockReorder;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var BlockDeletion = function() {
	  this._ensureElement();
	  this._bindFunctions();
	};

	Object.assign(BlockDeletion.prototype, __webpack_require__(187), __webpack_require__(188), {

	  tagName: 'a',
	  className: 'st-block-ui-btn st-block-ui-btn--delete st-icon',

	  attributes: {
	    html: 'delete',
	    'data-icon': 'bin'
	  }

	});

	module.exports = BlockDeletion;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var utils = __webpack_require__(57);

	var bestNameFromField = function(field) {
	  var msg = field.attr("data-st-name") || field.attr("name");

	  if (!msg) {
	    msg = 'Field';
	  }

	  return utils.capitalize(msg);
	};

	module.exports = {

	  errors: [],

	  valid: function(){
	    this.performValidations();
	    return this.errors.length === 0;
	  },

	  // This method actually does the leg work
	  // of running our validators and custom validators
	  performValidations: function() {
	    this.resetErrors();

	    var required_fields = this.$('.st-required');
	    required_fields.each(function (i, f) {
	      this.validateField(f);
	    }.bind(this));
	    this.validations.forEach(this.runValidator, this);

	    this.$el.toggleClass('st-block--with-errors', this.errors.length > 0);
	  },

	  // Everything in here should be a function that returns true or false
	  validations: [],

	  validateField: function(field) {
	    field = $(field);

	    var content = field.attr('contenteditable') ? field.text() : field.val();

	    if (content.length === 0) {
	      this.setError(field, i18n.t("errors:block_empty",
	                                 { name: bestNameFromField(field) }));
	    }
	  },

	  runValidator: function(validator) {
	    if (!_.isUndefined(this[validator])) {
	      this[validator].call(this);
	    }
	  },

	  setError: function(field, reason) {
	    var $msg = this.addMessage(reason, "st-msg--error");
	    field.addClass('st-error');

	    this.errors.push({ field: field, reason: reason, msg: $msg });
	  },

	  resetErrors: function() {
	    this.errors.forEach(function(error){
	      error.field.removeClass('st-error');
	      error.msg.remove();
	    });

	    this.$messages.removeClass("st-block__messages--is-visible");
	    this.errors = [];
	  }

	};


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);

	var EventBus = __webpack_require__(62);

	module.exports = {

	  /**
	   * Internal storage object for the block
	   */
	  blockStorage: {},

	  /**
	   * Initialize the store, including the block type
	   */
	  createStore: function(blockData) {
	    this.blockStorage = {
	      type: utils.underscored(this.type),
	      data: blockData || {}
	    };
	  },

	  /**
	   * Serialize the block and save the data into the store
	   */
	  save: function() {
	    var data = this._serializeData();

	    if (!_.isEmpty(data)) {
	      this.setData(data);
	    }
	  },

	  getData: function() {
	    this.save();
	    return this.blockStorage;
	  },

	  getBlockData: function() {
	    this.save();
	    return this.blockStorage.data;
	  },

	  _getData: function() {
	    return this.blockStorage.data;
	  },

	  /**
	   * Set the block data.
	   * This is used by the save() method.
	   */
	  setData: function(blockData) {
	    utils.log("Setting data for block " + this.blockID);
	    Object.assign(this.blockStorage.data, blockData || {});
	  },

	  setAndLoadData: function(blockData) {
	    this.setData(blockData);
	    this.beforeLoadingData();
	  },

	  _serializeData: function() {},
	  loadData: function() {},

	  beforeLoadingData: function() {
	    utils.log("loadData for " + this.blockID);
	    EventBus.trigger("editor/block/loadData");
	    this.loadData(this._getData());
	  },

	  _loadData: function() {
	    utils.log("_loadData is deprecated and will be removed in the future. Please use beforeLoadingData instead.");
	    this.beforeLoadingData();
	  },

	  checkAndLoadData: function() {
	    if (!_.isEmpty(this._getData())) {
	      this.beforeLoadingData();
	    }
	  }

	};


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);
	var config = __webpack_require__(58);

	var EventBus = __webpack_require__(62);
	var Blocks = __webpack_require__(194);

	var BLOCK_OPTION_KEYS = ['convertToMarkdown', 'convertFromMarkdown',
	  'formatBar'];

	var BlockManager = function(options, editorInstance, mediator) {
	  this.options = options;
	  this.blockOptions = BLOCK_OPTION_KEYS.reduce(function(acc, key) {
	    acc[key] = options[key];
	    return acc;
	  }, {});
	  this.instance_scope = editorInstance;
	  this.mediator = mediator;

	  this.blocks = [];
	  this.blockCounts = {};
	  this.blockTypes = {};

	  this._setBlocksTypes();
	  this._setRequired();
	  this._bindMediatedEvents();

	  this.initialize();
	};

	Object.assign(BlockManager.prototype, __webpack_require__(187), __webpack_require__(207), __webpack_require__(60), {

	  eventNamespace: 'block',

	  mediatedEvents: {
	    'create': 'createBlock',
	    'remove': 'removeBlock',
	    'rerender': 'rerenderBlock'
	  },

	  initialize: function() {},

	  createBlock: function(type, data) {
	    type = utils.classify(type);

	    // Run validations
	    if (!this.canCreateBlock(type)) { return; }

	    var block = new Blocks[type](data, this.instance_scope, this.mediator,
	                                 this.blockOptions);
	    this.blocks.push(block);

	    this._incrementBlockTypeCount(type);
	    this.mediator.trigger('block:render', block);

	    this.triggerBlockCountUpdate();
	    this.mediator.trigger('block:limitReached', this.blockLimitReached());

	    EventBus.trigger(data ? "block:create:existing" : "block:create:new", block);
	    utils.log("Block created of type " + type);
	  },

	  removeBlock: function(blockID) {
	    var block = this.findBlockById(blockID),
	    type = utils.classify(block.type);

	    this.mediator.trigger('block-controls:reset');
	    this.blocks = this.blocks.filter(function(item) {
	      return (item.blockID !== block.blockID);
	    });

	    this._decrementBlockTypeCount(type);
	    this.triggerBlockCountUpdate();
	    this.mediator.trigger('block:limitReached', this.blockLimitReached());

	    EventBus.trigger("block:remove");
	  },

	  rerenderBlock: function(blockID) {
	    var block = this.findBlockById(blockID);
	    if (!_.isUndefined(block) && !block.isEmpty() &&
	        block.drop_options.re_render_on_reorder) {
	      block.beforeLoadingData();
	    }
	  },

	  triggerBlockCountUpdate: function() {
	    this.mediator.trigger('block:countUpdate', this.blocks.length);
	  },

	  canCreateBlock: function(type) {
	    if(this.blockLimitReached()) {
	      utils.log("Cannot add any more blocks. Limit reached.");
	      return false;
	    }

	    if (!this.isBlockTypeAvailable(type)) {
	      utils.log("Block type not available " + type);
	      return false;
	    }

	    // Can we have another one of these blocks?
	    if (!this.canAddBlockType(type)) {
	      utils.log("Block Limit reached for type " + type);
	      return false;
	    }

	    return true;
	  },

	  validateBlockTypesExist: function(shouldValidate) {
	    if (config.skipValidation || !shouldValidate) { return false; }

	    (this.required || []).forEach(function(type, index) {
	      if (!this.isBlockTypeAvailable(type)) { return; }

	      if (this._getBlockTypeCount(type) === 0) {
	        utils.log("Failed validation on required block type " + type);
	        this.mediator.trigger('errors:add',
	                              { text: i18n.t("errors:type_missing", { type: type }) });

	      } else {
	        var blocks = this.getBlocksByType(type).filter(function(b) {
	          return !b.isEmpty();
	        });

	        if (blocks.length > 0) { return false; }

	        this.mediator.trigger('errors:add', {
	          text: i18n.t("errors:required_type_empty", {type: type})
	        });

	        utils.log("A required block type " + type + " is empty");
	      }
	    }, this);
	  },

	  findBlockById: function(blockID) {
	    return this.blocks.find(function(b) {
	      return b.blockID === blockID;
	    });
	  },

	  getBlocksByType: function(type) {
	    return this.blocks.filter(function(b) {
	      return utils.classify(b.type) === type;
	    });
	  },

	  getBlocksByIDs: function(block_ids) {
	    return this.blocks.filter(function(b) {
	      return block_ids.includes(b.blockID);
	    });
	  },

	  blockLimitReached: function() {
	    return (this.options.blockLimit !== 0 && this.blocks.length >= this.options.blockLimit);
	  },

	  isBlockTypeAvailable: function(t) {
	    return !_.isUndefined(this.blockTypes[t]);
	  },

	  canAddBlockType: function(type) {
	    var block_type_limit = this._getBlockTypeLimit(type);
	    return !(block_type_limit !== 0 && this._getBlockTypeCount(type) >= block_type_limit);
	  },

	  _setBlocksTypes: function() {
	    this.blockTypes = utils.flatten(
	      _.isUndefined(this.options.blockTypes) ?
	      Blocks : this.options.blockTypes);
	  },

	  _setRequired: function() {
	    this.required = false;

	    if (Array.isArray(this.options.required) && !_.isEmpty(this.options.required)) {
	      this.required = this.options.required;
	    }
	  },

	  _incrementBlockTypeCount: function(type) {
	    this.blockCounts[type] = (_.isUndefined(this.blockCounts[type])) ? 1 : this.blockCounts[type] + 1;
	  },

	  _decrementBlockTypeCount: function(type) {
	    this.blockCounts[type] = (_.isUndefined(this.blockCounts[type])) ? 1 : this.blockCounts[type] - 1;
	  },

	  _getBlockTypeCount: function(type) {
	    return (_.isUndefined(this.blockCounts[type])) ? 0 : this.blockCounts[type];
	  },

	  _blockLimitReached: function() {
	    return (this.options.blockLimit !== 0 && this.blocks.length >= this.options.blockLimit);
	  },

	  _getBlockTypeLimit: function(t) {
	    if (!this.isBlockTypeAvailable(t)) { return 0; }
	    return parseInt((_.isUndefined(this.options.blockTypeLimits[t])) ? 0 : this.options.blockTypeLimits[t], 10);
	  }

	});

	module.exports = BlockManager;



/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Text: __webpack_require__(195),
	  Quote: __webpack_require__(201),
	  Image: __webpack_require__(202),
	  Heading: __webpack_require__(203),
	  List: __webpack_require__(204),
	  Tweet: __webpack_require__(205),
	  Video: __webpack_require__(206),
	};


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Text Block
	*/

	var Block = __webpack_require__(196);
	var stToHTML = __webpack_require__(200);

	module.exports = Block.extend({

	  type: "text",

	  title: function() { return i18n.t('blocks:text:title'); },

	  editorHTML: '<div class="st-required st-text-block" contenteditable="true"></div>',

	  icon_name: 'text',

	  loadData: function(data){
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }
	  },
	});


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var ScribeInterface = __webpack_require__(74);

	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);
	var BlockMixins = __webpack_require__(66);

	var SimpleBlock = __webpack_require__(197);
	var BlockReorder = __webpack_require__(189);
	var BlockDeletion = __webpack_require__(190);
	var BlockPositioner = __webpack_require__(186);
	var EventBus = __webpack_require__(62);

	var Spinner = __webpack_require__(199);

	var Block = function(data, instance_id, mediator, options) {
	  SimpleBlock.apply(this, arguments);
	};

	Block.prototype = Object.create(SimpleBlock.prototype);
	Block.prototype.constructor = Block;

	var delete_template = [
	  "<div class='st-block__ui-delete-controls'>",
	  "<label class='st-block__delete-label'>",
	  "<%= i18n.t('general:delete') %>",
	  "</label>",
	  "<a class='st-block-ui-btn st-block-ui-btn--confirm-delete st-icon' data-icon='tick'></a>",
	  "<a class='st-block-ui-btn st-block-ui-btn--deny-delete st-icon' data-icon='close'></a>",
	  "</div>"
	].join("\n");

	Object.assign(Block.prototype, SimpleBlock.fn, __webpack_require__(191), {

	  bound: [
	    "_handleContentPaste", "_onFocus", "_onBlur", "onDrop", "onDeleteClick",
	    "clearInsertedStyles", "getSelectionForFormatter", "onBlockRender",
	  ],

	  className: 'st-block st-icon--add',

	  attributes: function() {
	    return Object.assign(SimpleBlock.fn.attributes.call(this), {
	      'data-icon-after' : "add"
	    });
	  },

	  icon_name: 'default',

	  validationFailMsg: function() {
	    return i18n.t('errors:validation_fail', { type: this.title });
	  },

	  editorHTML: '<div class="st-block__editor"></div>',

	  toolbarEnabled: true,

	  availableMixins: ['droppable', 'pastable', 'uploadable', 'fetchable',
	    'ajaxable', 'controllable', 'multi_editable'],

	  droppable: false,
	  pastable: false,
	  uploadable: false,
	  fetchable: false,
	  ajaxable: false,
	  multi_editable: false,

	  drop_options: {},
	  paste_options: {},
	  upload_options: {},

	  formattable: true,

	  _previousSelection: '',

	  initialize: function() {},

	  toMarkdown: function(markdown){ return markdown; },
	  toHTML: function(html){ return html; },

	  withMixin: function(mixin) {
	    if (!_.isObject(mixin)) { return; }

	    var initializeMethod = "initialize" + mixin.mixinName;

	    if (_.isUndefined(this[initializeMethod])) {
	      Object.assign(this, mixin);
	      this[initializeMethod]();
	    }
	  },

	  render: function() {
	    this.beforeBlockRender();
	    this._setBlockInner();

	    this.$editor = this.$inner.children().first();

	    this.mixinsRequireInputs = false;
	    this.availableMixins.forEach(function(mixin) {
	      if (this[mixin]) {
	        var blockMixin = BlockMixins[utils.classify(mixin)];
	        if (!_.isUndefined(blockMixin.requireInputs) && blockMixin.requireInputs) {
	          this.mixinsRequireInputs = true;
	        }
	      }
	    }, this);

	    if(this.mixinsRequireInputs) {
	      var input_html = $("<div>", { 'class': 'st-block__inputs' });
	      this.$inner.append(input_html);
	      this.$inputs = input_html;
	    }

	    if (this.hasTextBlock()) { this._initTextBlocks(); }

	    this.availableMixins.forEach(function(mixin) {
	      if (this[mixin]) {
	        this.withMixin(BlockMixins[utils.classify(mixin)]);
	      }
	    }, this);

	    if (this.formattable) { this._initFormatting(); }

	    this._blockPrepare();

	    return this;
	  },

	  remove: function() {
	    if (this.ajaxable) {
	      this.resolveAllInQueue();
	    }

	    this.$el.remove();
	  },

	  loading: function() {
	    if(!_.isUndefined(this.spinner)) { this.ready(); }

	    this.spinner = new Spinner(config.defaults.spinner);
	    this.spinner.spin(this.$el[0]);

	    this.$el.addClass('st--is-loading');
	  },

	  ready: function() {
	    this.$el.removeClass('st--is-loading');
	    if (!_.isUndefined(this.spinner)) {
	      this.spinner.stop();
	      delete this.spinner;
	    }
	  },

	  /* Generic _serializeData implementation to serialize the block into a plain object.
	   * Can be overwritten, although hopefully this will cover most situations.
	   * If you want to get the data of your block use block.getBlockData()
	   */
	  _serializeData: function() {
	    utils.log("toData for " + this.blockID);

	    var data = {};

	    /* Simple to start. Add conditions later */
	    if (this.hasTextBlock()) {
	      data.text = this.getTextBlockHTML();
	      data.format = 'html';
	    }

	    // Add any inputs to the data attr
	    if (this.$(':input').not('.st-paste-block').length > 0) {
	      this.$(':input').each(function(index,input){
	        if (input.getAttribute('name')) {
	          data[input.getAttribute('name')] = input.value;
	        }
	      });
	    }

	    return data;
	  },

	  /* Generic implementation to tell us when the block is active */
	  focus: function() {
	    this.getTextBlock().focus();
	  },

	  blur: function() {
	    this.getTextBlock().blur();
	  },

	  onFocus: function() {
	    this.getTextBlock().bind('focus', this._onFocus);
	  },

	  onBlur: function() {
	    this.getTextBlock().bind('blur', this._onBlur);
	  },

	  /*
	   * Event handlers
	   */

	  _onFocus: function() {
	    this.trigger('blockFocus', this.$el);
	  },

	  _onBlur: function() {},

	  onBlockRender: function() {
	    this.focus();
	  },

	  onDrop: function(dataTransferObj) {},

	  onDeleteClick: function(ev) {
	    ev.preventDefault();

	    var onDeleteConfirm = function(e) {
	      e.preventDefault();
	      this.mediator.trigger('block:remove', this.blockID);
	      this.remove();
	    };

	    var onDeleteDeny = function(e) {
	      e.preventDefault();
	      this.$el.removeClass('st-block--delete-active');
	      $delete_el.remove();
	    };

	    if (this.isEmpty()) {
	      onDeleteConfirm.call(this, new Event('click'));
	      return;
	    }

	    this.$inner.append(_.template(delete_template));
	    this.$el.addClass('st-block--delete-active');

	    var $delete_el = this.$inner.find('.st-block__ui-delete-controls');

	    this.$inner.on('click', '.st-block-ui-btn--confirm-delete',
	                   onDeleteConfirm.bind(this))
	                   .on('click', '.st-block-ui-btn--deny-delete',
	                       onDeleteDeny.bind(this));
	  },

	  beforeLoadingData: function() {
	    this.loading();

	    if(this.mixinsRequireInputs) {
	      this.$editor.show();
	      this.$inputs.hide();
	    }

	    SimpleBlock.fn.beforeLoadingData.call(this);

	    this.ready();
	  },

	  execTextBlockCommand: function(cmdName) {
	    if (_.isUndefined(this._scribe)) {
	      throw "No Scribe instance found to send a command to";
	    }

	    return ScribeInterface.execTextBlockCommand(this._scribe, cmdName);
	  },

	  queryTextBlockCommandState: function(cmdName) {
	    if (_.isUndefined(this._scribe)) {
	      throw "No Scribe instance found to query command";
	    }

	    return ScribeInterface.queryTextBlockCommandState(this._scribe, cmdName);
	  },

	  _handleContentPaste: function(ev) {
	    setTimeout(this.onContentPasted.bind(this, ev, $(ev.currentTarget)), 0);
	  },

	  _getBlockClass: function() {
	    return 'st-block--' + this.className;
	  },

	  /*
	   * Init functions for adding functionality
	   */

	  _initUIComponents: function() {

	    var positioner = new BlockPositioner(this.$el, this.mediator);

	    this._withUIComponent(positioner, '.st-block-ui-btn--reorder',
	                          positioner.toggle);

	    this._withUIComponent(new BlockReorder(this.$el, this.mediator));

	    this._withUIComponent(new BlockDeletion(), '.st-block-ui-btn--delete',
	                          this.onDeleteClick);

	    this.onFocus();
	    this.onBlur();
	  },

	  _initFormatting: function() {

	    // Enable formatting keyboard input
	    var block = this;

	    if (!this.options.formatBar) {
	      return;
	    }

	    this.options.formatBar.commands.forEach(function(cmd) {
	      if (_.isUndefined(cmd.keyCode)) {
	        return;
	      }

	      var ctrlDown = false;

	      block.$el
	        .on('keyup','.st-text-block', function(ev) {
	          if(ev.which === 17 || ev.which === 224 || ev.which === 91) {
	            ctrlDown = false;
	          }
	        })
	        .on('keydown','.st-text-block', {formatter: cmd}, function(ev) {
	          if(ev.which === 17 || ev.which === 224 || ev.which === 91) {
	            ctrlDown = true;
	          }

	          if(ev.which === ev.data.formatter.keyCode && ctrlDown) {
	            ev.preventDefault();
	            block.execTextBlockCommand(ev.data.formatter.cmd);
	          }
	        });
	    });
	  },

	  _initTextBlocks: function() {
	    this.getTextBlock()
	        .bind('keyup', this.getSelectionForFormatter)
	        .bind('mouseup', this.getSelectionForFormatter)
	        .bind('DOMNodeInserted', this.clearInsertedStyles);

	    var textBlock = this.getTextBlock().get(0);
	    if (!_.isUndefined(textBlock) && _.isUndefined(this._scribe)) {

	      var configureScribe =
	        _.isFunction(this.configureScribe) ? this.configureScribe.bind(this) : null;
	      this._scribe = ScribeInterface.initScribeInstance(
	        textBlock, this.scribeOptions, configureScribe
	      );
	    }
	  },

	  getSelectionForFormatter: function() {
	    var block = this;
	    setTimeout(function() {
	      var selection = window.getSelection(),
	          selectionStr = selection.toString().trim(),
	          en = 'formatter:' + ((selectionStr === '') ? 'hide' : 'position');

	      block.mediator.trigger(en, block);
	      EventBus.trigger(en, block);
	    }, 1);
	  },

	  clearInsertedStyles: function(e) {
	    var target = e.target;
	    target.removeAttribute('style'); // Hacky fix for Chrome.
	  },

	  hasTextBlock: function() {
	    return this.getTextBlock().length > 0;
	  },

	  getTextBlock: function() {
	    if (_.isUndefined(this.text_block)) {
	      this.text_block = this.$('.st-text-block');
	    }

	    return this.text_block;
	  },

	  getTextBlockHTML: function() {
	    return this._scribe.getContent();
	  },

	  setTextBlockHTML: function(html) {
	    return this._scribe.setContent(html);
	  },

	  isEmpty: function() {
	    return _.isEmpty(this.getBlockData());
	  }

	});

	Block.extend = __webpack_require__(198); // Allow our Block to be extended.

	module.exports = Block;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);
	var $ = __webpack_require__(56);

	var BlockReorder = __webpack_require__(189);

	var SimpleBlock = function(data, instance_id, mediator, options) {
	  this.createStore(data);
	  this.blockID = _.uniqueId('st-block-');
	  this.instanceID = instance_id;
	  this.mediator = mediator;
	  this.options = options || {};

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize.apply(this, arguments);
	};

	Object.assign(SimpleBlock.prototype, __webpack_require__(187), __webpack_require__(60), __webpack_require__(188), __webpack_require__(192), {

	  focus : function() {},

	  valid : function() { return true; },

	  className: 'st-block',

	  block_template: _.template(
	    "<div class='st-block__inner'><%= editor_html %></div>"
	  ),

	  attributes: function() {
	    return {
	      'id': this.blockID,
	      'data-type': this.type,
	      'data-instance': this.instanceID
	    };
	  },

	  title: function() {
	    return utils.titleize(this.type.replace(/[\W_]/g, ' '));
	  },

	  blockCSSClass: function() {
	    this.blockCSSClass = utils.toSlug(this.type);
	    return this.blockCSSClass;
	  },

	  type: '',

	  class: function() {
	    return utils.classify(this.type);
	  },

	  editorHTML: '',

	  initialize: function() {},

	  onBlockRender: function(){},
	  beforeBlockRender: function(){},

	  _setBlockInner : function() {
	    var editor_html = _.result(this, 'editorHTML');

	    this.$el.append(
	      this.block_template({ editor_html: editor_html })
	    );

	    this.$inner = this.$el.find('.st-block__inner');
	    this.$inner.bind('click mouseover', function(e){ e.stopPropagation(); });
	  },

	  render: function() {
	    this.beforeBlockRender();

	    this._setBlockInner();
	    this._blockPrepare();

	    return this;
	  },

	  _blockPrepare : function() {
	    this._initUI();
	    this._initMessages();

	    this.checkAndLoadData();

	    this.$el.addClass('st-item-ready');
	    this.on("onRender", this.onBlockRender);
	    this.save();
	  },

	  _withUIComponent: function(component, className, callback) {
	    this.$ui.append(component.render().$el);
	    if (className && callback) {
	      this.$ui.on('click', className, callback);
	    }
	  },

	  _initUI : function() {
	    var ui_element = $("<div>", { 'class': 'st-block__ui' });
	    this.$inner.append(ui_element);
	    this.$ui = ui_element;
	    this._initUIComponents();
	  },

	  _initMessages: function() {
	    var msgs_element = $("<div>", { 'class': 'st-block__messages' });
	    this.$inner.prepend(msgs_element);
	    this.$messages = msgs_element;
	  },

	  addMessage: function(msg, additionalClass) {
	    var $msg = $("<span>", { html: msg, class: "st-msg " + additionalClass });
	    this.$messages.append($msg)
	    .addClass('st-block__messages--is-visible');
	    return $msg;
	  },

	  resetMessages: function() {
	    this.$messages.html('')
	    .removeClass('st-block__messages--is-visible');
	  },

	  _initUIComponents: function() {
	    this._withUIComponent(new BlockReorder(this.$el));
	  }

	});

	SimpleBlock.fn = SimpleBlock.prototype;

	// Allow our Block to be extended.
	SimpleBlock.extend = __webpack_require__(198);

	module.exports = SimpleBlock;


/***/ },
/* 198 */
/***/ function(module, exports) {

	"use strict";

	/*
	  Backbone Inheritence 
	  --
	  From: https://github.com/documentcloud/backbone/blob/master/backbone.js
	  Backbone.js 0.9.2
	  (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
	*/

	module.exports = function(protoProps, staticProps) {
	  var parent = this;
	  var child;

	  // The constructor function for the new subclass is either defined by you
	  // (the "constructor" property in your `extend` definition), or defaulted
	  // by us to simply call the parent's constructor.
	  if (protoProps && protoProps.hasOwnProperty('constructor')) {
	    child = protoProps.constructor;
	  } else {
	    child = function(){ return parent.apply(this, arguments); };
	  }

	  // Add static properties to the constructor function, if supplied.
	  Object.assign(child, parent, staticProps);

	  // Set the prototype chain to inherit from `parent`, without calling
	  // `parent`'s constructor function.
	  var Surrogate = function(){ this.constructor = child; };
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate; // jshint ignore:line

	  // Add prototype properties (instance properties) to the subclass,
	  // if supplied.
	  if (protoProps) {
	    Object.assign(child.prototype, protoProps);
	  }

	  // Set a convenience property in case the parent's prototype is needed
	  // later.
	  child.__super__ = parent.prototype;

	  return child;
	};


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2011-2014 Felix Gnass
	 * Licensed under the MIT license
	 * http://spin.js.org/
	 *
	 * Example:
	    var opts = {
	      lines: 12             // The number of lines to draw
	    , length: 7             // The length of each line
	    , width: 5              // The line thickness
	    , radius: 10            // The radius of the inner circle
	    , scale: 1.0            // Scales overall size of the spinner
	    , corners: 1            // Roundness (0..1)
	    , color: '#000'         // #rgb or #rrggbb
	    , opacity: 1/4          // Opacity of the lines
	    , rotate: 0             // Rotation offset
	    , direction: 1          // 1: clockwise, -1: counterclockwise
	    , speed: 1              // Rounds per second
	    , trail: 100            // Afterglow percentage
	    , fps: 20               // Frames per second when using setTimeout()
	    , zIndex: 2e9           // Use a high z-index by default
	    , className: 'spinner'  // CSS class to assign to the element
	    , top: '50%'            // center vertically
	    , left: '50%'           // center horizontally
	    , shadow: false         // Whether to render a shadow
	    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	    , position: 'absolute'  // Element positioning
	    }
	    var target = document.getElementById('foo')
	    var spinner = new Spinner(opts).spin(target)
	 */
	;(function (root, factory) {

	  /* CommonJS */
	  if (typeof module == 'object' && module.exports) module.exports = factory()

	  /* AMD module */
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

	  /* Browser global */
	  else root.Spinner = factory()
	}(this, function () {
	  "use strict"

	  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
	    , animations = {} /* Animation rules keyed by their name */
	    , useCssAnimations /* Whether to use CSS animations or setTimeout */
	    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

	  /**
	   * Utility function to create elements. If no tag name is given,
	   * a DIV is created. Optionally properties can be passed.
	   */
	  function createEl (tag, prop) {
	    var el = document.createElement(tag || 'div')
	      , n

	    for (n in prop) el[n] = prop[n]
	    return el
	  }

	  /**
	   * Appends children and returns the parent.
	   */
	  function ins (parent /* child1, child2, ...*/) {
	    for (var i = 1, n = arguments.length; i < n; i++) {
	      parent.appendChild(arguments[i])
	    }

	    return parent
	  }

	  /**
	   * Creates an opacity keyframe animation rule and returns its name.
	   * Since most mobile Webkits have timing issues with animation-delay,
	   * we create separate rules for each line/segment.
	   */
	  function addAnimation (alpha, trail, i, lines) {
	    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
	      , start = 0.01 + i/lines * 100
	      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
	      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
	      , pre = prefix && '-' + prefix + '-' || ''

	    if (!animations[name]) {
	      sheet.insertRule(
	        '@' + pre + 'keyframes ' + name + '{' +
	        '0%{opacity:' + z + '}' +
	        start + '%{opacity:' + alpha + '}' +
	        (start+0.01) + '%{opacity:1}' +
	        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
	        '100%{opacity:' + z + '}' +
	        '}', sheet.cssRules.length)

	      animations[name] = 1
	    }

	    return name
	  }

	  /**
	   * Tries various vendor prefixes and returns the first supported property.
	   */
	  function vendor (el, prop) {
	    var s = el.style
	      , pp
	      , i

	    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
	    if (s[prop] !== undefined) return prop
	    for (i = 0; i < prefixes.length; i++) {
	      pp = prefixes[i]+prop
	      if (s[pp] !== undefined) return pp
	    }
	  }

	  /**
	   * Sets multiple style properties at once.
	   */
	  function css (el, prop) {
	    for (var n in prop) {
	      el.style[vendor(el, n) || n] = prop[n]
	    }

	    return el
	  }

	  /**
	   * Fills in default values.
	   */
	  function merge (obj) {
	    for (var i = 1; i < arguments.length; i++) {
	      var def = arguments[i]
	      for (var n in def) {
	        if (obj[n] === undefined) obj[n] = def[n]
	      }
	    }
	    return obj
	  }

	  /**
	   * Returns the line color from the given string or array.
	   */
	  function getColor (color, idx) {
	    return typeof color == 'string' ? color : color[idx % color.length]
	  }

	  // Built-in defaults

	  var defaults = {
	    lines: 12             // The number of lines to draw
	  , length: 7             // The length of each line
	  , width: 5              // The line thickness
	  , radius: 10            // The radius of the inner circle
	  , scale: 1.0            // Scales overall size of the spinner
	  , corners: 1            // Roundness (0..1)
	  , color: '#000'         // #rgb or #rrggbb
	  , opacity: 1/4          // Opacity of the lines
	  , rotate: 0             // Rotation offset
	  , direction: 1          // 1: clockwise, -1: counterclockwise
	  , speed: 1              // Rounds per second
	  , trail: 100            // Afterglow percentage
	  , fps: 20               // Frames per second when using setTimeout()
	  , zIndex: 2e9           // Use a high z-index by default
	  , className: 'spinner'  // CSS class to assign to the element
	  , top: '50%'            // center vertically
	  , left: '50%'           // center horizontally
	  , shadow: false         // Whether to render a shadow
	  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
	  , position: 'absolute'  // Element positioning
	  }

	  /** The constructor */
	  function Spinner (o) {
	    this.opts = merge(o || {}, Spinner.defaults, defaults)
	  }

	  // Global defaults that override the built-ins:
	  Spinner.defaults = {}

	  merge(Spinner.prototype, {
	    /**
	     * Adds the spinner to the given target element. If this instance is already
	     * spinning, it is automatically removed from its previous target b calling
	     * stop() internally.
	     */
	    spin: function (target) {
	      this.stop()

	      var self = this
	        , o = self.opts
	        , el = self.el = createEl(null, {className: o.className})

	      css(el, {
	        position: o.position
	      , width: 0
	      , zIndex: o.zIndex
	      , left: o.left
	      , top: o.top
	      })

	      if (target) {
	        target.insertBefore(el, target.firstChild || null)
	      }

	      el.setAttribute('role', 'progressbar')
	      self.lines(el, self.opts)

	      if (!useCssAnimations) {
	        // No CSS animation support, use setTimeout() instead
	        var i = 0
	          , start = (o.lines - 1) * (1 - o.direction) / 2
	          , alpha
	          , fps = o.fps
	          , f = fps / o.speed
	          , ostep = (1 - o.opacity) / (f * o.trail / 100)
	          , astep = f / o.lines

	        ;(function anim () {
	          i++
	          for (var j = 0; j < o.lines; j++) {
	            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

	            self.opacity(el, j * o.direction + start, alpha, o)
	          }
	          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
	        })()
	      }
	      return self
	    }

	    /**
	     * Stops and removes the Spinner.
	     */
	  , stop: function () {
	      var el = this.el
	      if (el) {
	        clearTimeout(this.timeout)
	        if (el.parentNode) el.parentNode.removeChild(el)
	        this.el = undefined
	      }
	      return this
	    }

	    /**
	     * Internal method that draws the individual lines. Will be overwritten
	     * in VML fallback mode below.
	     */
	  , lines: function (el, o) {
	      var i = 0
	        , start = (o.lines - 1) * (1 - o.direction) / 2
	        , seg

	      function fill (color, shadow) {
	        return css(createEl(), {
	          position: 'absolute'
	        , width: o.scale * (o.length + o.width) + 'px'
	        , height: o.scale * o.width + 'px'
	        , background: color
	        , boxShadow: shadow
	        , transformOrigin: 'left'
	        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
	        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
	        })
	      }

	      for (; i < o.lines; i++) {
	        seg = css(createEl(), {
	          position: 'absolute'
	        , top: 1 + ~(o.scale * o.width / 2) + 'px'
	        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
	        , opacity: o.opacity
	        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
	        })

	        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
	        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
	      }
	      return el
	    }

	    /**
	     * Internal method that adjusts the opacity of a single line.
	     * Will be overwritten in VML fallback mode below.
	     */
	  , opacity: function (el, i, val) {
	      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
	    }

	  })


	  function initVML () {

	    /* Utility function to create a VML tag */
	    function vml (tag, attr) {
	      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
	    }

	    // No CSS transforms but VML support, add a CSS rule for VML elements:
	    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

	    Spinner.prototype.lines = function (el, o) {
	      var r = o.scale * (o.length + o.width)
	        , s = o.scale * 2 * r

	      function grp () {
	        return css(
	          vml('group', {
	            coordsize: s + ' ' + s
	          , coordorigin: -r + ' ' + -r
	          })
	        , { width: s, height: s }
	        )
	      }

	      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
	        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
	        , i

	      function seg (i, dx, filter) {
	        ins(
	          g
	        , ins(
	            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
	          , ins(
	              css(
	                vml('roundrect', {arcsize: o.corners})
	              , { width: r
	                , height: o.scale * o.width
	                , left: o.scale * o.radius
	                , top: -o.scale * o.width >> 1
	                , filter: filter
	                }
	              )
	            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
	            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
	            )
	          )
	        )
	      }

	      if (o.shadow)
	        for (i = 1; i <= o.lines; i++) {
	          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
	        }

	      for (i = 1; i <= o.lines; i++) seg(i)
	      return ins(el, g)
	    }

	    Spinner.prototype.opacity = function (el, i, val, o) {
	      var c = el.firstChild
	      o = o.shadow && o.lines || 0
	      if (c && i + o < c.childNodes.length) {
	        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
	        if (c) c.opacity = val
	      }
	    }
	  }

	  if (typeof document !== 'undefined') {
	    sheet = (function () {
	      var el = createEl('style', {type : 'text/css'})
	      ins(document.getElementsByTagName('head')[0], el)
	      return el.sheet || el.styleSheet
	    }())

	    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

	    if (!vendor(probe, 'transform') && probe.adj) initVML()
	    else useCssAnimations = vendor(probe, 'animation')
	  }

	  return Spinner

	}));


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);

	module.exports = function(markdown, type) {

	  // Deferring requiring these to sidestep a circular dependency:
	  // Block -> this -> Blocks -> Block
	  var Blocks = __webpack_require__(194);

	  // MD -> HTML
	  type = utils.classify(type);

	  var html = markdown,
	      shouldWrap = type === "Text";

	  if(_.isUndefined(shouldWrap)) { shouldWrap = false; }

	  if (shouldWrap) {
	    html = "<p>" + html;
	  }

	  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/gm,function(match, p1, p2){
	    return "<a href='"+p2+"'>"+p1.replace(/\n/g, '')+"</a>";
	  });

	  // This may seem crazy, but because JS doesn't have a look behind,
	  // we reverse the string to regex out the italic items (and bold)
	  // and look for something that doesn't start (or end in the reversed strings case)
	  // with a slash.
	  html = utils.reverse(
	           utils.reverse(html)
	           .replace(/_(?!\\)((_\\|[^_])*)_(?=$|[^\\])/gm, function(match, p1) {
	              return ">i/<"+ p1.replace(/\n/g, '').replace(/[\s]+$/,'') +">i<";
	           })
	           .replace(/\*\*(?!\\)((\*\*\\|[^\*\*])*)\*\*(?=$|[^\\])/gm, function(match, p1){
	              return ">b/<"+ p1.replace(/\n/g, '').replace(/[\s]+$/,'') +">b<";
	           })
	          );

	  html =  html.replace(/^\> (.+)$/mg,"$1");

	  // Use custom block toHTML functions (if any exist)
	  var block;
	  if (Blocks.hasOwnProperty(type)) {
	    block = Blocks[type];
	    // Do we have a toHTML function?
	    if (!_.isUndefined(block.prototype.toHTML) && _.isFunction(block.prototype.toHTML)) {
	      html = block.prototype.toHTML(html);
	    }
	  }

	  if (shouldWrap) {
	    html = html.replace(/\n\s*\n/gm, "</p><p>");
	    html = html.replace(/\n/gm, "<br>");
	  }

	  html = html.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
	             .replace(/\n/g, "<br>")
	             .replace(/\*\*/, "")
	             .replace(/__/, "");  // Cleanup any markdown characters left

	  // Replace escaped
	  html = html.replace(/\\\*/g, "*")
	             .replace(/\\\[/g, "[")
	             .replace(/\\\]/g, "]")
	             .replace(/\\\_/g, "_")
	             .replace(/\\\(/g, "(")
	             .replace(/\\\)/g, ")")
	             .replace(/\\\-/g, "-");

	  if (shouldWrap) {
	    html += "</p>";
	  }

	  return html;
	};


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Block Quote
	*/

	var _ = __webpack_require__(2);

	var Block = __webpack_require__(196);
	var stToHTML = __webpack_require__(200);

	var template = _.template([
	  '<blockquote class="st-required st-text-block" contenteditable="true"></blockquote>',
	  '<label class="st-input-label"> <%= i18n.t("blocks:quote:credit_field") %></label>',
	  '<input maxlength="140" name="cite" placeholder="<%= i18n.t("blocks:quote:credit_field") %>"',
	  ' class="st-input-string st-required js-cite-input" type="text" />'
	].join("\n"));

	module.exports = Block.extend({

	  type: "quote",

	  title: function() { return i18n.t('blocks:quote:title'); },

	  icon_name: 'quote',

	  editorHTML: function() {
	    return template(this);
	  },

	  loadData: function(data){
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }

	    this.$('.js-cite-input').val(data.cite);
	  }
	});


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var $ = __webpack_require__(56);
	var Block = __webpack_require__(196);

	module.exports = Block.extend({

	  type: "image",
	  title: function() { return i18n.t('blocks:image:title'); },

	  droppable: true,
	  uploadable: true,

	  icon_name: 'image',

	  loadData: function(data){
	    // Create our image tag
	    this.$editor.html($('<img>', { src: data.file.url }));
	  },

	  onBlockRender: function(){
	    /* Setup the upload button */
	    this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
	    this.$inputs.find('input').on('change', (function(ev) {
	      this.onDrop(ev.currentTarget);
	    }).bind(this));
	  },

	  onDrop: function(transferData){
	    var file = transferData.files[0],
	        urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

	    // Handle one upload at a time
	    if (/image/.test(file.type)) {
	      this.loading();
	      // Show this image on here
	      this.$inputs.hide();
	      this.$editor.html($('<img>', { src: urlAPI.createObjectURL(file) })).show();

	      this.uploader(
	        file,
	        function(data) {
	          this.setData(data);
	          this.ready();
	        },
	        function(error) {
	          this.addMessage(i18n.t('blocks:image:upload_error'));
	          this.ready();
	        }
	      );
	    }
	  }
	});


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	  Heading Block
	*/

	var Block = __webpack_require__(196);
	var stToHTML = __webpack_require__(200);

	module.exports = Block.extend({

	  type: 'Heading',

	  title: function(){ return i18n.t('blocks:heading:title'); },

	  editorHTML: '<h2 class="st-required st-text-block st-text-block--heading" contenteditable="true"></h2>',

	  scribeOptions: { 
	    allowBlockElements: false,
	    tags: {
	      p: false
	    }
	  },

	  icon_name: 'heading',

	  loadData: function(data){
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      this.setTextBlockHTML(stToHTML(data.text, this.type));
	    } else {
	      this.setTextBlockHTML(data.text);
	    }
	  }
	});


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Block = __webpack_require__(196);
	var stToHTML = __webpack_require__(200);

	var ScribeListBlockPlugin = function(block) {
	  return function(scribe) {
	    scribe.el.addEventListener('keydown', function(ev) {
	      var rangeToHTML = function(range) {
	        var div = document.createElement('div');
	        div.appendChild(range.extractContents());

	        return div.innerHTML;
	      };

	      var selectToEnd = function() {
	        var selection = new scribe.api.Selection();
	        var range = selection.range.cloneRange();
	        range.setEndAfter(scribe.el.lastChild, 0);

	        return range;
	      };

	      var currentPosition = function() {
	        var selection = new scribe.api.Selection();
	        return selection.range.startOffset;
	      };

	      var content;

	      if (ev.keyCode === 13 && !ev.shiftKey) { // enter pressed
	        ev.preventDefault();

	        content = rangeToHTML(selectToEnd());
	        block.addListItemAfterCurrent(content);
	      } else if (!block.isLastListItem()) { // don't remove if last item
	        if (ev.keyCode === 8 && currentPosition() === 0) {
	          ev.preventDefault();

	          content = scribe.getContent();
	          block.removeCurrentListItem();
	          block.appendToCurrentItem(content);
	        } else if (ev.keyCode === 46) {
	          // TODO: Pressing del from end of list item
	        }
	      }
	    });
	  };
	};


	module.exports = Block.extend({
	  type: 'list',
	  title: function() { return i18n.t('blocks:list:title'); },
	  icon_name: 'list',
	  multi_editable: true,

	  scribeOptions: { 
	    allowBlockElements: false,
	    tags: {
	      p: false
	    }
	  },

	  configureScribe: function(scribe) {
	    scribe.use(new ScribeListBlockPlugin(this));
	  },

	  editorHTML: '<ul class="st-list-block__list"></ul>',
	  listItemEditorHTML: '<li class="st-list-block__item"><div class="st-list-block__editor st-block__editor"></div></li>',

	  initialize: function() {
	    this.editorIds = [];
	  },

	  // Data functions (loading, converting, saving)
	  beforeLoadingData: function() {
	    this.setupListVariables();

	    this.loadData(this._getData());
	  },

	  onBlockRender: function() {
	    if (!this.ul) { this.setupListVariables(); }
	    if (this.editorIds.length < 1) { this.addListItem(); }
	  },

	  setupListVariables: function() {
	    this.$ul = this.$inner.find('ul');
	    this.ul = this.$ul.get(0);
	  },

	  loadData: function(data) {
	    var block = this;
	    if (this.options.convertFromMarkdown && data.format !== "html") {
	      data = this.parseFromMarkdown(data.text);
	    }

	    if (data.listItems.length) {
	      data.listItems.forEach(function(li) {
	        block.addListItem(li.content);
	      });
	    } else {
	      block.addListItem();
	    }
	  },

	  parseFromMarkdown: function(markdown) {
	    var listItems = markdown.replace(/^ - (.+)$/mg,"$1").split("\n");
	    listItems = listItems.
	      filter(function(item) {
	        return item.length;
	      }).
	      map(function(item) {
	        return {content: stToHTML(item, this.type)};
	      }.bind(this));

	    return { listItems: listItems, format: 'html' };
	  },

	  _serializeData: function() {
	    var data = {format: 'html', listItems: []};

	    this.editorIds.forEach(function(editorId) {
	      var listItem = {content: this.getTextEditor(editorId).scribe.getContent()};
	      data.listItems.push(listItem);
	    }.bind(this));

	    return data;
	  },

	  // List Items manipulation functions (add, remove, etc)
	  addListItemAfterCurrent: function(content) {
	    this.addListItem(content, this.getCurrentTextEditor());
	  },

	  addListItem: function(content, after) {
	    content = content || '';
	    if (content.trim() === "<br>") { content = ''; }

	    var editor = this.newTextEditor(this.listItemEditorHTML, content);

	    if (after && this.ul.lastchild !== after.node) {
	      var before = after.node.nextSibling;
	      this.ul.insertBefore(editor.node, before);

	      var idx = this.editorIds.indexOf(after.id) + 1;
	      this.editorIds.splice(idx, 0, editor.id);
	    } else {
	      this.$ul.append(editor.node);
	      this.editorIds.push(editor.id);
	    }

	    this.focusOn(editor);
	  },

	  focusOnNeighbor: function(item) {
	    var neighbor = this.previousListItem() || this.nextListItem();

	    if (neighbor) {
	      this.focusOn(neighbor);
	    }
	  },

	  focusOn: function(editor) {
	    var scribe = editor.scribe;
	    var selection = new scribe.api.Selection();
	    var lastChild = scribe.el.lastChild;
	    var range;
	    if (selection.range) {
	      range = selection.range.cloneRange();
	    }

	    editor.el.focus();

	    if (range) {
	      range.setStartAfter(lastChild, 1);
	      range.collapse(false);
	    }
	  },

	  removeCurrentListItem: function() {
	    if (this.editorIds.length === 1) { return; }

	    var item = this.getCurrentTextEditor();
	    var idx = this.editorIds.indexOf(item.id);

	    this.focusOnNeighbor(item);
	    this.editorIds.splice(idx, 1);
	    this.ul.removeChild(item.node);
	    this.removeTextEditor(item.id);
	  },

	  appendToCurrentItem: function(content) {
	    this.appendToTextEditor(this.getCurrentTextEditor().id, content);
	  },

	  isLastListItem: function() {
	    return this.editorIds.length === 1;
	  },

	  nextListItem: function() {
	    var idx = this.editorIds.indexOf(this.getCurrentTextEditor().id);
	    var editorId = this.editorIds[idx + 1];

	    if (editorId !== undefined) {
	      return this.getTextEditor(editorId);
	    } else {
	      return null;
	    }
	  },

	  previousListItem: function() {
	    var idx = this.editorIds.indexOf(this.getCurrentTextEditor().id);
	    var editorId = this.editorIds[idx - 1];

	    if (editorId !== undefined) {
	      return this.getTextEditor(editorId);
	    } else {
	      return null;
	    }
	  }

	});


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var utils = __webpack_require__(57);

	var Block = __webpack_require__(196);

	var tweet_template = _.template([
	  "<blockquote class='twitter-tweet' align='center'>",
	  "<p><%= text %></p>",
	  "&mdash; <%= user.name %> (@<%= user.screen_name %>)",
	  "<a href='<%= status_url %>' data-datetime='<%= created_at %>'><%= created_at %></a>",
	  "</blockquote>",
	  '<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>'
	].join("\n"));

	module.exports = Block.extend({

	  type: "tweet",
	  droppable: true,
	  pastable: true,
	  fetchable: true,

	  drop_options: {
	    re_render_on_reorder: true
	  },

	  title: function(){ return i18n.t('blocks:tweet:title'); },

	  fetchUrl: function(tweetID) {
	    return "/tweets/?tweet_id=" + tweetID;
	  },

	  icon_name: 'twitter',

	  loadData: function(data) {
	    if (_.isUndefined(data.status_url)) { data.status_url = ''; }
	    this.$inner.find('iframe').remove();
	    this.$inner.prepend(tweet_template(data));
	  },

	  onContentPasted: function(event){
	    // Content pasted. Delegate to the drop parse method
	    var input = $(event.target),
	    val = input.val();

	    // Pass this to the same handler as onDrop
	    this.handleTwitterDropPaste(val);
	  },

	  handleTwitterDropPaste: function(url){
	    if (!this.validTweetUrl(url)) {
	      utils.log("Invalid Tweet URL");
	      return;
	    }

	    // Twitter status
	    var tweetID = url.match(/[^\/]+$/);
	    if (!_.isEmpty(tweetID)) {
	      this.loading();
	      tweetID = tweetID[0];

	      var ajaxOptions = {
	        url: this.fetchUrl(tweetID),
	        dataType: "json"
	      };

	      this.fetch(ajaxOptions, this.onTweetSuccess, this.onTweetFail);
	    }
	  },

	  validTweetUrl: function(url) {
	    return (utils.isURI(url) &&
	            url.indexOf("twitter") !== -1 &&
	            url.indexOf("status") !== -1);
	  },

	  onTweetSuccess: function(data) {
	    // Parse the twitter object into something a bit slimmer..
	    var obj = {
	      user: {
	        profile_image_url: data.user.profile_image_url,
	        profile_image_url_https: data.user.profile_image_url_https,
	        screen_name: data.user.screen_name,
	        name: data.user.name
	      },
	      id: data.id_str,
	      text: data.text,
	      created_at: data.created_at,
	      entities: data.entities,
	      status_url: "https://twitter.com/" + data.user.screen_name + "/status/" + data.id_str
	    };

	    this.setAndLoadData(obj);
	    this.ready();
	  },

	  onTweetFail: function() {
	    this.addMessage(i18n.t("blocks:tweet:fetch_error"));
	    this.ready();
	  },

	  onDrop: function(transferData){
	    var url = transferData.getData('text/plain');
	    this.handleTwitterDropPaste(url);
	  }
	});


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);
	var Block = __webpack_require__(196);

	module.exports = Block.extend({

	  // more providers at https://gist.github.com/jeffling/a9629ae28e076785a14f
	  providers: {
	    vimeo: {
	      regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo\.co(?:.+(?:\/)([^\/].*)+$)/,
	      html: "<iframe src=\"<%= protocol %>//player.vimeo.com/video/<%= remote_id %>?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
	    },
	    youtube: {
	      regex: /^.*(?:(?:youtu\.be\/)|(?:youtube\.com)\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)/,
	      html: "<iframe src=\"<%= protocol %>//www.youtube.com/embed/<%= remote_id %>\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>"
	    }
	  },

	  type: 'video',
	  title: function() { return i18n.t('blocks:video:title'); },

	  droppable: true,
	  pastable: true,

	  icon_name: 'video',

	  loadData: function(data){
	    if (!this.providers.hasOwnProperty(data.source)) { return; }

	    var source = this.providers[data.source];

	    var protocol = window.location.protocol === "file:" ? 
	      "http:" : window.location.protocol;

	    var aspectRatioClass = source.square ?
	      'with-square-media' : 'with-sixteen-by-nine-media';

	    this.$editor
	      .addClass('st-block__editor--' + aspectRatioClass)
	      .html(_.template(source.html, {
	        protocol: protocol,
	        remote_id: data.remote_id,
	        width: this.$editor.width() // for videos like vine
	      }));
	  },

	  onContentPasted: function(event){
	    this.handleDropPaste(event.target.value);
	  },

	  matchVideoProvider: function(provider, index, url) {
	    var match = provider.regex.exec(url);
	    if(match == null || _.isUndefined(match[1])) { return {}; }

	    return {
	      source: index,
	      remote_id: match[1]
	    };
	  },

	  handleDropPaste: function(url){
	    if (!utils.isURI(url)) { return; }

	    for(var key in this.providers) { 
	      if (!this.providers.hasOwnProperty(key)) { continue; }
	      this.setAndLoadData(
	        this.matchVideoProvider(this.providers[key], key, url)
	      );
	    }
	  },

	  onDrop: function(transferData){
	    var url = transferData.getData('text/plain');
	    this.handleDropPaste(url);
	  }
	});



/***/ },
/* 207 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  mediatedEvents: {},
	  eventNamespace: null,
	  _bindMediatedEvents: function() {
	    Object.keys(this.mediatedEvents).forEach(function(eventName){
	      var cb = this.mediatedEvents[eventName];
	      eventName = this.eventNamespace ?
	        this.eventNamespace + ':' + eventName :
	        eventName;
	      this.mediator.on(eventName, this[cb].bind(this));
	    }, this);
	  }
	};


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var Blocks = __webpack_require__(194);

	var BlockControl = function(type) {
	  this.type = type;
	  this.block_type = Blocks[this.type].prototype;
	  this.can_be_rendered = this.block_type.toolbarEnabled;

	  this._ensureElement();
	};

	Object.assign(BlockControl.prototype, __webpack_require__(187), __webpack_require__(188), __webpack_require__(60), {

	  tagName: 'a',
	  className: "st-block-control",

	  attributes: function() {
	    return {
	      'data-type': this.block_type.type
	    };
	  },

	  render: function() {
	    this.$el.html('<span class="st-icon">'+ _.result(this.block_type, 'icon_name') +'</span>' + _.result(this.block_type, 'title'));
	    return this;
	  }
	});

	module.exports = BlockControl;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * SirTrevor Block Controls
	 * --
	 * Gives an interface for adding new Sir Trevor blocks.
	 */

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var Blocks = __webpack_require__(194);
	var BlockControl = __webpack_require__(208);
	var EventBus = __webpack_require__(62);

	var BlockControls = function(available_types, mediator) {
	  this.available_types = available_types || [];
	  this.mediator = mediator;

	  this._ensureElement();
	  this._bindFunctions();
	  this._bindMediatedEvents();

	  this.initialize();
	};

	Object.assign(BlockControls.prototype, __webpack_require__(187), __webpack_require__(207), __webpack_require__(188), __webpack_require__(60), {

	  bound: ['handleControlButtonClick'],
	  block_controls: null,

	  className: "st-block-controls",
	  eventNamespace: 'block-controls',

	  mediatedEvents: {
	    'render': 'renderInContainer',
	    'show': 'show',
	    'hide': 'hide'
	  },

	  initialize: function() {
	    for(var block_type in this.available_types) {
	      if (Blocks.hasOwnProperty(block_type)) {
	        var block_control = new BlockControl(block_type);
	        if (block_control.can_be_rendered) {
	          this.$el.append(block_control.render().$el);
	        }
	      }
	    }

	    this.$el.delegate('.st-block-control', 'click', this.handleControlButtonClick);
	    this.mediator.on('block-controls:show', this.renderInContainer);
	  },

	  show: function() {
	    this.$el.addClass('st-block-controls--active');

	    EventBus.trigger('block:controls:shown');
	  },

	  hide: function() {
	    this.removeCurrentContainer();
	    this.$el.removeClass('st-block-controls--active');

	    EventBus.trigger('block:controls:hidden');
	  },

	  handleControlButtonClick: function(e) {
	    e.stopPropagation();

	    this.mediator.trigger('block:create', $(e.currentTarget).attr('data-type'));
	  },

	  renderInContainer: function(container) {
	    this.removeCurrentContainer();

	    container.append(this.$el.detach());
	    container.addClass('with-st-controls');

	    this.currentContainer = container;
	    this.show();
	  },

	  removeCurrentContainer: function() {
	    if (!_.isUndefined(this.currentContainer)) {
	      this.currentContainer.removeClass("with-st-controls");
	      this.currentContainer = undefined;
	    }
	  }
	});

	module.exports = BlockControls;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	   SirTrevor Floating Block Controls
	   --
	   Draws the 'plus' between blocks
	   */

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var EventBus = __webpack_require__(62);

	var FloatingBlockControls = function(wrapper, instance_id, mediator) {
	  this.$wrapper = wrapper;
	  this.instance_id = instance_id;
	  this.mediator = mediator;

	  this._ensureElement();
	  this._bindFunctions();

	  this.initialize();
	};

	Object.assign(FloatingBlockControls.prototype, __webpack_require__(187), __webpack_require__(188), __webpack_require__(60), {

	  className: "st-block-controls__top",

	  attributes: function() {
	    return {
	      'data-icon': 'add'
	    };
	  },

	  bound: ['handleBlockMouseOut', 'handleBlockMouseOver', 'handleBlockClick', 'onDrop'],

	  initialize: function() {
	    this.$el.on('click', this.handleBlockClick)
	    .dropArea()
	    .bind('drop', this.onDrop);

	    this.$wrapper.on('mouseover', '.st-block', this.handleBlockMouseOver)
	    .on('mouseout', '.st-block', this.handleBlockMouseOut)
	    .on('click', '.st-block--with-plus', this.handleBlockClick);
	  },

	  onDrop: function(ev) {
	    ev.preventDefault();

	    var dropped_on = this.$el,
	    item_id = ev.originalEvent.dataTransfer.getData("text/plain"),
	    block = $('#' + item_id);

	    if (!_.isUndefined(item_id) &&
	        !_.isEmpty(block) &&
	          dropped_on.attr('id') !== item_id &&
	            this.instance_id === block.attr('data-instance')
	       ) {
	         dropped_on.after(block);
	       }

	       EventBus.trigger("block:reorder:dropped", item_id);
	  },

	  handleBlockMouseOver: function(e) {
	    var block = $(e.currentTarget);

	    if (!block.hasClass('st-block--with-plus')) {
	      block.addClass('st-block--with-plus');
	    }
	  },

	  handleBlockMouseOut: function(e) {
	    var block = $(e.currentTarget);

	    if (block.hasClass('st-block--with-plus')) {
	      block.removeClass('st-block--with-plus');
	    }
	  },

	  handleBlockClick: function(e) {
	    e.stopPropagation();
	    this.mediator.trigger('block-controls:render', $(e.currentTarget));
	  }

	});

	module.exports = FloatingBlockControls;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Format Bar
	 * --
	 * Displayed on focus on a text area.
	 * Renders with all available options for the editor instance
	 */

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var FormatBar = function(options, mediator, editor) {
	  this.editor = editor;
	  this.options = Object.assign({}, config.defaults.formatBar, options || {});
	  this.commands = this.options.commands;
	  this.mediator = mediator;

	  this._ensureElement();
	  this._bindFunctions();
	  this._bindMediatedEvents();

	  this.initialize.apply(this, arguments);
	};

	Object.assign(FormatBar.prototype, __webpack_require__(187), __webpack_require__(207), __webpack_require__(60), __webpack_require__(188), {

	  className: 'st-format-bar',

	  bound: ["onFormatButtonClick", "renderBySelection", "hide"],

	  eventNamespace: 'formatter',

	  mediatedEvents: {
	    'position': 'renderBySelection',
	    'show': 'show',
	    'hide': 'hide'
	  },

	  initialize: function() {
	    this.$btns = [];

	    this.commands.forEach(function(format) {
	      var btn = $("<button>", {
	        'class': 'st-format-btn st-format-btn--' + format.name + ' ' +
	          (format.iconName ? 'st-icon' : ''),
	        'text': format.text,
	        'data-cmd': format.cmd
	      });

	      this.$btns.push(btn);
	      btn.appendTo(this.$el);
	    }, this);

	    this.$b = $(document);
	  },

	  hide: function() {
	    this.$el.removeClass('st-format-bar--is-ready');
	    this.$el.remove();
	  },

	  show: function() {
	    this.hide();

	    this.editor.$outer.append(this.$el);
	    this.$el.addClass('st-format-bar--is-ready');
	    this.$el.bind('click', '.st-format-btn', this.onFormatButtonClick);
	  },

	  remove: function(){ this.$el.remove(); },

	  renderBySelection: function() {
	    this.highlightSelectedButtons();
	    this.show();
	    this.calculatePosition();
	  },

	  calculatePosition: function() {
	    var selection = window.getSelection(),
	        range = selection.getRangeAt(0),
	        boundary = range.getBoundingClientRect(),
	        coords = {},
	        outer = this.editor.$outer.get(0),
	        outerBoundary = outer.getBoundingClientRect();

	    coords.top = (boundary.top - outerBoundary.top) + 'px';
	    coords.left = (((boundary.left + boundary.right) / 2) -
	      (this.el.offsetWidth / 2) - outerBoundary.left) + 'px';

	    this.$el.css(coords);
	  },

	  highlightSelectedButtons: function() {
	    var block = utils.getBlockBySelection();
	    this.$btns.forEach(function(btn) {
	      var cmd = $(btn).data('cmd');
	      btn.toggleClass("st-format-btn--is-active",
	                      block.queryTextBlockCommandState(cmd));
	    }, this);
	  },

	  onFormatButtonClick: function(ev){
	    ev.stopPropagation();

	    var block = utils.getBlockBySelection();
	    if (_.isUndefined(block)) {
	      throw "Associated block not found";
	    }

	    var btn = $(ev.target),
	        cmd = btn.data('cmd');

	    if (_.isUndefined(cmd)) {
	      return false;
	    }

	    block.execTextBlockCommand(cmd);

	    this.highlightSelectedButtons();

	    return false;
	  }

	});

	module.exports = FormatBar;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 * Sir Trevor Editor
	 * --
	 * Represents one Sir Trevor editor instance (with multiple blocks)
	 * Each block references this instance.
	 * BlockTypes are global however.
	 */

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);
	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var Events = __webpack_require__(60);
	var EventBus = __webpack_require__(62);
	var FormEvents = __webpack_require__(213);
	var BlockControls = __webpack_require__(209);
	var BlockManager = __webpack_require__(193);
	var FloatingBlockControls = __webpack_require__(210);
	var FormatBar = __webpack_require__(211);
	var EditorStore = __webpack_require__(63);
	var ErrorHandler = __webpack_require__(214);

	var Editor = function(options) {
	  this.initialize(options);
	};

	Object.assign(Editor.prototype, __webpack_require__(187), __webpack_require__(60), {

	  bound: ['onFormSubmit', 'hideAllTheThings', 'changeBlockPosition',
	    'removeBlockDragOver', 'renderBlock', 'resetBlockControls',
	    'blockLimitReached'],

	  events: {
	    'block:reorder:dragend': 'removeBlockDragOver',
	    'block:reorder:dropped': 'removeBlockDragOver',
	    'block:content:dropped': 'removeBlockDragOver'
	  },

	  initialize: function(options) {
	    utils.log("Init SirTrevor.Editor");

	    this.options = Object.assign({}, config.defaults, options || {});
	    this.ID = _.uniqueId('st-editor-');

	    if (!this._ensureAndSetElements()) { return false; }

	    if(!_.isUndefined(this.options.onEditorRender) &&
	       _.isFunction(this.options.onEditorRender)) {
	      this.onEditorRender = this.options.onEditorRender;
	    }

	    // Mediated events for *this* Editor instance
	    this.mediator = Object.assign({}, Events);

	    this._bindFunctions();

	    config.instances.push(this);

	    this.build();

	    FormEvents.bindFormSubmit(this.$form);
	  },

	  /*
	   * Build the Editor instance.
	   * Check to see if we've been passed JSON already, and if not try and
	   * create a default block.
	   * If we have JSON then we need to build all of our blocks from this.
	   */
	  build: function() {
	    this.$el.hide();

	    this.errorHandler = new ErrorHandler(this.$outer, this.mediator, this.options.errorsContainer);
	    this.store = new EditorStore(this.$el.val(), this.mediator);
	    this.block_manager = new BlockManager(this.options, this.ID, this.mediator);
	    this.block_controls = new BlockControls(this.block_manager.blockTypes, this.mediator);
	    this.fl_block_controls = new FloatingBlockControls(this.$wrapper, this.ID, this.mediator);
	    this.formatBar = new FormatBar(this.options.formatBar, this.mediator, this);

	    this.mediator.on('block:changePosition', this.changeBlockPosition);
	    this.mediator.on('block-controls:reset', this.resetBlockControls);
	    this.mediator.on('block:limitReached', this.blockLimitReached);
	    this.mediator.on('block:render', this.renderBlock);

	    this.dataStore = "Please use store.retrieve();";

	    this._setEvents();

	    this.$wrapper.prepend(this.fl_block_controls.render().$el);
	    this.$outer.append(this.block_controls.render().$el);

	    $(window).bind('click', this.hideAllTheThings);

	    this.createBlocks();
	    this.$wrapper.addClass('st-ready');

	    if(!_.isUndefined(this.onEditorRender)) {
	      this.onEditorRender();
	    }
	  },

	  createBlocks: function() {
	    var store = this.store.retrieve();

	    if (store.data.length > 0) {
	      store.data.forEach(function(block) {
	        this.mediator.trigger('block:create', block.type, block.data);
	      }, this);
	    } else if (this.options.defaultType !== false) {
	      this.mediator.trigger('block:create', this.options.defaultType, {});
	    }
	  },

	  destroy: function() {
	    // Destroy the rendered sub views
	    this.formatBar.destroy();
	    this.fl_block_controls.destroy();
	    this.block_controls.destroy();

	    // Destroy all blocks
	    this.block_manager.blocks.forEach(function(block) {
	      this.mediator.trigger('block:remove', block.blockID);
	    }, this);

	    // Stop listening to events
	    this.mediator.stopListening();
	    this.stopListening();

	    // Remove instance
	    config.instances = config.instances.filter(function(instance) {
	      return instance.ID !== this.ID;
	    }, this);

	    // Clear the store
	    this.store.reset();
	    this.$outer.replaceWith(this.$el.detach());
	  },

	  reinitialize: function(options) {
	    this.destroy();
	    this.initialize(options || this.options);
	  },

	  resetBlockControls: function() {
	    this.block_controls.renderInContainer(this.$wrapper);
	    this.block_controls.hide();
	  },

	  blockLimitReached: function(toggle) {
	    this.$wrapper.toggleClass('st--block-limit-reached', toggle);
	  },

	  _setEvents: function() {
	    Object.keys(this.events).forEach(function(type) {
	      EventBus.on(type, this[this.events[type]], this);
	    }, this);
	  },

	  hideAllTheThings: function(e) {
	    this.block_controls.hide();
	    this.formatBar.hide();
	  },

	  store: function(method, options){
	    utils.log("The store method has been removed, please call store[methodName]");
	    return this.store[method].call(this, options || {});
	  },

	  renderBlock: function(block) {
	    this._renderInPosition(block.render().$el);
	    this.hideAllTheThings();

	    block.trigger("onRender");
	  },

	  removeBlockDragOver: function() {
	    this.$outer.find('.st-drag-over').removeClass('st-drag-over');
	  },

	  changeBlockPosition: function($block, selectedPosition) {
	    selectedPosition = selectedPosition - 1;

	    var blockPosition = this.getBlockPosition($block),
	    $blockBy = this.$wrapper.find('.st-block').eq(selectedPosition);

	    var where = (blockPosition > selectedPosition) ? "Before" : "After";

	    if($blockBy && $blockBy.attr('id') !== $block.attr('id')) {
	      this.hideAllTheThings();
	      $block["insert" + where]($blockBy);
	    }
	  },

	  _renderInPosition: function(block) {
	    if (this.block_controls.currentContainer) {
	      this.block_controls.currentContainer.after(block);
	    } else {
	      this.$wrapper.append(block);
	    }
	  },

	  validateAndSaveBlock: function(block, shouldValidate) {
	    if ((!config.skipValidation || shouldValidate) && !block.valid()) {
	      this.mediator.trigger('errors:add', { text: _.result(block, 'validationFailMsg') });
	      utils.log("Block " + block.blockID + " failed validation");
	      return;
	    }

	    var blockData = block.getData();
	    utils.log("Adding data for block " + block.blockID + " to block store:",
	              blockData);
	    this.store.addData(blockData);
	  },

	  /*
	   * Handle a form submission of this Editor instance.
	   * Validate all of our blocks, and serialise all data onto the JSON objects
	   */
	  onFormSubmit: function(shouldValidate) {
	    // if undefined or null or anything other than false - treat as true
	    shouldValidate = (shouldValidate === false) ? false : true;

	    utils.log("Handling form submission for Editor " + this.ID);

	    this.mediator.trigger('errors:reset');
	    this.store.reset();

	    this.validateBlocks(shouldValidate);
	    this.block_manager.validateBlockTypesExist(shouldValidate);

	    this.mediator.trigger('errors:render');
	    this.$el.val(this.store.toString());

	    return this.errorHandler.errors.length;
	  },

	  validateBlocks: function(shouldValidate) {
	    var self = this;
	    this.$wrapper.find('.st-block').each(function(idx, block) {
	      var _block = self.block_manager.findBlockById($(block).attr('id'));
	      if (!_.isUndefined(_block)) {
	        self.validateAndSaveBlock(_block, shouldValidate);
	      }
	    });
	  },

	  findBlockById: function(block_id) {
	    return this.block_manager.findBlockById(block_id);
	  },

	  getBlocksByType: function(block_type) {
	    return this.block_manager.getBlocksByType(block_type);
	  },

	  getBlocksByIDs: function(block_ids) {
	    return this.block_manager.getBlocksByIDs(block_ids);
	  },

	  getBlockPosition: function($block) {
	    return this.$wrapper.find('.st-block').index($block);
	  },

	  _ensureAndSetElements: function() {
	    if(_.isUndefined(this.options.el) || _.isEmpty(this.options.el)) {
	      utils.log("You must provide an el");
	      return false;
	    }

	    this.$el = this.options.el;
	    this.el = this.options.el[0];
	    this.$form = this.$el.parents('form');

	    var $outer = $("<div>").attr({ 'id': this.ID, 'class': 'st-outer notranslate', 'dropzone': 'copy link move' });
	    var $wrapper = $("<div>").attr({ 'class': 'st-blocks' });

	    // Wrap our element in lots of containers *eww*
	    this.$el.wrap($outer).wrap($wrapper);

	    this.$outer = this.$form.find('#' + this.ID);
	    this.$wrapper = this.$outer.find('.st-blocks');

	    return true;
	  }

	});

	module.exports = Editor;




/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(58);
	var utils = __webpack_require__(57);

	var EventBus = __webpack_require__(62);
	var Submittable = __webpack_require__(64);

	var formBound = false; // Flag to tell us once we've bound our submit event

	var FormEvents = {
	  bindFormSubmit: function(form) {
	    if (!formBound) {
	      // XXX: should we have a formBound and submittable per-editor?
	      // telling JSHint to ignore as it'll complain we shouldn't be creating
	      // a new object, but otherwise `this` won't be set in the Submittable
	      // initialiser. Bit weird.
	      new Submittable(form); // jshint ignore:line
	      form.bind('submit', this.onFormSubmit);
	      formBound = true;
	    }
	  },

	  onBeforeSubmit: function(shouldValidate) {
	    // Loop through all of our instances and do our form submits on them
	    var errors = 0;
	    config.instances.forEach(function(inst, i) {
	      errors += inst.onFormSubmit(shouldValidate);
	    });
	    utils.log("Total errors: " + errors);

	    return errors;
	  },

	  onFormSubmit: function(ev) {
	    var errors = FormEvents.onBeforeSubmit();

	    if(errors > 0) {
	      EventBus.trigger("onError");
	      ev.preventDefault();
	    }
	  },
	};

	module.exports = FormEvents;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var $ = __webpack_require__(56);

	var ErrorHandler = function($wrapper, mediator, container) {
	  this.$wrapper = $wrapper;
	  this.mediator = mediator;
	  this.$el = container;

	  if (_.isUndefined(this.$el)) {
	    this._ensureElement();
	    this.$wrapper.prepend(this.$el);
	  }

	  this.$el.hide();
	  this._bindFunctions();
	  this._bindMediatedEvents();

	  this.initialize();
	};

	Object.assign(ErrorHandler.prototype, __webpack_require__(187), __webpack_require__(207), __webpack_require__(188), {

	  errors: [],
	  className: "st-errors",
	  eventNamespace: 'errors',

	  mediatedEvents: {
	    'reset': 'reset',
	    'add': 'addMessage',
	    'render': 'render'
	  },

	  initialize: function() {
	    var $list = $("<ul>");
	    this.$el.append("<p>" + i18n.t("errors:title") + "</p>")
	    .append($list);
	    this.$list = $list;
	  },

	  render: function() {
	    if (this.errors.length === 0) { return false; }
	    this.errors.forEach(this.createErrorItem, this);
	    this.$el.show();
	  },

	  createErrorItem: function(error) {
	    var $error = $("<li>", { class: "st-errors__msg", html: error.text });
	    this.$list.append($error);
	  },

	  addMessage: function(error) {
	    this.errors.push(error);
	  },

	  reset: function() {
	    if (this.errors.length === 0) { return false; }
	    this.errors = [];
	    this.$list.html('');
	    this.$el.hide();
	  }

	});

	module.exports = ErrorHandler;



/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(2);
	var utils = __webpack_require__(57);

	module.exports = function(content, type) {

	  // Deferring requiring these to sidestep a circular dependency:
	  // Block -> this -> Blocks -> Block
	  var Blocks = __webpack_require__(194);

	  type = utils.classify(type);

	  var markdown = content;

	  //Normalise whitespace
	  markdown = markdown.replace(/&nbsp;/g," ");

	  // First of all, strip any additional formatting
	  // MSWord, I'm looking at you, punk.
	  markdown = markdown.replace(/( class=(")?Mso[a-zA-Z]+(")?)/g, '')
	                     .replace(/<!--(.*?)-->/g, '')
	                     .replace(/\/\*(.*?)\*\//g, '')
	                     .replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, '');

	  var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'],
	      tagStripper, i;

	  for (i = 0; i< badTags.length; i++) {
	    tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
	    markdown = markdown.replace(tagStripper, '');
	  }

	  // Escape anything in here that *could* be considered as MD
	  // Markdown chars we care about: * [] _ () -
	  markdown = markdown.replace(/\*/g, "\\*")
	                    .replace(/\[/g, "\\[")
	                    .replace(/\]/g, "\\]")
	                    .replace(/\_/g, "\\_")
	                    .replace(/\(/g, "\\(")
	                    .replace(/\)/g, "\\)")
	                    .replace(/\-/g, "\\-");

	  var inlineTags = ["em", "i", "strong", "b"];

	  for (i = 0; i< inlineTags.length; i++) {
	    tagStripper = new RegExp('<'+inlineTags[i]+'><br></'+inlineTags[i]+'>', 'gi');
	    markdown = markdown.replace(tagStripper, '<br>');
	  }

	  function replaceBolds(match, p1, p2){
	    if(_.isUndefined(p2)) { p2 = ''; }
	    return "**" + p1.replace(/<(.)?br(.)?>/g, '') + "**" + p2;
	  }

	  function replaceItalics(match, p1, p2){
	    if(_.isUndefined(p2)) { p2 = ''; }
	    return "_" + p1.replace(/<(.)?br(.)?>/g, '') + "_" + p2;
	  }

	  markdown = markdown.replace(/<(\w+)(?:\s+\w+="[^"]+(?:"\$[^"]+"[^"]+)?")*>\s*<\/\1>/gim, '') //Empty elements
	                      .replace(/\n/mg,"")
	                      .replace(/<a.*?href=[""'](.*?)[""'].*?>(.*?)<\/a>/gim, function(match, p1, p2){
	                        return "[" + p2.trim().replace(/<(.)?br(.)?>/g, '') + "]("+ p1 +")";
	                      }) // Hyperlinks
	                      .replace(/<strong>(?:\s*)(.*?)(\s)*?<\/strong>/gim, replaceBolds)
	                      .replace(/<b>(?:\s*)(.*?)(\s*)?<\/b>/gim, replaceBolds)
	                      .replace(/<em>(?:\s*)(.*?)(\s*)?<\/em>/gim, replaceItalics)
	                      .replace(/<i>(?:\s*)(.*?)(\s*)?<\/i>/gim, replaceItalics);


	  // Do our generic stripping out
	  markdown = markdown.replace(/([^<>]+)(<div>)/g,"$1\n$2")                                 // Divitis style line breaks (handle the first line)
	                 .replace(/<div><div>/g,'\n<div>')                                         // ^ (double opening divs with one close from Chrome)
	                 .replace(/(?:<div>)([^<>]+)(?:<div>)/g,"$1\n")                            // ^ (handle nested divs that start with content)
	                 .replace(/(?:<div>)(?:<br>)?([^<>]+)(?:<br>)?(?:<\/div>)/g,"$1\n")        // ^ (handle content inside divs)
	                 .replace(/<\/p>/g,"\n\n")                                               // P tags as line breaks
	                 .replace(/<(.)?br(.)?>/g,"\n")                                            // Convert normal line breaks
	                 .replace(/&lt;/g,"<").replace(/&gt;/g,">");                                 // Encoding

	  // Use custom block toMarkdown functions (if any exist)
	  var block;
	  if (Blocks.hasOwnProperty(type)) {
	    block = Blocks[type];
	    // Do we have a toMarkdown function?
	    if (!_.isUndefined(block.prototype.toMarkdown) && _.isFunction(block.prototype.toMarkdown)) {
	      markdown = block.prototype.toMarkdown(markdown);
	    }
	  }

	  // Strip remaining HTML
	  markdown = markdown.replace(/<\/?[^>]+(>|$)/g, "");

	  return markdown;
	};


/***/ }
/******/ ])
});
;