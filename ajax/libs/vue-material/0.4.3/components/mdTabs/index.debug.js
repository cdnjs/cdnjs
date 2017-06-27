(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(208);


/***/ },

/***/ 119:
/***/ function(module, exports) {

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

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTabs = __webpack_require__(209);
	
	var _mdTabs2 = _interopRequireDefault(_mdTabs);
	
	var _mdTab = __webpack_require__(213);
	
	var _mdTab2 = _interopRequireDefault(_mdTab);
	
	var _mdTabs3 = __webpack_require__(217);
	
	var _mdTabs4 = _interopRequireDefault(_mdTabs3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tabs', Vue.extend(_mdTabs2.default));
	  Vue.component('md-tab', Vue.extend(_mdTab2.default));
	
	  Vue.material.styles.push(_mdTabs4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(210)
	
	/* script */
	__vue_exports__ = __webpack_require__(211)
	
	/* template */
	var __vue_template__ = __webpack_require__(212)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTabs/mdTabs.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e4dfbcba", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e4dfbcba", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTabs.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 210:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 211:
/***/ function(module, exports) {

	'use strict';
	
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
	  props: {
	    mdFixed: Boolean,
	    mdCentered: Boolean,
	    mdRight: Boolean,
	    mdDynamicHeight: {
	      type: Boolean,
	      default: true
	    },
	    mdElevation: {
	      type: [String, Number],
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      tabList: {},
	      activeTab: null,
	      activeTabNumber: 0,
	      hasIcons: false,
	      hasLabel: false,
	      transitionControl: null,
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
	        'md-centered': this.mdCentered || this.mdFixed
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
	      this.tabList[tabData.id] = tabData;
	      this.$forceUpdate();
	    },
	    unregisterTab: function unregisterTab(tabData) {
	      delete this.tabList[tabData.id];
	    },
	    updateTab: function updateTab(tabData) {
	      this.registerTab(tabData);
	
	      if (tabData.active) {
	        if (!tabData.disabled) {
	          this.setActiveTab(tabData);
	        } else {
	          var tabsIds = Object.keys(this.tabList);
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
	      this.contentObserver = new MutationObserver(this.calculateOnWatch);
	      this.navigationObserver = new MutationObserver(this.calculateOnWatch);
	      this.contentObserver.observe(this.$refs.tabContent, {
	        childList: true,
	        attributes: true,
	        characterData: true,
	        subtree: true,
	        attributeOldValue: true,
	        characterDataOldValue: true
	      });
	      this.navigationObserver.observe(this.$refs.tabNavigation.$el, {
	        attributes: true
	      });
	    },
	    getTabIndex: function getTabIndex(id) {
	      var idList = Object.keys(this.tabList);
	
	      return idList.indexOf(id);
	    },
	    calculateIndicatorPos: function calculateIndicatorPos() {
	      var tabsWidth = this.$el.offsetWidth;
	      var activeTab = this.$refs.tabHeader[this.activeTabNumber];
	      var left = activeTab.offsetLeft;
	      var right = tabsWidth - left - activeTab.offsetWidth;
	
	      this.$refs.indicator.style.left = left + 'px';
	      this.$refs.indicator.style.right = right + 'px';
	    },
	    calculateTabsWidthAndPosition: function calculateTabsWidthAndPosition() {
	      var width = this.$el.offsetWidth;
	
	      this.contentWidth = width * this.activeTabNumber + 'px';
	
	      var index = 0;
	
	      for (var tabId in this.tabList) {
	        var tab = this.tabList[tabId];
	
	        tab.ref.width = width + 'px';
	        tab.ref.left = width * index + 'px';
	        index++;
	      }
	    },
	    calculateContentHeight: function calculateContentHeight() {
	      var _this = this;
	
	      this.$nextTick(function () {
	        var height = _this.tabList[_this.activeTab].ref.$el.offsetHeight;
	
	        _this.contentHeight = height + 'px';
	      });
	    },
	    calculatePosition: function calculatePosition() {
	      var _this2 = this;
	
	      window.requestAnimationFrame(function () {
	        _this2.calculateIndicatorPos();
	        _this2.calculateTabsWidthAndPosition();
	        _this2.calculateContentHeight();
	      });
	    },
	    debounceTransition: function debounceTransition() {
	      var _this3 = this;
	
	      window.clearTimeout(this.transitionControl);
	      this.transitionControl = window.setTimeout(function () {
	        _this3.calculatePosition();
	        _this3.transitionOff = false;
	      }, 200);
	    },
	    calculateOnWatch: function calculateOnWatch() {
	      this.transitionOff = true;
	      this.calculatePosition();
	      this.debounceTransition();
	    },
	    setActiveTab: function setActiveTab(tabData) {
	      this.hasIcons = !!tabData.icon;
	      this.hasLabel = !!tabData.label;
	      this.activeTab = tabData.id;
	      this.activeTabNumber = this.getTabIndex(this.activeTab);
	      this.calculatePosition();
	      this.$emit('change', this.activeTabNumber);
	    }
	  },
	  mounted: function mounted() {
	    var _this4 = this;
	
	    this.$nextTick(function () {
	      _this4.observeElementChanges();
	      window.addEventListener('resize', _this4.calculateOnWatch);
	
	      if (!_this4.activeTab) {
	        var firstTab = Object.keys(_this4.tabList)[0];
	
	        _this4.setActiveTab(_this4.tabList[firstTab]);
	      }
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.contentObserver) {
	      this.contentObserver.disconnect();
	    }
	
	    if (this.navigationObserver) {
	      this.navigationObserver.disconnect();
	    }
	
	    window.removeEventListener('resize', this.calculateOnWatch);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-tabs",
	    class: _vm.tabClasses
	  }, [_h('md-whiteframe', {
	    ref: "tabNavigation",
	    staticClass: "md-tabs-navigation",
	    class: _vm.navigationClasses,
	    attrs: {
	      "md-tag": "nav",
	      "md-elevation": _vm.mdElevation
	    }
	  }, [_vm._l((_vm.tabList), function(header) {
	    return _h('button', {
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
	    }, [_h('md-ink-ripple', {
	      attrs: {
	        "md-disabled": header.disabled
	      }
	    }), " ", _h('div', {
	      staticClass: "md-tab-header-container"
	    }, [(header.icon) ? _h('md-icon', [_vm._s(header.icon)]) : _vm._e(), " ", (header.label) ? _h('span', [_vm._s(header.label)]) : _vm._e()])])
	  }), " ", _h('span', {
	    ref: "indicator",
	    staticClass: "md-tab-indicator",
	    class: _vm.indicatorClasses
	  })]), " ", _h('div', {
	    ref: "tabContent",
	    staticClass: "md-tabs-content",
	    style: ({
	      height: _vm.contentHeight
	    })
	  }, [_h('div', {
	    staticClass: "md-tabs-wrapper",
	    style: ({
	      transform: ("translate3D(-" + _vm.contentWidth + ", 0, 0)")
	    })
	  }, [_vm._t("default")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e4dfbcba", module.exports)
	  }
	}

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(214)
	
	/* template */
	var __vue_template__ = __webpack_require__(216)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdTabs/mdTab.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5f496f80", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5f496f80", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTab.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _uniqueId = __webpack_require__(215);
	
	var _uniqueId2 = _interopRequireDefault(_uniqueId);
	
	var _getClosestVueParent = __webpack_require__(119);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  props: {
	    id: [String, Number],
	    mdLabel: [String, Number],
	    mdIcon: String,
	    mdActive: Boolean,
	    mdDisabled: Boolean
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
	    mdLabel: function mdLabel() {
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
	        active: this.mdActive,
	        disabled: this.mdDisabled,
	        ref: this
	      };
	    },
	    updateTabData: function updateTabData() {
	      this.parentTabs.updateTab(this.getTabData());
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.parentTabs = (0, _getClosestVueParent2.default)(this.$parent, 'md-tabs');
	
	    if (!this.parentTabs) {
	      throw new Error('You must wrap the md-tab in a md-tabs');
	    }
	
	    this.$nextTick(function () {
	      _this.mounted = true;
	      _this.parentTabs.registerTab(_this.getTabData());
	
	      if (_this.mdActive) {
	        _this.parentTabs.activeTab = _this.tabId;
	      }
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.parentTabs.unregisterTab(this.getTabData());
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 215:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var uniqueId = function uniqueId() {
	  return Math.random().toString(36).slice(4);
	};
	
	exports.default = uniqueId;
	module.exports = exports["default"];

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-tab",
	    style: (_vm.styles),
	    attrs: {
	      "id": _vm.tabId
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5f496f80", module.exports)
	  }
	}

/***/ },

/***/ 217:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-tabs .md-tabs-navigation, .THEME_NAME.md-tabs .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-tabs .md-tab-header, .THEME_NAME.md-tabs .md-tab-header {\n  color: PRIMARY-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs .md-tab-header.md-active, .THEME_NAME .md-tabs .md-tab-header:focus, .THEME_NAME.md-tabs .md-tab-header.md-active, .THEME_NAME.md-tabs .md-tab-header:focus {\n    color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-tabs .md-tab-header.md-disabled, .THEME_NAME.md-tabs .md-tab-header.md-disabled {\n    color: PRIMARY-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs .md-tab-indicator, .THEME_NAME.md-tabs .md-tab-indicator {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tabs-navigation, .THEME_NAME.md-tabs.md-transparent .md-tabs-navigation {\n  background-color: transparent;\n  border-bottom: 1px solid BACKGROUND-CONTRAST-0.12; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-header, .THEME_NAME.md-tabs.md-transparent .md-tab-header {\n  color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-transparent .md-tab-header:focus, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent .md-tab-header:focus {\n    color: PRIMARY-COLOR; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-disabled {\n    color: BACKGROUND-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-indicator, .THEME_NAME.md-tabs.md-transparent .md-tab-indicator {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tabs-navigation, .THEME_NAME.md-tabs.md-accent .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-header, .THEME_NAME.md-tabs.md-accent .md-tab-header {\n  color: ACCENT-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-accent .md-tab-header:focus, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent .md-tab-header:focus {\n    color: ACCENT-CONTRAST; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-disabled {\n    color: ACCENT-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-indicator, .THEME_NAME.md-tabs.md-accent .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tabs-navigation, .THEME_NAME.md-tabs.md-warn .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-header, .THEME_NAME.md-tabs.md-warn .md-tab-header {\n  color: WARN-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME .md-tabs.md-warn .md-tab-header:focus, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn .md-tab-header:focus {\n    color: WARN-CONTRAST; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-disabled {\n    color: WARN-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-indicator, .THEME_NAME.md-tabs.md-warn .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map