module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(59);


/***/ },

/***/ 39:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 40:
/***/ function(module, exports) {

	'use strict';

	/**
	 * v-clickoutside
	 * @desc 点击元素外面才会触发的事件
	 * @example
	 * ```vue
	 * <div v-element-clickoutside="show = false">
	 * ```
	 */
	var index = {
	  id: 'clickoutside',

	  bind: function bind() {
	    var _this = this;

	    this.handler = function (e) {
	      if (_this.vm && !_this.el.contains(e.target)) {
	        _this.vm.$eval(_this.expression);
	      }
	    };
	    document.addEventListener(this.arg || 'click', this.handler);
	  },
	  unbind: function unbind() {
	    document.removeEventListener(this.arg || 'click', this.handler);
	  },
	  install: function install(Vue) {
	    Vue.directive('clickoutside', {
	      bind: this.bind,
	      unbind: this.unbind
	    });
	  }
	};

	module.exports = index;

/***/ },

/***/ 41:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(60);

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(61)
	__vue_script__ = __webpack_require__(63)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/field/src/field.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(64)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}


/***/ },

/***/ 61:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(39);

	var _index2 = _interopRequireDefault(_index);

	var _vueClickoutside = __webpack_require__(40);

	var _vueClickoutside2 = _interopRequireDefault(_vueClickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  __webpack_require__(41);
	}

	exports.default = {
	  name: 'mt-field',

	  data: function data() {
	    return {
	      active: false
	    };
	  },


	  directives: { Clickoutside: _vueClickoutside2.default },

	  components: { XCell: _index2.default },

	  props: {
	    type: {
	      type: String,
	      default: 'text'
	    },
	    rows: String,
	    label: String,
	    placeholder: String,
	    readonly: Boolean,
	    disabled: Boolean,
	    disableClear: Boolean,
	    state: {
	      type: String,
	      default: 'default'
	    },
	    value: {},
	    attr: Object
	  },

	  methods: {
	    handleClear: function handleClear() {
	      if (this.disabled || this.readonly) return;
	      this.vulue = '';
	    }
	  },

	  watch: {
	    attr: {
	      immediate: true,
	      handler: function handler(attrs) {
	        var _this = this;

	        this.$nextTick(function () {
	          var target = [_this.$els.input, _this.$els.textarea];
	          target.forEach(function (el) {
	            if (!el || !attrs) return;
	            Object.keys(attrs).map(function (name) {
	              return el.setAttribute(name, attrs[name]);
	            });
	          });
	        });
	      }
	    }
	  }
	};

/***/ },

/***/ 64:
/***/ function(module, exports) {

	module.exports = "\n<x-cell\n  class=\"mint-field\"\n  :title=\"label\"\n  v-clickoutside=\"active = false\"\n  :class=\"[{\n    'is-textarea': type === 'textarea',\n    'is-nolabel': !label\n  }]\">\n  <textarea\n    v-el:textarea\n    class=\"mint-field-core\"\n    :placeholder=\"placeholder\"\n    v-if=\"type === 'textarea'\"\n    :rows=\"rows\"\n    :disabled=\"disabled\"\n    :readonly=\"readonly\"\n    v-model=\"value\">\n  </textarea>\n  <input\n    v-el:input\n    class=\"mint-field-core\"\n    :placeholder=\"placeholder\"\n    :number=\"type === 'number'\"\n    v-else\n    :type=\"type\"\n    @focus=\"active = true\"\n    :disabled=\"disabled\"\n    :readonly=\"readonly\"\n    v-model=\"value\">\n  <div\n    @click=\"handleClear\"\n    v-if=\"!disableClear\"\n    class=\"mint-field-clear\"\n    v-show=\"value && type !== 'textarea' && active\">\n    <i class=\"mintui mintui-field-error\"></i>\n  </div>\n  <span class=\"mint-field-state\" v-if=\"state\" :class=\"['is-' + state]\">\n    <i class=\"mintui\" :class=\"['mintui-field-' + state]\"></i>\n  </span>\n  <div class=\"mint-field-other\">\n    <slot></slot>\n  </div>\n</x-cell>\n";

/***/ }

/******/ });