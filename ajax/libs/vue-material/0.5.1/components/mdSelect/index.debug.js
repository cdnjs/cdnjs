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

	module.exports = __webpack_require__(167);


/***/ },

/***/ 6:
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

/***/ 120:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isArray = function isArray(value) {
	  return value && value.constructor === Array;
	};
	
	exports.default = isArray;
	module.exports = exports["default"];

/***/ },

/***/ 125:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
	  if (!$parent || !$parent.$el) {
	    return false;
	  }
	
	  if ($parent._uid === 0) {
	    return false;
	  }
	
	  if ($parent.$el.classList.contains(cssClass)) {
	    return $parent;
	  }
	
	  return getClosestVueParent($parent.$parent, cssClass);
	};
	
	exports.default = getClosestVueParent;
	module.exports = exports["default"];

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSelect = __webpack_require__(168);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdOption = __webpack_require__(172);
	
	var _mdOption2 = _interopRequireDefault(_mdOption);
	
	var _mdSelect3 = __webpack_require__(175);
	
	var _mdSelect4 = _interopRequireDefault(_mdSelect3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-select', Vue.extend(_mdSelect2.default));
	  Vue.component('md-option', Vue.extend(_mdOption2.default));
	
	  Vue.material.styles.push(_mdSelect4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(169)
	
	/* script */
	__vue_exports__ = __webpack_require__(170)
	
	/* template */
	var __vue_template__ = __webpack_require__(171)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSelect/mdSelect.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1cdcfd26", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1cdcfd26", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSelect.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 169:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
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
	
	var _mixin = __webpack_require__(6);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _getClosestVueParent = __webpack_require__(125);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	var _isArray = __webpack_require__(120);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    name: String,
	    id: String,
	    required: Boolean,
	    multiple: Boolean,
	    value: [String, Number, Array],
	    disabled: Boolean,
	    placeholder: String,
	    mdMenuClass: String
	  },
	  mixins: [_mixin2.default],
	  data: function data() {
	    return {
	      selectedValue: null,
	      selectedText: null,
	      multipleText: null,
	      multipleOptions: {},
	      options: {},
	      optionsAmount: 0
	    };
	  },
	
	  computed: {
	    classes: function classes() {
	      return {
	        'md-disabled': this.disabled
	      };
	    },
	    contentClasses: function contentClasses() {
	      if (this.multiple) {
	        return 'md-multiple ' + this.mdMenuClass;
	      }
	
	      return this.mdMenuClass;
	    }
	  },
	  watch: {
	    value: function value(_value) {
	      this.setTextAndValue(_value);
	    },
	    disabled: function disabled() {
	      this.setParentDisabled();
	    },
	    required: function required() {
	      this.setParentRequired();
	    },
	    placeholder: function placeholder() {
	      this.setParentPlaceholder();
	    }
	  },
	  methods: {
	    setParentDisabled: function setParentDisabled() {
	      this.parentContainer.isDisabled = this.disabled;
	    },
	    setParentRequired: function setParentRequired() {
	      this.parentContainer.isRequired = this.required;
	    },
	    setParentPlaceholder: function setParentPlaceholder() {
	      this.parentContainer.hasPlaceholder = !!this.placeholder;
	    },
	    getSingleValue: function getSingleValue(value) {
	      var _this = this;
	
	      var output = {};
	
	      Object.keys(this.options).forEach(function (index) {
	        var options = _this.options[index];
	
	        if (options.value === value) {
	          output.value = value;
	          output.text = options.$refs.item.textContent;
	        }
	      });
	
	      return output;
	    },
	    getMultipleValue: function getMultipleValue(modelValue) {
	      var _this2 = this;
	
	      if ((0, _isArray2.default)(this.value)) {
	        var _ret = function () {
	          var outputText = [];
	
	          modelValue.forEach(function (value) {
	            Object.keys(_this2.options).forEach(function (index) {
	              var options = _this2.options[index];
	
	              if (options.value === value) {
	                var text = options.$refs.item.textContent;
	
	                _this2.multipleOptions[index] = {
	                  value: value,
	                  text: text
	                };
	                outputText.push(text);
	              }
	            });
	          });
	
	          return {
	            v: {
	              value: modelValue,
	              text: outputText.join(', ')
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	
	      return {};
	    },
	    setTextAndValue: function setTextAndValue(modelValue) {
	      var output = this.multiple ? this.getMultipleValue(modelValue) : this.getSingleValue(modelValue);
	
	      this.selectedValue = output.value;
	      this.selectedText = output.text;
	
	      if (this.selectedText && this.parentContainer) {
	        this.parentContainer.setValue(this.selectedText);
	      }
	    },
	    changeValue: function changeValue(value) {
	      this.$emit('input', value);
	      this.$emit('change', value);
	    },
	    selectMultiple: function selectMultiple(index, value, text) {
	      var values = [];
	
	      this.multipleOptions[index] = {
	        value: value,
	        text: text
	      };
	
	      for (var key in this.multipleOptions) {
	        if (this.multipleOptions.hasOwnProperty(key) && this.multipleOptions[key].value) {
	          values.push(this.multipleOptions[key].value);
	        }
	      }
	
	      this.changeValue(values);
	    },
	    selectOption: function selectOption(value, text) {
	      this.selectedText = text;
	      this.setTextAndValue(value);
	      this.changeValue(value);
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    if (this.parentContainer) {
	      this.setParentDisabled();
	      this.setParentRequired();
	      this.setParentPlaceholder();
	      this.parentContainer.hasSelect = true;
	    }
	
	    this.setTextAndValue(this.value);
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.parentContainer) {
	      this.parentContainer.setValue('');
	      this.parentContainer.hasSelect = false;
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "md-select",
	    class: [_vm.themeClass, _vm.classes]
	  }, [_c('md-menu', {
	    attrs: {
	      "md-close-on-select": !_vm.multiple
	    }
	  }, [_c('span', {
	    ref: "value",
	    staticClass: "md-select-value",
	    attrs: {
	      "md-menu-trigger": ""
	    }
	  }, [_vm._v(_vm._s(_vm.selectedText || _vm.multipleText || _vm.placeholder))]), _vm._v(" "), _c('md-menu-content', {
	    staticClass: "md-select-content",
	    class: [_vm.themeClass, _vm.contentClasses]
	  }, [_vm._t("default")], true)]), _vm._v(" "), _c('select', {
	    attrs: {
	      "name": _vm.name,
	      "id": _vm.id,
	      "required": _vm.required,
	      "disabled": _vm.disabled,
	      "tabindex": "-1"
	    }
	  }, [_c('option', {
	    domProps: {
	      "value": _vm.value
	    }
	  }, [_vm._v(_vm._s(_vm.value))])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1cdcfd26", module.exports)
	  }
	}

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(173)
	
	/* template */
	var __vue_template__ = __webpack_require__(174)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdSelect/mdOption.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b3b71f34", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b3b71f34", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdOption.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(125);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: {
	    value: [String, Boolean, Number]
	  },
	  data: function data() {
	    return {
	      parentSelect: {},
	      check: false,
	      index: 0
	    };
	  },
	  computed: {
	    isSelected: function isSelected() {
	      if (this.value && this.parentSelect.value) {
	        var thisValue = this.value.toString();
	
	        if (this.parentSelect.multiple) {
	          return this.parentSelect.value.indexOf(thisValue) >= 0;
	        }
	
	        return this.value && this.parentSelect.value && thisValue === this.parentSelect.value.toString();
	      }
	
	      return false;
	    },
	    classes: function classes() {
	      return {
	        'md-selected': this.isSelected,
	        'md-checked': this.check
	      };
	    }
	  },
	  methods: {
	    setParentOption: function setParentOption() {
	      if (!this.parentSelect.multiple) {
	        this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
	      } else {
	        this.check = !this.check;
	      }
	    },
	    selectOption: function selectOption($event) {
	      this.setParentOption();
	      this.$emit('selected', $event);
	    }
	  },
	  watch: {
	    isSelected: function isSelected(selected) {
	      if (this.parentSelect.multiple) {
	        this.check = selected;
	      }
	    },
	    check: function check(_check) {
	      if (_check) {
	        this.parentSelect.selectMultiple(this.index, this.value, this.$refs.item.textContent);
	      } else {
	        this.parentSelect.selectMultiple(this.index);
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentSelect = (0, _getClosestVueParent2.default)(this.$parent, 'md-select');
	    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');
	
	    if (!this.parentSelect) {
	      throw new Error('You must wrap the md-option in a md-select');
	    }
	
	    this.parentSelect.optionsAmount++;
	    this.index = this.parentSelect.optionsAmount;
	
	    this.parentSelect.multipleOptions[this.index] = {};
	    this.parentSelect.options[this.index] = this;
	
	    if (this.parentSelect.value === this.value) {
	      this.setParentOption();
	    }
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.parentSelect) {
	      delete this.parentSelect.options[this.index];
	      delete this.parentSelect.multipleOptions[this.index];
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
	//
	//
	//

	module.exports = exports['default'];

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('md-menu-item', {
	    staticClass: "md-option",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.selectOption
	    }
	  }, [(_vm.parentSelect.multiple) ? _c('md-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.check),
	      expression: "check"
	    }],
	    staticClass: "md-primary",
	    domProps: {
	      "value": (_vm.check)
	    },
	    on: {
	      "input": function($event) {
	        _vm.check = $event
	      }
	    }
	  }, [_c('span', {
	    ref: "item"
	  }, [_vm._t("default")], true)]) : _c('span', {
	    ref: "item"
	  }, [_vm._t("default")], true), _vm._v(" ")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b3b71f34", module.exports)
	  }
	}

/***/ },

/***/ 175:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.54; }\n\n.THEME_NAME.md-select:after {\n  color: BACKGROUND-CONTRAST-0.38; }\n\n.THEME_NAME.md-select-content .md-menu-item.md-selected, .THEME_NAME.md-select-content .md-menu-item.md-checked {\n  color: PRIMARY-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map