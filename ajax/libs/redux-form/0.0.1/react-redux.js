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

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = reduxForm;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var getDisplayName = function getDisplayName(Comp) {
	  return Comp.displayName || Comp.name || 'Component';
	};

	/**
	 * @param sliceName The key in the state corresponding to the data in this form
	 * @param changeCreator An action creator to accept changes in the form changeCreator(sliceName, field, value)
	 */

	function reduxForm(sliceName, changeCreator) {
	  return function (DecoratedComponent) {
	    return (function (_Component) {
	      _inherits(ReduxForm, _Component);

	      function ReduxForm() {
	        _classCallCheck(this, ReduxForm);

	        _Component.apply(this, arguments);
	      }

	      ReduxForm.prototype.componentWillMount = function componentWillMount() {
	        var store = this.context.store;

	        if (!store) {
	          throw new Error('No store found. @reduxForm decorated component must be inside a redux <Provider>');
	        }
	      };

	      ReduxForm.prototype.render = function render() {
	        var store = this.context.store;
	        var dispatch = store.dispatch;

	        var _store$getState = store.getState();

	        var state = _store$getState[sliceName].state;

	        var handleChange = function handleChange(name) {
	          return function (value) {
	            return dispatch(changeCreator(sliceName, name, value));
	          };
	        };
	        return _react2['default'].createElement(DecoratedComponent, _extends({ handleChange: handleChange }, state));
	      };

	      _createClass(ReduxForm, null, [{
	        key: 'displayName',
	        value: 'ReduxForm(' + getDisplayName(DecoratedComponent) + ')',
	        enumerable: true
	      }, {
	        key: 'DecoratedComponent',
	        value: DecoratedComponent,
	        enumerable: true
	      }, {
	        key: 'contextTypes',
	        value: {
	          store: _react.PropTypes.shape({
	            subscribe: _react.PropTypes.func.isRequired,
	            dispatch: _react.PropTypes.func.isRequired,
	            getState: _react.PropTypes.func.isRequired
	          })
	        },
	        enumerable: true
	      }]);

	      return ReduxForm;
	    })(_react.Component);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;