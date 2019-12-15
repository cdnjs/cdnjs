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
/******/ 	return __webpack_require__(__webpack_require__.s = 477);
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
  if (!$parent || !$parent.$el) {
    return false;
  }

  if ($parent._uid === 0) {
    return false;
  }

  if ($parent.$el.classList.contains(cssClass)) {
    return $parent;
  }

  return getClosestVueParent($parent.$parent, cssClass);
};

exports.default = getClosestVueParent;
module.exports = exports["default"];

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(17);
module.exports = __webpack_require__(3) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _mdTabs = __webpack_require__(366);

var _mdTabs2 = _interopRequireDefault(_mdTabs);

var _mdTab = __webpack_require__(365);

var _mdTab2 = _interopRequireDefault(_mdTab);

var _mdTabs3 = __webpack_require__(293);

var _mdTabs4 = _interopRequireDefault(_mdTabs3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.component('md-tabs', _mdTabs2.default);
  Vue.component('md-tab', _mdTab2.default);

  Vue.material.styles.push(_mdTabs4.default);
}
module.exports = exports['default'];

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(23)('wks')
  , uid        = __webpack_require__(20)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 14:
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(4)
  , ctx       = __webpack_require__(28)
  , hide      = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),

/***/ 17:
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(31)
  , enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys')
  , uid    = __webpack_require__(20);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueId = __webpack_require__(36);

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _getClosestVueParent = __webpack_require__(10);

var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

