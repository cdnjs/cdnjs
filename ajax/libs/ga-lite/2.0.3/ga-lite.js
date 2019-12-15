(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["galite"] = factory();
	else
		root["galite"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Array.from = Array.from || function () {
  var _Array$prototype$slic;

  return (_Array$prototype$slic = Array.prototype.slice).call.apply(_Array$prototype$slic, arguments);
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/do-not-track-enabled.js
function doNotTrackEnabled() {
  var dntNumber = parseInt(navigator.msDoNotTrack || // Internet Explorer 9 and 10 vendor prefix
  window.doNotTrack || // IE 11 uses window.doNotTrack
  navigator.doNotTrack, // W3C
  10);
  return dntNumber === 1;
}
// CONCATENATED MODULE: ./src/tracker-store.js
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
// CONCATENATED MODULE: ./src/send-to.js
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
// CONCATENATED MODULE: ./src/get-user-id.js
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
// CONCATENATED MODULE: ./src/get-optional-url-param.js
function getOptionalStr(key) {
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!key || values.indexOf(undefined) > -1) return '';
  return '&' + key + '=' + values.map(encodeURIComponent).join('');
}
// CONCATENATED MODULE: ./src/get-base-url.js

function getBaseUrl(trackingId, userId) {
  return 'https://www.google-analytics.com/collect' + '?v=1' + '&ul=en-us' + '&de=UTF-8' + getOptionalStr('dl', [document.location.href]) + getOptionalStr('dt', [document.title]) + getOptionalStr('sd', [window.screen.colorDepth, '-bit']) + getOptionalStr('sr', [window.screen.availHeight, 'x', window.screen.availWidth]) + getOptionalStr('vp', [window.innerWidth, 'x', window.innerHeight]) + getOptionalStr('dr', [document.referrer]);
}
// CONCATENATED MODULE: ./src/object-to-query-string.js
function objectToQueryString() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(object).map(function (key) {
    return [key, object[key]].map(booleansToNumbers).map(encodeURIComponent).join('=');
  }).join('&');
}

function booleansToNumbers(value) {
  return typeof value === 'boolean' ? +value : value;
}
// CONCATENATED MODULE: ./src/fields-to-params.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function fieldsToParams(fieldsObject) {
  return Object.keys(fieldsObject).filter(function (fieldName) {
    return Object.prototype.hasOwnProperty.call(FIELDS_TO_PARAMS_MAP, fieldName);
  }).filter(function (fieldName) {
    return fieldsObject[fieldName];
  }).reduce(function (obj, fieldName) {
    return _objectSpread({}, obj, _defineProperty({}, FIELDS_TO_PARAMS_MAP[fieldName], fieldsObject[fieldName]));
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
// CONCATENATED MODULE: ./src/build-event-url.js



function buildEventUrl(trackingId, timestamp, userId) {
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var anonymizeIp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var paramsQueryString = objectToQueryString(fieldsToParams(params));
  return getBaseUrl() + (paramsQueryString ? '&' + paramsQueryString : '') + (anonymizeIp ? '&aip=1' : '') + '&cid=' + userId + '&tid=' + trackingId + '&z=' + timestamp;
}
// CONCATENATED MODULE: ./src/tracker.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function tracker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tracker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tracker_ownKeys(source, true).forEach(function (key) { tracker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tracker_ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tracker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var DEFAULT_TRACKER_NAME = 't0';

var tracker_Tracker =
/*#__PURE__*/
function () {
  function Tracker(trackingId) {
    _classCallCheck(this, Tracker);

    this.fields = {
      trackingId: trackingId
    };
    this.userId = getUserId();
    this._sendTo = sendTo;
    this._getTime = getTime;
  }

  _createClass(Tracker, [{
    key: "send",
    value: function send(hitType) {
      for (var _len = arguments.length, fieldsObject = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fieldsObject[_key - 1] = arguments[_key];
      }

      var params = tracker_objectSpread({
        hitType: hitType
      }, argumentsToFields(hitType, fieldsObject), {}, this.fields);

      var url = buildEventUrl(this.fields.trackingId, this._getTime(), this.userId, params);

      this._sendTo(url);
    }
  }, {
    key: "get",
    value: function get(fieldName) {
      return this.fields[fieldName];
    }
  }, {
    key: "set",
    value: function set(fieldName, fieldValue) {
      // TODO: Check behaviour of examples in https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference#set
      this.fields[fieldName] = fieldValue;
    }
  }]);

  return Tracker;
}();



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
        {
          var _args = _slicedToArray(args, 1),
              page = _args[0];

          return {
            page: page
          };
        }

      case 'event':
        {
          var _args2 = _slicedToArray(args, 4),
              eventCategory = _args2[0],
              eventAction = _args2[1],
              eventLabel = _args2[2],
              eventValue = _args2[3];

          return {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            eventValue: eventValue
          };
        }

      case 'social':
        {
          var _args3 = _slicedToArray(args, 3),
              socialNetwork = _args3[0],
              socialAction = _args3[1],
              socialTarget = _args3[2];

          return {
            socialNetwork: socialNetwork,
            socialAction: socialAction,
            socialTarget: socialTarget
          };
        }

      case 'timing':
        {
          var _args4 = _slicedToArray(args, 4),
              timingCategory = _args4[0],
              timingVar = _args4[1],
              timingValue = _args4[2],
              timingLabel = _args4[3];

          return {
            timingCategory: timingCategory,
            timingVar: timingVar,
            timingValue: timingValue,
            timingLabel: timingLabel
          };
        }

      default:
        return {};
    }
  }
}
// CONCATENATED MODULE: ./src/commands/create.js


