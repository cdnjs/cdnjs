(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueMaterial"] = factory();
	else
		root["VueMaterial"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(109);


/***/ },

/***/ 92:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getClosestVueParent = function getClosestVueParent($parent, cssClass) {
	  if (!$parent.$el) {
	    return false;
	  }
	
	  if ($parent._uid === 0) {
	    return false;
	  }
	
	  if ($parent.$el.classList.contains(cssClass)) {
	    return $parent;
	  }
	
	  return getClosestVueParent($parent.$parent, cssClass);
	};
	
	exports.default = getClosestVueParent;
	module.exports = exports["default"];

/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = install;
	
	var _mdMenu = __webpack_require__(110);
	
	var _mdMenu2 = _interopRequireDefault(_mdMenu);
	
	var _mdMenuItem = __webpack_require__(116);
	
	var _mdMenuItem2 = _interopRequireDefault(_mdMenuItem);
	
	var _mdMenuContent = __webpack_require__(120);
	
	var _mdMenuContent2 = _interopRequireDefault(_mdMenuContent);
	
	var _mdMenu3 = __webpack_require__(123);
	
	var _mdMenu4 = _interopRequireDefault(_mdMenu3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function install(Vue) {
	  Vue.component('md-menu', Vue.extend(_mdMenu2.default));
	  Vue.component('md-menu-item', Vue.extend(_mdMenuItem2.default));
	  Vue.component('md-menu-content', Vue.extend(_mdMenuContent2.default));
	
	  Vue.material.styles.push(_mdMenu4.default);
	}
	module.exports = exports['default'];

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!./../../../node_modules/extract-text-webpack-plugin/loader.js?{\"remove\":true}!css!vue-loader/lib/style-rewriter?id=data-v-008203e6!sass!./mdMenu.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	
	/* script */
	__vue_exports__ = __webpack_require__(112)
	
	/* template */
	var __vue_template__ = __webpack_require__(115)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenu.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-008203e6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-008203e6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenu.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _transitionEndEventName = __webpack_require__(113);
	
	var _transitionEndEventName2 = _interopRequireDefault(_transitionEndEventName);
	
	var _getInViewPosition = __webpack_require__(114);
	
	var _getInViewPosition2 = _interopRequireDefault(_getInViewPosition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  props: {
	    mdSize: {
	      type: [Number, String],
	      default: 0
	    },
	    mdDirection: {
	      type: String,
	      default: 'bottom right'
	    },
	    mdCloseOnSelect: {
	      type: Boolean,
	      default: true
	    }
	  },
	  data: function data() {
	    return {
	      browserMargin: 8,
	      active: false
	    };
	  },
	
	  watch: {
	    mdSize: function mdSize(current, previous) {
	      if (current >= 1 && current <= 7) {
	        this.removeLastSizeMenuContentClass(previous);
	        this.addNewSizeMenuContentClass(current);
	      }
	    },
	    mdDirection: function mdDirection(current, previous) {
	      this.removeLastDirectionMenuContentClass(previous);
	      this.addNewDirectionMenuContentClass(current);
	    }
	  },
	  methods: {
	    validateMenu: function validateMenu() {
	      if (!this.menuContent) {
	        this.$destroy();
	
	        throw new Error('You must have a md-menu-content inside your menu.');
	      }
	
	      if (!this.menuTrigger) {
	        this.$destroy();
	
	        throw new Error('You must have an element with a md-menu-trigger attribute inside your menu.');
	      }
	    },
	    removeLastSizeMenuContentClass: function removeLastSizeMenuContentClass(size) {
	      this.menuContent.classList.remove('md-size-' + size);
	    },
	    removeLastDirectionMenuContentClass: function removeLastDirectionMenuContentClass(direction) {
	      this.menuContent.classList.remove('md-direction-' + direction.replace(' ', '-'));
	    },
	    addNewSizeMenuContentClass: function addNewSizeMenuContentClass(size) {
	      this.menuContent.classList.add('md-size-' + size);
	    },
	    addNewDirectionMenuContentClass: function addNewDirectionMenuContentClass(direction) {
	      this.menuContent.classList.add('md-direction-' + direction.replace(' ', '-'));
	    },
	    closeOnOffClick: function closeOnOffClick(event) {
	      if (!this.$el.contains(event.target) && !this.menuContent.contains(event.target)) {
	        this.close();
	      }
	    },
	    getBottomRightPos: function getBottomRightPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top,
	        left: menuTriggerRect.left
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getBottomLeftPos: function getBottomLeftPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top,
	        left: menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getTopRightPos: function getTopRightPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight,
	        left: menuTriggerRect.left
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    getTopLeftPos: function getTopLeftPos() {
	      var menuTriggerRect = this.menuTrigger.getBoundingClientRect();
	      var position = {
	        top: menuTriggerRect.top + menuTriggerRect.height - this.menuContent.offsetHeight,
	        left: menuTriggerRect.left - this.menuContent.offsetWidth + menuTriggerRect.width
	      };
	
	      position = (0, _getInViewPosition2.default)(this.menuContent, position);
	
	      return position;
	    },
	    calculateMenuContentPos: function calculateMenuContentPos() {
	      var position = void 0;
	
	      switch (this.mdDirection) {
	        case 'bottom left':
	          position = this.getBottomLeftPos();
	
	          break;
	
	        case 'top right':
	          position = this.getTopRightPos();
	
	          break;
	
	        case 'top left':
	          position = this.getTopLeftPos();
	
	          break;
	
	        default:
	          position = this.getBottomRightPos();
	      }
	
	      this.menuContent.style.top = position.top + 'px';
	      this.menuContent.style.left = position.left + 'px';
	    },
	    recalculateOnResize: function recalculateOnResize() {
	      window.requestAnimationFrame(this.calculateMenuContentPos);
	    },
	    open: function open() {
	      if (this.$root.$el.contains(this.menuContent)) {
	        this.$root.$el.removeChild(this.menuContent);
	      }
	
	      this.$root.$el.appendChild(this.menuContent);
	      document.addEventListener('click', this.closeOnOffClick);
	      window.addEventListener('resize', this.recalculateOnResize);
	
	      this.calculateMenuContentPos();
	
	      getComputedStyle(this.menuContent).top;
	      this.menuContent.classList.add('md-active');
	      this.menuContent.focus();
	      this.active = true;
	    },
	    close: function close() {
	      var _this = this;
	
	      var menuContent = this.menuContent;
	      var close = function close(event) {
	        if (menuContent && event.target === menuContent) {
	          var activeRipple = _this.menuContent.querySelector('.md-ripple.md-active');
	
	          menuContent.removeEventListener(_transitionEndEventName2.default, close);
	          _this.menuTrigger.focus();
	          _this.active = false;
	
	          if (activeRipple) {
	            activeRipple.classList.remove('md-active');
	          }
	
	          _this.$root.$el.removeChild(menuContent);
	          document.removeEventListener('click', _this.closeOnOffClick);
	          window.removeEventListener('resize', _this.recalculateOnResize);
	        }
	      };
	
	      this.menuContent.addEventListener(_transitionEndEventName2.default, close);
	      this.menuContent.classList.remove('md-active');
	    },
	    toggle: function toggle() {
	      if (this.active) {
	        this.close();
	      } else {
	        this.open();
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.menuTrigger = this.$el.querySelector('[md-menu-trigger]');
	    this.menuContent = this.$el.querySelector('.md-menu-content');
	    this.validateMenu();
	    this.addNewSizeMenuContentClass(this.mdSize);
	    this.addNewDirectionMenuContentClass(this.mdDirection);
	    this.menuContent.parentNode.removeChild(this.menuContent);
	    this.menuTrigger.addEventListener('click', this.toggle);
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 113:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function transitionEndEventName() {
	  var el = document.createElement('span');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };
	
	  for (var transition in transitions) {
	    if (el.style[transition] !== undefined) {
	      return transitions[transition];
	    }
	  }
	}
	
	exports.default = transitionEndEventName();
	module.exports = exports['default'];

/***/ },

/***/ 114:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var margin = 8;
	
	var isAboveOfViewport = function isAboveOfViewport(element, position) {
	  return position.top <= margin - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isBelowOfViewport = function isBelowOfViewport(element, position) {
	  return position.top + element.offsetHeight + margin >= window.innerHeight - parseInt(getComputedStyle(element).marginTop, 10);
	};
	
	var isOnTheLeftOfViewport = function isOnTheLeftOfViewport(element, position) {
	  return position.left <= margin - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var isOnTheRightOfViewport = function isOnTheRightOfViewport(element, position) {
	  return position.left + element.offsetWidth + margin >= window.innerWidth - parseInt(getComputedStyle(element).marginLeft, 10);
	};
	
	var getInViewPosition = function getInViewPosition(element, position) {
	  var computedStyle = getComputedStyle(element);
	
	  if (isAboveOfViewport(element, position)) {
	    position.top = margin - parseInt(computedStyle.marginTop, 10);
	  }
	
	  if (isOnTheLeftOfViewport(element, position)) {
	    position.left = margin - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isOnTheRightOfViewport(element, position)) {
	    position.left = window.innerWidth - margin - element.offsetWidth - parseInt(computedStyle.marginLeft, 10);
	  }
	
	  if (isBelowOfViewport(element, position)) {
	    position.top = window.innerHeight - margin - element.offsetHeight - parseInt(computedStyle.marginTop, 10);
	  }
	
	  return position;
	};
	
	exports.default = getInViewPosition;
	module.exports = exports["default"];

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-menu"
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-008203e6", module.exports)
	  }
	}

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(117)
	
	/* template */
	var __vue_template__ = __webpack_require__(119)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenuItem.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5cf45940", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5cf45940", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenuItem.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getClosestVueParent = __webpack_require__(92);
	
	var _getClosestVueParent2 = _interopRequireDefault(_getClosestVueParent);
	
	__webpack_require__(118);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	exports.default = {
	  props: {
	    disabled: Boolean
	  },
	  data: function data() {
	    return {
	      parentContent: {},
	      index: 0
	    };
	  },
	  computed: {
	    classes: function classes() {
	      return {
	        'md-highlighted': this.highlighted
	      };
	    },
	    highlighted: function highlighted() {
	      if (this.index === this.parentContent.highlighted) {
	        if (this.disabled) {
	          if (this.parentContent.oldHighlight > this.parentContent.highlighted) {
	            this.parentContent.highlighted--;
	          } else {
	            this.parentContent.highlighted++;
	          }
	        }
	
	        if (this.index === 1) {
	          this.parentContent.$el.scrollTop = 0;
	        } else if (this.index === this.parentContent.itemsAmount) {
	          this.parentContent.$el.scrollTop = this.parentContent.$el.scrollHeight;
	        } else {
	          this.$el.scrollIntoViewIfNeeded(false);
	        }
	
	        return true;
	      }
	
	      return false;
	    }
	  },
	  methods: {
	    close: function close() {
	      if (!this.disabled) {
	        if (this.parentMenu.mdCloseOnSelect) {
	          this.parentContent.close();
	        }
	
	        this.$emit('click');
	      }
	    }
	  },
	  mounted: function mounted() {
	    this.parentContent = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu-content');
	    this.parentMenu = (0, _getClosestVueParent2.default)(this.$parent, 'md-menu');
	
	    if (!this.parentContent) {
	      this.$destroy();
	
	      throw new Error('You must wrap the md-menu-item in a md-menu-content');
	    }
	
	    this.parentContent.itemsAmount++;
	    this.index = this.parentContent.itemsAmount;
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 118:
/***/ function(module, exports) {

	if (!Element.prototype.scrollIntoViewIfNeeded) {
	  Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
	    centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
	
	    var parent = this.parentNode,
	        parentComputedStyle = window.getComputedStyle(parent, null),
	        parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
	        parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
	        overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
	        overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
	        overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
	        overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
	        alignWithTop = overTop && !overBottom;
	
	    if ((overTop || overBottom) && centerIfNeeded) {
	      parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
	    }
	
	    if ((overLeft || overRight) && centerIfNeeded) {
	      parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
	    }
	
	    if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
	      this.scrollIntoView(alignWithTop);
	    }
	  };
	}

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('md-list-item', {
	    staticClass: "md-menu-item",
	    class: _vm.classes,
	    attrs: {
	      "disabled": _vm.disabled
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5cf45940", module.exports)
	  }
	}

/***/ },

/***/ 120:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(121)
	
	/* template */
	var __vue_template__ = __webpack_require__(122)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/marcosmoura/Projects/github/vue-material/src/components/mdMenu/mdMenuContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-518d815c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-518d815c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] mdMenuContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },

/***/ 121:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	
	exports.default = {
	  data: function data() {
	    return {
	      oldHighlight: false,
	      highlighted: false,
	      itemsAmount: 0
	    };
	  },
	
	  methods: {
	    close: function close() {
	      this.highlighted = false;
	      this.$parent.close();
	    },
	    highlightItem: function highlightItem(direction) {
	      this.oldHighlight = this.highlighted;
	
	      if (direction === 'up') {
	        if (this.highlighted === 1) {
	          this.highlighted = this.itemsAmount;
	        } else {
	          this.highlighted--;
	        }
	      }
	
	      if (direction === 'down') {
	        if (this.highlighted === this.itemsAmount) {
	          this.highlighted = 1;
	        } else {
	          this.highlighted++;
	        }
	      }
	    },
	    fireClick: function fireClick() {
	      if (this.highlighted > 0) {
	        this.$children[0].$children[this.highlighted - 1].$el.click();
	      }
	    }
	  },
	  mounted: function mounted() {
	    if (!this.$parent.$el.classList.contains('md-menu')) {
	      this.$destroy();
	
	      throw new Error('You must wrap the md-menu-content in a md-menu');
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "md-menu-content",
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "keydown": [function($event) {
	        if ($event.keyCode !== 27) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if ($event.keyCode !== 9) { return; }
	        $event.preventDefault();
	        _vm.close($event)
	      }, function($event) {
	        if ($event.keyCode !== 38) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('up')
	      }, function($event) {
	        if ($event.keyCode !== 40) { return; }
	        $event.preventDefault();
	        _vm.highlightItem('down')
	      }, function($event) {
	        if ($event.keyCode !== 13) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }, function($event) {
	        if ($event.keyCode !== 32) { return; }
	        $event.preventDefault();
	        _vm.fireClick($event)
	      }]
	    }
	  }, [_vm._h('md-list', [_vm._t("default")])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-518d815c", module.exports)
	  }
	}

/***/ },

/***/ 123:
/***/ function(module, exports) {

	module.exports = ""

/***/ }

/******/ })
});
;
//# sourceMappingURL=index.debug.js.map