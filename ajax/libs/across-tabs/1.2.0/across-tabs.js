/*!
 * 
 * across-tabs "1.2.0"
 * https://github.com/wingify/across-tabs.js
 * MIT licensed
 * 
 * Copyright (C) 2017-2018 Wingify - A project by Varun Malhotra(https://github.com/softvar)
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AcrossTabs", [], factory);
	else if(typeof exports === 'object')
		exports["AcrossTabs"] = factory();
	else
		root["AcrossTabs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Enum for different event names used for tab-communication
 * @type {Object}
 */
var PostMessageEventNamesEnum = {
  LOADED: '__TAB__LOADED_EVENT__',
  CUSTOM: '__TAB__CUSTOM_EVENT__',
  HANDSHAKE: '__TAB__HANDSHAKE_EVENT__',
  ON_BEFORE_UNLOAD: '__TAB__ON_BEFORE_UNLOAD__',
  PARENT_DISCONNECTED: '__PARENT_DISCONNECTED__',
  HANDSHAKE_WITH_PARENT: '__HANDSHAKE_WITH_PARENT__',
  PARENT_COMMUNICATED: '__PARENT_COMMUNICATED__'
};

exports.default = PostMessageEventNamesEnum;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Enum for showing various warnings to suser when things done wrong
 * @type {Object}
 */
var WarningTextEnum = {
  INVALID_JSON: 'Invalid JSON Object!',
  INVALID_DATA: 'Some wrong message is being sent by Parent.',
  CONFIG_REQUIRED: 'Configuration options required. Please read docs.',
  CUSTOM_EVENT: 'CustomEvent(and it\'s polyfill) is not supported in this browser.',
  URL_REQUIRED: 'Url is needed for creating and opening a new window/tab. Please read docs.'
};

exports.default = WarningTextEnum;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PostMessageEventNamesEnum = __webpack_require__(0);

var _PostMessageEventNamesEnum2 = _interopRequireDefault(_PostMessageEventNamesEnum);

var _array = __webpack_require__(3);

var _array2 = _interopRequireDefault(_array);

var _TabStatusEnum = __webpack_require__(4);

var _TabStatusEnum2 = _interopRequireDefault(_TabStatusEnum);

var _WarningTextEnum = __webpack_require__(1);

