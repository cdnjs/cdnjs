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

	var _uiPack = __webpack_require__(9);

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

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMotion = __webpack_require__(3);

	var _reactMeasure = __webpack_require__(4);

	var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

	var _getVendorPrefix = __webpack_require__(8);

	var _getVendorPrefix2 = _interopRequireDefault(_getVendorPrefix);

	var UNIT_TRANSFORMS = ['translateX', 'translateY', 'translateZ', 'transformPerspective'];
	var DEGREE_TRANFORMS = ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'scaleZ'];
	var UNITLESS_TRANSFORMS = ['scale', 'scaleX', 'scaleY'];
	var TRANSFORMS = UNIT_TRANSFORMS.concat(DEGREE_TRANFORMS, UNITLESS_TRANSFORMS);

	var registeredComponents = [];

	// force rerender on window resize so we can grab dimensions again
	window.addEventListener('resize', function () {
	  registeredComponents.forEach(function (c) {
	    return c._forceUpdate();
	  });
	});

	var Transition = (function (_Component) {
	  _inherits(Transition, _Component);

	  function Transition() {
	    var _this = this;

	    _classCallCheck(this, Transition);

	    _get(Object.getPrototypeOf(Transition.prototype), 'constructor', this).apply(this, arguments);

	    this._transform = (0, _getVendorPrefix2['default'])('transform');
	    this._cachedDimensions = {};

	    this._forceUpdate = function () {
	      _this.forceUpdate();
	    };

	    this._getEndValues = function (currValues) {
	      var _props = _this.props;
	      var children = _props.children;
	      var appear = _props.appear;
	      var enter = _props.enter;
	      var leave = _props.leave;

	      var configs = {};
	      var dest = appear && !currValues ? leave : enter;

	      _react.Children.forEach(children, function (child) {
	        if (!child) return;
	        var dimensions = _this._cachedDimensions[child.key];
	        var currDest = _extends({}, dest);

	        if (dimensions) {
	          if (currDest.height && dest.height.val === 'auto') {
	            currDest.height = { val: dimensions.height || 0 };
	          }
	          if (currDest.width && dest.width.val === 'auto') {
	            currDest.width = { val: dimensions.width || 0 };
	          }
	        }

	        configs[child.key] = {
	          component: child,
	          dest: currDest
	        };
	      });
	      return configs;
	    };

	    this._willTransition = function (key, value, endValue, currentValue, currentSpeed) {
	      var leave = _this.props.leave;

	      return _extends({}, value, {
	        dest: leave
	      });
	    };
	  }

	  _createClass(Transition, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // store registered components
	      registeredComponents.push(this);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var pos = registeredComponents.indexOf(this);
	      if (pos > -1) {
	        registeredComponents.splice(pos, 1);
	      }
	    }
	  }, {
	    key: '_configToStyle',
	    value: function _configToStyle(config) {
	      var _this2 = this;

	      var styles = {};

	      Object.keys(config).map(function (key) {
	        var isTransform = TRANSFORMS.indexOf(key) > -1;
	        var value = config[key].val;

	        if (isTransform) {
	          var transformProps = styles[_this2._transform] || '';

	          if (UNIT_TRANSFORMS.indexOf(key) > -1) {
	            transformProps += key + '(' + value + 'px) ';
	          } else if (DEGREE_TRANFORMS.indexOf(key) > -1) {
	            transformProps += key + '(' + value + 'deg) ';
	          } else if (UNITLESS_TRANSFORMS.indexOf(key) > -1) {
	            transformProps += key + '(' + value + ') ';
	          }
	          styles[_this2._transform] = transformProps;
	        } else {
	          styles[key] = value;
	        }
	      });

	      return styles;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var childrenToRender = function childrenToRender(currValues) {
	        return Object.keys(currValues).map(function (key) {
	          var currValue = currValues[key];
	          var component = currValue.component;
	          var dest = currValue.dest;

	          return _react2['default'].createElement(
	            _reactMeasure2['default'],
	            { key: key },
	            function (dimensions) {
	              _this3._cachedDimensions[component.key] = dimensions;
	              return (0, _react.cloneElement)(component, {
	                style: _this3._configToStyle(dest),
	                dimensions: dimensions
	              });
	            }
	          );
	        });
	      };

	      return _react2['default'].createElement(
	        _reactMotion.TransitionSpring,
	        {
	          endValue: this._getEndValues,
	          willEnter: this._willTransition,
	          willLeave: this._willTransition
	        },
	        function (currValues) {
	          return _react2['default'].createElement(_this3.props.component, _this3.props, childrenToRender(currValues));
	        }
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      component: _react.PropTypes.string,
	      appear: _react.PropTypes.bool,
	      //appear: PropTypes.object, // todo
	      enter: _react.PropTypes.object,
	      leave: _react.PropTypes.object
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      component: 'span',
	      appear: true,
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _Measure = __webpack_require__(5);

	var _Measure2 = _interopRequireDefault(_Measure);

	exports['default'] = _Measure2['default'];
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	var _get = function get(_x, _x2, _x3) {
	  var _again = true;_function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
	      }
	    } else if ('value' in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;if (getter === undefined) {
	        return undefined;
	      }return getter.call(receiver);
	    }
	  }
	};

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== 'function' && superClass !== null) {
	    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _throttle = __webpack_require__(6);

	var _throttle2 = _interopRequireDefault(_throttle);

	var _debounce = __webpack_require__(7);

	var _debounce2 = _interopRequireDefault(_debounce);

	var registeredComponents = [];

	// force rerender on window resize so we can grab dimensions again
	window.addEventListener('resize', function () {
	  registeredComponents.forEach(function (c) {
	    return c._forceMeasure();
	  });
	});

	var Measure = (function (_Component) {
	  _inherits(Measure, _Component);

	  function Measure() {
	    var _this = this;

	    _classCallCheck(this, Measure);

	    _get(Object.getPrototypeOf(Measure.prototype), 'constructor', this).apply(this, arguments);

	    this.state = {
	      width: null,
	      height: null,
	      top: null,
	      right: null,
	      bottom: null,
	      left: null
	    };
	    this._node = null;
	    this._nodeCopy = null;
	    this._nodeParent = null;
	    this._copyAppended = false;

	    this._forceMeasure = function () {
	      _this.forceUpdate();
	    };
	  }

	  _createClass(Measure, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this._removeClone = (0, _debounce2['default'])(this._removeClone, 300);
	      this._forceMeasure = (0, _throttle2['default'])(this._forceMeasure, 300);
	      this._setMeasure = (0, _throttle2['default'])(this._setMeasure, 300);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._node = _react2['default'].findDOMNode(this);
	      this._parentNode = this._node.parentNode;
	      this.setState(this._measure(this._node));

	      // store registered components
	      registeredComponents.push(this);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var dimensions = this._measure(this._node);

	      // we can use JSON stringify to compare objects since they are simple structures
	      // used to determine if we need to update our state with new dimensions or not
	      if (JSON.stringify(prevState) !== JSON.stringify(dimensions)) {
	        this._setMeasure(dimensions);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var pos = registeredComponents.indexOf(this);
	      if (pos > -1) {
	        registeredComponents.splice(pos, 1);
	      }
	    }
	  }, {
	    key: '_setMeasure',
	    value: function _setMeasure(dimensions) {
	      this.setState(dimensions);
	    }
	  }, {
	    key: '_measure',
	    value: function _measure(node) {
	      var dimensions = undefined;

	      if (!this._copyAppended) {
	        var context = document.createElement('div');
	        var copy = node.cloneNode(true);

	        // give the node some context to measure off of
	        // height and overflow prevent scrollbars from copy
	        context.style.height = 0;
	        context.style.position = 'relative';
	        context.style.overflow = 'hidden';
	        //copy.style.transform = 'translateY(-100%)';

	        // remove name from all children inputs so they don't conflict with current ones
	        var inputNodes = copy.querySelectorAll('input');
	        for (var i = inputNodes.length; i--;) {
	          inputNodes[i].setAttribute('name', '');
	        }

	        // remove copy and children react id's so it doesn't conflict with current ones
	        var reactNodes = copy.querySelectorAll('[data-reactid]');
	        copy.setAttribute('data-reactid', '');
	        for (var j = reactNodes.length; j--;) {
	          reactNodes[j].setAttribute('data-reactid', '');
	        }

	        // set props to hide copy and get true dimensions
	        copy.style.boxSizing = 'border-box';
	        copy.style.height = 'auto';
	        copy.style.width = '100%';
	        copy.style.position = 'absolute';
	        copy.style.visibility = 'hidden';

	        // append copy to context
	        context.appendChild(copy);

	        // append context to DOM so we can measure
	        this._parentNode.appendChild(context);
	        this._copyAppended = true;

	        // store node so we can calculate on it and remove it later
	        this._nodeCopy = copy;
	      }

	      // grab dimensions of node
	      dimensions = this._nodeCopy.getBoundingClientRect();

	      // remove the copy after getting it's height
	      this._removeClone();

	      return {
	        width: dimensions.width,
	        height: dimensions.height,
	        top: dimensions.top,
	        right: dimensions.right,
	        bottom: dimensions.bottom,
	        left: dimensions.left
	      };
	    }
	  }, {
	    key: '_removeClone',
	    value: function _removeClone() {
	      // we remove the parentNode because we added it earlier to measure it in the correct context
	      this._parentNode.removeChild(this._nodeCopy.parentNode);
	      this._copyAppended = false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react.Children.only(this.props.children(this.state));
	    }
	  }]);

	  return Measure;
	})(_react.Component);

	exports['default'] = Measure;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = _throttle;

	function _throttle(fn, threshhold, scope) {
	  if (threshhold === undefined) threshhold = 250;

	  threshhold || (threshhold = 250);
	  var last = undefined,
	      deferTimer = undefined;
	  return function () {
	    var context = scope || this;
	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = _debounce;

	function _debounce(fn) {
	  var delay = arguments.length <= 1 || arguments[1] === undefined ? 250 : arguments[1];

	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getVendorPrefix;

	function getVendorPrefix(prop) {
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
/* 9 */
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