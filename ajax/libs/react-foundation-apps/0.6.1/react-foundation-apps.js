(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["RFA"] = factory(require("react"));
	else
		root["RFA"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_12__) {
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

	module.exports = {
	  Accordion: __webpack_require__(24),
	  ActionSheet: __webpack_require__(2),
	  Iconic: __webpack_require__(3),
	  Interchange: __webpack_require__(4),
	  Modal: __webpack_require__(5),
	  Notification: __webpack_require__(6),
	  OffCanvas: __webpack_require__(7),
	  Panel: __webpack_require__(8),
	  Popup: __webpack_require__(9),
	  Tabs: __webpack_require__(10),
	  Trigger: __webpack_require__(11),
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule cloneWithProps
	 */

	'use strict';

	var ReactElement = __webpack_require__(33);
	var ReactPropTransferer = __webpack_require__(34);

	var keyOf = __webpack_require__(35);
	var warning = __webpack_require__(32);

	var CHILDREN_PROP = keyOf({children: null});

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {ReactElement} child child element you'd like to clone
	 * @param {object} props props you'd like to modify. className and style will be
	 * merged automatically.
	 * @return {ReactElement} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if ("production" !== (undefined)) {
	    ("production" !== (undefined) ? warning(
	      !child.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }

	  var newProps = ReactPropTransferer.mergeProps(props, child.props);

	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }

	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return ReactElement.createElement(child.type, newProps);
	}

	module.exports = cloneWithProps;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cloneWithProps = __webpack_require__(1);
	var foundationApi = __webpack_require__(13);

	var ActionSheet = React.createClass({
	  displayName: "ActionSheet",

	  getInitialState: function getInitialState() {
	    return { active: false };
	  },
	  setActiveState: function setActiveState(active) {
	    this.setState({ active: active });
	  },
	  onBodyClick: function onBodyClick(e) {
	    var el = e.target;
	    var insideActionSheet = false;

	    do {
	      if (el.classList && el.classList.contains("action-sheet-container")) {
	        insideActionSheet = true;
	        break;
	      }
	    } while (el = el.parentNode);

	    if (!insideActionSheet) {
	      this.setActiveState(false);
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    if (this.props.id) {
	      foundationApi.subscribe(this.props.id, (function (name, msg) {
	        if (msg === "open") {
	          this.setState({ active: true });
	        } else if (msg === "close") {
	          this.setState({ active: false });
	        } else if (msg === "toggle") {
	          this.setState({ active: !this.state.active });
	        }
	      }).bind(this));
	    }
	    document.body.addEventListener("click", this.onBodyClick);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.id) foundationApi.unsubscribe(this.props.id);
	    document.body.removeEventListener("click", this.onBodyClick);
	  },
	  render: function render() {
	    var children = React.Children.map(this.props.children, (function (child, index) {
	      var extraProps = { active: this.state.active };
	      if (child.type.displayName === "ActionSheetButton") {
	        extraProps.setActiveState = this.setActiveState;
	      }
	      return cloneWithProps(child, extraProps);
	    }).bind(this));
	    return React.createElement(
	      "div",
	      { id: this.props.id, "data-closable": true, className: "action-sheet-container" },
	      children
	    );
	  }
	});

	module.exports = ActionSheet;
	ActionSheet.Button = __webpack_require__(15);
	ActionSheet.Content = __webpack_require__(16);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var ExecutionEnvironment = __webpack_require__(25);
	var IconicJs = ExecutionEnvironment.canUseDOM && __webpack_require__(14);
	var cloneWithProps = __webpack_require__(1);

	var Iconic = React.createClass({
	  displayName: "Iconic",

	  inject: function inject() {
	    var ico = IconicJs();
	    ico.inject(this.getDOMNode());
	  },
	  componentDidMount: function componentDidMount() {
	    this.inject();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.inject();
	  },
	  render: function render() {
	    return React.Children.only(this.props.children);
	  }
	});

	module.exports = Iconic;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var ResponsiveMixin = __webpack_require__(23);

	var namedQueries = {};

	var Interchange = React.createClass({
	  displayName: "Interchange",

	  mixins: [ResponsiveMixin],
	  getInitialState: function getInitialState() {
	    return { matchedMedia: "large" };
	  },
	  componentDidMount: function componentDidMount() {
	    // for (var name in namedQueries) {
	    //   this.media(namedQueries[name], function () {
	    //     this.setState({matchedMedia: name});
	    //   }.bind(this));
	    // }
	    this.media({ minWidth: 0, maxWidth: 640 }, (function () {
	      this.setState({ matchedMedia: "small" });
	    }).bind(this));
	    this.media({ minWidth: 641, maxWidth: 1200 }, (function () {
	      this.setState({ matchedMedia: "medium" });
	    }).bind(this));
	    this.media({ minWidth: 1200, maxWidth: 1440 }, (function () {
	      this.setState({ matchedMedia: "large" });
	    }).bind(this));
	  },
	  render: function render() {
	    var matchedNode = null;
	    React.Children.forEach(this.props.children, (function (child) {
	      if (child.props.media === this.state.matchedMedia) {
	        matchedNode = child;
	      }
	    }).bind(this));
	    return matchedNode;
	  }
	});

	module.exports = Interchange;

	// small: '(min-width: 0) and  (max-width: 640px)',
	// medium: '(min-width: 641px) and  (max-width: 1200px)',
	// large: '(min-width: 1201px) and  (max-width: 1440px)',
	// 'default' : 'only screen',
	// landscape : 'only screen and (orientation: landscape)',
	// portrait : 'only screen and (orientation: portrait)',
	// retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
	//   'only screen and (min--moz-device-pixel-ratio: 2),' +
	//   'only screen and (-o-min-device-pixel-ratio: 2/1),' +
	//   'only screen and (min-device-pixel-ratio: 2),' +
	//   'only screen and (min-resolution: 192dpi),' +
	//   'only screen and (min-resolution: 2dppx)'

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);
	var Animation = __webpack_require__(18);
	var foundationApi = __webpack_require__(13);

	var Modal = React.createClass({
	  displayName: "Modal",

	  getInitialState: function getInitialState() {
	    return { open: false };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      overlay: true,
	      overlayClose: true,
	      animationIn: "fadeIn",
	      animationOut: "fadeOut"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg === "open") {
	        this.setState({ open: true });
	      } else if (msg === "close") {
	        this.setState({ open: false });
	      } else if (msg === "toggle") {
	        this.setState({ open: !this.state.open });
	      }
	    }).bind(this));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    foundationApi.unsubscribe(this.props.id);
	  },
	  hideOverlay: function hideOverlay(e) {
	    e.preventDefault();
	    if (this.props.overlayClose) {
	      this.setState({ open: false });
	    }
	  },
	  stopClickPropagation: function stopClickPropagation(e) {
	    e.preventDefault();
	    e.stopProppagation();
	  },
	  render: function render() {
	    var overlayStyle = {};
	    if (!this.props.overlay) {
	      overlayStyle.background = "transparent";
	    }
	    return React.createElement(
	      Animation,
	      { active: this.state.open, animationIn: "fadeIn", animationOut: "fadeOut" },
	      React.createElement(
	        "div",
	        { className: "modal-overlay", style: overlayStyle, onClick: this.hideOverlay },
	        React.createElement(
	          Animation,
	          {
	            active: this.state.open,
	            animationIn: this.props.animationIn,
	            animationOut: this.props.animationOut
	          },
	          React.createElement(
	            "div",
	            { id: this.props.id, "data-closable": true, className: "modal", onClick: this.stopClickPropagation },
	            this.props.children
	          )
	        )
	      )
	    );
	  } });

	module.exports = Modal;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = {
	  Set: __webpack_require__(21),
	  Static: __webpack_require__(22)
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);
	// var LayerMixin = require('react-layer-mixin');
	var foundationApi = __webpack_require__(13);

	var Offcanvas = React.createClass({
	  displayName: "Offcanvas",

	  // mixins: [LayerMixin],
	  getInitialState: function getInitialState() {
	    return { open: false };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      position: "left"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg === "open") {
	        this.setState({ open: true });
	      } else if (msg === "close") {
	        this.setState({ open: false });
	      } else if (msg === "toggle") {
	        this.setState({ open: !this.state.open });
	      }
	    }).bind(this));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    foundationApi.unsubscribe(this.props.id);
	  },
	  render: function render() {
	    var classes = {
	      "off-canvas": true,
	      "is-active": this.state.open };
	    classes[this.props.position] = true;
	    if (this.props.className) {
	      classes[this.props.className] = true;
	    }
	    return React.createElement(
	      "div",
	      { id: this.props.id, "data-closable": true, className: cx(classes) },
	      this.props.children
	    );
	  } });

	module.exports = Offcanvas;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);
	var Animation = __webpack_require__(18);
	var foundationApi = __webpack_require__(13);

	var Panel = React.createClass({
	  displayName: "Panel",

	  getInitialState: function getInitialState() {
	    return { open: false };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      position: "left"
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg === "open") {
	        this.setState({ open: true });
	      } else if (msg === "close") {
	        this.setState({ open: false });
	      } else if (msg === "toggle") {
	        this.setState({ open: !this.state.open });
	      }
	    }).bind(this));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    foundationApi.unsubscribe(this.props.id);
	  },
	  render: function render() {
	    var animationIn, animationOut;
	    var classes = "panel panel-" + this.props.position;
	    if (this.props.className) {
	      classes += " " + this.props.className;
	    }
	    if (this.props.position === "left") {
	      animationIn = this.props.animationIn || "slideInRight";
	      animationOut = this.props.animationOut || "slideOutLeft";
	    } else if (this.props.position === "right") {
	      animationIn = this.props.animationIn || "slideInLeft";
	      animationOut = this.props.animationOut || "slideOutRight";
	    } else if (this.props.position === "top") {
	      animationIn = this.props.animationIn || "slideInDown";
	      animationOut = this.props.animationOut || "slideOutUp";
	    } else if (this.props.position === "bottom") {
	      animationIn = this.props.animationIn || "slideInUp";
	      animationOut = this.props.animationOut || "slideOutBottom";
	    }
	    return React.createElement(
	      Animation,
	      { active: this.state.open, animationIn: animationIn, animationOut: animationOut },
	      React.createElement(
	        "div",
	        { "data-closable": true, id: this.props.id, className: classes },
	        this.props.children
	      )
	    );
	  } });

	module.exports = Panel;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);
	var ExecutionEnvironment = __webpack_require__(25);
	var foundationApi = __webpack_require__(13);
	var Tether = ExecutionEnvironment.canUseDOM && __webpack_require__(27);

	var Popup = React.createClass({
	  displayName: "Popup",

	  getInitialState: function getInitialState() {
	    return {
	      active: false,
	      tetherInit: false
	    };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      pinTo: "top center",
	      pinAt: ""
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.tether = {};
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg[0] === "toggle") {
	        this.toggle(msg[1]);
	      }
	    }).bind(this));
	  },
	  toggle: function toggle(target) {
	    var active = !this.state.active;
	    this.setState({ active: active }, (function () {
	      if (active) {
	        this.tetherElement(target);
	      } else {
	        this.tether.destroy();
	      }
	    }).bind(this));
	  },
	  tetherElement: function tetherElement(target) {
	    var targetElement = document.getElementById(target);
	    var attachment = "top center";
	    this.tether = new Tether({
	      element: this.getDOMNode(),
	      target: targetElement,
	      attachment: attachment });
	  },
	  render: function render() {
	    var classes = {
	      popup: true,
	      "is-active": this.state.active
	    };
	    return React.createElement(
	      "div",
	      { id: this.props.id, className: cx(classes), "data-closable": "popup" },
	      this.props.children
	    );
	  } });

	module.exports = Popup;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cloneWithProps = __webpack_require__(1);

	var Tabs = React.createClass({
	  displayName: "Tabs",

	  getInitialState: function getInitialState() {
	    return {
	      selectedTab: 0,
	      content: null
	    };
	  },
	  selectTab: function selectTab(options) {
	    this.setState(options);
	  },
	  render: function render() {
	    var children = React.Children.map(this.props.children, (function (child, index) {
	      return cloneWithProps(child, {
	        active: index === this.state.selectedTab,
	        index: index,
	        selectTab: this.selectTab
	      });
	    }).bind(this));
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "tabs" },
	        children
	      ),
	      React.createElement(
	        "div",
	        null,
	        this.state.content
	      )
	    );
	  }
	});

	module.exports = Tabs;
	Tabs.Tab = __webpack_require__(19);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cloneWithProps = __webpack_require__(1);
	var foundationApi = __webpack_require__(13);
	var PopupToggle = __webpack_require__(20);

	var Trigger = React.createClass({
	  displayName: "Trigger",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      open: null,
	      close: null,
	      toggle: null,
	      hardToggle: null,
	      popupToggle: null,
	      notify: null
	    };
	  },
	  getCloseId: function getCloseId() {
	    if (this.props.close) {
	      return this.props.close;
	    } else {
	      var parentElement = false;
	      var tempElement = this.getDOMNode().parentNode;
	      while (parentElement === false) {
	        if (tempElement.nodeName == "BODY") {
	          parentElement = "";
	        }
	        if (typeof tempElement.getAttribute("data-closable") !== "undefined" && tempElement.getAttribute("data-closable") !== false) {
	          parentElement = tempElement;
	        }

	        tempElement = tempElement.parentNode;
	      }
	      return parentElement.getAttribute("id");
	    }
	  },
	  clickHandler: function clickHandler(e) {
	    e.preventDefault();
	    if (this.props.open) {
	      foundationApi.publish(this.props.open, "open");
	    } else if (this.props.close !== null) {
	      foundationApi.publish(this.getCloseId(), "close");
	    } else if (this.props.toggle) {
	      foundationApi.publish(this.props.toggle, "toggle");
	    } else if (this.props.hardToggle) {
	      foundationApi.closeActiveElements({ exclude: this.props.hardToggle });
	      foundationApi.publish(this.props.hardToggle, "toggle");
	    } else if (this.props.notify) {
	      foundationApi.publish(this.props.notify, {
	        title: this.props.title,
	        content: this.props.content,
	        position: this.props.position,
	        color: this.props.color,
	        image: this.props.image
	      });
	    }
	  },
	  render: function render() {
	    if (this.props.popupToggle) {
	      return React.createElement(PopupToggle, this.props);
	    } else {
	      var child = React.Children.only(this.props.children);
	      return cloneWithProps(child, {
	        onClick: this.clickHandler
	      });
	    }
	  }
	});

	module.exports = Trigger;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//From https://github.com/zurb/foundation-apps/blob/master/js/angular/common/common.services.js
	var PubSub = __webpack_require__(36);
	var assign = __webpack_require__(31);

	var listeners = [];
	var settings  = {};
	var uniqueIds = [];

	var foundationApi = {
	  subscribe: PubSub.subscribe,
	  publish: PubSub.publish,
	  unsubscribe: PubSub.unsubscribe,
	  closeActiveElements: function(options) {
	    var self = this;
	    options = options || {};
	    var activeElements = document.querySelectorAll('.is-active[data-closable]');
	    Array.prototype.forEach.call(activeElements, function (el) {
	      if (options.exclude !== el.id) {
	        self.publish(el.id, 'close');
	      }
	    });
	  },
	  getSettings: function() {
	    return settings;
	  },
	  modifySettings: function(tree) {
	    settings = angular.extend(settings, tree);
	    return settings;
	  },
	  generateUuid: function() {
	    var uuid = '';

	    //little trick to produce semi-random IDs
	    do {
	      uuid += 'zf-uuid-';
	      for (var i=0; i<15; i++) {
	        uuid += Math.floor(Math.random()*16).toString(16);
	      }
	    } while(!uniqueIds.indexOf(uuid));

	    uniqueIds.push(uuid);
	    return uuid;
	  }, 
	};

	module.exports = foundationApi;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * iconic.js v0.4.0 - The Iconic JavaScript library
	 * Copyright (c) 2014 Waybury - http://useiconic.com
	 */

	!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.IconicJS=a():"undefined"!=typeof global?global.IconicJS=a():"undefined"!=typeof self&&(self.IconicJS=a())}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};a[g][0].call(j.exports,function(b){var c=a[g][1][b];return e(c?c:b)},j,j.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=(a("./modules/polyfills"),a("./modules/svg-injector")),d=a("./modules/extend"),e=a("./modules/responsive"),f=a("./modules/position"),g=a("./modules/container"),h=a("./modules/log"),i={},j=window.iconicSmartIconApis={},k=("file:"===window.location.protocol,0),l=function(a,b,e){b=d({},i,b||{});var f={evalScripts:b.evalScripts,pngFallback:b.pngFallback};f.each=function(a){if(a)if("string"==typeof a)h.debug(a);else if(a instanceof SVGSVGElement){var c=a.getAttribute("data-icon");if(c&&j[c]){var d=j[c](a);for(var e in d)a[e]=d[e]}/iconic-bg-/.test(a.getAttribute("class"))&&g.addBackground(a),m(a),k++,b&&b.each&&"function"==typeof b.each&&b.each(a)}},"string"==typeof a&&(a=document.querySelectorAll(a)),c(a,f,e)},m=function(a){var b=[];a?"string"==typeof a?b=document.querySelectorAll(a):void 0!==a.length?b=a:"object"==typeof a&&b.push(a):b=document.querySelectorAll("svg.iconic"),Array.prototype.forEach.call(b,function(a){a instanceof SVGSVGElement&&(a.update&&a.update(),e.refresh(a),f.refresh(a))})},n=function(){i.debug&&console.time&&console.time("autoInjectSelector - "+i.autoInjectSelector);var a=k;l(i.autoInjectSelector,{},function(){if(i.debug&&console.timeEnd&&console.timeEnd("autoInjectSelector - "+i.autoInjectSelector),h.debug("AutoInjected: "+(k-a)),e.refreshAll(),i.autoInjectDone&&"function"==typeof i.autoInjectDone){var b=k-a;i.autoInjectDone(b)}})},o=function(a){a&&""!==a&&"complete"!==document.readyState?document.addEventListener("DOMContentLoaded",n):document.removeEventListener("DOMContentLoaded",n)},p=function(a){return a=a||{},d(i,a),o(i.autoInjectSelector),h.enableDebug(i.debug),window._Iconic?window._Iconic:{inject:l,update:m,smartIconApis:j,svgInjectedCount:k}};b.exports=p,window._Iconic=new p({autoInjectSelector:"img.iconic",evalScripts:"once",pngFallback:!1,each:null,autoInjectDone:null,debug:!1})},{"./modules/container":2,"./modules/extend":3,"./modules/log":4,"./modules/polyfills":5,"./modules/position":6,"./modules/responsive":7,"./modules/svg-injector":8}],2:[function(a,b){var c=function(a){var b=a.getAttribute("class").split(" "),c=-1!==b.indexOf("iconic-fluid"),d=[],e=["iconic-bg"];Array.prototype.forEach.call(b,function(a){switch(a){case"iconic-sm":case"iconic-md":case"iconic-lg":d.push(a),c||e.push(a.replace(/-/,"-bg-"));break;case"iconic-fluid":d.push(a),e.push(a.replace(/-/,"-bg-"));break;case"iconic-bg-circle":case"iconic-bg-rounded-rect":case"iconic-bg-badge":e.push(a);break;default:d.push(a)}}),a.setAttribute("class",d.join(" "));var f=a.parentNode,g=Array.prototype.indexOf.call(f.childNodes,a),h=document.createElement("span");h.setAttribute("class",e.join(" ")),h.appendChild(a),f.insertBefore(h,f.childNodes[g])};b.exports={addBackground:c}},{}],3:[function(a,b){b.exports=function(a){return Array.prototype.forEach.call(Array.prototype.slice.call(arguments,1),function(b){if(b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}),a}},{}],4:[function(a,b){var c=!1,d=function(a){console&&console.log&&console.log(a)},e=function(a){d("Iconic INFO: "+a)},f=function(a){d("Iconic WARNING: "+a)},g=function(a){c&&d("Iconic DEBUG: "+a)},h=function(a){c=a};b.exports={info:e,warn:f,debug:g,enableDebug:h}},{}],5:[function(){Array.prototype.forEach||(Array.prototype.forEach=function(a,b){"use strict";if(void 0===this||null===this||"function"!=typeof a)throw new TypeError;var c,d=this.length>>>0;for(c=0;d>c;++c)c in this&&a.call(b,this[c],c,this)}),function(){if(Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Event.prototype.stopPropagation||(Event.prototype.stopPropagation=function(){this.cancelBubble=!0}),!Element.prototype.addEventListener){var a=[],b=function(b,c){var d=this,e=function(a){a.target=a.srcElement,a.currentTarget=d,c.handleEvent?c.handleEvent(a):c.call(d,a)};if("DOMContentLoaded"==b){var f=function(a){"complete"==document.readyState&&e(a)};if(document.attachEvent("onreadystatechange",f),a.push({object:this,type:b,listener:c,wrapper:f}),"complete"==document.readyState){var g=new Event;g.srcElement=window,f(g)}}else this.attachEvent("on"+b,e),a.push({object:this,type:b,listener:c,wrapper:e})},c=function(b,c){for(var d=0;d<a.length;){var e=a[d];if(e.object==this&&e.type==b&&e.listener==c){"DOMContentLoaded"==b?this.detachEvent("onreadystatechange",e.wrapper):this.detachEvent("on"+b,e.wrapper);break}++d}};Element.prototype.addEventListener=b,Element.prototype.removeEventListener=c,HTMLDocument&&(HTMLDocument.prototype.addEventListener=b,HTMLDocument.prototype.removeEventListener=c),Window&&(Window.prototype.addEventListener=b,Window.prototype.removeEventListener=c)}}()},{}],6:[function(a,b){var c=function(a){var b=a.getAttribute("data-position");if(b&&""!==b){var c,d,e,f,g,h,i,j=a.getAttribute("width"),k=a.getAttribute("height"),l=b.split("-"),m=a.querySelectorAll("g.iconic-container");Array.prototype.forEach.call(m,function(a){if(c=a.getAttribute("data-width"),d=a.getAttribute("data-height"),c!==j||d!==k){if(e=a.getAttribute("transform"),f=1,e){var b=e.match(/scale\((\d)/);f=b&&b[1]?b[1]:1}g=Math.floor((j/f-c)/2),h=Math.floor((k/f-d)/2),Array.prototype.forEach.call(l,function(a){switch(a){case"top":h=0;break;case"bottom":h=k/f-d;break;case"left":g=0;break;case"right":g=j/f-c;break;case"center":break;default:console&&console.log&&console.log("Unknown position: "+a)}}),i=0===h?g:g+" "+h,i="translate("+i+")",e?/translate/.test(e)?e=e.replace(/translate\(.*?\)/,i):e+=" "+i:e=i,a.setAttribute("transform",e)}})}};b.exports={refresh:c}},{}],7:[function(a,b){var c=/(iconic-sm\b|iconic-md\b|iconic-lg\b)/,d=function(a,b){var c="undefined"!=typeof window.getComputedStyle&&window.getComputedStyle(a,null).getPropertyValue(b);return!c&&a.currentStyle&&(c=a.currentStyle[b.replace(/([a-z])\-([a-z])/,function(a,b,c){return b+c.toUpperCase()})]||a.currentStyle[b]),c},e=function(a){var b=a.style.display;a.style.display="block";var c=parseFloat(d(a,"width").slice(0,-2)),e=parseFloat(d(a,"height").slice(0,-2));return a.style.display=b,{width:c,height:e}},f=function(){var a="/* Iconic Responsive Support Styles */\n.iconic-property-fill, .iconic-property-text {stroke: none !important;}\n.iconic-property-stroke {fill: none !important;}\nsvg.iconic.iconic-fluid {height:100% !important;width:100% !important;}\nsvg.iconic.iconic-sm:not(.iconic-size-md):not(.iconic-size-lg), svg.iconic.iconic-size-sm{width:16px;height:16px;}\nsvg.iconic.iconic-md:not(.iconic-size-sm):not(.iconic-size-lg), svg.iconic.iconic-size-md{width:32px;height:32px;}\nsvg.iconic.iconic-lg:not(.iconic-size-sm):not(.iconic-size-md), svg.iconic.iconic-size-lg{width:128px;height:128px;}\nsvg.iconic-sm > g.iconic-md, svg.iconic-sm > g.iconic-lg, svg.iconic-md > g.iconic-sm, svg.iconic-md > g.iconic-lg, svg.iconic-lg > g.iconic-sm, svg.iconic-lg > g.iconic-md {display: none;}\nsvg.iconic.iconic-icon-sm > g.iconic-lg, svg.iconic.iconic-icon-md > g.iconic-lg {display:none;}\nsvg.iconic-sm:not(.iconic-icon-md):not(.iconic-icon-lg) > g.iconic-sm, svg.iconic-md.iconic-icon-sm > g.iconic-sm, svg.iconic-lg.iconic-icon-sm > g.iconic-sm {display:inline;}\nsvg.iconic-md:not(.iconic-icon-sm):not(.iconic-icon-lg) > g.iconic-md, svg.iconic-sm.iconic-icon-md > g.iconic-md, svg.iconic-lg.iconic-icon-md > g.iconic-md {display:inline;}\nsvg.iconic-lg:not(.iconic-icon-sm):not(.iconic-icon-md) > g.iconic-lg, svg.iconic-sm.iconic-icon-lg > g.iconic-lg, svg.iconic-md.iconic-icon-lg > g.iconic-lg {display:inline;}";navigator&&navigator.userAgent&&/MSIE 10\.0/.test(navigator.userAgent)&&(a+="svg.iconic{zoom:1.0001;}");var b=document.createElement("style");b.id="iconic-responsive-css",b.type="text/css",b.styleSheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a)),(document.head||document.getElementsByTagName("head")[0]).appendChild(b)},g=function(a){if(/iconic-fluid/.test(a.getAttribute("class"))){var b,d=e(a),f=a.viewBox.baseVal.width/a.viewBox.baseVal.height;b=1===f?Math.min(d.width,d.height):1>f?d.width:d.height;var g;g=32>b?"iconic-sm":b>=32&&128>b?"iconic-md":"iconic-lg";var h=a.getAttribute("class"),i=c.test(h)?h.replace(c,g):h+" "+g;a.setAttribute("class",i)}},h=function(){var a=document.querySelectorAll(".injected-svg.iconic-fluid");Array.prototype.forEach.call(a,function(a){g(a)})};document.addEventListener("DOMContentLoaded",function(){f()}),window.addEventListener("resize",function(){h()}),b.exports={refresh:g,refreshAll:h}},{}],8:[function(b,c,d){!function(b,e){"use strict";function f(a){a=a.split(" ");for(var b={},c=a.length,d=[];c--;)b.hasOwnProperty(a[c])||(b[a[c]]=1,d.unshift(a[c]));return d.join(" ")}var g="file:"===b.location.protocol,h=e.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"),i=Array.prototype.forEach||function(a,b){if(void 0===this||null===this||"function"!=typeof a)throw new TypeError;var c,d=this.length>>>0;for(c=0;d>c;++c)c in this&&a.call(b,this[c],c,this)},j={},k=0,l=[],m=[],n={},o=function(a){return a.cloneNode(!0)},p=function(a,b){m[a]=m[a]||[],m[a].push(b)},q=function(a){for(var b=0,c=m[a].length;c>b;b++)!function(b){setTimeout(function(){m[a][b](o(j[a]))},0)}(b)},r=function(a,c){if(void 0!==j[a])j[a]instanceof SVGSVGElement?c(o(j[a])):p(a,c);else{if(!b.XMLHttpRequest)return c("Browser does not support XMLHttpRequest"),!1;j[a]={},p(a,c);var d=new XMLHttpRequest;d.onreadystatechange=function(){if(4===d.readyState){if(404===d.status||null===d.responseXML)return c("Unable to load SVG file: "+a),g&&c("Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver."),c(),!1;if(!(200===d.status||g&&0===d.status))return c("There was a problem injecting the SVG: "+d.status+" "+d.statusText),!1;if(d.responseXML instanceof Document)j[a]=d.responseXML.documentElement;else if(DOMParser&&DOMParser instanceof Function){var b;try{var e=new DOMParser;b=e.parseFromString(d.responseText,"text/xml")}catch(f){b=void 0}if(!b||b.getElementsByTagName("parsererror").length)return c("Unable to parse SVG file: "+a),!1;j[a]=b.documentElement}q(a)}},d.open("GET",a),d.overrideMimeType&&d.overrideMimeType("text/xml"),d.send()}},s=function(a,c,d,e){var g=a.getAttribute("data-src")||a.getAttribute("src");if(!/svg$/i.test(g))return e("Attempted to inject a file with a non-svg extension: "+g),void 0;if(!h){var j=a.getAttribute("data-fallback")||a.getAttribute("data-png");return j?(a.setAttribute("src",j),e(null)):d?(a.setAttribute("src",d+"/"+g.split("/").pop().replace(".svg",".png")),e(null)):e("This browser does not support SVG and no PNG fallback was defined."),void 0}-1===l.indexOf(a)&&(l.push(a),a.setAttribute("src",""),r(g,function(d){if("undefined"==typeof d||"string"==typeof d)return e(d),!1;var h=a.getAttribute("id");h&&d.setAttribute("id",h);var j=a.getAttribute("title");j&&d.setAttribute("title",j);var m=[].concat(d.getAttribute("class")||[],"injected-svg",a.getAttribute("class")||[]).join(" ");d.setAttribute("class",f(m));var o=a.getAttribute("style");o&&d.setAttribute("style",o);var p=[].filter.call(a.attributes,function(a){return/^data-\w[\w\-]*$/.test(a.name)});i.call(p,function(a){a.name&&a.value&&d.setAttribute(a.name,a.value)});for(var q,r=d.querySelectorAll("defs clipPath[id]"),s=0,t=r.length;t>s;s++){q=r[s].id+"-"+k;for(var u=d.querySelectorAll('[clip-path*="'+r[s].id+'"]'),v=0,w=u.length;w>v;v++)u[v].setAttribute("clip-path","url(#"+q+")");r[s].id=q}d.removeAttribute("xmlns:a");for(var x,y,z=d.querySelectorAll("script"),A=[],B=0,C=z.length;C>B;B++)y=z[B].getAttribute("type"),y&&"application/ecmascript"!==y&&"application/javascript"!==y||(x=z[B].innerText||z[B].textContent,A.push(x),d.removeChild(z[B]));if(A.length>0&&("always"===c||"once"===c&&!n[g])){for(var D=0,E=A.length;E>D;D++)new Function(A[D])(b);n[g]=!0}a.parentNode.replaceChild(d,a),delete l[l.indexOf(a)],a=null,k++,e(d)}))},t=function(a,b,c){b=b||{};var d=b.evalScripts||"always",e=b.pngFallback||!1,f=b.each;if(void 0!==a.length){var g=0;i.call(a,function(b){s(b,d,e,function(b){f&&"function"==typeof f&&f(b),c&&a.length===++g&&c(g)})})}else a?s(a,d,e,function(b){f&&"function"==typeof f&&f(b),c&&c(1),a=null}):c&&c(0)};"object"==typeof c&&"object"==typeof c.exports?c.exports=d=t:"function"==typeof a&&a.amd?a(function(){return t}):"object"==typeof b&&(b.SVGInjector=t)}(window,document)},{}]},{},[1])(1)});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);

	var ActionSheetButton = React.createClass({
	  displayName: "ActionSheetButton",

	  toggle: function toggle() {
	    this.props.setActiveState(!this.props.active);
	  },
	  render: function render() {
	    var Title = null;
	    if (this.props.title.length > 0) {
	      Title = React.createElement(
	        "a",
	        { className: "button" },
	        this.props.title
	      );
	    }
	    return React.createElement(
	      "div",
	      { onClick: this.toggle },
	      Title,
	      React.createElement(
	        "div",
	        null,
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = ActionSheetButton;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);

	var ActionSheetContent = React.createClass({
	  displayName: "ActionSheetContent",

	  getDefaultProps: function getDefaultProps() {
	    return { position: "bottom" };
	  },
	  render: function render() {
	    var classes = {
	      "action-sheet": true,
	      "is-active": this.props.active
	    };
	    return React.createElement(
	      "div",
	      { className: cx(classes) },
	      this.props.children
	    );
	  }
	});

	module.exports = ActionSheetContent;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);

	var AccordionItem = React.createClass({
	  displayName: "AccordionItem",

	  render: function render() {
	    var itemClasses = {
	      "accordion-item": true,
	      "is-active": this.props.active
	    };
	    return React.createElement(
	      "div",
	      { className: cx(itemClasses) },
	      React.createElement(
	        "div",
	        { className: "accordion-title", onClick: this.props.activate },
	        this.props.title
	      ),
	      React.createElement(
	        "div",
	        { className: "accordion-content" },
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = AccordionItem;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// some parts of code from react/lib/ReactCSSTransitionGroupChild.js
	"use strict";

	var React = __webpack_require__(12);
	var ReactTransitionEvents = __webpack_require__(28);
	var CSSCore = __webpack_require__(29);
	var cloneWithProps = __webpack_require__(1);
	var cx = __webpack_require__(26);
	var TICK = 17;

	var Animation = React.createClass({
	  displayName: "Animation",

	  getInitialState: function getInitialState() {
	    return {};
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      active: false,
	      animationIn: "",
	      animationOut: ""
	    };
	  },
	  reflow: function reflow(node) {
	    return node.offsetWidth;
	  },
	  reset: function reset(node) {
	    node.style.transitionDuration = 0;
	    CSSCore.removeClass(node, "ng-enter");
	    CSSCore.removeClass(node, "ng-leave");
	    CSSCore.removeClass(node, "ng-enter-active");
	    CSSCore.removeClass(node, "ng-leave-active");
	    CSSCore.removeClass(node, this.props.animationIn);
	    CSSCore.removeClass(node, this.props.animationOut);
	  },
	  finishAnimation: function finishAnimation() {
	    var node = this.getDOMNode();
	    this.reset(node);
	    CSSCore.removeClass(node, this.props.active ? "" : "is-active");
	    this.reflow(node);
	    ReactTransitionEvents.removeEndEventListener(node, this.finishAnimation);
	  },
	  animate: function animate(animationClass, animationType) {
	    var node = this.getDOMNode();
	    var initClass = "ng-" + animationType;
	    var activeClass = initClass + "-active";

	    this.reset(node);
	    CSSCore.addClass(node, animationClass);
	    CSSCore.addClass(node, initClass);
	    CSSCore.addClass(node, "is-active");

	    //force a "tick"
	    this.reflow(node);

	    //activate
	    node.style.transitionDuration = "";
	    CSSCore.addClass(node, activeClass);

	    ReactTransitionEvents.addEndEventListener(node, this.finishAnimation);
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    if (prevProps.active !== this.props.active) {
	      var animationClass = this.props.active ? this.props.animationIn : this.props.animationOut;
	      var animationType = this.props.active ? "enter" : "leave";
	      this.animate(animationClass, animationType);
	    }
	  },
	  render: function render() {
	    var child = React.Children.only(this.props.children);
	    var extraProps = {};
	    return cloneWithProps(child, extraProps);
	  }
	});

	module.exports = Animation;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);

	var Tab = React.createClass({
	  displayName: "Tab",

	  componentDidMount: function componentDidMount() {
	    if (this.props.active) {
	      this.select();
	    }
	  },
	  select: function select() {
	    var options = {
	      selectedTab: this.props.index,
	      content: this.props.children
	    };
	    this.props.selectTab(options);
	  },
	  render: function render() {
	    var classes = {
	      "tab-item": true,
	      "is-active": this.props.active
	    };
	    return React.createElement(
	      "div",
	      { className: cx(classes), onClick: this.select },
	      this.props.title
	    );
	  }
	});

	module.exports = Tab;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var foundationApi = __webpack_require__(13);
	var cloneWithProps = __webpack_require__(1);

	var PopupToggle = React.createClass({
	  displayName: "PopupToggle",

	  clickHandler: function clickHandler(id, e) {
	    e.preventDefault();
	    foundationApi.publish(this.props.popupToggle, ["toggle", id]);
	  },
	  render: function render() {
	    var child = React.Children.only(this.props.children);
	    var id = this.props.id || foundationApi.generateUuid();
	    return cloneWithProps(child, {
	      id: id,
	      onClick: this.clickHandler.bind(this, id)
	    });
	  }
	});

	module.exports = PopupToggle;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(12);
	var foundationApi = __webpack_require__(13);
	var Notification = __webpack_require__(30);
	var Animation = __webpack_require__(18);

	var NotificationSet = React.createClass({
	  displayName: "NotificationSet",

	  getInitialState: function getInitialState() {
	    return { notifications: [] };
	  },
	  componentDidMount: function componentDidMount() {
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg === "clearall") {
	        this.clearAll();
	      } else {
	        this.addNotification(msg);
	      }
	    }).bind(this));
	  },
	  addNotification: function addNotification(notification) {
	    notification.id = foundationApi.generateUuid();
	    var notifications = this.state.notifications.concat(notification);
	    this.setState({
	      notifications: notifications
	    });
	  },
	  removeNotifcation: function removeNotifcation(id) {
	    return (function (e) {
	      var notifications = [];
	      this.state.notifications.forEach(function (notification) {
	        if (notification.id !== id) {
	          notifications.push(notification);
	        }
	      });
	      this.setState({
	        notifications: notifications
	      });
	      e.preventDefault();
	    }).bind(this);
	  },
	  clearAll: function clearAll() {
	    this.setState({ notifications: [] });
	  },
	  render: function render() {
	    var notifications = this.state.notifications.map((function (notification) {
	      return React.createElement(
	        Notification,
	        _extends({ key: notification.id }, notification, { closeHandler: this.removeNotifcation(notification.id), className: "is-active" }),
	        notification.content
	      );
	    }).bind(this));
	    return React.createElement(
	      "div",
	      null,
	      notifications
	    );
	  }
	});

	module.exports = NotificationSet;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(12);
	var cx = __webpack_require__(26);
	var foundationApi = __webpack_require__(13);
	var Animation = __webpack_require__(18);
	var Notification = __webpack_require__(30);

	var NotificationStatic = React.createClass({
	  displayName: "NotificationStatic",

	  getInitialState: function getInitialState() {
	    return { open: false };
	  },
	  componentDidMount: function componentDidMount() {
	    foundationApi.subscribe(this.props.id, (function (name, msg) {
	      if (msg === "open") {
	        this.setState({ open: true });
	      } else if (msg === "close") {
	        this.setState({ open: false });
	      }
	    }).bind(this));
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    foundationApi.unsubscribe(this.props.id);
	  },
	  closeHandler: function closeHandler(e) {
	    this.setState({ open: false });
	    e.preventDefault();
	    e.stopPropagation();
	  },
	  render: function render() {
	    return React.createElement(
	      Animation,
	      { active: this.state.open, animationIn: "fadeIn", animationOut: "fadeOut" },
	      React.createElement(
	        Notification,
	        _extends({}, this.props, { closeHandler: this.closeHandler }),
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = NotificationStatic;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var canUseDOM = __webpack_require__(38);
	var enquire = canUseDOM && __webpack_require__(41);
	var json2mq = __webpack_require__(39);

	var ResponsiveMixin = {
	  media: function (query, handler) {
	    query = json2mq(query);
	    if (typeof handler === 'function') {
	      handler = {
	        match: handler
	      };
	    }
	    enquire.register(query, handler);

	    // Queue the handlers to unregister them at unmount  
	    if (! this._responsiveMediaHandlers) {
	      this._responsiveMediaHandlers = [];
	    }
	    this._responsiveMediaHandlers.push({query: query, handler: handler});
	  },
	  componentWillUnmount: function () {
	    this._responsiveMediaHandlers.forEach(function(obj) {
	      enquire.unregister(obj.query, obj.handler);
	    });
	  }
	};

	module.exports = ResponsiveMixin;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);
	var cloneWithProps = __webpack_require__(1);

	var Accordion = React.createClass({
	  displayName: "Accordion",

	  getInitialState: function getInitialState() {
	    return { sections: [] };
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      autoOpen: true,
	      multiOpen: false,
	      collapsible: false
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    var sections = [];
	    React.Children.forEach(this.props.children, function (child, index) {
	      sections.push({ active: false });
	    });
	    if (this.props.autoOpen) {
	      sections[0].active = true;
	    }
	    this.setState({ sections: sections });
	  },
	  select: function select(selectSection) {
	    var sections = this.state.sections;
	    sections.forEach((function (section, index) {
	      if (this.props.multiOpen) {
	        if (index === selectSection) {
	          section.active = !section.active;
	        }
	      } else {
	        if (index === selectSection) {
	          section.active = this.props.collapsible === true ? !section.active : true;
	        } else {
	          section.active = false;
	        }
	      }
	    }).bind(this));
	    this.setState({ sections: sections });
	  },
	  render: function render() {
	    var children = React.Children.map(this.props.children, (function (child, index) {
	      return cloneWithProps(child, {
	        active: this.state.sections[index] ? this.state.sections[index].active : false,
	        activate: this.select.bind(this, index)
	      });
	    }).bind(this));
	    return React.createElement(
	      "div",
	      { className: "accordion" },
	      children
	    );
	  }
	});

	module.exports = Accordion;
	Accordion.Item = __webpack_require__(17);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var canUseDOM = !!(
	  (typeof window !== 'undefined' &&
	  window.document && window.document.createElement)
	);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
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

	'use strict';
	var warning = __webpack_require__(32);

	var warned = false;

	function cx(classNames) {
	  if ("production" !== (undefined)) {
	    ("production" !== (undefined) ? warning(
	      warned,
	      'React.addons.classSet will be deprecated in a future version. See ' +
	      'http://fb.me/react-addons-classset'
	    ) : null);
	    warned = true;
	  }

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 0.6.5 */


	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require,exports,module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require,exports,module) {

	(function() {
	  var Evented, addClass, defer, deferred, extend, flush, getBounds, getClassName, getOffsetParent, getOrigin, getScrollBarSize, getScrollParent, hasClass, node, removeClass, setClassName, uniqueId, updateClasses, zeroPosCache,
	    __hasProp = {}.hasOwnProperty,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	    __slice = [].slice;

	  if (this.Tether == null) {
	    this.Tether = {
	      modules: []
	    };
	  }

	  getScrollParent = function(el) {
	    var parent, position, scrollParent, style, _ref;
	    position = getComputedStyle(el).position;
	    if (position === 'fixed') {
	      return el;
	    }
	    scrollParent = void 0;
	    parent = el;
	    while (parent = parent.parentNode) {
	      try {
	        style = getComputedStyle(parent);
	      } catch (_error) {}
	      if (style == null) {
	        return parent;
	      }
	      if (/(auto|scroll)/.test(style['overflow'] + style['overflowY'] + style['overflowX'])) {
	        if (position !== 'absolute' || ((_ref = style['position']) === 'relative' || _ref === 'absolute' || _ref === 'fixed')) {
	          return parent;
	        }
	      }
	    }
	    return document.body;
	  };

	  uniqueId = (function() {
	    var id;
	    id = 0;
	    return function() {
	      return id++;
	    };
	  })();

	  zeroPosCache = {};

	  getOrigin = function(doc) {
	    var id, k, node, v, _ref;
	    node = doc._tetherZeroElement;
	    if (node == null) {
	      node = doc.createElement('div');
	      node.setAttribute('data-tether-id', uniqueId());
	      extend(node.style, {
	        top: 0,
	        left: 0,
	        position: 'absolute'
	      });
	      doc.body.appendChild(node);
	      doc._tetherZeroElement = node;
	    }
	    id = node.getAttribute('data-tether-id');
	    if (zeroPosCache[id] == null) {
	      zeroPosCache[id] = {};
	      _ref = node.getBoundingClientRect();
	      for (k in _ref) {
	        v = _ref[k];
	        zeroPosCache[id][k] = v;
	      }
	      defer(function() {
	        return zeroPosCache[id] = void 0;
	      });
	    }
	    return zeroPosCache[id];
	  };

	  node = null;

	  getBounds = function(el) {
	    var box, doc, docEl, k, origin, v, _ref;
	    if (el === document) {
	      doc = document;
	      el = document.documentElement;
	    } else {
	      doc = el.ownerDocument;
	    }
	    docEl = doc.documentElement;
	    box = {};
	    _ref = el.getBoundingClientRect();
	    for (k in _ref) {
	      v = _ref[k];
	      box[k] = v;
	    }
	    origin = getOrigin(doc);
	    box.top -= origin.top;
	    box.left -= origin.left;
	    if (box.width == null) {
	      box.width = document.body.scrollWidth - box.left - box.right;
	    }
	    if (box.height == null) {
	      box.height = document.body.scrollHeight - box.top - box.bottom;
	    }
	    box.top = box.top - docEl.clientTop;
	    box.left = box.left - docEl.clientLeft;
	    box.right = doc.body.clientWidth - box.width - box.left;
	    box.bottom = doc.body.clientHeight - box.height - box.top;
	    return box;
	  };

	  getOffsetParent = function(el) {
	    return el.offsetParent || document.documentElement;
	  };

	  getScrollBarSize = function() {
	    var inner, outer, width, widthContained, widthScroll;
	    inner = document.createElement('div');
	    inner.style.width = '100%';
	    inner.style.height = '200px';
	    outer = document.createElement('div');
	    extend(outer.style, {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      pointerEvents: 'none',
	      visibility: 'hidden',
	      width: '200px',
	      height: '150px',
	      overflow: 'hidden'
	    });
	    outer.appendChild(inner);
	    document.body.appendChild(outer);
	    widthContained = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    widthScroll = inner.offsetWidth;
	    if (widthContained === widthScroll) {
	      widthScroll = outer.clientWidth;
	    }
	    document.body.removeChild(outer);
	    width = widthContained - widthScroll;
	    return {
	      width: width,
	      height: width
	    };
	  };

	  extend = function(out) {
	    var args, key, obj, val, _i, _len, _ref;
	    if (out == null) {
	      out = {};
	    }
	    args = [];
	    Array.prototype.push.apply(args, arguments);
	    _ref = args.slice(1);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      obj = _ref[_i];
	      if (obj) {
	        for (key in obj) {
	          if (!__hasProp.call(obj, key)) continue;
	          val = obj[key];
	          out[key] = val;
	        }
	      }
	    }
	    return out;
	  };

	  removeClass = function(el, name) {
	    var className, cls, _i, _len, _ref, _results;
	    if (el.classList != null) {
	      _ref = name.split(' ');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        cls = _ref[_i];
	        if (cls.trim()) {
	          _results.push(el.classList.remove(cls));
	        }
	      }
	      return _results;
	    } else {
	      className = getClassName(el).replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
	      return setClassName(el, className);
	    }
	  };

	  addClass = function(el, name) {
	    var cls, _i, _len, _ref, _results;
	    if (el.classList != null) {
	      _ref = name.split(' ');
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        cls = _ref[_i];
	        if (cls.trim()) {
	          _results.push(el.classList.add(cls));
	        }
	      }
	      return _results;
	    } else {
	      removeClass(el, name);
	      cls = getClassName(el) + (" " + name);
	      return setClassName(el, cls);
	    }
	  };

	  hasClass = function(el, name) {
	    if (el.classList != null) {
	      return el.classList.contains(name);
	    } else {
	      return new RegExp("(^| )" + name + "( |$)", 'gi').test(getClassName(el));
	    }
	  };

	  getClassName = function(el) {
	    if (el.className instanceof SVGAnimatedString) {
	      return el.className.baseVal;
	    } else {
	      return el.className;
	    }
	  };

	  setClassName = function(el, className) {
	    return el.setAttribute('class', className);
	  };

	  updateClasses = function(el, add, all) {
	    var cls, _i, _j, _len, _len1, _results;
	    for (_i = 0, _len = all.length; _i < _len; _i++) {
	      cls = all[_i];
	      if (__indexOf.call(add, cls) < 0) {
	        if (hasClass(el, cls)) {
	          removeClass(el, cls);
	        }
	      }
	    }
	    _results = [];
	    for (_j = 0, _len1 = add.length; _j < _len1; _j++) {
	      cls = add[_j];
	      if (!hasClass(el, cls)) {
	        _results.push(addClass(el, cls));
	      } else {
	        _results.push(void 0);
	      }
	    }
	    return _results;
	  };

	  deferred = [];

	  defer = function(fn) {
	    return deferred.push(fn);
	  };

	  flush = function() {
	    var fn, _results;
	    _results = [];
	    while (fn = deferred.pop()) {
	      _results.push(fn());
	    }
	    return _results;
	  };

	  Evented = (function() {
	    function Evented() {}

	    Evented.prototype.on = function(event, handler, ctx, once) {
	      var _base;
	      if (once == null) {
	        once = false;
	      }
	      if (this.bindings == null) {
	        this.bindings = {};
	      }
	      if ((_base = this.bindings)[event] == null) {
	        _base[event] = [];
	      }
	      return this.bindings[event].push({
	        handler: handler,
	        ctx: ctx,
	        once: once
	      });
	    };

	    Evented.prototype.once = function(event, handler, ctx) {
	      return this.on(event, handler, ctx, true);
	    };

	    Evented.prototype.off = function(event, handler) {
	      var i, _ref, _results;
	      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
	        return;
	      }
	      if (handler == null) {
	        return delete this.bindings[event];
	      } else {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    Evented.prototype.trigger = function() {
	      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
	      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
	          handler.apply(ctx != null ? ctx : this, args);
	          if (once) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };

	    return Evented;

	  })();

	  this.Tether.Utils = {
	    getScrollParent: getScrollParent,
	    getBounds: getBounds,
	    getOffsetParent: getOffsetParent,
	    extend: extend,
	    addClass: addClass,
	    removeClass: removeClass,
	    hasClass: hasClass,
	    updateClasses: updateClasses,
	    defer: defer,
	    flush: flush,
	    uniqueId: uniqueId,
	    Evented: Evented,
	    getScrollBarSize: getScrollBarSize
	  };

	}).call(this);

	(function() {
	  var MIRROR_LR, MIRROR_TB, OFFSET_MAP, Tether, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, defer, extend, flush, getBounds, getOffsetParent, getOuterSize, getScrollBarSize, getScrollParent, getSize, now, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, transformKey, updateClasses, within, _Tether, _ref,
	    __slice = [].slice,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  if (this.Tether == null) {
	    throw new Error("You must include the utils.js file before tether.js");
	  }

	  Tether = this.Tether;

	  _ref = Tether.Utils, getScrollParent = _ref.getScrollParent, getSize = _ref.getSize, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getOffsetParent = _ref.getOffsetParent, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass, updateClasses = _ref.updateClasses, defer = _ref.defer, flush = _ref.flush, getScrollBarSize = _ref.getScrollBarSize;

	  within = function(a, b, diff) {
	    if (diff == null) {
	      diff = 1;
	    }
	    return (a + diff >= b && b >= a - diff);
	  };

	  transformKey = (function() {
	    var el, key, _i, _len, _ref1;
	    el = document.createElement('div');
	    _ref1 = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      key = _ref1[_i];
	      if (el.style[key] !== void 0) {
	        return key;
	      }
	    }
	  })();

	  tethers = [];

	  position = function() {
	    var tether, _i, _len;
	    for (_i = 0, _len = tethers.length; _i < _len; _i++) {
	      tether = tethers[_i];
	      tether.position(false);
	    }
	    return flush();
	  };

	  now = function() {
	    var _ref1;
	    return (_ref1 = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref1 : +(new Date);
	  };

	  (function() {
	    var event, lastCall, lastDuration, pendingTimeout, tick, _i, _len, _ref1, _results;
	    lastCall = null;
	    lastDuration = null;
	    pendingTimeout = null;
	    tick = function() {
	      if ((lastDuration != null) && lastDuration > 16) {
	        lastDuration = Math.min(lastDuration - 16, 250);
	        pendingTimeout = setTimeout(tick, 250);
	        return;
	      }
	      if ((lastCall != null) && (now() - lastCall) < 10) {
	        return;
	      }
	      if (pendingTimeout != null) {
	        clearTimeout(pendingTimeout);
	        pendingTimeout = null;
	      }
	      lastCall = now();
	      position();
	      return lastDuration = now() - lastCall;
	    };
	    _ref1 = ['resize', 'scroll', 'touchmove'];
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      event = _ref1[_i];
	      _results.push(window.addEventListener(event, tick));
	    }
	    return _results;
	  })();

	  MIRROR_LR = {
	    center: 'center',
	    left: 'right',
	    right: 'left'
	  };

	  MIRROR_TB = {
	    middle: 'middle',
	    top: 'bottom',
	    bottom: 'top'
	  };

	  OFFSET_MAP = {
	    top: 0,
	    left: 0,
	    middle: '50%',
	    center: '50%',
	    bottom: '100%',
	    right: '100%'
	  };

	  autoToFixedAttachment = function(attachment, relativeToAttachment) {
	    var left, top;
	    left = attachment.left, top = attachment.top;
	    if (left === 'auto') {
	      left = MIRROR_LR[relativeToAttachment.left];
	    }
	    if (top === 'auto') {
	      top = MIRROR_TB[relativeToAttachment.top];
	    }
	    return {
	      left: left,
	      top: top
	    };
	  };

	  attachmentToOffset = function(attachment) {
	    var _ref1, _ref2;
	    return {
	      left: (_ref1 = OFFSET_MAP[attachment.left]) != null ? _ref1 : attachment.left,
	      top: (_ref2 = OFFSET_MAP[attachment.top]) != null ? _ref2 : attachment.top
	    };
	  };

	  addOffset = function() {
	    var left, offsets, out, top, _i, _len, _ref1;
	    offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
	    out = {
	      top: 0,
	      left: 0
	    };
	    for (_i = 0, _len = offsets.length; _i < _len; _i++) {
	      _ref1 = offsets[_i], top = _ref1.top, left = _ref1.left;
	      if (typeof top === 'string') {
	        top = parseFloat(top, 10);
	      }
	      if (typeof left === 'string') {
	        left = parseFloat(left, 10);
	      }
	      out.top += top;
	      out.left += left;
	    }
	    return out;
	  };

	  offsetToPx = function(offset, size) {
	    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	    }
	    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	    }
	    return offset;
	  };

	  parseAttachment = parseOffset = function(value) {
	    var left, top, _ref1;
	    _ref1 = value.split(' '), top = _ref1[0], left = _ref1[1];
	    return {
	      top: top,
	      left: left
	    };
	  };

	  _Tether = (function() {
	    _Tether.modules = [];

	    function _Tether(options) {
	      this.position = __bind(this.position, this);
	      var module, _i, _len, _ref1, _ref2;
	      tethers.push(this);
	      this.history = [];
	      this.setOptions(options, false);
	      _ref1 = Tether.modules;
	      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	        module = _ref1[_i];
	        if ((_ref2 = module.initialize) != null) {
	          _ref2.call(this);
	        }
	      }
	      this.position();
	    }

	    _Tether.prototype.getClass = function(key) {
	      var _ref1, _ref2;
	      if ((_ref1 = this.options.classes) != null ? _ref1[key] : void 0) {
	        return this.options.classes[key];
	      } else if (((_ref2 = this.options.classes) != null ? _ref2[key] : void 0) !== false) {
	        if (this.options.classPrefix) {
	          return "" + this.options.classPrefix + "-" + key;
	        } else {
	          return key;
	        }
	      } else {
	        return '';
	      }
	    };

	    _Tether.prototype.setOptions = function(options, position) {
	      var defaults, key, _i, _len, _ref1, _ref2;
	      this.options = options;
	      if (position == null) {
	        position = true;
	      }
	      defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };
	      this.options = extend(defaults, this.options);
	      _ref1 = this.options, this.element = _ref1.element, this.target = _ref1.target, this.targetModifier = _ref1.targetModifier;
	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }
	      _ref2 = ['element', 'target'];
	      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	        key = _ref2[_i];
	        if (this[key] == null) {
	          throw new Error("Tether Error: Both element and target must be defined");
	        }
	        if (this[key].jquery != null) {
	          this[key] = this[key][0];
	        } else if (typeof this[key] === 'string') {
	          this[key] = document.querySelector(this[key]);
	        }
	      }
	      addClass(this.element, this.getClass('element'));
	      addClass(this.target, this.getClass('target'));
	      if (!this.options.attachment) {
	        throw new Error("Tether Error: You must provide an attachment");
	      }
	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);
	      if (this.scrollParent != null) {
	        this.disable();
	      }
	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
	      }
	      if (this.options.enabled !== false) {
	        return this.enable(position);
	      }
	    };

	    _Tether.prototype.getTargetBounds = function() {
	      var bounds, fitAdj, hasBottomScroll, height, out, scrollBottom, scrollPercentage, style, target;
	      if (this.targetModifier != null) {
	        switch (this.targetModifier) {
	          case 'visible':
	            if (this.target === document.body) {
	              return {
	                top: pageYOffset,
	                left: pageXOffset,
	                height: innerHeight,
	                width: innerWidth
	              };
	            } else {
	              bounds = getBounds(this.target);
	              out = {
	                height: bounds.height,
	                width: bounds.width,
	                top: bounds.top,
	                left: bounds.left
	              };
	              out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	              out.height = Math.min(out.height, bounds.height - ((bounds.top + bounds.height) - (pageYOffset + innerHeight)));
	              out.height = Math.min(innerHeight, out.height);
	              out.height -= 2;
	              out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	              out.width = Math.min(out.width, bounds.width - ((bounds.left + bounds.width) - (pageXOffset + innerWidth)));
	              out.width = Math.min(innerWidth, out.width);
	              out.width -= 2;
	              if (out.top < pageYOffset) {
	                out.top = pageYOffset;
	              }
	              if (out.left < pageXOffset) {
	                out.left = pageXOffset;
	              }
	              return out;
	            }
	            break;
	          case 'scroll-handle':
	            target = this.target;
	            if (target === document.body) {
	              target = document.documentElement;
	              bounds = {
	                left: pageXOffset,
	                top: pageYOffset,
	                height: innerHeight,
	                width: innerWidth
	              };
	            } else {
	              bounds = getBounds(target);
	            }
	            style = getComputedStyle(target);
	            hasBottomScroll = target.scrollWidth > target.clientWidth || 'scroll' === [style.overflow, style.overflowX] || this.target !== document.body;
	            scrollBottom = 0;
	            if (hasBottomScroll) {
	              scrollBottom = 15;
	            }
	            height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
	            out = {
	              width: 15,
	              height: height * 0.975 * (height / target.scrollHeight),
	              left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	            };
	            fitAdj = 0;
	            if (height < 408 && this.target === document.body) {
	              fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	            }
	            if (this.target !== document.body) {
	              out.height = Math.max(out.height, 24);
	            }
	            scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	            out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
	            if (this.target === document.body) {
	              out.height = Math.max(out.height, 24);
	            }
	            return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    };

	    _Tether.prototype.clearCache = function() {
	      return this._cache = {};
	    };

	    _Tether.prototype.cache = function(k, getter) {
	      if (this._cache == null) {
	        this._cache = {};
	      }
	      if (this._cache[k] == null) {
	        this._cache[k] = getter.call(this);
	      }
	      return this._cache[k];
	    };

	    _Tether.prototype.enable = function(position) {
	      if (position == null) {
	        position = true;
	      }
	      addClass(this.target, this.getClass('enabled'));
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;
	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }
	      if (position) {
	        return this.position();
	      }
	    };

	    _Tether.prototype.disable = function() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;
	      if (this.scrollParent != null) {
	        return this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    };

	    _Tether.prototype.destroy = function() {
	      var i, tether, _i, _len, _results;
	      this.disable();
	      _results = [];
	      for (i = _i = 0, _len = tethers.length; _i < _len; i = ++_i) {
	        tether = tethers[i];
	        if (tether === this) {
	          tethers.splice(i, 1);
	          break;
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    };

	    _Tether.prototype.updateAttachClasses = function(elementAttach, targetAttach) {
	      var add, all, side, sides, _i, _j, _len, _len1, _ref1,
	        _this = this;
	      if (elementAttach == null) {
	        elementAttach = this.attachment;
	      }
	      if (targetAttach == null) {
	        targetAttach = this.targetAttachment;
	      }
	      sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
	      if ((_ref1 = this._addAttachClasses) != null ? _ref1.length : void 0) {
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }
	      add = this._addAttachClasses != null ? this._addAttachClasses : this._addAttachClasses = [];
	      if (elementAttach.top) {
	        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push("" + (this.getClass('element-attached')) + "-" + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push("" + (this.getClass('target-attached')) + "-" + targetAttach.left);
	      }
	      all = [];
	      for (_i = 0, _len = sides.length; _i < _len; _i++) {
	        side = sides[_i];
	        all.push("" + (this.getClass('element-attached')) + "-" + side);
	      }
	      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
	        side = sides[_j];
	        all.push("" + (this.getClass('target-attached')) + "-" + side);
	      }
	      return defer(function() {
	        if (_this._addAttachClasses == null) {
	          return;
	        }
	        updateClasses(_this.element, _this._addAttachClasses, all);
	        updateClasses(_this.target, _this._addAttachClasses, all);
	        return _this._addAttachClasses = void 0;
	      });
	    };

	    _Tether.prototype.position = function(flushChanges) {
	      var elementPos, elementStyle, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetParent, offsetParentSize, offsetParentStyle, offsetPosition, ret, scrollLeft, scrollTop, scrollbarSize, side, targetAttachment, targetOffset, targetPos, targetSize, top, width, _i, _j, _len, _len1, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
	        _this = this;
	      if (flushChanges == null) {
	        flushChanges = true;
	      }
	      if (!this.enabled) {
	        return;
	      }
	      this.clearCache();
	      targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
	      this.updateAttachClasses(this.attachment, targetAttachment);
	      elementPos = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      });
	      width = elementPos.width, height = elementPos.height;
	      if (width === 0 && height === 0 && (this.lastSize != null)) {
	        _ref1 = this.lastSize, width = _ref1.width, height = _ref1.height;
	      } else {
	        this.lastSize = {
	          width: width,
	          height: height
	        };
	      }
	      targetSize = targetPos = this.cache('target-bounds', function() {
	        return _this.getTargetBounds();
	      });
	      offset = offsetToPx(attachmentToOffset(this.attachment), {
	        width: width,
	        height: height
	      });
	      targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
	      manualOffset = offsetToPx(this.offset, {
	        width: width,
	        height: height
	      });
	      manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);
	      left = targetPos.left + targetOffset.left - offset.left;
	      top = targetPos.top + targetOffset.top - offset.top;
	      _ref2 = Tether.modules;
	      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	        module = _ref2[_i];
	        ret = module.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          attachment: this.attachment,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize
	        });
	        if ((ret == null) || typeof ret !== 'object') {
	          continue;
	        } else if (ret === false) {
	          return false;
	        } else {
	          top = ret.top, left = ret.left;
	        }
	      }
	      next = {
	        page: {
	          top: top,
	          left: left
	        },
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }
	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }
	      if (((_ref3 = document.body.style.position) !== '' && _ref3 !== 'static') || ((_ref4 = document.body.parentElement.style.position) !== '' && _ref4 !== 'static')) {
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }
	      if (((_ref5 = this.options.optimizations) != null ? _ref5.moveElement : void 0) !== false && (this.targetModifier == null)) {
	        offsetParent = this.cache('target-offsetparent', function() {
	          return getOffsetParent(_this.target);
	        });
	        offsetPosition = this.cache('target-offsetparent-bounds', function() {
	          return getBounds(offsetParent);
	        });
	        offsetParentStyle = getComputedStyle(offsetParent);
	        elementStyle = getComputedStyle(this.element);
	        offsetParentSize = offsetPosition;
	        offsetBorder = {};
	        _ref6 = ['Top', 'Left', 'Bottom', 'Right'];
	        for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
	          side = _ref6[_j];
	          offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle["border" + side + "Width"]);
	        }
	        offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	        offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
	        if (next.page.top >= (offsetPosition.top + offsetBorder.top) && next.page.bottom >= offsetPosition.bottom) {
	          if (next.page.left >= (offsetPosition.left + offsetBorder.left) && next.page.right >= offsetPosition.right) {
	            scrollTop = offsetParent.scrollTop;
	            scrollLeft = offsetParent.scrollLeft;
	            next.offset = {
	              top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	              left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	            };
	          }
	        }
	      }
	      this.move(next);
	      this.history.unshift(next);
	      if (this.history.length > 3) {
	        this.history.pop();
	      }
	      if (flushChanges) {
	        flush();
	      }
	      return true;
	    };

	    _Tether.prototype.move = function(position) {
	      var css, elVal, found, key, moved, offsetParent, point, same, transcribe, type, val, write, writeCSS, _i, _len, _ref1, _ref2,
	        _this = this;
	      if (this.element.parentNode == null) {
	        return;
	      }
	      same = {};
	      for (type in position) {
	        same[type] = {};
	        for (key in position[type]) {
	          found = false;
	          _ref1 = this.history;
	          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	            point = _ref1[_i];
	            if (!within((_ref2 = point[type]) != null ? _ref2[key] : void 0, position[type][key])) {
	              found = true;
	              break;
	            }
	          }
	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }
	      css = {
	        top: '',
	        left: '',
	        right: '',
	        bottom: ''
	      };
	      transcribe = function(same, pos) {
	        var xPos, yPos, _ref3;
	        if (((_ref3 = _this.options.optimizations) != null ? _ref3.gpu : void 0) !== false) {
	          if (same.top) {
	            css.top = 0;
	            yPos = pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -pos.bottom;
	          }
	          if (same.left) {
	            css.left = 0;
	            xPos = pos.left;
	          } else {
	            css.right = 0;
	            xPos = -pos.right;
	          }
	          css[transformKey] = "translateX(" + (Math.round(xPos)) + "px) translateY(" + (Math.round(yPos)) + "px)";
	          if (transformKey !== 'msTransform') {
	            return css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (same.top) {
	            css.top = "" + pos.top + "px";
	          } else {
	            css.bottom = "" + pos.bottom + "px";
	          }
	          if (same.left) {
	            return css.left = "" + pos.left + "px";
	          } else {
	            return css.right = "" + pos.right + "px";
	          }
	        }
	      };
	      moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, position.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, position.viewport);
	      } else if ((same.offset != null) && same.offset.top && same.offset.left) {
	        css.position = 'absolute';
	        offsetParent = this.cache('target-offsetparent', function() {
	          return getOffsetParent(_this.target);
	        });
	        if (getOffsetParent(this.element) !== offsetParent) {
	          defer(function() {
	            _this.element.parentNode.removeChild(_this.element);
	            return offsetParent.appendChild(_this.element);
	          });
	        }
	        transcribe(same.offset, position.offset);
	        moved = true;
	      } else {
	        css.position = 'absolute';
	        transcribe({
	          top: true,
	          left: true
	        }, position.page);
	      }
	      if (!moved && this.element.parentNode.tagName !== 'BODY') {
	        this.element.parentNode.removeChild(this.element);
	        document.body.appendChild(this.element);
	      }
	      writeCSS = {};
	      write = false;
	      for (key in css) {
	        val = css[key];
	        elVal = this.element.style[key];
	        if (elVal !== '' && val !== '' && (key === 'top' || key === 'left' || key === 'bottom' || key === 'right')) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }
	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = css[key];
	        }
	      }
	      if (write) {
	        return defer(function() {
	          return extend(_this.element.style, writeCSS);
	        });
	      }
	    };

	    return _Tether;

	  })();

	  Tether.position = position;

	  this.Tether = extend(_Tether, Tether);

	}).call(this);

	(function() {
	  var BOUNDS_FORMAT, MIRROR_ATTACH, defer, extend, getBoundingRect, getBounds, getOuterSize, getSize, updateClasses, _ref,
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	  _ref = this.Tether.Utils, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getSize = _ref.getSize, extend = _ref.extend, updateClasses = _ref.updateClasses, defer = _ref.defer;

	  MIRROR_ATTACH = {
	    left: 'right',
	    right: 'left',
	    top: 'bottom',
	    bottom: 'top',
	    middle: 'middle'
	  };

	  BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	  getBoundingRect = function(tether, to) {
	    var i, pos, side, size, style, _i, _len;
	    if (to === 'scrollParent') {
	      to = tether.scrollParent;
	    } else if (to === 'window') {
	      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	    }
	    if (to === document) {
	      to = to.documentElement;
	    }
	    if (to.nodeType != null) {
	      pos = size = getBounds(to);
	      style = getComputedStyle(to);
	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
	      for (i = _i = 0, _len = BOUNDS_FORMAT.length; _i < _len; i = ++_i) {
	        side = BOUNDS_FORMAT[i];
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style["border" + side + "Width"]);
	        } else {
	          to[i] -= parseFloat(style["border" + side + "Width"]);
	        }
	      }
	    }
	    return to;
	  };

	  this.Tether.modules.push({
	    position: function(_arg) {
	      var addClasses, allClasses, attachment, bounds, changeAttachX, changeAttachY, cls, constraint, eAttachment, height, left, oob, oobClass, p, pin, pinned, pinnedClass, removeClass, side, tAttachment, targetAttachment, targetHeight, targetSize, targetWidth, to, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8,
	        _this = this;
	      top = _arg.top, left = _arg.left, targetAttachment = _arg.targetAttachment;
	      if (!this.options.constraints) {
	        return true;
	      }
	      removeClass = function(prefix) {
	        var side, _i, _len, _results;
	        _this.removeClass(prefix);
	        _results = [];
	        for (_i = 0, _len = BOUNDS_FORMAT.length; _i < _len; _i++) {
	          side = BOUNDS_FORMAT[_i];
	          _results.push(_this.removeClass("" + prefix + "-" + side));
	        }
	        return _results;
	      };
	      _ref1 = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      }), height = _ref1.height, width = _ref1.width;
	      if (width === 0 && height === 0 && (this.lastSize != null)) {
	        _ref2 = this.lastSize, width = _ref2.width, height = _ref2.height;
	      }
	      targetSize = this.cache('target-bounds', function() {
	        return _this.getTargetBounds();
	      });
	      targetHeight = targetSize.height;
	      targetWidth = targetSize.width;
	      tAttachment = {};
	      eAttachment = {};
	      allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
	      _ref3 = this.options.constraints;
	      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
	        constraint = _ref3[_i];
	        if (constraint.outOfBoundsClass) {
	          allClasses.push(constraint.outOfBoundsClass);
	        }
	        if (constraint.pinnedClass) {
	          allClasses.push(constraint.pinnedClass);
	        }
	      }
	      for (_j = 0, _len1 = allClasses.length; _j < _len1; _j++) {
	        cls = allClasses[_j];
	        _ref4 = ['left', 'top', 'right', 'bottom'];
	        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
	          side = _ref4[_k];
	          allClasses.push("" + cls + "-" + side);
	        }
	      }
	      addClasses = [];
	      tAttachment = extend({}, targetAttachment);
	      eAttachment = extend({}, this.attachment);
	      _ref5 = this.options.constraints;
	      for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
	        constraint = _ref5[_l];
	        to = constraint.to, attachment = constraint.attachment, pin = constraint.pin;
	        if (attachment == null) {
	          attachment = '';
	        }
	        if (__indexOf.call(attachment, ' ') >= 0) {
	          _ref6 = attachment.split(' '), changeAttachY = _ref6[0], changeAttachX = _ref6[1];
	        } else {
	          changeAttachX = changeAttachY = attachment;
	        }
	        bounds = getBoundingRect(this, to);
	        if (changeAttachY === 'target' || changeAttachY === 'both') {
	          if (top < bounds[1] && tAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';
	          }
	          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';
	          }
	        }
	        if (changeAttachY === 'together') {
	          if (top < bounds[1] && tAttachment.top === 'top') {
	            if (eAttachment.top === 'bottom') {
	              top += targetHeight;
	              tAttachment.top = 'bottom';
	              top += height;
	              eAttachment.top = 'top';
	            } else if (eAttachment.top === 'top') {
	              top += targetHeight;
	              tAttachment.top = 'bottom';
	              top -= height;
	              eAttachment.top = 'bottom';
	            }
	          }
	          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	            if (eAttachment.top === 'top') {
	              top -= targetHeight;
	              tAttachment.top = 'top';
	              top -= height;
	              eAttachment.top = 'bottom';
	            } else if (eAttachment.top === 'bottom') {
	              top -= targetHeight;
	              tAttachment.top = 'top';
	              top += height;
	              eAttachment.top = 'top';
	            }
	          }
	          if (tAttachment.top === 'middle') {
	            if (top + height > bounds[3] && eAttachment.top === 'top') {
	              top -= height;
	              eAttachment.top = 'bottom';
	            } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	              top += height;
	              eAttachment.top = 'top';
	            }
	          }
	        }
	        if (changeAttachX === 'target' || changeAttachX === 'both') {
	          if (left < bounds[0] && tAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	          }
	          if (left + width > bounds[2] && tAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	          }
	        }
	        if (changeAttachX === 'together') {
	          if (left < bounds[0] && tAttachment.left === 'left') {
	            if (eAttachment.left === 'right') {
	              left += targetWidth;
	              tAttachment.left = 'right';
	              left += width;
	              eAttachment.left = 'left';
	            } else if (eAttachment.left === 'left') {
	              left += targetWidth;
	              tAttachment.left = 'right';
	              left -= width;
	              eAttachment.left = 'right';
	            }
	          } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	            if (eAttachment.left === 'left') {
	              left -= targetWidth;
	              tAttachment.left = 'left';
	              left -= width;
	              eAttachment.left = 'right';
	            } else if (eAttachment.left === 'right') {
	              left -= targetWidth;
	              tAttachment.left = 'left';
	              left += width;
	              eAttachment.left = 'left';
	            }
	          } else if (tAttachment.left === 'center') {
	            if (left + width > bounds[2] && eAttachment.left === 'left') {
	              left -= width;
	              eAttachment.left = 'right';
	            } else if (left < bounds[0] && eAttachment.left === 'right') {
	              left += width;
	              eAttachment.left = 'left';
	            }
	          }
	        }
	        if (changeAttachY === 'element' || changeAttachY === 'both') {
	          if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }
	        if (changeAttachX === 'element' || changeAttachX === 'both') {
	          if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          }
	        }
	        if (typeof pin === 'string') {
	          pin = (function() {
	            var _len4, _m, _ref7, _results;
	            _ref7 = pin.split(',');
	            _results = [];
	            for (_m = 0, _len4 = _ref7.length; _m < _len4; _m++) {
	              p = _ref7[_m];
	              _results.push(p.trim());
	            }
	            return _results;
	          })();
	        } else if (pin === true) {
	          pin = ['top', 'left', 'right', 'bottom'];
	        }
	        pin || (pin = []);
	        pinned = [];
	        oob = [];
	        if (top < bounds[1]) {
	          if (__indexOf.call(pin, 'top') >= 0) {
	            top = bounds[1];
	            pinned.push('top');
	          } else {
	            oob.push('top');
	          }
	        }
	        if (top + height > bounds[3]) {
	          if (__indexOf.call(pin, 'bottom') >= 0) {
	            top = bounds[3] - height;
	            pinned.push('bottom');
	          } else {
	            oob.push('bottom');
	          }
	        }
	        if (left < bounds[0]) {
	          if (__indexOf.call(pin, 'left') >= 0) {
	            left = bounds[0];
	            pinned.push('left');
	          } else {
	            oob.push('left');
	          }
	        }
	        if (left + width > bounds[2]) {
	          if (__indexOf.call(pin, 'right') >= 0) {
	            left = bounds[2] - width;
	            pinned.push('right');
	          } else {
	            oob.push('right');
	          }
	        }
	        if (pinned.length) {
	          pinnedClass = (_ref7 = this.options.pinnedClass) != null ? _ref7 : this.getClass('pinned');
	          addClasses.push(pinnedClass);
	          for (_m = 0, _len4 = pinned.length; _m < _len4; _m++) {
	            side = pinned[_m];
	            addClasses.push("" + pinnedClass + "-" + side);
	          }
	        }
	        if (oob.length) {
	          oobClass = (_ref8 = this.options.outOfBoundsClass) != null ? _ref8 : this.getClass('out-of-bounds');
	          addClasses.push(oobClass);
	          for (_n = 0, _len5 = oob.length; _n < _len5; _n++) {
	            side = oob[_n];
	            addClasses.push("" + oobClass + "-" + side);
	          }
	        }
	        if (__indexOf.call(pinned, 'left') >= 0 || __indexOf.call(pinned, 'right') >= 0) {
	          eAttachment.left = tAttachment.left = false;
	        }
	        if (__indexOf.call(pinned, 'top') >= 0 || __indexOf.call(pinned, 'bottom') >= 0) {
	          eAttachment.top = tAttachment.top = false;
	        }
	        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== this.attachment.top || eAttachment.left !== this.attachment.left) {
	          this.updateAttachClasses(eAttachment, tAttachment);
	        }
	      }
	      defer(function() {
	        updateClasses(_this.target, addClasses, allClasses);
	        return updateClasses(_this.element, addClasses, allClasses);
	      });
	      return {
	        top: top,
	        left: left
	      };
	    }
	  });

	}).call(this);

	(function() {
	  var defer, getBounds, updateClasses, _ref;

	  _ref = this.Tether.Utils, getBounds = _ref.getBounds, updateClasses = _ref.updateClasses, defer = _ref.defer;

	  this.Tether.modules.push({
	    position: function(_arg) {
	      var abutted, addClasses, allClasses, bottom, height, left, right, side, sides, targetPos, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref1, _ref2, _ref3, _ref4, _ref5,
	        _this = this;
	      top = _arg.top, left = _arg.left;
	      _ref1 = this.cache('element-bounds', function() {
	        return getBounds(_this.element);
	      }), height = _ref1.height, width = _ref1.width;
	      targetPos = this.getTargetBounds();
	      bottom = top + height;
	      right = left + width;
	      abutted = [];
	      if (top <= targetPos.bottom && bottom >= targetPos.top) {
	        _ref2 = ['left', 'right'];
	        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
	          side = _ref2[_i];
	          if ((_ref3 = targetPos[side]) === left || _ref3 === right) {
	            abutted.push(side);
	          }
	        }
	      }
	      if (left <= targetPos.right && right >= targetPos.left) {
	        _ref4 = ['top', 'bottom'];
	        for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
	          side = _ref4[_j];
	          if ((_ref5 = targetPos[side]) === top || _ref5 === bottom) {
	            abutted.push(side);
	          }
	        }
	      }
	      allClasses = [];
	      addClasses = [];
	      sides = ['left', 'top', 'right', 'bottom'];
	      allClasses.push(this.getClass('abutted'));
	      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
	        side = sides[_k];
	        allClasses.push("" + (this.getClass('abutted')) + "-" + side);
	      }
	      if (abutted.length) {
	        addClasses.push(this.getClass('abutted'));
	      }
	      for (_l = 0, _len3 = abutted.length; _l < _len3; _l++) {
	        side = abutted[_l];
	        addClasses.push("" + (this.getClass('abutted')) + "-" + side);
	      }
	      defer(function() {
	        updateClasses(_this.target, addClasses, allClasses);
	        return updateClasses(_this.element, addClasses, allClasses);
	      });
	      return true;
	    }
	  });

	}).call(this);

	(function() {
	  this.Tether.modules.push({
	    position: function(_arg) {
	      var left, result, shift, shiftLeft, shiftTop, top, _ref;
	      top = _arg.top, left = _arg.left;
	      if (!this.options.shift) {
	        return;
	      }
	      result = function(val) {
	        if (typeof val === 'function') {
	          return val.call(this, {
	            top: top,
	            left: left
	          });
	        } else {
	          return val;
	        }
	      };
	      shift = result(this.options.shift);
	      if (typeof shift === 'string') {
	        shift = shift.split(' ');
	        shift[1] || (shift[1] = shift[0]);
	        shiftTop = shift[0], shiftLeft = shift[1];
	        shiftTop = parseFloat(shiftTop, 10);
	        shiftLeft = parseFloat(shiftLeft, 10);
	      } else {
	        _ref = [shift.top, shift.left], shiftTop = _ref[0], shiftLeft = _ref[1];
	      }
	      top += shiftTop;
	      left += shiftLeft;
	      return {
	        top: top,
	        left: left
	      };
	    }
	  });

	}).call(this);

	return this.Tether;

	}));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(25);

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
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
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

	var ReactTransitionEvents = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	module.exports = ReactTransitionEvents;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */

	var invariant = __webpack_require__(37);

	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function(element, className) {
	    ("production" !== (undefined) ? invariant(
	      !/\s/.test(className),
	      'CSSCore.addClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

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
	  removeClass: function(element, className) {
	    ("production" !== (undefined) ? invariant(
	      !/\s/.test(className),
	      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className
	          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
	          .replace(/\s+/g, ' ') // multiple spaces to one
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
	  conditionClass: function(element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function(element, className) {
	    ("production" !== (undefined) ? invariant(
	      !/\s/.test(className),
	      'CSS.hasClass takes only a single class name.'
	    ) : invariant(!/\s/.test(className)));
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }

	};

	module.exports = CSSCore;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(12);

	var Notification = React.createClass({
	  displayName: "Notification",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      position: "top-right",
	      color: "success",
	      title: null,
	      image: null,
	      content: null
	    };
	  },
	  render: function render() {
	    var classes = "notification " + this.props.position + " " + this.props.color;
	    classes += " " + (this.props.className || "");
	    var imageNode = null;
	    if (this.props.image) {
	      imageNode = React.createElement(
	        "div",
	        { className: "notification-icon" },
	        React.createElement("img", { src: "{{ image }}" })
	      );
	    }
	    return React.createElement(
	      "div",
	      { id: this.props.id, "data-closable": true, className: classes },
	      React.createElement(
	        "a",
	        { href: "#", className: "close-button", onClick: this.props.closeHandler },
	        "×"
	      ),
	      imageNode,
	      React.createElement(
	        "div",
	        { className: "notification-content" },
	        React.createElement(
	          "h1",
	          null,
	          this.props.title
	        ),
	        React.createElement(
	          "p",
	          null,
	          this.props.children
	        )
	      )
	    );
	  }
	});

	module.exports = Notification;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(40);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if ("production" !== (undefined)) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var ReactContext = __webpack_require__(44);
	var ReactCurrentOwner = __webpack_require__(45);

	var assign = __webpack_require__(42);
	var warning = __webpack_require__(32);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true
	};

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {

	    configurable: false,
	    enumerable: true,

	    get: function() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },

	    set: function(value) {
	      ("production" !== (undefined) ? warning(
	        false,
	        'Don\'t set the %s property of the React element. Instead, ' +
	        'specify the correct value when initially creating the element.',
	        key
	      ) : null);
	      this._store[key] = value;
	    }

	  });
	}

	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} element
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	/**
	 * Base constructor for all React elements. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @param {string|object} ref
	 * @param {*} key
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function(type, key, ref, owner, context, props) {
	  // Built-in properties that belong on the element
	  this.type = type;
	  this.key = key;
	  this.ref = ref;

	  // Record the component responsible for creating this element.
	  this._owner = owner;

	  // TODO: Deprecate withContext, and then the context becomes accessible
	  // through the owner.
	  this._context = context;

	  if ("production" !== (undefined)) {
	    // The validation flag and props are currently mutative. We put them on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    this._store = {props: props, originalProps: assign({}, props)};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    try {
	      Object.defineProperty(this._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true
	      });
	    } catch (x) {
	    }
	    this._store.validated = false;

	    // We're not allowed to set props directly on the object so we early
	    // return and rely on the prototype membrane to forward to the backing
	    // store.
	    if (useMutationMembrane) {
	      Object.freeze(this);
	      return;
	    }
	  }

	  this.props = props;
	};

	// We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {
	  _isReactElement: true
	};

	if ("production" !== (undefined)) {
	  defineMutationMembrane(ReactElement.prototype);
	}

	ReactElement.createElement = function(type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;

	  if (config != null) {
	    ref = config.ref === undefined ? null : config.ref;
	    key = config.key === undefined ? null : '' + config.key;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (typeof props[propName] === 'undefined') {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return new ReactElement(
	    type,
	    key,
	    ref,
	    ReactCurrentOwner.current,
	    ReactContext.current,
	    props
	  );
	};

	ReactElement.createFactory = function(type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
	  var newElement = new ReactElement(
	    oldElement.type,
	    oldElement.key,
	    oldElement.ref,
	    oldElement._owner,
	    oldElement._context,
	    newProps
	  );

	  if ("production" !== (undefined)) {
	    // If the key on the original is valid, then the clone is valid
	    newElement._store.validated = oldElement._store.validated;
	  }
	  return newElement;
	};

	ReactElement.cloneElement = function(element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return new ReactElement(
	    element.type,
	    key,
	    ref,
	    owner,
	    element._context,
	    props
	  );
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function(object) {
	  // ReactTestUtils is often used outside of beforeEach where as React is
	  // within it. This leads to two different instances of React on the same
	  // page. To identify a element from a different React instance we use
	  // a flag instead of an instanceof check.
	  var isElement = !!(object && object._isReactElement);
	  // if (isElement && !(object instanceof ReactElement)) {
	  // This is an indicator that you're using multiple versions of React at the
	  // same time. This will screw with ownership and stuff. Fix it, please.
	  // TODO: We could possibly warn here.
	  // }
	  return isElement;
	};

	module.exports = ReactElement;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	'use strict';

	var assign = __webpack_require__(42);
	var emptyFunction = __webpack_require__(40);
	var joinClasses = __webpack_require__(43);

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  }

	};

	module.exports = ReactPropTransferer;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory){
		'use strict';

	    if (true){
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if (typeof exports === 'object'){
	        // CommonJS
	        factory(exports);

	    } else {
	        // Browser globals
	        var PubSub = {};
	        root.PubSub = PubSub;
	        factory(PubSub);
	    }
	}(( typeof window === 'object' && window ) || this, function (PubSub){
		'use strict';

		var messages = {},
			lastUid = -1;

		function hasKeys(obj){
			var key;

			for (key in obj){
				if ( obj.hasOwnProperty(key) ){
					return true;
				}
			}
			return false;
		}

		/**
		 *	Returns a function that throws the passed exception, for use as argument for setTimeout
		 *	@param { Object } ex An Error object
		 */
		function throwException( ex ){
			return function reThrowException(){
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions( subscriber, message, data ){
			try {
				subscriber( message, data );
			} catch( ex ){
				setTimeout( throwException( ex ), 0);
			}
		}

		function callSubscriberWithImmediateExceptions( subscriber, message, data ){
			subscriber( message, data );
		}

		function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
			var subscribers = messages[matchedMessage],
				callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
				s;

			if ( !messages.hasOwnProperty( matchedMessage ) ) {
				return;
			}

			for (s in subscribers){
				if ( subscribers.hasOwnProperty(s)){
					callSubscriber( subscribers[s], originalMessage, data );
				}
			}
		}

		function createDeliveryFunction( message, data, immediateExceptions ){
			return function deliverNamespaced(){
				var topic = String( message ),
					position = topic.lastIndexOf( '.' );

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while( position !== -1 ){
					topic = topic.substr( 0, position );
					position = topic.lastIndexOf('.');
					deliverMessage( message, topic, data, immediateExceptions );
				}
			};
		}

		function messageHasSubscribers( message ){
			var topic = String( message ),
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
				position = topic.lastIndexOf( '.' );

			while ( !found && position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf( '.' );
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish( message, data, sync, immediateExceptions ){
			var deliver = createDeliveryFunction( message, data, immediateExceptions ),
				hasSubscribers = messageHasSubscribers( message );

			if ( !hasSubscribers ){
				return false;
			}

			if ( sync === true ){
				deliver();
			} else {
				setTimeout( deliver, 0 );
			}
			return true;
		}

		/**
		 *	PubSub.publish( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message, passing the data to it's subscribers
		**/
		PubSub.publish = function( message, data ){
			return publish( message, data, false, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.publishSync( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message synchronously, passing the data to it's subscribers
		**/
		PubSub.publishSync = function( message, data ){
			return publish( message, data, true, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.subscribe( message, func ) -> String
		 *	- message (String): The message to subscribe to
		 *	- func (Function): The function to call when a new message is published
		 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
		 *	you need to unsubscribe
		**/
		PubSub.subscribe = function( message, func ){
			if ( typeof func !== 'function'){
				return false;
			}

			// message is not registered yet
			if ( !messages.hasOwnProperty( message ) ){
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
		 */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
		*/
		PubSub.clearSubscriptions = function clearSubscriptions(topic){
			var m; 
			for (m in messages){
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
		 * When passed a token, removes a specific subscription.
		 * When passed a function, removes all subscriptions for that function
		 * When passed a topic, removes all subscriptions for that topic (hierarchy)
		 *
		 * value - A token, function or topic to unsubscribe.
		 *
		 * Examples
		 *
		 *		// Example 1 - unsubscribing with a token
		 *		var token = PubSub.subscribe('mytopic', myFunc);
		 *		PubSub.unsubscribe(token);
		 *
		 *		// Example 2 - unsubscribing with a function
		 *		PubSub.unsubscribe(myFunc);
		 *
		 *		// Example 3 - unsubscribing a topic
		 *		PubSub.unsubscribe('mytopic');
		 */
		PubSub.unsubscribe = function(value){
			var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
				isToken    = !isTopic && typeof value === 'string',
				isFunction = typeof value === 'function',
				result = false,
				m, message, t;

			if (isTopic){
				delete messages[value];
				return;
			}

			for ( m in messages ){
				if ( messages.hasOwnProperty( m ) ){
					message = messages[m];

					if ( isToken && message[value] ){
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for ( t in message ){
							if (message.hasOwnProperty(t) && message[t] === value){
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	}));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if ("production" !== (undefined)) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);

	module.exports = canUseDOM;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var camel2hyphen = __webpack_require__(47);

	var isDimension = function (feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};

	var obj2mq = function (obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length-1) {
	      mq += ' and '
	    }
	  });
	  return mq;
	};

	var json2mq = function (query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length-1) {
	        mq += ', '
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};

	module.exports = json2mq;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };

	module.exports = emptyFunction;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
	 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */

	;(function (name, context, factory) {
		var matchMedia = window.matchMedia;

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = factory(matchMedia);
		}
		else if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return (context[name] = factory(matchMedia));
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
		else {
			context[name] = factory(matchMedia);
		}
	}('enquire', this, function (matchMedia) {

		'use strict';

	    /*jshint unused:false */
	    /**
	     * Helper function for iterating over a collection
	     *
	     * @param collection
	     * @param fn
	     */
	    function each(collection, fn) {
	        var i      = 0,
	            length = collection.length,
	            cont;

	        for(i; i < length; i++) {
	            cont = fn(collection[i], i);
	            if(cont === false) {
	                break; //allow early exit
	            }
	        }
	    }

	    /**
	     * Helper function for determining whether target object is an array
	     *
	     * @param target the object under test
	     * @return {Boolean} true if array, false otherwise
	     */
	    function isArray(target) {
	        return Object.prototype.toString.apply(target) === '[object Array]';
	    }

	    /**
	     * Helper function for determining whether target object is a function
	     *
	     * @param target the object under test
	     * @return {Boolean} true if function, false otherwise
	     */
	    function isFunction(target) {
	        return typeof target === 'function';
	    }

	    /**
	     * Delegate to handle a media query being matched and unmatched.
	     *
	     * @param {object} options
	     * @param {function} options.match callback for when the media query is matched
	     * @param {function} [options.unmatch] callback for when the media query is unmatched
	     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
	     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
	     * @constructor
	     */
	    function QueryHandler(options) {
	        this.options = options;
	        !options.deferSetup && this.setup();
	    }
	    QueryHandler.prototype = {

	        /**
	         * coordinates setup of the handler
	         *
	         * @function
	         */
	        setup : function() {
	            if(this.options.setup) {
	                this.options.setup();
	            }
	            this.initialised = true;
	        },

	        /**
	         * coordinates setup and triggering of the handler
	         *
	         * @function
	         */
	        on : function() {
	            !this.initialised && this.setup();
	            this.options.match && this.options.match();
	        },

	        /**
	         * coordinates the unmatch event for the handler
	         *
	         * @function
	         */
	        off : function() {
	            this.options.unmatch && this.options.unmatch();
	        },

	        /**
	         * called when a handler is to be destroyed.
	         * delegates to the destroy or unmatch callbacks, depending on availability.
	         *
	         * @function
	         */
	        destroy : function() {
	            this.options.destroy ? this.options.destroy() : this.off();
	        },

	        /**
	         * determines equality by reference.
	         * if object is supplied compare options, if function, compare match callback
	         *
	         * @function
	         * @param {object || function} [target] the target for comparison
	         */
	        equals : function(target) {
	            return this.options === target || this.options.match === target;
	        }

	    };
	    /**
	     * Represents a single media query, manages it's state and registered handlers for this query
	     *
	     * @constructor
	     * @param {string} query the media query string
	     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
	     */
	    function MediaQuery(query, isUnconditional) {
	        this.query = query;
	        this.isUnconditional = isUnconditional;
	        this.handlers = [];
	        this.mql = matchMedia(query);

	        var self = this;
	        this.listener = function(mql) {
	            self.mql = mql;
	            self.assess();
	        };
	        this.mql.addListener(this.listener);
	    }
	    MediaQuery.prototype = {

	        /**
	         * add a handler for this query, triggering if already active
	         *
	         * @param {object} handler
	         * @param {function} handler.match callback for when query is activated
	         * @param {function} [handler.unmatch] callback for when query is deactivated
	         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
	         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
	         */
	        addHandler : function(handler) {
	            var qh = new QueryHandler(handler);
	            this.handlers.push(qh);

	            this.matches() && qh.on();
	        },

	        /**
	         * removes the given handler from the collection, and calls it's destroy methods
	         * 
	         * @param {object || function} handler the handler to remove
	         */
	        removeHandler : function(handler) {
	            var handlers = this.handlers;
	            each(handlers, function(h, i) {
	                if(h.equals(handler)) {
	                    h.destroy();
	                    return !handlers.splice(i,1); //remove from array and exit each early
	                }
	            });
	        },

	        /**
	         * Determine whether the media query should be considered a match
	         * 
	         * @return {Boolean} true if media query can be considered a match, false otherwise
	         */
	        matches : function() {
	            return this.mql.matches || this.isUnconditional;
	        },

	        /**
	         * Clears all handlers and unbinds events
	         */
	        clear : function() {
	            each(this.handlers, function(handler) {
	                handler.destroy();
	            });
	            this.mql.removeListener(this.listener);
	            this.handlers.length = 0; //clear array
	        },

	        /*
	         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
	         */
	        assess : function() {
	            var action = this.matches() ? 'on' : 'off';

	            each(this.handlers, function(handler) {
	                handler[action]();
	            });
	        }
	    };
	    /**
	     * Allows for registration of query handlers.
	     * Manages the query handler's state and is responsible for wiring up browser events
	     *
	     * @constructor
	     */
	    function MediaQueryDispatch () {
	        if(!matchMedia) {
	            throw new Error('matchMedia not present, legacy browsers require a polyfill');
	        }

	        this.queries = {};
	        this.browserIsIncapable = !matchMedia('only all').matches;
	    }

	    MediaQueryDispatch.prototype = {

	        /**
	         * Registers a handler for the given media query
	         *
	         * @param {string} q the media query
	         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
	         * @param {function} options.match fired when query matched
	         * @param {function} [options.unmatch] fired when a query is no longer matched
	         * @param {function} [options.setup] fired when handler first triggered
	         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
	         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
	         */
	        register : function(q, options, shouldDegrade) {
	            var queries         = this.queries,
	                isUnconditional = shouldDegrade && this.browserIsIncapable;

	            if(!queries[q]) {
	                queries[q] = new MediaQuery(q, isUnconditional);
	            }

	            //normalise to object in an array
	            if(isFunction(options)) {
	                options = { match : options };
	            }
	            if(!isArray(options)) {
	                options = [options];
	            }
	            each(options, function(handler) {
	                queries[q].addHandler(handler);
	            });

	            return this;
	        },

	        /**
	         * unregisters a query and all it's handlers, or a specific handler for a query
	         *
	         * @param {string} q the media query to target
	         * @param {object || function} [handler] specific handler to unregister
	         */
	        unregister : function(q, handler) {
	            var query = this.queries[q];

	            if(query) {
	                if(handler) {
	                    query.removeHandler(handler);
	                }
	                else {
	                    query.clear();
	                    delete this.queries[q];
	                }
	            }

	            return this;
	        }
	    };

		return new MediaQueryDispatch();

	}));

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

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

	module.exports = assign;


/***/ },
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	'use strict';

	var assign = __webpack_require__(42);
	var emptyObject = __webpack_require__(46);
	var warning = __webpack_require__(32);

	var didWarn = false;

	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {

	  /**
	   * @internal
	   * @type {object}
	   */
	  current: emptyObject,

	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function(newContext, scopedCallback) {
	    if ("production" !== (undefined)) {
	      ("production" !== (undefined) ? warning(
	        didWarn,
	        'withContext is deprecated and will be removed in a future version. ' +
	        'Use a wrapper component with getChildContext instead.'
	      ) : null);

	      didWarn = true;
	    }

	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = assign({}, previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }

	};

	module.exports = ReactContext;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyObject
	 */

	"use strict";

	var emptyObject = {};

	if ("production" !== (undefined)) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var camel2hyphen = function (str) {
	  return str
	          .replace(/[A-Z]/g, function (match) {
	            return '-' + match.toLowerCase();
	          })
	          .toLowerCase();
	};

	module.exports = camel2hyphen;

/***/ }
/******/ ])
});
;