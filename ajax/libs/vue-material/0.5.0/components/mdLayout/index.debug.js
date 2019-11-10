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

	module.exports = __webpack_require__(134);


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdLayout = __webpack_require__(135);
	
	var _mdLayout2 = _interopRequireDefault(_mdLayout);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-layout', Vue.extend(_mdLayout2.default));
	}
	module.exports = exports['default'];

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(136)
	
	/* script */
	__vue_exports__ = __webpack_require__(137)
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

/***/ 136:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 137:
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

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map