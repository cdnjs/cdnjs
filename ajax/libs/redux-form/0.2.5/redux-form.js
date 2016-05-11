(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"));
	else
		root["ReduxForm"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
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

	var _createFormReducer = __webpack_require__(4);

	var _createFormReducer2 = _interopRequireDefault(_createFormReducer);

	var _reduxForm = __webpack_require__(5);

	var _reduxForm2 = _interopRequireDefault(_reduxForm);

	var _bindSliceKey = __webpack_require__(3);

	var _bindSliceKey2 = _interopRequireDefault(_bindSliceKey);

	var _actions = __webpack_require__(2);

	var initializeWithKey = function initializeWithKey(form, key, data) {
	  return _bindSliceKey2['default'](_actions.initialize, key)(form, data);
	};

	exports['default'] = _reduxForm2['default'];
	exports.blur = _actions.blur;
	exports.change = _actions.change;
	exports.createFormReducer = _createFormReducer2['default'];
	exports.initialize = _actions.initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.reset = _actions.reset;
	exports.startAsyncValidation = _actions.startAsyncValidation;
	exports.stopAsyncValidation = _actions.stopAsyncValidation;
	exports.touch = _actions.touch;
	exports.touchAll = _actions.touchAll;
	exports.untouch = _actions.untouch;
	exports.untouchAll = _actions.untouchAll;

/***/ },
/* 1 */
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
	var TOUCH_ALL = 'redux-form/TOUCH_ALL';
	exports.TOUCH_ALL = TOUCH_ALL;
	var UNTOUCH = 'redux-form/UNTOUCH';
	exports.UNTOUCH = UNTOUCH;
	var UNTOUCH_ALL = 'redux-form/UNTOUCH_ALL';
	exports.UNTOUCH_ALL = UNTOUCH_ALL;

/***/ },
/* 2 */
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
	exports.touchAll = touchAll;
	exports.untouch = untouch;
	exports.untouchAll = untouchAll;

	var _actionTypes = __webpack_require__(1);

	function blur(form, field, value) {
	  return { type: _actionTypes.BLUR, form: form, field: field, value: value };
	}

	function change(form, field, value) {
	  return { type: _actionTypes.CHANGE, form: form, field: field, value: value };
	}

	function initialize(form, data) {
	  return { type: _actionTypes.INITIALIZE, form: form, data: data };
	}

	function reset(form) {
	  return { type: _actionTypes.RESET, form: form };
	}

	function startAsyncValidation(form) {
	  return { type: _actionTypes.START_ASYNC_VALIDATION, form: form };
	}

	function startSubmit(form) {
	  return { type: _actionTypes.START_SUBMIT, form: form };
	}

	function stopAsyncValidation(form, errors) {
	  return { type: _actionTypes.STOP_ASYNC_VALIDATION, form: form, errors: errors };
	}

	function stopSubmit(form) {
	  return { type: _actionTypes.STOP_SUBMIT, form: form };
	}

	function touch(form) {
	  for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    fields[_key - 1] = arguments[_key];
	  }

	  return { type: _actionTypes.TOUCH, form: form, fields: fields };
	}

	function touchAll(form) {
	  return { type: _actionTypes.TOUCH_ALL, form: form };
	}

	function untouch(form) {
	  for (var _len2 = arguments.length, fields = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    fields[_key2 - 1] = arguments[_key2];
	  }

	  return { type: _actionTypes.UNTOUCH, form: form, fields: fields };
	}

	function untouchAll(form) {
	  return { type: _actionTypes.UNTOUCH_ALL, form: form };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Adds a 'key' property to the results of the function or map of functions passed
	 */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = bindSliceKey;

	function bindSliceKey(action, key) {
	  return typeof action === 'function' ? function () {
	    return _extends({}, action.apply(undefined, arguments), {
	      key: key
	    });
	  } : Object.keys(action).reduce(function (accumulator, i) {
	    accumulator[i] = bindSliceKey(action[i], key);
	    return accumulator;
	  }, {});
	}

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createFormReducer;

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _actionTypes = __webpack_require__(1);

	var initialState = {
	  initial: {},
	  data: {},
	  touched: {},
	  asyncValidating: false,
	  asyncErrors: { valid: true },
	  submitting: false
	};

	exports.initialState = initialState;
	/**
	 * Creates a state structure like:
	 * {
	 *   initial: {
	 *     field1: 'value1',
	 *     field2: 'value2'
	 *   },
	 *   data: {
	 *     field1: 'value1',
	 *     field2: 'value2'
	 *   },
	 *   touched: {
	 *     field1: true,
	 *     field2: false
	 *   }
	 * }
	 *
	 * @param name the name of the "state slice" where the data is stored
	 * @param fields an array of field names, used when showing all values
	 * @param config {
	 *   touchOnBlur: [defaults to true],
	 *   touchOnChange: [defaults to false]
	 * }
	 * @returns {Function} a form reducer
	 */

	function createFormReducer(name, fields) {
	  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var _ref$touchOnBlur = _ref.touchOnBlur;
	  var touchOnBlur = _ref$touchOnBlur === undefined ? true : _ref$touchOnBlur;
	  var _ref$touchOnChange = _ref.touchOnChange;
	  var touchOnChange = _ref$touchOnChange === undefined ? false : _ref$touchOnChange;

	  var reducer = function reducer(s) {
	    var _extends2, _extends4;

	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var state = s || initialState;
	    switch (action.type) {
	      case _actionTypes.BLUR:
	        var blurDiff = {
	          data: _extends({}, state.data, (_extends2 = {}, _extends2[action.field] = action.value, _extends2))
	        };
	        if (touchOnBlur) {
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

	        if (touchOnChange) {
	          var _extends5;

	          changeDiff.touched = _extends({}, state.touched, (_extends5 = {}, _extends5[action.field] = true, _extends5));
	        }
	        return _extends({}, state, changeDiff);
	      case _actionTypes.INITIALIZE:
	        return {
	          initial: action.data,
	          data: action.data,
	          asyncValidating: false,
	          asyncErrors: {},
	          touched: {}
	        };
	      case _actionTypes.RESET:
	        return {
	          initial: state.initial,
	          data: state.initial,
	          touched: {},
	          asyncValidating: false,
	          asyncErrors: {}
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
	      case _actionTypes.TOUCH_ALL:
	        var touchAllDiff = {};
	        fields.forEach(function (field) {
	          return touchAllDiff[field] = true;
	        }); // mark all as touched
	        return _extends({}, state, {
	          touched: touchAllDiff
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
	      case _actionTypes.UNTOUCH_ALL:
	        return _extends({}, state, {
	          touched: {}
	        });
	      default:
	        return state;
	    }
	  };
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if (action.form !== name) {
	      return state;
	    }
	    if (action.key) {
	      var _extends6;

	      return _extends({}, state, (_extends6 = {}, _extends6[action.key] = reducer(state ? state[action.key] : undefined, action), _extends6));
	    }
	    return reducer(state, action);
	  };
	}

/***/ },
/* 5 */
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

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _actions = __webpack_require__(2);

	var formActions = _interopRequireWildcard(_actions);

	var _util = __webpack_require__(6);

	var _bindSliceKey = __webpack_require__(3);

	var _bindSliceKey2 = _interopRequireDefault(_bindSliceKey);

	var _createFormReducer = __webpack_require__(4);

	function createReduxFormDecorator(sliceName, syncValidate, asyncValidate, asyncBlurFields) {
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
	        var form = _props.form;
	        var sliceName = _props.sliceName;
	        var sliceKey = _props.sliceKey;
	        var dispatch = _props.dispatch;

	        var passableProps = _objectWithoutProperties(_props, ['form', 'sliceName', 'sliceKey', 'dispatch']);

	        // eslint-disable-line no-shadow
	        var reslicedForm = (sliceKey && form ? form[sliceKey] : form) || _createFormReducer.initialState;

	        var _ref = sliceKey ? _bindSliceKey2['default'](formActions, sliceKey) : formActions;

	        var blur = _ref.blur;
	        var change = _ref.change;
	        var initialize = _ref.initialize;
	        var reset = _ref.reset;
	        var startAsyncValidation = _ref.startAsyncValidation;
	        var startSubmit = _ref.startSubmit;
	        var stopAsyncValidation = _ref.stopAsyncValidation;
	        var stopSubmit = _ref.stopSubmit;
	        var touch = _ref.touch;
	        var touchAll = _ref.touchAll;
	        var untouch = _ref.untouch;
	        var untouchAll = _ref.untouchAll;

	        var runAsyncValidation = asyncValidate ? function () {
	          dispatch(startAsyncValidation(sliceName, sliceKey));
	          var promise = asyncValidate(reslicedForm.data);
	          if (!promise || typeof promise.then !== 'function') {
	            throw new Error('asyncValidate function passed to reduxForm must return a promise!');
	          }
	          return promise.then(function (asyncErrors) {
	            dispatch(stopAsyncValidation(sliceName, asyncErrors, sliceKey));
	            return !!asyncErrors.valid;
	          });
	        } : undefined;
	        var handleBlur = function handleBlur(name, value) {
	          return function (event) {
	            var fieldValue = value || event.target.value;
	            dispatch(blur(sliceName, name, fieldValue, sliceKey));
	            if (runAsyncValidation && ~asyncBlurFields.indexOf(name)) {
	              var _extends2;

	              var syncError = syncValidate(_extends({}, reslicedForm.data, (_extends2 = {}, _extends2[name] = fieldValue, _extends2)))[name];
	              // only dispatch async call if all synchronous client-side validation passes for this field
	              if (!syncError) {
	                runAsyncValidation();
	              }
	            }
	          };
	        };
	        var pristine = _util.isPristine(reslicedForm.initial, reslicedForm.data);

	        var _combineValidationErrors = combineValidationErrors(reslicedForm);

	        var valid = _combineValidationErrors.valid;

	        var errors = _objectWithoutProperties(_combineValidationErrors, ['valid']);

	        var handleChange = function handleChange(name, value) {
	          return function (event) {
	            return dispatch(change(sliceName, name, value === undefined ? event.target.value : value, sliceKey));
	          };
	        };
	        var handleSubmit = function handleSubmit(submitOrEvent) {
	          var createEventHandler = function createEventHandler(submit) {
	            return function (event) {
	              if (event) {
	                event.preventDefault();
	              }
	              var submitWithPromiseCheck = function submitWithPromiseCheck() {
	                var result = submit(reslicedForm.data);
	                if (result && typeof result.then === 'function') {
	                  // you're showing real promise, kid!
	                  var stopAndReturn = function stopAndReturn(x) {
	                    dispatch(stopSubmit(sliceName));
	                    return x;
	                  };
	                  dispatch(startSubmit(sliceName));
	                  result.then(stopAndReturn, stopAndReturn);
	                }
	              };
	              dispatch(touchAll(sliceName, sliceKey));
	              if (runAsyncValidation) {
	                return runAsyncValidation().then(function (asyncValid) {
	                  if (valid && asyncValid) {
	                    return submitWithPromiseCheck(reslicedForm.data);
	                  }
	                });
	              } else if (valid) {
	                return submitWithPromiseCheck(reslicedForm.data);
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
	          asyncValidating: reslicedForm.asyncValidating,
	          data: reslicedForm.data,
	          dirty: !pristine,
	          dispatch: dispatch,
	          errors: errors,
	          handleBlur: handleBlur,
	          handleChange: handleChange,
	          handleSubmit: handleSubmit,
	          initializeForm: function (data) {
	            return dispatch(initialize(sliceName, data, sliceKey));
	          },
	          invalid: !valid,
	          pristine: pristine,
	          resetForm: function () {
	            return dispatch(reset(sliceName, sliceKey));
	          },
	          sliceKey: sliceKey,
	          submitting: reslicedForm.submitting,
	          touch: function () {
	            for (var _len = arguments.length, touchFields = Array(_len), _key = 0; _key < _len; _key++) {
	              touchFields[_key] = arguments[_key];
	            }

	            return dispatch(touch.apply(undefined, [sliceName].concat(touchFields, [sliceKey])));
	          },
	          touched: reslicedForm.touched,
	          touchAll: function () {
	            return dispatch(touchAll(sliceName, sliceKey));
	          },
	          untouch: function () {
	            for (var _len2 = arguments.length, untouchFields = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	              untouchFields[_key2] = arguments[_key2];
	            }

	            return dispatch(untouch.apply(undefined, [sliceName].concat(untouchFields, [sliceKey])));
	          },
	          untouchAll: function () {
	            return dispatch(untouchAll(sliceName, sliceKey));
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
	          sliceName: _react.PropTypes.string,
	          sliceKey: _react.PropTypes.string,
	          form: _react.PropTypes.object,
	          onSubmit: _react.PropTypes.func,
	          dispatch: _react.PropTypes.func.isRequired
	        },
	        enumerable: true
	      }, {
	        key: 'defaultProps',
	        value: {
	          sliceName: sliceName
	        },
	        enumerable: true
	      }]);

	      return ReduxForm;
	    })(_react.Component);
	  };
	}

	function reduxForm(sliceName) {
	  var syncValidate = arguments.length <= 1 || arguments[1] === undefined ? function () {
	    return { valid: true };
	  } : arguments[1];

	  var decorator = createReduxFormDecorator(sliceName, syncValidate);
	  decorator.async = function (asyncValidate) {
	    for (var _len3 = arguments.length, fields = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      fields[_key3 - 1] = arguments[_key3];
	    }

	    var blurFields = Array.isArray(fields[0]) ? fields[0] : fields;
	    return createReduxFormDecorator(sliceName, syncValidate, asyncValidate, blurFields);
	  };
	  return decorator;
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});
;