/*! lowdb v0.16.2 */
var low =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isPromise = __webpack_require__(6);
var memory = __webpack_require__(5);
var defaultStorage = __webpack_require__(4);

var init = function init(db, key, source) {
  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      _ref$storage = _ref.storage,
      storage = _ref$storage === undefined ? defaultStorage : _ref$storage,
      _ref$format = _ref.format,
      format = _ref$format === undefined ? {} : _ref$format;

  db.source = source;

  // Set storage
  // In-memory only if no source is provided
  db.storage = _extends({}, memory, db.source && storage);

  db.read = function () {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : source;

    var r = db.storage.read(s, format.deserialize);

    return isPromise(r) ? r.then(db.plant) : db.plant(r);
  };

  db.write = function () {
    var dest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : source;

    var value = (arguments.length <= 1 ? 0 : arguments.length - 1) ? arguments.length <= 1 ? undefined : arguments[1] : db.getState();

    var w = db.storage.write(dest, db.getState(), format.serialize);
    return isPromise(w) ? w.then(function () {
      return value;
    }) : value;
  };

  db.plant = function (state) {
    db[key] = state;
    return db;
  };

  db.getState = function () {
    return db[key];
  };

  db.setState = function (state) {
    db.plant(state);
    return db.write();
  };

  return db.read();
};

module.exports = {
  init: init
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lodash = __webpack_require__(1);
var common = __webpack_require__(0);

module.exports = function (source) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Create a fresh copy of lodash
  var _ = lodash.runInContext();
  var db = _.chain({});

  // Expose _ for mixins
  db._ = _;

  // Add write function to lodash
  // Calls save before returning result
  _.prototype.write = _.wrap(_.prototype.value, function (func) {
    var dest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : source;

    var funcRes = func.apply(this);
    return db.write(dest, funcRes);
  });

  return common.init(db, '__wrapped__', source, opts);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Pretty stringify
module.exports = function stringify(obj) {
  return JSON.stringify(obj, null, 2);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global localStorage */
var stringify = __webpack_require__(3);

module.exports = {
  read: function browserRead(source) {
    var deserialize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse;

    var data = localStorage.getItem(source);
    if (data) {
      return deserialize(data);
    } else {
      localStorage.setItem(source, '{}');
      return {};
    }
  },
  write: function browserWrite(dest, obj) {
    var serialize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringify;

    localStorage.setItem(dest, serialize(obj));
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  read: function memoryRead() {
    return {};
  },
  write: function memoryWrite() {
    return {};
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ })
/******/ ]);