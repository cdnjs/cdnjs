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
	
	var _palette = __webpack_require__(5);
	
	Object.defineProperty(exports, 'getColorClass', {
	    enumerable: true,
	    get: function get() {
	        return _palette.getColorClass;
	    }
	});
	Object.defineProperty(exports, 'getTextColorClass', {
	    enumerable: true,
	    get: function get() {
	        return _palette.getTextColorClass;
	    }
	});
	
	var _Badge = __webpack_require__(6);
	
	Object.defineProperty(exports, 'Badge', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Badge).default;
	    }
	});
	
	var _Button = __webpack_require__(8);
	
	Object.defineProperty(exports, 'Button', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Button).default;
	    }
	});
	
	var _Card = __webpack_require__(9);
	
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
	
	var _Checkbox = __webpack_require__(16);
	
	Object.defineProperty(exports, 'Checkbox', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Checkbox).default;
	    }
	});
	
	var _Chip = __webpack_require__(17);
	
	Object.defineProperty(exports, 'Chip', {
	    enumerable: true,
	    get: function get() {
	        return _Chip.Chip;
	    }
	});
	Object.defineProperty(exports, 'ChipContact', {
	    enumerable: true,
	    get: function get() {
	        return _Chip.ChipContact;
	    }
	});
	
	var _DataTable = __webpack_require__(19);
	
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
	
	var _Dialog = __webpack_require__(27);
	
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
	
	var _FABButton = __webpack_require__(31);
	
	Object.defineProperty(exports, 'FABButton', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_FABButton).default;
	    }
	});
	
	var _Footer = __webpack_require__(32);
	
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
	
	var _Grid = __webpack_require__(38);
	
	Object.defineProperty(exports, 'Grid', {
	    enumerable: true,
	    get: function get() {
	        return _Grid.Grid;
	    }
	});
	Object.defineProperty(exports, 'Cell', {
	    enumerable: true,
	    get: function get() {
	        return _Grid.Cell;
	    }
	});
	
	var _Icon = __webpack_require__(18);
	
	Object.defineProperty(exports, 'Icon', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Icon).default;
	    }
	});
	
	var _IconButton = __webpack_require__(41);
	
	Object.defineProperty(exports, 'IconButton', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_IconButton).default;
	    }
	});
	
	var _IconToggle = __webpack_require__(42);
	
	Object.defineProperty(exports, 'IconToggle', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_IconToggle).default;
	    }
	});
	
	var _Layout = __webpack_require__(43);
	
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
	
	var _List = __webpack_require__(53);
	
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
	
	var _Menu = __webpack_require__(57);
	
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
	
	var _ProgressBar = __webpack_require__(58);
	
	Object.defineProperty(exports, 'ProgressBar', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_ProgressBar).default;
	    }
	});
	
	var _Radio = __webpack_require__(59);
	
	Object.defineProperty(exports, 'Radio', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Radio).default;
	    }
	});
	
	var _RadioGroup = __webpack_require__(60);
	
	Object.defineProperty(exports, 'RadioGroup', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_RadioGroup).default;
	    }
	});
	
	var _Slider = __webpack_require__(61);
	
	Object.defineProperty(exports, 'Slider', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Slider).default;
	    }
	});
	
	var _Snackbar = __webpack_require__(62);
	
	Object.defineProperty(exports, 'Snackbar', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Snackbar).default;
	    }
	});
	
	var _Spinner = __webpack_require__(63);
	
	Object.defineProperty(exports, 'Spinner', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Spinner).default;
	    }
	});
	
	var _Switch = __webpack_require__(64);
	
	Object.defineProperty(exports, 'Switch', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Switch).default;
	    }
	});
	
	var _Tabs = __webpack_require__(65);
	
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
	
	var _Textfield = __webpack_require__(68);
	
	Object.defineProperty(exports, 'Textfield', {
	    enumerable: true,
	    get: function get() {
	        return _interopRequireDefault(_Textfield).default;
	    }
	});
	
	var _Tooltip = __webpack_require__(21);
	
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
	
	var React = _interopRequireWildcard(_react);
	
	var _MDLComponent = __webpack_require__(3);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function patchComponentClass(Component, recursive) {
	    var oldRender = Component.prototype.render;
	
	    Component.prototype.render = function render() {
	        // eslint-disable-line no-param-reassign
	        return React.createElement(
	            _MDLComponent2.default,
	            { recursive: recursive },
	            oldRender.call(this)
	        );
	    };
	
	    return Component;
	}
	
	function patchSFC(component, recursive) {
	    var patchedComponent = function patchedComponent(props) {
	        return React.createElement(
	            _MDLComponent2.default,
	            { recursive: recursive },
	            component(props)
	        );
	    };
	
	    // Attempt to change the function name for easier debugging, but don't die
	    // if the browser doesn't support it
	    try {
	        Object.defineProperty(patchedComponent, 'name', {
	            value: component.name
	        });
	    } catch (e) {} // eslint-disable-line no-empty
	
	    return patchedComponent;
	}
	
	exports.default = function (Component) {
	    var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    return Component.prototype && Component.prototype.isReactComponent ? patchComponentClass(Component, recursive) : patchSFC(Component, recursive);
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
	
	        return _possibleConstructorReturn(this, (MDLComponent.__proto__ || Object.getPrototypeOf(MDLComponent)).apply(this, arguments));
	    }
	
	    _createClass(MDLComponent, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (this.props.recursive) {
	                window.componentHandler.upgradeElements((0, _reactDom.findDOMNode)(this));
	            } else {
	                window.componentHandler.upgradeElement((0, _reactDom.findDOMNode)(this));
	            }
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
	
	
	MDLComponent.propTypes = {
	    recursive: _react.PropTypes.bool
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getColorClass = getColorClass;
	exports.getTextColorClass = getTextColorClass;
	// see https://github.com/google/material-design-lite/blob/master/src/palette/_palette.scss
	// for the color and level possibilities
	
	function getColorClass(color, level) {
	    var lvlClass = level ? '-' + level : '';
	    return 'mdl-color--' + color + lvlClass;
	}
	
	function getTextColorClass(color, level) {
	    var lvlClass = level ? '-' + level : '';
	    return 'mdl-color-text--' + color + lvlClass;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
	    className: _react.PropTypes.string,
	    text: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
	    overlap: _react.PropTypes.bool,
	    noBackground: _react.PropTypes.bool
	};
	
	var Badge = function Badge(props) {
	    var children = props.children,
	        className = props.className,
	        text = props.text,
	        overlap = props.overlap,
	        noBackground = props.noBackground,
	        rest = _objectWithoutProperties(props, ['children', 'className', 'text', 'overlap', 'noBackground']);
	
	    // No badge if no children
	    // TODO: In React 15, we can return null instead
	
	
	    if (!_react2.default.Children.count(children)) return _react2.default.createElement('noscript', null);
	
	    var element = typeof children === 'string' ? _react2.default.createElement(
	        'span',
	        null,
	        children
	    ) : _react2.default.Children.only(children);
	
	    // No text -> No need of badge
	    if (text === null || typeof text === 'undefined') return element;
	
	    return _react2.default.cloneElement(element, _extends({}, rest, {
	        className: (0, _classnames2.default)(className, element.props.className, 'mdl-badge', {
	            'mdl-badge--overlap': !!overlap,
	            'mdl-badge--no-background': !!noBackground
	        }),
	        'data-badge': text
	    }));
	};
	
	Badge.propTypes = propTypes;
	
	exports.default = Badge;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
	    }
	
	    _createClass(Button, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                accent = _props.accent,
	                className = _props.className,
	                colored = _props.colored,
	                primary = _props.primary,
	                raised = _props.raised,
	                ripple = _props.ripple,
	                component = _props.component,
	                href = _props.href,
	                children = _props.children,
	                otherProps = _objectWithoutProperties(_props, ['accent', 'className', 'colored', 'primary', 'raised', 'ripple', 'component', 'href', 'children']);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardMedia = exports.CardActions = exports.CardTitle = exports.CardMenu = exports.CardText = exports.Card = undefined;
	
	var _Card = __webpack_require__(10);
	
	Object.defineProperty(exports, 'Card', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Card).default;
	  }
	});
	
	var _CardTitle = __webpack_require__(13);
	
	Object.defineProperty(exports, 'CardTitle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_CardTitle).default;
	  }
	});
	
	var _CardActions = __webpack_require__(14);
	
	Object.defineProperty(exports, 'CardActions', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_CardActions).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(15);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CardText = exports.CardText = (0, _basicClassCreator2.default)('CardText', 'mdl-card__supporting-text');
	var CardMenu = exports.CardMenu = (0, _basicClassCreator2.default)('CardMenu', 'mdl-card__menu');
	var CardMedia = exports.CardMedia = (0, _basicClassCreator2.default)('CardMedia', 'mdl-card__media');

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(11);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(12);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    shadow: _react.PropTypes.number
	};
	
	var Card = function Card(props) {
	    var className = props.className,
	        shadow = props.shadow,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'shadow', 'children']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-card', _defineProperty({}, _shadows2.default[shadowLevel], hasShadow), className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	Card.propTypes = propTypes;
	
	exports.default = Card;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = clamp
	
	function clamp(value, min, max) {
	  return min < max
	    ? (value < min ? min : value > max ? max : value)
	    : (value < max ? max : value > min ? min : value)
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var values = [2, 3, 4, 6, 8, 16, 24];
	exports.default = values.map(function (v) {
	  return "mdl-shadow--" + v + "dp";
	});

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    expand: _react.PropTypes.bool
	};
	
	var CardTitle = function CardTitle(props) {
	    var className = props.className,
	        children = props.children,
	        expand = props.expand,
	        otherProps = _objectWithoutProperties(props, ['className', 'children', 'expand']);
	
	    var classes = (0, _classnames2.default)('mdl-card__title', {
	        'mdl-card--expand': expand
	    }, className);
	
	    var title = typeof children === 'string' ? _react2.default.createElement(
	        'h2',
	        { className: 'mdl-card__title-text' },
	        children
	    ) : children;
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title
	    );
	};
	
	CardTitle.propTypes = propTypes;
	
	exports.default = CardTitle;

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    border: _react.PropTypes.bool,
	    className: _react.PropTypes.string
	};
	
	var CardActions = function CardActions(props) {
	    var className = props.className,
	        border = props.border,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'border', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-card__actions', {
	        'mdl-card--border': border
	    }, className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	CardActions.propTypes = propTypes;
	
	exports.default = CardActions;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	exports.default = function (displayName, defaultClassName) {
	    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
	
	    var fn = function fn(props) {
	        var className = props.className,
	            children = props.children,
	            otherProps = _objectWithoutProperties(props, ['className', 'children']);
	
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
/* 16 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
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
	            var _props = this.props,
	                className = _props.className,
	                label = _props.label,
	                ripple = _props.ripple,
	                inputProps = _objectWithoutProperties(_props, ['className', 'label', 'ripple']);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(Checkbox, true);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Chip = exports.ChipText = exports.ChipContact = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _basicClassCreator = __webpack_require__(15);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	var _Icon = __webpack_require__(18);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    onClick: _react.PropTypes.func,
	    onClose: _react.PropTypes.func
	};
	
	var ChipContact = exports.ChipContact = (0, _basicClassCreator2.default)('ChipContact', 'mdl-chip__contact', 'span');
	var ChipText = exports.ChipText = (0, _basicClassCreator2.default)('ChipText', 'mdl-chip__text', 'span');
	
	var Chip = exports.Chip = function Chip(props) {
	    var className = props.className,
	        onClick = props.onClick,
	        onClose = props.onClose,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'onClick', 'onClose', 'children']);
	
	    var childrenArray = _react2.default.Children.toArray(children);
	    var contactIndex = childrenArray.findIndex(function (c) {
	        return c.type === ChipContact;
	    });
	
	    var chipContent = [];
	
	    if (contactIndex >= 0) {
	        chipContent.push(childrenArray[contactIndex], _react2.default.createElement(
	            ChipText,
	            { key: 'text' },
	            childrenArray.slice(0, contactIndex).concat(childrenArray.slice(contactIndex + 1))
	        ));
	    } else {
	        chipContent.push(_react2.default.createElement(
	            ChipText,
	            { key: 'text' },
	            children
	        ));
	    }
	
	    if (onClose) {
	        chipContent.push(_react2.default.createElement(
	            'button',
	            { key: 'btn', type: 'button', className: 'mdl-chip__action', onClick: onClose },
	            _react2.default.createElement(_Icon2.default, { name: 'cancel' })
	        ));
	    }
	
	    var elt = onClick ? 'button' : 'span';
	
	    return _react2.default.createElement(elt, _extends({
	        className: (0, _classnames2.default)('mdl-chip', {
	            'mdl-chip--contact': contactIndex > -1,
	            'mdl-chip--deletable': !!onClose
	        }, className),
	        type: onClick ? 'button' : null,
	        onClick: onClick
	    }, otherProps), chipContent);
	};
	
	Chip.propTypes = propTypes;

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired
	};
	
	var Icon = function Icon(props) {
	    var className = props.className,
	        name = props.name,
	        otherProps = _objectWithoutProperties(props, ['className', 'name']);
	
	    var classes = (0, _classnames2.default)('material-icons', className);
	
	    return _react2.default.createElement(
	        'i',
	        _extends({ className: classes }, otherProps),
	        name
	    );
	};
	
	Icon.propTypes = propTypes;
	
	exports.default = Icon;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _TableHeader = __webpack_require__(20);
	
	Object.defineProperty(exports, 'TableHeader', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TableHeader).default;
	  }
	});
	
	var _Table = __webpack_require__(22);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tooltip = __webpack_require__(21);
	
	var _Tooltip2 = _interopRequireDefault(_Tooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    cellFormatter: _react.PropTypes.func, // Used by the Table component to format the cell content for this "column"
	    className: _react.PropTypes.string,
	    name: _react.PropTypes.string.isRequired,
	    numeric: _react.PropTypes.bool,
	    onClick: _react.PropTypes.func,
	    nosort: _react.PropTypes.bool,
	    sortFn: _react.PropTypes.func, // Used by the Sortable component
	    tooltip: _react.PropTypes.node
	};
	
	var TableHeader = function TableHeader(props) {
	    var className = props.className,
	        name = props.name,
	        numeric = props.numeric,
	        onClick = props.onClick,
	        nosort = props.nosort,
	        tooltip = props.tooltip,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'name', 'numeric', 'onClick', 'nosort', 'tooltip', 'children']);
	
	    // remove unwanted props
	    // see https://github.com/Hacker0x01/react-datepicker/issues/517#issuecomment-230171426
	
	
	    delete otherProps.cellFormatter;
	    delete otherProps.sortFn;
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _MDLComponent = __webpack_require__(3);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Tooltip = function Tooltip(props) {
	    var label = props.label,
	        large = props.large,
	        children = props.children,
	        position = props.position,
	        otherProps = _objectWithoutProperties(props, ['label', 'large', 'children', 'position']);
	
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
/* 22 */
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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(11);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(12);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	var _TableHeader = __webpack_require__(20);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _Selectable = __webpack_require__(23);
	
	var _Selectable2 = _interopRequireDefault(_Selectable);
	
	var _Sortable = __webpack_require__(26);
	
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
	
	        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
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
	
	            var _props = this.props,
	                className = _props.className,
	                columns = _props.columns,
	                shadow = _props.shadow,
	                children = _props.children,
	                rowKeyColumn = _props.rowKeyColumn,
	                rows = _props.rows,
	                data = _props.data,
	                otherProps = _objectWithoutProperties(_props, ['className', 'columns', 'shadow', 'children', 'rowKeyColumn', 'rows', 'data']);
	
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
	                        var _ref = row.mdlRowProps || {},
	                            mdlRowPropsClassName = _ref.className,
	                            remainingMdlRowProps = _objectWithoutProperties(_ref, ['className']);
	
	                        return _react2.default.createElement(
	                            'tr',
	                            _extends({
	                                key: row[rowKeyColumn] || row.key || idx,
	                                className: (0, _classnames2.default)(row.className, mdlRowPropsClassName)
	                            }, remainingMdlRowProps),
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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _lodash = __webpack_require__(24);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _TableHeader = __webpack_require__(20);
	
	var _TableHeader2 = _interopRequireDefault(_TableHeader);
	
	var _Checkbox = __webpack_require__(16);
	
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
	
	            var _this = _possibleConstructorReturn(this, (Selectable.__proto__ || Object.getPrototypeOf(Selectable)).call(this, props));
	
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
	                        var rows = nextProps.rows,
	                            data = nextProps.data,
	                            rowKeyColumn = nextProps.rowKeyColumn;
	
	                        var rrows = rows || data;
	
	                        if (!(0, _lodash2.default)(_this2.props.rows || _this2.props.data, rrows)) {
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
	                        }
	                    })();
	                }
	            }
	        }, {
	            key: 'handleChangeHeaderCheckbox',
	            value: function handleChangeHeaderCheckbox(e) {
	                var _props = this.props,
	                    rowKeyColumn = _props.rowKeyColumn,
	                    rows = _props.rows,
	                    data = _props.data;
	
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
	                var _props2 = this.props,
	                    rows = _props2.rows,
	                    data = _props2.data;
	
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
	
	                var _props3 = this.props,
	                    rows = _props3.rows,
	                    data = _props3.data,
	                    selectable = _props3.selectable,
	                    children = _props3.children,
	                    rowKeyColumn = _props3.rowKeyColumn,
	                    otherProps = _objectWithoutProperties(_props3, ['rows', 'data', 'selectable', 'children', 'rowKeyColumn']);
	
	                // remove unwatned props
	                // see https://github.com/Hacker0x01/react-datepicker/issues/517#issuecomment-230171426
	
	
	                delete otherProps.onSelectionChanged;
	
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
	                        _react2.default.createElement(_Checkbox2.default, {
	                            className: 'mdl-data-table__select',
	                            checked: this.state.headerSelected,
	                            onChange: this.handleChangeHeaderCheckbox
	                        })
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
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
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
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
	
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
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
	
	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/** Built-in value references. */
	var Symbol = root.Symbol,
	    Uint8Array = root.Uint8Array,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable,
	    splice = arrayProto.splice;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView'),
	    Map = getNative(root, 'Map'),
	    Promise = getNative(root, 'Promise'),
	    Set = getNative(root, 'Set'),
	    WeakMap = getNative(root, 'WeakMap'),
	    nativeCreate = getNative(Object, 'create');
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
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
	  return true;
	}
	
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
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache) {
	    var pairs = cache.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      return this;
	    }
	    cache = this.__data__ = new MapCache(pairs);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];
	
	  var length = result.length,
	      skipIndexes = !!length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
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
	
	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
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
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
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
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
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
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
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
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
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
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge < 14, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
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
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
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
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
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
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
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
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = isEqual;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(25)(module)))

