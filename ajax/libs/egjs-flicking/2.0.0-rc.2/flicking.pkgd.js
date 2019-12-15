/*!
 * All-in-one packaged file for ease use of '@egjs/flicking' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Flicking"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(2);


/**
 * @name eg.MovableCoord.DIRECTION_NONE
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_LEFT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_RIGHT
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_UP
 * @constant
 * @type {Number}
 */
/**
 * @name eg.MovableCoord.DIRECTION_DOWN
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_HORIZONTAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_VERTICAL
 * @constant
 * @type {Number}
*/
/**
 * @name eg.MovableCoord.DIRECTION_ALL
 * @constant
 * @type {Number}
*/
const direction = {
	DIRECTION_NONE: 1,
	DIRECTION_LEFT: 2,
	DIRECTION_RIGHT: 4,
	DIRECTION_UP: 8,
	DIRECTION_DOWN: 16,
	DIRECTION_HORIZONTAL: 2 | 4,
	DIRECTION_VERTICAL: 8 | 16,
};

direction.DIRECTION_ALL = direction.DIRECTION_HORIZONTAL |
	direction.DIRECTION_VERTICAL;
const DIRECTION = direction;
/* harmony export (immutable) */ __webpack_exports__["a"] = DIRECTION;

const UNIQUEKEY = "__MOVABLECOORD__";
/* harmony export (immutable) */ __webpack_exports__["c"] = UNIQUEKEY;

const SUPPORT_TOUCH = "ontouchstart" in __WEBPACK_IMPORTED_MODULE_0__browser__["a" /* window */];
/* harmony export (immutable) */ __webpack_exports__["b"] = SUPPORT_TOUCH;




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

var document = win.document;

exports.window = win;
exports.document = document;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return win; });
/* eslint-disable no-new-func, no-nested-ternary */
const win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */


const document = win.document;
/* harmony export (immutable) */ __webpack_exports__["b"] = document;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DATA_HEIGHT = exports.IS_ANDROID2 = exports.SUPPORT_WILLCHANGE = exports.SUPPORT_TRANSFORM = exports.EVENTS = undefined;

var _browser = __webpack_require__(1);

// define custom events name
var EVENTS = {
	beforeFlickStart: "beforeFlickStart",
	beforeRestore: "beforeRestore",
	flick: "flick",
	flickEnd: "flickEnd",
	restore: "restore"
};

// check for css transform support
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var SUPPORT_TRANSFORM = function () {
	var style = _browser.document.documentElement.style;

	return "transform" in style || "webkitTransform" in style;
}();

// check for will-change support
var SUPPORT_WILLCHANGE = _browser.window.CSS && _browser.window.CSS.supports && _browser.window.CSS.supports("will-change", "transform");

// check for Android 2.x
var IS_ANDROID2 = /Android 2\./.test(navigator.userAgent);

// data-height attribute's name for adaptiveHeight option
var DATA_HEIGHT = "data-height";

exports.EVENTS = EVENTS;
exports.SUPPORT_TRANSFORM = SUPPORT_TRANSFORM;
exports.SUPPORT_WILLCHANGE = SUPPORT_WILLCHANGE;
exports.IS_ANDROID2 = IS_ANDROID2;
exports.DATA_HEIGHT = DATA_HEIGHT;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__consts__ = __webpack_require__(0);


const Coordinate = {
	// get user's direction
	getDirectionByAngle(angle, thresholdAngle) {
		if (thresholdAngle < 0 || thresholdAngle > 90) {
			return __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_NONE;
		}
		const toAngle = Math.abs(angle);

		return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
				__WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_VERTICAL : __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_HORIZONTAL;
	},
	isHorizontal(direction, userDirection) {
		return direction === __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_ALL ||
			(direction & __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_HORIZONTAL &&
			userDirection & __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_HORIZONTAL);
	},
	isVertical(direction, userDirection) {
		return direction === __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_ALL ||
			(direction & __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_VERTICAL &&
			userDirection & __WEBPACK_IMPORTED_MODULE_0__consts__["a" /* DIRECTION */].DIRECTION_VERTICAL);
	},
	getPointOfIntersection(depaPos, destPos, min, max, circular, bounce) {
		const boxLT = [min[0] - bounce[3], min[1] - bounce[0]];
		const boxRB = [max[0] + bounce[1], max[1] + bounce[2]];
		const toDestPos = destPos.concat();

		const xd = destPos[0] - depaPos[0];
		const yd = destPos[1] - depaPos[1];

		if (!circular[3]) {
			toDestPos[0] = Math.max(boxLT[0], toDestPos[0]);
		} // left
		if (!circular[1]) {
			toDestPos[0] = Math.min(boxRB[0], toDestPos[0]);
		} // right
		toDestPos[1] = xd ? depaPos[1] + yd / xd * (toDestPos[0] - depaPos[0]) :
						toDestPos[1];

		if (!circular[0]) {
			toDestPos[1] = Math.max(boxLT[1], toDestPos[1]);
		} // up
		if (!circular[2]) {
			toDestPos[1] = Math.min(boxRB[1], toDestPos[1]);
		} // down
		toDestPos[0] = yd ? depaPos[0] + xd / yd * (toDestPos[1] - depaPos[1]) :
						toDestPos[0];
		return [
			Math.min(max[0], Math.max(min[0], toDestPos[0])),
			Math.min(max[1], Math.max(min[1], toDestPos[1])),
		];
	},
	// determine outside
	isOutside(pos, min, max) {
		return pos[0] < min[0] || pos[1] < min[1] ||
			pos[0] > max[0] || pos[1] > max[1];
	},
	// from outside to outside
	isOutToOut(pos, destPos, min, max) {
		return (pos[0] < min[0] || pos[0] > max[0] ||
			pos[1] < min[1] || pos[1] > max[1]) &&
			(destPos[0] < min[0] || destPos[0] > max[0] ||
			destPos[1] < min[1] || destPos[1] > max[1]);
	},
	getNextOffsetPos(speeds, deceleration) {
		const normalSpeed = Math.sqrt(
			speeds[0] * speeds[0] + speeds[1] * speeds[1]
		);
		const duration = Math.abs(normalSpeed / -deceleration);

		return [
			speeds[0] / 2 * duration,
			speeds[1] / 2 * duration,
		];
	},
	getDurationFromPos(pos, deceleration) {
		const normalPos = Math.sqrt(pos[0] * pos[0] + pos[1] * pos[1]);
		const duration = Math.sqrt(
			normalPos / deceleration * 2
		);

		// when duration is under 100, then value is zero
		return duration < 100 ? 0 : duration;
	},
	isCircular(destPos, min, max, circular) {
		return (circular[0] && destPos[1] < min[1]) ||
				(circular[1] && destPos[0] > max[0]) ||
				(circular[2] && destPos[1] > max[1]) ||
				(circular[3] && destPos[0] < min[0]);
	},
	getCircularPos(pos, min, max, circular) {
		const toPos = pos.concat();
		const length = [max[0] - min[0], max[1] - min[1]];

		if (circular[0] && toPos[1] < min[1]) { // up
			toPos[1] = (toPos[1] - min[1]) % length[1] + max[1];
		}
		if (circular[1] && toPos[0] > max[0]) { // right
			toPos[0] = (toPos[0] - max[0]) % length[0] + min[0];
		}
		if (circular[2] && toPos[1] > max[1]) { // down
			toPos[1] = (toPos[1] - max[1]) % length[1] + min[1];
		}
		if (circular[3] && toPos[0] < min[0]) { // left
			toPos[0] = (toPos[0] - min[0]) % length[0] + max[0];
		}

		toPos[0] = +toPos[0].toFixed(5);
		toPos[1] = +toPos[1].toFixed(5);
		return toPos;
	},
};

/* harmony default export */ __webpack_exports__["a"] = (Coordinate);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__browser__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return $; });


function $(param, multi = false) {
	let el;

	if (typeof param === "string") {	// String (HTML, Selector)
		// check if string is HTML tag format
		const match = param.match(/^<([a-z]+)\s*([^>]*)>/);

		// creating element
		if (match) {	 // HTML
			const dummy = __WEBPACK_IMPORTED_MODULE_0__browser__["b" /* document */].createElement("div");

			dummy.innerHTML = param;
			el = Array.prototype.slice.call(dummy.childNodes);
		} else {	// Selector
			el = Array.prototype.slice.call(__WEBPACK_IMPORTED_MODULE_0__browser__["b" /* document */].querySelectorAll(param));
		}
		if (!multi) {
			el = el.length >= 1 ? el[0] : undefined;
		}
	} else if (param.nodeName && param.nodeType === 1) {	// HTMLElement
		el = param;
	} else if (__WEBPACK_IMPORTED_MODULE_0__browser__["a" /* window */].jQuery && (param instanceof jQuery)) {	// jQuery
		el = multi ? param.toArray() : param.get(0);
	}

	return el;
}

class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass || class {};
	}
	with(...mixins) {
		return mixins.reduce((c, m) => m(c), this.superclass);
	}
}

const Mixin = superclass => new MixinBuilder(superclass);




/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _component = __webpack_require__(11);

var _component2 = _interopRequireDefault(_component);

var _movablecoord = __webpack_require__(14);

var _movablecoord2 = _interopRequireDefault(_movablecoord);

var _utils = __webpack_require__(10);

var _consts = __webpack_require__(3);

var consts = _interopRequireWildcard(_consts);

var _config = __webpack_require__(7);

var _browser = __webpack_require__(1);

