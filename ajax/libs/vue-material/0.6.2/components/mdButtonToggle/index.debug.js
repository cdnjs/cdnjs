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

	module.exports = __webpack_require__(76);


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

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdButtonToggle = __webpack_require__(253);

	var _mdButtonToggle2 = _interopRequireDefault(_mdButtonToggle);

	var _mdButtonToggle3 = __webpack_require__(225);

	var _mdButtonToggle4 = _interopRequireDefault(_mdButtonToggle3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-button-toggle', Vue.extend(_mdButtonToggle2.default));

	  Vue.material.styles.push(_mdButtonToggle4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

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

	    this.$children.forEach((function (child) {
	      var element = child.$el;
	      var toggleClass = 'md-toggle';

	      onClickButton = function onClickButton() {
	        if (_this.mdSingle) {
	          _this.$children.forEach((function (child) {
	            child.$el.classList.remove(toggleClass);
	          }));

	          element.classList.add(toggleClass);
	        } else {
	          element.classList.toggle(toggleClass);
	        }
	      };

	      if (element && element.classList.contains('md-button')) {
	        element.addEventListener('click', onClickButton);
	      }
	    }));
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.$children.forEach((function (child) {
	      var element = child.$el;

	      if (element && element.classList.contains('md-button')) {
	        element.removeEventListener('click', onClickButton);
	      }
	    }));
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 194:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 225:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-button-toggle .md-button:after {\n  width: 1px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  content: \" \"; }\n\n.THEME_NAME.md-button-toggle .md-toggle {\n  color: BACKGROUND-CONTRAST-0.54;\n  background-color: BACKGROUND-CONTRAST-0.26; }\n  .THEME_NAME.md-button-toggle .md-toggle:hover:not([disabled]) {\n    background-color: BACKGROUND-CONTRAST-0.38; }\n  .THEME_NAME.md-button-toggle .md-toggle + .md-toggle:after {\n    background-color: BACKGROUND-CONTRAST-0.12; }\n\n.THEME_NAME.md-button-toggle.md-primary .md-toggle {\n  color: PRIMARY-CONTRAST;\n  background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-button-toggle.md-primary .md-toggle:hover:not([disabled]) {\n    background-color: PRIMARY-COLOR; }\n  .THEME_NAME.md-button-toggle.md-primary .md-toggle + .md-toggle:after {\n    background-color: PRIMARY-COLOR-600; }\n\n.THEME_NAME.md-button-toggle.md-accent .md-toggle {\n  color: ACCENT-CONTRAST;\n  background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button-toggle.md-accent .md-toggle:hover:not([disabled]) {\n    background-color: ACCENT-COLOR; }\n  .THEME_NAME.md-button-toggle.md-accent .md-toggle + .md-toggle:after {\n    background-color: ACCENT-COLOR-600; }\n\n.THEME_NAME.md-button-toggle.md-warn .md-toggle {\n  color: WARN-CONTRAST;\n  background-color: WARN-COLOR; }\n  .THEME_NAME.md-button-toggle.md-warn .md-toggle:hover:not([disabled]) {\n    background-color: WARN-COLOR; }\n  .THEME_NAME.md-button-toggle.md-warn .md-toggle + .md-toggle:after {\n    background-color: WARN-COLOR-600; }\n\n.THEME_NAME.md-button-toggle [disabled] {\n  color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME.md-button-toggle [disabled].md-toggle {\n    color: BACKGROUND-CONTRAST-0.2;\n    background-color: rgba(0, 0, 0, 0.26); }\n"

/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(194)

	/* script */
	__vue_exports__ = __webpack_require__(115)

	/* template */
	var __vue_template__ = __webpack_require__(317)
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

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-button-toggle",
	    class: [_vm.themeClass]
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-106cf22d", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;