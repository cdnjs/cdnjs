(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/ListGroupItem"), require("react-bootstrap/lib/MenuItem"), require("react-bootstrap/lib/NavItem"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-bootstrap/lib/Button", "react-bootstrap/lib/ListGroupItem", "react-bootstrap/lib/MenuItem", "react-bootstrap/lib/NavItem"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterBootstrap"] = factory(require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/ListGroupItem"), require("react-bootstrap/lib/MenuItem"), require("react-bootstrap/lib/NavItem"));
	else
		root["ReactRouterBootstrap"] = factory(root["React"], root["ReactBootstrap"]["Button"], root["ReactBootstrap"]["ListGroupItem"], root["ReactBootstrap"]["MenuItem"], root["ReactBootstrap"]["NavItem"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
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

	var ButtonLink = __webpack_require__(1);
	var ListGroupItemLink = __webpack_require__(2);
	var MenuItemLink = __webpack_require__(3);
	var NavItemLink = __webpack_require__(4);
	var RouterModalTrigger = __webpack_require__(5);
	var RouterOverlayTrigger = __webpack_require__(6);

	module.exports = {
	  ButtonLink: ButtonLink,
	  ListGroupItemLink: ListGroupItemLink,
	  MenuItemLink: MenuItemLink,
	  NavItemLink: NavItemLink,
	  RouterModalTrigger: RouterModalTrigger,
	  RouterOverlayTrigger: RouterOverlayTrigger
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var Button = __webpack_require__(8);
	var LinkMixin = __webpack_require__(12);

	var ButtonLink = React.createClass({displayName: "ButtonLink",
	  mixins: [
	    LinkMixin
	  ],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function () {
	    var $__0=
	      
	      
	      
	      
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1});

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return (
	      React.createElement(Button, React.__spread({},  props, 
	        {href: this.getHref(), 
	        active: active, 
	        onClick: this.handleRouteTo, 
	        ref: "button"}), 
	          this.props.children
	      )
	    );
	  }
	});

	module.exports = ButtonLink;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var ListGroupItem = __webpack_require__(9);
	var LinkMixin = __webpack_require__(12);

	var LinkGroupItemLink = React.createClass({displayName: "LinkGroupItemLink",
	  mixins: [
	    LinkMixin
	  ],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1});

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return (
	      React.createElement(ListGroupItem, React.__spread({},  props, 
	        {href: this.getHref(), 
	        active: active, 
	        onClick: this.handleRouteTo, 
	        ref: "listGroupItem"}), 
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = LinkGroupItemLink;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var classSet = __webpack_require__(13);

	var MenuItem = __webpack_require__(10);
	var LinkMixin = __webpack_require__(12);

	var joinClasses = __webpack_require__(14);

	var MenuItemLink = React.createClass({displayName: "MenuItemLink",
	  mixins: [
	    LinkMixin
	  ],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	      
	                 
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,className=$__0.className,onSelect=$__0.onSelect,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1,className:1,onSelect:1});

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return (
	      React.createElement(MenuItem, React.__spread({},  props, 
	        {href: this.getHref(), 
	        className:  joinClasses(className, classSet({ active: active })), 
	        onClick: this.handleRouteTo, 
	        ref: "menuItem"}), 
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = MenuItemLink;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var NavItem = __webpack_require__(11);
	var LinkMixin = __webpack_require__(12);

	var NavItemLink = React.createClass({displayName: "NavItemLink",
	  mixins: [
	    LinkMixin
	  ],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1});

	    if (this.props.active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return (
	      React.createElement(NavItem, React.__spread({},  props, 
	        {href: this.getHref(), 
	        active: active, 
	        onClick: this.handleRouteTo, 
	        ref: "navItem"}), 
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = NavItemLink;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var ModalTrigger = __webpack_require__(15);

	module.exports = ModalTrigger.withContext({
	  router: React.PropTypes.func
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var OverlayTrigger = __webpack_require__(16);

	module.exports = OverlayTrigger.withContext({
	  router: React.PropTypes.func
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var classSet = __webpack_require__(13);

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	module.exports = {
	  propTypes: {
	    activeClassName: React.PropTypes.string.isRequired,
	    disabled: React.PropTypes.bool,
	    to: React.PropTypes.string.isRequired,
	    params: React.PropTypes.object,
	    query: React.PropTypes.object,
	    onClick: React.PropTypes.func
	  },
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },


	  getDefaultProps: function () {
	    return {
	      activeClassName: 'active'
	    };
	  },

	  /**
	   * Returns the value of the "href" attribute to use on the DOM element.
	   */
	  getHref: function () {
	    return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
	  },

	  /**
	   * Returns the value of the "class" attribute to use on the DOM element, which contains
	   * the value of the activeClassName property when this <Link> is active.
	   */
	  getClassName: function () {
	    var classNames = {};

	    if (this.props.className) {
	      classNames[this.props.className] = true;
	    }

	    if (this.context.router.isActive(this.props.to, this.props.params, this.props.query)) {
	      classNames[this.props.activeClassName] = true;
	    }

	    return classSet(classNames);
	  },

	  handleRouteTo: function (event) {
	    var allowTransition = true;
	    var clickResult;
	    
	    if (this.props.disabled) {
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames () {
		'use strict';

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

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	/* global define */
	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	var _React$cloneElement = __webpack_require__(7);

	var _React$cloneElement2 = _interopRequireDefault(_React$cloneElement);

	var _OverlayMixin = __webpack_require__(17);

	var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

	var _createChainedFunction = __webpack_require__(18);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	var ModalTrigger = _React$cloneElement2['default'].createClass({
	  displayName: 'ModalTrigger',

	  mixins: [_OverlayMixin2['default']],

	  propTypes: {
	    modal: _React$cloneElement2['default'].PropTypes.node.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isOverlayShown: false
	    };
	  },

	  show: function show() {
	    this.setState({
	      isOverlayShown: true
	    });
	  },

	  hide: function hide() {
	    this.setState({
	      isOverlayShown: false
	    });
	  },

	  toggle: function toggle() {
	    this.setState({
	      isOverlayShown: !this.state.isOverlayShown
	    });
	  },

	  renderOverlay: function renderOverlay() {
	    if (!this.state.isOverlayShown) {
	      return _React$cloneElement2['default'].createElement('span', null);
	    }

	    return _React$cloneElement.cloneElement(this.props.modal, {
	      onRequestHide: this.hide
	    });
	  },

	  render: function render() {
	    var child = _React$cloneElement2['default'].Children.only(this.props.children);
	    var props = {};

	    props.onClick = _createChainedFunction2['default'](child.props.onClick, this.toggle);
	    props.onMouseOver = _createChainedFunction2['default'](child.props.onMouseOver, this.props.onMouseOver);
	    props.onMouseOut = _createChainedFunction2['default'](child.props.onMouseOut, this.props.onMouseOut);
	    props.onFocus = _createChainedFunction2['default'](child.props.onFocus, this.props.onFocus);
	    props.onBlur = _createChainedFunction2['default'](child.props.onBlur, this.props.onBlur);

	    return _React$cloneElement.cloneElement(child, props);
	  }
	});

	exports['default'] = ModalTrigger;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	var _React$cloneElement = __webpack_require__(7);

	var _React$cloneElement2 = _interopRequireDefault(_React$cloneElement);

	var _OverlayMixin = __webpack_require__(17);

	var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

	var _domUtils = __webpack_require__(19);

	var _domUtils2 = _interopRequireDefault(_domUtils);

	var _createChainedFunction = __webpack_require__(18);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	var _assign = __webpack_require__(20);

	var _assign2 = _interopRequireDefault(_assign);

	/**
	 * Check if value one is inside or equal to the of value
	 *
	 * @param {string} one
	 * @param {string|array} of
	 * @returns {boolean}
	 */
	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}

	var OverlayTrigger = _React$cloneElement2['default'].createClass({
	  displayName: 'OverlayTrigger',

	  mixins: [_OverlayMixin2['default']],

	  propTypes: {
	    trigger: _React$cloneElement2['default'].PropTypes.oneOfType([_React$cloneElement2['default'].PropTypes.oneOf(['manual', 'click', 'hover', 'focus']), _React$cloneElement2['default'].PropTypes.arrayOf(_React$cloneElement2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),
	    placement: _React$cloneElement2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	    delay: _React$cloneElement2['default'].PropTypes.number,
	    delayShow: _React$cloneElement2['default'].PropTypes.number,
	    delayHide: _React$cloneElement2['default'].PropTypes.number,
	    defaultOverlayShown: _React$cloneElement2['default'].PropTypes.bool,
	    overlay: _React$cloneElement2['default'].PropTypes.node.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      placement: 'right',
	      trigger: ['hover', 'focus']
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown,
	      overlayLeft: null,
	      overlayTop: null
	    };
	  },

	  show: function show() {
	    this.setState({
	      isOverlayShown: true
	    }, function () {
	      this.updateOverlayPosition();
	    });
	  },

	  hide: function hide() {
	    this.setState({
	      isOverlayShown: false
	    });
	  },

	  toggle: function toggle() {
	    if (this.state.isOverlayShown) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  },

	  renderOverlay: function renderOverlay() {
	    if (!this.state.isOverlayShown) {
	      return _React$cloneElement2['default'].createElement('span', null);
	    }

	    return _React$cloneElement.cloneElement(this.props.overlay, {
	      onRequestHide: this.hide,
	      placement: this.props.placement,
	      positionLeft: this.state.overlayLeft,
	      positionTop: this.state.overlayTop
	    });
	  },

	  render: function render() {
	    var child = _React$cloneElement2['default'].Children.only(this.props.children);
	    if (this.props.trigger === 'manual') {
	      return child;
	    }

	    var props = {};

	    props.onClick = _createChainedFunction2['default'](child.props.onClick, this.props.onClick);
	    if (isOneOf('click', this.props.trigger)) {
	      props.onClick = _createChainedFunction2['default'](this.toggle, props.onClick);
	    }

	    if (isOneOf('hover', this.props.trigger)) {
	      props.onMouseOver = _createChainedFunction2['default'](this.handleDelayedShow, this.props.onMouseOver);
	      props.onMouseOut = _createChainedFunction2['default'](this.handleDelayedHide, this.props.onMouseOut);
	    }

	    if (isOneOf('focus', this.props.trigger)) {
	      props.onFocus = _createChainedFunction2['default'](this.handleDelayedShow, this.props.onFocus);
	      props.onBlur = _createChainedFunction2['default'](this.handleDelayedHide, this.props.onBlur);
	    }

	    return _React$cloneElement.cloneElement(child, props);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this._hoverDelay);
	  },

	  componentDidMount: function componentDidMount() {
	    if (this.props.defaultOverlayShown) {
	      this.updateOverlayPosition();
	    }
	  },

	  handleDelayedShow: function handleDelayedShow() {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

	    if (!delay) {
	      this.show();
	      return;
	    }

	    this._hoverDelay = setTimeout((function () {
	      this._hoverDelay = null;
	      this.show();
	    }).bind(this), delay);
	  },

	  handleDelayedHide: function handleDelayedHide() {
	    if (this._hoverDelay != null) {
	      clearTimeout(this._hoverDelay);
	      this._hoverDelay = null;
	      return;
	    }

	    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

	    if (!delay) {
	      this.hide();
	      return;
	    }

	    this._hoverDelay = setTimeout((function () {
	      this._hoverDelay = null;
	      this.hide();
	    }).bind(this), delay);
	  },

	  updateOverlayPosition: function updateOverlayPosition() {
	    if (!this.isMounted()) {
	      return;
	    }

	    var pos = this.calcOverlayPosition();

	    this.setState({
	      overlayLeft: pos.left,
	      overlayTop: pos.top
	    });
	  },

	  calcOverlayPosition: function calcOverlayPosition() {
	    var childOffset = this.getPosition();

	    var overlayNode = this.getOverlayDOMNode();
	    var overlayHeight = overlayNode.offsetHeight;
	    var overlayWidth = overlayNode.offsetWidth;

	    switch (this.props.placement) {
	      case 'right':
	        return {
	          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
	          left: childOffset.left + childOffset.width
	        };
	      case 'left':
	        return {
	          top: childOffset.top + childOffset.height / 2 - overlayHeight / 2,
	          left: childOffset.left - overlayWidth
	        };
	      case 'top':
	        return {
	          top: childOffset.top - overlayHeight,
	          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
	        };
	      case 'bottom':
	        return {
	          top: childOffset.top + childOffset.height,
	          left: childOffset.left + childOffset.width / 2 - overlayWidth / 2
	        };
	      default:
	        throw new Error('calcOverlayPosition(): No such placement of "' + this.props.placement + '" found.');
	    }
	  },

	  getPosition: function getPosition() {
	    var node = _React$cloneElement2['default'].findDOMNode(this);
	    var container = this.getContainerDOMNode();

	    var offset = container.tagName === 'BODY' ? _domUtils2['default'].getOffset(node) : _domUtils2['default'].getPosition(node, container);

	    return _assign2['default']({}, offset, {
	      height: node.offsetHeight,
	      width: node.offsetWidth
	    });
	  }
	});

	exports['default'] = OverlayTrigger;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	var _React = __webpack_require__(7);

	var _React2 = _interopRequireDefault(_React);

	var _CustomPropTypes = __webpack_require__(21);

	var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

	var _domUtils = __webpack_require__(19);

	var _domUtils2 = _interopRequireDefault(_domUtils);

	exports['default'] = {
	  propTypes: {
	    container: _CustomPropTypes2['default'].mountable
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._unrenderOverlay();
	    if (this._overlayTarget) {
	      this.getContainerDOMNode().removeChild(this._overlayTarget);
	      this._overlayTarget = null;
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },

	  componentDidMount: function componentDidMount() {
	    this._renderOverlay();
	  },

	  _mountOverlayTarget: function _mountOverlayTarget() {
	    this._overlayTarget = document.createElement('div');
	    this.getContainerDOMNode().appendChild(this._overlayTarget);
	  },

	  _renderOverlay: function _renderOverlay() {
	    if (!this._overlayTarget) {
	      this._mountOverlayTarget();
	    }

	    var overlay = this.renderOverlay();

	    // Save reference to help testing
	    if (overlay !== null) {
	      this._overlayInstance = _React2['default'].render(overlay, this._overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this._unrenderOverlay();
	    }
	  },

	  _unrenderOverlay: function _unrenderOverlay() {
	    _React2['default'].unmountComponentAtNode(this._overlayTarget);
	    this._overlayInstance = null;
	  },

	  getOverlayDOMNode: function getOverlayDOMNode() {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }

	    if (this._overlayInstance) {
	      return _React2['default'].findDOMNode(this._overlayInstance);
	    }

	    return null;
	  },

	  getContainerDOMNode: function getContainerDOMNode() {
	    return _React2['default'].findDOMNode(this.props.container) || _domUtils2['default'].ownerDocument(this).body;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
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
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

	var _React = __webpack_require__(7);

	var _React2 = _interopRequireDefault(_React);

	/**
	 * Get elements owner document
	 *
	 * @param {ReactComponent|HTMLElement} componentOrElement
	 * @returns {HTMLElement}
	 */
	function ownerDocument(componentOrElement) {
	  var elem = _React2['default'].findDOMNode(componentOrElement);
	  return elem && elem.ownerDocument || document;
	}

	/**
	 * Shortcut to compute element style
	 *
	 * @param {HTMLElement} elem
	 * @returns {CssStyle}
	 */
	function getComputedStyles(elem) {
	  return ownerDocument(elem).defaultView.getComputedStyle(elem, null);
	}

	/**
	 * Get elements offset
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} DOMNode
	 * @returns {{top: number, left: number}}
	 */
	function getOffset(DOMNode) {
	  if (window.jQuery) {
	    return window.jQuery(DOMNode).offset();
	  }

	  var docElem = ownerDocument(DOMNode).documentElement;
	  var box = { top: 0, left: 0 };

	  // If we don't have gBCR, just use 0,0 rather than error
	  // BlackBerry 5, iOS 3 (original iPhone)
	  if (typeof DOMNode.getBoundingClientRect !== 'undefined') {
	    box = DOMNode.getBoundingClientRect();
	  }

	  return {
	    top: box.top + window.pageYOffset - docElem.clientTop,
	    left: box.left + window.pageXOffset - docElem.clientLeft
	  };
	}

	/**
	 * Get elements position
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} elem
	 * @param {HTMLElement?} offsetParent
	 * @returns {{top: number, left: number}}
	 */
	function getPosition(elem, offsetParent) {
	  if (window.jQuery) {
	    return window.jQuery(elem).position();
	  }

	  var offset = undefined,
	      parentOffset = { top: 0, left: 0 };

	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
	  if (getComputedStyles(elem).position === 'fixed') {
	    // We assume that getBoundingClientRect is available when computed position is fixed
	    offset = elem.getBoundingClientRect();
	  } else {
	    if (!offsetParent) {
	      // Get *real* offsetParent
	      offsetParent = offsetParentFunc(elem);
	    }

	    // Get correct offsets
	    offset = getOffset(elem);
	    if (offsetParent.nodeName !== 'HTML') {
	      parentOffset = getOffset(offsetParent);
	    }

	    // Add offsetParent borders
	    parentOffset.top += parseInt(getComputedStyles(offsetParent).borderTopWidth, 10);
	    parentOffset.left += parseInt(getComputedStyles(offsetParent).borderLeftWidth, 10);
	  }

	  // Subtract parent offsets and element margins
	  return {
	    top: offset.top - parentOffset.top - parseInt(getComputedStyles(elem).marginTop, 10),
	    left: offset.left - parentOffset.left - parseInt(getComputedStyles(elem).marginLeft, 10)
	  };
	}

	/**
	 * Get parent element
	 *
	 * @param {HTMLElement?} elem
	 * @returns {HTMLElement}
	 */
	function offsetParentFunc(elem) {
	  var docElem = ownerDocument(elem).documentElement;
	  var offsetParent = elem.offsetParent || docElem;

	  while (offsetParent && (offsetParent.nodeName !== 'HTML' && getComputedStyles(offsetParent).position === 'static')) {
	    offsetParent = offsetParent.offsetParent;
	  }

	  return offsetParent || docElem;
	}

	exports['default'] = {
	  ownerDocument: ownerDocument,
	  getComputedStyles: getComputedStyles,
	  getOffset: getOffset,
	  getPosition: getPosition,
	  offsetParent: offsetParentFunc
	};
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/Object.assign.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	exports['default'] = assign;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var ANONYMOUS = '<<anonymous>>';

	var CustomPropTypes = {
	  /**
	   * Checks whether a prop provides a DOM element
	   *
	   * The element can be provided in two forms:
	   * - Directly passed
	   * - Or passed an object which has a `getDOMNode` method which will return the required DOM element
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  mountable: createMountableChecker(),
	  /**
	   * Checks whether a prop matches a key of an associated object
	   *
	   * @param props
	   * @param propName
	   * @param componentName
	   * @returns {Error|undefined}
	   */
	  keyOf: createKeyOfChecker
	};

	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName) {
	    componentName = componentName || ANONYMOUS;
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop `' + propName + '` was not specified in ' + '`' + componentName + '`.');
	      }
	    } else {
	      return validate(props, propName, componentName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createMountableChecker() {
	  function validate(props, propName, componentName) {
	    if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
	      return new Error('Invalid prop `' + propName + '` supplied to ' + '`' + componentName + '`, expected a DOM element or an object that has a `render` method');
	    }
	  }

	  return createChainableTypeChecker(validate);
	}

	function createKeyOfChecker(obj) {
	  function validate(props, propName, componentName) {
	    var propValue = props[propName];
	    if (!obj.hasOwnProperty(propValue)) {
	      var valuesString = JSON.stringify(Object.keys(obj));
	      return new Error('Invalid prop \'' + propName + '\' of value \'' + propValue + '\' ' + ('supplied to \'' + componentName + '\', expected one of ' + valuesString + '.'));
	    }
	  }
	  return createChainableTypeChecker(validate);
	}

	exports['default'] = CustomPropTypes;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;