/***/ },
/* 25 */
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


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TableHeader = __webpack_require__(20);
	
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
	
	            var _this = _possibleConstructorReturn(this, (Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call(this, props));
	
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
	                var _state = this.state,
	                    sortHeader = _state.sortHeader,
	                    isAsc = _state.isAsc;
	
	
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
	
	                var _props = this.props,
	                    children = _props.children,
	                    columns = _props.columns,
	                    sortable = _props.sortable;
	
	
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
	                var _props2 = this.props,
	                    rows = _props2.rows,
	                    data = _props2.data,
	                    otherProps = _objectWithoutProperties(_props2, ['rows', 'data']);
	
	                var realRows = this.state && this.state.rows || rows || data;
	
	                // remove unwanted props
	                delete otherProps.sortable;
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DialogActions = exports.DialogContent = exports.DialogTitle = exports.Dialog = undefined;
	
	var _Dialog = __webpack_require__(28);
	
	Object.defineProperty(exports, 'Dialog', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Dialog).default;
	  }
	});
	
	var _DialogTitle = __webpack_require__(29);
	
	Object.defineProperty(exports, 'DialogTitle', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DialogTitle).default;
	  }
	});
	
	var _DialogActions = __webpack_require__(30);
	
	Object.defineProperty(exports, 'DialogActions', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DialogActions).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(15);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DialogContent = exports.DialogContent = (0, _basicClassCreator2.default)('DialogContent', 'mdl-dialog__content');

