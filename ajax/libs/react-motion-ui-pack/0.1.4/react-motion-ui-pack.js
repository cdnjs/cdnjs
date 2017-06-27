(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactMotion"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactMotion"], factory);
	else if(typeof exports === 'object')
		exports["ReactMotionUIPack"] = factory(require("React"), require("ReactMotion"));
	else
		root["ReactMotionUIPack"] = factory(root["React"], root["ReactMotion"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	var _uiPack = __webpack_require__(5);

	var _uiPack2 = _interopRequireDefault(_uiPack);

	exports.Transition = _Transition2['default'];
	exports.UIPack = _uiPack2['default'];

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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	var CSS = {
	  transforms: ['translateX', 'translateY', 'scale', 'scaleX', 'scaleY', 'skewX', 'skewY', 'rotate', 'rotateX', 'rotateY'],
	  transforms3D: ['transformPerspective', 'translateZ', 'scaleZ', 'rotateZ']
	};

	// could check for < IE10 support and only include non 3d transforms
	var TRANSFORMS = CSS.transforms.concat(CSS.transforms3D);

	var Transition = (function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition() {
	    _classCallCheck(this, Transition);

	    _get(Object.getPrototypeOf(Transition.prototype), 'constructor', this).apply(this, arguments);

	    this.transform = (0, _utils.getVendorPrefix)('transform');
	  }

	  _createClass(Transition, [{
	    key: 'getEndValues',
	    value: function getEndValues(currValue) {
	      var _props = this.props;
	      var children = _props.children;
	      var appear = _props.appear;
	      var enter = _props.enter;
	      var leave = _props.leave;
	      var registered = _props.registered;

	      var configs = {},
	          dest = undefined;

	      dest = appear && !currValue ? leave : enter;

	      _react.Children.forEach(children, function (component) {

	        // if we are returning null, bail out
	        // this is useful for transitioning from
	        // nothing to something
	        if (!component) return;

	        configs[component.key] = {
	          component: component,
	          dest: dest
	        };
	      });

	      return configs;
	    }
	  }, {
	    key: 'willEnter',
	    value: function willEnter(key, value, endValue, currentValue, currentSpeed) {
	      var leave = this.props.leave;

	      return _extends({}, value, {
	        dest: leave
	      });
	    }
	  }, {
	    key: 'willLeave',
	    value: function willLeave(key, value, endValue, currentValue, currentSpeed) {

	      if (value.dest.opacity.val === 0 && currentSpeed[key].dest.opacity.val === 0) {
	        return null;
	      }

	      var leave = this.props.leave;

	      return _extends({}, value, {
	        dest: leave
	      });
	    }
	  }, {
	    key: '_mapTransforms',
	    value: function _mapTransforms(config) {

	      var style = '';

	      for (var prop in config) {

	        if (!config.hasOwnProperty(prop)) return;

	        for (var i = TRANSFORMS.length; i--;) {

	          var transform = TRANSFORMS[i];

	          if (prop === transform) {

	            var value = config[prop].val;
	            var unit = '';

	            if (prop.indexOf('translate') > -1) {
	              unit = 'px';
	            } else if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) {
	              unit = 'deg';
	            }

	            style += prop + '(' + value + unit + ') ';
	          }
	        }
	      }

	      return style;
	    }
	  }, {
	    key: '_configToStyle',
	    value: function _configToStyle(config) {
	      var _this = this;

	      var styles = {};

	      Object.keys(config).map(function (key) {

	        var transformIndex = TRANSFORMS.indexOf(key);

	        if (transformIndex > -1) {
	          //let transformMatrix = TRANSFORMS[transformIndex];
	          styles[_this.transform] = _this._mapTransforms(config);
	        } else {
	          styles[key] = config[key].val;
	        }
	      });
	      return styles;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return _react2['default'].createElement(
	        _reactMotion.TransitionSpring,
	        {
	          endValue: this.getEndValues.bind(this),
	          willEnter: this.willEnter.bind(this),
	          willLeave: this.willLeave.bind(this)
	        },
	        function (currValues) {
	          return _react2['default'].createElement(
	            'div',
	            null,
	            Object.keys(currValues).map(function (key) {
	              var currValue = currValues[key];
	              return (0, _react.cloneElement)(currValue.component, {
	                style: _this2._configToStyle(currValue.dest)
	              });
	            })
	          );
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      appear: _react.PropTypes.bool,
	      enter: _react.PropTypes.object,
	      leave: _react.PropTypes.object
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      appear: false,
	      enter: {
	        opacity: { val: 1 }
	      },
	      leave: {
	        opacity: { val: 0 }
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
	exports['default'] = {
	  getVendorPrefix: function getVendorPrefix(prop) {

	    var styles = document.createElement('p').style,
	        vendors = ['ms', 'O', 'Moz', 'Webkit'],
	        i;

	    if (styles[prop] === '') return prop;

	    prop = prop.charAt(0).toUpperCase() + prop.slice(1);

	    for (i = vendors.length; i--;) {
	      if (styles[vendors[i] + prop] === '') {
	        return vendors[i] + prop;
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  fadeUpIn: {
	    opacity: { val: 1 },
	    translateY: { val: 0 }
	  },
	  fadeDownOut: {
	    opacity: { val: 0 },
	    translateY: { val: 25 }
	  }
	};
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;