var _eventHandler = __webpack_require__(8);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.
 * @ko 플리킹 UI를 구현하는 모듈. 나란히 배치한 패널을 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 플리킹 UI를 만들 수 있다.
 * @alias eg.Flicking
 * @extends eg.Component
 *
 * @param {HTMLElement|String|jQuery} element A base element for the eg.Flicking module <ko>eg.Flicking 모듈을 사용할 기준 엘리먼트</ko>
 * @param {Object} options The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
 * @param {Boolean} [options.hwAccelerable=eg.isHWAccelerable()] Force hardware compositing <ko>하드웨어 가속 사용 여부</ko>
 * @param {String} [options.prefix=eg-flick] A prefix for class names of the panel elements <ko>패널 엘리먼트의 클래스 이름에 설정할 접두사</ko>
 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
 * @param {Boolean} [options.horizontal=true] Direction of the panel movement (true: horizontal, false: vertical) <ko>패널 이동 방향 (true 가로방향, false 세로방향)</ko>
 * @param {Boolean} [options.circular=false] Indicates whether a circular panel is available <ko>패널 순환 여부</ko>
 * @param {Number|Array} [options.previewPadding=[0,0]] The preview size for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel <ko>이전 패널과 다음 패널을 미리 보는 영역의 크기. 패널 이동 방향이 가로 방향이면 패널 왼쪽과 오른쪽에 미리 보는 영역이 나타난다. 패널 이동 방향이 세로 방향이면 패널 위쪽과 아래쪽에 미리 보는 영역이 나타난다</ko>
 * @param {Number|Array} [options.bounce=[10,10]] −	The size of bouncing area. If a panel is set to "non-circulable", the start and end panels can exceed the base element area and move further as much as the bouncing area. If a panel is dragged to the bouncing area and then dropped, the panel where bouncing effects are applied is retuned back into the base element area. <ko>바운스 영역의 크기. 패널이 순환하지 않도록 설정됐다면 시작 패널과 마지막 패널은 기준 엘리먼트 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 패널을 바운스 영역까지 끌었다가 놓으면, 바운스 효과가 적용된 패널이 다시 기준 엘리먼트 영역 안으로 들어온다</ko>
 * @param {Number} [options.threshold=40] Distance threshold. If the drag exceeds the threshold value, it will be changed to the next panel <ko>다음 패널로 바뀌는 기준 이동 거리. 패널을 기준 이동 거리 이상 끌었다 놓으면 패널이 다음 패널로 바뀐다</ko>
 * @param {Number} [options.duration=100] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
 * @param {Function} [options.panelEffect=easeOutCubic] The easing function to apply to a panel moving animation <ko>패널 이동 애니메이션에 적용할 easing 함수</ko>
 * @param {Number} [options.defaultIndex=0] The index number of a panel to be selected upon module initialization <ko>모듈이 초기화될 때 선택할 패널의 인덱스 번호</ko>
 * @param {Array} [options.inputType] Types of input devices.<br>- touch: A touch screen can be used to move a panel.<br>- mouse: A mouse can be used to move a panel. <ko>입력 장치 종류.<br>- touch: 터치 입력 장치로 패널을 이동할 수 있다.<br>- mouse: 마우스로 패널을 이동할 수 있다.</ko>
 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
 * @param {Boolean} [options.adaptiveHeight=false] Set container's height be adaptive according panel's height.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>컨테이너 영역이 패널의 높이값에 따라 변경될지 여부<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
 *
 * @codepen {"id":"rVOpPK", "ko":"플리킹 UI 기본 예제", "en":"Flicking UI default example", "collectionId":"ArxyLK", "height" : 403}
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 *
 * @see Easing Functions Cheat Sheet {@link http://easings.net/}
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
 * @example
 <!-- HTML -->
 <div id="mflick">
 <div>
 <p>Layer 0</p>
 </div>
 <div>
 <p>Layer 1</p>
 </div>
 <div>
 <p>Layer 2</p>
 </div>
 </div>
 <script>
 var some = new eg.Flicking("#mflick", {
				circular : true,
				threshold : 50
			}).on({
				beforeRestore : function(e) { ... },
				flickStart : function(e) { ... }
			});
 </script>
 */
var Flicking = function (_Mixin$with) {
	_inherits(Flicking, _Mixin$with);

	/**
  * Constructor
  * @param {HTMLElement|String} element - base element or selector
  * @param {Object} options
  */
	function Flicking(element, options, _prefix) {
		_classCallCheck(this, Flicking);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this));

		_this.$wrapper = _utils.utils.$(element);
		var $children = _this.$wrapper && _this.$wrapper.children;

		if (!_this.$wrapper || !$children || !$children.length) {
			// eslint-disable validateLineBreaks, maximumLineLength
			throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized.");

			// eslint-enable validateLineBreaks, maximumLineLength
		}

		_this._setOptions(options);
		_this._setConfig($children, _prefix);

		!_utils.utils.hasClickBug() && (_this._setPointerEvents = function () {});

		_this._build();
		_this._bindEvents(true);

		_this._applyPanelsCss();
		_this._arrangePanels();

		_this.options.hwAccelerable && consts.SUPPORT_WILLCHANGE && _this._setHint();
		_this.options.adaptiveHeight && _this._setAdaptiveHeight();

		_this._adjustContainerCss("end");
		return _this;
	}

	/**
  * Set options values
  * @param {Object} options
  */


	Flicking.prototype._setOptions = function _setOptions(options) {
		// default value of previewPadding and bounce
		var arrVal = {
			previewPadding: [0, 0],
			bounce: [10, 10]
		};

		this.options = _utils.utils.extend(_utils.utils.extend({}, _config.OPTIONS), arrVal, options);

		for (var key in arrVal) {
			var val = this.options[key];

			if (typeof val === "number") {
				val = [val, val];
			} else if (!_utils.utils.isArray(val)) {
				val = arrVal[key];
			}

			this.options[key] = val;
		}
	};

	/**
  * Set config values
  * @param {HTMLCollection} $children wrappers' children elements
  * @param {String} _prefix event prefix
  * @return {HTMLElement}
  */


	Flicking.prototype._setConfig = function _setConfig($children, _prefix) {
		var options = this.options;
		var padding = options.previewPadding;
		var $nodes = $children;

		if ($nodes[0].classList.contains(options.prefix + "-container")) {
			$nodes = $nodes[0];
			this.$container = $nodes;
			$nodes = $nodes.children;
		}

		// convert to array
		$nodes = [].slice.call($nodes);

		// config value
		var conf = this._conf = _utils.utils.extend(_utils.utils.extend({}, _config.CONFIG), {
			panel: {
				$list: $nodes,
				minCount: padding[0] + padding[1] > 0 ? 5 : 3 // minimum panel count
			},
			// remember original class and inline style in case of restoration on destroy()
			origPanelStyle: {
				wrapper: {
					className: this.$wrapper.getAttribute("class") || null,
					style: this.$wrapper.getAttribute("style") || null
				},
				container: {
					className: this.$container && this.$container.getAttribute("class") || null,
					style: this.$container && this.$container.getAttribute("style") || null
				},
				list: $nodes.map(function (v) {
					return {
						className: v.getAttribute("class") || null,
						style: v.getAttribute("style") || null
					};
				})
			},
			useLayerHack: options.hwAccelerable && !consts.SUPPORT_WILLCHANGE,
			eventPrefix: _prefix || ""
		});

		[["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal].forEach(function (v) {
			return conf.dirData.push(_movablecoord2.default["DIRECTION_" + v]);
		});
	};

	/**
  * Build and set panel nodes to make flicking structure
  */


	Flicking.prototype._build = function _build() {
		var panel = this._conf.panel;
		var options = this.options;
		var $children = panel.$list;
		var padding = options.previewPadding.concat();
		var prefix = options.prefix;
		var horizontal = options.horizontal;
		var panelCount = panel.count = panel.origCount = $children.length;
		var bounce = options.bounce;

		this._setPadding(padding, true);
		var sizeValue = this._getDataByDirection([panel.size, "100%"]);

		// container element style
		var cssValue = {
			position: "relative",
			zIndex: 2000,
			width: "100%",
			height: "100%"
		};

		horizontal && (cssValue.top = "0px");

		if (this.$container) {
			_utils.utils.css(this.$container, cssValue);
		} else {
			var $parent = $children[0].parentNode;
			var $container = _browser.document.createElement("div");

			$container.className = prefix + "-container";
			_utils.utils.css($container, cssValue);

			$children.forEach(function (v) {
				return $container.appendChild(v);
			});

			$parent.appendChild($container);
			this.$container = $container;
		}

		// panels' css values
		$children.forEach(function (v) {
			v.classList.add(prefix + "-panel");

			_utils.utils.css(v, {
				position: "absolute",
				width: _utils.utils.getUnitValue(sizeValue[0]),
				height: _utils.utils.getUnitValue(sizeValue[1]),
				boxSizing: "border-box",
				top: 0,
				left: 0
			});
		});

		if (this._addClonePanels()) {
			panelCount = panel.count = (panel.$list = [].slice.call(this.$container.children)).length;
		}

		// create MovableCoord instance
		this._mcInst = new _movablecoord2.default({
			min: [0, 0],
			max: this._getDataByDirection([panel.size * (panelCount - 1), 0]),
			margin: 0,
			circular: false,
			easing: options.panelEffect,
			deceleration: options.deceleration,
			bounce: this._getDataByDirection([0, bounce[1], 0, bounce[0]])
		});

		this._setDefaultPanel(options.defaultIndex);
	};

	/**
  * Set preview padding value
  * @param {Array} padding
  * @param {Boolean} build
  */


	Flicking.prototype._setPadding = function _setPadding(padding, build) {
		var horizontal = this.options.horizontal;
		var panel = this._conf.panel;
		var paddingSum = padding[0] + padding[1];
		var cssValue = {};

		if (paddingSum || !build) {
			cssValue.padding = horizontal ? "0 " + padding.reverse().join("px 0 ") + "px" : padding.join("px 0 ") + "px";
		}

		if (build) {
			cssValue.overflow = "hidden";
			cssValue.boxSizing = "border-box";
		}

		Object.keys(cssValue).length && _utils.utils.css(this.$wrapper, cssValue);

		var wrapperStyle = getComputedStyle(this.$wrapper);
		var paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];

		panel.size = _utils.utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"]) - (_utils.utils.getNumValue(wrapperStyle["padding" + paddingType[0]]) + _utils.utils.getNumValue(wrapperStyle["padding" + paddingType[1]]));
	};

	/**
  * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
  * @return {Boolean} true : added clone node, false : not added
  */


	Flicking.prototype._addClonePanels = function _addClonePanels() {
		var _this2 = this;

		var panel = this._conf.panel;
		var panelCount = panel.origCount;
		var cloneCount = panel.minCount - panelCount;
		var list = panel.$list;
		var cloneNodes = void 0;

		// if panels are given less than required when circular option is set, then clone node to apply circular mode
		if (this.options.circular && panelCount < panel.minCount) {
			cloneNodes = list.map(function (v) {
				return v.cloneNode(true);
			});

			while (cloneNodes.length < cloneCount) {
				cloneNodes = cloneNodes.concat(list.map(function (v) {
					return v.cloneNode(true);
				}));
			}

			cloneNodes.forEach(function (v) {
				return _this2.$container.appendChild(v);
			});

			return !!cloneNodes.length;
		}

		return false;
	};

	/**
  * Move panel's position within array
  * @param {Number} count element counts to move
  * @param {Boolean} append where the list to be appended(moved) (true: to the end, false: to the beginning)
  */


	Flicking.prototype._movePanelPosition = function _movePanelPosition(count, append) {
		var panel = this._conf.panel;
		var list = panel.$list;
		var listToMove = list.splice(append ? 0 : panel.count - count, count);

		panel.$list = append ? list.concat(listToMove) : listToMove.concat(list);
	};

	/**
  * Set default panel to show
  * @param {Number} index
  */


	Flicking.prototype._setDefaultPanel = function _setDefaultPanel(index) {
		var panel = this._conf.panel;
		var lastIndex = panel.count - 1;
		var coords = void 0;
		var baseIndex = void 0;

		if (this.options.circular) {
			// if default index is given, then move correspond panel to the first position
			if (index > 0 && index <= lastIndex) {
				this._movePanelPosition(index, true);
			}

			// set first panel's position according physical node length
			baseIndex = this._getBasePositionIndex();
			this._movePanelPosition(baseIndex, false);

			this._setPanelNo({
				no: index,
				currNo: index
			});
			// if defaultIndex option is given, then move to that index panel
		} else if (index > 0 && index <= lastIndex) {
			this._setPanelNo({
				index: index,
				no: index,
				currIndex: index,
				currNo: index
			});

			coords = [-(panel.size * index), 0];

			this._setTranslate(coords);
			this._setMovableCoord("setTo", [Math.abs(coords[0]), Math.abs(coords[1])], true, 0);
		}
	};

	/**
  * Arrange panels' position
  * @param {Boolean} sort Need to sort panel's position
  * @param {Number} indexToMove Number to move from current position (negative: left, positive: right)
  */


	Flicking.prototype._arrangePanels = function _arrangePanels(sort, indexToMove) {
		var conf = this._conf;
		var panel = conf.panel;
		var touch = conf.touch;
		var dirData = conf.dirData;
		var baseIndex = void 0;

		if (this.options.circular) {
			// when arranging panels, set flag to not trigger flick custom event
			conf.customEvent.flick = false;

			// move elements according direction
			if (sort) {
				indexToMove && (touch.direction = dirData[+!(indexToMove > 0)]);
				this._arrangePanelPosition(touch.direction, indexToMove);
			}

			// set index for base element's position
			baseIndex = this._getBasePositionIndex();

			this._setPanelNo({
				index: baseIndex,
				currIndex: baseIndex
			});

			// arrange MovableCoord's coord position
			conf.customEvent.flick = !!this._setMovableCoord("setTo", [panel.size * panel.index, 0], true, 0);
		}

		this._applyPanelsPos();
	};

	/**
  * Set each panel's position in DOM
  */


	Flicking.prototype._applyPanelsPos = function _applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	};

	/**
  * Set CSS style values to move elements
  *
  * Initialize setting up checking if browser support transform css property.
  * If browser doesn't support transform, then use left/top properties instead.
  * @param {HTMLElement} $element
  * @param {Array} coords
  */


	Flicking.prototype._setMoveStyle = function _setMoveStyle($el, coordsValue) {
		this._setMoveStyle = consts.SUPPORT_TRANSFORM ? function moveStyle($element, coords) {
			_utils.utils.css($element, {
				transform: _utils.utils.translate(coords[0], coords[1], this._conf.useLayerHack)
			});
		} : function ($element, coords) {
			_utils.utils.css($element, { left: coords[0], top: coords[1] });
		};

		this._setMoveStyle($el, coordsValue);
	};

	/**
  * Callback function for applying CSS values to each panels
  *
  * Need to be initialized before use, to set up for Android 2.x browsers or others.
  */


	Flicking.prototype._applyPanelsCss = function _applyPanelsCss() {
		var conf = this._conf;
		var dummyAnchorClassName = "__dummy_anchor";

		if (consts.IS_ANDROID2) {
			conf.$dummyAnchor = _utils.utils.$("." + dummyAnchorClassName);

			!conf.$dummyAnchor && this.$wrapper.appendChild(conf.$dummyAnchor = _utils.utils.$("<a href=\"javascript:void(0)\" class=\"" + dummyAnchorClassName + "\" style=\"position:absolute;height:0px;width:0px\">"));

			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([this._conf.panel.size * i + "px", 0]);

				_utils.utils.css(v, {
					left: coords[0],
					top: coords[1]
				});
			};
		} else {
			this._applyPanelsCss = function applyCss(v, i) {
				var coords = this._getDataByDirection([consts.SUPPORT_TRANSFORM ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

				this._setMoveStyle(v, coords);
			};
		}
	};

	/**
  * Adjust container's css value to handle Android 2.x link highlighting bug
  *
  * @param {String} phase
  *    start - set left/top value to 0
  *    end - set translate value to 0
  * @param {Array} coordValue coordinate value
  */


	Flicking.prototype._adjustContainerCss = function _adjustContainerCss(phase, coordValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;
		var horizontal = options.horizontal;
		var paddingTop = options.previewPadding[0];
		var container = this.$container;
		var coords = coordValue;
		var value = void 0;

		if (consts.IS_ANDROID2) {
			if (!coords) {
				coords = [-panel.size * panel.index, 0];
			}

			if (phase === "start") {
				container = container.style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = "0px");
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-coords[+!options.horizontal], 0]);
			} else if (phase === "end") {
				coords = this._getCoordsValue(coords);

				_utils.utils.css(container, {
					left: coords.x,
					top: coords.y,
					transform: _utils.utils.translate(0, 0, conf.useLayerHack)
				});

				conf.$dummyAnchor.focus();
			}
		}
	};

	/**
  * Set MovableCoord coord value
  * @param {String} method
  * @param {Array} coordValue
  * @param {Boolean} isDirVal
  * @param {Number} duration
  * @return {eg.MovableCoord} MovableCoord instance
  */


	Flicking.prototype._setMovableCoord = function _setMovableCoord(method, coordValue, isDirVal, duration) {
		var coord = coordValue;

		if (isDirVal) {
			coord = this._getDataByDirection(coord);
		}

		return this._mcInst[method](coord[0], coord[1], duration);
	};

	/**
  * Set hint for browser to decide efficient way of doing transform changes(or animation)
  * https://dev.opera.com/articles/css-will-change-property/
  */


	Flicking.prototype._setHint = function _setHint() {
		var style = { willChange: "transform" };

		_utils.utils.css(this.$container, style);
		_utils.utils.css(this._conf.panel.$list, style);
	};

	/**
  * Get data according options.horizontal value
  *
  * @param {Array} value primary data to handle
  * @return {Array}
  */


	Flicking.prototype._getDataByDirection = function _getDataByDirection(value) {
		var data = value.concat();

		!this.options.horizontal && data.reverse();
		return data;
	};

	/**
  * Move nodes
  * @param {Boolean} direction
  * @param {Number} indexToMove
  */


	Flicking.prototype._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
		var next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	};

	/**
  * Get the base position index of the panel
  */


	Flicking.prototype._getBasePositionIndex = function _getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	};

	/**
  * Bind events
  * @param {Boolean} bind
  */


	Flicking.prototype._bindEvents = function _bindEvents(bind) {
		var options = this.options;
		var $wrapper = this.$wrapper;
		var mcInst = this._mcInst;

		if (bind) {
			mcInst.bind($wrapper, {
				scale: this._getDataByDirection([-1, 0]),
				direction: _movablecoord2.default["DIRECTION_" + (options.horizontal ? "HORIZONTAL" : "VERTICAL")],
				interruptable: false,
				inputType: options.inputType,
				thresholdAngle: options.thresholdAngle
			}).on({
				hold: this._holdHandler.bind(this),
				change: this._changeHandler.bind(this),
				release: this._releaseHandler.bind(this),
				animationStart: this._animationStartHandler.bind(this),
				animationEnd: this._animationEndHandler.bind(this)
			});
		} else {
			mcInst.unbind($wrapper).off();
		}
	};

	/**
  * Set container's height value according to children's height
  * @param {Number} direction
  */


	Flicking.prototype._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
		var conf = this._conf;
		var indexToMove = conf.indexToMove;
		var $children = void 0;
		var height = void 0;

		var $panel = indexToMove === 0 ?

		// panel moved by 1
		this["get" + (direction === _movablecoord2.default.DIRECTION_LEFT && "Next" || direction === _movablecoord2.default.DIRECTION_RIGHT && "Prev" || "") + "Element"]() :

		// panel moved by .moveTo()
		conf.panel.$list[conf.panel.currIndex + indexToMove];

		var $first = $panel.querySelector(":first-child");

		height = $first.getAttribute(consts.DATA_HEIGHT);

		if (!height) {
			$children = $panel.children;
			height = _utils.utils.outerHeight($children.length > 1 ? ($panel.style.height = "auto", $panel) : $first);

			$first.setAttribute(consts.DATA_HEIGHT, height);
		}

		this.$wrapper.style.height = height + "px";
	};

	/**
  * Trigger beforeRestore event
  * @param {Object} e event object
  */


	Flicking.prototype._triggerBeforeRestore = function _triggerBeforeRestore(e) {
		var conf = this._conf;
		var touch = conf.touch;

		// reverse direction value when restore
		touch.direction = ~~conf.dirData.join("").replace(touch.direction, "");

		/**
   * This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached
   * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생하는 이벤트
   * @name eg.Flicking#beforeRestore
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.eventType The name of the event <ko>이름명</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다. (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
   * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
   * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
   * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
   * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
   * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
   * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
   */
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos,
			destPos: e.destPos
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	};

	/**
  * Trigger restore event
  */


	Flicking.prototype._triggerRestore = function _triggerRestore() {
		var customEvent = this._conf.customEvent;

		/**
   * This event is fired after an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached.
   * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원된 다음 발생하는 이벤트
   * @name eg.Flicking#restore
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.eventType The name of the event <ko>이름명</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM(@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the panel move (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
   */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restoreCall = false;
	};

	/**
  * Set value when panel changes
  * @param {String} phase - [start|end]
  * @param {Object} pos
  */


	Flicking.prototype._setPhaseValue = function _setPhaseValue(phase, pos) {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;

		if (phase === "start" && (panel.changed = this._isMovable())) {
			/**
    * This event is fired before flicking starts
    * @ko 플리킹이 시작하기 전에 발생하는 이벤트
    * @name eg.Flicking#beforeFlickStart
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event <ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
    * @param {Array} param.depaPos Start coordinate <ko>출발점 좌표</ko>
    * @param {Number} param.depaPos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.depaPos.1 y-coordinate <ko>y 좌표</ko>
    * @param {Array} param.destPos End coordinate <ko>도착점 좌표</ko>
    * @param {Number} param.destPos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.destPos.1 y-coordinate <ko>y 좌표</ko>
    */
			if (!this._triggerEvent(consts.EVENTS.beforeFlickStart, pos)) {
				panel.changed = panel.animating = false;
				return false;
			} else {
				options.adaptiveHeight && this._setAdaptiveHeight(conf.touch.direction);
			}

			conf.indexToMove === 0 && this._setPanelNo();
		} else if (phase === "end") {
			if (options.circular && panel.changed) {
				this._arrangePanels(true, conf.indexToMove);
			}

			!consts.IS_ANDROID2 && this._setTranslate([-panel.size * panel.index, 0]);
			conf.touch.distance = conf.indexToMove = 0;

			/**
    * This event is fired after panel moves.
    * @ko 패널이 이동한 다음 발생하는 이벤트
    * @name eg.Flicking#flickEnd
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event <ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
    * @param {Number} param.direction Direction of the movemen (see eg.MovableCoord.DIRECTION_* constant) <ko>−	이동 방향(eg.MovableCoord.DIRECTION_* constant 참고</ko>
    */
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		this._adjustContainerCss(phase);
		return true;
	};

	/**
  * Get positive or negative according direction
  */


	Flicking.prototype._getNumByDirection = function _getNumByDirection() {
		var conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	};

	/**
  * Revert panel number
  */


	Flicking.prototype._revertPanelNo = function _revertPanelNo() {
		var panel = this._conf.panel;
		var num = this._getNumByDirection();

		var index = panel.currIndex >= 0 ? panel.currIndex : panel.index - num;
		var no = panel.currNo >= 0 ? panel.currNo : panel.no - num;

		this._setPanelNo({
			index: index,
			no: no
		});
	};

	/**
  * Set the panel number
  * @param {Object} obj number object
  */


	Flicking.prototype._setPanelNo = function _setPanelNo(obj) {
		var panel = this._conf.panel;
		var count = panel.origCount - 1;
		var num = this._getNumByDirection();

		if (_utils.utils.isObject(obj)) {
			for (var key in obj) {
				panel[key] = obj[key];
			}
		} else {
			// remember current value
			panel.currIndex = panel.index;
			panel.currNo = panel.no;

			panel.index += num;
			panel.no += num;
		}

		if (panel.no > count) {
			panel.no = 0;
		} else if (panel.no < 0) {
			panel.no = count;
		}
	};

	/**
  * Set pointerEvents css property on container element due to the iOS click bug
  * @param {Event} e
  */


	Flicking.prototype._setPointerEvents = function _setPointerEvents(e) {
		var pointer = _utils.utils.css(this.$container, "pointerEvents");
		var val = void 0;

		if (e && e.holding && e.hammerEvent && e.hammerEvent.preventSystemEvent && pointer !== "none") {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && _utils.utils.css(this.$container, { pointerEvents: val });
	};

	/**
  * Get coordinate value with unit
  * @param coords {Array} x,y numeric value
  * @return {Object} x,y coordinate value with unit
  */


	Flicking.prototype._getCoordsValue = function _getCoordsValue(coordsValue) {
		// the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
		var coords = this._getDataByDirection(coordsValue);

		return {
			x: _utils.utils.getUnitValue(coords[0]),
			y: _utils.utils.getUnitValue(coords[1])
		};
	};

	/**
  * Set translate property value
  * @param {Array} coords coordinate x,y value
  */


	Flicking.prototype._setTranslate = function _setTranslate(coordsValue) {
		var coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	};

	/**
  * Check if panel passed through threshold pixel
  */


	Flicking.prototype._isMovable = function _isMovable() {
		var options = this.options;
		var mcInst = this._mcInst;
		var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		var max = void 0;
		var currPos = void 0;

		if (!options.circular && isMovable) {
			max = this._getDataByDirection(mcInst.options.max)[0];
			currPos = this._getDataByDirection(mcInst.get())[0];

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	};

	/**
  * Trigger custom events
  * @param {String} name - event name
  * @param {Object} param - additional event value
  * @return {Boolean}
  */


	Flicking.prototype._triggerEvent = function _triggerEvent(name, param) {
		var conf = this._conf;
		var panel = conf.panel;

		// pass changed panel no only on 'flickEnd' event
		if (name === consts.EVENTS.flickEnd) {
			panel.currNo = panel.no;
			panel.currIndex = panel.index;
		}

		return this.trigger(conf.eventPrefix + name, _utils.utils.extend({
			eventType: name,
			index: panel.currIndex,
			no: panel.currNo,
			direction: conf.touch.direction
		}, param));
	};

	/**
  * Get next/prev panel element/index.
  * @param {Boolean} direction
  * @param {Boolean} element - true:to get element, false:to get index
  * @param {Number} physical - true : physical, false : logical
  * @return {HTMLElement|Number}
  */


	Flicking.prototype._getElement = function _getElement(direction, element, physical) {
		var panel = this._conf.panel;
		var circular = this.options.circular;
		var pos = panel.currIndex;
		var next = direction === this._conf.dirData[0];
		var result = null;
		var total = void 0;
		var index = void 0;

		if (physical) {
			total = panel.count;
			index = pos;
		} else {
			total = panel.origCount;
			index = panel.currNo;
		}

		var currentIndex = index;

		if (next) {
			if (index < total - 1) {
				index++;
			} else if (circular) {
				index = 0;
			}
		} else {
			if (index > 0) {
				index--;
			} else if (circular) {
				index = total - 1;
			}
		}

		if (currentIndex !== index) {
			result = element ? panel.$list[next ? pos + 1 : pos - 1] : index;
		}

		return result;
	};

	/**
  * Set value to force move panels when duration is 0
  * @param {Boolean} next
  */


	Flicking.prototype._setValueToMove = function _setValueToMove(next) {
		var conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	};

	/**
  * Returns the index number of the current panel element.
  * @ko 현재 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number} Index number of the current panel element <ko>현재 패널의 인덱스 번호</ko>
  */


	Flicking.prototype.getIndex = function getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	};

	/**
  * Returns the reference of the current panel element.
  * @ko 현재 패널 엘리먼트의 레퍼런스를 반환한다
  * @method eg.Flicking#getElement
  * @return {HTMLElement} Current element <ko>현재 엘리먼트</ko>
  */


	Flicking.prototype.getElement = function getElement() {
		var panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	};

	/**
  * Returns the reference of the next panel element.
  * @ko 다음 패널 엘리먼트의 레퍼런스를 반환한다.
  * @method eg.Flicking#getNextElement
  * @return {HTMLElement|null} Next panel element or null if it does not exist.<ko>다음 패널 엘리먼트. 패널이 없으면 'null'을 반환한다.</ko>
  */


	Flicking.prototype.getNextElement = function getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	};

	/**
  * Returns the index number of the next panel element.
  * @ko 다음 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getNextIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number|null} Index number of the next panel element or null if it does not exist. <ko>다음 패널 엘리먼트의 인덱스 번호. 패널이 없으면 'null'을 반환한다</ko>
  */


	Flicking.prototype.getNextIndex = function getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	};

	/**
  * Returns the references of whole panel elements.
  * @ko 패널을 구성하는 모든 엘리먼트의 레퍼런스를 반환한다
  * @method eg.Flicking#getAllElements
  * @return {HTMLElement} Whole panel elements <ko>모든 패널 엘리먼트</ko>
  */


	Flicking.prototype.getAllElements = function getAllElements() {
		return this._conf.panel.$list;
	};

	/**
  * Returns the reference of the previous panel element.
  * @ko 이전 패널 엘리먼트의 레퍼런스를 반환한다.
  * @method eg.Flicking#getPrevElement
  * @return {HTMLElement|null} Previous panel element or null if it does not exist. <ko>이전 패널 엘리먼트. 패널이 없으면 'null'을 반환한다</ko>
  */


	Flicking.prototype.getPrevElement = function getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	};

	/**
  * Returns the index number of the previous panel element.
  * @ko 이전 패널 엘리먼트의 인덱스 번호를 반환한다
  * @method eg.Flicking#getPrevIndex
  * @param {Boolean} [physical=false] Types of index numbers<br>- true: Indicates physical index numbers relative to DOM.<br>- false: Indicates logical index numbers relative to the panel content. <ko>−	인덱스 번호의 종류<br>- true: 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다.<br>- false: 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
  * @return {Number|null} Previous element index value or null if no more element exist<ko>이전 패널 인덱스 번호. 패널이 없는 경우에는 null</ko>
  */


	Flicking.prototype.getPrevIndex = function getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
	};

	/**
  * Returns the total number of whole panel elements.
  * @ko 전체 패널 엘리먼트의 개수를 반환한다
  * @method eg.Flicking#getTotalCount
  * @deprecated since 1.3.0
  * @param {Boolean} [physical=false] Number of elements relative to (true: DOM, false: panel content)<ko>엘리먼트 개수의 기준(true: DOM 엘리먼트 기준, false: 패널 콘텐츠 기준)</ko>
  * @return {Number} Total number of whole panel elements <ko>모든 패널 엘리먼트의 개수</ko>
  */


	Flicking.prototype.getTotalCount = function getTotalCount(physical) {
		return this._conf.panel[physical ? "count" : "origCount"];
	};

	/**
  * Checks whether the animated panel is playing.
  * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
  * @method eg.Flicking#isPlaying
  * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
  */


	Flicking.prototype.isPlaying = function isPlaying() {
		return this._conf.panel.animating;
	};

	/**
  * Move panel to the given direction
  * @param {Boolean} next
  * @param {Number} duration
  */


	Flicking.prototype._movePanel = function _movePanel(next, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;

		if (panel.animating || conf.touch.holding) {
			return undefined;
		}

		this._setValueToMove(next);

		if (options.circular || this[next ? "getNextIndex" : "getPrevIndex"]() != null) {
			this._movePanelByPhase("setBy", [panel.size * (next ? 1 : -1), 0], duration);
		}

		return this;
	};

	/**
  * Move panel applying start/end phase value
  * @param {String} method movableCoord method name
  * @param {Object} coords coordinate array value
  * @param {Number} durationValue duration value
  */


	Flicking.prototype._movePanelByPhase = function _movePanelByPhase(method, coords, durationValue) {
		var duration = _utils.utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setMovableCoord(method, coords, true, duration);
			!duration && this._setPhaseValue("end");
		}
	};

	/**
  * Moves an element to the next panel.
  * @ko 다음 패널로 이동한다.
  * @method eg.Flicking#next
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.next = function next(duration) {
		return this._movePanel(true, duration);
	};

	/**
  * Moves an element to the previous panel.
  * @ko 이전 패널로 이동한다.
  * @method eg.Flicking#prev
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.prev = function prev(duration) {
		return this._movePanel(false, duration);
	};

	/**
  * Moves an element to the indicated panel.
  * @ko 지정한 패널로 이동한다.
  * @method eg.Flicking#moveTo
  * @param {Number} no Logical index number of the target panel element, which is relative to the panel content. <ko>이동할 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.moveTo = function moveTo(noValue, duration) {
		var conf = this._conf;
		var panel = conf.panel;
		var circular = this.options.circular;
		var currentIndex = panel.index;
		var indexToMove = void 0;
		var isPositive = void 0;
		var no = noValue;

		no = _utils.utils.getNumValue(no, -1);

		if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating || conf.touch.holding) {
			return this;
		}

		indexToMove = no - (circular ? panel.no : currentIndex);
		isPositive = indexToMove > 0;

		// check for real panel count which can be moved on each sides in circular mode
		if (circular && Math.abs(indexToMove) > (isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
			indexToMove += (isPositive ? -1 : 1) * panel.count;
			isPositive = indexToMove > 0;
		}

		this._setPanelNo(circular ? { no: no } : { no: no, index: no });
		this._conf.indexToMove = indexToMove;
		this._setValueToMove(isPositive);

		this._movePanelByPhase(circular ? "setBy" : "setTo", [panel.size * (circular ? indexToMove : no), 0], duration);

		return this;
	};

	/**
  * Update panel's previewPadding size according options.previewPadding
  */


	Flicking.prototype._checkPadding = function _checkPadding() {
		var options = this.options;
		var previewPadding = options.previewPadding.concat();
		var padding = _utils.utils.css(this.$wrapper, "padding").split(" ");

		options.horizontal && padding.reverse();

		// get current padding value
		padding = [padding[0]];
		padding.push(padding[padding.length === 2 ? 0 : 2]);

		padding = padding.map(Number);

		// update padding when current and given are different
		if (previewPadding.length === 2 && previewPadding[0] !== padding[0] || previewPadding[1] !== padding[1]) {
			this._setPadding(previewPadding);
		}
	};

	/**
  * Updates the size of the panel.
  * @ko 패널의 크기를 갱신한다
  * @method eg.Flicking#resize
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  let some = new eg.Flicking("#mflick", {
 				previewPadding: [10,10]
 			});
 	 // when device orientaion changes
  some.resize();
 	 // or when changes previewPadding option from its original value
  some.options.previewPadding = [20, 30];
  some.resize();
  */


	Flicking.prototype.resize = function resize() {
		var _utils$css;

		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;
		var horizontal = options.horizontal;
		var panelSize = void 0;

		if (~~options.previewPadding.join("")) {
			this._checkPadding();
			panelSize = panel.size;
		} else if (horizontal) {
			panelSize = panel.size = _utils.utils.css(this.$wrapper, "width", true);
		}

		var maxCoords = this._getDataByDirection([panelSize * (panel.count - 1), 0]);

		// resize elements
		horizontal && _utils.utils.css(this.$container, { width: maxCoords[0] + panelSize + "px" });
		_utils.utils.css(panel.$list, (_utils$css = {}, _utils$css[horizontal ? "width" : "height"] = _utils.utils.getUnitValue(panelSize), _utils$css));

		// remove data-height attribute and re-evaluate panel's height
		if (options.adaptiveHeight) {
			var $panel = this.$container.querySelectorAll("[" + consts.DATA_HEIGHT + "]");

			if ($panel.length) {
				[].slice.call($panel).forEach(function (v) {
					return v.removeAttribute(consts.DATA_HEIGHT);
				});

				this._setAdaptiveHeight();
			}
		}

		this._mcInst.options.max = maxCoords;
		this._setMovableCoord("setTo", [panelSize * panel.index, 0], true, 0);

		if (consts.IS_ANDROID2) {
			this._applyPanelsPos();
			this._adjustContainerCss("end");
		}

		return this;
	};

	/**
  * Restores an element to its original position when it movement stops while the element is not dragged until a certain distance threshold is reached.
  * @ko 다음 패널로 바뀌기 전에 패널 이동이 멈췄을 때 원래 패널로 복원한다
  * @method eg.Flicking#restore
  * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * let some = new eg.Flicking("#mflick").on({
  *				beforeFlickStart : function(e) {
  *					if(e.no === 2) {
  *						e.stop();  // stop flicking
  *						this.restore(100);  // restoring to previous position
  *					}
  *				}
  *			);
  */


	Flicking.prototype.restore = function restore(durationValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var currPos = this._getDataByDirection(this._mcInst.get());
		var duration = durationValue;
		var destPos = void 0;

		// check if the panel isn't in right position
		if (currPos[0] !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = _utils.utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = this._getDataByDirection([panel.size * panel.index, 0]);

			this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
			this._setMovableCoord("setTo", destPos, true, duration);

			if (!duration) {
				this._adjustContainerCss("end");
				this._triggerRestore();
			}

			// to handle on api call
		} else if (panel.changed) {
			this._revertPanelNo();
			conf.touch.distance = conf.indexToMove = 0;
		}

		return this;
	};

	/**
  * Enables input devices.
  * @ko 입력 장치를 사용할 수 있게 한다
  * @method eg.Flicking#enableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.enableInput = function enableInput() {
		this._mcInst.enableInput();
		return this;
	};

	/**
  * Disables input devices.
  * @ko 입력 장치를 사용할 수 없게 한다.
  * @method eg.Flicking#disableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.disableInput = function disableInput() {
		this._mcInst.disableInput();
		return this;
	};

	/**
  * Destroys elements, properties, and events used in a panel.
  * @ko 패널에 사용한 엘리먼트와 속성, 이벤트를 해제한다
  * @method eg.Flicking#destroy
  */


	Flicking.prototype.destroy = function destroy() {
		var conf = this._conf;
		var origPanelStyle = conf.origPanelStyle;
		var wrapper = origPanelStyle.wrapper;
		var container = origPanelStyle.container;
		var list = origPanelStyle.list;

		// unwrap container element and restore original inline style
		// restore wrapper style
		var $wrapper = this.$wrapper;

		$wrapper.setAttribute("class", wrapper.className);
		$wrapper[wrapper.style ? "setAttribute" : "removeAttribute"]("style", wrapper.style);

		// restore container style
		var $container = this.$container;
		var $children = [].slice.call($container.children);

		if (origPanelStyle.container.className) {
			$container.setAttribute("class", container.className);
			$container[container.style ? "setAttribute" : "removeAttribute"]("style", container.style);
		} else {
			$children.forEach(function (v) {
				return $wrapper.appendChild(v);
			});
			$container.parentNode.removeChild($container);
		}

		for (var i = 0, $el; $el = $children[i]; i++) {
			if (i > list.length - 1) {
				$el.parentNode.removeChild($el);
				break;
			}

			var className = list[i].className;
			var style = list[i].style;

			$el[className ? "setAttribute" : "removeAttribute"]("class", className);
			$el[style ? "setAttribute" : "removeAttribute"]("style", style);
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// release resources
		for (var x in this) {
			this[x] = null;
		}
	};

	return Flicking;
}((0, _utils.Mixin)(_component2.default).with(_eventHandler2.default));

