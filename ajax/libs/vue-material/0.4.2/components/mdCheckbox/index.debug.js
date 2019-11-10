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

	module.exports = __webpack_require__(61);


/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdCheckbox = __webpack_require__(62);
	
	var _mdCheckbox2 = _interopRequireDefault(_mdCheckbox);
	
	var _mdCheckbox3 = __webpack_require__(66);
	
	var _mdCheckbox4 = _interopRequireDefault(_mdCheckbox3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-checkbox', Vue.extend(_mdCheckbox2.default));
	
	  Vue.material.styles.push(_mdCheckbox4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(63)
	
	/* script */
	__vue_exports__ = __webpack_require__(64)
	
	/* template */
	var __vue_template__ = __webpack_require__(65)
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
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdCheckbox/mdCheckbox.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-42429b83", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-42429b83", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdCheckbox.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 63:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 64:
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
	    value: [String, Boolean],
	    id: String,
	    disabled: Boolean
	  },
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
	};
	module.exports = exports['default'];

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-checkbox",
	    class: _vm.classes
	  }, [_h('div', {
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
	  }, [_h('input', {
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
	  })]), " ", (_vm.$slots.default) ? _h('label', {
	    staticClass: "md-checkbox-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-42429b83", module.exports)
	  }
	}

/***/ },

/***/ 66:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-checkbox.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-checked .md-checkbox-container {\n  background-color: ACCENT-COLOR;\n  border-color: ACCENT-COLOR; }\n  .THEME_NAME .md-checkbox.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-checked .md-checkbox-container:after {\n    border-color: ACCENT-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME .md-checkbox.md-checked .md-ripple, .THEME_NAME.md-checkbox.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME .md-checkbox.md-primary.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container {\n  background-color: PRIMARY-COLOR;\n  border-color: PRIMARY-COLOR; }\n  .THEME_NAME .md-checkbox.md-primary.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-primary.md-checked .md-checkbox-container:after {\n    border-color: PRIMARY-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-primary.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-primary.md-checked .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME .md-checkbox.md-warn.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container {\n  background-color: WARN-COLOR;\n  border-color: WARN-COLOR; }\n  .THEME_NAME .md-checkbox.md-warn.md-checked .md-checkbox-container:after, .THEME_NAME.md-checkbox.md-warn.md-checked .md-checkbox-container:after {\n    border-color: WARN-CONTRAST; }\n\n.THEME_NAME .md-checkbox.md-warn.md-checked .md-ink-ripple, .THEME_NAME.md-checkbox.md-warn.md-checked .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME .md-checkbox.md-disabled.md-checked .md-checkbox-container, .THEME_NAME.md-checkbox.md-disabled.md-checked .md-checkbox-container {\n  background-color: rgba(0, 0, 0, 0.26);\n  border-color: transparent; }\n\n.THEME_NAME .md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container, .THEME_NAME.md-checkbox.md-disabled:not(.md-checked) .md-checkbox-container {\n  border-color: rgba(0, 0, 0, 0.26); }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map