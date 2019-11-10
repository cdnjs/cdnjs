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

	module.exports = __webpack_require__(42);


/***/ },

/***/ 38:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(43);

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(44)
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/checklist/src/checklist.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(47)
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

/***/ 44:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(38);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  __webpack_require__(40);
	}

	exports.default = {
	  name: 'mt-checklist',

	  props: {
	    max: Number,
	    title: String,
	    align: String,
	    options: {
	      type: Array,
	      required: true
	    },
	    value: Array
	  },

	  components: {
	    XCell: _index2.default
	  },

	  computed: {
	    limit: function limit() {
	      return this.max < this.value.length;
	    }
	  },

	  watch: {
	    value: function value() {
	      if (this.limit) {
	        this.value.pop();
	      }
	    }
	  }
	};

/***/ },

/***/ 47:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-checklist\" :class=\"{ 'is-limit': max <= value.length }\">\n  <label class=\"mint-checklist-title\" v-text=\"title\"></label>\n  <x-cell v-for=\"option in options\">\n    <label class=\"mint-checklist-label\" slot=\"title\">\n      <span\n        :class=\"{'is-right': align === 'right'}\"\n        class=\"mint-checkbox\">\n        <input\n          class=\"mint-checkbox-input\"\n          type=\"checkbox\"\n          v-model=\"value\"\n          :disabled=\"option.disabled\"\n          :value=\"option.value || option\">\n          <span class=\"mint-checkbox-core\"></span>\n      </span>\n      <span class=\"mint-checkbox-label\" v-text=\"option.label || option\"></span>\n    </label>\n  </x-cell>\n</div>\n";

/***/ }

/******/ });