exports.default = Flicking;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// internal config values
var CONFIG = {
	panel: {
		$list: null, // panel list
		index: 0, // dom index used among process
		no: 0, // panel no used among process
		currIndex: 0, // current physical dom index
		currNo: 0, // current logical panel number
		size: 0, // panel size
		count: 0, // total physical panel count
		origCount: 0, // total count of given original panels
		changed: false, // if panel changed
		animating: false, // current animating status boolean
		minCount: 3 // minimum panel count
	},
	touch: {
		holdPos: [0, 0], // hold x,y coordinate
		destPos: [0, 0], // destination x,y coordinate
		distance: 0, // touch distance pixel of start to end touch
		direction: null, // touch direction
		lastPos: 0, // to determine move on holding
		holding: false
	},
	customEvent: { // for custom events value
		flick: true,
		restore: false,
		restoreCall: false
	},
	dirData: [], // direction constant value according horizontal or vertical
	indexToMove: 0,
	$dummyAnchor: null // For buggy link highlighting on Android 2.x
};

// default options
var OPTIONS = {
	hwAccelerable: true, // ns.isHWAccelerable(),  // check weather hw acceleration is available
	prefix: "eg-flick", // prefix value of class name
	deceleration: 0.0006, // deceleration value
	horizontal: true, // move direction (true == horizontal, false == vertical)
	circular: false, // circular mode. In this mode at least 3 panels are required.
	previewPadding: null, // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
	bounce: null, // bounce value in left(up) to right(down) order. Works only in non-circular mode.
	threshold: 40, // the distance pixel threshold value for change panel
	duration: 100, // duration ms for animation
	panelEffect: function panelEffect(x) {
		return 1 - Math.pow(1 - x, 3);
	}, // easing function for panel change animation
	defaultIndex: 0, // initial panel index to be shown
	inputType: [// input type
	"touch", "mouse"],
	thresholdAngle: 45, // the threshold value that determines whether user action is horizontal or vertical (0~90)
	adaptiveHeight: false // Set container's height be adaptive according panel's height
};

