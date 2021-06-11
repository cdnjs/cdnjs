/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/infinitegrid
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-infinitegrid
version: 3.8.4
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.eg = global.eg || {}, global.eg.InfiniteGrid = factory());
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

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 2.2.2
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
    function __values$1(o) {
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
    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */


    function isUndefined(value) {
      return typeof value === "undefined";
    }
    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     * @alias eg.Component
     */


    var Component =
    /*#__PURE__*/
    function () {
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        /**
         * @deprecated
         * @private
         */
        this.options = {};
        this._eventHandler = {};
      }
      /**
       * Triggers a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
       * @param {object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @param {any[]} restParam Additional parameters when triggering a custom event <ko>커스텀 이벤트가 발생할 때 필요시 추가적으로 전달할 데이터</ko>
       * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", (e) => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       * });
       * some.on("hi", (e) => {
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */


      var __proto = Component.prototype;

      __proto.trigger = function (eventName) {
        var _this = this;

        var params = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }

        var handlerList = this._eventHandler[eventName] || [];
        var hasHandlerList = handlerList.length > 0;

        if (!hasHandlerList) {
          return true;
        }

        var customEvent = params[0] || {};
        var restParams = params.slice(1); // If detach method call in handler in first time then handler list calls.

        handlerList = handlerList.concat();
        var isCanceled = false; // This should be done like this to pass previous tests

        customEvent.eventType = eventName;

        customEvent.stop = function () {
          isCanceled = true;
        };

        customEvent.currentTarget = this;
        var arg = [customEvent];

        if (restParams.length >= 1) {
          arg = arg.concat(restParams);
        }

        handlerList.forEach(function (handler) {
          handler.apply(_this, arg);
        });
        return !isCanceled;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       * hi() {
       *   alert("hi");
       * }
       * thing() {
       *   this.once("hi", this.hi);
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger("hi");
       * // fire alert("hi");
       * some.trigger("hi");
       * // Nothing happens
       * ```
       */


      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;

        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            handlerToAttach.apply(_this, args);

            _this.off(eventName, listener_1);
          };

          this.on(eventName, listener_1);
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */


      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */


      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var name in eventHash) {
            this.on(name, eventHash[name]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];

          if (isUndefined(handlerList)) {
            this._eventHandler[eventName] = [];
            handlerList = this._eventHandler[eventName];
          }

          handlerList.push(handlerToAttach);
        }

        return this;
      };
      /**
       * Detaches an event from the component.
       * @ko 컴포넌트에 등록된 이벤트를 해제한다
       * @param {string} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */


      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a; // Detach all event handlers.


        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        } // Detach all handlers for eventname or detach event handlers by object.


        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;

            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // Detach single event handler


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var idx = 0;

          try {
            for (var handlerList_1 = __values$1(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;

              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);
                break;
              }

              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }

        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * eg.Component.VERSION;  // ex) 2.0.0
       * @memberof eg.Component
       */


      Component.VERSION = "2.2.2";
      return Component;
    }();

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
    var document$1 = win.document;

    var _a;
    var ua = win.navigator.userAgent;
    var SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in win);
    var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in document$1);
    var SUPPORT_PASSIVE = function () {
      var supportsPassiveOption = false;

      try {
        if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
          // tslint:disable-next-line: no-empty
          document$1.addEventListener("test", function () {}, Object.defineProperty({}, "passive", {
            get: function () {
              supportsPassiveOption = true;
            }
          }));
        }
      } catch (e) {//
      }

      return supportsPassiveOption;
    }();
    var IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
    var IS_IOS = /iPhone|iPad/.test(ua);
    var IS_ANDROID2 = /Android 2\./.test(ua);
    var CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";
    var IGNORE_CLASSNAME = "_eg-infinitegrid-ignore_";
    var TRANSITION_NAME = "_INFINITEGRID_TRANSITION";
    var VERTICAL = "vertical";
    var HORIZONTAL = "horizontal";
    var DUMMY_POSITION = -100000;
    var GROUPKEY_ATT = "data-groupkey";
    var DEFAULT_OPTIONS = {
      itemSelector: "*",
      isOverflowScroll: false,
      threshold: 100,
      isEqualSize: false,
      isConstantSize: false,
      useRecycle: true,
      horizontal: false,
      transitionDuration: 0,
      useFit: true,
      attributePrefix: "data-",
      renderExternal: false,
      resizeDebounce: 100,
      maxResizeDebounce: 0,
      percentage: false
    };
    var DEFAULT_LAYOUT_OPTIONS = {
      horizontal: false,
      margin: 0
    };
    var agent = ua.toLowerCase();
    var isMobile = /mobi|ios|android/.test(agent);
    var IDLE = 0;
    var LOADING_APPEND = 1;
    var LOADING_PREPEND = 2;
    var PROCESSING = 4;
    var webkit = /applewebkit\/([\d|.]*)/g.exec(agent);
    var WEBKIT_VERSION = webkit && parseInt(webkit[1], 10) || 0;
    var DEFENSE_BROWSER = WEBKIT_VERSION && WEBKIT_VERSION < 537;
    var ITEM_KEYS = ["content", "groupKey", "itemKey", "orgSize", "mounted", "prevRect", "rect", "size"];
    var TRANSFORM = (_a = function () {
      var properties = {
        transitionend: "",
        webkitTransitionEnd: "-webkit-",
        MSTransitionEnd: "-ms-",
        oTransitionEnd: "-o-",
        mozTransitionEnd: "-moz-"
      };

      for (var property in properties) {
        var prefix = properties[property];

        if ("on" + property.toLowerCase() in win) {
          return [prefix + "transform", prefix + "transition", property];
        }
      }

      return [];
    }(), _a[0]),
        TRANSITION = _a[1],
        TRANSITION_END = _a[2];

    function toArray(nodes) {
      // SCRIPT5014 in IE8
      var array = [];

      if (nodes) {
        var length = nodes.length;

        for (var i = 0; i < length; i++) {
          array.push(nodes[i]);
        }
      }

      return array;
    }
    function matchHTML(html) {
      return html.match(/^<([A-z]+)\s*([^>]*)>/);
    }
    function $(param, multi) {
      if (multi === void 0) {
        multi = false;
      }

      var el;

      if (typeof param === "string") {
        // String (HTML, Selector)
        // check if string is HTML tag format
        var match = matchHTML(param); // creating element

        if (match) {
          // HTML
          var dummy = document$1.createElement("div");
          dummy.innerHTML = param;
          el = dummy.childNodes;
        } else {
          // Selector
          el = document$1.querySelectorAll(param);
        }

        if (multi) {
          return toArray(el);
        } else {
          return el && el[0];
        }
      } else if (isWindow(param)) {
        // window
        el = param;
      } else if (isJQuery(param)) {
        // jQuery
        el = multi ? $(param.toArray(), true) : $(param.get(0), false);
      } else if (Array.isArray(param)) {
        el = param.map(function (v) {
          return $(v);
        });

        if (!multi) {
          el = el.length >= 1 ? el[0] : undefined;
        }
      } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
        // HTMLElement, Document
        el = param;
      } else {
        el = [].slice.call(el);
      }

      return el;
    }
    function addEvent(element, type, handler, eventListenerOptions) {
      if (SUPPORT_ADDEVENTLISTENER) {
        var options = eventListenerOptions || false;

        if (typeof eventListenerOptions === "object") {
          options = SUPPORT_PASSIVE ? eventListenerOptions : false;
        }

        element.addEventListener(type, handler, options);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }
    function removeEvent(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    }
    function addOnceEvent(element, type, handler, eventListenerOptions) {
      var callback = function (e) {
        removeEvent(element, type, callback);
        handler(e);
      };

      addEvent(element, type, callback, eventListenerOptions);
    }
    function scroll(el, horizontal) {
      if (horizontal === void 0) {
        horizontal = false;
      }

      var prop = "scroll" + (horizontal ? "Left" : "Top");

      if (isWindow(el)) {
        return win[horizontal ? "pageXOffset" : "pageYOffset"] || document$1.body[prop] || document$1.documentElement[prop];
      } else {
        return el[prop];
      }
    }
    function scrollTo(el, x, y) {
      if (isWindow(el)) {
        el.scroll(x, y);
      } else {
        el.scrollLeft = x;
        el.scrollTop = y;
      }
    }
    function scrollBy(el, x, y) {
      if (isWindow(el)) {
        el.scrollBy(x, y);
      } else {
        el.scrollLeft += x;
        el.scrollTop += y;
      }
    }
    function getStyle(el) {
      return (SUPPORT_COMPUTEDSTYLE ? win.getComputedStyle(el) : el.currentStyle) || {};
    }

    function _getSize(el, name, isOffset) {
      if (isWindow(el)) {
        // WINDOW
        return win["inner" + name] || document$1.body["client" + name];
      } else if (isDocument(el)) {
        // DOCUMENT_NODE
        var doc = el.documentElement;
        var body = el.body;
        return Math.max(body["scroll" + name], doc["scroll" + name], body["offset" + name], doc["offset" + name], doc["client" + name]);
      } else {
        // NODE
        var size = 0;

        if (isOffset) {
          var clientRect = el.getBoundingClientRect();
          size = name === "Width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top;
        } else {
          size = el["client" + name] || el["offset" + name];
        }

        if (size) {
          return size;
        }

        var cssSize = getStyle(el)[name.toLowerCase()];
        return ~cssSize.indexOf("px") && parseFloat(cssSize) || 0;
      }
    }

    function innerWidth(el) {
      return _getSize(el, "Width", false);
    }
    function innerHeight(el) {
      return _getSize(el, "Height", false);
    }
    function outerWidth(el) {
      return _getSize(el, "Width", true);
    }
    function outerHeight(el) {
      return _getSize(el, "Height", true);
    }
    function getSize(el) {
      return {
        width: outerWidth(el),
        height: outerHeight(el)
      };
    }
    var STYLE = {
      vertical: {
        startPos1: "top",
        endPos1: "bottom",
        size1: "height",
        startPos2: "left",
        endPos2: "right",
        size2: "width"
      },
      horizontal: {
        startPos1: "left",
        endPos1: "right",
        size1: "width",
        startPos2: "top",
        endPos2: "bottom",
        size2: "height"
      }
    };
    function getStyleNames(isHorizontal) {
      return STYLE[isHorizontal ? HORIZONTAL : VERTICAL];
    }
    function assign(target) {
      var sources = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
      }

      sources.forEach(function (source) {
        for (var key in source) {
          target[key] = source[key];
        }
      });
      return target;
    }
    function assignOptions(defaultOptions, options) {
      return assign({}, DEFAULT_LAYOUT_OPTIONS, defaultOptions, options);
    }
    function toZeroArray(outline) {
      if (!outline || !outline.length) {
        return [0];
      }

      return outline;
    }
    function cloneItems(items) {
      return items.map(function (item) {
        return assign({}, item);
      });
    }
    function isJQuery(el) {
      return typeof win.jQuery === "function" && el instanceof win.jQuery || el.constructor.prototype.jquery && el.toArray;
    }
    function isWindow(el) {
      return el === win;
    }
    function isDocument(el) {
      return el.nodeType === 9;
    }
    function isUndefined$1(target) {
      return typeof target === "undefined";
    }
    function find(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i])) {
          return arr[i];
        }
      }

      return null;
    }
    function findLast(arr, callback) {
      var length = arr.length;

      for (var i = length - 1; i >= 0; --i) {
        if (callback(arr[i])) {
          return arr[i];
        }
      }

      return null;
    }
    function categorize(newItems) {
      var newGroups = [];
      var groupKeys = {};
      newItems.forEach(function (item) {
        var groupKey = item.groupKey;
        var group = groupKeys[groupKey];

        if (!group) {
          group = {
            groupKey: groupKey,
            items: []
          };
          groupKeys[groupKey] = group;
          newGroups.push(group);
        }

        group.items.push(item);
      });
      return newGroups;
    }
    function resetSize(item) {
      item.orgSize = null;
      item.size = null;
    }
    function makeItem(groupKey, el) {
      return {
        el: el,
        groupKey: groupKey,
        mounted: false,
        needUpdate: true,
        content: el ? el.outerHTML : "",
        rect: {
          top: DUMMY_POSITION,
          left: DUMMY_POSITION
        }
      };
    }
    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }

    var ItemManager =
    /*#__PURE__*/
    function () {
      function ItemManager() {
        // groups
        this._groups = []; // group keys

        this._groupKeys = {};
      }

      var __proto = ItemManager.prototype;

      ItemManager.toItems = function (elements, groupKey) {
        return elements.map(function (el) {
          return makeItem(groupKey, el);
        });
      };

      ItemManager.pluck = function (data, property) {
        return data.reduce(function (acc, v) {
          return acc.concat(v[property]);
        }, []);
      };

      __proto.clear = function () {
        this._groups = [];
        this._groupKeys = {};
      };

      __proto.getStatus = function (startKey, endKey) {
        var datas = this._groups;
        var startIndex = Math.max(this.indexOf(startKey), 0);
        var endIndex = this.indexOf(endKey) + 1 || datas.length;
        return {
          _data: datas.slice(startIndex, endIndex).map(function (data) {
            var items = data.items.map(function (item) {
              var item2 = {};
              ITEM_KEYS.forEach(function (key) {
                if (key in item) {
                  item2[key] = item[key];
                }
              });
              return item2;
            });
            var data2 = assign({}, data);
            data2.items = items;
            return data2;
          })
        };
      };

      __proto.setStatus = function (status) {
        var _this = this;

        var data = status._data;
        this.clear();
        data.forEach(function (group, i) {
          _this.insertGroup(group, i);
        });
      };

      __proto.size = function () {
        return this._groups.length;
      };

      __proto.fit = function (base, horizontal) {
        var groups = this._groups;

        if (!groups.length) {
          return;
        }

        var property = horizontal ? "left" : "top";

        if (base !== 0) {
          groups.forEach(function (group) {
            var items = group.items,
                outlines = group.outlines;
            items.forEach(function (item) {
              item.rect[property] -= base;
            });
            outlines.start = outlines.start.map(function (start) {
              return start - base;
            });
            outlines.end = outlines.end.map(function (end) {
              return end - base;
            });
          });
        }
      };

      __proto.pluck = function (property, start, end) {
        var data = isUndefined$1(start) ? this._groups : this.sliceGroups(start, (isUndefined$1(end) ? start : end) + 1);
        return ItemManager.pluck(data, property);
      };

      __proto.getOutline = function (index, property) {
        var data = this._groups[index];
        return data ? data.outlines[property] : [];
      };

      __proto.getEdgeIndex = function (cursor, start, end) {
        var prop = cursor === "start" ? "min" : "max";
        var index = -1;
        var targetValue = cursor === "start" ? Infinity : -Infinity;

        for (var i = start; i <= end; i++) {
          var value = Math[prop].apply(Math, this.getOutline(i, cursor));

          if (cursor === "start" && targetValue > value || cursor === "end" && targetValue < value) {
            targetValue = value;
            index = i;
          }
        }

        return index;
      };

      __proto.getEdgeValue = function (cursor, start, end) {
        var group = this.getGroup(this.getEdgeIndex(cursor, start, end));

        if (group) {
          var outlines = group.outlines[cursor];

          if (outlines.length) {
            return Math[cursor === "start" ? "min" : "max"].apply(Math, outlines);
          }
        }

        return 0;
      };

      __proto.clearOutlines = function (startCursor, endCursor) {
        if (startCursor === void 0) {
          startCursor = -1;
        }

        if (endCursor === void 0) {
          endCursor = -1;
        }

        var datas = this.getGroups();
        datas.forEach(function (group, cursor) {
          if (startCursor <= cursor && cursor <= endCursor) {
            return;
          }

          group.items.forEach(function (item) {
            item.rect.top = DUMMY_POSITION;
            item.rect.left = DUMMY_POSITION;
          });
          group.outlines.start = [];
          group.outlines.end = [];
        });
      };

      __proto.getMaxEdgeValue = function () {
        var groups = this._groups;
        var length = groups.length;

        for (var i = length - 1; i >= 0; --i) {
          var end = groups[i].outlines.end;

          if (end.length) {
            var pos = Math.max.apply(Math, end);
            return pos;
          }
        }

        return 0;
      };

      __proto.prependGroup = function (group) {
        return this.insertGroup(group, 0);
      };

      __proto.appendGroup = function (group) {
        return this.insertGroup(group, this._groups.length);
      };

      __proto.insertGroup = function (group, groupIndex) {
        var _this = this;

        if (groupIndex < 0) {
          return this.appendGroup(group);
        }

        var prevItems = group.items || [];

        var newGroup = __assign(__assign({
          outlines: {
            start: [],
            end: []
          }
        }, group), {
          items: [],
          needUpdate: true
        });

        this._groups.splice(groupIndex, 0, newGroup);

        this._groupKeys[newGroup.groupKey] = newGroup;
        prevItems.forEach(function (item, i) {
          _this.insert(item, groupIndex, i);
        });
        return newGroup;
      };

      __proto.sync = function (items) {
        var _this = this;

        var groups = this._groups;
        var groupKeys = this._groupKeys;
        var newGroups = categorize(items);
        var result = diff(groups, newGroups, function (group) {
          return group.groupKey;
        });
        var removed = result.removed,
            added = result.added,
            maintained = result.maintained;
        removed.forEach(function (removedIndex) {
          var group = groups[removedIndex];

          if (!group) {
            return;
          }

          delete groupKeys[group.groupKey];
        });
        var nextGroups = [];
        maintained.forEach(function (_a) {
          var fromIndex = _a[0];
          nextGroups.push(groups[fromIndex]);
        });
        this._groups = nextGroups;
        added.forEach(function (addedIndex) {
          _this.insertGroup(newGroups[addedIndex], addedIndex);
        });
        maintained.reverse().forEach(function (_a) {
          var toIndex = _a[1];

          _this.syncItems(toIndex, newGroups[toIndex].items);
        });
        return result;
      };

      __proto.insert = function (newItem, groupIndex, itemIndex) {
        if (groupIndex === void 0) {
          groupIndex = -1;
        }

        if (itemIndex === void 0) {
          itemIndex = -1;
        }

        var groupKey = newItem.groupKey;
        var groups = this._groups;
        var groupKeys = this._groupKeys;
        var group = (groupIndex > -1 ? groups[groupIndex] : groupKeys[groupKey]) || this.insertGroup({
          groupKey: groupKey
        }, groupIndex);

        if (!group) {
          return null;
        }

        group.needUpdate = true;

        var groupItem = __assign({
          content: "",
          mounted: false,
          needUpdate: true,
          rect: {
            top: DUMMY_POSITION,
            left: DUMMY_POSITION
          }
        }, newItem);

        var groupItems = group.items;

        if (itemIndex === -1) {
          groupItems.push(groupItem);
        } else {
          groupItems.splice(itemIndex, 0, groupItem);
        }

        return groupItem;
      };

      __proto.removeGroup = function (groupIndex) {
        var group = this._groups.splice(groupIndex, 1)[0];

        if (!group) {
          return null;
        }

        delete this._groupKeys[group.groupKey];
        return group;
      };

      __proto.remove = function (groupIndex, itemIndex) {
        var data = this.getGroup(groupIndex);
        var group = null;
        var items = [];

        if (!data) {
          return {
            items: items,
            group: group
          };
        }

        data.needUpdate = true; // remove item information

        items = data.items.splice(itemIndex, 1);

        if (!data.items.length) {
          group = this.removeGroup(groupIndex);
        }

        return {
          items: items,
          group: group
        };
      };

      __proto.indexOf = function (data) {
        if (typeof data === "undefined") {
          return -1;
        }

        var groupKey = "" + (typeof data === "object" ? data.groupKey : data);
        var datas = this._groups;
        var length = datas.length;

        for (var i = 0; i < length; ++i) {
          if (groupKey === "" + datas[i].groupKey) {
            return i;
          }
        }

        return -1;
      };

      __proto.indexesOfElement = function (element) {
        var groupKey = element.getAttribute(GROUPKEY_ATT);
        var groupIndex = this.indexOf({
          groupKey: groupKey
        });
        var itemIndex = -1;

        if (groupIndex > -1) {
          var data = this.getGroup(groupIndex);
          var length = data.items.length;

          for (var i = 0; i < length; i++) {
            if (data.items[i].el === element) {
              itemIndex = i;
              break;
            }
          }
        }

        return {
          groupIndex: groupIndex,
          itemIndex: itemIndex
        };
      };

      __proto.sliceGroups = function (start, end) {
        return this._groups.slice(start, end);
      };

      __proto.getGroups = function () {
        return this._groups;
      };

      __proto.getGroupByKey = function (key) {
        return this._groupKeys[key];
      };

      __proto.getGroup = function (index) {
        return this._groups[index];
      };

      __proto.syncItems = function (groupIndex, newItems) {
        var _this = this;

        if (!newItems.length) {
          this.removeGroup(groupIndex);
          return;
        }

        var items = this.getGroup(groupIndex).items;

        var _a = diff(items, newItems, function (item) {
          return item.itemKey;
        }),
            added = _a.added,
            maintained = _a.maintained,
            changed = _a.changed,
            removed = _a.removed;

        var group = this._groups[groupIndex];
        var nextItems = [];
        maintained.forEach(function (_a) {
          var fromIndex = _a[0],
              nextIndex = _a[1];
          var item = items[fromIndex];
          var newItem = newItems[nextIndex];
          assign(item, newItem);
          nextItems.push(item);
        });
        group.items = nextItems;

        if (changed.length || removed.length) {
          group.needUpdate = true;
        }

        added.forEach(function (addedIndex) {
          _this.insert(newItems[addedIndex], groupIndex, addedIndex);
        });
      };

      return ItemManager;
    }();

    function removeTransition(style) {
      style[TRANSITION + "-property"] = "";
      style[TRANSITION + "-duration"] = "";
      style[TRANSFORM] = "";
    }

    function setTransition(style, transitionDuration, pos1, pos2) {
      if (!transitionDuration) {
        removeTransition(style);
        return false;
      }

      if (pos1.left === pos2.left && pos1.top === pos2.top) {
        return false;
      }

      style[TRANSITION + "-property"] = TRANSFORM + ",width,height";
      style[TRANSITION + "-duration"] = transitionDuration + "s";
      style[TRANSFORM] = "translate(" + (pos1.left - pos2.left) + "px," + (pos1.top - pos2.top) + "px)";
      return true;
    }

    function createContainer(element) {
      var selectContainer = element.querySelector("." + CONTAINER_CLASSNAME);

      if (selectContainer) {
        selectContainer.style.position = "relative";
        selectContainer.style.height = "100%";
        return selectContainer;
      }

      var container = document$1.createElement("div");
      container.className = CONTAINER_CLASSNAME;
      container.style.position = "relative";
      container.style.height = "100%";
      var children = element.children;
      var length = children.length; // for IE8

      for (var i = 0; i < length; i++) {
        container.appendChild(children[0]);
      }

      element.appendChild(container);
      return container;
    }

    var DOMRenderer =
    /*#__PURE__*/
    function () {
      function DOMRenderer(element, options) {
        this.options = {
          isEqualSize: false,
          isConstantSize: false,
          horizontal: false,
          container: false,
          percentage: false
        };
        this._size = {
          container: -1,
          view: -1,
          viewport: -1,
          item: null
        };
        this._orgStyle = {};
        this._isSizePercentage = false;
        this._isPosPercentage = false;
        assign(this.options, options);

        this._init(element);

        this.resize();
      }

      var __proto = DOMRenderer.prototype;

      DOMRenderer.removeItems = function (items) {
        items.forEach(function (item) {
          if (item.el) {
            DOMRenderer.removeElement(item.el);
            item.el = null;
          }
        });
      };

      DOMRenderer.removeElement = function (element) {
        var parentNode = element && element.parentNode;

        if (!parentNode) {
          return;
        }

        parentNode.removeChild(element);
      };

      DOMRenderer.createElements = function (items) {
        if (!items.length) {
          return;
        }

        var noElementItems = items.filter(function (item) {
          return !item.el;
        });

        if (!noElementItems.length) {
          return;
        }

        var elements = $(noElementItems.map(function (_a) {
          var content = _a.content;
          return content.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
        }).join(""), true);
        noElementItems.forEach(function (item, index) {
          item.el = elements[index];
        });
      };

      __proto.getStatus = function () {
        return {
          cssText: this.container.style.cssText,
          _size: assign({}, this._size)
        };
      };

      __proto.setStatus = function (status) {
        this.container.style.cssText = status.cssText;
        assign(this._size, status._size);
      };

      __proto.updateSize = function (items) {
        var _a = this.options,
            isEqualSize = _a.isEqualSize,
            isConstantSize = _a.isConstantSize;
        var size = this._size;
        return items.map(function (item) {
          if (!item.el) {
            return item;
          }

          if (isEqualSize && !size.item) {
            size.item = getSize(item.el);
          }

          item.size = isEqualSize && assign({}, size.item) || isConstantSize && item.orgSize && item.orgSize.width && assign({}, item.orgSize) || getSize(item.el);

          if (!item.orgSize || !item.orgSize.width || !item.orgSize.height) {
            item.orgSize = assign({}, item.size);
          }

          return item;
        });
      };

      __proto.createAndInsert = function (items, isAppend) {
        DOMRenderer.createElements(items);
        this.renderItems(items);

        this._insert(items, isAppend);
      };

      __proto.renderItems = function (items, transitionDuration) {
        var _this = this;

        items.forEach(function (item) {
          _this.renderItem(item, item.rect, transitionDuration);
        });
      };

      __proto.renderItem = function (item, rect, transitionDuration) {
        var _this = this;

        if (!item.el) {
          return;
        }

        var el = item.el,
            prevRect = item.prevRect;
        var style = el.style;
        el.setAttribute(GROUPKEY_ATT, "" + item.groupKey);
        style.position = "absolute";

        this._render(["width", "height"], rect, style);

        if (transitionDuration && TRANSITION && prevRect) {
          setTransition(style, transitionDuration, rect, prevRect);

          if (el[TRANSITION_NAME]) {
            return;
          }

          el[TRANSITION_NAME] = true;
          addOnceEvent(el, TRANSITION_END, function () {
            var itemRect = item.rect;
            removeTransition(style);

            _this._render(["left", "top"], itemRect, style);

            item.prevRect = itemRect;
            el[TRANSITION_NAME] = false;
          });
        } else {
          this._render(["left", "top"], rect, style);

          item.prevRect = rect;
        }
      };

      __proto.getViewSize = function () {
        return this._size.view;
      };

      __proto.getViewportSize = function () {
        return this._size.viewport;
      };

      __proto.getContainerSize = function () {
        return this._size.container;
      };

      __proto.setContainerSize = function (size) {
        this._size.container = size;
        this.container.style[this.options.horizontal ? "width" : "height"] = size + "px";
      };

      __proto.resize = function () {
        var horizontal = this.options.horizontal;
        var view = this.view;

        var size = this._calcSize();

        if (size === 0) {
          return;
        }

        var isResize = size !== this._size.viewport;

        if (isResize) {
          this._size = {
            view: -1,
            container: -1,
            viewport: size,
            item: null
          };
        }

        this._size.view = horizontal ? innerWidth(view) : innerHeight(view);
        return isResize;
      };

      __proto.isNeededResize = function () {
        return this._calcSize() !== this._size.viewport;
      };

      __proto.clear = function () {
        this.container.innerHTML = "";
        this.container.style[this.options.horizontal ? "width" : "height"] = "";
        this._size = {
          item: null,
          viewport: -1,
          container: -1,
          view: -1
        };
      };

      __proto.destroy = function () {
        this.clear();
        var container = this.options.container;
        var property;

        for (property in this._orgStyle) {
          this[container ? "view" : "container"].style[property] = this._orgStyle[property];
        }

        if (container === true) {
          this.container.parentNode.removeChild(this.container);
        }
      };

      __proto._init = function (el) {
        var element = $(el);
        var style = getStyle(element);
        var _a = this.options,
            container = _a.container,
            horizontal = _a.horizontal,
            percentage = _a.percentage;

        if (percentage) {
          this._isSizePercentage = percentage === true || percentage.indexOf("size") > -1;
          this._isPosPercentage = percentage === true || percentage.indexOf("position") > -1;
        }

        if (style.position === "static") {
          this._orgStyle.position = element.style.position;
          element.style.position = "relative";
        }

        if (container) {
          var target = horizontal ? ["X", "Y"] : ["Y", "X"];
          this._orgStyle.overflowX = element.style.overflowX;
          this._orgStyle.overflowY = element.style.overflowY;
          element.style["overflow" + target[0]] = "scroll";
          element.style["overflow" + target[1]] = "hidden";
          this.view = element;
          this.container = container === true ? createContainer(this.view) : container;
        } else {
          this.view = win;
          this.container = element;
        }
      };

      __proto._insert = function (items, isAppend, style) {
        var _this = this;

        var container = this.container;
        var df = document$1.createDocumentFragment();
        items.forEach(function (item) {
          style && _this.renderItem(item, style);
          isAppend ? df.appendChild(item.el) : df.insertBefore(item.el, df.firstChild);
        });
        isAppend ? container.appendChild(df) : container.insertBefore(df, container.firstChild);
      };

      __proto._calcSize = function () {
        return this.options.horizontal ? innerHeight(this.container) : innerWidth(this.container);
      };

      __proto._render = function (properties, rect, style) {
        var isSizePercentage = this._isSizePercentage;
        var isPosPercentage = this._isPosPercentage;
        var viewportSize = this.getViewportSize();
        var horizontal = this.options.horizontal;
        properties.forEach(function (p) {
          if (!(p in rect)) {
            return;
          }

          var isHorizontalPercentage = horizontal && (isSizePercentage && p === "height" || isPosPercentage && p === "top");
          var isVerticalPercentage = !horizontal && (isSizePercentage && p === "width" || isPosPercentage && p === "left");
          style[p] = isHorizontalPercentage || isVerticalPercentage ? rect[p] / viewportSize * 100 + "%" : rect[p] + "px";
        });
      };

      return DOMRenderer;
    }();

    function isVisible(group, threshold, scrollPos, endScrollPos) {
      var items = group.items,
          outlines = group.outlines;
      var start = outlines.start;
      var end = outlines.end;

      if (start.length === 0 || end.length === 0 || !items.length || !items[0].el) {
        return 2;
      }

      var min = Math.min.apply(Math, start);
      var max = Math.max.apply(Math, end);

      if (endScrollPos + threshold < min) {
        return +1;
      } else if (scrollPos - threshold > max) {
        return -1;
      }

      return 0;
    }

    var Infinite =
    /*#__PURE__*/
    function () {
      function Infinite(itemManger, options) {
        this.options = assign({
          useRecycle: true,
          threshold: 100,
          append: function () {
            return void 0;
          },
          prepend: function () {
            return void 0;
          },
          recycle: function () {
            return void 0;
          }
        }, options);
        this._itemManager = itemManger;
        this.clear();
      }

      var __proto = Infinite.prototype;

      __proto.setSize = function (size) {
        this._status.size = size;
      };

      __proto.sync = function (items) {
        var status = this._status;
        var startCursor = status.startCursor,
            endCursor = status.endCursor;
        var itemManager = this._itemManager;
        var prevVisisbleGroups = itemManager.sliceGroups(startCursor, endCursor + 1);
        var prevVisibleItems = ItemManager.pluck(prevVisisbleGroups, "items");
        var result = itemManager.sync(items);
        var startGroup = find(prevVisisbleGroups, function (_a) {
          var groupKey = _a.groupKey;
          return itemManager.getGroupByKey(groupKey);
        });
        var endGroup = findLast(prevVisisbleGroups, function (_a) {
          var groupKey = _a.groupKey;
          return itemManager.getGroupByKey(groupKey);
        });
        var nextStartCursor = startGroup ? itemManager.indexOf(startGroup) : -1;
        var nextEndCursor = endGroup ? itemManager.indexOf(endGroup) : -1;

        if (nextStartCursor > -1 && nextEndCursor > -1) {
          // This is when the arrangement is inverted.
          // prevVisisbleGroups is [0, 1, 2, 3]
          // but currentGroups is [3, 2, 1, 0]
          // so, nextStartCursor is 3, and nextEndCursor is 0
          var minCursor = Math.min(nextStartCursor, nextEndCursor);
          var maxCursor = Math.max(nextStartCursor, nextEndCursor);
          nextStartCursor = minCursor;
          nextEndCursor = maxCursor;
        } else if (nextEndCursor > -1) {
          nextStartCursor = nextEndCursor;
        } else if (nextStartCursor > -1) {
          nextEndCursor = nextStartCursor;
        }

        status.startCursor = nextStartCursor;
        status.endCursor = nextEndCursor;

        if (result.removed.length > 0) {
          return "relayout";
        } else {
          var nextVisibleItems = itemManager.pluck("items", startCursor, endCursor);

          var _a = diff(prevVisibleItems, nextVisibleItems, function (_a) {
            var itemKey = _a.itemKey;
            return itemKey;
          }),
              visibleAdded = _a.added,
              visibleRemoved = _a.removed,
              visibleChanged = _a.changed;

          if (!visibleAdded.length && (visibleChanged.length > 0 || visibleRemoved.length > 0)) {
            return "layout";
          } else {
            return "";
          }
        }
      };

      __proto.recycle = function (scrollPos, isForward) {
        if (!this.options.useRecycle || typeof scrollPos !== "number") {
          return;
        }

        var _a = this._status,
            startCursor = _a.startCursor,
            endCursor = _a.endCursor,
            size = _a.size;

        if (startCursor === -1 || endCursor === -1) {
          return;
        }

        var endScrollPos = scrollPos + size;
        var _b = this.options,
            threshold = _b.threshold,
            recycle = _b.recycle;

        var visibles = this._itemManager.sliceGroups(startCursor, endCursor + 1).map(function (group) {
          return isVisible(group, threshold, scrollPos, endScrollPos);
        });

        var length = visibles.length;
        var start = isForward ? 0 : visibles.lastIndexOf(0);
        var end = isForward ? visibles.indexOf(0) - 1 : visibles.length - 1;

        if (!isForward && start !== -1) {
          start += 1;
        }

        if (start < 0 || end < 0 || start > end || end - start + 1 >= length) {
          return;
        }

        start = startCursor + start;
        end = startCursor + end;

        if (isForward) {
          this.setCursor("start", end + 1);
        } else {
          this.setCursor("end", start - 1);
        }

        recycle({
          start: start,
          end: end
        });
      };

      __proto.scroll = function (scrollPos) {
        var _a = this.getCursors(),
            startCursor = _a[0],
            endCursor = _a[1];

        var items = this._itemManager;

        if (typeof scrollPos !== "number" || startCursor === -1 || endCursor === -1 || !items.size()) {
          return;
        }

        var size = this._status.size;
        var _b = this.options,
            threshold = _b.threshold,
            append = _b.append,
            prepend = _b.prepend;
        var datas = items.getGroups();
        var endScrollPos = scrollPos + size;
        var startEdgePos = Math.max.apply(Math, datas[startCursor].outlines.start);
        var endEdgePos = Math.min.apply(Math, datas[endCursor].outlines.end);
        var visibles = datas.map(function (group, i) {
          var _a = group.outlines,
              start = _a.start,
              end = _a.end;

          if (!start.length || !end.length) {
            return false;
          }

          var startPos = Math.min.apply(Math, start);
          var endPos = Math.max.apply(Math, end);

          if (startPos - threshold <= endScrollPos && scrollPos <= endPos + threshold) {
            return true;
          }

          return false;
        });
        var startIndex = visibles.indexOf(true);
        var endIndex = visibles.lastIndexOf(true);

        if (~startIndex && startIndex < startCursor) {
          prepend({
            cache: datas.slice(startIndex, Math.min(startCursor, endIndex + 1))
          });
        } else if (endCursor < endIndex) {
          append({
            cache: datas.slice(Math.max(startIndex, endCursor + 1), endIndex + 1)
          });
        } else {
          // if you have data(no cachedAppendData, has cachedPrependData) to pepend, request it.
          var cachedAppendData = datas.slice(endCursor + 1, endCursor + 2);
          var cachedPrependData = datas.slice(startCursor - 1, startCursor);
          var isPrepend = scrollPos <= startEdgePos + threshold;

          if (endScrollPos >= endEdgePos - threshold && (!isPrepend || cachedAppendData.length || !cachedPrependData.length)) {
            append({
              cache: cachedAppendData
            });
          } else if (isPrepend) {
            prepend({
              cache: cachedPrependData
            });
          }
        }
      };

      __proto.setCursor = function (cursor, index) {
        var status = this._status;
        var items = this._itemManager;
        var size = items.size();

        if (!this.options.useRecycle) {
          status.startCursor = 0;

          if (items.getOutline(size - 1, "end").length) {
            status.endCursor = size - 1;
            return;
          }

          if (cursor !== "end") {
            return;
          }
        }

        if (cursor === "start") {
          status.startCursor = index;
        } else {
          status.endCursor = Math.min(size - 1, index);
        }

        status.startCursor = Math.max(0, status.startCursor);
      };

      __proto.setStatus = function (status) {
        this._status = assign(this._status, status);
      };

      __proto.getStatus = function (startKey, endKey) {
        var _a = this._status,
            startCursor = _a.startCursor,
            endCursor = _a.endCursor,
            size = _a.size;
        var startIndex = Math.max(this._itemManager.indexOf(startKey), 0);
        var endIndex = (this._itemManager.indexOf(endKey) + 1 || this._itemManager.size()) - 1;
        var start = Math.max(startCursor - startIndex, ~startCursor ? 0 : -1);
        var end = Math.max(Math.min(endCursor - startIndex, endIndex - startIndex), start);
        return {
          startCursor: start,
          endCursor: end,
          size: size
        };
      };

      __proto.getEdgeOutline = function (cursor) {
        var _a = this._status,
            startCursor = _a.startCursor,
            endCursor = _a.endCursor;

        if (startCursor === -1 || endCursor === -1) {
          return [];
        }

        return this._itemManager.getOutline(cursor === "start" ? startCursor : endCursor, cursor);
      };

      __proto.getEdgeValue = function (cursor) {
        var outlines = this.getEdgeOutline(cursor);
        return outlines.length ? Math[cursor === "start" ? "min" : "max"].apply(Math, outlines) : 0;
      };

      __proto.getVisibleItems = function () {
        var _a = this._status,
            startCursor = _a.startCursor,
            endCursor = _a.endCursor;
        return this._itemManager.pluck("items", startCursor, endCursor);
      };

      __proto.getCursors = function () {
        var status = this._status;
        return [status.startCursor, status.endCursor];
      };

      __proto.getCursor = function (cursor) {
        return this._status[cursor === "start" ? "startCursor" : "endCursor"];
      };

      __proto.getVisibleData = function () {
        var _a = this._status,
            startCursor = _a.startCursor,
            endCursor = _a.endCursor;
        return this._itemManager.sliceGroups(startCursor, endCursor + 1);
      };

      __proto.remove = function (groupIndex, itemIndex) {
        var status = this._status;
        var items = this._itemManager;
        var startCursor = status.startCursor,
            endCursor = status.endCursor;
        var result = items.remove(groupIndex, itemIndex);

        if (result.group) {
          if (groupIndex < startCursor) {
            this.setCursor("start", startCursor - 1);
          }

          if (groupIndex <= endCursor) {
            this.setCursor("end", endCursor - 1);
          }
        }

        if (!items.size()) {
          status.startCursor = -1;
          status.endCursor = -1;
        }

        return result;
      };

      __proto.clear = function () {
        this._status = {
          startCursor: -1,
          endCursor: -1,
          size: -1
        };
      };

      return Infinite;
    }();

    /*
    Copyright (c) 2020-present NAVER Corp.
    name: @egjs/imready
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-imready
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

    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
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
    /*
    egjs-imready
    Copyright (c) 2020-present NAVER Corp.
    MIT license
    */


    var isWindow$1 = typeof window !== "undefined";
    var ua$1 = isWindow$1 ? window.navigator.userAgent : "";
    var SUPPORT_COMPUTEDSTYLE$1 = isWindow$1 ? !!("getComputedStyle" in window) : false;
    var IS_IE$1 = /MSIE|Trident|Windows Phone|Edge/.test(ua$1);
    var SUPPORT_ADDEVENTLISTENER$1 = isWindow$1 ? !!("addEventListener" in document) : false;
    var WIDTH = "width";
    var HEIGHT = "height";

    function getAttribute(el, name) {
      return el.getAttribute(name) || "";
    }

    function toArray$1(arr) {
      return [].slice.call(arr);
    }

    function hasSizeAttribute(target, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      return !!target.getAttribute(prefix + "width");
    }

    function hasLoadingAttribute(target) {
      return "loading" in target && target.getAttribute("loading") === "lazy";
    }

    function hasSkipAttribute(target, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      return !!target.getAttribute(prefix + "skip");
    }

    function addEvent$1(element, type, handler) {
      if (SUPPORT_ADDEVENTLISTENER$1) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }

    function removeEvent$1(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    }

    function innerWidth$1(el) {
      return getSize$1(el, "Width");
    }

    function innerHeight$1(el) {
      return getSize$1(el, "Height");
    }

    function getStyles(el) {
      return (SUPPORT_COMPUTEDSTYLE$1 ? window.getComputedStyle(el) : el.currentStyle) || {};
    }

    function getSize$1(el, name) {
      var size = el["client" + name] || el["offset" + name];
      return parseFloat(size || getStyles(el)[name.toLowerCase()]) || 0;
    }

    function getContentElements(element, tags, prefix) {
      var skipElements = toArray$1(element.querySelectorAll(__spreadArrays$1(["[" + prefix + "skip] [" + prefix + "width]"], tags.map(function (tag) {
        return ["[" + prefix + "skip] " + tag, tag + "[" + prefix + "skip]", "[" + prefix + "width] " + tag].join(", ");
      })).join(", ")));
      return toArray$1(element.querySelectorAll("[" + prefix + "width], " + tags.join(", "))).filter(function (el) {
        return skipElements.indexOf(el) === -1;
      });
    }
    /*
    egjs-imready
    Copyright (c) 2020-present NAVER Corp.
    MIT license
    */


    var elements = [];

    function addAutoSizer(element, prefix) {
      !elements.length && addEvent$1(window, "resize", resizeAllAutoSizers);
      element.__PREFIX__ = prefix;
      elements.push(element);
      resize(element);
    }

    function removeAutoSizer(element, prefix) {
      var index = elements.indexOf(element);

      if (index < 0) {
        return;
      }

      var fixed = getAttribute(element, prefix + "fixed");
      delete element.__PREFIX__;
      element.style[fixed === HEIGHT ? WIDTH : HEIGHT] = "";
      elements.splice(index, 1);
      !elements.length && removeEvent$1(window, "resize", resizeAllAutoSizers);
    }

    function resize(element, prefix) {
      if (prefix === void 0) {
        prefix = "data-";
      }

      var elementPrefix = element.__PREFIX__ || prefix;
      var dataWidth = parseInt(getAttribute(element, "" + elementPrefix + WIDTH), 10) || 0;
      var dataHeight = parseInt(getAttribute(element, "" + elementPrefix + HEIGHT), 10) || 0;
      var fixed = getAttribute(element, elementPrefix + "fixed");

      if (fixed === HEIGHT) {
        var size = innerHeight$1(element) || dataHeight;
        element.style[WIDTH] = dataWidth / dataHeight * size + "px";
      } else {
        var size = innerWidth$1(element) || dataWidth;
        element.style[HEIGHT] = dataHeight / dataWidth * size + "px";
      }
    }

    function resizeAllAutoSizers() {
      elements.forEach(function (element) {
        resize(element);
      });
    }

    var Loader =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Loader, _super);

      function Loader(element, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.isReady = false;
        _this.isPreReady = false;
        _this.hasDataSize = false;
        _this.hasLoading = false;
        _this.isSkip = false;

        _this.onCheck = function (e) {
          _this.clear();

          if (e && e.type === "error") {
            _this.onError(_this.element);
          } // I'm pre-ready and ready!


          var withPreReady = !_this.hasDataSize && !_this.hasLoading;

          _this.onReady(withPreReady);
        };

        _this.options = __assign$1({
          prefix: "data-"
        }, options);
        _this.element = element;
        _this.hasDataSize = hasSizeAttribute(element, _this.options.prefix);
        _this.hasLoading = hasLoadingAttribute(element);
        _this.isSkip = hasSkipAttribute(_this.element);
        return _this;
      }

      var __proto = Loader.prototype;

      __proto.check = function () {
        if (this.isSkip || !this.checkElement()) {
          // I'm Ready
          this.onAlreadyReady(true);
          return false;
        }

        if (this.hasDataSize) {
          addAutoSizer(this.element, this.options.prefix);
        }

        if (this.hasDataSize || this.hasLoading) {
          // I'm Pre Ready
          this.onAlreadyPreReady();
        } // Wati Pre Ready, Ready


        return true;
      };

      __proto.addEvents = function () {
        var _this = this;

        var element = this.element;
        this.constructor.EVENTS.forEach(function (name) {
          addEvent$1(element, name, _this.onCheck);
        });
      };

      __proto.clear = function () {
        var _this = this;

        var element = this.element;
        this.constructor.EVENTS.forEach(function (name) {
          removeEvent$1(element, name, _this.onCheck);
        });
        this.removeAutoSizer();
      };

      __proto.destroy = function () {
        this.clear();
        this.off();
      };

      __proto.removeAutoSizer = function () {
        if (this.hasDataSize) {
          // I'm already ready.
          var prefix = this.options.prefix;
          removeAutoSizer(this.element, prefix);
        }
      };

      __proto.onError = function (target) {
        this.trigger("error", {
          element: this.element,
          target: target
        });
      };

      __proto.onPreReady = function () {
        if (this.isPreReady) {
          return;
        }

        this.isPreReady = true;
        this.trigger("preReady", {
          element: this.element,
          hasLoading: this.hasLoading,
          isSkip: this.isSkip
        });
      };

      __proto.onReady = function (withPreReady) {
        if (this.isReady) {
          return;
        }

        if (withPreReady) {
          this.isPreReady = true;
        }

        this.removeAutoSizer();
        this.isReady = true;
        this.trigger("ready", {
          element: this.element,
          withPreReady: withPreReady,
          hasLoading: this.hasLoading,
          isSkip: this.isSkip
        });
      };

      __proto.onAlreadyError = function (target) {
        var _this = this;

        setTimeout(function () {
          _this.onError(target);
        });
      };

      __proto.onAlreadyPreReady = function () {
        var _this = this;

        setTimeout(function () {
          _this.onPreReady();
        });
      };

      __proto.onAlreadyReady = function (withPreReady) {
        var _this = this;

        setTimeout(function () {
          _this.onReady(withPreReady);
        });
      };

      Loader.EVENTS = [];
      return Loader;
    }(Component);

    var ElementLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ElementLoader, _super);

      function ElementLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ElementLoader.prototype;

      __proto.setHasLoading = function (hasLoading) {
        this.hasLoading = hasLoading;
      };

      __proto.check = function () {
        if (this.isSkip) {
          // I'm Ready
          this.onAlreadyReady(true);
          return false;
        }

        if (this.hasDataSize) {
          addAutoSizer(this.element, this.options.prefix);
          this.onAlreadyPreReady();
        } else {
          // has not data size
          this.trigger("requestChildren");
        }

        return true;
      };

      __proto.checkElement = function () {
        return true;
      };

      __proto.destroy = function () {
        this.clear();
        this.trigger("requestDestroy");
        this.off();
      };

      __proto.onAlreadyPreReady = function () {
        // has data size
        _super.prototype.onAlreadyPreReady.call(this);

        this.trigger("reqeustReadyChildren");
      };

      ElementLoader.EVENTS = [];
      return ElementLoader;
    }(Loader);
    /**
     * @alias eg.ImReady
     * @extends eg.Component
     */


    var ImReadyManager =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ImReadyManager, _super);
      /**
       * @param - ImReady's options
       */


      function ImReadyManager(options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.readyCount = 0;
        _this.preReadyCount = 0;
        _this.totalCount = 0;
        _this.totalErrorCount = 0;
        _this.isPreReadyOver = true;
        _this.elementInfos = [];
        _this.options = __assign$1({
          loaders: {},
          prefix: "data-"
        }, options);
        return _this;
      }
      /**
       * Checks whether elements are in the ready state.
       * @ko 엘리먼트가 준비 상태인지 체크한다.
       * @elements - Elements to check ready status. <ko> 준비 상태를 체크할 엘리먼트들.</ko>
       * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReadyElement: e => {
         *     // 1, 3
         *     // 2, 3
         *     // 3, 3
         *     console.log(e.preReadyCount, e.totalCount),
         *   },
         * });
         * ```
       */


      var __proto = ImReadyManager.prototype;

      __proto.check = function (elements) {
        var _this = this;

        var prefix = this.options.prefix;
        this.clear();
        this.elementInfos = toArray$1(elements).map(function (element, index) {
          var loader = _this.getLoader(element, {
            prefix: prefix
          });

          loader.check();
          loader.on("error", function (e) {
            _this.onError(index, e.target);
          }).on("preReady", function (e) {
            var info = _this.elementInfos[index];
            info.hasLoading = e.hasLoading;
            info.isSkip = e.isSkip;

            var isPreReady = _this.checkPreReady(index);

            _this.onPreReadyElement(index);

            isPreReady && _this.onPreReady();
          }).on("ready", function (_a) {
            var withPreReady = _a.withPreReady,
                hasLoading = _a.hasLoading,
                isSkip = _a.isSkip;
            var info = _this.elementInfos[index];
            info.hasLoading = hasLoading;
            info.isSkip = isSkip;

            var isPreReady = withPreReady && _this.checkPreReady(index);

            var isReady = _this.checkReady(index); // Pre-ready and ready occur simultaneously


            withPreReady && _this.onPreReadyElement(index);

            _this.onReadyElement(index);

            isPreReady && _this.onPreReady();
            isReady && _this.onReady();
          });
          return {
            loader: loader,
            element: element,
            hasLoading: false,
            hasError: false,
            isPreReady: false,
            isReady: false,
            isSkip: false
          };
        });
        var length = this.elementInfos.length;
        this.totalCount = length;

        if (!length) {
          setTimeout(function () {
            _this.onPreReady();

            _this.onReady();
          });
        }

        return this;
      };
      /**
       * Gets the total count of elements to be checked.
       * @ko 체크하는 element의 총 개수를 가져온다.
       */


      __proto.getTotalCount = function () {
        return this.totalCount;
      };
      /**
       * Whether the elements are all pre-ready. (all sizes are known)
       * @ko 엘리먼트들이 모두 사전 준비가 됐는지 (사이즈를 전부 알 수 있는지) 여부.
       */


      __proto.isPreReady = function () {
        return this.elementInfos.every(function (info) {
          return info.isPreReady;
        });
      };
      /**
       * Whether the elements are all ready.
       * @ko 엘리먼트들이 모두 준비가 됐는지 여부.
       */


      __proto.isReady = function () {
        return this.elementInfos.every(function (info) {
          return info.isReady;
        });
      };
      /**
       * Whether an error has occurred in the elements in the current state.
       * @ko 현재 상태에서 엘리먼트들이 에러가 발생했는지 여부.
       */


      __proto.hasError = function () {
        return this.totalErrorCount > 0;
      };
      /**
       * Clears events of elements being checked.
       * @ko 체크 중인 엘리먼트들의 이벤트를 해제 한다.
       */


      __proto.clear = function () {
        this.isPreReadyOver = false;
        this.totalCount = 0;
        this.preReadyCount = 0;
        this.readyCount = 0;
        this.totalErrorCount = 0;
        this.elementInfos.forEach(function (info) {
          if (!info.isReady && info.loader) {
            info.loader.destroy();
          }
        });
        this.elementInfos = [];
      };
      /**
       * Destory all events.
       * @ko 모든 이벤트를 해제 한다.
       */


      __proto.destroy = function () {
        this.clear();
        this.off();
      };

      __proto.getLoader = function (element, options) {
        var _this = this;

        var tagName = element.tagName.toLowerCase();
        var loaders = this.options.loaders;
        var tags = Object.keys(loaders);

        if (loaders[tagName]) {
          return new loaders[tagName](element, options);
        }

        var loader = new ElementLoader(element, options);
        var children = toArray$1(element.querySelectorAll(tags.join(", ")));
        loader.setHasLoading(children.some(function (el) {
          return hasLoadingAttribute(el);
        }));
        var withPreReady = false;
        var childrenImReady = this.clone().on("error", function (e) {
          loader.onError(e.target);
        }).on("ready", function () {
          loader.onReady(withPreReady);
        });
        loader.on("requestChildren", function () {
          // has not data size
          var contentElements = getContentElements(element, tags, _this.options.prefix);
          childrenImReady.check(contentElements).on("preReady", function (e) {
            withPreReady = e.isReady;

            if (!withPreReady) {
              loader.onPreReady();
            }
          });
        }).on("reqeustReadyChildren", function () {
          // has data size
          // loader call preReady
          // check only video, image elements
          childrenImReady.check(children);
        }).on("requestDestroy", function () {
          childrenImReady.destroy();
        });
        return loader;
      };

      __proto.clone = function () {
        return new ImReadyManager(__assign$1({}, this.options));
      };

      __proto.checkPreReady = function (index) {
        this.elementInfos[index].isPreReady = true;
        ++this.preReadyCount;

        if (this.preReadyCount < this.totalCount) {
          return false;
        }

        return true;
      };

      __proto.checkReady = function (index) {
        this.elementInfos[index].isReady = true;
        ++this.readyCount;

        if (this.readyCount < this.totalCount) {
          return false;
        }

        return true;
      };

      __proto.onError = function (index, target) {
        var info = this.elementInfos[index];
        info.hasError = true;
        /**
         * An event occurs if the image, video fails to load.
         * @ko 이미지, 비디오가 로딩에 실패하면 이벤트가 발생한다.
         * @event eg.ImReady#error
         * @param {eg.ImReady.OnError} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The element with error images.<ko>오류난 이미지가 있는 엘리먼트</ko>
         * @param {number} [e.index] - The item's index with error images. <ko>오류난 이미지가 있는 엘리먼트의 인덱스</ko>
         * @param {HTMLElement} [e.target] - Error image target in element <ko>엘리먼트의 오류난 이미지 타겟</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg"/>
         *    <img src="ERR"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check([document.querySelector("div")]).on({
         *   error: e => {
         *     // <div>...</div>, 0, <img src="ERR"/>
         *     console.log(e.element, e.index, e.target),
         *   },
         * });
         * ```
         */

        this.trigger("error", {
          element: info.element,
          index: index,
          target: target,
          errorCount: this.getErrorCount(),
          totalErrorCount: ++this.totalErrorCount
        });
      };

      __proto.onPreReadyElement = function (index) {
        var info = this.elementInfos[index];
        /**
         * An event occurs when the element is pre-ready (when the loading attribute is applied or the size is known)
         * @ko 해당 엘리먼트가 사전 준비되었을 때(loading 속성이 적용되었거나 사이즈를 알 수 있을 때) 이벤트가 발생한다.
         * @event eg.ImReady#preReadyElement
         * @param {eg.ImReady.OnPreReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The pre-ready element.<ko>사전 준비된 엘리먼트</ko>
         * @param {number} [e.index] - The index of the pre-ready element. <ko>사전 준비된 엘리먼트의 인덱스</ko>
         * @param {number} [e.preReadyCount] - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isPreReady] - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @param {boolean} [e.isSkip] - Whether the check is omitted due to skip attribute <ko>skip 속성으로 인하여 체크가 생략됐는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReadyElement: e => {
         *     // 1, 3
         *     // 2, 3
         *     // 3, 3
         *     console.log(e.preReadyCount, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("preReadyElement", {
          element: info.element,
          index: index,
          preReadyCount: this.preReadyCount,
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isPreReady: this.isPreReady(),
          isReady: this.isReady(),
          hasLoading: info.hasLoading,
          isSkip: info.isSkip
        });
      };

      __proto.onPreReady = function () {
        this.isPreReadyOver = true;
        /**
         * An event occurs when all element are pre-ready (When all elements have the loading attribute applied or the size is known)
         * @ko 모든 엘리먼트들이 사전 준비된 경우 (모든 엘리먼트들이 loading 속성이 적용되었거나 사이즈를 알 수 있는 경우) 이벤트가 발생한다.
         * @event eg.ImReady#preReady
         * @param {eg.ImReady.OnPreReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReady: e => {
         *     // 0, 3
         *     console.log(e.readyCount, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("preReady", {
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isReady: this.isReady(),
          hasLoading: this.hasLoading()
        });
      };

      __proto.onReadyElement = function (index) {
        var info = this.elementInfos[index];
        /**
         * An event occurs when the element is ready
         * @ko 해당 엘리먼트가 준비가 되었을 때 이벤트가 발생한다.
         * @event eg.ImReady#readyElement
         * @param {eg.ImReady.OnReadyElement} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {HTMLElement} [e.element] - The ready element.<ko>준비된 엘리먼트</ko>
         * @param {number} [e.index] - The index of the ready element. <ko>준비된 엘리먼트의 인덱스</ko>
         * @param {boolean} [e.hasError] - Whether there is an error in the element <ko>해당 엘리먼트에 에러가 있는지 여부</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @param {number} [e.preReadyCount] - Number of elements pre-ready <ko>사전 준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.readyCount] - Number of elements ready <ko>준비된 엘리먼트들의 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @param {boolean} [e.isPreReady] - Whether all elements are pre-ready <ko>모든 엘리먼트가 사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isReady] - Whether all elements are ready <ko>모든 엘리먼트가 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.hasLoading] - Whether the loading attribute has been applied <ko>loading 속성이 적용되었는지 여부</ko>
         * @param {boolean} [e.isPreReadyOver] - Whether pre-ready is over <ko>사전 준비가 끝났는지 여부</ko>
         * @param {boolean} [e.isSkip] - Whether the check is omitted due to skip attribute <ko>skip 속성으로 인하여 체크가 생략됐는지 여부</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   readyElement: e => {
         *     // 1, 0, false, 3
         *     // 2, 1, false, 3
         *     // 3, 2, true, 3
         *     console.log(e.readyCount, e.index, e.hasError, e.totalCount),
         *   },
         * });
         * ```
         */

        this.trigger("readyElement", {
          index: index,
          element: info.element,
          hasError: info.hasError,
          errorCount: this.getErrorCount(),
          totalErrorCount: this.totalErrorCount,
          preReadyCount: this.preReadyCount,
          readyCount: this.readyCount,
          totalCount: this.totalCount,
          isPreReady: this.isPreReady(),
          isReady: this.isReady(),
          hasLoading: info.hasLoading,
          isPreReadyOver: this.isPreReadyOver,
          isSkip: info.isSkip
        });
      };

      __proto.onReady = function () {
        /**
         * An event occurs when all element are ready
         * @ko 모든 엘리먼트들이 준비된 경우 이벤트가 발생한다.
         * @event eg.ImReady#ready
         * @param {eg.ImReady.OnReady} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {number} [e.errorCount] - The number of elements with errors <ko>에러가 있는 엘리먼트들의 개수</ko>
         * @param {number} [e.totalErrorCount] - The total number of targets with errors <ko>에러가 있는 타겟들의 총 개수</ko>
         * @param {number} [e.totalCount] - Total number of elements <ko>엘리먼트들의 총 개수</ko>
         * @example
         * ```html
         * <div>
         *    <img src="./1.jpg" data-width="1280" data-height="853" style="width:100%"/>
         *    <img src="./2.jpg" data-width="1280" data-height="853"/>
         *    <img src="ERR" data-width="1280" data-height="853"/>
         * </div>
         * ```
         * ## Javascript
         * ```js
         * import ImReady from "@egjs/imready";
         *
         * const im = new ImReady(); // umd: eg.ImReady
         * im.check(document.querySelectorAll("img")).on({
         *   preReady: e => {
         *     // 0, 3
         *     console.log(e.readyCount, e.totalCount),
         *   },
         *   ready: e => {
         *     // 1, 3
         *     console.log(e.errorCount, e.totalCount),
         *   },
         * });
         * ```
         */
        this.trigger("ready", {
          errorCount: this.getErrorCount(),
          totalErrorCount: this.totalErrorCount,
          totalCount: this.totalCount
        });
      };

      __proto.getErrorCount = function () {
        return this.elementInfos.filter(function (info) {
          return info.hasError;
        }).length;
      };

      __proto.hasLoading = function () {
        return this.elementInfos.some(function (info) {
          return info.hasLoading;
        });
      };

      return ImReadyManager;
    }(Component);

    var ImageLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ImageLoader, _super);

      function ImageLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = ImageLoader.prototype;

      __proto.checkElement = function () {
        var element = this.element;
        var src = element.getAttribute("src");

        if (element.complete && src) {
          if (!element.naturalWidth) {
            this.onAlreadyError(element);
          }

          return false;
        }

        this.addEvents();
        IS_IE$1 && element.setAttribute("src", src);
        return true;
      };

      ImageLoader.EVENTS = ["load", "error"];
      return ImageLoader;
    }(Loader);

    var VideoLoader =
    /*#__PURE__*/
    function (_super) {
      __extends$1(VideoLoader, _super);

      function VideoLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = VideoLoader.prototype;

      __proto.checkElement = function () {
        var element = this.element; // HAVE_NOTHING: 0, no information whether or not the audio/video is ready
        // HAVE_METADATA: 1, HAVE_METADATA - metadata for the audio/video is ready
        // HAVE_CURRENT_DATA: 2, data for the current playback position is available, but not enough data to play next frame/millisecond
        // HAVE_FUTURE_DATA: 3, data for the current and at least the next frame is available
        // HAVE_ENOUGH_DATA: 4, enough data available to start playing

        if (element.readyState >= 1) {
          return false;
        }

        if (element.error) {
          this.onAlreadyError(element);
          return false;
        }

        this.addEvents();
        return true;
      };

      VideoLoader.EVENTS = ["loadedmetadata", "error"];
      return VideoLoader;
    }(Loader);

    var ImReady =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ImReady, _super);

      function ImReady(options) {
        if (options === void 0) {
          options = {};
        }

        return _super.call(this, __assign$1({
          loaders: {
            img: ImageLoader,
            video: VideoLoader
          }
        }, options)) || this;
      }

      return ImReady;
    }(ImReadyManager);

    function hasTarget(target, value) {
      return ~target.indexOf(value);
    }

    var RenderManager =
    /*#__PURE__*/
    function () {
      function RenderManager(_infinite, _itemManager, _renderer, options) {
        this._infinite = _infinite;
        this._itemManager = _itemManager;
        this._renderer = _renderer;
        this.options = options;
      }

      var __proto = RenderManager.prototype;

      __proto.setLayout = function (layout) {
        this._layout = layout;
      };

      __proto.render = function (callbackComponent, groups, items, isAppend) {
        var _this = this;

        if (items === void 0) {
          items = ItemManager.pluck(groups, "items");
        }

        var checkGroups = isAppend ? groups : groups.reverse();
        var replaceTarget = [];
        var removeTarget = [];
        var elements = items.map(function (item) {
          return item.el;
        });
        var prefix = this.options.attributePrefix;
        var im = new ImReady({
          prefix: prefix
        });
        this.im = im;
        im.check(elements);
        im.on("preReady", function () {
          if (!_this._itemManager) {
            return;
          }

          _this._preReady(callbackComponent, checkGroups, items, isAppend);
        }).on("error", function (_a) {
          var target = _a.target,
              index = _a.index;

          if (!_this._itemManager) {
            return;
          }

          _this._error(callbackComponent, removeTarget, replaceTarget, target, items, index);
        }).on("readyElement", function (e) {
          var item = items[e.index];
          item.needUpdate = false;

          if (e.hasLoading && e.isPreReadyOver) {
            _this._readyElement(callbackComponent, items[e.index]);
          }
        }).on("ready", function () {
          if (!_this._itemManager) {
            return;
          }

          _this._ready(callbackComponent, removeTarget, replaceTarget, items);
        });
        return callbackComponent;
      };

      __proto.destroy = function () {
        this.im && this.im.destroy();
      };

      __proto._preReady = function (callbackComponent, groups, items, isAppend) {
        var _this = this;

        var infinite = this._infinite;
        var layout = this._layout;
        var itemManager = this._itemManager;
        var insertCursor = isAppend ? "end" : "start";
        var outlineCursor = isAppend ? "start" : "end";
        var groupIndex = itemManager.indexOf(groups[0]);
        var startGroup = itemManager.getGroup(groupIndex);
        var prevGroup = itemManager.getGroup(groupIndex + (isAppend ? -1 : 1));
        var outline = [0];

        if (prevGroup) {
          outline = prevGroup.outlines[insertCursor];
        } else if (startGroup) {
          outline = startGroup.outlines[outlineCursor];
        }

        this._renderer.updateSize(items);

        groups.forEach(function (group) {
          var groupOutline = group.outlines[outlineCursor];
          var isRelayout = group.needUpdate || !outline.length || (outline.length === groupOutline.length ? !outline.every(function (v, index) {
            return v === groupOutline[index];
          }) : true);

          if (!isRelayout) {
            outline = group.outlines[insertCursor];

            _this._renderer.renderItems(group.items);

            return;
          }

          var groupItems = group.items;
          var groupInfo = layout[isAppend ? "append" : "prepend"](groupItems, outline, true);
          assign(group, groupInfo);

          _this._renderer.renderItems(groupInfo.items);

          outline = groupInfo.outlines[insertCursor];
          group.needUpdate = false;
        });
        var startCursor = Math.max(infinite.getCursor("start"), 0);
        var endCursor = Math.max(infinite.getCursor("end"), 0);
        var requestStartCursor = itemManager.indexOf(groups[0].groupKey);
        var requestEndCursor = itemManager.indexOf(groups[groups.length - 1].groupKey);
        var isInCursor = true;

        if (requestStartCursor > endCursor + 1 || requestEndCursor < startCursor - 1) {
          isInCursor = false;
        }

        if (isInCursor) {
          if (isAppend) {
            requestStartCursor = startCursor;
            requestEndCursor = Math.max(endCursor, requestEndCursor);
          } else {
            requestStartCursor = Math.max(Math.min(startCursor, requestStartCursor), 0);
            requestEndCursor = endCursor;
          }
        }

        if (requestStartCursor > requestEndCursor) {
          var tempCursor = requestStartCursor;
          requestStartCursor = requestEndCursor;
          requestEndCursor = tempCursor;
        }

        callbackComponent.trigger("renderComplete", {
          start: requestStartCursor,
          end: requestEndCursor
        });
        callbackComponent.trigger("layoutComplete", {
          items: ItemManager.pluck(groups, "items"),
          isAppend: !!isAppend
        });
      };

      __proto._error = function (callbackComponent, removeTarget, replaceTarget, target, items, errorIndex) {
        var itemManager = this._itemManager;
        var item = items[errorIndex];
        var element = item.el;
        var prefix = this.options.attributePrefix; // remove item

        var removeItem = function () {
          if (hasTarget(removeTarget, element)) {
            return;
          }

          removeTarget.push(element);
          var index = replaceTarget.indexOf(errorIndex);
          index !== -1 && replaceTarget.splice(index, 1);
        }; // remove image


        var remove = function () {
          if (target === element) {
            removeItem();
            return;
          }

          if (hasTarget(removeTarget, element)) {
            return;
          }

          target.parentNode.removeChild(target);
          item.content = element.outerHTML;

          if (hasTarget(replaceTarget, errorIndex)) {
            return;
          }

          replaceTarget.push(errorIndex);
        }; // replace image


        var replace = function (src) {
          if (hasTarget(removeTarget, element)) {
            return;
          }

          if (src) {
            if (matchHTML(src) || typeof src === "object") {
              var parentNode = target.parentNode;
              parentNode.insertBefore($(src), target);
              parentNode.removeChild(target);
              item.content = element.outerHTML;
            } else if (target instanceof HTMLImageElement) {
              target.src = src;

              if (target.getAttribute(prefix + "width")) {
                target.removeAttribute(prefix + "width");
                target.removeAttribute(prefix + "height");
              }
            }
          }

          item.content = element.outerHTML;

          if (hasTarget(replaceTarget, errorIndex)) {
            return;
          }

          replaceTarget.push(errorIndex);
        }; // replace item


        var replaceItem = function (content) {
          if (hasTarget(removeTarget, element)) {
            return;
          }

          element.innerHTML = content;
          item.content = element.outerHTML;

          if (hasTarget(replaceTarget, errorIndex)) {
            return;
          }

          replaceTarget.push(errorIndex);
        };

        var totalIndex = itemManager.pluck("items").indexOf(item);

        if (target instanceof HTMLImageElement) {
          callbackComponent.trigger("imageError", {
            target: target,
            element: element,
            items: items,
            item: item,
            itemIndex: errorIndex,
            replace: replace,
            replaceItem: replaceItem,
            remove: remove,
            removeItem: removeItem,
            totalIndex: totalIndex
          });
        }

        callbackComponent.trigger("contentError", {
          target: target,
          element: element,
          items: items,
          item: item,
          itemIndex: errorIndex,
          replace: replace,
          replaceItem: replaceItem,
          remove: remove,
          removeItem: removeItem,
          totalIndex: totalIndex
        });
      };

      __proto._readyElement = function (callbackComponent, item) {
        callbackComponent.trigger("readyElement", {
          item: item
        });
      };

      __proto._ready = function (callbackComponent, removeTarget, replaceTarget, items) {
        var _this = this;

        var attributePrefix = this.options.attributePrefix;
        var removeTargetLength = removeTarget.length;
        var replaceTargetLength = replaceTarget.length;

        if (!removeTargetLength && !replaceTargetLength) {
          callbackComponent.trigger("ready", {
            remove: []
          });
          return;
        }

        var layoutedItems = replaceTarget.map(function (itemIndex) {
          return items[itemIndex];
        });

        if (!replaceTargetLength) {
          callbackComponent.trigger("ready", {
            remove: removeTarget,
            layout: true
          });
          return;
        } // wait layoutComplete beacause of error event.


        new ImReady({
          prefix: attributePrefix
        }).check(layoutedItems.map(function (v) {
          return v.el;
        })).on("ready", function () {
          _this._renderer.updateSize(layoutedItems);

          callbackComponent.trigger("ready", {
            remove: removeTarget,
            layout: true
          });
        });
      };

      return RenderManager;
    }();

    var Watcher =
    /*#__PURE__*/
    function () {
      function Watcher(view, options) {
        var _this = this;

        if (options === void 0) {
          options = {};
        }

        this._resizeTimer = 0;
        this._maxResizeDebounceTimer = 0;
        this._containerOffset = 0;
        this._isScrollIssue = IS_IOS; //  When InfiniteGrid is initialized.
        // The initial value is null to block the scroll event when returning from browser behavior.

        this._prevPos = null;

        this._onCheck = function () {
          var prevPos = _this.getScrollPos();

          var orgScrollPos = _this.getOrgScrollPos();

          _this.setScrollPos(orgScrollPos);

          var scrollPos = _this.getScrollPos();

          if (prevPos === null || _this._isScrollIssue && orgScrollPos === 0 || prevPos === scrollPos) {
            orgScrollPos && (_this._isScrollIssue = false);
            return;
          }

          _this._isScrollIssue = false;

          _this.options.check({
            isForward: prevPos < scrollPos,
            scrollPos: scrollPos,
            orgScrollPos: orgScrollPos,
            horizontal: _this.options.horizontal
          });
        };

        this._onResize = function () {
          var _a = _this.options,
              resizeDebounce = _a.resizeDebounce,
              maxResizeDebounce = _a.maxResizeDebounce;

          var onResize = function () {
            clearTimeout(_this._resizeTimer);
            clearTimeout(_this._maxResizeDebounceTimer);
            _this._maxResizeDebounceTimer = 0;
            _this._resizeTimer = 0;

            _this.resize();

            _this.options.resize();
          };

          if (!_this._maxResizeDebounceTimer && maxResizeDebounce >= resizeDebounce) {
            _this._maxResizeDebounceTimer = win.setTimeout(onResize, maxResizeDebounce);
          }

          if (_this._resizeTimer) {
            clearTimeout(_this._resizeTimer);
            _this._resizeTimer = 0;
          }

          _this._resizeTimer = win.setTimeout(onResize, resizeDebounce);
        };

        assign(this.options = {
          container: view,
          resize: function () {
            return void 0;
          },
          check: function () {
            return void 0;
          },
          isOverflowScroll: false,
          horizontal: false,
          resizeDebounce: 100,
          maxResizeDebounce: 0
        }, options);
        this._view = view;
        this.attachEvent();
        this.resize();
        this.setScrollPos();
      }

      var __proto = Watcher.prototype;

      __proto.getStatus = function () {
        return {
          _prevPos: this._prevPos,
          scrollPos: this.getOrgScrollPos()
        };
      };

      __proto.setStatus = function (status, applyScrollPos) {
        if (applyScrollPos === void 0) {
          applyScrollPos = true;
        }

        this._prevPos = status._prevPos;
        applyScrollPos && this.scrollTo(status.scrollPos);
      };

      __proto.scrollBy = function (pos) {
        var arrPos = this.options.horizontal ? [pos, 0] : [0, pos];
        scrollBy(this._view, arrPos[0], arrPos[1]);
        this.setScrollPos();
      };

      __proto.scrollTo = function (pos) {
        var arrPos = this.options.horizontal ? [pos, 0] : [0, pos];
        scrollTo(this._view, arrPos[0], arrPos[1]);
      };

      __proto.getScrollPos = function () {
        return this._prevPos;
      };

      __proto.setScrollPos = function (pos) {
        if (pos === void 0) {
          pos = this.getOrgScrollPos();
        }

        this._prevPos = pos - this.getContainerOffset();
      };

      __proto.attachEvent = function () {
        addEvent(this._view, "scroll", this._onCheck);
        addEvent(win, "resize", this._onResize);
      };

      __proto.getOrgScrollPos = function () {
        return scroll(this._view, this.options.horizontal);
      };

      __proto.reset = function () {
        this._prevPos = null;
      };

      __proto.getContainerOffset = function () {
        return this._containerOffset;
      };

      __proto.resize = function () {
        this._containerOffset = this.options.isOverflowScroll ? 0 : this._getOffset();
      };

      __proto.detachEvent = function () {
        removeEvent(this._view, "scroll", this._onCheck);
        removeEvent(win, "resize", this._onResize);
      };

      __proto.destroy = function () {
        this.detachEvent();
        this.reset();
      };

      __proto._getOffset = function () {
        var _a = this.options,
            container = _a.container,
            horizontal = _a.horizontal;
        var rect = container.getBoundingClientRect();
        return rect[horizontal ? "left" : "top"] + this.getOrgScrollPos();
      };

      return Watcher;
    }();

    // https://stackoverflow.com/questions/43216659/babel-ie8-inherit-issue-with-object-create

    /* eslint-disable */
    // if (typeof Object.create !== "function") {
    //   // tslint:disable
    //   Object.create = (o: any, properties: any) => {
    //     if (typeof o !== "object" && typeof o !== "function") {
    //       throw new TypeError("Object prototype may only be an Object: " + o);
    //     } else if (o === null) {
    //       throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    //     }
    //     function F() { }
    //     F.prototype = o;
    //     return new F();
    //   };
    //   // tslint:enable
    // }

    /* eslint-enable */

    /**
     * A module used to arrange card elements including content infinitely according to layout type. With this module, you can implement various layouts composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
     * @ko 콘텐츠가 있는 카드 엘리먼트를 레이아웃 타입에 따라 무한으로 배치하는 모듈. 다양한 크기의 카드 엘리먼트를 다양한 레이아웃으로 배치할 수 있다. 카드 엘리먼트의 개수가 계속 늘어나도 모듈이 처리하는 DOM의 개수를 일정하게 유지해 최적의 성능을 보장한다
     * @alias eg.InfiniteGrid
     * @extends eg.Component
     *
     * @example
    ```
    <ul id="grid">
      <li class="card">
        <div>test1</div>
      </li>
      <li class="card">
        <div>test2</div>
      </li>
      <li class="card">
        <div>test3</div>
      </li>
      <li class="card">
        <div>test4</div>
      </li>
      <li class="card">
        <div>test5</div>
      </li>
      <li class="card">
        <div>test6</div>
      </li>
    </ul>
    <script>
    var some = new eg.InfiniteGrid("#grid").on("layoutComplete", function(e) {
      // ...
    });

    // If you already have items in the container, call "layout" method.
    some.layout();
    </script>
    ```
     *
     * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
     **/

    var InfiniteGrid =
    /*#__PURE__*/
    function (_super) {
      __extends(InfiniteGrid, _super);
      /**
       * @param {HTMLElement|string|jQuery} element A base element for a module <ko>모듈을 적용할 기준 엘리먼트</ko>
       * @param {object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 옵션 객체</ko>
       * @param {string} [options.itemSelector] A selector to select card elements that make up the layout<ko>레이아웃을 구성하는 카드 엘리먼트를 선택할 선택자(selector)</ko>
       * @param {boolean} [options.useRecycle=true] Indicates whether keep the number of DOMs is maintained. If the useRecycle value is 'true', keep the number of DOMs is maintained. If the useRecycle value is 'false', the number of DOMs will increase as card elements are added. <ko>DOM의 수를 유지할지 여부를 나타낸다. useRecycle 값이 'true'이면 DOM 개수를 일정하게 유지한다. useRecycle 값이 'false' 이면 카드 엘리먼트가 추가될수록 DOM 개수가 계속 증가한다.</ko>
       * @param {boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll 적용여부를 결정한다.</ko>
       * @param {boolean} [options.horizontal=false] Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향)</ko>
       * @param {boolean} [options.useFit=true] The useFit option scrolls upwards so that no space is visible until an item is added <ko>위로 스크롤할 시 아이템을 추가하는 동안 보이는 빈 공간을 안보이게 한다.</ko>
       * @param {boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>카드 엘리먼트의 크기가 동일한지 여부. 배치될 카드 엘리먼트의 크기가 모두 동일할 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
       * @param {boolean} [options.isConstantSize=false] Indicates whether sizes of all card elements does not change, the performance of layout arrangement can be improved. <ko>모든 카드 엘리먼트의 크기가 불변일 때 이 옵션을 'true'로 설정하면 레이아웃 배치 성능을 높일 수 있다</ko>
       * @param {number} [options.transitionDruation=0] Indicates how many seconds a transition effect takes to complete. <ko>트랜지션 효과를 완료하는데 걸리는 시간을 나타낸다.</ko>
       * @param {number} [options.threshold=100] The threshold size of an event area where card elements are added to a layout.<ko>레이아웃에 카드 엘리먼트를 추가하는 이벤트가 발생하는 기준 영역의 크기.</ko>
       * @param {string} [options.attributePrefix="data-"] The prefix to use element's data attribute.<ko>엘리먼트의 데이타 속성에 사용할 접두사.</ko>
       * @param {number} [options.resizeDebounce=100] Debounce time to set in the resize event. <ko>리사이즈 이벤트에 설정할 디바운스 시간.</ko>
       * @param {number} [options.maxResizeDebounce=0] Maximum time to debounce the resize event(0 is not set). <ko>리사이즈 이벤트를 디바운스할 수 있는 최대 시간(0은 미설정이다).</ko>
       * @param {boolean} [options.renderExternal=false] Whether to use external rendering. It will delegate DOM manipulation and can synchronize the rendered state by calling `sync()` method. You can use this option to use in frameworks like React, Vue, Angular, which has its states and rendering methods.<ko>외부 렌더링을 사용할 지의 여부. 이 옵션을 사용시 렌더링을 외부에 위임할 수 있고, `sync()`를 호출하여 그 상태를 동기화할 수 있다. 이 옵션을 사용하여, React, Vue, Angular 등 자체적인 상태와 렌더링 방법을 갖는 프레임워크에 대응할 수 있다.</ko>
       * @param {boolean | Array<"size" | "position">} [options.percentage=false] Whether to set the css size and position of the item to %.<ko>item의 css size와 position를 %로 설정할지 여부.</ko>
       */


      function InfiniteGrid(element, options) {
        var _this = _super.call(this) || this;

        _this._loadingBar = {};
        _this._requestGroups = [];
        assign(_this.options = __assign({}, DEFAULT_OPTIONS), options);
        DEFENSE_BROWSER && (_this.options.useFit = false);
        IS_ANDROID2 && (_this.options.isOverflowScroll = false);

        _this._reset();

        var _a = _this.options,
            isOverflowScroll = _a.isOverflowScroll,
            isEqualSize = _a.isEqualSize,
            isConstantSize = _a.isConstantSize,
            horizontal = _a.horizontal,
            threshold = _a.threshold,
            useRecycle = _a.useRecycle,
            attributePrefix = _a.attributePrefix,
            resizeDebounce = _a.resizeDebounce,
            maxResizeDebounce = _a.maxResizeDebounce,
            percentage = _a.percentage;
        _this._itemManager = new ItemManager();
        _this._renderer = new DOMRenderer(element, {
          isEqualSize: isEqualSize,
          isConstantSize: isConstantSize,
          horizontal: horizontal,
          container: isOverflowScroll,
          percentage: percentage
        });
        _this._watcher = new Watcher(_this._renderer.view, {
          resizeDebounce: resizeDebounce,
          maxResizeDebounce: maxResizeDebounce,
          isOverflowScroll: isOverflowScroll,
          horizontal: horizontal,
          container: _this._renderer.container,
          resize: function () {
            return _this._onResize();
          },
          check: function (param) {
            return _this._onCheck(param);
          }
        });
        _this._infinite = new Infinite(_this._itemManager, {
          useRecycle: useRecycle,
          threshold: threshold,
          append: function (param) {
            return _this._requestAppend(param);
          },
          prepend: function (param) {
            return _this._requestPrepend(param);
          },
          recycle: function (param) {
            return _this._recycle([param]);
          }
        });
        _this._renderManager = new RenderManager(_this._infinite, _this._itemManager, _this._renderer, {
          attributePrefix: attributePrefix,
          isEqualSize: isEqualSize,
          isConstantSize: isConstantSize,
          horizontal: horizontal
        });
        return _this;
      }
      /**
       * Adds a card element at the bottom of a layout. This method is available only if the isProcessing() method returns false.
       * @ko 카드 엘리먼트를 레이아웃 아래에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
       * 이 메소드는 isProcessing()의 반환값이 false일 경우에만 사용 가능하다.
       * @param - elements Array of the card elements to be added <ko>추가할 카드 엘리먼트의 배열</ko>
       * @param - The group key to be configured in a card element. It is automatically generated by default.
       * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
       * infinitegrid.append("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
       * infinitegrid.append(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
       * infinitegrid.append([HTMLElement1, HTMLElement2]);
       * infinitegrid.append(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
       */


      var __proto = InfiniteGrid.prototype;

      __proto.append = function (elements, groupKey) {
        this._layout && this._insert({
          elements: elements,
          isAppend: true,
          groupKey: groupKey
        });
        return this;
      };
      /**
       * Adds a card element at the top of a layout. This method is available only if the isProcessing() method returns false.
       * @ko 카드 엘리먼트를 레이아웃의 위에 추가한다. isProcessing() 메서드의 반환값이 'false'일 때만 이 메서드를 사용할 수 있다
       * @param - elements Array of the card elements to be added <ko>추가할 카드 엘리먼트 배열</ko>
       * @param - The group key to be configured in a card element. It is automatically generated by default.
       * <ko>추가할 카드 엘리먼트에 설정할 그룹 키. 생략하면 값이 자동으로 생성된다.</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
       * infinitegrid.prepend("&lt;div class='item'&gt;test1&lt;/div&gt;&lt;div class='item'&gt;test2&lt;/div&gt;");
       * infinitegrid.prepend(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]);
       * infinitegrid.prepend([HTMLElement1, HTMLElement2]);
       * infinitegrid.prepend(jQuery(["&lt;div class='item'&gt;test1&lt;/div&gt;", "&lt;div class='item'&gt;test2&lt;/div&gt;"]));
       */


      __proto.prepend = function (elements, groupKey) {
        this._layout && this._insert({
          elements: elements,
          isAppend: false,
          groupKey: groupKey
        });
        return this;
      };
      /**
       * Specifies the Layout class to use.
       * @ko 사용할 Layout 클래스를 지정한다.
       * @param {Class|Object} LayoutKlass The Layout class to use or an instance of a layout moudle<ko>사용할 Layout 클래스 또는 레이아웃 모듈의 인스턴스</ko>
       * @param {Object} options Options to apply to the Layout.<ko>Layout에 적용할 옵션</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
       * infinitegrid.setLayout(eg.InfiniteGrid.GridLayout, {
       *  margin: 10,
       *  align: "start"
       * });
       * infinitegrid.setLayout(eg.InfiniteGrid.JustifiedLayout, {
       *  margin: 10,
       *  minSize: 100,
       *  maxSize: 200
       * });
       * infinitegrid.setLayout(eg.InfiniteGrid.SquareLayout, {
       *  margin: 10,
       *  column: 2
       * });
       * infinitegrid.setLayout(eg.InfiniteGrid.FrameLayout, {
       *  margin: 10,
       *  frame: [
       *   [1, 2],
       *   [4, 3],
       *  ]
       * });
       * infinitegrid.setLayout(eg.InfiniteGrid.PackingLayout, {
       *  margin: 10,
       *  aspectRatio: 1.5
       * });
       * var layout = new eg.InfiniteGrid.GridLayout({
       *   margin: 10,
       *  align: "start"
       * });
       * infinitegrid.setLayout(layout);
       */


      __proto.setLayout = function (LayoutKlass, options) {
        if (options === void 0) {
          options = {};
        }

        var horizontal = this.options.horizontal;

        if (typeof LayoutKlass === "function") {
          this._layout = new LayoutKlass(assign(options, {
            horizontal: horizontal
          }));
        } else {
          LayoutKlass.options.horizontal = horizontal;
          this._layout = LayoutKlass;
        }

        this._renderManager.setLayout(this._layout);

        this._renderer.resize();

        this._setSize(this._renderer.getViewportSize());

        return this;
      };
      /**
       * Returns the layouted items.
       * @ko 레이아웃된 아이템들을 반환한다.
       * @param {Boolean} includeCached Indicates whether to include the cached items. <ko>캐싱된 아이템을 포함할지 여부를 나타낸다.</ko>
       * @returns List of items <ko>아이템의 목록</ko>
       */


      __proto.getItems = function (includeCached) {
        if (includeCached === void 0) {
          includeCached = false;
        }

        return includeCached ? this._itemManager.pluck("items") : this._infinite.getVisibleItems();
      };
      /**
       * @param - Get items to render on screen.
       * @ko 화면에 렌더될 아이템들 가져온다.
       * @private
       * @param - The groups currently being added by request.<ko>요청에 의해 지금 추가중인 그룹들.</ko>
       * @return - The items to be rendered on screen. <ko>화면레 렌더될 아이템들.</ko>
       */


      __proto.getRenderingItems = function () {
        var items = this.getItems();
        var itemKeys = {};
        items.forEach(function (item) {
          itemKeys[item.itemKey] = true;
        });
        var nextVisisbleItems = ItemManager.pluck(this._requestGroups, "items").filter(function (item) {
          if (itemKeys[item.itemKey]) {
            return false;
          }

          itemKeys[item.itemKey] = true;
          return true;
        });
        return items.concat(nextVisisbleItems);
      };
      /**
       * Synchronize info of items with info given by external rendering.
       * @ko 외부 렌더링 방식에 의해 아이템의 정보들을 동기화한다.
       * @private
       * @param - all item infos to synchronize <ko>동기화할 전체 아이템 정보들.</ko>
       */


      __proto.beforeSync = function (items) {
        return this._infinite.sync(items);
      };
      /**
       * Synchronize info of items with DOM info given by external rendering.
       * @ko 외부 렌더링 방식에 의해 입력받은 DOM의 정보와 현재 아이템 정보를 동기화 한다.
       * @private
       * @param - The DOM elements that are currently visible.<ko>현재 보여지고 있는 DOM 엘리먼트들.</ko>
       * @param - The groups currently being added by request.<ko>요청에 의해 지금 추가중인 그룹들.</ko>
       */


      __proto.sync = function (elements) {
        var _this = this;

        var itemManager = this._itemManager;
        var infinite = this._infinite;
        var items = this.getRenderingItems();
        items.forEach(function (item, i) {
          var isChange = item.el !== elements[i];
          item.el = elements[i];

          if (isChange) {
            _this._renderer.renderItem(item, item.rect);
          }
        });

        if (this._isProcessing()) {
          return;
        }

        var newItems = items.filter(function (item) {
          return item.needUpdate || !item.orgSize || !item.orgSize.width;
        });

        if (newItems.length) {
          this._postLayout({
            fromCache: false,
            groups: infinite.getVisibleData(),
            newItems: newItems,
            isAppend: true,
            isTrusted: false
          });
        } else {
          var size = itemManager.size();

          if (!size) {
            this._requestAppend({});
          } else if (infinite.getCursor("start") < 0) {
            var firstGroup = itemManager.getGroup(0);

            this._postLayout({
              groups: [firstGroup],
              hasChildren: false,
              fromCache: false,
              isAppend: true
            });
          } else {
            this._infinite.scroll(this._watcher.getScrollPos());
          }
        }
      };
      /**
       * Rearranges a layout.
       * @ko 레이아웃을 다시 배치한다.
       * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>카드 엘리먼트 재배치 여부</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.layout = function (isRelayout) {
        if (isRelayout === void 0) {
          isRelayout = true;
        }

        if (!this._layout) {
          return this;
        }

        var renderer = this._renderer;
        var itemManager = this._itemManager;
        var infinite = this._infinite;
        var isResize = renderer.resize();
        var visibleItems = this.getItems();
        var _a = this.options,
            isEqualSize = _a.isEqualSize,
            isConstantSize = _a.isConstantSize,
            transitionDuration = _a.transitionDuration;
        var isLayoutAll = isRelayout && (isEqualSize || isConstantSize);

        this._watcher.resize();

        if (isRelayout) {
          this._setSize(renderer.getViewportSize());
        } // first layout (startCursor -1 endCursor -1)


        if (!visibleItems.length) {
          return this._firstLayout();
        } // layout datas


        var _b = infinite.getCursors(),
            startCursor = _b[0],
            endCursor = _b[1];

        var data = isLayoutAll || !(isRelayout && isResize) ? itemManager.getGroups() : itemManager.sliceGroups(startCursor, endCursor + 1); // LayoutManger interface

        this._relayout(isRelayout, data, isResize ? visibleItems : []);

        if (isLayoutAll) {
          this._fit();
        } else if (isRelayout && isResize) {
          itemManager.clearOutlines(startCursor, endCursor);
        }

        this._renderer.renderItems(visibleItems, transitionDuration);

        isRelayout && this._watcher.setScrollPos();

        this._onLayoutComplete({
          items: visibleItems,
          isAppend: true,
          fromCache: true,
          isTrusted: false,
          useRecycle: false,
          isLayout: true
        });

        return this;
      };
      /**
       * Removes a item corresponding to an index on a grid layout.
       * @ko 그리드 레이아웃에서 인덱스에 해당하는 아이템 삭제한다.
       * @param - Index of group corresponding to item to remove <ko>삭제할 아이템에 해당하는 그룹의 인덱스</ko>
       * @param - Index of item to remove on group <ko>그룹에서 삭제할 아이템의 인덱스</ko>
       * @return {Object}  Removed items information <ko>삭제된 아이템들 정보</ko>
       */


      __proto.removeByIndex = function (groupIndex, itemIndex, isLayout) {
        if (isLayout === void 0) {
          isLayout = true;
        }

        var _a = this._infinite.remove(groupIndex, itemIndex),
            items = _a.items,
            group = _a.group;

        items.forEach(function (item) {
          DOMRenderer.removeElement(item.el);
        });

        if (items.length) {
          isLayout && this.layout(!!group);
          return items;
        }

        return [];
      };
      /**
       * Removes a item element on a grid layout.
       * @ko 그리드 레이아웃의 카드 엘리먼트를 삭제한다.
       * @param {HTMLElement} item element to be removed <ko>삭제될 아이템 엘리먼트</ko>
       * @return {Object}  Removed items information <ko>삭제된 아이템들 정보</ko>
       */


      __proto.remove = function (element, isLayout) {
        if (isLayout === void 0) {
          isLayout = true;
        }

        var _a = this._itemManager.indexesOfElement(element),
            groupIndex = _a.groupIndex,
            itemIndex = _a.itemIndex;

        return this.removeByIndex(groupIndex, itemIndex, isLayout);
      };
      /**
       * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, groupkey is automatically generated.
       * @ko 현재 유지하고 있는 카드 엘리먼트의 그룹 키 목록을 반환한다. 여러 개의 카드 엘리먼트를 묶어서 관리할 수 있도록 append() 메서드나 prepend() 메서드에서 그룹 키를 지정할 수 있다. append() 메서드나 prepend() 메서드에서 그룹 키를 지정하지 않았다면 자동으로 그룹키가 생성된다.
       * @param {Boolean} includeCached Indicates whether to include the cached groups. <ko>캐싱된 그룹을 포함할지 여부를 나타낸다.</ko>
       * @return {Array} List of group keys <ko>그룹 키의 목록</ko>
       */


      __proto.getGroupKeys = function (includeCached) {
        var data = includeCached ? this._itemManager.getGroups() : this._infinite.getVisibleData();
        return data.map(function (v) {
          return v.groupKey;
        });
      };
      /**
       * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
       * @ko 카드의 위치 정보 등 모듈의 현재 상태 정보를 반환한다. 이 메서드가 반환한 정보를 저장해 두었다가 setStatus() 메서드로 복원할 수 있다
       * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
       */


      __proto.getStatus = function (startKey, endKey) {
        return {
          _status: assign({}, this._status),
          _itemManager: this._itemManager.getStatus(startKey, endKey),
          _renderer: this._renderer.getStatus(),
          _watcher: this._watcher.getStatus(),
          _infinite: this._infinite.getStatus(startKey, endKey)
        };
      };
      /**
       * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
       * @ko getStatue() 메서드가 저장한 정보로 eg.InfiniteGrid 모듈의 상태를 설정한다.
       * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid 모듈의 상태 객체</ko>
       * @param {boolean} [applyScrollPos=true] Checks whether to scroll<ko>스크롤의 위치를 복원할지 결정한다.</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.setStatus = function (status, applyScrollPos, syncElements) {
        if (applyScrollPos === void 0) {
          applyScrollPos = true;
        }

        if (!status) {
          return this;
        }

        var _status = status._status,
            _renderer = status._renderer,
            _itemManager = status._itemManager,
            _watcher = status._watcher,
            _infinite = status._infinite;

        if (!_status || !_renderer || !_itemManager || !_watcher || !_infinite) {
          return this;
        }

        var renderExternal = this.options.renderExternal;
        var items = this._itemManager;
        var renderer = this._renderer;
        var watcher = this._watcher;
        var infinite = this._infinite;
        watcher.detachEvent();
        assign(this._status, _status);
        this._status.processingStatus = IDLE;
        items.setStatus(_itemManager);
        renderer.setStatus(_renderer);
        infinite.setStatus(_infinite);
        var visibleItems = this.getItems();
        var length = visibleItems.length;

        if (renderExternal) {
          visibleItems.forEach(function (item, i) {
            item.el = syncElements[i];
          });

          this._renderer.renderItems(visibleItems);
        } else {
          renderer.createAndInsert(visibleItems, true);
        }

        var isReLayout = renderer.isNeededResize();
        watcher.setStatus(_watcher, applyScrollPos);
        watcher.attachEvent();
        var _a = this.options,
            isConstantSize = _a.isConstantSize,
            isEqualSize = _a.isEqualSize;

        if (!length) {
          this._requestAppend({
            cache: []
          });
        } else if (isReLayout) {
          renderer.resize();

          this._setSize(renderer.getViewportSize());

          if (isConstantSize) {
            this.layout(true);
          } else {
            this._itemManager.clearOutlines();

            this._postLayout({
              fromCache: true,
              groups: isEqualSize ? items.getGroups() : infinite.getVisibleData(),
              items: visibleItems,
              newItems: visibleItems,
              isAppend: true,
              isTrusted: false
            });
          }
        } else {
          this.layout(false);
        }

        return this;
      };
      /**
       * Clears added card elements and data.
       * @ko 추가된 카드 엘리먼트와 데이터를 모두 지운다.
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.clear = function () {
        this._itemManager.clear();

        this._renderer.clear();

        this._infinite.clear();

        this._reset();

        this._appendLoadingBar();

        return this;
      };
      /**
       * Specifies the Loading Bar to use for append or prepend items.
       * @ko 아이템을 append 또는 prepend 하기 위해 사용할 로딩 바를 지정한다.
       * @param {String|Object} [userLoadingBar={}] The loading bar HTML markup or element or element selector <ko> 로딩 바 HTML 또는 element 또는 selector </ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.setLoadingBar = function (userLoadingBar) {
        if (userLoadingBar === void 0) {
          userLoadingBar = {};
        }

        var loadingBarObj = typeof userLoadingBar === "object" ? userLoadingBar : {
          append: userLoadingBar,
          prepend: userLoadingBar
        };
        this._status.loadingSize = 0;
        this._status.loadingStyle = {};
        var loadingBar = this._loadingBar;
        var isChangeLoadingBar = false;

        for (var type in loadingBarObj) {
          var loadingElement = $(loadingBarObj[type]);

          if (loadingBar[type] !== loadingElement) {
            loadingBar[type] = loadingElement;
            isChangeLoadingBar = true;
          }

          if (!hasClass(loadingElement, IGNORE_CLASSNAME)) {
            addClass(loadingElement, IGNORE_CLASSNAME);
          }
        }

        if (isChangeLoadingBar) {
          this._renderLoading();
        }

        this._appendLoadingBar();

        return this;
      };
      /**
       * Checks whether a card element or data is being added.
       * @ko 카드 엘리먼트 추가 또는 데이터 로딩이 진행 중인지 확인한다
       * @return {Boolean} Indicates whether a card element or data is being added <ko>카드 엘리먼트 추가 또는 데이터 로딩 진행 중 여부</ko>
       */


      __proto.isProcessing = function () {
        return this._isProcessing() || this.isLoading();
      };
      /**
       * Checks whether data is loading.
       * @ko 데이터 로딩 중인지 확인한다
       * @return {Boolean} Indicates whether data is loading <ko>데이터 로딩 진행 중 여부</ko>
       */


      __proto.isLoading = function () {
        return this._getLoadingStatus() > 0;
      };
      /**
       * Returns the element of loading bar.
       * @ko 로딩 바의 element를 반환한다.
       * @param {Boolean} [isAppend=currentLoadingBar|true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
       * @return {Element} The element of loading bar. <ko>로딩 바의 element</ko>
       */


      __proto.getLoadingBar = function (isAppend) {
        if (isAppend === void 0) {
          isAppend = this._getLoadingStatus() !== LOADING_PREPEND;
        }

        return this._loadingBar[isAppend ? "append" : "prepend"];
      };
      /**
       * Start loading for append/prepend during loading data.
       * @ko 데이터가 로딩되는 동안 append/prepend하길 위해 로딩을 시작한다.
       * @param {Boolean} [isAppend=true] Checks whether the card element is added to the append () method. <ko>카드 엘리먼트가 append() 메서드로 추가 할 것인지 확인한다.</ko>
       * @param {Object} [userStyle = {display: "block"}] custom style to apply to this loading bar for start. <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.startLoading = function (isAppend, userStyle) {
        var _this = this;

        if (userStyle === void 0) {
          userStyle = {
            display: "block"
          };
        }

        if (this.isLoading()) {
          return this;
        }

        var type = isAppend ? "append" : "prepend";

        this._process(isAppend ? LOADING_APPEND : LOADING_PREPEND);

        if (!this._loadingBar[type]) {
          return this;
        }

        var next = function () {
          _this._renderLoading(userStyle);

          _this._status.loadingStyle = userStyle;

          if (!isAppend) {
            _this._fit();
          } else {
            _this._setContainerSize(_this._getEdgeValue("end") + _this._status.loadingSize);
          }
        };

        if (this.options.renderExternal) {
          this.trigger("render", {
            next: next
          });
        } else {
          next();
        }

        return this;
      };
      /**
       * End loading after startLoading() for append/prepend
       * @ko  append/prepend하길 위해 startLoading() 호출해선 걸었던 로딩을 끝낸다.
       * @param {Object} [userStyle = {display: "none"}] custom style to apply to this loading bar for end <ko> 로딩 시작을 위한 로딩 바에 적용할 커스텀 스타일 </ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.endLoading = function (userStyle) {
        var _a;

        if (userStyle === void 0) {
          userStyle = {
            display: "none"
          };
        }

        if (!this.isLoading()) {
          return this;
        }

        var isAppend = this._getLoadingStatus() === LOADING_APPEND;
        var type = isAppend ? "append" : "prepend";
        var el = this._loadingBar[type];
        var status = this._status;
        var size = status.loadingSize;

        this._process(LOADING_APPEND | LOADING_PREPEND, false);

        status.loadingSize = 0;
        status.loadingStyle = {};

        if (el) {
          var style = assign((_a = {}, _a[this.options.horizontal ? "left" : "top"] = -size + "px", _a), userStyle);

          for (var property in style) {
            el.style[property] = style[property];
          }

          if (!isAppend) {
            this._fitItems(size);
          } else {
            this._setContainerSize(this._getEdgeValue("end"));
          }

          if (this.options.renderExternal) {
            this.trigger("render", {
              next: function () {}
            });
          }
        }

        if (this.options.useRecycle && !this.isProcessing()) {
          this._infinite.recycle(this._watcher.getScrollPos(), isAppend);
        }

        return this;
      };
      /**
       * Retrieves the item via index or the element.
       * @ko index 또는 element를 통해 아이템을 가져온다.
       * @param {number | HTMLElement} [groupIndex=0] The element corresponding to item or the index of the group where the item is in position <ko> item에 해당하는 element 또는 해당 item이 있는 group의 index</ko>
       * @param {number} [itemIndex] If groupIndex is used, the index of the item in the group <ko> groupIndex를 사용할 경우 해당 group에 있는 Item의 index </ko>
       * @return The item containing the content, size and position,etc<ko>content, size, position 등이 담겨있는 item 정보</ko>
       * @example
        ig.getItem(0, 0);
       ig.getItem(element);
        {
        el: HTMLElement,
        content: "<div>...</div>",
        size: {width: ..., height: ...},
        rect: {top: ..., left: ..., width: ..., height: ...},
       }
       */


      __proto.getItem = function (groupIndex, itemIndex) {
        if (groupIndex === void 0) {
          groupIndex = 0;
        }

        if (typeof groupIndex === "object") {
          if (!groupIndex) {
            return;
          }

          var items = this.getItems();
          var length = items.length;

          for (var i = 0; i < length; ++i) {
            if (items[i].el === groupIndex) {
              return items[i];
            }
          }

          return undefined;
        } else {
          var group = this._itemManager.getGroup(groupIndex);

          return group && group.items[itemIndex || 0];
        }
      };
      /**
       * Updates the item via index or the element.
       * @ko index 또는 element를 통해 아이템을 업데이트한다.
       * @param {number | HTMLElement} [groupIndex=0] The element corresponding to item or the index of the group where the item is in position <ko> item에 해당하는 element 또는 해당 item이 있는 group의 index</ko>
       * @param {number} [itemIndex] If groupIndex is used, the index of the item in the group <ko> groupIndex를 사용할 경우 해당 group에 있는 Item의 index </ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
      element.innerHTML = "2";
      element.style.height = "400px";
      ig.updateItem(element);
      ig.updateItem(0, 0);
       */


      __proto.updateItem = function (groupIndex, itemIndex) {
        var item = this.getItem(groupIndex, itemIndex);
        this._updateItem(item) && this.layout(false);
        return this;
      };
      /**
       * Update the currently displayed items.
       * @ko 현재보여주는 아이템들을 업데이트한다.
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
      element.innerHTML = "2";
      element.style.height = "400px";
       element2.innerHTML = "2";
      element2.style.height = "400px";
       ig.updateItems();
       */


      __proto.updateItems = function () {
        var _this = this;

        this.getItems().forEach(function (item) {
          _this._updateItem(item);
        });
        this.layout(false);
        return this;
      };
      /**
       * Move to some group or item position.
       * @ko 해당하는 그룹 또는 아이템의 위치로 이동한다.
       * @param {Number} [index] group's index <ko> 그룹의 index</ko>
       * @param {Number} [itemIndex=-1] item's index <ko> 그룹의 index</ko>
       * @return {eg.InfiniteGrid} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       */


      __proto.moveTo = function (index, itemIndex) {
        var _this = this;

        if (itemIndex === void 0) {
          itemIndex = 0;
        }

        if (this.isProcessing()) {
          return this;
        }

        var data = this._itemManager.getGroup(index);

        if (!data) {
          return this;
        }

        var infinite = this._infinite;
        var outlines = data.outlines;
        var items = data.items;
        var item = items[itemIndex];
        var isResize = outlines.start && outlines.start.length === 0;

        var _a = infinite.getCursors(),
            startCursor = _a[0],
            endCursor = _a[1];

        var isInCursor = startCursor <= index && index <= endCursor;
        var _b = this.options,
            useRecycle = _b.useRecycle,
            horizontal = _b.horizontal;

        if (isInCursor || !useRecycle || !isResize) {
          var pos = item ? item.rect[horizontal ? "left" : "top"] : Math.max.apply(Math, outlines.start);
          var fit = Math.min.apply(Math, outlines.start);

          if (fit < 0) {
            // base < 0
            this._fitItems(fit, 0);

            pos -= fit;
          }

          var isAppend = index > startCursor;

          if (isInCursor || isAppend) {
            this._scrollTo(pos);

            return this;
          }

          this._postLayout({
            fromCache: true,
            groups: [data],
            items: items,
            newItems: [],
            isAppend: isAppend,
            isTrusted: false
          }).on("renderComplete", function (_a) {
            var start = _a.start,
                end = _a.end;
            var itemManager = _this._itemManager;

            if (!itemManager) {
              return;
            }

            var scrollPos = items[itemIndex].rect[horizontal ? "left" : "top"];

            if (!isInCursor) {
              itemManager.clearOutlines(start, end);
            }

            _this._scrollTo(scrollPos);

            _this._setScrollPos(scrollPos);
          });

          return this;
        } else {
          var isAppend = index > endCursor || index < startCursor - 1;

          this._postCache({
            isAppend: isAppend,
            cache: [data],
            isTrusted: false
          }).on("renderComplete", function (_a) {
            var start = _a.start,
                end = _a.end;
            var itemManager = _this._itemManager;

            if (!itemManager) {
              return;
            }

            var pos = items[itemIndex].rect[horizontal ? "left" : "top"];
            itemManager.clearOutlines(start, end);

            _this._scrollTo(pos);

            _this._setScrollPos(pos);
          });
        }

        return this;
      };
      /**
      * Destroys elements, properties, and events used on a grid layout.
      * @ko 그리드 레이아웃에 사용한 엘리먼트와 속성, 이벤트를 해제한다
      */


      __proto.destroy = function () {
        this._infinite.clear();

        this._watcher.destroy();

        this._reset();

        this._itemManager.clear();

        this._renderer.destroy();

        this._renderManager.destroy();
      };

      __proto._relayout = function (isRelayout, groups, items) {
        var renderer = this._renderer;
        var _a = renderer.options,
            isEqualSize = _a.isEqualSize,
            isConstantSize = _a.isConstantSize;
        var layoutGroups = groups.filter(function (group) {
          var item = group.items[0];
          return item.orgSize && item.rect.top > DUMMY_POSITION / 10;
        });

        if (!layoutGroups.length) {
          return [];
        }

        var outline = layoutGroups[0].outlines.start;

        if (isRelayout) {
          outline = [outline.length ? Math.min.apply(Math, outline) : 0];

          if (!isConstantSize && items.length) {
            renderer.updateSize(items); // update invisible items' size

            if (isEqualSize && items[0].size) {
              ItemManager.pluck(layoutGroups, "items").forEach(function (item) {
                item.size = assign({}, items[0].size);
              });
            }
          }
        }

        this._layout.layout(layoutGroups, outline);

        layoutGroups.forEach(function (group) {
          group.needUpdate = false;
        });
      };

      __proto._setContainerSize = function (size) {
        this._renderer.setContainerSize(Math.max(this._itemManager.getMaxEdgeValue(), size));
      };

      __proto._appendLoadingBar = function () {
        if (!this.options.renderExternal) {
          var loadingBar = this._loadingBar;
          var container = this._renderer.container;

          for (var type in loadingBar) {
            container.appendChild(loadingBar[type]);
          }
        }
      };

      __proto._setSize = function (size) {
        this._infinite.setSize(this._renderer.getViewSize());

        this._layout.setSize(size);
      };

      __proto._fitItems = function (base, margin) {
        if (margin === void 0) {
          margin = 0;
        }

        base > 0 && this._watcher.scrollBy(-base);

        this._itemManager.fit(base, this.options.horizontal);

        this._renderer.renderItems(this.getItems());

        this._setContainerSize(this._getEdgeValue("end") || margin);

        base < 0 && this._watcher.scrollBy(-base);
      }; // called by visible


      __proto._fit = function (useFit) {
        if (useFit === void 0) {
          useFit = this.options.useFit;
        }

        var base = this._getEdgeValue("start");

        var margin = this._getLoadingStatus() === LOADING_PREPEND && this._status.loadingSize || 0;
        var _a = this.options,
            isConstantSize = _a.isConstantSize,
            isEqualSize = _a.isEqualSize,
            useRecycle = _a.useRecycle;

        if (!useRecycle || !useFit || isConstantSize || isEqualSize) {
          if (base < margin) {
            this._fitItems(base - margin, margin);
          }

          base = 0;
        } else if (base !== 0 || margin) {
          this._fitItems(base - margin, margin);
        } else {
          return 0;
        }

        this.isLoading() && this._renderLoading();
        return base;
      };

      __proto._getEdgeValue = function (cursor) {
        return this._infinite.getEdgeValue(cursor);
      };

      __proto._isProcessing = function () {
        return (this._status.processingStatus & PROCESSING) > 0;
      };

      __proto._getLoadingStatus = function () {
        return this._status.processingStatus & (LOADING_APPEND | LOADING_PREPEND);
      };

      __proto._process = function (status, isAdd) {
        if (isAdd === void 0) {
          isAdd = true;
        }

        if (isAdd) {
          this._status.processingStatus |= status;
        } else {
          this._status.processingStatus -= this._status.processingStatus & status;
        }
      };

      __proto._insert = function (_a) {
        var elements = _a.elements,
            isAppend = _a.isAppend,
            hasChildren = _a.hasChildren,
            _b = _a.groupKey,
            groupKey = _b === void 0 ? this._getRandomKey() : _b;

        if (this._isProcessing() || elements.length === 0) {
          return;
        }

        var items = ItemManager.toItems($(elements, true), groupKey);

        this._insertItems({
          items: items,
          isAppend: isAppend,
          hasChildren: hasChildren,
          groupKey: groupKey
        });
      };

      __proto._insertItems = function (_a) {
        var items = _a.items,
            isAppend = _a.isAppend,
            hasChildren = _a.hasChildren,
            _b = _a.groupKey,
            groupKey = _b === void 0 ? this._getRandomKey() : _b;

        if (!items.length) {
          return;
        }

        var group = this._itemManager[isAppend ? "appendGroup" : "prependGroup"]({
          groupKey: groupKey,
          items: items
        });

        if (!isAppend) {
          var infinite = this._infinite;

          var _c = infinite.getCursors(),
              startCursor = _c[0],
              endCursor = _c[1];

          infinite.setCursor("start", startCursor + 1);
          infinite.setCursor("end", endCursor + 1);
        }

        this._postLayout({
          fromCache: false,
          groups: [group],
          items: group.items,
          newItems: group.items,
          isAppend: isAppend,
          hasChildren: hasChildren,
          isTrusted: false
        });
      }; // add items, and remove items for recycling


      __proto._recycle = function (ranges) {
        var _this = this;

        var _a = this.options,
            useRecycle = _a.useRecycle,
            renderExternal = _a.renderExternal;

        if (!useRecycle) {
          return false;
        }

        var isRecycle = false;
        ranges.forEach(function (_a) {
          var start = _a.start,
              end = _a.end;

          if (start === -1 || end === -1 || end < start) {
            return;
          }

          var items = _this._itemManager.pluck("items", start, end);

          isRecycle = isRecycle || items.some(function (item) {
            return item.mounted;
          });
          items.forEach(function (item) {
            item.mounted = false;
          });

          if (!renderExternal) {
            DOMRenderer.removeItems(items);
          }
        });

        if (isRecycle) {
          this._requestGroups = [];
          this.trigger("render", {
            next: function () {}
          });
        }

        return isRecycle;
      };

      __proto._renderLoading = function (userStyle) {
        if (userStyle === void 0) {
          userStyle = this._status.loadingStyle;
        }

        if (!this.isLoading()) {
          return;
        }

        var isAppend = this._getLoadingStatus() === LOADING_APPEND;
        var el = this._loadingBar[isAppend ? "append" : "prepend"];

        if (!el) {
          return;
        }

        var style = assign({
          position: "absolute"
        }, userStyle);

        for (var property in style) {
          el.style[property] = style[property];
        }

        this._status.loadingSize = this.options.horizontal ? outerWidth(el) : outerHeight(el);
        var posName = this.options.horizontal ? "left" : "top";

        if (!(posName in style)) {
          var pos = isAppend ? this._getEdgeValue("end") : this._getEdgeValue("start") - this._status.loadingSize;
          el.style[posName] = pos + "px";
        }
      };

      __proto._updateItem = function (item) {
        if (item && item.el) {
          item.content = item.el.outerHTML;
          !this.options.isEqualSize && resetSize(item);

          this._renderer.updateSize([item]);

          return true;
        }

        return false;
      };

      __proto._setScrollPos = function (pos) {
        this._watcher.setScrollPos(this._watcher.getContainerOffset() + pos);
      };

      __proto._scrollTo = function (pos) {
        this._watcher.scrollTo(this._watcher.getContainerOffset() + pos);
      };

      __proto._postCache = function (_a) {
        var cache = _a.cache,
            isAppend = _a.isAppend,
            _b = _a.isTrusted,
            isTrusted = _b === void 0 ? true : _b;
        var isConstantSize = this.options.isConstantSize;
        var items = ItemManager.pluck(cache, "items");
        var fromCache = true;
        var newItems = items.filter(function (item) {
          if (!item.orgSize || !item.orgSize.width) {
            fromCache = false;
            return true;
          }

          return !isConstantSize && item.rect.top < DUMMY_POSITION / 10;
        });
        return this._postLayout({
          fromCache: fromCache,
          groups: cache,
          items: items,
          newItems: newItems,
          isAppend: isAppend,
          isTrusted: isTrusted
        });
      };

      __proto._postLayout = function (_a) {
        var _this = this;

        var fromCache = _a.fromCache,
            groups = _a.groups,
            _b = _a.items,
            items = _b === void 0 ? ItemManager.pluck(groups, "items") : _b,
            newItems = _a.newItems,
            isAppend = _a.isAppend,
            hasChildren = _a.hasChildren,
            isTrusted = _a.isTrusted;

        this._process(PROCESSING);

        if (!groups.length) {
          return;
        }

        var renderExternal = this.options.renderExternal;
        var renderer = this._renderer;
        var callbackComponent = new Component();

        var next = function () {
          items.forEach(function (item) {
            item.mounted = true;
          });

          _this._renderManager.render(callbackComponent, groups, newItems, isAppend).on("imageError", function (e) {
            /**
             * This event is fired when an error occurs in the image.
             * @ko 이미지 로드에 에러가 날 때 발생하는 이벤트.
             * @event eg.InfiniteGrid#imageError
             * @param {eg.InfiniteGrid.IErrorCallbackOptions} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {HTMLElement} [e.element] - Appending card's image element.<ko>추가 되는 카드의 이미지 엘리먼트</ko>
             * @param {target} [e.target] - The item's element with error images.<ko>에러난 이미지를 가지고 있는 아이템의 엘리먼트</ko>
             * @param {Item[]} [e.items] - The items being added.<ko>화면에 추가중인 아이템들</ko>
             * @param {Item} [e.item] - The item with error images.<ko>에러난 이미지를 가지고 있는 아이템</ko>
             * @param {number} [e.index]  - The item's index with error images.<ko>에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
             * @param {number} [e.totalIndex] - The item's index with error images in all items.<ko>전체 아이템중 에러난 이미지를 가지고 있는 아이템의 인덱스</ko>
             * @param {function} [e.remove] - In the imageError event, this method expects to remove the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 삭제한다.</ko>
             * @param {function} [e.removeItem] - In the imageError event, this method expects to remove the item with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템을 삭제한다.</ko>
             * @param {function} [e.replace] - In the imageError event, this method expects to replace the error image's source or element.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지의 주소 또는 엘리먼트를 교체한다.</ko>
             * @param {function} [e.replaceItem] - In the imageError event, this method expects to replace the item's contents with the error image.<ko>이미지 에러 이벤트에서 이 메서드는 에러난 이미지를 가지고 있는 아이템의 내용을 교체한다.</ko>
             * @example
            ig.on("imageError", e => {
                e.remove();
                e.removeItem();
                e.replace("http://...jpg");
                e.replace(imageElement);
                e.replaceItem("item html");
            });
            */
            _this.trigger("imageError", e);
          }).on("contentError", function (e) {
            /**
             * This event is fired when an error occurs in the content.
             * @ko 콘텐츠 로드에 에러가 날 때 발생하는 이벤트.
             * @event eg.InfiniteGrid#contentError
             * @param {eg.InfiniteGrid.IErrorCallbackOptions} e - The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
             * @param {HTMLElement} [e.element] - Appending card's image element.<ko>추가 되는 카드의 콘텐츠 엘리먼트</ko>
             * @param {target} [e.target] - The item's element with error images.<ko>에러난 콘텐츠를 가지고 있는 아이템의 엘리먼트</ko>
             * @param {Item[]} [e.items] - The items being added.<ko>화면에 추가중인 아이템들</ko>
             * @param {Item} [e.item] - The item with error images.<ko>에러난 콘텐츠를 가지고 있는 아이템</ko>
             * @param {number} [e.index]  - The item's index with error images.<ko>에러난 콘텐츠를 가지고 있는 아이템의 인덱스</ko>
             * @param {number} [e.totalIndex] - The item's index with error images in all items.<ko>전체 아이템중 에러난 콘텐츠를 가지고 있는 아이템의 인덱스</ko>
             * @param {function} [e.remove] - In the contentError event, this method expects to remove the error image.<ko>콘텐츠 에러 이벤트에서 이 메서드는 에러난 콘텐츠를 삭제한다.</ko>
             * @param {function} [e.removeItem] - In the contentError event, this method expects to remove the item with the error image.<ko>콘텐츠 에러 이벤트에서 이 메서드는 에러난 콘텐츠를 가지고 있는 아이템을 삭제한다.</ko>
             * @param {function} [e.replace] - In the contentError event, this method expects to replace the error image's source or element. If the replacement was done externally, call replace().<ko>콘텐츠 에러 이벤트에서 이 메서드는 에러난 엘리먼트를 교체한다. 외부에서 교체를 했다면 replace()로 호출해라.</ko>
             * @param {function} [e.replaceItem] - In the contentError event, this method expects to replace the item's contents with the error image.<ko>콘텐츠 에러 이벤트에서 이 메서드는 에러난 콘텐츠를 가지고 있는 아이템의 내용을 교체한다.</ko>
             * @example
            ig.on("contentError", e => {
                e.remove();
                e.removeItem();
                e.replace(imageElement);
                // If the replacement was done externally
                e.replace();
                e.replaceItem("item html");
            });
            */
            _this.trigger("contentError", e);
          }).on("renderComplete", function (_a) {
            var start = _a.start,
                end = _a.end;

            _this._setCursor(start, end);
          }).on("layoutComplete", function (_a) {
            var layoutItems = _a.items;

            _this._process(PROCESSING, false);

            _this._onLayoutComplete({
              items: layoutItems,
              isAppend: isAppend,
              fromCache: fromCache,
              isTrusted: isTrusted,
              useRecycle: false
            });
          }).on("readyElement", function (e) {
            _this._updateItem(e.item) && _this.layout(false);
          }).on("ready", function (_a) {
            var remove = _a.remove,
                layout = _a.layout;
            remove.forEach(function (el) {
              return _this.remove(el, false);
            });

            if (layout) {
              _this.layout(false);
            } else if (!_this.isProcessing() && _this.options.useRecycle) {
              var scroller = _this._watcher;
              var scrollPos = scroller.getScrollPos();

              _this._infinite.recycle(scrollPos, isAppend);
            }
          });
        };

        if (!hasChildren) {
          if (renderExternal) {
            if (items.every(function (item) {
              return item.mounted;
            })) {
              next();
            } else {
              this._requestGroups = groups;
              this.trigger("render", {
                next: function () {
                  !hasChildren && _this._renderer.renderItems(items);
                  next();
                }
              });
            }

            return callbackComponent;
          } else {
            // If container has children, it does not render first.
            renderer.createAndInsert(items, isAppend);
          }
        }

        next();
        return callbackComponent;
      }; // called by visible


      __proto._requestAppend = function (_a) {
        var _this = this;

        var cache = _a.cache;

        if (this._isProcessing()) {
          return;
        }

        if (cache && cache.length) {
          this._postCache({
            cache: cache,
            isAppend: true
          });
        } else {
          /**
           * This event is fired when a card element must be added at the bottom or right of a layout because there is no card to be displayed on screen when a user scrolls near bottom or right.
           * @ko 카드 엘리먼트가 레이아웃의 아래나 오른쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 아래나 오른쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다
           * @event eg.InfiniteGrid#append
           * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
           * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 마지막 그룹의 그룹키</ko>
           * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
           * @param {Function} param.startLoading Start loading for append loading data. <ko> 뒷쪽에 추가되는 데이터 로딩을 시작한다. </ko>
           * @param {Object} param.startLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩을 시작할 때 로딩 바에 적용될 사용자 스타일 </ko>
           * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
           * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
           */
          this.trigger("append", {
            isTrusted: true,
            groupKey: this.getGroupKeys().pop() || "",
            startLoading: function (userStyle) {
              _this.startLoading(true, userStyle);
            },
            endLoading: function (userStyle) {
              _this.endLoading(userStyle);
            }
          });
        }
      }; // called by visible


      __proto._requestPrepend = function (_a) {
        var _this = this;

        var cache = _a.cache;

        this._fit(this.options.useFit || !cache || !cache.length);

        if (this._isProcessing()) {
          return;
        }

        if (cache && cache.length) {
          this._postCache({
            cache: cache,
            isAppend: false
          });
        } else {
          /**
           * This event is fired when a card element must be added at the top or left of a layout because there is no card to be displayed on screen when a user scrolls near top or left.
           * @ko 카드가 레이아웃의 위나 왼쪽에 추가돼야 할 때 발생하는 이벤트. 사용자가 위나 왼쪽으로 스크롤해서 화면에 표시될 카드가 없을 때 발생한다.
           * @event eg.InfiniteGrid#prepend
           * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
           * @param {String|Number} groupKey The group key of the first group visible on the screen <ko>화면에 보여지는 첫번째 그룹의 그룹키</ko>
           * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
           * @param {Function} param.startLoading Start loading for prepend loading data. <ko> 앞쪽에 추가되는 데이터 로딩을 시작한다. </ko>
           * @param {Object} param.startLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩을 시작할 때 로딩 바에 적용될 사용자 스타일 </ko>
           * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
           * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
           */
          this.trigger("prepend", {
            isTrusted: true,
            groupKey: this.getGroupKeys().shift(),
            startLoading: function (userStyle) {
              _this.startLoading(false, userStyle);
            },
            endLoading: function (userStyle) {
              _this.endLoading(userStyle);
            }
          });
        }
      };

      __proto._onResize = function () {
        this.layout(true);
      };

      __proto._setCursor = function (start, end) {
        var infinite = this._infinite;

        var _a = infinite.getCursors(),
            startCursor = _a[0],
            endCursor = _a[1];

        infinite.setCursor("start", start);
        infinite.setCursor("end", end);

        var isRecycle = this._recycle([{
          start: startCursor,
          end: start - 1
        }, {
          start: end + 1,
          end: endCursor
        }]);

        if (!isRecycle) {
          this._requestGroups = [];
          this.trigger("render", {
            next: function () {}
          });
        }
      };

      __proto._onCheck = function (_a) {
        var isForward = _a.isForward,
            scrollPos = _a.scrollPos,
            horizontal = _a.horizontal,
            orgScrollPos = _a.orgScrollPos;
        /**
         * This event is fired when the user scrolls.
         * @ko 사용자가 스크롤 할 경우 발생하는 이벤트.
         * @event eg.InfiniteGrid#change
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Boolean} param.isForward Indicates whether the scroll progression direction is forward or backword. <ko>스크롤 진행방향이 앞쪽으로 진행하는 지, 뒤쪽으로 진행하는지를 나타낸다.</ko>
         * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
         * @param {Boolean} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
         * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
         * @param {Boolean} options.horizontal Direction of the scroll movement (true: horizontal, false: vertical) <ko>스크롤 이동 방향 (true 가로방향, false 세로방향</ko>
         */

        this.trigger("change", {
          isForward: isForward,
          horizontal: horizontal,
          scrollPos: scrollPos,
          orgScrollPos: orgScrollPos
        });

        this._infinite.scroll(scrollPos);
      };

      __proto._onLayoutComplete = function (_a) {
        var _this = this;

        var items = _a.items,
            isAppend = _a.isAppend,
            _b = _a.isTrusted,
            isTrusted = _b === void 0 ? false : _b,
            _c = _a.useRecycle,
            useRecycle = _c === void 0 ? this.options.useRecycle : _c,
            _d = _a.fromCache,
            fromCache = _d === void 0 ? false : _d,
            _e = _a.isLayout,
            isLayout = _e === void 0 ? false : _e;

        var viewSize = this._renderer.getViewSize();

        if (!isAppend) {
          this._fit();
        } else {
          this.isLoading() && this._renderLoading();
        }

        var watcher = this._watcher;
        var scrollPos = watcher.getScrollPos(); // recycle after _fit beacause prepend and append are occured simultaneously by scroll.

        if (!isLayout && useRecycle && !this.isLoading()) {
          this._infinite.recycle(scrollPos, isAppend);
        }

        var size = this._getEdgeValue("end");

        if (isAppend) {
          this._setContainerSize(size + this._status.loadingSize || 0);

          if (typeof scrollPos === "number" && scrollPos > 0) {
            !IS_IOS && this._scrollTo(scrollPos);
          }
        }
        /**
         * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
         * @ko 레이아웃 배치가 완료됐을 때 발생하는 이벤트. append() 메서드나 prepend() 메서드, layout() 메서드 호출 후 카드의 배치가 완료됐을 때 발생한다
         * @event eg.InfiniteGrid#layoutComplete
         *
         * @param {Object} param The object of data to be sent to an event <ko>이벤트에 전달되는 데이터 객체</ko>
         * @param {Array} param.target Rearranged card elements<ko>재배치된 카드 엘리먼트들</ko>
         * @param {Boolean} param.fromCache Check whether these items are cache or not <ko>해당 아이템들이 캐시인지 아닌지 확인한다.</ko>
         * @param {Boolean} param.isLayout Returns true if this is an event called by resize event or layout method. Returns false if this is an event called by adding an item. <ko>해당 이벤트가 리사이즈 이벤트 또는 layout() 메서드를 통해 호출됐으면 true, 아이템 추가로 호출됐으면 false를 반환한다.</ko>
         * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>카드 엘리먼트가 append() 메서드로 추가됐는지 확인한다. layout() 메서드가 호출된 후 layoutComplete 이벤트가 발생해도 'true'를 반환한다.</ko>
         * @param {Boolean} param.isScroll Checks whether scrolling has occurred after the append(), prepend(), ..., etc method is called <ko>append, prend 등 호출 후 스크롤이 생겼는지 확인한다.</ko>
         * @param {Number} param.scrollPos Current scroll position value relative to the infiniteGrid container element. <ko>infiniteGrid 컨테이너 엘리먼트 기준의 현재 스크롤 위치값</ko>
         * @param {Number} param.orgScrollPos Current position of the scroll <ko>현재 스크롤 위치값</ko>
         * @param {Number} param.size The size of container element <ko>컨테이너 엘리먼트의 크기</ko>
         * @param {Boolean} param.isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
         * @param {Function} param.endLoading End loading after startLoading() for append/prepend loading data. <ko>데이터 로딩을 위해 append/prepend startLoading() 호출 이후 로딩을 끝낸다.</ko>
         * @param {Object} param.endLoading.userStyle The custom style to apply to this loading bar for start. <ko> 로딩이 끝날 때 로딩 바에 적용될 사용자 스타일 </ko>
         */


        this.trigger("layoutComplete", {
          target: items.concat(),
          isAppend: !!isAppend,
          isTrusted: isTrusted,
          fromCache: fromCache,
          isLayout: isLayout,
          isScroll: viewSize < watcher.getContainerOffset() + size,
          scrollPos: scrollPos,
          orgScrollPos: watcher.getOrgScrollPos(),
          size: size,
          endLoading: function (userStyle) {
            _this.endLoading(userStyle);
          }
        });

        this._infinite.scroll(scrollPos);
      };

      __proto._firstLayout = function () {
        var renderer = this._renderer;
        var infinite = this._infinite;
        var itemManager = this._itemManager;
        var attributePrefix = this.options.attributePrefix;
        var children = toArray(renderer.container.children).filter(function (el) {
          return el.className.indexOf(IGNORE_CLASSNAME) === -1;
        });
        var hasChildren = children.length > 0;

        if (itemManager.size()) {
          // no visible items
          if (hasChildren) {
            itemManager.pluck("items").forEach(function (item, i) {
              item.el = children[i];
            });
          }
        } else {
          // no items, no visible items, no elements
          if (!hasChildren) {
            if (renderer.getContainerSize()) {
              renderer.setContainerSize(0);
            }

            this._requestAppend({});

            return this;
          } // no items, no visible items


          var prevGroupKey_1 = "" + this._getRandomKey();

          children.forEach(function (el) {
            var groupKey = el.getAttribute(attributePrefix + "groupkey");

            if (typeof groupKey !== "string") {
              groupKey = prevGroupKey_1;
            }

            prevGroupKey_1 = groupKey;
            itemManager.insert({
              groupKey: groupKey,
              el: el
            });
          });
        } // The currently displayed elements are visible groups.


        var groups = itemManager.getGroups();
        infinite.setCursor("start", 0);
        infinite.setCursor("end", groups.length - 1);

        this._postLayout({
          groups: groups,
          hasChildren: hasChildren,
          fromCache: false,
          isAppend: true
        });

        return this;
      };

      __proto._getRandomKey = function () {
        var itemManager = this._itemManager;

        while (true) {
          var groupKey = new Date().getTime() + Math.floor(Math.random() * 1000);

          if (!itemManager.getGroupByKey(groupKey)) {
            return groupKey;
          }
        }
      };

      __proto._reset = function () {
        this._status = {
          processingStatus: IDLE,
          loadingSize: 0,
          loadingStyle: {}
        };
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.InfiniteGrid.VERSION;  // ex) 3.3.3
       * @memberof eg.InfiniteGrid
       */


      InfiniteGrid.VERSION = "3.8.4";
      return InfiniteGrid;
    }(Component);

    var BoxModel =
    /*#__PURE__*/
    function () {
      function BoxModel(options) {
        assign(this, {
          originWidth: 0,
          originHeight: 0,
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          items: []
        }, options);
      }

      var __proto = BoxModel.prototype;

      __proto.scaleTo = function (width, height) {
        var scaleX = this.width ? width / this.width : 0;
        var scaleY = this.height ? height / this.height : 0;
        this.items.forEach(function (v) {
          if (scaleX !== 0) {
            v.left *= scaleX;
            v.width *= scaleX;
          }

          if (scaleY !== 0) {
            v.top *= scaleY;
            v.height *= scaleY;
          }
        });
        this.width = width;
        this.height = height;
      };

      __proto.push = function (item) {
        this.items.push(item);
      };

      __proto.getOriginSize = function () {
        return this.originWidth * this.originHeight;
      };

      __proto.getSize = function () {
        return this.width * this.height;
      };

      __proto.getOriginRatio = function () {
        return this.originHeight === 0 ? 0 : this.originWidth / this.originHeight;
      };

      __proto.getRatio = function () {
        return this.height === 0 ? 0 : this.width / this.height;
      };

      return BoxModel;
    }();

    function getCost(originLength, length) {
      var cost = originLength / length;

      if (cost < 1) {
        cost = 1 / cost;
      }

      return cost - 1;
    }

    function fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical) {
      item.height = itemFitSize.height;
      item.width = itemFitSize.width;
      bestFitArea.height = containerFitSize.height;
      bestFitArea.width = containerFitSize.width;

      if (layoutVertical) {
        item.top = bestFitArea.top + bestFitArea.height;
        item.left = bestFitArea.left;
      } else {
        item.left = bestFitArea.left + bestFitArea.width;
        item.top = bestFitArea.top;
      }
    }
    /**
     * @classdesc The PackingLayout is a layout that shows the important cards bigger without sacrificing the weight of the cards. Rows and columns are separated so that cards are dynamically placed within the horizontal and vertical space rather than arranged in an orderly fashion.
     * @ko PackingLayout은 카드의 본래 크기에 따른 비중을 해치지 않으면서 중요한 카드는 더 크게 보여 주는 레이아웃이다. 행과 열이 구분돼 이미지를 정돈되게 배치하는 대신 가로세로 일정 공간 내에서 동적으로 카드를 배치한다.
     * @class eg.InfiniteGrid.PackingLayout
     * @param {Object} [options] The option object of eg.InfiniteGrid.PackingLayout module <ko>eg.InfiniteGrid.PackingLayout 모듈의 옵션 객체</ko>
     * @param {String} [options.margin=0] Margin used to create space around items <ko>아이템들 사이의 공간</ko>
     * @param {Boolean} [options.horizontal=false] Direction of the scroll movement (false: vertical, true: horizontal) <ko>스크롤 이동 방향 (false: 세로방향, true: 가로방향)</ko>
     * @param {Boolean} [options.aspectRatio=1] The aspect ratio of the group <ko> 그룹의 가로 세로 비 </ko>
     * @param {Boolean} [options.sizeWeight=1] The size weight when placing an image <ko> 이미지를 배치할 때 사이즈 가중치 </ko>
     * @param {Boolean} [options.ratioWeight=1] The ratio weight when placing an image <ko> 이미지를 배치할 때 비율 가중치 </ko>
     * @example
    ```
    <script>
    var ig = new eg.InfiniteGrid("#grid". {
      horizontal: true,
    });

    ig.setLayout(eg.InfiniteGrid.PackingLayout, {
      margin: 10,
      aspectRatio: 1,
      sizeWeight: 1,
      ratioWeight: 2,
    });

    // or

    var layout = new eg.InfiniteGrid.PackingLayout({
      horizontal: true,
      margin: 10,
      aspectRatio: 1,
      sizeWeight: 1,
      ratioWeight: 2,
    });

    </script>
    ```
     **/


    var PackingLayout =
    /*#__PURE__*/
    function () {
      function PackingLayout(options) {
        if (options === void 0) {
          options = {};
        }

        this.options = assignOptions({
          margin: 0,
          horizontal: false,
          aspectRatio: 1,
          sizeWeight: 1,
          ratioWeight: 1
        }, options);
        this._size = 0;
        this._style = getStyleNames(this.options.horizontal);
      }
      /**
       * Adds items at the bottom of a outline.
       * @ko 아이템들을 아웃라인 아래에 추가한다.
       * @method eg.InfiniteGrid.PackingLayout#append
       * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
       * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
       * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
       * @example
       * layout.prepend(items, [100]);
       */


      var __proto = PackingLayout.prototype;

      __proto.append = function (items, outline, cache) {
        return this._insert(items, outline, true, cache);
      };
      /**
       * Adds items at the top of a outline.
       * @ko 아이템을 아웃라인 위에 추가한다.
       * @method eg.InfiniteGrid.PackingLayout#prepend
       * @param {Array} items Array of items to be layouted <ko>레이아웃할 아이템들의 배열</ko>
       * @param {Array} [outline=[]] Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
       * @return {Object} Layouted items and outline of start and end <ko> 레이아웃이 된 아이템과 시작과 끝의 아웃라인이 담긴 정보</ko>
       * @example
       * layout.prepend(items, [100]);
       */


      __proto.prepend = function (items, outline, cache) {
        return this._insert(items, outline, false, cache);
      };
      /**
       * Adds items of groups at the bottom of a outline.
       * @ko 그룹들의 아이템들을 아웃라인 아래에 추가한다.
       * @method eg.InfiniteGrid.PackingLayout#layout
       * @param {Array} groups Array of groups to be layouted <ko>레이아웃할 그룹들의 배열</ko>
       * @param {Array} outline Array of outline points to be reference points <ko>기준점이 되는 아웃라인 점들의 배열</ko>
       * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
       * layout.layout(groups, [100, 200, 300, 400]);
       */


      __proto.layout = function (groups, outline) {
        if (groups === void 0) {
          groups = [];
        }

        if (outline === void 0) {
          outline = [];
        }

        var length = groups.length;
        var point = outline;

        for (var i = 0; i < length; ++i) {
          var group = groups[i];

          var outlines = this._layout(group.items, point, true);

          group.outlines = outlines;
          point = outlines.end;
        }

        return this;
      };
      /**
       * Set the viewport size of the layout.
       * @ko 레이아웃의 가시 사이즈를 설정한다.
       * @method eg.InfiniteGrid.PackingLayout#setSize
       * @param {Number} size The viewport size of container area where items are added to a layout <ko>레이아웃에 아이템을 추가하는 컨테이너 영역의 가시 사이즈</ko>
       * @return {eg.InfiniteGrid.PackingLayout} An instance of a module itself<ko>모듈 자신의 인스턴스</ko>
       * @example
       * layout.setSize(800);
       */


      __proto.setSize = function (size) {
        this._size = size;
        return this;
      };

      __proto._findBestFitArea = function (container, item) {
        if (container.getRatio() === 0) {
          // 아이템 최초 삽입시 전체영역 지정
          container.originWidth = item.width;
          container.originHeight = item.height;
          container.width = item.width;
          container.height = item.height;
          return;
        }

        var bestFitArea;
        var minCost = 10000000;
        var layoutVertical = false;
        var itemFitSize = {
          width: 0,
          height: 0
        };
        var containerFitSize = {
          width: 0,
          height: 0
        };
        var _a = this.options,
            sizeWeight = _a.sizeWeight,
            ratioWeight = _a.ratioWeight;
        container.items.forEach(function (v) {
          var containerSizeCost = getCost(v.getOriginSize(), v.getSize()) * sizeWeight;
          var containerRatioCost = getCost(v.getOriginRatio(), v.getRatio()) * ratioWeight;
          var width = v.width;
          var height = v.height;
          var cost;

          for (var i = 0; i < 2; ++i) {
            var itemWidth = void 0;
            var itemHeight = void 0;
            var containerWidth = void 0;
            var containerHeight = void 0;

            if (i === 0) {
              // 상하에 아이템 추가
              itemWidth = width;
              itemHeight = height * (item.height / (v.originHeight + item.height));
              containerWidth = width;
              containerHeight = height - itemHeight;
            } else {
              // 좌우에 아이템 추가
              itemHeight = height;
              itemWidth = width * (item.width / (v.originWidth + item.width));
              containerHeight = height;
              containerWidth = width - itemWidth;
            }

            var itemSize = itemWidth * itemHeight;
            var itemRatio = itemWidth / itemHeight;
            var containerSize = containerWidth * containerHeight;
            var containerRatio = containerHeight / containerHeight;
            cost = getCost(item.getSize(), itemSize) * sizeWeight;
            cost += getCost(item.getRatio(), itemRatio) * ratioWeight;
            cost += getCost(v.getOriginSize(), containerSize) * sizeWeight - containerSizeCost;
            cost += getCost(v.getOriginRatio(), containerRatio) * ratioWeight - containerRatioCost;

            if (cost === Math.min(cost, minCost)) {
              minCost = cost;
              bestFitArea = v;
              layoutVertical = i === 0;
              itemFitSize.width = itemWidth;
              itemFitSize.height = itemHeight;
              containerFitSize.width = containerWidth;
              containerFitSize.height = containerHeight;
            }
          }
        });
        fitArea(item, bestFitArea, itemFitSize, containerFitSize, layoutVertical);
      };

      __proto._layout = function (items, outline, isAppend) {
        var _this = this;

        if (outline === void 0) {
          outline = [];
        }

        var style = this._style;
        var _a = this.options,
            horizontal = _a.horizontal,
            aspectRatio = _a.aspectRatio,
            margin = _a.margin;
        var pos1Name = style.startPos1;
        var containerWidth = this._size * (horizontal ? aspectRatio : 1);
        var containerHeight = this._size / (horizontal ? 1 : aspectRatio);
        var containerSize1 = horizontal ? containerWidth : containerHeight;
        var prevOutline = toZeroArray(outline);
        var start = isAppend ? Math.max.apply(Math, prevOutline) : Math.min.apply(Math, prevOutline) - containerSize1 - margin;
        var end = start + containerSize1 + margin;
        var container = new BoxModel({});
        items.forEach(function (item) {
          var _a = item.orgSize,
              width = _a.width,
              height = _a.height;
          var model = new BoxModel({
            width: width,
            height: height,
            originWidth: width,
            originHeight: height
          });

          _this._findBestFitArea(container, model);

          container.push(model);
          container.scaleTo(containerWidth + margin, containerHeight + margin);
        });
        items.forEach(function (item, i) {
          var boxItem = container.items[i];
          var width = boxItem.width;
          var height = boxItem.height;
          var top = boxItem.top;
          var left = boxItem.left;
          item.rect = {
            top: top,
            left: left,
            width: width - margin,
            height: height - margin
          };
          item.rect[pos1Name] += start;
        });
        return {
          start: [start],
          end: [end]
        };
      };

      __proto._insert = function (items, outline, isAppend, cache) {
        if (items === void 0) {
          items = [];
        }

        if (outline === void 0) {
          outline = [];
        } // this only needs the size of the item.


        var clone = cache ? items : cloneItems(items);
        return {
          items: clone,
          outlines: this._layout(clone, outline, isAppend)
        };
      };

      return PackingLayout;
    }();

    /**
     * Copyright (c) NAVER Corp.
     * egjs-infinitegrid projects are licensed under the MIT license
     */
    InfiniteGrid.PackingLayout = PackingLayout;

    return InfiniteGrid;

})));
//# sourceMappingURL=infinitegrid.packinglayout.js.map