exports.default = {
  name: 'md-tab',
  props: {
    id: [String, Number],
    mdLabel: [String, Number],
    mdIcon: String,
    mdIconset: String,
    mdIconSrc: String,
    mdActive: Boolean,
    mdDisabled: Boolean,
    mdOptions: {
      default: undefined
    },
    mdTooltip: String,
    mdTooltipDelay: {
      type: String,
      default: '0'
    },
    mdTooltipDirection: {
      type: String,
      default: 'bottom'
    }
  },
  data: function data() {
    return {
      mounted: false,
      tabId: this.id || 'tab-' + (0, _uniqueId2.default)(),
      width: '0px',
      left: '0px'
    };
  },

  watch: {
    mdActive: function mdActive() {
      this.updateTabData();
    },
    mdDisabled: function mdDisabled() {
      this.updateTabData();
    },
    mdIcon: function mdIcon() {
      this.updateTabData();
    },
    mdIconset: function mdIconset() {
      this.updateTabData();
    },
    mdIconSrc: function mdIconSrc() {
      this.updateTabData();
    },

    mdOptions: {
      deep: true,
      handler: function handler() {
        this.updateTabData();
      }
    },
    mdLabel: function mdLabel() {
      this.updateTabData();
    },
    mdTooltip: function mdTooltip() {
      this.updateTabData();
    },
    mdTooltipDelay: function mdTooltipDelay() {
      this.updateTabData();
    },
    mdTooltipDirection: function mdTooltipDirection() {
      this.updateTabData();
    }
  },
  computed: {
    styles: function styles() {
      return {
        width: this.width,
        left: this.left
      };
    }
  },
  methods: {
    getTabData: function getTabData() {
      return {
        id: this.tabId,
        label: this.mdLabel,
        icon: this.mdIcon,
        iconset: this.mdIconset,
        iconSrc: this.mdIconSrc,
        options: this.mdOptions,
        active: this.mdActive,
        disabled: this.mdDisabled,
        tooltip: this.mdTooltip,
        tooltipDelay: this.mdTooltipDelay,
        tooltipDirection: this.mdTooltipDirection,
        ref: this
      };
    },
    updateTabData: function updateTabData() {
      this.parentTabs.updateTab(this.getTabData());
    }
  },
  mounted: function mounted() {
    var tabData = this.getTabData();

    this.parentTabs = (0, _getClosestVueParent2.default)(this.$parent, 'md-tabs');

    if (!this.parentTabs) {
      throw new Error('You must wrap the md-tab in a md-tabs');
    }

    this.mounted = true;
    this.parentTabs.updateTab(tabData);

    if (this.mdActive) {
      this.parentTabs.setActiveTab(tabData);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.parentTabs.unregisterTab(this.getTabData());
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(38);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(202);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _mixin = __webpack_require__(1);

var _mixin2 = _interopRequireDefault(_mixin);

var _throttle = __webpack_require__(51);

var _throttle2 = _interopRequireDefault(_throttle);

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
  name: 'md-tabs',
  props: {
    mdFixed: Boolean,
    mdCentered: Boolean,
    mdRight: Boolean,
    mdNavigation: {
      type: Boolean,
      default: true
    },
    mdDynamicHeight: {
      type: Boolean,
      default: true
    },
    mdElevation: {
      type: [String, Number],
      default: 0
    }
  },
  mixins: [_mixin2.default],
  data: function data() {
    return {
      tabList: {},
      activeTab: null,
      activeTabNumber: 0,
      hasIcons: false,
      hasLabel: false,
      hasNavigationScroll: false,
      isNavigationOnStart: true,
      isNavigationOnEnd: false,
      transitionControl: null,
      transitionOff: false,
      contentHeight: '0px',
      contentWidth: '0px'
    };
  },
  computed: {
    tabClasses: function tabClasses() {
      return {
        'md-dynamic-height': this.mdDynamicHeight,
        'md-transition-off': this.transitionOff
      };
    },
    navigationClasses: function navigationClasses() {
      return {
        'md-has-icon': this.hasIcons,
        'md-has-label': this.hasLabel,
        'md-fixed': this.mdFixed,
        'md-right': !this.mdCentered && this.mdRight,
        'md-centered': this.mdCentered || this.mdFixed,
        'md-has-navigation-scroll': this.hasNavigationScroll
      };
    },
    indicatorClasses: function indicatorClasses() {
      var toLeft = this.lastIndicatorNumber > this.activeTabNumber;

      this.lastIndicatorNumber = this.activeTabNumber;

      return {
        'md-transition-off': this.transitionOff,
        'md-to-right': !toLeft,
        'md-to-left': toLeft
      };
    },
    navigationLeftButtonClasses: function navigationLeftButtonClasses() {
      return {
        'md-disabled': this.isNavigationOnStart
      };
    },
    navigationRightButtonClasses: function navigationRightButtonClasses() {
      return {
        'md-disabled': this.isNavigationOnEnd
      };
    }
  },
  methods: {
    getHeaderClass: function getHeaderClass(header) {
      return {
        'md-active': this.activeTab === header.id,
        'md-disabled': header.disabled
      };
    },
    registerTab: function registerTab(tabData) {
      var hasActive = false;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(this.tabList)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tab = _step.value;

          if (this.tabList[tab].active) {
            hasActive = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.$set(this.tabList, tabData.id, tabData);

      if (!hasActive && !tabData.disabled) {
        this.tabList[tabData.id].active = true;
      }
    },
    unregisterTab: function unregisterTab(tabData) {
      this.$delete(this.tabList, tabData.id);
    },
    updateTab: function updateTab(tabData) {
      this.registerTab(tabData);

      if (tabData.active) {
        if (!tabData.disabled) {
          this.setActiveTab(tabData);
        } else if ((0, _keys2.default)(this.tabList).length) {
          var tabsIds = (0, _keys2.default)(this.tabList);
          var targetIndex = tabsIds.indexOf(tabData.id) + 1;
          var target = tabsIds[targetIndex];

          if (target) {
            this.setActiveTab(this.tabList[target]);
          } else {
            this.setActiveTab(this.tabList[0]);
          }
        }
      }
    },
    observeElementChanges: function observeElementChanges() {
      this.parentObserver = new MutationObserver((0, _throttle2.default)(this.calculateOnWatch, 50));
      this.parentObserver.observe(this.$refs.tabContent, {
        childList: true,
        attributes: true,
        subtree: true
      });
    },
    getTabIndex: function getTabIndex(id) {
      var idList = (0, _keys2.default)(this.tabList);

      return idList.indexOf(id);
    },
    calculateIndicatorPos: function calculateIndicatorPos() {
      if (this.$refs.tabHeader && this.$refs.tabHeader[this.activeTabNumber]) {
        var tabsWidth = this.$el.offsetWidth;
        var activeTab = this.$refs.tabHeader[this.activeTabNumber];
        var left = activeTab.offsetLeft - this.$refs.tabsContainer.scrollLeft;
        var right = tabsWidth - left - activeTab.offsetWidth;

        this.$refs.indicator.style.left = left + 'px';
        this.$refs.indicator.style.right = right + 'px';
      }
    },
    calculateTabsWidthAndPosition: function calculateTabsWidthAndPosition() {
      var width = this.$el.offsetWidth;
      var index = 0;

      this.contentWidth = width * this.activeTabNumber + 'px';

      for (var tabId in this.tabList) {
        var tab = this.tabList[tabId];

        tab.ref.width = width + 'px';
        tab.ref.left = width * index + 'px';
        index++;
      }
    },
    calculateContentHeight: function calculateContentHeight() {
      var _this = this;

      this.$nextTick((function () {
        if ((0, _keys2.default)(_this.tabList).length) {
          var height = _this.tabList[_this.activeTab].ref.$el.offsetHeight;

          _this.contentHeight = height + 'px';
        }
      }));
    },
    calculatePosition: function calculatePosition() {
      var _this2 = this;

      window.requestAnimationFrame((function () {
        if (_this2._destroyed) {
          return;
        }

        _this2.calculateIndicatorPos();
        _this2.calculateTabsWidthAndPosition();
        _this2.calculateContentHeight();
        _this2.checkNavigationScroll();
      }));
    },
    debounceTransition: function debounceTransition() {
      var _this3 = this;

      window.clearTimeout(this.transitionControl);
      this.transitionControl = window.setTimeout((function () {
        _this3.calculatePosition();
        _this3.transitionOff = false;
      }), 200);
    },
    calculateOnWatch: function calculateOnWatch() {
      this.calculatePosition();
      this.debounceTransition();
    },
    calculateOnResize: function calculateOnResize() {
      this.transitionOff = true;
      this.calculateOnWatch();
    },
    calculateScrollPos: function calculateScrollPos() {
      var _$refs$tabsContainer = this.$refs.tabsContainer,
          scrollLeft = _$refs$tabsContainer.scrollLeft,
          scrollWidth = _$refs$tabsContainer.scrollWidth,
          clientWidth = _$refs$tabsContainer.clientWidth;


      this.isNavigationOnStart = scrollLeft < 32;
      this.isNavigationOnEnd = scrollWidth - scrollLeft - 32 < clientWidth;
    },
    handleNavigationScroll: function handleNavigationScroll() {
      var _this4 = this;

      window.requestAnimationFrame((function () {
        if (_this4._destroyed) {
          return;
        }

        _this4.calculateIndicatorPos();
        _this4.calculateScrollPos();
      }));
    },
    checkNavigationScroll: function checkNavigationScroll() {
      var _$refs$tabsContainer2 = this.$refs.tabsContainer,
          scrollWidth = _$refs$tabsContainer2.scrollWidth,
          clientWidth = _$refs$tabsContainer2.clientWidth;


      this.hasNavigationScroll = scrollWidth > clientWidth;
    },
    setActiveTab: function setActiveTab(tabData) {
      this.hasIcons = !!tabData.icon || !!tabData.iconset || !!tabData.iconSrc;
      this.hasLabel = !!tabData.label;
      this.activeTab = tabData.id;
      this.activeTabNumber = this.getTabIndex(this.activeTab);
      this.calculatePosition();
      this.$emit('change', this.activeTabNumber);
    },
    navigationScrollLeft: function navigationScrollLeft() {
      var _$refs$tabsContainer3 = this.$refs.tabsContainer,
          scrollLeft = _$refs$tabsContainer3.scrollLeft,
          clientWidth = _$refs$tabsContainer3.clientWidth;


      this.$refs.tabsContainer.scrollLeft = Math.max(0, scrollLeft - clientWidth);
    },
    navigationScrollRight: function navigationScrollRight() {
      var _$refs$tabsContainer4 = this.$refs.tabsContainer,
          scrollLeft = _$refs$tabsContainer4.scrollLeft,
          clientWidth = _$refs$tabsContainer4.clientWidth,
          scrollWidth = _$refs$tabsContainer4.scrollWidth;


      this.$refs.tabsContainer.scrollLeft = Math.min(scrollWidth, scrollLeft + clientWidth);
    }
  },
  activated: function activated() {
    this.calculateOnResize();
  },
  mounted: function mounted() {
    var _this5 = this;

    this.$nextTick((function () {
      _this5.observeElementChanges();
      window.addEventListener('resize', _this5.calculateOnResize);

      if ((0, _keys2.default)(_this5.tabList).length && !_this5.activeTab) {
        var firstTab = (0, _keys2.default)(_this5.tabList)[0];

        _this5.setActiveTab(_this5.tabList[firstTab]);
      }
    }));
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parentObserver) {
      this.parentObserver.disconnect();
    }

    window.removeEventListener('resize', this.calculateOnResize);

    this._destroyed = true;
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(210), __esModule: true };

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(14);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
__webpack_require__(50);
module.exports = __webpack_require__(221);

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13)
  , get      = __webpack_require__(60);
module.exports = __webpack_require__(4).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ 241:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

module.exports = ".THEME_NAME.md-tabs > .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: PRIMARY-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-indicator {\n    background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header-navigation-button {\n    color: PRIMARY-CONTRAST-0.54;\n    background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation {\n  background-color: transparent;\n  border-bottom: 1px solid BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-COLOR; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: BACKGROUND-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-indicator {\n    background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-tabs.md-accent > .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header {\n    color: ACCENT-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header:focus {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: ACCENT-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME.md-tabs.md-warn > .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header {\n    color: WARN-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header:focus {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: WARN-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n"

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)((function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(5)((function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
}));

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(8)
  , toIObject    = __webpack_require__(7)
  , arrayIndexOf = __webpack_require__(34)(false)
  , IE_PROTO     = __webpack_require__(19)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7)
  , toLength  = __webpack_require__(29)
  , toIndex   = __webpack_require__(35);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

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

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(372),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTabs/mdTab.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTab.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01de8cdf", Component.options)
  } else {
    hotAPI.reload("data-v-01de8cdf", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(241)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(196),
  /* template */
  __webpack_require__(402),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/pablohpsilva/Code/vue-material/src/components/mdTabs/mdTabs.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mdTabs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d9eb024", Component.options)
  } else {
    hotAPI.reload("data-v-3d9eb024", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f
  , has = __webpack_require__(8)
  , TAG = __webpack_require__(12)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-tab",
    style: (_vm.styles),
    attrs: {
      "id": _vm.tabId
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01de8cdf", module.exports)
  }
}

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = true;

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "md-tabs",
    class: [_vm.themeClass, _vm.tabClasses]
  }, [_c('md-whiteframe', {
    ref: "tabNavigation",
    staticClass: "md-tabs-navigation",
    class: _vm.navigationClasses,
    attrs: {
      "md-tag": "nav",
      "md-elevation": _vm.mdElevation
    }
  }, [_c('div', {
    ref: "tabsContainer",
    staticClass: "md-tabs-navigation-container",
    on: {
      "scroll": _vm.handleNavigationScroll
    }
  }, [_c('div', {
    staticClass: "md-tabs-navigation-scroll-container"
  }, [_vm._l((_vm.tabList), (function(header) {
    return _c('button', {
      key: header.id,
      ref: "tabHeader",
      refInFor: true,
      staticClass: "md-tab-header",
      class: _vm.getHeaderClass(header),
      attrs: {
        "type": "button",
        "disabled": header.disabled
      },
      on: {
        "click": function($event) {
          _vm.setActiveTab(header)
        }
      }
    }, [_c('md-ink-ripple', {
      attrs: {
        "md-disabled": header.disabled
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "md-tab-header-container"
    }, [_vm._t("header-item", [(header.icon) ? _c('md-icon', [_vm._v(_vm._s(header.icon))]) : (header.iconset) ? _c('md-icon', {
      attrs: {
        "md-iconset": header.iconset
      }
    }, [_vm._v(_vm._s(header.icon))]) : (header.iconSrc) ? _c('md-icon', {
      attrs: {
        "md-src": header.iconSrc
      }
    }) : _vm._e(), _vm._v(" "), (header.label) ? _c('span', [_vm._v(_vm._s(header.label))]) : _vm._e()], {
      header: header
    })], 2), _vm._v(" "), (header.tooltip) ? _c('md-tooltip', {
      attrs: {
        "md-direction": header.tooltipDirection,
        "md-delay": header.tooltipDelay
      }
    }, [_vm._v(_vm._s(header.tooltip))]) : _vm._e()], 1)
  })), _vm._v(" "), _c('span', {
    ref: "indicator",
    staticClass: "md-tab-indicator",
    class: _vm.indicatorClasses
  })], 2)]), _vm._v(" "), (_vm.mdNavigation && _vm.hasNavigationScroll) ? _c('button', {
    staticClass: "md-tab-header-navigation-button md-left",
    class: _vm.navigationLeftButtonClasses,
    on: {
      "click": _vm.navigationScrollLeft
    }
  }, [_c('md-icon', [_vm._v("keyboard_arrow_left")])], 1) : _vm._e(), _vm._v(" "), (_vm.mdNavigation && _vm.hasNavigationScroll) ? _c('button', {
    staticClass: "md-tab-header-navigation-button md-right",
    class: _vm.navigationRightButtonClasses,
    on: {
      "click": _vm.navigationScrollRight
    }
  }, [_c('md-icon', [_vm._v("keyboard_arrow_right")])], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    ref: "tabContent",
    staticClass: "md-tabs-content",
    style: ({
      height: _vm.contentHeight
    })
  }, [_c('div', {
    staticClass: "md-tabs-wrapper",
    style: ({
      transform: ("translate3D(-" + _vm.contentWidth + ", 0, 0)")
    })
  }, [_vm._t("default")], 2)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3d9eb024", module.exports)
  }
}

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(40)
  , $export        = __webpack_require__(16)
  , redefine       = __webpack_require__(48)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(8)
  , Iterators      = __webpack_require__(32)
  , $iterCreate    = __webpack_require__(54)
  , setToStringTag = __webpack_require__(37)
  , getPrototypeOf = __webpack_require__(57)
  , ITERATOR       = __webpack_require__(12)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(4).Object.keys;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(13)
  , dPs         = __webpack_require__(56)
  , enumBugKeys = __webpack_require__(22)
  , IE_PROTO    = __webpack_require__(19)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(25)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(53).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(16)
  , core    = __webpack_require__(4)
  , fails   = __webpack_require__(5);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails((function(){ fn(1); })), 'Object', exp);
};

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(110);


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(21)
  , $keys    = __webpack_require__(18);

__webpack_require__(47)('keys', (function(){
  return function keys(it){
    return $keys(toObject(it));
  };
}));

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(58)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(44)(String, 'String', (function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}), (function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
}));

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var debounce = function debounce(callback, limit) {
  var wait = false;

  return function () {
    if (!wait) {
      callback.call();
      wait = true;

      window.setTimeout((function () {
        wait = false;
      }), limit);
    }
  };
};

exports.default = debounce;
module.exports = exports["default"];

/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(46)
  , descriptor     = __webpack_require__(17)
  , setToStringTag = __webpack_require__(37)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(12)('iterator'), (function(){ return this; }));

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(9)
  , anObject = __webpack_require__(13)
  , getKeys  = __webpack_require__(18);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(8)
  , toObject    = __webpack_require__(21)
  , IE_PROTO    = __webpack_require__(19)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15)
  , defined   = __webpack_require__(14);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(62)
  , ITERATOR  = __webpack_require__(12)('iterator')
  , Iterators = __webpack_require__(32);
module.exports = __webpack_require__(4).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24)
  , TAG = __webpack_require__(12)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(32)
  , TO_STRING_TAG = __webpack_require__(12)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(26)
  , defined = __webpack_require__(14);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),

/***/ 76:
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(71)
  , step             = __webpack_require__(76)
  , Iterators        = __webpack_require__(32)
  , toIObject        = __webpack_require__(7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(44)(Array, 'Array', (function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}), (function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}), 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(30)
  , toPrimitive    = __webpack_require__(27)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ })

/******/ });
}));