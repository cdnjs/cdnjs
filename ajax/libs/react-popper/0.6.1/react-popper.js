/*!
 * React Popper 0.6.1
 * https://github.com/souporserious/react-popper
 * Copyright (c) 2017 React Popper Authors
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["ReactPopper"] = factory(require("react"), require("prop-types"));
	else
		root["ReactPopper"] = factory(root["React"], root["PropTypes"]);
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arrow = exports.Popper = exports.Target = exports.Manager = undefined;

	var _Manager2 = __webpack_require__(1);

	var _Manager3 = _interopRequireDefault(_Manager2);

	var _Target2 = __webpack_require__(4);

	var _Target3 = _interopRequireDefault(_Target2);

	var _Popper2 = __webpack_require__(5);

	var _Popper3 = _interopRequireDefault(_Popper2);

	var _Arrow2 = __webpack_require__(9);

	var _Arrow3 = _interopRequireDefault(_Arrow2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Manager = _Manager3.default;
	exports.Target = _Target3.default;
	exports.Popper = _Popper3.default;
	exports.Arrow = _Arrow3.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
	    var targetProps = { ref: targetRef };
	    return children({ targetProps: targetProps, restProps: restProps });
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _popper = __webpack_require__(6);

	var _popper2 = _interopRequireDefault(_popper);

	var _lodash = __webpack_require__(7);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
	      fn: function fn(data) {
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

	      if (lastProps.children !== this.props.children) {
	        this._popper.scheduleUpdate();
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
	          children = _props2.children,
	          restProps = _objectWithoutProperties(_props2, ['tag', 'innerRef', 'placement', 'eventsEnabled', 'modifiers', 'children']);

	      var popperRef = function popperRef(node) {
	        return _this2._node = node;
	      };
	      var popperStyle = this._getPopperStyle();
	      var popperPlacement = this._getPopperPlacement();

	      if (typeof children === 'function') {
	        var popperProps = _defineProperty({
	          ref: popperRef,
	          style: popperStyle
	        }, 'data-placement', popperPlacement);
	        return children({
	          popperProps: popperProps,
	          restProps: restProps,
	          scheduleUpdate: this._popper && this._popper.scheduleUpdate
	        });
	      }

	      return (0, _react.createElement)(tag, _extends({}, restProps, {
	        ref: function ref(node) {
	          popperRef(node);
	          if (typeof innerRef === 'function') {
	            innerRef(node);
	          }
	        },
	        style: _extends({}, restProps.style, popperStyle),
	        'data-placement': popperPlacement
	      }), children);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Popper = factory();
	})(undefined, function () {
	  'use strict';

	  var nativeHints = ['native code', '[object MutationObserverConstructor]'];

	  /**
	   * Determine if a function is implemented natively (as opposed to a polyfill).
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Function | undefined} fn the function to check
	   * @returns {Boolean}
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
	   * Set the style to the given popper
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} element - Element to apply the style to
	   * @argument {Object} styles
	   * Object with a list of properties and values which will be applied to the element
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

	  /**
	   * Check if the given variable is a function
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Any} functionToCheck - variable to check
	   * @returns {Boolean} answer to: is a function?
	   */
	  function isFunction(functionToCheck) {
	    var getType = {};
	    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
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

	  function isOffsetContainer(element) {
	    var nodeName = element.nodeName;

	    if (nodeName === 'BODY') {
	      return false;
	    }
	    return nodeName === 'HTML' || element.firstElementChild.offsetParent === element;
	  }

	  /**
	   * Finds the root node (document, shadowDOM root) of the given element
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} node
	   * @returns {Element} root node
	   */
	  function getRoot(node) {
	    if (node.parentNode !== null) {
	      return getRoot(node.parentNode);
	    }

	    return node;
	  }

	  /**
	   * Returns the offset parent of the given element
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} element
	   * @returns {Element} offset parent
	   */
	  function getOffsetParent(element) {
	    // NOTE: 1 DOM access here
	    var offsetParent = element && element.offsetParent;
	    var nodeName = offsetParent && offsetParent.nodeName;

	    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	      return window.document.documentElement;
	    }

	    return offsetParent;
	  }

	  /**
	   * Finds the offset parent common to the two provided nodes
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} element1
	   * @argument {Element} element2
	   * @returns {Element} common offset parent
	   */
	  function findCommonOffsetParent(element1, element2) {
	    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	      return window.document.documentElement;
	    }

	    // Here we make sure to give as "start" the element that comes first in the DOM
	    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	    var start = order ? element1 : element2;
	    var end = order ? element2 : element1;

	    // Get common ancestor container
	    var range = document.createRange();
	    range.setStart(start, 0);
	    range.setEnd(end, 0);
	    var commonAncestorContainer = range.commonAncestorContainer;

	    // Both nodes are inside #document

	    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	      if (isOffsetContainer(commonAncestorContainer)) {
	        return commonAncestorContainer;
	      }

	      return getOffsetParent(commonAncestorContainer);
	    }

	    // one of the nodes is inside shadowDOM, find which one
	    var element1root = getRoot(element1);
	    if (element1root.host) {
	      return findCommonOffsetParent(element1root.host, element2);
	    } else {
	      return findCommonOffsetParent(element1, getRoot(element2).host);
	    }
	  }

	  /**
	   * Gets the scroll value of the given element in the given side (top and left)
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} element
	   * @argument {String} side `top` or `left`
	   * @returns {number} amount of scrolled pixels
	   */
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

	  /*
	   * Helper to detect borders of a given element
	   * @method
	   * @memberof Popper.Utils
	   * @param {CSSStyleDeclaration} styles
	   * Result of `getStyleComputedProperty` on the given element
	   * @param {String} axis - `x` or `y`
	   * @return {number} borders - The borders size of the given axis
	   */

	  function getBordersSize(styles, axis) {
	    var sideA = axis === 'x' ? 'Left' : 'Top';
	    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	    return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
	  }

	  /**
	   * Tells if you are running Internet Explorer 10
	   * @method
	   * @memberof Popper.Utils
	   * @returns {Boolean} isIE10
	   */
	  var isIE10 = undefined;

	  var isIE10$1 = function isIE10$1() {
	    if (isIE10 === undefined) {
	      isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
	    }
	    return isIE10;
	  };

	  function getSize(axis, body, html, computedStyle) {
	    return Math.max(body['offset' + axis], html['client' + axis], html['offset' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
	  }

	  function getWindowSizes() {
	    var body = window.document.body;
	    var html = window.document.documentElement;
	    var computedStyle = isIE10$1() && window.getComputedStyle(html);

	    return {
	      height: getSize('Height', body, html, computedStyle),
	      width: getSize('Width', body, html, computedStyle)
	    };
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
	   * Given element offsets, generate an output similar to getBoundingClientRect
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Object} offsets
	   * @returns {Object} ClientRect like output
	   */
	  function getClientRect(offsets) {
	    return _extends({}, offsets, {
	      right: offsets.left + offsets.width,
	      bottom: offsets.top + offsets.height
	    });
	  }

	  /**
	   * Get bounding client rect of given element
	   * @method
	   * @memberof Popper.Utils
	   * @param {HTMLElement} element
	   * @return {Object} client rect
	   */
	  function getBoundingClientRect(element) {
	    var rect = {};

	    // IE10 10 FIX: Please, don't ask, the element isn't
	    // considered in DOM in some circumstances...
	    // This isn't reproducible in IE10 compatibility mode of IE11
	    if (isIE10$1()) {
	      try {
	        rect = element.getBoundingClientRect();
	        var scrollTop = getScroll(element, 'top');
	        var scrollLeft = getScroll(element, 'left');
	        rect.top += scrollTop;
	        rect.left += scrollLeft;
	        rect.bottom += scrollTop;
	        rect.right += scrollLeft;
	      } catch (err) {}
	    } else {
	      rect = element.getBoundingClientRect();
	    }

	    var result = {
	      left: rect.left,
	      top: rect.top,
	      width: rect.right - rect.left,
	      height: rect.bottom - rect.top
	    };

	    // subtract scrollbar size from sizes
	    var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
	    var width = sizes.width || element.clientWidth || result.right - result.left;
	    var height = sizes.height || element.clientHeight || result.bottom - result.top;

	    var horizScrollbar = element.offsetWidth - width;
	    var vertScrollbar = element.offsetHeight - height;

	    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	    // we make this check conditional for performance reasons
	    if (horizScrollbar || vertScrollbar) {
	      var styles = getStyleComputedProperty(element);
	      horizScrollbar -= getBordersSize(styles, 'x');
	      vertScrollbar -= getBordersSize(styles, 'y');

	      result.width -= horizScrollbar;
	      result.height -= vertScrollbar;
	    }

	    return getClientRect(result);
	  }

	  function getOffsetRectRelativeToArbitraryNode(children, parent) {
	    var isIE10 = isIE10$1();
	    var isHTML = parent.nodeName === 'HTML';
	    var childrenRect = getBoundingClientRect(children);
	    var parentRect = getBoundingClientRect(parent);
	    var scrollParent = getScrollParent(children);
	    var offsets = getClientRect({
	      top: childrenRect.top - parentRect.top,
	      left: childrenRect.left - parentRect.left,
	      width: childrenRect.width,
	      height: childrenRect.height
	    });

	    // Subtract margins of documentElement in case it's being used as parent
	    // we do this only on HTML because it's the only element that behaves
	    // differently when margins are applied to it. The margins are included in
	    // the box of the documentElement, in the other cases not.
	    if (isHTML || parent.nodeName === 'BODY') {
	      var styles = getStyleComputedProperty(parent);
	      var borderTopWidth = isIE10 && isHTML ? 0 : +styles.borderTopWidth.split('px')[0];
	      var borderLeftWidth = isIE10 && isHTML ? 0 : +styles.borderLeftWidth.split('px')[0];
	      var marginTop = isIE10 && isHTML ? 0 : +styles.marginTop.split('px')[0];
	      var marginLeft = isIE10 && isHTML ? 0 : +styles.marginLeft.split('px')[0];

	      offsets.top -= borderTopWidth - marginTop;
	      offsets.bottom -= borderTopWidth - marginTop;
	      offsets.left -= borderLeftWidth - marginLeft;
	      offsets.right -= borderLeftWidth - marginLeft;

	      // Attach marginTop and marginLeft because in some circumstances we may need them
	      offsets.marginTop = marginTop;
	      offsets.marginLeft = marginLeft;
	    }

	    if (parent.contains(scrollParent) && (isIE10 || scrollParent.nodeName !== 'BODY')) {
	      offsets = includeScroll(offsets, parent);
	    }

	    return offsets;
	  }

	  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	    var html = window.document.documentElement;
	    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	    var width = Math.max(html.clientWidth, window.innerWidth || 0);
	    var height = Math.max(html.clientHeight, window.innerHeight || 0);

	    var scrollTop = getScroll(html);
	    var scrollLeft = getScroll(html, 'left');

	    var offset = {
	      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	      width: width,
	      height: height
	    };

	    return getClientRect(offset);
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
	   * Computed the boundaries limits and return them
	   * @method
	   * @memberof Popper.Utils
	   * @param {HTMLElement} popper
	   * @param {HTMLElement} reference
	   * @param {number} padding
	   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	   * @returns {Object} Coordinates of the boundaries
	   */
	  function getBoundaries(popper, reference, padding, boundariesElement) {
	    // NOTE: 1 DOM access here
	    var boundaries = { top: 0, left: 0 };
	    var offsetParent = findCommonOffsetParent(popper, reference);

	    // Handle viewport case
	    if (boundariesElement === 'viewport') {
	      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
	    } else {
	      // Handle other cases based on DOM element used as boundaries
	      var boundariesNode = void 0;
	      if (boundariesElement === 'scrollParent') {
	        boundariesNode = getScrollParent(getParentNode(popper));
	        if (boundariesNode.nodeName === 'BODY') {
	          boundariesNode = window.document.documentElement;
	        }
	      } else if (boundariesElement === 'window') {
	        boundariesNode = window.document.documentElement;
	      } else {
	        boundariesNode = boundariesElement;
	      }

	      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

	      // In case of HTML, we need a different computation
	      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	        var _getWindowSizes = getWindowSizes(),
	            height = _getWindowSizes.height,
	            width = _getWindowSizes.width;

	        boundaries.top += offsets.top - offsets.marginTop;
	        boundaries.bottom = height + offsets.top;
	        boundaries.left += offsets.left - offsets.marginLeft;
	        boundaries.right = width + offsets.left;
	      } else {
	        // for all the other DOM elements, this one is good
	        boundaries = offsets;
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
	  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	    if (placement.indexOf('auto') === -1) {
	      return placement;
	    }

	    var boundaries = getBoundaries(popper, reference, 0, boundariesElement);

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
	    var commonOffsetParent = findCommonOffsetParent(popper, reference);
	    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
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
	   * Get the opposite placement of the given one
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
	  function getPopperOffsets(popper, referenceOffsets, placement) {
	    placement = placement.split('-')[0];

	    // Get popper node sizes
	    var popperRect = getOuterSizes(popper);

	    // Add position, width and height to our offsets object
	    var popperOffsets = {
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

	  /**
	   * Loop trough the list of modifiers and run them in order,
	   * each of them will then edit the data object.
	   * @method
	   * @memberof Popper.Utils
	   * @param {dataObject} data
	   * @param {Array} modifiers
	   * @param {String} ends - Optional modifier name used as stopper
	   * @returns {dataObject}
	   */
	  function runModifiers(modifiers, data, ends) {
	    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

	    modifiersToRun.forEach(function (modifier) {
	      if (modifier.function) {
	        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	      }
	      var fn = modifier.function || modifier.fn;
	      if (modifier.enabled && isFunction(fn)) {
	        data = fn(data, modifier);
	      }
	    });

	    return data;
	  }

	  /**
	   * Updates the position of the popper, computing the new offsets and applying
	   * the new style.<br />
	   * Prefer `scheduleUpdate` over `update` because of performance reasons.
	   * @method
	   * @memberof Popper
	   */
	  function update() {
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

	    // compute reference element offsets
	    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

	    // compute auto placement, store placement inside the data object,
	    // modifiers will be able to edit `placement` if needed
	    // and refer to originalPlacement to know the original value
	    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement);

	    // store the computed placement inside `originalPlacement`
	    data.originalPlacement = data.placement;

	    // compute the popper offsets
	    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
	    data.offsets.popper.position = 'absolute';

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
	   * Destroy the popper
	   * @method
	   * @memberof Popper
	   */
	  function destroy() {
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

	  /**
	   * It will add resize/scroll events and start recalculating
	   * position of the popper element when they are triggered.
	   * @method
	   * @memberof Popper
	   */
	  function enableEventListeners() {
	    if (!this.state.eventsEnabled) {
	      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	    }
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
	   * It will remove resize/scroll events and won't recalculate popper position
	   * when they are triggered. It also won't trigger onUpdate callback anymore,
	   * unless you call `update` method manually.
	   * @method
	   * @memberof Popper
	   */
	  function disableEventListeners() {
	    if (this.state.eventsEnabled) {
	      window.cancelAnimationFrame(this.scheduleUpdate);
	      this.state = removeEventListeners(this.reference, this.state);
	    }
	  }

	  /**
	   * Set the attributes to the given popper
	   * @method
	   * @memberof Popper.Utils
	   * @argument {Element} element - Element to apply the attributes to
	   * @argument {Object} styles
	   * Object with a list of properties and values which will be applied to the element
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
	   * @function
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
	    } else {
	      // othwerise, we use the standard `left` and `top` properties
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
	   * Set the x-placement attribute before everything else because it could be used
	   * to add margins to the popper margins needs to be calculated to get the
	   * correct popper offsets.
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
	    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement);

	    popper.setAttribute('x-placement', placement);
	    return options;
	  }

	  /**
	   * Helper used to know if the given modifier depends from another one.<br />
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

	    var isRequired = !!requesting && modifiers.some(function (modifier) {
	      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	    });

	    if (!isRequired) {
	      var _requesting = '`' + requestingName + '`';
	      var requested = '`' + requestedName + '`';
	      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	    }
	    return isRequired;
	  }

	  /**
	   * @function
	   * @memberof Modifiers
	   * @argument {Object} data - The data object generated by update method
	   * @argument {Object} options - Modifiers configuration and options
	   * @returns {Object} The data object, properly modified
	   */
	  function arrow(data, options) {
	    // arrow depends on keepTogether in order to work
	    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
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
	   * Get the opposite placement variation of the given one
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
	   * List of accepted placements to use as values of the `placement` option.<br />
	   * Valid placements are:
	   * - `auto`
	   * - `top`
	   * - `right`
	   * - `bottom`
	   * - `left`
	   *
	   * Each placement can have a variation from this list:
	   * - `-start`
	   * - `-end`
	   *
	   * Variations are interpreted easily if you think of them as the left to right
	   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	   * is right.<br />
	   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	   *
	   * Some valid examples are:
	   * - `top-end` (on top of reference, right aligned)
	   * - `right-start` (on right of reference, top aligned)
	   * - `bottom` (on bottom, centered)
	   * - `auto-right` (on the side with more space available, alignment depends by placement)
	   *
	   * @static
	   * @type {Array}
	   * @enum {String}
	   * @readonly
	   * @method placements
	   * @memberof Popper
	   */
	  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	  // Get rid of `auto` `auto-start` and `auto-end`
	  var validPlacements = placements.slice(3);

	  /**
	   * Given an initial placement, returns all the subsequent placements
	   * clockwise (or counter-clockwise).
	   *
	   * @method
	   * @memberof Popper.Utils
	   * @argument {String} placement - A valid placement (it accepts variations)
	   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	   * @returns {Array} placements including their variations
	   */
	  function clockwise(placement) {
	    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var index = validPlacements.indexOf(placement);
	    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	    return counter ? arr.reverse() : arr;
	  }

	  var BEHAVIORS = {
	    FLIP: 'flip',
	    CLOCKWISE: 'clockwise',
	    COUNTERCLOCKWISE: 'counterclockwise'
	  };

	  /**
	   * @function
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

	    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

	    var placement = data.placement.split('-')[0];
	    var placementOpposite = getOppositePlacement(placement);
	    var variation = data.placement.split('-')[1] || '';

	    var flipOrder = [];

	    switch (options.behavior) {
	      case BEHAVIORS.FLIP:
	        flipOrder = [placement, placementOpposite];
	        break;
	      case BEHAVIORS.CLOCKWISE:
	        flipOrder = clockwise(placement);
	        break;
	      case BEHAVIORS.COUNTERCLOCKWISE:
	        flipOrder = clockwise(placement, true);
	        break;
	      default:
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
	        data.offsets.popper = getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement);

	        data = runModifiers(data.instance.modifiers, data, 'flip');
	      }
	    });
	    return data;
	  }

	  /**
	   * @function
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
	   * Converts a string containing value + unit into a px value number
	   * @function
	   * @memberof {modifiers~offset}
	   * @private
	   * @argument {String} str - Value + unit string
	   * @argument {String} measurement - `height` or `width`
	   * @argument {Object} popperOffsets
	   * @argument {Object} referenceOffsets
	   * @returns {Number|String}
	   * Value in pixels, or original string if no values were extracted
	   */
	  function toValue(str, measurement, popperOffsets, referenceOffsets) {
	    // separate value from unit
	    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	    var value = +split[1];
	    var unit = split[2];

	    // If it's not a number it's an operator, I guess
	    if (!value) {
	      return str;
	    }

	    if (unit.indexOf('%') === 0) {
	      var element = void 0;
	      switch (unit) {
	        case '%p':
	          element = popperOffsets;
	          break;
	        case '%':
	        case '%r':
	        default:
	          element = referenceOffsets;
	      }

	      var rect = getClientRect(element);
	      return rect[measurement] / 100 * value;
	    } else if (unit === 'vh' || unit === 'vw') {
	      // if is a vh or vw, we calculate the size based on the viewport
	      var size = void 0;
	      if (unit === 'vh') {
	        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	      } else {
	        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	      }
	      return size / 100 * value;
	    } else {
	      // if is an explicit pixel unit, we get rid of the unit and keep the value
	      // if is an implicit unit, it's px, and we return just the value
	      return value;
	    }
	  }

	  /**
	   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	   * @function
	   * @memberof {modifiers~offset}
	   * @private
	   * @argument {String} offset
	   * @argument {Object} popperOffsets
	   * @argument {Object} referenceOffsets
	   * @argument {String} basePlacement
	   * @returns {Array} a two cells array with x and y offsets in numbers
	   */
	  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	    var offsets = [0, 0];

	    // Use height if placement is left or right and index is 0 otherwise use width
	    // in this way the first offset will use an axis and the second one
	    // will use the other one
	    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	    // Split the offset string to obtain a list of values and operands
	    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	      return frag.trim();
	    });

	    // Detect if the offset string contains a pair of values or a single one
	    // they could be separated by comma or space
	    var divider = fragments.indexOf(find(fragments, function (frag) {
	      return frag.search(/,|\s/) !== -1;
	    }));

	    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	    }

	    // If divider is found, we divide the list of values and operands to divide
	    // them by ofset X and Y.
	    var splitRegex = /\s*,\s*|\s+/;
	    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	    // Convert the values with units to absolute pixels to allow our computations
	    ops = ops.map(function (op, index) {
	      // Most of the units rely on the orientation of the popper
	      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	      var mergeWithPrevious = false;
	      return op
	      // This aggregates any `+` or `-` sign that aren't considered operators
	      // e.g.: 10 + +5 => [10, +, +5]
	      .reduce(function (a, b) {
	        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	          a[a.length - 1] = b;
	          mergeWithPrevious = true;
	          return a;
	        } else if (mergeWithPrevious) {
	          a[a.length - 1] += b;
	          mergeWithPrevious = false;
	          return a;
	        } else {
	          return a.concat(b);
	        }
	      }, [])
	      // Here we convert the string values into number values (in px)
	      .map(function (str) {
	        return toValue(str, measurement, popperOffsets, referenceOffsets);
	      });
	    });

	    // Loop trough the offsets arrays and execute the operations
	    ops.forEach(function (op, index) {
	      op.forEach(function (frag, index2) {
	        if (isNumeric(frag)) {
	          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	        }
	      });
	    });
	    return offsets;
	  }

	  /**
	   * @function
	   * @memberof Modifiers
	   * @argument {Object} data - The data object generated by update method
	   * @argument {Object} options - Modifiers configuration and options
	   * @argument {Number|String} options.offset=0
	   * The offset value as described in the modifier description
	   * @returns {Object} The data object, properly modified
	   */
	  function offset(data, _ref) {
	    var offset = _ref.offset;
	    var placement = data.placement,
	        _data$offsets = data.offsets,
	        popper = _data$offsets.popper,
	        reference = _data$offsets.reference;

	    var basePlacement = placement.split('-')[0];

	    var offsets = void 0;
	    if (isNumeric(+offset)) {
	      offsets = [+offset, 0];
	    } else {
	      offsets = parseOffset(offset, popper, reference, basePlacement);
	    }

	    if (basePlacement === 'left') {
	      popper.top += offsets[0];
	      popper.left -= offsets[1];
	    } else if (basePlacement === 'right') {
	      popper.top += offsets[0];
	      popper.left += offsets[1];
	    } else if (basePlacement === 'top') {
	      popper.left += offsets[0];
	      popper.top -= offsets[1];
	    } else if (basePlacement === 'bottom') {
	      popper.left += offsets[0];
	      popper.top += offsets[1];
	    }

	    data.popper = popper;
	    return data;
	  }

	  /**
	   * @function
	   * @memberof Modifiers
	   * @argument {Object} data - The data object generated by `update` method
	   * @argument {Object} options - Modifiers configuration and options
	   * @returns {Object} The data object, properly modified
	   */
	  function preventOverflow(data, options) {
	    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
	    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
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
	   * @function
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
	   * @function
	   * @memberof Modifiers
	   * @argument {Object} data - The data object generated by update method
	   * @argument {Object} options - Modifiers configuration and options
	   * @returns {Object} The data object, properly modified
	   */
	  function hide(data) {
	    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
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
	   * @function
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
	   * Modifier function, each modifier can have a function of this type assigned
	   * to its `fn` property.<br />
	   * These functions will be called on each update, this means that you must
	   * make sure they are performant enough to avoid performance bottlenecks.
	   *
	   * @function ModifierFn
	   * @argument {dataObject} data - The data object generated by `update` method
	   * @argument {Object} options - Modifiers configuration and options
	   * @returns {dataObject} The data object, properly modified
	   */

	  /**
	   * Modifiers are plugins used to alter the behavior of your poppers.<br />
	   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	   * needed by the library.
	   *
	   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	   * All the other properties are configurations that could be tweaked.
	   * @namespace modifiers
	   */
	  var modifiers = {
	    /**
	     * Modifier used to shift the popper on the start or end of its reference
	     * element.<br />
	     * It will read the variation of the `placement` property.<br />
	     * It can be one either `-end` or `-start`.
	     * @memberof modifiers
	     * @inner
	     */
	    shift: {
	      /** @prop {number} order=100 - Index used to define the order of execution */
	      order: 100,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: shift
	    },

	    /**
	     * The `offset` modifier can shift your popper on both its axis.
	     *
	     * It accepts the following units:
	     * - `px` or unitless, interpreted as pixels
	     * - `%` or `%r`, percentage relative to the length of the reference element
	     * - `%p`, percentage relative to the length of the popper element
	     * - `vw`, CSS viewport width unit
	     * - `vh`, CSS viewport height unit
	     *
	     * For length is intended the main axis relative to the placement of the popper.<br />
	     * This means that if the placement is `top` or `bottom`, the length will be the
	     * `width`. In case of `left` or `right`, it will be the height.
	     *
	     * You can provide a single value (as `Number` or `String`), or a pair of values
	     * as `String` divided by a comma or one (or more) white spaces.<br />
	     * The latter is a deprecated method because it leads to confusion and will be
	     * removed in v2.<br />
	     * Additionally, it accepts additions and subtractions between different units.
	     * Note that multiplications and divisions aren't supported.
	     *
	     * Valid examples are:
	     * ```
	     * 10
	     * '10%'
	     * '10, 10'
	     * '10%, 10'
	     * '10 + 10%'
	     * '10 - 5vh + 3%'
	     * '-10px + 5vh, 5px - 6%'
	     * ```
	     *
	     * @memberof modifiers
	     * @inner
	     */
	    offset: {
	      /** @prop {number} order=200 - Index used to define the order of execution */
	      order: 200,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: offset,
	      /** @prop {Number|String} offset=0
	       * The offset value as described in the modifier description
	       */
	      offset: 0
	    },

	    /**
	     * Modifier used to prevent the popper from being positioned outside the boundary.
	     *
	     * An scenario exists where the reference itself is not within the boundaries.<br />
	     * We can say it has "escaped the boundaries" — or just "escaped".<br />
	     * In this case we need to decide whether the popper should either:
	     *
	     * - detach from the reference and remain "trapped" in the boundaries, or
	     * - if it should ignore the boundary and "escape with its reference"
	     *
	     * When `escapeWithReference` is set to`true` and reference is completely
	     * outside its boundaries, the popper will overflow (or completely leave)
	     * the boundaries in order to remain attached to the edge of the reference.
	     *
	     * @memberof modifiers
	     * @inner
	     */
	    preventOverflow: {
	      /** @prop {number} order=300 - Index used to define the order of execution */
	      order: 300,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: preventOverflow,
	      /**
	       * @prop {Array} priority=['left', 'right', 'top', 'bottom']
	       * Popper will try to prevent overflow following these priorities by default,
	       * then, it could overflow on the left and on top of the `boundariesElement`
	       */
	      priority: ['left', 'right', 'top', 'bottom'],
	      /**
	       * @prop {number} padding=5
	       * Amount of pixel used to define a minimum distance between the boundaries
	       * and the popper this makes sure the popper has always a little padding
	       * between the edges of its container
	       */
	      padding: 5,
	      /**
	       * @prop {String|HTMLElement} boundariesElement='scrollParent'
	       * Boundaries used by the modifier, can be `scrollParent`, `window`,
	       * `viewport` or any DOM element.
	       */
	      boundariesElement: 'scrollParent'
	    },

	    /**
	     * Modifier used to make sure the reference and its popper stay near eachothers
	     * without leaving any gap between the two. Expecially useful when the arrow is
	     * enabled and you want to assure it to point to its reference element.
	     * It cares only about the first axis, you can still have poppers with margin
	     * between the popper and its reference element.
	     * @memberof modifiers
	     * @inner
	     */
	    keepTogether: {
	      /** @prop {number} order=400 - Index used to define the order of execution */
	      order: 400,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: keepTogether
	    },

	    /**
	     * This modifier is used to move the `arrowElement` of the popper to make
	     * sure it is positioned between the reference element and its popper element.
	     * It will read the outer size of the `arrowElement` node to detect how many
	     * pixels of conjuction are needed.
	     *
	     * It has no effect if no `arrowElement` is provided.
	     * @memberof modifiers
	     * @inner
	     */
	    arrow: {
	      /** @prop {number} order=500 - Index used to define the order of execution */
	      order: 500,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: arrow,
	      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	      element: '[x-arrow]'
	    },

	    /**
	     * Modifier used to flip the popper's placement when it starts to overlap its
	     * reference element.
	     *
	     * Requires the `preventOverflow` modifier before it in order to work.
	     *
	     * **NOTE:** this modifier will interrupt the current update cycle and will
	     * restart it if it detects the need to flip the placement.
	     * @memberof modifiers
	     * @inner
	     */
	    flip: {
	      /** @prop {number} order=600 - Index used to define the order of execution */
	      order: 600,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: flip,
	      /**
	       * @prop {String|Array} behavior='flip'
	       * The behavior used to change the popper's placement. It can be one of
	       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	       * placements (with optional variations).
	       */
	      behavior: 'flip',
	      /**
	       * @prop {number} padding=5
	       * The popper will flip if it hits the edges of the `boundariesElement`
	       */
	      padding: 5,
	      /**
	       * @prop {String|HTMLElement} boundariesElement='viewport'
	       * The element which will define the boundaries of the popper position,
	       * the popper will never be placed outside of the defined boundaries
	       * (except if keepTogether is enabled)
	       */
	      boundariesElement: 'viewport'
	    },

	    /**
	     * Modifier used to make the popper flow toward the inner of the reference element.
	     * By default, when this modifier is disabled, the popper will be placed outside
	     * the reference element.
	     * @memberof modifiers
	     * @inner
	     */
	    inner: {
	      /** @prop {number} order=700 - Index used to define the order of execution */
	      order: 700,
	      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	      enabled: false,
	      /** @prop {ModifierFn} */
	      fn: inner
	    },

	    /**
	     * Modifier used to hide the popper when its reference element is outside of the
	     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	     * be used to hide with a CSS selector the popper when its reference is
	     * out of boundaries.
	     *
	     * Requires the `preventOverflow` modifier before it in order to work.
	     * @memberof modifiers
	     * @inner
	     */
	    hide: {
	      /** @prop {number} order=800 - Index used to define the order of execution */
	      order: 800,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: hide
	    },

	    /**
	     * Applies the computed styles to the popper element.
	     *
	     * All the DOM manipulations are limited to this modifier. This is useful in case
	     * you want to integrate Popper.js inside a framework or view library and you
	     * want to delegate all the DOM manipulations to it.
	     *
	     * Just disable this modifier and define you own to achieve the desired effect.
	     *
	     * @memberof modifiers
	     * @inner
	     */
	    applyStyle: {
	      /** @prop {number} order=900 - Index used to define the order of execution */
	      order: 900,
	      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	      enabled: true,
	      /** @prop {ModifierFn} */
	      fn: applyStyle,
	      /** @prop {Function} */
	      onLoad: applyStyleOnLoad,
	      /**
	       * @prop {Boolean} gpuAcceleration=true
	       * If true, it uses the CSS 3d transformation to position the popper.
	       * Otherwise, it will use the `top` and `left` properties.
	       */
	      gpuAcceleration: true
	    }
	  };

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
	   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	   */

	  /**
	   * Default options provided to Popper.js constructor.<br />
	   * These can be overriden using the `options` argument of Popper.js.<br />
	   * To override an option, simply pass as 3rd argument an object with the same
	   * structure of this object, example:
	   * ```
	   * new Popper(ref, pop, {
	   *   modifiers: {
	   *     preventOverflow: { enabled: false }
	   *   }
	   * })
	   * ```
	   * @type {Object}
	   * @static
	   * @memberof Popper
	   */
	  var DEFAULTS = {
	    /**
	     * Popper's placement
	     * @prop {Popper.placements} placement='bottom'
	     */
	    placement: 'bottom',

	    /**
	     * Whether events (resize, scroll) are initially enabled
	     * @prop {Boolean} eventsEnabled=true
	     */
	    eventsEnabled: true,

	    /**
	     * Set to true if you want to automatically remove the popper when
	     * you call the `destroy` method.
	     * @prop {Boolean} removeOnDestroy=false
	     */
	    removeOnDestroy: false,

	    /**
	     * Callback called when the popper is created.<br />
	     * By default, is set to no-op.<br />
	     * Access Popper.js instance with `data.instance`.
	     * @prop {onCreateCallback}
	     */
	    onCreate: function onCreate() {},

	    /**
	     * Callback called when the popper is updated, this callback is not called
	     * on the initialization/creation of the popper, but only on subsequent
	     * updates.<br />
	     * By default, is set to no-op.<br />
	     * Access Popper.js instance with `data.instance`.
	     * @prop {onUpdateCallback}
	     */
	    onUpdate: function onUpdate() {},

	    /**
	     * List of modifiers used to modify the offsets before they are applied to the popper.
	     * They provide most of the functionalities of Popper.js
	     * @prop {modifiers}
	     */
	    modifiers: modifiers
	  };

	  /**
	   * @callback onCreateCallback
	   * @param {dataObject} data
	   */

	  /**
	   * @callback onUpdateCallback
	   * @param {dataObject} data
	   */

	  // Utils
	  // Methods
	  var Popper = function () {
	    /**
	     * Create a new Popper.js instance
	     * @class Popper
	     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
	     * @param {HTMLElement} popper - The HTML element used as popper.
	     * @param {Object} options - Your custom options to override the ones defined in [DEFAULTS](#defaults)
	     * @return {Object} instance - The generated Popper.js instance
	     */
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

	      // make sure to apply the popper position before any computation
	      setStyles(this.popper, { position: 'absolute' });

	      // refactoring modifiers' list (Object => Array)
	      this.modifiers = Object.keys(Popper.Defaults.modifiers).map(function (name) {
	        return _extends({
	          name: name
	        }, Popper.Defaults.modifiers[name]);
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

	      // fire the first update to position the popper in the right place
	      this.update();

	      var eventsEnabled = this.options.eventsEnabled;
	      if (eventsEnabled) {
	        // setup event listeners, they will take care of update the position in specific situations
	        this.enableEventListeners();
	      }

	      this.state.eventsEnabled = eventsEnabled;
	    }

	    // We can't use class properties because they don't get listed in the
	    // class prototype and break stuff like Sinon stubs


	    createClass(Popper, [{
	      key: 'update',
	      value: function update$$1() {
	        return update.call(this);
	      }
	    }, {
	      key: 'destroy',
	      value: function destroy$$1() {
	        return destroy.call(this);
	      }
	    }, {
	      key: 'enableEventListeners',
	      value: function enableEventListeners$$1() {
	        return enableEventListeners.call(this);
	      }
	    }, {
	      key: 'disableEventListeners',
	      value: function disableEventListeners$$1() {
	        return disableEventListeners.call(this);
	      }

	      /**
	       * Schedule an update, it will run on the next UI update available
	       * @method scheduleUpdate
	       * @memberof Popper
	       */

	      /**
	       * Collection of utilities useful when writing custom modifiers.
	       * Starting from version 1.7, this method is available only if you
	       * include `popper-utils.js` before `popper.js`.
	       *
	       * **DEPRECATION**: This way to access PopperUtils is deprecated
	       * and will be removed in v2! Use the PopperUtils module directly instead.
	       * @static
	       * @type {Object}
	       * @deprecated since version 1.8
	       * @member Utils
	       * @memberof Popper
	       */

	    }]);
	    return Popper;
	  }();

	  /**
	   * The `referenceObject` is an object that provides an interface compatible with Popper.js
	   * and lets you use it as replacement of a real DOM node.<br />
	   * You can use this method to position a popper relatively to a set of coordinates
	   * in case you don't have a DOM node to use as reference.
	   *
	   * ```
	   * new Popper(referenceObject, popperNode);
	   * ```
	   *
	   * NB: This feature isn't supported in Internet Explorer 10
	   * @name referenceObject
	   * @property {Function} data.getBoundingClientRect
	   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	   * @property {number} data.clientWidth
	   * An ES6 getter that will return the width of the virtual reference element.
	   * @property {number} data.clientHeight
	   * An ES6 getter that will return the height of the virtual reference element.
	   */

	  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
	  Popper.placements = placements;
	  Popper.Defaults = DEFAULTS;

	  return Popper;
	});
	//# sourceMappingURL=popper.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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
	      children = props.children,
	      restProps = _objectWithoutProperties(props, ['tag', 'innerRef', 'children']);

	  var popper = context.popper;

	  var arrowRef = function arrowRef(node) {
	    return popper.setArrowNode(node);
	  };
	  var arrowStyle = popper.getArrowStyle();

	  if (typeof children === 'function') {
	    var arrowProps = {
	      ref: arrowRef,
	      style: arrowStyle
	    };
	    return children({ arrowProps: arrowProps, restProps: restProps });
	  }

	  return (0, _react.createElement)(tag, _extends({}, restProps, {
	    ref: function ref(node) {
	      arrowRef(node);
	      if (typeof innerRef === 'function') {
	        innerRef(node);
	      }
	    },
	    style: _extends({}, arrowStyle, restProps.style)
	  }), children);
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

/***/ })
/******/ ])
});
;