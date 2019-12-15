/*!
 * react-trend v1.2.4
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Trend"] = factory(require("react"));
	else
		root["Trend"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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

	'use strict';

	exports.__esModule = true;

	var _Trend = __webpack_require__(2);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Trend).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Trend = __webpack_require__(3);

	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Trend).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _jsxFileName = '/Users/joshu/work/react-trend/src/components/Trend/Trend.js';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(5);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _utils = __webpack_require__(12);

	var _DOM = __webpack_require__(13);

	var _math = __webpack_require__(14);

	var _misc = __webpack_require__(15);

	var _Trend = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
	  data: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.shape({
	    value: _propTypes2.default.number
	  })]).isRequired).isRequired,
	  smooth: _propTypes2.default.bool,
	  autoDraw: _propTypes2.default.bool,
	  autoDrawDuration: _propTypes2.default.number,
	  autoDrawEasing: _propTypes2.default.string,
	  width: _propTypes2.default.number,
	  height: _propTypes2.default.number,
	  padding: _propTypes2.default.number,
	  radius: _propTypes2.default.number,
	  gradient: _propTypes2.default.arrayOf(_propTypes2.default.string)
	};

	var defaultProps = {
	  radius: 10,
	  stroke: 'black',
	  padding: 8,
	  strokeWidth: 1,
	  autoDraw: false,
	  autoDrawDuration: 2000,
	  autoDrawEasing: 'ease'
	};

	var Trend = function (_Component) {
	  _inherits(Trend, _Component);

	  function Trend(props) {
	    _classCallCheck(this, Trend);

	    // Generate a random ID. This is important for distinguishing between
	    // Trend components on a page, so that they can have different keyframe
	    // animations.
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	    _this.trendId = (0, _misc.generateId)();
	    _this.gradientId = 'react-trend-vertical-gradient-' + _this.trendId;
	    return _this;
	  }

	  Trend.prototype.componentDidMount = function componentDidMount() {
	    var _props = this.props,
	        autoDraw = _props.autoDraw,
	        autoDrawDuration = _props.autoDrawDuration,
	        autoDrawEasing = _props.autoDrawEasing;


	    if (autoDraw) {
	      this.lineLength = this.path.getTotalLength();

	      var css = (0, _Trend.generateAutoDrawCss)({
	        id: this.trendId,
	        lineLength: this.lineLength,
	        duration: autoDrawDuration,
	        easing: autoDrawEasing
	      });

	      (0, _DOM.injectStyleTag)(css);
	    }
	  };

	  Trend.prototype.getDelegatedProps = function getDelegatedProps() {
	    return (0, _utils.omit)(this.props, Object.keys(propTypes));
	  };

	  Trend.prototype.renderGradientDefinition = function renderGradientDefinition() {
	    var _this2 = this;

	    var gradient = this.props.gradient;


	    return _react2.default.createElement(
	      'defs',
	      {
	        __source: {
	          fileName: _jsxFileName,
	          lineNumber: 80
	        },
	        __self: this
	      },
	      _react2.default.createElement(
	        'linearGradient',
	        {
	          id: this.gradientId,
	          x1: '0%',
	          y1: '0%',
	          x2: '0%',
	          y2: '100%',
	          __source: {
	            fileName: _jsxFileName,
	            lineNumber: 81
	          },
	          __self: this
	        },
	        gradient.slice().reverse().map(function (c, index) {
	          return _react2.default.createElement('stop', {
	            key: index,
	            offset: (0, _math.normalize)({
	              value: index,
	              min: 0,
	              // If we only supply a single colour, it will try to normalize
	              // between 0 and 0, which will create NaN. By making the `max`
	              // at least 1, we ensure single-color "gradients" work.
	              max: gradient.length - 1 || 1
	            }),
	            stopColor: c,
	            __source: {
	              fileName: _jsxFileName,
	              lineNumber: 89
	            },
	            __self: _this2
	          });
	        })
	      )
	    );
	  };

	  Trend.prototype.render = function render() {
	    var _this3 = this;

	    var _props2 = this.props,
	        data = _props2.data,
	        smooth = _props2.smooth,
	        width = _props2.width,
	        height = _props2.height,
	        padding = _props2.padding,
	        radius = _props2.radius,
	        gradient = _props2.gradient;

	    // We need at least 2 points to draw a graph.

	    if (!data || data.length < 2) {
	      return null;
	    }

	    // `data` can either be an array of numbers:
	    // [1, 2, 3]
	    // or, an array of objects containing a value:
	    // [ { value: 1 }, { value: 2 }, { value: 3 }]
	    //
	    // For now, we're just going to convert the second form to the first.
	    // Later on, if/when we support tooltips, we may adjust.
	    var plainValues = data.map(function (point) {
	      return typeof point === 'number' ? point : point.value;
	    });

	    // Our viewbox needs to be in absolute units, so we'll default to 300x75
	    // Our SVG can be a %, though; this is what makes it scalable.
	    // By defaulting to percentages, the SVG will grow to fill its parent
	    // container, preserving a 1/4 aspect ratio.
	    var viewBoxWidth = width || 300;
	    var viewBoxHeight = height || 75;
	    var svgWidth = width || '100%';
	    var svgHeight = height || '25%';

	    var normalizedValues = (0, _Trend.normalizeDataset)(plainValues, {
	      minX: padding,
	      maxX: viewBoxWidth - padding,
	      // NOTE: Because SVGs are indexed from the top left, but most data is
	      // indexed from the bottom left, we're inverting the Y min/max.
	      minY: viewBoxHeight - padding,
	      maxY: padding
	    });

	    var path = smooth ? (0, _DOM.buildSmoothPath)(normalizedValues, { radius: radius }) : (0, _DOM.buildLinearPath)(normalizedValues);

	    return _react2.default.createElement(
	      'svg',
	      _extends({
	        width: svgWidth,
	        height: svgHeight,
	        viewBox: '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight
	      }, this.getDelegatedProps(), {
	        __source: {
	          fileName: _jsxFileName,
	          lineNumber: 157
	        },
	        __self: this
	      }),
	      gradient && this.renderGradientDefinition(),
	      _react2.default.createElement('path', {
	        ref: function ref(elem) {
	          _this3.path = elem;
	        },
	        id: 'react-trend-' + this.trendId,
	        d: path,
	        fill: 'none',
	        stroke: gradient ? 'url(#' + this.gradientId + ')' : undefined,
	        __source: {
	          fileName: _jsxFileName,
	          lineNumber: 165
	        },
	        __self: this
	      })
	    );
	  };

	  return Trend;
	}(_react.Component);

	Trend.propTypes = propTypes;
	Trend.defaultProps = defaultProps;

	exports.default = Trend;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	if (true) {
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(6)(isValidElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = require('./factoryWithThrowingShims')();
	}


/***/ },
/* 6 */
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

	var emptyFunction = __webpack_require__(7);
	var invariant = __webpack_require__(8);
	var warning = __webpack_require__(9);

	var ReactPropTypesSecret = __webpack_require__(10);
	var checkPropTypes = __webpack_require__(11);

	module.exports = function(isValidElement, throwOnDirectAccess) {
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
	    if (true) {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (("development") !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
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
	       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
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
	       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
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
	    switch (typeof propValue) {
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
	    var propType = typeof propValue;
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


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
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

	if (true) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(7);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (true) {
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

/***/ },
/* 10 */
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

	if (true) {
	  var invariant = __webpack_require__(8);
	  var warning = __webpack_require__(9);
	  var ReactPropTypesSecret = __webpack_require__(10);
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
	  if (true) {
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
	        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
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


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var range = exports.range = function range(to) {
	  return [].concat(Array(to).keys());
	};

	var pick = exports.pick = function pick(obj, keys) {
	  return keys.reduce(function (acc, key) {
	    var _extends2;

	    return _extends({}, acc, (_extends2 = {}, _extends2[key] = obj[key], _extends2));
	  }, {});
	};

	var omit = exports.omit = function omit(obj, keys) {
	  return Object.keys(obj).reduce(function (acc, key) {
	    var _extends3;

	    if (keys.indexOf(key) !== -1) {
	      return acc;
	    }

	    return _extends({}, acc, (_extends3 = {}, _extends3[key] = obj[key], _extends3));
	  }, {});
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.injectStyleTag = exports.buildSmoothPath = exports.buildLinearPath = undefined;

	var _math = __webpack_require__(14);

	var buildLinearPath = exports.buildLinearPath = function buildLinearPath(data) {
	  return data.reduce(function (path, _ref, index) {
	    var x = _ref.x,
	        y = _ref.y;

	    // The very first instruction needs to be a "move".
	    // The rest will be a "line".
	    var isFirstInstruction = index === 0;
	    var instruction = isFirstInstruction ? 'M' : 'L';

	    return '' + path + instruction + ' ' + x + ',' + y + '\n';
	  }, '');
	};

	var buildSmoothPath = exports.buildSmoothPath = function buildSmoothPath(data, _ref2) {
	  var radius = _ref2.radius;
	  var firstPoint = data[0],
	      otherPoints = data.slice(1);


	  return otherPoints.reduce(function (path, point, index) {
	    var next = otherPoints[index + 1];
	    var prev = otherPoints[index - 1] || firstPoint;

	    var isCollinear = next && (0, _math.checkForCollinearPoints)(prev, point, next);

	    if (!next || isCollinear) {
	      // The very last line in the sequence can just be a regular line.
	      return path + '\nL ' + point.x + ',' + point.y;
	    }

	    var distanceFromPrev = (0, _math.getDistanceBetween)(prev, point);
	    var distanceFromNext = (0, _math.getDistanceBetween)(next, point);
	    var threshold = Math.min(distanceFromPrev, distanceFromNext);

	    var isTooCloseForRadius = threshold / 2 < radius;

	    var radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;

	    var before = (0, _math.moveTo)(prev, point, radiusForPoint);
	    var after = (0, _math.moveTo)(next, point, radiusForPoint);

	    return [path, 'L ' + before.x + ',' + before.y, 'S ' + point.x + ',' + point.y + ' ' + after.x + ',' + after.y].join('\n');
	  }, 'M ' + firstPoint.x + ',' + firstPoint.y);
	};

	// Taken from Khan Academy's Aphrodite
	// https://github.com/Khan/aphrodite/blob/master/src/inject.js
	var styleTag = void 0;
	var injectStyleTag = exports.injectStyleTag = function injectStyleTag(cssContents) {
	  if (styleTag == null) {
	    // Try to find a style tag with the `data-react-trend` attribute first.
	    styleTag = document.querySelector('style[data-react-trend]');

	    // If that doesn't work, generate a new style tag.
	    if (styleTag == null) {
	      // Taken from
	      // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
	      var head = document.head || document.getElementsByTagName('head')[0];
	      styleTag = document.createElement('style');

	      styleTag.type = 'text/css';
	      styleTag.setAttribute('data-react-trend', '');
	      head.appendChild(styleTag);
	    }
	  }

	  styleTag.appendChild(document.createTextNode(cssContents));
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/* eslint-disable no-restricted-properties */

	/** normalize
	 * This lets us translate a value from one scale to another.
	 *
	 * @param {Number} value - Our initial value to translate
	 * @param {Number} min - the current minimum value possible
	 * @param {Number} max - the current maximum value possible
	 * @param {Number} scaleMin - the min value of the scale we're translating to
	 * @param {Number} scaleMax - the max value of the scale we're translating to
	 *
	 * @returns {Number} the value on its new scale
	 */
	var normalize = exports.normalize = function normalize(_ref) {
	  var value = _ref.value,
	      min = _ref.min,
	      max = _ref.max,
	      _ref$scaleMin = _ref.scaleMin,
	      scaleMin = _ref$scaleMin === undefined ? 0 : _ref$scaleMin,
	      _ref$scaleMax = _ref.scaleMax,
	      scaleMax = _ref$scaleMax === undefined ? 1 : _ref$scaleMax;

	  // If the `min` and `max` are the same value, it means our dataset is flat.
	  // For now, let's assume that flat data should be aligned to the bottom.
	  if (min === max) {
	    return scaleMin;
	  }

	  return scaleMin + (value - min) * (scaleMax - scaleMin) / (max - min);
	};

	/** moveTo
	 * the coordinate that lies at a midpoint between 2 lines, based on the radius
	 *
	 * @param {Object} to - Our initial point
	 * @param {Number} to.x - The x value of our initial point
	 * @param {Number} to.y - The y value of our initial point
	 * @param {Object} from - Our final point
	 * @param {Number} from.x - The x value of our final point
	 * @param {Number} from.y - The y value of our final point
	 * @param {Number} radius - The distance away from the final point
	 *
	 * @returns {Object} an object holding the x/y coordinates of the midpoint.
	 */
	var moveTo = exports.moveTo = function moveTo(to, from, radius) {
	  var vector = { x: to.x - from.x, y: to.y - from.y };
	  var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	  var unitVector = { x: vector.x / length, y: vector.y / length };

	  return {
	    x: from.x + unitVector.x * radius,
	    y: from.y + unitVector.y * radius
	  };
	};

	/** getDistanceBetween
	 * Simple formula derived from pythagoras to calculate the distance between
	 * 2 points on a plane.
	 *
	 * @param {Object} p1 - Our initial point
	 * @param {Number} p1.x - The x value of our initial point
	 * @param {Number} p1.y - The y value of our initial point
	 * @param {Object} p2 - Our final point
	 * @param {Number} p2.x - The x value of our final point
	 * @param {Number} p2.y - The y value of our final point
	 *
	 * @returns {Number} the distance between the points.
	 */
	var getDistanceBetween = exports.getDistanceBetween = function getDistanceBetween(p1, p2) {
	  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	};

	/** checkForCollinearPoints
	 * Figure out if the midpoint fits perfectly on a line between the two others.
	 *
	 * @param {Object} p1 - Our initial point
	 * @param {Number} p1.x - The x value of our initial point
	 * @param {Number} p1.y - The y value of our initial point
	 * @param {Object} p2 - Our mid-point
	 * @param {Number} p2.x - The x value of our mid-point
	 * @param {Number} p2.y - The y value of our mid-point
	 * @param {Object} p3 - Our final point
	 * @param {Number} p3.x - The x value of our final point
	 * @param {Number} p3.y - The y value of our final point

	 * @returns {Boolean} whether or not p2 sits on the line between p1 and p3.
	 */
	var checkForCollinearPoints = exports.checkForCollinearPoints = function checkForCollinearPoints(p1, p2, p3) {
	  return (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	// eslint-disable-next-line no-restricted-properties
	var generateId = exports.generateId = function generateId() {
	  return Math.round(Math.random() * Math.pow(10, 16));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.generateAutoDrawCss = exports.normalizeDataset = undefined;

	var _math = __webpack_require__(14);

	var normalizeDataset = exports.normalizeDataset = function normalizeDataset(data, _ref) {
	  var minX = _ref.minX,
	      maxX = _ref.maxX,
	      minY = _ref.minY,
	      maxY = _ref.maxY;

	  // For the X axis, we want to normalize it based on its index in the array.
	  // For the Y axis, we want to normalize it based on the element's value.
	  //
	  // X axis is easy: just evenly-space each item in the array.
	  // For the Y axis, we first need to find the min and max of our array,
	  // and then normalize those values between 0 and 1.
	  var boundariesX = { min: 0, max: data.length - 1 };
	  var boundariesY = { min: Math.min.apply(Math, data), max: Math.max.apply(Math, data) };

	  var normalizedData = data.map(function (point, index) {
	    return {
	      x: (0, _math.normalize)({
	        value: index,
	        min: boundariesX.min,
	        max: boundariesX.max,
	        scaleMin: minX,
	        scaleMax: maxX
	      }),
	      y: (0, _math.normalize)({
	        value: point,
	        min: boundariesY.min,
	        max: boundariesY.max,
	        scaleMin: minY,
	        scaleMax: maxY
	      })
	    };
	  });

	  // According to the SVG spec, paths with a height/width of `0` can't have
	  // linear gradients applied. This means that our lines are invisible when
	  // the dataset is flat (eg. [0, 0, 0, 0]).
	  //
	  // The hacky solution is to apply a very slight offset to the first point of
	  // the dataset. As ugly as it is, it's the best solution we can find (there
	  // are ways within the SVG spec of changing it, but not without causing
	  // breaking changes).
	  if (boundariesY.min === boundariesY.max) {
	    // eslint-disable-next-line no-param-reassign
	    normalizedData[0].y += 0.0001;
	  }

	  return normalizedData;
	};

	var generateAutoDrawCss = exports.generateAutoDrawCss = function generateAutoDrawCss(_ref2) {
	  var id = _ref2.id,
	      lineLength = _ref2.lineLength,
	      duration = _ref2.duration,
	      easing = _ref2.easing;

	  // We do the animation using the dash array/offset trick
	  // https://css-tricks.com/svg-line-animation-works/
	  var autodrawKeyframeAnimation = '\n    @keyframes react-trend-autodraw-' + id + ' {\n      0% {\n        stroke-dasharray: ' + lineLength + ';\n        stroke-dashoffset: ' + lineLength + '\n      }\n      100% {\n        stroke-dasharray: ' + lineLength + ';\n        stroke-dashoffset: 0;\n      }\n      100% {\n        stroke-dashoffset: \'\';\n        stroke-dasharray: \'\';\n      }\n    }\n  ';

	  // One unfortunate side-effect of the auto-draw is that the line is
	  // actually 1 big dash, the same length as the line itself. If the
	  // line length changes (eg. radius change, new data), that dash won't
	  // be the same length anymore. We can fix that by removing those
	  // properties once the auto-draw is completed.
	  var cleanupKeyframeAnimation = '\n    @keyframes react-trend-autodraw-cleanup-' + id + ' {\n      to {\n        stroke-dasharray: \'\';\n        stroke-dashoffset: \'\';\n      }\n    }\n  ';

	  return '\n    ' + autodrawKeyframeAnimation + '\n\n    ' + cleanupKeyframeAnimation + '\n\n    #react-trend-' + id + ' {\n      animation:\n        react-trend-autodraw-' + id + ' ' + duration + 'ms ' + easing + ',\n        react-trend-autodraw-cleanup-' + id + ' 1ms ' + duration + 'ms\n      ;\n    }\n  ';
	};

/***/ }
/******/ ])
});
;