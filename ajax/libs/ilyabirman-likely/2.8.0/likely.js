/*!
 * Likely 2.8.0 by Nikolay Rys (linkedin.com/in/nikolay-rys), Ilya Birman (ilyabirman.net), and contributors.
 * Special thanks to Viktor Karpov (twitter.com/vitkarpov), Ivan Akulov (iamakulov.com), Evgeny Steblinsky (volter9.github.io), and Artem Sapegin (sapegin.me).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["likely"] = factory();
	else
		root["likely"] = factory();
})(typeof self !== 'undefined' ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./source/button.js":
/*!**************************!*\
  !*** ./source/button.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./source/dom.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./source/utils.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./source/config.js");
/* harmony import */ var _connectButtonToService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./connectButtonToService */ "./source/connectButtonToService.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./source/services/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var htmlSpan = '<span class="{className}">{content}</span>';

/**
 * Separate social link widget
 * @param {Node} widget
 * @param {Likely} likely
 * @param {Object} options
 */
var LikelyButton = /*#__PURE__*/function () {
  function LikelyButton(widget, likely, options) {
    _classCallCheck(this, LikelyButton);
    this.widget = widget;
    this.likely = likely;
    this.options = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mergeToNew)(options);
    this.detectService();
    if (this.isConnected()) {
      this.detectParams();
    }
  }

  /**
   * Whether the button was successfully connected to a service
   * @returns {Boolean}
   */
  _createClass(LikelyButton, [{
    key: "isConnected",
    value: function isConnected() {
      return this.options.service !== undefined;
    }

    /**
     * If purpose of the buttond
     * @returns {Boolean}
     */
  }, {
    key: "isUnrecognized",
    value: function isUnrecognized() {
      return !this.isConnected() && !this.options.foreign;
    }

    /**
     * Make button ready for usage
     */
  }, {
    key: "prepare",
    value: function prepare() {
      if (this.isConnected()) {
        this.initHtml();
        this.registerAsCounted();
      }
    }

    /**
     * Update the counter
     * @param {Object} options
     */
  }, {
    key: "update",
    value: function update(options) {
      var className = ".".concat(_config__WEBPACK_IMPORTED_MODULE_2__["default"].prefix, "counter");
      var counters = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.findAll)(className, this.widget);
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.extendWith)(this.options, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.mergeToNew)({
        forceUpdate: false
      }, options));
      counters.forEach(function (node) {
        node.parentNode.removeChild(node);
      });
      this.registerAsCounted();
    }

    /**
     * Attach a service based on given button classes
     */
  }, {
    key: "detectService",
    value: function detectService() {
      var classes = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.toArray)(this.widget.classList);
      // Array.prototype.filter()[0] instead of Array.prototype.find() for IE support
      var serviceName = classes.filter(function (className) {
        return Object.prototype.hasOwnProperty.call(_services__WEBPACK_IMPORTED_MODULE_4__["default"], className);
      })[0];
      if (serviceName) {
        this.options.service = _services__WEBPACK_IMPORTED_MODULE_4__["default"][serviceName];
      } else if (classes.includes('likely__widget')) {
        this.options.foreign = true;
      }
    }

    /**
     * Merge params from data-* attributes into options hash map
     */
  }, {
    key: "detectParams",
    value: function detectParams() {
      var options = this.options;
      this.data = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getDataset)(this.widget);
      if (this.data.counter) {
        options.staticCounter = this.data.counter;
      }
      options.url = this.data.url === undefined ? options.url : this.data.url;
      options.title = this.data.title === undefined ? options.title : this.data.title;
    }

    /**
     * Initiate button's HTML
     */
  }, {
    key: "initHtml",
    value: function initHtml() {
      var options = this.options;
      var widget = this.widget;
      var text = widget.innerHTML;
      widget.addEventListener('click', this.click.bind(this));
      widget.classList.remove(this.options.service.name);
      widget.className += "".concat(this.className('widget'));
      var button = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.interpolateStr)(htmlSpan, {
        className: this.className('button'),
        content: text
      });
      var icon = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.interpolateStr)(htmlSpan, {
        className: this.className('icon'),
        content: (0,_dom__WEBPACK_IMPORTED_MODULE_0__.wrapSVG)(options.service.svgIconPath)
      });
      widget.innerHTML = icon + button;
    }

    /**
     * Perform fetching and displaying counter
     */
  }, {
    key: "registerAsCounted",
    value: function registerAsCounted() {
      var options = this.options;
      if (options.counters && options.service.counterUrl) {
        if (options.staticCounter) {
          this.setDisplayedCounter(options.staticCounter);
        } else {
          (0,_connectButtonToService__WEBPACK_IMPORTED_MODULE_3__["default"])(this.setDisplayedCounter.bind(this), options);
        }
      }
    }

    /**
     * Combine a BEM-compliant classname
     * @param {String} className
     * @returns {String}
     */
  }, {
    key: "className",
    value: function className(_className) {
      var fullClass = _config__WEBPACK_IMPORTED_MODULE_2__["default"].prefix + _className;
      return "".concat(fullClass, " ").concat(fullClass, "_").concat(this.options.service.name);
    }

    /**
     * Set visible button counter to a value
     * @param {String} counterString
     */
  }, {
    key: "setDisplayedCounter",
    value: function setDisplayedCounter(counterString) {
      var counterInt = parseInt(counterString, 10) || 0;
      var counterElement = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.find)(".".concat(_config__WEBPACK_IMPORTED_MODULE_2__["default"].name, "__counter"), this.widget);
      if (counterElement) {
        counterElement.parentNode.removeChild(counterElement);
      }
      var options = {
        className: this.className('counter'),
        content: counterInt
      };
      if (!counterInt && !this.options.zeroes) {
        options.className += " ".concat(_config__WEBPACK_IMPORTED_MODULE_2__["default"].prefix, "counter_empty");
        options.content = '';
      }
      this.widget.appendChild((0,_dom__WEBPACK_IMPORTED_MODULE_0__.createNode)((0,_utils__WEBPACK_IMPORTED_MODULE_1__.interpolateStr)(htmlSpan, options)));
      this.likely.finalize();
    }

    /**
     * Click event listener
     * @returns {Boolean}
     */
  }, {
    key: "click",
    value: function click() {
      var options = this.options;
      if (options.service.clickCallback.call(this)) {
        var urlWithBaseParams = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.interpolateUrl)(options.service.popupUrl, {
          url: options.url,
          title: options.title,
          content: options.content
        });
        var completeUrl = this.addAdditionalParamsToUrl(urlWithBaseParams);
        if (options.service.openPopup === false) {
          (0,_dom__WEBPACK_IMPORTED_MODULE_0__.createTempLink)(completeUrl);
          return false;
        }
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.openPopup)(completeUrl, _config__WEBPACK_IMPORTED_MODULE_2__["default"].prefix + this.options.service.name, options.service.popupWidth, options.service.popupHeight);
      }
      return false;
    }

    /**
     * Append service data to URL
     * @param {String} url
     * @returns {String}
     */
  }, {
    key: "addAdditionalParamsToUrl",
    value: function addAdditionalParamsToUrl(url) {
      var _this = this;
      var paramsArray = [];
      this.options.service.knownParams.forEach(function (item) {
        if (item in _this.data) {
          paramsArray.push("".concat(encodeURIComponent(item), "=").concat(encodeURIComponent(_this.data[item])));
        }
      });
      var parameters = paramsArray.join('&');
      var delimiter = url.indexOf('?') === -1 ? '?' : '&';
      return parameters === '' ? url : url + delimiter + parameters;
    }
  }]);
  return LikelyButton;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LikelyButton);

