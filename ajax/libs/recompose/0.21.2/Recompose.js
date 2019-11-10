(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Recompose"] = factory(require("react"));
	else
		root["Recompose"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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

	module.exports = __webpack_require__(29);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var createHelper = function createHelper(func, helperName) {
	  var setDisplayName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	  var noArgs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  if (false) {
	    var _ret = function () {
	      /* eslint-disable global-require */
	      var wrapDisplayName = require('./wrapDisplayName').default;
	      /* eslint-enable global-require */

	      if (noArgs) {
	        return {
	          v: function v(BaseComponent) {
	            var Component = func(BaseComponent);
	            Component.displayName = wrapDisplayName(BaseComponent, helperName);
	            return Component;
	          }
	        };
	      }

	      return {
	        v: function v() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          return function (BaseComponent) {
	            var Component = func.apply(undefined, args)(BaseComponent);
	            Component.displayName = wrapDisplayName(BaseComponent, helperName);
	            return Component;
	          };
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }

	  return func;
	};

	exports.default = createHelper;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createEagerElementUtil = __webpack_require__(18);

	var _createEagerElementUtil2 = _interopRequireDefault(_createEagerElementUtil);

	var _isReferentiallyTransparentFunctionComponent = __webpack_require__(16);

	var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createFactory = function createFactory(type) {
	  var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(type);
	  return function (p, c) {
	    return (0, _createEagerElementUtil2.default)(false, isReferentiallyTransparent, type, p, c);
	  };
	};

	exports.default = createFactory;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapProps = function mapProps(propsMapper) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return function (props) {
	      return factory(propsMapper(props));
	    };
	  };
	};

	exports.default = (0, _createHelper2.default)(mapProps, 'mapProps');

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var _config = {
	  fromESObservable: null,
	  toESObservable: null
	};

	var configureObservable = function configureObservable(c) {
	  _config = c;
	};

	var config = exports.config = {
	  fromESObservable: function fromESObservable(observable) {
	    return typeof _config.fromESObservable === 'function' ? _config.fromESObservable(observable) : observable;
	  },
	  toESObservable: function toESObservable(stream) {
	    return typeof _config.toESObservable === 'function' ? _config.toESObservable(stream) : stream;
	  }
	};

	exports.default = configureObservable;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _shallowEqual = __webpack_require__(50);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _shallowEqual2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var getDisplayName = function getDisplayName(Component) {
	  if (typeof Component === 'string') {
	    return Component;
	  }

	  if (!Component) {
	    return undefined;
	  }

	  return Component.displayName || Component.name || 'Component';
	};

	exports.default = getDisplayName;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var isClassComponent = function isClassComponent(Component) {
	  return Boolean(Component && Component.prototype && typeof Component.prototype.isReactComponent === 'object');
	};

	exports.default = isClassComponent;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setStatic = function setStatic(key, value) {
	  return function (BaseComponent) {
	    /* eslint-disable no-param-reassign */
	    BaseComponent[key] = value;
	    /* eslint-enable no-param-reassign */
	    return BaseComponent;
	  };
	};

	exports.default = (0, _createHelper2.default)(setStatic, 'setStatic', false);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var shouldUpdate = function shouldUpdate(test) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class, _Component);

	      function _class() {
	        _classCallCheck(this, _class);

	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	      }

	      _class.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	        return test(this.props, nextProps);
	      };

	      _class.prototype.render = function render() {
	        return factory(this.props);
	      };

	      return _class;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(shouldUpdate, 'shouldUpdate');

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var omit = function omit(obj, keys) {
	  var rest = _objectWithoutProperties(obj, []);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (rest.hasOwnProperty(key)) {
	      delete rest[key];
	    }
	  }
	  return rest;
	};

	exports.default = omit;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var pick = function pick(obj, keys) {
	  var result = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (obj.hasOwnProperty(key)) {
	      result[key] = obj[key];
	    }
	  }
	  return result;
	};

	exports.default = pick;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(52);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.componentFromStreamWithConfig = undefined;

	var _react = __webpack_require__(3);

	var _changeEmitter = __webpack_require__(19);

	var _symbolObservable = __webpack_require__(13);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	var _setObservableConfig = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var componentFromStreamWithConfig = exports.componentFromStreamWithConfig = function componentFromStreamWithConfig(config) {
	  return function (propsToVdom) {
	    return function (_Component) {
	      _inherits(ComponentFromStream, _Component);

	      function ComponentFromStream() {
	        var _config$fromESObserva;

	        var _temp, _this, _ret;

	        _classCallCheck(this, ComponentFromStream);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { vdom: null }, _this.propsEmitter = (0, _changeEmitter.createChangeEmitter)(), _this.props$ = config.fromESObservable((_config$fromESObserva = {
	          subscribe: function subscribe(observer) {
	            var unsubscribe = _this.propsEmitter.listen(function (props) {
	              return observer.next(props);
	            });
	            return { unsubscribe: unsubscribe };
	          }
	        }, _config$fromESObserva[_symbolObservable2.default] = function () {
	          return this;
	        }, _config$fromESObserva)), _this.vdom$ = config.toESObservable(propsToVdom(_this.props$)), _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      // Stream of props


	      // Stream of vdom


	      ComponentFromStream.prototype.componentWillMount = function componentWillMount() {
	        var _this2 = this;

	        // Subscribe to child prop changes so we know when to re-render
	        this.subscription = this.vdom$.subscribe({
	          next: function next(vdom) {
	            _this2.setState({ vdom: vdom });
	          }
	        });
	        this.propsEmitter.emit(this.props);
	      };

	      ComponentFromStream.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        // Receive new props from the owner
	        this.propsEmitter.emit(nextProps);
	      };

	      ComponentFromStream.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	        return nextState.vdom !== this.state.vdom;
	      };

	      ComponentFromStream.prototype.componentWillUnmount = function componentWillUnmount() {
	        // Clean-up subscription before un-mounting
	        this.subscription.unsubscribe();
	      };

	      ComponentFromStream.prototype.render = function render() {
	        return this.state.vdom;
	      };

	      return ComponentFromStream;
	    }(_react.Component);
	  };
	};

	var componentFromStream = componentFromStreamWithConfig(_setObservableConfig.config);

	exports.default = componentFromStream;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createEagerElementUtil = __webpack_require__(18);

	var _createEagerElementUtil2 = _interopRequireDefault(_createEagerElementUtil);

	var _isReferentiallyTransparentFunctionComponent = __webpack_require__(16);

	var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createEagerElement = function createEagerElement(type, props, children) {
	  var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(type);
	  /* eslint-disable */
	  var hasKey = props && props.hasOwnProperty('key');
	  /* eslint-enable */
	  return (0, _createEagerElementUtil2.default)(hasKey, isReferentiallyTransparent, type, props, children);
	};

	exports.default = createEagerElement;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _isClassComponent = __webpack_require__(8);

	var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(Component) {
	  return Boolean(typeof Component === 'function' && !(0, _isClassComponent2.default)(Component) && !Component.defaultProps && !Component.contextTypes && (("production") === 'production' || !Component.propTypes));
	};

	exports.default = isReferentiallyTransparentFunctionComponent;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _shouldUpdate = __webpack_require__(10);

	var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

	var _shallowEqual = __webpack_require__(6);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _pick = __webpack_require__(12);

	var _pick2 = _interopRequireDefault(_pick);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
	  return (0, _shouldUpdate2.default)(function (props, nextProps) {
	    return !(0, _shallowEqual2.default)((0, _pick2.default)(nextProps, propKeys), (0, _pick2.default)(props, propKeys));
	  });
	};

	exports.default = (0, _createHelper2.default)(onlyUpdateForKeys, 'onlyUpdateForKeys');

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createEagerElementUtil = function createEagerElementUtil(hasKey, isReferentiallyTransparent, type, props, children) {
	  if (!hasKey && isReferentiallyTransparent) {
	    if (children) {
	      return type(_extends({}, props, { children: children }));
	    }
	    return type(props);
	  }

	  var Component = type;

	  if (children) {
	    return _react2.default.createElement(
	      Component,
	      props,
	      children
	    );
	  }

	  return _react2.default.createElement(Component, props);
	};

	exports.default = createEagerElementUtil;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createChangeEmitter = exports.createChangeEmitter = function createChangeEmitter() {
	  var currentListeners = [];
	  var nextListeners = currentListeners;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  function listen(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function () {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  function emit() {
	    currentListeners = nextListeners;
	    var listeners = currentListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i].apply(listeners, arguments);
	    }
	  }

	  return {
	    listen: listen,
	    emit: emit
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var identity = function identity(Component) {
	  return Component;
	};

	var branch = function branch(test, left) {
	  var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
	  return function (BaseComponent) {
	    var leftFactory = void 0;
	    var rightFactory = void 0;
	    return function (props) {
	      if (test(props)) {
	        leftFactory = leftFactory || (0, _createEagerFactory2.default)(left(BaseComponent));
	        return leftFactory(props);
	      }
	      rightFactory = rightFactory || (0, _createEagerFactory2.default)(right(BaseComponent));
	      return rightFactory(props);
	    };
	  };
	};

	exports.default = (0, _createHelper2.default)(branch, 'branch');

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _omit = __webpack_require__(11);

	var _omit2 = _interopRequireDefault(_omit);

	var _createEagerElement = __webpack_require__(15);

	var _createEagerElement2 = _interopRequireDefault(_createEagerElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentFromProp = function componentFromProp(propName) {
	  var Component = function Component(props) {
	    return (0, _createEagerElement2.default)(props[propName], (0, _omit2.default)(props, [propName]));
	  };
	  Component.displayName = 'componentFromProp(' + propName + ')';
	  return Component;
	};

	exports.default = componentFromProp;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = compose;
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(undefined, arguments));
	    };
	  });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createEventHandlerWithConfig = undefined;

	var _symbolObservable = __webpack_require__(13);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	var _changeEmitter = __webpack_require__(19);

	var _setObservableConfig = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createEventHandlerWithConfig = exports.createEventHandlerWithConfig = function createEventHandlerWithConfig(config) {
	  return function () {
	    var _config$fromESObserva;

	    var emitter = (0, _changeEmitter.createChangeEmitter)();
	    var stream = config.fromESObservable((_config$fromESObserva = {
	      subscribe: function subscribe(observer) {
	        var unsubscribe = emitter.listen(function (value) {
	          return observer.next(value);
	        });
	        return { unsubscribe: unsubscribe };
	      }
	    }, _config$fromESObserva[_symbolObservable2.default] = function () {
	      return this;
	    }, _config$fromESObserva));
	    return {
	      handler: emitter.emit,
	      stream: stream
	    };
	  };
	};

	var createEventHandler = createEventHandlerWithConfig(_setObservableConfig.config);

	exports.default = createEventHandler;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createSink = function createSink(callback) {
	  return function (_Component) {
	    _inherits(Sink, _Component);

	    function Sink() {
	      _classCallCheck(this, Sink);

	      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    Sink.prototype.componentWillMount = function componentWillMount() {
	      callback(this.props);
	    };

	    Sink.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      callback(nextProps);
	    };

	    Sink.prototype.render = function render() {
	      return null;
	    };

	    return Sink;
	  }(_react.Component);
	};

	exports.default = createSink;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultProps = function defaultProps(props) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    var DefaultProps = function DefaultProps(ownerProps) {
	      return factory(ownerProps);
	    };
	    DefaultProps.defaultProps = props;
	    return DefaultProps;
	  };
	};

	exports.default = (0, _createHelper2.default)(defaultProps, 'defaultProps');

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var flattenProp = function flattenProp(propName) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return function (props) {
	      return factory(_extends({}, props, props[propName]));
	    };
	  };
	};

	exports.default = (0, _createHelper2.default)(flattenProp, 'flattenProp');

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getContext = function getContext(contextTypes) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    var GetContext = function GetContext(ownerProps, context) {
	      return factory(_extends({}, ownerProps, context));
	    };

	    GetContext.contextTypes = contextTypes;

	    return GetContext;
	  };
	};

	exports.default = (0, _createHelper2.default)(getContext, 'getContext');

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _hoistNonReactStatics = __webpack_require__(51);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hoistStatics = function hoistStatics(higherOrderComponent) {
	  return function (BaseComponent) {
	    var NewComponent = higherOrderComponent(BaseComponent);
	    (0, _hoistNonReactStatics2.default)(NewComponent, BaseComponent);
	    return NewComponent;
	  };
	};

	exports.default = hoistStatics;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.setObservableConfig = exports.createEventHandler = exports.mapPropsStream = exports.componentFromStream = exports.hoistStatics = exports.nest = exports.componentFromProp = exports.createSink = exports.createEagerFactory = exports.createEagerElement = exports.isClassComponent = exports.shallowEqual = exports.wrapDisplayName = exports.getDisplayName = exports.compose = exports.setDisplayName = exports.setPropTypes = exports.setStatic = exports.toClass = exports.lifecycle = exports.getContext = exports.withContext = exports.onlyUpdateForPropTypes = exports.onlyUpdateForKeys = exports.pure = exports.shouldUpdate = exports.renderNothing = exports.renderComponent = exports.branch = exports.withReducer = exports.withState = exports.flattenProp = exports.renameProps = exports.renameProp = exports.defaultProps = exports.withHandlers = exports.withPropsOnChange = exports.withProps = exports.mapProps = undefined;

	var _mapProps2 = __webpack_require__(4);

	var _mapProps3 = _interopRequireDefault(_mapProps2);

	var _withProps2 = __webpack_require__(44);

	var _withProps3 = _interopRequireDefault(_withProps2);

	var _withPropsOnChange2 = __webpack_require__(45);

	var _withPropsOnChange3 = _interopRequireDefault(_withPropsOnChange2);

	var _withHandlers2 = __webpack_require__(43);

	var _withHandlers3 = _interopRequireDefault(_withHandlers2);

	var _defaultProps2 = __webpack_require__(25);

	var _defaultProps3 = _interopRequireDefault(_defaultProps2);

	var _renameProp2 = __webpack_require__(35);

	var _renameProp3 = _interopRequireDefault(_renameProp2);

	var _renameProps2 = __webpack_require__(36);

	var _renameProps3 = _interopRequireDefault(_renameProps2);

	var _flattenProp2 = __webpack_require__(26);

	var _flattenProp3 = _interopRequireDefault(_flattenProp2);

	var _withState2 = __webpack_require__(47);

	var _withState3 = _interopRequireDefault(_withState2);

	var _withReducer2 = __webpack_require__(46);

	var _withReducer3 = _interopRequireDefault(_withReducer2);

	var _branch2 = __webpack_require__(20);

	var _branch3 = _interopRequireDefault(_branch2);

	var _renderComponent2 = __webpack_require__(37);

	var _renderComponent3 = _interopRequireDefault(_renderComponent2);

	var _renderNothing2 = __webpack_require__(38);

	var _renderNothing3 = _interopRequireDefault(_renderNothing2);

	var _shouldUpdate2 = __webpack_require__(10);

	var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);

	var _pure2 = __webpack_require__(34);

	var _pure3 = _interopRequireDefault(_pure2);

	var _onlyUpdateForKeys2 = __webpack_require__(17);

	var _onlyUpdateForKeys3 = _interopRequireDefault(_onlyUpdateForKeys2);

	var _onlyUpdateForPropTypes2 = __webpack_require__(33);

	var _onlyUpdateForPropTypes3 = _interopRequireDefault(_onlyUpdateForPropTypes2);

	var _withContext2 = __webpack_require__(42);

	var _withContext3 = _interopRequireDefault(_withContext2);

	var _getContext2 = __webpack_require__(27);

	var _getContext3 = _interopRequireDefault(_getContext2);

	var _lifecycle2 = __webpack_require__(30);

	var _lifecycle3 = _interopRequireDefault(_lifecycle2);

	var _toClass2 = __webpack_require__(41);

	var _toClass3 = _interopRequireDefault(_toClass2);

	var _setStatic2 = __webpack_require__(9);

	var _setStatic3 = _interopRequireDefault(_setStatic2);

	var _setPropTypes2 = __webpack_require__(40);

	var _setPropTypes3 = _interopRequireDefault(_setPropTypes2);

	var _setDisplayName2 = __webpack_require__(39);

	var _setDisplayName3 = _interopRequireDefault(_setDisplayName2);

	var _compose2 = __webpack_require__(22);

	var _compose3 = _interopRequireDefault(_compose2);

	var _getDisplayName2 = __webpack_require__(7);

	var _getDisplayName3 = _interopRequireDefault(_getDisplayName2);

	var _wrapDisplayName2 = __webpack_require__(48);

	var _wrapDisplayName3 = _interopRequireDefault(_wrapDisplayName2);

	var _shallowEqual2 = __webpack_require__(6);

	var _shallowEqual3 = _interopRequireDefault(_shallowEqual2);

	var _isClassComponent2 = __webpack_require__(8);

	var _isClassComponent3 = _interopRequireDefault(_isClassComponent2);

	var _createEagerElement2 = __webpack_require__(15);

	var _createEagerElement3 = _interopRequireDefault(_createEagerElement2);

	var _createEagerFactory2 = __webpack_require__(2);

	var _createEagerFactory3 = _interopRequireDefault(_createEagerFactory2);

	var _createSink2 = __webpack_require__(24);

	var _createSink3 = _interopRequireDefault(_createSink2);

	var _componentFromProp2 = __webpack_require__(21);

	var _componentFromProp3 = _interopRequireDefault(_componentFromProp2);

	var _nest2 = __webpack_require__(32);

	var _nest3 = _interopRequireDefault(_nest2);

	var _hoistStatics2 = __webpack_require__(28);

	var _hoistStatics3 = _interopRequireDefault(_hoistStatics2);

	var _componentFromStream2 = __webpack_require__(14);

	var _componentFromStream3 = _interopRequireDefault(_componentFromStream2);

	var _mapPropsStream2 = __webpack_require__(31);

	var _mapPropsStream3 = _interopRequireDefault(_mapPropsStream2);

	var _createEventHandler2 = __webpack_require__(23);

	var _createEventHandler3 = _interopRequireDefault(_createEventHandler2);

	var _setObservableConfig2 = __webpack_require__(5);

	var _setObservableConfig3 = _interopRequireDefault(_setObservableConfig2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.mapProps = _mapProps3.default; // Higher-order component helpers

	exports.withProps = _withProps3.default;
	exports.withPropsOnChange = _withPropsOnChange3.default;
	exports.withHandlers = _withHandlers3.default;
	exports.defaultProps = _defaultProps3.default;
	exports.renameProp = _renameProp3.default;
	exports.renameProps = _renameProps3.default;
	exports.flattenProp = _flattenProp3.default;
	exports.withState = _withState3.default;
	exports.withReducer = _withReducer3.default;
	exports.branch = _branch3.default;
	exports.renderComponent = _renderComponent3.default;
	exports.renderNothing = _renderNothing3.default;
	exports.shouldUpdate = _shouldUpdate3.default;
	exports.pure = _pure3.default;
	exports.onlyUpdateForKeys = _onlyUpdateForKeys3.default;
	exports.onlyUpdateForPropTypes = _onlyUpdateForPropTypes3.default;
	exports.withContext = _withContext3.default;
	exports.getContext = _getContext3.default;
	exports.lifecycle = _lifecycle3.default;
	exports.toClass = _toClass3.default;

	// Static property helpers

	exports.setStatic = _setStatic3.default;
	exports.setPropTypes = _setPropTypes3.default;
	exports.setDisplayName = _setDisplayName3.default;

	// Composition function

	exports.compose = _compose3.default;

	// Other utils

	exports.getDisplayName = _getDisplayName3.default;
	exports.wrapDisplayName = _wrapDisplayName3.default;
	exports.shallowEqual = _shallowEqual3.default;
	exports.isClassComponent = _isClassComponent3.default;
	exports.createEagerElement = _createEagerElement3.default;
	exports.createEagerFactory = _createEagerFactory3.default;
	exports.createSink = _createSink3.default;
	exports.componentFromProp = _componentFromProp3.default;
	exports.nest = _nest3.default;
	exports.hoistStatics = _hoistStatics3.default;

	// Observable helpers

	exports.componentFromStream = _componentFromStream3.default;
	exports.mapPropsStream = _mapPropsStream3.default;
	exports.createEventHandler = _createEventHandler3.default;
	exports.setObservableConfig = _setObservableConfig3.default;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var lifecycle = function lifecycle(spec) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);

	    if (false) {
	      console.error('lifecycle() does not support the render method; its behavior is to ' + 'pass all props and state to the base component.');
	    }

	    /* eslint-disable react/prefer-es6-class */
	    return (0, _react.createClass)(_extends({}, spec, {
	      render: function render() {
	        return factory(_extends({}, this.props, this.state));
	      }
	    }));
	    /* eslint-enable react/prefer-es6-class */
	  };
	};

	exports.default = (0, _createHelper2.default)(lifecycle, 'lifecycle');

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.mapPropsStreamWithConfig = undefined;

	var _symbolObservable = __webpack_require__(13);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _componentFromStream = __webpack_require__(14);

	var _setObservableConfig = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var identity = function identity(t) {
	  return t;
	};
	var componentFromStream = (0, _componentFromStream.componentFromStreamWithConfig)({
	  fromESObservable: identity,
	  toESObservable: identity
	});

	var mapPropsStreamWithConfig = exports.mapPropsStreamWithConfig = function mapPropsStreamWithConfig(config) {
	  return function (transform) {
	    return function (BaseComponent) {
	      var factory = (0, _createEagerFactory2.default)(BaseComponent);
	      var fromESObservable = config.fromESObservable,
	          toESObservable = config.toESObservable;

	      return componentFromStream(function (props$) {
	        var _ref;

	        return _ref = {
	          subscribe: function subscribe(observer) {
	            var subscription = toESObservable(transform(fromESObservable(props$))).subscribe({
	              next: function next(childProps) {
	                return observer.next(factory(childProps));
	              }
	            });
	            return {
	              unsubscribe: function unsubscribe() {
	                return subscription.unsubscribe();
	              }
	            };
	          }
	        }, _ref[_symbolObservable2.default] = function () {
	          return this;
	        }, _ref;
	      });
	    };
	  };
	};

	var mapPropsStream = mapPropsStreamWithConfig(_setObservableConfig.config);

	exports.default = (0, _createHelper2.default)(mapPropsStream, 'mapPropsStream');

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var nest = function nest() {
	  for (var _len = arguments.length, Components = Array(_len), _key = 0; _key < _len; _key++) {
	    Components[_key] = arguments[_key];
	  }

	  var factories = Components.map(_createEagerFactory2.default);
	  var Nest = function Nest(_ref) {
	    var props = _objectWithoutProperties(_ref, []),
	        children = _ref.children;

	    return factories.reduceRight(function (child, factory) {
	      return factory(props, child);
	    }, children);
	  };

	  if (false) {
	    /* eslint-disable global-require */
	    var getDisplayName = require('./getDisplayName').default;
	    /* eslint-enable global-require */
	    var displayNames = Components.map(getDisplayName);
	    Nest.displayName = 'nest(' + displayNames.join(', ') + ')';
	  }

	  return Nest;
	};

	exports.default = nest;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _onlyUpdateForKeys = __webpack_require__(17);

	var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
	  var propTypes = BaseComponent.propTypes;

	  if (false) {
	    /* eslint-disable global-require */
	    var getDisplayName = require('./getDisplayName').default;
	    /* eslint-enable global-require */
	    if (!propTypes) {
	      /* eslint-disable */
	      console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + getDisplayName(BaseComponent) + '".'));
	      /* eslint-enable */
	    }
	  }

	  var propKeys = Object.keys(propTypes || {});
	  var OnlyUpdateForPropTypes = (0, _onlyUpdateForKeys2.default)(propKeys)(BaseComponent);

	  return OnlyUpdateForPropTypes;
	};

	exports.default = (0, _createHelper2.default)(onlyUpdateForPropTypes, 'onlyUpdateForPropTypes', true, true);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _shouldUpdate = __webpack_require__(10);

	var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);

	var _shallowEqual = __webpack_require__(6);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pure = (0, _shouldUpdate2.default)(function (props, nextProps) {
	  return !(0, _shallowEqual2.default)(props, nextProps);
	});

	exports.default = (0, _createHelper2.default)(pure, 'pure', true, true);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _omit = __webpack_require__(11);

	var _omit2 = _interopRequireDefault(_omit);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renameProp = function renameProp(oldName, newName) {
	  return (0, _mapProps2.default)(function (props) {
	    var _extends2;

	    return _extends({}, (0, _omit2.default)(props, [oldName]), (_extends2 = {}, _extends2[newName] = props[oldName], _extends2));
	  });
	};

	exports.default = (0, _createHelper2.default)(renameProp, 'renameProp');

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _omit = __webpack_require__(11);

	var _omit2 = _interopRequireDefault(_omit);

	var _pick = __webpack_require__(12);

	var _pick2 = _interopRequireDefault(_pick);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var keys = Object.keys;


	var mapKeys = function mapKeys(obj, func) {
	  return keys(obj).reduce(function (result, key) {
	    var val = obj[key];
	    /* eslint-disable no-param-reassign */
	    result[func(val, key)] = val;
	    /* eslint-enable no-param-reassign */
	    return result;
	  }, {});
	};

	var renameProps = function renameProps(nameMap) {
	  return (0, _mapProps2.default)(function (props) {
	    return _extends({}, (0, _omit2.default)(props, keys(nameMap)), mapKeys((0, _pick2.default)(props, keys(nameMap)), function (_, oldName) {
	      return nameMap[oldName];
	    }));
	  });
	};

	exports.default = (0, _createHelper2.default)(renameProps, 'renameProps');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var renderComponent = function renderComponent(Component) {
	  return function (_) {
	    var factory = (0, _createEagerFactory2.default)(Component);
	    var RenderComponent = function RenderComponent(props) {
	      return factory(props);
	    };
	    if (false) {
	      /* eslint-disable global-require */
	      var wrapDisplayName = require('./wrapDisplayName').default;
	      /* eslint-enable global-require */
	      RenderComponent.displayName = wrapDisplayName(Component, 'renderComponent');
	    }
	    return RenderComponent;
	  };
	};

	exports.default = (0, _createHelper2.default)(renderComponent, 'renderComponent', false);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Nothing = function (_Component) {
	  _inherits(Nothing, _Component);

	  function Nothing() {
	    _classCallCheck(this, Nothing);

	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }

	  Nothing.prototype.render = function render() {
	    return null;
	  };

	  return Nothing;
	}(_react.Component);

	Nothing.displayName = 'Nothing';

	var renderNothing = function renderNothing(_) {
	  return Nothing;
	};

	exports.default = (0, _createHelper2.default)(renderNothing, 'renderNothing', false, true);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _setStatic = __webpack_require__(9);

	var _setStatic2 = _interopRequireDefault(_setStatic);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setDisplayName = function setDisplayName(displayName) {
	  return (0, _setStatic2.default)('displayName', displayName);
	};

	exports.default = (0, _createHelper2.default)(setDisplayName, 'setDisplayName', false);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _setStatic = __webpack_require__(9);

	var _setStatic2 = _interopRequireDefault(_setStatic);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setPropTypes = function setPropTypes(propTypes) {
	  return (0, _setStatic2.default)('propTypes', propTypes);
	};

	exports.default = (0, _createHelper2.default)(setPropTypes, 'setPropTypes', false);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _getDisplayName = __webpack_require__(7);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _isClassComponent = __webpack_require__(8);

	var _isClassComponent2 = _interopRequireDefault(_isClassComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var toClass = function toClass(baseComponent) {
	  if ((0, _isClassComponent2.default)(baseComponent)) {
	    return baseComponent;
	  }

	  var ToClass = function (_Component) {
	    _inherits(ToClass, _Component);

	    function ToClass() {
	      _classCallCheck(this, ToClass);

	      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }

	    ToClass.prototype.render = function render() {
	      if (typeof baseComponent === 'string') {
	        return _react2.default.createElement('baseComponent', this.props);
	      }
	      return baseComponent(this.props, this.context);
	    };

	    return ToClass;
	  }(_react.Component);

	  ToClass.displayName = (0, _getDisplayName2.default)(baseComponent);
	  ToClass.propTypes = baseComponent.propTypes;
	  ToClass.contextTypes = baseComponent.contextTypes;
	  ToClass.defaultProps = baseComponent.defaultProps;

	  return ToClass;
	};

	exports.default = toClass;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withContext = function withContext(childContextTypes, getChildContext) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);

	    var WithContext = function (_Component) {
	      _inherits(WithContext, _Component);

	      function WithContext() {
	        var _temp, _this, _ret;

	        _classCallCheck(this, WithContext);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getChildContext = function () {
	          return getChildContext(_this.props);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      WithContext.prototype.render = function render() {
	        return factory(this.props);
	      };

	      return WithContext;
	    }(_react.Component);

	    WithContext.childContextTypes = childContextTypes;

	    return WithContext;
	  };
	};

	exports.default = (0, _createHelper2.default)(withContext, 'withContext');

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var mapValues = function mapValues(obj, func) {
	  var result = {};
	  /* eslint-disable no-restricted-syntax */
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      result[key] = func(obj[key], key);
	    }
	  }
	  /* eslint-enable no-restricted-syntax */
	  return result;
	};

	var withHandlers = function withHandlers(handlers) {
	  return function (BaseComponent) {
	    var _class, _temp2, _initialiseProps;

	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return _temp2 = _class = function (_Component) {
	      _inherits(_class, _Component);

	      function _class() {
	        var _temp, _this, _ret;

	        _classCallCheck(this, _class);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _class.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
	        this.cachedHandlers = {};
	      };

	      _class.prototype.render = function render() {
	        return factory(_extends({}, this.props, this.handlers));
	      };

	      return _class;
	    }(_react.Component), _initialiseProps = function _initialiseProps() {
	      var _this2 = this;

	      this.cachedHandlers = {};
	      this.handlers = mapValues(typeof handlers === 'function' ? handlers(this.props) : handlers, function (createHandler, handlerName) {
	        return function () {
	          var cachedHandler = _this2.cachedHandlers[handlerName];
	          if (cachedHandler) {
	            return cachedHandler.apply(undefined, arguments);
	          }

	          var handler = createHandler(_this2.props);
	          _this2.cachedHandlers[handlerName] = handler;

	          if (false) {
	            console.error( // eslint-disable-line no-console
	            'withHandlers(): Expected a map of higher-order functions. ' + 'Refer to the docs for more info.');
	          }

	          return handler.apply(undefined, arguments);
	        };
	      });
	    }, _temp2;
	  };
	};

	exports.default = (0, _createHelper2.default)(withHandlers, 'withHandlers');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _mapProps = __webpack_require__(4);

	var _mapProps2 = _interopRequireDefault(_mapProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var withProps = function withProps(input) {
	  return (0, _mapProps2.default)(function (props) {
	    return _extends({}, props, typeof input === 'function' ? input(props) : input);
	  });
	};

	exports.default = (0, _createHelper2.default)(withProps, 'withProps');

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _pick = __webpack_require__(12);

	var _pick2 = _interopRequireDefault(_pick);

	var _shallowEqual = __webpack_require__(6);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withPropsOnChange = function withPropsOnChange(shouldMapOrKeys, propsMapper) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    var shouldMap = typeof shouldMapOrKeys === 'function' ? shouldMapOrKeys : function (props, nextProps) {
	      return !(0, _shallowEqual2.default)((0, _pick2.default)(props, shouldMapOrKeys), (0, _pick2.default)(nextProps, shouldMapOrKeys));
	    };

	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.computedProps = propsMapper(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _class2.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (shouldMap(this.props, nextProps)) {
	          this.computedProps = propsMapper(nextProps);
	        }
	      };

	      _class2.prototype.render = function render() {
	        return factory(_extends({}, this.props, this.computedProps));
	      };

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withPropsOnChange, 'withPropsOnChange');

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withReducer = function withReducer(stateName, dispatchName, reducer, initialState) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	          stateValue: _this.initalizeStateValue()
	        }, _this.dispatch = function (action) {
	          return _this.setState(function (_ref) {
	            var stateValue = _ref.stateValue;
	            return {
	              stateValue: reducer(stateValue, action)
	            };
	          });
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _class2.prototype.initalizeStateValue = function initalizeStateValue() {
	        if (initialState !== undefined) {
	          return typeof initialState === 'function' ? initialState(this.props) : initialState;
	        }
	        return reducer(undefined, { type: '@@recompose/INIT' });
	      };

	      _class2.prototype.render = function render() {
	        var _extends2;

	        return factory(_extends({}, this.props, (_extends2 = {}, _extends2[stateName] = this.state.stateValue, _extends2[dispatchName] = this.dispatch, _extends2)));
	      };

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withReducer, 'withReducer');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _createHelper = __webpack_require__(1);

	var _createHelper2 = _interopRequireDefault(_createHelper);

	var _createEagerFactory = __webpack_require__(2);

	var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var withState = function withState(stateName, stateUpdaterName, initialState) {
	  return function (BaseComponent) {
	    var factory = (0, _createEagerFactory2.default)(BaseComponent);
	    return function (_Component) {
	      _inherits(_class2, _Component);

	      function _class2() {
	        var _temp, _this, _ret;

	        _classCallCheck(this, _class2);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
	          stateValue: typeof initialState === 'function' ? initialState(_this.props) : initialState
	        }, _this.updateStateValue = function (updateFn, callback) {
	          return _this.setState(function (_ref) {
	            var stateValue = _ref.stateValue;
	            return {
	              stateValue: typeof updateFn === 'function' ? updateFn(stateValue) : updateFn
	            };
	          }, callback);
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	      }

	      _class2.prototype.render = function render() {
	        var _extends2;

	        return factory(_extends({}, this.props, (_extends2 = {}, _extends2[stateName] = this.state.stateValue, _extends2[stateUpdaterName] = this.updateStateValue, _extends2)));
	      };

	      return _class2;
	    }(_react.Component);
	  };
	};

	exports.default = (0, _createHelper2.default)(withState, 'withState');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _getDisplayName = __webpack_require__(7);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
	  return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
	};

	exports.default = wrapDisplayName;

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * 
	 */

	/*eslint-disable no-self-compare */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
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
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);

	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }

	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {

	                }
	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(53);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(49)(module)))

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ }
/******/ ])
});
;