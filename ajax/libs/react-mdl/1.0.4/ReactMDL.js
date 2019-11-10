(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactMDL"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactMDL"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_20__) {
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
	exports.Tooltip = exports.Textfield = exports.TabBar = exports.Tab = exports.Tabs = exports.Switch = exports.Spinner = exports.Slider = exports.RadioGroup = exports.Radio = exports.ProgressBar = exports.MenuItem = exports.Menu = exports.Content = exports.Navigation = exports.Spacer = exports.HeaderTabs = exports.HeaderRow = exports.Drawer = exports.Header = exports.Layout = exports.IconToggle = exports.IconButton = exports.Icon = exports.Cell = exports.Grid = exports.FooterLinkList = exports.FooterDropDownSection = exports.FooterSection = exports.Footer = exports.FABButton = exports.DataTable = exports.Checkbox = exports.CardMenu = exports.CardText = exports.CardMedia = exports.CardActions = exports.CardTitle = exports.Card = exports.Button = exports.Badge = exports.MDLComponent = exports.mdlUpgrade = undefined;
	
	var _Card = __webpack_require__(1);
	
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
	
	var _Footer = __webpack_require__(9);
	
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
	
	var _Grid2 = __webpack_require__(15);
	
	Object.defineProperty(exports, 'Cell', {
	    enumerable: true,
	    get: function get() {
	        return _Grid2.Cell;
	    }
	});
	
	var _Layout = __webpack_require__(16);
	
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
	
	var _Menu2 = __webpack_require__(30);
	
	Object.defineProperty(exports, 'MenuItem', {
	    enumerable: true,
	    get: function get() {
	        return _Menu2.MenuItem;
	    }
	});
	
	var _Tabs = __webpack_require__(31);
	
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
	
	var _mdlUpgrade2 = __webpack_require__(18);
	
	var _mdlUpgrade3 = _interopRequireDefault(_mdlUpgrade2);
	
	var _MDLComponent2 = __webpack_require__(19);
	
	var _MDLComponent3 = _interopRequireDefault(_MDLComponent2);
	
	var _Badge2 = __webpack_require__(33);
	
	var _Badge3 = _interopRequireDefault(_Badge2);
	
	var _Button2 = __webpack_require__(34);
	
	var _Button3 = _interopRequireDefault(_Button2);
	
	var _Checkbox2 = __webpack_require__(35);
	
	var _Checkbox3 = _interopRequireDefault(_Checkbox2);
	
	var _DataTable2 = __webpack_require__(36);
	
	var _DataTable3 = _interopRequireDefault(_DataTable2);
	
	var _FABButton2 = __webpack_require__(37);
	
	var _FABButton3 = _interopRequireDefault(_FABButton2);
	
	var _Grid3 = _interopRequireDefault(_Grid2);
	
	var _Icon2 = __webpack_require__(38);
	
	var _Icon3 = _interopRequireDefault(_Icon2);
	
	var _IconButton2 = __webpack_require__(39);
	
	var _IconButton3 = _interopRequireDefault(_IconButton2);
	
	var _IconToggle2 = __webpack_require__(40);
	
	var _IconToggle3 = _interopRequireDefault(_IconToggle2);
	
	var _Menu3 = _interopRequireDefault(_Menu2);
	
	var _ProgressBar2 = __webpack_require__(41);
	
	var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);
	
	var _Radio2 = __webpack_require__(42);
	
	var _Radio3 = _interopRequireDefault(_Radio2);
	
	var _RadioGroup2 = __webpack_require__(43);
	
	var _RadioGroup3 = _interopRequireDefault(_RadioGroup2);
	
	var _Slider2 = __webpack_require__(44);
	
	var _Slider3 = _interopRequireDefault(_Slider2);
	
	var _Spinner2 = __webpack_require__(45);
	
	var _Spinner3 = _interopRequireDefault(_Spinner2);
	
	var _Switch2 = __webpack_require__(46);
	
	var _Switch3 = _interopRequireDefault(_Switch2);
	
	var _Textfield2 = __webpack_require__(47);
	
	var _Textfield3 = _interopRequireDefault(_Textfield2);
	
	var _Tooltip2 = __webpack_require__(48);
	
	var _Tooltip3 = _interopRequireDefault(_Tooltip2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.mdlUpgrade = _mdlUpgrade3.default;
	exports.MDLComponent = _MDLComponent3.default;
	
	// components
	
	exports.Badge = _Badge3.default;
	exports.Button = _Button3.default;
	exports.Checkbox = _Checkbox3.default;
	exports.DataTable = _DataTable3.default;
	exports.FABButton = _FABButton3.default;
	exports.Grid = _Grid3.default;
	exports.Icon = _Icon3.default;
	exports.IconButton = _IconButton3.default;
	exports.IconToggle = _IconToggle3.default;
	exports.Menu = _Menu3.default;
	exports.ProgressBar = _ProgressBar3.default;
	exports.Radio = _Radio3.default;
	exports.RadioGroup = _RadioGroup3.default;
	exports.Slider = _Slider3.default;
	exports.Spinner = _Spinner3.default;
	exports.Switch = _Switch3.default;
	exports.Textfield = _Textfield3.default;
	exports.Tooltip = _Tooltip3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CardMedia = exports.CardActions = exports.CardTitle = exports.CardMenu = exports.CardText = exports.Card = undefined;
	
	var _basicClassCreator = __webpack_require__(2);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	var _Card2 = __webpack_require__(5);
	
	var _Card3 = _interopRequireDefault(_Card2);
	
	var _CardTitle2 = __webpack_require__(7);
	
	var _CardTitle3 = _interopRequireDefault(_CardTitle2);
	
	var _CardActions2 = __webpack_require__(8);
	
	var _CardActions3 = _interopRequireDefault(_CardActions2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Card = _Card3.default;
	var CardText = exports.CardText = (0, _basicClassCreator2.default)('CardText', 'mdl-card__supporting-text');
	var CardMenu = exports.CardMenu = (0, _basicClassCreator2.default)('CardMenu', 'mdl-card__menu');
	exports.CardTitle = _CardTitle3.default;
	exports.CardActions = _CardActions3.default;
	var CardMedia = exports.CardMedia = (0, _basicClassCreator2.default)('CardMedia', 'mdl-card__media');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
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
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _clamp = __webpack_require__(6);
	
	var _clamp2 = _interopRequireDefault(_clamp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var shadows = ['mdl-shadow--2dp', 'mdl-shadow--3dp', 'mdl-shadow--4dp', 'mdl-shadow--6dp', 'mdl-shadow--8dp', 'mdl-shadow--16dp'];
	
	var Card = function Card(props) {
	    var className = props.className;
	    var shadow = props.shadow;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'shadow', 'children']);
	
	    var hasShadow = typeof shadow !== 'undefined';
	    var shadowLevel = (0, _clamp2.default)(shadow || 0, 0, shadows.length - 1);
	
	    var classes = (0, _classnames2.default)('mdl-card', _defineProperty({}, shadows[shadowLevel], hasShadow), className);
	
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
/* 6 */
/***/ function(module, exports) {

	module.exports = clamp
	
	function clamp(value, min, max) {
	  return min < max
	    ? (value < min ? min : value > max ? max : value)
	    : (value < max ? max : value > min ? min : value)
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CardTitle = (function (_React$Component) {
	    _inherits(CardTitle, _React$Component);
	
	    function CardTitle() {
	        _classCallCheck(this, CardTitle);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(CardTitle).apply(this, arguments));
	    }
	
	    _createClass(CardTitle, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var children = _props.children;
	            var expand = _props.expand;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'children', 'expand']);
	
	            var classes = (0, _classnames2.default)('mdl-card__title', {
	                'mdl-card--expand': expand
	            }, className);
	
	            var title = typeof children === 'string' ? _react2.default.createElement('h2', { className: 'mdl-card__title-text' }, children) : children;
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                title
	            );
	        }
	    }]);
	
	    return CardTitle;
	})(_react2.default.Component);
	
	CardTitle.propTypes = {
	    className: _react.PropTypes.string,
	    expand: _react.PropTypes.bool
	};
	exports.default = CardTitle;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FooterLinkList = exports.FooterDropDownSection = exports.FooterSection = exports.Footer = undefined;
	
	var _Footer2 = __webpack_require__(10);
	
	var _Footer3 = _interopRequireDefault(_Footer2);
	
	var _Section = __webpack_require__(12);
	
	var _Section2 = _interopRequireDefault(_Section);
	
	var _DropDownSection = __webpack_require__(13);
	
	var _DropDownSection2 = _interopRequireDefault(_DropDownSection);
	
	var _LinkList = __webpack_require__(14);
	
	var _LinkList2 = _interopRequireDefault(_LinkList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Footer = _Footer3.default;
	exports.FooterSection = _Section2.default;
	exports.FooterDropDownSection = _DropDownSection2.default;
	exports.FooterLinkList = _LinkList2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(11);
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (children, props) {
	    return _react2.default.Children.map(children, function (child) {
	        var newProps = typeof props === 'function' ? props(child) : props;
	        return _react2.default.cloneElement(child, newProps);
	    });
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(11);
	
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(11);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cell = undefined;
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Grid = function Grid(props) {
	    var noSpacing = props.noSpacing;
	    var className = props.className;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['noSpacing', 'className', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-grid', {
	        'mdl-grid--no-spacing': noSpacing
	    }, className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	Grid.propTypes = {
	    className: _react.PropTypes.string,
	    noSpacing: _react.PropTypes.bool
	};
	
	/* eslint-disable react/no-multi-comp */
	var Cell = function Cell(props) {
	    var _classNames;
	
	    var align = props.align;
	    var className = props.className;
	    var children = props.children;
	    var col = props.col;
	    var phone = props.phone;
	    var tablet = props.tablet;
	
	    var otherProps = _objectWithoutProperties(props, ['align', 'className', 'children', 'col', 'phone', 'tablet']);
	
	    var classes = (0, _classnames2.default)('mdl-cell', (_classNames = {}, _defineProperty(_classNames, 'mdl-cell--' + col + '-col', true), _defineProperty(_classNames, 'mdl-cell--' + phone + '-col-phone', typeof phone !== 'undefined'), _defineProperty(_classNames, 'mdl-cell--' + tablet + '-col-tablet', typeof tablet !== 'undefined'), _defineProperty(_classNames, 'mdl-cell--' + align, typeof align !== 'undefined'), _classNames), className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children
	    );
	};
	
	Cell.propTypes = {
	    align: _react.PropTypes.oneOf(['top', 'middle', 'bottom', 'stretch']),
	    className: _react.PropTypes.string,
	    col: _react.PropTypes.number.isRequired,
	    phone: _react.PropTypes.number,
	    tablet: _react.PropTypes.number
	};
	
	exports.default = Grid;
	exports.Cell = Cell;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Spacer = exports.Navigation = exports.HeaderTabs = exports.HeaderRow = exports.Header = exports.Drawer = exports.Content = exports.Layout = undefined;
	
	var _Layout2 = __webpack_require__(17);
	
	var _Layout3 = _interopRequireDefault(_Layout2);
	
	var _Content2 = __webpack_require__(21);
	
	var _Content3 = _interopRequireDefault(_Content2);
	
	var _Drawer2 = __webpack_require__(22);
	
	var _Drawer3 = _interopRequireDefault(_Drawer2);
	
	var _Header2 = __webpack_require__(23);
	
	var _Header3 = _interopRequireDefault(_Header2);
	
	var _HeaderRow2 = __webpack_require__(24);
	
	var _HeaderRow3 = _interopRequireDefault(_HeaderRow2);
	
	var _HeaderTabs2 = __webpack_require__(26);
	
	var _HeaderTabs3 = _interopRequireDefault(_HeaderTabs2);
	
	var _Navigation2 = __webpack_require__(29);
	
	var _Navigation3 = _interopRequireDefault(_Navigation2);
	
	var _Spacer2 = __webpack_require__(25);
	
	var _Spacer3 = _interopRequireDefault(_Spacer2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Layout = _Layout3.default;
	exports.Content = _Content3.default;
	exports.Drawer = _Drawer3.default;
	exports.Header = _Header3.default;
	exports.HeaderRow = _HeaderRow3.default;
	exports.HeaderTabs = _HeaderTabs3.default;
	exports.Navigation = _Navigation3.default;
	exports.Spacer = _Spacer3.default;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Layout = (function (_React$Component) {
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
	                this.props.children
	            );
	        }
	    }]);
	
	    return Layout;
	})(_react2.default.Component);
	
	Layout.propTypes = {
	    className: _react.PropTypes.string,
	    fixedDrawer: _react.PropTypes.bool,
	    fixedHeader: _react.PropTypes.bool,
	    fixedTabs: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Layout);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _MDLComponent = __webpack_require__(19);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (Component) {
	    var render = Component.prototype.render;
	
	    Component.prototype.render = function rendr() {
	        return _react2.default.createElement(
	            _MDLComponent2.default,
	            null,
	            render.call(this)
	        );
	    };
	
	    return Component;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _reactDom = __webpack_require__(20);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MDLComponent = (function (_Component) {
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
	})(_react.Component);
	
	exports.default = MDLComponent;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Content = function Content(props) {
	    var children = props.children;
	    var className = props.className;
	
	    var otherProps = _objectWithoutProperties(props, ['children', 'className']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__content', className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        children,
	        _react2.default.createElement('div', { className: 'react-mdl-header-tabs-hack', id: 'undefined' })
	    );
	};
	
	Content.propTypes = {
	    className: _react.PropTypes.string
	};
	
	exports.default = Content;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _HeaderRow = __webpack_require__(24);
	
	var _HeaderRow2 = _interopRequireDefault(_HeaderRow);
	
	var _HeaderTabs = __webpack_require__(26);
	
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
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'scroll', 'seamed', 'title', 'transparent', 'waterfall', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__header', {
	        'mdl-layout__header--scroll': scroll,
	        'mdl-layout__header--seamed': seamed,
	        'mdl-layout__header--transparent': transparent,
	        'mdl-layout__header--waterfall': waterfall
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
	            { title: title },
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
	    waterfall: _react.PropTypes.bool
	};
	
	exports.default = Header;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Spacer = __webpack_require__(25);
	
	var _Spacer2 = _interopRequireDefault(_Spacer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var HeaderRow = function HeaderRow(props) {
	    var className = props.className;
	    var title = props.title;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['className', 'title', 'children']);
	
	    var classes = (0, _classnames2.default)('mdl-layout__header-row', className);
	
	    return _react2.default.createElement(
	        'div',
	        _extends({ className: classes }, otherProps),
	        title && _react2.default.createElement(
	            'span',
	            { className: 'mdl-layout-title' },
	            title
	        ),
	        _react2.default.createElement(_Spacer2.default, null),
	        children
	    );
	};
	HeaderRow.propTypes = {
	    className: _react.PropTypes.string,
	    title: _react.PropTypes.node
	};
	
	exports.default = HeaderRow;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _basicClassCreator = __webpack_require__(2);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _basicClassCreator2.default)('Spacer', 'mdl-layout-spacer');

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tab = __webpack_require__(27);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabBar = __webpack_require__(28);
	
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
	    children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
	        var prop = props[propName];
	        if (prop.type !== _Tab2.default) {
	            return new Error('`' + componentName + '` only accepts `Tab` as children.');
	        }
	    }),
	    className: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	
	exports.default = HeaderTabs;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tab = (function (_React$Component) {
	    _inherits(Tab, _React$Component);
	
	    function Tab(props) {
	        _classCallCheck(this, Tab);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));
	
	        _this._handleClick = _this._handleClick.bind(_this);
	        return _this;
	    }
	
	    _createClass(Tab, [{
	        key: '_handleClick',
	        value: function _handleClick() {
	            this.props.onTabClick(this.props.tabId);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _classNames;
	
	            var _props = this.props;
	            var active = _props.active;
	            var className = _props.className;
	            var cssPrefix = _props.cssPrefix;
	            var tabId = _props.tabId;
	            var onTabClick = _props.onTabClick;
	            var style = _props.style;
	
	            var otherProps = _objectWithoutProperties(_props, ['active', 'className', 'cssPrefix', 'tabId', 'onTabClick', 'style']);
	
	            var classes = (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, cssPrefix + '__tab', true), _defineProperty(_classNames, 'is-active', active), _classNames), className);
	
	            style.cursor = 'pointer';
	
	            return _react2.default.createElement(
	                'a',
	                _extends({ className: classes, onClick: this._handleClick, style: style }, otherProps),
	                this.props.children
	            );
	        }
	    }]);
	
	    return Tab;
	})(_react2.default.Component);
	
	Tab.propTypes = {
	    active: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    cssPrefix: _react.PropTypes.string,
	    onTabClick: _react.PropTypes.func,
	    style: _react.PropTypes.object,
	    tabId: _react.PropTypes.number
	};
	Tab.defaultProps = {
	    style: {}
	};
	exports.default = Tab;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TabBar = (function (_React$Component) {
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
	                _react2.default.Children.map(this.props.children, function (child, tabId) {
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
	})(_react2.default.Component);
	
	TabBar.propTypes = {
	    activeTab: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    cssPrefix: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func
	};
	TabBar.defaultProps = {
	    activeTab: 0
	};
	exports.default = TabBar;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _cloneChildren = __webpack_require__(11);
	
	var _cloneChildren2 = _interopRequireDefault(_cloneChildren);
	
	var _Spacer = __webpack_require__(25);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuItem = undefined;
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	var _basicClassCreator = __webpack_require__(2);
	
	var _basicClassCreator2 = _interopRequireDefault(_basicClassCreator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = (function (_React$Component) {
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
	                _extends({ className: classes, htmlFor: target }, otherProps),
	                children
	            );
	        }
	    }]);
	
	    return Menu;
	})(_react2.default.Component);
	
	Menu.propTypes = {
	    align: _react.PropTypes.oneOf(['left', 'right']),
	    className: _react.PropTypes.string,
	    ripple: _react.PropTypes.bool,
	    target: _react.PropTypes.string.isRequired,
	    valign: _react.PropTypes.oneOf(['bottom', 'top'])
	};
	Menu.defaultProps = {
	    align: 'left',
	    valign: 'bottom'
	};
	exports.default = (0, _mdlUpgrade2.default)(Menu);
	var MenuItem = exports.MenuItem = (0, _basicClassCreator2.default)('MenuItem', 'mdl-menu__item', 'li');

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tab = exports.TabBar = exports.Tabs = undefined;
	
	var _Tabs2 = __webpack_require__(32);
	
	var _Tabs3 = _interopRequireDefault(_Tabs2);
	
	var _TabBar2 = __webpack_require__(28);
	
	var _TabBar3 = _interopRequireDefault(_TabBar2);
	
	var _Tab2 = __webpack_require__(27);
	
	var _Tab3 = _interopRequireDefault(_Tab2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Tabs = _Tabs3.default;
	exports.TabBar = _TabBar3.default;
	exports.Tab = _Tab3.default;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Tab = __webpack_require__(27);
	
	var _Tab2 = _interopRequireDefault(_Tab);
	
	var _TabBar = __webpack_require__(28);
	
	var _TabBar2 = _interopRequireDefault(_TabBar);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tabs = (function (_React$Component) {
	    _inherits(Tabs, _React$Component);
	
	    function Tabs() {
	        _classCallCheck(this, Tabs);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Tabs).apply(this, arguments));
	    }
	
	    _createClass(Tabs, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var activeTab = _props.activeTab;
	            var className = _props.className;
	            var onChange = _props.onChange;
	            var ripple = _props.ripple;
	            var children = _props.children;
	
	            var otherProps = _objectWithoutProperties(_props, ['activeTab', 'className', 'onChange', 'ripple', 'children']);
	
	            var classes = (0, _classnames2.default)('mdl-tabs mdl-js-tabs', {
	                'mdl-js-ripple-effect': ripple
	            }, className);
	
	            return _react2.default.createElement(
	                'div',
	                _extends({ className: classes }, otherProps),
	                _react2.default.createElement(
	                    _TabBar2.default,
	                    { cssPrefix: 'mdl-tabs', activeTab: activeTab, onChange: onChange },
	                    children
	                ),
	                _react2.default.createElement('div', { className: 'react-mdl-hack', id: 'undefined' })
	            );
	        }
	    }]);
	
	    return Tabs;
	})(_react2.default.Component);
	
	Tabs.propTypes = {
	    activeTab: _react.PropTypes.number,
	    children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
	        var prop = props[propName];
	        if (prop.type !== _Tab2.default) {
	            return new Error('`' + componentName + '` only accepts `Tab` as children.');
	        }
	    }),
	    className: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Tabs);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Badge = (function (_React$Component) {
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
	            var text = _props.text;
	
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
	                className: 'mdl-badge',
	                'data-badge': text
	            });
	        }
	    }]);
	
	    return Badge;
	})(_react2.default.Component);
	
	Badge.propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
	    text: _react.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
	};
	exports.default = Badge;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Button = (function (_React$Component) {
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
	})(_react2.default.Component);
	
	Button.propTypes = {
	    accent: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    colored: _react.PropTypes.bool,
	    component: _react.PropTypes.any,
	    href: _react.PropTypes.string,
	    primary: _react.PropTypes.bool,
	    raised: _react.PropTypes.bool,
	    ripple: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Button);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Checkbox = (function (_React$Component) {
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
	                var fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialCheckbox[fnName]();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var label = _props.label;
	            var ripple = _props.ripple;
	
	            var inputProps = _objectWithoutProperties(_props, ['label', 'ripple']);
	
	            var classes = (0, _classnames2.default)('mdl-checkbox mdl-js-checkbox', {
	                'mdl-js-ripple-effect': ripple
	            });
	
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
	})(_react2.default.Component);
	
	Checkbox.propTypes = {
	    checked: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    label: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Checkbox);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DataTable = (function (_React$Component) {
	    _inherits(DataTable, _React$Component);
	
	    function DataTable() {
	        _classCallCheck(this, DataTable);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).apply(this, arguments));
	    }
	
	    _createClass(DataTable, [{
	        key: '_getCellClass',
	        value: function _getCellClass(column) {
	            return !column.numeric ? 'mdl-data-table__cell--non-numeric' : '';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props = this.props;
	            var className = _props.className;
	            var columns = _props.columns;
	            var data = _props.data;
	            var selectable = _props.selectable;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'columns', 'data', 'selectable']);
	
	            var classes = (0, _classnames2.default)('mdl-data-table mdl-js-data-table', {
	                'mdl-data-table--selectable': selectable
	            }, className);
	
	            return _react2.default.createElement(
	                'table',
	                _extends({ className: classes }, otherProps),
	                _react2.default.createElement(
	                    'thead',
	                    null,
	                    _react2.default.createElement(
	                        'tr',
	                        null,
	                        columns.map(function (column) {
	                            return _react2.default.createElement(
	                                'th',
	                                { key: column.name, className: _this2._getCellClass(column) },
	                                column.label
	                            );
	                        })
	                    )
	                ),
	                _react2.default.createElement(
	                    'tbody',
	                    null,
	                    data.map(function (elt, idx) {
	                        return _react2.default.createElement(
	                            'tr',
	                            { key: elt.key ? elt.key : idx },
	                            columns.map(function (column) {
	                                return _react2.default.createElement(
	                                    'td',
	                                    { key: column.name, className: _this2._getCellClass(column) },
	                                    elt[column.name]
	                                );
	                            })
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	
	    return DataTable;
	})(_react2.default.Component);
	
	DataTable.propTypes = {
	    className: _react.PropTypes.string,
	    columns: _react.PropTypes.arrayOf(_react.PropTypes.shape({
	        label: _react.PropTypes.string,
	        name: _react.PropTypes.string,
	        numeric: _react.PropTypes.bool
	    })).isRequired,
	    data: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
	    selectable: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(DataTable);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(34);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(34);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Icon = __webpack_require__(38);
	
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Icon = __webpack_require__(38);
	
	var _Icon2 = _interopRequireDefault(_Icon);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var IconToggle = (function (_React$Component) {
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
	                var fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialIconToggle[fnName]();
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
	})(_react2.default.Component);
	
	IconToggle.propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    name: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(IconToggle);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProgressBar = (function (_React$Component) {
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
	            var buffer = _props.buffer;
	            var className = _props.className;
	            var indeterminate = _props.indeterminate;
	            var progress = _props.progress;
	
	            var otherProps = _objectWithoutProperties(_props, ['buffer', 'className', 'indeterminate', 'progress']);
	
	            var classes = (0, _classnames2.default)('mdl-progress mdl-js-progress', {
	                'mdl-progress__indeterminate': indeterminate
	            }, className);
	
	            return _react2.default.createElement('div', _extends({ className: classes }, otherProps));
	        }
	    }]);
	
	    return ProgressBar;
	})(_react2.default.Component);
	
	ProgressBar.propTypes = {
	    buffer: _react.PropTypes.number,
	    className: _react.PropTypes.string,
	    indeterminate: _react.PropTypes.bool,
	    progress: _react.PropTypes.number
	};
	exports.default = (0, _mdlUpgrade2.default)(ProgressBar);

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Radio = (function (_React$Component) {
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
	                var fnName = this.props.checked ? 'check' : 'uncheck';
	                (0, _reactDom.findDOMNode)(this).MaterialRadio[fnName]();
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
	})(_react2.default.Component);
	
	Radio.propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    name: _react.PropTypes.string,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool,
	    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired
	};
	exports.default = (0, _mdlUpgrade2.default)(Radio);

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Radio = __webpack_require__(42);
	
	var _Radio2 = _interopRequireDefault(_Radio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var RadioGroup = function RadioGroup(props) {
	    var name = props.name;
	    var value = props.value;
	    var children = props.children;
	    var container = props.container;
	    var childContainer = props.childContainer;
	
	    var otherProps = _objectWithoutProperties(props, ['name', 'value', 'children', 'container', 'childContainer']);
	
	    return _react2.default.createElement(container, otherProps, _react2.default.Children.map(children, function (child) {
	        var clonedChild = _react2.default.cloneElement(child, _extends({
	            checked: child.props.value === value,
	            name: name
	        }, otherProps));
	
	        return childContainer ? _react2.default.createElement(childContainer, {}, clonedChild) : clonedChild;
	    }));
	};
	
	RadioGroup.propTypes = {
	    childContainer: _react.PropTypes.string,
	    children: _react.PropTypes.arrayOf(function (props, propName, componentName) {
	        var prop = props[propName];
	        if (prop.type !== _Radio2.default) {
	            return new Error('`' + componentName + '` only accepts `Radio` as children.');
	        }
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Slider = (function (_React$Component) {
	    _inherits(Slider, _React$Component);
	
	    function Slider() {
	        _classCallCheck(this, Slider);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).apply(this, arguments));
	    }
	
	    _createClass(Slider, [{
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
	})(_react2.default.Component);
	
	Slider.propTypes = {
	    className: _react.PropTypes.string,
	    max: _react.PropTypes.number,
	    min: _react.PropTypes.number,
	    onChange: _react.PropTypes.func,
	    value: _react.PropTypes.number
	};
	exports.default = (0, _mdlUpgrade2.default)(Slider);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Spinner = (function (_React$Component) {
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
	})(_react2.default.Component);
	
	Spinner.propTypes = {
	    className: _react.PropTypes.string,
	    singleColor: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Spinner);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Switch = (function (_React$Component) {
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
	                var fnName = this.props.checked ? 'on' : 'off';
	                (0, _reactDom.findDOMNode)(this).MaterialSwitch[fnName]();
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
	})(_react2.default.Component);
	
	Switch.propTypes = {
	    checked: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    onChange: _react.PropTypes.func,
	    ripple: _react.PropTypes.bool
	};
	exports.default = (0, _mdlUpgrade2.default)(Switch);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(20);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _mdlUpgrade = __webpack_require__(18);
	
	var _mdlUpgrade2 = _interopRequireDefault(_mdlUpgrade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Textfield = (function (_React$Component) {
	    _inherits(Textfield, _React$Component);
	
	    function Textfield() {
	        _classCallCheck(this, Textfield);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Textfield).apply(this, arguments));
	    }
	
	    _createClass(Textfield, [{
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
	                // At every re-render, mdl will set 'is-invalid' class according to the 'pattern' props validity
	                // If we want to force the error display, we have to override mdl 'is-invalid' value.
	                var elt = (0, _reactDom.findDOMNode)(this);
	                elt.className = (0, _classnames2.default)(elt.className, 'is-invalid');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var className = _props.className;
	            var inputClassName = _props.inputClassName;
	            var error = _props.error;
	            var expandable = _props.expandable;
	            var expandableIcon = _props.expandableIcon;
	            var floatingLabel = _props.floatingLabel;
	            var label = _props.label;
	            var maxRows = _props.maxRows;
	            var rows = _props.rows;
	            var style = _props.style;
	
	            var otherProps = _objectWithoutProperties(_props, ['className', 'inputClassName', 'error', 'expandable', 'expandableIcon', 'floatingLabel', 'label', 'maxRows', 'rows', 'style']);
	
	            var hasRows = !!rows;
	            var id = 'textfield-' + label.replace(/[^a-z0-9]/gi, '');
	            var inputTag = hasRows || maxRows > 1 ? 'textarea' : 'input';
	
	            var inputProps = _extends({
	                className: (0, _classnames2.default)('mdl-textfield__input', inputClassName),
	                id: id,
	                key: id,
	                rows: rows,
	                ref: 'input'
	            }, otherProps);
	
	            var input = _react2.default.createElement(inputTag, inputProps);
	
	            var inputAndLabelError = [input, _react2.default.createElement(
	                'label',
	                { key: 'label', className: 'mdl-textfield__label', htmlFor: id },
	                label
	            ), error ? _react2.default.createElement(
	                'span',
	                { key: 'error', className: 'mdl-textfield__error' },
	                error
	            ) : null];
	
	            var containerClasses = (0, _classnames2.default)('mdl-textfield mdl-js-textfield', {
	                'mdl-textfield--floating-label': floatingLabel,
	                'mdl-textfield--expandable': expandable
	            }, className);
	
	            var field = expandable ? _react2.default.createElement('div', { className: 'mdl-textfield__expandable-holder' }, inputAndLabelError) : inputAndLabelError;
	
	            return _react2.default.createElement(
	                'div',
	                { className: containerClasses, style: style },
	                expandable ? _react2.default.createElement(
	                    'label',
	                    { className: 'mdl-button mdl-js-button mdl-button--icon', htmlFor: id },
	                    _react2.default.createElement(
	                        'i',
	                        { className: 'material-icons' },
	                        expandableIcon
	                    )
	                ) : null,
	                field
	            );
	        }
	    }]);
	
	    return Textfield;
	})(_react2.default.Component);
	
	Textfield.propTypes = {
	    className: _react.PropTypes.string,
	    disabled: _react.PropTypes.bool,
	    error: _react.PropTypes.string,
	    expandable: _react.PropTypes.bool,
	    expandableIcon: _react.PropTypes.string,
	    floatingLabel: _react.PropTypes.bool,
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
	exports.default = (0, _mdlUpgrade2.default)(Textfield);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _MDLComponent = __webpack_require__(19);
	
	var _MDLComponent2 = _interopRequireDefault(_MDLComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var Tooltip = function Tooltip(props) {
	    var label = props.label;
	    var large = props.large;
	    var children = props.children;
	
	    var otherProps = _objectWithoutProperties(props, ['label', 'large', 'children']);
	
	    var id = Math.random().toString(36).substr(2);
	
	    var newLabel = typeof label === 'string' ? _react2.default.createElement(
	        'span',
	        null,
	        label
	    ) : label;
	
	    var element = undefined;
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
	                className: (0, _classnames2.default)('mdl-tooltip', {
	                    'mdl-tooltip--large': large
	                })
	            })
	        )
	    );
	};
	
	Tooltip.propTypes = {
	    children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]).isRequired,
	    label: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]).isRequired,
	    large: _react.PropTypes.bool
	};
	
	exports.default = Tooltip;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ReactMDL.js.map