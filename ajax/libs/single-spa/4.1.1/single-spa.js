(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("singleSpa", [], factory);
	else if(typeof exports === 'object')
		exports["singleSpa"] = factory();
	else
		root["singleSpa"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/custom-event/index.js":
/*!********************************************!*\
  !*** ./node_modules/custom-event/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/applications/app-errors.js":
/*!****************************************!*\
  !*** ./src/applications/app-errors.js ***!
  \****************************************/
/*! exports provided: handleAppError, addErrorHandler, removeErrorHandler, transformErr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAppError", function() { return handleAppError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addErrorHandler", function() { return addErrorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeErrorHandler", function() { return removeErrorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformErr", function() { return transformErr; });
var errorHandlers = [];
function handleAppError(err, app) {
  var transformedErr = transformErr(err, app);

  if (errorHandlers.length) {
    errorHandlers.forEach(function (handler) {
      return handler(transformedErr);
    });
  } else {
    setTimeout(function () {
      throw transformedErr;
    });
  }
}
function addErrorHandler(handler) {
  if (typeof handler !== 'function') {
    throw new Error('a single-spa error handler must be a function');
  }

  errorHandlers.push(handler);
}
function removeErrorHandler(handler) {
  if (typeof handler !== 'function') {
    throw new Error('a single-spa error handler must be a function');
  }

  var removedSomething = false;
  errorHandlers = errorHandlers.filter(function (h) {
    var isHandler = h === handler;
    removedSomething = removedSomething || isHandler;
    return !isHandler;
  });
  return removedSomething;
}
function transformErr(ogErr, appOrParcel) {
  var objectType = appOrParcel.unmountThisParcel ? 'Parcel' : 'Application';
  var errPrefix = "".concat(objectType, " '").concat(appOrParcel.name, "' died in status ").concat(appOrParcel.status, ": ");
  var result;

  if (ogErr instanceof Error) {
    try {
      ogErr.message = errPrefix + ogErr.message;
    } catch (err) {
      /* Some errors have read-only message properties, in which case there is nothing
       * that we can do.
       */
    }

    result = ogErr;
  } else {
    console.warn("While ".concat(appOrParcel.status, ", '").concat(appOrParcel.name, "' rejected its lifecycle function promise with a non-Error. This will cause stack traces to not be accurate."));

    try {
      result = new Error(errPrefix + JSON.stringify(ogErr));
    } catch (err) {
      // If it's not an Error and you can't stringify it, then what else can you even do to it?
      result = ogErr;
    }
  }

  result.appName = appOrParcel.name;
  result.name = appOrParcel.name;
  return result;
}

/***/ }),

/***/ "./src/applications/app.helpers.js":
/*!*****************************************!*\
  !*** ./src/applications/app.helpers.js ***!
  \*****************************************/
/*! exports provided: NOT_LOADED, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED, BOOTSTRAPPING, NOT_MOUNTED, MOUNTING, MOUNTED, UPDATING, UNMOUNTING, UNLOADING, SKIP_BECAUSE_BROKEN, isActive, isntActive, isLoaded, isntLoaded, shouldBeActive, shouldntBeActive, notBootstrapped, notSkipped, toName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_LOADED", function() { return NOT_LOADED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOADING_SOURCE_CODE", function() { return LOADING_SOURCE_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_BOOTSTRAPPED", function() { return NOT_BOOTSTRAPPED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOOTSTRAPPING", function() { return BOOTSTRAPPING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOT_MOUNTED", function() { return NOT_MOUNTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTING", function() { return MOUNTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUNTED", function() { return MOUNTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATING", function() { return UPDATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNMOUNTING", function() { return UNMOUNTING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNLOADING", function() { return UNLOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SKIP_BECAUSE_BROKEN", function() { return SKIP_BECAUSE_BROKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isActive", function() { return isActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isntActive", function() { return isntActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoaded", function() { return isLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isntLoaded", function() { return isntLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldBeActive", function() { return shouldBeActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldntBeActive", function() { return shouldntBeActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notBootstrapped", function() { return notBootstrapped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notSkipped", function() { return notSkipped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toName", function() { return toName; });
/* harmony import */ var _app_errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-errors.js */ "./src/applications/app-errors.js");
 // App statuses

var NOT_LOADED = 'NOT_LOADED';
var LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';
var NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
var BOOTSTRAPPING = 'BOOTSTRAPPING';
var NOT_MOUNTED = 'NOT_MOUNTED';
var MOUNTING = 'MOUNTING';
var MOUNTED = 'MOUNTED';
var UPDATING = 'UPDATING';
var UNMOUNTING = 'UNMOUNTING';
var UNLOADING = 'UNLOADING';
var SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
function isActive(app) {
  return app.status === MOUNTED;
}
function isntActive(app) {
  return !isActive(app);
}
function isLoaded(app) {
  return app.status !== NOT_LOADED && app.status !== LOADING_SOURCE_CODE;
}
function isntLoaded(app) {
  return !isLoaded(app);
}
function shouldBeActive(app) {
  try {
    return app.activeWhen(window.location);
  } catch (err) {
    Object(_app_errors_js__WEBPACK_IMPORTED_MODULE_0__["handleAppError"])(err, app);
    app.status = SKIP_BECAUSE_BROKEN;
  }
}
function shouldntBeActive(app) {
  try {
    return !app.activeWhen(window.location);
  } catch (err) {
    Object(_app_errors_js__WEBPACK_IMPORTED_MODULE_0__["handleAppError"])(err, app);
    app.status = SKIP_BECAUSE_BROKEN;
  }
}
function notBootstrapped(app) {
  return app.status !== NOT_BOOTSTRAPPED;
}
function notSkipped(item) {
  return item !== SKIP_BECAUSE_BROKEN && (!item || item.status !== SKIP_BECAUSE_BROKEN);
}
function toName(app) {
  return app.name;
}

/***/ }),

/***/ "./src/applications/apps.js":
/*!**********************************!*\
  !*** ./src/applications/apps.js ***!
  \**********************************/
/*! exports provided: getMountedApps, getAppNames, getRawAppData, getAppStatus, declareChildApplication, registerApplication, checkActivityFunctions, getAppsToLoad, getAppsToUnmount, getAppsToMount, unloadChildApplication, unloadApplication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMountedApps", function() { return getMountedApps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppNames", function() { return getAppNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRawAppData", function() { return getRawAppData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppStatus", function() { return getAppStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "declareChildApplication", function() { return declareChildApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerApplication", function() { return registerApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkActivityFunctions", function() { return checkActivityFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppsToLoad", function() { return getAppsToLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppsToUnmount", function() { return getAppsToUnmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppsToMount", function() { return getAppsToMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unloadChildApplication", function() { return unloadChildApplication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unloadApplication", function() { return unloadApplication; });
/* harmony import */ var _jquery_support_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../jquery-support.js */ "./src/jquery-support.js");
/* harmony import */ var _app_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var src_navigation_reroute_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/navigation/reroute.js */ "./src/navigation/reroute.js");
/* harmony import */ var src_utils_find_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/utils/find.js */ "./src/utils/find.js");
/* harmony import */ var src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/lifecycles/unmount.js */ "./src/lifecycles/unmount.js");
/* harmony import */ var src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/lifecycles/unload.js */ "./src/lifecycles/unload.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var apps = [];
function getMountedApps() {
  return apps.filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["isActive"]).map(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["toName"]);
}
function getAppNames() {
  return apps.map(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["toName"]);
} // used in devtools, not (currently) exposed as a single-spa API

