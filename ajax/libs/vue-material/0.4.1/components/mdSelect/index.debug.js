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

	module.exports = __webpack_require__(156);


/***/ },

/***/ 114:
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

/***/ 119:
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

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdSelect = __webpack_require__(157);
	
	var _mdSelect2 = _interopRequireDefault(_mdSelect);
	
	var _mdOption = __webpack_require__(161);
	
	var _mdOption2 = _interopRequireDefault(_mdOption);
	
	var _mdSelect3 = __webpack_require__(164);
	
	var _mdSelect4 = _interopRequireDefault(_mdSelect3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-select', Vue.extend(_mdSelect2.default));
	  Vue.component('md-option', Vue.extend(_mdOption2.default));
	
	  Vue.material.styles.push(_mdSelect4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(158)
	
	/* script */
	__vue_exports__ = __webpack_require__(159)
	
	/* template */
	var __vue_template__ = __webpack_require__(160)
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
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdSelect/mdSelect.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-48754a3a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-48754a3a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdSelect.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 158:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 159:
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
	
	var _getClosestVueParent = __webpack_require__(119);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	var _isArray = __webpack_require__(114);
	
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
	      console.log(this.disabled);
	
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
	
	      if (this.parentContainer) {
	        this.$parent.setValue(output.text);
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
	      this.changeValue(value);
	    }
	  },
	  mounted: function mounted() {
	    this.parentContainer = (0, _getClosestVueParent2.default)(this.$parent, 'md-input-container');
	
	    this.setTextAndValue(this.value);
	
	    if (this.parentContainer) {
	      this.setParentDisabled();
	      this.setParentRequired();
	      this.setParentPlaceholder();
	      this.parentContainer.setValue(this.value);
	      this.parentContainer.hasSelect = true;
	    }
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

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('div', {
	    staticClass: "md-select",
	    class: _vm.classes
	  }, [_h('md-menu', {
	    attrs: {
	      "md-close-on-select": !_vm.multiple
	    }
	  }, [_h('span', {
	    ref: "value",
	    staticClass: "md-select-value",
	    attrs: {
	      "md-menu-trigger": ""
	    }
	  }, [_vm._s(_vm.selectedText || _vm.multipleText || _vm.placeholder)]), " ", _h('md-menu-content', {
	    staticClass: "md-select-content",
	    class: _vm.contentClasses
	  }, [_vm._t("default")])]), " ", _h('select', {
	    attrs: {
	      "name": _vm.name,
	      "id": _vm.id,
	      "required": _vm.required,
	      "disabled": _vm.disabled,
	      "tabindex": "-1"
	    }
	  }, [_h('option', {
	    domProps: {
	      "value": _vm.value
	    }
	  }, [_vm._s(_vm.value)])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-48754a3a", module.exports)
	  }
	}

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(162)
	
	/* template */
	var __vue_template__ = __webpack_require__(163)
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
	__vue_options__.__file = "/Users/mrufino/Projects/personal/github/vue-material/src/components/mdSelect/mdOption.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-df4f6c48", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-df4f6c48", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdOption.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(119);
	
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
	    selectOption: function selectOption($event) {
	      if (!this.parentSelect.multiple) {
	        this.parentSelect.selectOption(this.value, this.$refs.item.textContent);
	      } else {
	        this.check = !this.check;
	      }
	
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

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;
	  return _h('md-menu-item', {
	    staticClass: "md-option",
	    class: _vm.classes,
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.selectOption
	    }
	  }, [(_vm.parentSelect.multiple) ? _h('md-checkbox', {
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
	  }, [_h('span', {
	    ref: "item"
	  }, [_vm._t("default")])]) : _h('span', {
	    ref: "item"
	  }, [_vm._t("default")]), " "])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-df4f6c48", module.exports)
	  }
	}

/***/ },

/***/ 164:
/***/ function(module, exports) {

	module.exports = ".THEME_NAME .md-select-content .md-menu-item.md-selected, .THEME_NAME .md-select-content .md-menu-item.md-checked, .THEME_NAME.md-select-content .md-menu-item.md-selected, .THEME_NAME.md-select-content .md-menu-item.md-checked {\n  color: PRIMARY-COLOR; }\n"

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map