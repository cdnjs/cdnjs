/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/agent project is licensed under the MIT license
 * 
 * @egjs/agent JavaScript library
 * 
 * 
 * @version 2.1.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["agent"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["agent"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _agent = __webpack_require__(1);

var _agent2 = _interopRequireDefault(_agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _agent2["default"]; /**
                                      * Copyright (c) NAVER Corp.
                                      * egjs-agent projects are licensed under the MIT license
                                      */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(2);

var _Parser = __webpack_require__(4);

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @namespace eg
 */

/**
 * Extracts browser and operating system information from the user agent string.
 * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
 * @function eg#agent
 * @param {String} [userAgent=navigator.userAgent] user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
 * @return {Object} agentInfo
 * @return {Object} agentInfo.os os Operating system information <ko>운영체제 정보</ko>
 * @return {String} agentInfo.os.name Operating system name (android, ios, window, mac, unknown) <ko>운영체제 이름 (android, ios, window, mac, unknown)</ko>
 * @return {String} agentInfo.os.version Operating system version <ko>운영체제 버전</ko>
 * @return {String} agentInfo.browser Browser information <ko>브라우저 정보</ko>
 * @return {String} agentInfo.browser.name Browser name (safari, chrome, sbrowser, ie, firefox, unknown) <ko>브라우저 이름 (safari, chrome, sbrowser, ie, firefox, unknown)</ko>
 * @return {String} agentInfo.browser.version Browser version <ko>브라우저 버전 </ko>
 * @return {Boolean} agentInfo.browser.webview Indicates whether the browser is inapp<ko>웹뷰 브라우저 여부</ko>
 * @return {Boolean} agentInfo.isMobile Indicates whether the browser is for mobile<ko>모바일 브라우저 여부</ko>
 */
/**
 * Copyright (c) NAVER Corp.
 * egjs-agent projects are licensed under the MIT license
 */
function agent() {
  var ua = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _browser.navigator.userAgent;

  _Parser2["default"].setUa(ua);

  var agentInfo = {
    os: _Parser2["default"].getOs(),
    browser: _Parser2["default"].getBrowser(),
    isMobile: _Parser2["default"].getIsMobile()
  };

  agentInfo.browser.name = agentInfo.browser.name.toLowerCase();
  agentInfo.os.name = agentInfo.os.name.toLowerCase();
  agentInfo.os.version = agentInfo.os.version.toLowerCase();

  if (agentInfo.os.name === "ios" && agentInfo.browser.webview) {
    agentInfo.browser.version = "-1";
  }

  return agentInfo;
}
agent.VERSION = "2.1.3";
exports["default"] = agent;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _Array = __webpack_require__(3);

var _Array2 = _interopRequireDefault(_Array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var win = typeof window !== "undefined" && window || {};

exports["default"] = {
	RegExp: win.RegExp,
	navigator: win.navigator,
	Array: _Array2["default"]
};
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var Array = window.Array;

/* eshint ignore: start */

// Below is polyfill for
// Array.prototype.filter, Array.prototype.forEach, Array.prototype.some
if (!Array.prototype.filter) Array.prototype.filter = function (func, thisArg) {
	if (!((typeof func === 'Function' || typeof func === 'function') && this)) throw new TypeError();

	var len = this.length >>> 0,
	    res = new Array(len),
	    // preallocate array
	t = this,
	    c = 0,
	    i = -1;
	if (thisArg === undefined) while (++i !== len) {
		// checks to see if the key was set
		if (i in this) if (func(t[i], i, t)) res[c++] = t[i];else while (++i !== len) {
			// checks to see if the key was set
			if (i in this) if (func.call(thisArg, t[i], i, t)) res[c++] = t[i];
		}
	}res.length = c; // shrink down array to proper size
	return res;
};

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

	Array.prototype.forEach = function (callback /*, thisArg*/) {

		var T, k;

		if (this == null) {
			throw new TypeError('this is null or not defined');
		}

		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument "length".
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If isCallable(callback) is false, throw a TypeError exception. 
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if (arguments.length > 1) {
			T = arguments[1];
		}

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat while k < len.
		while (k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//    This is implicit for LHS operands of the in operator.
			// b. Let kPresent be the result of calling the HasProperty
			//    internal method of O with argument Pk.
			//    This step can be combined with c.
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal
				// method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as
				// the this value and argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined.
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
	Array.prototype.some = function (fun /*, thisArg*/) {
		'use strict';

		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}

		if (typeof fun !== 'function') {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}

		return false;
	};
}

/* eshint ignore: end */

exports['default'] = Array;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _parseRules = __webpack_require__(5);

var _parseRules2 = _interopRequireDefault(_parseRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UA = void 0;

function setUa(ua) {
	UA = ua;
}

function isMatched(base, target) {
	return target && target.test ? !!target.test(base) : base.indexOf(target) > -1;
}

function getIdentityStringFromArray(rules, defaultStrings) {
	var matchedRule = rules.filter(function (rule) {
		return isMatched(UA, rule.criteria);
	})[0];

	return matchedRule && matchedRule.identity || defaultStrings.name;
}

function getRule(rules, targetIdentity) {
	return rules.filter(function (rule) {
		var criteria = rule.criteria;
		var identityMatched = new RegExp(rule.identity, "i").test(targetIdentity);

		if (criteria ? identityMatched && isMatched(UA, criteria) : identityMatched) {
			return true;
		} else {
			return false;
		}
	})[0];
}

function getBrowserName() {
	return getIdentityStringFromArray(_parseRules2["default"].browser, _parseRules2["default"].defaultString.browser);
}

function getBrowserRule(browserName) {
	var rule = getRule(_parseRules2["default"].browser, browserName);

	if (!rule) {
		rule = {
			criteria: browserName,
			versionSearch: browserName,
			identity: browserName
		};
	}

	return rule;
}

function extractBrowserVersion(versionToken, ua) {
	var browserVersion = _parseRules2["default"].defaultString.browser.version;
	var versionRegexResult = new RegExp("(" + versionToken + ")", "i").exec(ua);

	if (!versionRegexResult) {
		return browserVersion;
	}

	var versionTokenIndex = versionRegexResult.index;
	var verTkn = versionRegexResult[0];

	if (versionTokenIndex > -1) {
		var versionIndex = versionTokenIndex + verTkn.length + 1;

		browserVersion = ua.substring(versionIndex).split(" ")[0].replace(/_/g, ".").replace(/;|\)/g, "");
	}
	return browserVersion;
}

function getBrowserVersion(browserName) {
	if (!browserName) {
		return undefined;
	}

	// console.log(browserRule);
	// const versionToken = browserRule ? browserRule.versionSearch : browserName;
	var browserRule = getBrowserRule(browserName);
	var versionToken = browserRule.versionSearch || browserName;
	var browserVersion = extractBrowserVersion(versionToken, UA);

	return browserVersion;
}

function isWebview() {
	var webviewRules = _parseRules2["default"].webview;
	var browserVersion = void 0;

	return webviewRules.filter(function (rule) {
		return isMatched(UA, rule.criteria);
	}).some(function (rule) {
		browserVersion = extractBrowserVersion(rule.browserVersionSearch, UA);
		if (isMatched(UA, rule.webviewToken) || isMatched(browserVersion, rule.webviewBrowserVersion)) {
			return true;
		} else {
			return false;
		}
	});
}

function getOSRule(osName) {
	return getRule(_parseRules2["default"].os, osName);
}

function getOsName() {
	return getIdentityStringFromArray(_parseRules2["default"].os, _parseRules2["default"].defaultString.os);
}

function getOsVersion(osName) {
	var osRule = getOSRule(osName) || {};
	var defaultOSVersion = _parseRules2["default"].defaultString.os.version;
	var osVersion = void 0;

	if (!osName) {
		return undefined;
	}
	if (osRule.versionAlias) {
		return osRule.versionAlias;
	}
	var osVersionToken = osRule.versionSearch || osName;
	var osVersionRegex = new RegExp("(" + osVersionToken + ")\\s([\\d_\\.]+|\\d_0)", "i");
	var osVersionRegexResult = osVersionRegex.exec(UA);

	if (osVersionRegexResult) {
		osVersion = osVersionRegex.exec(UA)[2].replace(/_/g, ".").replace(/;|\)/g, "");
	}
	return osVersion || defaultOSVersion;
}

function getOs() {
	var name = getOsName();
	var version = getOsVersion(name);

	return { name: name, version: version };
}

function getBrowser() {
	var name = getBrowserName();
	var version = getBrowserVersion(name);

	return { name: name, version: version, webview: isWebview() };
}

function getIsMobile() {
	return UA.indexOf("Mobi") !== -1;
}

exports["default"] = {
	getOs: getOs,
	getBrowser: getBrowser,
	getIsMobile: getIsMobile,
	setUa: setUa
};
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var parseRules = {
	browser: [{
		criteria: "PhantomJS",
		identity: "PhantomJS"
	}, {
		criteria: /Whale/,
		identity: "Whale",
		versionSearch: "Whale"
	}, {
		criteria: /Edge/,
		identity: "Edge",
		versionSearch: "Edge"
	}, {
		criteria: /MSIE|Trident|Windows Phone/,
		identity: "IE",
		versionSearch: "IEMobile|MSIE|rv"
	}, {
		criteria: /MiuiBrowser/,
		identity: "MIUI Browser",
		versionSearch: "MiuiBrowser"
	}, {
		criteria: /SamsungBrowser/,
		identity: "Samsung Internet",
		versionSearch: "SamsungBrowser"
	}, {
		criteria: /SAMSUNG /,
		identity: "Samsung Internet",
		versionSearch: "Version"
	}, {
		criteria: /Chrome|CriOS/,
		identity: "Chrome"
	}, {
		criteria: /Android/,
		identity: "Android Browser",
		versionSearch: "Version"
	}, {
		criteria: /iPhone|iPad/,
		identity: "Safari",
		versionSearch: "Version"
	}, {
		criteria: "Apple",
		identity: "Safari",
		versionSearch: "Version"
	}, {
		criteria: "Firefox",
		identity: "Firefox"
	}],
	os: [{
		criteria: /Windows Phone/,
		identity: "Windows Phone",
		versionSearch: "Windows Phone"
	}, {
		criteria: "Windows 2000",
		identity: "Window",
		versionAlias: "5.0"
	}, {
		criteria: /Windows NT/,
		identity: "Window",
		versionSearch: "Windows NT"
	}, {
		criteria: /iPhone|iPad/,
		identity: "iOS",
		versionSearch: "iPhone OS|CPU OS"
	}, {
		criteria: "Mac",
		versionSearch: "OS X",
		identity: "MAC"
	}, {
		criteria: /Android/,
		identity: "Android"
	}, {
		criteria: /Tizen/,
		identity: "Tizen"
	}, {
		criteria: /Web0S/,
		identity: "WebOS"
	}],

	// Webview check condition
	// ios: If has no version information
	// Android 5.0 && chrome 40+: Presence of "; wv" in userAgent
	// Under android 5.0: Presence of "NAVER" or "Daum" in userAgent
	webview: [{
		criteria: /iPhone|iPad/,
		browserVersionSearch: "Version",
		webviewBrowserVersion: /-1/
	}, {
		criteria: /iPhone|iPad|Android/,
		webviewToken: /NAVER|DAUM|; wv/

	}],
	defaultString: {
		browser: {
			version: "-1",
			name: "unknown"
		},
		os: {
			version: "-1",
			name: "unknown"
		}
	}
};

exports["default"] = parseRules;
module.exports = exports["default"];

/***/ })
/******/ ]);
});