function getRawAppData() {
  return [].concat(apps);
}
function getAppStatus(appName) {
  var app = Object(src_utils_find_js__WEBPACK_IMPORTED_MODULE_3__["find"])(apps, function (app) {
    return app.name === appName;
  });
  return app ? app.status : null;
}
function declareChildApplication(appName, arg1, arg2) {
  console.warn('declareChildApplication is deprecated and will be removed in the next major version, use "registerApplication" instead');
  return registerApplication(appName, arg1, arg2);
}
function registerApplication(appName, applicationOrLoadingFn, activityFn) {
  var customProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (typeof appName !== 'string' || appName.length === 0) throw new Error("The first argument must be a non-empty string 'appName'");
  if (getAppNames().indexOf(appName) !== -1) throw new Error("There is already an app declared with name ".concat(appName));
  if (_typeof(customProps) !== 'object' || Array.isArray(customProps)) throw new Error('customProps must be an object');
  if (!applicationOrLoadingFn) throw new Error("The application or loading function is required");
  var loadImpl;

  if (typeof applicationOrLoadingFn !== 'function') {
    // applicationOrLoadingFn is an application
    loadImpl = function loadImpl() {
      return Promise.resolve(applicationOrLoadingFn);
    };
  } else {
    // applicationOrLoadingFn is a loadingFn
    loadImpl = applicationOrLoadingFn;
  }

  if (typeof activityFn !== 'function') throw new Error("The activeWhen argument must be a function");
  apps.push({
    name: appName,
    loadImpl: loadImpl,
    activeWhen: activityFn,
    status: _app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["NOT_LOADED"],
    parcels: {},
    devtools: {
      overlays: {
        options: {},
        selectors: []
      }
    },
    customProps: customProps
  });
  Object(_jquery_support_js__WEBPACK_IMPORTED_MODULE_0__["ensureJQuerySupport"])();
  Object(src_navigation_reroute_js__WEBPACK_IMPORTED_MODULE_2__["reroute"])();
}
function checkActivityFunctions(location) {
  var activeApps = [];

  for (var i = 0; i < apps.length; i++) {
    if (apps[i].activeWhen(location)) {
      activeApps.push(apps[i].name);
    }
  }

  return activeApps;
}
function getAppsToLoad() {
  return apps.filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["notSkipped"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["isntLoaded"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["shouldBeActive"]);
}
function getAppsToUnmount() {
  return apps.filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["notSkipped"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["isActive"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["shouldntBeActive"]);
}
function getAppsToMount() {
  return apps.filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["notSkipped"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["isntActive"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["isLoaded"]).filter(_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["shouldBeActive"]);
}
function unloadChildApplication(appName, opts) {
  console.warn('unloadChildApplication is deprecated and will be removed in the next major version, use "unloadApplication" instead');
  return unloadApplication(appName, opts);
}
function unloadApplication(appName) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    waitForUnmount: false
  };

  if (typeof appName !== 'string') {
    throw new Error("unloadApplication requires a string 'appName'");
  }

  var app = Object(src_utils_find_js__WEBPACK_IMPORTED_MODULE_3__["find"])(apps, function (App) {
    return App.name === appName;
  });

  if (!app) {
    throw new Error("Could not unload application '".concat(appName, "' because no such application has been declared"));
  }

  var appUnloadInfo = Object(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_5__["getAppUnloadInfo"])(app.name);

  if (opts && opts.waitForUnmount) {
    // We need to wait for unmount before unloading the app
    if (appUnloadInfo) {
      // Someone else is already waiting for this, too
      return appUnloadInfo.promise;
    } else {
      // We're the first ones wanting the app to be resolved.
      var promise = new Promise(function (resolve, reject) {
        Object(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_5__["addAppToUnload"])(app, function () {
          return promise;
        }, resolve, reject);
      });
      return promise;
    }
  } else {
    /* We should unmount the app, unload it, and remount it immediately.
     */
    var resultPromise;

    if (appUnloadInfo) {
      // Someone else is already waiting for this app to unload
      resultPromise = appUnloadInfo.promise;
      immediatelyUnloadApp(app, appUnloadInfo.resolve, appUnloadInfo.reject);
    } else {
      // We're the first ones wanting the app to be resolved.
      resultPromise = new Promise(function (resolve, reject) {
        Object(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_5__["addAppToUnload"])(app, function () {
          return resultPromise;
        }, resolve, reject);
        immediatelyUnloadApp(app, resolve, reject);
      });
    }

    return resultPromise;
  }
}

function immediatelyUnloadApp(app, resolve, reject) {
  Object(src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_4__["toUnmountPromise"])(app).then(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_5__["toUnloadPromise"]).then(function () {
    resolve();
    setTimeout(function () {
      // reroute, but the unload promise is done
      Object(src_navigation_reroute_js__WEBPACK_IMPORTED_MODULE_2__["reroute"])();
    });
  }).catch(reject);
}

/***/ }),

/***/ "./src/applications/timeouts.js":
/*!**************************************!*\
  !*** ./src/applications/timeouts.js ***!
  \**************************************/
/*! exports provided: setBootstrapMaxTime, setMountMaxTime, setUnmountMaxTime, setUnloadMaxTime, reasonableTime, ensureValidAppTimeouts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBootstrapMaxTime", function() { return setBootstrapMaxTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMountMaxTime", function() { return setMountMaxTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUnmountMaxTime", function() { return setUnmountMaxTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUnloadMaxTime", function() { return setUnloadMaxTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reasonableTime", function() { return reasonableTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureValidAppTimeouts", function() { return ensureValidAppTimeouts; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var globalTimeoutConfig = {
  bootstrap: {
    millis: 4000,
    dieOnTimeout: false
  },
  mount: {
    millis: 3000,
    dieOnTimeout: false
  },
  unmount: {
    millis: 3000,
    dieOnTimeout: false
  },
  unload: {
    millis: 3000,
    dieOnTimeout: false
  }
};
function setBootstrapMaxTime(time) {
  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof time !== 'number' || time <= 0) {
    throw new Error("bootstrap max time must be a positive integer number of milliseconds");
  }

  globalTimeoutConfig.bootstrap = {
    millis: time,
    dieOnTimeout: dieOnTimeout
  };
}
function setMountMaxTime(time) {
  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof time !== 'number' || time <= 0) {
    throw new Error("mount max time must be a positive integer number of milliseconds");
  }

  globalTimeoutConfig.mount = {
    millis: time,
    dieOnTimeout: dieOnTimeout
  };
}
function setUnmountMaxTime(time) {
  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof time !== 'number' || time <= 0) {
    throw new Error("unmount max time must be a positive integer number of milliseconds");
  }

  globalTimeoutConfig.unmount = {
    millis: time,
    dieOnTimeout: dieOnTimeout
  };
}
function setUnloadMaxTime(time) {
  var dieOnTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (typeof time !== 'number' || time <= 0) {
    throw new Error("unload max time must be a positive integer number of milliseconds");
  }

  globalTimeoutConfig.unload = {
    millis: time,
    dieOnTimeout: dieOnTimeout
  };
}
function reasonableTime(promise, description, timeoutConfig) {
  var warningPeriod = 1000;
  return new Promise(function (resolve, reject) {
    var finished = false;
    var errored = false;
    promise.then(function (val) {
      finished = true;
      resolve(val);
    }).catch(function (val) {
      finished = true;
      reject(val);
    });
    setTimeout(function () {
      return maybeTimingOut(1);
    }, warningPeriod);
    setTimeout(function () {
      return maybeTimingOut(true);
    }, timeoutConfig.millis);

    function maybeTimingOut(shouldError) {
      if (!finished) {
        if (shouldError === true) {
          errored = true;

          if (timeoutConfig.dieOnTimeout) {
            reject("".concat(description, " did not resolve or reject for ").concat(timeoutConfig.millis, " milliseconds"));
          } else {
            console.error("".concat(description, " did not resolve or reject for ").concat(timeoutConfig.millis, " milliseconds -- we're no longer going to warn you about it.")); //don't resolve or reject, we're waiting this one out
          }
        } else if (!errored) {
          var numWarnings = shouldError;
          var numMillis = numWarnings * warningPeriod;
          console.warn("".concat(description, " did not resolve or reject within ").concat(numMillis, " milliseconds"));

          if (numMillis + warningPeriod < timeoutConfig.millis) {
            setTimeout(function () {
              return maybeTimingOut(numWarnings + 1);
            }, warningPeriod);
          }
        }
      }
    }
  });
}
function ensureValidAppTimeouts() {
  var timeouts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread({}, globalTimeoutConfig, timeouts);
}

/***/ }),

