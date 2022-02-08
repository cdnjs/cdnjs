(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollLock"] = factory();
	else
		root["scrollLock"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCROLLABLE_CLASSNAME = 'sl--scrollable';
var FILLGAP_CLASSNAME = 'sl--fillgap';
var PREVENT_SCROLL_DATASET = 'slPrevented';
var DELTA_DATASET = 'slDelta';
var FILLGAP_AVAILABLE_METHODS = ['padding', 'margin', 'width'];

var _state = true;
var _queue = 0;

var _scrollableTargets = [];
var _temporaryScrollableTargets = [];

var _fillGapMethod = FILLGAP_AVAILABLE_METHODS[0];
var _fillGapSelectors = ['body', '.' + FILLGAP_CLASSNAME];
var _fillGapTargets = [];

var generateSelector = function generateSelector(selectors) {
	return selectors.join(', ');
};

var eachNode = function eachNode(nodeList, callback) {
	for (var i = 0; i < nodeList.length; i++) {
		callback(nodeList[i]);
	}
};

var findTarget = function findTarget(e) {
	var target = e.target;
	while (target !== null) {
		if (target.classList && target.classList.contains(SCROLLABLE_CLASSNAME)) {
			break;
		}
		target = target.parentNode;
	}
	return target;
};

var throwError = function throwError(message) {
	console.error('[scroll-lock] ' + message);
};

var touchstartEventHandler = function touchstartEventHandler(e, scrollLock) {
	var target = findTarget(e);
	if (target) {
		var scrollTop = target.scrollTop;
		var totalScroll = target.scrollHeight;
		var height = target.clientHeight;
		target.dataset[DELTA_DATASET] = e.touches[0].clientY;

		if (height === totalScroll) {
			target.dataset[PREVENT_SCROLL_DATASET] = 'true';
		}
	}
};

var touchmoveEventHandler = function touchmoveEventHandler(e, scrollLock) {
	if (!scrollLock.getState()) {
		var target = findTarget(e);
		if (target) {
			if (target.dataset[PREVENT_SCROLL_DATASET] === 'true') {
				e.preventDefault();
			} else {
				var scrollTop = target.scrollTop;
				var totalScroll = target.scrollHeight;
				var currentScroll = scrollTop + target.offsetHeight;
				var delta = parseFloat(target.dataset[DELTA_DATASET]);
				var currentDelta = e.touches[0].clientY;

				if (scrollTop <= 0) {
					if (delta < currentDelta) {
						e.preventDefault();
					}
				} else if (currentScroll >= totalScroll) {
					if (delta > currentDelta) {
						e.preventDefault();
					}
				}
			}
		} else {
			e.preventDefault();
		}
	}
};

var touchendEventHandler = function touchendEventHandler(e, scrollLock) {
	var target = findTarget(e);
	if (target) {
		target.dataset[PREVENT_SCROLL_DATASET] = 'false';
	}
};

var bindEvents = function bindEvents(scrollLock) {
	document.addEventListener('touchstart', function (e) {
		return touchstartEventHandler(e, scrollLock);
	});
	document.addEventListener('touchmove', function (e) {
		return touchmoveEventHandler(e, scrollLock);
	});
	document.addEventListener('touchend', function (e) {
		return touchendEventHandler(e, scrollLock);
	});
};

var ScrollLock = function () {
	function ScrollLock() {
		_classCallCheck(this, ScrollLock);

		bindEvents(this);
	}

	_createClass(ScrollLock, [{
		key: 'getState',
		value: function getState() {
			return _state;
		}
	}, {
		key: 'hide',
		value: function hide(targets) {
			if (_queue <= 0) {
				this._fillGaps();
				document.body.style.overflow = 'hidden';
				_state = false;
			}

			this._setTemporaryScrollableTargets(targets);
			_queue++;

			return this;
		}
	}, {
		key: 'show',
		value: function show() {
			_queue--;
			if (_queue <= 0) {
				document.body.style.overflow = '';
				this._unfillGaps();
				_state = true;
			} else {
				this.clearQueue();
			}

			return this;
		}
	}, {
		key: 'clearQueue',
		value: function clearQueue() {
			_queue = 0;

			return this;
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			if (this.getState()) {
				this.hide();
			} else {
				this.show();
			}

			return this;
		}
	}, {
		key: 'getWidth',
		value: function getWidth() {
			var overflowCurrentProperty = document.body.style.overflow;
			var width = 0;
			document.body.style.overflow = 'scroll';
			width = this.getCurrentWidth();
			document.body.style.overflow = overflowCurrentProperty;

			return width;
		}
	}, {
		key: 'getCurrentWidth',
		value: function getCurrentWidth() {
			var documentWidth = document.documentElement.clientWidth;
			var windowWidth = window.innerWidth;
			var currentWidth = windowWidth - documentWidth;

			return currentWidth;
		}
	}, {
		key: 'setScrollableTargets',
		value: function setScrollableTargets(targets) {
			var _this = this;

			if (Array.isArray(selectors)) {
				_scrollableTargets = targets;
			} else if (targets) {
				_scrollableTargets = [targets];
			}

			eachNode(_scrollableTargets, function (element) {
				return _this._makeScrollableTargetsElement(element);
			});

			return this;
		}
	}, {
		key: 'setFillGapMethod',
		value: function setFillGapMethod(method) {
			var parsedMethod = method.toLowerCase();
			if (FILLGAP_AVAILABLE_METHODS.includes(parsedMethod)) {
				_fillGapMethod = parsedMethod;
			} else {
				throwError('"' + method + '" method is not available!');
			}

			return this;
		}
	}, {
		key: 'setFillGapSelectors',
		value: function setFillGapSelectors(selectors) {
			if (Array.isArray(selectors)) {
				selectors.push('.' + FILLGAP_CLASSNAME);
				_fillGapSelectors = selectors;
			} else if (selectors) {
				_fillGapSelectors = [selectors];
			}

			return this;
		}
	}, {
		key: 'setFillGapTargets',
		value: function setFillGapTargets(targets) {
			if (Array.isArray(targets)) {
				_fillGapTargets = targets;
			} else if (targets) {
				_fillGapTargets = [targets];
			}

			return this;
		}
	}, {
		key: '_setTemporaryScrollableTargets',
		value: function _setTemporaryScrollableTargets(targets) {
			var _this2 = this;

			if (Array.isArray(targets)) {
				_temporaryScrollableTargets = targets;
			} else if (targets) {
				_temporaryScrollableTargets = [targets];
			}

			eachNode(_temporaryScrollableTargets, function (element) {
				return _this2._makeScrollableTargetsElement(element);
			});
		}
	}, {
		key: '_makeScrollableTargetsElement',
		value: function _makeScrollableTargetsElement(element) {
			if (element instanceof Element) {
				element.classList.add(SCROLLABLE_CLASSNAME);
			}
		}
	}, {
		key: '_fillGaps',
		value: function _fillGaps() {
			var _this3 = this;

			var selector = generateSelector(_fillGapSelectors);
			var elements = document.querySelectorAll(selector);

			eachNode(elements, function (element) {
				return _this3._fillGapsElement(element);
			});
			eachNode(_fillGapTargets, function (element) {
				return _this3._fillGapsElement(element);
			});
		}
	}, {
		key: '_fillGapsElement',
		value: function _fillGapsElement(element) {
			var currentWidth = this.getCurrentWidth();

			if (element instanceof Element) {
				if (_fillGapMethod === 'margin') {
					element.style.marginRight = currentWidth + 'px';
				} else if (_fillGapMethod === 'width') {
					element.style.width = 'calc(100% - ' + currentWidth + 'px)';
				} else {
					element.style.paddingRight = currentWidth + 'px';
				}
			}
		}
	}, {
		key: '_unfillGaps',
		value: function _unfillGaps() {
			var _this4 = this;

			var selector = generateSelector(_fillGapSelectors);
			var elements = document.querySelectorAll(selector);

			eachNode(elements, function (element) {
				return _this4._unfillGapsElement(element);
			});
			eachNode(_fillGapTargets, function (element) {
				return _this4._unfillGapsElement(element);
			});
		}
	}, {
		key: '_unfillGapsElement',
		value: function _unfillGapsElement(element) {
			if (element instanceof Element) {
				element.style.marginRight = '';
				element.style.width = '';
				element.style.paddingRight = '';
			}
		}
	}]);

	return ScrollLock;
}();

var scrollLock = new ScrollLock();
exports.default = scrollLock;

module.exports = scrollLock;

/***/ })
/******/ ]);
});