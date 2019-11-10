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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(89);


/***/ },

/***/ 1:
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

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdProgress = __webpack_require__(288);

	var _mdProgress2 = _interopRequireDefault(_mdProgress);

	var _mdProgress3 = __webpack_require__(236);

	var _mdProgress4 = _interopRequireDefault(_mdProgress3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-progress', Vue.extend(_mdProgress2.default));

	  Vue.material.styles.push(_mdProgress4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
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
	      if (!this.mdIndeterminate) {
	        return {
	          width: this.mdProgress + '%'
	        };
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

	module.exports = exports['default'];

/***/ },

/***/ 198:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 236:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-progress {\n  background-color: PRIMARY-COLOR-0.38; }\n  .THEME_NAME.md-progress:not(.md-indeterminate) .md-progress-track {\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-progress .md-progress-track:after, .THEME_NAME.md-progress .md-progress-track:before {\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-progress.md-accent {\n    background-color: ACCENT-COLOR-0.38; }\n    .THEME_NAME.md-progress.md-accent:not(.md-indeterminate) .md-progress-track {\n      background-color: ACCENT-COLOR; }\n    .THEME_NAME.md-progress.md-accent .md-progress-track:after, .THEME_NAME.md-progress.md-accent .md-progress-track:before {\n      background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-progress.md-warn {\n    background-color: WARN-COLOR-0.38; }\n    .THEME_NAME.md-progress.md-warn:not(.md-indeterminate) .md-progress-track {\n      background-color: WARN-COLOR; }\n    .THEME_NAME.md-progress.md-warn .md-progress-track:after, .THEME_NAME.md-progress.md-warn .md-progress-track:before {\n      background-color: WARN-COLOR; }\n"

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(198)

	/* script */
	__vue_exports__ = __webpack_require__(142)

	/* template */
	var __vue_template__ = __webpack_require__(327)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some((function (key) { return key !== "default" && key !== "__esModule" }))) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdProgress/mdProgress.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-28dc46cd", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-28dc46cd", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdProgress.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "md-progress",
	      "appear": ""
	    }
	  }, [_c('div', {
	    staticClass: "md-progress",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('div', {
	    staticClass: "md-progress-track",
	    style: (_vm.styles)
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-28dc46cd", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;