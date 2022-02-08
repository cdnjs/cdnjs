(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollLock"] = factory();
	else
		root["scrollLock"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scroll-lock.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scroll-lock.js":
/*!****************************!*\
  !*** ./src/scroll-lock.js ***!
  \****************************/
/*! exports provided: disablePageScroll, enablePageScroll, getScrollState, clearQueueScrollLocks, getTargetScrollBarWidth, getCurrentTargetScrollBarWidth, getPageScrollBarWidth, getCurrentPageScrollBarWidth, addScrollableTarget, removeScrollableTarget, addScrollableSelector, removeScrollableSelector, addLockableTarget, addLockableSelector, setFillGapMethod, addFillGapTarget, removeFillGapTarget, addFillGapSelector, removeFillGapSelector, refillGaps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disablePageScroll", function() { return disablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enablePageScroll", function() { return enablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollState", function() { return getScrollState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function() { return clearQueueScrollLocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function() { return getTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function() { return getCurrentTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function() { return getPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function() { return getCurrentPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function() { return addScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function() { return removeScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function() { return addScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function() { return removeScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableTarget", function() { return addLockableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableSelector", function() { return addLockableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function() { return setFillGapMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function() { return addFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function() { return removeFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function() { return addFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function() { return removeFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refillGaps", function() { return refillGaps; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/tools.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
var TOUCH_DIRECTION_DETECT_OFFSET = 3;
var state = {
  scroll: true,
  queue: 0,
  scrollableSelectors: ['[data-scroll-lock-scrollable]'],
  lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
  fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
  fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
  //
  startTouchY: 0,
  startTouchX: 0
};
var disablePageScroll = function disablePageScroll(target) {
  if (state.queue <= 0) {
    state.scroll = false;
    hideLockableOverflow();
    fillGaps();
  }

  addScrollableTarget(target);
  state.queue++;
};
var enablePageScroll = function enablePageScroll(target) {
  state.queue > 0 && state.queue--;

  if (state.queue <= 0) {
    state.scroll = true;
    showLockableOverflow();
    unfillGaps();
  }

  removeScrollableTarget(target);
};
var getScrollState = function getScrollState() {
  return state.scroll;
};
var clearQueueScrollLocks = function clearQueueScrollLocks() {
  state.queue = 0;
};
var getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
  var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    var currentOverflowYProperty = $target.style.overflowY;

    if (onlyExists) {
      if (!getScrollState()) {
        $target.style.overflowY = $target.dataset.scrollLockSavedOverflowYProperty;
      }
    } else {
      $target.style.overflowY = 'scroll';
    }

    var width = getCurrentTargetScrollBarWidth($target);
    $target.style.overflowY = currentOverflowYProperty;
    return width;
  } else {
    return 0;
  }
};
var getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    if ($target === document.body) {
      var documentWidth = document.documentElement.clientWidth;
      var windowWidth = window.innerWidth;
      var currentWidth = windowWidth - documentWidth;
      return currentWidth;
    } else {
      var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
      var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
      $target.style.borderLeftWidth = '0px';
      $target.style.borderRightWidth = '0px';

      var _currentWidth = $target.offsetWidth - $target.clientWidth;

      $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
      $target.style.borderRightWidth = borderRightWidthCurrentProperty;
      return _currentWidth;
    }
  } else {
    return 0;
  }
};
var getPageScrollBarWidth = function getPageScrollBarWidth() {
  var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return getTargetScrollBarWidth(document.body, onlyExists);
};
var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
  return getCurrentTargetScrollBarWidth(document.body);
};
var addScrollableTarget = function addScrollableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockScrollable = '';
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var removeScrollableTarget = function removeScrollableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          delete $target.dataset.scrollLockScrollable;
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var addScrollableSelector = function addScrollableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.scrollableSelectors.push(selector);
    });
  }
};
var removeScrollableSelector = function removeScrollableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
        return sSelector !== selector;
      });
    });
  }
};
var addLockableTarget = function addLockableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockLockable = '';
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });

    if (!getScrollState()) {
      hideLockableOverflow();
    }
  }
};
var addLockableSelector = function addLockableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.lockableSelectors.push(selector);
    });

    if (!getScrollState()) {
      hideLockableOverflow();
    }

    addFillGapSelector(selector);
  }
};
var setFillGapMethod = function setFillGapMethod(method) {
  if (method) {
    if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
      state.fillGapMethod = method;
      refillGaps();
    } else {
      var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
    }
  }
};
var addFillGapTarget = function addFillGapTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockFillGap = '';

          if (!state.scroll) {
            fillGapTarget($target);
          }
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var removeFillGapTarget = function removeFillGapTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          delete $target.dataset.scrollLockFillGap;

          if (!state.scroll) {
            unfillGapTarget($target);
          }
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var addFillGapSelector = function addFillGapSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.fillGapSelectors.push(selector);

      if (!state.scroll) {
        fillGapSelector(selector);
      }
    });
  }
};
var removeFillGapSelector = function removeFillGapSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
        return fSelector !== selector;
      });

      if (!state.scroll) {
        unfillGapSelector(selector);
      }
    });
  }
};
var refillGaps = function refillGaps() {
  if (!state.scroll) {
    fillGaps();
  }
};

var hideLockableOverflow = function hideLockableOverflow() {
  var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors);
  hideLockableOverflowSelector(selector);
};

var showLockableOverflow = function showLockableOverflow() {
  var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors);
  showLockableOverflowSelector(selector);
};

var hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    hideLockableOverflowTarget($target);
  });
};

var showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    showLockableOverflowTarget($target);
  });
};

var hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target) && $target.dataset.scrollLockLocked !== 'true') {
    var computedStyle = window.getComputedStyle($target);
    $target.dataset.scrollLockSavedOverflowYProperty = computedStyle.overflowY;
    $target.dataset.scrollLockSavedInlineOverflowProperty = $target.style.overflow;
    $target.dataset.scrollLockSavedInlineOverflowYProperty = $target.style.overflowY;
    $target.style.overflow = 'hidden';
    $target.dataset.scrollLockLocked = 'true';
  }
};

var showLockableOverflowTarget = function showLockableOverflowTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target) && $target.dataset.scrollLockLocked === 'true') {
    $target.style.overflow = $target.dataset.scrollLockSavedInlineOverflowProperty;
    $target.style.overflowY = $target.dataset.scrollLockSavedInlineOverflowYProperty;
    delete $target.dataset.scrollLockSavedOverflowYProperty;
    delete $target.dataset.scrollLockSavedInlineOverflowProperty;
    delete $target.dataset.scrollLockSavedInlineOverflowYProperty;
    delete $target.dataset.scrollLockLocked;
  }
};

var fillGaps = function fillGaps() {
  state.fillGapSelectors.map(function (selector) {
    fillGapSelector(selector);
  });
};

var unfillGaps = function unfillGaps() {
  state.fillGapSelectors.map(function (selector) {
    unfillGapSelector(selector);
  });
};

var fillGapSelector = function fillGapSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    fillGapTarget($target, isLockable);
  });
};

var fillGapTarget = function fillGapTarget($target) {
  var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    var scrollBarWidth;

    if ($target.dataset.scrollLockLockable === '' || isLockable) {
      scrollBarWidth = getTargetScrollBarWidth($target, true);
    } else {
      var $lockableParent = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($target, Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors));
      scrollBarWidth = getTargetScrollBarWidth($lockableParent, true);
    }

    if ($target.dataset.scrollLockFilledGap === 'true') {
      unfillGapTarget($target);
    }

    var computedStyle = window.getComputedStyle($target);
    $target.dataset.scrollLockFilledGap = 'true';
    $target.dataset.scrollLockCurrentFillGapMethod = state.fillGapMethod;

    if (state.fillGapMethod === 'margin') {
      var currentMargin = parseFloat(computedStyle.marginRight);
      $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
    } else if (state.fillGapMethod === 'width') {
      $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
    } else if (state.fillGapMethod === 'max-width') {
      $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
    } else if (state.fillGapMethod === 'padding') {
      var currentPadding = parseFloat(computedStyle.paddingRight);
      $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
    }
  }
};

var unfillGapSelector = function unfillGapSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    unfillGapTarget($target);
  });
};

var unfillGapTarget = function unfillGapTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    if ($target.dataset.scrollLockFilledGap === 'true') {
      var currentFillGapMethod = $target.dataset.scrollLockCurrentFillGapMethod;
      delete $target.dataset.scrollLockFilledGap;
      delete $target.dataset.scrollLockCurrentFillGapMethod;

      if (currentFillGapMethod === 'margin') {
        $target.style.marginRight = "";
      } else if (currentFillGapMethod === 'width') {
        $target.style.width = "";
      } else if (currentFillGapMethod === 'max-width') {
        $target.style.maxWidth = "";
      } else if (currentFillGapMethod === 'padding') {
        $target.style.paddingRight = "";
      }
    }
  }
};

var onResize = function onResize(e) {
  refillGaps();
};

var onTouchStart = function onTouchStart(e) {
  if (!state.scroll) {
    state.startTouchY = e.touches[0].clientY;
    state.startTouchX = e.touches[0].clientX;
  }
};

var onTouchMove = function onTouchMove(e) {
  if (!state.scroll) {
    var startTouchY = state.startTouchY,
        startTouchX = state.startTouchX;
    var currentClientY = e.touches[0].clientY;
    var currentClientX = e.touches[0].clientX;

    if (e.touches.length < 2) {
      var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.scrollableSelectors);
      var direction = {
        up: startTouchY < currentClientY,
        down: startTouchY > currentClientY,
        left: startTouchX < currentClientX,
        right: startTouchX > currentClientX
      };
      var directionWithOffset = {
        up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
        down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
        left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
        right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
      };

      var handle = function handle($el) {
        var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if ($el) {
          var parentScrollableEl = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($el, selector, false);

          if (skip || Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementIsScrollableField"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($el, selector) || Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementHasSelector"])($el, selector)) {
            var prevent = false;

            if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
              if (direction.up && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) || direction.down && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el)) {
                prevent = true;
              }
            } else if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el)) {
              if (direction.left && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) || direction.right && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
                prevent = true;
              }
            } else if (directionWithOffset.up && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) || directionWithOffset.down && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el) || directionWithOffset.left && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) || directionWithOffset.right && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
              prevent = true;
            }

            if (prevent) {
              if (parentScrollableEl) {
                handle(parentScrollableEl, true);
              } else {
                e.preventDefault();
              }
            }
          } else {
            handle(parentScrollableEl);
          }
        } else {
          e.preventDefault();
        }
      };

      handle(e.target);
    }
  }
};

var onTouchEnd = function onTouchEnd(e) {
  if (!state.scroll) {
    state.startTouchY = 0;
    state.startTouchX = 0;
  }
};

window.addEventListener('resize', onResize);
document.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchmove', onTouchMove, {
  passive: false
});
document.addEventListener('touchend', onTouchEnd);
var deprecatedMethods = {
  hide: function hide(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
    disablePageScroll(target);
  },
  show: function show(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
    enablePageScroll(target);
  },
  toggle: function toggle(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"toggle" is deprecated! Do not use it.');

    if (getScrollState()) {
      disablePageScroll();
    } else {
      enablePageScroll(target);
    }
  },
  getState: function getState() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
    return getScrollState();
  },
  getWidth: function getWidth() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
    return getPageScrollBarWidth();
  },
  getCurrentWidth: function getCurrentWidth() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
    return getCurrentPageScrollBarWidth();
  },
  setScrollableTargets: function setScrollableTargets(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
    addScrollableTarget(target);
  },
  setFillGapSelectors: function setFillGapSelectors(selector) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
    addFillGapSelector(selector);
  },
  setFillGapTargets: function setFillGapTargets(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
    addFillGapTarget(target);
  },
  clearQueue: function clearQueue() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
    clearQueueScrollLocks();
  }
};

var scrollLock = _objectSpread({
  disablePageScroll: disablePageScroll,
  enablePageScroll: enablePageScroll,
  getScrollState: getScrollState,
  clearQueueScrollLocks: clearQueueScrollLocks,
  getTargetScrollBarWidth: getTargetScrollBarWidth,
  getCurrentTargetScrollBarWidth: getCurrentTargetScrollBarWidth,
  getPageScrollBarWidth: getPageScrollBarWidth,
  getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
  addScrollableSelector: addScrollableSelector,
  removeScrollableSelector: removeScrollableSelector,
  addScrollableTarget: addScrollableTarget,
  removeScrollableTarget: removeScrollableTarget,
  addLockableSelector: addLockableSelector,
  addLockableTarget: addLockableTarget,
  addFillGapSelector: addFillGapSelector,
  removeFillGapSelector: removeFillGapSelector,
  addFillGapTarget: addFillGapTarget,
  removeFillGapTarget: removeFillGapTarget,
  setFillGapMethod: setFillGapMethod,
  refillGaps: refillGaps,
  _state: state
}, deprecatedMethods);

/* harmony default export */ __webpack_exports__["default"] = (scrollLock);

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/*! exports provided: argumentAsArray, isElement, isElementList, eachNode, throwError, arrayAsSelector, nodeListAsArray, findParentBySelector, elementHasSelector, elementHasOverflowHidden, elementScrollTopOnStart, elementScrollTopOnEnd, elementScrollLeftOnStart, elementScrollLeftOnEnd, elementIsScrollableField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argumentAsArray", function() { return argumentAsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementList", function() { return isElementList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eachNode", function() { return eachNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return throwError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayAsSelector", function() { return arrayAsSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeListAsArray", function() { return nodeListAsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParentBySelector", function() { return findParentBySelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementHasSelector", function() { return elementHasSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementHasOverflowHidden", function() { return elementHasOverflowHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollTopOnStart", function() { return elementScrollTopOnStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollTopOnEnd", function() { return elementScrollTopOnEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollLeftOnStart", function() { return elementScrollLeftOnStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollLeftOnEnd", function() { return elementScrollLeftOnEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementIsScrollableField", function() { return elementIsScrollableField; });
var argumentAsArray = function argumentAsArray(argument) {
  return Array.isArray(argument) ? argument : [argument];
};
var isElement = function isElement(target) {
  return target instanceof Node;
};
var isElementList = function isElementList(nodeList) {
  return nodeList instanceof NodeList;
};
var eachNode = function eachNode(nodeList, callback) {
  if (nodeList && callback) {
    nodeList = isElementList(nodeList) ? nodeList : [nodeList];

    for (var i = 0; i < nodeList.length; i++) {
      if (callback(nodeList[i], i, nodeList.length) === true) {
        break;
      }
    }
  }
};
var throwError = function throwError(message) {
  return console.error("[scroll-lock] ".concat(message));
};
var arrayAsSelector = function arrayAsSelector(array) {
  if (Array.isArray(array)) {
    var selector = array.join(', ');
    return selector;
  }
};
var nodeListAsArray = function nodeListAsArray(nodeList) {
  var nodes = [];
  eachNode(nodeList, function (node) {
    return nodes.push(node);
  });
  return nodes;
};
var findParentBySelector = function findParentBySelector($el, selector) {
  var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

  if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
    return $el;
  }

  while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
    ;
  }

  return $el;
};
var elementHasSelector = function elementHasSelector($el, selector) {
  var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
  return has;
};
var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
  if ($el) {
    var computedStyle = getComputedStyle($el);
    var overflowIsHidden = computedStyle.overflow === 'hidden';
    return overflowIsHidden;
  }
};
var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollTop = $el.scrollTop;
    return scrollTop <= 0;
  }
};
var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollTop = $el.scrollTop;
    var scrollHeight = $el.scrollHeight;
    var scrollTopWithHeight = scrollTop + $el.offsetHeight;
    return scrollTopWithHeight >= scrollHeight;
  }
};
var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollLeft = $el.scrollLeft;
    return scrollLeft <= 0;
  }
};
var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollLeft = $el.scrollLeft;
    var scrollWidth = $el.scrollWidth;
    var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
    return scrollLeftWithWidth >= scrollWidth;
  }
};
var elementIsScrollableField = function elementIsScrollableField($el) {
  var selector = 'textarea, [contenteditable="true"]';
  return elementHasSelector($el, selector);
};

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWxvY2suanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JvbGxMb2NrL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9zY3JvbGxMb2NrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njcm9sbExvY2svLi9zcmMvc2Nyb2xsLWxvY2suanMiLCJ3ZWJwYWNrOi8vc2Nyb2xsTG9jay8uL3NyYy90b29scy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzY3JvbGxMb2NrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInNjcm9sbExvY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Njcm9sbC1sb2NrLmpzXCIpO1xuIiwiaW1wb3J0IHtcblx0ZWFjaE5vZGUsXG5cdGFyZ3VtZW50QXNBcnJheSxcblx0aXNFbGVtZW50LFxuXHR0aHJvd0Vycm9yLFxuXHRhcnJheUFzU2VsZWN0b3IsXG5cdGZpbmRQYXJlbnRCeVNlbGVjdG9yLFxuXHRlbGVtZW50U2Nyb2xsVG9wT25TdGFydCxcblx0ZWxlbWVudFNjcm9sbFRvcE9uRW5kLFxuXHRlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQsXG5cdGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQsXG5cdGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCxcblx0ZWxlbWVudEhhc1NlbGVjdG9yXG59IGZyb20gJy4vdG9vbHMnO1xuXG5jb25zdCBGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUyA9IFsncGFkZGluZycsICdtYXJnaW4nLCAnd2lkdGgnLCAnbWF4LXdpZHRoJywgJ25vbmUnXTtcbmNvbnN0IFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUID0gMztcblxuY29uc3Qgc3RhdGUgPSB7XG5cdHNjcm9sbDogdHJ1ZSxcblx0cXVldWU6IDAsXG5cdHNjcm9sbGFibGVTZWxlY3RvcnM6IFsnW2RhdGEtc2Nyb2xsLWxvY2stc2Nyb2xsYWJsZV0nXSxcblx0bG9ja2FibGVTZWxlY3RvcnM6IFsnYm9keScsICdbZGF0YS1zY3JvbGwtbG9jay1sb2NrYWJsZV0nXSxcblx0ZmlsbEdhcFNlbGVjdG9yczogWydib2R5JywgJ1tkYXRhLXNjcm9sbC1sb2NrLWZpbGwtZ2FwXScsICdbZGF0YS1zY3JvbGwtbG9jay1sb2NrYWJsZV0nXSxcblx0ZmlsbEdhcE1ldGhvZDogRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFNbMF0sXG5cdC8vXG5cdHN0YXJ0VG91Y2hZOiAwLFxuXHRzdGFydFRvdWNoWDogMFxufTtcblxuZXhwb3J0IGNvbnN0IGRpc2FibGVQYWdlU2Nyb2xsID0gKHRhcmdldCkgPT4ge1xuXHRpZiAoc3RhdGUucXVldWUgPD0gMCkge1xuXHRcdHN0YXRlLnNjcm9sbCA9IGZhbHNlO1xuXHRcdGhpZGVMb2NrYWJsZU92ZXJmbG93KCk7XG5cdFx0ZmlsbEdhcHMoKTtcblx0fVxuXG5cdGFkZFNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcblx0c3RhdGUucXVldWUrKztcbn07XG5leHBvcnQgY29uc3QgZW5hYmxlUGFnZVNjcm9sbCA9ICh0YXJnZXQpID0+IHtcblx0c3RhdGUucXVldWUgPiAwICYmIHN0YXRlLnF1ZXVlLS07XG5cdGlmIChzdGF0ZS5xdWV1ZSA8PSAwKSB7XG5cdFx0c3RhdGUuc2Nyb2xsID0gdHJ1ZTtcblx0XHRzaG93TG9ja2FibGVPdmVyZmxvdygpO1xuXHRcdHVuZmlsbEdhcHMoKTtcblx0fVxuXG5cdHJlbW92ZVNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcbn07XG5leHBvcnQgY29uc3QgZ2V0U2Nyb2xsU3RhdGUgPSAoKSA9PiB7XG5cdHJldHVybiBzdGF0ZS5zY3JvbGw7XG59O1xuZXhwb3J0IGNvbnN0IGNsZWFyUXVldWVTY3JvbGxMb2NrcyA9ICgpID0+IHtcblx0c3RhdGUucXVldWUgPSAwO1xufTtcbmV4cG9ydCBjb25zdCBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCA9ICgkdGFyZ2V0LCBvbmx5RXhpc3RzID0gZmFsc2UpID0+IHtcblx0aWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuXHRcdGNvbnN0IGN1cnJlbnRPdmVyZmxvd1lQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZO1xuXHRcdGlmIChvbmx5RXhpc3RzKSB7XG5cdFx0XHRpZiAoIWdldFNjcm9sbFN0YXRlKCkpIHtcblx0XHRcdFx0JHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkT3ZlcmZsb3dZUHJvcGVydHk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdCR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XG5cdFx0fVxuXHRcdGNvbnN0IHdpZHRoID0gZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoKCR0YXJnZXQpO1xuXHRcdCR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gY3VycmVudE92ZXJmbG93WVByb3BlcnR5O1xuXG5cdFx0cmV0dXJuIHdpZHRoO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiAwO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aCA9ICgkdGFyZ2V0KSA9PiB7XG5cdGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcblx0XHRpZiAoJHRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSkge1xuXHRcdFx0Y29uc3QgZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcblx0XHRcdGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHRjb25zdCBjdXJyZW50V2lkdGggPSB3aW5kb3dXaWR0aCAtIGRvY3VtZW50V2lkdGg7XG5cblx0XHRcdHJldHVybiBjdXJyZW50V2lkdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IGJvcmRlckxlZnRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoO1xuXHRcdFx0Y29uc3QgYm9yZGVyUmlnaHRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aDtcblx0XHRcdCR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoID0gJzBweCc7XG5cdFx0XHQkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSAnMHB4Jztcblx0XHRcdGNvbnN0IGN1cnJlbnRXaWR0aCA9ICR0YXJnZXQub2Zmc2V0V2lkdGggLSAkdGFyZ2V0LmNsaWVudFdpZHRoO1xuXHRcdFx0JHRhcmdldC5zdHlsZS5ib3JkZXJMZWZ0V2lkdGggPSBib3JkZXJMZWZ0V2lkdGhDdXJyZW50UHJvcGVydHk7XG5cdFx0XHQkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSBib3JkZXJSaWdodFdpZHRoQ3VycmVudFByb3BlcnR5O1xuXG5cdFx0XHRyZXR1cm4gY3VycmVudFdpZHRoO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gMDtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBnZXRQYWdlU2Nyb2xsQmFyV2lkdGggPSAob25seUV4aXN0cyA9IGZhbHNlKSA9PiB7XG5cdHJldHVybiBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aChkb2N1bWVudC5ib2R5LCBvbmx5RXhpc3RzKTtcbn07XG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aCA9ICgpID0+IHtcblx0cmV0dXJuIGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aChkb2N1bWVudC5ib2R5KTtcbn07XG5leHBvcnQgY29uc3QgYWRkU2Nyb2xsYWJsZVRhcmdldCA9ICh0YXJnZXQpID0+IHtcblx0aWYgKHRhcmdldCkge1xuXHRcdGNvbnN0IHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcblx0XHR0YXJnZXRzLm1hcCgoJHRhcmdldHMpID0+IHtcblx0XHRcdGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuXHRcdFx0XHRpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG5cdFx0XHRcdFx0JHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tTY3JvbGxhYmxlID0gJyc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3dFcnJvcihgXCIkeyR0YXJnZXR9XCIgaXMgbm90IGEgRWxlbWVudC5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgcmVtb3ZlU2Nyb2xsYWJsZVRhcmdldCA9ICh0YXJnZXQpID0+IHtcblx0aWYgKHRhcmdldCkge1xuXHRcdGNvbnN0IHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcblx0XHR0YXJnZXRzLm1hcCgoJHRhcmdldHMpID0+IHtcblx0XHRcdGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuXHRcdFx0XHRpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG5cdFx0XHRcdFx0ZGVsZXRlICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2Nyb2xsYWJsZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvd0Vycm9yKGBcIiR7JHRhcmdldH1cIiBpcyBub3QgYSBFbGVtZW50LmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBhZGRTY3JvbGxhYmxlU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0Y29uc3Qgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcblx0XHRzZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuXHRcdFx0c3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycy5wdXNoKHNlbGVjdG9yKTtcblx0XHR9KTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCByZW1vdmVTY3JvbGxhYmxlU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0Y29uc3Qgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcblx0XHRzZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuXHRcdFx0c3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycyA9IHN0YXRlLnNjcm9sbGFibGVTZWxlY3RvcnMuZmlsdGVyKChzU2VsZWN0b3IpID0+IHNTZWxlY3RvciAhPT0gc2VsZWN0b3IpO1xuXHRcdH0pO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGFkZExvY2thYmxlVGFyZ2V0ID0gKHRhcmdldCkgPT4ge1xuXHRpZiAodGFyZ2V0KSB7XG5cdFx0Y29uc3QgdGFyZ2V0cyA9IGFyZ3VtZW50QXNBcnJheSh0YXJnZXQpO1xuXHRcdHRhcmdldHMubWFwKCgkdGFyZ2V0cykgPT4ge1xuXHRcdFx0ZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG5cdFx0XHRcdGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcblx0XHRcdFx0XHQkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0xvY2thYmxlID0gJyc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3dFcnJvcihgXCIkeyR0YXJnZXR9XCIgaXMgbm90IGEgRWxlbWVudC5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0aWYgKCFnZXRTY3JvbGxTdGF0ZSgpKSB7XG5cdFx0XHRoaWRlTG9ja2FibGVPdmVyZmxvdygpO1xuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBjb25zdCBhZGRMb2NrYWJsZVNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG5cdFx0c2VsZWN0b3JzLm1hcCgoc2VsZWN0b3IpID0+IHtcblx0XHRcdHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuXHRcdH0pO1xuXHRcdGlmICghZ2V0U2Nyb2xsU3RhdGUoKSkge1xuXHRcdFx0aGlkZUxvY2thYmxlT3ZlcmZsb3coKTtcblx0XHR9XG5cdFx0YWRkRmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBzZXRGaWxsR2FwTWV0aG9kID0gKG1ldGhvZCkgPT4ge1xuXHRpZiAobWV0aG9kKSB7XG5cdFx0aWYgKEZJTExfR0FQX0FWQUlMQUJMRV9NRVRIT0RTLmluZGV4T2YobWV0aG9kKSAhPT0gLTEpIHtcblx0XHRcdHN0YXRlLmZpbGxHYXBNZXRob2QgPSBtZXRob2Q7XG5cdFx0XHRyZWZpbGxHYXBzKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IG1ldGhvZHMgPSBGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUy5qb2luKCcsICcpO1xuXHRcdFx0dGhyb3dFcnJvcihgXCIke21ldGhvZH1cIiBtZXRob2QgaXMgbm90IGF2YWlsYWJsZSFcXG5BdmFpbGFibGUgZmlsbCBnYXAgbWV0aG9kczogJHttZXRob2RzfS5gKTtcblx0XHR9XG5cdH1cbn07XG5leHBvcnQgY29uc3QgYWRkRmlsbEdhcFRhcmdldCA9ICh0YXJnZXQpID0+IHtcblx0aWYgKHRhcmdldCkge1xuXHRcdGNvbnN0IHRhcmdldHMgPSBhcmd1bWVudEFzQXJyYXkodGFyZ2V0KTtcblx0XHR0YXJnZXRzLm1hcCgoJHRhcmdldHMpID0+IHtcblx0XHRcdGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuXHRcdFx0XHRpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG5cdFx0XHRcdFx0JHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tGaWxsR2FwID0gJyc7XG5cdFx0XHRcdFx0aWYgKCFzdGF0ZS5zY3JvbGwpIHtcblx0XHRcdFx0XHRcdGZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93RXJyb3IoYFwiJHskdGFyZ2V0fVwiIGlzIG5vdCBhIEVsZW1lbnQuYCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUZpbGxHYXBUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG5cdGlmICh0YXJnZXQpIHtcblx0XHRjb25zdCB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG5cdFx0dGFyZ2V0cy5tYXAoKCR0YXJnZXRzKSA9PiB7XG5cdFx0XHRlYWNoTm9kZSgkdGFyZ2V0cywgKCR0YXJnZXQpID0+IHtcblx0XHRcdFx0aWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuXHRcdFx0XHRcdGRlbGV0ZSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxHYXA7XG5cdFx0XHRcdFx0aWYgKCFzdGF0ZS5zY3JvbGwpIHtcblx0XHRcdFx0XHRcdHVuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3dFcnJvcihgXCIkeyR0YXJnZXR9XCIgaXMgbm90IGEgRWxlbWVudC5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgYWRkRmlsbEdhcFNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG5cdFx0c2VsZWN0b3JzLm1hcCgoc2VsZWN0b3IpID0+IHtcblx0XHRcdHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG5cdFx0XHRpZiAoIXN0YXRlLnNjcm9sbCkge1xuXHRcdFx0XHRmaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUZpbGxHYXBTZWxlY3RvciA9IChzZWxlY3RvcikgPT4ge1xuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRjb25zdCBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuXHRcdHNlbGVjdG9ycy5tYXAoKHNlbGVjdG9yKSA9PiB7XG5cdFx0XHRzdGF0ZS5maWxsR2FwU2VsZWN0b3JzID0gc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5maWx0ZXIoKGZTZWxlY3RvcikgPT4gZlNlbGVjdG9yICE9PSBzZWxlY3Rvcik7XG5cdFx0XHRpZiAoIXN0YXRlLnNjcm9sbCkge1xuXHRcdFx0XHR1bmZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWZpbGxHYXBzID0gKCkgPT4ge1xuXHRpZiAoIXN0YXRlLnNjcm9sbCkge1xuXHRcdGZpbGxHYXBzKCk7XG5cdH1cbn07XG5cbmNvbnN0IGhpZGVMb2NrYWJsZU92ZXJmbG93ID0gKCkgPT4ge1xuXHRjb25zdCBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycyk7XG5cdGhpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpO1xufTtcbmNvbnN0IHNob3dMb2NrYWJsZU92ZXJmbG93ID0gKCkgPT4ge1xuXHRjb25zdCBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycyk7XG5cdHNob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpO1xufTtcbmNvbnN0IGhpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcblx0Y29uc3QgJHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0ZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG5cdFx0aGlkZUxvY2thYmxlT3ZlcmZsb3dUYXJnZXQoJHRhcmdldCk7XG5cdH0pO1xufTtcbmNvbnN0IHNob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcblx0Y29uc3QgJHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0ZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG5cdFx0c2hvd0xvY2thYmxlT3ZlcmZsb3dUYXJnZXQoJHRhcmdldCk7XG5cdH0pO1xufTtcbmNvbnN0IGhpZGVMb2NrYWJsZU92ZXJmbG93VGFyZ2V0ID0gKCR0YXJnZXQpID0+IHtcblx0aWYgKGlzRWxlbWVudCgkdGFyZ2V0KSAmJiAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0xvY2tlZCAhPT0gJ3RydWUnKSB7XG5cdFx0Y29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCR0YXJnZXQpO1xuXHRcdCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRPdmVyZmxvd1lQcm9wZXJ0eSA9IGNvbXB1dGVkU3R5bGUub3ZlcmZsb3dZO1xuXHRcdCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRJbmxpbmVPdmVyZmxvd1Byb3BlcnR5ID0gJHRhcmdldC5zdHlsZS5vdmVyZmxvdztcblx0XHQkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dZUHJvcGVydHkgPSAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WTtcblx0XHQkdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0JHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tMb2NrZWQgPSAndHJ1ZSc7XG5cdH1cbn07XG5jb25zdCBzaG93TG9ja2FibGVPdmVyZmxvd1RhcmdldCA9ICgkdGFyZ2V0KSA9PiB7XG5cdGlmIChpc0VsZW1lbnQoJHRhcmdldCkgJiYgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tMb2NrZWQgPT09ICd0cnVlJykge1xuXHRcdCR0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dQcm9wZXJ0eTtcblx0XHQkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WSA9ICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRJbmxpbmVPdmVyZmxvd1lQcm9wZXJ0eTtcblx0XHRkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tTYXZlZE92ZXJmbG93WVByb3BlcnR5O1xuXHRcdGRlbGV0ZSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dQcm9wZXJ0eTtcblx0XHRkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tTYXZlZElubGluZU92ZXJmbG93WVByb3BlcnR5O1xuXHRcdGRlbGV0ZSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0xvY2tlZDtcblx0fVxufTtcblxuY29uc3QgZmlsbEdhcHMgPSAoKSA9PiB7XG5cdHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuXHRcdGZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG5cdH0pO1xufTtcbmNvbnN0IHVuZmlsbEdhcHMgPSAoKSA9PiB7XG5cdHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuXHRcdHVuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcblx0fSk7XG59O1xuY29uc3QgZmlsbEdhcFNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG5cdGNvbnN0ICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdGNvbnN0IGlzTG9ja2FibGUgPSBzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSAhPT0gLTE7XG5cdGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuXHRcdGZpbGxHYXBUYXJnZXQoJHRhcmdldCwgaXNMb2NrYWJsZSk7XG5cdH0pO1xufTtcbmNvbnN0IGZpbGxHYXBUYXJnZXQgPSAoJHRhcmdldCwgaXNMb2NrYWJsZSA9IGZhbHNlKSA9PiB7XG5cdGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcblx0XHRsZXQgc2Nyb2xsQmFyV2lkdGg7XG5cdFx0aWYgKCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrTG9ja2FibGUgPT09ICcnIHx8IGlzTG9ja2FibGUpIHtcblx0XHRcdHNjcm9sbEJhcldpZHRoID0gZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0ICRsb2NrYWJsZVBhcmVudCA9IGZpbmRQYXJlbnRCeVNlbGVjdG9yKCR0YXJnZXQsIGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycykpO1xuXHRcdFx0c2Nyb2xsQmFyV2lkdGggPSBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCgkbG9ja2FibGVQYXJlbnQsIHRydWUpO1xuXHRcdH1cblxuXHRcdGlmICgkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxlZEdhcCA9PT0gJ3RydWUnKSB7XG5cdFx0XHR1bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCR0YXJnZXQpO1xuXHRcdCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrRmlsbGVkR2FwID0gJ3RydWUnO1xuXHRcdCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrQ3VycmVudEZpbGxHYXBNZXRob2QgPSBzdGF0ZS5maWxsR2FwTWV0aG9kO1xuXG5cdFx0aWYgKHN0YXRlLmZpbGxHYXBNZXRob2QgPT09ICdtYXJnaW4nKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50TWFyZ2luID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0KTtcblx0XHRcdCR0YXJnZXQuc3R5bGUubWFyZ2luUmlnaHQgPSBgJHtjdXJyZW50TWFyZ2luICsgc2Nyb2xsQmFyV2lkdGh9cHhgO1xuXHRcdH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ3dpZHRoJykge1xuXHRcdFx0JHRhcmdldC5zdHlsZS53aWR0aCA9IGBjYWxjKDEwMCUgLSAke3Njcm9sbEJhcldpZHRofXB4KWA7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZS5maWxsR2FwTWV0aG9kID09PSAnbWF4LXdpZHRoJykge1xuXHRcdFx0JHRhcmdldC5zdHlsZS5tYXhXaWR0aCA9IGBjYWxjKDEwMCUgLSAke3Njcm9sbEJhcldpZHRofXB4KWA7XG5cdFx0fSBlbHNlIGlmIChzdGF0ZS5maWxsR2FwTWV0aG9kID09PSAncGFkZGluZycpIHtcblx0XHRcdGNvbnN0IGN1cnJlbnRQYWRkaW5nID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG5cdFx0XHQkdGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2N1cnJlbnRQYWRkaW5nICsgc2Nyb2xsQmFyV2lkdGh9cHhgO1xuXHRcdH1cblx0fVxufTtcbmNvbnN0IHVuZmlsbEdhcFNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG5cdGNvbnN0ICR0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuXHRcdHVuZmlsbEdhcFRhcmdldCgkdGFyZ2V0KTtcblx0fSk7XG59O1xuY29uc3QgdW5maWxsR2FwVGFyZ2V0ID0gKCR0YXJnZXQpID0+IHtcblx0aWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuXHRcdGlmICgkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxlZEdhcCA9PT0gJ3RydWUnKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50RmlsbEdhcE1ldGhvZCA9ICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrQ3VycmVudEZpbGxHYXBNZXRob2Q7XG5cdFx0XHRkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tGaWxsZWRHYXA7XG5cdFx0XHRkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tDdXJyZW50RmlsbEdhcE1ldGhvZDtcblxuXHRcdFx0aWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAnbWFyZ2luJykge1xuXHRcdFx0XHQkdGFyZ2V0LnN0eWxlLm1hcmdpblJpZ2h0ID0gYGA7XG5cdFx0XHR9IGVsc2UgaWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAnd2lkdGgnKSB7XG5cdFx0XHRcdCR0YXJnZXQuc3R5bGUud2lkdGggPSBgYDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICdtYXgtd2lkdGgnKSB7XG5cdFx0XHRcdCR0YXJnZXQuc3R5bGUubWF4V2lkdGggPSBgYDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICdwYWRkaW5nJykge1xuXHRcdFx0XHQkdGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9IGBgO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcblxuY29uc3Qgb25SZXNpemUgPSAoZSkgPT4ge1xuXHRyZWZpbGxHYXBzKCk7XG59O1xuXG5jb25zdCBvblRvdWNoU3RhcnQgPSAoZSkgPT4ge1xuXHRpZiAoIXN0YXRlLnNjcm9sbCkge1xuXHRcdHN0YXRlLnN0YXJ0VG91Y2hZID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG5cdFx0c3RhdGUuc3RhcnRUb3VjaFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcblx0fVxufTtcbmNvbnN0IG9uVG91Y2hNb3ZlID0gKGUpID0+IHtcblx0aWYgKCFzdGF0ZS5zY3JvbGwpIHtcblx0XHRjb25zdCB7IHN0YXJ0VG91Y2hZLCBzdGFydFRvdWNoWCB9ID0gc3RhdGU7XG5cdFx0Y29uc3QgY3VycmVudENsaWVudFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcblx0XHRjb25zdCBjdXJyZW50Q2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuXG5cdFx0aWYgKGUudG91Y2hlcy5sZW5ndGggPCAyKSB7XG5cdFx0XHRjb25zdCBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5zY3JvbGxhYmxlU2VsZWN0b3JzKTtcblx0XHRcdGNvbnN0IGRpcmVjdGlvbiA9IHtcblx0XHRcdFx0dXA6IHN0YXJ0VG91Y2hZIDwgY3VycmVudENsaWVudFksXG5cdFx0XHRcdGRvd246IHN0YXJ0VG91Y2hZID4gY3VycmVudENsaWVudFksXG5cdFx0XHRcdGxlZnQ6IHN0YXJ0VG91Y2hYIDwgY3VycmVudENsaWVudFgsXG5cdFx0XHRcdHJpZ2h0OiBzdGFydFRvdWNoWCA+IGN1cnJlbnRDbGllbnRYXG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZGlyZWN0aW9uV2l0aE9mZnNldCA9IHtcblx0XHRcdFx0dXA6IHN0YXJ0VG91Y2hZICsgVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPCBjdXJyZW50Q2xpZW50WSxcblx0XHRcdFx0ZG93bjogc3RhcnRUb3VjaFkgLSBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA+IGN1cnJlbnRDbGllbnRZLFxuXHRcdFx0XHRsZWZ0OiBzdGFydFRvdWNoWCArIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUIDwgY3VycmVudENsaWVudFgsXG5cdFx0XHRcdHJpZ2h0OiBzdGFydFRvdWNoWCAtIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUID4gY3VycmVudENsaWVudFhcblx0XHRcdH07XG5cdFx0XHRjb25zdCBoYW5kbGUgPSAoJGVsLCBza2lwID0gZmFsc2UpID0+IHtcblx0XHRcdFx0aWYgKCRlbCkge1xuXHRcdFx0XHRcdGNvbnN0IHBhcmVudFNjcm9sbGFibGVFbCA9IGZpbmRQYXJlbnRCeVNlbGVjdG9yKCRlbCwgc2VsZWN0b3IsIGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRza2lwIHx8XG5cdFx0XHRcdFx0XHQoKGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCgkZWwpICYmIGZpbmRQYXJlbnRCeVNlbGVjdG9yKCRlbCwgc2VsZWN0b3IpKSB8fFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50SGFzU2VsZWN0b3IoJGVsLCBzZWxlY3RvcikpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJldmVudCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbi51cCAmJiBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpKSB8fFxuXHRcdFx0XHRcdFx0XHRcdChkaXJlY3Rpb24uZG93biAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSlcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJldmVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQoJGVsKSAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbi5sZWZ0ICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpKSB8fFxuXHRcdFx0XHRcdFx0XHRcdChkaXJlY3Rpb24ucmlnaHQgJiYgZWxlbWVudFNjcm9sbExlZnRPbkVuZCgkZWwpKVxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRwcmV2ZW50ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbldpdGhPZmZzZXQudXAgJiYgZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQoJGVsKSkgfHxcblx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbldpdGhPZmZzZXQuZG93biAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSkgfHxcblx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbldpdGhPZmZzZXQubGVmdCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQoJGVsKSkgfHxcblx0XHRcdFx0XHRcdFx0KGRpcmVjdGlvbldpdGhPZmZzZXQucmlnaHQgJiYgZWxlbWVudFNjcm9sbExlZnRPbkVuZCgkZWwpKVxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHByZXZlbnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHByZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHBhcmVudFNjcm9sbGFibGVFbCkge1xuXHRcdFx0XHRcdFx0XHRcdGhhbmRsZShwYXJlbnRTY3JvbGxhYmxlRWwsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRoYW5kbGUocGFyZW50U2Nyb2xsYWJsZUVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRoYW5kbGUoZS50YXJnZXQpO1xuXHRcdH1cblx0fVxufTtcbmNvbnN0IG9uVG91Y2hFbmQgPSAoZSkgPT4ge1xuXHRpZiAoIXN0YXRlLnNjcm9sbCkge1xuXHRcdHN0YXRlLnN0YXJ0VG91Y2hZID0gMDtcblx0XHRzdGF0ZS5zdGFydFRvdWNoWCA9IDA7XG5cdH1cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCB7XG5cdHBhc3NpdmU6IGZhbHNlXG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRNZXRob2RzID0ge1xuXHRoaWRlKHRhcmdldCkge1xuXHRcdHRocm93RXJyb3IoXG5cdFx0XHQnXCJoaWRlXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZGlzYWJsZVBhZ2VTY3JvbGxcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZGlzYWJsZXBhZ2VzY3JvbGxzY3JvbGxhYmxldGFyZ2V0J1xuXHRcdCk7XG5cblx0XHRkaXNhYmxlUGFnZVNjcm9sbCh0YXJnZXQpO1xuXHR9LFxuXHRzaG93KHRhcmdldCkge1xuXHRcdHRocm93RXJyb3IoXG5cdFx0XHQnXCJzaG93XCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZW5hYmxlUGFnZVNjcm9sbFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNlbmFibGVwYWdlc2Nyb2xsc2Nyb2xsYWJsZXRhcmdldCdcblx0XHQpO1xuXG5cdFx0ZW5hYmxlUGFnZVNjcm9sbCh0YXJnZXQpO1xuXHR9LFxuXHR0b2dnbGUodGFyZ2V0KSB7XG5cdFx0dGhyb3dFcnJvcignXCJ0b2dnbGVcIiBpcyBkZXByZWNhdGVkISBEbyBub3QgdXNlIGl0LicpO1xuXG5cdFx0aWYgKGdldFNjcm9sbFN0YXRlKCkpIHtcblx0XHRcdGRpc2FibGVQYWdlU2Nyb2xsKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVuYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KTtcblx0XHR9XG5cdH0sXG5cdGdldFN0YXRlKCkge1xuXHRcdHRocm93RXJyb3IoXG5cdFx0XHQnXCJnZXRTdGF0ZVwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldFNjcm9sbFN0YXRlXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldHNjcm9sbHN0YXRlJ1xuXHRcdCk7XG5cblx0XHRyZXR1cm4gZ2V0U2Nyb2xsU3RhdGUoKTtcblx0fSxcblx0Z2V0V2lkdGgoKSB7XG5cdFx0dGhyb3dFcnJvcihcblx0XHRcdCdcImdldFdpZHRoXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZ2V0UGFnZVNjcm9sbEJhcldpZHRoXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldHBhZ2VzY3JvbGxiYXJ3aWR0aCdcblx0XHQpO1xuXG5cdFx0cmV0dXJuIGdldFBhZ2VTY3JvbGxCYXJXaWR0aCgpO1xuXHR9LFxuXHRnZXRDdXJyZW50V2lkdGgoKSB7XG5cdFx0dGhyb3dFcnJvcihcblx0XHRcdCdcImdldEN1cnJlbnRXaWR0aFwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGhcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjZ2V0Y3VycmVudHBhZ2VzY3JvbGxiYXJ3aWR0aCdcblx0XHQpO1xuXG5cdFx0cmV0dXJuIGdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGgoKTtcblx0fSxcblx0c2V0U2Nyb2xsYWJsZVRhcmdldHModGFyZ2V0KSB7XG5cdFx0dGhyb3dFcnJvcihcblx0XHRcdCdcInNldFNjcm9sbGFibGVUYXJnZXRzXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiYWRkU2Nyb2xsYWJsZVRhcmdldFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNhZGRzY3JvbGxhYmxldGFyZ2V0c2Nyb2xsYWJsZXRhcmdldCdcblx0XHQpO1xuXG5cdFx0YWRkU2Nyb2xsYWJsZVRhcmdldCh0YXJnZXQpO1xuXHR9LFxuXHRzZXRGaWxsR2FwU2VsZWN0b3JzKHNlbGVjdG9yKSB7XG5cdFx0dGhyb3dFcnJvcihcblx0XHRcdCdcInNldEZpbGxHYXBTZWxlY3RvcnNcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJhZGRGaWxsR2FwU2VsZWN0b3JcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjYWRkZmlsbGdhcHNlbGVjdG9yZmlsbGdhcHNlbGVjdG9yJ1xuXHRcdCk7XG5cblx0XHRhZGRGaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXHR9LFxuXHRzZXRGaWxsR2FwVGFyZ2V0cyh0YXJnZXQpIHtcblx0XHR0aHJvd0Vycm9yKFxuXHRcdFx0J1wic2V0RmlsbEdhcFRhcmdldHNcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJhZGRGaWxsR2FwVGFyZ2V0XCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2FkZGZpbGxnYXB0YXJnZXRmaWxsZ2FwdGFyZ2V0J1xuXHRcdCk7XG5cblx0XHRhZGRGaWxsR2FwVGFyZ2V0KHRhcmdldCk7XG5cdH0sXG5cdGNsZWFyUXVldWUoKSB7XG5cdFx0dGhyb3dFcnJvcihcblx0XHRcdCdcImNsZWFyUXVldWVcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJjbGVhclF1ZXVlU2Nyb2xsTG9ja3NcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjY2xlYXJxdWV1ZXNjcm9sbGxvY2tzJ1xuXHRcdCk7XG5cblx0XHRjbGVhclF1ZXVlU2Nyb2xsTG9ja3MoKTtcblx0fVxufTtcblxuY29uc3Qgc2Nyb2xsTG9jayA9IHtcblx0ZGlzYWJsZVBhZ2VTY3JvbGwsXG5cdGVuYWJsZVBhZ2VTY3JvbGwsXG5cblx0Z2V0U2Nyb2xsU3RhdGUsXG5cdGNsZWFyUXVldWVTY3JvbGxMb2Nrcyxcblx0Z2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgsXG5cdGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aCxcblx0Z2V0UGFnZVNjcm9sbEJhcldpZHRoLFxuXHRnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoLFxuXG5cdGFkZFNjcm9sbGFibGVTZWxlY3Rvcixcblx0cmVtb3ZlU2Nyb2xsYWJsZVNlbGVjdG9yLFxuXG5cdGFkZFNjcm9sbGFibGVUYXJnZXQsXG5cdHJlbW92ZVNjcm9sbGFibGVUYXJnZXQsXG5cblx0YWRkTG9ja2FibGVTZWxlY3RvcixcblxuXHRhZGRMb2NrYWJsZVRhcmdldCxcblxuXHRhZGRGaWxsR2FwU2VsZWN0b3IsXG5cdHJlbW92ZUZpbGxHYXBTZWxlY3RvcixcblxuXHRhZGRGaWxsR2FwVGFyZ2V0LFxuXHRyZW1vdmVGaWxsR2FwVGFyZ2V0LFxuXG5cdHNldEZpbGxHYXBNZXRob2QsXG5cdHJlZmlsbEdhcHMsXG5cblx0X3N0YXRlOiBzdGF0ZSxcblxuXHQuLi5kZXByZWNhdGVkTWV0aG9kc1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2Nyb2xsTG9jaztcbiIsImV4cG9ydCBjb25zdCBhcmd1bWVudEFzQXJyYXkgPSAoYXJndW1lbnQpID0+IChBcnJheS5pc0FycmF5KGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogW2FyZ3VtZW50XSk7XG5leHBvcnQgY29uc3QgaXNFbGVtZW50ID0gKHRhcmdldCkgPT4gdGFyZ2V0IGluc3RhbmNlb2YgTm9kZTtcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnRMaXN0ID0gKG5vZGVMaXN0KSA9PiBub2RlTGlzdCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xuZXhwb3J0IGNvbnN0IGVhY2hOb2RlID0gKG5vZGVMaXN0LCBjYWxsYmFjaykgPT4ge1xuXHRpZiAobm9kZUxpc3QgJiYgY2FsbGJhY2spIHtcblx0XHRub2RlTGlzdCA9IGlzRWxlbWVudExpc3Qobm9kZUxpc3QpID8gbm9kZUxpc3QgOiBbbm9kZUxpc3RdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChjYWxsYmFjayhub2RlTGlzdFtpXSwgaSwgbm9kZUxpc3QubGVuZ3RoKSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5leHBvcnQgY29uc3QgdGhyb3dFcnJvciA9IChtZXNzYWdlKSA9PiBjb25zb2xlLmVycm9yKGBbc2Nyb2xsLWxvY2tdICR7bWVzc2FnZX1gKTtcbmV4cG9ydCBjb25zdCBhcnJheUFzU2VsZWN0b3IgPSAoYXJyYXkpID0+IHtcblx0aWYgKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7XG5cdFx0Y29uc3Qgc2VsZWN0b3IgPSBhcnJheS5qb2luKCcsICcpO1xuXHRcdHJldHVybiBzZWxlY3Rvcjtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBub2RlTGlzdEFzQXJyYXkgPSAobm9kZUxpc3QpID0+IHtcblx0Y29uc3Qgbm9kZXMgPSBbXTtcblx0ZWFjaE5vZGUobm9kZUxpc3QsIChub2RlKSA9PiBub2Rlcy5wdXNoKG5vZGUpKTtcblxuXHRyZXR1cm4gbm9kZXM7XG59O1xuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRCeVNlbGVjdG9yID0gKCRlbCwgc2VsZWN0b3IsIHNlbGYgPSB0cnVlLCAkcm9vdCA9IGRvY3VtZW50KSA9PiB7XG5cdGlmIChzZWxmICYmIG5vZGVMaXN0QXNBcnJheSgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuaW5kZXhPZigkZWwpICE9PSAtMSkge1xuXHRcdHJldHVybiAkZWw7XG5cdH1cblxuXHR3aGlsZSAoKCRlbCA9ICRlbC5wYXJlbnRFbGVtZW50KSAmJiBub2RlTGlzdEFzQXJyYXkoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmluZGV4T2YoJGVsKSA9PT0gLTEpO1xuXHRyZXR1cm4gJGVsO1xufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50SGFzU2VsZWN0b3IgPSAoJGVsLCBzZWxlY3RvciwgJHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuXHRjb25zdCBoYXMgPSBub2RlTGlzdEFzQXJyYXkoJHJvb3QucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpLmluZGV4T2YoJGVsKSAhPT0gLTE7XG5cdHJldHVybiBoYXM7XG59O1xuZXhwb3J0IGNvbnN0IGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbiA9ICgkZWwpID0+IHtcblx0aWYgKCRlbCkge1xuXHRcdGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCRlbCk7XG5cdFx0Y29uc3Qgb3ZlcmZsb3dJc0hpZGRlbiA9IGNvbXB1dGVkU3R5bGUub3ZlcmZsb3cgPT09ICdoaWRkZW4nO1xuXHRcdHJldHVybiBvdmVyZmxvd0lzSGlkZGVuO1xuXHR9XG59O1xuZXhwb3J0IGNvbnN0IGVsZW1lbnRTY3JvbGxUb3BPblN0YXJ0ID0gKCRlbCkgPT4ge1xuXHRpZiAoJGVsKSB7XG5cdFx0aWYgKGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBzY3JvbGxUb3AgPSAkZWwuc2Nyb2xsVG9wO1xuXHRcdHJldHVybiBzY3JvbGxUb3AgPD0gMDtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50U2Nyb2xsVG9wT25FbmQgPSAoJGVsKSA9PiB7XG5cdGlmICgkZWwpIHtcblx0XHRpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNjcm9sbFRvcCA9ICRlbC5zY3JvbGxUb3A7XG5cdFx0Y29uc3Qgc2Nyb2xsSGVpZ2h0ID0gJGVsLnNjcm9sbEhlaWdodDtcblx0XHRjb25zdCBzY3JvbGxUb3BXaXRoSGVpZ2h0ID0gc2Nyb2xsVG9wICsgJGVsLm9mZnNldEhlaWdodDtcblx0XHRyZXR1cm4gc2Nyb2xsVG9wV2l0aEhlaWdodCA+PSBzY3JvbGxIZWlnaHQ7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0ID0gKCRlbCkgPT4ge1xuXHRpZiAoJGVsKSB7XG5cdFx0aWYgKGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBzY3JvbGxMZWZ0ID0gJGVsLnNjcm9sbExlZnQ7XG5cdFx0cmV0dXJuIHNjcm9sbExlZnQgPD0gMDtcblx0fVxufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50U2Nyb2xsTGVmdE9uRW5kID0gKCRlbCkgPT4ge1xuXHRpZiAoJGVsKSB7XG5cdFx0aWYgKGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBzY3JvbGxMZWZ0ID0gJGVsLnNjcm9sbExlZnQ7XG5cdFx0Y29uc3Qgc2Nyb2xsV2lkdGggPSAkZWwuc2Nyb2xsV2lkdGg7XG5cdFx0Y29uc3Qgc2Nyb2xsTGVmdFdpdGhXaWR0aCA9IHNjcm9sbExlZnQgKyAkZWwub2Zmc2V0V2lkdGg7XG5cdFx0cmV0dXJuIHNjcm9sbExlZnRXaXRoV2lkdGggPj0gc2Nyb2xsV2lkdGg7XG5cdH1cbn07XG5leHBvcnQgY29uc3QgZWxlbWVudElzU2Nyb2xsYWJsZUZpZWxkID0gKCRlbCkgPT4ge1xuXHRjb25zdCBzZWxlY3RvciA9ICd0ZXh0YXJlYSwgW2NvbnRlbnRlZGl0YWJsZT1cInRydWVcIl0nO1xuXHRyZXR1cm4gZWxlbWVudEhhc1NlbGVjdG9yKCRlbCwgc2VsZWN0b3IpO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQWVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBS0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUF4RUE7QUFDQTtBQTBFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQTlCQTtBQUNBO0FBa0NBOzs7Ozs7Ozs7Ozs7QUN6akJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==