/***/ }),

/***/ "./source/config.js":
/*!**************************!*\
  !*** ./source/config.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Configuration
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'likely',
  prefix: 'likely__'
});

/***/ }),

/***/ "./source/connectButtonToService.js":
/*!******************************************!*\
  !*** ./source/connectButtonToService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./source/utils.js");


/**
 * Class for preventing duplicated requests from the similar buttons, which encapsulates:
 *  1. Callbacks for all buttons that share the same value.
 *  2. Prepared service counter URL.
 *  3. Value, returned from this URL
 * @param {String} counterUrl
 * @param {String} pageUrl
 */
function UpdateBroadcaster(counterUrl, pageUrl) {
  this.url = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.interpolateUrl)(counterUrl, {
    url: pageUrl
  });
  this.setters = [];
  this.value = undefined;
}

/**
 * Connects new related button with its callback.
 * @param {Function} buttonSetter
 */
UpdateBroadcaster.prototype.register = function (buttonSetter) {
  this.setters.push(buttonSetter);
  if (this.value) {
    buttonSetter(this.value);
  }
};

/**
 * Distributes obtained value to all buttons that share it
 * @param {Integer} value
 */
UpdateBroadcaster.prototype.trigger = function (value) {
  this.value = value;
  this.setters.forEach(function (buttonSetter) {
    buttonSetter(value);
  });
};

/**
 * Find or create an appropriate instance of UpdateBroadcaster
 * @param {Function} buttonSetter
 * @param {Object} options
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (buttonSetter, options) {
  var broadcaster = options.service.broadcastersByUrl[options.url];
  if (!broadcaster) {
    broadcaster = new UpdateBroadcaster(options.service.counterUrl, options.url);
    options.service.broadcastersByUrl[options.url] = broadcaster;
    options.service.fetch(broadcaster);
  }
  broadcaster.register(buttonSetter);
});

/***/ }),

/***/ "./source/dom.js":
/*!***********************!*\
  !*** ./source/dom.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNode": () => (/* binding */ createNode),
/* harmony export */   "createTempLink": () => (/* binding */ createTempLink),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findAll": () => (/* binding */ findAll),
/* harmony export */   "global": () => (/* binding */ global),
/* harmony export */   "loadJSONP": () => (/* binding */ loadJSONP),
/* harmony export */   "openPopup": () => (/* binding */ openPopup),
/* harmony export */   "wrapSVG": () => (/* binding */ wrapSVG)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./source/utils.js");

var fakeWindow = {};
var global = _utils__WEBPACK_IMPORTED_MODULE_0__.isBrowserEnv ? window : fakeWindow;
var div = _utils__WEBPACK_IMPORTED_MODULE_0__.isBrowserEnv ? document.createElement('div') : {};

/**
 * Wrap SVG coords from data object into SVG tag
 * @param {String} coords
 * @returns {String}
 */
var wrapSVG = function wrapSVG(coords) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" ' + 'viewBox="0 0 16 16"><path d="M' + coords + 'z"/></svg>';
};

/**
 * Create node from HTML
 * @param {String} html
 * @returns {Node}
 */
var createNode = function createNode(html) {
  div.innerHTML = html;
  return div.children[0];
};

/**
 * Load JSONP script. It gets executed after the main one is finished.
 * @param {String} url
 */
var loadJSONP = function loadJSONP(url) {
  var script = document.createElement('script');
  var head = document.head;
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
  head.removeChild(script);
};

/**
 * Find first node by selector
 * @param {String} selector
 * @param {Node} [node]
 * @returns {Node}
 */
var find = function find(selector, node) {
  return (node || document).querySelector(selector);
};

/**
 * Find all nodes by selector
 * @param {String} selector
 * @param {Node} [node]
 * @returns {Node[]}
 */
var findAll = function findAll(selector, node) {
  return Array.prototype.slice.call((node || document).querySelectorAll(selector));
};
/**
 * Open the popup
 * @param {String} url
 * @param {String} winId
 * @param {Number} width,
 * @param {Number} height
 * @returns {Object|null}
 */
var openPopup = function openPopup(url, winId, width, height) {
  var left = Math.round(screen.width / 2 - width / 2);
  var top = 0;
  if (screen.height > height) {
    top = Math.round(screen.height / 3 - height / 2);
  }
  var options = 'left=' + left + ',top=' + top + ',width=' + width + ',height=' + height + ',personalbar=0,toolbar=0,scrollbars=1,resizable=1';
  var win = window.open(url, winId, options);
  if (!win) {
    location.href = url;
    return null;
  }
  win.focus();
  return win;
};
/**
 * Creates a temporary anchor element, click on it and destroys it.
 * Used for buttons that do not have sharing popups
 * @param {String} url
 */
var createTempLink = function createTempLink(url) {
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.style = 'display: none';
  document.body.appendChild(anchor);
  setTimeout(function () {
    anchor.click();
    document.body.removeChild(anchor);
  });
};

/***/ }),

/***/ "./source/history.js":
/*!***************************!*\
  !*** ./source/history.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var callbacks = [];
var handleUrlChange = function handleUrlChange() {
  callbacks.forEach(function (callback) {
    callback();
  });
};
var setupHistoryWatcher = function setupHistoryWatcher() {
  var pushState = window.history.pushState;
  window.history.pushState = function () {
    // browser should change the url first
    setTimeout(handleUrlChange, 0);
    return pushState.apply(window.history, arguments);
  };
  var replaceState = window.history.replaceState;
  window.history.replaceState = function () {
    // browser should change the url first
    setTimeout(handleUrlChange, 0);
    return replaceState.apply(window.history, arguments);
  };
  window.addEventListener('popstate', handleUrlChange);
};
var isWatchingHistory = false;

/**
 * Monitoring tool for catching url changes for re-initiating widged with a new url
 * @param {Function} callback
 */
var history = {
  onUrlChange: function onUrlChange(callback) {
    if (!isWatchingHistory) {
      setupHistoryWatcher();
      isWatchingHistory = true;
    }
    callbacks.push(callback);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (history);

/***/ }),