/***/ "./src/devtools/devtools.js":
/*!**********************************!*\
  !*** ./src/devtools/devtools.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _applications_apps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/apps */ "./src/applications/apps.js");
/* harmony import */ var _navigation_reroute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../navigation/reroute */ "./src/navigation/reroute.js");
/* harmony import */ var _applications_app_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/app.helpers */ "./src/applications/app.helpers.js");
/* harmony import */ var _lifecycles_load__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lifecycles/load */ "./src/lifecycles/load.js");
/* harmony import */ var _lifecycles_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lifecycles/bootstrap */ "./src/lifecycles/bootstrap.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  getRawAppData: _applications_apps__WEBPACK_IMPORTED_MODULE_0__["getRawAppData"],
  reroute: _navigation_reroute__WEBPACK_IMPORTED_MODULE_1__["reroute"],
  NOT_LOADED: _applications_app_helpers__WEBPACK_IMPORTED_MODULE_2__["NOT_LOADED"],
  toLoadPromise: _lifecycles_load__WEBPACK_IMPORTED_MODULE_3__["toLoadPromise"],
  toBootstrapPromise: _lifecycles_bootstrap__WEBPACK_IMPORTED_MODULE_4__["toBootstrapPromise"]
});

/***/ }),

/***/ "./src/jquery-support.js":
/*!*******************************!*\
  !*** ./src/jquery-support.js ***!
  \*******************************/
/*! exports provided: ensureJQuerySupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureJQuerySupport", function() { return ensureJQuerySupport; });
/* harmony import */ var _navigation_navigation_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation/navigation-events.js */ "./src/navigation/navigation-events.js");

var hasInitialized = false;
function ensureJQuerySupport() {
  var jQuery = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.jQuery;

  if (!jQuery) {
    if (window.$ && window.$.fn && window.$.fn.jquery) {
      jQuery = window.$;
    }
  }

  if (jQuery && !hasInitialized) {
    var originalJQueryOn = jQuery.fn.on;
    var originalJQueryOff = jQuery.fn.off;

    jQuery.fn.on = function (eventString, fn) {
      return captureRoutingEvents.call(this, originalJQueryOn, window.addEventListener, eventString, fn, arguments);
    };

    jQuery.fn.off = function (eventString, fn) {
      return captureRoutingEvents.call(this, originalJQueryOff, window.removeEventListener, eventString, fn, arguments);
    };

    hasInitialized = true;
  }
}

function captureRoutingEvents(originalJQueryFunction, nativeFunctionToCall, eventString, fn, originalArgs) {
  if (typeof eventString !== 'string') {
    return originalJQueryFunction.apply(this, originalArgs);
  }

  var eventNames = eventString.split(/\s+/);
  eventNames.forEach(function (eventName) {
    if (_navigation_navigation_events_js__WEBPACK_IMPORTED_MODULE_0__["routingEventsListeningTo"].indexOf(eventName) >= 0) {
      nativeFunctionToCall(eventName, fn);
      eventString = eventString.replace(eventName, '');
    }
  });

  if (eventString.trim() === '') {
    return this;
  } else {
    return originalJQueryFunction.apply(this, originalArgs);
  }
}

/***/ }),

/***/ "./src/lifecycles/bootstrap.js":
/*!*************************************!*\
  !*** ./src/lifecycles/bootstrap.js ***!
  \*************************************/
/*! exports provided: toBootstrapPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBootstrapPromise", function() { return toBootstrapPromise; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");




function toBootstrapPromise(appOrParcel) {
  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Promise.resolve().then(function () {
    if (appOrParcel.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_BOOTSTRAPPED"]) {
      return appOrParcel;
    }

    appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["BOOTSTRAPPING"];
    return Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_1__["reasonableTime"])(appOrParcel.bootstrap(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__["getProps"])(appOrParcel)), "Bootstrapping appOrParcel '".concat(appOrParcel.name, "'"), appOrParcel.timeouts.bootstrap).then(function () {
      appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_MOUNTED"];
      return appOrParcel;
    }).catch(function (err) {
      appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];

      if (hardFail) {
        var transformedErr = Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__["transformErr"])(err, appOrParcel);
        throw transformedErr;
      } else {
        Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__["handleAppError"])(err, appOrParcel);
        return appOrParcel;
      }
    });
  });
}

/***/ }),

/***/ "./src/lifecycles/lifecycle.helpers.js":
/*!*********************************************!*\
  !*** ./src/lifecycles/lifecycle.helpers.js ***!
  \*********************************************/
/*! exports provided: validLifecycleFn, flattenFnArray, smellsLikeAPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validLifecycleFn", function() { return validLifecycleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenFnArray", function() { return flattenFnArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smellsLikeAPromise", function() { return smellsLikeAPromise; });
/* harmony import */ var src_utils_find_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/utils/find.js */ "./src/utils/find.js");

function validLifecycleFn(fn) {
  return fn && (typeof fn === 'function' || isArrayOfFns(fn));

  function isArrayOfFns(arr) {
    return Array.isArray(arr) && !Object(src_utils_find_js__WEBPACK_IMPORTED_MODULE_0__["find"])(arr, function (item) {
      return typeof item !== 'function';
    });
  }
}
function flattenFnArray(fns, description) {
  fns = Array.isArray(fns) ? fns : [fns];

  if (fns.length === 0) {
    fns = [function () {
      return Promise.resolve();
    }];
  }

  return function (props) {
    return new Promise(function (resolve, reject) {
      waitForPromises(0);

      function waitForPromises(index) {
        var promise = fns[index](props);

        if (!smellsLikeAPromise(promise)) {
          reject("".concat(description, " at index ").concat(index, " did not return a promise"));
        } else {
          promise.then(function () {
            if (index === fns.length - 1) {
              resolve();
            } else {
              waitForPromises(index + 1);
            }
          }).catch(reject);
        }
      }
    });
  };
}
function smellsLikeAPromise(promise) {
  return promise && typeof promise.then === 'function' && typeof promise.catch === 'function';
}

/***/ }),

