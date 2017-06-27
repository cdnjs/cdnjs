(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"));
	else
		root["ReduxForm"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.values = exports.untouch = exports.touch = exports.swapArrayValues = exports.SubmissionError = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.setSubmitFailed = exports.reset = exports.propTypes = exports.initialize = exports.removeArrayValue = exports.reduxForm = exports.reducer = exports.focus = exports.FieldArray = exports.Field = exports.destroy = exports.change = exports.blur = exports.addArrayValue = exports.actionTypes = undefined;

	var _createAll2 = __webpack_require__(29);

	var _createAll3 = _interopRequireDefault(_createAll2);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _createAll = (0, _createAll3.default)(_plain2.default);

	var actionTypes = _createAll.actionTypes;
	var addArrayValue = _createAll.addArrayValue;
	var blur = _createAll.blur;
	var change = _createAll.change;
	var destroy = _createAll.destroy;
	var Field = _createAll.Field;
	var FieldArray = _createAll.FieldArray;
	var focus = _createAll.focus;
	var reducer = _createAll.reducer;
	var reduxForm = _createAll.reduxForm;
	var removeArrayValue = _createAll.removeArrayValue;
	var initialize = _createAll.initialize;
	var propTypes = _createAll.propTypes;
	var reset = _createAll.reset;
	var setSubmitFailed = _createAll.setSubmitFailed;
	var startAsyncValidation = _createAll.startAsyncValidation;
	var startSubmit = _createAll.startSubmit;
	var stopAsyncValidation = _createAll.stopAsyncValidation;
	var stopSubmit = _createAll.stopSubmit;
	var SubmissionError = _createAll.SubmissionError;
	var swapArrayValues = _createAll.swapArrayValues;
	var touch = _createAll.touch;
	var untouch = _createAll.untouch;
	var values = _createAll.values;
	exports.actionTypes = actionTypes;
	exports.addArrayValue = addArrayValue;
	exports.blur = blur;
	exports.change = change;
	exports.destroy = destroy;
	exports.Field = Field;
	exports.FieldArray = FieldArray;
	exports.focus = focus;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.removeArrayValue = removeArrayValue;
	exports.initialize = initialize;
	exports.propTypes = propTypes;
	exports.reset = reset;
	exports.setSubmitFailed = setSubmitFailed;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.SubmissionError = SubmissionError;
	exports.swapArrayValues = swapArrayValues;
	exports.touch = touch;
	exports.untouch = untouch;
	exports.values = values;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _splice = __webpack_require__(47);

	var _splice2 = _interopRequireDefault(_splice);

	var _getIn = __webpack_require__(45);

	var _getIn2 = _interopRequireDefault(_getIn);

	var _setIn = __webpack_require__(46);

	var _setIn2 = _interopRequireDefault(_setIn);

	var _deepEqual = __webpack_require__(42);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _deleteIn = __webpack_require__(43);

	var _deleteIn2 = _interopRequireDefault(_deleteIn);

	var _deleteWithPath = __webpack_require__(44);

	var _deleteWithPath2 = _interopRequireDefault(_deleteWithPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var structure = {
	  empty: {},
	  getIn: _getIn2.default,
	  setIn: _setIn2.default,
	  deepEqual: _deepEqual2.default,
	  deleteIn: _deleteIn2.default,
	  deleteWithPath: _deleteWithPath2.default,
	  fromJS: function fromJS(value) {
	    return value;
	  },
	  size: function size(array) {
	    return array ? array.length : 0;
	  },
	  splice: _splice2.default
	};

	exports.default = structure;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Binds the arguments to a function and returns a new function
	 */
	var partial = function partial(fn) {
	  for (var _len = arguments.length, partials = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    partials[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return fn.apply(undefined, partials.concat(args));
	  };
	};

	exports.default = partial;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Converts a string in dot-and-bracket notation to an array of keys
	 */
	var toPath = function toPath(value) {
	  return value === undefined ? [] : String(value).split(/[.\[\]]/).filter(function (token) {
	    return token.length;
	  });
	};

	exports.default = toPath;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(54);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(55);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ARRAY_INSERT = exports.ARRAY_INSERT = 'redux-form/ARRAY_INSERT';
	var ARRAY_POP = exports.ARRAY_POP = 'redux-form/ARRAY_POP';
	var ARRAY_PUSH = exports.ARRAY_PUSH = 'redux-form/ARRAY_PUSH';
	var ARRAY_REMOVE = exports.ARRAY_REMOVE = 'redux-form/ARRAY_REMOVE';
	var ARRAY_SHIFT = exports.ARRAY_SHIFT = 'redux-form/ARRAY_SHIFT';
	var ARRAY_SPLICE = exports.ARRAY_SPLICE = 'redux-form/ARRAY_SPLICE';
	var ARRAY_UNSHIFT = exports.ARRAY_UNSHIFT = 'redux-form/ARRAY_UNSHIFT';
	var ARRAY_SWAP = exports.ARRAY_SWAP = 'redux-form/ARRAY_SWAP';
	var BLUR = exports.BLUR = 'redux-form/BLUR';
	var CHANGE = exports.CHANGE = 'redux-form/CHANGE';
	var DESTROY = exports.DESTROY = 'redux-form/DESTROY';
	var FOCUS = exports.FOCUS = 'redux-form/FOCUS';
	var INITIALIZE = exports.INITIALIZE = 'redux-form/INITIALIZE';
	var RESET = exports.RESET = 'redux-form/RESET';
	var SET_SUBMIT_FAILED = exports.SET_SUBMIT_FAILED = 'redux-form/SET_SUBMIT_FAILED';
	var START_ASYNC_VALIDATION = exports.START_ASYNC_VALIDATION = 'redux-form/START_ASYNC_VALIDATION';
	var START_SUBMIT = exports.START_SUBMIT = 'redux-form/START_SUBMIT';
	var STOP_ASYNC_VALIDATION = exports.STOP_ASYNC_VALIDATION = 'redux-form/STOP_ASYNC_VALIDATION';
	var STOP_SUBMIT = exports.STOP_SUBMIT = 'redux-form/STOP_SUBMIT';
	var TOUCH = exports.TOUCH = 'redux-form/TOUCH';
	var UNTOUCH = exports.UNTOUCH = 'redux-form/UNTOUCH';

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Maps all the values in the given object through the given function and saves them, by key, to a result object
	 */
	var mapValues = function mapValues(obj, fn) {
	  return obj ? Object.keys(obj).reduce(function (accumulator, key) {
	    return _extends({}, accumulator, _defineProperty({}, key, fn(obj[key], key)));
	  }, {}) : obj;
	};

	exports.default = mapValues;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _es6Error = __webpack_require__(52);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SubmissionError = function (_ExtendableError) {
	  _inherits(SubmissionError, _ExtendableError);

	  function SubmissionError(errors) {
	    _classCallCheck(this, SubmissionError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionError).call(this, 'Submit Validation Failed'));

	    _this.errors = errors;
	    return _this;
	  }

	  return SubmissionError;
	}(_es6Error2.default);

	exports.default = SubmissionError;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.untouch = exports.touch = exports.setSubmitFailed = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.initialize = exports.focus = exports.destroy = exports.change = exports.blur = exports.arrayUnshift = exports.arraySwap = exports.arraySplice = exports.arrayShift = exports.arrayRemove = exports.arrayPush = exports.arrayPop = exports.arrayInsert = undefined;

	var _actionTypes = __webpack_require__(6);

	var arrayInsert = exports.arrayInsert = function arrayInsert(form, field, index, value) {
	  return { type: _actionTypes.ARRAY_INSERT, meta: { form: form, field: field, index: index }, payload: value };
	};

	var arrayPop = exports.arrayPop = function arrayPop(form, field) {
	  return { type: _actionTypes.ARRAY_POP, meta: { form: form, field: field } };
	};

	var arrayPush = exports.arrayPush = function arrayPush(form, field, value) {
	  return { type: _actionTypes.ARRAY_PUSH, meta: { form: form, field: field }, payload: value };
	};

	var arrayRemove = exports.arrayRemove = function arrayRemove(form, field, index) {
	  return { type: _actionTypes.ARRAY_REMOVE, meta: { form: form, field: field, index: index } };
	};

	var arrayShift = exports.arrayShift = function arrayShift(form, field) {
	  return { type: _actionTypes.ARRAY_SHIFT, meta: { form: form, field: field } };
	};

	var arraySplice = exports.arraySplice = function arraySplice(form, field, index, removeNum, value) {
	  var action = {
	    type: _actionTypes.ARRAY_SPLICE,
	    meta: { form: form, field: field, index: index, removeNum: removeNum }
	  };
	  if (value !== undefined) {
	    action.payload = value;
	  }
	  return action;
	};

	var arraySwap = exports.arraySwap = function arraySwap(form, field, indexA, indexB) {
	  if (indexA === indexB) {
	    throw new Error('Swap indices cannot be equal');
	  }
	  if (indexA < 0 || indexB < 0) {
	    throw new Error('Swap indices cannot be negative');
	  }
	  return { type: _actionTypes.ARRAY_SWAP, meta: { form: form, field: field, indexA: indexA, indexB: indexB } };
	};

	var arrayUnshift = exports.arrayUnshift = function arrayUnshift(form, field, value) {
	  return { type: _actionTypes.ARRAY_UNSHIFT, meta: { form: form, field: field }, payload: value };
	};

	var blur = exports.blur = function blur(form, field, value, touch) {
	  return { type: _actionTypes.BLUR, meta: { form: form, field: field, touch: touch }, payload: value };
	};

	var change = exports.change = function change(form, field, value, touch) {
	  return { type: _actionTypes.CHANGE, meta: { form: form, field: field, touch: touch }, payload: value };
	};

	var destroy = exports.destroy = function destroy(form) {
	  return { type: _actionTypes.DESTROY, meta: { form: form } };
	};

	var focus = exports.focus = function focus(form, field) {
	  return { type: _actionTypes.FOCUS, meta: { form: form, field: field } };
	};

	var initialize = exports.initialize = function initialize(form, values) {
	  return { type: _actionTypes.INITIALIZE, meta: { form: form }, payload: values };
	};

	var reset = exports.reset = function reset(form) {
	  return { type: _actionTypes.RESET, meta: { form: form } };
	};

	var startAsyncValidation = exports.startAsyncValidation = function startAsyncValidation(form, field) {
	  return { type: _actionTypes.START_ASYNC_VALIDATION, meta: { form: form, field: field } };
	};

	var startSubmit = exports.startSubmit = function startSubmit(form) {
	  return { type: _actionTypes.START_SUBMIT, meta: { form: form } };
	};

	var stopAsyncValidation = exports.stopAsyncValidation = function stopAsyncValidation(form, errors) {
	  var action = {
	    type: _actionTypes.STOP_ASYNC_VALIDATION,
	    meta: { form: form },
	    payload: errors
	  };
	  if (errors && Object.keys(errors).length) {
	    action.error = true;
	  }
	  return action;
	};

	var stopSubmit = exports.stopSubmit = function stopSubmit(form, errors) {
	  var action = {
	    type: _actionTypes.STOP_SUBMIT,
	    meta: { form: form },
	    payload: errors
	  };
	  if (errors && Object.keys(errors).length) {
	    action.error = true;
	  }
	  return action;
	};

	var setSubmitFailed = exports.setSubmitFailed = function setSubmitFailed(form) {
	  for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    fields[_key - 1] = arguments[_key];
	  }

	  return { type: _actionTypes.SET_SUBMIT_FAILED, meta: { form: form, fields: fields }, error: true };
	};

	var touch = exports.touch = function touch(form) {
	  for (var _len2 = arguments.length, fields = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    fields[_key2 - 1] = arguments[_key2];
	  }

	  return { type: _actionTypes.TOUCH, meta: { form: form, fields: fields } };
	};

	var untouch = exports.untouch = function untouch(form) {
	  for (var _len3 = arguments.length, fields = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    fields[_key3 - 1] = arguments[_key3];
	  }

	  return { type: _actionTypes.UNTOUCH, meta: { form: form, fields: fields } };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dataKey = exports.dataKey = 'value';
	var createOnDragStart = function createOnDragStart(name, value) {
	  return function (event) {
	    event.dataTransfer.setData(dataKey, value);
	  };
	};

	exports.default = createOnDragStart;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _isEvent = __webpack_require__(12);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getSelectedValues = function getSelectedValues(options) {
	  var result = [];
	  if (options) {
	    for (var index = 0; index < options.length; index++) {
	      var option = options[index];
	      if (option.selected) {
	        result.push(option.value);
	      }
	    }
	  }
	  return result;
	};

	var getValue = function getValue(event, isReactNative) {
	  if ((0, _isEvent2.default)(event)) {
	    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {
	      return event.nativeEvent.text;
	    }
	    if (isReactNative && event.nativeEvent !== undefined) {
	      return event.nativeEvent.text;
	    }
	    var _event$target = event.target;
	    var type = _event$target.type;
	    var value = _event$target.value;
	    var checked = _event$target.checked;
	    var files = _event$target.files;
	    var dataTransfer = event.dataTransfer;

	    if (type === 'checkbox') {
	      return checked;
	    }
	    if (type === 'file') {
	      return files || dataTransfer && dataTransfer.files;
	    }
	    if (type === 'select-multiple') {
	      return getSelectedValues(event.target.options);
	    }
	    return value;
	  }
	  // not an event, so must be either our value or an object containing our value in the 'value' key
	  return event && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object' && event.value !== undefined ? event.value : // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
	  event;
	};

	exports.default = getValue;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isEvent = function isEvent(candidate) {
	  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
	};

	exports.default = isEvent;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEvent = __webpack_require__(12);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var silenceEvent = function silenceEvent(event) {
	  var is = (0, _isEvent2.default)(event);
	  if (is) {
	    event.preventDefault();
	  }
	  return is;
	};

	exports.default = silenceEvent;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

	exports.default = isReactNative;

/***/ },
/* 15 */
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
	            try {
	                targetComponent[keys[i]] = sourceComponent[keys[i]];
	            } catch (error) {

	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(23);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(68);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

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
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

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
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
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
	    if (!(0, _isPlainObject2["default"])(action)) {
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

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

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
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(20);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(64);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(63);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(62);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(19);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(22);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (("development") !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(65),
	    isHostObject = __webpack_require__(66),
	    isObjectLike = __webpack_require__(67);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _createFieldProps = __webpack_require__(31);

	var _createFieldProps2 = _interopRequireDefault(_createFieldProps);

	var _partial = __webpack_require__(3);

	var _partial2 = _interopRequireDefault(_partial);

	var _mapValues = __webpack_require__(7);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createConnectedField = function createConnectedField(_ref, _ref2, name) {
	  var asyncValidate = _ref.asyncValidate;
	  var blur = _ref.blur;
	  var change = _ref.change;
	  var focus = _ref.focus;
	  var getFormState = _ref.getFormState;
	  var initialValues = _ref.initialValues;
	  var deepEqual = _ref2.deepEqual;
	  var getIn = _ref2.getIn;
	  var size = _ref2.size;

	  var ConnectedField = function (_Component) {
	    _inherits(ConnectedField, _Component);

	    function ConnectedField(props, context) {
	      _classCallCheck(this, ConnectedField);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectedField).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('ConnectedField must be inside a component decorated with reduxForm()');
	      }
	      return _this;
	    }

	    _createClass(ConnectedField, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        return !deepEqual(this.props, nextProps);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props = this.props;
	        var component = _props.component;
	        var defaultValue = _props.defaultValue;

	        var props = _objectWithoutProperties(_props, ['component', 'defaultValue']);

	        return _react2.default.createElement(component, (0, _createFieldProps2.default)(getIn, name, props, this.syncError, initialValues && getIn(initialValues, name), defaultValue, asyncValidate));
	      }
	    }, {
	      key: 'syncError',
	      get: function get() {
	        var getSyncErrors = this.context._reduxForm.getSyncErrors;

	        return _plain2.default.getIn(getSyncErrors(), name);
	      }
	    }, {
	      key: 'valid',
	      get: function get() {
	        var _props2 = this.props;
	        var asyncError = _props2.asyncError;
	        var submitError = _props2.submitError;


	        var error = this.syncError || asyncError || submitError;

	        return !error;
	      }
	    }]);

	    return ConnectedField;
	  }(_react.Component);

	  ConnectedField.propTypes = {
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    defaultValue: _react.PropTypes.any
	  };

	  ConnectedField.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  var actions = (0, _mapValues2.default)({ blur: blur, change: change, focus: focus }, function (actionCreator) {
	    return (0, _partial2.default)(actionCreator, name);
	  });
	  var connector = (0, _reactRedux.connect)(function (state, ownProps) {
	    return {
	      initial: getIn(getFormState(state), 'initial.' + name),
	      value: getIn(getFormState(state), 'values.' + name),
	      state: getIn(getFormState(state), 'fields.' + name),
	      asyncError: getIn(getFormState(state), 'asyncErrors.' + name),
	      submitError: getIn(getFormState(state), 'submitErrors.' + name),
	      _value: ownProps.value // save value passed in (for checkboxes)
	    };
	  }, actions, undefined, { withRef: true });
	  return connector(ConnectedField);
	};

	exports.default = createConnectedField;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(5);

	var _createFieldArrayProps = __webpack_require__(30);

	var _createFieldArrayProps2 = _interopRequireDefault(_createFieldArrayProps);

	var _partial = __webpack_require__(3);

	var _partial2 = _interopRequireDefault(_partial);

	var _mapValues = __webpack_require__(7);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createConnectedFieldArray = function createConnectedFieldArray(_ref, _ref2, name) {
	  var arrayInsert = _ref.arrayInsert;
	  var arrayPop = _ref.arrayPop;
	  var arrayPush = _ref.arrayPush;
	  var arrayRemove = _ref.arrayRemove;
	  var arrayShift = _ref.arrayShift;
	  var arraySplice = _ref.arraySplice;
	  var arraySwap = _ref.arraySwap;
	  var arrayUnshift = _ref.arrayUnshift;
	  var asyncValidate = _ref.asyncValidate;
	  var blur = _ref.blur;
	  var change = _ref.change;
	  var focus = _ref.focus;
	  var getFormState = _ref.getFormState;
	  var initialValues = _ref.initialValues;
	  var deepEqual = _ref2.deepEqual;
	  var getIn = _ref2.getIn;
	  var size = _ref2.size;

	  var ConnectedFieldArray = function (_Component) {
	    _inherits(ConnectedFieldArray, _Component);

	    function ConnectedFieldArray(props, context) {
	      _classCallCheck(this, ConnectedFieldArray);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectedFieldArray).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('ConnectedFieldArray must be inside a component decorated with reduxForm()');
	      }
	      return _this;
	    }

	    _createClass(ConnectedFieldArray, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var prevLength = this.props.value ? size(this.props.value) : 0;
	        var nextLength = nextProps.value ? size(nextProps.value) : 0;
	        return prevLength !== nextLength;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props = this.props;
	        var component = _props.component;

	        var props = _objectWithoutProperties(_props, ['component']);

	        return _react2.default.createElement(component, (0, _createFieldArrayProps2.default)(deepEqual, getIn, size, name, props, this.syncError, initialValues && getIn(initialValues, name)));
	      }
	    }, {
	      key: 'syncError',
	      get: function get() {
	        var getSyncErrors = this.context._reduxForm.getSyncErrors;

	        return _plain2.default.getIn(getSyncErrors(), name + '._error');
	      }
	    }, {
	      key: 'valid',
	      get: function get() {
	        var _props2 = this.props;
	        var asyncError = _props2.asyncError;
	        var submitError = _props2.submitError;


	        var error = this.syncError || asyncError || submitError;

	        return !error;
	      }
	    }]);

	    return ConnectedFieldArray;
	  }(_react.Component);

	  ConnectedFieldArray.propTypes = {
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    defaultValue: _react.PropTypes.any
	  };

	  ConnectedFieldArray.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  var actions = (0, _mapValues2.default)({
	    arrayInsert: arrayInsert,
	    arrayPop: arrayPop,
	    arrayPush: arrayPush,
	    arrayRemove: arrayRemove,
	    arrayShift: arrayShift,
	    arraySplice: arraySplice,
	    arraySwap: arraySwap,
	    arrayUnshift: arrayUnshift
	  }, function (actionCreator) {
	    return (0, _partial2.default)(actionCreator, name);
	  });
	  var connector = (0, _reactRedux.connect)(function (state) {
	    return {
	      initial: getIn(getFormState(state), 'initial.' + name),
	      value: getIn(getFormState(state), 'values.' + name),
	      asyncError: getIn(getFormState(state), 'asyncErrors.' + name + '._error'),
	      submitError: getIn(getFormState(state), 'submitErrors.' + name + '._error')
	    };
	  }, actions, undefined, { withRef: true });
	  return connector(ConnectedFieldArray);
	};

	exports.default = createConnectedFieldArray;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ConnectedField = __webpack_require__(24);

	var _ConnectedField2 = _interopRequireDefault(_ConnectedField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var keys = 0;
	var generateKey = function generateKey() {
	  return 'redux-form-field-' + keys++;
	};

	var createField = function createField(_ref) {
	  var deepEqual = _ref.deepEqual;
	  var getIn = _ref.getIn;

	  var Field = function (_Component) {
	    _inherits(Field, _Component);

	    function Field(props, context) {
	      _classCallCheck(this, Field);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('Field must be inside a component decorated with reduxForm()');
	      }
	      _this.key = generateKey();
	      _this.ConnectedField = (0, _ConnectedField2.default)(context._reduxForm, { deepEqual: deepEqual, getIn: getIn }, props.name);
	      return _this;
	    }

	    _createClass(Field, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        return this.props.name !== nextProps.name;
	      }
	    }, {
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this.context._reduxForm.register(this.key, this);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (this.props.name !== nextProps.name) {
	          // name changed, regenerate connected field
	          this.ConnectedField = (0, _ConnectedField2.default)(this.context._reduxForm, getIn, nextProps.name);
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context._reduxForm.unregister(this.key);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var ConnectedField = this.ConnectedField;

	        return _react2.default.createElement(ConnectedField, _extends({}, this.props, { ref: 'connected' }));
	      }
	    }, {
	      key: 'valid',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().valid;
	      }
	    }, {
	      key: 'name',
	      get: function get() {
	        return this.props.name;
	      }
	    }]);

	    return Field;
	  }(_react.Component);

	  Field.propTypes = {
	    name: _react.PropTypes.string.isRequired,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    defaultValue: _react.PropTypes.any
	  };
	  Field.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  return Field;
	};

	exports.default = createField;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ConnectedFieldArray = __webpack_require__(25);

	var _ConnectedFieldArray2 = _interopRequireDefault(_ConnectedFieldArray);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var keys = 0;
	var generateKey = function generateKey() {
	  return 'redux-form-field-array-' + keys++;
	};

	var createFieldArray = function createFieldArray(_ref) {
	  var deepEqual = _ref.deepEqual;
	  var getIn = _ref.getIn;
	  var size = _ref.size;

	  var FieldArray = function (_Component) {
	    _inherits(FieldArray, _Component);

	    function FieldArray(props, context) {
	      _classCallCheck(this, FieldArray);

	      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldArray).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('FieldArray must be inside a component decorated with reduxForm()');
	      }
	      _this.key = generateKey();
	      _this.ConnectedFieldArray = (0, _ConnectedFieldArray2.default)(context._reduxForm, { deepEqual: deepEqual, getIn: getIn, size: size }, props.name);
	      return _this;
	    }

	    _createClass(FieldArray, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this.context._reduxForm.register(this.key, this);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (this.props.name !== nextProps.name) {
	          // name changed, regenerate connected field
	          this.ConnectedFieldArray = (0, _ConnectedFieldArray2.default)(this.context._reduxForm, getIn, nextProps.name);
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context._reduxForm.unregister(this.key);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var ConnectedFieldArray = this.ConnectedFieldArray;

	        return _react2.default.createElement(ConnectedFieldArray, _extends({}, this.props, { ref: 'connected' }));
	      }
	    }, {
	      key: 'valid',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().valid;
	      }
	    }, {
	      key: 'name',
	      get: function get() {
	        return this.props.name;
	      }
	    }]);

	    return FieldArray;
	  }(_react.Component);

	  FieldArray.propTypes = {
	    name: _react.PropTypes.string.isRequired,
	    component: _react.PropTypes.func.isRequired
	  };
	  FieldArray.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  return FieldArray;
	};

	exports.default = createFieldArray;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isPromise = __webpack_require__(16);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var asyncValidation = function asyncValidation(fn, start, stop, field) {
	  start(field);
	  var promise = fn();
	  if (!(0, _isPromise2.default)(promise)) {
	    throw new Error('asyncValidate function passed to reduxForm must return a promise');
	  }
	  var handleErrors = function handleErrors(rejected) {
	    return function (errors) {
	      if (errors && Object.keys(errors).length) {
	        stop(errors);
	        return Promise.reject();
	      } else if (rejected) {
	        stop();
	        throw new Error('Asynchronous validation promise was rejected without errors.');
	      }
	      stop();
	      return Promise.resolve();
	    };
	  };
	  return promise.then(handleErrors(false), handleErrors(true));
	};

	exports.default = asyncValidation;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createAll;

	var _reducer = __webpack_require__(40);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reduxForm = __webpack_require__(41);

	var _reduxForm2 = _interopRequireDefault(_reduxForm);

	var _Field = __webpack_require__(26);

	var _Field2 = _interopRequireDefault(_Field);

	var _FieldArray = __webpack_require__(27);

	var _FieldArray2 = _interopRequireDefault(_FieldArray);

	var _values = __webpack_require__(51);

	var _values2 = _interopRequireDefault(_values);

	var _SubmissionError = __webpack_require__(8);

	var _SubmissionError2 = _interopRequireDefault(_SubmissionError);

	var _propTypes = __webpack_require__(39);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _actions = __webpack_require__(9);

	var actions = _interopRequireWildcard(_actions);

	var _actionTypes = __webpack_require__(6);

	var actionTypes = _interopRequireWildcard(_actionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createAll(structure) {
	  // separate out field actions
	  return _extends({
	    actionTypes: actionTypes
	  }, actions, {
	    Field: (0, _Field2.default)(structure),
	    FieldArray: (0, _FieldArray2.default)(structure),
	    propTypes: _propTypes2.default,
	    reduxForm: (0, _reduxForm2.default)(structure),
	    reducer: (0, _reducer2.default)(structure),
	    SubmissionError: _SubmissionError2.default,
	    values: (0, _values2.default)(structure)
	  });
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var createFieldArrayProps = function createFieldArrayProps(deepEqual, getIn, size, name, _ref, syncError, initialPropValue) {
	  var arrayInsert = _ref.arrayInsert;
	  var arrayPop = _ref.arrayPop;
	  var arrayPush = _ref.arrayPush;
	  var arrayRemove = _ref.arrayRemove;
	  var arrayShift = _ref.arrayShift;
	  var arraySplice = _ref.arraySplice;
	  var arraySwap = _ref.arraySwap;
	  var arrayUnshift = _ref.arrayUnshift;
	  var asyncError = _ref.asyncError;
	  var initial = _ref.initial;
	  var state = _ref.state;
	  var submitError = _ref.submitError;
	  var submitFailed = _ref.submitFailed;
	  var value = _ref.value;

	  var rest = _objectWithoutProperties(_ref, ["arrayInsert", "arrayPop", "arrayPush", "arrayRemove", "arrayShift", "arraySplice", "arraySwap", "arrayUnshift", "asyncError", "initial", "state", "submitError", "submitFailed", "value"]);

	  var error = syncError || asyncError || submitError;
	  var initialValue = initial || initialPropValue;
	  var array = value || initialValue;
	  var pristine = deepEqual(value, initialValue);
	  var length = size(array);
	  return _extends({
	    dirty: !pristine,
	    error: error,
	    forEach: function forEach(callback) {
	      return (array || []).forEach(function (item, index) {
	        return callback(name + "[" + index + "]", index);
	      });
	    },
	    insert: arrayInsert,
	    invalid: !!error,
	    length: length,
	    map: function map(callback) {
	      return (array || []).map(function (item, index) {
	        return callback(name + "[" + index + "]", index);
	      });
	    },
	    pop: function pop() {
	      arrayPop();
	      return getIn(array, length - 1);
	    },
	    pristine: pristine,
	    push: arrayPush,
	    remove: arrayRemove,
	    shift: function shift() {
	      arrayShift();
	      return getIn(array, 0);
	    },
	    swap: arraySwap,
	    unshift: arrayUnshift,
	    valid: !error
	  }, rest);
	};

	exports.default = createFieldArrayProps;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createOnBlur = __webpack_require__(33);

	var _createOnBlur2 = _interopRequireDefault(_createOnBlur);

	var _createOnChange = __webpack_require__(34);

	var _createOnChange2 = _interopRequireDefault(_createOnChange);

	var _createOnDragStart = __webpack_require__(10);

	var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);

	var _createOnDrop = __webpack_require__(35);

	var _createOnDrop2 = _interopRequireDefault(_createOnDrop);

	var _createOnFocus = __webpack_require__(36);

	var _createOnFocus2 = _interopRequireDefault(_createOnFocus);

	var _partial = __webpack_require__(3);

	var _partial2 = _interopRequireDefault(_partial);

	var _noop = __webpack_require__(49);

	var _noop2 = _interopRequireDefault(_noop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var processProps = function processProps(props, _value) {
	  var type = props.type;
	  var value = props.value;

	  var rest = _objectWithoutProperties(props, ['type', 'value']);

	  if (type === 'checkbox') {
	    return _extends({}, rest, {
	      checked: !!value,
	      type: type
	    });
	  }
	  if (type === 'radio') {
	    return _extends({}, rest, {
	      checked: value === _value,
	      type: type,
	      value: _value
	    });
	  }
	  return props;
	};

	var createFieldProps = function createFieldProps(getIn, name, _ref, syncError, initialPropValue) {
	  var asyncError = _ref.asyncError;
	  var blur = _ref.blur;
	  var change = _ref.change;
	  var focus = _ref.focus;
	  var initial = _ref.initial;
	  var state = _ref.state;
	  var submitError = _ref.submitError;
	  var value = _ref.value;
	  var _value = _ref._value;

	  var rest = _objectWithoutProperties(_ref, ['asyncError', 'blur', 'change', 'focus', 'initial', 'state', 'submitError', 'value', '_value']);

	  var defaultValue = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
	  var asyncValidate = arguments.length <= 6 || arguments[6] === undefined ? _noop2.default : arguments[6];

	  var error = syncError || asyncError || submitError;
	  var onChange = (0, _createOnChange2.default)(change);
	  var initialValue = initial || initialPropValue;
	  return processProps(_extends({
	    active: state && !!getIn(state, 'active'),
	    dirty: value !== initialValue,
	    error: error,
	    invalid: !!error,
	    name: name,
	    onBlur: (0, _createOnBlur2.default)(blur, (0, _partial2.default)(asyncValidate, name)),
	    onChange: onChange,
	    onDragStart: (0, _createOnDragStart2.default)(name, value),
	    onDrop: (0, _createOnDrop2.default)(name, change),
	    onFocus: (0, _createOnFocus2.default)(name, focus),
	    onUpdate: onChange,
	    pristine: value === initialValue,
	    touched: !!(state && getIn(state, 'touched')),
	    valid: !error,
	    value: value === undefined ? defaultValue : value,
	    visited: state && !!getIn(state, 'visited')
	  }, rest), _value);
	};

	exports.default = createFieldProps;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath = __webpack_require__(4);

	var _toPath2 = _interopRequireDefault(_toPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createDeleteInWithCleanUp = function createDeleteInWithCleanUp(_ref) {
	  var deepEqual = _ref.deepEqual;
	  var empty = _ref.empty;
	  var getIn = _ref.getIn;
	  var deleteIn = _ref.deleteIn;
	  var setIn = _ref.setIn;


	  var deleteInWithCleanUp = function deleteInWithCleanUp(state, path) {
	    if (path[path.length - 1] === ']') {
	      // array path
	      var pathTokens = (0, _toPath2.default)(path);
	      pathTokens.pop();
	      var parent = getIn(state, pathTokens.join('.'));
	      return parent ? setIn(state, path, undefined) : state;
	    }
	    var result = deleteIn(state, path);
	    var dotIndex = path.lastIndexOf('.');
	    if (dotIndex > 0) {
	      var parentPath = path.substring(0, dotIndex);
	      var _parent = getIn(result, parentPath);
	      if (deepEqual(_parent, empty)) {
	        return deleteInWithCleanUp(result, parentPath);
	      }
	    }
	    return result;
	  };

	  return deleteInWithCleanUp;
	};

	exports.default = createDeleteInWithCleanUp;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getValue = __webpack_require__(11);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _isReactNative = __webpack_require__(14);

	var _isReactNative2 = _interopRequireDefault(_isReactNative);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnBlur = function createOnBlur(blur, afterBlur) {
	  return function (event) {
	    var value = (0, _getValue2.default)(event, _isReactNative2.default);
	    blur(value);
	    if (afterBlur) {
	      afterBlur(value);
	    }
	  };
	};
	exports.default = createOnBlur;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getValue = __webpack_require__(11);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _isReactNative = __webpack_require__(14);

	var _isReactNative2 = _interopRequireDefault(_isReactNative);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnChange = function createOnChange(change) {
	  return function (event) {
	    return change((0, _getValue2.default)(event, _isReactNative2.default));
	  };
	};

	exports.default = createOnChange;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createOnDragStart = __webpack_require__(10);

	var createOnDrop = function createOnDrop(name, change) {
	  return function (event) {
	    change(name, event.dataTransfer.getData(_createOnDragStart.dataKey));
	  };
	};
	exports.default = createOnDrop;

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createOnFocus = function createOnFocus(name, focus) {
	  return function () {
	    return focus(name);
	  };
	};
	exports.default = createOnFocus;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _silenceEvent = __webpack_require__(13);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var silenceEvents = function silenceEvents(fn) {
	  return function (event) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return (0, _silenceEvent2.default)(event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
	  };
	};

	exports.default = silenceEvents;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isPromise = __webpack_require__(16);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _SubmissionError = __webpack_require__(8);

	var _SubmissionError2 = _interopRequireDefault(_SubmissionError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var handleSubmit = function handleSubmit(submit, props, valid, asyncValidate, fields) {
	  var dispatch = props.dispatch;
	  var startSubmit = props.startSubmit;
	  var stopSubmit = props.stopSubmit;
	  var setSubmitFailed = props.setSubmitFailed;
	  var syncErrors = props.syncErrors;
	  var returnRejectedSubmitPromise = props.returnRejectedSubmitPromise;
	  var values = props.values;


	  if (valid) {
	    var doSubmit = function doSubmit() {
	      var result = submit(values, dispatch);
	      if ((0, _isPromise2.default)(result)) {
	        startSubmit();
	        return result.then(function (submitResult) {
	          stopSubmit();
	          return submitResult;
	        }).catch(function (submitError) {
	          stopSubmit(submitError instanceof _SubmissionError2.default ? submitError.errors : undefined);
	          if (returnRejectedSubmitPromise) {
	            return Promise.reject(submitError);
	          }
	        });
	      }
	      return result;
	    };

	    var asyncValidateResult = asyncValidate && asyncValidate();
	    if (asyncValidateResult) {
	      return asyncValidateResult.then(doSubmit, function (asyncErrors) {
	        setSubmitFailed.apply(undefined, _toConsumableArray(fields));
	        if (returnRejectedSubmitPromise) {
	          return Promise.reject(asyncErrors);
	        }
	      });
	    } else {
	      return doSubmit();
	    }
	  } else {
	    setSubmitFailed.apply(undefined, _toConsumableArray(fields));

	    if (returnRejectedSubmitPromise) {
	      return Promise.reject(syncErrors);
	    }
	  }
	};

	exports.default = handleSubmit;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.propTypes = undefined;

	var _react = __webpack_require__(1);

	var any = _react.PropTypes.any;
	var bool = _react.PropTypes.bool;
	var func = _react.PropTypes.func;
	var propTypes = exports.propTypes = {
	  // State:
	  asyncValidating: bool.isRequired, // true if async validation is running
	  dirty: bool.isRequired, // true if any values are different from initialValues
	  error: any, // form-wide error from '_error' key in validation result
	  invalid: bool.isRequired, // true if there are any validation errors
	  pristine: bool.isRequired, // true if the values are the same as initialValues
	  submitting: bool.isRequired, // true if the form is in the process of being submitted
	  submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
	  valid: bool.isRequired, // true if there are no validation errors

	  // Actions:
	  asyncValidate: func.isRequired, // function to trigger async validation
	  destroy: func.isRequired, // action to destroy the form's data in Redux
	  handleSubmit: func.isRequired, // function to submit the form
	  initialize: func.isRequired, // action to initialize form data
	  reset: func.isRequired, // action to reset the form data to previously initialized values
	  touch: func.isRequired, // action to mark fields as touched
	  untouch: func.isRequired // action to mark fields as untouched
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _actionTypes = __webpack_require__(6);

	var _deleteInWithCleanUp = __webpack_require__(32);

	var _deleteInWithCleanUp2 = _interopRequireDefault(_deleteInWithCleanUp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var createReducer = function createReducer(structure) {
	  var _behaviors;

	  var splice = structure.splice;
	  var empty = structure.empty;
	  var getIn = structure.getIn;
	  var setIn = structure.setIn;
	  var deleteIn = structure.deleteIn;
	  var fromJS = structure.fromJS;
	  var size = structure.size;

	  var deleteInWithCleanUp = (0, _deleteInWithCleanUp2.default)(structure);
	  var doSplice = function doSplice(state, key, field, index, removeNum, value, force) {
	    var existing = getIn(state, key + '.' + field);
	    return existing || force ? setIn(state, key + '.' + field, splice(existing, index, removeNum, value)) : state;
	  };
	  var rootKeys = ['values', 'fields', 'submitErrors', 'asyncErrors'];
	  var arraySplice = function arraySplice(state, field, index, removeNum, value) {
	    var result = state;
	    result = doSplice(result, 'values', field, index, removeNum, value, true);
	    result = doSplice(result, 'fields', field, index, removeNum, empty);
	    result = doSplice(result, 'submitErrors', field, index, removeNum, empty);
	    result = doSplice(result, 'asyncErrors', field, index, removeNum, empty);
	    return result;
	  };

	  var behaviors = (_behaviors = {}, _defineProperty(_behaviors, _actionTypes.ARRAY_INSERT, function (state, _ref) {
	    var _ref$meta = _ref.meta;
	    var field = _ref$meta.field;
	    var index = _ref$meta.index;
	    var payload = _ref.payload;

	    return arraySplice(state, field, index, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_POP, function (state, _ref2) {
	    var field = _ref2.meta.field;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    return length ? arraySplice(state, field, length - 1, 1) : state;
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_PUSH, function (state, _ref3) {
	    var field = _ref3.meta.field;
	    var payload = _ref3.payload;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    return arraySplice(state, field, length, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_REMOVE, function (state, _ref4) {
	    var _ref4$meta = _ref4.meta;
	    var field = _ref4$meta.field;
	    var index = _ref4$meta.index;

	    return arraySplice(state, field, index, 1);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SHIFT, function (state, _ref5) {
	    var field = _ref5.meta.field;

	    return arraySplice(state, field, 0, 1);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SPLICE, function (state, _ref6) {
	    var _ref6$meta = _ref6.meta;
	    var field = _ref6$meta.field;
	    var index = _ref6$meta.index;
	    var removeNum = _ref6$meta.removeNum;
	    var payload = _ref6.payload;

	    return arraySplice(state, field, index, removeNum, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SWAP, function (state, _ref7) {
	    var _ref7$meta = _ref7.meta;
	    var field = _ref7$meta.field;
	    var indexA = _ref7$meta.indexA;
	    var indexB = _ref7$meta.indexB;

	    var result = state;
	    rootKeys.forEach(function (key) {
	      var valueA = getIn(result, key + '.' + field + '[' + indexA + ']');
	      var valueB = getIn(result, key + '.' + field + '[' + indexB + ']');
	      if (valueA !== undefined || valueB !== undefined) {
	        result = setIn(result, key + '.' + field + '[' + indexA + ']', valueB);
	        result = setIn(result, key + '.' + field + '[' + indexB + ']', valueA);
	      }
	    });
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_UNSHIFT, function (state, _ref8) {
	    var field = _ref8.meta.field;
	    var payload = _ref8.payload;

	    return arraySplice(state, field, 0, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.BLUR, function (state, _ref9) {
	    var _ref9$meta = _ref9.meta;
	    var field = _ref9$meta.field;
	    var touch = _ref9$meta.touch;
	    var payload = _ref9.payload;

	    var result = state;
	    if (payload === '') {
	      result = deleteInWithCleanUp(result, 'values.' + field);
	    } else if (payload !== undefined) {
	      result = setIn(result, 'values.' + field, payload);
	    }
	    result = deleteIn(result, 'active');
	    result = deleteIn(result, 'fields.' + field + '.active');
	    if (touch) {
	      result = setIn(result, 'fields.' + field + '.touched', true);
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.CHANGE, function (state, _ref10) {
	    var _ref10$meta = _ref10.meta;
	    var field = _ref10$meta.field;
	    var touch = _ref10$meta.touch;
	    var payload = _ref10.payload;

	    var result = state;
	    if (payload === '') {
	      result = deleteInWithCleanUp(result, 'values.' + field);
	    } else if (payload !== undefined) {
	      result = setIn(result, 'values.' + field, payload);
	    }
	    result = deleteInWithCleanUp(result, 'asyncErrors.' + field);
	    result = deleteInWithCleanUp(result, 'submitErrors.' + field);
	    if (touch) {
	      result = setIn(result, 'fields.' + field + '.touched', true);
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.FOCUS, function (state, _ref11) {
	    var field = _ref11.meta.field;

	    var result = state;
	    var previouslyActive = getIn(state, 'active');
	    result = deleteIn(result, 'fields.' + previouslyActive + '.active');
	    result = setIn(result, 'fields.' + field + '.visited', true);
	    result = setIn(result, 'fields.' + field + '.active', true);
	    result = setIn(result, 'active', field);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.INITIALIZE, function (state, _ref12) {
	    var payload = _ref12.payload;

	    var mapData = fromJS(payload);
	    var result = empty; // clean all field state
	    result = setIn(result, 'values', mapData);
	    result = setIn(result, 'initial', mapData);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.RESET, function (state) {
	    var values = getIn(state, 'initial');
	    var result = empty;
	    if (values) {
	      result = setIn(result, 'values', values);
	      result = setIn(result, 'initial', values);
	    } else {
	      result = deleteInWithCleanUp(result, 'values');
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.START_ASYNC_VALIDATION, function (state, _ref13) {
	    var field = _ref13.meta.field;

	    return setIn(state, 'asyncValidating', field || true);
	  }), _defineProperty(_behaviors, _actionTypes.START_SUBMIT, function (state) {
	    return setIn(state, 'submitting', true);
	  }), _defineProperty(_behaviors, _actionTypes.STOP_ASYNC_VALIDATION, function (state, _ref14) {
	    var payload = _ref14.payload;

	    var result = state;
	    result = deleteIn(result, 'asyncValidating');
	    if (payload && Object.keys(payload).length) {
	      var _error = payload._error;

	      var fieldErrors = _objectWithoutProperties(payload, ['_error']);

	      if (_error) {
	        result = setIn(result, 'error', _error);
	      }
	      if (Object.keys(fieldErrors).length) {
	        result = setIn(result, 'asyncErrors', fromJS(fieldErrors));
	      } else {
	        result = deleteIn(result, 'asyncErrors');
	      }
	    } else {
	      result = deleteIn(result, 'error');
	      result = deleteIn(result, 'asyncErrors');
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.STOP_SUBMIT, function (state, _ref15) {
	    var payload = _ref15.payload;

	    var result = state;
	    result = deleteIn(result, 'submitting');
	    result = deleteIn(result, 'submitFailed');
	    if (payload && Object.keys(payload).length) {
	      var _error = payload._error;

	      var fieldErrors = _objectWithoutProperties(payload, ['_error']);

	      if (_error) {
	        result = setIn(result, 'error', _error);
	      }
	      if (Object.keys(fieldErrors).length) {
	        result = setIn(result, 'submitErrors', fromJS(fieldErrors));
	      } else {
	        result = deleteIn(result, 'submitErrors');
	      }
	      result = setIn(result, 'submitFailed', true);
	    } else {
	      result = deleteIn(result, 'error');
	      result = deleteIn(result, 'submitErrors');
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.SET_SUBMIT_FAILED, function (state, _ref16) {
	    var fields = _ref16.meta.fields;

	    var result = state;
	    result = setIn(result, 'submitFailed', true);
	    result = deleteIn(result, 'submitting');
	    fields.forEach(function (field) {
	      return result = setIn(result, 'fields.' + field + '.touched', true);
	    });
	    if (fields.length) {
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.TOUCH, function (state, _ref17) {
	    var fields = _ref17.meta.fields;

	    var result = state;
	    fields.forEach(function (field) {
	      return result = setIn(result, 'fields.' + field + '.touched', true);
	    });
	    result = setIn(result, 'anyTouched', true);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.UNTOUCH, function (state, _ref18) {
	    var fields = _ref18.meta.fields;

	    var result = state;
	    fields.forEach(function (field) {
	      return result = deleteIn(result, 'fields.' + field + '.touched');
	    });
	    return result;
	  }), _behaviors);

	  var reducer = function reducer() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? empty : arguments[0];
	    var action = arguments[1];

	    var behavior = behaviors[action.type];
	    return behavior ? behavior(state, action) : state;
	  };

	  var byForm = function byForm(reducer) {
	    return function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? empty : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var form = action && action.meta && action.meta.form;
	      if (!form) {
	        return state;
	      }
	      if (action.type === _actionTypes.DESTROY) {
	        return Object.keys(state).reduce(function (accumulator, formName) {
	          return formName === form ? accumulator : _extends({}, accumulator, _defineProperty({}, formName, state[formName]));
	        }, {});
	      }
	      var formState = getIn(state, form);
	      var result = reducer(formState, action);
	      return result === formState ? state : setIn(state, form, result);
	    };
	  };

	  /**
	   * Adds additional functionality to the reducer
	   */
	  function decorate(target) {

	    // put back plugin and normalize?
	    return target;
	  }

	  return decorate(byForm(reducer));
	};

	exports.default = createReducer;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(15);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _reactRedux = __webpack_require__(5);

	var _redux = __webpack_require__(21);

	var _every = __webpack_require__(48);

	var _every2 = _interopRequireDefault(_every);

	var _mapValues = __webpack_require__(7);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _partial = __webpack_require__(3);

	var _partial2 = _interopRequireDefault(_partial);

	var _partialRight = __webpack_require__(50);

	var _partialRight2 = _interopRequireDefault(_partialRight);

	var _actions = __webpack_require__(9);

	var importedActions = _interopRequireWildcard(_actions);

	var _handleSubmit = __webpack_require__(38);

	var _handleSubmit2 = _interopRequireDefault(_handleSubmit);

	var _silenceEvent = __webpack_require__(13);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	var _silenceEvents = __webpack_require__(37);

	var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

	var _asyncValidation = __webpack_require__(28);

	var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	// extract field-specific actions
	var arrayInsert = importedActions.arrayInsert;
	var arrayPop = importedActions.arrayPop;
	var arrayPush = importedActions.arrayPush;
	var arrayRemove = importedActions.arrayRemove;
	var arrayShift = importedActions.arrayShift;
	var arraySplice = importedActions.arraySplice;
	var arraySwap = importedActions.arraySwap;
	var arrayUnshift = importedActions.arrayUnshift;
	var blur = importedActions.blur;
	var change = importedActions.change;
	var focus = importedActions.focus;

	var formActions = _objectWithoutProperties(importedActions, ['arrayInsert', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'blur', 'change', 'focus']);

	var getDisplayName = function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	};
	var propsToNotUpdateFor = [].concat(_toConsumableArray(Object.keys(importedActions)), ['array', 'asyncErrors', 'initialized', 'initialValues', 'syncErrors', 'values']);

	/**
	 * The decorator that is the main API to redux-form
	 */
	var createReduxForm = function createReduxForm(structure) {
	  var deepEqual = structure.deepEqual;
	  var empty = structure.empty;
	  var getIn = structure.getIn;
	  var setIn = structure.setIn;
	  var fromJS = structure.fromJS;

	  return function (initialConfig) {
	    var config = _extends({
	      touchOnBlur: true,
	      touchOnChange: false,
	      destroyOnUnmount: true,
	      getFormState: function getFormState(state) {
	        return getIn(state, 'form');
	      }
	    }, initialConfig);
	    return function (WrappedComponent) {
	      var Form = function (_Component) {
	        _inherits(Form, _Component);

	        function Form(props) {
	          _classCallCheck(this, Form);

	          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

	          _this.submit = _this.submit.bind(_this);
	          _this.asyncValidate = _this.asyncValidate.bind(_this);
	          _this.getSyncErrors = _this.getSyncErrors.bind(_this);
	          _this.register = _this.register.bind(_this);
	          _this.unregister = _this.unregister.bind(_this);
	          _this.fields = {};
	          return _this;
	        }

	        _createClass(Form, [{
	          key: 'getChildContext',
	          value: function getChildContext() {
	            var _this2 = this;

	            return {
	              _reduxForm: _extends({}, this.props, {
	                getFormState: function getFormState(state) {
	                  return getIn(_this2.props.getFormState(state), _this2.props.form);
	                },
	                asyncValidate: this.asyncValidate,
	                getSyncErrors: this.getSyncErrors,
	                register: this.register,
	                unregister: this.unregister
	              })
	            };
	          }
	        }, {
	          key: 'initIfNeeded',
	          value: function initIfNeeded(_ref) {
	            var initialize = _ref.initialize;
	            var initialized = _ref.initialized;
	            var initialValues = _ref.initialValues;

	            if (initialValues && !initialized) {
	              initialize(initialValues);
	            }
	          }
	        }, {
	          key: 'componentWillMount',
	          value: function componentWillMount() {
	            this.initIfNeeded(this.props);
	          }
	        }, {
	          key: 'componentWillReceiveProps',
	          value: function componentWillReceiveProps(nextProps) {
	            this.initIfNeeded(nextProps);
	          }
	        }, {
	          key: 'shouldComponentUpdate',
	          value: function shouldComponentUpdate(nextProps) {
	            var _this3 = this;

	            return Object.keys(nextProps).some(function (prop) {
	              // useful to debug rerenders
	              // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {
	              //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])
	              // }
	              return ! ~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this3.props[prop], nextProps[prop]);
	            });
	          }
	        }, {
	          key: 'getSyncErrors',
	          value: function getSyncErrors() {
	            return this.props.syncErrors;
	          }
	        }, {
	          key: 'register',
	          value: function register(key, field) {
	            this.fields[key] = field;
	          }
	        }, {
	          key: 'unregister',
	          value: function unregister(key) {
	            delete this.fields[key];
	          }
	        }, {
	          key: 'asyncValidate',
	          value: function asyncValidate(name, value) {
	            var _this4 = this;

	            var _props = this.props;
	            var asyncBlurFields = _props.asyncBlurFields;
	            var asyncValidate = _props.asyncValidate;
	            var dispatch = _props.dispatch;
	            var initialized = _props.initialized;
	            var pristine = _props.pristine;
	            var startAsyncValidation = _props.startAsyncValidation;
	            var stopAsyncValidation = _props.stopAsyncValidation;
	            var syncErrors = _props.syncErrors;
	            var values = _props.values;

	            var isSubmitting = !name;
	            if (asyncValidate) {
	              var _ret = function () {
	                var valuesToValidate = isSubmitting ? values : setIn(values, name, value);
	                var syncValidationPasses = isSubmitting || !getIn(syncErrors, name);
	                var isBlurField = !isSubmitting && (!asyncBlurFields || ~asyncBlurFields.indexOf(name.replace(/\[[0-9]+\]/g, '[]')));

	                // if blur validating, only run async validate if sync validation passes and either no
	                // blur fields are passed or the field that has blurred is listed
	                // if submitting (not blur validation) or form is dirty or form was never initialized
	                if (syncValidationPasses && (isSubmitting || !pristine || !initialized) && (isSubmitting || isBlurField)) {
	                  return {
	                    v: (0, _asyncValidation2.default)(function () {
	                      return asyncValidate(valuesToValidate, dispatch, _this4.props);
	                    }, startAsyncValidation, stopAsyncValidation, name)
	                  };
	                }
	              }();

	              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	          }
	        }, {
	          key: 'submit',
	          value: function submit(submitOrEvent) {
	            var _this5 = this;

	            var onSubmit = this.props.onSubmit;


	            var check = function check(submit) {
	              if (!submit || typeof submit !== 'function') {
	                throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	              }
	              return submit;
	            };
	            return !submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent) ?
	            // submitOrEvent is an event: fire submit
	            (0, _handleSubmit2.default)(check(onSubmit), this.props, this.valid, this.asyncValidate, this.fieldList) :
	            // submitOrEvent is the submit function: return deferred submit thunk
	            (0, _silenceEvents2.default)(function () {
	              return (0, _handleSubmit2.default)(check(submitOrEvent), _this5.props, _this5.valid, _this5.asyncValidate, _this5.fieldList);
	            });
	          }
	        }, {
	          key: 'render',
	          value: function render() {
	            // remove some redux-form config-only props
	            var _props2 = this.props;
	            var arrayInsert = _props2.arrayInsert;
	            var arrayPop = _props2.arrayPop;
	            var arrayPush = _props2.arrayPush;
	            var arrayRemove = _props2.arrayRemove;
	            var arrayShift = _props2.arrayShift;
	            var arraySplice = _props2.arraySplice;
	            var arraySwap = _props2.arraySwap;
	            var arrayUnshift = _props2.arrayUnshift;
	            var asyncErrors = _props2.asyncErrors;
	            var reduxMountPoint = _props2.reduxMountPoint;
	            var destroyOnUnmount = _props2.destroyOnUnmount;
	            var form = _props2.form;
	            var getFormState = _props2.getFormState;
	            var touchOnBlur = _props2.touchOnBlur;
	            var touchOnChange = _props2.touchOnChange;
	            var syncErrors = _props2.syncErrors;
	            var values = _props2.values;

	            var passableProps = _objectWithoutProperties(_props2, ['arrayInsert', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'asyncErrors', 'reduxMountPoint', 'destroyOnUnmount', 'form', 'getFormState', 'touchOnBlur', 'touchOnChange', 'syncErrors', 'values']); // eslint-disable-line no-redeclare


	            return _react2.default.createElement(WrappedComponent, _extends({}, passableProps, {
	              handleSubmit: this.submit
	            }));
	          }
	        }, {
	          key: 'values',
	          get: function get() {
	            return this.props.values;
	          }
	        }, {
	          key: 'valid',
	          get: function get() {
	            return (0, _every2.default)(this.fields, function (field) {
	              return field.valid;
	            });
	          }
	        }, {
	          key: 'invalid',
	          get: function get() {
	            return !this.valid;
	          }
	        }, {
	          key: 'fieldList',
	          get: function get() {
	            var _this6 = this;

	            return Object.keys(this.fields).map(function (key) {
	              return _this6.fields[key].name;
	            });
	          }
	        }]);

	        return Form;
	      }(_react.Component);

	      Form.displayName = 'Form(' + getDisplayName(WrappedComponent) + ')';
	      Form.WrappedComponent = WrappedComponent;
	      Form.childContextTypes = {
	        _reduxForm: _react.PropTypes.object.isRequired
	      };
	      Form.propTypes = {
	        destroyOnUnmount: _react.PropTypes.bool,
	        form: _react.PropTypes.string.isRequired,
	        initialValues: _react.PropTypes.object,
	        getFormState: _react.PropTypes.func,
	        validate: _react.PropTypes.func,
	        touchOnBlur: _react.PropTypes.bool,
	        touchOnChange: _react.PropTypes.bool
	      };

	      var connector = (0, _reactRedux.connect)(function (state, props) {
	        var form = props.form;
	        var getFormState = props.getFormState;
	        var initialValues = props.initialValues;
	        var validate = props.validate;

	        var formState = getIn(getFormState(state) || empty, form) || empty;
	        var stateInitial = getIn(formState, 'initial');
	        var initial = initialValues || stateInitial || empty;
	        var values = getIn(formState, 'values') || initial || empty;
	        var pristine = deepEqual(initial, values);
	        var asyncErrors = getIn(formState, 'asyncErrors');
	        var syncErrors = validate && validate(values, props) || {};
	        var hasSyncErrors = syncErrors && !_plain2.default.deepEqual(syncErrors, {});
	        var hasAsyncErrors = asyncErrors && !deepEqual(asyncErrors, empty);
	        var valid = !(hasSyncErrors || hasAsyncErrors);
	        var anyTouched = !!getIn(formState, 'anyTouched');
	        var submitting = !!getIn(formState, 'submitting');
	        var submitFailed = !!getIn(formState, 'submitFailed');
	        var error = getIn(formState, 'error');
	        return {
	          anyTouched: anyTouched,
	          asyncErrors: asyncErrors,
	          asyncValidating: getIn(formState, 'asyncValidating'),
	          dirty: !pristine,
	          error: error,
	          initialized: !!stateInitial,
	          invalid: !valid,
	          pristine: pristine,
	          submitting: submitting,
	          submitFailed: submitFailed,
	          syncErrors: syncErrors,
	          values: values,
	          valid: valid
	        };
	      }, function (dispatch, ownProps) {
	        return _extends({}, (0, _redux.bindActionCreators)((0, _mapValues2.default)(_extends({}, formActions), function (actionCreator) {
	          return (0, _partial2.default)(actionCreator, ownProps.form);
	        }), dispatch), {
	          array: (0, _redux.bindActionCreators)((0, _mapValues2.default)({
	            insert: arrayInsert,
	            pop: arrayPop,
	            push: arrayPush,
	            remove: arrayRemove,
	            shift: arrayShift,
	            splice: arraySplice,
	            swap: arraySwap,
	            unshift: arrayUnshift
	          }, function (actionCreator) {
	            return (0, _partial2.default)(actionCreator, ownProps.form);
	          }), dispatch)
	        }, (0, _mapValues2.default)({
	          arrayInsert: arrayInsert,
	          arrayPop: arrayPop,
	          arrayPush: arrayPush,
	          arrayRemove: arrayRemove,
	          arrayShift: arrayShift,
	          arraySplice: arraySplice,
	          arraySwap: arraySwap,
	          arrayUnshift: arrayUnshift,
	          blur: (0, _partialRight2.default)(blur, !!ownProps.touchOnBlur),
	          change: (0, _partialRight2.default)(change, !!ownProps.touchOnChange),
	          focus: focus
	        }, function (actionCreator) {
	          return (0, _partial2.default)(actionCreator, ownProps.form);
	        }), {
	          dispatch: dispatch
	        });
	      }, undefined, { withRef: true });
	      var ConnectedForm = (0, _hoistNonReactStatics2.default)(connector(Form), WrappedComponent);
	      ConnectedForm.defaultProps = config;

	      // build outer component to expose instance api
	      return function (_Component2) {
	        _inherits(ReduxForm, _Component2);

	        function ReduxForm() {
	          _classCallCheck(this, ReduxForm);

	          return _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxForm).apply(this, arguments));
	        }

	        _createClass(ReduxForm, [{
	          key: 'submit',
	          value: function submit() {
	            return this.refs.wrapped.getWrappedInstance().submit();
	          }
	        }, {
	          key: 'render',
	          value: function render() {
	            var _props3 = this.props;
	            var initialValues = _props3.initialValues;

	            var rest = _objectWithoutProperties(_props3, ['initialValues']);
	            // convert initialValues if need to


	            return _react2.default.createElement(ConnectedForm, _extends({ ref: 'wrapped', initialValues: fromJS(initialValues) }, rest));
	          }
	        }]);

	        return ReduxForm;
	      }(_react.Component);
	    };
	  };
	};

	exports.default = createReduxForm;

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _arguments = arguments;
	/**
	 * Mostly copied from https://github.com/substack/node-deep-equal
	 *
	 * The only change I've made, aside from making it ES6, was to force strict mode and make:
	 *
	 * deepEqual('', undefined) ==> true
	 * deepEqual(undefined, '') ==> true
	 *
	 * This is necessary for an empty form, e.g. {}, to be pristine when all its values are ''
	 */

	var supportsArgumentsClass = function () {
	  return Object.prototype.toString.call(_arguments);
	}() == '[object Arguments]';

	var isArguments = supportsArgumentsClass ? function (object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	} : function (object) {
	  return object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
	};

	var pSlice = Array.prototype.slice;

	var isUndefinedOrNull = function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	};

	var isBuffer = function isBuffer(value) {
	  return !(!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || typeof value.length !== 'number') && !(typeof value.copy !== 'function' || typeof value.slice !== 'function') && !(value.length > 0 && typeof value[0] !== 'number');
	};

	var objEquiv = function objEquiv(valueA, valueB) {
	  if (isUndefinedOrNull(valueA) || isUndefinedOrNull(valueB)) return false;
	  // an identical 'prototype' property.
	  if (valueA.prototype !== valueB.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(valueA)) {
	    if (!isArguments(valueB)) {
	      return false;
	    }
	    valueA = pSlice.call(valueA);
	    valueB = pSlice.call(valueB);
	    return deepEqual(valueA, valueB);
	  }
	  if (isBuffer(valueA)) {
	    if (!isBuffer(valueB)) return false;
	    if (valueA.length !== valueB.length) return false;
	    for (var i = 0; i < valueA.length; i++) {
	      if (valueA[i] !== valueB[i]) return false;
	    }
	    return true;
	  }
	  var aKeys = void 0;
	  var bKeys = void 0;
	  try {
	    aKeys = Object.keys(valueA);
	    bKeys = Object.keys(valueB);
	  } catch (e) {
	    //happens when one is valueA string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (aKeys.length != bKeys.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  aKeys.sort();
	  bKeys.sort();
	  //~~~cheap key test
	  for (var _i = aKeys.length - 1; _i >= 0; _i--) {
	    if (aKeys[_i] != bKeys[_i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (var _i2 = aKeys.length - 1; _i2 >= 0; _i2--) {
	    var key = aKeys[_i2];
	    if (!deepEqual(valueA[key], valueB[key])) return false;
	  }
	  return (typeof valueA === 'undefined' ? 'undefined' : _typeof(valueA)) === (typeof valueB === 'undefined' ? 'undefined' : _typeof(valueB));
	};

	var deepEqual = function deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) return true;

	  if (actual === undefined && expected === '') return true;
	  if (actual === '' && expected === undefined) return true;

	  if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	  }

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : _typeof(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : _typeof(expected)) != 'object') {
	    return actual === expected;
	  }
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  return objEquiv(actual, expected);
	};

	exports.default = deepEqual;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _toPath = __webpack_require__(4);

	var _toPath2 = _interopRequireDefault(_toPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var deleteInWithPath = function deleteInWithPath(state, first) {
	  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    rest[_key - 2] = arguments[_key];
	  }

	  if (state === undefined || first === undefined) {
	    return state;
	  }
	  if (rest.length) {
	    if (Array.isArray(state)) {
	      if (first < state.length) {
	        var copy = [].concat(_toConsumableArray(state));
	        copy[first] = deleteInWithPath.apply(undefined, [state && state[first]].concat(rest));
	        return copy;
	      }
	      return state;
	    }
	    if (first in state) {
	      return _extends({}, state, _defineProperty({}, first, deleteInWithPath.apply(undefined, [state && state[first]].concat(rest))));
	    }
	    return state;
	  }
	  if (Array.isArray(state)) {
	    if (isNaN(first)) {
	      throw new Error('Cannot delete non-numerical index from an array');
	    }
	    if (first < state.length) {
	      var _copy = [].concat(_toConsumableArray(state));
	      _copy.splice(first, 1);
	      return _copy;
	    }
	    return state;
	  }
	  if (first in state) {
	    var _copy2 = _extends({}, state);
	    delete _copy2[first];
	    return _copy2;
	  }
	  return state;
	};

	var deleteIn = function deleteIn(state, field) {
	  return deleteInWithPath.apply(undefined, [state].concat(_toConsumableArray((0, _toPath2.default)(field))));
	};

	exports.default = deleteIn;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObject = function isObject(value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	};

	var deleteWithPath = function deleteWithPath(state, matcher) {
	  var path = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	  if (state === undefined) {
	    return state;
	  }

	  if (Array.isArray(state)) {
	    var _ret = function () {
	      var changed = false;
	      var processed = [];
	      state.forEach(function (value, index) {
	        var nextPath = path ? path + '[' + index + ']' : String(index);
	        if (matcher.test(nextPath)) {
	          changed = true;
	        } else {
	          var next = deleteWithPath(value, matcher, nextPath);
	          if (next !== value) {
	            changed = true;
	          }
	          processed.push(next);
	        }
	      });
	      return {
	        v: changed ? processed : state
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  if (isObject(state)) {
	    var _ret2 = function () {
	      var changed = false;
	      var processed = {};
	      Object.keys(state).forEach(function (key) {
	        var nextPath = path ? path + '.' + key : key;
	        if (matcher.test(nextPath)) {
	          changed = true;
	        } else {
	          var next = deleteWithPath(state[key], matcher, nextPath);
	          if (next !== state[key]) {
	            changed = true;
	          }
	          processed[key] = next;
	        }
	      });
	      return {
	        v: changed ? processed : state
	      };
	    }();

	    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	  }
	  return state;
	};

	exports.default = deleteWithPath;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath = __webpack_require__(4);

	var _toPath2 = _interopRequireDefault(_toPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var getInWithPath = function getInWithPath(state, first) {
	  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    rest[_key - 2] = arguments[_key];
	  }

	  if (!state) {
	    return state;
	  }
	  var next = state[first];
	  return rest.length ? getInWithPath.apply(undefined, [next].concat(rest)) : next;
	};

	var getIn = function getIn(state, field) {
	  return getInWithPath.apply(undefined, [state].concat(_toConsumableArray((0, _toPath2.default)(field))));
	};

	exports.default = getIn;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _toPath = __webpack_require__(4);

	var _toPath2 = _interopRequireDefault(_toPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var setInWithPath = function setInWithPath(state, value, first) {
	  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
	    rest[_key - 3] = arguments[_key];
	  }

	  if (first === undefined) {
	    return value;
	  }
	  var next = setInWithPath.apply(undefined, [state && state[first], value].concat(rest));
	  if (!state) {
	    var initialized = isNaN(first) ? {} : [];
	    initialized[first] = next;
	    return initialized;
	  }
	  if (Array.isArray(state)) {
	    var copy = [].concat(_toConsumableArray(state));
	    copy[first] = next;
	    return copy;
	  }
	  return _extends({}, state, _defineProperty({}, first, next));
	};

	var setIn = function setIn(state, field, value) {
	  return setInWithPath.apply(undefined, [state, value].concat(_toConsumableArray((0, _toPath2.default)(field))));
	};

	exports.default = setIn;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var splice = function splice() {
	  var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var index = arguments[1];
	  var removeNum = arguments[2];
	  var value = arguments[3];

	  var copy = [].concat(_toConsumableArray(array));
	  if (removeNum) {
	    copy.splice(index, removeNum); // removing
	  } else {
	      copy.splice(index, 0, value); // adding
	    }
	  return copy;
	};

	exports.default = splice;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = every;
	/**
	 * Returns true of the predicate is true for every (value, key) pair in the Object or array
	 */
	function every(object, predicate) {
	  if (!object) {
	    return true;
	  }
	  if (Array.isArray(object)) {
	    return !object.length || object.every(predicate);
	  }
	  var keys = Object.keys(object);
	  return !keys.length || keys.every(function (key) {
	    return predicate(object[key], key, object);
	  });
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = noop;
	/**
	 * Do nothing
	 */
	function noop() {}

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Binds the arguments to a function and returns a new function
	 */
	var partialRight = function partialRight(fn) {
	  for (var _len = arguments.length, partials = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    partials[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    return fn.apply(undefined, args.concat(partials));
	  };
	};

	exports.default = partialRight;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reactRedux = __webpack_require__(5);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var createValues = function createValues(_ref) {
	  var empty = _ref.empty;
	  var getIn = _ref.getIn;
	  return function (config) {
	    var _prop$getFormState$co = _extends({
	      prop: 'values',
	      getFormState: function getFormState(state) {
	        return getIn(state, 'form');
	      }
	    }, config);

	    var form = _prop$getFormState$co.form;
	    var prop = _prop$getFormState$co.prop;
	    var getFormState = _prop$getFormState$co.getFormState;

	    return (0, _reactRedux.connect)(function (state) {
	      return _defineProperty({}, prop, getIn(getFormState(state), form + '.values') || empty);
	    });
	  };
	};

	exports.default = createValues;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExtendableError = (function (_Error) {
	  _inherits(ExtendableError, _Error);

	  function ExtendableError() {
	    var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	    _classCallCheck(this, ExtendableError);

	    _get(Object.getPrototypeOf(ExtendableError.prototype), 'constructor', this).call(this, message);

	    // extending Error is weird and does not propagate `message`
	    Object.defineProperty(this, 'message', {
	      enumerable: false,
	      value: message,
	      writable: true
	    });

	    Object.defineProperty(this, 'name', {
	      enumerable: false,
	      value: this.constructor.name
	    });

	    if (Error.hasOwnProperty('captureStackTrace')) {
	      Error.captureStackTrace(this, this.constructor);
	      return;
	    }

	    Object.defineProperty(this, 'stack', {
	      enumerable: false,
	      value: new Error(message).stack
	    });
	  }

	  return ExtendableError;
	})(Error);

	exports['default'] = ExtendableError;
	module.exports = exports['default'];

/***/ },
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = undefined;

	var _react = __webpack_require__(1);

	var _storeShape = __webpack_require__(17);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _warning = __webpack_require__(18);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;

	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = function (_Component) {
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

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return _react.Children.only(children);
	  };

	  return Provider;
	}(_react.Component);

	exports["default"] = Provider;

	if (true) {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}

	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.__esModule = true;
	exports["default"] = connect;

	var _react = __webpack_require__(1);

	var _storeShape = __webpack_require__(17);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _shallowEqual = __webpack_require__(56);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _wrapActionCreators = __webpack_require__(57);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _warning = __webpack_require__(18);

	var _warning2 = _interopRequireDefault(_warning);

	var _isPlainObject = __webpack_require__(61);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _hoistNonReactStatics = __webpack_require__(15);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(53);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;

	  var mapDispatch = undefined;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }

	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	  // Helps track hot reloading.
	  var version = nextVersion++;

	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }

	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (true) {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }

	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }

	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

	        if (true) {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };

	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';

	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }

	        if (true) {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };

	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }

	        var dispatch = store.dispatch;

	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

	        if (true) {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };

	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';

	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }

	        if (true) {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }

	        this.mergedProps = nextMergedProps;
	        return true;
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
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
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
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }

	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }

	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
	        var statePropsPrecalculationError = this.statePropsPrecalculationError;
	        var renderedElement = this.renderedElement;

	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;

	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    }(_react.Component);

	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };

	    if (true) {
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

	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}

/***/ },
/* 56 */
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

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(21);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(58),
	    isHostObject = __webpack_require__(59),
	    isObjectLike = __webpack_require__(60);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(19);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
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
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
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

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(20);

	var _isPlainObject = __webpack_require__(23);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(22);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
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
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (true) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(69)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
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