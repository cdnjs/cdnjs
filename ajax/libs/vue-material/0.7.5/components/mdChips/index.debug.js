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
/******/ 	return __webpack_require__(__webpack_require__.s = 454);
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

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'md-chip',
  props: {
    disabled: Boolean,
    mdDeletable: Boolean,
    mdEditable: Boolean
  },
  mixins: [_mixin2.default],
  computed: {
    classes: function classes() {
      return {
        'md-deletable': this.mdDeletable,
        'md-disabled': this.disabled,
        'md-editable': this.mdEditable
      };
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
//
//

module.exports = exports['default'];

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _uniqueId = __webpack_require__(36);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = {
  name: 'md-chips',
  props: {
    value: Array,
    disabled: Boolean,
    debounce: {
      type: Number,
      default: 1E2
    },
    mdInputId: String,
    mdInputName: String,
    mdInputPlaceholder: String,
    mdInputType: {
      type: String,
      default: 'text'
    },
    mdStatic: Boolean,
    mdMax: {
      type: Number,
      default: Infinity
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      currentChip: null,
      selectedChips: this.value,
      inputId: this.mdInputId || 'chips-' + (0, _uniqueId2.default)()
    };
  },

  watch: {
    value: function value(_value) {
      this.selectedChips = _value;
    }
  },
  computed: {
    classes: function classes() {
      return {
        'md-static': this.mdStatic,
        'md-disabled': this.disabled,
        'md-chips': true
      };
    }
  },
  methods: {
    applyInputFocus: function applyInputFocus() {
      var _this = this;

      this.$nextTick((function () {
        _this.$refs.input.$el.focus();
      }));
    },
    addChip: function addChip() {
      if (this.currentChip && this.selectedChips.length < this.mdMax) {
        var value = this.currentChip.trim();

        if (this.selectedChips.indexOf(value) < 0) {
          this.selectedChips.push(value);
          this.currentChip = null;
          this.$emit('input', this.selectedChips);
          this.$emit('change', this.selectedChips);
          this.applyInputFocus();
        }
      }
    },
    deleteChip: function deleteChip(chip) {
      var index = this.selectedChips.indexOf(chip);

      if (index >= 0) {
        this.selectedChips.splice(index, 1);
      }

      this.$emit('change', this.selectedChips);
      this.applyInputFocus();
    },
    editChip: function editChip(chip) {
      var index = this.selectedChips.indexOf(chip);

      if (index >= 0) {
        this.selectedChips.splice(index, 1);
      }

      this.currentChip = chip;
      this.$emit('change', this.selectedChips);
      this.applyInputFocus();
    },
    deleteLastChip: function deleteLastChip() {
      if (!this.currentChip) {
        this.selectedChips.pop();
        this.$emit('change', this.selectedChips);
        this.applyInputFocus();
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-chip {\n  background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-chip.md-deletable:hover, .THEME_NAME.md-chip.md-deletable:focus, .THEME_NAME.md-chip.md-editable:hover, .THEME_NAME.md-chip.md-editable:focus {\n    background-color: BACKGROUND-CONTRAST-0.54;\n    color: BACKGROUND-COLOR; }\n    .THEME_NAME.md-chip.md-deletable:hover .md-delete, .THEME_NAME.md-chip.md-deletable:focus .md-delete, .THEME_NAME.md-chip.md-editable:hover .md-delete, .THEME_NAME.md-chip.md-editable:focus .md-delete {\n      color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-chip .md-delete {\n    color: BACKGROUND-CONTRAST-0.38; }\n    .THEME_NAME.md-chip .md-delete .md-ripple {\n      color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-chip.md-primary {\n    color: PRIMARY-CONTRAST;\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-chip.md-accent {\n    color: ACCENT-CONTRAST;\n    background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-chip.md-warn {\n    color: WARN-CONTRAST;\n    background-color: WARN-COLOR; }\n"

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(143),
  /* template */
  __webpack_require__(396),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdChips/mdChip.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdChip.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c2a829d", Component.options)
  } else {
    hotAPI.reload("data-v-2c2a829d", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(250)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(144),
  /* template */
  __webpack_require__(418),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdChips/mdChips.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdChips.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5cd17226", Component.options)
  } else {
    hotAPI.reload("data-v-5cd17226", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var uniqueId = function uniqueId() {
  return Math.random().toString(36).slice(4);
};

exports.default = uniqueId;
module.exports = exports["default"];

/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-chip",
    class: [_vm.themeClass, _vm.classes],
    attrs: {
      "tabindex": "0"
    }
  }, [_c('div', {
    staticClass: "md-chip-container",
    on: {
      "click": function($event) {
        !_vm.disabled && _vm.mdEditable && _vm.$emit('edit')
      }
    }
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.mdDeletable) ? _c('md-button', {
    staticClass: "md-icon-button md-dense md-delete",
    attrs: {
      "tabindex": "-1"
    },
    on: {
      "click": function($event) {
        !_vm.disabled && _vm.$emit('delete')
      }
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        !_vm.disabled && _vm.$emit('delete')
      }
    }
  }, [_c('md-icon', {
    staticClass: "md-icon-delete"
  }, [_vm._v("cancel")])], 1) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c2a829d", module.exports)
  }
}

/***/ }),

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('md-input-container', {
    staticClass: "md-chips",
    class: [_vm.themeClass, _vm.classes],
    on: {
      "click": _vm.applyInputFocus
    }
  }, [_vm._l((_vm.selectedChips), (function(chip) {
    return _c('md-chip', {
      key: chip,
      attrs: {
        "md-editable": !_vm.mdStatic,
        "md-deletable": !_vm.mdStatic,
        "disabled": _vm.disabled
      },
      on: {
        "edit": function($event) {
          _vm.editChip(chip)
        },
        "delete": function($event) {
          _vm.deleteChip(chip)
        }
      }
    }, [_vm._t("chip", [_vm._v(_vm._s(chip))], {
      value: chip
    })], 2)
  })), _vm._v(" "), _c('md-input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.mdStatic),
      expression: "!mdStatic"
    }],
    ref: "input",
    attrs: {
      "type": _vm.mdInputType,
      "placeholder": _vm.mdInputPlaceholder,
      "id": _vm.inputId,
      "name": _vm.mdInputName,
      "disabled": _vm.disabled,
      "tabindex": "0",
      "debounce": 0
    },
    nativeOn: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
        _vm.deleteLastChip($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addChip($event)
      }, function($event) {
        if (!('button' in $event) && $event.keyCode !== 186) { return null; }
        $event.preventDefault();
        _vm.addChip($event)
      }]
    },
    model: {
      value: (_vm.currentChip),
      callback: function($$v) {
        _vm.currentChip = $$v
      },
      expression: "currentChip"
    }
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5cd17226", module.exports)
  }
}

/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(87);


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdChips = __webpack_require__(314);

var _mdChips2 = _interopRequireDefault(_mdChips);

var _mdChip = __webpack_require__(313);

var _mdChip2 = _interopRequireDefault(_mdChip);

var _mdChips3 = __webpack_require__(272);

var _mdChips4 = _interopRequireDefault(_mdChips3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-chips', _mdChips2.default);
  Vue.component('md-chip', _mdChip2.default);

  Vue.material.styles.push(_mdChips4.default);
}
module.exports = exports['default'];

/***/ })

/******/ });
}));