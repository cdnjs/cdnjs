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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 234);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* unused harmony export on */
/* unused harmony export off */
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return once; });
/* unused harmony export hasClass */
/* harmony export (immutable) */ exports["a"] = addClass;
/* harmony export (immutable) */ exports["b"] = removeClass;
/* unused harmony export getStyle */
/* unused harmony export setStyle */
/* istanbul ignore next */



var isServer = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
var trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
var camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
var on = (function() {
  if (!isServer && document.addEventListener) {
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

/* istanbul ignore next */
var off = (function() {
  if (!isServer && document.removeEventListener) {
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

/* istanbul ignore next */
var once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
var getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};


/***/ },

/***/ 113:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(113)

/* script */
__vue_exports__ = __webpack_require__(79)

/* template */
var __vue_template__ = __webpack_require__(184)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}

__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

module.exports = __vue_exports__


/***/ },

/***/ 184:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mint-swipe"
  }, [_c('div', {
    ref: "wrap",
    staticClass: "mint-swipe-items-wrap"
  }, [_vm._t("default")], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showIndicators),
      expression: "showIndicators"
    }],
    staticClass: "mint-swipe-indicators"
  }, _vm._l((_vm.pages), function(page, $index) {
    return _c('div', {
      staticClass: "mint-swipe-indicator",
      class: {
        'is-active': $index === _vm.index
      }
    })
  }))])
},staticRenderFns: []}

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(43);


/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_swipe_vue__);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(exports, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_swipe_vue___default.a; });



/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__ = __webpack_require__(1);
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