/***/ "./source/likely-commonjs.js":
/*!***********************************!*\
  !*** ./source/likely-commonjs.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// This module is an entry point for CommonJS modules.
// It’s written with CommonJS imports and exports to make possible doing `module.exports = likely`.
// This is required so that users work with `require('likely')`, not `require('likely').default`
var _require = __webpack_require__(/*! ./utils */ "./source/utils.js"),
  getBools = _require.getBools,
  getDefaultUrl = _require.getDefaultUrl,
  mergeToNew = _require.mergeToNew;
var Likely = (__webpack_require__(/*! ./widget */ "./source/widget.js")["default"]);
var config = (__webpack_require__(/*! ./config */ "./source/config.js")["default"]);
var _require2 = __webpack_require__(/*! ./dom */ "./source/dom.js"),
  findAll = _require2.findAll;
var history = (__webpack_require__(/*! ./history */ "./source/history.js")["default"]);
var services = (__webpack_require__(/*! ./services */ "./source/services/index.js")["default"]);

/**
 * @param {Node} node
 * @param {Object} options
 * @private
 * @returns {Likely}
 */
var initWidget = function initWidget(node, options) {
  var fullOptions = options || {};
  var defaults = {
    counters: true,
    timeout: 1e3,
    zeroes: false,
    title: document.title,
    url: getDefaultUrl()
  };
  var realOptions = mergeToNew(defaults, fullOptions, getBools(node));
  var widget = node[config.name];
  if (widget) {
    widget.update(realOptions);
  } else {
    // Attaching widget to the node object for future re-initializations
    node[config.name] = new Likely(node, realOptions);
  }
  return widget;
};
var likely = {
  /**
   * Initiate Likely buttons on load
   * @param {Node|Array<Node>|Object} [nodes] a particular node or an array of widgets,
   *                                     if not specified,
   *                                     tries to init all the widgets
   * @param {Object} [options] additional options for each widget
   */
  initiate: function initiate(nodes, options) {
    var realNodes;
    var realOptions;
    if (Array.isArray(nodes)) {
      // An array of nodes was passed
      realNodes = nodes;
      realOptions = options;
    } else if (nodes instanceof Node) {
      // A single node was passed
      realNodes = [nodes];
      realOptions = options;
    } else {
      // Options were passed, or the function was called without arguments
      realNodes = findAll(".".concat(config.name));
      realOptions = nodes;
    }
    this.maintainStoredData(realOptions);
    initWidgets();
    history.onUrlChange(initWidgets);
    function initWidgets() {
      realNodes.forEach(function (node) {
        initWidget(node, realOptions);
      });
    }
  },
  /**
   * Reset stored broadcasters if forceUpdate is requested
   * @param {Object} realOptions
   */
  maintainStoredData: function maintainStoredData(realOptions) {
    if (realOptions && realOptions.forceUpdate) {
      // Object.values() is not supported by IE
      Object.keys(services).forEach(function (serviceName) {
        services[serviceName].resetBroadcasters();
      });
    }
  }
};
module.exports = likely;

/***/ }),

/***/ "./source/likely.js":
/*!**************************!*\
  !*** ./source/likely.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// This module is an entry point when `likely.js` is just dropped into the browser.
// It’s written with CommonJS imports and exports to make possible doing `module.exports = likely`.
// This is required so that users work with `window.likely`, not `window.likely.default`

__webpack_require__(/*! ./index.styl */ "./source/index.styl");
var likely = __webpack_require__(/*! ./likely-commonjs.js */ "./source/likely-commonjs.js");
window.addEventListener('load', function () {
  likely.initiate();
});
module.exports = likely;

/***/ }),

/***/ "./source/service.js":
/*!***************************!*\
  !*** ./source/service.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./source/dom.js");

function fetchXHR(updateBroadcaster) {
  var _this = this;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var convertedNumber = typeof _this.convertNumber === 'function' ? _this.convertNumber(xhr.responseText) : xhr.responseText;
      updateBroadcaster.trigger(convertedNumber);
    }
  };
  xhr.open('GET', updateBroadcaster.url, true);
  xhr.send();
}
function resetBroadcasters() {
  this.broadcastersByUrl = {};
}

/**
 * Set default values on service option object
 * @param {Object} options
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (options) {
  // __likelyFetchMock is used for UI testing and is set on window
  // because this function is executed right when Likely is loaded.
  // There’s currently no way to do `likely.__likelyFetchMock = ...`
  // before running this method.
  options.fetch = _dom__WEBPACK_IMPORTED_MODULE_0__.global.__likelyFetchMock || options.fetch || fetchXHR;
  options.clickCallback = options.clickCallback || function () {
    return true;
  };
  options.knownParams = options.knownParams || [];
  options.resetBroadcasters = resetBroadcasters;
  options.resetBroadcasters();
});

/***/ }),

/***/ "./source/services/facebook.js":
/*!*************************************!*\
  !*** ./source/services/facebook.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Facebook service provider
 * Share doc: https://developers.facebook.com/docs/workplace/sharing/share-dialog/
 * Counter doc: https://developers.facebook.com/docs/graph-api/reference/v8.0/engagement
 *
 * For hackers: the access token below is public, heavily restricted and doesn't allow to access anything of value
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  counterUrl: 'https://graph.facebook.com/?id={url}&access_token=1729830587180291|102e6d79cda2fa63b65c99c039eed12a&fields=og_object%7Bengagement%7Bcount%7D%7D',
  convertNumber: function convertNumber(data) {
    var graphQlData = JSON.parse(data).og_object;
    return graphQlData ? graphQlData.engagement.count : 0;
  },
  popupWidth: 555,
  popupHeight: 555,
  popupUrl: 'https://www.facebook.com/sharer.php?u={url}',
  knownParams: ['url', 'quote', 'hashtag', 'counter'],
  svgIconPath: '16.000,8.049 C16.000,3.629 12.418,0.047 8.000,0.047 C3.582,0.047 -0.000,3.629 -0.000,8.049 C-0.000,12.043 2.925,15.353 6.750,15.953 L6.750,10.362 L4.719,10.362 L4.719,8.049 L6.750,8.049 L6.750,6.286 C6.750,4.280 7.944,3.173 9.772,3.173 C10.647,3.173 11.563,3.329 11.563,3.329 L11.563,5.298 L10.554,5.298 C9.560,5.298 9.250,5.915 9.250,6.548 L9.250,8.049 L11.469,8.049 L11.114,10.362 L9.250,10.362 L9.250,15.953 C13.075,15.353 16.000,12.043 16.000,8.049'
});

/***/ }),

/***/ "./source/services/index.js":
/*!**********************************!*\
  !*** ./source/services/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service */ "./source/service.js");
