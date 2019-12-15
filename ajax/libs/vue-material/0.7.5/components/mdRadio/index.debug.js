(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, (function() {
return /******/ (function(modules) { // webpackBootstrap
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

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 466);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Theme mixin

// Grab the closest ancestor component's `md-theme` attribute OR grab the
// `md-name` attribute from an `<md-theme>` component.
function getAncestorThemeName(component) {
  if (!component) {
    return null;
  }

  var name = component.mdTheme;

  if (!name && component.$options._componentTag === 'md-theme') {
    name = component.mdName;
  }

  return name || getAncestorThemeName(component.$parent);
}

exports.default = {
  props: {
    mdTheme: String
  },
  computed: {
    mdEffectiveTheme: function mdEffectiveTheme() {
      return getAncestorThemeName(this) || this.$material.currentTheme;
    },
    themeClass: function themeClass() {
      return this.$material.prefix + this.mdEffectiveTheme;
    }
  },
  watch: {
    mdTheme: function mdTheme(value) {
      this.$material.useTheme(value);
    }
  },
  beforeMount: function beforeMount() {
    var localTheme = this.mdTheme;

    this.$material.useTheme(localTheme ? localTheme : 'default');
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-radio',
  props: {
    name: String,
    id: String,
    value: [String, Boolean, Number],
    mdValue: {
      type: [String, Boolean, Number],
      required: true
    },
    disabled: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return {
        'md-checked': typeof this.value !== 'undefined' && this.value !== null && this.mdValue.toString() === this.value.toString(),
        'md-disabled': this.disabled
      };
    }
  },
  methods: {
    toggleCheck: function toggleCheck($event) {
      if (!this.disabled) {
        this.$emit('change', this.mdValue, $event);
        this.$emit('input', this.mdValue, $event);
      }
    }
  }
}; //
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

module.exports = exports['default'];

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 282:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(230)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(375),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdRadio/mdRadio.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdRadio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-079386ce", Component.options)
  } else {
    hotAPI.reload("data-v-079386ce", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-radio",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-radio-container",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.toggleCheck($event)
      }
    }
  }, [_c('input', {
    attrs: {
      "type": "radio",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    }
  }), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  })], 1), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
    staticClass: "md-radio-label",
    attrs: {
      "for": _vm.id || _vm.name
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleCheck($event)
      }
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-079386ce", module.exports)
  }
}

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(99);


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdRadio = __webpack_require__(344);

var _mdRadio2 = _interopRequireDefault(_mdRadio);

var _mdRadio3 = __webpack_require__(282);

var _mdRadio4 = _interopRequireDefault(_mdRadio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-radio', _mdRadio2.default);

  Vue.material.styles.push(_mdRadio4.default);
}
module.exports = exports['default'];

/***/ })

/******/ });
}));