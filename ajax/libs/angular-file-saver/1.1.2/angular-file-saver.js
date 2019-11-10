(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

	/*
	*
	* A AngularJS module that implements the HTML5 W3C saveAs() in browsers that
	* do not natively support it
	*
	* (c) 2015 Philipp Alferov
	* License: MIT
	*
	*/

	module.exports = 'ngFileSaver';

	angular.module('ngFileSaver', [])
	  .factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', __webpack_require__(1)])
	  .factory('FileSaverUtils', [__webpack_require__(2)])
	  .factory('Blob', ['$window', 'FileSaverUtils', __webpack_require__(3)])
	  .factory('SaveAs', ['$window', 'FileSaverUtils', __webpack_require__(4)]);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function FileSaver(Blob, SaveAs, FileSaverUtils) {

	  function save(blob, filename, disableAutoBOM) {
	    try {
	      SaveAs(blob, filename, disableAutoBOM);
	    } catch(err) {
	      FileSaverUtils.handleErrors(err.message);
	    }
	  }

	  return {

	    /**
	    * saveAs
	    * Immediately starts saving a file, returns undefined.
	    *
	    * @name saveAs
	    * @function
	    * @param {Blob} data A Blob instance
	    * @param {Object} filename Custom filename (extension is optional)
	    * @param {Boolean} disableAutoBOM Disable automatically provided Unicode
	    * text encoding hints
	    *
	    * @return {Undefined}
	    */

	    saveAs: function(data, filename, disableAutoBOM) {

	      if (!FileSaverUtils.isBlobInstance(data)) {
	        FileSaverUtils.handleErrors('Data argument should be a blob instance');
	      }

	      if (!FileSaverUtils.isString(filename)) {
	        FileSaverUtils.handleErrors('Filename argument should be a string');
	      }

	      return save(data, filename, disableAutoBOM);
	    }
	  };
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function FileSaverUtils() {
	  return {
	    handleErrors: function(msg) {
	      throw new Error(msg);
	    },
	    isString: function(obj) {
	      return typeof obj === 'string' || obj instanceof String;
	    },
	    isUndefined: function(obj) {
	      return typeof obj === 'undefined';
	    },
	    isBlobInstance: function(obj) {
	      return obj instanceof Blob;
	    }
	  };
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function Blob($window, FileSaverUtils) {
	  var blob = $window.Blob;

	  if (FileSaverUtils.isUndefined(blob)) {
	    FileSaverUtils.handleErrors('Blob is not supported. Please include blob polyfilll');
	  }

	  return blob;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function SaveAs($window, FileSaverUtils) {
	  var saveAs = $window.saveAs;

	  if (FileSaverUtils.isUndefined(saveAs)) {
	    FileSaverUtils.handleErrors('saveAs is not supported. Please include saveAs polyfill');
	  }

	  return saveAs;
	};


/***/ }
/******/ ])
});
;