var _WarningTextEnum2 = _interopRequireDefault(_WarningTextEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Tab utility file to deal with tab operations
 */

var tabUtils = {
  tabs: [],
  config: {}
};

/**
 * Remove a tab from a list of all tabs.
 * This is required when users opts for removing the closed tabs from the list of tabs.
 * This can be done explictly by passing `removeClosedTabs` key while instantiating Parent.
 * @param  {Object} tab
 */
tabUtils._remove = function (tab) {
  var index = void 0;

  index = _array2.default.searchByKeyName(tabUtils.tabs, 'id', tab.id, 'index');
  tabUtils.tabs.splice(index, 1);
};

/**
 * As explained in `event-listeners/postmessage.js` file,
 * the data received from postmessage API is further processed based on our convention
 * @param  {String} msg
 * @return {String} modified msg
 */
tabUtils._preProcessMessage = function (msg) {
  // make msg always an object to support JSON support
  try {
    msg = JSON.stringify(msg);
  } catch (e) {
    throw new Error(_WarningTextEnum2.default.INVALID_JSON);
  }

  if (msg.indexOf(_PostMessageEventNamesEnum2.default.PARENT_COMMUNICATED) === -1) {
    msg = _PostMessageEventNamesEnum2.default.PARENT_COMMUNICATED + msg;
  }

  return msg;
};
/**
 * Add a new tab to the Array of tabs
 * @param  {Object} tab
 * @return {Object} - this
 */
tabUtils.addNew = function (tab) {
  tabUtils.tabs.push(tab);
  return undefined;
};
/**
 * Filter out all the opened tabs
 * @return {Array} - only the opened tabs
 */
tabUtils.getOpened = function () {
  return tabUtils.tabs.filter(function (tab) {
    return tab.status === _TabStatusEnum2.default.OPEN;
  });
};
/**
 * Filter out all the closed tabs
 * @return {Array} - only the closed tabs
 */
tabUtils.getClosed = function () {
  return tabUtils.tabs.filter(function (tab) {
    return tab.status === _TabStatusEnum2.default.CLOSE;
  });
};
/**
 * To get list of all tabs(closed/opened).
 * Note: Closed tabs will not be returned if `removeClosedTabs` key is paased while instantiaiting Parent.
 * @return {Array} - list of all tabs
 */
tabUtils.getAll = function () {
  return tabUtils.tabs;
};

/**
 * Close a specific tab
 * @param  {String} id
 * @return {Object} this
 */
tabUtils.closeTab = function (id) {
  var tab = _array2.default.searchByKeyName(tabUtils.tabs, 'id', id);

  if (tab && tab.ref) {
    tab.ref.close();
    tab.status = _TabStatusEnum2.default.CLOSE;
  }

  return tabUtils;
  // --tabUtils.tabs.length;
};
/**
 * Close all opened tabs using a native method `close` available on window.open reference.
 * @return {tabUtils} this
 */
tabUtils.closeAll = function () {
  var i = void 0;

  for (i = 0; i < tabUtils.tabs.length; i++) {
    if (tabUtils.tabs[i] && tabUtils.tabs[i].ref) {
      tabUtils.tabs[i].ref.close();
      tabUtils.tabs[i].status = _TabStatusEnum2.default.CLOSE;
    }
  }

  return tabUtils;
};
/**
 * Send a postmessage to every opened Child tab(excluding itself i.e Parent Tab)
 * @param  {String} msg
 * @param  {Boolean} isSiteInsideFrame
 */
tabUtils.broadCastAll = function (msg, isSiteInsideFrame) {
  var i = void 0,
      tabs = tabUtils.getOpened();

  msg = tabUtils._preProcessMessage(msg);

  for (i = 0; i < tabs.length; i++) {
    tabUtils.sendMessage(tabs[i], msg, isSiteInsideFrame);
  }

  return tabUtils;
};
/**
 * Send a postmessage to a specific Child tab
 * @param  {String} id
 * @param  {String} msg
 * @param  {Boolean} isSiteInsideFrame
 */
tabUtils.broadCastTo = function (id, msg, isSiteInsideFrame) {
  var targetedTab = void 0,
      tabs = tabUtils.getAll();

  msg = tabUtils._preProcessMessage(msg);

  targetedTab = _array2.default.searchByKeyName(tabs, 'id', id); // TODO: tab.id
  tabUtils.sendMessage(targetedTab, msg, isSiteInsideFrame);

  return tabUtils;
};

/**
 * Send a postMessage to the desired window/frame
 * @param  {Object}  target
 * @param  {String}  msg
 * @param  {Boolean} isSiteInsideFrame
 */
tabUtils.sendMessage = function (target, msg, isSiteInsideFrame) {
  var origin = tabUtils.config.origin || '*';

  if (isSiteInsideFrame && target.ref[0]) {
    target.ref[0].postMessage(msg, origin);
  } else if (target.ref && target.ref.top) {
    target.ref.top.postMessage(msg, origin);
  }
};

exports.default = tabUtils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var arrayUtils = {};

/**
 * Different type of data needed after searching an item(Object) within data(Array of Objects).
 * 1. `INDEX` returns just the index at which the item was present
 * 2. `OBJECT` returns the matched object
 * 3. `BOTH` returns an object { obj: matched_object, index: index_found }
 */
var returnPreferenceEnum = {
  INDEX: 'index',
  OBJECT: 'object',
  BOTH: 'both'
};

/**
 * Search for an item(Object) within a data-set(Array Of Objects)
 * @param  {Array of Objects} data
 * @param  {String} key - Unique key to search on the basis of
 * @param  {String} value - The matching criteria
 * @param  {String} returnPreference - what kind of output is needed
 * @return {Object}
 */
arrayUtils.searchByKeyName = function (data, key, value, returnPreference) {
  if (!data || !key) {
    return false;
  }

  returnPreference = returnPreference || returnPreferenceEnum[1]; // default to Object
  var i = void 0,
      obj = void 0,
      returnData = void 0,
      index = -1;

  for (i = 0; i < data.length; i++) {
    obj = data[i];
    // Number matching support
    if (!isNaN(value) && parseInt(obj[key], 10) === parseInt(value, 10)) {
      index = i;
      break;
    } else if (isNaN(value) && obj[key] === value) {
      // String exact matching support
      index = i;
      break;
    }
  }

  if (index === -1) {
    // item not found
    data[index] = {}; // for consistency
  }

  switch (returnPreference) {
    case returnPreferenceEnum.INDEX:
      returnData = index;
      break;
    case returnPreferenceEnum.BOTH:
      returnData = {
        obj: data[index],
        index: index
      };
      break;
    case returnPreferenceEnum.OBJECT:
    default:
      returnData = data[index];
      break;
  }

  return returnData;
};

exports.default = arrayUtils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Enum for Tab status(still opened / closed) used for tab-communication
 * @type {Object}
 */
var TabStatusEnum = {
  OPEN: 'open',
  CLOSE: 'close'
};

exports.default = TabStatusEnum;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This utility helps enabling/disabling the Link/Button on the Parent Tab.
 * As soon as, user clicks on link/btn to open a new tab, the link/btn gets disabled.
 * Once child communicates for the first time with the Parent, the link/btn is re-enabled to open up new tab.
 * This feature is toggleable and can be used explicitly putting a data attribute on the link/btn.
 *
 * <a href="/demo.html" data-tab-opener="parent" target="_blank" on-click="parent.openNewTab(config)">Open Tab</a>
 */
var domUtils = {
  disable: function disable(selector) {
    if (!selector) {
      return false;
    }

    var i = void 0,
        ATOpenerElems = document.querySelectorAll('[' + selector + ']');

    for (i = 0; i < ATOpenerElems.length; i++) {
      ATOpenerElems[i].setAttribute('disabled', 'disabled');
    }
  },
  enable: function enable(selector) {
    if (!selector) {
      return false;
    }

    var i = void 0,
        ATOpenerElems = document.querySelectorAll('[' + selector + ']');

    for (i = 0; i < ATOpenerElems.length; i++) {
      ATOpenerElems[i].removeAttribute('disabled');
    }
  }
};

exports.default = domUtils;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parent = __webpack_require__(7);

var _parent2 = _interopRequireDefault(_parent);

var _child = __webpack_require__(12);

var _child2 = _interopRequireDefault(_child);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Expose Parent and Child modules on AcrossTabs Object
 * @type {Object}
 */
var AcrossTabs = {
  Parent: _parent2.default,
  Child: _child2.default
};

exports.default = AcrossTabs;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tab = __webpack_require__(8);

var _tab2 = _interopRequireDefault(_tab);

var _tab3 = __webpack_require__(2);

var _tab4 = _interopRequireDefault(_tab3);

var _dom = __webpack_require__(5);

var _dom2 = _interopRequireDefault(_dom);

var _TabStatusEnum = __webpack_require__(4);

var _TabStatusEnum2 = _interopRequireDefault(_TabStatusEnum);

var _WarningTextEnum = __webpack_require__(1);

var _WarningTextEnum2 = _interopRequireDefault(_WarningTextEnum);

var _PostMessageEventNamesEnum = __webpack_require__(0);

var _PostMessageEventNamesEnum2 = _interopRequireDefault(_PostMessageEventNamesEnum);

var _postmessage = __webpack_require__(10);

var _postmessage2 = _interopRequireDefault(_postmessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var heartBeat = void 0,
    tab = void 0;

// Named Class expression

var Parent = function () {
  /**
   * Involed when object is instantiated
   * Set flags/variables and calls init method to attach event listeners
   * @param  {Object} config - Refer API/docs for config keys
   */
  function Parent(config) {
    _classCallCheck(this, Parent);

    config = config || {};
    if (typeof config.heartBeatInterval === 'undefined') {
      config.heartBeatInterval = 500;
    }
    if (typeof config.shouldInitImmediately === 'undefined') {
      config.shouldInitImmediately = true;
    }

    // reset tabs with every new Object
    _tab4.default.tabs = [];

    this.Tab = _tab2.default;
    _extends(this, config);

    _tab4.default.config = config;

    if (this.shouldInitImmediately) {
      this.init();
    }
  }

  _createClass(Parent, [{
    key: 'addInterval',
    value: function addInterval() {
      var i = void 0,
          tabs = _tab4.default.getAll(),
          openedTabs = _tab4.default.getOpened();

      // don't poll if all tabs are in CLOSED states
      if (!openedTabs || !openedTabs.length) {
        window.clearInterval(heartBeat); // stop the interval
        heartBeat = null;
        return false;
      }

      for (i = 0; i < tabs.length; i++) {
        if (this.removeClosedTabs) {
          this.watchStatus(tabs[i]);
        }
        /**
         * The check is required since tab would be removed when closed(in case of `removeClosedTabs` flag),
         * irrespective of heatbeat controller
        */
        if (tabs[i] && tabs[i].ref) {
          tabs[i].status = tabs[i].ref.closed ? _TabStatusEnum2.default.CLOSE : _TabStatusEnum2.default.OPEN;
        }
      }

      // Call the user-defined callback after every polling operation is operted in a single run
      if (this.onPollingCallback) {
        this.onPollingCallback();
      }
    }
  }, {
    key: 'startPollingTabs',


    /**
     * Poll all tabs for their status - OPENED / CLOSED
     * An interval is created which checks for last and current status.
     * There's a property on window i.e. `closed` which returns true for the closed window.
     * And one can see `true` only in another tab when the tab was opened by the same `another` tab.
     */
    value: function startPollingTabs() {
      var _this = this;

      heartBeat = window.setInterval(function () {
        return _this.addInterval();
      }, this.heartBeatInterval);
    }
  }, {
    key: 'watchStatus',


    /**
     * Compare tab status - OPEN vs CLOSE
     * @param  {Object} tab
     */
    value: function watchStatus(tab) {
      if (!tab || !tab.ref) {
        return false;
      }
      var newStatus = tab.ref.closed ? _TabStatusEnum2.default.CLOSE : _TabStatusEnum2.default.OPEN,
          oldStatus = tab.status;

      // If last and current status(inside a polling interval) are same, don't do anything
      if (!newStatus || newStatus === oldStatus) {
        return false;
      }

      // OPEN to CLOSE state
      if (oldStatus === _TabStatusEnum2.default.OPEN && newStatus === _TabStatusEnum2.default.CLOSE) {
        // remove tab from tabUtils
        _tab4.default._remove(tab);
      }
      // Change from CLOSE to OPEN state is never gonna happen ;)
    }
  }, {
    key: 'onChildUnload',


    /**
     * Called when a child is refreshed/closed
     * @param  {Object} ev - Event
     */
    value: function onChildUnload(ev) {
      if (this.onChildDisconnect) {
        this.onChildDisconnect(ev.detail);
      }
    }

    /**
     * Enable link/btn, which got disabled on clicking.
     * Note: works only when `data-tab-opener="child"` is used on the respective element
     * @param  {Object} ev - Event
     */

  }, {
    key: 'customEventUnListener',
    value: function customEventUnListener(ev) {
      this.enableElements();

      if (ev.detail && ev.detail.type === _PostMessageEventNamesEnum2.default.HANDSHAKE && this.onHandshakeCallback) {
        this.onHandshakeCallback(ev.detail.tabInfo);
      } else if (ev.detail && ev.detail.type === _PostMessageEventNamesEnum2.default.CUSTOM && this.onChildCommunication) {
        this.onChildCommunication(ev.detail.tabInfo);
      }
    }
  }, {
    key: 'addEventListeners',


    /**
     * Attach postmessage, native and custom listeners to the window
     */
    value: function addEventListeners() {
      var _this2 = this;

      window.removeEventListener('message', _postmessage2.default.onNewTab);
      window.addEventListener('message', _postmessage2.default.onNewTab);

      window.removeEventListener('onCustomChildMessage', this.customEventUnListener);
      window.addEventListener('onCustomChildMessage', function (ev) {
        return _this2.customEventUnListener(ev);
      });

      window.removeEventListener('onChildUnload', this.onChildUnload);
      window.addEventListener('onChildUnload', function (ev) {
        return _this2.onChildUnload(ev);
      });

      // Let children tabs know when Parent is closed / refereshed.
      window.onbeforeunload = function () {
        _tab4.default.broadCastAll(_PostMessageEventNamesEnum2.default.PARENT_DISCONNECTED);
      };
    }
  }, {
    key: 'enableElements',


    /**
     * API methods exposed for Public
     *
     * Re-enable the link/btn which got disabled on clicking
     */
    value: function enableElements() {
      _dom2.default.enable('data-tab-opener');
    }
  }, {
    key: 'getAllTabs',


    /**
     * Return list of all tabs
     * @return {Array}
     */
    value: function getAllTabs() {
      return _tab4.default.getAll();
    }
  }, {
    key: 'getOpenedTabs',


    /**
     * Return list of all OPENED tabs
     * @return {Array}
     */
    value: function getOpenedTabs() {
      return _tab4.default.getOpened();
    }
  }, {
    key: 'getClosedTabs',


    /**
     * Return list of all CLOSED tabs
     * @return {Array}
     */
    value: function getClosedTabs() {
      return _tab4.default.getClosed();
    }

    /**
     * Close all tabs at once
     * @return {Object}
     */

  }, {
    key: 'closeAllTabs',
    value: function closeAllTabs() {
      return _tab4.default.closeAll();
    }
  }, {
    key: 'closeTab',


    /**
     * Close a specific tab
     * @return {Object}
     */
    value: function closeTab(id) {
      return _tab4.default.closeTab(id);
    }
  }, {
    key: 'broadCastAll',


    /**
     * Send a postmessage to all OPENED tabs
     * @return {Object}
     */
    value: function broadCastAll(msg) {
      return _tab4.default.broadCastAll(msg);
    }

    /**
     * Send a postmessage to a specific tab
     * @return {Object}
     */

  }, {
    key: 'broadCastTo',
    value: function broadCastTo(id, msg) {
      return _tab4.default.broadCastTo(id, msg);
    }

    /**
     * Open a new tab. Config has to be passed with some required keys
     * @return {Object} tab
     */

  }, {
    key: 'openNewTab',
    value: function openNewTab(config) {
      if (!config) {
        throw new Error(_WarningTextEnum2.default.CONFIG_REQUIRED);
      }

      var url = config.url;

      if (!url) {
        throw new Error(_WarningTextEnum2.default.URL_REQUIRED);
      }

      tab = new this.Tab();
      tab.create(config);

      // If polling is already there, don't set it again
      if (!heartBeat) {
        this.startPollingTabs();
      }

      return tab;
    }
  }, {
    key: 'init',


    /**
     * API methods exposed for Public ends here
     **/

    /**
     * Invoked on object instantiation unless user pass a key to call it explicitly
     */
    value: function init() {
      this.addEventListeners();
    }
  }]);

  return Parent;
}();

;

exports.default = Parent;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tab = __webpack_require__(2);

var _tab2 = _interopRequireDefault(_tab);

var _uuid = __webpack_require__(9);

var _uuid2 = _interopRequireDefault(_uuid);

var _dom = __webpack_require__(5);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Named Class expression
var Tab = function () {
  /**
   * Invoked when the object is instantiated
   */
  function Tab() {
    _classCallCheck(this, Tab);

    // Set name of Parent tab if not already defined
    window.name = window.name || 'PARENT_TAB';
  }

  _createClass(Tab, [{
    key: 'create',

    /**
     * Open a new tab
     * @param  {Object} config - Refer API for config keys
     * @return {Object} this
     */
    value: function create(config) {
      config = config || {};
      _extends(this, config);
      this.id = _uuid2.default.generate() || _tab2.default.tabs.length + 1;
      this.status = 'open';
      // Refere https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features for WindowFeatures
      this.ref = window.open(this.url, '_blank', config.windowFeatures);

      _dom2.default.disable('data-tab-opener');

      window.newlyTabOpened = {
        id: this.id,
        name: this.name || this.windowName,
        ref: this.ref
      };

      // Push it to the list of tabs
      _tab2.default.addNew(this);

      // Return reference for chaining purpose
      return this;
    }
  }]);

  return Tab;
}();

;

exports.default = Tab;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * UUID.js: The RFC-compliant UUID generator for JavaScript.
 * ES6 port of only `generate` method of UUID by Varun Malhotra under MIT License
 *
 * @author  LiosK
 * @version v3.3.0
 * @license The MIT License: Copyright (c) 2010-2016 LiosK.
 */

/** @constructor */
var UUID = void 0;

UUID = function () {
  'use strict';

  /** @lends UUID */

  function UUID() {}

  /**
   * The simplest function to get an UUID string.
   * @returns {string} A version 4 UUID string.
   */
  UUID.generate = function () {
    var rand = UUID._getRandomInt,
        hex = UUID._hexAligner;

    // ["timeLow", "timeMid", "timeHiAndVersion", "clockSeqHiAndReserved", "clockSeqLow", "node"]
    return hex(rand(32), 8) + // time_low
    '-' + hex(rand(16), 4) + // time_mid
    '-' + hex(0x4000 | rand(12), 4) + // time_hi_and_version
    '-' + hex(0x8000 | rand(14), 4) + // clock_seq_hi_and_reserved clock_seq_low
    '-' + hex(rand(48), 12); // node
  };

  /**
   * Returns an unsigned x-bit random integer.
   * @param {int} x A positive integer ranging from 0 to 53, inclusive.
   * @returns {int} An unsigned x-bit random integer (0 <= f(x) < 2^x).
   */
  UUID._getRandomInt = function (x) {
    if (x < 0) {
      return NaN;
    }
    if (x <= 30) {
      return 0 | Math.random() * (1 << x);
    }
    if (x <= 53) {
      return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << x - 30)) * (1 << 30);
    }

    return NaN;
  };

  /**
   * Returns a function that converts an integer to a zero-filled string.
   * @param {int} radix
   * @returns {function(num&#44; length)}
   */
  UUID._getIntAligner = function (radix) {
    return function (num, length) {
      var str = num.toString(radix),
          i = length - str.length,
          z = '0';

      for (; i > 0; i >>>= 1, z += z) {
        if (i & 1) {
          str = z + str;
        }
      }
      return str;
    };
  };

  UUID._hexAligner = UUID._getIntAligner(16);

  /**
   * Returns UUID string representation.
   * @returns {string} {@link UUID#hexString}.
   */
  UUID.prototype.toString = function () {
    return this.hexString;
  };

  return UUID;
}(UUID);

