(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Autosuggest"] = factory(require("React"));
	else
		root["Autosuggest"] = factory(root["React"]);
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

	module.exports = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _redux = __webpack_require__(3);

	var _reactRedux = __webpack_require__(13);

	var _reducerAndActions = __webpack_require__(22);

	var _reducerAndActions2 = _interopRequireDefault(_reducerAndActions);

	var _Autosuggest = __webpack_require__(23);

	var _Autosuggest2 = _interopRequireDefault(_Autosuggest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function noop() {}

	var defaultTheme = {
	  container: 'react-autosuggest__container',
	  containerOpen: 'react-autosuggest__container--open',
	  input: 'react-autosuggest__input',
	  suggestionsContainer: 'react-autosuggest__suggestions-container',
	  suggestion: 'react-autosuggest__suggestion',
	  suggestionFocused: 'react-autosuggest__suggestion--focused',
	  sectionContainer: 'react-autosuggest__section-container',
	  sectionTitle: 'react-autosuggest__section-title',
	  sectionSuggestionsContainer: 'react-autosuggest__section-suggestions-container'
	};

	function mapToAutowhateverTheme(theme) {
	  var result = {};

	  for (var key in theme) {
	    switch (key) {
	      case 'suggestionsContainer':
	        result['itemsContainer'] = theme[key];
	        break;

	      case 'suggestion':
	        result['item'] = theme[key];
	        break;

	      case 'suggestionFocused':
	        result['itemFocused'] = theme[key];
	        break;

	      case 'sectionSuggestionsContainer':
	        result['sectionItemsContainer'] = theme[key];
	        break;

	      default:
	        result[key] = theme[key];
	    }
	  }

	  return result;
	}

	var AutosuggestContainer = function (_Component) {
	  _inherits(AutosuggestContainer, _Component);

	  function AutosuggestContainer(props) {
	    _classCallCheck(this, AutosuggestContainer);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutosuggestContainer).call(this, props));

	    var initialState = {
	      isFocused: false,
	      isCollapsed: true,
	      focusedSectionIndex: null,
	      focusedSuggestionIndex: null,
	      valueBeforeUpDown: null,
	      lastAction: null
	    };

	    _this.store = (0, _redux.createStore)(_reducerAndActions2.default, initialState);
	    _this.theme = mapToAutowhateverTheme(_this.props.theme);
	    return _this;
	  }

	  _createClass(AutosuggestContainer, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var multiSection = _props.multiSection;
	      var shouldRenderSuggestions = _props.shouldRenderSuggestions;
	      var suggestions = _props.suggestions;
	      var onSuggestionsUpdateRequested = _props.onSuggestionsUpdateRequested;
	      var getSuggestionValue = _props.getSuggestionValue;
	      var renderSuggestion = _props.renderSuggestion;
	      var renderSectionTitle = _props.renderSectionTitle;
	      var getSectionSuggestions = _props.getSectionSuggestions;
	      var inputProps = _props.inputProps;
	      var onSuggestionSelected = _props.onSuggestionSelected;
	      var focusInputOnSuggestionClick = _props.focusInputOnSuggestionClick;
	      var id = _props.id;

	      return _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: this.store },
	        _react2.default.createElement(_Autosuggest2.default, { multiSection: multiSection,
	          shouldRenderSuggestions: shouldRenderSuggestions,
	          suggestions: suggestions,
	          onSuggestionsUpdateRequested: onSuggestionsUpdateRequested,
	          getSuggestionValue: getSuggestionValue,
	          renderSuggestion: renderSuggestion,
	          renderSectionTitle: renderSectionTitle,
	          getSectionSuggestions: getSectionSuggestions,
	          inputProps: inputProps,
	          onSuggestionSelected: onSuggestionSelected,
	          focusInputOnSuggestionClick: focusInputOnSuggestionClick,
	          theme: this.theme,
	          id: id })
	      );
	    }
	  }]);

	  return AutosuggestContainer;
	}(_react.Component);

	AutosuggestContainer.propTypes = {
	  suggestions: _react.PropTypes.array.isRequired,
	  onSuggestionsUpdateRequested: _react.PropTypes.func,
	  getSuggestionValue: _react.PropTypes.func.isRequired,
	  renderSuggestion: _react.PropTypes.func.isRequired,
	  inputProps: function inputProps(props, propName) {
	    var inputProps = props[propName];

	    if (!inputProps.hasOwnProperty('value')) {
	      throw new Error('\'inputProps\' must have \'value\'.');
	    }

	    if (!inputProps.hasOwnProperty('onChange')) {
	      throw new Error('\'inputProps\' must have \'onChange\'.');
	    }
	  },
	  shouldRenderSuggestions: _react.PropTypes.func,
	  onSuggestionSelected: _react.PropTypes.func,
	  multiSection: _react.PropTypes.bool,
	  renderSectionTitle: _react.PropTypes.func,
	  getSectionSuggestions: _react.PropTypes.func,
	  focusInputOnSuggestionClick: _react.PropTypes.bool,
	  theme: _react.PropTypes.object,
	  id: _react.PropTypes.string
	};
	AutosuggestContainer.defaultProps = {
	  onSuggestionsUpdateRequested: noop,
	  shouldRenderSuggestions: function shouldRenderSuggestions(value) {
	    return value.trim().length > 0;
	  },
	  onSuggestionSelected: noop,
	  multiSection: false,
	  renderSectionTitle: function renderSectionTitle() {
	    throw new Error('`renderSectionTitle` must be provided');
	  },
	  getSectionSuggestions: function getSectionSuggestions() {
	    throw new Error('`getSectionSuggestions` must be provided');
	  },

	  focusInputOnSuggestionClick: true,
	  theme: defaultTheme,
	  id: '1'
	};
	exports.default = AutosuggestContainer;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(4);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(6);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(10);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(11);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(12);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(5);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */

	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	var objStringValue = fnToString(Object);

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

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(4);

	var _isPlainObject = __webpack_require__(5);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(8);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _pick = __webpack_require__(9);

	var _pick2 = _interopRequireDefault(_pick);

	/* eslint-disable no-console */

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!_isPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */

	function combineReducers(reducers) {
	  var finalReducers = _pick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _mapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var hasChanged = false;
	    var finalState = _mapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
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
/* 9 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(8);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _mapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(12);

	var _compose2 = _interopRequireDefault(_compose);

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Provider = __webpack_require__(14);
	var connect = __webpack_require__(16);

	module.exports = { Provider: Provider, connect: connect };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(2);

	var Component = _require.Component;
	var PropTypes = _require.PropTypes;
	var Children = _require.Children;

	var storeShape = __webpack_require__(15);

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }

	  didWarnAboutReceivingStore = true;
	  console.error( // eslint-disable-line no-console
	  '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = (function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.store = props.store;
	    return _this;
	  }

	  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return Children.only(children);
	  };

	  return Provider;
	})(Component);

	Provider.propTypes = {
	  store: storeShape.isRequired,
	  children: PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: storeShape.isRequired
	};

	module.exports = Provider;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(2);

	var PropTypes = _require.PropTypes;

	var storeShape = PropTypes.shape({
	  subscribe: PropTypes.func.isRequired,
	  dispatch: PropTypes.func.isRequired,
	  getState: PropTypes.func.isRequired
	});

	module.exports = storeShape;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(2);

	var Component = _require.Component;
	var createElement = _require.createElement;

	var storeShape = __webpack_require__(15);
	var shallowEqual = __webpack_require__(17);
	var isPlainObject = __webpack_require__(18);
	var wrapActionCreators = __webpack_require__(19);
	var hoistStatics = __webpack_require__(20);
	var invariant = __webpack_require__(21);

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	  var finalMapDispatchToProps = isPlainObject(mapDispatchToProps) ? wrapActionCreators(mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var doStatePropsDependOnOwnProps = finalMapStateToProps.length !== 1;
	  var doDispatchPropsDependOnOwnProps = finalMapDispatchToProps.length !== 1;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  // Helps track hot reloading.

	  var version = nextVersion++;

	  function computeStateProps(store, props) {
	    var state = store.getState();
	    var stateProps = doStatePropsDependOnOwnProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);

	    invariant(isPlainObject(stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
	    return stateProps;
	  }

	  function computeDispatchProps(store, props) {
	    var dispatch = store.dispatch;

	    var dispatchProps = doDispatchPropsDependOnOwnProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);

	    invariant(isPlainObject(dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
	    return dispatchProps;
	  }

	  function computeMergedProps(stateProps, dispatchProps, parentProps) {
	    var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	    invariant(isPlainObject(mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
	    return mergedProps;
	  }

	  return function wrapWithConnect(WrappedComponent) {
	    var Connect = (function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        invariant(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + _this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + _this.constructor.displayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = computeStateProps(this.store, this.props);
	        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedProps = function updateMergedProps() {
	        this.mergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !shallowEqual(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };

	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.renderedElement = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var prevStoreState = this.state.storeState;
	        var storeState = this.store.getState();

	        if (!pure || prevStoreState !== storeState) {
	          this.hasStoreStateChanged = true;
	          this.setState({ storeState: storeState });
	        }
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        invariant(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var renderedElement = this.renderedElement;

	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          this.updateMergedProps();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = createElement(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = createElement(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    })(Component);

	    Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: storeShape
	    };
	    Connect.propTypes = {
	      store: storeShape
	    };

	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }

	    return hoistStatics(Connect, WrappedComponent);
	  };
	}

	module.exports = connect;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

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

	module.exports = shallowEqual;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	    return false;
	  }

	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

	  if (proto === null) {
	    return true;
	  }

	  var constructor = proto.constructor;

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = isPlainObject;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(3);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ },
/* 20 */
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

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            targetComponent[keys[i]] = sourceComponent[keys[i]];
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
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
	  if (process.env.NODE_ENV !== 'production') {
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.inputFocused = inputFocused;
	exports.inputBlurred = inputBlurred;
	exports.inputChanged = inputChanged;
	exports.updateFocusedSuggestion = updateFocusedSuggestion;
	exports.revealSuggestions = revealSuggestions;
	exports.closeSuggestions = closeSuggestions;
	exports.default = reducer;
	var INPUT_FOCUSED = 'INPUT_FOCUSED';
	var INPUT_BLURRED = 'INPUT_BLURRED';
	var INPUT_CHANGED = 'INPUT_CHANGED';
	var UPDATE_FOCUSED_SUGGESTION = 'UPDATE_FOCUSED_SUGGESTION';
	var REVEAL_SUGGESTIONS = 'REVEAL_SUGGESTIONS';
	var CLOSE_SUGGESTIONS = 'CLOSE_SUGGESTIONS';

	function inputFocused(shouldRenderSuggestions) {
	  return {
	    type: INPUT_FOCUSED,
	    shouldRenderSuggestions: shouldRenderSuggestions
	  };
	}

	function inputBlurred() {
	  return {
	    type: INPUT_BLURRED
	  };
	}

	function inputChanged(shouldRenderSuggestions, lastAction) {
	  return {
	    type: INPUT_CHANGED,
	    shouldRenderSuggestions: shouldRenderSuggestions,
	    lastAction: lastAction
	  };
	}

	function updateFocusedSuggestion(sectionIndex, suggestionIndex, value) {
	  return {
	    type: UPDATE_FOCUSED_SUGGESTION,
	    sectionIndex: sectionIndex,
	    suggestionIndex: suggestionIndex,
	    value: value
	  };
	}

	function revealSuggestions() {
	  return {
	    type: REVEAL_SUGGESTIONS
	  };
	}

	function closeSuggestions(lastAction) {
	  return {
	    type: CLOSE_SUGGESTIONS,
	    lastAction: lastAction
	  };
	}

	function reducer(state, action) {
	  switch (action.type) {
	    case INPUT_FOCUSED:
	      return _extends({}, state, {
	        isFocused: true,
	        isCollapsed: !action.shouldRenderSuggestions
	      });

	    case INPUT_BLURRED:
	      return _extends({}, state, {
	        isFocused: false,
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        isCollapsed: true
	      });

	    case INPUT_CHANGED:
	      return _extends({}, state, {
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        valueBeforeUpDown: null,
	        isCollapsed: !action.shouldRenderSuggestions,
	        lastAction: action.lastAction
	      });

	    case UPDATE_FOCUSED_SUGGESTION:
	      {
	        var value = action.value;
	        var sectionIndex = action.sectionIndex;
	        var suggestionIndex = action.suggestionIndex;

	        var valueBeforeUpDown = state.valueBeforeUpDown === null && typeof value !== 'undefined' ? value : state.valueBeforeUpDown;

	        return _extends({}, state, {
	          focusedSectionIndex: sectionIndex,
	          focusedSuggestionIndex: suggestionIndex,
	          valueBeforeUpDown: valueBeforeUpDown
	        });
	      }

	    case REVEAL_SUGGESTIONS:
	      return _extends({}, state, {
	        isCollapsed: false
	      });

	    case CLOSE_SUGGESTIONS:
	      return _extends({}, state, {
	        focusedSectionIndex: null,
	        focusedSuggestionIndex: null,
	        valueBeforeUpDown: null,
	        isCollapsed: true,
	        lastAction: action.lastAction
	      });

	    default:
	      return state;
	  }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(13);

	var _reducerAndActions = __webpack_require__(22);

	var _reactAutowhatever = __webpack_require__(24);

	var _reactAutowhatever2 = _interopRequireDefault(_reactAutowhatever);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function mapStateToProps(state) {
	  return {
	    isFocused: state.isFocused,
	    isCollapsed: state.isCollapsed,
	    focusedSectionIndex: state.focusedSectionIndex,
	    focusedSuggestionIndex: state.focusedSuggestionIndex,
	    valueBeforeUpDown: state.valueBeforeUpDown,
	    lastAction: state.lastAction
	  };
	}

	function mapDispatchToProps(dispatch) {
	  return {
	    inputFocused: function inputFocused(shouldRenderSuggestions) {
	      dispatch((0, _reducerAndActions.inputFocused)(shouldRenderSuggestions));
	    },
	    inputBlurred: function inputBlurred() {
	      dispatch((0, _reducerAndActions.inputBlurred)());
	    },
	    inputChanged: function inputChanged(shouldRenderSuggestions, lastAction) {
	      dispatch((0, _reducerAndActions.inputChanged)(shouldRenderSuggestions, lastAction));
	    },
	    updateFocusedSuggestion: function updateFocusedSuggestion(sectionIndex, suggestionIndex, value) {
	      dispatch((0, _reducerAndActions.updateFocusedSuggestion)(sectionIndex, suggestionIndex, value));
	    },
	    revealSuggestions: function revealSuggestions() {
	      dispatch((0, _reducerAndActions.revealSuggestions)());
	    },
	    closeSuggestions: function closeSuggestions(lastAction) {
	      dispatch((0, _reducerAndActions.closeSuggestions)(lastAction));
	    }
	  };
	}

	var Autosuggest = function (_Component) {
	  _inherits(Autosuggest, _Component);

	  function Autosuggest(props) {
	    _classCallCheck(this, Autosuggest);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Autosuggest).call(this, props));

	    _this.saveInput = _this.saveInput.bind(_this);
	    return _this;
	  }

	  _createClass(Autosuggest, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.suggestions !== this.props.suggestions) {
	        var suggestions = nextProps.suggestions;
	        var inputProps = nextProps.inputProps;
	        var shouldRenderSuggestions = nextProps.shouldRenderSuggestions;
	        var isCollapsed = nextProps.isCollapsed;
	        var revealSuggestions = nextProps.revealSuggestions;
	        var lastAction = nextProps.lastAction;
	        var value = inputProps.value;

	        if (isCollapsed && lastAction !== 'click' && lastAction !== 'enter' && suggestions.length > 0 && shouldRenderSuggestions(value)) {
	          revealSuggestions();
	        }
	      }
	    }
	  }, {
	    key: 'getSuggestion',
	    value: function getSuggestion(sectionIndex, suggestionIndex) {
	      var _props = this.props;
	      var suggestions = _props.suggestions;
	      var multiSection = _props.multiSection;
	      var getSectionSuggestions = _props.getSectionSuggestions;

	      if (multiSection) {
	        return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
	      }

	      return suggestions[suggestionIndex];
	    }
	  }, {
	    key: 'getFocusedSuggestion',
	    value: function getFocusedSuggestion() {
	      var _props2 = this.props;
	      var focusedSectionIndex = _props2.focusedSectionIndex;
	      var focusedSuggestionIndex = _props2.focusedSuggestionIndex;

	      if (focusedSuggestionIndex === null) {
	        return null;
	      }

	      return this.getSuggestion(focusedSectionIndex, focusedSuggestionIndex);
	    }
	  }, {
	    key: 'getSuggestionValueByIndex',
	    value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
	      var getSuggestionValue = this.props.getSuggestionValue;

	      return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex));
	    }
	  }, {
	    key: 'getSuggestionIndices',
	    value: function getSuggestionIndices(suggestionElement) {
	      var sectionIndex = suggestionElement.getAttribute('data-section-index');
	      var suggestionIndex = suggestionElement.getAttribute('data-suggestion-index');

	      return {
	        sectionIndex: typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null,
	        suggestionIndex: parseInt(suggestionIndex, 10)
	      };
	    }
	  }, {
	    key: 'findSuggestionElement',
	    value: function findSuggestionElement(startNode) {
	      var node = startNode;

	      do {
	        if (node.getAttribute('data-suggestion-index') !== null) {
	          return node;
	        }

	        node = node.parentNode;
	      } while (node !== null);

	      console.error('Clicked element:', startNode); // eslint-disable-line no-console
	      throw new Error('Couldn\'t find suggestion element');
	    }
	  }, {
	    key: 'maybeEmitOnChange',
	    value: function maybeEmitOnChange(event, newValue, method) {
	      var _props$inputProps = this.props.inputProps;
	      var value = _props$inputProps.value;
	      var onChange = _props$inputProps.onChange;

	      if (newValue !== value) {
	        onChange && onChange(event, { newValue: newValue, method: method });
	      }
	    }
	  }, {
	    key: 'willRenderSuggestions',
	    value: function willRenderSuggestions() {
	      var _props3 = this.props;
	      var suggestions = _props3.suggestions;
	      var inputProps = _props3.inputProps;
	      var shouldRenderSuggestions = _props3.shouldRenderSuggestions;
	      var value = inputProps.value;

	      return suggestions.length > 0 && shouldRenderSuggestions(value);
	    }
	  }, {
	    key: 'saveInput',
	    value: function saveInput(autowhatever) {
	      if (autowhatever !== null) {
	        this.input = autowhatever.refs.input;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var _props4 = this.props;
	      var suggestions = _props4.suggestions;
	      var onSuggestionsUpdateRequested = _props4.onSuggestionsUpdateRequested;
	      var renderSuggestion = _props4.renderSuggestion;
	      var inputProps = _props4.inputProps;
	      var shouldRenderSuggestions = _props4.shouldRenderSuggestions;
	      var onSuggestionSelected = _props4.onSuggestionSelected;
	      var multiSection = _props4.multiSection;
	      var renderSectionTitle = _props4.renderSectionTitle;
	      var id = _props4.id;
	      var getSectionSuggestions = _props4.getSectionSuggestions;
	      var focusInputOnSuggestionClick = _props4.focusInputOnSuggestionClick;
	      var theme = _props4.theme;
	      var isFocused = _props4.isFocused;
	      var isCollapsed = _props4.isCollapsed;
	      var focusedSectionIndex = _props4.focusedSectionIndex;
	      var focusedSuggestionIndex = _props4.focusedSuggestionIndex;
	      var valueBeforeUpDown = _props4.valueBeforeUpDown;
	      var inputFocused = _props4.inputFocused;
	      var inputBlurred = _props4.inputBlurred;
	      var inputChanged = _props4.inputChanged;
	      var updateFocusedSuggestion = _props4.updateFocusedSuggestion;
	      var revealSuggestions = _props4.revealSuggestions;
	      var closeSuggestions = _props4.closeSuggestions;
	      var value = inputProps.value;
	      var _onBlur = inputProps.onBlur;
	      var _onFocus = inputProps.onFocus;
	      var _onKeyDown = inputProps.onKeyDown;

	      var isOpen = isFocused && !isCollapsed && this.willRenderSuggestions();
	      var items = isOpen ? suggestions : [];
	      var autowhateverInputProps = _extends({}, inputProps, {
	        onFocus: function onFocus(event) {
	          if (!_this2.justClickedOnSuggestion) {
	            inputFocused(shouldRenderSuggestions(value));
	            _onFocus && _onFocus(event);
	          }
	        },
	        onBlur: function onBlur(event) {
	          _this2.onBlurEvent = event;

	          if (!_this2.justClickedOnSuggestion) {
	            inputBlurred();
	            _onBlur && _onBlur(event);

	            if (valueBeforeUpDown !== null && value !== valueBeforeUpDown) {
	              onSuggestionsUpdateRequested({ value: value, reason: 'blur' });
	            }
	          }
	        },
	        onChange: function onChange(event) {
	          var value = event.target.value;
	          var _props5 = _this2.props;
	          var shouldRenderSuggestions = _props5.shouldRenderSuggestions;
	          var onSuggestionsUpdateRequested = _props5.onSuggestionsUpdateRequested;

	          _this2.maybeEmitOnChange(event, value, 'type');
	          inputChanged(shouldRenderSuggestions(value), 'type');
	          onSuggestionsUpdateRequested({ value: value, reason: 'type' });
	        },
	        onKeyDown: function onKeyDown(event, data) {
	          switch (event.key) {
	            case 'ArrowDown':
	            case 'ArrowUp':
	              if (isCollapsed) {
	                if (_this2.willRenderSuggestions()) {
	                  revealSuggestions();
	                }
	              } else if (suggestions.length > 0) {
	                var newFocusedSectionIndex = data.newFocusedSectionIndex;
	                var newFocusedItemIndex = data.newFocusedItemIndex;

	                var newValue = newFocusedItemIndex === null ? valueBeforeUpDown : _this2.getSuggestionValueByIndex(newFocusedSectionIndex, newFocusedItemIndex);

	                updateFocusedSuggestion(newFocusedSectionIndex, newFocusedItemIndex, value);
	                _this2.maybeEmitOnChange(event, newValue, event.key === 'ArrowDown' ? 'down' : 'up');
	              }
	              event.preventDefault();
	              break;

	            case 'Enter':
	              {
	                var focusedSuggestion = _this2.getFocusedSuggestion();

	                if (focusedSuggestion !== null) {
	                  closeSuggestions('enter');
	                  onSuggestionSelected(event, {
	                    suggestion: focusedSuggestion,
	                    suggestionValue: value,
	                    method: 'enter'
	                  });
	                  onSuggestionsUpdateRequested({ value: value, reason: 'enter' });
	                }
	                break;
	              }

	            case 'Escape':
	              if (isOpen) {
	                // If input.type === 'search', the browser clears the input
	                // when Escape is pressed. We want to disable this default
	                // behaviour so that, when suggestions are shown, we just hide
	                // them, without clearing the input.
	                event.preventDefault();
	              }

	              if (valueBeforeUpDown === null) {
	                // Didn't interact with Up/Down
	                if (!isOpen) {
	                  _this2.maybeEmitOnChange(event, '', 'escape');
	                }
	              } else {
	                // Interacted with Up/Down
	                _this2.maybeEmitOnChange(event, valueBeforeUpDown, 'escape');
	              }

	              closeSuggestions('escape');
	              break;
	          }

	          _onKeyDown && _onKeyDown(event);
	        }
	      });
	      var onMouseEnter = function onMouseEnter(event, _ref) {
	        var sectionIndex = _ref.sectionIndex;
	        var itemIndex = _ref.itemIndex;

	        updateFocusedSuggestion(sectionIndex, itemIndex);
	      };
	      var onMouseLeave = function onMouseLeave() {
	        updateFocusedSuggestion(null, null);
	      };
	      var onMouseDown = function onMouseDown() {
	        _this2.justClickedOnSuggestion = true;
	      };
	      var onClick = function onClick(event) {
	        var _getSuggestionIndices = _this2.getSuggestionIndices(_this2.findSuggestionElement(event.target));

	        var sectionIndex = _getSuggestionIndices.sectionIndex;
	        var suggestionIndex = _getSuggestionIndices.suggestionIndex;

	        var clickedSuggestion = _this2.getSuggestion(sectionIndex, suggestionIndex);
	        var clickedSuggestionValue = _this2.props.getSuggestionValue(clickedSuggestion);

	        onSuggestionSelected(event, {
	          suggestion: clickedSuggestion,
	          suggestionValue: clickedSuggestionValue,
	          method: 'click'
	        });
	        _this2.maybeEmitOnChange(event, clickedSuggestionValue, 'click');
	        closeSuggestions('click');

	        if (focusInputOnSuggestionClick === true) {
	          _this2.input.focus();
	        } else {
	          inputBlurred();
	          _onBlur && _onBlur(_this2.onBlurEvent);
	        }

	        onSuggestionsUpdateRequested({ value: clickedSuggestionValue, reason: 'click' });

	        _this2.justClickedOnSuggestion = false;
	      };
	      var itemProps = function itemProps(_ref2) {
	        var sectionIndex = _ref2.sectionIndex;
	        var itemIndex = _ref2.itemIndex;

	        return {
	          'data-section-index': sectionIndex,
	          'data-suggestion-index': itemIndex,
	          onMouseEnter: onMouseEnter,
	          onMouseLeave: onMouseLeave,
	          onMouseDown: onMouseDown,
	          onTouchStart: onMouseDown, // Because on iOS `onMouseDown` is not triggered
	          onClick: onClick
	        };
	      };
	      var renderItem = function renderItem(item) {
	        return renderSuggestion(item, { value: value, valueBeforeUpDown: valueBeforeUpDown });
	      };

	      return _react2.default.createElement(_reactAutowhatever2.default, { multiSection: multiSection,
	        items: items,
	        renderItem: renderItem,
	        renderSectionTitle: renderSectionTitle,
	        getSectionItems: getSectionSuggestions,
	        focusedSectionIndex: focusedSectionIndex,
	        focusedItemIndex: focusedSuggestionIndex,
	        inputProps: autowhateverInputProps,
	        itemProps: itemProps,
	        theme: theme,
	        id: id,
	        ref: this.saveInput });
	    }
	  }]);

	  return Autosuggest;
	}(_react.Component);

	Autosuggest.propTypes = {
	  suggestions: _react.PropTypes.array.isRequired,
	  onSuggestionsUpdateRequested: _react.PropTypes.func.isRequired,
	  getSuggestionValue: _react.PropTypes.func.isRequired,
	  renderSuggestion: _react.PropTypes.func.isRequired,
	  inputProps: _react.PropTypes.object.isRequired,
	  shouldRenderSuggestions: _react.PropTypes.func.isRequired,
	  onSuggestionSelected: _react.PropTypes.func.isRequired,
	  multiSection: _react.PropTypes.bool.isRequired,
	  renderSectionTitle: _react.PropTypes.func.isRequired,
	  getSectionSuggestions: _react.PropTypes.func.isRequired,
	  focusInputOnSuggestionClick: _react.PropTypes.bool.isRequired,
	  theme: _react.PropTypes.object.isRequired,
	  id: _react.PropTypes.string.isRequired,

	  isFocused: _react.PropTypes.bool.isRequired,
	  isCollapsed: _react.PropTypes.bool.isRequired,
	  focusedSectionIndex: _react.PropTypes.number,
	  focusedSuggestionIndex: _react.PropTypes.number,
	  valueBeforeUpDown: _react.PropTypes.string,
	  lastAction: _react.PropTypes.string,

	  inputFocused: _react.PropTypes.func.isRequired,
	  inputBlurred: _react.PropTypes.func.isRequired,
	  inputChanged: _react.PropTypes.func.isRequired,
	  updateFocusedSuggestion: _react.PropTypes.func.isRequired,
	  revealSuggestions: _react.PropTypes.func.isRequired,
	  closeSuggestions: _react.PropTypes.func.isRequired
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Autosuggest);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _sectionIterator = __webpack_require__(25);

	var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

	var _reactThemeable = __webpack_require__(26);

	var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function noop() {}

	var Autowhatever = (function (_Component) {
	  _inherits(Autowhatever, _Component);

	  function Autowhatever(props) {
	    _classCallCheck(this, Autowhatever);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Autowhatever).call(this, props));

	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    return _this;
	  } // Styles. See: https://github.com/markdalgleish/react-themeable

	  _createClass(Autowhatever, [{
	    key: 'getItemId',
	    value: function getItemId(sectionIndex, itemIndex) {
	      if (itemIndex === null) {
	        return null;
	      }

	      var id = this.props.id;

	      var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

	      return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
	    }
	  }, {
	    key: 'getItemsContainerId',
	    value: function getItemsContainerId() {
	      var id = this.props.id;

	      return 'react-whatever-' + id;
	    }
	  }, {
	    key: 'renderItemsList',
	    value: function renderItemsList(theme, items, sectionIndex) {
	      var _this2 = this;

	      var _props = this.props;
	      var renderItem = _props.renderItem;
	      var focusedSectionIndex = _props.focusedSectionIndex;
	      var focusedItemIndex = _props.focusedItemIndex;

	      var isItemPropsFunction = typeof this.props.itemProps === 'function';

	      return items.map(function (item, itemIndex) {
	        var itemPropsObj = isItemPropsFunction ? _this2.props.itemProps({ sectionIndex: sectionIndex, itemIndex: itemIndex }) : _this2.props.itemProps;
	        var onMouseEnter = itemPropsObj.onMouseEnter;
	        var onMouseLeave = itemPropsObj.onMouseLeave;
	        var onMouseDown = itemPropsObj.onMouseDown;
	        var onClick = itemPropsObj.onClick;

	        var onMouseEnterFn = onMouseEnter ? function (event) {
	          return onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
	        } : noop;
	        var onMouseLeaveFn = onMouseLeave ? function (event) {
	          return onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
	        } : noop;
	        var onMouseDownFn = onMouseDown ? function (event) {
	          return onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
	        } : noop;
	        var onClickFn = onClick ? function (event) {
	          return onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
	        } : noop;
	        var itemProps = _extends({
	          id: _this2.getItemId(sectionIndex, itemIndex),
	          role: 'option'
	        }, theme(itemIndex, 'item', sectionIndex === focusedSectionIndex && itemIndex === focusedItemIndex && 'itemFocused'), itemPropsObj, {
	          onMouseEnter: onMouseEnterFn,
	          onMouseLeave: onMouseLeaveFn,
	          onMouseDown: onMouseDownFn,
	          onClick: onClickFn
	        });

	        return _react2.default.createElement(
	          'li',
	          itemProps,
	          renderItem(item)
	        );
	      });
	    }
	  }, {
	    key: 'renderSections',
	    value: function renderSections(theme) {
	      var _this3 = this;

	      var _props2 = this.props;
	      var items = _props2.items;
	      var getSectionItems = _props2.getSectionItems;

	      var sectionItemsArray = items.map(function (section) {
	        return getSectionItems(section);
	      });
	      var noItemsExist = sectionItemsArray.every(function (sectionItems) {
	        return sectionItems.length === 0;
	      });

	      if (noItemsExist) {
	        return null;
	      }

	      var _props3 = this.props;
	      var shouldRenderSection = _props3.shouldRenderSection;
	      var renderSectionTitle = _props3.renderSectionTitle;

	      return _react2.default.createElement(
	        'div',
	        _extends({ id: this.getItemsContainerId(),
	          role: 'listbox'
	        }, theme('itemsContainer', 'itemsContainer')),
	        items.map(function (section, sectionIndex) {
	          if (!shouldRenderSection(section)) {
	            return null;
	          }

	          var sectionTitle = renderSectionTitle(section);

	          return _react2.default.createElement(
	            'div',
	            _extends({ key: sectionIndex
	            }, theme(sectionIndex, 'sectionContainer')),
	            sectionTitle && _react2.default.createElement(
	              'div',
	              theme('sectionTitle', 'sectionTitle'),
	              sectionTitle
	            ),
	            _react2.default.createElement(
	              'ul',
	              theme('sectionItemsContainer', 'sectionItemsContainer'),
	              _this3.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex)
	            )
	          );
	        })
	      );
	    }
	  }, {
	    key: 'renderItems',
	    value: function renderItems(theme) {
	      var items = this.props.items;

	      if (items.length === 0) {
	        return null;
	      }

	      return _react2.default.createElement(
	        'ul',
	        _extends({ id: this.getItemsContainerId(),
	          role: 'listbox'
	        }, theme('itemsContainer', 'itemsContainer')),
	        this.renderItemsList(theme, items, null)
	      );
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(event) {
	      var _props4 = this.props;
	      var inputProps = _props4.inputProps;
	      var focusedSectionIndex = _props4.focusedSectionIndex;
	      var focusedItemIndex = _props4.focusedItemIndex;
	      var onKeyDownFn = inputProps.onKeyDown; // Babel is throwing:
	      //   "onKeyDown" is read-only
	      // on:
	      //   const { onKeyDown } = inputProps;

	      switch (event.key) {
	        case 'ArrowDown':
	        case 'ArrowUp':
	          var _props5 = this.props;
	          var multiSection = _props5.multiSection;
	          var items = _props5.items;
	          var getSectionItems = _props5.getSectionItems;

	          var sectionIterator = (0, _sectionIterator2.default)({
	            multiSection: multiSection,
	            data: multiSection ? items.map(function (section) {
	              return getSectionItems(section).length;
	            }) : items.length
	          });
	          var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

	          var _sectionIterator$next = sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]);

	          var _sectionIterator$next2 = _slicedToArray(_sectionIterator$next, 2);

	          var newFocusedSectionIndex = _sectionIterator$next2[0];
	          var newFocusedItemIndex = _sectionIterator$next2[1];

	          onKeyDownFn(event, { newFocusedSectionIndex: newFocusedSectionIndex, newFocusedItemIndex: newFocusedItemIndex });
	          break;

	        default:
	          onKeyDownFn(event, { focusedSectionIndex: focusedSectionIndex, focusedItemIndex: focusedItemIndex });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props6 = this.props;
	      var multiSection = _props6.multiSection;
	      var focusedSectionIndex = _props6.focusedSectionIndex;
	      var focusedItemIndex = _props6.focusedItemIndex;

	      var theme = (0, _reactThemeable2.default)(this.props.theme);
	      var renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
	      var isOpen = renderedItems !== null;
	      var ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
	      var inputProps = _extends({
	        type: 'text',
	        value: '',
	        autoComplete: 'off',
	        role: 'combobox',
	        ref: 'input',
	        'aria-autocomplete': 'list',
	        'aria-owns': this.getItemsContainerId(),
	        'aria-expanded': isOpen,
	        'aria-activedescendant': ariaActivedescendant
	      }, theme('input', 'input'), this.props.inputProps, {
	        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
	      });

	      return _react2.default.createElement(
	        'div',
	        theme('container', 'container', isOpen && 'containerOpen'),
	        _react2.default.createElement('input', inputProps),
	        renderedItems
	      );
	    }
	  }]);

	  return Autowhatever;
	})(_react.Component);

	Autowhatever.propTypes = {
	  id: _react.PropTypes.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
	  multiSection: _react.PropTypes.bool, // Indicates whether a multi section layout should be rendered.
	  items: _react.PropTypes.array.isRequired, // Array of items or sections to render.
	  renderItem: _react.PropTypes.func, // This function renders a single item.
	  shouldRenderSection: _react.PropTypes.func, // This function gets a section and returns whether it should be rendered, or not.
	  renderSectionTitle: _react.PropTypes.func, // This function gets a section and renders its title.
	  getSectionItems: _react.PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
	  inputProps: _react.PropTypes.object, // Arbitrary input props
	  itemProps: _react.PropTypes.oneOfType([// Arbitrary item props
	  _react.PropTypes.object, _react.PropTypes.func]),
	  focusedSectionIndex: _react.PropTypes.number, // Section index of the focused item
	  focusedItemIndex: _react.PropTypes.number, // Focused item index (within a section)
	  theme: _react.PropTypes.object };
	Autowhatever.defaultProps = {
	  id: '1',
	  multiSection: false,
	  shouldRenderSection: function shouldRenderSection() {
	    return true;
	  },
	  renderItem: function renderItem() {
	    throw new Error('`renderItem` must be provided');
	  },
	  renderSectionTitle: function renderSectionTitle() {
	    throw new Error('`renderSectionTitle` must be provided');
	  },
	  getSectionItems: function getSectionItems() {
	    throw new Error('`getSectionItems` must be provided');
	  },
	  inputProps: {},
	  itemProps: {},
	  focusedSectionIndex: null,
	  focusedItemIndex: null,
	  theme: {
	    container: 'react-autowhatever__container',
	    containerOpen: 'react-autowhatever__container--open',
	    input: 'react-autowhatever__input',
	    itemsContainer: 'react-autowhatever__items-container',
	    item: 'react-autowhatever__item',
	    itemFocused: 'react-autowhatever__item--focused',
	    sectionContainer: 'react-autowhatever__section-container',
	    sectionTitle: 'react-autowhatever__section-title',
	    sectionItemsContainer: 'react-autowhatever__section-items-container'
	  }
	};
	exports.default = Autowhatever;


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	exports["default"] = function (_ref) {
	  var data = _ref.data;
	  var multiSection = _ref.multiSection;

	  function nextNonEmptySectionIndex(sectionIndex) {
	    if (sectionIndex === null) {
	      sectionIndex = 0;
	    } else {
	      sectionIndex++;
	    }

	    while (sectionIndex < data.length && data[sectionIndex] === 0) {
	      sectionIndex++;
	    }

	    return sectionIndex === data.length ? null : sectionIndex;
	  }

	  function prevNonEmptySectionIndex(sectionIndex) {
	    if (sectionIndex === null) {
	      sectionIndex = data.length - 1;
	    } else {
	      sectionIndex--;
	    }

	    while (sectionIndex >= 0 && data[sectionIndex] === 0) {
	      sectionIndex--;
	    }

	    return sectionIndex === -1 ? null : sectionIndex;
	  }

	  function next(position) {
	    var _position = _slicedToArray(position, 2);

	    var sectionIndex = _position[0];
	    var itemIndex = _position[1];

	    if (multiSection) {
	      if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
	        sectionIndex = nextNonEmptySectionIndex(sectionIndex);

	        if (sectionIndex === null) {
	          return [null, null];
	        }

	        return [sectionIndex, 0];
	      }

	      return [sectionIndex, itemIndex + 1];
	    }

	    if (data === 0 || itemIndex === data - 1) {
	      return [null, null];
	    }

	    if (itemIndex === null) {
	      return [null, 0];
	    }

	    return [null, itemIndex + 1];
	  }

	  function prev(position) {
	    var _position2 = _slicedToArray(position, 2);

	    var sectionIndex = _position2[0];
	    var itemIndex = _position2[1];

	    if (multiSection) {
	      if (itemIndex === null || itemIndex === 0) {
	        sectionIndex = prevNonEmptySectionIndex(sectionIndex);

	        if (sectionIndex === null) {
	          return [null, null];
	        }

	        return [sectionIndex, data[sectionIndex] - 1];
	      }

	      return [sectionIndex, itemIndex - 1];
	    }

	    if (data === 0 || itemIndex === 0) {
	      return [null, null];
	    }

	    if (itemIndex === null) {
	      return [null, data - 1];
	    }

	    return [null, itemIndex - 1];
	  }

	  function isLast(position) {
	    return next(position)[1] === null;
	  }

	  return {
	    next: next,
	    prev: prev,
	    isLast: isLast
	  };
	};

	module.exports = exports["default"];


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _objectAssign = __webpack_require__(27);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var truthy = function truthy(x) {
	  return x;
	};

	exports['default'] = function (theme) {
	  return function (key) {
	    for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      names[_key - 1] = arguments[_key];
	    }

	    var styles = names.map(function (name) {
	      return theme[name];
	    }).filter(truthy);

	    return typeof styles[0] === 'string' ? { key: key, className: styles.join(' ') } : { key: key, style: _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(styles))) };
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ }
/******/ ])
});
;