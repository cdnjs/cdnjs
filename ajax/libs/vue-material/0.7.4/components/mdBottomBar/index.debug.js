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
/******/ 	return __webpack_require__(__webpack_require__.s = 449);
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

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-bottom-bar',
  props: {
    mdShift: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return this.mdShift ? 'md-shift' : 'md-fixed';
    }
  },
  methods: {
    setActive: function setActive(item) {
      this.$children.forEach((function (child) {
        child.active = child === item;
      }));

      this.$emit('change', this.$children.findIndex((function (i) {
        return i === item;
      })));
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

module.exports = exports['default'];

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = {
  name: 'md-bottom-bar-item',
  props: {
    mdIcon: String,
    mdIconSrc: String,
    mdIconset: String,
    mdActive: Boolean,
    disabled: Boolean,
    href: String
  },
  data: function data() {
    return {
      active: false
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-active': this.active
      };
    }
  },
  watch: {
    mdActive: function mdActive(active) {
      this.setActive(active);
    }
  },
  methods: {
    setActive: function setActive(active, $event) {
      if (active) {
        this.$parent.setActive(this);
      }

      if ($event) {
        this.$emit('click', $event);
      }
    }
  },
  mounted: function mounted() {
    if (!this.$parent.$el.classList.contains('md-bottom-bar')) {
      this.$destroy();

      throw new Error('You should wrap the md-bottom-bar-item in a md-bottom-bar');
    }

    if (this.mdActive) {
      this.active = true;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 234:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 267:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-bottom-bar.md-fixed {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item:hover:not([disabled]):not(.md-active) {\n      color: BACKGROUND-CONTRAST-0.87; }\n    .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item.md-active {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-accent .md-bottom-bar-item.md-active {\n    color: ACCENT-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-warn .md-bottom-bar-item.md-active {\n    color: WARN-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-transparent .md-bottom-bar-item.md-active {\n    color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-bottom-bar.md-shift {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item:hover:not([disabled]):not(.md-active) {\n      color: PRIMARY-CONTRAST-0.87; }\n    .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item.md-active {\n      color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-accent {\n    background-color: ACCENT-COLOR; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item {\n      color: ACCENT-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item:hover:not([disabled]):not(.md-active) {\n        color: ACCENT-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item.md-active {\n        color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-warn {\n    background-color: WARN-COLOR; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item {\n      color: WARN-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item:hover:not([disabled]):not(.md-active) {\n        color: WARN-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item.md-active {\n        color: WARN-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-transparent {\n    background-color: transparent; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item {\n      color: BACKGROUND-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item:hover:not([disabled]):not(.md-active) {\n        color: BACKGROUND-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item.md-active {\n        color: BACKGROUND-CONTRAST; }\n"

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(234)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(386),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdBottomBar/mdBottomBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdBottomBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-197179a8", Component.options)
  } else {
    hotAPI.reload("data-v-197179a8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(129),
  /* template */
  __webpack_require__(388),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdBottomBar/mdBottomBarItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdBottomBarItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b798f5b", Component.options)
  } else {
    hotAPI.reload("data-v-1b798f5b", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 386:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-bottom-bar",
    class: [_vm.themeClass, _vm.classes]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-197179a8", module.exports)
  }
}

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.href) ? _c('a', {
    staticClass: "md-bottom-bar-item",
    class: _vm.classes,
    attrs: {
      "href": _vm.href,
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.setActive(true, $event)
      }
    }
  }, [(_vm.mdIcon || _vm.mdIconSrc || _vm.mdIconset) ? _c('md-icon', {
    attrs: {
      "md-src": _vm.mdIconSrc,
      "md-iconset": _vm.mdIconset
    }
  }, [_vm._v(_vm._s(_vm.mdIcon))]) : _vm._e(), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "md-text"
  }, [_vm._t("default")], 2)], 1) : _c('button', {
    staticClass: "md-bottom-bar-item",
    class: _vm.classes,
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.setActive(true, $event)
      }
    }
  }, [(_vm.mdIcon || _vm.mdIconSrc || _vm.mdIconset) ? _c('md-icon', {
    attrs: {
      "md-src": _vm.mdIconSrc,
      "md-iconset": _vm.mdIconset
    }
  }, [_vm._v(_vm._s(_vm.mdIcon))]) : _vm._e(), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "md-text"
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1b798f5b", module.exports)
  }
}

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(82);


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdBottomBar = __webpack_require__(298);

var _mdBottomBar2 = _interopRequireDefault(_mdBottomBar);

var _mdBottomBarItem = __webpack_require__(299);

var _mdBottomBarItem2 = _interopRequireDefault(_mdBottomBarItem);

var _mdBottomBar3 = __webpack_require__(267);

var _mdBottomBar4 = _interopRequireDefault(_mdBottomBar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-bottom-bar', _mdBottomBar2.default);
  Vue.component('md-bottom-bar-item', _mdBottomBarItem2.default);

  Vue.material.styles.push(_mdBottomBar4.default);
}
module.exports = exports['default'];

/***/ })

/******/ });
}));