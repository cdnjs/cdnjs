/*! Amaze UI React v1.2.2 | by Amaze UI Team | (c) 2016 AllMobilize, Inc. | Licensed under MIT | 2016-08-02T11:34:37+0800 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["AMUIReact"] = factory(require("react"), require("react-dom"));
	else
		root["AMUIReact"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_22__) {
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

	var React = __webpack_require__(1);

	if (!React) {
	  throw new Error('AMUIReact requires React.');
	}

	module.exports = {
	  VERSION: '1.2.2',

	  // layout
	  Grid: __webpack_require__(2),
	  Col: __webpack_require__(10),
	  Container: __webpack_require__(11),
	  AvgGrid: __webpack_require__(12),

	  // elements
	  Button: __webpack_require__(13),
	  ButtonToolbar: __webpack_require__(14),
	  ButtonCheck: __webpack_require__(15),
	  ButtonGroup: __webpack_require__(17),

	  // form related
	  Form: __webpack_require__(18),
	  FormGroup: __webpack_require__(19),
	  FormFile: __webpack_require__(20),
	  Input: __webpack_require__(21),
	  UCheck: __webpack_require__(24),

	  Image: __webpack_require__(25),
	  Thumbnail: __webpack_require__(26),
	  Thumbnails: __webpack_require__(27),
	  Table: __webpack_require__(28),
	  // Code: require('./Code'),

	  // Navs
	  Nav: __webpack_require__(29),
	  NavItem: __webpack_require__(30),
	  Breadcrumb: __webpack_require__(32),
	  Pagination: __webpack_require__(33),
	  Topbar: __webpack_require__(34),
	  Tabs: __webpack_require__(36),
	  CollapsibleNav: __webpack_require__(37),

	  Article: __webpack_require__(41),
	  Badge: __webpack_require__(42),
	  Close: __webpack_require__(43),
	  Icon: __webpack_require__(23),
	  List: __webpack_require__(44),
	  ListItem: __webpack_require__(45),
	  Panel: __webpack_require__(46),
	  PanelGroup: __webpack_require__(47),
	  Progress: __webpack_require__(48),

	  Alert: __webpack_require__(49),
	  // DatePicker: require('./DateTimePicker'),
	  // TimePicker: require('./DateTimePicker'),
	  DateTimeInput: __webpack_require__(50).DateTimeInput,
	  DateTimePicker: __webpack_require__(50).DateTimePicker,
	  Dropdown: __webpack_require__(59),
	  Modal: __webpack_require__(60),
	  ModalTrigger: __webpack_require__(64),
	  Popover: __webpack_require__(66),
	  PopoverTrigger: __webpack_require__(67),
	  NProgress: __webpack_require__(68),
	  ScrollSpy: __webpack_require__(69),
	  ScrollSpyNav: __webpack_require__(73),
	  Selected: __webpack_require__(75),
	  Slider: __webpack_require__(76),
	  Sticky: __webpack_require__(77),

	  // widgets
	  Accordion: __webpack_require__(78),
	  Divider: __webpack_require__(79),
	  Footer: __webpack_require__(80),
	  Gallery: __webpack_require__(81),
	  GoTop: __webpack_require__(82),
	  Header: __webpack_require__(83),
	  ListNews: __webpack_require__(84),
	  Menu: __webpack_require__(85),
	  Navbar: __webpack_require__(86),
	  Titlebar: __webpack_require__(87),

	  // mixins
	  mixins: __webpack_require__(88)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Grid = React.createClass({
	  displayName: 'Grid',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    component: React.PropTypes.node.isRequired,
	    collapse: React.PropTypes.bool,
	    fixed: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'g',
	      component: 'div'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classSet = this.getClassSet();
	    var props = this.props;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // .am-g-fixed
	    classSet[this.prefixClass('fixed')] = props.fixed;

	    // .am-g-collapse
	    classSet[this.prefixClass('collapse')] = props.collapse;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Grid;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.omit <https://github.com/jonschlinkert/object.omit>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(5);
	var forOwn = __webpack_require__(6);

	module.exports = function omit(obj, keys) {
	  if (!isObject(obj)) return {};

	  var keys = [].concat.apply([], [].slice.call(arguments, 1));
	  var last = keys[keys.length - 1];
	  var res = {}, fn;

	  if (typeof last === 'function') {
	    fn = keys.pop();
	  }

	  var isFunction = typeof fn === 'function';
	  if (!keys.length && !isFunction) {
	    return obj;
	  }

	  forOwn(obj, function (value, key) {
	    if (keys.indexOf(key) === -1) {

	      if (!isFunction) {
	        res[key] = value;
	      } else if (fn(value, key, obj)) {
	        res[key] = value;
	      }
	    }
	  });
	  return res;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*!
	 * is-extendable <https://github.com/jonschlinkert/is-extendable>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function isExtendable(val) {
	  return typeof val !== 'undefined' && val !== null
	    && (typeof val === 'object' || typeof val === 'function');
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * for-own <https://github.com/jonschlinkert/for-own>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var forIn = __webpack_require__(7);
	var hasOwn = Object.prototype.hasOwnProperty;

	module.exports = function forOwn(o, fn, thisArg) {
	  forIn(o, function(val, key) {
	    if (hasOwn.call(o, key)) {
	      return fn.call(thisArg, o[key], key, o);
	    }
	  });
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*!
	 * for-in <https://github.com/jonschlinkert/for-in>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function forIn(o, fn, thisArg) {
	  for (var key in o) {
	    if (fn.call(thisArg, o[key], key, o) === false) {
	      break;
	    }
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var constants = __webpack_require__(9);
	var nsPrefix = constants.NAMESPACE ? constants.NAMESPACE + '-' : '';

	module.exports = {
	  getClassSet: function getClassSet(ignorePrefix) {
	    var classNames = {};
	    // uses `.am-` as prefix if `classPrefix` is not defined
	    var prefix = nsPrefix;

	    if (this.props.classPrefix) {
	      var classPrefix = this.setClassNamespace();

	      prefix = classPrefix + '-';

	      // don't return prefix if flag set
	      !ignorePrefix && (classNames[classPrefix] = true);
	    }

	    var amSize = this.props.amSize;
	    var amStyle = this.props.amStyle;

	    if (amSize) {
	      classNames[prefix + amSize] = true;
	    }

	    if (amStyle) {
	      classNames[prefix + amStyle] = true;
	    }

	    // add theme className for widgets
	    if (this.props.theme) {
	      classNames[prefix + this.props.theme] = true;
	    }

	    // states
	    classNames[constants.CLASSES.active] = this.props.active;
	    classNames[constants.CLASSES.disabled] = this.props.disabled;

	    // shape
	    classNames[constants.CLASSES.radius] = this.props.radius;
	    classNames[constants.CLASSES.round] = this.props.round;

	    // clearfix
	    classNames[constants.CLASSES.cf] = this.props.cf;

	    // am-divider
	    if (this.props.classPrefix !== 'divider') {
	      classNames[constants.CLASSES.divider] = this.props.divider;
	    }

	    return classNames;
	  },

	  // add namespace to classPrefix
	  setClassNamespace: function setClassNamespace(classPrefix) {
	    var prefix = classPrefix || this.props.classPrefix || '';

	    return nsPrefix + prefix;
	  },

	  prefixClass: function prefixClass(subClass) {
	    return this.setClassNamespace() + '-' + subClass;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var NAMESPACE = 'am';
	var setNamespace = function setNamespace(className) {
	  return (NAMESPACE ? NAMESPACE + '-' : '') + className;
	};

	module.exports = {
	  NAMESPACE: NAMESPACE,

	  CLASSES: {
	    active: setNamespace('active'),
	    disabled: setNamespace('disabled'),
	    round: setNamespace('round'),
	    radius: setNamespace('radius'),
	    square: setNamespace('square'),
	    circle: setNamespace('circle'),
	    divider: setNamespace('divider'),
	    cf: setNamespace('cf'),
	    fl: setNamespace('fl'),
	    fr: setNamespace('fr')
	  },

	  STYLES: {
	    default: 'default',
	    primary: 'primary',
	    secondary: 'secondary',
	    success: 'success',
	    warning: 'warning',
	    danger: 'danger'
	  },

	  SIZES: {}
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Col = React.createClass({
	  displayName: 'Col',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    sm: React.PropTypes.number,
	    md: React.PropTypes.number,
	    lg: React.PropTypes.number,
	    smOffset: React.PropTypes.number,
	    mdOffset: React.PropTypes.number,
	    lgOffset: React.PropTypes.number,
	    smPush: React.PropTypes.number,
	    mdPush: React.PropTypes.number,
	    lgPush: React.PropTypes.number,
	    smPull: React.PropTypes.number,
	    mdPull: React.PropTypes.number,
	    lgPull: React.PropTypes.number,
	    classPrefix: React.PropTypes.string.isRequired,
	    component: React.PropTypes.node.isRequired,
	    end: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'u',
	      component: 'div'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classSet = {};
	    var props = this.props;
	    var prefixClass = this.prefixClass;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    ['sm', 'md', 'lg'].forEach(function (size) {
	      var prop = size;

	      if (props[size]) {
	        classSet[prefixClass(size + '-' + props[prop])] = true;
	      }

	      prop = size + 'Offset';
	      if (props[prop] >= 0) {
	        classSet[prefixClass(size + '-offset-') + props[prop]] = true;
	      }
	      restProps = omit(restProps, prop);

	      prop = size + 'Push';
	      if (props[prop] >= 0) {
	        classSet[prefixClass(size + '-push-') + props[prop]] = true;
	      }
	      restProps = omit(restProps, prop);

	      prop = size + 'Pull';
	      if (props[prop] >= 0) {
	        classSet[prefixClass(size + '-pull-') + props[prop]] = true;
	      }
	      restProps = omit(restProps, prop);

	      // `xxResetOrder` prop
	      // - smResetOrder
	      // - mdResetOrder
	      // - lgResetOrder
	      if (props[size + 'ResetOrder']) {
	        classSet[prefixClass(size + '-reset-order')] = true;
	      }
	      restProps = omit(restProps, size + 'ResetOrder');

	      // `xxCentered` prop
	      // - smCentered
	      // - mdCentered
	      // - lgCentered
	      if (props[size + 'Centered']) {
	        classSet[prefixClass(size + '-centered')] = true;
	      }
	      restProps = omit(restProps, size + 'Centered');

	      // `xxUnCentered` prop
	      // - smUnCentered
	      // - mdUnCentered
	      // - lgUnCentered
	      if (props[size + 'UnCentered']) {
	        classSet[prefixClass(size + '-uncentered')] = true;
	      }
	      restProps = omit(restProps, size + 'UnCentered');
	    });

	    // `end` prop - end column
	    classSet[prefixClass('end')] = props.end;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Col;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Container = React.createClass({
	  displayName: 'Container',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    component: React.PropTypes.node.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'container',
	      component: 'div'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Container;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var AvgGrid = React.createClass({
	  displayName: 'AvgGrid',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    component: React.PropTypes.node,
	    sm: React.PropTypes.number,
	    md: React.PropTypes.number,
	    lg: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'avg',
	      component: 'ul'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classSet = {};
	    var prefixClass = this.prefixClass;
	    var props = this.props;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    ['sm', 'md', 'lg'].forEach(function (size) {
	      if (props[size]) {
	        classSet[prefixClass(size + '-' + props[size])] = true;
	      }
	    });

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = AvgGrid;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var omit = __webpack_require__(4);

	var Button = React.createClass({
	  displayName: 'Button',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    active: React.PropTypes.bool,
	    block: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    radius: React.PropTypes.bool,
	    round: React.PropTypes.bool,
	    component: React.PropTypes.node,
	    href: React.PropTypes.string,
	    target: React.PropTypes.string,
	    type: React.PropTypes.string,
	    amSize: React.PropTypes.string,
	    amStyle: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'btn',
	      type: 'button',
	      amStyle: 'default'
	    };
	  },

	  removeUnknownProps: function removeUnknownProps() {
	    return omit(this.props, ['classPrefix', 'active', 'block', 'radius', 'round', 'component', 'amSize', 'amStyle']);
	  },


	  renderAnchor: function renderAnchor(classSet) {
	    var Component = this.props.component || 'a';
	    var href = this.props.href || '#';
	    var restProps = this.removeUnknownProps();

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        href: href,
	        target: this.props.target,
	        className: classNames(this.props.className, classSet),
	        role: 'button'
	      }),
	      this.props.children
	    );
	  },

	  renderButton: function renderButton(classSet) {
	    var Component = this.props.component || 'button';
	    var restProps = this.removeUnknownProps();

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var renderType = this.props.href || this.props.target ? 'renderAnchor' : 'renderButton';

	    // block button
	    classSet[this.prefixClass('block')] = this.props.block;

	    return this[renderType](classSet);
	  }
	});

	module.exports = Button;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var ButtonToolbar = React.createClass({
	  displayName: 'ButtonToolbar',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'btn-toolbar'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = ButtonToolbar;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var omit = __webpack_require__(4);
	var CSSCore = __webpack_require__(16);
	var ClassNameMixin = __webpack_require__(8);
	var ButtonGroup = __webpack_require__(17);
	var constants = __webpack_require__(9);

	var ButtonCheck = React.createClass({
	  displayName: 'ButtonCheck',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    clickHandler: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      clickHandler: function clickHandler() {}
	    };
	  },

	  handleClick: function handleClick(e) {
	    var changed = true;
	    var target = e.target;
	    var activeClassName = constants.CLASSES.active;

	    if (target && target.nodeName === 'INPUT') {
	      var parent = target.parentNode;

	      if (target.type === 'radio') {
	        if (target.checked && CSSCore.hasClass(parent, activeClassName)) {
	          changed = false;
	        } else {
	          var siblings = parent.parentNode.children;

	          // remove siblings activeClassName
	          for (var i = 0; i < siblings.length; i++) {
	            siblings[i] !== parent && CSSCore.removeClass(siblings[i], activeClassName);
	          }
	        }
	      }

	      if (changed) {
	        CSSCore.toggleClass(parent, activeClassName);
	      }
	    }

	    this.props.clickHandler.call(this);
	  },

	  render: function render() {
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      ButtonGroup,
	      _extends({}, restProps, {
	        onClick: this.handleClick,
	        className: this.setClassNamespace('btn-group-check')
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = ButtonCheck;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @via https://github.com/facebook/react/blob/master/src/vendor/core/CSSCore.js
	 */

	'use strict';

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function addClass(element, className) {
	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },

	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function removeClass(element, className) {
	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	        .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },

	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function conditionClass(element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function hasClass(element, className) {
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  },

	  toggleClass: function toggleClass(element, className) {
	    return CSSCore.hasClass(element, className) ? CSSCore.removeClass(element, className) : CSSCore.addClass(element, className);
	  }
	};

	module.exports = CSSCore;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var ButtonGroup = React.createClass({
	  displayName: 'ButtonGroup',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    stacked: React.PropTypes.bool,
	    justify: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'btn-group'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass('stacked')] = this.props.stacked;
	    classSet[this.prefixClass('justify')] = this.props.justify;

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = ButtonGroup;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Form = React.createClass({
	  displayName: 'Form',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    horizontal: React.PropTypes.bool,
	    inline: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'form'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass('horizontal')] = this.props.horizontal;
	    classSet[this.prefixClass('inline')] = this.props.inline;

	    return React.createElement(
	      'form',
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Form;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);

	var FormGroup = React.createClass({
	  displayName: 'FormGroup',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    validation: React.PropTypes.string,
	    amSize: React.PropTypes.oneOf(['sm', 'lg']),
	    hasFeedback: React.PropTypes.bool
	  },

	  render: function render() {
	    var classSet = {};

	    classSet[this.setClassNamespace('form-group')] = true;
	    this.props.validation && (classSet[this.setClassNamespace('form-' + this.props.validation)] = true);
	    classSet[this.setClassNamespace('form-feedback')] = this.props.hasFeedback;
	    classSet[this.setClassNamespace('form-icon')] = this.props.hasFeedback;

	    if (this.props.amSize) {
	      classSet[this.setClassNamespace('form-group-' + this.props.amSize)] = true;
	    }

	    return React.createElement(
	      'div',
	      { className: classNames(classSet, this.props.className) },
	      this.props.children
	    );
	  }
	});

	module.exports = FormGroup;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var Button = __webpack_require__(13);
	var Input = __webpack_require__(21);

	var FormFile = React.createClass({
	  displayName: 'FormFile',

	  mixins: [ClassNameMixin],

	  propTypes: {},

	  getDefaultProps: function getDefaultProps() {
	    return {};
	  },

	  render: function render() {
	    return React.createElement(
	      FormGroup,
	      {
	        className: this.setClassNamespace('form-file')
	      },
	      React.createElement(Input, { type: 'file', standalone: true })
	    );
	  }
	});

	module.exports = FormFile;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Inputs Components
	 * @desc includes input, input-group
	 */

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var FormGroup = __webpack_require__(19);
	var Button = __webpack_require__(13);
	var Icon = __webpack_require__(23);
	var constants = __webpack_require__(9);

	var Input = React.createClass({
	  displayName: 'Input',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    type: React.PropTypes.string,
	    disabled: React.PropTypes.bool,
	    radius: React.PropTypes.bool,
	    round: React.PropTypes.bool,
	    amSize: React.PropTypes.oneOf(['sm', 'lg']),
	    amStyle: React.PropTypes.string,
	    validation: React.PropTypes.oneOf(['success', 'warning', 'error']),
	    label: React.PropTypes.node,
	    help: React.PropTypes.node,
	    addonBefore: React.PropTypes.node,
	    addonAfter: React.PropTypes.node,
	    btnBefore: React.PropTypes.node,
	    btnAfter: React.PropTypes.node,
	    id: React.PropTypes.string,
	    groupClassName: React.PropTypes.string,
	    wrapperClassName: React.PropTypes.string,
	    labelClassName: React.PropTypes.string,
	    helpClassName: React.PropTypes.string,
	    icon: React.PropTypes.string,
	    standalone: React.PropTypes.bool,
	    inline: React.PropTypes.bool,
	    hasFeedback: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      type: 'text'
	    };
	  },

	  getFieldDOMNode: function getFieldDOMNode() {
	    return ReactDOM.findDOMNode(this.refs.field);
	  },

	  getValue: function getValue() {
	    if (this.props.type === 'select' && this.props.multiple) {
	      return this.getSelectedOptions();
	    } else {
	      return this.getFieldDOMNode().value;
	    }
	  },

	  getChecked: function getChecked() {
	    return this.getFieldDOMNode().checked;
	  },

	  getSelectedOptions: function getSelectedOptions() {
	    var values = [];
	    var options = this.getFieldDOMNode().getElementsByTagName('option');

	    options.forEach(function (option) {
	      if (option.selected) {
	        var value = option.getAttribute('value') || option.innerHtml;

	        values.push(value);
	      }
	    });

	    return values;
	  },

	  isCheckboxOrRadio: function isCheckboxOrRadio() {
	    return this.props.type === 'radio' || this.props.type === 'checkbox';
	  },

	  isFile: function isFile() {
	    return this.props.type === 'file';
	  },

	  renderInput: function renderInput() {
	    var input = null;
	    var fieldClassName = this.isCheckboxOrRadio() || this.isFile() ? '' : this.setClassNamespace('form-field');
	    var classSet = {};

	    classSet[constants.CLASSES.round] = this.props.round;
	    classSet[constants.CLASSES.radius] = this.props.radius;

	    if (this.props.amSize && !this.props.standalone) {
	      classSet[this.setClassNamespace('input-' + this.props.amSize)] = true;
	    }

	    var classes = classNames(this.props.className, fieldClassName, classSet);
	    var props = omit(this.props, ['radius', 'round', 'amSize', 'amStyle', 'validation', 'label', 'help', 'addonBefore', 'addonAfter', 'btnBefore', 'btnAfter', 'groupClassName', 'wrapperClassName', 'labelClassName', 'helpClassName', 'icon', 'standalone', 'inline', 'hasFeedback']);

	    switch (this.props.type) {
	      case 'select':
	        input = React.createElement(
	          'select',
	          _extends({}, props, {
	            className: classes,
	            ref: 'field',
	            key: 'field'
	          }),
	          this.props.children
	        );
	        break;
	      case 'textarea':
	        input = React.createElement('textarea', _extends({}, props, {
	          className: classes,
	          ref: 'field',
	          key: 'field'
	        }));
	        break;
	      case 'submit':
	      case 'reset':
	        input = React.createElement(Button, _extends({}, props, {
	          component: 'input',
	          ref: 'field',
	          key: 'field'
	        }));
	        break;
	      default:
	        input = React.createElement('input', _extends({}, props, {
	          className: classes,
	          ref: 'field',
	          key: 'field'
	        }));
	    }

	    return input;
	  },

	  // Input wrapper if wrapperClassName set
	  renderWrapper: function renderWrapper(children) {
	    return this.props.wrapperClassName ? React.createElement(
	      'div',
	      {
	        className: this.props.wrapperClassName,
	        key: 'wrapper'
	      },
	      children
	    ) : children;
	  },

	  // Wrap block checkbox/radio
	  renderCheckboxAndRadioWrapper: function renderCheckboxAndRadioWrapper(children) {
	    // Don't wrap inline checkbox/radio
	    return this.props.inline ? children : React.createElement(
	      'div',
	      {
	        className: this.setClassNamespace(this.props.type),
	        key: 'checkboxAndRadioWrapper'
	      },
	      children
	    );
	  },

	  renderLabel: function renderLabel(children) {
	    // label doesn't work with icon
	    /*if (this.props.icon) {
	      return null;
	    }*/

	    var classSet = {};

	    if (this.isCheckboxOrRadio()) {
	      // inline checkbox and radio
	      classSet[this.setClassNamespace(this.props.type + '-inline')] = this.props.inline;
	    } else {
	      // normal form label
	      classSet[this.setClassNamespace('form-label')] = true;
	    }

	    return this.props.label ? React.createElement(
	      'label',
	      {
	        htmlFor: this.props.id,
	        className: classNames(this.props.labelClassName, classSet),
	        key: 'label'
	      },
	      children,
	      this.props.label
	    ) : children;
	  },

	  renderInputGroup: function renderInputGroup(children) {
	    var groupPrefix = this.setClassNamespace('input-group');
	    var addonClassName = groupPrefix + '-label';
	    var btnClassName = groupPrefix + '-btn';
	    var addonBefore = this.props.addonBefore ? React.createElement(
	      'span',
	      { className: addonClassName, key: 'addonBefore' },
	      this.props.addonBefore
	    ) : null;
	    var addonAfter = this.props.addonAfter ? React.createElement(
	      'span',
	      { className: addonClassName, key: 'addonAfter' },
	      this.props.addonAfter
	    ) : null;
	    var btnBefore = this.props.btnBefore ? React.createElement(
	      'span',
	      { className: btnClassName, key: 'btnBefore' },
	      this.props.btnBefore
	    ) : null;
	    var btnAfter = this.props.btnAfter ? React.createElement(
	      'span',
	      { className: btnClassName, key: 'btnAfter' },
	      this.props.btnAfter
	    ) : null;
	    var classSet = {};

	    if (this.props.amSize) {
	      classSet[groupPrefix + '-' + this.props.amSize] = true;
	    }

	    if (this.props.amStyle) {
	      classSet[groupPrefix + '-' + this.props.amStyle] = true;
	    }

	    return addonBefore || addonAfter || btnBefore || btnAfter ? React.createElement(
	      'div',
	      {
	        className: classNames(groupPrefix, classSet),
	        key: 'inputGroup'
	      },
	      addonBefore,
	      btnBefore,
	      children,
	      addonAfter,
	      btnAfter
	    ) : children;
	  },

	  // form help
	  renderHelp: function renderHelp() {
	    return this.props.help ? React.createElement(
	      'p',
	      {
	        className: classNames(this.setClassNamespace('form-help'), this.props.helpClassName),
	        key: 'help'
	      },
	      this.props.help
	    ) : '';
	  },

	  renderIcon: function renderIcon() {
	    var props = this.props;
	    var feedbackIcon = {
	      success: 'check',
	      warning: 'warning',
	      error: 'times'
	    };
	    var icon = props.icon || props.hasFeedback && props.validation && feedbackIcon[props.validation];

	    return icon ? React.createElement(Icon, { icon: icon, key: 'icon' }) : null;
	  },

	  render: function render() {
	    // standalone mode
	    if (this.props.standalone) {
	      return this.renderInput();
	    }

	    // render checkbox and radio, without FormGroup wrapper
	    if (this.isCheckboxOrRadio()) {
	      return this.renderWrapper(this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())));
	    }

	    var groupClassName = classNames(this.props.type === 'select' ? this.setClassNamespace('form-select') : null, this.props.icon && this.setClassNamespace('form-icon'), this.props.groupClassName);

	    return React.createElement(
	      FormGroup,
	      {
	        className: groupClassName,
	        validation: this.props.validation,
	        amSize: this.props.amSize,
	        hasFeedback: this.props.hasFeedback
	      },
	      [this.renderLabel(), this.renderWrapper(this.renderInputGroup(this.renderInput())), this.renderIcon(), this.renderHelp()]
	    );
	  }
	});

	module.exports = Input;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var PropTypes = React.PropTypes;

	var Icon = React.createClass({
	  displayName: 'Icon',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: PropTypes.string,
	    component: PropTypes.node.isRequired,
	    amStyle: PropTypes.string,
	    amSize: PropTypes.string,
	    fw: PropTypes.bool,
	    spin: PropTypes.bool,
	    button: PropTypes.bool,
	    size: PropTypes.string,
	    href: PropTypes.string,
	    icon: PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'icon',
	      component: 'span'
	    };
	  },

	  render: function render() {
	    var classes = this.getClassSet(true);
	    var props = this.props;
	    var Component = props.href ? 'a' : props.component;
	    var prefixClass = this.prefixClass;
	    var setClassNamespace = this.setClassNamespace;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // am-icon-[iconName]
	    classes[prefixClass(props.icon)] = true;

	    // am-icon-btn
	    classes[prefixClass('btn')] = props.button;

	    // button style
	    props.button && props.amStyle && (classes[setClassNamespace(props.amStyle)] = true);

	    // am-icon-fw
	    classes[prefixClass('fw')] = props.fw;

	    // am-icon-spin
	    classes[prefixClass('spin')] = props.spin;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        href: this.props.href,
	        className: classNames(classes, this.props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Icon;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Custom radio/checkbox style
	 */

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Input = __webpack_require__(21);
	var Icon = __webpack_require__(23);
	var constants = __webpack_require__(9);

	var UCheck = React.createClass({
	  displayName: 'UCheck',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    type: React.PropTypes.oneOf(['radio', 'checkbox']),
	    disabled: React.PropTypes.bool,
	    amStyle: React.PropTypes.oneOf(['secondary', 'success', 'warning', 'danger']),
	    inline: React.PropTypes.bool,
	    hasFeedback: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      type: 'checkbox'
	    };
	  },

	  render: function render() {
	    var classSet = {};
	    var restProps = omit(this.props, ['inline', 'amStyle', 'hasFeedback']);

	    classSet[this.setClassNamespace(this.props.type)] = !this.props.inline;
	    classSet[this.setClassNamespace(this.props.type + '-inline')] = this.props.inline;

	    if (this.props.amStyle) {
	      classSet[this.setClassNamespace(this.props.amStyle)] = true;
	    }

	    return React.createElement(
	      'label',
	      { className: classNames(this.props.className, classSet) },
	      React.createElement(Input, _extends({}, restProps, {
	        ref: 'field',
	        className: this.setClassNamespace('ucheck-checkbox'),
	        standalone: true
	      })),
	      React.createElement(
	        'span',
	        { className: this.setClassNamespace('ucheck-icons') },
	        React.createElement(Icon, { icon: 'unchecked' }),
	        React.createElement(Icon, { icon: 'checked' })
	      ),
	      this.props.label
	    );
	  }
	});

	module.exports = UCheck;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var constants = __webpack_require__(9);
	var PropTypes = React.PropTypes;

	var Image = React.createClass({
	  displayName: 'Image',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    src: PropTypes.string.isRequired,
	    circle: PropTypes.bool,
	    radius: PropTypes.bool,
	    round: PropTypes.bool,
	    responsive: PropTypes.bool,
	    thumbnail: PropTypes.bool,
	    placeholder: PropTypes.string,
	    threshold: PropTypes.number,
	    callback: PropTypes.func,
	    asBgImage: PropTypes.bool
	  },

	  render: function render() {
	    var classSet = {};
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[constants.CLASSES.radius] = this.props.radius;
	    classSet[constants.CLASSES.round] = this.props.round;
	    classSet[constants.CLASSES.circle] = this.props.circle;
	    classSet[this.setClassNamespace('img-responsive')] = this.props.responsive;
	    classSet[this.setClassNamespace('img-thumbnail')] = this.props.thumbnail;

	    return React.createElement('img', _extends({
	      src: this.props.src
	    }, restProps, {
	      className: classNames(this.props.className, classSet)
	    }));
	  }
	});

	module.exports = Image;

	/*
	TODO:
	- srcset/sizes 支持
	  - http://caniuse.com/#feat=srcset
	  - http://www.w3.org/html/wg/drafts/html/master/semantics.html#attr-img-srcset
	  - https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/
	- lazyload
	- asBackground ?
	*/
	/*
	 http://odin.s0.no/web/srcset/polyfill.htm
	 https://github.com/borismus/srcset-polyfill
	 https://github.com/JimBobSquarePants/srcset-polyfill
	 http://www.html5rocks.com/en/mobile/high-dpi/
	 http://www.html5rocks.com/en/tutorials/responsive/picture-element/
	 https://ericportis.com/posts/2014/srcset-sizes/

	 gif 占位符
	 http://proger.i-forge.net/The_smallest_transparent_pixel/eBQ
	 http://stackoverflow.com/questions/9126105/blank-image-encoded-as-data-uri
	*/

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var omit = __webpack_require__(4);

	var Thumbnail = React.createClass({
	  displayName: 'Thumbnail',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    standalone: React.PropTypes.bool,
	    caption: React.PropTypes.node,
	    component: React.PropTypes.node
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'thumbnail',
	      component: 'figure'
	    };
	  },

	  renderImg: function renderImg(classes, props) {
	    props = props || {};

	    return props.src ? React.createElement('img', _extends({}, props, {
	      className: classes
	    })) : null;
	  },

	  render: function render() {
	    var classes = classNames(this.getClassSet(), this.props.className);
	    var restProps = omit(this.props, ['classPrefix', 'standalone', 'caption', 'component']);

	    if (this.props.standalone) {
	      return this.renderImg(classes, restProps);
	    }

	    var Component = this.props.href ? 'a' : this.props.component;
	    var imgProps = {
	      alt: this.props.alt,
	      src: this.props.src,
	      width: this.props.width,
	      height: this.props.height
	    };
	    var props = omit(restProps, ['alt', 'src', 'width', 'height']);
	    var caption = this.props.caption;

	    return React.createElement(
	      Component,
	      _extends({}, props, {
	        className: classes
	      }),
	      this.renderImg(null, imgProps),
	      caption || this.props.children ? React.createElement(
	        Thumbnail.Caption,
	        {
	          component: typeof caption === 'string' ? 'figcaption' : 'div'
	        },
	        this.props.caption || this.props.children
	      ) : null
	    );
	  }
	});

	Thumbnail.Caption = React.createClass({
	  displayName: 'Caption',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    component: React.PropTypes.node
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'div'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classes = classNames(this.props.className, this.setClassNamespace('thumbnail-caption'));
	    var restProps = omit(this.props, ['component']);

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classes
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Thumbnail;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var AvgGrid = __webpack_require__(12);
	var omit = __webpack_require__(4);

	var Thumbnails = React.createClass({
	  displayName: 'Thumbnails',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'thumbnails'
	    };
	  },

	  render: function render() {
	    var classes = classNames(this.getClassSet(), this.props.className);
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      AvgGrid,
	      _extends({}, restProps, {
	        className: classes
	      }),
	      React.Children.map(this.props.children, function (child, i) {
	        return React.createElement(
	          'li',
	          { key: i },
	          child
	        );
	      })
	    );
	  }
	});

	module.exports = Thumbnails;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Table = React.createClass({
	  displayName: 'Table',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    bordered: React.PropTypes.bool,
	    compact: React.PropTypes.bool,
	    hover: React.PropTypes.bool,
	    striped: React.PropTypes.bool,
	    radius: React.PropTypes.bool,
	    responsive: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'table'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var responsive = this.props.responsive;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass('bordered')] = this.props.bordered;
	    classSet[this.prefixClass('compact')] = this.props.compact;
	    classSet[this.prefixClass('hover')] = this.props.hover;
	    classSet[this.prefixClass('striped')] = this.props.striped;
	    classSet[this.prefixClass('radius')] = this.props.radius;

	    // add `.am-text-nowrap` to responsive table
	    classSet[this.setClassNamespace('text-nowrap')] = responsive;

	    var table = React.createElement(
	      'table',
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.children
	    );

	    return responsive ? React.createElement(
	      'div',
	      { className: this.setClassNamespace('scrollable-horizontal') },
	      table
	    ) : table;
	  }
	});

	module.exports = Table;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Nav = React.createClass({
	  displayName: 'Nav',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    justify: React.PropTypes.bool,
	    pills: React.PropTypes.bool,
	    tabs: React.PropTypes.bool,
	    topbar: React.PropTypes.bool,
	    component: React.PropTypes.node.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'nav',
	      component: 'ul'
	    };
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var Component = this.props.component;
	    var restProps = omit(this.props, ['classPrefix', 'justify', 'pills', 'tabs', 'topbar', 'component', 'active', 'activeKey', 'activeHref']);

	    // set classes
	    classes[this.prefixClass('pills')] = this.props.pills || this.props.topbar;
	    classes[this.prefixClass('tabs')] = this.props.tabs;
	    classes[this.prefixClass('justify')] = this.props.justify;

	    // topbar class
	    classes[this.setClassNamespace('topbar-nav')] = this.props.topbar;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Nav;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var NavItem = React.createClass({
	  displayName: 'NavItem',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    header: React.PropTypes.bool,
	    divider: React.PropTypes.bool,
	    href: React.PropTypes.any,
	    component: React.PropTypes.any,
	    linkComponent: React.PropTypes.any,
	    linkProps: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'nav',
	      component: 'li'
	    };
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var props = this.props;
	    var Component = props.component;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // del am-nav
	    classes[this.setClassNamespace(props.classPrefix)] = false;

	    // set classes
	    classes[this.prefixClass('header')] = props.header;
	    classes[this.prefixClass('divider')] = props.divider;

	    if (props.href || props.linkComponent) {
	      return this.renderAnchor(classes);
	    }

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, props.className)
	      }),
	      this.props.children
	    );
	  },

	  renderAnchor: function renderAnchor(classes) {
	    var Component = this.props.component;
	    var linkComponent = this.props.linkComponent || 'a';
	    var style = {};
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    this.props.disabled && (style.pointerEvents = 'none');

	    var linkProps = {
	      href: this.props.href,
	      title: this.props.title,
	      target: this.props.target,
	      style: style
	    };

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      React.createElement(linkComponent, assign(linkProps, this.props.linkProps), this.props.children)
	    );
	  }
	});

	module.exports = NavItem;

	// TODO: DropDown Tab 处理

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Breadcrumb = React.createClass({
	  displayName: 'Breadcrumb',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    component: React.PropTypes.node.isRequired,
	    slash: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'breadcrumb',
	      component: 'ul'
	    };
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var Component = this.props.component;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classes[this.prefixClass('slash')] = this.props.slash;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	Breadcrumb.Item = React.createClass({
	  displayName: 'Item',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    active: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    title: React.PropTypes.string,
	    target: React.PropTypes.string,
	    component: React.PropTypes.any,
	    linkComponent: React.PropTypes.any,
	    linkProps: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'li'
	    };
	  },


	  renderAnchor: function renderAnchor(classes) {
	    var Component = this.props.component;
	    var linkComponent = this.props.linkComponent || 'a';
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classes
	      }),
	      React.createElement(linkComponent, assign({
	        href: this.props.href,
	        title: this.props.title,
	        target: this.props.target
	      }, this.props.linkProps), this.props.children)
	    );
	  },

	  render: function render() {
	    var classes = classNames(this.props.className);
	    var Component = this.props.component;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    if (this.props.href || this.props.linkComponent) {
	      return this.renderAnchor(classes);
	    }

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classes
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Breadcrumb;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Pagination = React.createClass({
	  displayName: 'Pagination',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    component: React.PropTypes.node.isRequired,
	    centered: React.PropTypes.bool,
	    right: React.PropTypes.bool,
	    theme: React.PropTypes.oneOf(['default', 'select']),
	    data: React.PropTypes.object,
	    onSelect: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'pagination',
	      component: 'ul'
	    };
	  },

	  renderItem: function renderItem(type) {
	    var data = this.props.data;

	    return data && data[type + 'Title'] && data[type + 'Link'] ? React.createElement(
	      Pagination.Item,
	      {
	        onClick: this.props.onSelect && this.props.onSelect.bind(this, data[type + 'Link']),
	        key: type,
	        href: data[type + 'Link'],
	        className: this.prefixClass(type)
	      },
	      data[type + 'Title']
	    ) : null;
	  },

	  handleChange: function handleChange(e) {
	    if (this.props.onSelect) {
	      var select = ReactDOM.findDOMNode(this.refs.select);

	      this.props.onSelect.call(this, select && select.value, e);
	    }
	  },

	  renderPages: function renderPages() {
	    var data = this.props.data;

	    if (data.pages) {
	      return this.props.theme === 'select' ? React.createElement(
	        'li',
	        { className: this.prefixClass('select') },
	        React.createElement(
	          'select',
	          {
	            onChange: this.handleChange,
	            ref: 'select'
	          },
	          data.pages.map(function (page, i) {
	            return React.createElement(
	              'option',
	              { value: page.link, key: i },
	              page.title,
	              ' / ',
	              data.pages.length
	            );
	          })
	        )
	      ) : data.pages.map(function (page, i) {
	        return React.createElement(
	          Pagination.Item,
	          {
	            key: i,
	            onClick: this.props.onSelect && this.props.onSelect.bind(this, page.link),
	            active: page.active,
	            disabled: page.disabled,
	            href: page.link
	          },
	          page.title
	        );
	      }.bind(this));
	    }
	  },

	  render: function render() {
	    var props = this.props;
	    var Component = props.component;
	    var classSet = this.getClassSet();
	    var notSelect = props.theme !== 'select';
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // .am-pagination-right
	    classSet[this.prefixClass('right')] = props.right;

	    // .am-pagination-centered
	    classSet[this.prefixClass('centered')] = props.centered;

	    return props.data ? React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classSet, props.className)
	      }),
	      notSelect && this.renderItem('first'),
	      this.renderItem('prev'),
	      this.renderPages(),
	      this.renderItem('next'),
	      notSelect && this.renderItem('last')
	    ) : React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classSet, props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	Pagination.Item = React.createClass({
	  displayName: 'Item',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    prev: React.PropTypes.bool,
	    next: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    component: React.PropTypes.any,
	    linkComponent: React.PropTypes.any,
	    linkProps: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'pagination',
	      component: 'li'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component;
	    var classSet = this.getClassSet(true);
	    var props = this.props;
	    var linkComponent = this.props.linkComponent || (this.props.href || this.props.active ? 'a' : null);
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // .am-pagination-prev
	    classSet[this.prefixClass('prev')] = props.prev;

	    // .am-pagination-next
	    classSet[this.prefixClass('next')] = props.next;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className)
	      }),
	      linkComponent ? React.createElement(linkComponent, assign({
	        href: this.props.href || this.props.active && 'javascript: void(0)',
	        title: this.props.title,
	        target: this.props.target,
	        ref: 'anchor'
	      }, this.props.linkProps), this.props.children) : this.props.children
	    );
	  }
	});

	module.exports = Pagination;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var createChainedFunction = __webpack_require__(35);
	var Icon = __webpack_require__(23);
	var Button = __webpack_require__(13);

	var Topbar = React.createClass({
	  displayName: 'Topbar',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    component: React.PropTypes.node,
	    brand: React.PropTypes.node,
	    brandLink: React.PropTypes.string,
	    inverse: React.PropTypes.bool,
	    fixedTop: React.PropTypes.bool,
	    fixedBottom: React.PropTypes.bool,
	    toggleBtn: React.PropTypes.node,
	    toggleNavKey: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    onToggle: React.PropTypes.func,
	    navExpanded: React.PropTypes.bool,
	    defaultNavExpanded: React.PropTypes.bool,
	    fluid: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'topbar',
	      component: 'header'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      navExpanded: this.props.defaultNavExpanded
	    };
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },

	  handleToggle: function handleToggle() {
	    if (this.props.onToggle) {
	      this._isChanging = true;
	      this.props.onToggle();
	      this._isChanging = false;
	    }

	    this.setState({
	      navExpanded: !this.state.navExpanded
	    });
	  },

	  isNavExpanded: function isNavExpanded() {
	    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
	  },

	  renderBrand: function renderBrand() {
	    var brand = this.props.brand;
	    var brandClassName = this.prefixClass('brand');

	    if (React.isValidElement(brand)) {
	      return React.cloneElement(brand, assign({}, brand.props, {
	        className: classNames(brand.props.className, brandClassName),
	        onClick: createChainedFunction(this.handleToggle, brand.props.onClick)
	      }));
	    }

	    return brand ? React.createElement(
	      'h1',
	      { className: brandClassName },
	      this.props.brandLink ? React.createElement(
	        'a',
	        { href: this.props.brandLink },
	        this.props.brand
	      ) : this.props.brand
	    ) : null;
	  },

	  renderToggleButton: function renderToggleButton() {
	    var toggleBtn = this.props.toggleBtn;
	    var toggleBtnClassName = this.prefixClass('toggle');

	    if (React.isValidElement(toggleBtn)) {
	      return React.cloneElement(toggleBtn, assign({}, toggleBtn.props, {
	        className: classNames(toggleBtn.props.className, toggleBtnClassName),
	        onClick: createChainedFunction(this.handleToggle, toggleBtn.props.onClick)
	      }));
	    }

	    return React.createElement(
	      Button,
	      {
	        amSize: 'sm',
	        onClick: this.handleToggle,
	        className: classNames(this.prefixClass('btn'), this.prefixClass('toggle'), this.setClassNamespace('show-sm-only'))
	      },
	      React.createElement(
	        'span',
	        { className: this.setClassNamespace('sr-only') },
	        '导航切换'
	      ),
	      React.createElement(Icon, { icon: 'bars' })
	    );
	  },

	  renderChild: function renderChild(child, i) {
	    return React.cloneElement(child, assign({}, child.props, {
	      topbar: true,
	      collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
	      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
	      key: child.key ? child.key : i,
	      className: classNames(child.props.className, child.props.right ? this.prefixClass('right') : null)
	    }));
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var Component = this.props.component;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // set classes
	    classes[this.prefixClass('inverse')] = this.props.inverse;
	    classes[this.prefixClass('fixed-top')] = this.props.fixedTop;
	    classes[this.prefixClass('fixed-bottom')] = this.props.fixedBottom;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      React.createElement(
	        'div',
	        {
	          className: !this.props.fluid ? this.setClassNamespace('container') : null
	        },
	        this.renderBrand(),
	        this.renderToggleButton(),
	        React.Children.map(this.props.children, this.renderChild)
	      )
	    );
	  }
	});

	module.exports = Topbar;

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * modified version of:
	 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/utils/createChainedFunction.js
	 */

	'use strict';

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} one
	 * @param {function} two
	 * @returns {function|null}
	 */

	function createChainedFunction(one, two) {
	  var hasOne = typeof one === 'function';
	  var hasTwo = typeof two === 'function';

	  if (!hasOne && !hasTwo) {
	    return null;
	  }

	  if (!hasOne) {
	    return two;
	  }

	  if (!hasTwo) {
	    return one;
	  }

	  return function chainedFunction() {
	    one.apply(this, arguments) === false || two.apply(this, arguments);
	  };
	}

	module.exports = createChainedFunction;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Nav = __webpack_require__(29);
	var NavItem = __webpack_require__(30);

	var Tabs = React.createClass({
	  displayName: 'Tabs',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'd2']),
	    onSelect: React.PropTypes.func,
	    animation: React.PropTypes.oneOf(['slide', 'fade']),
	    defaultActiveKey: React.PropTypes.any,
	    justify: React.PropTypes.bool,
	    data: React.PropTypes.array
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'tabs',
	      animation: 'fade'
	    };
	  },

	  getInitialState: function getInitialState() {
	    var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : this.getDefaultActiveKey(this.props.children);

	    return {
	      activeKey: defaultActiveKey,
	      previousActiveKey: null
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
	      this.setState({
	        previousActiveKey: this.props.activeKey
	      });
	    }
	  },

	  getDefaultActiveKey: function getDefaultActiveKey(children) {
	    var defaultActiveKey = null;

	    if (this.props.data) {
	      this.props.data.every(function (item, i) {
	        if (item.active) {
	          defaultActiveKey = i;
	          return false;
	        }

	        return true;
	      });

	      return defaultActiveKey == null ? 0 : defaultActiveKey;
	    }

	    React.Children.forEach(children, function (child) {
	      if (defaultActiveKey == null) {
	        defaultActiveKey = child.props.eventKey;
	      }
	    });

	    return defaultActiveKey;
	  },

	  handleClick: function handleClick(key, disabled, e) {
	    e.preventDefault();
	    var activeKey = this.state.activeKey;

	    if (disabled) {
	      return null;
	    }

	    if (this.props.onSelect) {
	      this.props.onSelect(key);
	    }

	    if (activeKey !== key) {
	      this.setState({
	        activeKey: key,
	        previousActiveKey: activeKey
	      });
	    }
	  },

	  renderNav: function renderNav() {
	    var activeKey = this.state.activeKey;

	    return React.Children.map(this.props.children, function (child, index) {
	      var key = child.props.eventKey || index;
	      var disabled = child.props.disabled;

	      return React.createElement(
	        NavItem,
	        {
	          href: '#',
	          ref: 'ref' + key,
	          key: key,
	          onClick: this.handleClick.bind(this, key, disabled),
	          active: child.props.eventKey === activeKey,
	          disabled: disabled
	        },
	        child.props.title
	      );
	    }.bind(this));
	  },

	  renderTabPanels: function renderTabPanels() {
	    var activeKey = this.state.activeKey;

	    return React.Children.map(this.props.children, function (child, index) {
	      return React.createElement(
	        Tabs.Item,
	        {
	          active: child.props.eventKey === activeKey,
	          key: index
	        },
	        child.props.children
	      );
	    });
	  },

	  // for Amaze UI tabs widget
	  renderData: function renderData() {
	    var activeKey = this.state.activeKey;
	    var navs = [];
	    var panels = [];

	    this.props.data.forEach(function (item, key) {
	      navs.push(React.createElement(
	        NavItem,
	        {
	          href: '#',
	          ref: 'ref' + key,
	          key: key,
	          onClick: this.handleClick.bind(this, key, item.disabled),
	          active: key === activeKey,
	          disabled: item.disabled
	        },
	        item.title
	      ));

	      panels.push(React.createElement(
	        Tabs.Item,
	        {
	          eventKey: key
	          // active={item.active}
	          , active: key === activeKey,
	          key: key },
	        item.content
	      ));
	    }.bind(this));

	    return {
	      navs: navs,
	      panels: panels
	    };
	  },

	  renderWrapper: function renderWrapper(children) {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.theme ? this.props.classPrefix : null,
	        className: classNames(classSet, this.props.className)
	      }),
	      children
	    );
	  },

	  renderNavWrapper: function renderNavWrapper(children) {
	    var TabsNav = this.props.theme ? 'ul' : Nav;
	    var props = {
	      key: "tabsNav",
	      tabs: true,
	      className: classNames(this.prefixClass('nav'), this.setClassNamespace('cf')),
	      justify: this.props.justify
	    };
	    if (TabsNav === 'ul') {
	      delete props.tabs;
	      delete props.justify;
	    }

	    return React.createElement(
	      TabsNav,
	      props,
	      children
	    );
	  },

	  renderBodyWrapper: function renderBodyWrapper(children) {
	    var animationClass = this.prefixClass(this.props.animation);

	    return React.createElement(
	      'div',
	      {
	        key: 'tabsBody',
	        className: classNames(this.prefixClass('bd'), animationClass)
	      },
	      children
	    );
	  },

	  render: function render() {
	    var children = this.props.data ? this.renderData() : {};

	    return this.renderWrapper([this.renderNavWrapper(children.navs || this.renderNav()), this.renderBodyWrapper(children.panels || this.renderTabPanels())]);
	  }
	});

	Tabs.Item = React.createClass({
	  displayName: 'Item',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    title: React.PropTypes.string,
	    disabled: React.PropTypes.bool,
	    eventKey: React.PropTypes.any,
	    active: React.PropTypes.bool
	  },

	  render: function render() {
	    var classSet = {};

	    classSet[this.setClassNamespace('tab-panel')] = true;
	    classSet[this.setClassNamespace('fade')] = true;
	    classSet[this.setClassNamespace('active')] = this.props.active;
	    classSet[this.setClassNamespace('in')] = this.props.active;

	    return React.createElement(
	      'div',
	      { className: classNames(classSet) },
	      this.props.children
	    );
	  }
	});

	module.exports = Tabs;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	* https://github.com/react-bootstrap/react-bootstrap/blob/master/src/CollapsibleNav.js
	* */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var CollapseMixin = __webpack_require__(38);
	var createChainedFunction = __webpack_require__(35);

	var CollapsibleNav = React.createClass({
	  displayName: 'CollapsibleNav',

	  mixins: [ClassNameMixin, CollapseMixin],

	  propTypes: {
	    collapsible: React.PropTypes.bool,
	    onSelect: React.PropTypes.func,
	    activeHref: React.PropTypes.string,
	    activeKey: React.PropTypes.any,
	    expanded: React.PropTypes.bool,
	    eventKey: React.PropTypes.any
	  },

	  handleToggle: function handleToggle() {
	    this.setState({ expanded: !this.state.expanded });
	  },

	  getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
	    var height = 0;
	    var nodes = this.refs;

	    for (var key in nodes) {
	      if (nodes.hasOwnProperty(key)) {
	        var n = ReactDOM.findDOMNode(nodes[key]);
	        var h = n.offsetHeight;
	        var computedStyles = getComputedStyle(n, null);

	        height += h + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
	      }
	    }

	    return height;
	  },

	  getCollapsibleDOMNode: function getCollapsibleDOMNode() {
	    return ReactDOM.findDOMNode(this);
	  },

	  getChildActiveProp: function getChildActiveProp(child) {
	    if (child.props.active) {
	      return true;
	    }

	    if (this.props.activeKey != null) {
	      if (child.props.eventKey === this.props.activeKey) {
	        return true;
	      }
	    }

	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }

	    return child.props.active;
	  },

	  renderChildren: function renderChildren(child, index) {
	    var key = child.key ? child.key : index;

	    return React.cloneElement(child, {
	      activeKey: this.props.activeKey,
	      activeHref: this.props.activeHref,
	      ref: 'nocollapse_' + key,
	      key: key,
	      navItem: true
	    });
	  },

	  renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
	    var key = child.key ? child.key : index;

	    return React.cloneElement(child, {
	      active: this.getChildActiveProp(child),
	      activeKey: this.props.activeKey,
	      activeHref: this.props.activeHref,
	      onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
	      ref: 'collapsible_' + key,
	      key: key
	    });
	  },

	  render: function render() {
	    var collapsible = this.props.collapsible;
	    var classSet = collapsible ? this.getCollapsibleClassSet() : {};

	    classSet[this.setClassNamespace('topbar-collapse')] = this.props.topbar;

	    return React.createElement(
	      'div',
	      {
	        className: classNames(classSet, this.props.className)
	      },
	      React.Children.map(this.props.children, collapsible ? this.renderCollapsibleNavChildren : this.renderChildren)
	    );
	  }
	});

	module.exports = CollapsibleNav;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * modified version of:
	 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/CollapsibleMixin.js
	 */

	'use strict';

	var React = __webpack_require__(1);
	var TransitionEvents = __webpack_require__(39);

	var CollapseMixin = {
	  propTypes: {
	    defaultExpanded: React.PropTypes.bool,
	    expanded: React.PropTypes.bool
	  },

	  getInitialState: function getInitialState() {
	    var defaultExpanded = this.props.defaultExpanded != null ? this.props.defaultExpanded : this.props.expanded != null ? this.props.expanded : false;

	    return {
	      expanded: defaultExpanded,
	      collapsing: false
	    };
	  },

	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	    var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;

	    if (willExpanded === this.isExpanded()) {
	      return;
	    }

	    // if the expanded state is being toggled, ensure node has a dimension value
	    // this is needed for the animation to work and needs to be set before
	    // the collapsing class is applied (after collapsing is applied the in class
	    // is removed and the node's dimension will be wrong)

	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();
	    var value = '0';

	    if (!willExpanded) {
	      // get height
	      value = this.getCollapsibleDimensionValue();
	    }

	    node.style[dimension] = value + 'px';

	    this._afterWillUpdate();
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    // check if expanded is being toggled; if so, set collapsing
	    this._checkToggleCollapsing(prevProps, prevState);

	    // check if collapsing was turned on; if so, start animation
	    this._checkStartAnimation();
	  },

	  // helps enable test stubs
	  _afterWillUpdate: function _afterWillUpdate() {},

	  _checkStartAnimation: function _checkStartAnimation() {
	    if (!this.state.collapsing) {
	      return;
	    }

	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();
	    var value = this.getCollapsibleDimensionValue();

	    // setting the dimension here starts the transition animation
	    var result;

	    if (this.isExpanded()) {
	      result = value + 'px';
	    } else {
	      result = '0px';
	    }
	    node.style[dimension] = result;
	  },

	  _checkToggleCollapsing: function _checkToggleCollapsing(prevProps, prevState) {
	    var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
	    var isExpanded = this.isExpanded();

	    if (wasExpanded !== isExpanded) {
	      if (wasExpanded) {
	        this._handleCollapse();
	      } else {
	        this._handleExpand();
	      }
	    }
	  },

	  _handleExpand: function _handleExpand() {
	    var node = this.getCollapsibleDOMNode();
	    var dimension = this.dimension();

	    var complete = function () {
	      this._removeEndEventListener(node, complete);
	      // remove dimension value - this ensures the collapsible item can grow
	      // in dimension after initial display (such as an image loading)
	      node.style[dimension] = '';
	      this.setState({
	        collapsing: false
	      });
	    }.bind(this);

	    this._addEndEventListener(node, complete);

	    this.setState({
	      collapsing: true
	    });
	  },

	  _handleCollapse: function _handleCollapse() {
	    var node = this.getCollapsibleDOMNode();
	    var _this = this;
	    var complete = function complete() {
	      _this._removeEndEventListener(node, complete);
	      _this.setState({
	        collapsing: false
	      });
	    };

	    this._addEndEventListener(node, complete);

	    this.setState({
	      collapsing: true
	    });
	  },

	  // helps enable test stubs
	  _addEndEventListener: function _addEndEventListener(node, complete) {
	    TransitionEvents.on(node, complete);
	  },

	  // helps enable test stubs
	  _removeEndEventListener: function _removeEndEventListener(node, complete) {
	    TransitionEvents.off(node, complete);
	  },

	  dimension: function dimension() {
	    return typeof this.getCollapsibleDimension === 'function' ? this.getCollapsibleDimension() : 'height';
	  },

	  isExpanded: function isExpanded() {
	    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
	  },

	  getCollapsibleClassSet: function getCollapsibleClassSet(className) {
	    var classSet = {};

	    if (typeof className === 'string') {
	      className.split(' ').forEach(function (subClass) {
	        if (subClass) {
	          classSet[subClass] = true;
	        }
	      });
	    }

	    classSet[this.setClassNamespace('collapsing')] = this.state.collapsing;
	    classSet[this.setClassNamespace('collapse')] = !this.state.collapsing;
	    classSet[this.setClassNamespace('in')] = this.isExpanded() && !this.state.collapsing;

	    return classSet;
	  }
	};

	module.exports = CollapseMixin;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * modified version of:
	 * https://github.com/facebook/react/blob/0.13-stable/src/addons/transitions/ReactTransitionEvents.js
	 * https://github.com/facebook/react/blob/5696ccfcd72189f4fea13d8b0f084a0e3c9b8147/src/renderers/dom/client/utils/getVendorPrefixedEventName.js
	 */

	'use strict';

	var CSSCore = __webpack_require__(16);
	var canUseDOM = __webpack_require__(40);

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];
	var support = {};

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    support[baseEventName] = false;

	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        support[baseEventName] = baseEvents[styleName];
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (canUseDOM) {
	  detectEvents();
	}

	if (support.animationend) {
	  CSSCore.addClass(document.documentElement, 'cssanimations');
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var TransitionEvents = {
	  on: function on(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  off: function off(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  },

	  support: support
	};

	module.exports = TransitionEvents;

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Article = React.createClass({
	  displayName: 'Article',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    title: React.PropTypes.node,
	    meta: React.PropTypes.node,
	    lead: React.PropTypes.node
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'article'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'article',
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className)
	      }),
	      React.createElement(
	        'header',
	        { className: this.prefixClass('hd') },
	        this.props.title ? React.createElement(
	          Article.Child,
	          { role: 'title' },
	          this.props.title
	        ) : null,
	        this.props.meta ? React.createElement(
	          Article.Child,
	          { role: 'meta' },
	          this.props.meta
	        ) : null
	      ),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('bd') },
	        this.props.lead ? React.createElement(
	          Article.Child,
	          { role: 'lead' },
	          this.props.lead
	        ) : null,
	        this.props.children
	      )
	    );
	  }
	});

	Article.Child = React.createClass({
	  displayName: 'Child',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    role: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      role: 'title'
	    };
	  },

	  render: function render() {
	    var role = this.props.role;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
	    var Component;
	    var classes = classNames(this.props.className, this.setClassNamespace('article-' + role));

	    switch (role) {
	      case 'meta':
	      case 'lead':
	        Component = 'p';
	        break;
	      case 'title':
	        Component = 'h1';
	        break;
	      default:
	        Component = 'div';
	    }

	    return role === 'divider' ? React.createElement('hr', _extends({}, restProps, {
	      className: classes
	    })) : React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classes
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Article;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Badge = React.createClass({
	  displayName: 'Badge',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    component: React.PropTypes.node,
	    href: React.PropTypes.string,
	    round: React.PropTypes.bool,
	    radius: React.PropTypes.bool,
	    amStyle: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'badge',
	      component: 'span'
	    };
	  },

	  renderAnchor: function renderAnchor(classSet) {
	    var Component = this.props.component || 'a';
	    var href = this.props.href || '#';
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        href: href,
	        className: classNames(classSet, this.props.className),
	        role: 'badge'
	      }),
	      this.props.children
	    );
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var Component = this.props.component;
	    var renderAnchor = this.props.href;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    if (renderAnchor) {
	      return this.renderAnchor(classSet);
	    }

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className)
	      }),
	      this.props.children
	    );
	  }
	});

	module.exports = Badge;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Icon = __webpack_require__(23);

	var Close = React.createClass({
	  displayName: 'Close',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    component: React.PropTypes.node,
	    spin: React.PropTypes.bool,
	    alt: React.PropTypes.bool,
	    icon: React.PropTypes.bool,
	    type: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'close',
	      type: 'button'
	    };
	  },

	  render: function render() {
	    var Component = this.props.component || 'button';
	    var classSet = this.getClassSet();
	    var props = this.props;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // transfer type
	    if (Component !== 'button') {
	      props.type = undefined;
	    }

	    // className am-close-alt am-close-spin
	    classSet[this.prefixClass('alt')] = this.props.alt;
	    classSet[this.prefixClass('spin')] = this.props.spin;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className),
	        role: 'close'
	      }),
	      this.props.icon ? React.createElement(Icon, { icon: 'times' }) : '×'
	    );
	  }
	});

	module.exports = Close;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var List = React.createClass({
	  displayName: 'List',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    component: React.PropTypes.node.isRequired,
	    border: React.PropTypes.bool,
	    bordered: React.PropTypes.bool,
	    striped: React.PropTypes.bool,
	    static: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'list',
	      component: 'ul'
	    };
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var Component = this.props.component;
	    var props = this.props;
	    var prefixClass = this.prefixClass;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // am-list-border
	    classes[prefixClass('border')] = props.border || props.bordered;

	    // am-list-striped
	    classes[prefixClass('striped')] = props.striped;

	    // am-list-static
	    classes[prefixClass('static')] = props.static;

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, props.className)
	      }),
	      props.children
	    );
	  }
	});

	module.exports = List;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var ListItem = React.createClass({
	  displayName: 'ListItem',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    href: React.PropTypes.string,
	    truncate: React.PropTypes.bool,
	    component: React.PropTypes.any.isRequired,
	    linkComponent: React.PropTypes.any,
	    linkProps: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'li'
	    };
	  },

	  render: function render() {
	    var classes = {};
	    var Component = this.props.component;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // set .am-text-truncate
	    classes['am-text-truncate'] = this.props.truncate;

	    // render Anchor
	    if (this.props.href || this.props.linkComponent) {
	      return this.renderAnchor(classes);
	    }

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      this.props.children
	    );
	  },

	  renderAnchor: function renderAnchor(classes) {
	    var props = this.props;
	    var Component = props.component;
	    var truncate = props.truncate ? 'am-text-truncate' : '';
	    var linkComponent = this.props.linkComponent || 'a';
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      Component,
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      React.createElement(linkComponent, assign({
	        className: truncate,
	        href: this.props.href,
	        title: this.props.title,
	        target: this.props.target
	      }, this.props.linkProps), this.props.children)
	    );
	  }
	});

	module.exports = ListItem;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var CollapseMixin = __webpack_require__(38);

	var Panel = React.createClass({
	  displayName: 'Panel',

	  mixins: [ClassNameMixin, CollapseMixin],

	  propTypes: {
	    collapsible: React.PropTypes.bool,
	    header: React.PropTypes.node,
	    footer: React.PropTypes.node,
	    id: React.PropTypes.string,
	    classPrefix: React.PropTypes.string,
	    amStyle: React.PropTypes.string,
	    onSelect: React.PropTypes.func,
	    eventKey: React.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'panel',
	      amStyle: 'default'
	    };
	  },

	  handleClick: function handleClick(e) {
	    var selected = true;

	    if (this.props.onSelect) {
	      this.props.onSelect(e, this.props.eventKey);
	    } else {
	      e.preventDefault();
	    }

	    if (selected) {
	      this.handleToggle();
	    }
	  },

	  handleToggle: function handleToggle() {
	    this.setState({ expanded: !this.state.expanded });
	  },

	  getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
	    return ReactDOM.findDOMNode(this.refs.panel).scrollHeight;
	  },

	  getCollapsibleDOMNode: function getCollapsibleDOMNode() {
	    if (!this.isMounted() || !this.refs || !this.refs.panel) {
	      return null;
	    }

	    return ReactDOM.findDOMNode(this.refs.panel);
	  },

	  renderHeader: function renderHeader() {
	    if (!this.props.header) {
	      return null;
	    }

	    var header = this.props.header;

	    return React.createElement(
	      'div',
	      { className: this.prefixClass('hd') },
	      this.props.collapsible ? React.createElement(
	        'h4',
	        {
	          'data-am-collapse': true // just for `pointer` style
	          , className: classNames(this.prefixClass('title'), this.isExpanded() ? null : this.setClassNamespace('collapsed')),
	          onClick: this.handleClick
	        },
	        header
	      ) : header
	    );
	  },

	  renderBody: function renderBody() {
	    var bodyClass = this.prefixClass('bd');
	    var bodyChildren = this.props.children;
	    var bodyElements = [];
	    var panelBodyChildren = [];

	    function getProps() {
	      return {
	        key: bodyElements.length
	      };
	    }

	    function addFillChild(child) {
	      bodyElements.push(React.cloneElement(child, getProps()));
	    }

	    function addPanelBody(child) {
	      bodyElements.push(React.createElement(
	        'div',
	        _extends({ className: bodyClass }, getProps, { key: 'panelBody' }),
	        child
	      ));
	    }

	    function maybeRenderPanelBody() {
	      if (panelBodyChildren.length === 0) {
	        return;
	      }

	      addPanelBody(panelBodyChildren);
	      panelBodyChildren = [];
	    }

	    if (Array.isArray(bodyChildren)) {
	      bodyChildren.forEach(function (child) {
	        // props fill and isValidElement
	        if (this.shouldRenderFill(child)) {
	          maybeRenderPanelBody();

	          addFillChild(child);
	        } else {
	          panelBodyChildren.push(child);
	        }
	      }.bind(this));

	      maybeRenderPanelBody();
	    } else {
	      if (this.shouldRenderFill(bodyChildren)) {
	        addFillChild(bodyChildren);
	      } else {
	        addPanelBody(bodyChildren);
	      }
	    }

	    return bodyElements;
	  },

	  renderCollapsibleBody: function renderCollapsibleBody() {
	    var collapseClass = this.prefixClass('collapse');

	    return React.createElement(
	      'div',
	      {
	        className: classNames(this.getCollapsibleClassSet(collapseClass)),
	        id: this.props.id,
	        ref: 'panel'
	      },
	      this.renderBody()
	    );
	  },

	  shouldRenderFill: function shouldRenderFill(child) {
	    return React.isValidElement(child) && child.props.fill;
	  },

	  renderFooter: function renderFooter() {
	    if (!this.props.footer) {
	      return null;
	    }

	    return React.createElement(
	      'div',
	      { className: this.prefixClass('footer') },
	      this.props.footer
	    );
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var collapsible = this.props.collapsible;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        id: collapsible ? null : this.props.id,
	        className: classNames(classes, this.props.className)
	      }),
	      this.renderHeader(),
	      collapsible ? this.renderCollapsibleBody() : this.renderBody(),
	      this.renderFooter()
	    );
	  }
	});

	module.exports = Panel;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var PanelGroup = React.createClass({
	  displayName: 'PanelGroup',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    amStyle: React.PropTypes.string,
	    activeKey: React.PropTypes.any,
	    defaultActiveKey: React.PropTypes.any,
	    onSelect: React.PropTypes.func,
	    accordion: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'panel-group'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      activeKey: this.props.defaultActiveKey
	    };
	  },

	  shouldComponentUpdate: function shouldComponentUpdate() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },

	  handleSelect: function handleSelect(e, key) {
	    e.preventDefault();

	    if (this.props.onSelect) {
	      this._isChanging = true;
	      this.props.onSelect(key);
	      this._isChanging = false;
	    }

	    if (this.state.activeKey === key) {
	      key = null;
	    }

	    this.setState({
	      activeKey: key
	    });
	  },

	  renderPanel: function renderPanel(child, index) {
	    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

	    var props = {
	      amStyle: child.props.amStyle || this.props.amStyle,
	      key: child.key ? child.key : index,
	      ref: child.ref
	    };

	    if (this.props.accordion) {
	      props.collapsible = true;
	      props.expanded = child.props.eventKey === activeKey;
	      props.onSelect = this.handleSelect;
	    }

	    return React.cloneElement(child, props);
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(classes, this.props.className)
	      }),
	      React.Children.map(this.props.children, this.renderPanel)
	    );
	  }
	});

	module.exports = PanelGroup;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Progress = React.createClass({
	  displayName: 'Progress',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    now: React.PropTypes.number,
	    label: React.PropTypes.string,
	    active: React.PropTypes.bool,
	    striped: React.PropTypes.bool,
	    amSize: React.PropTypes.string,
	    amStyle: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'progress'
	    };
	  },

	  renderProgressBar: function renderProgressBar() {
	    var styleSheet = {
	      width: this.props.now + '%'
	    };
	    var classes = {};
	    var prefix = this.prefixClass('bar');
	    var amStyle = this.props.amStyle;

	    // set am-progress-bar
	    classes[prefix] = true;

	    if (amStyle) {
	      classes[prefix + '-' + amStyle] = true;
	    }

	    return React.createElement(
	      'div',
	      {
	        className: classNames(classes),
	        style: styleSheet,
	        role: 'progressbar'
	      },
	      this.props.label
	    );
	  },

	  renderChildBar: function renderChildBar(child, index) {
	    return React.cloneElement(child, {
	      isChild: true,
	      key: child.key ? child.key : index
	    });
	  },

	  render: function render() {
	    var classes = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // set class
	    classes[this.prefixClass('striped')] = this.props.striped;

	    if (this.props.active) {
	      classes[this.prefixClass('striped')] = true;
	    }

	    if (!this.props.children) {
	      if (!this.props.isChild) {
	        return React.createElement(
	          'div',
	          _extends({}, restProps, {
	            className: classNames(classes, this.props.className)
	          }),
	          this.renderProgressBar()
	        );
	      } else {
	        return this.renderProgressBar();
	      }
	    } else {
	      return React.createElement(
	        'div',
	        _extends({}, restProps, {
	          className: classNames(classes, this.props.className)
	        }),
	        React.Children.map(this.props.children, this.renderChildBar)
	      );
	    }
	  }
	});

	module.exports = Progress;

	// Todo: 删除无用 class
	//     : key ref 处理问题

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Alert = React.createClass({
	  displayName: 'Alert',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    amStyle: React.PropTypes.oneOf(['secondary', 'success', 'warning', 'danger']),
	    onClose: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'alert'
	    };
	  },

	  renderCloseBtn: function renderCloseBtn() {
	    return React.createElement(
	      'button',
	      {
	        type: 'button',
	        className: this.setClassNamespace('close'),
	        onClick: this.props.onClose
	      },
	      '×'
	    );
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
	    var isCloseable = !!this.props.onClose;

	    if (this.props.amStyle) {
	      classSet[this.prefixClass(this.props.amStyle)] = true;
	    }

	    classSet[this.prefixClass('closeable')] = isCloseable;

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(this.props.className, classSet)
	      }),
	      isCloseable ? this.renderCloseBtn() : null,
	      this.props.children
	    );
	  }
	});

	module.exports = Alert;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  DateTimeInput: __webpack_require__(51),
	  DateTimePicker: __webpack_require__(55)
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var fecha = __webpack_require__(52);
	var omit = __webpack_require__(4);
	var Events = __webpack_require__(53);
	var isNodeInTree = __webpack_require__(54);
	var Input = __webpack_require__(21);
	var DateTimePicker = __webpack_require__(55);

	var DateTimeInput = React.createClass({
	  displayName: 'DateTimeInput',

	  propTypes: {
	    format: React.PropTypes.string,
	    dateTime: React.PropTypes.string,
	    date: React.PropTypes.string,
	    onSelect: React.PropTypes.func,
	    showTimePicker: React.PropTypes.bool,
	    showDatePicker: React.PropTypes.bool,
	    amStyle: React.PropTypes.oneOf(['success', 'danger', 'warning']),
	    viewMode: React.PropTypes.string,
	    minViewMode: React.PropTypes.string,
	    daysOfWeekDisabled: React.PropTypes.array,
	    locale: React.PropTypes.string,
	    weekStart: React.PropTypes.number,
	    minDate: React.PropTypes.string,
	    maxDate: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateTime: '',
	      format: 'YYYY-MM-DD HH:mm'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.dateTime || fecha.format(new Date(), this.props.format),
	      showPicker: false
	    };
	  },

	  handleOuterClick: function handleOuterClick(event) {
	    var picker = ReactDOM.findDOMNode(this.refs.DateTimePicker);

	    if (!isNodeInTree(event.target, picker)) {
	      this.handleClose();
	    }
	  },

	  bindOuterHandlers: function bindOuterHandlers() {
	    Events.on(document, 'click', this.handleOuterClick);
	  },

	  unbindOuterHandlers: function unbindOuterHandlers() {
	    Events.off(document, 'click', this.handleOuterClick);
	  },

	  handleClose: function handleClose() {
	    this.unbindOuterHandlers();
	    return this.setState({
	      showPicker: false
	    });
	  },

	  handleClick: function handleClick() {
	    this.bindOuterHandlers();

	    var positionNode = ReactDOM.findDOMNode(this.refs.dateInput);
	    // fixes #57
	    // @see http://stackoverflow.com/questions/1044988/getting-offsettop-of-element-in-a-table
	    var rect = positionNode.getBoundingClientRect();
	    var offset = {
	      top: rect.top + positionNode.offsetHeight,
	      left: rect.left
	    };

	    var styles = {
	      display: 'block',
	      top: offset.top,
	      left: offset.left,
	      position: 'fixed',
	      zIndex: 1120
	    };

	    this.setState({
	      showPicker: true,
	      pickerStyle: styles
	    });
	  },

	  handleChange: function handleChange(event) {
	    this.setState({
	      value: event.target.value
	    });
	  },

	  handleSelect: function handleSelect(date) {
	    this.setState({
	      value: date
	    });

	    this.props.onSelect && this.props.onSelect.call(this, date);
	  },

	  renderPicker: function renderPicker() {
	    if (this.state.showPicker) {
	      return React.createElement(DateTimePicker, {
	        style: this.state.pickerStyle,
	        ref: 'DateTimePicker',
	        showDatePicker: this.props.showDatePicker,
	        showTimePicker: this.props.showTimePicker,
	        onSelect: this.handleSelect,
	        onClose: this.handleClose,
	        amStyle: this.props.amStyle,
	        dateTime: this.state.value,
	        viewMode: this.props.viewMode,
	        minViewMode: this.props.minViewMode,
	        daysOfWeekDisabled: this.props.daysOfWeekDisabled,
	        weekStart: this.props.weekStart,
	        format: this.props.format,
	        locale: this.props.locale,
	        maxDate: this.props.maxDate,
	        minDate: this.props.minDate
	      });
	    }
	  },

	  render: function render() {
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Input, _extends({}, restProps, {
	        type: 'text',
	        value: this.state.value,
	        onClick: this.handleClick,
	        onChange: this.handleChange,
	        onSelect: null,
	        ref: 'dateInput'
	      })),
	      this.renderPicker()
	    );
	  }
	});

	module.exports = DateTimeInput;

	// TODO: 动画

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function (main) {
	  'use strict';

	  /**
	   * Parse or format dates
	   * @class fecha
	   */
	  var fecha = {};
	  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
	  var twoDigits = /\d\d?/;
	  var threeDigits = /\d{3}/;
	  var fourDigits = /\d{4}/;
	  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
	  var noop = function () {
	  };

	  function shorten(arr, sLen) {
	    var newArr = [];
	    for (var i = 0, len = arr.length; i < len; i++) {
	      newArr.push(arr[i].substr(0, sLen));
	    }
	    return newArr;
	  }

	  function monthUpdate(arrName) {
	    return function (d, v, i18n) {
	      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
	      if (~index) {
	        d.month = index;
	      }
	    };
	  }

	  function pad(val, len) {
	    val = String(val);
	    len = len || 2;
	    while (val.length < len) {
	      val = '0' + val;
	    }
	    return val;
	  }

	  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	  var monthNamesShort = shorten(monthNames, 3);
	  var dayNamesShort = shorten(dayNames, 3);
	  fecha.i18n = {
	    dayNamesShort: dayNamesShort,
	    dayNames: dayNames,
	    monthNamesShort: monthNamesShort,
	    monthNames: monthNames,
	    amPm: ['am', 'pm'],
	    DoFn: function DoFn(D) {
	      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
	    }
	  };

	  var formatFlags = {
	    D: function(dateObj) {
	      return dateObj.getDate();
	    },
	    DD: function(dateObj) {
	      return pad(dateObj.getDate());
	    },
	    Do: function(dateObj, i18n) {
	      return i18n.DoFn(dateObj.getDate());
	    },
	    d: function(dateObj) {
	      return dateObj.getDay();
	    },
	    dd: function(dateObj) {
	      return pad(dateObj.getDay());
	    },
	    ddd: function(dateObj, i18n) {
	      return i18n.dayNamesShort[dateObj.getDay()];
	    },
	    dddd: function(dateObj, i18n) {
	      return i18n.dayNames[dateObj.getDay()];
	    },
	    M: function(dateObj) {
	      return dateObj.getMonth() + 1;
	    },
	    MM: function(dateObj) {
	      return pad(dateObj.getMonth() + 1);
	    },
	    MMM: function(dateObj, i18n) {
	      return i18n.monthNamesShort[dateObj.getMonth()];
	    },
	    MMMM: function(dateObj, i18n) {
	      return i18n.monthNames[dateObj.getMonth()];
	    },
	    YY: function(dateObj) {
	      return String(dateObj.getFullYear()).substr(2);
	    },
	    YYYY: function(dateObj) {
	      return dateObj.getFullYear();
	    },
	    h: function(dateObj) {
	      return dateObj.getHours() % 12 || 12;
	    },
	    hh: function(dateObj) {
	      return pad(dateObj.getHours() % 12 || 12);
	    },
	    H: function(dateObj) {
	      return dateObj.getHours();
	    },
	    HH: function(dateObj) {
	      return pad(dateObj.getHours());
	    },
	    m: function(dateObj) {
	      return dateObj.getMinutes();
	    },
	    mm: function(dateObj) {
	      return pad(dateObj.getMinutes());
	    },
	    s: function(dateObj) {
	      return dateObj.getSeconds();
	    },
	    ss: function(dateObj) {
	      return pad(dateObj.getSeconds());
	    },
	    S: function(dateObj) {
	      return Math.round(dateObj.getMilliseconds() / 100);
	    },
	    SS: function(dateObj) {
	      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
	    },
	    SSS: function(dateObj) {
	      return pad(dateObj.getMilliseconds(), 3);
	    },
	    a: function(dateObj, i18n) {
	      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
	    },
	    A: function(dateObj, i18n) {
	      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
	    },
	    ZZ: function(dateObj) {
	      var o = dateObj.getTimezoneOffset();
	      return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
	    }
	  };

	  var parseFlags = {
	    D: [twoDigits, function (d, v) {
	      d.day = v;
	    }],
	    Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
	      d.day = parseInt(v, 10);
	    }],
	    M: [twoDigits, function (d, v) {
	      d.month = v - 1;
	    }],
	    YY: [twoDigits, function (d, v) {
	      var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
	      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
	    }],
	    h: [twoDigits, function (d, v) {
	      d.hour = v;
	    }],
	    m: [twoDigits, function (d, v) {
	      d.minute = v;
	    }],
	    s: [twoDigits, function (d, v) {
	      d.second = v;
	    }],
	    YYYY: [fourDigits, function (d, v) {
	      d.year = v;
	    }],
	    S: [/\d/, function (d, v) {
	      d.millisecond = v * 100;
	    }],
	    SS: [/\d{2}/, function (d, v) {
	      d.millisecond = v * 10;
	    }],
	    SSS: [threeDigits, function (d, v) {
	      d.millisecond = v;
	    }],
	    d: [twoDigits, noop],
	    ddd: [word, noop],
	    MMM: [word, monthUpdate('monthNamesShort')],
	    MMMM: [word, monthUpdate('monthNames')],
	    a: [word, function (d, v, i18n) {
	      var val = v.toLowerCase();
	      if (val === i18n.amPm[0]) {
	        d.isPm = false;
	      } else if (val === i18n.amPm[1]) {
	        d.isPm = true;
	      }
	    }],
	    ZZ: [/[\+\-]\d\d:?\d\d/, function (d, v) {
	      var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

	      if (parts) {
	        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
	        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
	      }
	    }]
	  };
	  parseFlags.dd = parseFlags.d;
	  parseFlags.dddd = parseFlags.ddd;
	  parseFlags.DD = parseFlags.D;
	  parseFlags.mm = parseFlags.m;
	  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
	  parseFlags.MM = parseFlags.M;
	  parseFlags.ss = parseFlags.s;
	  parseFlags.A = parseFlags.a;


	  // Some common format strings
	  fecha.masks = {
	    'default': 'ddd MMM DD YYYY HH:mm:ss',
	    shortDate: 'M/D/YY',
	    mediumDate: 'MMM D, YYYY',
	    longDate: 'MMMM D, YYYY',
	    fullDate: 'dddd, MMMM D, YYYY',
	    shortTime: 'HH:mm',
	    mediumTime: 'HH:mm:ss',
	    longTime: 'HH:mm:ss.SSS'
	  };

	  /***
	   * Format a date
	   * @method format
	   * @param {Date|number} dateObj
	   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
	   */
	  fecha.format = function (dateObj, mask, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof dateObj === 'number') {
	      dateObj = new Date(dateObj);
	    }

	    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
	      throw new Error('Invalid Date in fecha.format');
	    }

	    mask = fecha.masks[mask] || mask || fecha.masks['default'];

	    return mask.replace(token, function ($0) {
	      return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
	    });
	  };

	  /**
	   * Parse a date string into an object, changes - into /
	   * @method parse
	   * @param {string} dateStr Date string
	   * @param {string} format Date parse format
	   * @returns {Date|boolean}
	   */
	  fecha.parse = function (dateStr, format, i18nSettings) {
	    var i18n = i18nSettings || fecha.i18n;

	    if (typeof format !== 'string') {
	      throw new Error('Invalid format in fecha.parse');
	    }

	    format = fecha.masks[format] || format;

	    // Avoid regular expression denial of service, fail early for really long strings
	    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
	    if (dateStr.length > 1000) {
	      return false;
	    }

	    var isValid = true;
	    var dateInfo = {};
	    format.replace(token, function ($0) {
	      if (parseFlags[$0]) {
	        var info = parseFlags[$0];
	        var index = dateStr.search(info[0]);
	        if (!~index) {
	          isValid = false;
	        } else {
	          dateStr.replace(info[0], function (result) {
	            info[1](dateInfo, result, i18n);
	            dateStr = dateStr.substr(index + result.length);
	            return result;
	          });
	        }
	      }

	      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
	    });

	    if (!isValid) {
	      return false;
	    }

	    var today = new Date();
	    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
	      dateInfo.hour = +dateInfo.hour + 12;
	    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
	      dateInfo.hour = 0;
	    }

	    var date;
	    if (dateInfo.timezoneOffset != null) {
	      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
	      date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
	        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
	    } else {
	      date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
	        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
	    }
	    return date;
	  };

	  /* istanbul ignore next */
	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = fecha;
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return fecha;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    main.fecha = fecha;
	  }
	})(this);


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(40);
	var one = function one() {};
	var on = function on() {};
	var off = function off() {};

	if (canUseDOM) {
	  var bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
	  var unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
	  var prefix = bind !== 'addEventListener' ? 'on' : '';

	  one = function one(node, eventNames, eventListener) {
	    var typeArray = eventNames.split(' ');
	    var recursiveFunction = function recursiveFunction(e) {
	      e.target.removeEventListener(e.type, recursiveFunction);
	      return eventListener(e);
	    };

	    for (var i = typeArray.length - 1; i >= 0; i--) {
	      this.on(node, typeArray[i], recursiveFunction);
	    }
	  };

	  /**
	   * Bind `node` event `eventName` to `eventListener`.
	   *
	   * @param {Element} node
	   * @param {String} eventName
	   * @param {Function} eventListener
	   * @param {Boolean} capture
	   * @return {Obejct}
	   * @api public
	   */

	  on = function on(node, eventName, eventListener, capture) {
	    node[bind](prefix + eventName, eventListener, capture || false);

	    return {
	      off: function off() {
	        node[unbind](prefix + eventName, eventListener, capture || false);
	      }
	    };
	  };

	  /**
	   * Unbind `node` event `eventName`'s callback `eventListener`.
	   *
	   * @param {Element} node
	   * @param {String} eventName
	   * @param {Function} eventListener
	   * @param {Boolean} capture
	   * @return {Function}
	   * @api public
	   */

	  off = function off(node, eventName, eventListener, capture) {
	    node[unbind](prefix + eventName, eventListener, capture || false);
	    return eventListener;
	  };
	}

	module.exports = {
	  one: one,
	  on: on,
	  off: off
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (node, tree) {
	  while (node) {
	    if (node === tree) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var fecha = __webpack_require__(52);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Icon = __webpack_require__(23);
	var DatePicker = __webpack_require__(56);
	var TimePicker = __webpack_require__(58);

	var DateTimePicker = React.createClass({
	  displayName: 'DateTimePicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    showTimePicker: React.PropTypes.bool,
	    showDatePicker: React.PropTypes.bool,
	    caretDisplayed: React.PropTypes.bool,
	    amStyle: React.PropTypes.oneOf(['success', 'danger', 'warning']),
	    viewMode: React.PropTypes.string,
	    minViewMode: React.PropTypes.string,
	    onSelect: React.PropTypes.func.isRequired,
	    onClose: React.PropTypes.func,
	    daysOfWeekDisabled: React.PropTypes.array,
	    format: React.PropTypes.string,
	    dateTime: React.PropTypes.string,
	    locale: React.PropTypes.string,
	    weekStart: React.PropTypes.number,
	    minDate: React.PropTypes.string,
	    maxDate: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker',
	      dateTime: '',
	      format: 'YYYY-MM-DD HH:mm',
	      showTimePicker: true,
	      showDatePicker: true,
	      caretDisplayed: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    var showToggle;
	    var showTimePicker;

	    if (this.props.showTimePicker && this.props.showDatePicker) {
	      showToggle = true;
	      showTimePicker = false;
	    }

	    if (!showToggle && !this.props.showDatePicker) {
	      showTimePicker = true;
	    }

	    // `fecha.parse` return `false` when passed invalid parameter
	    // fixes: https://github.com/amazeui/amazeui-react/issues/119
	    var date = fecha.parse(this.props.dateTime, this.props.format);
	    !date && (date = new Date());

	    return {
	      showTimePicker: showTimePicker,
	      showDatePicker: this.props.showDatePicker,
	      caretDisplayed: this.props.caretDisplayed,
	      showToggle: showToggle,
	      date: date,
	      toggleDisplay: {
	        toggleTime: {
	          display: 'block'
	        },
	        toggleDate: {
	          display: 'none'
	        }
	      }
	    };
	  },

	  handleToggleTime: function handleToggleTime() {
	    this.setState({
	      showDatePicker: false,
	      showTimePicker: true,
	      toggleDisplay: {
	        toggleTime: {
	          display: 'none'
	        },
	        toggleDate: {
	          display: 'block'
	        }
	      }
	    });
	  },

	  handleToggleDate: function handleToggleDate() {
	    this.setState({
	      showDatePicker: true,
	      showTimePicker: false,
	      toggleDisplay: {
	        toggleTime: {
	          display: 'block'
	        },
	        toggleDate: {
	          display: 'none'
	        }
	      }
	    });
	  },

	  handleSelect: function handleSelect(date) {
	    this.setState({
	      date: date
	    });
	    this.props.onSelect(fecha.format(date, this.props.format));
	  },

	  renderToggleTime: function renderToggleTime() {
	    if (this.state.showToggle) {
	      return React.createElement(
	        'div',
	        {
	          style: this.state.toggleDisplay.toggleTime,
	          className: this.prefixClass('toggle'),
	          onClick: this.handleToggleTime
	        },
	        React.createElement(Icon, { icon: 'clock-o' })
	      );
	    }
	  },

	  renderToggleDate: function renderToggleDate() {
	    if (this.state.showToggle) {
	      return React.createElement(
	        'div',
	        {
	          style: this.state.toggleDisplay.toggleDate,
	          className: this.prefixClass('toggle'),
	          onClick: this.handleToggleDate
	        },
	        React.createElement(Icon, { icon: 'calendar' })
	      );
	    }
	  },

	  renderDatePicker: function renderDatePicker() {
	    if (this.state.showDatePicker) {
	      return React.createElement(DatePicker, {
	        onSelect: this.handleSelect,
	        onClose: this.props.onClose,
	        weekStart: this.props.weekStart,
	        viewMode: this.props.viewMode,
	        minViewMode: this.props.minViewMode,
	        daysOfWeekDisabled: this.props.daysOfWeekDisabled,
	        format: this.props.format,
	        date: this.state.date,
	        locale: this.props.locale,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate
	      });
	    }
	  },

	  renderTimePicker: function renderTimePicker() {
	    if (this.state.showTimePicker) {
	      return React.createElement(TimePicker, {
	        onSelect: this.handleSelect,
	        date: this.state.date,
	        format: this.props.format
	      });
	    }
	  },

	  renderCaret: function renderCaret() {
	    if (this.state.caretDisplayed) {
	      return React.createElement('div', { className: this.prefixClass('caret') });
	    }
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    this.props.amStyle && (classSet[this.prefixClass(this.props.amStyle)] = true);

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className)
	      }),
	      this.renderCaret(),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('date') },
	        this.renderDatePicker()
	      ),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('time') },
	        this.renderTimePicker()
	      ),
	      this.renderToggleTime(),
	      this.renderToggleDate()
	    );
	  }
	});

	module.exports = DateTimePicker;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var fecha = __webpack_require__(52);
	var ClassNameMixin = __webpack_require__(8);
	var dateUtils = __webpack_require__(57);

	var DatePicker = React.createClass({
	  displayName: 'DatePicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    onSelect: React.PropTypes.func.isRequired,
	    onClose: React.PropTypes.func,
	    viewMode: React.PropTypes.string,
	    minViewMode: React.PropTypes.string,
	    daysOfWeekDisabled: React.PropTypes.array,
	    format: React.PropTypes.string,
	    date: React.PropTypes.object,
	    weekStart: React.PropTypes.number,
	    minDate: React.PropTypes.string,
	    maxDate: React.PropTypes.string,
	    locale: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker',
	      date: new Date(),
	      daysOfWeekDisabled: [],
	      viewMode: 'days',
	      minViewMode: 'days',
	      format: 'YYYY-MM-DD',
	      displayed: {
	        days: { display: 'block' },
	        months: { display: 'none' },
	        years: { display: 'none' }
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    var displayed;

	    switch (this.props.viewMode) {
	      case 'days':
	        displayed = {
	          days: { display: 'block' },
	          months: { display: 'none' },
	          years: { display: 'none' }
	        };
	        break;

	      case 'months':
	        displayed = {
	          days: { display: 'none' },
	          months: { display: 'block' },
	          years: { display: 'none' }
	        };
	        break;

	      case 'years':
	        displayed = {
	          days: { display: 'none' },
	          months: { display: 'none' },
	          years: { display: 'block' }
	        };
	        break;
	    }

	    return {
	      locale: dateUtils.getLocale(this.props.locale),
	      viewDate: this.props.date,
	      selectedDate: this.props.date,
	      displayed: displayed
	    };
	  },

	  // DaysPicker props function

	  subtractMonth: function subtractMonth() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setMonth(viewDate.getMonth() - 1);
	    this.setState({
	      viewDate: newDate
	    });
	  },

	  addMonth: function addMonth() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setMonth(viewDate.getMonth() + 1);
	    this.setState({
	      viewDate: newDate
	    });
	  },

	  setSelectedDate: function setSelectedDate(event) {
	    if (/disabled/ig.test(event.target.className)) {
	      return;
	    }

	    var viewDate = this.state.viewDate;

	    if (/new/ig.test(event.target.className)) {
	      viewDate.setMonth(viewDate.getMonth() + 1);
	    } else if (/old/ig.test(event.target.className)) {
	      viewDate.setMonth(viewDate.getMonth() - 1);
	    }

	    viewDate.setDate(event.target.innerHTML);

	    this.setViewDate(viewDate);
	  },

	  setViewDate: function setViewDate(viewDate) {
	    this.setState({
	      viewDate: viewDate,
	      selectedDate: new Date(viewDate.valueOf())
	    }, function () {
	      this.props.onSelect(this.state.selectedDate);
	      this.props.onClose && this.props.onClose();
	    });
	  },

	  showMonths: function showMonths() {
	    return this.setState({
	      displayed: {
	        days: { display: 'none' },
	        months: { display: 'block' },
	        years: { display: 'none' }
	      }
	    });
	  },

	  // MonthsPicker props function

	  subtractYear: function subtractYear() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setFullYear(viewDate.getFullYear() - 1);

	    return this.setState({
	      viewDate: newDate
	    });
	  },

	  addYear: function addYear() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setFullYear(viewDate.getFullYear() + 1);
	    return this.setState({
	      viewDate: newDate
	    });
	  },

	  showYears: function showYears() {
	    return this.setState({
	      displayed: {
	        days: { display: 'none' },
	        months: { display: 'none' },
	        years: { display: 'block' }
	      }
	    });
	  },

	  setViewMonth: function setViewMonth(event) {
	    var viewDate = this.state.viewDate;
	    var month = event.target.innerHTML;
	    var months = this.state.locale.monthsShort;
	    var i = 0;
	    var len = months.length;

	    for (; i < len; i++) {
	      if (month === months[i]) {
	        viewDate.setMonth(i);
	      }
	    }

	    if (this.props.minViewMode === 'months') {
	      this.setViewDate(viewDate);
	    }

	    this.setState({
	      viewDate: viewDate,
	      displayed: {
	        days: { display: 'block' },
	        months: { display: 'none' },
	        years: { display: 'none' }
	      }
	    });
	  },

	  // YearsPicker props function

	  setViewYear: function setViewYear(event) {
	    var year = event.target.innerHTML;
	    var viewDate = this.state.viewDate;

	    viewDate.setFullYear(year);

	    if (this.props.minViewMode === 'years') {
	      this.setViewDate(viewDate);
	    }

	    this.setState({
	      viewDate: viewDate,
	      displayed: {
	        days: { display: 'none' },
	        months: { display: 'block' },
	        years: { display: 'none' }
	      }
	    });
	  },

	  addDecade: function addDecade() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setFullYear(viewDate.getFullYear() + 10);
	    this.setState({
	      viewDate: newDate
	    });
	  },

	  subtractDecade: function subtractDecade() {
	    var viewDate = this.state.viewDate;
	    var newDate = new Date(viewDate.valueOf());

	    newDate.setFullYear(viewDate.getFullYear() - 10);

	    this.setState({
	      viewDate: newDate
	    });
	  },

	  // render children
	  renderDays: function renderDays() {
	    return React.createElement(DaysPicker, {
	      style: this.state.displayed.days,
	      selectedDate: this.state.selectedDate,
	      viewDate: this.state.viewDate,

	      subtractMonth: this.subtractMonth,
	      addMonth: this.addMonth,
	      setSelectedDate: this.setSelectedDate,
	      showMonths: this.showMonths,

	      format: this.props.format,
	      locale: this.state.locale,
	      weekStart: this.props.weekStart,
	      daysOfWeekDisabled: this.props.daysOfWeekDisabled,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate
	    });
	  },

	  renderMonths: function renderMonths() {
	    return React.createElement(MonthsPicker, {
	      style: this.state.displayed.months,
	      locale: this.state.locale,
	      addYear: this.addYear,
	      subtractYear: this.subtractYear,
	      viewDate: this.state.viewDate,
	      selectedDate: this.state.selectedDate,
	      showYears: this.showYears,
	      setViewMonth: this.setViewMonth });
	  },

	  renderYears: function renderYears() {
	    return React.createElement(YearsPicker, {
	      style: this.state.displayed.years,
	      viewDate: this.state.viewDate,
	      selectDate: this.state.selectedDate,
	      setViewYear: this.setViewYear,
	      addDecade: this.addDecade,
	      subtractDecade: this.subtractDecade });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.prefixClass('body') },
	      this.renderDays(),
	      this.renderMonths(),
	      this.renderYears()
	    );
	  }
	});

	var DaysPicker = React.createClass({
	  displayName: 'DaysPicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    subtractMonth: React.PropTypes.func.isRequired,
	    addMonth: React.PropTypes.func.isRequired,

	    setSelectedDate: React.PropTypes.func.isRequired,
	    selectedDate: React.PropTypes.object.isRequired,

	    viewDate: React.PropTypes.object.isRequired,
	    showMonths: React.PropTypes.func.isRequired,

	    locale: React.PropTypes.object,
	    weekStart: React.PropTypes.number,
	    daysOfWeekDisabled: React.PropTypes.array,
	    minDate: React.PropTypes.string,
	    maxDate: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  renderDays: function renderDays() {
	    var row;
	    var i;
	    var _ref;
	    var _i;
	    var _len;
	    var prevY;
	    var prevM;
	    var classes = {};
	    var html = [];
	    var cells = [];
	    var weekStart = this.props.weekStart || this.props.locale.weekStart;

	    var weekEnd = (weekStart + 6) % 7;

	    var d = this.props.viewDate;
	    var year = d.getFullYear();
	    var month = d.getMonth();
	    var selectedDate = this.props.selectedDate;

	    var currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0, 0).valueOf();

	    var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0);
	    var day = dateUtils.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());

	    prevMonth.setDate(day);
	    prevMonth.setDate(day - (prevMonth.getDay() - weekStart + 7) % 7);

	    var nextMonth = new Date(prevMonth);

	    nextMonth.setDate(nextMonth.getDate() + 42);
	    nextMonth = nextMonth.valueOf();

	    var minDate = this.props.minDate && fecha.parse(this.props.minDate);
	    var maxDate = this.props.maxDate && fecha.parse(this.props.maxDate);

	    while (prevMonth.valueOf() < nextMonth) {
	      classes[this.prefixClass('day')] = true;

	      prevY = prevMonth.getFullYear();
	      prevM = prevMonth.getMonth();

	      // set className old new
	      if (prevM < month && prevY === year || prevY < year) {
	        classes[this.prefixClass('old')] = true;
	      } else if (prevM > month && prevY === year || prevY > year) {
	        classes[this.prefixClass('new')] = true;
	      }

	      // set className active
	      if (prevMonth.valueOf() === currentDate) {
	        classes[this.setClassNamespace('active')] = true;
	      }

	      // set className disabled
	      if (minDate && prevMonth.valueOf() < minDate || maxDate && prevMonth.valueOf() > maxDate) {
	        classes[this.setClassNamespace('disabled')] = true;
	      }

	      // week disabled
	      if (this.props.daysOfWeekDisabled) {
	        _ref = this.props.daysOfWeekDisabled;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          i = _ref[_i];
	          if (prevMonth.getDay() === this.props.daysOfWeekDisabled[i]) {
	            classes[this.setClassNamespace('disabled')] = true;
	            break;
	          }
	        }
	      }

	      cells.push(React.createElement(
	        'td',
	        {
	          key: prevMonth.getMonth() + '-' + prevMonth.getDate(),
	          className: classNames(classes),
	          onClick: this.props.setSelectedDate
	        },
	        prevMonth.getDate()
	      ));

	      // add tr
	      if (prevMonth.getDay() === weekEnd) {
	        row = React.createElement(
	          'tr',
	          { key: prevMonth.getMonth() + '-' + prevMonth.getDate() },
	          cells
	        );
	        html.push(row);
	        cells = [];
	      }

	      classes = {};
	      prevMonth.setDate(prevMonth.getDate() + 1);
	    }

	    return html;
	  },

	  renderWeek: function renderWeek() {
	    var ths = [];
	    var locale = this.props.locale;
	    var weekStart = this.props.weekStart || this.props.locale.weekStart;
	    var weekEnd = weekStart + 7;

	    while (weekStart < weekEnd) {
	      ths.push(React.createElement(
	        'th',
	        { key: weekStart, className: this.prefixClass('dow') },
	        locale.daysMin[weekStart++ % 7]
	      ));
	    }

	    return React.createElement(
	      'tr',
	      null,
	      ths
	    );
	  },

	  render: function render() {
	    var viewDate = this.props.viewDate;
	    var prefixClass = this.prefixClass;
	    var locale = this.props.locale;

	    return React.createElement(
	      'div',
	      {
	        className: prefixClass('days'),
	        style: this.props.style },
	      React.createElement(
	        'table',
	        { className: prefixClass('table') },
	        React.createElement(
	          'thead',
	          null,
	          React.createElement(
	            'tr',
	            { className: prefixClass('header') },
	            React.createElement(
	              'th',
	              { className: prefixClass('prev'), onClick: this.props.subtractMonth },
	              React.createElement('i', { className: prefixClass('prev-icon') })
	            ),
	            React.createElement(
	              'th',
	              {
	                className: prefixClass('switch'),
	                colSpan: '5',
	                onClick: this.props.showMonths
	              },
	              React.createElement(
	                'div',
	                { className: this.prefixClass('select') },
	                locale.monthsShort[viewDate.getMonth()],
	                viewDate.getFullYear()
	              )
	            ),
	            React.createElement(
	              'th',
	              { className: prefixClass('next'), onClick: this.props.addMonth },
	              React.createElement('i', { className: prefixClass('next-icon') })
	            )
	          ),
	          this.renderWeek()
	        ),
	        React.createElement(
	          'tbody',
	          null,
	          this.renderDays()
	        )
	      )
	    );
	  }
	});

	var MonthsPicker = React.createClass({
	  displayName: 'MonthsPicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    locale: React.PropTypes.object,
	    subtractYear: React.PropTypes.func.isRequired,
	    addYear: React.PropTypes.func.isRequired,
	    viewDate: React.PropTypes.object.isRequired,
	    selectedDate: React.PropTypes.object.isRequired,
	    showYears: React.PropTypes.func.isRequired,
	    setViewMonth: React.PropTypes.func.isRequired,
	    minDate: React.PropTypes.string,
	    maxDate: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  renderMonths: function renderMonths() {
	    var classes = {};
	    var month = this.props.selectedDate.getMonth();
	    var year = this.props.selectedDate.getFullYear();
	    var i = 0;
	    var months = [];
	    var minDate = this.props.minDate && fecha.parse(this.props.minDate);
	    var maxDate = this.props.maxDate && fecha.parse(this.props.maxDate);
	    var prevMonth = new Date(year, month);

	    // TODO: minDate maxDate months
	    while (i < 12) {
	      classes[this.prefixClass('month')] = true;

	      if (this.props.viewDate.getFullYear() === this.props.selectedDate.getFullYear() && i === month) {
	        classes[this.setClassNamespace('active')] = true;
	      }

	      // set className disabled
	      if (minDate && prevMonth.valueOf() < minDate || maxDate && prevMonth.valueOf() > maxDate) {
	        classes[this.setClassNamespace('disabled')] = true;
	      }

	      months.push(React.createElement(
	        'span',
	        {
	          className: classNames(classes),
	          onClick: this.props.setViewMonth,
	          key: i },
	        this.props.locale.monthsShort[i]
	      ));

	      classes = {};
	      i++;
	    }

	    return months;
	  },

	  render: function render() {
	    return React.createElement(SubPicker, {
	      displayName: 'months',
	      style: this.props.style,
	      subtract: this.props.subtractYear,
	      add: this.props.addYear,
	      showFunc: this.props.showYears,
	      showText: this.props.viewDate.getFullYear(),
	      body: this.renderMonths() });
	  }
	});

	var YearsPicker = React.createClass({
	  displayName: 'YearsPicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    viewDate: React.PropTypes.object.isRequired,
	    selectDate: React.PropTypes.object.isRequired,
	    subtractDecade: React.PropTypes.func.isRequired,
	    addDecade: React.PropTypes.func.isRequired,
	    setViewYear: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  renderYears: function renderYears() {
	    var classes = {};
	    var years = [];
	    var i = -1;
	    var year = parseInt(this.props.viewDate.getFullYear() / 10, 10) * 10;

	    year--;

	    while (i < 11) {
	      classes[this.prefixClass('year')] = true;

	      if (i === -1 || i === 10) {
	        classes[this.prefixClass('old')] = true;
	      }

	      if (this.props.selectDate.getFullYear() === year) {
	        classes[this.setClassNamespace('active')] = true;
	      }

	      years.push(React.createElement(
	        'span',
	        {
	          className: classNames(classes),
	          onClick: this.props.setViewYear,
	          key: year },
	        year
	      ));

	      classes = {};
	      year++;
	      i++;
	    }

	    return years;
	  },

	  render: function render() {
	    var year = parseInt(this.props.viewDate.getFullYear() / 10, 10) * 10;
	    var addYear = year + 9;
	    var showYear = year + '-' + addYear;

	    return React.createElement(SubPicker, {
	      displayName: 'years',
	      style: this.props.style,
	      subtract: this.props.subtractDecade,
	      add: this.props.addDecade,
	      showText: showYear,
	      body: this.renderYears() });
	  }
	});

	var SubPicker = React.createClass({
	  displayName: 'SubPicker',

	  mixins: [ClassNameMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  render: function render() {
	    var prefixClass = this.prefixClass;

	    return React.createElement(
	      'div',
	      {
	        className: prefixClass(this.props.displayName),
	        style: this.props.style },
	      React.createElement(
	        'table',
	        { className: prefixClass('table') },
	        React.createElement(
	          'thead',
	          null,
	          React.createElement(
	            'tr',
	            { className: prefixClass('header') },
	            React.createElement(
	              'th',
	              { className: prefixClass('prev'), onClick: this.props.subtract },
	              React.createElement('i', { className: prefixClass('prev-icon') })
	            ),
	            React.createElement(
	              'th',
	              {
	                className: prefixClass('switch'),
	                colSpan: '5',
	                onClick: this.props.showFunc },
	              React.createElement(
	                'div',
	                { className: this.prefixClass('select') },
	                this.props.showText
	              )
	            ),
	            React.createElement(
	              'th',
	              { className: prefixClass('next'), onClick: this.props.add },
	              React.createElement('i', { className: prefixClass('next-icon') })
	            )
	          )
	        ),
	        React.createElement(
	          'tbody',
	          null,
	          React.createElement(
	            'tr',
	            null,
	            React.createElement(
	              'td',
	              { colSpan: '7' },
	              this.props.body
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = DatePicker;

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	var locales = {
	  'en_US': {
	    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
	    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	    today: 'Today',
	    weekStart: 0
	  },
	  'zh_CN': {
	    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
	    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    today: '今天',
	    weekStart: 0
	  }
	};

	var dateUtils = {
	  isLeapYear: function isLeapYear(year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	  },

	  getDaysInMonth: function getDaysInMonth(year, month) {
	    return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	  },

	  getLocale: function getLocale(locale) {
	    if (!locale && navigator && navigator.language) {
	      locale = navigator.language.split('-');
	      locale[1] = locale[1].toUpperCase();
	      locale = locale.join('_');
	    }

	    return locales[locale] || locales['zh_CN'];
	  }
	};

	module.exports = dateUtils;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);

	var TimePicker = React.createClass({
	  displayName: 'TimePicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    onSelect: React.PropTypes.func.isRequired,
	    date: React.PropTypes.object,
	    format: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker',
	      format: 'HH:mm'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      viewDate: this.props.date,
	      selectedDate: this.props.date,
	      displayed: {
	        times: { display: 'block' },
	        minutes: { display: 'none' },
	        hours: { display: 'none' }
	      }
	    };
	  },

	  // Minutes
	  addMinute: function addMinute() {
	    var viewDate = this.state.viewDate;

	    viewDate.setMinutes(viewDate.getMinutes() + 1);

	    this.setTime(viewDate);
	  },

	  subtractMinute: function subtractMinute() {
	    var viewDate = this.state.viewDate;

	    viewDate.setMinutes(viewDate.getMinutes() - 1);

	    this.setTime(viewDate);
	  },

	  setTime: function setTime(viewDate) {
	    this.setState({
	      viewDate: viewDate,
	      selectedDate: new Date(viewDate.valueOf())
	    }, function () {
	      this.props.onSelect(this.state.selectedDate);
	    });
	  },

	  // set Minutes
	  setSelectedMinute: function setSelectedMinute(event) {
	    var viewDate = this.state.viewDate;
	    var minute = parseInt(event.target.innerHTML.split(':')[1]);

	    viewDate.setMinutes(minute);
	    this.setTime(viewDate);

	    this.setState({
	      displayed: {
	        times: { display: 'block' },
	        minutes: { display: 'none' },
	        hours: { display: 'none' }
	      }
	    });
	  },

	  showMinutes: function showMinutes() {
	    this.setState({
	      displayed: {
	        times: { display: 'none' },
	        minutes: { display: 'block' },
	        hours: { display: 'none' }
	      }
	    });
	  },

	  // Hours
	  showHours: function showHours() {
	    this.setState({
	      displayed: {
	        times: { display: 'none' },
	        minutes: { display: 'none' },
	        hours: { display: 'block' }
	      }
	    });
	  },

	  setSelectedHour: function setSelectedHour(event) {
	    var viewDate = this.state.viewDate;
	    var hour = parseInt(event.target.innerHTML);

	    viewDate.setHours(hour);
	    this.setTime(viewDate);

	    this.setState({
	      displayed: {
	        times: { display: 'block' },
	        minutes: { display: 'none' },
	        hours: { display: 'none' }
	      }
	    });
	  },

	  addHour: function addHour() {
	    var viewDate = this.state.viewDate;

	    viewDate.setHours(viewDate.getHours() + 1);

	    this.setTime(viewDate);
	  },

	  subtractHour: function subtractHour() {
	    var viewDate = this.state.viewDate;

	    viewDate.setHours(viewDate.getHours() - 1);

	    this.setTime(viewDate);
	  },

	  showTimeText: function showTimeText() {
	    var hour = this.state.viewDate.getHours();
	    var minute = this.state.viewDate.getMinutes();

	    if (minute < 10) {
	      minute = '0' + minute;
	    }

	    if (hour < 10) {
	      hour = '0' + hour;
	    }

	    return {
	      hour: hour,
	      minute: minute
	    };
	  },

	  renderHours: function renderHours() {
	    var time = this.showTimeText().hour + ':' + this.showTimeText().minute;

	    return React.createElement(HoursPicker, {
	      style: this.state.displayed.hours,
	      setSelectedHour: this.setSelectedHour,
	      selectedDate: this.state.selectedDate,
	      addHour: this.addHour,
	      subtractHour: this.subtractHour,
	      showTime: time
	    });
	  },

	  renderMinutes: function renderMinutes() {
	    var time = this.showTimeText().hour + ':' + this.showTimeText().minute;

	    return React.createElement(MinutesPicker, {
	      style: this.state.displayed.minutes,
	      setSelectedMinute: this.setSelectedMinute,
	      selectedDate: this.state.selectedDate,
	      addMinute: this.addMinute,
	      subtractMinute: this.subtractMinute,
	      showTime: time
	    });
	  },

	  render: function render() {
	    var time = this.showTimeText();

	    var content = React.createElement(
	      'div',
	      { className: this.prefixClass('time-box') },
	      React.createElement(
	        'strong',
	        { onClick: this.showHours },
	        time.hour
	      ),
	      React.createElement(
	        'em',
	        null,
	        ':'
	      ),
	      React.createElement(
	        'strong',
	        { onClick: this.showMinutes },
	        time.minute
	      )
	    );

	    return React.createElement(
	      'div',
	      { className: this.prefixClass('body') },
	      React.createElement(SubPicker, {
	        style: this.state.displayed.times,
	        displayName: 'time-wrapper',
	        body: content,
	        add: this.addMinute,
	        subtract: this.subtractMinute,
	        showFunc: this.props.showDate,
	        showText: 'today'
	      }),
	      this.renderHours(),
	      this.renderMinutes()
	    );
	  }
	});

	var HoursPicker = React.createClass({
	  displayName: 'HoursPicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    setSelectedHour: React.PropTypes.func.isRequired,
	    selectedDate: React.PropTypes.object.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  renderHour: function renderHour() {
	    var classes;
	    var hour = this.props.selectedDate.getHours();
	    var i = 0;
	    var hours = [];

	    while (i < 24) {
	      classes = {};
	      classes[this.prefixClass('hour')] = true;

	      if (i === hour) {
	        classes[this.setClassNamespace('active')] = true;
	      }

	      hours.push(React.createElement(
	        'span',
	        {
	          className: classNames(classes),
	          onClick: this.props.setSelectedHour,
	          key: i
	        },
	        i < 10 ? '0' + i + ':00' : i + ':00'
	      ));

	      i++;
	    }

	    return hours;
	  },

	  render: function render() {
	    return React.createElement(SubPicker, {
	      displayName: 'hours',
	      style: this.props.style,
	      subtract: this.props.subtractHour,
	      add: this.props.addHour,
	      showText: this.props.showTime,
	      body: this.renderHour()
	    });
	  }
	});

	var MinutesPicker = React.createClass({
	  displayName: 'MinutesPicker',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    setSelectedMinute: React.PropTypes.func.isRequired,
	    selectedDate: React.PropTypes.object.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  renderMinute: function renderMinute() {
	    var classes;
	    var minute = this.props.selectedDate.getMinutes();
	    var hour = this.props.selectedDate.getHours();
	    var i = 0;
	    var minutes = [];

	    while (i < 60) {
	      classes = {};
	      classes[this.prefixClass('minute')] = true;

	      if (i === minute) {
	        classes[this.setClassNamespace('active')] = true;
	      }

	      if (i % 5 === 0) {
	        minutes.push(React.createElement(
	          'span',
	          {
	            className: classNames(classes),
	            onClick: this.props.setSelectedMinute,
	            key: i
	          },
	          i < 10 ? hour + ':0' + i : hour + ':' + i
	        ));
	      }

	      i++;
	    }

	    return minutes;
	  },

	  render: function render() {
	    return React.createElement(SubPicker, {
	      displayName: 'minutes',
	      style: this.props.style,
	      subtract: this.props.subtractMinute,
	      add: this.props.addMinute,
	      showText: this.props.showTime,
	      body: this.renderMinute()
	    });
	  }
	});

	var SubPicker = React.createClass({
	  displayName: 'SubPicker',

	  mixins: [ClassNameMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'datepicker'
	    };
	  },

	  render: function render() {
	    var prefixClass = this.prefixClass;

	    return React.createElement(
	      'div',
	      {
	        className: prefixClass(this.props.displayName),
	        style: this.props.style },
	      React.createElement(
	        'table',
	        { className: prefixClass('table') },
	        React.createElement(
	          'thead',
	          null,
	          React.createElement(
	            'tr',
	            { className: prefixClass('header') },
	            React.createElement(
	              'th',
	              { className: prefixClass('prev'), onClick: this.props.subtract },
	              React.createElement('i', { className: prefixClass('prev-icon') })
	            ),
	            React.createElement(
	              'th',
	              {
	                className: prefixClass('switch'),
	                colSpan: '5',
	                onClick: this.props.showFunc
	              },
	              React.createElement(
	                'div',
	                { className: this.prefixClass('select') },
	                this.props.showText
	              )
	            ),
	            React.createElement(
	              'th',
	              { className: prefixClass('next'), onClick: this.props.add },
	              React.createElement('i', { className: prefixClass('next-icon') })
	            )
	          )
	        ),
	        React.createElement(
	          'tbody',
	          null,
	          React.createElement(
	            'tr',
	            null,
	            React.createElement(
	              'td',
	              { colSpan: '7' },
	              this.props.body
	            )
	          )
	        )
	      )
	    );
	  }
	});

	module.exports = TimePicker;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var constants = __webpack_require__(9);
	var Button = __webpack_require__(13);
	var Icon = __webpack_require__(23);
	var Events = __webpack_require__(53);
	var isNodeInTree = __webpack_require__(54);
	var createChainedFunction = __webpack_require__(35);
	var canUseDOM = __webpack_require__(40);

	var Dropdown = React.createClass({
	  displayName: 'Dropdown',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    title: React.PropTypes.node.isRequired,
	    dropup: React.PropTypes.bool,
	    navItem: React.PropTypes.bool,
	    btnStyle: React.PropTypes.string,
	    btnSize: React.PropTypes.string,
	    btnInlineStyle: React.PropTypes.object,
	    contentInlineStyle: React.PropTypes.object,
	    contentComponent: React.PropTypes.node,
	    toggleClassName: React.PropTypes.string,
	    caretClassName: React.PropTypes.string,
	    contentClassName: React.PropTypes.string,
	    onOpen: React.PropTypes.func, // open callback
	    onClose: React.PropTypes.func // close callback
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'dropdown',
	      contentComponent: 'ul'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this.unbindOuterHandlers();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.unbindOuterHandlers();
	  },

	  /**
	   * setDropdown
	   * @param {bool} isOpen - Dropdown state, `true` -> open, `close` -> false
	   * @param {function} [callback]
	   */
	  setDropdown: function setDropdown(isOpen, callback) {
	    if (isOpen) {
	      this.bindOuterHandlers();
	    } else {
	      this.unbindOuterHandlers();
	    }

	    this.setState({
	      open: isOpen
	    }, function () {
	      callback && callback();

	      isOpen && this.props.onOpen && this.props.onOpen();
	      !isOpen && this.props.onClose && this.props.onClose();
	    });
	  },

	  // close dropdown on `esc` keyup
	  handleKeyup: function handleKeyup(e) {
	    e.keyCode === 27 && this.setDropdown(false);
	  },

	  // close dropdown when click outer dropdown
	  handleOuterClick: function handleOuterClick(e) {
	    if (isNodeInTree(e.target, ReactDOM.findDOMNode(this))) {
	      return false;
	    }

	    this.setDropdown(false);
	  },

	  bindOuterHandlers: function bindOuterHandlers() {
	    if (canUseDOM) {
	      Events.on(document, 'click', this.handleOuterClick);
	      Events.on(document, 'keyup', this.handleKeyup);
	    }
	  },

	  unbindOuterHandlers: function unbindOuterHandlers() {
	    if (canUseDOM) {
	      Events.off(document, 'click', this.handleOuterClick);
	      Events.off(document, 'keyup', this.handleKeyup);
	    }
	  },

	  handleDropdownClick: function handleDropdownClick(e) {
	    e.preventDefault();

	    this.setDropdown(!this.state.open);
	  },

	  renderChildren: function renderChildren() {
	    var _this = this;

	    return React.Children.map(this.props.children, function (child, index) {
	      if (React.isValidElement(child)) {
	        var closeOnClick = child.props.closeOnClick;
	        var onClick = child.props.onClick;
	        var handleClick = closeOnClick ? createChainedFunction(onClick, function () {
	          _this.setDropdown(false);
	        }) : onClick;

	        return React.cloneElement(child, assign({}, child.props, {
	          key: 'dropdownItem-' + index,
	          onClick: handleClick
	        }));
	      }
	    });
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var Component = this.props.navItem ? 'li' : 'div';
	    var btnClassPrefix = this.props.navItem ? '' : 'btn';
	    var btnComponent = this.props.navItem ? 'a' : null;
	    var caret = React.createElement(Icon, {
	      className: this.props.caretClassName,
	      icon: 'caret-' + (this.props.dropup ? 'up' : 'down')
	    });
	    var animation = this.state.open ? this.setClassNamespace('animation-slide-top-fixed') : this.setClassNamespace('dropdown-animation');
	    var ContentComponent = this.props.contentComponent;

	    classSet[constants.CLASSES.active] = this.state.open;
	    classSet[this.prefixClass('up')] = this.props.dropup;

	    return React.createElement(
	      Component,
	      {
	        className: classNames(this.props.className, classSet)
	      },
	      React.createElement(
	        Button,
	        {
	          onClick: this.handleDropdownClick,
	          amStyle: this.props.btnStyle,
	          amSize: this.props.btnSize,
	          style: this.props.btnInlineStyle,
	          className: classNames(this.prefixClass('toggle'), this.props.toggleClassName),
	          classPrefix: btnClassPrefix,
	          component: btnComponent,
	          ref: 'dropdownToggle'
	        },
	        this.props.title,
	        ' ',
	        caret
	      ),
	      React.createElement(
	        ContentComponent,
	        {
	          ref: 'dropdownContent',
	          style: this.props.contentInlineStyle,
	          className: classNames(this.prefixClass('content'), animation, this.props.contentClassName)
	        },
	        this.renderChildren()
	      )
	    );
	  }
	});

	Dropdown.Item = React.createClass({
	  displayName: 'Item',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    closeOnClick: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    target: React.PropTypes.string,
	    title: React.PropTypes.string,
	    header: React.PropTypes.bool,
	    divider: React.PropTypes.bool,
	    linkComponent: React.PropTypes.any,
	    linkProps: React.PropTypes.object,
	    active: React.PropTypes.bool
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
	    var children = null;

	    classSet[this.setClassNamespace('dropdown-header')] = this.props.header;

	    if (this.props.header) {
	      children = this.props.children;
	    } else if (!this.props.divider) {
	      var Component = this.props.linkComponent || 'a';

	      children = React.createElement(
	        Component,
	        _extends({
	          onClick: this.handleClick,
	          href: this.props.href,
	          target: this.props.target,
	          title: this.props.title
	        }, this.props.linkProps),
	        this.props.children
	      );
	    }

	    return React.createElement(
	      'li',
	      _extends({}, restProps, {
	        title: null,
	        href: null,
	        className: classNames(this.props.className, classSet)
	      }),
	      children
	    );
	  }
	});

	module.exports = Dropdown;

	/*
	* TODO:
	*   1. 关闭动画
	*   2. 位置检测/宽度适应
	* */

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var DimmerMixin = __webpack_require__(61);
	var Events = __webpack_require__(53);
	var Close = __webpack_require__(43);
	var Icon = __webpack_require__(23);

	var Modal = React.createClass({
	  displayName: 'Modal',

	  mixins: [ClassNameMixin, DimmerMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    type: React.PropTypes.oneOf(['alert', 'confirm', 'prompt', 'loading', 'actions', 'popup']),
	    title: React.PropTypes.node,
	    confirmText: React.PropTypes.string,
	    cancelText: React.PropTypes.string,
	    closeIcon: React.PropTypes.bool,
	    closeViaDimmer: React.PropTypes.bool,
	    onRequestClose: React.PropTypes.func,
	    marginTop: React.PropTypes.string,
	    marginLeft: React.PropTypes.string,
	    modalWidth: React.PropTypes.string,
	    modalHeight: React.PropTypes.string,
	    onConfirm: React.PropTypes.func,
	    onCancel: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'modal',
	      closeIcon: true,
	      confirmText: '确定',
	      cancelText: '取消',
	      onRequestClose: function onRequestClose() {}
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      transitioning: false
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this._documentKeyupListener = Events.on(document, 'keyup', this.handleDocumentKeyUp, false);

	    this.setDimmerContainer();

	    // TODO: 何为添加动画效果的最佳时机？ render 完成以后添加动画 Class？
	    this.setState({
	      transitioning: true
	    });
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._documentKeyupListener.off();
	    this.resetDimmerContainer();
	  },

	  handleDimmerClick: function handleDimmerClick() {
	    if (this.props.closeViaDimmer) {
	      this.props.onRequestClose();
	    }
	  },

	  handleBackdropClick: function handleBackdropClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }

	    this.props.onRequestClose();
	  },

	  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
	    if (!this.props.keyboard && e.keyCode === 27) {
	      this.props.onRequestClose();
	    }
	  },

	  isPopup: function isPopup() {
	    return this.props.type === 'popup';
	  },

	  isActions: function isActions() {
	    return this.props.type === 'actions';
	  },

	  // Get input data for prompt modal
	  getPromptData: function getPromptData() {
	    var data = [];
	    var inputs = ReactDOM.findDOMNode(this).querySelectorAll('input');

	    if (inputs) {
	      var i = 0;

	      for (; i < inputs.length; i++) {
	        data.push(inputs[i].value);
	      }
	    }

	    return data.length === 0 ? null : data.length === 1 ? data[0] : data;
	  },

	  handleConfirm: function handleConfirm(e) {
	    var data = e;

	    if (this.props.type === 'prompt') {
	      data = this.getPromptData();
	    }

	    this.props.onConfirm(data);
	  },

	  renderActions: function renderActions() {
	    return React.createElement(
	      'div',
	      {
	        style: { display: 'block' },
	        className: classNames(this.props.className, this.setClassNamespace('modal-actions'), this.setClassNamespace('modal-active'))
	      },
	      this.props.children
	    );
	  },

	  renderPopup: function renderPopup() {
	    return React.createElement(
	      'div',
	      {
	        style: { display: 'block' },
	        className: classNames(this.props.className, this.setClassNamespace('popup'), this.setClassNamespace('modal-active'))
	      },
	      React.createElement(
	        'div',
	        { className: this.setClassNamespace('popup-inner') },
	        React.createElement(
	          'div',
	          { className: this.setClassNamespace('popup-hd') },
	          this.props.title ? React.createElement(
	            'h4',
	            { className: this.setClassNamespace('popup-title') },
	            this.props.title
	          ) : null,
	          React.createElement(Close, { onClick: this.props.onRequestClose })
	        ),
	        React.createElement(
	          'div',
	          { className: this.setClassNamespace('popup-bd') },
	          this.props.children
	        )
	      )
	    );
	  },

	  renderHeader: function renderHeader() {
	    var title = this.props.title;
	    var closeIcon = this.props.closeIcon && !this.props.type ? React.createElement(Close, {
	      spin: true,
	      onClick: this.props.onRequestClose
	    }) : null;

	    return this.props.title || closeIcon ? React.createElement(
	      'div',
	      { className: this.prefixClass('hd') },
	      title ? React.createElement(
	        'h4',
	        {
	          className: this.setClassNamespace('margin-bottom-sm')
	        },
	        title
	      ) : null,
	      closeIcon
	    ) : null;
	  },

	  // Render alert/confirm/prompt buttons
	  renderFooter: function renderFooter() {
	    var buttons;
	    var btnClass = this.prefixClass('btn');
	    var props = this.props;

	    switch (this.props.type) {
	      case 'alert':
	        buttons = React.createElement(
	          'span',
	          {
	            onClick: this.props.onConfirm,
	            className: btnClass
	          },
	          this.props.confirmText
	        );
	        break;
	      case 'confirm':
	      case 'prompt':
	        buttons = [props.cancelText, props.confirmText].map(function (text, i) {
	          return React.createElement(
	            'span',
	            {
	              key: i,
	              onClick: i === 0 ? this.props.onCancel : this.handleConfirm,
	              className: btnClass
	            },
	            text
	          );
	        }.bind(this));
	        break;
	      default:
	        buttons = null;
	    }

	    return buttons ? React.createElement(
	      'div',
	      { className: this.prefixClass('footer') },
	      buttons
	    ) : null;
	  },

	  render: function render() {
	    if (this.isActions()) {
	      return this.renderDimmer(this.renderActions());
	    }

	    if (this.isPopup()) {
	      return this.renderDimmer(this.renderPopup());
	    }

	    var classSet = this.getClassSet();
	    var props = this.props;
	    var footer = this.renderFooter();
	    var style = {
	      display: 'block'
	    };
	    var dialogDimension = {
	      width: props.modalWidth,
	      height: props.modalHeight
	    };
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass('active')] = this.state.transitioning;

	    // .am-modal-no-btn -> refactor this style using `~` selector
	    classSet[this.prefixClass('no-btn')] = !footer;
	    props.type && (classSet[this.prefixClass(props.type)] = true);

	    var modal = React.createElement(
	      'div',
	      _extends({}, restProps, {
	        style: style,
	        ref: 'modal',
	        title: null,
	        className: classNames(classSet, props.className)
	      }),
	      React.createElement(
	        'div',
	        {
	          className: this.prefixClass('dialog'),
	          style: dialogDimension
	        },
	        this.renderHeader(),
	        React.createElement(
	          'div',
	          {
	            className: this.prefixClass('bd'),
	            ref: 'modalBody'
	          },
	          props.type === 'loading' ? props.children ? props.children : React.createElement(Icon, { icon: 'spinner', spin: true }) : props.children
	        ),
	        footer
	      )
	    );

	    return this.renderDimmer(modal);
	  }
	});

	module.exports = Modal;

	// TODO: Modal 动画效果实现
	// -> 如何关闭 Loading Modal?
	// -> 关闭 Modal 以后窗口滚动会原来滚动条所在位置

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var getScrollbarWidth = __webpack_require__(62);
	var ownerDocument = __webpack_require__(63).ownerDocument;
	var CSSCore = __webpack_require__(16);

	module.exports = {
	  propTypes: {
	    container: React.PropTypes.node
	  },

	  _getContainer: function _getContainer() {
	    var node = this.refs.modal;
	    var doc = ownerDocument(node);

	    return this.props.container && ReactDOM.findDOMNode(this.props.container) || doc.body;
	  },

	  _getDimmerActiveClassName: function _getDimmerActiveClassName() {
	    return this.setClassNamespace('dimmer-active');
	  },

	  setDimmerContainer: function setDimmerContainer() {
	    var container = this._getContainer();
	    var bodyPaddingRight = parseInt(container.style.paddingRight || 0, 10);
	    var barWidth = getScrollbarWidth();

	    if (barWidth) {
	      container.style.paddingRight = bodyPaddingRight + barWidth + 'px';
	    }

	    CSSCore.addClass(container, this._getDimmerActiveClassName());
	  },

	  resetDimmerContainer: function resetDimmerContainer(nextProps, nextState) {
	    var container = this._getContainer();

	    CSSCore.removeClass(container, this._getDimmerActiveClassName());

	    container.style.paddingRight = '';
	  },

	  renderDimmer: function renderDimmer(children) {
	    var onClick = this.handleDimmerClick || null;
	    var classSet = {};

	    classSet[this.setClassNamespace('dimmer')] = true;
	    classSet[this.setClassNamespace('active')] = true;

	    return React.createElement(
	      'div',
	      null,
	      React.createElement('div', {
	        onClick: onClick,
	        ref: 'dimmer',
	        style: { display: 'block' },
	        className: classNames(classSet)
	      }),
	      children
	    );
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * getScrollbarWidth
	 *
	 * @desc via http://davidwalsh.name/detect-scrollbar-width
	 * @returns {number}
	 */

	function getScrollbarWidth() {
	  if (document.body.clientWidth >= window.innerWidth) {
	    return 0;
	  }

	  // Create the measurement node
	  var measure = document.createElement('div');

	  measure.className = 'am-scrollbar-measure';
	  document.body.appendChild(measure);

	  // Get the scrollbar width
	  var scrollbarWidth = measure.offsetWidth - measure.clientWidth;

	  // Delete the DIV
	  document.body.removeChild(measure);

	  return scrollbarWidth;
	}

	module.exports = getScrollbarWidth;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);

	/**
	 * Get ownerDocument
	 * @param {ReactComponent|HTMLElement} componentOrElement
	 * @returns {HTMLDocument}
	 */
	function ownerDocument(componentOrElement) {
	  var element = ReactDOM.findDOMNode(componentOrElement);

	  return element && element.ownerDocument || document;
	}

	/**
	 * Get ownerWindow
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 * @refer https://github.com/jquery/jquery/blob/6df669f0fb87cd9975a18bf6bbe3c3548afa4fee/src/event.js#L294-L297
	 */
	function ownerWindow(element) {
	  var doc = ownerDocument(element);

	  return doc.defaultView || doc.parentWindow || window;
	}

	module.exports = {
	  ownerDocument: ownerDocument,

	  ownerWindow: ownerWindow,

	  scrollTop: function scrollTop(element, value) {
	    if (!element) {
	      return;
	    }

	    var hasScrollTop = 'scrollTop' in element;

	    if (value === undefined) {
	      return hasScrollTop ? element.scrollTop : element.pageYOffset;
	    }

	    hasScrollTop ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
	  },

	  offset: function offset(element) {
	    if (element) {
	      var rect = element.getBoundingClientRect();
	      var body = document.body;
	      var clientTop = element.clientTop || body.clientTop || 0;
	      var clientLeft = element.clientLeft || body.clientLeft || 0;
	      var scrollTop = window.pageYOffset || element.scrollTop;
	      var scrollLeft = window.pageXOffset || element.scrollLeft;

	      return {
	        top: rect.top + scrollTop - clientTop,
	        left: rect.left + scrollLeft - clientLeft
	      };
	    }

	    return null;
	  },

	  position: function position(element) {
	    return {
	      left: element.offsetLeft,
	      top: element.offsetTop
	    };
	  }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var cloneElement = React.cloneElement;
	var OverlayMixin = __webpack_require__(65);
	var DimmerMixin = __webpack_require__(61);
	var createChainedFunction = __webpack_require__(35);

	var ModalTrigger = React.createClass({
	  displayName: 'ModalTrigger',

	  mixins: [OverlayMixin, DimmerMixin],

	  propTypes: {
	    modal: React.PropTypes.node.isRequired,
	    onConfirm: React.PropTypes.func,
	    onCancel: React.PropTypes.func,
	    title: React.PropTypes.string,
	    show: React.PropTypes.bool,
	    onClose: React.PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isModalActive: false,
	      modalWidth: null,
	      modalMarginLeft: null,
	      modalHeight: null,
	      modalMarginTop: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.show) {
	      this.open();
	    }
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.show && nextProps.show !== this.props.show) {
	      this.open();
	    }
	  },

	  open: function open() {
	    this.setState({
	      isModalActive: true
	    }, this.setModalStyle);
	  },

	  close: function close() {
	    this.setState({
	      isModalActive: false
	    });

	    if (this.props.onClose) {
	      this.props.onClose();
	    }
	  },

	  toggle: function toggle() {
	    if (this.state.isModalActive) {
	      this.close();
	    } else {
	      this.open();
	    }
	  },

	  setModalStyle: function setModalStyle() {
	    if (!this.isMounted()) {
	      return;
	    }

	    // TODO: selector
	    var modal = this.getOverlayDOMNode().querySelector('.am-modal');

	    if (!modal) {
	      return;
	    }

	    var style = {};

	    if (this.props.modalHeight) {
	      style.modalHeight = this.props.modalHeight;
	      // @since 1.1.0, requires Amaze UI 2.6.0+
	      // style.modalMarginTop = -this.props.height / 2;
	    }
	    /*
	    else {
	      style.modalMarginTop = -modal.offsetHeight / 2;
	    }
	    */

	    if (this.props.modalWidth) {
	      style.modalWidth = this.props.modalWidth;
	      // style.modalMarginLeft = -this.props.modalWidth / 2;
	    }

	    this.setState(style);
	  },

	  // overlay is the modal
	  renderOverlay: function renderOverlay() {
	    if (!this.state.isModalActive) {
	      return React.createElement('span', null);
	    }

	    return cloneElement(this.props.modal, {
	      onRequestClose: this.close,
	      marginTop: this.state.modalMarginTop,
	      marginLeft: this.state.modalMarginLeft,
	      modalWidth: this.state.modalWidth,
	      modalHeight: this.state.modalHeight,
	      title: this.props.modal.props.title || this.props.title,
	      onConfirm: createChainedFunction(this.props.onConfirm, this.close),
	      onCancel: createChainedFunction(this.props.onCancel, this.close)
	    });
	  },

	  render: function render() {
	    // if "show" is defined, use "show" to control the modal
	    if (typeof this.props.show !== 'undefined') {
	      return React.createElement(
	        'div',
	        null,
	        ' ',
	        this.props.children,
	        ' '
	      );
	    }

	    var child = React.Children.only(this.props.children);
	    var props = {};

	    props.onClick = createChainedFunction(child.props.onClick, this.toggle);
	    props.onMouseOver = createChainedFunction(child.props.onMouseOver, this.props.onMouseOver);
	    props.onMouseOut = createChainedFunction(child.props.onMouseOut, this.props.onMouseOut);
	    props.onFocus = createChainedFunction(child.props.onFocus, this.props.onFocus);
	    props.onBlur = createChainedFunction(child.props.onBlur, this.props.onBlur);

	    return cloneElement(child, props);
	  }
	});

	module.exports = ModalTrigger;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);

	/**
	 * Overlay Mixin
	 *
	 * @desc `overlay` is something like Popover, Modal, etc.
	 * */

	module.exports = {
	  propTypes: {
	    container: React.PropTypes.node
	  },

	  componentDidMount: function componentDidMount() {
	    this._renderOverlay();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },

	  // Remove Overlay related DOM node
	  componentWillUnmount: function componentWillUnmount() {
	    this._unmountOverlay();

	    if (this._overlayWrapper) {
	      this.getContainerDOMNode().removeChild(this._overlayWrapper);
	      this._overlayWrapper = null;
	    }
	  },

	  // Create Overlay wrapper
	  _mountOverlayWrapper: function _mountOverlayWrapper() {
	    this._overlayWrapper = document.createElement('div');
	    this.getContainerDOMNode().appendChild(this._overlayWrapper);
	  },

	  // Render Overlay to wrapper
	  _renderOverlay: function _renderOverlay() {
	    if (!this._overlayWrapper) {
	      this._mountOverlayWrapper();
	    }

	    var overlay = this.renderOverlay();

	    if (overlay !== null) {
	      this._overlayInstance = ReactDOM.render(overlay, this._overlayWrapper);
	    } else {
	      // Unmount if the component is null for transitions to null
	      this._unmountOverlay();
	    }
	  },

	  // Remove a mounted Overlay from wrapper
	  _unmountOverlay: function _unmountOverlay() {
	    ReactDOM.unmountComponentAtNode(this._overlayWrapper);
	    this._overlayInstance = null;
	  },

	  getOverlayDOMNode: function getOverlayDOMNode() {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to' + ' have a DOM node.');
	    }

	    if (this._overlayInstance) {
	      return ReactDOM.findDOMNode(this._overlayInstance);
	    }

	    return null;
	  },

	  getContainerDOMNode: function getContainerDOMNode() {
	    return ReactDOM.findDOMNode(this.props.container) || document.body;
	  }
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Popover = React.createClass({
	  displayName: 'Popover',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	    positionLeft: React.PropTypes.number,
	    positionTop: React.PropTypes.number,
	    amSize: React.PropTypes.oneOf(['sm', 'lg']),
	    amStyle: React.PropTypes.string,
	    onRequestHide: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'popover'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var style = {
	      left: this.props.positionLeft,
	      top: this.props.positionTop,
	      display: 'block'
	    };
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.setClassNamespace('active')] = true;
	    classSet[this.prefixClass(this.props.placement)] = true;

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        style: style,
	        className: classNames(classSet, this.props.className)
	      }),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('inner') },
	        this.props.children
	      ),
	      React.createElement('div', { className: this.prefixClass('caret') })
	    );
	  }
	});

	module.exports = Popover;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var cloneElement = React.cloneElement;
	var OverlayMixin = __webpack_require__(65);
	var assign = __webpack_require__(31);
	var dom = __webpack_require__(63);
	var createChainedFunction = __webpack_require__(35);

	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}

	var PopoverTrigger = React.createClass({
	  displayName: 'PopoverTrigger',

	  mixins: [OverlayMixin],

	  propTypes: {
	    trigger: React.PropTypes.oneOfType([React.PropTypes.oneOf(['click', 'hover', 'focus']), React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))]),
	    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	    delay: React.PropTypes.number,
	    delayOpen: React.PropTypes.number,
	    delayClose: React.PropTypes.number,
	    defaultPopoverActive: React.PropTypes.bool,
	    popover: React.PropTypes.node.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      placement: 'right',
	      trigger: ['hover', 'focus']
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isPopoverActive: this.props.defaultPopoverActive == null ? false : this.props.defaultPopoverActive,
	      popoverLeft: null,
	      popoverTop: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.defaultPopoverActive) {
	      this.updatePopoverPosition();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this._hoverDelay);
	  },

	  open: function open() {
	    this.setState({
	      isPopoverActive: true
	    }, function () {
	      this.updatePopoverPosition();
	    });
	  },

	  close: function close() {
	    this.setState({
	      isPopoverActive: false
	    });
	  },

	  toggle: function toggle() {
	    this.state.isPopoverActive ? this.close() : this.open();
	  },

	  handleDelayedOpen: function handleDelayedOpen() {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayOpen != null ? this.props.delayOpen : this.props.delay;

	    if (!delay) {
	      this.open();
	      return;
	    }

	    this._hoverDelay = setTimeout(function () {
	      this._hoverDelay = null;
	      this.open();
	    }.bind(this), delay);
	  },

	  handleDelayedClose: function handleDelayedClose() {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayClose != null ? this.props.delayClose : this.props.delay;

	    if (!delay) {
	      this.close();
	      return;
	    }

	    this._hoverDelay = setTimeout(function () {
	      this._hoverDelay = null;
	      this.close();
	    }.bind(this), delay);
	  },

	  updatePopoverPosition: function updatePopoverPosition() {
	    if (!this.isMounted()) {
	      return;
	    }

	    var position = this.calcPopoverPosition();

	    this.setState({
	      popoverLeft: position.left,
	      popoverTop: position.top
	    });
	  },

	  calcPopoverPosition: function calcPopoverPosition() {
	    var childOffset = this.getPosition();
	    var popoverNode = this.getOverlayDOMNode();
	    var popoverHeight = popoverNode.offsetHeight;
	    var popoverWidth = popoverNode.offsetWidth;
	    var caretSize = 8;

	    switch (this.props.placement) {
	      case 'right':
	        return {
	          top: childOffset.top + childOffset.height / 2 - popoverHeight / 2,
	          left: childOffset.left + childOffset.width + caretSize
	        };
	      case 'left':
	        return {
	          top: childOffset.top + childOffset.height / 2 - popoverHeight / 2,
	          left: childOffset.left - popoverWidth - caretSize
	        };
	      case 'top':
	        return {
	          top: childOffset.top - popoverHeight - caretSize,
	          left: childOffset.left + childOffset.width / 2 - popoverWidth / 2
	        };
	      case 'bottom':
	        return {
	          top: childOffset.top + childOffset.height + caretSize,
	          left: childOffset.left + childOffset.width / 2 - popoverWidth / 2
	        };
	      default:
	        throw new Error('calcPopoverPosition(): No such placement of [' + this.props.placement + '] found.');
	    }
	  },

	  getPosition: function getPosition() {
	    var node = ReactDOM.findDOMNode(this);
	    var container = this.getContainerDOMNode();

	    var offset = container.tagName === 'BODY' ? dom.offset(node) : dom.position(node, container);

	    return assign({}, offset, {
	      height: node.offsetHeight,
	      width: node.offsetWidth
	    });
	  },

	  // used by Mixin
	  renderOverlay: function renderOverlay() {
	    if (!this.state.isPopoverActive) {
	      return React.createElement('span', null);
	    }

	    var popover = this.props.popover;

	    return cloneElement(this.props.popover, {
	      onRequestHide: this.close,
	      placement: this.props.placement,
	      positionLeft: this.state.popoverLeft,
	      positionTop: this.state.popoverTop,
	      amStyle: popover.props.amStyle || this.props.amStyle,
	      amSize: popover.props.amSize || this.props.amSize
	    });
	  },

	  render: function render() {
	    var child = React.Children.only(this.props.children);

	    var props = {};

	    props.onClick = createChainedFunction(child.props.onClick, this.props.onClick);

	    if (isOneOf('click', this.props.trigger)) {
	      props.onClick = createChainedFunction(this.toggle, props.onClick);
	    }

	    if (isOneOf('hover', this.props.trigger)) {
	      props.onMouseOver = createChainedFunction(this.handleDelayedOpen, this.props.onMouseOver);
	      props.onMouseOut = createChainedFunction(this.handleDelayedClose, this.props.onMouseOut);
	    }

	    if (isOneOf('focus', this.props.trigger)) {
	      props.onFocus = createChainedFunction(this.handleDelayedOpen, this.props.onFocus);
	      props.onBlur = createChainedFunction(this.handleDelayedClose, this.props.onBlur);
	    }

	    return cloneElement(child, props);
	  }
	});

	module.exports = PopoverTrigger;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * React version of NProgress
	 * https://github.com/rstacruz/nprogress/
	 */

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var ClassNameMixin = __webpack_require__(8);

	function clamp(n, min, max) {
	  if (n < min) {
	    return min;
	  }

	  if (n > max) {
	    return max;
	  }

	  return n;
	}

	function toBarPercentage(n) {
	  return (-1 + n) * 100;
	}

	var NProgress = React.createClass({
	  displayName: 'NProgress',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    minimum: React.PropTypes.number,
	    easing: React.PropTypes.string,
	    speed: React.PropTypes.number,
	    spinner: React.PropTypes.bool,
	    trickle: React.PropTypes.bool,
	    trickleRate: React.PropTypes.number,
	    trickleSpeed: React.PropTypes.number
	  },

	  getInitialState: function getInitialState() {
	    return {
	      status: null
	    };
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      minimum: 0.08,
	      easing: 'ease',
	      speed: 200,
	      trickle: true,
	      trickleRate: 0.02,
	      trickleSpeed: 800
	    };
	  },

	  start: function start() {
	    var _this = this;
	    var n = this.state.status; // this.set() is not sync to affected this.state.status

	    if (!this.state.status) {
	      this.set(this.props.minimum);
	      n = this.props.minimum;
	    }

	    var work = function work() {
	      setTimeout(function () {
	        if (!n || n === 1) {
	          return;
	        }

	        _this.trickle();
	        work();
	      }, _this.props.trickleSpeed);
	    };

	    this.props.trickle && work();
	  },

	  set: function set(n) {
	    var _this = this;

	    n = clamp(n, this.props.minimum, 1);
	    this.setState({
	      status: n
	    });

	    if (n === 1) {
	      var progress = ReactDOM.findDOMNode(this.refs.progress);

	      progress.style.opacity = 1;
	      progress.style.transition = 'none';
	      progress.offsetWidth;

	      setTimeout(function () {
	        progress.style.opacity = 0;
	        progress.style.transition = 'all ' + _this.props.speed + 'ms linear';

	        setTimeout(function () {
	          _this.reset();
	        }, _this.props.speed + 100);
	      }, _this.props.speed);
	    }
	  },

	  reset: function reset() {
	    this.setState({
	      status: null
	    });
	  },

	  done: function done() {
	    if (this.state.status) {
	      this.inc(0.3 + 0.5 * Math.random());
	      this.set(1);
	    }
	  },

	  inc: function inc(amount) {
	    var n = this.state.status;

	    if (!n) {
	      return this.start();
	    } else {
	      if (typeof amount !== 'number') {
	        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
	      }

	      n = clamp(n + amount, 0, 0.994);
	      return this.set(n);
	    }
	  },

	  trickle: function trickle() {
	    if (this.state.status < 1) {
	      this.inc(Math.random() * this.props.trickleRate);
	    }
	  },

	  render: function render() {
	    var props = this.props;
	    var percent = this.state.status === null ? '-100' : toBarPercentage(this.state.status);
	    var barStyle = {
	      transition: 'all ' + props.speed + 'ms ' + props.easing,
	      transform: 'translate(' + percent + '%,0)'
	    };
	    var spinner = props.spinner ? React.createElement(
	      'div',
	      { className: 'nprogress-spinner', ref: 'spinner' },
	      React.createElement('div', { className: 'nprogress-spinner-icon' })
	    ) : null;

	    return this.state.status ? React.createElement(
	      'div',
	      { id: 'nprogress', ref: 'progress' },
	      React.createElement(
	        'div',
	        { className: 'nprogress-bar', ref: 'bar', style: barStyle },
	        React.createElement('div', { className: 'nprogress-peg' })
	      ),
	      spinner
	    ) : null;
	  }
	});

	module.exports = NProgress;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var cloneElement = React.cloneElement;
	var assign = __webpack_require__(31);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var isInViewport = __webpack_require__(70);
	var Events = __webpack_require__(53);
	var TransitionEvents = __webpack_require__(39);
	var requestAnimationFrame = __webpack_require__(71);
	var debounce = __webpack_require__(72);
	var canUseDOM = __webpack_require__(40);
	var domUtils = __webpack_require__(63);

	var ScrollSpy = React.createClass({
	  displayName: 'ScrollSpy',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    animation: React.PropTypes.string,
	    delay: React.PropTypes.number,
	    repeat: React.PropTypes.bool,
	    // container which has scrollbar
	    container: React.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: 'fade',
	      delay: 0,
	      repeat: false
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      inViewport: false
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (canUseDOM) {
	      this.checkRAF();

	      var node = ReactDOM.findDOMNode(this);
	      var doc = domUtils.ownerDocument(node);
	      // var scrollContainer = ReactDOM.findDOMNode(this.props.container || doc.body);
	      var debounced = debounce(this.checkRAF, 100).bind(this);

	      this._scrollListener = Events.on(doc, 'scroll', debounced);
	      this._resizeListener = Events.on(window, 'resize', debounced);
	      this._orientationListener = Events.on(window, 'orientationchange', debounced);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._removeEventLister();
	  },

	  _removeEventLister: function _removeEventLister() {
	    this._scrollListener && this._scrollListener.off();
	    this._resizeListener && this._resizeListener.off();
	    this._orientationListener && this._orientationListener.off();
	    clearTimeout(this._timer);
	  },

	  checkIsInView: function checkIsInView() {
	    if (!TransitionEvents.support.animationend) {
	      return;
	    }

	    if (this.isMounted()) {
	      var isInView = isInViewport(ReactDOM.findDOMNode(this));

	      if (isInView && !this.state.inViewport) {
	        if (this._timer) {
	          clearTimeout(this._timer);
	        }

	        this._timer = setTimeout(function () {
	          this.setState({
	            inViewport: true
	          });
	        }.bind(this), this.props.delay);
	      }

	      if (this.props.repeat && !isInView) {
	        this.setState({
	          inViewport: false
	        });
	      }
	    }
	  },

	  checkRAF: function checkRAF() {
	    requestAnimationFrame(this.checkIsInView);
	  },

	  render: function render() {
	    var animation = this.state.inViewport ? this.setClassNamespace('animation-' + this.props.animation) : null;
	    var child = React.Children.only(this.props.children);

	    // transfer child's props to cloned element
	    return cloneElement(child, assign({}, child.props, {
	      className: classNames(child.props.className, animation),
	      'data-am-scrollspy': 'animation' // style helper
	    }));
	  }
	});

	module.exports = ScrollSpy;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * isInViewport
	 *
	 * @desc determine if any part of the element is visible in the viewport
	 * @reference https://github.com/Josh-Miller/isInViewport
	 * @see http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	 * @param {HTMLElement} element
	 * @returns {boolean}
	 */

	function isInViewport(element) {
	  var top = element.offsetTop;
	  var left = element.offsetLeft;
	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  while (element.offsetParent) {
	    element = element.offsetParent;
	    top += element.offsetTop;
	    left += element.offsetLeft;
	  }

	  return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset;
	}

	module.exports = isInViewport;

	// TODO: 考虑滚动条不在窗口上的情形

