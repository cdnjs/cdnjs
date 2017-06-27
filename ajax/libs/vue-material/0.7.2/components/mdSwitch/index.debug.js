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
/******/ 	return __webpack_require__(__webpack_require__.s = 475);
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

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSwitch = __webpack_require__(356);

var _mdSwitch2 = _interopRequireDefault(_mdSwitch);

var _mdSwitch3 = __webpack_require__(291);

var _mdSwitch4 = _interopRequireDefault(_mdSwitch3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-switch', _mdSwitch2.default);

  Vue.material.styles.push(_mdSwitch4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkedPosition = 75; //
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

var initialPosition = '-1px';

exports.default = {
  name: 'md-switch',
  props: {
    name: String,
    value: Boolean,
    id: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'button'
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      leftPos: initialPosition,
      checked: Boolean(this.value)
    };
  },

  computed: {
    classes: function classes() {
      return {
        'md-checked': this.checked,
        'md-disabled': this.disabled
      };
    },
    styles: function styles() {
      return {
        transform: 'translate3D(' + this.leftPos + ', -50%, 0)'
      };
    }
  },
  watch: {
    checked: function checked() {
      this.setPosition();
    },
    value: function value(_value) {
      this.changeState(_value);
    }
  },
  methods: {
    setPosition: function setPosition() {
      this.leftPos = this.checked ? checkedPosition + '%' : initialPosition;
    },
    changeState: function changeState(checked, $event) {
      if (typeof $event !== 'undefined') {
        this.$emit('change', checked, $event);

        if (!$event.defaultPrevented) {
          this.checked = checked;
        }
        this.$emit('input', this.checked, $event);
      } else {
        this.checked = checked;
      }
    },
    toggle: function toggle($event) {
      if (!this.disabled) {
        this.changeState(!this.checked, $event);
      }
    }
  },
  mounted: function mounted() {
    this.$nextTick(this.setPosition);
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 255:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-switch.md-checked .md-switch-container {\n  background-color: ACCENT-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked .md-switch-thumb {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-container {\n  background-color: PRIMARY-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-thumb {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-container {\n  background-color: WARN-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-thumb {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-container, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-container {\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-thumb, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-thumb {\n  background-color: #bdbdbd; }\n"

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(255)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(432),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdSwitch/mdSwitch.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSwitch.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c623fe4", Component.options)
  } else {
    hotAPI.reload("data-v-7c623fe4", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-switch",
    class: [_vm.themeClass, _vm.classes]
  }, [_c('div', {
    staticClass: "md-switch-container",
    on: {
      "click": function($event) {
        _vm.toggle($event)
      }
    }
  }, [_c('div', {
    staticClass: "md-switch-thumb",
    style: (_vm.styles)
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "name": _vm.name,
      "id": _vm.id,
      "disabled": _vm.disabled,
      "tabindex": "-1"
    },
    domProps: {
      "value": _vm.value
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "md-switch-holder",
    attrs: {
      "type": _vm.type
    }
  }), _vm._v(" "), _c('md-ink-ripple', {
    attrs: {
      "md-disabled": _vm.disabled
    }
  })], 1)]), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
    staticClass: "md-switch-label",
    attrs: {
      "for": _vm.id || _vm.name
    }
  }, [_vm._t("default")], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7c623fe4", module.exports)
  }
}

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(108);


/***/ })

/******/ });
}));