/***/ "./src/lifecycles/load.js":
/*!********************************!*\
  !*** ./src/lifecycles/load.js ***!
  \********************************/
/*! exports provided: toLoadPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLoadPromise", function() { return toLoadPromise; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lifecycle.helpers.js */ "./src/lifecycles/lifecycle.helpers.js");
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






function toLoadPromise(app) {
  return Promise.resolve().then(function () {
    if (app.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_LOADED"]) {
      return app;
    }

    app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["LOADING_SOURCE_CODE"];
    var appOpts;
    return Promise.resolve().then(function () {
      var loadPromise = app.loadImpl(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_4__["getProps"])(app));

      if (!Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["smellsLikeAPromise"])(loadPromise)) {
        // The name of the app will be prepended to this error message inside of the handleAppError function
        throw new Error("single-spa loading function did not return a promise. Check the second argument to registerApplication('".concat(app.name, "', loadingFunction, activityFunction)"));
      }

      return loadPromise.then(function (val) {
        appOpts = val;
        var validationErrMessage;

        if (_typeof(appOpts) !== 'object') {
          validationErrMessage = "does not export anything";
        }

        if (!Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["validLifecycleFn"])(appOpts.bootstrap)) {
          validationErrMessage = "does not export a bootstrap function or array of functions";
        }

        if (!Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["validLifecycleFn"])(appOpts.mount)) {
          validationErrMessage = "does not export a mount function or array of functions";
        }

        if (!Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["validLifecycleFn"])(appOpts.unmount)) {
          validationErrMessage = "does not export an unmount function or array of functions";
        }

        if (validationErrMessage) {
          Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__["handleAppError"])(validationErrMessage, app);
          app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
          return app;
        }

        if (appOpts.devtools && appOpts.devtools.overlays) {
          app.devtools.overlays = _objectSpread({}, app.devtools.overlays, appOpts.devtools.overlays);
        }

        app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_BOOTSTRAPPED"];
        app.bootstrap = Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["flattenFnArray"])(appOpts.bootstrap, "App '".concat(app.name, "' bootstrap function"));
        app.mount = Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["flattenFnArray"])(appOpts.mount, "App '".concat(app.name, "' mount function"));
        app.unmount = Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["flattenFnArray"])(appOpts.unmount, "App '".concat(app.name, "' unmount function"));
        app.unload = Object(_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_3__["flattenFnArray"])(appOpts.unload || [], "App '".concat(app.name, "' unload function"));
        app.timeouts = Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_1__["ensureValidAppTimeouts"])(appOpts.timeouts);
        return app;
      });
    }).catch(function (err) {
      Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_2__["handleAppError"])(err, app);
      app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
      return app;
    });
  });
}

/***/ }),

/***/ "./src/lifecycles/mount.js":
/*!*********************************!*\
  !*** ./src/lifecycles/mount.js ***!
  \*********************************/
/*! exports provided: toMountPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toMountPromise", function() { return toMountPromise; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var custom_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! custom-event */ "./node_modules/custom-event/index.js");
/* harmony import */ var custom_event__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(custom_event__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");





var beforeFirstMountFired = false;
var firstMountFired = false;
function toMountPromise(appOrParcel) {
  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Promise.resolve().then(function () {
    if (appOrParcel.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_MOUNTED"]) {
      return appOrParcel;
    }

    if (!beforeFirstMountFired) {
      window.dispatchEvent(new custom_event__WEBPACK_IMPORTED_MODULE_3___default.a('single-spa:before-first-mount'));
      beforeFirstMountFired = true;
    }

    return Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["reasonableTime"])(appOrParcel.mount(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_4__["getProps"])(appOrParcel)), "Mounting application '".concat(appOrParcel.name, "'"), appOrParcel.timeouts.mount).then(function () {
      appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["MOUNTED"];

      if (!firstMountFired) {
        window.dispatchEvent(new custom_event__WEBPACK_IMPORTED_MODULE_3___default.a('single-spa:first-mount'));
        firstMountFired = true;
      }

      return appOrParcel;
    }).catch(function (err) {
      if (!hardFail) {
        Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["handleAppError"])(err, appOrParcel);
        appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
        return appOrParcel;
      } else {
        var transformedErr = Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["transformErr"])(err, appOrParcel);
        appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
        throw transformedErr;
      }
    });
  });
}

/***/ }),

/***/ "./src/lifecycles/prop.helpers.js":
/*!****************************************!*\
  !*** ./src/lifecycles/prop.helpers.js ***!
  \****************************************/
/*! exports provided: getProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProps", function() { return getProps; });
/* harmony import */ var src_single_spa_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/single-spa.js */ "./src/single-spa.js");
/* harmony import */ var src_parcels_mount_parcel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/parcels/mount-parcel.js */ "./src/parcels/mount-parcel.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function getProps(appOrParcel) {
  var result = _objectSpread({}, appOrParcel.customProps, {
    name: appOrParcel.name,
    mountParcel: src_parcels_mount_parcel_js__WEBPACK_IMPORTED_MODULE_1__["mountParcel"].bind(appOrParcel),
    singleSpa: src_single_spa_js__WEBPACK_IMPORTED_MODULE_0__
  });

  if (appOrParcel.unmountThisParcel) {
    result.unmountSelf = appOrParcel.unmountThisParcel;
  }

  return result;
}

/***/ }),

/***/ "./src/lifecycles/unload.js":
/*!**********************************!*\
  !*** ./src/lifecycles/unload.js ***!
  \**********************************/
/*! exports provided: toUnloadPromise, addAppToUnload, getAppUnloadInfo, getAppsToUnload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUnloadPromise", function() { return toUnloadPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAppToUnload", function() { return addAppToUnload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppUnloadInfo", function() { return getAppUnloadInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppsToUnload", function() { return getAppsToUnload; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");




var appsToUnload = {};
function toUnloadPromise(app) {
  return Promise.resolve().then(function () {
    var unloadInfo = appsToUnload[app.name];

    if (!unloadInfo) {
      /* No one has called unloadApplication for this app,
      */
      return app;
    }

    if (app.status === _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_LOADED"]) {
      /* This app is already unloaded. We just need to clean up
       * anything that still thinks we need to unload the app.
       */
      finishUnloadingApp(app, unloadInfo);
      return app;
    }

    if (app.status === _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["UNLOADING"]) {
      /* Both unloadApplication and reroute want to unload this app.
       * It only needs to be done once, though.
       */
      return unloadInfo.promise.then(function () {
        return app;
      });
    }

    if (app.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_MOUNTED"]) {
      /* The app cannot be unloaded until it is unmounted.
      */
      return app;
    }

    app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["UNLOADING"];
    return Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["reasonableTime"])(app.unload(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__["getProps"])(app)), "Unloading application '".concat(app.name, "'"), app.timeouts.unload).then(function () {
      finishUnloadingApp(app, unloadInfo);
      return app;
    }).catch(function (err) {
      errorUnloadingApp(app, unloadInfo, err);
      return app;
    });
  });
}

function finishUnloadingApp(app, unloadInfo) {
  delete appsToUnload[app.name]; // Unloaded apps don't have lifecycles

  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  delete app.unload;
  app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_LOADED"];
  /* resolve the promise of whoever called unloadApplication.
   * This should be done after all other cleanup/bookkeeping
   */

  unloadInfo.resolve();
}

