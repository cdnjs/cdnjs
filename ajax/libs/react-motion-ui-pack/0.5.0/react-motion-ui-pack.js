(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactMotion"), require("Measure"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactMotion", "Measure"], factory);
	else if(typeof exports === 'object')
		exports["Transition"] = factory(require("React"), require("ReactMotion"), require("Measure"));
	else
		root["Transition"] = factory(root["React"], root["ReactMotion"], root["Measure"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Transition = __webpack_require__(1);

	var _Transition2 = _interopRequireDefault(_Transition);

	exports['default'] = _Transition2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactLibShallowCompare = __webpack_require__(3);

	var _reactLibShallowCompare2 = _interopRequireDefault(_reactLibShallowCompare);

	var _reactMotion = __webpack_require__(5);

	var _reactMeasure = __webpack_require__(6);

	var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

	var _toRMStyles = __webpack_require__(7);

	var _toRMStyles2 = _interopRequireDefault(_toRMStyles);

	var _fromRMStyles = __webpack_require__(8);

	var _fromRMStyles2 = _interopRequireDefault(_fromRMStyles);

	var _configToStyle = __webpack_require__(9);

	var _configToStyle2 = _interopRequireDefault(_configToStyle);

	// TODOS:
	// - add prop for default styles
	// - make prop appear true/false to show animation on mount
	//   would pass an empty config to tell RM not to drill into it

	var Transition = (function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition() {
	    var _this = this;

	    _classCallCheck(this, Transition);

	    _get(Object.getPrototypeOf(Transition.prototype), 'constructor', this).apply(this, arguments);

	    this._measureWarning = true;
	    this.state = {
	      dimensions: {}
	    };

	    this._getDefaultStyles = function () {
	      var _props = _this.props;
	      var children = _props.children;
	      var runOnMount = _props.runOnMount;
	      var appear = _props.appear;
	      var enter = _props.enter;
	      var leave = _props.leave;

	      var childStyles = enter;
	      var configs = {};

	      if (runOnMount) {
	        childStyles = appear || leave;
	      }

	      // convert auto values and map to new object to avoid mutation
	      childStyles = _this._convertAutoValues(childStyles);

	      _react.Children.forEach(children, function (child) {
	        if (!child) return;
	        configs[child.key] = _extends({
	          child: child
	        }, childStyles);
	      });

	      return configs;
	    };

	    this._getEndStyles = function () {
	      var dimensions = _this.state.dimensions;
	      var _props2 = _this.props;
	      var children = _props2.children;
	      var enter = _props2.enter;

	      var configs = {};

	      // convert to React Motion friendly structure
	      var childStyles = (0, _toRMStyles2['default'])(enter);

	      _react.Children.forEach(children, function (child) {
	        if (!child) return;

	        var childDimensions = dimensions && dimensions[child.key];

	        if (childStyles.height && childStyles.height.val === 'auto') {
	          childStyles.height.val = childDimensions && childDimensions.height || 0;
	        }
	        if (childStyles.width && childStyles.width.val === 'auto') {
	          childStyles.width.val = childDimensions && childDimensions.width || 0;
	        }

	        configs[child.key] = _extends({
	          child: child
	        }, childStyles);
	      });

	      return configs;
	    };

	    this._willEnter = function (key, style, endStyles, currentStyles, currentSpeed) {
	      var _props3 = _this.props;
	      var appear = _props3.appear;
	      var leave = _props3.leave;
	      var onEnter = _props3.onEnter;

	      var flatValues = (0, _fromRMStyles2['default'])(endStyles[key]);
	      var childStyles = typeof appear === 'object' ? appear : leave;

	      // convert auto values and map to new object to avoid mutation
	      childStyles = _this._convertAutoValues(childStyles);

	      // fire entering callback
	      onEnter(flatValues);

	      return _extends({}, style, (0, _toRMStyles2['default'])(childStyles));
	    };

	    this._willLeave = function (key, style, endStyles, currentStyles, currentSpeed) {
	      var _props4 = _this.props;
	      var leave = _props4.leave;
	      var onLeave = _props4.onLeave;

	      var flatValues = (0, _fromRMStyles2['default'])(currentStyles[key]);

	      // clean up dimensions when item leaves
	      delete _this.state.dimensions[key];

	      // fire leaving callback
	      onLeave(flatValues);

	      return _extends({}, style, (0, _toRMStyles2['default'])(leave));
	    };

	    this._storeDimensions = function (key, childDimensions) {
	      var dimensions = _this.state.dimensions;

	      dimensions[key] = childDimensions;
	      _this.setState({ dimensions: dimensions });
	    };

	    this._childrenToRender = function (currValues) {
	      return Object.keys(currValues).map(function (key) {
	        var currValue = currValues[key];
	        var child = currValue.child;

	        var configs = _objectWithoutProperties(currValue, ['child']);

	        var childStyles = child.props.style;
	        var style = (0, _configToStyle2['default'])(configs);
	        var component = null;

	        // merge in styles if they we're set by the user
	        // Transition styles will take precedence
	        if (childStyles) {
	          style = _extends({}, childStyles, style);
	        }

	        // determine whether we need to measure the child or not
	        if (_this._shouldMeasure()) {
	          var onChange = _this._storeDimensions.bind(null, key);

	          component = _react2['default'].createElement(_reactMeasure2['default'], { key: key, clone: true, whitelist: ['width', 'height'], onChange: onChange }, (0, _react.cloneElement)(child, { style: style, dimensions: _this.state.dimensions[key] }));
	        } else {
	          component = (0, _react.cloneElement)(child, { key: key, style: style });
	        }

	        return component;
	      });
	    };
	  }

	  _createClass(Transition, [{
	    key: '_convertAutoValues',

	    // shouldComponentUpdate(nextProps, nextState) {
	    //   return shallowCompare(this, nextProps, nextState)
	    // }

	    // convert auto values to a start of 0
	    value: function _convertAutoValues(style) {
	      var newStyles = _extends({}, style);

	      if (style.height === 'auto') {
	        newStyles.height = 0;
	      }
	      if (style.width === 'auto') {
	        newStyles.width = 0;
	      }

	      return newStyles;
	    }
	  }, {
	    key: '_shouldMeasure',
	    value: function _shouldMeasure() {
	      var _props5 = this.props;
	      var measure = _props5.measure;
	      var enter = _props5.enter;

	      // warn against trying to use auto props without measure enabled
	      if (!measure && this._measureWarning) {
	        if (enter.width === 'auto' || enter.height === 'auto') {
	          console.warn('Warning: "measure" prop needs to be enabled when using auto values https://github.com/souporserious/react-motion-ui-pack#props');
	          this._measureWarning = false;
	        }
	      }

	      return measure;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props6 = this.props;
	      var component = _props6.component;
	      var onlyChild = _props6.onlyChild;
	      var appear = _props6.appear;

	      return _react2['default'].createElement(
	        _reactMotion.TransitionMotion,
	        {
	          defaultStyles: this._getDefaultStyles(),
	          styles: this._getEndStyles(),
	          willEnter: this._willEnter,
	          willLeave: this._willLeave
	        },
	        function (currValues) {
	          var children = _this2._childrenToRender(currValues);
	          var wrapper = null;

	          if (onlyChild) {
	            if (children.length === 1) {
	              wrapper = _react.Children.only(children[0]);
	            } else {
	              wrapper = (0, _react.createElement)(component, { style: { display: 'none' } });
	            }
	          } else {
	            wrapper = (0, _react.createElement)(component, _this2.props, children);
	          }

	          return wrapper;
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      component: _react.PropTypes.string,
	      onlyChild: _react.PropTypes.bool,
	      measure: _react.PropTypes.bool,
	      appear: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
	      enter: _react.PropTypes.object,
	      leave: _react.PropTypes.object,
	      onEnter: _react.PropTypes.func,
	      onLeave: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'div', // define the wrapping tag around the elements you want to transition in/out
	      measure: false, // pass true to use measure and get child dimensions to use with your animations
	      runOnMount: true,
	      enter: {
	        opacity: 1
	      },
	      leave: {
	        opacity: 0
	      },
	      onEnter: function onEnter() {
	        return null;
	      },
	      onLeave: function onLeave() {
	        return null;
	      }
	    },
	    enumerable: true
	  }]);

	  return Transition;
	})(_react.Component);

	exports['default'] = Transition;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule shallowCompare
	*/

	'use strict';

	var shallowEqual = __webpack_require__(4);

	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}

	module.exports = shallowCompare;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
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
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = toRMStyles;

	var _reactMotion = __webpack_require__(5);

	function toRMStyles(styles) {
	  var rmStyles = {};

	  Object.keys(styles).forEach(function (key) {
	    var style = styles[key];
	    var isObject = typeof style === 'object';

	    // check if user passed their own config
	    // if not default to regular spring
	    rmStyles[key] = isObject ? style : (0, _reactMotion.spring)(style);
	  });

	  return rmStyles;
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = fromRMStyles;

	function fromRMStyles(config) {
	  var values = {};

	  Object.keys(config).forEach(function (key) {
	    var value = config[key].val;

	    if (!isNaN(value)) {
	      values[key] = value;
	    }
	  });

	  return values;
	}

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var TRANSFORM = __webpack_require__(10)('transform');
	var UNIT_TRANSFORMS = ['translateX', 'translateY', 'translateZ', 'transformPerspective'];
	var DEGREE_TRANFORMS = ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scaleZ'];
	var UNITLESS_TRANSFORMS = ['scale', 'scaleX', 'scaleY'];
	var TRANSFORMS = UNIT_TRANSFORMS.concat(DEGREE_TRANFORMS, UNITLESS_TRANSFORMS);

	exports['default'] = function (configs) {
	  var styles = {};

	  Object.keys(configs).map(function (key) {
	    var isTransform = TRANSFORMS.indexOf(key) > -1;
	    var value = configs[key];

	    if (isTransform) {
	      var transformProps = styles[TRANSFORM] || '';

	      if (UNIT_TRANSFORMS.indexOf(key) > -1) {
	        transformProps += key + '(' + value + 'px) ';
	      } else if (DEGREE_TRANFORMS.indexOf(key) > -1) {
	        transformProps += key + '(' + value + 'deg) ';
	      } else if (UNITLESS_TRANSFORMS.indexOf(key) > -1) {
	        transformProps += key + '(' + value + ') ';
	      }
	      styles[TRANSFORM] = transformProps;
	    } else {
	      styles[key] = value;
	    }
	  });

	  return styles;
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getVendorPrefix;

	function getVendorPrefix(prop) {
	  if (!document) return prop;

	  var styles = document.createElement('p').style;
	  var vendors = ['ms', 'O', 'Moz', 'Webkit'];

	  if (styles[prop] === '') return prop;

	  prop = prop.charAt(0).toUpperCase() + prop.slice(1);

	  for (var i = vendors.length; i--;) {
	    if (styles[vendors[i] + prop] === '') {
	      return vendors[i] + prop;
	    }
	  }
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;