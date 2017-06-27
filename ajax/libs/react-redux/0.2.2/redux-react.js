(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxReact"] = factory(require("react"));
	else
		root["ReduxReact"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _componentsCreateAll = __webpack_require__(3);

	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

	var _createAll = _componentsCreateAll2['default'](_react2['default']);

	var Provider = _createAll.Provider;
	var Connector = _createAll.Connector;
	var provide = _createAll.provide;
	var connect = _createAll.connect;
	exports.Provider = Provider;
	exports.Connector = Connector;
	exports.provide = provide;
	exports.connect = connect;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = createStoreShape;

	function createStoreShape(PropTypes) {
	  return PropTypes.shape({
	    subscribe: PropTypes.func.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    getState: PropTypes.func.isRequired
	  });
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = getDisplayName;

	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createAll;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createProvider = __webpack_require__(7);

	var _createProvider2 = _interopRequireDefault(_createProvider);

	var _createProvideDecorator = __webpack_require__(6);

	var _createProvideDecorator2 = _interopRequireDefault(_createProvideDecorator);

	var _createConnector = __webpack_require__(5);

	var _createConnector2 = _interopRequireDefault(_createConnector);

	var _createConnectDecorator = __webpack_require__(4);

	var _createConnectDecorator2 = _interopRequireDefault(_createConnectDecorator);

	function createAll(React) {
	  // Wrapper components
	  var Provider = _createProvider2['default'](React);
	  var Connector = _createConnector2['default'](React);

	  // Higher-order components (decorators)
	  var provide = _createProvideDecorator2['default'](React, Provider);
	  var connect = _createConnectDecorator2['default'](React, Connector);

	  return { Provider: Provider, Connector: Connector, provide: provide, connect: connect };
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createConnectDecorator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsGetDisplayName = __webpack_require__(2);

	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

	var _utilsShallowEqualScalar = __webpack_require__(11);

	var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

	function createConnectDecorator(React, Connector) {
	  var Component = React.Component;

	  return function connect(select) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ConnectorDecorator() {
	          _classCallCheck(this, ConnectorDecorator);

	          _Component.apply(this, arguments);
	        }

	        _inherits(ConnectorDecorator, _Component);

	        ConnectorDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	          return !_utilsShallowEqualScalar2['default'](this.props, nextProps);
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
	          value: 'Connector(' + _utilsGetDisplayName2['default'](DecoratedComponent) + ')',
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createConnector;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsCreateStoreShape = __webpack_require__(1);

	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

	var _utilsIdentity = __webpack_require__(8);

	var _utilsIdentity2 = _interopRequireDefault(_utilsIdentity);

	var _utilsShallowEqual = __webpack_require__(10);

	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

	var _utilsIsPlainObject = __webpack_require__(9);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _invariant = __webpack_require__(12);

	var _invariant2 = _interopRequireDefault(_invariant);

	function createConnector(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

	  return (function (_Component) {
	    function Connector(props, context) {
	      _classCallCheck(this, Connector);

	      _Component.call(this, props, context);
	      this.state = this.selectState(props, context);
	    }

	    _inherits(Connector, _Component);

	    Connector.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	      return !this.isSliceEqual(this.state.slice, nextState.slice) || !_utilsShallowEqual2['default'](this.props, nextProps);
	    };

	    Connector.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
	      var isRefEqual = slice === nextSlice;
	      if (isRefEqual) {
	        return true;
	      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
	        return isRefEqual;
	      }
	      return _utilsShallowEqual2['default'](slice, nextSlice);
	    };

	    Connector.prototype.componentDidMount = function componentDidMount() {
	      this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this));
	      this.handleChange();
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
	      if (!this.isSliceEqual(this.state.slice, nextState.slice)) {
	        this.setState(nextState);
	      }
	    };

	    Connector.prototype.selectState = function selectState(props, context) {
	      var state = context.store.getState();
	      var slice = props.select(state);

	      _invariant2['default'](_utilsIsPlainObject2['default'](slice), 'The return value of `select` prop must be an object. Instead received %s.', slice);

	      return { slice: slice };
	    };

	    Connector.prototype.render = function render() {
	      var children = this.props.children;
	      var slice = this.state.slice;
	      var dispatch = this.context.store.dispatch;

	      return children(_extends({ dispatch: dispatch }, slice));
	    };

	    _createClass(Connector, null, [{
	      key: 'contextTypes',
	      value: {
	        store: storeShape.isRequired
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createProvideDecorator;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsGetDisplayName = __webpack_require__(2);

	var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

	function createProvideDecorator(React, Provider) {
	  var Component = React.Component;

	  return function provide(store) {
	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        function ProviderDecorator() {
	          _classCallCheck(this, ProviderDecorator);

	          _Component.apply(this, arguments);
	        }

	        _inherits(ProviderDecorator, _Component);

	        ProviderDecorator.prototype.render = function render() {
	          var _this = this;

	          return React.createElement(
	            Provider,
	            { store: store },
	            function () {
	              return React.createElement(DecoratedComponent, _this.props);
	            }
	          );
	        };

	        _createClass(ProviderDecorator, null, [{
	          key: 'displayName',
	          value: 'Provider(' + _utilsGetDisplayName2['default'](DecoratedComponent) + ')',
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createProvider;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsCreateStoreShape = __webpack_require__(1);

	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

	function createProvider(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

	  return (function (_Component) {
	    function Provider(props, context) {
	      _classCallCheck(this, Provider);

	      _Component.call(this, props, context);
	      this.state = { store: props.store };
	    }

	    _inherits(Provider, _Component);

	    Provider.prototype.getChildContext = function getChildContext() {
	      return { store: this.state.store };
	    };

	    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	      var store = this.state.store;
	      var nextStore = nextProps.store;

	      if (store !== nextStore) {
	        var nextReducer = nextStore.getReducer();
	        store.replaceReducer(nextReducer);
	      }
	    };

	    Provider.prototype.render = function render() {
	      var children = this.props.children;

	      return children();
	    };

	    _createClass(Provider, null, [{
	      key: 'childContextTypes',
	      value: {
	        store: storeShape.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'propTypes',
	      value: {
	        children: PropTypes.func.isRequired
	      },
	      enumerable: true
	    }]);

	    return Provider;
	  })(Component);
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = identity;

	function identity(value) {
	  return value;
	}

	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;

	function isPlainObject(obj) {
	  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }
/******/ ])
});
;