function errorUnloadingApp(app, unloadInfo, err) {
  delete appsToUnload[app.name]; // Unloaded apps don't have lifecycles

  delete app.bootstrap;
  delete app.mount;
  delete app.unmount;
  delete app.unload;
  Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["handleAppError"])(err, app);
  app.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
  unloadInfo.reject(err);
}

function addAppToUnload(app, promiseGetter, resolve, reject) {
  appsToUnload[app.name] = {
    app: app,
    resolve: resolve,
    reject: reject
  };
  Object.defineProperty(appsToUnload[app.name], 'promise', {
    get: promiseGetter
  });
}
function getAppUnloadInfo(appName) {
  return appsToUnload[appName];
}
function getAppsToUnload() {
  return Object.keys(appsToUnload).map(function (appName) {
    return appsToUnload[appName].app;
  }).filter(_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["isntActive"]);
}

/***/ }),

/***/ "./src/lifecycles/unmount.js":
/*!***********************************!*\
  !*** ./src/lifecycles/unmount.js ***!
  \***********************************/
/*! exports provided: toUnmountPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUnmountPromise", function() { return toUnmountPromise; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");




function toUnmountPromise(appOrParcel) {
  var hardFail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Promise.resolve().then(function () {
    if (appOrParcel.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["MOUNTED"]) {
      return appOrParcel;
    }

    appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["UNMOUNTING"];
    var unmountChildrenParcels = Object.keys(appOrParcel.parcels).map(function (parcelId) {
      return appOrParcel.parcels[parcelId].unmountThisParcel();
    });
    var parcelError;
    return Promise.all(unmountChildrenParcels).then(unmountAppOrParcel, function (parcelError) {
      // There is a parcel unmount error
      return unmountAppOrParcel().then(function () {
        // Unmounting the app/parcel succeeded, but unmounting its children parcels did not
        var parentError = new Error(parcelError.message);

        if (hardFail) {
          var transformedErr = Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["transformErr"])(parentError, appOrParcel);
          appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
          throw transformedErr;
        } else {
          Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["handleAppError"])(parentError, appOrParcel);
          appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
        }
      });
    }).then(function () {
      return appOrParcel;
    });

    function unmountAppOrParcel() {
      // We always try to unmount the appOrParcel, even if the children parcels failed to unmount.
      return Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["reasonableTime"])(appOrParcel.unmount(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__["getProps"])(appOrParcel)), "Unmounting application ".concat(appOrParcel.name, "'"), appOrParcel.timeouts.unmount).then(function () {
        // The appOrParcel needs to stay in a broken status if its children parcels fail to unmount
        if (!parcelError) {
          appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["NOT_MOUNTED"];
        }
      }).catch(function (err) {
        if (hardFail) {
          var transformedErr = Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["transformErr"])(err, appOrParcel);
          appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
          throw transformedErr;
        } else {
          Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["handleAppError"])(err, appOrParcel);
          appOrParcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
        }
      });
    }
  });
}

/***/ }),

/***/ "./src/lifecycles/update.js":
/*!**********************************!*\
  !*** ./src/lifecycles/update.js ***!
  \**********************************/
/*! exports provided: toUpdatePromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUpdatePromise", function() { return toUpdatePromise; });
/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony import */ var _prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.helpers.js */ "./src/lifecycles/prop.helpers.js");




function toUpdatePromise(parcel) {
  return Promise.resolve().then(function () {
    if (parcel.status !== _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["MOUNTED"]) {
      throw new Error("Cannot update parcel '".concat(parcel.name, "' because it is not mounted"));
    }

    parcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["UPDATING"];
    return Object(_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["reasonableTime"])(parcel.update(Object(_prop_helpers_js__WEBPACK_IMPORTED_MODULE_3__["getProps"])(parcel)), "Updating parcel '".concat(parcel.name, "'"), parcel.timeouts.mount).then(function () {
      parcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["MOUNTED"];
      return parcel;
    }).catch(function (err) {
      var transformedErr = Object(_applications_app_errors_js__WEBPACK_IMPORTED_MODULE_1__["transformErr"])(err, parcel);
      parcel.status = _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_0__["SKIP_BECAUSE_BROKEN"];
      throw transformedErr;
    });
  });
}

/***/ }),

/***/ "./src/navigation/navigation-events.js":
/*!*********************************************!*\
  !*** ./src/navigation/navigation-events.js ***!
  \*********************************************/
/*! exports provided: routingEventsListeningTo, navigateToUrl, callCapturedEventListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routingEventsListeningTo", function() { return routingEventsListeningTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateToUrl", function() { return navigateToUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callCapturedEventListeners", function() { return callCapturedEventListeners; });
/* harmony import */ var _reroute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reroute.js */ "./src/navigation/reroute.js");
/* harmony import */ var src_utils_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/utils/find.js */ "./src/utils/find.js");


/* We capture navigation event listeners so that we can make sure
 * that application navigation listeners are not called until
 * single-spa has ensured that the correct applications are
 * unmounted and mounted.
 */

var capturedEventListeners = {
  hashchange: [],
  popstate: []
};
var routingEventsListeningTo = ['hashchange', 'popstate'];
function navigateToUrl(obj) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var url;

  if (typeof obj === 'string') {
    url = obj;
  } else if (this && this.href) {
    url = this.href;
  } else if (obj && obj.currentTarget && obj.currentTarget.href && obj.preventDefault) {
    url = obj.currentTarget.href;
    obj.preventDefault();
  } else {
    throw new Error("singleSpaNavigate must be either called with a string url, with an <a> tag as its context, or with an event whose currentTarget is an <a> tag");
  }

  var current = parseUri(window.location.href);
  var destination = parseUri(url);

  if (url.indexOf('#') === 0) {
    window.location.hash = '#' + destination.anchor;
  } else if (current.host !== destination.host && destination.host) {
    if (opts.isTestingEnv) {
      return {
        wouldHaveReloadedThePage: true
      };
    } else {
      window.location.href = url;
    }
  } else if (!isSamePath(destination.path, current.path)) {
    // different path or a different host
    window.history.pushState(null, null, url);
  } else {
    window.location.hash = '#' + destination.anchor;
  }

  function isSamePath(destination, current) {
    // if the destination has a path but no domain, it doesn't include the root '/'
    return current === destination || current === '/' + destination;
  }
}
function callCapturedEventListeners(eventArguments) {
  var _this = this;

  if (eventArguments) {
    var eventType = eventArguments[0].type;

    if (routingEventsListeningTo.indexOf(eventType) >= 0) {
      capturedEventListeners[eventType].forEach(function (listener) {
        listener.apply(_this, eventArguments);
      });
    }
  }
}

function urlReroute() {
  Object(_reroute_js__WEBPACK_IMPORTED_MODULE_0__["reroute"])([], arguments);
} // We will trigger an app change for any routing events.


window.addEventListener('hashchange', urlReroute);
window.addEventListener('popstate', urlReroute); // Monkeypatch addEventListener so that we can ensure correct timing

var originalAddEventListener = window.addEventListener;
var originalRemoveEventListener = window.removeEventListener;

window.addEventListener = function (eventName, fn) {
  if (typeof fn === 'function') {
    if (routingEventsListeningTo.indexOf(eventName) >= 0 && !Object(src_utils_find_js__WEBPACK_IMPORTED_MODULE_1__["find"])(capturedEventListeners[eventName], function (listener) {
      return listener === fn;
    })) {
      capturedEventListeners[eventName].push(fn);
      return;
    }
  }

  return originalAddEventListener.apply(this, arguments);
};

