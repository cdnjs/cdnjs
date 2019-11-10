var ReactRouterBootstrap =
/******/ (function(modules) { // webpackBootstrap
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

	var ButtonLink = __webpack_require__(1);
	var MenuItemLink = __webpack_require__(2);
	var NavItemLink = __webpack_require__(3);

	module.exports = {
	  ButtonLink: ButtonLink,
	  MenuItemLink: MenuItemLink,
	  NavItemLink: NavItemLink
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var Button = __webpack_require__(9);
	var $__0=     __webpack_require__(5),Navigation=$__0.Navigation,State=$__0.State;
	var LinkMixin = __webpack_require__(6);

	var ButtonLink = React.createClass({displayName: "ButtonLink",
	  mixins: [
	    LinkMixin,
	    Navigation,
	    State
	  ],

	  render: function () {
	    var $__0=
	      
	      
	      
	      
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1});

	    if (this.props.active === undefined) {
	      active = this.isActive(to, params, query);
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

	var React = __webpack_require__(4);
	var classSet = __webpack_require__(12);

	var MenuItem = __webpack_require__(8);
	var $__0=     __webpack_require__(5),Navigation=$__0.Navigation,State=$__0.State;
	var LinkMixin = __webpack_require__(6);

	var joinClasses = __webpack_require__(11);

	var MenuItemLink = React.createClass({displayName: "MenuItemLink",
	  mixins: [
	    LinkMixin,
	    Navigation,
	    State
	  ],

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	      
	                 
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,className=$__0.className,onSelect=$__0.onSelect,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1,className:1,onSelect:1});

	    if (this.props.active === undefined) {
	      active = this.isActive(to, params, query);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);

	var NavItem = __webpack_require__(10);
	var $__0=     __webpack_require__(5),Navigation=$__0.Navigation,State=$__0.State;
	var LinkMixin = __webpack_require__(6);

	var NavItemLink = React.createClass({displayName: "NavItemLink",
	  mixins: [
	    LinkMixin,
	    Navigation,
	    State
	  ],

	  render: function() {
	    var $__0=
	      
	      
	      
	      
	        this.props,to=$__0.to,params=$__0.params,query=$__0.query,active=$__0.active,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{to:1,params:1,query:1,active:1});

	    if (this.props.active === undefined) {
	      active = this.isActive(to, params, query);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = ReactRouter;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var classSet = __webpack_require__(12);
	var assign = __webpack_require__(7);

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	module.exports = {
	  propTypes: {
	    activeClassName: React.PropTypes.string.isRequired,
	    to: React.PropTypes.string.isRequired,
	    params: React.PropTypes.object,
	    query: React.PropTypes.object,
	    onClick: React.PropTypes.func
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
	    return this.makeHref(this.props.to, this.props.params, this.props.query);
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

	    if (this.isActive(this.props.to, this.props.params, this.props.query)) {
	      classNames[this.props.activeClassName] = true;
	    }

	    return classSet(classNames);
	  },

	  handleRouteTo: function (event) {
	    var allowTransition = true;
	    var clickResult;

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
	      this.transitionTo(this.props.to, this.props.params, this.props.query);
	    }
	  }
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React.__spread;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var joinClasses = __webpack_require__(11);
	var classSet = __webpack_require__(13);

	var MenuItem = React.createClass({displayName: "MenuItem",
	  propTypes: {
	    header:    React.PropTypes.bool,
	    divider:   React.PropTypes.bool,
	    href:      React.PropTypes.string,
	    title:     React.PropTypes.string,
	    target:    React.PropTypes.string,
	    onSelect:  React.PropTypes.func,
	    eventKey:  React.PropTypes.any
	  },

	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },

	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
	    }
	  },

	  renderAnchor: function () {
	    return (
	      React.createElement("a", {onClick: this.handleClick, href: this.props.href, target: this.props.target, title: this.props.title, tabIndex: "-1"}, 
	        this.props.children
	      )
	    );
	  },

	  render: function () {
	    var classes = {
	        'dropdown-header': this.props.header,
	        'divider': this.props.divider
	      };

	    var children = null;
	    if (this.props.header) {
	      children = this.props.children;
	    } else if (!this.props.divider) {
	      children = this.renderAnchor();
	    }

	    return (
	      React.createElement("li", React.__spread({},  this.props, {role: "presentation", title: null, href: null, 
	        className: joinClasses(this.props.className, classSet(classes))}), 
	        children
	      )
	    );
	  }
	});

	module.exports = MenuItem;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var joinClasses = __webpack_require__(11);
	var classSet = __webpack_require__(13);
	var BootstrapMixin = __webpack_require__(14);

	var Button = React.createClass({displayName: "Button",
	  mixins: [BootstrapMixin],

	  propTypes: {
	    active:   React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    block:    React.PropTypes.bool,
	    navItem:    React.PropTypes.bool,
	    navDropdown: React.PropTypes.bool,
	    componentClass: React.PropTypes.node,
	    href: React.PropTypes.string,
	    target: React.PropTypes.string
	  },

	  getDefaultProps: function () {
	    return {
	      bsClass: 'button',
	      bsStyle: 'default',
	      type: 'button'
	    };
	  },

	  render: function () {
	    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
	    var renderFuncName;

	    classes['active'] = this.props.active;
	    classes['btn-block'] = this.props.block;

	    if (this.props.navItem) {
	      return this.renderNavItem(classes);
	    }

	    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ?
	      'renderAnchor' : 'renderButton';

	    return this[renderFuncName](classes);
	  },

	  renderAnchor: function (classes) {

	    var Component = this.props.componentClass || 'a';
	    var href = this.props.href || '#';
	    classes['disabled'] = this.props.disabled;

	    return (
	      React.createElement(Component, React.__spread({}, 
	        this.props, 
	        {href: href, 
	        className: joinClasses(this.props.className, classSet(classes)), 
	        role: "button"}), 
	        this.props.children
	      )
	    );
	  },

	  renderButton: function (classes) {
	    var Component = this.props.componentClass || 'button';

	    return (
	      React.createElement(Component, React.__spread({}, 
	        this.props, 
	        {className: joinClasses(this.props.className, classSet(classes))}), 
	        this.props.children
	      )
	    );
	  },

	  renderNavItem: function (classes) {
	    var liClasses = {
	      active: this.props.active
	    };

	    return (
	      React.createElement("li", {className: classSet(liClasses)}, 
	        this.renderAnchor(classes)
	      )
	    );
	  }
	});

	module.exports = Button;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var joinClasses = __webpack_require__(11);
	var classSet = __webpack_require__(13);
	var BootstrapMixin = __webpack_require__(14);

	var NavItem = React.createClass({displayName: "NavItem",
	  mixins: [BootstrapMixin],

	  propTypes: {
	    onSelect: React.PropTypes.func,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    title: React.PropTypes.string,
	    eventKey: React.PropTypes.any,
	    target: React.PropTypes.string
	  },

	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },

	  render: function () {
	    var $__0= 
	        
	        
	        
	        
	        
	        
	           this.props,disabled=$__0.disabled,active=$__0.active,href=$__0.href,title=$__0.title,target=$__0.target,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{disabled:1,active:1,href:1,title:1,target:1,children:1}),
	        classes = {
	          'active': active,
	          'disabled': disabled
	        };

	    return (
	      React.createElement("li", React.__spread({},  props, {className: joinClasses(props.className, classSet(classes))}), 
	        React.createElement("a", {
	          href: href, 
	          title: title, 
	          target: target, 
	          onClick: this.handleClick, 
	          ref: "anchor"}, 
	          children 
	        )
	      )
	    );
	  },

	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();

	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
	      }
	    }
	  }
	});

	module.exports = NavItem;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */

	"use strict";

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(4);
	var constants = __webpack_require__(15);

	var BootstrapMixin = {
	  propTypes: {
	    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
	    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
	    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
	  },

	  getBsClassSet: function () {
	    var classes = {};

	    var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
	    if (bsClass) {
	      classes[bsClass] = true;

	      var prefix = bsClass + '-';

	      var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
	      if (bsSize) {
	        classes[prefix + bsSize] = true;
	      }

	      var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
	      if (this.props.bsStyle) {
	        classes[prefix + bsStyle] = true;
	      }
	    }

	    return classes;
	  }
	};

	module.exports = BootstrapMixin;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  CLASSES: {
	    'alert': 'alert',
	    'button': 'btn',
	    'button-group': 'btn-group',
	    'button-toolbar': 'btn-toolbar',
	    'column': 'col',
	    'input-group': 'input-group',
	    'form': 'form',
	    'glyphicon': 'glyphicon',
	    'label': 'label',
	    'list-group-item': 'list-group-item',
	    'panel': 'panel',
	    'panel-group': 'panel-group',
	    'progress-bar': 'progress-bar',
	    'nav': 'nav',
	    'navbar': 'navbar',
	    'modal': 'modal',
	    'row': 'row',
	    'well': 'well'
	  },
	  STYLES: {
	    'default': 'default',
	    'primary': 'primary',
	    'success': 'success',
	    'info': 'info',
	    'warning': 'warning',
	    'danger': 'danger',
	    'link': 'link',
	    'inline': 'inline',
	    'tabs': 'tabs',
	    'pills': 'pills'
	  },
	  SIZES: {
	    'large': 'lg',
	    'medium': 'md',
	    'small': 'sm',
	    'xsmall': 'xs'
	  },
	  GLYPHS: [
	    'asterisk',
	    'plus',
	    'euro',
	    'eur',
	    'minus',
	    'cloud',
	    'envelope',
	    'pencil',
	    'glass',
	    'music',
	    'search',
	    'heart',
	    'star',
	    'star-empty',
	    'user',
	    'film',
	    'th-large',
	    'th',
	    'th-list',
	    'ok',
	    'remove',
	    'zoom-in',
	    'zoom-out',
	    'off',
	    'signal',
	    'cog',
	    'trash',
	    'home',
	    'file',
	    'time',
	    'road',
	    'download-alt',
	    'download',
	    'upload',
	    'inbox',
	    'play-circle',
	    'repeat',
	    'refresh',
	    'list-alt',
	    'lock',
	    'flag',
	    'headphones',
	    'volume-off',
	    'volume-down',
	    'volume-up',
	    'qrcode',
	    'barcode',
	    'tag',
	    'tags',
	    'book',
	    'bookmark',
	    'print',
	    'camera',
	    'font',
	    'bold',
	    'italic',
	    'text-height',
	    'text-width',
	    'align-left',
	    'align-center',
	    'align-right',
	    'align-justify',
	    'list',
	    'indent-left',
	    'indent-right',
	    'facetime-video',
	    'picture',
	    'map-marker',
	    'adjust',
	    'tint',
	    'edit',
	    'share',
	    'check',
	    'move',
	    'step-backward',
	    'fast-backward',
	    'backward',
	    'play',
	    'pause',
	    'stop',
	    'forward',
	    'fast-forward',
	    'step-forward',
	    'eject',
	    'chevron-left',
	    'chevron-right',
	    'plus-sign',
	    'minus-sign',
	    'remove-sign',
	    'ok-sign',
	    'question-sign',
	    'info-sign',
	    'screenshot',
	    'remove-circle',
	    'ok-circle',
	    'ban-circle',
	    'arrow-left',
	    'arrow-right',
	    'arrow-up',
	    'arrow-down',
	    'share-alt',
	    'resize-full',
	    'resize-small',
	    'exclamation-sign',
	    'gift',
	    'leaf',
	    'fire',
	    'eye-open',
	    'eye-close',
	    'warning-sign',
	    'plane',
	    'calendar',
	    'random',
	    'comment',
	    'magnet',
	    'chevron-up',
	    'chevron-down',
	    'retweet',
	    'shopping-cart',
	    'folder-close',
	    'folder-open',
	    'resize-vertical',
	    'resize-horizontal',
	    'hdd',
	    'bullhorn',
	    'bell',
	    'certificate',
	    'thumbs-up',
	    'thumbs-down',
	    'hand-right',
	    'hand-left',
	    'hand-up',
	    'hand-down',
	    'circle-arrow-right',
	    'circle-arrow-left',
	    'circle-arrow-up',
	    'circle-arrow-down',
	    'globe',
	    'wrench',
	    'tasks',
	    'filter',
	    'briefcase',
	    'fullscreen',
	    'dashboard',
	    'paperclip',
	    'heart-empty',
	    'link',
	    'phone',
	    'pushpin',
	    'usd',
	    'gbp',
	    'sort',
	    'sort-by-alphabet',
	    'sort-by-alphabet-alt',
	    'sort-by-order',
	    'sort-by-order-alt',
	    'sort-by-attributes',
	    'sort-by-attributes-alt',
	    'unchecked',
	    'expand',
	    'collapse-down',
	    'collapse-up',
	    'log-in',
	    'flash',
	    'log-out',
	    'new-window',
	    'record',
	    'save',
	    'open',
	    'saved',
	    'import',
	    'export',
	    'send',
	    'floppy-disk',
	    'floppy-saved',
	    'floppy-remove',
	    'floppy-save',
	    'floppy-open',
	    'credit-card',
	    'transfer',
	    'cutlery',
	    'header',
	    'compressed',
	    'earphone',
	    'phone-alt',
	    'tower',
	    'stats',
	    'sd-video',
	    'hd-video',
	    'subtitles',
	    'sound-stereo',
	    'sound-dolby',
	    'sound-5-1',
	    'sound-6-1',
	    'sound-7-1',
	    'copyright-mark',
	    'registration-mark',
	    'cloud-download',
	    'cloud-upload',
	    'tree-conifer',
	    'tree-deciduous',
	    'cd',
	    'save-file',
	    'open-file',
	    'level-up',
	    'copy',
	    'paste',
	    'alert',
	    'equalizer',
	    'king',
	    'queen',
	    'pawn',
	    'bishop',
	    'knight',
	    'baby-formula',
	    'tent',
	    'blackboard',
	    'bed',
	    'apple',
	    'erase',
	    'hourglass',
	    'lamp',
	    'duplicate',
	    'piggy-bank',
	    'scissors',
	    'bitcoin',
	    'yen',
	    'ruble',
	    'scale',
	    'ice-lolly',
	    'ice-lolly-tasted',
	    'education',
	    'option-horizontal',
	    'option-vertical',
	    'menu-hamburger',
	    'modal-window',
	    'oil',
	    'grain',
	    'sunglasses',
	    'text-size',
	    'text-color',
	    'text-background',
	    'object-align-top',
	    'object-align-bottom',
	    'object-align-horizontal',
	    'object-align-left',
	    'object-align-vertical',
	    'object-align-right',
	    'triangle-right',
	    'triangle-left',
	    'triangle-bottom',
	    'triangle-top',
	    'console',
	    'superscript',
	    'subscript',
	    'menu-left',
	    'menu-right',
	    'menu-down',
	    'menu-up'
	  ]
	};


/***/ }
/******/ ])