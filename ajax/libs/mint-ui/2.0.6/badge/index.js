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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 208);
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(100)

/* script */
__vue_exports__ = __webpack_require__(51)

/* template */
var __vue_template__ = __webpack_require__(171)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_badge_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_badge_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_badge_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_badge_vue___default.a;


/***/ },

/***/ 171:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _h('span', {
    staticClass: "mint-badge",
    class: ['is-' + _vm.type, 'is-size-' + _vm.size],
    style: ({
      backgroundColor: _vm.color
    })
  }, [_vm._t("default")])
},staticRenderFns: []}

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/**
 * mt-badge
 * @module components/badge
 * @desc 徽章
 * @param {string} [type=primary] 组件样式，可选 primary, error, success, warning
 * @param {string} [color] - 传入颜色值
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 *
 * @example
 * <mt-badge color="error">错误</mt-badge>
 * <mt-badge color="#333">30</mt-badge>
 */
/* harmony default export */ exports["default"] = {
  name: 'mt-badge',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
};


/***/ }

/******/ });