/* harmony default export */ exports["default"] = {
  name: 'mt-swipe',

  created: function created() {
    this.dragState = {};
  },

  data: function data() {
    return {
      ready: false,
      dragging: false,
      userScrolling: false,
      animating: false,
      index: 0,
      pages: [],
      timer: null,
      reInitTimer: null,
      noDrag: false
    };
  },

  props: {
    speed: {
      type: Number,
      default: 300
    },

    defaultIndex: {
      type: Number,
      default: 0
    },

    auto: {
      type: Number,
      default: 3000
    },

    continuous: {
      type: Boolean,
      default: true
    },

    showIndicators: {
      type: Boolean,
      default: true
    },

    noDragWhenSingle: {
      type: Boolean,
      default: true
    },

    prevent: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    index: function index(newIndex) {
      this.$emit('change', newIndex);
    }
  },

  methods: {
    swipeItemCreated: function swipeItemCreated() {
      var this$1 = this;

      if (!this.ready) return;

      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        this$1.reInitPages();
      }, 100);
    },

    swipeItemDestroyed: function swipeItemDestroyed() {
      var this$1 = this;

      if (!this.ready) return;

      clearTimeout(this.reInitTimer);
      this.reInitTimer = setTimeout(function () {
        this$1.reInitPages();
      }, 100);
    },

    translate: function translate(element, offset, speed, callback) {
      var arguments$1 = arguments;
      var this$1 = this;

      if (speed) {
        this.animating = true;
        element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
        setTimeout(function () {
          element.style.webkitTransform = "translate3d(" + offset + "px, 0, 0)";
        }, 50);

        var called = false;

        var transitionEndCallback = function () {
          if (called) return;
          called = true;
          this$1.animating = false;
          element.style.webkitTransition = '';
          element.style.webkitTransform = '';
          if (callback) {
            callback.apply(this$1, arguments$1);
          }
        };

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__["c" /* once */])(element, 'webkitTransitionEnd', transitionEndCallback);
        setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
      } else {
        element.style.webkitTransition = '';
        element.style.webkitTransform = "translate3d(" + offset + "px, 0, 0)";
      }
    },

    reInitPages: function reInitPages() {
      var children = this.$children;
      this.noDrag = children.length === 1 && this.noDragWhenSingle;

      var pages = [];
      var intDefaultIndex = Math.floor(this.defaultIndex);
      var defaultIndex = (intDefaultIndex >= 0 && intDefaultIndex < children.length) ? intDefaultIndex : 0;
      this.index = defaultIndex;

      children.forEach(function(child, index) {
        pages.push(child.$el);

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__["b" /* removeClass */])(child.$el, 'is-active');

        if (index === defaultIndex) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__["a" /* addClass */])(child.$el, 'is-active');
        }
      });

      this.pages = pages;
    },

    doAnimate: function doAnimate(towards, options) {
      var this$1 = this;

      if (this.$children.length === 0) return;
      if (!options && this.$children.length < 2) return;

      var prevPage, nextPage, currentPage, pageWidth, offsetLeft;
      var speed = this.speed || 300;
      var index = this.index;
      var pages = this.pages;
      var pageCount = pages.length;

      if (!options) {
        pageWidth = this.$el.clientWidth;
        currentPage = pages[index];
        prevPage = pages[index - 1];
        nextPage = pages[index + 1];
        if (this.continuous && pages.length > 1) {
          if (!prevPage) {
            prevPage = pages[pages.length - 1];
          }
          if (!nextPage) {
            nextPage = pages[0];
          }
        }
        if (prevPage) {
          prevPage.style.display = 'block';
          this.translate(prevPage, -pageWidth);
        }
        if (nextPage) {
          nextPage.style.display = 'block';
          this.translate(nextPage, pageWidth);
        }
      } else {
        prevPage = options.prevPage;
        currentPage = options.currentPage;
        nextPage = options.nextPage;
        pageWidth = options.pageWidth;
        offsetLeft = options.offsetLeft;
      }

      var newIndex;

      var oldPage = this.$children[index].$el;

      if (towards === 'prev') {
        if (index > 0) {
          newIndex = index - 1;
        }
        if (this.continuous && index === 0) {
          newIndex = pageCount - 1;
        }
      } else if (towards === 'next') {
        if (index < pageCount - 1) {
          newIndex = index + 1;
        }
        if (this.continuous && index === pageCount - 1) {
          newIndex = 0;
        }
      }

      var callback = function () {
        if (newIndex !== undefined) {
          var newPage = this$1.$children[newIndex].$el;
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__["b" /* removeClass */])(oldPage, 'is-active');
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_mint_ui_src_utils_dom__["a" /* addClass */])(newPage, 'is-active');

          this$1.index = newIndex;
        }

        if (prevPage) {
          prevPage.style.display = '';
        }

        if (nextPage) {
          nextPage.style.display = '';
        }
      };

      setTimeout(function () {
        if (towards === 'next') {
          this$1.translate(currentPage, -pageWidth, speed, callback);
          if (nextPage) {
            this$1.translate(nextPage, 0, speed);
          }
        } else if (towards === 'prev') {
          this$1.translate(currentPage, pageWidth, speed, callback);
          if (prevPage) {
            this$1.translate(prevPage, 0, speed);
          }
        } else {
          this$1.translate(currentPage, 0, speed, callback);
          if (typeof offsetLeft !== 'undefined') {
            if (prevPage && offsetLeft > 0) {
              this$1.translate(prevPage, pageWidth * -1, speed);
            }
            if (nextPage && offsetLeft < 0) {
              this$1.translate(nextPage, pageWidth, speed);
            }
          } else {
            if (prevPage) {
              this$1.translate(prevPage, pageWidth * -1, speed);
            }
            if (nextPage) {
              this$1.translate(nextPage, pageWidth, speed);
            }
          }
        }
      }, 10);
    },

    next: function next() {
      this.doAnimate('next');
    },

    prev: function prev() {
      this.doAnimate('prev');
    },

    doOnTouchStart: function doOnTouchStart(event) {
      if (this.noDrag) return;

      var element = this.$el;
      var dragState = this.dragState;
      var touch = event.touches[0];

      dragState.startTime = new Date();
      dragState.startLeft = touch.pageX;
      dragState.startTop = touch.pageY;
      dragState.startTopAbsolute = touch.clientY;

      dragState.pageWidth = element.offsetWidth;
      dragState.pageHeight = element.offsetHeight;

      var prevPage = this.$children[this.index - 1];
      var dragPage = this.$children[this.index];
      var nextPage = this.$children[this.index + 1];

      if (this.continuous && this.pages.length > 1) {
        if (!prevPage) {
          prevPage = this.$children[this.$children.length - 1];
        }
        if (!nextPage) {
          nextPage = this.$children[0];
        }
      }

      dragState.prevPage = prevPage ? prevPage.$el : null;
      dragState.dragPage = dragPage ? dragPage.$el : null;
      dragState.nextPage = nextPage ? nextPage.$el : null;

      if (dragState.prevPage) {
        dragState.prevPage.style.display = 'block';
      }

      if (dragState.nextPage) {
        dragState.nextPage.style.display = 'block';
      }
    },

    doOnTouchMove: function doOnTouchMove(event) {
      if (this.noDrag) return;

      var dragState = this.dragState;
      var touch = event.touches[0];

      dragState.currentLeft = touch.pageX;
      dragState.currentTop = touch.pageY;
      dragState.currentTopAbsolute = touch.clientY;

      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

      var distanceX = Math.abs(offsetLeft);
      var distanceY = Math.abs(offsetTop);
      if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
        this.userScrolling = true;
        return;
      } else {
        this.userScrolling = false;
        event.preventDefault();
      }
      offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

      var towards = offsetLeft < 0 ? 'next' : 'prev';

      if (dragState.prevPage && towards === 'prev') {
        this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
      }
      this.translate(dragState.dragPage, offsetLeft);
      if (dragState.nextPage && towards === 'next') {
        this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
      }
    },

    doOnTouchEnd: function doOnTouchEnd() {
      if (this.noDrag) return;

      var dragState = this.dragState;

      var dragDuration = new Date() - dragState.startTime;
      var towards = null;

      var offsetLeft = dragState.currentLeft - dragState.startLeft;
      var offsetTop = dragState.currentTop - dragState.startTop;
      var pageWidth = dragState.pageWidth;
      var index = this.index;
      var pageCount = this.pages.length;

      if (dragDuration < 300) {
        var fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true;
        }
        if (fireTap) {
          this.$children[this.index].$emit('tap');
        }
      }

      if (dragDuration < 300 && dragState.currentLeft === undefined) return;

      if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
        towards = offsetLeft < 0 ? 'next' : 'prev';
      }

      if (!this.continuous) {
        if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
          towards = null;
        }
      }

      if (this.$children.length < 2) {
        towards = null;
      }

      this.doAnimate(towards, {
        offsetLeft: offsetLeft,
        pageWidth: dragState.pageWidth,
        prevPage: dragState.prevPage,
        currentPage: dragState.dragPage,
        nextPage: dragState.nextPage
      });

      this.dragState = {};
    },

    clearTimer: function clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  destroyed: function destroyed() {
    if (this.timer) {
      this.clearTimer();
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer);
      this.reInitTimer = null;
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.ready = true;

    if (this.auto > 0) {
      this.timer = setInterval(function () {
        if (!this$1.continuous && (this$1.index >= this$1.pages.length - 1)) {
          return this$1.clearTimer();
        }
        if (!this$1.dragging && !this$1.animating) {
          this$1.next();
        }
      }, this.auto);
    }

    this.reInitPages();

    var element = this.$el;

    element.addEventListener('touchstart', function (event) {
      if (this$1.prevent) {
        event.preventDefault();
      }
      if (this$1.animating) return;
      this$1.dragging = true;
      this$1.userScrolling = false;
      this$1.doOnTouchStart(event);
    });

    element.addEventListener('touchmove', function (event) {
      if (!this$1.dragging) return;
      this$1.doOnTouchMove(event);
    });

    element.addEventListener('touchend', function (event) {
      if (this$1.userScrolling) {
        this$1.dragging = false;
        this$1.dragState = {};
        return;
      }
      if (!this$1.dragging) return;
      this$1.doOnTouchEnd(event);
      this$1.dragging = false;
    });
  }
};


/***/ }

/******/ });