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
/******/ 	return __webpack_require__(__webpack_require__.s = 419);
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

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdSpeedDial = __webpack_require__(310);

var _mdSpeedDial2 = _interopRequireDefault(_mdSpeedDial);

var _mdSpeedDial3 = __webpack_require__(252);

var _mdSpeedDial4 = _interopRequireDefault(_mdSpeedDial3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-speed-dial', _mdSpeedDial2.default);

  Vue.material.styles.push(_mdSpeedDial4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 172:
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
    mdOpen: {
      type: String,
      default: 'click'
    },
    mdMode: {
      type: String,
      default: 'fling'
    },
    mdDirection: {
      type: String,
      default: 'top'
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      fabTrigger: null,
      active: false
    };
  },
  computed: {
    classes: function classes() {
      var classes = {
        'md-active': this.active
      };

      classes['md-mode-' + this.mdMode] = true;
      classes['md-direction-' + this.mdDirection] = true;

      return classes;
    }
  },
  methods: {
    closeSpeedDial: function closeSpeedDial(event) {
      if (!event.target === this.fabTrigger || !this.fabTrigger.contains(event.target)) {
        this.active = false;
        document.body.removeEventListener('click', this.closeSpeedDial);
      }
    },
    toggleSpeedDial: function toggleSpeedDial() {
      var _this = this;

      this.active = !this.active;

      window.setTimeout((function () {
        document.body.addEventListener('click', _this.closeSpeedDial);
      }), 50);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick((function () {
      _this2.fabTrigger = _this2.$el.querySelector('[md-fab-trigger]');

      if (_this2.mdOpen === 'click') {
        _this2.fabTrigger.addEventListener('click', _this2.toggleSpeedDial);
      } else {
        _this2.$el.addEventListener('mouseenter', _this2.toggleSpeedDial);
        _this2.$el.addEventListener('mouseleave', _this2.toggleSpeedDial);
      }
    }));
  },
  beforeDestroy: function beforeDestroy() {
    this.fabTrigger.removeEventListener('click', this.toggleSpeedDial);
    document.body.removeEventListener('click', this.closeSpeedDial);
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

/***/ 216:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(216)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(365),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdSpeedDial/mdSpeedDial.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key !== "__esModule"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdSpeedDial.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50d48906", Component.options)
  } else {
    hotAPI.reload("data-v-50d48906", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-speed-dial",
    class: [_vm.themeClass, _vm.classes]
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50d48906", module.exports)
  }
}

/***/ }),

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(112);


/***/ })

/******/ });
}));