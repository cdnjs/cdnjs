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

	module.exports = __webpack_require__(95);


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

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdSpinner = __webpack_require__(294);

	var _mdSpinner2 = _interopRequireDefault(_mdSpinner);

	var _mdSpinner3 = __webpack_require__(241);

	var _mdSpinner4 = _interopRequireDefault(_mdSpinner3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-spinner', Vue.extend(_mdSpinner2.default));

	  Vue.material.styles.push(_mdSpinner4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 148:
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

/***/ 211:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 241:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-spinner .md-spinner-path {\n  stroke: PRIMARY-COLOR; }\n\n.THEME_NAME.md-spinner.md-accent .md-spinner-path {\n  stroke: ACCENT-COLOR; }\n\n.THEME_NAME.md-spinner.md-warn .md-spinner-path {\n  stroke: WARN-COLOR; }\n"

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(211)

	/* script */
	__vue_exports__ = __webpack_require__(148)

	/* template */
	var __vue_template__ = __webpack_require__(353)
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

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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

/***/ }

/******/ })
}));
;