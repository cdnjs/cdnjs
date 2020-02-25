webpackHotUpdate(0,{

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"commonjs":"@egjs/component","commonjs2":"@egjs/component","amd":"@egjs/component","root":["eg","Component"]}
var component_root_eg_Component_ = __webpack_require__(17);
var component_root_eg_Component_default = /*#__PURE__*/__webpack_require__.n(component_root_eg_Component_);

// EXTERNAL MODULE: external {"commonjs":"@egjs/axes","commonjs2":"@egjs/axes","amd":"@egjs/axes","root":["eg","Axes"]}
var axes_root_eg_Axes_ = __webpack_require__(18);
var axes_root_eg_Axes_default = /*#__PURE__*/__webpack_require__.n(axes_root_eg_Axes_);

// CONCATENATED MODULE: ./src/browser.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    document: {},
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}
/* eslint-enable no-new-func, no-nested-ternary */


var browser_document = win.document;

// CONCATENATED MODULE: ./src/utils.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

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
      var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

      if (match) {
        el = browser_document.createElement(match[1]); // attributes

        match.length === 3 && match[2].split(" ").forEach(function (v) {
          var attr = v.split("=");
          el.setAttribute(attr[0], attr[1].trim().replace(/(^["']|["']$)/g, ""));
        });
      } else {
        el = browser_document.querySelectorAll(param);

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
   * Converts to array
   * @param {HTMLCollection|HTMLElement} el
   * @returns {Array}
   */
  toArray: function toArray(el) {
    return [].slice.call(el);
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
    return obj && !obj.nodeType && typeof obj === "object" && !this.isArray(obj);
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

    for (var _len = arguments.length, objectN = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
   * @param {HTMLElement|Array} el
   * @param {String|Object} style
   *  String: return style property value
   *  Object: set style value
   * @param {Boolean} getAsNumber Get the value as number
   * @returns {String|HTMLElement}
   */
  css: function css(el, style, getAsNumber) {
    if (typeof style === "string") {
      var value = el.style[style];

      if (!value || value === "auto" || /\d/.test(value) && !/\d(px)?$/.test(value)) {
        value = win.getComputedStyle(el)[style];
      }

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
    var res;

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
    return isNaN(num = parseFloat(num)) ? defVal : num;
  },

  /**
   * Return unit formatted value
   * @param {Number|String} val
   * @return {String} val Value formatted with unit
   */
  getUnitValue: function getUnitValue(val) {
    var rx = /(?:[a-z]{2,}|%)$/;
    return (parseFloat(val) || 0) + (String(val).match(rx) || "px");
  },

  /**
   * Get element's outer value
   * @param {HTMLElement} el
   * @param {String} type - [outerWidth|outerHeight]
   * @returns {Number} outer's value
   */
  getOuter: function getOuter(el, type) {
    var _this2 = this;

    var paddingMargin = 0;
    (type === "outerWidth" ? ["Left", "Right"] : ["Top", "Bottom"]).forEach(function (dir) {
      ["padding", "margin"].forEach(function (v) {
        paddingMargin += _this2.css(el, "" + v + dir, true);
      });
    });
    return this.css(el, type.replace("outer", "").toLocaleLowerCase(), true) + paddingMargin;
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
    var ua = win.navigator.userAgent;
    var result = /iPhone|iPad/.test(ua);

    this.hasClickBug = function () {
      return result;
    };

    return result;
  }
};

var MixinBuilder =
/*#__PURE__*/
function () {
  function MixinBuilder(superclass) {
    this.superclass = superclass ||
    /*#__PURE__*/
    function () {
      function _class() {}

      return _class;
    }();
  }

  var _proto = MixinBuilder.prototype;

  _proto["with"] = function _with() {
    for (var _len2 = arguments.length, mixins = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
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


// CONCATENATED MODULE: ./src/consts.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
 // define custom events name

var EVENTS = {
  beforeFlickStart: "beforeFlickStart",
  beforeRestore: "beforeRestore",
  flick: "flick",
  flickEnd: "flickEnd",
  restore: "restore"
}; // check for the transform property

var TRANSFORM = {
  name: "transform"
};

TRANSFORM.support = function () {
  if (!browser_document.documentElement) {
    return false;
  }

  var style = browser_document.documentElement.style;
  return TRANSFORM.name in style || (TRANSFORM.name = "webkitTransform") in style;
}(); // check for will-change support


var SUPPORT_WILLCHANGE = win.CSS && win.CSS.supports && win.CSS.supports("will-change", "transform"); // check for Android 2.x

var IS_ANDROID2 = /Android 2\./.test(win.navigator.userAgent); // data-height attribute's name for adaptiveHeight option

var DATA_HEIGHT = "data-height";

// CONCATENATED MODULE: ./src/config.js
/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
// internal config values
var CONFIG = {
  panel: {
    $list: null,
    // panel list
    index: 0,
    // dom index used among process
    no: 0,
    // panel no used among process
    currIndex: 0,
    // current physical dom index
    currNo: 0,
    // current logical panel number
    size: 0,
    // panel size
    count: 0,
    // total physical panel count
    origCount: 0,
    // total count of given original panels
    changed: false,
    // if panel changed
    animating: false,
    // current animating status boolean
    minCount: 3 // minimum panel count

  },
  touch: {
    holdPos: 0,
    // hold x,y coordinate
    destPos: 0,
    // destination x,y coordinate
    distance: 0,
    // touch distance pixel of start to end touch
    direction: null,
    // touch direction
    lastPos: 0,
    // to determine move on holding
    holding: false,
    isTrusted: false // if event was instantiated by user's action explicitly

  },
  customEvent: {
    // for custom events value
    flick: true,
    restore: false,
    restoreCall: false
  },
  dirData: [],
  // direction constant value according horizontal or vertical
  indexToMove: 0,
  $dummyAnchor: null // For buggy link highlighting on Android 2.x

}; // default options

var OPTIONS = {
  hwAccelerable: true,
  // set for hw acceleration (see https://gist.github.com/netil/c1d1b67e1c1926364c0709f110a09b44 for old devices support)
  prefix: "eg-flick",
  // prefix value of class name
  deceleration: 0.0006,
  // deceleration value
  horizontal: true,
  // move direction (true == horizontal, false == vertical)
  circular: false,
  // circular mode. In this mode at least 3 panels are required.
  previewPadding: null,
  // preview padding value in left(up) to right(down) order. In this mode at least 5 panels are required.
  bounce: null,
  // bounce value in left(up) to right(down) order. Works only in non-circular mode.
  threshold: 40,
  // the distance pixel threshold value for change panel
  duration: 100,
  // duration ms for animation
  panelEffect: function panelEffect(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  // easing function for panel change animation
  defaultIndex: 0,
  // initial panel index to be shown
  inputType: [// input type
  "touch", "mouse"],
  thresholdAngle: 45,
  // the threshold value that determines whether user action is horizontal or vertical (0~90)
  adaptiveHeight: false,
  // Set container's height be adaptive according panel's height
  zIndex: 2000,
  // z-index value for container element
  useTranslate: true // use of translate on panel moves

};

// CONCATENATED MODULE: ./src/eventHandler.js
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* harmony default export */ var eventHandler = (function (superclass) {
  return (
    /*#__PURE__*/
    function (_superclass) {
      _inheritsLoose(_class, _superclass);

      function _class() {
        return _superclass.apply(this, arguments) || this;
      }

      var _proto = _class.prototype;

      /**
       * 'hold' event handler
       * @private
       */
      _proto._holdHandler = function _holdHandler(e) {
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


      _proto._changeHandler = function _changeHandler(e) {
        var conf = this._conf;
        var touch = conf.touch;
        var pos = e.pos.flick;
        var holdPos = touch.holdPos;
        var direction;
        var eventRes = null;
        var movedPx;

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
          direction = e.inputEvent.direction; // Adjust direction in case of diagonal touch move

          movedPx = e.inputEvent[this.options.horizontal ? "deltaX" : "deltaY"];

          if (!~conf.dirData.indexOf(direction)) {
            direction = conf.dirData[+(Math.abs(touch.lastPos) <= movedPx)];
          }

          touch.lastPos = movedPx;
        } else {
          touch.lastPos = null;
        }

        conf.customEvent.flick && (eventRes = this._triggerEvent(EVENTS.flick, {
          pos: pos,
          holding: e.holding,
          direction: direction || touch.direction,
          distance: touch.isTrusted ? pos - holdPos : null
        }));

        if (eventRes || eventRes === null) {
          this._setTranslate([-pos, 0]);
        } else {
          e.stop(); // release, animationEnd

          touch.distance = 0;
          touch.direction = null;
          touch.destPos = 0;
          touch.holding = false;
          touch.isTrusted = false;

          this._adjustContainerCss("end");

          this._setPointerEvents();

          this._setPhaseValue("end");
        }
      };
      /**
       * 'release' event handler
       * @private
       */


      _proto._releaseHandler = function _releaseHandler(e) {
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
        } // trigger animation


        e.setTo({
          flick: moveTo
        }, duration);
        distance === 0 && this._adjustContainerCss("end");
        touch.holding = false;

        this._setPointerEvents(); // for "click" bug

      };
      /**
       * 'animationStart' event handler
       * @private
       */


      _proto._animationStartHandler = function _animationStartHandler(e) {
        var conf = this._conf;
        var panel = conf.panel;
        var customEvent = conf.customEvent;
        var isFromInput = e.inputEvent || conf.touch.lastPos; // when animation was started by input action

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


      _proto._animationEndHandler = function _animationEndHandler() {
        var conf = this._conf;
        conf.panel.animating = false;

        this._setPhaseValue("end");

        this._triggerRestore(); // reset isTrusted


        conf.touch.isTrusted = false;
      };

      return _class;
    }(superclass)
  );
});
// CONCATENATED MODULE: ./src/Flicking.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Flicking_Flicking; });
function Flicking_inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
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
 * 	previewPadding: [10, "15%"], // also as "10px", 15 or "15%" can be applied.
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

var Flicking_Flicking =
/*#__PURE__*/
function () {
  var Flicking =
  /*#__PURE__*/
  function (_Mixin$with) {
    Flicking_inheritsLoose(Flicking, _Mixin$with);

    /**
     * Constructor
     * @param {HTMLElement|String} element A base element for the eg.Flicking module. When specifying a value as a `String` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `String`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
     * @param {Object} [options] The option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
     * @param {Boolean} [options.hwAccelerable=true] Force hardware compositing.<ko>하드웨어 가속 사용 여부.</ko>
     * @param {String} [options.prefix="eg-flick"] A prefix for class names of the panel elements.<ko>패널 요소의 클래스 이름 접두사.</ko>
     * @param {Number} [options.deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time.<ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
     * @param {Boolean} [options.horizontal=true] Direction of the panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true 가로방향, false 세로방향)</ko>
     * @param {Boolean} [options.circular=false] Whether to let the first panel flick right to the end panel (let the left panel flick from the end panel to move to the first panel). (The term 'circulation')<ko>첫 패널에서 우 액션 입력하여 끝 패널로 이동하게 할지와 끝 패널에서 우 액션 입력하여 첫 패널로 이동할하게 할지 여부. (통칭 '순환')</ko>
     * @param {Number|String|Array} [options.previewPadding=[0,0]] The preview size value(if no unit is given, defaults to `px`) for the previous or next panel.<br>- If the direction is set to "horizontal", the preview section will be displayed on the left and right of the panel.<br>- If the direction is set to "vertical", it will be displayed on the top and bottom of the panel.<ko>이전 패널과 다음 패널을 미리 보는 영역의 크기 값(단위가 지정되지 않는 경우, `px`로 지정).<br>패널 이동 방향이 가로 방향이면 패널 좌우에, 세로 방향이면 패널 상하에 미리 보는 영역이 나타난다.</ko>
     * @param {Number|Array} [options.bounce=[10,10]] The size value(unit: pixel) of the bounce area. If `circular=false`, the panel can be moved by this value when inputting a right gesture in the first panel or inputting a left gesture in the end panel. When the input is completed while moving, it returns to its original position.<ko>바운스 영역의 크기값(단위: 픽셀). `circular=false`인 경우, 첫 패널에서 우 액션 입력시, 끝 패널에서 좌 액션 입력시 이 값 만큼만 패널이 이동할 수 있고 이동한 상태에서 입력을 마치면 원래 자리로 돌아온다.</ko>
     * @param {Number} [options.threshold=40] Movement threshold to destination panel(unit: pixel). A panel element must be dragged beyond the threshold to move to the destination panel.<ko>목적 패널로의 이동 임계값 (단위: 픽셀). 패널 요소를 임계값 이상으로 끌어다 놓아야만이 목적 패널로 이동한다.</ko>
     * @param {Number} [options.duration=100] Duration of the panel movement. (unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
     * @param {Function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] The easing function to apply to a panel moving animation. The default function is easeOutCubic.<ko>패널 이동 애니메이션에 적용할 `easing`함수. 기본값은 `easeOutCubic`이다.</ko>
     * @param {Number} [options.defaultIndex=0] The panel index number to specify when initializing the module. A zero-based integer.<ko>모듈 초기화시 지정할 패널 인덱스 번호. 0부터 시작하는 정수.</ko>
     * @param {Array} [options.inputType=["touch,"mouse"]] Types of input devices. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput Reference})<br>- "touch": A touch input device.<br>- "mouse": A mouse.<ko>입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.PanInput.html|eg.Axes.PanInput 참고})<br>- "touch": 터치 입력 장치.<br>- "mouse": 마우스.</ko>
     * @param {Number} [options.thresholdAngle=45] The threshold value that determines whether user input is horizontal or vertical. (0 ~ 90)<ko>사용자의 입력이 가로 방향인지 세로 방향인지 판단하는 기준 각도 (0 ~ 90)</ko>
     * @param {Boolean} [options.adaptiveHeight=false] Whether the height of the container element reflects the height value of the panel after completing the movement.<br>(Note: on Android 4.1.x stock browser, has rendering bug which not correctly render height value on panel with single node. To avoid just append another empty node at the end.)<ko>목적 패널로 이동한 후 그 패널의 높이값을 컨테이너 요소의 높이값에 반영할지 여부.<br>(참고: Android 4.1.x 스톡 브라우저에서 단일 노드로 구성된 패널의 높이값 변경이 제대로 렌더링 되지 않는 버그가 있음. 비어있는 노드를 추가하면 해결이 가능하다.)</ko>
     * @param {Number} [options.zIndex=2000] z-index value for container element<ko>컨테이너 요소의 z-index 값</ko>
     * @param {Boolean} [options.useTranslate=true] Use css translate method on panel moves. When set to 'false', it'll use top/left instead.<ko>패널 이동시 CSS translate 사용 여부. 'false'로 설정 시, top/left 속성을 사용</ko>
    */
    function Flicking(element, options, _prefix) {
      var _this;

      _this = _Mixin$with.call(this) || this;
      _this.$wrapper = utils.$(element);
      _this.plugins = [];
      var $children = _this.$wrapper && _this.$wrapper.children;

      if (!_this.$wrapper || !$children || !$children.length) {
        // eslint-disable validateLineBreaks, maximumLineLength
        throw new Error("Given base element doesn't exist or it hasn't proper DOM structure to be initialized."); // eslint-enable validateLineBreaks, maximumLineLength
      }

      _this._setOptions(options);

      _this._setConfig($children, _prefix);

      !utils.hasClickBug() && (_this._setPointerEvents = function () {});

      _this._build();

      _this._bindEvents(true);

      _this._applyPanelsCss();

      _this._arrangePanels();

      _this.options.hwAccelerable && SUPPORT_WILLCHANGE && _this._setHint();
      _this.options.adaptiveHeight && _this._setAdaptiveHeight();

      _this._adjustContainerCss("end");

      return _this;
    }
    /**
     * Set options values
     * @private
     * @param {Object} options
     */


    var _proto = Flicking.prototype;

    _proto._setOptions = function _setOptions(options) {
      // default value of previewPadding and bounce
      var arrVal = {
        previewPadding: [0, 0],
        bounce: [10, 10]
      };
      this.options = utils.extend(utils.extend({}, OPTIONS), arrVal, options);

      for (var key in arrVal) {
        var val = this.options[key];

        if (/(number|string)/.test(typeof val)) {
          val = [val, val];
        } else if (!utils.isArray(val)) {
          val = arrVal[key];
        }

        this.options[key] = val;
      } // block use of translate for Android2 environment


      if (IS_ANDROID2) {
        this.options.useTranslate = false;
      }
    };
    /**
     * Set config values
     * @private
     * @param {HTMLCollection} $children wrappers' children elements
     * @param {String} _prefix event prefix
     * @return {HTMLElement}
     */


    _proto._setConfig = function _setConfig($children, _prefix) {
      var options = this.options;
      var padding = options.previewPadding;
      var $nodes = $children;

      if (utils.classList($nodes[0], options.prefix + "-container")) {
        $nodes = $nodes[0];
        this.$container = $nodes;
        $nodes = $nodes.children;
      } // convert to array


      $nodes = utils.toArray($nodes); // config value

      var conf = this._conf = utils.extend(utils.extend({}, CONFIG), {
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
        useLayerHack: options.hwAccelerable && !SUPPORT_WILLCHANGE,
        eventPrefix: _prefix || ""
      });
      [["LEFT", "RIGHT"], ["UP", "DOWN"]][+!options.horizontal].forEach(function (v) {
        return conf.dirData.push(axes_root_eg_Axes_default.a["DIRECTION_" + v]);
      });
    };
    /**
     * Build and set panel nodes to make flicking structure
     * @private
     */


    _proto._build = function _build() {
      var panel = this._conf.panel;
      var options = this.options;
      var $children = panel.$list;
      var padding = options.previewPadding.concat();
      var prefix = options.prefix;
      var horizontal = options.horizontal;
      var panelCount = panel.count = panel.origCount = $children.length;
      var bounce = options.bounce;

      this._setPadding(padding, true); // container element style


      var cssValue = {
        position: "relative",
        zIndex: options.zIndex || 2000,
        width: "100%",
        height: "100%"
      };
      horizontal && (cssValue.top = "0px");

      if (this.$container) {
        utils.css(this.$container, cssValue);
      } else {
        var $parent = $children[0].parentNode;
        var $container = browser_document.createElement("div");
        $container.className = prefix + "-container";
        utils.css($container, cssValue);
        $children.forEach(function (v) {
          return $container.appendChild(v);
        });
        $parent.appendChild($container);
        this.$container = $container;
      } // panels' css values


      this._initOriginalPanelStyle($children);

      if (this._addClonePanels()) {
        panelCount = panel.count = (panel.$list = utils.toArray(this.$container.children)).length;
      } // create Axes instance


      this._axesInst = new axes_root_eg_Axes_default.a({
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

    _proto._initOriginalPanelStyle = function _initOriginalPanelStyle(panels) {
      var _this2 = this;

      var panel = this._conf.panel;

      var sizeValue = this._getDataByDirection([panel.size, "100%"]);

      panels.forEach(function (v) {
        utils.classList(v, _this2.options.prefix + "-panel", true);
        utils.css(v, {
          position: "absolute",
          width: utils.getUnitValue(sizeValue[0]),
          height: utils.getUnitValue(sizeValue[1]),
          boxSizing: "border-box",
          top: 0,
          left: 0
        });
      });
    };
    /**
     * Set preview padding value
     * @private
     * @param {Array} padding
     * @param {Boolean} build
     */


    _proto._setPadding = function _setPadding(padding, build) {
      var $wrapper = this.$wrapper;
      var horizontal = this.options.horizontal;
      var panel = this._conf.panel;
      var paddingSum = padding.reduce(function (a, c) {
        return parseFloat(a) + parseFloat(c);
      });
      var cssValue = {};

      if (paddingSum || !build) {
        horizontal && padding.reverse();
        cssValue.padding = "" + (horizontal ? "0 " : "") + // add 'px' unit if not present
        padding.map(function (v) {
          return isNaN(v) ? v : v + "px";
        }).join(" 0 ");
      }

      if (build) {
        cssValue.overflow = "hidden";
        cssValue.boxSizing = "border-box";
      }

      Object.keys(cssValue).length && utils.css($wrapper, cssValue);
      var paddingType = horizontal ? ["Left", "Right"] : ["Top", "Bottom"];
      var wrapperSize = Math.max($wrapper["offset" + (horizontal ? "Width" : "Height")], utils.css($wrapper, horizontal ? "width" : "height", true));
      panel.size = wrapperSize - (utils.css($wrapper, "padding" + paddingType[0], true) + utils.css($wrapper, "padding" + paddingType[1], true));
    };

    _proto._clonePanel = function _clonePanel(v) {
      var clone = v.cloneNode(true);
      utils.classList(clone, this.options.prefix + "-clone");
      return clone;
    };
    /**
     * To fulfill minimum panel count cloning original node when circular or previewPadding option are set
     * @private
     * @return {Boolean} true : added clone node, false : not added
     */


    _proto._addClonePanels = function _addClonePanels() {
      var _this3 = this;

      var panel = this._conf.panel;
      var panelCount = panel.origCount;
      var cloneCount = panel.minCount - panelCount;
      var list = panel.$list;
      var cloneNodes; // if panels are given less than required when circular option is set, then clone node to apply circular mode

      if (this.options.circular && panelCount < panel.minCount) {
        cloneNodes = list.map(function (v) {
          return _this3._clonePanel(v);
        });

        while (cloneNodes.length < cloneCount) {
          cloneNodes = cloneNodes.concat(list.map(function (v) {
            return _this3._clonePanel(v);
          }));
        }

        cloneNodes.forEach(function (v) {
          return _this3.$container.appendChild(v);
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


    _proto._movePanelPosition = function _movePanelPosition(count, append) {
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


    _proto._setDefaultPanel = function _setDefaultPanel(index) {
      var panel = this._conf.panel;
      var lastIndex = panel.count - 1;
      var coords;
      var baseIndex;

      if (this.options.circular) {
        // if default index is given, then move correspond panel to the first position
        if (index > 0 && index <= lastIndex) {
          this._movePanelPosition(index, true);
        } // set first panel's position according physical node length


        baseIndex = this._getBasePositionIndex();

        this._movePanelPosition(baseIndex, false);

        this._setPanelNo({
          no: index,
          currNo: index
        }); // if defaultIndex option is given, then move to that index panel

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


    _proto._arrangePanels = function _arrangePanels(sort, indexToMove) {
      var conf = this._conf;
      var panel = conf.panel;
      var touch = conf.touch;
      var dirData = conf.dirData;
      var baseIndex;

      if (this.options.circular) {
        // when arranging panels, set flag to not trigger flick custom event
        conf.customEvent.flick = false; // move elements according direction

        if (sort) {
          indexToMove && (touch.direction = dirData[+!(indexToMove > 0)]);

          this._arrangePanelPosition(touch.direction, indexToMove);
        } // set index for base element's position


        baseIndex = this._getBasePositionIndex();

        this._setPanelNo({
          index: baseIndex,
          currIndex: baseIndex
        }); // arrange Axes' coord position


        conf.customEvent.flick = !!this._setAxes("setTo", panel.size * panel.index, 0);
      }

      this._applyPanelsPos();
    };
    /**
     * Set each panel's position in DOM
     * @private
     */


    _proto._applyPanelsPos = function _applyPanelsPos() {
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


    _proto._setMoveStyle = function _setMoveStyle($el, coordsValue) {
      var transform = TRANSFORM;
      var useLayerHack = this._conf.useLayerHack;
      this._setMoveStyle = transform.support ? function ($element, coords) {
        var _utils$css;

        utils.css($element, (_utils$css = {}, _utils$css[transform.name] = utils.translate(coords[0], coords[1], useLayerHack), _utils$css));
      } : function ($element, coords) {
        utils.css($element, {
          left: coords[0],
          top: coords[1]
        });
      };

      this._setMoveStyle($el, coordsValue);
    };
    /**
     * Callback function for applying CSS values to each panels
     * Need to be initialized before use, to set up for Android 2.x browsers or others.
     * @private
     */


    _proto._applyPanelsCss = function _applyPanelsCss() {
      var conf = this._conf;
      var dummyAnchorClassName = "__dummy_anchor";
      var useTranslate = this.options.useTranslate;

      if (!useTranslate) {
        if (IS_ANDROID2) {
          conf.$dummyAnchor = utils.$("." + dummyAnchorClassName);
          !conf.$dummyAnchor && this.$wrapper.appendChild(conf.$dummyAnchor = utils.$("<a href=\"javascript:void(0)\" class=\"" + dummyAnchorClassName + "\" style=\"position:absolute;height:0px;width:0px\">"));
        }

        this._applyPanelsCss = function (v, i) {
          var coords = this._getDataByDirection([this._conf.panel.size * i + "px", 0]);

          utils.css(v, {
            left: coords[0],
            top: coords[1]
          });
        };
      } else {
        this._applyPanelsCss = function (v, i) {
          var coords = this._getDataByDirection([TRANSFORM.support ? 100 * i + "%" : this._conf.panel.size * i + "px", 0]);

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


    _proto._adjustContainerCss = function _adjustContainerCss(phase, toValue) {
      var conf = this._conf;
      var panel = conf.panel;
      var options = this.options;
      var useTranslate = options.useTranslate;
      var horizontal = options.horizontal;
      var paddingTop = options.previewPadding[0];
      var container = this.$container;
      var to = toValue;
      var value;

      if (!useTranslate) {
        if (!to) {
          to = -panel.size * panel.index;
        }

        if (phase === "start") {
          container = container.style;
          value = parseFloat(container[horizontal ? "left" : "top"]);

          if (horizontal) {
            value && (container.left = "0px");
          } else {
            value !== paddingTop && (container.top = "0px");
          }

          this._setTranslate([-to, 0]);
        } else if (phase === "end") {
          var _utils$css2;

          to = this._getCoordsValue([to, 0]);
          utils.css(container, (_utils$css2 = {
            left: to.x,
            top: to.y
          }, _utils$css2[TRANSFORM.name] = utils.translate(0, 0, conf.useLayerHack), _utils$css2));
          conf.$dummyAnchor && conf.$dummyAnchor.focus();
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


    _proto._setAxes = function _setAxes(method, flick, duration) {
      return this._axesInst[method]({
        flick: flick
      }, duration);
    };
    /**
     * Set hint for browser to decide efficient way of doing transform changes(or animation)
     * https://dev.opera.com/articles/css-will-change-property/
     * @private
     */


    _proto._setHint = function _setHint() {
      var style = {
        willChange: "transform"
      };
      utils.css(this.$container, style);
      utils.css(this._conf.panel.$list, style);
    };
    /**
     * Get data according options.horizontal value
     * @private
     * @param {Array} value primary data to handle
     * @return {Array}
     */


    _proto._getDataByDirection = function _getDataByDirection(value) {
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


    _proto._arrangePanelPosition = function _arrangePanelPosition(direction, indexToMove) {
      var next = direction === this._conf.dirData[0];

      this._movePanelPosition(Math.abs(indexToMove || 1), next);
    };
    /**
     * Get the base position index of the panel
     * @private
     */


    _proto._getBasePositionIndex = function _getBasePositionIndex() {
      return Math.floor(this._conf.panel.count / 2 - 0.1);
    };
    /**
     * Bind events
     * @private
     * @param {Boolean} bind
     */


    _proto._bindEvents = function _bindEvents(bind) {
      var options = this.options;
      var $wrapper = this.$wrapper;
      var axesInst = this._axesInst;

      if (bind) {
        this._panInput = new axes_root_eg_Axes_["PanInput"]($wrapper, {
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


    _proto._setAdaptiveHeight = function _setAdaptiveHeight(direction) {
      var conf = this._conf;
      var indexToMove = conf.indexToMove;
      var $children;
      var height;
      var $panel = indexToMove === 0 ? // panel moved by 1
      this["get" + (direction === axes_root_eg_Axes_default.a.DIRECTION_LEFT && "Next" || direction === axes_root_eg_Axes_default.a.DIRECTION_RIGHT && "Prev" || "") + "Element"]() : // panel moved by .moveTo()
      conf.panel.$list[conf.panel.currIndex + indexToMove];
      var $first = $panel.querySelector(":first-child");

      if ($first) {
        height = $first.getAttribute(DATA_HEIGHT);

        if (!height) {
          $children = $panel.children;
          height = utils.outerHeight($children.length > 1 ? ($panel.style.height = "auto", $panel) : $first);
          height > 0 && $first.setAttribute(DATA_HEIGHT, height);
        }

        height > 0 && (this.$wrapper.style.height = height + "px");
      }
    };
    /**
     * Trigger beforeRestore event
     * @private
     * @param {Object} e event object
     */


    _proto._triggerBeforeRestore = function _triggerBeforeRestore(e) {
      var conf = this._conf;
      var touch = conf.touch; // reverse direction value when restore

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

      conf.customEvent.restore = this._triggerEvent(EVENTS.beforeRestore, {
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


    _proto._triggerRestore = function _triggerRestore() {
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

      customEvent.restore && this._triggerEvent(EVENTS.restore);
      customEvent.restore = customEvent.restoreCall = false;
    };
    /**
     * Set value when panel changes
     * @private
     * @param {String} phase - [start|end]
     * @param {Object} pos
     */


    _proto._setPhaseValue = function _setPhaseValue(phase, pos) {
      var conf = this._conf;
      var options = this.options;
      var panel = conf.panel;
      var useTranslate = options.useTranslate;

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
        if (!this._triggerEvent(EVENTS.beforeFlickStart, pos)) {
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

        useTranslate && this._setTranslate([-panel.size * panel.index, 0]);
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

        panel.changed && this._triggerEvent(EVENTS.flickEnd);
      }

      this._adjustContainerCss(phase);

      return true;
    };
    /**
     * Get positive or negative according direction
     * @private
     */


    _proto._getNumByDirection = function _getNumByDirection() {
      var conf = this._conf;
      return conf.touch.direction === conf.dirData[0] ? 1 : -1;
    };
    /**
     * Revert panel number
     * @private
     */


    _proto._revertPanelNo = function _revertPanelNo() {
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


    _proto._setPanelNo = function _setPanelNo(obj) {
      var panel = this._conf.panel;
      var count = panel.origCount - 1;

      var num = this._getNumByDirection();

      if (utils.isObject(obj)) {
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


    _proto._setPointerEvents = function _setPointerEvents(e) {
      var $container = this.$container;
      var pointer = utils.css($container, "pointerEvents");
      var pointerEvents;

      if (e && e.holding && e.inputEvent && e.inputEvent.preventSystemEvent && pointer !== "none") {
        pointerEvents = "none";
      } else if (!e && pointer !== "auto") {
        pointerEvents = "auto";
      }

      pointerEvents && utils.css($container, {
        pointerEvents: pointerEvents
      });
    };
    /**
     * Get coordinate value with unit
     * @private
     * @param coordsValue {Array} x,y numeric value
     * @return {Object} x,y coordinate value with unit
     */


    _proto._getCoordsValue = function _getCoordsValue(coordsValue) {
      // the param comes as [ val, 0 ], whatever the direction. So reorder the value depend the direction.
      var coords = this._getDataByDirection(coordsValue);

      return {
        x: utils.getUnitValue(coords[0]),
        y: utils.getUnitValue(coords[1])
      };
    };
    /**
     * Set translate property value
     * @private
     * @param {Array} coordsValue coordinate x,y value
     */


    _proto._setTranslate = function _setTranslate(coordsValue) {
      var coords = this._getCoordsValue(coordsValue);

      this._setMoveStyle(this.$container, [coords.x, coords.y]);
    };
    /**
     * Check if panel passed through threshold pixel
     * @private
     */


    _proto._isMovable = function _isMovable() {
      var options = this.options;
      var axesInst = this._axesInst;
      var isMovable = Math.abs(this._conf.touch.distance) >= options.threshold;
      var max;
      var currPos;

      if (!options.circular && isMovable) {
        max = axesInst.axis.flick.range[1];
        currPos = axesInst.get().flick; // if current position out of range

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


    _proto._triggerEvent = function _triggerEvent(name, param) {
      var conf = this._conf;
      var panel = conf.panel; // pass changed panel no only on 'flickEnd' event

      if (name === EVENTS.flickEnd) {
        panel.currNo = panel.no;
        panel.currIndex = panel.index;
      }

      return this.trigger(conf.eventPrefix + name, utils.extend({
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


    _proto._getElement = function _getElement(direction, element, physical) {
      var panel = this._conf.panel;
      var circular = this.options.circular;
      var pos = panel.currIndex;
      var next = direction === this._conf.dirData[0];
      var result = null;
      var total;
      var index;

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


    _proto._setValueToMove = function _setValueToMove(next) {
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


    _proto.getIndex = function getIndex(physical) {
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


    _proto.getElement = function getElement() {
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


    _proto.getNextElement = function getNextElement() {
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


    _proto.getNextIndex = function getNextIndex(physical) {
      return this._getElement(this._conf.dirData[0], false, physical);
    };
    /**
     * Returns a reference to all panel elements.
     * @ko 모든 패널 요소의 레퍼런스를 반환한다.
     * @method eg.Flicking#getAllElements
     * @return {HTMLElement[]} Whole panel elements.<ko>모든 패널 요소.</ko>
     */


    _proto.getAllElements = function getAllElements() {
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


    _proto.getPrevElement = function getPrevElement() {
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


    _proto.getPrevIndex = function getPrevIndex(physical) {
      return this._getElement(this._conf.dirData[1], false, physical);
    };
    /**
     * Checks whether the animated panel is playing.
     * @ko 패널 이동 애니메이션이 진행 중인지 확인한다.
     * @method eg.Flicking#isPlaying
     * @return {Boolean} Indicates whether the animated panel is playing <ko>패널 이동 애니메이션 진행 중 여부</ko>
     */


    _proto.isPlaying = function isPlaying() {
      return this._conf.panel.animating;
    };
    /**
     * Move panel applying start/end phase value
     * @private
     * @param {String} method Axes' method name
     * @param {Number} to destination value
     * @param {Number} durationValue duration value
     */


    _proto._movePanelByPhase = function _movePanelByPhase(method, to, durationValue) {
      var duration = utils.getNumValue(durationValue, this.options.duration);

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


    _proto.next = function next(duration) {
      var index = this.getNextIndex();

      if (typeof index !== "number") {
        return this;
      }

      return this._moveTo(index, duration, axes_root_eg_Axes_default.a.DIRECTION_RIGHT);
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


    _proto.prev = function prev(duration) {
      var index = this.getPrevIndex();

      if (typeof index !== "number") {
        return this;
      }

      return this._moveTo(index, duration, axes_root_eg_Axes_default.a.DIRECTION_LEFT);
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


    _proto.moveTo = function moveTo(noValue, duration) {
      return this._moveTo(noValue, duration);
    };

    _proto._moveTo = function _moveTo(noValue, duration, direction) {
      var conf = this._conf;
      var panel = conf.panel;
      var circular = this.options.circular;
      var currentIndex = panel.index;
      var indexToMove;
      var isPositive;
      var no = noValue;
      no = utils.getNumValue(no, -1);

      if (no < 0 || no >= panel.origCount || no === panel.no || panel.animating || conf.touch.holding) {
        return this;
      }

      indexToMove = no - (circular ? panel.no : currentIndex);

      if (direction === axes_root_eg_Axes_default.a.DIRECTION_RIGHT && indexToMove < 0) {
        indexToMove += panel.origCount;
      } else if (direction === axes_root_eg_Axes_default.a.DIRECTION_LEFT && indexToMove > 0) {
        indexToMove -= panel.origCount;
      }

      isPositive = indexToMove > 0; // check for real panel count which can be moved on each sides in circular mode

      if (circular && Math.abs(indexToMove) > (isPositive ? panel.count - (currentIndex + 1) : currentIndex)) {
        indexToMove += (isPositive ? -1 : 1) * panel.count;
        isPositive = indexToMove > 0;
      }

      this._setPanelNo(circular ? {
        no: no
      } : {
        no: no,
        index: no
      });

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


    _proto.resize = function resize() {
      var conf = this._conf;
      var options = this.options;
      var panel = conf.panel;
      var horizontal = options.horizontal;
      var useTranslate = options.useTranslate;
      var panelSize;

      if (!this.isPlaying()) {
        var _utils$css3;

        if (utils.isArray(options.previewPadding) && typeof +options.previewPadding.join("") === "number") {
          this._setPadding(options.previewPadding.concat());

          panelSize = panel.size;
        } else if (horizontal) {
          panelSize = panel.size = utils.css(this.$wrapper, "width", true);
        } // resize panel elements


        utils.css(panel.$list, (_utils$css3 = {}, _utils$css3[horizontal ? "width" : "height"] = utils.getUnitValue(panelSize), _utils$css3)); // remove data-height attribute and re-evaluate panel's height

        if (options.adaptiveHeight) {
          var $panel = this.$container.querySelectorAll("[" + DATA_HEIGHT + "]");

          if ($panel.length) {
            utils.toArray($panel).forEach(function (v) {
              return v.removeAttribute(DATA_HEIGHT);
            });

            this._setAdaptiveHeight();
          }
        }

        this._axesInst.axis.flick.range = [0, panelSize * (panel.count - 1)];

        this._setAxes("setTo", panelSize * panel.index, 0);

        if (!useTranslate) {
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


    _proto.restore = function restore(durationValue) {
      var conf = this._conf;
      var panel = conf.panel;

      var currPos = this._axesInst.get().flick;

      var duration = durationValue;
      var destPos; // check if the panel isn't in right position

      if (currPos !== panel.currIndex * panel.size) {
        conf.customEvent.restoreCall = true;
        duration = utils.getNumValue(duration, this.options.duration);

        this._revertPanelNo();

        destPos = panel.size * panel.index;

        this._triggerBeforeRestore({
          depaPos: currPos,
          destPos: destPos
        });

        this._setAxes("setTo", destPos, duration);

        if (!duration) {
          this._adjustContainerCss("end");

          this._triggerRestore();
        } // to handle on api call

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


    _proto.enableInput = function enableInput() {
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


    _proto.disableInput = function disableInput() {
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
     * const flick = new eg.Flicking("#flick");
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


    _proto.getStatus = function getStatus(stringify) {
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
     * const flick = new eg.Flicking("#flick");
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


    _proto.setStatus = function setStatus(statusValue) {
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
     * Returns the reference element and its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).<br>If plugin isn't empty, also reset all plugins registered.
     * @ko 기준 요소와 그 하위 요소를 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.<br>플러그인이 비어있지 않다면, 플러그인도 모두 리셋한다.
     * @method eg.Flicking#destroy
     * @example
     * const flick = new eg.Flicking("#flick");
     * flick.destroy();
     * console.log(flick.moveTo); // null
     */


    _proto.destroy = function destroy() {
      var _this4 = this;

      var conf = this._conf;
      var origPanelStyle = conf.origPanelStyle;
      var wrapper = origPanelStyle.wrapper;
      var container = origPanelStyle.container;
      var list = origPanelStyle.list; // unbind events

      this._bindEvents(false);

      this.off(); // destroy eg.Axes instance

      this._axesInst.destroy();

      this._panInput.destroy(); // unwrap container element and restore original inline style
      // restore wrapper style


      var $wrapper = this.$wrapper;
      $wrapper.setAttribute("class", wrapper.className);
      $wrapper[wrapper.style ? "setAttribute" : "removeAttribute"]("style", wrapper.style); // restore container style

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
      } // release plugin resources


      this.plugins.forEach(function (v) {
        _this4.plugins[v].$componentWillUnmount();
      }); // release resources

      for (var x in this) {
        this[x] = null;
      }
    };
    /**
     * Register plugin to be used.
     * @ko 사용될 플러그인을 등록한다.
     * @method eg.Flicking#plugin
     * @example
     * new eg.Flicking("#flick").plugin([
     *     new eg.Flicking.plugin.OpacityEffect("span"),
     *     ...
     * ]);
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    _proto.plugin = function plugin(list) {
      var _this5 = this;

      list.forEach(function (p) {
        /**
         * A list of plugins used.
         * @ko 사용된 플러그인 목록
         * @property {Array} plugins An array of plugin instances <ko>플러그인 인스턴스 배열</ko>
         * @name plugins
         * @type {Array}
         * @instance
         * @example
         * const flick = new eg.Flicking( ... ).plugin([ ... ]);
         *
         * flick.plugins; // [ ... ] - array of plugins
         * @memberof eg.Flicking
         */
        if (_this5.plugins.filter(function (v) {
          return v.constructor === p.constructor;
        }).length === 0) {
          _this5.plugins.push(p.$componentWillMount(_this5));
        }
      });
      return this;
    };
    /**
     * Rebuild/Initialize panels by current DOM of panels.
     * @ko 현재 패널 DOM 을 기준으로 패널을 재구성/초기화한다.
     * @method eg.Flicking#rebuild
     * @example
     * 		flicking.rebuild();
     *
     * @return {eg.Flicking} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
     */


    _proto.rebuild = function rebuild() {
      var container = this.$container;
      var panel = this._conf.panel;
      var options = this.options;
      var prefix = options.prefix; // filter original panel (remove clones)

      utils.toArray(container.querySelectorAll("." + prefix + "-clone")).forEach(function (el) {
        container.removeChild(el);
      });
      panel.$list = utils.toArray(container.children); // panels' css values

      this._initOriginalPanelStyle(panel.$list); // Add clones


      if (this._addClonePanels()) {
        panel.$list = utils.toArray(container.children);
      }

      this._setDefaultPanel(options.defaultIndex);

      this._arrangePanels();

      return this;
    };
    /**
     * Collection of utilities used internally
     * @ko 내부에서 사용되는 유틸리티 모음
     * @name utils
     * @memberof eg.Flicking
     * @static
     * @constant
     * @private
     * @type {Object}
     */


    return Flicking;
  }(Mixin(component_root_eg_Component_default.a)["with"](eventHandler));

  Flicking.utils = utils;
  Flicking.VERSION = "2.5.0-snapshot";
  Flicking.consts = {
    EVENTS: EVENTS,
    TRANSFORM: TRANSFORM,
    SUPPORT_WILLCHANGE: SUPPORT_WILLCHANGE,
    IS_ANDROID2: IS_ANDROID2
  };
  Flicking.DIRECTION_NONE = axes_root_eg_Axes_default.a.DIRECTION_NONE;
  Flicking.DIRECTION_LEFT = axes_root_eg_Axes_default.a.DIRECTION_LEFT;
  Flicking.DIRECTION_RIGHT = axes_root_eg_Axes_default.a.DIRECTION_RIGHT;
  Flicking.DIRECTION_UP = axes_root_eg_Axes_default.a.DIRECTION_UP;
  Flicking.DIRECTION_DOWN = axes_root_eg_Axes_default.a.DIRECTION_DOWN;
  Flicking.DIRECTION_HORIZONTAL = axes_root_eg_Axes_default.a.DIRECTION_HORIZONTAL;
  Flicking.DIRECTION_VERTICAL = axes_root_eg_Axes_default.a.DIRECTION_VERTICAL;
  Flicking.DIRECTION_ALL = axes_root_eg_Axes_default.a.DIRECTION_ALL;
  return Flicking;
}();



/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL2NvbnN0cy5qcyIsIndlYnBhY2s6Ly9lZy5GbGlja2luZy8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vZWcuRmxpY2tpbmcvLi9zcmMvZXZlbnRIYW5kbGVyLmpzIiwid2VicGFjazovL2VnLkZsaWNraW5nLy4vc3JjL0ZsaWNraW5nLmpzIl0sIm5hbWVzIjpbIndpbiIsIndpbmRvdyIsImRvY3VtZW50IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidXRpbHMiLCIkIiwicGFyYW0iLCJlbCIsIm1hdGNoIiwiY3JlYXRlRWxlbWVudCIsImxlbmd0aCIsInNwbGl0IiwiZm9yRWFjaCIsInYiLCJhdHRyIiwic2V0QXR0cmlidXRlIiwidHJpbSIsInJlcGxhY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9kZU5hbWUiLCJub2RlVHlwZSIsInRvQXJyYXkiLCJzbGljZSIsImNhbGwiLCJpc0FycmF5IiwiYXJyIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwiZXh0ZW5kIiwidGFyZ2V0Iiwib2JqZWN0TiIsInNvdXJjZSIsInNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImtleSIsInZhbHVlIiwiY29uY2F0IiwiY3NzIiwic3R5bGUiLCJnZXRBc051bWJlciIsInRlc3QiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0TnVtVmFsdWUiLCJhcHBseVN0eWxlIiwiY2xhc3NMaXN0IiwiY2xhc3NOYW1lIiwiYWRkIiwiaXNBZGRQYXJhbSIsInJlcyIsImluZGV4T2YiLCJSZWdFeHAiLCJ2YWwiLCJkZWZWYWwiLCJudW0iLCJpc05hTiIsInBhcnNlRmxvYXQiLCJnZXRVbml0VmFsdWUiLCJyeCIsIlN0cmluZyIsImdldE91dGVyIiwidHlwZSIsInBhZGRpbmdNYXJnaW4iLCJkaXIiLCJ0b0xvY2FsZUxvd2VyQ2FzZSIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsInRyYW5zbGF0ZSIsIngiLCJ5IiwiaXNIQSIsImhhc0NsaWNrQnVnIiwidWEiLCJyZXN1bHQiLCJNaXhpbkJ1aWxkZXIiLCJzdXBlcmNsYXNzIiwibWl4aW5zIiwicmVkdWNlIiwiYyIsIm0iLCJNaXhpbiIsIkVWRU5UUyIsImJlZm9yZUZsaWNrU3RhcnQiLCJiZWZvcmVSZXN0b3JlIiwiZmxpY2siLCJmbGlja0VuZCIsInJlc3RvcmUiLCJUUkFOU0ZPUk0iLCJuYW1lIiwic3VwcG9ydCIsImRvY3VtZW50RWxlbWVudCIsIlNVUFBPUlRfV0lMTENIQU5HRSIsIkNTUyIsInN1cHBvcnRzIiwiSVNfQU5EUk9JRDIiLCJEQVRBX0hFSUdIVCIsIkNPTkZJRyIsInBhbmVsIiwiJGxpc3QiLCJpbmRleCIsIm5vIiwiY3VyckluZGV4IiwiY3Vyck5vIiwic2l6ZSIsImNvdW50Iiwib3JpZ0NvdW50IiwiY2hhbmdlZCIsImFuaW1hdGluZyIsIm1pbkNvdW50IiwidG91Y2giLCJob2xkUG9zIiwiZGVzdFBvcyIsImRpc3RhbmNlIiwiZGlyZWN0aW9uIiwibGFzdFBvcyIsImhvbGRpbmciLCJpc1RydXN0ZWQiLCJjdXN0b21FdmVudCIsInJlc3RvcmVDYWxsIiwiZGlyRGF0YSIsImluZGV4VG9Nb3ZlIiwiJGR1bW15QW5jaG9yIiwiT1BUSU9OUyIsImh3QWNjZWxlcmFibGUiLCJwcmVmaXgiLCJkZWNlbGVyYXRpb24iLCJob3Jpem9udGFsIiwiY2lyY3VsYXIiLCJwcmV2aWV3UGFkZGluZyIsImJvdW5jZSIsInRocmVzaG9sZCIsImR1cmF0aW9uIiwicGFuZWxFZmZlY3QiLCJNYXRoIiwicG93IiwiZGVmYXVsdEluZGV4IiwiaW5wdXRUeXBlIiwidGhyZXNob2xkQW5nbGUiLCJhZGFwdGl2ZUhlaWdodCIsInpJbmRleCIsInVzZVRyYW5zbGF0ZSIsIl9ob2xkSGFuZGxlciIsImUiLCJjb25mIiwiX2NvbmYiLCJwb3MiLCJfYWRqdXN0Q29udGFpbmVyQ3NzIiwiX2NoYW5nZUhhbmRsZXIiLCJldmVudFJlcyIsIm1vdmVkUHgiLCJfc2V0UG9pbnRlckV2ZW50cyIsImlucHV0RXZlbnQiLCJvcHRpb25zIiwiYWJzIiwiX3RyaWdnZXJFdmVudCIsIl9zZXRUcmFuc2xhdGUiLCJzdG9wIiwiX3NldFBoYXNlVmFsdWUiLCJfcmVsZWFzZUhhbmRsZXIiLCJwYW5lbFNpemUiLCJpc1BsdXNNb3ZlIiwiZGVwYVBvcyIsIm1vdmVUbyIsIl9pc01vdmFibGUiLCJfdHJpZ2dlckJlZm9yZVJlc3RvcmUiLCJzZXRUbyIsIl9hbmltYXRpb25TdGFydEhhbmRsZXIiLCJpc0Zyb21JbnB1dCIsIl9hbmltYXRpb25FbmRIYW5kbGVyIiwiX3RyaWdnZXJSZXN0b3JlIiwiRmxpY2tpbmciLCJlbGVtZW50IiwiX3ByZWZpeCIsIiR3cmFwcGVyIiwicGx1Z2lucyIsIiRjaGlsZHJlbiIsImNoaWxkcmVuIiwiRXJyb3IiLCJfc2V0T3B0aW9ucyIsIl9zZXRDb25maWciLCJfYnVpbGQiLCJfYmluZEV2ZW50cyIsIl9hcHBseVBhbmVsc0NzcyIsIl9hcnJhbmdlUGFuZWxzIiwiX3NldEhpbnQiLCJfc2V0QWRhcHRpdmVIZWlnaHQiLCJhcnJWYWwiLCJwYWRkaW5nIiwiJG5vZGVzIiwiJGNvbnRhaW5lciIsIm9yaWdQYW5lbFN0eWxlIiwid3JhcHBlciIsImdldEF0dHJpYnV0ZSIsImNvbnRhaW5lciIsImxpc3QiLCJtYXAiLCJ1c2VMYXllckhhY2siLCJldmVudFByZWZpeCIsInB1c2giLCJwYW5lbENvdW50IiwiX3NldFBhZGRpbmciLCJjc3NWYWx1ZSIsInBvc2l0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJ0b3AiLCIkcGFyZW50IiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwiX2luaXRPcmlnaW5hbFBhbmVsU3R5bGUiLCJfYWRkQ2xvbmVQYW5lbHMiLCJfYXhlc0luc3QiLCJyYW5nZSIsImVhc2luZyIsImludGVycnVwdGFibGUiLCJfc2V0RGVmYXVsdFBhbmVsIiwicGFuZWxzIiwic2l6ZVZhbHVlIiwiX2dldERhdGFCeURpcmVjdGlvbiIsImJveFNpemluZyIsImxlZnQiLCJidWlsZCIsInBhZGRpbmdTdW0iLCJhIiwicmV2ZXJzZSIsImpvaW4iLCJvdmVyZmxvdyIsInBhZGRpbmdUeXBlIiwid3JhcHBlclNpemUiLCJtYXgiLCJfY2xvbmVQYW5lbCIsImNsb25lIiwiY2xvbmVOb2RlIiwiY2xvbmVDb3VudCIsImNsb25lTm9kZXMiLCJfbW92ZVBhbmVsUG9zaXRpb24iLCJhcHBlbmQiLCJsaXN0VG9Nb3ZlIiwic3BsaWNlIiwibGFzdEluZGV4IiwiY29vcmRzIiwiYmFzZUluZGV4IiwiX2dldEJhc2VQb3NpdGlvbkluZGV4IiwiX3NldFBhbmVsTm8iLCJfc2V0QXhlcyIsInNvcnQiLCJfYXJyYW5nZVBhbmVsUG9zaXRpb24iLCJfYXBwbHlQYW5lbHNQb3MiLCJiaW5kIiwiX3NldE1vdmVTdHlsZSIsIiRlbCIsImNvb3Jkc1ZhbHVlIiwidHJhbnNmb3JtIiwiJGVsZW1lbnQiLCJkdW1teUFuY2hvckNsYXNzTmFtZSIsImkiLCJwaGFzZSIsInRvVmFsdWUiLCJwYWRkaW5nVG9wIiwidG8iLCJfZ2V0Q29vcmRzVmFsdWUiLCJmb2N1cyIsIm1ldGhvZCIsIndpbGxDaGFuZ2UiLCJkYXRhIiwibmV4dCIsImZsb29yIiwiYXhlc0luc3QiLCJfcGFuSW5wdXQiLCJzY2FsZSIsIm9uIiwiaG9sZCIsImNoYW5nZSIsInJlbGVhc2UiLCJhbmltYXRpb25TdGFydCIsImFuaW1hdGlvbkVuZCIsImNvbm5lY3QiLCJkaXNhYmxlSW5wdXQiLCJvZmYiLCIkcGFuZWwiLCJESVJFQ1RJT05fTEVGVCIsIkRJUkVDVElPTl9SSUdIVCIsIiRmaXJzdCIsInF1ZXJ5U2VsZWN0b3IiLCJfZ2V0TnVtQnlEaXJlY3Rpb24iLCJfcmV2ZXJ0UGFuZWxObyIsInBvaW50ZXIiLCJwb2ludGVyRXZlbnRzIiwicHJldmVudFN5c3RlbUV2ZW50IiwiaXNNb3ZhYmxlIiwiY3VyclBvcyIsImF4aXMiLCJnZXQiLCJ0cmlnZ2VyIiwiZXZlbnRUeXBlIiwiX2dldEVsZW1lbnQiLCJwaHlzaWNhbCIsInRvdGFsIiwiY3VycmVudEluZGV4IiwiX3NldFZhbHVlVG9Nb3ZlIiwiZ2V0SW5kZXgiLCJnZXRFbGVtZW50IiwiZ2V0TmV4dEVsZW1lbnQiLCJnZXROZXh0SW5kZXgiLCJnZXRBbGxFbGVtZW50cyIsImdldFByZXZFbGVtZW50IiwiZ2V0UHJldkluZGV4IiwiaXNQbGF5aW5nIiwiX21vdmVQYW5lbEJ5UGhhc2UiLCJkdXJhdGlvblZhbHVlIiwiX21vdmVUbyIsInByZXYiLCJub1ZhbHVlIiwiaXNQb3NpdGl2ZSIsInJlc2l6ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImVuYWJsZUlucHV0IiwiZW5hYmxlIiwiZGlzYWJsZSIsImdldFN0YXR1cyIsInN0cmluZ2lmeSIsInJ4U3R5bGUiLCJzdGF0dXMiLCJjc3NUZXh0IiwiaHRtbCIsImlubmVySFRNTCIsIkpTT04iLCJzZXRTdGF0dXMiLCJzdGF0dXNWYWx1ZSIsImlzQWRhcHRpdmVIZWlnaHQiLCJwYXJzZSIsImRlc3Ryb3kiLCJyZW1vdmVDaGlsZCIsIiRjb21wb25lbnRXaWxsVW5tb3VudCIsInBsdWdpbiIsInAiLCJmaWx0ZXIiLCIkY29tcG9uZW50V2lsbE1vdW50IiwicmVidWlsZCIsIlZFUlNJT04iLCJjb25zdHMiLCJESVJFQ1RJT05fTk9ORSIsIkRJUkVDVElPTl9VUCIsIkRJUkVDVElPTl9ET1dOIiwiRElSRUNUSU9OX0hPUklaT05UQUwiLCJESVJFQ1RJT05fVkVSVElDQUwiLCJESVJFQ1RJT05fQUxMIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBSUE7QUFFQSxJQUFJQSxHQUFKOztBQUVBLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNsQztBQUNBRCxLQUFHLEdBQUc7QUFDTEUsWUFBUSxFQUFFLEVBREw7QUFFTEMsYUFBUyxFQUFFO0FBQ1ZDLGVBQVMs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SUE5bkRxQyxLQUFLLENBQUMscUNBQUQsQ0FBTCxTQUFzQixZQUF0QixDOztBQUFqQmIsVSxDQXdvRGJ4SyxLLEdBQVEsSztBQXhvREt3SyxVLENBbXBEYnlLLE8sR0FBVSxnQjtBQW5wREd6SyxVLENBOHBEYjBLLE0sR0FBUztBQUNmblEsVUFBTSxFQUFOLE1BRGU7QUFFZk0sYUFBUyxFQUFULFNBRmU7QUFHZkksc0JBQWtCLEVBQWxCLGtCQUhlO0FBSWZHLGVBQVcsRUFBWCxXQUFBQTtBQUplLEc7QUE5cERJNEUsVSxDQStxRGIySyxjLEdBQWlCLDJCQUFJLENBQUNBLGM7QUEvcURUM0ssVSxDQTJyRGI4RyxjLEdBQWlCLDJCQUFJLENBQUNBLGM7QUEzckRUOUcsVSxDQXVzRGIrRyxlLEdBQWtCLDJCQUFJLENBQUNBLGU7QUF2c0RWL0csVSxDQW10RGI0SyxZLEdBQWUsMkJBQUksQ0FBQ0EsWTtBQW50RFA1SyxVLENBK3REYjZLLGMsR0FBaUIsMkJBQUksQ0FBQ0EsYztBQS90RFQ3SyxVLENBMnVEYjhLLG9CLEdBQXVCLDJCQUFJLENBQUNBLG9CO0FBM3VEZjlLLFUsQ0F1dkRiK0ssa0IsR0FBcUIsMkJBQUksQ0FBQ0Esa0I7QUF2dkRiL0ssVSxDQW13RGJnTCxhLEdBQWdCLDJCQUFJLENBQUNBLGE7U0Fud0RSaEwsUSIsImZpbGUiOiIwLmNiZmM5MDMzZmUwNDI5NmIyMDgwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5ldy1mdW5jLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuXG5sZXQgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHQvLyB3aW5kb3cgaXMgdW5kZWZpbmVkIGluIG5vZGUuanNcblx0d2luID0ge1xuXHRcdGRvY3VtZW50OiB7fSxcblx0XHRuYXZpZ2F0b3I6IHtcblx0XHRcdHVzZXJBZ2VudDogXCJcIlxuXHRcdH1cblx0fTtcbn0gZWxzZSB7XG5cdHdpbiA9IHdpbmRvdztcbn1cbi8qIGVzbGludC1lbmFibGUgbm8tbmV3LWZ1bmMsIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG5cbmNvbnN0IGRvY3VtZW50ID0gd2luLmRvY3VtZW50O1xuXG5leHBvcnQge1xuXHR3aW4gYXMgd2luZG93LFxuXHRkb2N1bWVudFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt3aW5kb3csIGRvY3VtZW50fSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbmNvbnN0IHV0aWxzID0ge1xuXHQvKipcblx0ICogU2VsZWN0IG9yIGNyZWF0ZSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSBwYXJhbVxuXHQgKiAgd2hlbiBzdHJpbmcgZ2l2ZW4gaXMgYXMgSFRNTCB0YWcsIHRoZW4gY3JlYXRlIGVsZW1lbnRcblx0ICogIG90aGVyd2lzZSBpdCByZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRzXG5cdCAqIEByZXR1cm5zIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdCQocGFyYW0pIHtcblx0XHRsZXQgZWwgPSBudWxsO1xuXG5cdFx0aWYgKHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0Ly8gY2hlY2sgaWYgc3RyaW5nIGlzIEhUTUwgdGFnIGZvcm1hdFxuXHRcdFx0Y29uc3QgbWF0Y2ggPSBwYXJhbS5tYXRjaCgvXjwoW2Etel0rKVxccyooW14+XSopPi8pO1xuXG5cdFx0XHQvLyBjcmVhdGluZyBlbGVtZW50XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG1hdGNoWzFdKTtcblxuXHRcdFx0XHQvLyBhdHRyaWJ1dGVzXG5cdFx0XHRcdG1hdGNoLmxlbmd0aCA9PT0gMyAmJlxuXHRcdFx0XHRcdG1hdGNoWzJdLnNwbGl0KFwiIFwiKS5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgYXR0ciA9IHYuc3BsaXQoXCI9XCIpO1xuXG5cdFx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0clswXSwgYXR0clsxXS50cmltKCkucmVwbGFjZSgvKF5bXCInXXxbXCInXSQpL2csIFwiXCIpKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbSk7XG5cblx0XHRcdFx0aWYgKCFlbC5sZW5ndGgpIHtcblx0XHRcdFx0XHRlbCA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZWwubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0ZWwgPSBlbFswXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAocGFyYW0ubm9kZU5hbWUgJiYgcGFyYW0ubm9kZVR5cGUgPT09IDEpIHtcblx0XHRcdGVsID0gcGFyYW07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyB0byBhcnJheVxuXHQgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufEhUTUxFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJucyB7QXJyYXl9XG5cdCAqL1xuXHR0b0FycmF5KGVsKSB7XG5cdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwoZWwpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiBpcyBhcnJheVxuXHQgKiBAcGFyYW0gYXJyXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgKi9cblx0aXNBcnJheShhcnIpIHtcblx0XHRyZXR1cm4gYXJyICYmIGFyci5jb25zdHJ1Y3RvciA9PT0gQXJyYXk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIGlzIG9iamVjdFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdCAqIEByZXR1cm5zIHtCb29sZWFufVxuXHQgKi9cblx0aXNPYmplY3Qob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiAhb2JqLm5vZGVUeXBlICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIXRoaXMuaXNBcnJheShvYmopO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3Rcblx0ICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0TlxuXHQgKiBAcmV0dXJucyB7T2JqZWN0fSBtZXJnZWQgdGFyZ2V0IG9iamVjdFxuXHQgKiBAZXhhbXBsZVxuXHQgKiAgdmFyIHRhcmdldCA9IHsgYTogMSB9O1xuXHQgKiAgdXRpbHMuZXh0ZW5kKHRhcmdldCwgeyBiOiAyLCBjOiAzIH0pO1xuXHQgKiAgdGFyZ2V0OyAgLy8geyBhOiAxLCBiOiAyLCBjOiAzIH07XG5cdCAqL1xuXHRleHRlbmQodGFyZ2V0LCAuLi5vYmplY3ROKSB7XG5cdFx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblxuXHRcdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRcdGlmICh0aGlzLmlzT2JqZWN0KHRhcmdldCkgJiYgdGhpcy5pc09iamVjdChzb3VyY2UpKSB7XG5cdFx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0XHRpZiAodGhpcy5pc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0XHQhdGFyZ2V0W2tleV0gJiYgKHRhcmdldFtrZXldID0ge30pO1xuXG5cdFx0XHRcdFx0dGFyZ2V0W2tleV0gPSB0aGlzLmV4dGVuZCh0YXJnZXRba2V5XSwgdmFsdWUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRhcmdldFtrZXldID0gdGhpcy5pc0FycmF5KHZhbHVlKSA/XG5cdFx0XHRcdFx0XHR2YWx1ZS5jb25jYXQoKSA6IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5leHRlbmQodGFyZ2V0LCAuLi5vYmplY3ROKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IG9yIHNldCB0aGUgc3R5bGUgdmFsdWUgb3IgYXBwbHlcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxBcnJheX0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBzdHlsZVxuXHQgKiAgU3RyaW5nOiByZXR1cm4gc3R5bGUgcHJvcGVydHkgdmFsdWVcblx0ICogIE9iamVjdDogc2V0IHN0eWxlIHZhbHVlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZ2V0QXNOdW1iZXIgR2V0IHRoZSB2YWx1ZSBhcyBudW1iZXJcblx0ICogQHJldHVybnMge1N0cmluZ3xIVE1MRWxlbWVudH1cblx0ICovXG5cdGNzcyhlbCwgc3R5bGUsIGdldEFzTnVtYmVyKSB7XG5cdFx0aWYgKHR5cGVvZihzdHlsZSkgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGxldCB2YWx1ZSA9IGVsLnN0eWxlW3N0eWxlXTtcblxuXHRcdFx0aWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCJhdXRvXCIgfHwgKC9cXGQvLnRlc3QodmFsdWUpICYmICEvXFxkKHB4KT8kLy50ZXN0KHZhbHVlKSkpIHtcblx0XHRcdFx0dmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbc3R5bGVdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZ2V0QXNOdW1iZXIgPyB0aGlzLmdldE51bVZhbHVlKHZhbHVlKSA6IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBhcHBseVN0eWxlID0gKHRhcmdldCwgc291cmNlKSA9PlxuXHRcdFx0XHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0dGFyZ2V0W3ZdID0gc291cmNlW3ZdO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5pc0FycmF5KGVsKSA/XG5cdFx0XHRcdGVsLmZvckVhY2godiA9PiBhcHBseVN0eWxlKHYuc3R5bGUsIHN0eWxlKSkgOlxuXHRcdFx0XHRhcHBseVN0eWxlKGVsLnN0eWxlLCBzdHlsZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBjbGFzc0xpc3Rcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgdGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgY2xhc3MgbmFtZSBzdHJpbmcgdG8gYmUgaGFuZGxlZFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFkZCBBZGQgb3IgcmVtb3ZlIGNsYXNzIC0gdHJ1ZTogQWRkLCBmYWxzZTogUmVtb3ZlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59IGlmIGFkZCBwYXJhbSBpcyBtaXNzaW5nLCB0aGVuIHJldHVybiBleGlzdGVuY2Ugb2YgY2xhc3MgbmFtZVxuXHQgKi9cblx0Y2xhc3NMaXN0KGVsLCBjbGFzc05hbWUsIGFkZCkge1xuXHRcdGNvbnN0IGlzQWRkUGFyYW0gPSB0eXBlb2YgYWRkID09PSBcImJvb2xlYW5cIjtcblx0XHRsZXQgcmVzO1xuXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCkge1xuXHRcdFx0cmVzID0gZWwuY2xhc3NMaXN0W1xuXHRcdFx0XHQoaXNBZGRQYXJhbSAmJiAoYWRkID8gXCJhZGRcIiA6IFwicmVtb3ZlXCIpKSB8fCBcImNvbnRhaW5zXCJcblx0XHRcdF0oY2xhc3NOYW1lKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzID0gZWwuY2xhc3NOYW1lO1xuXG5cdFx0XHRpZiAoaXNBZGRQYXJhbSkge1xuXHRcdFx0XHRpZiAoYWRkICYmIHJlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cmVzID0gZWwuY2xhc3NOYW1lID0gKGAke3Jlc30gJHtjbGFzc05hbWV9YCkucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIik7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIWFkZCkge1xuXHRcdFx0XHRcdHJlcyA9IGVsLmNsYXNzTmFtZSA9IHJlcy5yZXBsYWNlKGNsYXNzTmFtZSwgXCJcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlcyA9IG5ldyBSZWdFeHAoYFxcXFxiJHtjbGFzc05hbWV9XFxcXGJgKS50ZXN0KHJlcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlcztcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgYW5kIHBhcnNlIHZhbHVlIHRvIG51bWJlclxuXHQgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHZhbFxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGVmVmFsXG5cdCAqIEByZXR1cm4ge051bWJlcn1cblx0ICovXG5cdGdldE51bVZhbHVlKHZhbCwgZGVmVmFsKSB7XG5cdFx0bGV0IG51bSA9IHZhbDtcblxuXHRcdHJldHVybiBpc05hTihudW0gPSBwYXJzZUZsb2F0KG51bSkpID8gZGVmVmFsIDogbnVtO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdW5pdCBmb3JtYXR0ZWQgdmFsdWVcblx0ICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSB2YWxcblx0ICogQHJldHVybiB7U3RyaW5nfSB2YWwgVmFsdWUgZm9ybWF0dGVkIHdpdGggdW5pdFxuXHQgKi9cblx0Z2V0VW5pdFZhbHVlKHZhbCkge1xuXHRcdGNvbnN0IHJ4ID0gLyg/OlthLXpdezIsfXwlKSQvO1xuXG5cdFx0cmV0dXJuIChwYXJzZUZsb2F0KHZhbCkgfHwgMCkgKyAoU3RyaW5nKHZhbCkubWF0Y2gocngpIHx8IFwicHhcIik7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEdldCBlbGVtZW50J3Mgb3V0ZXIgdmFsdWVcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBbb3V0ZXJXaWR0aHxvdXRlckhlaWdodF1cblx0ICogQHJldHVybnMge051bWJlcn0gb3V0ZXIncyB2YWx1ZVxuXHQgKi9cblx0Z2V0T3V0ZXIoZWwsIHR5cGUpIHtcblx0XHRsZXQgcGFkZGluZ01hcmdpbiA9IDA7XG5cblx0XHQodHlwZSA9PT0gXCJvdXRlcldpZHRoXCIgP1xuXHRcdFx0W1wiTGVmdFwiLCBcIlJpZ2h0XCJdIDpcblx0XHRcdFtcIlRvcFwiLCBcIkJvdHRvbVwiXVxuXHRcdCkuZm9yRWFjaChkaXIgPT4ge1xuXHRcdFx0W1wicGFkZGluZ1wiLCBcIm1hcmdpblwiXS5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRwYWRkaW5nTWFyZ2luICs9IHRoaXMuY3NzKGVsLCBgJHt2fSR7ZGlyfWAsIHRydWUpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcy5jc3MoZWwsIHR5cGUucmVwbGFjZShcIm91dGVyXCIsIFwiXCIpLnRvTG9jYWxlTG93ZXJDYXNlKCksIHRydWUpICsgcGFkZGluZ01hcmdpbjtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IGVsZW1lbnQncyBvdXRlcldpZHRoIHZhbHVlIHdpdGggbWFyZ2luXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XG5cdCAqL1xuXHRvdXRlcldpZHRoKGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3V0ZXIoZWwsIFwib3V0ZXJXaWR0aFwiKTtcblx0fSxcblxuXHQvKipcblx0ICogR2V0IGVsZW1lbnQncyBvdXRlckhlaWdodCB2YWx1ZSB3aXRoIG1hcmdpblxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxuXHQgKi9cblx0b3V0ZXJIZWlnaHQoZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPdXRlcihlbCwgXCJvdXRlckhlaWdodFwiKTtcblx0fSxcblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgc3ludGF4IG9mIHRoZSB0cmFuc2xhdGUgc3R5bGUgd2hpY2ggaXMgYXBwbGllZCB0byBDU1MgdHJhbnNpdGlvbiBwcm9wZXJ0aWVzLlxuXHQgKlxuXHQgKiBAa28gQ1NTIO2KuOuenOyngOyFmCDsho3shLHsl5Ag7KCB7Jqp7ZWgIHRyYW5zbGF0ZSDsiqTtg4Dsnbwg6rWs66y47J2EIOuwmO2ZmO2VnOuLpFxuXHQgKiBAbWV0aG9kIGVnI3RyYW5zbGF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30geCBEaXN0YW5jZSB0byBtb3ZlIGFsb25nIHRoZSBYIGF4aXMgPGtvPnjstpXsnYQg65Sw6528IOydtOuPme2VoCDqsbDrpqw8L2tvPlxuXHQgKiBAcGFyYW0ge1N0cmluZ30geSBEaXN0YW5jZSB0byBtb3ZlIGFsb25nIHRoZSBZIGF4aXMgPGtvPnnstpXsnYQg65Sw6528IOydtOuPme2VoCDqsbDrpqw8L2tvPlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtpc0hBXSBGb3JjZSBoYXJkd2FyZSBhY2NlbGVyYXRpb24gPGtvPu2VmOuTnOybqOyWtCDqsIDsho0g7IKs7JqpIOyXrOu2gDwva28+XG5cdCAqIEByZXR1cm4ge1N0cmluZ30gU3ludGF4IG9mIHRoZSB0cmFuc2xhdGUgc3R5bGUgPGtvPnRyYW5zbGF0ZSDsiqTtg4Dsnbwg6rWs66y4PC9rbz5cblx0ICovXG5cdHRyYW5zbGF0ZSh4LCB5LCBpc0hBKSB7XG5cdFx0cmV0dXJuIGlzSEEgfHwgZmFsc2UgP1xuXHRcdFx0YHRyYW5zbGF0ZTNkKCR7eH0sJHt5fSwwKWAgOiBgdHJhbnNsYXRlKCR7eH0sJHt5fSlgO1xuXHR9LFxuXG5cdC8vIDEuIHVzZXIgcHJlc3Mgb25lIHBvc2l0aW9uIG9uIHNjcmVlbi5cblx0Ly8gMi4gdXNlciBtb3ZlcyB0byB0aGUgb3RoZXIgcG9zaXRpb24gb24gc2NyZWVuLlxuXHQvLyAzLiB3aGVuIHVzZXIgcmVsZWFzZXMgZmluZ2VycyBvbiBzY3JlZW4sICdjbGljaycgZXZlbnQgaXMgZmlyZWQgYXQgcHJldmlvdXMgcG9zaXRpb24uXG5cdGhhc0NsaWNrQnVnKCkge1xuXHRcdGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0Y29uc3QgcmVzdWx0ID0gL2lQaG9uZXxpUGFkLy50ZXN0KHVhKTtcblxuXHRcdHRoaXMuaGFzQ2xpY2tCdWcgPSAoKSA9PiByZXN1bHQ7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufTtcblxuY2xhc3MgTWl4aW5CdWlsZGVyIHtcblx0Y29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuXHRcdHRoaXMuc3VwZXJjbGFzcyA9IHN1cGVyY2xhc3MgfHwgY2xhc3Mge307XG5cdH1cblxuXHR3aXRoKC4uLm1peGlucykge1xuXHRcdHJldHVybiBtaXhpbnMucmVkdWNlKChjLCBtKSA9PiBtKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuXHR9XG59XG5cbmNvbnN0IE1peGluID0gc3VwZXJjbGFzcyA9PiBuZXcgTWl4aW5CdWlsZGVyKHN1cGVyY2xhc3MpO1xuXG5leHBvcnQge3V0aWxzLCBNaXhpbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNSBOQVZFUiBDb3JwLlxuICogZWdqcyBwcm9qZWN0cyBhcmUgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7d2luZG93IGFzIGdsb2JhbCwgZG9jdW1lbnQgYXMgZG9jfSBmcm9tIFwiLi9icm93c2VyXCI7XG5cbi8vIGRlZmluZSBjdXN0b20gZXZlbnRzIG5hbWVcbmNvbnN0IEVWRU5UUyA9IHtcblx0YmVmb3JlRmxpY2tTdGFydDogXCJiZWZvcmVGbGlja1N0YXJ0XCIsXG5cdGJlZm9yZVJlc3RvcmU6IFwiYmVmb3JlUmVzdG9yZVwiLFxuXHRmbGljazogXCJmbGlja1wiLFxuXHRmbGlja0VuZDogXCJmbGlja0VuZFwiLFxuXHRyZXN0b3JlOiBcInJlc3RvcmVcIlxufTtcblxuLy8gY2hlY2sgZm9yIHRoZSB0cmFuc2Zvcm0gcHJvcGVydHlcbmNvbnN0IFRSQU5TRk9STSA9IHtcblx0bmFtZTogXCJ0cmFuc2Zvcm1cIlxufTtcblxuVFJBTlNGT1JNLnN1cHBvcnQgPSAoKCkgPT4ge1xuXHRpZiAoIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3Qgc3R5bGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdHJldHVybiBUUkFOU0ZPUk0ubmFtZSBpbiBzdHlsZSB8fCAoVFJBTlNGT1JNLm5hbWUgPSBcIndlYmtpdFRyYW5zZm9ybVwiKSBpbiBzdHlsZTtcbn0pKCk7XG5cbi8vIGNoZWNrIGZvciB3aWxsLWNoYW5nZSBzdXBwb3J0XG5jb25zdCBTVVBQT1JUX1dJTExDSEFOR0UgPSBnbG9iYWwuQ1NTICYmIGdsb2JhbC5DU1Muc3VwcG9ydHMgJiZcblx0Z2xvYmFsLkNTUy5zdXBwb3J0cyhcIndpbGwtY2hhbmdlXCIsIFwidHJhbnNmb3JtXCIpO1xuXG4vLyBjaGVjayBmb3IgQW5kcm9pZCAyLnhcbmNvbnN0IElTX0FORFJPSUQyID0gL0FuZHJvaWQgMlxcLi8udGVzdChnbG9iYWwubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8vIGRhdGEtaGVpZ2h0IGF0dHJpYnV0ZSdzIG5hbWUgZm9yIGFkYXB0aXZlSGVpZ2h0IG9wdGlvblxuY29uc3QgREFUQV9IRUlHSFQgPSBcImRhdGEtaGVpZ2h0XCI7XG5cbmV4cG9ydCB7XG5cdEVWRU5UUyxcblx0VFJBTlNGT1JNLFxuXHRTVVBQT1JUX1dJTExDSEFOR0UsXG5cdElTX0FORFJPSUQyLFxuXHREQVRBX0hFSUdIVFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IE5BVkVSIENvcnAuXG4gKiBlZ2pzIHByb2plY3RzIGFyZSBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLy8gaW50ZXJuYWwgY29uZmlnIHZhbHVlc1xuY29uc3QgQ09ORklHID0ge1xuXHRwYW5lbDoge1xuXHRcdCRsaXN0OiBudWxsLCAgICAgICAgLy8gcGFuZWwgbGlzdFxuXHRcdGluZGV4OiAwLFx0XHRcdC8vIGRvbSBpbmRleCB1c2VkIGFtb25nIHByb2Nlc3Ncblx0XHRubzogMCxcdFx0XHRcdC8vIHBhbmVsIG5vIHVzZWQgYW1vbmcgcHJvY2Vzc1xuXHRcdGN1cnJJbmRleDogMCwgICAgICAgLy8gY3VycmVudCBwaHlzaWNhbCBkb20gaW5kZXhcblx0XHRjdXJyTm86IDAsICAgICAgICAgIC8vIGN1cnJlbnQgbG9naWNhbCBwYW5lbCBudW1iZXJcblx0XHRzaXplOiAwLFx0XHRcdC8vIHBhbmVsIHNpemVcblx0XHRjb3VudDogMCxcdFx0XHQvLyB0b3RhbCBwaHlzaWNhbCBwYW5lbCBjb3VudFxuXHRcdG9yaWdDb3VudDogMCxcdFx0Ly8gdG90YWwgY291bnQgb2YgZ2l2ZW4gb3JpZ2luYWwgcGFuZWxzXG5cdFx0Y2hhbmdlZDogZmFsc2UsXHRcdC8vIGlmIHBhbmVsIGNoYW5nZWRcblx0XHRhbmltYXRpbmc6IGZhbHNlLFx0Ly8gY3VycmVudCBhbmltYXRpbmcgc3RhdHVzIGJvb2xlYW5cblx0XHRtaW5Db3VudDogMyAgICAgICAgIC8vIG1pbmltdW0gcGFuZWwgY291bnRcblx0fSxcblx0dG91Y2g6IHtcblx0XHRob2xkUG9zOiAwLCAgICAgICAgIC8vIGhvbGQgeCx5IGNvb3JkaW5hdGVcblx0XHRkZXN0UG9zOiAwLFx0ICAgICAgICAvLyBkZXN0aW5hdGlvbiB4LHkgY29vcmRpbmF0ZVxuXHRcdGRpc3RhbmNlOiAwLFx0XHQvLyB0b3VjaCBkaXN0YW5jZSBwaXhlbCBvZiBzdGFydCB0byBlbmQgdG91Y2hcblx0XHRkaXJlY3Rpb246IG51bGwsXHQvLyB0b3VjaCBkaXJlY3Rpb25cblx0XHRsYXN0UG9zOiAwLFx0XHRcdC8vIHRvIGRldGVybWluZSBtb3ZlIG9uIGhvbGRpbmdcblx0XHRob2xkaW5nOiBmYWxzZSxcblx0XHRpc1RydXN0ZWQ6IGZhbHNlICAgIC8vIGlmIGV2ZW50IHdhcyBpbnN0YW50aWF0ZWQgYnkgdXNlcidzIGFjdGlvbiBleHBsaWNpdGx5XG5cdH0sXG5cdGN1c3RvbUV2ZW50OiB7ICAgICAgICAgIC8vIGZvciBjdXN0b20gZXZlbnRzIHZhbHVlXG5cdFx0ZmxpY2s6IHRydWUsXG5cdFx0cmVzdG9yZTogZmFsc2UsXG5cdFx0cmVzdG9yZUNhbGw6IGZhbHNlXG5cdH0sXG5cdGRpckRhdGE6IFtdLFx0XHRcdC8vIGRpcmVjdGlvbiBjb25zdGFudCB2YWx1ZSBhY2NvcmRpbmcgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbFxuXHRpbmRleFRvTW92ZTogMCxcblx0JGR1bW15QW5jaG9yOiBudWxsICAgICAgLy8gRm9yIGJ1Z2d5IGxpbmsgaGlnaGxpZ2h0aW5nIG9uIEFuZHJvaWQgMi54XG59O1xuXG5cbi8vIGRlZmF1bHQgb3B0aW9uc1xuY29uc3QgT1BUSU9OUyA9IHtcblx0aHdBY2NlbGVyYWJsZTogdHJ1ZSwgICAgLy8gc2V0IGZvciBodyBhY2NlbGVyYXRpb24gKHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9uZXRpbC9jMWQxYjY3ZTFjMTkyNjM2NGMwNzA5ZjExMGEwOWI0NCBmb3Igb2xkIGRldmljZXMgc3VwcG9ydClcblx0cHJlZml4OiBcImVnLWZsaWNrXCIsICAgICAvLyBwcmVmaXggdmFsdWUgb2YgY2xhc3MgbmFtZVxuXHRkZWNlbGVyYXRpb246IDAuMDAwNiwgICAvLyBkZWNlbGVyYXRpb24gdmFsdWVcblx0aG9yaXpvbnRhbDogdHJ1ZSwgICAgICAgLy8gbW92ZSBkaXJlY3Rpb24gKHRydWUgPT0gaG9yaXpvbnRhbCwgZmFsc2UgPT0gdmVydGljYWwpXG5cdGNpcmN1bGFyOiBmYWxzZSwgICAgICAgIC8vIGNpcmN1bGFyIG1vZGUuIEluIHRoaXMgbW9kZSBhdCBsZWFzdCAzIHBhbmVscyBhcmUgcmVxdWlyZWQuXG5cdHByZXZpZXdQYWRkaW5nOiBudWxsLCAgIC8vIHByZXZpZXcgcGFkZGluZyB2YWx1ZSBpbiBsZWZ0KHVwKSB0byByaWdodChkb3duKSBvcmRlci4gSW4gdGhpcyBtb2RlIGF0IGxlYXN0IDUgcGFuZWxzIGFyZSByZXF1aXJlZC5cblx0Ym91bmNlOiBudWxsLCAgICAgICAgICAgLy8gYm91bmNlIHZhbHVlIGluIGxlZnQodXApIHRvIHJpZ2h0KGRvd24pIG9yZGVyLiBXb3JrcyBvbmx5IGluIG5vbi1jaXJjdWxhciBtb2RlLlxuXHR0aHJlc2hvbGQ6IDQwLCAgICAgICAgICAvLyB0aGUgZGlzdGFuY2UgcGl4ZWwgdGhyZXNob2xkIHZhbHVlIGZvciBjaGFuZ2UgcGFuZWxcblx0ZHVyYXRpb246IDEwMCwgICAgICAgICAgLy8gZHVyYXRpb24gbXMgZm9yIGFuaW1hdGlvblxuXHRwYW5lbEVmZmVjdDogeCA9PiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpLCAgLy8gZWFzaW5nIGZ1bmN0aW9uIGZvciBwYW5lbCBjaGFuZ2UgYW5pbWF0aW9uXG5cdGRlZmF1bHRJbmRleDogMCwgICAgICAgIC8vIGluaXRpYWwgcGFuZWwgaW5kZXggdG8gYmUgc2hvd25cblx0aW5wdXRUeXBlOiBbICAgICAgICAgICAgLy8gaW5wdXQgdHlwZVxuXHRcdFwidG91Y2hcIiwgXCJtb3VzZVwiXG5cdF0sXG5cdHRocmVzaG9sZEFuZ2xlOiA0NSwgICAgIC8vIHRoZSB0aHJlc2hvbGQgdmFsdWUgdGhhdCBkZXRlcm1pbmVzIHdoZXRoZXIgdXNlciBhY3Rpb24gaXMgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCAoMH45MClcblx0YWRhcHRpdmVIZWlnaHQ6IGZhbHNlLCAgLy8gU2V0IGNvbnRhaW5lcidzIGhlaWdodCBiZSBhZGFwdGl2ZSBhY2NvcmRpbmcgcGFuZWwncyBoZWlnaHRcblx0ekluZGV4OiAyMDAwLCAgICAgICAgICAgLy8gei1pbmRleCB2YWx1ZSBmb3IgY29udGFpbmVyIGVsZW1lbnRcblx0dXNlVHJhbnNsYXRlOiB0cnVlICAgICAgLy8gdXNlIG9mIHRyYW5zbGF0ZSBvbiBwYW5lbCBtb3Zlc1xufTtcblxuZXhwb3J0IHtcblx0Q09ORklHLFxuXHRPUFRJT05TXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge0VWRU5UU30gZnJvbSBcIi4vY29uc3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHN1cGVyY2xhc3MgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlcmNsYXNzIHtcblx0LyoqXG5cdCAqICdob2xkJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfaG9sZEhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblx0XHRjb25zdCBob2xkUG9zID0gZS5wb3MuZmxpY2s7XG5cblx0XHR0b3VjaC5ob2xkUG9zID0gaG9sZFBvcztcblx0XHR0b3VjaC5ob2xkaW5nID0gdHJ1ZTtcblx0XHR0b3VjaC5pc1RydXN0ZWQgPSB0cnVlO1xuXHRcdGNvbmYucGFuZWwuY2hhbmdlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKFwic3RhcnRcIiwgaG9sZFBvcyk7XG5cdH1cblxuXHQvKipcblx0ICogJ2NoYW5nZScgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2NoYW5nZUhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblx0XHRjb25zdCBwb3MgPSBlLnBvcy5mbGljaztcblx0XHRjb25zdCBob2xkUG9zID0gdG91Y2guaG9sZFBvcztcblx0XHRsZXQgZGlyZWN0aW9uO1xuXHRcdGxldCBldmVudFJlcyA9IG51bGw7XG5cdFx0bGV0IG1vdmVkUHg7XG5cblx0XHR0aGlzLl9zZXRQb2ludGVyRXZlbnRzKGUpOyAgLy8gZm9yIFwiY2xpY2tcIiBidWdcblxuXHRcdC8qKlxuXHRcdCAqIEFuIGV2ZW50IHRoYXQgb2NjdXJzIHdoZW5ldmVyIHRoZSBwYW5lbCdzIGNvb3JkaW5hdGUgdmFsdWUgY2hhbmdlcy4gSXQgb2NjdXJzIGluIHRoZSBmb2xsb3dpbmcgY2FzZXMuPGJyPjxicj4xLiBXaGVuIHRoZSB1c2VyIGlzIGlucHV0aW5nIHRoZSBtb3ZlLjxicj4yLiBXaGVuIG1vdmluZyB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwgYWZ0ZXIgeW91IGhhdmUgZmluaXNoZWQgaW5wdXRpbmcgdGhlIG1vdmUgaW4gc3RlcCAxLjxicj4zLiBXaGVuIHRoZSBjdXJyZW50IHBhbmVsIGlzIG1vdmluZyB0byBpdHMgb3JpZ2luYWwgcG9zaXRpb24gYWZ0ZXIgdGhlIG1vdmVtZW50IGlzIGZpbmlzaGVkIGluIHN0ZXAgMS48YnI+NC4gTW92aW5nIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbCBieSBjYWxsaW5nIHRoZSBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAgIG1ldGhvZC4gKERvIG5vdCBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0gZXZlbnQuKVxuXHRcdCAqIEBrbyDtjKjrhJDsnZgg7KKM7ZGc6rCS7J20IOuzgO2VoCDrlYzrp4jri6Qg67Cc7IOd7ZWY64qUIOydtOuypO2KuC4g7JWE656Y7J2YIOqyveyasOyXkCDrsJzsg53tlZzri6QuPGJyPjxicj4xLiDsgqzsmqnsnpDqsIAg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXspJHsnbwg65WMLjxicj4yLiAx67KI7JeQ7IScIOydtOuPmShtb3ZlKSDslaHshZgg7J6F66Cl7J20IOuBneuCmOqzoCDrqqnsoIEg7Yyo64SQ66GcIOydtOuPmeykkeydvCDrlYwuPGJyPjMuIDHrsojsl5DshJwg7J2064+ZKG1vdmUpIOyVoeyFmCDsnoXroKXsnbQg64Gd64KY6rOgIO2YhOyerCDtjKjrhJDsnZgg7JuQ656YIOychOy5mOuhnCDsnbTrj5nspJHsnbwg65WMLjxicj40LiBgbW92ZVRvKClgLCBgcHJldigpYCwgYG5leHQoKWAsIOuplOyEnOuTnOulvCDtmLjstpztlZjsl6wg66qp7KCBIO2MqOuEkOuhnCDsnbTrj5nspJHsnbwg65WMLiAoW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR97J2067Kk7Yq47J2YIOq4sOuzuOuPmeyekeydhCDrp4nsp4Ag7JWK7JWE7JW8IO2VnOuLpC4pPGJyPjUuIGByZXN0b3JlKClgIOuplOyEnOuTnOulvCDtmLjstpztlZjsl6wg7ZiE7J6sIO2MqOuEkOydtCDsm5Drnpgg7JyE7LmY66GcIOydtOuPmeykkeydvCDrlYwuIChbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH3snbTrsqTtirjsnZgg6riw67O464+Z7J6RIOuwqeyngCDsoITsoJwuKVxuXHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI2ZsaWNrXG5cdFx0ICogQGV2ZW50XG5cdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQ8a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgdHJ1ZSB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oYFwibW91c2VcImAgb3IgYFwidG91Y2hcImApIG90aGVyd2lzZSBmYWxzZTxrbz7sgqzsmqnsnpAg7JWh7IWYKGBcIm1vdXNlXCJgIOuYkOuKlCBgXCJ0b3VjaFwiYCnsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IHBvcyBjdXJyZW50IGNvb3JkaW5hdGUgPGtvPu2YhOyerCDsooztkZwuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGhvbGRpbmcgV2hldGhlciB0aGUgdXNlciBpcyBpbnB1dGluZyB0aHJvdWdoIHRoZSBpbnB1dCBkZXZpY2UuIChXaGV0aGVyIGl0IGlzICdtb3VzZWRvd24nIGZvciBhIG1vdXNlIGRldmljZSBvciAndG91Y2htb3ZlJyBmb3IgYSB0b3VjaCBkZXZpY2UuKTxrbz7sgqzsmqnsnpDqsIAg7J6F66ClIOyepey5mOulvCDthrXtlbQg7J6F66Cl7KSR7J247KeAIOyXrOu2gC4gKOuniOyasOyKpCDsnqXsuZjrnbzrqbQgJ21vdXNlZG93bicg7Jes67aALCDthLDsuZgg7J6l7LmY652866m0ICd0b3VjaG1vdmUnIOyXrOu2gCk8L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXN0YW5jZSBEaXN0YW5jZSB2YWx1ZSBmcm9tIHRoZSB0b3VjaCBzdGFydGluZyBwb2ludC4gSWYgdGhlIGBkaXJlY3Rpb25gIHByb3BlcnR5IHZhbHVlIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0sIGl0IHJldHVybnMgYSBwb3NpdGl2ZSBudW1iZXIuIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0gcmV0dXJucyBhIG5lZ2F0aXZlIHZhbHVlLjxrbz7thLDsuZgg7Iuc7J6R7KCQ7Jy866Gc67aA7YSwIOydtOuPme2VnCDqsbDrpqwg6rCSLiBgZGlyZWN0aW9uYOyGjeyEseqwkuydtCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfeydtOuptCDslpHsiJjrpbwsIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV0597J2066m0IOydjOyImOulvCDrsJjtmZjtlZzri6QuPC9rbz5cblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmVcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3Jlc3RvcmVcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnRcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kXG5cdFx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3ByZXZcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0XHQgKiDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdFx0ICogYGBgamF2YXNjcmlwdFxuXHRcdFx0ICogLy8gV2hlbiBtb3ZpbmcgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLlxuXHRcdFx0ICogLy8g66qp7KCBIO2MqOuEkOuhnCDsnbTrj5ntlaAg65WMLlxuXHRcdFx0ICogYmVmb3JlRmxpY2tTdGFydCAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiBmbGlja0VuZCAob25jZSlcblx0XHRcdCAqXG5cdFx0XHQgKiAvLyBXaGVuIHRoZSByZXN0b3JlIG9wZXJhdGlvbi5cblx0XHRcdCAqIC8vIOuzteybkCDrj5nsnpHsnbwg65WMLlxuXHRcdFx0ICogYmVmb3JlUmVzdG9yZSAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiByZXN0b3JlIChvbmNlKVxuXHRcdFx0ICogYGBgXG5cdFx0ICovXG5cdFx0aWYgKGUuaW5wdXRFdmVudCkge1xuXHRcdFx0ZGlyZWN0aW9uID0gZS5pbnB1dEV2ZW50LmRpcmVjdGlvbjtcblxuXHRcdFx0Ly8gQWRqdXN0IGRpcmVjdGlvbiBpbiBjYXNlIG9mIGRpYWdvbmFsIHRvdWNoIG1vdmVcblx0XHRcdG1vdmVkUHggPSBlLmlucHV0RXZlbnRbdGhpcy5vcHRpb25zLmhvcml6b250YWwgPyBcImRlbHRhWFwiIDogXCJkZWx0YVlcIl07XG5cblx0XHRcdGlmICghfmNvbmYuZGlyRGF0YS5pbmRleE9mKGRpcmVjdGlvbikpIHtcblx0XHRcdFx0ZGlyZWN0aW9uID0gY29uZi5kaXJEYXRhWysoTWF0aC5hYnModG91Y2gubGFzdFBvcykgPD0gbW92ZWRQeCldO1xuXHRcdFx0fVxuXG5cdFx0XHR0b3VjaC5sYXN0UG9zID0gbW92ZWRQeDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG91Y2gubGFzdFBvcyA9IG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uZi5jdXN0b21FdmVudC5mbGljayAmJiAoZXZlbnRSZXMgPVxuXHRcdFx0dGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5mbGljaywge1xuXHRcdFx0XHRwb3MsXG5cdFx0XHRcdGhvbGRpbmc6IGUuaG9sZGluZyxcblx0XHRcdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb24gfHwgdG91Y2guZGlyZWN0aW9uLFxuXHRcdFx0XHRkaXN0YW5jZTogdG91Y2guaXNUcnVzdGVkID8gcG9zIC0gaG9sZFBvcyA6IG51bGxcblx0XHRcdH0pXG5cdFx0KTtcblxuXHRcdGlmIChldmVudFJlcyB8fCBldmVudFJlcyA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fc2V0VHJhbnNsYXRlKFstcG9zLCAwXSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGUuc3RvcCgpO1xuXHRcdFx0Ly8gcmVsZWFzZSwgYW5pbWF0aW9uRW5kXG5cdFx0XHR0b3VjaC5kaXN0YW5jZSA9IDA7XG5cdFx0XHR0b3VjaC5kaXJlY3Rpb24gPSBudWxsO1xuXHRcdFx0dG91Y2guZGVzdFBvcyA9IDA7XG5cdFx0XHR0b3VjaC5ob2xkaW5nID0gZmFsc2U7XG5cdFx0XHR0b3VjaC5pc1RydXN0ZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHRcdHRoaXMuX3NldFBvaW50ZXJFdmVudHMoKTtcblx0XHRcdHRoaXMuX3NldFBoYXNlVmFsdWUoXCJlbmRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqICdyZWxlYXNlJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfcmVsZWFzZUhhbmRsZXIoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblx0XHRjb25zdCBob2xkUG9zID0gdG91Y2guaG9sZFBvcztcblx0XHRjb25zdCBwYW5lbFNpemUgPSBjb25mLnBhbmVsLnNpemU7XG5cdFx0Y29uc3QgY3VzdG9tRXZlbnQgPSBjb25mLmN1c3RvbUV2ZW50O1xuXHRcdGNvbnN0IGlzUGx1c01vdmUgPSB0b3VjaC5ob2xkUG9zIDwgZS5kZXBhUG9zLmZsaWNrO1xuXG5cdFx0dG91Y2guZGlzdGFuY2UgPSBlLmRlcGFQb3MuZmxpY2sgLSBob2xkUG9zO1xuXHRcdHRvdWNoLmRpcmVjdGlvbiA9IGNvbmYuZGlyRGF0YVsrIShpc1BsdXNNb3ZlKV07XG5cdFx0dG91Y2guZGVzdFBvcyA9IGhvbGRQb3MgKyAoaXNQbHVzTW92ZSA/IHBhbmVsU2l6ZSA6IC1wYW5lbFNpemUpO1xuXG5cdFx0Y29uc3QgZGlzdGFuY2UgPSB0b3VjaC5kaXN0YW5jZTtcblx0XHRsZXQgZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb247XG5cdFx0bGV0IG1vdmVUbyA9IGhvbGRQb3M7XG5cblx0XHRpZiAodGhpcy5faXNNb3ZhYmxlKCkpIHtcblx0XHRcdCFjdXN0b21FdmVudC5yZXN0b3JlQ2FsbCAmJiAoY3VzdG9tRXZlbnQucmVzdG9yZSA9IGZhbHNlKTtcblx0XHRcdG1vdmVUbyA9IHRvdWNoLmRlc3RQb3M7XG5cdFx0fSBlbHNlIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPiAwKSB7XG5cdFx0XHR0aGlzLl90cmlnZ2VyQmVmb3JlUmVzdG9yZShlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZHVyYXRpb24gPSAwO1xuXHRcdH1cblxuXHRcdC8vIHRyaWdnZXIgYW5pbWF0aW9uXG5cdFx0ZS5zZXRUbyh7ZmxpY2s6IG1vdmVUb30sIGR1cmF0aW9uKTtcblxuXHRcdGRpc3RhbmNlID09PSAwICYmIHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHR0b3VjaC5ob2xkaW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zZXRQb2ludGVyRXZlbnRzKCk7ICAvLyBmb3IgXCJjbGlja1wiIGJ1Z1xuXHR9XG5cblx0LyoqXG5cdCAqICdhbmltYXRpb25TdGFydCcgZXZlbnQgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2FuaW1hdGlvblN0YXJ0SGFuZGxlcihlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IGN1c3RvbUV2ZW50ID0gY29uZi5jdXN0b21FdmVudDtcblx0XHRjb25zdCBpc0Zyb21JbnB1dCA9IGUuaW5wdXRFdmVudCB8fCBjb25mLnRvdWNoLmxhc3RQb3M7XG5cblx0XHQvLyB3aGVuIGFuaW1hdGlvbiB3YXMgc3RhcnRlZCBieSBpbnB1dCBhY3Rpb25cblx0XHRpZiAoIWN1c3RvbUV2ZW50LnJlc3RvcmVDYWxsICYmIGlzRnJvbUlucHV0ICYmXG5cdFx0XHR0aGlzLl9zZXRQaGFzZVZhbHVlKFwic3RhcnRcIiwge1xuXHRcdFx0XHRkZXBhUG9zOiBlLmRlcGFQb3MuZmxpY2ssXG5cdFx0XHRcdGRlc3RQb3M6IGUuZGVzdFBvcy5mbGlja1xuXHRcdFx0fSkgPT09IGZhbHNlKSB7XG5cdFx0XHRlLnN0b3AoKTtcblx0XHR9XG5cblx0XHRpZiAoaXNGcm9tSW5wdXQpIHtcblx0XHRcdGUuZHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZHVyYXRpb247XG5cblx0XHRcdGUuZGVzdFBvcy5mbGljayA9XG5cdFx0XHRcdHBhbmVsLnNpemUgKiAoXG5cdFx0XHRcdFx0cGFuZWwuaW5kZXggKyBjb25mLmluZGV4VG9Nb3ZlXG5cdFx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cGFuZWwuYW5pbWF0aW5nID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiAnYW5pbWF0aW9uRW5kJyBldmVudCBoYW5kbGVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYW5pbWF0aW9uRW5kSGFuZGxlcigpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblxuXHRcdGNvbmYucGFuZWwuYW5pbWF0aW5nID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zZXRQaGFzZVZhbHVlKFwiZW5kXCIpO1xuXHRcdHRoaXMuX3RyaWdnZXJSZXN0b3JlKCk7XG5cblx0XHQvLyByZXNldCBpc1RydXN0ZWRcblx0XHRjb25mLnRvdWNoLmlzVHJ1c3RlZCA9IGZhbHNlO1xuXHR9XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgTkFWRVIgQ29ycC5cbiAqIGVnanMgcHJvamVjdHMgYXJlIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZWdqcy9jb21wb25lbnRcIjtcbmltcG9ydCBBeGVzLCB7UGFuSW5wdXR9IGZyb20gXCJAZWdqcy9heGVzXCI7XG5pbXBvcnQge3V0aWxzLCBNaXhpbn0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7XG5cdEVWRU5UUyxcblx0VFJBTlNGT1JNLFxuXHRTVVBQT1JUX1dJTExDSEFOR0UsXG5cdElTX0FORFJPSUQyLFxuXHREQVRBX0hFSUdIVFxufSBmcm9tIFwiLi9jb25zdHNcIjtcbmltcG9ydCB7Q09ORklHLCBPUFRJT05TfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7ZG9jdW1lbnR9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBldmVudEhhbmRsZXIgZnJvbSBcIi4vZXZlbnRIYW5kbGVyXCI7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBlZy5GbGlja2luZyBjbGFzcy4gQ3JlYXRlIGEgZmxpY2tpbmcgVUkgdGhhdCBzd2VlcHMgYSBzaWRlLWJ5LXNpZGUgcGFuZWwgd2l0aCBtb3VzZSBtb3ZlIG9yIHRvdWNoIG1vdmUgaW5wdXQgYW5kIG1vdmVzIHRvIHRoZSBuZXh0IG9yIHByZXZpb3VzIHBhbmVsLlxuICogQGtvIGVnLkZsaWNraW5nIO2BtOuemOyKpOydmCDsnbjsiqTthLTsiqTrpbwg7IOd7ISx7ZWc64ukLiDrgpjrnoDtnogg67Cw7LmY7ZWcIO2MqOuEkOydhCDrp4jsmrDsiqQg7J2064+ZKG1vdmUpIO2YueydgCDthLDsuZgg7J2064+ZKG1vdmUpIOyeheugpeydhCDrsJvslYQg7JO47Ja0IOuEmOqyqCDri6TsnYwg7Yyo64SQ7J2064KYIOydtOyghCDtjKjrhJDroZwg7J2064+Z7ZWY64qUIFVJ66W8IOunjOuToOuLpC5cbiAqIEBhbGlhcyBlZy5GbGlja2luZ1xuICogQGV4dGVuZHMgZWcuQ29tcG9uZW50XG4gKiBAcmVxdWlyZXMge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXZlci9lZ2pzLWNvbXBvbmVudHxlZy5Db21wb25lbnR9XG4gKiBAcmVxdWlyZXMge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXZlci9lZ2pzLWF4ZXN8ZWcuQXhlc31cbiAqIEBzZWUgRWFzaW5nIEZ1bmN0aW9ucyBDaGVhdCBTaGVldCB7QGxpbmsgaHR0cDovL2Vhc2luZ3MubmV0L30gPGtvPuydtOynlSDtlajsiJggQ2hlYXQgU2hlZXQge0BsaW5rIGh0dHA6Ly9lYXNpbmdzLm5ldC99PC9rbz5cbiAqIEBzZWUgSWYgeW91IHdhbnQgdG8gdHJ5IGEgZGlmZmVyZW50IGVhc2luZyBmdW5jdGlvbiwgdXNlIHRoZSBqUXVlcnkgZWFzaW5nIHBsdWdpbiAoe0BsaW5rIGh0dHA6Ly9nc2dkLmNvLnVrL3NhbmRib3gvanF1ZXJ5L2Vhc2luZ30pIG9yIHRoZSBqUXVlcnkgVUkgZWFzaW5nIGxpYnJhcnkgKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KS4gPGtvPuuLpOuluCBlYXNpbmcg7ZWo7IiY66W8IOyCrOyaqe2VmOugpOuptCBqUXVlcnkgZWFzaW5nIO2UjOufrOq3uOyduCh7QGxpbmsgaHR0cDovL2dzZ2QuY28udWsvc2FuZGJveC9qcXVlcnkvZWFzaW5nfSnsnbTrgpgsIGpRdWVyeSBVSSBlYXNpbmcg65287J2067iM65+s66asKHtAbGluayBodHRwczovL2pxdWVyeXVpLmNvbS9lYXNpbmd9KeulvCDsgqzsmqntlZzri6Q8L2tvPlxuICogQHRocm93cyB7RXJyb3J9IEFuIEVycm9yIG9jY3VyIHdoZW4gZ2l2ZW4gYmFzZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb3IgaXQgaGFzbid0IHByb3BlciBET00gc3RydWN0dXJlIHRvIGJlIGluaXRpYWxpemVkLiA8a28+7KO87Ja07KeEIOq4sOuzuCDsmpTshozqsIAg7KG07J6s7ZWY7KeAIOyViuqxsOuCmCDstIjquLDtmZQg7ZWgIOyggeygiO2VnCBET00g6rWs7KGw6rCA7JeG64qUIOqyveyasCDsmKTrpZjqsIAg67Cc7IOd7ZWc64ukLjwva28+XG4gKiBAc3VwcG9ydCB7XCJpZVwiOiBcIjEwK1wiLCBcImNoXCIgOiBcImxhdGVzdFwiLCBcImZmXCIgOiBcImxhdGVzdFwiLCAgXCJzZlwiIDogXCJsYXRlc3RcIiAsIFwiZWRnZVwiIDogXCJsYXRlc3RcIiwgXCJpb3NcIiA6IFwiNytcIiwgXCJhblwiIDogXCIyLjMrIChleGNlcHQgMy54KVwifVxuICogQGV4YW1wbGVcbiAqIEEgY29tbW9uIGV4YW1wbGUuXG4gKiDsnbzrsJjsoIHsnbgg7JiILlxuICogYGBgaHRtbFxuICogPGRpdiBpZD1cImZsaWNrXCI+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cbiAqIFx0PGRpdj48cD5wYW5lbCAxPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gRXhhbXBsZXMgdG8gb21pdCBhbmQgb21pdCBvcHRpb25hbCBvcHRpb25zLlxuICogLy8g7IOd65616rCA64ql7ZWcIOyYteyFmOydgCDsg53rnrXtlZjqs6Ag7IOd7ISx7ZWY64qUIOyYiC5cbiAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKTtcbiAqXG4gKiAvLyBBbiBleGFtcGxlIG9mIHNwZWNpZnlpbmcgYW5kIGdlbmVyYXRpbmcgdmFsdWVzIGZvciBhbGwgb3B0aW9uYWwgcGFyYW1ldGVycy5cbiAqIC8vIOuqqOuToCDsmLXshZjsnZgg6rCS7J2EIOyngOygle2VmOqzoCDsg53shLHtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcbiAqIFx0aHdBY2NlbGVyYWJsZTogdHJ1ZSxcbiAqIFx0cHJlZml4OiBcImVnLWZsaWNrXCIsXG4gKiBcdGRlY2VsZXJhdGlvbjogMC4wMDA2LFxuICogXHRob3Jpem9udGFsOiB0cnVlLFxuICogXHRjaXJjdWxhcjogZmFsc2UsXG4gKiBcdHByZXZpZXdQYWRkaW5nOiBbMTAsIFwiMTUlXCJdLCAvLyBhbHNvIGFzIFwiMTBweFwiLCAxNSBvciBcIjE1JVwiIGNhbiBiZSBhcHBsaWVkLlxuICogXHRib3VuY2U6IFsxMCwgMTBdLFxuICogXHR0aHJlc2hvbGQ6IDQwLFxuICogXHRkdXJhdGlvbjogMTAwLFxuICogXHRwYW5lbEVmZmVjdDogeCA9PiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpLFxuICogXHRkZWZhdWx0SW5kZXg6IDAsXG4gKiBcdGlucHV0VHlwZTogW1widG91Y2hcIiwgXCJtb3VzZVwiXSxcbiAqIFx0dGhyZXNob2xkQW5nbGU6IDQ1LFxuICogXHRhZGFwdGl2ZUhlaWdodDogZmFsc2VcbiAqIH0pO1xuICogYGBgXG4gKiBAZXhhbXBsZVxuICogRXhhbXBsZSBvZiBjb25zdHJ1Y3RvciBlbGVtZW50IHBhcmFtZXRlciB2YWx1ZSBzcGVjaWZpY2F0aW9uLlxuICog7IOd7ISx7J6QIGVsZW1lbnQg7YyM652866+47YSwIOqwkiDsp4DsoJUg7JiILlxuICogYGBgamF2YXNjcmlwdFxuICogLy8gQW4gZXhhbXBsZSBvZiBhc3NpZ25pbmcgSFRNTEVsZW1lbnQgdG8gYW4gZWxlbWVudCBwYXJhbWV0ZXIuXG4gKiAvLyBlbGVtZW50IO2MjOudvOuvuO2EsOyXkCBIVE1MRWxlbWVudOulvCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxpY2tcIikpO1xuICpcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIGEgalF1ZXJ5IG9iamVjdCB0byBhbiBlbGVtZW50IHBhcmFtZXRlci5cbiAqIC8vIGVsZW1lbnQg7YyM652866+47YSw7JeQIGpRdWVyeeqwneyytOulvCDsp4DsoJXtlZjripQg7JiILlxuICogbmV3IGVnLkZsaWNraW5nKCQoXCIjZmxpY2tcIilbMF0pO1xuICpcbiAqIC8vIEFuIGV4YW1wbGUgb2YgYXNzaWduaW5nIGEgY3NzIHNlbGVjdG9yIHN0cmluZyB0byBhbiBlbGVtZW50IHBhcmFtZXRlci5cbiAqIC8vIGVsZW1lbnQg7YyM652866+47YSw7JeQIGNzcyDshKDtg53snpAg66y47J6Q7Je07J2EIOyngOygle2VmOuKlCDsmIguXG4gKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBQYW5lbCBlbGVtZW50IGRlZmluaXRpb24gbG9jYXRpb24gZXhhbXBsZS5cbiAqIO2MqOuEkCDsmpTshowg7KCV7J2YIOychOy5mCDsmIguXG4gKiBgYGBodG1sXG4gKiA8IS0tQW4gZXhhbXBsZSBvZiBkZWZpbmluZyBhIHBhbmVsIGVsZW1lbnQgYXMgYSBjaGlsZCBvZiBhIGJhc2UgZWxlbWVudC4tLT5cbiAqIDwhLS3tjKjrhJAg7JqU7IaM66W8IOq4sOykgCDsmpTshozsnZgg7J6Q7Iud7Jy866GcIOygleydmO2VnCDsmIguLS0+XG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj5cbiAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogXHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG4gKiBcdDxkaXY+PHA+cGFuZWwgMjwvcD48L2Rpdj5cbiAqIDwvZGl2PlxuICpcbiAqIDwhLS1BbiBleGFtcGxlIG9mIGRlZmluaW5nIGEgcGFuZWwgZWxlbWVudCBhcyBhIGNoaWxkIG9mIGEgY29udGFpbmVyIGVsZW1lbnQuLS0+XG4gKiA8IS0t7Yyo64SQIOyalOyGjOulvCDsu6jthYzsnbTrhIgg7JqU7IaM7J2YIOyekOyLneycvOuhnCDsoJXsnZjtlZwg7JiILi0tPlxuICogPGRpdiBpZD1cImZsaWNrMlwiPlxuICogXHQ8ZGl2IGNsYXNzPVwiZWctZmxpY2stY29udGFpbmVyXCI+XG4gKiBcdFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuICogXHRcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cbiAqIFx0XHQ8ZGl2PjxwPnBhbmVsIDI8L3A+PC9kaXY+XG4gKiBcdDxkaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogQGV4YW1wbGVcbiAqIEFuIGV4YW1wbGUgd2hlcmUgb25seSBvbmUgcGFuZWwgaXMgZGVmaW5lZCBhbmQgY3JlYXRlZCB3aXRoIGEgY2lyY3VsYXIuXG4gKiDtjKjrhJDsnYQg7ZWY64KY66eMIOygleydmO2VmOqzoCDsiJztmZjsnLzroZwg7IOd7ISx7ZWY64qUIOyYiC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgaWQ9XCJmbGlja1wiPlxuICogXHQ8ZGl2PjxwPnBhbmVsIDA8L3A+PC9kaXY+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogLy8gSWYgdGhlIG51bWJlciBvZiBkZWZpbmVkIHBhbmVscyBpcyBsZXNzIHRoYW4gdGhlIG1pbmltdW0gbnVtYmVyIHJlcXVpcmVkIGZvciB0aGUgY2lyY3VsYXRpb24gb3BlcmF0aW9uLCB0aGUgbmVjZXNzYXJ5IG51bWJlciBvZiBwYW5lbCBlbGVtZW50cyBhcmUgZ2VuZXJhdGVkLlxuICogLy8g7KCV7J2Y65CcIO2MqOuEkOydmCDsiJjqsIAg7Iic7ZmY64+Z7J6R7JeQIO2VhOyalO2VnCDstZzshowg6rCc7IiY67O064ukIOyggeycvOuptCDtlYTsmpTtlZwg7IiY66eM7YG87J2YIO2MqOuEkCDsmpTshozqsIAg7IOd7ISx65Cc64ukLlxuICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcbiAqIFx0Y2lyY3VsYXI6IHRydWVcbiAqIH0pXG4gKiBgYGBcbiAqIEBleGFtcGxlXG4gKiBGb3IgZXJyb3Igb2NjdXJyZW5jZSBleGFtcGxlLiBUaGVyZSBpcyBubyBwYW5lbCBlbGVtZW50LlxuICog7Jik66WYIOuwnOyDnSDsmIguIO2MqOuEkCDsmpTshozqsIAg7ZWY64KY64+EIOyXhuuKlCDqsr3smrAuXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGlkPVwiZmxpY2tcIj48L2Rpdj5cbiAqIGBgYFxuICogYGBgamF2YXNjcmlwdFxuICogdHJ5e1xuICogXHRuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG4gKiB9IGNhdGNoKGUpIHtcbiAqIFx0Ly8gQW4gZXJyb3Igb2NjdXJzIGJlY2F1c2UgdGhlcmUgYXJlIG5vIGNoaWxkIGVsZW1lbnRzIGluIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAqXHQvLyDquLDspIAg7JqU7IaM7JWI7JeQIOyekOyLnSDsmpTshozqsIAg7ZWY64KY64+EIOyXhuycvOuvgOuhnCDsl5Drn6zqsIAg67Cc7IOd7ZWc64ukLlxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsaWNraW5nIGV4dGVuZHMgTWl4aW4oQ29tcG9uZW50KS53aXRoKGV2ZW50SGFuZGxlcikge1xuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd9IGVsZW1lbnQgQSBiYXNlIGVsZW1lbnQgZm9yIHRoZSBlZy5GbGlja2luZyBtb2R1bGUuIFdoZW4gc3BlY2lmeWluZyBhIHZhbHVlIGFzIGEgYFN0cmluZ2AgdHlwZSwgeW91IG11c3Qgc3BlY2lmeSBhIGNzcyBzZWxlY3RvciBzdHJpbmcgdG8gc2VsZWN0IHRoZSBlbGVtZW50Ljxrbz5lZy5GbGlja2luZyDrqqjrk4jsnYQg7IKs7Jqp7ZWgIOq4sOykgCDsmpTshowuIGBTdHJpbmdg7YOA7J6F7Jy866GcIOqwkiDsp4DsoJXsi5wg7JqU7IaM66W8IOyEoO2Dne2VmOq4sCDsnITtlZwgY3NzIOyEoO2DneyekCDrrLjsnpDsl7TsnYQg7KeA7KCV7ZW07JW8IO2VnOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb24gb2JqZWN0IG9mIHRoZSBlZy5GbGlja2luZyBtb2R1bGU8a28+ZWcuRmxpY2tpbmcg66qo65OI7J2YIOyYteyFmCDqsJ3ssrQ8L2tvPlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmh3QWNjZWxlcmFibGU9dHJ1ZV0gRm9yY2UgaGFyZHdhcmUgY29tcG9zaXRpbmcuPGtvPu2VmOuTnOybqOyWtCDqsIDsho0g7IKs7JqpIOyXrOu2gC48L2tvPlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucHJlZml4PVwiZWctZmxpY2tcIl0gQSBwcmVmaXggZm9yIGNsYXNzIG5hbWVzIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+7Yyo64SQIOyalOyGjOydmCDtgbTrnpjsiqQg7J2066aEIOygkeuRkOyCrC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVjZWxlcmF0aW9uPTAuMDAwNl0gRGVjZWxlcmF0aW9uIG9mIHRoZSBhbmltYXRpb24gd2hlcmUgYWNjZWxlcmF0aW9uIGlzIG1hbnVhbGx5IGVuYWJsZWQgYnkgdXNlci4gQSBoaWdoZXIgdmFsdWUgaW5kaWNhdGVzIHNob3J0ZXIgcnVubmluZyB0aW1lLjxrbz7sgqzsmqnsnpDsnZgg64+Z7J6R7Jy866GcIOqwgOyGjeuPhOqwgCDsoIHsmqnrkJwg7JWg64uI66mU7J207IWY7J2YIOqwkOyGjeuPhC4g6rCS7J20IOuGkuydhOyImOuhnSDslaDri4jrqZTsnbTshZgg7Iuk7ZaJIOyLnOqwhOydtCDsp6fslYTsp4Tri6QuPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ob3Jpem9udGFsPXRydWVdIERpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuICh0cnVlOiBob3Jpem9udGFsLCBmYWxzZTogdmVydGljYWwpPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiAodHJ1ZSDqsIDroZzrsKntlqUsIGZhbHNlIOyEuOuhnOuwqe2WpSk8L2tvPlxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNpcmN1bGFyPWZhbHNlXSBXaGV0aGVyIHRvIGxldCB0aGUgZmlyc3QgcGFuZWwgZmxpY2sgcmlnaHQgdG8gdGhlIGVuZCBwYW5lbCAobGV0IHRoZSBsZWZ0IHBhbmVsIGZsaWNrIGZyb20gdGhlIGVuZCBwYW5lbCB0byBtb3ZlIHRvIHRoZSBmaXJzdCBwYW5lbCkuIChUaGUgdGVybSAnY2lyY3VsYXRpb24nKTxrbz7ssqsg7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7ZWY7JesIOuBnSDtjKjrhJDroZwg7J2064+Z7ZWY6rKMIO2VoOyngOyZgCDrgZ0g7Yyo64SQ7JeQ7IScIOyasCDslaHshZgg7J6F66Cl7ZWY7JesIOyyqyDtjKjrhJDroZwg7J2064+Z7ZWg7ZWY6rKMIO2VoOyngCDsl6zrtoAuICjthrXsua0gJ+yInO2ZmCcpPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfEFycmF5fSBbb3B0aW9ucy5wcmV2aWV3UGFkZGluZz1bMCwwXV0gVGhlIHByZXZpZXcgc2l6ZSB2YWx1ZShpZiBubyB1bml0IGlzIGdpdmVuLCBkZWZhdWx0cyB0byBgcHhgKSBmb3IgdGhlIHByZXZpb3VzIG9yIG5leHQgcGFuZWwuPGJyPi0gSWYgdGhlIGRpcmVjdGlvbiBpcyBzZXQgdG8gXCJob3Jpem9udGFsXCIsIHRoZSBwcmV2aWV3IHNlY3Rpb24gd2lsbCBiZSBkaXNwbGF5ZWQgb24gdGhlIGxlZnQgYW5kIHJpZ2h0IG9mIHRoZSBwYW5lbC48YnI+LSBJZiB0aGUgZGlyZWN0aW9uIGlzIHNldCB0byBcInZlcnRpY2FsXCIsIGl0IHdpbGwgYmUgZGlzcGxheWVkIG9uIHRoZSB0b3AgYW5kIGJvdHRvbSBvZiB0aGUgcGFuZWwuPGtvPuydtOyghCDtjKjrhJDqs7wg64uk7J2MIO2MqOuEkOydhCDrr7jrpqwg67O064qUIOyYgeyXreydmCDtgazquLAg6rCSKOuLqOychOqwgCDsp4DsoJXrkJjsp4Ag7JWK64qUIOqyveyasCwgYHB4YOuhnCDsp4DsoJUpLjxicj7tjKjrhJAg7J2064+ZIOuwqe2WpeydtCDqsIDroZwg67Cp7Zal7J2066m0IO2MqOuEkCDsoozsmrDsl5AsIOyEuOuhnCDrsKntlqXsnbTrqbQg7Yyo64SQIOyDge2VmOyXkCDrr7jrpqwg67O064qUIOyYgeyXreydtCDrgpjtg4Drgpzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ8QXJyYXl9IFtvcHRpb25zLmJvdW5jZT1bMTAsMTBdXSBUaGUgc2l6ZSB2YWx1ZSh1bml0OiBwaXhlbCkgb2YgdGhlIGJvdW5jZSBhcmVhLiBJZiBgY2lyY3VsYXI9ZmFsc2VgLCB0aGUgcGFuZWwgY2FuIGJlIG1vdmVkIGJ5IHRoaXMgdmFsdWUgd2hlbiBpbnB1dHRpbmcgYSByaWdodCBnZXN0dXJlIGluIHRoZSBmaXJzdCBwYW5lbCBvciBpbnB1dHRpbmcgYSBsZWZ0IGdlc3R1cmUgaW4gdGhlIGVuZCBwYW5lbC4gV2hlbiB0aGUgaW5wdXQgaXMgY29tcGxldGVkIHdoaWxlIG1vdmluZywgaXQgcmV0dXJucyB0byBpdHMgb3JpZ2luYWwgcG9zaXRpb24uPGtvPuuwlOyatOyKpCDsmIHsl63snZgg7YGs6riw6rCSKOuLqOychDog7ZS97IWAKS4gYGNpcmN1bGFyPWZhbHNlYOyduCDqsr3smrAsIOyyqyDtjKjrhJDsl5DshJwg7JqwIOyVoeyFmCDsnoXroKXsi5wsIOuBnSDtjKjrhJDsl5DshJwg7KKMIOyVoeyFmCDsnoXroKXsi5wg7J20IOqwkiDrp4ztgbzrp4wg7Yyo64SQ7J20IOydtOuPme2VoCDsiJgg7J6I6rOgIOydtOuPme2VnCDsg4Htg5zsl5DshJwg7J6F66Cl7J2EIOuniOy5mOuptCDsm5Drnpgg7J6Q66as66GcIOuPjOyVhOyYqOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGhyZXNob2xkPTQwXSBNb3ZlbWVudCB0aHJlc2hvbGQgdG8gZGVzdGluYXRpb24gcGFuZWwodW5pdDogcGl4ZWwpLiBBIHBhbmVsIGVsZW1lbnQgbXVzdCBiZSBkcmFnZ2VkIGJleW9uZCB0aGUgdGhyZXNob2xkIHRvIG1vdmUgdG8gdGhlIGRlc3RpbmF0aW9uIHBhbmVsLjxrbz7rqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmSDsnoTqs4TqsJIgKOuLqOychDog7ZS97IWAKS4g7Yyo64SQIOyalOyGjOulvCDsnoTqs4TqsJIg7J207IOB7Jy866GcIOuBjOyWtOuLpCDrhpPslYTslbzrp4zsnbQg66qp7KCBIO2MqOuEkOuhnCDsnbTrj5ntlZzri6QuPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmR1cmF0aW9uPTEwMF0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiAodW5pdDogbXMpPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQuKOuLqOychDogbXMpPC9rbz5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucGFuZWxFZmZlY3Q9eCA9PiAxIC0gTWF0aC5wb3coMSAtIHgsIDMpXSBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGEgcGFuZWwgbW92aW5nIGFuaW1hdGlvbi4gVGhlIGRlZmF1bHQgZnVuY3Rpb24gaXMgZWFzZU91dEN1YmljLjxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmOyXkCDsoIHsmqntlaAgYGVhc2luZ2DtlajsiJguIOq4sOuzuOqwkuydgCBgZWFzZU91dEN1YmljYOydtOuLpC48L2tvPlxuXHQgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuZGVmYXVsdEluZGV4PTBdIFRoZSBwYW5lbCBpbmRleCBudW1iZXIgdG8gc3BlY2lmeSB3aGVuIGluaXRpYWxpemluZyB0aGUgbW9kdWxlLiBBIHplcm8tYmFzZWQgaW50ZWdlci48a28+66qo65OIIOy0iOq4sO2ZlOyLnCDsp4DsoJXtlaAg7Yyo64SQIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC48L2tvPlxuXHQgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5pbnB1dFR5cGU9W1widG91Y2gsXCJtb3VzZVwiXV0gVHlwZXMgb2YgaW5wdXQgZGV2aWNlcy4gKHtAbGluayBodHRwczovL25hdmVyLmdpdGh1Yi5pby9lZ2pzLWF4ZXMvcmVsZWFzZS9sYXRlc3QvZG9jL2VnLkF4ZXMuUGFuSW5wdXQuaHRtbHxlZy5BeGVzLlBhbklucHV0IFJlZmVyZW5jZX0pPGJyPi0gXCJ0b3VjaFwiOiBBIHRvdWNoIGlucHV0IGRldmljZS48YnI+LSBcIm1vdXNlXCI6IEEgbW91c2UuPGtvPuyeheugpSDsnqXsuZgg7KKF66WYLiAoe0BsaW5rIGh0dHBzOi8vbmF2ZXIuZ2l0aHViLmlvL2VnanMtYXhlcy9yZWxlYXNlL2xhdGVzdC9kb2MvZWcuQXhlcy5QYW5JbnB1dC5odG1sfGVnLkF4ZXMuUGFuSW5wdXQg7LC46rOgfSk8YnI+LSBcInRvdWNoXCI6IO2EsOy5mCDsnoXroKUg7J6l7LmYLjxicj4tIFwibW91c2VcIjog66eI7Jqw7IqkLjwva28+XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGRBbmdsZT00NV0gVGhlIHRocmVzaG9sZCB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB1c2VyIGlucHV0IGlzIGhvcml6b250YWwgb3IgdmVydGljYWwuICgwIH4gOTApPGtvPuyCrOyaqeyekOydmCDsnoXroKXsnbQg6rCA66GcIOuwqe2WpeyduOyngCDshLjroZwg67Cp7Zal7J247KeAIO2MkOuLqO2VmOuKlCDquLDspIAg6rCB64+EICgwIH4gOTApPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGFwdGl2ZUhlaWdodD1mYWxzZV0gV2hldGhlciB0aGUgaGVpZ2h0IG9mIHRoZSBjb250YWluZXIgZWxlbWVudCByZWZsZWN0cyB0aGUgaGVpZ2h0IHZhbHVlIG9mIHRoZSBwYW5lbCBhZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlbWVudC48YnI+KE5vdGU6IG9uIEFuZHJvaWQgNC4xLnggc3RvY2sgYnJvd3NlciwgaGFzIHJlbmRlcmluZyBidWcgd2hpY2ggbm90IGNvcnJlY3RseSByZW5kZXIgaGVpZ2h0IHZhbHVlIG9uIHBhbmVsIHdpdGggc2luZ2xlIG5vZGUuIFRvIGF2b2lkIGp1c3QgYXBwZW5kIGFub3RoZXIgZW1wdHkgbm9kZSBhdCB0aGUgZW5kLik8a28+66qp7KCBIO2MqOuEkOuhnCDsnbTrj5ntlZwg7ZuEIOq3uCDtjKjrhJDsnZgg64aS7J206rCS7J2EIOy7qO2FjOydtOuEiCDsmpTshozsnZgg64aS7J206rCS7JeQIOuwmOyYge2VoOyngCDsl6zrtoAuPGJyPijssLjqs6A6IEFuZHJvaWQgNC4xLngg7Iqk7YahIOu4jOudvOyasOyggOyXkOyEnCDri6jsnbwg64W465Oc66GcIOq1rOyEseuQnCDtjKjrhJDsnZgg64aS7J206rCSIOuzgOqyveydtCDsoJzrjIDroZwg66CM642U66eBIOuQmOyngCDslYrripQg67KE6re46rCAIOyeiOydjC4g67mE7Ja07J6I64qUIOuFuOuTnOulvCDstpTqsIDtlZjrqbQg7ZW06rKw7J20IOqwgOuKpe2VmOuLpC4pPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnpJbmRleD0yMDAwXSB6LWluZGV4IHZhbHVlIGZvciBjb250YWluZXIgZWxlbWVudDxrbz7su6jthYzsnbTrhIgg7JqU7IaM7J2YIHotaW5kZXgg6rCSPC9rbz5cblx0ICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy51c2VUcmFuc2xhdGU9dHJ1ZV0gVXNlIGNzcyB0cmFuc2xhdGUgbWV0aG9kIG9uIHBhbmVsIG1vdmVzLiBXaGVuIHNldCB0byAnZmFsc2UnLCBpdCdsbCB1c2UgdG9wL2xlZnQgaW5zdGVhZC48a28+7Yyo64SQIOydtOuPmeyLnCBDU1MgdHJhbnNsYXRlIOyCrOyaqSDsl6zrtoAuICdmYWxzZSfroZwg7ISk7KCVIOyLnCwgdG9wL2xlZnQg7IaN7ISx7J2EIOyCrOyaqTwva28+XG5cdCovXG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMsIF9wcmVmaXgpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy4kd3JhcHBlciA9IHV0aWxzLiQoZWxlbWVudCk7XG5cdFx0dGhpcy5wbHVnaW5zID0gW107XG5cblx0XHRjb25zdCAkY2hpbGRyZW4gPSB0aGlzLiR3cmFwcGVyICYmIHRoaXMuJHdyYXBwZXIuY2hpbGRyZW47XG5cblx0XHRpZiAoIXRoaXMuJHdyYXBwZXIgfHwgISRjaGlsZHJlbiB8fCAhJGNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUgdmFsaWRhdGVMaW5lQnJlYWtzLCBtYXhpbXVtTGluZUxlbmd0aFxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiR2l2ZW4gYmFzZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb3IgaXQgaGFzbid0IHByb3BlciBET00gc3RydWN0dXJlIHRvIGJlIGluaXRpYWxpemVkLlwiKTtcblxuXHRcdFx0Ly8gZXNsaW50LWVuYWJsZSB2YWxpZGF0ZUxpbmVCcmVha3MsIG1heGltdW1MaW5lTGVuZ3RoXG5cdFx0fVxuXG5cdFx0dGhpcy5fc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLl9zZXRDb25maWcoJGNoaWxkcmVuLCBfcHJlZml4KTtcblxuXHRcdCF1dGlscy5oYXNDbGlja0J1ZygpICYmICh0aGlzLl9zZXRQb2ludGVyRXZlbnRzID0gKCkgPT4ge30pO1xuXG5cdFx0dGhpcy5fYnVpbGQoKTtcblx0XHR0aGlzLl9iaW5kRXZlbnRzKHRydWUpO1xuXG5cdFx0dGhpcy5fYXBwbHlQYW5lbHNDc3MoKTtcblx0XHR0aGlzLl9hcnJhbmdlUGFuZWxzKCk7XG5cblx0XHR0aGlzLm9wdGlvbnMuaHdBY2NlbGVyYWJsZSAmJiBTVVBQT1JUX1dJTExDSEFOR0UgJiYgdGhpcy5fc2V0SGludCgpO1xuXHRcdHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLl9zZXRBZGFwdGl2ZUhlaWdodCgpO1xuXG5cdFx0dGhpcy5fYWRqdXN0Q29udGFpbmVyQ3NzKFwiZW5kXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBvcHRpb25zIHZhbHVlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKi9cblx0X3NldE9wdGlvbnMob3B0aW9ucykge1xuXHRcdC8vIGRlZmF1bHQgdmFsdWUgb2YgcHJldmlld1BhZGRpbmcgYW5kIGJvdW5jZVxuXHRcdGNvbnN0IGFyclZhbCA9IHtcblx0XHRcdHByZXZpZXdQYWRkaW5nOiBbMCwgMF0sXG5cdFx0XHRib3VuY2U6IFsxMCwgMTBdXG5cdFx0fTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCh1dGlscy5leHRlbmQoe30sIE9QVElPTlMpLCBhcnJWYWwsIG9wdGlvbnMpO1xuXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gYXJyVmFsKSB7XG5cdFx0XHRsZXQgdmFsID0gdGhpcy5vcHRpb25zW2tleV07XG5cblx0XHRcdGlmICgvKG51bWJlcnxzdHJpbmcpLy50ZXN0KHR5cGVvZiB2YWwpKSB7XG5cdFx0XHRcdHZhbCA9IFt2YWwsIHZhbF07XG5cdFx0XHR9IGVsc2UgaWYgKCF1dGlscy5pc0FycmF5KHZhbCkpIHtcblx0XHRcdFx0dmFsID0gYXJyVmFsW2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMub3B0aW9uc1trZXldID0gdmFsO1xuXHRcdH1cblxuXHRcdC8vIGJsb2NrIHVzZSBvZiB0cmFuc2xhdGUgZm9yIEFuZHJvaWQyIGVudmlyb25tZW50XG5cdFx0aWYgKElTX0FORFJPSUQyKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMudXNlVHJhbnNsYXRlID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBjb25maWcgdmFsdWVzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259ICRjaGlsZHJlbiB3cmFwcGVycycgY2hpbGRyZW4gZWxlbWVudHNcblx0ICogQHBhcmFtIHtTdHJpbmd9IF9wcmVmaXggZXZlbnQgcHJlZml4XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0X3NldENvbmZpZygkY2hpbGRyZW4sIF9wcmVmaXgpIHtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHBhZGRpbmcgPSBvcHRpb25zLnByZXZpZXdQYWRkaW5nO1xuXHRcdGxldCAkbm9kZXMgPSAkY2hpbGRyZW47XG5cblx0XHRpZiAodXRpbHMuY2xhc3NMaXN0KCRub2Rlc1swXSwgYCR7b3B0aW9ucy5wcmVmaXh9LWNvbnRhaW5lcmApKSB7XG5cdFx0XHQkbm9kZXMgPSAkbm9kZXNbMF07XG5cdFx0XHR0aGlzLiRjb250YWluZXIgPSAkbm9kZXM7XG5cdFx0XHQkbm9kZXMgPSAkbm9kZXMuY2hpbGRyZW47XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0byBhcnJheVxuXHRcdCRub2RlcyA9IHV0aWxzLnRvQXJyYXkoJG5vZGVzKTtcblxuXHRcdC8vIGNvbmZpZyB2YWx1ZVxuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mID0gdXRpbHMuZXh0ZW5kKHV0aWxzLmV4dGVuZCh7fSwgQ09ORklHKSwge1xuXHRcdFx0cGFuZWw6IHtcblx0XHRcdFx0JGxpc3Q6ICRub2Rlcyxcblx0XHRcdFx0bWluQ291bnQ6IHBhZGRpbmdbMF0gKyBwYWRkaW5nWzFdID4gMCA/IDUgOiAzICAvLyBtaW5pbXVtIHBhbmVsIGNvdW50XG5cdFx0XHR9LFxuXHRcdFx0Ly8gcmVtZW1iZXIgb3JpZ2luYWwgY2xhc3MgYW5kIGlubGluZSBzdHlsZSBpbiBjYXNlIG9mIHJlc3RvcmF0aW9uIG9uIGRlc3Ryb3koKVxuXHRcdFx0b3JpZ1BhbmVsU3R5bGU6IHtcblx0XHRcdFx0d3JhcHBlcjoge1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogdGhpcy4kd3JhcHBlci5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBudWxsLFxuXHRcdFx0XHRcdHN0eWxlOiB0aGlzLiR3cmFwcGVyLmdldEF0dHJpYnV0ZShcInN0eWxlXCIpIHx8IG51bGxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAodGhpcy4kY29udGFpbmVyICYmIHRoaXMuJGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSkgfHwgbnVsbCxcblx0XHRcdFx0XHRzdHlsZTogKHRoaXMuJGNvbnRhaW5lciAmJiB0aGlzLiRjb250YWluZXIuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikpIHx8IG51bGxcblx0XHRcdFx0fSxcblx0XHRcdFx0bGlzdDogJG5vZGVzLm1hcCh2ID0+ICh7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiB2LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IG51bGwsXG5cdFx0XHRcdFx0c3R5bGU6IHYuZ2V0QXR0cmlidXRlKFwic3R5bGVcIikgfHwgbnVsbFxuXHRcdFx0XHR9KSlcblx0XHRcdH0sXG5cdFx0XHR1c2VMYXllckhhY2s6IG9wdGlvbnMuaHdBY2NlbGVyYWJsZSAmJiAhU1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRcdFx0ZXZlbnRQcmVmaXg6IF9wcmVmaXggfHwgXCJcIlxuXHRcdH0pO1xuXG5cdFx0W1tcIkxFRlRcIiwgXCJSSUdIVFwiXSwgW1wiVVBcIiwgXCJET1dOXCJdXVsrIW9wdGlvbnMuaG9yaXpvbnRhbF1cblx0XHRcdC5mb3JFYWNoKHYgPT4gY29uZi5kaXJEYXRhLnB1c2goQXhlc1tgRElSRUNUSU9OXyR7dn1gXSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGFuZCBzZXQgcGFuZWwgbm9kZXMgdG8gbWFrZSBmbGlja2luZyBzdHJ1Y3R1cmVcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9idWlsZCgpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCAkY2hpbGRyZW4gPSBwYW5lbC4kbGlzdDtcblx0XHRjb25zdCBwYWRkaW5nID0gb3B0aW9ucy5wcmV2aWV3UGFkZGluZy5jb25jYXQoKTtcblx0XHRjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeDtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGxldCBwYW5lbENvdW50ID0gcGFuZWwuY291bnQgPSBwYW5lbC5vcmlnQ291bnQgPSAkY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdGNvbnN0IGJvdW5jZSA9IG9wdGlvbnMuYm91bmNlO1xuXG5cdFx0dGhpcy5fc2V0UGFkZGluZyhwYWRkaW5nLCB0cnVlKTtcblxuXHRcdC8vIGNvbnRhaW5lciBlbGVtZW50IHN0eWxlXG5cdFx0Y29uc3QgY3NzVmFsdWUgPSB7XG5cdFx0XHRwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuXHRcdFx0ekluZGV4OiBvcHRpb25zLnpJbmRleCB8fCAyMDAwLFxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxuXHRcdFx0aGVpZ2h0OiBcIjEwMCVcIlxuXHRcdH07XG5cblx0XHRob3Jpem9udGFsICYmIChjc3NWYWx1ZS50b3AgPSBcIjBweFwiKTtcblxuXHRcdGlmICh0aGlzLiRjb250YWluZXIpIHtcblx0XHRcdHV0aWxzLmNzcyh0aGlzLiRjb250YWluZXIsIGNzc1ZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgJHBhcmVudCA9ICRjaGlsZHJlblswXS5wYXJlbnROb2RlO1xuXHRcdFx0Y29uc3QgJGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0XHRcdCRjb250YWluZXIuY2xhc3NOYW1lID0gYCR7cHJlZml4fS1jb250YWluZXJgO1xuXHRcdFx0dXRpbHMuY3NzKCRjb250YWluZXIsIGNzc1ZhbHVlKTtcblxuXHRcdFx0JGNoaWxkcmVuLmZvckVhY2godiA9PiAkY29udGFpbmVyLmFwcGVuZENoaWxkKHYpKTtcblxuXHRcdFx0JHBhcmVudC5hcHBlbmRDaGlsZCgkY29udGFpbmVyKTtcblx0XHRcdHRoaXMuJGNvbnRhaW5lciA9ICRjb250YWluZXI7XG5cdFx0fVxuXG5cdFx0Ly8gcGFuZWxzJyBjc3MgdmFsdWVzXG5cdFx0dGhpcy5faW5pdE9yaWdpbmFsUGFuZWxTdHlsZSgkY2hpbGRyZW4pO1xuXG5cdFx0aWYgKHRoaXMuX2FkZENsb25lUGFuZWxzKCkpIHtcblx0XHRcdHBhbmVsQ291bnQgPSBwYW5lbC5jb3VudCA9IChcblx0XHRcdFx0cGFuZWwuJGxpc3QgPSB1dGlscy50b0FycmF5KHRoaXMuJGNvbnRhaW5lci5jaGlsZHJlbilcblx0XHRcdCkubGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIGNyZWF0ZSBBeGVzIGluc3RhbmNlXG5cdFx0dGhpcy5fYXhlc0luc3QgPSBuZXcgQXhlcyh7XG5cdFx0XHRmbGljazoge1xuXHRcdFx0XHRyYW5nZTogWzAsIHBhbmVsLnNpemUgKiAocGFuZWxDb3VudCAtIDEpXSxcblx0XHRcdFx0Ym91bmNlXG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0ZWFzaW5nOiBvcHRpb25zLnBhbmVsRWZmZWN0LFxuXHRcdFx0ZGVjZWxlcmF0aW9uOiBvcHRpb25zLmRlY2VsZXJhdGlvbixcblx0XHRcdGludGVycnVwdGFibGU6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9zZXREZWZhdWx0UGFuZWwob3B0aW9ucy5kZWZhdWx0SW5kZXgpO1xuXHR9XG5cblx0X2luaXRPcmlnaW5hbFBhbmVsU3R5bGUocGFuZWxzKSB7XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLl9jb25mLnBhbmVsO1xuXHRcdGNvbnN0IHNpemVWYWx1ZSA9IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihbcGFuZWwuc2l6ZSwgXCIxMDAlXCJdKTtcblxuXHRcdHBhbmVscy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0dXRpbHMuY2xhc3NMaXN0KHYsIGAke3RoaXMub3B0aW9ucy5wcmVmaXh9LXBhbmVsYCwgdHJ1ZSk7XG5cblx0XHRcdHV0aWxzLmNzcyh2LCB7XG5cdFx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG5cdFx0XHRcdHdpZHRoOiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzBdKSxcblx0XHRcdFx0aGVpZ2h0OiB1dGlscy5nZXRVbml0VmFsdWUoc2l6ZVZhbHVlWzFdKSxcblx0XHRcdFx0Ym94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRsZWZ0OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgcHJldmlldyBwYWRkaW5nIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IHBhZGRpbmdcblx0ICogQHBhcmFtIHtCb29sZWFufSBidWlsZFxuXHQgKi9cblx0X3NldFBhZGRpbmcocGFkZGluZywgYnVpbGQpIHtcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYWRkaW5nU3VtID0gcGFkZGluZy5yZWR1Y2UoKGEsIGMpID0+IHBhcnNlRmxvYXQoYSkgKyBwYXJzZUZsb2F0KGMpKTtcblx0XHRjb25zdCBjc3NWYWx1ZSA9IHt9O1xuXG5cdFx0aWYgKHBhZGRpbmdTdW0gfHwgIWJ1aWxkKSB7XG5cdFx0XHRob3Jpem9udGFsICYmIHBhZGRpbmcucmV2ZXJzZSgpO1xuXG5cdFx0XHRjc3NWYWx1ZS5wYWRkaW5nID0gYCR7aG9yaXpvbnRhbCA/IFwiMCBcIiA6IFwiXCJ9JHtcblx0XHRcdFx0Ly8gYWRkICdweCcgdW5pdCBpZiBub3QgcHJlc2VudFxuXHRcdFx0XHRwYWRkaW5nLm1hcCh2ID0+IChpc05hTih2KSA/IHYgOiBgJHt2fXB4YCkpXG5cdFx0XHRcdFx0LmpvaW4oXCIgMCBcIilcblx0XHRcdH1gO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZCkge1xuXHRcdFx0Y3NzVmFsdWUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXHRcdFx0Y3NzVmFsdWUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmtleXMoY3NzVmFsdWUpLmxlbmd0aCAmJiB1dGlscy5jc3MoJHdyYXBwZXIsIGNzc1ZhbHVlKTtcblxuXHRcdGNvbnN0IHBhZGRpbmdUeXBlID0gaG9yaXpvbnRhbCA/IFtcIkxlZnRcIiwgXCJSaWdodFwiXSA6IFtcIlRvcFwiLCBcIkJvdHRvbVwiXTtcblx0XHRjb25zdCB3cmFwcGVyU2l6ZSA9IE1hdGgubWF4KFxuXHRcdFx0JHdyYXBwZXJbYG9mZnNldCR7aG9yaXpvbnRhbCA/IFwiV2lkdGhcIiA6IFwiSGVpZ2h0XCJ9YF0sXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGhvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiLCB0cnVlKVxuXHRcdCk7XG5cblx0XHRwYW5lbC5zaXplID0gd3JhcHBlclNpemUgLSAoXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVswXX1gLCB0cnVlKSArXG5cdFx0XHR1dGlscy5jc3MoJHdyYXBwZXIsIGBwYWRkaW5nJHtwYWRkaW5nVHlwZVsxXX1gLCB0cnVlKVxuXHRcdCk7XG5cdH1cblxuXHRfY2xvbmVQYW5lbCh2KSB7XG5cdFx0Y29uc3QgY2xvbmUgPSB2LmNsb25lTm9kZSh0cnVlKTtcblxuXHRcdHV0aWxzLmNsYXNzTGlzdChjbG9uZSwgYCR7dGhpcy5vcHRpb25zLnByZWZpeH0tY2xvbmVgKTtcblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvKipcblx0ICogVG8gZnVsZmlsbCBtaW5pbXVtIHBhbmVsIGNvdW50IGNsb25pbmcgb3JpZ2luYWwgbm9kZSB3aGVuIGNpcmN1bGFyIG9yIHByZXZpZXdQYWRkaW5nIG9wdGlvbiBhcmUgc2V0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgOiBhZGRlZCBjbG9uZSBub2RlLCBmYWxzZSA6IG5vdCBhZGRlZFxuXHQgKi9cblx0X2FkZENsb25lUGFuZWxzKCkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBwYW5lbENvdW50ID0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdGNvbnN0IGNsb25lQ291bnQgPSBwYW5lbC5taW5Db3VudCAtIHBhbmVsQ291bnQ7XG5cdFx0Y29uc3QgbGlzdCA9IHBhbmVsLiRsaXN0O1xuXHRcdGxldCBjbG9uZU5vZGVzO1xuXG5cdFx0Ly8gaWYgcGFuZWxzIGFyZSBnaXZlbiBsZXNzIHRoYW4gcmVxdWlyZWQgd2hlbiBjaXJjdWxhciBvcHRpb24gaXMgc2V0LCB0aGVuIGNsb25lIG5vZGUgdG8gYXBwbHkgY2lyY3VsYXIgbW9kZVxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIgJiYgcGFuZWxDb3VudCA8IHBhbmVsLm1pbkNvdW50KSB7XG5cdFx0XHRjbG9uZU5vZGVzID0gbGlzdC5tYXAodiA9PiB0aGlzLl9jbG9uZVBhbmVsKHYpKTtcblxuXHRcdFx0d2hpbGUgKGNsb25lTm9kZXMubGVuZ3RoIDwgY2xvbmVDb3VudCkge1xuXHRcdFx0XHRjbG9uZU5vZGVzID0gY2xvbmVOb2Rlcy5jb25jYXQoXG5cdFx0XHRcdFx0bGlzdC5tYXAodiA9PiB0aGlzLl9jbG9uZVBhbmVsKHYpKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjbG9uZU5vZGVzLmZvckVhY2godiA9PiB0aGlzLiRjb250YWluZXIuYXBwZW5kQ2hpbGQodikpO1xuXG5cdFx0XHRyZXR1cm4gISFjbG9uZU5vZGVzLmxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogTW92ZSBwYW5lbCdzIHBvc2l0aW9uIHdpdGhpbiBhcnJheVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY291bnQgZWxlbWVudCBjb3VudHMgdG8gbW92ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFwcGVuZCB3aGVyZSB0aGUgbGlzdCB0byBiZSBhcHBlbmRlZChtb3ZlZCkgKHRydWU6IHRvIHRoZSBlbmQsIGZhbHNlOiB0byB0aGUgYmVnaW5uaW5nKVxuXHQgKi9cblx0X21vdmVQYW5lbFBvc2l0aW9uKGNvdW50LCBhcHBlbmQpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgbGlzdCA9IHBhbmVsLiRsaXN0O1xuXHRcdGNvbnN0IGxpc3RUb01vdmUgPSBsaXN0LnNwbGljZShhcHBlbmQgPyAwIDogcGFuZWwuY291bnQgLSBjb3VudCwgY291bnQpO1xuXG5cdFx0cGFuZWwuJGxpc3QgPSBhcHBlbmQgP1xuXHRcdFx0bGlzdC5jb25jYXQobGlzdFRvTW92ZSkgOlxuXHRcdFx0bGlzdFRvTW92ZS5jb25jYXQobGlzdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGRlZmF1bHQgcGFuZWwgdG8gc2hvd1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcblx0ICovXG5cdF9zZXREZWZhdWx0UGFuZWwoaW5kZXgpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgbGFzdEluZGV4ID0gcGFuZWwuY291bnQgLSAxO1xuXHRcdGxldCBjb29yZHM7XG5cdFx0bGV0IGJhc2VJbmRleDtcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2lyY3VsYXIpIHtcblx0XHRcdC8vIGlmIGRlZmF1bHQgaW5kZXggaXMgZ2l2ZW4sIHRoZW4gbW92ZSBjb3JyZXNwb25kIHBhbmVsIHRvIHRoZSBmaXJzdCBwb3NpdGlvblxuXHRcdFx0aWYgKGluZGV4ID4gMCAmJiBpbmRleCA8PSBsYXN0SW5kZXgpIHtcblx0XHRcdFx0dGhpcy5fbW92ZVBhbmVsUG9zaXRpb24oaW5kZXgsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzZXQgZmlyc3QgcGFuZWwncyBwb3NpdGlvbiBhY2NvcmRpbmcgcGh5c2ljYWwgbm9kZSBsZW5ndGhcblx0XHRcdGJhc2VJbmRleCA9IHRoaXMuX2dldEJhc2VQb3NpdGlvbkluZGV4KCk7XG5cdFx0XHR0aGlzLl9tb3ZlUGFuZWxQb3NpdGlvbihiYXNlSW5kZXgsIGZhbHNlKTtcblxuXHRcdFx0dGhpcy5fc2V0UGFuZWxObyh7XG5cdFx0XHRcdG5vOiBpbmRleCxcblx0XHRcdFx0Y3Vyck5vOiBpbmRleFxuXHRcdFx0fSk7XG5cdFx0XHQvLyBpZiBkZWZhdWx0SW5kZXggb3B0aW9uIGlzIGdpdmVuLCB0aGVuIG1vdmUgdG8gdGhhdCBpbmRleCBwYW5lbFxuXHRcdH0gZWxzZSBpZiAoaW5kZXggPiAwICYmIGluZGV4IDw9IGxhc3RJbmRleCkge1xuXHRcdFx0dGhpcy5fc2V0UGFuZWxObyh7XG5cdFx0XHRcdGluZGV4LFxuXHRcdFx0XHRubzogaW5kZXgsXG5cdFx0XHRcdGN1cnJJbmRleDogaW5kZXgsXG5cdFx0XHRcdGN1cnJObzogaW5kZXhcblx0XHRcdH0pO1xuXG5cdFx0XHRjb29yZHMgPSBbLShwYW5lbC5zaXplICogaW5kZXgpLCAwXTtcblxuXHRcdFx0dGhpcy5fc2V0VHJhbnNsYXRlKGNvb3Jkcyk7XG5cdFx0XHR0aGlzLl9zZXRBeGVzKFwic2V0VG9cIiwgTWF0aC5hYnMoY29vcmRzWzBdKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFycmFuZ2UgcGFuZWxzJyBwb3NpdGlvblxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHNvcnQgTmVlZCB0byBzb3J0IHBhbmVsJ3MgcG9zaXRpb25cblx0ICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4VG9Nb3ZlIE51bWJlciB0byBtb3ZlIGZyb20gY3VycmVudCBwb3NpdGlvbiAobmVnYXRpdmU6IGxlZnQsIHBvc2l0aXZlOiByaWdodClcblx0ICovXG5cdF9hcnJhbmdlUGFuZWxzKHNvcnQsIGluZGV4VG9Nb3ZlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblx0XHRjb25zdCBkaXJEYXRhID0gY29uZi5kaXJEYXRhO1xuXHRcdGxldCBiYXNlSW5kZXg7XG5cblx0XHRpZiAodGhpcy5vcHRpb25zLmNpcmN1bGFyKSB7XG5cdFx0XHQvLyB3aGVuIGFycmFuZ2luZyBwYW5lbHMsIHNldCBmbGFnIHRvIG5vdCB0cmlnZ2VyIGZsaWNrIGN1c3RvbSBldmVudFxuXHRcdFx0Y29uZi5jdXN0b21FdmVudC5mbGljayA9IGZhbHNlO1xuXG5cdFx0XHQvLyBtb3ZlIGVsZW1lbnRzIGFjY29yZGluZyBkaXJlY3Rpb25cblx0XHRcdGlmIChzb3J0KSB7XG5cdFx0XHRcdGluZGV4VG9Nb3ZlICYmICh0b3VjaC5kaXJlY3Rpb24gPSBkaXJEYXRhWyshKGluZGV4VG9Nb3ZlID4gMCldKTtcblx0XHRcdFx0dGhpcy5fYXJyYW5nZVBhbmVsUG9zaXRpb24odG91Y2guZGlyZWN0aW9uLCBpbmRleFRvTW92ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBpbmRleCBmb3IgYmFzZSBlbGVtZW50J3MgcG9zaXRpb25cblx0XHRcdGJhc2VJbmRleCA9IHRoaXMuX2dldEJhc2VQb3NpdGlvbkluZGV4KCk7XG5cblx0XHRcdHRoaXMuX3NldFBhbmVsTm8oe1xuXHRcdFx0XHRpbmRleDogYmFzZUluZGV4LFxuXHRcdFx0XHRjdXJySW5kZXg6IGJhc2VJbmRleFxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIGFycmFuZ2UgQXhlcycgY29vcmQgcG9zaXRpb25cblx0XHRcdGNvbmYuY3VzdG9tRXZlbnQuZmxpY2sgPSAhIXRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBwYW5lbC5zaXplICogcGFuZWwuaW5kZXgsIDApO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FwcGx5UGFuZWxzUG9zKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGVhY2ggcGFuZWwncyBwb3NpdGlvbiBpbiBET01cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9hcHBseVBhbmVsc1BvcygpIHtcblx0XHR0aGlzLl9jb25mLnBhbmVsLiRsaXN0LmZvckVhY2godGhpcy5fYXBwbHlQYW5lbHNDc3MuYmluZCh0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IENTUyBzdHlsZSB2YWx1ZXMgdG8gbW92ZSBlbGVtZW50c1xuXHQgKlxuXHQgKiBJbml0aWFsaXplIHNldHRpbmcgdXAgY2hlY2tpbmcgaWYgYnJvd3NlciBzdXBwb3J0IHRyYW5zZm9ybSBjc3MgcHJvcGVydHkuXG5cdCAqIElmIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IHRyYW5zZm9ybSwgdGhlbiB1c2UgbGVmdC90b3AgcHJvcGVydGllcyBpbnN0ZWFkLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSAkZWxcblx0ICogQHBhcmFtIHtBcnJheX0gY29vcmRzVmFsdWVcblx0ICovXG5cdF9zZXRNb3ZlU3R5bGUoJGVsLCBjb29yZHNWYWx1ZSkge1xuXHRcdGNvbnN0IHRyYW5zZm9ybSA9IFRSQU5TRk9STTtcblx0XHRjb25zdCB1c2VMYXllckhhY2sgPSB0aGlzLl9jb25mLnVzZUxheWVySGFjaztcblxuXHRcdHRoaXMuX3NldE1vdmVTdHlsZSA9IHRyYW5zZm9ybS5zdXBwb3J0ID9cblx0XHRcdCgkZWxlbWVudCwgY29vcmRzKSA9PiB7XG5cdFx0XHRcdHV0aWxzLmNzcygkZWxlbWVudCwge1xuXHRcdFx0XHRcdFt0cmFuc2Zvcm0ubmFtZV06IHV0aWxzLnRyYW5zbGF0ZShjb29yZHNbMF0sIGNvb3Jkc1sxXSwgdXNlTGF5ZXJIYWNrKVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gOiAoJGVsZW1lbnQsIGNvb3JkcykgPT4ge1xuXHRcdFx0XHR1dGlscy5jc3MoJGVsZW1lbnQsIHtsZWZ0OiBjb29yZHNbMF0sIHRvcDogY29vcmRzWzFdfSk7XG5cdFx0XHR9O1xuXG5cdFx0dGhpcy5fc2V0TW92ZVN0eWxlKCRlbCwgY29vcmRzVmFsdWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciBhcHBseWluZyBDU1MgdmFsdWVzIHRvIGVhY2ggcGFuZWxzXG5cdCAqIE5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHVzZSwgdG8gc2V0IHVwIGZvciBBbmRyb2lkIDIueCBicm93c2VycyBvciBvdGhlcnMuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfYXBwbHlQYW5lbHNDc3MoKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgZHVtbXlBbmNob3JDbGFzc05hbWUgPSBcIl9fZHVtbXlfYW5jaG9yXCI7XG5cdFx0Y29uc3QgdXNlVHJhbnNsYXRlID0gdGhpcy5vcHRpb25zLnVzZVRyYW5zbGF0ZTtcblxuXHRcdGlmICghdXNlVHJhbnNsYXRlKSB7XG5cdFx0XHRpZiAoSVNfQU5EUk9JRDIpIHtcblx0XHRcdFx0Y29uZi4kZHVtbXlBbmNob3IgPSB1dGlscy4kKGAuJHtkdW1teUFuY2hvckNsYXNzTmFtZX1gKTtcblxuXHRcdFx0XHQhY29uZi4kZHVtbXlBbmNob3IgJiYgdGhpcy4kd3JhcHBlci5hcHBlbmRDaGlsZChcblx0XHRcdFx0XHRjb25mLiRkdW1teUFuY2hvciA9IHV0aWxzLiQoYDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cIiR7ZHVtbXlBbmNob3JDbGFzc05hbWV9XCIgc3R5bGU9XCJwb3NpdGlvbjphYnNvbHV0ZTtoZWlnaHQ6MHB4O3dpZHRoOjBweFwiPmApXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2FwcGx5UGFuZWxzQ3NzID0gZnVuY3Rpb24odiwgaSkge1xuXHRcdFx0XHRjb25zdCBjb29yZHMgPSB0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oXG5cdFx0XHRcdFx0W2Ake3RoaXMuX2NvbmYucGFuZWwuc2l6ZSAqIGl9cHhgLCAwXVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdHV0aWxzLmNzcyh2LCB7XG5cdFx0XHRcdFx0bGVmdDogY29vcmRzWzBdLFxuXHRcdFx0XHRcdHRvcDogY29vcmRzWzFdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fYXBwbHlQYW5lbHNDc3MgPSBmdW5jdGlvbih2LCBpKSB7XG5cdFx0XHRcdGNvbnN0IGNvb3JkcyA9IHRoaXMuX2dldERhdGFCeURpcmVjdGlvbihbXG5cdFx0XHRcdFx0VFJBTlNGT1JNLnN1cHBvcnQgP1xuXHRcdFx0XHRcdFx0YCR7MTAwICogaX0lYCA6XG5cdFx0XHRcdFx0XHRgJHt0aGlzLl9jb25mLnBhbmVsLnNpemUgKiBpfXB4YCwgMFxuXHRcdFx0XHRdKTtcblxuXHRcdFx0XHR0aGlzLl9zZXRNb3ZlU3R5bGUodiwgY29vcmRzKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEFkanVzdCBjb250YWluZXIncyBjc3MgdmFsdWUgdG8gaGFuZGxlIEFuZHJvaWQgMi54IGxpbmsgaGlnaGxpZ2h0aW5nIGJ1Z1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gcGhhc2Vcblx0ICogICAgc3RhcnQgLSBzZXQgbGVmdC90b3AgdmFsdWUgdG8gMFxuXHQgKiAgICBlbmQgLSBzZXQgdHJhbnNsYXRlIHZhbHVlIHRvIDBcblx0ICogQHBhcmFtIHtBcnJheX0gdG9WYWx1ZSBjb29yZGluYXRlIHZhbHVlXG5cdCAqL1xuXHRfYWRqdXN0Q29udGFpbmVyQ3NzKHBoYXNlLCB0b1ZhbHVlKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3QgcGFuZWwgPSBjb25mLnBhbmVsO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgdXNlVHJhbnNsYXRlID0gb3B0aW9ucy51c2VUcmFuc2xhdGU7XG5cdFx0Y29uc3QgaG9yaXpvbnRhbCA9IG9wdGlvbnMuaG9yaXpvbnRhbDtcblx0XHRjb25zdCBwYWRkaW5nVG9wID0gb3B0aW9ucy5wcmV2aWV3UGFkZGluZ1swXTtcblx0XHRsZXQgY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyO1xuXHRcdGxldCB0byA9IHRvVmFsdWU7XG5cdFx0bGV0IHZhbHVlO1xuXG5cdFx0aWYgKCF1c2VUcmFuc2xhdGUpIHtcblx0XHRcdGlmICghdG8pIHtcblx0XHRcdFx0dG8gPSAtcGFuZWwuc2l6ZSAqIHBhbmVsLmluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocGhhc2UgPT09IFwic3RhcnRcIikge1xuXHRcdFx0XHRjb250YWluZXIgPSBjb250YWluZXIuc3R5bGU7XG5cdFx0XHRcdHZhbHVlID0gcGFyc2VGbG9hdChjb250YWluZXJbaG9yaXpvbnRhbCA/IFwibGVmdFwiIDogXCJ0b3BcIl0pO1xuXG5cdFx0XHRcdGlmIChob3Jpem9udGFsKSB7XG5cdFx0XHRcdFx0dmFsdWUgJiYgKGNvbnRhaW5lci5sZWZ0ID0gXCIwcHhcIik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgIT09IHBhZGRpbmdUb3AgJiYgKGNvbnRhaW5lci50b3AgPSBcIjBweFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX3NldFRyYW5zbGF0ZShbLXRvLCAwXSk7XG5cdFx0XHR9IGVsc2UgaWYgKHBoYXNlID09PSBcImVuZFwiKSB7XG5cdFx0XHRcdHRvID0gdGhpcy5fZ2V0Q29vcmRzVmFsdWUoW3RvLCAwXSk7XG5cblx0XHRcdFx0dXRpbHMuY3NzKGNvbnRhaW5lciwge1xuXHRcdFx0XHRcdGxlZnQ6IHRvLngsXG5cdFx0XHRcdFx0dG9wOiB0by55LFxuXHRcdFx0XHRcdFtUUkFOU0ZPUk0ubmFtZV06IHV0aWxzLnRyYW5zbGF0ZSgwLCAwLCBjb25mLnVzZUxheWVySGFjaylcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y29uZi4kZHVtbXlBbmNob3IgJiYgY29uZi4kZHVtbXlBbmNob3IuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IEF4ZXMgY29vcmQgdmFsdWVcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuXHQgKiBAcGFyYW0ge051bWJlcn0gZmxpY2sgZGVzdGluYXRpb24gdmFsdWVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG5cdCAqIEByZXR1cm4ge2VnLkF4ZXN9IEF4ZXMgaW5zdGFuY2Vcblx0ICovXG5cdF9zZXRBeGVzKG1ldGhvZCwgZmxpY2ssIGR1cmF0aW9uKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2F4ZXNJbnN0W21ldGhvZF0oe2ZsaWNrfSwgZHVyYXRpb24pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBoaW50IGZvciBicm93c2VyIHRvIGRlY2lkZSBlZmZpY2llbnQgd2F5IG9mIGRvaW5nIHRyYW5zZm9ybSBjaGFuZ2VzKG9yIGFuaW1hdGlvbilcblx0ICogaHR0cHM6Ly9kZXYub3BlcmEuY29tL2FydGljbGVzL2Nzcy13aWxsLWNoYW5nZS1wcm9wZXJ0eS9cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9zZXRIaW50KCkge1xuXHRcdGNvbnN0IHN0eWxlID0ge3dpbGxDaGFuZ2U6IFwidHJhbnNmb3JtXCJ9O1xuXG5cdFx0dXRpbHMuY3NzKHRoaXMuJGNvbnRhaW5lciwgc3R5bGUpO1xuXHRcdHV0aWxzLmNzcyh0aGlzLl9jb25mLnBhbmVsLiRsaXN0LCBzdHlsZSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGRhdGEgYWNjb3JkaW5nIG9wdGlvbnMuaG9yaXpvbnRhbCB2YWx1ZVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSB2YWx1ZSBwcmltYXJ5IGRhdGEgdG8gaGFuZGxlXG5cdCAqIEByZXR1cm4ge0FycmF5fVxuXHQgKi9cblx0X2dldERhdGFCeURpcmVjdGlvbih2YWx1ZSkge1xuXHRcdGNvbnN0IGRhdGEgPSB2YWx1ZS5jb25jYXQoKTtcblxuXHRcdCF0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCAmJiBkYXRhLnJldmVyc2UoKTtcblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIG5vZGVzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlyZWN0aW9uXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFRvTW92ZVxuXHQgKi9cblx0X2FycmFuZ2VQYW5lbFBvc2l0aW9uKGRpcmVjdGlvbiwgaW5kZXhUb01vdmUpIHtcblx0XHRjb25zdCBuZXh0ID0gZGlyZWN0aW9uID09PSB0aGlzLl9jb25mLmRpckRhdGFbMF07XG5cblx0XHR0aGlzLl9tb3ZlUGFuZWxQb3NpdGlvbihNYXRoLmFicyhpbmRleFRvTW92ZSB8fCAxKSwgbmV4dCk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBiYXNlIHBvc2l0aW9uIGluZGV4IG9mIHRoZSBwYW5lbFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2dldEJhc2VQb3NpdGlvbkluZGV4KCkge1xuXHRcdHJldHVybiBNYXRoLmZsb29yKHRoaXMuX2NvbmYucGFuZWwuY291bnQgLyAyIC0gMC4xKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaW5kIGV2ZW50c1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IGJpbmRcblx0ICovXG5cdF9iaW5kRXZlbnRzKGJpbmQpIHtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0ICR3cmFwcGVyID0gdGhpcy4kd3JhcHBlcjtcblx0XHRjb25zdCBheGVzSW5zdCA9IHRoaXMuX2F4ZXNJbnN0O1xuXG5cdFx0aWYgKGJpbmQpIHtcblx0XHRcdHRoaXMuX3BhbklucHV0ID0gbmV3IFBhbklucHV0KCR3cmFwcGVyLCB7XG5cdFx0XHRcdGlucHV0VHlwZTogb3B0aW9ucy5pbnB1dFR5cGUsXG5cdFx0XHRcdHRocmVzaG9sZEFuZ2xlOiBvcHRpb25zLnRocmVzaG9sZEFuZ2xlLFxuXHRcdFx0XHRzY2FsZTogdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKFstMSwgMF0pXG5cdFx0XHR9KTtcblxuXHRcdFx0YXhlc0luc3Qub24oe1xuXHRcdFx0XHRob2xkOiB0aGlzLl9ob2xkSGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRjaGFuZ2U6IHRoaXMuX2NoYW5nZUhhbmRsZXIuYmluZCh0aGlzKSxcblx0XHRcdFx0cmVsZWFzZTogdGhpcy5fcmVsZWFzZUhhbmRsZXIuYmluZCh0aGlzKSxcblx0XHRcdFx0YW5pbWF0aW9uU3RhcnQ6IHRoaXMuX2FuaW1hdGlvblN0YXJ0SGFuZGxlci5iaW5kKHRoaXMpLFxuXHRcdFx0XHRhbmltYXRpb25FbmQ6IHRoaXMuX2FuaW1hdGlvbkVuZEhhbmRsZXIuYmluZCh0aGlzKVxuXHRcdFx0fSkuY29ubmVjdCh0aGlzLl9nZXREYXRhQnlEaXJlY3Rpb24oW1wiZmxpY2tcIiwgXCJcIl0pLCB0aGlzLl9wYW5JbnB1dCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZGlzYWJsZUlucHV0KCk7XG5cdFx0XHRheGVzSW5zdC5vZmYoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGNvbnRhaW5lcidzIGhlaWdodCB2YWx1ZSBhY2NvcmRpbmcgdG8gY2hpbGRyZW4ncyBoZWlnaHRcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpcmVjdGlvblxuXHQgKi9cblx0X3NldEFkYXB0aXZlSGVpZ2h0KGRpcmVjdGlvbikge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IGluZGV4VG9Nb3ZlID0gY29uZi5pbmRleFRvTW92ZTtcblx0XHRsZXQgJGNoaWxkcmVuO1xuXHRcdGxldCBoZWlnaHQ7XG5cblx0XHRjb25zdCAkcGFuZWwgPSBpbmRleFRvTW92ZSA9PT0gMCA/XG5cblx0XHRcdC8vIHBhbmVsIG1vdmVkIGJ5IDFcblx0XHRcdHRoaXNbYGdldCR7XG5cdFx0XHRcdChkaXJlY3Rpb24gPT09IEF4ZXMuRElSRUNUSU9OX0xFRlQgJiYgXCJOZXh0XCIpIHx8XG5cdFx0XHRcdChkaXJlY3Rpb24gPT09IEF4ZXMuRElSRUNUSU9OX1JJR0hUICYmIFwiUHJldlwiKSB8fCBcIlwiXG5cdFx0XHR9RWxlbWVudGBdKCkgOlxuXG5cdFx0XHQvLyBwYW5lbCBtb3ZlZCBieSAubW92ZVRvKClcblx0XHRcdGNvbmYucGFuZWwuJGxpc3RbXG5cdFx0XHRcdGNvbmYucGFuZWwuY3VyckluZGV4ICsgaW5kZXhUb01vdmVcblx0XHRcdF07XG5cblx0XHRjb25zdCAkZmlyc3QgPSAkcGFuZWwucXVlcnlTZWxlY3RvcihcIjpmaXJzdC1jaGlsZFwiKTtcblxuXHRcdGlmICgkZmlyc3QpIHtcblx0XHRcdGhlaWdodCA9ICRmaXJzdC5nZXRBdHRyaWJ1dGUoREFUQV9IRUlHSFQpO1xuXG5cdFx0XHRpZiAoIWhlaWdodCkge1xuXHRcdFx0XHQkY2hpbGRyZW4gPSAkcGFuZWwuY2hpbGRyZW47XG5cblx0XHRcdFx0aGVpZ2h0ID0gdXRpbHMub3V0ZXJIZWlnaHQoXG5cdFx0XHRcdFx0JGNoaWxkcmVuLmxlbmd0aCA+IDEgPyAoJHBhbmVsLnN0eWxlLmhlaWdodCA9IFwiYXV0b1wiLCAkcGFuZWwpIDogJGZpcnN0XG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0aGVpZ2h0ID4gMCAmJiAkZmlyc3Quc2V0QXR0cmlidXRlKERBVEFfSEVJR0hULCBoZWlnaHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRoZWlnaHQgPiAwICYmICh0aGlzLiR3cmFwcGVyLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGApO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIGJlZm9yZVJlc3RvcmUgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtPYmplY3R9IGUgZXZlbnQgb2JqZWN0XG5cdCAqL1xuXHRfdHJpZ2dlckJlZm9yZVJlc3RvcmUoZSkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHRvdWNoID0gY29uZi50b3VjaDtcblxuXHRcdC8vIHJldmVyc2UgZGlyZWN0aW9uIHZhbHVlIHdoZW4gcmVzdG9yZVxuXHRcdHRvdWNoLmRpcmVjdGlvbiA9ICtjb25mLmRpckRhdGEuam9pbihcIlwiKS5yZXBsYWNlKHRvdWNoLmRpcmVjdGlvbiwgXCJcIik7XG5cblx0XHQvKipcblx0XHQgKiBUaGlzIGV2ZW50IG9jY3VycyBiZWZvcmUgdGhlIGN1cnJlbnQgcGFuZWwgc3RhcnRzIHRvIHJldHVybiB0byBpdHMgb3JpZ2luYWwgcG9zaXRpb24uIEZvbGxvd2VzIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9IGFuZCBbcmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZX0gZXZlbnRzLiBUaGUgY29uZGl0aW9ucyBvZiBvY2N1cnJlbmNlIGFyZSBhcyBmb2xsb3dzLjxicj48YnI+MS4gVGhlIHVzZXIgaGFzIGZpbmlzaGVkIGlucHV0IGJ1dCBkb2VzIG5vdCBleGNlZWQgdGhlIHBhbmVsIG1vdmVtZW50IHRocmVzaG9sZC48YnI+Mi4gQ2FsbCB0aGUgW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0gbWV0aG9kLiAoUHJldmVudCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50Lilcblx0XHQgKiBAa28g7ZiE7J6sIO2MqOuEkOydtCDsm5Drnpgg7JyE7LmY66GcIOuQmOuPjOyVhOqwgOq4sCDsi5zsnpHsoITsl5Ag67Cc7IOd7ZWY64qUIOydtOuypO2KuOydtOuLpC4g65Kk7J207Ja0IFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t96rO8IFtyZXN0b3JlXXtAbGluayBlZy5GbGlja2luZyNldmVudDpyZXN0b3JlfeydtOuypO2KuOqwgCDrsJzsg53tlZzri6QuIOuwnOyDneyhsOqxtOydgCDslYTrnpjsmYAg6rCZ64ukLjxicj48YnI+MS4g7IKs7Jqp7J6QIOyeheugpeydtCDrgZ3rgqzripTrjbAg7Yyo64SQIOydtOuPmSDsnoTqs4TsoJDsnYQg64SY7KeAIOyViuydgCDqsr3smrAuPGJyPjIuIFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IOuplOyEnOuTnCDtmLjstpwuKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSDsnbTrsqTtirjsnZgg6riw67O464+Z7J6RIOuwqeyngCDsoITsoJwpXG5cdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjYmVmb3JlUmVzdG9yZVxuXHRcdCAqIEBldmVudFxuXHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVHJ1c3RlZCBgdHJ1ZWAgd2hlbiB0aGUgZXZlbnQgd2FzIGdlbmVyYXRlZCBieSBhIHVzZXIgYWN0aW9uKFwibW91c2VcIiBvciBcInRvdWNoXCIpIG90aGVyd2lzZSBgZmFsc2VgLjxrbz7sgqzsmqnsnpAg7JWh7IWYKFwibW91c2VcIiDrmJDripQgXCJ0b3VjaFwiKeyXkCDsnZjtlbQg7J2067Kk7Yq46rCAIOyDneyEseuQnCDqsr3smrAgYHRydWVgLiDqt7gg7Jm464qUIGBmYWxzZWAuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRpcmVjdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljxrbz7tjKjrhJAg7J2064+ZIOuwqe2WpS4gYGhvcml6b250YWw9dHJ1ZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fTEVGVH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBgaG9yaXpvbnRhbD1mYWxzZWAg7J2066m0IHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0RPV059Ljwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlcGFQb3MgU3RhcnRpbmcgY29vcmRpbmF0ZS4gPGtvPuy2nOuwnOygkCDsooztkZwuPC9rbz5cblx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGVzdFBvcyBEZXN0aW5hdGlvbiBjb29yZGluYXRlLiA8a28+64+E7LCp7KCQIOyijO2RnC48L2tvPlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmVcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3Jlc3RvcmVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIFRoZSBvcmRlciBvZiBldmVudCBvY2N1cnJlbmNlLlxuXHRcdCAqIC8vIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0ICogYmVmb3JlUmVzdG9yZSAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiByZXN0b3JlIChvbmNlKVxuXHRcdCAqL1xuXHRcdGNvbmYuY3VzdG9tRXZlbnQucmVzdG9yZSA9IHRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMuYmVmb3JlUmVzdG9yZSwge1xuXHRcdFx0ZGVwYVBvczogZS5kZXBhUG9zLmZsaWNrLFxuXHRcdFx0ZGVzdFBvczogZS5kZXN0UG9zLmZsaWNrXG5cdFx0fSk7XG5cblx0XHRpZiAoIWNvbmYuY3VzdG9tRXZlbnQucmVzdG9yZSkge1xuXHRcdFx0XCJzdG9wXCIgaW4gZSAmJiBlLnN0b3AoKTtcblx0XHRcdGNvbmYucGFuZWwuYW5pbWF0aW5nID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRyaWdnZXIgcmVzdG9yZSBldmVudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3RyaWdnZXJSZXN0b3JlKCkge1xuXHRcdGNvbnN0IGN1c3RvbUV2ZW50ID0gdGhpcy5fY29uZi5jdXN0b21FdmVudDtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBldmVudCB0aGF0IG9jY3VycyBhZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlIGJ5IFtyZXN0b3JlKClde0BsaW5rIGVnLkZsaWNraW5nI3Jlc3RvcmV9IG1ldGhvZC5cblx0XHQgKiBAa28gW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0g66mU7ISc65Oc7JeQIOydmO2VtCDtjKjrhJDsnbQg7JuQ656YIOychOy5mOuhnCDsnbTrj5nsnYQg7JmE66OM7ZWcIOuLpOydjCDrsJzsg53tlZjripQg7J2067Kk7Yq4LlxuXHRcdCAqIEBuYW1lIGVnLkZsaWNraW5nI3Jlc3RvcmVcblx0XHQgKiBAZXZlbnRcblx0XHQgKiBAcHJvcGVydHkge1N0cmluZ30gZXZlbnRUeXBlIFRoZSBuYW1lIG9mIHRoZSBldmVudCA8a28+7J2067Kk7Yq4IOuqhTwva28+XG5cdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgYHRydWVgIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihcIm1vdXNlXCIgb3IgXCJ0b3VjaFwiKSBvdGhlcndpc2UgYGZhbHNlYC48a28+7IKs7Jqp7J6QIOyVoeyFmChcIm1vdXNlXCIg65iQ64qUIFwidG91Y2hcIinsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgLjwva28+XG5cdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IG5vIEluZGV4IG51bWJlciBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LiBTZWUgdGhlIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gbWV0aG9kLjxrbz7tmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiBbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC48L2tvPlxuXHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXJlY3Rpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50LiBJZiBgaG9yaXpvbnRhbD10cnVlYCBpcyB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fUklHSFR9LiBJZiBgaG9yaXpvbnRhbD1mYWxzZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0gb3Ige0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48a28+7Yyo64SQIOydtOuPmSDrsKntlqUuIGBob3Jpem9udGFsPXRydWVgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX0xFRlR9IO2YueydgCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gYGhvcml6b250YWw9ZmFsc2VgIOydtOuptCB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1VQfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9ET1dOfS48L2tvPlxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZVxuXHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3Jlc3RvcmVcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqIC8vIFRoZSBvcmRlciBvZiBldmVudCBvY2N1cnJlbmNlLlxuXHRcdCAqIC8vIOydtOuypO2KuCDrsJzsg50g7Iic7IScXG5cdFx0ICogYmVmb3JlUmVzdG9yZSAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiByZXN0b3JlIChvbmNlKVxuXHRcdCAqL1xuXHRcdGN1c3RvbUV2ZW50LnJlc3RvcmUgJiYgdGhpcy5fdHJpZ2dlckV2ZW50KEVWRU5UUy5yZXN0b3JlKTtcblx0XHRjdXN0b21FdmVudC5yZXN0b3JlID0gY3VzdG9tRXZlbnQucmVzdG9yZUNhbGwgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdmFsdWUgd2hlbiBwYW5lbCBjaGFuZ2VzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBwaGFzZSAtIFtzdGFydHxlbmRdXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwb3Ncblx0ICovXG5cdF9zZXRQaGFzZVZhbHVlKHBoYXNlLCBwb3MpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCB1c2VUcmFuc2xhdGUgPSBvcHRpb25zLnVzZVRyYW5zbGF0ZTtcblxuXHRcdGlmIChwaGFzZSA9PT0gXCJzdGFydFwiICYmIChwYW5lbC5jaGFuZ2VkID0gdGhpcy5faXNNb3ZhYmxlKCkpKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEFuIGV2ZW50IHRoYXQgb2NjdXJzIGJlZm9yZSBhIHVzZXIgYWN0aW9uIG9yIFttb3ZlVG8oKV17QGxpbmsgZWcuRmxpY2tpbmcjbW92ZVRvfSwgW3ByZXYoKV17QGxpbmsgZWcuRmxpY2tpbmcjcHJldn0sIFtuZXh0KClde0BsaW5rIGVnLkZsaWNraW5nI25leHR9IG1ldGhvZCBpbml0aWF0ZXMgYSBtb3ZlIHRvIHRoZSBkZXN0aW5hdGlvbiBwYW5lbC4gSWYgeW91IGRvIG5vdCBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yLCB0aGVuIG1hbnkgW2ZsaWNrXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja30gZXZlbnRzIGFuZCBvbmUgW2ZsaWNrRW5kXXtAbGluayBlZy5GbGlja2luZyNldmVudDpmbGlja0VuZH0gZXZlbnQgd2lsbCBvY2N1ci5cblx0XHRcdCAqIEBrbyDsgqzsmqnsnpAg7JWh7IWYIO2YueydgCBbbW92ZVRvKClde0BsaW5rIGVnLkZsaWNraW5nI21vdmVUb30sIFtwcmV2KClde0BsaW5rIGVnLkZsaWNraW5nI3ByZXZ9LCBbbmV4dCgpXXtAbGluayBlZy5GbGlja2luZyNuZXh0fSDrqZTshJzrk5zsl5Ag7J2Y7ZW0IOuqqeyggSDtjKjrhJDroZzsnZgg7J2064+ZIOyLnOyekeyghCDrsJzsg53tlZjripQg7J2067Kk7Yq4LiDquLDrs7jrj5nsnpHsnYQg66eJ7KeAIOyViuuKlOuLpOuptCDrkqTsnbTslrQg64uk7IiY7J2YIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t97J2067Kk7Yq47JmAIOq3uCDrkqQg7ZWcIOuyiOydmCBbZmxpY2tFbmRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kfeydtOuypO2KuOqwgCDrsJzsg53tlZzri6QuXG5cdFx0XHQgKiBAbmFtZSBlZy5GbGlja2luZyNiZWZvcmVGbGlja1N0YXJ0XG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBldmVudFR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IDxrbz7snbTrsqTtirgg66qFPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcnVzdGVkIGB0cnVlYCB3aGVuIHRoZSBldmVudCB3YXMgZ2VuZXJhdGVkIGJ5IGEgdXNlciBhY3Rpb24oXCJtb3VzZVwiIG9yIFwidG91Y2hcIikgb3RoZXJ3aXNlIGBmYWxzZWAuPGtvPuyCrOyaqeyekCDslaHshZgoXCJtb3VzZVwiIOuYkOuKlCBcInRvdWNoXCIp7JeQIOydmO2VtCDsnbTrsqTtirjqsIAg7IOd7ISx65CcIOqyveyasCBgdHJ1ZWAuIOq3uCDsmbjripQgYGZhbHNlYDwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZXBhUG9zIFN0YXJ0aW5nIGNvb3JkaW5hdGUuIDxrbz7stpzrsJzsoJAg7KKM7ZGcLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGVzdFBvcyBEZXN0aW5hdGlvbiBjb29yZGluYXRlLiA8a28+64+E7LCp7KCQIOyijO2RnC48L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtGdW5jdGlvbn0gc3RvcCBDYW5jZWxzIHRoZSBkZWZhdWx0IGFjdGlvbi4gKERlZmF1bHQgYWN0aW9uOiBNb3ZlIHRvIGRlc3RpbmF0aW9uIHBhbmVsLikgVGhlIHBhbmVsIGVsZW1lbnQgc3RheXMgYXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjYWxsIHRvIGBzdG9wKClgLiBUbyByZXR1cm4gdG8gdGhlIG9yaWdpbmFsIHBvc2l0aW9uLCB5b3UgbXVzdCBjYWxsIHRoZSBbcmVzdG9yZSgpXXtAbGluayBlZy5GbGlja2luZyNyZXN0b3JlfSBtZXRob2QuPGtvPuq4sOuzuOuPmeyekeydhCDst6jshoztlZzri6QuICjquLDrs7jrj5nsnpE6IOuqqeyggSDtjKjrhJDroZzsnZgg7J2064+ZLikg7Yyo64SQIOyalOyGjOqwgCBgc3RvcCgpYO2YuOy2nOyLnOygkOydmCDsnITsuZjsl5Ag66i466y865+sIOyeiOuKlOuLpC4g7JuQ656YIOyekOumrOuhnCDrkJjrj4zrpqzroKTrqbQgW3Jlc3RvcmUoKV17QGxpbmsgZWcuRmxpY2tpbmcjcmVzdG9yZX0g66mU7ISc65Oc66W8IO2YuOy2nO2VtOyVvCDtlZzri6QuPC9rbz5cblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tFbmRcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbW92ZVRvXG5cdFx0XHQgKiBAc2VlIGVnLkZsaWNraW5nI3ByZXZcblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjbmV4dFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIC8vIFRoZSBvcmRlciBvZiBldmVudCBvY2N1cnJlbmNlLlxuXHRcdFx0ICogLy8g7J2067Kk7Yq4IOuwnOyDnSDsiJzshJxcblx0XHRcdCAqIGJlZm9yZUZsaWNrU3RhcnQgKG9uY2UpID4gZmxpY2sgKG1hbnkgdGltZXMpID4gZmxpY2tFbmQgKG9uY2UpXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogLy8gQW4gZXhhbXBsZSB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yLlxuXHRcdFx0ICogLy8g6riw67O464+Z7J6R7J2EIOunieuKlCDsmIguXG5cdFx0XHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIikub24oXCJiZWZvcmVGbGlja1N0YXJ0XCIsIGUgPT4ge1xuXHRcdFx0ICogXHRlLnN0b3AoKTtcblx0XHRcdCAqIH0pO1xuXHRcdFx0ICovXG5cdFx0XHRpZiAoIXRoaXMuX3RyaWdnZXJFdmVudChFVkVOVFMuYmVmb3JlRmxpY2tTdGFydCwgcG9zKSkge1xuXHRcdFx0XHRwYW5lbC5jaGFuZ2VkID0gcGFuZWwuYW5pbWF0aW5nID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoY29uZi50b3VjaC5kaXJlY3Rpb24pO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25mLmluZGV4VG9Nb3ZlID09PSAwICYmIHRoaXMuX3NldFBhbmVsTm8oKTtcblx0XHR9IGVsc2UgaWYgKHBoYXNlID09PSBcImVuZFwiKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5jaXJjdWxhciAmJiBwYW5lbC5jaGFuZ2VkKSB7XG5cdFx0XHRcdHRoaXMuX2FycmFuZ2VQYW5lbHModHJ1ZSwgY29uZi5pbmRleFRvTW92ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHVzZVRyYW5zbGF0ZSAmJiB0aGlzLl9zZXRUcmFuc2xhdGUoWy1wYW5lbC5zaXplICogcGFuZWwuaW5kZXgsIDBdKTtcblx0XHRcdGNvbmYudG91Y2guZGlzdGFuY2UgPSBjb25mLmluZGV4VG9Nb3ZlID0gMDtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgZXZlbnQgdGhhdCBvY2N1cnMgYWZ0ZXIgY29tcGxldGluZyB0aGUgbW92ZSB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwuIEl0IG9jY3VycyBpbiB0aGUgZm9sbG93aW5nIGNhc2VzLjxicj48YnI+LSBBZnRlciBjb21wbGV0aW5nIHRoZSBtb3ZlbWVudCB0byB0aGUgZGVzdGluYXRpb24gcGFuZWwgYnkgdXNlcidzIG1vdmUgaW5wdXQuPGJyPi0gYG1vdmVUbygpYCwgYHByZXYoKWAsIGBuZXh0KClgIG1ldGhvZCBjYWxsLiAoSXQgZG9lcyBub3Qgb2NjdXIgaWYgeW91IGhhdmUgZGlzYWJsZWQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0fSBldmVudC4pXG5cdFx0XHQgKiBAa28g66qp7KCBIO2MqOuEkOuhnOydmCDsnbTrj5nsnYQg7JmE66OM7ZWcIOuLpOydjCDrsJzsg53tlZjripQg7J2067Kk7Yq4LiDslYTrnpjsnZgg6rK97Jqw7JeQIOuwnOyDne2VnOuLpC48YnI+PGJyPi0g7IKs7Jqp7J6Q7J2YIOydtOuPmShtb3ZlKSDslaHshZgg7J6F66Cl7JeQIOydmO2VnCDrqqnsoIEg7Yyo64SQ66Gc7J2YIOydtOuPmeyZhOujjCDtm4QuPGJyPi0gYG1vdmVUbygpYCwgYHByZXYoKWAsIGBuZXh0KClgIOuplOyEnOuTnCDtmLjstpwuKFtiZWZvcmVGbGlja1N0YXJ0XXtAbGluayBlZy5GbGlja2luZyNldmVudDpiZWZvcmVGbGlja1N0YXJ0feydtOuypO2KuOydmCDquLDrs7jrj5nsnpHsnYQg66eJ7JWY64uk66m0IOuwnOyDne2VmOyngCDslYrripTri6QuKVxuXHRcdFx0ICogQG5hbWUgZWcuRmxpY2tpbmcjZmxpY2tFbmRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQHByb3BlcnR5IHtTdHJpbmd9IGV2ZW50VHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuPGtvPuydtOuypO2KuCDrqoU8L2tvPlxuXHRcdFx0ICogQHByb3BlcnR5IHtCb29sZWFufSBpc1RydXN0ZWQgYHRydWVgIHdoZW4gdGhlIGV2ZW50IHdhcyBnZW5lcmF0ZWQgYnkgYSB1c2VyIGFjdGlvbihcIm1vdXNlXCIgb3IgXCJ0b3VjaFwiKSBvdGhlcndpc2UgYGZhbHNlYC48a28+7IKs7Jqp7J6QIOyVoeyFmChcIm1vdXNlXCIg65iQ64qUIFwidG91Y2hcIinsl5Ag7J2Y7ZW0IOydtOuypO2KuOqwgCDsg53shLHrkJwg6rK97JqwIGB0cnVlYC4g6re4IOyZuOuKlCBgZmFsc2VgLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gbm8gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIFNlZSB0aGUgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSBtZXRob2QuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLguIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH3rqZTshJzrk5wg7LC47KGwLjwva28+XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gZGlyZWN0aW9uIG9mIHRoZSBwYW5lbCBtb3ZlbWVudC4gSWYgYGhvcml6b250YWw9dHJ1ZWAgaXMge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSBvciB7QGxpbmsgZWcuRmxpY2tpbmcuRElSRUNUSU9OX1JJR0hUfS4gSWYgYGhvcml6b250YWw9ZmFsc2VgIGlzIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fVVB9IG9yIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPGtvPu2MqOuEkCDsnbTrj5kg67Cp7ZalLiBgaG9yaXpvbnRhbD10cnVlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9MRUZUfSDtmLnsnYAge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9SSUdIVH0uIGBob3Jpem9udGFsPWZhbHNlYCDsnbTrqbQge0BsaW5rIGVnLkZsaWNraW5nLkRJUkVDVElPTl9VUH0g7Zi57J2AIHtAbGluayBlZy5GbGlja2luZy5ESVJFQ1RJT05fRE9XTn0uPC9rbz5cblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydFxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNldmVudDpmbGlja1xuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNtb3ZlVG9cblx0XHRcdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHRcdFx0ICogQHNlZSBlZy5GbGlja2luZyNuZXh0XG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogLy8gVGhlIG9yZGVyIG9mIGV2ZW50IG9jY3VycmVuY2UuXG5cdFx0XHQgKiAvLyDsnbTrsqTtirgg67Cc7IOdIOyInOyEnFxuXHRcdFx0ICogYmVmb3JlRmxpY2tTdGFydCAob25jZSkgPiBmbGljayAobWFueSB0aW1lcykgPiBmbGlja0VuZCAob25jZSlcblx0XHRcdCAqL1xuXHRcdFx0cGFuZWwuY2hhbmdlZCAmJiB0aGlzLl90cmlnZ2VyRXZlbnQoRVZFTlRTLmZsaWNrRW5kKTtcblx0XHR9XG5cblx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MocGhhc2UpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBhY2NvcmRpbmcgZGlyZWN0aW9uXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfZ2V0TnVtQnlEaXJlY3Rpb24oKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cblx0XHRyZXR1cm4gY29uZi50b3VjaC5kaXJlY3Rpb24gPT09IGNvbmYuZGlyRGF0YVswXSA/IDEgOiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXZlcnQgcGFuZWwgbnVtYmVyXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfcmV2ZXJ0UGFuZWxObygpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgbnVtID0gdGhpcy5fZ2V0TnVtQnlEaXJlY3Rpb24oKTtcblxuXHRcdGNvbnN0IGluZGV4ID0gcGFuZWwuY3VyckluZGV4ID49IDAgPyBwYW5lbC5jdXJySW5kZXggOiBwYW5lbC5pbmRleCAtIG51bTtcblx0XHRjb25zdCBubyA9IHBhbmVsLmN1cnJObyA+PSAwID8gcGFuZWwuY3Vyck5vIDogcGFuZWwubm8gLSBudW07XG5cblx0XHR0aGlzLl9zZXRQYW5lbE5vKHtcblx0XHRcdGluZGV4LFxuXHRcdFx0bm9cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHBhbmVsIG51bWJlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb2JqIG51bWJlciBvYmplY3Rcblx0ICovXG5cdF9zZXRQYW5lbE5vKG9iaikge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCBjb3VudCA9IHBhbmVsLm9yaWdDb3VudCAtIDE7XG5cdFx0Y29uc3QgbnVtID0gdGhpcy5fZ2V0TnVtQnlEaXJlY3Rpb24oKTtcblxuXHRcdGlmICh1dGlscy5pc09iamVjdChvYmopKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcblx0XHRcdFx0cGFuZWxba2V5XSA9IG9ialtrZXldO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyByZW1lbWJlciBjdXJyZW50IHZhbHVlXG5cdFx0XHRwYW5lbC5jdXJySW5kZXggPSBwYW5lbC5pbmRleDtcblx0XHRcdHBhbmVsLmN1cnJObyA9IHBhbmVsLm5vO1xuXG5cdFx0XHRwYW5lbC5pbmRleCArPSBudW07XG5cdFx0XHRwYW5lbC5ubyArPSBudW07XG5cdFx0fVxuXG5cdFx0aWYgKHBhbmVsLm5vID4gY291bnQpIHtcblx0XHRcdHBhbmVsLm5vID0gMDtcblx0XHR9IGVsc2UgaWYgKHBhbmVsLm5vIDwgMCkge1xuXHRcdFx0cGFuZWwubm8gPSBjb3VudDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHBvaW50ZXJFdmVudHMgY3NzIHByb3BlcnR5IG9uIGNvbnRhaW5lciBlbGVtZW50IGR1ZSB0byB0aGUgaU9TIGNsaWNrIGJ1Z1xuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0V2ZW50fSBlXG5cdCAqL1xuXHRfc2V0UG9pbnRlckV2ZW50cyhlKSB7XG5cdFx0Y29uc3QgJGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lcjtcblx0XHRjb25zdCBwb2ludGVyID0gdXRpbHMuY3NzKCRjb250YWluZXIsIFwicG9pbnRlckV2ZW50c1wiKTtcblx0XHRsZXQgcG9pbnRlckV2ZW50cztcblxuXHRcdGlmIChlICYmIGUuaG9sZGluZyAmJlxuXHRcdFx0ZS5pbnB1dEV2ZW50ICYmIGUuaW5wdXRFdmVudC5wcmV2ZW50U3lzdGVtRXZlbnQgJiZcblx0XHRcdHBvaW50ZXIgIT09IFwibm9uZVwiXG5cdFx0KSB7XG5cdFx0XHRwb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG5cdFx0fSBlbHNlIGlmICghZSAmJiBwb2ludGVyICE9PSBcImF1dG9cIikge1xuXHRcdFx0cG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuXHRcdH1cblxuXHRcdHBvaW50ZXJFdmVudHMgJiYgdXRpbHMuY3NzKCRjb250YWluZXIsIHtwb2ludGVyRXZlbnRzfSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGNvb3JkaW5hdGUgdmFsdWUgd2l0aCB1bml0XG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSBjb29yZHNWYWx1ZSB7QXJyYXl9IHgseSBudW1lcmljIHZhbHVlXG5cdCAqIEByZXR1cm4ge09iamVjdH0geCx5IGNvb3JkaW5hdGUgdmFsdWUgd2l0aCB1bml0XG5cdCAqL1xuXHRfZ2V0Q29vcmRzVmFsdWUoY29vcmRzVmFsdWUpIHtcblx0XHQvLyB0aGUgcGFyYW0gY29tZXMgYXMgWyB2YWwsIDAgXSwgd2hhdGV2ZXIgdGhlIGRpcmVjdGlvbi4gU28gcmVvcmRlciB0aGUgdmFsdWUgZGVwZW5kIHRoZSBkaXJlY3Rpb24uXG5cdFx0Y29uc3QgY29vcmRzID0gdGhpcy5fZ2V0RGF0YUJ5RGlyZWN0aW9uKGNvb3Jkc1ZhbHVlKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR4OiB1dGlscy5nZXRVbml0VmFsdWUoY29vcmRzWzBdKSxcblx0XHRcdHk6IHV0aWxzLmdldFVuaXRWYWx1ZShjb29yZHNbMV0pXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgdHJhbnNsYXRlIHByb3BlcnR5IHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvb3Jkc1ZhbHVlIGNvb3JkaW5hdGUgeCx5IHZhbHVlXG5cdCAqL1xuXHRfc2V0VHJhbnNsYXRlKGNvb3Jkc1ZhbHVlKSB7XG5cdFx0Y29uc3QgY29vcmRzID0gdGhpcy5fZ2V0Q29vcmRzVmFsdWUoY29vcmRzVmFsdWUpO1xuXG5cdFx0dGhpcy5fc2V0TW92ZVN0eWxlKHRoaXMuJGNvbnRhaW5lciwgW2Nvb3Jkcy54LCBjb29yZHMueV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHBhbmVsIHBhc3NlZCB0aHJvdWdoIHRocmVzaG9sZCBwaXhlbFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2lzTW92YWJsZSgpIHtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IGF4ZXNJbnN0ID0gdGhpcy5fYXhlc0luc3Q7XG5cdFx0Y29uc3QgaXNNb3ZhYmxlID0gTWF0aC5hYnModGhpcy5fY29uZi50b3VjaC5kaXN0YW5jZSkgPj0gb3B0aW9ucy50aHJlc2hvbGQ7XG5cdFx0bGV0IG1heDtcblx0XHRsZXQgY3VyclBvcztcblxuXHRcdGlmICghb3B0aW9ucy5jaXJjdWxhciAmJiBpc01vdmFibGUpIHtcblx0XHRcdG1heCA9IGF4ZXNJbnN0LmF4aXMuZmxpY2sucmFuZ2VbMV07XG5cdFx0XHRjdXJyUG9zID0gYXhlc0luc3QuZ2V0KCkuZmxpY2s7XG5cblx0XHRcdC8vIGlmIGN1cnJlbnQgcG9zaXRpb24gb3V0IG9mIHJhbmdlXG5cdFx0XHRpZiAoY3VyclBvcyA8IDAgfHwgY3VyclBvcyA+IG1heCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGlzTW92YWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcmlnZ2VyIGN1c3RvbSBldmVudHNcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBldmVudCBuYW1lXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSAtIGFkZGl0aW9uYWwgZXZlbnQgdmFsdWVcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdF90cmlnZ2VyRXZlbnQobmFtZSwgcGFyYW0pIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cblx0XHQvLyBwYXNzIGNoYW5nZWQgcGFuZWwgbm8gb25seSBvbiAnZmxpY2tFbmQnIGV2ZW50XG5cdFx0aWYgKG5hbWUgPT09IEVWRU5UUy5mbGlja0VuZCkge1xuXHRcdFx0cGFuZWwuY3Vyck5vID0gcGFuZWwubm87XG5cdFx0XHRwYW5lbC5jdXJySW5kZXggPSBwYW5lbC5pbmRleDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy50cmlnZ2VyKGNvbmYuZXZlbnRQcmVmaXggKyBuYW1lLCB1dGlscy5leHRlbmQoe1xuXHRcdFx0ZXZlbnRUeXBlOiBuYW1lLFxuXHRcdFx0bm86IHBhbmVsLmN1cnJObyxcblx0XHRcdGRpcmVjdGlvbjogY29uZi50b3VjaC5kaXJlY3Rpb24sXG5cdFx0XHRpc1RydXN0ZWQ6IGNvbmYudG91Y2guaXNUcnVzdGVkXG5cdFx0fSwgcGFyYW0pKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgbmV4dC9wcmV2IHBhbmVsIGVsZW1lbnQvaW5kZXguXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlyZWN0aW9uXG5cdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZWxlbWVudCAtIHRydWU6dG8gZ2V0IGVsZW1lbnQsIGZhbHNlOnRvIGdldCBpbmRleFxuXHQgKiBAcGFyYW0ge051bWJlcn0gcGh5c2ljYWwgLSB0cnVlIDogcGh5c2ljYWwsIGZhbHNlIDogbG9naWNhbCAoQGRlcHJlY2F0ZWQgc2luY2UgMi4yLjApXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fE51bWJlcn1cblx0ICovXG5cdF9nZXRFbGVtZW50KGRpcmVjdGlvbiwgZWxlbWVudCwgcGh5c2ljYWwpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgY2lyY3VsYXIgPSB0aGlzLm9wdGlvbnMuY2lyY3VsYXI7XG5cdFx0Y29uc3QgcG9zID0gcGFuZWwuY3VyckluZGV4O1xuXHRcdGNvbnN0IG5leHQgPSBkaXJlY3Rpb24gPT09IHRoaXMuX2NvbmYuZGlyRGF0YVswXTtcblx0XHRsZXQgcmVzdWx0ID0gbnVsbDtcblx0XHRsZXQgdG90YWw7XG5cdFx0bGV0IGluZGV4O1xuXG5cdFx0aWYgKHBoeXNpY2FsKSB7XG5cdFx0XHR0b3RhbCA9IHBhbmVsLmNvdW50O1xuXHRcdFx0aW5kZXggPSBwb3M7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvdGFsID0gcGFuZWwub3JpZ0NvdW50O1xuXHRcdFx0aW5kZXggPSBwYW5lbC5jdXJyTm87XG5cdFx0fVxuXG5cdFx0Y29uc3QgY3VycmVudEluZGV4ID0gaW5kZXg7XG5cblx0XHRpZiAobmV4dCkge1xuXHRcdFx0aWYgKGluZGV4IDwgdG90YWwgLSAxKSB7XG5cdFx0XHRcdGluZGV4Kys7XG5cdFx0XHR9IGVsc2UgaWYgKGNpcmN1bGFyKSB7XG5cdFx0XHRcdGluZGV4ID0gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGluZGV4ID4gMCkge1xuXHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0fSBlbHNlIGlmIChjaXJjdWxhcikge1xuXHRcdFx0XHRpbmRleCA9IHRvdGFsIC0gMTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY3VycmVudEluZGV4ICE9PSBpbmRleCkge1xuXHRcdFx0cmVzdWx0ID0gZWxlbWVudCA/IHBhbmVsLiRsaXN0W25leHQgPyBwb3MgKyAxIDogcG9zIC0gMV0gOiBpbmRleDtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB2YWx1ZSB0byBmb3JjZSBtb3ZlIHBhbmVscyB3aGVuIGR1cmF0aW9uIGlzIDBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtCb29sZWFufSBuZXh0XG5cdCAqL1xuXHRfc2V0VmFsdWVUb01vdmUobmV4dCkge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXG5cdFx0Y29uZi50b3VjaC5kaXN0YW5jZSA9IHRoaXMub3B0aW9ucy50aHJlc2hvbGQgKyAxO1xuXHRcdGNvbmYudG91Y2guZGlyZWN0aW9uID0gY29uZi5kaXJEYXRhWyshbmV4dF07XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDtmITsnqwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi466W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRJbmRleFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwaHlzaWNhbD1mYWxzZV0gQGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPlR5cGVzIG9mIGluZGV4IG51bWJlcnMuPGJyPi0gdHJ1ZSAoUGh5c2ljYWwpOiBNYXRoLmZsb29yKHtUb3RhbCBudW1iZXIgb2YgcGFuZWxzfSAvIDIgLSAwLjEpIHZhbHVlLiAoSW5jcmVhc2UgYnkgMSBmb3IgZXZlcnkgdHdvIHBhbmVscy4pIElmIHRoZSBjaXJjdWxhciBvcHRpb24gaXMgZmFsc2UsIGl0IGVxdWFscyBwaHlzaWNhbD1mYWxzZS48YnI+LSBmYWxzZSAoTG9naWNhbCk6IFRoZSB2YWx1ZSBvZiBob3cgdGhlIGNvbnRlbnQoaW5uZXJIVE1MKSBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50IGlzIGluIHRoZSBkZWZpbmVkIG9yZGVyIG9mIHRoZSBwYW5lbCBlbGVtZW50cy48a28+QGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPuyduOuNseyKpCDrsojtmLjsnZgg7KKF66WYLjxicj4tIHRydWUgKOusvOumrOyggSk6IGBNYXRoLmZsb29yKHvtjKjrhJAg7LSdIOqwnOyImH0gLyAyIC0gMC4xKWAg6rCSLiAo7Yyo64SQ7J20IDLqsJwg64qY7Ja064KgIOuVjOuniOuLpCAx7JSpIOymneqwgCkgYGNpcmN1bGFyYOyYteyFmOydtCBgZmFsc2Vg7J2066m0IGBwaHlzaWNhbD1mYWxzZWDsmYAg64+Z7J287ZWcIOqwki48YnI+LSBmYWxzZSAo64W866as7KCBKTog7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg7Luo7YWQ7Yq4KGlubmVySFRNTCnqsIAgJ+2MqOuEkCDsmpTshozrk6TsnZgg7KCV7J2Y65CcIOyInOyEnCfsl5DshJwg66qHIOuyiOynuOyduOyngOyXkCDrjIDtlZwg6rCSLjwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcn0gSW5kZXggbnVtYmVyIG9mIHRoZSBjdXJyZW50IHBhbmVsIGVsZW1lbnQuIEEgemVyby1iYXNlZCBpbnRlZ2VyLjxrbz7tmITsnqwg7Yyo64SQ7J2YIOyduOuNseyKpCDrsojtmLguIDDrtoDthLAg7Iuc7J6R7ZWY64qUIOygleyImC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldFByZXZJbmRleFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRJbmRleFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBgYGBodG1sXG5cdCAqIDxkaXYgaWQ9XCJmbGlja1wiPlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMDwvcD48L2Rpdj5cblx0ICogXHQ8ZGl2PjxwPnBhbmVsIDE8L3A+PC9kaXY+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAyPC9wPjwvZGl2PlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMzwvcD48L2Rpdj5cblx0ICogPC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBgYGBqYXZhc2NyaXB0XG5cdCAqIC8vIGNpcmN1bGFyIG9mZiBhbmQgbGVmdCBmbGlja2luZy5cblx0ICogLy8g7Iic7ZmY7J2EIOuBhOqzoCDsoowg7ZSM66as7YK5LlxuXHQgKiBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIikub24oXCJmbGlja0VuZFwiLCB7Y3VycmVudFRhcmdldH0gPT4ge1xuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgoKSk7IC8vIDEgPiAyID4gM1xuXHQgKiBcdGNvbnNvbGUubG9nKGN1cnJlbnRUYXJnZXQuZ2V0SW5kZXgodHJ1ZSkpOyAvLyAxID4gMiA+IDNcblx0ICogfTtcblx0ICpcblx0ICogLy8gY2lyY3VsYXIgb24gYW5kIGxlZnQgZmxpY2tpbmcuXG5cdCAqIC8vIOyInO2ZmOydhCDsvJzqs6Ag7KKMIO2UjOumrO2CuS5cblx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtjaXJjdWxhcjogdHJ1ZX0pLm9uKFwiZmxpY2tFbmRcIiwge2N1cnJlbnRUYXJnZXR9ID0+IHtcblx0ICogXHRjb25zb2xlLmxvZyhjdXJyZW50VGFyZ2V0LmdldEluZGV4KCkpOyAvLyAxID4gMiA+IDMgPiAwID4gMSA+IDIgPiAzID4gMCAuLi5cblx0ICogXHRjb25zb2xlLmxvZyhjdXJyZW50VGFyZ2V0LmdldEluZGV4KHRydWUpKTsgLy8gMSA+IDEgPiAxID4gMSA+IDEgPiAxID4gMSA+IDEgLi4uXG5cdCAqIH07XG5cdCAqIGBgYFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBgYGBodG1sXG5cdCAqIDwhLS1EZWZpbmUgb25seSB0d28gcGFuZWxzLi0tPlxuXHQgKiA8IS0t7Yyo64SQ7J2EIOuRkCDqsJzrp4wg7KCV7J2Y7ZWc64ukLi0tPlxuXHQgKiA8ZGl2IGlkPVwiZmxpY2syXCI+XG5cdCAqIFx0PGRpdj48cD5wYW5lbCAwPC9wPjwvZGl2PlxuXHQgKiBcdDxkaXY+PHA+cGFuZWwgMTwvcD48L2Rpdj5cblx0ICogPC9kaXY+XG5cdCAqIGBgYFxuXHQgKiBgYGBqYXZhc2NyaXB0XG5cdCAqIC8vIChJbiB0aGUgY2FzZSBvZiBjaXJjdWxhdGlvbikgSWYgdGhlIG51bWJlciBvZiBkZWZpbmVkIHBhbmVsIGVsZW1lbnRzIGlzIGxlc3MgdGhhbiB0aGUgbWluaW11bSBudW1iZXIgcmVxdWlyZWQsIHRoZSBudW1iZXIgb2YgcGFuZWxzIGlzIGNyZWF0ZWQuXG5cdCAqIC8vIFRoZXJlZm9yZSwgaXQgaXMgZGVzY3JpYmVkIGFzICd0aGUgbnVtYmVyIG9mIHBhbmVsIGRlZmluaXRpb25zIG9mIHRoZSBjb250ZW50cyBvZiB0aGUgcGFuZWwuJ1xuXHQgKiAvLyAo7Iic7ZmY7J24IOqyveyasCkg7KCV7J2Y65CcIO2MqOuEkCDsmpTshozsnZgg6rCc7IiY6rCAIO2VhOyalCDstZzshozqsJzsiJjrs7Tri6Qg7KCB7Jy866m0IOq3uCDsiJjrp4ztgbzsnZgg7Yyo64SQ7J2EIOyDneyEse2VnOuLpC5cblx0ICogLy8g6re466CH6riwIOuVjOusuOyXkCAn7Yyo64SQ7J20IOuLtOqzoCDsnojripQg7Luo7YWQ7Yq47J2YIO2MqOuEkCDsoJXsnZgg7Iic7ISx7IOB7J2YIOuyiO2YuCfrnbzqs6Ag7ISk66qF7ZWc64ukLlxuXHQgKiBjb25zdCBmbGljayA9IG5ldyBlZy5GbGlja2luZyhcImZsaWNrMlwiLCB7XG5cdCAqIFx0Y2lyY3VsYXI6IHRydWVcblx0ICogfSk7XG5cdCAqXG5cdCAqIC8vIFRoZSBjb250ZW50IG9mIHRoZSBjdXJyZW50IHBhbmVsIGlzIHRoZSBmaXJzdCBpbiB0aGUgcGFuZWwgZGVmaW5pdGlvbiBvcmRlci5cblx0ICogLy8g7ZiE7J6sIO2MqOuEkOydtCDri7Tqs6Ag7J6I64qUIOy7qO2FkO2KuOuKlCDtjKjrhJAg7KCV7J2YIOyInOyEnOyDgSDssqsg67KI7Ke47J2064ukLlxuXHQgKiBmbGljay5nZXRJbmRleCgpOyAvLyAwXG5cdCAqXG5cdCAqIC8vIFRoZSBjb250ZW50IG9mIHRoZSBuZXh0IHBhbmVsIGlzIHRoZSBzZWNvbmQgaW4gdGhlIHBhbmVsIGRlZmluaXRpb24gb3JkZXIuXG5cdCAqIC8vIOuLpOydjCDtjKjrhJDsnbQg64u06rOgIOyeiOuKlCDsu6jthZDtirjripQg7Yyo64SQIOygleydmCDsiJzshJzsg4Eg65GQIOuyiOynuOydtOuLpC5cblx0ICogZmxpY2suZ2V0TmV4dEluZGV4KCk7IC8vIDFcblx0ICpcblx0ICogLy8gVGhlIGNvbnRlbnQgb2YgdGhlIHByZXZpb3VzIHBhbmVsIGlzIHRoZSBzZWNvbmQgaW4gdGhlIHBhbmVsIGRlZmluaXRpb24gb3JkZXIuXG5cdCAqIC8vIOydtOyghCDtjKjrhJDsnbQg64u06rOgIOyeiOuKlCDsu6jthZDtirjripQg7Yyo64SQIOygleydmCDsiJzshJzsg4Eg65GQIOuyiOynuOydtOuLpC5cblx0ICogZmxpY2suZ2V0UHJldkluZGV4KCk7IC8vIDFcblx0ICogYGBgXG5cdCAqL1xuXHRnZXRJbmRleChwaHlzaWNhbCkge1xuXHRcdHJldHVybiB0aGlzLl9jb25mLnBhbmVsW3BoeXNpY2FsID8gXCJjdXJySW5kZXhcIiA6IFwiY3Vyck5vXCJdO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIHJlZmVyZW5jZSBvZiB0aGUgY3VycmVudCBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g7ZiE7J6sIO2MqOuEkCDsmpTshozsnZgg66CI7Y2865+w7Iqk66W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRFbGVtZW50XG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBDdXJyZW50IHBhbmVsIGVsZW1lbnQuPGtvPu2YhOyerCDtjKjrhJAg7JqU7IaMLjwva28+XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0UHJldkVsZW1lbnRcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXROZXh0RWxlbWVudFxuXHQgKi9cblx0Z2V0RWxlbWVudCgpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cblx0XHRyZXR1cm4gcGFuZWwuJGxpc3RbcGFuZWwuY3VyckluZGV4XTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSByZWZlcmVuY2Ugb2YgdGhlIG5leHQgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIOuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOugiO2NvOufsOyKpOulvCDrsJjtmZjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjZ2V0TmV4dEVsZW1lbnRcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR8bnVsbH0gTmV4dCBwYW5lbCBlbGVtZW50IG9yIGBudWxsYCBpZiBpdCBkb2VzIG5vdCBleGlzdC48a28+64uk7J2MIO2MqOuEkCDsmpTshowuIO2MqOuEkOydtCDsl4bsnLzrqbQgYG51bGxg7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEVsZW1lbnRcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRQcmV2RWxlbWVudFxuXHQgKi9cblx0Z2V0TmV4dEVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldEVsZW1lbnQodGhpcy5fY29uZi5kaXJEYXRhWzBdLCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBudW1iZXIgb2YgdGhlIG5leHQgcGFuZWwgZWxlbWVudC5cblx0ICogQGtvIOuLpOydjCDtjKjrhJAg7JqU7IaM7J2YIOyduOuNseyKpCDrsojtmLjrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldE5leHRJbmRleFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtwaHlzaWNhbD1mYWxzZV0gQGRlcHJlY2F0ZWQgc2luY2UgMi4yLjA8YnI+PGJyPlR5cGVzIG9mIGluZGV4IG51bWJlcnM8YnI+LSB0cnVlIChQaHlzaWNhbCk6IFBsdXMgb25lIG9mIFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0gcmV0dXJuIHZhbHVlLjxicj4tIGZhbHNlIChMb2dpY2FsKTogVGhlIHZhbHVlIG9mIGhvdyB0aGUgY29udGVudChpbm5lckhUTUwpIG9mIHRoZSBuZXh0IHBhbmVsIGVsZW1lbnQgaXMgaW4gdGhlIGRlZmluZWQgb3JkZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnRzLjxrbz5AZGVwcmVjYXRlZCBzaW5jZSAyLjIuMDxicj48YnI+7J24642x7IqkIOuyiO2YuOydmCDsooXrpZguPGJyPi0gdHJ1ZSAo66y866as7KCBKTogW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSDrsJjtmZjqsJLsl5AgMeydhCDrjZTtlZwg6rCSLjxicj4tIGZhbHNlICjrhbzrpqzsoIEpOiDri6TsnYwg7Yyo64SQIOyalOyGjOydmCDsu6jthZDtirgoaW5uZXJIVE1MKeqwgCAn7Yyo64SQIOyalOyGjOuTpOydmCDsoJXsnZjrkJwg7Iic7IScJ+yXkOyEnCDrqocg67KI7Ke47J247KeA7JeQIOuMgO2VnCDqsJIuPC9rbz5cblx0ICogQHJldHVybiB7TnVtYmVyfG51bGx9IEluZGV4IG51bWJlciBvZiB0aGUgbmV4dCBwYW5lbCBlbGVtZW50IG9yIG51bGwgaWYgaXQgZG9lcyBub3QgZXhpc3QuIEEgemVyby1iYXNlZCBpbnRlZ2VyLjxrbz7ri6TsnYwg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi4LiAw67aA7YSwIOyLnOyeke2VmOuKlCDsoJXsiJguIO2MqOuEkOydtCDsl4bsnLzrqbQgYG51bGxg7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEluZGV4XG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjZ2V0UHJldkluZGV4XG5cdCAqL1xuXHRnZXROZXh0SW5kZXgocGh5c2ljYWwpIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0RWxlbWVudCh0aGlzLl9jb25mLmRpckRhdGFbMF0sIGZhbHNlLCBwaHlzaWNhbCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyBhIHJlZmVyZW5jZSB0byBhbGwgcGFuZWwgZWxlbWVudHMuXG5cdCAqIEBrbyDrqqjrk6Ag7Yyo64SQIOyalOyGjOydmCDroIjtjbzrn7DsiqTrpbwg67CY7ZmY7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldEFsbEVsZW1lbnRzXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119IFdob2xlIHBhbmVsIGVsZW1lbnRzLjxrbz7rqqjrk6Ag7Yyo64SQIOyalOyGjC48L2tvPlxuXHQgKi9cblx0Z2V0QWxsRWxlbWVudHMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbmYucGFuZWwuJGxpc3Q7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIG9mIHRoZSBwcmV2aW91cyBwYW5lbCBlbGVtZW50LlxuXHQgKiBAa28g7J207KCEIO2MqOuEkCDsmpTshozsnZgg66CI7Y2865+w7Iqk66W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRQcmV2RWxlbWVudFxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfSBQcmV2aW91cyBwYW5lbCBlbGVtZW50IG9yIGBudWxsYCBpZiBpdCBkb2VzIG5vdCBleGlzdC48a28+7J207KCEIO2MqOuEkCDsmpTshowuIO2MqOuEkOydtCDsl4bsnLzrqbQgYG51bGxg7J2EIOuwmO2ZmO2VnOuLpC48L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldEVsZW1lbnRcblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXROZXh0RWxlbWVudFxuXHQgKi9cblx0Z2V0UHJldkVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldEVsZW1lbnQodGhpcy5fY29uZi5kaXJEYXRhWzFdLCB0cnVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBpbmRleCBudW1iZXIgb2YgdGhlIHByZXZpb3VzIHBhbmVsIGVsZW1lbnQuXG5cdCAqIEBrbyDsnbTsoIQg7Yyo64SQIOyalOyGjOydmCDsnbjrjbHsiqQg67KI7Zi466W8IOuwmO2ZmO2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNnZXRQcmV2SW5kZXhcblx0ICogQHBhcmFtIHtCb29sZWFufSBbcGh5c2ljYWw9ZmFsc2VdIEBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj5UeXBlcyBvZiBpbmRleCBudW1iZXJzPGJyPi0gdHJ1ZSAoUGh5c2ljYWwpOiBNaW51cyBvbmUgb2YgW2dldEluZGV4KClde0BsaW5rIGVnLkZsaWNraW5nI2dldEluZGV4fSByZXR1cm4gdmFsdWUuPGJyPi0gZmFsc2UgKExvZ2ljYWwpOiBUaGUgdmFsdWUgb2YgaG93IHRoZSBjb250ZW50KGlubmVySFRNTCkgb2YgdGhlIGN1cnJlbnQgcGFuZWwgZWxlbWVudCBpcyBpbiB0aGUgZGVmaW5lZCBvcmRlciBvZiB0aGUgcGFuZWwgZWxlbWVudHMuPGtvPkBkZXByZWNhdGVkIHNpbmNlIDIuMi4wPGJyPjxicj7snbjrjbHsiqQg67KI7Zi47J2YIOyiheulmDxicj4tIHRydWUgKOusvOumrOyggSk6IFtnZXRJbmRleCgpXXtAbGluayBlZy5GbGlja2luZyNnZXRJbmRleH0g67CY7ZmY6rCS7JeQIDHsnYQg67qAIOqwki48YnI+LSBmYWxzZSAo64W866as7KCBKTog7J207KCEIO2MqOuEkCDsmpTshozsnZgg7Luo7YWQ7Yq4KGlubmVySFRNTCnqsIAgJ+2MqOuEkCDsmpTshozrk6TsnZgg7KCV7J2Y65CcIOyInOyEnCfsl5DshJwg66qHIOuyiOynuOyduOyngOyXkCDrjIDtlZwg6rCSLjwva28+XG5cdCAqIEByZXR1cm4ge051bWJlcnxudWxsfSBQcmV2aW91cyBlbGVtZW50IGluZGV4IHZhbHVlIG9yIG51bGwgaWYgbm8gbW9yZSBlbGVtZW50IGV4aXN0LiBBIHplcm8tYmFzZWQgaW50ZWdlci48a28+7J207KCEIO2MqOuEkCDsmpTshozsnZgg7J24642x7IqkIOuyiO2YuC4gMOu2gO2EsCDsi5zsnpHtlZjripQg7KCV7IiYLiDtjKjrhJDsnbQg7JeG64qUIOqyveyasOuKlCBgbnVsbGAuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRJbmRleFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2dldE5leHRJbmRleFxuXHQgKi9cblx0Z2V0UHJldkluZGV4KHBoeXNpY2FsKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldEVsZW1lbnQodGhpcy5fY29uZi5kaXJEYXRhWzFdLCBmYWxzZSwgcGh5c2ljYWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIHRoZSBhbmltYXRlZCBwYW5lbCBpcyBwbGF5aW5nLlxuXHQgKiBAa28g7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZjsnbQg7KeE7ZaJIOykkeyduOyngCDtmZXsnbjtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjaXNQbGF5aW5nXG5cdCAqIEByZXR1cm4ge0Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBhbmltYXRlZCBwYW5lbCBpcyBwbGF5aW5nIDxrbz7tjKjrhJAg7J2064+ZIOyVoOuLiOuplOydtOyFmCDsp4Ttlokg7KSRIOyXrOu2gDwva28+XG5cdCAqL1xuXHRpc1BsYXlpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2NvbmYucGFuZWwuYW5pbWF0aW5nO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmUgcGFuZWwgYXBwbHlpbmcgc3RhcnQvZW5kIHBoYXNlIHZhbHVlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgQXhlcycgbWV0aG9kIG5hbWVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHRvIGRlc3RpbmF0aW9uIHZhbHVlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblZhbHVlIGR1cmF0aW9uIHZhbHVlXG5cdCAqL1xuXHRfbW92ZVBhbmVsQnlQaGFzZShtZXRob2QsIHRvLCBkdXJhdGlvblZhbHVlKSB7XG5cdFx0Y29uc3QgZHVyYXRpb24gPSB1dGlscy5nZXROdW1WYWx1ZShkdXJhdGlvblZhbHVlLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xuXG5cdFx0aWYgKHRoaXMuX3NldFBoYXNlVmFsdWUoXCJzdGFydFwiKSAhPT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuX3NldEF4ZXMobWV0aG9kLCB0bywgZHVyYXRpb24pO1xuXHRcdFx0IWR1cmF0aW9uICYmIHRoaXMuX3NldFBoYXNlVmFsdWUoXCJlbmRcIik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIGFuIGVsZW1lbnQgdG8gdGhlIG5leHQgcGFuZWwuIElmIGBob3Jpem9udGFsPXRydWVgaXMgcmlnaHQgcGFuZWwuIElmIGBob3Jpem9udGFsPWZhbHNlYGlzIGxvd2VyIHBhbmVsLlxuXHQgKiBAa28g64uk7J2MIO2MqOuEkOuhnCDsnbTrj5ntlZzri6QuIGBob3Jpem9udGFsPXRydWVg7J2066m0IOyasOy4oSDtjKjrhJAuIGBob3Jpem9udGFsPWZhbHNlYOydtOuptCDtlZjsuKEg7Yyo64SQLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI25leHRcblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvbj1vcHRpb25zLmR1cmF0aW9uXSBEdXJhdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQgKHVuaXQ6IG1zKSA8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja0VuZFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHQgKiBAc2VlIGVnLkZsaWNraW5nI3ByZXZcblx0ICovXG5cdG5leHQoZHVyYXRpb24pIHtcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KCk7XG5cblx0XHRpZiAodHlwZW9mIGluZGV4ICE9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX21vdmVUbyhpbmRleCwgZHVyYXRpb24sIEF4ZXMuRElSRUNUSU9OX1JJR0hUKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlcyBhbiBlbGVtZW50IHRvIHRoZSBwcmV2aW91cyBwYW5lbC4gSWYgYGhvcml6b250YWw9dHJ1ZWBpcyBsZWZ0IHBhbmVsLiBJZiBgaG9yaXpvbnRhbD1mYWxzZWBpcyB1cHBlciBwYW5lbC5cblx0ICogQGtvIOydtOyghCDtjKjrhJDroZwg7J2064+Z7ZWc64ukLiBgaG9yaXpvbnRhbD10cnVlYOydtOuptCDsoozsuKEg7Yyo64SQLiBgaG9yaXpvbnRhbD1mYWxzZWDsnbTrqbQg7IOB7LihIO2MqOuEkC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNwcmV2XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBbZHVyYXRpb249b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcykgPGtvPu2MqOuEkCDsnbTrj5kg7JWg64uI66mU7J207IWYIOynhO2WiSDsi5zqsIQo64uo7JyEOiBtcyk8L2tvPlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2JlZm9yZUZsaWNrU3RhcnRcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrXG5cdCAqIEBmaXJlcyBlZy5GbGlja2luZyNmbGlja0VuZFxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI21vdmVUb1xuXHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0ICovXG5cdHByZXYoZHVyYXRpb24pIHtcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuZ2V0UHJldkluZGV4KCk7XG5cblx0XHRpZiAodHlwZW9mIGluZGV4ICE9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX21vdmVUbyhpbmRleCwgZHVyYXRpb24sIEF4ZXMuRElSRUNUSU9OX0xFRlQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1vdmVzIHRvIHRoZSBwYW5lbCBpbiB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIGBub1ZhbHVlYC4gSWYgbm9WYWx1ZSBpcyBlcXVhbCB0byB0aGUgY3VycmVudCBsb2dpY2FsIGluZGV4IG51bWJlcmluZywgbm8gYWN0aW9uIGlzIHRha2VuLiBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0sIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9LCBbZmxpY2tFbmRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kfSBldmVudHMgb2NjdXIgb25lIGFmdGVyIHRoZSBvdGhlci5cblx0ICogQGtvIGBub1ZhbHVlYOyXkCDsp4DsoJXtlZwg7Iic7ISc7J2YIO2MqOuEkOuhnCDsnbTrj5ntlZzri6QuIGBub1ZhbHVlYOqwkuydtCDtmITsnqzsnZgg64W866as7KCBIOyduOuNseyKpCDrsojtmLjsmYAg6rCZ64uk66m0IOyVhOustOuPmeyekSDtlZjsp4Ag7JWK64qU64ukLiBbYmVmb3JlRmxpY2tTdGFydF17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlRmxpY2tTdGFydH0sIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9LCBbZmxpY2tFbmRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrRW5kfSDsnbTrsqTtirjqsIAg7LCo66GA66GcIOuwnOyDne2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNtb3ZlVG9cblx0ICogQHBhcmFtIHtOdW1iZXJ9IG5vVmFsdWUgVGhlIGxvZ2ljYWwgaW5kZXggbnVtYmVyIG9mIHRoZSBwYW5lbCBlbGVtZW50IHRvIGJlIG1vdmVkLiAoQmFzZWQgb24gdGhlIGRlZmluZWQgb3JkZXIgb2YgdGhlIHBhbmVsIGVsZW1lbnRzLik8a28+7J2064+Z7ZWgIO2MqOuEkCDsmpTshozsnZgg64W866as7KCBIOyduOuNseyKpCDrsojtmLguIChbZ2V0SW5kZXgoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0SW5kZXh966mU7ISc65OcIOywuOyhsC4pPC9rbz5cblx0ICogQHBhcmFtIHtOdW1iZXJ9IFtkdXJhdGlvbj1vcHRpb25zLmR1cmF0aW9uXSBEdXJhdGlvbiBvZiB0aGUgcGFuZWwgbW92ZW1lbnQgKHVuaXQ6IG1zKSA8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjYmVmb3JlRmxpY2tTdGFydFxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2ZsaWNrRW5kXG5cdCAqIEBzZWUgZWcuRmxpY2tpbmcjcHJldlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI25leHRcblx0ICovXG5cdG1vdmVUbyhub1ZhbHVlLCBkdXJhdGlvbikge1xuXHRcdHJldHVybiB0aGlzLl9tb3ZlVG8obm9WYWx1ZSwgZHVyYXRpb24pO1xuXHR9XG5cdF9tb3ZlVG8obm9WYWx1ZSwgZHVyYXRpb24sIGRpcmVjdGlvbikge1xuXHRcdGNvbnN0IGNvbmYgPSB0aGlzLl9jb25mO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBjaXJjdWxhciA9IHRoaXMub3B0aW9ucy5jaXJjdWxhcjtcblx0XHRjb25zdCBjdXJyZW50SW5kZXggPSBwYW5lbC5pbmRleDtcblx0XHRsZXQgaW5kZXhUb01vdmU7XG5cdFx0bGV0IGlzUG9zaXRpdmU7XG5cdFx0bGV0IG5vID0gbm9WYWx1ZTtcblxuXHRcdG5vID0gdXRpbHMuZ2V0TnVtVmFsdWUobm8sIC0xKTtcblxuXHRcdGlmIChubyA8IDAgfHwgbm8gPj0gcGFuZWwub3JpZ0NvdW50IHx8IG5vID09PSBwYW5lbC5ubyB8fFxuXHRcdFx0cGFuZWwuYW5pbWF0aW5nIHx8IGNvbmYudG91Y2guaG9sZGluZykge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aW5kZXhUb01vdmUgPSBubyAtIChjaXJjdWxhciA/IHBhbmVsLm5vIDogY3VycmVudEluZGV4KTtcblx0XHRpZiAoZGlyZWN0aW9uID09PSBBeGVzLkRJUkVDVElPTl9SSUdIVCAmJiBpbmRleFRvTW92ZSA8IDApIHtcblx0XHRcdGluZGV4VG9Nb3ZlICs9IHBhbmVsLm9yaWdDb3VudDtcblx0XHR9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gQXhlcy5ESVJFQ1RJT05fTEVGVCAmJiBpbmRleFRvTW92ZSA+IDApIHtcblx0XHRcdGluZGV4VG9Nb3ZlIC09IHBhbmVsLm9yaWdDb3VudDtcblx0XHR9XG5cdFx0aXNQb3NpdGl2ZSA9IGluZGV4VG9Nb3ZlID4gMDtcblxuXHRcdC8vIGNoZWNrIGZvciByZWFsIHBhbmVsIGNvdW50IHdoaWNoIGNhbiBiZSBtb3ZlZCBvbiBlYWNoIHNpZGVzIGluIGNpcmN1bGFyIG1vZGVcblx0XHRpZiAoY2lyY3VsYXIgJiZcblx0XHRcdE1hdGguYWJzKGluZGV4VG9Nb3ZlKSA+XG5cdFx0XHQoaXNQb3NpdGl2ZSA/IHBhbmVsLmNvdW50IC0gKGN1cnJlbnRJbmRleCArIDEpIDogY3VycmVudEluZGV4KSkge1xuXHRcdFx0aW5kZXhUb01vdmUgKz0gKGlzUG9zaXRpdmUgPyAtMSA6IDEpICogcGFuZWwuY291bnQ7XG5cdFx0XHRpc1Bvc2l0aXZlID0gaW5kZXhUb01vdmUgPiAwO1xuXHRcdH1cblxuXHRcdHRoaXMuX3NldFBhbmVsTm8oY2lyY3VsYXIgPyB7bm99IDoge25vLCBpbmRleDogbm99KTtcblx0XHR0aGlzLl9jb25mLmluZGV4VG9Nb3ZlID0gaW5kZXhUb01vdmU7XG5cdFx0dGhpcy5fc2V0VmFsdWVUb01vdmUoaXNQb3NpdGl2ZSk7XG5cblx0XHR0aGlzLl9tb3ZlUGFuZWxCeVBoYXNlKFxuXHRcdFx0Y2lyY3VsYXIgPyBcInNldEJ5XCIgOiBcInNldFRvXCIsXG5cdFx0XHRwYW5lbC5zaXplICogKGNpcmN1bGFyID8gaW5kZXhUb01vdmUgOiBubyksXG5cdFx0XHRkdXJhdGlvblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBsZW5ndGggb2YgdGhlIHBhbmVsIGlzIHVwZGF0ZWQgYWNjb3JkaW5nIHRvIHRoZSBiYXNlIGVsZW1lbnQuIElmIGBob3Jpem9udGFsPXRydWVgIGlzIGhvcml6b250YWwuIElmIGBob3Jpem9udGFsPWZhbHNlYCBpcyB2ZXJ0aWNhbC5cblx0ICogQGtvIO2MqOuEkOydmCDqsIDroZwg7Zi57J2AIOyEuOuhnCDquLjsnbTrpbwg6riw7KSA7JqU7IaM7JeQIOunnuy2sCDqsLHsi6DtlZzri6QuIGBob3Jpem9udGFsPXRydWVg7J2066m0IOqwgOuhnCwgYGhvcml6b250YWw9ZmFsc2Vg7J2066m0IOyEuOuhnC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNyZXNpemVcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZjxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIsIHtcblx0ICogXHRwcmV2aWV3UGFkZGluZzogWzEwLCAxMF1cblx0ICogfSk7XG5cdCAqXG5cdCAqIC8vIFdoZW4gZGV2aWNlIG9yaWVudGFpb24gY2hhbmdlcy5cblx0ICogLy8g64uo66eQ6riw66W8IO2ajOyghO2WiOydhCDrlYwuXG5cdCAqIGZsaWNrLnJlc2l6ZSgpO1xuXHQgKlxuXHQgKiAvLyBPciB3aGVuIGNoYW5nZXMgcHJldmlld1BhZGRpbmcgb3B0aW9uIGZyb20gaXRzIG9yaWdpbmFsIHZhbHVlLlxuXHQgKiAvLyDrmJDripQgcHJldmlld1BhZGRpbmfsmLXshZjqsJLsnYQg67OA6rK97ZaI7J2EIOuVjC5cblx0ICogZmxpY2sub3B0aW9ucy5wcmV2aWV3UGFkZGluZyA9IFsyMCwgMzBdO1xuXHQgKiBmbGljay5yZXNpemUoKTtcblx0ICovXG5cdHJlc2l6ZSgpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXHRcdGNvbnN0IHBhbmVsID0gY29uZi5wYW5lbDtcblx0XHRjb25zdCBob3Jpem9udGFsID0gb3B0aW9ucy5ob3Jpem9udGFsO1xuXHRcdGNvbnN0IHVzZVRyYW5zbGF0ZSA9IG9wdGlvbnMudXNlVHJhbnNsYXRlO1xuXHRcdGxldCBwYW5lbFNpemU7XG5cblx0XHRpZiAoIXRoaXMuaXNQbGF5aW5nKCkpIHtcblx0XHRcdGlmICh1dGlscy5pc0FycmF5KG9wdGlvbnMucHJldmlld1BhZGRpbmcpICYmIHR5cGVvZigrb3B0aW9ucy5wcmV2aWV3UGFkZGluZy5qb2luKFwiXCIpKSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHR0aGlzLl9zZXRQYWRkaW5nKG9wdGlvbnMucHJldmlld1BhZGRpbmcuY29uY2F0KCkpO1xuXHRcdFx0XHRwYW5lbFNpemUgPSBwYW5lbC5zaXplO1xuXHRcdFx0fSBlbHNlIGlmIChob3Jpem9udGFsKSB7XG5cdFx0XHRcdHBhbmVsU2l6ZSA9IHBhbmVsLnNpemUgPSB1dGlscy5jc3ModGhpcy4kd3JhcHBlciwgXCJ3aWR0aFwiLCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVzaXplIHBhbmVsIGVsZW1lbnRzXG5cdFx0XHR1dGlscy5jc3MocGFuZWwuJGxpc3QsIHtcblx0XHRcdFx0W2hvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiXTogdXRpbHMuZ2V0VW5pdFZhbHVlKHBhbmVsU2l6ZSlcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZW1vdmUgZGF0YS1oZWlnaHQgYXR0cmlidXRlIGFuZCByZS1ldmFsdWF0ZSBwYW5lbCdzIGhlaWdodFxuXHRcdFx0aWYgKG9wdGlvbnMuYWRhcHRpdmVIZWlnaHQpIHtcblx0XHRcdFx0Y29uc3QgJHBhbmVsID0gdGhpcy4kY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYFske0RBVEFfSEVJR0hUfV1gKTtcblxuXHRcdFx0XHRpZiAoJHBhbmVsLmxlbmd0aCkge1xuXHRcdFx0XHRcdHV0aWxzLnRvQXJyYXkoJHBhbmVsKVxuXHRcdFx0XHRcdFx0LmZvckVhY2godiA9PiB2LnJlbW92ZUF0dHJpYnV0ZShEQVRBX0hFSUdIVCkpO1xuXG5cdFx0XHRcdFx0dGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9heGVzSW5zdC5heGlzLmZsaWNrLnJhbmdlID0gWzAsIHBhbmVsU2l6ZSAqIChwYW5lbC5jb3VudCAtIDEpXTtcblx0XHRcdHRoaXMuX3NldEF4ZXMoXCJzZXRUb1wiLCBwYW5lbFNpemUgKiBwYW5lbC5pbmRleCwgMCk7XG5cblx0XHRcdGlmICghdXNlVHJhbnNsYXRlKSB7XG5cdFx0XHRcdHRoaXMuX2FwcGx5UGFuZWxzUG9zKCk7XG5cdFx0XHRcdHRoaXMuX2FkanVzdENvbnRhaW5lckNzcyhcImVuZFwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdGhlIHBhbmVsIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvbi4gKEl0IG9ubHkgd29ya3Mgd2hlbiB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IGV2ZW50IGlzIGNhbmNlbGVkLikgW2JlZm9yZVJlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZVJlc3RvcmV9LCBbZmxpY2tde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmZsaWNrfSwgW3Jlc3RvcmVde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmV9IGV2ZW50cyBhcmUgb2NjdXIgaW4gb3JkZXIuXG5cdCAqIEBrbyDtjKjrhJDsnZgg7JyE7LmY66W8IOybkOuemCDsnpDrpqzroZwg65CY64+M66aw64ukLiAoW2JlZm9yZUZsaWNrU3RhcnRde0BsaW5rIGVnLkZsaWNraW5nI2V2ZW50OmJlZm9yZUZsaWNrU3RhcnR9IOydtOuypO2KuOydmCDquLDrs7jrj5nsnpHsnYQg7Leo7IaM7ZWcIOqyveyasOyXkOunjCDrj5nsnpHtlaguKSBbYmVmb3JlUmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZX0sIFtmbGlja117QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2t9LCBbcmVzdG9yZV17QGxpbmsgZWcuRmxpY2tpbmcjZXZlbnQ6cmVzdG9yZX0g7J2067Kk7Yq46rCAIOywqOuhgOuhnCDrsJzsg53tlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcmVzdG9yZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gW2R1cmF0aW9uVmFsdWU9b3B0aW9ucy5kdXJhdGlvbl0gRHVyYXRpb24gb2YgdGhlIHBhbmVsIG1vdmVtZW50ICh1bml0OiBtcyk8a28+7Yyo64SQIOydtOuPmSDslaDri4jrqZTsnbTshZgg7KeE7ZaJIOyLnOqwhCjri6jsnIQ6IG1zKTwva28+XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGY8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZXZlbnQ6YmVmb3JlUmVzdG9yZVxuXHQgKiBAZmlyZXMgZWcuRmxpY2tpbmcjZXZlbnQ6ZmxpY2tcblx0ICogQGZpcmVzIGVnLkZsaWNraW5nI2V2ZW50OnJlc3RvcmVcblx0ICogQGV4YW1wbGVcblx0ICogbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpLm9uKFwiYmVmb3JlRmxpY2tTdGFydFwiLCBlID0+IHtcblx0ICogXHRpZiAoZS5ubyA9PT0gMikge1xuXHQgKiBcdFx0Ly8gQ2FuY2VscyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUgJ2JlZm9yZUZsaWNrU3RhcnQnIGV2ZW50LlxuXHQgKiBcdFx0Ly8gJ2JlZm9yZUZsaWNrU3RhcnQnIOydtOuypO2KuCDquLDrs7jrj5nsnpEg7Leo7IaMLlxuXHQgKiBcdFx0ZS5zdG9wKCk7XG5cdCAqXG5cdCAqIFx0XHQvLyBSZXR1cm4gdG8gb3JpZ2luYWwgcG9zaXRpb24uXG5cdCAqIFx0XHQvLyDsm5Drnpgg7J6Q66as66GcIOuQmOuPjOumvC5cblx0ICogXHRcdHRoaXMucmVzdG9yZSgxMDApO1xuXHQgKiBcdH1cblx0ICogfSk7XG5cdCAqL1xuXHRyZXN0b3JlKGR1cmF0aW9uVmFsdWUpIHtcblx0XHRjb25zdCBjb25mID0gdGhpcy5fY29uZjtcblx0XHRjb25zdCBwYW5lbCA9IGNvbmYucGFuZWw7XG5cdFx0Y29uc3QgY3VyclBvcyA9IHRoaXMuX2F4ZXNJbnN0LmdldCgpLmZsaWNrO1xuXHRcdGxldCBkdXJhdGlvbiA9IGR1cmF0aW9uVmFsdWU7XG5cdFx0bGV0IGRlc3RQb3M7XG5cblx0XHQvLyBjaGVjayBpZiB0aGUgcGFuZWwgaXNuJ3QgaW4gcmlnaHQgcG9zaXRpb25cblx0XHRpZiAoY3VyclBvcyAhPT0gcGFuZWwuY3VyckluZGV4ICogcGFuZWwuc2l6ZSkge1xuXHRcdFx0Y29uZi5jdXN0b21FdmVudC5yZXN0b3JlQ2FsbCA9IHRydWU7XG5cdFx0XHRkdXJhdGlvbiA9IHV0aWxzLmdldE51bVZhbHVlKGR1cmF0aW9uLCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xuXG5cdFx0XHR0aGlzLl9yZXZlcnRQYW5lbE5vKCk7XG5cdFx0XHRkZXN0UG9zID0gcGFuZWwuc2l6ZSAqIHBhbmVsLmluZGV4O1xuXG5cdFx0XHR0aGlzLl90cmlnZ2VyQmVmb3JlUmVzdG9yZSh7ZGVwYVBvczogY3VyclBvcywgZGVzdFBvc30pO1xuXHRcdFx0dGhpcy5fc2V0QXhlcyhcInNldFRvXCIsIGRlc3RQb3MsIGR1cmF0aW9uKTtcblxuXHRcdFx0aWYgKCFkdXJhdGlvbikge1xuXHRcdFx0XHR0aGlzLl9hZGp1c3RDb250YWluZXJDc3MoXCJlbmRcIik7XG5cdFx0XHRcdHRoaXMuX3RyaWdnZXJSZXN0b3JlKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHRvIGhhbmRsZSBvbiBhcGkgY2FsbFxuXHRcdH0gZWxzZSBpZiAocGFuZWwuY2hhbmdlZCkge1xuXHRcdFx0dGhpcy5fcmV2ZXJ0UGFuZWxObygpO1xuXHRcdFx0Y29uZi50b3VjaC5kaXN0YW5jZSA9IGNvbmYuaW5kZXhUb01vdmUgPSAwO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnB1dCBmcm9tIHRoZSBpbnB1dCBkZXZpY2UgaXMgbm90IGJsb2NrZWQgc28gdGhhdCB0aGUgcGFuZWwgY2FuIGJlIG1vdmVkIGJ5IHRoZSBpbnB1dCBkZXZpY2UuXG5cdCAqIEBrbyDrp4nslZjrjZgg7J6F66ClIOyepey5mOuhnOu2gO2EsOydmCDsnoXroKXsnYQg7ZG864ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2VuYWJsZUlucHV0XG5cdCAqIEByZXR1cm4ge2VnLkZsaWNraW5nfSBBbiBpbnN0YW5jZSBvZiBhIG1vZHVsZSBpdHNlbGYgPGtvPuuqqOuTiCDsnpDsi6DsnZgg7J247Iqk7YS07IqkPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNkaXNhYmxlSW5wdXRcblx0ICovXG5cdGVuYWJsZUlucHV0KCkge1xuXHRcdHRoaXMuX3BhbklucHV0LmVuYWJsZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBpbnB1dCBmcm9tIHRoZSBpbnB1dCBkZXZpY2UgaXMgYmxvY2tlZCBzbyB0aGF0IHRoZSBwYW5lbCBpcyBub3QgbW92ZWQgYnkgdGhlIGlucHV0IGRldmljZS5cblx0ICogQGtvIO2MqOuEkOydtCDsnoXroKUg7J6l7LmY7JeQIOydmO2VtCDsm4Dsp4HsnbTsp4Ag7JWK64+E66GdIOyeheugpSDsnqXsuZjroZzrtoDthLDsnZgg7J6F66Cl7J2EIOunieuKlOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNkaXNhYmxlSW5wdXRcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKiBAc2VlIGVnLkZsaWNraW5nI2VuYWJsZUlucHV0XG5cdCAqL1xuXHRkaXNhYmxlSW5wdXQoKSB7XG5cdFx0dGhpcy5fcGFuSW5wdXQuZGlzYWJsZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCBjdXJyZW50IGZsaWNraW5nIHN0YXR1cy4gSWYgdGhlIHJldHVybmVkIHZhbHVlIGlzIHNwZWNpZmllZCBhcyBhIFtzZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjc2V0U3RhdHVzfSBtZXRob2QgYXJndW1lbnQsIGl0IGNhbiBiZSByZXR1cm5lZCB0byBpdHMgdmFsdWUgc3RhdGUuXG5cdCAqIEBrbyDtmITsnqwg7IOB7YOcIOqwkuydhCDrsJjtmZjtlZzri6QuIOuwmO2ZmOuwm+ydgCDqsJLsnYQgW3NldFN0YXR1cygpXXtAbGluayBlZy5GbGlja2luZyNzZXRTdGF0dXN9IOuplOyEnOuTnCDsnbjsnpDroZwg7KeA7KCV7ZWY66m0IOq3uCDqsJIg7IOB7YOc66GcIOuQmOuPjOumtCDsiJgg7J6I64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI2dldFN0YXR1c1xuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IFtzdHJpbmdpZnldIFNldCB0cnVlIGlmIHdhbnQgZ2V0IHN0cmluZ2lmaWVkIHN0YXR1cyB2YWx1ZS48a28+dHJ1ZSDsp4DsoJXsi5wganNvbuusuOyekOyXtCDtmJXtg5zroZwg67CY7ZmY7ZWc64ukLjwva28+XG5cdCAqIEByZXR1cm4ge1N0YXR1c3xTdHJpbmd9IEFuIG9iamVjdCB3aXRoIGN1cnJlbnQgc3RhdGUgdmFsdWUgaW5mb3JtYXRpb24uPGtvPu2YhOyerCDsg4Htg5zqsJIg7KCV67O066W8IOqwgOynhCDqsJ3ssrQuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNzZXRTdGF0dXNcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG5cdCAqIGNvbnN0IHN0YXR1cyA9IGZsaWNrLmdldFN0YXR1cygpO1xuXHQgKiBjb25zdCBqc29uU3RhdXMgPSBmbGljay5nZXRTdGF0dXModHJ1ZSk7XG5cdCAqXG5cdCAqIGNvbnNvbGUubG9nKHN0YXR1cyk7IC8vIHtwYW5lbDogey4uLn0sICRsaXN0OiBBcnJheSg3KX1cblx0ICogY29uc29sZS5sb2coanNvblN0YXR1cyk7IC8vIFwie1xcXCJwYW5lbFxcXCI6e1xcXCJpbmRleFxcXCI6MyxcXFwibm9cXFwiOjYsXFxcImN1cnJJbmRleFxcXCI6MyxcXFwiY3Vyck5vXFxcIjo2fSxcXFwiJGxpc3RcXFwiOlt7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1NSwgNDksIDEzNyk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAzJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTEsIDE3MiwgOTEpOyBwb3NpdGlvbjogYWJzb2x1dGU7ICBoZWlnaHQ6IDEwMCU7XFxcIixcXFwiY2xhc3NOYW1lXFxcIjpcXFwiZWctZmxpY2stcGFuZWxcXFwiLFxcXCJodG1sXFxcIjpcXFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0XFx0Jmx0O3AmZ3Q7cGFuZWwgNCZsdDsvcCZndDtcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXFwifSx7XFxcInN0eWxlXFxcIjpcXFwiYmFja2dyb3VuZC1jb2xvcjogcmdiKDExNiwgMzgsIDI0MSk7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCA1Jmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQxLCAxMzksIDI0KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDYmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYigyMDQsIDEwMiwgMjA0KTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDAmbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn0se1xcXCJzdHlsZVxcXCI6XFxcImJhY2tncm91bmQtY29sb3I6IHJnYig1NCwgNTMsIDE1Nik7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIGhlaWdodDogMTAwJTtcXFwiLFxcXCJjbGFzc05hbWVcXFwiOlxcXCJlZy1mbGljay1wYW5lbFxcXCIsXFxcImh0bWxcXFwiOlxcXCJcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHRcXHQmbHQ7cCZndDtwYW5lbCAxJmx0Oy9wJmd0O1xcblxcdFxcdFxcdFxcdFxcdFxcdFxcXCJ9LHtcXFwic3R5bGVcXFwiOlxcXCJiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTk2LCAyMTgsIDcyKTsgcG9zaXRpb246IGFic29sdXRlOyAgaGVpZ2h0OiAxMDAlO1xcXCIsXFxcImNsYXNzTmFtZVxcXCI6XFxcImVnLWZsaWNrLXBhbmVsXFxcIixcXFwiaHRtbFxcXCI6XFxcIlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdFxcdCZsdDtwJmd0O3BhbmVsIDImbHQ7L3AmZ3Q7XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFxcIn1dfVwiXG5cdCAqL1xuXHQvKipcblx0ICogVGhlIHJldHVybiB2YWx1ZSBzcGVjaWZpY2F0aW9uIG9mIHRoZSBnZXRTdGF0dXMgKCkgbWV0aG9kLlxuXHQgKiBAa28gZ2V0U3RhdHVzKCkg66mU7ISc65Oc7J2YIOuwmO2ZmOqwkiDrqoXshLguXG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IFN0YXR1c1xuXHQgKiBAcHJvcGVydHkge09iamVjdH0gcGFuZWwgY3VycmVudCBwYW5lbCBwb3NpdGlvbjxrbz7tmITsnqwg7Yyo64SQIOychOy5mDwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5pbmRleCBQaHlzaWNhbCBpbmRleCBudW1iZXIuPGtvPuusvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5jdXJySW5kZXggQ3VycmVudCBwaHlzaWNhbCBpbmRleCBudW1iZXIuPGtvPu2YhOyerCDrrLzrpqzsoIEg7J24642x7IqkIOuyiO2YuC48L2tvPlxuXHQgKiBAcHJvcGVydHkge051bWJlcn0gcGFuZWwubm8gTG9naWNhbCBpbmRleCBudW1iZXIuPGtvPuuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYW5lbC5jdXJyTm8gQ3VycmVudCBsb2dpY2FsIGluZGV4IG51bWJlci48a28+7ZiE7J6sIOuFvOumrOyggSDsnbjrjbHsiqQg67KI7Zi4Ljwva28+XG5cdCAqIEBwcm9wZXJ0eSB7QXJyYXkuPHtzdHlsZTogU3RyaW5nLCBjbGFzc05hbWU6IFN0cmluZywgaHRtbDogU3RyaW5nfT59ICRsaXN0IHBhbmVsJ3MgaHRtbDxrbz7tjKjrhJAg7KCV67O0PC9rbz5cblx0ICogQHByb3BlcnR5IHtPYmplY3R9ICRsaXN0Lm9iaiBGb3IgY29udmVuaWVuY2UsIHRoZSBlbGVtZW50IGlzIGRlbm90ZWQgYnkgb2JqLjxrbz7tjrjsnZjsg4Eg7JuQ7IaM66W8IG9iauuhnCDtkZzquLDtlag8L2tvPlxuXHQgKiBAcHJvcGVydHkge1N0cmluZ30gJGxpc3Qub2JqLnN0eWxlIFRoZSB2YWx1ZSBvZiB0aGUgc3R5bGUgYXR0cmlidXRlIG9mIHRoZSBwYW5lbCBlbGVtZW50LiAoJ3RyYW5zZm9ybScsICdsZWZ0JywgJ3RvcCcsICd3aWxsLWNoYW5nZScsICdib3gtc2l6aW5nJywgJ3dpZHRoJyBzdHlsZSBoYXMgYmVlbiBkZWxldGVkLik8a28+7Yyo64SQIOyalOyGjOydmCBzdHlsZSDsho3shLEg6rCSLiAoJ3RyYW5zZm9ybScsICdsZWZ0JywgJ3RvcCcsICd3aWxsLWNoYW5nZScsICdib3gtc2l6aW5nJywgJ3dpZHRoJyBzdHlsZeydgCDsgq3soJzrkKgpPC9rbz5cblx0ICogQHByb3BlcnR5IHtTdHJpbmd9ICRsaXN0Lm9iai5jbGFzc05hbWUgVGhlIGNsYXNzIG5hbWUgb2YgdGhlIHBhbmVsIGVsZW1lbnQuPGtvPu2MqOuEkCDsmpTshozsnZggY2xhc3Mg7J2066aELjwva28+XG5cdCAqIEBwcm9wZXJ0eSB7U3RyaW5nfSAkbGlzdC5vYmouaHRtbCBUaGUgaW5uZXJIVE1MIHZhbHVlIG9mIHRoZSBwYW5lbCBlbGVtZW50Ljxrbz7tjKjrhJAg7JqU7IaM7J2YIGlubmVySFRNTCDqsJIuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRJbmRleFxuXHQgKi9cblx0Z2V0U3RhdHVzKHN0cmluZ2lmeSkge1xuXHRcdGNvbnN0IHBhbmVsID0gdGhpcy5fY29uZi5wYW5lbDtcblx0XHRjb25zdCByeFN0eWxlID0gLygoPzotd2Via2l0LSk/dHJhbnNmb3JtfGxlZnR8dG9wfHdpbGwtY2hhbmdlfGJveC1zaXppbmd8d2lkdGgpOlteO10qOy9nO1xuXHRcdGNvbnN0IHN0YXR1cyA9IHtcblx0XHRcdC8vIGN1cnJlbnQgcGFuZWwgcG9zaXRpb25cblx0XHRcdHBhbmVsOiB7XG5cdFx0XHRcdGluZGV4OiBwYW5lbC5pbmRleCxcblx0XHRcdFx0bm86IHBhbmVsLm5vLFxuXHRcdFx0XHRjdXJySW5kZXg6IHBhbmVsLmN1cnJJbmRleCxcblx0XHRcdFx0Y3Vyck5vOiBwYW5lbC5jdXJyTm9cblx0XHRcdH0sXG5cblx0XHRcdC8vIHBhbmVsJ3MgaHRtbFxuXHRcdFx0JGxpc3Q6IHBhbmVsLiRsaXN0Lm1hcCh2ID0+ICh7XG5cdFx0XHRcdHN0eWxlOiB2LnN0eWxlLmNzc1RleHQucmVwbGFjZShyeFN0eWxlLCBcIlwiKS50cmltKCksXG5cdFx0XHRcdGNsYXNzTmFtZTogdi5jbGFzc05hbWUsXG5cdFx0XHRcdGh0bWw6IHYuaW5uZXJIVE1MXG5cdFx0XHR9KSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHN0cmluZ2lmeSA/XG5cdFx0XHRKU09OLnN0cmluZ2lmeShzdGF0dXMpIDogc3RhdHVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RvcmUgdG8gdGhlIHN0YXRlIG9mIHRoZSBgc3RhdHVzVmFsdWVgLlxuXHQgKiBAa28gYHN0YXR1c1ZhbHVlYOydmCDsg4Htg5zroZwg67O17JuQ7ZWc64ukLlxuXHQgKiBAbWV0aG9kIGVnLkZsaWNraW5nI3NldFN0YXR1c1xuXHQgKiBAcGFyYW0ge1N0YXR1c3xTdHJpbmd9IHN0YXR1c1ZhbHVlIFN0YXR1cyB2YWx1ZSB0byBiZSByZXN0b3JlZC4gWW91IGNhbiBzcGVjaWZ5IHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIFtnZXRTdGF0dXMoKV17QGxpbmsgZWcuRmxpY2tpbmcjZ2V0U3RhdHVzfSBtZXRob2QuPGtvPuuzteybkO2VoCDsg4Htg5wg6rCSLiBbZ2V0U3RhdHVzKClde0BsaW5rIGVnLkZsaWNraW5nI2dldFN0YXR1c33rqZTshJzrk5wg67CY7ZmY6rCS7J2EIOyngOygle2VmOuptCDrkJzri6QuPC9rbz5cblx0ICogQHNlZSBlZy5GbGlja2luZyNnZXRTdGF0dXNcblx0ICogQGV4YW1wbGVcblx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoXCIjZmxpY2tcIik7XG5cdCAqIGNvbnN0IHN0YXR1cyA9IGZsaWNrLmdldFN0YXR1cygpO1xuXHQgKlxuXHQgKiAvLyBNb3ZlIHRvIGFyYml0cmFyeSBwYW5lbC5cblx0ICogLy8g7J6E7J2YIO2MqOuEkOuhnCDsnbTrj5lcblx0ICogZmxpY2subW92ZVRvKDIpO1xuXHQgKlxuXHQgKiAvLyBSZXN0b3JlIHRvIHN0YXR1cy5cblx0ICogLy8gc3RhdHVzIOyDge2DnOuhnCDrs7Xsm5Bcblx0ICogZmxpY2suc2V0U3RhdHVzKHN0YXR1cyk7XG5cdCAqL1xuXHRzZXRTdGF0dXMoc3RhdHVzVmFsdWUpIHtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3QgaXNBZGFwdGl2ZUhlaWdodCA9IHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodDtcblx0XHRjb25zdCBzdGF0dXMgPSB0eXBlb2Ygc3RhdHVzVmFsdWUgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0SlNPTi5wYXJzZShzdGF0dXNWYWx1ZSkgOiBzdGF0dXNWYWx1ZTtcblxuXHRcdGlmIChzdGF0dXMpIHtcblx0XHRcdGZvciAoY29uc3QgeCBpbiBzdGF0dXMucGFuZWwpIHtcblx0XHRcdFx0eCBpbiBwYW5lbCAmJiAocGFuZWxbeF0gPSBzdGF0dXMucGFuZWxbeF0pO1xuXHRcdFx0fVxuXG5cdFx0XHRwYW5lbC4kbGlzdC5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGRhdGEgPSBzdGF0dXMuJGxpc3RbaV07XG5cdFx0XHRcdGNvbnN0IHN0eWxlID0gZGF0YS5zdHlsZTtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gZGF0YS5jbGFzc05hbWU7XG5cdFx0XHRcdGNvbnN0IGh0bWwgPSBkYXRhLmh0bWw7XG5cblx0XHRcdFx0c3R5bGUgJiYgKHYuc3R5bGUuY3NzVGV4dCArPSBzdHlsZSk7XG5cdFx0XHRcdGNsYXNzTmFtZSAmJiAodi5jbGFzc05hbWUgPSBjbGFzc05hbWUpO1xuXHRcdFx0XHRodG1sICYmICh2LmlubmVySFRNTCA9IGh0bWwpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlzQWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5fc2V0QWRhcHRpdmVIZWlnaHQoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgYW5kIGl0cyBjaGlsZHJlbiB0byB0aGUgc3RhdGUgdGhleSB3ZXJlIGluIGJlZm9yZSB0aGUgaW5zdGFuY2Ugd2FzIGNyZWF0ZWQuIFJlbW92ZSBhbGwgYXR0YWNoZWQgZXZlbnQgaGFuZGxlcnMuIFNwZWNpZnkgYG51bGxgIGZvciBhbGwgYXR0cmlidXRlcyBvZiB0aGUgaW5zdGFuY2UgKGluY2x1ZGluZyBpbmhlcml0ZWQgYXR0cmlidXRlcykuPGJyPklmIHBsdWdpbiBpc24ndCBlbXB0eSwgYWxzbyByZXNldCBhbGwgcGx1Z2lucyByZWdpc3RlcmVkLlxuXHQgKiBAa28g6riw7KSAIOyalOyGjOyZgCDqt7gg7ZWY7JyEIOyalOyGjOulvCDsnbjsiqTthLTsiqQg7IOd7ISx7KCE7J2YIOyDge2DnOuhnCDrkJjrj4zrprDri6QuIOu2gOywqeuQnCDrqqjrk6Ag7J2067Kk7Yq4IO2VuOuTpOufrOulvCDtg4jqsbDtlZzri6QuIOyduOyKpO2EtOyKpOydmCDrqqjrk6Ag7IaN7ISxKOyDgeyGjeuwm+ydgCDsho3shLHtj6ztlagp7JeQIGBudWxsYOydhCDsp4DsoJXtlZzri6QuPGJyPu2UjOufrOq3uOyduOydtCDruYTslrTsnojsp4Ag7JWK64uk66m0LCDtlIzrn6zqt7jsnbjrj4Qg66qo65GQIOumrOyFi+2VnOuLpC5cblx0ICogQG1ldGhvZCBlZy5GbGlja2luZyNkZXN0cm95XG5cdCAqIEBleGFtcGxlXG5cdCAqIGNvbnN0IGZsaWNrID0gbmV3IGVnLkZsaWNraW5nKFwiI2ZsaWNrXCIpO1xuXHQgKiBmbGljay5kZXN0cm95KCk7XG5cdCAqIGNvbnNvbGUubG9nKGZsaWNrLm1vdmVUbyk7IC8vIG51bGxcblx0ICovXG5cdGRlc3Ryb3koKSB7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuX2NvbmY7XG5cdFx0Y29uc3Qgb3JpZ1BhbmVsU3R5bGUgPSBjb25mLm9yaWdQYW5lbFN0eWxlO1xuXHRcdGNvbnN0IHdyYXBwZXIgPSBvcmlnUGFuZWxTdHlsZS53cmFwcGVyO1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IG9yaWdQYW5lbFN0eWxlLmNvbnRhaW5lcjtcblx0XHRjb25zdCBsaXN0ID0gb3JpZ1BhbmVsU3R5bGUubGlzdDtcblxuXHRcdC8vIHVuYmluZCBldmVudHNcblx0XHR0aGlzLl9iaW5kRXZlbnRzKGZhbHNlKTtcblx0XHR0aGlzLm9mZigpO1xuXG5cdFx0Ly8gZGVzdHJveSBlZy5BeGVzIGluc3RhbmNlXG5cdFx0dGhpcy5fYXhlc0luc3QuZGVzdHJveSgpO1xuXHRcdHRoaXMuX3BhbklucHV0LmRlc3Ryb3koKTtcblxuXHRcdC8vIHVud3JhcCBjb250YWluZXIgZWxlbWVudCBhbmQgcmVzdG9yZSBvcmlnaW5hbCBpbmxpbmUgc3R5bGVcblx0XHQvLyByZXN0b3JlIHdyYXBwZXIgc3R5bGVcblx0XHRjb25zdCAkd3JhcHBlciA9IHRoaXMuJHdyYXBwZXI7XG5cblx0XHQkd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB3cmFwcGVyLmNsYXNzTmFtZSk7XG5cdFx0JHdyYXBwZXJbd3JhcHBlci5zdHlsZSA/IFwic2V0QXR0cmlidXRlXCIgOiBcInJlbW92ZUF0dHJpYnV0ZVwiXShcInN0eWxlXCIsIHdyYXBwZXIuc3R5bGUpO1xuXG5cdFx0Ly8gcmVzdG9yZSBjb250YWluZXIgc3R5bGVcblx0XHRjb25zdCAkY29udGFpbmVyID0gdGhpcy4kY29udGFpbmVyO1xuXHRcdGNvbnN0ICRjaGlsZHJlbiA9IFtdXG5cdFx0XHQuc2xpY2UuY2FsbCgkY29udGFpbmVyLmNoaWxkcmVuKTtcblxuXHRcdGlmIChvcmlnUGFuZWxTdHlsZS5jb250YWluZXIuY2xhc3NOYW1lKSB7XG5cdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNvbnRhaW5lci5jbGFzc05hbWUpO1xuXHRcdFx0JGNvbnRhaW5lcltjb250YWluZXIuc3R5bGUgPyBcInNldEF0dHJpYnV0ZVwiIDogXCJyZW1vdmVBdHRyaWJ1dGVcIl0oXCJzdHlsZVwiLCBjb250YWluZXIuc3R5bGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkY2hpbGRyZW4uZm9yRWFjaCh2ID0+ICR3cmFwcGVyLmFwcGVuZENoaWxkKHYpKTtcblx0XHRcdCRjb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMCwgJGVsOyAoJGVsID0gJGNoaWxkcmVuW2ldKTsgaSsrKSB7XG5cdFx0XHRpZiAoaSA+IGxpc3QubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWwpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gbGlzdFtpXS5jbGFzc05hbWU7XG5cdFx0XHRcdGNvbnN0IHN0eWxlID0gbGlzdFtpXS5zdHlsZTtcblxuXHRcdFx0XHQkZWxbY2xhc3NOYW1lID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcblx0XHRcdFx0JGVsW3N0eWxlID8gXCJzZXRBdHRyaWJ1dGVcIiA6IFwicmVtb3ZlQXR0cmlidXRlXCJdKFwic3R5bGVcIiwgc3R5bGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIHJlbGVhc2UgcGx1Z2luIHJlc291cmNlc1xuXHRcdHRoaXMucGx1Z2lucy5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0dGhpcy5wbHVnaW5zW3ZdLiRjb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gcmVsZWFzZSByZXNvdXJjZXNcblx0XHRmb3IgKGNvbnN0IHggaW4gdGhpcykge1xuXHRcdFx0dGhpc1t4XSA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyIHBsdWdpbiB0byBiZSB1c2VkLlxuXHQgKiBAa28g7IKs7Jqp65CgIO2UjOufrOq3uOyduOydhCDrk7HroZ3tlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcGx1Z2luXG5cdCAqIEBleGFtcGxlXG5cdCAqIG5ldyBlZy5GbGlja2luZyhcIiNmbGlja1wiKS5wbHVnaW4oW1xuXHQgKiAgICAgbmV3IGVnLkZsaWNraW5nLnBsdWdpbi5PcGFjaXR5RWZmZWN0KFwic3BhblwiKSxcblx0ICogICAgIC4uLlxuXHQgKiBdKTtcblx0ICogQHJldHVybiB7ZWcuRmxpY2tpbmd9IEFuIGluc3RhbmNlIG9mIGEgbW9kdWxlIGl0c2VsZiA8a28+66qo65OIIOyekOyLoOydmCDsnbjsiqTthLTsiqQ8L2tvPlxuXHQgKi9cblx0cGx1Z2luKGxpc3QpIHtcblx0XHRsaXN0LmZvckVhY2gocCA9PiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEEgbGlzdCBvZiBwbHVnaW5zIHVzZWQuXG5cdFx0XHQgKiBAa28g7IKs7Jqp65CcIO2UjOufrOq3uOyduCDrqqnroZ1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBsdWdpbnMgQW4gYXJyYXkgb2YgcGx1Z2luIGluc3RhbmNlcyA8a28+7ZSM65+s6re47J24IOyduOyKpO2EtOyKpCDrsLDsl7Q8L2tvPlxuXHRcdFx0ICogQG5hbWUgcGx1Z2luc1xuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGluc3RhbmNlXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogY29uc3QgZmxpY2sgPSBuZXcgZWcuRmxpY2tpbmcoIC4uLiApLnBsdWdpbihbIC4uLiBdKTtcblx0XHRcdCAqXG5cdFx0XHQgKiBmbGljay5wbHVnaW5zOyAvLyBbIC4uLiBdIC0gYXJyYXkgb2YgcGx1Z2luc1xuXHRcdFx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdFx0XHQgKi9cblx0XHRcdGlmICh0aGlzLnBsdWdpbnMuZmlsdGVyKHYgPT4gdi5jb25zdHJ1Y3RvciA9PT0gcC5jb25zdHJ1Y3RvcikubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHRoaXMucGx1Z2lucy5wdXNoKHAuJGNvbXBvbmVudFdpbGxNb3VudCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWJ1aWxkL0luaXRpYWxpemUgcGFuZWxzIGJ5IGN1cnJlbnQgRE9NIG9mIHBhbmVscy5cblx0ICogQGtvIO2YhOyerCDtjKjrhJAgRE9NIOydhCDquLDspIDsnLzroZwg7Yyo64SQ7J2EIOyerOq1rOyEsS/stIjquLDtmZTtlZzri6QuXG5cdCAqIEBtZXRob2QgZWcuRmxpY2tpbmcjcmVidWlsZFxuXHQgKiBAZXhhbXBsZVxuXHQgKiBcdFx0ZmxpY2tpbmcucmVidWlsZCgpO1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtlZy5GbGlja2luZ30gQW4gaW5zdGFuY2Ugb2YgYSBtb2R1bGUgaXRzZWxmIDxrbz7rqqjrk4gg7J6Q7Iug7J2YIOyduOyKpO2EtOyKpDwva28+XG5cdCAqL1xuXHRyZWJ1aWxkKCkge1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuJGNvbnRhaW5lcjtcblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuX2NvbmYucGFuZWw7XG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblx0XHRjb25zdCBwcmVmaXggPSBvcHRpb25zLnByZWZpeDtcblxuXHRcdC8vIGZpbHRlciBvcmlnaW5hbCBwYW5lbCAocmVtb3ZlIGNsb25lcylcblx0XHR1dGlscy50b0FycmF5KGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGAuJHtwcmVmaXh9LWNsb25lYCkpLmZvckVhY2goZWwgPT4ge1xuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNoaWxkKGVsKTtcblx0XHR9KTtcblx0XHRwYW5lbC4kbGlzdCA9IHV0aWxzLnRvQXJyYXkoY29udGFpbmVyLmNoaWxkcmVuKTtcblxuXHRcdC8vIHBhbmVscycgY3NzIHZhbHVlc1xuXHRcdHRoaXMuX2luaXRPcmlnaW5hbFBhbmVsU3R5bGUocGFuZWwuJGxpc3QpO1xuXG5cdFx0Ly8gQWRkIGNsb25lc1xuXHRcdGlmICh0aGlzLl9hZGRDbG9uZVBhbmVscygpKSB7XG5cdFx0XHRwYW5lbC4kbGlzdCA9IHV0aWxzLnRvQXJyYXkoY29udGFpbmVyLmNoaWxkcmVuKTtcblx0XHR9XG5cblx0XHR0aGlzLl9zZXREZWZhdWx0UGFuZWwob3B0aW9ucy5kZWZhdWx0SW5kZXgpO1xuXHRcdHRoaXMuX2FycmFuZ2VQYW5lbHMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbGxlY3Rpb24gb2YgdXRpbGl0aWVzIHVzZWQgaW50ZXJuYWxseVxuXHQgKiBAa28g64K067aA7JeQ7IScIOyCrOyaqeuQmOuKlCDsnKDti7jrpqzti7Ag66qo7J2MXG5cdCAqIEBuYW1lIHV0aWxzXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0c3RhdGljIHV0aWxzID0gdXRpbHM7XG5cdC8qKlxuXHQgKiBWZXJzaW9uIGluZm8gc3RyaW5nXG5cdCAqIEBrbyDrsoTsoITsoJXrs7Qg66y47J6Q7Je0XG5cdCAqIEBuYW1lIFZFUlNJT05cblx0ICogQHN0YXRpY1xuXHQgKiBAdHlwZSB7U3RyaW5nfVxuXHQgKiBAZXhhbXBsZVxuXHQgKiBlZy5GbGlja2luZy5WRVJTSU9OOyAgLy8gZXgpIDIuMi4wXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKi9cblx0c3RhdGljIFZFUlNJT04gPSBcIjIuNS4wLXNuYXBzaG90XCI7XG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSB1c2VkIGludGVybmFsbHlcblx0ICogQGtvIOuCtOu2gOyXkOyEnCDsgqzsmqnrkJjripQg7IOB7IiYIOqwklxuXHQgKiBAbmFtZSBjb25zdHNcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRzdGF0aWMgY29uc3RzID0ge1xuXHRcdEVWRU5UUyxcblx0XHRUUkFOU0ZPUk0sXG5cdFx0U1VQUE9SVF9XSUxMQ0hBTkdFLFxuXHRcdElTX0FORFJPSUQyXG5cdH07XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBub25lIGRpcmVjdGlvbi5cblx0ICogQGtvIG5vbmUg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fTk9ORVxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMVxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9OT05FID0gQXhlcy5ESVJFQ1RJT05fTk9ORTtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIGxlZnQgZGlyZWN0aW9uLlxuXHQgKiBAa28gbGVmdCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9MRUZUXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAyXG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0xFRlQgPSBBeGVzLkRJUkVDVElPTl9MRUZUO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgcmlnaHQgZGlyZWN0aW9uLlxuXHQgKiBAa28gcmlnaHQg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fUklHSFRcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDRcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fUklHSFQgPSBBeGVzLkRJUkVDVElPTl9SSUdIVDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIHVwIGRpcmVjdGlvbi5cblx0ICogQGtvIHVwIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX1VQXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCA4XG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX1VQID0gQXhlcy5ESVJFQ1RJT05fVVA7XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBkb3duIGRpcmVjdGlvbi5cblx0ICogQGtvIGRvd24g67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fRE9XTlxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgMTZcblx0ICovXG5cdHN0YXRpYyBESVJFQ1RJT05fRE9XTiA9IEF4ZXMuRElSRUNUSU9OX0RPV047XG5cblx0LyoqXG5cdCAqIENvbnN0YW50IHZhbHVlIGZvciBob3Jpem9udGFsIGRpcmVjdGlvbi5cblx0ICogQGtvIGhvcml6b250YWwg67Cp7Zal7JeQIOuMgO2VnCDsg4HsiJgg6rCSLlxuXHQgKiBAbmFtZSBESVJFQ1RJT05fSE9SSVpPTlRBTFxuXHQgKiBAbWVtYmVyb2YgZWcuRmxpY2tpbmdcblx0ICogQHN0YXRpY1xuXHQgKiBAY29uc3RhbnRcblx0ICogQHR5cGUge051bWJlcn1cblx0ICogQGRlZmF1bHQgNlxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9IT1JJWk9OVEFMID0gQXhlcy5ESVJFQ1RJT05fSE9SSVpPTlRBTDtcblxuXHQvKipcblx0ICogQ29uc3RhbnQgdmFsdWUgZm9yIHZlcnRpY2FsIGRpcmVjdGlvbi5cblx0ICogQGtvIHZlcnRpY2FsIOuwqe2WpeyXkCDrjIDtlZwg7IOB7IiYIOqwki5cblx0ICogQG5hbWUgRElSRUNUSU9OX1ZFUlRJQ0FMXG5cdCAqIEBtZW1iZXJvZiBlZy5GbGlja2luZ1xuXHQgKiBAc3RhdGljXG5cdCAqIEBjb25zdGFudFxuXHQgKiBAdHlwZSB7TnVtYmVyfVxuXHQgKiBAZGVmYXVsdCAyNFxuXHQgKi9cblx0c3RhdGljIERJUkVDVElPTl9WRVJUSUNBTCA9IEF4ZXMuRElSRUNUSU9OX1ZFUlRJQ0FMO1xuXG5cdC8qKlxuXHQgKiBDb25zdGFudCB2YWx1ZSBmb3IgYWxsIGRpcmVjdGlvbi5cblx0ICogQGtvIGFsbCDrsKntlqXsl5Ag64yA7ZWcIOyDgeyImCDqsJIuXG5cdCAqIEBuYW1lIERJUkVDVElPTl9BTExcblx0ICogQG1lbWJlcm9mIGVnLkZsaWNraW5nXG5cdCAqIEBzdGF0aWNcblx0ICogQGNvbnN0YW50XG5cdCAqIEB0eXBlIHtOdW1iZXJ9XG5cdCAqIEBkZWZhdWx0IDMwXG5cdCAqL1xuXHRzdGF0aWMgRElSRUNUSU9OX0FMTCA9IEF4ZXMuRElSRUNUSU9OX0FMTDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=