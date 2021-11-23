/*
Copyright (c) 2020 Daybrush
name: selecto
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/selecto.git
version: 1.13.2
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Selecto = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
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
    function __rest(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.4.0
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    var OPEN_CLOSED_CHARACTER = ["\"", "'", "\\\"", "\\'"];
    var TINY_NUM = 0.0000001;
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject(value) {
      return value && typeof value === OBJECT;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString(value) {
      return typeof value === STRING;
    }

    function findClosed(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitSpace(text) {
      // divide comma(,)
      return splitText(text, "");
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */

    function splitBracket(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */

    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */

    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */

    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }

      return defaultIndex;
    }
    /**
    * calculate between min, max
    * @function
    * @memberof Utils
    */

    function between(value, min, max) {
      return Math.max(min, Math.min(value, max));
    }
    /**
    * throttle number
    * @function
    * @memberof Utils
    */

    function throttle(num, unit) {
      if (!unit) {
        return num;
      }

      return Math.round(num / unit) * unit;
    }
    function checkBoundSize(targetSize, compareSize, isMax) {
      return [[throttle(compareSize[0], TINY_NUM), throttle(compareSize[0] * targetSize[1] / targetSize[0], TINY_NUM)], [throttle(compareSize[1] * targetSize[0] / targetSize[1], TINY_NUM), throttle(compareSize[1], TINY_NUM)]].filter(function (size) {
        return size.every(function (value, i) {
          return isMax ? value <= compareSize[i] : value >= compareSize[i];
        });
      })[0] || targetSize;
    }
    /**
    * calculate bound size
    * @function
    * @memberof Utils
    */

    function calculateBoundSize(size, minSize, maxSize, keepRatio) {
      if (!keepRatio) {
        return size.map(function (value, i) {
          return between(value, minSize[i], maxSize[i]);
        });
      }

      var width = size[0],
          height = size[1]; // width : height = minWidth : minHeight;

      var _a = checkBoundSize(size, minSize, false),
          minWidth = _a[0],
          minHeight = _a[1];

      var _b = checkBoundSize(size, maxSize, true),
          maxWidth = _b[0],
          maxHeight = _b[1];

      if (width < minWidth || height < minHeight) {
        width = minWidth;
        height = minHeight;
      } else if (width > maxWidth || height > maxHeight) {
        width = maxWidth;
        height = maxHeight;
      }

      return [width, height];
    }
    /**
    * Add all the numbers.
    * @function
    * @memberof Utils
    */

    function sum(nums) {
      var length = nums.length;
      var total = 0;

      for (var i = length - 1; i >= 0; --i) {
        total += nums[i];
      }

      return total;
    }
    /**
    * Average all numbers.
    * @function
    * @memberof Utils
    */

    function average(nums) {
      var length = nums.length;
      var total = 0;

      for (var i = length - 1; i >= 0; --i) {
        total += nums[i];
      }

      return length ? total / length : 0;
    }
    /**
    * Get the angle of two points. (0 <= rad < 359)
    * @function
    * @memberof Utils
    */

    function getRad(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    /**
    * Get the average point of all points.
    * @function
    * @memberof Utils
    */

    function getCenterPoint(points) {
      return [0, 1].map(function (i) {
        return average(points.map(function (pos) {
          return pos[i];
        }));
      });
    }
    /**
    * Gets the direction of the shape.
    * @function
    * @memberof Utils
    */

    function getShapeDirection(points) {
      var center = getCenterPoint(points);
      var pos1Rad = getRad(center, points[0]);
      var pos2Rad = getRad(center, points[1]);
      return pos1Rad < pos2Rad && pos2Rad - pos1Rad < Math.PI || pos1Rad > pos2Rad && pos2Rad - pos1Rad < -Math.PI ? 1 : -1;
    }
    /**
    * Get the distance between two points.
    * @function
    * @memberof Utils
    */

    function getDist(a, b) {
      return Math.sqrt(Math.pow((b ? b[0] : 0) - a[0], 2) + Math.pow((b ? b[1] : 0) - a[1], 2));
    }
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */

    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/event-emitter
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.5
    */

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
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };
    function __spreadArrays$1() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * Implement EventEmitter on object or component.
     */

    var EventEmitter =
    /*#__PURE__*/
    function () {
      function EventEmitter() {
        this._events = {};
      }
      /**
       * Add a listener to the registered event.
       * @param - Name of the event to be added
       * @param - listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add listener in "a" event
       * emitter.on("a", () => {
       * });
       * // Add listeners
       * emitter.on({
       *  a: () => {},
       *  b: () => {},
       * });
       */


      var __proto = EventEmitter.prototype;

      __proto.on = function (eventName, listener) {
        if (isObject(eventName)) {
          for (var name in eventName) {
            this.on(name, eventName[name]);
          }
        } else {
          this._addEvent(eventName, listener, {});
        }

        return this;
      };
      /**
       * Remove listeners registered in the event target.
       * @param - Name of the event to be removed
       * @param - listener function of the event to be removed
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Remove all listeners.
       * emitter.off();
       *
       * // Remove all listeners in "A" event.
       * emitter.off("a");
       *
       *
       * // Remove "listener" listener in "a" event.
       * emitter.off("a", listener);
       */


      __proto.off = function (eventName, listener) {
        if (!eventName) {
          this._events = {};
        } else if (isObject(eventName)) {
          for (var name in eventName) {
            this.off(name);
          }
        } else if (!listener) {
          this._events[eventName] = [];
        } else {
          var events = this._events[eventName];

          if (events) {
            var index = findIndex(events, function (e) {
              return e.listener === listener;
            });

            if (index > -1) {
              events.splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Add a disposable listener and Use promise to the registered event.
       * @param - Name of the event to be added
       * @param - disposable listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add a disposable listener in "a" event
       * emitter.once("a", () => {
       * });
       *
       * // Use Promise
       * emitter.once("a").then(e => {
       * });
       */


      __proto.once = function (eventName, listener) {
        var _this = this;

        if (listener) {
          this._addEvent(eventName, listener, {
            once: true
          });
        }

        return new Promise(function (resolve) {
          _this._addEvent(eventName, resolve, {
            once: true
          });
        });
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */


      __proto.emit = function (eventName, param) {
        var _this = this;

        if (param === void 0) {
          param = {};
        }

        var events = this._events[eventName];

        if (!eventName || !events) {
          return true;
        }

        var isStop = false;
        param.eventType = eventName;

        param.stop = function () {
          isStop = true;
        };

        param.currentTarget = this;

        __spreadArrays$1(events).forEach(function (info) {
          info.listener(param);

          if (info.once) {
            _this.off(eventName, info.listener);
          }
        });

        return !isStop;
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */

      /**
      * Fires an event to call listeners.
      * @param - Event name
      * @param - Event parameter
      * @return If false, stop the event.
      * @example
      *
      * import EventEmitter from "@scena/event-emitter";
      *
      *
      * const emitter = new EventEmitter();
      *
      * emitter.on("a", e => {
      * });
      *
      * // emit
      * emitter.trigger("a", {
      *   a: 1,
      * });
      */


      __proto.trigger = function (eventName, param) {
        if (param === void 0) {
          param = {};
        }

        return this.emit(eventName, param);
      };

      __proto._addEvent = function (eventName, listener, options) {
        var events = this._events;
        events[eventName] = events[eventName] || [];
        var listeners = events[eventName];
        listeners.push(__assign$1({
          listener: listener
        }, options));
      };

      return EventEmitter;
    }();

    /*
    Copyright (c) 2019 Daybrush
    name: gesto
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.5.0
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function () {
      __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$2.apply(this, arguments);
    };

    function getRad$1(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getRotatiion(touches) {
      return getRad$1([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
    }
    function isMultiTouch(e) {
      return e.touches && e.touches.length >= 2;
    }
    function getEventClients(e) {
      if (e.touches) {
        return getClients(e.touches);
      } else {
        return [getClient(e)];
      }
    }
    function getPosition(clients, prevClients, startClients) {
      var length = startClients.length;

      var _a = getAverageClient(clients, length),
          clientX = _a.clientX,
          clientY = _a.clientY,
          originalClientX = _a.originalClientX,
          originalClientY = _a.originalClientY;

      var _b = getAverageClient(prevClients, length),
          prevX = _b.clientX,
          prevY = _b.clientY;

      var _c = getAverageClient(startClients, length),
          startX = _c.clientX,
          startY = _c.clientY;

      var deltaX = clientX - prevX;
      var deltaY = clientY - prevY;
      var distX = clientX - startX;
      var distY = clientY - startY;
      return {
        clientX: originalClientX,
        clientY: originalClientY,
        deltaX: deltaX,
        deltaY: deltaY,
        distX: distX,
        distY: distY
      };
    }
    function getDist$1(clients) {
      return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
    }
    function getClients(touches) {
      var length = Math.min(touches.length, 2);
      var clients = [];

      for (var i = 0; i < length; ++i) {
        clients.push(getClient(touches[i]));
      }

      return clients;
    }
    function getClient(e) {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
    function getAverageClient(clients, length) {
      if (length === void 0) {
        length = clients.length;
      }

      var sumClient = {
        clientX: 0,
        clientY: 0,
        originalClientX: 0,
        originalClientY: 0
      };

      for (var i = 0; i < length; ++i) {
        var client = clients[i];
        sumClient.originalClientX += "originalClientX" in client ? client.originalClientX : client.clientX;
        sumClient.originalClientY += "originalClientY" in client ? client.originalClientY : client.clientY;
        sumClient.clientX += client.clientX;
        sumClient.clientY += client.clientY;
      }

      if (!length) {
        return sumClient;
      }

      return {
        clientX: sumClient.clientX / length,
        clientY: sumClient.clientY / length,
        originalClientX: sumClient.originalClientX / length,
        originalClientY: sumClient.originalClientY / length
      };
    }

    var ClientStore =
    /*#__PURE__*/
    function () {
      function ClientStore(clients) {
        this.prevClients = [];
        this.startClients = [];
        this.movement = 0;
        this.length = 0;
        this.startClients = clients;
        this.prevClients = clients;
        this.length = clients.length;
      }

      var __proto = ClientStore.prototype;

      __proto.addClients = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var position = this.getPosition(clients);
        var deltaX = position.deltaX,
            deltaY = position.deltaY;
        this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.prevClients = clients;
        return position;
      };

      __proto.getAngle = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients);
      };

      __proto.getRotation = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients) - getRotatiion(this.startClients);
      };

      __proto.getPosition = function (clients) {
        return getPosition(clients || this.prevClients, this.prevClients, this.startClients);
      };

      __proto.getPositions = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var prevClients = this.prevClients;
        return this.startClients.map(function (startClient, i) {
          return getPosition([clients[i]], [prevClients[i]], [startClient]);
        });
      };

      __proto.getMovement = function (clients) {
        var movement = this.movement;

        if (!clients) {
          return movement;
        }

        var currentClient = getAverageClient(clients, this.length);
        var prevClient = getAverageClient(this.prevClients, this.length);
        var deltaX = currentClient.clientX - prevClient.clientX;
        var deltaY = currentClient.clientY - prevClient.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + movement;
      };

      __proto.getDistance = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist$1(clients);
      };

      __proto.getScale = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist$1(clients) / getDist$1(this.startClients);
      };

      __proto.move = function (deltaX, deltaY) {
        this.startClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
        this.prevClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
      };

      return ClientStore;
    }();

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag, pinch events in any browser.
     */

    var Gesto =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Gesto, _super);
      /**
       *
       */


      function Gesto(targets, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.options = {};
        _this.flag = false;
        _this.pinchFlag = false;
        _this.datas = {};
        _this.isDrag = false;
        _this.isPinch = false;
        _this.isMouse = false;
        _this.isTouch = false;
        _this.clientStores = [];
        _this.targets = [];
        _this.prevTime = 0;
        _this.doubleFlag = false;

        _this.onDragStart = function (e, isTrusted) {
          if (isTrusted === void 0) {
            isTrusted = true;
          }

          if (!_this.flag && e.cancelable === false) {
            return;
          }

          var _a = _this.options,
              container = _a.container,
              pinchOutside = _a.pinchOutside,
              preventRightClick = _a.preventRightClick,
              preventDefault = _a.preventDefault,
              checkInput = _a.checkInput;
          var isTouch = _this.isTouch;
          var isDragStart = !_this.flag;

          if (isDragStart) {
            var activeElement = document.activeElement;
            var target = e.target;
            var tagName = target.tagName.toLowerCase();
            var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
            var hasContentEditable = target.isContentEditable;

            if (hasInput || hasContentEditable) {
              if (checkInput || activeElement === target) {
                // force false or already focused.
                return false;
              }

              if (activeElement && hasContentEditable && activeElement.isContentEditable && activeElement.contains(target)) {
                return false;
              }
            } else if ((preventDefault || e.type === "touchstart") && activeElement) {
              var activeTagName = activeElement.tagName;

              if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                activeElement.blur();
              }
            }

            _this.clientStores = [new ClientStore(getEventClients(e))];
            _this.flag = true;
            _this.isDrag = false;
            _this.datas = {};

            if (preventRightClick && (e.which === 3 || e.button === 2)) {
              _this.initDrag();

              return false;
            }

            _this.doubleFlag = now() - _this.prevTime < 200;

            var result = _this.emit("dragStart", __assign$2({
              datas: _this.datas,
              inputEvent: e,
              isTrusted: isTrusted,
              isDouble: _this.doubleFlag
            }, _this.getCurrentStore().getPosition()));

            if (result === false) {
              _this.initDrag();
            }

            _this.flag && preventDefault && e.preventDefault();
          }

          if (!_this.flag) {
            return false;
          }

          var timer = 0;

          if (isDragStart && isTouch && pinchOutside) {
            timer = setTimeout(function () {
              addEvent(container, "touchstart", _this.onDragStart, {
                passive: false
              });
            });
          }

          if (!isDragStart && isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.flag && isMultiTouch(e)) {
            clearTimeout(timer);

            if (isDragStart && e.touches.length !== e.changedTouches.length) {
              return;
            }

            if (!_this.pinchFlag) {
              _this.onPinchStart(e);
            }
          }
        };

        _this.onDrag = function (e, isScroll) {
          if (!_this.flag) {
            return;
          }

          var clients = getEventClients(e);

          var result = _this.moveClients(clients, e, false);

          if (_this.pinchFlag || result.deltaX || result.deltaY) {
            var dragResult = _this.emit("drag", __assign$2({}, result, {
              isScroll: !!isScroll,
              inputEvent: e
            }));

            if (dragResult === false) {
              _this.stop();

              return;
            }
          }

          if (_this.pinchFlag) {
            _this.onPinch(e, clients);
          }

          _this.getCurrentStore().addClients(clients);
        };

        _this.onDragEnd = function (e) {
          if (!_this.flag) {
            return;
          }

          var _a = _this.options,
              pinchOutside = _a.pinchOutside,
              container = _a.container;

          if (_this.isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          _this.flag = false;

          var position = _this.getCurrentStore().getPosition();

          var currentTime = now();
          var isDouble = !_this.isDrag && _this.doubleFlag;
          _this.prevTime = _this.isDrag || isDouble ? 0 : currentTime;

          _this.emit("dragEnd", __assign$2({
            datas: _this.datas,
            isDouble: isDouble,
            isDrag: _this.isDrag,
            isClick: !_this.isDrag,
            inputEvent: e
          }, position));

          if (_this.pinchFlag) {
            _this.onPinchEnd(e);
          }

          _this.clientStores = [];
        };

        _this.onBlur = function () {
          _this.onDragEnd();
        };

        var elements = [].concat(targets);
        _this.options = __assign$2({
          checkInput: false,
          container: elements.length > 1 ? window : elements[0],
          preventRightClick: true,
          preventDefault: true,
          checkWindowBlur: false,
          pinchThreshold: 0,
          events: ["touch", "mouse"]
        }, options);
        var _a = _this.options,
            container = _a.container,
            events = _a.events,
            checkWindowBlur = _a.checkWindowBlur;
        _this.isTouch = events.indexOf("touch") > -1;
        _this.isMouse = events.indexOf("mouse") > -1;
        _this.targets = elements;

        if (_this.isMouse) {
          elements.forEach(function (el) {
            addEvent(el, "mousedown", _this.onDragStart);
          });
          addEvent(container, "mousemove", _this.onDrag);
          addEvent(container, "mouseup", _this.onDragEnd);
          addEvent(container, "contextmenu", _this.onDragEnd);
        }

        if (checkWindowBlur) {
          addEvent(window, "blur", _this.onBlur);
        }

        if (_this.isTouch) {
          var passive_1 = {
            passive: false
          };
          elements.forEach(function (el) {
            addEvent(el, "touchstart", _this.onDragStart, passive_1);
          });
          addEvent(container, "touchmove", _this.onDrag, passive_1);
          addEvent(container, "touchend", _this.onDragEnd, passive_1);
          addEvent(container, "touchcancel", _this.onDragEnd, passive_1);
        }

        return _this;
      }
      /**
       * Stop Gesto's drag events.
       */


      var __proto = Gesto.prototype;

      __proto.stop = function () {
        this.isDrag = false;
        this.flag = false;
        this.clientStores = [];
        this.datas = {};
      };
      /**
       * The total moved distance
       */


      __proto.getMovement = function (clients) {
        return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function (prev, cur) {
          return prev + cur.movement;
        }, 0);
      };
      /**
       * Whether to drag
       */


      __proto.isDragging = function () {
        return this.isDrag;
      };
      /**
       * Whether to start drag
       */


      __proto.isFlag = function () {
        return this.flag;
      };
      /**
       * Whether to start pinch
       */


      __proto.isPinchFlag = function () {
        return this.pinchFlag;
      };
      /**
      * Whether to start double click
      */


      __proto.isDoubleFlag = function () {
        return this.doubleFlag;
      };
      /**
       * Whether to pinch
       */


      __proto.isPinching = function () {
        return this.isPinch;
      };
      /**
       * If a scroll event occurs, it is corrected by the scroll distance.
       */


      __proto.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
        if (isCallDrag === void 0) {
          isCallDrag = true;
        }

        if (!this.flag) {
          return;
        }

        this.clientStores[0].move(deltaX, deltaY);
        isCallDrag && this.onDrag(e, true);
      };
      /**
       * Create a virtual drag event.
       */


      __proto.move = function (_a, inputEvent) {
        var deltaX = _a[0],
            deltaY = _a[1];
        var store = this.getCurrentStore();
        var nextClients = store.prevClients;
        return this.moveClients(nextClients.map(function (_a) {
          var clientX = _a.clientX,
              clientY = _a.clientY;
          return {
            clientX: clientX + deltaX,
            clientY: clientY + deltaY,
            originalClientX: clientX,
            originalClientY: clientY
          };
        }), inputEvent, true);
      };
      /**
       * The dragStart event is triggered by an external event.
       */


      __proto.triggerDragStart = function (e) {
        this.onDragStart(e, false);
      };
      /**
       * Set the event data while dragging.
       */


      __proto.setEventDatas = function (datas) {
        var currentDatas = this.datas;

        for (var name in datas) {
          currentDatas[name] = datas[name];
        }

        return this;
      };
      /**
       * Set the event data while dragging.
       */


      __proto.getEventDatas = function () {
        return this.datas;
      };
      /**
       * Unset Gesto
       */


      __proto.unset = function () {
        var _this = this;

        var targets = this.targets;
        var container = this.options.container;
        this.off();
        removeEvent(window, "blur", this.onBlur);

        if (this.isMouse) {
          targets.forEach(function (target) {
            removeEvent(target, "mousedown", _this.onDragStart);
          });
          removeEvent(container, "mousemove", this.onDrag);
          removeEvent(container, "mouseup", this.onDragEnd);
          removeEvent(container, "contextmenu", this.onDragEnd);
        }

        if (this.isTouch) {
          targets.forEach(function (target) {
            removeEvent(target, "touchstart", _this.onDragStart);
          });
          removeEvent(container, "touchstart", this.onDragStart);
          removeEvent(container, "touchmove", this.onDrag);
          removeEvent(container, "touchend", this.onDragEnd);
          removeEvent(container, "touchcancel", this.onDragEnd);
        }
      };

      __proto.onPinchStart = function (e) {
        var pinchThreshold = this.options.pinchThreshold;

        if (this.isDrag && this.getMovement() > pinchThreshold) {
          return;
        }

        var store = new ClientStore(getEventClients(e));
        this.pinchFlag = true;
        this.clientStores.splice(0, 0, store);
        var result = this.emit("pinchStart", __assign$2({
          datas: this.datas,
          angle: store.getAngle(),
          touches: this.getCurrentStore().getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));

        if (result === false) {
          this.pinchFlag = false;
        }
      };

      __proto.onPinch = function (e, clients) {
        if (!this.flag || !this.pinchFlag || clients.length < 2) {
          return;
        }

        var store = this.getCurrentStore();
        this.isPinch = true;
        this.emit("pinch", __assign$2({
          datas: this.datas,
          movement: this.getMovement(clients),
          angle: store.getAngle(clients),
          rotation: store.getRotation(clients),
          touches: store.getPositions(clients),
          scale: store.getScale(clients),
          distance: store.getDistance(clients)
        }, store.getPosition(clients), {
          inputEvent: e
        }));
      };

      __proto.onPinchEnd = function (e) {
        if (!this.pinchFlag) {
          return;
        }

        var isPinch = this.isPinch;
        this.isPinch = false;
        this.pinchFlag = false;
        var store = this.getCurrentStore();
        this.emit("pinchEnd", __assign$2({
          datas: this.datas,
          isPinch: isPinch,
          touches: store.getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));
        this.isPinch = false;
        this.pinchFlag = false;
      };

      __proto.initDrag = function () {
        this.clientStores = [];
        this.pinchFlag = false;
        this.doubleFlag = false;
        this.prevTime = 0;
        this.flag = false;
      };

      __proto.getCurrentStore = function () {
        return this.clientStores[0];
      };

      __proto.moveClients = function (clients, inputEvent, isAdd) {
        var store = this.getCurrentStore();
        var position = store[isAdd ? "addClients" : "getPosition"](clients);
        this.isDrag = true;
        return __assign$2({
          datas: this.datas
        }, position, {
          movement: this.getMovement(clients),
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          inputEvent: inputEvent
        });
      };

      return Gesto;
    }(EventEmitter);

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 1.1.0
    */
    /* Class Decorator */

    function Properties(properties, action) {
      return function (component) {
        var prototype = component.prototype;
        properties.forEach(function (property) {
          action(prototype, property);
        });
      };
    }

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/list-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-list-differ
    version: 1.0.0
    */
    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var PolyMap =
    /*#__PURE__*/
    function () {
      function PolyMap() {
        this.keys = [];
        this.values = [];
      }

      var __proto = PolyMap.prototype;

      __proto.get = function (key) {
        return this.values[this.keys.indexOf(key)];
      };

      __proto.set = function (key, value) {
        var keys = this.keys;
        var values = this.values;
        var prevIndex = keys.indexOf(key);
        var index = prevIndex === -1 ? keys.length : prevIndex;
        keys[index] = key;
        values[index] = value;
      };

      return PolyMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var HashMap =
    /*#__PURE__*/
    function () {
      function HashMap() {
        this.object = {};
      }

      var __proto = HashMap.prototype;

      __proto.get = function (key) {
        return this.object[key];
      };

      __proto.set = function (key, value) {
        this.object[key] = value;
      };

      return HashMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var SUPPORT_MAP = typeof Map === "function";

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var Link =
    /*#__PURE__*/
    function () {
      function Link() {}

      var __proto = Link.prototype;

      __proto.connect = function (prevLink, nextLink) {
        this.prev = prevLink;
        this.next = nextLink;
        prevLink && (prevLink.next = this);
        nextLink && (nextLink.prev = this);
      };

      __proto.disconnect = function () {
        // In double linked list, diconnect the interconnected relationship.
        var prevLink = this.prev;
        var nextLink = this.next;
        prevLink && (prevLink.next = nextLink);
        nextLink && (nextLink.prev = prevLink);
      };

      __proto.getIndex = function () {
        var link = this;
        var index = -1;

        while (link) {
          link = link.prev;
          ++index;
        }

        return index;
      };

      return Link;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */

    function orderChanged(changed, fixed) {
      // It is roughly in the order of these examples.
      // 4, 6, 0, 2, 1, 3, 5, 7
      var fromLinks = []; // 0, 1, 2, 3, 4, 5, 6, 7

      var toLinks = [];
      changed.forEach(function (_a) {
        var from = _a[0],
            to = _a[1];
        var link = new Link();
        fromLinks[from] = link;
        toLinks[to] = link;
      }); // `fromLinks` are connected to each other by double linked list.

      fromLinks.forEach(function (link, i) {
        link.connect(fromLinks[i - 1]);
      });
      return changed.filter(function (_, i) {
        return !fixed[i];
      }).map(function (_a, i) {
        var from = _a[0],
            to = _a[1];

        if (from === to) {
          return [0, 0];
        }

        var fromLink = fromLinks[from];
        var toLink = toLinks[to - 1];
        var fromIndex = fromLink.getIndex(); // Disconnect the link connected to `fromLink`.

        fromLink.disconnect(); // Connect `fromLink` to the right of `toLink`.

        if (!toLink) {
          fromLink.connect(undefined, fromLinks[0]);
        } else {
          fromLink.connect(toLink, toLink.next);
        }

        var toIndex = fromLink.getIndex();
        return [fromIndex, toIndex];
      });
    }

    var Result =
    /*#__PURE__*/
    function () {
      function Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
        this.prevList = prevList;
        this.list = list;
        this.added = added;
        this.removed = removed;
        this.changed = changed;
        this.maintained = maintained;
        this.changedBeforeAdded = changedBeforeAdded;
        this.fixed = fixed;
      }

      var __proto = Result.prototype;
      Object.defineProperty(__proto, "ordered", {
        get: function () {
          if (!this.cacheOrdered) {
            this.caculateOrdered();
          }

          return this.cacheOrdered;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(__proto, "pureChanged", {
        get: function () {
          if (!this.cachePureChanged) {
            this.caculateOrdered();
          }

          return this.cachePureChanged;
        },
        enumerable: true,
        configurable: true
      });

      __proto.caculateOrdered = function () {
        var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
        var changed = this.changed;
        var pureChanged = [];
        this.cacheOrdered = ordered.filter(function (_a, i) {
          var from = _a[0],
              to = _a[1];
          var _b = changed[i],
              fromBefore = _b[0],
              toBefore = _b[1];

          if (from !== to) {
            pureChanged.push([fromBefore, toBefore]);
            return true;
          }
        });
        this.cachePureChanged = pureChanged;
      };

      return Result;
    }();

    /**
     *
     * @memberof eg.ListDiffer
     * @static
     * @function
     * @param - Previous List <ko> 이전 목록 </ko>
     * @param - List to Update <ko> 업데이트 할 목록 </ko>
     * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
     * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
     * @example
     * import { diff } from "@egjs/list-differ";
     * // script => eg.ListDiffer.diff
     * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1], e => e);
     * // List before update
     * // [1, 2, 3, 4, 5]
     * console.log(result.prevList);
     * // Updated list
     * // [4, 3, 6, 2, 1]
     * console.log(result.list);
     * // Index array of values added to `list`
     * // [0, 1, 5]
     * console.log(result.added);
     * // Index array of values removed in `prevList`
     * // [5]
     * console.log(result.removed);
     * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.changed);
     * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
     * // [[4, 3], [3, 4], [2, 6]]
     * console.log(result.pureChanged);
     * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
     * // [[4, 1], [4, 2], [4, 3]]
     * console.log(result.ordered);
     * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.maintained);
     */

    function diff(prevList, list, findKeyCallback) {
      var mapClass = SUPPORT_MAP ? Map : findKeyCallback ? HashMap : PolyMap;

      var callback = findKeyCallback || function (e) {
        return e;
      };

      var added = [];
      var removed = [];
      var maintained = [];
      var prevKeys = prevList.map(callback);
      var keys = list.map(callback);
      var prevKeyMap = new mapClass();
      var keyMap = new mapClass();
      var changedBeforeAdded = [];
      var fixed = [];
      var removedMap = {};
      var changed = [];
      var addedCount = 0;
      var removedCount = 0; // Add prevKeys and keys to the hashmap.

      prevKeys.forEach(function (key, prevListIndex) {
        prevKeyMap.set(key, prevListIndex);
      });
      keys.forEach(function (key, listIndex) {
        keyMap.set(key, listIndex);
      }); // Compare `prevKeys` and `keys` and add them to `removed` if they are not in `keys`.

      prevKeys.forEach(function (key, prevListIndex) {
        var listIndex = keyMap.get(key); // In prevList, but not in list, it is removed.

        if (typeof listIndex === "undefined") {
          ++removedCount;
          removed.push(prevListIndex);
        } else {
          removedMap[listIndex] = removedCount;
        }
      }); // Compare `prevKeys` and `keys` and add them to `added` if they are not in `prevKeys`.

      keys.forEach(function (key, listIndex) {
        var prevListIndex = prevKeyMap.get(key); // In list, but not in prevList, it is added.

        if (typeof prevListIndex === "undefined") {
          added.push(listIndex);
          ++addedCount;
        } else {
          maintained.push([prevListIndex, listIndex]);
          removedCount = removedMap[listIndex] || 0;
          changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
          fixed.push(listIndex === prevListIndex);

          if (prevListIndex !== listIndex) {
            changed.push([prevListIndex, listIndex]);
          }
        }
      }); // Sort by ascending order of 'to(list's index).

      removed.reverse();
      return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
    }

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/children-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-children-differ
    version: 1.0.1
    */

    /*
    egjs-children-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var findKeyCallback = typeof Map === "function" ? undefined : function () {
      var childrenCount = 0;
      return function (el) {
        return el.__DIFF_KEY__ || (el.__DIFF_KEY__ = ++childrenCount);
      };
    }();

    /*
    egjs-children-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    /**
     *
     * @memberof eg.ChildrenDiffer
     * @static
     * @function
     * @param - Previous List <ko> 이전 목록 </ko>
     * @param - List to Update <ko> 업데이트 할 목록 </ko>
     * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
     * @example
     * import { diff } from "@egjs/children-differ";
     * // script => eg.ChildrenDiffer.diff
     * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1]);
     * // List before update
     * // [1, 2, 3, 4, 5]
     * console.log(result.prevList);
     * // Updated list
     * // [4, 3, 6, 2, 1]
     * console.log(result.list);
     * // Index array of values added to `list`
     * // [0, 1, 5]
     * console.log(result.added);
     * // Index array of values removed in `prevList`
     * // [5]
     * console.log(result.removed);
     * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.changed);
     * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
     * // [[4, 3], [3, 4], [2, 6]]
     * console.log(result.pureChanged);
     * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
     * // [[4, 1], [4, 2], [4, 3]]
     * console.log(result.ordered);
     * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.maintained);
     */

    function diff$1(prevList, list) {
      return diff(prevList, list, findKeyCallback);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/dragscroll
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/dragscroll.git
    version: 1.0.2
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$2 = function (d, b) {
      extendStatics$2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
      extendStatics$2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function getDefaultScrollPosition(e) {
      var container = e.container;

      if (container === document.body) {
        return [container.scrollLeft || document.documentElement.scrollLeft, container.scrollTop || document.documentElement.scrollTop];
      }

      return [container.scrollLeft, container.scrollTop];
    }

    var DragScroll =
    /*#__PURE__*/
    function (_super) {
      __extends$2(DragScroll, _super);

      function DragScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.startRect = null;
        _this.startPos = [];
        _this.prevTime = 0;
        _this.timer = 0;
        return _this;
      }

      var __proto = DragScroll.prototype;

      __proto.dragStart = function (e, options) {
        var container = options.container;
        var top = 0;
        var left = 0;
        var width = 0;
        var height = 0;

        if (container === document.body) {
          width = window.innerWidth;
          height = window.innerHeight;
        } else {
          var rect = container.getBoundingClientRect();
          top = rect.top;
          left = rect.left;
          width = rect.width;
          height = rect.height;
        }

        this.startPos = [e.clientX, e.clientY];
        this.startRect = {
          top: top,
          left: left,
          width: width,
          height: height
        };
      };

      __proto.drag = function (e, options) {
        var _this = this;

        var clientX = e.clientX,
            clientY = e.clientY;
        var container = options.container,
            _a = options.threshold,
            threshold = _a === void 0 ? 0 : _a,
            _b = options.throttleTime,
            throttleTime = _b === void 0 ? 0 : _b,
            _c = options.getScrollPosition,
            getScrollPosition = _c === void 0 ? getDefaultScrollPosition : _c;

        var _d = this,
            startRect = _d.startRect,
            startPos = _d.startPos;

        var nowTime = now();
        var distTime = Math.max(throttleTime + this.prevTime - nowTime, 0);
        var direction = [0, 0];

        if (startRect.top > clientY - threshold) {
          if (startPos[1] > startRect.top || clientY < startPos[1]) {
            direction[1] = -1;
          }
        } else if (startRect.top + startRect.height < clientY + threshold) {
          if (startPos[1] < startRect.top + startRect.height || clientY > startPos[1]) {
            direction[1] = 1;
          }
        }

        if (startRect.left > clientX - threshold) {
          if (startPos[0] > startRect.left || clientX < startPos[0]) {
            direction[0] = -1;
          }
        } else if (startRect.left + startRect.width < clientX + threshold) {
          if (startPos[0] < startRect.left + startRect.width || clientX > startPos[0]) {
            direction[0] = 1;
          }
        }

        clearTimeout(this.timer);

        if (!direction[0] && !direction[1]) {
          return false;
        }

        if (distTime > 0) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, distTime);
          return false;
        }

        this.prevTime = nowTime;
        var prevPos = getScrollPosition({
          container: container,
          direction: direction
        });
        this.trigger("scroll", {
          container: container,
          direction: direction,
          inputEvent: e
        });
        var nextPos = getScrollPosition({
          container: container,
          direction: direction
        });
        var offsetX = nextPos[0] - prevPos[0];
        var offsetY = nextPos[1] - prevPos[1];

        if (!offsetX && !offsetY) {
          return false;
        }

        this.trigger("move", {
          offsetX: direction[0] ? offsetX : 0,
          offsetY: direction[1] ? offsetY : 0,
          inputEvent: e
        });

        if (throttleTime) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, throttleTime);
        }

        return true;
      };

      __proto.dragEnd = function () {
        clearTimeout(this.timer);
      };

      return DragScroll;
    }(EventEmitter);

    /*
    Copyright (c) Daybrush
    name: keycon
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/keycon.git
    version: 1.1.2
    */
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
    var extendStatics$3 = function (d, b) {
      extendStatics$3 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$3(d, b);
    };

    function __extends$3(d, b) {
      extendStatics$3(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT$1 = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING$1 = "string";
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject$1(value) {
      return value && typeof value === OBJECT$1;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray$1(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString$1(value) {
      return typeof value === STRING$1;
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */

    function findIndex$1(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }

      return defaultIndex;
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent$1(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent$1(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/event-emitter
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.2
    */

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
    var __assign$3 = function () {
      __assign$3 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$3.apply(this, arguments);
    };
    function __spreadArrays$2() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * Implement EventEmitter on object or component.
     */

    var EventEmitter$1 =
    /*#__PURE__*/
    function () {
      function EventEmitter() {
        this._events = {};
      }
      /**
       * Add a listener to the registered event.
       * @param - Name of the event to be added
       * @param - listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add listener in "a" event
       * emitter.on("a", () => {
       * });
       * // Add listeners
       * emitter.on({
       *  a: () => {},
       *  b: () => {},
       * });
       */


      var __proto = EventEmitter.prototype;

      __proto.on = function (eventName, listener) {
        if (isObject$1(eventName)) {
          for (var name in eventName) {
            this.on(name, eventName[name]);
          }
        } else {
          this._addEvent(eventName, listener, {});
        }

        return this;
      };
      /**
       * Remove listeners registered in the event target.
       * @param - Name of the event to be removed
       * @param - listener function of the event to be removed
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Remove all listeners.
       * emitter.off();
       *
       * // Remove all listeners in "A" event.
       * emitter.off("a");
       *
       *
       * // Remove "listener" listener in "a" event.
       * emitter.off("a", listener);
       */


      __proto.off = function (eventName, listener) {
        if (!eventName) {
          this._events = {};
        } else if (isObject$1(eventName)) {
          for (var name in eventName) {
            this.off(name);
          }
        } else if (!listener) {
          this._events[eventName] = [];
        } else {
          var events = this._events[eventName];

          if (events) {
            var index = findIndex$1(events, function (e) {
              return e.listener === listener;
            });

            if (index > -1) {
              events.splice(index, 1);
            }
          }
        }

        return this;
      };
      /**
       * Add a disposable listener and Use promise to the registered event.
       * @param - Name of the event to be added
       * @param - disposable listener function of the event to be added
       * @example
       * import EventEmitter from "@scena/event-emitter";
       * cosnt emitter = new EventEmitter();
       *
       * // Add a disposable listener in "a" event
       * emitter.once("a", () => {
       * });
       *
       * // Use Promise
       * emitter.once("a").then(e => {
       * });
       */


      __proto.once = function (eventName, listener) {
        var _this = this;

        if (listener) {
          this._addEvent(eventName, listener, {
            once: true
          });
        }

        return new Promise(function (resolve) {
          _this._addEvent(eventName, resolve, {
            once: true
          });
        });
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */


      __proto.emit = function (eventName, param) {
        var _this = this;

        if (param === void 0) {
          param = {};
        }

        var events = this._events[eventName];

        if (!eventName || !events) {
          return true;
        }

        var isStop = false;
        param.eventType = eventName;

        param.stop = function () {
          isStop = true;
        };

        param.currentTarget = this;

        __spreadArrays$2(events).forEach(function (info) {
          info.listener(param);

          if (info.once) {
            _this.off(eventName, info.listener);
          }
        });

        return !isStop;
      };
      /**
       * Fires an event to call listeners.
       * @param - Event name
       * @param - Event parameter
       * @return If false, stop the event.
       * @example
       *
       * import EventEmitter from "@scena/event-emitter";
       *
       *
       * const emitter = new EventEmitter();
       *
       * emitter.on("a", e => {
       * });
       *
       *
       * emitter.emit("a", {
       *   a: 1,
       * });
       */

      /**
      * Fires an event to call listeners.
      * @param - Event name
      * @param - Event parameter
      * @return If false, stop the event.
      * @example
      *
      * import EventEmitter from "@scena/event-emitter";
      *
      *
      * const emitter = new EventEmitter();
      *
      * emitter.on("a", e => {
      * });
      *
      * // emit
      * emitter.trigger("a", {
      *   a: 1,
      * });
      */


      __proto.trigger = function (eventName, param) {
        if (param === void 0) {
          param = {};
        }

        return this.emit(eventName, param);
      };

      __proto._addEvent = function (eventName, listener, options) {
        var events = this._events;
        events[eventName] = events[eventName] || [];
        var listeners = events[eventName];
        listeners.push(__assign$3({
          listener: listener
        }, options));
      };

      return EventEmitter;
    }();

    function createCommonjsModule(fn, module) {
      return module = {
        exports: {}
      }, fn(module, module.exports), module.exports;
    }

    var keycode = createCommonjsModule(function (module, exports) {
    // Source: http://jsfiddle.net/vWx8V/
    // http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

    /**
     * Conenience method returns corresponding value for given keyName or keyCode.
     *
     * @param {Mixed} keyCode {Number} or keyName {String}
     * @return {Mixed}
     * @api public
     */

    function keyCode(searchInput) {
      // Keyboard Events
      if (searchInput && 'object' === typeof searchInput) {
        var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
        if (hasKeyCode) searchInput = hasKeyCode;
      }

      // Numbers
      if ('number' === typeof searchInput) return names[searchInput]

      // Everything else (cast to string)
      var search = String(searchInput);

      // check codes
      var foundNamedKey = codes[search.toLowerCase()];
      if (foundNamedKey) return foundNamedKey

      // check aliases
      var foundNamedKey = aliases[search.toLowerCase()];
      if (foundNamedKey) return foundNamedKey

      // weird character?
      if (search.length === 1) return search.charCodeAt(0)

      return undefined
    }

    /**
     * Compares a keyboard event with a given keyCode or keyName.
     *
     * @param {Event} event Keyboard event that should be tested
     * @param {Mixed} keyCode {Number} or keyName {String}
     * @return {Boolean}
     * @api public
     */
    keyCode.isEventKey = function isEventKey(event, nameOrCode) {
      if (event && 'object' === typeof event) {
        var keyCode = event.which || event.keyCode || event.charCode;
        if (keyCode === null || keyCode === undefined) { return false; }
        if (typeof nameOrCode === 'string') {
          // check codes
          var foundNamedKey = codes[nameOrCode.toLowerCase()];
          if (foundNamedKey) { return foundNamedKey === keyCode; }
        
          // check aliases
          var foundNamedKey = aliases[nameOrCode.toLowerCase()];
          if (foundNamedKey) { return foundNamedKey === keyCode; }
        } else if (typeof nameOrCode === 'number') {
          return nameOrCode === keyCode;
        }
        return false;
      }
    };

    exports = module.exports = keyCode;

    /**
     * Get by name
     *
     *   exports.code['enter'] // => 13
     */

    var codes = exports.code = exports.codes = {
      'backspace': 8,
      'tab': 9,
      'enter': 13,
      'shift': 16,
      'ctrl': 17,
      'alt': 18,
      'pause/break': 19,
      'caps lock': 20,
      'esc': 27,
      'space': 32,
      'page up': 33,
      'page down': 34,
      'end': 35,
      'home': 36,
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'insert': 45,
      'delete': 46,
      'command': 91,
      'left command': 91,
      'right command': 93,
      'numpad *': 106,
      'numpad +': 107,
      'numpad -': 109,
      'numpad .': 110,
      'numpad /': 111,
      'num lock': 144,
      'scroll lock': 145,
      'my computer': 182,
      'my calculator': 183,
      ';': 186,
      '=': 187,
      ',': 188,
      '-': 189,
      '.': 190,
      '/': 191,
      '`': 192,
      '[': 219,
      '\\': 220,
      ']': 221,
      "'": 222
    };

    // Helper aliases

    var aliases = exports.aliases = {
      'windows': 91,
      '⇧': 16,
      '⌥': 18,
      '⌃': 17,
      '⌘': 91,
      'ctl': 17,
      'control': 17,
      'option': 18,
      'pause': 19,
      'break': 19,
      'caps': 20,
      'return': 13,
      'escape': 27,
      'spc': 32,
      'spacebar': 32,
      'pgup': 33,
      'pgdn': 34,
      'ins': 45,
      'del': 46,
      'cmd': 91
    };

    /*!
     * Programatically add the following
     */

    // lower case chars
    for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32;

    // numbers
    for (var i = 48; i < 58; i++) codes[i - 48] = i;

    // function keys
    for (i = 1; i < 13; i++) codes['f'+i] = i + 111;

    // numpad keys
    for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96;

    /**
     * Get by code
     *
     *   exports.name[13] // => 'Enter'
     */

    var names = exports.names = exports.title = {}; // title for backward compat

    // Create reverse mapping
    for (i in codes) names[codes[i]] = i;

    // Add aliases
    for (var alias in aliases) {
      codes[alias] = aliases[alias];
    }
    });
    var keycode_1 = keycode.code;
    var keycode_2 = keycode.codes;
    var keycode_3 = keycode.aliases;
    var keycode_4 = keycode.names;
    var keycode_5 = keycode.title;

    var codeData = {
      "+": "plus",
      "left command": "meta",
      "right command": "meta"
    };
    var keysSort = {
      shift: 1,
      ctrl: 2,
      alt: 3,
      meta: 4
    };
    /**
     * @memberof KeyController
     */

    function getKey(keyCode) {
      var key = keycode_4[keyCode] || "";

      for (var name in codeData) {
        key = key.replace(name, codeData[name]);
      }

      return key.replace(/\s/g, "");
    }
    /**
     * @memberof KeyController
     */

    function getCombi(e, key) {
      if (key === void 0) {
        key = getKey(e.keyCode);
      }

      var keys = getModifierCombi(e);
      keys.indexOf(key) === -1 && keys.push(key);
      return keys.filter(Boolean);
    }
    /**
     * @memberof KeyController
     */

    function getModifierCombi(e) {
      var keys = [e.shiftKey && "shift", e.ctrlKey && "ctrl", e.altKey && "alt", e.metaKey && "meta"];
      return keys.filter(Boolean);
    }

    function getArrangeCombi(keys) {
      var arrangeKeys = keys.slice();
      arrangeKeys.sort(function (prev, next) {
        var prevScore = keysSort[prev] || 5;
        var nextScore = keysSort[next] || 5;
        return prevScore - nextScore;
      });
      return arrangeKeys;
    }

    var globalKeyController;
    /**
     */

    var KeyController =
    /*#__PURE__*/
    function (_super) {
      __extends$3(KeyController, _super);
      /**
       *
       */


      function KeyController(container) {
        if (container === void 0) {
          container = window;
        }

        var _this = _super.call(this) || this;

        _this.container = container;
        /**
         */

        _this.ctrlKey = false;
        /**
         */

        _this.altKey = false;
        /**
         *
         */

        _this.shiftKey = false;
        /**
         *
         */

        _this.metaKey = false;

        _this.clear = function () {
          _this.ctrlKey = false;
          _this.altKey = false;
          _this.shiftKey = false;
          _this.metaKey = false;
          return _this;
        };

        _this.keydownEvent = function (e) {
          _this.triggerEvent("keydown", e);
        };

        _this.keyupEvent = function (e) {
          _this.triggerEvent("keyup", e);
        };

        _this.blur = function () {
          _this.clear();

          _this.trigger("blur");
        };

        addEvent$1(container, "blur", _this.blur);
        addEvent$1(container, "keydown", _this.keydownEvent);
        addEvent$1(container, "keyup", _this.keyupEvent);
        return _this;
      }

      var __proto = KeyController.prototype;
      Object.defineProperty(KeyController, "global", {
        /**
         */
        get: function () {
          return globalKeyController || (globalKeyController = new KeyController());
        },
        enumerable: false,
        configurable: true
      });

      KeyController.setGlobal = function () {
        return this.global;
      };
      /**
       *
       */


      __proto.destroy = function () {
        var container = this.container;
        this.clear();
        this.off();
        removeEvent$1(container, "blur", this.blur);
        removeEvent$1(container, "keydown", this.keydownEvent);
        removeEvent$1(container, "keyup", this.keyupEvent);
      };
      /**
       *
       */


      __proto.keydown = function (comb, callback) {
        return this.addEvent("keydown", comb, callback);
      };
      /**
       *
       */


      __proto.offKeydown = function (comb, callback) {
        return this.removeEvent("keydown", comb, callback);
      };
      /**
       *
       */


      __proto.offKeyup = function (comb, callback) {
        return this.removeEvent("keyup", comb, callback);
      };
      /**
       *
       */


      __proto.keyup = function (comb, callback) {
        return this.addEvent("keyup", comb, callback);
      };

      __proto.addEvent = function (type, comb, callback) {
        if (isArray$1(comb)) {
          this.on(type + "." + getArrangeCombi(comb).join("."), callback);
        } else if (isString$1(comb)) {
          this.on(type + "." + comb, callback);
        } else {
          this.on(type, comb);
        }

        return this;
      };

      __proto.removeEvent = function (type, comb, callback) {
        if (isArray$1(comb)) {
          this.off(type + "." + getArrangeCombi(comb).join("."), callback);
        } else if (isString$1(comb)) {
          this.off(type + "." + comb, callback);
        } else {
          this.off(type, comb);
        }

        return this;
      };

      __proto.triggerEvent = function (type, e) {
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;
        var key = getKey(e.keyCode);
        var isToggle = key === "ctrl" || key === "shift" || key === "meta" || key === "alt";
        var param = {
          key: key,
          isToggle: isToggle,
          inputEvent: e,
          keyCode: e.keyCode,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey
        };
        this.trigger(type, param);
        this.trigger(type + "." + key, param);
        var combi = getCombi(e, key);
        combi.length > 1 && this.trigger(type + "." + combi.join("."), param);
      };

      return KeyController;
    }(EventEmitter$1);

    /*
    Copyright (c) 2020 Daybrush
    name: overlap-area
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/overlap-area.git
    version: 1.0.0
    */

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
    function __spreadArrays$3() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /**
     * @namespace OverlapArea
     */

    /**
     * Gets the size of a shape (polygon) made of points.
     * @memberof OverlapArea
     */

    function getAreaSize(points) {
      if (points.length < 3) {
        return 0;
      }

      return Math.abs(sum(points.map(function (point, i) {
        var nextPoint = points[i + 1] || points[0];
        return point[0] * nextPoint[1] - nextPoint[0] * point[1];
      }))) / 2;
    }
    /**
     * Get points that fit the rect,
     * @memberof OverlapArea
     */

    function fitPoints(points, rect) {
      var width = rect.width,
          height = rect.height,
          left = rect.left,
          top = rect.top;

      var _a = getMinMaxs(points),
          minX = _a.minX,
          minY = _a.minY,
          maxX = _a.maxX,
          maxY = _a.maxY;

      var ratioX = width / (maxX - minX);
      var ratioY = height / (maxY - minY);
      return points.map(function (point) {
        return [left + (point[0] - minX) * ratioX, top + (point[1] - minY) * ratioY];
      });
    }
    /**
     * Get the minimum and maximum points of the points.
     * @memberof OverlapArea
     */

    function getMinMaxs(points) {
      var xs = points.map(function (point) {
        return point[0];
      });
      var ys = points.map(function (point) {
        return point[1];
      });
      return {
        minX: Math.min.apply(Math, xs),
        minY: Math.min.apply(Math, ys),
        maxX: Math.max.apply(Math, xs),
        maxY: Math.max.apply(Math, ys)
      };
    }
    /**
     * Whether the point is in shape
     * @param - point pos
     * @param - shape points
     * @param - whether to check except line
     * @memberof OverlapArea
     */

    function isInside(pos, points, excludeLine) {
      var x = pos[0],
          y = pos[1];

      var _a = getMinMaxs(points),
          minX = _a.minX,
          minY = _a.minY,
          maxX = _a.maxX,
          maxY = _a.maxY;

      var xLine = [[minX, y], [maxX, y]];
      var yLine = [[x, minY], [x, maxY]];
      var xLinearConstants = getLinearConstants(xLine[0], xLine[1]);
      var yLinearConstants = getLinearConstants(yLine[0], yLine[1]);
      var lines = convertLines(points);
      var intersectionXPoints = [];
      var intersectionYPoints = [];
      lines.forEach(function (line) {
        var linearConstants = getLinearConstants(line[0], line[1]);
        var xPoints = getPointsOnLines(getIntersectionPointsByConstants(xLinearConstants, linearConstants), [xLine, line]);
        var yPoints = getPointsOnLines(getIntersectionPointsByConstants(yLinearConstants, linearConstants), [yLine, line]);

        if (xPoints.length === 1 ? line[0][1] !== y : true) {
          intersectionXPoints.push.apply(intersectionXPoints, xPoints);
        }

        if (yPoints.length === 1 ? line[0][0] !== x : true) {
          intersectionYPoints.push.apply(intersectionYPoints, yPoints);
        }

        if (!linearConstants[0]) {
          intersectionXPoints.push.apply(intersectionXPoints, xPoints);
        }

        if (!linearConstants[1]) {
          intersectionYPoints.push.apply(intersectionYPoints, yPoints);
        }
      });

      if (!excludeLine) {
        if (findIndex(intersectionXPoints, function (p) {
          return p[0] === x;
        }) > -1 || findIndex(intersectionYPoints, function (p) {
          return p[1] === y;
        }) > -1) {
          return true;
        }
      }

      if (intersectionXPoints.filter(function (p) {
        return p[0] > x;
      }).length % 2 && intersectionYPoints.filter(function (p) {
        return p[1] > y;
      }).length % 2) {
        return true;
      }

      return false;
    }
    /**
     * Get the coefficient of the linear function. [a, b, c] (ax + by + c = 0)
     * @return [a, b, c]
     * @memberof OverlapArea
     */

    function getLinearConstants(point1, point2) {
      var x1 = point1[0],
          y1 = point1[1];
      var x2 = point2[0],
          y2 = point2[1]; // ax + by + c = 0

      if (x1 === x2 && y1 === y2) {
        return [0, 0, 0];
      }

      if (x1 === x2) {
        // x = x1
        return [1, 0, -x1];
      } else if (y1 === y2) {
        // y = y1
        return [0, 1, -y1];
      } else {
        // x1 + a * y1 + b = 0
        // x2 + a * y2 + b = 0
        // (x1 -x2) + (y1 - y2) * a = 0
        // a = (x2 - x1) / (y1 - y2)
        // x1 + (x2 - x1) / (y1 - y2)
        var a_1 = (x2 - x1) / (y1 - y2);
        var b_1 = -x1 - a_1 * y1;
        return [1, a_1, b_1];
      }
    }
    /**
     * Get intersection points with linear functions.
     * @memberof OverlapArea
     */

    function getIntersectionPointsByConstants(linearConstants1, linearConstants2) {
      var a1 = linearConstants1[0],
          b1 = linearConstants1[1],
          c1 = linearConstants1[2];
      var a2 = linearConstants2[0],
          b2 = linearConstants2[1],
          c2 = linearConstants2[2];
      var isZeroA = a1 === 0 && a2 === 0;
      var isZeroB = b1 === 0 && b2 === 0;

      if (isZeroA && isZeroB) {
        return [];
      } else if (isZeroA) {
        // b1 * y + c1 = 0
        // b2 * y + c2 = 0
        var y1 = -c1 / b1;
        var y2 = -c2 / b2;

        if (y1 !== y2) {
          return [];
        } else {
          return [[-Infinity, y1], [Infinity, y1]];
        }
      } else if (isZeroB) {
        // a1 * x + c1 = 0
        // a2 * x + c2 = 0
        var x1 = -c1 / a1;
        var x2 = -c2 / a2;

        if (x1 !== x2) {
          return [];
        } else {
          return [[x1, -Infinity], [x1, Infinity]];
        }
      } else if (a1 === 0) {
        // b1 * y + c1 = 0
        // y = - c1 / b1;
        // a2 * x + b2 * y + c2 = 0
        var y = -c1 / b1;
        var x = -(b2 * y + c2) / a2;
        return [[x, y]];
      } else if (a2 === 0) {
        // b2 * y + c2 = 0
        // y = - c2 / b2;
        // a1 * x + b1 * y + c1 = 0
        var y = -c2 / b2;
        var x = -(b1 * y + c1) / a1;
        return [[x, y]];
      } else if (b1 === 0) {
        // a1 * x + c1 = 0
        // x = - c1 / a1;
        // a2 * x + b2 * y + c2 = 0
        var x = -c1 / a1;
        var y = -(a2 * x + c2) / b2;
        return [[x, y]];
      } else if (b2 === 0) {
        // a2 * x + c2 = 0
        // x = - c2 / a2;
        // a1 * x + b1 * y + c1 = 0
        var x = -c2 / a2;
        var y = -(a1 * x + c1) / b1;
        return [[x, y]];
      } else {
        // a1 * x + b1 * y + c1 = 0
        // a2 * x + b2 * y + c2 = 0
        // b2 * a1 * x + b2 * b1 * y + b2 * c1 = 0
        // b1 * a2 * x + b1 * b2 * y + b1 * c2 = 0
        // (b2 * a1 - b1 * a2)  * x = (b1 * c2 - b2 * c1)
        var x = (b1 * c2 - b2 * c1) / (b2 * a1 - b1 * a2);
        var y = -(a1 * x + c1) / b1;
        return [[x, y]];
      }
    }
    /**
     * Get the points on the lines (between two points).
     * @memberof OverlapArea
     */

    function getPointsOnLines(points, lines) {
      var minMaxs = lines.map(function (line) {
        return [0, 1].map(function (order) {
          return [Math.min(line[0][order], line[1][order]), Math.max(line[0][order], line[1][order])];
        });
      });

      if (points.length === 2) {
        var _a = points[0],
            x = _a[0],
            y = _a[1];

        if (x === points[1][0]) {
          /// Math.max(minY1, minY2)
          var top = Math.max.apply(Math, minMaxs.map(function (minMax) {
            return minMax[1][0];
          })); /// Math.min(maxY1, miax2)

          var bottom = Math.min.apply(Math, minMaxs.map(function (minMax) {
            return minMax[1][1];
          }));

          if (top > bottom) {
            return [];
          }

          return [[x, top], [x, bottom]];
        } else if (y === points[1][1]) {
          /// Math.max(minY1, minY2)
          var left = Math.max.apply(Math, minMaxs.map(function (minMax) {
            return minMax[0][0];
          })); /// Math.min(maxY1, miax2)

          var right = Math.min.apply(Math, minMaxs.map(function (minMax) {
            return minMax[0][1];
          }));

          if (left > right) {
            return [];
          }

          return [[left, y], [right, y]];
        }
      }

      return points.filter(function (point) {
        return minMaxs.every(function (minMax) {
          return minMax[0][0] <= point[0] && point[0] <= minMax[0][1] && minMax[1][0] <= point[1] && point[1] <= minMax[1][1];
        });
      });
    }
    /**
    * Convert two points into lines.
    * @function
    * @memberof OverlapArea
    */

    function convertLines(points) {
      return __spreadArrays$3(points.slice(1), [points[0]]).map(function (point, i) {
        return [points[i], point];
      });
    }
    /**
    * Get the points of the overlapped part of two shapes.
    * @function
    * @memberof OverlapArea
    */

    function getOverlapPoints(points1, points2) {
      var targetPoints1 = points1.slice();
      var targetPoints2 = points2.slice();

      if (getShapeDirection(targetPoints1) === -1) {
        targetPoints1.reverse();
      }

      if (getShapeDirection(targetPoints2) === -1) {
        targetPoints2.reverse();
      }

      var lines1 = convertLines(targetPoints1);
      var lines2 = convertLines(targetPoints2);
      var linearConstantss1 = lines1.map(function (line1) {
        return getLinearConstants(line1[0], line1[1]);
      });
      var linearConstantss2 = lines2.map(function (line2) {
        return getLinearConstants(line2[0], line2[1]);
      });
      var overlapInfos = [];
      linearConstantss1.forEach(function (linearConstants1, i) {
        var line1 = lines1[i];
        var linePointInfos = [];
        linearConstantss2.forEach(function (linearConstants2, j) {
          var intersectionPoints = getIntersectionPointsByConstants(linearConstants1, linearConstants2);
          var points = getPointsOnLines(intersectionPoints, [line1, lines2[j]]);
          linePointInfos.push.apply(linePointInfos, points.map(function (pos) {
            return {
              index1: i,
              index2: j,
              pos: pos
            };
          }));
        });
        linePointInfos.sort(function (a, b) {
          return getDist(line1[0], a.pos) - getDist(line1[0], b.pos);
        });
        overlapInfos.push.apply(overlapInfos, linePointInfos);

        if (isInside(line1[1], targetPoints2)) {
          overlapInfos.push({
            index1: i,
            index2: -1,
            pos: line1[1]
          });
        }
      });
      lines2.forEach(function (line2, i) {
        if (isInside(line2[1], targetPoints1)) {
          var isNext_1 = false;
          var index = findIndex(overlapInfos, function (_a) {
            var index2 = _a.index2;

            if (index2 === i) {
              isNext_1 = true;
              return false;
            }

            if (isNext_1) {
              return true;
            }

            return false;
          });

          if (index === -1) {
            isNext_1 = false;
            index = findIndex(overlapInfos, function (_a) {
              var index1 = _a.index1,
                  index2 = _a.index2;

              if (index1 === -1 && index2 + 1 === i) {
                isNext_1 = true;
                return false;
              }

              if (isNext_1) {
                return true;
              }

              return false;
            });
          }

          if (index === -1) {
            overlapInfos.push({
              index1: -1,
              index2: i,
              pos: line2[1]
            });
          } else {
            overlapInfos.splice(index, 0, {
              index1: -1,
              index2: i,
              pos: line2[1]
            });
          }
        }
      }); // console.log(overlapInfos);

      var overlapPoints = overlapInfos.map(function (_a) {
        var pos = _a.pos;
        return pos;
      });
      var pointMap = {};
      return overlapPoints.filter(function (point) {
        var key = point[0] + "x" + point[1];

        if (pointMap[key]) {
          return false;
        }

        pointMap[key] = true;
        return true;
      });
    }

    /*
    Copyright (c) 2020 Daybrush
    name: @scena/matrix
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/matrix
    version: 1.1.1
    */

    function add(matrix, inverseMatrix, startIndex, fromIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        matrix[x] += matrix[fromX] * k;
        inverseMatrix[x] += inverseMatrix[fromX] * k;
      }
    }

    function swap(matrix, inverseMatrix, startIndex, fromIndex, n) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        var v = matrix[x];
        var iv = inverseMatrix[x];
        matrix[x] = matrix[fromX];
        matrix[fromX] = v;
        inverseMatrix[x] = inverseMatrix[fromX];
        inverseMatrix[fromX] = iv;
      }
    }

    function divide(matrix, inverseMatrix, startIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        matrix[x] /= k;
        inverseMatrix[x] /= k;
      }
    }
    /**
     * @memberof Matrix
     */

    function invert(matrix, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = matrix.slice();
      var inverseMatrix = createIdentityMatrix(n);

      for (var i = 0; i < n; ++i) {
        // diagonal
        var identityIndex = n * i + i;

        if (!throttle(newMatrix[identityIndex], TINY_NUM)) {
          // newMatrix[identityIndex] = 0;
          for (var j = i + 1; j < n; ++j) {
            if (newMatrix[n * i + j]) {
              swap(newMatrix, inverseMatrix, i, j, n);
              break;
            }
          }
        }

        if (!throttle(newMatrix[identityIndex], TINY_NUM)) {
          // no inverse matrix
          return [];
        }

        divide(newMatrix, inverseMatrix, i, n, newMatrix[identityIndex]);

        for (var j = 0; j < n; ++j) {
          var targetStartIndex = j;
          var targetIndex = j + i * n;
          var target = newMatrix[targetIndex];

          if (!throttle(target, TINY_NUM) || i === j) {
            continue;
          }

          add(newMatrix, inverseMatrix, targetStartIndex, i, n, -target);
        }
      }

      return inverseMatrix;
    }
    /**
     * @memberof Matrix
     */

    function multiply(matrix, matrix2, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = []; // 1 y: n
      // 1 x: m
      // 2 x: m
      // 2 y: k
      // n * m X m * k

      var m = matrix.length / n;
      var k = matrix2.length / m;

      if (!m) {
        return matrix2;
      } else if (!k) {
        return matrix;
      }

      for (var i = 0; i < n; ++i) {
        for (var j = 0; j < k; ++j) {
          newMatrix[j * n + i] = 0;

          for (var l = 0; l < m; ++l) {
            // m1 x: m(l), y: n(i)
            // m2 x: k(j):  y: m(l)
            // nw x: n(i), y: k(j)
            newMatrix[j * n + i] += matrix[l * n + i] * matrix2[j * m + l];
          }
        }
      } // n * k


      return newMatrix;
    }
    /**
     * @memberof Matrix
     */

    function calculate(matrix, matrix2, n) {
      if (n === void 0) {
        n = matrix2.length;
      }

      var result = multiply(matrix, matrix2, n);
      var k = result[n - 1];
      return result.map(function (v) {
        return v / k;
      });
    }
    /**
     * @memberof Matrix
     */

    function rotateX3d(matrix, rad) {
      return multiply(matrix, [1, 0, 0, 0, 0, Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function rotateY3d(matrix, rad) {
      return multiply(matrix, [Math.cos(rad), 0, -Math.sin(rad), 0, 0, 1, 0, 0, Math.sin(rad), 0, Math.cos(rad), 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function rotateZ3d(matrix, rad) {
      return multiply(matrix, createRotateMatrix(rad, 4));
    }
    /**
     * @memberof Matrix
     */

    function scale3d(matrix, _a) {
      var _b = _a[0],
          sx = _b === void 0 ? 1 : _b,
          _c = _a[1],
          sy = _c === void 0 ? 1 : _c,
          _d = _a[2],
          sz = _d === void 0 ? 1 : _d;
      return multiply(matrix, [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function translate3d(matrix, _a) {
      var _b = _a[0],
          tx = _b === void 0 ? 0 : _b,
          _c = _a[1],
          ty = _c === void 0 ? 0 : _c,
          _d = _a[2],
          tz = _d === void 0 ? 0 : _d;
      return multiply(matrix, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1], 4);
    }
    /**
     * @memberof Matrix
     */

    function matrix3d(matrix1, matrix2) {
      return multiply(matrix1, matrix2, 4);
    }
    /**
     * @memberof Matrix
     */

    function createRotateMatrix(rad, n) {
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var m = createIdentityMatrix(n); // cos -sin
      // sin cos

      m[0] = cos;
      m[1] = sin;
      m[n] = -sin;
      m[n + 1] = cos;
      return m;
    }
    /**
     * @memberof Matrix
     */

    function createIdentityMatrix(n) {
      var length = n * n;
      var matrix = [];

      for (var i = 0; i < length; ++i) {
        matrix[i] = i % (n + 1) ? 0 : 1;
      }

      return matrix;
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-to-mat
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-to-mat.git
    version: 1.0.3
    */

    function createMatrix() {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function parseMat(transform) {
      return toMat(parse(transform));
    }
    function calculateMatrixDist(matrix, pos) {
      var res = calculate(matrix, [pos[0], pos[1] || 0, pos[2] || 0, 1], 4);
      var w = res[3] || 1;
      return [res[0] / w, res[1] / w, res[2] / w];
    }
    function getDistElementMatrix(el, container) {
      if (container === void 0) {
        container = document.body;
      }

      var target = el;
      var matrix = createMatrix();

      while (target) {
        var transform = getComputedStyle(target).transform;
        matrix = matrix3d(parseMat(transform), matrix);

        if (target === container) {
          break;
        }

        target = target.parentElement;
      }

      matrix = invert(matrix, 4);
      matrix[12] = 0;
      matrix[13] = 0;
      matrix[14] = 0;
      return matrix;
    }
    function toMat(matrixInfos) {
      var target = createMatrix();
      matrixInfos.forEach(function (info) {
        var matrixFunction = info.matrixFunction,
            functionValue = info.functionValue;

        if (!matrixFunction) {
          return;
        }

        target = matrixFunction(target, functionValue);
      });
      return target;
    }
    function parse(transform) {
      var transforms = isArray(transform) ? transform : splitSpace(transform);
      return transforms.map(function (t) {
        var _a = splitBracket(t),
            name = _a.prefix,
            value = _a.value;

        var matrixFunction = null;
        var functionName = name;
        var functionValue = "";

        if (name === "translate" || name === "translateX" || name === "translate3d") {
          var _b = splitComma(value).map(function (v) {
            return parseFloat(v);
          }),
              posX = _b[0],
              _c = _b[1],
              posY = _c === void 0 ? 0 : _c,
              _d = _b[2],
              posZ = _d === void 0 ? 0 : _d;

          matrixFunction = translate3d;
          functionValue = [posX, posY, posZ];
        } else if (name === "translateY") {
          var posY = parseFloat(value);
          matrixFunction = translate3d;
          functionValue = [0, posY, 0];
        } else if (name === "translateZ") {
          var posZ = parseFloat(value);
          matrixFunction = translate3d;
          functionValue = [0, 0, posZ];
        } else if (name === "scale" || name === "scale3d") {
          var _e = splitComma(value).map(function (v) {
            return parseFloat(v);
          }),
              sx = _e[0],
              _f = _e[1],
              sy = _f === void 0 ? sx : _f,
              _g = _e[2],
              sz = _g === void 0 ? 1 : _g;

          matrixFunction = scale3d;
          functionValue = [sx, sy, sz];
        } else if (name === "scaleX") {
          var sx = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [sx, 1, 1];
        } else if (name === "scaleY") {
          var sy = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [1, sy, 1];
        } else if (name === "scaleZ") {
          var sz = parseFloat(value);
          matrixFunction = scale3d;
          functionValue = [1, 1, sz];
        } else if (name === "rotate" || name === "rotateZ" || name === "rotateX" || name === "rotateY") {
          var _h = splitUnit(value),
              unit = _h.unit,
              unitValue = _h.value;

          var rad = unit === "rad" ? unitValue : unitValue * Math.PI / 180;

          if (name === "rotate" || name === "rotateZ") {
            functionName = "rotateZ";
            matrixFunction = rotateZ3d;
          } else if (name === "rotateX") {
            matrixFunction = rotateX3d;
          } else if (name === "rotateY") {
            matrixFunction = rotateY3d;
          }

          functionValue = rad;
        } else if (name === "matrix3d") {
          matrixFunction = matrix3d;
          functionValue = splitComma(value).map(function (v) {
            return parseFloat(v);
          });
        } else if (name === "matrix") {
          var m = splitComma(value).map(function (v) {
            return parseFloat(v);
          });
          matrixFunction = matrix3d;
          functionValue = [m[0], m[1], 0, 0, m[2], m[3], 0, 0, 0, 0, 1, 0, m[4], m[5], 0, 1];
        } else {
          functionName = "";
        }

        return {
          name: name,
          functionName: functionName,
          value: value,
          matrixFunction: matrixFunction,
          functionValue: functionValue
        };
      });
    }

    function getClient$1(e) {
      if ("touches" in e) {
        var touch = e.touches[0] || e.changedTouches[0];
        return {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
      } else {
        return {
          clientX: e.clientX,
          clientY: e.clientY
        };
      }
    }
    function createElement(jsx, prevTarget, container) {
      var tag = jsx.tag,
          children = jsx.children,
          attributes = jsx.attributes,
          className = jsx.className,
          style = jsx.style;
      var el = prevTarget || document.createElement(tag);

      for (var name in attributes) {
        el.setAttribute(name, attributes[name]);
      }

      var elChildren = el.children;
      children.forEach(function (child, i) {
        createElement(child, elChildren[i], el);
      });

      if (className) {
        className.split(" ").forEach(function (name) {
          if (!hasClass(el, name)) {
            addClass(el, name);
          }
        });
      }

      if (style) {
        var elStyle = el.style;

        for (var name in style) {
          elStyle[name] = style[name];
        }
      }

      if (!prevTarget && container) {
        container.appendChild(el);
      }

      return el;
    }
    function h(tag, attrs) {
      var children = [];

      for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
      }

      var _a = attrs || {},
          _b = _a.className,
          className = _b === void 0 ? "" : _b,
          _c = _a.style,
          style = _c === void 0 ? {} : _c,
          attributes = __rest(_a, ["className", "style"]);

      return {
        tag: tag,
        className: className,
        style: style,
        attributes: attributes,
        children: children
      };
    }
    function diffValue(prev, cur, func) {
      if (prev !== cur) {
        func(prev, cur);
      }
    }
    function getRect(e, ratio, boundArea) {
      var _a;

      if (boundArea === void 0) {
        boundArea = e.datas.boundArea;
      }

      var _b = e.distX,
          distX = _b === void 0 ? 0 : _b,
          _c = e.distY,
          distY = _c === void 0 ? 0 : _c;
      var _d = e.datas,
          startX = _d.startX,
          startY = _d.startY;

      if (ratio > 0) {
        var nextHeight = Math.sqrt((distX * distX + distY * distY) / (1 + ratio * ratio));
        var nextWidth = ratio * nextHeight;
        distX = (distX >= 0 ? 1 : -1) * nextWidth;
        distY = (distY >= 0 ? 1 : -1) * nextHeight;
      }

      var width = Math.abs(distX);
      var height = Math.abs(distY);
      var maxWidth = distX < 0 ? startX - boundArea.left : boundArea.right - startX;
      var maxHeight = distY < 0 ? startY - boundArea.top : boundArea.bottom - startY;
      _a = calculateBoundSize([width, height], [0, 0], [maxWidth, maxHeight], !!ratio), width = _a[0], height = _a[1];
      distX = (distX >= 0 ? 1 : -1) * width;
      distY = (distY >= 0 ? 1 : -1) * height;
      var tx = Math.min(0, distX);
      var ty = Math.min(0, distY);
      var left = startX + tx;
      var top = startY + ty;
      return {
        left: left,
        top: top,
        right: left + width,
        bottom: top + height,
        width: width,
        height: height
      };
    }
    function getDefaultElementRect(el) {
      var rect = el.getBoundingClientRect();
      var left = rect.left,
          top = rect.top,
          width = rect.width,
          height = rect.height;
      return {
        pos1: [left, top],
        pos2: [left + width, top],
        pos3: [left, top + height],
        pos4: [left + width, top + height]
      };
    }
    function passTargets(beforeTargets, afterTargets) {
      var _a = diff$1(beforeTargets, afterTargets),
          list = _a.list,
          prevList = _a.prevList,
          added = _a.added,
          removed = _a.removed;

      return added.map(function (index) {
        return list[index];
      }).concat(removed.map(function (index) {
        return prevList[index];
      }));
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-styled
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-styled.git
    version: 1.0.0
    */

    function hash(str) {
      var hash = 5381,
          i    = str.length;

      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }

      /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
       * integers. Since we want the results to be always positive, convert the
       * signed int to an unsigned by doing an unsigned bitshift. */
      return hash >>> 0;
    }

    var stringHash = hash;

    function getHash(str) {
      return stringHash(str).toString(36);
    }
    function getShadowRoot(parentElement) {
      if (parentElement && parentElement.getRootNode) {
        var rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
          return rootNode;
        }
      }

      return;
    }
    function replaceStyle(className, css, options) {
      if (options.original) {
        return css;
      }

      return css.replace(/([^};{\s}][^};{]*|^\s*){/mg, function (_, selector) {
        var trimmedSelector = selector.trim();
        return (trimmedSelector ? splitComma(trimmedSelector) : [""]).map(function (subSelector) {
          var trimmedSubSelector = subSelector.trim();

          if (trimmedSubSelector.indexOf("@") === 0) {
            return trimmedSubSelector;
          } else if (trimmedSubSelector.indexOf(":global") > -1) {
            return trimmedSubSelector.replace(/\:global/g, "");
          } else if (trimmedSubSelector.indexOf(":host") > -1) {
            return "" + trimmedSubSelector.replace(/\:host/g, "." + className);
          } else if (trimmedSubSelector) {
            return "." + className + " " + trimmedSubSelector;
          } else {
            return "." + className;
          }
        }).join(", ") + " {";
      });
    }
    function injectStyle(className, css, options, shadowRoot) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-styled-id", className);

      if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
      }

      style.innerHTML = replaceStyle(className, css, options);
      (shadowRoot || document.head || document.body).appendChild(style);
      return style;
    }

    /**
     * Create an styled object that can be defined and inserted into the css.
     * @param - css styles
     */

    function styled(css) {
      var injectClassName = "rCS" + getHash(css);
      var injectCount = 0;
      var injectElement;
      return {
        className: injectClassName,
        inject: function (el, options) {
          if (options === void 0) {
            options = {};
          }

          var shadowRoot = getShadowRoot(el);
          var firstMount = injectCount === 0;
          var styleElement;

          if (shadowRoot || firstMount) {
            styleElement = injectStyle(injectClassName, css, options, shadowRoot);
          }

          if (firstMount) {
            injectElement = styleElement;
          }

          if (!shadowRoot) {
            ++injectCount;
          }

          return {
            destroy: function () {
              if (shadowRoot) {
                el.removeChild(styleElement);
                styleElement = null;
              } else {
                if (injectCount > 0) {
                  --injectCount;
                }

                if (injectCount === 0 && injectElement) {
                  injectElement.parentNode.removeChild(injectElement);
                  injectElement = null;
                }
              }
            }
          };
        }
      };
    }

    var injector = styled("\n:host {\n    position: fixed;\n    display: none;\n    border: 1px solid #4af;\n    background: rgba(68, 170, 255, 0.5);\n    z-index: 100;\n}\n:host {\n    position: absolute;\n}\n");
    /**
     * @memberof Selecto
     */

    var CLASS_NAME = "selecto-selection " + injector.className;
    var PROPERTIES = ["boundContainer", "selectableTargets", "selectByClick", "selectFromInside", "continueSelect", "toggleContinueSelect", "keyContainer", "hitRate", "scrollOptions", "checkInput", "preventDefault", "ratio", "getElementRect", "preventDragFromInside", "rootContainer", "dragCondition"];
    /**
     * @memberof Selecto
     */

    var OPTIONS = __spreadArrays([// ignore target, container,
    "dragContainer", "cspNonce"], PROPERTIES);
    var OPTION_TYPES = {
      boundContainer: null,
      target: null,
      container: null,
      dragContainer: null,
      selectableTargets: Array,
      selectByClick: Boolean,
      selectFromInside: Boolean,
      continueSelect: Boolean,
      toggleContinueSelect: Array,
      keyContainer: null,
      hitRate: Number,
      scrollOptions: Object,
      checkInput: Boolean,
      preventDefault: Boolean,
      cspNonce: String,
      ratio: Number,
      getElementRect: Function,
      preventDragFromInside: Boolean,
      rootContainer: Object,
      dragCondition: Function
    };
    /**
     * @memberof Selecto
     */

    var EVENTS = ["dragStart", "drag", "dragEnd", "selectStart", "select", "selectEnd", "keydown", "keyup", "scroll"];
    /**
     * @memberof Selecto
     */

    var METHODS = ["clickTarget", "getSelectableElements", "setSelectedTargets", "getElementPoints", "getSelectedTargets", "findSelectableTargets", "triggerDragStart"];

    /**
     * Selecto.js is a component that allows you to select elements in the drag area using the mouse or touch.
     * @sort 1
     * @extends EventEmitter
     */

    var Selecto =
    /*#__PURE__*/
    function (_super) {
      __extends(Selecto, _super);
      /**
       *
       */


      function Selecto(options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.selectedTargets = [];
        _this.dragScroll = new DragScroll();

        _this.onDragStart = function (e, clickedTarget) {
          var datas = e.datas,
              clientX = e.clientX,
              clientY = e.clientY,
              inputEvent = e.inputEvent;
          var _a = _this.options,
              continueSelect = _a.continueSelect,
              selectFromInside = _a.selectFromInside,
              selectByClick = _a.selectByClick,
              rootContainer = _a.rootContainer,
              boundContainer = _a.boundContainer,
              _b = _a.preventDragFromInside,
              preventDragFromInside = _b === void 0 ? true : _b,
              dragCondition = _a.dragCondition;

          if (dragCondition && !dragCondition(e)) {
            e.stop();
            return;
          }

          _this.findSelectableTargets(datas);

          datas.startSelectedTargets = _this.selectedTargets;
          datas.scaleMatrix = createMatrix();
          datas.containerX = 0;
          datas.containerY = 0;
          var boundArea = {
            left: -Infinity,
            top: -Infinity,
            right: Infinity,
            bottom: Infinity
          };

          if (rootContainer) {
            var containerRect = _this.container.getBoundingClientRect();

            datas.containerX = containerRect.left;
            datas.containerY = containerRect.top;
            datas.scaleMatrix = getDistElementMatrix(_this.container, rootContainer);
          }

          if (boundContainer) {
            var boundInfo = isObject(boundContainer) && "element" in boundContainer ? __assign({
              left: true,
              top: true,
              bottom: true,
              right: true
            }, boundContainer) : {
              element: boundContainer,
              left: true,
              top: true,
              bottom: true,
              right: true
            };
            var boundElement = boundInfo.element;
            var rectElement = void 0;

            if (boundElement) {
              if (isString(boundElement)) {
                rectElement = document.querySelector(boundElement);
              } else if (boundElement === true) {
                rectElement = _this.container;
              } else {
                rectElement = boundElement;
              }

              var rect = rectElement.getBoundingClientRect();

              if (boundInfo.left) {
                boundArea.left = rect.left;
              }

              if (boundInfo.top) {
                boundArea.top = rect.top;
              }

              if (boundInfo.right) {
                boundArea.right = rect.right;
              }

              if (boundInfo.bottom) {
                boundArea.bottom = rect.bottom;
              }
            }
          }

          datas.boundArea = boundArea;
          var hitRect = {
            left: clientX,
            top: clientY,
            right: clientX,
            bottom: clientY,
            width: 0,
            height: 0
          };
          var firstPassedTargets = [];

          if (!selectFromInside || selectByClick) {
            var pointTarget = clickedTarget || document.elementFromPoint(clientX, clientY);

            while (pointTarget) {
              if (datas.selectableTargets.indexOf(pointTarget) > -1) {
                break;
              }

              pointTarget = pointTarget.parentElement;
            }

            firstPassedTargets = pointTarget ? [pointTarget] : [];
          }

          var hasInsideTargets = firstPassedTargets.length > 0;
          var isPreventSelect = !selectFromInside && hasInsideTargets;

          if (isPreventSelect && !selectByClick) {
            e.stop();
            return false;
          }

          var type = inputEvent.type;
          var isTrusted = type === "mousedown" || type === "touchstart";
          /**
           * When the drag starts, the dragStart event is called.
           * Call the stop () function if you have a specific element or don't want to raise a select
           * @memberof Selecto
           * @event dragStart
           * @param {OnDragStart} - Parameters for the dragStart event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("dragStart", e => {
           *   if (e.inputEvent.target.tagName === "SPAN") {
           *     e.stop();
           *   }
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          var result = !e.isClick && isTrusted ? _this.emit("dragStart", __assign({}, e)) : true;

          if (!result) {
            e.stop();
            return false;
          }

          if (!continueSelect) {
            datas.startPassedTargets = [];
          } else {
            firstPassedTargets = passTargets(_this.selectedTargets, firstPassedTargets);
            datas.startPassedTargets = _this.selectedTargets;
          }

          _this.select(_this.selectedTargets, firstPassedTargets, hitRect, inputEvent, true);

          datas.startX = clientX;
          datas.startY = clientY;
          datas.selectFlag = false;
          datas.preventDragFromInside = false;
          var offsetPos = calculateMatrixDist(datas.scaleMatrix, [clientX - datas.containerX, clientY - datas.containerY]);
          datas.boundsArea = _this.target.style.cssText += "position: " + (rootContainer ? "absolute" : "fixed") + ";" + "left:0px;top:0px;" + ("transform: translate(" + offsetPos[0] + "px, " + offsetPos[1] + "px)");

          if (isPreventSelect && selectByClick) {
            inputEvent.preventDefault();

            if (preventDragFromInside) {
              _this.selectEnd(datas.startSelectedTargets, datas.startPassedTargets, hitRect, e);

              datas.preventDragFromInside = true;
            }
          } else {
            datas.selectFlag = true;

            if (type === "touchstart") {
              inputEvent.preventDefault();
            }

            var scrollOptions = _this.options.scrollOptions;

            if (scrollOptions && scrollOptions.container) {
              _this.dragScroll.dragStart(e, scrollOptions);
            }
          }

          return true;
        };

        _this.onDrag = function (e) {
          if (e.datas.selectFlag) {
            var scrollOptions = _this.options.scrollOptions;

            if (scrollOptions && scrollOptions.container) {
              if (_this.dragScroll.drag(e, scrollOptions)) {
                return;
              }
            }
          }

          _this.check(e);
        };

        _this.onDragEnd = function (e) {
          var datas = e.datas,
              inputEvent = e.inputEvent;
          var rect = getRect(e, _this.options.ratio);
          var selectFlag = datas.selectFlag;

          if (inputEvent && !e.isClick) {
            _this.emit("dragEnd", __assign(__assign({
              isDouble: !!e.isDouble,
              isDrag: false,
              isSelect: selectFlag
            }, e), {
              isClick: !!e.isClick,
              rect: rect
            }));
          }

          _this.target.style.cssText += "display: none;";

          if (selectFlag) {
            datas.selectFlag = false;

            _this.dragScroll.dragEnd();
          }

          if (!datas.preventDragFromInside) {
            _this.selectEnd(datas.startSelectedTargets, datas.startPassedTargets, rect, e);
          }
        };

        _this.onKeyDown = function (e) {
          if (!_this.sameCombiKey(e)) {
            return;
          }

          _this.continueSelect = true;
          /**
           * When you keydown the key you specified in toggleContinueSelect, the keydown event is called.
           * @memberof Selecto
           * @event keydown
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   toggleContinueSelect: "shift";
           *   keyContainer: window,
           * });
           *
           * selecto.on("keydown", () => {
           *   document.querySelector(".button").classList.add("selected");
           * }).on("keyup", () => {
           *   document.querySelector(".button").classList.remove("selected");
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          _this.emit("keydown", {});
        };

        _this.onKeyUp = function (e) {
          if (!_this.sameCombiKey(e, true)) {
            return;
          }

          _this.continueSelect = false;
          /**
           * When you keyup the key you specified in toggleContinueSelect, the keyup event is called.
           * @memberof Selecto
           * @event keyup
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   toggleContinueSelect: "shift";
           *   keyContainer: window,
           * });
           *
           * selecto.on("keydown", () => {
           *   document.querySelector(".button").classList.add("selected");
           * }).on("keyup", () => {
           *   document.querySelector(".button").classList.remove("selected");
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          _this.emit("keyup", {});
        };

        _this.onBlur = function () {
          if (_this.toggleContinueSelect && _this.continueSelect) {
            _this.continueSelect = false;

            _this.emit("keyup", {});
          }
        };

        _this.onDocumentSelectStart = function (e) {
          if (!_this.gesto.isFlag()) {
            return;
          }

          var dragContainer = _this.dragContainer;

          if (dragContainer === window) {
            dragContainer = document.documentElement;
          }

          var containers = dragContainer instanceof Element ? [dragContainer] : [].slice.call(dragContainer);
          var target = e.target;
          containers.some(function (container) {
            if (container === target || container.contains(target)) {
              e.preventDefault();
              return true;
            }
          });
        };

        _this.target = options.target;
        _this.container = options.container || document.body;
        _this.options = __assign({
          target: null,
          container: null,
          dragContainer: null,
          selectableTargets: [],
          selectByClick: true,
          selectFromInside: true,
          hitRate: 100,
          continueSelect: false,
          toggleContinueSelect: null,
          keyContainer: null,
          scrollOptions: undefined,
          checkInput: false,
          preventDefault: false,
          boundContainer: false,
          preventDragFromInside: true,
          dragCondition: null,
          rootContainer: null,
          getElementRect: getDefaultElementRect,
          cspNonce: "",
          ratio: 0
        }, options);

        _this.initElement();

        _this.initDragScroll();

        _this.setKeyController();

        return _this;
      }
      /**
       * You can set the currently selected targets.
       *
       */


      var __proto = Selecto.prototype;

      __proto.setSelectedTargets = function (selectedTargets) {
        this.selectedTargets = selectedTargets;
        return this;
      };
      /**
       * You can get the currently selected targets.
       */


      __proto.getSelectedTargets = function () {
        return this.selectedTargets;
      };

      __proto.setKeyContainer = function (keyContainer) {
        var _this = this;

        var options = this.options;
        diffValue(options.keyContainer, keyContainer, function () {
          options.keyContainer = keyContainer;

          _this.setKeyController();
        });
      };

      __proto.setToggleContinueSelect = function (toggleContinueSelect) {
        var _this = this;

        var options = this.options;
        diffValue(options.toggleContinueSelect, toggleContinueSelect, function () {
          options.toggleContinueSelect = toggleContinueSelect;

          _this.setKeyEvent();
        });
      };

      __proto.setPreventDefault = function (value) {
        this.gesto.options.preventDefault = value;
      };

      __proto.setCheckInput = function (value) {
        this.gesto.options.checkInput = value;
      };
      /**
       * `OnDragStart` is triggered by an external event.
       * @param - external event
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto();
       *
       * window.addEventListener("mousedown", e => {
       *   selecto.triggerDragStart(e);
       * });
       */


      __proto.triggerDragStart = function (e) {
        this.gesto.triggerDragStart(e);
        return this;
      };
      /**
       * Destroy elements, properties, and events.
       */


      __proto.destroy = function () {
        this.off();
        this.keycon && this.keycon.destroy();
        this.gesto.unset();
        this.injectResult.destroy();
        removeEvent(document, "selectstart", this.onDocumentSelectStart);
        this.keycon = null;
        this.gesto = null;
        this.injectResult = null;
        this.target = null;
        this.container = null;
        this.options = null;
      };

      __proto.getElementPoints = function (target) {
        var getElementRect = this.getElementRect || getDefaultElementRect;
        var info = getElementRect(target);
        var points = [info.pos1, info.pos2, info.pos4, info.pos3];

        if (getElementRect !== getDefaultElementRect) {
          var rect = target.getBoundingClientRect();
          return fitPoints(points, rect);
        }

        return points;
      };
      /**
       * Get all elements set in `selectableTargets`.
       */


      __proto.getSelectableElements = function () {
        var selectableElements = [];
        this.options.selectableTargets.forEach(function (target) {
          if (isObject(target)) {
            selectableElements.push(target);
          } else {
            var elements = [].slice.call(document.querySelectorAll(target));
            elements.forEach(function (el) {
              selectableElements.push(el);
            });
          }
        });
        return selectableElements;
      };
      /**
       * Find for selectableTargets again during drag event
       */


      __proto.findSelectableTargets = function (datas) {
        var _this = this;

        if (datas === void 0) {
          datas = this.gesto.getEventDatas();
        }

        var selectableTargets = this.getSelectableElements();
        var selectablePoints = selectableTargets.map(function (target) {
          return _this.getElementPoints(target);
        });
        datas.selectableTargets = selectableTargets;
        datas.selectablePoints = selectablePoints;
      };
      /**
       * External click or mouse events can be applied to the selecto.
       * @params - Extenal click or mouse event
       * @params - Specify the clicked target directly.
       */


      __proto.clickTarget = function (e, clickedTarget) {
        var _a = getClient$1(e),
            clientX = _a.clientX,
            clientY = _a.clientY;

        var dragEvent = {
          datas: {
            selectFlag: false
          },
          clientX: clientX,
          clientY: clientY,
          inputEvent: e,
          isClick: true,
          stop: function () {
            return false;
          }
        };

        if (this.onDragStart(dragEvent, clickedTarget)) {
          this.onDragEnd(dragEvent);
        }

        return this;
      };

      __proto.setKeyController = function () {
        var _a = this.options,
            keyContainer = _a.keyContainer,
            toggleContinueSelect = _a.toggleContinueSelect;

        if (this.keycon) {
          this.keycon.destroy();
          this.keycon = null;
        }

        if (toggleContinueSelect) {
          this.keycon = new KeyController(keyContainer || window);
          this.keycon.keydown(this.onKeyDown).keyup(this.onKeyUp).on("blur", this.onBlur);
        }
      };

      __proto.setKeyEvent = function () {
        var toggleContinueSelect = this.options.toggleContinueSelect;

        if (!toggleContinueSelect || this.keycon) {
          return;
        }

        this.setKeyController();
      };

      __proto.initElement = function () {
        this.target = createElement(h("div", {
          className: CLASS_NAME
        }), this.target, this.container);
        var target = this.target;
        var _a = this.options,
            dragContainer = _a.dragContainer,
            checkInput = _a.checkInput,
            preventDefault = _a.preventDefault;
        this.dragContainer = typeof dragContainer === "string" ? [].slice.call(document.querySelectorAll(dragContainer)) : this.options.dragContainer || this.target.parentNode;
        this.gesto = new Gesto(this.dragContainer, {
          checkWindowBlur: true,
          container: window,
          checkInput: checkInput,
          preventDefault: preventDefault
        }).on({
          dragStart: this.onDragStart,
          drag: this.onDrag,
          dragEnd: this.onDragEnd
        });
        addEvent(document, "selectstart", this.onDocumentSelectStart);
        this.injectResult = injector.inject(target, {
          nonce: this.options.cspNonce
        });
      };

      __proto.hitTest = function (selectRect, clientX, clientY, targets, selectablePoints) {
        var _a = this.options,
            hitRate = _a.hitRate,
            selectByClick = _a.selectByClick;
        var left = selectRect.left,
            top = selectRect.top,
            right = selectRect.right,
            bottom = selectRect.bottom;
        var rectPoints = [[left, top], [right, top], [right, bottom], [left, bottom]];
        return targets.filter(function (_, i) {
          var points = selectablePoints[i];
          var inArea = isInside([clientX, clientY], points);

          if (selectByClick && inArea) {
            return true;
          }

          var overlapPoints = getOverlapPoints(rectPoints, points);

          if (!overlapPoints.length) {
            return false;
          }

          var overlapSize = getAreaSize(overlapPoints);
          var targetSize = getAreaSize(points);
          var rate = between(Math.round(overlapSize / targetSize * 100), 0, 100);

          if (rate >= Math.min(100, hitRate)) {
            return true;
          }

          return false;
        });
      };

      __proto.initDragScroll = function () {
        var _this = this;

        this.dragScroll.on("scroll", function (_a) {
          var container = _a.container,
              direction = _a.direction;

          _this.emit("scroll", {
            container: container,
            direction: direction
          });
        }).on("move", function (_a) {
          var offsetX = _a.offsetX,
              offsetY = _a.offsetY,
              inputEvent = _a.inputEvent;
          var datas = inputEvent.datas;
          var boundArea = datas.boundArea;
          datas.startX -= offsetX;
          datas.startY -= offsetY;
          datas.selectablePoints.forEach(function (points) {
            points.forEach(function (pos) {
              pos[0] -= offsetX;
              pos[1] -= offsetY;
            });
          });
          boundArea.left -= offsetX;
          boundArea.right -= offsetX;
          boundArea.top -= offsetY;
          boundArea.bottom -= offsetY;

          _this.gesto.scrollBy(offsetX, offsetY, inputEvent.inputEvent, false);

          inputEvent.distX += offsetX;
          inputEvent.distY += offsetY;

          _this.check(inputEvent);
        });
      };

      __proto.select = function (prevSelectedTargets, selectedTargets, rect, inputEvent, isStart) {
        var _a = diff$1(prevSelectedTargets, selectedTargets),
            added = _a.added,
            removed = _a.removed,
            prevList = _a.prevList,
            list = _a.list;

        this.selectedTargets = selectedTargets;

        if (isStart) {
          /**
           * When the select(drag) starts, the selectStart event is called.
           * @memberof Selecto
           * @event selectStart
           * @param {Selecto.OnSelect} - Parameters for the selectStart event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("selectStart", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * }).on("selectEnd", e => {
           *   e.afterAdded.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.afterRemoved.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */
          this.emit("selectStart", {
            selected: selectedTargets,
            added: added.map(function (index) {
              return list[index];
            }),
            removed: removed.map(function (index) {
              return prevList[index];
            }),
            rect: rect,
            inputEvent: inputEvent
          });
        }

        if (added.length || removed.length) {
          /**
           * When the select in real time, the select event is called.
           * @memberof Selecto
           * @event select
           * @param {Selecto.OnSelect} - Parameters for the select event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */
          this.emit("select", {
            selected: selectedTargets,
            added: added.map(function (index) {
              return list[index];
            }),
            removed: removed.map(function (index) {
              return prevList[index];
            }),
            rect: rect,
            inputEvent: inputEvent
          });
        }
      };

      __proto.selectEnd = function (startSelectedTargets, startPassedTargets, rect, e) {
        var inputEvent = e.inputEvent,
            isDouble = e.isDouble;

        var _a = diff$1(startSelectedTargets, this.selectedTargets),
            added = _a.added,
            removed = _a.removed,
            prevList = _a.prevList,
            list = _a.list;

        var _b = diff$1(startPassedTargets, this.selectedTargets),
            afterAdded = _b.added,
            afterRemoved = _b.removed,
            afterPrevList = _b.prevList,
            afterList = _b.list;

        var type = inputEvent && inputEvent.type;
        var isDragStart = type === "mousedown" || type === "touchstart";
        /**
         * When the select(dragEnd or click) ends, the selectEnd event is called.
         * @memberof Selecto
         * @event selectEnd
         * @param {Selecto.OnSelectEnd} - Parameters for the selectEnd event
         * @example
         * import Selecto from "selecto";
         *
         * const selecto = new Selecto({
         *   container: document.body,
         *   selectByClick: true,
         *   selectFromInside: false,
         * });
         *
         * selecto.on("selectStart", e => {
         *   e.added.forEach(el => {
         *     el.classList.add("selected");
         *   });
         *   e.removed.forEach(el => {
         *     el.classList.remove("selected");
         *   });
         * }).on("selectEnd", e => {
         *   e.afterAdded.forEach(el => {
         *     el.classList.add("selected");
         *   });
         *   e.afterRemoved.forEach(el => {
         *     el.classList.remove("selected");
         *   });
         * });
         */

        this.emit("selectEnd", {
          selected: this.selectedTargets,
          added: added.map(function (index) {
            return list[index];
          }),
          removed: removed.map(function (index) {
            return prevList[index];
          }),
          afterAdded: afterAdded.map(function (index) {
            return afterList[index];
          }),
          afterRemoved: afterRemoved.map(function (index) {
            return afterPrevList[index];
          }),
          isDragStart: isDragStart,
          isClick: !!e.isClick,
          isDouble: !!isDouble,
          rect: rect,
          inputEvent: inputEvent
        });
      };

      __proto.check = function (e, rect) {
        if (rect === void 0) {
          rect = getRect(e, this.options.ratio);
        }

        var datas = e.datas,
            inputEvent = e.inputEvent;
        var top = rect.top,
            left = rect.left,
            width = rect.width,
            height = rect.height;
        var selectFlag = datas.selectFlag;
        var containerX = datas.containerX,
            containerY = datas.containerY,
            scaleMatrix = datas.scaleMatrix;
        var offsetPos = calculateMatrixDist(scaleMatrix, [left - containerX, top - containerY]);
        var offsetSize = calculateMatrixDist(scaleMatrix, [width, height]);
        var prevSelectedTargets = [];
        var selectedTargets = [];

        if (selectFlag) {
          this.target.style.cssText += "display: block;" + "left:0px;top:0px;" + ("transform: translate(" + offsetPos[0] + "px, " + offsetPos[1] + "px);") + ("width:" + offsetSize[0] + "px;height:" + offsetSize[1] + "px;");
          var passedTargets = this.hitTest(rect, datas.startX, datas.startY, datas.selectableTargets, datas.selectablePoints);
          prevSelectedTargets = this.selectedTargets;
          selectedTargets = passTargets(datas.startPassedTargets, passedTargets);
          this.selectedTargets = selectedTargets;
        }
        /**
         * When the drag, the drag event is called.
         * Call the stop () function if you have a specific element or don't want to raise a select
         * @memberof Selecto
         * @event drag
         * @param {OnDrag} - Parameters for the drag event
         * @example
         * import Selecto from "selecto";
         *
         * const selecto = new Selecto({
         *   container: document.body,
         *   selectByClick: true,
         *   selectFromInside: false,
         * });
         *
         * selecto.on("drag", e => {
         *   e.stop();
         * }).on("select", e => {
         *   e.added.forEach(el => {
         *     el.classList.add("selected");
         *   });
         *   e.removed.forEach(el => {
         *     el.classList.remove("selected");
         *   });
         * });
         */


        var result = this.emit("drag", __assign(__assign({}, e), {
          isSelect: selectFlag,
          rect: rect
        }));

        if (result === false) {
          this.target.style.cssText += "display: none;";
          e.stop();
          return;
        }

        if (selectFlag) {
          this.select(prevSelectedTargets, selectedTargets, rect, inputEvent);
        }
      };

      __proto.sameCombiKey = function (e, isKeyup) {
        var toggleContinueSelect = [].concat(this.options.toggleContinueSelect);
        var combi = getCombi(e.inputEvent, e.key);
        var toggleKeys = isArray(toggleContinueSelect[0]) ? toggleContinueSelect : [toggleContinueSelect];

        if (isKeyup) {
          var singleKey_1 = e.key;
          return toggleKeys.some(function (keys) {
            return keys.some(function (key) {
              return key === singleKey_1;
            });
          });
        }

        return toggleKeys.some(function (keys) {
          return keys.every(function (key) {
            return combi.indexOf(key) > -1;
          });
        });
      };

      Selecto = __decorate([Properties(PROPERTIES, function (prototype, property) {
        var attributes = {
          enumerable: true,
          configurable: true,
          get: function () {
            return this.options[property];
          }
        };
        var setter = camelize("set " + property);

        if (prototype[setter]) {
          attributes.set = function set(value) {
            this[setter](value);
          };
        } else {
          attributes.set = function set(value) {
            this.options[property] = value;
          };
        }

        Object.defineProperty(prototype, property, attributes);
      })], Selecto);
      return Selecto;
    }(EventEmitter);

    var Selecto$1 =
    /*#__PURE__*/
    function (_super) {
      __extends(Selecto, _super);

      function Selecto() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      return Selecto;
    }(Selecto);



    var modules = ({
        __proto__: null,
        'default': Selecto$1,
        OPTIONS: OPTIONS,
        OPTION_TYPES: OPTION_TYPES,
        PROPERTIES: PROPERTIES,
        EVENTS: EVENTS,
        METHODS: METHODS,
        CLASS_NAME: CLASS_NAME
    });

    for (var name in modules) {
      Selecto$1[name] = modules[name];
    }

    return Selecto$1;

})));
//# sourceMappingURL=selecto.js.map