/* harmony import */ var _facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./facebook */ "./source/services/facebook.js");
/* harmony import */ var _linkedin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linkedin */ "./source/services/linkedin.js");
/* harmony import */ var _odnoklassniki__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./odnoklassniki */ "./source/services/odnoklassniki.js");
/* harmony import */ var _pinterest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pinterest */ "./source/services/pinterest.js");
/* harmony import */ var _reddit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reddit */ "./source/services/reddit.js");
/* harmony import */ var _telegram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./telegram */ "./source/services/telegram.js");
/* harmony import */ var _twitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./twitter */ "./source/services/twitter.js");
/* harmony import */ var _viber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./viber */ "./source/services/viber.js");
/* harmony import */ var _vkontakte__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vkontakte */ "./source/services/vkontakte.js");
/* harmony import */ var _whatsapp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./whatsapp */ "./source/services/whatsapp.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Social network services aggregated together
 */











var services = {
  facebook: _facebook__WEBPACK_IMPORTED_MODULE_1__["default"],
  linkedin: _linkedin__WEBPACK_IMPORTED_MODULE_2__["default"],
  odnoklassniki: _odnoklassniki__WEBPACK_IMPORTED_MODULE_3__["default"],
  pinterest: _pinterest__WEBPACK_IMPORTED_MODULE_4__["default"],
  reddit: _reddit__WEBPACK_IMPORTED_MODULE_5__["default"],
  telegram: _telegram__WEBPACK_IMPORTED_MODULE_6__["default"],
  twitter: _twitter__WEBPACK_IMPORTED_MODULE_7__["default"],
  viber: _viber__WEBPACK_IMPORTED_MODULE_8__["default"],
  vkontakte: _vkontakte__WEBPACK_IMPORTED_MODULE_9__["default"],
  whatsapp: _whatsapp__WEBPACK_IMPORTED_MODULE_10__["default"]
};
Object.entries(services).forEach(function (entry) {
  var _entry = _slicedToArray(entry, 2),
    serviceName = _entry[0],
    serviceObj = _entry[1];
  (0,_service__WEBPACK_IMPORTED_MODULE_0__["default"])(serviceObj);
  serviceObj.name = serviceName;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (services);

/***/ }),

/***/ "./source/services/linkedin.js":
/*!*************************************!*\
  !*** ./source/services/linkedin.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * LinkedIn service provider
 * Doc: https://stackoverflow.com/questions/33426752/linkedin-share-post-url
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  popupUrl: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
  knownParams: ['url'],
  popupWidth: 600,
  popupHeight: 500,
  svgIconPath: '13.634,13.629 L11.263,13.629 L11.263,9.919 C11.263,9.035 11.247,7.896 10.030,7.896 C8.795,7.896 8.606,8.860 8.606,9.855 L8.606,13.629 L6.234,13.629 L6.234,6.000 L8.510,6.000 L8.510,7.043 L8.542,7.043 C9.006,6.250 9.869,5.777 10.788,5.811 C13.191,5.811 13.634,7.392 13.634,9.445 L13.634,13.629 ZM3.560,4.958 C2.800,4.958 2.184,4.343 2.184,3.583 C2.183,2.824 2.799,2.209 3.559,2.208 C4.319,2.208 4.935,2.823 4.935,3.583 L4.935,3.583 C4.936,4.342 4.320,4.957 3.560,4.958 M4.746,13.629 L2.372,13.629 L2.372,6.000 L4.745,6.000 L4.746,13.629 ZM14.816,0.007 L1.181,0.007 C0.536,0.000 0.008,0.516 -0.000,1.160 L-0.000,14.839 C0.007,15.484 0.536,16.000 1.181,15.993 L14.816,15.993 C15.461,16.000 15.991,15.484 16.000,14.839 L16.000,1.160 C15.991,0.515 15.461,-0.000 14.816,0.007'
});

/***/ }),

/***/ "./source/services/odnoklassniki.js":
/*!******************************************!*\
  !*** ./source/services/odnoklassniki.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./source/utils.js");

/**
 * Odnoklassniki service provider
 * Docs: https://apiok.ru/en/ext/like
 * https://connect.ok.ru/connect.js
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  counterUrl: 'https://connect.ok.ru/dk?st.cmd=extLike&tp=json&ref={url}',
  convertNumber: function convertNumber(json) {
    return JSON.parse(json).count;
  },
  clickCallback: function clickCallback() {
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.renameKey)(this.widget.dataset, 'imageurl', 'imageUrl');
    return true;
  },
  popupWidth: 588,
  popupHeight: 296,
  popupUrl: 'https://connect.ok.ru/offer?url={url}&title={title}',
  knownParams: ['url', 'title', 'imageurl', 'counter'],
  svgIconPath: '12.1,10.6c-0.7,0.5-1.5,0.8-2.4,1l2.3,2.3c0.5,0.5,0.5,1.2,0,1.7c-0.5,0.5-1.2,0.5-1.7,0L8,13.4l-2.3,2.3 C5.5,15.9,5.2,16,4.9,16c-0.3,0-0.6-0.1-0.9-0.4c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3c-0.8-0.2-1.7-0.5-2.4-1C3.4,10.3,3.2,9.6,3.5,9 c0.4-0.6,1.1-0.7,1.7-0.4c1.7,1.1,3.9,1.1,5.6,0c0.6-0.4,1.3-0.2,1.7,0.4C12.8,9.5,12.6,10.3,12.1,10.6z M8,8.3 c-2.3,0-4.1-1.9-4.1-4.1C3.9,1.8,5.7,0,8,0c2.3,0,4.1,1.9,4.1,4.1C12.1,6.4,10.3,8.3,8,8.3z M8,2.4c-1,0-1.7,0.8-1.7,1.7 c0,0.9,0.8,1.7,1.7,1.7c0.9,0,1.7-0.8,1.7-1.7C9.7,3.2,9,2.4,8,2.4'
});

/***/ }),

/***/ "./source/services/pinterest.js":
/*!**************************************!*\
  !*** ./source/services/pinterest.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Pinterest service provider
 * Docs: https://developers.pinterest.com/docs/widgets/save/
 * https://stackoverflow.com/questions/9951045/pinterest-api-documentation
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  counterUrl: 'https://api.pinterest.com/v1/urls/count.json?url={url}&callback=jsonp',
  convertNumber: function convertNumber(jsonpStr) {
    var json = jsonpStr.slice(6, jsonpStr.length - 1);
    return JSON.parse(json).count;
  },
  popupUrl: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
  popupWidth: 750,
  popupHeight: 750,
  knownParams: ['url', 'title', 'media', 'counter'],
  svgIconPath: '7.99 0c-4.417 0-8 3.582-8 8 0 3.39 2.11 6.284 5.086 7.45-.07-.633-.133-1.604.028-2.295.145-.624.938-3.977.938-3.977s-.24-.48-.24-1.188c0-1.112.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .686-.437 1.713-.663 2.664-.19.796.398 1.446 1.184 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.255-3.343-3.255-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826.065.08.075.15.055.23-.06.252-.195.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.74 4.976-4.152 4.976-.81 0-1.573-.42-1.834-.92l-.498 1.903c-.18.695-.668 1.566-.994 2.097.75.232 1.544.357 2.37.357 4.417 0 8-3.582 8-8s-3.583-8-8-8'
});

/***/ }),