/***/ },
/* 71 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * modified version of:
	 * https://github.com/facebook/react/blob/0.13-stable/src/vendor/core/requestAnimationFrame.js
	 */

	'use strict';

	var nativeRAF = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame;

	var lastTime = 0;

	var requestAnimationFrame = nativeRAF || function (callback) {
	  var currTime = Date.now();
	  var timeDelay = Math.max(0, 16 - (currTime - lastTime));

	  lastTime = currTime + timeDelay;
	  return global.setTimeout(function () {
	    callback(Date.now());
	  }, timeDelay);
	};

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(function () {});

	module.exports = requestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Debounce function
	 * @param {function} fn  Function to be debounced
	 * @param {number} wait Function execution threshold in milliseconds
	 * @param {bool} immediate  Whether the function should be called at
	 *                          the beginning of the delay instead of the
	 *                          end. Default is false.
	 * @desc Executes a function when it stops being invoked for n seconds
	 * @via  _.debounce() http://underscorejs.org
	 */

	module.exports = function (fn, wait, immediate) {
	  var timeout;

	  return function () {
	    var context = this;
	    var args = arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) {
	        fn.apply(context, args);
	      }
	    };
	    var callNow = immediate && !timeout;

	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);

	    if (callNow) {
	      fn.apply(context, args);
	    }
	  };
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var cloneElement = React.cloneElement;
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var classNames = __webpack_require__(3);
	var SmoothScrollMixin = __webpack_require__(74);
	var isInViewport = __webpack_require__(70);
	var Events = __webpack_require__(53);
	var requestAnimationFrame = __webpack_require__(71);
	var debounce = __webpack_require__(72);
	var CSSCore = __webpack_require__(16);
	var domUtils = __webpack_require__(63);
	var createChainedFunction = __webpack_require__(35);
	var canUseDOM = __webpack_require__(40);
	var constants = __webpack_require__(9);

	var ScrollSpyNav = React.createClass({
	  displayName: 'ScrollSpyNav',

	  mixins: [SmoothScrollMixin],

	  propTypes: {
	    activeClass: React.PropTypes.string,
	    offsetTop: React.PropTypes.number,
	    container: React.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      activeClass: constants.CLASSES.active
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (canUseDOM) {
	      this._init();
	      this.checkRAF();

	      var debounced = debounce(this.checkRAF, 100).bind(this);

	      this._scrollListener = Events.on(window, 'scroll', this.checkRAF);
	      this._resizeListener = Events.on(window, 'resize', debounced);
	      this._orientationListener = Events.on(window, 'orientationchange', debounced);
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._scrollListener && this._scrollListener.off();
	    this._resizeListener && this._resizeListener.off();
	    this._orientationListener && this._orientationListener.off();
	  },

	  _init: function _init() {
	    this._linkNodes = ReactDOM.findDOMNode(this).querySelectorAll('a[href^="#"]');
	    this._anchorNodes = [];

	    Array.prototype.forEach.call(this._linkNodes, function (link) {
	      var anchor = document.getElementById(link.getAttribute('href').substr(1));

	      if (anchor) {
	        this._anchorNodes.push(anchor);
	      }
	    }.bind(this));
	  },

	  checkIsInView: function checkIsInView() {
	    if (this.isMounted()) {
	      var inViewsNodes = [];

	      this._anchorNodes.forEach(function (anchor) {
	        if (isInViewport(anchor)) {
	          inViewsNodes.push(anchor);
	        }
	      });

	      if (inViewsNodes.length) {
	        var targetNode;

	        inViewsNodes.every(function (node) {
	          if (domUtils.offset(node).top >= domUtils.scrollTop(window)) {
	            targetNode = node;
	            return false; // break loop
	          }
	          return true;
	        });

	        if (!targetNode) {
	          return;
	        }

	        Array.prototype.forEach.call(this._linkNodes, function (link) {
	          CSSCore.removeClass(link, this.props.activeClass);
	        }.bind(this));

	        var targetLink = ReactDOM.findDOMNode(this).querySelector('a[href="#' + targetNode.id + '"]');

	        targetLink && CSSCore.addClass(targetLink, this.props.activeClass);
	      }
	    }
	  },

	  checkRAF: function checkRAF() {
	    requestAnimationFrame(this.checkIsInView);
	  },

	  // Smooth scroll
	  handleClick: function handleClick(e) {
	    e.preventDefault();

	    if (e.target && e.target.nodeName === 'A') {
	      var targetNode = document.getElementById(e.target.getAttribute('href').substr(1));

	      // TODO: set scroll element if `container` prop set
	      targetNode && this.smoothScroll(window, {
	        position: domUtils.offset(targetNode).top - this.props.offsetTop || 0
	      });
	    }
	  },

	  render: function render() {
	    var child = React.Children.only(this.props.children);

	    // transfer child's props to cloned element
	    return cloneElement(child, assign({}, omit(this.props, Object.keys(this.constructor.propTypes)), child.props, {
	      onClick: createChainedFunction(this.handleClick, child.props.onClick),
	      className: classNames(this.props.className, child.props.className)
	    }));
	  }
	});

	module.exports = ScrollSpyNav;

	// TODO: improve in view logic

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * modified version of:
	 * http://mir.aculo.us/2014/01/19/scrolling-dom-elements-to-the-top-a-zepto-plugin/
	 */

	'use strict';

	var React = __webpack_require__(1);
	var Events = __webpack_require__(53);
	var dom = __webpack_require__(63);
	var rAF = __webpack_require__(71);
	var scrollInProgress = false;

	var SmoothScrollMixin = {
	  smoothScroll: function smoothScroll(element, options) {
	    options = options || {};
	    var scrollTarget = element || window;
	    var targetY = options.position && parseInt(options.position, 10) || 0;
	    var initialY = dom.scrollTop(scrollTarget);
	    var lastY = initialY;
	    var delta = targetY - initialY;
	    // duration in ms, make it a bit shorter for short distances
	    // this is not scientific and you might want to adjust this for
	    // your preferences
	    var speed = options.speed || Math.min(750, Math.min(1500, Math.abs(initialY - targetY)));
	    // temp variables (t will be a position between 0 and 1, y is the calculated scrollTop)
	    var start;
	    var t;
	    var y;
	    var cancelScroll = function cancelScroll() {
	      abort();
	    };

	    // abort if already in progress or nothing to scroll
	    if (scrollInProgress) {
	      // console.log(scrollInProgress);
	      return;
	    }

	    if (delta === 0) {
	      return;
	    }

	    // quint ease-in-out smoothing, from
	    // https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js#L127-L136
	    function smooth(pos) {
	      if ((pos /= 0.5) < 1) {
	        return 0.5 * Math.pow(pos, 5);
	      }

	      return 0.5 * (Math.pow(pos - 2, 5) + 2);
	    }

	    function abort() {
	      Events.off(scrollTarget, 'touchstart', cancelScroll);
	      scrollInProgress = false;
	    }

	    // when there's a touch detected while scrolling is in progress, abort
	    // the scrolling (emulates native scrolling behavior)
	    Events.on(scrollTarget, 'touchstart', cancelScroll);
	    scrollInProgress = true;

	    // start rendering away! note the function given to frame
	    // is named "render" so we can reference it again further down
	    rAF(function render(now) {
	      if (!scrollInProgress) {
	        return;
	      }

	      if (!start) {
	        start = now;
	      }

	      // calculate t, position of animation in [0..1]
	      t = Math.min(1, Math.max((now - start) / speed, 0));
	      // calculate the new scrollTop position (don't forget to smooth)
	      y = Math.round(initialY + delta * smooth(t));
	      // bracket scrollTop so we're never over-scrolling
	      if (delta > 0 && y > targetY) {
	        y = targetY;
	      }

	      if (delta < 0 && y < targetY) {
	        y = targetY;
	      }
	      // only actually set scrollTop if there was a change front he last frame
	      if (lastY !== y) {
	        dom.scrollTop(scrollTarget, y);
	      }

	      lastY = y;
	      // if we're not done yet, queue up an other frame to render,
	      // or clean up
	      if (y !== targetY) {
	        rAF(render);
	      } else {
	        abort();
	      }
	    });
	  }
	};

	module.exports = SmoothScrollMixin;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var Dropdown = __webpack_require__(59);
	var Icon = __webpack_require__(23);
	var Input = __webpack_require__(21);

	var Selected = React.createClass({
	  displayName: 'Selected',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    data: React.PropTypes.array.isRequired,
	    placeholder: React.PropTypes.string,
	    value: React.PropTypes.string,
	    multiple: React.PropTypes.bool,
	    searchBox: React.PropTypes.bool,
	    name: React.PropTypes.string,
	    onChange: React.PropTypes.func,
	    optionFilter: React.PropTypes.func,
	    dropup: React.PropTypes.bool,
	    btnWidth: React.PropTypes.number,
	    btnStyle: React.PropTypes.string,
	    btnSize: React.PropTypes.string,
	    maxHeight: React.PropTypes.number,

	    // delimiter to use to join multiple values
	    delimiter: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'selected',
	      placeholder: '点击选择...',
	      onChange: function onChange() {},
	      value: '',
	      delimiter: ',',
	      optionFilter: function optionFilter(filterText, option) {
	        return option.label.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      value: this.props.value,
	      dropdownWidth: null,
	      filterText: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.setDropdownWidth();
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.value !== nextProps.value) {
	      this.setState({
	        value: nextProps.value
	      });
	    }
	  },

	  setDropdownWidth: function setDropdownWidth() {
	    if (this.isMounted()) {
	      var toggleButton = ReactDOM.findDOMNode(this.refs.dropdown.refs.dropdownToggle);

	      toggleButton && this.setState({ dropdownWidth: toggleButton.offsetWidth });
	    }
	  },

	  getValueArray: function getValueArray() {
	    return this.state.value ? this.state.value.split(this.props.delimiter) : [];
	  },

	  hasValue: function hasValue(value) {
	    return this.getValueArray().indexOf(value) > -1;
	  },

	  setValue: function setValue(value, callback) {
	    this.setState({
	      value: value
	    }, function () {
	      this.props.onChange(value);
	      callback && callback();
	    });
	  },

	  handleCheck: function handleCheck(option, e) {
	    e.preventDefault();

	    var clickedValue = option.value;

	    // multiple select
	    if (this.props.multiple) {
	      var values = this.getValueArray();

	      if (this.hasValue(clickedValue)) {
	        values.splice(values.indexOf(clickedValue), 1);
	      } else {
	        values.push(clickedValue);
	      }

	      this.setValue(values.join(this.props.delimiter));
	    } else {
	      this.setValue(clickedValue);
	      this.refs.dropdown.setDropdown(false);
	    }
	  },

	  handleUserInput: function handleUserInput(e) {
	    e.preventDefault();

	    this.setState({
	      filterText: ReactDOM.findDOMNode(this.refs.filterInput).value
	    });
	  },

	  // clear filter
	  clearFilterInput: function clearFilterInput() {
	    if (this.props.multiple && this.props.searchBox) {
	      this.setState({
	        filterText: null
	      });
	      ReactDOM.findDOMNode(this.refs.filterInput).value = null;
	    }
	  },

	  // API for getting component value
	  getValue: function getValue() {
	    return this.state.value;
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var selectedLabel = [];
	    var items = [];
	    var filterText = this.state.filterText;
	    var groupHeader;

	    this.props.data.forEach(function (option, i) {
	      var checked = this.hasValue(option.value);
	      var checkedClass = checked ? this.setClassNamespace('checked') : null;
	      var checkedIcon = checked ? React.createElement(Icon, { icon: 'check' }) : null;

	      checked && selectedLabel.push(option.label);

	      // add group header
	      if (option.group && groupHeader !== option.group) {
	        groupHeader = option.group;
	        items.push(React.createElement(
	          'li',
	          {
	            className: this.prefixClass('list-header'),
	            key: 'header' + i
	          },
	          groupHeader
	        ));
	      }

	      if (filterText && !this.props.optionFilter(filterText, option)) {
	        return;
	      }

	      items.push(React.createElement(
	        'li',
	        {
	          className: checkedClass,
	          onClick: this.handleCheck.bind(this, option),
	          key: i
	        },
	        React.createElement(
	          'span',
	          { className: this.prefixClass('text') },
	          option.label
	        ),
	        checkedIcon
	      ));
	    }.bind(this));

	    var status = React.createElement(
	      'span',
	      {
	        className: classNames(this.prefixClass('status'), this.setClassNamespace('fl'))
	      },
	      selectedLabel.length ? selectedLabel.join(', ') : React.createElement(
	        'span',
	        { className: this.prefixClass('placeholder ') },
	        this.props.placeholder
	      )
	    );
	    var optionsStyle = {};

	    if (this.props.maxHeight) {
	      optionsStyle = {
	        maxHeight: this.props.maxHeight,
	        overflowY: 'scroll'
	      };
	    }

	    return React.createElement(
	      Dropdown,
	      {
	        className: classNames(this.props.className, classSet),
	        title: status,
	        onClose: this.clearFilterInput,
	        btnStyle: this.props.btnStyle,
	        btnSize: this.props.btnSize,
	        btnInlineStyle: { width: this.props.btnWidth },
	        contentInlineStyle: { minWidth: this.state.dropdownWidth },
	        toggleClassName: this.prefixClass('btn'),
	        caretClassName: this.prefixClass('icon'),
	        contentClassName: this.prefixClass('content'),
	        contentTag: 'div',
	        dropup: this.props.dropup,
	        ref: 'dropdown'
	      },
	      this.props.searchBox ? React.createElement(
	        'div',
	        { className: this.prefixClass('search') },
	        React.createElement(Input, {
	          onChange: this.handleUserInput,
	          autoComplete: 'off',
	          standalone: true,
	          ref: 'filterInput'
	        })
	      ) : null,
	      React.createElement(
	        'ul',
	        {
	          style: optionsStyle,
	          className: this.prefixClass('list')
	        },
	        items
	      ),
	      React.createElement('input', {
	        name: this.props.name,
	        type: 'hidden',
	        ref: 'selectedField',
	        value: this.state.value
	      })
	    );
	  }
	});

	module.exports = Selected;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var TransitionEvents = __webpack_require__(39);

	//React.initializeTouchEvents(true);

	var Slider = React.createClass({
	  displayName: 'Slider',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'a1', 'a2', 'a3', 'a4', 'a5', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'd3']),
	    directionNav: React.PropTypes.bool, // prev/next icon
	    controlNav: React.PropTypes.bool,

	    animation: React.PropTypes.string, // not working
	    slide: React.PropTypes.bool,
	    autoPlay: React.PropTypes.bool,
	    slideSpeed: React.PropTypes.number, // interval
	    loop: React.PropTypes.bool, // loop slide

	    pauseOnHover: React.PropTypes.bool,
	    touch: React.PropTypes.bool, // TODO: add touch support

	    onSelect: React.PropTypes.func,
	    onSlideEnd: React.PropTypes.func,
	    activeIndex: React.PropTypes.number,
	    defaultActiveIndex: React.PropTypes.number,
	    direction: React.PropTypes.oneOf(['prev', 'next'])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'slider',
	      theme: 'default',
	      directionNav: true,
	      controlNav: true,
	      slide: true,
	      autoPlay: true,
	      loop: true,
	      slideSpeed: 5000,
	      pauseOnHover: true
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
	      previousActiveIndex: null,
	      direction: null
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var activeIndex = this.getActiveIndex();

	    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
	      clearTimeout(this.timeout);
	      this.setState({
	        previousActiveIndex: activeIndex,
	        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
	      });
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.props.autoPlay && this.waitForNext();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this.timeout);
	  },

	  getDirection: function getDirection(prevIndex, index) {
	    if (prevIndex === index) {
	      return null;
	    }

	    return prevIndex > index ? 'prev' : 'next';
	  },

	  next: function next(e) {
	    e && e.preventDefault();

	    var index = this.getActiveIndex() + 1;
	    var count = React.Children.count(this.props.children);

	    if (index > count - 1) {
	      if (!this.props.loop) {
	        return;
	      }
	      index = 0;
	    }

	    this.handleSelect(index, 'next');
	  },

	  prev: function prev(e) {
	    e && e.preventDefault();

	    var index = this.getActiveIndex() - 1;

	    if (index < 0) {
	      if (!this.props.loop) {
	        return;
	      }
	      index = React.Children.count(this.props.children) - 1;
	    }

	    this.handleSelect(index, 'prev');
	  },

	  pause: function pause() {
	    this.isPaused = true;
	    clearTimeout(this.timeout);
	  },

	  play: function play() {
	    this.isPaused = false;
	    this.waitForNext();
	  },

	  waitForNext: function waitForNext() {
	    if (!this.isPaused && this.props.slide && this.props.slideSpeed && this.props.activeIndex == null) {
	      this.timeout = setTimeout(this.next, this.props.slideSpeed);
	    }
	  },

	  handleMouseOver: function handleMouseOver() {
	    if (this.props.pauseOnHover) {
	      this.pause();
	    }
	  },

	  handleMouseOut: function handleMouseOut() {
	    if (this.isPaused) {
	      this.play();
	    }
	  },

	  getActiveIndex: function getActiveIndex() {
	    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
	  },

	  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
	    this.setState({
	      previousActiveIndex: null,
	      direction: null
	    }, function () {
	      this.waitForNext();

	      if (this.props.onSlideEnd) {
	        this.props.onSlideEnd();
	      }
	    });
	  },

	  handleSelect: function handleSelect(index, direction, e) {
	    e && e.preventDefault();
	    clearTimeout(this.timeout);

	    var previousActiveIndex = this.getActiveIndex();

	    direction = direction || this.getDirection(previousActiveIndex, index);

	    if (this.props.onSelect) {
	      this.props.onSelect(index, direction);
	    }

	    if (this.props.activeIndex == null && index !== previousActiveIndex) {
	      if (this.state.previousActiveIndex != null) {
	        // If currently animating don't activate the new index.
	        // TODO: look into queuing this canceled call and
	        // animating after the current animation has ended.
	        return;
	      }

	      this.setState({
	        activeIndex: index,
	        previousActiveIndex: previousActiveIndex,
	        direction: direction
	      });
	    }
	  },

	  renderDirectionNav: function renderDirectionNav() {
	    return this.props.directionNav ? React.createElement(
	      'ul',
	      { className: this.setClassNamespace('direction-nav') },
	      React.createElement(
	        'li',
	        null,
	        React.createElement(
	          'a',
	          {
	            onClick: this.prev,
	            className: this.setClassNamespace('prev'),
	            href: '#prev' },
	          'Previous'
	        )
	      ),
	      React.createElement(
	        'li',
	        null,
	        React.createElement(
	          'a',
	          {
	            onClick: this.next,
	            className: this.setClassNamespace('next'),
	            href: '#next' },
	          'Next'
	        )
	      )
	    ) : null;
	  },

	  renderControlNav: function renderControlNav() {
	    if (this.props.controlNav) {
	      var isThumbnailNav = false;
	      var children = React.Children.map(this.props.children, function (child, i) {
	        var className = i === this.getActiveIndex() ? this.setClassNamespace('active') : null;

	        if (!isThumbnailNav) {
	          isThumbnailNav = !!child.props.thumbnail;
	        }

	        var thumb = child.props.thumbnail;

	        return React.createElement(
	          'li',
	          {
	            onClick: this.handleSelect.bind(this, i, null),
	            key: i
	          },
	          thumb ? React.createElement('img', { className: className, src: thumb }) : React.createElement('a', { href: '#' + i, className: className }),
	          React.createElement('i', null)
	        );
	      }.bind(this));
	      var controlClass = this.setClassNamespace('control-' + (isThumbnailNav ? 'thumbs' : 'paging'));

	      return React.createElement(
	        'ol',
	        {
	          className: classNames(this.setClassNamespace('control-nav'), controlClass) },
	        children
	      );
	    }

	    return null;
	  },

	  renderItem: function renderItem(child, index) {
	    var activeIndex = this.getActiveIndex();
	    var isActive = index === activeIndex;
	    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;

	    return React.cloneElement(child, {
	      active: isActive,
	      ref: child.ref,
	      key: child.key ? child.key : index,
	      index: index,
	      animateOut: isPreviousActive,
	      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
	      direction: this.state.direction,
	      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
	    });
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var viewportStyle = {
	      overflow: 'hidden',
	      position: 'relative',
	      width: '100%'
	    };
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // React version slider style
	    classSet[this.prefixClass('slide')] = true;

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        className: classNames(classSet, this.props.className),
	        onMouseOver: this.handleMouseOver,
	        onMouseOut: this.handleMouseOut
	      }),
	      React.createElement(
	        'div',
	        {
	          className: this.setClassNamespace('viewport'),
	          style: viewportStyle
	        },
	        React.createElement(
	          'ul',
	          { className: this.setClassNamespace('slides') },
	          React.Children.map(this.props.children, this.renderItem)
	        )
	      ),
	      this.renderDirectionNav(),
	      this.renderControlNav()
	    );
	  }
	});

	Slider.Item = React.createClass({
	  displayName: 'Item',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['prev', 'next']),
	    onAnimateOutEnd: React.PropTypes.func,
	    active: React.PropTypes.bool,
	    animateIn: React.PropTypes.bool,
	    animateOut: React.PropTypes.bool,
	    caption: React.PropTypes.node,
	    index: React.PropTypes.number,
	    thumbnail: React.PropTypes.string
	  },

	  getInitialState: function getInitialState() {
	    return {
	      direction: null
	    };
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: true
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.active !== nextProps.active) {
	      this.setState({
	        direction: null
	      });
	    }
	  },

	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    if (!this.props.active && prevProps.active) {
	      TransitionEvents.on(ReactDOM.findDOMNode(this), this.handleAnimateOutEnd);
	    }

	    if (this.props.active !== prevProps.active) {
	      setTimeout(this.startAnimation, 20);
	    }
	  },

	  handleAnimateOutEnd: function handleAnimateOutEnd() {
	    if (this.props.onAnimateOutEnd && this.isMounted()) {
	      this.props.onAnimateOutEnd(this.props.index);
	    }
	  },

	  startAnimation: function startAnimation() {
	    if (!this.isMounted()) {
	      return;
	    }

	    this.setState({
	      direction: this.props.direction === 'prev' ? 'right' : 'left'
	    });
	  },

	  render: function render() {
	    var classSet = {
	      active: this.props.active && !this.props.animateIn || this.props.animateOut,
	      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
	      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
	    };

	    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
	      classSet[this.state.direction] = true;
	    }

	    return React.createElement(
	      'li',
	      {
	        className: classNames(this.props.className, classSet)
	      },
	      this.props.children
	    );
	  }
	});

	module.exports = Slider;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var assign = __webpack_require__(31);
	var omit = __webpack_require__(4);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var Events = __webpack_require__(53);
	var debounce = __webpack_require__(72);
	var domUtils = __webpack_require__(63);
	var canUseDOM = __webpack_require__(40);

	var Sticky = React.createClass({
	  displayName: 'Sticky',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    media: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    top: React.PropTypes.number,
	    animation: React.PropTypes.string,
	    bottom: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.func])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'sticky',
	      top: 0
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      sticked: false,
	      holderStyle: null,
	      initialized: false,
	      stickerStyle: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (canUseDOM) {
	      this._init();
	      this.checkPosition();
	      var ownerWindow = domUtils.ownerWindow(ReactDOM.findDOMNode(this.refs.sticker));

	      this._scrollListener = Events.on(ownerWindow, 'scroll', debounce(this.checkPosition, 10).bind(this));
	      this._resizeListener = Events.on(ownerWindow, 'resize', debounce(this.checkPosition, 50).bind(this));
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._scrollListener && this._scrollListener.off();
	    this._resizeListener && this._resizeListener.off();
	  },

	  _init: function _init() {
	    if (this.state.initialized || !this.isMounted() || !this.checkMedia()) {
	      return;
	    }

	    var sticker = ReactDOM.findDOMNode(this.refs.sticker);
	    var elStyle = getComputedStyle(sticker);
	    var outerHeight = parseInt(elStyle.height, 10) + parseInt(elStyle.marginTop, 10) + parseInt(elStyle.marginBottom, 10);
	    var style = {
	      height: elStyle.position !== 'absolute' ? outerHeight : '',
	      float: elStyle.float !== 'none' ? elStyle.float : '',
	      margin: elStyle.margin
	    };

	    this.setState({
	      initialized: true,
	      holderStyle: style,
	      stickerStyle: {
	        margin: 0
	      }
	    });
	  },

	  checkPosition: function checkPosition() {
	    if (this.isMounted) {
	      var scrollTop = domUtils.scrollTop(window);
	      var offsetTop = this.props.top;
	      var offsetBottom = this.props.bottom;
	      var holder = ReactDOM.findDOMNode(this);

	      if (typeof offsetBottom === 'function') {
	        offsetBottom = offsetBottom();
	      }

	      var checkResult = scrollTop > domUtils.offset(holder).top;

	      if (checkResult && !this.state.sticked) {
	        this.setState({
	          stickerStyle: {
	            top: offsetTop,
	            left: domUtils.offset(holder).left,
	            width: holder.offsetWidth
	          }
	        });
	      }

	      if (this.state.sticked && !checkResult) {
	        this.resetSticker();
	      }

	      this.setState({
	        sticked: checkResult
	      });
	    }
	  },

	  checkMedia: function checkMedia() {
	    // TODO: add element visible detector
	    /*if (!this.$element.is(':visible')) {
	     return false;
	     }*/

	    var media = this.props.media;

	    if (media) {
	      switch (typeof media === 'undefined' ? 'undefined' : _typeof(media)) {
	        case 'number':
	          if (window.innerWidth < media) {
	            return false;
	          }
	          break;

	        case 'string':
	          if (window.matchMedia && !window.matchMedia(media).matches) {
	            return false;
	          }
	          break;
	      }
	    }

	    return true;
	  },

	  resetSticker: function resetSticker() {
	    this.setState({
	      stickerStyle: {
	        position: '',
	        top: '',
	        width: '',
	        left: '',
	        margin: 0
	      }
	    });
	  },

	  // Smooth scroll
	  handleClick: function handleClick(e) {
	    e.preventDefault();

	    if (e.target && e.target.nodeName === 'A') {
	      var targetNode = document.getElementById(e.target.getAttribute('href').substr(1));

	      targetNode && this.smoothScroll(window, {
	        position: domUtils.offset(targetNode).top - this.props.offsetTop || 0
	      });
	    }
	  },

	  render: function render() {
	    var stickyClass = this.getClassSet();
	    var child = React.Children.only(this.props.children);
	    var animation = this.props.animation && this.state.sticked ? this.setClassNamespace('animation-' + this.props.animation) : null;
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // transfer child's props to cloned element
	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        style: this.state.holderStyle,
	        className: classNames(this.props.className, this.prefixClass('placeholder'))
	      }),
	      React.cloneElement(child, assign({}, child.props, {
	        style: this.state.stickerStyle,
	        ref: 'sticker',
	        className: classNames(child.props.className, this.state.sticked ? stickyClass : null, animation)
	      }))
	    );
	  }
	});

	module.exports = Sticky;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var CollapseMixin = __webpack_require__(38);

	var Accordion = React.createClass({
	  displayName: 'Accordion',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'basic', 'gapped']),
	    data: React.PropTypes.array,
	    activeKey: React.PropTypes.any,
	    defaultActiveKey: React.PropTypes.any
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'accordion',
	      theme: 'default'
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      activeKey: this.props.defaultActiveKey
	    };
	  },

	  handleSelect: function handleSelect(e, key) {
	    e.preventDefault();

	    if (this.state.activeKey === key) {
	      key = null;
	    }

	    this.setState({
	      activeKey: key
	    });
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass(this.props.theme)] = true;

	    return React.createElement(
	      'section',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(classSet, this.props.className)
	      }),
	      this.props.data.map(function (item, index) {
	        return React.createElement(
	          Accordion.Item,
	          {
	            title: item.title,
	            expanded: item.active && item.disabled,
	            defaultExpanded: item.active && !item.disabled,
	            eventKey: index,
	            key: index
	          },
	          item.content
	        );
	      })
	    );
	  }
	});

	Accordion.Item = React.createClass({
	  displayName: 'Item',

	  mixins: [ClassNameMixin, CollapseMixin],

	  propTypes: {
	    title: React.PropTypes.node,
	    expanded: React.PropTypes.bool
	  },

	  handleToggle: function handleToggle() {
	    this.setState({
	      expanded: !this.state.expanded
	    });
	  },

	  getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
	    return ReactDOM.findDOMNode(this.refs.panel).scrollHeight;
	  },

	  getCollapsibleDOMNode: function getCollapsibleDOMNode() {
	    if (!this.isMounted() || !this.refs || !this.refs.panel) {
	      return null;
	    }

	    return ReactDOM.findDOMNode(this.refs.panel);
	  },

	  render: function render() {
	    return React.createElement(
	      'dl',
	      {
	        className: classNames(this.setClassNamespace('accordion-item'), this.isExpanded() ? this.setClassNamespace('active') : null, this.props.expanded ? this.setClassNamespace('disabled') : null)
	      },
	      React.createElement(
	        'dt',
	        {
	          onClick: this.handleToggle,
	          className: this.setClassNamespace('accordion-title')
	        },
	        this.props.title
	      ),
	      React.createElement(
	        'dd',
	        {
	          className: classNames(this.getCollapsibleClassSet()),
	          ref: 'panel' },
	        React.createElement('div', {
	          className: this.setClassNamespace('accordion-content'),
	          dangerouslySetInnerHTML: { __html: this.props.children }
	        })
	      )
	    );
	  }
	});

	module.exports = Accordion;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Divider = React.createClass({
	  displayName: 'Divider',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    theme: React.PropTypes.oneOf(['default', 'dotted', 'dashed']),
	    classPrefix: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'divider',
	      theme: 'default'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement('hr', _extends({}, restProps, {
	      'data-am-widget': this.props.classPrefix,
	      className: classNames(this.props.className, classSet)
	    }));
	  }
	});

	module.exports = Divider;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);

	var Footer = React.createClass({
	  displayName: 'Footer',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    theme: React.PropTypes.oneOf(['default']),
	    classPrefix: React.PropTypes.string,
	    mobileTitle: React.PropTypes.string,
	    mobileLink: React.PropTypes.string,
	    desktopTitle: React.PropTypes.string,
	    desktopLink: React.PropTypes.string,
	    onRequestMobile: React.PropTypes.func,
	    onRequestDesktop: React.PropTypes.func,
	    data: React.PropTypes.array
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'footer',
	      theme: 'default',
	      mobileTitle: '适配版',
	      desktopTitle: '电脑版'
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var MobileTag = this.props.mobileLink ? 'a' : 'span';
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'footer',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('switch') },
	        React.createElement(
	          MobileTag,
	          {
	            className: this.prefixClass('ysp'),
	            onClick: this.props.onRequestMobile,
	            href: this.props.mobileLink,
	            'data-rel': 'mobile'
	          },
	          this.props.mobileTitle
	        ),
	        React.createElement(
	          'span',
	          { className: this.prefixClass('divider') },
	          '|'
	        ),
	        React.createElement(
	          'a',
	          {
	            'data-rel': 'desktop',
	            href: this.props.desktopLink,
	            onClick: this.props.onRequestDesktop,
	            className: this.prefixClass('desktop')
	          },
	          this.props.desktopTitle
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: this.prefixClass('miscs') },
	        this.props.data ? this.props.data.map(function (item, i) {
	          return React.createElement(
	            'p',
	            { key: i },
	            item
	          );
	        }) : this.props.children
	      )
	    );
	  }
	});

	module.exports = Footer;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var AvgGrid = __webpack_require__(12);
	var omit = __webpack_require__(4);

	var Gallery = React.createClass({
	  displayName: 'Gallery',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'overlay', 'bordered', 'imgbordered']),
	    data: React.PropTypes.array,
	    sm: React.PropTypes.number,
	    md: React.PropTypes.number,
	    lg: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'gallery',
	      theme: 'default',
	      data: []
	    };
	  },

	  renderItem: function renderItem(item) {
	    var img = item.img ? React.createElement('img', {
	      src: item.img,
	      key: 'galeryImg',
	      alt: item.alt || item.title || null
	    }) : null;
	    var title = item.title ? React.createElement(
	      'h3',
	      {
	        key: 'galleryTitle',
	        className: this.prefixClass('title')
	      },
	      item.title
	    ) : null;
	    var desc = item.desc ? React.createElement(
	      'div',
	      {
	        key: 'galleryDesc',
	        className: this.prefixClass('desc')
	      },
	      item.desc
	    ) : null;
	    var galleryItem = item.link ? React.createElement(
	      'a',
	      { href: item.link },
	      img,
	      title,
	      desc
	    ) : [img, title, desc];

	    return React.createElement(
	      'div',
	      {
	        className: classNames(this.props.className, this.prefixClass('item'))
	      },
	      galleryItem
	    );
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      AvgGrid,
	      _extends({}, restProps, {
	        sm: this.props.sm || 2,
	        md: this.props.md || 3,
	        lg: this.props.lg || 4,
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.data.map(function (item, i) {
	        return React.createElement(
	          'li',
	          { key: i },
	          this.renderItem(item)
	        );
	      }.bind(this))
	    );
	  }
	});

	module.exports = Gallery;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(22);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var SmoothScrollMixin = __webpack_require__(74);
	var Events = __webpack_require__(53);
	var debounce = __webpack_require__(72);
	var dom = __webpack_require__(63);
	var CSSCore = __webpack_require__(16);
	var Icon = __webpack_require__(23);

	var GoTop = React.createClass({
	  displayName: 'GoTop',

	  mixins: [ClassNameMixin, SmoothScrollMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string.isRequired,
	    theme: React.PropTypes.oneOf(['default', 'fixed']),
	    title: React.PropTypes.string,
	    src: React.PropTypes.string,
	    icon: React.PropTypes.string,
	    autoHide: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'gotop',
	      theme: 'default'
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.isAutoHide()) {
	      var check = this.checkPosition;

	      check();

	      this._listener = Events.on(window, 'scroll', debounce(check, 100));
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._listener && this._listener.off();
	  },

	  checkPosition: function checkPosition() {
	    var action = (dom.scrollTop(window) > 50 ? 'add' : 'remove') + 'Class';

	    CSSCore[action](ReactDOM.findDOMNode(this), this.setClassNamespace('active'));
	  },

	  isAutoHide: function isAutoHide() {
	    return this.props.theme === 'fixed' && this.props.autoHide;
	  },

	  handleClick: function handleClick(e) {
	    e.preventDefault();
	    this.smoothScroll();
	  },

	  renderIcon: function renderIcon() {
	    return this.props.src ? React.createElement('img', {
	      className: this.prefixClass('icon-custom'),
	      src: this.props.src,
	      alt: this.props.title
	    }) : React.createElement(Icon, {
	      className: this.prefixClass('icon'),
	      icon: this.props.icon || 'chevron-up'
	    });
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    classSet[this.prefixClass(this.props.theme)] = true;
	    classSet[this.setClassNamespace('active')] = !this.isAutoHide();

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(classSet, this.props.className)
	      }),
	      React.createElement(
	        'a',
	        {
	          href: '#top',
	          onClick: this.handleClick,
	          title: this.props.title
	        },
	        this.props.title ? React.createElement(
	          'span',
	          { className: this.prefixClass('title') },
	          this.props.title
	        ) : null,
	        this.renderIcon()
	      )
	    );
	  }
	});

	module.exports = GoTop;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var Icon = __webpack_require__(23);
	var omit = __webpack_require__(4);

	var Header = React.createClass({
	  displayName: 'Header',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default']),
	    data: React.PropTypes.object,
	    fixed: React.PropTypes.bool,
	    title: React.PropTypes.node,
	    link: React.PropTypes.string,
	    onSelect: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'header',
	      theme: 'default',
	      onSelect: function onSelect() {}
	    };
	  },

	  renderTitle: function renderTitle() {
	    return this.props.title ? React.createElement(
	      'h1',
	      {
	        className: this.prefixClass('title'),
	        onClick: this.props.onSelect.bind(this, {
	          title: this.props.title,
	          link: this.props.link
	        })
	      },
	      this.props.link ? React.createElement(
	        'a',
	        { href: this.props.link },
	        this.props.title
	      ) : this.props.title
	    ) : null;
	  },

	  renderNav: function renderNav(position) {
	    var data = this.props.data;
	    var renderItem = function (item, i) {
	      var handleClick = item.onSelect || this.props.onSelect;

	      return React.createElement(
	        'a',
	        { href: item.link,
	          onClick: handleClick.bind(this, item),
	          key: 'headerNavItem' + i
	        },
	        item.title ? React.createElement(
	          'span',
	          { className: this.prefixClass('nav-title') },
	          item.title
	        ) : null,
	        item.customIcon ? React.createElement('img', { src: item.customIcon, alt: item.title || null }) : item.icon ? React.createElement(Icon, {
	          className: this.prefixClass('icon'),
	          icon: item.icon
	        }) : null
	      );
	    }.bind(this);

	    return data && data[position] ? React.createElement(
	      'div',
	      {
	        className: classNames(this.prefixClass('nav'), this.prefixClass(position))
	      },
	      data[position].map(function (item, i) {
	        return renderItem(item, i);
	      })
	    ) : null;
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    // am-header-fixed: fixed header
	    classSet[this.prefixClass('fixed')] = this.props.fixed;

	    return React.createElement(
	      'header',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      this.renderNav('left'),
	      this.renderTitle(),
	      this.renderNav('right')
	    );
	  }
	});

	module.exports = Header;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Button = __webpack_require__(13);
	var Col = __webpack_require__(10);

	var ListNews = React.createClass({
	  displayName: 'ListNews',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default']),
	    data: React.PropTypes.object,
	    header: React.PropTypes.node,
	    footer: React.PropTypes.node,
	    morePosition: React.PropTypes.oneOf(['top', 'bottom']),
	    moreText: React.PropTypes.string,
	    thumbPosition: React.PropTypes.oneOf(['top', 'left', 'right', 'bottom-left', 'bottom-right'])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'list-news',
	      theme: 'default',
	      moreText: '更多 »'
	    };
	  },

	  renderHeader: function renderHeader() {
	    var data = this.props.data;

	    return data && data.header && data.header.title ? React.createElement(
	      'div',
	      {
	        className: classNames(this.prefixClass('hd'), this.setClassNamespace('cf'))
	      },
	      data.header.link ? React.createElement(
	        'a',
	        { href: data.header.link },
	        React.createElement(
	          'h2',
	          null,
	          data.header.title
	        ),
	        this.props.morePosition === 'top' ? React.createElement(
	          'span',
	          {
	            className: classNames(this.prefixClass('more'), this.setClassNamespace('fr')) },
	          this.props.moreText
	        ) : null
	      ) : React.createElement(
	        'h2',
	        null,
	        data.header.title
	      )
	    ) : null;
	  },

	  // `more` on bottom
	  renderFooter: function renderFooter() {
	    return this.props.morePosition === 'bottom' && this.props.data.header.link ? React.createElement(
	      'div',
	      { className: this.prefixClass('ft') },
	      React.createElement(
	        Button,
	        {
	          className: this.prefixClass('more'),
	          href: this.props.data.header.link },
	        this.props.moreText
	      )
	    ) : null;
	  },

	  getListItemClasses: function getListItemClasses(item) {
	    return classNames(this.setClassNamespace('g'), item.date ? this.setClassNamespace('list-item-dated') : false, item.desc ? this.setClassNamespace('list-item-desced') : false, item.img ? this.setClassNamespace('list-item-thumbed') : false, this.props.thumbPosition ? this.setClassNamespace('list-item-thumb-' + this.props.thumbPosition) : false);
	  },

	  renderBody: function renderBody(children) {
	    return React.createElement(
	      'div',
	      { className: this.prefixClass('bd') },
	      React.createElement(
	        'ul',
	        { className: this.setClassNamespace('list') },
	        children
	      )
	    );
	  },

	  renderList: function renderList() {
	    var position = this.props.thumbPosition;
	    var orderChildren = function (item, i) {
	      var thumb = this.renderItemThumb(item, i);
	      var main = this.renderItemMain(item, i);

	      return position === 'right' || position === 'bottom-right' ? [main, thumb] : [thumb, main];
	    }.bind(this);

	    return this.props.data.main.map(function (item, i) {
	      return React.createElement(
	        'li',
	        {
	          key: i,
	          className: this.getListItemClasses(item)
	        },
	        position === 'bottom-left' || position === 'bottom-right' ? this.renderThumbItemTitle(item) : null,
	        orderChildren(item, i)
	      );
	    }.bind(this));
	  },

	  renderItemMisc: function renderItemMisc(item, type) {
	    var Tag = type === 'date' ? 'span' : 'div';
	    var className;

	    switch (type) {
	      case 'date':
	        className = 'list-date';
	        break;
	      case 'desc':
	        className = 'list-item-text';
	        break;
	      case 'mainAddition':
	        className = 'list-news-addon';
	        break;
	      case 'thumbAddition':
	        className = 'list-thumb-addon';
	    }

	    return item[type] ? React.createElement(
	      Tag,
	      { className: this.setClassNamespace(className) },
	      item[type]
	    ) : null;
	  },

	  renderItemThumb: function renderItemThumb(item, i) {
	    var Link = item.component || 'a';
	    var cols = this.props.thumbPosition === 'top' ? 12 : 4;

	    return item.img ? React.createElement(
	      Col,
	      {
	        key: 'thumb' + i,
	        sm: cols,
	        className: this.setClassNamespace('list-thumb')
	      },
	      React.createElement(
	        Link,
	        {
	          href: item.link
	        },
	        React.createElement('img', { src: item.img, alt: item.title })
	      ),
	      this.renderItemMisc(item, 'thumbAddition')
	    ) : null;
	  },

	  renderItemMain: function renderItemMain(item, i) {
	    var Link = item.component || 'a';
	    var position = this.props.thumbPosition;
	    var date = this.renderItemMisc(item, 'date');
	    var desc = this.renderItemMisc(item, 'desc');
	    var addon = this.renderItemMisc(item, 'mainAddition');
	    // title of list without thumbnail
	    var itemWithoutThumbTitle = !position && item.title ? React.createElement(
	      Link,
	      {
	        key: 'title' + i,
	        className: this.setClassNamespace('list-item-hd'),
	        href: item.link
	      },
	      item.title
	    ) : null;
	    var cols = position === 'top' ? 12 : item.img ? 8 : 12;

	    return position ? React.createElement(
	      Col,
	      {
	        sm: cols,
	        className: this.setClassNamespace('list-main'),
	        key: 'itemMain' + i
	      },
	      position !== 'bottom-left' && position !== 'bottom-right' ? this.renderThumbItemTitle(item) : null,
	      date,
	      desc,
	      addon
	    ) : [itemWithoutThumbTitle, date, desc, addon];
	  },

	  renderThumbItemTitle: function renderThumbItemTitle(item) {
	    var Link = item.component || 'a';

	    return item.title ? React.createElement(
	      'h3',
	      { className: this.setClassNamespace('list-item-hd') },
	      React.createElement(
	        Link,
	        { href: item.link },
	        item.title
	      )
	    ) : null;
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      this.props.header || this.renderHeader(),
	      this.renderBody(this.renderList()),
	      this.props.footer || this.renderFooter()
	    );
	  }
	});

	module.exports = ListNews;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var omit = __webpack_require__(4);
	var ClassNameMixin = __webpack_require__(8);
	var Icon = __webpack_require__(23);
	var AvgGrid = __webpack_require__(12);

	var Menu = React.createClass({
	  displayName: 'Menu',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'dropdown1', 'dropdown2', 'slide1', 'stack']),
	    data: React.PropTypes.array,
	    onSelect: React.PropTypes.func,
	    toggleTitle: React.PropTypes.string,
	    toggleCustomIcon: React.PropTypes.string,
	    toggleIcon: React.PropTypes.string,
	    cols: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'menu',
	      theme: 'default',
	      data: [],
	      onSelect: function onSelect() {}
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      data: this.props.data,
	      expanded: !this.isDropdown()
	    };
	  },

	  handleClick: function handleClick(nav, index, closeAll, e) {
	    if (nav && nav.subMenu) {
	      this.handleParentClick(nav, index, closeAll, e);
	    }

	    this.props.onSelect.call(this, nav, index, e);
	  },

	  /**
	   * handle nav with subMenu click
	   * @param {object} nav - clicked nav
	   * @param {number} index - clicked nav index
	   * @param {bool} closeAll - close all submenu
	   * @param {object} e
	   */
	  handleParentClick: function handleParentClick(nav, index, closeAll, e) {
	    e && e.preventDefault();

	    var data = this.state.data.map(function (item, i) {
	      item.subActive = closeAll ? false : index === i ? !item.subActive : false;
	      return item;
	    });

	    this.setState({
	      data: data
	    });
	  },

	  closeAll: function closeAll() {
	    this.handleParentClick(null, null, true, undefined);
	  },

	  // handle toggle button click for dropdown/slide theme
	  handleToggle: function handleToggle(e) {
	    e && e.preventDefault();
	    this.setState({
	      expanded: !this.state.expanded
	    }, function () {
	      !this.state.expanded && this.closeAll();
	    }.bind(this));
	  },

	  isDropdown: function isDropdown() {
	    return ['dropdown1', 'dropdown2', 'slide1'].indexOf(this.props.theme) > -1;
	  },

	  renderMenuToggle: function renderMenuToggle() {
	    var title = this.props.toggleTitle ? React.createElement(
	      'span',
	      {
	        className: this.prefixClass('toggle-title')
	      },
	      this.props.toggleTitle
	    ) : null;
	    var icon = this.props.toggleCustomIcon ? React.createElement('img', {
	      src: this.props.toggleCustomIcon,
	      alt: 'Menu Toggle'
	    }) : React.createElement(Icon, {
	      className: this.prefixClass('toggle-icon'),
	      icon: this.props.toggleIcon || 'bars'
	    });

	    return React.createElement(
	      'a',
	      {
	        href: '#',
	        onClick: this.handleToggle,
	        className: classNames(this.prefixClass('toggle'), this.state.expanded ? this.setClassNamespace('active') : null)
	      },
	      title,
	      icon
	    );
	  },

	  renderNavs: function renderNavs() {
	    var _this = this;
	    var openClassName = this.setClassNamespace('open');
	    var inClassName = this.setClassNamespace('in');

	    return this.state.data.map(function (nav, i) {
	      var Link = nav.component || 'a';
	      var LinkProps = nav.props || {};

	      return React.createElement(
	        'li',
	        {
	          key: i,
	          className: classNames(nav.subMenu ? _this.setClassNamespace('parent') : null, nav.subActive ? openClassName : null)
	        },
	        React.createElement(
	          Link,
	          _extends({
	            onClick: _this.handleClick.bind(_this, nav, i, false),
	            href: nav.link
	          }, LinkProps),
	          nav.title
	        ),
	        nav.subMenu ? React.createElement(
	          AvgGrid,
	          {
	            sm: nav.subCols || 1,
	            className: classNames(_this.prefixClass('sub'), _this.setClassNamespace('collapse'), nav.subActive ? inClassName : null)
	          },
	          nav.subMenu.map(function (subNav, index) {
	            var SubLink = subNav.component || 'a';
	            var SubLinkProps = subNav.props || {};

	            return React.createElement(
	              'li',
	              { key: index },
	              React.createElement(
	                SubLink,
	                _extends({
	                  onClick: _this.handleClick.bind(_this, subNav, [i, index], false),
	                  target: subNav.target,
	                  href: subNav.link
	                }, SubLinkProps),
	                subNav.title
	              )
	            );
	          })
	        ) : null
	      );
	    });
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));
	    var hideTopLevel = !this.state.expanded ? this.setClassNamespace('collapse') : null;

	    return React.createElement(
	      'nav',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      this.renderMenuToggle(),
	      React.createElement(
	        AvgGrid,
	        {
	          sm: this.props.cols,
	          className: classNames(this.prefixClass('nav'), hideTopLevel)
	        },
	        this.renderNavs()
	      )
	    );
	  }
	});

	module.exports = Menu;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var Icon = __webpack_require__(23);
	var omit = __webpack_require__(4);

	var Navbar = React.createClass({
	  displayName: 'Navbar',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default']),
	    data: React.PropTypes.array,
	    onSelect: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'navbar',
	      theme: 'default',
	      data: [],
	      onSelect: function onSelect() {}
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      React.createElement(
	        'ul',
	        { className: this.prefixClass('nav') },
	        this.props.data.map(function (item, i) {
	          var Link = item.component || 'a';
	          var LinkProps = item.props || {};

	          return React.createElement(
	            'li',
	            {
	              key: i,
	              onClick: this.props.onSelect.bind(this, item.link)
	            },
	            React.createElement(
	              Link,
	              _extends({
	                href: item.link
	              }, LinkProps),
	              item.customIcon ? React.createElement('img', {
	                src: item.customIcon,
	                alt: item.title
	              }) : item.icon ? React.createElement(Icon, { icon: item.icon }) : null,
	              item.title ? React.createElement(
	                'span',
	                { className: this.prefixClass('label') },
	                item.title
	              ) : null
	            )
	          );
	        }.bind(this))
	      )
	    );
	  }
	});

	module.exports = Navbar;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var classNames = __webpack_require__(3);
	var ClassNameMixin = __webpack_require__(8);
	var AvgGrid = __webpack_require__(12);
	var omit = __webpack_require__(4);

	var Titlebar = React.createClass({
	  displayName: 'Titlebar',

	  mixins: [ClassNameMixin],

	  propTypes: {
	    classPrefix: React.PropTypes.string,
	    theme: React.PropTypes.oneOf(['default', 'multi', 'cols']),
	    nav: React.PropTypes.array,
	    title: React.PropTypes.node
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      classPrefix: 'titlebar',
	      theme: 'default',
	      data: []
	    };
	  },

	  render: function render() {
	    var classSet = this.getClassSet();
	    var restProps = omit(this.props, Object.keys(this.constructor.propTypes));

	    return React.createElement(
	      'div',
	      _extends({}, restProps, {
	        'data-am-widget': this.props.classPrefix,
	        className: classNames(this.props.className, classSet)
	      }),
	      React.createElement(
	        'h2',
	        { className: this.prefixClass('title') },
	        this.props.href ? React.createElement(
	          'a',
	          { href: this.props.href },
	          this.props.title
	        ) : this.props.title
	      ),
	      this.props.nav ? React.createElement(
	        'nav',
	        { className: this.prefixClass('nav') },
	        this.props.nav.map(function (item, i) {
	          return React.createElement(
	            'a',
	            { href: item.link, key: i },
	            item.title
	          );
	        })
	      ) : null
	    );
	  }
	});

	module.exports = Titlebar;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  ClassNameMixin: __webpack_require__(8),
	  CollapseMixin: __webpack_require__(38),
	  DimmerMixin: __webpack_require__(61),
	  OverlayMixin: __webpack_require__(65),
	  SmoothScrollMixin: __webpack_require__(74)
	};

/***/ }
/******/ ])
});
;