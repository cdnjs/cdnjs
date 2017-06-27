(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/ListGroupItem"), require("react-bootstrap/lib/MenuItem"), require("react-bootstrap/lib/NavItem"), require("react-bootstrap/lib/ModalTrigger"), require("react-bootstrap/lib/OverlayTrigger"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-bootstrap/lib/Button", "react-bootstrap/lib/ListGroupItem", "react-bootstrap/lib/MenuItem", "react-bootstrap/lib/NavItem", "react-bootstrap/lib/ModalTrigger", "react-bootstrap/lib/OverlayTrigger"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouterBootstrap"] = factory(require("react"), require("react-bootstrap/lib/Button"), require("react-bootstrap/lib/ListGroupItem"), require("react-bootstrap/lib/MenuItem"), require("react-bootstrap/lib/NavItem"), require("react-bootstrap/lib/ModalTrigger"), require("react-bootstrap/lib/OverlayTrigger"));
	else
		root["ReactRouterBootstrap"] = factory(root["React"], root["ReactBootstrap"]["Button"], root["ReactBootstrap"]["ListGroupItem"], root["ReactBootstrap"]["MenuItem"], root["ReactBootstrap"]["NavItem"], root["ReactBootstrap"]["ModalTrigger"], root["ReactBootstrap"]["OverlayTrigger"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
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
	var LinkMixin = __webpack_require__(14);

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
	var LinkMixin = __webpack_require__(14);

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
	var classSet = __webpack_require__(15);

	var MenuItem = __webpack_require__(10);
	var LinkMixin = __webpack_require__(14);

	var joinClasses = __webpack_require__(16);

	var MenuItemLink = React.createClass({displayName: "MenuItemLink",
	  mixins: [
	    LinkMixin
	  ],
	  contextTypes: {
	    router: React.PropTypes.func.isRequired
	  },

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	                 
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,onSelect=$__0.onSelect,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1,onSelect:1});

	    if (active === undefined) {
	      active = this.context.router.isActive(to, params, query);
	    }

	    return (
	      React.createElement(MenuItem, React.__spread({}, 
	        props, 
	        {href: this.getHref(), 
	        active: active, 
	        onClick: this.handleRouteTo, 
	        ref: "menuItem"
	      }), 
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
	var LinkMixin = __webpack_require__(14);

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

	var ModalTrigger = __webpack_require__(12);

	module.exports = ModalTrigger.withContext({
	  router: React.PropTypes.func
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);

	var OverlayTrigger = __webpack_require__(13);

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

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(7);
	var classSet = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
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


/***/ }
/******/ ])
});
;