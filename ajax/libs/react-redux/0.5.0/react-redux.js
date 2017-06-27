(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "redux"], factory);
	else if(typeof exports === 'object')
		exports["ReactRedux"] = factory(require("react"), require("redux"));
	else
		root["ReactRedux"] = factory(root["React"], root["Redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
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

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _componentsCreateAll = __webpack_require__(2);

	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

	var _createAll = _componentsCreateAll2['default'](_react2['default']);

	var Provider = _createAll.Provider;
	var connect = _createAll.connect;
	exports.Provider = Provider;
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createAll;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createProvider = __webpack_require__(4);

	var _createProvider2 = _interopRequireDefault(_createProvider);

	var _createConnect = __webpack_require__(3);

	var _createConnect2 = _interopRequireDefault(_createConnect);

	function createAll(React) {
	  var Provider = _createProvider2['default'](React);
	  var connect = _createConnect2['default'](React);

	  return { Provider: Provider, connect: connect };
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createConnect;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _utilsCreateStoreShape = __webpack_require__(1);

	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

	var _utilsShallowEqualScalar = __webpack_require__(7);

	var _utilsShallowEqualScalar2 = _interopRequireDefault(_utilsShallowEqualScalar);

	var _utilsShallowEqual = __webpack_require__(6);

	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

	var _utilsIsPlainObject = __webpack_require__(5);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsWrapActionCreators = __webpack_require__(8);

	var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

	var _invariant = __webpack_require__(9);

	var _invariant2 = _interopRequireDefault(_invariant);

	var defaultMapState = function defaultMapState() {
	  return {};
	};
	var defaultMapDispatch = function defaultMapDispatch(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateSlice, actionsCreators, props) {
	  return _extends({}, props, stateSlice, actionsCreators);
	};

	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}

	function createConnect(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

	  return function connect() {
	    var _mapState = arguments.length <= 0 || arguments[0] === undefined ? defaultMapState : arguments[0];

	    var mapDispatchOrActionCreators = arguments.length <= 1 || arguments[1] === undefined ? defaultMapDispatch : arguments[1];
	    var mergeProps = arguments.length <= 2 || arguments[2] === undefined ? defaultMergeProps : arguments[2];

	    var shouldSubscribe = _mapState !== defaultMapState;
	    var _mapDispatch = _utilsIsPlainObject2['default'](mapDispatchOrActionCreators) ? _utilsWrapActionCreators2['default'](mapDispatchOrActionCreators) : mapDispatchOrActionCreators;

	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        _inherits(ConnectDecorator, _Component);

	        ConnectDecorator.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	          return this.subscribed && !this.isSliceEqual(this.state.slice, nextState.slice) || !_utilsShallowEqualScalar2['default'](this.props, nextProps);
	        };

	        ConnectDecorator.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
	          var isRefEqual = slice === nextSlice;
	          if (isRefEqual || typeof slice !== 'object' || typeof nextSlice !== 'object') {
	            return isRefEqual;
	          }

	          return _utilsShallowEqual2['default'](slice, nextSlice);
	        };

	        _createClass(ConnectDecorator, null, [{
	          key: 'displayName',
	          value: 'Connect(' + getDisplayName(DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }, {
	          key: 'contextTypes',
	          value: {
	            store: storeShape.isRequired
	          },
	          enumerable: true
	        }]);

	        function ConnectDecorator(props, context) {
	          _classCallCheck(this, ConnectDecorator);

	          _Component.call(this, props, context);
	          this.setUnderlyingRef = this.setUnderlyingRef.bind(this);
	          this.state = _extends({}, this.mapState(props, context), this.mapDispatch(context));
	        }

	        ConnectDecorator.prototype.componentDidMount = function componentDidMount() {
	          if (shouldSubscribe) {
	            this.subscribed = true;
	            this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this));
	          }
	        };

	        ConnectDecorator.prototype.componentWillUnmount = function componentWillUnmount() {
	          if (shouldSubscribe) {
	            this.unsubscribe();
	          }
	        };

	        ConnectDecorator.prototype.handleChange = function handleChange() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	          var nextState = this.mapState(props, this.context);
	          if (!this.isSliceEqual(this.state.slice, nextState.slice)) {
	            this.setState(nextState);
	          }
	        };

	        ConnectDecorator.prototype.mapState = function mapState() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	          var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

	          var state = context.store.getState();
	          var slice = _mapState(state);

	          _invariant2['default'](_utilsIsPlainObject2['default'](slice), '`mapState` must return an object. Instead received %s.', slice);

	          return { slice: slice };
	        };

	        ConnectDecorator.prototype.mapDispatch = function mapDispatch() {
	          var context = arguments.length <= 0 || arguments[0] === undefined ? this.context : arguments[0];
	          var dispatch = context.store.dispatch;

	          var actionCreators = _mapDispatch(dispatch);

	          _invariant2['default'](_utilsIsPlainObject2['default'](actionCreators), '`mapDispatch` must return an object. Instead received %s.', actionCreators);

	          return { actionCreators: actionCreators };
	        };

	        ConnectDecorator.prototype.merge = function merge() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	          var state = arguments.length <= 1 || arguments[1] === undefined ? this.state : arguments[1];
	          var slice = state.slice;
	          var actionCreators = state.actionCreators;

	          var merged = mergeProps(slice, actionCreators, props);

	          _invariant2['default'](_utilsIsPlainObject2['default'](merged), '`mergeProps` must return an object. Instead received %s.', merged);

	          return merged;
	        };

	        ConnectDecorator.prototype.getUnderlyingRef = function getUnderlyingRef() {
	          return this.underlyingRef;
	        };

	        ConnectDecorator.prototype.setUnderlyingRef = function setUnderlyingRef(instance) {
	          this.underlyingRef = instance;
	        };

	        ConnectDecorator.prototype.render = function render() {
	          return React.createElement(DecoratedComponent, _extends({ ref: this.setUnderlyingRef
	          }, this.merge()));
	        };

	        return ConnectDecorator;
	      })(Component);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
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
	    _inherits(Provider, _Component);

	    Provider.prototype.getChildContext = function getChildContext() {
	      return { store: this.state.store };
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

	    function Provider(props, context) {
	      _classCallCheck(this, Provider);

	      _Component.call(this, props, context);
	      this.state = { store: props.store };
	    }

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

	    return Provider;
	  })(Component);
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */

	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = wrapActionCreators;

	var _redux = __webpack_require__(11);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return _redux.bindActionCreators(actionCreators, dispatch);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
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
	  if (true) {
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
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;