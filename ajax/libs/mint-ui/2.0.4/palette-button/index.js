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
/******/ 	return __webpack_require__(__webpack_require__.s = 225);
/******/ })
/************************************************************************/
/******/ ({

/***/ 116:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(116)

/* script */
__vue_exports__ = __webpack_require__(65)

/* template */
var __vue_template__ = __webpack_require__(187)
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

/***/ 187:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('div', {
    staticClass: "mint-palette-button",
    class: {
      expand: expanded, 'mint-palette-button-active': transforming
    },
    on: {
      "animationend": onMainAnimationEnd,
      "webkitanimationend": onMainAnimationEnd,
      "mozanimationend": onMainAnimationEnd
    }
  }, [_h('div', {
    staticClass: "mint-sub-button-container"
  }, [_t("default")]), " ", _h('div', {
    staticClass: "mint-main-button",
    style: (mainButtonStyle),
    on: {
      "touchstart": toggle
    }
  }, ["\n    " + _s(content) + "\n  "])])
}},staticRenderFns: []}

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33);


/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_palette_button_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_palette_button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_palette_button_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_palette_button_vue___default.a;


/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
  name: 'mt-palette-button',
  data: function() {
    return {
      transforming: false,    // 是否正在执行动画
      expanded: false           // 是否已经展开子按钮
    };
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    offset: {
      type: Number,           // 扇面偏移角，默认是四分之π，配合默认方向lt
      default: Math.PI / 4
    },
    direction: {
      type: String,
      default: 'lt'           // lt t rt this.radius rb b lb l 取值有8个方向，左上、上、右上、右、右下、下、左下、左，默认为左上
    },
    radius: {
      type: Number,
      default: 90
    },
    mainButtonStyle: {
      type: String,           // 应用到 mint-main-button 上的 class
      default: ''
    }
  },
  methods: {
    toggle: function toggle(event) {
      if (!this.transforming) {
        if (this.expanded) {
          this.collapse(event);
        } else {
          this.expand(event);
        }
      }
    },
    onMainAnimationEnd: function onMainAnimationEnd(event) {
      this.transforming = false;
      this.$emit('expanded');
    },
    expand: function expand(event) {
      this.expanded = true;
      this.transforming = true;
      this.$emit('expand', event);
    },
    collapse: function collapse(event) {
      this.expanded = false;
      this.$emit('collapse', event);
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.slotChildren = [];
    for (var i = 0; i < this.$slots.default.length; i++) {
      if (this$1.$slots.default[i].elm.nodeType !== 3) {
        this$1.slotChildren.push(this$1.$slots.default[i]);
      }
    }

    var css = '';
    var direction_arc = Math.PI * (3 + Math.max(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'].indexOf(this.direction), 0)) / 4;
    for (var i$1 = 0; i$1 < this.slotChildren.length; i$1++) {
      var arc = (Math.PI - this$1.offset * 2) / (this$1.slotChildren.length - 1) * i$1 + this$1.offset + direction_arc;
      var x = Math.cos(arc) * this$1.radius;
      var y = Math.sin(arc) * this$1.radius;
      var item_css = '.expand .palette-button-' + this$1._uid + '-sub-' + i$1 + '{transform:translate(' + x + 'px,' + y + 'px) rotate(720deg);transition-delay:' + 0.03 * i$1 + 's}';
      css += item_css;

      this$1.slotChildren[i$1].elm.className += (' palette-button-' + this$1._uid + '-sub-' + i$1);
    }

    this.styleNode = document.createElement('style');
    this.styleNode.type = 'text/css';
    this.styleNode.rel = 'stylesheet';
    this.styleNode.title = 'palette button style';
    this.styleNode.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(this.styleNode);
  },
  destroyed: function destroyed() {
    if (this.styleNode) {
      this.styleNode.parentNode.removeChild(this.styleNode);
    }
  }
};


/***/ }

/******/ });