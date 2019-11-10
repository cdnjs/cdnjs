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

	module.exports = __webpack_require__(251);


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
	
	var _mdAvatar3 = __webpack_require__(8);
	
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
	__webpack_require__(3)
	
	/* script */
	__vue_exports__ = __webpack_require__(5)
	
	/* template */
	var __vue_template__ = __webpack_require__(7)
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
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-avatar",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1cbfca0d", module.exports)
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-avatar.md-primary.md-avatar-icon {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-avatar.md-primary.md-avatar-icon .md-icon {\n    color: PRIMARY-CONTRAST-0.99999; }\n\n.THEME_NAME.md-avatar.md-accent.md-avatar-icon {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-avatar.md-accent.md-avatar-icon .md-icon {\n    color: ACCENT-CONTRAST-0.99999; }\n\n.THEME_NAME.md-avatar.md-warn.md-avatar-icon {\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-avatar.md-warn.md-avatar-icon .md-icon {\n    color: WARN-CONTRAST-0.99999; }\n"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdBackdrop = __webpack_require__(10);
	
	var _mdBackdrop2 = _interopRequireDefault(_mdBackdrop);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-backdrop', Vue.extend(_mdBackdrop2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(11)
	
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdBackdrop/mdBackdrop.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-df1259a6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-df1259a6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdBackdrop.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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
	
	exports.default = {
	  methods: {
	    close: function close() {
	      this.$emit('close');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-backdrop",
	    on: {
	      "click": _vm.close,
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.close($event)
	      }
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-df1259a6", module.exports)
	  }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdBottomBar = __webpack_require__(15);
	
	var _mdBottomBar2 = _interopRequireDefault(_mdBottomBar);
	
	var _mdBottomBarItem = __webpack_require__(19);
	
	var _mdBottomBarItem2 = _interopRequireDefault(_mdBottomBarItem);
	
	var _mdBottomBar3 = __webpack_require__(22);
	
	var _mdBottomBar4 = _interopRequireDefault(_mdBottomBar3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-bottom-bar', Vue.extend(_mdBottomBar2.default));
	  Vue.component('md-bottom-bar-item', Vue.extend(_mdBottomBarItem2.default));
	
	  Vue.material.styles.push(_mdBottomBar4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(16)
	
	/* script */
	__vue_exports__ = __webpack_require__(17)
	
	/* template */
	var __vue_template__ = __webpack_require__(18)
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
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdShift: Boolean
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    classes: function classes() {
	      return this.mdShift ? 'md-shift' : 'md-fixed';
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

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-bottom-bar",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-039c211e", module.exports)
	  }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(20)
	
	/* template */
	var __vue_template__ = __webpack_require__(21)
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
/* 20 */
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
	
	exports.default = {
	  props: {
	    mdIcon: String,
	    mdActive: Boolean,
	    href: String
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return (_vm.href) ? _c('a', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple"
	    }],
	    staticClass: "md-bottom-bar-item",
	    class: _vm.classes,
	    attrs: {
	      "href": _vm.href
	    },
	    on: {
	      "click": _vm.setActive
	    }
	  }, [_c('md-icon', [_vm._v(_vm._s(_vm.mdIcon))]), _vm._v(" "), _c('span', {
	    staticClass: "md-text"
	  }, [_vm._t("default")], true)]) : _c('button', {
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
	  }, [_c('md-icon', [_vm._v(_vm._s(_vm.mdIcon))]), _vm._v(" "), _c('span', {
	    staticClass: "md-text"
	  }, [_vm._t("default")], true)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1c07f8a4", module.exports)
	  }
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-bottom-bar.md-fixed {\n  background-color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item:hover:not(.md-active) {\n      color: BACKGROUND-CONTRAST-0.87; }\n    .THEME_NAME.md-bottom-bar.md-fixed .md-bottom-bar-item.md-active {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-accent .md-bottom-bar-item.md-active {\n    color: ACCENT-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-warn .md-bottom-bar-item.md-active {\n    color: WARN-COLOR; }\n  .THEME_NAME.md-bottom-bar.md-fixed.md-transparent .md-bottom-bar-item.md-active {\n    color: BACKGROUND-CONTRAST; }\n\n.THEME_NAME.md-bottom-bar.md-shift {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item:hover:not(.md-active) {\n      color: PRIMARY-CONTRAST-0.87; }\n    .THEME_NAME.md-bottom-bar.md-shift .md-bottom-bar-item.md-active {\n      color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-accent {\n    background-color: ACCENT-COLOR; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item {\n      color: ACCENT-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item:hover:not(.md-active) {\n        color: ACCENT-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-accent .md-bottom-bar-item.md-active {\n        color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-warn {\n    background-color: WARN-COLOR; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item {\n      color: WARN-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item:hover:not(.md-active) {\n        color: WARN-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-warn .md-bottom-bar-item.md-active {\n        color: WARN-CONTRAST; }\n  .THEME_NAME.md-bottom-bar.md-shift.md-transparent {\n    background-color: transparent; }\n    .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item {\n      color: BACKGROUND-CONTRAST-0.54; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item:hover:not(.md-active) {\n        color: BACKGROUND-CONTRAST-0.87; }\n      .THEME_NAME.md-bottom-bar.md-shift.md-transparent .md-bottom-bar-item.md-active {\n        color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdButton = __webpack_require__(24);
	
	var _mdButton2 = _interopRequireDefault(_mdButton);
	
	var _mdButton3 = __webpack_require__(28);
	
	var _mdButton4 = _interopRequireDefault(_mdButton3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-button', Vue.extend(_mdButton2.default));
	
	  Vue.material.styles.push(_mdButton4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(25)
	
	/* script */
	__vue_exports__ = __webpack_require__(26)
	
	/* template */
	var __vue_template__ = __webpack_require__(27)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
/* 25 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    href: String,
	    target: String,
	    rel: String,
	    type: {
	      type: String,
	      default: 'button'
	    },
	    disabled: Boolean
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    newRel: function newRel() {
	      if (this.target === '_blank') {
	        return this.rel || 'noopener';
	      }
	
	      return this.rel;
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return (!_vm.href) ? _c('button', {
	    staticClass: "md-button",
	    class: [_vm.themeClass],
	    attrs: {
	      "type": _vm.type,
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": function($event) {
	        _vm.$emit('click', $event)
	      }
	    }
	  }, [_c('md-ink-ripple', {
	    attrs: {
	      "md-disabled": _vm.disabled
	    }
	  }), _vm._v(" "), _vm._t("default")], true) : _c('a', {
	    staticClass: "md-button",
	    class: [_vm.themeClass],
	    attrs: {
	      "href": _vm.href,
	      "disabled": _vm.disabled,
	      "target": _vm.target,
	      "rel": _vm.newRel
	    },
	    on: {
	      "click": function($event) {
	        _vm.$emit('click', $event)
	      }
	    }
	  }, [_c('md-ink-ripple', {
	    attrs: {
	      "md-disabled": _vm.disabled
	    }
	  }), _vm._v(" "), _vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9b3983a6", module.exports)
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button) {\n  color: BACKGROUND-COLOR-900;\n  background-color: BACKGROUND-COLOR-50; }\n  .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button):hover {\n    background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised) {\n  color: BACKGROUND-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-fab {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button:not([disabled]).md-fab:hover {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME.md-button:not([disabled]).md-fab.md-clean {\n    color: BACKGROUND-COLOR-900;\n    background-color: BACKGROUND-COLOR-50; }\n    .THEME_NAME.md-button:not([disabled]).md-fab.md-clean:hover {\n      background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary:not(.md-icon-button) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-raised, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab:hover {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent:not(.md-icon-button) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-raised {\n  background-color: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-accent.md-raised:hover {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn:not(.md-icon-button) {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-raised, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab {\n  background-color: WARN-COLOR;\n  color: WARN-CONTRAST; }\n  .THEME_NAME.md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab:hover {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME.md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised) {\n  color: WARN-COLOR; }\n"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdButtonToggle = __webpack_require__(30);
	
	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);
	
	var _mdButtonToggle3 = __webpack_require__(34);
	
	var _mdButtonToggle4 = _interopRequireDefault(_mdButtonToggle3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-button-toggle', Vue.extend(_mdButtonToggle2.default));
	
	  Vue.material.styles.push(_mdButtonToggle4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(31)
	
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
/* 31 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var onClickButton = void 0; //
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  props: {
	    mdSingle: Boolean
	  },
	  mixins: [_mixin2.default],
	  mounted: function mounted() {
	    var _this = this;
	
	    this.$children.forEach(function (child) {
	      var element = child.$el;
	      var toggleClass = 'md-toggle';
	
	      onClickButton = function onClickButton() {
	        if (_this.mdSingle) {
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-button-toggle",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-106cf22d", module.exports)
	  }
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-button-toggle .md-button:after {\n  width: 1px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  content: \" \"; }\n\n.THEME_NAME.md-button-toggle .md-toggle {\n  color: BACKGROUND-CONTRAST-600;\n  background-color: BACKGROUND-COLOR-500; }\n  .THEME_NAME.md-button-toggle .md-toggle:hover:not([disabled]) {\n    background-color: BACKGROUND-COLOR-600; }\n  .THEME_NAME.md-button-toggle .md-toggle + .md-toggle:after {\n    background-color: BACKGROUND-COLOR-600; }\n\n.THEME_NAME.md-button-toggle.md-primary .md-toggle {\n  color: PRIMARY-CONTRAST;\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-button-toggle.md-primary .md-toggle:hover:not([disabled]) {\n    background-color: PRIMARY-COLOR-600; }\n  .THEME_NAME.md-button-toggle.md-primary .md-toggle + .md-toggle:after {\n    background-color: PRIMARY-COLOR-700; }\n\n.THEME_NAME.md-button-toggle.md-accent .md-toggle {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button-toggle.md-accent .md-toggle:hover:not([disabled]) {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME.md-button-toggle.md-accent .md-toggle + .md-toggle:after {\n    background-color: ACCENT-COLOR-700; }\n\n.THEME_NAME.md-button-toggle.md-warn .md-toggle {\n  color: WARN-CONTRAST;\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-button-toggle.md-warn .md-toggle:hover:not([disabled]) {\n    background-color: WARN-COLOR-600; }\n  .THEME_NAME.md-button-toggle.md-warn .md-toggle + .md-toggle:after {\n    background-color: WARN-COLOR-700; }\n\n.THEME_NAME.md-button-toggle [disabled] {\n  color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-button-toggle [disabled].md-toggle {\n    color: BACKGROUND-CONTRAST-0.2;\n    background-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdCard = __webpack_require__(36);
	
	var _mdCard2 = _interopRequireDefault(_mdCard);
	
	var _mdCardMedia = __webpack_require__(40);
	
	var _mdCardMedia2 = _interopRequireDefault(_mdCardMedia);
	
	var _mdCardMediaCover = __webpack_require__(43);
	
	var _mdCardMediaCover2 = _interopRequireDefault(_mdCardMediaCover);
	
	var _mdCardMediaActions = __webpack_require__(46);
	
	var _mdCardMediaActions2 = _interopRequireDefault(_mdCardMediaActions);
	
	var _mdCardHeader = __webpack_require__(48);
	
	var _mdCardHeader2 = _interopRequireDefault(_mdCardHeader);
	
	var _mdCardHeaderText = __webpack_require__(50);
	
	var _mdCardHeaderText2 = _interopRequireDefault(_mdCardHeaderText);
	
	var _mdCardContent = __webpack_require__(53);
	
	var _mdCardContent2 = _interopRequireDefault(_mdCardContent);
	
	var _mdCardActions = __webpack_require__(55);
	
	var _mdCardActions2 = _interopRequireDefault(_mdCardActions);
	
	var _mdCardArea = __webpack_require__(57);
	
	var _mdCardArea2 = _interopRequireDefault(_mdCardArea);
	
	var _mdCardExpand = __webpack_require__(60);
	
	var _mdCardExpand2 = _interopRequireDefault(_mdCardExpand);
	
	var _mdCard3 = __webpack_require__(63);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(37)
	
	/* script */
	__vue_exports__ = __webpack_require__(38)
	
	/* template */
	var __vue_template__ = __webpack_require__(39)
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
/* 37 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdWithHover: Boolean
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    classes: function classes() {
	      return {
	        'md-with-hover': this.mdWithHover
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

	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5074f4ed", module.exports)
	  }
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(41)
	
	/* template */
	var __vue_template__ = __webpack_require__(42)
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
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-media",
	    class: _vm.classes
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-623c9b27", module.exports)
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(44)
	
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
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-media-cover",
	    class: _vm.classes
	  }, [_vm._t("default"), _vm._v(" "), (_vm.mdTextScrim) ? _c('div', {
	    ref: "backdrop",
	    staticClass: "md-card-backdrop",
	    style: (_vm.styles)
	  }) : _vm._e()], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1a9ce900", module.exports)
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-media-actions"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9711f4f4", module.exports)
	  }
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(49)
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-header"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2b945d4c", module.exports)
	  }
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(51)
	
	/* template */
	var __vue_template__ = __webpack_require__(52)
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-header-text"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3c04eb27", module.exports)
	  }
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(54)
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-content"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-015e0e7c", module.exports)
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(56)
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-actions"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-78014100", module.exports)
	  }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-card-area",
	    class: _vm.classes
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3894e89a", module.exports)
	  }
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(61)
	
	/* template */
	var __vue_template__ = __webpack_require__(62)
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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    ref: "expand",
	    staticClass: "md-card-expand"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d6fa0232", module.exports)
	  }
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-card {\n  background-color: BACKGROUND-COLOR-A100; }\n  .THEME_NAME.md-card.md-primary {\n    background-color: PRIMARY-COLOR;\n    color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-card.md-primary .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-primary .md-card-actions .md-icon-button .md-icon {\n      color: PRIMARY-CONTRAST-0.87; }\n  .THEME_NAME.md-card.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-card.md-accent .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-accent .md-card-actions .md-icon-button .md-icon {\n      color: ACCENT-CONTRAST-0.87; }\n  .THEME_NAME.md-card.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n    .THEME_NAME.md-card.md-warn .md-card-header .md-icon-button .md-icon,\n    .THEME_NAME.md-card.md-warn .md-card-actions .md-icon-button .md-icon {\n      color: WARN-CONTRAST-0.87; }\n  .THEME_NAME.md-card .md-card-header .md-icon-button .md-icon,\n  .THEME_NAME.md-card .md-card-actions .md-icon-button .md-icon {\n    color: BACKGROUND-CONTRAST-0.54; }\n  .THEME_NAME.md-card > .md-card-area:after {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-card .md-card-media-cover.md-text-scrim .md-backdrop {\n    background: linear-gradient(to bottom, BACKGROUND-CONTRAST-0.0 20%, BACKGROUND-CONTRAST-0.275 66%, BACKGROUND-CONTRAST-0.55 100%); }\n  .THEME_NAME.md-card .md-card-media-cover.md-solid .md-card-area {\n    background-color: BACKGROUND-CONTRAST-0.4; }\n  .THEME_NAME.md-card .md-card-expand .md-card-actions {\n    background-color: BACKGROUND-COLOR-A100; }\n"

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdCheckbox = __webpack_require__(65);
	
	var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);
	
	var _mdCheckbox3 = __webpack_require__(69);
	
	var _mdCheckbox4 = _interopRequireDefault(_mdCheckbox3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-checkbox', Vue.extend(_mdCheckbox2.default));
	
	  Vue.material.styles.push(_mdCheckbox4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(66)
	
	/* script */
	__vue_exports__ = __webpack_require__(67)
	
	/* template */
	var __vue_template__ = __webpack_require__(68)
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
/* 66 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    name: String,
	    value: [String, Boolean],
	    id: String,
	    disabled: Boolean
	  },
	  mixins: [_mixin2.default],
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-checkbox",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('div', {
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
	  })]), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
	    staticClass: "md-checkbox-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")], true) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9db725e6", module.exports)
	  }
	}

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-checkbox.md-checked .md-checkbox-container {\n  background-color: ACCENT-COLOR;\n  border-color: ACCENT-COLOR; }\n  .THEME_NAME.md-checkbox.md-checked .md-checkbox-container:after {\n    border-color: ACCENT-CONTRAST; }\n\n.THEME_NAME.md-checkbox.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-checkbox.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container {\n  background-color: PRIMARY-COLOR;\n  border-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container:after {\n    border-color: PRIMARY-CONTRAST; }\n\n.THEME_NAME.md-checkbox.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container {\n  background-color: WARN-COLOR;\n  border-color: WARN-COLOR; }\n  .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container:after {\n    border-color: WARN-CONTRAST; }\n\n.THEME_NAME.md-checkbox.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-checkbox.md-disabled.md-checked .md-checkbox-container {\n  background-color: rgba(0, 0, 0, 0.26);\n  border-color: transparent; }\n\n.THEME_NAME.md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTheme = __webpack_require__(71);
	
	var _mdTheme2 = _interopRequireDefault(_mdTheme);
	
	var _mdInkRipple = __webpack_require__(76);
	
	var _mdInkRipple2 = _interopRequireDefault(_mdInkRipple);
	
	var _core = __webpack_require__(80);
	
	var _core2 = _interopRequireDefault(_core);
	
	__webpack_require__(81);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Code Components */
	function install(Vue) {
	  if (install.installed) {
	    console.warn('Vue Material is already installed.');
	
	    return;
	  }
	
	  install.installed = true;
	
	  Vue.use(_mdTheme2.default);
	  Vue.use(_mdInkRipple2.default);
	  Vue.material.styles.push(_core2.default);
	}
	
	/* Core Stylesheets */
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _palette = __webpack_require__(72);
	
	var _palette2 = _interopRequireDefault(_palette);
	
	var _rgba = __webpack_require__(73);
	
	var _rgba2 = _interopRequireDefault(_rgba);
	
	var _MdTheme = __webpack_require__(74);
	
	var _MdTheme2 = _interopRequireDefault(_MdTheme);
	
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
	  var styleElement = head.querySelector('#' + styleId);
	
	  if (!styleElement) {
	    var newTag = document.createElement('style');
	
	    style = style.replace(/THEME_NAME/g, styleId);
	
	    newTag.type = 'text/css';
	    newTag.id = styleId;
	    newTag.textContent = style;
	
	    head.appendChild(newTag);
	  } else {
	    styleElement.textContent = style;
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
	
	  themeNames.forEach(function (name) {
	    registerTheme(themes[name], name, themeStyles);
	    registeredThemes.push(name);
	  });
	};
	
	function install(Vue) {
	  Vue.material = new Vue({
	    data: function data() {
	      return {
	        styles: [],
	        currentTheme: null
	      };
	    },
	    methods: {
	      registerTheme: function registerTheme(name, spec) {
	        var theme = {};
	
	        if (typeof name === 'string') {
	          theme[name] = spec;
	        } else {
	          theme = name;
	        }
	
	        registerAllThemes(theme, this.styles);
	      },
	      applyCurrentTheme: function applyCurrentTheme(themeName) {
	        document.body.classList.remove('md-theme-' + this.currentTheme);
	        document.body.classList.add('md-theme-' + themeName);
	        this.currentTheme = themeName;
	      },
	      setCurrentTheme: function setCurrentTheme(themeName) {
	        if (registeredThemes.indexOf(themeName) >= 0) {
	          this.applyCurrentTheme(themeName);
	        } else {
	          if (registeredThemes.indexOf('default') === -1) {
	            this.registerTheme('default', DEFAULT_THEME_COLORS);
	          } else {
	            console.warn('The theme \'' + themeName + '\' doesn\'t exists. You need to register it first in order to use.');
	          }
	
	          this.applyCurrentTheme('default');
	        }
	      }
	    }
	  });
	
	  Vue.component('md-theme', _MdTheme2.default);
	
	  Vue.prototype.$material = Vue.material;
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
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
/* 73 */
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(75)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/core/components/mdTheme/MdTheme.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7108c965", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7108c965", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] MdTheme.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    mdTag: String,
	    mdName: {
	      type: String,
	      default: 'default'
	    }
	  },
	  data: function data() {
	    return {
	      name: 'md-theme'
	    };
	  },
	  render: function render(_render) {
	    if (this.mdTag || this.$slots.default.length > 1) {
	      return _render(this.mdTag || 'div', {
	        staticClass: 'md-theme'
	      }, this.$slots.default);
	    }
	
	    return this.$slots.default[0];
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	__webpack_require__(77);
	
	__webpack_require__(78);
	
	function install(Vue) {
	  var rippleParentClass = 'md-ink-ripple';
	  var rippleClass = 'md-ripple';
	  var rippleActiveClass = 'md-active';
	  var registeredMouseFunction = void 0;
	  var referenceElement = void 0;
	
	  var unregisterMouseEvent = function unregisterMouseEvent() {
	    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : referenceElement;
	
	    el.removeEventListener('mousedown', registeredMouseFunction);
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
/* 77 */
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(79)
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
/* 79 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME :not(input):not(textarea)::selection {\n  background: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n\n.THEME_NAME a:not(.md-button) {\n  color: ACCENT-COLOR; }\n  .THEME_NAME a:not(.md-button):hover {\n    color: ACCENT-COLOR-800; }\n\nbody.THEME_NAME {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST-0.87; }\n\n/* Typography */\n.THEME_NAME .md-caption,\n.THEME_NAME .md-display-1,\n.THEME_NAME .md-display-2,\n.THEME_NAME .md-display-3,\n.THEME_NAME .md-display-4 {\n  color: BACKGROUND-CONTRAST-0.57; }\n\n.THEME_NAME code:not(.hljs) {\n  background-color: ACCENT-COLOR-A100-0.2;\n  color: ACCENT-COLOR-800; }\n"

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(83)(content, {});
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "/* Common */\n/* Responsive Breakpoints */\n/* Transitions - Based on Angular Material */\n/* Elevation - Based on Angular Material */\n/*  Structure\n   ========================================================================== */\nhtml {\n  height: 100%;\n  box-sizing: border-box; }\n  html *,\n  html *:before,\n  html *:after {\n    box-sizing: inherit; }\n\nbody {\n  min-height: 100%;\n  margin: 0;\n  position: relative;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.87);\n  font-family: Roboto, \"Noto Sans\", Noto, sans-serif; }\n\n[tabindex='-1']:focus {\n  outline: none; }\n\n/*  Fluid Media\n   ========================================================================== */\naudio,\nimg,\nsvg,\nobject,\nembed,\ncanvas,\nvideo,\niframe {\n  max-width: 100%;\n  height: auto;\n  font-style: italic;\n  vertical-align: middle; }\n\n/*  Suppress the focus outline on links that cannot be accessed via keyboard.\n    This prevents an unwanted focus outline from appearing around elements\n    that might still respond to pointer events.\n   ========================================================================== */\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\n.md-scrollbar::-webkit-scrollbar,\n.md-scrollbar ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.12);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  background-color: rgba(0, 0, 0, 0.05); }\n  .md-scrollbar::-webkit-scrollbar:hover,\n  .md-scrollbar ::-webkit-scrollbar:hover {\n    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.038);\n    background-color: rgba(0, 0, 0, 0.087); }\n\n.md-scrollbar::-webkit-scrollbar-button,\n.md-scrollbar ::-webkit-scrollbar-button {\n  display: none; }\n\n.md-scrollbar::-webkit-scrollbar-corner,\n.md-scrollbar ::-webkit-scrollbar-corner {\n  background-color: transparent; }\n\n.md-scrollbar::-webkit-scrollbar-thumb,\n.md-scrollbar ::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.26);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.087);\n  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n\n/*  Text and Titles\n   ========================================================================== */\n.md-caption {\n  font-size: 12px;\n  font-weight: 400;\n  letter-spacing: .02em;\n  line-height: 17px; }\n\n.md-body-1, body {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-subheading {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: .01em;\n  line-height: 24px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: .005em;\n  line-height: 26px; }\n\n.md-headline {\n  font-size: 24px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 32px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 40px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  letter-spacing: 0;\n  line-height: 48px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -.005em;\n  line-height: 58px; }\n\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -.01em;\n  line-height: 112px; }\n\n/*  Links & Buttons\n   ========================================================================== */\na:not(.md-button):not(.md-bottom-bar-item) {\n  text-decoration: none; }\n  a:not(.md-button):not(.md-bottom-bar-item):hover {\n    text-decoration: underline; }\n\nbutton:focus {\n  outline: none; }\n", ""]);
	
	// exports


/***/ },
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdDialog = __webpack_require__(85);
	
	var _mdDialog2 = _interopRequireDefault(_mdDialog);
	
	var _mdDialogTitle = __webpack_require__(90);
	
	var _mdDialogTitle2 = _interopRequireDefault(_mdDialogTitle);
	
	var _mdDialogContent = __webpack_require__(92);
	
	var _mdDialogContent2 = _interopRequireDefault(_mdDialogContent);
	
	var _mdDialogActions = __webpack_require__(94);
	
	var _mdDialogActions2 = _interopRequireDefault(_mdDialogActions);
	
	var _mdDialogAlert = __webpack_require__(96);
	
	var _mdDialogAlert2 = _interopRequireDefault(_mdDialogAlert);
	
	var _mdDialogConfirm = __webpack_require__(99);
	
	var _mdDialogConfirm2 = _interopRequireDefault(_mdDialogConfirm);
	
	var _mdDialogPrompt = __webpack_require__(102);
	
	var _mdDialogPrompt2 = _interopRequireDefault(_mdDialogPrompt);
	
	var _mdDialog3 = __webpack_require__(105);
	
	var _mdDialog4 = _interopRequireDefault(_mdDialog3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-dialog', Vue.extend(_mdDialog2.default));
	  Vue.component('md-dialog-title', Vue.extend(_mdDialogTitle2.default));
	  Vue.component('md-dialog-content', Vue.extend(_mdDialogContent2.default));
	  Vue.component('md-dialog-actions', Vue.extend(_mdDialogActions2.default));
	
	  /* Presets */
	  Vue.component('md-dialog-alert', Vue.extend(_mdDialogAlert2.default));
	  Vue.component('md-dialog-confirm', Vue.extend(_mdDialogConfirm2.default));
	  Vue.component('md-dialog-prompt', Vue.extend(_mdDialogPrompt2.default));
	
	  Vue.material.styles.push(_mdDialog4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(86)
	
	/* script */
	__vue_exports__ = __webpack_require__(87)
	
	/* template */
	var __vue_template__ = __webpack_require__(89)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialog.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-78b956ed", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-78b956ed", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialog.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 86 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _transitionEndEventName = __webpack_require__(88);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
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
	  props: {
	    mdClickOutsideToClose: {
	      type: Boolean,
	      default: true
	    },
	    mdEscToClose: {
	      type: Boolean,
	      default: true
	    },
	    mdBackdrop: {
	      type: Boolean,
	      default: true
	    },
	    mdOpenFrom: String,
	    mdCloseTo: String,
	    mdFullscreen: {
	      type: Boolean,
	      default: false
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      active: false,
	      transitionOff: false,
	      dialogTransform: ''
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-active': this.active
	      };
	    },
	    dialogClasses: function dialogClasses() {
	      return {
	        'md-fullscreen': this.mdFullscreen,
	        'md-transition-off': this.transitionOff,
	        'md-reference': this.mdOpenFrom || this.mdCloseTo
	      };
	    },
	    styles: function styles() {
	      return {
	        transform: this.dialogTransform
	      };
	    }
	  },
	  methods: {
	    removeDialog: function removeDialog() {
	      if (this.rootElement.contains(this.dialogElement)) {
	        this.$el.parentNode.removeChild(this.$el);
	      }
	    },
	    calculateDialogPos: function calculateDialogPos(ref) {
	      var reference = document.querySelector(ref);
	
	      if (reference) {
	        var openFromRect = reference.getBoundingClientRect();
	        var dialogRect = this.dialogInnerElement.getBoundingClientRect();
	        var widthInScale = openFromRect.width / dialogRect.width;
	        var heightInScale = openFromRect.height / dialogRect.height;
	        var distance = {
	          top: -(dialogRect.top - openFromRect.top),
	          left: -(dialogRect.left - openFromRect.left + openFromRect.width)
	        };
	
	        if (openFromRect.top > dialogRect.top + dialogRect.height) {
	          distance.top = openFromRect.top - dialogRect.top;
	        }
	
	        if (openFromRect.left > dialogRect.left + dialogRect.width) {
	          distance.left = openFromRect.left - dialogRect.left - openFromRect.width;
	        }
	
	        this.dialogTransform = 'translate3D(' + distance.left + 'px, ' + distance.top + 'px, 0) scale(' + widthInScale + ', ' + heightInScale + ')';
	      }
	    },
	    open: function open() {
	      var _this = this;
	
	      this.rootElement.appendChild(this.dialogElement);
	      this.transitionOff = true;
	      this.calculateDialogPos(this.mdOpenFrom);
	
	      window.setTimeout(function () {
	        _this.dialogElement.focus();
	        _this.transitionOff = false;
	        _this.active = true;
	      });
	
	      this.$emit('open');
	    },
	    closeOnEsc: function closeOnEsc() {
	      if (this.mdEscToClose) {
	        this.close();
	      }
	    },
	    close: function close() {
	      var _this2 = this;
	
	      if (this.rootElement.contains(this.dialogElement)) {
	        this.$nextTick(function () {
	          var cleanElement = function cleanElement() {
	            var activeRipple = _this2.dialogElement.querySelector('.md-ripple.md-active');
	
	            if (activeRipple) {
	              activeRipple.classList.remove('md-active');
	            }
	
	            _this2.dialogInnerElement.removeEventListener(_transitionEndEventName2.default, cleanElement);
	            _this2.rootElement.removeChild(_this2.dialogElement);
	            _this2.dialogTransform = '';
	          };
	
	          _this2.transitionOff = true;
	          _this2.dialogTransform = '';
	          _this2.calculateDialogPos(_this2.mdCloseTo);
	
	          window.setTimeout(function () {
	            _this2.transitionOff = false;
	            _this2.active = false;
	            _this2.dialogInnerElement.addEventListener(_transitionEndEventName2.default, cleanElement);
	          });
	
	          _this2.$emit('close');
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;
	
	    this.$nextTick(function () {
	      _this3.rootElement = _this3.$root.$el;
	      _this3.dialogElement = _this3.$el;
	      _this3.dialogInnerElement = _this3.$refs.dialog;
	      _this3.removeDialog();
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.removeDialog();
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 88 */
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-dialog-container",
	    class: [_vm.themeClass, _vm.classes],
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        $event.stopPropagation();
	        _vm.closeOnEsc($event)
	      }
	    }
	  }, [_c('div', {
	    ref: "dialog",
	    staticClass: "md-dialog",
	    class: _vm.dialogClasses,
	    style: (_vm.styles)
	  }, [_vm._t("default")], true), _vm._v(" "), (_vm.mdBackdrop) ? _c('md-backdrop', {
	    ref: "backdrop",
	    staticClass: "md-dialog-backdrop",
	    class: _vm.classes,
	    on: {
	      "close": function($event) {
	        _vm.mdClickOutsideToClose && _vm.close()
	      }
	    }
	  }) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-78b956ed", module.exports)
	  }
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(91)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogTitle.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0083d19b", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0083d19b", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogTitle.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-dialog-title md-title"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0083d19b", module.exports)
	  }
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-10712708", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-10712708", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-dialog-content"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-10712708", module.exports)
	  }
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(95)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/mdDialogActions.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6e6a9f00", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6e6a9f00", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogActions.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-dialog-actions"
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6e6a9f00", module.exports)
	  }
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(97)
	
	/* template */
	var __vue_template__ = __webpack_require__(98)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogAlert.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e4165678", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e4165678", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogAlert.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 97 */
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
	
	exports.default = {
	  props: {
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    }
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent() {
	      if (!this.debounce) {
	        this.$emit('close');
	      }
	    },
	    open: function open() {
	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();
	    },
	    close: function close() {
	      this.fireCloseEvent();
	      this.debounce = true;
	      this.$refs.dialog.close();
	    }
	  },
	  mounted: function mounted() {
	    if (!this.mdContent && !this.mdContentHtml) {
	      throw new Error('Missing md-content or md-content-html attributes');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-alert",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent()
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e4165678", module.exports)
	  }
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(100)
	
	/* template */
	var __vue_template__ = __webpack_require__(101)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogConfirm.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-70186c28", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-70186c28", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogConfirm.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 100 */
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
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    },
	    mdCancelText: {
	      type: String,
	      default: 'Cancel'
	    }
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent(type) {
	      if (!this.debounce) {
	        this.$emit('close', type);
	      }
	    },
	    open: function open() {
	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();
	    },
	    close: function close(type) {
	      this.fireCloseEvent(type);
	      this.debounce = true;
	      this.$refs.dialog.close();
	    }
	  },
	  mounted: function mounted() {
	    if (!this.mdContent && !this.mdContentHtml) {
	      throw new Error('Missing md-content or md-content-html attributes');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-confirm",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent('cancel')
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]), _vm._v(" "), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('cancel')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('ok')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-70186c28", module.exports)
	  }
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(103)
	
	/* template */
	var __vue_template__ = __webpack_require__(104)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdDialog/presets/mdDialogPrompt.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-047e25a8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-047e25a8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdDialogPrompt.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 103 */
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
	
	exports.default = {
	  props: {
	    value: {
	      type: [String, Number],
	      required: true
	    },
	    mdTitle: String,
	    mdContent: String,
	    mdContentHtml: String,
	    mdOkText: {
	      type: String,
	      default: 'Ok'
	    },
	    mdCancelText: {
	      type: String,
	      default: 'Cancel'
	    },
	    mdInputId: String,
	    mdInputName: String,
	    mdInputMaxlength: [String, Number],
	    mdInputPlaceholder: String
	  },
	  data: function data() {
	    return {
	      debounce: false
	    };
	  },
	  methods: {
	    fireCloseEvent: function fireCloseEvent(type) {
	      if (!this.debounce) {
	        this.$emit('close', type);
	      }
	    },
	    open: function open() {
	      var _this = this;
	
	      this.$emit('open');
	      this.debounce = false;
	      this.$refs.dialog.open();
	
	      window.setTimeout(function () {
	        _this.$refs.input.$el.focus();
	      });
	    },
	    close: function close(type) {
	      this.fireCloseEvent(type);
	      this.debounce = true;
	      this.$refs.dialog.close();
	    },
	    confirmValue: function confirmValue() {
	      this.$emit('input', this.$refs.input.$el.value);
	      this.close('ok');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-dialog', {
	    ref: "dialog",
	    staticClass: "md-dialog-prompt",
	    on: {
	      "close": function($event) {
	        _vm.fireCloseEvent('cancel')
	      }
	    }
	  }, [(_vm.mdTitle) ? _c('md-dialog-title', [_vm._v(_vm._s(_vm.mdTitle))]) : _vm._e(), _vm._v(" "), (_vm.mdContentHtml) ? _c('md-dialog-content', {
	    domProps: {
	      "innerHTML": _vm._s(_vm.mdContentHtml)
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.mdContent) ? _c('md-dialog-content', [_vm._v(_vm._s(_vm.mdContent))]) : _vm._e(), _vm._v(" "), _c('md-dialog-content', [_c('md-input-container', [_c('md-input', {
	    ref: "input",
	    attrs: {
	      "id": _vm.mdInputId,
	      "name": _vm.mdInputName,
	      "maxlength": _vm.mdInputMaxlength,
	      "placeholder": _vm.mdInputPlaceholder,
	      "value": _vm.value
	    },
	    nativeOn: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.confirmValue($event)
	      }
	    }
	  })])]), _vm._v(" "), _c('md-dialog-actions', [_c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": function($event) {
	        _vm.close('cancel')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.mdCancelText))]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-primary",
	    on: {
	      "click": _vm.confirmValue
	    }
	  }, [_vm._v(_vm._s(_vm.mdOkText))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-047e25a8", module.exports)
	  }
	}

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-dialog-container .md-dialog {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdDivider = __webpack_require__(107);
	
	var _mdDivider2 = _interopRequireDefault(_mdDivider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-divider', Vue.extend(_mdDivider2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(108)
	
	/* template */
	var __vue_template__ = __webpack_require__(109)
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
/* 108 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('hr', {
	    staticClass: "md-divider"
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-30e870da", module.exports)
	  }
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdIcon = __webpack_require__(111);
	
	var _mdIcon2 = _interopRequireDefault(_mdIcon);
	
	var _mdIcon3 = __webpack_require__(115);
	
	var _mdIcon4 = _interopRequireDefault(_mdIcon3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-icon', Vue.extend(_mdIcon2.default));
	
	  Vue.material.styles.push(_mdIcon4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(112)
	
	/* script */
	__vue_exports__ = __webpack_require__(113)
	
	/* template */
	var __vue_template__ = __webpack_require__(114)
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
/* 112 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 113 */
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('i', {
	    staticClass: "md-icon material-icons",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f5836666", module.exports)
	  }
	}

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-icon.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-icon.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-icon.md-warn {\n  color: WARN-COLOR; }\n"

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdInputContainer = __webpack_require__(117);
	
	var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);
	
	var _mdInput = __webpack_require__(122);
	
	var _mdInput2 = _interopRequireDefault(_mdInput);
	
	var _mdTextarea = __webpack_require__(127);
	
	var _mdTextarea2 = _interopRequireDefault(_mdTextarea);
	
	var _mdInputContainer3 = __webpack_require__(131);
	
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(118)
	
	/* script */
	__vue_exports__ = __webpack_require__(119)
	
	/* template */
	var __vue_template__ = __webpack_require__(121)
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
/* 118 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _isArray = __webpack_require__(120);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
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
	
	exports.default = {
	  props: {
	    mdInline: Boolean,
	    mdHasPassword: Boolean
	  },
	  mixins: [_mixin2.default],
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
	};
	module.exports = exports['default'];

/***/ },
/* 120 */
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-input-container",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_vm._t("default"), _vm._v(" "), (_vm.enableCounter) ? _c('span', {
	    staticClass: "md-count"
	  }, [_vm._v(_vm._s(_vm.inputLength) + " / " + _vm._s(_vm.counterLength))]) : _vm._e(), _vm._v(" "), (_vm.mdHasPassword) ? _c('md-button', {
	    staticClass: "md-icon-button md-toggle-password",
	    on: {
	      "click": _vm.togglePasswordType
	    }
	  }, [_c('md-icon', [_vm._v(_vm._s(_vm.showPassword ? 'visibility_off' : 'visibility'))])]) : _vm._e()], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4e747acd", module.exports)
	  }
	}

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(123)
	
	/* template */
	var __vue_template__ = __webpack_require__(126)
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _common = __webpack_require__(124);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
/* 124 */
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
	    value: function value(_value) {
	      this.setParentValue(_value);
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
	    setParentValue: function setParentValue(value) {
	      this.parentContainer.setValue(value || this.$el.value);
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
	      var value = this.$el.value;
	
	      this.setParentValue();
	      this.parentContainer.inputLength = value ? value.length : 0;
	      this.$emit('change', value);
	      this.$emit('input', value);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 125 */
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('input', {
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
	        if (_vm._k($event.keyCode, "up", 38)) { return; }
	        _vm.onInput($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "down", 40)) { return; }
	        _vm.onInput($event)
	      }]
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-53a56078", module.exports)
	  }
	}

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(128)
	
	/* template */
	var __vue_template__ = __webpack_require__(130)
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _autosize = __webpack_require__(129);
	
	var _autosize2 = _interopRequireDefault(_autosize);
	
	var _common = __webpack_require__(124);
	
	var _common2 = _interopRequireDefault(_common);
	
	var _getClosestVueParent = __webpack_require__(125);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_common2.default],
	  watch: {
	    value: function value() {
	      var _this = this;
	
	      this.$nextTick(function () {
	        _autosize2.default.update(_this.$el);
	      });
	    }
	  },
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
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
		Autosize 3.0.20
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
	
		var map = typeof Map === "function" ? new Map() : (function () {
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
				}
			};
		})();
	
		var createEvent = function createEvent(name) {
			return new Event(name, { bubbles: true });
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
			}
	
			function getParentOverflows(el) {
				var arr = [];
	
				while (el && el.parentNode && el.parentNode instanceof Element) {
					if (el.parentNode.scrollTop) {
						arr.push({
							node: el.parentNode,
							scrollTop: el.parentNode.scrollTop
						});
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
	
				var styleHeight = Math.round(parseFloat(ta.style.height));
				var computed = window.getComputedStyle(ta, null);
				var actualHeight = Math.round(parseFloat(computed.height));
	
				// The actual height not matching the style height (set via the resize method) indicates that
				// the max-height has been exceeded, in which case the overflow should be set to visible.
				if (actualHeight !== styleHeight) {
					if (computed.overflowY !== 'visible') {
						changeOverflow('visible');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				} else {
					// Normally keep overflow set to hidden, to avoid flash of scrollbar as the textarea expands.
					if (computed.overflowY !== 'hidden') {
						changeOverflow('hidden');
						resize();
						actualHeight = Math.round(parseFloat(window.getComputedStyle(ta, null).height));
					}
				}
	
				if (cachedHeight !== actualHeight) {
					cachedHeight = actualHeight;
					var evt = createEvent('autosize:resized');
					try {
						ta.dispatchEvent(evt);
					} catch (err) {
						// Firefox will throw an error on dispatchEvent for a detached element
						// https://bugzilla.mozilla.org/show_bug.cgi?id=889376
					}
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
				wordWrap: ta.style.wordWrap
			});
	
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
				update: update
			});
	
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

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('textarea', {
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
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-62d24f30", module.exports)
	  }
	}

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-input-container.md-input-invalid:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-invalid label,\n.THEME_NAME.md-input-container.md-input-invalid .md-error,\n.THEME_NAME.md-input-container.md-input-invalid .md-count,\n.THEME_NAME.md-input-container.md-input-invalid input,\n.THEME_NAME.md-input-container.md-input-invalid textarea {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-inline label {\n  color: rgba(0, 0, 0, 0.54); }\n\n.THEME_NAME.md-input-container.md-input-focused.md-input-required label:after {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused:after {\n  height: 2px;\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-input-container.md-input-focused input,\n.THEME_NAME.md-input-container.md-input-focused textarea {\n  color: PRIMARY-COLOR;\n  text-shadow: 0 0 0 BACKGROUND-CONTRAST;\n  -webkit-text-fill-color: transparent; }\n\n.THEME_NAME.md-input-container.md-input-focused label {\n  color: PRIMARY-COLOR; }\n"

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdLayout = __webpack_require__(133);
	
	var _mdLayout2 = _interopRequireDefault(_mdLayout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-layout', Vue.extend(_mdLayout2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(134)
	
	/* script */
	__vue_exports__ = __webpack_require__(135)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdLayout/mdLayout.vue"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1f1a95a6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1f1a95a6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdLayout.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 134 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	
	exports.default = {
	  props: {
	    mdTag: {
	      type: String,
	      default: 'div'
	    },
	    mdRow: Boolean,
	    mdRowXsmall: Boolean,
	    mdRowSmall: Boolean,
	    mdRowMedium: Boolean,
	    mdRowLarge: Boolean,
	    mdRowXlarge: Boolean,
	    mdColumn: Boolean,
	    mdColumnXsmall: Boolean,
	    mdColumnSmall: Boolean,
	    mdColumnMedium: Boolean,
	    mdColumnLarge: Boolean,
	    mdColumnXlarge: Boolean,
	    mdHideXsmall: Boolean,
	    mdHideSmall: Boolean,
	    mdHideMedium: Boolean,
	    mdHideLarge: Boolean,
	    mdHideXlarge: Boolean,
	    mdGutter: [String, Number, Boolean],
	    mdFlex: [String, Number, Boolean],
	    mdFlexXsmall: [String, Number, Boolean],
	    mdFlexSmall: [String, Number, Boolean],
	    mdFlexMedium: [String, Number, Boolean],
	    mdFlexLarge: [String, Number, Boolean],
	    mdFlexXlarge: [String, Number, Boolean],
	    mdFlexOffset: [String, Number]
	  },
	  computed: {
	    classes: function classes() {
	      var classes = {
	        'md-row': this.mdRow,
	        'md-row-xsmall': this.mdRowXsmall,
	        'md-row-small': this.mdRowSmall,
	        'md-row-medium': this.mdRowMedium,
	        'md-row-large': this.mdRowLarge,
	        'md-row-xlarge': this.mdRowXlarge,
	        'md-column': this.mdColumn,
	        'md-column-xsmall': this.mdColumnXsmall,
	        'md-column-small': this.mdColumnSmall,
	        'md-column-medium': this.mdColumnMedium,
	        'md-column-large': this.mdColumnLarge,
	        'md-column-xlarge': this.mdColumnXlarge,
	        'md-hide-xsmall': this.mdHideXsmall,
	        'md-hide-small': this.mdHideSmall,
	        'md-hide-medium': this.mdHideMedium,
	        'md-hide-large': this.mdHideLarge,
	        'md-hide-xlarge': this.mdHideXlarge
	      };
	
	      if (this.mdGutter) {
	        if (typeof this.mdGutter === 'boolean') {
	          classes['md-gutter'] = true;
	        } else if (this.mdGutter) {
	          classes['md-gutter-' + this.mdGutter] = true;
	        }
	      }
	
	      if (this.mdFlexOffset) {
	        classes['md-flex-offset-' + this.mdFlexOffset] = true;
	      }
	
	      this.generateFlexClasses('', 'mdFlex', classes);
	      this.generateFlexClasses('xsmall', 'mdFlexXsmall', classes);
	      this.generateFlexClasses('small', 'mdFlexSmall', classes);
	      this.generateFlexClasses('medium', 'mdFlexMedium', classes);
	      this.generateFlexClasses('large', 'mdFlexLarge', classes);
	      this.generateFlexClasses('xlarge', 'mdFlexXlarge', classes);
	
	      return classes;
	    }
	  },
	  methods: {
	    generateFlexClasses: function generateFlexClasses(size, name, object) {
	      if (size) {
	        size = '-' + size;
	      }
	
	      if (this[name]) {
	        if (typeof this[name] === 'boolean') {
	          object['md-flex' + size] = true;
	        } else {
	          object['md-flex' + size + '-' + this[name]] = true;
	        }
	      }
	    }
	  },
	  render: function render(createElement) {
	    return createElement(this.mdTag, {
	      staticClass: 'md-layout',
	      class: this.classes
	    }, this.$slots.default);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 136 */
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
/* 137 */
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
/* 138 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 139 */
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
/* 140 */
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
/* 141 */
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
/* 142 */
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
/* 143 */
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
/* 144 */
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
/* 145 */
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
/* 146 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-list {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n  .THEME_NAME.md-list.md-transparent {\n    background-color: transparent;\n    color: inherit; }\n  .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item .router-link-active.md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container {\n    color: PRIMARY-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-primary .md-list-item-container > .md-icon {\n      color: PRIMARY-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container {\n    color: ACCENT-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-accent .md-list-item-container > .md-icon {\n      color: ACCENT-COLOR; }\n  .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container {\n    color: WARN-COLOR; }\n    .THEME_NAME.md-list .md-list-item.md-warn .md-list-item-container > .md-icon {\n      color: WARN-COLOR; }\n  .THEME_NAME.md-list .md-list-item-expand .md-list-item-container {\n    background-color: BACKGROUND-COLOR-A100; }\n    .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:hover, .THEME_NAME.md-list .md-list-item-expand .md-list-item-container:focus {\n      background-color: rgba(153, 153, 153, 0.2); }\n"

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdMenu = __webpack_require__(148);
	
	var _mdMenu2 = _interopRequireDefault(_mdMenu);
	
	var _mdMenuItem = __webpack_require__(153);
	
	var _mdMenuItem2 = _interopRequireDefault(_mdMenuItem);
	
	var _mdMenuContent = __webpack_require__(157);
	
	var _mdMenuContent2 = _interopRequireDefault(_mdMenuContent);
	
	var _mdMenu3 = __webpack_require__(160);
	
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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(149)
	
	/* script */
	__vue_exports__ = __webpack_require__(150)
	
	/* template */
	var __vue_template__ = __webpack_require__(152)
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
/* 149 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(88);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	var _getInViewPosition = __webpack_require__(151);
	
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
	    mdAlignTrigger: {
	      type: Boolean,
	      default: false
	    },
	    mdOffsetX: {
	      type: [Number, String],
	      default: 0
	    },
	    mdOffsetY: {
	      type: [Number, String],
	      default: 0
	    },
	    mdCloseOnSelect: {
	      type: Boolean,
	      default: true
	    }
	  },
	  data: function data() {
	    return {
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
	    },
	    mdAlignTrigger: function mdAlignTrigger(trigger) {
	      this.handleAlignTriggerClass(trigger);
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
	      this.menuContent.classList.remove('md-direction-' + direction.replace(/ /g, '-'));
	    },
	    addNewSizeMenuContentClass: function addNewSizeMenuContentClass(size) {
	      this.menuContent.classList.add('md-size-' + size);
	    },
	    addNewDirectionMenuContentClass: function addNewDirectionMenuContentClass(direction) {
	      this.menuContent.classList.add('md-direction-' + direction.replace(/ /g, '-'));
	    },
	    handleAlignTriggerClass: function handleAlignTriggerClass(trigger) {
	      if (trigger) {
	        this.menuContent.classList.add('md-align-trigger');
	      }
	    },
	    getPosition: function getPosition(vertical, horizontal) {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	
	      var top = vertical === 'top' ? menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight : menuTriggerRect.top;
	
	      var left = horizontal === 'left' ? menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width : menuTriggerRect.left;
	
	      top += parseInt(this.mdOffsetY, 10);
	      left += parseInt(this.mdOffsetX, 10);
	
	      if (this.mdAlignTrigger) {
	        if (vertical === 'top') {
	          top -= menuTriggerRect.height;
	        } else {
	          top += menuTriggerRect.height;
	        }
	      }
	
	      return { top: top, left: left };
	    },
	    calculateMenuContentPos: function calculateMenuContentPos() {
	      var position = void 0;
	
	      if (!this.mdDirection) {
	        position = this.getPosition('bottom', 'right');
	      } else {
	        position = this.getPosition.apply(this, this.mdDirection.trim().split(' '));
	      }
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      this.menuContent.style.top = position.top + window.pageYOffset + 'px';
	      this.menuContent.style.left = position.left + window.pageXOffset + 'px';
	    },
	    recalculateOnResize: function recalculateOnResize() {
	      window.requestAnimationFrame(this.calculateMenuContentPos);
	    },
	    open: function open() {
	      if (this.rootElement.contains(this.menuContent)) {
	        this.rootElement.removeChild(this.menuContent);
	      }
	
	      this.rootElement.appendChild(this.menuContent);
	      this.rootElement.appendChild(this.backdropElement);
	      window.addEventListener('resize', this.recalculateOnResize);
	
	      this.calculateMenuContentPos();
	
	      getComputedStyle(this.menuContent).top;
	      this.menuContent.classList.add('md-active');
	      this.menuContent.focus();
	      this.active = true;
	      this.$emit('open');
	    },
	    close: function close() {
	      var _this = this;
	
	      var close = function close(event) {
	        if (_this.menuContent && event.target === _this.menuContent) {
	          var activeRipple = _this.menuContent.querySelector('.md-ripple.md-active');
	
	          _this.menuContent.removeEventListener(_transitionEndEventName2.default, close);
	          _this.menuTrigger.focus();
	          _this.active = false;
	
	          if (activeRipple) {
	            activeRipple.classList.remove('md-active');
	          }
	
	          _this.rootElement.removeChild(_this.menuContent);
	          _this.rootElement.removeChild(_this.backdropElement);
	          window.removeEventListener('resize', _this.recalculateOnResize);
	        }
	      };
	
	      this.menuContent.addEventListener(_transitionEndEventName2.default, close);
	      this.menuContent.classList.remove('md-active');
	      this.$emit('close');
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
	    var _this2 = this;
	
	    this.$nextTick(function () {
	      _this2.rootElement = _this2.$root.$el;
	      _this2.menuTrigger = _this2.$el.querySelector('[md-menu-trigger]');
	      _this2.menuContent = _this2.$el.querySelector('.md-menu-content');
	      _this2.backdropElement = _this2.$refs.backdrop.$el;
	      _this2.validateMenu();
	      _this2.handleAlignTriggerClass(_this2.mdAlignTrigger);
	      _this2.addNewSizeMenuContentClass(_this2.mdSize);
	      _this2.addNewDirectionMenuContentClass(_this2.mdDirection);
	      _this2.$el.removeChild(_this2.$refs.backdrop.$el);
	      _this2.menuContent.parentNode.removeChild(_this2.menuContent);
	      _this2.menuTrigger.addEventListener('click', _this2.toggle);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.rootElement.contains(this.menuContent)) {
	      this.rootElement.removeChild(this.menuContent);
	      this.rootElement.removeChild(this.backdropElement);
	    }
	
	    this.menuTrigger.removeEventListener('click', this.toggle);
	    window.removeEventListener('resize', this.recalculateOnResize);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 151 */
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
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-menu"
	  }, [_vm._t("default"), _vm._v(" "), _c('md-backdrop', {
	    ref: "backdrop",
	    staticClass: "md-menu-backdrop md-transparent md-active",
	    on: {
	      "close": _vm.close
	    }
	  })], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-008203e6", module.exports)
	  }
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(154)
	
	/* template */
	var __vue_template__ = __webpack_require__(156)
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(125);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	__webpack_require__(155);
	
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
	    close: function close($event) {
	      if (!this.disabled) {
	        if (this.parentMenu.mdCloseOnSelect) {
	          this.parentContent.close();
	        }
	
	        this.$emit('click');
	        this.$emit('selected', $event);
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
/* 155 */
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
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-list-item', {
	    staticClass: "md-menu-item",
	    class: _vm.classes,
	    attrs: {
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5cf45940", module.exports)
	  }
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(158)
	
	/* template */
	var __vue_template__ = __webpack_require__(159)
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  data: function data() {
	    return {
	      oldHighlight: false,
	      highlighted: false,
	      itemsAmount: 0
	    };
	  },
	
	  mixins: [_mixin2.default],
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

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-menu-content",
	    class: [_vm.themeClass],
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "tab", 9)) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "up", 38)) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('up')
	      }, function($event) {
	        if (_vm._k($event.keyCode, "down", 40)) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('down')
	      }, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "space", 32)) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }]
	    }
	  }, [_c('md-list', [_vm._t("default")], true)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-518d815c", module.exports)
	  }
	}

