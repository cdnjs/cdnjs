(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("moment"), require("eonasdan-bootstrap-datetimepicker"));
	else if(typeof define === 'function' && define.amd)
		define("VueBootstrapDatetimePicker", ["jquery", "moment", "eonasdan-bootstrap-datetimepicker"], factory);
	else if(typeof exports === 'object')
		exports["VueBootstrapDatetimePicker"] = factory(require("jquery"), require("moment"), require("eonasdan-bootstrap-datetimepicker"));
	else
		root["VueBootstrapDatetimePicker"] = factory(root["jquery"], root["moment"], root["eonasdan-bootstrap-datetimepicker"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "eonasdan-bootstrap-datetimepicker"
var external__eonasdan_bootstrap_datetimepicker_ = __webpack_require__(4);
var external__eonasdan_bootstrap_datetimepicker__default = /*#__PURE__*/__webpack_require__.n(external__eonasdan_bootstrap_datetimepicker_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/component.vue
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//

var jQuery = window.jQuery || __webpack_require__(2);
var moment = window.moment || __webpack_require__(3);


// You have to import css yourself

// Events list without prefix
// http://eonasdan.github.io/bootstrap-datetimepicker/Events/
var events = ['hide', 'show', 'change', 'error', 'update'];

/* harmony default export */ var component = ({
  name: 'date-picker',
  props: {
    value: {
      default: null,
      required: true,
      validator: function validator(value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof moment;
      }
    },
    // http://eonasdan.github.io/bootstrap-datetimepicker/Options/
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /**
     * You can set this to true when component is wrapped in input-group
     * Note: inline and wrap mode wont work together
     */
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      dp: null,
      // jQuery DOM
      elem: null
    };
  },
  mounted: function mounted() {
    // Return early if date-picker is already loaded
    /* istanbul ignore if */
    if (this.dp) return;
    // Handle wrapped input
    var node = this.wrap ? this.$el.parentNode : this.$el;
    // Cache DOM
    this.elem = jQuery(node);
    // Init date-picker
    this.elem.datetimepicker(this.config);
    // Store data control
    this.dp = this.elem.data('DateTimePicker');
    // Set initial value
    this.dp.date(this.value);
    // Watch for changes
    this.elem.on('dp.change', this.onChange);
    // Register remaining events
    this.registerEvents();
  },

  watch: {
    /**
     * Listen to change from outside of component and update DOM
     *
     * @param newValue
     */
    value: function value(newValue) {
      this.dp && this.dp.date(newValue || null);
    },


    /**
     * Watch for any change in options and set them
     *
     * @param newConfig Object
     */
    config: {
      deep: true,
      handler: function handler(newConfig) {
        this.dp && this.dp.options(_extends({}, this.dp.options(), newConfig));
      }
    }
  },
  methods: {
    /**
     * Update v-model upon change triggered by date-picker itself
     *
     * @param event
     */
    onChange: function onChange(event) {
      var formattedDate = event.date ? event.date.format(this.dp.format()) : null;
      this.$emit('input', formattedDate);
    },


    /**
     * Emit all available events
     */
    registerEvents: function registerEvents() {
      var _this = this;

      events.forEach(function (name) {
        _this.elem.on("dp." + name, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, ["dp-" + name].concat(args));
        });
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    // Free up memory
    /* istanbul ignore else */
    if (this.dp) {
      this.dp.destroy();
      this.dp = null;
      this.elem = null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5f30a7f6","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/component.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.config.inline)?_c('div',{staticClass:"datetimepicker-inline"}):_c('input',{staticClass:"form-control",attrs:{"type":"text"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_component = (esExports);
// CONCATENATED MODULE: ./src/component.vue
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  component,
  selectortype_template_index_0_src_component,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_component = (Component.exports);

// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatetimePickerPlugin", function() { return src_DatetimePickerPlugin; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "component", function() { return src_component; });


var src_DatetimePickerPlugin = function DatetimePickerPlugin(Vue, params) {
  var name = 'date-picker';
  /* istanbul ignore else */
  if (typeof params === 'string') name = params;

  Vue.component(name, src_component);
};

src_component.install = src_DatetimePickerPlugin;

/* harmony default export */ var src = __webpack_exports__["default"] = (src_component);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ })
/******/ ]);
});