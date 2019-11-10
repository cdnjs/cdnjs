(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"));
	else
		root["ReduxForm"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__) {
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

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _createAll2 = __webpack_require__(13);

	var _createAll3 = _interopRequireDefault(_createAll2);

	var _createAll = _createAll3['default'](false, _react2['default']);

	var blur = _createAll.blur;
	var change = _createAll.change;
	var connectReduxForm = _createAll.connectReduxForm;
	var focus = _createAll.focus;
	var reducer = _createAll.reducer;
	var reduxForm = _createAll.reduxForm;
	var initialize = _createAll.initialize;
	var initializeWithKey = _createAll.initializeWithKey;
	var reset = _createAll.reset;
	var startAsyncValidation = _createAll.startAsyncValidation;
	var startSubmit = _createAll.startSubmit;
	var stopAsyncValidation = _createAll.stopAsyncValidation;
	var stopSubmit = _createAll.stopSubmit;
	var touch = _createAll.touch;
	var untouch = _createAll.untouch;
	exports.blur = blur;
	exports.change = change;
	exports.connectReduxForm = connectReduxForm;
	exports.focus = focus;
	exports.reducer = reducer;
	exports.reduxForm = reduxForm;
	exports.initialize = initialize;
	exports.initializeWithKey = initializeWithKey;
	exports.reset = reset;
	exports.startAsyncValidation = startAsyncValidation;
	exports.startSubmit = startSubmit;
	exports.stopAsyncValidation = stopAsyncValidation;
	exports.stopSubmit = stopSubmit;
	exports.touch = touch;
	exports.untouch = untouch;

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
	var FOCUS = 'redux-form/FOCUS';
	exports.FOCUS = FOCUS;
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
	exports.focus = focus;
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

	function focus(field) {
	  return { type: _actionTypes.FOCUS, field: field };
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

	function stopSubmit(errors) {
	  return { type: _actionTypes.STOP_SUBMIT, errors: errors };
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createReduxForm;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _actions = __webpack_require__(3);

	var formActions = _interopRequireWildcard(_actions);

	var _getDisplayName = __webpack_require__(15);

	var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

	var _isPristine = __webpack_require__(16);

	var _isPristine2 = _interopRequireDefault(_isPristine);

	var _isValid = __webpack_require__(17);

	var _isValid2 = _interopRequireDefault(_isValid);

	var _bindActionData = __webpack_require__(4);

	var _bindActionData2 = _interopRequireDefault(_bindActionData);

	var _reducer = __webpack_require__(6);

	function isReadonly(prop) {
	  var writeProps = ['asyncValidate', 'handleBlur', 'handleChange', 'handleFocus', 'handleSubmit', 'onBlur', 'onChange', 'onFocus'];
	  return ! ~writeProps.indexOf(prop);
	}

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

	function silenceEvents(fn) {
	  return function (event) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (event && event.preventDefault) {
	      event.preventDefault();
	      event.stopPropagation();
	      return fn.apply(undefined, args);
	    }
	    return fn.apply(undefined, [event].concat(args));
	  };
	}

	function isAsyncValid(errors) {
	  return !errors || Object.keys(errors).reduce(function (valid, error) {
	    return valid && _isValid2['default'](errors[error]);
	  }, true);
	}

	function createReduxForm(isReactNative, React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  function getValue(passedValue, event) {
	    if (passedValue !== undefined || !event) {
	      // extract value from { value: value } structure. https://github.com/nikgraf/belle/issues/58
	      return typeof passedValue === 'object' && passedValue.value ? passedValue.value : passedValue;
	    }
	    if (!isReactNative && event.nativeEvent !== undefined && event.nativeEvent.text !== undefined) {
	      return event.nativeEvent.text;
	    }
	    if (isReactNative && event.nativeEvent !== undefined) {
	      return event.nativeEvent.text;
	    }
	    if (event.target === undefined) {
	      // is it a value instead of an event?
	      return event;
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
	    return value;
	  }

	  return function reduxForm(config) {
	    var _extends6 = _extends({
	      validate: function validate() {
	        return {};
	      },
	      touchOnBlur: true,
	      touchOnChange: false,
	      readonly: false,
	      asyncValidate: null,
	      asyncBlurFields: []
	    }, config);

	    var formName = _extends6.form;
	    var fields = _extends6.fields;
	    var syncValidate = _extends6.validate;
	    var readonly = _extends6.readonly;
	    var touchOnBlur = _extends6.touchOnBlur;
	    var touchOnChange = _extends6.touchOnChange;
	    var asyncValidate = _extends6.asyncValidate;
	    var asyncBlurFields = _extends6.asyncBlurFields;

	    if (!fields || !fields.length) {
	      throw new Error('No fields passed to redux-form. Must be passed to ' + 'connectReduxForm({fields: ["my", "field", "names"]})');
	    }

	    var filterProps = function filterProps(props) {
	      return readonly ? Object.keys(props).reduce(function (accumulator, prop) {
	        var _extends2;

	        return isReadonly(prop) ? _extends({}, accumulator, (_extends2 = {}, _extends2[prop] = props[prop], _extends2)) : accumulator;
	      }, {}) : props;
	    };

	    return function (DecoratedComponent) {
	      return (function (_Component) {
	        _inherits(ReduxForm, _Component);

	        function ReduxForm() {
	          _classCallCheck(this, ReduxForm);

	          _Component.apply(this, arguments);
	        }

	        ReduxForm.prototype.componentWillMount = function componentWillMount() {
	          var _props = this.props;
	          var initialValues = _props.initialValues;
	          var dispatch = _props.dispatch;
	          var formName = _props.formName;
	          var formKey = _props.formKey;
	          // eslint-disable-line no-shadow
	          if (initialValues) {
	            var _ref = formKey ? _bindActionData2['default'](formActions, { form: formName, key: formKey }) : _bindActionData2['default'](formActions, { form: formName });

	            var initialize = _ref.initialize;

	            dispatch(initialize(initialValues));
	          }
	        };

	        ReduxForm.prototype.render = function render() {
	          var _this = this;

	          // Read props
	          var _props2 = this.props;
	          var formName = _props2.formName;
	          var form = _props2.form;
	          var formKey = _props2.formKey;
	          var dispatch = _props2.dispatch;

	          var passableProps = _objectWithoutProperties(_props2, ['formName', 'form', 'formKey', 'dispatch']);

	          // eslint-disable-line no-shadow
	          if (!formName) {
	            throw new Error('No form name given to redux-form. Must be passed to ' + 'connectReduxForm({form: [form name]}) or as a "formName" prop');
	          }
	          var subForm = getSubForm(form, formName, formKey);

	          // Calculate calculable state
	          var allValid = true;
	          var allPristine = true;
	          var values = fields.reduce(function (accumulator, field) {
	            var _extends3;

	            return _extends({}, accumulator, (_extends3 = {}, _extends3[field] = subForm[field] ? subForm[field].value : undefined, _extends3));
	          }, {});

	          // Create actions

	          var _ref2 = formKey ? _bindActionData2['default'](formActions, { form: formName, key: formKey }) : _bindActionData2['default'](formActions, { form: formName });

	          var blur = _ref2.blur;
	          var change = _ref2.change;
	          var focus = _ref2.focus;
	          var initialize = _ref2.initialize;
	          var reset = _ref2.reset;
	          var startAsyncValidation = _ref2.startAsyncValidation;
	          var startSubmit = _ref2.startSubmit;
	          var stopAsyncValidation = _ref2.stopAsyncValidation;
	          var stopSubmit = _ref2.stopSubmit;
	          var touch = _ref2.touch;
	          var untouch = _ref2.untouch;

	          function runAsyncValidation() {
	            dispatch(startAsyncValidation(formKey));
	            var promise = asyncValidate(values, dispatch);
	            if (!promise || typeof promise.then !== 'function') {
	              throw new Error('asyncValidate function passed to reduxForm must return a promise!');
	            }
	            return promise.then(function (asyncErrors) {
	              dispatch(stopAsyncValidation(asyncErrors));
	              return isAsyncValid(asyncErrors);
	            }, function (err) {
	              dispatch(stopAsyncValidation({}));
	              throw new Error('redux-form: Asynchronous validation failed: ' + err);
	            });
	          }

	          var handleBlur = function handleBlur(name, value) {
	            return function (event) {
	              var fieldValue = getValue(value, event);
	              var doBlur = _bindActionData2['default'](blur, { touch: touchOnBlur });
	              dispatch(doBlur(name, fieldValue));
	              if (asyncValidate && ~asyncBlurFields.indexOf(name)) {
	                var _extends4;

	                var syncError = syncValidate(_extends({}, values, (_extends4 = {}, _extends4[name] = fieldValue, _extends4)))[name];
	                // only dispatch async call if all synchronous client-side validation passes for this field
	                if (!syncError) {
	                  runAsyncValidation();
	                }
	              }
	            };
	          };
	          var handleFocus = function handleFocus(name) {
	            return function () {
	              dispatch(focus(name));
	            };
	          };
	          var handleChange = function handleChange(name, value) {
	            return function (event) {
	              var doChange = _bindActionData2['default'](change, { touch: touchOnChange });
	              dispatch(doChange(name, getValue(value, event)));
	            };
	          };
	          var handleSubmit = function handleSubmit(submitOrEvent) {
	            var createEventHandler = function createEventHandler(submit) {
	              return function (event) {
	                if (event && event.preventDefault) {
	                  event.preventDefault();
	                  event.stopPropagation();
	                }
	                var submitWithPromiseCheck = function submitWithPromiseCheck() {
	                  var result = submit(values);
	                  if (result && typeof result.then === 'function') {
	                    // you're showing real promise, kid!
	                    dispatch(startSubmit());
	                    return result.then(function (submitResult) {
	                      dispatch(stopSubmit());
	                      return submitResult;
	                    }, function (submitError) {
	                      dispatch(stopSubmit(submitError));
	                      return submitError;
	                    });
	                  }
	                };
	                dispatch(touch.apply(undefined, fields));
	                if (allValid) {
	                  if (asyncValidate) {
	                    return runAsyncValidation().then(function (asyncValid) {
	                      if (allValid && asyncValid) {
	                        return submitWithPromiseCheck(values);
	                      }
	                    });
	                  }
	                  return submitWithPromiseCheck(values);
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

	          // Define fields
	          var syncErrors = syncValidate(values);
	          var allFields = fields.reduce(function (accumulator, name) {
	            var _extends5;

	            var field = subForm[name] || {};
	            var pristine = _isPristine2['default'](field.value, field.initial);
	            var error = syncErrors[name] || field.asyncError || field.submitError;
	            var valid = _isValid2['default'](error);
	            var fieldBlur = handleBlur(name);
	            var fieldChange = handleChange(name);
	            var fieldFocus = handleFocus(name);
	            if (!valid) {
	              allValid = false;
	            }
	            if (!pristine) {
	              allPristine = false;
	            }
	            return _extends({}, accumulator, (_extends5 = {}, _extends5[name] = filterProps({
	              active: subForm._active === name,
	              checked: typeof field.value === 'boolean' ? field.value : undefined,
	              dirty: !pristine,
	              error: error,
	              handleBlur: fieldBlur,
	              handleChange: fieldChange,
	              handleFocus: fieldFocus,
	              invalid: !valid,
	              name: name,
	              onBlur: fieldBlur,
	              onChange: fieldChange,
	              onFocus: fieldFocus,
	              onUpdate: fieldChange, // alias to support belle. https://github.com/nikgraf/belle/issues/58
	              pristine: pristine,
	              touched: field.touched,
	              valid: valid,
	              value: field.value,
	              visited: field.visited
	            }), _extends5));
	          }, {});
	          var formError = syncErrors._error || subForm._error;
	          if (formError) {
	            allValid = false;
	          }

	          // Return decorated component
	          return React.createElement(DecoratedComponent, _extends({
	            // State:
	            active: subForm._active,
	            asyncValidating: subForm._asyncValidating,
	            dirty: !allPristine,
	            error: formError,
	            fields: allFields,
	            formKey: formKey,
	            invalid: !allValid,
	            pristine: allPristine,
	            submitting: subForm._submitting,
	            valid: allValid,
	            values: values,

	            // Actions:
	            asyncValidate: silenceEvents(runAsyncValidation),
	            handleBlur: silenceEvents(handleBlur),
	            handleChange: silenceEvents(handleChange),
	            handleFocus: handleFocus,
	            handleSubmit: silenceEvents(handleSubmit),
	            initializeForm: silenceEvents(function (initialValues) {
	              return dispatch(initialize(initialValues));
	            }),
	            resetForm: silenceEvents(function () {
	              return dispatch(reset());
	            }),
	            touch: silenceEvents(function () {
	              return dispatch(touch.apply(undefined, arguments));
	            }),
	            touchAll: silenceEvents(function () {
	              return dispatch(touch.apply(undefined, fields));
	            }),
	            untouch: silenceEvents(function () {
	              return dispatch(untouch.apply(undefined, arguments));
	            }),
	            untouchAll: silenceEvents(function () {
	              return dispatch(untouch.apply(undefined, fields));
	            }),

	            // Other:
	            dispatch: dispatch
	          }, passableProps));
	        };

	        _createClass(ReduxForm, null, [{
	          key: 'displayName',
	          value: 'ReduxForm(' + _getDisplayName2['default'](DecoratedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'DecoratedComponent',
	          value: DecoratedComponent,
	          enumerable: true
	        }, {
	          key: 'propTypes',
	          value: {
	            formName: PropTypes.string,
	            formKey: PropTypes.string,
	            form: PropTypes.object,
	            onSubmit: PropTypes.func,
	            dispatch: PropTypes.func.isRequired,
	            initialValues: PropTypes.object
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
	      })(Component);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
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
	  _active: undefined,
	  _asyncValidating: false,
	  _error: undefined,
	  _submitting: false
	};

	exports.initialState = initialState;
	var getValues = function getValues(state) {
	  return Object.keys(state).reduce(function (accumulator, name) {
	    var _extends2;

	    return name[0] === '_' ? accumulator : _extends({}, accumulator, (_extends2 = {}, _extends2[name] = state[name].value, _extends2));
	  }, {});
	};

	var reducer = function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];

	  var _extends3, _extends4, _extends5;

	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  switch (action.type) {
	    case _actionTypes.BLUR:
	      return _extends({}, state, (_extends3 = {}, _extends3[action.field] = _extends({}, state[action.field], {
	        value: action.value === undefined ? (state[action.field] || {}).value : action.value,
	        touched: !!(action.touch || (state[action.field] || {}).touched)
	      }), _extends3._active = undefined, _extends3));
	    case _actionTypes.CHANGE:
	      return _extends({}, state, (_extends4 = {}, _extends4[action.field] = _extends({}, state[action.field], {
	        value: action.value,
	        touched: !!(action.touch || (state[action.field] || {}).touched),
	        asyncError: null,
	        submitError: null
	      }), _extends4._error = undefined, _extends4));
	    case _actionTypes.FOCUS:
	      return _extends({}, state, (_extends5 = {}, _extends5[action.field] = _extends({}, state[action.field], {
	        visited: true
	      }), _extends5._active = action.field, _extends5));
	    case _actionTypes.INITIALIZE:
	      return _extends({}, _mapValues2['default'](action.data, function (value) {
	        return {
	          initial: value,
	          value: value
	        };
	      }), {
	        _asyncValidating: false,
	        _active: undefined,
	        _error: undefined,
	        _submitting: false
	      });
	    case _actionTypes.RESET:
	      return _extends({}, _mapValues2['default'](state, function (field, name) {
	        return name[0] === '_' ? field : {
	          initial: field.initial,
	          value: field.initial
	        };
	      }), {
	        _active: undefined,
	        _asyncValidating: false,
	        _error: undefined,
	        _submitting: false
	      });
	    case _actionTypes.START_ASYNC_VALIDATION:
	      return _extends({}, state, {
	        _asyncValidating: true
	      });
	    case _actionTypes.START_SUBMIT:
	      return _extends({}, state, {
	        _submitting: true
	      });
	    case _actionTypes.STOP_ASYNC_VALIDATION:
	      return _extends({}, state, _mapValues2['default'](action.errors, function (error, key) {
	        return _extends({}, state[key], {
	          asyncError: error
	        });
	      }), {
	        _asyncValidating: false,
	        _error: action.errors._error
	      });
	    case _actionTypes.STOP_SUBMIT:
	      return _extends({}, state, action.errors ? _mapValues2['default'](action.errors, function (error, key) {
	        return _extends({}, state[key], {
	          submitError: error
	        });
	      }) : {}, {
	        _error: action.errors && action.errors._error,
	        _submitting: false
	      });
	    case _actionTypes.TOUCH:
	      return _extends({}, state, action.fields.reduce(function (accumulator, field) {
	        var _extends6;

	        return _extends({}, accumulator, (_extends6 = {}, _extends6[field] = _extends({}, state[field], {
	          touched: true
	        }), _extends6));
	      }, {}));
	    case _actionTypes.UNTOUCH:
	      return _extends({}, state, action.fields.reduce(function (accumulator, field) {
	        var _extends7;

	        return _extends({}, accumulator, (_extends7 = {}, _extends7[field] = _extends({}, state[field], {
	          touched: false
	        }), _extends7));
	      }, {}));
	    default:
	      return state;
	  }
	};

	function formReducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var _extends10;

	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var form = action.form;
	  var key = action.key;

	  var rest = _objectWithoutProperties(action, ['form', 'key']);

	  if (!form) {
	    return state;
	  }
	  if (key) {
	    var _extends8, _extends9;

	    return _extends({}, state, (_extends9 = {}, _extends9[form] = _extends({}, state[form], (_extends8 = {}, _extends8[key] = reducer((state[form] || {})[key], rest), _extends8)), _extends9));
	  }
	  return _extends({}, state, (_extends10 = {}, _extends10[form] = reducer(state[form], rest), _extends10));
	}

	/**
	 * Adds additional functionality to the reducer
	 */
	function decorate(target) {
	  target.plugin = function plugin(reducers) {
	    var _this = this;

	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this(state, action);
	      return _extends({}, result, _mapValues2['default'](reducers, function (red, key) {
	        return red(result[key] || initialState, action);
	      }));
	    });
	  };

	  target.normalize = function normalize(normalizers) {
	    var _this2 = this;

	    return decorate(function () {
	      var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var result = _this2(state, action);
	      return _extends({}, result, _mapValues2['default'](normalizers, function (formNormalizers, form) {
	        var formResult = _extends({}, initialState, result[form]);
	        return _extends({}, formResult, _mapValues2['default'](formNormalizers, function (fieldNormalizer, field) {
	          return _extends({}, formResult[field], {
	            value: fieldNormalizer(formResult[field] ? formResult[field].value : undefined, // value
	            state[form] && state[form][field] ? state[form][field].value : undefined, // previous value
	            getValues(formResult)) // all field values
	          });
	        }));
	      }));
	    });
	  };

	  return target;
	}

	exports['default'] = decorate(formReducer);

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = createStoreShape;

	function createStoreShape(PropTypes) {
	  return PropTypes.shape({
	    subscribe: PropTypes.func.isRequired,
	    dispatch: PropTypes.func.isRequired,
	    getState: PropTypes.func.isRequired
	  });
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createStore;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsIsPlainObject = __webpack_require__(10);

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

	    return function unsubscribe() {
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
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

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

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createAll;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reducer = __webpack_require__(6);

	var _reducer2 = _interopRequireDefault(_reducer);

	var _createReduxForm = __webpack_require__(5);

	var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

	var _createConnectReduxForm = __webpack_require__(14);

	var _createConnectReduxForm2 = _interopRequireDefault(_createConnectReduxForm);

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
	var focus = boundActions.focus;
	var initialize = boundActions.initialize;
	var initializeWithKey = boundActions.initializeWithKey;
	var reset = boundActions.reset;
	var startAsyncValidation = boundActions.startAsyncValidation;
	var startSubmit = boundActions.startSubmit;
	var stopAsyncValidation = boundActions.stopAsyncValidation;
	var stopSubmit = boundActions.stopSubmit;
	var touch = boundActions.touch;
	var untouch = boundActions.untouch;

	function createAll(isReactNative, React) {
	  return {
	    blur: blur,
	    change: change,
	    connectReduxForm: _createConnectReduxForm2['default'](isReactNative, React),
	    focus: focus,
	    reducer: _reducer2['default'],
	    initialize: initialize,
	    initializeWithKey: initializeWithKey,
	    reduxForm: _createReduxForm2['default'](isReactNative, React),
	    reset: reset,
	    startAsyncValidation: startAsyncValidation,
	    startSubmit: startSubmit,
	    stopAsyncValidation: stopAsyncValidation,
	    stopSubmit: stopSubmit,
	    touch: touch,
	    untouch: untouch
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createConnectReduxForm;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reactRedux = __webpack_require__(21);

	var _createReduxForm = __webpack_require__(5);

	var _createReduxForm2 = _interopRequireDefault(_createReduxForm);

	var connector = _reactRedux.connect(function (state) {
	  return {
	    form: state.form
	  };
	});

	function reduceDecorators() {
	  for (var _len = arguments.length, decorators = Array(_len), _key = 0; _key < _len; _key++) {
	    decorators[_key] = arguments[_key];
	  }

	  return function (DecoratedComponent) {
	    return decorators.reduce(function (accumulator, decorator) {
	      return decorator(accumulator);
	    }, DecoratedComponent);
	  };
	}

	function createConnectReduxForm(isReactNative, React) {
	  var reduxForm = _createReduxForm2['default'](isReactNative, React);
	  return function connectReduxForm() {
	    return reduceDecorators(reduxForm.apply(undefined, arguments), connector);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = getDisplayName;

	function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	}

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPristine;

	function isPristine(initial, data) {
	  if (initial === data) {
	    return true;
	  }
	  if (initial && typeof initial === 'object') {
	    if (!data || typeof data !== 'object') {
	      return false;
	    }
	    var dataKeys = Object.keys(data);
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
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = isValid;

	function isValid(error) {
	  if (Array.isArray(error)) {
	    return error.reduce(function (valid, errorValue) {
	      return valid && isValid(errorValue);
	    }, true);
	  }
	  return !error;
	}

	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = createAll;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createProvider = __webpack_require__(20);

	var _createProvider2 = _interopRequireDefault(_createProvider);

	var _createConnect = __webpack_require__(19);

	var _createConnect2 = _interopRequireDefault(_createConnect);

	function createAll(React) {
	  var Provider = _createProvider2['default'](React);
	  var connect = _createConnect2['default'](React);

	  return { Provider: Provider, connect: connect };
	}

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createConnect;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsCreateStoreShape = __webpack_require__(7);

	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

	var _utilsShallowEqual = __webpack_require__(23);

	var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

	var _utilsIsPlainObject = __webpack_require__(22);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsWrapActionCreators = __webpack_require__(24);

	var _utilsWrapActionCreators2 = _interopRequireDefault(_utilsWrapActionCreators);

	var _invariant = __webpack_require__(25);

	var _invariant2 = _interopRequireDefault(_invariant);

	var defaultMapStateToProps = function defaultMapStateToProps() {
	  return {};
	};
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(Component) {
	  return Component.displayName || Component.name || 'Component';
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function createConnect(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;

	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

	  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var shouldSubscribe = Boolean(mapStateToProps);
	    var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	    var finalMapDispatchToProps = _utilsIsPlainObject2['default'](mapDispatchToProps) ? _utilsWrapActionCreators2['default'](mapDispatchToProps) : mapDispatchToProps || defaultMapDispatchToProps;
	    var finalMergeProps = mergeProps || defaultMergeProps;
	    var shouldUpdateStateProps = finalMapStateToProps.length > 1;
	    var shouldUpdateDispatchProps = finalMapDispatchToProps.length > 1;
	    var _options$pure = options.pure;
	    var pure = _options$pure === undefined ? true : _options$pure;

	    // Helps track hot reloading.
	    var version = nextVersion++;

	    function computeStateProps(store, props) {
	      var state = store.getState();
	      var stateProps = shouldUpdateStateProps ? finalMapStateToProps(state, props) : finalMapStateToProps(state);

	      _invariant2['default'](_utilsIsPlainObject2['default'](stateProps), '`mapStateToProps` must return an object. Instead received %s.', stateProps);
	      return stateProps;
	    }

	    function computeDispatchProps(store, props) {
	      var dispatch = store.dispatch;

	      var dispatchProps = shouldUpdateDispatchProps ? finalMapDispatchToProps(dispatch, props) : finalMapDispatchToProps(dispatch);

	      _invariant2['default'](_utilsIsPlainObject2['default'](dispatchProps), '`mapDispatchToProps` must return an object. Instead received %s.', dispatchProps);
	      return dispatchProps;
	    }

	    function _computeNextState(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      _invariant2['default'](_utilsIsPlainObject2['default'](mergedProps), '`mergeProps` must return an object. Instead received %s.', mergedProps);
	      return mergedProps;
	    }

	    return function wrapWithConnect(WrappedComponent) {
	      var Connect = (function (_Component) {
	        _inherits(Connect, _Component);

	        Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	          if (!pure) {
	            this.updateStateProps(nextProps);
	            this.updateDispatchProps(nextProps);
	            this.updateState(nextProps);
	            return true;
	          }

	          var storeChanged = nextState.storeState !== this.state.storeState;
	          var propsChanged = !_utilsShallowEqual2['default'](nextProps, this.props);
	          var mapStateProducedChange = false;
	          var dispatchPropsChanged = false;

	          if (storeChanged || propsChanged && shouldUpdateStateProps) {
	            mapStateProducedChange = this.updateStateProps(nextProps);
	          }

	          if (propsChanged && shouldUpdateDispatchProps) {
	            dispatchPropsChanged = this.updateDispatchProps(nextProps);
	          }

	          if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
	            this.updateState(nextProps);
	            return true;
	          }

	          return false;
	        };

	        _createClass(Connect, null, [{
	          key: 'displayName',
	          value: 'Connect(' + getDisplayName(WrappedComponent) + ')',
	          enumerable: true
	        }, {
	          key: 'WrappedComponent',
	          value: WrappedComponent,
	          enumerable: true
	        }, {
	          key: 'contextTypes',
	          value: {
	            store: storeShape
	          },
	          enumerable: true
	        }, {
	          key: 'propTypes',
	          value: {
	            store: storeShape
	          },
	          enumerable: true
	        }]);

	        function Connect(props, context) {
	          _classCallCheck(this, Connect);

	          _Component.call(this, props, context);
	          this.version = version;
	          this.store = props.store || context.store;

	          _invariant2['default'](this.store, 'Could not find "store" in either the context or ' + ('props of "' + this.constructor.displayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + this.constructor.displayName + '".'));

	          this.stateProps = computeStateProps(this.store, props);
	          this.dispatchProps = computeDispatchProps(this.store, props);
	          this.state = { storeState: null };
	          this.updateState();
	        }

	        Connect.prototype.computeNextState = function computeNextState() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	          return _computeNextState(this.stateProps, this.dispatchProps, props);
	        };

	        Connect.prototype.updateStateProps = function updateStateProps() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	          var nextStateProps = computeStateProps(this.store, props);
	          if (_utilsShallowEqual2['default'](nextStateProps, this.stateProps)) {
	            return false;
	          }

	          this.stateProps = nextStateProps;
	          return true;
	        };

	        Connect.prototype.updateDispatchProps = function updateDispatchProps() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	          var nextDispatchProps = computeDispatchProps(this.store, props);
	          if (_utilsShallowEqual2['default'](nextDispatchProps, this.dispatchProps)) {
	            return false;
	          }

	          this.dispatchProps = nextDispatchProps;
	          return true;
	        };

	        Connect.prototype.updateState = function updateState() {
	          var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

	          this.nextState = this.computeNextState(props);
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

	        Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	          this.tryUnsubscribe();
	        };

	        Connect.prototype.handleChange = function handleChange() {
	          if (!this.unsubscribe) {
	            return;
	          }

	          this.setState({
	            storeState: this.store.getState()
	          });
	        };

	        Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	          return this.refs.wrappedInstance;
	        };

	        Connect.prototype.render = function render() {
	          return React.createElement(WrappedComponent, _extends({ ref: 'wrappedInstance'
	          }, this.nextState));
	        };

	        return Connect;
	      })(Component);

	      if (true) {
	        Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	          if (this.version === version) {
	            return;
	          }

	          // We are hot reloading!
	          this.version = version;

	          // Update the state and bindings.
	          this.trySubscribe();
	          this.updateStateProps();
	          this.updateDispatchProps();
	          this.updateState();
	        };
	      }

	      return Connect;
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = createProvider;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _utilsCreateStoreShape = __webpack_require__(7);

	var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

	function isUsingOwnerContext(React) {
	  var version = React.version;

	  if (typeof version !== 'string') {
	    return true;
	  }

	  var sections = version.split('.');
	  var major = parseInt(sections[0], 10);
	  var minor = parseInt(sections[1], 10);

	  return major === 0 && minor === 13;
	}

	function createProvider(React) {
	  var Component = React.Component;
	  var PropTypes = React.PropTypes;
	  var Children = React.Children;

	  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);
	  var requireFunctionChild = isUsingOwnerContext(React);

	  var didWarnAboutChild = false;
	  function warnAboutFunctionChild() {
	    if (didWarnAboutChild || requireFunctionChild) {
	      return;
	    }

	    didWarnAboutChild = true;
	    console.error( // eslint-disable-line no-console
	    'With React 0.14 and later versions, you no longer need to ' + 'wrap <Provider> child into a function.');
	  }
	  function warnAboutElementChild() {
	    if (didWarnAboutChild || !requireFunctionChild) {
	      return;
	    }

	    didWarnAboutChild = true;
	    console.error( // eslint-disable-line no-console
	    'With React 0.13, you need to ' + 'wrap <Provider> child into a function. ' + 'This restriction will be removed with React 0.14.');
	  }

	  var didWarnAboutReceivingStore = false;
	  function warnAboutReceivingStore() {
	    if (didWarnAboutReceivingStore) {
	      return;
	    }

	    didWarnAboutReceivingStore = true;
	    console.error( // eslint-disable-line no-console
	    '<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	  }

	  return (function (_Component) {
	    _inherits(Provider, _Component);

	    Provider.prototype.getChildContext = function getChildContext() {
	      return { store: this.store };
	    };

	    _createClass(Provider, null, [{
	      key: 'childContextTypes',
	      value: {
	        store: storeShape.isRequired
	      },
	      enumerable: true
	    }, {
	      key: 'propTypes',
	      value: {
	        store: storeShape.isRequired,
	        children: (requireFunctionChild ? PropTypes.func : PropTypes.element).isRequired
	      },
	      enumerable: true
	    }]);

	    function Provider(props, context) {
	      _classCallCheck(this, Provider);

	      _Component.call(this, props, context);
	      this.store = props.store;
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

	      if (typeof children === 'function') {
	        warnAboutFunctionChild();
	        children = children();
	      } else {
	        warnAboutElementChild();
	      }

	      return Children.only(children);
	    };

	    return Provider;
	  })(Component);
	}

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _componentsCreateAll = __webpack_require__(18);

	var _componentsCreateAll2 = _interopRequireDefault(_componentsCreateAll);

	var _createAll = _componentsCreateAll2['default'](_react2['default']);

	var Provider = _createAll.Provider;
	var connect = _createAll.connect;
	exports.Provider = Provider;
	exports.connect = connect;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};

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

	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
	}

	module.exports = exports['default'];

/***/ },
/* 23 */
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

	module.exports = exports["default"];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = wrapActionCreators;

	var _redux = __webpack_require__(26);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return _redux.bindActionCreators(actionCreators, dispatch);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
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
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(8);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _utilsCombineReducers = __webpack_require__(29);

	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

	var _utilsBindActionCreators = __webpack_require__(28);

	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

	var _utilsApplyMiddleware = __webpack_require__(27);

	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

	var _utilsCompose = __webpack_require__(9);

	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = applyMiddleware;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _compose = __webpack_require__(9);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = bindActionCreators;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsMapValues = __webpack_require__(11);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

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
	    // eslint-disable-line no-eq-null
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = combineReducers;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createStore = __webpack_require__(8);

	var _utilsIsPlainObject = __webpack_require__(10);

	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

	var _utilsMapValues = __webpack_require__(11);

	var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

	var _utilsPick = __webpack_require__(30);

	var _utilsPick2 = _interopRequireDefault(_utilsPick);

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

	  if (!_utilsIsPlainObject2['default'](inputState)) {
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
	  var finalReducers = _utilsPick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;

	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
	    return undefined;
	  });

	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;

	    if (sanityError) {
	      throw sanityError;
	    }

	    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
	      var newState = reducer(state[key], action);
	      if (typeof newState === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      return newState;
	    });

	    if (true) {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }

	    return finalState;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 30 */
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