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

	module.exports = __webpack_require__(206);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdAvatar = __webpack_require__(2);
	
	var _mdAvatar2 = _interopRequireDefault(_mdAvatar);
	
	var _mdAvatar3 = __webpack_require__(5);
	
	var _mdAvatar4 = _interopRequireDefault(_mdAvatar3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-avatar', Vue.extend(_mdAvatar2.default));
	
	  Vue.material.styles.push(_mdAvatar4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-1cbfca0d!sass!./mdAvatar.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* template */
	var __vue_template__ = __webpack_require__(4)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdAvatar/mdAvatar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1cbfca0d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1cbfca0d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdAvatar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-avatar"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1cbfca0d", module.exports)
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-avatar.md-primary.md-avatar-icon, .THEME_NAME.md-avatar.md-primary.md-avatar-icon {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME .md-avatar.md-primary.md-avatar-icon .md-icon, .THEME_NAME.md-avatar.md-primary.md-avatar-icon .md-icon {\n    color: PRIMARY-CONTRAST-0.99999; }\n\n.THEME_NAME .md-avatar.md-accent.md-avatar-icon, .THEME_NAME.md-avatar.md-accent.md-avatar-icon {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME .md-avatar.md-accent.md-avatar-icon .md-icon, .THEME_NAME.md-avatar.md-accent.md-avatar-icon .md-icon {\n    color: ACCENT-CONTRAST-0.99999; }\n\n.THEME_NAME .md-avatar.md-warn.md-avatar-icon, .THEME_NAME.md-avatar.md-warn.md-avatar-icon {\n  background-color: WARN-COLOR; }\n  .THEME_NAME .md-avatar.md-warn.md-avatar-icon .md-icon, .THEME_NAME.md-avatar.md-warn.md-avatar-icon .md-icon {\n    color: WARN-CONTRAST-0.99999; }\n"

/***/ },
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdButton = __webpack_require__(16);
	
	var _mdButton2 = _interopRequireDefault(_mdButton);
	
	var _mdButton3 = __webpack_require__(19);
	
	var _mdButton4 = _interopRequireDefault(_mdButton3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-button', Vue.extend(_mdButton2.default));
	
	  Vue.material.styles.push(_mdButton4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-9b3983a6!sass!./mdButton.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(18)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdButton/mdButton.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9b3983a6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9b3983a6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdButton.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	//
	//
	
	exports.default = {
	  props: {
	    href: String,
	    type: String,
	    disabled: Boolean
	  },
	  render: function render(createElement) {
	    var _this = this;
	
	    var isDisabled = Boolean(this.disabled);
	    var hasLink = Boolean(this.href);
	    var tag = 'button';
	    var options = {
	      staticClass: 'md-button',
	      attrs: {
	        type: this.type || 'button',
	        disabled: isDisabled
	      },
	      on: {
	        click: function click() {
	          _this.$emit('click');
	        }
	      }
	    };
	    var ripple = createElement('md-ink-ripple', {
	      attrs: {
	        mdDisabled: isDisabled
	      }
	    });
	
	    if (hasLink) {
	      tag = 'a';
	      options.attrs.href = this.href;
	      delete options.attrs.type;
	    }
	
	    return createElement(tag, options, [].concat(_toConsumableArray(this.$slots.default), [ripple]));
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-button:not([disabled]).md-raised:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button) {\n  color: BACKGROUND-COLOR-900;\n  background-color: BACKGROUND-COLOR-50; }\n  .THEME_NAME .md-button:not([disabled]).md-raised:not(.md-icon-button):hover, .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button):hover {\n    background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME .md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised) {\n  color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-fab, .THEME_NAME.md-button:not([disabled]).md-fab {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME .md-button:not([disabled]).md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-fab:hover {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME .md-button:not([disabled]).md-fab.md-clean, .THEME_NAME.md-button:not([disabled]).md-fab.md-clean {\n    color: BACKGROUND-COLOR-900;\n    background-color: BACKGROUND-COLOR-50; }\n    .THEME_NAME .md-button:not([disabled]).md-fab.md-clean:hover, .THEME_NAME.md-button:not([disabled]).md-fab.md-clean:hover {\n      background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-primary:not(.md-icon-button) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary.md-raised, .THEME_NAME .md-button:not([disabled]).md-primary.md-fab, .THEME_NAME.md-button:not([disabled]).md-primary.md-raised, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME .md-button:not([disabled]).md-primary.md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab:hover {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-accent:not(.md-icon-button) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent.md-raised, .THEME_NAME.md-button:not([disabled]).md-accent.md-raised {\n  background-color: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-accent.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-accent.md-raised:hover {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-warn:not(.md-icon-button) {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn.md-raised, .THEME_NAME .md-button:not([disabled]).md-warn.md-fab, .THEME_NAME.md-button:not([disabled]).md-warn.md-raised, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab {\n  background-color: WARN-COLOR;\n  color: WARN-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME .md-button:not([disabled]).md-warn.md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab:hover {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised) {\n  color: WARN-COLOR; }\n"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdButtonToggle = __webpack_require__(21);
	
	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);
	
	var _mdButtonToggle3 = __webpack_require__(25);
	
	var _mdButtonToggle4 = _interopRequireDefault(_mdButtonToggle3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-button-toggle', Vue.extend(_mdButtonToggle2.default));
	
	  Vue.material.styles.push(_mdButtonToggle4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-106cf22d!sass!./mdButtonToggle.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(23)
	
	/* template */
	var __vue_template__ = __webpack_require__(24)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdButtonToggle/mdButtonToggle.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-106cf22d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-106cf22d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdButtonToggle.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 22 */,
/* 23 */
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
	
	var onClickButton = void 0;
	
	exports.default = {
	  props: {
	    type: String
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.$children.forEach(function (child) {
	      var element = child.$el;
	      var toggleClass = 'md-toggle';
	
	      onClickButton = function onClickButton() {
	        if (_this.type === 'radio') {
	          _this.$children.forEach(function (child) {
	            child.$el.classList.remove(toggleClass);
	          });
	
	          element.classList.add(toggleClass);
	        } else {
	          element.classList.toggle(toggleClass);
	        }
	      };
	
	      if (element && element.classList.contains('md-button')) {
	        element.addEventListener('click', onClickButton);
	      }
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.$children.forEach(function (child) {
	      var element = child.$el;
	
	      if (element && element.classList.contains('md-button')) {
	        element.removeEventListener('click', onClickButton);
	      }
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-button-group md-button-toggle"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-106cf22d", module.exports)
	  }
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-button-toggle .md-button:after, .THEME_NAME.md-button-toggle .md-button:after {\n  width: 1px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  content: \" \"; }\n\n.THEME_NAME .md-button-toggle .md-toggle, .THEME_NAME.md-button-toggle .md-toggle {\n  color: BACKGROUND-CONTRAST-600;\n  background-color: BACKGROUND-COLOR-500; }\n  .THEME_NAME .md-button-toggle .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle .md-toggle:hover:not([disabled]) {\n    background-color: BACKGROUND-COLOR-600; }\n  .THEME_NAME .md-button-toggle .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle .md-toggle + .md-toggle:after {\n    background-color: BACKGROUND-COLOR-600; }\n\n.THEME_NAME .md-button-toggle.md-primary .md-toggle, .THEME_NAME.md-button-toggle.md-primary .md-toggle {\n  color: PRIMARY-CONTRAST;\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME .md-button-toggle.md-primary .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-primary .md-toggle:hover:not([disabled]) {\n    background-color: PRIMARY-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-primary .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-primary .md-toggle + .md-toggle:after {\n    background-color: PRIMARY-COLOR-700; }\n\n.THEME_NAME .md-button-toggle.md-accent .md-toggle, .THEME_NAME.md-button-toggle.md-accent .md-toggle {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME .md-button-toggle.md-accent .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-accent .md-toggle:hover:not([disabled]) {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-accent .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-accent .md-toggle + .md-toggle:after {\n    background-color: ACCENT-COLOR-700; }\n\n.THEME_NAME .md-button-toggle.md-warn .md-toggle, .THEME_NAME.md-button-toggle.md-warn .md-toggle {\n  color: WARN-CONTRAST;\n  background-color: WARN-COLOR; }\n  .THEME_NAME .md-button-toggle.md-warn .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-warn .md-toggle:hover:not([disabled]) {\n    background-color: WARN-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-warn .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-warn .md-toggle + .md-toggle:after {\n    background-color: WARN-COLOR-700; }\n\n.THEME_NAME .md-button-toggle [disabled], .THEME_NAME.md-button-toggle [disabled] {\n  color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME .md-button-toggle [disabled].md-toggle, .THEME_NAME.md-button-toggle [disabled].md-toggle {\n    color: BACKGROUND-CONTRAST-0.2;\n    background-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdCard = __webpack_require__(27);
	
	var _mdCard2 = _interopRequireDefault(_mdCard);
	
	var _mdCardMedia = __webpack_require__(31);
	
	var _mdCardMedia2 = _interopRequireDefault(_mdCardMedia);
	
	var _mdCardMediaCover = __webpack_require__(34);
	
	var _mdCardMediaCover2 = _interopRequireDefault(_mdCardMediaCover);
	
	var _mdCardMediaActions = __webpack_require__(37);
	
	var _mdCardMediaActions2 = _interopRequireDefault(_mdCardMediaActions);
	
	var _mdCardHeader = __webpack_require__(39);
	
	var _mdCardHeader2 = _interopRequireDefault(_mdCardHeader);
	
	var _mdCardHeaderText = __webpack_require__(41);
	
	var _mdCardHeaderText2 = _interopRequireDefault(_mdCardHeaderText);
	
	var _mdCardContent = __webpack_require__(44);
	
	var _mdCardContent2 = _interopRequireDefault(_mdCardContent);
	
	var _mdCardActions = __webpack_require__(46);
	
	var _mdCardActions2 = _interopRequireDefault(_mdCardActions);
	
	var _mdCardArea = __webpack_require__(48);
	
	var _mdCardArea2 = _interopRequireDefault(_mdCardArea);
	
	var _mdCardExpand = __webpack_require__(51);
	
	var _mdCardExpand2 = _interopRequireDefault(_mdCardExpand);
	
	var _mdCard3 = __webpack_require__(54);
	
	var _mdCard4 = _interopRequireDefault(_mdCard3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-card', Vue.extend(_mdCard2.default));
	  Vue.component('md-card-media', Vue.extend(_mdCardMedia2.default));
	  Vue.component('md-card-media-cover', Vue.extend(_mdCardMediaCover2.default));
	  Vue.component('md-card-media-actions', Vue.extend(_mdCardMediaActions2.default));
	  Vue.component('md-card-header', Vue.extend(_mdCardHeader2.default));
	  Vue.component('md-card-header-text', Vue.extend(_mdCardHeaderText2.default));
	  Vue.component('md-card-content', Vue.extend(_mdCardContent2.default));
	  Vue.component('md-card-actions', Vue.extend(_mdCardActions2.default));
	  Vue.component('md-card-area', Vue.extend(_mdCardArea2.default));
	  Vue.component('md-card-expand', Vue.extend(_mdCardExpand2.default));
	
	  Vue.material.styles.push(_mdCard4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-5074f4ed!sass!./mdCard.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(29)
	
	/* template */
	var __vue_template__ = __webpack_require__(30)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5074f4ed", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5074f4ed", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 28 */,
/* 29 */
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
	    mdWithHover: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-with-hover': this.mdWithHover
	      };
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card",
	    class: _vm.classes
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5074f4ed", module.exports)
	  }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(32)
	
	/* template */
	var __vue_template__ = __webpack_require__(33)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMedia.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-623c9b27", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-623c9b27", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMedia.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 32 */
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
	    mdRatio: String,
	    mdMedium: Boolean,
	    mdBig: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      var classes = {
	        'md-16-9': this.mdRatio === '16:9' || this.mdRatio === '16/9',
	        'md-4-3': this.mdRatio === '4:3' || this.mdRatio === '4/3',
	        'md-1-1': this.mdRatio === '1:1' || this.mdRatio === '1/1'
	      };
	
	      if (this.mdMedium || this.mdBig) {
	        classes = {
	          'md-medium': this.mdMedium,
	          'md-big': this.mdBig
	        };
	      }
	
	      return classes;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-media",
	    class: _vm.classes
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-623c9b27", module.exports)
	  }
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(35)
	
	/* template */
	var __vue_template__ = __webpack_require__(36)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMediaCover.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1a9ce900", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1a9ce900", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMediaCover.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 35 */
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
	
	var getImageAlpha = function getImageAlpha(image, onLoad) {
	  var canvas = document.createElement('canvas');
	
	  image.onload = function () {
	    var colorSum = 0;
	    var ctx = void 0;
	    var imageData = void 0;
	    var imageMetadata = void 0;
	    var r = void 0;
	    var g = void 0;
	    var b = void 0;
	    var average = void 0;
	
	    canvas.width = this.width;
	    canvas.height = this.height;
	    ctx = canvas.getContext('2d');
	
	    ctx.drawImage(this, 0, 0);
	
	    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    imageMetadata = imageData.data;
	
	    for (var x = 0, len = imageMetadata.length; x < len; x += 4) {
	      r = imageMetadata[x];
	      g = imageMetadata[x + 1];
	      b = imageMetadata[x + 2];
	
	      average = Math.floor((r + g + b) / 3);
	      colorSum += average;
	    }
	
	    onLoad(Math.floor(colorSum / (this.width * this.height)));
	  };
	};
	
	exports.default = {
	  props: {
	    mdTextScrim: Boolean,
	    mdSolid: Boolean
	  },
	  data: function data() {
	    return {
	      backdropBg: {}
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-text-scrim': this.mdTextScrim,
	        'md-solid': this.mdSolid
	      };
	    },
	    styles: function styles() {
	      return {
	        background: this.backdropBg
	      };
	    }
	  },
	  methods: {
	    applyScrimColor: function applyScrimColor(darkness) {
	      if (this.$refs.backdrop) {
	        this.backdropBg = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ' + darkness / 2 + ') 66%, rgba(0, 0, 0, ' + darkness + ') 100%)';
	      }
	    },
	    applySolidColor: function applySolidColor(darkness) {
	      var area = this.$el.querySelector('.md-card-area');
	
	      if (area) {
	        area.style.background = 'rgba(0, 0, 0, ' + darkness + ')';
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    var image = this.$el.querySelector('img');
	
	    if (image && (this.mdTextScrim || this.mdSolid)) {
	      getImageAlpha(image, function (lightness) {
	        var limit = 256;
	        var darkness = (Math.abs(limit - lightness) * 100 / limit + 15) / 100;
	
	        if (darkness >= 0.7) {
	          darkness = 0.7;
	        }
	
	        if (_this.mdTextScrim) {
	          _this.applyScrimColor(darkness);
	        } else if (_this.mdSolid) {
	          _this.applySolidColor(darkness);
	        }
	      });
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-media-cover",
	    class: _vm.classes
	  }, [_vm._t("default"), " ", (_vm.mdTextScrim) ? _vm._h('div', {
	    ref: "backdrop",
	    staticClass: "md-backdrop",
	    style: (_vm.styles)
	  }) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1a9ce900", module.exports)
	  }
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(38)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardMediaActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9711f4f4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9711f4f4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardMediaActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-media-actions"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9711f4f4", module.exports)
	  }
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(40)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardHeader.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2b945d4c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2b945d4c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardHeader.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-header"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2b945d4c", module.exports)
	  }
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(42)
	
	/* template */
	var __vue_template__ = __webpack_require__(43)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardHeaderText.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3c04eb27", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3c04eb27", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardHeaderText.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 42 */
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
	  mounted: function mounted() {
	    this.parentClasses = this.$parent.$el.classList;
	
	    if (this.parentClasses.contains('md-card-header')) {
	      this.insideParent = true;
	      this.parentClasses.add('md-card-header-flex');
	    }
	  },
	  destroyed: function destroyed() {
	    this.parentClasses.remove('md-card-header-flex');
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-header-text"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3c04eb27", module.exports)
	  }
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(45)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-015e0e7c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-015e0e7c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-content"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-015e0e7c", module.exports)
	  }
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(47)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-78014100", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-78014100", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-actions"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-78014100", module.exports)
	  }
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(49)
	
	/* template */
	var __vue_template__ = __webpack_require__(50)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardArea.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3894e89a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3894e89a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardArea.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 49 */
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
	    mdInset: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-inset': this.mdInset
	      };
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-card-area",
	    class: _vm.classes
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3894e89a", module.exports)
	  }
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(52)
	
	/* template */
	var __vue_template__ = __webpack_require__(53)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCard/mdCardExpand.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d6fa0232", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-d6fa0232", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCardExpand.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 52 */
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
	  methods: {
	    setContentMargin: function setContentMargin() {
	      this.content.style.marginTop = -this.content.offsetHeight + 'px';
	    },
	    toggle: function toggle() {
	      this.$refs.expand.classList.toggle('md-active');
	    },
	    onWindowResize: function onWindowResize() {
	      window.requestAnimationFrame(this.setContentMargin);
	    }
	  },
	  mounted: function mounted() {
	    this.trigger = this.$el.querySelector('[md-expand-trigger]');
	    this.content = this.$el.querySelector('.md-card-content');
	
	    if (this.content) {
	      this.setContentMargin();
	
	      this.trigger.addEventListener('click', this.toggle);
	      window.addEventListener('resize', this.onWindowResize);
	    }
	  },
	  destroyed: function destroyed() {
	    if (this.content) {
	      this.trigger.removeEventListener('click', this.toggle);
	      window.removeEventListener('resize', this.onWindowResize);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    ref: "expand",
	    staticClass: "md-card-expand"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d6fa0232", module.exports)
	  }
	}

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-card, .THEME_NAME.md-card {\n  background-color: BACKGROUND-COLOR-A100; }\n  .THEME_NAME .md-card .md-icon-button .md-icon, .THEME_NAME.md-card .md-icon-button .md-icon {\n    color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME .md-card > .md-card-area:after, .THEME_NAME.md-card > .md-card-area:after {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME .md-card .md-card-media-cover.md-text-scrim .md-backdrop, .THEME_NAME.md-card .md-card-media-cover.md-text-scrim .md-backdrop {\n    background: linear-gradient(to bottom, BACKGROUND-CONTRAST-0.0 20%, BACKGROUND-CONTRAST-0.275 66%, BACKGROUND-CONTRAST-0.55 100%); }\n  .THEME_NAME .md-card .md-card-media-cover.md-solid .md-card-area, .THEME_NAME.md-card .md-card-media-cover.md-solid .md-card-area {\n    background-color: BACKGROUND-CONTRAST-0.4; }\n  .THEME_NAME .md-card .md-card-expand .md-card-actions, .THEME_NAME.md-card .md-card-expand .md-card-actions {\n    background-color: BACKGROUND-COLOR-A100; }\n"

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdCheckbox = __webpack_require__(56);
	
	var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);
	
	var _mdCheckbox3 = __webpack_require__(60);
	
	var _mdCheckbox4 = _interopRequireDefault(_mdCheckbox3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-checkbox', Vue.extend(_mdCheckbox2.default));
	
	  Vue.material.styles.push(_mdCheckbox4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-9db725e6!sass!./mdCheckbox.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(58)
	
	/* template */
	var __vue_template__ = __webpack_require__(59)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdCheckbox/mdCheckbox.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9db725e6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9db725e6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCheckbox.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 57 */,
/* 58 */
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
	
	exports.default = {
	  props: {
	    name: String,
	    value: [String, Boolean],
	    id: String,
	    disabled: Boolean
	  },
	  data: function data() {
	    return {
	      checked: this.value
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-checked': Boolean(this.checked),
	        'md-disabled': this.disabled
	      };
	    }
	  },
	  watch: {
	    value: function value() {
	      this.checked = this.value;
	    }
	  },
	  methods: {
	    toggleCheck: function toggleCheck($event) {
	      if (!this.disabled) {
	        this.checked = !this.checked;
	        this.$emit('change', this.checked, $event);
	        this.$emit('input', this.checked, $event);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-checkbox",
	    class: _vm.classes
	  }, [_vm._h('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    staticClass: "md-checkbox-container",
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.toggleCheck($event)
	      }
	    }
	  }, [_vm._h('input', {
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
	  })]), " ", (_vm.$slots.default) ? _vm._h('label', {
	    staticClass: "md-checkbox-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9db725e6", module.exports)
	  }
	}

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-checkbox.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-checked .md-checkbox-container {\n  background-color: ACCENT-COLOR;\n  border-color: ACCENT-COLOR; }\n  .THEME_NAME .md-checkbox.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-checked .md-checkbox-container:after {\n    border-color: ACCENT-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-checkbox.md-checked .md-ripple, .THEME_NAME.md-checkbox.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-checkbox.md-primary.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container {\n  background-color: PRIMARY-COLOR;\n  border-color: PRIMARY-COLOR; }\n  .THEME_NAME .md-checkbox.md-primary.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container:after {\n    border-color: PRIMARY-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-primary.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-checkbox.md-warn.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container {\n  background-color: WARN-COLOR;\n  border-color: WARN-COLOR; }\n  .THEME_NAME .md-checkbox.md-warn.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container:after {\n    border-color: WARN-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-warn.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-checkbox.md-disabled.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-disabled.md-checked .md-checkbox-container {\n  background-color: rgba(0, 0, 0, 0.26);\n  border-color: transparent; }\n\n.THEME_NAME .md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container, .THEME_NAME.md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTheme = __webpack_require__(62);
	
	var _mdTheme2 = _interopRequireDefault(_mdTheme);
	
	var _mdInkRipple = __webpack_require__(65);
	
	var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);
	
	var _core = __webpack_require__(69);
	
	var _core2 = _interopRequireDefault(_core);
	
	__webpack_require__(70);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Code Components */
	function install(Vue) {
	  if (install.installed) {
	    console.warn('Vue Material is already installed.');
	
	    return;
	  }
	
	  install.installed = true;
	
	  Vue.material = {
	    styles: [_core2.default]
	  };
	
	  Vue.use(_mdTheme2.default);
	  Vue.use(_mdInkRipple2.default);
	}
	
	/* Core Stylesheets */
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _palette = __webpack_require__(63);
	
	var _palette2 = _interopRequireDefault(_palette);
	
	var _rgba = __webpack_require__(64);
	
	var _rgba2 = _interopRequireDefault(_rgba);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VALID_THEME_TYPE = ['primary', 'accent', 'background', 'warn', 'hue-1', 'hue-2', 'hue-3'];
	var DEFAULT_THEME_COLORS = {
	  primary: 'indigo',
	  accent: 'pink',
	  background: 'grey',
	  warn: 'deep-orange'
	};
	/*const DEFAULT_HUES = {
	  accent: {
	    'hue-1': 'A100',
	    'hue-2': 'A400',
	    'hue-3': 'A700'
	  },
	  background: {
	    'hue-1': 'A100',
	    'hue-2': '100',
	    'hue-3': '300'
	  }
	};*/
	
	var createNewStyleElement = function createNewStyleElement(style, name) {
	  var head = document.head;
	  var styleId = 'md-theme-' + name;
	
	  if (!head.querySelector('#' + styleId)) {
	    var newTag = document.createElement('style');
	
	    style = style.replace(/THEME_NAME/g, styleId);
	
	    newTag.type = 'text/css';
	    newTag.id = styleId;
	    newTag.textContent = style;
	
	    head.appendChild(newTag);
	  }
	};
	
	var registeredThemes = [];
	
	var parseStyle = function parseStyle(style, theme) {
	  VALID_THEME_TYPE.forEach(function (type) {
	    style = style.replace(RegExp('(' + type.toUpperCase() + ')-(COLOR|CONTRAST)-?(A?\\d*)-?(\\d*\\.?\\d+)?', 'g'), function (match, paletteType, colorType, hue, opacity) {
	      var color = void 0;
	      var colorVariant = +hue === 0 ? 500 : hue;
	
	      if (theme[type]) {
	        if (typeof theme[type] === 'string') {
	          color = _palette2.default[theme[type]];
	        } else {
	          color = _palette2.default[theme[type].color] || _palette2.default[DEFAULT_THEME_COLORS[type]];
	          colorVariant = +hue === 0 ? theme[type].hue : hue;
	        }
	      } else {
	        color = _palette2.default[DEFAULT_THEME_COLORS[type]];
	      }
	
	      if (colorType === 'COLOR') {
	        var isDefault = _palette2.default[theme[type]];
	
	        if (!hue && !isDefault) {
	          if (type === 'accent') {
	            colorVariant = 'A200';
	          } else if (type === 'background') {
	            colorVariant = 50;
	          }
	        }
	
	        if (opacity) {
	          return (0, _rgba2.default)(color[colorVariant], opacity);
	        }
	
	        return color[colorVariant];
	      }
	
	      if (color.darkText.indexOf(colorVariant) >= 0) {
	        if (opacity) {
	          return (0, _rgba2.default)('#000', opacity);
	        }
	
	        return 'rgba(0, 0, 0, .87)';
	      }
	
	      if (opacity) {
	        return (0, _rgba2.default)('#fff', opacity);
	      }
	
	      return 'rgba(255, 255, 255, .87)';
	    });
	  });
	
	  return style;
	};
	
	var registerTheme = function registerTheme(theme, name, themeStyles) {
	  var parsedStyle = [];
	
	  themeStyles.forEach(function (style) {
	    parsedStyle.push(parseStyle(style, theme));
	  });
	
	  createNewStyleElement(parsedStyle.join('\n'), name);
	};
	
	var registerAllThemes = function registerAllThemes(themes, themeStyles) {
	  var themeNames = themes ? Object.keys(themes) : [];
	
	  if (themeNames.indexOf('default') === -1) {
	    registerTheme(DEFAULT_THEME_COLORS, 'default', themeStyles);
	    registeredThemes.push('default');
	  }
	
	  themeNames.forEach(function (name) {
	    registerTheme(themes[name], name, themeStyles);
	    registeredThemes.push(name);
	  });
	};
	
	var registerDirective = function registerDirective(element, _ref) {
	  var value = _ref.value,
	      oldValue = _ref.oldValue;
	
	  var theme = value;
	  var newClass = 'md-theme-' + theme;
	  var oldClass = 'md-theme-' + oldValue;
	
	  if (!element.classList.contains(newClass)) {
	    element.classList.remove(oldClass);
	
	    if (theme && registeredThemes.indexOf(theme) >= 0) {
	      element.classList.add(newClass);
	    } else {
	      element.classList.add(oldClass);
	      console.warn('Attempted to use unregistered theme "' + theme + '\".');
	    }
	  }
	};
	
	function install(Vue) {
	  Vue.directive('mdTheme', registerDirective);
	
	  Vue.material.theme = {
	    register: function register(name, spec) {
	      var theme = {};
	
	      theme[name] = spec;
	
	      registerAllThemes(theme, Vue.material.styles);
	    },
	    registerAll: function registerAll(themes) {
	      registerAllThemes(themes, Vue.material.styles);
	    }
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  red: {
	    50: '#ffebee',
	    100: '#ffcdd2',
	    200: '#ef9a9a',
	    300: '#e57373',
	    400: '#ef5350',
	    500: '#f44336',
	    600: '#e53935',
	    700: '#d32f2f',
	    800: '#c62828',
	    900: '#b71c1c',
	    A100: '#ff8a80',
	    A200: '#ff5252',
	    A400: '#ff1744',
	    A700: '#d50000',
	    darkText: [50, 100, 200, 300, 'A100']
	  },
	  pink: {
	    50: '#fce4ec',
	    100: '#f8bbd0',
	    200: '#f48fb1',
	    300: '#f06292',
	    400: '#ec407a',
	    500: '#e91e63',
	    600: '#d81b60',
	    700: '#c2185b',
	    800: '#ad1457',
	    900: '#880e4f',
	    A100: '#ff80ab',
	    A200: '#ff4081',
	    A400: '#f50057',
	    A700: '#c51162',
	    darkText: [50, 100, 200, 'A100']
	  },
	  purple: {
	    50: '#f3e5f5',
	    100: '#e1bee7',
	    200: '#ce93d8',
	    300: '#ba68c8',
	    400: '#ab47bc',
	    500: '#9c27b0',
	    600: '#8e24aa',
	    700: '#7b1fa2',
	    800: '#6a1b9a',
	    900: '#4a148c',
	    A100: '#ea80fc',
	    A200: '#e040fb',
	    A400: '#d500f9',
	    A700: '#aa00ff',
	    darkText: [50, 100, 200, 'A100']
	  },
	  'deep-purple': {
	    50: '#ede7f6',
	    100: '#d1c4e9',
	    200: '#b39ddb',
	    300: '#9575cd',
	    400: '#7e57c2',
	    500: '#673ab7',
	    600: '#5e35b1',
	    700: '#512da8',
	    800: '#4527a0',
	    900: '#311b92',
	    A100: '#b388ff',
	    A200: '#7c4dff',
	    A400: '#651fff',
	    A700: '#6200ea',
	    darkText: [50, 100, 200, 'A100']
	  },
	  indigo: {
	    50: '#e8eaf6',
	    100: '#c5cae9',
	    200: '#9fa8da',
	    300: '#7986cb',
	    400: '#5c6bc0',
	    500: '#3f51b5',
	    600: '#3949ab',
	    700: '#303f9f',
	    800: '#283593',
	    900: '#1a237e',
	    A100: '#8c9eff',
	    A200: '#536dfe',
	    A400: '#3d5afe',
	    A700: '#304ffe',
	    darkText: [50, 100, 200, 'A100']
	  },
	  blue: {
	    50: '#e3f2fd',
	    100: '#bbdefb',
	    200: '#90caf9',
	    300: '#64b5f6',
	    400: '#42a5f5',
	    500: '#2196f3',
	    600: '#1e88e5',
	    700: '#1976d2',
	    800: '#1565c0',
	    900: '#0d47a1',
	    A100: '#82b1ff',
	    A200: '#448aff',
	    A400: '#2979ff',
	    A700: '#2962ff',
	    darkText: [50, 100, 200, 300, 400, 'A100']
	  },
	  'light-blue': {
	    50: '#e1f5fe',
	    100: '#b3e5fc',
	    200: '#81d4fa',
	    300: '#4fc3f7',
	    400: '#29b6f6',
	    500: '#03a9f4',
	    600: '#039be5',
	    700: '#0288d1',
	    800: '#0277bd',
	    900: '#01579b',
	    A100: '#80d8ff',
	    A200: '#40c4ff',
	    A400: '#00b0ff',
	    A700: '#0091ea',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300']
	  },
	  cyan: {
	    50: '#e0f7fa',
	    100: '#b2ebf2',
	    200: '#80deea',
	    300: '#4dd0e1',
	    400: '#26c6da',
	    500: '#00bcd4',
	    600: '#00acc1',
	    700: '#0097a7',
	    800: '#00838f',
	    900: '#006064',
	    A100: '#84ffff',
	    A200: '#18ffff',
	    A400: '#00e5ff',
	    A700: '#00b8d4',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
	  },
	  teal: {
	    50: '#e0f2f1',
	    100: '#b2dfdb',
	    200: '#80cbc4',
	    300: '#4db6ac',
	    400: '#26a69a',
	    500: '#009688',
	    600: '#00897b',
	    700: '#00796b',
	    800: '#00695c',
	    900: '#004d40',
	    A100: '#a7ffeb',
	    A200: '#64ffda',
	    A400: '#1de9b6',
	    A700: '#00bfa5',
	    darkText: [50, 100, 200, 300, 400, 'A100', 'A200', 'A300', 'A400']
	  },
	  green: {
	    50: '#e8f5e9',
	    100: '#c8e6c9',
	    200: '#a5d6a7',
	    300: '#81c784',
	    400: '#66bb6a',
	    500: '#4caf50',
	    600: '#43a047',
	    700: '#388e3c',
	    800: '#2e7d32',
	    900: '#1b5e20',
	    A100: '#b9f6ca',
	    A200: '#69f0ae',
	    A400: '#00e676',
	    A700: '#00c853',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100', 'A200', 'A300', 'A400']
	  },
	  'light-green': {
	    50: '#f1f8e9',
	    100: '#dcedc8',
	    200: '#c5e1a5',
	    300: '#aed581',
	    400: '#9ccc65',
	    500: '#8bc34a',
	    600: '#7cb342',
	    700: '#689f38',
	    800: '#558b2f',
	    900: '#33691e',
	    A100: '#ccff90',
	    A200: '#b2ff59',
	    A400: '#76ff03',
	    A700: '#64dd17',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 'A100', 'A200', 'A300', 'A400']
	  },
	  lime: {
	    50: '#f9fbe7',
	    100: '#f0f4c3',
	    200: '#e6ee9c',
	    300: '#dce775',
	    400: '#d4e157',
	    500: '#cddc39',
	    600: '#c0ca33',
	    700: '#afb42b',
	    800: '#9e9d24',
	    900: '#827717',
	    A100: '#f4ff81',
	    A200: '#eeff41',
	    A400: '#c6ff00',
	    A700: '#aeea00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 'A100', 'A200', 'A300', 'A400']
	  },
	  yellow: {
	    50: '#fffde7',
	    100: '#fff9c4',
	    200: '#fff59d',
	    300: '#fff176',
	    400: '#ffee58',
	    500: '#ffeb3b',
	    600: '#fdd835',
	    700: '#fbc02d',
	    800: '#f9a825',
	    900: '#f57f17',
	    A100: '#ffff8d',
	    A200: '#ffff00',
	    A400: '#ffea00',
	    A700: '#ffd600',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  amber: {
	    50: '#fff8e1',
	    100: '#ffecb3',
	    200: '#ffe082',
	    300: '#ffd54f',
	    400: '#ffca28',
	    500: '#ffc107',
	    600: '#ffb300',
	    700: '#ffa000',
	    800: '#ff8f00',
	    900: '#ff6f00',
	    A100: '#ffe57f',
	    A200: '#ffd740',
	    A400: '#ffc400',
	    A700: '#ffab00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  orange: {
	    50: '#fff3e0',
	    100: '#ffe0b2',
	    200: '#ffcc80',
	    300: '#ffb74d',
	    400: '#ffa726',
	    500: '#ff9800',
	    600: '#fb8c00',
	    700: '#f57c00',
	    800: '#ef6c00',
	    900: '#e65100',
	    A100: '#ffd180',
	    A200: '#ffab40',
	    A400: '#ff9100',
	    A700: '#ff6d00',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 'A100', 'A200', 'A300', 'A400']
	  },
	  'deep-orange': {
	    50: '#fbe9e7',
	    100: '#ffccbc',
	    200: '#ffab91',
	    300: '#ff8a65',
	    400: '#ff7043',
	    500: '#ff5722',
	    600: '#f4511e',
	    700: '#e64a19',
	    800: '#d84315',
	    900: '#bf360c',
	    A100: '#ff9e80',
	    A200: '#ff6e40',
	    A400: '#ff3d00',
	    A700: '#dd2c00',
	    darkText: [50, 100, 200, 300, 400, 'A100', 'A200']
	  },
	  brown: {
	    50: '#efebe9',
	    100: '#d7ccc8',
	    200: '#bcaaa4',
	    300: '#a1887f',
	    400: '#8d6e63',
	    500: '#795548',
	    600: '#6d4c41',
	    700: '#5d4037',
	    800: '#4e342e',
	    900: '#3e2723',
	    A100: '#d7ccc8',
	    A200: '#bcaaa4',
	    A400: '#8d6e63',
	    A700: '#5d4037',
	    darkText: [50, 100, 200, 'A100', 'A200', 'A300', 'A400']
	  },
	  grey: {
	    50: '#fafafa',
	    100: '#f5f5f5',
	    200: '#eeeeee',
	    300: '#e0e0e0',
	    400: '#bdbdbd',
	    500: '#9e9e9e',
	    600: '#757575',
	    700: '#616161',
	    800: '#424242',
	    900: '#212121',
	    A100: '#fff',
	    A200: '#000000',
	    A400: '#303030',
	    A700: '#616161',
	    darkText: [50, 100, 200, 300, 400, 500, 'A100']
	  },
	  'blue-grey': {
	    50: '#eceff1',
	    100: '#cfd8dc',
	    200: '#b0bec5',
	    300: '#90a4ae',
	    400: '#78909c',
	    500: '#607d8b',
	    600: '#546e7a',
	    700: '#455a64',
	    800: '#37474f',
	    900: '#263238',
	    A100: '#cfd8dc',
	    A200: '#b0bec5',
	    A400: '#78909c',
	    A700: '#455a64',
	    darkText: [50, 100, 200, 300, 'A100', 'A200', 'A300', 'A400']
	  },
	  white: {
	    50: '#fff',
	    100: '#fff',
	    200: '#fff',
	    300: '#fff',
	    400: '#fff',
	    500: '#fff',
	    600: '#fff',
	    700: '#fff',
	    800: '#fff',
	    900: '#fff',
	    A100: '#fff',
	    A200: '#fff',
	    A400: '#fff',
	    A700: '#fff',
	    darkText: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A300', 'A400']
	  },
	  black: {
	    50: '#000',
	    100: '#000',
	    200: '#000',
	    300: '#000',
	    400: '#000',
	    500: '#000',
	    600: '#000',
	    700: '#000',
	    800: '#000',
	    900: '#000',
	    A100: '#000',
	    A200: '#000',
	    A400: '#000',
	    A700: '#000',
	    darkText: []
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (hex, opacity) {
	  var r = '';
	  var g = '';
	  var b = '';
	  var match = hex.toString().match(/^#?(([0-9a-zA-Z]{3}){1,3})$/);
	
	  if (!match) {
	    throw new Error('Invalid color' + hex);
	  }
	
	  hex = match[1];
	
	  if (hex.length === 6) {
	    r = parseInt(hex.substring(0, 2), 16);
	    g = parseInt(hex.substring(2, 4), 16);
	    b = parseInt(hex.substring(4, 6), 16);
	  } else if (hex.length === 3) {
	    var rSubstring = hex.substring(0, 1);
	    var gSubstring = hex.substring(1, 2);
	    var bSubstring = hex.substring(2, 3);
	
	    r = parseInt(rSubstring + rSubstring, 16);
	    g = parseInt(gSubstring + gSubstring, 16);
	    b = parseInt(bSubstring + bSubstring, 16);
	  }
	
	  if (opacity) {
	    if (opacity > 1) {
	      opacity = opacity / 100;
	    }
	
	    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
	  }
	
	  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	};
	
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	__webpack_require__(66);
	
	__webpack_require__(67);
	
	function install(Vue) {
	  var rippleParentClass = 'md-ink-ripple';
	  var rippleClass = 'md-ripple';
	  var rippleActiveClass = 'md-active';
	  var registeredMouseFunction = void 0;
	  var referenceElement = void 0;
	
	  var unregisterMouseEvent = function unregisterMouseEvent() {
	    referenceElement.removeEventListener('mousedown', registeredMouseFunction);
	  };
	
	  var registerMouseEvent = function registerMouseEvent(element, holder) {
	    if (holder) {
	      (function () {
	        var ripple = holder.querySelector(':scope > .' + rippleParentClass + '> .' + rippleClass);
	
	        if (ripple) {
	          registeredMouseFunction = function registeredMouseFunction(event) {
	            var rect = holder.getBoundingClientRect();
	
	            event.stopPropagation();
	
	            ripple.classList.remove(rippleActiveClass);
	
	            var top = event.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
	            var left = event.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
	
	            ripple.style.top = top + 'px';
	            ripple.style.left = left + 'px';
	
	            ripple.classList.add(rippleActiveClass);
	          };
	
	          element.removeEventListener('mousedown', registeredMouseFunction);
	          element.addEventListener('mousedown', registeredMouseFunction);
	        }
	      })();
	    }
	  };
	
	  var createElement = function createElement(ripple, className, size) {
	    ripple = document.createElement('div');
	    ripple.className = className;
	
	    if (size) {
	      ripple.style.width = size;
	      ripple.style.height = size;
	    }
	
	    return ripple;
	  };
	
	  var checkAvailablePositions = function checkAvailablePositions(element) {
	    var availablePositions = ['relative', 'absolute', 'fixed'];
	
	    return availablePositions.indexOf(getComputedStyle(element).position) > -1;
	  };
	
	  var getClosestParent = function getClosestParent(element) {
	    var found = false;
	    var parent = element;
	
	    if (!element) {
	      return false;
	    }
	
	    if (checkAvailablePositions(element)) {
	      return element;
	    }
	
	    while (!found) {
	      parent = parent.parentNode;
	
	      if (!parent || parent.tagName.toLowerCase() === 'body') {
	        break;
	      }
	
	      if (parent && checkAvailablePositions(parent)) {
	        found = parent;
	      }
	    }
	
	    return found;
	  };
	
	  var createRipple = function createRipple(element, currentRipple) {
	    var holder = getClosestParent(element);
	
	    if (holder) {
	      var ripple = holder.querySelector(':scope > .' + rippleParentClass + '> .' + rippleClass);
	
	      if (!ripple) {
	        var elementSize = Math.round(Math.max(holder.offsetWidth, holder.offsetHeight)) + 'px';
	        var rippleParent = currentRipple || createElement(ripple, rippleParentClass);
	        var rippleElement = createElement(ripple, rippleClass, elementSize);
	
	        rippleParent.appendChild(rippleElement);
	        holder.appendChild(rippleParent);
	      }
	
	      if (holder !== element || !ripple) {
	        referenceElement = element;
	        registerMouseEvent(element, holder);
	      }
	    }
	  };
	
	  Vue.directive('mdInkRipple', function (el, bindings) {
	    Vue.nextTick(function () {
	      if (!bindings.value) {
	        createRipple(el);
	      } else {
	        unregisterMouseEvent(el);
	      }
	    });
	  });
	
	  Vue.component('md-ink-ripple', {
	    props: {
	      mdDisabled: Boolean
	    },
	    render: function render(createElement) {
	      return createElement('div', {
	        staticClass: 'md-ink-ripple'
	      });
	    },
	
	    watch: {
	      mdDisabled: function mdDisabled() {
	        if (this.mdDisabled) {
	          unregisterMouseEvent(this.$el.parentNode);
	        } else {
	          createRipple(this.$el.parentNode, this.$el);
	        }
	      }
	    },
	    mounted: function mounted() {
	      if (!this.mdDisabled) {
	        createRipple(this.$el.parentNode, this.$el);
	      }
	    },
	    destroyed: function destroyed() {
	      unregisterMouseEvent(this.$el.parentNode);
	    }
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports) {

	/* scopeQuerySelectorShim.js
	*
	* Copyright (C) 2015 Larry Davis
	* All rights reserved.
	*
	* This software may be modified and distributed under the terms
	* of the BSD license.  See the LICENSE file for details.
	*/
	(function() {
	    if (!HTMLElement.prototype.querySelectorAll) {
	        throw new Error("rootedQuerySelectorAll: This polyfill can only be used with browsers that support querySelectorAll");
	    }
	    // A temporary element to query against for elements not currently in the DOM
	    // We'll also use this element to test for :scope support
	    var container = document.createElement("div");
	    // Check if the browser supports :scope
	    try {
	        // Browser supports :scope, do nothing
	        container.querySelectorAll(":scope *");
	    } catch (e) {
	        // Match usage of scope
	        var scopeRE = /^\s*:scope/gi;
	        // Overrides
	        function overrideNodeMethod(prototype, methodName) {
	            // Store the old method for use later
	            var oldMethod = prototype[methodName];
	            // Override the method
	            prototype[methodName] = function(query) {
	                var nodeList, gaveId = false, gaveContainer = false;
	                if (query.match(scopeRE)) {
	                    // Remove :scope
	                    query = query.replace(scopeRE, "");
	                    if (!this.parentNode) {
	                        // Add to temporary container
	                        container.appendChild(this);
	                        gaveContainer = true;
	                    }
	                    parentNode = this.parentNode;
	                    if (!this.id) {
	                        // Give temporary ID
	                        this.id = "rootedQuerySelector_id_" + new Date().getTime();
	                        gaveId = true;
	                    }
	                    // Find elements against parent node
	                    nodeList = oldMethod.call(parentNode, "#" + this.id + " " + query);
	                    // Reset the ID
	                    if (gaveId) {
	                        this.id = "";
	                    }
	                    // Remove from temporary container
	                    if (gaveContainer) {
	                        container.removeChild(this);
	                    }
	                    return nodeList;
	                } else {
	                    // No immediate child selector used
	                    return oldMethod.call(this, query);
	                }
	            };
	        }
	        // Browser doesn't support :scope, add polyfill
	        overrideNodeMethod(HTMLElement.prototype, "querySelector");
	        overrideNodeMethod(HTMLElement.prototype, "querySelectorAll");
	    }
	})();

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-40442342!sass!./mdInkRipple.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/core/components/mdInkRipple/mdInkRipple.vue"
	if (__vue_options__.functional) {console.error("[vue-loader] mdInkRipple.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 68 */,
/* 69 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME :not(input):not(textarea)::selection {\n  background: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n\n.THEME_NAME a:not(.md-button) {\n  color: ACCENT-COLOR; }\n  .THEME_NAME a:not(.md-button):hover {\n    color: ACCENT-COLOR-800; }\n\nbody.THEME_NAME {\n  background-color: BACKGROUND-COLOR-50;\n  color: BACKGROUND-CONTRAST-0.87; }\n\n/* Typography */\n.THEME_NAME .md-caption,\n.THEME_NAME .md-display-1,\n.THEME_NAME .md-display-2,\n.THEME_NAME .md-display-3,\n.THEME_NAME .md-display-4 {\n  color: BACKGROUND-CONTRAST-0.57; }\n\n.THEME_NAME code:not(.hljs) {\n  background-color: ACCENT-COLOR-A100-0.2;\n  color: ACCENT-COLOR-800; }\n"

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(71);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(73)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./core.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./core.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(72)();
	// imports
	
	
	// module
	exports.push([module.id, "/*  Common\n   ========================================================================== */\n/*  Transitions - Based on Angular Material\n   ========================================================================== */\n/*  Elevation - Based on Angular Material\n   ========================================================================== */\n/*  Structure\n   ========================================================================== */\nhtml {\n  height: 100%;\n  box-sizing: border-box; }\n  html *,\n  html *:before,\n  html *:after {\n    box-sizing: inherit; }\n\nbody {\n  min-height: 100%;\n  margin: 0;\n  position: relative;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.87);\n  font-family: Roboto, Lato, sans-serif; }\n\n/*  Fluid Media\n   ========================================================================== */\naudio,\nimg,\nsvg,\nobject,\nembed,\ncanvas,\nvideo,\niframe {\n  max-width: 100%;\n  height: auto;\n  font-style: italic;\n  vertical-align: middle; }\n\n/*  Suppress the focus outline on links that cannot be accessed via keyboard.\n    This prevents an unwanted focus outline from appearing around elements\n    that might still respond to pointer events.\n   ========================================================================== */\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\n.md-scrollbar::-webkit-scrollbar,\n.md-scrollbar ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.12);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  background-color: rgba(0, 0, 0, 0.05); }\n  .md-scrollbar::-webkit-scrollbar:hover,\n  .md-scrollbar ::-webkit-scrollbar:hover {\n    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.038);\n    background-color: rgba(0, 0, 0, 0.087); }\n\n.md-scrollbar::-webkit-scrollbar-button,\n.md-scrollbar ::-webkit-scrollbar-button {\n  display: none; }\n\n.md-scrollbar::-webkit-scrollbar-corner,\n.md-scrollbar ::-webkit-scrollbar-corner {\n  background-color: transparent; }\n\n.md-scrollbar::-webkit-scrollbar-thumb,\n.md-scrollbar ::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.26);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.087);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n\n/*  Text and Titles\n   ========================================================================== */\n.md-caption {\n  font-size: 12px;\n  font-weight: 400;\n  letter-spacing: .02em;\n  line-height: 17px; }\n\n.md-body-1, body {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-subheading {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: .005em;\n  line-height: 26px; }\n\n.md-headline {\n  font-size: 24px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 32px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 40px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 48px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -.005em;\n  line-height: 58px; }\n\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -.01em;\n  line-height: 112px; }\n\n/*  Links & Buttons\n   ========================================================================== */\na:not(.md-button) {\n  text-decoration: none; }\n  a:not(.md-button):hover {\n    text-decoration: underline; }\n\nbutton:focus {\n  outline: none; }\n", ""]);
	
	// exports


/***/ },
/* 72 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdDivider = __webpack_require__(75);
	
	var _mdDivider2 = _interopRequireDefault(_mdDivider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-divider', Vue.extend(_mdDivider2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-30e870da!sass!./mdDivider.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* template */
	var __vue_template__ = __webpack_require__(77)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDivider/mdDivider.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-30e870da", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-30e870da", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDivider.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 76 */,
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('hr', {
	    staticClass: "md-divider"
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-30e870da", module.exports)
	  }
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdIcon = __webpack_require__(79);
	
	var _mdIcon2 = _interopRequireDefault(_mdIcon);
	
	var _mdIcon3 = __webpack_require__(82);
	
	var _mdIcon4 = _interopRequireDefault(_mdIcon3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-icon', Vue.extend(_mdIcon2.default));
	
	  Vue.material.styles.push(_mdIcon4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-f5836666!sass!./mdIcon.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* template */
	var __vue_template__ = __webpack_require__(81)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdIcon/mdIcon.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f5836666", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f5836666", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdIcon.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 80 */,
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('i', {
	    staticClass: "md-icon material-icons"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f5836666", module.exports)
	  }
	}

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-icon.md-primary, .THEME_NAME.md-icon.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-icon.md-accent, .THEME_NAME.md-icon.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-icon.md-warn, .THEME_NAME.md-icon.md-warn {\n  color: WARN-COLOR; }\n"

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdInputContainer = __webpack_require__(84);
	
	var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);
	
	var _mdInput = __webpack_require__(89);
	
	var _mdInput2 = _interopRequireDefault(_mdInput);
	
	var _mdTextarea = __webpack_require__(94);
	
	var _mdTextarea2 = _interopRequireDefault(_mdTextarea);
	
	var _mdInputContainer3 = __webpack_require__(98);
	
	var _mdInputContainer4 = _interopRequireDefault(_mdInputContainer3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-input-container', _mdInputContainer2.default);
	  Vue.component('md-input', _mdInput2.default);
	  Vue.component('md-textarea', _mdTextarea2.default);
	
	  Vue.material.styles.push(_mdInputContainer4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-4e747acd!sass!./mdInputContainer.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(86)
	
	/* template */
	var __vue_template__ = __webpack_require__(88)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdInputContainer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4e747acd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4e747acd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdInputContainer.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isArray = __webpack_require__(87);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdInline: Boolean,
	    mdDisabled: Boolean,
	    mdHasPassword: Boolean
	  },
	  data: function data() {
	    return {
	      value: '',
	      input: false,
	      showPassword: false,
	      enableCounter: false,
	      hasSelect: false,
	      hasPlaceholder: false,
	      isDisabled: false,
	      isRequired: false,
	      isFocused: false,
	      counterLength: 0,
	      inputLength: 0
	    };
	  },
	
	  computed: {
	    hasValue: function hasValue() {
	      if ((0, _isArray2.default)(this.value)) {
	        return this.value.length > 0;
	      }
	
	      return Boolean(this.value);
	    },
	    classes: function classes() {
	      return {
	        'md-input-inline': this.mdInline,
	        'md-has-password': this.mdHasPassword,
	        'md-has-select': this.hasSelect,
	        'md-has-value': this.hasValue,
	        'md-input-placeholder': this.hasPlaceholder,
	        'md-input-disabled': this.isDisabled,
	        'md-input-required': this.isRequired,
	        'md-input-focused': this.isFocused
	      };
	    }
	  },
	  methods: {
	    isInput: function isInput() {
	      return this.input && this.input.tagName.toLowerCase() === 'input';
	    },
	    togglePasswordType: function togglePasswordType() {
	      if (this.isInput()) {
	        if (this.input.type === 'password') {
	          this.input.type = 'text';
	          this.showPassword = true;
	        } else {
	          this.input.type = 'password';
	          this.showPassword = false;
	        }
	
	        this.input.focus();
	      }
	    },
	    setValue: function setValue(value) {
	      this.value = value;
	    }
	  },
	  mounted: function mounted() {
	    this.input = this.$el.querySelectorAll('input, textarea, select')[0];
	
	    if (!this.input) {
	      this.$destroy();
	
	      throw new Error('Missing input/select/textarea inside md-input-container');
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

	module.exports = exports['default'];

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = function isArray(value) {
	  return value && value.constructor === Array;
	};
	
	exports.default = isArray;
	module.exports = exports["default"];

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-input-container",
	    class: _vm.classes
	  }, [_vm._t("default"), " ", (_vm.enableCounter) ? _vm._h('span', {
	    staticClass: "md-count"
	  }, [_vm._s(_vm.inputLength) + " / " + _vm._s(_vm.counterLength)]) : _vm._e(), " ", (_vm.mdHasPassword) ? _vm._h('md-button', {
	    staticClass: "md-icon-button md-toggle-password",
	    on: {
	      "click": _vm.togglePasswordType
	    }
	  }, [_vm._h('md-icon', [_vm._s(_vm.showPassword ? 'visibility_off' : 'visibility')])]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4e747acd", module.exports)
	  }
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(90)
	
	/* template */
	var __vue_template__ = __webpack_require__(93)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdInput.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-53a56078", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-53a56078", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdInput.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(91);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
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
	
	exports.default = {
	  mixins: [_common2.default],
	  props: {
	    type: {
	      type: String,
	      default: 'text'
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    if (!this.parentContainer) {
	      this.$destroy();
	
	      throw new Error('You should wrap the md-input in a md-input-container');
	    }
	
	    this.setParentDisabled();
	    this.setParentRequired();
	    this.setParentPlaceholder();
	    this.setParentValue();
	    this.handleMaxLength();
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    value: [String, Number],
	    disabled: Boolean,
	    required: Boolean,
	    maxlength: [Number, String],
	    placeholder: String
	  },
	  watch: {
	    value: function value() {
	      this.setParentValue();
	    },
	    disabled: function disabled() {
	      this.setParentDisabled();
	    },
	    required: function required() {
	      this.setParentRequired();
	    },
	    placeholder: function placeholder() {
	      this.setParentPlaceholder();
	    },
	    maxlength: function maxlength() {
	      this.handleMaxLength();
	    }
	  },
	  methods: {
	    handleMaxLength: function handleMaxLength() {
	      this.parentContainer.enableCounter = this.maxlength > 0;
	      this.parentContainer.counterLength = this.maxlength;
	    },
	    setParentValue: function setParentValue() {
	      this.parentContainer.setValue(this.value);
	    },
	    setParentDisabled: function setParentDisabled() {
	      this.parentContainer.isDisabled = this.disabled;
	    },
	    setParentRequired: function setParentRequired() {
	      this.parentContainer.isRequired = this.required;
	    },
	    setParentPlaceholder: function setParentPlaceholder() {
	      this.parentContainer.hasPlaceholder = !!this.placeholder;
	    },
	    onFocus: function onFocus() {
	      this.parentContainer.isFocused = true;
	    },
	    onBlur: function onBlur() {
	      this.parentContainer.isFocused = false;
	      this.setParentValue();
	    },
	    onInput: function onInput() {
	      this.setParentValue();
	      this.parentContainer.inputLength = this.value ? this.value.length : 0;
	      this.$emit('change', this.value);
	      this.$emit('input', this.value);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
	  if (!$parent.$el) {
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('input', {
	    staticClass: "md-input",
	    attrs: {
	      "type": _vm.type,
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "placeholder": _vm.placeholder,
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.value
	    },
	    on: {
	      "focus": _vm.onFocus,
	      "blur": _vm.onBlur,
	      "input": _vm.onInput,
	      "keydown": [function($event) {
	        if ($event.keyCode !== 38) { return; }
	        _vm.onInput($event)
	      }, function($event) {
	        if ($event.keyCode !== 40) { return; }
	        _vm.onInput($event)
	      }]
	    }
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-53a56078", module.exports)
	  }
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(95)
	
	/* template */
	var __vue_template__ = __webpack_require__(97)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdInputContainer/mdTextarea.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-62d24f30", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-62d24f30", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTextarea.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _autosize = __webpack_require__(96);
	
	var _autosize2 = _interopRequireDefault(_autosize);
	
	var _common = __webpack_require__(91);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_common2.default],
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    if (!this.parentContainer) {
	      this.$destroy();
	
	      throw new Error('You should wrap the md-textarea in a md-input-container');
	    }
	
	    this.setParentDisabled();
	    this.setParentRequired();
	    this.setParentPlaceholder();
	    this.setParentValue();
	    this.handleMaxLength();
	
	    if (!this.$el.getAttribute('rows')) {
	      this.$el.setAttribute('rows', '1');
	    }
	
	    (0, _autosize2.default)(this.$el);
	  },
	  beforeDestroy: function beforeDestroy() {
	    _autosize2.default.destroy(this.$el);
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

	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		Autosize 3.0.18
		license: MIT
		http://www.jacklmoore.com/autosize
	*/
	(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
			factory(exports, module);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod.exports, mod);
			global.autosize = mod.exports;
		}
	})(this, function (exports, module) {
		'use strict';
	
		var map = typeof Map === 'function' ? new Map() : (function () {
			var keys = [];
			var values = [];
	
			return {
				has: function has(key) {
					return keys.indexOf(key) > -1;
				},
				get: function get(key) {
					return values[keys.indexOf(key)];
				},
				set: function set(key, value) {
					if (keys.indexOf(key) === -1) {
						keys.push(key);
						values.push(value);
					}
				},
				'delete': function _delete(key) {
					var index = keys.indexOf(key);
					if (index > -1) {
						keys.splice(index, 1);
						values.splice(index, 1);
					}
				} };
		})();
	
		var createEvent = function createEvent(name) {
			return new Event(name);
		};
		try {
			new Event('test');
		} catch (e) {
			// IE does not support `new Event()`
			createEvent = function (name) {
				var evt = document.createEvent('Event');
				evt.initEvent(name, true, false);
				return evt;
			};
		}
	
		function assign(ta) {
			if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || map.has(ta)) return;
	
			var heightOffset = null;
			var clientWidth = ta.clientWidth;
			var cachedHeight = null;
	
			function init() {
				var style = window.getComputedStyle(ta, null);
	
				if (style.resize === 'vertical') {
					ta.style.resize = 'none';
				} else if (style.resize === 'both') {
					ta.style.resize = 'horizontal';
				}
	
				if (style.boxSizing === 'content-box') {
					heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
				} else {
					heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
				}
				// Fix when a textarea is not on document body and heightOffset is Not a Number
				if (isNaN(heightOffset)) {
					heightOffset = 0;
				}
	
				update();
			}
	
			function changeOverflow(value) {
				{
					// Chrome/Safari-specific fix:
					// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
					// made available by removing the scrollbar. The following forces the necessary text reflow.
					var width = ta.style.width;
					ta.style.width = '0px';
					// Force reflow:
					/* jshint ignore:start */
					ta.offsetWidth;
					/* jshint ignore:end */
					ta.style.width = width;
				}
	
				ta.style.overflowY = value;
	
				resize();
			}
	
			function getParentOverflows(el) {
				var arr = [];
	
				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop });
					}
					el = el.parentNode;
				}
	
				return arr;
			}
	
			function resize() {
				var originalHeight = ta.style.height;
				var overflows = getParentOverflows(ta);
				var docTop = document.documentElement && document.documentElement.scrollTop; // Needed for Mobile IE (ticket #240)
	
				ta.style.height = 'auto';
	
				var endHeight = ta.scrollHeight + heightOffset;
	
				if (ta.scrollHeight === 0) {
					// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
					ta.style.height = originalHeight;
					return;
				}
	
				ta.style.height = endHeight + 'px';
	
				// used to check if an update is actually necessary on window.resize
				clientWidth = ta.clientWidth;
	
				// prevents scroll-position jumping
				overflows.forEach(function (el) {
					el.node.scrollTop = el.scrollTop;
				});
	
				if (docTop) {
					document.documentElement.scrollTop = docTop;
				}
			}
	
			function update() {
				resize();
	
				var computed = window.getComputedStyle(ta, null);
				var computedHeight = Math.round(parseFloat(computed.height));
				var styleHeight = Math.round(parseFloat(ta.style.height));
	
				// The computed height not matching the height set via resize indicates that
				// the max-height has been exceeded, in which case the overflow should be set to visible.
				if (computedHeight !== styleHeight) {
					if (computed.overflowY !== 'visible') {
						changeOverflow('visible');
					}
				} else {
					// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
					}
				}
	
				if (cachedHeight !== computedHeight) {
					cachedHeight = computedHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {}
				}
			}
	
			var pageResize = function pageResize() {
				if (ta.clientWidth !== clientWidth) {
					update();
				}
			};
	
			var destroy = (function (style) {
				window.removeEventListener('resize', pageResize, false);
				ta.removeEventListener('input', update, false);
				ta.removeEventListener('keyup', update, false);
				ta.removeEventListener('autosize:destroy', destroy, false);
				ta.removeEventListener('autosize:update', update, false);
	
				Object.keys(style).forEach(function (key) {
					ta.style[key] = style[key];
				});
	
				map['delete'](ta);
			}).bind(ta, {
				height: ta.style.height,
				resize: ta.style.resize,
				overflowY: ta.style.overflowY,
				overflowX: ta.style.overflowX,
				wordWrap: ta.style.wordWrap });
	
			ta.addEventListener('autosize:destroy', destroy, false);
	
			// IE9 does not fire onpropertychange or oninput for deletions,
			// so binding to onkeyup to catch most of those events.
			// There is no way that I know of to detect something like 'cut' in IE9.
			if ('onpropertychange' in ta && 'oninput' in ta) {
				ta.addEventListener('keyup', update, false);
			}
	
			window.addEventListener('resize', pageResize, false);
			ta.addEventListener('input', update, false);
			ta.addEventListener('autosize:update', update, false);
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
	
			map.set(ta, {
				destroy: destroy,
				update: update });
	
			init();
		}
	
		function destroy(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.destroy();
			}
		}
	
		function update(ta) {
			var methods = map.get(ta);
			if (methods) {
				methods.update();
			}
		}
	
		var autosize = null;
	
		// Do nothing in Node.js environment and IE8 (or lower)
		if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			autosize = function (el) {
				return el;
			};
			autosize.destroy = function (el) {
				return el;
			};
			autosize.update = function (el) {
				return el;
			};
		} else {
			autosize = function (el, options) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], function (x) {
						return assign(x, options);
					});
				}
				return el;
			};
			autosize.destroy = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], destroy);
				}
				return el;
			};
			autosize.update = function (el) {
				if (el) {
					Array.prototype.forEach.call(el.length ? el : [el], update);
				}
				return el;
			};
		}
	
		module.exports = autosize;
	});
	
	// Firefox will throw an error on dispatchEvent for a detached element
	// https://bugzilla.mozilla.org/show_bug.cgi?id=889376

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('textarea', {
	    staticClass: "md-input",
	    attrs: {
	      "disabled": _vm.disabled,
	      "required": _vm.required,
	      "placeholder": _vm.placeholder,
	      "maxlength": _vm.maxlength
	    },
	    domProps: {
	      "value": _vm.value
	    },
	    on: {
	      "focus": _vm.onFocus,
	      "blur": _vm.onBlur,
	      "input": _vm.onInput
	    }
	  })
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-62d24f30", module.exports)
	  }
	}

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-input-container.md-input-invalid:after, .THEME_NAME.md-input-container.md-input-invalid:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-input-container.md-input-invalid label,\n.THEME_NAME .md-input-container.md-input-invalid .md-error,\n.THEME_NAME .md-input-container.md-input-invalid .md-count,\n.THEME_NAME .md-input-container.md-input-invalid input,\n.THEME_NAME .md-input-container.md-input-invalid textarea, .THEME_NAME.md-input-container.md-input-invalid label,\n.THEME_NAME.md-input-container.md-input-invalid .md-error,\n.THEME_NAME.md-input-container.md-input-invalid .md-count,\n.THEME_NAME.md-input-container.md-input-invalid input,\n.THEME_NAME.md-input-container.md-input-invalid textarea {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-input-container.md-input-focused.md-input-inline label, .THEME_NAME.md-input-container.md-input-focused.md-input-inline label {\n  color: rgba(0, 0, 0, 0.54); }\n\n.THEME_NAME .md-input-container.md-input-focused.md-input-required label:after, .THEME_NAME.md-input-container.md-input-focused.md-input-required label:after {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-input-container.md-input-focused:after, .THEME_NAME.md-input-container.md-input-focused:after {\n  height: 2px;\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-input-container.md-input-focused input,\n.THEME_NAME .md-input-container.md-input-focused textarea, .THEME_NAME.md-input-container.md-input-focused input,\n.THEME_NAME.md-input-container.md-input-focused textarea {\n  color: PRIMARY-COLOR;\n  text-shadow: 0 0 0 BACKGROUND-CONTRAST;\n  -webkit-text-fill-color: transparent; }\n\n.THEME_NAME .md-input-container.md-input-focused label, .THEME_NAME.md-input-container.md-input-focused label {\n  color: PRIMARY-COLOR; }\n"

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdList = __webpack_require__(100);
	
	var _mdList2 = _interopRequireDefault(_mdList);
	
	var _mdListItem = __webpack_require__(103);
	
	var _mdListItem2 = _interopRequireDefault(_mdListItem);
	
	var _mdListExpand = __webpack_require__(105);
	
	var _mdListExpand2 = _interopRequireDefault(_mdListExpand);
	
	var _mdList3 = __webpack_require__(108);
	
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-426a192d!sass!./mdList.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* template */
	var __vue_template__ = __webpack_require__(102)
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
/* 101 */,
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('ul', {
	    staticClass: "md-list"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-426a192d", module.exports)
	  }
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(104)
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
/* 104 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	        click: function click() {
	          _this.$emit('click');
	        }
	      }
	    };
	
	    var createItemHolder = function createItemHolder(content) {
	      return createElement('div', { staticClass: holderClass }, content);
	    };
	
	    var createCompatibleRouterLink = function createCompatibleRouterLink() {
	      slot[0].data.staticClass = containerClass + ' ' + holderClass;
	      slot[0].data.directives = [{
	        name: 'md-ink-ripple'
	      }];
	
	      return createElement('li', listItemSpec, slot);
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
	        },
	        directives: [{
	          name: 'md-ink-ripple'
	        }]
	      }, [createItemHolder(slot)]);
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(106)
	
	/* template */
	var __vue_template__ = __webpack_require__(107)
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
/* 106 */
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
	      height: 0
	    };
	  },
	
	  methods: {
	    calculatePadding: function calculatePadding() {
	      this.height = -this.$el.offsetHeight + 'px';
	    }
	  },
	  mounted: function mounted() {
	    this.calculatePadding();
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-list-expand",
	    style: ({
	      'margin-bottom': _vm.height
	    })
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-149bf327", module.exports)
	  }
	}

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-list, .THEME_NAME.md-list {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n  .THEME_NAME .md-list.md-transparent, .THEME_NAME.md-list.md-transparent {\n    background-color: transparent;\n    color: inherit; }\n  .THEME_NAME .md-list .md-list-item .router-link-active.md-list-item-container, .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME .md-list .md-list-item .router-link-active.md-list-item-container > .md-icon, .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME .md-list .md-list-item.md-primary .md-list-item-container, .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME .md-list .md-list-item.md-primary .md-list-item-container > .md-icon, .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME .md-list .md-list-item.md-accent .md-list-item-container, .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container {\n    color: ACCENT-COLOR; }\n    .THEME_NAME .md-list .md-list-item.md-accent .md-list-item-container > .md-icon, .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container > .md-icon {\n      color: ACCENT-COLOR; }\n  .THEME_NAME .md-list .md-list-item.md-warn .md-list-item-container, .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container {\n    color: WARN-COLOR; }\n    .THEME_NAME .md-list .md-list-item.md-warn .md-list-item-container > .md-icon, .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container > .md-icon {\n      color: WARN-COLOR; }\n  .THEME_NAME .md-list .md-list-item-expand .md-list-item-container, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container {\n    background-color: BACKGROUND-COLOR-A100; }\n    .THEME_NAME .md-list .md-list-item-expand .md-list-item-container:hover, .THEME_NAME .md-list .md-list-item-expand .md-list-item-container:focus, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:hover, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:focus {\n      background-color: rgba(153, 153, 153, 0.2); }\n"

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdMenu = __webpack_require__(110);
	
	var _mdMenu2 = _interopRequireDefault(_mdMenu);
	
	var _mdMenuItem = __webpack_require__(116);
	
	var _mdMenuItem2 = _interopRequireDefault(_mdMenuItem);
	
	var _mdMenuContent = __webpack_require__(120);
	
	var _mdMenuContent2 = _interopRequireDefault(_mdMenuContent);
	
	var _mdMenu3 = __webpack_require__(123);
	
	var _mdMenu4 = _interopRequireDefault(_mdMenu3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-menu', Vue.extend(_mdMenu2.default));
	  Vue.component('md-menu-item', Vue.extend(_mdMenuItem2.default));
	  Vue.component('md-menu-content', Vue.extend(_mdMenuContent2.default));
	
	  Vue.material.styles.push(_mdMenu4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-008203e6!sass!./mdMenu.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(112)
	
	/* template */
	var __vue_template__ = __webpack_require__(115)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenu.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-008203e6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-008203e6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenu.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 111 */,
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(113);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	var _getInViewPosition = __webpack_require__(114);
	
	var _getInViewPosition2 = _interopRequireDefault(_getInViewPosition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	    mdSize: {
	      type: [Number, String],
	      default: 0
	    },
	    mdDirection: {
	      type: String,
	      default: 'bottom right'
	    },
	    mdCloseOnSelect: {
	      type: Boolean,
	      default: true
	    }
	  },
	  data: function data() {
	    return {
	      browserMargin: 8,
	      active: false
	    };
	  },
	
	  watch: {
	    mdSize: function mdSize(current, previous) {
	      if (current >= 1 && current <= 7) {
	        this.removeLastSizeMenuContentClass(previous);
	        this.addNewSizeMenuContentClass(current);
	      }
	    },
	    mdDirection: function mdDirection(current, previous) {
	      this.removeLastDirectionMenuContentClass(previous);
	      this.addNewDirectionMenuContentClass(current);
	    }
	  },
	  methods: {
	    validateMenu: function validateMenu() {
	      if (!this.menuContent) {
	        this.$destroy();
	
	        throw new Error('You must have a md-menu-content inside your menu.');
	      }
	
	      if (!this.menuTrigger) {
	        this.$destroy();
	
	        throw new Error('You must have an element with a md-menu-trigger attribute inside your menu.');
	      }
	    },
	    removeLastSizeMenuContentClass: function removeLastSizeMenuContentClass(size) {
	      this.menuContent.classList.remove('md-size-' + size);
	    },
	    removeLastDirectionMenuContentClass: function removeLastDirectionMenuContentClass(direction) {
	      this.menuContent.classList.remove('md-direction-' + direction.replace(' ', '-'));
	    },
	    addNewSizeMenuContentClass: function addNewSizeMenuContentClass(size) {
	      this.menuContent.classList.add('md-size-' + size);
	    },
	    addNewDirectionMenuContentClass: function addNewDirectionMenuContentClass(direction) {
	      this.menuContent.classList.add('md-direction-' + direction.replace(' ', '-'));
	    },
	    closeOnOffClick: function closeOnOffClick(event) {
	      if (!this.$el.contains(event.target) && !this.menuContent.contains(event.target)) {
	        this.close();
	      }
	    },
	    getBottomRightPos: function getBottomRightPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top,
	        left: menuTriggerRect.left
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getBottomLeftPos: function getBottomLeftPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top,
	        left: menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getTopRightPos: function getTopRightPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight,
	        left: menuTriggerRect.left
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getTopLeftPos: function getTopLeftPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight,
	        left: menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    calculateMenuContentPos: function calculateMenuContentPos() {
	      var position = void 0;
	
	      switch (this.mdDirection) {
	        case 'bottom left':
	          position = this.getBottomLeftPos();
	
	          break;
	
	        case 'top right':
	          position = this.getTopRightPos();
	
	          break;
	
	        case 'top left':
	          position = this.getTopLeftPos();
	
	          break;
	
	        default:
	          position = this.getBottomRightPos();
	      }
	
	      this.menuContent.style.top = position.top + 'px';
	      this.menuContent.style.left = position.left + 'px';
	    },
	    recalculateOnResize: function recalculateOnResize() {
	      window.requestAnimationFrame(this.calculateMenuContentPos);
	    },
	    open: function open() {
	      if (this.$root.$el.contains(this.menuContent)) {
	        this.$root.$el.removeChild(this.menuContent);
	      }
	
	      this.$root.$el.appendChild(this.menuContent);
	      document.addEventListener('click', this.closeOnOffClick);
	      window.addEventListener('resize', this.recalculateOnResize);
	
	      this.calculateMenuContentPos();
	
	      getComputedStyle(this.menuContent).top;
	      this.menuContent.classList.add('md-active');
	      this.menuContent.focus();
	      this.active = true;
	    },
	    close: function close() {
	      var _this = this;
	
	      var menuContent = this.menuContent;
	      var close = function close(event) {
	        if (menuContent && event.target === menuContent) {
	          var activeRipple = _this.menuContent.querySelector('.md-ripple.md-active');
	
	          menuContent.removeEventListener(_transitionEndEventName2.default, close);
	          _this.menuTrigger.focus();
	          _this.active = false;
	
	          if (activeRipple) {
	            activeRipple.classList.remove('md-active');
	          }
	
	          _this.$root.$el.removeChild(menuContent);
	          document.removeEventListener('click', _this.closeOnOffClick);
	          window.removeEventListener('resize', _this.recalculateOnResize);
	        }
	      };
	
	      this.menuContent.addEventListener(_transitionEndEventName2.default, close);
	      this.menuContent.classList.remove('md-active');
	    },
	    toggle: function toggle() {
	      if (this.active) {
	        this.close();
	      } else {
	        this.open();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.menuTrigger = this.$el.querySelector('[md-menu-trigger]');
	    this.menuContent = this.$el.querySelector('.md-menu-content');
	    this.validateMenu();
	    this.addNewSizeMenuContentClass(this.mdSize);
	    this.addNewDirectionMenuContentClass(this.mdDirection);
	    this.menuContent.parentNode.removeChild(this.menuContent);
	    this.menuTrigger.addEventListener('click', this.toggle);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var margin = 8;
	
	var isAboveOfViewport = function isAboveOfViewport(element, position) {
	  return position.top <= margin - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isBelowOfViewport = function isBelowOfViewport(element, position) {
	  return position.top + element.offsetHeight + margin >= window.innerHeight - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isOnTheLeftOfViewport = function isOnTheLeftOfViewport(element, position) {
	  return position.left <= margin - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var isOnTheRightOfViewport = function isOnTheRightOfViewport(element, position) {
	  return position.left + element.offsetWidth + margin >= window.innerWidth - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var getInViewPosition = function getInViewPosition(element, position) {
	  var computedStyle = getComputedStyle(element);
	
	  if (isAboveOfViewport(element, position)) {
	    position.top = margin - parseInt(computedStyle.marginTop, 10);
	  }
	
	  if (isOnTheLeftOfViewport(element, position)) {
	    position.left = margin - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isOnTheRightOfViewport(element, position)) {
	    position.left = window.innerWidth - margin - element.offsetWidth - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isBelowOfViewport(element, position)) {
	    position.top = window.innerHeight - margin - element.offsetHeight - parseInt(computedStyle.marginTop, 10);
	  }
	
	  return position;
	};
	
	exports.default = getInViewPosition;
	module.exports = exports["default"];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-menu"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-008203e6", module.exports)
	  }
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(117)
	
	/* template */
	var __vue_template__ = __webpack_require__(119)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenuItem.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5cf45940", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5cf45940", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenuItem.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	__webpack_require__(118);
	
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
	
	exports.default = {
	  props: {
	    disabled: Boolean
	  },
	  data: function data() {
	    return {
	      parentContent: {},
	      index: 0
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-highlighted': this.highlighted
	      };
	    },
	    highlighted: function highlighted() {
	      if (this.index === this.parentContent.highlighted) {
	        if (this.disabled) {
	          if (this.parentContent.oldHighlight > this.parentContent.highlighted) {
	            this.parentContent.highlighted--;
	          } else {
	            this.parentContent.highlighted++;
	          }
	        }
	
	        if (this.index === 1) {
	          this.parentContent.$el.scrollTop = 0;
	        } else if (this.index === this.parentContent.itemsAmount) {
	          this.parentContent.$el.scrollTop = this.parentContent.$el.scrollHeight;
	        } else {
	          this.$el.scrollIntoViewIfNeeded(false);
	        }
	
	        return true;
	      }
	
	      return false;
	    }
	  },
	  methods: {
	    close: function close() {
	      if (!this.disabled) {
	        if (this.parentMenu.mdCloseOnSelect) {
	          this.parentContent.close();
	        }
	
	        this.$emit('click');
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');
	    this.parentMenu = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu');
	
	    if (!this.parentContent) {
	      this.$destroy();
	
	      throw new Error('You must wrap the md-menu-item in a md-menu-content');
	    }
	
	    this.parentContent.itemsAmount++;
	    this.index = this.parentContent.itemsAmount;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports) {

	if (!Element.prototype.scrollIntoViewIfNeeded) {
	  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
	    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
	
	    var parent = this.parentNode,
	        parentComputedStyle = window.getComputedStyle(parent, null),
	        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
	        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
	        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
	        overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
	        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
	        overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
	        alignWithTop = overTop && !overBottom;
	
	    if ((overTop || overBottom) && centerIfNeeded) {
	      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
	    }
	
	    if ((overLeft || overRight) && centerIfNeeded) {
	      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
	    }
	
	    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
	      this.scrollIntoView(alignWithTop);
	    }
	  };
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('md-list-item', {
	    staticClass: "md-menu-item",
	    class: _vm.classes,
	    attrs: {
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5cf45940", module.exports)
	  }
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(121)
	
	/* template */
	var __vue_template__ = __webpack_require__(122)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenuContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-518d815c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-518d815c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenuContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 121 */
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
	
	exports.default = {
	  data: function data() {
	    return {
	      oldHighlight: false,
	      highlighted: false,
	      itemsAmount: 0
	    };
	  },
	
	  methods: {
	    close: function close() {
	      this.highlighted = false;
	      this.$parent.close();
	    },
	    highlightItem: function highlightItem(direction) {
	      this.oldHighlight = this.highlighted;
	
	      if (direction === 'up') {
	        if (this.highlighted === 1) {
	          this.highlighted = this.itemsAmount;
	        } else {
	          this.highlighted--;
	        }
	      }
	
	      if (direction === 'down') {
	        if (this.highlighted === this.itemsAmount) {
	          this.highlighted = 1;
	        } else {
	          this.highlighted++;
	        }
	      }
	    },
	    fireClick: function fireClick() {
	      if (this.highlighted > 0) {
	        this.$children[0].$children[this.highlighted - 1].$el.click();
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$parent.$el.classList.contains('md-menu')) {
	      this.$destroy();
	
	      throw new Error('You must wrap the md-menu-content in a md-menu');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-menu-content",
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "keydown": [function($event) {
	        if ($event.keyCode !== 27) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if ($event.keyCode !== 9) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if ($event.keyCode !== 38) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('up')
	      }, function($event) {
	        if ($event.keyCode !== 40) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('down')
	      }, function($event) {
	        if ($event.keyCode !== 13) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }, function($event) {
	        if ($event.keyCode !== 32) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }]
	    }
	  }, [_vm._h('md-list', [_vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-518d815c", module.exports)
	  }
	}

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdRadio = __webpack_require__(125);
	
	var _mdRadio2 = _interopRequireDefault(_mdRadio);
	
	var _mdRadio3 = __webpack_require__(129);
	
	var _mdRadio4 = _interopRequireDefault(_mdRadio3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-radio', Vue.extend(_mdRadio2.default));
	
	  Vue.material.styles.push(_mdRadio4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-e87254d2!sass!./mdRadio.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(127)
	
	/* template */
	var __vue_template__ = __webpack_require__(128)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdRadio/mdRadio.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e87254d2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e87254d2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdRadio.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 126 */,
/* 127 */
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
	
	exports.default = {
	  props: {
	    name: String,
	    value: [String, Boolean, Number],
	    mdValue: {
	      type: [String, Boolean, Number],
	      required: true
	    },
	    id: String,
	    disabled: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-checked': this.value && this.mdValue.toString() === this.value.toString(),
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
	};
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-radio",
	    class: _vm.classes
	  }, [_vm._h('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    staticClass: "md-radio-container",
	    on: {
	      "click": _vm.toggleCheck
	    }
	  }, [_vm._h('input', {
	    attrs: {
	      "type": "radio",
	      "name": _vm.name,
	      "id": _vm.id,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.value
	    }
	  })]), " ", (_vm.$slots.default) ? _vm._h('label', {
	    staticClass: "md-radio-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e87254d2", module.exports)
	  }
	}

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-radio .md-radio-container:after, .THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-radio-container, .THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-ripple, .THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-radio.md-primary .md-radio-container:after, .THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-primary.md-checked .md-radio-container, .THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-primary.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-warn .md-radio-container:after, .THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-warn.md-checked .md-radio-container, .THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-warn.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-disabled .md-radio-container, .THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME .md-radio.md-disabled .md-radio-container:after, .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME .md-radio.md-disabled.md-checked .md-radio-container, .THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSelect = __webpack_require__(131);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdOption = __webpack_require__(135);
	
	var _mdOption2 = _interopRequireDefault(_mdOption);
	
	var _mdSelect3 = __webpack_require__(138);
	
	var _mdSelect4 = _interopRequireDefault(_mdSelect3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-select', Vue.extend(_mdSelect2.default));
	  Vue.component('md-option', Vue.extend(_mdOption2.default));
	
	  Vue.material.styles.push(_mdSelect4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-1cdcfd26!sass!./mdSelect.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(133)
	
	/* template */
	var __vue_template__ = __webpack_require__(134)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSelect/mdSelect.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1cdcfd26", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1cdcfd26", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSelect.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 132 */,
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
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
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	var _isArray = __webpack_require__(87);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    name: String,
	    required: Boolean,
	    multiple: Boolean,
	    value: [String, Number, Array],
	    id: String,
	    disabled: Boolean,
	    placeholder: String,
	    mdMenuClass: String
	  },
	  data: function data() {
	    return {
	      selectedValue: null,
	      selectedText: null,
	      multipleText: null,
	      multipleOptions: {},
	      options: {},
	      optionsAmount: 0
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-disabled': this.disabled
	      };
	    },
	    contentClasses: function contentClasses() {
	      if (this.multiple) {
	        return 'md-multiple ' + this.mdMenuClass;
	      }
	
	      return this.mdMenuClass;
	    }
	  },
	  watch: {
	    value: function value(_value) {
	      this.setTextAndvalue(_value);
	    }
	  },
	  methods: {
	    getSingleValue: function getSingleValue(value) {
	      var _this = this;
	
	      var output = {};
	
	      Object.keys(this.options).forEach(function (index) {
	        var options = _this.options[index];
	
	        if (options.value === value) {
	          output.value = value;
	          output.text = options.$refs.item.textContent;
	        }
	      });
	
	      return output;
	    },
	    getMultipleValue: function getMultipleValue(modelValue) {
	      var _this2 = this;
	
	      if ((0, _isArray2.default)(this.value)) {
	        var _ret = function () {
	          var outputText = [];
	
	          modelValue.forEach(function (value) {
	            Object.keys(_this2.options).forEach(function (index) {
	              var options = _this2.options[index];
	
	              if (options.value === value) {
	                var text = options.$refs.item.textContent;
	
	                _this2.multipleOptions[index] = {
	                  value: value,
	                  text: text
	                };
	                outputText.push(text);
	              }
	            });
	          });
	
	          return {
	            v: {
	              value: modelValue,
	              text: outputText.join(', ')
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	
	      return {};
	    },
	    setTextAndvalue: function setTextAndvalue(modelValue) {
	      var output = this.multiple ? this.getMultipleValue(modelValue) : this.getSingleValue(modelValue);
	
	      this.selectedValue = output.value;
	      this.selectedText = output.text;
	
	      if (this.parentContainer) {
	        this.$parent.setValue(output.text);
	      }
	    },
	    changeValue: function changeValue(value) {
	      this.$emit('input', value);
	      this.$emit('change', value);
	    },
	    selectMultiple: function selectMultiple(index, value, text) {
	      var values = [];
	
	      this.multipleOptions[index] = {
	        value: value,
	        text: text
	      };
	
	      for (var key in this.multipleOptions) {
	        if (this.multipleOptions.hasOwnProperty(key) && this.multipleOptions[key].value) {
	          values.push(this.multipleOptions[key].value);
	        }
	      }
	
	      this.changeValue(values);
	    },
	    selectOption: function selectOption(value, text) {
	      this.selectedText = text;
	      this.changeValue(value);
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    this.setTextAndvalue(this.value);
	
	    if (this.parentContainer) {
	      this.parentContainer.setValue(this.value);
	      this.parentContainer.hasSelect = true;
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.parentContainer) {
	      this.parentContainer.setValue('');
	      this.parentContainer.hasSelect = false;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-select",
	    class: _vm.classes
	  }, [_vm._h('md-menu', {
	    attrs: {
	      "md-close-on-select": !_vm.multiple
	    }
	  }, [_vm._h('span', {
	    ref: "value",
	    staticClass: "md-select-value",
	    attrs: {
	      "md-menu-trigger": ""
	    }
	  }, [_vm._s(_vm.selectedText || _vm.multipleText || _vm.placeholder)]), " ", _vm._h('md-menu-content', {
	    staticClass: "md-select-content",
	    class: _vm.contentClasses
	  }, [_vm._t("default")])]), " ", _vm._h('select', {
	    attrs: {
	      "name": _vm.name,
	      "id": _vm.id,
	      "required": _vm.required,
	      "tabindex": "-1"
	    }
	  }, [_vm._h('option', {
	    domProps: {
	      "value": _vm.value
	    }
	  }, [_vm._s(_vm.value)])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1cdcfd26", module.exports)
	  }
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(136)
	
	/* template */
	var __vue_template__ = __webpack_require__(137)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSelect/mdOption.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b3b71f34", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b3b71f34", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdOption.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    value: [String, Boolean, Number]
	  },
	  data: function data() {
	    return {
	      parentSelect: {},
	      check: false,
	      index: 0
	    };
	  },
	  computed: {
	    isSelected: function isSelected() {
	      if (this.value && this.parentSelect.value) {
	        var thisValue = this.value.toString();
	
	        if (this.parentSelect.multiple) {
	          return this.parentSelect.value.indexOf(thisValue) >= 0;
	        }
	
	        return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
	      }
	
	      return false;
	    },
	    classes: function classes() {
	      return {
	        'md-selected': this.isSelected,
	        'md-checked': this.check
	      };
	    }
	  },
	  methods: {
	    selectOption: function selectOption() {
	      if (!this.parentSelect.multiple) {
	        this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
	      } else {
	        this.check = !this.check;
	      }
	    }
	  },
	  watch: {
	    isSelected: function isSelected(selected) {
	      if (this.parentSelect.multiple) {
	        this.check = selected;
	      }
	    },
	    check: function check(_check) {
	      if (_check) {
	        this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
	      } else {
	        this.parentSelect.selectMultiple(this.index);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentSelect = (0, _getClosestVueParent2.default)(this.$parent, 'md-select');
	    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');
	
	    if (!this.parentSelect) {
	      throw new Error('You must wrap the md-option in a md-select');
	    }
	
	    this.parentSelect.optionsAmount++;
	    this.index = this.parentSelect.optionsAmount;
	
	    this.parentSelect.multipleOptions[this.index] = {};
	    this.parentSelect.options[this.index] = this;
	  },
	  beforeDestroy: function beforeDestroy() {
	    delete this.parentSelect.options[this.index];
	    delete this.parentSelect.multipleOptions[this.index];
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
	//

	module.exports = exports['default'];

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('md-menu-item', {
	    staticClass: "md-option",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.selectOption
	    }
	  }, [(_vm.parentSelect.multiple) ? _vm._h('md-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.check),
	      expression: "check"
	    }],
	    staticClass: "md-primary",
	    domProps: {
	      "value": (_vm.check)
	    },
	    on: {
	      "input": function($event) {
	        _vm.check = $event
	      }
	    }
	  }, [_vm._h('span', {
	    ref: "item"
	  }, [_vm._t("default")])]) : _vm._h('span', {
	    ref: "item"
	  }, [_vm._t("default")]), " "])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b3b71f34", module.exports)
	  }
	}

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-select-content .md-menu-item.md-selected, .THEME_NAME .md-select-content .md-menu-item.md-checked, .THEME_NAME.md-select-content .md-menu-item.md-selected, .THEME_NAME.md-select-content .md-menu-item.md-checked {\n  color: PRIMARY-COLOR; }\n"

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSidenav = __webpack_require__(140);
	
	var _mdSidenav2 = _interopRequireDefault(_mdSidenav);
	
	var _mdSidenav3 = __webpack_require__(144);
	
	var _mdSidenav4 = _interopRequireDefault(_mdSidenav3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-sidenav', Vue.extend(_mdSidenav2.default));
	
	  Vue.material.styles.push(_mdSidenav4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-4904390e!sass!./mdSidenav.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(142)
	
	/* template */
	var __vue_template__ = __webpack_require__(143)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSidenav/mdSidenav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4904390e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4904390e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSidenav.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 141 */,
/* 142 */
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
	
	exports.default = {
	  data: function data() {
	    return {
	      mdVisible: false
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return this.mdVisible && 'md-active';
	    }
	  },
	  methods: {
	    show: function show() {
	      this.mdVisible = true;
	      this.$el.focus();
	      this.$emit('open');
	    },
	    close: function close() {
	      this.mdVisible = false;
	      this.$el.blur();
	      this.$emit('close');
	    },
	    toggle: function toggle() {
	      if (this.mdVisible) {
	        this.close();
	      } else {
	        this.show();
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-sidenav",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "keyup": function($event) {
	        if ($event.keyCode !== 27) { return; }
	        _vm.close($event)
	      }
	    }
	  }, [_vm._h('div', {
	    staticClass: "md-sidenav-content"
	  }, [_vm._t("default")]), " ", _vm._h('div', {
	    staticClass: "md-backdrop",
	    on: {
	      "click": _vm.close
	    }
	  })])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4904390e", module.exports)
	  }
	}

/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-sidenav .md-sidenav-content, .THEME_NAME.md-sidenav .md-sidenav-content {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSubheader = __webpack_require__(146);
	
	var _mdSubheader2 = _interopRequireDefault(_mdSubheader);
	
	var _mdSubheader3 = __webpack_require__(149);
	
	var _mdSubheader4 = _interopRequireDefault(_mdSubheader3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-subheader', Vue.extend(_mdSubheader2.default));
	
	  Vue.material.styles.push(_mdSubheader4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-a2e7fe8a!sass!./mdSubheader.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(148)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSubheader/mdSubheader.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-a2e7fe8a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-a2e7fe8a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSubheader.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 147 */,
/* 148 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	
	exports.default = {
	  render: function render(createElement) {
	    var tag = 'div';
	    var options = {
	      staticClass: 'md-subheader'
	    };
	
	    if (this.$parent.$options._componentTag === 'md-list') {
	      tag = 'li';
	    }
	
	    return createElement(tag, options, this.$slots.default);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-subheader.md-primary, .THEME_NAME.md-subheader.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-subheader.md-accent, .THEME_NAME.md-subheader.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-subheader.md-warn, .THEME_NAME.md-subheader.md-warn {\n  color: WARN-COLOR; }\n"

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSwitch = __webpack_require__(151);
	
	var _mdSwitch2 = _interopRequireDefault(_mdSwitch);
	
	var _mdSwitch3 = __webpack_require__(155);
	
	var _mdSwitch4 = _interopRequireDefault(_mdSwitch3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-switch', Vue.extend(_mdSwitch2.default));
	
	  Vue.material.styles.push(_mdSwitch4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-7e05ff26!sass!./mdSwitch.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(153)
	
	/* template */
	var __vue_template__ = __webpack_require__(154)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSwitch/mdSwitch.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7e05ff26", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7e05ff26", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSwitch.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 152 */,
/* 153 */
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
	
	var fullThreshold = 75;
	var initialThreshold = '-1px';
	
	exports.default = {
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
	  data: function data() {
	    return {
	      leftPos: initialThreshold,
	      checked: this.value
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-checked': Boolean(this.value),
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
	      this.leftPos = this.value ? fullThreshold + '%' : initialThreshold;
	    }
	  },
	  methods: {
	    toggleSwitch: function toggleSwitch() {
	      if (!this.disabled) {
	        this.checked = !this.checked;
	        this.$emit('change', this.checked);
	        this.$emit('input', this.checked);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.leftPos = this.value ? fullThreshold + '%' : initialThreshold;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-switch",
	    class: _vm.classes
	  }, [_vm._h('div', {
	    staticClass: "md-switch-container",
	    on: {
	      "click": _vm.toggleSwitch
	    }
	  }, [_vm._h('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    staticClass: "md-switch-thumb",
	    style: (_vm.styles)
	  }, [_vm._h('input', {
	    attrs: {
	      "type": "checkbox",
	      "name": _vm.name,
	      "id": _vm.id,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.value
	    }
	  }), " ", _vm._h('button', {
	    staticClass: "md-switch-holder",
	    attrs: {
	      "type": _vm.type
	    }
	  })])]), " ", (_vm.$slots.default) ? _vm._h('label', {
	    staticClass: "md-switch-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7e05ff26", module.exports)
	  }
	}

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-switch.md-checked .md-switch-container, .THEME_NAME.md-switch.md-checked .md-switch-container {\n  background-color: ACCENT-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked .md-switch-thumb, .THEME_NAME.md-switch.md-checked .md-switch-thumb {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-switch.md-checked .md-ink-ripple, .THEME_NAME.md-switch.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-switch.md-checked .md-ripple, .THEME_NAME.md-switch.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-switch-container, .THEME_NAME.md-switch.md-checked.md-primary .md-switch-container {\n  background-color: PRIMARY-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-switch-thumb, .THEME_NAME.md-switch.md-checked.md-primary .md-switch-thumb {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-ink-ripple, .THEME_NAME.md-switch.md-checked.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-switch-container, .THEME_NAME.md-switch.md-checked.md-warn .md-switch-container {\n  background-color: WARN-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-switch-thumb, .THEME_NAME.md-switch.md-checked.md-warn .md-switch-thumb {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-ink-ripple, .THEME_NAME.md-switch.md-checked.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-switch.md-disabled .md-switch-container, .THEME_NAME .md-switch.md-disabled.md-checked .md-switch-container, .THEME_NAME.md-switch.md-disabled .md-switch-container, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-container {\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.THEME_NAME .md-switch.md-disabled .md-switch-thumb, .THEME_NAME .md-switch.md-disabled.md-checked .md-switch-thumb, .THEME_NAME.md-switch.md-disabled .md-switch-thumb, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-thumb {\n  background-color: #bdbdbd; }\n"

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTable = __webpack_require__(157);
	
	var _mdTable2 = _interopRequireDefault(_mdTable);
	
	var _mdTableRow = __webpack_require__(161);
	
	var _mdTableRow2 = _interopRequireDefault(_mdTableRow);
	
	var _mdTableHead = __webpack_require__(164);
	
	var _mdTableHead2 = _interopRequireDefault(_mdTableHead);
	
	var _mdTableCell = __webpack_require__(167);
	
	var _mdTableCell2 = _interopRequireDefault(_mdTableCell);
	
	var _mdTableEdit = __webpack_require__(170);
	
	var _mdTableEdit2 = _interopRequireDefault(_mdTableEdit);
	
	var _mdTableCard = __webpack_require__(173);
	
	var _mdTableCard2 = _interopRequireDefault(_mdTableCard);
	
	var _mdTableAlternateHeader = __webpack_require__(175);
	
	var _mdTableAlternateHeader2 = _interopRequireDefault(_mdTableAlternateHeader);
	
	var _mdTablePagination = __webpack_require__(178);
	
	var _mdTablePagination2 = _interopRequireDefault(_mdTablePagination);
	
	var _mdTable3 = __webpack_require__(181);
	
	var _mdTable4 = _interopRequireDefault(_mdTable3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-table', Vue.extend(_mdTable2.default));
	  Vue.component('md-table-header', {
	    functional: true,
	    render: function render(h, scope) {
	      return h('thead', {
	        staticClass: 'md-table-header'
	      }, scope.children);
	    }
	  });
	  Vue.component('md-table-body', {
	    functional: true,
	    render: function render(h, scope) {
	      return h('tbody', {
	        staticClass: 'md-table-body'
	      }, scope.children);
	    }
	  });
	  Vue.component('md-table-row', Vue.extend(_mdTableRow2.default));
	  Vue.component('md-table-head', Vue.extend(_mdTableHead2.default));
	  Vue.component('md-table-cell', Vue.extend(_mdTableCell2.default));
	  Vue.component('md-table-edit', Vue.extend(_mdTableEdit2.default));
	  Vue.component('md-table-card', Vue.extend(_mdTableCard2.default));
	  Vue.component('md-table-pagination', Vue.extend(_mdTablePagination2.default));
	  Vue.component('md-table-alternate-header', Vue.extend(_mdTableAlternateHeader2.default));
	
	  Vue.material.styles.push(_mdTable4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-dda64186!sass!./mdTable.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(159)
	
	/* template */
	var __vue_template__ = __webpack_require__(160)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTable.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-dda64186", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-dda64186", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTable.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 158 */,
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdSortType: String,
	    mdSort: String
	  },
	  data: function data() {
	    return {
	      sortType: this.mdSortType,
	      sortBy: this.mdSort,
	      hasRowSelection: false,
	      data: [],
	      numberOfRows: 0,
	      numberOfSelected: 0,
	      selectedRows: {}
	    };
	  },
	
	  methods: {
	    emitSort: function emitSort(name) {
	      this.sortBy = name;
	      this.$emit('sort', {
	        name: name,
	        type: this.sortType
	      });
	    },
	    emitSelection: function emitSelection() {
	      this.$emit('select', this.selectedRows);
	    }
	  },
	  mounted: function mounted() {
	    this.parentCard = (0, _getClosestVueParent2.default)(this.$parent, 'md-table-card');
	
	    if (this.parentCard) {
	      this.parentCard.tableInstance = this;
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

	module.exports = exports['default'];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-table"
	  }, [_vm._h('table', [_vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-dda64186", module.exports)
	  }
	}

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(162)
	
	/* template */
	var __vue_template__ = __webpack_require__(163)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableRow.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-cd7c46e6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-cd7c46e6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableRow.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var transitionClass = 'md-transition-off'; //
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
	    mdAutoSelect: Boolean,
	    mdSelection: Boolean,
	    mdItem: Object
	  },
	  data: function data() {
	    return {
	      parentTable: {},
	      headRow: false,
	      checkbox: false,
	      index: 0
	    };
	  },
	
	  computed: {
	    isDisabled: function isDisabled() {
	      return !this.mdSelection && !this.headRow;
	    },
	    hasSelection: function hasSelection() {
	      return this.mdSelection || this.headRow && this.parentTable.hasRowSelection;
	    },
	    classes: function classes() {
	      return {
	        'md-selected': this.checkbox
	      };
	    }
	  },
	  methods: {
	    setSelectedRow: function setSelectedRow(value, index) {
	      if (value) {
	        this.parentTable.selectedRows[index] = this.parentTable.data[index];
	        ++this.parentTable.numberOfSelected;
	      } else {
	        delete this.parentTable.selectedRows[index];
	        --this.parentTable.numberOfSelected;
	      }
	    },
	    handleSingleSelection: function handleSingleSelection(value) {
	      this.setSelectedRow(value, this.index - 1);
	      this.parentTable.$children[0].checkbox = this.parentTable.numberOfSelected === this.parentTable.numberOfRows;
	    },
	    handleMultipleSelection: function handleMultipleSelection(value) {
	      var _this = this;
	
	      if (this.parentTable.numberOfRows > 25) {
	        this.parentTable.$el.classList.add(transitionClass);
	      }
	
	      this.parentTable.$children.forEach(function (row, index) {
	        row.checkbox = value;
	
	        if (!row.headRow) {
	          _this.setSelectedRow(value, index - 1);
	        }
	      });
	
	      if (value) {
	        this.parentTable.numberOfSelected = this.parentTable.numberOfRows;
	      } else {
	        this.parentTable.numberOfSelected = 0;
	      }
	
	      window.setTimeout(function () {
	        return _this.parentTable.$el.classList.remove(transitionClass);
	      });
	    },
	    select: function select(value) {
	      if (this.hasSelection) {
	        if (this.headRow) {
	          this.handleMultipleSelection(value);
	        } else {
	          this.handleSingleSelection(value);
	        }
	
	        this.parentTable.emitSelection();
	      }
	    },
	    autoSelect: function autoSelect() {
	      if (this.mdAutoSelect && this.hasSelection) {
	        this.checkbox = !this.checkbox;
	        this.handleSingleSelection(this.checkbox);
	        this.parentTable.emitSelection();
	      }
	    }
	  },
	  watch: {
	    data: function data() {
	      this.parentTable.data[this.index] = this.item;
	    }
	  },
	  mounted: function mounted() {
	    this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');
	
	    if (this.$el.parentNode.tagName.toLowerCase() === 'thead') {
	      this.headRow = true;
	    } else {
	      this.parentTable.numberOfRows++;
	      this.index = this.parentTable.numberOfRows;
	
	      if (this.mdSelection) {
	        this.parentTable.hasRowSelection = true;
	      }
	
	      if (this.mdItem) {
	        this.parentTable.data.push(this.mdItem);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('tr', {
	    staticClass: "md-table-row",
	    class: _vm.classes,
	    on: {
	      "click": _vm.autoSelect
	    }
	  }, [(_vm.hasSelection) ? _vm._h('md-table-cell', {
	    staticClass: "md-table-selection"
	  }, [_vm._h('md-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.checkbox),
	      expression: "checkbox"
	    }],
	    attrs: {
	      "disabled": _vm.isDisabled
	    },
	    domProps: {
	      "value": (_vm.checkbox)
	    },
	    on: {
	      "change": _vm.select,
	      "input": function($event) {
	        _vm.checkbox = $event
	      }
	    }
	  })]) : _vm._e(), " ", _vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-cd7c46e6", module.exports)
	  }
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(165)
	
	/* template */
	var __vue_template__ = __webpack_require__(166)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableHead.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4c7d46bd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4c7d46bd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableHead.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdNumeric: Boolean,
	    mdSortBy: String,
	    mdTooltip: String
	  },
	  data: function data() {
	    return {
	      sortType: null,
	      sorted: false,
	      parentTable: {}
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      var matchSort = this.hasMatchSort();
	
	      if (!matchSort) {
	        this.sorted = false;
	      }
	
	      return {
	        'md-numeric': this.mdNumeric,
	        'md-sortable': this.mdSortBy,
	        'md-sorted': matchSort && this.sorted,
	        'md-sorted-descending': matchSort && this.sortType === 'desc'
	      };
	    }
	  },
	  methods: {
	    hasMatchSort: function hasMatchSort() {
	      return this.parentTable.sortBy === this.mdSortBy;
	    },
	    changeSort: function changeSort() {
	      if (this.mdSortBy) {
	        if (this.sortType === 'asc' && this.sorted) {
	          this.sortType = 'desc';
	        } else {
	          this.sortType = 'asc';
	        }
	
	        this.sorted = true;
	
	        this.parentTable.sortType = this.sortType;
	        this.parentTable.emitSort(this.mdSortBy);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentTable = (0, _getClosestVueParent2.default)(this.$parent, 'md-table');
	
	    if (this.hasMatchSort()) {
	      this.sorted = true;
	      this.sortType = this.parentTable.sortType;
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

	module.exports = exports['default'];

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('th', {
	    staticClass: "md-table-head",
	    class: _vm.classes,
	    on: {
	      "click": _vm.changeSort
	    }
	  }, [_vm._h('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (!_vm.mdSortBy),
	      expression: "!mdSortBy"
	    }],
	    staticClass: "md-table-head-container"
	  }, [_vm._h('div', {
	    staticClass: "md-table-head-text md-test"
	  }, [(_vm.mdSortBy) ? _vm._h('md-icon', {
	    staticClass: "md-sortable-icon"
	  }, ["arrow_downward"]) : _vm._e(), " ", _vm._t("default"), " ", (_vm.mdTooltip) ? _vm._h('md-tooltip', [_vm._s(_vm.mdTooltip)]) : _vm._e()])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4c7d46bd", module.exports)
	  }
	}

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(168)
	
	/* template */
	var __vue_template__ = __webpack_require__(169)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableCell.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-584d713f", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-584d713f", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCell.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 168 */
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
	    mdNumeric: Boolean
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-numeric': this.mdNumeric
	      };
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('td', {
	    staticClass: "md-table-cell",
	    class: _vm.classes
	  }, [_vm._h('div', {
	    staticClass: "md-table-cell-container"
	  }, [_vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-584d713f", module.exports)
	  }
	}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(171)
	
	/* template */
	var __vue_template__ = __webpack_require__(172)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableEdit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-23087c32", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-23087c32", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableEdit.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 171 */
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
	
	exports.default = {
	  props: {
	    value: String,
	    mdLarge: Boolean,
	    mdId: String,
	    mdName: String,
	    mdPlaceholder: String,
	    mdMaxlength: [Number, String]
	  },
	  data: function data() {
	    return {
	      active: false
	    };
	  },
	
	  computed: {
	    triggerClasses: function triggerClasses() {
	      return {
	        'md-edited': this.value
	      };
	    },
	    dialogClasses: function dialogClasses() {
	      return {
	        'md-active': this.active,
	        'md-large': this.mdLarge
	      };
	    },
	    realValue: function realValue() {
	      console.log(this.value);
	    }
	  },
	  methods: {
	    openDialog: function openDialog() {
	      this.active = true;
	      this.$refs.input.$el.focus();
	      document.addEventListener('click', this.closeDialogOnOffClick);
	    },
	    closeDialog: function closeDialog() {
	      if (this.active) {
	        this.active = false;
	        this.$refs.input.$el.blur();
	        document.removeEventListener('click', this.closeDialogOnOffClick);
	      }
	    },
	    closeDialogOnOffClick: function closeDialogOnOffClick(event) {
	      if (!this.$refs.dialog.contains(event.target)) {
	        this.closeDialog();
	      }
	    },
	    confirmDialog: function confirmDialog() {
	      var value = this.$refs.input.$el.value;
	
	      this.closeDialog();
	      this.$emit('input', value);
	      this.$emit('edited', value);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-table-edit",
	    on: {
	      "keydown": function($event) {
	        if ($event.keyCode !== 27) { return; }
	        _vm.closeDialog($event)
	      }
	    }
	  }, [_vm._h('div', {
	    staticClass: "md-table-edit-trigger",
	    class: _vm.triggerClasses,
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.openDialog($event)
	      }
	    }
	  }, ["\n    " + _vm._s(_vm.value || _vm.mdPlaceholder) + "\n  "]), " ", _vm._h('div', {
	    ref: "dialog",
	    staticClass: "md-table-dialog",
	    class: _vm.dialogClasses
	  }, [_vm._h('md-input-container', [_vm._h('md-input', {
	    ref: "input",
	    attrs: {
	      "id": _vm.mdId,
	      "name": _vm.mdName,
	      "maxlength": _vm.mdMaxlength,
	      "value": _vm.value,
	      "placeholder": _vm.mdPlaceholder
	    },
	    nativeOn: {
	      "keydown": function($event) {
	        if ($event.keyCode !== 13) { return; }
	        _vm.confirmDialog($event)
	      }
	    }
	  })])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-23087c32", module.exports)
	  }
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(174)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e2fe4826", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e2fe4826", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('md-card', {
	    staticClass: "md-table-card"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e2fe4826", module.exports)
	  }
	}

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(176)
	
	/* template */
	var __vue_template__ = __webpack_require__(177)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTableAlternateHeader.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1ea3ef5a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1ea3ef5a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTableAlternateHeader.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdSelectedLabel: String
	  },
	  data: function data() {
	    return {
	      classes: {},
	      tableInstance: {}
	    };
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.parentCard = (0, _getClosestVueParent2.default)(this.$parent, 'md-table-card');
	
	    this.$nextTick(function () {
	      _this.tableInstance = _this.parentCard.tableInstance;
	
	      _this.$watch('tableInstance.numberOfSelected', function () {
	        _this.$refs.counter.textContent = _this.tableInstance.numberOfSelected;
	        _this.classes = {
	          'md-active': _this.tableInstance.numberOfSelected > 0
	        };
	      });
	    });
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

	module.exports = exports['default'];

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-table-alternate-header",
	    class: _vm.classes
	  }, [_vm._h('md-toolbar', [_vm._h('div', {
	    staticClass: "md-counter"
	  }, [_vm._h('span', {
	    ref: "counter"
	  }, [_vm._s(_vm.tableInstance.numberOfSelected)]), " ", _vm._h('span', [_vm._s(_vm.mdSelectedLabel)])]), " ", _vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1ea3ef5a", module.exports)
	  }
	}

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(179)
	
	/* template */
	var __vue_template__ = __webpack_require__(180)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTable/mdTablePagination.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7f188892", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7f188892", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTablePagination.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 179 */
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
	
	exports.default = {
	  props: {
	    mdSize: {
	      type: [Number, String],
	      default: 10
	    },
	    mdPageOptions: [Array, Boolean],
	    mdPage: {
	      type: [Number, String],
	      default: 1
	    },
	    mdTotal: {
	      type: [Number, String],
	      default: 'Many'
	    },
	    mdLabel: {
	      type: String,
	      default: 'Rows per page'
	    },
	    mdSeparator: {
	      type: String,
	      default: 'of'
	    }
	  },
	  data: function data() {
	    return {
	      currentSize: parseInt(this.mdSize, 10),
	      currentPage: parseInt(this.mdPage, 10)
	    };
	  },
	
	  computed: {
	    lastPage: function lastPage() {
	      return false;
	    }
	  },
	  methods: {
	    emitPaginationEvent: function emitPaginationEvent() {
	      if (this.canFireEvents) {
	        this.$emit('pagination', {
	          size: this.currentSize,
	          page: this.currentPage
	        });
	      }
	    },
	    changeSize: function changeSize() {
	      if (this.canFireEvents) {
	        this.$emit('size', this.currentSize);
	        this.emitPaginationEvent();
	      }
	    },
	    changePage: function changePage() {
	      if (this.canFireEvents) {
	        this.$emit('page', this.currentPage);
	        this.emitPaginationEvent();
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.$nextTick(function () {
	      _this.mdPageOptions = _this.mdPageOptions || [10, 25, 50, 100];
	      _this.currentSize = _this.mdPageOptions[0];
	      _this.canFireEvents = true;
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-table-pagination"
	  }, [_vm._h('span', {
	    staticClass: "md-table-pagination-label"
	  }, [_vm._s(_vm.mdLabel) + ":"]), " ", (_vm.mdPageOptions) ? _vm._h('md-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentSize),
	      expression: "currentSize"
	    }],
	    attrs: {
	      "md-menu-class": "md-pagination-select"
	    },
	    domProps: {
	      "value": (_vm.currentSize)
	    },
	    on: {
	      "change": _vm.changeSize,
	      "input": function($event) {
	        _vm.currentSize = $event
	      }
	    }
	  }, [_vm._l((_vm.mdPageOptions), function(amount) {
	    return _vm._h('md-option', {
	      attrs: {
	        "value": amount
	      }
	    }, [_vm._s(amount)])
	  })]) : _vm._e(), " ", _vm._h('span', [_vm._s((_vm.currentSize - _vm.currentSize + 1) * _vm.currentPage) + "-" + _vm._s(_vm.currentSize) + " " + _vm._s(_vm.mdSeparator) + " " + _vm._s(_vm.mdTotal)]), " ", _vm._h('md-button', {
	    staticClass: "md-icon-button md-table-pagination-previous",
	    attrs: {
	      "disabled": _vm.currentPage === 1
	    },
	    on: {
	      "click": _vm.changePage
	    }
	  }, [_vm._h('md-icon', ["keyboard_arrow_left"])]), " ", _vm._h('md-button', {
	    staticClass: "md-icon-button md-table-pagination-next",
	    attrs: {
	      "disabled": _vm.currentSize * _vm.currentPage >= _vm.mdTotal
	    },
	    on: {
	      "click": _vm.changePage
	    }
	  }, [_vm._h('md-icon', ["keyboard_arrow_right"])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7f188892", module.exports)
	  }
	}

/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-table-card .md-toolbar, .THEME_NAME.md-table-card .md-toolbar {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST-A100; }\n\n.THEME_NAME .md-table-alternate-header, .THEME_NAME.md-table-alternate-header {\n  background-color: BACKGROUND-COLOR-A100; }\n  .THEME_NAME .md-table-alternate-header .md-toolbar, .THEME_NAME.md-table-alternate-header .md-toolbar {\n    background-color: ACCENT-COLOR-A100-0.2;\n    color: ACCENT-CONTRAST-A100; }\n  .THEME_NAME .md-table-alternate-header .md-counter, .THEME_NAME.md-table-alternate-header .md-counter {\n    color: ACCENT-COLOR; }\n"

/***/ },
/* 182 */
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
/* 183 */
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
/* 184 */,
/* 185 */
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
/* 186 */
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
/* 187 */
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
/* 188 */
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
/* 189 */
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
/* 190 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-tabs .md-tabs-navigation, .THEME_NAME.md-tabs .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-tabs .md-tab-header, .THEME_NAME.md-tabs .md-tab-header {\n  color: PRIMARY-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs .md-tab-header.md-active, .THEME_NAME .md-tabs .md-tab-header:focus, .THEME_NAME.md-tabs .md-tab-header.md-active, .THEME_NAME.md-tabs .md-tab-header:focus {\n    color: PRIMARY-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs .md-tab-header.md-disabled, .THEME_NAME.md-tabs .md-tab-header.md-disabled {\n    color: PRIMARY-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs .md-tab-indicator, .THEME_NAME.md-tabs .md-tab-indicator {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tabs-navigation, .THEME_NAME.md-tabs.md-accent .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-header, .THEME_NAME.md-tabs.md-accent .md-tab-header {\n  color: ACCENT-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-accent .md-tab-header:focus, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent .md-tab-header:focus {\n    color: ACCENT-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs.md-accent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-accent .md-tab-header.md-disabled {\n    color: ACCENT-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-accent .md-tab-indicator, .THEME_NAME.md-tabs.md-accent .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tabs-navigation, .THEME_NAME.md-tabs.md-warn .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-header, .THEME_NAME.md-tabs.md-warn .md-tab-header {\n  color: WARN-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME .md-tabs.md-warn .md-tab-header:focus, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn .md-tab-header:focus {\n    color: WARN-CONTRAST-0.99999; }\n  .THEME_NAME .md-tabs.md-warn .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-warn .md-tab-header.md-disabled {\n    color: WARN-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-warn .md-tab-indicator, .THEME_NAME.md-tabs.md-warn .md-tab-indicator {\n  background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tabs-navigation, .THEME_NAME.md-tabs.md-transparent .md-tabs-navigation {\n  background-color: transparent; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-header, .THEME_NAME.md-tabs.md-transparent .md-tab-header {\n  color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME .md-tabs.md-transparent .md-tab-header:focus, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent .md-tab-header:focus {\n    color: PRIMARY-COLOR; }\n  .THEME_NAME .md-tabs.md-transparent .md-tab-header.md-disabled, .THEME_NAME.md-tabs.md-transparent .md-tab-header.md-disabled {\n    color: BACKGROUND-CONTRAST-0.26; }\n\n.THEME_NAME .md-tabs.md-transparent .md-tab-indicator, .THEME_NAME.md-tabs.md-transparent .md-tab-indicator {\n  background-color: PRIMARY-COLOR; }\n"

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdToolbar = __webpack_require__(192);
	
	var _mdToolbar2 = _interopRequireDefault(_mdToolbar);
	
	var _mdToolbar3 = __webpack_require__(195);
	
	var _mdToolbar4 = _interopRequireDefault(_mdToolbar3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-toolbar', Vue.extend(_mdToolbar2.default));
	
	  Vue.material.styles.push(_mdToolbar4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-668063d7!sass!./mdToolbar.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* template */
	var __vue_template__ = __webpack_require__(194)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdToolbar/mdToolbar.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-668063d7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-668063d7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdToolbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 193 */,
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-toolbar"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-668063d7", module.exports)
	  }
	}

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-toolbar, .THEME_NAME.md-toolbar {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-toolbar.md-accent, .THEME_NAME.md-toolbar.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n  .THEME_NAME .md-toolbar.md-warn, .THEME_NAME.md-toolbar.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n  .THEME_NAME .md-toolbar.md-transparent, .THEME_NAME.md-toolbar.md-transparent {\n    background-color: transparent;\n    color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTooltip = __webpack_require__(197);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tooltip', Vue.extend(_mdTooltip2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-3104dae7!sass!./mdTooltip.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(199)
	
	/* template */
	var __vue_template__ = __webpack_require__(200)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTooltip/mdTooltip.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3104dae7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3104dae7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTooltip.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 198 */,
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(113);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	var _getInViewPosition = __webpack_require__(114);
	
	var _getInViewPosition2 = _interopRequireDefault(_getInViewPosition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	    mdDirection: {
	      type: String,
	      default: 'bottom'
	    },
	    mdDelay: {
	      type: String,
	      default: '0'
	    }
	  },
	  data: function data() {
	    return {
	      active: false,
	      transitionOff: false,
	      topPosition: false,
	      leftPosition: false
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-active': this.active,
	        'md-transition-off': this.transitionOff,
	        'md-tooltip-top': this.mdDirection === 'top',
	        'md-tooltip-right': this.mdDirection === 'right',
	        'md-tooltip-bottom': this.mdDirection === 'bottom',
	        'md-tooltip-left': this.mdDirection === 'left'
	      };
	    },
	    style: function style() {
	      return {
	        'transition-delay': this.mdDelay + 'ms',
	        top: this.topPosition + 'px',
	        left: this.leftPosition + 'px'
	      };
	    }
	  },
	  watch: {
	    mdDirection: function mdDirection() {
	      this.calculateTooltipPosition();
	    }
	  },
	  methods: {
	    calculateTooltipPosition: function calculateTooltipPosition() {
	      var position = this.parentElement.getBoundingClientRect();
	      var cssPosition = {};
	
	      switch (this.mdDirection) {
	        case 'top':
	          cssPosition.top = position.top - this.$el.offsetHeight;
	          cssPosition.left = position.left + position.width / 2;
	
	          break;
	
	        case 'right':
	          cssPosition.top = position.top;
	          cssPosition.left = position.left + position.width;
	
	          break;
	
	        case 'bottom':
	          cssPosition.top = position.bottom;
	          cssPosition.left = position.left + position.width / 2;
	
	          break;
	
	        case 'left':
	          cssPosition.top = position.top;
	          cssPosition.left = position.left - this.$el.offsetWidth;
	
	          break;
	
	        default:
	          console.warn('Invalid ' + this.mdDirection + ' option to md-direction option');
	      }
	
	      cssPosition = (0, _getInViewPosition2.default)(this.tooltipElement, cssPosition);
	
	      this.topPosition = cssPosition.top;
	      this.leftPosition = cssPosition.left;
	    },
	    open: function open() {
	      var _this = this;
	
	      document.body.appendChild(this.tooltipElement);
	      getComputedStyle(this.tooltipElement).top;
	      this.transitionOff = true;
	      this.calculateTooltipPosition();
	
	      window.setTimeout(function () {
	        _this.transitionOff = false;
	        _this.active = true;
	      }, 10);
	    },
	    close: function close() {
	      var _this2 = this;
	
	      var cleanupElements = function cleanupElements() {
	        _this2.tooltipElement.removeEventListener(_transitionEndEventName2.default, cleanupElements);
	
	        if (_this2.tooltipElement.parentNode && !_this2.tooltipElement.classList.contains('md-active')) {
	          document.body.removeChild(_this2.tooltipElement);
	        }
	      };
	
	      this.active = false;
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, cleanupElements);
	      this.tooltipElement.addEventListener(_transitionEndEventName2.default, cleanupElements);
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;
	
	    this.$nextTick(function () {
	      _this3.tooltipElement = _this3.$el;
	      _this3.parentElement = _this3.tooltipElement.parentNode;
	
	      _this3.$el.parentNode.removeChild(_this3.$el);
	
	      _this3.parentElement.addEventListener('mouseenter', _this3.open);
	      _this3.parentElement.addEventListener('focus', _this3.open);
	      _this3.parentElement.addEventListener('mouseleave', _this3.close);
	      _this3.parentElement.addEventListener('blur', _this3.close);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.active = false;
	
	    if (this.$el.parentNode) {
	      document.body.removeChild(this.$el);
	    }
	
	    if (this.parentElement) {
	      this.parentElement.removeEventListener('mouseenter', this.open);
	      this.parentElement.removeEventListener('focus', this.open);
	      this.parentElement.removeEventListener('mouseleave', this.close);
	      this.parentElement.removeEventListener('blur', this.close);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('span', {
	    staticClass: "md-tooltip",
	    class: _vm.classes,
	    style: (_vm.style)
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3104dae7", module.exports)
	  }
	}

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdWhiteframe = __webpack_require__(202);
	
	var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-whiteframe', Vue.extend(_mdWhiteframe2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-01d6d326!sass!./mdWhiteframe.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(204)
	
	/* template */
	var __vue_template__ = __webpack_require__(205)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdWhiteframe/mdWhiteframe.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-01d6d326", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-01d6d326", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdWhiteframe.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 203 */,
/* 204 */
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
	    mdElevation: [String, Number]
	  },
	  data: function data() {
	    return {
	      elevation: this.mdElevation === 0 ? 0 : this.mdElevation || 1
	    };
	  },
	
	  watch: {
	    mdElevation: function mdElevation() {
	      this.elevation = this.mdElevation;
	    }
	  },
	  computed: {
	    classes: function classes() {
	      var numberedElevation = parseInt(this.elevation, 10);
	      var elevationClass = 'md-whiteframe-';
	
	      if (!isNaN(numberedElevation) && typeof numberedElevation === 'number') {
	        elevationClass += numberedElevation;
	        elevationClass += 'dp';
	      } else if (this.elevation.indexOf('dp') > -1) {
	        elevationClass += this.elevation;
	      }
	
	      return elevationClass;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-whiteframe",
	    class: _vm.classes
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-01d6d326", module.exports)
	  }
	}

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _core = __webpack_require__(61);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _mdAvatar = __webpack_require__(1);
	
	var _mdAvatar2 = _interopRequireDefault(_mdAvatar);
	
	var _mdBottomBar = __webpack_require__(6);
	
	var _mdBottomBar2 = _interopRequireDefault(_mdBottomBar);
	
	var _mdButton = __webpack_require__(15);
	
	var _mdButton2 = _interopRequireDefault(_mdButton);
	
	var _mdButtonToggle = __webpack_require__(20);
	
	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);
	
	var _mdCheckbox = __webpack_require__(55);
	
	var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);
	
	var _mdCard = __webpack_require__(26);
	
	var _mdCard2 = _interopRequireDefault(_mdCard);
	
	var _mdDivider = __webpack_require__(74);
	
	var _mdDivider2 = _interopRequireDefault(_mdDivider);
	
	var _mdIcon = __webpack_require__(78);
	
	var _mdIcon2 = _interopRequireDefault(_mdIcon);
	
	var _mdInputContainer = __webpack_require__(83);
	
	var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);
	
	var _mdList = __webpack_require__(99);
	
	var _mdList2 = _interopRequireDefault(_mdList);
	
	var _mdMenu = __webpack_require__(109);
	
	var _mdMenu2 = _interopRequireDefault(_mdMenu);
	
	var _mdRadio = __webpack_require__(124);
	
	var _mdRadio2 = _interopRequireDefault(_mdRadio);
	
	var _mdSelect = __webpack_require__(130);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdSidenav = __webpack_require__(139);
	
	var _mdSidenav2 = _interopRequireDefault(_mdSidenav);
	
	var _mdSubheader = __webpack_require__(145);
	
	var _mdSubheader2 = _interopRequireDefault(_mdSubheader);
	
	var _mdSwitch = __webpack_require__(150);
	
	var _mdSwitch2 = _interopRequireDefault(_mdSwitch);
	
	var _mdTable = __webpack_require__(156);
	
	var _mdTable2 = _interopRequireDefault(_mdTable);
	
	var _mdTabs = __webpack_require__(182);
	
	var _mdTabs2 = _interopRequireDefault(_mdTabs);
	
	var _mdToolbar = __webpack_require__(191);
	
	var _mdToolbar2 = _interopRequireDefault(_mdToolbar);
	
	var _mdTooltip = __webpack_require__(196);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	var _mdWhiteframe = __webpack_require__(201);
	
	var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var options = {
	  mdCore: _core2.default,
	  mdAvatar: _mdAvatar2.default,
	  mdBottomBar: _mdBottomBar2.default,
	  mdButton: _mdButton2.default,
	  mdButtonToggle: _mdButtonToggle2.default,
	  mdCheckbox: _mdCheckbox2.default,
	  mdCard: _mdCard2.default,
	  mdDivider: _mdDivider2.default,
	  mdIcon: _mdIcon2.default,
	  mdInputContainer: _mdInputContainer2.default,
	  mdList: _mdList2.default,
	  mdMenu: _mdMenu2.default,
	  mdRadio: _mdRadio2.default,
	  mdSelect: _mdSelect2.default,
	  mdSidenav: _mdSidenav2.default,
	  mdSubheader: _mdSubheader2.default,
	  mdSwitch: _mdSwitch2.default,
	  mdTable: _mdTable2.default,
	  mdTabs: _mdTabs2.default,
	  mdToolbar: _mdToolbar2.default,
	  mdTooltip: _mdTooltip2.default,
	  mdWhiteframe: _mdWhiteframe2.default
	};
	
	options.install = function (Vue) {
	  for (var component in options) {
	    var componentInstaller = options[component];
	
	    if (componentInstaller && component !== 'install') {
	      Vue.use(componentInstaller);
	    }
	  }
	};
	
	window.VueMaterial = options;
	
	exports.default = options;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-material.debug.js.map