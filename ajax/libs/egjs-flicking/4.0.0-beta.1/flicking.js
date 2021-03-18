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

    var FlickingError =
    /*#__PURE__*/
    function (_super) {
      __extends(FlickingError, _super);

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
     * Error codes of {@link FlickingError}
     *
     * @name ERROR_CODE
     * @memberof Constants
     * @type object
     * @property {number} WRONG_TYPE 0
     * @property {number} ELEMENT_NOT_FOUND 1
     * @property {number} VAL_MUST_NOT_NULL 2
     * @property {number} NOT_ATTACHED_TO_FLICKING 3
     * @property {number} WRONG_OPTION 4
     * @property {number} INDEX_OUT_OF_RANGE 5
     * @property {number} POSITION_NOT_REACHABLE 6
     * @property {number} TRANSFORM_NOT_SUPPORTED 7
     * @property {number} STOP_CALLED_BY_USER 8
     * @property {number} ANIMATION_INTERRUPTED 9
     * @property {number} ANIMATION_ALREADY_PLAYING 10
     * @property {number} NOT_ALLOWED_IN_FRAMEWORK 11
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
     * Event type object with event name strings.
     *
     * @ko 이벤트 이름 문자열들을 담은 객체
     * @type {object}
     * @property {"holdStart"} HOLD_START - holdStart event<ko>holdStart 이벤트</ko>
     * @property {"holdEnd"} HOLD_END - holdEnd event<ko>holdEnd 이벤트</ko>
     * @property {"moveStart"} MOVE_START - moveStart event<ko>moveStart 이벤트</ko>
     * @property {"move"} MOVE - move event<ko>move 이벤트</ko>
     * @property {"moveEnd"} MOVE_END - moveEnd event<ko>moveEnd 이벤트</ko>
     * @property {"change"} CHANGE - change event<ko>change 이벤트</ko>
     * @property {"restore"} RESTORE - restore event<ko>restore 이벤트</ko>
     * @property {"select"} SELECT - select event<ko>select 이벤트</ko>
     * @property {"needPanel"} NEED_PANEL - needPanel event<ko>needPanel 이벤트</ko>
     * @example
     * import { EVENTS } from "@egjs/flicking";
     * EVENTS.MOVE_START; // "MOVE_START"
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
      CHANGE: "change",
      RESTORE: "restore",
      SELECT: "select",
      NEED_PANEL: "needPanel",
      VISIBLE_CHANGE: "visibleChange",
      REACH_EDGE: "reachEdge"
    };
    var ALIGN = {
      PREV: "prev",
      CENTER: "center",
      NEXT: "next"
    };
    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT",
      NONE: null
    };
    var MOVE_TYPE = {
      SNAP: "snap",
      FREE_SCROLL: "freeScroll"
    };

    var Constants = {
        __proto__: null,
        EVENTS: EVENTS,
        ALIGN: ALIGN,
        DIRECTION: DIRECTION,
        MOVE_TYPE: MOVE_TYPE
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

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(el) {
        this._el = el;
        this._width = 0;
        this._height = 0;
      }

      var __proto = Viewport.prototype;
      Object.defineProperty(__proto, "element", {
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "width", {
        get: function () {
          return this._width;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        get: function () {
          return this._height;
        },
        enumerable: false,
        configurable: true
      });

      __proto.destroy = function () {
        return this;
      };
      /**
       * Change viewport's size. This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property.
       *
       * @param {object} [size] New viewport size
       * @param {number|string} [size.width] CSS string or number(in px)
       * @param {number|string} [size.height] CSS string or number(in px)
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

    var State =
    /*#__PURE__*/
    function () {
      function State() {}

      var __proto = State.prototype;

      __proto.onHold = function (ctx) {// DO NOTHING
      };

      __proto.onChange = function (ctx) {// DO NOTHING
      };

      __proto.onRelease = function (ctx) {// DO NOTHING
      };

      __proto.onAnimationEnd = function (ctx) {// DO NOTHING
      };

      __proto.onFinish = function (ctx) {// DO NOTHING
      };

      return State;
    }();

    var IdleState =
    /*#__PURE__*/
    function (_super) {
      __extends(IdleState, _super);

      function IdleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.holding = false;
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

    var HoldingState =
    /*#__PURE__*/
    function (_super) {
      __extends(HoldingState, _super);

      function HoldingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.holding = true;
        _this.animating = true;
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

    var EVENT = {
      HOLD: "hold",
      CHANGE: "change",
      RELEASE: "release",
      ANIMATION_END: "animationEnd",
      FINISH: "finish"
    };
    var POSITION_KEY = "flick";

    var DraggingState =
    /*#__PURE__*/
    function (_super) {
      __extends(DraggingState, _super);

      function DraggingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.holding = true;
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

    var AnimatingState =
    /*#__PURE__*/
    function (_super) {
      __extends(AnimatingState, _super);

      function AnimatingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.holding = false;
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

    var DisabledState =
    /*#__PURE__*/
    function (_super) {
      __extends(DisabledState, _super);

      function DisabledState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.holding = false;
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

    var AxesController =
    /*#__PURE__*/
    function () {
      function AxesController() {
        this._resetInternalValues();

        this._stateMachine = new StateMachine();
      }

      var __proto = AxesController.prototype;
      Object.defineProperty(__proto, "axes", {
        get: function () {
          return this._axes;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "state", {
        get: function () {
          return this._stateMachine.state;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animatingContext", {
        get: function () {
          return this._animatingContext;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "enabled", {
        get: function () {
          var _a, _b;

          return (_b = (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.isEnable()) !== null && _b !== void 0 ? _b : false;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        get: function () {
          var _a, _b;

          return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.get([POSITION_KEY])[POSITION_KEY]) !== null && _b !== void 0 ? _b : 0;
        },
        enumerable: false,
        configurable: true
      });

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
      };

      __proto.destroy = function () {
        var _a, _b;

        (_a = this._axes) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this._panInput) === null || _b === void 0 ? void 0 : _b.destroy();

        this._resetInternalValues();

        return this;
      };

      __proto.enable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.enable();
        return this;
      };

      __proto.disable = function () {
        var _a;

        (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.disable();
        return this;
      };

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

    var Control$1 =
    /*#__PURE__*/
    function () {
      function Control() {
        var _this = this;

        this._setActivePanel = function (panel) {
          _this._activePanel = panel;
        };

        this._flicking = null;
        this._controller = new AxesController();
        this._activePanel = null;
      }

      var __proto = Control.prototype;
      Object.defineProperty(__proto, "controller", {
        get: function () {
          return this._controller;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activeIndex", {
        get: function () {
          var _a, _b;

          return (_b = (_a = this._activePanel) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "activePanel", {
        get: function () {
          return this._activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        get: function () {
          return this._controller.state.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        get: function () {
          return this._controller.state.holding;
        },
        enumerable: false,
        configurable: true
      });

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._controller.init(flicking);

        return this;
      };

      __proto.destroy = function () {
        this._controller.destroy();

        this._flicking = null;
        this._activePanel = null;
        return this;
      };

      __proto.enable = function () {
        this._controller.enable();

        return this;
      };

      __proto.disable = function () {
        this._controller.disable();

        return this;
      };

      __proto.updateInput = function () {
        this._controller.update();

        return this;
      };

      __proto.resetActivePanel = function () {
        this._activePanel = null;
        return this;
      };

      __proto.moveToPanel = function (panel, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, position, nearestAnchor;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            position = panel.position;

            if (!camera.canReach(panel)) {
              nearestAnchor = camera.findNearestAnchor(position);

              if (!nearestAnchor) {
                return [2
                /*return*/
                , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE))];
              } // Override position & panel if that panel is not reachable


              position = nearestAnchor.position;
              panel = nearestAnchor.panel;
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
        var triggeringEvent = panel !== this._activePanel ? EVENTS.CHANGE : EVENTS.RESTORE;
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
          var animate;

          var _this = this;

          return __generator(this, function (_b) {
            animate = function () {
              return _this._controller.animateTo(position, duration, axesEvent);
            };

            if (duration === 0) {
              this._setActivePanel(newActivePanel);

              return [2
              /*return*/
              , animate()];
            } else {
              return [2
              /*return*/
              , animate().then(function () {
                return _this._setActivePanel(newActivePanel);
              })];
            }
          });
        });
      };

      return Control;
    }();

    var SnapControl =
    /*#__PURE__*/
    function (_super) {
      __extends(SnapControl, _super);

      function SnapControl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

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

    var FreeControl =
    /*#__PURE__*/
    function (_super) {
      __extends(FreeControl, _super);

      function FreeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = FreeControl.prototype;

      __proto.moveToPosition = function (position, duration, axesEvent) {
        return __awaiter(this, void 0, void 0, function () {
          var flicking, camera, targetPos, anchorAtPosition, activePanel, targetPanel;
          return __generator(this, function (_a) {
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            targetPos = camera.clampToReachablePosition(position);
            anchorAtPosition = camera.findAnchorIncludePosition(targetPos);
            activePanel = this._activePanel;

            if (!anchorAtPosition) {
              return [2
              /*return*/
              , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
            }

            targetPanel = anchorAtPosition.panel;

            if (targetPanel !== activePanel) {
              this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
            }

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
        FreeControl: FreeControl
    };

    var AnchorPoint =
    /*#__PURE__*/
    function () {
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
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        get: function () {
          return this._pos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panel", {
        get: function () {
          return this._panel;
        },
        enumerable: false,
        configurable: true
      });
      return AnchorPoint;
    }();

    var Camera$1 =
    /*#__PURE__*/
    function () {
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
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        get: function () {
          return this._position;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
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
        get: function () {
          return this._range;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "rangeDiff", {
        get: function () {
          return this._range.max - this._range.min;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        get: function () {
          return this._visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visibleRange", {
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
        get: function () {
          return this._anchors;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "controlParams", {
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
      Object.defineProperty(__proto, "size", {
        get: function () {
          var flicking = this._flicking;
          return flicking ? flicking.horizontal ? flicking.viewport.width : flicking.viewport.height : 0;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter
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

      __proto.init = function (flicking) {
        this._flicking = flicking;
        var viewportEl = flicking.viewport.element;
        checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
        this._el = viewportEl.firstElementChild;

        this._checkTranslateSupport();

        return this;
      };

      __proto.destroy = function () {
        this._flicking = null;

        this._resetInternalValues();

        return this;
      };

      __proto.lookAt = function (pos) {
        var prevPos = this._position;
        this._position = pos;

        this._refreshVisiblePanels();

        this._checkNeedPanel();

        this._checkReachEnd(prevPos, pos);

        this._applyTransform();

        return this;
      };

      __proto.getPrevAnchor = function (anchor) {
        return this._anchors[anchor.index - 1] || null;
      };

      __proto.getNextAnchor = function (anchor) {
        return this._anchors[anchor.index + 1] || null;
      };

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

      __proto.clampToReachablePosition = function (position) {
        var range = this._range;
        return clamp(position, range.min, range.max);
      };

      __proto.canReach = function (panel) {
        var range = this._range;
        if (panel.removed) return false;
        var panelPos = panel.position;
        return panelPos >= range.min && panelPos <= range.max;
      };

      __proto.canSee = function (panel) {
        var visibleRange = this.visibleRange; // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.

        return panel.includeRange(visibleRange.min, visibleRange.max, false);
      };

      __proto.updateAlignPos = function () {
        var align = this._align;
        var alignVal = typeof align === "object" ? align.camera : align;
        this._alignPos = parseAlign(alignVal, this.size);
        return this;
      };

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

      __proto.resetNeedPanelHistory = function () {
        this._needPanelTriggered = {
          prev: false,
          next: false
        };
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

    var LinearCamera =
    /*#__PURE__*/
    function (_super) {
      __extends(LinearCamera, _super);

      function LinearCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

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

    var BoundCamera =
    /*#__PURE__*/
    function (_super) {
      __extends(BoundCamera, _super);

      function BoundCamera() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

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
            max: lastPanelNext - alignPos
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

    var Panel =
    /*#__PURE__*/
    function () {
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
        get: function () {
          return this._el;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "index", {
        get: function () {
          return this._index;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "position", {
        get: function () {
          return this._pos + this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "size", {
        get: function () {
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "sizeIncludingMargin", {
        get: function () {
          return this._size + this._margin.prev + this._margin.next;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "height", {
        get: function () {
          return this._height;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "margin", {
        get: function () {
          return this._margin;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "alignPosition", {
        get: function () {
          return this._alignPos;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "offset", {
        get: function () {
          return this._offset;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "removed", {
        get: function () {
          return this._removed;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "range", {
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

      __proto.contains = function (element) {
        return this._el.contains(element);
      };

      __proto.destroy = function () {
        this._resetInternalStates();

        this._removed = true;
      };

      __proto.includePosition = function (pos, includeMargin) {
        if (includeMargin === void 0) {
          includeMargin = false;
        }

        return this.includeRange(pos, pos, includeMargin);
      };

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

      __proto.focus = function (duration) {
        return this._flicking.moveTo(this._index, duration);
      };

      __proto.prev = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1) : renderer.getPanel(index - 1);
      };

      __proto.next = function () {
        var index = this._index;
        var flicking = this._flicking;
        var renderer = flicking.renderer;
        var panelCount = renderer.panelCount;
        if (panelCount === 1) return null;
        return flicking.circularEnabled ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1) : renderer.getPanel(index + 1);
      };

      __proto.increaseIndex = function (val) {
        this._index += Math.max(val, 0);
        return this;
      };

      __proto.decreaseIndex = function (val) {
        this._index -= Math.max(val, 0);
        return this;
      };

      __proto.increasePosition = function (val) {
        this._moveBy(Math.max(val, 0));

        return this;
      };

      __proto.decreasePosition = function (val) {
        this._moveBy(-Math.max(val, 0));

        return this;
      };

      __proto.increaseOffset = function (val) {
        this._offset += Math.max(val, 0);
        return this;
      };

      __proto.decreaseOffset = function (val) {
        this._offset -= Math.max(val, 0);
        return this;
      };

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

    var ExternalManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends(ExternalManipulator, _super);

      function ExternalManipulator() {
        var _this = _super.call(this) || this;

        _this._flicking = null;
        return _this;
      }

      var __proto = ExternalManipulator.prototype;

      __proto.init = function (flicking) {
        this._flicking = flicking;
      };

      __proto.destroy = function () {
        this._flicking = null;
      };

      __proto.insertPanelElements = function (panels, nextSibling) {
        // DO NOTHING
        return this;
      };

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

      __proto.resetPanelElementOrder = function (panels) {
        panels.forEach(function (panel) {
          panel.resetOffset();
        });

        if (panels.length > 0) {
          this.trigger("orderChanged");
        }

        return this;
      };

      __proto.removePanelElements = function (panels) {
        // DO NOTHING
        return this;
      };

      __proto.removeAllChildNodes = function (element) {
        // DO NOTHING
        return this;
      };

      __proto.removeAllTextNodes = function (element) {
        // DO NOTHING
        return this;
      };

      return ExternalManipulator;
    }(Component);

    var Renderer$1 =
    /*#__PURE__*/
    function () {
      function Renderer(_a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.align,
            align = _c === void 0 ? ALIGN.CENTER : _c,
            _d = _b.elementManipulator,
            elementManipulator = _d === void 0 ? new ExternalManipulator() : _d;

        this._align = align;
        this._flicking = null;
        this._elementManipulator = elementManipulator;
        this._panels = [];
      }

      var __proto = Renderer.prototype;
      Object.defineProperty(__proto, "panels", {
        // Internal states Getter
        get: function () {
          return this._panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        get: function () {
          return this._panels.length;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "elementManipulator", {
        get: function () {
          return this._elementManipulator;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter
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

      __proto.init = function (flicking) {
        this._flicking = flicking;

        this._elementManipulator.init(flicking);

        this._collectPanels();

        return this;
      };

      __proto.destroy = function () {
        this._flicking = null;
        this._panels = [];

        this._elementManipulator.destroy();
      };

      __proto.getPanel = function (index) {
        return this._panels[index] || null;
      };

      __proto.insert = function (index, element) {
        var panels = this._panels;
        var elementManipulator = this._elementManipulator;
        var flicking = getFlickingAttached(this._flicking, "Renderer");
        var camera = flicking.camera,
            control = flicking.control;

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

        camera.updateRange();
        camera.updateAnchors();
        camera.resetNeedPanelHistory();
        control.updateInput();
        this.render(); // Move to the first panel added if no panels existed
        // FIXME: fix for animating case

        if (newPanels.length > 0 && !control.animating) {
          void control.moveToPanel(control.activePanel || newPanels[0], 0).catch(function () {
            return void 0;
          });
        }

        return newPanels;
      };

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

        camera.updateRange();
        camera.updateAnchors();
        camera.resetNeedPanelHistory();
        control.updateInput();

        if (includes(panelsRemoved, activePanel)) {
          control.resetActivePanel();
        }

        this.render(); // FIXME: fix for animating case

        if (panelsRemoved.length > 0 && !control.animating) {
          var targetPanel = includes(panelsRemoved, activePanel) ? panelsPulled[0] || panels[panels.length - 1] : activePanel;

          if (targetPanel) {
            void control.moveToPanel(targetPanel, 0).catch(function () {
              return void 0;
            });
          } else {
            // All panels removed
            camera.lookAt(0);
          }
        }

        return panelsRemoved;
      };

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

      return Renderer;
    }();

    var RawRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(RawRenderer, _super);

      function RawRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = RawRenderer.prototype;

      __proto.render = function () {
        return this;
      };

      return RawRenderer;
    }(Renderer$1);

    var VisibleRenderer =
    /*#__PURE__*/
    function (_super) {
      __extends(VisibleRenderer, _super);

      function VisibleRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

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

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    var Renderer = {
        __proto__: null,
        Renderer: Renderer$1,
        RawRenderer: RawRenderer,
        VisibleRenderer: VisibleRenderer
    };

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
    }(ExternalManipulator);

    var OffsetManipulator =
    /*#__PURE__*/
    function (_super) {
      __extends(OffsetManipulator, _super);

      function OffsetManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = OffsetManipulator.prototype;

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

      return OffsetManipulator;
    }(ExternalManipulator);

    /**
     * @memberof eg
     * @extends eg.Component
     * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|eg.Component}
     * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
     * @requires {@link https://github.com/naver/egjs-imready|eg.ImReady}
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends(Flicking, _super);

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
            _u = _b.isEqualSize,
            isEqualSize = _u === void 0 ? false : _u,
            _v = _b.isConstantSize,
            isConstantSize = _v === void 0 ? false : _v,
            _w = _b.renderOnlyVisible,
            renderOnlyVisible = _w === void 0 ? false : _w,
            _x = _b.autoInit,
            autoInit = _x === void 0 ? true : _x,
            _y = _b.autoResize,
            autoResize = _y === void 0 ? true : _y,
            _z = _b.renderExternal,
            renderExternal = _z === void 0 ? false : _z,
            _0 = _b.useOffsetManipulator,
            useOffsetManipulator = _0 === void 0 ? false : _0;

        var _this = _super.call(this) || this;
        /**
         * Update panels to current state.
         *
         * @ko 패널들을 현재 상태에 맞춰 갱신한다.
         * @method
         * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
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
        _this._isEqualSize = isEqualSize;
        _this._isConstantSize = isConstantSize;
        _this._renderOnlyVisible = renderOnlyVisible;
        _this._autoResize = autoResize;
        _this._autoInit = autoInit;
        _this._renderExternal = renderExternal;
        _this._useOffsetManipulator = useOffsetManipulator; // Create core components

        _this._viewport = new Viewport(getElement(root));
        _this._renderer = _this._createRenderer();
        _this._camera = _this._createCamera();
        _this._control = _this._createControl();
        _this._contentsReadyChecker = null;

        if (_this._autoInit) {
          _this.init();
        }

        return _this;
      }

      var __proto = Flicking.prototype;
      Object.defineProperty(__proto, "control", {
        // Components
        get: function () {
          return this._control;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "camera", {
        get: function () {
          return this._camera;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderer", {
        get: function () {
          return this._renderer;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "viewport", {
        get: function () {
          return this._viewport;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "initialized", {
        // Internal States
        get: function () {
          return this._initialized;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "circularEnabled", {
        get: function () {
          return this._camera.controlParams.circular;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "index", {
        get: function () {
          return this._control.activeIndex;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "element", {
        get: function () {
          return this._viewport.element;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "currentPanel", {
        get: function () {
          return this._control.activePanel;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panels", {
        get: function () {
          return this._renderer.panels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "panelCount", {
        get: function () {
          return this._renderer.panelCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "visiblePanels", {
        get: function () {
          return this._camera.visiblePanels;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "animating", {
        get: function () {
          return this._control.animating;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "holding", {
        get: function () {
          return this._control.holding;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "align", {
        // Options Getter
        // UI / LAYOUT
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
        get: function () {
          return this._needPanelThreshold;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "deceleration", {
        // ANIMATION
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
        get: function () {
          return this._iOSEdgeSwipeThreshold;
        },
        set: function (val) {
          this._iOSEdgeSwipeThreshold = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "isEqualSize", {
        // PERFORMANCE
        get: function () {
          return this._isEqualSize;
        },
        // PERFORMANCE
        set: function (val) {
          this._isEqualSize = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "isConstantSize", {
        get: function () {
          return this._isConstantSize;
        },
        set: function (val) {
          this._isConstantSize = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderOnlyVisible", {
        get: function () {
          return this._renderOnlyVisible;
        },
        set: function (val) {
          this._renderOnlyVisible = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoInit", {
        // OTHERS
        get: function () {
          return this._autoInit;
        },
        // OTHERS
        set: function (val) {
          this._autoInit = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "autoResize", {
        get: function () {
          return this._autoResize;
        },
        set: function (val) {
          this._autoResize = val;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "renderExternal", {
        get: function () {
          return this._renderExternal;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(__proto, "useOffsetManipulator", {
        get: function () {
          return this._useOffsetManipulator;
        },
        enumerable: false,
        configurable: true
      });
      /**
       *
       */

      __proto.init = function () {
        if (this._initialized) return this;
        var camera = this._camera;
        var renderer = this._renderer;
        var control = this._control;
        camera.init(this);
        renderer.init(this);
        control.init(this);
        this.resize(); // Look at initial panel

        this._moveToInitialPanel();

        if (this._autoResize) {
          window.addEventListener("resize", this.resize);
        } // Done initializing & emit ready event


        this._initialized = true;
        this.trigger(new Component.ComponentEvent(EVENTS.READY));
        return this;
      };
      /**
       * Return the reference element and all its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
       *
       * @ko 기준 요소와 그 하위 패널들을 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
       * @example
       * const flick = new eg.Flicking("#flick");
       * flick.destroy();
       * console.log(flick.moveTo); // null
       */


      __proto.destroy = function () {
        var _a;

        if (!this._initialized) return;
        this.off();
        window.removeEventListener("resize", this.resize);

        this._control.destroy();

        this._camera.destroy();

        this._renderer.destroy();

        this._viewport.destroy();

        (_a = this._contentsReadyChecker) === null || _a === void 0 ? void 0 : _a.destroy();
        this._initialized = false;
      };
      /**
       * Move to the previous panel if it exists.
       *
       * @ko 이전 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       */


      __proto.prev = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.prev()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : -1, duration);
      };
      /**
       * Move to the next panel if it exists.
       *
       * @ko 다음 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation(unit: ms).<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       */


      __proto.next = function (duration) {
        var _a, _b, _c;

        if (duration === void 0) {
          duration = this._duration;
        }

        return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.next()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : this._renderer.panelCount, duration);
      };
      /**
       * Move to the panel of given index.
       *
       * @ko 주어진 인덱스에 해당하는 패널로 이동한다.
       * @param index The index number of the panel to move.<ko>이동할 패널의 인덱스 번호.</ko>
       * @param duration [duration=options.duration] Duration of the panel movement.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       */


      __proto.moveTo = function (index, duration) {
        if (duration === void 0) {
          duration = this._duration;
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

        return this._control.moveToPanel(panel, duration);
      };
      /**
       * Return the panel of given index. `null` if it doesn't exists.
       *
       * @ko 주어진 인덱스에 해당하는 패널을 반환한다. 해당 패널이 존재하지 않을 시 `null`이다.
       * @return Panel of given index.<ko>주어진 인덱스에 해당하는 패널.</ko>
       */


      __proto.getPanel = function (index) {
        return this._renderer.getPanel(index);
      };
      /**
       * Unblock input devices.
       *
       * @ko 막았던 입력 장치로부터의 입력을 푼다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.enableInput = function () {
        var _a;

        (_a = this._control.controller) === null || _a === void 0 ? void 0 : _a.enable();
        return this;
      };
      /**
       * Block input devices.
       *
       * @ko 입력 장치로부터의 입력을 막는다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.disableInput = function () {
        var _a;

        (_a = this._control.controller) === null || _a === void 0 ? void 0 : _a.disable();
        return this;
      };
      /**
       * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link eg.Flicking#setStatus}.
       *
       * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있다.
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        return {
          index: -1,
          panels: [],
          position: 0
        };
      };
      /**
       * Restore to the state of the `status`.
       *
       * @ko `status`의 상태로 복원한다.
       * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드의 반환값을 지정하면 된다.</ko>
       */


      __proto.setStatus = function (status) {
        return;
      };
      /**
       * Add plugins that can have different effects on Flicking.
       *
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가한다.
       * @param - The plugin(s) to add.<ko>추가할 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.addPlugins = function (plugins) {
        return this;
      };
      /**
       * Remove plugins from Flicking.
       *
       * @ko 플리킹으로부터 플러그인들을 제거한다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.removePlugins = function (plugins) {
        return this;
      };
      /**
       * Add new panels at the end of panels.
       *
       * @ko 제일 끝에 새로운 패널을 추가한다.
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       * flicking.append(document.createElement("div")); // Appended at index 0
       * flicking.append("\<div\>Panel\</div\>"); // Appended at index 1
       * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]); // Appended at index 2, 3
       * // Even this is possible
       * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>"); // Appended at index 4, 5
       */


      __proto.append = function (element) {
        return this.insert(this._renderer.panelCount, element);
      };
      /**
       * Add new panels at the beginning of panels.
       *
       * @ko 제일 앞에 새로운 패널을 추가한다.
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of appended panels.<ko>추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       * flicking.replace(3, document.createElement("div")); // Add new panel at index 3
       * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 2
       * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]); // Prepended at index 0, 1
       * flicking.prepend("\<div\>Panel\</div\>"); // Prepended at index 0, pushing every panels behind it.
       */


      __proto.prepend = function (element) {
        return this.insert(0, element);
      };

      __proto.insert = function (index, element) {
        if (this._renderExternal) {
          throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
        }

        return this._renderer.insert(index, element);
      };
      /**
       * Remove panel at target index. This will decrease index of panels behind it.
       *
       * @ko `index`에 해당하는 자리의 패널을 제거한다. 수행시 `index` 이후의 패널들의 인덱스가 감소된다.
       * @param index - Index of panel to remove.<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] - Number of panels to remove from index.<ko>`index` 이후로 제거할 패널의 개수.</ko>
       * @return Array of removed panels<ko>제거된 패널들의 배열</ko>
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
        var elementManipulator = this._useOffsetManipulator ? new OffsetManipulator() : this._renderExternal ? new ExternalManipulator() : new ElementManipulator();
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
        void control.moveToPanel(initialPanel, 0);
      };
      /**
       * Version info string
       *
       * @ko 버전정보 문자열
       * @example
       * eg.Flicking.VERSION;  // ex) 3.0.0
       * @memberof eg.Flicking
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