exports.default = UUID;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _array = __webpack_require__(3);

var _array2 = _interopRequireDefault(_array);

var _tab = __webpack_require__(2);

var _tab2 = _interopRequireDefault(_tab);

var _WarningTextEnum = __webpack_require__(1);

var _WarningTextEnum2 = _interopRequireDefault(_WarningTextEnum);

var _PostMessageEventNamesEnum = __webpack_require__(0);

var _PostMessageEventNamesEnum2 = _interopRequireDefault(_PostMessageEventNamesEnum);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostMessageListener = {};

/*
 * Custom PostMessage Convetions Followed - Sending and Receieving data gracefully
 * -------------------------------------------------------------------------------
 *
 * 1. First convetion
      Since data can be sent or receieved via postmessge API in the form of strings,
      the library stores data as stringified JSON object and while reading it, parses the JSON stringified earlier.
      This is easy to maintain and deal with data.

 * 2. Second Convetions
      With every data, there's an associated message identifier.
      A message identifier helps in knowing the intention of what event actually is for.
      For eg: To send data after proper establishment from Child tab,
      Parent tab acknowledges the connection by returning the true identity of the Child tab.
      This is done via prepending the Event name i.e. HANDSHAKE_WTIH_PARENT

      So the postmessage's message would like: `HANDSHAKE_WTIH_PARENT{"id": 123, "name": "Hello World!"}`.
      So, while reading the message, it has to be first checked up with the defined event names
      and then after successful match, the message is split using the Event-name as a delimiter.
      The first entry if the event name and the second one is the actual data.
 *
 */