window.removeEventListener = function (eventName, listenerFn) {
  if (typeof listenerFn === 'function') {
    if (routingEventsListeningTo.indexOf(eventName) >= 0) {
      capturedEventListeners[eventName] = capturedEventListeners[eventName].filter(function (fn) {
        return fn !== listenerFn;
      });
      return;
    }
  }

  return originalRemoveEventListener.apply(this, arguments);
};

var originalPushState = window.history.pushState;

window.history.pushState = function (state) {
  var result = originalPushState.apply(this, arguments);
  Object(_reroute_js__WEBPACK_IMPORTED_MODULE_0__["reroute"])();
  return result;
};

var originalReplaceState = window.history.replaceState;

window.history.replaceState = function () {
  var result = originalReplaceState.apply(this, arguments);
  Object(_reroute_js__WEBPACK_IMPORTED_MODULE_0__["reroute"])();
  return result;
};
/* For convenience in `onclick` attributes, we expose a global function for navigating to
 * whatever an <a> tag's href is.
 */


window.singleSpaNavigate = navigateToUrl;

function parseUri(str) {
  // parseUri 1.2.2
  // (c) Steven Levithan <stevenlevithan.com>
  // MIT License
  // http://blog.stevenlevithan.com/archives/parseuri
  var parseOptions = {
    strictMode: true,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };
  var o = parseOptions;
  var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
  var uri = {};
  var i = 14;

  while (i--) {
    uri[o.key[i]] = m[i] || "";
  }

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });
  return uri;
}

/***/ }),

/***/ "./src/navigation/reroute.js":
/*!***********************************!*\
  !*** ./src/navigation/reroute.js ***!
  \***********************************/
/*! exports provided: reroute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reroute", function() { return reroute; });
/* harmony import */ var custom_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! custom-event */ "./node_modules/custom-event/index.js");
/* harmony import */ var custom_event__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(custom_event__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_start_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/start.js */ "./src/start.js");
/* harmony import */ var src_lifecycles_load_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/lifecycles/load.js */ "./src/lifecycles/load.js");
/* harmony import */ var src_lifecycles_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/lifecycles/bootstrap.js */ "./src/lifecycles/bootstrap.js");
/* harmony import */ var src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/lifecycles/mount.js */ "./src/lifecycles/mount.js");
/* harmony import */ var src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/lifecycles/unmount.js */ "./src/lifecycles/unmount.js");
/* harmony import */ var src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/applications/apps.js */ "./src/applications/apps.js");
/* harmony import */ var _navigation_events_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./navigation-events.js */ "./src/navigation/navigation-events.js");
/* harmony import */ var src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/lifecycles/unload.js */ "./src/lifecycles/unload.js");









var appChangeUnderway = false,
    peopleWaitingOnAppChange = [];
function reroute() {
  var pendingPromises = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var eventArguments = arguments.length > 1 ? arguments[1] : undefined;

  if (appChangeUnderway) {
    return new Promise(function (resolve, reject) {
      peopleWaitingOnAppChange.push({
        resolve: resolve,
        reject: reject,
        eventArguments: eventArguments
      });
    });
  }

  appChangeUnderway = true;
  var wasNoOp = true;

  if (Object(src_start_js__WEBPACK_IMPORTED_MODULE_1__["isStarted"])()) {
    return performAppChanges();
  } else {
    return loadApps();
  }

  function loadApps() {
    return Promise.resolve().then(function () {
      var loadPromises = Object(src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__["getAppsToLoad"])().map(src_lifecycles_load_js__WEBPACK_IMPORTED_MODULE_2__["toLoadPromise"]);

      if (loadPromises.length > 0) {
        wasNoOp = false;
      }

      return Promise.all(loadPromises).then(finishUpAndReturn).catch(function (err) {
        callAllEventListeners();
        throw err;
      });
    });
  }

  function performAppChanges() {
    return Promise.resolve().then(function () {
      window.dispatchEvent(new custom_event__WEBPACK_IMPORTED_MODULE_0___default.a("single-spa:before-routing-event", getCustomEventDetail()));
      var unloadPromises = Object(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_8__["getAppsToUnload"])().map(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_8__["toUnloadPromise"]);
      var unmountUnloadPromises = Object(src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__["getAppsToUnmount"])().map(src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_5__["toUnmountPromise"]).map(function (unmountPromise) {
        return unmountPromise.then(src_lifecycles_unload_js__WEBPACK_IMPORTED_MODULE_8__["toUnloadPromise"]);
      });
      var allUnmountPromises = unmountUnloadPromises.concat(unloadPromises);

      if (allUnmountPromises.length > 0) {
        wasNoOp = false;
      }

      var unmountAllPromise = Promise.all(allUnmountPromises);
      var appsToLoad = Object(src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__["getAppsToLoad"])();
      /* We load and bootstrap apps while other apps are unmounting, but we
       * wait to mount the app until all apps are finishing unmounting
       */

      var loadThenMountPromises = appsToLoad.map(function (app) {
        return Object(src_lifecycles_load_js__WEBPACK_IMPORTED_MODULE_2__["toLoadPromise"])(app).then(src_lifecycles_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__["toBootstrapPromise"]).then(function (app) {
          return unmountAllPromise.then(function () {
            return Object(src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_4__["toMountPromise"])(app);
          });
        });
      });

      if (loadThenMountPromises.length > 0) {
        wasNoOp = false;
      }
      /* These are the apps that are already bootstrapped and just need
       * to be mounted. They each wait for all unmounting apps to finish up
       * before they mount.
       */


      var mountPromises = Object(src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__["getAppsToMount"])().filter(function (appToMount) {
        return appsToLoad.indexOf(appToMount) < 0;
      }).map(function (appToMount) {
        return Object(src_lifecycles_bootstrap_js__WEBPACK_IMPORTED_MODULE_3__["toBootstrapPromise"])(appToMount).then(function () {
          return unmountAllPromise;
        }).then(function () {
          return Object(src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_4__["toMountPromise"])(appToMount);
        });
      });

      if (mountPromises.length > 0) {
        wasNoOp = false;
      }

      return unmountAllPromise.catch(function (err) {
        callAllEventListeners();
        throw err;
      }).then(function () {
        /* Now that the apps that needed to be unmounted are unmounted, their DOM navigation
         * events (like hashchange or popstate) should have been cleaned up. So it's safe
         * to let the remaining captured event listeners to handle about the DOM event.
         */
        callAllEventListeners();
        return Promise.all(loadThenMountPromises.concat(mountPromises)).catch(function (err) {
          pendingPromises.forEach(function (promise) {
            return promise.reject(err);
          });
          throw err;
        }).then(function () {
          return finishUpAndReturn(false);
        });
      });
    });
  }

  function finishUpAndReturn() {
    var callEventListeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var returnValue = Object(src_applications_apps_js__WEBPACK_IMPORTED_MODULE_6__["getMountedApps"])();

    if (callEventListeners) {
      callAllEventListeners();
    }

    pendingPromises.forEach(function (promise) {
      return promise.resolve(returnValue);
    });

    try {
      var appChangeEventName = wasNoOp ? "single-spa:no-app-change" : "single-spa:app-change";
      window.dispatchEvent(new custom_event__WEBPACK_IMPORTED_MODULE_0___default.a(appChangeEventName, getCustomEventDetail()));
      window.dispatchEvent(new custom_event__WEBPACK_IMPORTED_MODULE_0___default.a("single-spa:routing-event", getCustomEventDetail()));
    } catch (err) {
      /* We use a setTimeout because if someone else's event handler throws an error, single-spa
       * needs to carry on. If a listener to the event throws an error, it's their own fault, not
       * single-spa's.
       */
      setTimeout(function () {
        throw err;
      });
    }
    /* Setting this allows for subsequent calls to reroute() to actually perform
     * a reroute instead of just getting queued behind the current reroute call.
     * We want to do this after the mounting/unmounting is done but before we
     * resolve the promise for the `reroute` function.
     */


    appChangeUnderway = false;

    if (peopleWaitingOnAppChange.length > 0) {
      /* While we were rerouting, someone else triggered another reroute that got queued.
       * So we need reroute again.
       */
      var nextPendingPromises = peopleWaitingOnAppChange;
      peopleWaitingOnAppChange = [];
      reroute(nextPendingPromises);
    }

    return returnValue;
  }
  /* We need to call all event listeners that have been delayed because they were
   * waiting on single-spa. This includes haschange and popstate events for both
   * the current run of performAppChanges(), but also all of the queued event listeners.
   * We want to call the listeners in the same order as if they had not been delayed by
   * single-spa, which means queued ones first and then the most recent one.
   */


  function callAllEventListeners() {
    pendingPromises.forEach(function (pendingPromise) {
      Object(_navigation_events_js__WEBPACK_IMPORTED_MODULE_7__["callCapturedEventListeners"])(pendingPromise.eventArguments);
    });
    Object(_navigation_events_js__WEBPACK_IMPORTED_MODULE_7__["callCapturedEventListeners"])(eventArguments);
  }

  function getCustomEventDetail() {
    var result = {
      detail: {}
    };

    if (eventArguments && eventArguments[0]) {
      result.detail.originalEvent = eventArguments[0];
    }

    return result;
  }
}

