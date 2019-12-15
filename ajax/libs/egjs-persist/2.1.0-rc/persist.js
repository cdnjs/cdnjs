/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/persist project is licensed under the MIT license
 * 
 * @egjs/persist JavaScript library
 * 
 * 
 * @version 2.1.0-rc
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Persist", [], factory);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var win = typeof window !== "undefined" && window || {};

exports.window = win;
var console = exports.console = win.console;
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


exports.__esModule = true;

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

exports["default"] = {
	isBackForwardNavigated: isBackForwardNavigated,
	isNeeded: isNeeded
};
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Persist = __webpack_require__(3);

var _Persist2 = _interopRequireDefault(_Persist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Persist2["default"].VERSION = "2.1.0-rc"; /**
                                           * Copyright (c) 2015 NAVER Corp.
                                           * egjs-persist projects are licensed under the MIT license
                                           */

module.exports = _Persist2["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _storageManager = __webpack_require__(4);

var _storageManager2 = _interopRequireDefault(_storageManager);

var _utils = __webpack_require__(1);

var _browser = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setRec(obj, path, value) {
	var _obj = obj;

	if (!_obj) {
		_obj = isNaN(path[0]) ? {} : [];
	}

	var head = path.shift();

	if (path.length === 0) {
		if (_obj instanceof Array && isNaN(head)) {
			_browser.console.warn("Don't use key string on array");
		}
		_obj[head] = value;
		return _obj;
	}

	_obj[head] = setRec(_obj[head], path, value);
	return _obj;
}

/**
 * Get or store the current state of the web page using JSON.
 * @ko 웹 페이지의 현재 상태를 JSON 형식으로 저장하거나 읽는다.
 * @alias eg.Persist
 *
 * @support {"ie": "9+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */

var Persist = function () {
	/**
 * Constructor
 * @param {String} key The key of the state information to be stored <ko>저장할 상태 정보의 키</ko>
 **/
	function Persist(key, value) {
		_classCallCheck(this, Persist);

		this.key = key;
	}

	/**
  * Read value
  * @param {String?} path target path
  * @return {String|Number|Boolean|Object|Array}
  */


	Persist.prototype.get = function get(path) {
		// find path
		var globalState = _storageManager2["default"].getStateByKey(this.key);

		if (!path || path.length === 0) {
			return globalState;
		}

		var pathToken = path.split(".");
		var currentItem = globalState;
		var isTargetExist = true;

		for (var i = 0; i < pathToken.length; i++) {
			if (!currentItem) {
				isTargetExist = false;
				break;
			}
			currentItem = currentItem[pathToken[i]];
		}
		if (!isTargetExist || !currentItem) {
			return null;
		}
		return currentItem;
	};

	/**
  * Save value
  * @param {String} path target path
  * @param {String|Number|Boolean|Object|Array} value value to save
  * @return {Persist}
  */


	Persist.prototype.set = function set(path, value) {
		// find path
		var globalState = _storageManager2["default"].getStateByKey(this.key);

		if (path.length === 0) {
			_storageManager2["default"].setStateByKey(this.key, value);
		} else {
			_storageManager2["default"].setStateByKey(this.key, setRec(globalState, path.split("."), value));
		}

		return this;
	};

	/**
  * @static
  * Return whether you need "Persist" module by checking the bfCache support of the current browser
  * @return {Boolean}
  */


	Persist.isNeeded = function isNeeded() {
		return _utils.isNeeded;
	};

	return Persist;
}();

Persist.StorageManager = _storageManager2["default"];

exports["default"] = Persist;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _utils2 = _interopRequireDefault(_utils);

var _consts = __webpack_require__(5);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSupportState = "replaceState" in _browser.history && "state" in _browser.history;

function isStorageAvailable(storage) {
	if (!storage) {
		return undefined;
	}
	var TMP_KEY = "__tmp__" + _consts2["default"];

	try {
		// In case of iOS safari private mode, calling setItem on storage throws error
		storage.setItem(TMP_KEY, _consts2["default"]);

		// In Chrome incognito mode, can not get saved value
		// In IE8, calling storage.getItem occasionally makes "Permission denied" error
		return storage.getItem(TMP_KEY) === _consts2["default"];
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
	return storage ? _browser.location.href + _consts2["default"] : undefined;
}

function getStorage() {
	return storage;
}

/*
 * Get state value
 */
function getState() {
	var state = void 0;
	var PERSIST_KEY = _browser.location.href + _consts2["default"];
	var stateStr = void 0;

	if (storage) {
		stateStr = storage.getItem(PERSIST_KEY);
	} else if (_browser.history.state) {
		if (_typeof(_browser.history.state) !== "object") {
			stateStr = _browser.history.state[PERSIST_KEY];
		} else {
			warnInvalidStorageValue();
		}
	}

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
	var PERSIST_KEY = _browser.location.href + _consts2["default"];

	if (storage) {
		if (state) {
			storage.setItem(PERSIST_KEY, _browser.JSON.stringify(state));
		} else {
			storage.removeItem(PERSIST_KEY);
		}
	} else {
		try {
			var historyState = _browser.history.state;

			if ((typeof historyState === "undefined" ? "undefined" : _typeof(historyState)) === "object") {
				historyState[PERSIST_KEY] = _browser.JSON.stringify(state);
				_browser.history.replaceState(historyState, document.title, _browser.location.href);
			} else {
				/* eslint-disable no-console */
				console.warn("To use a history object, it must be an object that is not a primitive type.");
				/* eslint-enable no-console */
			}
		} catch (e) {
			/* eslint-disable no-console */
			console.warn(e.message);
			/* eslint-enable no-console */
		}
	}

	state ? _browser.window[_consts2["default"]] = true : delete _browser.window[_consts2["default"]];
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
!_utils2["default"].isBackForwardNavigated() && reset();

exports["default"] = {
	reset: reset,
	setStateByKey: setStateByKey,
	getStateByKey: getStateByKey,
	getStorageKey: getStorageKey,
	getStorage: getStorage
};
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var CONST_PERSIST = "___persist___";

exports["default"] = CONST_PERSIST;
module.exports = exports["default"];

/***/ })
/******/ ]);
});