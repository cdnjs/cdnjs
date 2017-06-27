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

	  var defaults = setDefaults(options);

	  var emitter = (0, _emitus2.default)({
	    show: show,
	    hide: hide,
	    setText: setText,
	    getElement: getElement,
	    setPrefixClass: setPrefixClass,
	    setDuration: setDuration,
	    setZIndex: setZIndex
	  });

	  var seqr = (0, _seqr2.default)();
	  var cls = getClasses();

	  var wrapper = el();
	  wrapper.className = cls.prefix + ' ' + cls.hide;
	  wrapper.innerHTML = '\n    <span>\n      <span>\n        <span class="' + cls.text + '">' + defaults.text + '</span>\n        <span class="' + cls.progressbar + '"></span>\n      </span>\n    </span>\n  ';

	  var spanText = find('.' + cls.text);
	  var spanProgressbar = find('.' + cls.progressbar);

	  defaults.container.appendChild(wrapper);

	  if (defaults.auto) {
	    show(defaults.text);
	  }

	  setZIndex(defaults.zIndex);

	  return emitter;

	  function show(str) {
	    /* istanbul ignore next */
	    seqr.then(function (done) {
	      setText(str);

	      wrapper.classList.remove(cls.hide);

	      setTimeout(function () {
	        spanText.classList.add(cls.in);
	        wrapper.classList.add(cls.in);
	      }, 10);

	      setTimeout(function () {
	        emitter.emit('shown');
	        done();
	      }, defaults.duration);
	    });

	    return emitter;
	  }

	  function hide(fn) {
	    /* istanbul ignore next */
	    seqr.then(function (done) {
	      spanText.classList.remove(cls.in);
	      wrapper.classList.remove(cls.in);

	      setTimeout(function () {
	        wrapper.classList.add(cls.hide);

	        if (fn) fn(done);else done();

	        emitter.emit('hidden');
	      }, defaults.duration);
	    });

	    return emitter;
	  }

	  function setText(str) {
	    /* istanbul ignore next */
	    if (!str && defaults.text) {
	      str = defaults.text;
	    }

	    defaults.text = str;
	    spanText.innerHTML = str;

	    return emitter;
	  }

	  function getElement() {
	    return wrapper;
	  }

	  function setDuration(duration) {
	    defaults.duration = duration;
	  }

	  function setZIndex(zindex) {
	    defaults.zIndex = zindex;
	    wrapper.style.zIndex = zindex;
	  }

	  function setPrefixClass(prefix) {
	    defaults.prefixClass = prefix;
	    updateClasses();
	  }

	  function setDefaults() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    return _extends({
	      container: document.body,
	      duration: 750,
	      zIndex: 100,
	      auto: false,
	      text: 'Loading...',
	      prefixClass: 'prelodr'
	    }, options);
	  }

	  function updateClasses() {
	    var from = cls;

	    cls = getClasses();
	    replaceClass(wrapper, from.prefix, cls.prefix);
	    replaceClass(spanText, from.text, cls.text);
	    replaceClass(spanProgressbar, from.progressbar, cls.progressbar);
	  }

	  function getClasses() {
	    return {
	      prefix: defaults.prefixClass,
	      in: defaults.prefixClass + '-in',
	      hide: defaults.prefixClass + '-hide',
	      text: defaults.prefixClass + '-text',
	      progressbar: defaults.prefixClass + '-progressbar'
	    };
	  }

	  function el() {
	    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'span';

	    return document.createElement(tag);
	  }

	  function find(q) {
	    return wrapper.querySelector(q);
	  }

	  function replaceClass(elem, from, to) {
	    elem.classList.remove(from);
	    elem.classList.add(to);
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