exports.CONFIG = CONFIG;
exports.OPTIONS = OPTIONS;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _consts = __webpack_require__(3);

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


exports.default = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, _superclass.apply(this, arguments));
		}

		/**
   * 'hold' event handler
   */
		_class.prototype._holdHandler = function _holdHandler(e) {
			var conf = this._conf;

			conf.touch.holdPos = e.pos;
			conf.touch.holding = true;
			conf.panel.changed = false;

			this._adjustContainerCss("start", e.pos);
		};

		/**
   * 'change' event handler
   */


		_class.prototype._changeHandler = function _changeHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var posIndex = +!this.options.horizontal;
			var pos = e.pos[posIndex];
			var holdPos = touch.holdPos[posIndex];
			var direction = void 0;
			var eventRes = null;
			var movedPx = void 0;

			this._setPointerEvents(e); // for "click" bug

			/**
    * This event is fired when panel moves.
    * @ko 패널이 이동할 때 발생하는 이벤트
    * @name eg.Flicking#flick
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event<ko>이름명</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.MovableCoord.DIRECTION_* constant) <ko>이동 방향(eg.MovableCoord.DIRECTION_* constant 참고)</ko>
    * @param {Array} param.pos Start coordinate <ko>출발점 좌표</ko>
    * @param {Number} param.pos.0 x-coordinate <ko>x 좌표</ko>
    * @param {Number} param.pos.1 y-coordinate <ko>y 좌표</ko>
    * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device. <ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
    * @param {Number} param.distance Distance moved from then starting point. According the move direction, positive on eg.MovableCoord.DIRECTION_LEFT/UP and negative on eg.MovableCoord.DIRECTION_RIGHT/DOWN <ko>시작점부터 이동된 거리의 값. 이동 방향에 따라 eg.MovableCoord.DIRECTION_LEFT/UP의 경우 양수를 eg.MovableCoord.DIRECTION_RIGHT/DOWN의 경우는 음수를 반환</ko>
    */
			if (e.hammerEvent) {
				direction = e.hammerEvent.direction;

				// Adjust direction in case of diagonal touch move
				movedPx = e.hammerEvent[this.options.horizontal ? "deltaX" : "deltaY"];

				if (!~conf.dirData.indexOf(direction)) {
					direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
				}

				touch.lastPos = movedPx;
			} else {
				touch.lastPos = null;
			}

			conf.customEvent.flick && (eventRes = this._triggerEvent(consts.EVENTS.flick, {
				pos: e.pos,
				holding: e.holding,
				direction: direction || touch.direction,
				distance: pos - (holdPos || (touch.holdPos[posIndex] = pos))
			}));

			(eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
		};

		/**
   * 'release' event handler
   */


		_class.prototype._releaseHandler = function _releaseHandler(e) {
			var touch = this._conf.touch;
			var pos = e.destPos;
			var posIndex = +!this.options.horizontal;
			var holdPos = touch.holdPos[posIndex];
			var panelSize = this._conf.panel.size;

			touch.distance = e.depaPos[posIndex] - touch.holdPos[posIndex];

			touch.direction = this._conf.dirData[+!(touch.holdPos[posIndex] < e.depaPos[posIndex])];

			pos[posIndex] = Math.max(holdPos - panelSize, Math.min(holdPos, pos[posIndex]));

			touch.destPos[posIndex] = pos[posIndex] = Math.round(pos[posIndex] / panelSize) * panelSize;

			touch.distance === 0 && this._adjustContainerCss("end");
			touch.holding = false;

			this._setPointerEvents(); // for "click" bug
		};

		/**
   * 'animationStart' event handler
   */


		_class.prototype._animationStartHandler = function _animationStartHandler(e) {
			var conf = this._conf;
			var panel = conf.panel;
			var customEvent = conf.customEvent;

			panel.animating = true;

			if (!customEvent.restoreCall && e.hammerEvent && this._setPhaseValue("start", {
				depaPos: e.depaPos,
				destPos: e.destPos
			}) === false) {
				e.stop();
			}

			if (e.hammerEvent) {
				e.duration = this.options.duration;

				e.destPos[+!this.options.horizontal] = panel.size * (panel.index + conf.indexToMove);
			}

			if (this._isMovable()) {
				!customEvent.restoreCall && (customEvent.restore = false);
			} else {
				this._triggerBeforeRestore(e);
			}
		};

		/**
   * 'animationEnd' event handler
   */


		_class.prototype._animationEndHandler = function _animationEndHandler() {
			this._setPhaseValue("end");

			this._conf.panel.animating = false;
			this._triggerRestore();
		};

		return _class;
	}(superclass);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _flicking = __webpack_require__(6);