/***/ "./source/services/reddit.js":
/*!***********************************!*\
  !*** ./source/services/reddit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Reddit service provider
 * Share doc: https://www.reddit.com/dev/api#POST_api_submit + https://stackoverflow.com/a/32533431
 * Counter doc: https://www.reddit.com/dev/api/#GET_search
 * Scores are in `child.data.score` and are number of up-votes minus number of down-votes for an URL submitted to Reddit
 * Displayed counter is calculated as sum of counts for the 5 most upvoted posts for this url.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  counterUrl: 'https://www.reddit.com/search.json?q=url:{url}&sort=top&type=link&limit=5',
  convertNumber: function convertNumber(response) {
    var parsedResponse = JSON.parse(response);
    var totalUpvotes = 0;
    parsedResponse.data.children.forEach(function (child) {
      if (child.data && child.data.score) {
        totalUpvotes += child.data.score;
      }
    });
    return totalUpvotes;
  },
  popupUrl: 'https://reddit.com/submit?url={url}&title={title}',
  popupWidth: 785,
  popupHeight: 550,
  knownParams: ['url', 'title', 'counter'],
  svgIconPath: '15.936 8.186 C 15.936 7.227 15.159 6.45 14.2 6.45 C 13.732 6.45 13.308 6.636 12.995 6.937 C 11.808 6.08 10.173 5.527 8.352 5.464 L 9.143 1.742 L 11.727 2.291 C 11.758 2.949 12.296 3.473 12.961 3.473 C 13.646 3.473 14.202 2.918 14.202 2.233 C 14.202 1.548 13.646 0.992 12.961 0.992 C 12.474 0.992 12.057 1.276 11.854 1.685 L 8.968 1.071 C 8.888 1.054 8.804 1.069 8.735 1.114 C 8.666 1.159 8.617 1.23 8.6 1.31 L 7.717 5.462 C 5.869 5.514 4.207 6.068 3.005 6.934 C 2.693 6.634 2.271 6.45 1.804 6.45 C 0.845 6.45 0.068 7.227 0.068 8.186 C 0.068 8.892 0.489 9.498 1.094 9.769 C 1.067 9.942 1.052 10.117 1.052 10.295 C 1.052 12.966 4.162 15.132 7.998 15.132 C 11.834 15.132 14.944 12.966 14.944 10.295 C 14.944 10.118 14.929 9.944 14.903 9.773 C 15.511 9.503 15.936 8.894 15.936 8.186 Z M 4.031 9.427 C 4.031 8.743 4.588 8.186 5.272 8.186 C 5.955 8.186 6.512 8.743 6.512 9.427 C 6.512 10.11 5.955 10.667 5.272 10.667 C 4.588 10.667 4.031 10.11 4.031 9.427 Z M 10.947 12.704 C 10.101 13.549 8.478 13.615 8.001 13.615 C 7.524 13.615 5.902 13.549 5.057 12.704 C 4.931 12.578 4.931 12.375 5.057 12.249 C 5.182 12.124 5.386 12.124 5.511 12.249 C 6.045 12.783 7.186 12.972 8.001 12.972 C 8.817 12.972 9.958 12.783 10.493 12.249 C 10.619 12.124 10.822 12.124 10.947 12.249 C 11.073 12.375 11.073 12.578 10.947 12.704 Z M 10.729 10.667 C 10.045 10.667 9.488 10.11 9.488 9.427 C 9.488 8.743 10.045 8.186 10.729 8.186 C 11.413 8.186 11.969 8.743 11.969 9.427 C 11.969 10.11 11.413 10.667 10.729 10.667'
});

/***/ }),

/***/ "./source/services/telegram.js":
/*!*************************************!*\
  !*** ./source/services/telegram.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Telegram service provider
 * Share doc: https://core.telegram.org/widgets/share
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  popupUrl: 'https://telegram.me/share/url?url={url}&text={title}',
  popupWidth: 485,
  popupHeight: 355,
  knownParams: ['url', 'title'],
  svgIconPath: '1.155 7.049 C 5.43 5.188 8.281 3.962 9.708 3.369 C 13.781 1.677 14.627 1.384 15.179 1.374 C 15.3 1.372 15.571 1.402 15.747 1.544 C 15.895 1.664 15.936 1.827 15.956 1.941 C 15.975 2.055 15.999 2.314 15.98 2.517 C 15.759 4.834 14.804 10.454 14.319 13.048 C 14.113 14.146 13.708 14.514 13.316 14.55 C 12.465 14.628 11.818 13.988 10.993 13.448 C 9.702 12.603 8.973 12.077 7.72 11.252 C 6.272 10.299 7.211 9.775 8.036 8.919 C 8.252 8.695 12.004 5.286 12.077 4.977 C 12.086 4.938 12.095 4.794 12.009 4.718 C 11.923 4.642 11.797 4.668 11.705 4.689 C 11.576 4.718 9.514 6.079 5.519 8.772 C 4.934 9.174 4.404 9.369 3.929 9.359 C 3.405 9.348 2.398 9.063 1.649 8.82 C 0.731 8.522 0.001 8.364 0.064 7.858 C 0.097 7.594 0.461 7.325 1.155 7.049'
});

/***/ }),

/***/ "./source/services/twitter.js":
/*!************************************!*\
  !*** ./source/services/twitter.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Twitter service provider
 * Doc: https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/parameter-reference1
 * Also mentions "related" param, but it doesn't seem to do any anything in 2020.
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  popupUrl: 'https://twitter.com/intent/tweet?url={url}&text={title}',
  popupWidth: 600,
  popupHeight: 450,
  clickCallback: function clickCallback() {
    if (!/[.?:\-–—]\s*$/.test(this.options.title)) {
      this.options.title += ':';
    }
    return true;
  },
  knownParams: ['url', 'title', 'via', 'hashtags'],
  svgIconPath: '15.969,3.058c-0.586,0.26-1.217,0.436-1.878,0.515c0.675-0.405,1.194-1.045,1.438-1.809c-0.632,0.375-1.332,0.647-2.076,0.793c-0.596-0.636-1.446-1.033-2.387-1.033c-1.806,0-3.27,1.464-3.27,3.27 c0,0.256,0.029,0.506,0.085,0.745C5.163,5.404,2.753,4.102,1.14,2.124C0.859,2.607,0.698,3.168,0.698,3.767 c0,1.134,0.577,2.135,1.455,2.722C1.616,6.472,1.112,6.325,0.671,6.08c0,0.014,0,0.027,0,0.041c0,1.584,1.127,2.906,2.623,3.206 C3.02,9.402,2.731,9.442,2.433,9.442c-0.211,0-0.416-0.021-0.615-0.059c0.416,1.299,1.624,2.245,3.055,2.271 c-1.119,0.877-2.529,1.4-4.061,1.4c-0.264,0-0.524-0.015-0.78-0.046c1.447,0.928,3.166,1.469,5.013,1.469 c6.015,0,9.304-4.983,9.304-9.304c0-0.142-0.003-0.283-0.009-0.423C14.976,4.29,15.531,3.714,15.969,3.058'
});

/***/ }),