/***/ },
/* 160 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-menu-content {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n  .THEME_NAME.md-menu-content .md-menu-item:hover .md-button:not([disabled]), .THEME_NAME.md-menu-content .md-menu-item:focus .md-button:not([disabled]), .THEME_NAME.md-menu-content .md-menu-item.md-highlighted .md-button:not([disabled]) {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-menu-content .md-menu-item[disabled] {\n    color: BACKGROUND-CONTRAST-0.38; }\n"

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdRadio = __webpack_require__(162);
	
	var _mdRadio2 = _interopRequireDefault(_mdRadio);
	
	var _mdRadio3 = __webpack_require__(166);
	
	var _mdRadio4 = _interopRequireDefault(_mdRadio3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-radio', Vue.extend(_mdRadio2.default));
	
	  Vue.material.styles.push(_mdRadio4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(163)
	
	/* script */
	__vue_exports__ = __webpack_require__(164)
	
	/* template */
	var __vue_template__ = __webpack_require__(165)
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
/* 163 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    name: String,
	    id: String,
	    value: [String, Boolean, Number],
	    mdValue: {
	      type: [String, Boolean, Number],
	      required: true
	    },
	    disabled: Boolean
	  },
	  mixins: [_mixin2.default],
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
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-radio",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('div', {
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
	  }, [_c('input', {
	    attrs: {
	      "type": "radio",
	      "name": _vm.name,
	      "id": _vm.id,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.value
	    }
	  })]), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
	    staticClass: "md-radio-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")], true) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e87254d2", module.exports)
	  }
	}

/***/ },
/* 166 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSelect = __webpack_require__(168);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdOption = __webpack_require__(172);
	
	var _mdOption2 = _interopRequireDefault(_mdOption);
	
	var _mdSelect3 = __webpack_require__(175);
	
	var _mdSelect4 = _interopRequireDefault(_mdSelect3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-select', Vue.extend(_mdSelect2.default));
	  Vue.component('md-option', Vue.extend(_mdOption2.default));
	
	  Vue.material.styles.push(_mdSelect4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(169)
	
	/* script */
	__vue_exports__ = __webpack_require__(170)
	
	/* template */
	var __vue_template__ = __webpack_require__(171)
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
/* 169 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 170 */
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
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _getClosestVueParent = __webpack_require__(125);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	var _isArray = __webpack_require__(120);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    name: String,
	    id: String,
	    required: Boolean,
	    multiple: Boolean,
	    value: [String, Number, Array],
	    disabled: Boolean,
	    placeholder: String,
	    mdMenuClass: String
	  },
	  mixins: [_mixin2.default],
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
	      this.setTextAndValue(_value);
	    },
	    disabled: function disabled() {
	      this.setParentDisabled();
	    },
	    required: function required() {
	      this.setParentRequired();
	    },
	    placeholder: function placeholder() {
	      this.setParentPlaceholder();
	    }
	  },
	  methods: {
	    setParentDisabled: function setParentDisabled() {
	      this.parentContainer.isDisabled = this.disabled;
	    },
	    setParentRequired: function setParentRequired() {
	      this.parentContainer.isRequired = this.required;
	    },
	    setParentPlaceholder: function setParentPlaceholder() {
	      this.parentContainer.hasPlaceholder = !!this.placeholder;
	    },
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
	    setTextAndValue: function setTextAndValue(modelValue) {
	      var output = this.multiple ? this.getMultipleValue(modelValue) : this.getSingleValue(modelValue);
	
	      this.selectedValue = output.value;
	      this.selectedText = output.text;
	
	      if (this.selectedText && this.parentContainer) {
	        this.parentContainer.setValue(this.selectedText);
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
	      this.setTextAndValue(value);
	      this.changeValue(value);
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    if (this.parentContainer) {
	      this.setParentDisabled();
	      this.setParentRequired();
	      this.setParentPlaceholder();
	      this.parentContainer.hasSelect = true;
	    }
	
	    this.setTextAndValue(this.value);
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-select",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('md-menu', {
	    attrs: {
	      "md-close-on-select": !_vm.multiple
	    }
	  }, [_c('span', {
	    ref: "value",
	    staticClass: "md-select-value",
	    attrs: {
	      "md-menu-trigger": ""
	    }
	  }, [_vm._v(_vm._s(_vm.selectedText || _vm.multipleText || _vm.placeholder))]), _vm._v(" "), _c('md-menu-content', {
	    staticClass: "md-select-content",
	    class: [_vm.themeClass, _vm.contentClasses]
	  }, [_vm._t("default")], true)]), _vm._v(" "), _c('select', {
	    attrs: {
	      "name": _vm.name,
	      "id": _vm.id,
	      "required": _vm.required,
	      "disabled": _vm.disabled,
	      "tabindex": "-1"
	    }
	  }, [_c('option', {
	    domProps: {
	      "value": _vm.value
	    }
	  }, [_vm._v(_vm._s(_vm.value))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1cdcfd26", module.exports)
	  }
	}

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(173)
	
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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
	    setParentOption: function setParentOption() {
	      if (!this.parentSelect.multiple) {
	        this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
	      } else {
	        this.check = !this.check;
	      }
	    },
	    selectOption: function selectOption($event) {
	      this.setParentOption();
	      this.$emit('selected', $event);
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
	
	    if (this.parentSelect.value === this.value) {
	      this.setParentOption();
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.parentSelect) {
	      delete this.parentSelect.options[this.index];
	      delete this.parentSelect.multipleOptions[this.index];
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
	//

	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-menu-item', {
	    staticClass: "md-option",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.selectOption
	    }
	  }, [(_vm.parentSelect.multiple) ? _c('md-checkbox', {
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
	  }, [_c('span', {
	    ref: "item"
	  }, [_vm._t("default")], true)]) : _c('span', {
	    ref: "item"
	  }, [_vm._t("default")], true), _vm._v(" ")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b3b71f34", module.exports)
	  }
	}

/***/ },
/* 175 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.54; }\n\n.THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.38; }\n\n.THEME_NAME.md-select-content .md-menu-item.md-selected, .THEME_NAME.md-select-content .md-menu-item.md-checked {\n  color: PRIMARY-COLOR; }\n"

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSidenav = __webpack_require__(177);
	
	var _mdSidenav2 = _interopRequireDefault(_mdSidenav);
	
	var _mdSidenav3 = __webpack_require__(181);
	
	var _mdSidenav4 = _interopRequireDefault(_mdSidenav3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-sidenav', Vue.extend(_mdSidenav2.default));
	
	  Vue.material.styles.push(_mdSidenav4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(178)
	
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
/* 178 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  data: function data() {
	    return {
	      mdVisible: false
	    };
	  },
	
	  mixins: [_mixin2.default],
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

	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-sidenav",
	    class: [_vm.themeClass, _vm.classes],
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.close($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "md-sidenav-content"
	  }, [_vm._t("default")], true), _vm._v(" "), _c('md-backdrop', {
	    staticClass: "md-sidenav-backdrop",
	    on: {
	      "close": _vm.close
	    }
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4904390e", module.exports)
	  }
	}

/***/ },
/* 181 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-sidenav .md-sidenav-content {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSpinner = __webpack_require__(183);
	
	var _mdSpinner2 = _interopRequireDefault(_mdSpinner);
	
	var _mdSpinner3 = __webpack_require__(187);
	
	var _mdSpinner4 = _interopRequireDefault(_mdSpinner3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-spinner', Vue.extend(_mdSpinner2.default));
	
	  Vue.material.styles.push(_mdSpinner4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(184)
	
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSpinner/mdSpinner.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7e174593", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7e174593", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSpinner.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 184 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    mdSize: {
	      type: Number,
	      default: 50
	    },
	    mdStroke: {
	      type: Number,
	      default: 3.5
	    },
	    mdIndeterminate: Boolean,
	    mdProgress: {
	      type: Number,
	      default: 0
	    }
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    classes: function classes() {
	      return {
	        'md-indeterminate': this.mdIndeterminate
	      };
	    },
	    styles: function styles() {
	      var newSize = this.mdSize + 'px';
	
	      return {
	        width: newSize,
	        height: newSize
	      };
	    },
	    dashProgress: function dashProgress() {
	      var progress = this.mdProgress * 125 / 100;
	
	      if (this.mdIndeterminate) {
	        return false;
	      }
	
	      if (progress >= 125) {
	        progress = 130;
	      }
	
	      return progress + ', 200';
	    }
	  },
	  data: function data() {
	    return {};
	  },
	  methods: {}
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

	module.exports = exports['default'];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('transition', {
	    attrs: {
	      "name": "md-spinner",
	      "appear": ""
	    }
	  }, [_c('div', {
	    staticClass: "md-spinner",
	    class: [_vm.themeClass, _vm.classes],
	    style: (_vm.styles)
	  }, [_c('svg', {
	    staticClass: "md-spinner-draw",
	    attrs: {
	      "viewBox": "25 25 50 50"
	    }
	  }, [_c('circle', {
	    staticClass: "md-spinner-path",
	    attrs: {
	      "cx": "50",
	      "cy": "50",
	      "r": "20",
	      "stroke-width": _vm.mdStroke,
	      "stroke-dasharray": _vm.dashProgress
	    }
	  })])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7e174593", module.exports)
	  }
	}

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-spinner .md-spinner-path {\n  stroke: PRIMARY-COLOR; }\n\n.THEME_NAME.md-spinner.md-accent .md-spinner-path {\n  stroke: ACCENT-COLOR; }\n\n.THEME_NAME.md-spinner.md-warn .md-spinner-path {\n  stroke: WARN-COLOR; }\n"

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSubheader = __webpack_require__(189);
	
	var _mdSubheader2 = _interopRequireDefault(_mdSubheader);
	
	var _mdSubheader3 = __webpack_require__(193);
	
	var _mdSubheader4 = _interopRequireDefault(_mdSubheader3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-subheader', Vue.extend(_mdSubheader2.default));
	
	  Vue.material.styles.push(_mdSubheader4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(190)
	
	/* script */
	__vue_exports__ = __webpack_require__(191)
	
	/* template */
	var __vue_template__ = __webpack_require__(192)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
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
/* 190 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 191 */
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
	//
	//
	//
	//

	module.exports = exports['default'];

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return (_vm.$parent.$options._componentTag === 'md-list') ? _c('li', {
	    staticClass: "md-subheader",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true) : _c('div', {
	    staticClass: "md-subheader",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-a2e7fe8a", module.exports)
	  }
	}

/***/ },
/* 193 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-subheader.md-primary {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-subheader.md-accent {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-subheader.md-warn {\n  color: WARN-COLOR; }\n"

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSwitch = __webpack_require__(195);
	
	var _mdSwitch2 = _interopRequireDefault(_mdSwitch);
	
	var _mdSwitch3 = __webpack_require__(198);
	
	var _mdSwitch4 = _interopRequireDefault(_mdSwitch3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-switch', Vue.extend(_mdSwitch2.default));
	
	  Vue.material.styles.push(_mdSwitch4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(196)
	
	/* script */
	__vue_exports__ = __webpack_require__(197)
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
/* 196 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
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
	
	var initialPosition = '-1px';
	
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
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      leftPos: initialPosition,
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
	      this.checked = checked;
	      this.$emit('change', this.checked, $event);
	      this.$emit('input', this.checked, $event);
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

/***/ },
/* 198 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-switch.md-checked .md-switch-container {\n  background-color: ACCENT-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked .md-switch-thumb {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-container {\n  background-color: PRIMARY-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-thumb {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-container {\n  background-color: WARN-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-thumb {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-container, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-container {\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-thumb, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-thumb {\n  background-color: #bdbdbd; }\n"

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTable = __webpack_require__(200);
	
	var _mdTable2 = _interopRequireDefault(_mdTable);
	
	var _mdTableRow = __webpack_require__(204);
	
	var _mdTableRow2 = _interopRequireDefault(_mdTableRow);
	
	var _mdTableHead = __webpack_require__(207);
	
	var _mdTableHead2 = _interopRequireDefault(_mdTableHead);
	
	var _mdTableCell = __webpack_require__(210);
	
	var _mdTableCell2 = _interopRequireDefault(_mdTableCell);
	
	var _mdTableEdit = __webpack_require__(213);
	
	var _mdTableEdit2 = _interopRequireDefault(_mdTableEdit);
	
	var _mdTableCard = __webpack_require__(216);
	
	var _mdTableCard2 = _interopRequireDefault(_mdTableCard);
	
	var _mdTableAlternateHeader = __webpack_require__(219);
	
	var _mdTableAlternateHeader2 = _interopRequireDefault(_mdTableAlternateHeader);
	
	var _mdTablePagination = __webpack_require__(222);
	
	var _mdTablePagination2 = _interopRequireDefault(_mdTablePagination);
	
	var _mdTable3 = __webpack_require__(225);
	
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(201)
	
	/* script */
	__vue_exports__ = __webpack_require__(202)
	
	/* template */
	var __vue_template__ = __webpack_require__(203)
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
/* 201 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
	
	exports.default = {
	  props: {
	    mdSortType: String,
	    mdSort: String
	  },
	  mixins: [_mixin2.default],
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
	};
	module.exports = exports['default'];

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-table",
	    class: [_vm.themeClass]
	  }, [_c('table', [_vm._t("default")], true)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-dda64186", module.exports)
	  }
	}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(205)
	
	/* template */
	var __vue_template__ = __webpack_require__(206)
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
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
	  watch: {
	    mdItem: function mdItem(newValue, oldValue) {
	      this.parentTable.data[this.index] = this.mdItem;
	      this.handleMultipleSelection(newValue === oldValue);
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
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('tr', {
	    staticClass: "md-table-row",
	    class: _vm.classes,
	    on: {
	      "click": _vm.autoSelect
	    }
	  }, [(_vm.hasSelection) ? _c('md-table-cell', {
	    staticClass: "md-table-selection"
	  }, [_c('md-checkbox', {
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
	  })]) : _vm._e(), _vm._v(" "), _vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-cd7c46e6", module.exports)
	  }
	}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(208)
	
	/* template */
	var __vue_template__ = __webpack_require__(209)
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
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('th', {
	    staticClass: "md-table-head",
	    class: _vm.classes,
	    on: {
	      "click": _vm.changeSort
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "md-ink-ripple",
	      rawName: "v-md-ink-ripple",
	      value: (!_vm.mdSortBy),
	      expression: "!mdSortBy"
	    }],
	    staticClass: "md-table-head-container"
	  }, [_c('div', {
	    staticClass: "md-table-head-text md-test"
	  }, [(_vm.mdSortBy) ? _c('md-icon', {
	    staticClass: "md-sortable-icon"
	  }, [_vm._v("arrow_downward")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), (_vm.mdTooltip) ? _c('md-tooltip', [_vm._v(_vm._s(_vm.mdTooltip))]) : _vm._e()], true)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4c7d46bd", module.exports)
	  }
	}

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
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
/* 211 */
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
	  data: function data() {
	    return {
	      hasAction: false
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-numeric': this.mdNumeric,
	        'md-has-action': this.hasAction
	      };
	    }
	  },
	  mounted: function mounted() {
	    if (this.$children.length > 0) {
	      this.hasAction = true;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('td', {
	    staticClass: "md-table-cell",
	    class: _vm.classes
	  }, [_c('div', {
	    staticClass: "md-table-cell-container"
	  }, [_vm._t("default")], true)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-584d713f", module.exports)
	  }
	}

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(214)
	
	/* template */
	var __vue_template__ = __webpack_require__(215)
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
/* 214 */
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
	    value: [String, Number],
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
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-table-edit",
	    on: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return; }
	        _vm.closeDialog($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "md-table-edit-trigger",
	    class: _vm.triggerClasses,
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.openDialog($event)
	      }
	    }
	  }, [_vm._v("\n    " + _vm._s(_vm.value || _vm.mdPlaceholder) + "\n  ")]), _vm._v(" "), _c('div', {
	    ref: "dialog",
	    staticClass: "md-table-dialog",
	    class: _vm.dialogClasses
	  }, [_c('md-input-container', [_c('md-input', {
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
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.confirmDialog($event)
	      }
	    }
	  })])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-23087c32", module.exports)
	  }
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(217)
	
	/* template */
	var __vue_template__ = __webpack_require__(218)
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
/* 217 */
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

	module.exports = exports['default'];

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-card', {
	    staticClass: "md-table-card",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e2fe4826", module.exports)
	  }
	}

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(220)
	
	/* template */
	var __vue_template__ = __webpack_require__(221)
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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
	
	exports.default = {
	  props: {
	    mdSelectedLabel: {
	      type: String,
	      default: 'selected'
	    }
	  },
	  mixins: [_mixin2.default],
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
	};
	module.exports = exports['default'];

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-table-alternate-header",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('md-toolbar', [_c('div', {
	    staticClass: "md-counter"
	  }, [_c('span', {
	    ref: "counter"
	  }, [_vm._v(_vm._s(_vm.tableInstance.numberOfSelected))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.mdSelectedLabel))])]), _vm._v(" "), _vm._t("default")], true)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1ea3ef5a", module.exports)
	  }
	}

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(223)
	
	/* template */
	var __vue_template__ = __webpack_require__(224)
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
/* 223 */
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
	      subTotal: 0,
	      currentSize: parseInt(this.mdSize, 10),
	      currentPage: parseInt(this.mdPage, 10),
	      totalItems: isNaN(this.mdTotal) ? Number.MAX_SAFE_INTEGER : parseInt(this.mdTotal, 10)
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
	        var sub = this.currentPage * this.currentSize;
	
	        this.subTotal = sub > this.mdTotal ? this.mdTotal : sub;
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
	    previousPage: function previousPage() {
	      if (this.canFireEvents) {
	        this.currentPage--;
	        this.$emit('page', this.currentPage);
	        this.emitPaginationEvent();
	      }
	    },
	    nextPage: function nextPage() {
	      if (this.canFireEvents) {
	        this.currentPage++;
	        this.$emit('page', this.currentPage);
	        this.emitPaginationEvent();
	      }
	    }
	  },
	  mounted: function mounted() {
	    var _this = this;
	
	    this.$nextTick(function () {
	      _this.subTotal = _this.currentPage * _this.currentSize;
	      _this.mdPageOptions = _this.mdPageOptions || [10, 25, 50, 100];
	      _this.currentSize = _this.mdPageOptions[0];
	      _this.canFireEvents = true;
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-table-pagination"
	  }, [_c('span', {
	    staticClass: "md-table-pagination-label"
	  }, [_vm._v(_vm._s(_vm.mdLabel) + ":")]), _vm._v(" "), (_vm.mdPageOptions) ? _c('md-select', {
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
	  }, _vm._l((_vm.mdPageOptions), function(amount) {
	    return _c('md-option', {
	      attrs: {
	        "value": amount
	      }
	    }, [_vm._v(_vm._s(amount))])
	  })) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(((_vm.currentPage - 1) * _vm.currentSize) + 1) + "-" + _vm._s(_vm.subTotal) + " " + _vm._s(_vm.mdSeparator) + " " + _vm._s(_vm.mdTotal))]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-icon-button md-table-pagination-previous",
	    attrs: {
	      "disabled": _vm.currentPage === 1
	    },
	    on: {
	      "click": _vm.previousPage
	    }
	  }, [_c('md-icon', [_vm._v("keyboard_arrow_left")])]), _vm._v(" "), _c('md-button', {
	    staticClass: "md-icon-button md-table-pagination-next",
	    attrs: {
	      "disabled": _vm.currentSize * _vm.currentPage >= _vm.totalItems
	    },
	    on: {
	      "click": _vm.nextPage
	    }
	  }, [_c('md-icon', [_vm._v("keyboard_arrow_right")])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7f188892", module.exports)
	  }
	}