/**
 * OnLoad Event - it serves as an communication establishment source from Child tab
 */
PostMessageListener._onLoad = function (data) {
  var tabs = void 0,
      dataToSend = void 0,
      tabInfo = data.split(_PostMessageEventNamesEnum2.default.LOADED)[1];

  // Child was opened but parent got refereshed, opened a tab i.e.
  // last opened tab will get refreshed(browser behavior). WOW! Handle this now.
  if (tabInfo) {
    try {
      tabInfo = JSON.parse(tabInfo);
      // If Child knows its UUID, means Parent was refreshed and Child did not
      if (tabInfo.id) {
        tabs = _tab2.default.getAll();
        if (tabs.length) {
          window.newlyTabOpened = tabs[tabs.length - 1];
          window.newlyTabOpened.id = tabInfo.id;
          window.newlyTabOpened.name = tabInfo.name || tabInfo.windowName;
        }
      }
    } catch (e) {
      throw new Error(_WarningTextEnum2.default.INVALID_JSON);
    }
  }

  if (window.newlyTabOpened) {
    try {
      dataToSend = _PostMessageEventNamesEnum2.default.HANDSHAKE_WITH_PARENT;
      dataToSend += JSON.stringify({
        id: window.newlyTabOpened.id,
        name: window.newlyTabOpened.name,
        parentName: window.name
      });
      _tab2.default.sendMessage(window.newlyTabOpened, dataToSend, tabInfo.isSiteInsideFrame);
    } catch (e) {
      throw new Error(_WarningTextEnum2.default.INVALID_JSON);
    }
  }
};

