"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = exports.createGlobalState = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// utility functions
var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};

var updateValue = function updateValue(oldValue, newValue) {
  if (isFunction(newValue)) {
    return newValue(oldValue);
  }

  return newValue;
}; // core functions


var UPDATE_STATE = process.env.NODE_ENV !== 'production' ? Symbol('UPDATE_STATE')
/* for production */
: Symbol();
var PROP_UPDATER = 'r';
var PROP_STATE = 'e';
var PROP_USE_GLOBAL_STATE_PROVIDER = 'p';
var PROP_SET_GLOBAL_STATE = 's';
var PROP_USE_GLOBAL_STATE = 'u';
var PROP_GET_GLOBAL_STATE = 'g';
var PROP_GET_WHOLE_STATE = 'h';
var PROP_SET_WHOLE_STATE = 'i';
var PROP_DISPATCH_ACTION = 'd';

var createGlobalStateCommon = function createGlobalStateCommon(reducer, initialState) {
  var _ref;

  var keys = Object.keys(initialState);
  var globalState = initialState;
  var linkedDispatch = null;
  var listeners = {};
  keys.forEach(function (key) {
    listeners[key] = new Set();
  });

  var patchedReducer = function patchedReducer(state, action) {
    if (action.type === UPDATE_STATE) {
      return action[PROP_UPDATER] ? action[PROP_UPDATER](state) : action[PROP_STATE];
    }

    return reducer(state, action);
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

    if (linkedDispatch) {
      linkedDispatch(_defineProperty({
        type: UPDATE_STATE
      }, PROP_UPDATER, updater));
    } else {
      globalState = updater(globalState);
      var nextPartialState = globalState[name];
      listeners[name].forEach(function (listener) {
        return listener(nextPartialState);
      });
    }
  };

  var notifyListeners = function notifyListeners(prevState, nextState) {
    keys.forEach(function (key) {
      var nextPartialState = nextState[key];

      if (prevState[key] !== nextPartialState) {
        listeners[key].forEach(function (listener) {
          return listener(nextPartialState);
        });
      }
    });
  };

  var useGlobalStateProvider = function useGlobalStateProvider() {
    var _useReducer = (0, _react.useReducer)(patchedReducer, globalState),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        state = _useReducer2[0],
        dispatch = _useReducer2[1];

    (0, _react.useEffect)(function () {
      if (linkedDispatch) throw new Error('Only one global state provider is allowed');
      linkedDispatch = dispatch; // in case it's changed before this effect is handled

      dispatch(_defineProperty({
        type: UPDATE_STATE
      }, PROP_STATE, globalState));

      var cleanup = function cleanup() {
        linkedDispatch = null;
      };

      return cleanup;
    }, []);
    var prevGlobalState = (0, _react.useRef)(state);
    notifyListeners(prevGlobalState.current, state);
    prevGlobalState.current = state;
    (0, _react.useEffect)(function () {
      globalState = state;
    }, [state]);
  };

  var useGlobalState = function useGlobalState(name) {
    if (process.env.NODE_ENV !== 'production') {
      validateName(name);
    }

    var _useState = (0, _react.useState)(globalState[name]),
        _useState2 = _slicedToArray(_useState, 2),
        partialState = _useState2[0],
        setPartialState = _useState2[1];

    (0, _react.useEffect)(function () {
      listeners[name].add(setPartialState);
      setPartialState(globalState[name]); // in case it's changed before this effect is handled

      var cleanup = function cleanup() {
        listeners[name]["delete"](setPartialState);
      };

      return cleanup;
    }, [name]);
    var updater = (0, _react.useCallback)(function (u) {
      return setGlobalState(name, u);
    }, [name]);
    return [partialState, updater];
  };

  var getGlobalState = function getGlobalState(name) {
    if (process.env.NODE_ENV !== 'production') {
      validateName(name);
    }

    return globalState[name];
  };

  var getWholeState = function getWholeState() {
    return globalState;
  };

  var setWholeState = function setWholeState(nextGlobalState) {
    if (linkedDispatch) {
      linkedDispatch(_defineProperty({
        type: UPDATE_STATE
      }, PROP_STATE, nextGlobalState));
    } else {
      var prevGlobalState = globalState;
      globalState = nextGlobalState;
      notifyListeners(prevGlobalState, globalState);
    }
  };

  var dispatchAction = function dispatchAction(action) {
    if (linkedDispatch) {
      linkedDispatch(action);
    } else {
      var prevGlobalState = globalState;
      globalState = reducer(globalState, action);
      notifyListeners(prevGlobalState, globalState);
    }

    return action;
  };

  return _ref = {}, _defineProperty(_ref, PROP_USE_GLOBAL_STATE_PROVIDER, useGlobalStateProvider), _defineProperty(_ref, PROP_SET_GLOBAL_STATE, setGlobalState), _defineProperty(_ref, PROP_USE_GLOBAL_STATE, useGlobalState), _defineProperty(_ref, PROP_GET_GLOBAL_STATE, getGlobalState), _defineProperty(_ref, PROP_GET_WHOLE_STATE, getWholeState), _defineProperty(_ref, PROP_SET_WHOLE_STATE, setWholeState), _defineProperty(_ref, PROP_DISPATCH_ACTION, dispatchAction), _ref;
}; // export functions


var createGlobalState = function createGlobalState(initialState) {
  var _createGlobalStateCom = createGlobalStateCommon(function (state) {
    return state;
  }, initialState),
      useGlobalStateProvider = _createGlobalStateCom[PROP_USE_GLOBAL_STATE_PROVIDER],
      useGlobalState = _createGlobalStateCom[PROP_USE_GLOBAL_STATE],
      setGlobalState = _createGlobalStateCom[PROP_SET_GLOBAL_STATE],
      getGlobalState = _createGlobalStateCom[PROP_GET_GLOBAL_STATE];

  return {
    useGlobalStateProvider: useGlobalStateProvider,
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
      useGlobalStateProvider = _createGlobalStateCom2[PROP_USE_GLOBAL_STATE_PROVIDER],
      useGlobalState = _createGlobalStateCom2[PROP_USE_GLOBAL_STATE],
      getWholeState = _createGlobalStateCom2[PROP_GET_WHOLE_STATE],
      setWholeState = _createGlobalStateCom2[PROP_SET_WHOLE_STATE],
      dispatchAction = _createGlobalStateCom2[PROP_DISPATCH_ACTION];

  return {
    useGlobalStateProvider: useGlobalStateProvider,
    useGlobalState: useGlobalState,
    getState: getWholeState,
    setState: setWholeState,
    // for devtools.js
    dispatch: dispatchAction
  };
};

exports.createStore = createStore;