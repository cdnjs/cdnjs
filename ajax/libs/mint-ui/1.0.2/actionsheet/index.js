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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(3)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/actionsheet/src/actionsheet.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(12)
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
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vuePopup = __webpack_require__(8);

	var _vuePopup2 = _interopRequireDefault(_vuePopup);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'mt-actionsheet',

	  mixins: [_vuePopup2.default],

	  props: {
	    modal: {
	      default: true
	    },

	    closeOnClickModal: {
	      default: true
	    },

	    lockScroll: {
	      default: false
	    },

	    cancelText: {
	      type: String,
	      default: '取消'
	    },

	    actions: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    }
	  },

	  methods: {
	    itemClick: function itemClick(item) {
	      if (item.method && typeof item.method === 'function') {
	        item.method();
	      }
	      this.visible = false;
	    }
	  },

	  ready: function ready() {
	    if (this.visible) {
	      this.rendered = true;
	      this.open();
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("vue-popup");

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div v-show=\"visible\" class=\"mint-actionsheet\" transition=\"actionsheet-float\">\n  <ul class=\"mint-actionsheet-list\" :style=\"{ 'margin-bottom': cancelText ? '5px' : '0' }\">\n    <li v-for=\"item in actions\" class=\"mint-actionsheet-listitem\" @click=\"itemClick(item)\">{{ item.name }}</li>\n  </ul>\n  <a class=\"mint-actionsheet-button\" @click=\"visible = false\" v-if=\"cancelText\">{{ cancelText }}</a>\n</div>\n";

/***/ }
/******/ ]);