/**
 * onCustomMessage Event - Any sort of custom message by child is treated here
 * @param  {Object} data
 *
 * The method fires an event to notify Parent regarding Child's behavior
 */
PostMessageListener._onCustomMessage = function (data, type) {
  var event = void 0,
      eventData = void 0,
      tabInfo = data.split(type)[1];

  try {
    tabInfo = JSON.parse(tabInfo);
  } catch (e) {
    throw new Error(_WarningTextEnum2.default.INVALID_JSON);
  }

  eventData = {
    tabInfo: tabInfo,
    type: type
  };

  event = new CustomEvent('onCustomChildMessage', { 'detail': eventData });

  window.dispatchEvent(event);
  window.newlyTabOpened = null;
};

/**
 * onBeforeUnload Event - Tells parent that either Child tab was closed or refreshed.
 * Child uses native `ON_BEFORE_UNLOAD` method to notify Parent.
 *
 * It sets the newlyTabOpened variable accordingly
 *
 * @param  {Object} data
 */
PostMessageListener._onBeforeUnload = function (data) {
  var tabs = void 0,
      tabInfo = data.split(_PostMessageEventNamesEnum2.default.ON_BEFORE_UNLOAD)[1];

  try {
    tabInfo = JSON.parse(tabInfo);
  } catch (e) {
    throw new Error(_WarningTextEnum2.default.INVALID_JSON);
  }

  if (_tab2.default.tabs.length) {
    tabs = _tab2.default.getAll();
    window.newlyTabOpened = _array2.default.searchByKeyName(tabs, 'id', tabInfo.id) || window.newlyTabOpened;
  }

  // CustomEvent is not supported in IE, but polyfill will take care of it
  var event = new CustomEvent('onChildUnload', { 'detail': tabInfo });

  window.dispatchEvent(event);
};

