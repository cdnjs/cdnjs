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

	module.exports = __webpack_require__(19);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(21)
	__vue_script__ = __webpack_require__(23)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/button/src/button.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
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
/* 21 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	if (true) {
	  __webpack_require__(24);
	}
	exports.default = {
	  name: 'mt-button',

	  props: {
	    icon: String,
	    disabled: Boolean,
	    plain: Boolean,
	    type: {
	      type: String,
	      default: 'default',
	      validator: function validator(value) {
	        return ['default', 'danger', 'primary'].indexOf(value) > -1;
	      }
	    },
	    size: {
	      type: String,
	      default: 'normal',
	      validator: function validator(value) {
	        return ['small', 'normal', 'large'].indexOf(value) > -1;
	      }
	    }
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/font/style.css");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "\n<button\n  class=\"mint-button\"\n  :class=\"['mint-button--' + type, 'mint-button--' + size, {\n      'is-disabled': disabled,\n      'is-plain': plain\n    }]\"\n  :disabled=\"disabled\">\n  <span class=\"mint-button-icon\" v-if=\"icon || _slotContents.icon\">\n    <slot name=\"icon\">\n      <i v-if=\"icon\" class=\"mintui\" :class=\"'mintui-' + icon\"></i>\n    </slot>\n  </span>\n  <label class=\"mint-button-text\"><slot></slot></label>\n</button>\n";

/***/ }
/******/ ]);