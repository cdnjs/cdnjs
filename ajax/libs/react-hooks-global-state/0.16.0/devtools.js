"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxDevToolsExt = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var compose = function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (p, c) {
    return function () {
      return p(c.apply(void 0, arguments));
    };
  });
};

var initAction = function initAction() {
  return {
    type: '@@redux/INIT'
  };
};

var createEnhancers = function createEnhancers() {
  var savedReducer;
  var savedInitialState;

  var before = function before(createStore) {
    return function (reducer, initialState, enhancer) {
      savedReducer = reducer;
      savedInitialState = initialState;
      if (enhancer) return enhancer(createStore)(reducer, initialState);
      var store = createStore(reducer, initialState);
      return _objectSpread({}, store, {
        useGlobalState: function useGlobalState(name) {
          var _store$useGlobalState = store.useGlobalState(name),
              _store$useGlobalState2 = _slicedToArray(_store$useGlobalState, 1),
              value = _store$useGlobalState2[0];

          var MESG = 'Update is not allowed when using DevTools';
          return [value, function () {
            throw new Error(MESG);
          }];
        }
      });
    };
  };

  var after = function after(createStore) {
    return function (reducer, initialState, enhancer) {
      if (enhancer) return enhancer(createStore)(reducer, initialState);
      var store = createStore(savedReducer, savedInitialState);

      var devState = _objectSpread({}, reducer(initialState, initAction()), {}, savedInitialState);

      var getState = function getState() {
        return devState;
      };

      var listeners = [];

      var dispatch = function dispatch(action) {
        devState = reducer(devState, action);
        store.setState(devState.computedStates[devState.currentStateIndex].state);
        listeners.forEach(function (f) {
          return f();
        });
        return action;
      };

      var subscribe = function subscribe(listener) {
        listeners.push(listener);

        var unsubscribe = function unsubscribe() {
          var index = listeners.indexOf(listener);
          listeners.splice(index, 1);
        };

        return unsubscribe;
      };

      return _objectSpread({}, store, {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
      });
    };
  };

  return {
    before: before,
    after: after
  };
};

var reduxDevToolsExt = function reduxDevToolsExt() {
  if (!window.__REDUX_DEVTOOLS_EXTENSION__) return function (f) {
    return f;
  };

  var _createEnhancers = createEnhancers(),
      before = _createEnhancers.before,
      after = _createEnhancers.after;

  return compose(before, window.__REDUX_DEVTOOLS_EXTENSION__(), after);
};

exports.reduxDevToolsExt = reduxDevToolsExt;