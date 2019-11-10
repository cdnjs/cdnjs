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

	module.exports = __webpack_require__(150);


/***/ },

/***/ 150:
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

/***/ 151:
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

/***/ 153:
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

/***/ 154:
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

/***/ 155:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-switch.md-checked .md-switch-container, .THEME_NAME.md-switch.md-checked .md-switch-container {\n  background-color: ACCENT-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked .md-switch-thumb, .THEME_NAME.md-switch.md-checked .md-switch-thumb {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-switch.md-checked .md-ink-ripple, .THEME_NAME.md-switch.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-switch.md-checked .md-ripple, .THEME_NAME.md-switch.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-switch-container, .THEME_NAME.md-switch.md-checked.md-primary .md-switch-container {\n  background-color: PRIMARY-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-switch-thumb, .THEME_NAME.md-switch.md-checked.md-primary .md-switch-thumb {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-primary .md-ink-ripple, .THEME_NAME.md-switch.md-checked.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-switch-container, .THEME_NAME.md-switch.md-checked.md-warn .md-switch-container {\n  background-color: WARN-COLOR-500-0.5; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-switch-thumb, .THEME_NAME.md-switch.md-checked.md-warn .md-switch-thumb {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-switch.md-checked.md-warn .md-ink-ripple, .THEME_NAME.md-switch.md-checked.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-switch.md-disabled .md-switch-container, .THEME_NAME .md-switch.md-disabled.md-checked .md-switch-container, .THEME_NAME.md-switch.md-disabled .md-switch-container, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-container {\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.THEME_NAME .md-switch.md-disabled .md-switch-thumb, .THEME_NAME .md-switch.md-disabled.md-checked .md-switch-thumb, .THEME_NAME.md-switch.md-disabled .md-switch-thumb, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-thumb {\n  background-color: #bdbdbd; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map