/***/ },
/* 28 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).apply(this, arguments));
	    }
	
	    _createClass(Dialog, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.dialogRef.addEventListener('cancel', this.props.onCancel);
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
	                    var windowHeight = window.innerHeight;
	                    if (this.dialogRef) {
	                        var dialogHeight = this.dialogRef.clientHeight;
	                        this.dialogRef.style.position = 'fixed';
	                        this.dialogRef.style.top = (windowHeight - dialogHeight) / 2 + 'px';
	                    }
	                } else {
	                    (0, _reactDom.findDOMNode)(this).close();
	                }
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.dialogRef.removeEventListener('cancel', this.props.onCancel);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            // We cannot set the `open` prop on the Dialog if we manage its state manually with `showModal`,
	            // this the disabled eslint rule
	            // eslint-disable-next-line no-unused-vars
	            var _props = this.props,
	                className = _props.className,
	                open = _props.open,
	                onCancel = _props.onCancel,
	                children = _props.children,
	                otherProps = _objectWithoutProperties(_props, ['className', 'open', 'onCancel', 'children']);
	
	            var classes = (0, _classnames2.default)('mdl-dialog', className);
	
	            return _react2.default.createElement(
	                'dialog',
	                _extends({ ref: function ref(c) {
	                        return _this2.dialogRef = c;
	                    }, className: classes }, otherProps),
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DialogTitle = function DialogTitle(props) {
	    var className = props.className,
	        component = props.component,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'component', 'children']);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DialogActions = function DialogActions(props) {
	    var className = props.className,
	        fullWidth = props.fullWidth,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'fullWidth', 'children']);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(8);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var FABButton = function FABButton(props) {
	    var mini = props.mini,
	        className = props.className,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['mini', 'className', 'children']);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Footer = __webpack_require__(33);
	
	Object.defineProperty(exports, 'Footer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Footer).default;
	  }
	});
	
	var _Section = __webpack_require__(35);
	
	Object.defineProperty(exports, 'FooterSection', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Section).default;
	  }
	});
	
	var _DropDownSection = __webpack_require__(36);
	
	Object.defineProperty(exports, 'FooterDropDownSection', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DropDownSection).default;
	  }
	});
	
	var _LinkList = __webpack_require__(37);
	
	Object.defineProperty(exports, 'FooterLinkList', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_LinkList).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(34);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Footer = function Footer(props) {
	    var className = props.className,
	        size = props.size,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'size', 'children']);
	
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(34);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Section = function Section(props) {
	    var className = props.className,
	        logo = props.logo,
	        size = props.size,
	        type = props.type,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'logo', 'size', 'type', 'children']);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(34);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var DropDownSection = function DropDownSection(props) {
	    var className = props.className,
	        size = props.size,
	        title = props.title,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'size', 'title', 'children']);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var LinkList = function LinkList(props) {
	    var className = props.className,
	        size = props.size,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'size', 'children']);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Grid = __webpack_require__(39);
	
	Object.defineProperty(exports, 'default', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Grid).default;
	  }
	});
	Object.defineProperty(exports, 'Grid', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Grid).default;
	  }
	});
	
	var _Cell = __webpack_require__(40);
	
	Object.defineProperty(exports, 'Cell', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Cell).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(11);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(12);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    className: _react.PropTypes.string,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    noSpacing: _react.PropTypes.bool,
	    shadow: _react.PropTypes.number
	};
	
	var Grid = function Grid(props) {
	    var noSpacing = props.noSpacing,
	        className = props.className,
	        children = props.children,
	        component = props.component,
	        shadow = props.shadow,
	        otherProps = _objectWithoutProperties(props, ['noSpacing', 'className', 'children', 'component', 'shadow']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-grid', _defineProperty({
	        'mdl-grid--no-spacing': noSpacing
	    }, _shadows2.default[shadowLevel], hasShadow), className);
	
	    return _react2.default.createElement(component || 'div', _extends({
	        className: classes
	    }, otherProps), children);
	};
	
	Grid.propTypes = propTypes;
	
	exports.default = Grid;

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(11);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	var _shadows = __webpack_require__(12);
	
	var _shadows2 = _interopRequireDefault(_shadows);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    align: _react.PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
	    className: _react.PropTypes.string,
	    col: _react.PropTypes.number,
	    component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element, _react.PropTypes.func]),
	    phone: _react.PropTypes.number,
	    tablet: _react.PropTypes.number,
	    offset: _react.PropTypes.number,
	    offsetDesktop: _react.PropTypes.number,
	    offsetTablet: _react.PropTypes.number,
	    offsetPhone: _react.PropTypes.number,
	    hideDesktop: _react.PropTypes.bool,
	    hidePhone: _react.PropTypes.bool,
	    hideTablet: _react.PropTypes.bool,
	    shadow: _react.PropTypes.number
	};
	
	function isDefined(data) {
	    return typeof data !== 'undefined';
	}
	
	var Cell = function Cell(props) {
	    var _classNames;
	
	    var align = props.align,
	        className = props.className,
	        children = props.children,
	        col = props.col,
	        phone = props.phone,
	        tablet = props.tablet,
	        component = props.component,
	        hideDesktop = props.hideDesktop,
	        hidePhone = props.hidePhone,
	        hideTablet = props.hideTablet,
	        shadow = props.shadow,
	        offset = props.offset,
	        offsetDesktop = props.offsetDesktop,
	        offsetTablet = props.offsetTablet,
	        offsetPhone = props.offsetPhone,
	        otherProps = _objectWithoutProperties(props, ['align', 'className', 'children', 'col', 'phone', 'tablet', 'component', 'hideDesktop', 'hidePhone', 'hideTablet', 'shadow', 'offset', 'offsetDesktop', 'offsetTablet', 'offsetPhone']);
	
	    var hasShadow = isDefined(shadow);
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, _shadows2.default.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-cell', (_classNames = {}, _defineProperty(_classNames, 'mdl-cell--' + col + '-col', isDefined(col)), _defineProperty(_classNames, 'mdl-cell--' + phone + '-col-phone', isDefined(phone)), _defineProperty(_classNames, 'mdl-cell--' + tablet + '-col-tablet', isDefined(tablet)), _defineProperty(_classNames, 'mdl-cell--' + align, isDefined(align)), _defineProperty(_classNames, 'mdl-cell--' + offset + '-offset', isDefined(offset)), _defineProperty(_classNames, 'mdl-cell--' + offsetDesktop + '-offset-desktop', isDefined(offsetDesktop)), _defineProperty(_classNames, 'mdl-cell--' + offsetTablet + '-offset-tablet', isDefined(offsetTablet)), _defineProperty(_classNames, 'mdl-cell--' + offsetPhone + '-offset-phone', isDefined(offsetPhone)), _defineProperty(_classNames, 'mdl-cell--hide-desktop', hideDesktop), _defineProperty(_classNames, 'mdl-cell--hide-phone', hidePhone), _defineProperty(_classNames, 'mdl-cell--hide-tablet', hideTablet), _defineProperty(_classNames, _shadows2.default[shadowLevel], hasShadow), _classNames), className);
	
	    return _react2.default.createElement(component || 'div', _extends({
	        className: classes
	    }, otherProps), children);
	};
	
	Cell.propTypes = propTypes;
	
	exports.default = Cell;

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(8);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Icon = __webpack_require__(18);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var IconButton = function IconButton(props) {
	    var className = props.className,
	        name = props.name,
	        otherProps = _objectWithoutProperties(props, ['className', 'name']);
	
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
/* 42 */
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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(18);
	
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
	
	        return _possibleConstructorReturn(this, (IconToggle.__proto__ || Object.getPrototypeOf(IconToggle)).apply(this, arguments));
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
	            var _props = this.props,
	                className = _props.className,
	                name = _props.name,
	                ripple = _props.ripple,
	                inputProps = _objectWithoutProperties(_props, ['className', 'name', 'ripple']);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(IconToggle, true);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Layout = __webpack_require__(44);
	
	Object.defineProperty(exports, 'Layout', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Layout).default;
	  }
	});
	
	var _Content = __webpack_require__(45);
	
	Object.defineProperty(exports, 'Content', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Content).default;
	  }
	});
	
	var _Drawer = __webpack_require__(46);
	
	Object.defineProperty(exports, 'Drawer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Drawer).default;
	  }
	});
	
	var _Header = __webpack_require__(47);
	
	Object.defineProperty(exports, 'Header', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Header).default;
	  }
	});
	
	var _HeaderRow = __webpack_require__(48);
	
	Object.defineProperty(exports, 'HeaderRow', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_HeaderRow).default;
	  }
	});
	
	var _HeaderTabs = __webpack_require__(50);
	
	Object.defineProperty(exports, 'HeaderTabs', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_HeaderTabs).default;
	  }
	});
	
	var _Navigation = __webpack_require__(52);
	
	Object.defineProperty(exports, 'Navigation', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Navigation).default;
	  }
	});
	
	var _Spacer = __webpack_require__(49);
	
	Object.defineProperty(exports, 'Spacer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Spacer).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).apply(this, arguments));
	    }
	
	    _createClass(Layout, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                className = _props.className,
	                fixedDrawer = _props.fixedDrawer,
	                fixedHeader = _props.fixedHeader,
	                fixedTabs = _props.fixedTabs,
	                otherProps = _objectWithoutProperties(_props, ['className', 'fixedDrawer', 'fixedHeader', 'fixedTabs']);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(Layout, true);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Content = function Content(props) {
	    var children = props.children,
	        className = props.className,
	        component = props.component,
	        otherProps = _objectWithoutProperties(props, ['children', 'className', 'component']);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Drawer = function Drawer(props) {
	    var className = props.className,
	        title = props.title,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'title', 'children']);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _HeaderRow = __webpack_require__(48);
	
	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);
	
	var _HeaderTabs = __webpack_require__(50);
	
	var _HeaderTabs2 = _interopRequireDefault(_HeaderTabs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Header = function Header(props) {
	    var className = props.className,
	        scroll = props.scroll,
	        seamed = props.seamed,
	        title = props.title,
	        transparent = props.transparent,
	        waterfall = props.waterfall,
	        hideTop = props.hideTop,
	        hideSpacer = props.hideSpacer,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'scroll', 'seamed', 'title', 'transparent', 'waterfall', 'hideTop', 'hideSpacer', 'children']);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Spacer = __webpack_require__(49);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var HeaderRow = function HeaderRow(props) {
	    var className = props.className,
	        title = props.title,
	        children = props.children,
	        hideSpacer = props.hideSpacer,
	        otherProps = _objectWithoutProperties(props, ['className', 'title', 'children', 'hideSpacer']);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _basicClassCreator = __webpack_require__(15);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _basicClassCreator2.default)('Spacer', 'mdl-layout-spacer');

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _TabBar = __webpack_require__(51);
	
	var _TabBar2 = _interopRequireDefault(_TabBar);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var HeaderTabs = function HeaderTabs(props) {
	    var className = props.className,
	        ripple = props.ripple,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'ripple', 'children']);
	
	    var classes = (0, _classnames2.default)({
	        'mdl-js-ripple-effect': ripple,
	        'mdl-js-ripple-effect--ignore-events': ripple
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
	
	exports.default = (0, _mdlUpgrade2.default)(HeaderTabs);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
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
	
	        var _this = _possibleConstructorReturn(this, (TabBar.__proto__ || Object.getPrototypeOf(TabBar)).call(this, props));
	
	        _this.handleClickTab = _this.handleClickTab.bind(_this);
	        return _this;
	    }
	
	    _createClass(TabBar, [{
	        key: 'handleClickTab',
	        value: function handleClickTab(tabId) {
	            if (this.props.onChange) {
	                this.props.onChange(tabId);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props,
	                activeTab = _props.activeTab,
	                className = _props.className,
	                cssPrefix = _props.cssPrefix,
	                children = _props.children,
	                otherProps = _objectWithoutProperties(_props, ['activeTab', 'className', 'cssPrefix', 'children']);
	
	            var classes = (0, _classnames2.default)(_defineProperty({}, cssPrefix + '__tab-bar', true), className);
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                _react2.default.Children.map(children, function (child, tabId) {
	                    return _react2.default.cloneElement(child, {
	                        cssPrefix: cssPrefix,
	                        tabId: tabId,
	                        active: tabId === activeTab,
	                        onTabClick: _this2.handleClickTab
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(34);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	var _Spacer = __webpack_require__(49);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Navigation = function Navigation(props) {
	    var className = props.className,
	        children = props.children,
	        otherProps = _objectWithoutProperties(props, ['className', 'children']);
	
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ListItemContent = exports.ListItemAction = exports.ListItem = exports.List = undefined;
	
	var _ListItem = __webpack_require__(54);
	
	Object.defineProperty(exports, 'ListItem', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItem).default;
	  }
	});
	
	var _ListItemAction = __webpack_require__(56);
	
	Object.defineProperty(exports, 'ListItemAction', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItemAction).default;
	  }
	});
	
	var _ListItemContent = __webpack_require__(55);
	
	Object.defineProperty(exports, 'ListItemContent', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ListItemContent).default;
	  }
	});
	
	var _basicClassCreator = __webpack_require__(15);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var List = exports.List = (0, _basicClassCreator2.default)('List', 'mdl-list', 'ul');

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
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ListItemContent = __webpack_require__(55);
	
	var _ListItemContent2 = _interopRequireDefault(_ListItemContent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    children: _react.PropTypes.node,
	    className: _react.PropTypes.string,
	    twoLine: _react.PropTypes.bool,
	    threeLine: _react.PropTypes.bool
	};
	
	var ListItem = function ListItem(props) {
	    var className = props.className,
	        twoLine = props.twoLine,
	        threeLine = props.threeLine,
	        otherProps = _objectWithoutProperties(props, ['className', 'twoLine', 'threeLine']);
	
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
	            return (0, _react.cloneElement)(child, {
	                useBodyClass: !!threeLine
	            });
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(18);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    avatar: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	    children: _react.PropTypes.node,
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
	    var avatar = props.avatar,
	        children = props.children,
	        className = props.className,
	        icon = props.icon,
	        subtitle = props.subtitle,
	        useBodyClass = props.useBodyClass,
	        otherProps = _objectWithoutProperties(props, ['avatar', 'children', 'className', 'icon', 'subtitle', 'useBodyClass']);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var propTypes = {
	    children: _react.PropTypes.node,
	    className: _react.PropTypes.string,
	    info: _react.PropTypes.string
	};
	
	var ListItemAction = function ListItemAction(props) {
	    var children = props.children,
	        className = props.className,
	        info = props.info,
	        otherProps = _objectWithoutProperties(props, ['children', 'className', 'info']);
	
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
/* 57 */
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
	
	var _reactDom = __webpack_require__(4);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _basicClassCreator = __webpack_require__(15);
	
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
	
	        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	    }
	
	    _createClass(Menu, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.componentHandler.upgradeElements((0, _reactDom.findDOMNode)(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            var elt = (0, _reactDom.findDOMNode)(this);
	
	            window.componentHandler.downgradeElements(elt);
	
	            var parent = elt.parentElement;
	            var grandparent = parent && parent.parentElement;
	
	            if (parent && grandparent && parent.classList.contains('mdl-menu__container')) {
	                grandparent.replaceChild(elt, parent);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _classNames;
	
	            var _props = this.props,
	                align = _props.align,
	                children = _props.children,
	                className = _props.className,
	                ripple = _props.ripple,
	                target = _props.target,
	                valign = _props.valign,
	                otherProps = _objectWithoutProperties(_props, ['align', 'children', 'className', 'ripple', 'target', 'valign']);
	
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
	
	exports.default = Menu;
	var MenuItem = exports.MenuItem = (0, _basicClassCreator2.default)('MenuItem', 'mdl-menu__item', 'li');

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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
	    }
	
	    _createClass(ProgressBar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setProgress(this.props.progress);
	            this.setBuffer(this.props.buffer);
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.setProgress(this.props.progress);
	            this.setBuffer(this.props.buffer);
	        }
	    }, {
	        key: 'setProgress',
	        value: function setProgress(progress) {
	            if (!this.props.indeterminate && progress !== undefined) {
	                (0, _reactDom.findDOMNode)(this).MaterialProgress.setProgress(progress);
	            }
	        }
	    }, {
	        key: 'setBuffer',
	        value: function setBuffer(buffer) {
	            if (buffer !== undefined) {
	                (0, _reactDom.findDOMNode)(this).MaterialProgress.setBuffer(buffer);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                className = _props.className,
	                indeterminate = _props.indeterminate,
	                buffer = _props.buffer,
	                progress = _props.progress,
	                otherProps = _objectWithoutProperties(_props, ['className', 'indeterminate', 'buffer', 'progress']);
	
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
/* 59 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).apply(this, arguments));
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
	            var _props = this.props,
	                children = _props.children,
	                className = _props.className,
	                name = _props.name,
	                ripple = _props.ripple,
	                value = _props.value,
	                inputProps = _objectWithoutProperties(_props, ['children', 'className', 'name', 'ripple', 'value']);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(Radio, true);

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
	
	var _Radio = __webpack_require__(59);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var RadioGroup = function RadioGroup(props) {
	    var name = props.name,
	        value = props.value,
	        children = props.children,
	        container = props.container,
	        childContainer = props.childContainer,
	        onChange = props.onChange,
	        otherProps = _objectWithoutProperties(props, ['name', 'value', 'children', 'container', 'childContainer', 'onChange']);
	
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
/* 61 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
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
	            var _props = this.props,
	                className = _props.className,
	                otherProps = _objectWithoutProperties(_props, ['className']);
	
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        var _this = _possibleConstructorReturn(this, (Snackbar.__proto__ || Object.getPrototypeOf(Snackbar)).call(this, props));
	
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
	            var _props = this.props,
	                action = _props.action,
	                active = _props.active,
	                className = _props.className,
	                children = _props.children,
	                onActionClick = _props.onActionClick,
	                otherProps = _objectWithoutProperties(_props, ['action', 'active', 'className', 'children', 'onActionClick']);
	
	            var open = this.state.open;
	
	
	            var classes = (0, _classnames2.default)('mdl-snackbar', {
	                'mdl-snackbar--active': open
	            }, className);
	
	            delete otherProps.onTimeout;
	            delete otherProps.timeout;
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes, 'aria-hidden': !open }, otherProps),
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).apply(this, arguments));
	    }
	
	    _createClass(Spinner, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                className = _props.className,
	                singleColor = _props.singleColor,
	                otherProps = _objectWithoutProperties(_props, ['className', 'singleColor']);
	
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
/* 64 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));
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
	            var _props = this.props,
	                className = _props.className,
	                ripple = _props.ripple,
	                children = _props.children,
	                inputProps = _objectWithoutProperties(_props, ['className', 'ripple', 'children']);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(Switch, true);

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Tabs = __webpack_require__(66);
	
	Object.defineProperty(exports, 'Tabs', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tabs).default;
	  }
	});
	
	var _TabBar = __webpack_require__(51);
	
	Object.defineProperty(exports, 'TabBar', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TabBar).default;
	  }
	});
	
	var _Tab = __webpack_require__(67);
	
	Object.defineProperty(exports, 'Tab', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tab).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tab = __webpack_require__(67);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabBar = __webpack_require__(51);
	
	var _TabBar2 = _interopRequireDefault(_TabBar);
	
	var _mdlUpgrade = __webpack_require__(1);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
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
	    tabBarProps: _react.PropTypes.object,
	    ripple: _react.PropTypes.bool
	};
	
	var Tabs = function Tabs(props) {
	    var activeTab = props.activeTab,
	        className = props.className,
	        onChange = props.onChange,
	        children = props.children,
	        tabBarProps = props.tabBarProps,
	        ripple = props.ripple,
	        otherProps = _objectWithoutProperties(props, ['activeTab', 'className', 'onChange', 'children', 'tabBarProps', 'ripple']);
	
	    var classes = (0, _classnames2.default)('mdl-tabs mdl-js-tabs', {
	        'mdl-js-ripple-effect': ripple
	    }, className);
	
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
	
	exports.default = (0, _mdlUpgrade2.default)(Tabs, true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(7);
	
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
	
	    var active = props.active,
	        className = props.className,
	        component = props.component,
	        children = props.children,
	        cssPrefix = props.cssPrefix,
	        onTabClick = props.onTabClick,
	        style = props.style,
	        tabId = props.tabId,
	        otherProps = _objectWithoutProperties(props, ['active', 'className', 'component', 'children', 'cssPrefix', 'onTabClick', 'style', 'tabId']);
	
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
/* 68 */
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
	
	var _classnames = __webpack_require__(7);
	
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
	
	        return _possibleConstructorReturn(this, (Textfield.__proto__ || Object.getPrototypeOf(Textfield)).apply(this, arguments));
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
	            if (this.props.value !== prevProps.value && this.inputRef !== document.activeElement) {
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
	            var _this2 = this;
	
	            var _props = this.props,
	                className = _props.className,
	                inputClassName = _props.inputClassName,
	                id = _props.id,
	                error = _props.error,
	                expandable = _props.expandable,
	                expandableIcon = _props.expandableIcon,
	                floatingLabel = _props.floatingLabel,
	                label = _props.label,
	                maxRows = _props.maxRows,
	                rows = _props.rows,
	                style = _props.style,
	                children = _props.children,
	                otherProps = _objectWithoutProperties(_props, ['className', 'inputClassName', 'id', 'error', 'expandable', 'expandableIcon', 'floatingLabel', 'label', 'maxRows', 'rows', 'style', 'children']);
	
	            var hasRows = !!rows;
	            var customId = id || 'textfield-' + label.replace(/[^a-z0-9]/gi, '');
	            var inputTag = hasRows || maxRows > 1 ? 'textarea' : 'input';
	
	            var inputProps = _extends({
	                className: (0, _classnames2.default)('mdl-textfield__input', inputClassName),
	                id: customId,
	                rows: rows,
	                ref: function ref(c) {
	                    return _this2.inputRef = c;
	                }
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
	                ),
	                children
	            ) : _react2.default.createElement(
	                'div',
	                { className: containerClasses, style: style },
	                input,
	                labelContainer,
	                errorContainer,
	                children
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