/***/ },
/* 225 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-table-card .md-toolbar {\n  background-color: BACKGROUND-COLOR-A100;\n  color: BACKGROUND-CONTRAST-A100; }\n\n.THEME_NAME.md-table-alternate-header {\n  background-color: BACKGROUND-COLOR-A100; }\n  .THEME_NAME.md-table-alternate-header .md-toolbar {\n    background-color: ACCENT-COLOR-A100-0.2;\n    color: ACCENT-CONTRAST-A100; }\n  .THEME_NAME.md-table-alternate-header .md-counter {\n    color: ACCENT-COLOR; }\n"

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTabs = __webpack_require__(227);
	
	var _mdTabs2 = _interopRequireDefault(_mdTabs);
	
	var _mdTab = __webpack_require__(231);
	
	var _mdTab2 = _interopRequireDefault(_mdTab);
	
	var _mdTabs3 = __webpack_require__(235);
	
	var _mdTabs4 = _interopRequireDefault(_mdTabs3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tabs', Vue.extend(_mdTabs2.default));
	  Vue.component('md-tab', Vue.extend(_mdTab2.default));
	
	  Vue.material.styles.push(_mdTabs4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(228)
	
	/* script */
	__vue_exports__ = __webpack_require__(229)
	
	/* template */
	var __vue_template__ = __webpack_require__(230)
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
/* 228 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	  mixins: [_mixin2.default],
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
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
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
	  }, [_vm._l((_vm.tabList), function(header) {
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
	    }, [(header.icon) ? _c('md-icon', [_vm._v(_vm._s(header.icon))]) : _vm._e(), _vm._v(" "), (header.label) ? _c('span', [_vm._v(_vm._s(header.label))]) : _vm._e(), _vm._v(" "), (header.tooltip) ? _c('md-tooltip', {
	      attrs: {
	        "md-direction": header.tooltipDirection,
	        "md-delay": header.tooltipDelay
	      }
	    }, [_vm._v(_vm._s(header.tooltip))]) : _vm._e()])])
	  }), _vm._v(" "), _c('span', {
	    ref: "indicator",
	    staticClass: "md-tab-indicator",
	    class: _vm.indicatorClasses
	  })], true), _vm._v(" "), _c('div', {
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
	  }, [_vm._t("default")], true)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c28dc5a6", module.exports)
	  }
	}

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(232)
	
	/* template */
	var __vue_template__ = __webpack_require__(234)
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
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _uniqueId = __webpack_require__(233);
	
	var _uniqueId2 = _interopRequireDefault(_uniqueId);
	
	var _getClosestVueParent = __webpack_require__(125);
	
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
	    mdDisabled: Boolean,
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
/* 233 */
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
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-tab",
	    style: (_vm.styles),
	    attrs: {
	      "id": _vm.tabId
	    }
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8aa44a94", module.exports)
	  }
	}

