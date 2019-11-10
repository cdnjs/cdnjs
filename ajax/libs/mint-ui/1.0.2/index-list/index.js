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

	module.exports = __webpack_require__(73);


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(74);

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(75)
	__vue_script__ = __webpack_require__(77)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] packages/index-list/src/index-list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(78)
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

/***/ 75:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 77:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  name: 'mt-index-list',

	  props: {
	    height: Number,
	    showIndicator: {
	      type: Boolean,
	      default: true
	    }
	  },

	  data: function data() {
	    return {
	      sections: [],
	      navWidth: 0,
	      indicatorTime: null,
	      moving: false,
	      firstSection: null,
	      currentIndicator: ''
	    };
	  },


	  watch: {
	    sections: function sections() {
	      var _this = this;

	      this.getFirstSection();
	      this.$nextTick(function () {
	        _this.navWidth = _this.$els.nav.clientWidth;
	      });
	    }
	  },

	  methods: {
	    getFirstSection: function getFirstSection() {
	      if (this.sections.length > 0) {
	        this.firstSection = this.sections[0].$el;
	      }
	    },
	    handleTouchStart: function handleTouchStart(e) {
	      if (e.target.tagName !== 'LI') {
	        return;
	      }
	      this.scrollList(e.changedTouches[0].clientY);
	      if (this.indicatorTime) {
	        clearTimeout(this.indicatorTime);
	      }
	      this.moving = true;
	      window.addEventListener('touchmove', this.handleTouchMove);
	      window.addEventListener('touchend', this.handleTouchEnd);
	    },
	    handleTouchMove: function handleTouchMove(e) {
	      e.preventDefault();
	      this.scrollList(e.changedTouches[0].clientY);
	    },
	    handleTouchEnd: function handleTouchEnd() {
	      var _this2 = this;

	      this.indicatorTime = setTimeout(function () {
	        _this2.moving = false;
	        _this2.currentIndicator = '';
	      }, 500);
	      window.removeEventListener('touchmove', this.handleTouchMove);
	      window.removeEventListener('touchend', this.handleTouchEnd);
	    },
	    scrollList: function scrollList(y) {
	      var currentItem = document.elementFromPoint(document.body.clientWidth - 10, y);
	      if (!currentItem || !currentItem.classList.contains('mint-indexlist-navitem')) {
	        return;
	      }
	      this.currentIndicator = currentItem.innerText;
	      var targets = this.sections.filter(function (section) {
	        return section.index === currentItem.innerText;
	      });
	      var targetDOM = void 0;
	      if (targets.length > 0) {
	        targetDOM = targets[0].$el;
	        this.$els.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
	      }
	    }
	  },

	  ready: function ready() {
	    var _this3 = this;

	    if (!this.height) {
	      this.height = document.documentElement.clientHeight - this.$els.content.getBoundingClientRect().top;
	    }
	    this.$nextTick(function () {
	      _this3.navWidth = _this3.$els.nav.clientWidth;
	    });
	    this.getFirstSection();
	  }
	};

/***/ },

/***/ 78:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mint-indexlist\">\n  <ul class=\"mint-indexlist-content\" v-el:content :style=\"{ 'height': height + 'px', 'margin-right': navWidth + 'px'}\">\n    <slot></slot>\n  </ul>\n  \n  <div class=\"mint-indexlist-nav\" @touchstart=\"handleTouchStart\" v-el:nav>\n    <ul class=\"mint-indexlist-navlist\">\n      <li class=\"mint-indexlist-navitem\" v-for=\"section in sections\">{{ section.index }}</li>\n    </ul>\n  </div>\n  \n  <div class=\"mint-indexlist-indicator\" v-if=\"showIndicator\" v-show=\"moving\">{{ currentIndicator }}</div>\n</div>\n";

/***/ }

/******/ });