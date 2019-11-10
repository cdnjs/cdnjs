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

	module.exports = __webpack_require__(182);


/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTabs = __webpack_require__(183);
	
	var _mdTabs2 = _interopRequireDefault(_mdTabs);
	
	var _mdTab = __webpack_require__(187);
	
	var _mdTab2 = _interopRequireDefault(_mdTab);
	
	var _mdTabs3 = __webpack_require__(190);
	
	var _mdTabs4 = _interopRequireDefault(_mdTabs3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tabs', Vue.extend(_mdTabs2.default));
	  Vue.component('md-tab', Vue.extend(_mdTab2.default));
	
	  Vue.material.styles.push(_mdTabs4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-c28dc5a6!sass!./mdTabs.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(185)
	
	/* template */
	var __vue_template__ = __webpack_require__(186)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTabs/mdTabs.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c28dc5a6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-c28dc5a6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTabs.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 185:
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
	//
	//
	
	exports.default = {
	  props: {
	    mdFixed: Boolean,
	    mdCentered: Boolean,
	    mdElevation: [String, Number]
	  },
	  data: function data() {
	    return {
	      hasIcons: false,
	      hasLabel: false,
	      elevation: this.mdElevation,
	      activeTab: '',
	      activeTabNumber: 0,
	      tabs: {}
	    };
	  },
	
	  watch: {
	    mdFixed: function mdFixed() {
	      var _this = this;
	
	      var transitionCounter = 0;
	      var transitionInterval = window.setInterval(function () {
	        transitionCounter++;
	
	        window.requestAnimationFrame(function () {
	          _this.calculateIndicatorPos(true);
	        });
	
	        if (transitionCounter > 200) {
	          window.clearInterval(transitionInterval);
	        }
	      }, 1);
	
	      this.recalculateAllTabsPos();
	    },
	    mdCentered: function mdCentered() {
	      this.recalculateAllTabsPos();
	    },
	    mdElevation: function mdElevation() {
	      this.elevation = this.mdElevation;
	    }
	  },
	  computed: {
	    tabClasses: function tabClasses() {
	      return {
	        'md-fixed': this.mdFixed,
	        'md-centered': this.mdCentered || this.mdFixed,
	        'md-has-icon': this.hasIcons,
	        'md-has-label': this.hasLabel
	      };
	    },
	    indicatorClass: function indicatorClass() {
	      var toLeft = this.lastIndicatorNumber > this.activeTabNumber;
	
	      this.lastIndicatorNumber = this.activeTabNumber;
	
	      return {
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
	    calculateIndicatorPos: function calculateIndicatorPos(recalculate) {
	      var _this2 = this;
	
	      var indicator = this.$refs.indicator;
	      var tabsWidth = this.$el.offsetWidth;
	
	      if (recalculate) {
	        indicator.classList.add('md-transition-off');
	      }
	
	      this.$nextTick(function () {
	        var activeTab = _this2.$refs.tabHeader[_this2.activeTabNumber];
	        var left = activeTab.offsetLeft;
	        var right = tabsWidth - left - activeTab.offsetWidth;
	
	        indicator.style.left = left + 'px';
	        indicator.style.right = right + 'px';
	
	        if (recalculate) {
	          window.setTimeout(function () {
	            indicator.classList.remove('md-transition-off');
	          }, 100);
	        }
	      });
	    },
	    calculateTabPos: function calculateTabPos(ref, index) {
	      this.$refs.tabWrapper.style.transform = 'translate3D(' + -this.$refs.tabContent.offsetWidth * this.activeTabNumber + 'px, 0, 0)';
	      ref.style.width = this.$refs.tabContent.offsetWidth + 'px';
	      ref.style.left = this.$refs.tabContent.offsetWidth * index + 'px';
	    },
	    setVisibleTab: function setVisibleTab(ref) {
	      this.$refs.tabContent.style.height = ref.offsetHeight + 'px';
	      ref.classList.add('md-active');
	    },
	    changeTab: function changeTab(tabId) {
	      var _this3 = this;
	
	      var idList = Object.keys(this.tabs);
	      var id = tabId || idList[0];
	      var index = idList.indexOf(id);
	
	      this.tabs[this.activeTab || id].ref.classList.remove('md-active');
	      this.activeTab = id;
	      this.activeTabNumber = index;
	
	      this.$nextTick(function () {
	        _this3.calculateIndicatorPos();
	        _this3.calculateTabPos(_this3.tabs[id].ref, index);
	        _this3.setVisibleTab(_this3.tabs[id].ref);
	      });
	
	      this.$emit('change', index);
	    },
	    handleTabData: function handleTabData(data) {
	      var idList = Object.keys(this.tabs);
	      var index = idList.indexOf(data.id);
	
	      this.hasIcons = !!data.icon;
	      this.hasLabel = !!data.label;
	
	      if (!data.disabled) {
	        if (data.active) {
	          this.changeTab(data.id);
	        }
	      } else {
	        this.changeTab(idList[index + 1]);
	      }
	    },
	    registerTab: function registerTab(data) {
	      this.tabs[data.id] = data;
	      this.handleTabData(data);
	      this.calculateTabPos(this.tabs[data.id].ref, Object.keys(this.tabs).length - 1);
	    },
	    updateTabData: function updateTabData(data) {
	      this.tabs[data.id] = data;
	      this.handleTabData(data);
	      this.$forceUpdate();
	      this.recalculateAllTabsPos();
	    },
	    recalculateAllTabsPos: function recalculateAllTabsPos(transitionOff) {
	      var _this4 = this;
	
	      if (typeof transitionOff === 'undefined') {
	        transitionOff = true;
	      }
	
	      window.requestAnimationFrame(function () {
	        _this4.calculateIndicatorPos(!transitionOff);
	
	        Object.keys(_this4.tabs).forEach(function (tab, index) {
	          _this4.calculateTabPos(_this4.tabs[tab].ref, index);
	        });
	      });
	    }
	  },
	  mounted: function mounted() {
	    if (!this.activeTab) {
	      this.changeTab();
	    }
	
	    window.addEventListener('resize', this.recalculateAllTabsPos);
	  },
	  beforeDestroy: function beforeDestroy() {
	    window.removeEventListener('resize', this.recalculateAllTabsPos);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-tabs",
	    class: _vm.tabClasses
	  }, [_vm._h('md-whiteframe', {
	    attrs: {
	      "md-elevation": _vm.elevation || 0
	    }
	  }, [_vm._h('div', {
	    staticClass: "md-tabs-navigation"
	  }, [_vm._l((_vm.tabs), function(header) {
	    return _vm._h('button', {
	      directives: [{
	        name: "md-ink-ripple",
	        rawName: "v-md-ink-ripple",
	        value: (header.disabled),
	        expression: "header.disabled"
	      }],
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
	          _vm.changeTab(header.id)
	        }
	      }
	    }, [_vm._h('div', {
	      staticClass: "md-tab-header-container"
	    }, [(header.icon) ? _vm._h('md-icon', [_vm._s(header.icon)]) : _vm._e(), " ", (header.label) ? _vm._h('span', [_vm._s(header.label)]) : _vm._e()])])
	  }), " ", _vm._h('span', {
	    ref: "indicator",
	    staticClass: "md-tab-indicator",
	    class: _vm.indicatorClass
	  })])]), " ", _vm._h('div', {
	    ref: "tabContent",
	    staticClass: "md-tabs-content"
	  }, [_vm._h('div', {
	    ref: "tabWrapper",
	    staticClass: "md-tabs-wrapper"
	  }, [_vm._t("default")])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c28dc5a6", module.exports)
	  }
	}

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(188)
	
	/* template */
	var __vue_template__ = __webpack_require__(189)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTabs/mdTab.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8aa44a94", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8aa44a94", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTab.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 188:
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
	
	exports.default = {
	  props: {
	    id: [String, Number],
	    mdLabel: [String, Number],
	    mdIcon: String,
	    mdActive: Boolean,
	    mdDisabled: Boolean
	  },
	  data: function data() {
	    var id = void 0;
	
	    if (!this.id) {
	      id = 'tab-' + Math.random().toString(36).substr(2, 10);
	    }
	
	    return {
	      tabId: this.id || id
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
	  methods: {
	    updateTabData: function updateTabData() {
	      this.$parent.updateTabData({
	        id: this.tabId,
	        label: this.mdLabel,
	        icon: this.mdIcon,
	        active: this.mdActive,
	        disabled: this.mdDisabled,
	        ref: this.$refs.tab
	      });
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$parent.$el.classList.contains('md-tabs')) {
	      this.$destroy();
	
	      throw new Error('You should wrap the md-tab in a md-tabs');
	    }
	
	    this.$parent.registerTab({
	      id: this.tabId,
	      label: this.mdLabel,
	      icon: this.mdIcon,
	      active: this.mdActive,
	      disabled: this.mdDisabled,
	      ref: this.$refs.tab
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    ref: "tab",
	    staticClass: "md-tab",
	    attrs: {
	      "id": _vm.tabId
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8aa44a94", module.exports)
	  }
	}

/***/ },

/***/ 190:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-tabs .md-tabs-navigation, .THEME_NAME.md-tabs .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-tabs .md-tab-header, .THEME_NAME.md-tabs .md-tab-header {\n  color: PRIMARY-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs .md-tab-header.md-active, .THEME_NAME .md-tabs .md-tab-header:focus, .THEME_NAME.md-tabs .md-tab-header.md-active, .THEME_NAME.md-tabs .md-tab-header:focus {\n    color: PRIMARY-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs .md-tab-header.md-disabled, .THEME_NAME.md-tabs .md-tab-header.md-disabled {\n    color: PRIMARY-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs .md-tab-indicator, .THEME_NAME.md-tabs .md-tab-indicator {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tabs-navigation, .THEME_NAME.md-tabs.md-accent .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-header, .THEME_NAME.md-tabs.md-accent .md-tab-header {\n  color: ACCENT-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-accent .md-tab-header:focus, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent .md-tab-header:focus {\n    color: ACCENT-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-disabled {\n    color: ACCENT-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-indicator, .THEME_NAME.md-tabs.md-accent .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tabs-navigation, .THEME_NAME.md-tabs.md-warn .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-header, .THEME_NAME.md-tabs.md-warn .md-tab-header {\n  color: WARN-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME .md-tabs.md-warn .md-tab-header:focus, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn .md-tab-header:focus {\n    color: WARN-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-disabled {\n    color: WARN-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-indicator, .THEME_NAME.md-tabs.md-warn .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tabs-navigation, .THEME_NAME.md-tabs.md-transparent .md-tabs-navigation {\n  background-color: transparent; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-header, .THEME_NAME.md-tabs.md-transparent .md-tab-header {\n  color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-transparent .md-tab-header:focus, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent .md-tab-header:focus {\n    color: PRIMARY-COLOR; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-disabled {\n    color: BACKGROUND-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-indicator, .THEME_NAME.md-tabs.md-transparent .md-tab-indicator {\n  background-color: PRIMARY-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map