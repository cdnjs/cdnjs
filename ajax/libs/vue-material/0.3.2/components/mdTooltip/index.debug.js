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

	module.exports = __webpack_require__(196);


/***/ },

/***/ 113:
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

/***/ 114:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var margin = 8;
	
	var isAboveOfViewport = function isAboveOfViewport(element, position) {
	  return position.top <= margin - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isBelowOfViewport = function isBelowOfViewport(element, position) {
	  return position.top + element.offsetHeight + margin >= window.innerHeight - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isOnTheLeftOfViewport = function isOnTheLeftOfViewport(element, position) {
	  return position.left <= margin - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var isOnTheRightOfViewport = function isOnTheRightOfViewport(element, position) {
	  return position.left + element.offsetWidth + margin >= window.innerWidth - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var getInViewPosition = function getInViewPosition(element, position) {
	  var computedStyle = getComputedStyle(element);
	
	  if (isAboveOfViewport(element, position)) {
	    position.top = margin - parseInt(computedStyle.marginTop, 10);
	  }
	
	  if (isOnTheLeftOfViewport(element, position)) {
	    position.left = margin - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isOnTheRightOfViewport(element, position)) {
	    position.left = window.innerWidth - margin - element.offsetWidth - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isBelowOfViewport(element, position)) {
	    position.top = window.innerHeight - margin - element.offsetHeight - parseInt(computedStyle.marginTop, 10);
	  }
	
	  return position;
	};
	
	exports.default = getInViewPosition;
	module.exports = exports["default"];

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdTooltip = __webpack_require__(197);
	
	var _mdTooltip2 = _interopRequireDefault(_mdTooltip);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-tooltip', Vue.extend(_mdTooltip2.default));
	}
	module.exports = exports['default'];

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-3104dae7!sass!./mdTooltip.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(199)
	
	/* template */
	var __vue_template__ = __webpack_require__(200)
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

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(113);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	var _getInViewPosition = __webpack_require__(114);
	
	var _getInViewPosition2 = _interopRequireDefault(_getInViewPosition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	      transitionOff: false,
	      topPosition: false,
	      leftPosition: false
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-active': this.active,
	        'md-transition-off': this.transitionOff,
	        'md-tooltip-top': this.mdDirection === 'top',
	        'md-tooltip-right': this.mdDirection === 'right',
	        'md-tooltip-bottom': this.mdDirection === 'bottom',
	        'md-tooltip-left': this.mdDirection === 'left'
	      };
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
	
	      cssPosition = (0, _getInViewPosition2.default)(this.tooltipElement, cssPosition);
	
	      this.topPosition = cssPosition.top;
	      this.leftPosition = cssPosition.left;
	    },
	    open: function open() {
	      var _this = this;
	
	      document.body.appendChild(this.tooltipElement);
	      getComputedStyle(this.tooltipElement).top;
	      this.transitionOff = true;
	      this.calculateTooltipPosition();
	
	      window.setTimeout(function () {
	        _this.transitionOff = false;
	        _this.active = true;
	      }, 10);
	    },
	    close: function close() {
	      var _this2 = this;
	
	      var cleanupElements = function cleanupElements() {
	        _this2.tooltipElement.removeEventListener(_transitionEndEventName2.default, cleanupElements);
	
	        if (_this2.tooltipElement.parentNode && !_this2.tooltipElement.classList.contains('md-active')) {
	          document.body.removeChild(_this2.tooltipElement);
	        }
	      };
	
	      this.active = false;
	      this.tooltipElement.removeEventListener(_transitionEndEventName2.default, cleanupElements);
	      this.tooltipElement.addEventListener(_transitionEndEventName2.default, cleanupElements);
	    }
	  },
	  mounted: function mounted() {
	    var _this3 = this;
	
	    this.$nextTick(function () {
	      _this3.tooltipElement = _this3.$el;
	      _this3.parentElement = _this3.tooltipElement.parentNode;
	
	      _this3.$el.parentNode.removeChild(_this3.$el);
	
	      _this3.parentElement.addEventListener('mouseenter', _this3.open);
	      _this3.parentElement.addEventListener('focus', _this3.open);
	      _this3.parentElement.addEventListener('mouseleave', _this3.close);
	      _this3.parentElement.addEventListener('blur', _this3.close);
	    });
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.active = false;
	
	    if (this.$el.parentNode) {
	      document.body.removeChild(this.$el);
	    }
	
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

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('span', {
	    staticClass: "md-tooltip",
	    class: _vm.classes,
	    style: (_vm.style)
	  }, [_vm._t("default")])
	},staticRenderFns: []}
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