/***/ },
/* 235 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-tabs > .md-tabs-navigation {\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header {\n    color: PRIMARY-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-CONTRAST; }\n    .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: PRIMARY-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs > .md-tabs-navigation .md-tab-indicator {\n    background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation {\n  background-color: transparent;\n  border-bottom: 1px solid BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header {\n    color: BACKGROUND-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header:focus {\n      color: PRIMARY-COLOR; }\n    .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: BACKGROUND-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-transparent > .md-tabs-navigation .md-tab-indicator {\n    background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-tabs.md-accent > .md-tabs-navigation {\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header {\n    color: ACCENT-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header:focus {\n      color: ACCENT-CONTRAST; }\n    .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: ACCENT-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-accent > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n\n.THEME_NAME.md-tabs.md-warn > .md-tabs-navigation {\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header {\n    color: WARN-CONTRAST-0.54; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-active, .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header:focus {\n      color: WARN-CONTRAST; }\n    .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-header.md-disabled {\n      color: WARN-CONTRAST-0.26; }\n  .THEME_NAME.md-tabs.md-warn > .md-tabs-navigation .md-tab-indicator {\n    background-color: BACKGROUND-COLOR; }\n"

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdToolbar = __webpack_require__(237);
	
	var _mdToolbar2 = _interopRequireDefault(_mdToolbar);
	
	var _mdToolbar3 = __webpack_require__(241);
	
	var _mdToolbar4 = _interopRequireDefault(_mdToolbar3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-toolbar', Vue.extend(_mdToolbar2.default));
	
	  Vue.material.styles.push(_mdToolbar4.default);
	}
	module.exports = exports['default'];

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(238)
	
	/* script */
	__vue_exports__ = __webpack_require__(239)
	
	/* template */
	var __vue_template__ = __webpack_require__(240)
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
/* 238 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 239 */
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
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-toolbar",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-668063d7", module.exports)
	  }
	}

