(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Persist"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Persist"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = typeof window !== "undefined" && window || {};

exports.window = win;
var document = exports.document = win.document;
var history = exports.history = win.history;
var localStorage = exports.localStorage = win.localStorage;
var location = exports.location = win.location;
var sessionStorage = exports.sessionStorage = win.sessionStorage;
var navigator = exports.navigator = win.navigator;
var JSON = exports.JSON = win.JSON;
var RegExp = exports.RegExp = win.RegExp;
var parseFloat = exports.parseFloat = win.parseFloat;
var performance = exports.performance = win.performance;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _browser = __webpack_require__(0);

var userAgent = _browser.navigator.userAgent;
var TYPE_BACK_FORWARD = _browser.performance.navigation.TYPE_BACK_FORWARD || 2;

var isNeeded = function () {
	var isIOS = new _browser.RegExp("iPhone|iPad", "i").test(userAgent);
	var isMacSafari = new _browser.RegExp("Mac", "i").test(userAgent) && !new _browser.RegExp("Chrome", "i").test(userAgent) && new _browser.RegExp("Apple", "i").test(userAgent);
	var isAndroid = new _browser.RegExp("Android ", "i").test(userAgent);
	var isWebview = new _browser.RegExp("wv; |inapp;", "i").test(userAgent);
	var androidVersion = isAndroid ? (0, _browser.parseFloat)(new _browser.RegExp("(Android)\\s([\\d_\\.]+|\\d_0)", "i").exec(userAgent)[2]) : undefined;

	return !(isIOS || isMacSafari || isAndroid && (androidVersion <= 4.3 && isWebview || androidVersion < 3));
}();

// In case of IE8, TYPE_BACK_FORWARD is undefined.
function isBackForwardNavigated() {
	return _browser.performance.navigation.type === TYPE_BACK_FORWARD;
}

exports.default = {
	isBackForwardNavigated: isBackForwardNavigated,
	isNeeded: isNeeded
};
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _storageManager = __webpack_require__(5);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @namespace eg
 */

/**
* Get or store the current state of the web page using JSON.
* @ko 웹 페이지의 현재 상태를 JSON 형식으로 저장하거나 읽는다.
* @name eg#Persist
* @alias eg.Persist
* @method
* @param {String} key The key of the state information to be stored <ko>저장할 상태 정보의 키</ko>
* @param {Object} [state] The value to be stored in a given key <ko>키에 저장할 값</ko>
* @example
```javascript
eg.Persist(key);
eg.Persist(key, value);
```
**/
function Persist(key, value) {
	if (typeof key !== "string") {
		/* eslint-disable no-console */
		console.warn("first param must be a string!");
		/* eslint-enable no-console */
		return undefined;
	}

	if (value || arguments.length === 2) {
		_storageManager2.default.setStateByKey(key, value);
	}

	return _storageManager2.default.getStateByKey(key);
}

/**
* Return whether you need "Persist" module by checking the bfCache support of the current browser
* @ko 현재 브라우저의 bfCache 지원여부에 따라 persist 모듈의 필요여부를 반환한다.
* @group eg.Persist
* @name eg.Persist.isNeeded
* @alias eg.Persist.isNeeded
* @namespace
* @property {function} isNeeded
* @example
eg.Persist.isNeeded();
*/
Persist.isNeeded = function () {
	return _utils.isNeeded;
};

Persist.VERSION = "2.0.0-rc.1";

exports.default = Persist;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONST_PERSIST = "___persist___";

exports.default = CONST_PERSIST;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _persist = __webpack_require__(2);

var _persist2 = _interopRequireDefault(_persist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _persist2.default; /**
                                    * Copyright (c) 2015 NAVER Corp.
                                    * egjs-persist projects are licensed under the MIT license
                                    */

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _consts = __webpack_require__(3);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isSupportState = "replaceState" in _browser.history && "state" in _browser.history;

function isStorageAvailable(storage) {
	if (!storage) {
		return undefined;
	}
	var TMP_KEY = "__tmp__" + _consts2.default;

	try {
		// In case of iOS safari private mode, calling setItem on storage throws error
		storage.setItem(TMP_KEY, _consts2.default);

		// In Chrome incognito mode, can not get saved value
		// In IE8, calling storage.getItem occasionally makes "Permission denied" error
		return storage.getItem(TMP_KEY) === _consts2.default;
	} catch (e) {
		return false;
	}
}

var storage = function () {
	var strg = void 0;

	if (isStorageAvailable(_browser.sessionStorage)) {
		strg = _browser.sessionStorage;
	} else if (isStorageAvailable(_browser.localStorage)) {
		strg = _browser.localStorage;
	}

	return strg;
}();

function warnInvalidStorageValue() {
	/* eslint-disable no-console */
	console.warn("window.history or session/localStorage has no valid " + "format data to be handled in persist.");
	/* eslint-enable no-console */
}

function getStorageKey() {
	return storage ? _browser.location.href + _consts2.default : undefined;
}

function getStorage() {
	return storage;
}

/*
 * Get state value
 */
function getState() {
	var state = void 0;
	var stateStr = storage ? storage.getItem(_browser.location.href + _consts2.default) : _browser.history.state;

	// the storage is clean
	if (stateStr === null) {
		return {};
	}

	// "null" is not a valid
	var isValidStateStr = typeof stateStr === "string" && stateStr.length > 0 && stateStr !== "null";

	try {
		state = _browser.JSON.parse(stateStr);

		// like '[ ... ]', '1', '1.234', '"123"' is also not valid
		var isValidType = !((typeof state === "undefined" ? "undefined" : _typeof(state)) !== "object" || state instanceof Array);

		if (!isValidStateStr || !isValidType) {
			throw new Error();
		}
	} catch (e) {
		warnInvalidStorageValue();
		state = {};
	}

	// Note2 (Android 4.3) return value is null
	return state;
}

function getStateByKey(key) {
	if (!isSupportState && !storage) {
		return undefined;
	}

	var result = getState()[key];

	// some device returns "null" or undefined
	if (result === "null" || typeof result === "undefined") {
		result = null;
	}
	return result;
}

/*
 * Set state value
 */
function setState(state) {
	if (storage) {
		if (state) {
			storage.setItem(_browser.location.href + _consts2.default, _browser.JSON.stringify(state));
		} else {
			storage.removeItem(_browser.location.href + _consts2.default);
		}
	} else {
		try {
			_browser.history.replaceState(state === null ? null : _browser.JSON.stringify(state), document.title, _browser.location.href);
		} catch (e) {
			/* eslint-disable no-console */
			console.warn(e.message);
			/* eslint-enable no-console */
		}
	}

	state ? _browser.window[_consts2.default] = true : delete _browser.window[_consts2.default];
}

function setStateByKey(key, data) {
	if (!isSupportState && !storage) {
		return;
	}

	var beforeData = getState();

	beforeData[key] = data;
	setState(beforeData);
}

/*
 * flush current history state
 */
function reset() {
	setState(null);
}

// in case of reload
!_utils2.default.isBackForwardNavigated() && reset();

exports.default = {
	reset: reset,
	setStateByKey: setStateByKey,
	getStateByKey: getStateByKey,
	getStorageKey: getStorageKey,
	getStorage: getStorage
};
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=persist.js.map