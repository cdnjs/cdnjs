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

	module.exports = __webpack_require__(136);


/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdList = __webpack_require__(137);
	
	var _mdList2 = _interopRequireDefault(_mdList);
	
	var _mdListItem = __webpack_require__(141);
	
	var _mdListItem2 = _interopRequireDefault(_mdListItem);
	
	var _mdListExpand = __webpack_require__(143);
	
	var _mdListExpand2 = _interopRequireDefault(_mdListExpand);
	
	var _mdList3 = __webpack_require__(146);
	
	var _mdList4 = _interopRequireDefault(_mdList3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-list', Vue.extend(_mdList2.default));
	  Vue.component('md-list-item', Vue.extend(_mdListItem2.default));
	  Vue.component('md-list-expand', Vue.extend(_mdListExpand2.default));
	
	  Vue.material.styles.push(_mdList4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(138)
	
	/* script */
	__vue_exports__ = __webpack_require__(139)
	
	/* template */
	var __vue_template__ = __webpack_require__(140)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdList/mdList.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-426a192d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-426a192d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdList.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 138:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_mixin2.default]
	}; //
	//
	//
	//
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('ul', {
	    staticClass: "md-list",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-426a192d", module.exports)
	  }
	}

/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(142)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdList/mdListItem.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5f463740", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5f463740", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdListItem.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 142:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	exports.default = {
	  props: {
	    href: String,
	    target: String,
	    disabled: Boolean
	  },
	  render: function render(createElement) {
	    var _this = this;
	
	    var containerClass = 'md-button md-list-item-container';
	    var holderClass = 'md-list-item-holder';
	    var slot = this.$slots.default;
	    var componentOptions = slot[0].componentOptions;
	    var expandSlot = void 0;
	    var expandSlotIndex = void 0;
	
	    var listItemSpec = {
	      staticClass: 'md-list-item',
	      on: {
	        click: function click($event) {
	          _this.$emit('click', $event);
	        }
	      }
	    };
	
	    var createItemHolder = function createItemHolder(content) {
	      return createElement('div', { staticClass: holderClass }, content);
	    };
	
	    var createRipple = function createRipple() {
	      return createElement('md-ink-ripple');
	    };
	
	    var createCompatibleRouterLink = function createCompatibleRouterLink() {
	      slot[0].data.staticClass = containerClass + ' ' + holderClass;
	
	      return createElement('li', listItemSpec, [].concat(_toConsumableArray(slot), [createRipple()]));
	    };
	
	    var prepareExpandList = function prepareExpandList() {
	      slot.some(function (slot, index) {
	        if (slot.componentOptions && slot.componentOptions.tag === 'md-list-expand') {
	          expandSlot = slot;
	          expandSlotIndex = index;
	
	          return true;
	        }
	      });
	    };
	
	    var createExpandIndicator = function createExpandIndicator() {
	      return createElement('md-icon', {
	        staticClass: 'md-list-expand-indicator'
	      }, 'keyboard_arrow_down');
	    };
	
	    var recalculateExpand = function recalculateExpand(element) {
	      element.$children.some(function (expand) {
	        if (expand.$el.classList.contains('md-list-expand')) {
	          expand.calculatePadding();
	        }
	      });
	    };
	
	    var handleExpandClick = function handleExpandClick(scope) {
	      var target = void 0;
	
	      scope.$parent.$children.some(function (child) {
	        var classList = child.$el.classList;
	
	        if (classList.contains('md-list-item-expand') && classList.contains('md-active')) {
	          target = child;
	          classList.remove('md-active');
	
	          recalculateExpand(child);
	
	          return true;
	        }
	      });
	
	      if (!target || scope.$el !== target.$el) {
	        scope.$el.classList.add('md-active');
	      }
	    };
	
	    var createExpandElement = function createExpandElement() {
	      slot.splice(expandSlotIndex, 1);
	      slot.push(createExpandIndicator());
	
	      return createElement('button', {
	        staticClass: containerClass,
	        on: {
	          click: function click() {
	            handleExpandClick(_this);
	            _this.$emit('click');
	          }
	        }
	      }, [createItemHolder(slot), createRipple()]);
	    };
	
	    var createExpandList = function createExpandList() {
	      listItemSpec.staticClass += ' md-list-item-expand';
	
	      return createElement('li', listItemSpec, [createExpandElement(), expandSlot]);
	    };
	
	    if (componentOptions && componentOptions.tag === 'router-link') {
	      return createCompatibleRouterLink();
	    }
	
	    prepareExpandList();
	
	    if (expandSlot) {
	      return createExpandList();
	    }
	
	    var buttonSpec = createElement('md-button', {
	      staticClass: containerClass,
	      attrs: {
	        target: this.target,
	        href: this.href,
	        disabled: this.disabled
	      }
	    }, [createItemHolder(slot)]);
	
	    if (this.target) {
	      buttonSpec.data.attrs.rel = 'noopener';
	    }
	
	    return createElement('li', listItemSpec, [buttonSpec]);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(144)
	
	/* template */
	var __vue_template__ = __webpack_require__(145)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdList/mdListExpand.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-149bf327", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-149bf327", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdListExpand.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 144:
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
	  data: function data() {
	    return {
	      height: 0,
	      contentObserver: null,
	      transitionOff: true
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-transition-off': this.transitionOff
	      };
	    }
	  },
	  methods: {
	    calculatePadding: function calculatePadding() {
	      var _this = this;
	
	      this.height = -this.$el.offsetHeight + 'px';
	
	      window.setTimeout(function () {
	        _this.transitionOff = false;
	      });
	    },
	    recalculateAfterChildChange: function recalculateAfterChildChange() {
	      this.transitionOff = true;
	      this.calculatePadding();
	    },
	    observeChildChanges: function observeChildChanges() {
	      this.contentObserver = new MutationObserver(this.recalculateAfterChildChange);
	      this.contentObserver.observe(this.$refs.expand, {
	        childList: true,
	        characterData: true,
	        subtree: true
	      });
	    }
	  },
	  mounted: function mounted() {
	    this.calculatePadding();
	    this.observeChildChanges();
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.contentObserver) {
	      this.contentObserver.disconnect();
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    ref: "expand",
	    staticClass: "md-list-expand",
	    class: _vm.classes,
	    style: ({
	      'margin-bottom': _vm.height
	    })
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-149bf327", module.exports)
	  }
	}

/***/ },

/***/ 146:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-list {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n  .THEME_NAME.md-list.md-transparent {\n    background-color: transparent;\n    color: inherit; }\n  .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container {\n    color: ACCENT-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container > .md-icon {\n      color: ACCENT-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container {\n    color: WARN-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container > .md-icon {\n      color: WARN-COLOR; }\n  .THEME_NAME.md-list .md-list-item-expand .md-list-item-container {\n    background-color: BACKGROUND-COLOR-A100; }\n    .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:hover, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:focus {\n      background-color: rgba(153, 153, 153, 0.2); }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map