/**
 * onNewTab - It's the entry point for data processing after receiving any postmessage form any Child Tab
 * @param  {Object} message
 */
PostMessageListener.onNewTab = function (message) {
  var data = message.data;

  /**
   * Safe check - This happens when CHild Tab gets closed just after sending a message.
   * No need to go further from this point.
   * Tab status is automatically fetched using our polling mechanism written in `Parent.js` file.
   */
  if (!data || typeof data !== 'string' || !_tab2.default.tabs.length) {
    return false;
  }

  // `origin` check for secureity point of view
  if (_tab2.default.config.origin && _tab2.default.config.origin !== message.origin) {
    return false;
  }

  if (data.indexOf(_PostMessageEventNamesEnum2.default.LOADED) > -1) {
    PostMessageListener._onLoad(data);
  } else if (data.indexOf(_PostMessageEventNamesEnum2.default.CUSTOM) > -1) {
    PostMessageListener._onCustomMessage(data, _PostMessageEventNamesEnum2.default.CUSTOM);
  } else if (data.indexOf(_PostMessageEventNamesEnum2.default.HANDSHAKE) > -1) {
    PostMessageListener._onCustomMessage(data, _PostMessageEventNamesEnum2.default.HANDSHAKE);
  } else if (data.indexOf(_PostMessageEventNamesEnum2.default.ON_BEFORE_UNLOAD) > -1) {
    PostMessageListener._onBeforeUnload(data);
  }
};

