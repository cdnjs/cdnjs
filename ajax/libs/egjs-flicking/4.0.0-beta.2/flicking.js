/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 4.0.0-beta.1
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
     * @memberof Constants
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
      NOT_ALLOWED_IN_FRAMEWORK: 11
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
      TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform",
      STOP_CALLED_BY_USER: "Event stop() is called by user",
      ANIMATION_INTERRUPTED: "Animation is interrupted by user input",
      ANIMATION_ALREADY_PLAYING: "Animation is already playing",
      NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular"
    };

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    /**
     * Event type object with event name strings of {@link Flicking}
     * @ko {@link Flicking}의 이벤트 이름 문자열들을 담은 객체
     * @type {object}
     * @memberof Constants
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
      REACH_EDGE: "reachEdge"
    };
    /**
     * An object with all possible predefined literal string for the {@link Flicking#align align} option
     * @ko {@link Flicking#align align} 옵션에 사용되는 미리 정의된 리터럴 상수들을 담고 있는 객체
     * @memberof Constants
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
     * @memberof Constants
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
     * @memberof Constants
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
    }; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    var isArray = function (arr) {
      return Boolean(arr) && arr.constructor === Array;
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

      if (isArray(bounce)) {
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
    var parseCSSSizeValue = function (val) {
      return isString(val) ? val : val + "px";
    };
    var getDirection = function (start, end) {
      if (start === end) return DIRECTION.NONE;
      return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
    };
    var parseElement = function (element) {
      if (!isArray(element)) {
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
    var find = function (array, checker) {
      var e_2, _a;

      try {
        for (var array_2 = __values(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
          var val = array_2_1.value;

          if (checker(val)) {
            return val;
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
        } finally {
          if (e_2) throw e_2.error;
        }
      }

      return null;
    };
    var findRight = function (array, checker) {
      for (var idx = array.length - 1; idx >= 0; idx--) {
        var val = array[idx];

        if (checker(val)) {
          return val;
        }
      }

      return null;
    };
    var findIndex = function (array, checker) {
      for (var idx = 0; idx < array.length; idx++) {
        if (checker(array[idx])) {
          return idx;
        }
      }

      return -1;
    }; // export const getProgress = (pos: number, range: number[]) => {
    //   // start, anchor, end
    //   // -1 , 0 , 1
    //   const [min, center, max] = range;
    //   if (pos > center && (max - center)) {
    //     // 0 ~ 1
    //     return (pos - center) / (max - center);
    //   } else if (pos < center && (center - min)) {
    //     // -1 ~ 0
    //     return (pos - center) / (center - min);
    //   } else if (pos !== center && max - min) {
    //     return (pos - min) / (max - min);
    //   }
    //   return 0;
    // };

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
         * Viewport width
         * @ko 뷰포트 너비
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._width;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        /**
         * Viewport height
         * @ko 뷰포트 높이
         * @type {number}
         * @readonly
         */
        get: function () {
          return this._height;
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

        if (width != null) {
          el.style.width = parseCSSSizeValue(width);
        }

        if (height != null) {
          el.style.height = parseCSSSizeValue(height);
        }

        this.resize();
      };
      /**
       * Update width/height to the current viewport element's size
       * @ko 현재 뷰포트 엘리먼트의 크기로 너비/높이를 업데이트합니다
       */


      __proto.resize = function () {
        var el = this._el;
        this._width = el.offsetWidth;
        this._height = el.offsetHeight;
      };

      return Viewport;
    }();

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
        camera.lookAt(axesEvent.pos[POSITION_KEY]);
        var moveEvent = new Component.ComponentEvent(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(0, axesEvent.delta[POSITION_KEY]),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          camera.lookAt(prevPosition);
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
        camera.lookAt(axesEvent.pos.flick);
        var moveEvent = new Component.ComponentEvent(EVENTS.MOVE, {
          isTrusted: axesEvent.isTrusted,
          holding: this.holding,
          direction: getDirection(0, axesEvent.delta.flick),
          axesEvent: axesEvent
        });
        flicking.trigger(moveEvent);

        if (moveEvent.isCanceled()) {
          // Return to previous position
          flicking.camera.lookAt(prevPosition);
          transitTo(STATE_TYPE.DISABLED);
        }
      };

      __proto.onFinish = function (ctx) {
        var flicking = ctx.flicking,
            axesEvent = ctx.axesEvent,
            transitTo = ctx.transitTo; // if (viewport.options.bound) {
        //   viewport.setCurrentPanel(this.targetPanel as Panel);
        // } else {
        //   viewport.setCurrentPanel(viewport.getNearestPanel() as Panel);
        // }

        var camera = flicking.camera;
        var anchorBelow = camera.findAnchorIncludePosition(camera.position);

        if (flicking.horizontal && flicking.adaptive && anchorBelow) {
          flicking.viewport.setSize({
            height: anchorBelow.panel.height
          });
        }

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

        return this;
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
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
       * @param {number} [axesEvent] If provided, it'll use its {@link setTo} method instead
       * @throws {FlickingError}
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
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
          flicking.camera.lookAt(position);
          return Promise.resolve();
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

            if (!axesEvent) {
              axes.once(EVENT.HOLD, interruptionHandler);
            }

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

        this._setActivePanel = function (newActivePanel, prevActivePanel, isTrusted) {
          var _a;

          var flicking = getFlickingAttached(_this._flicking, "Control");
          _this._activePanel = newActivePanel;

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
         * Currently active panel
         * @ko 현재 선택된 패널
         * @type {Panel}
         * @readonly
         * @see Panel
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
       * Reset {@link Control#activePanel activePanel} to `null`
       * @ko {@link Control#activePanel activePanel}을 `null`로 초기화합니다
       * @chainable
       * @return {this}
       */


      __proto.resetActivePanel = function () {
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
       * @param {Constants.DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
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
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
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

            if (!camera.canReach(panel)) {
              nearestAnchor = camera.findNearestAnchor(position);

              if (panel.removed || !nearestAnchor) {
                return [2
                /*return*/
                , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE))];
              } // Override position & panel if that panel is not reachable


              position = nearestAnchor.position;
              panel = nearestAnchor.panel;
            } else if (camera.controlParams.circular) {
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
          var currentPanel, animate, isTrusted;

          var _this = this;

          return __generator(this, function (_b) {
            currentPanel = this._activePanel;

            animate = function () {
              return _this._controller.animateTo(position, duration, axesEvent);
            };

            isTrusted = (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false;

            if (duration === 0) {
              this._setActivePanel(newActivePanel, currentPanel, isTrusted);

              return [2
              /*return*/
              , animate()];
            } else {
              return [2
              /*return*/
              , animate().then(function () {
                return _this._setActivePanel(newActivePanel, currentPanel, isTrusted);
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
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
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
              targetPos = activePanel.position;
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

      function FreeControl() {
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
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE POSITION_NOT_REACHABLE}|주어진 패널이 제거되었거나, Camera의 {@link Camera#range range} 밖에 있을 경우|
       * |{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}이 이전에 호출되지 않은 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
       *
       * </ko>
       * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>해당 좌표 도달시에 resolve되는 Promise</ko>
       */


      var __proto = FreeControl.prototype;

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

            targetPanel = anchorAtPosition.panel;

            this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

            return [2
            /*return*/
            , this._animateToPosition({
              position: position,
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
         */
        get: function () {
          return this._offset;
        },
        set: function (val) {
          this._offset = val;
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
      Object.defineProperty(__proto, "align", {
        // Options Getter

        /**
         * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
         * @ko {@link Camera#alignPosition alignPosition}이 뷰포트 엘리먼트 내의 어디에 위치해야 하는지를 나타내는 값
         * @type {Constants.ALIGN | string | number}
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
       * {@link Constants.ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
       * <ko>{@link Constants.ERROR_CODE VAL_MUST_NOT_NULL} 뷰포트 엘리먼트 내부에 카메라 엘리먼트(`.flicking-camera`)가 존재하지 않을 경우</ko>
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @return {this}
       */


      __proto.lookAt = function (pos) {
        var prevPos = this._position;
        this._position = pos;

        this._refreshVisiblePanels();

        this._checkNeedPanel();

        this._checkReachEnd(prevPos, pos);

        this._applyTransform();

        return this;
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
       * Return {@link AnchorPoint} that includes given position
       * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
       * @ko 주어진 좌표를 포함하는 {@link AnchorPoint}를 반환합니다
       * 주어진 좌표를 포함하는 {@link AnchorPoint}가 없을 경우 `null`을 반환합니다
       * @param {number} position A position to check<ko>확인할 좌표</ko>
       * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>해당 좌표를 포함하는 {@link AnchorPoint}</ko>
       */


      __proto.findAnchorIncludePosition = function (position) {
        var e_2, _a;

        var anchors = this._anchors;

        try {
          for (var anchors_1 = __values(anchors), anchors_1_1 = anchors_1.next(); !anchors_1_1.done; anchors_1_1 = anchors_1.next()) {
            var anchor = anchors_1_1.value;

            if (anchor.panel.includePosition(position, true)) {
              return anchor;
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (anchors_1_1 && !anchors_1_1.done && (_a = anchors_1.return)) _a.call(anchors_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }

        return null;
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
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
       * Update position after resizing
       * @ko resize 이후에 position을 업데이트합니다
       * @throws {FlickingError}
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
       * @chainable
       * @return {this}
       */


      __proto.updatePosition = function () {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var activePanel = flicking.control.activePanel;

        if (activePanel) {
          this.lookAt(activePanel.position);
        }

        return this;
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
        var _this = this;

        var flicking = getFlickingAttached(this._flicking, "Camera");
        var panels = flicking.renderer.panels;
        var newVisiblePanels = panels.filter(function (panel) {
          return _this.canSee(panel);
        });
        var prevVisiblePanels = this._visiblePanels;
        this._visiblePanels = newVisiblePanels;
        var added = newVisiblePanels.filter(function (panel) {
          return !includes(prevVisiblePanels, panel);
        });
        var removed = prevVisiblePanels.filter(function (panel) {
          return !includes(newVisiblePanels, panel);
        });

        if (added.length > 0 || removed.length > 0) {
          flicking.renderer.render();
          flicking.trigger(new Component.ComponentEvent(EVENTS.VISIBLE_CHANGE, {
            added: added,
            removed: removed,
            visiblePanels: newVisiblePanels
          }));
        }
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
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
        _this._panelTooglePoints = {};
        return _this;
      }

      var __proto = CircularCamera.prototype;
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
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

        var position = this._position;
        var firstPanel = panels[0];
        var lastPanel = panels[panels.length - 1];
        var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
        var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
        var visibleSize = this.size;
        var panelSizeSum = lastPanelNext - firstPanelPrev;
        var canSetCircularMode = panels.every(function (panel) {
          return panelSizeSum - panel.size >= visibleSize;
        });

        if (canSetCircularMode) {
          this._range = {
            min: firstPanelPrev,
            max: lastPanelNext
          };
          var panelTooglePoints_1 = {};
          var alignPos_1 = this._alignPos;
          var shouldBeToggledPrev_1 = [];
          var togglePointPrev_1 = [];
          var shouldBeToggledNext_1 = [];
          var togglePointNext_1 = [];
          var range_1 = this._range;
          var minimumVisible_1 = range_1.min - alignPos_1;
          var maximumVisible_1 = range_1.max - alignPos_1 + visibleSize;
          panels.forEach(function (panel) {
            var shouldBeVisibleAtMin = panel.includeRange(maximumVisible_1 - visibleSize, maximumVisible_1, false);
            var shouldBeVisibleAtMax = panel.includeRange(minimumVisible_1, minimumVisible_1 + visibleSize, false);

            if (shouldBeVisibleAtMin) {
              var togglePos = panel.range.max + range_1.min - range_1.max + alignPos_1;
              var shouldToggle = togglePos > position;
              var togglePoint = {
                panel: panel,
                direction: DIRECTION.PREV,
                toggled: shouldToggle
              };
              panelTooglePoints_1[togglePos] = togglePoint;

              if (shouldToggle) {
                shouldBeToggledPrev_1.push(panel);
                togglePointPrev_1.push(togglePoint);
              }
            }

            if (shouldBeVisibleAtMax) {
              var togglePos = panel.range.min + range_1.max - visibleSize + alignPos_1;
              var shouldToggle = togglePos < position;
              var togglePoint = {
                panel: panel,
                direction: DIRECTION.NEXT,
                toggled: false
              };
              panelTooglePoints_1[togglePos] = togglePoint;

              if (shouldToggle) {
                shouldBeToggledNext_1.push(panel);
                togglePointNext_1.push(togglePoint);
              }
            }
          });
          renderer.elementManipulator.movePanelElementsToStart(shouldBeToggledPrev_1, togglePointPrev_1);
          renderer.elementManipulator.movePanelElementsToEnd(shouldBeToggledNext_1, togglePointNext_1);
          this._circularOffset = this._calcPanelAreaSum(shouldBeToggledPrev_1) - this._calcPanelAreaSum(shouldBeToggledNext_1);
          this._panelTooglePoints = panelTooglePoints_1;
        } else {
          this._range = {
            min: firstPanel.position,
            max: lastPanel.position
          };
          this._circularOffset = 0;
          this._panelTooglePoints = {};
        }

        this._circularEnabled = canSetCircularMode;
        return this;
      };

      __proto.lookAt = function (pos) {
        var flicking = getFlickingAttached(this._flicking, "Camera");
        var prevPos = this._position;
        var panelTooglePoints = this._panelTooglePoints;
        var elementManipulator = flicking.renderer.elementManipulator;
        var togglePoints = Object.keys(panelTooglePoints).map(function (pointString) {
          return parseFloat(pointString);
        }).sort(function (a, b) {
          return a - b;
        });
        if (pos === prevPos) return _super.prototype.lookAt.call(this, pos);

        if (pos > prevPos) {
          var togglePointInfos_1 = [];
          var passedPanels = togglePoints.reduce(function (passed, togglePoint) {
            var togglePointInfo = panelTooglePoints[togglePoint];
            var passedPoint = togglePoint >= prevPos && togglePoint <= pos;
            var shouldToggle = togglePointInfo.direction === DIRECTION.NEXT && !togglePointInfo.toggled || togglePointInfo.direction === DIRECTION.PREV && togglePointInfo.toggled;

            if (passedPoint && shouldToggle) {
              togglePointInfo.toggled = !togglePointInfo.toggled;
              passed.push(togglePointInfo.panel);
              togglePointInfos_1.push(togglePointInfo);
            }

            return passed;
          }, []);
          elementManipulator.movePanelElementsToEnd(passedPanels, togglePointInfos_1);
          this._circularOffset -= this._calcPanelAreaSum(passedPanels);
        } else {
          var togglePointInfos_2 = [];
          var passedPanels = togglePoints.reduce(function (passed, togglePoint) {
            var togglePointInfo = panelTooglePoints[togglePoint];
            var passedPoint = togglePoint <= prevPos && togglePoint >= pos;
            var shouldToggle = togglePointInfo.direction === DIRECTION.NEXT && togglePointInfo.toggled || togglePointInfo.direction === DIRECTION.PREV && !togglePointInfo.toggled;

            if (passedPoint && shouldToggle) {
              togglePointInfo.toggled = !togglePointInfo.toggled;
              passed.push(togglePointInfo.panel);
              togglePointInfos_2.push(togglePointInfo);
            }

            return passed;
          }, []);
          elementManipulator.movePanelElementsToStart(passedPanels, togglePointInfos_2);
          this._circularOffset += this._calcPanelAreaSum(passedPanels);
        }

        flicking.renderer.render();
        return _super.prototype.lookAt.call(this, pos);
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
        this._panelTooglePoints = {};
      };

      __proto._calcPanelAreaSum = function (panels) {
        return panels.reduce(function (sum, panel) {
          return sum + panel.sizeIncludingMargin;
        }, 0);
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
       * {@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
       * <ko>{@link Constants.ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}이 이전에 호출되지 않은 경우</ko>
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
        var shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
        var shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
        var indexOffset = shouldPrependBoundAnchor ? 1 : 0;
        var newAnchors = reachablePanels.map(function (panel, idx) {
          return new AnchorPoint({
            index: idx + indexOffset,
            position: panel.position,
            panel: panel
          });
        });

        if (shouldPrependBoundAnchor) {
          newAnchors.splice(0, 0, new AnchorPoint({
            index: 0,
            position: range.min,
            panel: find(panels, function (panel) {
              return panel.includePosition(range.min);
            })
          }));
        }

        if (shouldAppendBoundAnchor) {
          newAnchors.push(new AnchorPoint({
            index: newAnchors.length,
            position: range.max,
            panel: findRight(panels, function (panel) {
              return panel.includePosition(range.min);
            })
          }));
        }

        this._anchors = newAnchors;
        return this;
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

    /**
     * An slide data component that holds information of a single HTMLElement
     * @ko 슬라이드 데이터 컴포넌트로, 단일 HTMLElement의 정보를 갖고 있습니다
     */

    var Panel =
    /*#__PURE__*/
    function () {
      /**
       * @param {object} options An options object<ko>옵션 오브젝트</ko>
       * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>패널이 참조하는 `HTMLElement`</ko>
       * @param {number} [options.index] An initial index of the panel<ko>패널의 초기 인덱스</ko>
       * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>패널의 초기 {@link Flicking#align align}값</ko>
       * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>패널이 참조하는 {@link Flicking} 인스턴스</ko>
       */
      function Panel(_a) {
        var el = _a.el,
            index = _a.index,
            align = _a.align,
            flicking = _a.flicking;
        this._el = el;
        this._index = index;
        this._flicking = flicking;
        this._align = align;
        this._removed = false;

        this._resetInternalStates();
      }

      var __proto = Panel.prototype;
      Object.defineProperty(__proto, "element", {
        // Internal States Getter

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
      Object.defineProperty(__proto, "offset", {
        /**
         * Panel's position offset which is changed after panel element's order changes if {@link Flicking#circular circular} is enabled
         * @ko 현재 패널의 위치 오프셋 값. {@link Flicking#circular circular} 모드에서 패널의 엘리먼트의 순서가 변경될 때 이 값이 변경됩니다
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
        var el = this._el; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

        var elStyle = window.getComputedStyle(el) || el.currentStyle;
        var flicking = this._flicking;
        var horizontal = flicking.horizontal;
        var prevPanel = flicking.renderer.panels[this._index - 1];
        this._size = horizontal ? el.offsetWidth : el.offsetHeight;
        this._margin = horizontal ? {
          prev: parseFloat(elStyle.marginLeft),
          next: parseFloat(elStyle.marginRight)
        } : {
          prev: parseFloat(elStyle.marginTop),
          next: parseFloat(elStyle.marginBottom)
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
        return this._el.contains(element);
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
       * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
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
       * @param {boolean} [includeMargin=false] Include {@link margin} to the range<ko>패널 영역에 {@link margin}값을 포함시킵니다</ko>
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
       * Increase panel's offset by the given value
       * @ko 패널의 오프셋을 주어진 값만큼 증가시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.increaseOffset = function (val) {
        this._offset += Math.max(val, 0);
        return this;
      };
      /**
       * Decrease panel's offset by the given value
       * @ko 패널의 오프셋을 주어진 값만큼 감소시킵니다
       * @internal
       * @chainable
       * @param val An integer greater than or equal to 0<ko>0보다 같거나 큰 정수</ko>
       * @returns {this}
       */


      __proto.decreaseOffset = function (val) {
        this._offset -= Math.max(val, 0);
        return this;
      };
      /**
       * Reset panel's offset to 0
       * @ko 패널의 오프셋을 0으로 초기화합니다
       * @internal
       * @chainable
       * @returns {this}
       */


      __proto.resetOffset = function () {
        this._offset = 0;
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
        this._offset = 0;
      };

      return Panel;
    }();

    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * Event that fires when order of the elements is changed
     * @ko 엘리먼트 순서 변경시 트리거되는 이벤트
     * @event OffsetManipulator#orderChanged
     * @type {void}
     */

    /**
     * A component that manages panel offset from the element's order change
     * @ko 엘리먼트 순서 변경에 의한 패널 오프셋 변경을 담당하는 컴포넌트
     * @internal
     * @fires OffsetManipulator#orderChanged
     */

    var OffsetManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends(OffsetManipulator, _super);
      /** */


      function OffsetManipulator() {
        var _this = _super.call(this) || this;

        _this._flicking = null;
        return _this;
      }
      /**
       * Initialize OffsetManipulator
       * @ko OffsetManipulator를 초기화합니다
       * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking의 인스턴스</ko>
       * @chainable
       * @return {this}
       */


      var __proto = OffsetManipulator.prototype;

      __proto.init = function (flicking) {
        this._flicking = flicking;
      };
      /**
       * Destroy Renderer and return to initial state
       * @ko Renderer를 초기 상태로 되돌립니다
       * @return {void}
       */


      __proto.destroy = function () {
        this._flicking = null;
      };
      /**
       * Insert panel elements before nextSibling
       * @ko 패널 엘리먼트들을 기준 패널(`nextSibling`) 이전에 추가합니다
       * @param {Panel[]} panels An array of panels to add<ko>추가할 패널의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.insertPanelElements = function (panels, nextSibling) {
        // DO NOTHING
        return this;
      };
      /**
       * Move panel element as the first child of the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트의 첫번째 child로 이동시킨다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.movePanelElementsToStart = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camRangeDiff = flicking.camera.rangeDiff;
        panels.forEach(function (panel, idx) {
          panel.decreaseOffset(camRangeDiff);
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Move panel element as the last child of the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트의 마지막 child로 이동시킨다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @param {TogglePoint[]} togglePoints An array of the positions that triggered element order change<ko>패널 순서를 변경시킨 좌표 정보들의 배열</ko>
       * @chainable
       * @return {this}
       */


      __proto.movePanelElementsToEnd = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camRangeDiff = flicking.camera.rangeDiff;
        panels.forEach(function (panel, idx) {
          panel.increaseOffset(camRangeDiff);
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Reset panel element order by the panel's index
       * @ko 패널 엘리먼트 순서를 인덱스 순으로 변경한다
       * @param {Panel[]} panels Panels to move<ko>위치를 변경할 패널들</ko>
       * @chainable
       * @return {this}
       */


      __proto.resetPanelElementOrder = function (panels) {
        panels.forEach(function (panel) {
          panel.resetOffset();
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };
      /**
       * Remove panel elements
       * @ko 패널 엘리먼트들을 삭제한다
       * @param {Panel[]} panels Panels to remove<ko>삭제할 패널들</ko>
       * @chainable
       * @return {this}
       */


      __proto.removePanelElements = function (panels) {
        // DO NOTHING
        return this;
      };
      /**
       * Remove all child nodes inside the given element
       * @ko 주어진 엘리먼트 내의 모든 child node를 제거한다
       * @param element A HTMLElement to remove all child nodes<ko>Child node를 전부 삭제할 HTMLElement</ko>
       * @chainable
       * @return {this}
       */


      __proto.removeAllChildNodes = function (element) {
        // DO NOTHING
        return this;
      };
      /**
       * Remove all text nodes inside the given element
       * @ko 주어진 엘리먼트 내의 모든 text node를 제거한다
       * @param element A HTMLElement to remove all text nodes<ko>Text node를 전부 삭제할 HTMLElement</ko>
       * @chainable
       * @return {this}
       */


      __proto.removeAllTextNodes = function (element) {
        // DO NOTHING
        return this;
      };

      return OffsetManipulator;
    }(Component);

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
       * @param {OffsetManipulator} [options.elementManipulator] An instance of {@link OffsetManipulator} that renderer will use<ko>Renderer가 사용할 {@link OffsetManipulator}의 인스턴스</ko>
       */
      function Renderer(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.elementManipulator,
            elementManipulator = _d === void 0 ? new OffsetManipulator() : _d;

        this._align = align;
        this._flicking = null;
        this._elementManipulator = elementManipulator;
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
      Object.defineProperty(__proto, "elementManipulator", {
        /**
         * An instance of the {@link OffsetManipulator} that Renderer's using
         * @ko Renderer가 현재 사용중인 {@link OffsetManipulator}의 인스턴스
         * @type {OffsetManipulator}
         * @readonly
         */
        get: function () {
          return this._elementManipulator;
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

        this._elementManipulator.init(flicking);

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

        this._elementManipulator.destroy();
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
       * Insert new panels at given index
       * This will increase index of panels after by the number of panels added
       * @ko 주어진 인덱스에 새로운 패널들을 추가합니다
       * 해당 인덱스보다 같거나 큰 인덱스를 가진 기존 패널들은 추가한 패널의 개수만큼 인덱스가 증가합니다.
       * @param {number} index Index to insert new panels at<ko>새로 패널들을 추가할 인덱스</ko>
       * @param {Flicking.ElementLike | Flicking.ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of prepended panels<ko>추가된 패널들의 배열</ko>
       */


      __proto.insert = function (index, element) {
        var panels = this._panels;
        var elementManipulator = this._elementManipulator;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var control = flicking.control;

        var align = this._getPanelAlign();

        var elements = parseElement(element);
        var insertingIdx = getMinusCompensatedIndex(index, panels.length);
        var panelsPushed = panels.slice(insertingIdx);
        var newPanels = elements.map(function (el, elIdx) {
          return new Panel({
            el: el,
            index: insertingIdx + elIdx,
            align: align,
            flicking: flicking
          });
        });
        if (newPanels.length <= 0) return []; // Reset the order of the elements first

        elementManipulator.resetPanelElementOrder(panels);
        panels.splice.apply(panels, __spreadArray([insertingIdx, 0], __read(newPanels))); // Insert the actual elements as camera element's children

        elementManipulator.insertPanelElements(newPanels, panelsPushed[0] || null); // Resize the newly added panels

        newPanels.forEach(function (panel) {
          return panel.resize();
        });

        var insertedSize = this._getPanelSizeSum(newPanels); // Update panel indexes & positions


        panelsPushed.forEach(function (panel) {
          panel.increaseIndex(newPanels.length);
          panel.increasePosition(insertedSize);
        }); // Update camera & control

        this._updateCameraAndControl();

        this.render(); // Move to the first panel added if no panels existed
        // FIXME: fix for animating case

        if (newPanels.length > 0 && !control.animating) {
          void control.moveToPanel(control.activePanel || newPanels[0], {
            duration: 0
          }).catch(function () {
            return void 0;
          });
        }

        return newPanels;
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


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        var panels = this._panels;
        var elementManipulator = this._elementManipulator;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;
        var activePanel = control.activePanel;
        var removingIdx = getMinusCompensatedIndex(index, panels.length);
        var panelsPulled = panels.slice(removingIdx + deleteCount);
        var panelsRemoved = panels.splice(removingIdx, deleteCount);
        if (panelsRemoved.length <= 0) return []; // Reset the order of the elements first

        elementManipulator.resetPanelElementOrder(panels); // Update panel indexes & positions

        var removedSize = this._getPanelSizeSum(panelsRemoved);

        panelsPulled.forEach(function (panel) {
          panel.decreaseIndex(panelsRemoved.length);
          panel.decreasePosition(removedSize);
        }); // Remove panel elements

        elementManipulator.removePanelElements(panelsRemoved);
        panelsRemoved.forEach(function (panel) {
          return panel.destroy();
        }); // Update camera & control

        this._updateCameraAndControl();

        if (includes(panelsRemoved, activePanel)) {
          control.resetActivePanel();
        }

        this.render(); // FIXME: fix for animating case

        if (panelsRemoved.length > 0 && !control.animating) {
          var targetPanel = includes(panelsRemoved, activePanel) ? panelsPulled[0] || panels[panels.length - 1] : activePanel;

          if (targetPanel) {
            void control.moveToPanel(targetPanel, {
              duration: 0
            }).catch(function () {
              return void 0;
            });
          } else {
            // All panels removed
            camera.lookAt(0);
          }
        }

        return panelsRemoved;
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

      __proto._collectPanels = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element; // Remove all text nodes in the camera element

        this._elementManipulator.removeAllTextNodes(cameraElement);

        var align = this._getPanelAlign();

        var cameraChilds = toArray(cameraElement.children);
        this._panels = cameraChilds.map(function (el, index) {
          return new Panel({
            flicking: flicking,
            el: el,
            index: index,
            align: align
          });
        });
        return this;
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

    /**
     * A {@link Renderer} that always renders all panel elements inside the camera element
     * @ko 모든 패널 엘리먼트를 카메라 엘리먼트 내에 항상 렌더링하는 종류의 {@link Renderer}
     */

    var RawRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(RawRenderer, _super);

      function RawRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Render panel elements inside the camera element
       * @ko 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
       * @chainable
       * @return {this}
       */


      var __proto = RawRenderer.prototype;

      __proto.render = function () {
        return this;
      };

      return RawRenderer;
    }(Renderer$1);

    /**
     * A {@link Renderer} that renders only visible panel elements({@link Camera#visiblePanels visiblePanels}) inside the camera element
     * @ko 현재 카메라의 보이는 패널들({@link Camera#visiblePanels visiblePanels})만을 카메라 엘리먼트 내에 렌더링하는 종류의 {@link Renderer}
     */

    var VisibleRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(VisibleRenderer, _super);

      function VisibleRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Render visible panel elements inside the camera element
       * @ko 보이는 패널 엘리먼트들을 카메라 엘리먼트 내부에 렌더링합니다
       * @chainable
       * @return {this}
       */


      var __proto = VisibleRenderer.prototype;

      __proto.render = function () {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var panels = flicking.renderer.panels;
        var visiblePanels = camera.visiblePanels;
        var elementManipulator = this._elementManipulator;

        if (panels.length <= 0 || visiblePanels.length <= 0) {
          camera.offset = 0;
          return this;
        }

        var panelsSortedByActualPosition = __spreadArray([], __read(panels)).sort(function (a, b) {
          return a.position + a.offset - (b.position + b.offset);
        });

        var visibleSortedByActualPosition = __spreadArray([], __read(visiblePanels)).sort(function (a, b) {
          return a.position + a.offset - (b.position + b.offset);
        }); // Remove remaining(removed) elements


        elementManipulator.removeAllChildNodes(cameraElement);
        elementManipulator.insertPanelElements(visibleSortedByActualPosition, null);
        var firstVisibleIdx = findIndex(panelsSortedByActualPosition, function (panel) {
          return panel.index === visibleSortedByActualPosition[0].index;
        });
        var invisiblePrevPanels = panelsSortedByActualPosition.slice(0, firstVisibleIdx);

        var invisibleSize = this._calcPanelRangeSize(invisiblePrevPanels);

        camera.offset = invisibleSize;
        return this;
      };

      __proto._calcPanelRangeSize = function (panels) {
        return panels.reduce(function (sum, panel) {
          return sum + panel.sizeIncludingMargin;
        }, 0);
      };

      return VisibleRenderer;
    }(RawRenderer);

    /**
     * A component that manages element add/remove and element's order change
     * @ko 엘리먼트 추가/제거 및 순서 변경을 담당하는 컴포넌트
     */

    var ElementManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends(ElementManipulator, _super);

      function ElementManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ElementManipulator.prototype;

      __proto.insertPanelElements = function (panels, nextSibling) {
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

      __proto.movePanelElementsToStart = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var cameraElement = camera.element;
        var camRangeDiff = camera.rangeDiff;
        var panelEls = panels.map(function (panel) {
          return panel.element;
        });
        var refElement = includes(panelEls, cameraElement.firstElementChild) ? null : cameraElement.firstElementChild;

        this._relocatePanelElements(panels, refElement);

        panels.forEach(function (panel) {
          panel.decreaseOffset(camRangeDiff);
        });
        return this;
      };

      __proto.movePanelElementsToEnd = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera;
        var camRangeDiff = camera.rangeDiff;

        this._relocatePanelElements(panels, null);

        panels.forEach(function (panel) {
          panel.increaseOffset(camRangeDiff);
        });
        return this;
      };

      __proto.resetPanelElementOrder = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;

        this._relocatePanelElements(panels.filter(function (panel) {
          return panel.element.parentElement === cameraElement;
        }), null);

        panels.forEach(function (panel) {
          panel.resetOffset();
        });
        return this;
      };

      __proto.removePanelElements = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;
        panels.forEach(function (panel) {
          cameraElement.removeChild(panel.element);
        });
        return this;
      };

      __proto.removeAllChildNodes = function (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        return this;
      };

      __proto.removeAllTextNodes = function (element) {
        element.childNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            element.removeChild(node);
          }
        });
        return this;
      };

      __proto._relocatePanelElements = function (panels, refChild) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var cameraElement = flicking.camera.element;
        var fragment = document.createDocumentFragment();
        panels.forEach(function (panel) {
          return fragment.appendChild(panel.element);
        });
        cameraElement.insertBefore(fragment, refChild);
      };

      return ElementManipulator;
    }(OffsetManipulator);

    /**
     * A component that manages panel element's order without adding/removing it using CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order} property
     * @ko 패널 추가/제거 없이 CSS {@link https://developer.mozilla.org/ko/docs/Web/CSS/order order} 속성을 이용하여 엘리먼트 순서를 변경하는 컴포넌트
     */

    var OrderManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends(OrderManipulator, _super);

      function OrderManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = OrderManipulator.prototype;

      __proto.movePanelElementsToStart = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel, idx) {
            if (togglePoints[idx].toggled) {
              panel.element.style.order = "-1";
            } else {
              panel.element.style.order = "0";
            }
          });
        }

        return _super.prototype.movePanelElementsToStart.call(this, panels, togglePoints);
      };

      __proto.movePanelElementsToEnd = function (panels, togglePoints) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel, idx) {
            if (togglePoints[idx].toggled) {
              panel.element.style.order = "1";
            } else {
              panel.element.style.order = "0";
            }
          });
        }

        return _super.prototype.movePanelElementsToEnd.call(this, panels, togglePoints);
      };

      __proto.resetPanelElementOrder = function (panels) {
        var flicking = getFlickingAttached(this._flicking, "Renderer");

        if (flicking.circular && !flicking.renderOnlyVisible) {
          panels.forEach(function (panel) {
            panel.element.style.order = "0";
          });
        }

        return _super.prototype.resetPanelElementOrder.call(this, panels);
      };

      return OrderManipulator;
    }(OffsetManipulator);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Renderer = {
        __proto__: null,
        Renderer: Renderer$1,
        RawRenderer: RawRenderer,
        VisibleRenderer: VisibleRenderer,
        OffsetManipulator: OffsetManipulator,
        ElementManipulator: ElementManipulator,
        OrderManipulator: OrderManipulator
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
       * |{@link Constants.ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
       * |{@link Constants.ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
       * <ko>
       *
       * |code|조건|
       * |---|---|
       * |{@link Constants.ERROR_CODE WRONG_TYPE}|루트 엘리먼트가 string이나 HTMLElement가 아닐 경우|
       * |{@link Constants.ERROR_CODE ELEMENT_NOT_FOUND}|주어진 CSS selector로 엘리먼트를 찾지 못했을 경우|
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
            _v = _b.renderOnlyVisible,
            renderOnlyVisible = _v === void 0 ? false : _v,
            _w = _b.autoInit,
            autoInit = _w === void 0 ? true : _w,
            _x = _b.autoResize,
            autoResize = _x === void 0 ? true : _x,
            _y = _b.renderExternal,
            renderExternal = _y === void 0 ? false : _y,
            _z = _b.useOrderManipulator,
            useOrderManipulator = _z === void 0 ? false : _z;

        var _this = _super.call(this) || this;
        /**
         * Update viewport/panel sizes
         * @ko 패널 및 뷰포트의 크기를 갱신합니다
         * @method
         * @fires Flicking#beforeResize
         * @fires Flicking#afterResize
         * @return {this}
         */


        _this.resize = function () {
          var viewport = _this._viewport;
          var renderer = _this._renderer;
          var camera = _this._camera;
          var control = _this._control;
          var prevWidth = viewport.width;
          var prevHeight = viewport.height;

          _this.trigger(new Component.ComponentEvent(EVENTS.BEFORE_RESIZE, {
            width: prevWidth,
            height: prevHeight,
            element: viewport.element
          }));

          viewport.resize();
          renderer.updatePanelSize();
          renderer.elementManipulator.resetPanelElementOrder(renderer.panels);
          camera.updateAlignPos();
          camera.updateRange();
          camera.updateAnchors();
          control.updateInput();
          camera.updatePosition();
          var newWidth = viewport.width;
          var newHeight = viewport.height;
          var sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;

          _this.trigger(new Component.ComponentEvent(EVENTS.AFTER_RESIZE, {
            width: viewport.width,
            height: viewport.height,
            prev: {
              width: prevWidth,
              height: prevHeight
            },
            sizeChanged: sizeChanged,
            element: viewport.element
          }));

          return _this;
        };

        _this._preventClickWhenDragged = function (e) {
          if (_this._control.animating) {
            e.preventDefault();
          }
        }; // Internal states


        _this._initialized = false; // Bind options

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
        _this._renderOnlyVisible = renderOnlyVisible;
        _this._autoResize = autoResize;
        _this._autoInit = autoInit;
        _this._renderExternal = renderExternal;
        _this._useOrderManipulator = useOrderManipulator; // Create core components

        _this._viewport = new Viewport(getElement(root));
        _this._renderer = _this._createRenderer();
        _this._camera = _this._createCamera();
        _this._control = _this._createControl();

        if (_this._autoInit) {
          _this.init();
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
         * @default RawRenderer
         * @readonly
         * @see Renderer
         * @see RawRenderer
         * @see VisibleRenderer
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
      Object.defineProperty(__proto, "align", {
        // Options Getter
        // UI / LAYOUT

        /**
         * Align position of the panels within viewport. You can set different values each for the panel and camera
         * @ko 뷰포트 내에서 패널 정렬방식을 설정하는 옵션. 카메라와 패널 개별로 옵션을 설정할 수도 있습니다
         * @type {Constants.ALIGN | string | number | { panel: string | number, camera: string | number }}
         * @property {Constants.ALIGN | string | number} panel The align value for each {@link Panel}s<ko>개개의 {@link Panel}에 적용할 값</ko>
         * @property {Constants.ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}에 적용할 값</ko>
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
         * @default 500
         * @type number
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
         * @type string[]
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
         * @ko 사용자 입력에 의한 이동 방식. 이 값에 따라 {@link Flicking#control}의 인스턴스 타입이 결정됩니다
         * @type string
         * @default "snap"
         * @see {@link Constants.MOVE_TYPE}
         * @example
         * ```ts
         * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
         *
         * const flicking = new Flicking({
         *   moveType: MOVE_TYPE.FREE_SCROLL
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
      Object.defineProperty(__proto, "renderOnlyVisible", {
        // PERFORMANCE

        /**
         * Whether to render visible panels only. This can dramatically increase performance when there're many panels.
         * This will set {@link Flicking#renderer renderer}'s type to {@link VisibleRenderer}
         * @ko 보이는 패널만 렌더링할지 여부를 설정합니다. 패널이 많을 경우에 퍼포먼스를 크게 향상시킬 수 있습니다.
         * 이 옵션을 활성화할 경우 {@link Flicking#renderer renderer}의 타입을 {@link VisibleRenderer}로 설정합니다.
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
      Object.defineProperty(__proto, "useOrderManipulator", {
        /**
         * Use {@link OrderManipulator} for the element order managing in {@link Renderer}.
         * Instead of inserting/removing element to change order, this will use CSS {@link https://developer.mozilla.org/en-US/docs/Web/CSS/order order}.
         * ⚠️ Enabling this option will decrease browser coverage to IE11+
         * @ko {@link Renderer}에서 엘리먼트 순서 관리를 위해 {@link OrderManipulator}를 사용합니다.
         * 엘리먼트를 직접적으로 추가/삭제하는 대신 CSS {@link https://developer.mozilla.org/ko/docs/Web/CSS/order order} 속성을 사용해서 순서를 관리합니다.
         * ⚠️ 이 옵션을 사용시 IE10 이하의 브라우저는 지원할 수 없습니다.
         * @type {boolean}
         * @default false
         */
        get: function () {
          return this._useOrderManipulator;
        },
        set: function (val) {
          this._useOrderManipulator = val;
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
        if (this._initialized) return this;
        var camera = this._camera;
        var renderer = this._renderer;
        var control = this._control;
        var viewport = this._viewport;
        camera.init(this);
        renderer.init(this);
        control.init(this);
        this.resize(); // Look at initial panel

        this._moveToInitialPanel();

        if (this._autoResize) {
          window.addEventListener("resize", this.resize);
        }

        if (this._preventClickOnDrag) {
          viewport.element.addEventListener("click", this._preventClickWhenDragged);
        } // Done initializing & emit ready event


        this._initialized = true;
        this.trigger(new Component.ComponentEvent(EVENTS.READY));
        return this;
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
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|이전 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
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
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|다음 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
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
       * @param {Constants.DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>이동할 방향. {@link Flicking#circular circular} 옵션 활성화시에만 사용 가능합니다</ko>
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
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
       * <ko>
       *
       * |code|condition|
       * |---|---|
       * |{@link Constants.ERROR_CODE INDEX_OUT_OF_RANGE}|해당 인덱스를 가진 패널이 존재하지 않을 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_ALREADY_PLAYING}|애니메이션이 이미 진행중인 경우|
       * |{@link Constants.ERROR_CODE ANIMATION_INTERRUPTED}|사용자 입력에 의해 애니메이션이 중단된 경우|
       * |{@link Constants.ERROR_CODE STOP_CALLED_BY_USER}|발생된 이벤트들 중 하나라도 `stop()`이 호출된 경우|
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
       * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link Flicking#setStatus}
       * @ko 현재 상태를 반환합니다. 반환받은 값을 [setStatus()]{@link Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있습니다
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        // TODO:
        return {
          index: -1,
          panels: [],
          position: 0
        };
      };
      /**
       * Restore to the state of the `status`
       * @ko `status`의 상태로 복원합니다
       * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link Flicking#getStatus} method<ko>복원할 상태 값. [getStatus()]{@link Flicking#getStatus}메서드의 반환값을 지정하면 됩니다</ko>
       * @return {void}
       */


      __proto.setStatus = function (status) {
        // TODO:
        return;
      };
      /**
       * Add plugins that can have different effects on Flicking
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가합니다
       * @param - The plugin(s) to add<ko>추가할 플러그인(들)</ko>
       * @return {this}
       */


      __proto.addPlugins = function (plugins) {
        // TODO:
        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거합니다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {this}
       */


      __proto.removePlugins = function (plugins) {
        // TODO:
        return this;
      };
      /**
       * Add new panels after the last panel
       * @ko 패널 목록의 제일 끝에 새로운 패널들을 추가합니다
       * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
       * <ko>새로운 HTMLElement, 혹은 엘리먼트의 outerHTML, 혹은 그것들의 배열</ko>
       * @return {Panel[]} An array of appended panels<ko>추가된 패널들의 배열</ko>
       * @see Panel
       * @see ElementLike
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
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
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
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
       * @throws {FlickingError} {@link Constants.ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
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

        return this._renderer.insert(index, element);
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

        return this._renderer.remove(index, deleteCount);
      };

      __proto._createControl = function () {
        var moveType = this._moveType;
        var moveTypes = Object.keys(MOVE_TYPE).map(function (key) {
          return MOVE_TYPE[key];
        });

        if (!includes(moveTypes, moveType)) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), CODE.WRONG_OPTION);
        }

        switch (moveType) {
          case MOVE_TYPE.SNAP:
            return new SnapControl();

          case MOVE_TYPE.FREE_SCROLL:
            return new FreeControl();
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
        var elementManipulator = this._useOrderManipulator ? new OrderManipulator() : this._renderExternal ? new OffsetManipulator() : new ElementManipulator();
        var rendererOptions = {
          align: this._align,
          elementManipulator: elementManipulator
        };
        return this._createActualRenderer(rendererOptions);
      };

      __proto._createActualRenderer = function (rendererOptions) {
        if (this._renderOnlyVisible) {
          return new VisibleRenderer(rendererOptions);
        } else {
          return new RawRenderer(rendererOptions);
        }
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
       * Flicking.VERSION;  // ex) 4.0.0
       */


      Flicking.VERSION = "4.0.0-beta.1";
      return Flicking;
    }(Component);

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Core = {
        __proto__: null,
        Panel: Panel,
        Viewport: Viewport,
        FlickingError: FlickingError,
        AnchorPoint: AnchorPoint
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
