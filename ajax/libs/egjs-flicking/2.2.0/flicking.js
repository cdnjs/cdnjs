/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/component"), require("@egjs/axes"));
	else if(typeof define === 'function' && define.amd)
		define("Flicking", ["@egjs/component", "@egjs/axes"], factory);
	else if(typeof exports === 'object')
		exports["Flicking"] = factory(require("@egjs/component"), require("@egjs/axes"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Flicking"] = factory(root["eg"]["Component"], root["eg"]["Axes"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && (self.Math === Math ? self : Function("return this")());
/* eslint-enable no-new-func, no-nested-ternary */

var document = win.document;

exports.window = win;
exports.document = document;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.DATA_HEIGHT = exports.IS_ANDROID2 = exports.SUPPORT_WILLCHANGE = exports.TRANSFORM = exports.EVENTS = undefined;

var _browser = __webpack_require__(0);

// define custom events name
var EVENTS = {
	beforeFlickStart: "beforeFlickStart",
	beforeRestore: "beforeRestore",
	flick: "flick",
	flickEnd: "flickEnd",
	restore: "restore"
};

// check for the transform property
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var TRANSFORM = {
	name: "transform"
};

TRANSFORM.support = function () {
	var style = _browser.document.documentElement.style;

	return TRANSFORM.name in style || (TRANSFORM.name = "webkitTransform") in style;
}();

// check for will-change support
var SUPPORT_WILLCHANGE = _browser.window.CSS && _browser.window.CSS.supports && _browser.window.CSS.supports("will-change", "transform");

// check for Android 2.x
var IS_ANDROID2 = /Android 2\./.test(navigator.userAgent);

// data-height attribute's name for adaptiveHeight option
var DATA_HEIGHT = "data-height";

exports.EVENTS = EVENTS;
exports.TRANSFORM = TRANSFORM;
exports.SUPPORT_WILLCHANGE = SUPPORT_WILLCHANGE;
exports.IS_ANDROID2 = IS_ANDROID2;
exports.DATA_HEIGHT = DATA_HEIGHT;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Flicking = __webpack_require__(3);

var _Flicking2 = _interopRequireDefault(_Flicking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Flicking2["default"].VERSION = "2.2.0"; /**
                                          * Copyright (c) 2015 NAVER Corp.
                                          * egjs projects are licensed under the MIT license
                                          */

module.exports = _Flicking2["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _component = __webpack_require__(4);

var _component2 = _interopRequireDefault(_component);

var _axes = __webpack_require__(5);

var _axes2 = _interopRequireDefault(_axes);

var _utils = __webpack_require__(6);

var _consts = __webpack_require__(1);

var consts = _interopRequireWildcard(_consts);

var _config = __webpack_require__(7);

var _browser = __webpack_require__(0);

var _eventHandler = __webpack_require__(8);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Create an instance of the eg.Flicking class. Create a flicking UI that sweeps a side-by-side panel with mouse move or touch move input and moves to the next or previous panel.
 * @ko eg.Flicking 클래스의 인스턴스를 생성한다. 나란히 배치한 패널을 마우스 이동(move) 혹은 터치 이동(move) 입력을 받아 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 UI를 만든다.
 * @alias eg.Flicking
 * @extends eg.Component
 * @requires {@link https://github.com/naver/egjs-component|eg.Component}
 * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
 * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
 * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
 * @throws {Error} An Error occur when given base element doesn't exist or it hasn't proper DOM structure to be initialized. <ko>주어진 기본 요소가 존재하지 않거나 초기화 할 적절한 DOM 구조가없는 경우 오류가 발생한다.</ko>
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 * A common example.
 * 일반적인 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 * ```
 * ```javascript
 * // Examples to omit and omit optional options.
 * // 생략가능한 옵션은 생략하고 생성하는 예.
 * new eg.Flicking("#flick");
 *
 * // An example of specifying and generating values for all optional parameters.
 * // 모든 옵션의 값을 지정하고 생성하는 예.
 * new eg.Flicking("#flick", {
 * 	hwAccelerable: true,
 * 	prefix: "eg-flick",
 * 	deceleration: 0.0006,
 * 	horizontal: true,
 * 	circular: false,
 * 	previewPadding: [0 0],
 * 	bounce: [10, 10],
 * 	threshold: 40,
 * 	duration: 100,
 * 	panelEffect: x => 1 - Math.pow(1 - x, 3),
 * 	defaultIndex: 0,
 * 	inputType: ["touch", "mouse"],
 * 	thresholdAngle: 45,
 * 	adaptiveHeight: false
 * });
 * ```
 * @example
 * Example of constructor element parameter value specification.
 * 생성자 element 파라미터 값 지정 예.
 * ```javascript
 * // An example of assigning HTMLElement to an element parameter.
 * // element 파라미터에 HTMLElement를 지정하는 예.
 * new eg.Flicking(document.getElementById("flick"));
 *
 * // An example of assigning a jQuery object to an element parameter.
 * // element 파라미터에 jQuery객체를 지정하는 예.
 * new eg.Flicking($("#flick")[0]);
 *
 * // An example of assigning a css selector string to an element parameter.
 * // element 파라미터에 css 선택자 문자열을 지정하는 예.
 * new eg.Flicking("#flick");
 * ```
 * @example
 * Panel element definition location example.
 * 패널 요소 정의 위치 예.
 * ```html
 * <!--An example of defining a panel element as a child of a base element.-->
 * <!--패널 요소를 기준 요소의 자식으로 정의한 예.-->
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * 	<div><p>panel 1</p></div>
 * 	<div><p>panel 2</p></div>
 * </div>
 *
 * <!--An example of defining a panel element as a child of a container element.-->
 * <!--패널 요소를 컨테이너 요소의 자식으로 정의한 예.-->
 * <div id="flick2">
 * 	<div class="eg-flick-container">
 * 		<div><p>panel 0</p></div>
 * 		<div><p>panel 1</p></div>
 * 		<div><p>panel 2</p></div>
 * 	<div>
 * </div>
 * ```
 * @example
 * An example where only one panel is defined and created with a circular.
 * 패널을 하나만 정의하고 순환으로 생성하는 예.
 * ```html
 * <div id="flick">
 * 	<div><p>panel 0</p></div>
 * </div>
 * ```
 * ```javascript
 * // If the number of defined panels is less than the minimum number required for the circulation operation, the necessary number of panel elements are generated.
 * // 정의된 패널의 수가 순환동작에 필요한 최소 개수보다 적으면 필요한 수만큼의 패널 요소가 생성된다.
 * new eg.Flicking("#flick", {
 * 	circular: true
 * })
 * ```
 * @example
 * For error occurrence example. There is no panel element.
 * 오류 발생 예. 패널 요소가 하나도 없는 경우.
 * ```html
 * <div id="flick"></div>
 * ```
 * ```javascript
 * try{
 * 	new eg.Flicking("#flick");
 * } catch(e) {
 * 	// An error occurs because there are no child elements in the reference element.
 *	// 기준 요소안에 자식 요소가 하나도 없으므로 에러가 발생한다.
 * }
 * ```
 */
var Flicking = function (_Mixin$with) {
	_inherits(Flicking, _Mixin$with);

	/**
  * Constructor
  * @param {HTMLElement|String} element A base element for the eg.Flicking module. When specifying a value as a `String` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `String`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
  * @param {Object} [options] The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
  * @param {Boolean} [options.hwAccelerable=true] Force hardware compositing.<ko>하드웨어 가속 사용 여부.</ko>
  * @param {String} [options.prefix="eg-flick"] A prefix for class names of the panel elements.<ko>패널 요소의 클래스 이름 접두사.</ko>
  * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time.<ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
  * @param {Boolean} [options.horizontal=true] Direction of the panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true 가로방향, false 세로방향)</ko>
  * @param {Boolean} [options.circular=false] Whether to let the first panel flick right to the end panel (let the left panel flick from the end panel to move to the first panel). (The term 'circulation')<ko>첫 패널에서 우 액션 입력하여 끝 패널로 이동하게 할지와 끝 패널에서 우 액션 입력하여 첫 패널로 이동할하게 할지 여부. (통칭 '순환')</ko>
  * @param {Number|Array} [options.previewPadding=[0,0]] The preview size value(unit: pixel) for the previous or next panel. If direction is set to "horizontal", the preview section will be displayed on the left and right of the panel. If direction is set to "vertical", it will be displayed on the top and bottom of the panel.<ko>이전 패널과 다음 패널을 미리 보는 영역의 크기값(단위: 픽셀). 패널 이동 방향이 가로 방향이면 패널 좌우에, 세로 방향이면 패널 상하에 미리 보는 영역이 나타난다.</ko>
  * @param {Number|Array} [options.bounce=[10,10]] The size value(unit: pixel) of the bounce area. If `circular=false`, the panel can be moved by this value when inputting a right gesture in the first panel or inputting a left gesture in the end panel. When the input is completed while moving, it returns to its original position.<ko>바운스 영역의 크기값(단위: 픽셀). `circular=false`인 경우, 첫 패널에서 우 액션 입력시, 끝 패널에서 좌 액션 입력시 이 값 만큼만 패널이 이동할 수 있고 이동한 상태에서 입력을 마치면 원래 자리로 돌아온다.</ko>
  * @param {Number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
  * @param {Number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
  * @param {Function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
  * @param {Number} [options.defaultIndex=0] The panel index number to specify when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 패널 인덱스 번호. 0부터 시작하는 정수.</ko>
  * @param {Array} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
  * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
  * @param {Boolean} [options.adaptiveHeight=false] Whether the height of the container element reflects the height value of the panel after completing the movement.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>목적 패널로 이동한 후 그 패널의 높이값을 컨테이너 요소의 높이값에 반영할지 여부.<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
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
  * @private
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
  * @private
  * @param {HTMLCollection} $children wrappers' children elements
  * @param {String} _prefix event prefix
  * @return {HTMLElement}
  */


	Flicking.prototype._setConfig = function _setConfig($children, _prefix) {
		var options = this.options;
		var padding = options.previewPadding;
		var $nodes = $children;

		if (_utils.utils.classList($nodes[0], options.prefix + "-container")) {
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
			return conf.dirData.push(_axes2["default"]["DIRECTION_" + v]);
		});
	};

	/**
  * Build and set panel nodes to make flicking structure
  * @private
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
			_utils.utils.classList(v, prefix + "-panel", true);

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

		// create Axes instance
		this._axesInst = new _axes2["default"]({
			flick: {
				range: [0, panel.size * (panelCount - 1)],
				bounce: bounce
			}
		}, {
			easing: options.panelEffect,
			deceleration: options.deceleration,
			interruptable: false
		});

		this._setDefaultPanel(options.defaultIndex);
	};

	/**
  * Set preview padding value
  * @private
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
		var wrapperSize = Math.max(this.$wrapper["offset" + (horizontal ? "Width" : "Height")], _utils.utils.getNumValue(wrapperStyle[horizontal ? "width" : "height"]));

		panel.size = wrapperSize - (_utils.utils.getNumValue(wrapperStyle["padding" + paddingType[0]]) + _utils.utils.getNumValue(wrapperStyle["padding" + paddingType[1]]));
	};

	/**
  * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
  * @private
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
  * @private
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
  * @private
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
			this._setAxes("setTo", Math.abs(coords[0]), 0);
		}
	};

	/**
  * Arrange panels' position
  * @private
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

			// arrange Axes' coord position
			conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
		}

		this._applyPanelsPos();
	};

	/**
  * Set each panel's position in DOM
  * @private
  */


	Flicking.prototype._applyPanelsPos = function _applyPanelsPos() {
		this._conf.panel.$list.forEach(this._applyPanelsCss.bind(this));
	};

	/**
  * Set CSS style values to move elements
  *
  * Initialize setting up checking if browser support transform css property.
  * If browser doesn't support transform, then use left/top properties instead.
  * @private
  * @param {HTMLElement} $el
  * @param {Array} coordsValue
  */


	Flicking.prototype._setMoveStyle = function _setMoveStyle($el, coordsValue) {
		var transform = consts.TRANSFORM;

		this._setMoveStyle = transform.support ? function ($element, coords) {
			var _utils$css;

			_utils.utils.css($element, (_utils$css = {}, _utils$css[transform.name] = _utils.utils.translate(coords[0], coords[1], this._conf.useLayerHack), _utils$css));
		} : function ($element, coords) {
			_utils.utils.css($element, { left: coords[0], top: coords[1] });
		};

		this._setMoveStyle($el, coordsValue);
	};

	/**
  * Callback function for applying CSS values to each panels
  * Need to be initialized before use, to set up for Android 2.x browsers or others.
  * @private
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
				var coords = this._getDataByDirection([consts.TRANSFORM.support ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

				this._setMoveStyle(v, coords);
			};
		}
	};

	/**
  * Adjust container's css value to handle Android 2.x link highlighting bug
  * @private
  * @param {String} phase
  *    start - set left/top value to 0
  *    end - set translate value to 0
  * @param {Array} toValue coordinate value
  */


	Flicking.prototype._adjustContainerCss = function _adjustContainerCss(phase, toValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var options = this.options;
		var horizontal = options.horizontal;
		var paddingTop = options.previewPadding[0];
		var container = this.$container;
		var to = toValue;
		var value = void 0;

		if (consts.IS_ANDROID2) {
			if (!to) {
				to = -panel.size * panel.index;
			}

			if (phase === "start") {
				container = container.style;
				value = parseInt(container[horizontal ? "left" : "top"], 10);

				if (horizontal) {
					value && (container.left = "0px");
				} else {
					value !== paddingTop && (container.top = "0px");
				}

				this._setTranslate([-to, 0]);
			} else if (phase === "end") {
				var _utils$css2;

				to = this._getCoordsValue([to, 0]);

				_utils.utils.css(container, (_utils$css2 = {
					left: to.x,
					top: to.y
				}, _utils$css2[consts.TRANSFORM.name] = _utils.utils.translate(0, 0, conf.useLayerHack), _utils$css2));

				conf.$dummyAnchor.focus();
			}
		}
	};

	/**
  * Set Axes coord value
  * @private
  * @param {String} method
  * @param {Number} flick destination value
  * @param {Number} duration
  * @return {eg.Axes} Axes instance
  */


	Flicking.prototype._setAxes = function _setAxes(method, flick, duration) {
		return this._axesInst[method]({ flick: flick }, duration);
	};

	/**
  * Set hint for browser to decide efficient way of doing transform changes(or animation)
  * https://dev.opera.com/articles/css-will-change-property/
  * @private
  */


	Flicking.prototype._setHint = function _setHint() {
		var style = { willChange: "transform" };

		_utils.utils.css(this.$container, style);
		_utils.utils.css(this._conf.panel.$list, style);
	};

	/**
  * Get data according options.horizontal value
  * @private
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
  * @private
  * @param {Boolean} direction
  * @param {Number} indexToMove
  */


	Flicking.prototype._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
		var next = direction === this._conf.dirData[0];

		this._movePanelPosition(Math.abs(indexToMove || 1), next);
	};

	/**
  * Get the base position index of the panel
  * @private
  */


	Flicking.prototype._getBasePositionIndex = function _getBasePositionIndex() {
		return Math.floor(this._conf.panel.count / 2 - 0.1);
	};

	/**
  * Bind events
  * @private
  * @param {Boolean} bind
  */


	Flicking.prototype._bindEvents = function _bindEvents(bind) {
		var options = this.options;
		var $wrapper = this.$wrapper;
		var axesInst = this._axesInst;

		if (bind) {
			this._panInput = new _axes.PanInput($wrapper, {
				inputType: options.inputType,
				thresholdAngle: options.thresholdAngle,
				scale: this._getDataByDirection([-1, 0])
			});

			axesInst.on({
				hold: this._holdHandler.bind(this),
				change: this._changeHandler.bind(this),
				release: this._releaseHandler.bind(this),
				animationStart: this._animationStartHandler.bind(this),
				animationEnd: this._animationEndHandler.bind(this)
			}).connect(this._getDataByDirection(["flick", ""]), this._panInput);
		} else {
			this.disableInput();
			axesInst.off();
		}
	};

	/**
  * Set container's height value according to children's height
  * @private
  * @param {Number} direction
  */


	Flicking.prototype._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
		var conf = this._conf;
		var indexToMove = conf.indexToMove;
		var $children = void 0;
		var height = void 0;

		var $panel = indexToMove === 0 ?

		// panel moved by 1
		this["get" + (direction === _axes2["default"].DIRECTION_LEFT && "Next" || direction === _axes2["default"].DIRECTION_RIGHT && "Prev" || "") + "Element"]() :

		// panel moved by .moveTo()
		conf.panel.$list[conf.panel.currIndex + indexToMove];

		var $first = $panel.querySelector(":first-child");

		if ($first) {
			height = $first.getAttribute(consts.DATA_HEIGHT);

			if (!height) {
				$children = $panel.children;

				height = _utils.utils.outerHeight($children.length > 1 ? ($panel.style.height = "auto", $panel) : $first);

				height > 0 && $first.setAttribute(consts.DATA_HEIGHT, height);
			}

			height > 0 && (this.$wrapper.style.height = height + "px");
		}
	};

	/**
  * Trigger beforeRestore event
  * @private
  * @param {Object} e event object
  */


	Flicking.prototype._triggerBeforeRestore = function _triggerBeforeRestore(e) {
		var conf = this._conf;
		var touch = conf.touch;

		// reverse direction value when restore
		touch.direction = +conf.dirData.join("").replace(touch.direction, "");

		/**
   * This event occurs before the current panel starts to return to its original position. Followes [flick]{@link eg.Flicking#event:flick} and [restore]{@link eg.Flicking#event:restore} events. The conditions of occurrence are as follows.<br><br>1. The user has finished input but does not exceed the panel movement threshold.<br>2. Call the [restore()]{@link eg.Flicking#restore} method. (Prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
   * @ko 현재 패널이 원래 위치로 되돌아가기 시작전에 발생하는 이벤트이다. 뒤이어 [flick]{@link eg.Flicking#event:flick}과 [restore]{@link eg.Flicking#event:restore}이벤트가 발생한다. 발생조건은 아래와 같다.<br><br>1. 사용자 입력이 끝났는데 패널 이동 임계점을 넘지 않은 경우.<br>2. [restore()]{@link eg.Flicking#restore} 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작 방지 전제)
   * @name eg.Flicking#beforeRestore
   * @event
   * @property {String} eventType The name of the event <ko>이벤트 명</ko>
   * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
   * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
   * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
   * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
   * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
   * @see eg.Flicking#event:flick
   * @see eg.Flicking#event:restore
   * @see eg.Flicking#restore
   * @example
   * // The order of event occurrence.
   * // 이벤트 발생 순서
   * beforeRestore (once) > flick (many times) > restore (once)
   */
		conf.customEvent.restore = this._triggerEvent(consts.EVENTS.beforeRestore, {
			depaPos: e.depaPos.flick,
			destPos: e.destPos.flick
		});

		if (!conf.customEvent.restore) {
			"stop" in e && e.stop();
			conf.panel.animating = false;
		}
	};

	/**
  * Trigger restore event
  * @private
  */


	Flicking.prototype._triggerRestore = function _triggerRestore() {
		var customEvent = this._conf.customEvent;

		/**
   * The event that occurs after completing the move by [restore()]{@link eg.Flicking#restore} method.
   * @ko [restore()]{@link eg.Flicking#restore} 메서드에 의해 패널이 원래 위치로 이동을 완료한 다음 발생하는 이벤트.
   * @name eg.Flicking#restore
   * @event
   * @property {String} eventType The name of the event <ko>이벤트 명</ko>
   * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
   * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
   * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
   * @see eg.Flicking#event:beforeRestore
   * @see eg.Flicking#event:flick
   * @see eg.Flicking#restore
   * @example
   * // The order of event occurrence.
   * // 이벤트 발생 순서
   * beforeRestore (once) > flick (many times) > restore (once)
   */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restore = customEvent.restoreCall = false;
	};

	/**
  * Set value when panel changes
  * @private
  * @param {String} phase - [start|end]
  * @param {Object} pos
  */


	Flicking.prototype._setPhaseValue = function _setPhaseValue(phase, pos) {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;

		if (phase === "start" && (panel.changed = this._isMovable())) {
			/**
    * An event that occurs before a user action or [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} method initiates a move to the destination panel. If you do not prevent the default behavior, then many [flick]{@link eg.Flicking#event:flick} events and one [flickEnd]{@link eg.Flicking#event:flickEnd} event will occur.
    * @ko 사용자 액션 혹은 [moveTo()]{@link eg.Flicking#moveTo}, [prev()]{@link eg.Flicking#prev}, [next()]{@link eg.Flicking#next} 메서드에 의해 목적 패널로의 이동 시작전 발생하는 이벤트. 기본동작을 막지 않는다면 뒤이어 다수의 [flick]{@link eg.Flicking#event:flick}이벤트와 그 뒤 한 번의 [flickEnd]{@link eg.Flicking#event:flickEnd}이벤트가 발생한다.
    * @name eg.Flicking#beforeFlickStart
    * @event
    * @property {String} eventType The name of the event <ko>이벤트 명</ko>
    * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @property {Number} depaPos Starting coordinate. <ko>출발점 좌표.</ko>
    * @property {Number} destPos Destination coordinate. <ko>도착점 좌표.</ko>
    * @property {Function} stop Cancels the default action. (Default action: Move to destination panel.) The panel element stays at the position of the call to `stop()`. To return to the original position, you must call the [restore()]{@link eg.Flicking#restore} method.<ko>기본동작을 취소한다. (기본동작: 목적 패널로의 이동.) 패널 요소가 `stop()`호출시점의 위치에 머물러 있는다. 원래 자리로 되돌리려면 [restore()]{@link eg.Flicking#restore} 메서드를 호출해야 한다.</ko>
    * @see eg.Flicking#event:flick
    * @see eg.Flicking#event:flickEnd
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
    * // The order of event occurrence.
    * // 이벤트 발생 순서
    * beforeFlickStart (once) > flick (many times) > flickEnd (once)
    * @example
    * // An example to prevent the default behavior.
    * // 기본동작을 막는 예.
    * new eg.Flicking("#flick").on("beforeFlickStart", e => {
    * 	e.stop();
    * });
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
    * The event that occurs after completing the move to the destination panel. It occurs in the following cases.<br><br>- After completing the movement to the destination panel by user's move input.<br>- `moveTo()`, `prev()`, `next()` method call. (It does not occur if you have disabled the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
    * @ko 목적 패널로의 이동을 완료한 다음 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>- 사용자의 이동(move) 액션 입력에 의한 목적 패널로의 이동완료 후.<br>- `moveTo()`, `prev()`, `next()` 메서드 호출.([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막았다면 발생하지 않는다.)
    * @name eg.Flicking#flickEnd
    * @event
    * @property {String} eventType The name of the event.<ko>이벤트 명</ko>
    * @property {Boolean} isTrusted `true` when the event was generated by a user action("mouse" or "touch") otherwise `false`.<ko>사용자 액션("mouse" 또는 "touch")에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`.</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @see eg.Flicking#event:beforeFlickStart
    * @see eg.Flicking#event:flick
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
    * // The order of event occurrence.
    * // 이벤트 발생 순서
    * beforeFlickStart (once) > flick (many times) > flickEnd (once)
    */
			panel.changed && this._triggerEvent(consts.EVENTS.flickEnd);
		}

		this._adjustContainerCss(phase);
		return true;
	};

	/**
  * Get positive or negative according direction
  * @private
  */


	Flicking.prototype._getNumByDirection = function _getNumByDirection() {
		var conf = this._conf;

		return conf.touch.direction === conf.dirData[0] ? 1 : -1;
	};

	/**
  * Revert panel number
  * @private
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
  * @private
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
  * @private
  * @param {Event} e
  */


	Flicking.prototype._setPointerEvents = function _setPointerEvents(e) {
		var pointer = _utils.utils.css(this.$container, "pointerEvents");
		var val = void 0;

		if (e && e.holding && e.inputEvent && e.inputEvent.preventSystemEvent && pointer !== "none") {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && _utils.utils.css(this.$container, { pointerEvents: val });
	};

	/**
  * Get coordinate value with unit
  * @private
  * @param coordsValue {Array} x,y numeric value
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
  * @private
  * @param {Array} coordsValue coordinate x,y value
  */


	Flicking.prototype._setTranslate = function _setTranslate(coordsValue) {
		var coords = this._getCoordsValue(coordsValue);

		this._setMoveStyle(this.$container, [coords.x, coords.y]);
	};

	/**
  * Check if panel passed through threshold pixel
  * @private
  */


	Flicking.prototype._isMovable = function _isMovable() {
		var options = this.options;
		var axesInst = this._axesInst;
		var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
		var max = void 0;
		var currPos = void 0;

		if (!options.circular && isMovable) {
			max = axesInst.axis.flick.range[1];
			currPos = axesInst.get().flick;

			// if current position out of range
			if (currPos < 0 || currPos > max) {
				return false;
			}
		}

		return isMovable;
	};

	/**
  * Trigger custom events
  * @private
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
			no: panel.currNo,
			direction: conf.touch.direction,
			isTrusted: conf.touch.isTrusted
		}, param));
	};

	/**
  * Get next/prev panel element/index.
  * @private
  * @param {Boolean} direction
  * @param {Boolean} element - true:to get element, false:to get index
  * @param {Number} physical - true : physical, false : logical (@deprecated since 2.2.0)
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
  * @private
  * @param {Boolean} next
  */


	Flicking.prototype._setValueToMove = function _setValueToMove(next) {
		var conf = this._conf;

		conf.touch.distance = this.options.threshold + 1;
		conf.touch.direction = conf.dirData[+!next];
	};

	/**
  * Returns the index number of the current panel element.
  * @ko 현재 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers.<br>- true (Physical): Math.floor({Total number of panels} / 2 - 0.1) value. (Increase by 1 for every two panels.) If the circular option is false, it equals physical=false.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): `Math.floor({패널 총 개수} / 2 - 0.1)` 값. (패널이 2개 늘어날 때마다 1씩 증가) `circular`옵션이 `false`이면 `physical=false`와 동일한 값.<br>- false (논리적): 현재 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number} Index number of the current panel element. A zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
  * @see eg.Flicking#getPrevIndex
  * @see eg.Flicking#getNextIndex
  * @example
  * ```html
  * <div id="flick">
  * 	<div><p>panel 0</p></div>
  * 	<div><p>panel 1</p></div>
  * 	<div><p>panel 2</p></div>
  * 	<div><p>panel 3</p></div>
  * </div>
  * ```
  * ```javascript
  * // circular off and left flicking.
  * // 순환을 끄고 좌 플리킹.
  * new eg.Flicking("#flick").on("flickEnd", {currentTarget} => {
  * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3
  * 	console.log(currentTarget.getIndex(true)); // 1 > 2 > 3
  * };
  *
  * // circular on and left flicking.
  * // 순환을 켜고 좌 플리킹.
  * new eg.Flicking("#flick", {circular: true}).on("flickEnd", {currentTarget} => {
  * 	console.log(currentTarget.getIndex()); // 1 > 2 > 3 > 0 > 1 > 2 > 3 > 0 ...
  * 	console.log(currentTarget.getIndex(true)); // 1 > 1 > 1 > 1 > 1 > 1 > 1 > 1 ...
  * };
  * ```
  * @example
  * ```html
  * <!--Define only two panels.-->
  * <!--패널을 두 개만 정의한다.-->
  * <div id="flick2">
  * 	<div><p>panel 0</p></div>
  * 	<div><p>panel 1</p></div>
  * </div>
  * ```
  * ```javascript
  * // (In the case of circulation) If the number of defined panel elements is less than the minimum number required, the number of panels is created.
  * // Therefore, it is described as 'the number of panel definitions of the contents of the panel.'
  * // (순환인 경우) 정의된 패널 요소의 개수가 필요 최소개수보다 적으면 그 수만큼의 패널을 생성한다.
  * // 그렇기 때문에 '패널이 담고 있는 컨텐트의 패널 정의 순성상의 번호'라고 설명한다.
  * const flick = new eg.Flicking("flick2", {
  * 	circular: true
  * });
  *
  * // The content of the current panel is the first in the panel definition order.
  * // 현재 패널이 담고 있는 컨텐트는 패널 정의 순서상 첫 번째이다.
  * flick.getIndex(); // 0
  *
  * // The content of the next panel is the second in the panel definition order.
  * // 다음 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
  * flick.getNextIndex(); // 1
  *
  * // The content of the previous panel is the second in the panel definition order.
  * // 이전 패널이 담고 있는 컨텐트는 패널 정의 순서상 두 번째이다.
  * flick.getPrevIndex(); // 1
  * ```
  */


	Flicking.prototype.getIndex = function getIndex(physical) {
		return this._conf.panel[physical ? "currIndex" : "currNo"];
	};

	/**
  * Returns the reference of the current panel element.
  * @ko 현재 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getElement
  * @return {HTMLElement} Current panel element.<ko>현재 패널 요소.</ko>
  * @see eg.Flicking#getPrevElement
  * @see eg.Flicking#getNextElement
  */


	Flicking.prototype.getElement = function getElement() {
		var panel = this._conf.panel;

		return panel.$list[panel.currIndex];
	};

	/**
  * Returns the reference of the next panel element.
  * @ko 다음 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getNextElement
  * @return {HTMLElement|null} Next panel element or `null` if it does not exist.<ko>다음 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getElement
  * @see eg.Flicking#getPrevElement
  */


	Flicking.prototype.getNextElement = function getNextElement() {
		return this._getElement(this._conf.dirData[0], true);
	};

	/**
  * Returns the index number of the next panel element.
  * @ko 다음 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getNextIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Plus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the next panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류.<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 더한 값.<br>- false (논리적): 다음 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number|null} Index number of the next panel element or null if it does not exist. A zero-based integer.<ko>다음 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getIndex
  * @see eg.Flicking#getPrevIndex
  */


	Flicking.prototype.getNextIndex = function getNextIndex(physical) {
		return this._getElement(this._conf.dirData[0], false, physical);
	};

	/**
  * Returns a reference to all panel elements.
  * @ko 모든 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getAllElements
  * @return {HTMLElement[]} Whole panel elements.<ko>모든 패널 요소.</ko>
  */


	Flicking.prototype.getAllElements = function getAllElements() {
		return this._conf.panel.$list;
	};

	/**
  * Returns the reference of the previous panel element.
  * @ko 이전 패널 요소의 레퍼런스를 반환한다.
  * @method eg.Flicking#getPrevElement
  * @return {HTMLElement|null} Previous panel element or `null` if it does not exist.<ko>이전 패널 요소. 패널이 없으면 `null`을 반환한다.</ko>
  * @see eg.Flicking#getElement
  * @see eg.Flicking#getNextElement
  */


	Flicking.prototype.getPrevElement = function getPrevElement() {
		return this._getElement(this._conf.dirData[1], true);
	};

	/**
  * Returns the index number of the previous panel element.
  * @ko 이전 패널 요소의 인덱스 번호를 반환한다.
  * @method eg.Flicking#getPrevIndex
  * @param {Boolean} [physical=false] @deprecated since 2.2.0<br><br>Types of index numbers<br>- true (Physical): Minus one of [getIndex()]{@link eg.Flicking#getIndex} return value.<br>- false (Logical): The value of how the content(innerHTML) of the current panel element is in the defined order of the panel elements.<ko>@deprecated since 2.2.0<br><br>인덱스 번호의 종류<br>- true (물리적): [getIndex()]{@link eg.Flicking#getIndex} 반환값에 1을 뺀 값.<br>- false (논리적): 이전 패널 요소의 컨텐트(innerHTML)가 '패널 요소들의 정의된 순서'에서 몇 번째인지에 대한 값.</ko>
  * @return {Number|null} Previous element index value or null if no more element exist. A zero-based integer.<ko>이전 패널 요소의 인덱스 번호. 0부터 시작하는 정수. 패널이 없는 경우는 `null`.</ko>
  * @see eg.Flicking#getIndex
  * @see eg.Flicking#getNextIndex
  */


	Flicking.prototype.getPrevIndex = function getPrevIndex(physical) {
		return this._getElement(this._conf.dirData[1], false, physical);
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
  * @private
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

		if (options.circular || this["get" + (next ? "Next" : "Prev") + "Index"]() !== null) {
			this._movePanelByPhase("setBy", panel.size * (next ? 1 : -1), duration);
		}

		return this;
	};

	/**
  * Move panel applying start/end phase value
  * @private
  * @param {String} method Axes' method name
  * @param {Number} to destination value
  * @param {Number} durationValue duration value
  */


	Flicking.prototype._movePanelByPhase = function _movePanelByPhase(method, to, durationValue) {
		var duration = _utils.utils.getNumValue(durationValue, this.options.duration);

		if (this._setPhaseValue("start") !== false) {
			this._setAxes(method, to, duration);
			!duration && this._setPhaseValue("end");
		}
	};

	/**
  * Moves an element to the next panel. If `horizontal=true`is right panel. If `horizontal=false`is lower panel.
  * @ko 다음 패널로 이동한다. `horizontal=true`이면 우측 패널. `horizontal=false`이면 하측 패널.
  * @method eg.Flicking#next
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#moveTo
  * @see eg.Flicking#prev
  */


	Flicking.prototype.next = function next(duration) {
		return this._movePanel(true, duration);
	};

	/**
  * Moves an element to the previous panel. If `horizontal=true`is left panel. If `horizontal=false`is upper panel.
  * @ko 이전 패널로 이동한다. `horizontal=true`이면 좌측 패널. `horizontal=false`이면 상측 패널.
  * @method eg.Flicking#prev
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#moveTo
  * @see eg.Flicking#next
  */


	Flicking.prototype.prev = function prev(duration) {
		return this._movePanel(false, duration);
	};

	/**
  * Moves to the panel in the order specified in `noValue`. If noValue is equal to the current logical index numbering, no action is taken. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} events occur one after the other.
  * @ko `noValue`에 지정한 순서의 패널로 이동한다. `noValue`값이 현재의 논리적 인덱스 번호와 같다면 아무동작 하지 않는다. [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}, [flick]{@link eg.Flicking#event:flick}, [flickEnd]{@link eg.Flicking#event:flickEnd} 이벤트가 차례로 발생한다.
  * @method eg.Flicking#moveTo
  * @param {Number} noValue The logical index number of the panel element to be moved. (Based on the defined order of the panel elements.)<ko>이동할 패널 요소의 논리적 인덱스 번호. ([getIndex()]{@link eg.Flicking#getIndex}메서드 참조.)</ko>
  * @param {Number} [duration=options.duration] Duration of the panel movement (unit: ms) <ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#beforeFlickStart
  * @fires eg.Flicking#flick
  * @fires eg.Flicking#flickEnd
  * @see eg.Flicking#prev
  * @see eg.Flicking#next
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

		this._movePanelByPhase(circular ? "setBy" : "setTo", panel.size * (circular ? indexToMove : no), duration);

		return this;
	};

	/**
  * The horizontal or vertical length of the panel is updated according to the base element. If `horizontal=true` is horizontal. If `horizontal=false` is vertical.
  * @ko 패널의 가로 혹은 세로 길이를 기준요소에 맞춰 갱신한다. `horizontal=true`이면 가로, `horizontal=false`이면 세로.
  * @method eg.Flicking#resize
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @example
  * const flick = new eg.Flicking("#flick", {
  * 	previewPadding: [10, 10]
  * });
  *
  * // When device orientaion changes.
  * // 단말기를 회전했을 때.
  * flick.resize();
  *
  * // Or when changes previewPadding option from its original value.
  * // 또는 previewPadding옵션값을 변경했을 때.
  * flick.options.previewPadding = [20, 30];
  * flick.resize();
  */


	Flicking.prototype.resize = function resize() {
		var conf = this._conf;
		var options = this.options;
		var panel = conf.panel;
		var horizontal = options.horizontal;
		var panelSize = void 0;

		if (!this.isPlaying()) {
			var _utils$css3;

			if (_utils.utils.isArray(options.previewPadding) && typeof +options.previewPadding.join("") === "number") {
				this._setPadding(options.previewPadding.concat());
				panelSize = panel.size;
			} else if (horizontal) {
				panelSize = panel.size = _utils.utils.css(this.$wrapper, "width", true);
			}

			var max = panelSize * (panel.count - 1);
			var maxCoords = this._getDataByDirection([max, 0]);

			// resize elements
			horizontal && _utils.utils.css(this.$container, { width: maxCoords[0] + panelSize + "px" });
			_utils.utils.css(panel.$list, (_utils$css3 = {}, _utils$css3[horizontal ? "width" : "height"] = _utils.utils.getUnitValue(panelSize), _utils$css3));

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

			this._axesInst.axis.flick.range = [0, max];
			this._setAxes("setTo", panelSize * panel.index, 0);

			if (consts.IS_ANDROID2) {
				this._applyPanelsPos();
				this._adjustContainerCss("end");
			}
		}

		return this;
	};

	/**
  * Return the panel to its original position. (It only works when the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event is canceled.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} events are occur in order.
  * @ko 패널의 위치를 원래 자리로 되돌린다. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} 이벤트의 기본동작을 취소한 경우에만 동작함.) [beforeRestore]{@link eg.Flicking#event:beforeRestore}, [flick]{@link eg.Flicking#event:flick}, [restore]{@link eg.Flicking#event:restore} 이벤트가 차례로 발생한다.
  * @method eg.Flicking#restore
  * @param {Number} [durationValue=options.duration] Duration of the panel movement (unit: ms)<ko>패널 이동 애니메이션 진행 시간(단위: ms)</ko>
  * @return {eg.Flicking} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
  * @fires eg.Flicking#event:beforeRestore
  * @fires eg.Flicking#event:flick
  * @fires eg.Flicking#event:restore
  * @example
  * new eg.Flicking("#flick").on("beforeFlickStart", e => {
  * 	if (e.no === 2) {
  * 		// Cancels the default behavior of the 'beforeFlickStart' event.
  * 		// 'beforeFlickStart' 이벤트 기본동작 취소.
  * 		e.stop();
  *
  * 		// Return to original position.
  * 		// 원래 자리로 되돌림.
  * 		this.restore(100);
  * 	}
  * });
  */


	Flicking.prototype.restore = function restore(durationValue) {
		var conf = this._conf;
		var panel = conf.panel;
		var currPos = this._axesInst.get().flick;
		var duration = durationValue;
		var destPos = void 0;

		// check if the panel isn't in right position
		if (currPos !== panel.currIndex * panel.size) {
			conf.customEvent.restoreCall = true;
			duration = _utils.utils.getNumValue(duration, this.options.duration);

			this._revertPanelNo();
			destPos = panel.size * panel.index;

			this._triggerBeforeRestore({ depaPos: currPos, destPos: destPos });
			this._setAxes("setTo", destPos, duration);

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
  * The input from the input device is not blocked so that the panel can be moved by the input device.
  * @ko 막았던 입력 장치로부터의 입력을 푼다.
  * @method eg.Flicking#enableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @see eg.Flicking#disableInput
  */


	Flicking.prototype.enableInput = function enableInput() {
		this._panInput.enable();
		return this;
	};

	/**
  * The input from the input device is blocked so that the panel is not moved by the input device.
  * @ko 패널이 입력 장치에 의해 움직이지 않도록 입력 장치로부터의 입력을 막는다.
  * @method eg.Flicking#disableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  * @see eg.Flicking#enableInput
  */


	Flicking.prototype.disableInput = function disableInput() {
		this._panInput.disable();
		return this;
	};

	/**
  * Get current flicking status. If the returned value is specified as a [setStatus()]{@link eg.Flicking#setStatus} method argument, it can be returned to its value state.
  * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메서드 인자로 지정하면 그 값 상태로 되돌릴 수 있다.
  * @method eg.Flicking#getStatus
  * @param {Boolean} [stringify] Set true if want get stringified status value.<ko>true 지정시 json문자열 형태로 반환한다.</ko>
  * @return {Status|String} An object with current state value information.<ko>현재 상태값 정보를 가진 객체.</ko>
  * @see eg.Flicking#setStatus
  * @example
  * const flick = new eg.Flicking("flick");
  * const status = flick.getStatus();
  * const jsonStaus = flick.getStatus(true);
  *
  * console.log(status); // {panel: {...}, $list: Array(7)}
  * console.log(jsonStatus); // "{\"panel\":{\"index\":3,\"no\":6,\"currIndex\":3,\"currNo\":6},\"$list\":[{\"style\":\"background-color: rgb(155, 49, 137); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 3&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(51, 172, 91); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 4&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(116, 38, 241); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 5&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(141, 139, 24); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 6&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(204, 102, 204); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 0&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(54, 53, 156); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 1&lt;/p&gt;\n\t\t\t\t\t\t\"},{\"style\":\"background-color: rgb(196, 218, 72); position: absolute;  height: 100%;\",\"className\":\"eg-flick-panel\",\"html\":\"\n\t\t\t\t\t\t\t\t&lt;p&gt;panel 2&lt;/p&gt;\n\t\t\t\t\t\t\"}]}"
  */
	/**
  * The return value specification of the getStatus () method.
  * @ko getStatus() 메서드의 반환값 명세.
  * @typedef {Object} Status
  * @property {Object} panel current panel position<ko>현재 패널 위치</ko>
  * @property {Number} panel.index Physical index number.<ko>물리적 인덱스 번호.</ko>
  * @property {Number} panel.currIndex Current physical index number.<ko>현재 물리적 인덱스 번호.</ko>
  * @property {Number} panel.no Logical index number.<ko>논리적 인덱스 번호.</ko>
  * @property {Number} panel.currNo Current logical index number.<ko>현재 논리적 인덱스 번호.</ko>
  * @property {Array.<{style: String, className: String, html: String}>} $list panel's html<ko>패널 정보</ko>
  * @property {Object} $list.obj For convenience, the element is denoted by obj.<ko>편의상 원소를 obj로 표기함</ko>
  * @property {String} $list.obj.style The value of the style attribute of the panel element. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style has been deleted.)<ko>패널 요소의 style 속성 값. ('transform', 'left', 'top', 'will-change', 'box-sizing', 'width' style은 삭제됨)</ko>
  * @property {String} $list.obj.className The class name of the panel element.<ko>패널 요소의 class 이름.</ko>
  * @property {String} $list.obj.html The innerHTML value of the panel element.<ko>패널 요소의 innerHTML 값.</ko>
  * @see eg.Flicking#getIndex
  */


	Flicking.prototype.getStatus = function getStatus(stringify) {
		var panel = this._conf.panel;
		var rxStyle = /((?:-webkit-)?transform|left|top|will-change|box-sizing|width):[^;]*;/g;
		var status = {
			// current panel position
			panel: {
				index: panel.index,
				no: panel.no,
				currIndex: panel.currIndex,
				currNo: panel.currNo
			},

			// panel's html
			$list: panel.$list.map(function (v) {
				return {
					style: v.style.cssText.replace(rxStyle, "").trim(),
					className: v.className,
					html: v.innerHTML
				};
			})
		};

		return stringify ? JSON.stringify(status) : status;
	};

	/**
  * Restore to the state of the `statusValue`.
  * @ko `statusValue`의 상태로 복원한다.
  * @method eg.Flicking#setStatus
  * @param {Status|String} statusValue Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드 반환값을 지정하면 된다.</ko>
  * @see eg.Flicking#getStatus
  * @example
  * const flick = new eg.Flicking("flick");
  * const status = flick.getStatus();
  *
  * // Move to arbitrary panel.
  * // 임의 패널로 이동
  * flick.moveTo(2);
  *
  * // Restore to status.
  * // status 상태로 복원
  * flick.setStatus(status);
  */


	Flicking.prototype.setStatus = function setStatus(statusValue) {
		var panel = this._conf.panel;
		var isAdaptiveHeight = this.options.adaptiveHeight;
		var status = typeof statusValue === "string" ? JSON.parse(statusValue) : statusValue;

		if (status) {
			for (var x in status.panel) {
				x in panel && (panel[x] = status.panel[x]);
			}

			panel.$list.forEach(function (v, i) {
				var data = status.$list[i];
				var style = data.style;
				var className = data.className;
				var html = data.html;

				style && (v.style.cssText += style);
				className && (v.className = className);
				html && (v.innerHTML = html);
			});

			isAdaptiveHeight && this._setAdaptiveHeight();
		}
	};

	/**
  * Returns the reference element and its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
  * @ko 기준 요소와 그 하위 요소를 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
  * @method eg.Flicking#destroy
  * @example
  * const flick = new eg.Flicking("flick");
  * flick.destroy();
  * console.log(flick.moveTo); // null
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
			} else {
				var className = list[i].className;
				var style = list[i].style;

				$el[className ? "setAttribute" : "removeAttribute"]("class", className);
				$el[style ? "setAttribute" : "removeAttribute"]("style", style);
			}
		}

		// unbind events
		this._bindEvents(false);
		this.off();

		// destroy eg.Axes instance
		this._axesInst.destroy();
		this._panInput.destroy();

		// release resources
		for (var x in this) {
			this[x] = null;
		}
	};

	/**
  * Constant value for none direction.
  * @ko none 방향에 대한 상수 값.
  * @name DIRECTION_NONE
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 1
  */


	/**
  * Constant value for left direction.
  * @ko left 방향에 대한 상수 값.
  * @name DIRECTION_LEFT
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 2
  */


	/**
  * Constant value for right direction.
  * @ko right 방향에 대한 상수 값.
  * @name DIRECTION_RIGHT
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 4
  */


	/**
  * Constant value for up direction.
  * @ko up 방향에 대한 상수 값.
  * @name DIRECTION_UP
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 8
  */


	/**
  * Constant value for down direction.
  * @ko down 방향에 대한 상수 값.
  * @name DIRECTION_DOWN
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 16
  */


	/**
  * Constant value for horizontal direction.
  * @ko horizontal 방향에 대한 상수 값.
  * @name DIRECTION_HORIZONTAL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 6
  */


	/**
  * Constant value for vertical direction.
  * @ko vertical 방향에 대한 상수 값.
  * @name DIRECTION_VERTICAL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 24
  */


	/**
  * Constant value for all direction.
  * @ko all 방향에 대한 상수 값.
  * @name DIRECTION_ALL
  * @memberof eg.Flicking
  * @static
  * @constant
  * @type {Number}
  * @default 30
  */


	return Flicking;
}((0, _utils.Mixin)(_component2["default"])["with"](_eventHandler2["default"]));

Flicking.DIRECTION_NONE = _axes2["default"].DIRECTION_NONE;
Flicking.DIRECTION_LEFT = _axes2["default"].DIRECTION_LEFT;
Flicking.DIRECTION_RIGHT = _axes2["default"].DIRECTION_RIGHT;
Flicking.DIRECTION_UP = _axes2["default"].DIRECTION_UP;
Flicking.DIRECTION_DOWN = _axes2["default"].DIRECTION_DOWN;
Flicking.DIRECTION_HORIZONTAL = _axes2["default"].DIRECTION_HORIZONTAL;
Flicking.DIRECTION_VERTICAL = _axes2["default"].DIRECTION_VERTICAL;
Flicking.DIRECTION_ALL = _axes2["default"].DIRECTION_ALL;
exports["default"] = Flicking;
module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.Mixin = exports.utils = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                               */


var _browser = __webpack_require__(0);

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
  * @param {Boolean} getAsNumber Get the value as number
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
  * classList
  * @param {HTMLElement} el target DOM element
  * @param {String} className class name string to be handled
  * @param {Boolean} add Add or remove class - true: Add, false: Remove
  * @return {Boolean} if add param is missing, then return existence of class name
  */
	classList: function classList(el, className, add) {
		var isAddParam = typeof add === "boolean";
		var res = void 0;

		if (el.classList) {
			res = el.classList[isAddParam && (add ? "add" : "remove") || "contains"](className);
		} else {
			res = el.className;

			if (isAddParam) {
				if (add && res.indexOf(className) === -1) {
					res = el.className = (res + " " + className).replace(/\s{2,}/g, " ");
				} else if (!add) {
					res = el.className = res.replace(className, "");
				}
			} else {
				res = new RegExp("\\b" + className + "\\b").test(res);
			}
		}

		return res;
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
		var _this2 = this;

		var style = _browser.window.getComputedStyle(el);
		var paddingMargin = 0;

		(type === "outerWidth" ? ["Left", "Right"] : ["Top", "Bottom"]).forEach(function (dir) {
			["padding", "margin"].forEach(function (v) {
				paddingMargin += _this2.getNumValue(style["" + v + dir]);
			});
		});

		return this.getNumValue(style[type.replace("outer", "").toLocaleLowerCase()]) + paddingMargin;
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

	MixinBuilder.prototype["with"] = function _with() {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
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
		holdPos: 0, // hold x,y coordinate
		destPos: 0, // destination x,y coordinate
		distance: 0, // touch distance pixel of start to end touch
		direction: null, // touch direction
		lastPos: 0, // to determine move on holding
		holding: false,
		isTrusted: false // if event was instantiated by user's action explicitly
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
	hwAccelerable: true, // set for hw acceleration (see https://gist.github.com/netil/c1d1b67e1c1926364c0709f110a09b44 for old devices support)
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


exports.__esModule = true;

var _consts = __webpack_require__(1);

var consts = _interopRequireWildcard(_consts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 NAVER Corp.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


exports["default"] = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, _superclass.apply(this, arguments));
		}

		/**
   * 'hold' event handler
   * @private
   */
		_class.prototype._holdHandler = function _holdHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var holdPos = e.pos.flick;

			touch.holdPos = holdPos;
			touch.holding = true;
			touch.isTrusted = true;
			conf.panel.changed = false;

			this._adjustContainerCss("start", holdPos);
		};

		/**
   * 'change' event handler
   * @private
   */


		_class.prototype._changeHandler = function _changeHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var pos = e.pos.flick;
			var holdPos = touch.holdPos;
			var direction = void 0;
			var eventRes = null;
			var movedPx = void 0;

			this._setPointerEvents(e); // for "click" bug

			/**
    * An event that occurs whenever the panel's coordinate value changes. It occurs in the following cases.<br><br>1. When the user is inputing the move.<br>2. When moving to the destination panel after you have finished inputing the move in step 1.<br>3. When the current panel is moving to its original position after the movement is finished in step 1.<br>4. Moving to the destination panel by calling the `moveTo()`, `prev()`, `next()`  method. (Do not prevent the default behavior of the [beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart} event.)
    * @ko 패널의 좌표값이 변할 때마다 발생하는 이벤트. 아래의 경우에 발생한다.<br><br>1. 사용자가 이동(move) 액션 입력중일 때.<br>2. 1번에서 이동(move) 액션 입력이 끝나고 목적 패널로 이동중일 때.<br>3. 1번에서 이동(move) 액션 입력이 끝나고 현재 패널의 원래 위치로 이동중일 때.<br>4. `moveTo()`, `prev()`, `next()`, 메서드를 호출하여 목적 패널로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작을 막지 않아야 한다.)<br>5. `restore()` 메서드를 호출하여 현재 패널이 원래 위치로 이동중일 때. ([beforeFlickStart]{@link eg.Flicking#event:beforeFlickStart}이벤트의 기본동작 방지 전제.)
    * @name eg.Flicking#flick
    * @event
    * @property {String} eventType The name of the event<ko>이벤트 명</ko>
    * @property {Boolean} isTrusted true when the event was generated by a user action(`"mouse"` or `"touch"`) otherwise false<ko>사용자 액션(`"mouse"` 또는 `"touch"`)에 의해 이벤트가 생성된 경우 `true`. 그 외는 `false`</ko>
    * @property {Number} no Index number of the current panel element. See the [getIndex()]{@link eg.Flicking#getIndex} method.<ko>현재 패널 요소의 인덱스 번호. [getIndex()]{@link eg.Flicking#getIndex}메서드 참조.</ko>
    * @property {Number} direction of the panel movement. If `horizontal=true` is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_RIGHT}. If `horizontal=false` is {@link eg.Flicking.DIRECTION_UP} or {@link eg.Flicking.DIRECTION_DOWN}.<ko>패널 이동 방향. `horizontal=true` 이면 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_RIGHT}. `horizontal=false` 이면 {@link eg.Flicking.DIRECTION_UP} 혹은 {@link eg.Flicking.DIRECTION_DOWN}.</ko>
    * @property {Number} pos current coordinate <ko>현재 좌표.</ko>
    * @property {Boolean} holding Whether the user is inputing through the input device. (Whether it is 'mousedown' for a mouse device or 'touchmove' for a touch device.)<ko>사용자가 입력 장치를 통해 입력중인지 여부. (마우스 장치라면 'mousedown' 여부, 터치 장치라면 'touchmove' 여부)</ko>
    * @property {Number} distance Distance value from the touch starting point. If the `direction` property value is {@link eg.Flicking.DIRECTION_LEFT} or {@link eg.Flicking.DIRECTION_UP}, it returns a positive number. {@link eg.Flicking.DIRECTION_RIGHT} or {@link eg.Flicking.DIRECTION_DOWN} returns a negative value.<ko>터치 시작점으로부터 이동한 거리 값. `direction`속성값이 {@link eg.Flicking.DIRECTION_LEFT} 혹은 {@link eg.Flicking.DIRECTION_UP}이면 양수를, {@link eg.Flicking.DIRECTION_RIGHT} 혹은 {@link eg.Flicking.DIRECTION_DOWN}이면 음수를 반환한다.</ko>
    * @see eg.Flicking#event:beforeRestore
    * @see eg.Flicking#restore
    * @see eg.Flicking#event:beforeFlickStart
    * @see eg.Flicking#event:flickEnd
    * @see eg.Flicking#moveTo
    * @see eg.Flicking#prev
    * @see eg.Flicking#next
    * @example
   	 * The order of event occurrence.
   	 * 이벤트 발생 순서
   	 * ```javascript
   	 * // When moving to the destination panel.
   	 * // 목적 패널로 이동할 때.
   	 * beforeFlickStart (once) > flick (many times) > flickEnd (once)
   	 *
   	 * // When the restore operation.
   	 * // 복원 동작일 때.
   	 * beforeRestore (once) > flick (many times) > restore (once)
   	 * ```
    */
			if (e.inputEvent) {
				direction = e.inputEvent.direction;

				// Adjust direction in case of diagonal touch move
				movedPx = e.inputEvent[this.options.horizontal ? "deltaX" : "deltaY"];

				if (!~conf.dirData.indexOf(direction)) {
					direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
				}

				touch.lastPos = movedPx;
			} else {
				touch.lastPos = null;
			}

			conf.customEvent.flick && (eventRes = this._triggerEvent(consts.EVENTS.flick, {
				pos: pos,
				holding: e.holding,
				direction: direction || touch.direction,
				distance: touch.isTrusted ? pos - holdPos : null
			}));

			(eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
		};

		/**
   * 'release' event handler
   * @private
   */


		_class.prototype._releaseHandler = function _releaseHandler(e) {
			var conf = this._conf;
			var touch = conf.touch;
			var holdPos = touch.holdPos;
			var panelSize = conf.panel.size;
			var customEvent = conf.customEvent;
			var isPlusMove = touch.holdPos < e.depaPos.flick;

			touch.distance = e.depaPos.flick - holdPos;
			touch.direction = conf.dirData[+!isPlusMove];
			touch.destPos = holdPos + (isPlusMove ? panelSize : -panelSize);

			var distance = touch.distance;
			var duration = this.options.duration;
			var moveTo = holdPos;

			if (this._isMovable()) {
				!customEvent.restoreCall && (customEvent.restore = false);
				moveTo = touch.destPos;
			} else if (Math.abs(distance) > 0) {
				this._triggerBeforeRestore(e);
			} else {
				duration = 0;
			}

			// trigger animation
			e.setTo({ flick: moveTo }, duration);

			distance === 0 && this._adjustContainerCss("end");
			touch.holding = false;

			this._setPointerEvents(); // for "click" bug
		};

		/**
   * 'animationStart' event handler
   * @private
   */


		_class.prototype._animationStartHandler = function _animationStartHandler(e) {
			var conf = this._conf;
			var panel = conf.panel;
			var customEvent = conf.customEvent;
			var isFromInput = e.inputEvent || conf.touch.lastPos;

			// when animation was started by input action
			if (!customEvent.restoreCall && isFromInput && this._setPhaseValue("start", {
				depaPos: e.depaPos.flick,
				destPos: e.destPos.flick
			}) === false) {
				e.stop();
			}

			if (isFromInput) {
				e.duration = this.options.duration;

				e.destPos.flick = panel.size * (panel.index + conf.indexToMove);
			}

			panel.animating = true;
		};

		/**
   * 'animationEnd' event handler
   * @private
   */


		_class.prototype._animationEndHandler = function _animationEndHandler() {
			var conf = this._conf;

			conf.panel.animating = false;

			this._setPhaseValue("end");
			this._triggerRestore();

			// reset isTrusted
			conf.touch.isTrusted = false;
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=flicking.js.map