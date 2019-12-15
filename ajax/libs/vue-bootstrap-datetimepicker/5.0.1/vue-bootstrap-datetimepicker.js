(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("moment"), require("pc-bootstrap4-datetimepicker"));
	else if(typeof define === 'function' && define.amd)
		define("VueBootstrapDatetimePicker", ["jquery", "moment", "pc-bootstrap4-datetimepicker"], factory);
	else if(typeof exports === 'object')
		exports["VueBootstrapDatetimePicker"] = factory(require("jquery"), require("moment"), require("pc-bootstrap4-datetimepicker"));
	else
		root["VueBootstrapDatetimePicker"] = factory(root["jQuery"], root["moment"], root["pc-bootstrap4-datetimepicker"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/component.vue?vue&type=template&id=cb93df46&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.config.inline)?_c('div',{staticClass:"datetimepicker-inline"}):_c('input',{staticClass:"form-control",attrs:{"type":"text"}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/component.vue?vue&type=template&id=cb93df46&

// EXTERNAL MODULE: external {"commonjs":"jquery","commonjs2":"jquery","amd":"jquery","root":"jQuery"}
var external_commonjs_jquery_commonjs2_jquery_amd_jquery_root_jQuery_ = __webpack_require__(0);
var external_commonjs_jquery_commonjs2_jquery_amd_jquery_root_jQuery_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_jquery_commonjs2_jquery_amd_jquery_root_jQuery_);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(1);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "pc-bootstrap4-datetimepicker"
var external_pc_bootstrap4_datetimepicker_ = __webpack_require__(2);

// CONCATENATED MODULE: ./src/events.js
// Events list without prefix
// http://eonasdan.github.io/bootstrap-datetimepicker/Events/
/* harmony default export */ var events = (['hide', 'show', 'change', 'error', 'update']);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/component.vue?vue&type=script&lang=js&
//
//
//
//
//





// You have to import css yourself



/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'date-picker',
  props: {
    value: {
      default: null,
      required: true,
      validator: function validator(value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof external_moment_default.a;
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
    this.elem = external_commonjs_jquery_commonjs2_jquery_amd_jquery_root_jQuery_default()(this.wrap ? this.$el.parentNode : this.$el);
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
        this.dp && this.dp.options(newConfig);
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
        _this.elem.on('dp.' + name, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, ['dp-' + name].concat(args));
        });
      });
    }
  },
  /**
   * Free up memory
   */
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore else */
    if (this.dp) {
      this.dp.destroy();
      this.dp = null;
      this.elem = null;
    }
  }
});
// CONCATENATED MODULE: ./src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/component.vue





/* normalize component */

var component = normalizeComponent(
  src_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "component.vue"
/* harmony default export */ var src_component = (component.exports);
// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plugin", function() { return src_Plugin; });
/* concated harmony reexport Component */__webpack_require__.d(__webpack_exports__, "Component", function() { return src_component; });


var src_Plugin = function Plugin(Vue, params) {
  var name = 'date-picker';
  /* istanbul ignore else */
  if (typeof params === 'string') name = params;

  Vue.component(name, src_component);
};

src_component.install = src_Plugin;

/* harmony default export */ var src = __webpack_exports__["default"] = (src_component);


/***/ })
/******/ ])["default"];
});