var _flicking2 = _interopRequireDefault(_flicking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _flicking2.default; /**
                                      * Copyright (c) 2015 NAVER Corp.
                                      * egjs projects are licensed under the MIT license
                                      */

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Mixin = exports.utils = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                               */


var _browser = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {
	/**
  * Select or create element
  * @param {String|HTMLElement} param
  *  when string given is as HTML tag, then create element
  *  otherwise it returns selected elements
  * @returns {HTMLElement}
  */
	$: function $(param) {
		var el = null;

		if (typeof param === "string") {
			// check if string is HTML tag format
			var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {
				el = _browser.document.createElement(match[1]);

				// attributes
				match.length === 3 && match[2].split(" ").forEach(function (v) {
					var attr = v.split("=");

					el.setAttribute(attr[0], attr[1].trim().replace(/(^["']|["']$)/g, ""));
				});
			} else {
				el = _browser.document.querySelectorAll(param);

				if (!el.length) {
					el = null;
				} else if (el.length === 1) {
					el = el[0];
				}
			}
		} else if (param.nodeName && param.nodeType === 1) {
			el = param;
		}

		return el;
	},


	/**
  * Check if is array
  * @param arr
  * @returns {Boolean}
  */
	isArray: function isArray(arr) {
		return arr && arr.constructor === Array;
	},


	/**
  * Check if is object
  * @param {Object} obj
  * @returns {Boolean}
  */
	isObject: function isObject(obj) {
		return obj && !obj.nodeType && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && !this.isArray(obj);
	},


	/**
  * Merge object returning new object
  * @param {Object} target
  * @param {Object} objectN
  * @returns {Object} merged target object
  * @example
  *  var target = { a: 1 };
  *  utils.extend(target, { b: 2, c: 3 });
  *  target;  // { a: 1, b: 2, c: 3 };
  */
	extend: function extend(target) {
		var _this = this;

		for (var _len = arguments.length, objectN = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			objectN[_key - 1] = arguments[_key];
		}

		if (!objectN.length || objectN.length === 1 && !objectN[0]) {
			return target;
		}

		var source = objectN.shift();

		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach(function (key) {
				var value = source[key];

				if (_this.isObject(value)) {
					!target[key] && (target[key] = {});

					target[key] = _this.extend(target[key], value);
				} else {
					target[key] = _this.isArray(value) ? value.concat() : value;
				}
			});
		}

		return this.extend.apply(this, [target].concat(objectN));
	},


	/**
  * Get or set the style value or apply
  * @param {HTMLElement} el
  * @param {String|Object} style
  *  String: return style property value
  *  Object: set style value
  * @parma {Boolean} getAsNumber - get the value as number
  * @returns {String|HTMLElement}
  */
	css: function css(el, style, getAsNumber) {
		if (typeof style === "string") {
			var value = _browser.window.getComputedStyle(el)[style];

			return getAsNumber ? this.getNumValue(value) : value;
		} else {
			var applyStyle = function applyStyle(target, source) {
				return Object.keys(source).forEach(function (v) {
					target[v] = source[v];
				});
			};

			this.isArray(el) ? el.forEach(function (v) {
				return applyStyle(v.style, style);
			}) : applyStyle(el.style, style);
		}

		return el;
	},


	/**
  * Check and parse value to number
  * @param {Number|String} val
  * @param {Number} defVal
  * @return {Number}
  */
	getNumValue: function getNumValue(val, defVal) {
		var num = val;

		return isNaN(num = parseInt(num, 10)) ? defVal : num;
	},


	/**
  * Return unit formatted value
  * @param {Number|String} val
  * @return {String} val Value formatted with unit
  */
	getUnitValue: function getUnitValue(val) {
		var rx = /(?:[a-z]{2,}|%)$/;

		return (parseInt(val, 10) || 0) + (String(val).match(rx) || "px");
	},


	/**
  * Get element's outer value
  * @param {HTMLElement} el
  * @param {String} type - [outerWidth|outerHeight]
  * @returns {Number} outer's value
  */
	getOuter: function getOuter(el, type) {
		var style = _browser.window.getComputedStyle(el);
		var margin = type === "outerWidth" ? ["marginLeft", "marginRight"] : ["marginTop", "marginBottom"];

		return this.getNumValue(style[type.replace("outer", "").toLocaleLowerCase()]) + this.getNumValue(style[margin[0]]) + this.getNumValue(style[margin[1]]);
	},


	/**
  * Get element's outerWidth value with margin
  * @param {HTMLElement} el
  * @returns {Number}
  */
	outerWidth: function outerWidth(el) {
		return this.getOuter(el, "outerWidth");
	},


	/**
  * Get element's outerHeight value with margin
  * @param {HTMLElement} el
  * @returns {Number}
  */
	outerHeight: function outerHeight(el) {
		return this.getOuter(el, "outerHeight");
	},


	/**
  * Checks whether hardware acceleration is enabled.
  *
  * @ko 하드웨어 가속을 사용할 수 있는 환경인지 확인한다
  * @method eg#isHWAccelerable
  * @return {Boolean} Indicates whether hardware acceleration is enabled. <ko>하드웨어 가속 사용 가능 여부</ko>
  */
	isHWAccelerable: function isHWAccelerable() {
		var ua = _browser.window.navigator.userAgent;
		var result = false;
		var match = void 0;

		// chrome 25- has a text blur bug (except Samsung's sbrowser)
		if (match = ua.match(/Chrome\/(\d+)/)) {
			result = match[1] >= "25";
		} else if (/ie|edge|firefox|safari|inapp/.test(ua)) {
			result = true;
		} else if (match = ua.match(/Android ([\d.]+)/)) {
			var version = match[1];
			var useragent = (ua.match(/\(.*\)/) || [null])[0];

			// android 4.1+ blacklist
			// EK-GN120 : Galaxy Camera, SM-G386F : Galaxy Core LTE
			// SHW-M420 : Galaxy Nexus , SHW-M200 : NexusS , GT-S7562 : Galaxy S duos
			result = version >= "4.1.0" && !/EK-GN120|SM-G386F/.test(useragent) || version >= "4.0.3" && /SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(useragent) && !/SHW-M420|SHW-M200|GT-S7562/.test(useragent);
		}

		this.isHWAccelerable = function () {
			return result;
		};
		return result;
	},


	/**
  * Returns the syntax of the translate style which is applied to CSS transition properties.
  *
  * @ko CSS 트랜지션 속성에 적용할 translate 스타일 구문을 반환한다
  * @method eg#translate
  * @param {String} x Distance to move along the X axis <ko>x축을 따라 이동할 거리</ko>
  * @param {String} y Distance to move along the Y axis <ko>y축을 따라 이동할 거리</ko>
  * @param {Boolean} [isHA] Force hardware acceleration <ko>하드웨어 가속 사용 여부</ko>
  * @return {String} Syntax of the translate style <ko>translate 스타일 구문</ko>
  */
	translate: function translate(x, y, isHA) {
		return isHA || false ? "translate3d(" + x + "," + y + ",0)" : "translate(" + x + "," + y + ")";
	},


	// 1. user press one position on screen.
	// 2. user moves to the other position on screen.
	// 3. when user releases fingers on screen, 'click' event is fired at previous position.
	hasClickBug: function hasClickBug() {
		var ua = _browser.window.navigator.userAgent;
		var result = /Safari/.test(ua);

		this.hasClickBug = function () {
			return result;
		};
		return result;
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype.with = function _with() {
		for (var _len2 = arguments.length, mixins = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			mixins[_key2] = arguments[_key2];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.utils = utils;
exports.Mixin = Mixin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}

	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this.options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this.options[key];
			}

			if (arguments.length === 0) {
				return this.options;
			}

			var options = key;
			this.options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var self = this;
				this.on(eventName, function listener() {
					for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
						arg[_key3] = arguments[_key3];
					}

					handlerToAttach.apply(self, arg);
					self.off(eventName, listener);
				});
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @class
 * @group egjs
 * @name eg.Component
 * @ko 컴포넌트의 이벤트와 옵션을 관리할 수 있게 하는 클래스
 *
 * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 */
var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}

	/**
  * Sets options in a component or returns them.
  * @ko 컴포넌트에 옵션을 설정하거나 옵션을 반환한다
  * @method eg.Component#option
  * @param {String} key The key of the option<ko>옵션의 키</ko>
  * @param {Object} [value] The option value that corresponds to a given key <ko>키에 해당하는 옵션값</ko>
  * @return {eg.Component|Object} An instance, an option value, or an option object of a component itself.<br>- If both key and value are used to set an option, it returns an instance of a component itself.<br>- If only a key is specified for the parameter, it returns the option value corresponding to a given key.<br>- If nothing is specified, it returns an option object. <ko>컴포넌트 자신의 인스턴스나 옵션값, 옵션 객체.<br>- 키와 값으로 옵션을 설정하면 컴포넌트 자신의 인스턴스를 반환한다.<br>- 파라미터에 키만 설정하면 키에 해당하는 옵션값을 반환한다.<br>- 파라미터에 아무것도 설정하지 않으면 옵션 객체를 반환한다.</ko>
  * @example
 	 class Some extends eg.Component{
 		}
 	 const some = new Some({
 		"foo": 1,
 		"bar": 2
 	});
 	 some.option("foo"); // return 1
  some.option("foo",3); // return some instance
  some.option(); // return options object.
  some.option({
 		"foo" : 10,
 		"bar" : 20,
 		"baz" : 30
 	}); // return some instance.
  */


	_createClass(Component, [{
		key: "option",
		value: function option() {
			if (arguments.length >= 2) {
				var _key = arguments.length <= 0 ? undefined : arguments[0];
				var value = arguments.length <= 1 ? undefined : arguments[1];
				this.options[_key] = value;
				return this;
			}

			var key = arguments.length <= 0 ? undefined : arguments[0];
			if (typeof key === "string") {
				return this.options[key];
			}

			if (arguments.length === 0) {
				return this.options;
			}

			var options = key;
			this.options = options;

			return this;
		}
		/**
   * Triggers a custom event.
   * @ko 커스텀 이벤트를 발생시킨다
   * @method eg.Component#trigger
   * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
   * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
   * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다.</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.trigger("hi");// fire hi event.
  		}
  	}
   */

	}, {
		key: "trigger",
		value: function trigger(eventName) {
			var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var handlerList = this._eventHandler[eventName] || [];
			var hasHandlerList = handlerList.length > 0;

			if (!hasHandlerList) {
				return true;
			}

			// If detach method call in handler in first time then handeler list calls.
			handlerList = handlerList.concat();

			customEvent.eventType = eventName;

			var isCanceled = false;
			var arg = [customEvent];
			var i = void 0;

			customEvent.stop = function () {
				return isCanceled = true;
			};

			for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
				restParam[_key2 - 2] = arguments[_key2];
			}

			if (restParam.length >= 1) {
				arg = arg.concat(restParam);
			}

			for (i in handlerList) {
				handlerList[i].apply(this, arg);
			}

			return !isCanceled;
		}
		/**
   * Executed event just one time.
   * @ko 이벤트가 한번만 실행된다.
   * @method eg.Component#once
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
  		hi(){
  			alert("hi");
  		}
  		thing(){
  			this.once("hi", this.hi);
  		}
  	}
  	 var some = new Some();
   some.thing();
   some.trigger("hi");
   // fire alert("hi");
   some.trigger("hi");
   // Nothing happens
   */

	}, {
		key: "once",
		value: function once(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var i = void 0;
				for (i in eventHash) {
					this.once(i, eventHash[i]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var self = this;
				this.on(eventName, function listener() {
					for (var _len2 = arguments.length, arg = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
						arg[_key3] = arguments[_key3];
					}

					handlerToAttach.apply(self, arg);
					self.off(eventName, listener);
				});
			}

			return this;
		}

		/**
   * Checks whether an event has been attached to a component.
   * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
   * @method eg.Component#hasOn
   * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
   * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
   * @example
   class Some extends eg.Component{
  		some(){
  			this.hasOn("hi");// check hi event.
  		}
  	}
   */

	}, {
		key: "hasOn",
		value: function hasOn(eventName) {
			return !!this._eventHandler[eventName];
		}

		/**
   * Attaches an event to a component.
   * @ko 컴포넌트에 이벤트를 등록한다.
   * @method eg.Component#on
   * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
   * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.on("hi",this.hi); //attach event
  		}
  	}
   */

	}, {
		key: "on",
		value: function on(eventName, handlerToAttach) {
			if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
				var eventHash = eventName;
				var name = void 0;
				for (name in eventHash) {
					this.on(name, eventHash[name]);
				}
				return this;
			} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
				var handlerList = this._eventHandler[eventName];

				if (typeof handlerList === "undefined") {
					handlerList = this._eventHandler[eventName] = [];
				}

				handlerList.push(handlerToAttach);
			}

			return this;
		}
		/**
   * Detaches an event from the component.
   * @ko 컴포넌트에 등록된 이벤트를 해제한다
   * @method eg.Component#off
   * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
   * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
   * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
   * @example
   class Some extends eg.Component{
   		hi(){
  			console.log("hi");
   		}
  		some(){
  			this.off("hi",this.hi); //detach event
  		}
  	}
   */

	}, {
		key: "off",
		value: function off(eventName, handlerToDetach) {
			// All event detach.
			if (typeof eventName === "undefined") {
				this._eventHandler = {};
				return this;
			}

			// All handler of specific event detach.
			if (typeof handlerToDetach === "undefined") {
				if (typeof eventName === "string") {
					this._eventHandler[eventName] = undefined;
					return this;
				} else {
					var eventHash = eventName;
					var name = void 0;
					for (name in eventHash) {
						this.off(name, eventHash[name]);
					}
					return this;
				}
			}

			// The handler of specific event detach.
			var handlerList = this._eventHandler[eventName];
			if (handlerList) {
				var k = void 0;
				var handlerFunction = void 0;
				for (k = 0, handlerFunction; handlerFunction = handlerList[k]; k++) {
					if (handlerFunction === handlerToDetach) {
						handlerList = handlerList.splice(k, 1);
						break;
					}
				}
			}

			return this;
		}
	}]);

	return Component;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(0);

module.exports = _component.Component;

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__consts__ = __webpack_require__(0);




/**
 * Hammer helps you add support for touch gestures to your page
 *
 * @external Hammer
 * @see {@link http://hammerjs.github.io|Hammer.JS}
 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS
 */
if (typeof __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a === "undefined") {
	throw new Error(`The Hammerjs must be loaded before eg.MovableCoord.\nhttp://hammerjs.github.io/`);
}

class HammerManager {
	constructor() {
		this._hammers = {};
	}

	static createHammer(el, bindOptions, inputClass, handler) {
		try {
			// create Hammer
			return HammerManager.attachHammerEvents(new __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.Manager(el, {
				recognizers: [
					[
						__WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.Pan, {
							direction: bindOptions.direction,
							threshold: 0,
						},
					],
				],

				// css properties were removed due to usablility issue
				// http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
				cssProps: {
					userSelect: "none",
					touchSelect: "none",
					touchCallout: "none",
					userDrag: "none",
				},
				inputClass,
			}), bindOptions, handler);
		} catch (e) {
			return null;
		}
	}

	static attachHammerEvents(hammer, options, handler) {
		const enable = hammer.get("pan").options.enable;

		/* eslint-disable no-underscore-dangle */
		return hammer
			.on("hammer.input", e => {
				if (e.isFirst) {
					// apply options each
					handler._setCurrentTarget(hammer, options);
					enable && handler._start(e);
				} else if (e.isFinal) {
					// substitute .on("panend tap", this._panend); Because it(tap, panend) cannot catch vertical(horizontal) movement on HORIZONTAL(VERTICAL) mode.
					enable && handler._end(e);
				}
			}).on("panstart panmove", e => handler._move(e));
		/* eslint-enable no-underscore-dangle */
	}

	static detachHammerEvents(hammer) {
		hammer.off("hammer.input panstart panmove panend");
	}

	static convertInputType(inputType = []) {
		let hasTouch = false;
		let hasMouse = false;
		const inputs = inputType || [];

		inputs.forEach(v => {
			switch (v) {
				case "mouse" : hasMouse = true; break;
				case "touch" : hasTouch = __WEBPACK_IMPORTED_MODULE_2__consts__["b" /* SUPPORT_TOUCH */];
				// no default
			}
		});
		return (hasTouch && __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.TouchInput) ||
			(hasMouse && __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.MouseInput) || null;
	}

	add(element, options, handler) {
		const el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $ */])(element);
		let keyValue = el.getAttribute(__WEBPACK_IMPORTED_MODULE_2__consts__["c" /* UNIQUEKEY */]);
		const bindOptions = Object.assign({
			direction: __WEBPACK_IMPORTED_MODULE_2__consts__["a" /* DIRECTION */].DIRECTION_ALL,
			scale: [1, 1],
			thresholdAngle: 45,
			interruptable: true,
			inputType: ["touch", "mouse"],
		}, options);
		const inputClass = HammerManager.convertInputType(bindOptions.inputType);

		if (!inputClass) {
			return;
		}

		if (keyValue) {
			this._hammers[keyValue].hammer.destroy();
		} else {
			keyValue = Math.round(Math.random() * new Date().getTime());
		}
		this._hammers[keyValue] = {
			hammer: HammerManager.createHammer(
				el,
				bindOptions,
				inputClass,
				handler
			),
			el,
			options: bindOptions,
		};
		el.setAttribute(__WEBPACK_IMPORTED_MODULE_2__consts__["c" /* UNIQUEKEY */], keyValue);
	}

	remove(element) {
		const el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $ */])(element);
		const key = el.getAttribute(__WEBPACK_IMPORTED_MODULE_2__consts__["c" /* UNIQUEKEY */]);

		if (key) {
			const hammer = this._hammers[key].hammer;

			HammerManager.detachHammerEvents(hammer);
			hammer.destroy();
			delete this._hammers[key];
			el.removeAttribute(__WEBPACK_IMPORTED_MODULE_2__consts__["c" /* UNIQUEKEY */]);
		}
	}

	getHammer(element) {
		const data = this.get(element);

		return data ? data.hammer : null;
	}

	get(element) {
		const el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $ */])(element);
		const key = el ? el.getAttribute(__WEBPACK_IMPORTED_MODULE_2__consts__["c" /* UNIQUEKEY */]) : null;

		if (key && this._hammers[key]) {
			return this._hammers[key];
		} else {
			return null;
		}
	}

	inputControl(isEnable, element) {
		const option = {
			enable: isEnable,
		};

		if (element) {
			const hammer = this.getHammer(element);

			hammer && hammer.get("pan").set(option);
		} else { // for multi
			for (const p in this._hammers) {
				this._hammers[p].hammer.get("pan").set(option);
			}
		}
		return this;
	}

	destroy() {
		for (const p in this._hammers) {
			this.remove(this._hammers[p].el);
		}
		this._hammers = {};
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HammerManager;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__egjs_component__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__egjs_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__egjs_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HammerManager__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eventHandler__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__animationHandler__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__consts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(5);







/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.MovableCoord module, see demos.
 * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치로 전달 받은 사용자의 동작을 가상 좌표계의 논리적 좌표로 변경하는 모듈. 사용자의 동작으로 애니메이션이 일어나면 시간순으로 변경되는 좌표 정보도 제공한다. 변경된 논리적 좌표를 반영해 UI를 구현할 수 있다. eg.MovableCoord 모듈의 자세한 작동 방식은 데모를 참고한다.
 * @alias eg.MovableCoord
 * @extends eg.Component
 *
 * @codepen {"id":"jPPqeR", "ko":"MovableCoord Cube 예제", "en":"MovableCoord Cube example", "collectionId":"AKpkGW", "height": 403}
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
const MovableCoord = class MovableCoord
extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* Mixin */])(__WEBPACK_IMPORTED_MODULE_0__egjs_component___default.a).with(__WEBPACK_IMPORTED_MODULE_2__eventHandler__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__animationHandler__["a" /* default */]) {
	/**
	 * @param {Object} options The option object of the eg.MovableCoord module<ko>eg.MovableCoord 모듈의 옵션 객체</ko>
	 * @param {Array} options.min The minimum value of X and Y coordinates <ko>좌표계의 최솟값</ko>
	 * @param {Number} [options.min.0=0] The X coordinate of the minimum <ko>최소 x좌표</ko>
	 * @param {Number} [options.min.1=0] The Y coordinate of the minimum <ko>최소 y좌표</ko>
	 *
	 * @param {Array} options.max The maximum value of X and Y coordinates <ko>좌표계의 최댓값</ko>
	 * @param {Number} [options.max.0=100] The X coordinate of the maximum<ko>최대 x좌표</ko>
	 * @param {Number} [options.max.1=100] The Y coordinate of the maximum<ko>최대 y좌표</ko>
	 *
	 * @param {Array} options.bounce The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
	 * @param {Boolean} [options.bounce.0=10] The size of top area <ko>위쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.1=10] The size of right area <ko>오른쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.2=10] The size of bottom area <ko>아래쪽 바운스 영역의 크기</ko>
	 * @param {Boolean} [options.bounce.3=10] The size of left area <ko>왼쪽 바운스 영역의 크기</ko>
	 *
	 * @param {Array} options.margin The size of accessible space outside the coordinate area. If an element is dragged outside the coordinate area and then dropped, the coordinates of the element are returned back into the coordinate area. The size of margins that can be exceeded <ko>−	좌표 영역을 넘어 이동할 수 있는 바깥 영역의 크기. 사용자가 좌표를 바깥 영역까지 끌었다가 놓으면 좌표가 좌표 영역 안으로 들어온다.</ko>
	 * @param {Boolean} [options.margin.0=0] The size of top margin <ko>위쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.1=0] The size of right margin <ko>오른쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.2=0] The size of bottom margin <ko>아래쪽 바깥 영역의 크기</ko>
	 * @param {Boolean} [options.margin.3=0] The size of left margin <ko>왼쪽 바깥 영역의 크기</ko>
	 * @param {Array} options.circular Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
	 * @param {Boolean} [options.circular.0=false] Indicates whether to circulate to top <ko>위로 순환 여부</ko>
	 * @param {Boolean} [options.circular.1=false] Indicates whether to circulate to right <ko>오른쪽으로 순환 여부</ko>
	 * @param {Boolean} [options.circular.2=false] Indicates whether to circulate to bottom  <ko>아래로 순환 여부</ko>
	 * @param {Boolean} [options.circular.3=false] Indicates whether to circulate to left  <ko>왼쪽으로 순환 여부</ko>
	 *
	 * @param {Function} [options.easing=easing.easeOutCubic] The easing function to apply to an animation. If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}) <ko>애니메이션에 적용할 easing 함수. 다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
	 * @param {Number} [options.maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
	 * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
	 **/
	constructor(options) {
		super();
		Object.assign(this.options = {
			min: [0, 0],
			max: [100, 100],
			bounce: [10, 10, 10, 10],
			margin: [0, 0, 0, 0],
			circular: [false, false, false, false],
			easing: function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			},
			maximumDuration: Infinity,
			deceleration: 0.0006,
		}, options);
		this._reviseOptions();
		this._hammerManager = new __WEBPACK_IMPORTED_MODULE_1__HammerManager__["a" /* default */]();
		this._pos = this.options.min.concat();
	}

	/**
	 * Registers an element to use the eg.MovableCoord module.
	 * @ko eg.MovableCoord 모듈을 사용할 엘리먼트를 등록한다
	 * @param {HTMLElement|String|jQuery} element An element to use the eg.MovableCoord module<ko>−	eg.MovableCoord 모듈을 사용할 엘리먼트</ko>
	 * @param {Object} options The option object of the bind() method <ko>bind() 메서드의 옵션 객체</ko>
	 * @param {Number} [options.direction=eg.MovableCoord.DIRECTION_ALL] Coordinate direction that a user can move<br>- eg.MovableCoord.DIRECTION_ALL: All directions available.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: Horizontal direction only.<br>- eg.MovableCoord.DIRECTION_VERTICAL: Vertical direction only<ko>사용자의 동작으로 움직일 수 있는 좌표의 방향.<br>- eg.MovableCoord.DIRECTION_ALL: 모든 방향으로 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_HORIZONTAL: 가로 방향으로만 움직일 수 있다.<br>- eg.MovableCoord.DIRECTION_VERTICAL: 세로 방향으로만 움직일 수 있다.</ko>
	 * @param {Array} options.scale Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
	 * @param {Number} [options.scale.0=1] X-axis scale <ko>x축 배율</ko>
	 * @param {Number} [options.scale.1=1] Y-axis scale <ko>y축 배율</ko>
	 * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
	 * @param {Number} [options.interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
	 * @param {Array} [options.inputType] Types of input devices. (default: ["touch", "mouse"])<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.(기본값: ["touch", "mouse"])<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
	 *
	 * @return {eg.MovableCoord} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
	 */
	bind(element, options) {
		this._hammerManager.add(element, options, this);
		return this;
	}
	/**
	 * Detaches an element using the eg.MovableCoord module.
	 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트를 해제한다
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is detached<ko>eg.MovableCoord 모듈을 해제할 엘리먼트</ko>
	 * @return {eg.MovableCoord} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
	 */
	unbind(element) {
		this._hammerManager.remove(element);
		return this;
	}

	/**
	 * get a hammer instance from elements using the eg.MovableCoord module.
	 * @ko eg.MovableCoord 모듈을 사용하는 엘리먼트에서 hammer 객체를 얻는다
	 * @param {HTMLElement|String|jQuery} element An element from which the eg.MovableCoord module is using<ko>eg.MovableCoord 모듈을 사용하는 엘리먼트</ko>
	 * @return {external:Hammer|null} An instance of Hammer.JS<ko>Hammer.JS의 인스턴스</ko>
	 */
	getHammer(element) {
		return this._hammerManager.getHammer(element);
	}

	/**
	 * Enables input devices
	 * @ko 입력 장치를 사용할 수 있게 한다
	 * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	*/
	enableInput(element) {
		return this._hammerManager.inputControl(true, element);
	}

	/**
	 * Disables input devices
	 * @ko 입력 장치를 사용할 수 없게 한다.
	 * @param {HTMLElement|String|jQuery} [element] An element from which the eg.MovableCoord module is using (if the element parameter is not present, it applies to all binded elements)<<ko>eg.MovableCoord 모듈을 	사용하는 엘리먼트 (element 파라미터가 존재하지 않을 경우, 바인드된 모든 엘리먼트에 적용된다)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	 */
	disableInput(element) {
		return this._hammerManager.inputControl(false, element);
	}

	/**
	 * set up 'css' expression
	 * @private
	 */
	_reviseOptions() {
		let key;

		["bounce", "margin", "circular"].forEach(v => {
			key = this.options[v];
			if (key != null) {
				if (key.constructor === Array) {
					this.options[v] = key.length === 2 ?
						key.concat(key) : key.concat();
				} else if (/string|number|boolean/.test(typeof key)) {
					this.options[v] = [key, key, key, key];
				} else {
					this.options[v] = null;
				}
			}
		});
	}

	/**
	 * Returns the current position of the logical coordinates.
	 * @ko 논리적 좌표의 현재 위치를 반환한다
	 * @return {Array} pos <ko>좌표</ko>
	 * @return {Number} pos.0 The X coordinate <ko>x 좌표</ko>
	 * @return {Number} pos.1 The Y coordinate <ko>y 좌표</ko>
	 */
	get() {
		return this._pos.concat();
	}

	/**
	 * Destroys elements, properties, and events used in a module.
	 * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
	 */
	destroy() {
		this.off();
		this._hammerManager.destroy();
	}
};