/***/ },
/* 241 */
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-toolbar {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-accent {\n    background-color: ACCENT-COLOR;\n    color: ACCENT-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-warn {\n    background-color: WARN-COLOR;\n    color: WARN-CONTRAST; }\n  .THEME_NAME.md-toolbar.md-transparent {\n    background-color: transparent;\n    color: BACKGROUND-CONTRAST; }\n"

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTooltip = __webpack_require__(243);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tooltip', Vue.extend(_mdTooltip2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(244)
	
	/* script */
	__vue_exports__ = __webpack_require__(245)
	
	/* template */
	var __vue_template__ = __webpack_require__(246)
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
/* 244 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(88);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
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
	      parentClass: null,
	      transitionOff: false,
	      topPosition: false,
	      leftPosition: false
	    };
	  },
	  computed: {
	    classes: function classes() {
	      var cssClasses = {
	        'md-active': this.active,
	        'md-transition-off': this.transitionOff,
	        'md-tooltip-top': this.mdDirection === 'top',
	        'md-tooltip-right': this.mdDirection === 'right',
	        'md-tooltip-bottom': this.mdDirection === 'bottom',
	        'md-tooltip-left': this.mdDirection === 'left'
	      };
	
	      if (this.parentClass) {
	        cssClasses[this.parentClass] = true;
	      }
	
	      return cssClasses;
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
	    removeTooltips: function removeTooltips() {
	      var tooltips = [].concat(_toConsumableArray(this.rootElement.querySelectorAll('.md-tooltip')));
	
	      tooltips.forEach(function (tooltip) {
	        if (tooltip.parentNode) {
	          tooltip.parentNode.removeChild(tooltip);
	        }
	      });
	
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
	    },
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
	
	      this.topPosition = cssPosition.top;
	      this.leftPosition = cssPosition.left;
	    },
	    generateTooltipClasses: function generateTooltipClasses() {
	      var classes = [];
	
	      [].concat(_toConsumableArray(this.parentElement.classList)).forEach(function (cssClass) {
	        if (cssClass.indexOf('md-') >= 0 && cssClass !== 'md-active') {
	          classes.push(cssClass + '-tooltip');
	        }
	      });
	
	      this.parentClass = classes.join(' ');
	    },
	    open: function open() {
	      var _this = this;
	
	      this.removeTooltips();
	
	      this.$nextTick(function () {
	        _this.rootElement.appendChild(_this.tooltipElement);
	        getComputedStyle(_this.tooltipElement).top;
	        _this.transitionOff = true;
	        _this.generateTooltipClasses();
	        _this.calculateTooltipPosition();
	
	        window.setTimeout(function () {
	          _this.transitionOff = false;
	          _this.active = true;
	        }, 10);
	      });
	    },
	    close: function close() {
	      this.active = false;
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
	      this.tooltipElement.addEventListener(_transitionEndEventName2.default, this.removeTooltips);
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;
	
	    this.$nextTick(function () {
	      _this2.tooltipElement = _this2.$el;
	      _this2.parentElement = _this2.tooltipElement.parentNode;
	      _this2.rootElement = _this2.$root.$el;
	
	      _this2.$el.parentNode.removeChild(_this2.$el);
	
	      _this2.parentElement.addEventListener('mouseenter', _this2.open);
	      _this2.parentElement.addEventListener('focus', _this2.open);
	      _this2.parentElement.addEventListener('mouseleave', _this2.close);
	      _this2.parentElement.addEventListener('blur', _this2.close);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.active = false;
	
	    this.removeTooltips();
	
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
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('span', {
	    staticClass: "md-tooltip",
	    class: _vm.classes,
	    style: (_vm.style)
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3104dae7", module.exports)
	  }
	}

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdWhiteframe = __webpack_require__(248);
	
	var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-whiteframe', Vue.extend(_mdWhiteframe2.default));
	}
	module.exports = exports['default'];

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(249)
	
	/* script */
	__vue_exports__ = __webpack_require__(250)
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
/* 249 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 250 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	
	exports.default = {
	  props: {
	    mdElevation: {
	      type: [String, Number],
	      default: 1
	    },
	    mdTag: {
	      type: String,
	      default: 'div'
	    }
	  },
	  computed: {
	    classes: function classes() {
	      var numberedElevation = parseInt(this.mdElevation, 10);
	      var elevationClass = 'md-whiteframe-';
	
	      if (!isNaN(numberedElevation) && typeof numberedElevation === 'number') {
	        elevationClass += numberedElevation;
	        elevationClass += 'dp';
	      } else if (this.mdElevation.indexOf('dp') > -1) {
	        elevationClass += this.mdElevation;
	      }
	
	      return elevationClass;
	    }
	  },
	  render: function render(createElement) {
	    return createElement(this.mdTag, {
	      staticClass: 'md-whiteframe',
	      class: this.classes
	    }, this.$slots.default);
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _core = __webpack_require__(70);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _mdAvatar = __webpack_require__(1);
	
	var _mdAvatar2 = _interopRequireDefault(_mdAvatar);
	
	var _mdBackdrop = __webpack_require__(9);
	
	var _mdBackdrop2 = _interopRequireDefault(_mdBackdrop);
	
	var _mdBottomBar = __webpack_require__(14);
	
	var _mdBottomBar2 = _interopRequireDefault(_mdBottomBar);
	
	var _mdButton = __webpack_require__(23);
	
	var _mdButton2 = _interopRequireDefault(_mdButton);
	
	var _mdButtonToggle = __webpack_require__(29);
	
	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);
	
	var _mdCard = __webpack_require__(35);
	
	var _mdCard2 = _interopRequireDefault(_mdCard);
	
	var _mdCheckbox = __webpack_require__(64);
	
	var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);
	
	var _mdDialog = __webpack_require__(84);
	
	var _mdDialog2 = _interopRequireDefault(_mdDialog);
	
	var _mdDivider = __webpack_require__(106);
	
	var _mdDivider2 = _interopRequireDefault(_mdDivider);
	
	var _mdIcon = __webpack_require__(110);
	
	var _mdIcon2 = _interopRequireDefault(_mdIcon);
	
	var _mdInputContainer = __webpack_require__(116);
	
	var _mdInputContainer2 = _interopRequireDefault(_mdInputContainer);
	
	var _mdLayout = __webpack_require__(132);
	
	var _mdLayout2 = _interopRequireDefault(_mdLayout);
	
	var _mdList = __webpack_require__(136);
	
	var _mdList2 = _interopRequireDefault(_mdList);
	
	var _mdMenu = __webpack_require__(147);
	
	var _mdMenu2 = _interopRequireDefault(_mdMenu);
	
	var _mdRadio = __webpack_require__(161);
	
	var _mdRadio2 = _interopRequireDefault(_mdRadio);
	
	var _mdSelect = __webpack_require__(167);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdSidenav = __webpack_require__(176);
	
	var _mdSidenav2 = _interopRequireDefault(_mdSidenav);
	
	var _mdSpinner = __webpack_require__(182);
	
	var _mdSpinner2 = _interopRequireDefault(_mdSpinner);
	
	var _mdSubheader = __webpack_require__(188);
	
	var _mdSubheader2 = _interopRequireDefault(_mdSubheader);
	
	var _mdSwitch = __webpack_require__(194);
	
	var _mdSwitch2 = _interopRequireDefault(_mdSwitch);
	
	var _mdTable = __webpack_require__(199);
	
	var _mdTable2 = _interopRequireDefault(_mdTable);
	
	var _mdTabs = __webpack_require__(226);
	
	var _mdTabs2 = _interopRequireDefault(_mdTabs);
	
	var _mdToolbar = __webpack_require__(236);
	
	var _mdToolbar2 = _interopRequireDefault(_mdToolbar);
	
	var _mdTooltip = __webpack_require__(242);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	var _mdWhiteframe = __webpack_require__(247);
	
	var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var options = {
	  MdCore: _core2.default,
	  MdAvatar: _mdAvatar2.default,
	  MdBackdrop: _mdBackdrop2.default,
	  MdBottomBar: _mdBottomBar2.default,
	  MdButton: _mdButton2.default,
	  MdButtonToggle: _mdButtonToggle2.default,
	  MdCard: _mdCard2.default,
	  MdCheckbox: _mdCheckbox2.default,
	  MdDialog: _mdDialog2.default,
	  MdDivider: _mdDivider2.default,
	  MdIcon: _mdIcon2.default,
	  MdInputContainer: _mdInputContainer2.default,
	  MdLayout: _mdLayout2.default,
	  MdList: _mdList2.default,
	  MdMenu: _mdMenu2.default,
	  MdRadio: _mdRadio2.default,
	  MdSelect: _mdSelect2.default,
	  MdSidenav: _mdSidenav2.default,
	  MdSpinner: _mdSpinner2.default,
	  MdSubheader: _mdSubheader2.default,
	  MdSwitch: _mdSwitch2.default,
	  MdTable: _mdTable2.default,
	  MdTabs: _mdTabs2.default,
	  MdToolbar: _mdToolbar2.default,
	  MdTooltip: _mdTooltip2.default,
	  MdWhiteframe: _mdWhiteframe2.default
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