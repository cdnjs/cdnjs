(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-bootstrap"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-bootstrap"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterBootstrap"] = factory(require("react"), require("react-bootstrap"));
	else
		root["ReactRouterBootstrap"] = factory(root["React"], root["ReactBootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	var _ButtonLink = __webpack_require__(6);

	var _ButtonLink2 = _interopRequireDefault(_ButtonLink);

	var _ListGroupItemLink = __webpack_require__(7);

	var _ListGroupItemLink2 = _interopRequireDefault(_ListGroupItemLink);

	var _MenuItemLink = __webpack_require__(8);

	var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

	var _NavItemLink = __webpack_require__(1);

	var _NavItemLink2 = _interopRequireDefault(_NavItemLink);

	var _RouterModalTrigger = __webpack_require__(9);

	var _RouterModalTrigger2 = _interopRequireDefault(_RouterModalTrigger);

	var _RouterOverlayTrigger = __webpack_require__(10);

	var _RouterOverlayTrigger2 = _interopRequireDefault(_RouterOverlayTrigger);

	exports['default'] = {
	  ButtonLink: _ButtonLink2['default'],
	  ListGroupItemLink: _ListGroupItemLink2['default'],
	  MenuItemLink: _MenuItemLink2['default'],
	  NavItemLink: _NavItemLink2['default'],
	  RouterModalTrigger: _RouterModalTrigger2['default'],
	  RouterOverlayTrigger: _RouterOverlayTrigger2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var NavItemLink = _react2['default'].createClass({
	  displayName: 'NavItemLink',

	  mixins: [_LinkMixin2['default']],
	  contextTypes: {
	    router: _react2['default'].PropTypes.func.isRequired
	  },

	  render: function render() {
	    var _props = this.props;
	    var to = _props.to;
	    var params = _props.params;
	    var query = _props.query;
	    var active = _props.active;

	    var props = _objectWithoutProperties(_props, ['to', 'params', 'query', 'active']);

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return _react2['default'].createElement(
	      _reactBootstrap.NavItem,
	      _extends({}, props, {
	        href: this.getHref(),
	        active: active,
	        onClick: this.handleRouteTo,
	        ref: 'navItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = NavItemLink;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(5);

	var _classnames2 = _interopRequireDefault(_classnames);

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	exports['default'] = {
	  propTypes: {
	    activeClassName: _react2['default'].PropTypes.string.isRequired,
	    disabled: _react2['default'].PropTypes.bool,
	    to: _react2['default'].PropTypes.string.isRequired,
	    params: _react2['default'].PropTypes.object,
	    query: _react2['default'].PropTypes.object,
	    onClick: _react2['default'].PropTypes.func
	  },
	  contextTypes: {
	    router: _react2['default'].PropTypes.func.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      activeClassName: 'active'
	    };
	  },

	  /**
	   * Returns the value of the "href" attribute to use on the DOM element.
	   */
	  getHref: function getHref() {
	    return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
	  },

	  /**
	   * Returns the value of the "class" attribute to use on the DOM element, which contains
	   * the value of the activeClassName property when this <Link> is active.
	   */
	  getClassName: function getClassName() {
	    var classSet = {};

	    if (this.props.className) {
	      classSet[this.props.className] = true;
	    }

	    if (this.context.router.isActive(this.props.to, this.props.params, this.props.query)) {
	      _classnames2['default'][this.props.activeClassName] = true;
	    }

	    return (0, _classnames2['default'])(classSet);
	  },

	  handleRouteTo: function handleRouteTo(event) {
	    var allowTransition = true;
	    var clickResult = undefined;

	    if (this.props.disabled) {
	      event.preventDefault();
	      return;
	    }

	    if (this.props.onClick) {
	      clickResult = this.props.onClick(event);
	    }

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
	      return;
	    }

	    if (clickResult === false || event.defaultPrevented === true) {
	      allowTransition = false;
	    }

	    event.preventDefault();

	    if (allowTransition) {
	      this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var ButtonLink = _react2['default'].createClass({
	  displayName: 'ButtonLink',

	  mixins: [_LinkMixin2['default']],
	  contextTypes: {
	    router: _react2['default'].PropTypes.func.isRequired
	  },

	  render: function render() {
	    var _props = this.props;
	    var to = _props.to;
	    var params = _props.params;
	    var query = _props.query;
	    var active = _props.active;

	    var props = _objectWithoutProperties(_props, ['to', 'params', 'query', 'active']);

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return _react2['default'].createElement(
	      _reactBootstrap.Button,
	      _extends({}, props, {
	        href: this.getHref(),
	        active: active,
	        onClick: this.handleRouteTo,
	        ref: 'button' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = ButtonLink;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var LinkGroupItemLink = _react2['default'].createClass({
	  displayName: 'LinkGroupItemLink',

	  mixins: [_LinkMixin2['default']],
	  contextTypes: {
	    router: _react2['default'].PropTypes.func.isRequired
	  },

	  render: function render() {
	    var _props = this.props;
	    var to = _props.to;
	    var params = _props.params;
	    var query = _props.query;
	    var active = _props.active;

	    var props = _objectWithoutProperties(_props, ['to', 'params', 'query', 'active']);

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return _react2['default'].createElement(
	      _reactBootstrap.ListGroupItem,
	      _extends({}, props, {
	        href: this.getHref(),
	        active: active,
	        onClick: this.handleRouteTo,
	        ref: 'listGroupItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = LinkGroupItemLink;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var MenuItemLink = _react2['default'].createClass({
	  displayName: 'MenuItemLink',

	  mixins: [_LinkMixin2['default']],
	  contextTypes: {
	    router: _react2['default'].PropTypes.func.isRequired
	  },

	  render: function render() {
	    var _props = this.props;
	    var to = _props.to;
	    var params = _props.params;
	    var query = _props.query;
	    var active = _props.active;
	    var onSelect = _props.onSelect;

	    var props = _objectWithoutProperties(_props, ['to', 'params', 'query', 'active', 'onSelect']);

	    if (active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return _react2['default'].createElement(
	      _reactBootstrap.MenuItem,
	      _extends({}, props, {
	        href: this.getHref(),
	        active: active,
	        onClick: this.handleRouteTo,
	        ref: 'menuItem'
	      }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = MenuItemLink;
	module.exports = exports['default'];
	// eslint-disable-line no-unused-vars

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	exports['default'] = _reactBootstrap.ModalTrigger.withContext({
	  router: _react2['default'].PropTypes.func
	});
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	exports['default'] = _reactBootstrap.OverlayTrigger.withContext({
	  router: _react2['default'].PropTypes.func
	});
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;