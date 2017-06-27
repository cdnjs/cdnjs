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
/******/ 	return __webpack_require__(__webpack_require__.s = 400);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
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

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach((function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    }))
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
exports.default = {
  props: {
    mdTheme: String
  },
  data: function data() {
    return {
      closestThemedParent: false
    };
  },
  methods: {
    getClosestThemedParent: function getClosestThemedParent($parent) {
      if (!$parent || !$parent.$el || $parent._uid === 0) {
        return false;
      }

      if ($parent.mdTheme || $parent.mdName) {
        return $parent;
      }

      return this.getClosestThemedParent($parent.$parent);
    }
  },
  computed: {
    themeClass: function themeClass() {
      if (this.mdTheme) {
        return 'md-theme-' + this.mdTheme;
      }

      var theme = this.closestThemedParent.mdTheme;

      if (!theme) {
        if (this.closestThemedParent) {
          theme = this.closestThemedParent.mdName;
        } else {
          theme = this.$material.currentTheme;
        }
      }

      return 'md-theme-' + theme;
    }
  },
  mounted: function mounted() {
    this.closestThemedParent = this.getClosestThemedParent(this.$parent);

    if (!this.$material.currentTheme) {
      this.$material.setCurrentTheme('default');
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    href: String,
    target: String,
    rel: String,
    type: {
      type: String,
      default: 'button'
    },
    disabled: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    newRel: function newRel() {
      if (this.target === '_blank') {
        return this.rel || 'noopener';
      }

      return this.rel;
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

module.exports = exports['default'];

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 235:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button) {\n  color: BACKGROUND-CONTRAST;\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button):hover {\n    background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised) {\n  color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-button:not([disabled]).md-fab {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button:not([disabled]).md-fab:hover {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME.md-button:not([disabled]).md-fab.md-clean {\n    color: BACKGROUND-CONTRAST;\n    background-color: BACKGROUND-COLOR; }\n    .THEME_NAME.md-button:not([disabled]).md-fab.md-clean:hover {\n      background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary:not(.md-icon-button) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-raised, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab:hover {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent:not(.md-icon-button) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-raised {\n  background-color: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-accent.md-raised:hover {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn:not(.md-icon-button) {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-raised, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab {\n  background-color: WARN-COLOR;\n  color: WARN-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab:hover {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised) {\n  color: WARN-COLOR; }\n"

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(223)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(381),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdButton/mdButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key !== "__esModule"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6dc87da4", Component.options)
  } else {
    hotAPI.reload("data-v-6dc87da4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.href) ? _c('button', {
    staticClass: "md-button",
    class: [_vm.themeClass],
    attrs: {
      "type": _vm.type,
      "disabled": _vm.disabled
    }
  }, [_c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _vm._t("default")], 2) : _c('a', {
    staticClass: "md-button",
    class: [_vm.themeClass],
    attrs: {
      "href": _vm.href,
      "disabled": _vm.disabled,
      "target": _vm.target,
      "rel": _vm.newRel
    }
  }, [_c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6dc87da4", module.exports)
  }
}

/***/ }),

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(93);


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdButton = __webpack_require__(264);

var _mdButton2 = _interopRequireDefault(_mdButton);

var _mdButton3 = __webpack_require__(235);

var _mdButton4 = _interopRequireDefault(_mdButton3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-button', _mdButton2.default);

  Vue.material.styles.push(_mdButton4.default);
}
module.exports = exports['default'];

/***/ })

/******/ });
}));