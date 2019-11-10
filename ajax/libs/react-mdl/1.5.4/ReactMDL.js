(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactMDL"] = factory(require("react"), require("react-dom"));
	else
		root["ReactMDL"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _mdlUpgrade = __webpack_require__(1);
	
	Object.defineProperty(exports, 'mdlUpgrade', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_mdlUpgrade).default;
	    }
	});
	
	var _MDLComponent = __webpack_require__(3);
	
	Object.defineProperty(exports, 'MDLComponent', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_MDLComponent).default;
	    }
	});
	
	var _Badge = __webpack_require__(5);
	
	Object.defineProperty(exports, 'Badge', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Badge).default;
	    }
	});
	
	var _Button = __webpack_require__(7);
	
	Object.defineProperty(exports, 'Button', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Button).default;
	    }
	});
	
	var _Card = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Card', {
	    enumerable: true,
	    get: function get() {
	        return _Card.Card;
	    }
	});
	Object.defineProperty(exports, 'CardTitle', {
	    enumerable: true,
	    get: function get() {
	        return _Card.CardTitle;
	    }
	});
	Object.defineProperty(exports, 'CardActions', {
	    enumerable: true,
	    get: function get() {
	        return _Card.CardActions;
	    }
	});
	Object.defineProperty(exports, 'CardMedia', {
	    enumerable: true,
	    get: function get() {
	        return _Card.CardMedia;
	    }
	});
	Object.defineProperty(exports, 'CardText', {
	    enumerable: true,
	    get: function get() {
	        return _Card.CardText;
	    }
	});
	Object.defineProperty(exports, 'CardMenu', {
	    enumerable: true,
	    get: function get() {
	        return _Card.CardMenu;
	    }
	});
	
	var _Checkbox = __webpack_require__(15);
	
	Object.defineProperty(exports, 'Checkbox', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Checkbox).default;
	    }
	});
	
	var _DataTable = __webpack_require__(16);
	
	Object.defineProperty(exports, 'DataTable', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_DataTable).default;
	    }
	});
	Object.defineProperty(exports, 'Table', {
	    enumerable: true,
	    get: function get() {
	        return _DataTable.Table;
	    }
	});
	Object.defineProperty(exports, 'TableHeader', {
	    enumerable: true,
	    get: function get() {
	        return _DataTable.TableHeader;
	    }
	});
	
	var _Dialog = __webpack_require__(22);
	
	Object.defineProperty(exports, 'Dialog', {
	    enumerable: true,
	    get: function get() {
	        return _Dialog.Dialog;
	    }
	});
	Object.defineProperty(exports, 'DialogTitle', {
	    enumerable: true,
	    get: function get() {
	        return _Dialog.DialogTitle;
	    }
	});
	Object.defineProperty(exports, 'DialogContent', {
	    enumerable: true,
	    get: function get() {
	        return _Dialog.DialogContent;
	    }
	});
	Object.defineProperty(exports, 'DialogActions', {
	    enumerable: true,
	    get: function get() {
	        return _Dialog.DialogActions;
	    }
	});
	
	var _FABButton = __webpack_require__(26);
	
	Object.defineProperty(exports, 'FABButton', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_FABButton).default;
	    }
	});
	
	var _Footer = __webpack_require__(27);
	
	Object.defineProperty(exports, 'Footer', {
	    enumerable: true,
	    get: function get() {
	        return _Footer.Footer;
	    }
	});
	Object.defineProperty(exports, 'FooterSection', {
	    enumerable: true,
	    get: function get() {
	        return _Footer.FooterSection;
	    }
	});
	Object.defineProperty(exports, 'FooterDropDownSection', {
	    enumerable: true,
	    get: function get() {
	        return _Footer.FooterDropDownSection;
	    }
	});
	Object.defineProperty(exports, 'FooterLinkList', {
	    enumerable: true,
	    get: function get() {
	        return _Footer.FooterLinkList;
	    }
	});
	
	var _Grid = __webpack_require__(33);
	
	Object.defineProperty(exports, 'Grid', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Grid).default;
	    }
	});
	Object.defineProperty(exports, 'Cell', {
	    enumerable: true,
	    get: function get() {
	        return _Grid.Cell;
	    }
	});
	
	var _Icon = __webpack_require__(34);
	
	Object.defineProperty(exports, 'Icon', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Icon).default;
	    }
	});
	
	var _IconButton = __webpack_require__(35);
	
	Object.defineProperty(exports, 'IconButton', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_IconButton).default;
	    }
	});
	
	var _IconToggle = __webpack_require__(36);
	
	Object.defineProperty(exports, 'IconToggle', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_IconToggle).default;
	    }
	});
	
	var _Layout = __webpack_require__(37);
	
	Object.defineProperty(exports, 'Layout', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Layout;
	    }
	});
	Object.defineProperty(exports, 'Header', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Header;
	    }
	});
	Object.defineProperty(exports, 'Drawer', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Drawer;
	    }
	});
	Object.defineProperty(exports, 'HeaderRow', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.HeaderRow;
	    }
	});
	Object.defineProperty(exports, 'HeaderTabs', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.HeaderTabs;
	    }
	});
	Object.defineProperty(exports, 'Spacer', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Spacer;
	    }
	});
	Object.defineProperty(exports, 'Navigation', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Navigation;
	    }
	});
	Object.defineProperty(exports, 'Content', {
	    enumerable: true,
	    get: function get() {
	        return _Layout.Content;
	    }
	});
	
	var _List = __webpack_require__(47);
	
	Object.defineProperty(exports, 'List', {
	    enumerable: true,
	    get: function get() {
	        return _List.List;
	    }
	});
	Object.defineProperty(exports, 'ListItem', {
	    enumerable: true,
	    get: function get() {
	        return _List.ListItem;
	    }
	});
	Object.defineProperty(exports, 'ListItemAction', {
	    enumerable: true,
	    get: function get() {
	        return _List.ListItemAction;
	    }
	});
	Object.defineProperty(exports, 'ListItemContent', {
	    enumerable: true,
	    get: function get() {
	        return _List.ListItemContent;
	    }
	});
	
	var _Menu = __webpack_require__(51);
	
	Object.defineProperty(exports, 'Menu', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Menu).default;
	    }
	});
	Object.defineProperty(exports, 'MenuItem', {
	    enumerable: true,
	    get: function get() {
	        return _Menu.MenuItem;
	    }
	});
	
	var _ProgressBar = __webpack_require__(52);
	
	Object.defineProperty(exports, 'ProgressBar', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_ProgressBar).default;
	    }
	});
	
	var _Radio = __webpack_require__(53);
	
	Object.defineProperty(exports, 'Radio', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Radio).default;
	    }
	});
	
	var _RadioGroup = __webpack_require__(54);
	
	Object.defineProperty(exports, 'RadioGroup', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_RadioGroup).default;
	    }
	});
	
	var _Slider = __webpack_require__(55);
	
	Object.defineProperty(exports, 'Slider', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Slider).default;
	    }
	});
	
	var _Snackbar = __webpack_require__(56);
	
	Object.defineProperty(exports, 'Snackbar', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Snackbar).default;
	    }
	});
	
	var _Spinner = __webpack_require__(57);
	
	Object.defineProperty(exports, 'Spinner', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Spinner).default;
	    }
	});
	
	var _Switch = __webpack_require__(58);
	
	Object.defineProperty(exports, 'Switch', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Switch).default;
	    }
	});
	
	var _Tabs = __webpack_require__(59);
	
	Object.defineProperty(exports, 'Tabs', {
	    enumerable: true,
	    get: function get() {
	        return _Tabs.Tabs;
	    }
	});
	Object.defineProperty(exports, 'Tab', {
	    enumerable: true,
	    get: function get() {
	        return _Tabs.Tab;
	    }
	});
	Object.defineProperty(exports, 'TabBar', {
	    enumerable: true,
	    get: function get() {
	        return _Tabs.TabBar;
	    }
	});
	
	var _Textfield = __webpack_require__(62);
	
	Object.defineProperty(exports, 'Textfield', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Textfield).default;
	    }
	});
	
	var _Tooltip = __webpack_require__(18);
	
	Object.defineProperty(exports, 'Tooltip', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Tooltip).default;
	    }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _MDLComponent = __webpack_require__(3);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (Component) {
	    var render = Component.prototype.render;
	
	    Component.prototype.render = function rendr() {
	        // eslint-disable-line no-param-reassign
	        var renderBound = render.bind(this);
	        return _react2.default.createElement(
	            _MDLComponent2.default,
	            null,
	            renderBound()
	        );
	    };
	
	    return Component;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _reactDom = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MDLComponent = function (_Component) {
	    _inherits(MDLComponent, _Component);
	
	    function MDLComponent() {
	        _classCallCheck(this, MDLComponent);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MDLComponent).apply(this, arguments));
	    }
	
	    _createClass(MDLComponent, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.componentHandler.upgradeElement((0, _reactDom.findDOMNode)(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.componentHandler.downgradeElements((0, _reactDom.findDOMNode)(this));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react.Children.only(this.props.children);
	        }
	    }]);
	
	    return MDLComponent;
	}(_react.Component);
	
	exports.default = MDLComponent;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
	    className: _react.PropTypes.string,
	    text: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    overlap: _react.PropTypes.bool,
	    noBackground: _react.PropTypes.bool
	};
	
	var Badge = function (_React$Component) {
	    _inherits(Badge, _React$Component);
	
	    function Badge() {
	        _classCallCheck(this, Badge);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Badge).apply(this, arguments));
	    }
	
	    _createClass(Badge, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var children = _props.children;
	            var className = _props.className;
	            var text = _props.text;
	            var overlap = _props.overlap;
	            var noBackground = _props.noBackground;
	
	            // No badge if no children
	
	            if (!_react2.default.Children.count(children)) return null;
	
	            var element = typeof children === 'string' ? _react2.default.createElement(
	                'span',
	                null,
	                children
	            ) : _react2.default.Children.only(children);
	
	            // No text -> No need of badge
	            if (text === null || typeof text === 'undefined') return element;
	
	            return _react2.default.cloneElement(element, {
	                className: (0, _classnames2.default)(className, element.props.className, 'mdl-badge', {
	                    'mdl-badge--overlap': !!overlap,
	                    'mdl-badge--no-background': !!noBackground
	                }),
	                'data-badge': text
	            });
	        }
	    }]);
	
	    return Badge;
	}(_react2.default.Component);
	
	Badge.propTypes = propTypes;
	
	exports.default = Badge;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    accent: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    colored: _react.PropTypes.bool,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    href: _react.PropTypes.string,
	    primary: _react.PropTypes.bool,
	    raised: _react.PropTypes.bool,
	    ripple: _react.PropTypes.bool
	};
	
	// eslint-disable-next-line react/prefer-stateless-function
	
	var Button = function (_React$Component) {
	    _inherits(Button, _React$Component);
	
	    function Button() {
	        _classCallCheck(this, Button);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
	    }
	
	    _createClass(Button, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var accent = _props.accent;
	            var className = _props.className;
	            var colored = _props.colored;
	            var primary = _props.primary;
	            var raised = _props.raised;
	            var ripple = _props.ripple;
	            var component = _props.component;
	            var href = _props.href;
	            var children = _props.children;
	
	            var otherProps = _objectWithoutProperties(_props, ['accent', 'className', 'colored', 'primary', 'raised', 'ripple', 'component', 'href', 'children']);
	
	            var buttonClasses = (0, _classnames2.default)('mdl-button mdl-js-button', {
	                'mdl-js-ripple-effect': ripple,
	                'mdl-button--raised': raised,
	                'mdl-button--colored': colored,
	                'mdl-button--primary': primary,
	                'mdl-button--accent': accent
	            }, className);
	
	            return _react2.default.createElement(component || (href ? 'a' : 'button'), _extends({
	                className: buttonClasses,
	                href: href
	            }, otherProps), children);
	        }
	    }]);
	
	    return Button;
	}(_react2.default.Component);
	
	Button.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Button);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardMedia = exports.CardActions = exports.CardTitle = exports.CardMenu = exports.CardText = exports.Card = undefined;
	
	var _Card = __webpack_require__(9);
	
	Object.defineProperty(exports, 'Card', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Card).default;
	  }
	});
	
	var _CardTitle = __webpack_require__(12);
	
	Object.defineProperty(exports, 'CardTitle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_CardTitle).default;
	  }
	});
	
	var _CardActions = __webpack_require__(13);
	
	Object.defineProperty(exports, 'CardActions', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_CardActions).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(14);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CardText = exports.CardText = (0, _basicClassCreator2.default)('CardText', 'mdl-card__supporting-text');
	var CardMenu = exports.CardMenu = (0, _basicClassCreator2.default)('CardMenu', 'mdl-card__menu');
	var CardMedia = exports.CardMedia = (0, _basicClassCreator2.default)('CardMedia', 'mdl-card__media');

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(10);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(11);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Card = function Card(props) {
	    var className = props.className;
	    var shadow = props.shadow;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'shadow', 'children']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-card', _defineProperty({}, _shadows2.default[shadowLevel], hasShadow), className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	Card.propTypes = {
	    className: _react.PropTypes.string,
	    shadow: _react.PropTypes.number
	};
	
	exports.default = Card;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = clamp
	
	function clamp(value, min, max) {
	  return min < max
	    ? (value < min ? min : value > max ? max : value)
	    : (value < max ? max : value > min ? min : value)
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var values = [2, 3, 4, 5, 6, 8, 16];
	exports.default = values.map(function (v) {
	  return "mdl-shadow--" + v + "dp";
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    expand: _react.PropTypes.bool
	};
	
	var CardTitle = function CardTitle(props) {
	    var className = props.className;
	    var children = props.children;
	    var expand = props.expand;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'children', 'expand']);
	
	    var classes = (0, _classnames2.default)('mdl-card__title', {
	        'mdl-card--expand': expand
	    }, className);
	
	    var title = typeof children === 'string' ? _react2.default.createElement('h2', { className: 'mdl-card__title-text' }, children) : children;
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title
	    );
	};
	
	CardTitle.propTypes = propTypes;
	
	exports.default = CardTitle;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var CardActions = function CardActions(props) {
	    var className = props.className;
	    var border = props.border;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'border', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-card__actions', {
	        'mdl-card--border': border
	    }, className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	CardActions.propTypes = {
	    border: _react.PropTypes.bool,
	    className: _react.PropTypes.string
	};
	
	exports.default = CardActions;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	exports.default = function (displayName, defaultClassName) {
	    var element = arguments.length <= 2 || arguments[2] === undefined ? 'div' : arguments[2];
	
	    var fn = function fn(props) {
	        var className = props.className;
	        var children = props.children;
	
	        var otherProps = _objectWithoutProperties(props, ['className', 'children']);
	
	        return _react2.default.createElement(element, _extends({
	            className: (0, _classnames2.default)(defaultClassName, className)
	        }, otherProps), children);
	    };
	
	    fn.displayName = displayName;
	    fn.propTypes = {
	        className: _react.PropTypes.string
	    };
	
	    return fn;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    label: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	
	var Checkbox = function (_React$Component) {
	    _inherits(Checkbox, _React$Component);
	
	    function Checkbox() {
	        _classCallCheck(this, Checkbox);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).apply(this, arguments));
	    }
	
	    _createClass(Checkbox, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.disabled !== prevProps.disabled) {
	                var fnName = this.props.disabled ? 'disable' : 'enable';
	                (0, _reactDom.findDOMNode)(this).MaterialCheckbox[fnName]();
	            }
	            if (this.props.checked !== prevProps.checked) {
	                var _fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialCheckbox[_fnName]();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var label = _props.label;
	            var ripple = _props.ripple;
	
	            var inputProps = _objectWithoutProperties(_props, ['className', 'label', 'ripple']);
	
	            var classes = (0, _classnames2.default)('mdl-checkbox mdl-js-checkbox', {
	                'mdl-js-ripple-effect': ripple
	            }, className);
	
	            return _react2.default.createElement(
	                'label',
	                { className: classes },
	                _react2.default.createElement('input', _extends({
	                    type: 'checkbox',
	                    className: 'mdl-checkbox__input'
	                }, inputProps)),
	                label && _react2.default.createElement(
	                    'span',
	                    { className: 'mdl-checkbox__label' },
	                    label
	                )
	            );
	        }
	    }]);
	
	    return Checkbox;
	}(_react2.default.Component);
	
	Checkbox.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Checkbox);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _TableHeader = __webpack_require__(17);
	
	Object.defineProperty(exports, 'TableHeader', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TableHeader).default;
	  }
	});
	
	var _Table = __webpack_require__(19);
	
	Object.defineProperty(exports, 'Table', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Table).default;
	  }
	});
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Table).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tooltip = __webpack_require__(18);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    cellFormatter: _react.PropTypes.func,
	    className: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired,
	    numeric: _react.PropTypes.bool,
	    onClick: _react.PropTypes.func,
	    nosort: _react.PropTypes.bool,
	    sortFn: _react.PropTypes.func,
	    tooltip: _react.PropTypes.node
	};
	
	var TableHeader = function TableHeader(props) {
	    var className = props.className;
	    var name = props.name;
	    var numeric = props.numeric;
	    var onClick = props.onClick;
	    var nosort = props.nosort;
	    var tooltip = props.tooltip;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'name', 'numeric', 'onClick', 'nosort', 'tooltip', 'children']);
	
	    var classes = (0, _classnames2.default)({
	        'mdl-data-table__cell--non-numeric': !numeric
	    }, className);
	
	    var clickFn = !nosort && onClick ? function (e) {
	        return onClick(e, name);
	    } : null;
	
	    return _react2.default.createElement(
	        'th',
	        _extends({ className: classes, onClick: clickFn }, otherProps),
	        !!tooltip ? _react2.default.createElement(
	            _Tooltip2.default,
	            { label: tooltip },
	            children
	        ) : children
	    );
	};
	
	TableHeader.propTypes = propTypes;
	
	exports.default = TableHeader;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _MDLComponent = __webpack_require__(3);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Tooltip = function Tooltip(props) {
	    var label = props.label;
	    var large = props.large;
	    var children = props.children;
	    var position = props.position;
	
	    var otherProps = _objectWithoutProperties(props, ['label', 'large', 'children', 'position']);
	
	    var id = Math.random().toString(36).substr(2);
	
	    var newLabel = typeof label === 'string' ? _react2.default.createElement(
	        'span',
	        null,
	        label
	    ) : label;
	
	    var element = void 0;
	    if (typeof children === 'string') {
	        element = _react2.default.createElement(
	            'span',
	            null,
	            children
	        );
	    } else {
	        element = _react2.default.Children.only(children);
	    }
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ style: { display: 'inline-block' } }, otherProps),
	        _react2.default.cloneElement(element, { id: id }),
	        _react2.default.createElement(
	            _MDLComponent2.default,
	            null,
	            _react2.default.cloneElement(newLabel, {
	                htmlFor: id,
	                className: (0, _classnames2.default)('mdl-tooltip', _defineProperty({
	                    'mdl-tooltip--large': large
	                }, 'mdl-tooltip--' + position, typeof position !== 'undefined'))
	            })
	        )
	    );
	};
	
	Tooltip.propTypes = {
	    children: _react.PropTypes.node.isRequired,
	    label: _react.PropTypes.node.isRequired,
	    large: _react.PropTypes.bool,
	    position: _react.PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
	};
	
	exports.default = Tooltip;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UndecoratedTable = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(10);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(11);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	var _TableHeader = __webpack_require__(17);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _Selectable = __webpack_require__(20);
	
	var _Selectable2 = _interopRequireDefault(_Selectable);
	
	var _Sortable = __webpack_require__(21);
	
	var _Sortable2 = _interopRequireDefault(_Sortable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    columns: function columns(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use the component `TableHeader` instead.');
	    },
	    data: function data(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use `rows` instead. `' + propName + '` will be removed in the next major release.');
	    },
	    rowKeyColumn: _react.PropTypes.string,
	    rows: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	    shadow: _react.PropTypes.number
	};
	
	var Table = function (_React$Component) {
	    _inherits(Table, _React$Component);
	
	    function Table() {
	        _classCallCheck(this, Table);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	    }
	
	    _createClass(Table, [{
	        key: 'renderCell',
	        value: function renderCell(column, row, idx) {
	            var className = !column.numeric ? 'mdl-data-table__cell--non-numeric' : '';
	            return _react2.default.createElement(
	                'td',
	                { key: column.name, className: className },
	                column.cellFormatter ? column.cellFormatter(row[column.name], row, idx) : row[column.name]
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props;
	            var className = _props.className;
	            var columns = _props.columns;
	            var shadow = _props.shadow;
	            var children = _props.children;
	            var rowKeyColumn = _props.rowKeyColumn;
	            var rows = _props.rows;
	            var data = _props.data;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'columns', 'shadow', 'children', 'rowKeyColumn', 'rows', 'data']);
	
	            var realRows = rows || data;
	
	            var hasShadow = typeof shadow !== 'undefined';
	            var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	            var classes = (0, _classnames2.default)('mdl-data-table', _defineProperty({}, _shadows2.default[shadowLevel], hasShadow), className);
	
	            var columnChildren = !!children ? _react2.default.Children.toArray(children) : columns.map(function (column) {
	                return _react2.default.createElement(
	                    _TableHeader2.default,
	                    {
	                        key: column.name,
	                        className: column.className,
	                        name: column.name,
	                        numeric: column.numeric,
	                        tooltip: column.tooltip
	                    },
	                    column.label
	                );
	            });
	            return _react2.default.createElement(
	                'table',
	                _extends({ className: classes }, otherProps),
	                _react2.default.createElement(
	                    'thead',
	                    null,
	                    _react2.default.createElement(
	                        'tr',
	                        null,
	                        columnChildren
	                    )
	                ),
	                _react2.default.createElement(
	                    'tbody',
	                    null,
	                    realRows.map(function (row, idx) {
	                        return _react2.default.createElement(
	                            'tr',
	                            { key: row[rowKeyColumn] || row.key || idx, className: row.className },
	                            columnChildren.map(function (child) {
	                                return _this2.renderCell(child.props, row, idx);
	                            })
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	
	    return Table;
	}(_react2.default.Component);
	
	Table.propTypes = propTypes;
	
	exports.default = (0, _Sortable2.default)((0, _Selectable2.default)(Table));
	var UndecoratedTable = exports.UndecoratedTable = Table;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TableHeader = __webpack_require__(17);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _Checkbox = __webpack_require__(15);
	
	var _Checkbox2 = _interopRequireDefault(_Checkbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    columns: function columns(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use the component `TableHeader` instead.');
	    },
	    data: function data(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use `rows` instead. `' + propName + '` will be removed in the next major release.');
	    },
	    onSelectionChanged: _react.PropTypes.func,
	    rowKeyColumn: _react.PropTypes.string,
	    rows: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	    selectable: _react.PropTypes.bool
	};
	
	var defaultProps = {
	    onSelectionChanged: function onSelectionChanged() {
	        // do nothing
	    }
	};
	
	exports.default = function (Component) {
	    var Selectable = function (_React$Component) {
	        _inherits(Selectable, _React$Component);
	
	        function Selectable(props) {
	            _classCallCheck(this, Selectable);
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Selectable).call(this, props));
	
	            _this.handleChangeHeaderCheckbox = _this.handleChangeHeaderCheckbox.bind(_this);
	            _this.handleChangeRowCheckbox = _this.handleChangeRowCheckbox.bind(_this);
	            _this.builRowCheckbox = _this.builRowCheckbox.bind(_this);
	
	            if (props.selectable) {
	                _this.state = {
	                    headerSelected: false,
	                    selectedRows: []
	                };
	            }
	            return _this;
	        }
	
	        _createClass(Selectable, [{
	            key: 'componentWillReceiveProps',
	            value: function componentWillReceiveProps(nextProps) {
	                var _this2 = this;
	
	                if (nextProps.selectable) {
	                    (function () {
	                        var rows = nextProps.rows;
	                        var data = nextProps.data;
	                        var rowKeyColumn = nextProps.rowKeyColumn;
	
	                        var rrows = rows || data;
	
	                        // keep only existing rows
	                        var selectedRows = _this2.state.selectedRows.filter(function (k) {
	                            return rrows.map(function (row, i) {
	                                return row[rowKeyColumn] || row.key || i;
	                            }).indexOf(k) > -1;
	                        });
	
	                        _this2.setState({
	                            headerSelected: selectedRows.length === rrows.length,
	                            selectedRows: selectedRows
	                        });
	
	                        nextProps.onSelectionChanged(selectedRows);
	                    })();
	                }
	            }
	        }, {
	            key: 'handleChangeHeaderCheckbox',
	            value: function handleChangeHeaderCheckbox(e) {
	                var _props = this.props;
	                var rowKeyColumn = _props.rowKeyColumn;
	                var rows = _props.rows;
	                var data = _props.data;
	
	                var selected = e.target.checked;
	                var selectedRows = selected ? (rows || data).map(function (row, idx) {
	                    return row[rowKeyColumn] || row.key || idx;
	                }) : [];
	
	                this.setState({
	                    headerSelected: selected,
	                    selectedRows: selectedRows
	                });
	
	                this.props.onSelectionChanged(selectedRows);
	            }
	        }, {
	            key: 'handleChangeRowCheckbox',
	            value: function handleChangeRowCheckbox(e) {
	                var _props2 = this.props;
	                var rows = _props2.rows;
	                var data = _props2.data;
	
	                var rowId = JSON.parse(e.target.dataset.reactmdl).id;
	                var rowChecked = e.target.checked;
	                var selectedRows = this.state.selectedRows;
	
	                if (rowChecked) {
	                    selectedRows.push(rowId);
	                } else {
	                    var idx = selectedRows.indexOf(rowId);
	                    selectedRows.splice(idx, 1);
	                }
	
	                this.setState({
	                    headerSelected: (rows || data).length === selectedRows.length,
	                    selectedRows: selectedRows
	                });
	
	                this.props.onSelectionChanged(selectedRows);
	            }
	        }, {
	            key: 'builRowCheckbox',
	            value: function builRowCheckbox(content, row, idx) {
	                var rowKey = row[this.props.rowKeyColumn] || row.key || idx;
	                var isSelected = this.state.selectedRows.indexOf(rowKey) > -1;
	                return _react2.default.createElement(_Checkbox2.default, {
	                    className: 'mdl-data-table__select',
	                    'data-reactmdl': JSON.stringify({ id: rowKey }),
	                    checked: isSelected,
	                    onChange: this.handleChangeRowCheckbox
	                });
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                var _this3 = this;
	
	                var _props3 = this.props;
	                var rows = _props3.rows;
	                var data = _props3.data;
	                var selectable = _props3.selectable;
	                var children = _props3.children;
	                var rowKeyColumn = _props3.rowKeyColumn;
	
	                var otherProps = _objectWithoutProperties(_props3, ['rows', 'data', 'selectable', 'children', 'rowKeyColumn']);
	
	                var realRows = selectable ? (rows || data).map(function (row, idx) {
	                    var rowKey = row[rowKeyColumn] || row.key || idx;
	                    return _extends({}, row, {
	                        className: (0, _classnames2.default)({
	                            'is-selected': _this3.state.selectedRows.indexOf(rowKey) > -1
	                        }, row.className)
	                    });
	                }) : rows || data;
	
	                return _react2.default.createElement(
	                    Component,
	                    _extends({ rows: realRows }, otherProps),
	                    selectable && _react2.default.createElement(
	                        _TableHeader2.default,
	                        { name: 'mdl-header-select', cellFormatter: this.builRowCheckbox },
	                        _react2.default.createElement(_Checkbox2.default, { className: 'mdl-data-table__select', checked: this.state.headerSelected, onChange: this.handleChangeHeaderCheckbox })
	                    ),
	                    children
	                );
	            }
	        }]);
	
	        return Selectable;
	    }(_react2.default.Component);
	
	    Selectable.propTypes = propTypes;
	    Selectable.defaultProps = defaultProps;
	    return Selectable;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TableHeader = __webpack_require__(17);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function initState(props) {
	    return {
	        rows: (props.rows || props.data).slice(),
	        sortHeader: null,
	        isAsc: true
	    };
	}
	
	var propTypes = {
	    columns: function columns(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use the component `TableHeader` instead.');
	    },
	    data: function data(props, propName, componentName) {
	        return props[propName] && new Error(componentName + ': `' + propName + '` is deprecated, please use `rows` instead. `' + propName + '` will be removed in the next major release.');
	    },
	    rows: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	    sortable: _react.PropTypes.bool
	};
	
	exports.default = function (Component) {
	    var Sortable = function (_React$Component) {
	        _inherits(Sortable, _React$Component);
	
	        function Sortable(props) {
	            _classCallCheck(this, Sortable);
	
	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sortable).call(this, props));
	
	            _this.handleClickColumn = _this.handleClickColumn.bind(_this);
	
	            if (props.sortable) {
	                _this.state = initState(props);
	            }
	            return _this;
	        }
	
	        _createClass(Sortable, [{
	            key: 'componentWillReceiveProps',
	            value: function componentWillReceiveProps(nextProps) {
	                if (nextProps.sortable) {
	                    var realRows = nextProps.rows || nextProps.data;
	                    var rows = this.state.sortHeader ? this.getSortedRowsForColumn(this.state.isAsc, this.state.sortHeader, realRows) : realRows;
	
	                    this.setState({
	                        rows: rows
	                    });
	                }
	            }
	        }, {
	            key: 'getColumnClass',
	            value: function getColumnClass(column) {
	                var _state = this.state;
	                var sortHeader = _state.sortHeader;
	                var isAsc = _state.isAsc;
	
	
	                return (0, _classnames2.default)(column.className, {
	                    'mdl-data-table__header--sorted-ascending': sortHeader === column.name && isAsc,
	                    'mdl-data-table__header--sorted-descending': sortHeader === column.name && !isAsc
	                });
	            }
	        }, {
	            key: 'getDefaultSortFn',
	            value: function getDefaultSortFn(a, b, isAsc) {
	                return isAsc ? a.localeCompare(b) : b.localeCompare(a);
	            }
	        }, {
	            key: 'getSortedRowsForColumn',
	            value: function getSortedRowsForColumn(isAsc, columnName, rows) {
	                var columns = !!this.props.children ? _react2.default.Children.map(this.props.children, function (child) {
	                    return child.props;
	                }) : this.props.columns;
	
	                var sortFn = this.getDefaultSortFn;
	                for (var i = 0; i < columns.length; i++) {
	                    if (columns[i].name === columnName && columns[i].sortFn) {
	                        sortFn = columns[i].sortFn;
	                        break;
	                    }
	                }
	
	                return rows.sort(function (a, b) {
	                    return sortFn(String(a[columnName]), String(b[columnName]), isAsc);
	                });
	            }
	        }, {
	            key: 'handleClickColumn',
	            value: function handleClickColumn(e, columnName) {
	                var isAsc = this.state.sortHeader === columnName ? !this.state.isAsc : true;
	                var rows = this.getSortedRowsForColumn(isAsc, columnName, this.state.rows);
	                this.setState({
	                    sortHeader: columnName,
	                    isAsc: isAsc,
	                    rows: rows
	                });
	            }
	        }, {
	            key: 'renderTableHeaders',
	            value: function renderTableHeaders() {
	                var _this2 = this;
	
	                var _props = this.props;
	                var children = _props.children;
	                var columns = _props.columns;
	                var sortable = _props.sortable;
	
	
	                if (sortable) {
	                    return children ? _react2.default.Children.map(children, function (child) {
	                        return _react2.default.cloneElement(child, {
	                            className: _this2.getColumnClass(child.props),
	                            onClick: _this2.handleClickColumn
	                        });
	                    }) : columns.map(function (column) {
	                        return _react2.default.createElement(
	                            _TableHeader2.default,
	                            {
	                                key: column.name,
	                                className: _this2.getColumnClass(column),
	                                name: column.name,
	                                numeric: column.numeric,
	                                tooltip: column.tooltip,
	                                onClick: _this2.handleClickColumn
	                            },
	                            column.label
	                        );
	                    });
	                }
	                return children;
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                var _props2 = this.props;
	                var rows = _props2.rows;
	                var data = _props2.data;
	
	                var otherProps = _objectWithoutProperties(_props2, ['rows', 'data']);
	
	                var realRows = this.state && this.state.rows || rows || data;
	
	                return _react2.default.createElement(
	                    Component,
	                    _extends({ rows: realRows }, otherProps),
	                    this.renderTableHeaders()
	                );
	            }
	        }]);
	
	        return Sortable;
	    }(_react2.default.Component);
	
	    Sortable.propTypes = propTypes;
	    return Sortable;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DialogActions = exports.DialogContent = exports.DialogTitle = exports.Dialog = undefined;
	
	var _Dialog = __webpack_require__(23);
	
	Object.defineProperty(exports, 'Dialog', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Dialog).default;
	  }
	});
	
	var _DialogTitle = __webpack_require__(24);
	
	Object.defineProperty(exports, 'DialogTitle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DialogTitle).default;
	  }
	});
	
	var _DialogActions = __webpack_require__(25);
	
	Object.defineProperty(exports, 'DialogActions', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DialogActions).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(14);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DialogContent = exports.DialogContent = (0, _basicClassCreator2.default)('DialogContent', 'mdl-dialog__content');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    onCancel: _react.PropTypes.func,
	    open: _react.PropTypes.bool
	};
	
	var defaultProps = {
	    onCancel: function onCancel(e) {
	        return e.preventDefault();
	    }
	};
	
	var Dialog = function (_React$Component) {
	    _inherits(Dialog, _React$Component);
	
	    function Dialog() {
	        _classCallCheck(this, Dialog);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).apply(this, arguments));
	    }
	
	    _createClass(Dialog, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.refs.dialog.addEventListener('cancel', this.props.onCancel);
	            if (this.props.open) {
	                (0, _reactDom.findDOMNode)(this).showModal();
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.open !== prevProps.open) {
	                if (this.props.open) {
	                    (0, _reactDom.findDOMNode)(this).showModal();
	
	                    // display the dialog at the right location
	                    // needed for the polyfill, otherwise it's not at the right position
	                    var bodyHeight = document.body.clientHeight;
	                    var dialogHeight = this.refs.dialog.clientHeight;
	                    this.refs.dialog.style.position = 'fixed';
	                    this.refs.dialog.style.top = (bodyHeight - dialogHeight) / 2 + 'px';
	                } else {
	                    (0, _reactDom.findDOMNode)(this).close();
	                }
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.refs.dialog.removeEventListener('cancel', this.props.onCancel);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // We cannot set the `open` prop on the Dialog if we manage its state manually with `showModal`,
	            // this the disabled eslint rule
	            // eslint-disable-next-line no-unused-vars
	            var _props = this.props;
	            var className = _props.className;
	            var open = _props.open;
	            var onCancel = _props.onCancel;
	            var children = _props.children;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'open', 'onCancel', 'children']);
	
	            var classes = (0, _classnames2.default)('mdl-dialog', className);
	
	            return _react2.default.createElement(
	                'dialog',
	                _extends({ ref: 'dialog', className: classes }, otherProps),
	                children
	            );
	        }
	    }]);
	
	    return Dialog;
	}(_react2.default.Component);
	
	Dialog.propTypes = propTypes;
	Dialog.defaultProps = defaultProps;
	
	exports.default = Dialog;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DialogTitle = function DialogTitle(props) {
	    var className = props.className;
	    var component = props.component;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'component', 'children']);
	
	    return _react2.default.createElement(component || 'h4', _extends({
	        className: (0, _classnames2.default)('mdl-dialog__title', className)
	    }, otherProps), children);
	};
	
	DialogTitle.propTypes = {
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func])
	};
	
	exports.default = DialogTitle;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DialogActions = function DialogActions(props) {
	    var className = props.className;
	    var fullWidth = props.fullWidth;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'fullWidth', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-dialog__actions', {
	        'mdl-dialog__actions--full-width': fullWidth
	    }, className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	DialogActions.propTypes = {
	    className: _react.PropTypes.string,
	    fullWidth: _react.PropTypes.bool
	};
	
	exports.default = DialogActions;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(7);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var FABButton = function FABButton(props) {
	    var mini = props.mini;
	    var className = props.className;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['mini', 'className', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-button--fab', {
	        'mdl-button--mini-fab': mini
	    }, className);
	
	    return _react2.default.createElement(
	        _Button2.default,
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	FABButton.propTypes = {
	    className: _react.PropTypes.string,
	    mini: _react.PropTypes.bool
	};
	
	exports.default = FABButton;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Footer = __webpack_require__(28);
	
	Object.defineProperty(exports, 'Footer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Footer).default;
	  }
	});
	
	var _Section = __webpack_require__(30);
	
	Object.defineProperty(exports, 'FooterSection', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Section).default;
	  }
	});
	
	var _DropDownSection = __webpack_require__(31);
	
	Object.defineProperty(exports, 'FooterDropDownSection', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DropDownSection).default;
	  }
	});
	
	var _LinkList = __webpack_require__(32);
	
	Object.defineProperty(exports, 'FooterLinkList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LinkList).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(29);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Footer = function Footer(props) {
	    var className = props.className;
	    var size = props.size;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'size', 'children']);
	
	    var classes = (0, _classnames2.default)(_defineProperty({}, 'mdl-' + size + '-footer', true), className);
	
	    return _react2.default.createElement(
	        'footer',
	        _extends({ className: classes }, otherProps),
	        (0, _cloneChildren2.default)(children, { size: size })
	    );
	};
	
	Footer.propTypes = {
	    className: _react.PropTypes.string,
	    size: _react.PropTypes.oneOf(['mini', 'mega'])
	};
	Footer.defaultProps = {
	    size: 'mega'
	};
	
	exports.default = Footer;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (children, props) {
	    return _react2.default.Children.map(children, function (child) {
	        if (!child) return child;
	        var newProps = typeof props === 'function' ? props(child) : props;
	        return _react2.default.cloneElement(child, newProps);
	    });
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(29);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Section = function Section(props) {
	    var className = props.className;
	    var logo = props.logo;
	    var size = props.size;
	    var type = props.type;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'logo', 'size', 'type', 'children']);
	
	    var classes = (0, _classnames2.default)(_defineProperty({}, 'mdl-' + size + '-footer__' + type + '-section', true), className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        logo ? _react2.default.createElement(
	            'div',
	            { className: 'mdl-logo' },
	            logo
	        ) : null,
	        (0, _cloneChildren2.default)(children, { size: size })
	    );
	};
	
	Section.propTypes = {
	    className: _react.PropTypes.string,
	    logo: _react.PropTypes.node,
	    size: _react.PropTypes.oneOf(['mini', 'mega']),
	    type: _react.PropTypes.oneOf(['top', 'middle', 'bottom', 'left', 'right'])
	};
	Section.defaultProps = {
	    size: 'mega',
	    type: 'left'
	};
	
	exports.default = Section;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(29);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DropDownSection = function DropDownSection(props) {
	    var className = props.className;
	    var size = props.size;
	    var title = props.title;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'size', 'title', 'children']);
	
	    var classes = (0, _classnames2.default)(_defineProperty({}, 'mdl-' + size + '-footer__drop-down-section', true), className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        _react2.default.createElement('input', { className: 'mdl-' + size + '-footer__heading-checkbox', type: 'checkbox', defaultChecked: true }),
	        _react2.default.createElement(
	            'h1',
	            { className: 'mdl-' + size + '-footer__heading' },
	            title
	        ),
	        (0, _cloneChildren2.default)(children, { size: size })
	    );
	};
	
	DropDownSection.propTypes = {
	    className: _react.PropTypes.string,
	    size: _react.PropTypes.oneOf(['mini', 'mega']),
	    title: _react.PropTypes.node.isRequired
	};
	DropDownSection.defaultProps = {
	    size: 'mega'
	};
	
	exports.default = DropDownSection;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var LinkList = function LinkList(props) {
	    var className = props.className;
	    var size = props.size;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'size', 'children']);
	
	    var classes = (0, _classnames2.default)(_defineProperty({}, 'mdl-' + size + '-footer__link-list', true), className);
	
	    return _react2.default.createElement(
	        'ul',
	        _extends({ className: classes }, otherProps),
	        _react2.default.Children.map(children, function (child) {
	            return _react2.default.createElement(
	                'li',
	                null,
	                child
	            );
	        })
	    );
	};
	
	LinkList.propTypes = {
	    className: _react.PropTypes.string,
	    size: _react.PropTypes.oneOf(['mini', 'mega'])
	};
	LinkList.defaultProps = {
	    size: 'mega'
	};
	
	exports.default = LinkList;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cell = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(10);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(11);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Grid = function Grid(props) {
	    var noSpacing = props.noSpacing;
	    var className = props.className;
	    var children = props.children;
	    var component = props.component;
	    var shadow = props.shadow;
	
	    var otherProps = _objectWithoutProperties(props, ['noSpacing', 'className', 'children', 'component', 'shadow']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-grid', _defineProperty({
	        'mdl-grid--no-spacing': noSpacing
	    }, _shadows2.default[shadowLevel], hasShadow), className);
	
	    return _react2.default.createElement(component || 'div', _extends({
	        className: classes
	    }, otherProps), children);
	};
	
	Grid.propTypes = {
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    noSpacing: _react.PropTypes.bool,
	    shadow: _react.PropTypes.number
	};
	
	/* eslint-disable react/no-multi-comp */
	var Cell = function Cell(props) {
	    var _classNames2;
	
	    var align = props.align;
	    var className = props.className;
	    var children = props.children;
	    var col = props.col;
	    var phone = props.phone;
	    var tablet = props.tablet;
	    var component = props.component;
	    var hideDesktop = props.hideDesktop;
	    var hidePhone = props.hidePhone;
	    var hideTablet = props.hideTablet;
	    var shadow = props.shadow;
	
	    var otherProps = _objectWithoutProperties(props, ['align', 'className', 'children', 'col', 'phone', 'tablet', 'component', 'hideDesktop', 'hidePhone', 'hideTablet', 'shadow']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-cell', (_classNames2 = {}, _defineProperty(_classNames2, 'mdl-cell--' + col + '-col', true), _defineProperty(_classNames2, 'mdl-cell--' + phone + '-col-phone', typeof phone !== 'undefined'), _defineProperty(_classNames2, 'mdl-cell--' + tablet + '-col-tablet', typeof tablet !== 'undefined'), _defineProperty(_classNames2, 'mdl-cell--' + align, typeof align !== 'undefined'), _defineProperty(_classNames2, 'mdl-cell--hide-desktop', hideDesktop), _defineProperty(_classNames2, 'mdl-cell--hide-phone', hidePhone), _defineProperty(_classNames2, 'mdl-cell--hide-tablet', hideTablet), _defineProperty(_classNames2, _shadows2.default[shadowLevel], hasShadow), _classNames2), className);
	
	    return _react2.default.createElement(component || 'div', _extends({
	        className: classes
	    }, otherProps), children);
	};
	
	Cell.propTypes = {
	    align: _react.PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
	    className: _react.PropTypes.string,
	    col: _react.PropTypes.number.isRequired,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    phone: _react.PropTypes.number,
	    tablet: _react.PropTypes.number,
	    hideDesktop: _react.PropTypes.bool,
	    hidePhone: _react.PropTypes.bool,
	    hideTablet: _react.PropTypes.bool,
	    shadow: _react.PropTypes.number
	};
	
	exports.default = Grid;
	exports.Cell = Cell;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Icon = function Icon(props) {
	    var className = props.className;
	    var name = props.name;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'name']);
	
	    var classes = (0, _classnames2.default)('material-icons', className);
	
	    return _react2.default.createElement(
	        'i',
	        _extends({ className: classes }, otherProps),
	        name
	    );
	};
	
	Icon.propTypes = {
	    className: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired
	};
	
	exports.default = Icon;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(7);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Icon = __webpack_require__(34);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var IconButton = function IconButton(props) {
	    var className = props.className;
	    var name = props.name;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'name']);
	
	    var classes = (0, _classnames2.default)('mdl-button--icon', className);
	
	    return _react2.default.createElement(
	        _Button2.default,
	        _extends({ className: classes }, otherProps),
	        _react2.default.createElement(_Icon2.default, { name: name })
	    );
	};
	
	IconButton.propTypes = {
	    className: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired
	};
	
	exports.default = IconButton;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(34);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    name: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	
	var IconToggle = function (_React$Component) {
	    _inherits(IconToggle, _React$Component);
	
	    function IconToggle() {
	        _classCallCheck(this, IconToggle);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(IconToggle).apply(this, arguments));
	    }
	
	    _createClass(IconToggle, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.disabled !== prevProps.disabled) {
	                var fnName = this.props.disabled ? 'disable' : 'enable';
	                (0, _reactDom.findDOMNode)(this).MaterialIconToggle[fnName]();
	            }
	            if (this.props.checked !== prevProps.checked) {
	                var _fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialIconToggle[_fnName]();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var name = _props.name;
	            var ripple = _props.ripple;
	
	            var inputProps = _objectWithoutProperties(_props, ['className', 'name', 'ripple']);
	
	            var classes = (0, _classnames2.default)('mdl-icon-toggle mdl-js-icon-toggle', {
	                'mdl-js-ripple-effect': ripple
	            }, className);
	
	            return _react2.default.createElement(
	                'label',
	                { className: classes },
	                _react2.default.createElement('input', _extends({
	                    type: 'checkbox',
	                    className: 'mdl-icon-toggle__input'
	                }, inputProps)),
	                _react2.default.createElement(_Icon2.default, { className: 'mdl-icon-toggle__label', name: name })
	            );
	        }
	    }]);
	
	    return IconToggle;
	}(_react2.default.Component);
	
	IconToggle.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(IconToggle);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Layout = __webpack_require__(38);
	
	Object.defineProperty(exports, 'Layout', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Layout).default;
	  }
	});
	
	var _Content = __webpack_require__(39);
	
	Object.defineProperty(exports, 'Content', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Content).default;
	  }
	});
	
	var _Drawer = __webpack_require__(40);
	
	Object.defineProperty(exports, 'Drawer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Drawer).default;
	  }
	});
	
	var _Header = __webpack_require__(41);
	
	Object.defineProperty(exports, 'Header', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Header).default;
	  }
	});
	
	var _HeaderRow = __webpack_require__(42);
	
	Object.defineProperty(exports, 'HeaderRow', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_HeaderRow).default;
	  }
	});
	
	var _HeaderTabs = __webpack_require__(44);
	
	Object.defineProperty(exports, 'HeaderTabs', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_HeaderTabs).default;
	  }
	});
	
	var _Navigation = __webpack_require__(46);
	
	Object.defineProperty(exports, 'Navigation', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Navigation).default;
	  }
	});
	
	var _Spacer = __webpack_require__(43);
	
	Object.defineProperty(exports, 'Spacer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Spacer).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    fixedDrawer: _react.PropTypes.bool,
	    fixedHeader: _react.PropTypes.bool,
	    fixedTabs: _react.PropTypes.bool
	};
	
	// eslint-disable-next-line react/prefer-stateless-function
	
	var Layout = function (_React$Component) {
	    _inherits(Layout, _React$Component);
	
	    function Layout() {
	        _classCallCheck(this, Layout);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
	    }
	
	    _createClass(Layout, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var fixedDrawer = _props.fixedDrawer;
	            var fixedHeader = _props.fixedHeader;
	            var fixedTabs = _props.fixedTabs;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'fixedDrawer', 'fixedHeader', 'fixedTabs']);
	
	            var classes = (0, _classnames2.default)('mdl-layout mdl-js-layout', {
	                'mdl-layout--fixed-drawer': fixedDrawer,
	                'mdl-layout--fixed-header': fixedHeader,
	                'mdl-layout--fixed-tabs': fixedTabs
	            }, className);
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mdl-layout__inner-container' },
	                    this.props.children
	                )
	            );
	        }
	    }]);
	
	    return Layout;
	}(_react2.default.Component);
	
	Layout.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Layout);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Content = function Content(props) {
	    var children = props.children;
	    var className = props.className;
	    var component = props.component;
	
	    var otherProps = _objectWithoutProperties(props, ['children', 'className', 'component']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__content', className);
	
	    return _react2.default.createElement(component || 'div', _extends({
	        className: classes
	    }, otherProps), children);
	};
	
	Content.propTypes = {
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func])
	};
	
	exports.default = Content;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Drawer = function Drawer(props) {
	    var className = props.className;
	    var title = props.title;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'title', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__drawer', className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title ? _react2.default.createElement(
	            'span',
	            { className: 'mdl-layout-title' },
	            title
	        ) : null,
	        children
	    );
	};
	Drawer.propTypes = {
	    className: _react.PropTypes.string,
	    title: _react.PropTypes.node
	};
	
	exports.default = Drawer;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _HeaderRow = __webpack_require__(42);
	
	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);
	
	var _HeaderTabs = __webpack_require__(44);
	
	var _HeaderTabs2 = _interopRequireDefault(_HeaderTabs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Header = function Header(props) {
	    var className = props.className;
	    var scroll = props.scroll;
	    var seamed = props.seamed;
	    var title = props.title;
	    var transparent = props.transparent;
	    var waterfall = props.waterfall;
	    var hideTop = props.hideTop;
	    var hideSpacer = props.hideSpacer;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'scroll', 'seamed', 'title', 'transparent', 'waterfall', 'hideTop', 'hideSpacer', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__header', {
	        'mdl-layout__header--scroll': scroll,
	        'mdl-layout__header--seamed': seamed,
	        'mdl-layout__header--transparent': transparent,
	        'mdl-layout__header--waterfall': waterfall,
	        'mdl-layout__header--waterfall-hide-top': waterfall && hideTop
	    }, className);
	
	    var isRowOrTab = false;
	    _react2.default.Children.forEach(children, function (child) {
	        if (child && (child.type === _HeaderRow2.default || child.type === _HeaderTabs2.default)) {
	            isRowOrTab = true;
	        }
	    });
	
	    return _react2.default.createElement(
	        'header',
	        _extends({ className: classes }, otherProps),
	        isRowOrTab ? children : _react2.default.createElement(
	            _HeaderRow2.default,
	            { title: title, hideSpacer: hideSpacer },
	            children
	        )
	    );
	};
	Header.propTypes = {
	    className: _react.PropTypes.string,
	    scroll: _react.PropTypes.bool,
	    seamed: _react.PropTypes.bool,
	    title: _react.PropTypes.node,
	    transparent: _react.PropTypes.bool,
	    waterfall: _react.PropTypes.bool,
	    hideTop: _react.PropTypes.bool,
	    hideSpacer: _react.PropTypes.bool
	};
	
	exports.default = Header;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Spacer = __webpack_require__(43);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var HeaderRow = function HeaderRow(props) {
	    var className = props.className;
	    var title = props.title;
	    var children = props.children;
	    var hideSpacer = props.hideSpacer;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'title', 'children', 'hideSpacer']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__header-row', className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title && _react2.default.createElement(
	            'span',
	            { className: 'mdl-layout-title' },
	            title
	        ),
	        title && !hideSpacer && _react2.default.createElement(_Spacer2.default, null),
	        children
	    );
	};
	HeaderRow.propTypes = {
	    className: _react.PropTypes.string,
	    title: _react.PropTypes.node,
	    hideSpacer: _react.PropTypes.bool
	};
	
	exports.default = HeaderRow;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _basicClassCreator = __webpack_require__(14);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _basicClassCreator2.default)('Spacer', 'mdl-layout-spacer');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TabBar = __webpack_require__(45);
	
	var _TabBar2 = _interopRequireDefault(_TabBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var HeaderTabs = function HeaderTabs(props) {
	    var className = props.className;
	    var ripple = props.ripple;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'ripple', 'children']);
	
	    var classes = (0, _classnames2.default)({
	        'mdl-js-ripple-effect': ripple
	    }, className);
	
	    return _react2.default.createElement(
	        _TabBar2.default,
	        _extends({ cssPrefix: 'mdl-layout', className: classes }, otherProps),
	        children
	    );
	};
	HeaderTabs.propTypes = {
	    activeTab: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	
	exports.default = HeaderTabs;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    activeTab: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    cssPrefix: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func
	};
	
	var defaultProps = {
	    activeTab: 0
	};
	
	var TabBar = function (_React$Component) {
	    _inherits(TabBar, _React$Component);
	
	    function TabBar(props) {
	        _classCallCheck(this, TabBar);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabBar).call(this, props));
	
	        _this._handleClickTab = _this._handleClickTab.bind(_this);
	        return _this;
	    }
	
	    _createClass(TabBar, [{
	        key: '_handleClickTab',
	        value: function _handleClickTab(tabId) {
	            if (this.props.onChange) {
	                this.props.onChange(tabId);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props;
	            var activeTab = _props.activeTab;
	            var className = _props.className;
	            var cssPrefix = _props.cssPrefix;
	            var children = _props.children;
	
	            var otherProps = _objectWithoutProperties(_props, ['activeTab', 'className', 'cssPrefix', 'children']);
	
	            var classes = (0, _classnames2.default)(_defineProperty({}, cssPrefix + '__tab-bar', true), className);
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                _react2.default.Children.map(children, function (child, tabId) {
	                    return _react2.default.cloneElement(child, {
	                        cssPrefix: cssPrefix,
	                        tabId: tabId,
	                        active: tabId === activeTab,
	                        onTabClick: _this2._handleClickTab
	                    });
	                })
	            );
	        }
	    }]);
	
	    return TabBar;
	}(_react2.default.Component);
	
	TabBar.propTypes = propTypes;
	TabBar.defaultProps = defaultProps;
	
	exports.default = TabBar;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(29);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	var _Spacer = __webpack_require__(43);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Navigation = function Navigation(props) {
	    var className = props.className;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-navigation', className);
	
	    return _react2.default.createElement(
	        'nav',
	        _extends({ className: classes }, otherProps),
	        (0, _cloneChildren2.default)(children, function (child) {
	            return {
	                className: (0, _classnames2.default)({ 'mdl-navigation__link': child.type !== _Spacer2.default }, child.props.className)
	            };
	        })
	    );
	};
	Navigation.propTypes = {
	    className: _react.PropTypes.string
	};
	
	exports.default = Navigation;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ListItemContent = exports.ListItemAction = exports.ListItem = exports.List = undefined;
	
	var _ListItem = __webpack_require__(48);
	
	Object.defineProperty(exports, 'ListItem', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItem).default;
	  }
	});
	
	var _ListItemAction = __webpack_require__(50);
	
	Object.defineProperty(exports, 'ListItemAction', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItemAction).default;
	  }
	});
	
	var _ListItemContent = __webpack_require__(49);
	
	Object.defineProperty(exports, 'ListItemContent', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItemContent).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(14);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var List = exports.List = (0, _basicClassCreator2.default)('List', 'mdl-list', 'ul');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ListItemContent = __webpack_require__(49);
	
	var _ListItemContent2 = _interopRequireDefault(_ListItemContent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    twoLine: _react.PropTypes.bool,
	    threeLine: _react.PropTypes.bool
	};
	
	var ListItem = function ListItem(props) {
	    var className = props.className;
	    var twoLine = props.twoLine;
	    var threeLine = props.threeLine;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'twoLine', 'threeLine']);
	
	    var classes = (0, _classnames2.default)('mdl-list__item', {
	        'mdl-list__item--two-line': twoLine && !threeLine,
	        'mdl-list__item--three-line': !twoLine && threeLine
	    }, className);
	
	    var children = _react.Children.map(otherProps.children, function (child) {
	        if (typeof child === 'string') {
	            return _react2.default.createElement(
	                _ListItemContent2.default,
	                null,
	                child
	            );
	        }
	        if (child.type === _ListItemContent2.default) {
	            return (0, _react.cloneElement)(child, _extends({}, child.props, {
	                useBodyClass: !!threeLine
	            }));
	        }
	        return child;
	    });
	
	    return _react2.default.createElement(
	        'li',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	ListItem.propTypes = propTypes;
	
	exports.default = ListItem;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(34);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    avatar: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	    className: _react.PropTypes.string,
	    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	    subtitle: _react.PropTypes.node,
	    useBodyClass: _react.PropTypes.bool
	};
	
	function createIcon(type, icon) {
	    if (typeof icon === 'string') {
	        return _react2.default.createElement(_Icon2.default, { className: 'mdl-list__item-' + type, name: icon });
	    }
	    return _react2.default.cloneElement(icon, { className: 'mdl-list__item-' + type });
	}
	
	var ListItemContent = function ListItemContent(props) {
	    var avatar = props.avatar;
	    var children = props.children;
	    var className = props.className;
	    var icon = props.icon;
	    var subtitle = props.subtitle;
	    var useBodyClass = props.useBodyClass;
	
	    var otherProps = _objectWithoutProperties(props, ['avatar', 'children', 'className', 'icon', 'subtitle', 'useBodyClass']);
	
	    var classes = (0, _classnames2.default)('mdl-list__item-primary-content', className);
	    var subtitleClassName = useBodyClass ? 'mdl-list__item-text-body' : 'mdl-list__item-sub-title';
	
	    var iconElement = null;
	    if (icon) {
	        iconElement = createIcon('icon', icon);
	    } else if (avatar) {
	        iconElement = createIcon('avatar', avatar);
	    }
	
	    return _react2.default.createElement(
	        'span',
	        _extends({ className: classes }, otherProps),
	        iconElement,
	        _react2.default.createElement(
	            'span',
	            null,
	            children
	        ),
	        subtitle && _react2.default.createElement(
	            'span',
	            { className: subtitleClassName },
	            subtitle
	        )
	    );
	};
	
	ListItemContent.propTypes = propTypes;
	
	exports.default = ListItemContent;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    children: _react.PropTypes.element,
	    className: _react.PropTypes.string,
	    info: _react.PropTypes.string
	};
	
	var ListItemAction = function ListItemAction(props) {
	    var children = props.children;
	    var className = props.className;
	    var info = props.info;
	
	    var otherProps = _objectWithoutProperties(props, ['children', 'className', 'info']);
	
	    var classes = (0, _classnames2.default)('mdl-list__item-secondary-content', className);
	
	    return _react2.default.createElement(
	        'span',
	        _extends({ className: classes }, otherProps),
	        info && _react2.default.createElement(
	            'span',
	            { className: 'mdl-list__item-secondary-info' },
	            info
	        ),
	        _react2.default.createElement(
	            'span',
	            { className: 'mdl-list__item-secondary-action' },
	            children
	        )
	    );
	};
	
	ListItemAction.propTypes = propTypes;
	
	exports.default = ListItemAction;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuItem = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	var _basicClassCreator = __webpack_require__(14);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    align: _react.PropTypes.oneOf(['left', 'right']),
	    className: _react.PropTypes.string,
	    ripple: _react.PropTypes.bool,
	    target: _react.PropTypes.string.isRequired,
	    valign: _react.PropTypes.oneOf(['bottom', 'top'])
	};
	
	var defaultProps = {
	    align: 'left',
	    valign: 'bottom'
	};
	
	// eslint-disable-next-line react/prefer-stateless-function
	
	var Menu = function (_React$Component) {
	    _inherits(Menu, _React$Component);
	
	    function Menu() {
	        _classCallCheck(this, Menu);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
	    }
	
	    _createClass(Menu, [{
	        key: 'render',
	        value: function render() {
	            var _classNames;
	
	            var _props = this.props;
	            var align = _props.align;
	            var children = _props.children;
	            var className = _props.className;
	            var ripple = _props.ripple;
	            var target = _props.target;
	            var valign = _props.valign;
	
	            var otherProps = _objectWithoutProperties(_props, ['align', 'children', 'className', 'ripple', 'target', 'valign']);
	
	            var classes = (0, _classnames2.default)('mdl-menu mdl-js-menu', (_classNames = {}, _defineProperty(_classNames, 'mdl-menu--' + valign + '-' + align, true), _defineProperty(_classNames, 'mdl-js-ripple-effect', ripple), _classNames), className);
	
	            return _react2.default.createElement(
	                'ul',
	                _extends({ className: classes, 'data-mdl-for': target }, otherProps),
	                children
	            );
	        }
	    }]);
	
	    return Menu;
	}(_react2.default.Component);
	
	Menu.propTypes = propTypes;
	Menu.defaultProps = defaultProps;
	
	exports.default = (0, _mdlUpgrade2.default)(Menu);
	var MenuItem = exports.MenuItem = (0, _basicClassCreator2.default)('MenuItem', 'mdl-menu__item', 'li');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    buffer: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    indeterminate: _react.PropTypes.bool,
	    progress: _react.PropTypes.number
	};
	
	var ProgressBar = function (_React$Component) {
	    _inherits(ProgressBar, _React$Component);
	
	    function ProgressBar() {
	        _classCallCheck(this, ProgressBar);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ProgressBar).apply(this, arguments));
	    }
	
	    _createClass(ProgressBar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._setProgress(this.props.progress);
	            this._setBuffer(this.props.buffer);
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this._setProgress(this.props.progress);
	            this._setBuffer(this.props.buffer);
	        }
	    }, {
	        key: '_setProgress',
	        value: function _setProgress(progress) {
	            if (!this.props.indeterminate && progress !== undefined) {
	                (0, _reactDom.findDOMNode)(this).MaterialProgress.setProgress(progress);
	            }
	        }
	    }, {
	        key: '_setBuffer',
	        value: function _setBuffer(buffer) {
	            if (buffer !== undefined) {
	                (0, _reactDom.findDOMNode)(this).MaterialProgress.setBuffer(buffer);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var indeterminate = _props.indeterminate;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'indeterminate']);
	
	            var classes = (0, _classnames2.default)('mdl-progress mdl-js-progress', {
	                'mdl-progress__indeterminate': indeterminate
	            }, className);
	
	            return _react2.default.createElement('div', _extends({ className: classes }, otherProps));
	        }
	    }]);
	
	    return ProgressBar;
	}(_react2.default.Component);
	
	ProgressBar.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(ProgressBar);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    name: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool,
	    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
	};
	
	var Radio = function (_React$Component) {
	    _inherits(Radio, _React$Component);
	
	    function Radio() {
	        _classCallCheck(this, Radio);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Radio).apply(this, arguments));
	    }
	
	    _createClass(Radio, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.disabled !== prevProps.disabled) {
	                var fnName = this.props.disabled ? 'disable' : 'enable';
	                (0, _reactDom.findDOMNode)(this).MaterialRadio[fnName]();
	            }
	            if (this.props.checked !== prevProps.checked) {
	                var _fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialRadio[_fnName]();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var children = _props.children;
	            var className = _props.className;
	            var name = _props.name;
	            var ripple = _props.ripple;
	            var value = _props.value;
	
	            var inputProps = _objectWithoutProperties(_props, ['children', 'className', 'name', 'ripple', 'value']);
	
	            var classes = (0, _classnames2.default)('mdl-radio mdl-js-radio', {
	                'mdl-js-ripple-effect': ripple
	            }, className);
	
	            return _react2.default.createElement(
	                'label',
	                { className: classes },
	                _react2.default.createElement('input', _extends({
	                    type: 'radio',
	                    className: 'mdl-radio__button',
	                    value: value,
	                    name: name
	                }, inputProps)),
	                _react2.default.createElement(
	                    'span',
	                    { className: 'mdl-radio__label' },
	                    children
	                )
	            );
	        }
	    }]);
	
	    return Radio;
	}(_react2.default.Component);
	
	Radio.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Radio);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Radio = __webpack_require__(53);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var RadioGroup = function RadioGroup(props) {
	    var name = props.name;
	    var value = props.value;
	    var children = props.children;
	    var container = props.container;
	    var childContainer = props.childContainer;
	    var onChange = props.onChange;
	
	    var otherProps = _objectWithoutProperties(props, ['name', 'value', 'children', 'container', 'childContainer', 'onChange']);
	
	    var hasOnChange = typeof onChange === 'function';
	    var checked = hasOnChange ? 'checked' : 'defaultChecked';
	
	    return _react2.default.createElement(container, otherProps, _react2.default.Children.map(children, function (child) {
	        var _extends2;
	
	        var clonedChild = _react2.default.cloneElement(child, _extends((_extends2 = {}, _defineProperty(_extends2, checked, child.props.value === value), _defineProperty(_extends2, 'name', name), _defineProperty(_extends2, 'onChange', onChange), _extends2), otherProps));
	
	        return childContainer ? _react2.default.createElement(childContainer, {}, clonedChild) : clonedChild;
	    }));
	};
	
	RadioGroup.propTypes = {
	    childContainer: _react.PropTypes.string,
	    children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
	        var prop = props[propName];
	        return prop.type !== _Radio2.default && new Error('\'' + componentName + '\' only accepts \'Radio\' as children.');
	    }),
	    container: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func,
	    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
	};
	
	RadioGroup.defaultProps = {
	    container: 'div'
	};
	
	exports.default = RadioGroup;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    max: _react.PropTypes.number.isRequired,
	    min: _react.PropTypes.number.isRequired,
	    onChange: _react.PropTypes.func,
	    value: _react.PropTypes.number
	};
	
	var Slider = function (_React$Component) {
	    _inherits(Slider, _React$Component);
	
	    function Slider() {
	        _classCallCheck(this, Slider);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).apply(this, arguments));
	    }
	
	    _createClass(Slider, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            if (typeof this.props.value !== 'undefined') {
	                (0, _reactDom.findDOMNode)(this).MaterialSlider.change(this.props.value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	
	            var otherProps = _objectWithoutProperties(_props, ['className']);
	
	            var classes = (0, _classnames2.default)('mdl-slider mdl-js-slider', className);
	
	            return _react2.default.createElement('input', _extends({
	                className: classes,
	                type: 'range'
	            }, otherProps));
	        }
	    }]);
	
	    return Slider;
	}(_react2.default.Component);
	
	Slider.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Slider);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// This component doesn't use the javascript from MDL.
	// This is the expected behavior and the reason is because it's not written in
	// a way to make it easy to use with React.
	var ANIMATION_LENGTH = 250;
	
	var propTypes = {
	    action: _react.PropTypes.string,
	    active: _react.PropTypes.bool.isRequired,
	    className: _react.PropTypes.string,
	    onActionClick: _react.PropTypes.func,
	    onTimeout: _react.PropTypes.func.isRequired,
	    timeout: _react.PropTypes.number
	};
	
	var defaultProps = {
	    timeout: 2750
	};
	
	var Snackbar = function (_React$Component) {
	    _inherits(Snackbar, _React$Component);
	
	    function Snackbar(props) {
	        _classCallCheck(this, Snackbar);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Snackbar).call(this, props));
	
	        _this.clearTimer = _this.clearTimer.bind(_this);
	        _this.timeoutId = null;
	        _this.clearTimeoutId = null;
	        _this.state = {
	            open: false
	        };
	        return _this;
	    }
	
	    _createClass(Snackbar, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                open: nextProps.active
	            });
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            if (this.timeoutId) {
	                clearTimeout(this.timeoutId);
	            }
	
	            if (this.props.active) {
	                this.timeoutId = setTimeout(this.clearTimer, this.props.timeout);
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.timeoutId) {
	                clearTimeout(this.timeoutId);
	                this.timeoutId = null;
	            }
	            if (this.clearTimeoutId) {
	                clearTimeout(this.clearTimeoutId);
	                this.clearTimeoutId = null;
	            }
	        }
	    }, {
	        key: 'clearTimer',
	        value: function clearTimer() {
	            var _this2 = this;
	
	            this.timeoutId = null;
	            this.setState({ open: false });
	
	            this.clearTimeoutId = setTimeout(function () {
	                _this2.clearTimeoutId = null;
	                _this2.props.onTimeout();
	            }, ANIMATION_LENGTH);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var action = _props.action;
	            var active = _props.active;
	            var className = _props.className;
	            var children = _props.children;
	            var onActionClick = _props.onActionClick;
	
	            var otherProps = _objectWithoutProperties(_props, ['action', 'active', 'className', 'children', 'onActionClick']);
	
	            var open = this.state.open;
	
	
	            var classes = (0, _classnames2.default)('mdl-snackbar', {
	                'mdl-snackbar--active': open
	            }, className);
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ ref: 'snackbar', className: classes, 'aria-hidden': !open }, otherProps),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mdl-snackbar__text' },
	                    active && children
	                ),
	                active && action && _react2.default.createElement(
	                    'button',
	                    { className: 'mdl-snackbar__action', type: 'button', onClick: onActionClick },
	                    action
	                )
	            );
	        }
	    }]);
	
	    return Snackbar;
	}(_react2.default.Component);
	
	Snackbar.propTypes = propTypes;
	Snackbar.defaultProps = defaultProps;
	
	exports.default = Snackbar;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    singleColor: _react.PropTypes.bool
	};
	
	// eslint-disable-next-line react/prefer-stateless-function
	
	var Spinner = function (_React$Component) {
	    _inherits(Spinner, _React$Component);
	
	    function Spinner() {
	        _classCallCheck(this, Spinner);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Spinner).apply(this, arguments));
	    }
	
	    _createClass(Spinner, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var singleColor = _props.singleColor;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'singleColor']);
	
	            var classes = (0, _classnames2.default)('mdl-spinner mdl-js-spinner is-active', {
	                'mdl-spinner--single-color': singleColor
	            }, className);
	
	            return _react2.default.createElement('div', _extends({ className: classes }, otherProps));
	        }
	    }]);
	
	    return Spinner;
	}(_react2.default.Component);
	
	Spinner.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Spinner);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	
	var Switch = function (_React$Component) {
	    _inherits(Switch, _React$Component);
	
	    function Switch() {
	        _classCallCheck(this, Switch);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));
	    }
	
	    _createClass(Switch, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.disabled !== prevProps.disabled) {
	                var fnName = this.props.disabled ? 'disable' : 'enable';
	                (0, _reactDom.findDOMNode)(this).MaterialSwitch[fnName]();
	            }
	            if (this.props.checked !== prevProps.checked) {
	                var _fnName = this.props.checked ? 'on' : 'off';
	                (0, _reactDom.findDOMNode)(this).MaterialSwitch[_fnName]();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var ripple = _props.ripple;
	            var children = _props.children;
	
	            var inputProps = _objectWithoutProperties(_props, ['className', 'ripple', 'children']);
	
	            var classes = (0, _classnames2.default)('mdl-switch mdl-js-switch', {
	                'mdl-js-ripple-effect': ripple
	            }, className);
	
	            return _react2.default.createElement(
	                'label',
	                { className: classes },
	                _react2.default.createElement('input', _extends({
	                    type: 'checkbox',
	                    className: 'mdl-switch__input'
	                }, inputProps)),
	                _react2.default.createElement(
	                    'span',
	                    { className: 'mdl-switch__label' },
	                    children
	                )
	            );
	        }
	    }]);
	
	    return Switch;
	}(_react2.default.Component);
	
	Switch.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Switch);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Tabs = __webpack_require__(60);
	
	Object.defineProperty(exports, 'Tabs', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tabs).default;
	  }
	});
	
	var _TabBar = __webpack_require__(45);
	
	Object.defineProperty(exports, 'TabBar', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TabBar).default;
	  }
	});
	
	var _Tab = __webpack_require__(61);
	
	Object.defineProperty(exports, 'Tab', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tab).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tab = __webpack_require__(61);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabBar = __webpack_require__(45);
	
	var _TabBar2 = _interopRequireDefault(_TabBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var TabPropType = function TabPropType(props, propName, componentName) {
	    var prop = props[propName];
	    return prop.type !== _Tab2.default && new Error('\'' + componentName + '\' only accepts \'Tab\' as children.');
	};
	
	var propTypes = {
	    activeTab: _react.PropTypes.number,
	    children: _react.PropTypes.oneOfType([TabPropType, _react.PropTypes.arrayOf(TabPropType)]),
	    className: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    tabBarProps: _react.PropTypes.object
	};
	
	var Tabs = function Tabs(props) {
	    var activeTab = props.activeTab;
	    var className = props.className;
	    var onChange = props.onChange;
	    var children = props.children;
	    var tabBarProps = props.tabBarProps;
	
	    var otherProps = _objectWithoutProperties(props, ['activeTab', 'className', 'onChange', 'children', 'tabBarProps']);
	
	    var classes = (0, _classnames2.default)('mdl-tabs is-upgraded', className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        _react2.default.createElement(
	            _TabBar2.default,
	            _extends({ cssPrefix: 'mdl-tabs', activeTab: activeTab, onChange: onChange }, tabBarProps),
	            children
	        )
	    );
	};
	
	Tabs.propTypes = propTypes;
	
	exports.default = Tabs;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    active: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    cssPrefix: _react.PropTypes.string,
	    onTabClick: _react.PropTypes.func,
	    style: _react.PropTypes.object,
	    tabId: _react.PropTypes.number
	};
	
	var defaultProps = {
	    style: {}
	};
	
	var Tab = function Tab(props) {
	    var _classNames;
	
	    var active = props.active;
	    var className = props.className;
	    var component = props.component;
	    var children = props.children;
	    var cssPrefix = props.cssPrefix;
	    var onTabClick = props.onTabClick;
	    var style = props.style;
	    var tabId = props.tabId;
	
	    var otherProps = _objectWithoutProperties(props, ['active', 'className', 'component', 'children', 'cssPrefix', 'onTabClick', 'style', 'tabId']);
	
	    var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, cssPrefix + '__tab', true), _defineProperty(_classNames, 'is-active', active), _classNames), className);
	
	    style.cursor = 'pointer';
	
	    return _react2.default.createElement(component || 'a', _extends({
	        className: classes,
	        onClick: function onClick() {
	            return onTabClick(tabId);
	        },
	        style: style
	    }, otherProps), children);
	};
	
	Tab.propTypes = propTypes;
	Tab.defaultProps = defaultProps;
	
	exports.default = Tab;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(6);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    error: _react.PropTypes.node,
	    expandable: _react.PropTypes.bool,
	    expandableIcon: _react.PropTypes.string,
	    floatingLabel: _react.PropTypes.bool,
	    id: _react.PropTypes.string,
	    inputClassName: _react.PropTypes.string,
	    label: _react.PropTypes.string.isRequired,
	    maxRows: _react.PropTypes.number,
	    onChange: _react.PropTypes.func,
	    pattern: _react.PropTypes.string,
	    required: _react.PropTypes.bool,
	    rows: _react.PropTypes.number,
	    style: _react.PropTypes.object,
	    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
	};
	
	var Textfield = function (_React$Component) {
	    _inherits(Textfield, _React$Component);
	
	    function Textfield() {
	        _classCallCheck(this, Textfield);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Textfield).apply(this, arguments));
	    }
	
	    _createClass(Textfield, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.error && !this.props.pattern) {
	                this.setAsInvalid();
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps) {
	            if (this.props.required !== prevProps.required || this.props.pattern !== prevProps.pattern || this.props.error !== prevProps.error) {
	                (0, _reactDom.findDOMNode)(this).MaterialTextfield.checkValidity();
	            }
	            if (this.props.disabled !== prevProps.disabled) {
	                (0, _reactDom.findDOMNode)(this).MaterialTextfield.checkDisabled();
	            }
	            if (this.props.value !== prevProps.value && this.refs.input !== document.activeElement) {
	                (0, _reactDom.findDOMNode)(this).MaterialTextfield.change(this.props.value);
	            }
	            if (this.props.error && !this.props.pattern) {
	                // Every time the input gets updated by MDL (checkValidity() or change())
	                // its invalid class gets reset. We have to put it again if the input is specifically set as "invalid"
	                this.setAsInvalid();
	            }
	        }
	    }, {
	        key: 'setAsInvalid',
	        value: function setAsInvalid() {
	            var elt = (0, _reactDom.findDOMNode)(this);
	            if (elt.className.indexOf('is-invalid') < 0) {
	                elt.className = (0, _classnames2.default)(elt.className, 'is-invalid');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var inputClassName = _props.inputClassName;
	            var id = _props.id;
	            var error = _props.error;
	            var expandable = _props.expandable;
	            var expandableIcon = _props.expandableIcon;
	            var floatingLabel = _props.floatingLabel;
	            var label = _props.label;
	            var maxRows = _props.maxRows;
	            var rows = _props.rows;
	            var style = _props.style;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'inputClassName', 'id', 'error', 'expandable', 'expandableIcon', 'floatingLabel', 'label', 'maxRows', 'rows', 'style']);
	
	            var hasRows = !!rows;
	            var customId = id || 'textfield-' + label.replace(/[^a-z0-9]/gi, '');
	            var inputTag = hasRows || maxRows > 1 ? 'textarea' : 'input';
	
	            var inputProps = _extends({
	                className: (0, _classnames2.default)('mdl-textfield__input', inputClassName),
	                id: customId,
	                rows: rows,
	                ref: 'input'
	            }, otherProps);
	
	            var input = _react2.default.createElement(inputTag, inputProps);
	            var labelContainer = _react2.default.createElement(
	                'label',
	                { className: 'mdl-textfield__label', htmlFor: customId },
	                label
	            );
	            var errorContainer = !!error && _react2.default.createElement(
	                'span',
	                { className: 'mdl-textfield__error' },
	                error
	            );
	
	            var containerClasses = (0, _classnames2.default)('mdl-textfield mdl-js-textfield', {
	                'mdl-textfield--floating-label': floatingLabel,
	                'mdl-textfield--expandable': expandable
	            }, className);
	
	            return expandable ? _react2.default.createElement(
	                'div',
	                { className: containerClasses, style: style },
	                _react2.default.createElement(
	                    'label',
	                    { className: 'mdl-button mdl-js-button mdl-button--icon', htmlFor: customId },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'material-icons' },
	                        expandableIcon
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'mdl-textfield__expandable-holder' },
	                    input,
	                    labelContainer,
	                    errorContainer
	                )
	            ) : _react2.default.createElement(
	                'div',
	                { className: containerClasses, style: style },
	                input,
	                labelContainer,
	                errorContainer
	            );
	        }
	    }]);
	
	    return Textfield;
	}(_react2.default.Component);
	
	Textfield.propTypes = propTypes;
	
	exports.default = (0, _mdlUpgrade2.default)(Textfield);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ReactMDL.js.map