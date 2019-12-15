(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ReduxPromiseMiddleware"] = factory();
	else
		root["ReduxPromiseMiddleware"] = factory();
})(this, function() {
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _isPromise = __webpack_require__(1);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

	/**
	 * @function promiseMiddleware
	 * @description
	 * @returns {function} thunk
	 */
	module.exports = function promiseMiddleware() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypes;

	  return function (ref) {
	    var dispatch = ref.dispatch;


	    return function (next) {
	      return function (action) {
	        if (action.payload) {
	          if (!(0, _isPromise2.default)(action.payload) && !(0, _isPromise2.default)(action.payload.promise)) {
	            return next(action);
	          }
	        } else {
	          return next(action);
	        }

	        // Deconstruct the properties of the original action object to constants
	        var type = action.type;
	        var payload = action.payload;
	        var meta = action.meta;

	        // Assign values for promise type suffixes

	        var _ref = (meta || {}).promiseTypeSuffixes || promiseTypeSuffixes;

	        var _ref2 = _slicedToArray(_ref, 3);

	        var PENDING = _ref2[0];
	        var FULFILLED = _ref2[1];
	        var REJECTED = _ref2[2];

	        /**
	         * @function getAction
	         * @description Utility function for creating a rejected or fulfilled
	         * flux standard action object.
	         * @param {boolean} Is the action rejected?
	         * @returns {object} action
	         */

	        var getAction = function getAction(newPayload, isRejected) {
	          return _extends({
	            type: type + '_' + (isRejected ? REJECTED : FULFILLED)
	          }, newPayload ? {
	            payload: newPayload
	          } : {}, !!meta ? { meta: meta } : {}, isRejected ? {
	            error: true
	          } : {});
	        };

	        /**
	         * Assign values for promise and data variables. In the case the payload
	         * is an object with a `promise` and `data` property, the values of those
	         * properties will be used. In the case the payload is a promise, the
	         * value of the payload will be used and data will be null.
	         */
	        var promise = void 0;
	        var data = void 0;

	        if (!(0, _isPromise2.default)(action.payload) && _typeof(action.payload) === 'object') {
	          promise = payload.promise;
	          data = payload.data;
	        } else {
	          promise = payload;
	          data = null;
	        }

	        /**
	         * First, dispatch the pending action. This flux standard action object
	         * describes the pending state of a promise and will include any data
	         * (for optimistic updates) and/or meta from the original action.
	         */
	        next(_extends({
	          type: type + '_' + PENDING
	        }, !!data ? { payload: data } : {}, !!meta ? { meta: meta } : {}));

	        /*
	         * @function handleReject
	         * @description Dispatch the rejected action and return
	         * an error object. The error object should contain the
	         * reason and the dispatched action.
	         * @params reason The reason the promise was rejected
	         * @returns {object}
	         */
	        var handleReject = function handleReject() {
	          var reason = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	          var rejectedAction = getAction(reason, true);
	          dispatch(rejectedAction);

	          var error = reason instanceof Error ? reason : new Error();

	          error.reason = reason;
	          error.action = rejectedAction;

	          throw error;
	        };

	        /*
	         * @function handleFulfill
	         * @description Dispatch the fulfilled action and
	         * return the success object. The success object should
	         * contain the value and the dispatched action.
	         * @param value The value the promise was resloved with
	         * @returns {object}
	         */
	        var handleFulfill = function handleFulfill() {
	          var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	          var resolvedAction = getAction(value, false);
	          dispatch(resolvedAction);

	          return { value: value, action: resolvedAction };
	        };

	        /**
	         * Second, dispatch a rejected or fulfilled action. This flux standard
	         * action object will describe the resolved state of the promise. In
	         * the case of a rejected promise, it will include an `error` property.
	         *
	         * In order to allow proper chaining of actions using `then`, a new
	         * promise is constructed and returned. This promise will resolve
	         * with two properties: (1) the value (if fulfilled) or reason
	         * (if rejected) and (2) the flux standard action.
	         *
	         * Rejected object:
	         * {
	         *   reason: ...
	         *   action: {
	         *     error: true,
	         *     type: 'ACTION_REJECTED',
	         *     payload: ...
	         *   }
	         * }
	         *
	         * Fulfilled object:
	         * {
	         *   value: ...
	         *   action: {
	         *     type: 'ACTION_FULFILLED',
	         *     payload: ...
	         *   }
	         * }
	         */
	        return promise.then(handleFulfill, handleReject);
	      };
	    };
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = isPromise;
	function isPromise(value) {
	  if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	    return value && typeof value.then === 'function';
	  }

	  return false;
	}

/***/ }
/******/ ])
});
;