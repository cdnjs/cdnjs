/*!
 * React Popper 0.5.0
 * https://github.com/souporserious/react-popper
 * Copyright (c) 2017 React Popper Authors
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactPopper"] = factory(require("react"));
	else
		root["ReactPopper"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arrow = exports.Popper = exports.Target = exports.Manager = undefined;

	var _Manager2 = __webpack_require__(1);

	var _Manager3 = _interopRequireDefault(_Manager2);

	var _Target2 = __webpack_require__(12);

	var _Target3 = _interopRequireDefault(_Target2);

	var _Popper2 = __webpack_require__(13);

	var _Popper3 = _interopRequireDefault(_Popper2);

	var _Arrow2 = __webpack_require__(17);

	var _Arrow3 = _interopRequireDefault(_Arrow2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Manager = _Manager3.default;
	exports.Target = _Target3.default;
	exports.Popper = _Popper3.default;
	exports.Arrow = _Arrow3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Manager = function (_Component) {
	  _inherits(Manager, _Component);

	  function Manager() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Manager);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
	      _this._targetNode = node;
	    }, _this._getTargetNode = function () {
	      return _this._targetNode;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Manager, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popperManager: {
	          setTargetNode: this._setTargetNode,
	          getTargetNode: this._getTargetNode
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          tag = _props.tag,
	          children = _props.children,
	          restProps = _objectWithoutProperties(_props, ['tag', 'children']);

	      if (tag !== false) {
	        return (0, _react.createElement)(tag, restProps, children);
	      } else {
	        return children;
	      }
	    }
	  }]);

	  return Manager;
	}(_react.Component);

	Manager.childContextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};
	Manager.propTypes = {
	  tag: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool])
	};
	Manager.defaultProps = {
	  tag: 'div'
	};
	exports.default = Manager;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (process.env.NODE_ENV !== 'production') {
	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

	  var isValidElement = function isValidElement(object) {
	    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(5)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(11)();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(8);

	var ReactPropTypesSecret = __webpack_require__(9);
	var checkPropTypes = __webpack_require__(10);

	module.exports = function (isValidElement, throwOnDirectAccess) {
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

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if (process.env.NODE_ENV !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (!manualPropTypeCallCache[cacheKey] &&
	          // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunction.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

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

	module.exports = emptyFunction;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

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

	if (process.env.NODE_ENV !== 'production') {
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

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
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

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (process.env.NODE_ENV !== 'production') {
	  var invariant = __webpack_require__(7);
	  var warning = __webpack_require__(8);
	  var ReactPropTypesSecret = __webpack_require__(9);
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if (process.env.NODE_ENV !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	module.exports = checkPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	var emptyFunction = __webpack_require__(6);
	var invariant = __webpack_require__(7);

	module.exports = function () {
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  function shim() {
	    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim
	  };

	  ReactPropTypes.checkPropTypes = emptyFunction;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Target = function Target(props, context) {
	  var _props$tag = props.tag,
	      tag = _props$tag === undefined ? 'div' : _props$tag,
	      innerRef = props.innerRef,
	      children = props.children,
	      restProps = _objectWithoutProperties(props, ['tag', 'innerRef', 'children']);

	  var popperManager = context.popperManager;

	  var targetRef = function targetRef(node) {
	    return popperManager.setTargetNode(node);
	  };

	  if (typeof children === 'function') {
	    return children({ targetRef: targetRef });
	  }

	  return (0, _react.createElement)(tag, _extends({
	    ref: function ref(node) {
	      targetRef(node);
	      if (typeof innerRef === 'function') {
	        innerRef(node);
	      }
	    }
	  }, restProps), children);
	};

	Target.contextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};

	Target.propTypes = {
	  tag: _propTypes2.default.string,
	  innerRef: _propTypes2.default.func,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};

	exports.default = Target;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _popper = __webpack_require__(14);

	var _popper2 = _interopRequireDefault(_popper);

	var _lodash = __webpack_require__(15);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var noop = function noop() {
	  return null;
	};

	var Popper = function (_Component) {
	  _inherits(Popper, _Component);

	  function Popper() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Popper);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popper.__proto__ || Object.getPrototypeOf(Popper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
	      _this._arrowNode = node;
	    }, _this._getTargetNode = function () {
	      return _this.context.popperManager.getTargetNode();
	    }, _this._updateStateModifier = {
	      enabled: true,
	      order: 900,
	      function: function _function(data) {
	        if (_this.state.data && !(0, _lodash2.default)(data.offsets, _this.state.data.offsets) || !_this.state.data) {
	          _this.setState({ data: data });
	        }
	        return data;
	      }
	    }, _this._getPopperStyle = function () {
	      var data = _this.state.data;

	      // If Popper isn't instantiated, hide the popperElement
	      // to avoid flash of unstyled content

	      if (!_this._popper || !data) {
	        return {
	          position: 'absolute',
	          pointerEvents: 'none',
	          opacity: 0
	        };
	      }

	      var _data$offsets$popper = data.offsets.popper,
	          top = _data$offsets$popper.top,
	          left = _data$offsets$popper.left,
	          position = _data$offsets$popper.position;


	      return _extends({
	        position: position,
	        top: 0,
	        left: 0,
	        transform: 'translate3d(' + Math.round(left) + 'px, ' + Math.round(top) + 'px, 0px)',
	        willChange: 'transform'
	      }, data.styles);
	    }, _this._getPopperPlacement = function () {
	      return !!_this.state.data ? _this.state.data.placement : undefined;
	    }, _this._getArrowStyle = function () {
	      if (!_this.state.data || !_this.state.data.offsets.arrow) {
	        return {};
	      } else {
	        var _this$state$data$offs = _this.state.data.offsets.arrow,
	            top = _this$state$data$offs.top,
	            left = _this$state$data$offs.left;

	        if (!left) {
	          return { top: +top };
	        } else {
	          return { left: +left };
	        }
	      }
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Popper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        popper: {
	          setArrowNode: this._setArrowNode,
	          getArrowStyle: this._getArrowStyle
	        }
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._updatePopper();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(lastProps) {
	      if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled) {
	        this._updatePopper();
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._destroyPopper();
	    }
	  }, {
	    key: '_updatePopper',
	    value: function _updatePopper() {
	      this._destroyPopper();
	      if (this._node) {
	        this._createPopper();
	      }
	    }
	  }, {
	    key: '_createPopper',
	    value: function _createPopper() {
	      var _props = this.props,
	          placement = _props.placement,
	          eventsEnabled = _props.eventsEnabled;

	      var modifiers = _extends({}, this.props.modifiers, {
	        applyStyle: { enabled: false },
	        updateState: this._updateStateModifier
	      });

	      if (this._arrowNode) {
	        modifiers.arrow = {
	          element: this._arrowNode
	        };
	      }

	      this._popper = new _popper2.default(this._getTargetNode(), this._node, {
	        placement: placement,
	        eventsEnabled: eventsEnabled,
	        modifiers: modifiers
	      });

	      // schedule an update to make sure everything gets positioned correct
	      // after being instantiated
	      this._popper.scheduleUpdate();
	    }
	  }, {
	    key: '_destroyPopper',
	    value: function _destroyPopper() {
	      if (this._popper) {
	        this._popper.destroy();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props2 = this.props,
	          tag = _props2.tag,
	          innerRef = _props2.innerRef,
	          placement = _props2.placement,
	          eventsEnabled = _props2.eventsEnabled,
	          modifiers = _props2.modifiers,
	          style = _props2.style,
	          children = _props2.children,
	          restProps = _objectWithoutProperties(_props2, ['tag', 'innerRef', 'placement', 'eventsEnabled', 'modifiers', 'style', 'children']);

	      var popperRef = function popperRef(node) {
	        _this2._node = node;
	      };
	      var popperStyle = _extends({}, this._getPopperStyle(), style);
	      var popperPlacement = this._getPopperPlacement();

	      if (typeof children === 'function') {
	        return children({ popperRef: popperRef, popperStyle: popperStyle, popperPlacement: popperPlacement });
	      }

	      return (0, _react.createElement)(tag, _extends({
	        ref: function ref(node) {
	          popperRef(node);
	          if (typeof innerRef === 'function') {
	            innerRef(node);
	          }
	        },
	        style: popperStyle,
	        'data-placement': popperPlacement
	      }, restProps), children);
	    }
	  }]);

	  return Popper;
	}(_react.Component);

	Popper.contextTypes = {
	  popperManager: _propTypes2.default.object.isRequired
	};
	Popper.childContextTypes = {
	  popper: _propTypes2.default.object.isRequired
	};
	Popper.propTypes = {
	  tag: _propTypes2.default.string,
	  innerRef: _propTypes2.default.func,
	  placement: _propTypes2.default.oneOf(_popper2.default.placements),
	  eventsEnabled: _propTypes2.default.bool,
	  modifiers: _propTypes2.default.object,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};
	Popper.defaultProps = {
	  tag: 'div',
	  placement: 'bottom',
	  eventsEnabled: true,
	  modifiers: {}
	};
	exports.default = Popper;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.0.8
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	(function (global, factory) {
	    ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Popper = factory();
	})(undefined, function () {
	    'use strict';

	    /**
	     * Returns the offset parent of the given element
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element
	     * @returns {Element} offset parent
	     */

	    function getOffsetParent(element) {
	        // NOTE: 1 DOM access here
	        var offsetParent = element.offsetParent;
	        var nodeName = offsetParent && offsetParent.nodeName;

	        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	            return window.document.documentElement;
	        }

	        return offsetParent;
	    }

	    /**
	     * Get CSS computed property of the given element
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Eement} element
	     * @argument {String} property
	     */
	    function getStyleComputedProperty(element, property) {
	        if (element.nodeType !== 1) {
	            return [];
	        }
	        // NOTE: 1 DOM access here
	        var css = window.getComputedStyle(element, null);
	        return property ? css[property] : css;
	    }

	    /**
	     * Returns the parentNode or the host of the element
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element
	     * @returns {Element} parent
	     */
	    function getParentNode(element) {
	        if (element.nodeName === 'HTML') {
	            return element;
	        }
	        return element.parentNode || element.host;
	    }

	    /**
	     * Returns the scrolling parent of the given element
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element
	     * @returns {Element} scroll parent
	     */
	    function getScrollParent(element) {
	        // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	        if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
	            return window.document.body;
	        }

	        // Firefox want us to check `-x` and `-y` variations as well

	        var _getStyleComputedProp = getStyleComputedProperty(element),
	            overflow = _getStyleComputedProp.overflow,
	            overflowX = _getStyleComputedProp.overflowX,
	            overflowY = _getStyleComputedProp.overflowY;

	        if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	            return element;
	        }

	        return getScrollParent(getParentNode(element));
	    }

	    /**
	     * Check if the given element is fixed or is inside a fixed parent
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element
	     * @argument {Element} customContainer
	     * @returns {Boolean} answer to "isFixed?"
	     */
	    function isFixed(element) {
	        var nodeName = element.nodeName;
	        if (nodeName === 'BODY' || nodeName === 'HTML') {
	            return false;
	        }
	        if (getStyleComputedProperty(element, 'position') === 'fixed') {
	            return true;
	        }
	        return isFixed(getParentNode(element));
	    }

	    /**
	     * Helper used to get the position which will be applied to the popper
	     * @method
	     * @memberof Popper.Utils
	     * @param {HTMLElement} element - popper element
	     * @returns {String} position
	     */
	    function getPosition(element) {
	        var container = getOffsetParent(element);

	        // Decide if the popper will be fixed
	        // If the reference element is inside a fixed context, the popper will be fixed as well to allow them to scroll together
	        var isParentFixed = isFixed(container);
	        return isParentFixed ? 'fixed' : 'absolute';
	    }

	    /*
	     * Helper to detect borders of a given element
	     * @method
	     * @memberof Popper.Utils
	     * @param {CSSStyleDeclaration} styles - result of `getStyleComputedProperty` on the given element
	     * @param {String} axis - `x` or `y`
	     * @return {Number} borders - the borders size of the given axis
	     */

	    function getBordersSize(styles, axis) {
	        var sideA = axis === 'x' ? 'Left' : 'Top';
	        var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	        return Number(styles['border' + sideA + 'Width'].split('px')[0]) + Number(styles['border' + sideB + 'Width'].split('px')[0]);
	    }

	    /**
	     * Get bounding client rect of given element
	     * @method
	     * @memberof Popper.Utils
	     * @param {HTMLElement} element
	     * @return {Object} client rect
	     */
	    function getBoundingClientRect(element) {
	        var isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
	        var rect = void 0;

	        // IE10 10 FIX: Please, don't ask, the element isn't
	        // considered in DOM in some circumstances...
	        // This isn't reproducible in IE10 compatibility mode of IE11
	        if (isIE10) {
	            try {
	                rect = element.getBoundingClientRect();
	            } catch (err) {
	                rect = {};
	            }
	        } else {
	            rect = element.getBoundingClientRect();
	        }

	        var result = {
	            left: rect.left,
	            top: rect.top,
	            right: rect.right,
	            bottom: rect.bottom,
	            width: rect.right - rect.left,
	            height: rect.bottom - rect.top
	        };

	        // IE10 FIX: `getBoundingClientRect`, when executed on `documentElement`
	        // will not take in account the `scrollTop` and `scrollLeft`
	        if (element.nodeName === 'HTML' && isIE10) {
	            var _window$document$docu = window.document.documentElement,
	                scrollTop = _window$document$docu.scrollTop,
	                scrollLeft = _window$document$docu.scrollLeft;

	            result.top -= scrollTop;
	            result.bottom -= scrollTop;
	            result.left -= scrollLeft;
	            result.right -= scrollLeft;
	        }

	        // subtract scrollbar size from sizes
	        var horizScrollbar = rect.width - (element.clientWidth || rect.right - rect.left);
	        var vertScrollbar = rect.height - (element.clientHeight || rect.bottom - rect.top);

	        // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	        // we make this check conditional for performance reasons
	        if (horizScrollbar || vertScrollbar) {
	            var styles = getStyleComputedProperty(element);
	            horizScrollbar -= getBordersSize(styles, 'x');
	            vertScrollbar -= getBordersSize(styles, 'y');
	        }

	        result.right -= horizScrollbar;
	        result.width -= horizScrollbar;
	        result.bottom -= vertScrollbar;
	        result.height -= vertScrollbar;

	        return result;
	    }

	    function getScroll(element) {
	        var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	        var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	        var nodeName = element.nodeName;

	        if (nodeName === 'BODY' || nodeName === 'HTML') {
	            var html = window.document.documentElement;
	            var scrollingElement = window.document.scrollingElement || html;
	            return scrollingElement[upperSide];
	        }

	        return element[upperSide];
	    }

	    /*
	     * Sum or subtract the element scroll values (left and top) from a given rect object
	     * @method
	     * @memberof Popper.Utils
	     * @param {Object} rect - Rect object you want to change
	     * @param {HTMLElement} element - The element from the function reads the scroll values
	     * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	     * @return {Object} rect - The modifier rect object
	     */
	    function includeScroll(rect, element) {
	        var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        var scrollTop = getScroll(element, 'top');
	        var scrollLeft = getScroll(element, 'left');
	        var modifier = subtract ? -1 : 1;
	        rect.top += scrollTop * modifier;
	        rect.bottom += scrollTop * modifier;
	        rect.left += scrollLeft * modifier;
	        rect.right += scrollLeft * modifier;
	        return rect;
	    }

	    /**
	     * Given an element and one of its parents, return the offset
	     * @method
	     * @memberof Popper.Utils
	     * @param {HTMLElement} element
	     * @param {HTMLElement} parent
	     * @return {Object} rect
	     */
	    function getOffsetRectRelativeToCustomParent(element, parent) {
	        var fixed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	        var transformed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        var scrollParent = getScrollParent(parent);
	        var elementRect = getBoundingClientRect(element);
	        var parentRect = getBoundingClientRect(parent);

	        var rect = {
	            top: elementRect.top - parentRect.top,
	            left: elementRect.left - parentRect.left,
	            bottom: elementRect.top - parentRect.top + elementRect.height,
	            right: elementRect.left - parentRect.left + elementRect.width,
	            width: elementRect.width,
	            height: elementRect.height
	        };

	        if (fixed && !transformed) {
	            rect = includeScroll(rect, scrollParent, true);
	        }
	        // When a popper doesn't have any positioned or scrollable parents, `offsetParent.contains(scrollParent)`
	        // will return a "false positive". This is happening because `getOffsetParent` returns `html` node,
	        // and `scrollParent` is the `body` node. Hence the additional check.
	        else if (getOffsetParent(element).contains(scrollParent) && scrollParent.nodeName !== 'BODY') {
	                rect = includeScroll(rect, parent);
	            }

	        // subtract borderTopWidth and borderTopWidth from final result
	        var styles = getStyleComputedProperty(parent);
	        var borderTopWidth = Number(styles.borderTopWidth.split('px')[0]);
	        var borderLeftWidth = Number(styles.borderLeftWidth.split('px')[0]);

	        rect.top -= borderTopWidth;
	        rect.bottom -= borderTopWidth;
	        rect.left -= borderLeftWidth;
	        rect.right -= borderLeftWidth;

	        return rect;
	    }

	    function getWindowSizes() {
	        var body = window.document.body;
	        var html = window.document.documentElement;
	        return {
	            height: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
	            width: Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
	        };
	    }

	    /**
	     * Get the position of the given element, relative to its offset parent
	     * @method
	     * @memberof Popper.Utils
	     * @param {Element} element
	     * @return {Object} position - Coordinates of the element and its `scrollTop`
	     */
	    function getOffsetRect(element) {
	        var elementRect = void 0;
	        if (element.nodeName === 'HTML') {
	            var _getWindowSizes = getWindowSizes(),
	                width = _getWindowSizes.width,
	                height = _getWindowSizes.height;

	            elementRect = {
	                width: width,
	                height: height,
	                left: 0,
	                top: 0
	            };
	        } else {
	            elementRect = {
	                width: element.offsetWidth,
	                height: element.offsetHeight,
	                left: element.offsetLeft,
	                top: element.offsetTop
	            };
	        }

	        elementRect.right = elementRect.left + elementRect.width;
	        elementRect.bottom = elementRect.top + elementRect.height;

	        // position
	        return elementRect;
	    }

	    function getOffsetRectRelativeToViewport(element) {
	        // Offset relative to offsetParent
	        var relativeOffset = getOffsetRect(element);

	        if (element.nodeName !== 'HTML') {
	            var offsetParent = getOffsetParent(element);
	            var parentOffset = getOffsetRectRelativeToViewport(offsetParent);
	            var offset = {
	                width: relativeOffset.offsetWidth,
	                height: relativeOffset.offsetHeight,
	                left: relativeOffset.left + parentOffset.left,
	                top: relativeOffset.top + parentOffset.top,
	                right: relativeOffset.right - parentOffset.right,
	                bottom: relativeOffset.bottom - parentOffset.bottom
	            };
	            return offset;
	        }

	        return relativeOffset;
	    }

	    function getTotalScroll(element) {
	        var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	        var scrollParent = getScrollParent(element);
	        var scroll = getScroll(scrollParent, side);

	        if (['BODY', 'HTML'].indexOf(scrollParent.nodeName) === -1) {
	            return scroll + getTotalScroll(getParentNode(scrollParent), side);
	        }
	        return scroll;
	    }

	    /**
	     * Computed the boundaries limits and return them
	     * @method
	     * @memberof Popper.Utils
	     * @param {Object} data - Object containing the property "offsets" generated by `_getOffsets`
	     * @param {Number} padding - Boundaries padding
	     * @param {Element} boundariesElement - Element used to define the boundaries
	     * @returns {Object} Coordinates of the boundaries
	     */
	    function getBoundaries(popper, padding, boundariesElement) {
	        // NOTE: 1 DOM access here
	        var boundaries = { top: 0, left: 0 };
	        var offsetParent = getOffsetParent(popper);

	        // Handle viewport case
	        if (boundariesElement === 'viewport') {
	            var _getOffsetRectRelativ = getOffsetRectRelativeToViewport(offsetParent),
	                left = _getOffsetRectRelativ.left,
	                top = _getOffsetRectRelativ.top;

	            var _window$document$docu = window.document.documentElement,
	                width = _window$document$docu.clientWidth,
	                height = _window$document$docu.clientHeight;

	            if (getPosition(popper) === 'fixed') {
	                boundaries.right = width;
	                boundaries.bottom = height;
	            } else {
	                var scrollLeft = getTotalScroll(popper, 'left');
	                var scrollTop = getTotalScroll(popper, 'top');

	                boundaries = {
	                    top: 0 - top,
	                    right: width - left + scrollLeft,
	                    bottom: height - top + scrollTop,
	                    left: 0 - left
	                };
	            }
	        }
	        // Handle other cases based on DOM element used as boundaries
	        else {
	                var boundariesNode = void 0;
	                if (boundariesElement === 'scrollParent') {
	                    boundariesNode = getScrollParent(getParentNode(popper));
	                } else if (boundariesElement === 'window') {
	                    boundariesNode = window.document.body;
	                } else {
	                    boundariesNode = boundariesElement;
	                }

	                // In case of BODY, we need a different computation
	                if (boundariesNode.nodeName === 'BODY') {
	                    var _getWindowSizes = getWindowSizes(),
	                        _height = _getWindowSizes.height,
	                        _width = _getWindowSizes.width;

	                    boundaries.right = _width;
	                    boundaries.bottom = _height;
	                }
	                // for all the other DOM elements, this one is good
	                else {
	                        boundaries = getOffsetRectRelativeToCustomParent(boundariesNode, offsetParent, isFixed(popper));
	                    }
	            }

	        // Add paddings
	        boundaries.left += padding;
	        boundaries.top += padding;
	        boundaries.right -= padding;
	        boundaries.bottom -= padding;

	        return boundaries;
	    }

	    /**
	     * Utility used to transform the `auto` placement to the placement with more
	     * available space.
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function computeAutoPlacement(placement, refRect, popper) {
	        if (placement.indexOf('auto') === -1) {
	            return placement;
	        }

	        var boundaries = getBoundaries(popper, 0, 'scrollParent');

	        var sides = {
	            top: refRect.top - boundaries.top,
	            right: boundaries.right - refRect.right,
	            bottom: boundaries.bottom - refRect.bottom,
	            left: refRect.left - boundaries.left
	        };

	        var computedPlacement = Object.keys(sides).sort(function (a, b) {
	            return sides[b] - sides[a];
	        })[0];
	        var variation = placement.split('-')[1];

	        return computedPlacement + (variation ? '-' + variation : '');
	    }

	    var nativeHints = ['native code', '[object MutationObserverConstructor]' // for mobile safari iOS 9.0
	    ];

	    /**
	     * Determine if a function is implemented natively (as opposed to a polyfill).
	     * @argument {Function | undefined} fn the function to check
	     * @returns {boolean}
	     */
	    var isNative = function isNative(fn) {
	        return nativeHints.some(function (hint) {
	            return (fn || '').toString().indexOf(hint) > -1;
	        });
	    };

	    var isBrowser = typeof window !== 'undefined';
	    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	    var timeoutDuration = 0;
	    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	            timeoutDuration = 1;
	            break;
	        }
	    }

	    function microtaskDebounce(fn) {
	        var scheduled = false;
	        var i = 0;
	        var elem = document.createElement('span');

	        // MutationObserver provides a mechanism for scheduling microtasks, which
	        // are scheduled *before* the next task. This gives us a way to debounce
	        // a function but ensure it's called *before* the next paint.
	        var observer = new MutationObserver(function () {
	            fn();
	            scheduled = false;
	        });

	        observer.observe(elem, { attributes: true });

	        return function () {
	            if (!scheduled) {
	                scheduled = true;
	                elem.setAttribute('x-index', i);
	                i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
	            }
	        };
	    }

	    function taskDebounce(fn) {
	        var scheduled = false;
	        return function () {
	            if (!scheduled) {
	                scheduled = true;
	                setTimeout(function () {
	                    scheduled = false;
	                    fn();
	                }, timeoutDuration);
	            }
	        };
	    }

	    // It's common for MutationObserver polyfills to be seen in the wild, however
	    // these rely on Mutation Events which only occur when an element is connected
	    // to the DOM. The algorithm used in this module does not use a connected element,
	    // and so we must ensure that a *native* MutationObserver is available.
	    var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

	    /**
	    * Create a debounced version of a method, that's asynchronously deferred
	    * but called in the minimum time possible.
	    *
	    * @method
	    * @memberof Popper.Utils
	    * @argument {Function} fn
	    * @returns {Function}
	    */
	    var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

	    /**
	     * Mimics the `find` method of Array
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Array} arr
	     * @argument prop
	     * @argument value
	     * @returns index or -1
	     */
	    function find(arr, check) {
	        // use native find if supported
	        if (Array.prototype.find) {
	            return arr.find(check);
	        }

	        // use `filter` to obtain the same behavior of `find`
	        return arr.filter(check)[0];
	    }

	    /**
	     * Return the index of the matching object
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Array} arr
	     * @argument prop
	     * @argument value
	     * @returns index or -1
	     */
	    function findIndex(arr, prop, value) {
	        // use native findIndex if supported
	        if (Array.prototype.findIndex) {
	            return arr.findIndex(function (cur) {
	                return cur[prop] === value;
	            });
	        }

	        // use `find` + `indexOf` if `findIndex` isn't supported
	        var match = find(arr, function (obj) {
	            return obj[prop] === value;
	        });
	        return arr.indexOf(match);
	    }

	    var classCallCheck = function classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    };

	    var createClass = function () {
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

	    var defineProperty = function defineProperty(obj, key, value) {
	        if (key in obj) {
	            Object.defineProperty(obj, key, {
	                value: value,
	                enumerable: true,
	                configurable: true,
	                writable: true
	            });
	        } else {
	            obj[key] = value;
	        }

	        return obj;
	    };

	    var _extends = Object.assign || function (target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];

	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }

	        return target;
	    };

	    /**
	     * Given the popper offsets, generate an output similar to getBoundingClientRect
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Object} popperOffsets
	     * @returns {Object} ClientRect like output
	     */
	    function getClientRect(popperOffsets) {
	        return _extends({}, popperOffsets, {
	            right: popperOffsets.left + popperOffsets.width,
	            bottom: popperOffsets.top + popperOffsets.height
	        });
	    }

	    /**
	     * Get the outer sizes of the given element (offset size + margins)
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element
	     * @returns {Object} object containing width and height properties
	     */
	    function getOuterSizes(element) {
	        var styles = window.getComputedStyle(element);
	        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	        var result = {
	            width: element.offsetWidth + y,
	            height: element.offsetHeight + x
	        };
	        return result;
	    }

	    /**
	     * Get the opposite placement of the given one/
	     * @method
	     * @memberof Popper.Utils
	     * @argument {String} placement
	     * @returns {String} flipped placement
	     */
	    function getOppositePlacement(placement) {
	        var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	        return placement.replace(/left|right|bottom|top/g, function (matched) {
	            return hash[matched];
	        });
	    }

	    /**
	     * Get offsets to the popper
	     * @method
	     * @memberof Popper.Utils
	     * @param {Object} position - CSS position the Popper will get applied
	     * @param {HTMLElement} popper - the popper element
	     * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	     * @param {String} placement - one of the valid placement options
	     * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	     */
	    function getPopperOffsets(position, popper, referenceOffsets, placement) {
	        placement = placement.split('-')[0];

	        // Get popper node sizes
	        var popperRect = getOuterSizes(popper);

	        // Add position, width and height to our offsets object
	        var popperOffsets = {
	            position: position,
	            width: popperRect.width,
	            height: popperRect.height
	        };

	        // depending by the popper placement we have to compute its offsets slightly differently
	        var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	        var mainSide = isHoriz ? 'top' : 'left';
	        var secondarySide = isHoriz ? 'left' : 'top';
	        var measurement = isHoriz ? 'height' : 'width';
	        var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	        popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	        if (placement === secondarySide) {
	            popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	        } else {
	            popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	        }

	        return popperOffsets;
	    }

	    /**
	     * Get offsets to the reference element
	     * @method
	     * @memberof Popper.Utils
	     * @param {Object} state
	     * @param {Element} popper - the popper element
	     * @param {Element} reference - the reference element (the popper will be relative to this)
	     * @returns {Object} An object containing the offsets which will be applied to the popper
	     */
	    function getReferenceOffsets(state, popper, reference) {
	        var isParentFixed = state.position === 'fixed';
	        var isParentTransformed = state.isParentTransformed;
	        var offsetParent = getOffsetParent(isParentFixed && isParentTransformed ? reference : popper);

	        return getOffsetRectRelativeToCustomParent(reference, offsetParent, isParentFixed, isParentTransformed);
	    }

	    /**
	     * Get the prefixed supported property name
	     * @method
	     * @memberof Popper.Utils
	     * @argument {String} property (camelCase)
	     * @returns {String} prefixed property (camelCase)
	     */
	    function getSupportedPropertyName(property) {
	        var prefixes = [false, 'ms', 'webkit', 'moz', 'o'];
	        var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	        for (var i = 0; i < prefixes.length - 1; i++) {
	            var prefix = prefixes[i];
	            var toCheck = prefix ? '' + prefix + upperProp : property;
	            if (typeof window.document.body.style[toCheck] !== 'undefined') {
	                return toCheck;
	            }
	        }
	        return null;
	    }

	    /**
	     * Check if the given variable is a function
	     * @method
	     * @memberof Popper.Utils
	     * @argument {*} functionToCheck - variable to check
	     * @returns {Boolean} answer to: is a function?
	     */
	    function isFunction(functionToCheck) {
	        var getType = {};
	        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	    }

	    /**
	     * Helper used to know if the given modifier is enabled.
	     * @method
	     * @memberof Popper.Utils
	     * @returns {Boolean}
	     */
	    function isModifierEnabled(modifiers, modifierName) {
	        return modifiers.some(function (_ref) {
	            var name = _ref.name,
	                enabled = _ref.enabled;
	            return enabled && name === modifierName;
	        });
	    }

	    /**
	     * Helper used to know if the given modifier depends from another one.
	     * It checks if the needed modifier is listed and enabled.
	     * @method
	     * @memberof Popper.Utils
	     * @param {Array} modifiers - list of modifiers
	     * @param {String} requestingName - name of requesting modifier
	     * @param {String} requestedName - name of requested modifier
	     * @returns {Boolean}
	     */
	    function isModifierRequired(modifiers, requestingName, requestedName) {
	        var requesting = find(modifiers, function (_ref) {
	            var name = _ref.name;
	            return name === requestingName;
	        });

	        return !!requesting && modifiers.some(function (modifier) {
	            return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	        });
	    }

	    /**
	     * Tells if a given input is a number
	     * @method
	     * @memberof Popper.Utils
	     * @param {*} input to check
	     * @return {Boolean}
	     */
	    function isNumeric(n) {
	        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	    }

	    /**
	     * Check if the given element has transforms applied to itself or a parent
	     * @method
	     * @memberof Popper.Utils
	     * @param  {Element} element
	     * @return {Boolean} answer to "isTransformed?"
	     */
	    function isTransformed(element) {
	        if (element.nodeName === 'BODY') {
	            return false;
	        }
	        if (getStyleComputedProperty(element, 'transform') !== 'none') {
	            return true;
	        }
	        return getParentNode(element) ? isTransformed(getParentNode(element)) : element;
	    }

	    /**
	     * Remove event listeners used to update the popper position
	     * @method
	     * @memberof Popper.Utils
	     * @private
	     */
	    function removeEventListeners(reference, state) {
	        // Remove resize event listener on window
	        window.removeEventListener('resize', state.updateBound);

	        // Remove scroll event listener on scroll parents
	        state.scrollParents.forEach(function (target) {
	            target.removeEventListener('scroll', state.updateBound);
	        });

	        // Reset state
	        state.updateBound = null;
	        state.scrollParents = [];
	        state.scrollElement = null;
	        state.eventsEnabled = false;
	        return state;
	    }

	    /**
	     * Loop trough the list of modifiers and run them in order, each of them will then edit the data object
	     * @method
	     * @memberof Popper.Utils
	     * @param {Object} data
	     * @param {Array} modifiers
	     * @param {Function} ends
	     */
	    function runModifiers(modifiers, data, ends) {
	        var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	        modifiersToRun.forEach(function (modifier) {
	            if (modifier.enabled && isFunction(modifier.function)) {
	                data = modifier.function(data, modifier);
	            }
	        });

	        return data;
	    }

	    /**
	     * Set the attributes to the given popper
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element - Element to apply the attributes to
	     * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
	     */
	    function setAttributes(element, attributes) {
	        Object.keys(attributes).forEach(function (prop) {
	            var value = attributes[prop];
	            if (value !== false) {
	                element.setAttribute(prop, attributes[prop]);
	            } else {
	                element.removeAttribute(prop);
	            }
	        });
	    }

	    /**
	     * Set the style to the given popper
	     * @method
	     * @memberof Popper.Utils
	     * @argument {Element} element - Element to apply the style to
	     * @argument {Object} styles - Object with a list of properties and values which will be applied to the element
	     */
	    function setStyles(element, styles) {
	        Object.keys(styles).forEach(function (prop) {
	            var unit = '';
	            // add unit if the value is numeric and is one of the following
	            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	                unit = 'px';
	            }
	            element.style[prop] = styles[prop] + unit;
	        });
	    }

	    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	        var isBody = scrollParent.nodeName === 'BODY';
	        var target = isBody ? window : scrollParent;
	        target.addEventListener(event, callback, { passive: true });

	        if (!isBody) {
	            attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	        }
	        scrollParents.push(target);
	    }

	    /**
	     * Setup needed event listeners used to update the popper position
	     * @method
	     * @memberof Popper.Utils
	     * @private
	     */
	    function setupEventListeners(reference, options, state, updateBound) {
	        // Resize event listener on window
	        state.updateBound = updateBound;
	        window.addEventListener('resize', state.updateBound, { passive: true });

	        // Scroll event listener on scroll parents
	        var scrollElement = getScrollParent(reference);
	        attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	        state.scrollElement = scrollElement;
	        state.eventsEnabled = true;

	        return state;
	    }

	    /** @namespace Popper.Utils */
	    var Utils = {
	        computeAutoPlacement: computeAutoPlacement,
	        debounce: debounce,
	        findIndex: findIndex,
	        getBordersSize: getBordersSize,
	        getBoundaries: getBoundaries,
	        getBoundingClientRect: getBoundingClientRect,
	        getClientRect: getClientRect,
	        getOffsetParent: getOffsetParent,
	        getOffsetRect: getOffsetRect,
	        getOffsetRectRelativeToCustomParent: getOffsetRectRelativeToCustomParent,
	        getOuterSizes: getOuterSizes,
	        getParentNode: getParentNode,
	        getPopperOffsets: getPopperOffsets,
	        getPosition: getPosition,
	        getReferenceOffsets: getReferenceOffsets,
	        getScroll: getScroll,
	        getScrollParent: getScrollParent,
	        getStyleComputedProperty: getStyleComputedProperty,
	        getSupportedPropertyName: getSupportedPropertyName,
	        getTotalScroll: getTotalScroll,
	        getWindowSizes: getWindowSizes,
	        includeScroll: includeScroll,
	        isFixed: isFixed,
	        isFunction: isFunction,
	        isModifierEnabled: isModifierEnabled,
	        isModifierRequired: isModifierRequired,
	        isNative: isNative,
	        isNumeric: isNumeric,
	        isTransformed: isTransformed,
	        removeEventListeners: removeEventListeners,
	        runModifiers: runModifiers,
	        setAttributes: setAttributes,
	        setStyles: setStyles,
	        setupEventListeners: setupEventListeners
	    };

	    /**
	     * Apply the computed styles to the popper element
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @argument {Object} data.styles - List of style properties - values to apply to popper element
	     * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The same data object
	     */
	    function applyStyle(data, options) {
	        // apply the final offsets to the popper
	        // NOTE: 1 DOM access here
	        var styles = {
	            position: data.offsets.popper.position
	        };

	        var attributes = {
	            'x-placement': data.placement
	        };

	        // round top and left to avoid blurry text
	        var left = Math.round(data.offsets.popper.left);
	        var top = Math.round(data.offsets.popper.top);

	        // if gpuAcceleration is set to true and transform is supported,
	        //  we use `translate3d` to apply the position to the popper we
	        // automatically use the supported prefixed version if needed
	        var prefixedProperty = getSupportedPropertyName('transform');
	        if (options.gpuAcceleration && prefixedProperty) {
	            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	            styles.top = 0;
	            styles.left = 0;
	            styles.willChange = 'transform';
	        }
	        // othwerise, we use the standard `left` and `top` properties
	        else {
	                styles.left = left;
	                styles.top = top;
	                styles.willChange = 'top, left';
	            }

	        // any property present in `data.styles` will be applied to the popper,
	        // in this way we can make the 3rd party modifiers add custom styles to it
	        // Be aware, modifiers could override the properties defined in the previous
	        // lines of this modifier!
	        setStyles(data.instance.popper, _extends({}, styles, data.styles));

	        // any property present in `data.attributes` will be applied to the popper,
	        // they will be set as HTML attributes of the element
	        setAttributes(data.instance.popper, _extends({}, attributes, data.attributes));

	        // if the arrow style has been computed, apply the arrow style
	        if (data.offsets.arrow) {
	            setStyles(data.arrowElement, data.offsets.arrow);
	        }

	        return data;
	    }

	    /**
	     * Set the x-placement attribute before everything else because it could be used to add margins to the popper
	     * margins needs to be calculated to get the correct popper offsets
	     * @method
	     * @memberof Popper.modifiers
	     * @param {HTMLElement} reference - The reference element used to position the popper
	     * @param {HTMLElement} popper - The HTML element used as popper.
	     * @param {Object} options - Popper.js options
	     */
	    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	        // compute reference element offsets
	        var referenceOffsets = getReferenceOffsets(state, popper, reference);

	        // compute auto placement, store placement inside the data object,
	        // modifiers will be able to edit `placement` if needed
	        // and refer to originalPlacement to know the original value
	        options.placement = computeAutoPlacement(options.placement, referenceOffsets, popper);

	        popper.setAttribute('x-placement', options.placement);
	        return options;
	    }

	    /**
	     * Modifier used to move the arrowElements on the edge of the popper to make sure them are always between the popper and the reference element
	     * It will use the CSS outer size of the arrowElement element to know how many pixels of conjuction are needed
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function arrow(data, options) {
	        // arrow depends on keepTogether in order to work
	        if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	            console.warn('WARNING: `keepTogether` modifier is required by arrow modifier in order to work, be sure to include it before `arrow`!');
	            return data;
	        }

	        var arrowElement = options.element;

	        // if arrowElement is a string, suppose it's a CSS selector
	        if (typeof arrowElement === 'string') {
	            arrowElement = data.instance.popper.querySelector(arrowElement);

	            // if arrowElement is not found, don't run the modifier
	            if (!arrowElement) {
	                return data;
	            }
	        } else {
	            // if the arrowElement isn't a query selector we must check that the
	            // provided DOM node is child of its popper node
	            if (!data.instance.popper.contains(arrowElement)) {
	                console.warn('WARNING: `arrow.element` must be child of its popper element!');
	                return data;
	            }
	        }

	        var placement = data.placement.split('-')[0];
	        var popper = getClientRect(data.offsets.popper);
	        var reference = data.offsets.reference;
	        var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	        var len = isVertical ? 'height' : 'width';
	        var side = isVertical ? 'top' : 'left';
	        var altSide = isVertical ? 'left' : 'top';
	        var opSide = isVertical ? 'bottom' : 'right';
	        var arrowElementSize = getOuterSizes(arrowElement)[len];

	        //
	        // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
	        //

	        // top/left side
	        if (reference[opSide] - arrowElementSize < popper[side]) {
	            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	        }
	        // bottom/right side
	        if (reference[side] + arrowElementSize > popper[opSide]) {
	            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	        }

	        // compute center of the popper
	        var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	        // Compute the sideValue using the updated popper offsets
	        var sideValue = center - getClientRect(data.offsets.popper)[side];

	        // prevent arrowElement from being placed not contiguously to its popper
	        sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	        data.arrowElement = arrowElement;
	        data.offsets.arrow = {};
	        data.offsets.arrow[side] = sideValue;
	        data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

	        return data;
	    }

	    /**
	     * Get the opposite placement variation of the given one/
	     * @method
	     * @memberof Popper.Utils
	     * @argument {String} placement variation
	     * @returns {String} flipped placement variation
	     */
	    function getOppositeVariation(variation) {
	        if (variation === 'end') {
	            return 'start';
	        } else if (variation === 'start') {
	            return 'end';
	        }
	        return variation;
	    }

	    /**
	     * Modifier used to flip the placement of the popper when the latter is starting overlapping its reference element.
	     * Requires the `preventOverflow` modifier before it in order to work.
	     * **NOTE:** data.instance modifier will run all its previous modifiers everytime it tries to flip the popper!
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function flip(data, options) {
	        // if `inner` modifier is enabled, we can't use the `flip` modifier
	        if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	            return data;
	        }

	        if (data.flipped && data.placement === data.originalPlacement) {
	            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	            return data;
	        }

	        var boundaries = getBoundaries(data.instance.popper, options.padding, options.boundariesElement);

	        var placement = data.placement.split('-')[0];
	        var placementOpposite = getOppositePlacement(placement);
	        var variation = data.placement.split('-')[1] || '';

	        var flipOrder = [];

	        if (options.behavior === 'flip') {
	            flipOrder = [placement, placementOpposite];
	        } else {
	            flipOrder = options.behavior;
	        }

	        flipOrder.forEach(function (step, index) {
	            if (placement !== step || flipOrder.length === index + 1) {
	                return data;
	            }

	            placement = data.placement.split('-')[0];
	            placementOpposite = getOppositePlacement(placement);

	            var popperOffsets = getClientRect(data.offsets.popper);
	            var refOffsets = data.offsets.reference;

	            // using floor because the reference offsets may contain decimals we are not going to consider here
	            var floor = Math.floor;
	            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	            // flip the variation if required
	            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	            if (overlapsRef || overflowsBoundaries || flippedVariation) {
	                // this boolean to detect any flip loop
	                data.flipped = true;

	                if (overlapsRef || overflowsBoundaries) {
	                    placement = flipOrder[index + 1];
	                }

	                if (flippedVariation) {
	                    variation = getOppositeVariation(variation);
	                }

	                data.placement = placement + (variation ? '-' + variation : '');
	                data.offsets.popper = getPopperOffsets(data.instance.state.position, data.instance.popper, data.offsets.reference, data.placement);

	                data = runModifiers(data.instance.modifiers, data, 'flip');
	            }
	        });
	        return data;
	    }

	    /**
	     * Modifier used to make sure the popper is always near its reference element
	     * It cares only about the first axis, you can still have poppers with margin
	     * between the popper and its reference element.
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function keepTogether(data) {
	        var popper = getClientRect(data.offsets.popper);
	        var reference = data.offsets.reference;
	        var placement = data.placement.split('-')[0];
	        var floor = Math.floor;
	        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	        var side = isVertical ? 'right' : 'bottom';
	        var opSide = isVertical ? 'left' : 'top';
	        var measurement = isVertical ? 'width' : 'height';

	        if (popper[side] < floor(reference[opSide])) {
	            data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	        }
	        if (popper[opSide] > floor(reference[side])) {
	            data.offsets.popper[opSide] = floor(reference[side]);
	        }

	        return data;
	    }

	    /**
	     * Modifier used to add an offset to the popper, useful if you more granularity positioning your popper.
	     * The offsets will shift the popper on the side of its reference element.
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @argument {Number|String} options.offset=0
	     *      Basic usage allows a number used to nudge the popper by the given amount of pixels.
	     *      You can pass a percentage value as string (eg. `20%`) to nudge by the given percentage (relative to reference element size)
	     *      Other supported units are `vh` and `vw` (relative to viewport)
	     *      Additionally, you can pass a pair of values (eg. `10 20` or `2vh 20%`) to nudge the popper
	     *      on both axis.
	     *      A note about percentage values, if you want to refer a percentage to the popper size instead of the reference element size,
	     *      use `%p` instead of `%` (eg: `20%p`). To make it clearer, you can replace `%` with `%r` and use eg.`10%p 25%r`.
	     *      > **Heads up!** The order of the axis is relative to the popper placement: `bottom` or `top` are `X,Y`, the other are `Y,X`
	     * @returns {Object} The data object, properly modified
	     */
	    function offset(data, options) {
	        var placement = data.placement;
	        var popper = data.offsets.popper;

	        var offsets = void 0;
	        if (isNumeric(options.offset)) {
	            offsets = [options.offset, 0];
	        } else {
	            // split the offset in case we are providing a pair of offsets separated
	            // by a blank space
	            offsets = options.offset.split(' ');

	            // itherate through each offset to compute them in case they are percentages
	            offsets = offsets.map(function (offset, index) {
	                // separate value from unit
	                var split = offset.match(/(\d*\.?\d*)(.*)/);
	                var value = +split[1];
	                var unit = split[2];

	                // use height if placement is left or right and index is 0 otherwise use width
	                // in this way the first offset will use an axis and the second one
	                // will use the other one
	                var useHeight = placement.indexOf('right') !== -1 || placement.indexOf('left') !== -1;

	                if (index === 1) {
	                    useHeight = !useHeight;
	                }

	                var measurement = useHeight ? 'height' : 'width';

	                // if is a percentage relative to the popper (%p), we calculate the value of it using
	                // as base the sizes of the popper
	                // if is a percentage (% or %r), we calculate the value of it using as base the
	                // sizes of the reference element
	                if (unit.indexOf('%') === 0) {
	                    var element = void 0;
	                    switch (unit) {
	                        case '%p':
	                            element = data.offsets.popper;
	                            break;
	                        case '%':
	                        case '$r':
	                        default:
	                            element = data.offsets.reference;
	                    }

	                    var rect = getClientRect(element);
	                    var len = rect[measurement];
	                    return len / 100 * value;
	                }
	                // if is a vh or vw, we calculate the size based on the viewport
	                else if (unit === 'vh' || unit === 'vw') {
	                        var size = void 0;
	                        if (unit === 'vh') {
	                            size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	                        } else {
	                            size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	                        }
	                        return size / 100 * value;
	                    }
	                    // if is an explicit pixel unit, we get rid of the unit and keep the value
	                    else if (unit === 'px') {
	                            return +value;
	                        }
	                        // if is an implicit unit, it's px, and we return just the value
	                        else {
	                                return +offset;
	                            }
	            });
	        }

	        if (data.placement.indexOf('left') !== -1) {
	            popper.top += offsets[0];
	            popper.left -= offsets[1] || 0;
	        } else if (data.placement.indexOf('right') !== -1) {
	            popper.top += offsets[0];
	            popper.left += offsets[1] || 0;
	        } else if (data.placement.indexOf('top') !== -1) {
	            popper.left += offsets[0];
	            popper.top -= offsets[1] || 0;
	        } else if (data.placement.indexOf('bottom') !== -1) {
	            popper.left += offsets[0];
	            popper.top += offsets[1] || 0;
	        }
	        return data;
	    }

	    /**
	     * Modifier used to prevent the popper from being positioned outside the boundary.
	     *
	     * An scenario exists where the reference itself is not within the boundaries. We can
	     * say it has "escaped the boundaries" — or just "escaped". In this case we need to
	     * decide whether the popper should either:
	     *
	     * - detach from the reference and remain "trapped" in the boundaries, or
	     * - if it should be ignore the boundary and "escape with the reference"
	     *
	     * When `escapeWithReference` is `true`, and reference is completely outside the
	     * boundaries, the popper will overflow (or completely leave) the boundaries in order
	     * to remain attached to the edge of the reference.
	     *
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function preventOverflow(data, options) {
	        var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
	        var boundaries = getBoundaries(data.instance.popper, options.padding, boundariesElement);
	        options.boundaries = boundaries;

	        var order = options.priority;
	        var popper = getClientRect(data.offsets.popper);

	        var check = {
	            primary: function primary(placement) {
	                var value = popper[placement];
	                if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	                    value = Math.max(popper[placement], boundaries[placement]);
	                }
	                return defineProperty({}, placement, value);
	            },
	            secondary: function secondary(placement) {
	                var mainSide = placement === 'right' ? 'left' : 'top';
	                var value = popper[mainSide];
	                if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	                    value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	                }
	                return defineProperty({}, mainSide, value);
	            }
	        };

	        order.forEach(function (placement) {
	            var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	            popper = _extends({}, popper, check[side](placement));
	        });

	        data.offsets.popper = popper;

	        return data;
	    }

	    /**
	     * Modifier used to shift the popper on the start or end of its reference element side
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function shift(data) {
	        var placement = data.placement;
	        var basePlacement = placement.split('-')[0];
	        var shiftvariation = placement.split('-')[1];

	        // if shift shiftvariation is specified, run the modifier
	        if (shiftvariation) {
	            var reference = data.offsets.reference;
	            var popper = getClientRect(data.offsets.popper);
	            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	            var side = isVertical ? 'left' : 'top';
	            var measurement = isVertical ? 'width' : 'height';

	            var shiftOffsets = {
	                start: defineProperty({}, side, reference[side]),
	                end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
	            };

	            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
	        }

	        return data;
	    }

	    /**
	     * Modifier used to hide the popper when its reference element is outside of the
	     * popper boundaries. It will set an x-hidden attribute which can be used to hide
	     * the popper when its reference is out of boundaries.
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by update method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function hide(data) {
	        if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	            console.warn('WARNING: preventOverflow modifier is required by hide modifier in order to work, be sure to include it before hide!');
	            return data;
	        }

	        var refRect = data.offsets.reference;
	        var bound = find(data.instance.modifiers, function (modifier) {
	            return modifier.name === 'preventOverflow';
	        }).boundaries;

	        if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	            // Avoid unnecessary DOM access if visibility hasn't changed
	            if (data.hide === true) {
	                return data;
	            }

	            data.hide = true;
	            data.attributes['x-out-of-boundaries'] = '';
	        } else {
	            // Avoid unnecessary DOM access if visibility hasn't changed
	            if (data.hide === false) {
	                return data;
	            }

	            data.hide = false;
	            data.attributes['x-out-of-boundaries'] = false;
	        }

	        return data;
	    }

	    /**
	     * Modifier used to make the popper flow toward the inner of the reference element.
	     * By default, when this modifier is disabled, the popper will be placed outside
	     * the reference element.
	     * @method
	     * @memberof Modifiers
	     * @argument {Object} data - The data object generated by `update` method
	     * @argument {Object} options - Modifiers configuration and options
	     * @returns {Object} The data object, properly modified
	     */
	    function inner(data) {
	        var placement = data.placement;
	        var basePlacement = placement.split('-')[0];
	        var popper = getClientRect(data.offsets.popper);
	        var reference = getClientRect(data.offsets.reference);
	        var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	        var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	        popper[isHoriz ? 'left' : 'top'] = reference[placement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	        data.placement = getOppositePlacement(placement);
	        data.offsets.popper = getClientRect(popper);

	        return data;
	    }

	    /**
	     * Modifiers are plugins used to alter the behavior of your poppers.
	     * Popper.js uses a set of 7 modifiers to provide all the basic functionalities
	     * needed by the library.
	     *
	     * Each modifier is an object containing several properties listed below.
	     * @namespace Modifiers
	     * @param {Object} modifier - Modifier descriptor
	     * @param {Integer} modifier.order
	     *      The `order` property defines the execution order of the modifiers.
	     *      The built-in modifiers have orders with a gap of 100 units in between,
	     *      this allows you to inject additional modifiers between the existing ones
	     *      without having to redefine the order of all of them.
	     *      The modifiers are executed starting from the one with the lowest order.
	     * @param {Boolean} modifier.enabled - When `true`, the modifier will be used.
	     * @param {Modifiers~modifier} modifier.function - Modifier function.
	     * @param {Modifiers~onLoad} modifier.onLoad - Function executed on popper initalization
	     * @return {Object} data - Each modifier must return the modified `data` object.
	     */
	    var modifiers = {
	        shift: {
	            order: 100,
	            enabled: true,
	            function: shift
	        },
	        offset: {
	            order: 200,
	            enabled: true,
	            function: offset,
	            // nudges popper from its origin by the given amount of pixels (can be negative)
	            offset: 0
	        },
	        preventOverflow: {
	            order: 300,
	            enabled: true,
	            function: preventOverflow,
	            // popper will try to prevent overflow following these priorities
	            //  by default, then, it could overflow on the left and on top of the boundariesElement
	            priority: ['left', 'right', 'top', 'bottom'],
	            // amount of pixel used to define a minimum distance between the boundaries and the popper
	            // this makes sure the popper has always a little padding between the edges of its container
	            padding: 5,
	            boundariesElement: 'scrollParent'
	        },
	        keepTogether: {
	            order: 400,
	            enabled: true,
	            function: keepTogether
	        },
	        arrow: {
	            order: 500,
	            enabled: true,
	            function: arrow,
	            // selector or node used as arrow
	            element: '[x-arrow]'
	        },
	        flip: {
	            order: 600,
	            enabled: true,
	            function: flip,
	            // the behavior used to change the popper's placement
	            behavior: 'flip',
	            // the popper will flip if it hits the edges of the boundariesElement - padding
	            padding: 5,
	            boundariesElement: 'viewport'
	        },
	        inner: {
	            order: 700,
	            enabled: false,
	            function: inner
	        },
	        hide: {
	            order: 800,
	            enabled: true,
	            function: hide
	        },
	        applyStyle: {
	            order: 900,
	            enabled: true,
	            // if true, it uses the CSS 3d transformation to position the popper
	            gpuAcceleration: true,
	            function: applyStyle,
	            onLoad: applyStyleOnLoad
	        }
	    };

	    /**
	     * Modifiers can edit the `data` object to change the beheavior of the popper.
	     * This object contains all the informations used by Popper.js to compute the
	     * popper position.
	     * The modifier can edit the data as needed, and then `return` it as result.
	     *
	     * @callback Modifiers~modifier
	     * @param {dataObject} data
	     * @return {dataObject} modified data
	     */

	    /**
	     * The `dataObject` is an object containing all the informations used by Popper.js
	     * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	     * @name dataObject
	     * @property {Object} data.instance The Popper.js instance
	     * @property {String} data.placement Placement applied to popper
	     * @property {String} data.originalPlacement Placement originally defined on init
	     * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	     * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
	     * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	     * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
	     * @property {Object} data.boundaries Offsets of the popper boundaries
	     * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
	     * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	     * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	     * @property {Object} data.offsets.arro] `top` and `left` offsets, only one of them will be different from 0
	     */

	    // Utils
	    // Modifiers
	    // default options
	    var DEFAULTS = {
	        // placement of the popper
	        placement: 'bottom',

	        // whether events (resize, scroll) are initially enabled
	        eventsEnabled: true,

	        /**
	         * Callback called when the popper is created.
	         * By default, is set to no-op.
	         * Access Popper.js instance with `data.instance`.
	         * @callback createCallback
	         * @static
	         * @param {dataObject} data
	         */
	        onCreate: function onCreate() {},

	        /**
	         * Callback called when the popper is updated, this callback is not called
	         * on the initialization/creation of the popper, but only on subsequent
	         * updates.
	         * By default, is set to no-op.
	         * Access Popper.js instance with `data.instance`.
	         * @callback updateCallback
	         * @static
	         * @param {dataObject} data
	         */
	        onUpdate: function onUpdate() {},

	        // list of functions used to modify the offsets before they are applied to the popper
	        modifiers: modifiers
	    };

	    /**
	     * Create a new Popper.js instance
	     * @class Popper
	     * @param {HTMLElement} reference - The reference element used to position the popper
	     * @param {HTMLElement} popper - The HTML element used as popper.
	     * @param {Object} options
	     * @param {String} options.placement=bottom
	     *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
	     *      left(-start, -end)`
	     *
	     * @param {Boolean} options.eventsEnabled=true
	     *      Whether events (resize, scroll) are initially enabled
	     * @param {Boolean} options.gpuAcceleration=true
	     *      When this property is set to true, the popper position will be applied using CSS3 translate3d, allowing the
	     *      browser to use the GPU to accelerate the rendering.
	     *      If set to false, the popper will be placed using `top` and `left` properties, not using the GPU.
	     *
	     * @param {Boolean} options.removeOnDestroy=false
	     *      Set to true if you want to automatically remove the popper when you call the `destroy` method.
	     *
	     * @param {Object} options.modifiers
	     *      List of functions used to modify the data before they are applied to the popper (see source code for default values)
	     *
	     * @param {Object} options.modifiers.arrow - Arrow modifier configuration
	     * @param {String|HTMLElement} options.modifiers.arrow.element='[x-arrow]'
	     *      The DOM Node used as arrow for the popper, or a CSS selector used to get the DOM node. It must be child of
	     *      its parent Popper. Popper.js will apply to the given element the style required to align the arrow with its
	     *      reference element.
	     *      By default, it will look for a child node of the popper with the `x-arrow` attribute.
	     *
	     * @param {Object} options.modifiers.offset - Offset modifier configuration
	     * @param {Number} options.modifiers.offset.offset=0
	     *      Amount of pixels the popper will be shifted (can be negative).
	     *
	     * @param {Object} options.modifiers.preventOverflow - PreventOverflow modifier configuration
	     * @param {Array} [options.modifiers.preventOverflow.priority=['left', 'right', 'top', 'bottom']]
	     *      Priority used when Popper.js tries to avoid overflows from the boundaries, they will be checked in order,
	     *      this means that the last one will never overflow
	     * @param {String|HTMLElement} options.modifiers.preventOverflow.boundariesElement='scrollParent'
	     *      Boundaries used by the modifier, can be `scrollParent`, `window`, `viewport` or any DOM element.
	     * @param {Number} options.modifiers.preventOverflow.padding=5
	     *      Amount of pixel used to define a minimum distance between the boundaries and the popper
	     *      this makes sure the popper has always a little padding between the edges of its container.
	     *
	     * @param {Object} options.modifiers.flip - Flip modifier configuration
	     * @param {String|Array} options.modifiers.flip.behavior='flip'
	     *      The behavior used by the `flip` modifier to change the placement of the popper when the latter is trying to
	     *      overlap its reference element. Defining `flip` as value, the placement will be flipped on
	     *      its axis (`right - left`, `top - bottom`).
	     *      You can even pass an array of placements (eg: `['right', 'left', 'top']` ) to manually specify
	     *      how alter the placement when a flip is needed. (eg. in the above example, it would first flip from right to left,
	     *      then, if even in its new placement, the popper is overlapping its reference element, it will be moved to top)
	     * @param {String|HTMLElement} options.modifiers.flip.boundariesElement='viewport'
	     *      The element which will define the boundaries of the popper position, the popper will never be placed outside
	     *      of the defined boundaries (except if `keepTogether` is enabled)
	     *
	     * @param {Object} options.modifiers.inner - Inner modifier configuration
	     * @param {Number} options.modifiers.inner.enabled=false
	     *      Set to `true` to make the popper flow toward the inner of the reference element.
	     *
	     * @param {Number} options.modifiers.flip.padding=5
	     *      Amount of pixel used to define a minimum distance between the boundaries and the popper
	     *      this makes sure the popper has always a little padding between the edges of its container.
	     *
	     * @param {createCallback} options.onCreate - onCreate callback
	     *      Function called after the Popper has been instantiated.
	     *
	     * @param {updateCallback} options.onUpdate - onUpdate callback
	     *      Function called on subsequent updates of Popper.
	     *
	     * @return {Object} instance - The generated Popper.js instance
	     */

	    var Popper = function () {
	        function Popper(reference, popper) {
	            var _this = this;

	            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	            classCallCheck(this, Popper);

	            this.scheduleUpdate = function () {
	                return requestAnimationFrame(_this.update);
	            };

	            // make update() debounced, so that it only runs at most once-per-tick
	            this.update = debounce(this.update.bind(this));

	            // with {} we create a new object with the options inside it
	            this.options = _extends({}, Popper.Defaults, options);

	            // init state
	            this.state = {
	                isDestroyed: false,
	                isCreated: false,
	                scrollParents: []
	            };

	            // get reference and popper elements (allow jQuery wrappers)
	            this.reference = reference.jquery ? reference[0] : reference;
	            this.popper = popper.jquery ? popper[0] : popper;

	            // refactoring modifiers' list (Object => Array)
	            this.modifiers = Object.keys(Popper.Defaults.modifiers).map(function (name) {
	                return _extends({ name: name }, Popper.Defaults.modifiers[name]);
	            });

	            // assign default values to modifiers, making sure to override them with
	            // the ones defined by user
	            this.modifiers = this.modifiers.map(function (defaultConfig) {
	                var userConfig = options.modifiers && options.modifiers[defaultConfig.name] || {};
	                return _extends({}, defaultConfig, userConfig);
	            });

	            // add custom modifiers to the modifiers list
	            if (options.modifiers) {
	                this.options.modifiers = _extends({}, Popper.Defaults.modifiers, options.modifiers);
	                Object.keys(options.modifiers).forEach(function (name) {
	                    // take in account only custom modifiers
	                    if (Popper.Defaults.modifiers[name] === undefined) {
	                        var modifier = options.modifiers[name];
	                        modifier.name = name;
	                        _this.modifiers.push(modifier);
	                    }
	                });
	            }

	            // get the popper position type
	            this.state.position = getPosition(this.reference);

	            // sort the modifiers by order
	            this.modifiers = this.modifiers.sort(function (a, b) {
	                return a.order - b.order;
	            });

	            // modifiers have the ability to execute arbitrary code when Popper.js get inited
	            // such code is executed in the same order of its modifier
	            // they could add new properties to their options configuration
	            // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	            this.modifiers.forEach(function (modifierOptions) {
	                if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	                }
	            });

	            // determine how we should set the origin of offsets
	            this.state.isParentTransformed = isTransformed(this.popper.parentNode);

	            // fire the first update to position the popper in the right place
	            this.update();

	            var eventsEnabled = this.options.eventsEnabled;
	            if (eventsEnabled) {
	                // setup event listeners, they will take care of update the position in specific situations
	                this.enableEventListeners();
	            }

	            this.state.eventsEnabled = eventsEnabled;
	        }

	        //
	        // Methods
	        //

	        /**
	         * Updates the position of the popper, computing the new offsets and applying the new style
	         * Prefer `scheduleUpdate` over `update` because of performance reasons
	         * @method
	         * @memberof Popper
	         */

	        createClass(Popper, [{
	            key: 'update',
	            value: function update() {
	                // if popper is destroyed, don't perform any further update
	                if (this.state.isDestroyed) {
	                    return;
	                }

	                var data = {
	                    instance: this,
	                    styles: {},
	                    attributes: {},
	                    flipped: false,
	                    offsets: {}
	                };

	                // make sure to apply the popper position before any computation
	                this.state.position = getPosition(this.reference);
	                setStyles(this.popper, { position: this.state.position });

	                // compute reference element offsets
	                data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

	                // compute auto placement, store placement inside the data object,
	                // modifiers will be able to edit `placement` if needed
	                // and refer to originalPlacement to know the original value
	                data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper);

	                // store the computed placement inside `originalPlacement`
	                data.originalPlacement = this.options.placement;

	                // compute the popper offsets
	                data.offsets.popper = getPopperOffsets(this.state, this.popper, data.offsets.reference, data.placement);

	                // run the modifiers
	                data = runModifiers(this.modifiers, data);

	                // the first `update` will call `onCreate` callback
	                // the other ones will call `onUpdate` callback
	                if (!this.state.isCreated) {
	                    this.state.isCreated = true;
	                    this.options.onCreate(data);
	                } else {
	                    this.options.onUpdate(data);
	                }
	            }

	            /**
	             * Schedule an update, it will run on the next UI update available
	             * @method scheduleUpdate
	             * @memberof Popper
	             */

	        }, {
	            key: 'destroy',

	            /**
	             * Destroy the popper
	             * @method
	             * @memberof Popper
	             */
	            value: function destroy() {
	                this.state.isDestroyed = true;

	                // touch DOM only if `applyStyle` modifier is enabled
	                if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	                    this.popper.removeAttribute('x-placement');
	                    this.popper.style.left = '';
	                    this.popper.style.position = '';
	                    this.popper.style.top = '';
	                    this.popper.style[getSupportedPropertyName('transform')] = '';
	                }

	                this.disableEventListeners();

	                // remove the popper if user explicity asked for the deletion on destroy
	                // do not use `remove` because IE11 doesn't support it
	                if (this.options.removeOnDestroy) {
	                    this.popper.parentNode.removeChild(this.popper);
	                }
	                return this;
	            }

	            /**
	             * it will add resize/scroll events and start recalculating
	             * position of the popper element when they are triggered
	             * @method
	             * @memberof Popper
	             */

	        }, {
	            key: 'enableEventListeners',
	            value: function enableEventListeners() {
	                if (!this.state.eventsEnabled) {
	                    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	                }
	            }

	            /**
	             * it will remove resize/scroll events and won't recalculate
	             * popper position when they are triggered. It also won't trigger onUpdate callback anymore,
	             * unless you call 'update' method manually.
	             * @method
	             * @memberof Popper
	             */

	        }, {
	            key: 'disableEventListeners',
	            value: function disableEventListeners() {
	                if (this.state.eventsEnabled) {
	                    window.cancelAnimationFrame(this.scheduleUpdate);
	                    this.state = removeEventListeners(this.reference, this.state);
	                }
	            }

	            /**
	             * Collection of utilities useful when writing custom modifiers
	             * @memberof Popper
	             */

	            /**
	             * List of accepted placements to use as values of the `placement` option
	             * @memberof Popper
	             */

	            /**
	             * Default Popper.js options
	             * @memberof Popper
	             */

	        }]);
	        return Popper;
	    }();

	    Popper.Utils = Utils;
	    Popper.placements = ['auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
	    Popper.Defaults = DEFAULTS;

	    return Popper;
	});
	//# sourceMappingURL=popper.es5.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright JS Foundation and other contributors <https://js.foundation/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    asyncTag = '[object AsyncFunction]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    nullTag = '[object Null]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    proxyTag = '[object Proxy]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    undefinedTag = '[object Undefined]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Detect free variable `exports`. */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = function () {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}();

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

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
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function (value) {
	    return func(value);
	  };
	}

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function (value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function (arg) {
	    return func(transform(arg));
	  };
	}

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function (value) {
	    result[++index] = value;
	  });
	  return result;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    _Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice,
	    symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols,
	    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
	    nativeKeys = overArg(Object.keys, Object);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

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
	  --this.size;
	  return true;
	}

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
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map || ListCache)(),
	    'string': new Hash()
	  };
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

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
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache();
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

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

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache();
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
	    // Safari 9 has enumerable `arguments.length` in strict mode.
	    key == 'length' ||
	    // Node.js 0.10 has enumerable non-index properties on buffers.
	    isBuff && (key == 'offset' || key == 'parent') ||
	    // PhantomJS 2 has enumerable non-index properties on typed arrays.
	    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
	    // Skip index properties.
	    isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
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

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
	}

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack());
	    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack());
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack());
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
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
	      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
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
	      if (!arraySome(other, function (othValue, othIndex) {
	        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	          return seen.push(othIndex);
	        }
	      })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == other + '';

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
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
	      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function (symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
	  getTag = function getTag(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString:
	          return dataViewTag;
	        case mapCtorString:
	          return mapTag;
	        case promiseCtorString:
	          return promiseTag;
	        case setCtorString:
	          return setTag;
	        case weakMapCtorString:
	          return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

	  return value === proto;
	}

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return func + '';
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
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
	  return value === other || value !== value && other !== other;
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function () {
	  return arguments;
	}()) ? baseIsArguments : function (value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	};

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
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
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
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
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
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
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
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return value != null && (type == 'object' || type == 'function');
	}

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
	  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
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
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

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

	module.exports = isEqual;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(16)(module)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(3);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var Arrow = function Arrow(props, context) {
	  var _props$tag = props.tag,
	      tag = _props$tag === undefined ? 'span' : _props$tag,
	      innerRef = props.innerRef,
	      style = props.style,
	      children = props.children,
	      restProps = _objectWithoutProperties(props, ['tag', 'innerRef', 'style', 'children']);

	  var popper = context.popper;

	  var arrowRef = function arrowRef(node) {
	    return popper.setArrowNode(node);
	  };
	  var arrowStyle = _extends({}, popper.getArrowStyle(), style);

	  if (typeof children === 'function') {
	    return children({ arrowRef: arrowRef, arrowStyle: arrowStyle });
	  }

	  return (0, _react.createElement)(tag, _extends({
	    ref: function ref(node) {
	      arrowRef(node);
	      if (typeof innerRef === 'function') {
	        innerRef(node);
	      }
	    },
	    style: arrowStyle
	  }, restProps), children);
	};

	Arrow.contextTypes = {
	  popper: _propTypes2.default.object.isRequired
	};

	Arrow.propTypes = {
	  tag: _propTypes2.default.string,
	  innerRef: _propTypes2.default.func,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func])
	};

	exports.default = Arrow;

/***/ }
/******/ ])
});
;