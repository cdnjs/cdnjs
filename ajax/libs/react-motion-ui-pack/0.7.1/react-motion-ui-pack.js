(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactMotion"), require("Measure"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactMotion", "Measure"], factory);
	else if(typeof exports === 'object')
		exports["Transition"] = factory(require("React"), require("ReactMotion"), require("Measure"));
	else
		root["Transition"] = factory(root["React"], root["ReactMotion"], root["Measure"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_11__) {
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

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _isElement = __webpack_require__(4);

	var _isElement2 = _interopRequireDefault(_isElement);

	var _cloneStyles = __webpack_require__(5);

	var _cloneStyles2 = _interopRequireDefault(_cloneStyles);

	var _fromRMStyles = __webpack_require__(6);

	var _fromRMStyles2 = _interopRequireDefault(_fromRMStyles);

	var _toRMStyles = __webpack_require__(7);

	var _toRMStyles2 = _interopRequireDefault(_toRMStyles);

	var _configToStyle = __webpack_require__(8);

	var _configToStyle2 = _interopRequireDefault(_configToStyle);

	var _TransitionChild = __webpack_require__(10);

	var _TransitionChild2 = _interopRequireDefault(_TransitionChild);

	var Transition = (function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition() {
	    var _this = this;

	    _classCallCheck(this, Transition);

	    _get(Object.getPrototypeOf(Transition.prototype), 'constructor', this).apply(this, arguments);

	    this._dimensions = {};
	    this._instant = {};

	    this._getDefaultStyles = function () {
	      return _react.Children.map(_this.props.children, function (child) {
	        return child && {
	          key: child.key,
	          data: child,
	          style: _extends({}, _this._onMountStyles())
	        };
	      });
	    };

	    this._getStyles = function () {
	      var _props = _this.props;
	      var children = _props.children;
	      var enter = _props.enter;

	      return _react.Children.map(children, function (child) {
	        if (!child) return;

	        var key = child.key;

	        var childDimensions = _this._dimensions[key];

	        // convert to React Motion friendly structure
	        var childStyles = (0, _toRMStyles2['default'])(enter);

	        if (enter.width && (enter.width === 'auto' || enter.width.val === 'auto')) {
	          var width = childDimensions ? childDimensions.width : 0;

	          // if instant, apply the height directly rather than through RM
	          if (_this._instant[key]) {
	            childStyles.width = width;
	          } else {
	            childStyles.width.val = width;
	          }
	        }

	        if (enter.height && (enter.height === 'auto' || enter.height.val === 'auto')) {
	          var height = childDimensions ? childDimensions.height : 0;

	          // if instant, apply the height directly rather than through RM
	          if (_this._instant[key]) {
	            childStyles.height = height;
	          } else {
	            childStyles.height.val = height;
	          }
	        }

	        if (!key) {
	          console.error('You must provide a key for every child of Transition.');
	        } else {
	          return {
	            key: key,
	            data: child,
	            style: _extends({}, childStyles)
	          };
	        }
	      });
	    };

	    this._willEnter = function (_ref) {
	      var key = _ref.key;
	      var style = _ref.style;
	      var _props2 = _this.props;
	      var appear = _props2.appear;
	      var leave = _props2.leave;
	      var onEnter = _props2.onEnter;

	      var childStyles = (0, _cloneStyles2['default'])(typeof appear === 'object' ? appear : leave);

	      // fire enter callback
	      onEnter(childStyles);

	      return childStyles;
	    };

	    this._willLeave = function (_ref2) {
	      var key = _ref2.key;
	      var style = _ref2.style;
	      var _props3 = _this.props;
	      var leave = _props3.leave;
	      var onLeave = _props3.onLeave;

	      // clean up
	      if (_this._dimensions[key]) {
	        delete _this._dimensions[key];
	      }

	      // fire leaving callback
	      onLeave(style);

	      return (0, _toRMStyles2['default'])(leave);
	    };
	  }

	  _createClass(Transition, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      var _props4 = this.props;
	      var runOnMount = _props4.runOnMount;
	      var onEnter = _props4.onEnter;
	      var children = _props4.children;

	      if (runOnMount) {
	        onEnter(this._onMountStyles());
	      }

	      _react.Children.forEach(children, function (child) {
	        if (!child) return;
	        _this2._instant[child.key] = !runOnMount;
	      });
	    }
	  }, {
	    key: '_onMountStyles',
	    value: function _onMountStyles() {
	      var _props5 = this.props;
	      var runOnMount = _props5.runOnMount;
	      var appear = _props5.appear;
	      var enter = _props5.enter;
	      var leave = _props5.leave;
	      var children = _props5.children;

	      var childStyles = runOnMount ? appear || leave : enter;

	      // convert auto values and map to new object to avoid mutation
	      return (0, _fromRMStyles2['default'])((0, _cloneStyles2['default'])(childStyles));
	    }
	  }, {
	    key: '_storeDimensions',
	    value: function _storeDimensions(key, childDimensions, mutations) {
	      // if any mutations, set child to be instant
	      // this keeps height from animating again if it changes
	      if (mutations) {
	        this._instant[key] = true;
	      }

	      // store child dimensions
	      this._dimensions[key] = childDimensions;

	      // rerender component
	      this.forceUpdate();
	    }
	  }, {
	    key: '_childrenToRender',
	    value: function _childrenToRender(currValues) {
	      var _this3 = this;

	      return currValues.map(function (_ref3) {
	        var key = _ref3.key;
	        var data = _ref3.data;
	        var style = _ref3.style;

	        var child = data;
	        var childStyle = child.props.style;
	        var dimensions = _this3._dimensions[key];

	        // convert styles to a friendly structure
	        style = (0, _configToStyle2['default'])(style);

	        var currHeight = style.height;

	        // if height is being animated we'll want to
	        // ditch it after it's reached its destination
	        if (dimensions && currHeight) {
	          var destHeight = parseFloat(dimensions.height).toFixed(4);

	          style = _extends({}, style, {
	            height: destHeight > 0 && destHeight !== currHeight ? currHeight : ''
	          });
	        }

	        // merge in any styles set by the user
	        // Transition styles will take precedence
	        if (childStyle) {
	          style = _extends({}, childStyle, style);
	        }

	        return (0, _react.createElement)(_TransitionChild2['default'], {
	          key: key,
	          child: child,
	          style: style,
	          dimensions: dimensions,
	          onMeasure: _this3._storeDimensions.bind(_this3, key)
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var _props6 = this.props;
	      var component = _props6.component;

	      var props = _objectWithoutProperties(_props6, ['component']);

	      return _react2['default'].createElement(
	        _reactMotion.TransitionMotion,
	        {
	          defaultStyles: this._getDefaultStyles(),
	          styles: this._getStyles(),
	          willEnter: this._willEnter,
	          willLeave: this._willLeave
	        },
	        function (currValues) {
	          var children = _this4._childrenToRender(currValues);
	          var child = null;

	          if (!component || component === 'false') {
	            if (_react.Children.count(children) === 1) {
	              child = _react.Children.only(children[0]);
	            } else {
	              child = (0, _react.createElement)('span', { style: { display: 'none' } });
	            }
	          } else {
	            child = (0, _react.createElement)(component, props, children);
	          }

	          return child;
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool, _isElement2['default']]),
	      runOnMount: _react.PropTypes.bool,
	      appear: _react.PropTypes.object,
	      enter: _react.PropTypes.object,
	      leave: _react.PropTypes.object,
	      onEnter: _react.PropTypes.func,
	      onLeave: _react.PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'div',
	      runOnMount: true,
	      enter: { opacity: 1 },
	      leave: { opacity: 0 },
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = isElement;

	function isElement(props, propName, componentName) {
	  if (typeof props[propName] !== 'function') {
	    if (isValidElement(props[propName])) {
	      return new Error(ComponentName + ' is not an actual Element');
	    }
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	// spread values to avoid mutation
	// convert any auto values to a start of 0
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = cloneStyles;

	function cloneStyles(style) {
	  var width = style.width;
	  var height = style.height;

	  var newStyle = _extends({}, style);

	  if (width) {
	    if (width.val && width.val === 'auto') {
	      newStyle.width = _extends({}, newStyle.width, { val: 0 });
	    } else if (width === 'auto') {
	      newStyle.width = 0;
	    }
	  }

	  if (height) {
	    if (height.val && height.val === 'auto') {
	      newStyle.height = _extends({}, newStyle.height, { val: 0 });
	    } else if (height === 'auto') {
	      newStyle.height = 0;
	    }
	  }

	  return newStyle;
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = fromRMStyles;

	function fromRMStyles(config) {
	  var values = {};

	  Object.keys(config).forEach(function (key) {
	    var value = config[key];
	    values[key] = !isNaN(value) ? value : value.val;
	  });

	  return values;
	}

	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = toRMStyles;

	var _reactMotion = __webpack_require__(3);

	function toRMStyles(styles) {
	  var rmStyles = {};

	  Object.keys(styles).forEach(function (key) {
	    var style = styles[key];
	    var isObject = typeof style === 'object';

	    // check if user passed their own config
	    // if not default to a regular spring
	    rmStyles[key] = isObject ? _extends({}, style) : (0, _reactMotion.spring)(style);
	  });

	  return rmStyles;
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var TRANSFORM = __webpack_require__(9)('transform');
	var UNIT_TRANSFORMS = ['translateX', 'translateY', 'translateZ', 'transformPerspective'];
	var DEGREE_TRANFORMS = ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scaleZ'];
	var UNITLESS_TRANSFORMS = ['scale', 'scaleX', 'scaleY'];
	var TRANSFORMS = UNIT_TRANSFORMS.concat(DEGREE_TRANFORMS, UNITLESS_TRANSFORMS);

	exports['default'] = function (configs) {
	  var styles = {};

	  Object.keys(configs).map(function (key) {
	    var isTransform = TRANSFORMS.indexOf(key) > -1;
	    var value = Math.round(+configs[key] * 10000) / 10000;

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
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getPrefix;

	function getPrefix(prop) {
	  if (typeof document === 'undefined') return prop;

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMeasure = __webpack_require__(11);

	var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

	if (!_reactMeasure2['default']) {
	  console.error('It looks like React Measure has not been included. Please load this dependency first https://github.com/souporserious/react-measure');
	}

	var TransitionChild = (function (_Component) {
	  _inherits(TransitionChild, _Component);

	  function TransitionChild() {
	    _classCallCheck(this, TransitionChild);

	    _get(Object.getPrototypeOf(TransitionChild.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(TransitionChild, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var onMeasure = _props.onMeasure;
	      var child = _props.child;
	      var style = _props.style;
	      var dimensions = _props.dimensions;

	      return (0, _react.createElement)(_reactMeasure2['default'], {
	        config: {
	          childList: true,
	          subtree: true
	        },
	        accurate: true,
	        whitelist: ['width', 'height'],
	        onMeasure: onMeasure
	      }, (0, _react.cloneElement)(child, { style: style, dimensions: dimensions }));
	    }
	  }]);

	  return TransitionChild;
	})(_react.Component);

	exports['default'] = TransitionChild;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;