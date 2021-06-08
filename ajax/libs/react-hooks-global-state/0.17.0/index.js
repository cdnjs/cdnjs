"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = exports.createGlobalState = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// utility functions
var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};

var updateValue = function updateValue(oldValue, newValue) {
  if (isFunction(newValue)) {
    return newValue(oldValue);
  }

  return newValue;
}; // ref: https://github.com/dai-shi/react-hooks-global-state/issues/5


var useUnstableContextWithoutWarning = function useUnstableContextWithoutWarning(Context, observedBits) {
  var ReactCurrentDispatcher = _react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
  var dispatcher = ReactCurrentDispatcher.current;

  if (!dispatcher) {
    throw new Error('Hooks can only be called inside the body of a function component. (https://fb.me/react-invalid-hook-call)');
  }

  return dispatcher.useContext(Context, observedBits);
}; // core functions


var EMPTY_OBJECT = {};
var UPDATE_STATE = Symbol('UPDATE_STATE');
var PROP_GLOBAL_STATE_PROVIDER = 'p';
var PROP_SET_GLOBAL_STATE = 's';
var PROP_USE_GLOBAL_STATE = 'u';
var PROP_GET_GLOBAL_STATE = 'g';
var PROP_GET_WHOLE_STATE = 'h';
var PROP_SET_WHOLE_STATE = 'i';
var PROP_DISPATCH_ACTION = 'd';

var createGlobalStateCommon = function createGlobalStateCommon(reducer, initialState) {
  var _ref2;

  var keys = Object.keys(initialState);
  var wholeState = initialState;
  var listener = null;

  var patchedReducer = function patchedReducer(state, action) {
    if (action.type === UPDATE_STATE) {
      return action.updater(state);
    }

    return reducer(state, action);
  };

  var calculateChangedBits = function calculateChangedBits(a, b) {
    var bits = 0;
    keys.forEach(function (k, i) {
      if (a[k] !== b[k]) bits |= 1 << i;
    });
    return bits;
  };

  var Context = (0, _react.createContext)(EMPTY_OBJECT, calculateChangedBits);

  var GlobalStateProvider = function GlobalStateProvider(_ref) {
    var children = _ref.children;

    var _useReducer = (0, _react.useReducer)(patchedReducer, initialState),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        state = _useReducer2[0],
        dispatch = _useReducer2[1];

    (0, _react.useEffect)(function () {
      if (listener) throw new Error('You cannot use <GlobalStateProvider> more than once.');
      listener = dispatch;

      if (state !== initialState) {
        // probably state was saved by react-hot-loader, so restore it
        wholeState = state;
      } else if (state !== wholeState) {
        // wholeState was updated during initialization
        dispatch({
          type: UPDATE_STATE,
          updater: function updater() {
            return wholeState;
          }
        });
      }

      var cleanup = function cleanup() {
        listener = null;
      };

      return cleanup; // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialState]); // trick for react-hot-loader

    (0, _react.useEffect)(function () {
      // store the latest state
      wholeState = state;
    });
    return (0, _react.createElement)(Context.Provider, {
      value: state
    }, children);
  };

  var validateName = function validateName(name) {
    if (!keys.includes(name)) {
      throw new Error("'".concat(name, "' not found. It must be provided in initialState as a property key."));
    }
  };

  var setGlobalState = function setGlobalState(name, update) {
    if (process.env.NODE_ENV !== 'production') {
      validateName(name);
    }

    var updater = function updater(previousState) {
      return _objectSpread({}, previousState, _defineProperty({}, name, updateValue(previousState[name], update)));
    };

    if (listener) {
      listener({
        type: UPDATE_STATE,
        updater: updater
      });
    } else {
      wholeState = updater(wholeState);
    }
  };

  var useGlobalState = function useGlobalState(name) {
    if (process.env.NODE_ENV !== 'production') {
      validateName(name);
    }

    var index = keys.indexOf(name);
    var observedBits = 1 << index;
    var state = useUnstableContextWithoutWarning(Context, observedBits);
    if (state === EMPTY_OBJECT) throw new Error('Please use <GlobalStateProvider>');
    var updater = (0, _react.useCallback)(function (u) {
      return setGlobalState(name, u);
    }, [name]);
    return [state[name], updater];
  };

  var getGlobalState = function getGlobalState(name) {
    if (process.env.NODE_ENV !== 'production') {
      validateName(name);
    }

    return wholeState[name];
  };

  var getWholeState = function getWholeState() {
    return wholeState;
  };

  var setWholeState = function setWholeState(state) {
    if (listener) {
      listener({
        type: UPDATE_STATE,
        updater: function updater() {
          return state;
        }
      });
    } else {
      wholeState = state;
    }
  };

  var dispatchAction = function dispatchAction(action) {
    if (listener) {
      listener(action);
    } else {
      wholeState = reducer(wholeState, action);
    }

    return action;
  };

  return _ref2 = {}, _defineProperty(_ref2, PROP_GLOBAL_STATE_PROVIDER, GlobalStateProvider), _defineProperty(_ref2, PROP_SET_GLOBAL_STATE, setGlobalState), _defineProperty(_ref2, PROP_USE_GLOBAL_STATE, useGlobalState), _defineProperty(_ref2, PROP_GET_GLOBAL_STATE, getGlobalState), _defineProperty(_ref2, PROP_GET_WHOLE_STATE, getWholeState), _defineProperty(_ref2, PROP_SET_WHOLE_STATE, setWholeState), _defineProperty(_ref2, PROP_DISPATCH_ACTION, dispatchAction), _ref2;
}; // export functions


var createGlobalState = function createGlobalState(initialState) {
  var _createGlobalStateCom = createGlobalStateCommon(function (state) {
    return state;
  }, initialState),
      GlobalStateProvider = _createGlobalStateCom[PROP_GLOBAL_STATE_PROVIDER],
      useGlobalState = _createGlobalStateCom[PROP_USE_GLOBAL_STATE],
      setGlobalState = _createGlobalStateCom[PROP_SET_GLOBAL_STATE],
      getGlobalState = _createGlobalStateCom[PROP_GET_GLOBAL_STATE];

  return {
    GlobalStateProvider: GlobalStateProvider,
    useGlobalState: useGlobalState,
    setGlobalState: setGlobalState,
    getGlobalState: getGlobalState
  };
};

exports.createGlobalState = createGlobalState;

var createStore = function createStore(reducer, initialState, enhancer) {
  if (!initialState) initialState = reducer(undefined, {
    type: undefined
  });
  if (enhancer) return enhancer(createStore)(reducer, initialState);

  var _createGlobalStateCom2 = createGlobalStateCommon(reducer, initialState),
      GlobalStateProvider = _createGlobalStateCom2[PROP_GLOBAL_STATE_PROVIDER],
      useGlobalState = _createGlobalStateCom2[PROP_USE_GLOBAL_STATE],
      getWholeState = _createGlobalStateCom2[PROP_GET_WHOLE_STATE],
      setWholeState = _createGlobalStateCom2[PROP_SET_WHOLE_STATE],
      dispatchAction = _createGlobalStateCom2[PROP_DISPATCH_ACTION];

  return {
    GlobalStateProvider: GlobalStateProvider,
    useGlobalState: useGlobalState,
    getState: getWholeState,
    setState: setWholeState,
    // for devtools.js
    dispatch: dispatchAction
  };
};

exports.createStore = createStore;