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

	module.exports = __webpack_require__(201);


/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(202);

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vueSwipe = __webpack_require__(203);

	__webpack_require__(204);

	_vueSwipe.Swipe.name = 'mt-swipe';
	module.exports = _vueSwipe.Swipe;

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueSwipe=e():t.VueSwipe=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.SwipeItem=e.Swipe=void 0;var s=n(12),r=i(s),a=n(11),o=i(a);e.Swipe=r["default"],e.SwipeItem=o["default"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={name:"mt-swipe-item",ready:function(){this.$dispatch("swipeItemCreated",this)},detached:function(){this.$dispatch("swipeItemDestroyed",this)},destroyed:function(){this.$dispatch("swipeItemDestroyed",this)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(6);e["default"]={name:"mt-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{speed:{type:Number,"default":300},auto:{type:Number,"default":3e3},continuous:{type:Boolean,"default":!0},showIndicators:{type:Boolean,"default":!0},noDragWhenSingle:{type:Boolean,"default":!0},prevent:{type:Boolean,"default":!1}},events:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))}},methods:{translate:function(t,e,n,s){var r=this,a=arguments;if(n){this.animating=!0,t.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out",setTimeout(function(){return t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var o=!1,l=function(){o||(o=!0,r.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",s&&s.apply(r,a))};(0,i.once)(t,"webkitTransitionEnd",l),setTimeout(l,n+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[];this.index=0,t.forEach(function(t,n){e.push(t.$el),(0,i.removeClass)(t.$el,"active"),0===n&&(0,i.addClass)(t.$el,"active")}),this.pages=e},doAnimate:function(t,e){var n=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var s,r,a,o,l,u=this.speed||300,c=this.index,d=this.pages,f=d.length;e?(s=e.prevPage,a=e.currentPage,r=e.nextPage,o=e.pageWidth,l=e.offsetLeft):(o=this.$el.clientWidth,a=d[c],s=d[c-1],r=d[c+1],this.continuous&&d.length>1&&(s||(s=d[d.length-1]),r||(r=d[0])),s&&(s.style.display="block",this.translate(s,-o)),r&&(r.style.display="block",this.translate(r,o)));var p,h=this.$children[c].$el;"prev"===t?(c>0&&(p=c-1),this.continuous&&0===c&&(p=f-1)):"next"===t&&(f-1>c&&(p=c+1),this.continuous&&c===f-1&&(p=0));var g=function(){if(void 0!==p){var t=n.$children[p].$el;(0,i.removeClass)(h,"active"),(0,i.addClass)(t,"active"),n.index=p}s&&(s.style.display=""),r&&(r.style.display="")};setTimeout(function(){"next"===t?(n.translate(a,-o,u,g),r&&n.translate(r,0,u)):"prev"===t?(n.translate(a,o,u,g),s&&n.translate(s,0,u)):(n.translate(a,0,u,g),"undefined"!=typeof l?(s&&l>0&&n.translate(s,-1*o,u),r&&0>l&&n.translate(r,o,u)):(s&&n.translate(s,-1*o,u),r&&n.translate(r,o,u)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},doOnTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,i=t.touches[0];n.startTime=new Date,n.startLeft=i.pageX,n.startTop=i.pageY,n.startTopAbsolute=i.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var s=this.$children[this.index-1],r=this.$children[this.index],a=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(s||(s=this.$children[this.$children.length-1]),a||(a=this.$children[0])),n.prevPage=s?s.$el:null,n.dragPage=r?r.$el:null,n.nextPage=a?a.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},doOnTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var i=e.currentLeft-e.startLeft,s=e.currentTopAbsolute-e.startTopAbsolute,r=Math.abs(i),a=Math.abs(s);if(5>r||r>=5&&a>=1.73*r)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),i=Math.min(Math.max(-e.pageWidth+1,i),e.pageWidth-1);var o=0>i?"next":"prev";e.prevPage&&"prev"===o&&this.translate(e.prevPage,i-e.pageWidth),this.translate(e.dragPage,i),e.nextPage&&"next"===o&&this.translate(e.nextPage,i+e.pageWidth)}},doOnTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,i=t.currentLeft-t.startLeft,s=t.currentTop-t.startTop,r=t.pageWidth,a=this.index,o=this.pages.length;if(300>e){var l=Math.abs(i)<5&&Math.abs(s)<5;(isNaN(i)||isNaN(s))&&(l=!0),l&&this.$children[this.index].$emit("tap")}300>e&&void 0===t.currentLeft||((300>e||Math.abs(i)>r/2)&&(n=0>i?"next":"prev"),this.continuous||(0===a&&"prev"===n||a===o-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:i,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},ready:function(){var t=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){t.dragging||t.animating||t.next()},this.auto)),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.doOnTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&t.doOnTouchMove(e)}),e.addEventListener("touchend",function(e){return t.userScrolling?(t.dragging=!1,void(t.dragState={})):void(t.dragging&&(t.doOnTouchEnd(e),t.dragging=!1))})}}},function(t,e){"use strict";var n=function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")},i=function(t,e){if(!t||!e)return!1;if(-1!=e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1},s=function(t,e){if(t){for(var n=t.className,s=(e||"").split(" "),r=0,a=s.length;a>r;r++){var o=s[r];o&&(t.classList?t.classList.add(o):i(t,o)||(n+=" "+o))}t.classList||(t.className=n)}},r=function(t,e){if(t&&e){for(var s=e.split(" "),r=" "+t.className+" ",a=0,o=s.length;o>a;a++){var l=s[a];l&&(t.classList?t.classList.remove(l):i(t,l)&&(r=r.replace(" "+l+" "," ")))}t.classList||(t.className=n(r))}};t.exports={hasClass:i,addClass:s,removeClass:r}},function(t,e){"use strict";var n=function i(t,e){if(!t)return null;var n,s;if("string"==typeof t)return document.createTextNode(t);if(t.tag){n=document.createElement(t.tag);for(var r in t)if(t.hasOwnProperty(r)){if("content"===r||"tag"===r)continue;if("key"===r&&e){var a=t[r];a&&(e[a]=n);continue}n[r]=t[r]}var o=t.content;if(o)if("string"==typeof o)s=document.createTextNode(o),n.appendChild(s);else{o instanceof Array||(o=[o]);for(var l=0,u=o.length;u>l;l++){var c=o[l];s=i(c,e),n.appendChild(s)}}}return n};t.exports=n},function(t,e){"use strict";var n=function(){return document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),i=function(){return document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),s=function(t,e,s){var r=function a(){s&&s.apply(this,arguments),i(t,e,a)};n(t,e,r)};t.exports={on:n,off:i,once:s}},function(t,e,n){"use strict";var i=n(3),s=n(5),r=n(7),a=n(4);t.exports={on:s.on,off:s.off,once:s.once,getStyle:r.getStyle,setStyle:r.setStyle,removeClass:i.removeClass,addClass:i.addClass,hasClass:i.hasClass,create:a}},function(t,e){"use strict";function n(t){return t.replace(s,function(t,e,n,i){return i?n.toUpperCase():n}).replace(r,"Moz$1")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},s=/([\:\-\_]+(.))/g,r=/^moz([A-Z])/,a=Number(document.documentMode),o=9>a?function(t,e){if(!t||!e)return null;e=n(e),"float"===e&&(e="styleFloat");try{switch(e){case"opacity":try{return t.filters.item("alpha").opacity/100}catch(i){return 1}break;default:return t.style[e]||t.currentStyle?t.currentStyle[e]:null}}catch(i){return t.style[e]}}:function(t,e){if(!t||!e)return null;e=n(e),"float"===e&&(e="cssFloat");try{var i=document.defaultView.getComputedStyle(t,"");return t.style[e]||i?i[e]:null}catch(s){return t.style[e]}},l=function u(t,e,s){if(t&&e)if("object"===("undefined"==typeof e?"undefined":i(e)))for(var r in e)e.hasOwnProperty(r)&&u(t,r,e[r]);else e=n(e),"opacity"===e&&9>a?t.style.filter=isNaN(s)?"":"alpha(opacity="+100*s+")":t.style[e]=s};t.exports={getStyle:o,setStyle:l}},function(t,e){},function(t,e){t.exports="<div class=swipe-item> <slot></slot> </div>"},function(t,e){t.exports='<div class=swipe> <div class=swipe-items-wrap v-el:wrap> <slot></slot> </div> <div class=swipe-indicators v-show=showIndicators> <div class=swipe-indicator v-for="page in pages" :class="{ active: $index === index }"></div> </div> </div>'},function(t,e,n){var i,s;i=n(1),s=n(9),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options:t.exports).template=s)},function(t,e,n){var i,s;n(8),i=n(2),s=n(10),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options:t.exports).template=s)}])});

/***/ },

/***/ 204:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });