(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"));
	else
		root["ReduxForm"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(57);

	var _createAll2 = __webpack_require__(28);

	var _createAll3 = _interopRequireDefault(_createAll2);

	var _createAll = _createAll3['default'](false, _react2['default'], _reactRedux.connect);

	var actionTypes = _createAll.actionTypes;
	var blur = _createAll.blur;
	var change = _createAll.change;
	var changeWithKey = _createAll.changeWithKey;
	var destroy = _createAll.destroy;
	var focus = _createAll.focus;
	var reducer = _createAll.reducer;
	var reduxForm = _createAll.reduxForm;
	var getValues = _createAll.getValues;
	var initialize = _createAll.initialize;
	var initializeWithKey = _createAll.initializeWithKey;
	var propTypes = _createAll.propTypes;
	var reset = _createAll.reset;
	var startAsyncValidation = _createAll.startAsyncValidation;
	var startSubmit = _createAll.startSubmit;
	var stopAsyncValidation = _createAll.stopAsyncValidation;
	var stopSubmit = _createAll.stopSubmit;
	var touch = _createAll.touch;
	var touchWithKey = _createAll.touchWithKey;
	var untouch = _createAll.untouch;
	var untouchWithKey = _createAll.untouchWithKey;
	exports.actionTypes = actionTypes;
	exports.blur = blur;
	exports.change = change;
	exports.changeWithKey = changeWithKey;
	exports.destroy = destroy;
	exports.focus = focus;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.getValues = getValues;
	exports.initialize = initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.propTypes = propTypes;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.touch = touch;
	exports.touchWithKey = touchWithKey;
	exports.untouch = untouch;
	exports.untouchWithKey = untouchWithKey;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.makeFieldValue = makeFieldValue;
	exports.isFieldValue = isFieldValue;
	var flag = '_isFieldValue';
	var isObject = function isObject(object) {
	  return typeof object === 'object';
	};

	function makeFieldValue(object) {
	  if (object && isObject(object)) {
	    Object.defineProperty(object, flag, { value: true });
	  }
	  return object;
	}

	function isFieldValue(object) {
	  return !!(object && isObject(object) && object[flag]);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isValid;

	function isValid(error) {
	  if (Array.isArray(error)) {
	    return error.reduce(function (valid, errorValue) {
	      return valid && isValid(errorValue);
	    }, true);
	  }
	  if (error && typeof error === 'object') {
	    return Object.keys(error).reduce(function (valid, key) {
	      return valid && isValid(error[key]);
	    }, true);
	  }
	  return !error;
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var ADD_ARRAY_VALUE = 'redux-form/ADD_ARRAY_VALUE';
	exports.ADD_ARRAY_VALUE = ADD_ARRAY_VALUE;
	var BLUR = 'redux-form/BLUR';
	exports.BLUR = BLUR;
	var CHANGE = 'redux-form/CHANGE';
	exports.CHANGE = CHANGE;
	var DESTROY = 'redux-form/DESTROY';
	exports.DESTROY = DESTROY;
	var FOCUS = 'redux-form/FOCUS';
	exports.FOCUS = FOCUS;
	var INITIALIZE = 'redux-form/INITIALIZE';
	exports.INITIALIZE = INITIALIZE;
	var REMOVE_ARRAY_VALUE = 'redux-form/REMOVE_ARRAY_VALUE';
	exports.REMOVE_ARRAY_VALUE = REMOVE_ARRAY_VALUE;
	var RESET = 'redux-form/RESET';
	exports.RESET = RESET;
	var START_ASYNC_VALIDATION = 'redux-form/START_ASYNC_VALIDATION';
	exports.START_ASYNC_VALIDATION = START_ASYNC_VALIDATION;
	var START_SUBMIT = 'redux-form/START_SUBMIT';
	exports.START_SUBMIT = START_SUBMIT;
	var STOP_ASYNC_VALIDATION = 'redux-form/STOP_ASYNC_VALIDATION';
	exports.STOP_ASYNC_VALIDATION = STOP_ASYNC_VALIDATION;
	var STOP_SUBMIT = 'redux-form/STOP_SUBMIT';
	exports.STOP_SUBMIT = STOP_SUBMIT;
	var SUBMIT_FAILED = 'redux-form/SUBMIT_FAILED';
	exports.SUBMIT_FAILED = SUBMIT_FAILED;
	var SWAP_ARRAY_VALUES = 'redux-form/SWAP_ARRAY_VALUES';
	exports.SWAP_ARRAY_VALUES = SWAP_ARRAY_VALUES;
	var TOUCH = 'redux-form/TOUCH';
	exports.TOUCH = TOUCH;
	var UNTOUCH = 'redux-form/UNTOUCH';
	exports.UNTOUCH = UNTOUCH;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Maps all the values in the given object through the given function and saves them, by key, to a result object
	 */
	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return obj ? Object.keys(obj).reduce(function (accumulator, key) {
	    var _extends2;

	    return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = fn(obj[key], key), _extends2));
	  }, {}) : obj;
	}

	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _actionTypes = __webpack_require__(4);

	var addArrayValue = function addArrayValue(path, value, index) {
	  return { type: _actionTypes.ADD_ARRAY_VALUE, path: path, value: value, index: index };
	};

	exports.addArrayValue = addArrayValue;
	var blur = function blur(field, value) {
	  return { type: _actionTypes.BLUR, field: field, value: value };
	};

	exports.blur = blur;
	var change = function change(field, value) {
	  return { type: _actionTypes.CHANGE, field: field, value: value };
	};

	exports.change = change;
	var destroy = function destroy() {
	  return { type: _actionTypes.DESTROY };
	};

	exports.destroy = destroy;
	var focus = function focus(field) {
	  return { type: _actionTypes.FOCUS, field: field };
	};

	exports.focus = focus;
	var initialize = function initialize(data, fields) {
	  if (!Array.isArray(fields)) {
	    throw new Error('must provide fields array to initialize() action creator');
	  }
	  return { type: _actionTypes.INITIALIZE, data: data, fields: fields };
	};

	exports.initialize = initialize;
	var removeArrayValue = function removeArrayValue(path, index) {
	  return { type: _actionTypes.REMOVE_ARRAY_VALUE, path: path, index: index };
	};

	exports.removeArrayValue = removeArrayValue;
	var reset = function reset() {
	  return { type: _actionTypes.RESET };
	};

	exports.reset = reset;
	var startAsyncValidation = function startAsyncValidation(field) {
	  return { type: _actionTypes.START_ASYNC_VALIDATION, field: field };
	};

	exports.startAsyncValidation = startAsyncValidation;
	var startSubmit = function startSubmit() {
	  return { type: _actionTypes.START_SUBMIT };
	};

	exports.startSubmit = startSubmit;
	var stopAsyncValidation = function stopAsyncValidation(errors) {
	  return { type: _actionTypes.STOP_ASYNC_VALIDATION, errors: errors };
	};

	exports.stopAsyncValidation = stopAsyncValidation;
	var stopSubmit = function stopSubmit(errors) {
	  return { type: _actionTypes.STOP_SUBMIT, errors: errors };
	};

	exports.stopSubmit = stopSubmit;
	var submitFailed = function submitFailed() {
	  return { type: _actionTypes.SUBMIT_FAILED };
	};

	exports.submitFailed = submitFailed;
	var swapArrayValues = function swapArrayValues(path, indexA, indexB) {
	  return { type: _actionTypes.SWAP_ARRAY_VALUES, path: path, indexA: indexA, indexB: indexB };
	};

	exports.swapArrayValues = swapArrayValues;
	var touch = function touch() {
	  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
	    fields[_key] = arguments[_key];
	  }

	  return { type: _actionTypes.TOUCH, fields: fields };
	};

	exports.touch = touch;
	var untouch = function untouch() {
	  for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fields[_key2] = arguments[_key2];
	  }

	  return { type: _actionTypes.UNTOUCH, fields: fields };
	};
	exports.untouch = untouch;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = bindActionData;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(5);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	/**
	 * Adds additional properties to the results of the function or map of functions passed
	 */

	function bindActionData(action, data) {
	  if (typeof action === 'function') {
	    return function () {
	      return _extends({}, action.apply(undefined, arguments), data);
	    };
	  }
	  if (typeof action === 'object') {
	    return _mapValues2['default'](action, function (value) {
	      return bindActionData(value, data);
	    });
	  }
	  return action;
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var dataKey = 'value';
	exports.dataKey = dataKey;
	var createOnDragStart = function createOnDragStart(name, getValue) {
	  return function (event) {
	    event.dataTransfer.setData(dataKey, getValue());
	  };
	};

	exports['default'] = createOnDragStart;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isEvent = __webpack_require__(11);

	var _isEvent2 = _interopRequireDefault(_isEvent);

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
	  if (_isEvent2['default'](event)) {
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
	  return event && typeof event === 'object' && event.value !== undefined ? event.value : // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
	  event;
	};

	exports['default'] = getValue;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var isEvent = function isEvent(candidate) {
	  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
	};

	exports["default"] = isEvent;
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isEvent = __webpack_require__(11);

	var _isEvent2 = _interopRequireDefault(_isEvent);

	var silenceEvent = function silenceEvent(event) {
	  var is = _isEvent2['default'](event);
	  if (is) {
	    event.preventDefault();
	  }
	  return is;
	};

	exports['default'] = silenceEvent;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = getDisplayName;

	function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var getValue = function getValue(field, state, dest) {
	  var dotIndex = field.indexOf('.');
	  var openIndex = field.indexOf('[');
	  var closeIndex = field.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    (function () {
	      // array field
	      var key = field.substring(0, openIndex);
	      var rest = field.substring(closeIndex + 1);
	      if (rest[0] === '.') {
	        rest = rest.substring(1);
	      }
	      var array = state && state[key] || [];
	      if (rest) {
	        if (!dest[key]) {
	          dest[key] = [];
	        }
	        array.forEach(function (item, index) {
	          if (!dest[key][index]) {
	            dest[key][index] = {};
	          }
	          getValue(rest, item, dest[key][index]);
	        });
	      } else {
	        dest[key] = array.map(function (item) {
	          return item.value;
	        });
	      }
	    })();
	  } else if (dotIndex > 0) {
	    // subobject field
	    var key = field.substring(0, dotIndex);
	    var rest = field.substring(dotIndex + 1);
	    if (!dest[key]) {
	      dest[key] = {};
	    }
	    getValue(rest, state && state[key] || {}, dest[key]);
	  } else {
	    dest[field] = state[field] && state[field].value;
	  }
	};

	var getValues = function getValues(fields, state) {
	  return fields.reduce(function (accumulator, field) {
	    getValue(field, state, accumulator);
	    return accumulator;
	  }, {});
	};

	exports['default'] = getValues;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _fieldValue = __webpack_require__(1);

	/**
	 * A different version of getValues() that does not need the fields array
	 */
	var getValuesFromState = function getValuesFromState(state) {
	  if (!state) {
	    return state;
	  }
	  var keys = Object.keys(state);
	  if (!keys.length) {
	    return undefined;
	  }
	  return keys.reduce(function (accumulator, key) {
	    var field = state[key];
	    if (field) {
	      if (field.hasOwnProperty && field.hasOwnProperty('value')) {
	        if (field.value !== undefined) {
	          accumulator[key] = field.value;
	        }
	      } else if (Array.isArray(field)) {
	        accumulator[key] = field.map(function (arrayField) {
	          return _fieldValue.isFieldValue(arrayField) ? arrayField.value : getValuesFromState(arrayField);
	        });
	      } else if (typeof field === 'object') {
	        var result = getValuesFromState(field);

	        if (result && Object.keys(result).length > 0) {
	          accumulator[key] = result;
	        }
	      }
	    }
	    return accumulator;
	  }, {});
	};

	exports['default'] = getValuesFromState;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Reads any potentially deep value from an object using dot and array syntax
	 */
	'use strict';

	exports.__esModule = true;
	var read = function read(_x, _x2) {
	  var _again = true;

	  _function: while (_again) {
	    var path = _x,
	        object = _x2;
	    _again = false;

	    if (!path || !object) {
	      return object;
	    }
	    var dotIndex = path.indexOf('.');
	    if (dotIndex === 0) {
	      _x = path.substring(1);
	      _x2 = object;
	      _again = true;
	      dotIndex = undefined;
	      continue _function;
	    }
	    var openIndex = path.indexOf('[');
	    var closeIndex = path.indexOf(']');
	    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	      // iterate down object tree
	      _x = path.substring(dotIndex + 1);
	      _x2 = object[path.substring(0, dotIndex)];
	      _again = true;
	      dotIndex = openIndex = closeIndex = undefined;
	      continue _function;
	    }
	    if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	      if (closeIndex < 0) {
	        throw new Error('found [ but no ]');
	      }
	      var key = path.substring(0, openIndex);
	      var index = path.substring(openIndex + 1, closeIndex);
	      if (!index.length) {
	        return object[key];
	      }
	      if (openIndex === 0) {
	        _x = path.substring(closeIndex + 1);
	        _x2 = object[index];
	        _again = true;
	        dotIndex = openIndex = closeIndex = key = index = undefined;
	        continue _function;
	      }
	      if (!object[key]) {
	        return undefined;
	      }
	      _x = path.substring(closeIndex + 1);
	      _x2 = object[key][index];
	      _again = true;
	      dotIndex = openIndex = closeIndex = key = index = undefined;
	      continue _function;
	    }
	    return object[path];
	  }
	};

	exports['default'] = read;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _initialState, _behaviors;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _actionTypes = __webpack_require__(4);

	var _mapValues = __webpack_require__(5);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _read = __webpack_require__(16);

	var _read2 = _interopRequireDefault(_read);

	var _write = __webpack_require__(18);

	var _write2 = _interopRequireDefault(_write);

	var _getValuesFromState = __webpack_require__(15);

	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

	var _initializeState = __webpack_require__(39);

	var _initializeState2 = _interopRequireDefault(_initializeState);

	var _resetState = __webpack_require__(44);

	var _resetState2 = _interopRequireDefault(_resetState);

	var _setErrors = __webpack_require__(45);

	var _setErrors2 = _interopRequireDefault(_setErrors);

	var _fieldValue = __webpack_require__(1);

	var globalErrorKey = '_error';

	exports.globalErrorKey = globalErrorKey;
	var initialState = (_initialState = {
	  _active: undefined,
	  _asyncValidating: false
	}, _initialState[globalErrorKey] = undefined, _initialState._initialized = false, _initialState._submitting = false, _initialState._submitFailed = false, _initialState);

	exports.initialState = initialState;
	var behaviors = (_behaviors = {}, _behaviors[_actionTypes.ADD_ARRAY_VALUE] = function (state, _ref) {
	  var path = _ref.path;
	  var index = _ref.index;
	  var value = _ref.value;

	  var array = _read2['default'](path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  var newValue = value !== null && typeof value === 'object' ? _initializeState2['default'](value, Object.keys(value)) : _fieldValue.makeFieldValue({ value: value });
	  if (index === undefined) {
	    arrayCopy.push(newValue);
	  } else {
	    arrayCopy.splice(index, 0, newValue);
	  }
	  return _write2['default'](path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.BLUR] = function (state, _ref2) {
	  var field = _ref2.field;
	  var value = _ref2.value;
	  var touch = _ref2.touch;

	  // remove _active from state
	  var _active = state._active;

	  var stateCopy = _objectWithoutProperties(state, ['_active']);

	  // eslint-disable-line prefer-const
	  return _write2['default'](field, function (previous) {
	    var result = _extends({}, previous);
	    if (value !== undefined) {
	      result.value = value;
	    }
	    if (touch) {
	      result.touched = true;
	    }
	    return _fieldValue.makeFieldValue(result);
	  }, stateCopy);
	}, _behaviors[_actionTypes.CHANGE] = function (state, _ref3) {
	  var field = _ref3.field;
	  var value = _ref3.value;
	  var touch = _ref3.touch;

	  return _write2['default'](field, function (previous) {
	    var _extends13 = _extends({}, previous, { value: value });

	    var asyncError = _extends13.asyncError;
	    var submitError = _extends13.submitError;

	    var result = _objectWithoutProperties(_extends13, ['asyncError', 'submitError']);

	    if (touch) {
	      result.touched = true;
	    }
	    return _fieldValue.makeFieldValue(result);
	  }, state);
	}, _behaviors[_actionTypes.DESTROY] = function () {
	  return undefined;
	}, _behaviors[_actionTypes.FOCUS] = function (state, _ref4) {
	  var field = _ref4.field;

	  var stateCopy = _write2['default'](field, function (previous) {
	    return _fieldValue.makeFieldValue(_extends({}, previous, { visited: true }));
	  }, state);
	  stateCopy._active = field;
	  return stateCopy;
	}, _behaviors[_actionTypes.INITIALIZE] = function (state, _ref5) {
	  var _extends2;

	  var data = _ref5.data;
	  var fields = _ref5.fields;

	  return _extends({}, _initializeState2['default'](data, fields, state), (_extends2 = {
	    _asyncValidating: false,
	    _active: undefined
	  }, _extends2[globalErrorKey] = undefined, _extends2._initialized = true, _extends2._submitting = false, _extends2._submitFailed = false, _extends2));
	}, _behaviors[_actionTypes.REMOVE_ARRAY_VALUE] = function (state, _ref6) {
	  var path = _ref6.path;
	  var index = _ref6.index;

	  var array = _read2['default'](path, state);
	  var stateCopy = _extends({}, state);
	  var arrayCopy = array ? [].concat(array) : [];
	  if (index === undefined) {
	    arrayCopy.pop();
	  } else if (isNaN(index)) {
	    delete arrayCopy[index];
	  } else {
	    arrayCopy.splice(index, 1);
	  }
	  return _write2['default'](path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.RESET] = function (state) {
	  var _extends3;

	  return _extends({}, _resetState2['default'](state), (_extends3 = {
	    _active: undefined,
	    _asyncValidating: false
	  }, _extends3[globalErrorKey] = undefined, _extends3._initialized = state._initialized, _extends3._submitting = false, _extends3._submitFailed = false, _extends3));
	}, _behaviors[_actionTypes.START_ASYNC_VALIDATION] = function (state, _ref7) {
	  var field = _ref7.field;

	  return _extends({}, state, {
	    _asyncValidating: field || true
	  });
	}, _behaviors[_actionTypes.START_SUBMIT] = function (state) {
	  return _extends({}, state, {
	    _submitting: true
	  });
	}, _behaviors[_actionTypes.STOP_ASYNC_VALIDATION] = function (state, _ref8) {
	  var _extends4;

	  var errors = _ref8.errors;

	  return _extends({}, _setErrors2['default'](state, errors, 'asyncError'), (_extends4 = {
	    _asyncValidating: false
	  }, _extends4[globalErrorKey] = errors && errors[globalErrorKey], _extends4));
	}, _behaviors[_actionTypes.STOP_SUBMIT] = function (state, _ref9) {
	  var _extends5;

	  var errors = _ref9.errors;

	  return _extends({}, _setErrors2['default'](state, errors, 'submitError'), (_extends5 = {}, _extends5[globalErrorKey] = errors && errors[globalErrorKey], _extends5._submitting = false, _extends5._submitFailed = !!(errors && Object.keys(errors).length), _extends5));
	}, _behaviors[_actionTypes.SUBMIT_FAILED] = function (state) {
	  return _extends({}, state, {
	    _submitFailed: true
	  });
	}, _behaviors[_actionTypes.SWAP_ARRAY_VALUES] = function (state, _ref10) {
	  var path = _ref10.path;
	  var indexA = _ref10.indexA;
	  var indexB = _ref10.indexB;

	  var array = _read2['default'](path, state);
	  var arrayLength = array.length;
	  if (indexA === indexB || isNaN(indexA) || isNaN(indexB) || indexA >= arrayLength || indexB >= arrayLength) {
	    return state; // do nothing
	  }
	  var stateCopy = _extends({}, state);
	  var arrayCopy = [].concat(array);
	  arrayCopy[indexA] = array[indexB];
	  arrayCopy[indexB] = array[indexA];
	  return _write2['default'](path, arrayCopy, stateCopy);
	}, _behaviors[_actionTypes.TOUCH] = function (state, _ref11) {
	  var fields = _ref11.fields;

	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return _write2['default'](field, function (value) {
	      return _fieldValue.makeFieldValue(_extends({}, value, { touched: true }));
	    }, accumulator);
	  }, state));
	}, _behaviors[_actionTypes.UNTOUCH] = function (state, _ref12) {
	  var fields = _ref12.fields;

	  return _extends({}, state, fields.reduce(function (accumulator, field) {
	    return _write2['default'](field, function (value) {
	      if (value) {
	        var touched = value.touched;

	        var rest = _objectWithoutProperties(value, ['touched']);

	        return _fieldValue.makeFieldValue(rest);
	      }
	      return _fieldValue.makeFieldValue(value);
	    }, accumulator);
	  }, state));
	}, _behaviors);

	var reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var behavior = behaviors[action.type];
	  return behavior ? behavior(state, action) : state;
	};

	function formReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _extends11;

	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var form = action.form;
	  var key = action.key;

	  var rest = _objectWithoutProperties(action, ['form', 'key']);

	  // eslint-disable-line no-redeclare
	  if (!form) {
	    return state;
	  }
	  if (key) {
	    var _extends8, _extends9;

	    if (action.type === _actionTypes.DESTROY) {
	      var _extends7;

	      return _extends({}, state, (_extends7 = {}, _extends7[form] = state[form] && Object.keys(state[form]).reduce(function (accumulator, stateKey) {
	        var _extends6;

	        return stateKey === key ? accumulator : _extends({}, accumulator, (_extends6 = {}, _extends6[stateKey] = state[form][stateKey], _extends6));
	      }, {}), _extends7));
	    }
	    return _extends({}, state, (_extends9 = {}, _extends9[form] = _extends({}, state[form], (_extends8 = {}, _extends8[key] = reducer((state[form] || {})[key], rest), _extends8)), _extends9));
	  }
	  if (action.type === _actionTypes.DESTROY) {
	    return Object.keys(state).reduce(function (accumulator, formName) {
	      var _extends10;

	      return formName === form ? accumulator : _extends({}, accumulator, (_extends10 = {}, _extends10[formName] = state[formName], _extends10));
	    }, {});
	  }
	  return _extends({}, state, (_extends11 = {}, _extends11[form] = reducer(state[form], rest), _extends11));
	}

	/**
	 * Adds additional functionality to the reducer
	 */
	function decorate(target) {
	  target.plugin = function plugin(reducers) {
	    var _this = this;

	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this(state, action);
	      return _extends({}, result, _mapValues2['default'](reducers, function (pluginReducer, key) {
	        return pluginReducer(result[key] || initialState, action);
	      }));
	    });
	  };

	  target.normalize = function normalize(normalizers) {
	    var _this2 = this;

	    // use 'function' keyword to enable 'this'
	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this2(state, action);
	      return _extends({}, result, _mapValues2['default'](normalizers, function (formNormalizers, form) {
	        var runNormalize = function runNormalize(previous, currentResult) {
	          var previousValues = _getValuesFromState2['default'](_extends({}, initialState, previous));
	          var formResult = _extends({}, initialState, currentResult);
	          return _extends({}, formResult, _mapValues2['default'](formNormalizers, function (fieldNormalizer, field) {
	            return _extends({}, formResult[field], {
	              value: _fieldValue.makeFieldValue(fieldNormalizer(formResult[field] ? formResult[field].value : undefined, // value
	              previous && previous[field] ? previous[field].value : undefined, // previous value
	              _getValuesFromState2['default'](formResult), // all field values
	              previousValues)) // all previous field values
	            });
	          }));
	        };
	        if (action.key) {
	          var _extends12;

	          return _extends({}, result[form], (_extends12 = {}, _extends12[action.key] = runNormalize(state[form][action.key], result[form][action.key]), _extends12));
	        }
	        return runNormalize(state[form], result[form]);
	      }));
	    });
	  };

	  return target;
	}

	exports['default'] = decorate(formReducer);

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Writes any potentially deep value from an object using dot and array syntax,
	 * and returns a new copy of the object.
	 */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var write = function write(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var path = _x,
	        value = _x2,
	        object = _x3;

	    var _extends7;

	    _again = false;

	    var dotIndex = path.indexOf('.');
	    if (dotIndex === 0) {
	      _x = path.substring(1);
	      _x2 = value;
	      _x3 = object;
	      _again = true;
	      _extends7 = dotIndex = undefined;
	      continue _function;
	    }
	    var openIndex = path.indexOf('[');
	    var closeIndex = path.indexOf(']');
	    if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	      var _extends2;

	      // is dot notation
	      var key = path.substring(0, dotIndex);
	      return _extends({}, object, (_extends2 = {}, _extends2[key] = write(path.substring(dotIndex + 1), value, object[key] || {}), _extends2));
	    }
	    if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	      var _extends6;

	      var _extends4;

	      var _extends3;

	      var _extends5;

	      var _ret = (function () {
	        // is array notation
	        if (closeIndex < 0) {
	          throw new Error('found [ but no ]');
	        }
	        var key = path.substring(0, openIndex);
	        var index = path.substring(openIndex + 1, closeIndex);
	        var array = object[key] || [];
	        var rest = path.substring(closeIndex + 1);
	        if (index) {
	          // indexed array
	          if (rest.length) {
	            // need to keep recursing
	            var dest = array[index] || {};
	            var arrayCopy = [].concat(array);
	            arrayCopy[index] = write(rest, value, dest);
	            return {
	              v: _extends({}, object || {}, (_extends3 = {}, _extends3[key] = arrayCopy, _extends3))
	            };
	          }
	          var copy = [].concat(array);
	          copy[index] = typeof value === 'function' ? value(copy[index]) : value;
	          return {
	            v: _extends({}, object || {}, (_extends4 = {}, _extends4[key] = copy, _extends4))
	          };
	        }
	        // indexless array
	        if (rest.length) {
	          // need to keep recursing
	          if ((!array || !array.length) && typeof value === 'function') {
	            return {
	              v: object
	            }; // don't even set a value under [key]
	          }
	          var arrayCopy = array.map(function (dest) {
	            return write(rest, value, dest);
	          });
	          return {
	            v: _extends({}, object || {}, (_extends5 = {}, _extends5[key] = arrayCopy, _extends5))
	          };
	        }
	        var result = undefined;
	        if (Array.isArray(value)) {
	          result = value;
	        } else if (object[key]) {
	          result = array.map(function (dest) {
	            return typeof value === 'function' ? value(dest) : value;
	          });
	        } else if (typeof value === 'function') {
	          return {
	            v: object
	          }; // don't even set a value under [key]
	        } else {
	            result = value;
	          }
	        return {
	          v: _extends({}, object || {}, (_extends6 = {}, _extends6[key] = result, _extends6))
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    }
	    return _extends({}, object, (_extends7 = {}, _extends7[path] = typeof value === 'function' ? value(object[path]) : value, _extends7));
	  }
	};

	exports['default'] = write;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(51);
	var isArguments = __webpack_require__(50);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


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

	'use strict';

	var _require = __webpack_require__(3);

	var PropTypes = _require.PropTypes;

	var storeShape = PropTypes.shape({
	  subscribe: PropTypes.func.isRequired,
	  dispatch: PropTypes.func.isRequired,
	  getState: PropTypes.func.isRequired
	});

	module.exports = storeShape;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(25);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(22);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(63);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(62);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(61);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(24);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPromise = __webpack_require__(6);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _isValid = __webpack_require__(2);

	var _isValid2 = _interopRequireDefault(_isValid);

	var asyncValidation = function asyncValidation(fn, start, stop, field) {
	  start(field);
	  var promise = fn();
	  if (!_isPromise2['default'](promise)) {
	    throw new Error('asyncValidate function passed to reduxForm must return a promise');
	  }
	  var handleErrors = function handleErrors(rejected) {
	    return function (errors) {
	      if (!_isValid2['default'](errors)) {
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

	exports['default'] = asyncValidation;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createAll;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reducer = __webpack_require__(17);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _createReduxForm = __webpack_require__(31);

	var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

	var _mapValues = __webpack_require__(5);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _bindActionData = __webpack_require__(8);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _actions = __webpack_require__(7);

	var actions = _interopRequireWildcard(_actions);

	var _actionTypes = __webpack_require__(4);

	var actionTypes = _interopRequireWildcard(_actionTypes);

	var _createPropTypes = __webpack_require__(30);

	var _createPropTypes2 = _interopRequireDefault(_createPropTypes);

	var _getValuesFromState = __webpack_require__(15);

	var _getValuesFromState2 = _interopRequireDefault(_getValuesFromState);

	// bind form as first parameter of action creators
	var boundActions = _extends({}, _mapValues2['default'](_extends({}, actions, {
	  changeWithKey: function changeWithKey(key) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return _bindActionData2['default'](actions.change, { key: key }).apply(undefined, args);
	  },
	  initializeWithKey: function initializeWithKey(key) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }

	    return _bindActionData2['default'](actions.initialize, { key: key }).apply(undefined, args);
	  },
	  reset: function reset(key) {
	    return _bindActionData2['default'](actions.reset, { key: key })();
	  },
	  touchWithKey: function touchWithKey(key) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }

	    return _bindActionData2['default'](actions.touch, { key: key }).apply(undefined, args);
	  },
	  untouchWithKey: function untouchWithKey(key) {
	    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      args[_key4 - 1] = arguments[_key4];
	    }

	    return _bindActionData2['default'](actions.untouch, { key: key }).apply(undefined, args);
	  },
	  destroy: function destroy(key) {
	    return _bindActionData2['default'](actions.destroy, { key: key })();
	  }
	}), function (action) {
	  return function (form) {
	    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	      args[_key5 - 1] = arguments[_key5];
	    }

	    return _bindActionData2['default'](action, { form: form }).apply(undefined, args);
	  };
	}));

	var blur = boundActions.blur;
	var change = boundActions.change;
	var changeWithKey = boundActions.changeWithKey;
	var destroy = boundActions.destroy;
	var focus = boundActions.focus;
	var initialize = boundActions.initialize;
	var initializeWithKey = boundActions.initializeWithKey;
	var reset = boundActions.reset;
	var startAsyncValidation = boundActions.startAsyncValidation;
	var startSubmit = boundActions.startSubmit;
	var stopAsyncValidation = boundActions.stopAsyncValidation;
	var stopSubmit = boundActions.stopSubmit;
	var submitFailed = boundActions.submitFailed;
	var touch = boundActions.touch;
	var touchWithKey = boundActions.touchWithKey;
	var untouch = boundActions.untouch;
	var untouchWithKey = boundActions.untouchWithKey;

	function createAll(isReactNative, React, connect) {
	  return {
	    actionTypes: actionTypes,
	    blur: blur,
	    change: change,
	    changeWithKey: changeWithKey,
	    destroy: destroy,
	    focus: focus,
	    getValues: _getValuesFromState2['default'],
	    initialize: initialize,
	    initializeWithKey: initializeWithKey,
	    propTypes: _createPropTypes2['default'](React),
	    reduxForm: _createReduxForm2['default'](isReactNative, React, connect),
	    reducer: _reducer2['default'],
	    reset: reset,
	    startAsyncValidation: startAsyncValidation,
	    startSubmit: startSubmit,
	    stopAsyncValidation: stopAsyncValidation,
	    stopSubmit: stopSubmit,
	    submitFailed: submitFailed,
	    touch: touch,
	    touchWithKey: touchWithKey,
	    untouch: untouch,
	    untouchWithKey: untouchWithKey
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _actions = __webpack_require__(7);

	var importedActions = _interopRequireWildcard(_actions);

	var _getDisplayName = __webpack_require__(13);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _reducer = __webpack_require__(17);

	var _deepEqual = __webpack_require__(19);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _bindActionData = __webpack_require__(8);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _getValues = __webpack_require__(14);

	var _getValues2 = _interopRequireDefault(_getValues);

	var _isValid = __webpack_require__(2);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _readFields = __webpack_require__(42);

	var _readFields2 = _interopRequireDefault(_readFields);

	var _handleSubmit2 = __webpack_require__(38);

	var _handleSubmit3 = _interopRequireDefault(_handleSubmit2);

	var _asyncValidation = __webpack_require__(27);

	var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

	var _eventsSilenceEvents = __webpack_require__(37);

	var _eventsSilenceEvents2 = _interopRequireDefault(_eventsSilenceEvents);

	var _eventsSilenceEvent = __webpack_require__(12);

	var _eventsSilenceEvent2 = _interopRequireDefault(_eventsSilenceEvent);

	var _wrapMapDispatchToProps = __webpack_require__(48);

	var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

	var _wrapMapStateToProps = __webpack_require__(49);

	var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

	/**
	 * Creates a HOC that knows how to create redux-connected sub-components.
	 */
	var createHigherOrderComponent = function createHigherOrderComponent(config, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  return function (reduxMountPoint, formName, formKey, getFormState) {
	    var ReduxForm = (function (_Component) {
	      _inherits(ReduxForm, _Component);

	      function ReduxForm(props) {
	        _classCallCheck(this, ReduxForm);

	        _Component.call(this, props);
	        // bind functions
	        this.asyncValidate = this.asyncValidate.bind(this);
	        this.handleSubmit = this.handleSubmit.bind(this);
	        this.fields = _readFields2['default'](props, {}, {}, this.asyncValidate, isReactNative);
	      }

	      ReduxForm.prototype.componentWillMount = function componentWillMount() {
	        var _props = this.props;
	        var fields = _props.fields;
	        var form = _props.form;
	        var initialize = _props.initialize;
	        var initialValues = _props.initialValues;

	        if (initialValues && !form._initialized) {
	          initialize(initialValues, fields);
	        }
	      };

	      ReduxForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!_deepEqual2['default'](this.props.fields, nextProps.fields) || !_deepEqual2['default'](this.props.form, nextProps.form, { strict: true })) {
	          this.fields = _readFields2['default'](nextProps, this.props, this.fields, this.asyncValidate, isReactNative);
	        }
	        if (!_deepEqual2['default'](this.props.initialValues, nextProps.initialValues)) {
	          this.props.initialize(nextProps.initialValues, nextProps.fields);
	        }
	      };

	      ReduxForm.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (config.destroyOnUnmount) {
	          this.props.destroy();
	        }
	      };

	      ReduxForm.prototype.asyncValidate = function asyncValidate(name, value) {
	        var _this = this;

	        var _props2 = this.props;
	        var asyncValidate = _props2.asyncValidate;
	        var dispatch = _props2.dispatch;
	        var fields = _props2.fields;
	        var form = _props2.form;
	        var startAsyncValidation = _props2.startAsyncValidation;
	        var stopAsyncValidation = _props2.stopAsyncValidation;
	        var validate = _props2.validate;

	        if (asyncValidate) {
	          var _ret = (function () {
	            var values = _getValues2['default'](fields, form);
	            if (name) {
	              values[name] = value;
	            }
	            var syncErrors = validate(values, _this.props);

	            // if blur validating, only run async validate if sync validation passes
	            if (!name || _isValid2['default'](syncErrors[name])) {
	              return {
	                v: _asyncValidation2['default'](function () {
	                  return asyncValidate(values, dispatch, _this.props);
	                }, startAsyncValidation, stopAsyncValidation, name)
	              };
	            }
	          })();

	          if (typeof _ret === 'object') return _ret.v;
	        }
	      };

	      ReduxForm.prototype.handleSubmit = function handleSubmit(submitOrEvent) {
	        var _this2 = this;

	        var _props3 = this.props;
	        var onSubmit = _props3.onSubmit;
	        var fields = _props3.fields;
	        var form = _props3.form;

	        var check = function check(submit) {
	          if (!submit || typeof submit !== 'function') {
	            throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	          }
	          return submit;
	        };
	        return !submitOrEvent || _eventsSilenceEvent2['default'](submitOrEvent) ?
	        // submitOrEvent is an event: fire submit
	        _handleSubmit3['default'](check(onSubmit), _getValues2['default'](fields, form), this.props, this.asyncValidate) :
	        // submitOrEvent is the submit function: return deferred submit thunk
	        _eventsSilenceEvents2['default'](function (event) {
	          _eventsSilenceEvent2['default'](event);
	          _handleSubmit3['default'](check(submitOrEvent), _getValues2['default'](fields, form), _this2.props, _this2.asyncValidate);
	        });
	      };

	      ReduxForm.prototype.render = function render() {
	        var _ref,
	            _this3 = this;

	        var allFields = this.fields;
	        var _props4 = this.props;
	        var addArrayValue = _props4.addArrayValue;
	        var asyncBlurFields = _props4.asyncBlurFields;
	        var blur = _props4.blur;
	        var change = _props4.change;
	        var destroy = _props4.destroy;
	        var focus = _props4.focus;
	        var fields = _props4.fields;
	        var form = _props4.form;
	        var initialValues = _props4.initialValues;
	        var initialize = _props4.initialize;
	        var onSubmit = _props4.onSubmit;
	        var propNamespace = _props4.propNamespace;
	        var reset = _props4.reset;
	        var removeArrayValue = _props4.removeArrayValue;
	        var returnRejectedSubmitPromise = _props4.returnRejectedSubmitPromise;
	        var startAsyncValidation = _props4.startAsyncValidation;
	        var startSubmit = _props4.startSubmit;
	        var stopAsyncValidation = _props4.stopAsyncValidation;
	        var stopSubmit = _props4.stopSubmit;
	        var submitFailed = _props4.submitFailed;
	        var swapArrayValues = _props4.swapArrayValues;
	        var touch = _props4.touch;
	        var untouch = _props4.untouch;
	        var validate = _props4.validate;

	        var passableProps = _objectWithoutProperties(_props4, ['addArrayValue', 'asyncBlurFields', 'blur', 'change', 'destroy', 'focus', 'fields', 'form', 'initialValues', 'initialize', 'onSubmit', 'propNamespace', 'reset', 'removeArrayValue', 'returnRejectedSubmitPromise', 'startAsyncValidation', 'startSubmit', 'stopAsyncValidation', 'stopSubmit', 'submitFailed', 'swapArrayValues', 'touch', 'untouch', 'validate']);

	        // eslint-disable-line no-redeclare
	        var _allFields$_meta = allFields._meta;
	        var allPristine = _allFields$_meta.allPristine;
	        var allValid = _allFields$_meta.allValid;
	        var errors = _allFields$_meta.errors;
	        var formError = _allFields$_meta.formError;
	        var values = _allFields$_meta.values;

	        var props = {
	          // State:
	          active: form._active,
	          asyncValidating: form._asyncValidating,
	          dirty: !allPristine,
	          error: formError,
	          errors: errors,
	          fields: allFields,
	          formKey: formKey,
	          invalid: !allValid,
	          pristine: allPristine,
	          submitting: form._submitting,
	          submitFailed: form._submitFailed,
	          valid: allValid,
	          values: values,

	          // Actions:
	          asyncValidate: _eventsSilenceEvents2['default'](function () {
	            return _this3.asyncValidate();
	          }),
	          // ^ doesn't just pass this.asyncValidate to disallow values passing
	          destroyForm: _eventsSilenceEvents2['default'](destroy),
	          handleSubmit: this.handleSubmit,
	          initializeForm: _eventsSilenceEvents2['default'](function (initValues) {
	            return initialize(initValues, fields);
	          }),
	          resetForm: _eventsSilenceEvents2['default'](reset),
	          touch: _eventsSilenceEvents2['default'](function () {
	            return touch.apply(undefined, arguments);
	          }),
	          touchAll: _eventsSilenceEvents2['default'](function () {
	            return touch.apply(undefined, fields);
	          }),
	          untouch: _eventsSilenceEvents2['default'](function () {
	            return untouch.apply(undefined, arguments);
	          }),
	          untouchAll: _eventsSilenceEvents2['default'](function () {
	            return untouch.apply(undefined, fields);
	          })
	        };
	        var passedProps = propNamespace ? (_ref = {}, _ref[propNamespace] = props, _ref) : props;
	        return React.createElement(WrappedComponent, _extends({}, passableProps, passedProps));
	      };

	      return ReduxForm;
	    })(Component);

	    ReduxForm.displayName = 'ReduxForm(' + _getDisplayName2['default'](WrappedComponent) + ')';
	    ReduxForm.WrappedComponent = WrappedComponent;
	    ReduxForm.propTypes = {
	      // props:
	      asyncBlurFields: PropTypes.arrayOf(PropTypes.string),
	      asyncValidate: PropTypes.func,
	      dispatch: PropTypes.func.isRequired,
	      fields: PropTypes.arrayOf(PropTypes.string).isRequired,
	      form: PropTypes.object,
	      initialValues: PropTypes.any,
	      onSubmit: PropTypes.func,
	      propNamespace: PropTypes.string,
	      readonly: PropTypes.bool,
	      returnRejectedSubmitPromise: PropTypes.bool,
	      validate: PropTypes.func,

	      // actions:
	      addArrayValue: PropTypes.func.isRequired,
	      blur: PropTypes.func.isRequired,
	      change: PropTypes.func.isRequired,
	      destroy: PropTypes.func.isRequired,
	      focus: PropTypes.func.isRequired,
	      initialize: PropTypes.func.isRequired,
	      removeArrayValue: PropTypes.func.isRequired,
	      reset: PropTypes.func.isRequired,
	      startAsyncValidation: PropTypes.func.isRequired,
	      startSubmit: PropTypes.func.isRequired,
	      stopAsyncValidation: PropTypes.func.isRequired,
	      stopSubmit: PropTypes.func.isRequired,
	      submitFailed: PropTypes.func.isRequired,
	      swapArrayValues: PropTypes.func.isRequired,
	      touch: PropTypes.func.isRequired,
	      untouch: PropTypes.func.isRequired
	    };
	    ReduxForm.defaultProps = {
	      asyncBlurFields: [],
	      form: _reducer.initialState,
	      readonly: false,
	      returnRejectedSubmitPromise: false,
	      validate: function validate() {
	        return {};
	      }
	    };

	    // bind touch flags to blur and change
	    var unboundActions = _extends({}, importedActions, {
	      blur: _bindActionData2['default'](importedActions.blur, {
	        touch: !!config.touchOnBlur
	      }),
	      change: _bindActionData2['default'](importedActions.change, {
	        touch: !!config.touchOnChange
	      })
	    });

	    // make redux connector with or without form key
	    var decorate = formKey !== undefined && formKey !== null ? connect(_wrapMapStateToProps2['default'](mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName] && formState[formName][formKey];
	    }), _wrapMapDispatchToProps2['default'](mapDispatchToProps, _bindActionData2['default'](unboundActions, { form: formName, key: formKey })), mergeProps, options) : connect(_wrapMapStateToProps2['default'](mapStateToProps, function (state) {
	      var formState = getFormState(state, reduxMountPoint);
	      if (!formState) {
	        throw new Error('You need to mount the redux-form reducer at "' + reduxMountPoint + '"');
	      }
	      return formState && formState[formName];
	    }), _wrapMapDispatchToProps2['default'](mapDispatchToProps, _bindActionData2['default'](unboundActions, { form: formName })), mergeProps, options);

	    return decorate(ReduxForm);
	  };
	};

	exports['default'] = createHigherOrderComponent;
	module.exports = exports['default'];
	// contains dispatch

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var createPropTypes = function createPropTypes(_ref) {
	  var _ref$PropTypes = _ref.PropTypes;
	  var any = _ref$PropTypes.any;
	  var bool = _ref$PropTypes.bool;
	  var string = _ref$PropTypes.string;
	  var func = _ref$PropTypes.func;
	  var object = _ref$PropTypes.object;
	  return {
	    // State:
	    active: string, // currently active field
	    asyncValidating: bool.isRequired, // true if async validation is running
	    dirty: bool.isRequired, // true if any values are different from initialValues
	    error: any, // form-wide error from '_error' key in validation result
	    errors: object, // a map of errors corresponding to structure of form data (result of validation)
	    fields: object.isRequired, // the map of fields
	    formKey: any, // the form key if one was provided (used when doing multirecord forms)
	    invalid: bool.isRequired, // true if there are any validation errors
	    pristine: bool.isRequired, // true if the values are the same as initialValues
	    submitting: bool.isRequired, // true if the form is in the process of being submitted
	    submitFailed: bool.isRequired, // true if the form was submitted and failed for any reason
	    valid: bool.isRequired, // true if there are no validation errors
	    values: object.isRequired, // the values of the form as they will be submitted

	    // Actions:
	    asyncValidate: func.isRequired, // function to trigger async validation
	    destroyForm: func.isRequired, // action to destroy the form's data in Redux
	    handleSubmit: func.isRequired, // function to submit the form
	    initializeForm: func.isRequired, // action to initialize form data
	    resetForm: func.isRequired, // action to reset the form data to previously initialized values
	    touch: func.isRequired, // action to mark fields as touched
	    touchAll: func.isRequired, // action to mark ALL fields as touched
	    untouch: func.isRequired, // action to mark fields as untouched
	    untouchAll: func.isRequired // action to mark ALL fields as untouched
	  };
	};

	exports["default"] = createPropTypes;
	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _createReduxFormConnector = __webpack_require__(32);

	var _createReduxFormConnector2 = _interopRequireDefault(_createReduxFormConnector);

	var _hoistNonReactStatics = __webpack_require__(20);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	/**
	 * The decorator that is the main API to redux-form
	 */
	var createReduxForm = function createReduxForm(isReactNative, React, connect) {
	  var Component = React.Component;

	  var reduxFormConnector = _createReduxFormConnector2['default'](isReactNative, React, connect);
	  return function (config, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    return function (WrappedComponent) {
	      var ReduxFormConnector = reduxFormConnector(WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options);
	      var configWithDefaults = _extends({
	        touchOnBlur: true,
	        touchOnChange: false,
	        destroyOnUnmount: true
	      }, config);

	      var ConnectedForm = (function (_Component) {
	        _inherits(ConnectedForm, _Component);

	        function ConnectedForm() {
	          _classCallCheck(this, ConnectedForm);

	          _Component.apply(this, arguments);
	        }

	        ConnectedForm.prototype.render = function render() {
	          return React.createElement(ReduxFormConnector, _extends({}, configWithDefaults, this.props));
	        };

	        return ConnectedForm;
	      })(Component);

	      return _hoistNonReactStatics2['default'](ConnectedForm, WrappedComponent);
	    };
	  };
	};

	exports['default'] = createReduxForm;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _reactLazyCacheNoGetters = __webpack_require__(54);

	var _reactLazyCacheNoGetters2 = _interopRequireDefault(_reactLazyCacheNoGetters);

	var _getDisplayName = __webpack_require__(13);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _createHigherOrderComponent = __webpack_require__(29);

	var _createHigherOrderComponent2 = _interopRequireDefault(_createHigherOrderComponent);

	/**
	 * This component tracks props that affect how the form is mounted to the store. Normally these should not change,
	 * but if they do, the connected components below it need to be redefined.
	 */
	var createReduxFormConnector = function createReduxFormConnector(isReactNative, React, connect) {
	  return function (WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options) {
	    var Component = React.Component;
	    var PropTypes = React.PropTypes;

	    var ReduxFormConnector = (function (_Component) {
	      _inherits(ReduxFormConnector, _Component);

	      function ReduxFormConnector(props) {
	        _classCallCheck(this, ReduxFormConnector);

	        _Component.call(this, props);
	        this.cache = new _reactLazyCacheNoGetters2['default'](this, {
	          ReduxForm: {
	            params: [
	            // props that effect how redux-form connects to the redux store
	            'reduxMountPoint', 'form', 'formKey', 'getFormState'],
	            fn: _createHigherOrderComponent2['default'](props, isReactNative, React, connect, WrappedComponent, mapStateToProps, mapDispatchToProps, mergeProps, options)
	          }
	        });
	      }

	      ReduxFormConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        this.cache.componentWillReceiveProps(nextProps);
	      };

	      ReduxFormConnector.prototype.render = function render() {
	        var ReduxForm = this.cache.get('ReduxForm');
	        // remove some redux-form config-only props
	        var _props = this.props;
	        var reduxMountPoint = _props.reduxMountPoint;
	        var destroyOnUnmount = _props.destroyOnUnmount;
	        var form = _props.form;
	        var getFormState = _props.getFormState;
	        var touchOnBlur = _props.touchOnBlur;
	        var touchOnChange = _props.touchOnChange;

	        var passableProps = _objectWithoutProperties(_props, ['reduxMountPoint', 'destroyOnUnmount', 'form', 'getFormState', 'touchOnBlur', 'touchOnChange']);

	        // eslint-disable-line no-redeclare
	        return React.createElement(ReduxForm, passableProps);
	      };

	      return ReduxFormConnector;
	    })(Component);

	    ReduxFormConnector.displayName = 'ReduxFormConnector(' + _getDisplayName2['default'](WrappedComponent) + ')';
	    ReduxFormConnector.WrappedComponent = WrappedComponent;
	    ReduxFormConnector.propTypes = {
	      destroyOnUnmount: PropTypes.bool,
	      reduxMountPoint: PropTypes.string,
	      form: PropTypes.string.isRequired,
	      formKey: PropTypes.string,
	      getFormState: PropTypes.func,
	      touchOnBlur: PropTypes.bool,
	      touchOnChange: PropTypes.bool
	    };
	    ReduxFormConnector.defaultProps = {
	      reduxMountPoint: 'form',
	      getFormState: function getFormState(state, reduxMountPoint) {
	        return state[reduxMountPoint];
	      }
	    };
	    return ReduxFormConnector;
	  };
	};

	exports['default'] = createReduxFormConnector;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getValue = __webpack_require__(10);

	var _getValue2 = _interopRequireDefault(_getValue);

	var createOnBlur = function createOnBlur(name, blur, isReactNative, afterBlur) {
	  return function (event) {
	    var value = _getValue2['default'](event, isReactNative);
	    blur(name, value);
	    if (afterBlur) {
	      afterBlur(name, value);
	    }
	  };
	};
	exports['default'] = createOnBlur;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getValue = __webpack_require__(10);

	var _getValue2 = _interopRequireDefault(_getValue);

	var createOnChange = function createOnChange(name, change, isReactNative) {
	  return function (event) {
	    return change(name, _getValue2['default'](event, isReactNative));
	  };
	};
	exports['default'] = createOnChange;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createOnDragStart = __webpack_require__(9);

	var createOnDrop = function createOnDrop(name, change) {
	  return function (event) {
	    change(name, event.dataTransfer.getData(_createOnDragStart.dataKey));
	  };
	};
	exports['default'] = createOnDrop;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var createOnFocus = function createOnFocus(name, focus) {
	  return function () {
	    return focus(name);
	  };
	};
	exports["default"] = createOnFocus;
	module.exports = exports["default"];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _silenceEvent = __webpack_require__(12);

	var _silenceEvent2 = _interopRequireDefault(_silenceEvent);

	var silenceEvents = function silenceEvents(fn) {
	  return function (event) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return _silenceEvent2['default'](event) ? fn.apply(undefined, args) : fn.apply(undefined, [event].concat(args));
	  };
	};

	exports['default'] = silenceEvents;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPromise = __webpack_require__(6);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var _isValid = __webpack_require__(2);

	var _isValid2 = _interopRequireDefault(_isValid);

	var handleSubmit = function handleSubmit(submit, values, props, asyncValidate) {
	  var dispatch = props.dispatch;
	  var fields = props.fields;
	  var startSubmit = props.startSubmit;
	  var stopSubmit = props.stopSubmit;
	  var submitFailed = props.submitFailed;
	  var returnRejectedSubmitPromise = props.returnRejectedSubmitPromise;
	  var touch = props.touch;
	  var validate = props.validate;

	  var syncErrors = validate(values, props);
	  touch.apply(undefined, fields); // touch all fields
	  if (_isValid2['default'](syncErrors)) {
	    var doSubmit = function doSubmit() {
	      var result = submit(values, dispatch);
	      if (_isPromise2['default'](result)) {
	        startSubmit();
	        return result.then(function (submitResult) {
	          stopSubmit();
	          return submitResult;
	        }, function (submitError) {
	          stopSubmit(submitError);
	          if (returnRejectedSubmitPromise) {
	            return Promise.reject(submitError);
	          }
	        });
	      }
	      return result;
	    };
	    var asyncValidateResult = asyncValidate();
	    return _isPromise2['default'](asyncValidateResult) ?
	    // asyncValidateResult will be rejected if async validation failed
	    asyncValidateResult.then(doSubmit, function () {
	      submitFailed();
	      return returnRejectedSubmitPromise ? Promise.reject() : Promise.resolve();
	    }) : doSubmit(); // no async validation, so submit
	  }
	  submitFailed();
	};

	exports['default'] = handleSubmit;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fieldValue = __webpack_require__(1);

	var makeEntry = function makeEntry(value) {
	  return _fieldValue.makeFieldValue(value === undefined ? {} : { initial: value, value: value });
	};

	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var initializeState = function initializeState(values, fields) {
	  var state = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  if (!fields) {
	    throw new Error('fields must be passed when initializing state');
	  }
	  if (!values || !fields.length) {
	    return state;
	  }
	  var initializeField = function initializeField(_x2, _x3, _x4) {
	    var _again = true;

	    _function: while (_again) {
	      var path = _x2,
	          src = _x3,
	          dest = _x4;
	      _again = false;

	      var dotIndex = path.indexOf('.');
	      if (dotIndex === 0) {
	        _x2 = path.substring(1);
	        _x3 = src;
	        _x4 = dest;
	        _again = true;
	        dotIndex = undefined;
	        continue _function;
	      }
	      var openIndex = path.indexOf('[');
	      var closeIndex = path.indexOf(']');
	      var result = dest || {};
	      if (dotIndex >= 0 && (openIndex < 0 || dotIndex < openIndex)) {
	        // is dot notation
	        var key = path.substring(0, dotIndex);
	        result[key] = src[key] && initializeField(path.substring(dotIndex + 1), src[key], result[key] || {});
	      } else if (openIndex >= 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	        (function () {
	          // is array notation
	          if (closeIndex < 0) {
	            throw new Error('found \'[\' but no \']\': \'' + path + '\'');
	          }
	          var key = path.substring(0, openIndex);
	          var srcArray = src[key];
	          var destArray = result[key];
	          var rest = path.substring(closeIndex + 1);
	          if (Array.isArray(srcArray)) {
	            if (rest.length) {
	              // need to keep recursing
	              result[key] = srcArray.map(function (srcValue, srcIndex) {
	                return initializeField(rest, srcValue, destArray && destArray[srcIndex]);
	              });
	            } else {
	              result[key] = srcArray.map(function (srcValue) {
	                return makeEntry(srcValue);
	              });
	            }
	          } else {
	            result[key] = [];
	          }
	        })();
	      } else {
	        result[path] = makeEntry(src && src[path]);
	      }
	      return result;
	    }
	  };
	  return fields.reduce(function (accumulator, field) {
	    return initializeField(field, values, accumulator);
	  }, _extends({}, state));
	};

	exports['default'] = initializeState;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPristine;

	function isPristine(initial, data) {
	  if (initial === data) {
	    return true;
	  }
	  if (typeof initial === 'boolean' || typeof data === 'boolean') {
	    return initial === data;
	  } else if (initial instanceof Date && data instanceof Date) {
	    return initial.getTime() === data.getTime();
	  } else if (initial && typeof initial === 'object') {
	    if (!data || typeof data !== 'object') {
	      return false;
	    }
	    var initialKeys = Object.keys(initial);
	    var dataKeys = Object.keys(data);
	    if (initialKeys.length !== dataKeys.length) {
	      return false;
	    }
	    for (var index = 0; index < dataKeys.length; index++) {
	      var key = dataKeys[index];
	      if (!isPristine(initial[key], data[key])) {
	        return false;
	      }
	    }
	  } else if (initial || data) {
	    // allow '' to equate to undefined or null
	    return initial === data;
	  }
	  return true;
	}

	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _eventsCreateOnBlur = __webpack_require__(33);

	var _eventsCreateOnBlur2 = _interopRequireDefault(_eventsCreateOnBlur);

	var _eventsCreateOnChange = __webpack_require__(34);

	var _eventsCreateOnChange2 = _interopRequireDefault(_eventsCreateOnChange);

	var _eventsCreateOnDragStart = __webpack_require__(9);

	var _eventsCreateOnDragStart2 = _interopRequireDefault(_eventsCreateOnDragStart);

	var _eventsCreateOnDrop = __webpack_require__(35);

	var _eventsCreateOnDrop2 = _interopRequireDefault(_eventsCreateOnDrop);

	var _eventsCreateOnFocus = __webpack_require__(36);

	var _eventsCreateOnFocus2 = _interopRequireDefault(_eventsCreateOnFocus);

	var _silencePromise = __webpack_require__(46);

	var _silencePromise2 = _interopRequireDefault(_silencePromise);

	var _read = __webpack_require__(16);

	var _read2 = _interopRequireDefault(_read);

	var _updateField = __webpack_require__(47);

	var _updateField2 = _interopRequireDefault(_updateField);

	var readField = function readField(_x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {
	  var _arguments = arguments;
	  var _again = true;

	  _function: while (_again) {
	    var state = _x2,
	        fieldName = _x3,
	        pathToHere = _x4,
	        fields = _x5,
	        syncErrors = _x6,
	        asyncValidate = _x7,
	        isReactNative = _x8,
	        props = _x9;
	    if (pathToHere === undefined) pathToHere = '';
	    _again = false;
	    var callback = _arguments.length <= 8 || _arguments[8] === undefined ? function () {
	      return null;
	    } : _arguments[8];
	    var asyncBlurFields = props.asyncBlurFields;
	    var blur = props.blur;
	    var change = props.change;
	    var focus = props.focus;
	    var form = props.form;
	    var initialValues = props.initialValues;
	    var readonly = props.readonly;
	    var addArrayValue = props.addArrayValue;
	    var removeArrayValue = props.removeArrayValue;
	    var swapArrayValues = props.swapArrayValues;

	    var dotIndex = fieldName.indexOf('.');
	    var openIndex = fieldName.indexOf('[');
	    var closeIndex = fieldName.indexOf(']');
	    if (openIndex > 0 && closeIndex !== openIndex + 1) {
	      throw new Error('found [ not followed by ]');
	    }
	    if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	      var _ret = (function () {
	        // array field
	        var key = fieldName.substring(0, openIndex);
	        var rest = fieldName.substring(closeIndex + 1);
	        if (rest[0] === '.') {
	          rest = rest.substring(1);
	        }
	        var stateArray = state && state[key] || [];
	        if (!fields[key]) {
	          fields[key] = [];
	          Object.defineProperty(fields[key], 'addField', {
	            value: function value(_value, index) {
	              return addArrayValue(pathToHere + key, _value, index);
	            }
	          });
	          Object.defineProperty(fields[key], 'removeField', {
	            value: function value(index) {
	              return removeArrayValue(pathToHere + key, index);
	            }
	          });
	          Object.defineProperty(fields[key], 'swapFields', {
	            value: function value(indexA, indexB) {
	              return swapArrayValues(pathToHere + key, indexA, indexB);
	            }
	          });
	        }
	        var fieldArray = fields[key];
	        stateArray.forEach(function (fieldState, index) {
	          if (rest && !fieldArray[index]) {
	            fieldArray[index] = {};
	          }
	          var dest = rest ? fieldArray[index] : {};
	          var result = readField(fieldState, rest, '' + pathToHere + key + '[' + index + ']' + (rest ? '.' : ''), dest, syncErrors, asyncValidate, isReactNative, props, callback);
	          if (!rest) {
	            // if nothing after [] in field name, assign directly to array
	            fieldArray[index] = result;
	          }
	        });
	        if (fieldArray.length > stateArray.length) {
	          // remove extra items that aren't in state array
	          fieldArray.splice(stateArray.length, fieldArray.length - stateArray.length);
	        }
	        return {
	          v: fieldArray
	        };
	      })();

	      if (typeof _ret === 'object') return _ret.v;
	    }
	    if (dotIndex > 0) {
	      // subobject field
	      var key = fieldName.substring(0, dotIndex);
	      var rest = fieldName.substring(dotIndex + 1);
	      if (!fields[key]) {
	        fields[key] = {};
	      }
	      _arguments = [_x2 = state[key] || {}, _x3 = rest, _x4 = pathToHere + key + '.', _x5 = fields[key], _x6 = syncErrors, _x7 = asyncValidate, _x8 = isReactNative, _x9 = props, callback];
	      _again = true;
	      callback = asyncBlurFields = blur = change = focus = form = initialValues = readonly = addArrayValue = removeArrayValue = swapArrayValues = dotIndex = openIndex = closeIndex = _ret = key = rest = undefined;
	      continue _function;
	    }
	    var name = pathToHere + fieldName;
	    var field = fields[fieldName] || {};
	    if (field.name !== name) {
	      var onChange = _eventsCreateOnChange2['default'](name, change, isReactNative);
	      var initialFormValue = _read2['default'](name + '.initial', form);
	      var initialValue = initialFormValue || _read2['default'](name, initialValues);
	      field.name = name;
	      field.defaultChecked = initialValue === true;
	      field.defaultValue = initialValue;
	      field.initialValue = initialValue;
	      if (!readonly) {
	        field.onBlur = _eventsCreateOnBlur2['default'](name, blur, isReactNative, ~asyncBlurFields.indexOf(name) && function (blurName, blurValue) {
	          return _silencePromise2['default'](asyncValidate(blurName, blurValue));
	        });
	        field.onChange = onChange;
	        field.onDragStart = _eventsCreateOnDragStart2['default'](name, function () {
	          return field.value;
	        });
	        field.onDrop = _eventsCreateOnDrop2['default'](name, change);
	        field.onFocus = _eventsCreateOnFocus2['default'](name, focus);
	        field.onUpdate = onChange; // alias to support belle. https://github.com/nikgraf/belle/issues/58
	      }
	      field.valid = true;
	      field.invalid = false;
	      Object.defineProperty(field, '_isField', { value: true });
	    }

	    var fieldState = (fieldName ? state[fieldName] : state) || {};
	    var syncError = _read2['default'](name, syncErrors);
	    var updated = _updateField2['default'](field, fieldState, name === form._active, syncError);
	    if (fieldName || fields[fieldName] !== updated) {
	      fields[fieldName] = updated;
	    }
	    callback(updated);
	    return updated;
	  }
	};

	exports['default'] = readField;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _readField = __webpack_require__(41);

	var _readField2 = _interopRequireDefault(_readField);

	var _write = __webpack_require__(18);

	var _write2 = _interopRequireDefault(_write);

	var _getValues = __webpack_require__(14);

	var _getValues2 = _interopRequireDefault(_getValues);

	var _removeField = __webpack_require__(43);

	var _removeField2 = _interopRequireDefault(_removeField);

	/**
	 * Reads props and generates (or updates) field structure
	 */
	var readFields = function readFields(props, previousProps, myFields, asyncValidate, isReactNative) {
	  var fields = props.fields;
	  var form = props.form;
	  var validate = props.validate;

	  var previousFields = previousProps.fields;
	  var values = _getValues2['default'](fields, form);
	  var syncErrors = validate(values, props);
	  var errors = {};
	  var formError = syncErrors._error || form._error;
	  var allValid = !formError;
	  var allPristine = true;
	  var tally = function tally(field) {
	    if (field.error) {
	      errors = _write2['default'](field.name, field.error, errors);
	      allValid = false;
	    }
	    if (field.dirty) {
	      allPristine = false;
	    }
	  };
	  var fieldObjects = previousFields ? previousFields.reduce(function (accumulator, previousField) {
	    return ~fields.indexOf(previousField) ? accumulator : _removeField2['default'](accumulator, previousField);
	  }, _extends({}, myFields)) : _extends({}, myFields);
	  fields.forEach(function (name) {
	    _readField2['default'](form, name, undefined, fieldObjects, syncErrors, asyncValidate, isReactNative, props, tally);
	  });
	  Object.defineProperty(fieldObjects, '_meta', {
	    value: {
	      allPristine: allPristine,
	      allValid: allValid,
	      values: values,
	      errors: errors,
	      formError: formError
	    }
	  });
	  return fieldObjects;
	};
	exports['default'] = readFields;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var without = function without(object, key) {
	  var copy = _extends({}, object);
	  delete copy[key];
	  return copy;
	};

	var removeField = function removeField(fields, path) {
	  var dotIndex = path.indexOf('.');
	  var openIndex = path.indexOf('[');
	  var closeIndex = path.indexOf(']');
	  if (openIndex > 0 && closeIndex !== openIndex + 1) {
	    throw new Error('found [ not followed by ]');
	  }
	  if (openIndex > 0 && (dotIndex < 0 || openIndex < dotIndex)) {
	    var _extends2;

	    var _ret = (function () {
	      // array field
	      var key = path.substring(0, openIndex);
	      if (!Array.isArray(fields[key])) {
	        return {
	          v: without(fields, key)
	        };
	      }
	      var rest = path.substring(closeIndex + 1);
	      if (rest[0] === '.') {
	        rest = rest.substring(1);
	      }
	      if (rest) {
	        var _ret2 = (function () {
	          var copy = [];
	          fields[key].forEach(function (item, index) {
	            var result = removeField(item, rest);
	            if (Object.keys(result).length) {
	              copy[index] = result;
	            }
	          });
	          return {
	            v: {
	              v: copy.length ? _extends({}, fields, (_extends2 = {}, _extends2[key] = copy, _extends2)) : without(fields, key)
	            }
	          };
	        })();

	        if (typeof _ret2 === 'object') return _ret2.v;
	      }
	      return {
	        v: without(fields, key)
	      };
	    })();

	    if (typeof _ret === 'object') return _ret.v;
	  }
	  if (dotIndex > 0) {
	    var _extends3;

	    // subobject field
	    var key = path.substring(0, dotIndex);
	    var rest = path.substring(dotIndex + 1);
	    if (!fields[key]) {
	      return fields;
	    }
	    var result = removeField(fields[key], rest);
	    return Object.keys(result).length ? _extends({}, fields, (_extends3 = {}, _extends3[key] = removeField(fields[key], rest), _extends3)) : without(fields, key);
	  }
	  return without(fields, path);
	};

	exports['default'] = removeField;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _fieldValue = __webpack_require__(1);

	var reset = function reset(value) {
	  return _fieldValue.makeFieldValue(value === undefined || value && value.initial === undefined ? {} : { initial: value.initial, value: value.initial });
	};

	/**
	 * Sets the initial values into the state and returns a new copy of the state
	 */
	var resetState = function resetState(values) {
	  return values ? Object.keys(values).reduce(function (accumulator, key) {
	    var value = values[key];
	    if (Array.isArray(value)) {
	      accumulator[key] = value.map(function (item) {
	        return _fieldValue.isFieldValue(item) ? reset(item) : resetState(item);
	      });
	    } else if (value) {
	      if (_fieldValue.isFieldValue(value)) {
	        accumulator[key] = reset(value);
	      } else if (typeof value === 'object' && value !== null) {
	        accumulator[key] = resetState(value);
	      } else {
	        accumulator[key] = value;
	      }
	    }
	    return accumulator;
	  }, {}) : values;
	};

	exports['default'] = resetState;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fieldValue = __webpack_require__(1);

	var isMetaKey = function isMetaKey(key) {
	  return key[0] === '_';
	};

	/**
	 * Sets an error on a field deep in the tree, returning a new copy of the state
	 */
	var setErrors = function setErrors(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var state = _x,
	        errors = _x2,
	        destKey = _x3;
	    _again = false;

	    var clear = function clear() {
	      if (Array.isArray(state)) {
	        return state.map(function (stateItem, index) {
	          return setErrors(stateItem, errors && errors[index], destKey);
	        });
	      }
	      if (state && typeof state === 'object') {
	        var result = Object.keys(state).reduce(function (accumulator, key) {
	          var _extends2;

	          return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[key] = setErrors(state[key], errors && errors[key], destKey), _extends2));
	        }, state);
	        if (_fieldValue.isFieldValue(state)) {
	          _fieldValue.makeFieldValue(result);
	        }
	        return result;
	      }
	      return _fieldValue.makeFieldValue(state);
	    };
	    if (!errors) {
	      if (!state) {
	        return state;
	      }
	      if (state[destKey]) {
	        var copy = _extends({}, state);
	        delete copy[destKey];
	        return _fieldValue.makeFieldValue(copy);
	      }
	      return clear();
	    }
	    if (typeof errors === 'string') {
	      var _extends3;

	      return _fieldValue.makeFieldValue(_extends({}, state, (_extends3 = {}, _extends3[destKey] = errors, _extends3)));
	    }
	    if (Array.isArray(errors)) {
	      if (!state || Array.isArray(state)) {
	        var _ret = (function () {
	          var copy = (state || []).map(function (stateItem, index) {
	            return setErrors(stateItem, errors[index], destKey);
	          });
	          errors.forEach(function (errorItem, index) {
	            return copy[index] = setErrors(copy[index], errorItem, destKey);
	          });
	          return {
	            v: copy
	          };
	        })();

	        if (typeof _ret === 'object') return _ret.v;
	      }
	      _x = state;
	      _x2 = errors[0];
	      _x3 = destKey;
	      _again = true;
	      clear = copy = _extends3 = _ret = undefined;
	      continue _function;
	      // use first error
	    }
	    if (_fieldValue.isFieldValue(state)) {
	      var _extends4;

	      return _fieldValue.makeFieldValue(_extends({}, state, (_extends4 = {}, _extends4[destKey] = errors, _extends4)));
	    }
	    var errorKeys = Object.keys(errors);
	    if (!errorKeys.length && !state) {
	      return state;
	    }
	    return errorKeys.reduce(function (accumulator, key) {
	      var _extends5;

	      return isMetaKey(key) ? accumulator : _extends({}, accumulator, (_extends5 = {}, _extends5[key] = setErrors(state && state[key], errors[key], destKey), _extends5));
	    }, clear() || {});
	  }
	};

	exports['default'] = setErrors;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPromise = __webpack_require__(6);

	var _isPromise2 = _interopRequireDefault(_isPromise);

	var noop = function noop() {
	  return undefined;
	};

	var silencePromise = function silencePromise(promise) {
	  return _isPromise2['default'](promise) ? promise.then(noop, noop) : promise;
	};

	exports['default'] = silencePromise;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPristine = __webpack_require__(40);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	var _isValid = __webpack_require__(2);

	var _isValid2 = _interopRequireDefault(_isValid);

	/**
	 * Updates a field object from the store values
	 */
	var updateField = function updateField(field, formField, active, syncError) {
	  var diff = {};

	  // update field value
	  if (field.value !== formField.value) {
	    diff.value = formField.value;
	    diff.checked = typeof formField.value === 'boolean' ? formField.value : undefined;
	  }

	  // update dirty/pristine
	  var pristine = _isPristine2['default'](formField.value, formField.initial);
	  if (field.pristine !== pristine) {
	    diff.dirty = !pristine;
	    diff.pristine = pristine;
	  }

	  // update field error
	  var error = syncError || formField.submitError || formField.asyncError;
	  if (error !== field.error) {
	    diff.error = error;
	  }
	  var valid = _isValid2['default'](error);
	  if (field.valid !== valid) {
	    diff.invalid = !valid;
	    diff.valid = valid;
	  }

	  if (active !== field.active) {
	    diff.active = active;
	  }
	  var touched = !!formField.touched;
	  if (touched !== field.touched) {
	    diff.touched = touched;
	  }
	  var visited = !!formField.visited;
	  if (visited !== field.visited) {
	    diff.visited = visited;
	  }

	  if (formField.initial && formField.initial !== field.initialValue) {
	    field.defaultChecked = formField.initial === true;
	    field.defaultValue = formField.initial;
	    field.initialValue = formField.initial;
	  }

	  return Object.keys(diff).length ? _extends({}, field, diff) : field;
	};
	exports['default'] = updateField;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _redux = __webpack_require__(23);

	var wrapMapDispatchToProps = function wrapMapDispatchToProps(mapDispatchToProps, actionCreators) {
	  if (mapDispatchToProps) {
	    if (typeof mapDispatchToProps === 'function') {
	      if (mapDispatchToProps.length > 1) {
	        return function (dispatch, ownProps) {
	          return _extends({
	            dispatch: dispatch
	          }, mapDispatchToProps(dispatch, ownProps), _redux.bindActionCreators(actionCreators, dispatch));
	        };
	      }
	      return function (dispatch) {
	        return _extends({
	          dispatch: dispatch
	        }, mapDispatchToProps(dispatch), _redux.bindActionCreators(actionCreators, dispatch));
	      };
	    }
	    return function (dispatch) {
	      return _extends({
	        dispatch: dispatch
	      }, _redux.bindActionCreators(mapDispatchToProps, dispatch), _redux.bindActionCreators(actionCreators, dispatch));
	    };
	  }
	  return function (dispatch) {
	    return _extends({
	      dispatch: dispatch
	    }, _redux.bindActionCreators(actionCreators, dispatch));
	  };
	};

	exports['default'] = wrapMapDispatchToProps;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var wrapMapStateToProps = function wrapMapStateToProps(mapStateToProps, getForm) {
	  if (mapStateToProps) {
	    if (typeof mapStateToProps !== 'function') {
	      throw new Error('mapStateToProps must be a function');
	    }
	    if (mapStateToProps.length > 1) {
	      return function (state, ownProps) {
	        return _extends({}, mapStateToProps(state, ownProps), {
	          form: getForm(state)
	        });
	      };
	    }
	    return function (state) {
	      return _extends({}, mapStateToProps(state), {
	        form: getForm(state)
	      });
	    };
	  }
	  return function (state) {
	    return {
	      form: getForm(state)
	    };
	  };
	};

	exports['default'] = wrapMapStateToProps;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 51 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 52 */
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _deepEqual = __webpack_require__(19);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	function intersects(array1, array2) {
	  return !!(array1 && array2 && array1.some(function (item) {
	    return ~array2.indexOf(item);
	  }));
	}

	var LazyCache = (function () {
	  function LazyCache(component, calculators) {
	    var _this = this;

	    _classCallCheck(this, LazyCache);

	    this.component = component;
	    this.allProps = [];
	    this.cache = Object.keys(calculators).reduce(function (accumulator, key) {
	      var _extends2;

	      var calculator = calculators[key];
	      var fn = calculator.fn;
	      var paramNames = calculator.params;
	      paramNames.forEach(function (param) {
	        if (! ~_this.allProps.indexOf(param)) {
	          _this.allProps.push(param);
	        }
	      });
	      return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = {
	        value: undefined,
	        props: paramNames,
	        fn: fn
	      }, _extends2));
	    }, {});
	  }

	  LazyCache.prototype.get = function get(key) {
	    var component = this.component;
	    var _cache$key = this.cache[key];
	    var value = _cache$key.value;
	    var fn = _cache$key.fn;
	    var props = _cache$key.props;

	    if (value !== undefined) {
	      return value;
	    }
	    var params = props.map(function (prop) {
	      return component.props[prop];
	    });
	    var result = fn.apply(undefined, params);
	    this.cache[key].value = result;
	    return result;
	  };

	  LazyCache.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;

	    var component = this.component;

	    var diffProps = [];
	    this.allProps.forEach(function (prop) {
	      if (!_deepEqual2['default'](component.props[prop], nextProps[prop])) {
	        diffProps.push(prop);
	      }
	    });
	    if (diffProps.length) {
	      Object.keys(this.cache).forEach(function (key) {
	        if (intersects(diffProps, _this2.cache[key].props)) {
	          delete _this2.cache[key].value; // uncache value
	        }
	      });
	    }
	  };

	  return LazyCache;
	})();

	exports['default'] = LazyCache;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(3);

	var Component = _require.Component;
	var PropTypes = _require.PropTypes;
	var Children = _require.Children;

	var storeShape = __webpack_require__(21);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(3);

	var Component = _require.Component;
	var createElement = _require.createElement;

	var storeShape = __webpack_require__(21);
	var shallowEqual = __webpack_require__(59);
	var isPlainObject = __webpack_require__(58);
	var wrapActionCreators = __webpack_require__(60);
	var hoistStatics = __webpack_require__(20);
	var invariant = __webpack_require__(52);

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

	    return hoistStatics(Connect, WrappedComponent);
	  };
	}

	module.exports = connect;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Provider = __webpack_require__(55);
	var connect = __webpack_require__(56);

	module.exports = { Provider: Provider, connect: connect };

/***/ },
/* 58 */
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
/* 59 */
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _redux = __webpack_require__(23);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

	module.exports = wrapActionCreators;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(24);

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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(26);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(22);

	var _isPlainObject = __webpack_require__(25);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _mapValues = __webpack_require__(26);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _pick = __webpack_require__(64);

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

	    if (true) {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return hasChanged ? finalState : state;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 64 */
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

/***/ }
/******/ ])
});
;