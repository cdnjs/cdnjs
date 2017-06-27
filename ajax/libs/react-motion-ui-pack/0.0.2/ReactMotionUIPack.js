(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("TransitionSpring"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "TransitionSpring"], factory);
	else if(typeof exports === 'object')
		exports["ReactMotionUIPack"] = factory(require("React"), require("TransitionSpring"));
	else
		root["ReactMotionUIPack"] = factory(root["React"], root["TransitionSpring"]);
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

	var _transitionsSlideUpIn = __webpack_require__(1);

	var _transitionsSlideUpIn2 = _interopRequireDefault(_transitionsSlideUpIn);

	exports['default'] = { SlideUpIn: _transitionsSlideUpIn2['default'] };
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	var SlideUpIn = (function (_Component) {
	  function SlideUpIn() {
	    _classCallCheck(this, SlideUpIn);

	    _get(Object.getPrototypeOf(SlideUpIn.prototype), 'constructor', this).apply(this, arguments);

	    this.transform = (0, _utils.getVendorPrefix)('transform');
	  }

	  _inherits(SlideUpIn, _Component);

	  _createClass(SlideUpIn, [{
	    key: 'getEndValues',
	    value: function getEndValues(currValue) {

	      var translateYValue = this.props.appear && !currValue ? this.props.translateY : 0;
	      var opacityValue = this.props.appear && !currValue ? 0 : 1;
	      var configs = {};

	      _react.Children.forEach(this.props.children, function (child) {
	        configs[child.key] = {
	          translateY: { val: translateYValue },
	          opacity: { val: opacityValue }
	        };
	      });

	      return configs;
	    }
	  }, {
	    key: 'willEnter',
	    value: function willEnter() {
	      return {
	        translateY: { val: this.props.translateY },
	        opacity: { val: 0 }
	      };
	    }
	  }, {
	    key: 'willLeave',
	    value: function willLeave(key, endValues, currentValue, currentSpeed) {
	      if (currentValue[key].opacity.val === 0 && currentSpeed[key].opacity.val === 0) {
	        return null; // kill component when opacity reaches 0
	      }
	      return {
	        translateY: { val: this.props.translateY },
	        opacity: { val: 0 }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      return _react2['default'].createElement(
	        _reactMotion.TransitionSpring,
	        {
	          endValue: this.getEndValues.bind(this),
	          willEnter: this.willEnter.bind(this),
	          willLeave: this.willLeave.bind(this)
	        },
	        function (currValue) {
	          return _react.Children.map(_this.props.children, function (child) {
	            var _style;

	            if (!currValue[child.key]) {
	              return;
	            }
	            return (0, _react.cloneElement)(child, {
	              style: (_style = {}, _defineProperty(_style, _this.transform, 'translateY(' + currValue[child.key].translateY.val + 'px)'), _defineProperty(_style, 'opacity', currValue[child.key].opacity.val), _style)
	            });
	          });
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      appear: _react.PropTypes.bool,
	      translateY: _react.PropTypes.number
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      appear: true,
	      translateY: 25
	    },
	    enumerable: true
	  }]);

	  return SlideUpIn;
	})(_react.Component);

	exports['default'] = SlideUpIn;
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

/***/ }
/******/ ])
});
;