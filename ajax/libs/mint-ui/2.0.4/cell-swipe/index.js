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

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 211);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell");

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = require("mint-ui/lib/cell/style.css");

/***/ },

/***/ 102:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(102)

/* script */
__vue_exports__ = __webpack_require__(53)

/* template */
var __vue_template__ = __webpack_require__(173)
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

/***/ 173:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('x-cell', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside:touchstart",
      value: (swipeMove),
      expression: "swipeMove",
      arg: "touchstart"
    }],
    ref: "cell",
    staticClass: "mint-cell-swipe",
    attrs: {
      "title": title,
      "icon": icon,
      "label": label,
      "is-link": isLink
    },
    domProps: {
      "value": value
    },
    nativeOn: {
      "click": function($event) {
        swipeMove()
      },
      "touchstart": function($event) {
        startDrag($event)
      },
      "touchmove": function($event) {
        onDrag($event)
      },
      "touchend": function($event) {
        endDrag($event)
      }
    }
  }, [_h('div', {
    ref: "right",
    slot: "right",
    staticClass: "mint-cell-swipe-buttongroup"
  }, [_l((right), function(btn) {
    return _h('a', {
      staticClass: "mint-cell-swipe-button",
      style: (btn.style),
      domProps: {
        "innerHTML": _s(btn.content)
      },
      on: {
        "click": function($event) {
          btn.handler && btn.handler(), swipeMove()
        }
      }
    })
  })]), " ", _h('div', {
    ref: "left",
    slot: "left",
    staticClass: "mint-cell-swipe-buttongroup"
  }, [_l((left), function(btn) {
    return _h('a', {
      staticClass: "mint-cell-swipe-button",
      style: (btn.style),
      domProps: {
        "innerHTML": _s(btn.content)
      },
      on: {
        "click": function($event) {
          btn.handler && btn.handler(), swipeMove()
        }
      }
    })
  })]), " ", _t("default"), " ", ($slots.title) ? _h('span', {
    slot: "title"
  }, [_t("title")]) : _e(), " ", ($slots.icon) ? _h('span', {
    slot: "icon"
  }, [_t("icon")]) : _e()])
}},staticRenderFns: []}

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(131);


/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ },

/***/ 3:
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

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_packages_cell_index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_packages_cell_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mint_ui_packages_cell_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_clickoutside__ = __webpack_require__(9);
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




if (true) {
  __webpack_require__(1);
}

/**
 * mt-cell-swipe
 * @desc 类似 iOS 滑动 Cell 的效果
 * @module components/cell-swipe
 *
 * @example
 * <mt-cell-swipe
 *   :left=[
 *     {
 *       content: 'text',
 *       style: {color: 'white', backgroundColor: 'red'},
 *       handler(e) => console.log(123)
 *     }
 *   ]
 *   :right=[{ content: 'allowed HTML' }]>
 *   swipe me
 * </mt-cell-swipe>
 */
/* harmony default export */ exports["default"] = {
  name: 'mt-cell-swipe',

  components: { XCell: __WEBPACK_IMPORTED_MODULE_1_mint_ui_packages_cell_index_js___default.a },

  directives: { Clickoutside: __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_clickoutside__["a" /* default */] },

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

  mounted: function mounted() {
    this.wrap = this.$refs.cell.$el.querySelector('.mint-cell-wrapper');
    this.leftElm = this.$refs.left;
    this.rightElm = this.$refs.right;
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
      return ("translate3d(" + offset + "px, 0, 0)");
    },

    swipeMove: function swipeMove(offset) {
      if ( offset === void 0 ) offset = 0;

      this.wrap.style.webkitTransform = this.translate3d(offset);
      this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
      this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
      this.swiping = true;
    },

    swipeLeaveTransition: function swipeLeaveTransition(direction) {
      var this$1 = this;

      setTimeout(function () {
        this$1.swipeLeave = true;

        // left
        if (direction > 0 && -this$1.offsetLeft > this$1.rightWidth * 0.4) {
          this$1.swipeMove(-this$1.rightWidth);
          this$1.swiping = false;
          this$1.opened = true;
          return;
        // right
        } else if (direction < 0 && this$1.offsetLeft > this$1.leftWidth * 0.4) {
          this$1.swipeMove(this$1.leftWidth);
          this$1.swiping = false;
          this$1.opened = true;
          return;
        }

        this$1.swipeMove(0);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_wind_dom_src_event__["once"])(this$1.wrap, 'webkitTransitionEnd', function (_) {
          this$1.wrap.style.webkitTransform = '';
          this$1.rightWrapElm.style.webkitTransform = this$1.rightDefaultTransform;
          this$1.leftWrapElm.style.webkitTransform = this$1.leftDefaultTransform;
          this$1.swipeLeave = false;
          this$1.swiping = false;
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
      var swiping;
      var e = evt.changedTouches ? evt.changedTouches[0] : evt;
      var offsetTop = e.pageY - this.start.y;
      var offsetLeft = this.offsetLeft = e.pageX - this.start.x;

      if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
        (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
        (offsetLeft > 0 && !this.leftWidth) ||
        (offsetLeft < 0 && !this.rightWidth)) {
        return;
      }

      var y = Math.abs(offsetTop);
      var x = Math.abs(offsetLeft);

      swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
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

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
var clickoutsideContext = '@@clickoutsideContext';

/* harmony default export */ exports["a"] = {
  bind: function bind(el, binding, vnode) {
    var documentHandler = function(e) {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[clickoutsideContext].methodName]();
      }
    };
    el[clickoutsideContext] = {
      documentHandler: documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    };
    document.addEventListener(el[clickoutsideContext].arg, documentHandler);
  },

  update: function update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression;
  },

  unbind: function unbind(el) {
    document.removeEventListener(
      el[clickoutsideContext].arg,
      el[clickoutsideContext].documentHandler);
  },

  install: function install(Vue) {
    Vue.directive('clickoutside', {
      bind: this.bind,
      unbind: this.unbind
    });
  }
};


/***/ }

/******/ });