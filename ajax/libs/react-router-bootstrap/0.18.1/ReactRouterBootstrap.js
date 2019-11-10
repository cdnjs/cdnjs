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

	var _ButtonLink2 = __webpack_require__(1);

	var _ButtonLink3 = _interopRequireDefault(_ButtonLink2);

	exports.ButtonLink = _ButtonLink3['default'];

	var _ListGroupItemLink2 = __webpack_require__(5);

	var _ListGroupItemLink3 = _interopRequireDefault(_ListGroupItemLink2);

	exports.ListGroupItemLink = _ListGroupItemLink3['default'];

	var _MenuItemLink2 = __webpack_require__(6);

	var _MenuItemLink3 = _interopRequireDefault(_MenuItemLink2);

	exports.MenuItemLink = _MenuItemLink3['default'];

	var _NavItemLink2 = __webpack_require__(7);

	var _NavItemLink3 = _interopRequireDefault(_NavItemLink2);

	exports.NavItemLink = _NavItemLink3['default'];

	var _PageItemLink2 = __webpack_require__(8);

	var _PageItemLink3 = _interopRequireDefault(_PageItemLink2);

	exports.PageItemLink = _PageItemLink3['default'];

	var _RouterOverlayTrigger2 = __webpack_require__(9);

	var _RouterOverlayTrigger3 = _interopRequireDefault(_RouterOverlayTrigger2);

	exports.RouterOverlayTrigger = _RouterOverlayTrigger3['default'];

	var _ThumbnailLink2 = __webpack_require__(10);

	var _ThumbnailLink3 = _interopRequireDefault(_ThumbnailLink2);

	exports.ThumbnailLink = _ThumbnailLink3['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var ButtonLink = _react2['default'].createClass({
	  displayName: 'ButtonLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactBootstrap.Button,
	      _extends({}, this.getLinkProps(), { ref: 'button' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = ButtonLink;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	exports['default'] = {
	  propTypes: {
	    active: _react2['default'].PropTypes.bool,
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
	   * Returns props except those used by this Mixin
	   * Gets "active" from router if needed.
	   * Gets the value of the "href" attribute to use on the DOM element.
	   * Sets "onClick" to "handleRouteTo".
	   */
	  getLinkProps: function getLinkProps() {
	    var _props = this.props;
	    var to = _props.to;
	    var params = _props.params;
	    var query = _props.query;

	    var props = _objectWithoutProperties(_props, ['to', 'params', 'query']);

	    if (this.props.active === undefined) {
	      props.active = this.context.router.isActive(to, params, query);
	    }

	    props.href = this.context.router.makeHref(to, params, query);

	    props.onClick = this.handleRouteTo;

	    return props;
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

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var LinkGroupItemLink = _react2['default'].createClass({
	  displayName: 'LinkGroupItemLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactBootstrap.ListGroupItem,
	      _extends({}, this.getLinkProps(), { ref: 'listGroupItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = LinkGroupItemLink;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var MenuItemLink = _react2['default'].createClass({
	  displayName: 'MenuItemLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    var props = this.getLinkProps();
	    delete props.onSelect; // this is done on the copy of this.props

	    return _react2['default'].createElement(
	      _reactBootstrap.MenuItem,
	      _extends({}, props, { ref: 'menuItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = MenuItemLink;
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

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var NavItemLink = _react2['default'].createClass({
	  displayName: 'NavItemLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactBootstrap.NavItem,
	      _extends({}, this.getLinkProps(), { ref: 'navItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = NavItemLink;
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

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var PageItemLink = _react2['default'].createClass({
	  displayName: 'PageItemLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactBootstrap.PageItem,
	      _extends({}, this.getLinkProps(), { ref: 'pageItem' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = PageItemLink;
	module.exports = exports['default'];

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

	exports['default'] = _reactBootstrap.OverlayTrigger.withContext({
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(3);

	var _LinkMixin = __webpack_require__(4);

	var _LinkMixin2 = _interopRequireDefault(_LinkMixin);

	var ThumbnailLink = _react2['default'].createClass({
	  displayName: 'ThumbnailLink',

	  mixins: [_LinkMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      _reactBootstrap.Thumbnail,
	      _extends({}, this.getLinkProps(), { ref: 'thumbnail' }),
	      this.props.children
	    );
	  }
	});

	exports['default'] = ThumbnailLink;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;