Object.assign(MovableCoord, __WEBPACK_IMPORTED_MODULE_4__consts__["a" /* DIRECTION */]);
/* harmony default export */ __webpack_exports__["default"] = (MovableCoord);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coordinate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser__ = __webpack_require__(2);



/* harmony default export */ __webpack_exports__["a"] = (superclass => class extends superclass {
	constructor() {
		super();
		this._raf = null;
		this._animateParam = null;
		this._animationEnd = this._animationEnd.bind(this);	// for caching
		this._restore = this._restore.bind(this);	// for caching
	}

	_grab(min, max, circular) {
		if (this._animateParam) {
			this.trigger("animationEnd");
			const orgPos = this.get();

			const pos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getCircularPos(this.get(), min, max, circular);

			if (pos[0] !== orgPos[0] || pos[1] !== orgPos[1]) {
				this._setPosAndTriggerChange(pos, true);
			}
			this._animateParam = null;
			this._raf && __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* window */].cancelAnimationFrame(this._raf);
			this._raf = null;
		}
	}

	_prepareParam(absPos, duration, hammerEvent) {
		const pos = this.get();
		const min = this.options.min;
		const max = this.options.max;
		const circular = this.options.circular;
		const maximumDuration = this.options.maximumDuration;
		let destPos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getPointOfIntersection(
			pos, absPos, min, max, circular, this.options.bounce);

		destPos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isOutToOut(pos, destPos, min, max) ? pos : destPos;

		const distance = [
			Math.abs(destPos[0] - pos[0]),
			Math.abs(destPos[1] - pos[1]),
		];
		let newDuration = duration == null ? __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getDurationFromPos(
			distance, this.options.deceleration) : duration;

		newDuration = maximumDuration > newDuration ? newDuration : maximumDuration;
		return {
			depaPos: pos.concat(),
			destPos: destPos.concat(),
			isBounce: __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isOutside(destPos, min, max),
			isCircular: __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isCircular(absPos, min, max, circular),
			duration: newDuration,
			distance,
			hammerEvent: hammerEvent || null,
			done: this._animationEnd,
		};
	}

	_restore(complete, hammerEvent) {
		const pos = this.get();
		const min = this.options.min;
		const max = this.options.max;

		this._animate(this._prepareParam([
			Math.min(max[0], Math.max(min[0], pos[0])),
			Math.min(max[1], Math.max(min[1], pos[1])),
		], null, hammerEvent), complete);
	}

	_animationEnd() {
		this._animateParam = null;
		const orgPos = this.get();
		const nextPos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getCircularPos([
			Math.round(orgPos[0]),
			Math.round(orgPos[1]),
		], this.options.min, this.options.max, this.options.circular);

		this.setTo(...nextPos);
		this._setInterrupt(false);
		/**
		 * This event is fired when animation ends.
		 * @ko 에니메이션이 끝났을 때 발생한다.
		 * @name eg.MovableCoord#animationEnd
		 * @event
		 */
		this.trigger("animationEnd");
	}

	_animate(param, complete) {
		this._animateParam = Object.assign({}, param);
		this._animateParam.startTime = new Date().getTime();
		if (param.duration) {
			const info = this._animateParam;
			const self = this;

			(function loop() {
				/* eslint-disable no-underscore-dangle */
				self._raf = null;
				if (self._frame(info) >= 1) {
					// deferred.resolve();
					complete();
					return;
				} // animationEnd
				self._raf = __WEBPACK_IMPORTED_MODULE_1__browser__["a" /* window */].requestAnimationFrame(loop);
				/* eslint-enable no-underscore-dangle */
			})();
		} else {
			this._setPosAndTriggerChange(param.destPos, false);
			complete();
		}
	}

	_animateTo(absPos, duration, hammerEvent) {
		const param = this._prepareParam(absPos, duration, hammerEvent);
		const retTrigger = this.trigger("animationStart", param);

		// You can't stop the 'animationStart' event when 'circular' is true.
		if (param.isCircular && !retTrigger) {
			throw new Error(
				"You can't stop the 'animation' event when 'circular' is true."
			);
		}

		if (retTrigger) {
			const queue = [];
			const dequeue = function() {
				const task = queue.shift();

				task && task.call(this);
			};

			if (param.depaPos[0] !== param.destPos[0] ||
				param.depaPos[1] !== param.destPos[1]) {
				queue.push(() => this._animate(param, dequeue));
			}
			if (__WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isOutside(
				param.destPos, this.options.min, this.options.max)) {
				queue.push(() => this._restore(dequeue, hammerEvent));
			}
			queue.push(() => this._animationEnd());
			dequeue();
		}
	}

	// animation frame (0~1)
	_frame(param) {
		const curTime = new Date() - param.startTime;
		const easingPer = this._easing(curTime / param.duration);
		let pos = [param.depaPos[0], param.depaPos[1]];

		for (let i = 0; i < 2; i++) {
			(pos[i] !== param.destPos[i]) &&
			(pos[i] += (param.destPos[i] - pos[i]) * easingPer);
		}
		pos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getCircularPos(
			pos, this.options.min, this.options.max, this.options.circular);
		this._setPosAndTriggerChange(pos, false);
		return easingPer;
	}

	// trigger 'change' event
	_setPosAndTriggerChange(position, holding, e) {
		/**
		 * This event is fired when coordinate changes.
		 * @ko 좌표가 변경됐을 때 발생하는 이벤트
		 * @name eg.MovableCoord#change
		 * @event
		 *
		 * @param {Object} param The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.position departure coordinate  <ko>좌표</ko>
		 * @param {Number} param.position.0 The X coordinate <ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate <ko>y 좌표</ko>
		 * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
		this._pos = position.concat();
		this.trigger("change", {
			pos: position.concat(),
			holding,
			hammerEvent: e || null,
		});
	}

	_easing(p) {
		return p > 1 ? 1 : this.options.easing(p);
	}

	/**
	 * Moves an element to specific coordinates.
	 * @ko 좌표를 이동한다.
	 * @method eg.MovableCoord#setTo
	 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
	 * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
	 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	 */
	setTo(x, y, duration = 0) {
		let toX = x;
		let toY = y;
		const min = this.options.min;
		const max = this.options.max;
		const circular = this.options.circular;

		this._grab(min, max, circular);
		const pos = this.get();

		if (x === pos[0] && y === pos[1]) {
			return this;
		}

		this._setInterrupt(true);
		if (x !== pos[0]) {
			if (!circular[3]) {
				toX = Math.max(min[0], toX);
			}
			if (!circular[1]) {
				toX = Math.min(max[0], toX);
			}
		}
		if (y !== pos[1]) {
			if (!circular[0]) {
				toY = Math.max(min[1], toY);
			}
			if (!circular[2]) {
				toY = Math.min(max[1], toY);
			}
		}
		if (duration) {
			this._animateTo([toX, toY], duration);
		} else {
			this._pos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getCircularPos([toX, toY], min, max, circular);
			this._setPosAndTriggerChange(this._pos, false);
			this._setInterrupt(false);
		}
		return this;
	}

	/**
	 * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
	 * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
	 * @method eg.MovableCoord#setBy
	 * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
	 * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
	 * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
	 * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
	 */
	setBy(x, y, duration = 0) {
		return this.setTo(
			x != null ? this._pos[0] + x : this._pos[0],
			y != null ? this._pos[1] + y : this._pos[1],
			duration
		);
	}
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Coordinate__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__consts__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = (superclass => class extends superclass {
	constructor() {
		super();
		this._status = {
			grabOutside: false,		// check whether user's action started on outside
			currentHammer: null,		// current hammer instance
			currentOptions: {},		// current bind options
			moveDistance: null,		// a position of the first user's action
			prevented: false,		//  check whether the animation event was prevented
		};
	}

	_setCurrentTarget(hammer, options) {
		this._status.currentOptions = options;
		this._status.currentHanmmer = hammer;
	}

	// panstart event handler
	_start(e) {
		if (!this._status.currentOptions.interruptable && this._status.prevented) {
			return;
		}
		const pos = this.get();
		const min = this.options.min;
		const max = this.options.max;

		this._setInterrupt(true);
		this._grab(min, max, this.options.circular);
		/**
		 * This event is fired when a user holds an element on the screen of the device.
		 * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
		 * @event eg.MovableCoord#hold
		 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
		 * @param {Array} param.pos coordinate <ko>좌표 정보</ko>
		 * @param {Number} param.pos.0 The X coordinate<ko>x 좌표</ko>
		 * @param {Number} param.pos.1 The Y coordinate<ko>y 좌표</ko>
		 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다.</ko>
		 *
		 */
		this.trigger("hold", {
			pos: pos.concat(),
			hammerEvent: e,
		});

		this._status.moveDistance = pos.concat();
		this._status.grabOutside = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isOutside(pos, min, max);
	}

	// panmove event handler
	_move(e) {
		if (!this._isInterrupting() || !this._status.moveDistance) {
			return;
		}
		let pos = this.get(true);
		const min = this.options.min;
		const max = this.options.max;
		const bounce = this.options.bounce;
		const margin = this.options.margin;
		const currentOptions = this._status.currentOptions;
		const direction = currentOptions.direction;
		const scale = currentOptions.scale;
		const userDirection = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getDirectionByAngle(
			e.angle, currentOptions.thresholdAngle);
		const out = [
			margin[0] + bounce[0],
			margin[1] + bounce[1],
			margin[2] + bounce[2],
			margin[3] + bounce[3],
		];
		let prevent = false;

		// not support offset properties in Hammerjs - start
		const prevInput = this._status.currentHanmmer.session.prevInput;

		/* eslint-disable no-param-reassign */
		if (prevInput) {
			e.offsetX = e.deltaX - prevInput.deltaX;
			e.offsetY = e.deltaY - prevInput.deltaY;
		} else {
			e.offsetX = 0;
			e.offsetY = 0;
		}

		// not support offset properties in Hammerjs - end
		if (__WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isHorizontal(direction, userDirection)) {
			this._status.moveDistance[0] += (e.offsetX * scale[0]);
			prevent = true;
		}
		if (__WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isVertical(direction, userDirection)) {
			this._status.moveDistance[1] += (e.offsetY * scale[1]);
			prevent = true;
		}
		if (prevent) {
			e.srcEvent.preventDefault();
			e.srcEvent.stopPropagation();
		}
		e.preventSystemEvent = prevent;
		/* eslint-enable no-param-reassign */

		pos[0] = this._status.moveDistance[0];
		pos[1] = this._status.moveDistance[1];
		pos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getCircularPos(pos, min, max, this.options.circular);

		// from outside to inside
		if (this._status.grabOutside && !__WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].isOutside(pos, min, max)) {
			this._status.grabOutside = false;
		}

		// when move pointer is held in outside
		let tv;
		let tn;
		let tx;

		if (this._status.grabOutside) {
			tn = min[0] - out[3];
			tx = max[0] + out[1];
			tv = pos[0];
			/* eslint-disable no-nested-ternary */
			pos[0] = tv > tx ? tx : (tv < tn ? tn : tv);
			tn = min[1] - out[0];
			tx = max[1] + out[2];
			tv = pos[1];
			pos[1] = tv > tx ? tx : (tv < tn ? tn : tv);
			/* eslint-enable no-nested-ternary */
		} else {
			// when start pointer is held in inside
			// get a initialization slope value to prevent smooth animation.
			const initSlope = this._easing(0.00001) / 0.00001;

			if (pos[1] < min[1]) { // up
				tv = (min[1] - pos[1]) / (out[0] * initSlope);
				pos[1] = min[1] - this._easing(tv) * out[0];
			} else if (pos[1] > max[1]) { // down
				tv = (pos[1] - max[1]) / (out[2] * initSlope);
				pos[1] = max[1] + this._easing(tv) * out[2];
			}
			if (pos[0] < min[0]) { // left
				tv = (min[0] - pos[0]) / (out[3] * initSlope);
				pos[0] = min[0] - this._easing(tv) * out[3];
			} else if (pos[0] > max[0]) { // right
				tv = (pos[0] - max[0]) / (out[1] * initSlope);
				pos[0] = max[0] + this._easing(tv) * out[1];
			}
		}
		this._setPosAndTriggerChange(pos, true, e);
	}

	// panend event handler
	_end(e) {
		const pos = this.get();

		if (!this._isInterrupting() || !this._status.moveDistance) {
			return;
		}

		// Abort the animating post process when "tap" occurs
		if (e.distance === 0 /* e.type === "tap" */) {
			this._setInterrupt(false);
			this.trigger("release", {
				depaPos: pos.concat(),
				destPos: pos.concat(),
				hammerEvent: e || null,
			});
		} else {
			const direction = this._status.currentOptions.direction;
			const scale = this._status.currentOptions.scale;
			let vX = Math.abs(e.velocityX);
			let vY = Math.abs(e.velocityY);

			!(direction & __WEBPACK_IMPORTED_MODULE_1__consts__["a" /* DIRECTION */].DIRECTION_HORIZONTAL) && (vX = 0);
			!(direction & __WEBPACK_IMPORTED_MODULE_1__consts__["a" /* DIRECTION */].DIRECTION_VERTICAL) && (vY = 0);

			const offset = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getNextOffsetPos([
				vX * (e.deltaX < 0 ? -1 : 1) * scale[0],
				vY * (e.deltaY < 0 ? -1 : 1) * scale[1],
			], this.options.deceleration);
			let destPos = [pos[0] + offset[0], pos[1] + offset[1]];

			destPos = __WEBPACK_IMPORTED_MODULE_0__Coordinate__["a" /* default */].getPointOfIntersection(pos, destPos,
				this.options.min, this.options.max,
				this.options.circular, this.options.bounce);
			/**
			 * This event is fired when a user release an element on the screen of the device.
			 * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
			 * @event eg.MovableCoord#release
			 *
			 * @param {Object} param The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
			 * @param {Array} param.depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표현재 </ko>
			 * @param {Number} param.depaPos.0 The X coordinate <ko> x 좌표</ko>
			 * @param {Number} param.depaPos.1 The Y coordinate <ko> y 좌표</ko>
			 * @param {Array} param.destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
			 * @param {Number} param.destPos.0 The X coordinate <ko>x 좌표</ko>
			 * @param {Number} param.destPos.1 The Y coordinate <ko>y 좌표</ko>
			 * @param {Object} param.hammerEvent The event information of Hammer.JS. It returns null if the event is fired through a call to the setTo() or setBy() method.<ko>Hammer.JS의 이벤트 정보. setTo() 메서드나 setBy() 메서드를 호출해 이벤트가 발생했을 때는 'null'을 반환한다</ko>
			 *
			 */
			this.trigger("release", {
				depaPos: pos.concat(),
				destPos,
				hammerEvent: e || null,
			});
			if (pos[0] !== destPos[0] || pos[1] !== destPos[1]) {
				this._animateTo(destPos, null, e || null);
			} else {
				this._setInterrupt(false);
			}
		}
		this._status.moveDistance = null;
	}

	_isInterrupting() {
		// when interruptable is 'true', return value is always 'true'.
		return this._status.currentOptions.interruptable || this._status.prevented;
	}

	_setInterrupt(prevented) {
		!this._status.currentOptions.interruptable &&
		(this._status.prevented = prevented);
	}
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
        return Hammer;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');


/***/ })
/******/ ]);
});
//# sourceMappingURL=flicking.pkgd.js.map