/***/ "./source/services/viber.js":
/*!**********************************!*\
  !*** ./source/services/viber.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Viber service provider
 * Doc: https://developers.viber.com/docs/tools/share-button/
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  popupUrl: 'viber://forward?text={content}',
  clickCallback: function clickCallback() {
    // Treat empty title string as absent title
    if (this.options.title) {
      this.options.content = this.options.title + '\n' + this.options.url;
    } else {
      this.options.content = this.options.url;
    }
    return true;
  },
  openPopup: false,
  knownParams: ['url', 'title'],
  svgIconPath: '5.24 12.7 C 5.24 12.7 5.24 13.21 5.24 13.21 C 5.24 13.21 5.21 13.61 5.21 13.61 C 5.21 13.61 5.21 15.65 5.21 15.65 C 5.21 15.65 5.21 15.81 5.21 15.81 C 5.24 15.98 5.36 16.05 5.5 15.95 C 5.63 15.87 5.91 15.54 6.02 15.41 C 6.02 15.41 7.34 13.83 7.34 13.83 C 7.34 13.83 7.74 13.35 7.74 13.35 C 7.78 13.29 7.86 13.17 7.93 13.16 C 7.93 13.16 8.27 13.16 8.27 13.16 C 8.27 13.16 9.55 13.16 9.55 13.16 C 9.55 13.16 9.84 13.13 9.84 13.13 C 10.69 13.1 11.54 12.97 12.37 12.75 C 13.36 12.49 14.01 12.3 14.74 11.5 C 15.42 10.75 15.71 9.75 15.85 8.76 C 15.85 8.76 15.95 7.64 15.95 7.64 C 15.95 7.64 15.97 7.37 15.97 7.37 C 15.97 7.37 16 6.78 16 6.78 C 16 6.78 16 6.08 16 6.08 C 16 6.08 15.97 5.57 15.97 5.57 C 15.97 5.57 15.95 5.31 15.95 5.31 C 15.92 4.88 15.86 4.47 15.78 4.05 C 15.59 3.05 15.22 2.1 14.49 1.4 C 14.18 1.1 13.65 0.86 13.26 0.7 C 12.59 0.43 11.85 0.26 11.14 0.16 C 11.14 0.16 10.18 0.05 10.18 0.05 C 10.18 0.05 9.68 0.03 9.68 0.03 C 9.68 0.03 9.16 0.03 9.16 0.03 C 9.16 0.03 8.82 0 8.82 0 C 8.82 0 8.24 0.03 8.24 0.03 C 8.24 0.03 7.98 0.03 7.98 0.03 C 7.98 0.03 7.72 0.05 7.72 0.05 C 6.73 0.12 5.75 0.29 4.82 0.67 C 4.35 0.86 3.77 1.19 3.41 1.55 C 2.51 2.48 2.2 3.83 2.07 5.09 C 2.07 5.09 2.03 5.71 2.03 5.71 C 2.03 5.71 2.03 6.16 2.03 6.16 C 2.03 6.16 2 6.57 2 6.57 C 2 6.57 2 7.45 2 7.45 C 2 7.45 2.03 7.99 2.03 7.99 C 2.03 7.99 2.1 8.74 2.1 8.74 C 2.25 9.81 2.6 10.87 3.36 11.65 C 3.59 11.89 3.89 12.11 4.17 12.27 C 4.43 12.43 4.94 12.66 5.24 12.7 Z M 8.82 1.94 C 9.21 1.88 9.98 2.02 10.36 2.15 C 11.72 2.62 12.71 3.58 13.17 4.98 C 13.35 5.53 13.41 6.11 13.44 6.67 C 13.46 7.04 13.16 7.08 13.03 6.94 C 12.95 6.84 12.97 6.71 12.97 6.59 C 12.97 6.59 12.95 6.32 12.95 6.32 C 12.89 5.58 12.69 4.84 12.29 4.21 C 11.7 3.29 10.73 2.66 9.68 2.47 C 9.68 2.47 9.18 2.41 9.18 2.41 C 9.06 2.41 8.85 2.42 8.74 2.34 C 8.62 2.24 8.63 2.02 8.82 1.94 Z M 5.79 2.45 C 6.24 2.4 6.34 2.6 6.6 2.92 C 6.9 3.29 7.09 3.56 7.34 3.97 C 7.46 4.17 7.59 4.38 7.61 4.64 C 7.62 4.72 7.6 4.8 7.58 4.88 C 7.43 5.4 6.92 5.37 6.81 5.84 C 6.75 6.1 6.99 6.58 7.12 6.81 C 7.55 7.61 8.19 8.35 9.03 8.72 C 9.23 8.81 9.6 8.99 9.81 8.94 C 10.15 8.86 10.25 8.54 10.47 8.31 C 10.6 8.18 10.75 8.13 10.93 8.12 C 11.25 8.11 11.38 8.23 11.64 8.39 C 12.05 8.65 12.36 8.89 12.74 9.2 C 12.95 9.38 13.17 9.58 13.14 9.89 C 13.12 10.16 12.94 10.43 12.78 10.64 C 12.65 10.8 12.48 11 12.32 11.13 C 12.11 11.29 11.87 11.41 11.61 11.44 C 11.45 11.45 11.24 11.37 11.09 11.32 C 10.72 11.19 10.29 10.97 9.94 10.79 C 8.96 10.29 8.03 9.67 7.22 8.9 C 7.22 8.9 7.02 8.71 7.02 8.71 C 6.15 7.79 5.5 6.74 4.95 5.6 C 4.78 5.26 4.61 4.92 4.49 4.56 C 4.43 4.38 4.38 4.29 4.38 4.1 C 4.37 3.78 4.5 3.49 4.7 3.24 C 4.82 3.09 5.01 2.92 5.16 2.8 C 5.36 2.64 5.54 2.5 5.79 2.45 Z M 9.18 3.12 C 9.44 3.07 9.9 3.18 10.15 3.25 C 11.1 3.53 11.8 4.21 12.12 5.17 C 12.19 5.39 12.26 5.72 12.26 5.95 C 12.27 6.05 12.28 6.36 12.25 6.43 C 12.2 6.54 12.06 6.59 11.95 6.53 C 11.79 6.45 11.83 6.27 11.82 6.11 C 11.82 6.11 11.79 5.9 11.79 5.9 C 11.76 5.47 11.61 5.04 11.37 4.69 C 11.03 4.2 10.53 3.85 9.97 3.7 C 9.97 3.7 9.52 3.6 9.52 3.6 C 9.45 3.59 9.24 3.57 9.18 3.54 C 9.02 3.47 9 3.23 9.18 3.12 Z M 9.55 4.33 C 9.69 4.3 9.8 4.32 9.94 4.35 C 10.45 4.45 10.84 4.75 11.02 5.25 C 11.09 5.44 11.15 5.73 11.14 5.92 C 11.13 6.08 11.04 6.18 10.88 6.16 C 10.76 6.14 10.72 6.06 10.69 5.95 C 10.63 5.68 10.68 5.56 10.52 5.28 C 10.38 5.04 10.15 4.88 9.89 4.82 C 9.71 4.79 9.43 4.81 9.38 4.58 C 9.36 4.45 9.44 4.37 9.55 4.33'
});

/***/ }),

