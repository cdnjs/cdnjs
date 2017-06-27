(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["stampit"] = factory();
	else
		root["stampit"] = factory();
})(this, function() {
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

	/**
	 * Stampit
	 **
	 * Create objects from reusable, composable behaviors.
	 **
	 * Copyright (c) 2013 Eric Elliott
	 * http://opensource.org/licenses/MIT
	 **/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashCollectionForEach = __webpack_require__(1);

	var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

	var _lodashLangIsFunction = __webpack_require__(12);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var _lodashLangIsObject = __webpack_require__(8);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _supermixer = __webpack_require__(27);

	var create = Object.create;
	function isThenable(value) {
	  return value && (0, _lodashLangIsFunction2['default'])(value.then);
	}

	function extractFunctions() {
	  var result = [];

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if ((0, _lodashLangIsFunction2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (fn) {
	      // assuming all the arguments are functions
	      if ((0, _lodashLangIsFunction2['default'])(fn)) {
	        result.push(fn);
	      }
	    });
	  } else if ((0, _lodashLangIsObject2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (obj) {
	      (0, _lodashCollectionForEach2['default'])(obj, function (fn) {
	        if ((0, _lodashLangIsFunction2['default'])(fn)) {
	          result.push(fn);
	        }
	      });
	    });
	  }
	  return result;
	}

	function addMethods(fixed) {
	  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    methods[_key2 - 1] = arguments[_key2];
	  }

	  return _supermixer.mixinFunctions.apply(undefined, [fixed.methods].concat(methods));
	}
	function addRefs(fixed) {
	  for (var _len3 = arguments.length, refs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    refs[_key3 - 1] = arguments[_key3];
	  }

	  fixed.refs = fixed.state =

	  /**
	   * Take a destination object followed by one or more source objects,
	   * and copy the source object properties to the destination object,
	   * with last in priority overrides.
	   * @param {Object} destination An object to copy properties to.
	   * @param {...Object} source An object to copy properties from.
	   * @returns {Object}
	   */
	  _supermixer.mixin.apply(undefined, [fixed.refs].concat(refs));
	  return fixed.refs;
	}
	function addInit(fixed) {
	  for (var _len4 = arguments.length, inits = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    inits[_key4 - 1] = arguments[_key4];
	  }

	  var extractedInits = extractFunctions.apply(undefined, inits);
	  fixed.init = fixed.enclose = fixed.init.concat(extractedInits);
	  return fixed.init;
	}
	function addProps(fixed) {
	  for (var _len5 = arguments.length, propses = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    propses[_key5 - 1] = arguments[_key5];
	  }

	  return _supermixer.merge.apply(undefined, [fixed.props].concat(propses));
	}
	function addStatic(fixed) {
	  for (var _len6 = arguments.length, statics = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	    statics[_key6 - 1] = arguments[_key6];
	  }

	  return _supermixer.mixin.apply(undefined, [fixed['static']].concat(statics));
	}

	function cloneAndExtend(fixed, extensionFunction) {
	  var stamp = stampit(fixed);

	  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
	    args[_key7 - 2] = arguments[_key7];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
	  return stamp;
	}

	function _compose() {
	  var result = stampit();

	  for (var _len8 = arguments.length, factories = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	    factories[_key8] = arguments[_key8];
	  }

	  (0, _lodashCollectionForEach2['default'])(factories, function (source) {
	    if (source && source.fixed) {
	      addMethods(result.fixed, source.fixed.methods);
	      // We might end up having two different stampit modules loaded and used in conjunction.
	      // These || operators ensure that old stamps could be combined with the current version stamps.
	      // 'state' is the old name for 'refs'
	      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
	      // 'enclose' is the old name for 'init'
	      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
	      addProps(result.fixed, source.fixed.props);
	      addStatic(result.fixed, source.fixed['static']);
	    }
	  });
	  return (0, _supermixer.mixin)(result, result.fixed['static']);
	}

	/**
	 * Return a factory function that will produce new objects using the
	 * components that are passed in or composed.
	 *
	 * @param  {Object} [options] Options to build stamp from: `{ methods, refs, init, props }`
	 * @param  {Object} [options.methods] A map of method names and bodies for delegation.
	 * @param  {Object} [options.refs] A map of property names and values to be mixed into each new object.
	 * @param  {Object} [options.init] A closure (function) used to create private data and privileged methods.
	 * @param  {Object} [options.props] An object to be deeply cloned into each newly stamped object.
	 * @param  {Object} [options.static] An object to be mixed into each `this` and derived stamps (not objects!).
	 * @return {Function(refs)} factory A factory to produce objects.
	 * @return {Function(refs)} factory.create Just like calling the factory function.
	 * @return {Object} factory.fixed An object map containing the stamp components.
	 * @return {Function(methods)} factory.methods Add methods to the stamp. Chainable.
	 * @return {Function(refs)} factory.refs Add references to the stamp. Chainable.
	 * @return {Function(Function(context))} factory.init Add a closure which called on object instantiation. Chainable.
	 * @return {Function(props)} factory.props Add deeply cloned properties to the produced objects. Chainable.
	 * @return {Function(stamps)} factory.compose Combine several stamps into single. Chainable.
	 * @return {Function(statics)} factory.static Add properties to the stamp (not objects!). Chainable.
	 */
	var stampit = function stampit(options) {
	  var fixed = { methods: {}, refs: {}, init: [], props: {}, 'static': {} };
	  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
	  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
	  if (options) {
	    addMethods(fixed, options.methods);
	    addRefs(fixed, options.refs);
	    addInit(fixed, options.init);
	    addProps(fixed, options.props);
	    addStatic(fixed, options['static']);
	  }

	  var factory = function Factory(refs) {
	    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	      args[_key9 - 1] = arguments[_key9];
	    }

	    var instance = (0, _supermixer.mixin)(create(fixed.methods), fixed.refs, refs);
	    (0, _supermixer.mergeUnique)(instance, fixed.props); // props are safely merged into refs

	    var nextPromise = null;
	    if (fixed.init.length > 0) {
	      (0, _lodashCollectionForEach2['default'])(fixed.init, function (fn) {
	        if (!(0, _lodashLangIsFunction2['default'])(fn)) {
	          return; // not a function, do nothing.
	        }

	        // Check if we are in the async mode.
	        if (!nextPromise) {
	          // Call the init().
	          var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	          if (!callResult) {
	            return; // The init() returned nothing. Proceed to the next init().
	          }

	          // Returned value is meaningful.
	          // It will replace the stampit-created object.
	          if (!isThenable(callResult)) {
	            instance = callResult; // stamp is synchronous so far.
	            return;
	          }

	          // This is the sync->async conversion point.
	          // Since now our factory will return a promise, not an object.
	          nextPromise = callResult;
	        } else {
	          // As long as one of the init() functions returned a promise,
	          // now our factory will 100% return promise too.
	          // Linking the init() functions into the promise chain.
	          nextPromise = nextPromise.then(function (newInstance) {
	            // The previous promise might want to return a value,
	            // which we should take as a new object instance.
	            instance = newInstance || instance;

	            // Calling the following init().
	            // NOTE, than `fn` is wrapped to a closure within the forEach loop.
	            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	            // Check if call result is truthy.
	            if (!callResult) {
	              // The init() returned nothing. Thus using the previous object instance.
	              return instance;
	            }

	            if (!isThenable(callResult)) {
	              // This init() was synchronous and returned a meaningful value.
	              instance = callResult;
	              // Resolve the instance for the next `then()`.
	              return instance;
	            }

	            // The init() returned another promise. It is becoming our nextPromise.
	            return callResult;
	          });
	        }
	      });
	    }

	    // At the end we should resolve the last promise and
	    // return the resolved value (as a promise too).
	    return nextPromise ? nextPromise.then(function (newInstance) {
	      return newInstance || instance;
	    }) : instance;
	  };

	  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
	  var initMethod = cloneAndExtend.bind(null, fixed, addInit);
	  return (0, _supermixer.mixin)(factory, {
	    /**
	     * Creates a new object instance form the stamp.
	     */
	    create: factory,

	    /**
	     * The stamp components.
	     */
	    fixed: fixed,

	    /**
	     * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    methods: cloneAndExtend.bind(null, fixed, addMethods),

	    /**
	     * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    refs: refsMethod,

	    /**
	     * Alias to refs(). Deprecated.
	     * @return {Function} A new stamp (factory object).
	     */
	    state: refsMethod,

	    /**
	     * Take n functions, an array of functions, or n objects and add
	     * the functions to the initializers list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    init: initMethod,

	    /**
	     * Alias to init(). Deprecated.
	     * @return {Function} A new stamp (factory object).
	     */
	    enclose: initMethod,

	    /**
	     * Take n objects and deep merge them to the properties. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    props: cloneAndExtend.bind(null, fixed, addProps),

	    /**
	     * Take n objects and add all props to the factory object. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    'static': function _static() {
	      for (var _len10 = arguments.length, statics = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        statics[_key10] = arguments[_key10];
	      }

	      var newStamp = cloneAndExtend.apply(undefined, [factory.fixed, addStatic].concat(statics));
	      return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	    },

	    /**
	     * Take one or more factories produced from stampit() and
	     * combine them with `this` to produce and return a new factory.
	     * Combining overrides properties with last-in priority.
	     * @param {[Function]|...Function} factories Stampit factories.
	     * @return {Function} A new stampit factory composed from arguments.
	     */
	    compose: function compose() {
	      for (var _len11 = arguments.length, factories = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        factories[_key11] = arguments[_key11];
	      }

	      return _compose.apply(undefined, [factory].concat(factories));
	    }
	  }, fixed['static']);
	};

	// Static methods

	function isStamp(obj) {
	  return (0, _lodashLangIsFunction2['default'])(obj) && (0, _lodashLangIsFunction2['default'])(obj.methods) && (
	  // isStamp can be called for old stampit factory object.
	  // We should check old names (state and enclose) too.
	  (0, _lodashLangIsFunction2['default'])(obj.refs) || (0, _lodashLangIsFunction2['default'])(obj.state)) && ((0, _lodashLangIsFunction2['default'])(obj.init) || (0, _lodashLangIsFunction2['default'])(obj.enclose)) && (0, _lodashLangIsFunction2['default'])(obj.props) && (0, _lodashLangIsFunction2['default'])(obj['static']) && (0, _lodashLangIsObject2['default'])(obj.fixed);
	}

	function convertConstructor(Constructor) {
	  var stamp = stampit();
	  stamp.fixed.refs = stamp.fixed.state = (0, _supermixer.mergeChainNonFunctions)(stamp.fixed.refs, Constructor.prototype);
	  (0, _supermixer.mixin)(stamp, (0, _supermixer.mixin)(stamp.fixed['static'], Constructor));

	  (0, _supermixer.mixinChainFunctions)(stamp.fixed.methods, Constructor.prototype);
	  addInit(stamp.fixed, function (_ref) {
	    var instance = _ref.instance;
	    var args = _ref.args;
	    return Constructor.apply(instance, args);
	  });

	  return stamp;
	}

	function shortcutMethod(extensionFunction) {
	  var stamp = stampit();

	  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    args[_key12 - 1] = arguments[_key12];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));

	  return stamp;
	}

	exports['default'] = (0, _supermixer.mixin)(stampit, {

	  /**
	   * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  methods: shortcutMethod.bind(null, addMethods),

	  /**
	   * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  refs: shortcutMethod.bind(null, addRefs),

	  /**
	   * Take n functions, an array of functions, or n objects and add
	   * the functions to the initializers list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  init: shortcutMethod.bind(null, addInit),

	  /**
	   * Take n objects and deep merge them to the properties. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  props: shortcutMethod.bind(null, addProps),

	  /**
	   * Take n objects and add all props to the factory object. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  'static': function _static() {
	    for (var _len13 = arguments.length, statics = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
	      statics[_key13] = arguments[_key13];
	    }

	    var newStamp = shortcutMethod.apply(undefined, [addStatic].concat(statics));
	    return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	  },

	  /**
	   * Take two or more factories produced from stampit() and
	   * combine them to produce a new factory.
	   * Combining overrides properties with last-in priority.
	   * @param {[Function]|...Function} factories Stamps produced by stampit().
	   * @return {Function} A new stampit factory composed from arguments.
	   */
	  compose: _compose, mixin: _supermixer.mixin,
	  extend: _supermixer.mixin,
	  mixIn: _supermixer.mixin,
	  assign: _supermixer.mixin,

	  /**
	   * Check if an object is a stamp.
	   * @param {Object} obj An object to check.
	   * @returns {Boolean}
	   */
	  isStamp: isStamp,

	  /**
	   * Take an old-fashioned JS constructor and return a stampit stamp
	   * that you can freely compose with other stamps.
	   * @param  {Function} Constructor
	   * @return {Function} A composable stampit factory (aka stamp).
	   */
	  convertConstructor: convertConstructor
	});
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(2),
	    baseEach = __webpack_require__(3),
	    createForEach = __webpack_require__(24);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
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

	module.exports = arrayEach;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(4),
	    createBaseEach = __webpack_require__(23);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(5),
	    keys = __webpack_require__(9);

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

	module.exports = baseForOwn;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(6);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(7);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
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
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    isArrayLike = __webpack_require__(14),
	    isObject = __webpack_require__(8),
	    shimKeys = __webpack_require__(18);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
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
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(11);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isObjectLike = __webpack_require__(13);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
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
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(15),
	    isLength = __webpack_require__(17);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(16);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(19),
	    isArray = __webpack_require__(20),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(17),
	    keysIn = __webpack_require__(22);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

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

	module.exports = shimKeys;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(14),
	    isObjectLike = __webpack_require__(13);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

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
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10),
	    isLength = __webpack_require__(17),
	    isObjectLike = __webpack_require__(13);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

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
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(19),
	    isArray = __webpack_require__(20),
	    isIndex = __webpack_require__(21),
	    isLength = __webpack_require__(17),
	    isObject = __webpack_require__(8);

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
	 * @param {Object} object The object to query.
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
	    (isArray(object) || isArguments(object)) && length) || 0;

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

	module.exports = keysIn;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(15),
	    isLength = __webpack_require__(17),
	    toObject = __webpack_require__(7);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(25),
	    isArray = __webpack_require__(20);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(26);

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
	  if (thisArg === undefined) {
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

	module.exports = bindCallback;


/***/ },
/* 26 */
/***/ function(module, exports) {

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

	module.exports = identity;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mixer = __webpack_require__(28);

	var _mixer2 = _interopRequireDefault(_mixer);

	var _lodashLangIsFunction = __webpack_require__(12);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var isNotFunction = function isNotFunction(val) {
	  return !(0, _lodashLangIsFunction2['default'])(val);
	};

	/**
	 * Regular mixin function.
	 */
	var mixin = (0, _mixer2['default'])();

	/**
	 * Mixin functions only.
	 */
	var mixinFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default']
	});

	/**
	 * Mixin functions including prototype chain.
	 */
	var mixinChainFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default'],
	  chain: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var merge = (0, _mixer2['default'])({
	  deep: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var mergeUnique = (0, _mixer2['default'])({
	  deep: true,
	  noOverwrite: true
	});

	/**
	 * Merge objects including prototype chain properties.
	 */
	var mergeChainNonFunctions = (0, _mixer2['default'])({
	  filter: isNotFunction,
	  deep: true,
	  chain: true
	});

	exports['default'] = _mixer2['default'];
	exports.mixin = mixin;
	exports.mixinFunctions = mixinFunctions;
	exports.mixinChainFunctions = mixinChainFunctions;
	exports.merge = merge;
	exports.mergeUnique = mergeUnique;
	exports.mergeChainNonFunctions = mergeChainNonFunctions;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectForOwn = __webpack_require__(29);

	var _lodashObjectForOwn2 = _interopRequireDefault(_lodashObjectForOwn);

	var _lodashObjectForIn = __webpack_require__(31);

	var _lodashObjectForIn2 = _interopRequireDefault(_lodashObjectForIn);

	var _lodashLangCloneDeep = __webpack_require__(33);

	var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

	var _lodashLangIsObject = __webpack_require__(8);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _lodashLangIsUndefined = __webpack_require__(42);

	var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

	/**
	 * Factory for creating mixin functions of all kinds.
	 *
	 * @param {Object} opts
	 * @param {Function} opts.filter Function which filters value and key.
	 * @param {Function} opts.transform Function which transforms each value.
	 * @param {Boolean} opts.chain Loop through prototype properties too.
	 * @param {Boolean} opts.deep Deep looping through the nested properties.
	 * @param {Boolean} opts.noOverwrite Do not overwrite any existing data (aka first one wins).
	 * @return {Function} A new mix function.
	 */

	function mixer() {
	  var opts = arguments[0] === undefined ? {} : arguments[0];

	  // We will be recursively calling the exact same function when walking deeper.
	  if (opts.deep && !opts._innerMixer) {
	    opts._innerMixer = true; // avoiding infinite recursion.
	    opts._innerMixer = mixer(opts); // create same mixer for recursion purpose.
	  }

	  /**
	   * Combine properties from the passed objects into target. This method mutates target,
	   * if you want to create a new Object pass an empty object as first param.
	   *
	   * @param {Object} target Target Object
	   * @param {...Object} objects Objects to be combined (0...n objects).
	   * @return {Object} The mixed object.
	   */
	  return function mix(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }

	    // Check if it's us who called the function. See recursion calls are below.
	    if ((0, _lodashLangIsUndefined2['default'])(target) || !opts.noOverwrite && !(0, _lodashLangIsObject2['default'])(target)) {
	      if (sources.length > 1) {
	        // Weird, but someone (not us!) called this mixer with an incorrect first argument.
	        return opts._innerMixer.apply(opts, [{}].concat(sources));
	      }
	      return (0, _lodashLangCloneDeep2['default'])(sources[0]);
	    }

	    if (opts.noOverwrite) {
	      if (!(0, _lodashLangIsObject2['default'])(target) || !(0, _lodashLangIsObject2['default'])(sources[0])) {
	        return target;
	      }
	    }

	    function iteratee(sourceValue, key) {
	      var targetValue = target[key];
	      if (opts.filter && !opts.filter(sourceValue, targetValue, key)) {
	        return;
	      }

	      var result = opts.deep ? opts._innerMixer(targetValue, sourceValue) : sourceValue;
	      target[key] = opts.transform ? opts.transform(result, targetValue, key) : result;
	    }

	    var loop = opts.chain ? _lodashObjectForIn2['default'] : _lodashObjectForOwn2['default'];
	    sources.forEach(function (obj) {
	      loop(obj, iteratee);
	    });

	    return target;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(4),
	    createForOwn = __webpack_require__(30);

	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);

	module.exports = forOwn;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(25);

	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}

	module.exports = createForOwn;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(5),
	    createForIn = __webpack_require__(32);

	/**
	 * Iterates over own and inherited enumerable properties of an object invoking
	 * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	 * with three arguments: (value, key, object). Iteratee functions may exit
	 * iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forIn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	 */
	var forIn = createForIn(baseFor);

	module.exports = forIn;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(25),
	    keysIn = __webpack_require__(22);

	/**
	 * Creates a function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForIn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee, keysIn);
	  };
	}

	module.exports = createForIn;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(34),
	    bindCallback = __webpack_require__(25);

	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with two argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
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
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
	    : baseClone(value, true);
	}

	module.exports = cloneDeep;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(35),
	    arrayEach = __webpack_require__(2),
	    baseAssign = __webpack_require__(36),
	    baseForOwn = __webpack_require__(4),
	    initCloneArray = __webpack_require__(38),
	    initCloneByTag = __webpack_require__(39),
	    initCloneObject = __webpack_require__(41),
	    isArray = __webpack_require__(20),
	    isObject = __webpack_require__(8);

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
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
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
	  if (result !== undefined) {
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
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
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

	module.exports = baseClone;


/***/ },
/* 35 */
/***/ function(module, exports) {

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

	module.exports = arrayCopy;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(37),
	    keys = __webpack_require__(9);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 38 */
/***/ function(module, exports) {

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

	module.exports = initCloneArray;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(40);

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

	module.exports = initCloneByTag;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	module.exports = bufferClone;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports) {

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

	module.exports = initCloneObject;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ }
/******/ ])
});
;