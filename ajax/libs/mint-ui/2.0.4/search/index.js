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
/******/ 	return __webpack_require__(__webpack_require__.s = 231);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 105:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(105)

/* script */
__vue_exports__ = __webpack_require__(72)

/* template */
var __vue_template__ = __webpack_require__(176)
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

/***/ 176:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "mint-search"
  }, [_h('div', {
    staticClass: "mint-searchbar"
  }, [_h('div', {
    staticClass: "mint-searchbar-inner"
  }, [_h('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (visible),
      expression: "visible"
    }],
    staticClass: "mintui mintui-search"
  }), " ", _h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (currentValue),
      expression: "currentValue"
    }],
    ref: "input",
    staticClass: "mint-searchbar-core",
    attrs: {
      "type": "search",
      "placeholder": visible ? placeholder : ''
    },
    domProps: {
      "value": _s(currentValue)
    },
    on: {
      "click": function($event) {
        visible = true
      },
      "input": function($event) {
        if ($event.target.composing) return;
        currentValue = $event.target.value
      }
    }
  })]), " ", _h('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (visible),
      expression: "visible"
    }],
    staticClass: "mint-searchbar-cancel",
    domProps: {
      "textContent": _s(cancelText)
    },
    on: {
      "click": function($event) {
        visible = false, currentValue = ''
      }
    }
  }), " ", _h('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!visible),
      expression: "!visible"
    }],
    staticClass: "mint-searchbar-placeholder",
    on: {
      "click": function($event) {
        visible = true, $refs.input.focus()
      }
    }
  }, [_m(0), " ", _h('span', {
    staticClass: "mint-searchbar-text",
    domProps: {
      "textContent": _s(placeholder)
    }
  })])]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (currentValue),
      expression: "currentValue"
    }],
    staticClass: "mint-search-list"
  }, [_h('div', {
    staticClass: "mint-search-list-warp"
  }, [_t("default", [_l((result), function(item) {
    return _h('x-cell', {
      attrs: {
        "track-by": "$index",
        "title": item
      }
    })
  })])])])])
}},staticRenderFns: [function (){with(this) {
  return _h('i', {
    staticClass: "mintui mintui-search"
  })
}}]}

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);


/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_search_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_search_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_search_vue___default.a;


/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js__);
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


if (true) {
  __webpack_require__(1);
}

/**
 * mt-search
 * @module components/search
 * @desc 搜索框
 * @param {string} value - 绑定值
 * @param {string} [cancel-text=取消] - 取消按钮文字
 * @param {string} [placeholder=取消] - 搜索框占位内容
 * @param {string[]} [result] - 结果列表
 * @param {slot} 结果列表
 *
 * @example
 * <mt-search :value.sync="value" :result.sync="result"></mt-search>
 * <mt-search :value.sync="value">
 *   <mt-cell v-for="item in result" :title="item"></mt-cell>
 * </mt-search>
 */
/* harmony default export */ exports["default"] = {
  name: 'mt-search',

  data: function data() {
    return {
      visible: false,
      currentValue: this.value
    };
  },

  components: {
    XCell: __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_cell_index_js___default.a
  },

  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    }
  },

  props: {
    value: String,
    cancelText: {
      default: '取消'
    },
    placeholder: {
      default: '搜索'
    },
    result: Array
  }
};


/***/ }

/******/ });