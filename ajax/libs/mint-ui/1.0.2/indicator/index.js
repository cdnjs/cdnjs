module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(85);


/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(86);

	var _vue2 = _interopRequireDefault(_vue);

	__webpack_require__(87);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Indicator = _vue2.default.extend(__webpack_require__(89));
	var instance = void 0;
	var timer = void 0;

	module.exports = {
	  open: function open(options) {
	    if (!instance) {
	      instance = new Indicator({
	        el: document.createElement('div')
	      });
	    }
	    if (instance.visible) return;
	    if (typeof options === 'string') {
	      instance.text = options;
	      instance.spinnerType = 'snake';
	    } else if (Object.prototype.toString.call(options) === '[object Object]') {
	      instance.text = options.text || '';
	      instance.spinnerType = options.spinnerType || 'snake';
	    } else {
	      instance.text = '';
	      instance.spinnerType = 'snake';
	    }
	    instance.$appendTo(document.body);
	    if (timer) {
	      clearTimeout(timer);
	    }

	    _vue2.default.nextTick(function () {
	      instance.visible = true;
	    });
	  },
	  close: function close() {
	    if (instance) {
	      instance.visible = false;
	      timer = setTimeout(function () {
	        if (instance.$el) {
	          instance.$el.style.display = 'none';
	        }
	      }, 400);
	    }
	  }
	};

/***/ },

/***/ 86:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 87:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(90)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/indicator/src/indicator.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(93)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(91);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  __webpack_require__(92);
	}

	exports.default = {
	  data: function data() {
	    return {
	      visible: false
	    };
	  },


	  components: {
	    Spinner: _index2.default
	  },

	  computed: {
	    convertedSpinnerType: function convertedSpinnerType() {
	      switch (this.spinnerType) {
	        case 'double-bounce':
	          return 1;
	        case 'triple-bounce':
	          return 2;
	        case 'fading-circle':
	          return 3;
	        default:
	          return 0;
	      }
	    }
	  },

	  props: {
	    text: String,
	    spinnerType: {
	      type: String,
	      default: 'snake'
	    }
	  }
	};

/***/ },

/***/ 91:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/spinner");

/***/ },

/***/ 92:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/spinner/style.css");

/***/ },

/***/ 93:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-indicator\" v-show=\"visible\" transition=\"mint-indicator\" >\n  <div class=\"mint-indicator-wrapper\" :style=\"{ 'padding': text ? '20px' : '15px' }\">\n    <spinner class=\"mint-indicator-spin\" :type=\"convertedSpinnerType\" :size=\"32\"></spinner>\n    <span class=\"mint-indicator-text\" v-show=\"text\">{{ text }}</span>\n  </div>\n  <div class=\"mint-indicator-mask\" @touchmove.stop.prevent></div>\n</div>\n";

/***/ }

/******/ });