/***/ "./source/services/vkontakte.js":
/*!**************************************!*\
  !*** ./source/services/vkontakte.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./source/utils.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ "./source/dom.js");
/**
 * VK service provider
 * Doc: https://vk.com/dev/widget_share
 * (Switch to Russian language, the English docs are incomplete)
 * VK own implementation: https://vk.com/js/api/share.js
 */



var vkontakte = {
  popupWidth: 650,
  popupHeight: 570,
  counterUrl: 'https://vk.com/share.php?act=count&url={url}&index={index}',
  fetch: function fetch(broadcaster) {
    var index = Object.keys(this.broadcastersByUrl).length - 1;
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadJSONP)((0,_utils__WEBPACK_IMPORTED_MODULE_0__.interpolateUrl)(broadcaster.url, {
      index: index
    }));
  },
  popupUrl: 'https://vk.com/share.php?url={url}&title={title}',
  knownParams: ['url', 'title', 'image', 'comment', 'counter'],
  svgIconPath: '8.71453 12.9837C3.24794 12.9837 0.129919 9.23611 0 3H2.73828C2.82823 7.57714 4.84693 9.51592 6.44591 9.91565V3H9.02439V6.94751C10.6034 6.77762 12.2622 4.97876 12.8218 3H15.4003C14.9705 5.43847 13.1717 7.23734 11.8925 7.97687C13.1717 8.5765 15.2205 10.1455 16 12.9837H13.1617C12.5521 11.0849 11.0331 9.61584 9.02439 9.41597V12.9837H8.71453'
};

// Script, returned by VK, calls this method with two arguments
(0,_utils__WEBPACK_IMPORTED_MODULE_0__.registerGlobalCallback)('VK.Share.count', function (index, count) {
  var broadcasters = vkontakte.broadcastersByUrl;
  broadcasters[Object.keys(broadcasters)[index]].trigger(count);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (vkontakte);

/***/ }),

/***/ "./source/services/whatsapp.js":
/*!*************************************!*\
  !*** ./source/services/whatsapp.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * WhatsApp service provider
 * Doc: https://faq.whatsapp.com/iphone/how-to-link-to-whatsapp-from-a-different-app
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // %0D%0A% is the encoding for enter key
  popupUrl: 'whatsapp://send?text={title}%0D%0A%0D%0A{url}',
  // Sending on WhatsApp using manifest link instead of popup
  openPopup: false,
  knownParams: ['url', 'title'],
  svgIconPath: '8.013,15.949 L8.009,15.949 C6.574,15.948 5.167,15.564 3.939,14.839 L3.647,14.666 L0.620,15.457 L1.428,12.517 L1.238,12.216 C0.438,10.947 0.015,9.481 0.016,7.976 C0.017,3.584 3.605,0.010 8.016,0.010 C10.152,0.011 12.160,0.841 13.669,2.347 C15.179,3.852 16.010,5.854 16.009,7.983 C16.008,12.375 12.420,15.949 8.013,15.949 ZM12.860,10.262 C12.800,10.162 12.639,10.103 12.399,9.983 C12.159,9.863 10.977,9.283 10.756,9.203 C10.536,9.124 10.376,9.084 10.215,9.323 C10.055,9.563 9.594,10.103 9.454,10.262 C9.314,10.422 9.174,10.442 8.933,10.322 C8.693,10.202 7.918,9.950 7.000,9.134 C6.285,8.499 5.803,7.714 5.663,7.475 C5.522,7.235 5.648,7.105 5.768,6.986 C5.876,6.878 6.008,6.706 6.129,6.566 C6.249,6.426 6.289,6.327 6.369,6.167 C6.449,6.007 6.409,5.867 6.349,5.747 C6.289,5.627 5.822,4.443 5.608,3.969 C5.428,3.570 5.238,3.562 5.067,3.555 C4.927,3.549 4.766,3.549 4.606,3.549 C4.446,3.549 4.185,3.609 3.965,3.849 C3.745,4.089 3.124,4.668 3.124,5.847 C3.124,7.026 3.985,8.165 4.105,8.324 C4.226,8.484 5.769,10.980 8.212,11.941 C10.243,12.739 10.656,12.580 11.097,12.540 C11.538,12.500 12.519,11.961 12.720,11.401 C12.920,10.842 12.920,10.362 12.860,10.262'
});

/***/ }),

/***/ "./source/utils.js":
/*!*************************!*\
  !*** ./source/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extendWith": () => (/* binding */ extendWith),
/* harmony export */   "getBools": () => (/* binding */ getBools),
/* harmony export */   "getDataset": () => (/* binding */ getDataset),
/* harmony export */   "getDefaultUrl": () => (/* binding */ getDefaultUrl),
/* harmony export */   "interpolateStr": () => (/* binding */ interpolateStr),
/* harmony export */   "interpolateUrl": () => (/* binding */ interpolateUrl),
/* harmony export */   "isBrowserEnv": () => (/* binding */ isBrowserEnv),
/* harmony export */   "mergeToNew": () => (/* binding */ mergeToNew),
/* harmony export */   "registerGlobalCallback": () => (/* binding */ registerGlobalCallback),
/* harmony export */   "renameKey": () => (/* binding */ renameKey),
/* harmony export */   "toArray": () => (/* binding */ toArray)
/* harmony export */ });
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var bool = {
  yes: true,
  no: false
};

/**
 * Polyfill Object.entries() for IE support
 * @param {Object} obj
 * @returns {Array} Keys and values presented as array
 */
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj);
    var i = ownProps.length;
    var resArray = new Array(i);
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

/**
 * Convert array-like object to array (for example DOMTokenList)
 * @param {Object} arrayLike
 * @returns {Array}
 */
