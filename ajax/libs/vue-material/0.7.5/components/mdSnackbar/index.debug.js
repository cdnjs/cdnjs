(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory(require("vue"));
	else
		root["VueMaterial"] = factory(root["Vue"]);
})(this, (function(__WEBPACK_EXTERNAL_MODULE_445__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 470);
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

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSnackbar = __webpack_require__(349);

var _mdSnackbar2 = _interopRequireDefault(_mdSnackbar);

var _mdSnackbar3 = __webpack_require__(286);

var _mdSnackbar4 = _interopRequireDefault(_mdSnackbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-snackbar', _mdSnackbar2.default);

  Vue.material.styles.push(_mdSnackbar4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(445);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _vue2.default({
  data: function data() {
    return {
      current: null
    };
  }
});

exports.default = manager;
module.exports = exports['default'];

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId = __webpack_require__(36);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _transitionEndEventName = __webpack_require__(42);

var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _manager = __webpack_require__(117);

var _manager2 = _interopRequireDefault(_manager);

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

exports.default = {
  name: 'md-snackbar',
  props: {
    id: [String, Number],
    mdPosition: {
      type: String,
      default: 'bottom center'
    },
    mdDuration: {
      type: [String, Number],
      default: 4000
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      snackbarId: this.id || 'snackbar-' + (0, _uniqueId2.default)(),
      removedSnackBarElementEventName: 'removedSnackBarElement',
      active: false,
      rootElement: {},
      snackbarElement: {},
      directionClass: null,
      closeTimeout: null,
      removedSnackBarElementEvent: null
    };
  },

  computed: {
    classes: function classes() {
      var cssClasses = {
        'md-active': this.active
      };

      this.directionClass = this.mdPosition.replace(/ /g, '-');

      cssClasses['md-position-' + this.directionClass] = true;

      return cssClasses;
    }
  },
  watch: {
    active: function active(_active) {
      var directionClass = 'md-has-toast-' + this.directionClass;
      var toastClass = 'md-has-toast';

      if (_active) {
        document.body.classList.add(directionClass);
        document.body.classList.add(toastClass);
      } else {
        document.body.classList.remove(directionClass);
        document.body.classList.remove(toastClass);
      }
    }
  },
  methods: {
    removeElement: function removeElement() {
      // if we have the element and we don't want it active anymore, remove it
      if (document.body.contains(this.snackbarElement) && !this.active) {
        var activeRipple = this.snackbarElement.querySelector('.md-ripple.md-active');

        if (activeRipple) {
          activeRipple.classList.remove('md-active');
        }

        document.body.removeChild(this.snackbarElement);
      }
      document.dispatchEvent(this.removedSnackBarElementEvent);
    },
    open: function open() {
      if (_manager2.default.current) {
        // we need to wait for the old element to finishing closing before we can open a new one
        document.removeEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
        document.addEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
        _manager2.default.current.close();
        return;
      }

      this.showElementAndStartTimer();
    },
    showElementAndStartTimer: function showElementAndStartTimer() {
      if (document.body.contains(this.snackbarElement)) {
        return;
      }
      document.removeEventListener(this.removedSnackBarElementEventName, this.showElementAndStartTimer);
      _manager2.default.current = this;
      document.body.appendChild(this.snackbarElement);
      if (this.$refs.container !== null && this.$refs.container !== undefined) {
        window.getComputedStyle(this.$refs.container).backgroundColor;
      }
      this.active = true;
      this.$emit('open');
      if (this.mdDuration !== Infinity) {
        this.setCloseTimeout(this.mdDuration);
      }
      this.timeoutStartedAt = Date.now();
    },
    close: function close() {
      var _this = this;

      if (this.$refs.container) {
        //we set the flag to false here, because we need to inform the removeElement method that we really
        // want to remove the element - we're in closing action
        this.active = false;

        var removeElement = function removeElement() {
          document.removeEventListener(_transitionEndEventName2.default, removeElement);
          _this.removeElement();
        };

        _manager2.default.current = null;
        this.$emit('close');
        document.removeEventListener(_transitionEndEventName2.default, removeElement);
        document.addEventListener(_transitionEndEventName2.default, removeElement);
        this.clearCloseTimeout();
        this.pendingDuration = this.mdDuration;
      }
    },
    pauseTimeout: function pauseTimeout() {
      this.pendingDuration = this.pendingDuration - (Date.now() - this.timeoutStartedAt);
      this.timeoutStartedAt = 0;
      this.clearCloseTimeout();
    },
    resumeTimeout: function resumeTimeout() {
      this.timeoutStartedAt = Date.now();
      if (this.pendingDuration === Infinity) {
        return;
      }
      this.setCloseTimeout(this.pendingDuration);
    },
    setCloseTimeout: function setCloseTimeout(delay) {
      this.clearCloseTimeout();
      this.closeTimeout = window.setTimeout(this.close, delay);
    },
    clearCloseTimeout: function clearCloseTimeout() {
      if (!this.closeTimeout) {
        return;
      }
      window.clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.snackbarElement = _this2.$el;
      _this2.snackbarElement.parentNode.removeChild(_this2.snackbarElement);
      _this2.timeoutStartedAt = 0;
      _this2.pendingDuration = _this2.mdDuration;
    }));
    this.removedSnackBarElementEvent = new Event(this.removedSnackBarElementEventName);
  },
  beforeDestroy: function beforeDestroy() {
    this.clearCloseTimeout();
    this.active = false;
    this.removeElement();
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 262:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 286:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME .md-snackbar .md-ink-ripple, .THEME_NAME.md-snackbar .md-ink-ripple {\n  color: #fff; }\n"

/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(262)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(440),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdSnackbar/mdSnackbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSnackbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6cb8878", Component.options)
  } else {
    hotAPI.reload("data-v-b6cb8878", Component.options)
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

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function transitionEndEventName() {
  var el = document.createElement('span');
  var transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (var transition in transitions) {
    if (el.style[transition] !== undefined) {
      return transitions[transition];
    }
  }
}

exports.default = transitionEndEventName();
module.exports = exports['default'];

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-snackbar",
    class: [_vm.themeClass, _vm.classes],
    attrs: {
      "id": _vm.snackbarId
    },
    on: {
      "mouseenter": _vm.pauseTimeout,
      "mouseleave": _vm.resumeTimeout
    }
  }, [_c('div', {
    ref: "container",
    staticClass: "md-snackbar-container"
  }, [_c('div', {
    staticClass: "md-snackbar-content"
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6cb8878", module.exports)
  }
}

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_445__;

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(103);


/***/ })

/******/ });
}));