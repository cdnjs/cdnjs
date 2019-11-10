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
/******/ 	return __webpack_require__(__webpack_require__.s = 461);
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

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//

exports.default = {
  name: 'md-layout',
  props: {
    mdTag: {
      type: String,
      default: 'div'
    },
    mdRow: Boolean,
    mdRowXsmall: Boolean,
    mdRowSmall: Boolean,
    mdRowMedium: Boolean,
    mdRowLarge: Boolean,
    mdRowXlarge: Boolean,
    mdColumn: Boolean,
    mdColumnXsmall: Boolean,
    mdColumnSmall: Boolean,
    mdColumnMedium: Boolean,
    mdColumnLarge: Boolean,
    mdColumnXlarge: Boolean,
    mdHideXsmall: Boolean,
    mdHideSmall: Boolean,
    mdHideMedium: Boolean,
    mdHideLarge: Boolean,
    mdHideXlarge: Boolean,
    mdHideXsmallAndUp: Boolean,
    mdHideSmallAndUp: Boolean,
    mdHideMediumAndUp: Boolean,
    mdHideLargeAndUp: Boolean,
    mdHideXlargeAndUp: Boolean,
    mdGutter: [String, Number, Boolean],
    mdAlign: String,
    mdAlignXsmall: String,
    mdAlignSmall: String,
    mdAlignMedium: String,
    mdAlignLarge: String,
    mdAlignXlarge: String,
    mdVerticalAlign: String,
    mdVerticalAlignXsmall: String,
    mdVerticalAlignSmall: String,
    mdVerticalAlignMedium: String,
    mdVerticalAlignLarge: String,
    mdVerticalAlignXlarge: String,
    mdFlex: [String, Number, Boolean],
    mdFlexXsmall: [String, Number, Boolean],
    mdFlexSmall: [String, Number, Boolean],
    mdFlexMedium: [String, Number, Boolean],
    mdFlexLarge: [String, Number, Boolean],
    mdFlexXlarge: [String, Number, Boolean],
    mdFlexOffset: [String, Number, Boolean],
    mdFlexOffsetXsmall: [String, Number, Boolean],
    mdFlexOffsetSmall: [String, Number, Boolean],
    mdFlexOffsetMedium: [String, Number, Boolean],
    mdFlexOffsetLarge: [String, Number, Boolean],
    mdFlexOffsetXlarge: [String, Number, Boolean]
  },
  computed: {
    classes: function classes() {
      var classes = {
        'md-row': this.mdRow,
        'md-row-xsmall': this.mdRowXsmall,
        'md-row-small': this.mdRowSmall,
        'md-row-medium': this.mdRowMedium,
        'md-row-large': this.mdRowLarge,
        'md-row-xlarge': this.mdRowXlarge,
        'md-column': this.mdColumn,
        'md-column-xsmall': this.mdColumnXsmall,
        'md-column-small': this.mdColumnSmall,
        'md-column-medium': this.mdColumnMedium,
        'md-column-large': this.mdColumnLarge,
        'md-column-xlarge': this.mdColumnXlarge,
        'md-hide-xsmall': this.mdHideXsmall,
        'md-hide-small': this.mdHideSmall,
        'md-hide-medium': this.mdHideMedium,
        'md-hide-large': this.mdHideLarge,
        'md-hide-xlarge': this.mdHideXlarge,
        'md-hide-xsmall-and-up': this.mdHideXsmallAndUp,
        'md-hide-small-and-up': this.mdHideSmallAndUp,
        'md-hide-medium-and-up': this.mdHideMediumAndUp,
        'md-hide-large-and-up': this.mdHideLargeAndUp,
        'md-hide-xlarge-and-up': this.mdHideXlargeAndUp
      };

      if (this.mdGutter) {
        if (typeof this.mdGutter === 'boolean') {
          classes['md-gutter'] = true;
        } else if (this.mdGutter) {
          classes['md-gutter-' + this.mdGutter] = true;
        }
      }

      /* Flex */
      this.generatePropClasses('md-flex', '', 'mdFlex', classes);
      this.generatePropClasses('md-flex', 'xsmall', 'mdFlexXsmall', classes);
      this.generatePropClasses('md-flex', 'small', 'mdFlexSmall', classes);
      this.generatePropClasses('md-flex', 'medium', 'mdFlexMedium', classes);
      this.generatePropClasses('md-flex', 'large', 'mdFlexLarge', classes);
      this.generatePropClasses('md-flex', 'xlarge', 'mdFlexXlarge', classes);

      /* Flex Offset */
      this.generatePropClasses('md-flex-offset', '', 'mdFlexOffset', classes);
      this.generatePropClasses('md-flex-offset', 'xsmall', 'mdFlexOffsetXsmall', classes);
      this.generatePropClasses('md-flex-offset', 'small', 'mdFlexOffsetSmall', classes);
      this.generatePropClasses('md-flex-offset', 'medium', 'mdFlexOffsetMedium', classes);
      this.generatePropClasses('md-flex-offset', 'large', 'mdFlexOffsetLarge', classes);
      this.generatePropClasses('md-flex-offset', 'xlarge', 'mdFlexOffsetXlarge', classes);

      /* Horizontal Alignment */
      this.generatePropClasses('md-align', '', 'mdAlign', classes);
      this.generatePropClasses('md-align', 'xsmall', 'mdAlignXsmall', classes);
      this.generatePropClasses('md-align', 'small', 'mdAlignSmall', classes);
      this.generatePropClasses('md-align', 'medium', 'mdAlignMedium', classes);
      this.generatePropClasses('md-align', 'large', 'mdAlignLarge', classes);
      this.generatePropClasses('md-align', 'xlarge', 'mdAlignXlarge', classes);

      /* Vertical Alignment */
      this.generatePropClasses('md-vertical-align', '', 'mdVerticalAlign', classes);
      this.generatePropClasses('md-vertical-align', 'xsmall', 'mdVerticalAlignXsmall', classes);
      this.generatePropClasses('md-vertical-align', 'small', 'mdVerticalAlignSmall', classes);
      this.generatePropClasses('md-vertical-align', 'medium', 'mdVerticalAlignMedium', classes);
      this.generatePropClasses('md-vertical-align', 'large', 'mdVerticalAlignLarge', classes);
      this.generatePropClasses('md-vertical-align', 'xlarge', 'mdVerticalAlignXlarge', classes);

      return classes;
    }
  },
  methods: {
    generatePropClasses: function generatePropClasses(prop, size, name, object) {
      if (size) {
        size = '-' + size;
      }

      if (this[name]) {
        if (typeof this[name] === 'boolean') {
          if (!this[name]) {
            object[prop + size + '-none'] = true;
          } else {
            object[prop + size] = true;
          }
        } else {
          object[prop + size + '-' + this[name]] = true;
        }
      }
    }
  },
  render: function render(createElement) {
    return createElement(this.mdTag, {
      staticClass: 'md-layout',
      class: this.classes
    }, this.$slots.default);
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 259:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(259)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(160),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdLayout/mdLayout.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a85016b8", Component.options)
  } else {
    hotAPI.reload("data-v-a85016b8", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 461:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(94);


/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdLayout = __webpack_require__(330);

var _mdLayout2 = _interopRequireDefault(_mdLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-layout', _mdLayout2.default);
}
module.exports = exports['default'];

/***/ })

/******/ });
}));