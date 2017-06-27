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

	var _Transition = __webpack_require__(1);

	var _Transition2 = _interopRequireDefault(_Transition);

	exports['default'] = { Transition: _Transition2['default'] };
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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	// Need to expand config to style so we can map things
	// like translateY => transform: translateY()
	// as well as take care of prefixing

	var Transition = (function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition() {
	    _classCallCheck(this, Transition);

	    _get(Object.getPrototypeOf(Transition.prototype), 'constructor', this).apply(this, arguments);

	    this.transform = (0, _utils.getVendorPrefix)('transform');
	    this.effect = null;
	  }

	  _createClass(Transition, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this._getEffect();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this._getEffect();
	    }
	  }, {
	    key: 'getEndValues',
	    value: function getEndValues(currValue) {
	      var _props = this.props;
	      var children = _props.children;
	      var appear = _props.appear;
	      var enter = _props.enter;
	      var leave = _props.leave;
	      var registered = _props.registered;

	      var configs = {},
	          config = undefined;

	      if (registered) {
	        enter = this.effect.enter;
	        leave = this.effect.leave;
	      }

	      config = appear && !currValue ? leave : enter;

	      _react.Children.forEach(children, function (child) {
	        configs[child.key] = config;
	      });

	      return configs;
	    }
	  }, {
	    key: 'willEnter',
	    value: function willEnter() {
	      var _props2 = this.props;
	      var leave = _props2.leave;
	      var registered = _props2.registered;

	      return registered ? this.effect.leave : leave;
	    }
	  }, {
	    key: 'willLeave',
	    value: function willLeave(key, endValues, currentValue, currentSpeed) {
	      if (currentValue[key].opacity.val === 0 && currentSpeed[key].opacity.val === 0) {
	        return null;
	      }
	      var _props3 = this.props;
	      var leave = _props3.leave;
	      var registered = _props3.registered;

	      return registered ? this.effect.leave : leave;
	    }
	  }, {
	    key: '_getEffect',
	    value: function _getEffect() {
	      var registered = this.props.registered;

	      if (!registered) return;

	      var effect = Transition.effects[registered];

	      if (!effect) {
	        throw 'Effect not found. Register "' + registered + '" as an effect using Transition.register()';
	      }

	      this.effect = effect;
	    }
	  }, {
	    key: '_configToStyle',
	    value: function _configToStyle(config) {
	      var _this = this;

	      var styles = {};

	      Object.keys(config).map(function (key) {

	        var value = config[key].val;

	        // need a utility to take care of other scenarios
	        // see about moving this outside of render method
	        if (key === 'translateY') {
	          styles[_this.transform] = 'translateY(' + value + 'px)';
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
	        function (configs) {
	          return _react2['default'].createElement(
	            'div',
	            null,
	            _react.Children.map(_this2.props.children, function (child) {

	              var config = configs[child.key];

	              if (!config) {
	                return;
	              }

	              return (0, _react.cloneElement)(child, {
	                style: _this2._configToStyle(config)
	              });
	            })
	          );
	        }
	      );
	    }
	  }], [{
	    key: 'register',
	    value: function register(name, enter, leave) {
	      Transition.effects[name] = {
	        enter: enter,
	        leave: leave
	      };
	    }
	  }, {
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
	      enter: { opacity: { val: 1 } },
	      leave: { opacity: { val: 0 } }
	    },
	    enumerable: true
	  }, {
	    key: 'effects',
	    value: {},
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

/***/ }
/******/ ])
});
;