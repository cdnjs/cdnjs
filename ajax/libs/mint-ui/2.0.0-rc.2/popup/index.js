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
/******/ 	return __webpack_require__(__webpack_require__.s = 222);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

module.exports = require("vue");

/***/ },

/***/ 101:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__

/* styles */
__webpack_require__(101)

/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(169)
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

/***/ 169:
/***/ function(module, exports) {

module.exports={render:function (){with(this) {
  return _h('transition', {
    attrs: {
      "name": currentTransition
    }
  }, [_h('div', {
    directives: [{
      name: "show",
      value: (currentValue),
      expression: "currentValue"
    }],
    staticClass: "mint-popup",
    class: [position ? 'mint-popup-' + position : '']
  }, [_t("default")])])
}},staticRenderFns: []}

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_popup_vue__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_popup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_popup_vue__);

module.exports = __WEBPACK_IMPORTED_MODULE_0__src_popup_vue___default.a;


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(0)):"function"==typeof define&&define.amd?define("VuePopup",["vue"],t):"object"==typeof exports?exports.VuePopup=t(require("vue")):e.VuePopup=t(e.vue)}(this,function(e){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,t,o){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/lib/",t(t.s=5)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(4),d=n(i),l=o(2),s=o(1),r=n(s);o(3);var a=1,u=[],c=function(e){if(u.indexOf(e)===-1){var t=function(e){var t=e.__vue__;if(!t){var o=e.previousSibling;o.__vue__&&(t=o.__vue__)}return t};d["default"].transition(e,{afterEnter:function(e){var o=t(e);o&&o.doAfterOpen&&o.doAfterOpen()},afterLeave:function(e){var o=t(e);o&&o.doAfterClose&&o.doAfterClose()}})}},f=void 0,p=function(){if(void 0!==f)return f;var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.position="absolute",e.style.top="-9999px",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var o=document.createElement("div");o.style.width="100%",e.appendChild(o);var n=o.offsetWidth;return e.parentNode.removeChild(e),t-n},h=function m(e){return 3===e.nodeType&&(e=e.nextElementSibling||e.nextSibling,m(e)),e};t["default"]={props:{value:{type:Boolean,"default":!1},transition:{type:String,"default":""},openDelay:{},closeDelay:{},zIndex:{},modal:{type:Boolean,"default":!1},modalFade:{type:Boolean,"default":!0},modalClass:{},closeOnPressEscape:{type:Boolean,"default":!1},closeOnClickModal:{type:Boolean,"default":!1}},created:function(){this.transition&&c(this.transition)},beforeMount:function(){this._popupId="popup-"+a++,r["default"].register(this._popupId,this)},beforeDestroy:function(){r["default"].deregister(this._popupId),r["default"].closeModal(this._popupId)},data:function(){return{opened:!1,bodyOverflow:null,bodyPaddingRight:null,rendered:!1}},watch:{value:function(e){var t=this;if(e){if(this._opening)return;this.rendered?this.open():(this.rendered=!0,d["default"].nextTick(function(){t.open()}))}else this.close()}},methods:{open:function(e){var t=this;if(!this.rendered)return this.rendered=!0,void this.$emit("input",!0);var o=(0,l.merge)({},this,e);this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),clearTimeout(this._openTimer);var n=Number(o.openDelay);n>0?this._openTimer=setTimeout(function(){t._openTimer=null,t.doOpen(o)},n):this.doOpen(o)},doOpen:function(e){if((!this.willOpen||this.willOpen())&&!this.opened){this._opening=!0,this.$emit("input",!0);var t=h(this.$el),o=e.modal,n=e.zIndex;n&&(r["default"].zIndex=n),o&&(this._closing&&(r["default"].closeModal(this._popupId),this._closing=!1),r["default"].openModal(this._popupId,r["default"].nextZIndex(),t,e.modalClass,e.modalFade),this.bodyOverflow||(this.bodyPaddingRight=document.body.style.paddingRight,this.bodyOverflow=document.body.style.overflow),f=p(),f>0&&(document.body.style.paddingRight=f+"px"),document.body.style.overflow="hidden"),"static"===getComputedStyle(t).position&&(t.style.position="absolute"),o?t.style.zIndex=r["default"].nextZIndex():n&&(t.style.zIndex=n),this.opened=!0,this.onOpen&&this.onOpen(),this.transition||this.doAfterOpen()}},doAfterOpen:function(){this._opening=!1},close:function(){var e=this;if(!this.willClose||this.willClose()){null!==this._openTimer&&(clearTimeout(this._openTimer),this._openTimer=null),clearTimeout(this._closeTimer);var t=Number(this.closeDelay);t>0?this._closeTimer=setTimeout(function(){e._closeTimer=null,e.doClose()},t):this.doClose()}},doClose:function(){var e=this;this.$emit("input",!1),this._closing=!0,this.onClose&&this.onClose(),setTimeout(function(){e.modal&&"hidden"!==e.bodyOverflow&&(document.body.style.overflow=e.bodyOverflow,document.body.style.paddingRight=e.bodyPaddingRight),e.bodyOverflow=null,e.bodyPaddingRight=null},200),this.opened=!1,this.transition||this.doAfterClose()},doAfterClose:function(){r["default"].closeModal(this._popupId),this._closing=!1}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e=i.modalDom;return e||(e=document.createElement("div"),i.modalDom=e,e.addEventListener("touchmove",function(e){e.preventDefault(),e.stopPropagation()}),e.addEventListener("click",function(){i.doOnModalClick&&i.doOnModalClick()})),e},n={},i={zIndex:1e3,modalFade:!0,getInstance:function(e){return n[e]},register:function(e,t){e&&t&&(n[e]=t)},deregister:function(e){e&&(n[e]=null,delete n[e])},nextZIndex:function(){return i.zIndex++},modalStack:[],doOnModalClick:function(){var e=i.modalStack[i.modalStack.length-1];if(e){var t=i.getInstance(e.id);t&&t.closeOnClickModal&&t.close()}},openModal:function(e,t,n,i,d){if(e&&void 0!==t){this.modalFade=d;for(var l=this.modalStack,s=0,r=l.length;s<r;s++){var a=l[s];if(a.id===e)return}var u=o();if(u.classList.add("v-modal"),this.modalFade&&u.classList.add("v-modal-enter"),i){var c=i.trim().split(/\s+/);c.forEach(function(e){return u.classList.add(e)})}setTimeout(function(){u.classList.remove("v-modal-enter")},200),n&&n.parentNode&&11!==n.parentNode.nodeType?n.parentNode.appendChild(u):document.body.appendChild(u),t&&(u.style.zIndex=t),u.style.display="",this.modalStack.push({id:e,zIndex:t,modalClass:i})}},closeModal:function(e){var t=this.modalStack,n=o();if(t.length>0){var i=t[t.length-1];if(i.id===e){if(i.modalClass){var d=i.modalClass.trim().split(/\s+/);d.forEach(function(e){return n.classList.remove(e)})}t.pop(),t.length>0&&(n.style.zIndex=t[t.length-1].zIndex)}else for(var l=t.length-1;l>=0;l--)if(t[l].id===e){t.splice(l,1);break}}0===t.length&&(this.modalFade&&n.classList.add("v-modal-leave"),setTimeout(function(){0===t.length&&(n.parentNode&&n.parentNode.removeChild(n),n.style.display="none"),n.classList.remove("v-modal-leave")},200))}};window.addEventListener("keydown",function(e){if(27===e.keyCode&&i.modalStack.length>0){var t=i.modalStack[i.modalStack.length-1];if(!t)return;var o=i.getInstance(t.id);o.closeOnPressEscape&&o.close()}}),t["default"]=i},function(e,t){"use strict";function o(e){for(var t=1,o=arguments.length;t<o;t++){var n=arguments[t];for(var i in n)if(n.hasOwnProperty(i)){var d=n[i];void 0!==d&&(e[i]=d)}}return e}Object.defineProperty(t,"__esModule",{value:!0}),t.merge=o},function(e,t){},function(t,o){t.exports=e},function(e,t,o){e.exports=o(0)}])});
//# sourceMappingURL=index.js.map

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_popup___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_popup__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_popup_lib_popup_css__);
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
  name: 'mt-popup',

  mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_popup___default.a],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    popupTransition: {
      type: String,
      default: 'popup-slide'
    },

    position: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    return {
      currentValue: false,
      currentTransition: this.popupTransition
    };
  },

  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    },

    value: function value(val) {
      this.currentValue = val;
    }
  },

  beforeMount: function beforeMount() {
    if (this.popupTransition !== 'popup-fade') {
      this.currentTransition = "popup-slide-" + (this.position);
    }
  }
};


/***/ },

/***/ 8:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }

/******/ });