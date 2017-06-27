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

	module.exports = __webpack_require__(102);


/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdWhiteframe = __webpack_require__(309);

	var _mdWhiteframe2 = _interopRequireDefault(_mdWhiteframe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-whiteframe', Vue.extend(_mdWhiteframe2.default));
	}
	module.exports = exports['default'];

/***/ },

/***/ 163:
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

/***/ 192:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(192)

	/* script */
	__vue_exports__ = __webpack_require__(163)
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


/***/ }

/******/ })
}));
;