var toArray = function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

/**
 * Merge given dictionaries (objects) into one object.
 * Iterates across the arguments, the last one gets priority.
 * @returns {Object}
 */
var mergeToNew = function mergeToNew() {
  var newObject = {};
  var args = Array.prototype.slice.call(arguments); // eslint-disable-line no-undef

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg) {
      for (var key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          newObject[key] = arg[key];
        }
      }
    }
  }
  return newObject;
};

/**
 * Extend one (target) object by other (subject)
 * @param {Object} target
 * @param {Object} subject
 * @returns {Object} Extended target
 */
var extendWith = function extendWith(target, subject) {
  for (var key in subject) {
    if (Object.prototype.hasOwnProperty.call(subject, key)) {
      target[key] = subject[key];
    }
  }
  return target;
};

/**
 * Return node.dataset or plain object for IE10 without setters
 * based on https://gist.github.com/brettz9/4093766#file_html5_dataset.js
 *
 * @param {Node} node
 * @returns {Object}
 */
var getDataset = function getDataset(node) {
  if (_typeof(node.dataset) === 'object') {
    return node.dataset;
  }
  var i;
  var dataset = {};
  var attributes = node.attributes;
  var attribute;
  var attributeName;
  var toUpperCase = function toUpperCase(n0) {
    return n0.charAt(1).toUpperCase();
  };
  for (i = attributes.length - 1; i >= 0; i--) {
    attribute = attributes[i];
    if (attribute && attribute.name && /^data-\w[\w-]*$/.test(attribute.name)) {
      attributeName = attribute.name.substr(5).replace(/-./g, toUpperCase);
      dataset[attributeName] = attribute.value;
    }
  }
  return dataset;
};

/**
 * Convert "yes" and "no" to true and false.
 * @param {Node} node
 * @returns {Object}
 */
var getBools = function getBools(node) {
  var result = {};
  var data = getDataset(node);
  for (var key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      var value = data[key];
      result[key] = value in bool ? bool[value] : value;
    }
  }
  return result;
};

/**
 * Map object keys in string to its values
 * @param {String} text
 * @param {Object} data
 * @returns {String}
 */
var interpolateStr = function interpolateStr(text, data) {
  return text ? text.replace(/\{([^}]+)}/g, function (value, key) {
    return key in data ? data[key] : value;
  }) : '';
};

/**
 * Map object keys in URL to its values
 * @param {String} text
 * @param {Object} data
 * @returns {String}
 */
var interpolateUrl = function interpolateUrl(text, data) {
  for (var key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key] = encodeURIComponent(data[key]);
    }
  }
  return interpolateStr(text, data);
};
/**
 * Set value in object using dot-notation
 * @param {String} key
 * @param {Object} value
 */
var registerGlobalCallback = function registerGlobalCallback(key, value) {
  var frags = key.split('.');
  var last = null;
  var object = __webpack_require__.g;
  frags.forEach(function (key, index) {
    if (typeof object[key] === 'undefined') {
      object[key] = {};
    }
    if (index !== frags.length - 1) {
      object = object[key]; // eslint-disable-line no-param-reassign
    }

    last = key;
  });
  object[last] = value;
};

/**
 * Returns default url for likely.
 * It could be href from <link rel='canonical'>
 * if presents in the document, or the current url of the page otherwise
 * @returns {String}
 */
var getDefaultUrl = function getDefaultUrl() {
  var link = document.querySelector('link[rel="canonical"]');
  if (link) {
    return link.href;
  }
  return window.location.href.replace(window.location.hash, '');
};

/**
 * Is code run in browser or on server.
 */
var isBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined' && document.createElement;

/**
 * Renames a key in an object, using ES6 syntax
 * @param {Object} obj
 * @param {String} oldKey
 * @param {String} newKey
 */
var renameKey = function renameKey(obj, oldKey, newKey) {
  if (Object.prototype.hasOwnProperty.call(obj, oldKey)) {
    delete Object.assign(obj, _defineProperty({}, newKey, obj[oldKey]))[oldKey];
  }
};

/***/ }),

/***/ "./source/widget.js":
/*!**************************!*\
  !*** ./source/widget.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./source/button.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./source/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./source/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Main widget view
 * @param {Node} container
 * @param {Object} options
 */
var Likely = /*#__PURE__*/function () {
  function Likely(container, options) {
    _classCallCheck(this, Likely);
    this.container = container;
    this.options = options;
    this.countersLeft = 0;
    this.buttons = [];
    (0,_utils__WEBPACK_IMPORTED_MODULE_2__.toArray)(this.container.children).forEach(this.addButton.bind(this));
    this.appear();
    if (this.options.counters) {
      this.readyDelay = setTimeout(this.ready.bind(this), this.options.timeout);
    } else {
      this.ready();
    }
    this.materializeButtons();
  }

  /**
   * Add a button
   * @param {Node} node
   */
  _createClass(Likely, [{
    key: "addButton",
    value: function addButton(node) {
      var button = new _button__WEBPACK_IMPORTED_MODULE_0__["default"](node, this, this.options);
      if (button.isConnected()) {
        this.buttons.push(button);
        if (button.options.service.counterUrl) {
          this.countersLeft++;
        }
      } else if (button.isUnrecognized()) {
        console.warn('A button without a valid service detected, please check button classes.');
      }
    }

    /**
     * Show all the buttons
     */
  }, {
    key: "materializeButtons",
    value: function materializeButtons() {
      this.buttons.forEach(function (button) {
        return button.prepare();
      });
    }

    /**
     * Refresh all the buttons
     * @param {Object} options
     */
  }, {
    key: "update",
    value: function update(options) {
      if (options.forceUpdate || options.url && options.url !== this.options.url) {
        this.countersLeft = this.buttons.length;
        this.buttons.forEach(function (button) {
          button.update(options);
        });
      }
    }

    /**
     * Register the button as ready
     */
  }, {
    key: "finalize",
    value: function finalize() {
      this.countersLeft--;
      if (this.countersLeft === 0) {
        clearTimeout(this.readyDelay);
        this.ready();
      }
    }

    /**
     * @deprecated Will be deleted in version 3.0, and joined with likely_ready
     * Show the buttons with smooth animation
     */
  }, {
    key: "appear",
    value: function appear() {
      this.container.classList.add("".concat(_config__WEBPACK_IMPORTED_MODULE_1__["default"].name, "_visible"));
    }

    /**
     * Display ready status
     */
  }, {
    key: "ready",
    value: function ready() {
      this.container.classList.add("".concat(_config__WEBPACK_IMPORTED_MODULE_1__["default"].name, "_ready"));
    }
  }]);
  return Likely;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Likely);

/***/ }),

/***/ "./source/index.styl":
/*!***************************!*\
  !*** ./source/index.styl ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./source/likely.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=likely.js.map