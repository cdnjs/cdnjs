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

	module.exports = __webpack_require__(97);


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

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdSwitch = __webpack_require__(296);

	var _mdSwitch2 = _interopRequireDefault(_mdSwitch);

	var _mdSwitch3 = __webpack_require__(243);

	var _mdSwitch4 = _interopRequireDefault(_mdSwitch3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-switch', Vue.extend(_mdSwitch2.default));

	  Vue.material.styles.push(_mdSwitch4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var checkedPosition = 75; //
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

	var initialPosition = '-1px';

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
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      leftPos: initialPosition,
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
	      this.setPosition();
	    },
	    value: function value(_value) {
	      this.changeState(_value);
	    }
	  },
	  methods: {
	    setPosition: function setPosition() {
	      this.leftPos = this.checked ? checkedPosition + '%' : initialPosition;
	    },
	    changeState: function changeState(checked, $event) {
	      this.checked = checked;
	      this.$emit('change', this.checked, $event);
	      this.$emit('input', this.checked, $event);
	    },
	    toggle: function toggle($event) {
	      if (!this.disabled) {
	        this.changeState(!this.checked, $event);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.$nextTick(this.setPosition);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 210:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 243:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-switch.md-checked .md-switch-container {\n  background-color: ACCENT-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked .md-switch-thumb {\n  background-color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ink-ripple {\n  color: ACCENT-COLOR; }\n\n.THEME_NAME.md-switch.md-checked .md-ripple {\n  opacity: .38; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-container {\n  background-color: PRIMARY-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-switch-thumb {\n  background-color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-primary .md-ink-ripple {\n  color: PRIMARY-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-container {\n  background-color: WARN-COLOR-500-0.5; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-switch-thumb {\n  background-color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-checked.md-warn .md-ink-ripple {\n  color: WARN-COLOR; }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-container, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-container {\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.THEME_NAME.md-switch.md-disabled .md-switch-thumb, .THEME_NAME.md-switch.md-disabled.md-checked .md-switch-thumb {\n  background-color: #bdbdbd; }\n"

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(210)

	/* script */
	__vue_exports__ = __webpack_require__(150)

	/* template */
	var __vue_template__ = __webpack_require__(352)
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

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-switch",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('div', {
	    staticClass: "md-switch-container",
	    on: {
	      "click": function($event) {
	        _vm.toggle($event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "md-switch-thumb",
	    style: (_vm.styles)
	  }, [_c('input', {
	    attrs: {
	      "type": "checkbox",
	      "name": _vm.name,
	      "id": _vm.id,
	      "disabled": _vm.disabled
	    },
	    domProps: {
	      "value": _vm.value
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "md-switch-holder",
	    attrs: {
	      "type": _vm.type
	    }
	  }), _vm._v(" "), _c('md-ink-ripple', {
	    attrs: {
	      "md-disabled": _vm.disabled
	    }
	  })], 1)]), _vm._v(" "), (_vm.$slots.default) ? _c('label', {
	    staticClass: "md-switch-label",
	    attrs: {
	      "for": _vm.id || _vm.name
	    }
	  }, [_vm._t("default")], 2) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7e05ff26", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;