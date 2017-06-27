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

	module.exports = __webpack_require__(79);


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

/***/ 43:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var uniqueId = function uniqueId() {
	  return Math.random().toString(36).slice(4);
	};

	exports.default = uniqueId;
	module.exports = exports["default"];

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;

	var _mdChips = __webpack_require__(266);

	var _mdChips2 = _interopRequireDefault(_mdChips);

	var _mdChip = __webpack_require__(265);

	var _mdChip2 = _interopRequireDefault(_mdChip);

	var _mdChips3 = __webpack_require__(228);

	var _mdChips4 = _interopRequireDefault(_mdChips3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function install(Vue) {
	  Vue.component('md-chips', Vue.extend(_mdChips2.default));
	  Vue.component('md-chip', Vue.extend(_mdChip2.default));

	  Vue.material.styles.push(_mdChips4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 123:
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
	    disabled: Boolean,
	    mdDeletable: Boolean
	  },
	  mixins: [_mixin2.default],
	  computed: {
	    classes: function classes() {
	      return {
	        'md-deletable': this.mdDeletable,
	        'md-disabled': this.disabled
	      };
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
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 124:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mixin = __webpack_require__(1);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _uniqueId = __webpack_require__(43);

	var _uniqueId2 = _interopRequireDefault(_uniqueId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    value: Array,
	    disabled: Boolean,
	    mdInputId: String,
	    mdInputName: String,
	    mdInputPlaceholder: String,
	    mdInputType: {
	      type: String,
	      default: 'text'
	    },
	    mdStatic: Boolean,
	    mdMax: {
	      type: Number,
	      default: Infinity
	    }
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      currentChip: null,
	      selectedChips: this.value,
	      inputId: this.mdInputId || 'chips-' + (0, _uniqueId2.default)()
	    };
	  },

	  watch: {
	    value: function value(_value) {
	      this.selectedChips = _value;
	    }
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-static': this.mdStatic,
	        'md-disabled': this.disabled
	      };
	    }
	  },
	  methods: {
	    applyInputFocus: function applyInputFocus() {
	      var _this = this;

	      this.$nextTick((function () {
	        _this.$refs.input.$el.focus();
	      }));
	    },
	    selectChip: function selectChip() {
	      if (this.currentChip && this.selectedChips.length < this.mdMax) {
	        var value = this.currentChip.trim();

	        if (this.selectedChips.indexOf(value) < 0) {
	          this.selectedChips.push(value);
	          this.currentChip = null;
	          this.$emit('input', this.selectedChips);
	          this.$emit('change', this.selectedChips);
	          this.applyInputFocus();
	        }
	      }
	    },
	    deleteChip: function deleteChip(chip) {
	      var index = this.selectedChips.indexOf(chip);

	      if (index >= 0) {
	        this.selectedChips.splice(index, 1);
	      }

	      this.$emit('change', this.selectedChips);
	      this.applyInputFocus();
	    },
	    deleteLastChip: function deleteLastChip() {
	      if (!this.currentChip) {
	        this.selectedChips.pop();
	        this.$emit('change', this.selectedChips);
	        this.applyInputFocus();
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 202:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 228:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-chip {\n  background-color: BACKGROUND-CONTRAST-0.12; }\n  .THEME_NAME.md-chip.md-deletable:hover, .THEME_NAME.md-chip.md-deletable:focus {\n    background-color: BACKGROUND-CONTRAST-0.54;\n    color: BACKGROUND-COLOR; }\n    .THEME_NAME.md-chip.md-deletable:hover .md-delete, .THEME_NAME.md-chip.md-deletable:focus .md-delete {\n      color: BACKGROUND-COLOR; }\n  .THEME_NAME.md-chip .md-delete {\n    color: BACKGROUND-CONTRAST-0.38; }\n    .THEME_NAME.md-chip .md-delete .md-ripple {\n      color: BACKGROUND-COLOR; }\n"

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(123)

	/* template */
	var __vue_template__ = __webpack_require__(326)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdChips/mdChip.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-23449298", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-23449298", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdChip.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(202)

	/* script */
	__vue_exports__ = __webpack_require__(124)

	/* template */
	var __vue_template__ = __webpack_require__(334)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdChips/mdChips.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3df67e22", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3df67e22", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdChips.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-chip",
	    class: [_vm.themeClass, _vm.classes],
	    attrs: {
	      "tabindex": "0"
	    }
	  }, [_vm._t("default"), _vm._v(" "), (_vm.mdDeletable) ? _c('md-button', {
	    staticClass: "md-icon-button md-dense md-delete",
	    attrs: {
	      "tabindex": "-1"
	    },
	    nativeOn: {
	      "click": function($event) {
	        !_vm.disabled && _vm.$emit('delete')
	      },
	      "keyup": function($event) {
	        if (_vm._k($event.keyCode, "delete", [8, 46])) { return; }
	        !_vm.disabled && _vm.$emit('delete')
	      }
	    }
	  }, [_c('md-icon', {
	    staticClass: "md-icon-delete"
	  }, [_vm._v("cancel")])], 1) : _vm._e()], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-23449298", module.exports)
	  }
	}

/***/ },

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "md-chips",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('md-input-container', {
	    nativeOn: {
	      "click": function($event) {
	        _vm.applyInputFocus($event)
	      }
	    }
	  }, [_vm._l((_vm.selectedChips), (function(chip) {
	    return _c('md-chip', {
	      attrs: {
	        "md-deletable": !_vm.mdStatic,
	        "disabled": _vm.disabled
	      },
	      on: {
	        "delete": function($event) {
	          _vm.deleteChip(chip)
	        }
	      }
	    }, [_vm._t("default", null, {
	      value: chip
	    })], 2)
	  })), _vm._v(" "), _c('md-input', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.mdStatic),
	      expression: "!mdStatic"
	    }, {
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentChip),
	      expression: "currentChip"
	    }],
	    ref: "input",
	    attrs: {
	      "type": _vm.mdInputType,
	      "placeholder": _vm.mdInputPlaceholder,
	      "id": _vm.inputId,
	      "name": _vm.mdInputName,
	      "disabled": _vm.disabled,
	      "tabindex": "0"
	    },
	    domProps: {
	      "value": (_vm.currentChip)
	    },
	    on: {
	      "input": function($event) {
	        _vm.currentChip = $event
	      }
	    },
	    nativeOn: {
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "delete", [8, 46])) { return; }
	        _vm.deleteLastChip($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return; }
	        _vm.selectChip($event)
	      }, function($event) {
	        if ($event.keyCode !== 186) { return; }
	        _vm.selectChip($event)
	      }]
	    }
	  })], 2)], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3df67e22", module.exports)
	  }
	}

/***/ }

/******/ })
}));
;