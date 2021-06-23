/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 4.1.0
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@egjs/component'), require('@egjs/axes')) :
    typeof define === 'function' && define.amd ? define(['@egjs/component', '@egjs/axes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Flicking = factory(global.eg.Component, global.eg.Axes));
}(this, (function (Component, Axes) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o),
          r,
          ar = [],
          e;

      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error: error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }

      return ar;
    }
    function __spreadArray(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

      return to;
    }

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Special type of known error that {@link Flicking} throws.
     * @ko Flicking 내부에서 알려진 오류 발생시 throw되는 에러
     * @property {number} code Error code<ko>에러 코드</ko>
     * @property {string} message Error message<ko>에러 메시지</ko>
     * @see {@link Constants.ERROR_CODE ERROR_CODE}
     * @example
     * ```ts
     * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
     * try {
     *   const flicking = new Flicking(".flicking-viewport")
     * } catch (e) {
     *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
     *     console.error("Element not found")
     *   }
     * }
     * ```
     */

    var FlickingError =
    /*#__PURE__*/
    function (_super) {
      __extends(FlickingError, _super);
      /**
       * @param message Error message<ko>에러 메시지</ko>
       * @param code Error code<ko>에러 코드</ko>
       */


      function FlickingError(message, code) {
        var _this = _super.call(this, message) || this;

        _this.message = message;
        _this.code = code;
        Object.setPrototypeOf(_this, FlickingError.prototype);
        _this.name = "FlickingError";
        return _this;
      }

      return FlickingError;
    }(Error);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    /* eslint-disable @typescript-eslint/restrict-template-expressions */

    /**
     * Error codes of {@link FlickingError}. Below are the conditions where each error code occurs.
     * @ko {@link FlickingError}의 에러 코드. 아래는 각각의 에러 코드가 발생하는 조건입니다.
     * @name ERROR_CODE
     * @constant
     * @type object
     * @property {number} WRONG_TYPE Parameter type is wrong<ko>패러미터의 타입이 잘못되었을 경우</ko>
     * @property {number} ELEMENT_NOT_FOUND Element is not found inside page with the given CSS selector<ko>주어진 CSS selector로 페이지 내에서 해당 엘리먼트를 찾지 못했을 경우</ko>
     * @property {number} VAL_MUST_NOT_NULL Expected non-null value, but given `null` or `undefined`<ko>값을 기대했으나, `null`이나 `undefined`를 받은 경우</ko>
     * @property {number} NOT_ATTACHED_TO_FLICKING When Flicking's component is not initialized (i.e. {@link Flicking#init} is not called)<ko>Flicking 내부 컴포넌트가 초기화되지 않은 경우 ({@link Flicking#init}이 호출되지 않은 경우)</ko>
     * @property {number} WRONG_OPTION One of the options is wrong<ko>옵션들 중 잘못된 값이 있을 때</ko>
     * @property {number} INDEX_OUT_OF_RANGE When the given index is out of possible range<ko>인덱스가 주어진 범위를 벗어난 경우</ko>
     * @property {number} POSITION_NOT_REACHABLE When {@link Control#moveToPosition}'s position parameter is out of possible range.<ko>{@link Control#moveToPosition}의 `position` 패러미터가 도달 가능한 범위를 벗어난 경우</ko>
     * @property {number} TRANSFORM_NOT_SUPPORTED CSS `transform` property is not available(<=IE8) <ko>CSS `transform` 속성을 사용할 수 없는 경우(<=IE8)</ko>
     * @property {number} STOP_CALLED_BY_USER When the event's `stop()` is called by user.<ko>사용자에 의해 이벤트의 `stop()`이 호출된 경우</ko>
     * @property {number} ANIMATION_INTERRUPTED When the animation is interrupted by user.<ko>사용자에 의해 애니메이션이 중단된 경우</ko>
     * @property {number} ANIMATION_ALREADY_PLAYING When the animation is already playing.<ko>현재 애니메이션이 이미 진행중인 경우</ko>
     * @property {number} NOT_ALLOWED_IN_FRAMEWORK When the non-allowed method is called from frameworks (React, Angular, Vue...)
     * <ko>프레임워크(React, Angular, Vue ...)에서 사용 불가능한 메소드를 호출했을 경우</ko>
     * @property {number} NOT_INITIALIZED When the {@link Flicking#init} is not called before but is needed<ko>{@link Flicking#init}의 호출이 필요하나, 아직 호출되지 않았을 경우</ko>
     * @property {number} NO_ACTIVE When there're no active panel that flicking has selected. This may be due to the absence of any panels<ko>현재 Flicking이 선택한 패널이 없을 경우. 일반적으로 패널이 하나도 없는 경우에 발생할 수 있습니다</ko>
     */
    var CODE = {
      WRONG_TYPE: 0,
      ELEMENT_NOT_FOUND: 1,
      VAL_MUST_NOT_NULL: 2,
      NOT_ATTACHED_TO_FLICKING: 3,
      WRONG_OPTION: 4,
      INDEX_OUT_OF_RANGE: 5,
      POSITION_NOT_REACHABLE: 6,
      TRANSFORM_NOT_SUPPORTED: 7,
      STOP_CALLED_BY_USER: 8,
      ANIMATION_INTERRUPTED: 9,
      ANIMATION_ALREADY_PLAYING: 10,
      NOT_ALLOWED_IN_FRAMEWORK: 11,
      NOT_INITIALIZED: 12,
      NO_ACTIVE: 13
    };
    var MESSAGE = {
      WRONG_TYPE: function (wrongVal, correctTypes) {
        return wrongVal + "(" + typeof wrongVal + ") is not a " + correctTypes.map(function (type) {
          return "\"" + type + "\"";
        }).join(" or ") + ".";
      },
      ELEMENT_NOT_FOUND: function (selector) {
        return "Element with selector \"" + selector + "\" not found.";
      },
      VAL_MUST_NOT_NULL: function (val, name) {
        return name + " should be provided. Given: " + val;
      },
      NOT_ATTACHED_TO_FLICKING: function (name) {
        return name + " is not attached to the Flicking instance. \"init()\" should be called first.";
      },
      WRONG_OPTION: function (optionName, val) {
        return "Option \"" + optionName + "\" is not in correct format, given: " + val;
      },
      INDEX_OUT_OF_RANGE: function (val, min, max) {
        return "Index \"" + val + "\" is out of range: should be between " + min + " and " + max + ".";
      },
      POSITION_NOT_REACHABLE: function (position) {
        return "Position \"" + position + "\" is not reachable.";
      },
      TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform.",
      STOP_CALLED_BY_USER: "Event stop() is called by user.",
      ANIMATION_INTERRUPTED: "Animation is interrupted by user input.",
      ANIMATION_ALREADY_PLAYING: "Animation is already playing.",
      NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular.",
      NOT_INITIALIZED: "Flicking is not initialized yet, call init() first.",
      NO_ACTIVE: "There's no active panel that Flicking has selected. This may be due to the absence of any panels."
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Event type object with event name strings of {@link Flicking}
     * @ko {@link Flicking}의 이벤트 이름 문자열들을 담은 객체
     * @type {object}
     * @property {"holdStart"} HOLD_START holdStart event<ko>holdStart 이벤트</ko>
     * @property {"holdEnd"} HOLD_END holdEnd event<ko>holdEnd 이벤트</ko>
     * @property {"moveStart"} MOVE_START moveStart event<ko>moveStart 이벤트</ko>
     * @property {"move"} MOVE move event<ko>move 이벤트</ko>
     * @property {"moveEnd"} MOVE_END moveEnd event<ko>moveEnd 이벤트</ko>
     * @property {"willChange"} WILL_CHANGE willChange event<ko>willChange 이벤트</ko>
     * @property {"changed"} CHANGED changed event<ko>changed 이벤트</ko>
     * @property {"willRestore"} WILL_RESTORE willRestore event<ko>willRestore 이벤트</ko>
     * @property {"restored"} RESTORED restored event<ko>restored 이벤트</ko>
     * @property {"select"} SELECT select event<ko>select 이벤트</ko>
     * @property {"needPanel"} NEED_PANEL needPanel event<ko>needPanel 이벤트</ko>
     * @property {"panelChange"} PANEL_CHANGE panelChange event<ko>panelChange 이벤트</ko>
     * @example
     * ```ts
     * import { EVENTS } from "@egjs/flicking";
     * EVENTS.MOVE_START; // "moveStart"
     * ```
     */

    var EVENTS = {
      READY: "ready",
      BEFORE_RESIZE: "beforeResize",
      AFTER_RESIZE: "afterResize",
      HOLD_START: "holdStart",
      HOLD_END: "holdEnd",
      MOVE_START: "moveStart",
      MOVE: "move",
      MOVE_END: "moveEnd",
      WILL_CHANGE: "willChange",
      CHANGED: "changed",
      WILL_RESTORE: "willRestore",
      RESTORED: "restored",
      SELECT: "select",
      NEED_PANEL: "needPanel",
      VISIBLE_CHANGE: "visibleChange",
      REACH_EDGE: "reachEdge",
      PANEL_CHANGE: "panelChange"
    };
    /**
     * An object with all possible predefined literal string for the {@link Flicking#align align} option
     * @ko {@link Flicking#align align} 옵션에 사용되는 미리 정의된 리터럴 상수들을 담고 있는 객체
     * @type {object}
     * @property {"prev"} PREV left/top align<ko>좌/상 정렬</ko>
     * @property {"center"} CENTER center align<ko>중앙 정렬</ko>
     * @property {"next"} NEXT right/bottom align<ko>우/하 정렬</ko>
     */

    var ALIGN = {
      PREV: "prev",
      CENTER: "center",
      NEXT: "next"
    };
    /**
     * An object of directions
     * @ko 방향을 나타내는 값들을 담고 있는 객체
     * @type {object}
     * @property {"PREV"} PREV "left" when {@link Flicking#horizontal horizontal} is true, and "top" when {@link Flicking#horizontal horizontal} is false
     * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 왼쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 위쪽을 의미합니다</ko>
     * @property {"NEXT"} NEXT "right" when {@link Flicking#horizontal horizontal} is true, and "bottom" when {@link Flicking#horizontal horizontal} is false
     * <ko>{@link Flicking#horizontal horizontal}가 `true`일 경우 오른쪽, {@link Flicking#horizontal horizontal}가 `false`일 경우 아래쪽을 의미합니다</ko>
     * @property {null} NONE This value usually means it's the same position<ko>주로 제자리인 경우를 의미합니다</ko>
     */

    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT",
      NONE: null
    };
    /**
     * An object with all possible {@link Flicking#moveType moveType}s
     * @ko Flicking이 제공하는 {@link Flicking#moveType moveType}들을 담고 있는 객체
     * @type {object}
     * @property {"snap"} SNAP Flicking's {@link Flicking#moveType moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking#control control}
     * <ko>Flicking의 {@link Flicking#control control}을 {@link SnapControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
     * @property {"freeScroll"} FREE_SCROLL Flicking's {@link Flicking#moveType moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking#control control}
     * <ko>Flicking의 {@link Flicking#control control}을 {@link FreeControl}로 설정하게 하는 {@link Flicking#moveType moveType}</ko>
     */

    var MOVE_TYPE = {
      SNAP: "snap",
      FREE_SCROLL: "freeScroll"
    };

    var Constants = {
        __proto__: null,
        EVENTS: EVENTS,
        ALIGN: ALIGN,
        DIRECTION: DIRECTION,
        MOVE_TYPE: MOVE_TYPE,
        ERROR_CODE: CODE
    };

    var merge = function (target) {
      var sources = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }

      sources.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
          target[key] = source[key];
        });
      });
      return target;
    };
    var getElement = function (el, parent) {
      var targetEl = null;

      if (isString(el)) {
        var parentEl = parent ? parent : document;
        var queryResult = parentEl.querySelector(el);

        if (!queryResult) {
          throw new FlickingError(MESSAGE.ELEMENT_NOT_FOUND(el), CODE.ELEMENT_NOT_FOUND);
        }

        targetEl = queryResult;
      } else if (el && el.nodeType === Node.ELEMENT_NODE) {
        targetEl = el;
      }

      if (!targetEl) {
        throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
      }

      return targetEl;
    };
    var checkExistence = function (value, nameOnErrMsg) {
      if (value == null) {
        throw new FlickingError(MESSAGE.VAL_MUST_NOT_NULL(value, nameOnErrMsg), CODE.VAL_MUST_NOT_NULL);
      }
    };
    var clamp = function (x, min, max) {
      return Math.max(Math.min(x, max), min);
    };
    var getFlickingAttached = function (val, nameToThrowOnError) {
      if (!val) {
        throw new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING(nameToThrowOnError), CODE.NOT_ATTACHED_TO_FLICKING);
      }

      return val;
    };
    var toArray = function (iterable) {
      return [].slice.call(iterable);
    };
    var parseAlign = function (align, size) {
      var alignPoint;

      if (isString(align)) {
        switch (align) {
          case ALIGN.PREV:
            alignPoint = 0;
            break;

          case ALIGN.CENTER:
            alignPoint = 0.5 * size;
            break;

          case ALIGN.NEXT:
            alignPoint = size;
            break;

          default:
            alignPoint = parseArithmeticExpression(align, size);

            if (alignPoint == null) {
              throw new FlickingError(MESSAGE.WRONG_OPTION("align", align), CODE.WRONG_OPTION);
            }

        }
      } else {
        alignPoint = align;
      }

      return alignPoint;
    };
    var parseBounce = function (bounce, size) {
      var parsedBounce;

      if (Array.isArray(bounce)) {
        parsedBounce = bounce.map(function (val) {
          return parseArithmeticExpression(val, size);
        });
      } else {
        var parsedVal = parseArithmeticExpression(bounce, size);
        parsedBounce = [parsedVal, parsedVal];
      }

      return parsedBounce.map(function (val) {
        if (val == null) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("bounce", bounce), CODE.WRONG_OPTION);
        }

        return val;
      });
    };
    var parseArithmeticExpression = function (cssValue, base) {
      var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

      if (typeof cssValue === "number") {
        return cssValue;
      }

      var idx = 0;
      var calculatedValue = 0;
      var matchResult = cssRegex.exec(cssValue);

      while (matchResult != null) {
        var sign = matchResult[1];
        var value = matchResult[2];
        var unit = matchResult[3];
        var parsedValue = parseFloat(value);

        if (idx <= 0) {
          sign = sign || "+";
        } // Return default value for values not in good form


        if (!sign) {
          return null;
        }

        if (unit === "%") {
          parsedValue = parsedValue / 100 * base;
        }

        calculatedValue += sign === "+" ? parsedValue : -parsedValue; // Match next occurrence

        ++idx;
        matchResult = cssRegex.exec(cssValue);
      } // None-matched


      if (idx === 0) {
        return null;
      }

      return calculatedValue;
    };
    var getDirection = function (start, end) {
      if (start === end) return DIRECTION.NONE;
      return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
    };
    var parseElement = function (element) {
      if (!Array.isArray(element)) {
        element = [element];
      }

      var elements = [];
      element.forEach(function (el) {
        if (isString(el)) {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = el;
          elements.push.apply(elements, __spreadArray([], __read(toArray(tempDiv.children))));

          while (tempDiv.firstChild) {
            tempDiv.removeChild(tempDiv.firstChild);
          }
        } else if (el && el.nodeType === Node.ELEMENT_NODE) {
          elements.push(el);
        } else {
          throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
        }
      });
      return elements;
    };
    var getMinusCompensatedIndex = function (idx, max) {
      return idx < 0 ? clamp(idx + max, 0, max) : clamp(idx, 0, max);
    };
    var includes = function (array, target) {
      var e_1, _a;

      try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
          var val = array_1_1.value;
          if (val === target) return true;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      return false;
    };
    var isString = function (val) {
      return typeof val === "string";
    };
    var circulatePosition = function (pos, min, max) {
      var size = max - min;

      if (pos < min) {
        var offset = (min - pos) % size;
        pos = max - offset;
      } else if (pos > max) {
        var offset = (pos - max) % size;
        pos = min + offset;
      }

      return pos;
    };
    var findIndex = function (array, checker) {
      for (var idx = 0; idx < array.length; idx++) {
        if (checker(array[idx])) {
          return idx;
        }
      }

      return -1;
    };
    var getProgress = function (pos, prev, next) {
      return (pos - prev) / (next - prev);
    }; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    var getStyle = function (el) {
      return window.getComputedStyle(el) || el.currentStyle;
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * A component that manages viewport size
     * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
     */

    var Viewport =
    /*#__PURE__*/
    function () {
      /**
       * @param el A viewport element<ko>뷰포트 엘리먼트</ko>
       */
      function Viewport(el) {
        this._el = el;
        this._width = 0;
        this._height = 0;
        this._padding = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
        this._isBorderBoxSizing = false;
      }

      var __proto = Viewport.prototype;
      Object.defineProperty(__proto, "element", {
        /**
         * A viewport(root) element
         * @ko 뷰포트(root) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "width", {
        /**
         * Viewport width, without paddings
         * @ko 뷰포트 너비
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._width - this._padding.left - this._padding.right;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        /**
         * Viewport height, without paddings
         * @ko 뷰포트 높이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._height - this._padding.top - this._padding.bottom;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "padding", {
        /**
         * Viewport paddings
         * @ko 뷰포트 CSS padding 값
         * @type {object}
         * @property {number} left CSS `padding-left`
         * @property {number} right CSS `padding-right`
         * @property {number} top CSS `padding-top`
         * @property {number} bottom CSS `padding-bottom`
         * @readonly
         */
        get: function () {
          return this._padding;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Change viewport's size.
       * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
       * @ko 뷰포트 크기를 변경합니다.
       * `.flicking-viewport` 엘리먼트에 해당 크기의 CSS width/height를 적용합니다
       * @param {object} [size] New viewport size<ko>새 뷰포트 크기</ko>
       * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
       * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS 문자열 또는 숫자(px)</ko>
       */

      __proto.setSize = function (_a) {
        var width = _a.width,
            height = _a.height;
        var el = this._el;
        var padding = this._padding;
        var isBorderBoxSizing = this._isBorderBoxSizing;

        if (width != null) {
          if (isString(width)) {
            el.style.width = width;
          } else {
            var newWidth = isBorderBoxSizing ? width + padding.left + padding.right : width;
            el.style.width = newWidth + "px";
          }
        }

        if (height != null) {
          if (isString(height)) {
            el.style.height = height;
          } else {
            var newHeight = isBorderBoxSizing ? height + padding.top + padding.bottom : height;
            el.style.height = newHeight + "px";
          }
        }

        this.resize();
      };
      /**
       * Update width/height to the current viewport element's size
       * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
       */


      __proto.resize = function () {
        var el = this._el;
        var elStyle = getStyle(el);
        this._width = el.offsetWidth;
        this._height = el.offsetHeight;
        this._padding = {
          left: parseFloat(elStyle.paddingLeft),
          right: parseFloat(elStyle.paddingRight),
          top: parseFloat(elStyle.paddingTop),
          bottom: parseFloat(elStyle.paddingBottom)
        };
        this._isBorderBoxSizing = elStyle.boxSizing === "border-box";
      };

      return Viewport;
    }();

    /**
     * All possible @egjs/axes event keys
     * @internal
     */
    var EVENT = {
      HOLD: "hold",
      CHANGE: "change",
      RELEASE: "release",
      ANIMATION_END: "animationEnd",
      FINISH: "finish"
    };
    /**
     * An Axis key that Flicking uses
     * @internal
     */

    var POSITION_KEY = "flick";

    var STATE_TYPE;

    (function (STATE_TYPE) {
      STATE_TYPE[STATE_TYPE["IDLE"] = 0] = "IDLE";
      STATE_TYPE[STATE_TYPE["HOLDING"] = 1] = "HOLDING";
      STATE_TYPE[STATE_TYPE["DRAGGING"] = 2] = "DRAGGING";
      STATE_TYPE[STATE_TYPE["ANIMATING"] = 3] = "ANIMATING";
      STATE_TYPE[STATE_TYPE["DISABLED"] = 4] = "DISABLED";
    })(STATE_TYPE || (STATE_TYPE = {}));
    /**
     * A component that shows the current status of the user input or the animation
     * @ko 현재 사용자 입력 또는 애니메이션 상태를 나타내는 컴포넌트
     * @internal
     */


    var State =
    /*#__PURE__*/
    function () {
      function State() {}
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      var __proto = State.prototype;

      __proto.onHold = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onChange = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onRelease = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event of Axes
       * <ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onAnimationEnd = function (ctx) {// DO NOTHING
      };
      /**
       * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트 핸들러
       * @param {object} [ctx] Event context<ko>이벤트 콘텍스트</ko>
       * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking 인스턴스</ko>
       * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of Axes<ko>Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} 이벤트</ko>
       * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>다른 상태로 변경하기 위한 함수</ko>
       * @return {void}
       */


      __proto.onFinish = function (ctx) {// DO NOTHING
      };

      return State;
    }();

    /**
     * A default state when there's no user input and no animation's playing
     * @ko 사용자의 입력이 없고, 애니메이션이 동작하고있지 않은 기본 상태
     * @internal
     */

    var IdleState =
    /*#__PURE__*/
    function (_super) {
      __extends(IdleState, _super);

      function IdleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {false}
         * @readonly
         */

        _this.animating = false;
        return _this;
      }

      var __proto = IdleState.prototype;

      __proto.onHold = function (ctx) {
        // Shouldn't do any action until any panels on flicking area
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (flicking.renderer.panelCount <= 0) {
          transitTo(STATE_TYPE.DISABLED);
          return;
        }

        var holdStartEvent = new Component.ComponentEvent(EVENTS.HOLD_START, {
          axesEvent: axesEvent
        });
        flicking.trigger(holdStartEvent);

        if (holdStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          transitTo(STATE_TYPE.HOLDING);
        }
      }; // By methods call


      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var controller = flicking.control.controller;
        var animatingContext = controller.animatingContext;
        var moveStartEvent = new Component.ComponentEvent(EVENTS.MOVE_START, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(animatingContext.start, animatingContext.end),
          axesEvent: axesEvent
        });
        flicking.trigger(moveStartEvent);

        if (moveStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          // Trigger AnimatingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
        }
      };

      return IdleState;
    }(State);

    /**
     * A state that activates when user's holding the Flicking area, but not moved a single pixel yet
     * @ko 사용자의 입력이 시작되었으나, 아직 움직이지는 않은 상태
     * @internal
     */

    var HoldingState =
    /*#__PURE__*/
    function (_super) {
      __extends(HoldingState, _super);

      function HoldingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {true}
         * @readonly
         */


        _this.holding = true;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {false}
         * @readonly
         */

        _this.animating = false;
        _this._releaseEvent = null;
        return _this;
      }

      var __proto = HoldingState.prototype;

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var inputEvent = axesEvent.inputEvent;
        var offset = flicking.horizontal ? inputEvent.offsetX : inputEvent.offsetY;
        var moveStartEvent = new Component.ComponentEvent(EVENTS.MOVE_START, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(0, -offset),
          axesEvent: axesEvent
        });
        flicking.trigger(moveStartEvent);

        if (moveStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          // Trigger DraggingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.DRAGGING).onChange(ctx);
        }
      };

      __proto.onRelease = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        flicking.trigger(new Component.ComponentEvent(EVENTS.HOLD_END, {
          axesEvent: axesEvent
        }));

        if (axesEvent.delta.flick !== 0) {
          // Sometimes "release" event on axes triggered before "change" event
          // Especially if user flicked panel fast in really short amount of time
          // if delta is not zero, that means above case happened.
          // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
          // At least one move event should be included between holdStart and holdEnd
          axesEvent.setTo({
            flick: flicking.camera.position
          }, 0);
          transitTo(STATE_TYPE.IDLE);
          return;
        } // Can't handle select event here,
        // As "finish" axes event happens


        this._releaseEvent = axesEvent;
      };

      __proto.onFinish = function (ctx) {
        var e_1, _a;

        var flicking = ctx.flicking,
            transitTo = ctx.transitTo; // Should transite to IDLE state before select event
        // As user expects hold is already finished

        transitTo(STATE_TYPE.IDLE);

        if (!this._releaseEvent) {
          return;
        } // Handle release event here
        // To prevent finish event called twice


        var releaseEvent = this._releaseEvent; // Static click

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

        var srcEvent = releaseEvent.inputEvent.srcEvent;
        var clickedElement;

        if (srcEvent.type === "touchend") {
          var touchEvent = srcEvent;
          var touch = touchEvent.changedTouches[0];
          clickedElement = document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
          clickedElement = srcEvent.target;
        }
        /* eslint-enable */


        var panels = flicking.renderer.panels;
        var clickedPanel = null;

        try {
          for (var panels_1 = __values(panels), panels_1_1 = panels_1.next(); !panels_1_1.done; panels_1_1 = panels_1.next()) {
            var panel = panels_1_1.value;

            if (panel.contains(clickedElement)) {
              clickedPanel = panel;
              break;
            }
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (panels_1_1 && !panels_1_1.done && (_a = panels_1.return)) _a.call(panels_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }

        if (clickedPanel) {
          var cameraPosition = flicking.camera.position;
          var clickedPanelPosition = clickedPanel.position;
          flicking.trigger(new Component.ComponentEvent(EVENTS.SELECT, {
            index: clickedPanel.index,
            panel: clickedPanel,
            // Direction to the clicked panel
            direction: getDirection(cameraPosition, clickedPanelPosition)
          }));
        }
      };

      return HoldingState;
    }(State);

    /**
     * A state that activates when user's dragging the Flicking area
     * @ko 사용자가 드래깅중인 상태
     * @internal
     */

    var DraggingState =
    /*#__PURE__*/
    function (_super) {
      __extends(DraggingState, _super);

      function DraggingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {true}
         * @readonly
         */


        _this.holding = true;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = DraggingState.prototype;

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (!axesEvent.delta[POSITION_KEY]) {
          return;
        }

        var camera = flicking.camera;
        var prevPosition = camera.position;
        void camera.lookAt(axesEvent.pos[POSITION_KEY]);
        var moveEvent = new Component.ComponentEvent(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(0, axesEvent.delta[POSITION_KEY]),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          void camera.lookAt(prevPosition);
          transitTo(STATE_TYPE.DISABLED);
        }
      };

      __proto.onRelease = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // Update last position to cope with Axes's animating behavior
        // Axes uses start position when animation start

        flicking.trigger(new Component.ComponentEvent(EVENTS.HOLD_END, {
          axesEvent: axesEvent
        }));

        if (flicking.renderer.panelCount <= 0) {
          // There're no panels
          transitTo(STATE_TYPE.IDLE);
          return;
        }

        transitTo(STATE_TYPE.ANIMATING);
        var control = flicking.control;
        var position = axesEvent.destPos[POSITION_KEY];
        var duration = Math.max(axesEvent.duration, flicking.duration);
        void control.moveToPosition(position, duration, axesEvent);
      };

      return DraggingState;
    }(State);

    /**
     * A state that activates when Flicking's animating by user input or method call
     * @ko 사용자 입력이나 메소드 호출에 의해 Flicking의 애니메이션이 동작중인 상태
     * @internal
     */

    var AnimatingState =
    /*#__PURE__*/
    function (_super) {
      __extends(AnimatingState, _super);

      function AnimatingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = AnimatingState.prototype;

      __proto.onHold = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        var holdStartEvent = new Component.ComponentEvent(EVENTS.HOLD_START, {
          axesEvent: axesEvent
        });
        flicking.trigger(holdStartEvent);

        if (holdStartEvent.isCanceled()) {
          transitTo(STATE_TYPE.DISABLED);
        } else {
          transitTo(STATE_TYPE.DRAGGING);
        }
      };

      __proto.onChange = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;

        if (!axesEvent.delta.flick) {
          return;
        }

        var camera = flicking.camera;
        var prevPosition = camera.position;
        void camera.lookAt(axesEvent.pos.flick);
        var moveEvent = new Component.ComponentEvent(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(0, axesEvent.delta.flick),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          void flicking.camera.lookAt(prevPosition);
          transitTo(STATE_TYPE.DISABLED);
        }
      };

      __proto.onFinish = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo;
        transitTo(STATE_TYPE.IDLE);
        var controller = flicking.control.controller;
        var animatingContext = controller.animatingContext;
        flicking.trigger(new Component.ComponentEvent(EVENTS.MOVE_END, {
          isTrusted: axesEvent.isTrusted,
          direction: getDirection(animatingContext.start, animatingContext.end),
          axesEvent: axesEvent
        }));
      };

      return AnimatingState;
    }(State);

    /**
     * A state that activates when Flicking is stopped by event's `stop` method
     * @ko 이벤트의 `stop`호출에 의해 Flicking이 정지된 상태
     * @internal
     */

    var DisabledState =
    /*#__PURE__*/
    function (_super) {
      __extends(DisabledState, _super);

      function DisabledState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {false}
         * @readonly
         */


        _this.holding = false;
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {true}
         * @readonly
         */

        _this.animating = true;
        return _this;
      }

      var __proto = DisabledState.prototype;

      __proto.onAnimationEnd = function (ctx) {
        var transitTo = ctx.transitTo;
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onChange = function (ctx) {
        var axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // Can stop Axes's change event

        axesEvent.stop();
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onRelease = function (ctx) {
        var axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // This is needed when stopped hold start event

        if (axesEvent.delta.flick === 0) {
          transitTo(STATE_TYPE.IDLE);
        }
      };

      return DisabledState;
    }(State);

    /**
     * @internal
     */

    var StateMachine =
    /*#__PURE__*/
    function () {
      function StateMachine() {
        var _this = this;

        this.transitTo = function (nextStateType) {
          var nextState;

          switch (nextStateType) {
            case STATE_TYPE.IDLE:
              nextState = new IdleState();
              break;

            case STATE_TYPE.HOLDING:
              nextState = new HoldingState();
              break;

            case STATE_TYPE.DRAGGING:
              nextState = new DraggingState();
              break;

            case STATE_TYPE.ANIMATING:
              nextState = new AnimatingState();
              break;

            case STATE_TYPE.DISABLED:
              nextState = new DisabledState();
              break;
          }

          _this._state = nextState;
          return _this._state;
        };

        this._state = new IdleState();
      }

      var __proto = StateMachine.prototype;
      Object.defineProperty(__proto, "state", {
        get: function () {
          return this._state;
        },
        enumerable: false,
        configurable: true
      });

      __proto.fire = function (eventType, externalCtx) {
        var currentState = this._state;

        var ctx = __assign(__assign({}, externalCtx), {
          transitTo: this.transitTo
        });

        switch (eventType) {
          case EVENT.HOLD:
            currentState.onHold(ctx);
            break;

          case EVENT.CHANGE:
            currentState.onChange(ctx);
            break;

          case EVENT.RELEASE:
            currentState.onRelease(ctx);
            break;

          case EVENT.ANIMATION_END:
            currentState.onAnimationEnd(ctx);
            break;

          case EVENT.FINISH:
            currentState.onFinish(ctx);
            break;
        }
      };

      return StateMachine;
    }();

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
     * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
     * @internal
     */

    var AxesController =
    /*#__PURE__*/
    function () {
      /** */
      function AxesController() {
        this._resetInternalValues();

        this._stateMachine = new StateMachine();
      }

      var __proto = AxesController.prototype;
      Object.defineProperty(__proto, "axes", {
        /**
         * An {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
         * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes}의 인스턴스
         * @type {Axes}
         * @see https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html
         * @readonly
         */
        get: function () {
          return this._axes;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "state", {
        /**
         * A activated {@link State} that shows the current status of the user input or the animation
         * @ko 현재 활성화된 {@link State} 인스턴스로 사용자 입력 또는 애니메이션 상태를 나타냅니다
         * @type {State}
         */
        get: function () {
          return this._stateMachine.state;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animatingContext", {
        /**
         * A context of the current animation playing
         * @ko 현재 재생중인 애니메이션 정보
         * @type {object}
         * @property {number} start A start position of the animation<ko>애니메이션 시작 지점</ko>
         * @property {number} end A end position of the animation<ko>애니메이션 끝 지점</ko>
         * @property {number} offset camera offset<ko>카메라 오프셋</ko>
         * @readonly
         */
        get: function () {
          return this._animatingContext;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "enabled", {
        /**
         * A Boolean indicating whether the user input is enabled
         * @ko 현재 사용자 입력이 활성화되었는지를 나타내는 값
         * @type {boolean}
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.isEnable()) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
         * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} 인스턴스 내부의 현재 좌표 값
         * @type {number}
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.get([POSITION_KEY])[POSITION_KEY]) !== null && _b !== void 0 ? _b : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bounce", {
        /**
         * Actual bounce size(px)
         * @ko 적용된 bounce 크기(px 단위)
         * @type {number[]}
         * @readonly
         */
        get: function () {
          var _a;

          return (_a = this._axes) === null || _a === void 0 ? void 0 : _a.axis[POSITION_KEY].bounce;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize AxesController
       * @ko AxesController를 초기화합니다
       * @param {Flicking} flicking An instance of Flicking
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        var _a;

        var _this = this;

        this._flicking = flicking;
        this._axes = new Axes((_a = {}, _a[POSITION_KEY] = {
          range: [0, 0],
          circular: false,
          bounce: [0, 0]
        }, _a), {
          deceleration: flicking.deceleration,
          interruptable: flicking.interruptable,
          easing: flicking.easing
        });
        this._panInput = new Axes.PanInput(flicking.viewport.element, {
          inputType: flicking.inputType,
          iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
          scale: flicking.horizontal ? [-1, 0] : [0, -1]
        });
        var axes = this._axes;
        axes.connect(flicking.horizontal ? [POSITION_KEY, ""] : ["", POSITION_KEY], this._panInput);

        var _loop_1 = function (key) {
          var eventType = EVENT[key];
          axes.on(eventType, function (e) {
            _this._stateMachine.fire(eventType, {
              flicking: flicking,
              axesEvent: e
            });
          });
        };

        for (var key in EVENT) {
          _loop_1(key);
        }

        return this;
      };
      /**
       * Destroy AxesController and return to initial state
       * @ko AxesController를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        var _a, _b;

        (_a = this._axes) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this._panInput) === null || _b === void 0 ? void 0 : _b.destroy();

        this._resetInternalValues();
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @chainable
       * @return {this}
       */


      __proto.enable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.enable();
        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @chainable
       * @return {this}
       */


      __proto.disable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.disable();
        return this;
      };
      /**
       * Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state
       * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 상태를 갱신합니다
       * @chainable
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
       * <ko>{@link AxesController#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.update = function () {
        var _a;

        var flicking = getFlickingAttached(this._flicking, "Control");
        var camera = flicking.camera;
        var axes = this._axes;
        var controlParams = camera.controlParams;
        var axis = axes.axis[POSITION_KEY];
        axis.circular = [controlParams.circular, controlParams.circular];
        axis.range = [controlParams.range.min, controlParams.range.max];
        axis.bounce = parseBounce(flicking.bounce, camera.size);
        axes.axm.set((_a = {}, _a[POSITION_KEY] = controlParams.position, _a));
        return this;
      };
      /**
       * Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position
       * @ko Axes의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} 메소드를 주어진 좌표를 이용하여 수행합니다
       * @param {number} position A position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {number} [axesEvent] If provided, it'll use its {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} method instead<ko>이 값이 주어졌을 경우, 해당 이벤트의 {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} 메소드를 대신해서 사용합니다.</ko>
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      __proto.animateTo = function (position, duration, axesEvent) {
        var _a;

        var _this = this;

        var axes = this._axes;

        if (!axes) {
          return Promise.reject(new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), CODE.NOT_ATTACHED_TO_FLICKING));
        }

        var startPos = axes.get([POSITION_KEY])[POSITION_KEY];

        if (startPos === position) {
          var flicking = getFlickingAttached(this._flicking, "Control");
          return flicking.camera.lookAt(position);
        }

        this._animatingContext = {
          start: startPos,
          end: position,
          offset: 0
        };

        var animate = function () {
          var _a, _b;

          var resetContext = function () {
            _this._animatingContext = {
              start: 0,
              end: 0,
              offset: 0
            };
          };

          axes.once(EVENT.FINISH, resetContext);

          if (axesEvent) {
            axesEvent.setTo((_a = {}, _a[POSITION_KEY] = position, _a), duration);
          } else {
            axes.setTo((_b = {}, _b[POSITION_KEY] = position, _b), duration);
          }
        };

        if (duration === 0) {
          animate();
          axes.axm.set((_a = {}, _a[POSITION_KEY] = position, _a));
          return Promise.resolve();
        } else {
          return new Promise(function (resolve, reject) {
            var animationFinishHandler = function () {
              axes.off(EVENT.HOLD, interruptionHandler);
              resolve();
            };

            var interruptionHandler = function () {
              axes.off(EVENT.FINISH, animationFinishHandler);
              reject(new FlickingError(MESSAGE.ANIMATION_INTERRUPTED, CODE.ANIMATION_INTERRUPTED));
            };

            axes.once(EVENT.FINISH, animationFinishHandler);
            axes.once(EVENT.HOLD, interruptionHandler);
            animate();
          });
        }
      };

      __proto._resetInternalValues = function () {
        this._flicking = null;
        this._axes = null;
        this._panInput = null;
        this._animatingContext = {
          start: 0,
          end: 0,
          offset: 0
        };
      };

      return AxesController;
    }();

    /**
     * A component that manages inputs and animation of Flicking
     * @ko Flicking의 입력 장치 & 애니메이션을 담당하는 컴포넌트
     */

    var Control$1 =
    /*#__PURE__*/
    function () {
      /** */
      function Control() {
        var _this = this;

        this._setActive = function (newActivePanel, prevActivePanel, isTrusted) {
          var _a;

          var flicking = getFlickingAttached(_this._flicking, "Control");
          _this._activePanel = newActivePanel;
          flicking.camera.updateAdaptiveHeight();

          if (newActivePanel !== prevActivePanel) {
            flicking.trigger(new Component.ComponentEvent(EVENTS.CHANGED, {
              index: newActivePanel.index,
              panel: newActivePanel,
              prevIndex: (_a = prevActivePanel === null || prevActivePanel === void 0 ? void 0 : prevActivePanel.index) !== null && _a !== void 0 ? _a : -1,
              prevPanel: prevActivePanel,
              isTrusted: isTrusted,
              direction: prevActivePanel ? getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
            }));
          } else {
            flicking.trigger(new Component.ComponentEvent(EVENTS.RESTORED, {
              isTrusted: isTrusted
            }));
          }
        };

        this._flicking = null;
        this._controller = new AxesController();
        this._activePanel = null;
      }

      var __proto = Control.prototype;
      Object.defineProperty(__proto, "controller", {
        /**
         * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
         * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}의 이벤트를 처리하는 컨트롤러 컴포넌트
         * @type {AxesController}
         * @readonly
         */
        get: function () {
          return this._controller;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activeIndex", {
        /**
         * Index number of the {@link Flicking#currentPanel currentPanel}
         * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          var _a, _b;

          return (_b = (_a = this._activePanel) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activePanel", {
        /**
         * An active panel
         * @ko 현재 선택된 패널
         * @type {Panel | null}
         * @readonly
         */
        get: function () {
          return this._activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._controller.state.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._controller.state.holding;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Control
       * @ko Control을 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._controller.init(flicking);

        return this;
      };
      /**
       * Destroy Control and return to initial state
       * @ko Control을 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._controller.destroy();

        this._flicking = null;
        this._activePanel = null;
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @chainable
       * @return {this}
       */


      __proto.enable = function () {
        this._controller.enable();

        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @chainable
       * @return {this}
       */


      __proto.disable = function () {
        this._controller.disable();

        return this;
      };
      /**
       * Update position after resizing
       * @ko resize 이후에 position을 업데이트합니다
       * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize 이전 현재 선택된 패널 내에서의 카메라 progress 값</ko>
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {Promise<void>}
       */


      __proto.updatePosition = function (_progressInPanel) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, activePanel;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                flicking = getFlickingAttached(this._flicking, "Control");
                camera = flicking.camera;
                activePanel = this._activePanel;
                if (!activePanel) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , camera.lookAt(camera.clampToReachablePosition(activePanel.position))];

              case 1:
                _a.sent();

                _a.label = 2;

              case 2:
                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * Update {@link Control#controller controller}'s state
       * @ko {@link Control#controller controller}의 내부 상태를 갱신합니다
       * @chainable
       * @return {this}
       */


      __proto.updateInput = function () {
        this._controller.update();

        return this;
      };
      /**
       * Reset {@link Control#activePanel activePanel} and {@link Control#activeAnchor activeAnchor} to `null`
       * @ko {@link Control#activePanel activePanel}와 {@link Control#activeAnchor activeAnchor}를 `null`로 초기화합니다
       * @chainable
       * @return {this}
       */


      __proto.resetActive = function () {
        this._activePanel = null;
        return this;
      };
      /**
       * Move {@link Camera} to the given panel
       * @ko {@link Camera}를 해당 패널 위로 이동합니다
       * @param {Panel} panel The target panel to move<ko>이동할 패널</ko>
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {number} duration Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.moveToPanel = function (panel, _a) {
        var duration = _a.duration,
            _b = _a.direction,
            direction = _b === void 0 ? DIRECTION.NONE : _b,
            axesEvent = _a.axesEvent;
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, position, nearestAnchor, camPos_1, camRangeDiff, possiblePositions;
          return __generator(this, function (_c) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            position = panel.position;
            nearestAnchor = camera.findNearestAnchor(position);

            if (panel.removed || !nearestAnchor) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE))];
            }

            if (!camera.canReach(panel)) {
              // Override position & panel if that panel is not reachable
              position = nearestAnchor.position;
              panel = nearestAnchor.panel;
            } else if (flicking.circularEnabled) {
              camPos_1 = this._controller.position;
              camRangeDiff = camera.rangeDiff;
              possiblePositions = [position, position + camRangeDiff, position - camRangeDiff].filter(function (pos) {
                if (direction === DIRECTION.NONE) return true;
                return direction === DIRECTION.PREV ? pos <= camPos_1 : pos >= camPos_1;
              });
              position = possiblePositions.reduce(function (nearestPosition, pos) {
                if (Math.abs(camPos_1 - pos) < Math.abs(camPos_1 - nearestPosition)) {
                  return pos;
                } else {
                  return nearestPosition;
                }
              }, Infinity);
            }

            this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: position,
              duration: duration,
              newActivePanel: panel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      __proto._triggerIndexChangeEvent = function (panel, position, axesEvent) {
        var _a;

        var flicking = getFlickingAttached(this._flicking, "Control");
        var triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
        var camera = flicking.camera;
        var activePanel = this._activePanel;
        var event = new Component.ComponentEvent(triggeringEvent, {
          index: panel.index,
          panel: panel,
          isTrusted: (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false,
          direction: getDirection((_a = activePanel === null || activePanel === void 0 ? void 0 : activePanel.position) !== null && _a !== void 0 ? _a : camera.position, position)
        });
        flicking.trigger(event);

        if (event.isCanceled()) {
          throw new FlickingError(MESSAGE.STOP_CALLED_BY_USER, CODE.STOP_CALLED_BY_USER);
        }
      };

      __proto._animateToPosition = function (_a) {
        var position = _a.position,
            duration = _a.duration,
            newActivePanel = _a.newActivePanel,
            axesEvent = _a.axesEvent;
        return __awaiter(this, void 0, void 0, function () {
          var flicking, currentPanel, animate, isTrusted, animation;

          var _this = this;

          return __generator(this, function (_b) {
            flicking = getFlickingAttached(this._flicking, "Control");
            currentPanel = this._activePanel;

            animate = function () {
              return _this._controller.animateTo(position, duration, axesEvent);
            };

            isTrusted = (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false;

            if (duration <= 0) {
              animation = animate();

              this._setActive(newActivePanel, currentPanel, isTrusted);

              return [2
              /*return*/
              , animation];
            } else {
              return [2
              /*return*/
              , animate().then(function () {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        this._setActive(newActivePanel, currentPanel, isTrusted);

                        return [4
                        /*yield*/
                        , flicking.renderer.render()];

                      case 1:
                        _a.sent();

                        return [2
                        /*return*/
                        ];
                    }
                  });
                });
              }).catch(function (err) {
                if (axesEvent && err instanceof FlickingError && err.code === CODE.ANIMATION_INTERRUPTED) return;
                throw err;
              })];
            }
          });
        });
      };

      return Control;
    }();

    /**
     * A {@link Control} that uses a release momentum to choose destination panel
     * @ko 입력을 중단한 시점의 가속도에 영향받아 도달할 패널을 계산하는 이동 방식을 사용하는 {@link Control}
     */

    var SnapControl =
    /*#__PURE__*/
    function (_super) {
      __extends(SnapControl, _super);

      function SnapControl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Move {@link Camera} to the given position
       * @ko {@link Camera}를 주어진 좌표로 이동합니다
       * @param {number} position The target position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      var __proto = SnapControl.prototype;

      __proto.moveToPosition = function (position, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, activePanel, clampedPosition, anchorAtPosition, prevPos, isOverThreshold, adjacentAnchor, targetPos, targetPanel;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            activePanel = this._activePanel;
            clampedPosition = camera.clampToReachablePosition(position);
            anchorAtPosition = camera.findNearestAnchor(clampedPosition);

            if (!anchorAtPosition || !activePanel) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
            }

            prevPos = activePanel.position;
            isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
            adjacentAnchor = position > prevPos ? camera.getNextAnchor(anchorAtPosition) : camera.getPrevAnchor(anchorAtPosition);

            if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
              // Move to anchor at position
              targetPanel = anchorAtPosition.panel;
              targetPos = anchorAtPosition.position;
            } else if (isOverThreshold && adjacentAnchor) {
              // Move to adjacent anchor
              targetPanel = adjacentAnchor.panel;
              targetPos = adjacentAnchor.position;
            } else {
              // Restore to active panel
              targetPos = camera.clampToReachablePosition(activePanel.position);
              targetPanel = activePanel;
            }

            this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: targetPos,
              duration: duration,
              newActivePanel: targetPanel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      return SnapControl;
    }(Control$1);

    /**
     * A {@link Control} that can be scrolled freely without alignment
     * @ko 패널이 정해진 지점에 정렬되지 않고, 자유롭게 스크롤할 수 있는 이동 방식을 사용하는 {@link Control}
     */

    var FreeControl =
    /*#__PURE__*/
    function (_super) {
      __extends(FreeControl, _super);
      /** */


      function FreeControl(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.stopAtEdge,
            stopAtEdge = _c === void 0 ? true : _c;

        var _this = _super.call(this) || this;

        _this._stopAtEdge = stopAtEdge;
        return _this;
      }

      var __proto = FreeControl.prototype;
      Object.defineProperty(__proto, "stopAtEdge", {
        /**
         * Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
         * @ko 스크롤 애니메이션을 스크롤 영역의 시작과 끝부분에서 멈추도록 하여, 바운스 영역을 넘어가지 않도록 합니다
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._stopAtEdge;
        },
        set: function (val) {
          this._stopAtEdge = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Update position after resizing
       * @ko resize 이후에 position을 업데이트합니다
       * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize 이전 현재 선택된 패널 내에서의 카메라 progress 값</ko>
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {Promise<void>}
       */

      __proto.updatePosition = function (progressInPanel) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, activePanel, panelRange, newPosition;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                flicking = getFlickingAttached(this._flicking, "Control");
                camera = flicking.camera;
                activePanel = this._activePanel;
                if (!activePanel) return [3
                /*break*/
                , 2];
                panelRange = activePanel.range;
                newPosition = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
                return [4
                /*yield*/
                , camera.lookAt(camera.clampToReachablePosition(newPosition))];

              case 1:
                _a.sent();

                _a.label = 2;

              case 2:
                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * Move {@link Camera} to the given position
       * @ko {@link Camera}를 주어진 좌표로 이동합니다
       * @param {number} position The target position to move<ko>이동할 좌표</ko>
       * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
       * <ko>{@link https://naver.github.io/egjs-axes/ Axes}의 {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} 이벤트</ko>
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      __proto.moveToPosition = function (position, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, targetPos, anchorAtPosition, targetPanel;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            targetPos = camera.clampToReachablePosition(position);
            anchorAtPosition = camera.findAnchorIncludePosition(targetPos);

            if (!anchorAtPosition) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
            }

            targetPanel = anchorAtPosition.panel; // Trigger only change event

            if (targetPanel !== this._activePanel) {
              this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
            }

            return [2
            /*return*/
            , this._animateToPosition({
              position: this._stopAtEdge ? targetPos : position,
              duration: duration,
              newActivePanel: targetPanel,
              axesEvent: axesEvent
            })];
          });
        });
      };

      return FreeControl;
    }(Control$1);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Control = {
        __proto__: null,
        Control: Control$1,
        SnapControl: SnapControl,
        FreeControl: FreeControl,
        AxesController: AxesController,
        State: State,
        IdleState: IdleState,
        HoldingState: HoldingState,
        DraggingState: DraggingState,
        AnimatingState: AnimatingState,
        DisabledState: DisabledState,
        StateMachine: StateMachine
    };

    /**
     * A data component that has actual position where the camera should be stopped at
     * @ko 카메라가 정지해야하는 실제 위치를 담고 있는 데이터 컴포넌트
     */
    var AnchorPoint =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 객체</ko>
       * @param {number} [options.index] Index of AnchorPoint<ko>AnchorPoint의 인덱스</ko>
       * @param {number} [options.position] Position of AnchorPoint<ko>AnchorPoint의 좌표</ko>
       * @param {Panel} [options.panel] A {@link Panel} instance AnchorPoint is referencing to<ko>AnchorPoint가 참조하고 있는 {@link Panel}</ko>
       */
      function AnchorPoint(_a) {
        var index = _a.index,
            position = _a.position,
            panel = _a.panel;
        this._index = index;
        this._pos = position;
        this._panel = panel;
      }

      var __proto = AnchorPoint.prototype;
      Object.defineProperty(__proto, "index", {
        /**
         * Index of AnchorPoint
         * @ko AnchorPoint의 인덱스
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Position of AnchorPoint
         * @ko AnchorPoint의 좌표
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._pos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panel", {
        /**
         * A {@link Panel} instance AnchorPoint is referencing to
         * @ko AnchorPoint가 참조하고 있는 {@link Panel}
         * @type {Panel}
         * @readonly
         */
        get: function () {
          return this._panel;
        },
        enumerable: false,
        configurable: true
      });
      return AnchorPoint;
    }();

    /**
     * A component that manages actual movement inside the viewport
     * @ko 뷰포트 내에서의 실제 움직임을 담당하는 컴포넌트
     */

    var Camera$1 =
    /*#__PURE__*/
    function () {
      /** */
      function Camera(_a) {
        var _this = this;

        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c;

        this._checkTranslateSupport = function () {
          var e_1, _a;

          var transforms = ["webkitTransform", "msTransform", "MozTransform", "OTransform", "transform"];
          var supportedStyle = document.documentElement.style;
          var transformName = "";

          try {
            for (var transforms_1 = __values(transforms), transforms_1_1 = transforms_1.next(); !transforms_1_1.done; transforms_1_1 = transforms_1.next()) {
              var prefixedTransform = transforms_1_1.value;

              if (prefixedTransform in supportedStyle) {
                transformName = prefixedTransform;
              }
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (transforms_1_1 && !transforms_1_1.done && (_a = transforms_1.return)) _a.call(transforms_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }

          if (!transformName) {
            throw new FlickingError(MESSAGE.TRANSFORM_NOT_SUPPORTED, CODE.TRANSFORM_NOT_SUPPORTED);
          }

          _this._transform = transformName;
        };

        this._flicking = null;

        this._resetInternalValues(); // Options


        this._align = align;
      }

      var __proto = Camera.prototype;
      Object.defineProperty(__proto, "element", {
        // Internal states getter

        /**
         * The camera(`.flicking-camera`) element
         * @ko 카메라(`.flicking-camera`) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Current position of the camera
         * @ko Camera의 현재 좌표
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._position;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        /**
         * Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at
         * @ko 패널의 정렬 기준 위치. 뷰포트 내에서 {@link Panel}의 {@link Panel#alignPosition alignPosition}이 위치해야 하는 곳입니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
        /**
         * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option
         * @ko Camera의 좌표 오프셋. {@link Flicking#renderOnlyVisible renderOnlyVisible} 옵션을 위해 사용됩니다.
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          return this._offset;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "range", {
        /**
         * A range that Camera's {@link Camera#position position} can reach
         * @ko Camera의 {@link Camera#position position}이 도달 가능한 범위
         * @type {object}
         * @property {number} min A minimum position<ko>최소 위치</ko>
         * @property {number} min A maximum position<ko>최대 위치</ko>
         * @readonly
         */
        get: function () {
          return this._range;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rangeDiff", {
        /**
         * A difference between Camera's minimum and maximum position that can reach
         * @ko Camera가 도달 가능한 최소/최대 좌표의 차이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._range.max - this._range.min;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        /**
         * An array of visible panels from the current position
         * @ko 현재 보이는 패널들의 배열
         * @type {Panel[]}
         * @readonly
         */
        get: function () {
          return this._visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visibleRange", {
        /**
         * A range of the visible area from the current position
         * @ko 현재 위치에서 보이는 범위
         * @type {object}
         * @property {number} min A minimum position<ko>최소 위치</ko>
         * @property {number} min A maximum position<ko>최대 위치</ko>
         * @readonly
         */
        get: function () {
          return {
            min: this._position - this._alignPos,
            max: this._position - this._alignPos + this.size
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "anchorPoints", {
        /**
         * An array of {@link AnchorPoint}s that Camera can be stopped at
         * @ko 카메라가 도달 가능한 {@link AnchorPoint}의 목록
         * @type {AnchorPoint[]}
         * @readonly
         */
        get: function () {
          return this._anchors;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "controlParams", {
        /**
         * A current parameters of the Camera for updating {@link AxesController}
         * @ko {@link AxesController}를 업데이트하기 위한 현재 Camera 패러미터들
         * @type {object}
         * @property {object} range Camera {@link Camera#range range}<ko>Camera가 도달 가능한 범위({@link Camera#range range})</ko>
         * @property {number} position Current position<ko>현재 좌표</ko>
         * @property {boolean} circular A Boolean indicating whether the {@link Flicking#circular circular} option is enabled<ko>{@link Flicking#circular circular}옵션 활성화 여부</ko>
         * @readonly
         */
        get: function () {
          return {
            range: this._range,
            position: this._position,
            circular: false
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "atEdge", {
        /**
         * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
         * @ko 현재 카메라가 도달 가능한 범위의 최소 혹은 최대점을 넘어섰는지를 나타냅니다
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._position <= this._range.min || this._position >= this._range.max;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        /**
         * Return the size of the viewport
         * @ko 뷰포트 크기를 반환합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          var flicking = this._flicking;
          return flicking ? flicking.horizontal ? flicking.viewport.width : flicking.viewport.height : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "progress", {
        /**
         * Return the camera's position progress from the first panel to last panel
         * Range is from 0 to last panel's index
         * @ko 첫번째 패널로부터 마지막 패널까지의 카메라 위치의 진행도를 반환합니다
         * 범위는 0부터 마지막 패널의 인덱스까지입니다
         * @type {number}
         * @readonly
         */
        get: function () {
          var flicking = this._flicking;
          var position = this._position + this._offset;
          var nearestAnchor = this.findNearestAnchor(this._position);

          if (!flicking || !nearestAnchor) {
            return NaN;
          }

          var nearestPanel = nearestAnchor.panel;
          var panelPos = nearestPanel.position + nearestPanel.offset;
          var bounceSize = flicking.control.controller.bounce;
          var _a = this.range,
              prevRange = _a.min,
              nextRange = _a.max;
          var rangeDiff = this.rangeDiff;

          if (position === panelPos) {
            return nearestPanel.index;
          }

          if (position < panelPos) {
            var prevPanel = nearestPanel.prev();
            var prevPosition = prevPanel ? prevPanel.position + prevPanel.offset : prevRange - bounceSize[0]; // Looped

            if (prevPosition > panelPos) {
              prevPosition -= rangeDiff;
            }

            return nearestPanel.index - 1 + getProgress(position, prevPosition, panelPos);
          } else {
            var nextPanel = nearestPanel.next();
            var nextPosition = nextPanel ? nextPanel.position + nextPanel.offset : nextRange + bounceSize[1]; // Looped

            if (nextPosition < panelPos) {
              nextPosition += rangeDiff;
            }

            return nearestPanel.index + getProgress(position, panelPos, nextPosition);
          }
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
         * @ko {@link Camera#alignPosition alignPosition}이 뷰포트 엘리먼트 내의 어디에 위치해야 하는지를 나타내는 값
         * @type {ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        set: function (val) {
          this._align = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Camera
       * @ko Camera를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @throws {FlickingError}
       * {@link ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
       * <ko>{@link ERROR_CODE VAL_MUST_NOT_NULL} 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;
        var viewportEl = flicking.viewport.element;
        checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
        this._el = viewportEl.firstElementChild;

        this._checkTranslateSupport();

        return this;
      };
      /**
       * Destroy Camera and return to initial state
       * @ko Camera를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;

        this._resetInternalValues();

        return this;
      };
      /**
       * Move to the given position and apply CSS transform
       * @ko 해당 좌표로 이동하고, CSS transform을 적용합니다
       * @param {number} pos A new position<ko>움직일 위치</ko>
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.lookAt = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
          var prevPos;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                prevPos = this._position;
                this._position = pos;
                return [4
                /*yield*/
                , this._refreshVisiblePanels()];

              case 1:
                _a.sent();

                this._checkNeedPanel();

                this._checkReachEnd(prevPos, pos);

                this._applyTransform();

                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
       * If it does not exist, return `null` instead
       * @ko 주어진 {@link AnchorPoint}의 이전 {@link AnchorPoint}를 반환합니다
       * 존재하지 않을 경우 `null`을 반환합니다
       * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
       * @return {AnchorPoint | null} The previous {@link AnchorPoint}<ko>이전 {@link AnchorPoint}</ko>
       */


      __proto.getPrevAnchor = function (anchor) {
        return this._anchors[anchor.index - 1] || null;
      };
      /**
       * Return a next {@link AnchorPoint} of given {@link AnchorPoint}
       * If it does not exist, return `null` instead
       * @ko 주어진 {@link AnchorPoint}의 다음 {@link AnchorPoint}를 반환합니다
       * 존재하지 않을 경우 `null`을 반환합니다
       * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>기준 {@link AnchorPoint}</ko>
       * @return {AnchorPoint | null} The next {@link AnchorPoint}<ko>다음 {@link AnchorPoint}</ko>
       */


      __proto.getNextAnchor = function (anchor) {
        return this._anchors[anchor.index + 1] || null;
      };
      /**
       * Return the camera's position progress in the panel below
       * Value is from 0 to 1 when the camera's inside panel
       * Value can be lower than 0 or bigger than 1 when it's in the margin area
       * @ko 현재 카메라 아래 패널에서의 위치 진행도를 반환합니다
       * 반환값은 카메라가 패널 내부에 있을 경우 0부터 1까지의 값을 갖습니다
       * 패널의 margin 영역에 있을 경우 0보다 작거나 1보다 큰 값을 반환할 수 있습니다
       */


      __proto.getProgressInPanel = function (panel) {
        var panelRange = panel.range;
        return (this._position - panelRange.min) / (panelRange.max - panelRange.min);
      };
      /**
       * Return {@link AnchorPoint} that includes given position
       * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
       * @ko 주어진 좌표를 포함하는 {@link AnchorPoint}를 반환합니다
       * 주어진 좌표를 포함하는 {@link AnchorPoint}가 없을 경우 `null`을 반환합니다
       * @param {number} position A position to check<ko>확인할 좌표</ko>
       * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>
       */


      __proto.findAnchorIncludePosition = function (position) {
        var anchors = this._anchors;
        var anchorsIncludingPosition = anchors.filter(function (anchor) {
          return anchor.panel.includePosition(position, true);
        });
        return anchorsIncludingPosition.reduce(function (nearest, anchor) {
          if (!nearest) return anchor;
          return Math.abs(nearest.position - position) < Math.abs(anchor.position - position) ? nearest : anchor;
        }, null);
      };
      /**
       * Return {@link AnchorPoint} nearest to given position
       * If there're no {@link AnchorPoint}s, return `null` instead
       * @ko 해당 좌표에서 가장 가까운 {@link AnchorPoint}를 반환합니다
       * {@link AnchorPoint}가 하나도 없을 경우 `null`을 반환합니다
       * @param {number} position A position to check<ko>확인할 좌표</ko>
       * @return {AnchorPoint | null} The {@link AnchorPoint} nearest to the given position<ko>해당 좌표에 가장 인접한 {@link AnchorPoint}</ko>
       */


      __proto.findNearestAnchor = function (position) {
        var anchors = this._anchors;
        if (anchors.length <= 0) return null;
        var prevDist = Infinity;

        for (var anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
          var anchor = anchors[anchorIdx];
          var dist = Math.abs(anchor.position - position);

          if (dist > prevDist) {
            // Return previous anchor
            return anchors[anchorIdx - 1];
          }

          prevDist = dist;
        } // Return last anchor


        return anchors[anchors.length - 1];
      };
      /**
       * Clamp the given position between camera's range
       * @ko 주어진 좌표를 Camera가 도달 가능한 범위 사이의 값으로 만듭니다
       * @param {number} position A position to clamp<ko>범위를 제한할 좌표</ko>
       * @return {number} A clamped position<ko>범위 제한된 좌표</ko>
       */


      __proto.clampToReachablePosition = function (position) {
        var range = this._range;
        return clamp(position, range.min, range.max);
      };
      /**
       * Check whether the given panel is inside of the Camera's range
       * @ko 해당 {@link Panel}이 Camera가 도달 가능한 범위 내에 있는지를 반환합니다
       * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
       * @return {boolean} Whether the panel's inside Camera's range<ko>도달 가능한 범위 내에 해당 패널이 존재하는지 여부</ko>
       */


      __proto.canReach = function (panel) {
        var range = this._range;
        if (panel.removed) return false;
        var panelPos = panel.position;
        return panelPos >= range.min && panelPos <= range.max;
      };
      /**
       * Check whether the given panel element is visible at the current position
       * @ko 현재 좌표에서 해당 패널 엘리먼트를 볼 수 있는지 여부를 반환합니다
       * @param panel An instance of {@link Panel} to check<ko>확인할 {@link Panel}의 인스턴스</ko>
       * @return Whether the panel element is visible at the current position<ko>현재 위치에서 해당 패널 엘리먼트가 보이는지 여부</ko>
       */


      __proto.canSee = function (panel) {
        var visibleRange = this.visibleRange; // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.

        return panel.includeRange(visibleRange.min, visibleRange.max, false);
      };
      /**
       * Update Camera's {@link Camera#alignPosition alignPosition}
       * @ko Camera의 {@link Camera#alignPosition alignPosition}을 업데이트합니다
       * @chainable
       * @return {this}
       */


      __proto.updateAlignPos = function () {
        var align = this._align;
        var alignVal = typeof align === "object" ? align.camera : align;
        this._alignPos = parseAlign(alignVal, this.size);
        return this;
      };
      /**
       * Update Camera's {@link Camera#anchorPoints anchorPoints}
       * @ko Camera의 {@link Camera#anchorPoints anchorPoints}를 업데이트합니다
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {this}
       */


      __proto.updateAnchors = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;
        this._anchors = panels.map(function (panel, index) {
          return new AnchorPoint({
            index: index,
            position: panel.position,
            panel: panel
          });
        });
        return this;
      };
      /**
       * Update Viewport's height to active panel's height
       * @ko 현재 선택된 패널의 높이와 동일하도록 뷰포트의 높이를 업데이트합니다
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {this}
       */


      __proto.updateAdaptiveHeight = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var activePanel = flicking.control.activePanel;
        if (!flicking.horizontal || !flicking.adaptive || !activePanel) return;
        flicking.viewport.setSize({
          height: activePanel.height
        });
      };

      __proto.updateOffset = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var unRenderedPanels = flicking.panels.filter(function (panel) {
          return !panel.rendered;
        });
        var position = this._position;
        this._offset = unRenderedPanels.filter(function (panel) {
          return panel.position + panel.offset < position;
        }).reduce(function (offset, panel) {
          return offset + panel.sizeIncludingMargin;
        }, 0);

        this._applyTransform();
      };
      /**
       * Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again
       * @ko 발생한 {@link Flicking#event:needPanel needPanel} 이벤트들을 초기화하여 다시 발생할 수 있도록 합니다
       * @chainable
       * @return {this}
       */


      __proto.resetNeedPanelHistory = function () {
        this._needPanelTriggered = {
          prev: false,
          next: false
        };
        return this;
      };

      __proto._resetInternalValues = function () {
        this._position = 0;
        this._alignPos = 0;
        this._offset = 0;
        this._range = {
          min: 0,
          max: 0
        };
        this._visiblePanels = [];
        this._anchors = [];
        this._needPanelTriggered = {
          prev: false,
          next: false
        };
      };

      __proto._refreshVisiblePanels = function () {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, panels, newVisiblePanels, prevVisiblePanels, added, removed;

          var _this = this;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                flicking = getFlickingAttached(this._flicking, "Camera");
                panels = flicking.renderer.panels;
                newVisiblePanels = panels.filter(function (panel) {
                  return _this.canSee(panel);
                });
                prevVisiblePanels = this._visiblePanels;
                this._visiblePanels = newVisiblePanels;
                added = newVisiblePanels.filter(function (panel) {
                  return !includes(prevVisiblePanels, panel);
                });
                removed = prevVisiblePanels.filter(function (panel) {
                  return !includes(newVisiblePanels, panel);
                });
                if (!(added.length > 0 || removed.length > 0)) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , flicking.renderer.render()];

              case 1:
                _a.sent();

                flicking.trigger(new Component.ComponentEvent(EVENTS.VISIBLE_CHANGE, {
                  added: added,
                  removed: removed,
                  visiblePanels: newVisiblePanels
                }));
                _a.label = 2;

              case 2:
                return [2
                /*return*/
                ];
            }
          });
        });
      };

      __proto._checkNeedPanel = function () {
        var needPanelTriggered = this._needPanelTriggered;
        if (needPanelTriggered.prev && needPanelTriggered.next) return;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;

        if (panels.length <= 0) {
          if (!needPanelTriggered.prev) {
            flicking.trigger(new Component.ComponentEvent(EVENTS.NEED_PANEL, {
              direction: DIRECTION.PREV
            }));
            needPanelTriggered.prev = true;
          }

          if (!needPanelTriggered.next) {
            flicking.trigger(new Component.ComponentEvent(EVENTS.NEED_PANEL, {
              direction: DIRECTION.NEXT
            }));
            needPanelTriggered.next = true;
          }

          return;
        }

        var cameraPosition = this._position;
        var cameraSize = this.size;
        var cameraRange = this._range;
        var needPanelThreshold = flicking.needPanelThreshold;
        var cameraPrev = cameraPosition - this._alignPos;
        var cameraNext = cameraPrev + cameraSize;
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];

        if (!needPanelTriggered.prev) {
          var firstPanelPrev = firstPanel.range.min;

          if (cameraPrev <= firstPanelPrev + needPanelThreshold || cameraPosition <= cameraRange.min + needPanelThreshold) {
            flicking.trigger(new Component.ComponentEvent(EVENTS.NEED_PANEL, {
              direction: DIRECTION.PREV
            }));
            needPanelTriggered.prev = true;
          }
        }

        if (!needPanelTriggered.next) {
          var lastPanelNext = lastPanel.range.max;

          if (cameraNext >= lastPanelNext - needPanelThreshold || cameraPosition >= cameraRange.max - needPanelThreshold) {
            flicking.trigger(new Component.ComponentEvent(EVENTS.NEED_PANEL, {
              direction: DIRECTION.NEXT
            }));
            needPanelTriggered.next = true;
          }
        }
      };

      __proto._checkReachEnd = function (prevPos, newPos) {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var range = this._range;
        var wasBetweenRange = prevPos > range.min && prevPos < range.max;
        var isBetweenRange = newPos > range.min && newPos < range.max;
        if (!wasBetweenRange || isBetweenRange) return;
        var direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;
        flicking.trigger(new Component.ComponentEvent(EVENTS.REACH_EDGE, {
          direction: direction
        }));
      };

      __proto._applyTransform = function () {
        var el = this._el;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var actualPosition = this._position - this._alignPos - this._offset;
        el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
      };

      return Camera;
    }();

    /**
     * A {@link Camera} that can move from the position of the first panel to the position of the last panel
     * @ko 첫번째 패널의 좌표로부터 마지막 패널의 좌표로까지 이동할 수 있는 종류의 {@link Camera}
     */

    var LinearCamera =
    /*#__PURE__*/
    function (_super) {
      __extends(LinearCamera, _super);

      function LinearCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      var __proto = LinearCamera.prototype;

      __proto.updateRange = function () {
        var _a, _b;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var firstPanel = renderer.getPanel(0);
        var lastPanel = renderer.getPanel(renderer.panelCount - 1);
        this._range = {
          min: (_a = firstPanel === null || firstPanel === void 0 ? void 0 : firstPanel.position) !== null && _a !== void 0 ? _a : 0,
          max: (_b = lastPanel === null || lastPanel === void 0 ? void 0 : lastPanel.position) !== null && _b !== void 0 ? _b : 0
        };
        return this;
      };

      return LinearCamera;
    }(Camera$1);

    /**
     * A {@link Camera} that connects the last panel and the first panel, enabling continuous loop
     * @ko 첫번째 패널과 마지막 패널이 이어진 상태로, 무한히 회전할 수 있는 종류의 {@link Camera}
     */

    var CircularCamera =
    /*#__PURE__*/
    function (_super) {
      __extends(CircularCamera, _super);

      function CircularCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this._circularOffset = 0;
        _this._circularEnabled = false;
        return _this;
      }

      var __proto = CircularCamera.prototype;
      Object.defineProperty(__proto, "offset", {
        get: function () {
          return this._offset - this._circularOffset;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "controlParams", {
        get: function () {
          return {
            range: this._range,
            position: this._position,
            circular: this._circularEnabled
          };
        },
        enumerable: false,
        configurable: true
      });

      __proto.getPrevAnchor = function (anchor) {
        if (!this._circularEnabled || anchor.index !== 0) return _super.prototype.getPrevAnchor.call(this, anchor);
        var anchors = this._anchors;
        var rangeDiff = this.rangeDiff;
        var lastAnchor = anchors[anchors.length - 1];
        return new AnchorPoint({
          index: lastAnchor.index,
          position: lastAnchor.position - rangeDiff,
          panel: lastAnchor.panel
        });
      };

      __proto.getNextAnchor = function (anchor) {
        var anchors = this._anchors;
        if (!this._circularEnabled || anchor.index !== anchors.length - 1) return _super.prototype.getNextAnchor.call(this, anchor);
        var rangeDiff = this.rangeDiff;
        var firstAnchor = anchors[0];
        return new AnchorPoint({
          index: firstAnchor.index,
          position: firstAnchor.position + rangeDiff,
          panel: firstAnchor.panel
        });
      };

      __proto.findAnchorIncludePosition = function (position) {
        if (!this._circularEnabled) return _super.prototype.findAnchorIncludePosition.call(this, position);
        var range = this._range;
        var positionInRange = circulatePosition(position, range.min, range.max);

        var anchorInRange = _super.prototype.findAnchorIncludePosition.call(this, positionInRange);

        if (!anchorInRange) return null;
        var rangeDiff = this.rangeDiff;

        if (position < range.min) {
          var loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;
          return new AnchorPoint({
            index: anchorInRange.index,
            position: anchorInRange.position + rangeDiff * loopCount,
            panel: anchorInRange.panel
          });
        } else if (position > range.max) {
          var loopCount = Math.floor((position - range.max) / rangeDiff) + 1;
          return new AnchorPoint({
            index: anchorInRange.index,
            position: anchorInRange.position + rangeDiff * loopCount,
            panel: anchorInRange.panel
          });
        }

        return anchorInRange;
      };

      __proto.clampToReachablePosition = function (position) {
        // Basically all position is reachable for circular camera
        return this._circularEnabled ? position : _super.prototype.clampToReachablePosition.call(this, position);
      };

      __proto.canReach = function (panel) {
        if (panel.removed) return false;
        return this._circularEnabled // Always reachable on circular mode
        ? true : _super.prototype.canReach.call(this, panel);
      };

      __proto.canSee = function (panel) {
        var range = this._range;
        var rangeDiff = this.rangeDiff;
        var visibleRange = this.visibleRange;

        var visibleInCurrentRange = _super.prototype.canSee.call(this, panel);

        if (!this._circularEnabled) {
          return visibleInCurrentRange;
        } // Check looped visible area for circular case


        if (visibleRange.min < range.min) {
          return visibleInCurrentRange || panel.includeRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff, false);
        } else if (visibleRange.max > range.max) {
          return visibleInCurrentRange || panel.includeRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff, false);
        }

        return visibleInCurrentRange;
      };
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.updateRange = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var panels = renderer.panels;

        if (panels.length <= 0) {
          this._resetInternalValues();

          return this;
        }

        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
        var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
        var visibleSize = this.size;
        var panelSizeSum = lastPanelNext - firstPanelPrev;
        var canSetCircularMode = panels.every(function (panel) {
          return panelSizeSum - panel.size >= visibleSize;
        });
        this._circularEnabled = canSetCircularMode;

        if (canSetCircularMode) {
          this._range = {
            min: firstPanelPrev,
            max: lastPanelNext
          };
          panels.forEach(function (panel) {
            return panel.updateCircularToggleDirection();
          });
        } else {
          this._range = {
            min: firstPanel.position,
            max: lastPanel.position
          };
        }

        this._updateCircularOffset();

        return this;
      };

      __proto.lookAt = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, prevPos, panels, toggled;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                flicking = getFlickingAttached(this._flicking, "Camera");
                prevPos = this._position;
                if (!(pos === prevPos)) return [3
                /*break*/
                , 2];
                return [4
                /*yield*/
                , _super.prototype.lookAt.call(this, pos)];

              case 1:
                return [2
                /*return*/
                , _a.sent()];

              case 2:
                panels = flicking.renderer.panels;
                toggled = panels.map(function (panel) {
                  return panel.toggle(prevPos, pos);
                });
                this._position = pos;
                if (!toggled.some(function (isToggled) {
                  return isToggled;
                })) return [3
                /*break*/
                , 4];

                this._updateCircularOffset();

                return [4
                /*yield*/
                , flicking.renderer.render()];

              case 3:
                _a.sent();

                _a.label = 4;

              case 4:
                return [4
                /*yield*/
                , _super.prototype.lookAt.call(this, pos)];

              case 5:
                return [2
                /*return*/
                , _a.sent()];
            }
          });
        });
      };

      __proto._applyTransform = function () {
        var el = this._el;
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;
        el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
      };

      __proto._resetInternalValues = function () {
        _super.prototype._resetInternalValues.call(this);

        this._circularOffset = 0;
        this._circularEnabled = false;
      };

      __proto._calcPanelAreaSum = function (panels) {
        return panels.reduce(function (sum, panel) {
          return sum + panel.sizeIncludingMargin;
        }, 0);
      };

      __proto._updateCircularOffset = function () {
        if (!this._circularEnabled) {
          this._circularOffset = 0;
          return;
        }

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var toggledPrev = [];
        var toggledNext = [];
        flicking.panels.filter(function (panel) {
          return panel.toggled;
        }).forEach(function (panel) {
          if (panel.toggleDirection === DIRECTION.PREV) {
            toggledPrev.push(panel);
          } else {
            toggledNext.push(panel);
          }
        });
        this._circularOffset = this._calcPanelAreaSum(toggledPrev) - this._calcPanelAreaSum(toggledNext);
      };

      return CircularCamera;
    }(Camera$1);

    /**
     * A {@link Camera} that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel
     * @ko 첫번째와 마지막 패널 밖으로 넘어가지 못하도록 범위를 설정하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 종류의 {@link Camera}
     */

    var BoundCamera =
    /*#__PURE__*/
    function (_super) {
      __extends(BoundCamera, _super);

      function BoundCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Update {@link Camera#range range} of Camera
       * @ko Camera의 {@link Camera#range range}를 업데이트합니다
       * @chainable
       * @throws {FlickingError}
       * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      var __proto = BoundCamera.prototype;

      __proto.updateRange = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var renderer = flicking.renderer;
        var alignPos = this._alignPos;
        var firstPanel = renderer.getPanel(0);
        var lastPanel = renderer.getPanel(renderer.panelCount - 1);

        if (!firstPanel || !lastPanel) {
          this._range = {
            min: 0,
            max: 0
          };
          return this;
        }

        var viewportSize = this.size;
        var firstPanelPrev = firstPanel.range.min;
        var lastPanelNext = lastPanel.range.max;
        var panelAreaSize = lastPanelNext - firstPanelPrev;
        var canSetBoundMode = viewportSize < panelAreaSize;

        if (canSetBoundMode) {
          this._range = {
            min: firstPanelPrev + alignPos,
            max: lastPanelNext - viewportSize + alignPos
          };
        } else {
          this._range = {
            min: firstPanel.position,
            max: lastPanel.position
          };
        }

        return this;
      };

      __proto.updateAnchors = function () {
        var _this = this;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;

        if (panels.length <= 0) {
          this._anchors = [];
          return this;
        }

        var range = this._range;
        var reachablePanels = panels.filter(function (panel) {
          return _this.canReach(panel);
        });

        if (reachablePanels.length > 0) {
          var shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
          var shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
          var indexOffset_1 = shouldPrependBoundAnchor ? 1 : 0;
          var newAnchors = reachablePanels.map(function (panel, idx) {
            return new AnchorPoint({
              index: idx + indexOffset_1,
              position: panel.position,
              panel: panel
            });
          });

          if (shouldPrependBoundAnchor) {
            newAnchors.splice(0, 0, new AnchorPoint({
              index: 0,
              position: range.min,
              panel: panels[reachablePanels[0].index - 1]
            }));
          }

          if (shouldAppendBoundAnchor) {
            newAnchors.push(new AnchorPoint({
              index: newAnchors.length,
              position: range.max,
              panel: panels[reachablePanels[reachablePanels.length - 1].index + 1]
            }));
          }

          this._anchors = newAnchors;
        } else if (range.min !== range.max) {
          // There're more than 2 panels
          var nearestPanelAtMin = this._findNearestPanel(range.min, panels);

          var panelAtMin = nearestPanelAtMin.index === panels.length - 1 ? nearestPanelAtMin.prev() : nearestPanelAtMin;
          var panelAtMax = panelAtMin.next();
          this._anchors = [new AnchorPoint({
            index: 0,
            position: range.min,
            panel: panelAtMin
          }), new AnchorPoint({
            index: 1,
            position: range.max,
            panel: panelAtMax
          })];
        } else {
          this._anchors = [new AnchorPoint({
            index: 0,
            position: range.min,
            panel: this._findNearestPanel(range.min, panels)
          })];
        }

        return this;
      };

      __proto._findNearestPanel = function (pos, panels) {
        var prevDist = Infinity;

        for (var panelIdx = 0; panelIdx < panels.length; panelIdx++) {
          var panel = panels[panelIdx];
          var dist = Math.abs(panel.position - pos);

          if (dist > prevDist) {
            // Return previous anchor
            return panels[panelIdx - 1];
          }

          prevDist = dist;
        } // Return last anchor


        return panels[panels.length - 1];
      };

      return BoundCamera;
    }(Camera$1);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Camera = {
        __proto__: null,
        Camera: Camera$1,
        LinearCamera: LinearCamera,
        CircularCamera: CircularCamera,
        BoundCamera: BoundCamera
    };

    var RawRenderingStrategy =
    /*#__PURE__*/
    function () {
      function RawRenderingStrategy() {}

      var __proto = RawRenderingStrategy.prototype;

      __proto.updateRenderingPanels = function (flicking) {
        // RawRenderingStrategy always renders all panel elements
        flicking.panels.forEach(function (panel) {
          return panel.markForShow();
        });
      };

      return RawRenderingStrategy;
    }();

    /**
     * A component that manages {@link Panel} and its elements
     * @ko {@link Panel}과 그 엘리먼트들을 관리하는 컴포넌트
     */

    var Renderer$1 =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An {@link Flicking#align align} value that will be applied to all panels<ko>전체 패널에 적용될 {@link Flicking#align align} 값</ko>
       */
      function Renderer(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.strategy,
            strategy = _d === void 0 ? new RawRenderingStrategy() : _d;

        this._align = align;
        this._flicking = null;
        this._renderingStrategy = strategy;
        this._panels = [];
      }

      var __proto = Renderer.prototype;
      Object.defineProperty(__proto, "panels", {
        // Internal states Getter

        /**
         * Array of panels
         * @ko 전체 패널들의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        /**
         * Count of panels
         * @ko 전체 패널의 개수
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._panels.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
         * @ko {@link Panel}에 공통적으로 적용할 {@link Panel#align align} 값
         * @type {Constants.ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        set: function (val) {
          this._align = val;

          var panelAlign = this._getPanelAlign();

          this._panels.forEach(function (panel) {
            panel.align = panelAlign;
          });
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Renderer
       * @ko Renderer를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._collectPanels();

        return this;
      };
      /**
       * Destroy Renderer and return to initial state
       * @ko Renderer를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;
        this._panels = [];
      };
      /**
       * Return the {@link Panel} at the given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
       * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
       * @see Panel
       */


      __proto.getPanel = function (index) {
        return this._panels[index] || null;
      };
      /**
       * Update all panel sizes
       * @ko 모든 패널의 크기를 업데이트합니다
       * @chainable
       * @return {this}
       */


      __proto.updatePanelSize = function () {
        this._panels.forEach(function (panel) {
          return panel.resize();
        });

        return this;
      };
      /**
       * Insert new panels at given index
       * This will increase index of panels after by the number of panels added
       * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
       * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
       * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
       * @param {any[]} elements An array of element or framework component with element in it<ko>엘리먼트의 배열 혹은 프레임워크에서 엘리먼트를 포함한 컴포넌트들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       */


      __proto.batchInsert = function () {
        var _this = this;

        var items = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          items[_i] = arguments[_i];
        }

        var panels = this._panels;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var control = flicking.control;

        var align = this._getPanelAlign();

        var allPanelsInserted = items.reduce(function (addedPanels, item) {
          var _a;

          var insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
          var panelsPushed = panels.slice(insertingIdx);
          var panelsInserted = item.elements.map(function (el) {
            return _this._createPanel(el, {
              index: insertingIdx,
              align: align,
              flicking: flicking
            });
          });
          panels.splice.apply(panels, __spreadArray([insertingIdx, 0], __read(panelsInserted))); // Resize the newly added panels

          panelsInserted.forEach(function (panel) {
            return panel.resize();
          });

          var insertedSize = _this._getPanelSizeSum(panelsInserted); // Update panel indexes & positions


          panelsPushed.forEach(function (panel) {
            panel.increaseIndex(panelsInserted.length);
            panel.increasePosition(insertedSize);
          }); // Insert the actual elements as camera element's children

          _this._insertPanelElements(panelsInserted, (_a = panelsPushed[0]) !== null && _a !== void 0 ? _a : null);

          return __spreadArray(__spreadArray([], __read(addedPanels)), __read(panelsInserted));
        }, []);
        if (allPanelsInserted.length <= 0) return []; // Update camera & control

        this._updateCameraAndControl();

        void this.render(); // Move to the first panel added if no panels existed
        // FIXME: fix for animating case

        if (allPanelsInserted.length > 0 && !control.animating) {
          void control.moveToPanel(control.activePanel || allPanelsInserted[0], {
            duration: 0
          }).catch(function () {
            return void 0;
          });
        }

        flicking.camera.updateOffset();
        flicking.trigger(new Component.ComponentEvent(EVENTS.PANEL_CHANGE, {
          added: allPanelsInserted,
          removed: []
        }));
        return allPanelsInserted;
      };
      /**
       * Remove the panel at the given index
       * This will decrease index of panels after by the number of panels removed
       * @ko 주어진 인덱스의 패널을 제거합니다
       * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
       * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
       * @return An array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.batchRemove = function () {
        var _this = this;

        var items = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          items[_i] = arguments[_i];
        }

        var panels = this._panels;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;
        var activePanel = control.activePanel;
        var activeIndex = control.activeIndex;
        var allPanelsRemoved = items.reduce(function (removed, item) {
          var index = item.index,
              deleteCount = item.deleteCount;
          var removingIdx = getMinusCompensatedIndex(index, panels.length);
          var panelsPulled = panels.slice(removingIdx + deleteCount);
          var panelsRemoved = panels.splice(removingIdx, deleteCount);
          if (panelsRemoved.length <= 0) return []; // Update panel indexes & positions

          var removedSize = _this._getPanelSizeSum(panelsRemoved);

          panelsPulled.forEach(function (panel) {
            panel.decreaseIndex(panelsRemoved.length);
            panel.decreasePosition(removedSize);
          });

          _this._removePanelElements(panelsRemoved); // Remove panel elements


          panelsRemoved.forEach(function (panel) {
            return panel.destroy();
          }); // Update camera & control

          _this._updateCameraAndControl();

          if (includes(panelsRemoved, activePanel)) {
            control.resetActive();
          }

          return __spreadArray(__spreadArray([], __read(removed)), __read(panelsRemoved));
        }, []);
        void this.render(); // FIXME: fix for animating case

        if (allPanelsRemoved.length > 0 && !control.animating) {
          var targetPanel = includes(allPanelsRemoved, activePanel) ? panels[activeIndex] || panels[panels.length - 1] : activePanel;

          if (targetPanel) {
            void control.moveToPanel(targetPanel, {
              duration: 0
            }).catch(function () {
              return void 0;
            });
          } else {
            // All panels removed
            void camera.lookAt(0);
          }
        }

        flicking.camera.updateOffset();
        flicking.trigger(new Component.ComponentEvent(EVENTS.PANEL_CHANGE, {
          added: [],
          removed: allPanelsRemoved
        }));
        return allPanelsRemoved;
      };

      __proto._getPanelAlign = function () {
        var align = this._align;
        return typeof align === "object" ? align.panel : align;
      };

      __proto._getPanelSizeSum = function (panels) {
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var marginDiff = lastPanel.margin.next - firstPanel.margin.prev;
        return lastPanel.range.max - firstPanel.range.min + marginDiff;
      };

      __proto._updateCameraAndControl = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;
        camera.updateRange();
        camera.updateAnchors();
        camera.resetNeedPanelHistory();
        control.updateInput();
      };

      return Renderer;
    }();

    var Panel =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
       * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
       */
      function Panel(_a) {
        var index = _a.index,
            align = _a.align,
            flicking = _a.flicking;
        this._index = index;
        this._flicking = flicking;
        this._align = align;
        this._removed = false;

        this._resetInternalStates();
      }

      var __proto = Panel.prototype;
      Object.defineProperty(__proto, "index", {
        /**
         * Index of the panel
         * @ko 패널의 인덱스
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        /**
         * Position of the panel, including {@link Panel#alignPosition alignPosition}
         * @ko 패널의 현재 좌표, {@link Panel#alignPosition alignPosition}을 포함하고 있습니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._pos + this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        /**
         * Cached size of the panel element
         * This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else
         * @ko 패널 엘리먼트의 캐시된 크기
         * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 {@link Panel#element element}의 `offsetWidth`와 동일하고, `false`일 경우 `offsetHeight`와 동일합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "sizeIncludingMargin", {
        /**
         * Panel's size including CSS `margin`
         * This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else
         * @ko CSS `margin`을 포함한 패널의 크기
         * 이 값은 {@link Flicking#horizontal horizontal}이 `true`일 경우 margin left/right을 포함하고, `false`일 경우 margin top/bottom을 포함합니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._size + this._margin.prev + this._margin.next;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        /**
         * Height of the panel element
         * @ko 패널 엘리먼트의 높이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._height;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "margin", {
        /**
         * Cached CSS `margin` value of the panel element
         * @ko 패널 엘리먼트의 CSS `margin` 값
         * @type {object}
         * @property {number} prev CSS `margin-left` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-top` else
         * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-left`, `false`일 경우 `margin-top`에 해당하는 값</ko>
         * @property {number} next CSS `margin-right` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-bottom` else
         * <ko>{@link Flicking#horizontal horizontal}이 `true`일 경우 `margin-right`, `false`일 경우 `margin-bottom`에 해당하는 값</ko>
         * @readonly
         */
        get: function () {
          return this._margin;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        /**
         * Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at
         * @ko 패널의 정렬 기준 위치. {@link Camera}의 뷰포트 내에서의 {@link Camera#alignPosition alignPosition}이 위치해야 하는 곳입니다
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "removed", {
        /**
         * A value indicating whether the panel's {@link Flicking#remove remove}d
         * @ko 패널이 {@link Flicking#remove remove}되었는지 여부를 나타내는 값
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._removed;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "range", {
        /**
         * Panel element's range of the bounding box
         * @ko 패널 엘리먼트의 Bounding box 범위
         * @type {object}
         * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
         * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
         * @readonly
         */
        get: function () {
          return {
            min: this._pos,
            max: this._pos + this._size
          };
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "toggled", {
        /**
         * A value indicating whether the panel's position is toggled by circular behavior
         * @ko 패널의 위치가 circular 동작에 의해 토글되었는지 여부를 나타내는 값
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._toggled;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "toggleDirection", {
        /**
         * A direction where the panel's position is toggled
         * @ko 패널의 위치가 circular 동작에 의해 토글되는 방향
         * @type {DIRECTION}
         * @readonly
         */
        get: function () {
          return this._toggleDirection;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
        /**
         * Actual position offset determined by {@link Panel#order}
         * @ko {@link Panel#order}에 의한 실제 위치 변경값
         * @type {number}
         * @readonly
         */
        get: function () {
          var toggleDirection = this._toggleDirection;
          var cameraRangeDiff = this._flicking.camera.rangeDiff;
          return toggleDirection === DIRECTION.NONE || !this._toggled ? 0 : toggleDirection === DIRECTION.PREV ? -cameraRangeDiff : cameraRangeDiff;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "progress", {
        /**
         * Progress of movement between previous or next panel relative to current panel
         * @ko 이 패널로부터 이전/다음 패널으로의 이동 진행률
         * @type {number}
         * @readonly
         */
        get: function () {
          var flicking = this._flicking;
          return this.index - flicking.camera.progress;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "outsetProgress", {
        /**
         * Progress of movement between points that panel is completely invisible outside of viewport(prev direction: -1, selected point: 0, next direction: 1)
         * @ko 현재 패널이 뷰포트 영역 밖으로 완전히 사라지는 지점을 기준으로 하는 진행도(prev방향: -1, 선택 지점: 0, next방향: 1)
         * @type {number}
         * @readonly
         */
        get: function () {
          var position = this.position + this.offset;
          var alignPosition = this._alignPos;
          var camera = this._flicking.camera;
          var camPos = camera.position;

          if (camPos === position) {
            return 0;
          }

          if (camPos < position) {
            var disappearPosNext = position + (camera.size - camera.alignPosition) + alignPosition;
            return -getProgress(camPos, position, disappearPosNext);
          } else {
            var disappearPosPrev = position - (camera.alignPosition + this._size - alignPosition);
            return 1 - getProgress(camPos, disappearPosPrev, position);
          }
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visibleRatio", {
        /**
         * Percentage of area where panel is visible in the viewport
         * @ko 뷰포트 안에서 패널이 보이는 영역의 비율
         * @type {number}
         * @readonly
         */
        get: function () {
          var range = this.range;
          var size = this._size;
          var offset = this.offset;
          var visibleRange = this._flicking.camera.visibleRange;
          var checkingRange = {
            min: range.min + offset,
            max: range.max + offset
          };

          if (checkingRange.max <= visibleRange.min || checkingRange.min >= visibleRange.max) {
            return 0;
          }

          var visibleSize = size;

          if (visibleRange.min > checkingRange.min) {
            visibleSize -= visibleRange.min - checkingRange.min;
          }

          if (visibleRange.max < checkingRange.max) {
            visibleSize -= checkingRange.max - visibleRange.max;
          }

          return visibleSize / size;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
         * @ko {@link Panel#alignPosition alignPosition}이 패널 내의 어디에 위치해야 하는지를 나타내는 값
         * @type {Constants.ALIGN | string | number}
         */
        get: function () {
          return this._align;
        },
        // Options Getter
        set: function (val) {
          this._align = val;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Update size of the panel
       * @ko 패널의 크기를 갱신합니다
       * @chainable
       * @return {this}
       */

      __proto.resize = function () {
        var el = this.element;
        var elStyle = getStyle(el);
        var flicking = this._flicking;
        var horizontal = flicking.horizontal;
        var prevPanel = flicking.renderer.panels[this._index - 1];
        this._size = horizontal ? el.offsetWidth : el.offsetHeight;
        this._margin = horizontal ? {
          prev: parseFloat(elStyle.marginLeft || "0"),
          next: parseFloat(elStyle.marginRight || "0")
        } : {
          prev: parseFloat(elStyle.marginTop || "0"),
          next: parseFloat(elStyle.marginBottom || "0")
        };
        this._pos = prevPanel ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev : this._margin.prev;
        this._height = horizontal ? el.offsetHeight : this._size;

        this._updateAlignPos();

        return this;
      };
      /**
       * Check whether the given element is inside of this panel's {@link Panel#element element}
       * @ko 해당 엘리먼트가 이 패널의 {@link Panel#element element} 내에 포함되어 있는지를 반환합니다
       * @param {HTMLElement} element The HTMLElement to check<ko>확인하고자 하는 HTMLElement</ko>
       * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>패널의 {@link Panel#element element}내에 해당 엘리먼트 포함 여부</ko>
       */


      __proto.contains = function (element) {
        return this.element.contains(element);
      };
      /**
       * Reset internal state and set {@link Panel#removed removed} to `true`
       * @ko 내부 상태를 초기화하고 {@link Panel#removed removed}를 `true`로 설정합니다.
       * @return {void}
       */


      __proto.destroy = function () {
        this._resetInternalStates();

        this._removed = true;
      };
      /**
       * Check whether the given position is inside of this panel's {@link Panel#range range}
       * @ko 주어진 좌표가 현재 패널의 {@link Panel#range range}내에 속해있는지를 반환합니다.
       * @param {number} pos A position to check<ko>확인하고자 하는 좌표</ko>
       * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
       * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>해당 좌표가 패널 영역 내에 속해있는지 여부</ko>
       */


      __proto.includePosition = function (pos, includeMargin) {
        if (includeMargin === void 0) {
          includeMargin = false;
        }

        return this.includeRange(pos, pos, includeMargin);
      };
      /**
       * Check whether the given range is fully included in this panel's area
       * @ko 주어진 범위가 이 패널 내부에 완전히 포함되는지를 반환합니다
       * @param {number} min Minimum value of the range to check<ko>확인하고자 하는 최소 범위</ko>
       * @param {number} max Maximum value of the range to check<ko>확인하고자 하는 최대 범위</ko>
       * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>패널 영역에 {@link Panel#margin margin}값을 포함시킵니다</ko>
       * @returns {boolean} A Boolean value indicating whether the given range is fully included in the panel range<ko>해당 범위가 패널 영역 내에 완전히 속해있는지 여부</ko>
       */


      __proto.includeRange = function (min, max, includeMargin) {
        if (includeMargin === void 0) {
          includeMargin = false;
        }

        var margin = this._margin;
        var panelRange = this.range;

        if (includeMargin) {
          panelRange.min -= margin.prev;
          panelRange.max += margin.next;
        }

        return max >= panelRange.min && min <= panelRange.max;
      };
      /**
       * Move {@link Camera} to this panel
       * @ko {@link Camera}를 이 패널로 이동합니다
       * @param {number} [duration] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @returns {Promise<void>} A Promise which will be resolved after reaching the panel<ko>패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.focus = function (duration) {
        return this._flicking.moveTo(this._index, duration);
      };
      /**
       * Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
       * If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel
       * @ko 이전(`index - 1`) 패널을 반환합니다. 이전 패널이 없을 경우 `null`을 반환합니다
       * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 첫번째 패널에서 이 메소드를 호출할 경우 마지막 패널을 반환합니다
       * @returns {Panel | null} The previous panel<ko>이전 패널</ko>
       */


      __proto.prev = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1) : renderer.getPanel(index - 1);
      };
      /**
       * Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
       * If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel
       * @ko 다음(`index + 1`) 패널을 반환합니다. 다음 패널이 없을 경우 `null`을 반환합니다
       * {@link Flicking#circularEnabled circular} 모드가 활성화되었을 때 마지막 패널에서 이 메소드를 호출할 경우 첫번째 패널을 반환합니다
       * @returns {Panel | null} The previous panel<ko>다음 패널</ko>
       */


      __proto.next = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1) : renderer.getPanel(index + 1);
      };
      /**
       * Increase panel's index by the given value
       * @ko 패널의 인덱스를 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increaseIndex = function (val) {
        this._index += Math.max(val, 0);
        return this;
      };
      /**
       * Decrease panel's index by the given value
       * @ko 패널의 인덱스를 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreaseIndex = function (val) {
        this._index -= Math.max(val, 0);
        return this;
      };
      /**
       * Increase panel's position by the given value
       * @ko 패널의 위치를 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increasePosition = function (val) {
        this._moveBy(Math.max(val, 0));

        return this;
      };
      /**
       * Decrease panel's position by the given value
       * @ko 패널의위치를 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreasePosition = function (val) {
        this._moveBy(-Math.max(val, 0));

        return this;
      };
      /**
       * @internal
       * @return {boolean} toggled
       */


      __proto.toggle = function (prevPos, newPos) {
        var toggleDirection = this._toggleDirection;
        var togglePosition = this._togglePosition;
        if (toggleDirection === DIRECTION.NONE || newPos === prevPos) return false;
        var prevToggled = this._toggled;

        if (newPos > prevPos) {
          if (togglePosition >= prevPos && togglePosition <= newPos) {
            this._toggled = toggleDirection === DIRECTION.NEXT;
          }
        } else {
          if (togglePosition <= prevPos && togglePosition >= newPos) {
            this._toggled = toggleDirection !== DIRECTION.NEXT;
          }
        }

        return prevToggled !== this._toggled;
      };
      /**
       * @internal
       */


      __proto.updateCircularToggleDirection = function () {
        var flicking = this._flicking;

        if (!flicking.circularEnabled) {
          this._toggleDirection = DIRECTION.NONE;
          this._toggled = false;
          return this;
        }

        var camera = flicking.camera;
        var camRange = camera.range;
        var camAlignPosition = camera.alignPosition;
        var camVisibleRange = camera.visibleRange;
        var camVisibleSize = camVisibleRange.max - camVisibleRange.min;
        var minimumVisible = camRange.min - camAlignPosition;
        var maximumVisible = camRange.max - camAlignPosition + camVisibleSize;
        var shouldBeVisibleAtMin = this.includeRange(maximumVisible - camVisibleSize, maximumVisible, false);
        var shouldBeVisibleAtMax = this.includeRange(minimumVisible, minimumVisible + camVisibleSize, false);
        this._toggled = false;

        if (shouldBeVisibleAtMin) {
          this._toggleDirection = DIRECTION.PREV;
          this._togglePosition = this.range.max + camRange.min - camRange.max + camAlignPosition;
          this.toggle(Infinity, camera.position);
        } else if (shouldBeVisibleAtMax) {
          this._toggleDirection = DIRECTION.NEXT;
          this._togglePosition = this.range.min + camRange.max - camVisibleSize + camAlignPosition;
          this.toggle(-Infinity, camera.position);
        } else {
          this._toggleDirection = DIRECTION.NONE;
          this._togglePosition = 0;
        }

        return this;
      };

      __proto._moveBy = function (val) {
        this._pos += val;
        return this;
      };

      __proto._updateAlignPos = function () {
        this._alignPos = parseAlign(this._align, this._size);
      };

      __proto._resetInternalStates = function () {
        this._size = 0;
        this._pos = 0;
        this._margin = {
          prev: 0,
          next: 0
        };
        this._height = 0;
        this._alignPos = 0;
        this._toggled = false;
        this._togglePosition = 0;
        this._toggleDirection = DIRECTION.NONE;
      };

      return Panel;
    }();

    /**
     * An slide data component that holds information of a single HTMLElement
     * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
     */

    var ElementPanel =
    /*#__PURE__*/
    function (_super) {
      __extends(ElementPanel, _super);
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
       * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
       * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
       */


      function ElementPanel(options) {
        var _this = _super.call(this, options) || this;

        _this._el = options.el;
        _this._rendered = true;
        return _this;
      }

      var __proto = ElementPanel.prototype;
      Object.defineProperty(__proto, "element", {
        /**
         * `HTMLElement` that panel's referencing
         * @ko 패널이 참조하고 있는 `HTMLElement`
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rendered", {
        get: function () {
          return this._rendered;
        },
        enumerable: false,
        configurable: true
      });

      __proto.markForShow = function () {
        this._rendered = true;
      };

      __proto.markForHide = function () {
        this._rendered = false;
      };

      return ElementPanel;
    }(Panel);

    /**
     *
     */

    var VanillaRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(VanillaRenderer, _super);

      function VanillaRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      } // eslint-disable-next-line @typescript-eslint/require-await


      var __proto = VanillaRenderer.prototype;

      __proto.render = function () {
        return __awaiter(this, void 0, void 0, function () {
          var strategy, flicking, cameraEl, wasRenderedPanels, renderingPanels;
          return __generator(this, function (_a) {
            strategy = this._renderingStrategy;
            flicking = getFlickingAttached(this._flicking, "Renderer");
            cameraEl = flicking.camera.element;
            wasRenderedPanels = this._panels.filter(function (panel) {
              return panel.element.parentElement === cameraEl;
            });
            strategy.updateRenderingPanels(flicking);
            renderingPanels = this._getRenderingPanelsByOrder();

            this._removePanelElements(wasRenderedPanels.filter(function (panel) {
              return !panel.rendered;
            }));

            this._insertPanelElements(renderingPanels.filter(function (panel) {
              return panel.element.parentElement !== cameraEl;
            }), null);

            this._resetPanelElementOrder(renderingPanels);

            return [2
            /*return*/
            ];
          });
        });
      }; // eslint-disable-next-line @typescript-eslint/require-await


      __proto.forceRenderAllPanels = function () {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, cameraElement, fragment;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Renderer");
            camera = flicking.camera;
            cameraElement = camera.element;
            fragment = document.createDocumentFragment();

            this._panels.forEach(function (panel) {
              return fragment.appendChild(panel.element);
            });

            this._removeAllChildsFromCamera();

            cameraElement.appendChild(fragment);
            return [2
            /*return*/
            ];
          });
        });
      };

      __proto._collectPanels = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element; // Remove all text nodes in the camera element

        toArray(cameraElement.childNodes).forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            cameraElement.removeChild(node);
          }
        });

        var align = this._getPanelAlign();

        var cameraChilds = toArray(cameraElement.children);
        this._panels = cameraChilds.map(function (el, index) {
          return new ElementPanel({
            flicking: flicking,
            el: el,
            index: index,
            align: align
          });
        });
      };

      __proto._createPanel = function (el, options) {
        return new ElementPanel(__assign({
          el: el
        }, options));
      };

      __proto._insertPanelElements = function (panels, nextSibling) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var nextSiblingElement = (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.element) || null;
        var fragment = document.createDocumentFragment();
        panels.forEach(function (panel) {
          return fragment.appendChild(panel.element);
        });
        cameraElement.insertBefore(fragment, nextSiblingElement);
        return this;
      };

      __proto._removePanelElements = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;
        panels.forEach(function (panel) {
          cameraElement.removeChild(panel.element);
        });
        return this;
      };

      __proto._resetPanelElementOrder = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraEl = flicking.camera.element; // We're using reversed panels here as last panel should be the last element of camera element

        var reversedPanels = __spreadArray([], __read(panels)).reverse();

        reversedPanels.forEach(function (panel, idx) {
          var nextPanel = reversedPanels[idx - 1];
          var nextPanelEl = nextPanel ? nextPanel.element : null;

          if (panel.element.nextElementSibling !== nextPanelEl) {
            cameraEl.insertBefore(panel.element, nextPanelEl);
          }
        });
      };

      __proto._removeAllChildsFromCamera = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element; // Remove other elements

        while (cameraElement.firstChild) {
          cameraElement.removeChild(cameraElement.firstChild);
        }
      };

      __proto._getRenderingPanelsByOrder = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var panels = flicking.renderer.panels;
        return panels.filter(function (panel) {
          return panel.rendered;
        }).sort(function (a, b) {
          return a.position + a.offset - (b.position + b.offset);
        });
      };

      return VanillaRenderer;
    }(Renderer$1);

    /**
     *
     */

    var ExternalRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(ExternalRenderer, _super);

      function ExternalRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      } // eslint-disable-next-line @typescript-eslint/no-unused-vars


      var __proto = ExternalRenderer.prototype;

      __proto._insertPanelElements = function (panels, nextSibling) {// DO NOTHING
      }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


      __proto._removePanelElements = function (panels) {// DO NOTHING
      };

      return ExternalRenderer;
    }(Renderer$1);

    var VisibleRenderingStrategy =
    /*#__PURE__*/
    function () {
      function VisibleRenderingStrategy() {}

      var __proto = VisibleRenderingStrategy.prototype;

      __proto.updateRenderingPanels = function (flicking) {
        var panels = flicking.renderer.panels;
        var camera = flicking.camera;
        var visibleIndexes = camera.visiblePanels.reduce(function (visibles, panel) {
          visibles[panel.index] = true;
          return visibles;
        }, {});
        panels.forEach(function (panel) {
          if (panel.index in visibleIndexes) {
            panel.markForShow();
          } else if (!flicking.holding) {
            // During the input sequence,
            // Do not remove panel elements as it won't trigger touchend event.
            panel.markForHide();
          }
        });
        camera.updateOffset();
      };

      return VisibleRenderingStrategy;
    }();

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Renderer = {
        __proto__: null,
        Renderer: Renderer$1,
        VanillaRenderer: VanillaRenderer,
        ExternalRenderer: ExternalRenderer,
        RawRenderingStrategy: RawRenderingStrategy,
        VisibleRenderingStrategy: VisibleRenderingStrategy
    };

    /**
     * @extends Component
     * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
     * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends(Flicking, _super);
      /**
       * @param root A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
       * <ko>Flicking을 초기화할 HTMLElement로, `string` 타입으로 지정시 css 선택자 문자열을 지정해야 합니다.</ko>
       * @param {object} [options={}] An options object for Flicking.<ko>Flicking에 적용할 옵션 오브젝트</ko>
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
       * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
       * <ko>
       *
       * |code|조건|
       * |---|---|
       * |{@link ERROR_CODE WRONG_TYPE}|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
       * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|
       *
       * </ko>
       * @example
       * ```ts
       * import Flicking from "@egjs/flicking";
       *
       * // Creating new instance of Flicking with HTMLElement
       * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
       *
       * // Creating new instance of Flicking with CSS selector
       * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
       * ```
       */


      function Flicking(root, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.defaultIndex,
            defaultIndex = _d === void 0 ? 0 : _d,
            _e = _b.horizontal,
            horizontal = _e === void 0 ? true : _e,
            _f = _b.circular,
            circular = _f === void 0 ? false : _f,
            _g = _b.bound,
            bound = _g === void 0 ? false : _g,
            _h = _b.adaptive,
            adaptive = _h === void 0 ? false : _h,
            _j = _b.needPanelThreshold,
            needPanelThreshold = _j === void 0 ? 0 : _j,
            _k = _b.deceleration,
            deceleration = _k === void 0 ? 0.0075 : _k,
            _l = _b.duration,
            duration = _l === void 0 ? 500 : _l,
            _m = _b.easing,
            easing = _m === void 0 ? function (x) {
          return 1 - Math.pow(1 - x, 3);
        } : _m,
            _o = _b.inputType,
            inputType = _o === void 0 ? ["mouse", "touch"] : _o,
            _p = _b.moveType,
            moveType = _p === void 0 ? "snap" : _p,
            _q = _b.threshold,
            threshold = _q === void 0 ? 40 : _q,
            _r = _b.interruptable,
            interruptable = _r === void 0 ? true : _r,
            _s = _b.bounce,
            bounce = _s === void 0 ? "20%" : _s,
            _t = _b.iOSEdgeSwipeThreshold,
            iOSEdgeSwipeThreshold = _t === void 0 ? 30 : _t,
            _u = _b.preventClickOnDrag,
            preventClickOnDrag = _u === void 0 ? true : _u,
            _v = _b.disableOnInit,
            disableOnInit = _v === void 0 ? false : _v,
            _w = _b.renderOnlyVisible,
            renderOnlyVisible = _w === void 0 ? false : _w,
            _x = _b.autoInit,
            autoInit = _x === void 0 ? true : _x,
            _y = _b.autoResize,
            autoResize = _y === void 0 ? true : _y,
            _z = _b.renderExternal,
            renderExternal = _z === void 0 ? null : _z;

        var _this = _super.call(this) || this;

        _this._preventClickWhenDragged = function (e) {
          if (_this._control.animating) {
            e.preventDefault();
          }
        }; // Internal states


        _this._initialized = false;
        _this._plugins = []; // Bind options

        _this._align = align;
        _this._defaultIndex = defaultIndex;
        _this._horizontal = horizontal;
        _this._circular = circular;
        _this._bound = bound;
        _this._adaptive = adaptive;
        _this._needPanelThreshold = needPanelThreshold;
        _this._deceleration = deceleration;
        _this._duration = duration;
        _this._easing = easing;
        _this._inputType = inputType;
        _this._moveType = moveType;
        _this._threshold = threshold;
        _this._interruptable = interruptable;
        _this._bounce = bounce;
        _this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
        _this._preventClickOnDrag = preventClickOnDrag;
        _this._disableOnInit = disableOnInit;
        _this._renderOnlyVisible = renderOnlyVisible;
        _this._autoResize = autoResize;
        _this._autoInit = autoInit;
        _this._renderExternal = renderExternal; // Create core components

        _this._viewport = new Viewport(getElement(root));
        _this._renderer = _this._createRenderer();
        _this._camera = _this._createCamera();
        _this._control = _this._createControl();
        _this.resize = _this.resize.bind(_this);

        if (_this._autoInit) {
          void _this.init();
        }

        return _this;
      }

      var __proto = Flicking.prototype;
      Object.defineProperty(__proto, "control", {
        // Components

        /**
         * {@link Control} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Control} 인스턴스
         * @type {Control}
         * @default SnapControl
         * @readonly
         * @see Control
         * @see SnapControl
         * @see FreeControl
         */
        get: function () {
          return this._control;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "camera", {
        /**
         * {@link Camera} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Camera} 인스턴스
         * @type {Camera}
         * @default LinearCamera
         * @readonly
         * @see Camera
         * @see LinearCamera
         * @see BoundCamera
         * @see CircularCamera
         */
        get: function () {
          return this._camera;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderer", {
        /**
         * {@link Renderer} instance of the Flicking
         * @ko 현재 Flicking에 활성화된 {@link Renderer} 인스턴스
         * @type {Renderer}
         * @default VanillaRenderer
         * @readonly
         * @see Renderer
         * @see VanillaRenderer
         * @see ExternalRenderer
         */
        get: function () {
          return this._renderer;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "viewport", {
        /**
         * A component that manages viewport size
         * @ko 뷰포트 크기 정보를 담당하는 컴포넌트
         * @type {Viewport}
         * @readonly
         * @see Viewport
         */
        get: function () {
          return this._viewport;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "initialized", {
        // Internal States

        /**
         * Whether Flicking's {@link Flicking#init init()} is called.
         * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
         * @ko Flicking의 {@link Flicking#init init()}이 호출되었는지를 나타내는 멤버 변수.
         * 이 값은 {@link Flicking#init init()}이 호출되었으면 `true`로 변하고, {@link Flicking#destroy destroy()}호출 이후에 다시 `false`로 변경됩니다.
         * @type {boolean}
         * @default false
         * @readonly
         */
        get: function () {
          return this._initialized;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "circularEnabled", {
        /**
         * Whether the `circular` option is enabled.
         * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
         * @ko {@link Flicking#circular circular} 옵션이 활성화되었는지 여부를 나타내는 멤버 변수.
         * {@link Flicking#circular circular} 옵션은 패널의 크기의 합이 충분하지 않을 경우 비활성화됩니다.
         * @type {boolean}
         * @default false
         * @readonly
         */
        get: function () {
          return this._camera.controlParams.circular;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "index", {
        /**
         * Index number of the {@link Flicking#currentPanel currentPanel}
         * @ko {@link Flicking#currentPanel currentPanel}의 인덱스 번호
         * @type {number}
         * @default 0
         * @readonly
         */
        get: function () {
          return this._control.activeIndex;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "element", {
        /**
         * The root(`.flicking-viewport`) element
         * @ko root(`.flicking-viewport`) 엘리먼트
         * @type {HTMLElement}
         * @readonly
         */
        get: function () {
          return this._viewport.element;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "currentPanel", {
        /**
         * Currently active panel
         * @ko 현재 선택된 패널
         * @type {Panel}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._control.activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panels", {
        /**
         * Array of panels
         * @ko 전체 패널들의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._renderer.panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        /**
         * Count of panels
         * @ko 전체 패널의 개수
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._renderer.panelCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        /**
         * Array of panels that is visible at the current position
         * @ko 현재 보이는 패널의 배열
         * @type {Panel[]}
         * @readonly
         * @see Panel
         */
        get: function () {
          return this._camera.visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        /**
         * Whether Flicking's animating
         * @ko 현재 애니메이션 동작 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._control.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        /**
         * Whether user is clicking or touching
         * @ko 현재 사용자가 클릭/터치중인지 여부
         * @type {boolean}
         * @readonly
         */
        get: function () {
          return this._control.holding;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activePlugins", {
        /**
         * A current list of activated plugins
         * @ko 현재 활성화된 플러그인 목록
         * @type {Plugin[]}
         * @readonly
         */
        get: function () {
          return this._plugins;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter
        // UI / LAYOUT

        /**
         * Align position of the panels within viewport. You can set different values each for the panel and camera
         * @ko 뷰포트 내에서 패널 정렬방식을 설정하는 옵션. 카메라와 패널 개별로 옵션을 설정할 수도 있습니다
         * @type {ALIGN | string | number | { panel: string | number, camera: string | number }}
         * @property {ALIGN | string | number} panel The align value for each {@link Panel}s<ko>개개의 {@link Panel}에 적용할 값</ko>
         * @property {ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}에 적용할 값</ko>
         * @default "center"
         * @example
         * ```ts
         * const possibleOptions = [
         *   // Literal strings
         *   "prev", "center", "next",
         *   // % values, applied to both panel & camera
         *   "0%", "25%", "42%",
         *   // px values, arithmetic calculation with (+/-) is also allowed.
         *   "0px", "100px", "50% - 25px",
         *   // numbers, same to number + px ("0px", "100px")
         *   0, 100, 1000,
         *   // Setting a different value for panel & camera
         *   { panel: "10%", camera: "25%" }
         * ];
         *
         * possibleOptions.forEach(align => {
         *   new Flicking("#el", { align });
         * });
         * ```
         */
        get: function () {
          return this._align;
        },
        // Options Setter
        // UI / LAYOUT
        set: function (val) {
          this._align = val;
          this._renderer.align = val;
          this._camera.align = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "defaultIndex", {
        /**
         * Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer
         * @ko Flicking의 {@link Flicking#init init()}이 호출될 때 이동할 디폴트 패널의 인덱스로, 0부터 시작하는 정수입니다
         * @type {number}
         * @default 0
         */
        get: function () {
          return this._defaultIndex;
        },
        set: function (val) {
          this._defaultIndex = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "horizontal", {
        /**
         * Direction of panel movement (true: horizontal, false: vertical)
         * @ko 패널 이동 방향 (true: 가로방향, false: 세로방향)
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._horizontal;
        },
        set: function (val) {
          this._horizontal = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "circular", {
        /**
         * Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.
         * @ko 순환 모드를 활성화합니다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능합니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._circular;
        },
        set: function (val) {
          this._circular = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bound", {
        /**
         * Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
         * Only can be enabled when `circular=false`
         * @ko 뷰(카메라 엘리먼트)가 첫번째와 마지막 패널 밖으로 넘어가지 못하게 하여, 첫번째/마지막 패널 전/후의 빈 공간을 보이지 않도록 하는 옵션입니다
         * `circular=false`인 경우에만 사용할 수 있습니다
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._bound;
        },
        set: function (val) {
          this._bound = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "adaptive", {
        /**
         * Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`
         * @ko 이동한 후 뷰포트 엘리먼트의 크기를 현재 패널의 높이와 동일하게 설정합니다. `horizontal=true`인 경우에만 사용할 수 있습니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._adaptive;
        },
        set: function (val) {
          this._adaptive = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "needPanelThreshold", {
        // EVENTS

        /**
         * A Threshold from viewport edge before triggering `needPanel` event
         * @ko `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리
         * @type {number}
         * @default 0
         */
        get: function () {
          return this._needPanelThreshold;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "deceleration", {
        // ANIMATION

        /**
         * Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time
         * @ko 사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아집니다
         * @type {number}
         * @default 0.0075
         */
        get: function () {
          return this._deceleration;
        },
        // ANIMATION
        set: function (val) {
          this._deceleration = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "easing", {
        /**
         * An easing function applied to the panel movement animation. Default value is `easeOutCubic`
         * @ko 패널 이동 애니메이션에 적용할 easing 함수. 기본값은 `easeOutCubic`이다
         * @type {function}
         * @default x => 1 - Math.pow(1 - x, 3)
         * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
         */
        get: function () {
          return this._easing;
        },
        set: function (val) {
          this._easing = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "duration", {
        /**
         * Default duration of the animation (ms)
         * @ko 디폴트 애니메이션 재생 시간 (ms)
         * @type {number}
         * @default 500
         */
        get: function () {
          return this._duration;
        },
        set: function (val) {
          this._duration = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "inputType", {
        // INPUT

        /**
         * Types of input devices to enable
         * @ko 활성화할 입력 장치 종류
         * @type {string[]}
         * @default ["touch", "mouse"]
         * @see {@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Possible values (PanInputOption#inputType)}
         * <ko>{@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 가능한 값들 (PanInputOption#inputType)}</ko>
         */
        get: function () {
          return this._inputType;
        },
        // INPUT
        set: function (val) {
          this._inputType = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "moveType", {
        /**
         * Movement style by user input. This will change instance type of {@link Flicking#control}
         * You can use the values of the constant {@link MOVE_TYPE}
         * @ko 사용자 입력에 의한 이동 방식. 이 값에 따라 {@link Flicking#control}의 인스턴스 타입이 결정됩니다
         * 상수 {@link MOVE_TYPE}에 정의된 값들을 이용할 수 있습니다
         * @type {MOVE_TYPE | Pair<string, object>}
         * @default "snap"
         * @example
         * |moveType|control|options|
         * |:---:|:---:|:---:|
         * |"snap"|{@link SnapControl}||
         * |"freeScroll"|{@link FreeControl}|{@link FreeControlOptions}|
         *
         * ```ts
         * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
         *
         * const flicking = new Flicking({
         *   moveType: MOVE_TYPE.SNAP
         * });
         * ```
         *
         * ```ts
         * const flicking = new Flicking({
         *   // If you want more specific settings for the moveType
         *   // [moveType, options for that moveType]
         *   // In this case, it's ["freeScroll", FreeControlOptions]
         *   moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: true }]
         * });
         * ```
         */
        get: function () {
          return this._moveType;
        },
        set: function (val) {
          this._moveType = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "threshold", {
        /**
         * Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.
         * @ko 패널 변경을 위한 이동 임계값 (단위: px). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.
         * @type {number}
         * @default 40
         */
        get: function () {
          return this._threshold;
        },
        set: function (val) {
          this._threshold = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "interruptable", {
        /**
         * Set animation to be interruptable by click/touch.
         * @ko 사용자의 클릭/터치로 인해 애니메이션을 도중에 멈출 수 있도록 설정합니다.
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._interruptable;
        },
        set: function (val) {
          this._interruptable = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "bounce", {
        /**
         * The size value of the bounce area. Only can be enabled when `circular=false`.
         * You can set different bounce value for prev/next direction by using array.
         * `number` for px value, and `string` for px, and % value relative to viewport size.
         * You have to call {@link Control#updateInput} after changing this to take effect.
         * @ko Flicking이 최대 영역을 넘어서 갈 수 있는 최대 크기. `circular=false`인 경우에만 사용할 수 있습니다.
         * 배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정할 수 있습니다.
         * `number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있습니다.
         * 이 값을 변경시 {@link Control#updateInput}를 호출해야 합니다.
         * @type {string | number | Array<string | number>}
         * @default "20%"
         * @example
         * ```ts
         * const possibleOptions = [
         *   // % values, relative to viewport element(".flicking-viewport")'s size
         *   "0%", "25%", "42%",
         *   // px values, arithmetic calculation with (+/-) is also allowed.
         *   "0px", "100px", "50% - 25px",
         *   // numbers, same to number + px ("0px", "100px")
         *   0, 100, 1000
         * ];
         * ```
         *
         * @example
         * ```ts
         * const flicking = new Flicking("#el", { bounce: "20%" });
         *
         * flicking.bounce = "100%";
         * flicking.control.updateInput(); // Call this to update!
         * ```
         */
        get: function () {
          return this._bounce;
        },
        set: function (val) {
          this._bounce = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "iOSEdgeSwipeThreshold", {
        /**
         * Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward
         * @ko iOS Safari에서 swipe를 통한 뒤로가기/앞으로가기를 활성화하는 오른쪽 끝으로부터의 영역의 크기 (px)
         * @type {number}
         * @default 30
         */
        get: function () {
          return this._iOSEdgeSwipeThreshold;
        },
        set: function (val) {
          this._iOSEdgeSwipeThreshold = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "preventClickOnDrag", {
        /**
         * Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element
         * @ko 사용자가 뷰포트 영역을 1픽셀이라도 드래그했을 경우 자동으로 {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} 이벤트를 취소합니다
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._preventClickOnDrag;
        },
        set: function (val) {
          this._preventClickOnDrag = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "disableOnInit", {
        /**
         * Automatically call {@link Flicking#disableInput disableInput()} on initialization
         * @ko Flicking init시에 {@link Flicking#disableInput disableInput()}을 바로 호출합니다
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._disableOnInit;
        },
        set: function (val) {
          this._disableOnInit = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderOnlyVisible", {
        // PERFORMANCE

        /**
         * Whether to render visible panels only. This can dramatically increase performance when there're many panels.
         * @ko 보이는 패널만 렌더링할지 여부를 설정합니다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있습니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._renderOnlyVisible;
        },
        // PERFORMANCE
        set: function (val) {
          this._renderOnlyVisible = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoInit", {
        // OTHERS

        /**
         * Call {@link Flicking#init init()} automatically when creating Flicking's instance
         * @ko Flicking 인스턴스를 생성할 때 자동으로 {@link Flicking#init init()}를 호출합니다
         * @type {boolean}
         * @default true
         * @readonly
         */
        get: function () {
          return this._autoInit;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoResize", {
        /**
         * Attach Flicking's {@link Flicking#resize resize} method to window's resize event.
         * Flicking will automatically call {@link Flicking#resize resize} window size and orientation change.
         * @ko Flicking의 {@link Flicking#resize resize} 메소드를 window의 resize 이벤트 핸들러로 등록합니다.
         * 설정시 window 창 크기 및 orientation 변경에 의해 자동으로 {@link Flicking#resize resize}를 호출합니다.
         * @type {boolean}
         * @default true
         */
        get: function () {
          return this._autoResize;
        },
        // OTHERS
        set: function (val) {
          this._autoResize = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderExternal", {
        /**
         * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
         * @ko 프레임워크(React, Vue, Angular, ...)에서만 사용하는 옵션으로, 자동으로 설정되므로 따로 사용하실 필요 없습니다!
         * @type {boolean}
         * @default false
         * @internal
         * @readonly
         */
        get: function () {
          return this._renderExternal;
        },
        enumerable: false,
        configurable: true
      });
      /**
       * Initialize Flicking and move to the default index
       * This is automatically called on Flicking's constructor when `autoInit` is true(default)
       * @ko Flicking을 초기화하고, 디폴트 인덱스로 이동합니다
       * 이 메소드는 `autoInit` 옵션이 true(default)일 경우 Flicking이 생성될 때 자동으로 호출됩니다
       * @fires Flicking#ready
       * @return {this}
       */

      __proto.init = function () {
        return __awaiter(this, void 0, void 0, function () {
          var camera, renderer, control, viewport;

          var _this = this;

          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (this._initialized) return [2
                /*return*/
                ];
                camera = this._camera;
                renderer = this._renderer;
                control = this._control;
                viewport = this._viewport;
                camera.init(this);
                renderer.init(this);
                control.init(this);
                return [4
                /*yield*/
                , this.resize()];

              case 1:
                _a.sent(); // Look at initial panel


                this._moveToInitialPanel();

                if (this._autoResize) {
                  window.addEventListener("resize", this.resize);
                }

                if (this._preventClickOnDrag) {
                  viewport.element.addEventListener("click", this._preventClickWhenDragged);
                }

                if (this._disableOnInit) {
                  this.disableInput();
                }

                this._plugins.forEach(function (plugin) {
                  return plugin.init(_this);
                }); // Done initializing & emit ready event


                this._initialized = true;
                this.trigger(new Component.ComponentEvent(EVENTS.READY));
                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * Destroy Flicking and remove all event handlers
       * @ko Flicking과 하위 컴포넌트들을 초기 상태로 되돌리고, 부착된 모든 이벤트 핸들러를 제거합니다
       * @return {void}
       */


      __proto.destroy = function () {
        if (!this._initialized) return;
        this.off();
        window.removeEventListener("resize", this.resize);

        this._viewport.element.removeEventListener("click", this._preventClickWhenDragged);

        this._control.destroy();

        this._camera.destroy();

        this._renderer.destroy();

        this._plugins.forEach(function (plugin) {
          return plugin.destroy();
        });

        this._initialized = false;
      };
      /**
       * Move to the previous panel (current index - 1)
       * @ko 이전 패널로 이동합니다 (현재 인덱스 - 1)
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms)<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|이전 패널이 존재하지 않을 경우|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the previous panel<ko>이전 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.prev = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.prev()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : -1, duration, DIRECTION.PREV);
      };
      /**
       * Move to the next panel (current index + 1)
       * @ko 다음 패널로 이동합니다 (현재 인덱스 + 1)
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms).<ko>패널 이동 애니메이션 진행 시간 (단위: ms)</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|다음 패널이 존재하지 않을 경우|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the next panel<ko>다음 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.next = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.next()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : this._renderer.panelCount, duration, DIRECTION.NEXT);
      };
      /**
       * Move to the panel with given index
       * @ko 주어진 인덱스에 해당하는 패널로 이동합니다
       * @param {number} index The index of the panel to move<ko>이동할 패널의 인덱스</ko>
       * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the animation (unit: ms)<ko>애니메이션 진행 시간 (단위: ms)</ko>
       * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
       * @async
       * @fires Flicking#moveStart
       * @fires Flicking#move
       * @fires Flicking#moveEnd
       * @fires Flicking#willChange
       * @fires Flicking#changed
       * @fires Flicking#willRestore
       * @fires Flicking#restored
       * @fires Flicking#needPanel
       * @fires Flicking#visibleChange
       * @fires Flicking#reachEdge
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|해당 인덱스를 가진 패널이 존재하지 않을 경우|
       * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>해당 패널 도달시에 resolve되는 Promise</ko>
       */


      __proto.moveTo = function (index, duration, direction) {
        if (duration === void 0) {
          duration = this._duration;
        }

        if (direction === void 0) {
          direction = DIRECTION.NONE;
        }

        var renderer = this._renderer;
        var panelCount = renderer.panelCount;
        var panel = renderer.getPanel(index);

        if (!panel) {
          return Promise.reject(new FlickingError(MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), CODE.INDEX_OUT_OF_RANGE));
        }

        if (this._control.animating) {
          return Promise.reject(new FlickingError(MESSAGE.ANIMATION_ALREADY_PLAYING, CODE.ANIMATION_ALREADY_PLAYING));
        }

        return this._control.moveToPanel(panel, {
          duration: duration,
          direction: direction
        });
      };
      /**
       * Return the {@link Panel} at the given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 {@link Panel}을 반환합니다. 주어진 인덱스에 해당하는 패널이 존재하지 않을 경우 `null`을 반환합니다.
       * @return {Panel | null} Panel at the given index<ko>주어진 인덱스에 해당하는 패널</ko>
       * @see Panel
       * @example
       * ```ts
       * const panel = flicking.getPanel(0);
       * // Which is a shorthand to...
       * const samePanel = flicking.panels[0];
       * ```
       */


      __proto.getPanel = function (index) {
        return this._renderer.getPanel(index);
      };
      /**
       * Enable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 활성화합니다
       * @return {this}
       */


      __proto.enableInput = function () {
        this._control.enable();

        return this;
      };
      /**
       * Disable input from the user (mouse/touch)
       * @ko 사용자의 입력(마우스/터치)를 막습니다
       * @return {this}
       */


      __proto.disableInput = function () {
        this._control.disable();

        return this;
      };
      /**
       * Get current flicking status. You can restore current state by giving returned value to {@link Flicking#setStatus setStatus()}
       * @ko 현재 상태를 반환합니다. 반환받은 값을 {@link Flicking#setStatus setStatus()} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있습니다
       * @param {object} options Status retrieving options<ko>Status 반환 옵션</ko>
       * @param {boolean} [options.index=true] Include current panel index to the returning status. Camera will automatically move to the given index when the {@link Flicking#setStatus setStatus} is called<ko>현재 패널 인덱스를 반환값에 포함시킵니다. {@link Flicking#setStatus setStatus} 호출시 자동으로 해당 인덱스로 카메라를 움직입니다</ko>
       * @param {boolean} [options.position=true] Include camera position to the returning status. This works only when the {@link Flicking#moveType moveType} is `freeScroll`<ko>카메라의 현재 위치를 반환값에 포함시킵니다. 이 옵션은 {@link Flicking#moveType moveType}이 `freeScroll`일 경우에만 동작합니다</ko>
       * @param {boolean} [options.includePanelHTML=false] Include panel's `outerHTML` to the returning status<ko>패널의 `outerHTML`을 반환값에 포함시킵니다</ko>
       * @param {boolean} [options.visiblePanelsOnly=false] Include only {@link Flicking#visiblePanel visiblePanel}'s HTML. This option is available only when the `includePanelHTML` is true
       * <ko>현재 보이는 패널({@link Flicking#visiblePanel visiblePanel})의 HTML만 반환합니다. `includePanelHTML`이 `true`일 경우에만 동작합니다.</ko>
       * @return {Partial<Status>} An object with current status value information<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function (_a) {
        var _b, _c;

        var _d = _a === void 0 ? {} : _a,
            _e = _d.index,
            index = _e === void 0 ? true : _e,
            _f = _d.position,
            position = _f === void 0 ? true : _f,
            _g = _d.includePanelHTML,
            includePanelHTML = _g === void 0 ? false : _g,
            _h = _d.visiblePanelsOnly,
            visiblePanelsOnly = _h === void 0 ? false : _h;

        var camera = this._camera;
        var panels = visiblePanelsOnly ? this.visiblePanels : this.panels;
        var status = {
          panels: panels.map(function (panel) {
            var panelInfo = {
              index: panel.index
            };

            if (includePanelHTML) {
              panelInfo.html = panel.element.outerHTML;
            }

            return panelInfo;
          })
        };

        if (index) {
          status.index = this.index;
        }

        if (position) {
          var nearestAnchor = camera.findNearestAnchor(camera.position);

          if (nearestAnchor) {
            status.position = {
              panel: nearestAnchor.panel.index,
              progressInPanel: camera.getProgressInPanel(nearestAnchor.panel)
            };
          }
        }

        if (visiblePanelsOnly) {
          var visiblePanels = this.visiblePanels;
          status.visibleOffset = (_c = (_b = visiblePanels[0]) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : 0;
        }

        return status;
      };
      /**
       * Restore to the state of the given {@link Status}
       * @ko 주어진 {@link Status}의 상태로 복원합니다
       * @param {Partial<Status>} status Status value to be restored. You should use the return value of the {@link Flicking#getStatus getStatus()} method<ko>복원할 상태 값. {@link Flicking#getStatus getStatus()} 메서드의 반환값을 지정하면 됩니다</ko>
       * @return {void}
       */


      __proto.setStatus = function (status) {
        var _a;

        if (!this._initialized) {
          throw new FlickingError(MESSAGE.NOT_INITIALIZED, CODE.NOT_INITIALIZED);
        }

        var index = status.index,
            position = status.position,
            visibleOffset = status.visibleOffset,
            panels = status.panels;
        var renderer = this._renderer;
        var control = this._control; // Can't add/remove panels on external rendering

        if (((_a = panels[0]) === null || _a === void 0 ? void 0 : _a.html) && !this._renderExternal) {
          renderer.batchRemove({
            index: 0,
            deleteCount: this.panels.length
          });
          renderer.batchInsert({
            index: 0,
            elements: parseElement(panels.map(function (panel) {
              return panel.html;
            }))
          });
        }

        if (index) {
          var panelIndex = visibleOffset ? index - visibleOffset : index;
          void this.moveTo(panelIndex, 0).catch(function () {
            return void 0;
          });
        }

        if (position && this._moveType === MOVE_TYPE.FREE_SCROLL) {
          var panel = position.panel,
              progressInPanel = position.progressInPanel;
          var panelIndex = visibleOffset ? panel - visibleOffset : panel;
          var panelRange = renderer.panels[panelIndex].range;
          var newCameraPos = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
          void control.moveToPosition(newCameraPos, 0).catch(function () {
            return void 0;
          });
        }
      };
      /**
       * Add plugins that can have different effects on Flicking
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가합니다
       * @param {...Plugin} plugins The plugin(s) to add<ko>추가할 플러그인(들)</ko>
       * @return {this}
       * @see https://github.com/naver/egjs-flicking-plugins
       */


      __proto.addPlugins = function () {
        var _a;

        var _this = this;

        var plugins = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          plugins[_i] = arguments[_i];
        }

        if (this._initialized) {
          plugins.forEach(function (item) {
            return item.init(_this);
          });
        }

        (_a = this._plugins).push.apply(_a, __spreadArray([], __read(plugins)));

        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거합니다.
       * @param {...Plugin} plugin The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {this}
       * @see https://github.com/naver/egjs-flicking-plugins
       */


      __proto.removePlugins = function () {
        var _this = this;

        var plugins = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          plugins[_i] = arguments[_i];
        }

        plugins.forEach(function (item) {
          var foundIndex = findIndex(_this._plugins, function (val) {
            return val === item;
          });

          if (foundIndex >= 0) {
            item.destroy();

            _this._plugins.splice(foundIndex, 1);
          }
        });
        return this;
      };
      /**
       * Update viewport/panel sizes
       * @ko 패널 및 뷰포트의 크기를 갱신합니다
       * @method
       * @fires Flicking#beforeResize
       * @fires Flicking#afterResize
       * @return {this}
       */


      __proto.resize = function () {
        return __awaiter(this, void 0, void 0, function () {
          var viewport, renderer, camera, control, activePanel, prevWidth, prevHeight, prevProgressInPanel, newWidth, newHeight, sizeChanged;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                viewport = this._viewport;
                renderer = this._renderer;
                camera = this._camera;
                control = this._control;
                activePanel = control.activePanel;
                prevWidth = viewport.width;
                prevHeight = viewport.height;
                prevProgressInPanel = activePanel ? camera.getProgressInPanel(activePanel) : 0;
                this.trigger(new Component.ComponentEvent(EVENTS.BEFORE_RESIZE, {
                  width: prevWidth,
                  height: prevHeight,
                  element: viewport.element
                }));
                viewport.resize();
                return [4
                /*yield*/
                , renderer.forceRenderAllPanels()];

              case 1:
                _a.sent(); // Render all panel elements, to update sizes


                renderer.updatePanelSize();
                return [4
                /*yield*/
                , renderer.render()];

              case 2:
                _a.sent();

                camera.updateAlignPos();
                camera.updateRange();
                camera.updateAnchors();
                if (!control.animating) return [3
                /*break*/
                , 3];
                return [3
                /*break*/
                , 5];

              case 3:
                return [4
                /*yield*/
                , control.updatePosition(prevProgressInPanel)];

              case 4:
                _a.sent();

                control.updateInput();
                _a.label = 5;

              case 5:
                newWidth = viewport.width;
                newHeight = viewport.height;
                sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;
                this.trigger(new Component.ComponentEvent(EVENTS.AFTER_RESIZE, {
                  width: viewport.width,
                  height: viewport.height,
                  prev: {
                    width: prevWidth,
                    height: prevHeight
                  },
                  sizeChanged: sizeChanged,
                  element: viewport.element
                }));
                return [2
                /*return*/
                ];
            }
          });
        });
      };
      /**
       * Add new panels after the last panel
       * @ko 패널 목록의 제일 끝에 새로운 패널들을 추가합니다
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of appended panels<ko>추가된 패널들의 배열</ko>
       * @see Panel
       * @see ElementLike
       * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new Flicking("#flick");
       * // These are possible parameters
       * flicking.append(document.createElement("div"));
       * flicking.append("\<div\>Panel\</div\>");
       * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.append = function (element) {
        return this.insert(this._renderer.panelCount, element);
      };
      /**
       * Add new panels before the first panel
       * This will increase index of panels after by the number of panels added
       * @ko 패널 목록의 제일 앞(index 0)에 새로운 패널들을 추가합니다
       * 추가한 패널의 개수만큼 기존 패널들의 인덱스가 증가합니다.
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       * @see Panel
       * @see ElementLike
       * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new eg.Flicking("#flick");
       * flicking.prepend(document.createElement("div"));
       * flicking.prepend("\<div\>Panel\</div\>");
       * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.prepend = function (element) {
        return this.insert(0, element);
      };
      /**
       * Insert new panels at given index
       * This will increase index of panels after by the number of panels added
       * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
       * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
       * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
       * @example
       * ```ts
       * const flicking = new eg.Flicking("#flick");
       * flicking.insert(0, document.createElement("div"));
       * flicking.insert(2, "\<div\>Panel\</div\>");
       * flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
       * // Even this is possible
       * flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
       * ```
       */


      __proto.insert = function (index, element) {
        if (this._renderExternal) {
          throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
        }

        return this._renderer.batchInsert({
          index: index,
          elements: parseElement(element)
        });
      };
      /**
       * Remove the panel at the given index
       * This will decrease index of panels after by the number of panels removed
       * @ko 주어진 인덱스의 패널을 제거합니다
       * 해당 인덱스보다 큰 인덱스를 가진 기존 패널들은 제거한 패널의 개수만큼 인덱스가 감소합니다
       * @param {number} index Index of panel to remove<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` 이후로 제거할 패널의 개수</ko>
       * @return {Panel[]} An array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        if (this._renderExternal) {
          throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
        }

        return this._renderer.batchRemove({
          index: index,
          deleteCount: deleteCount
        });
      };

      __proto._createControl = function () {
        var _a;

        var moveType = this._moveType;
        var moveTypes = Object.keys(MOVE_TYPE).map(function (key) {
          return MOVE_TYPE[key];
        });
        var moveTypeStr = Array.isArray(moveType) ? moveType[0] : moveType;
        var moveTypeOptions = Array.isArray(moveType) ? (_a = moveType[1]) !== null && _a !== void 0 ? _a : {} : {};

        if (!includes(moveTypes, moveTypeStr)) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), CODE.WRONG_OPTION);
        }

        switch (moveTypeStr) {
          case MOVE_TYPE.SNAP:
            return new SnapControl();

          case MOVE_TYPE.FREE_SCROLL:
            return new FreeControl(moveTypeOptions);
        }
      };

      __proto._createCamera = function () {
        var cameraOption = {
          align: this._align
        };

        if (this._circular) {
          if (this._bound) {
            // eslint-disable-next-line no-console
            console.warn("\"circular\" and \"bound\" option cannot be used together, ignoring bound.");
          }

          return new CircularCamera(cameraOption);
        } else if (this._bound) {
          return new BoundCamera(cameraOption);
        } else {
          return new LinearCamera(cameraOption);
        }
      };

      __proto._createRenderer = function () {
        var renderingStrategy = this._renderOnlyVisible ? new VisibleRenderingStrategy() : new RawRenderingStrategy();
        var rendererOptions = {
          align: this._align,
          strategy: renderingStrategy
        };
        var renderExternal = this._renderExternal;
        return renderExternal ? new renderExternal.renderer(__assign(__assign({}, rendererOptions), renderExternal.rendererOptions)) : new VanillaRenderer(rendererOptions);
      };

      __proto._moveToInitialPanel = function () {
        var renderer = this._renderer;
        var control = this._control;
        var initialPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);
        if (!initialPanel) return;
        void control.moveToPanel(initialPanel, {
          duration: 0
        });
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @type {string}
       * @readonly
       * @example
       * ```ts
       * Flicking.VERSION;  // ex) 4.0.0
       * ```
       */


      Flicking.VERSION = "4.1.0";
      return Flicking;
    }(Component);

    /**
     * An slide data component that holds information of a single HTMLElement
     * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
     */

    var ExternalPanel =
    /*#__PURE__*/
    function (_super) {
      __extends(ExternalPanel, _super);
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
       * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
       * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
       */


      function ExternalPanel(options) {
        var _this = _super.call(this, options) || this;

        _this._externalComponent = options.externalComponent;
        return _this;
      }

      return ExternalPanel;
    }(Panel);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Core = {
        __proto__: null,
        Viewport: Viewport,
        FlickingError: FlickingError,
        AnchorPoint: AnchorPoint,
        Panel: Panel,
        ElementPanel: ElementPanel,
        ExternalPanel: ExternalPanel
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    merge(Flicking, Core);
    merge(Flicking, Camera);
    merge(Flicking, Control);
    merge(Flicking, Renderer);
    merge(Flicking, Constants);

    return Flicking;

})));
//# sourceMappingURL=flicking.js.map
