(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouter"] = factory(require("react"));
	else
		root["ReactRouter"] = factory(root["React"]);
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.propTypes = exports.createServerRenderContext = exports.matchPattern = exports.StaticRouter = exports.ServerRouter = exports.MemoryRouter = exports.HashRouter = exports.BrowserRouter = exports.Redirect = exports.NavigationPrompt = exports.Miss = exports.Match = exports.Link = undefined;

	var _Link2 = __webpack_require__(1);

	var _Link3 = _interopRequireDefault(_Link2);

	var _Match2 = __webpack_require__(9);

	var _Match3 = _interopRequireDefault(_Match2);

	var _Miss2 = __webpack_require__(15);

	var _Miss3 = _interopRequireDefault(_Miss2);

	var _NavigationPrompt2 = __webpack_require__(16);

	var _NavigationPrompt3 = _interopRequireDefault(_NavigationPrompt2);

	var _Redirect2 = __webpack_require__(17);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	var _BrowserRouter2 = __webpack_require__(18);

	var _BrowserRouter3 = _interopRequireDefault(_BrowserRouter2);

	var _HashRouter2 = __webpack_require__(34);

	var _HashRouter3 = _interopRequireDefault(_HashRouter2);

	var _MemoryRouter2 = __webpack_require__(36);

	var _MemoryRouter3 = _interopRequireDefault(_MemoryRouter2);

	var _ServerRouter2 = __webpack_require__(38);

	var _ServerRouter3 = _interopRequireDefault(_ServerRouter2);

	var _StaticRouter2 = __webpack_require__(28);

	var _StaticRouter3 = _interopRequireDefault(_StaticRouter2);

	var _matchPattern2 = __webpack_require__(11);

	var _matchPattern3 = _interopRequireDefault(_matchPattern2);

	var _createServerRenderContext2 = __webpack_require__(39);

	var _createServerRenderContext3 = _interopRequireDefault(_createServerRenderContext2);

	var _PropTypes = __webpack_require__(8);

	var _propTypes = _interopRequireWildcard(_PropTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Link = _Link3.default;
	exports.Match = _Match3.default;
	exports.Miss = _Miss3.default;
	exports.NavigationPrompt = _NavigationPrompt3.default;
	exports.Redirect = _Redirect3.default;

	// High-level wrappers

	exports.BrowserRouter = _BrowserRouter3.default;
	exports.HashRouter = _HashRouter3.default;
	exports.MemoryRouter = _MemoryRouter3.default;
	exports.ServerRouter = _ServerRouter3.default;

	// Low-level building block

	exports.StaticRouter = _StaticRouter3.default;

	// Util for server rendering "pre-render match"

	exports.matchPattern = _matchPattern3.default;

	// Util for server rendering context

	exports.createServerRenderContext = _createServerRenderContext3.default;

	// React PropTypes for all Components

	exports.propTypes = _propTypes;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Broadcasts = __webpack_require__(3);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Link = function (_React$Component) {
	  _inherits(Link, _React$Component);

	  function Link() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Link);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
	      if (_this.props.onClick) _this.props.onClick(event);

	      if (!event.defaultPrevented && // onClick prevented default
	      !_this.props.target && // let browser handle "target=_blank" etc.
	      !isModifiedEvent(event) && isLeftClickEvent(event)) {
	        event.preventDefault();
	        _this.handleTransition();
	      }
	    }, _this.handleTransition = function () {
	      var router = _this.context.router;
	      var _this$props = _this.props,
	          to = _this$props.to,
	          replace = _this$props.replace;

	      var navigate = replace ? router.replaceWith : router.transitionTo;
	      navigate(to);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  Link.prototype.render = function render() {
	    var _this2 = this;

	    var router = this.context.router;

	    var _props = this.props,
	        to = _props.to,
	        style = _props.style,
	        activeStyle = _props.activeStyle,
	        className = _props.className,
	        activeClassName = _props.activeClassName,
	        getIsActive = _props.isActive,
	        activeOnlyWhenExact = _props.activeOnlyWhenExact,
	        replace = _props.replace,
	        children = _props.children,
	        rest = _objectWithoutProperties(_props, ['to', 'style', 'activeStyle', 'className', 'activeClassName', 'isActive', 'activeOnlyWhenExact', 'replace', 'children']);

	    return _react2.default.createElement(
	      _Broadcasts.LocationSubscriber,
	      null,
	      function (location) {
	        var isActive = getIsActive(location, createLocationDescriptor(to), _this2.props);

	        // If children is a function, we are using a Function as Children Component
	        // so useful values will be passed down to the children function.
	        if (typeof children == 'function') {
	          return children({
	            isActive: isActive,
	            location: location,
	            href: router ? router.createHref(to) : to,
	            onClick: _this2.handleClick,
	            transition: _this2.handleTransition
	          });
	        }

	        // Maybe we should use <Match> here? Not sure how the custom `isActive`
	        // prop would shake out, also, this check happens a LOT so maybe its good
	        // to optimize here w/ a faster isActive check, so we'd need to benchmark
	        // any attempt at changing to use <Match>
	        return _react2.default.createElement('a', _extends({}, rest, {
	          href: router ? router.createHref(to) : to,
	          onClick: _this2.handleClick,
	          style: isActive ? _extends({}, style, activeStyle) : style,
	          className: isActive ? [className, activeClassName].join(' ').trim() : className,
	          children: children
	        }));
	      }
	    );
	  };

	  return Link;
	}(_react2.default.Component);

	Link.defaultProps = {
	  replace: false,
	  activeOnlyWhenExact: false,
	  className: '',
	  activeClassName: '',
	  style: {},
	  activeStyle: {},
	  isActive: function isActive(location, to, props) {
	    return pathIsActive(to.pathname, location.pathname, props.activeOnlyWhenExact) && queryIsActive(to.query, location.query);
	  }
	};
	Link.contextTypes = {
	  router: _PropTypes.routerContext.isRequired
	};


	if (false) {
	  Link.propTypes = {
	    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
	    replace: _react.PropTypes.bool,
	    activeStyle: _react.PropTypes.object,
	    activeClassName: _react.PropTypes.string,
	    activeOnlyWhenExact: _react.PropTypes.bool,
	    isActive: _react.PropTypes.func,
	    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]),

	    // props we have to deal with but aren't necessarily
	    // part of the Link API
	    style: _react.PropTypes.object,
	    className: _react.PropTypes.string,
	    target: _react.PropTypes.string,
	    onClick: _react.PropTypes.func
	  };
	}

	// we should probably use LocationUtils.createLocationDescriptor
	var createLocationDescriptor = function createLocationDescriptor(to) {
	  return (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to : { pathname: to };
	};

	var pathIsActive = function pathIsActive(to, pathname, activeOnlyWhenExact) {
	  return activeOnlyWhenExact ? pathname === to : pathname.indexOf(to) === 0;
	};

	var queryIsActive = function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	};

	var isLeftClickEvent = function isLeftClickEvent(event) {
	  return event.button === 0;
	};

	var isModifiedEvent = function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	};

	var deepEqual = function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	};

	exports.default = Link;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.LocationSubscriber = exports.LocationBroadcast = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBroadcast = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LocationChannel = 'location';

	var LocationBroadcast = exports.LocationBroadcast = function LocationBroadcast(props) {
	  return _react2.default.createElement(_reactBroadcast.Broadcast, _extends({}, props, { channel: LocationChannel }));
	};

	var LocationSubscriber = exports.LocationSubscriber = function LocationSubscriber(props) {
	  return _react2.default.createElement(_reactBroadcast.Subscriber, _extends({}, props, { channel: LocationChannel }));
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Subscriber = exports.Broadcast = undefined;

	var _Broadcast2 = __webpack_require__(5);

	var _Broadcast3 = _interopRequireDefault(_Broadcast2);

	var _Subscriber2 = __webpack_require__(7);

	var _Subscriber3 = _interopRequireDefault(_Subscriber2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Broadcast = _Broadcast3.default;
	exports.Subscriber = _Subscriber3.default;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createBroadcast = function createBroadcast(initialValue) {
	  var listeners = [];
	  var currentValue = initialValue;

	  return {
	    publish: function publish(value) {
	      currentValue = value;
	      listeners.forEach(function (listener) {
	        return listener(currentValue);
	      });
	    },
	    subscribe: function subscribe(listener) {
	      listeners.push(listener);

	      // Publish to this subscriber once immediately.
	      listener(currentValue);

	      return function () {
	        return listeners = listeners.filter(function (item) {
	          return item !== listener;
	        });
	      };
	    }
	  };
	};

	/**
	 * A <Broadcast> provides a generic way for descendants to "subscribe"
	 * to some value that changes over time, bypassing any intermediate
	 * shouldComponentUpdate's in the hierarchy. It puts all subscription
	 * functions on context.broadcasts, keyed by "channel".
	 *
	 * To use it, a subscriber must opt-in to context.broadcasts. See the
	 * <Subscriber> component for a reference implementation.
	 */

	var Broadcast = function (_React$Component) {
	  _inherits(Broadcast, _React$Component);

	  function Broadcast() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Broadcast);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.broadcast = createBroadcast(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  Broadcast.prototype.getBroadcastsContext = function getBroadcastsContext() {
	    var _extends2;

	    var channel = this.props.channel;
	    var broadcasts = this.context.broadcasts;


	    return _extends({}, broadcasts, (_extends2 = {}, _extends2[channel] = this.broadcast.subscribe, _extends2));
	  };

	  Broadcast.prototype.getChildContext = function getChildContext() {
	    return {
	      broadcasts: this.getBroadcastsContext()
	    };
	  };

	  Broadcast.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    !(this.props.channel === nextProps.channel) ?  false ? (0, _invariant2.default)(false, 'You cannot change <Broadcast channel>') : (0, _invariant2.default)(false) : void 0;

	    if (this.props.value !== nextProps.value) this.broadcast.publish(nextProps.value);
	  };

	  Broadcast.prototype.render = function render() {
	    return _react2.default.Children.only(this.props.children);
	  };

	  return Broadcast;
	}(_react2.default.Component);

	Broadcast.contextTypes = {
	  broadcasts: _react.PropTypes.object
	};
	Broadcast.childContextTypes = {
	  broadcasts: _react.PropTypes.object.isRequired
	};


	if (false) {
	  Broadcast.propTypes = {
	    channel: _react.PropTypes.string.isRequired,
	    children: _react.PropTypes.node.isRequired,
	    value: _react.PropTypes.any
	  };
	}

	exports.default = Broadcast;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
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

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * A <Subscriber> pulls the value for a channel off of context.broadcasts
	 * and passes it to its children function.
	 */
	var Subscriber = function (_React$Component) {
	  _inherits(Subscriber, _React$Component);

	  function Subscriber() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Subscriber);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
	      value: null
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  Subscriber.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    var channel = this.props.channel;


	    if (this.context.broadcasts) {
	      var subscribe = this.context.broadcasts[channel];

	      !(typeof subscribe === 'function') ?  false ? (0, _invariant2.default)(false, '<Subscriber channel="%s"> must be rendered in the context of a <Broadcast channel="%s">', channel, channel) : (0, _invariant2.default)(false) : void 0;

	      this.unsubscribe = subscribe(function (value) {
	        // This function will be called once immediately.
	        _this2.setState({ value: value });
	      });
	    }
	  };

	  Subscriber.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.unsubscribe) this.unsubscribe();
	  };

	  Subscriber.prototype.render = function render() {
	    return this.props.children(this.state.value);
	  };

	  return Subscriber;
	}(_react2.default.Component);

	Subscriber.contextTypes = {
	  broadcasts: _react2.default.PropTypes.object
	};


	if (false) {
	  Subscriber.propTypes = {
	    channel: _react.PropTypes.string.isRequired,
	    children: _react.PropTypes.func.isRequired
	  };
	}

	exports.default = Subscriber;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.routerContext = exports.historyContext = exports.location = exports.history = exports.matchContext = exports.action = undefined;

	var _react = __webpack_require__(2);

	var action = exports.action = _react.PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']);

	var matchContext = exports.matchContext = _react.PropTypes.shape({
	  addMatch: _react.PropTypes.func.isRequired,
	  removeMatch: _react.PropTypes.func.isRequired
	});

	var history = exports.history = _react.PropTypes.shape({
	  listen: _react.PropTypes.func.isRequired,
	  listenBefore: _react.PropTypes.func.isRequired,
	  push: _react.PropTypes.func.isRequired,
	  replace: _react.PropTypes.func.isRequired,
	  go: _react.PropTypes.func.isRequired
	});

	var location = exports.location = _react.PropTypes.shape({
	  pathname: _react.PropTypes.string.isRequired,
	  search: _react.PropTypes.string.isRequired,
	  hash: _react.PropTypes.string.isRequired,
	  state: _react.PropTypes.any,
	  key: _react.PropTypes.string
	});

	var historyContext = exports.historyContext = _react.PropTypes.shape({
	  action: action.isRequired,
	  location: location.isRequired,
	  push: _react.PropTypes.func.isRequired,
	  replace: _react.PropTypes.func.isRequired,
	  go: _react.PropTypes.func.isRequired,
	  goBack: _react.PropTypes.func.isRequired,
	  goForward: _react.PropTypes.func.isRequired,
	  canGo: _react.PropTypes.func,
	  block: _react.PropTypes.func.isRequired
	});

	var routerContext = exports.routerContext = _react.PropTypes.shape({
	  transitionTo: _react.PropTypes.func.isRequired,
	  replaceWith: _react.PropTypes.func.isRequired,
	  blockTransitions: _react.PropTypes.func.isRequired,
	  createHref: _react.PropTypes.func.isRequired
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _MatchProvider = __webpack_require__(10);

	var _MatchProvider2 = _interopRequireDefault(_MatchProvider);

	var _matchPattern = __webpack_require__(11);

	var _matchPattern2 = _interopRequireDefault(_matchPattern);

	var _Broadcasts = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RegisterMatch = function (_React$Component) {
	  _inherits(RegisterMatch, _React$Component);

	  function RegisterMatch() {
	    _classCallCheck(this, RegisterMatch);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  RegisterMatch.prototype.registerMatch = function registerMatch() {
	    var matchContext = this.context.match;
	    var match = this.props.match;


	    if (match && matchContext) {
	      matchContext.addMatch(match);
	    }
	  };

	  RegisterMatch.prototype.componentWillMount = function componentWillMount() {
	    if (this.context.serverRouter) {
	      this.registerMatch();
	    }
	  };

	  RegisterMatch.prototype.componentDidMount = function componentDidMount() {
	    if (!this.context.serverRouter) {
	      this.registerMatch();
	    }
	  };

	  RegisterMatch.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var match = this.context.match;


	    if (match) {
	      if (prevProps.match && !this.props.match) {
	        match.removeMatch(prevProps.match);
	      } else if (!prevProps.match && this.props.match) {
	        match.addMatch(this.props.match);
	      }
	    }
	  };

	  RegisterMatch.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.props.match) {
	      this.context.match.removeMatch(this.props.match);
	    }
	  };

	  RegisterMatch.prototype.render = function render() {
	    return _react2.default.Children.only(this.props.children);
	  };

	  return RegisterMatch;
	}(_react2.default.Component);

	RegisterMatch.contextTypes = {
	  match: _react.PropTypes.object,
	  serverRouter: _react.PropTypes.object
	};


	if (false) {
	  RegisterMatch.propTypes = {
	    children: _react.PropTypes.node.isRequired,
	    match: _react.PropTypes.any
	  };
	}

	var Match = function (_React$Component2) {
	  _inherits(Match, _React$Component2);

	  function Match() {
	    _classCallCheck(this, Match);

	    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
	  }

	  Match.prototype.render = function render() {
	    var _this3 = this;

	    return _react2.default.createElement(
	      _Broadcasts.LocationSubscriber,
	      null,
	      function (location) {
	        var _props = _this3.props,
	            children = _props.children,
	            render = _props.render,
	            Component = _props.component,
	            pattern = _props.pattern,
	            exactly = _props.exactly;
	        var matchContext = _this3.context.match;

	        var parent = matchContext && matchContext.parent;
	        var match = (0, _matchPattern2.default)(pattern, location, exactly, parent);
	        var props = _extends({}, match, { location: location, pattern: pattern });
	        return _react2.default.createElement(
	          RegisterMatch,
	          { match: match },
	          _react2.default.createElement(
	            _MatchProvider2.default,
	            { match: match },
	            children ? children(_extends({ matched: !!match }, props)) : match ? render ? render(props) : _react2.default.createElement(Component, props) : null
	          )
	        );
	      }
	    );
	  };

	  return Match;
	}(_react2.default.Component);

	Match.defaultProps = {
	  exactly: false
	};
	Match.contextTypes = {
	  match: _react.PropTypes.object
	};


	if (false) {
	  Match.propTypes = {
	    pattern: _react.PropTypes.string,
	    exactly: _react.PropTypes.bool,

	    children: _react.PropTypes.func,
	    render: _react.PropTypes.func,
	    component: _react.PropTypes.func
	  };
	}

	exports.default = Match;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MatchProvider = function (_React$Component) {
	  _inherits(MatchProvider, _React$Component);

	  function MatchProvider(props) {
	    _classCallCheck(this, MatchProvider);

	    // **IMPORTANT** we must mutate matches, never reassign, in order for
	    // server rendering to work w/ the two-pass render approach for Miss
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.addMatch = function (match) {
	      _this.matches.push(match);
	    };

	    _this.removeMatch = function (match) {
	      _this.matches.splice(_this.matches.indexOf(match), 1);
	    };

	    _this.matches = [];
	    _this.subscribers = [];
	    _this.hasMatches = null; // use null for initial value
	    _this.serverRouterIndex = null;
	    return _this;
	  }

	  MatchProvider.prototype.getChildContext = function getChildContext() {
	    var _this2 = this;

	    return {
	      match: {
	        addMatch: this.addMatch,
	        removeMatch: this.removeMatch,
	        matches: this.matches,
	        parent: this.props.match,
	        serverRouterIndex: this.serverRouterIndex,
	        subscribe: function subscribe(fn) {
	          _this2.subscribers.push(fn);
	          return function () {
	            _this2.subscribers.splice(_this2.subscribers.indexOf(fn), 1);
	          };
	        }
	      }
	    };
	  };

	  MatchProvider.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.notifySubscribers();
	  };

	  MatchProvider.prototype.componentWillMount = function componentWillMount() {
	    var serverRouter = this.context.serverRouter;

	    if (serverRouter) {
	      this.serverRouterIndex = serverRouter.registerMatchContext(this.matches);
	    }
	  };

	  MatchProvider.prototype.componentDidMount = function componentDidMount() {
	    // React's contract is that cDM of descendants is called before cDM of
	    // ancestors, so here we can safely check if we found a match
	    this.notifySubscribers();
	  };

	  MatchProvider.prototype.notifySubscribers = function notifySubscribers() {
	    var _this3 = this;

	    if (this.subscribers.length) {
	      this.hasMatches = this.matches.length !== 0;
	      this.subscribers.forEach(function (fn) {
	        return fn(_this3.hasMatches);
	      });
	    }
	  };

	  MatchProvider.prototype.render = function render() {
	    return this.props.children;
	  };

	  return MatchProvider;
	}(_react2.default.Component);

	MatchProvider.childContextTypes = {
	  match: _PropTypes.matchContext.isRequired
	};
	MatchProvider.contextTypes = {
	  serverRouter: _react.PropTypes.object
	};


	if (false) {
	  MatchProvider.propTypes = {
	    match: _react.PropTypes.any,
	    children: _react.PropTypes.node
	  };
	}

	exports.default = MatchProvider;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _pathToRegexp = __webpack_require__(12);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	var _MatcherCache = __webpack_require__(14);

	var _MatcherCache2 = _interopRequireDefault(_MatcherCache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// cache[exactly][pattern] contains getMatcher(pattern, exactly)
	var cache = {
	  true: new _MatcherCache2.default(),
	  false: new _MatcherCache2.default()
	};

	var getMatcher = function getMatcher(pattern, exactly) {
	  var exactlyStr = exactly ? 'true' : 'false';
	  var matcher = cache[exactlyStr].get(pattern);

	  if (!matcher) {
	    var keys = [];
	    var regex = (0, _pathToRegexp2.default)(pattern, keys, { end: exactly, strict: true });
	    matcher = { keys: keys, regex: regex };
	    cache[exactlyStr].set(pattern, matcher);
	  }

	  return matcher;
	};

	var parseParams = function parseParams(pattern, match, keys) {
	  return match.slice(1).filter(function (value) {
	    return value !== undefined;
	  }).reduce(function (params, value, index) {
	    params[keys[index].name] = decodeURIComponent(value);
	    return params;
	  }, {});
	};

	var matchPattern = function matchPattern(pattern, location, matchExactly, parent) {
	  var specialCase = !matchExactly && pattern === '/';

	  if (specialCase) {
	    return {
	      params: null,
	      isExact: location.pathname === '/',
	      pathname: '/'
	    };
	  } else {
	    if (parent && pattern.charAt(0) !== '/') {
	      pattern = parent.pathname + (parent.pathname.charAt(parent.pathname.length - 1) !== '/' ? '/' : '') + pattern;
	    }

	    var matcher = getMatcher(pattern, matchExactly);
	    var match = matcher.regex.exec(location.pathname);

	    if (match) {
	      var params = parseParams(pattern, match, matcher.keys);
	      var pathname = match[0];
	      var isExact = pathname === location.pathname;

	      return { params: params, isExact: isExact, pathname: pathname };
	    } else {
	      return null;
	    }
	  }
	};

	exports.default = matchPattern;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(13)

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Simple cache - NEW cached items are added to cachedKeys array. When cache is
	// full, oldest key is removed from array and item is removed from cache

	var DEFAULT_OPTIONS = {
	  limit: 200
	};

	var MatcherCache = function () {
	  function MatcherCache() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MatcherCache);

	    this.cache = {};
	    this.cachedKeys = [];

	    var mergedOptions = _extends({}, DEFAULT_OPTIONS, options);
	    this.options = mergedOptions;
	  }

	  MatcherCache.prototype.set = function set(key, value) {
	    // If this key is not cached add key to cachedKeys array
	    if (this.cache[key] === undefined) {
	      this.cachedKeys.push(key);
	    }
	    this.cache[key] = value;
	    this.checkCacheLimit();
	  };

	  MatcherCache.prototype.get = function get(key) {
	    return this.cache[key];
	  };

	  MatcherCache.prototype.checkCacheLimit = function checkCacheLimit() {
	    // Clear a cache item if we are over limit
	    if (this.cachedKeys.length > this.options.limit) {
	      var keyToUncache = this.cachedKeys.shift();
	      delete this.cache[keyToUncache];
	    }
	  };

	  return MatcherCache;
	}();

	exports.default = MatcherCache;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _Broadcasts = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Miss = function (_React$Component) {
	  _inherits(Miss, _React$Component);

	  function Miss(props, context) {
	    _classCallCheck(this, Miss);

	    // ignore if rendered out of context (probably for unit tests)
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

	    if (context.match && !context.serverRouter) {
	      _this.unsubscribe = _this.context.match.subscribe(function (matchesFound) {
	        _this.setState({
	          noMatchesInContext: !matchesFound
	        });
	      });
	    }

	    if (context.serverRouter) {
	      context.serverRouter.registerMissPresence(context.match.serverRouterIndex);
	    }

	    _this.state = {
	      noMatchesInContext: false
	    };
	    return _this;
	  }

	  Miss.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.unsubscribe) {
	      this.unsubscribe();
	    }
	  };

	  Miss.prototype.render = function render() {
	    var _this2 = this;

	    return _react2.default.createElement(
	      _Broadcasts.LocationSubscriber,
	      null,
	      function (location) {
	        var _props = _this2.props,
	            render = _props.render,
	            Component = _props.component;
	        var noMatchesInContext = _this2.state.noMatchesInContext;
	        var _context = _this2.context,
	            serverRouter = _context.serverRouter,
	            match = _context.match;

	        var noMatchesOnServerContext = serverRouter && serverRouter.missedAtIndex(match.serverRouterIndex);
	        if (noMatchesInContext || noMatchesOnServerContext) {
	          return render ? render({ location: location }) : _react2.default.createElement(Component, { location: location });
	        } else {
	          return null;
	        }
	      }
	    );
	  };

	  return Miss;
	}(_react2.default.Component);

	Miss.contextTypes = {
	  match: _react.PropTypes.object,
	  serverRouter: _react.PropTypes.object
	};


	if (false) {
	  Miss.propTypes = {
	    children: _react.PropTypes.node,
	    render: _react.PropTypes.func,
	    component: _react.PropTypes.func
	  };
	}

	exports.default = Miss;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavigationPrompt = function (_React$Component) {
	  _inherits(NavigationPrompt, _React$Component);

	  function NavigationPrompt() {
	    _classCallCheck(this, NavigationPrompt);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  NavigationPrompt.prototype.block = function block() {
	    if (!this.teardownPrompt) this.teardownPrompt = this.context.history.block(this.props.message);
	  };

	  NavigationPrompt.prototype.unblock = function unblock() {
	    if (this.teardownPrompt) {
	      this.teardownPrompt();
	      this.teardownPrompt = null;
	    }
	  };

	  NavigationPrompt.prototype.componentWillMount = function componentWillMount() {
	    if (this.props.when) this.block();
	  };

	  NavigationPrompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (nextProps.when) {
	      this.block();
	    } else {
	      this.unblock();
	    }
	  };

	  NavigationPrompt.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.unblock();
	  };

	  NavigationPrompt.prototype.render = function render() {
	    return null;
	  };

	  return NavigationPrompt;
	}(_react2.default.Component);

	NavigationPrompt.contextTypes = {
	  history: _PropTypes.historyContext.isRequired
	};
	NavigationPrompt.defaultProps = {
	  when: true
	};


	if (false) {
	  NavigationPrompt.propTypes = {
	    when: _react.PropTypes.bool,
	    message: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired
	  };
	}

	exports.default = NavigationPrompt;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Redirect = function (_React$Component) {
	  _inherits(Redirect, _React$Component);

	  function Redirect() {
	    _classCallCheck(this, Redirect);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  Redirect.prototype.componentWillMount = function componentWillMount() {
	    if (this.context.serverRouter) this.redirect();
	  };

	  Redirect.prototype.componentDidMount = function componentDidMount() {
	    this.redirect();
	  };

	  Redirect.prototype.redirect = function redirect() {
	    var router = this.context.router;
	    var _props = this.props,
	        to = _props.to,
	        push = _props.push;
	    // so that folks can unit test w/o hassle

	    if (router) {
	      var navigate = push ? router.transitionTo : router.replaceWith;
	      navigate(to);
	    }
	  };

	  Redirect.prototype.render = function render() {
	    return null;
	  };

	  return Redirect;
	}(_react2.default.Component);

	Redirect.defaultProps = {
	  push: false
	};
	Redirect.contextTypes = {
	  router: _PropTypes.routerContext,
	  serverRouter: _react.PropTypes.object
	};


	if (false) {
	  Redirect.propTypes = {
	    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
	    push: _react.PropTypes.bool
	  };
	}

	exports.default = Redirect;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _createBrowserHistory = __webpack_require__(19);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _StaticRouter = __webpack_require__(28);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	var _History = __webpack_require__(33);

	var _History2 = _interopRequireDefault(_History);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var BrowserRouter = function BrowserRouter(_ref) {
	  var basename = _ref.basename,
	      forceRefresh = _ref.forceRefresh,
	      getUserConfirmation = _ref.getUserConfirmation,
	      keyLength = _ref.keyLength,
	      routerProps = _objectWithoutProperties(_ref, ['basename', 'forceRefresh', 'getUserConfirmation', 'keyLength']);

	  return _react2.default.createElement(
	    _History2.default,
	    {
	      createHistory: _createBrowserHistory2.default,
	      historyOptions: {
	        basename: basename,
	        forceRefresh: forceRefresh,
	        getUserConfirmation: getUserConfirmation,
	        keyLength: keyLength
	      }
	    },
	    function (_ref2) {
	      var history = _ref2.history,
	          action = _ref2.action,
	          location = _ref2.location;
	      return _react2.default.createElement(_StaticRouter2.default, _extends({
	        action: action,
	        location: location,
	        basename: basename,
	        onPush: history.push,
	        onReplace: history.replace,
	        blockTransitions: history.block
	      }, routerProps));
	    }
	  );
	};

	if (false) {
	  BrowserRouter.propTypes = {
	    basename: _react.PropTypes.string,
	    forceRefresh: _react.PropTypes.bool,
	    getUserConfirmation: _react.PropTypes.func,
	    keyLength: _react.PropTypes.number,
	    children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
	  };
	}

	exports.default = BrowserRouter;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _LocationUtils = __webpack_require__(21);

	var _PathUtils = __webpack_require__(24);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _ExecutionEnvironment = __webpack_require__(26);

	var _DOMUtils = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PopStateEvent = 'popstate';
	var HashChangeEvent = 'hashchange';

	var getHistoryState = function getHistoryState() {
	  try {
	    return window.history.state || {};
	  } catch (e) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/mjackson/history/pull/289
	    return {};
	  }
	};

	/**
	 * Creates a history object that uses the HTML5 history API including
	 * pushState, replaceState, and the popstate event.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ?  false ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var globalHistory = window.history;
	  var canUseHistory = (0, _DOMUtils.supportsHistory)();
	  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

	  var _props$basename = props.basename;
	  var basename = _props$basename === undefined ? '' : _props$basename;
	  var _props$forceRefresh = props.forceRefresh;
	  var forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh;
	  var _props$getUserConfirm = props.getUserConfirmation;
	  var getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm;
	  var _props$keyLength = props.keyLength;
	  var keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


	  var getDOMLocation = function getDOMLocation(historyState) {
	    var _ref = historyState || {};

	    var key = _ref.key;
	    var state = _ref.state;
	    var _window$location = window.location;
	    var pathname = _window$location.pathname;
	    var search = _window$location.search;
	    var hash = _window$location.hash;


	    var path = pathname + search + hash;

	    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

	    return _extends({}, (0, _PathUtils.parsePath)(path), {
	      state: state,
	      key: key
	    });
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };

	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = globalHistory.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var handlePopState = function handlePopState(event) {
	    if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	    handlePop(getDOMLocation(event.state));
	  };

	  var handleHashChange = function handleHashChange() {
	    handlePop(getDOMLocation(getHistoryState()));
	  };

	  var forceNextPop = false;

	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      (function () {
	        var action = 'POP';

	        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	          if (ok) {
	            setState({ action: action, location: location });
	          } else {
	            revertPop(location);
	          }
	        });
	      })();
	    }
	  };

	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;

	    // TODO: We could probably make this more reliable by
	    // keeping a list of keys we've seen in sessionStorage.
	    // Instead, we just default to 0 for keys we don't know.

	    var toIndex = allKeys.indexOf(toLocation.key);

	    if (toIndex === -1) toIndex = 0;

	    var fromIndex = allKeys.indexOf(fromLocation.key);

	    if (fromIndex === -1) fromIndex = 0;

	    var delta = toIndex - fromIndex;

	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };

	  var initialLocation = getDOMLocation(getHistoryState());
	  var allKeys = [initialLocation.key];

	  // Public interface

	  var push = function push(path, state) {
	     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      var url = basename + (0, _PathUtils.createPath)(location);
	      var key = location.key;
	      var state = location.state;


	      if (canUseHistory) {
	        globalHistory.pushState({ key: key, state: state }, null, url);

	        if (forceRefresh) {
	          window.location.href = url;
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);
	          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

	          nextKeys.push(location.key);
	          allKeys = nextKeys;

	          setState({ action: action, location: location });
	        }
	      } else {
	         false ? (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;

	        window.location.href = url;
	      }
	    });
	  };

	  var replace = function replace(path, state) {
	     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      var url = basename + (0, _PathUtils.createPath)(location);
	      var key = location.key;
	      var state = location.state;


	      if (canUseHistory) {
	        globalHistory.replaceState({ key: key, state: state }, null, url);

	        if (forceRefresh) {
	          window.location.replace(url);
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);

	          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

	          setState({ action: action, location: location });
	        }
	      } else {
	         false ? (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;

	        window.location.replace(url);
	      }
	    });
	  };

	  var go = function go(n) {
	    globalHistory.go(n);
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var listenerCount = 0;

	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;

	    if (listenerCount === 1) {
	      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

	      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	    } else if (listenerCount === 0) {
	      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

	      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	    }
	  };

	  var isBlocked = false;

	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    var unblock = transitionManager.setPrompt(prompt);

	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }

	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }

	      return unblock();
	    };
	  };

	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);

	    return function () {
	      checkDOMListeners(-1);
	      return unlisten();
	    };
	  };

	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createBrowserHistory;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (false) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.locationsAreEqual = exports.createLocation = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _resolvePathname = __webpack_require__(22);

	var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

	var _valueEqual = __webpack_require__(23);

	var _valueEqual2 = _interopRequireDefault(_valueEqual);

	var _PathUtils = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
	  var location = void 0;
	  if (typeof path === 'string') {
	    // Two-arg form: push(path, state)
	    location = (0, _PathUtils.parsePath)(path);
	    location.state = state;
	  } else {
	    // One-arg form: push(location)
	    location = _extends({}, path);

	    if (location.pathname === undefined) location.pathname = '';

	    if (location.search) {
	      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
	    } else {
	      location.search = '';
	    }

	    if (location.hash) {
	      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
	    } else {
	      location.hash = '';
	    }

	    if (state !== undefined && location.state === undefined) location.state = state;
	  }

	  location.key = key;

	  if (currentLocation) {
	    // Resolve incomplete/relative pathname relative to current location.
	    if (!location.pathname) {
	      location.pathname = currentLocation.pathname;
	    } else if (location.pathname.charAt(0) !== '/') {
	      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
	    }
	  }

	  return location;
	};

	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var isAbsolute = function isAbsolute(pathname) {
	  return pathname.charAt(0) === '/';
	};

	// About 1.5x faster than the two-arg version of Array#splice()
	var spliceOne = function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }list.pop();
	};

	// This implementation is based heavily on node's url.parse
	var resolvePathname = function resolvePathname(to) {
	  var from = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var toParts = to && to.split('/') || [];
	  var fromParts = from && from.split('/') || [];

	  var isToAbs = to && isAbsolute(to);
	  var isFromAbs = from && isAbsolute(from);
	  var mustEndAbs = isToAbs || isFromAbs;

	  if (to && isAbsolute(to)) {
	    // to is absolute
	    fromParts = toParts;
	  } else if (toParts.length) {
	    // to is relative, drop the filename
	    fromParts.pop();
	    fromParts = fromParts.concat(toParts);
	  }

	  if (!fromParts.length) return '/';

	  var hasTrailingSlash = void 0;
	  if (fromParts.length) {
	    var last = fromParts[fromParts.length - 1];
	    hasTrailingSlash = last === '.' || last === '..' || last === '';
	  } else {
	    hasTrailingSlash = false;
	  }

	  var up = 0;
	  for (var i = fromParts.length; i >= 0; i--) {
	    var part = fromParts[i];

	    if (part === '.') {
	      spliceOne(fromParts, i);
	    } else if (part === '..') {
	      spliceOne(fromParts, i);
	      up++;
	    } else if (up) {
	      spliceOne(fromParts, i);
	      up--;
	    }
	  }

	  if (!mustEndAbs) for (; up--; up) {
	    fromParts.unshift('..');
	  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

	  var result = fromParts.join('/');

	  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

	  return result;
	};

	module.exports = resolvePathname;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var valueEqual = function valueEqual(a, b) {
	  if (a === b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    if (!Array.isArray(b) || a.length !== b.length) return false;

	    return a.every(function (item, index) {
	      return valueEqual(item, b[index]);
	    });
	  }

	  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

	  if (aType !== bType) return false;

	  if (aType === 'object') {
	    var aValue = a.valueOf();
	    var bValue = b.valueOf();

	    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);

	    if (aKeys.length !== bKeys.length) return false;

	    return aKeys.every(function (key) {
	      return valueEqual(a[key], b[key]);
	    });
	  }

	  return false;
	};

	exports.default = valueEqual;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path : '/' + path;
	};

	var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path.substr(1) : path;
	};

	var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
	  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
	};

	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = path || '/';
	  var search = '';
	  var hash = '';

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substr(hashIndex);
	    pathname = pathname.substr(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substr(searchIndex);
	    pathname = pathname.substr(0, searchIndex);
	  }

	  return {
	    pathname: pathname,
	    search: search === '?' ? '' : search,
	    hash: hash === '#' ? '' : hash
	  };
	};

	var createPath = exports.createPath = function createPath(location) {
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;


	  var path = pathname || '/';

	  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

	  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

	  return path;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createTransitionManager = function createTransitionManager() {
	  var prompt = null;

	  var setPrompt = function setPrompt(nextPrompt) {
	     false ? (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time') : void 0;

	    prompt = nextPrompt;

	    return function () {
	      if (prompt === nextPrompt) prompt = null;
	    };
	  };

	  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
	    // TODO: If another transition starts while we're still confirming
	    // the previous one, we may end up in a weird state. Figure out the
	    // best way to handle this.
	    if (prompt != null) {
	      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

	      if (typeof result === 'string') {
	        if (typeof getUserConfirmation === 'function') {
	          getUserConfirmation(result, callback);
	        } else {
	           false ? (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;

	          callback(true);
	        }
	      } else {
	        // Return false from a transition hook to cancel the transition.
	        callback(result !== false);
	      }
	    } else {
	      callback(true);
	    }
	  };

	  var listeners = [];

	  var appendListener = function appendListener(listener) {
	    listeners.push(listener);

	    return function () {
	      listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };

	  var notifyListeners = function notifyListeners() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return listeners.forEach(function (listener) {
	      return listener.apply(undefined, args);
	    });
	  };

	  return {
	    setPrompt: setPrompt,
	    confirmTransitionTo: confirmTransitionTo,
	    appendListener: appendListener,
	    notifyListeners: notifyListeners
	  };
	};

	exports.default = createTransitionManager;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};

	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};

	var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
	  return callback(window.confirm(message));
	}; // eslint-disable-line no-alert

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;

	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

	  return window.history && 'pushState' in window.history;
	};

	/**
	 * Returns true if browser fires popstate on hash change.
	 * IE10 and IE11 do not.
	 */
	var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
	  return window.navigator.userAgent.indexOf('Trident') === -1;
	};

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _queryString = __webpack_require__(29);

	var _MatchProvider = __webpack_require__(10);

	var _MatchProvider2 = _interopRequireDefault(_MatchProvider);

	var _Broadcasts = __webpack_require__(3);

	var _LocationUtils = __webpack_require__(32);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var stringifyQuery = function stringifyQuery(query) {
	  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
	};

	var StaticRouter = function (_React$Component) {
	  _inherits(StaticRouter, _React$Component);

	  function StaticRouter() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, StaticRouter);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.transitionTo = function (location) {
	      _this.props.onPush(_this.createLocation(location));
	    }, _this.replaceWith = function (location) {
	      _this.props.onReplace(_this.createLocation(location));
	    }, _this.blockTransitions = function (prompt) {
	      return _this.props.blockTransitions(prompt);
	    }, _this.createHref = function (to) {
	      var path = (0, _LocationUtils.createRouterPath)(to, _this.props.stringifyQuery);

	      if (_this.props.basename) if (path === '/') path = _this.props.basename;else if (path.length >= 2 && path.charAt(0) === '/' && path.charAt(1) === '?') path = _this.props.basename + path.substring(1);else path = _this.props.basename + path;

	      return _this.props.createHref(path);
	    }, _this.state = {
	      location: null
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  StaticRouter.prototype.createLocation = function createLocation(location) {
	    var _props = this.props,
	        parseQueryString = _props.parseQueryString,
	        stringifyQuery = _props.stringifyQuery;

	    return (0, _LocationUtils.createRouterLocation)(location, parseQueryString, stringifyQuery);
	  };

	  StaticRouter.prototype.getRouterContext = function getRouterContext() {
	    return {
	      transitionTo: this.transitionTo,
	      replaceWith: this.replaceWith,
	      blockTransitions: this.blockTransitions,
	      createHref: this.createHref
	    };
	  };

	  StaticRouter.prototype.getChildContext = function getChildContext() {
	    return {
	      router: this.getRouterContext()
	    };
	  };

	  StaticRouter.prototype.componentWillMount = function componentWillMount() {
	    this.setState({
	      location: this.createLocation(this.props.location)
	    });
	  };

	  StaticRouter.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var nextLocation = this.createLocation(nextProps.location);

	    if (!(0, _LocationUtils.locationsAreEqual)(this.state.location, nextLocation)) this.setState({ location: nextLocation });
	  };

	  StaticRouter.prototype.render = function render() {
	    var location = this.state.location;
	    var _props2 = this.props,
	        action = _props2.action,
	        children = _props2.children;


	    return _react2.default.createElement(
	      _Broadcasts.LocationBroadcast,
	      { value: location },
	      _react2.default.createElement(
	        _MatchProvider2.default,
	        null,
	        typeof children === 'function' ? children({ action: action, location: location, router: this.getRouterContext() }) : _react2.default.Children.only(children)
	      )
	    );
	  };

	  return StaticRouter;
	}(_react2.default.Component);

	StaticRouter.defaultProps = {
	  stringifyQuery: stringifyQuery,
	  parseQueryString: _queryString.parse,
	  createHref: function createHref(path) {
	    return path;
	  }
	};
	StaticRouter.childContextTypes = {
	  router: _PropTypes.routerContext.isRequired
	};


	if (false) {
	  StaticRouter.propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]),

	    action: _PropTypes.action.isRequired,
	    location: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]).isRequired,

	    onPush: _react.PropTypes.func.isRequired,
	    onReplace: _react.PropTypes.func.isRequired,
	    blockTransitions: _react.PropTypes.func,

	    stringifyQuery: _react.PropTypes.func.isRequired,
	    parseQueryString: _react.PropTypes.func.isRequired,
	    createHref: _react.PropTypes.func.isRequired, // TODO: Clarify why this is useful

	    basename: _react.PropTypes.string // TODO: Feels like we should be able to remove this
	  };
	}

	exports.default = StaticRouter;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(30);
	var objectAssign = __webpack_require__(31);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createRouterPath = exports.createRouterLocation = exports.locationsAreEqual = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _LocationUtils = __webpack_require__(21);

	Object.defineProperty(exports, 'locationsAreEqual', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.locationsAreEqual;
	  }
	});

	var _PathUtils = __webpack_require__(24);

	var createRouterLocation = exports.createRouterLocation = function createRouterLocation(input, parseQueryString, stringifyQuery) {
	  if (typeof input === 'string') {
	    var location = (0, _PathUtils.parsePath)(input);
	    location.query = location.search !== '' ? parseQueryString(location.search) : null;
	    return location;
	  } else {
	    // got a location descriptor
	    return {
	      pathname: input.pathname || '',
	      search: input.search || (input.query ? '?' + stringifyQuery(input.query) : ''),
	      hash: input.hash || '',
	      state: input.state || null,
	      query: input.query || (input.search ? parseQueryString(input.search) : null),
	      key: input.key
	    };
	  }
	};

	var createRouterPath = exports.createRouterPath = function createRouterPath(input, stringifyQuery) {
	  return typeof input === 'string' ? input : (0, _PathUtils.createPath)(_extends({}, input, {
	    search: input.search || (input.query ? '?' + stringifyQuery(input.query) : '')
	  }));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _PropTypes = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * The common public API for all *History components.
	 */
	var History = function (_React$Component) {
	  _inherits(History, _React$Component);

	  function History() {
	    _classCallCheck(this, History);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  History.prototype.getChildContext = function getChildContext() {
	    return {
	      history: this.history
	    };
	  };

	  History.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    var _props = this.props,
	        createHistory = _props.createHistory,
	        historyOptions = _props.historyOptions;

	    this.history = createHistory(historyOptions);
	    this.unlisten = this.history.listen(function () {
	      return _this2.forceUpdate();
	    });
	  };

	  History.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.unlisten();
	  };

	  History.prototype.render = function render() {
	    var history = this.history;
	    var location = history.location,
	        action = history.action;


	    return this.props.children({
	      history: history,
	      location: location,
	      action: action
	    });
	  };

	  return History;
	}(_react2.default.Component);

	History.childContextTypes = {
	  history: _PropTypes.historyContext.isRequired
	};


	if (false) {
	  History.propTypes = {
	    children: _react.PropTypes.func.isRequired,
	    createHistory: _react.PropTypes.func.isRequired,
	    historyOptions: _react.PropTypes.object
	  };
	}

	exports.default = History;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _createHashHistory = __webpack_require__(35);

	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

	var _History = __webpack_require__(33);

	var _History2 = _interopRequireDefault(_History);

	var _PathUtils = __webpack_require__(24);

	var _StaticRouter = __webpack_require__(28);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var createHref = function createHref(hashType) {
	  return function (path) {
	    var newPath = void 0;

	    switch (hashType) {
	      case 'hashbang':
	        newPath = path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
	        break;
	      case 'noslash':
	        newPath = (0, _PathUtils.stripLeadingSlash)(path);
	        break;
	      case 'slash':
	      default:
	        newPath = (0, _PathUtils.addLeadingSlash)(path);
	        break;
	    }

	    return '#' + newPath;
	  };
	};

	/**
	 * A router that uses the URL hash.
	 */
	var HashRouter = function HashRouter(_ref) {
	  var basename = _ref.basename,
	      getUserConfirmation = _ref.getUserConfirmation,
	      hashType = _ref.hashType,
	      routerProps = _objectWithoutProperties(_ref, ['basename', 'getUserConfirmation', 'hashType']);

	  return _react2.default.createElement(
	    _History2.default,
	    {
	      createHistory: _createHashHistory2.default,
	      historyOptions: {
	        basename: basename,
	        getUserConfirmation: getUserConfirmation,
	        hashType: hashType
	      }
	    },
	    function (_ref2) {
	      var history = _ref2.history,
	          action = _ref2.action,
	          location = _ref2.location;
	      return _react2.default.createElement(_StaticRouter2.default, _extends({
	        action: action,
	        location: location,
	        basename: basename,
	        onPush: history.push,
	        onReplace: history.replace,
	        blockTransitions: history.block,
	        createHref: createHref(hashType)
	      }, routerProps));
	    }
	  );
	};

	if (false) {
	  HashRouter.propTypes = {
	    basename: _react.PropTypes.string,
	    getUserConfirmation: _react.PropTypes.func,
	    hashType: _react.PropTypes.string,
	    children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
	  };
	}

	exports.default = HashRouter;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _LocationUtils = __webpack_require__(21);

	var _PathUtils = __webpack_require__(24);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	var _ExecutionEnvironment = __webpack_require__(26);

	var _DOMUtils = __webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HashChangeEvent = 'hashchange';

	var HashPathCoders = {
	  hashbang: {
	    encodePath: function encodePath(path) {
	      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
	    },
	    decodePath: function decodePath(path) {
	      return path.charAt(0) === '!' ? path.substr(1) : path;
	    }
	  },
	  noslash: {
	    encodePath: _PathUtils.stripLeadingSlash,
	    decodePath: _PathUtils.addLeadingSlash
	  },
	  slash: {
	    encodePath: _PathUtils.addLeadingSlash,
	    decodePath: _PathUtils.addLeadingSlash
	  }
	};

	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var hashIndex = href.indexOf('#');
	  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
	};

	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};

	var replaceHashPath = function replaceHashPath(path) {
	  var hashIndex = window.location.href.indexOf('#');

	  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
	};

	var createHashHistory = function createHashHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ?  false ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var globalHistory = window.history;
	  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

	  var _props$basename = props.basename;
	  var basename = _props$basename === undefined ? '' : _props$basename;
	  var _props$getUserConfirm = props.getUserConfirmation;
	  var getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm;
	  var _props$hashType = props.hashType;
	  var hashType = _props$hashType === undefined ? 'slash' : _props$hashType;
	  var _HashPathCoders$hashT = HashPathCoders[hashType];
	  var encodePath = _HashPathCoders$hashT.encodePath;
	  var decodePath = _HashPathCoders$hashT.decodePath;


	  var getDOMLocation = function getDOMLocation() {
	    var path = decodePath(getHashPath());

	    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

	    return (0, _PathUtils.parsePath)(path);
	  };

	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = globalHistory.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var forceNextPop = false;
	  var ignorePath = null;

	  var handleHashChange = function handleHashChange() {
	    var path = getHashPath();
	    var encodedPath = encodePath(path);

	    if (path !== encodedPath) {
	      // Ensure we always have a properly-encoded hash.
	      replaceHashPath(encodedPath);
	    } else {
	      var location = getDOMLocation();
	      var prevLocation = history.location;

	      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

	      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

	      ignorePath = null;

	      handlePop(location);
	    }
	  };

	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      (function () {
	        var action = 'POP';

	        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	          if (ok) {
	            setState({ action: action, location: location });
	          } else {
	            revertPop(location);
	          }
	        });
	      })();
	    }
	  };

	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;

	    // TODO: We could probably make this more reliable by
	    // keeping a list of paths we've seen in sessionStorage.
	    // Instead, we just default to 0 for paths we don't know.

	    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

	    if (toIndex === -1) toIndex = 0;

	    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

	    if (fromIndex === -1) fromIndex = 0;

	    var delta = toIndex - fromIndex;

	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };

	  // Ensure the hash is encoded properly before doing anything else.
	  var path = getHashPath();
	  var encodedPath = encodePath(path);

	  if (path !== encodedPath) replaceHashPath(encodedPath);

	  var initialLocation = getDOMLocation();
	  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

	  // Public interface

	  var push = function push(path, state) {
	     false ? (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;

	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      var path = (0, _PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;

	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a PUSH, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        pushHashPath(encodedPath);

	        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
	        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

	        nextPaths.push(path);
	        allPaths = nextPaths;

	        setState({ action: action, location: location });
	      } else {
	         false ? (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;

	        setState();
	      }
	    });
	  };

	  var replace = function replace(path, state) {
	     false ? (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;

	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      var path = (0, _PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;

	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        replaceHashPath(encodedPath);
	      }

	      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

	      if (prevIndex !== -1) allPaths[prevIndex] = path;

	      setState({ action: action, location: location });
	    });
	  };

	  var go = function go(n) {
	     false ? (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

	    globalHistory.go(n);
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var listenerCount = 0;

	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;

	    if (listenerCount === 1) {
	      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	    } else if (listenerCount === 0) {
	      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	    }
	  };

	  var isBlocked = false;

	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    var unblock = transitionManager.setPrompt(prompt);

	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }

	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }

	      return unblock();
	    };
	  };

	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);

	    return function () {
	      checkDOMListeners(-1);
	      return unlisten();
	    };
	  };

	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createHashHistory;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _createMemoryHistory = __webpack_require__(37);

	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

	var _StaticRouter = __webpack_require__(28);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	var _History = __webpack_require__(33);

	var _History2 = _interopRequireDefault(_History);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var MemoryRouter = function MemoryRouter(_ref) {
	  var getUserConfirmation = _ref.getUserConfirmation,
	      initialEntries = _ref.initialEntries,
	      initialIndex = _ref.initialIndex,
	      keyLength = _ref.keyLength,
	      routerProps = _objectWithoutProperties(_ref, ['getUserConfirmation', 'initialEntries', 'initialIndex', 'keyLength']);

	  return _react2.default.createElement(
	    _History2.default,
	    {
	      createHistory: _createMemoryHistory2.default,
	      historyOptions: {
	        getUserConfirmation: getUserConfirmation,
	        initialEntries: initialEntries,
	        initialIndex: initialIndex,
	        keyLength: keyLength
	      }
	    },
	    function (_ref2) {
	      var history = _ref2.history,
	          action = _ref2.action,
	          location = _ref2.location;
	      return _react2.default.createElement(_StaticRouter2.default, _extends({
	        action: action,
	        location: location,
	        onPush: history.push,
	        onReplace: history.replace,
	        blockTransitions: history.block
	      }, routerProps));
	    }
	  );
	};

	if (false) {
	  MemoryRouter.propTypes = {
	    getUserConfirmation: _react.PropTypes.func,
	    initialEntries: _react.PropTypes.array,
	    initialIndex: _react.PropTypes.number,
	    keyLength: _react.PropTypes.number,
	    children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
	  };
	}

	exports.default = MemoryRouter;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(20);

	var _warning2 = _interopRequireDefault(_warning);

	var _LocationUtils = __webpack_require__(21);

	var _createTransitionManager = __webpack_require__(25);

	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clamp = function clamp(n, lowerBound, upperBound) {
	  return Math.min(Math.max(n, lowerBound), upperBound);
	};

	/**
	 * Creates a history object that stores locations in memory.
	 */
	var createMemoryHistory = function createMemoryHistory() {
	  var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getUserConfirmation = props.getUserConfirmation;
	  var _props$initialEntries = props.initialEntries;
	  var initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries;
	  var _props$initialIndex = props.initialIndex;
	  var initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex;
	  var _props$keyLength = props.keyLength;
	  var keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = history.entries.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };

	  var index = clamp(initialIndex, 0, initialEntries.length - 1);
	  var entries = initialEntries.map(function (entry, index) {
	    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, index ? createKey() : undefined) : (0, _LocationUtils.createLocation)(entry, undefined, index ? entry.key || createKey() : undefined);
	  });

	  // Public interface

	  var push = function push(path, state) {
	     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

	    var action = 'PUSH';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      var prevIndex = history.index;
	      var nextIndex = prevIndex + 1;

	      var nextEntries = history.entries.slice(0);
	      if (nextEntries.length > nextIndex) {
	        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
	      } else {
	        nextEntries.push(location);
	      }

	      setState({
	        action: action,
	        location: location,
	        index: nextIndex,
	        entries: nextEntries
	      });
	    });
	  };

	  var replace = function replace(path, state) {
	     false ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

	    var action = 'REPLACE';
	    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (!ok) return;

	      history.entries[history.index] = location;

	      setState({ action: action, location: location });
	    });
	  };

	  var go = function go(n) {
	    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

	    var action = 'POP';
	    var location = history.entries[nextIndex];

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
	      if (ok) {
	        setState({
	          action: action,
	          location: location,
	          index: nextIndex
	        });
	      } else {
	        // Mimic the behavior of DOM histories by
	        // causing a render after a cancelled POP.
	        setState();
	      }
	    });
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var canGo = function canGo(n) {
	    var nextIndex = history.index + n;
	    return nextIndex >= 0 && nextIndex < history.entries.length;
	  };

	  var block = function block() {
	    var prompt = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    return transitionManager.setPrompt(prompt);
	  };

	  var listen = function listen(listener) {
	    return transitionManager.appendListener(listener);
	  };

	  var history = {
	    length: entries.length,
	    action: 'POP',
	    location: entries[index],
	    index: index,
	    entries: entries,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    canGo: canGo,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createMemoryHistory;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _StaticRouter = __webpack_require__(28);

	var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ServerRouter = function (_React$Component) {
	  _inherits(ServerRouter, _React$Component);

	  function ServerRouter() {
	    _classCallCheck(this, ServerRouter);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  ServerRouter.prototype.getChildContext = function getChildContext() {
	    return {
	      serverRouter: this.props.context
	    };
	  };

	  ServerRouter.prototype.render = function render() {
	    var _props = this.props,
	        context = _props.context,
	        location = _props.location,
	        basename = _props.basename,
	        rest = _objectWithoutProperties(_props, ['context', 'location', 'basename']);

	    var redirect = function redirect(location) {
	      context.setRedirect(location);
	    };
	    return _react2.default.createElement(_StaticRouter2.default, _extends({
	      action: 'POP',
	      location: location,
	      basename: basename,
	      onReplace: redirect,
	      onPush: redirect
	    }, rest));
	  };

	  return ServerRouter;
	}(_react2.default.Component);

	ServerRouter.childContextTypes = {
	  serverRouter: _react.PropTypes.object.isRequired
	};


	if (false) {
	  ServerRouter.propTypes = {
	    basename: _react.PropTypes.string,
	    context: _react.PropTypes.object.isRequired,
	    location: _react.PropTypes.string.isRequired,
	    children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node])
	  };
	}

	exports.default = ServerRouter;

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var k = function k() {};

	var createServerRenderContext = function createServerRenderContext() {
	  var flushed = false;
	  var redirect = null;
	  var matchContexts = [
	    /* { hasMissComponent: bool, matchesByIdentity: [] } */
	  ];

	  var setRedirect = flushed ? k : function (location) {
	    if (!redirect) redirect = location;
	  };

	  var registerMatchContext = flushed ? k : function (matchesByIdentity) {
	    return matchContexts.push({
	      hasMissComponent: false,
	      matchesByIdentity: matchesByIdentity
	    }) - 1;
	  };

	  // We need to know there is a potential to miss, if there are no Miss
	  // components under a Match, then we need to not worry about it
	  var registerMissPresence = flushed ? k : function (index) {
	    matchContexts[index].hasMissComponent = true;
	  };

	  var getResult = function getResult() {
	    flushed = true;
	    var missed = matchContexts.some(function (context, index) {
	      return missedAtIndex(index);
	    });

	    return {
	      redirect: redirect,
	      missed: missed
	    };
	  };

	  var missedAtIndex = function missedAtIndex(index) {
	    var context = matchContexts[index];
	    return context.matchesByIdentity.length === 0 && context.hasMissComponent;
	  };

	  return {
	    setRedirect: setRedirect,
	    registerMatchContext: registerMatchContext,
	    registerMissPresence: registerMissPresence,
	    getResult: getResult,
	    missedAtIndex: missedAtIndex
	  };
	};

	exports.default = createServerRenderContext;

/***/ }
/******/ ])
});
;