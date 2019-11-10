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
/******/ 	return __webpack_require__(__webpack_require__.s = 219);
/******/ })
/************************************************************************/
/******/ ({

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(99)

/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(170)
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

/***/ 170:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('transition', {
    attrs: {
      "name": "mint-indicator"
    }
  }, [_h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (visible),
      expression: "visible"
    }],
    staticClass: "mint-indicator"
  }, [_h('div', {
    staticClass: "mint-indicator-wrapper",
    style: ({
      'padding': text ? '20px' : '15px'
    })
  }, [_h('spinner', {
    staticClass: "mint-indicator-spin",
    attrs: {
      "type": convertedSpinnerType,
      "size": 32
    }
  }), " ", _h('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (text),
      expression: "text"
    }],
    staticClass: "mint-indicator-text"
  }, [_s(text)])]), " ", _h('div', {
    staticClass: "mint-indicator-mask",
    on: {
      "touchmove": function($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  })])])
}},staticRenderFns: []}

/***/ },

/***/ 203:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/spinner");

/***/ },

/***/ 204:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/spinner/style.css");

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Indicator = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(139));
var instance;
var timer;

module.exports = {
  open: function open(options) {
    if ( options === void 0 ) options = {};

    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text || '';
    instance.spinnerType = options.spinnerType || 'snake';
    document.body.appendChild(instance.$el);
    if (timer) {
      clearTimeout(timer);
    }

    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.nextTick(function () {
      instance.visible = true;
    });
  },

  close: function close() {
    if (instance) {
      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.nextTick(function () {
        instance.visible = false;
        timer = setTimeout(function () {
          if (instance.$el) {
            instance.$el.style.display = 'none';
          }
        }, 400);
      });
    }
  }
};


/***/ },

/***/ 6:
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_spinner_index_js__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_spinner_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_spinner_index_js__);
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


if (true) {
  __webpack_require__(204);
}

/* harmony default export */ exports["default"] = {
  data: function data() {
    return {
      visible: false
    };
  },

  components: {
    Spinner: __WEBPACK_IMPORTED_MODULE_0_mint_ui_packages_spinner_index_js___default.a
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

/***/ 99:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }

/******/ });