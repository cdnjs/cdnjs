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
/******/ 	return __webpack_require__(__webpack_require__.s = 207);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 109:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(109)

/* script */
__vue_exports__ = __webpack_require__(50)

/* template */
var __vue_template__ = __webpack_require__(180)
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

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_actionsheet_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_actionsheet_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_actionsheet_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_actionsheet_vue___default.a;


/***/ },

/***/ 180:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
  return _h('transition', {
    attrs: {
      "name": "actionsheet-float"
    }
  }, [_h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentValue),
      expression: "currentValue"
    }],
    staticClass: "mint-actionsheet"
  }, [_h('ul', {
    staticClass: "mint-actionsheet-list",
    style: ({
      'margin-bottom': _vm.cancelText ? '5px' : '0'
    })
  }, [_vm._l((_vm.actions), function(item) {
    return _h('li', {
      staticClass: "mint-actionsheet-listitem",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.itemClick(item)
        }
      }
    }, [_vm._s(item.name)])
  })]), " ", (_vm.cancelText) ? _h('a', {
    staticClass: "mint-actionsheet-button",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.currentValue = false
      }
    }
  }, [_vm._s(_vm.cancelText)]) : _vm._e()])])
},staticRenderFns: []}

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ },

/***/ 5:
/***/ function(module, exports) {

module.exports = require("vue-popup");

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_popup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ exports["default"] = {
  name: 'mt-actionsheet',

  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_popup___default.a],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    cancelText: {
      type: String,
      default: '取消'
    },

    actions: {
      type: Array,
      default: function () { return []; }
    }
  },

  data: function data() {
    return {
      currentValue: false
    };
  },

  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    },

    value: function value(val) {
      this.currentValue = val;
    }
  },

  methods: {
    itemClick: function itemClick(item) {
      if (item.method && typeof item.method === 'function') {
        item.method();
      }
      this.currentValue = false;
    }
  },

  mounted: function mounted() {
    if (this.value) {
      this.rendered = true;
      this.currentValue = true;
      this.open();
    }
  }
};


/***/ }

/******/ });