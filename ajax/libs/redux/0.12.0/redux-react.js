(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Redux"] = factory(require("react"));
	else
		root["Redux"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_23__) {
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

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	var _index = __webpack_require__(13);

	_defaults(exports, _interopRequireWildcard(_index));

	var _react = __webpack_require__(15);

	_defaults(exports, _interopRequireWildcard(_react));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createDispatcher;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsComposeMiddleware = __webpack_require__(2);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var INIT_ACTION = {
	  type: '@@INIT'
	};

	function createDispatcher(store) {
	  var middlewares = arguments[1] === undefined ? [] : arguments[1];

	  return function dispatcher(initialState, setState) {
	    var state = setState(store(initialState, INIT_ACTION));

	    function dispatch(action) {
	      state = setState(store(state, action));
	      return action;
	    }

	    function getState() {
	      return state;
	    }

	    var finalMiddlewares = typeof middlewares === 'function' ? middlewares(getState) : middlewares;

	    return _utilsComposeMiddleware2['default'].apply(undefined, finalMiddlewares.concat([dispatch]));
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = composeMiddleware;

	function composeMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return middlewares.reduceRight(function (composed, m) {
	    return m(composed);
	  });
	}

	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = composeStores;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(5);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(19);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

	function composeStores(stores) {
	  var finalStores = (0, _utilsPick2['default'])(stores, function (val) {
	    return typeof val === 'function';
	  });
	  return function Composition(atom, action) {
	    if (atom === undefined) atom = {};

	    return (0, _utilsMapValues2['default'])(finalStores, function (store, key) {
	      return store(atom[key], action);
	    });
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = getDisplayName;

	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _createDispatcher = __webpack_require__(1);

	var _createDispatcher2 = _interopRequireDefault(_createDispatcher);

	var _utilsComposeStores = __webpack_require__(3);

	var _utilsComposeStores2 = _interopRequireDefault(_utilsComposeStores);

	var _middlewareThunk = __webpack_require__(14);

	var _middlewareThunk2 = _interopRequireDefault(_middlewareThunk);

	var Redux = (function () {
	  function Redux(dispatcher, initialState) {
	    _classCallCheck(this, Redux);

	    var finalDispatcher = dispatcher;
	    if (typeof dispatcher === 'object') {
	      // A shortcut notation to use the default dispatcher
	      finalDispatcher = (0, _createDispatcher2['default'])((0, _utilsComposeStores2['default'])(dispatcher), function (getState) {
	        return [(0, _middlewareThunk2['default'])(getState)];
	      });
	    }

	    this.state = initialState;
	    this.listeners = [];
	    this.replaceDispatcher(finalDispatcher);
	  }

	  Redux.prototype.getDispatcher = function getDispatcher() {
	    return this.dispatcher;
	  };

	  Redux.prototype.replaceDispatcher = function replaceDispatcher(nextDispatcher) {
	    this.dispatcher = nextDispatcher;
	    this.dispatchFn = nextDispatcher(this.state, this.setState.bind(this));
	  };

	  Redux.prototype.dispatch = function dispatch(action) {
	    return this.dispatchFn(action);
	  };

	  Redux.prototype.getState = function getState() {
	    return this.state;
	  };

	  Redux.prototype.setState = function setState(nextState) {
	    this.state = nextState;
	    this.listeners.forEach(function (listener) {
	      return listener();
	    });
	    return nextState;
	  };

	  Redux.prototype.subscribe = function subscribe(listener) {
	    var listeners = this.listeners;

	    listeners.push(listener);

	    return function unsubscribe() {
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  };

	  return Redux;
	})();

	exports['default'] = Redux;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createAll;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createProvider = __webpack_require__(11);

	var _createProvider2 = _interopRequireDefault(_createProvider);

	var _createProvideDecorator = __webpack_require__(10);

	var _createProvideDecorator2 = _interopRequireDefault(_createProvideDecorator);

	var _createConnector = __webpack_require__(9);

	var _createConnector2 = _interopRequireDefault(_createConnector);

	var _createConnectDecorator = __webpack_require__(8);

	var _createConnectDecorator2 = _interopRequireDefault(_createConnectDecorator);

	function createAll(React) {
	  // Wrapper components
	  var Provider = (0, _createProvider2['default'])(React);
	  var Connector = (0, _createConnector2['default'])(React);

	  // Higher-order components (decorators)
	  var provide = (0, _createProvideDecorator2['default'])(React, Provider);
	  var connect = (0, _createConnectDecorator2['default'])(React, Connector);

	  return { Provider: Provider, Connector: Connector, provide: provide, connect: connect };
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createConnectDecorator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsGetDisplayName = __webpack_require__(4);

	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

	var _utilsShallowEqualScalar = __webpack_require__(21);

	var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

	function createConnectDecorator(React, Connector) {
	  var Component = React.Component;

	  return function connect(select) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ConnectorDecorator() {
	          _classCallCheck(this, ConnectorDecorator);

	          if (_Component != null) {
	            _Component.apply(this, arguments);
	          }
	        }

	        _inherits(ConnectorDecorator, _Component);

	        ConnectorDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	          return !(0, _utilsShallowEqualScalar2['default'])(this.props, nextProps);
	        };

	        ConnectorDecorator.prototype.render = function render() {
	          var _this = this;

	          return React.createElement(
	            Connector,
	            { select: function (state) {
	                return select(state, _this.props);
	              } },
	            function (stuff) {
	              return React.createElement(DecoratedComponent, _extends({}, stuff, _this.props));
	            }
	          );
	        };

	        _createClass(ConnectorDecorator, null, [{
	          key: 'displayName',
	          value: 'Connector(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }]);

	        return ConnectorDecorator;
	      })(Component);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createConnector;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsIdentity = __webpack_require__(17);

	var _utilsIdentity2 = _interopRequireDefault(_utilsIdentity);

	var _utilsShallowEqual = __webpack_require__(20);

	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

	var _utilsIsPlainObject = __webpack_require__(18);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _invariant = __webpack_require__(22);

	var _invariant2 = _interopRequireDefault(_invariant);

	function createConnector(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  return (function (_Component) {
	    function Connector(props, context) {
	      _classCallCheck(this, Connector);

	      _Component.call(this, props, context);

	      this.unsubscribe = context.redux.subscribe(this.handleChange.bind(this));
	      this.state = this.selectState(props, context);
	    }

	    _inherits(Connector, _Component);

	    Connector.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	      return !this.isSliceEqual(this.state.slice, nextState.slice) || !(0, _utilsShallowEqual2['default'])(this.props, nextProps);
	    };

	    Connector.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
	      var isRefEqual = slice === nextSlice;
	      if (isRefEqual) {
	        return true;
	      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
	        return isRefEqual;
	      }
	      return (0, _utilsShallowEqual2['default'])(slice, nextSlice);
	    };

	    Connector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      if (nextProps.select !== this.props.select) {
	        // Force the state slice recalculation
	        this.handleChange(nextProps);
	      }
	    };

	    Connector.prototype.componentWillUnmount = function componentWillUnmount() {
	      this.unsubscribe();
	    };

	    Connector.prototype.handleChange = function handleChange() {
	      var props = arguments[0] === undefined ? this.props : arguments[0];

	      var nextState = this.selectState(props, this.context);
	      this.setState(nextState);
	    };

	    Connector.prototype.selectState = function selectState(props, context) {
	      var state = context.redux.getState();
	      var slice = props.select(state);

	      (0, _invariant2['default'])((0, _utilsIsPlainObject2['default'])(slice), 'The return value of `select` prop must be an object. Instead received %s.', slice);

	      return { slice: slice };
	    };

	    Connector.prototype.render = function render() {
	      var children = this.props.children;
	      var slice = this.state.slice;
	      var dispatch = this.context.redux.dispatch;

	      return children(_extends({ dispatch: dispatch }, slice));
	    };

	    _createClass(Connector, null, [{
	      key: 'contextTypes',
	      value: {
	        redux: PropTypes.object.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'propTypes',
	      value: {
	        children: PropTypes.func.isRequired,
	        select: PropTypes.func.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'defaultProps',
	      value: {
	        select: _utilsIdentity2['default']
	      },
	      enumerable: true
	    }]);

	    return Connector;
	  })(Component);
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createProvideDecorator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsGetDisplayName = __webpack_require__(4);

	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

	function createProvideDecorator(React, Provider) {
	  var Component = React.Component;

	  return function provide(redux) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ProviderDecorator() {
	          _classCallCheck(this, ProviderDecorator);

	          if (_Component != null) {
	            _Component.apply(this, arguments);
	          }
	        }

	        _inherits(ProviderDecorator, _Component);

	        ProviderDecorator.prototype.render = function render() {
	          var _this = this;

	          return React.createElement(
	            Provider,
	            { redux: redux },
	            function () {
	              return React.createElement(DecoratedComponent, _this.props);
	            }
	          );
	        };

	        _createClass(ProviderDecorator, null, [{
	          key: 'displayName',
	          value: 'Provider(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }]);

	        return ProviderDecorator;
	      })(Component);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports["default"] = createProvider;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	function createProvider(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  var reduxShape = PropTypes.shape({
	    subscribe: PropTypes.func.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    getState: PropTypes.func.isRequired
	  });

	  return (function (_Component) {
	    function Provider(props, context) {
	      _classCallCheck(this, Provider);

	      _Component.call(this, props, context);
	      this.state = { redux: props.redux };
	    }

	    _inherits(Provider, _Component);

	    Provider.prototype.getChildContext = function getChildContext() {
	      return { redux: this.state.redux };
	    };

	    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var redux = this.state.redux;
	      var nextRedux = nextProps.redux;

	      if (redux !== nextRedux) {
	        var nextDispatcher = nextRedux.getDispatcher();
	        redux.replaceDispatcher(nextDispatcher);
	      }
	    };

	    Provider.prototype.render = function render() {
	      var children = this.props.children;

	      return children();
	    };

	    _createClass(Provider, null, [{
	      key: "propTypes",
	      value: {
	        redux: reduxShape.isRequired,
	        children: PropTypes.func.isRequired
	      },
	      enumerable: true
	    }, {
	      key: "childContextTypes",
	      value: {
	        redux: reduxShape.isRequired
	      },
	      enumerable: true
	    }]);

	    return Provider;
	  })(Component);
	}

	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	var _bind = Function.prototype.bind;
	exports['default'] = createRedux;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Redux = __webpack_require__(6);

	var _Redux2 = _interopRequireDefault(_Redux);

	function createRedux() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var redux = new (_bind.apply(_Redux2['default'], [null].concat(args)))();

	  return {
	    subscribe: redux.subscribe.bind(redux),
	    dispatch: redux.dispatch.bind(redux),
	    getState: redux.getState.bind(redux),
	    getDispatcher: redux.getDispatcher.bind(redux),
	    replaceDispatcher: redux.replaceDispatcher.bind(redux)
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createRedux = __webpack_require__(12);

	var _createRedux2 = _interopRequireDefault(_createRedux);

	var _createDispatcher = __webpack_require__(1);

	var _createDispatcher2 = _interopRequireDefault(_createDispatcher);

	// Utilities

	var _utilsComposeMiddleware = __webpack_require__(2);

	var _utilsComposeMiddleware2 = _interopRequireDefault(_utilsComposeMiddleware);

	var _utilsComposeStores = __webpack_require__(3);

	var _utilsComposeStores2 = _interopRequireDefault(_utilsComposeStores);

	var _utilsBindActionCreators = __webpack_require__(16);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	exports.createRedux = _createRedux2['default'];
	exports.createDispatcher = _createDispatcher2['default'];
	exports.composeMiddleware = _utilsComposeMiddleware2['default'];
	exports.composeStores = _utilsComposeStores2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(getState) {
	  return function (next) {
	    var recurse = function recurse(action) {
	      return typeof action === 'function' ? action(recurse, getState) : next(action);
	    };

	    return recurse;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(23);

	var _react2 = _interopRequireDefault(_react);

	var _componentsCreateAll = __webpack_require__(7);

	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

	var _createAll = (0, _componentsCreateAll2['default'])(_react2['default']);

	var Provider = _createAll.Provider;
	var Connector = _createAll.Connector;
	var provide = _createAll.provide;
	var connect = _createAll.connect;
	exports.Provider = Provider;
	exports.Connector = Connector;
	exports.provide = provide;
	exports.connect = connect;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(5);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	function bindActionCreators(actionCreators, dispatch) {
	  return (0, _utilsMapValues2['default'])(actionCreators, function (actionCreator) {
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return dispatch(actionCreator.apply(undefined, args));
	    };
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = identity;

	function identity(value) {
	  return value;
	}

	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;

	function isPlainObject(obj) {
	  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
	}

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = pick;

	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shallowEqualScalar;

	function shallowEqualScalar(objA, objB) {
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
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i])) {
	      return false;
	    }

	    var valA = objA[keysA[i]];
	    var valB = objB[keysA[i]];

	    if (valA !== valB || typeof valA === 'object' || typeof valB === 'object') {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
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
	  if ((undefined) !== 'production') {
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
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ }
/******/ ])
});
;