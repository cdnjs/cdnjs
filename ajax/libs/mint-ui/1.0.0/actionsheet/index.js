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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(3)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/actionsheet/src/actionsheet.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(13)
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
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vuePopup = __webpack_require__(8);

	var _vuePopup2 = _interopRequireDefault(_vuePopup);

	__webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: 'mt-actionsheet',

	  mixins: [_vuePopup2.default],

	  props: {
	    modal: {
	      default: true
	    },

	    closeOnClickModal: {
	      default: true
	    },

	    lockScroll: {
	      default: false
	    },

	    cancelText: {
	      type: String,
	      default: '取消'
	    },

	    actions: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    }
	  },

	  methods: {
	    itemClick: function itemClick(item) {
	      if (item.method && typeof item.method === 'function') {
	        item.method();
	      }
	      this.visible = false;
	    }
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(9)):"function"==typeof define&&define.amd?define("VuePopup",["vue"],t):"object"==typeof exports?exports.VuePopup=t(require("vue")):e.VuePopup=t(e.vue)}(this,function(e){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};return t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,t,o){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/lib/",t(t.s=5)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(4),l=n(i),s=o(2),r=o(1),d=n(r);o(3);var a=1,u=[],c=function(e){if(u.indexOf(e)===-1){var t=function(e){var t=e.__vue__;if(!t){var o=e.previousSibling;o.__vue__&&(t=o.__vue__)}return t};l["default"].transition(e,{afterEnter:function(e){var o=t(e);o&&o.doAfterOpen&&o.doAfterOpen()},afterLeave:function(e){var o=t(e);o&&o.doAfterClose&&o.doAfterClose()}})}},f=function p(e){return 3===e.nodeType&&(e=e.nextElementSibling||e.nextSibling,p(e)),e};t["default"]={props:{visible:{type:Boolean,twoWay:!0,"default":!1},transition:{type:String,"default":""},openDelay:{},closeDelay:{},zIndex:{},modal:{type:Boolean,"default":!1},lockScroll:{type:Boolean,"default":!0},modalClass:{},closeOnPressEscape:{type:Boolean,"default":!1},closeOnClickModal:{type:Boolean,"default":!1}},created:function(){this.transition&&c(this.transition)},compiled:function(){this._popupId="popup-"+a++,d["default"].register(this._popupId,this)},beforeDestroy:function(){d["default"].deregister(this._popupId),d["default"].closeModal(this._popupId)},data:function(){return{bodyOverflow:null,rendered:!1}},watch:{visible:function(e){var t=this;if(e){if(this._opening)return;this.rendered?this.open():(this.rendered=!0,l["default"].nextTick(function(){t.open()}))}else this.close()}},methods:{open:function(e){var t=this;if(!this.rendered)return this.rendered=!0,void(this.visible=!0);var o=(0,s.merge)({},this,e);this._closeTimer&&(clearTimeout(this._closeTimer),this._closeTimer=null),clearTimeout(this._openTimer);var n=Number(o.openDelay);n>0?this._openTimer=setTimeout(function(){t._openTimer=null,t.doOpen(o)},n):this.doOpen(o)},doOpen:function(e){if(!this.willOpen||this.willOpen()){this._opening=!0,this.visible=!0;var t=f(this.$el),o=e.modal,n=e.zIndex;n&&(d["default"].zIndex=n),o&&(this._closing&&(d["default"].closeModal(this._popupId),this._closing=!1),d["default"].openModal(this._popupId,d["default"].nextZIndex(),t,e.modalClass),e.lockScroll&&(this.bodyOverflow||(this.bodyOverflow=document.body.style.overflow),document.body.style.overflow="hidden")),"static"===getComputedStyle(t).position&&(t.style.position="absolute"),o?t.style.zIndex=d["default"].nextZIndex():n&&(t.style.zIndex=n),this.onOpen&&this.onOpen(),this.transition||this.doAfterOpen()}},doAfterOpen:function(){this._opening=!1},close:function(){var e=this;if(!this.willClose||this.willClose()){null!==this._openTimer&&(clearTimeout(this._openTimer),this._openTimer=null),clearTimeout(this._closeTimer);var t=Number(this.closeDelay);t>0?this._closeTimer=setTimeout(function(){e._closeTimer=null,e.doClose()},t):this.doClose()}},doClose:function(){this.visible=!1,this._closing=!0,this.onClose&&this.onClose(),this.lockScroll&&this.modal&&"hidden"!==this.bodyOverflow&&(document.body.style.overflow=this.bodyOverflow),this.transition||this.doAfterClose()},doAfterClose:function(){d["default"].closeModal(this._popupId),this._closing=!1}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e=l.modalDom;return e||(e=document.createElement("div"),l.modalDom=e,e.addEventListener("touchmove",function(e){e.preventDefault(),e.stopPropagation()})),e},n=function(){l.doOnModalClick&&l.doOnModalClick()},i={},l={zIndex:1e3,getInstance:function(e){return i[e]},register:function(e,t){e&&t&&(i[e]=t)},deregister:function(e){e&&(i[e]=null,delete i[e])},nextZIndex:function(){return l.zIndex++},modalStack:[],doOnModalClick:function(){var e=l.modalStack[l.modalStack.length-1];if(e){var t=l.getInstance(e.id);t&&t.closeOnClickModal&&t.close()}},openModal:function(e,t,i,l){if(e&&void 0!==t){for(var s=this.modalStack,r=0,d=s.length;r<d;r++){var a=s[r];if(a.id===e)return}var u=o();if(setTimeout(function(){u.addEventListener("click",n)},300),u.classList.add("v-modal"),u.classList.add("v-modal-enter"),l){var c=l.trim().split(/\s+/);c.forEach(function(e){return u.classList.add(e)})}setTimeout(function(){u.classList.remove("v-modal-enter")},200),i&&i.parentNode&&11!==i.parentNode.nodeType?i.parentNode.appendChild(u):document.body.appendChild(u),t&&(u.style.zIndex=t),u.style.display="",this.modalStack.push({id:e,zIndex:t,modalClass:l})}},closeModal:function(e){var t=this.modalStack,i=o();if(t.length>0){var l=t[t.length-1];if(l.id===e){if(l.modalClass){var s=l.modalClass.trim().split(/\s+/);s.forEach(function(e){return i.classList.remove(e)})}t.pop(),t.length>0&&(i.style.zIndex=t[t.length-1].zIndex)}else for(var r=t.length-1;r>=0;r--)if(t[r].id===e){t.splice(r,1);break}}0===t.length&&(i.classList.add("v-modal-leave"),setTimeout(function(){0===t.length&&(i.parentNode&&i.parentNode.removeChild(i),i.style.display="none"),i.removeEventListener("click",n),i.classList.remove("v-modal-leave")},200))}};window.addEventListener("keydown",function(e){if(27===e.keyCode&&l.modalStack.length>0){var t=l.modalStack[l.modalStack.length-1];if(!t)return;var o=l.getInstance(t.id);o.closeOnPressEscape&&o.close()}}),t["default"]=l},function(e,t){"use strict";function o(e){for(var t=1,o=arguments.length;t<o;t++){var n=arguments[t];for(var i in n)if(n.hasOwnProperty(i)){var l=n[i];void 0!==l&&(e[i]=l)}}return e}Object.defineProperty(t,"__esModule",{value:!0}),t.merge=o},function(e,t){},function(t,o){t.exports=e},function(e,t,o){e.exports=o(0)}])});
	//# sourceMappingURL=index.js.map

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n<div v-show=\"visible\" class=\"mint-actionsheet\" transition=\"actionsheet-float\">\n  <ul class=\"mint-actionsheet-list\" :style=\"{ 'margin-bottom': cancelText ? '5px' : '0' }\">\n    <li v-for=\"item in actions\" class=\"mint-actionsheet-listitem\" @click=\"itemClick(item)\">{{ item.name }}</li>\n  </ul>\n  <a class=\"mint-actionsheet-button\" @click=\"visible = false\" v-if=\"cancelText\">{{ cancelText }}</a>\n</div>\n";

/***/ }
/******/ ]);