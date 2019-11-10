/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/flicking project is licensed under the MIT <https://naver.github.io/egjs/license.txt> license
 * 
 * @egjs/flicking JavaScript library
 * https://github.com/naver/egjs-flicking
 * 
 * @version 2.1.0
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
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

_Flicking2["default"].VERSION = "2.1.0"; /**
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
 * A module used to implement flicking interactions. With this module, you can make flicking gestures, which are ways to navigate left and right to move between panels arranged side by side.
 * @ko 플리킹 UI를 구현하는 모듈. 나란히 배치한 패널을 쓸어 넘겨 다음 패널이나 이전 패널로 이동하는 플리킹 UI를 만들 수 있다.
 * @alias eg.Flicking
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
var Flicking = function (_Mixin$with) {
	_inherits(Flicking, _Mixin$with);

	/**
 * Constructor
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
    * @see Easing Functions Cheat Sheet {@link http://easings.net/}
    * @see If you want to try a different easing function, use the jQuery easing plugin ({@link http://gsgd.co.uk/sandbox/jquery/easing}) or the jQuery UI easing library ({@link https://jqueryui.com/easing}). <ko>다른 easing 함수를 사용하려면 jQuery easing 플러그인({@link http://gsgd.co.uk/sandbox/jquery/easing})이나, jQuery UI easing 라이브러리({@link https://jqueryui.com/easing})를 사용한다</ko>
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
			this._setAxes("setTo", Math.abs(coords[0]), 0);
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

			// arrange Axes' coord position
			conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
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
  */


	Flicking.prototype._setHint = function _setHint() {
		var style = { willChange: "transform" };

		_utils.utils.css(this.$container, style);
		_utils.utils.css(this._conf.panel.$list, style);
	};

	/**
  * Get data according options.horizontal value
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
		var axesInst = this._axesInst;

		if (bind) {
			this._panInput = new _axes2["default"].PanInput($wrapper, {
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
  * @param {Object} e event object
  */


	Flicking.prototype._triggerBeforeRestore = function _triggerBeforeRestore(e) {
		var conf = this._conf;
		var touch = conf.touch;

		// reverse direction value when restore
		touch.direction = +conf.dirData.join("").replace(touch.direction, "");

		/**
   * This event is fired before an element is restored to its original position when user action is done while the element is not dragged until a certain distance threshold is reached
   * @ko 다음 패널로 바뀌는 기준 이동 거리만큼 이동하기 전에 사용자의 동작이 끝났을 때 원래 패널로 복원되기 전에 발생하는 이벤트
   * @name eg.Flicking#beforeRestore
   * @event
   * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
   * @param {String} param.eventType The name of the event <ko>이름명</ko>
   * @param {Boolean} param.isTrusted true when the event was generated by a user action otherwise false<ko>사용자의 액션으로 인해 이벤트가 생성된 경우, true. 그 외는 false</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다. (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the movement (see eg.Flicking.DIRECTION_* constant) <ko>이동 방향(eg.Flicking.DIRECTION_* constant 참고)</ko>
   * @param {Number} param.depaPos starting coordinate <ko>출발점 좌표</ko>
   * @param {Number} param.destPos destination coordinate <ko>도착점 좌표</ko>
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
   * @param {Boolean} param.isTrusted true when the event was generated by a user action otherwise false<ko>사용자의 액션으로 인해 이벤트가 생성된 경우, true. 그 외는 false</ko>
   * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM(@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
   * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
   * @param {Number} param.direction Direction of the panel move (see eg.Flicking.DIRECTION_* constant) <ko>이동 방향(eg.Flicking.DIRECTION_* constant 참고)</ko>
   */
		customEvent.restore && this._triggerEvent(consts.EVENTS.restore);
		customEvent.restore = customEvent.restoreCall = false;
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
    * @param {Boolean} param.isTrusted true when the event was generated by a user action otherwise false<ko>사용자의 액션으로 인해 이벤트가 생성된 경우, true. 그 외는 false</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM. (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content.<ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.Flicking.DIRECTION_* constant) <ko>−	이동 방향(eg.Flicking.DIRECTION_* constant 참고)</ko>
    * @param {Number} param.depaPos starting coordinate <ko>출발점 좌표</ko>
    * @param {Number} param.destPos destination coordinate <ko>도착점 좌표</ko>
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
    * @param {Boolean} param.isTrusted true when the event was generated by a user action otherwise false<ko>사용자의 액션으로 인해 이벤트가 생성된 경우, true. 그 외는 false</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content. <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다.</ko>
    * @param {Number} param.direction Direction of the movemen (see eg.Flicking.DIRECTION_* constant) <ko>이동 방향(eg.Flicking.DIRECTION_* constant 참고</ko>
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

		if (e && e.holding && e.inputEvent && e.inputEvent.preventSystemEvent && pointer !== "none") {
			val = "none";
		} else if (!e && pointer !== "auto") {
			val = "auto";
		}

		val && _utils.utils.css(this.$container, { pointerEvents: val });
	};

	/**
  * Get coordinate value with unit
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
  * @param {Array} coordsValue coordinate x,y value
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
			direction: conf.touch.direction,
			isTrusted: conf.touch.isTrusted
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
  * @return {HTMLElement[]} Whole panel elements <ko>모든 패널 엘리먼트</ko>
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

		if (options.circular || this["get" + (next ? "Next" : "Prev") + "Index"]() !== null) {
			this._movePanelByPhase("setBy", panel.size * (next ? 1 : -1), duration);
		}

		return this;
	};

	/**
  * Move panel applying start/end phase value
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
  * @param {Number} noValue Logical index number of the target panel element, which is relative to the panel content. <ko>이동할 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
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

		this._movePanelByPhase(circular ? "setBy" : "setTo", panel.size * (circular ? indexToMove : no), duration);

		return this;
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
  * Enables input devices.
  * @ko 입력 장치를 사용할 수 있게 한다
  * @method eg.Flicking#enableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.enableInput = function enableInput() {
		this._panInput.enable();
		return this;
	};

	/**
  * Disables input devices.
  * @ko 입력 장치를 사용할 수 없게 한다.
  * @method eg.Flicking#disableInput
  * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
  */


	Flicking.prototype.disableInput = function disableInput() {
		this._panInput.disable();
		return this;
	};

	/**
  * Get current flicking status
  * @ko 현재의 상태 값을 반환한다.
  * @method eg.Flicking#getStatus
  * @param {Boolean} stringify Set true if want get stringified status value <ko>상태 값을 문자열로 전달받고자 하는지 여부</ko>
  * @return {{panel: {index: (*|number), no: (*|number), currIndex: number, currNo: number}, $list}}
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
  * Set flicking as given status
  * @method eg.Flicking#setStatus
  * @param {Object|String} statusValue status value to be restored <ko>복원할 상태 값</ko>
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
  * Constant value for none direction
  * @ko none 방향에 대한 상수 값
  * @name DIRECTION_NONE
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * @description Constant value for left direction
  * @ko left 방향에 대한 상수 값
  * @name DIRECTION_LEFT
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for right direction
  * @ko right 방향에 대한 상수 값
  * @name DIRECTION_RIGHT
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for up direction
  * @ko up 방향에 대한 상수 값
  * @name DIRECTION_UP
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for down direction
  * @ko down 방향에 대한 상수 값
  * @name DIRECTION_DOWN
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for horizontal direction
  * @ko horizontal 방향에 대한 상수 값
  * @name DIRECTION_HORIZONTAL
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for vertical direction
  * @ko vertical 방향에 대한 상수 값
  * @name DIRECTION_VERTICAL
  * @memberof eg.Flicking
  * @static
  * @type {Number}
  */


	/**
  * Constant value for all direction
  * @ko all 방향에 대한 상수 값
  * @name DIRECTION_ALL
  * @memberof eg.Flicking
  * @static
  * @type {Number}
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
    * This event is fired when panel moves.
    * @ko 패널이 이동할 때 발생하는 이벤트
    * @name eg.Flicking#flick
    * @event
    * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
    * @param {String} param.eventType The name of the event<ko>이름명</ko>
    * @param {Boolean} param.isTrusted true when the event was generated by a user action otherwise false<ko>사용자의 액션으로 인해 이벤트가 생성된 경우, true. 그 외는 false</ko>
    * @param {Number} param.index Physical index number of the current panel element, which is relative to DOM (@deprecated since 1.3.0)<ko>현재 패널 엘리먼트의 물리적 인덱스 번호. DOM 엘리먼트를 기준으로 하는 인덱스 번호다 (@deprecated since 1.3.0)</ko>
    * @param {Number} param.no Logical index number of the current panel element, which is relative to the panel content <ko>현재 패널 엘리먼트의 논리적 인덱스 번호. 패널 콘텐츠를 기준으로 하는 인덱스 번호다</ko>
    * @param {Number} param.direction Direction of the movement (see eg.Axes.DIRECTION_* constant) <ko>이동 방향(eg.Axes.DIRECTION_* constant 참고)</ko>
    * @param {Number} param.pos current coordinate <ko>현재 좌표</ko>
    * @param {Boolean} param.holding Indicates whether a user holds an element on the screen of the device. <ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
    * @param {Number} param.distance Distance moved from then starting point. According the move direction, positive on eg.Axes.DIRECTION_LEFT/UP and negative on eg.Axes.DIRECTION_RIGHT/DOWN <ko>시작점부터 이동된 거리의 값. 이동 방향에 따라 eg.Axes.DIRECTION_LEFT/UP의 경우 양수를 eg.Axes.DIRECTION_RIGHT/DOWN의 경우는 음수를 반환</ko>
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
				distance: pos - holdPos
			}));

			(eventRes || eventRes === null) && this._setTranslate([-pos, 0]);
		};

		/**
   * 'release' event handler
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