function create(trackingId, cookieDomain) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_TRACKER_NAME;
  var fieldsObject = arguments.length > 3 ? arguments[3] : undefined;
  var tracker = new tracker_Tracker(trackingId);
  addTracker(name, tracker);
  return tracker;
}
// CONCATENATED MODULE: ./src/commands/get-by-name.js

function getByName(name) {
  return getTracker(name);
}
// CONCATENATED MODULE: ./src/ga-lite-commands.js


var galiteCommands = {
  create: create,
  getByName: getByName
};
/* harmony default export */ var ga_lite_commands = (galiteCommands);
// CONCATENATED MODULE: ./src/get-tasks-in-command-queue.js
function getTasksInCommandQueue() {
  if (typeof window === 'undefined') {
    return [];
  }

  return window.galite && window.galite.q || [];
}
// EXTERNAL MODULE: ./src/simple-polyfill-array-from.js
var simple_polyfill_array_from = __webpack_require__(0);

// CONCATENATED MODULE: ./src/ga-lite.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return galite; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ga_lite_slicedToArray(arr, i) { return ga_lite_arrayWithHoles(arr) || ga_lite_iterableToArrayLimit(arr, i) || ga_lite_nonIterableRest(); }

function ga_lite_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function ga_lite_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ga_lite_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function galite(command) {
  // Check for doNotTrack variable. If it's present, the user has decided to
  // opt-out of the tracking, so we kill this tracking script
  if (doNotTrackEnabled()) {
    return;
  }

  var _splitTrackerCommand = splitTrackerCommand(command),
      _splitTrackerCommand2 = ga_lite_slicedToArray(_splitTrackerCommand, 2),
      trackerName = _splitTrackerCommand2[0],
      trackerCommand = _splitTrackerCommand2[1];

  var commandFoundInGlobalCommands = !!ga_lite_commands[command];
  var commandFoundInTrackerMethods = !!tracker_Tracker.prototype[trackerCommand] && trackerCommand !== 'constructor';

  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  if (commandFoundInGlobalCommands) {
    ga_lite_commands[command].apply(ga_lite_commands, values);
  } else if (commandFoundInTrackerMethods) {
    var tracker = getTracker(trackerName);
    tracker[trackerCommand].apply(tracker, values);
  } else if (typeof command === 'function') {
    var _tracker = getTracker(trackerName);

    command(_tracker);
  } else {
    throw new Error("Command ".concat(command, " is not available in ga-lite"));
  }
}

function splitTrackerCommand(command) {
  if (typeof command === 'string' && command.indexOf('.') > -1) {
    return command.split('.');
  } else {
    return [DEFAULT_TRACKER_NAME, command];
  }
}

Object.keys(ga_lite_commands).forEach(function (key) {
  galite[key] = ga_lite_commands[key];
});
getTasksInCommandQueue().forEach(function (args) {
  return galite.apply(void 0, _toConsumableArray(args));
});

/***/ })
/******/ ])["default"];
});