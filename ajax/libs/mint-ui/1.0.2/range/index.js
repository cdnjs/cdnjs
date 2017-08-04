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

	module.exports = __webpack_require__(166);


/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MintRange = __webpack_require__(167);

	MintRange.install = function (Vue) {
	  Vue.component(MintRange.name, MintRange);
	};

	module.exports = MintRange;

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(168)
	__vue_script__ = __webpack_require__(170)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/range/src/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(172)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 168:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _draggable = __webpack_require__(171);

	var _draggable2 = _interopRequireDefault(_draggable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'mt-range',
	  props: {
	    min: {
	      type: Number,
	      default: 0
	    },
	    max: {
	      type: Number,
	      default: 100
	    },
	    step: {
	      type: Number,
	      default: 1
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    },
	    value: {
	      type: Number
	    },
	    barHeight: {
	      type: Number,
	      default: 1
	    }
	  },
	  computed: {
	    progress: function progress() {
	      var value = this.value;
	      if (typeof value === 'undefined' || value === null) return 0;
	      return Math.floor((value - this.min) / (this.max - this.min) * 100);
	    }
	  },
	  ready: function ready() {
	    var _this = this;

	    var _$els = this.$els,
	        thumb = _$els.thumb,
	        content = _$els.content;


	    var getThumbPosition = function getThumbPosition() {
	      var contentBox = content.getBoundingClientRect();
	      var thumbBox = thumb.getBoundingClientRect();

	      return {
	        left: thumbBox.left - contentBox.left,
	        top: thumbBox.top - contentBox.top
	      };
	    };

	    var dragState = {};
	    (0, _draggable2.default)(thumb, {
	      start: function start() {
	        if (_this.disabled) return;
	        var position = getThumbPosition();
	        dragState = {
	          thumbStartLeft: position.left,
	          thumbStartTop: position.top
	        };
	      },
	      drag: function drag(event) {
	        if (_this.disabled) return;
	        var contentBox = content.getBoundingClientRect();
	        var deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft;
	        var stepCount = Math.ceil((_this.max - _this.min) / _this.step);
	        var newPosition = dragState.thumbStartLeft + deltaX - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

	        var newProgress = newPosition / contentBox.width;

	        if (newProgress < 0) {
	          newProgress = 0;
	        } else if (newProgress > 1) {
	          newProgress = 1;
	        }

	        _this.value = Math.round(_this.min + newProgress * (_this.max - _this.min));
	      },
	      end: function end() {
	        if (_this.disabled) return;
	        dragState = {};
	      }
	    });
	  }
	};

/***/ },

/***/ 171:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (element, options) {
	  var moveFn = function moveFn(event) {
	    if (options.drag) {
	      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  var endFn = function endFn(event) {
	    if (!supportTouch) {
	      document.removeEventListener('mousemove', moveFn);
	      document.removeEventListener('mouseup', endFn);
	    }
	    document.onselectstart = null;
	    document.ondragstart = null;

	    isDragging = false;

	    if (options.end) {
	      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  };

	  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
	    if (isDragging) return;
	    event.preventDefault();
	    document.onselectstart = function () {
	      return false;
	    };
	    document.ondragstart = function () {
	      return false;
	    };

	    if (!supportTouch) {
	      document.addEventListener('mousemove', moveFn);
	      document.addEventListener('mouseup', endFn);
	    }
	    isDragging = true;

	    if (options.start) {
	      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
	    }
	  });

	  if (supportTouch) {
	    element.addEventListener('touchmove', moveFn);
	    element.addEventListener('touchend', endFn);
	    element.addEventListener('touchcancel', endFn);
	  }
	};

	var isDragging = false;
	var supportTouch = 'ontouchstart' in window;

	;

/***/ },

/***/ 172:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mt-range\" :class=\"{ 'mt-range--disabled': disabled }\">\n  <slot name=\"start\"></slot>\n  <div class=\"mt-range-content\" v-el:content>\n    <div class=\"mt-range-runway\" :style=\"{ 'border-top-width': barHeight + 'px' }\"></div>\n    <div class=\"mt-range-progress\" :style=\"{ width: progress + '%', height: barHeight + 'px' }\"></div>\n    <div class=\"mt-range-thumb\" v-el:thumb :style=\"{ left: progress + '%' }\"></div>\n  </div>\n  <slot name=\"end\"></slot>\n</div>\n";

/***/ }

/******/ });