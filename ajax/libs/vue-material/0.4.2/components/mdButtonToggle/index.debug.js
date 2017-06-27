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

	module.exports = __webpack_require__(26);


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdButtonToggle = __webpack_require__(27);
	
	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);
	
	var _mdButtonToggle3 = __webpack_require__(31);
	
	var _mdButtonToggle4 = _interopRequireDefault(_mdButtonToggle3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-button-toggle', Vue.extend(_mdButtonToggle2.default));
	
	  Vue.material.styles.push(_mdButtonToggle4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(28)
	
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
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdButtonToggle/mdButtonToggle.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-47084aa3", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-47084aa3", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdButtonToggle.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 28:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 29:
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
	    mdSingle: Boolean
	  },
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

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-button-group md-button-toggle"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-47084aa3", module.exports)
	  }
	}

/***/ },

/***/ 31:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-button-toggle .md-button:after, .THEME_NAME.md-button-toggle .md-button:after {\n  width: 1px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  content: \" \"; }\n\n.THEME_NAME .md-button-toggle .md-toggle, .THEME_NAME.md-button-toggle .md-toggle {\n  color: BACKGROUND-CONTRAST-600;\n  background-color: BACKGROUND-COLOR-500; }\n  .THEME_NAME .md-button-toggle .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle .md-toggle:hover:not([disabled]) {\n    background-color: BACKGROUND-COLOR-600; }\n  .THEME_NAME .md-button-toggle .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle .md-toggle + .md-toggle:after {\n    background-color: BACKGROUND-COLOR-600; }\n\n.THEME_NAME .md-button-toggle.md-primary .md-toggle, .THEME_NAME.md-button-toggle.md-primary .md-toggle {\n  color: PRIMARY-CONTRAST;\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME .md-button-toggle.md-primary .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-primary .md-toggle:hover:not([disabled]) {\n    background-color: PRIMARY-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-primary .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-primary .md-toggle + .md-toggle:after {\n    background-color: PRIMARY-COLOR-700; }\n\n.THEME_NAME .md-button-toggle.md-accent .md-toggle, .THEME_NAME.md-button-toggle.md-accent .md-toggle {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME .md-button-toggle.md-accent .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-accent .md-toggle:hover:not([disabled]) {\n    background-color: ACCENT-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-accent .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-accent .md-toggle + .md-toggle:after {\n    background-color: ACCENT-COLOR-700; }\n\n.THEME_NAME .md-button-toggle.md-warn .md-toggle, .THEME_NAME.md-button-toggle.md-warn .md-toggle {\n  color: WARN-CONTRAST;\n  background-color: WARN-COLOR; }\n  .THEME_NAME .md-button-toggle.md-warn .md-toggle:hover:not([disabled]), .THEME_NAME.md-button-toggle.md-warn .md-toggle:hover:not([disabled]) {\n    background-color: WARN-COLOR-600; }\n  .THEME_NAME .md-button-toggle.md-warn .md-toggle + .md-toggle:after, .THEME_NAME.md-button-toggle.md-warn .md-toggle + .md-toggle:after {\n    background-color: WARN-COLOR-700; }\n\n.THEME_NAME .md-button-toggle [disabled], .THEME_NAME.md-button-toggle [disabled] {\n  color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME .md-button-toggle [disabled].md-toggle, .THEME_NAME.md-button-toggle [disabled].md-toggle {\n    color: BACKGROUND-CONTRAST-0.2;\n    background-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map