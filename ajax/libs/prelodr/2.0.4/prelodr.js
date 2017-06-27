(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Prelodr"] = factory();
	else
		root["Prelodr"] = factory();
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global module */

	var _seqr = __webpack_require__(1);

	var _seqr2 = _interopRequireDefault(_seqr);

	var _emitus = __webpack_require__(3);

	var _emitus2 = _interopRequireDefault(_emitus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var opts = _extends({
	    container: document.body,
	    duration: 750,
	    prefixClass: 'prelodr'
	  }, options);

	  var seqr = (0, _seqr2.default)();
	  var emitr = (0, _emitus2.default)({ show: show, hide: hide, text: text });

	  var element = el();
	  var wrapper = el();
	  var progressbar = el();
	  var spanText = el();
	  var textNode = el();
	  var clsIn = opts.prefixClass + '-in';
	  var clsHide = opts.prefixClass + '-hide';

	  spanText.appendChild(textNode);
	  wrapper.appendChild(spanText);
	  spanText.appendChild(progressbar);
	  element.appendChild(wrapper);
	  element.className = opts.prefixClass;
	  progressbar.className = opts.prefixClass + '-progressbar';
	  element.classList.add(clsHide);
	  opts.container.appendChild(element);

	  return emitr;

	  function show(str) {
	    /* istanbul ignore next */
	    seqr.then(function (done) {
	      text(str);

	      element.classList.remove(clsHide);

	      setTimeout(function () {
	        spanText.classList.add(clsIn);
	        element.classList.add(clsIn);
	      }, 10);

	      setTimeout(function () {
	        emitr.emit('shown');
	        done();
	      }, opts.duration);
	    });

	    return emitr;
	  }

	  function hide(fn) {
	    /* istanbul ignore next */
	    seqr.then(function (done) {
	      spanText.classList.remove(clsIn);
	      element.classList.remove(clsIn);

	      setTimeout(function () {
	        element.classList.add(clsHide);

	        if (fn) fn(done);else done();

	        emitr.emit('hidden');
	      }, opts.duration);
	    });

	    return emitr;
	  }

	  function text() {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Loading...';

	    textNode.innerHTML = str;
	  }

	  function el() {
	    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';

	    return document.createElement(tag);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _quek = __webpack_require__(2);

	var _quek2 = _interopRequireDefault(_quek);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function () {
	  var quek = (0, _quek2.default)();
	  var api = {};

	  api.then = function (fn) {
	    /* istanbul ignore else */
	    if (fn && typeof fn === 'function') {
	      quek.append({
	        fn: fn,
	        lock: false
	      });
	    }

	    next(quek.first());

	    return api;
	  };

	  return api;

	  function next(el) {
	    if (el && !el.lock) {
	      el.lock = true;
	      el.fn(done);
	    }
	  }

	  /* istanbul ignore next */
	  function done() {
	    var el = quek.first();

	    if (el && el.lock) {
	      quek.shift();
	      next(quek.first());
	    }
	  }
	}; /* global module */

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/* global module */

	module.exports = function () {
	  var que = [];

	  return {
	    append: function append(e) {
	      return que.push(e);
	    },
	    prepend: function prepend(e) {
	      return que.unshift(e);
	    },

	    pop: function pop() {
	      return que.pop();
	    },
	    shift: function shift() {
	      return que.shift();
	    },

	    first: function first() {
	      return que[0];
	    },
	    last: function last() {
	      return que.slice(-1)[0];
	    },

	    all: function all() {
	      return que;
	    },
	    length: function length() {
	      return que.length;
	    }
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/* global module */

	module.exports = function () {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  var list = [];
	  var api = _extends({ on: on, off: off, emit: emit }, obj);

	  function on(name, fn) {
	    list.push({ name: name, fn: fn });
	  }

	  function off(name) {
	    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    list.forEach(function (e, i) {
	      /* istanbul ignore if */
	      if (e.name === name && e.fn === fn) {
	        list.splice(i, 1);
	      }

	      /* istanbul ignore if */
	      if (e.name === name && !fn) {
	        list.splice(i, 1);
	      }
	    });
	  }

	  function emit(name) {
	    var _this = this;

	    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    list.forEach(function (e) {
	      /* istanbul ignore next */
	      if (e && e.name === name && typeof e.fn === 'function') {
	        e.fn.apply(_this, args);
	      }
	    });
	  }

	  return api;
	};

/***/ }
/******/ ])
});
;