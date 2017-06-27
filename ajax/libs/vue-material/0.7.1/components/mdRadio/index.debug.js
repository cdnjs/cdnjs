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
/******/ 	return __webpack_require__(__webpack_require__.s = 415);
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

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdRadio = __webpack_require__(305);

var _mdRadio2 = _interopRequireDefault(_mdRadio);

var _mdRadio3 = __webpack_require__(248);

var _mdRadio4 = _interopRequireDefault(_mdRadio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-radio', _mdRadio2.default);

  Vue.material.styles.push(_mdRadio4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 167:
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
        'md-checked': typeof this.value !== 'undefined' && this.mdValue.toString() === this.value.toString(),
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

/***/ 201:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(201)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(332),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdRadio/mdRadio.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key !== "__esModule"}))) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-radio",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-radio-container",
    on: {
      "click": _vm.toggleCheck
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

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(108);


/***/ })

/******/ });
}));