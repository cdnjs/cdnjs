(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"));
	else
		root["ReduxForm"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reducer = __webpack_require__(5);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _reduxForm = __webpack_require__(6);

	var _reduxForm2 = _interopRequireDefault(_reduxForm);

	var _mapValues = __webpack_require__(1);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var _bindActionData = __webpack_require__(4);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _actions = __webpack_require__(3);

	var actions = _interopRequireWildcard(_actions);

	// bind form as first parameter of action creators
	var boundActions = _extends({}, _mapValues2['default'](_extends({}, actions, {
	  initializeWithKey: function initializeWithKey(key, data) {
	    return _bindActionData2['default'](actions.initialize, { key: key })(data);
	  }
	}), function (action) {
	  return function (form) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return _bindActionData2['default'](action, { form: form }).apply(undefined, args);
	  };
	}));

	var blur = boundActions.blur;
	var change = boundActions.change;
	var initialize = boundActions.initialize;
	var initializeWithKey = boundActions.initializeWithKey;
	var reset = boundActions.reset;
	var startAsyncValidation = boundActions.startAsyncValidation;
	var stopAsyncValidation = boundActions.stopAsyncValidation;
	var touch = boundActions.touch;
	var untouch = boundActions.untouch;

	exports.blur = blur;
	exports.change = change;
	exports.reducer = _reducer2['default'];
	exports.initialize = initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.touch = touch;
	exports.untouch = untouch;
	exports['default'] = _reduxForm2['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Maps all the values in the given object through the given function and saves them, by key, to a result object
	 */
	"use strict";

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = mapValues;

	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (accumulator, key) {
	    var _extends2;

	    return _extends({}, accumulator, (_extends2 = {}, _extends2[key] = fn(obj[key], key), _extends2));
	  }, {});
	}

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var BLUR = 'redux-form/BLUR';
	exports.BLUR = BLUR;
	var CHANGE = 'redux-form/CHANGE';
	exports.CHANGE = CHANGE;
	var INITIALIZE = 'redux-form/INITIALIZE';
	exports.INITIALIZE = INITIALIZE;
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
	var TOUCH = 'redux-form/TOUCH';
	exports.TOUCH = TOUCH;
	var UNTOUCH = 'redux-form/UNTOUCH';
	exports.UNTOUCH = UNTOUCH;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.blur = blur;
	exports.change = change;
	exports.initialize = initialize;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.touch = touch;
	exports.untouch = untouch;

	var _actionTypes = __webpack_require__(2);

	function blur(field, value) {
	  return { type: _actionTypes.BLUR, field: field, value: value };
	}

	function change(field, value) {
	  return { type: _actionTypes.CHANGE, field: field, value: value };
	}

	function initialize(data) {
	  return { type: _actionTypes.INITIALIZE, data: data };
	}

	function reset() {
	  return { type: _actionTypes.RESET };
	}

	function startAsyncValidation() {
	  return { type: _actionTypes.START_ASYNC_VALIDATION };
	}

	function startSubmit() {
	  return { type: _actionTypes.START_SUBMIT };
	}

	function stopAsyncValidation(errors) {
	  return { type: _actionTypes.STOP_ASYNC_VALIDATION, errors: errors };
	}

	function stopSubmit() {
	  return { type: _actionTypes.STOP_SUBMIT };
	}

	function touch() {
	  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
	    fields[_key] = arguments[_key];
	  }

	  return { type: _actionTypes.TOUCH, fields: fields };
	}

	function untouch() {
	  for (var _len2 = arguments.length, fields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fields[_key2] = arguments[_key2];
	  }

	  return { type: _actionTypes.UNTOUCH, fields: fields };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = bindActionData;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mapValues = __webpack_require__(1);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	/**
	 * Adds additional properties to the results of the function or map of functions passed
	 */

	function bindActionData(action, data) {
	  return typeof action === 'function' ? function () {
	    return _extends({}, action.apply(undefined, arguments), data);
	  } : _mapValues2['default'](action, function (value) {
	    return bindActionData(value, data);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _actionTypes = __webpack_require__(2);

	var _mapValues = __webpack_require__(1);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	var initialState = {
	  asyncErrors: { valid: true },
	  asyncValidating: false,
	  data: {},
	  initial: {},
	  submitting: false,
	  touched: {}
	};

	exports.initialState = initialState;
	var reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

	  var _extends2, _extends4;

	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  switch (action.type) {
	    case _actionTypes.BLUR:
	      var blurDiff = {
	        data: _extends({}, state.data, (_extends2 = {}, _extends2[action.field] = action.value, _extends2))
	      };
	      if (action.touch) {
	        var _extends3;

	        blurDiff.touched = _extends({}, state.touched, (_extends3 = {}, _extends3[action.field] = true, _extends3));
	      }
	      return _extends({}, state, blurDiff);
	    case _actionTypes.CHANGE:
	      var _state$asyncErrors = state.asyncErrors,
	          oldError = _state$asyncErrors[action.field],
	          valid = _state$asyncErrors.valid,
	          otherErrors = _objectWithoutProperties(_state$asyncErrors, [action.field, 'valid']);

	      var changeDiff = {
	        data: _extends({}, state.data, (_extends4 = {}, _extends4[action.field] = action.value, _extends4)),
	        asyncErrors: _extends({}, otherErrors, {
	          valid: !Object.keys(otherErrors).length
	        })
	      };
	      delete changeDiff.asyncErrors[action.field];

	      if (action.touch) {
	        var _extends5;

	        changeDiff.touched = _extends({}, state.touched, (_extends5 = {}, _extends5[action.field] = true, _extends5));
	      }
	      return _extends({}, state, changeDiff);
	    case _actionTypes.INITIALIZE:
	      return {
	        asyncErrors: {},
	        asyncValidating: false,
	        data: action.data,
	        initial: action.data,
	        submitting: false,
	        touched: {}
	      };
	    case _actionTypes.RESET:
	      return {
	        asyncErrors: {},
	        asyncValidating: false,
	        data: state.initial,
	        initial: state.initial,
	        submitting: false,
	        touched: {}
	      };
	    case _actionTypes.START_ASYNC_VALIDATION:
	      return _extends({}, state, {
	        asyncValidating: true
	      });
	    case _actionTypes.START_SUBMIT:
	      return _extends({}, state, {
	        submitting: true
	      });
	    case _actionTypes.STOP_ASYNC_VALIDATION:
	      return _extends({}, state, {
	        asyncValidating: false,
	        asyncErrors: action.errors
	      });
	    case _actionTypes.STOP_SUBMIT:
	      return _extends({}, state, {
	        submitting: false
	      });
	    case _actionTypes.TOUCH:
	      var touchDiff = {};
	      action.fields.forEach(function (field) {
	        if (typeof field !== 'string') {
	          throw new Error('fields passed to touch() must be strings');
	        }
	        touchDiff[field] = true;
	      });
	      return _extends({}, state, {
	        touched: _extends({}, state.touched, touchDiff)
	      });
	    case _actionTypes.UNTOUCH:
	      var untouchDiff = {};
	      action.fields.forEach(function (field) {
	        if (typeof field !== 'string') {
	          throw new Error('fields passed to untouch() must be strings');
	        }
	        untouchDiff[field] = false;
	      });
	      return _extends({}, state, {
	        touched: _extends({}, state.touched, untouchDiff)
	      });
	    default:
	      return state;
	  }
	};

	function formReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _extends8;

	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var form = action.form;
	  var key = action.key;

	  var rest = _objectWithoutProperties(action, ['form', 'key']);

	  if (!form) {
	    return state;
	  }
	  if (key) {
	    var _extends6, _extends7;

	    return _extends({}, state, (_extends7 = {}, _extends7[form] = _extends({}, state[form], (_extends6 = {}, _extends6[key] = reducer((state[form] || {})[key], rest), _extends6)), _extends7));
	  }
	  return _extends({}, state, (_extends8 = {}, _extends8[form] = reducer(state[form], rest), _extends8));
	}

	formReducer.plugin = function (reducers) {
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var result = formReducer(state, action);
	    return _extends({}, result, _mapValues2['default'](reducers, function (red, key) {
	      return red(result[key] || initialState, action);
	    }));
	  };
	};

	exports['default'] = formReducer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = reduxForm;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(8);

	var _react2 = _interopRequireDefault(_react);

	var _actions = __webpack_require__(3);

	var formActions = _interopRequireWildcard(_actions);

	var _util = __webpack_require__(7);

	var _bindActionData = __webpack_require__(4);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _reducer = __webpack_require__(5);

	function getSubForm(form, formName, formKey) {
	  if (form && form[formName]) {
	    if (formKey) {
	      if (form[formName][formKey]) {
	        return form[formName][formKey];
	      }
	    } else {
	      return form[formName];
	    }
	  }
	  return _reducer.initialState;
	}

	function createReduxFormDecorator(formName, fields, syncValidate, touchOnBlur, touchOnChange, asyncValidate, asyncBlurFields) {
	  function combineValidationErrors(form) {
	    var syncErrors = syncValidate(form.data);
	    var asyncErrors = _extends({ valid: true }, form.asyncErrors);
	    var valid = !!(syncErrors.valid && asyncErrors.valid); // !! to convert falsy to boolean
	    return _extends({}, syncErrors, asyncErrors, {
	      valid: valid
	    });
	  }

	  return function (DecoratedComponent) {
	    return (function (_Component) {
	      _inherits(ReduxForm, _Component);

	      function ReduxForm() {
	        _classCallCheck(this, ReduxForm);

	        _Component.apply(this, arguments);
	      }

	      ReduxForm.prototype.render = function render() {
	        var _this = this;

	        var _props = this.props;
	        var formName = _props.formName;
	        var form = _props.form;
	        var formKey = _props.formKey;
	        var dispatch = _props.dispatch;

	        var passableProps = _objectWithoutProperties(_props, ['formName', 'form', 'formKey', 'dispatch']);

	        // eslint-disable-line no-shadow
	        var subForm = getSubForm(form, formName, formKey);

	        var _ref = formKey ? _bindActionData2['default'](formActions, { form: formName, key: formKey }) : _bindActionData2['default'](formActions, { form: formName });

	        var blur = _ref.blur;
	        var change = _ref.change;
	        var initialize = _ref.initialize;
	        var reset = _ref.reset;
	        var startAsyncValidation = _ref.startAsyncValidation;
	        var startSubmit = _ref.startSubmit;
	        var stopAsyncValidation = _ref.stopAsyncValidation;
	        var stopSubmit = _ref.stopSubmit;
	        var touch = _ref.touch;
	        var untouch = _ref.untouch;

	        var runAsyncValidation = asyncValidate ? function () {
	          dispatch(startAsyncValidation(formKey));
	          var promise = asyncValidate(subForm.data);
	          if (!promise || typeof promise.then !== 'function') {
	            throw new Error('asyncValidate function passed to reduxForm must return a promise!');
	          }
	          return promise.then(function (asyncErrors) {
	            dispatch(stopAsyncValidation(asyncErrors));
	            return !!asyncErrors.valid;
	          });
	        } : undefined;
	        var handleBlur = function handleBlur(name, value) {
	          return function (event) {
	            var fieldValue = value || event.target.value;
	            var doBlur = _bindActionData2['default'](blur, { touch: touchOnBlur });
	            dispatch(doBlur(name, fieldValue));
	            if (runAsyncValidation && ~asyncBlurFields.indexOf(name)) {
	              var _extends2;

	              var syncError = syncValidate(_extends({}, subForm.data, (_extends2 = {}, _extends2[name] = fieldValue, _extends2)))[name];
	              // only dispatch async call if all synchronous client-side validation passes for this field
	              if (!syncError) {
	                runAsyncValidation();
	              }
	            }
	          };
	        };
	        var pristine = _util.isPristine(subForm.initial, subForm.data);

	        var _combineValidationErrors = combineValidationErrors(subForm);

	        var valid = _combineValidationErrors.valid;

	        var errors = _objectWithoutProperties(_combineValidationErrors, ['valid']);

	        var handleChange = function handleChange(name, value) {
	          return function (event) {
	            var doChange = _bindActionData2['default'](change, { touch: touchOnChange });
	            dispatch(doChange(name, value === undefined ? event.target.value : value));
	          };
	        };
	        var handleSubmit = function handleSubmit(submitOrEvent) {
	          var createEventHandler = function createEventHandler(submit) {
	            return function (event) {
	              if (event) {
	                event.preventDefault();
	              }
	              var submitWithPromiseCheck = function submitWithPromiseCheck() {
	                var result = submit(subForm.data);
	                if (result && typeof result.then === 'function') {
	                  // you're showing real promise, kid!
	                  var stopAndReturn = function stopAndReturn(x) {
	                    dispatch(stopSubmit());
	                    return x;
	                  };
	                  dispatch(startSubmit());
	                  result.then(stopAndReturn, stopAndReturn);
	                }
	              };
	              dispatch(touch.apply(undefined, fields));
	              if (runAsyncValidation) {
	                return runAsyncValidation().then(function (asyncValid) {
	                  if (valid && asyncValid) {
	                    return submitWithPromiseCheck(subForm.data);
	                  }
	                });
	              } else if (valid) {
	                return submitWithPromiseCheck(subForm.data);
	              }
	            };
	          };
	          if (typeof submitOrEvent === 'function') {
	            return createEventHandler(submitOrEvent);
	          }
	          var onSubmit = _this.props.onSubmit;

	          if (!onSubmit) {
	            throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
	          }
	          createEventHandler(onSubmit)(submitOrEvent /* is event */);
	        };
	        return _react2['default'].createElement(DecoratedComponent, _extends({
	          asyncValidate: runAsyncValidation,
	          asyncValidating: subForm.asyncValidating,
	          data: subForm.data,
	          dirty: !pristine,
	          dispatch: dispatch,
	          errors: errors,
	          formKey: formKey,
	          handleBlur: handleBlur,
	          handleChange: handleChange,
	          handleSubmit: handleSubmit,
	          initializeForm: function (data) {
	            return dispatch(initialize(data));
	          },
	          invalid: !valid,
	          pristine: pristine,
	          resetForm: function () {
	            return dispatch(reset());
	          },
	          submitting: subForm.submitting,
	          touch: function () {
	            for (var _len = arguments.length, touchFields = Array(_len), _key = 0; _key < _len; _key++) {
	              touchFields[_key] = arguments[_key];
	            }

	            return dispatch(touch.apply(undefined, touchFields));
	          },
	          touched: subForm.touched,
	          touchAll: function () {
	            return dispatch(touch.apply(undefined, fields));
	          },
	          untouch: function () {
	            for (var _len2 = arguments.length, untouchFields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	              untouchFields[_key2] = arguments[_key2];
	            }

	            return dispatch(untouch.apply(undefined, untouchFields));
	          },
	          untouchAll: function () {
	            return dispatch(untouchAll.apply(undefined, fields));
	          },
	          valid: valid
	        }, passableProps)); // pass other props
	      };

	      _createClass(ReduxForm, null, [{
	        key: 'displayName',
	        value: 'ReduxForm(' + _util.getDisplayName(DecoratedComponent) + ')',
	        enumerable: true
	      }, {
	        key: 'DecoratedComponent',
	        value: DecoratedComponent,
	        enumerable: true
	      }, {
	        key: 'propTypes',
	        value: {
	          formName: _react.PropTypes.string,
	          formKey: _react.PropTypes.string,
	          form: _react.PropTypes.object,
	          onSubmit: _react.PropTypes.func,
	          dispatch: _react.PropTypes.func.isRequired
	        },
	        enumerable: true
	      }, {
	        key: 'defaultProps',
	        value: {
	          formName: formName
	        },
	        enumerable: true
	      }]);

	      return ReduxForm;
	    })(_react.Component);
	  };
	}

	function reduxForm(formName, fields) {
	  var syncValidate = arguments.length <= 2 || arguments[2] === undefined ? function () {
	    return { valid: true };
	  } : arguments[2];
	  var touchOnBlur = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	  var touchOnChange = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	  var decorator = createReduxFormDecorator(formName, fields, syncValidate, !!touchOnBlur, !!touchOnChange);
	  decorator.async = function (asyncValidate) {
	    for (var _len3 = arguments.length, blurFields = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      blurFields[_key3 - 1] = arguments[_key3];
	    }

	    return createReduxFormDecorator(formName, fields, syncValidate, !!touchOnBlur, !!touchOnChange, asyncValidate, Array.isArray(blurFields[0]) ? blurFields[0] : blurFields);
	  };
	  return decorator;
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.getDisplayName = getDisplayName;
	exports.isPristine = isPristine;

	function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	}

	function isPristine(initial, data) {
	  if (initial === data) {
	    return true;
	  }
	  var dataKeys = Object.keys(data);
	  for (var i = 0; i < dataKeys.length; i++) {
	    var key = dataKeys[i];
	    var value = data[key];
	    var initialValue = initial[key];
	    if ((value || initialValue) && /* allow '' to equate to undefined or null */value !== initialValue) {
	      return false;
	    }
	  }
	  return true;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;