/***/ }),

/***/ "./src/parcels/mount-parcel.js":
/*!*************************************!*\
  !*** ./src/parcels/mount-parcel.js ***!
  \*************************************/
/*! exports provided: mountRootParcel, mountParcel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountRootParcel", function() { return mountRootParcel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mountParcel", function() { return mountParcel; });
/* harmony import */ var src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/lifecycles/lifecycle.helpers.js */ "./src/lifecycles/lifecycle.helpers.js");
/* harmony import */ var src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony import */ var src_lifecycles_bootstrap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/lifecycles/bootstrap.js */ "./src/lifecycles/bootstrap.js");
/* harmony import */ var src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/lifecycles/mount.js */ "./src/lifecycles/mount.js");
/* harmony import */ var src_lifecycles_update_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/lifecycles/update.js */ "./src/lifecycles/update.js");
/* harmony import */ var src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/lifecycles/unmount.js */ "./src/lifecycles/unmount.js");
/* harmony import */ var src_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/applications/timeouts.js */ "./src/applications/timeouts.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var parcelCount = 0;
var rootParcels = {
  parcels: {}
}; // This is a public api, exported to users of single-spa

function mountRootParcel() {
  return mountParcel.apply(rootParcels, arguments);
}
function mountParcel(config, customProps) {
  var owningAppOrParcel = this; // Validate inputs

  if (!config || _typeof(config) !== 'object' && typeof config !== 'function') {
    throw new Error('Cannot mount parcel without a config object or config loading function');
  }

  if (config.name && typeof config.name !== 'string') {
    throw new Error('Parcel name must be a string, if provided');
  }

  if (_typeof(customProps) !== 'object') {
    throw new Error("Parcel ".concat(name, " has invalid customProps -- must be an object"));
  }

  if (!customProps.domElement) {
    throw new Error("Parcel ".concat(name, " cannot be mounted without a domElement provided as a prop"));
  }

  var id = parcelCount++;
  var passedConfigLoadingFunction = typeof config === 'function';
  var configLoadingFunction = passedConfigLoadingFunction ? config : function () {
    return Promise.resolve(config);
  }; // Internal representation

  var parcel = {
    id: id,
    parcels: {},
    status: passedConfigLoadingFunction ? src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["LOADING_SOURCE_CODE"] : src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["NOT_BOOTSTRAPPED"],
    customProps: customProps,
    parentName: owningAppOrParcel.name,
    unmountThisParcel: function unmountThisParcel() {
      if (parcel.status !== src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["MOUNTED"]) {
        throw new Error("Cannot unmount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"));
      }

      return Object(src_lifecycles_unmount_js__WEBPACK_IMPORTED_MODULE_5__["toUnmountPromise"])(parcel, true).then(function (value) {
        if (parcel.parentName) {
          delete owningAppOrParcel.parcels[parcel.id];
        }

        return value;
      }).then(function (value) {
        resolveUnmount(value);
        return value;
      }).catch(function (err) {
        parcel.status = src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["SKIP_BECAUSE_BROKEN"];
        rejectUnmount(err);
        throw err;
      });
    }
  }; // We return an external representation

  var externalRepresentation; // Add to owning app or parcel

  owningAppOrParcel.parcels[id] = parcel;
  var loadPromise = configLoadingFunction();

  if (!loadPromise || typeof loadPromise.then !== 'function') {
    throw new Error("When mounting a parcel, the config loading function must return a promise that resolves with the parcel config");
  }

  loadPromise = loadPromise.then(function (config) {
    if (!config) {
      throw new Error("When mounting a parcel, the config loading function returned a promise that did not resolve with a parcel config");
    }

    var name = config.name || "parcel-".concat(id);

    if (!Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["validLifecycleFn"])(config.bootstrap)) {
      throw new Error("Parcel ".concat(name, " must have a valid bootstrap function"));
    }

    if (!Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["validLifecycleFn"])(config.mount)) {
      throw new Error("Parcel ".concat(name, " must have a valid mount function"));
    }

    if (!Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["validLifecycleFn"])(config.unmount)) {
      throw new Error("Parcel ".concat(name, " must have a valid unmount function"));
    }

    if (config.update && !Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["validLifecycleFn"])(config.update)) {
      throw new Error("Parcel ".concat(name, " provided an invalid update function"));
    }

    var bootstrap = Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["flattenFnArray"])(config.bootstrap);
    var mount = Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["flattenFnArray"])(config.mount);
    var unmount = Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["flattenFnArray"])(config.unmount);
    parcel.status = src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["NOT_BOOTSTRAPPED"];
    parcel.name = name;
    parcel.bootstrap = bootstrap;
    parcel.mount = mount;
    parcel.unmount = unmount;
    parcel.timeouts = Object(src_applications_timeouts_js__WEBPACK_IMPORTED_MODULE_6__["ensureValidAppTimeouts"])(config.timeouts);

    if (config.update) {
      parcel.update = Object(src_lifecycles_lifecycle_helpers_js__WEBPACK_IMPORTED_MODULE_0__["flattenFnArray"])(config.update);

      externalRepresentation.update = function (customProps) {
        parcel.customProps = customProps;
        return promiseWithoutReturnValue(Object(src_lifecycles_update_js__WEBPACK_IMPORTED_MODULE_4__["toUpdatePromise"])(parcel));
      };
    }
  }); // Start bootstrapping and mounting
  // The .then() causes the work to be put on the event loop instead of happening immediately

  var bootstrapPromise = loadPromise.then(function () {
    return Object(src_lifecycles_bootstrap_js__WEBPACK_IMPORTED_MODULE_2__["toBootstrapPromise"])(parcel, true);
  });
  var mountPromise = bootstrapPromise.then(function () {
    return Object(src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_3__["toMountPromise"])(parcel, true);
  });
  var resolveUnmount, rejectUnmount;
  var unmountPromise = new Promise(function (resolve, reject) {
    resolveUnmount = resolve;
    rejectUnmount = reject;
  });
  externalRepresentation = {
    mount: function mount() {
      return promiseWithoutReturnValue(Promise.resolve().then(function () {
        if (parcel.status !== src_applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_1__["NOT_MOUNTED"]) {
          throw new Error("Cannot mount parcel '".concat(name, "' -- it is in a ").concat(parcel.status, " status"));
        } // Add to owning app or parcel


        owningAppOrParcel.parcels[id] = parcel;
        return Object(src_lifecycles_mount_js__WEBPACK_IMPORTED_MODULE_3__["toMountPromise"])(parcel);
      }));
    },
    unmount: function unmount() {
      return promiseWithoutReturnValue(parcel.unmountThisParcel());
    },
    getStatus: function getStatus() {
      return parcel.status;
    },
    loadPromise: promiseWithoutReturnValue(loadPromise),
    bootstrapPromise: promiseWithoutReturnValue(bootstrapPromise),
    mountPromise: promiseWithoutReturnValue(mountPromise),
    unmountPromise: promiseWithoutReturnValue(unmountPromise)
  };
  return externalRepresentation;
}

