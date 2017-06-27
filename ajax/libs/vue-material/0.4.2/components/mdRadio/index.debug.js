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
	
	var _mdRadio = __webpack_require__(151);
	
	var _mdRadio2 = _interopRequireDefault(_mdRadio);
	
	var _mdRadio3 = __webpack_require__(155);
	
	var _mdRadio4 = _interopRequireDefault(_mdRadio3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-radio', Vue.extend(_mdRadio2.default));
	
	  Vue.material.styles.push(_mdRadio4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(152)
	
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
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdRadio/mdRadio.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-20ee948d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-20ee948d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdRadio.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 152:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-radio",
	    class: _vm.classes
	  }, [_h('div', {
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
	  }, [_h('input', {
	    attrs: {
	      "type": "radio",
	      "name": _vm.name,
	      "id": _vm.id,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.value
	    }
	  })]), " ", (_vm.$slots.default) ? _h('label', {
	    staticClass: "md-radio-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-20ee948d", module.exports)
	  }
	}

/***/ },

/***/ 155:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-radio .md-radio-container:after, .THEME_NAME.md-radio .md-radio-container:after {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-radio-container, .THEME_NAME.md-radio.md-checked .md-radio-container {\n  border-color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-radio.md-checked .md-ripple, .THEME_NAME.md-radio.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-radio.md-primary .md-radio-container:after, .THEME_NAME.md-radio.md-primary .md-radio-container:after {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-primary.md-checked .md-radio-container, .THEME_NAME.md-radio.md-primary.md-checked .md-radio-container {\n  border-color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-primary.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-radio.md-warn .md-radio-container:after, .THEME_NAME.md-radio.md-warn .md-radio-container:after {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-warn.md-checked .md-radio-container, .THEME_NAME.md-radio.md-warn.md-checked .md-radio-container {\n  border-color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-warn.md-checked .md-ink-ripple, .THEME_NAME.md-radio.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-radio.md-disabled .md-radio-container, .THEME_NAME.md-radio.md-disabled .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n  .THEME_NAME .md-radio.md-disabled .md-radio-container:after, .THEME_NAME.md-radio.md-disabled .md-radio-container:after {\n    background-color: rgba(0, 0, 0, 0.26); }\n\n.THEME_NAME .md-radio.md-disabled.md-checked .md-radio-container, .THEME_NAME.md-radio.md-disabled.md-checked .md-radio-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map