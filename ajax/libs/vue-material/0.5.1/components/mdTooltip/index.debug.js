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

	module.exports = __webpack_require__(242);


/***/ },

/***/ 88:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function transitionEndEventName() {
	  var el = document.createElement('span');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };
	
	  for (var transition in transitions) {
	    if (el.style[transition] !== undefined) {
	      return transitions[transition];
	    }
	  }
	}
	
	exports.default = transitionEndEventName();
	module.exports = exports['default'];

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTooltip = __webpack_require__(243);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tooltip', Vue.extend(_mdTooltip2.default));
	}
	module.exports = exports['default'];

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(244)
	
	/* script */
	__vue_exports__ = __webpack_require__(245)
	
	/* template */
	var __vue_template__ = __webpack_require__(246)
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
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdTooltip/mdTooltip.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3104dae7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3104dae7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdTooltip.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 244:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(88);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } //
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  props: {
	    mdDirection: {
	      type: String,
	      default: 'bottom'
	    },
	    mdDelay: {
	      type: String,
	      default: '0'
	    }
	  },
	  data: function data() {
	    return {
	      active: false,
	      parentClass: null,
	      transitionOff: false,
	      topPosition: false,
	      leftPosition: false
	    };
	  },
	  computed: {
	    classes: function classes() {
	      var cssClasses = {
	        'md-active': this.active,
	        'md-transition-off': this.transitionOff,
	        'md-tooltip-top': this.mdDirection === 'top',
	        'md-tooltip-right': this.mdDirection === 'right',
	        'md-tooltip-bottom': this.mdDirection === 'bottom',
	        'md-tooltip-left': this.mdDirection === 'left'
	      };
	
	      if (this.parentClass) {
	        cssClasses[this.parentClass] = true;
	      }
	
	      return cssClasses;
	    },
	    style: function style() {
	      return {
	        'transition-delay': this.mdDelay + 'ms',
	        top: this.topPosition + 'px',
	        left: this.leftPosition + 'px'
	      };
	    }
	  },
	  watch: {
	    mdDirection: function mdDirection() {
	      this.calculateTooltipPosition();
	    }
	  },
	  methods: {
	    removeTooltips: function removeTooltips() {
	      var tooltips = [].concat(_toConsumableArray(this.rootElement.querySelectorAll('.md-tooltip')));
	
	      tooltips.forEach(function (tooltip) {
	        if (tooltip.parentNode) {
	          tooltip.parentNode.removeChild(tooltip);
	        }
	      });
	
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
	    },
	    calculateTooltipPosition: function calculateTooltipPosition() {
	      var position = this.parentElement.getBoundingClientRect();
	      var cssPosition = {};
	
	      switch (this.mdDirection) {
	        case 'top':
	          cssPosition.top = position.top - this.$el.offsetHeight;
	          cssPosition.left = position.left + position.width / 2;
	
	          break;
	
	        case 'right':
	          cssPosition.top = position.top;
	          cssPosition.left = position.left + position.width;
	
	          break;
	
	        case 'bottom':
	          cssPosition.top = position.bottom;
	          cssPosition.left = position.left + position.width / 2;
	
	          break;
	
	        case 'left':
	          cssPosition.top = position.top;
	          cssPosition.left = position.left - this.$el.offsetWidth;
	
	          break;
	
	        default:
	          console.warn('Invalid ' + this.mdDirection + ' option to md-direction option');
	      }
	
	      this.topPosition = cssPosition.top;
	      this.leftPosition = cssPosition.left;
	    },
	    generateTooltipClasses: function generateTooltipClasses() {
	      var classes = [];
	
	      [].concat(_toConsumableArray(this.parentElement.classList)).forEach(function (cssClass) {
	        if (cssClass.indexOf('md-') >= 0 && cssClass !== 'md-active') {
	          classes.push(cssClass + '-tooltip');
	        }
	      });
	
	      this.parentClass = classes.join(' ');
	    },
	    open: function open() {
	      var _this = this;
	
	      this.removeTooltips();
	
	      this.$nextTick(function () {
	        _this.rootElement.appendChild(_this.tooltipElement);
	        getComputedStyle(_this.tooltipElement).top;
	        _this.transitionOff = true;
	        _this.generateTooltipClasses();
	        _this.calculateTooltipPosition();
	
	        window.setTimeout(function () {
	          _this.transitionOff = false;
	          _this.active = true;
	        }, 10);
	      });
	    },
	    close: function close() {
	      this.active = false;
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, this.removeTooltips);
	      this.tooltipElement.addEventListener(_transitionEndEventName2.default, this.removeTooltips);
	    }
	  },
	  mounted: function mounted() {
	    var _this2 = this;
	
	    this.$nextTick(function () {
	      _this2.tooltipElement = _this2.$el;
	      _this2.parentElement = _this2.tooltipElement.parentNode;
	      _this2.rootElement = _this2.$root.$el;
	
	      _this2.$el.parentNode.removeChild(_this2.$el);
	
	      _this2.parentElement.addEventListener('mouseenter', _this2.open);
	      _this2.parentElement.addEventListener('focus', _this2.open);
	      _this2.parentElement.addEventListener('mouseleave', _this2.close);
	      _this2.parentElement.addEventListener('blur', _this2.close);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.active = false;
	
	    this.removeTooltips();
	
	    if (this.parentElement) {
	      this.parentElement.removeEventListener('mouseenter', this.open);
	      this.parentElement.removeEventListener('focus', this.open);
	      this.parentElement.removeEventListener('mouseleave', this.close);
	      this.parentElement.removeEventListener('blur', this.close);
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('span', {
	    staticClass: "md-tooltip",
	    class: _vm.classes,
	    style: (_vm.style)
	  }, [_vm._t("default")], true)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3104dae7", module.exports)
	  }
	}

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map