function promiseWithoutReturnValue(promise) {
  return promise.then(function () {
    return null;
  });
}

/***/ }),

/***/ "./src/single-spa.js":
/*!***************************!*\
  !*** ./src/single-spa.js ***!
  \***************************/
/*! exports provided: start, ensureJQuerySupport, setBootstrapMaxTime, setMountMaxTime, setUnmountMaxTime, setUnloadMaxTime, registerApplication, getMountedApps, getAppStatus, unloadApplication, checkActivityFunctions, getAppNames, declareChildApplication, unloadChildApplication, navigateToUrl, triggerAppChange, addErrorHandler, removeErrorHandler, mountRootParcel, NOT_LOADED, LOADING_SOURCE_CODE, NOT_BOOTSTRAPPED, BOOTSTRAPPING, NOT_MOUNTED, MOUNTING, UPDATING, MOUNTED, UNMOUNTING, SKIP_BECAUSE_BROKEN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _start_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./start.js */ "./src/start.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "start", function() { return _start_js__WEBPACK_IMPORTED_MODULE_0__["start"]; });

/* harmony import */ var _jquery_support_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jquery-support.js */ "./src/jquery-support.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ensureJQuerySupport", function() { return _jquery_support_js__WEBPACK_IMPORTED_MODULE_1__["ensureJQuerySupport"]; });

/* harmony import */ var _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applications/timeouts.js */ "./src/applications/timeouts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setBootstrapMaxTime", function() { return _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["setBootstrapMaxTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setMountMaxTime", function() { return _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["setMountMaxTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setUnmountMaxTime", function() { return _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["setUnmountMaxTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setUnloadMaxTime", function() { return _applications_timeouts_js__WEBPACK_IMPORTED_MODULE_2__["setUnloadMaxTime"]; });

/* harmony import */ var _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./applications/apps.js */ "./src/applications/apps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerApplication", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["registerApplication"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMountedApps", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["getMountedApps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAppStatus", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["getAppStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unloadApplication", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["unloadApplication"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkActivityFunctions", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["checkActivityFunctions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAppNames", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["getAppNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "declareChildApplication", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["declareChildApplication"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unloadChildApplication", function() { return _applications_apps_js__WEBPACK_IMPORTED_MODULE_3__["unloadChildApplication"]; });

/* harmony import */ var _navigation_navigation_events_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigation/navigation-events.js */ "./src/navigation/navigation-events.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigateToUrl", function() { return _navigation_navigation_events_js__WEBPACK_IMPORTED_MODULE_4__["navigateToUrl"]; });

/* harmony import */ var _navigation_reroute_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navigation/reroute.js */ "./src/navigation/reroute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "triggerAppChange", function() { return _navigation_reroute_js__WEBPACK_IMPORTED_MODULE_5__["reroute"]; });

/* harmony import */ var _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./applications/app-errors.js */ "./src/applications/app-errors.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addErrorHandler", function() { return _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_6__["addErrorHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeErrorHandler", function() { return _applications_app_errors_js__WEBPACK_IMPORTED_MODULE_6__["removeErrorHandler"]; });

/* harmony import */ var src_parcels_mount_parcel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/parcels/mount-parcel.js */ "./src/parcels/mount-parcel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mountRootParcel", function() { return src_parcels_mount_parcel_js__WEBPACK_IMPORTED_MODULE_7__["mountRootParcel"]; });

/* harmony import */ var _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./applications/app.helpers.js */ "./src/applications/app.helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOT_LOADED", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["NOT_LOADED"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOADING_SOURCE_CODE", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["LOADING_SOURCE_CODE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOT_BOOTSTRAPPED", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["NOT_BOOTSTRAPPED"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BOOTSTRAPPING", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["BOOTSTRAPPING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NOT_MOUNTED", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["NOT_MOUNTED"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MOUNTING", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["MOUNTING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UPDATING", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["UPDATING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MOUNTED", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["MOUNTED"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UNMOUNTING", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["UNMOUNTING"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SKIP_BECAUSE_BROKEN", function() { return _applications_app_helpers_js__WEBPACK_IMPORTED_MODULE_8__["SKIP_BECAUSE_BROKEN"]; });

/* harmony import */ var _devtools_devtools__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./devtools/devtools */ "./src/devtools/devtools.js");











if (window && window.__SINGLE_SPA_DEVTOOLS__) {
  window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = _devtools_devtools__WEBPACK_IMPORTED_MODULE_9__["default"];
}

/***/ }),

/***/ "./src/start.js":
/*!**********************!*\
  !*** ./src/start.js ***!
  \**********************/
/*! exports provided: start, isStarted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStarted", function() { return isStarted; });
/* harmony import */ var _navigation_reroute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation/reroute.js */ "./src/navigation/reroute.js");

var started = false;
function start() {
  started = true;
  Object(_navigation_reroute_js__WEBPACK_IMPORTED_MODULE_0__["reroute"])();
}
function isStarted() {
  return started;
}
var startWarningDelay = 5000;
setTimeout(function () {
  if (!started) {
    console.warn("singleSpa.start() has not been called, ".concat(startWarningDelay, "ms after single-spa was loaded. Before start() is called, apps can be declared and loaded, but not bootstrapped or mounted. See https://github.com/CanopyTax/single-spa/blob/master/docs/single-spa-api.md#start"));
  }
}, startWarningDelay);

/***/ }),

/***/ "./src/utils/find.js":
/*!***************************!*\
  !*** ./src/utils/find.js ***!
  \***************************/
/*! exports provided: find */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* the array.prototype.find polyfill on npmjs.com is ~20kb (not worth it)
 * and lodash is ~200kb (not worth it)
 */
function find(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    if (func(arr[i])) {
      return arr[i];
    }
  }

  return null;
}

/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./src/single-spa.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mcmurdie/Developer/Canopy/single-spa/src/single-spa.js */"./src/single-spa.js");


/***/ })

/******/ });
});
//# sourceMappingURL=single-spa.js.map