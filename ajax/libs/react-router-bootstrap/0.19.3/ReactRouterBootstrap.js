(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-router"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-router"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterBootstrap"] = factory(require("react"), require("react-router"));
	else
		root["ReactRouterBootstrap"] = factory(root["React"], root["ReactRouter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _IndexLinkContainer2 = __webpack_require__(1);

	var _IndexLinkContainer3 = _interopRequireDefault(_IndexLinkContainer2);

	exports.IndexLinkContainer = _IndexLinkContainer3['default'];

	var _LinkContainer2 = __webpack_require__(3);

	var _LinkContainer3 = _interopRequireDefault(_LinkContainer2);

	exports.LinkContainer = _LinkContainer3['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _LinkContainer = __webpack_require__(3);

	var _LinkContainer2 = _interopRequireDefault(_LinkContainer);

	var IndexLinkContainer = (function (_React$Component) {
	  _inherits(IndexLinkContainer, _React$Component);

	  function IndexLinkContainer() {
	    _classCallCheck(this, IndexLinkContainer);

	    _get(Object.getPrototypeOf(IndexLinkContainer.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(IndexLinkContainer, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_LinkContainer2['default'], _extends({}, this.props, { onlyActiveOnIndex: true }));
	    }
	  }]);

	  return IndexLinkContainer;
	})(_react2['default'].Component);

	exports['default'] = IndexLinkContainer;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// This is largely taken from react-router/lib/Link.

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(4);

	var LinkContainer = (function (_React$Component) {
	  _inherits(LinkContainer, _React$Component);

	  function LinkContainer(props, context) {
	    _classCallCheck(this, LinkContainer);

	    _get(Object.getPrototypeOf(LinkContainer.prototype), 'constructor', this).call(this, props, context);

	    this.onClick = this.onClick.bind(this);
	  }

	  _createClass(LinkContainer, [{
	    key: 'onClick',
	    value: function onClick(event) {
	      if (this.props.disabled) {
	        event.preventDefault();
	        return;
	      }

	      if (this.props.children.props.onClick) {
	        this.props.children.props.onClick(event);
	      }

	      _reactRouter.Link.prototype.handleClick.call(this, event);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var history = this.context.history;
	      var _props = this.props;
	      var onlyActiveOnIndex = _props.onlyActiveOnIndex;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;
	      var children = _props.children;

	      var props = _objectWithoutProperties(_props, ['onlyActiveOnIndex', 'to', 'query', 'hash', 'children']);

	      delete props.state;

	      props.onClick = this.onClick;

	      // Ignore if rendered outside the context of history, simplifies unit testing.
	      if (history) {
	        props.href = history.createHref(to, query);

	        if (hash) {
	          props.href += hash;
	        }

	        props.active = history.isActive(to, query, onlyActiveOnIndex);
	      }

	      return _react2['default'].cloneElement(_react2['default'].Children.only(children), props);
	    }
	  }]);

	  return LinkContainer;
	})(_react2['default'].Component);

	exports['default'] = LinkContainer;

	LinkContainer.propTypes = {
	  onlyActiveOnIndex: _react2['default'].PropTypes.bool.isRequired,
	  to: _react2['default'].PropTypes.string.isRequired,
	  query: _react2['default'].PropTypes.object,
	  hash: _react2['default'].PropTypes.string,
	  state: _react2['default'].PropTypes.object,
	  onClick: _react2['default'].PropTypes.func,
	  disabled: _react2['default'].PropTypes.bool.isRequired,
	  children: _react2['default'].PropTypes.node.isRequired
	};

	LinkContainer.contextTypes = {
	  history: _react2['default'].PropTypes.object
	};

	LinkContainer.defaultProps = {
	  onlyActiveOnIndex: false,
	  disabled: false
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;