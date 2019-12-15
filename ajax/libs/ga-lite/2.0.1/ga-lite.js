(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["galite"] = factory();
	else
		root["galite"] = factory();
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addTracker;
/* harmony export (immutable) */ __webpack_exports__["b"] = getTracker;
/* unused harmony export removeTracker */
/* unused harmony export getAllTrackers */
/* unused harmony export clearStore */
var store = {};

function addTracker(trackerName, tracker) {
  store[trackerName] = tracker;
}

function getTracker(trackerName) {
  return store[trackerName];
}

function removeTracker(trackerName) {
  delete store[trackerName];
}

function getAllTrackers() {
  return Object.keys(store).map(function (key) {
    return store[key];
  });
}

function clearStore() {
  return Object.keys(store).forEach(removeTracker);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEFAULT_TRACKER_NAME; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__send_to__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_user_id__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__build_event_url__ = __webpack_require__(8);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var DEFAULT_TRACKER_NAME = 't0';

var Tracker = function () {
  function Tracker(trackingId) {
    _classCallCheck(this, Tracker);

    this.fields = {
      trackingId: trackingId
    };
    this.userId = Object(__WEBPACK_IMPORTED_MODULE_1__get_user_id__["a" /* default */])();
    this._sendTo = __WEBPACK_IMPORTED_MODULE_0__send_to__["a" /* default */];
    this._getTime = getTime;
  }

  _createClass(Tracker, [{
    key: 'send',
    value: function send(hitType) {
      for (var _len = arguments.length, fieldsObject = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fieldsObject[_key - 1] = arguments[_key];
      }

      var params = _extends({
        hitType: hitType
      }, argumentsToFields(hitType, fieldsObject), this.fields);
      var url = Object(__WEBPACK_IMPORTED_MODULE_2__build_event_url__["a" /* default */])(this.fields.trackingId, this._getTime(), this.userId, params);
      this._sendTo(url);
    }
  }, {
    key: 'get',
    value: function get(fieldName) {
      return this.fields[fieldName];
    }
  }, {
    key: 'set',
    value: function set(fieldName, fieldValue) {
      // TODO: Check behaviour of examples in https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference#set
      this.fields[fieldName] = fieldValue;
    }
  }]);

  return Tracker;
}();

/* harmony default export */ __webpack_exports__["b"] = (Tracker);


function getTime() {
  return new Date().getTime();
}

function argumentsToFields(hitType) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (args.length === 1 && args[0].constructor === Object) {
    return args[0];
  } else {
    switch (hitType) {
      case 'pageview':
        var _args = _slicedToArray(args, 1),
            page = _args[0];

        return { page: page };
      case 'event':
        var _args2 = _slicedToArray(args, 4),
            eventCategory = _args2[0],
            eventAction = _args2[1],
            eventLabel = _args2[2],
            eventValue = _args2[3];

        return { eventCategory: eventCategory, eventAction: eventAction, eventLabel: eventLabel, eventValue: eventValue };
      case 'social':
        var _args3 = _slicedToArray(args, 3),
            socialNetwork = _args3[0],
            socialAction = _args3[1],
            socialTarget = _args3[2];

        return { socialNetwork: socialNetwork, socialAction: socialAction, socialTarget: socialTarget };
      case 'timing':
        var _args4 = _slicedToArray(args, 4),
            timingCategory = _args4[0],
            timingVar = _args4[1],
            timingValue = _args4[2],
            timingLabel = _args4[3];

        return { timingCategory: timingCategory, timingVar: timingVar, timingValue: timingValue, timingLabel: timingLabel };
      default:
        return {};
    }
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = galite;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__do_not_track_enabled__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracker_store__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tracker__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__get_tasks_in_command_queue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__simple_polyfill_array_from__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__simple_polyfill_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__simple_polyfill_array_from__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }








function galite(command) {
  // Check for doNotTrack variable. If it's present, the user has decided to
  // opt-out of the tracking, so we kill this tracking script
  if (Object(__WEBPACK_IMPORTED_MODULE_0__do_not_track_enabled__["a" /* default */])()) {
    return;
  }

  var _splitTrackerCommand = splitTrackerCommand(command),
      _splitTrackerCommand2 = _slicedToArray(_splitTrackerCommand, 2),
      trackerName = _splitTrackerCommand2[0],
      trackerCommand = _splitTrackerCommand2[1];

  var commandFoundInGlobalCommands = !!__WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__["a" /* default */][command];
  var commandFoundInTrackerMethods = !!__WEBPACK_IMPORTED_MODULE_3__tracker__["b" /* default */].prototype[trackerCommand] && trackerCommand !== 'constructor';

  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (commandFoundInGlobalCommands) {
    __WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__["a" /* default */][command].apply(__WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__["a" /* default */], values);
  } else if (commandFoundInTrackerMethods) {
    var tracker = Object(__WEBPACK_IMPORTED_MODULE_2__tracker_store__["b" /* getTracker */])(trackerName);
    tracker[trackerCommand].apply(tracker, values);
  } else if (typeof command === 'function') {
    var _tracker = Object(__WEBPACK_IMPORTED_MODULE_2__tracker_store__["b" /* getTracker */])(trackerName);
    command(_tracker);
  } else {
    throw new Error('Command ' + command + ' is not available in ga-lite');
  }
}

function splitTrackerCommand(command) {
  if (typeof command === 'string' && command.indexOf('.') > -1) {
    return command.split('.');
  } else {
    return [__WEBPACK_IMPORTED_MODULE_3__tracker__["a" /* DEFAULT_TRACKER_NAME */], command];
  }
}

Object.keys(__WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__["a" /* default */]).forEach(function (key) {
  galite[key] = __WEBPACK_IMPORTED_MODULE_1__ga_lite_commands__["a" /* default */][key];
});

Object(__WEBPACK_IMPORTED_MODULE_4__get_tasks_in_command_queue__["a" /* default */])().forEach(function (args) {
  return galite.apply(undefined, _toConsumableArray(args));
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = doNotTrackEnabled;
function doNotTrackEnabled() {
  var dntNumber = parseInt(navigator.msDoNotTrack || // Internet Explorer 9 and 10 vendor prefix
  window.doNotTrack || // IE 11 uses window.doNotTrack
  navigator.doNotTrack, // W3C
  10);

  return dntNumber === 1;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__commands_create__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__commands_get_by_name__ = __webpack_require__(13);



var galiteCommands = {
  create: __WEBPACK_IMPORTED_MODULE_0__commands_create__["a" /* default */],
  getByName: __WEBPACK_IMPORTED_MODULE_1__commands_get_by_name__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (galiteCommands);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracker_store__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracker__ = __webpack_require__(1);



function create(trackingId, cookieDomain) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_1__tracker__["a" /* DEFAULT_TRACKER_NAME */];
  var fieldsObject = arguments[3];

  var tracker = new __WEBPACK_IMPORTED_MODULE_1__tracker__["b" /* default */](trackingId);
  Object(__WEBPACK_IMPORTED_MODULE_0__tracker_store__["a" /* addTracker */])(name, tracker);
  return tracker;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sendTo;
function sendTo(url) {
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    var didSucceed = navigator.sendBeacon(url);
    if (didSucceed) {
      return;
    }
  }

  try {
    var req = new window.XMLHttpRequest();
    req.open('GET', url, false);
    req.send();
  } catch (e) {
    // IE9 throws an error with cross-site XMLHttpRequest so
    // we fall back to simple image request
    var i = new window.Image();
    i.src = url;
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserId;
var USER_ID_KEY = 'uid';

function getUserId() {
  var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window ? window.localStorage : null;

  if (storage && storage.getItem(USER_ID_KEY)) {
    return storage.getItem(USER_ID_KEY);
  }

  var userId = Math.random() + '.' + Math.random();
  if (storage) {
    storage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = buildEventUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_base_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__object_to_query_string__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fields_to_params__ = __webpack_require__(12);




function buildEventUrl(trackingId, timestamp, userId) {
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var anonymizeIp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var paramsQueryString = Object(__WEBPACK_IMPORTED_MODULE_1__object_to_query_string__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_2__fields_to_params__["a" /* default */])(params));
  return Object(__WEBPACK_IMPORTED_MODULE_0__get_base_url__["a" /* default */])() + (paramsQueryString ? '&' + paramsQueryString : '') + (anonymizeIp ? '&aip=1' : '') + '&cid=' + userId + '&tid=' + trackingId + '&z=' + timestamp;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getBaseUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__ = __webpack_require__(10);


function getBaseUrl(trackingId, userId) {
  return 'https://www.google-analytics.com/collect' + '?v=1' + '&ul=en-us' + '&de=UTF-8' + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('dl', [document.location.href]) + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('dt', [document.title]) + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('sd', [window.screen.colorDepth, '-bit']) + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('sr', [window.screen.availHeight, 'x', window.screen.availWidth]) + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('vp', [window.innerWidth, 'x', window.innerHeight]) + Object(__WEBPACK_IMPORTED_MODULE_0__get_optional_url_param__["a" /* default */])('dr', [document.referrer]);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getOptionalStr;
function getOptionalStr(key) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!key || values.indexOf(undefined) > -1) return '';

  return '&' + key + '=' + values.map(encodeURIComponent).join('');
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = objectToQueryString;
function objectToQueryString() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(object).map(function (key) {
    return [key, object[key]].map(booleansToNumbers).map(encodeURIComponent).join('=');
  }).join('&');
}

function booleansToNumbers(value) {
  return typeof value === 'boolean' ? +value : value;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fieldsToParams;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fieldsToParams(fieldsObject) {
  return Object.keys(fieldsObject).filter(function (fieldName) {
    return FIELDS_TO_PARAMS_MAP.hasOwnProperty(fieldName);
  }).filter(function (fieldName) {
    return fieldsObject[fieldName];
  }).reduce(function (obj, fieldName) {
    return _extends({}, obj, _defineProperty({}, FIELDS_TO_PARAMS_MAP[fieldName], fieldsObject[fieldName]));
  }, {});
}

var FIELDS_TO_PARAMS_MAP = {
  anonymizeIp: 'aip',
  dataSource: 'ds',
  queueTime: 'qt',
  userId: 'uid',
  sessionControl: 'sc',
  referrer: 'dr',
  campaignName: 'cn',
  campaignSource: 'cs',
  campaignMedium: 'cm',
  campaignKeyword: 'ck',
  campaignContent: 'cc',
  campaignId: 'ci',
  screenResolution: 'sr',
  viewportSize: 'vp',
  encoding: 'de',
  screenColors: 'sd',
  language: 'ul',
  javaEnabled: 'je',
  flashVersion: 'fl',
  hitType: 't',
  nonInteraction: 'ni',
  location: 'dl',
  hostname: 'dh',
  page: 'dp',
  title: 'dt',
  screenName: 'cd',
  linkid: 'linkid',
  appName: 'an',
  appId: 'aid',
  appVersion: 'av',
  appInstallerId: 'aiid',
  eventCategory: 'ec',
  eventAction: 'ea',
  eventLabel: 'el',
  eventValue: 'ev',
  currencyCode: 'cu',
  socialNetwork: 'sn',
  socialAction: 'sa',
  socialTarget: 'st',
  timingCategory: 'utc',
  timingVar: 'utv',
  timingValue: 'utt',
  timingLabel: 'utl',
  exDescription: 'exd',
  exFatal: 'exf',
  expId: 'xid',
  expVar: 'xvar'
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getByName;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracker_store__ = __webpack_require__(0);


function getByName(name) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__tracker_store__["b" /* getTracker */])(name);
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTasksInCommandQueue;
function getTasksInCommandQueue() {
  if (typeof window === 'undefined') {
    return [];
  }

  return window.galite && window.galite.q || [];
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

Array.from = Array.from || function () {
  var _Array$prototype$slic;

  return (_Array$prototype$slic = Array.prototype.slice).call.apply(_Array$prototype$slic, arguments);
};

/***/ })
/******/ ])["default"];
});