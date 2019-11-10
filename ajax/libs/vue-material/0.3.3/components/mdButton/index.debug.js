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

	module.exports = __webpack_require__(15);


/***/ },

/***/ 15:
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

/***/ 16:
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

/***/ 18:
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

/***/ 19:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-button:not([disabled]).md-raised:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button) {\n  color: BACKGROUND-COLOR-900;\n  background-color: BACKGROUND-COLOR-50; }\n  .THEME_NAME .md-button:not([disabled]).md-raised:not(.md-icon-button):hover, .THEME_NAME.md-button:not([disabled]).md-raised:not(.md-icon-button):hover {\n    background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME .md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-raised.md-icon-button:not(.md-raised) {\n  color: BACKGROUND-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-fab, .THEME_NAME.md-button:not([disabled]).md-fab {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME .md-button:not([disabled]).md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-fab:hover {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME .md-button:not([disabled]).md-fab.md-clean, .THEME_NAME.md-button:not([disabled]).md-fab.md-clean {\n    color: BACKGROUND-COLOR-900;\n    background-color: BACKGROUND-COLOR-50; }\n    .THEME_NAME .md-button:not([disabled]).md-fab.md-clean:hover, .THEME_NAME.md-button:not([disabled]).md-fab.md-clean:hover {\n      background-color: BACKGROUND-COLOR-200; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-primary:not(.md-icon-button) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary.md-raised, .THEME_NAME .md-button:not([disabled]).md-primary.md-fab, .THEME_NAME.md-button:not([disabled]).md-primary.md-raised, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab {\n  background-color: PRIMARY-COLOR;\n  color: PRIMARY-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME .md-button:not([disabled]).md-primary.md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-primary.md-fab:hover {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-primary.md-icon-button:not(.md-raised) {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-accent:not(.md-icon-button) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent.md-raised, .THEME_NAME.md-button:not([disabled]).md-accent.md-raised {\n  background-color: ACCENT-COLOR;\n  color: ACCENT-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-accent.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-accent.md-raised:hover {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-accent.md-icon-button:not(.md-raised) {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn:not(.md-icon-button), .THEME_NAME.md-button:not([disabled]).md-warn:not(.md-icon-button) {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn.md-raised, .THEME_NAME .md-button:not([disabled]).md-warn.md-fab, .THEME_NAME.md-button:not([disabled]).md-warn.md-raised, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab {\n  background-color: WARN-COLOR;\n  color: WARN-CONTRAST; }\n  .THEME_NAME .md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME .md-button:not([disabled]).md-warn.md-fab:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-raised:hover, .THEME_NAME.md-button:not([disabled]).md-warn.md-fab:hover {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME .md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised), .THEME_NAME.md-button:not([disabled]).md-warn.md-icon-button:not(.md-raised) {\n  color: WARN-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map