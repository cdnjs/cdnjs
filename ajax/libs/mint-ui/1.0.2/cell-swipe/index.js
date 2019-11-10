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

	module.exports = __webpack_require__(32);


/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(33);

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(34)
	__vue_script__ = __webpack_require__(36)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/cell-swipe/src/cell-swipe.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(41)
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

/***/ 34:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _event = __webpack_require__(37);

	var _index = __webpack_require__(38);

	var _index2 = _interopRequireDefault(_index);

	var _vueClickoutside = __webpack_require__(39);

	var _vueClickoutside2 = _interopRequireDefault(_vueClickoutside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (true) {
	  __webpack_require__(40);
	}

	exports.default = {
	  name: 'mt-cell-swipe',

	  components: { XCell: _index2.default },

	  directives: { Clickoutside: _vueClickoutside2.default },

	  props: {
	    left: Array,
	    right: Array,
	    icon: String,
	    title: String,
	    label: String,
	    isLink: Boolean,
	    value: {}
	  },

	  data: function data() {
	    return {
	      start: { x: 0, y: 0 }
	    };
	  },
	  ready: function ready() {
	    this.wrap = this.$refs.cell.$el.querySelector('.mint-cell-wrapper');
	    this.leftElm = this.$els.left;
	    this.rightElm = this.$els.right;
	    this.leftWrapElm = this.leftElm.parentNode;
	    this.rightWrapElm = this.rightElm.parentNode;
	    this.leftWidth = this.leftElm.getBoundingClientRect().width;
	    this.rightWidth = this.rightElm.getBoundingClientRect().width;

	    this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
	    this.rightDefaultTransform = this.translate3d(this.rightWidth);

	    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
	    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
	  },


	  methods: {
	    translate3d: function translate3d(offset) {
	      return 'translate3d(' + offset + 'px, 0, 0)';
	    },
	    swipeMove: function swipeMove() {
	      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	      this.wrap.style.webkitTransform = this.translate3d(offset);
	      this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
	      this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
	      this.swiping = true;
	    },
	    swipeLeaveTransition: function swipeLeaveTransition(direction) {
	      var _this = this;

	      setTimeout(function () {
	        _this.swipeLeave = true;

	        if (direction > 0 && -_this.offsetLeft > _this.rightWidth * 0.4) {
	          _this.swipeMove(-_this.rightWidth);
	          _this.swiping = false;
	          _this.opened = true;
	          return;
	        } else if (direction < 0 && _this.offsetLeft > _this.leftWidth * 0.4) {
	          _this.swipeMove(_this.leftWidth);
	          _this.swiping = false;
	          _this.opened = true;
	          return;
	        }

	        _this.swipeMove(0);
	        (0, _event.once)(_this.wrap, 'webkitTransitionEnd', function (_) {
	          _this.wrap.style.webkitTransform = '';
	          _this.rightWrapElm.style.webkitTransform = _this.rightDefaultTransform;
	          _this.leftWrapElm.style.webkitTransform = _this.leftDefaultTransform;
	          _this.swipeLeave = false;
	          _this.swiping = false;
	        });
	      }, 0);
	    },
	    startDrag: function startDrag(evt) {
	      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
	      this.dragging = true;
	      this.start.x = evt.pageX;
	      this.start.y = evt.pageY;
	    },
	    onDrag: function onDrag(evt) {
	      if (this.opened) {
	        !this.swiping && this.swipeMove(0);
	        this.opened = false;
	        return;
	      }
	      if (!this.dragging) return;
	      var swiping = void 0;
	      var e = evt.changedTouches ? evt.changedTouches[0] : evt;
	      var offsetTop = e.pageY - this.start.y;
	      var offsetLeft = this.offsetLeft = e.pageX - this.start.x;

	      if (offsetLeft < 0 && -offsetLeft > this.rightWidth || offsetLeft > 0 && offsetLeft > this.leftWidth || offsetLeft > 0 && !this.leftWidth || offsetLeft < 0 && !this.rightWidth) {
	        return;
	      }

	      var y = Math.abs(offsetTop);
	      var x = Math.abs(offsetLeft);

	      swiping = !(x < 5 || x >= 5 && y >= x * 1.73);
	      if (!swiping) return;
	      evt.preventDefault();

	      this.swipeMove(offsetLeft);
	    },
	    endDrag: function endDrag() {
	      if (!this.swiping) return;
	      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
	    }
	  }
	};

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

/***/ 38:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 39:
/***/ function(module, exports) {

	module.exports = require("vue-clickoutside");

/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 41:
/***/ function(module, exports) {

	module.exports = "\n<x-cell\n  v-clickoutside:touchstart=\"swipeMove()\"\n  @click=\"swipeMove()\"\n  @touchstart=\"startDrag\"\n  @touchmove=\"onDrag\"\n  @touchend=\"endDrag\"\n  class=\"mint-cell-swipe\"\n  :title=\"title\"\n  :icon=\"icon\"\n  :label=\"label\"\n  :is-link=\"isLink\"\n  v-ref:cell\n  :value=\"value\">\n  <div\n    slot=\"right\"\n    class=\"mint-cell-swipe-buttongroup\"\n    v-el:right>\n    <a\n      class=\"mint-cell-swipe-button\"\n      v-for=\"btn in right\"\n      :style=\"btn.style\"\n      @click=\"btn.handler && btn.handler(), swipeMove()\"\n      v-html=\"btn.content\"></a>\n  </div>\n  <div\n    slot=\"left\"\n    class=\"mint-cell-swipe-buttongroup\"\n    v-el:left>\n    <a\n      class=\"mint-cell-swipe-button\"\n      v-for=\"btn in left\"\n      :style=\"btn.style\"\n      @click=\"btn.handler && btn.handler(), swipeMove()\"\n      v-html=\"btn.content\"></a>\n  </div>\n  <slot></slot>\n  <span\n    v-if=\"_slotContents.title\"\n    slot=\"title\">\n    <slot name=\"title\"></slot>\n  </span>\n  <span\n    v-if=\"_slotContents.icon\"\n    slot=\"icon\">\n    <slot name=\"icon\"></slot>\n  </span>\n</x-cell>\n";

/***/ }

/******/ });