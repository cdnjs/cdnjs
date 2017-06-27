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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdBottomBar = __webpack_require__(7);
	
	var _mdBottomBar2 = _interopRequireDefault(_mdBottomBar);
	
	var _mdBottomBarItem = __webpack_require__(11);
	
	var _mdBottomBarItem2 = _interopRequireDefault(_mdBottomBarItem);
	
	var _mdBottomBar3 = __webpack_require__(14);
	
	var _mdBottomBar4 = _interopRequireDefault(_mdBottomBar3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-bottom-bar', Vue.extend(_mdBottomBar2.default));
	  Vue.component('md-bottom-bar-item', Vue.extend(_mdBottomBarItem2.default));
	
	  Vue.material.styles.push(_mdBottomBar4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-039c211e!sass!./mdBottomBar.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(9)
	
	/* template */
	var __vue_template__ = __webpack_require__(10)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdBottomBar/mdBottomBar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-039c211e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-039c211e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdBottomBar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 8 */,
/* 9 */
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
	
	exports.default = {
	  props: {
	    mdShift: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return this.mdShift ? 'md-shift' : 'md-fixed';
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-bottom-bar",
	    class: _vm.classes
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-039c211e", module.exports)
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(12)
	
	/* template */
	var __vue_template__ = __webpack_require__(13)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdBottomBar/mdBottomBarItem.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1c07f8a4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1c07f8a4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdBottomBarItem.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 12 */
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
	
	exports.default = {
	  props: {
	    mdIcon: String,
	    mdActive: Boolean
	  },
	  data: function data() {
	    return {
	      active: false
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-active': this.active
	      };
	    }
	  },
	  watch: {
	    mdActive: function mdActive(active) {
	      this.setActive(active);
	    }
	  },
	  methods: {
	    setActive: function setActive(active) {
	      this.$parent.$children.forEach(function (item) {
	        item.active = false;
	      });
	
	      this.active = !!active;
	
	      this.$emit('click');
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$parent.$el.classList.contains('md-bottom-bar')) {
	      this.$destroy();
	
	      throw new Error('You should wrap the md-bottom-bar-item in a md-bottom-bar');
	    }
	
	    if (this.mdActive) {
	      this.active = true;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('button', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple"
	    }],
	    staticClass: "md-bottom-bar-item",
	    class: _vm.classes,
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": _vm.setActive
	    }
	  }, [_vm._h('md-icon', [_vm._s(_vm.mdIcon)]), " ", _vm._h('span', {
	    staticClass: "md-text"
	  }, [_vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1c07f8a4", module.exports)
	  }
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-bottom-bar.md-fixed, .THEME_NAME.md-bottom-bar.md-fixed {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME .md-bottom-bar.md-fixed .md-bottom-bar-item, .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME .md-bottom-bar.md-fixed .md-bottom-bar-item.md-active, .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item.md-active {\n      color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-bottom-bar.md-shift, .THEME_NAME.md-bottom-bar.md-shift {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-bottom-bar.md-shift .md-bottom-bar-item, .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME .md-bottom-bar.md-shift .md-bottom-bar-item.md-active, .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item.md-active {\n      color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-bottom-bar.md-shift.md-accent, .THEME_NAME.md-bottom-bar.md-shift.md-accent {\n    background-color: ACCENT-COLOR; }\n    .THEME_NAME .md-bottom-bar.md-shift.md-accent .md-bottom-bar-item, .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item {\n      color: ACCENT-CONTRAST-0.54; }\n      .THEME_NAME .md-bottom-bar.md-shift.md-accent .md-bottom-bar-item.md-active, .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item.md-active {\n        color: ACCENT-CONTRAST; }\n  .THEME_NAME .md-bottom-bar.md-shift.md-warn, .THEME_NAME.md-bottom-bar.md-shift.md-warn {\n    background-color: WARN-COLOR; }\n    .THEME_NAME .md-bottom-bar.md-shift.md-warn .md-bottom-bar-item, .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item {\n      color: WARN-CONTRAST-0.54; }\n      .THEME_NAME .md-bottom-bar.md-shift.md-warn .md-bottom-bar-item.md-active, .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item.md-active {\n        color: WARN-CONTRAST; }\n  .THEME_NAME .md-bottom-bar.md-shift.md-transparent, .THEME_NAME.md-bottom-bar.md-shift.md-transparent {\n    background-color: transparent; }\n    .THEME_NAME .md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item, .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item {\n      color: BACKGROUND-CONTRAST-0.54; }\n      .THEME_NAME .md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item.md-active, .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item.md-active {\n        color: BACKGROUND-CONTRAST; }\n"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.debug.js.map