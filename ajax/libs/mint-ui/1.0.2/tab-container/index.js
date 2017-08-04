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

	module.exports = __webpack_require__(211);


/***/ },

/***/ 37:
/***/ function(module, exports) {

	var bindEvent = (function() {
	  if(document.addEventListener) {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.addEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event && handler) {
	        element.attachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var unbindEvent = (function() {
	  if(document.removeEventListener) {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.removeEventListener(event, handler, false);
	      }
	    };
	  } else {
	    return function(element, event, handler) {
	      if (element && event) {
	        element.detachEvent('on' + event, handler);
	      }
	    };
	  }
	})();

	var bindOnce = function(el, event, fn) {
	  var listener = function() {
	    if (fn) {
	      fn.apply(this, arguments);
	    }
	    unbindEvent(el, event, listener);
	  };
	  bindEvent(el, event, listener);
	};

	module.exports = {
	  on: bindEvent,
	  off: unbindEvent,
	  once: bindOnce
	};

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(212);

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(213)
	__vue_script__ = __webpack_require__(215)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/tab-container/src/tab-container.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(217)
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

/***/ 213:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _event = __webpack_require__(37);

	var _arrayFindIndex = __webpack_require__(216);

	var _arrayFindIndex2 = _interopRequireDefault(_arrayFindIndex);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'mt-tab-container',

	  props: {
	    active: {},
	    swipeable: Boolean
	  },

	  data: function data() {
	    return {
	      start: { x: 0, y: 0 },
	      swiping: false,
	      swipeLeave: false,
	      activeItems: [],
	      pageWidth: 0
	    };
	  },


	  watch: {
	    active: function active(val, oldValue) {
	      if (!this.swipeable) return;
	      var lastIndex = (0, _arrayFindIndex2.default)(this.$children, function (item) {
	        return item.id === oldValue;
	      });
	      this.swipeLeaveTransition(lastIndex);
	    }
	  },

	  ready: function ready() {
	    if (!this.swipeable) return;

	    this.wrap = this.$els.wrap;
	    this.pageWidth = this.wrap.clientWidth;
	    this.limitWidth = this.pageWidth / 4;
	  },
	  created: function created() {
	    if (this.swipeable) return;
	    this.$options._linkerCachable = false;
	    this.$options.template = '<div class="mint-tab-container"><slot></slot></div>';
	  },


	  methods: {
	    swipeLeaveTransition: function swipeLeaveTransition() {
	      var _this = this;

	      var lastIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      if (typeof this.index !== 'number') {
	        this.index = (0, _arrayFindIndex2.default)(this.$children, function (item) {
	          return item.id === _this.active;
	        });
	        this.swipeMove(-lastIndex * this.pageWidth);
	      }

	      setTimeout(function () {
	        _this.swipeLeave = true;
	        _this.swipeMove(-_this.index * _this.pageWidth);

	        (0, _event.once)(_this.wrap, 'webkitTransitionEnd', function (_) {
	          _this.wrap.style.webkitTransform = '';
	          _this.swipeLeave = false;
	          _this.swiping = false;
	          _this.index = null;
	        });
	      }, 0);
	    },
	    swipeMove: function swipeMove(offset) {
	      this.wrap.style.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
	      this.swiping = true;
	    },
	    startDrag: function startDrag(evt) {
	      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
	      this.dragging = true;
	      this.start.x = evt.pageX;
	      this.start.y = evt.pageY;
	    },
	    onDrag: function onDrag(evt) {
	      var _this2 = this;

	      if (!this.dragging) return;
	      var swiping = void 0;
	      var e = evt.changedTouches ? evt.changedTouches[0] : evt;
	      var offsetTop = e.pageY - this.start.y;
	      var offsetLeft = e.pageX - this.start.x;
	      var y = Math.abs(offsetTop);
	      var x = Math.abs(offsetLeft);

	      swiping = !(x < 5 || x >= 5 && y >= x * 1.73);
	      if (!swiping) return;
	      evt.preventDefault();

	      var len = this.$children.length - 1;
	      var index = (0, _arrayFindIndex2.default)(this.$children, function (item) {
	        return item.id === _this2.active;
	      });
	      var currentPageOffset = index * this.pageWidth;
	      var offset = offsetLeft - currentPageOffset;
	      var absOffset = Math.abs(offset);

	      if (absOffset > len * this.pageWidth || offset > 0 && offset < this.pageWidth) {
	        this.swiping = false;
	        return;
	      }

	      this.offsetLeft = offsetLeft;
	      this.index = index;
	      this.swipeMove(offset);
	    },
	    endDrag: function endDrag() {
	      if (!this.swiping) return;

	      var direction = this.offsetLeft > 0 ? -1 : 1;
	      var isChange = Math.abs(this.offsetLeft) > this.limitWidth;

	      if (isChange) {
	        this.index += direction;
	        var child = this.$children[this.index];
	        if (child) {
	          this.active = child.id;
	          return;
	        }
	      }

	      this.swipeLeaveTransition();
	    }
	  }
	};

/***/ },

/***/ 216:
/***/ function(module, exports) {

	module.exports = require("array-find-index");

/***/ },

/***/ 217:
/***/ function(module, exports) {

	module.exports = "\n<div\n  @touchstart=\"startDrag\"\n  @touchmove=\"onDrag\"\n  @touchend=\"endDrag\"\n  class=\"mint-tab-container\">\n  <div\n    v-el:wrap\n    :class=\"{ 'swipe-transition': swipeLeave }\"\n    class=\"mint-tab-container-wrap\">\n    <slot></slot>\n  </div>\n</div>\n";

/***/ }

/******/ });