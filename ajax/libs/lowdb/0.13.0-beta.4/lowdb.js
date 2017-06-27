/*! lowdb v0.13.0-beta.4 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["low"] = factory();
	else
		root["low"] = factory();
})(this, function() {
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

	'use strict';

	var lodash = __webpack_require__(1);
	var isPromise = __webpack_require__(2);
	var defaultStorage = __webpack_require__(3);

	function low(source) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var _ref$storage = _ref.storage;
	  var storage = _ref$storage === undefined ? defaultStorage : _ref$storage;
	  var _ref$format = _ref.format;
	  var format = _ref$format === undefined ? null : _ref$format;
	  var _ref$writeOnChange = _ref.writeOnChange;
	  var writeOnChange = _ref$writeOnChange === undefined ? true : _ref$writeOnChange;

	  // Create a fresh copy of lodash
	  var _ = lodash.runInContext();

	  var db = _.chain({});

	  if (source) {
	    if (storage) {
	      if (storage.read) {
	        db.read = function () {
	          var s = arguments.length <= 0 || arguments[0] === undefined ? source : arguments[0];

	          var res = storage.read(s, db.deserialize);
	          var init = function init(obj) {
	            db.__wrapped__ = obj;
	            db._checksum = JSON.stringify(db.__wrapped__);
	          };

	          if (isPromise(res)) {
	            return res.then(function (obj) {
	              init(obj);
	              return db;
	            });
	          }

	          init(res);
	          return db;
	        };
	      }

	      if (storage.write) {
	        db.write = function () {
	          var dest = arguments.length <= 0 || arguments[0] === undefined ? source : arguments[0];
	          return storage.write(dest, db.__wrapped__, db.serialize);
	        };
	      }
	    }

	    if (format) {
	      var _options = options;
	      var _format = _options.format;

	      db.serialize = _format.serialize;
	      db.deserialize = _format.deserialize;
	    }
	  }

	  // Persist database state
	  function persist() {
	    if (db.source && db.write && writeOnChange) {
	      var str = JSON.stringify(db.__wrapped__);

	      if (str !== db._checksum) {
	        db._checksum = str;
	        db.write(db.source, db.__wrapped__);
	      }
	    }
	  }

	  // Modify value function to call save before returning result
	  _.prototype.value = _.wrap(_.prototype.value, function (value) {
	    var v = value.apply(this);
	    persist();
	    return v;
	  });

	  // Get or set database state
	  db.getState = function () {
	    return db.__wrapped__;
	  };
	  db.setState = function (state) {
	    db.__wrapped__ = state;
	    persist();
	  };

	  db._ = _;
	  db.source = source;

	  // Read
	  if (db.read) {
	    return db.read();
	  } else {
	    return db;
	  }
	}

	module.exports = low;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/* global localStorage */

	module.exports = {
	  read: function read(source) {
	    var deserialize = arguments.length <= 1 || arguments[1] === undefined ? JSON.parse : arguments[1];

	    var data = localStorage.getItem(source);
	    if (data) {
	      return deserialize(data);
	    } else {
	      localStorage.setItem(source, '{}');
	      return {};
	    }
	  },
	  write: function write(dest, obj) {
	    var serialize = arguments.length <= 2 || arguments[2] === undefined ? JSON.stringify : arguments[2];
	    return localStorage.setItem(dest, serialize(obj));
	  }
	};

/***/ }
/******/ ])
});
;