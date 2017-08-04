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

	module.exports = __webpack_require__(87);


/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(88);

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vueInfiniteScroll = __webpack_require__(89);

	__webpack_require__(90);

	_vueInfiniteScroll.infiniteScroll.name = 'infinite-scroll';
	_vueInfiniteScroll.infiniteScroll.install = _vueInfiniteScroll.install;
	module.exports = _vueInfiniteScroll.infiniteScroll;

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.infiniteScroll = global.infiniteScroll || {})));
	}(this, function (exports) { 'use strict';

	  var throttle = function throttle(fn, delay) {
	    var now, lastExec, timer, context, args; //eslint-disable-line

	    var execute = function execute() {
	      fn.apply(context, args);
	      lastExec = now;
	    };

	    return function () {
	      context = this;
	      args = arguments;

	      now = Date.now();

	      if (timer) {
	        clearTimeout(timer);
	        timer = null;
	      }

	      if (lastExec) {
	        var diff = delay - (now - lastExec);
	        if (diff < 0) {
	          execute();
	        } else {
	          timer = setTimeout(function () {
	            execute();
	          }, diff);
	        }
	      } else {
	        execute();
	      }
	    };
	  };

	  var getScrollTop = function getScrollTop(element) {
	    if (element === window) {
	      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
	    }

	    return element.scrollTop;
	  };

	  var getComputedStyle = document.defaultView.getComputedStyle;

	  var getScrollEventTarget = function getScrollEventTarget(element) {
	    var currentNode = element;
	    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
	    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
	      var overflowY = getComputedStyle(currentNode).overflowY;
	      if (overflowY === 'scroll' || overflowY === 'auto') {
	        return currentNode;
	      }
	      currentNode = currentNode.parentNode;
	    }
	    return window;
	  };

	  var getVisibleHeight = function getVisibleHeight(element) {
	    if (element === window) {
	      return document.documentElement.clientHeight;
	    }

	    return element.clientHeight;
	  };

	  var getElementTop = function getElementTop(element) {
	    if (element === window) {
	      return getScrollTop(window);
	    }
	    return element.getBoundingClientRect().top + getScrollTop(window);
	  };

	  var isAttached = function isAttached(element) {
	    var currentNode = element.parentNode;
	    while (currentNode) {
	      if (currentNode.tagName === 'HTML') {
	        return true;
	      }
	      if (currentNode.nodeType === 11) {
	        return false;
	      }
	      currentNode = currentNode.parentNode;
	    }
	    return false;
	  };

	  var infiniteScroll = {
	    doBind: function doBind() {
	      if (this.binded) return; // eslint-disable-line
	      this.binded = true;

	      var directive = this;
	      var element = directive.el;

	      directive.scrollEventTarget = getScrollEventTarget(element);
	      directive.scrollListener = throttle(directive.doCheck.bind(directive), 200);
	      directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

	      var disabledExpr = element.getAttribute('infinite-scroll-disabled');
	      var disabled = false;

	      if (disabledExpr) {
	        this.vm.$watch(disabledExpr, function (value) {
	          directive.disabled = value;
	          if (!value && directive.immediateCheck) {
	            directive.doCheck();
	          }
	        });
	        disabled = Boolean(directive.vm.$get(disabledExpr));
	      }
	      directive.disabled = disabled;

	      var distanceExpr = element.getAttribute('infinite-scroll-distance');
	      var distance = 0;
	      if (distanceExpr) {
	        distance = Number(directive.vm.$get(distanceExpr));
	        if (isNaN(distance)) {
	          distance = 0;
	        }
	      }
	      directive.distance = distance;

	      var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
	      var immediateCheck = true;
	      if (immediateCheckExpr) {
	        immediateCheck = Boolean(directive.vm.$get(immediateCheckExpr));
	      }
	      directive.immediateCheck = immediateCheck;

	      if (immediateCheck) {
	        directive.doCheck();
	      }

	      var eventName = element.getAttribute('infinite-scroll-listen-for-event');
	      if (eventName) {
	        directive.vm.$on(eventName, function () {
	          directive.doCheck();
	        });
	      }
	    },

	    doCheck: function doCheck(force) {
	      var scrollEventTarget = this.scrollEventTarget;
	      var element = this.el;
	      var distance = this.distance;

	      if (force !== true && this.disabled) return; //eslint-disable-line
	      var viewportScrollTop = getScrollTop(scrollEventTarget);
	      var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

	      var shouldTrigger = false;

	      if (scrollEventTarget === element) {
	        shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
	      } else {
	        var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

	        shouldTrigger = viewportBottom + distance >= elementBottom;
	      }

	      if (shouldTrigger && this.expression) {
	        this.vm.$get(this.expression);
	      }
	    },

	    bind: function bind() {
	      var directive = this;
	      var element = this.el;

	      directive.vm.$on('hook:ready', function () {
	        if (isAttached(element)) {
	          directive.doBind();
	        }
	      });

	      this.bindTryCount = 0;

	      var tryBind = function tryBind() {
	        if (directive.bindTryCount > 10) return; //eslint-disable-line
	        directive.bindTryCount++;
	        if (isAttached(element)) {
	          directive.doBind();
	        } else {
	          setTimeout(tryBind, 50);
	        }
	      };

	      tryBind();
	    },

	    unbind: function unbind() {
	      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener);
	    }
	  };

	  if (window.Vue) {
	    window.infiniteScroll = infiniteScroll;
	    Vue.use(install);
	  }

	  function install(Vue) {
	    Vue.directive('infiniteScroll', infiniteScroll);
	  }

	  exports.install = install;
	  exports.infiniteScroll = infiniteScroll;

	}));

/***/ },

/***/ 90:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });