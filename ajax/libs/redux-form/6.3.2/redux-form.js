(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "redux"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"), require("react-redux"), require("redux"));
	else
		root["ReduxForm"] = factory(root["React"], root["ReactRedux"], root["Redux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_41__) {
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
	exports.values = exports.untouch = exports.unregisterField = exports.touch = exports.SubmissionError = exports.submit = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.setSubmitSucceeded = exports.setSubmitFailed = exports.reset = exports.registerField = exports.reduxForm = exports.reducer = exports.propTypes = exports.isValid = exports.isPristine = exports.isInvalid = exports.isDirty = exports.initialize = exports.getFormSubmitErrors = exports.getFormSyncErrors = exports.getFormValues = exports.formValueSelector = exports.focus = exports.FormSection = exports.FieldArray = exports.Fields = exports.Field = exports.destroy = exports.change = exports.autofill = exports.blur = exports.arrayUnshift = exports.arraySwap = exports.arraySplice = exports.arrayShift = exports.arrayRemoveAll = exports.arrayRemove = exports.arrayPush = exports.arrayPop = exports.arrayMove = exports.arrayInsert = exports.actionTypes = undefined;

	var _createAll2 = __webpack_require__(51);

	var _createAll3 = _interopRequireDefault(_createAll2);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _createAll = (0, _createAll3.default)(_plain2.default);

	var actionTypes = _createAll.actionTypes,
	    arrayInsert = _createAll.arrayInsert,
	    arrayMove = _createAll.arrayMove,
	    arrayPop = _createAll.arrayPop,
	    arrayPush = _createAll.arrayPush,
	    arrayRemove = _createAll.arrayRemove,
	    arrayRemoveAll = _createAll.arrayRemoveAll,
	    arrayShift = _createAll.arrayShift,
	    arraySplice = _createAll.arraySplice,
	    arraySwap = _createAll.arraySwap,
	    arrayUnshift = _createAll.arrayUnshift,
	    blur = _createAll.blur,
	    autofill = _createAll.autofill,
	    change = _createAll.change,
	    destroy = _createAll.destroy,
	    Field = _createAll.Field,
	    Fields = _createAll.Fields,
	    FieldArray = _createAll.FieldArray,
	    FormSection = _createAll.FormSection,
	    focus = _createAll.focus,
	    formValueSelector = _createAll.formValueSelector,
	    getFormValues = _createAll.getFormValues,
	    getFormSyncErrors = _createAll.getFormSyncErrors,
	    getFormSubmitErrors = _createAll.getFormSubmitErrors,
	    initialize = _createAll.initialize,
	    isDirty = _createAll.isDirty,
	    isInvalid = _createAll.isInvalid,
	    isPristine = _createAll.isPristine,
	    isValid = _createAll.isValid,
	    propTypes = _createAll.propTypes,
	    reducer = _createAll.reducer,
	    reduxForm = _createAll.reduxForm,
	    registerField = _createAll.registerField,
	    reset = _createAll.reset,
	    setSubmitFailed = _createAll.setSubmitFailed,
	    setSubmitSucceeded = _createAll.setSubmitSucceeded,
	    startAsyncValidation = _createAll.startAsyncValidation,
	    startSubmit = _createAll.startSubmit,
	    stopAsyncValidation = _createAll.stopAsyncValidation,
	    stopSubmit = _createAll.stopSubmit,
	    submit = _createAll.submit,
	    SubmissionError = _createAll.SubmissionError,
	    touch = _createAll.touch,
	    unregisterField = _createAll.unregisterField,
	    untouch = _createAll.untouch,
	    values = _createAll.values;
	exports.actionTypes = actionTypes;
	exports.arrayInsert = arrayInsert;
	exports.arrayMove = arrayMove;
	exports.arrayPop = arrayPop;
	exports.arrayPush = arrayPush;
	exports.arrayRemove = arrayRemove;
	exports.arrayRemoveAll = arrayRemoveAll;
	exports.arrayShift = arrayShift;
	exports.arraySplice = arraySplice;
	exports.arraySwap = arraySwap;
	exports.arrayUnshift = arrayUnshift;
	exports.blur = blur;
	exports.autofill = autofill;
	exports.change = change;
	exports.destroy = destroy;
	exports.Field = Field;
	exports.Fields = Fields;
	exports.FieldArray = FieldArray;
	exports.FormSection = FormSection;
	exports.focus = focus;
	exports.formValueSelector = formValueSelector;
	exports.getFormValues = getFormValues;
	exports.getFormSyncErrors = getFormSyncErrors;
	exports.getFormSubmitErrors = getFormSubmitErrors;
	exports.initialize = initialize;
	exports.isDirty = isDirty;
	exports.isInvalid = isInvalid;
	exports.isPristine = isPristine;
	exports.isValid = isValid;
	exports.propTypes = propTypes;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.registerField = registerField;
	exports.reset = reset;
	exports.setSubmitFailed = setSubmitFailed;
	exports.setSubmitSucceeded = setSubmitSucceeded;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.submit = submit;
	exports.SubmissionError = SubmissionError;
	exports.touch = touch;
	exports.unregisterField = unregisterField;
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

	var _some2 = __webpack_require__(137);

	var _some3 = _interopRequireDefault(_some2);

	var _splice = __webpack_require__(76);

	var _splice2 = _interopRequireDefault(_splice);

	var _getIn = __webpack_require__(26);

	var _getIn2 = _interopRequireDefault(_getIn);

	var _setIn = __webpack_require__(75);

	var _setIn2 = _interopRequireDefault(_setIn);

	var _deepEqual = __webpack_require__(73);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _deleteIn = __webpack_require__(74);

	var _deleteIn2 = _interopRequireDefault(_deleteIn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var structure = {
	  empty: {},
	  emptyList: [],
	  getIn: _getIn2.default,
	  setIn: _setIn2.default,
	  deepEqual: _deepEqual2.default,
	  deleteIn: _deleteIn2.default,
	  fromJS: function fromJS(value) {
	    return value;
	  },
	  size: function size(array) {
	    return array ? array.length : 0;
	  },
	  some: _some3.default,
	  splice: _splice2.default
	};

	exports.default = structure;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = formatName;
	var isFieldArrayRegx = /\[\d+\]$/;

	function formatName(context, name) {
	  var sectionPrefix = context._reduxForm.sectionPrefix;

	  return !sectionPrefix || isFieldArrayRegx.test(name) ? name : sectionPrefix + "." + name;
	}

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(15);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(107);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(88),
	    copyArray = __webpack_require__(31),
	    isArray = __webpack_require__(9),
	    isSymbol = __webpack_require__(134),
	    stringToPath = __webpack_require__(125),
	    toKey = __webpack_require__(126),
	    toString = __webpack_require__(139);

	/**
	 * Converts `value` to a property path array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Util
	 * @param {*} value The value to convert.
	 * @returns {Array} Returns the new property path array.
	 * @example
	 *
	 * _.toPath('a.b.c');
	 * // => ['a', 'b', 'c']
	 *
	 * _.toPath('a[0].b.c');
	 * // => ['a', '0', 'b', 'c']
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return arrayMap(value, toKey);
	  }
	  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
	}

	module.exports = toPath;


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ARRAY_INSERT = exports.ARRAY_INSERT = '@@redux-form/ARRAY_INSERT';
	var ARRAY_MOVE = exports.ARRAY_MOVE = '@@redux-form/ARRAY_MOVE';
	var ARRAY_POP = exports.ARRAY_POP = '@@redux-form/ARRAY_POP';
	var ARRAY_PUSH = exports.ARRAY_PUSH = '@@redux-form/ARRAY_PUSH';
	var ARRAY_REMOVE = exports.ARRAY_REMOVE = '@@redux-form/ARRAY_REMOVE';
	var ARRAY_REMOVE_ALL = exports.ARRAY_REMOVE_ALL = '@@redux-form/ARRAY_REMOVE_ALL';
	var ARRAY_SHIFT = exports.ARRAY_SHIFT = '@@redux-form/ARRAY_SHIFT';
	var ARRAY_SPLICE = exports.ARRAY_SPLICE = '@@redux-form/ARRAY_SPLICE';
	var ARRAY_UNSHIFT = exports.ARRAY_UNSHIFT = '@@redux-form/ARRAY_UNSHIFT';
	var ARRAY_SWAP = exports.ARRAY_SWAP = '@@redux-form/ARRAY_SWAP';
	var AUTOFILL = exports.AUTOFILL = '@@redux-form/AUTOFILL';
	var BLUR = exports.BLUR = '@@redux-form/BLUR';
	var CHANGE = exports.CHANGE = '@@redux-form/CHANGE';
	var CLEAR_SUBMIT = exports.CLEAR_SUBMIT = '@@redux-form/CLEAR_SUBMIT';
	var CLEAR_ASYNC_ERROR = exports.CLEAR_ASYNC_ERROR = '@redux-form/CLEAR_ASYNC_ERROR';
	var DESTROY = exports.DESTROY = '@@redux-form/DESTROY';
	var FOCUS = exports.FOCUS = '@@redux-form/FOCUS';
	var INITIALIZE = exports.INITIALIZE = '@@redux-form/INITIALIZE';
	var REGISTER_FIELD = exports.REGISTER_FIELD = '@@redux-form/REGISTER_FIELD';
	var RESET = exports.RESET = '@@redux-form/RESET';
	var SET_SUBMIT_FAILED = exports.SET_SUBMIT_FAILED = '@@redux-form/SET_SUBMIT_FAILED';
	var SET_SUBMIT_SUCCEEDED = exports.SET_SUBMIT_SUCCEEDED = '@@redux-form/SET_SUBMIT_SUCCEEDED';
	var START_ASYNC_VALIDATION = exports.START_ASYNC_VALIDATION = '@@redux-form/START_ASYNC_VALIDATION';
	var START_SUBMIT = exports.START_SUBMIT = '@@redux-form/START_SUBMIT';
	var STOP_ASYNC_VALIDATION = exports.STOP_ASYNC_VALIDATION = '@@redux-form/STOP_ASYNC_VALIDATION';
	var STOP_SUBMIT = exports.STOP_SUBMIT = '@@redux-form/STOP_SUBMIT';
	var SUBMIT = exports.SUBMIT = '@@redux-form/SUBMIT';
	var TOUCH = exports.TOUCH = '@@redux-form/TOUCH';
	var UNREGISTER_FIELD = exports.UNREGISTER_FIELD = '@@redux-form/UNREGISTER_FIELD';
	var UNTOUCH = exports.UNTOUCH = '@@redux-form/UNTOUCH';
	var UPDATE_SYNC_ERRORS = exports.UPDATE_SYNC_ERRORS = '@@redux-form/UPDATE_SYNC_ERRORS';
	var UPDATE_SYNC_WARNINGS = exports.UPDATE_SYNC_WARNINGS = '@@redux-form/UPDATE_SYNC_WARNINGS';

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _hasError = __webpack_require__(64);

	var _hasError2 = _interopRequireDefault(_hasError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createIsValid = function createIsValid(structure) {
	  var getIn = structure.getIn;

	  var hasError = (0, _hasError2.default)(structure);
	  return function (form, getFormState, ignoreSubmitErrors) {
	    return function (state) {
	      var formState = getFormState(state);
	      var syncError = getIn(formState, form + '.syncError');
	      if (syncError) {
	        return false;
	      }
	      if (!ignoreSubmitErrors) {
	        var error = getIn(formState, form + '.error');
	        if (error) {
	          return false;
	        }
	      }
	      var syncErrors = getIn(formState, form + '.syncErrors');
	      var asyncErrors = getIn(formState, form + '.asyncErrors');
	      var submitErrors = ignoreSubmitErrors ? undefined : getIn(formState, form + '.submitErrors');
	      if (!syncErrors && !asyncErrors && !submitErrors) {
	        return true;
	      }

	      var registeredFields = getIn(formState, form + '.registeredFields') || [];
	      return !registeredFields.some(function (field) {
	        return hasError(field, syncErrors, asyncErrors, submitErrors);
	      });
	    };
	  };
	};

	exports.default = createIsValid;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shallowequal = __webpack_require__(140);

	var _shallowequal2 = _interopRequireDefault(_shallowequal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var shallowCompare = function shallowCompare(instance, nextProps, nextState) {
	  return !(0, _shallowequal2.default)(instance.props, nextProps) || !(0, _shallowequal2.default)(instance.state, nextState);
	};

	exports.default = shallowCompare;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 16 */
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
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _es6Error = __webpack_require__(79);

	var _es6Error2 = _interopRequireDefault(_es6Error);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SubmissionError = function (_ExtendableError) {
	  _inherits(SubmissionError, _ExtendableError);

	  function SubmissionError(errors) {
	    _classCallCheck(this, SubmissionError);

	    var _this = _possibleConstructorReturn(this, (SubmissionError.__proto__ || Object.getPrototypeOf(SubmissionError)).call(this, 'Submit Validation Failed'));

	    _this.errors = errors;
	    return _this;
	  }

	  return SubmissionError;
	}(_es6Error2.default);

	exports.default = SubmissionError;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateSyncWarnings = exports.updateSyncErrors = exports.untouch = exports.unregisterField = exports.touch = exports.setSubmitSucceeded = exports.setSubmitFailed = exports.submit = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.reset = exports.registerField = exports.initialize = exports.focus = exports.destroy = exports.clearAsyncError = exports.clearSubmit = exports.change = exports.blur = exports.autofill = exports.arrayUnshift = exports.arraySwap = exports.arraySplice = exports.arrayShift = exports.arrayRemoveAll = exports.arrayRemove = exports.arrayPush = exports.arrayPop = exports.arrayMove = exports.arrayInsert = undefined;

	var _actionTypes = __webpack_require__(11);

	var arrayInsert = exports.arrayInsert = function arrayInsert(form, field, index, value) {
	  return { type: _actionTypes.ARRAY_INSERT, meta: { form: form, field: field, index: index }, payload: value };
	};

	var arrayMove = exports.arrayMove = function arrayMove(form, field, from, to) {
	  return { type: _actionTypes.ARRAY_MOVE, meta: { form: form, field: field, from: from, to: to } };
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

	var arrayRemoveAll = exports.arrayRemoveAll = function arrayRemoveAll(form, field) {
	  return { type: _actionTypes.ARRAY_REMOVE_ALL, meta: { form: form, field: field } };
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

	var autofill = exports.autofill = function autofill(form, field, value) {
	  return { type: _actionTypes.AUTOFILL, meta: { form: form, field: field }, payload: value };
	};

	var blur = exports.blur = function blur(form, field, value, touch) {
	  return { type: _actionTypes.BLUR, meta: { form: form, field: field, touch: touch }, payload: value };
	};

	var change = exports.change = function change(form, field, value, touch, persistentSubmitErrors) {
	  return { type: _actionTypes.CHANGE, meta: { form: form, field: field, touch: touch, persistentSubmitErrors: persistentSubmitErrors }, payload: value };
	};

	var clearSubmit = exports.clearSubmit = function clearSubmit(form) {
	  return { type: _actionTypes.CLEAR_SUBMIT, meta: { form: form } };
	};

	var clearAsyncError = exports.clearAsyncError = function clearAsyncError(form, field) {
	  return { type: _actionTypes.CLEAR_ASYNC_ERROR, meta: { form: form, field: field } };
	};

	var destroy = exports.destroy = function destroy(form) {
	  return { type: _actionTypes.DESTROY, meta: { form: form } };
	};

	var focus = exports.focus = function focus(form, field) {
	  return { type: _actionTypes.FOCUS, meta: { form: form, field: field } };
	};

	var initialize = exports.initialize = function initialize(form, values, keepDirty) {
	  return { type: _actionTypes.INITIALIZE, meta: { form: form, keepDirty: keepDirty }, payload: values };
	};

	var registerField = exports.registerField = function registerField(form, name, type) {
	  return { type: _actionTypes.REGISTER_FIELD, meta: { form: form }, payload: { name: name, type: type } };
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

	var submit = exports.submit = function submit(form) {
	  return { type: _actionTypes.SUBMIT, meta: { form: form } };
	};

	var setSubmitFailed = exports.setSubmitFailed = function setSubmitFailed(form) {
	  for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    fields[_key - 1] = arguments[_key];
	  }

	  return { type: _actionTypes.SET_SUBMIT_FAILED, meta: { form: form, fields: fields }, error: true };
	};

	var setSubmitSucceeded = exports.setSubmitSucceeded = function setSubmitSucceeded(form) {
	  for (var _len2 = arguments.length, fields = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    fields[_key2 - 1] = arguments[_key2];
	  }

	  return { type: _actionTypes.SET_SUBMIT_SUCCEEDED, meta: { form: form, fields: fields }, error: false };
	};

	var touch = exports.touch = function touch(form) {
	  for (var _len3 = arguments.length, fields = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    fields[_key3 - 1] = arguments[_key3];
	  }

	  return { type: _actionTypes.TOUCH, meta: { form: form, fields: fields } };
	};

	var unregisterField = exports.unregisterField = function unregisterField(form, name) {
	  return { type: _actionTypes.UNREGISTER_FIELD, meta: { form: form }, payload: { name: name } };
	};

	var untouch = exports.untouch = function untouch(form) {
	  for (var _len4 = arguments.length, fields = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    fields[_key4 - 1] = arguments[_key4];
	  }

	  return { type: _actionTypes.UNTOUCH, meta: { form: form, fields: fields } };
	};

	var updateSyncErrors = exports.updateSyncErrors = function updateSyncErrors(form) {
	  var syncErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var error = arguments[2];
	  return { type: _actionTypes.UPDATE_SYNC_ERRORS, meta: { form: form }, payload: { syncErrors: syncErrors, error: error } };
	};

	var updateSyncWarnings = exports.updateSyncWarnings = function updateSyncWarnings(form) {
	  var syncWarnings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var warning = arguments[2];
	  return { type: _actionTypes.UPDATE_SYNC_WARNINGS, meta: { form: form }, payload: { syncWarnings: syncWarnings, warning: warning } };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _noop2 = __webpack_require__(136);

	var _noop3 = _interopRequireDefault(_noop2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createOnBlur = __webpack_require__(56);

	var _createOnBlur2 = _interopRequireDefault(_createOnBlur);

	var _createOnChange = __webpack_require__(57);

	var _createOnChange2 = _interopRequireDefault(_createOnChange);

	var _createOnDragStart = __webpack_require__(20);

	var _createOnDragStart2 = _interopRequireDefault(_createOnDragStart);

	var _createOnDrop = __webpack_require__(58);

	var _createOnDrop2 = _interopRequireDefault(_createOnDrop);

	var _createOnFocus = __webpack_require__(59);

	var _createOnFocus2 = _interopRequireDefault(_createOnFocus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var processProps = function processProps(type, props, _value) {
	  var value = props.value;

	  if (type === 'checkbox') {
	    return _extends({}, props, {
	      checked: !!value
	    });
	  }
	  if (type === 'radio') {
	    return _extends({}, props, {
	      checked: value === _value,
	      value: _value
	    });
	  }
	  if (type === 'select-multiple') {
	    return _extends({}, props, {
	      value: value || []
	    });
	  }
	  if (type === 'file') {
	    return _extends({}, props, {
	      value: undefined
	    });
	  }
	  return props;
	};

	var createFieldProps = function createFieldProps(getIn, name, _ref) {
	  var asyncError = _ref.asyncError,
	      asyncValidating = _ref.asyncValidating,
	      blur = _ref.blur,
	      change = _ref.change,
	      dirty = _ref.dirty,
	      dispatch = _ref.dispatch,
	      focus = _ref.focus,
	      format = _ref.format,
	      normalize = _ref.normalize,
	      parse = _ref.parse,
	      pristine = _ref.pristine,
	      props = _ref.props,
	      state = _ref.state,
	      submitError = _ref.submitError,
	      submitting = _ref.submitting,
	      value = _ref.value,
	      _value = _ref._value,
	      syncError = _ref.syncError,
	      syncWarning = _ref.syncWarning,
	      custom = _objectWithoutProperties(_ref, ['asyncError', 'asyncValidating', 'blur', 'change', 'dirty', 'dispatch', 'focus', 'format', 'normalize', 'parse', 'pristine', 'props', 'state', 'submitError', 'submitting', 'value', '_value', 'syncError', 'syncWarning']);

	  var asyncValidate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _noop3.default;

	  var error = syncError || asyncError || submitError;
	  var warning = syncWarning;
	  var boundParse = parse && function (value) {
	    return parse(value, name);
	  };
	  var boundNormalize = normalize && function (value) {
	    return normalize(name, value);
	  };
	  var boundChange = function boundChange(value) {
	    return dispatch(change(name, value));
	  };
	  var onChange = (0, _createOnChange2.default)(boundChange, {
	    normalize: boundNormalize,
	    parse: boundParse
	  });

	  var formatFieldValue = function formatFieldValue(value, format) {
	    if (format === null) {
	      return value;
	    }
	    var defaultFormattedValue = value == null ? '' : value;
	    return format ? format(value, name) : defaultFormattedValue;
	  };

	  var formattedFieldValue = formatFieldValue(value, format);

	  return {
	    input: processProps(custom.type, {
	      name: name,
	      onBlur: (0, _createOnBlur2.default)(function (value) {
	        return dispatch(blur(name, value));
	      }, {
	        normalize: boundNormalize,
	        parse: boundParse,
	        after: asyncValidate.bind(null, name)
	      }),
	      onChange: onChange,
	      onDragStart: (0, _createOnDragStart2.default)(name, formattedFieldValue),
	      onDrop: (0, _createOnDrop2.default)(name, boundChange),
	      onFocus: (0, _createOnFocus2.default)(name, function () {
	        return dispatch(focus(name));
	      }),
	      value: formattedFieldValue
	    }, _value),
	    meta: _extends({}, state, {
	      active: !!(state && getIn(state, 'active')),
	      asyncValidating: asyncValidating,
	      autofilled: !!(state && getIn(state, 'autofilled')),
	      dirty: dirty,
	      dispatch: dispatch,
	      error: error,
	      warning: warning,
	      invalid: !!error,
	      pristine: pristine,
	      submitting: !!submitting,
	      touched: !!(state && getIn(state, 'touched')),
	      valid: !error,
	      visited: !!(state && getIn(state, 'visited'))
	    }),
	    custom: _extends({}, custom, props)
	  };
	};

	exports.default = createFieldProps;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var dataKey = exports.dataKey = 'text';
	var createOnDragStart = function createOnDragStart(name, value) {
	  return function (event) {
	    event.dataTransfer.setData(dataKey, value);
	  };
	};

	exports.default = createOnDragStart;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEvent = __webpack_require__(22);

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
	    var _event$target = event.target,
	        type = _event$target.type,
	        value = _event$target.value,
	        checked = _event$target.checked,
	        files = _event$target.files,
	        dataTransfer = event.dataTransfer;

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
	  return event;
	};

	exports.default = getValue;

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEvent = __webpack_require__(22);

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
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';

	exports.default = isReactNative;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createIsPristine = function createIsPristine(_ref) {
	  var deepEqual = _ref.deepEqual,
	      empty = _ref.empty,
	      getIn = _ref.getIn;
	  return function (form) {
	    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
	      return getIn(state, 'form');
	    };
	    return function (state) {
	      var formState = getFormState(state);
	      var initial = getIn(formState, form + '.initial') || empty;
	      var values = getIn(formState, form + '.values') || initial;
	      return deepEqual(initial, values);
	    };
	  };
	};

	exports.default = createIsPristine;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath2 = __webpack_require__(10);

	var _toPath3 = _interopRequireDefault(_toPath2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getIn = function getIn(state, field) {
	  if (!state) {
	    return state;
	  }

	  var path = (0, _toPath3.default)(field);
	  var length = path.length;
	  if (!length) {
	    return undefined;
	  }

	  var result = state;
	  for (var i = 0; i < length && !!result; ++i) {
	    result = result[path[i]];
	  }

	  return result;
	};

	exports.default = getIn;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(117),
	    listCacheDelete = __webpack_require__(118),
	    listCacheGet = __webpack_require__(119),
	    listCacheHas = __webpack_require__(120),
	    listCacheSet = __webpack_require__(121);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(8),
	    eq = __webpack_require__(15);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(106);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(33);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(111);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(30),
	    isObject = __webpack_require__(3);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(33);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(8),
	    baseForOwn = __webpack_require__(92),
	    baseIteratee = __webpack_require__(96);

	/**
	 * Creates an object with the same keys as `object` and values generated
	 * by running each own enumerable string keyed property of `object` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapKeys
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);

	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, key, iteratee(value, key, object));
	  });
	  return result;
	}

	module.exports = mapValues;


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Array.prototype.findIndex
	 *
	 * @ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
	 */

	module.exports = (function() {
	    if (!Array.prototype.findIndex) {
	        Array.prototype.findIndex = function(predicate) {
	            if (this === null) {
	                throw new TypeError('Array.prototype.findIndex called on null or undefined');
	            }

	            if (typeof predicate !== 'function') {
	                throw new TypeError('predicate must be a function');
	            }

	            var list = Object(this);
	            var length = list.length >>> 0;
	            var thisArg = arguments[1];
	            var value;

	            for (var i = 0; i < length; i++) {
	                value = list[i];
	                if (predicate.call(thisArg, value, i, list)) {
	                    return i;
	                }
	            }

	            return -1;
	        };
	    }
	})();


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _reactRedux = __webpack_require__(4);

	var _createFieldProps2 = __webpack_require__(19);

	var _createFieldProps3 = _interopRequireDefault(_createFieldProps2);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propsToNotUpdateFor = ['_reduxForm'];

	var createConnectedField = function createConnectedField(_ref) {
	  var deepEqual = _ref.deepEqual,
	      getIn = _ref.getIn;


	  var getSyncError = function getSyncError(syncErrors, name) {
	    var error = _plain2.default.getIn(syncErrors, name);
	    // Because the error for this field might not be at a level in the error structure where
	    // it can be set directly, it might need to be unwrapped from the _error property
	    return error && error._error ? error._error : error;
	  };

	  var getSyncWarning = function getSyncWarning(syncWarnings, name) {
	    var warning = _plain2.default.getIn(syncWarnings, name);
	    // Because the warning for this field might not be at a level in the warning structure where
	    // it can be set directly, it might need to be unwrapped from the _warning property
	    return warning && warning._warning ? warning._warning : warning;
	  };

	  var ConnectedField = function (_Component) {
	    _inherits(ConnectedField, _Component);

	    function ConnectedField() {
	      _classCallCheck(this, ConnectedField);

	      return _possibleConstructorReturn(this, (ConnectedField.__proto__ || Object.getPrototypeOf(ConnectedField)).apply(this, arguments));
	    }

	    _createClass(ConnectedField, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var _this2 = this;

	        var nextPropsKeys = Object.keys(nextProps);
	        var thisPropsKeys = Object.keys(this.props);
	        return nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {
	          return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);
	        });
	      }
	    }, {
	      key: 'isPristine',
	      value: function isPristine() {
	        return this.props.pristine;
	      }
	    }, {
	      key: 'getValue',
	      value: function getValue() {
	        return this.props.value;
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        return this.refs.renderedComponent;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props = this.props,
	            component = _props.component,
	            withRef = _props.withRef,
	            name = _props.name,
	            _reduxForm = _props._reduxForm,
	            rest = _objectWithoutProperties(_props, ['component', 'withRef', 'name', '_reduxForm']);

	        var asyncValidate = _reduxForm.asyncValidate,
	            blur = _reduxForm.blur,
	            change = _reduxForm.change,
	            focus = _reduxForm.focus;

	        var _createFieldProps = (0, _createFieldProps3.default)(getIn, name, _extends({}, rest, {
	          name: name,
	          blur: blur,
	          change: change,
	          focus: focus
	        }), asyncValidate),
	            custom = _createFieldProps.custom,
	            props = _objectWithoutProperties(_createFieldProps, ['custom']);

	        if (withRef) {
	          custom.ref = 'renderedComponent';
	        }
	        if (typeof component === 'string') {
	          var input = props.input,
	              meta = props.meta; // eslint-disable-line no-unused-vars
	          // flatten input into other props

	          return (0, _react.createElement)(component, _extends({}, input, custom));
	        } else {
	          return (0, _react.createElement)(component, _extends({}, props, custom));
	        }
	      }
	    }]);

	    return ConnectedField;
	  }(_react.Component);

	  ConnectedField.propTypes = {
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    props: _react.PropTypes.object
	  };

	  var connector = (0, _reactRedux.connect)(function (state, ownProps) {
	    var name = ownProps.name,
	        _ownProps$_reduxForm = ownProps._reduxForm,
	        initialValues = _ownProps$_reduxForm.initialValues,
	        getFormState = _ownProps$_reduxForm.getFormState;

	    var formState = getFormState(state);
	    var initialState = getIn(formState, 'initial.' + name);
	    var initial = initialState !== undefined ? initialState : initialValues && getIn(initialValues, name);
	    var value = getIn(formState, 'values.' + name);
	    var submitting = getIn(formState, 'submitting');
	    var syncError = getSyncError(getIn(formState, 'syncErrors'), name);
	    var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);
	    var pristine = value === initial;
	    return {
	      asyncError: getIn(formState, 'asyncErrors.' + name),
	      asyncValidating: getIn(formState, 'asyncValidating') === name,
	      dirty: !pristine,
	      pristine: pristine,
	      state: getIn(formState, 'fields.' + name),
	      submitError: getIn(formState, 'submitErrors.' + name),
	      submitting: submitting,
	      syncError: syncError,
	      syncWarning: syncWarning,
	      value: value,
	      _value: ownProps.value // save value passed in (for checkboxes)
	    };
	  }, undefined, undefined, { withRef: true });
	  return connector(ConnectedField);
	};

	exports.default = createConnectedField;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mapValues2 = __webpack_require__(40);

	var _mapValues3 = _interopRequireDefault(_mapValues2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _reactRedux = __webpack_require__(4);

	var _redux = __webpack_require__(41);

	var _createFieldArrayProps = __webpack_require__(52);

	var _createFieldArrayProps2 = _interopRequireDefault(_createFieldArrayProps);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propsToNotUpdateFor = ['_reduxForm', 'value'];

	var createConnectedFieldArray = function createConnectedFieldArray(_ref) {
	  var deepEqual = _ref.deepEqual,
	      getIn = _ref.getIn,
	      size = _ref.size;


	  var getSyncError = function getSyncError(syncErrors, name) {
	    // For an array, the error can _ONLY_ be under _error.
	    // This is why this getSyncError is not the same as the
	    // one in Field.
	    return _plain2.default.getIn(syncErrors, name + '._error');
	  };

	  var getSyncWarning = function getSyncWarning(syncWarnings, name) {
	    // For an array, the warning can _ONLY_ be under _warning.
	    // This is why this getSyncError is not the same as the
	    // one in Field.
	    return _plain2.default.getIn(syncWarnings, name + '._warning');
	  };

	  var ConnectedFieldArray = function (_Component) {
	    _inherits(ConnectedFieldArray, _Component);

	    function ConnectedFieldArray() {
	      _classCallCheck(this, ConnectedFieldArray);

	      return _possibleConstructorReturn(this, (ConnectedFieldArray.__proto__ || Object.getPrototypeOf(ConnectedFieldArray)).apply(this, arguments));
	    }

	    _createClass(ConnectedFieldArray, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var _this2 = this;

	        var nextPropsKeys = Object.keys(nextProps);
	        var thisPropsKeys = Object.keys(this.props);
	        return nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {
	          // useful to debug rerenders
	          // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {
	          //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])
	          // }
	          return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);
	        });
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        return this.refs.renderedComponent;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        /*eslint no-unused-vars: ["error", { "varsIgnorePattern": "^_reduxForm$" }]*/
	        var _props = this.props,
	            component = _props.component,
	            withRef = _props.withRef,
	            name = _props.name,
	            _reduxForm = _props._reduxForm,
	            rest = _objectWithoutProperties(_props, ['component', 'withRef', 'name', '_reduxForm']);

	        var props = (0, _createFieldArrayProps2.default)(getIn, name, _extends({}, rest, {
	          name: name
	        }));
	        if (withRef) {
	          props.ref = 'renderedComponent';
	        }
	        return (0, _react.createElement)(component, props);
	      }
	    }, {
	      key: 'dirty',
	      get: function get() {
	        return this.props.dirty;
	      }
	    }, {
	      key: 'pristine',
	      get: function get() {
	        return this.props.pristine;
	      }
	    }, {
	      key: 'value',
	      get: function get() {
	        return this.props.value;
	      }
	    }]);

	    return ConnectedFieldArray;
	  }(_react.Component);

	  ConnectedFieldArray.propTypes = {
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    props: _react.PropTypes.object
	  };

	  ConnectedFieldArray.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  var connector = (0, _reactRedux.connect)(function (state, ownProps) {
	    var name = ownProps.name,
	        _ownProps$_reduxForm = ownProps._reduxForm,
	        initialValues = _ownProps$_reduxForm.initialValues,
	        getFormState = _ownProps$_reduxForm.getFormState;

	    var formState = getFormState(state);
	    var initial = getIn(formState, 'initial.' + name) || initialValues && getIn(initialValues, name);
	    var value = getIn(formState, 'values.' + name);
	    var submitting = getIn(formState, 'submitting');
	    var syncError = getSyncError(getIn(formState, 'syncErrors'), name);
	    var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);
	    var pristine = deepEqual(value, initial);
	    return {
	      asyncError: getIn(formState, 'asyncErrors.' + name + '._error'),
	      dirty: !pristine,
	      pristine: pristine,
	      state: getIn(formState, 'fields.' + name),
	      submitError: getIn(formState, 'submitErrors.' + name + '._error'),
	      submitting: submitting,
	      syncError: syncError,
	      syncWarning: syncWarning,
	      value: value,
	      length: size(value)
	    };
	  }, function (dispatch, ownProps) {
	    var name = ownProps.name,
	        _reduxForm = ownProps._reduxForm;
	    var arrayInsert = _reduxForm.arrayInsert,
	        arrayMove = _reduxForm.arrayMove,
	        arrayPop = _reduxForm.arrayPop,
	        arrayPush = _reduxForm.arrayPush,
	        arrayRemove = _reduxForm.arrayRemove,
	        arrayRemoveAll = _reduxForm.arrayRemoveAll,
	        arrayShift = _reduxForm.arrayShift,
	        arraySplice = _reduxForm.arraySplice,
	        arraySwap = _reduxForm.arraySwap,
	        arrayUnshift = _reduxForm.arrayUnshift;

	    return (0, _mapValues3.default)({
	      arrayInsert: arrayInsert,
	      arrayMove: arrayMove,
	      arrayPop: arrayPop,
	      arrayPush: arrayPush,
	      arrayRemove: arrayRemove,
	      arrayRemoveAll: arrayRemoveAll,
	      arrayShift: arrayShift,
	      arraySplice: arraySplice,
	      arraySwap: arraySwap,
	      arrayUnshift: arrayUnshift
	    }, function (actionCreator) {
	      return (0, _redux.bindActionCreators)(actionCreator.bind(null, name), dispatch);
	    });
	  }, undefined, { withRef: true });
	  return connector(ConnectedFieldArray);
	};

	exports.default = createConnectedFieldArray;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _reactRedux = __webpack_require__(4);

	var _createFieldProps2 = __webpack_require__(19);

	var _createFieldProps3 = _interopRequireDefault(_createFieldProps2);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propsToNotUpdateFor = ['_reduxForm'];

	var createConnectedFields = function createConnectedFields(_ref) {
	  var deepEqual = _ref.deepEqual,
	      getIn = _ref.getIn;


	  var getSyncError = function getSyncError(syncErrors, name) {
	    var error = _plain2.default.getIn(syncErrors, name);
	    // Because the error for this field might not be at a level in the error structure where
	    // it can be set directly, it might need to be unwrapped from the _error property
	    return error && error._error ? error._error : error;
	  };

	  var getSyncWarning = function getSyncWarning(syncWarnings, name) {
	    var warning = _plain2.default.getIn(syncWarnings, name);
	    // Because the warning for this field might not be at a level in the warning structure where
	    // it can be set directly, it might need to be unwrapped from the _warning property
	    return warning && warning._warning ? warning._warning : warning;
	  };

	  var ConnectedFields = function (_Component) {
	    _inherits(ConnectedFields, _Component);

	    function ConnectedFields() {
	      _classCallCheck(this, ConnectedFields);

	      return _possibleConstructorReturn(this, (ConnectedFields.__proto__ || Object.getPrototypeOf(ConnectedFields)).apply(this, arguments));
	    }

	    _createClass(ConnectedFields, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps) {
	        var _this2 = this;

	        var nextPropsKeys = Object.keys(nextProps);
	        var thisPropsKeys = Object.keys(this.props);
	        return nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {
	          return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);
	        });
	      }
	    }, {
	      key: 'isDirty',
	      value: function isDirty() {
	        var _fields = this.props._fields;

	        return Object.keys(_fields).some(function (name) {
	          return _fields[name].dirty;
	        });
	      }
	    }, {
	      key: 'getValues',
	      value: function getValues() {
	        var _fields = this.props._fields;

	        return Object.keys(_fields).reduce(function (accumulator, name) {
	          return _plain2.default.setIn(accumulator, name, _fields[name].value);
	        }, {});
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        return this.refs.renderedComponent;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var _props = this.props,
	            component = _props.component,
	            withRef = _props.withRef,
	            _fields = _props._fields,
	            _reduxForm = _props._reduxForm,
	            rest = _objectWithoutProperties(_props, ['component', 'withRef', '_fields', '_reduxForm']);

	        var asyncValidate = _reduxForm.asyncValidate,
	            blur = _reduxForm.blur,
	            change = _reduxForm.change,
	            focus = _reduxForm.focus,
	            sectionPrefix = _reduxForm.sectionPrefix;

	        var _Object$keys$reduce = Object.keys(_fields).reduce(function (accumulator, name) {
	          var connectedProps = _fields[name];

	          var _createFieldProps = (0, _createFieldProps3.default)(getIn, name, _extends({}, connectedProps, rest, {
	            blur: blur,
	            change: change,
	            focus: focus
	          }), asyncValidate),
	              custom = _createFieldProps.custom,
	              fieldProps = _objectWithoutProperties(_createFieldProps, ['custom']);

	          accumulator.custom = custom;
	          var fieldName = sectionPrefix ? name.replace(sectionPrefix + '.', '') : name;
	          return _plain2.default.setIn(accumulator, fieldName, fieldProps);
	        }, {}),
	            custom = _Object$keys$reduce.custom,
	            props = _objectWithoutProperties(_Object$keys$reduce, ['custom']);

	        if (withRef) {
	          props.ref = 'renderedComponent';
	        }

	        return (0, _react.createElement)(component, _extends({}, props, custom));
	      }
	    }]);

	    return ConnectedFields;
	  }(_react.Component);

	  ConnectedFields.propTypes = {
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    _fields: _react.PropTypes.object.isRequired,
	    props: _react.PropTypes.object
	  };

	  var connector = (0, _reactRedux.connect)(function (state, ownProps) {
	    var names = ownProps.names,
	        _ownProps$_reduxForm = ownProps._reduxForm,
	        initialValues = _ownProps$_reduxForm.initialValues,
	        getFormState = _ownProps$_reduxForm.getFormState;

	    var formState = getFormState(state);
	    return {
	      _fields: names.reduce(function (accumulator, name) {
	        var initialState = getIn(formState, 'initial.' + name);
	        var initial = initialState !== undefined ? initialState : initialValues && getIn(initialValues, name);
	        var value = getIn(formState, 'values.' + name);
	        var syncError = getSyncError(getIn(formState, 'syncErrors'), name);
	        var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);
	        var submitting = getIn(formState, 'submitting');
	        var pristine = value === initial;
	        accumulator[name] = {
	          asyncError: getIn(formState, 'asyncErrors.' + name),
	          asyncValidating: getIn(formState, 'asyncValidating') === name,
	          dirty: !pristine,
	          pristine: pristine,
	          state: getIn(formState, 'fields.' + name),
	          submitError: getIn(formState, 'submitErrors.' + name),
	          submitting: submitting,
	          syncError: syncError,
	          syncWarning: syncWarning,
	          value: value,
	          _value: ownProps.value // save value passed in (for checkboxes)
	        };
	        return accumulator;
	      }, {})
	    };
	  }, undefined, undefined, { withRef: true });
	  return connector(ConnectedFields);
	};

	exports.default = createConnectedFields;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ConnectedField = __webpack_require__(43);

	var _ConnectedField2 = _interopRequireDefault(_ConnectedField);

	var _shallowCompare = __webpack_require__(13);

	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

	var _prefixName = __webpack_require__(5);

	var _prefixName2 = _interopRequireDefault(_prefixName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var createField = function createField(_ref) {
	  var deepEqual = _ref.deepEqual,
	      getIn = _ref.getIn,
	      setIn = _ref.setIn;


	  var ConnectedField = (0, _ConnectedField2.default)({
	    deepEqual: deepEqual,
	    getIn: getIn
	  });

	  var Field = function (_Component) {
	    _inherits(Field, _Component);

	    function Field(props, context) {
	      _classCallCheck(this, Field);

	      var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('Field must be inside a component decorated with reduxForm()');
	      }

	      _this.normalize = _this.normalize.bind(_this);
	      return _this;
	    }

	    _createClass(Field, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        return (0, _shallowCompare2.default)(this, nextProps, nextState);
	      }
	    }, {
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        var _this2 = this;

	        this.context._reduxForm.register(this.name, 'Field', function () {
	          return _this2.props.validate;
	        }, function () {
	          return _this2.props.warn;
	        });
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (this.props.name !== nextProps.name) {
	          // unregister old name
	          this.context._reduxForm.unregister(this.name);
	          // register new name
	          this.context._reduxForm.register((0, _prefixName2.default)(this.context, nextProps.name), 'Field');
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context._reduxForm.unregister(this.name);
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        (0, _invariant2.default)(this.props.withRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a withRef prop to Field');
	        return this.refs.connected.getWrappedInstance().getRenderedComponent();
	      }
	    }, {
	      key: 'normalize',
	      value: function normalize(name, value) {
	        var normalize = this.props.normalize;

	        if (!normalize) {
	          return value;
	        }
	        var previousValues = this.context._reduxForm.getValues();
	        var previousValue = this.value;
	        var nextValues = setIn(previousValues, name, value);
	        return normalize(value, previousValue, nextValues, previousValues);
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return (0, _react.createElement)(ConnectedField, _extends({}, this.props, {
	          name: this.name,
	          normalize: this.normalize,
	          _reduxForm: this.context._reduxForm,
	          ref: 'connected'
	        }));
	      }
	    }, {
	      key: 'name',
	      get: function get() {
	        return (0, _prefixName2.default)(this.context, this.props.name);
	      }
	    }, {
	      key: 'dirty',
	      get: function get() {
	        return !this.pristine;
	      }
	    }, {
	      key: 'pristine',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().isPristine();
	      }
	    }, {
	      key: 'value',
	      get: function get() {
	        return this.refs.connected && this.refs.connected.getWrappedInstance().getValue();
	      }
	    }]);

	    return Field;
	  }(_react.Component);

	  Field.propTypes = {
	    name: _react.PropTypes.string.isRequired,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    format: _react.PropTypes.func,
	    normalize: _react.PropTypes.func,
	    parse: _react.PropTypes.func,
	    props: _react.PropTypes.object
	  };
	  Field.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  return Field;
	};

	exports.default = createField;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ConnectedFieldArray = __webpack_require__(44);

	var _ConnectedFieldArray2 = _interopRequireDefault(_ConnectedFieldArray);

	var _shallowCompare = __webpack_require__(13);

	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

	var _prefixName = __webpack_require__(5);

	var _prefixName2 = _interopRequireDefault(_prefixName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var wrapError = function wrapError(fn, key) {
	  return fn && function () {
	    var result = fn.apply(undefined, arguments);
	    return result && _defineProperty({}, key, result);
	  };
	};

	var createFieldArray = function createFieldArray(_ref2) {
	  var deepEqual = _ref2.deepEqual,
	      getIn = _ref2.getIn,
	      size = _ref2.size;


	  var ConnectedFieldArray = (0, _ConnectedFieldArray2.default)({ deepEqual: deepEqual, getIn: getIn, size: size });

	  var FieldArray = function (_Component) {
	    _inherits(FieldArray, _Component);

	    function FieldArray(props, context) {
	      _classCallCheck(this, FieldArray);

	      var _this = _possibleConstructorReturn(this, (FieldArray.__proto__ || Object.getPrototypeOf(FieldArray)).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('FieldArray must be inside a component decorated with reduxForm()');
	      }
	      return _this;
	    }

	    _createClass(FieldArray, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        return (0, _shallowCompare2.default)(this, nextProps, nextState);
	      }
	    }, {
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        var _this2 = this;

	        this.context._reduxForm.register(this.name, 'FieldArray', function () {
	          return wrapError(_this2.props.validate, '_error');
	        }, function () {
	          return wrapError(_this2.props.warn, '_warning');
	        });
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        if (this.props.name !== nextProps.name) {
	          // unregister old name
	          this.context._reduxForm.unregister(this.name);
	          // register new name
	          this.context._reduxForm.register((0, _prefixName2.default)(this.context, nextProps.name), 'FieldArray');
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.context._reduxForm.unregister(this.name);
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        (0, _invariant2.default)(this.props.withRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a withRef prop to FieldArray');
	        return this.refs.connected.getWrappedInstance().getRenderedComponent();
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        return (0, _react.createElement)(ConnectedFieldArray, _extends({}, this.props, {
	          name: this.name,
	          syncError: this.syncError,
	          syncWarning: this.syncWarning,
	          _reduxForm: this.context._reduxForm,
	          ref: 'connected'
	        }));
	      }
	    }, {
	      key: 'name',
	      get: function get() {
	        return (0, _prefixName2.default)(this.context, this.props.name);
	      }
	    }, {
	      key: 'dirty',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().dirty;
	      }
	    }, {
	      key: 'pristine',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().pristine;
	      }
	    }, {
	      key: 'value',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().value;
	      }
	    }]);

	    return FieldArray;
	  }(_react.Component);

	  FieldArray.propTypes = {
	    name: _react.PropTypes.string.isRequired,
	    component: _react.PropTypes.func.isRequired,
	    props: _react.PropTypes.object
	  };
	  FieldArray.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  return FieldArray;
	};

	exports.default = createFieldArray;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ConnectedFields = __webpack_require__(45);

	var _ConnectedFields2 = _interopRequireDefault(_ConnectedFields);

	var _shallowCompare = __webpack_require__(13);

	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	var _prefixName = __webpack_require__(5);

	var _prefixName2 = _interopRequireDefault(_prefixName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var validateNameProp = function validateNameProp(prop) {
	  if (!prop) {
	    return new Error('No "names" prop was specified <Fields/>');
	  }
	  if (!Array.isArray(prop) && !prop._isFieldArray) {
	    return new Error('Invalid prop "names" supplied to <Fields/>. Must be either an array of strings or the fields array generated by FieldArray.');
	  }
	};

	var createFields = function createFields(_ref) {
	  var deepEqual = _ref.deepEqual,
	      getIn = _ref.getIn;


	  var ConnectedFields = (0, _ConnectedFields2.default)({
	    deepEqual: deepEqual,
	    getIn: getIn
	  });

	  var Fields = function (_Component) {
	    _inherits(Fields, _Component);

	    function Fields(props, context) {
	      _classCallCheck(this, Fields);

	      var _this = _possibleConstructorReturn(this, (Fields.__proto__ || Object.getPrototypeOf(Fields)).call(this, props, context));

	      if (!context._reduxForm) {
	        throw new Error('Fields must be inside a component decorated with reduxForm()');
	      }
	      return _this;
	    }

	    _createClass(Fields, [{
	      key: 'shouldComponentUpdate',
	      value: function shouldComponentUpdate(nextProps, nextState) {
	        return (0, _shallowCompare2.default)(this, nextProps, nextState);
	      }
	    }, {
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        var error = validateNameProp(this.props.names);
	        if (error) {
	          throw error;
	        }
	        var context = this.context;
	        var register = context._reduxForm.register;

	        this.names.forEach(function (name) {
	          return register((0, _prefixName2.default)(context, name), 'Field');
	        });
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        var _this2 = this;

	        if (!_plain2.default.deepEqual(this.props.names, nextProps.names)) {
	          (function () {
	            var context = _this2.context;
	            var _context$_reduxForm = context._reduxForm,
	                register = _context$_reduxForm.register,
	                unregister = _context$_reduxForm.unregister;
	            // unregister old name

	            _this2.props.names.forEach(function (name) {
	              return unregister((0, _prefixName2.default)(context, name));
	            });
	            // register new name
	            nextProps.names.forEach(function (name) {
	              return register((0, _prefixName2.default)(context, name), 'Field');
	            });
	          })();
	        }
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        var context = this.context;
	        var unregister = context._reduxForm.unregister;

	        this.props.names.forEach(function (name) {
	          return unregister((0, _prefixName2.default)(context, name));
	        });
	      }
	    }, {
	      key: 'getRenderedComponent',
	      value: function getRenderedComponent() {
	        (0, _invariant2.default)(this.props.withRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a withRef prop to Fields');
	        return this.refs.connected.getWrappedInstance().getRenderedComponent();
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var context = this.context;

	        return (0, _react.createElement)(ConnectedFields, _extends({}, this.props, {
	          names: this.props.names.map(function (name) {
	            return (0, _prefixName2.default)(context, name);
	          }),
	          _reduxForm: this.context._reduxForm,
	          ref: 'connected'
	        }));
	      }
	    }, {
	      key: 'names',
	      get: function get() {
	        return this.props.names;
	      }
	    }, {
	      key: 'dirty',
	      get: function get() {
	        return this.refs.connected.getWrappedInstance().isDirty();
	      }
	    }, {
	      key: 'pristine',
	      get: function get() {
	        return !this.dirty;
	      }
	    }, {
	      key: 'values',
	      get: function get() {
	        return this.refs.connected && this.refs.connected.getWrappedInstance().getValues();
	      }
	    }]);

	    return Fields;
	  }(_react.Component);

	  Fields.propTypes = {
	    names: function names(props, propName) {
	      return validateNameProp(props[propName]);
	    },
	    component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]).isRequired,
	    format: _react.PropTypes.func,
	    parse: _react.PropTypes.func,
	    props: _react.PropTypes.object
	  };
	  Fields.contextTypes = {
	    _reduxForm: _react.PropTypes.object
	  };

	  return Fields;
	};

	exports.default = createFields;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _prefixName = __webpack_require__(5);

	var _prefixName2 = _interopRequireDefault(_prefixName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FormSection = function (_Component) {
	  _inherits(FormSection, _Component);

	  function FormSection(props, context) {
	    _classCallCheck(this, FormSection);

	    var _this = _possibleConstructorReturn(this, (FormSection.__proto__ || Object.getPrototypeOf(FormSection)).call(this, props, context));

	    if (!context._reduxForm) {
	      throw new Error('FormSection must be inside a component decorated with reduxForm()');
	    }
	    return _this;
	  }

	  _createClass(FormSection, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var context = this.context,
	          name = this.props.name;

	      return {
	        _reduxForm: _extends({}, context._reduxForm, {
	          sectionPrefix: (0, _prefixName2.default)(context, name)
	        })
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;


	      if (_react2.default.isValidElement(children)) {
	        return children;
	      }

	      return _react2.default.createElement(
	        'div',
	        null,
	        children
	      );
	    }
	  }]);

	  return FormSection;
	}(_react.Component);

	FormSection.propTypes = {
	  name: _react.PropTypes.string.isRequired
	};

	FormSection.childContextTypes = {
	  _reduxForm: _react.PropTypes.object.isRequired
	};

	FormSection.contextTypes = {
	  _reduxForm: _react.PropTypes.object
	};

	exports.default = FormSection;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isPromise = __webpack_require__(14);

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
	        return errors;
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reducer = __webpack_require__(66);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reduxForm = __webpack_require__(67);

	var _reduxForm2 = _interopRequireDefault(_reduxForm);

	var _Field = __webpack_require__(46);

	var _Field2 = _interopRequireDefault(_Field);

	var _Fields = __webpack_require__(48);

	var _Fields2 = _interopRequireDefault(_Fields);

	var _FieldArray = __webpack_require__(47);

	var _FieldArray2 = _interopRequireDefault(_FieldArray);

	var _formValueSelector = __webpack_require__(61);

	var _formValueSelector2 = _interopRequireDefault(_formValueSelector);

	var _values = __webpack_require__(78);

	var _values2 = _interopRequireDefault(_values);

	var _getFormValues = __webpack_require__(70);

	var _getFormValues2 = _interopRequireDefault(_getFormValues);

	var _getFormSyncErrors = __webpack_require__(69);

	var _getFormSyncErrors2 = _interopRequireDefault(_getFormSyncErrors);

	var _getFormSubmitErrors = __webpack_require__(68);

	var _getFormSubmitErrors2 = _interopRequireDefault(_getFormSubmitErrors);

	var _isDirty = __webpack_require__(71);

	var _isDirty2 = _interopRequireDefault(_isDirty);

	var _isInvalid = __webpack_require__(72);

	var _isInvalid2 = _interopRequireDefault(_isInvalid);

	var _isPristine = __webpack_require__(25);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	var _isValid = __webpack_require__(12);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _FormSection = __webpack_require__(49);

	var _FormSection2 = _interopRequireDefault(_FormSection);

	var _SubmissionError = __webpack_require__(17);

	var _SubmissionError2 = _interopRequireDefault(_SubmissionError);

	var _propTypes = __webpack_require__(65);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _actions = __webpack_require__(18);

	var actions = _interopRequireWildcard(_actions);

	var _actionTypes = __webpack_require__(11);

	var actionTypes = _interopRequireWildcard(_actionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createAll = function createAll(structure) {
	  return _extends({
	    // separate out field actions
	    actionTypes: actionTypes
	  }, actions, {
	    Field: (0, _Field2.default)(structure),
	    Fields: (0, _Fields2.default)(structure),
	    FieldArray: (0, _FieldArray2.default)(structure),
	    FormSection: _FormSection2.default,
	    formValueSelector: (0, _formValueSelector2.default)(structure),
	    getFormValues: (0, _getFormValues2.default)(structure),
	    getFormSyncErrors: (0, _getFormSyncErrors2.default)(structure),
	    getFormSubmitErrors: (0, _getFormSubmitErrors2.default)(structure),
	    isDirty: (0, _isDirty2.default)(structure),
	    isInvalid: (0, _isInvalid2.default)(structure),
	    isPristine: (0, _isPristine2.default)(structure),
	    isValid: (0, _isValid2.default)(structure),
	    propTypes: _propTypes2.default,
	    reduxForm: (0, _reduxForm2.default)(structure),
	    reducer: (0, _reducer2.default)(structure),
	    SubmissionError: _SubmissionError2.default,
	    values: (0, _values2.default)(structure)
	  });
	};

	exports.default = createAll;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var createFieldArrayProps = function createFieldArrayProps(getIn, name, _ref) {
	  var arrayInsert = _ref.arrayInsert,
	      arrayMove = _ref.arrayMove,
	      arrayPop = _ref.arrayPop,
	      arrayPush = _ref.arrayPush,
	      arrayRemove = _ref.arrayRemove,
	      arrayRemoveAll = _ref.arrayRemoveAll,
	      arrayShift = _ref.arrayShift,
	      arraySplice = _ref.arraySplice,
	      arraySwap = _ref.arraySwap,
	      arrayUnshift = _ref.arrayUnshift,
	      asyncError = _ref.asyncError,
	      dirty = _ref.dirty,
	      length = _ref.length,
	      pristine = _ref.pristine,
	      submitError = _ref.submitError,
	      state = _ref.state,
	      submitFailed = _ref.submitFailed,
	      submitting = _ref.submitting,
	      syncError = _ref.syncError,
	      syncWarning = _ref.syncWarning,
	      value = _ref.value,
	      props = _ref.props,
	      rest = _objectWithoutProperties(_ref, ['arrayInsert', 'arrayMove', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayRemoveAll', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'asyncError', 'dirty', 'length', 'pristine', 'submitError', 'state', 'submitFailed', 'submitting', 'syncError', 'syncWarning', 'value', 'props']);

	  var error = syncError || asyncError || submitError;
	  var warning = syncWarning;
	  var finalProps = _extends({
	    fields: {
	      _isFieldArray: true,
	      forEach: function forEach(callback) {
	        return (value || []).forEach(function (item, index) {
	          return callback(name + '[' + index + ']', index, finalProps.fields);
	        });
	      },
	      get: function get(index) {
	        return value && getIn(value, index);
	      },
	      getAll: function getAll() {
	        return value;
	      },
	      insert: arrayInsert,
	      length: length,
	      map: function map(callback) {
	        return (value || []).map(function (item, index) {
	          return callback(name + '[' + index + ']', index, finalProps.fields);
	        });
	      },
	      move: arrayMove,
	      name: name,
	      pop: function pop() {
	        arrayPop();
	        return getIn(value, length - 1);
	      },
	      push: arrayPush,
	      reduce: function reduce(callback, initial) {
	        return (value || []).reduce(function (accumulator, item, index) {
	          return callback(accumulator, name + '[' + index + ']', index, finalProps.fields);
	        }, initial);
	      },
	      remove: arrayRemove,
	      removeAll: arrayRemoveAll,
	      shift: function shift() {
	        arrayShift();
	        return getIn(value, 0);
	      },
	      swap: arraySwap,
	      unshift: arrayUnshift
	    },
	    meta: {
	      dirty: dirty,
	      error: error,
	      warning: warning,
	      invalid: !!error,
	      pristine: pristine,
	      submitting: submitting,
	      touched: !!(state && getIn(state, 'touched')),
	      valid: !error
	    }
	  }, props, rest);
	  return finalProps;
	};

	exports.default = createFieldArrayProps;

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultShouldAsyncValidate = function defaultShouldAsyncValidate(_ref) {
	  var initialized = _ref.initialized,
	      trigger = _ref.trigger,
	      pristine = _ref.pristine,
	      syncValidationPasses = _ref.syncValidationPasses;

	  if (!syncValidationPasses) {
	    return false;
	  }
	  switch (trigger) {
	    case 'blur':
	      // blurring
	      return true;
	    case 'submit':
	      // submitting, so only async validate if form is dirty or was never initialized
	      // conversely, DON'T async validate if the form is pristine just as it was initialized
	      return !pristine || !initialized;
	    default:
	      return false;
	  }
	};

	exports.default = defaultShouldAsyncValidate;

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultShouldValidate = function defaultShouldValidate(_ref) {
	  var values = _ref.values,
	      nextProps = _ref.nextProps,
	      initialRender = _ref.initialRender,
	      lastFieldValidatorKeys = _ref.lastFieldValidatorKeys,
	      fieldValidatorKeys = _ref.fieldValidatorKeys,
	      structure = _ref.structure;

	  if (initialRender) {
	    return true;
	  }
	  return !structure.deepEqual(values, nextProps.values) || !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys);
	};

	exports.default = defaultShouldValidate;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath2 = __webpack_require__(10);

	var _toPath3 = _interopRequireDefault(_toPath2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createDeleteInWithCleanUp = function createDeleteInWithCleanUp(_ref) {
	  var deepEqual = _ref.deepEqual,
	      empty = _ref.empty,
	      getIn = _ref.getIn,
	      deleteIn = _ref.deleteIn,
	      setIn = _ref.setIn;


	  var deleteInWithCleanUp = function deleteInWithCleanUp(state, path) {
	    if (path[path.length - 1] === ']') {
	      // array path
	      var pathTokens = (0, _toPath3.default)(path);
	      pathTokens.pop();
	      var parent = getIn(state, pathTokens.join('.'));
	      return parent ? setIn(state, path, undefined) : state;
	    }
	    var result = deleteIn(state, path);
	    var dotIndex = path.lastIndexOf('.');
	    if (dotIndex > 0) {
	      var parentPath = path.substring(0, dotIndex);
	      if (parentPath[parentPath.length - 1] !== ']') {
	        var _parent = getIn(result, parentPath);
	        if (deepEqual(_parent, empty)) {
	          return deleteInWithCleanUp(result, parentPath);
	        }
	      }
	    }
	    return result;
	  };

	  return deleteInWithCleanUp;
	};

	exports.default = createDeleteInWithCleanUp;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getValue = __webpack_require__(21);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _isReactNative = __webpack_require__(24);

	var _isReactNative2 = _interopRequireDefault(_isReactNative);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnBlur = function createOnBlur(blur) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      after = _ref.after,
	      normalize = _ref.normalize,
	      parse = _ref.parse;

	  return function (event) {
	    // read value from input
	    var value = (0, _getValue2.default)(event, _isReactNative2.default);

	    // parse value if we have a parser
	    if (parse) {
	      value = parse(value);
	    }

	    // normalize value
	    if (normalize) {
	      value = normalize(value);
	    }

	    // dispatch blur action
	    blur(value);

	    // call after callback
	    if (after) {
	      after(value);
	    }
	  };
	};

	exports.default = createOnBlur;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getValue = __webpack_require__(21);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _isReactNative = __webpack_require__(24);

	var _isReactNative2 = _interopRequireDefault(_isReactNative);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createOnChange = function createOnChange(change) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      parse = _ref.parse,
	      normalize = _ref.normalize;

	  return function (event) {
	    // read value from input
	    var value = (0, _getValue2.default)(event, _isReactNative2.default);

	    // parse value if we have a parser
	    if (parse) {
	      value = parse(value);
	    }

	    // normalize value
	    if (normalize) {
	      value = normalize(value);
	    }

	    // dispatch change action
	    change(value);
	  };
	};

	exports.default = createOnChange;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createOnDragStart = __webpack_require__(20);

	var createOnDrop = function createOnDrop(name, change) {
	  return function (event) {
	    change(event.dataTransfer.getData(_createOnDragStart.dataKey));
	    event.preventDefault();
	  };
	};
	exports.default = createOnDrop;

/***/ },
/* 59 */
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _silenceEvent = __webpack_require__(23);

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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _invariant = __webpack_require__(6);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createFormValueSelector = function createFormValueSelector(_ref) {
	  var getIn = _ref.getIn;
	  return function (form) {
	    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
	      return getIn(state, 'form');
	    };

	    (0, _invariant2.default)(form, 'Form value must be specified');
	    return function (state) {
	      for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        fields[_key - 1] = arguments[_key];
	      }

	      (0, _invariant2.default)(fields.length, 'No fields specified');
	      return fields.length === 1 ?
	      // only selecting one field, so return its value
	      getIn(getFormState(state), form + '.values.' + fields[0]) :
	      // selecting many fields, so return an object of field values
	      fields.reduce(function (accumulator, field) {
	        var value = getIn(getFormState(state), form + '.values.' + field);
	        return value === undefined ? accumulator : _plain2.default.setIn(accumulator, field, value);
	      }, {});
	    };
	  };
	};

	exports.default = createFormValueSelector;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toArray = function toArray(value) {
	  return Array.isArray(value) ? value : [value];
	};

	var getError = function getError(value, values, validators) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = toArray(validators)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var validator = _step.value;

	      var error = validator(value, values);
	      if (error) {
	        return error;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	};

	var generateValidator = function generateValidator(validators, _ref) {
	  var getIn = _ref.getIn;
	  return function (values) {
	    var errors = {};
	    Object.keys(validators).forEach(function (name) {
	      var value = getIn(values, name);
	      var error = getError(value, values, validators[name]);
	      if (error) {
	        errors = _plain2.default.setIn(errors, name, error);
	      }
	    });
	    return errors;
	  };
	};

	exports.default = generateValidator;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _isPromise = __webpack_require__(14);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _SubmissionError = __webpack_require__(17);

	var _SubmissionError2 = _interopRequireDefault(_SubmissionError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var handleSubmit = function handleSubmit(submit, props, valid, asyncValidate, fields) {
	  var dispatch = props.dispatch,
	      onSubmitFail = props.onSubmitFail,
	      onSubmitSuccess = props.onSubmitSuccess,
	      startSubmit = props.startSubmit,
	      stopSubmit = props.stopSubmit,
	      setSubmitFailed = props.setSubmitFailed,
	      setSubmitSucceeded = props.setSubmitSucceeded,
	      syncErrors = props.syncErrors,
	      touch = props.touch,
	      values = props.values,
	      persistentSubmitErrors = props.persistentSubmitErrors;


	  touch.apply(undefined, _toConsumableArray(fields)); // mark all fields as touched

	  if (valid || persistentSubmitErrors) {
	    var _ret = function () {
	      var doSubmit = function doSubmit() {
	        var result = void 0;
	        try {
	          result = submit(values, dispatch, props);
	        } catch (submitError) {
	          var error = submitError instanceof _SubmissionError2.default ? submitError.errors : undefined;
	          setSubmitFailed.apply(undefined, _toConsumableArray(fields));
	          if (onSubmitFail) {
	            onSubmitFail(error, dispatch, submitError);
	          }
	          if (error || onSubmitFail) {
	            // if you've provided an onSubmitFail callback, don't re-throw the error
	            return error;
	          } else {
	            throw submitError;
	          }
	        }
	        if ((0, _isPromise2.default)(result)) {
	          startSubmit();
	          return result.then(function (submitResult) {
	            stopSubmit();
	            setSubmitSucceeded();
	            if (onSubmitSuccess) {
	              onSubmitSuccess(submitResult, dispatch);
	            }
	            return submitResult;
	          }, function (submitError) {
	            var error = submitError instanceof _SubmissionError2.default ? submitError.errors : undefined;
	            stopSubmit(error);
	            setSubmitFailed.apply(undefined, _toConsumableArray(fields));
	            if (onSubmitFail) {
	              onSubmitFail(error, dispatch, submitError);
	            }
	            if (error || onSubmitFail) {
	              // if you've provided an onSubmitFail callback, don't re-throw the error
	              return error;
	            } else {
	              throw submitError;
	            }
	          });
	        } else {
	          setSubmitSucceeded();
	          if (onSubmitSuccess) {
	            onSubmitSuccess(result, dispatch);
	          }
	        }
	        return result;
	      };

	      var asyncValidateResult = asyncValidate && asyncValidate();
	      if (asyncValidateResult) {
	        return {
	          v: asyncValidateResult.then(function (asyncErrors) {
	            if (asyncErrors) {
	              throw asyncErrors;
	            }
	            return doSubmit();
	          }).catch(function (asyncErrors) {
	            setSubmitFailed.apply(undefined, _toConsumableArray(fields));
	            if (onSubmitFail) {
	              onSubmitFail(asyncErrors, dispatch, null);
	            }
	            return Promise.reject(asyncErrors);
	          })
	        };
	      } else {
	        return {
	          v: doSubmit()
	        };
	      }
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  } else {
	    setSubmitFailed.apply(undefined, _toConsumableArray(fields));
	    if (onSubmitFail) {
	      onSubmitFail(syncErrors, dispatch, null);
	    }
	    return syncErrors;
	  }
	};

	exports.default = handleSubmit;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIn = __webpack_require__(26);

	var _getIn2 = _interopRequireDefault(_getIn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getErrorKeys = function getErrorKeys(name, type) {
	  switch (type) {
	    case 'Field':
	      return [name, name + '._error'];
	    case 'FieldArray':
	      return [name + '._error'];
	  }
	};

	var createHasError = function createHasError(_ref) {
	  var getIn = _ref.getIn;

	  var hasError = function hasError(field, syncErrors, asyncErrors, submitErrors) {
	    if (!syncErrors && !asyncErrors && !submitErrors) {
	      return false;
	    }

	    var name = getIn(field, 'name');
	    var type = getIn(field, 'type');
	    return getErrorKeys(name, type).some(function (key) {
	      return (0, _getIn2.default)(syncErrors, key) || getIn(asyncErrors, key) || getIn(submitErrors, key);
	    });
	  };
	  return hasError;
	};

	exports.default = createHasError;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var any = _react.PropTypes.any,
	    bool = _react.PropTypes.bool,
	    func = _react.PropTypes.func,
	    shape = _react.PropTypes.shape;


	var propTypes = {
	  // State:
	  asyncValidating: bool.isRequired, // true if async validation is running
	  dirty: bool.isRequired, // true if any values are different from initialValues
	  error: any, // form-wide error from '_error' key in validation result
	  warning: any, // form-wide warning from '_warning' key in validation result
	  invalid: bool.isRequired, // true if there are any validation errors
	  initialized: bool.isRequired, // true if the form has been initialized
	  pristine: bool.isRequired, // true if the values are the same as initialValues
	  submitting: bool.isRequired, // true if the form is in the process of being submitted
	  submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
	  submitSucceeded: bool.isRequired, // true if the form was successfully submitted
	  valid: bool.isRequired, // true if there are no validation errors
	  // Actions:
	  array: shape({
	    insert: func.isRequired, // function to insert a value into an array field
	    move: func.isRequired, // function to move a value within an array field
	    pop: func.isRequired, // function to pop a value off of an array field
	    push: func.isRequired, // function to push a value onto an array field
	    remove: func.isRequired, // function to remove a value from an array field
	    removeAll: func.isRequired, // function to remove all the values from an array field
	    shift: func.isRequired, // function to shift a value out of an array field
	    splice: func.isRequired, // function to splice a value into an array field
	    swap: func.isRequired, // function to swap values in an array field
	    unshift: func.isRequired // function to unshift a value into an array field
	  }),
	  asyncValidate: func.isRequired, // function to trigger async validation
	  blur: func.isRequired, // action to mark a field as blurred
	  change: func.isRequired, // action to change the value of a field
	  destroy: func.isRequired, // action to destroy the form's data in Redux
	  dispatch: func.isRequired, // the Redux dispatch action
	  handleSubmit: func.isRequired, // function to submit the form
	  initialize: func.isRequired, // action to initialize form data
	  reset: func.isRequired, // action to reset the form data to previously initialized values
	  touch: func.isRequired, // action to mark fields as touched
	  untouch: func.isRequired // action to mark fields as untouched
	};

	exports.default = propTypes;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _actionTypes = __webpack_require__(11);

	__webpack_require__(42);

	var _deleteInWithCleanUp = __webpack_require__(55);

	var _deleteInWithCleanUp2 = _interopRequireDefault(_deleteInWithCleanUp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var createReducer = function createReducer(structure) {
	  var _behaviors;

	  var deepEqual = structure.deepEqual,
	      empty = structure.empty,
	      getIn = structure.getIn,
	      setIn = structure.setIn,
	      deleteIn = structure.deleteIn,
	      fromJS = structure.fromJS,
	      size = structure.size,
	      some = structure.some,
	      splice = structure.splice;

	  var deleteInWithCleanUp = (0, _deleteInWithCleanUp2.default)(structure);
	  var doSplice = function doSplice(state, key, field, index, removeNum, value, force) {
	    var existing = getIn(state, key + '.' + field);
	    return existing || force ? setIn(state, key + '.' + field, splice(existing, index, removeNum, value)) : state;
	  };
	  var rootKeys = ['values', 'fields', 'submitErrors', 'asyncErrors'];
	  var arraySplice = function arraySplice(state, field, index, removeNum, value) {
	    var result = state;
	    var nonValuesValue = value != null ? empty : undefined;
	    result = doSplice(result, 'values', field, index, removeNum, value, true);
	    result = doSplice(result, 'fields', field, index, removeNum, nonValuesValue);
	    result = doSplice(result, 'submitErrors', field, index, removeNum, nonValuesValue);
	    result = doSplice(result, 'asyncErrors', field, index, removeNum, nonValuesValue);
	    return result;
	  };

	  var behaviors = (_behaviors = {}, _defineProperty(_behaviors, _actionTypes.ARRAY_INSERT, function (state, _ref) {
	    var _ref$meta = _ref.meta,
	        field = _ref$meta.field,
	        index = _ref$meta.index,
	        payload = _ref.payload;

	    return arraySplice(state, field, index, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_MOVE, function (state, _ref2) {
	    var _ref2$meta = _ref2.meta,
	        field = _ref2$meta.field,
	        from = _ref2$meta.from,
	        to = _ref2$meta.to;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    var result = state;
	    if (length) {
	      rootKeys.forEach(function (key) {
	        var path = key + '.' + field;
	        if (getIn(result, path)) {
	          var value = getIn(result, path + '[' + from + ']');
	          result = setIn(result, path, splice(getIn(result, path), from, 1)); // remove
	          result = setIn(result, path, splice(getIn(result, path), to, 0, value)); // insert
	        }
	      });
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_POP, function (state, _ref3) {
	    var field = _ref3.meta.field;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    return length ? arraySplice(state, field, length - 1, 1) : state;
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_PUSH, function (state, _ref4) {
	    var field = _ref4.meta.field,
	        payload = _ref4.payload;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    return arraySplice(state, field, length, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_REMOVE, function (state, _ref5) {
	    var _ref5$meta = _ref5.meta,
	        field = _ref5$meta.field,
	        index = _ref5$meta.index;

	    return arraySplice(state, field, index, 1);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_REMOVE_ALL, function (state, _ref6) {
	    var field = _ref6.meta.field;

	    var array = getIn(state, 'values.' + field);
	    var length = array ? size(array) : 0;
	    return length ? arraySplice(state, field, 0, length) : state;
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SHIFT, function (state, _ref7) {
	    var field = _ref7.meta.field;

	    return arraySplice(state, field, 0, 1);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SPLICE, function (state, _ref8) {
	    var _ref8$meta = _ref8.meta,
	        field = _ref8$meta.field,
	        index = _ref8$meta.index,
	        removeNum = _ref8$meta.removeNum,
	        payload = _ref8.payload;

	    return arraySplice(state, field, index, removeNum, payload);
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_SWAP, function (state, _ref9) {
	    var _ref9$meta = _ref9.meta,
	        field = _ref9$meta.field,
	        indexA = _ref9$meta.indexA,
	        indexB = _ref9$meta.indexB;

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
	  }), _defineProperty(_behaviors, _actionTypes.ARRAY_UNSHIFT, function (state, _ref10) {
	    var field = _ref10.meta.field,
	        payload = _ref10.payload;

	    return arraySplice(state, field, 0, 0, payload);
	  }), _defineProperty(_behaviors, _actionTypes.AUTOFILL, function (state, _ref11) {
	    var field = _ref11.meta.field,
	        payload = _ref11.payload;

	    var result = state;
	    result = deleteInWithCleanUp(result, 'asyncErrors.' + field);
	    result = deleteInWithCleanUp(result, 'submitErrors.' + field);
	    result = setIn(result, 'fields.' + field + '.autofilled', true);
	    result = setIn(result, 'values.' + field, payload);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.BLUR, function (state, _ref12) {
	    var _ref12$meta = _ref12.meta,
	        field = _ref12$meta.field,
	        touch = _ref12$meta.touch,
	        payload = _ref12.payload;

	    var result = state;
	    var initial = getIn(result, 'initial.' + field);
	    if (initial === undefined && payload === '') {
	      result = deleteInWithCleanUp(result, 'values.' + field);
	    } else if (payload !== undefined) {
	      result = setIn(result, 'values.' + field, payload);
	    }
	    if (field === getIn(result, 'active')) {
	      result = deleteIn(result, 'active');
	    }
	    result = deleteIn(result, 'fields.' + field + '.active');
	    if (touch) {
	      result = setIn(result, 'fields.' + field + '.touched', true);
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.CHANGE, function (state, _ref13) {
	    var _ref13$meta = _ref13.meta,
	        field = _ref13$meta.field,
	        touch = _ref13$meta.touch,
	        persistentSubmitErrors = _ref13$meta.persistentSubmitErrors,
	        payload = _ref13.payload;

	    var result = state;
	    var initial = getIn(result, 'initial.' + field);
	    if (initial === undefined && payload === '') {
	      result = deleteInWithCleanUp(result, 'values.' + field);
	    } else if (payload !== undefined) {
	      result = setIn(result, 'values.' + field, payload);
	    }
	    result = deleteInWithCleanUp(result, 'asyncErrors.' + field);
	    if (!persistentSubmitErrors) {
	      result = deleteInWithCleanUp(result, 'submitErrors.' + field);
	    }
	    result = deleteInWithCleanUp(result, 'fields.' + field + '.autofilled');
	    if (touch) {
	      result = setIn(result, 'fields.' + field + '.touched', true);
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.CLEAR_SUBMIT, function (state) {
	    return deleteIn(state, 'triggerSubmit');
	  }), _defineProperty(_behaviors, _actionTypes.CLEAR_ASYNC_ERROR, function (state, _ref14) {
	    var field = _ref14.meta.field;

	    return deleteIn(state, 'asyncErrors.' + field);
	  }), _defineProperty(_behaviors, _actionTypes.FOCUS, function (state, _ref15) {
	    var field = _ref15.meta.field;

	    var result = state;
	    var previouslyActive = getIn(state, 'active');
	    result = deleteIn(result, 'fields.' + previouslyActive + '.active');
	    result = setIn(result, 'fields.' + field + '.visited', true);
	    result = setIn(result, 'fields.' + field + '.active', true);
	    result = setIn(result, 'active', field);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.INITIALIZE, function (state, _ref16) {
	    var payload = _ref16.payload,
	        keepDirty = _ref16.meta.keepDirty;

	    var mapData = fromJS(payload);
	    var result = empty; // clean all field state

	    // persist old warnings, they will get recalculated if the new form values are different from the old values
	    var warning = getIn(state, 'warning');
	    if (warning) {
	      result = setIn(result, 'warning', warning);
	    }
	    var syncWarnings = getIn(state, 'syncWarnings');
	    if (syncWarnings) {
	      result = setIn(result, 'syncWarnings', syncWarnings);
	    }

	    // persist old errors, they will get recalculated if the new form values are different from the old values
	    var error = getIn(state, 'error');
	    if (error) {
	      result = setIn(result, 'error', error);
	    }
	    var syncErrors = getIn(state, 'syncErrors');
	    if (syncErrors) {
	      result = setIn(result, 'syncErrors', syncErrors);
	    }

	    var registeredFields = getIn(state, 'registeredFields');
	    if (registeredFields) {
	      result = setIn(result, 'registeredFields', registeredFields);
	    }
	    var newValues = mapData;
	    if (keepDirty && registeredFields) {
	      (function () {
	        //
	        // Keep the value of dirty fields while updating the value of
	        // pristine fields. This way, apps can reinitialize forms while
	        // avoiding stomping on user edits.
	        //
	        // Note 1: The initialize action replaces all initial values
	        // regardless of keepDirty.
	        //
	        // Note 2: When a field is dirty, keepDirty is enabled, and the field
	        // value is the same as the new initial value for the field, the
	        // initialize action causes the field to become pristine. That effect
	        // is what we want.
	        //
	        var previousValues = getIn(state, 'values');
	        var previousInitialValues = getIn(state, 'initial');
	        registeredFields.forEach(function (field) {
	          var name = getIn(field, 'name');
	          var previousInitialValue = getIn(previousInitialValues, name);
	          var previousValue = getIn(previousValues, name);
	          if (!deepEqual(previousValue, previousInitialValue)) {
	            // This field was dirty. Restore the dirty value.
	            newValues = setIn(newValues, name, previousValue);
	          }
	        });
	      })();
	    }
	    result = setIn(result, 'values', newValues);
	    result = setIn(result, 'initial', mapData);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.REGISTER_FIELD, function (state, _ref17) {
	    var _ref17$payload = _ref17.payload,
	        name = _ref17$payload.name,
	        type = _ref17$payload.type;

	    var result = state;
	    var registeredFields = getIn(result, 'registeredFields');
	    if (some(registeredFields, function (field) {
	      return getIn(field, 'name') === name;
	    })) {
	      return state;
	    }

	    var mapData = fromJS({ name: name, type: type });
	    result = setIn(state, 'registeredFields', splice(registeredFields, size(registeredFields), 0, mapData));
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.RESET, function (state) {
	    var result = empty;
	    var registeredFields = getIn(state, 'registeredFields');
	    if (registeredFields) {
	      result = setIn(result, 'registeredFields', registeredFields);
	    }
	    var values = getIn(state, 'initial');
	    if (values) {
	      result = setIn(result, 'values', values);
	      result = setIn(result, 'initial', values);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.SUBMIT, function (state) {
	    return setIn(state, 'triggerSubmit', true);
	  }), _defineProperty(_behaviors, _actionTypes.START_ASYNC_VALIDATION, function (state, _ref18) {
	    var field = _ref18.meta.field;

	    return setIn(state, 'asyncValidating', field || true);
	  }), _defineProperty(_behaviors, _actionTypes.START_SUBMIT, function (state) {
	    return setIn(state, 'submitting', true);
	  }), _defineProperty(_behaviors, _actionTypes.STOP_ASYNC_VALIDATION, function (state, _ref19) {
	    var payload = _ref19.payload;

	    var result = state;
	    result = deleteIn(result, 'asyncValidating');
	    if (payload && Object.keys(payload).length) {
	      var _error = payload._error,
	          fieldErrors = _objectWithoutProperties(payload, ['_error']);

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
	  }), _defineProperty(_behaviors, _actionTypes.STOP_SUBMIT, function (state, _ref20) {
	    var payload = _ref20.payload;

	    var result = state;
	    result = deleteIn(result, 'submitting');
	    result = deleteIn(result, 'submitFailed');
	    result = deleteIn(result, 'submitSucceeded');
	    if (payload && Object.keys(payload).length) {
	      var _error = payload._error,
	          fieldErrors = _objectWithoutProperties(payload, ['_error']);

	      if (_error) {
	        result = setIn(result, 'error', _error);
	      } else {
	        result = deleteIn(result, 'error');
	      }
	      if (Object.keys(fieldErrors).length) {
	        result = setIn(result, 'submitErrors', fromJS(fieldErrors));
	      } else {
	        result = deleteIn(result, 'submitErrors');
	      }
	      result = setIn(result, 'submitFailed', true);
	    } else {
	      result = setIn(result, 'submitSucceeded', true);
	      result = deleteIn(result, 'error');
	      result = deleteIn(result, 'submitErrors');
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.SET_SUBMIT_FAILED, function (state, _ref21) {
	    var fields = _ref21.meta.fields;

	    var result = state;
	    result = setIn(result, 'submitFailed', true);
	    result = deleteIn(result, 'submitSucceeded');
	    result = deleteIn(result, 'submitting');
	    fields.forEach(function (field) {
	      return result = setIn(result, 'fields.' + field + '.touched', true);
	    });
	    if (fields.length) {
	      result = setIn(result, 'anyTouched', true);
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.SET_SUBMIT_SUCCEEDED, function (state) {
	    var result = state;
	    result = deleteIn(result, 'submitFailed');
	    result = setIn(result, 'submitSucceeded', true);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.TOUCH, function (state, _ref22) {
	    var fields = _ref22.meta.fields;

	    var result = state;
	    fields.forEach(function (field) {
	      return result = setIn(result, 'fields.' + field + '.touched', true);
	    });
	    result = setIn(result, 'anyTouched', true);
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.UNREGISTER_FIELD, function (state, _ref23) {
	    var name = _ref23.payload.name;

	    var registeredFields = getIn(state, 'registeredFields');

	    // in case the form was destroyed and registeredFields no longer exists
	    if (!registeredFields) {
	      return state;
	    }

	    var fieldIndex = registeredFields.findIndex(function (value) {
	      return getIn(value, 'name') === name;
	    });
	    if (size(registeredFields) <= 1 && fieldIndex >= 0) {
	      return deleteInWithCleanUp(state, 'registeredFields');
	    }
	    if (fieldIndex < 0) {
	      return state;
	    }
	    return setIn(state, 'registeredFields', splice(registeredFields, fieldIndex, 1));
	  }), _defineProperty(_behaviors, _actionTypes.UNTOUCH, function (state, _ref24) {
	    var fields = _ref24.meta.fields;

	    var result = state;
	    fields.forEach(function (field) {
	      return result = deleteIn(result, 'fields.' + field + '.touched');
	    });
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.UPDATE_SYNC_ERRORS, function (state, _ref25) {
	    var _ref25$payload = _ref25.payload,
	        syncErrors = _ref25$payload.syncErrors,
	        error = _ref25$payload.error;

	    var result = state;
	    if (error) {
	      result = setIn(result, 'error', error);
	      result = setIn(result, 'syncError', true);
	    } else {
	      result = deleteIn(result, 'error');
	      result = deleteIn(result, 'syncError');
	    }
	    if (Object.keys(syncErrors).length) {
	      result = setIn(result, 'syncErrors', syncErrors);
	    } else {
	      result = deleteIn(result, 'syncErrors');
	    }
	    return result;
	  }), _defineProperty(_behaviors, _actionTypes.UPDATE_SYNC_WARNINGS, function (state, _ref26) {
	    var _ref26$payload = _ref26.payload,
	        syncWarnings = _ref26$payload.syncWarnings,
	        warning = _ref26$payload.warning;

	    var result = state;
	    if (warning) {
	      result = setIn(result, 'warning', warning);
	    } else {
	      result = deleteIn(result, 'warning');
	    }
	    if (Object.keys(syncWarnings).length) {
	      result = setIn(result, 'syncWarnings', syncWarnings);
	    } else {
	      result = deleteIn(result, 'syncWarnings');
	    }
	    return result;
	  }), _behaviors);

	  var reducer = function reducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : empty;
	    var action = arguments[1];

	    var behavior = behaviors[action.type];
	    return behavior ? behavior(state, action) : state;
	  };

	  var byForm = function byForm(reducer) {
	    return function () {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : empty;
	      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var form = action && action.meta && action.meta.form;
	      if (!form) {
	        return state;
	      }
	      if (action.type === _actionTypes.DESTROY) {
	        return deleteInWithCleanUp(state, action.meta.form);
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
	    target.plugin = function plugin(reducers) {
	      var _this = this;

	      // use 'function' keyword to enable 'this'
	      return decorate(function () {
	        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : empty;
	        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        return Object.keys(reducers).reduce(function (accumulator, key) {
	          var previousState = getIn(accumulator, key);
	          var nextState = reducers[key](previousState, action, getIn(state, key));
	          return nextState === previousState ? accumulator : setIn(accumulator, key, nextState);
	        }, _this(state, action));
	      });
	    };

	    return target;
	  }

	  return decorate(byForm(reducer));
	};

	exports.default = createReducer;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _merge4 = __webpack_require__(135);

	var _merge5 = _interopRequireDefault(_merge4);

	var _mapValues2 = __webpack_require__(40);

	var _mapValues3 = _interopRequireDefault(_mapValues2);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(1);

	var _hoistNonReactStatics = __webpack_require__(80);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _reactRedux = __webpack_require__(4);

	var _redux = __webpack_require__(41);

	var _isPromise = __webpack_require__(14);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _getDisplayName = __webpack_require__(77);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _actions = __webpack_require__(18);

	var importedActions = _interopRequireWildcard(_actions);

	var _handleSubmit = __webpack_require__(63);

	var _handleSubmit2 = _interopRequireDefault(_handleSubmit);

	var _silenceEvent = __webpack_require__(23);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	var _silenceEvents = __webpack_require__(60);

	var _silenceEvents2 = _interopRequireDefault(_silenceEvents);

	var _asyncValidation = __webpack_require__(50);

	var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

	var _defaultShouldAsyncValidate = __webpack_require__(53);

	var _defaultShouldAsyncValidate2 = _interopRequireDefault(_defaultShouldAsyncValidate);

	var _defaultShouldValidate = __webpack_require__(54);

	var _defaultShouldValidate2 = _interopRequireDefault(_defaultShouldValidate);

	var _plain = __webpack_require__(2);

	var _plain2 = _interopRequireDefault(_plain);

	var _generateValidator2 = __webpack_require__(62);

	var _generateValidator3 = _interopRequireDefault(_generateValidator2);

	var _isValid = __webpack_require__(12);

	var _isValid2 = _interopRequireDefault(_isValid);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var isClassComponent = function isClassComponent(Component) {
	  return Boolean(Component && Component.prototype && _typeof(Component.prototype.isReactComponent) === 'object');
	};

	// extract field-specific actions

	var arrayInsert = importedActions.arrayInsert,
	    arrayMove = importedActions.arrayMove,
	    arrayPop = importedActions.arrayPop,
	    arrayPush = importedActions.arrayPush,
	    arrayRemove = importedActions.arrayRemove,
	    arrayRemoveAll = importedActions.arrayRemoveAll,
	    arrayShift = importedActions.arrayShift,
	    arraySplice = importedActions.arraySplice,
	    arraySwap = importedActions.arraySwap,
	    arrayUnshift = importedActions.arrayUnshift,
	    blur = importedActions.blur,
	    change = importedActions.change,
	    focus = importedActions.focus,
	    formActions = _objectWithoutProperties(importedActions, ['arrayInsert', 'arrayMove', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayRemoveAll', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'blur', 'change', 'focus']);

	var arrayActions = {
	  arrayInsert: arrayInsert,
	  arrayMove: arrayMove,
	  arrayPop: arrayPop,
	  arrayPush: arrayPush,
	  arrayRemove: arrayRemove,
	  arrayRemoveAll: arrayRemoveAll,
	  arrayShift: arrayShift,
	  arraySplice: arraySplice,
	  arraySwap: arraySwap,
	  arrayUnshift: arrayUnshift
	};

	var propsToNotUpdateFor = [].concat(_toConsumableArray(Object.keys(importedActions)), ['array', 'asyncErrors', 'initialized', 'initialValues', 'syncErrors', 'syncWarnings', 'values', 'registeredFields']);

	var checkSubmit = function checkSubmit(submit) {
	  if (!submit || typeof submit !== 'function') {
	    throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	  }
	  return submit;
	};

	/**
	 * The decorator that is the main API to redux-form
	 */
	var createReduxForm = function createReduxForm(structure) {
	  var deepEqual = structure.deepEqual,
	      empty = structure.empty,
	      getIn = structure.getIn,
	      setIn = structure.setIn,
	      fromJS = structure.fromJS;

	  var isValid = (0, _isValid2.default)(structure);
	  return function (initialConfig) {
	    var config = _extends({
	      touchOnBlur: true,
	      touchOnChange: false,
	      persistentSubmitErrors: false,
	      destroyOnUnmount: true,
	      shouldAsyncValidate: _defaultShouldAsyncValidate2.default,
	      shouldValidate: _defaultShouldValidate2.default,
	      enableReinitialize: false,
	      keepDirtyOnReinitialize: false,
	      getFormState: function getFormState(state) {
	        return getIn(state, 'form');
	      },
	      pure: true
	    }, initialConfig);

	    return function (WrappedComponent) {
	      var instances = 0;

	      var Form = function (_Component) {
	        _inherits(Form, _Component);

	        function Form(props) {
	          _classCallCheck(this, Form);

	          var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

	          _this.submit = _this.submit.bind(_this);
	          _this.reset = _this.reset.bind(_this);
	          _this.asyncValidate = _this.asyncValidate.bind(_this);
	          _this.getValues = _this.getValues.bind(_this);
	          _this.register = _this.register.bind(_this);
	          _this.unregister = _this.unregister.bind(_this);
	          _this.submitCompleted = _this.submitCompleted.bind(_this);
	          _this.submitFailed = _this.submitFailed.bind(_this);
	          _this.fieldValidators = {};
	          _this.lastFieldValidatorKeys = [];
	          _this.fieldWarners = {};
	          _this.lastFieldWarnerKeys = [];

	          instances++;
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
	                getValues: this.getValues,
	                sectionPrefix: undefined,
	                register: this.register,
	                unregister: this.unregister
	              })
	            };
	          }
	        }, {
	          key: 'initIfNeeded',
	          value: function initIfNeeded(nextProps) {
	            var enableReinitialize = this.props.enableReinitialize;

	            if (nextProps) {
	              if ((enableReinitialize || !nextProps.initialized) && !deepEqual(this.props.initialValues, nextProps.initialValues)) {
	                var keepDirty = nextProps.initialized && this.props.keepDirtyOnReinitialize;
	                this.props.initialize(nextProps.initialValues, keepDirty);
	              }
	            } else if (this.props.initialValues && (!this.props.initialized || enableReinitialize)) {
	              this.props.initialize(this.props.initialValues, this.props.keepDirtyOnReinitialize);
	            }
	          }
	        }, {
	          key: 'updateSyncErrorsIfNeeded',
	          value: function updateSyncErrorsIfNeeded(nextSyncErrors, nextError) {
	            var _props = this.props,
	                error = _props.error,
	                syncErrors = _props.syncErrors,
	                updateSyncErrors = _props.updateSyncErrors;

	            var noErrors = (!syncErrors || !Object.keys(syncErrors).length) && !error;
	            var nextNoErrors = (!nextSyncErrors || !Object.keys(nextSyncErrors).length) && !nextError;
	            if (!(noErrors && nextNoErrors) && (!_plain2.default.deepEqual(syncErrors, nextSyncErrors) || !_plain2.default.deepEqual(error, nextError))) {
	              updateSyncErrors(nextSyncErrors, nextError);
	            }
	          }
	        }, {
	          key: 'submitIfNeeded',
	          value: function submitIfNeeded(nextProps) {
	            var _props2 = this.props,
	                clearSubmit = _props2.clearSubmit,
	                triggerSubmit = _props2.triggerSubmit;

	            if (!triggerSubmit && nextProps.triggerSubmit) {
	              clearSubmit();
	              this.submit();
	            }
	          }
	        }, {
	          key: 'validateIfNeeded',
	          value: function validateIfNeeded(nextProps) {
	            var _props3 = this.props,
	                shouldValidate = _props3.shouldValidate,
	                validate = _props3.validate,
	                values = _props3.values;

	            var fieldLevelValidate = this.generateValidator();
	            if (validate || fieldLevelValidate) {
	              var initialRender = nextProps === undefined;
	              var fieldValidatorKeys = Object.keys(this.fieldValidators);
	              var shouldValidateResult = shouldValidate({
	                values: values,
	                nextProps: nextProps,
	                props: this.props,
	                initialRender: initialRender,
	                lastFieldValidatorKeys: this.lastFieldValidatorKeys,
	                fieldValidatorKeys: fieldValidatorKeys,
	                structure: structure
	              });

	              if (shouldValidateResult) {
	                var propsToValidate = initialRender ? this.props : nextProps;

	                var _merge2 = (0, _merge5.default)(validate ? validate(propsToValidate.values, propsToValidate) : {}, fieldLevelValidate ? fieldLevelValidate(propsToValidate.values, propsToValidate) : {}),
	                    _error = _merge2._error,
	                    nextSyncErrors = _objectWithoutProperties(_merge2, ['_error']);

	                this.lastFieldValidatorKeys = fieldValidatorKeys;
	                this.updateSyncErrorsIfNeeded(nextSyncErrors, _error);
	              }
	            }
	          }
	        }, {
	          key: 'updateSyncWarningsIfNeeded',
	          value: function updateSyncWarningsIfNeeded(nextSyncWarnings, nextWarning) {
	            var _props4 = this.props,
	                warning = _props4.warning,
	                syncWarnings = _props4.syncWarnings,
	                updateSyncWarnings = _props4.updateSyncWarnings;

	            var noWarnings = (!syncWarnings || !Object.keys(syncWarnings).length) && !warning;
	            var nextNoWarnings = (!nextSyncWarnings || !Object.keys(nextSyncWarnings).length) && !nextWarning;
	            if (!(noWarnings && nextNoWarnings) && (!_plain2.default.deepEqual(syncWarnings, nextSyncWarnings) || !_plain2.default.deepEqual(warning, nextWarning))) {
	              updateSyncWarnings(nextSyncWarnings, nextWarning);
	            }
	          }
	        }, {
	          key: 'warnIfNeeded',
	          value: function warnIfNeeded(nextProps) {
	            var _props5 = this.props,
	                shouldValidate = _props5.shouldValidate,
	                warn = _props5.warn,
	                values = _props5.values;

	            var fieldLevelWarn = this.generateWarner();
	            if (warn || fieldLevelWarn) {
	              var initialRender = nextProps === undefined;
	              var fieldWarnerKeys = Object.keys(this.fieldWarners);
	              var shouldWarnResult = shouldValidate({
	                values: values,
	                nextProps: nextProps,
	                props: this.props,
	                initialRender: initialRender,
	                lastFieldValidatorKeys: this.lastFieldWarnerKeys,
	                fieldValidatorKeys: fieldWarnerKeys,
	                structure: structure
	              });

	              if (shouldWarnResult) {
	                var propsToWarn = initialRender ? this.props : nextProps;

	                var _merge3 = (0, _merge5.default)(warn ? warn(propsToWarn.values, propsToWarn) : {}, fieldLevelWarn ? fieldLevelWarn(propsToWarn.values, propsToWarn) : {}),
	                    _warning = _merge3._warning,
	                    nextSyncWarnings = _objectWithoutProperties(_merge3, ['_warning']);

	                this.lastFieldWarnerKeys = fieldWarnerKeys;
	                this.updateSyncWarningsIfNeeded(nextSyncWarnings, _warning);
	              }
	            }
	          }
	        }, {
	          key: 'componentWillMount',
	          value: function componentWillMount() {
	            this.initIfNeeded();
	            this.validateIfNeeded();
	            this.warnIfNeeded();
	          }
	        }, {
	          key: 'componentWillReceiveProps',
	          value: function componentWillReceiveProps(nextProps) {
	            this.initIfNeeded(nextProps);
	            this.validateIfNeeded(nextProps);
	            this.warnIfNeeded(nextProps);
	            this.submitIfNeeded(nextProps);
	          }
	        }, {
	          key: 'shouldComponentUpdate',
	          value: function shouldComponentUpdate(nextProps) {
	            var _this3 = this;

	            if (!config.pure) return true;
	            return Object.keys(nextProps).some(function (prop) {
	              // useful to debug rerenders
	              // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {
	              //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])
	              // }
	              return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this3.props[prop], nextProps[prop]);
	            });
	          }
	        }, {
	          key: 'componentWillUnmount',
	          value: function componentWillUnmount() {
	            var _props6 = this.props,
	                destroyOnUnmount = _props6.destroyOnUnmount,
	                destroy = _props6.destroy;

	            if (destroyOnUnmount) {
	              this.destroyed = true;
	              destroy();
	            }

	            this.unmounted = true;

	            instances--;
	          }
	        }, {
	          key: 'getValues',
	          value: function getValues() {
	            return this.props.values;
	          }
	        }, {
	          key: 'isValid',
	          value: function isValid() {
	            return this.props.valid;
	          }
	        }, {
	          key: 'isPristine',
	          value: function isPristine() {
	            return this.props.pristine;
	          }
	        }, {
	          key: 'register',
	          value: function register(name, type, getValidator, getWarner) {
	            this.props.registerField(name, type);
	            if (getValidator) {
	              this.fieldValidators[name] = getValidator;
	            }
	            if (getWarner) {
	              this.fieldWarners[name] = getWarner;
	            }
	          }
	        }, {
	          key: 'unregister',
	          value: function unregister(name) {
	            if (this.props.destroyOnUnmount && !this.destroyed && (!this.unmounted || !instances)) {
	              this.props.unregisterField(name);
	              delete this.fieldValidators[name];
	              delete this.fieldWarners[name];
	            }
	          }
	        }, {
	          key: 'getFieldList',
	          value: function getFieldList() {
	            return this.props.registeredFields.map(function (field) {
	              return getIn(field, 'name');
	            });
	          }
	        }, {
	          key: 'generateValidator',
	          value: function generateValidator() {
	            var _this4 = this;

	            var validators = {};
	            Object.keys(this.fieldValidators).forEach(function (name) {
	              var validator = _this4.fieldValidators[name]();
	              if (validator) {
	                validators[name] = validator;
	              }
	            });
	            return Object.keys(validators).length ? (0, _generateValidator3.default)(validators, structure) : undefined;
	          }
	        }, {
	          key: 'generateWarner',
	          value: function generateWarner() {
	            var _this5 = this;

	            var warners = {};
	            Object.keys(this.fieldWarners).forEach(function (name) {
	              var warner = _this5.fieldWarners[name]();
	              if (warner) {
	                warners[name] = warner;
	              }
	            });
	            return Object.keys(warners).length ? (0, _generateValidator3.default)(warners, structure) : undefined;
	          }
	        }, {
	          key: 'asyncValidate',
	          value: function asyncValidate(name, value) {
	            var _this6 = this;

	            var _props7 = this.props,
	                asyncBlurFields = _props7.asyncBlurFields,
	                asyncErrors = _props7.asyncErrors,
	                asyncValidate = _props7.asyncValidate,
	                dispatch = _props7.dispatch,
	                initialized = _props7.initialized,
	                pristine = _props7.pristine,
	                shouldAsyncValidate = _props7.shouldAsyncValidate,
	                startAsyncValidation = _props7.startAsyncValidation,
	                stopAsyncValidation = _props7.stopAsyncValidation,
	                syncErrors = _props7.syncErrors,
	                values = _props7.values;

	            var submitting = !name;
	            if (asyncValidate) {
	              var _ret = function () {
	                var valuesToValidate = submitting ? values : setIn(values, name, value);
	                var syncValidationPasses = submitting || !getIn(syncErrors, name);
	                var isBlurredField = !submitting && (!asyncBlurFields || ~asyncBlurFields.indexOf(name.replace(/\[[0-9]+\]/g, '[]')));
	                if ((isBlurredField || submitting) && shouldAsyncValidate({
	                  asyncErrors: asyncErrors,
	                  initialized: initialized,
	                  trigger: submitting ? 'submit' : 'blur',
	                  blurredField: name,
	                  pristine: pristine,
	                  syncValidationPasses: syncValidationPasses
	                })) {
	                  return {
	                    v: (0, _asyncValidation2.default)(function () {
	                      return asyncValidate(valuesToValidate, dispatch, _this6.props, name);
	                    }, startAsyncValidation, stopAsyncValidation, name)
	                  };
	                }
	              }();

	              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	          }
	        }, {
	          key: 'submitCompleted',
	          value: function submitCompleted(result) {
	            delete this.submitPromise;
	            return result;
	          }
	        }, {
	          key: 'submitFailed',
	          value: function submitFailed(error) {
	            delete this.submitPromise;
	            throw error;
	          }
	        }, {
	          key: 'listenToSubmit',
	          value: function listenToSubmit(promise) {
	            if (!(0, _isPromise2.default)(promise)) {
	              return promise;
	            }
	            this.submitPromise = promise;
	            return promise.then(this.submitCompleted, this.submitFailed);
	          }
	        }, {
	          key: 'submit',
	          value: function submit(submitOrEvent) {
	            var _this7 = this;

	            var onSubmit = this.props.onSubmit;


	            if (!submitOrEvent || (0, _silenceEvent2.default)(submitOrEvent)) {
	              // submitOrEvent is an event: fire submit if not already submitting
	              if (!this.submitPromise) {
	                return this.listenToSubmit((0, _handleSubmit2.default)(checkSubmit(onSubmit), this.props, this.props.validExceptSubmit, this.asyncValidate, this.getFieldList()));
	              }
	            } else {
	              // submitOrEvent is the submit function: return deferred submit thunk
	              return (0, _silenceEvents2.default)(function () {
	                return !_this7.submitPromise && _this7.listenToSubmit((0, _handleSubmit2.default)(checkSubmit(submitOrEvent), _this7.props, _this7.props.validExceptSubmit, _this7.asyncValidate, _this7.getFieldList()));
	              });
	            }
	          }
	        }, {
	          key: 'reset',
	          value: function reset() {
	            this.props.reset();
	          }
	        }, {
	          key: 'render',
	          value: function render() {
	            // remove some redux-form config-only props
	            /* eslint-disable no-unused-vars */
	            var _props8 = this.props,
	                anyTouched = _props8.anyTouched,
	                arrayInsert = _props8.arrayInsert,
	                arrayMove = _props8.arrayMove,
	                arrayPop = _props8.arrayPop,
	                arrayPush = _props8.arrayPush,
	                arrayRemove = _props8.arrayRemove,
	                arrayRemoveAll = _props8.arrayRemoveAll,
	                arrayShift = _props8.arrayShift,
	                arraySplice = _props8.arraySplice,
	                arraySwap = _props8.arraySwap,
	                arrayUnshift = _props8.arrayUnshift,
	                asyncErrors = _props8.asyncErrors,
	                asyncValidate = _props8.asyncValidate,
	                asyncValidating = _props8.asyncValidating,
	                blur = _props8.blur,
	                change = _props8.change,
	                destroy = _props8.destroy,
	                destroyOnUnmount = _props8.destroyOnUnmount,
	                dirty = _props8.dirty,
	                dispatch = _props8.dispatch,
	                enableReinitialize = _props8.enableReinitialize,
	                error = _props8.error,
	                focus = _props8.focus,
	                form = _props8.form,
	                getFormState = _props8.getFormState,
	                initialize = _props8.initialize,
	                initialized = _props8.initialized,
	                initialValues = _props8.initialValues,
	                invalid = _props8.invalid,
	                keepDirtyOnReinitialize = _props8.keepDirtyOnReinitialize,
	                pristine = _props8.pristine,
	                propNamespace = _props8.propNamespace,
	                registeredFields = _props8.registeredFields,
	                registerField = _props8.registerField,
	                reset = _props8.reset,
	                setSubmitFailed = _props8.setSubmitFailed,
	                setSubmitSucceeded = _props8.setSubmitSucceeded,
	                shouldAsyncValidate = _props8.shouldAsyncValidate,
	                shouldValidate = _props8.shouldValidate,
	                startAsyncValidation = _props8.startAsyncValidation,
	                startSubmit = _props8.startSubmit,
	                stopAsyncValidation = _props8.stopAsyncValidation,
	                stopSubmit = _props8.stopSubmit,
	                submitting = _props8.submitting,
	                submitFailed = _props8.submitFailed,
	                submitSucceeded = _props8.submitSucceeded,
	                touch = _props8.touch,
	                touchOnBlur = _props8.touchOnBlur,
	                touchOnChange = _props8.touchOnChange,
	                persistentSubmitErrors = _props8.persistentSubmitErrors,
	                syncErrors = _props8.syncErrors,
	                syncWarnings = _props8.syncWarnings,
	                unregisterField = _props8.unregisterField,
	                untouch = _props8.untouch,
	                updateSyncErrors = _props8.updateSyncErrors,
	                updateSyncWarnings = _props8.updateSyncWarnings,
	                valid = _props8.valid,
	                validExceptSubmit = _props8.validExceptSubmit,
	                values = _props8.values,
	                warning = _props8.warning,
	                rest = _objectWithoutProperties(_props8, ['anyTouched', 'arrayInsert', 'arrayMove', 'arrayPop', 'arrayPush', 'arrayRemove', 'arrayRemoveAll', 'arrayShift', 'arraySplice', 'arraySwap', 'arrayUnshift', 'asyncErrors', 'asyncValidate', 'asyncValidating', 'blur', 'change', 'destroy', 'destroyOnUnmount', 'dirty', 'dispatch', 'enableReinitialize', 'error', 'focus', 'form', 'getFormState', 'initialize', 'initialized', 'initialValues', 'invalid', 'keepDirtyOnReinitialize', 'pristine', 'propNamespace', 'registeredFields', 'registerField', 'reset', 'setSubmitFailed', 'setSubmitSucceeded', 'shouldAsyncValidate', 'shouldValidate', 'startAsyncValidation', 'startSubmit', 'stopAsyncValidation', 'stopSubmit', 'submitting', 'submitFailed', 'submitSucceeded', 'touch', 'touchOnBlur', 'touchOnChange', 'persistentSubmitErrors', 'syncErrors', 'syncWarnings', 'unregisterField', 'untouch', 'updateSyncErrors', 'updateSyncWarnings', 'valid', 'validExceptSubmit', 'values', 'warning']);
	            /* eslint-enable no-unused-vars */


	            var reduxFormProps = _extends({
	              anyTouched: anyTouched,
	              asyncValidate: this.asyncValidate,
	              asyncValidating: asyncValidating
	            }, (0, _redux.bindActionCreators)({ blur: blur, change: change }, dispatch), {
	              destroy: destroy,
	              dirty: dirty,
	              dispatch: dispatch,
	              error: error,
	              form: form,
	              handleSubmit: this.submit,
	              initialize: initialize,
	              initialized: initialized,
	              initialValues: initialValues,
	              invalid: invalid,
	              pristine: pristine,
	              reset: reset,
	              submitting: submitting,
	              submitFailed: submitFailed,
	              submitSucceeded: submitSucceeded,
	              touch: touch,
	              untouch: untouch,
	              valid: valid,
	              warning: warning
	            });
	            var propsToPass = _extends({}, propNamespace ? _defineProperty({}, propNamespace, reduxFormProps) : reduxFormProps, rest);
	            if (isClassComponent(WrappedComponent)) {
	              propsToPass.ref = 'wrapped';
	            }
	            return (0, _react.createElement)(WrappedComponent, propsToPass);
	          }
	        }]);

	        return Form;
	      }(_react.Component);

	      Form.displayName = 'Form(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
	      Form.WrappedComponent = WrappedComponent;
	      Form.childContextTypes = {
	        _reduxForm: _react.PropTypes.object.isRequired
	      };
	      Form.propTypes = {
	        destroyOnUnmount: _react.PropTypes.bool,
	        form: _react.PropTypes.string.isRequired,
	        initialValues: _react.PropTypes.object,
	        getFormState: _react.PropTypes.func,
	        onSubmitFail: _react.PropTypes.func,
	        onSubmitSuccess: _react.PropTypes.func,
	        propNameSpace: _react.PropTypes.string,
	        validate: _react.PropTypes.func,
	        warn: _react.PropTypes.func,
	        touchOnBlur: _react.PropTypes.bool,
	        touchOnChange: _react.PropTypes.bool,
	        triggerSubmit: _react.PropTypes.bool,
	        persistentSubmitErrors: _react.PropTypes.bool,
	        registeredFields: _react.PropTypes.any
	      };

	      var connector = (0, _reactRedux.connect)(function (state, props) {
	        var form = props.form,
	            getFormState = props.getFormState,
	            initialValues = props.initialValues,
	            enableReinitialize = props.enableReinitialize,
	            keepDirtyOnReinitialize = props.keepDirtyOnReinitialize;

	        var formState = getIn(getFormState(state) || empty, form) || empty;
	        var stateInitial = getIn(formState, 'initial');

	        var shouldUpdateInitialValues = enableReinitialize && !deepEqual(initialValues, stateInitial);
	        var shouldResetValues = shouldUpdateInitialValues && !keepDirtyOnReinitialize;

	        var initial = initialValues || stateInitial || empty;

	        if (shouldUpdateInitialValues) {
	          initial = stateInitial || empty;
	        }

	        var values = getIn(formState, 'values') || initial;

	        if (shouldResetValues) {
	          values = initial;
	        }

	        var pristine = deepEqual(initial, values);
	        var asyncErrors = getIn(formState, 'asyncErrors');
	        var syncErrors = getIn(formState, 'syncErrors') || {};
	        var syncWarnings = getIn(formState, 'syncWarnings') || {};
	        var registeredFields = getIn(formState, 'registeredFields') || [];
	        var valid = isValid(form, getFormState, false)(state);
	        var validExceptSubmit = isValid(form, getFormState, true)(state);
	        var anyTouched = !!getIn(formState, 'anyTouched');
	        var submitting = !!getIn(formState, 'submitting');
	        var submitFailed = !!getIn(formState, 'submitFailed');
	        var submitSucceeded = !!getIn(formState, 'submitSucceeded');
	        var error = getIn(formState, 'error');
	        var warning = getIn(formState, 'warning');
	        var triggerSubmit = getIn(formState, 'triggerSubmit');
	        return {
	          anyTouched: anyTouched,
	          asyncErrors: asyncErrors,
	          asyncValidating: getIn(formState, 'asyncValidating') || false,
	          dirty: !pristine,
	          error: error,
	          initialized: !!stateInitial,
	          invalid: !valid,
	          pristine: pristine,
	          registeredFields: registeredFields,
	          submitting: submitting,
	          submitFailed: submitFailed,
	          submitSucceeded: submitSucceeded,
	          syncErrors: syncErrors,
	          syncWarnings: syncWarnings,
	          triggerSubmit: triggerSubmit,
	          values: values,
	          valid: valid,
	          validExceptSubmit: validExceptSubmit,
	          warning: warning
	        };
	      }, function (dispatch, initialProps) {
	        var bindForm = function bindForm(actionCreator) {
	          return actionCreator.bind(null, initialProps.form);
	        };

	        // Bind the first parameter on `props.form`
	        var boundFormACs = (0, _mapValues3.default)(formActions, bindForm);
	        var boundArrayACs = (0, _mapValues3.default)(arrayActions, bindForm);
	        var boundBlur = function boundBlur(field, value) {
	          return blur(initialProps.form, field, value, !!initialProps.touchOnBlur);
	        };
	        var boundChange = function boundChange(field, value) {
	          return change(initialProps.form, field, value, !!initialProps.touchOnChange, !!initialProps.persistentSubmitErrors);
	        };
	        var boundFocus = bindForm(focus);

	        // Wrap action creators with `dispatch`
	        var connectedFormACs = (0, _redux.bindActionCreators)(boundFormACs, dispatch);
	        var connectedArrayACs = {
	          insert: (0, _redux.bindActionCreators)(boundArrayACs.arrayInsert, dispatch),
	          move: (0, _redux.bindActionCreators)(boundArrayACs.arrayMove, dispatch),
	          pop: (0, _redux.bindActionCreators)(boundArrayACs.arrayPop, dispatch),
	          push: (0, _redux.bindActionCreators)(boundArrayACs.arrayPush, dispatch),
	          remove: (0, _redux.bindActionCreators)(boundArrayACs.arrayRemove, dispatch),
	          removeAll: (0, _redux.bindActionCreators)(boundArrayACs.arrayRemoveAll, dispatch),
	          shift: (0, _redux.bindActionCreators)(boundArrayACs.arrayShift, dispatch),
	          splice: (0, _redux.bindActionCreators)(boundArrayACs.arraySplice, dispatch),
	          swap: (0, _redux.bindActionCreators)(boundArrayACs.arraySwap, dispatch),
	          unshift: (0, _redux.bindActionCreators)(boundArrayACs.arrayUnshift, dispatch)
	        };

	        var computedActions = _extends({}, connectedFormACs, boundArrayACs, {
	          blur: boundBlur,
	          change: boundChange,
	          array: connectedArrayACs,
	          focus: boundFocus,
	          dispatch: dispatch
	        });

	        return function () {
	          return computedActions;
	        };
	      }, undefined, { withRef: true });
	      var ConnectedForm = (0, _hoistNonReactStatics2.default)(connector(Form), WrappedComponent);
	      ConnectedForm.defaultProps = config;

	      // build outer component to expose instance api
	      return function (_Component2) {
	        _inherits(ReduxForm, _Component2);

	        function ReduxForm() {
	          _classCallCheck(this, ReduxForm);

	          return _possibleConstructorReturn(this, (ReduxForm.__proto__ || Object.getPrototypeOf(ReduxForm)).apply(this, arguments));
	        }

	        _createClass(ReduxForm, [{
	          key: 'submit',
	          value: function submit() {
	            return this.refs.wrapped.getWrappedInstance().submit();
	          }
	        }, {
	          key: 'reset',
	          value: function reset() {
	            return this.refs.wrapped.getWrappedInstance().reset();
	          }
	        }, {
	          key: 'render',
	          value: function render() {
	            var _props9 = this.props,
	                initialValues = _props9.initialValues,
	                rest = _objectWithoutProperties(_props9, ['initialValues']);

	            return (0, _react.createElement)(ConnectedForm, _extends({}, rest, {
	              ref: 'wrapped',
	              // convert initialValues if need to
	              initialValues: fromJS(initialValues)
	            }));
	          }
	        }, {
	          key: 'valid',
	          get: function get() {
	            return this.refs.wrapped.getWrappedInstance().isValid();
	          }
	        }, {
	          key: 'invalid',
	          get: function get() {
	            return !this.valid;
	          }
	        }, {
	          key: 'pristine',
	          get: function get() {
	            return this.refs.wrapped.getWrappedInstance().isPristine();
	          }
	        }, {
	          key: 'dirty',
	          get: function get() {
	            return !this.pristine;
	          }
	        }, {
	          key: 'values',
	          get: function get() {
	            return this.refs.wrapped.getWrappedInstance().getValues();
	          }
	        }, {
	          key: 'fieldList',
	          get: function get() {
	            // mainly provided for testing
	            return this.refs.wrapped.getWrappedInstance().getFieldList();
	          }
	        }, {
	          key: 'wrappedInstance',
	          get: function get() {
	            // for testine
	            return this.refs.wrapped.getWrappedInstance().refs.wrapped;
	          }
	        }]);

	        return ReduxForm;
	      }(_react.Component);
	    };
	  };
	};

	exports.default = createReduxForm;

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createGetFormSubmitErrors = function createGetFormSubmitErrors(_ref) {
	  var getIn = _ref.getIn;
	  return function (form) {
	    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
	      return getIn(state, 'form');
	    };
	    return function (state) {
	      return getIn(getFormState(state), form + '.submitErrors');
	    };
	  };
	};

	exports.default = createGetFormSubmitErrors;

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createGetFormSyncErrors = function createGetFormSyncErrors(_ref) {
	  var getIn = _ref.getIn;
	  return function (form) {
	    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
	      return getIn(state, 'form');
	    };
	    return function (state) {
	      return getIn(getFormState(state), form + '.syncErrors');
	    };
	  };
	};

	exports.default = createGetFormSyncErrors;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var createGetFormValues = function createGetFormValues(_ref) {
	  var getIn = _ref.getIn;
	  return function (form) {
	    var getFormState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (state) {
	      return getIn(state, 'form');
	    };
	    return function (state) {
	      return getIn(getFormState(state), form + '.values');
	    };
	  };
	};

	exports.default = createGetFormValues;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isPristine = __webpack_require__(25);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createIsDirty = function createIsDirty(structure) {
	  return function (form, getFormState) {
	    var isPristine = (0, _isPristine2.default)(structure)(form, getFormState);
	    return function (state) {
	      return !isPristine(state);
	    };
	  };
	};

	exports.default = createIsDirty;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isValid = __webpack_require__(12);

	var _isValid2 = _interopRequireDefault(_isValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createIsInvalid = function createIsInvalid(structure) {
	  return function (form, getFormState) {
	    var isValid = (0, _isValid2.default)(structure)(form, getFormState);
	    return function (state) {
	      return !isValid(state);
	    };
	  };
	};

	exports.default = createIsInvalid;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _isEqualWith2 = __webpack_require__(131);

	var _isEqualWith3 = _interopRequireDefault(_isEqualWith2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var customizer = function customizer(obj, other) {
	  if (obj === other) return true;
	  if ((obj == null || obj === '' || obj === false) && (other == null || other === '' || other === false)) return true;

	  if (obj && other && obj._error !== other._error) return false;
	  if (obj && other && obj._warning !== other._warning) return false;
	};

	var deepEqual = function deepEqual(a, b) {
	  return (0, _isEqualWith3.default)(a, b, customizer);
	};

	exports.default = deepEqual;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath2 = __webpack_require__(10);

	var _toPath3 = _interopRequireDefault(_toPath2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
	        var result = deleteInWithPath.apply(undefined, [state && state[first]].concat(rest));
	        if (result !== state[first]) {
	          var copy = [].concat(_toConsumableArray(state));
	          copy[first] = result;
	          return copy;
	        }
	      }
	      return state;
	    }
	    if (first in state) {
	      var _result = deleteInWithPath.apply(undefined, [state && state[first]].concat(rest));
	      return state[first] === _result ? state : _extends({}, state, _defineProperty({}, first, _result));
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
	  return deleteInWithPath.apply(undefined, [state].concat(_toConsumableArray((0, _toPath3.default)(field))));
	};

	exports.default = deleteIn;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPath2 = __webpack_require__(10);

	var _toPath3 = _interopRequireDefault(_toPath2);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var setInWithPath = function setInWithPath(state, value, path, pathIndex) {
	  if (pathIndex >= path.length) {
	    return value;
	  }

	  var first = path[pathIndex];
	  var next = setInWithPath(state && state[first], value, path, pathIndex + 1);

	  if (!state) {
	    var initialized = isNaN(first) ? {} : [];
	    initialized[first] = next;
	    return initialized;
	  }

	  if (Array.isArray(state)) {
	    var copy = [].concat(state);
	    copy[first] = next;
	    return copy;
	  }

	  return _extends({}, state, _defineProperty({}, first, next));
	};

	var setIn = function setIn(state, field, value) {
	  return setInWithPath(state, value, (0, _toPath3.default)(field), 0);
	};

	exports.default = setIn;

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var splice = function splice(array, index, removeNum, value) {
	  array = array || [];

	  if (index < array.length) {
	    if (value === undefined && !removeNum) {
	      // inserting undefined
	      var _copy2 = [].concat(_toConsumableArray(array));
	      _copy2.splice(index, 0, null);
	      _copy2[index] = undefined;
	      return _copy2;
	    }
	    if (value != null) {
	      var _copy3 = [].concat(_toConsumableArray(array));
	      _copy3.splice(index, removeNum, value); // removing and adding
	      return _copy3;
	    }
	    var _copy = [].concat(_toConsumableArray(array));
	    _copy.splice(index, removeNum); // removing
	    return _copy;
	  }
	  if (removeNum) {
	    // trying to remove non-existant item: return original array
	    return array;
	  }
	  // trying to add outside of range: just set value
	  var copy = [].concat(_toConsumableArray(array));
	  copy[index] = value;
	  return copy;
	};

	exports.default = splice;

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getDisplayName = function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	};

	exports.default = getDisplayName;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _reactRedux = __webpack_require__(4);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var createValues = function createValues(_ref) {
	  var getIn = _ref.getIn;
	  return function (config) {
	    var _prop$getFormState$co = _extends({
	      prop: 'values',
	      getFormState: function getFormState(state) {
	        return getIn(state, 'form');
	      }
	    }, config),
	        form = _prop$getFormState$co.form,
	        prop = _prop$getFormState$co.prop,
	        getFormState = _prop$getFormState$co.getFormState;

	    return (0, _reactRedux.connect)(function (state) {
	      return _defineProperty({}, prop, getIn(getFormState(state), form + '.values'));
	    }, function () {
	      return {};
	    } // ignore dispatch
	    );
	  };
	};

	exports.default = createValues;

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _extendableBuiltin(cls) {
	  function ExtendableBuiltin() {
	    cls.apply(this, arguments);
	  }

	  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
	    constructor: {
	      value: cls,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });

	  if (Object.setPrototypeOf) {
	    Object.setPrototypeOf(ExtendableBuiltin, cls);
	  } else {
	    ExtendableBuiltin.__proto__ = cls;
	  }

	  return ExtendableBuiltin;
	}

	var ExtendableError = function (_extendableBuiltin2) {
	  _inherits(ExtendableError, _extendableBuiltin2);

	  function ExtendableError() {
	    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    _classCallCheck(this, ExtendableError);

	    // extending Error is weird and does not propagate `message`
	    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

	    Object.defineProperty(_this, 'message', {
	      configurable: true,
	      enumerable: false,
	      value: message,
	      writable: true
	    });

	    Object.defineProperty(_this, 'name', {
	      configurable: true,
	      enumerable: false,
	      value: _this.constructor.name,
	      writable: true
	    });

	    if (Error.hasOwnProperty('captureStackTrace')) {
	      Error.captureStackTrace(_this, _this.constructor);
	      return _possibleConstructorReturn(_this);
	    }

	    Object.defineProperty(_this, 'stack', {
	      configurable: true,
	      enumerable: false,
	      value: new Error(message).stack,
	      writable: true
	    });
	    return _this;
	  }

	  return ExtendableError;
	}(_extendableBuiltin(Error));

	exports.default = ExtendableError;
	module.exports = exports['default'];

/***/ },
/* 80 */
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
/* 81 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

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

	module.exports = isArguments;


/***/ },
/* 83 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(81),
	    isArguments = __webpack_require__(82),
	    isArray = __webpack_require__(83);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(9);

	/**
	 * Casts `value` as an array if it's not one.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Lang
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast array.
	 * @example
	 *
	 * _.castArray(1);
	 * // => [1]
	 *
	 * _.castArray({ 'a': 1 });
	 * // => [{ 'a': 1 }]
	 *
	 * _.castArray('abc');
	 * // => ['abc']
	 *
	 * _.castArray(null);
	 * // => [null]
	 *
	 * _.castArray(undefined);
	 * // => [undefined]
	 *
	 * _.castArray();
	 * // => []
	 *
	 * var array = [1, 2, 3];
	 * console.log(_.castArray(array) === array);
	 * // => true
	 */
	function castArray() {
	  if (!arguments.length) {
	    return [];
	  }
	  var value = arguments[0];
	  return isArray(value) ? value : [value];
	}

	module.exports = castArray;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(34);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(8),
	    eq = __webpack_require__(15);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(29),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(95),
	    isObject = __webpack_require__(3),
	    isObjectLike = __webpack_require__(16);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    equalArrays = __webpack_require__(108),
	    equalByTag = __webpack_require__(109),
	    equalObjects = __webpack_require__(110),
	    getTag = __webpack_require__(113),
	    isArray = __webpack_require__(9),
	    isBuffer = __webpack_require__(35),
	    isTypedArray = __webpack_require__(37);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(27),
	    assignMergeValue = __webpack_require__(28),
	    baseFor = __webpack_require__(29),
	    baseMergeDeep = __webpack_require__(98),
	    isObject = __webpack_require__(3),
	    keysIn = __webpack_require__(39);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(28),
	    cloneBuffer = __webpack_require__(102),
	    cloneTypedArray = __webpack_require__(103),
	    copyArray = __webpack_require__(31),
	    initCloneObject = __webpack_require__(114),
	    isArguments = __webpack_require__(128),
	    isArray = __webpack_require__(9),
	    isArrayLikeObject = __webpack_require__(130),
	    isBuffer = __webpack_require__(35),
	    isFunction = __webpack_require__(36),
	    isObject = __webpack_require__(3),
	    isPlainObject = __webpack_require__(133),
	    isTypedArray = __webpack_require__(37),
	    toPlainObject = __webpack_require__(138);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(127),
	    overRest = __webpack_require__(123),
	    setToString = __webpack_require__(124);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(93);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(86);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(34);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(141)(module)))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(101);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(90),
	    baseAssignValue = __webpack_require__(8);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(99),
	    isIterateeCall = __webpack_require__(115);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(112);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(85),
	    arraySome = __webpack_require__(89),
	    cacheHas = __webpack_require__(100);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(38);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(91),
	    getPrototype = __webpack_require__(32),
	    isPrototype = __webpack_require__(116);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(7);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 122 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(87);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(122);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(36),
	    isLength = __webpack_require__(132);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(129),
	    isObjectLike = __webpack_require__(16);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(94);

	/**
	 * This method is like `_.isEqual` except that it accepts `customizer` which
	 * is invoked to compare values. If `customizer` returns `undefined`, comparisons
	 * are handled by the method instead. The `customizer` is invoked with up to
	 * six arguments: (objValue, othValue [, index|key, object, other, stack]).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * function isGreeting(value) {
	 *   return /^h(?:i|ello)$/.test(value);
	 * }
	 *
	 * function customizer(objValue, othValue) {
	 *   if (isGreeting(objValue) && isGreeting(othValue)) {
	 *     return true;
	 *   }
	 * }
	 *
	 * var array = ['hello', 'goodbye'];
	 * var other = ['hi', 'goodbye'];
	 *
	 * _.isEqualWith(array, other, customizer);
	 * // => true
	 */
	function isEqualWith(value, other, customizer) {
	  customizer = typeof customizer == 'function' ? customizer : undefined;
	  var result = customizer ? customizer(value, other) : undefined;
	  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
	}

	module.exports = isEqualWith;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(30),
	    getPrototype = __webpack_require__(32),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
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
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 134 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(97),
	    createAssigner = __webpack_require__(105);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(104),
	    keysIn = __webpack_require__(39);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 139 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fetchKeys = __webpack_require__(84);

	module.exports = function shallowEqual(objA, objB, compare, compareContext) {

	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

	    if (ret !== void 0) {
	        return !!ret;
	    }

	    if (objA === objB) {
	        return true;
	    }

	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }

	    var keysA = fetchKeys(objA);
	    var keysB = fetchKeys(objB);

	    var len = keysA.length;
	    if (len !== keysB.length) {
	        return false;
	    }

	    compareContext = compareContext || null;

	    // Test for A's keys different from B.
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	    for (var i = 0; i < len; i++) {
	        var key = keysA[i];
	        if (!bHasOwnProperty(key)) {
	            return false;
	        }
	        var valueA = objA[key];
	        var valueB = objB[key];

	        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
	        if (_ret === false || _ret === void 0 && valueA !== valueB) {
	            return false;
	        }
	    }

	    return true;
	};

/***/ },
/* 141 */
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


/***/ }
/******/ ])
});
;