exports.default = PostMessageListener;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// Polyfill of CustomEvent for IE >= 9
exports.default = function () {
  function CE(event) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var evt = document.createEvent('CustomEvent');

    evt.initCustomEvent(event, false, false, params.detail);
    return evt;
  }

  if (typeof window.CustomEvent !== 'function') {
    CE.prototype = window.Event.prototype;
    window.CustomEvent = CE;
  }
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PostMessageEventNamesEnum = __webpack_require__(0);

var _PostMessageEventNamesEnum2 = _interopRequireDefault(_PostMessageEventNamesEnum);

var _WarningTextEnum = __webpack_require__(1);

var _WarningTextEnum2 = _interopRequireDefault(_WarningTextEnum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Named Class expression
var Child = function () {
  /**
   * Involed when object is instantiated
   * Set flags/variables and calls init method to attach event listeners
   * @param  {Object} config - Refer API/docs for config keys
   */
  function Child(config) {
    _classCallCheck(this, Child);

    this.sessionStorageKey = '__vwo_new_tab_info__';

    if (!config) {
      config = {};
    }
    if (typeof config.handshakeExpiryLimit === 'undefined') {
      config.handshakeExpiryLimit = 5000;
    }
    if (typeof config.shouldInitImmediately === 'undefined') {
      config.shouldInitImmediately = true;
    }

    this.tabName = window.name;
    this.tabId = null;
    this.tabParentName = null;

    _extends(this, config);
    this.config = config;

    if (this.shouldInitImmediately) {
      this.init();
    }
  }

  _createClass(Child, [{
    key: '_isSessionStorage',


    /**
     * Check is sessionStorage is present on window
     * @return {Boolean} [description]
     */
    value: function _isSessionStorage() {
      if ('sessionStorage' in window && window.sessionStorage) {
        return true;
      }
      return false;
    }
  }, {
    key: '_getData',


    /**
     * Get stored data from sessionStorage
     * @return {Object} data
     */
    value: function _getData() {
      if (!this.isSessionStorageSupported) {
        return false;
      }

      return window.sessionStorage.getItem(this.sessionStorageKey);
    }
  }, {
    key: '_setData',


    /**
     * Set stored data from sessionStorage
     * @return {Object} data
     */
    value: function _setData(dataReceived) {
      if (!this.isSessionStorageSupported) {
        return false;
      }

      window.sessionStorage.setItem(this.sessionStorageKey, dataReceived);
      return dataReceived;
    }
  }, {
    key: '_restoreData',


    /**
     * Get stored data from sessionStorage and parse it
     * @return {Object} data
     */
    value: function _restoreData() {
      if (!this.isSessionStorageSupported) {
        return false;
      }

      if (this.isSessionStorageSupported) {
        var storedData = this._getData();

        this._parseData(storedData);
      }
    }
  }, {
    key: '_parseData',


    /**
     * Parse data fetched from sessionStorage
     * @param  {String} dataReceived
     */
    value: function _parseData(dataReceived) {
      var actualData = void 0;

      // Expecting JSON data
      try {
        actualData = JSON.parse(dataReceived);
        this.tabId = actualData && actualData.id;
        this.tabName = actualData && actualData.name;
        this.tabParentName = actualData && actualData.parentName;
      } catch (e) {
        throw new Error(_WarningTextEnum2.default.INVALID_DATA);
      };
    }
  }, {
    key: 'onCommunication',


    /**
     * The core of this file
     * This method receives the postmessage from Parent
     * after establishing a proper communication channel between Parent tab and Child tab.
     * It removes the handshake timeout.
     * Based on the type of postmessage event, it sets/parses or calls user defined callbacks
     *
     * @param  {String} message
     */
    value: function onCommunication(message) {
      var _this = this;

      var dataReceived = void 0,
          data = message.data;

      if (!data || typeof data !== 'string') {
        return;
      }

      // `origin` check for secureity point of view
      if (this.config.origin && this.config.origin !== message.origin) {
        return;
      }

      // cancel timeout
      window.clearTimeout(this.timeout);

      // When Parent tab gets closed or refereshed
      if (data.indexOf(_PostMessageEventNamesEnum2.default.PARENT_DISCONNECTED) > -1) {
        // Call user-defined `onParentDisconnect` callback when Parent tab gets closed or refereshed.
        if (this.config.onParentDisconnect) {
          this.config.onParentDisconnect();
        }

        // remove postMessage listener since no Parent is there to communicate with
        window.removeEventListener('message', function (evt) {
          return _this.onCommunication(evt);
        });
      }

      /**
       * When Parent sends an Acknowledgement to the Child's request of setting up a communication channel
       * along with the tab's identity i.e. id, name and it's parent(itself) to the child tab.
      */
      if (data.indexOf(_PostMessageEventNamesEnum2.default.HANDSHAKE_WITH_PARENT) > -1) {
        var msg = void 0;

        dataReceived = data.split(_PostMessageEventNamesEnum2.default.HANDSHAKE_WITH_PARENT)[1];

        // Set data to sessionStorage so that when page reloads it can directly read the past info till the session lives
        this._setData(dataReceived);
        this._parseData(dataReceived);

        msg = {
          id: this.tabId,
          isSiteInsideFrame: this.config.isSiteInsideFrame
        };
        this.sendMessageToParent(msg, _PostMessageEventNamesEnum2.default.HANDSHAKE);

        if (this.config.onInitialize) {
          this.config.onInitialize();
        }
      }

      // Whenever Parent tab communicates once the communication channel is established
      if (data.indexOf(_PostMessageEventNamesEnum2.default.PARENT_COMMUNICATED) > -1) {
        dataReceived = data.split(_PostMessageEventNamesEnum2.default.PARENT_COMMUNICATED)[1];

        try {
          dataReceived = JSON.parse(dataReceived);
        } catch (e) {
          throw new Error(_WarningTextEnum2.default.INVALID_JSON);
        }
        // Call user-defined `onParentCommunication` callback when Parent sends a message to Parent tab
        if (this.config.onParentCommunication) {
          this.config.onParentCommunication(dataReceived);
        }
      }
    }
  }, {
    key: 'addListeners',


    /**
     * Attach postmessage and onbeforeunload event listeners
     */
    value: function addListeners() {
      var _this2 = this;

      window.onbeforeunload = function (evt) {
        var msg = {
          id: _this2.tabId,
          isSiteInsideFrame: _this2.config.isSiteInsideFrame
        };

        _this2.sendMessageToParent(msg, _PostMessageEventNamesEnum2.default.ON_BEFORE_UNLOAD);
      };

      window.removeEventListener('message', function (evt) {
        return _this2.onCommunication(evt);
      });
      window.addEventListener('message', function (evt) {
        return _this2.onCommunication(evt);
      });
    }
  }, {
    key: 'setHandshakeExpiry',


    /**
     * Call a user-defined method `onHandShakeExpiry`
     * if the Parent doesn't recieve a first handshake message within the configurable `handshakeExpiryLimit`
     * @return {Function}
     */
    value: function setHandshakeExpiry() {
      var _this3 = this;

      return window.setTimeout(function () {
        if (_this3.config.onHandShakeExpiry) {
          _this3.config.onHandShakeExpiry();
        }
      }, this.handshakeExpiryLimit);
    }

    /**
     * API starts here ->
     *
     * Send a postmessage to the corresponding Parent tab
     * @param  {String} msg
    =   */

  }, {
    key: 'sendMessageToParent',
    value: function sendMessageToParent(msg, _prefixType) {
      var origin = void 0;

      var type = _prefixType || _PostMessageEventNamesEnum2.default.CUSTOM;

      msg = type + JSON.stringify(msg);

      if (window.top.opener) {
        origin = this.config.origin || '*';
        window.top.opener.postMessage(msg, origin);
      }
    }
  }, {
    key: 'getTabInfo',


    /**
     * Get current Tab info i.e. id, name and parentName
     * @return {Object} tab-info
     */
    value: function getTabInfo() {
      return {
        id: this.tabId,
        name: this.tabName,
        parentName: this.tabParentName,
        isSiteInsideFrame: this.config.isSiteInsideFrame
      };
    }
  }, {
    key: 'init',

    /**
     * API ends here ->
     */

    /**
     * Invoked on object instantiation unless user pass a key to call it explicitly
     */
    value: function init() {
      this.isSessionStorageSupported = this._isSessionStorage();
      this.addListeners();
      this._restoreData();
      this.sendMessageToParent(this.getTabInfo(), _PostMessageEventNamesEnum2.default.LOADED);
      this.timeout = this.setHandshakeExpiry();

      if (this.config.onReady) {
        this.config.onReady();
      }
    }
  }]);

  return Child;
}();

;

exports.default = Child;

/***/ })
/******/ ]);
});
//# sourceMappingURL=across-tabs.js.map