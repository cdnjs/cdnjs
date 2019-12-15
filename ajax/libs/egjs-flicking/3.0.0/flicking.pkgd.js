/*
Copyright (c) 2017 NAVER Corp.
@egjs/flicking JavaScript library
@egjs/flicking project is licensed under the MIT license

https://github.com/naver/egjs-flicking
@version 3.0.0
All-in-one packaged file for ease use of '@egjs/flicking' with below dependencies.
- @egjs/axes ^2.5.12, @egjs/component ^2.1.2
NOTE: This is not an official distribution file and is only for user convenience.

*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, (global.eg = global.eg || {}, global.eg.Flicking = factory()));
}(this, function () { 'use strict';

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

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/component project is licensed under the MIT license

    @egjs/component JavaScript library
    https://naver.github.io/egjs-component

    @version 2.1.2
    */

    /**
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
      var Component =
      /*#__PURE__*/
      function () {
        /**
        * Version info string
        * @ko 버전정보 문자열
        * @name VERSION
        * @static
        * @type {String}
        * @example
        * eg.Component.VERSION;  // ex) 2.0.0
        * @memberof eg.Component
        */

        /**
         * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
         */
        function Component() {
          this._eventHandler = {};
          this.options = {};
        }
        /**
         * Triggers a custom event.
         * @ko 커스텀 이벤트를 발생시킨다
         * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
         * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
         * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
         * @example
        class Some extends eg.Component {
         some(){
         	if(this.trigger("beforeHi")){ // When event call to stop return false.
        	this.trigger("hi");// fire hi event.
         	}
         }
        }
        const some = new Some();
        some.on("beforeHi", (e) => {
        if(condition){
        	e.stop(); // When event call to stop, `hi` event not call.
        }
        });
        some.on("hi", (e) => {
        // `currentTarget` is component instance.
        console.log(some === e.currentTarget); // true
        });
        // If you want to more know event design. You can see article.
        // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
         */


        var _proto = Component.prototype;

        _proto.trigger = function trigger(eventName, customEvent) {
          if (customEvent === void 0) {
            customEvent = {};
          }

          var handlerList = this._eventHandler[eventName] || [];
          var hasHandlerList = handlerList.length > 0;

          if (!hasHandlerList) {
            return true;
          } // If detach method call in handler in first time then handler list calls.


          handlerList = handlerList.concat();
          customEvent.eventType = eventName;
          var isCanceled = false;
          var arg = [customEvent];
          var i = 0;

          customEvent.stop = function () {
            isCanceled = true;
          };

          customEvent.currentTarget = this;

          for (var _len = arguments.length, restParam = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            restParam[_key - 2] = arguments[_key];
          }

          if (restParam.length >= 1) {
            arg = arg.concat(restParam);
          }

          for (i = 0; handlerList[i]; i++) {
            handlerList[i].apply(this, arg);
          }

          return !isCanceled;
        };
        /**
         * Executed event just one time.
         * @ko 이벤트가 한번만 실행된다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           alert("hi");
         }
         thing() {
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


        _proto.once = function once(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var i;

            for (i in eventHash) {
              this.once(i, eventHash[i]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var self = this;
            this.on(eventName, function listener() {
              for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
              }

              handlerToAttach.apply(self, arg);
              self.off(eventName, listener);
            });
          }

          return this;
        };
        /**
         * Checks whether an event has been attached to a component.
         * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
         * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
         * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
         * @example
        class Some extends eg.Component {
         some() {
           this.hasOn("hi");// check hi event.
         }
        }
         */


        _proto.hasOn = function hasOn(eventName) {
          return !!this._eventHandler[eventName];
        };
        /**
         * Attaches an event to a component.
         * @ko 컴포넌트에 이벤트를 등록한다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.on("hi",this.hi); //attach event
         }
        }
        */


        _proto.on = function on(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var name;

            for (name in eventHash) {
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
         * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
         * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.off("hi",this.hi); //detach event
         }
        }
         */


        _proto.off = function off(eventName, handlerToDetach) {
          // All event detach.
          if (isUndefined(eventName)) {
            this._eventHandler = {};
            return this;
          } // All handler of specific event detach.


          if (isUndefined(handlerToDetach)) {
            if (typeof eventName === "string") {
              this._eventHandler[eventName] = undefined;
              return this;
            } else {
              var eventHash = eventName;
              var name;

              for (name in eventHash) {
                this.off(name, eventHash[name]);
              }

              return this;
            }
          } // The handler of specific event detach.


          var handlerList = this._eventHandler[eventName];

          if (handlerList) {
            var k;
            var handlerFunction;

            for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
              if (handlerFunction === handlerToDetach) {
                handlerList = handlerList.splice(k, 1);
                break;
              }
            }
          }

          return this;
        };

        return Component;
      }();

      Component.VERSION = "2.1.2";
      return Component;
    }();

    /*! Hammer.JS - v2.0.15 - 2019-04-04
     * http://naver.github.io/egjs
     *
     * Forked By Naver egjs
     * Copyright (c) hammerjs
     * Licensed under the MIT license */
    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }
    /**
     * @private
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

    var assign$1 = assign;
    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
    var TEST_ELEMENT = typeof document === "undefined" ? {
      style: {}
    } : document.createElement('div');
    var TYPE_FUNCTION = 'function';
    var round = Math.round,
        abs = Math.abs;
    var now = Date.now;
    /**
     * @private
     * get the prefixed property
     * @param {Object} obj
     * @param {String} property
     * @returns {String|Undefined} prefixed
     */

    function prefixed(obj, property) {
      var prefix;
      var prop;
      var camelProp = property[0].toUpperCase() + property.slice(1);
      var i = 0;

      while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = prefix ? prefix + camelProp : property;

        if (prop in obj) {
          return prop;
        }

        i++;
      }

      return undefined;
    }
    /* eslint-disable no-new-func, no-nested-ternary */


    var win;

    if (typeof window === "undefined") {
      // window is undefined in node.js
      win = {};
    } else {
      win = window;
    }

    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

    function getTouchActionProps() {
      if (!NATIVE_TOUCH_ACTION) {
        return false;
      }

      var touchMap = {};
      var cssSupports = win.CSS && win.CSS.supports;
      ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
      });
      return touchMap;
    }

    var TOUCH_ACTION_COMPUTE = 'compute';
    var TOUCH_ACTION_AUTO = 'auto';
    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

    var TOUCH_ACTION_NONE = 'none';
    var TOUCH_ACTION_PAN_X = 'pan-x';
    var TOUCH_ACTION_PAN_Y = 'pan-y';
    var TOUCH_ACTION_MAP = getTouchActionProps();
    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
    var SUPPORT_TOUCH = 'ontouchstart' in win;
    var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
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
     * @private
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
     * @private
     * let a boolean value also be a function that must return a boolean
     * this first item in args will be used as the context
     * @param {Boolean|Function} val
     * @param {Array} [args]
     * @returns {Boolean}
     */


    function boolOrFn(val, args) {
      if (typeof val === TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
      }

      return val;
    }
    /**
     * @private
     * small indexOf wrapper
     * @param {String} str
     * @param {String} find
     * @returns {Boolean} found
     */


    function inStr(str, find) {
      return str.indexOf(find) > -1;
    }
    /**
     * @private
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
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
      // for different directions, e.g. horizontal pan but vertical swipe?)
      // we need none (as otherwise with pan-x pan-y combined none of these
      // recognizers will work, since the browser would handle all panning

      if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
      } // pan-x OR pan-y


      if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
      } // manipulation


      if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
      }

      return TOUCH_ACTION_AUTO;
    }
    /**
     * @private
     * Touch Action
     * sets the touchAction property or uses the js alternative
     * @param {Manager} manager
     * @param {String} value
     * @constructor
     */


    var TouchAction =
    /*#__PURE__*/
    function () {
      function TouchAction(manager, value) {
        this.manager = manager;
        this.set(value);
      }
      /**
       * @private
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */


      var _proto = TouchAction.prototype;

      _proto.set = function set(value) {
        // find out the touch-action by the event handlers
        if (value === TOUCH_ACTION_COMPUTE) {
          value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
          this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }

        this.actions = value.toLowerCase().trim();
      };
      /**
       * @private
       * just re-set the touchAction value
       */


      _proto.update = function update() {
        this.set(this.manager.options.touchAction);
      };
      /**
       * @private
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */


      _proto.compute = function compute() {
        var actions = [];
        each(this.manager.recognizers, function (recognizer) {
          if (boolOrFn(recognizer.options.enable, [recognizer])) {
            actions = actions.concat(recognizer.getTouchAction());
          }
        });
        return cleanTouchActions(actions.join(' '));
      };
      /**
       * @private
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */


      _proto.preventDefaults = function preventDefaults(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection; // if the touch action did prevented once this session

        if (this.manager.session.prevented) {
          srcEvent.preventDefault();
          return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
          // do not prevent defaults if this is a tap gesture
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

        if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
          return this.preventSrc(srcEvent);
        }
      };
      /**
       * @private
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */


      _proto.preventSrc = function preventSrc(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
      };

      return TouchAction;
    }();
    /**
     * @private
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */


    function hasParent(node, parent) {
      while (node) {
        if (node === parent) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    }
    /**
     * @private
     * get the center of all the pointers
     * @param {Array} pointers
     * @return {Object} center contains `x` and `y` properties
     */


    function getCenter(pointers) {
      var pointersLength = pointers.length; // no need to loop when only one touch

      if (pointersLength === 1) {
        return {
          x: round(pointers[0].clientX),
          y: round(pointers[0].clientY)
        };
      }

      var x = 0;
      var y = 0;
      var i = 0;

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
     * @private
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
     * @private
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

      var x = p2[props[0]] - p1[props[0]];
      var y = p2[props[1]] - p1[props[1]];
      return Math.sqrt(x * x + y * y);
    }
    /**
     * @private
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

      var x = p2[props[0]] - p1[props[0]];
      var y = p2[props[1]] - p1[props[1]];
      return Math.atan2(y, x) * 180 / Math.PI;
    }
    /**
     * @private
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

    function computeDeltaXY(session, input) {
      var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
      // jscs throwing error on defalut destructured values and without defaults tests fail

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
     * @private
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
     * @private
     * calculate the scale factor between two pointersets
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} scale
     */


    function getScale(start, end) {
      return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
    }
    /**
     * @private
     * calculate the rotation degrees between two pointersets
     * @param {Array} start array of pointers
     * @param {Array} end array of pointers
     * @return {Number} rotation
     */


    function getRotation(start, end) {
      return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
    }
    /**
     * @private
     * velocity is calculated every x ms
     * @param {Object} session
     * @param {Object} input
     */


    function computeIntervalInputData(session, input) {
      var last = session.lastInterval || input;
      var deltaTime = input.timeStamp - last.timeStamp;
      var velocity;
      var velocityX;
      var velocityY;
      var direction;

      if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;
        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
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
    * @private
     * extend the data with some usable properties like scale, rotate, velocity etc
     * @param {Object} manager
     * @param {Object} input
     */


    function computeInputData(manager, input) {
      var session = manager.session;
      var pointers = input.pointers;
      var pointersLength = pointers.length; // store the first input to calculate the distance and direction

      if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
      } // to compute scale and rotation we need to store the multiple touches


      if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
      } else if (pointersLength === 1) {
        session.firstMultiple = false;
      }

      var firstInput = session.firstInput,
          firstMultiple = session.firstMultiple;
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
      input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
      input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
      input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
      input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
      computeIntervalInputData(session, input); // find the correct target

      var target = manager.element;

      if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
      }

      input.target = target;
    }
    /**
     * @private
     * handle input events
     * @param {Manager} manager
     * @param {String} eventType
     * @param {Object} input
     */


    function inputHandler(manager, eventType, input) {
      var pointersLen = input.pointers.length;
      var changedPointersLen = input.changedPointers.length;
      var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
      var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
      input.isFirst = !!isFirst;
      input.isFinal = !!isFinal;

      if (isFirst) {
        manager.session = {};
      } // source event is the normalized value of the domEvents
      // like 'touchstart, mouseup, pointerdown'


      input.eventType = eventType; // compute scale, rotation etc

      computeInputData(manager, input); // emit secret event

      manager.emit('hammer.input', input);
      manager.recognize(input);
      manager.session.prevInput = input;
    }
    /**
     * @private
     * split string on whitespace
     * @param {String} str
     * @returns {Array} words
     */


    function splitStr(str) {
      return str.trim().split(/\s+/g);
    }
    /**
     * @private
     * addEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */


    function addEventListeners(target, types, handler) {
      each(splitStr(types), function (type) {
        target.addEventListener(type, handler, false);
      });
    }
    /**
     * @private
     * removeEventListener with multiple events at once
     * @param {EventTarget} target
     * @param {String} types
     * @param {Function} handler
     */


    function removeEventListeners(target, types, handler) {
      each(splitStr(types), function (type) {
        target.removeEventListener(type, handler, false);
      });
    }
    /**
     * @private
     * get the window object of an element
     * @param {HTMLElement} element
     * @returns {DocumentView|Window}
     */


    function getWindowForElement(element) {
      var doc = element.ownerDocument || element;
      return doc.defaultView || doc.parentWindow || window;
    }
    /**
     * @private
     * create new input type manager
     * @param {Manager} manager
     * @param {Function} callback
     * @returns {Input}
     * @constructor
     */


    var Input =
    /*#__PURE__*/
    function () {
      function Input(manager, callback) {
        var self = this;
        this.manager = manager;
        this.callback = callback;
        this.element = manager.element;
        this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
        // so when disabled the input events are completely bypassed.

        this.domHandler = function (ev) {
          if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
          }
        };

        this.init();
      }
      /**
       * @private
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */


      var _proto = Input.prototype;

      _proto.handler = function handler() {};
      /**
       * @private
       * bind the events
       */


      _proto.init = function init() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      };
      /**
       * @private
       * unbind the events
       */


      _proto.destroy = function destroy() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
      };

      return Input;
    }();
    /**
     * @private
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
          if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
            // do not use === here, test fails
            return i;
          }

          i++;
        }

        return -1;
      }
    }

    var POINTER_INPUT_MAP = {
      pointerdown: INPUT_START,
      pointermove: INPUT_MOVE,
      pointerup: INPUT_END,
      pointercancel: INPUT_CANCEL,
      pointerout: INPUT_CANCEL
    }; // in IE10 the pointer types is defined as an enum

    var IE10_POINTER_TYPE_ENUM = {
      2: INPUT_TYPE_TOUCH,
      3: INPUT_TYPE_PEN,
      4: INPUT_TYPE_MOUSE,
      5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

    };
    var POINTER_ELEMENT_EVENTS = 'pointerdown';
    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

    if (win.MSPointerEvent && !win.PointerEvent) {
      POINTER_ELEMENT_EVENTS = 'MSPointerDown';
      POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
    }
    /**
     * @private
     * Pointer events input
     * @constructor
     * @extends Input
     */


    var PointerEventInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(PointerEventInput, _Input);

      function PointerEventInput() {
        var _this;

        var proto = PointerEventInput.prototype;
        proto.evEl = POINTER_ELEMENT_EVENTS;
        proto.evWin = POINTER_WINDOW_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.store = _this.manager.session.pointerEvents = [];
        return _this;
      }
      /**
       * @private
       * handle mouse events
       * @param {Object} ev
       */


      var _proto = PointerEventInput.prototype;

      _proto.handler = function handler(ev) {
        var store = this.store;
        var removePointer = false;
        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
        var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

        var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
          if (storeIndex < 0) {
            store.push(ev);
            storeIndex = store.length - 1;
          }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
          removePointer = true;
        } // it not found, so the pointer hasn't been down (so it's probably a hover)


        if (storeIndex < 0) {
          return;
        } // update the event in the store


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
      };

      return PointerEventInput;
    }(Input);
    /**
     * @private
     * convert array-like objects to real arrays
     * @param {Object} obj
     * @returns {Array}
     */


    function toArray(obj) {
      return Array.prototype.slice.call(obj, 0);
    }
    /**
     * @private
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
          results = results.sort(function (a, b) {
            return a[key] > b[key];
          });
        }
      }

      return results;
    }

    var TOUCH_INPUT_MAP = {
      touchstart: INPUT_START,
      touchmove: INPUT_MOVE,
      touchend: INPUT_END,
      touchcancel: INPUT_CANCEL
    };
    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
    /**
     * @private
     * Multi-user touch events input
     * @constructor
     * @extends Input
     */

    var TouchInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(TouchInput, _Input);

      function TouchInput() {
        var _this;

        TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

        return _this;
      }

      var _proto = TouchInput.prototype;

      _proto.handler = function handler(ev) {
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
      };

      return TouchInput;
    }(Input);

    function getTouches(ev, type) {
      var allTouches = toArray(ev.touches);
      var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

      if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
      }

      var i;
      var targetTouches;
      var changedTouches = toArray(ev.changedTouches);
      var changedTargetTouches = [];
      var target = this.target; // get target touches from touches

      targetTouches = allTouches.filter(function (touch) {
        return hasParent(touch.target, target);
      }); // collect touches

      if (type === INPUT_START) {
        i = 0;

        while (i < targetTouches.length) {
          targetIds[targetTouches[i].identifier] = true;
          i++;
        }
      } // filter changed touches to only contain touches that exist in the collected target ids


      i = 0;

      while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
          changedTargetTouches.push(changedTouches[i]);
        } // cleanup removed touches


        if (type & (INPUT_END | INPUT_CANCEL)) {
          delete targetIds[changedTouches[i].identifier];
        }

        i++;
      }

      if (!changedTargetTouches.length) {
        return;
      }

      return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
      uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
    }

    var MOUSE_INPUT_MAP = {
      mousedown: INPUT_START,
      mousemove: INPUT_MOVE,
      mouseup: INPUT_END
    };
    var MOUSE_ELEMENT_EVENTS = 'mousedown';
    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
    /**
     * @private
     * Mouse events input
     * @constructor
     * @extends Input
     */

    var MouseInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(MouseInput, _Input);

      function MouseInput() {
        var _this;

        var proto = MouseInput.prototype;
        proto.evEl = MOUSE_ELEMENT_EVENTS;
        proto.evWin = MOUSE_WINDOW_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.pressed = false; // mousedown state

        return _this;
      }
      /**
       * @private
       * handle mouse events
       * @param {Object} ev
       */


      var _proto = MouseInput.prototype;

      _proto.handler = function handler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

        if (eventType & INPUT_START && ev.button === 0) {
          this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
          eventType = INPUT_END;
        } // mouse must be down


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
      };

      return MouseInput;
    }(Input);
    /**
     * @private
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

    function setLastTouch(eventData) {
      var _eventData$changedPoi = eventData.changedPointers,
          touch = _eventData$changedPoi[0];

      if (touch.identifier === this.primaryTouch) {
        var lastTouch = {
          x: touch.clientX,
          y: touch.clientY
        };
        var lts = this.lastTouches;
        this.lastTouches.push(lastTouch);

        var removeLastTouch = function removeLastTouch() {
          var i = lts.indexOf(lastTouch);

          if (i > -1) {
            lts.splice(i, 1);
          }
        };

        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
      }
    }

    function recordTouches(eventType, eventData) {
      if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
      }
    }

    function isSyntheticEvent(eventData) {
      var x = eventData.srcEvent.clientX;
      var y = eventData.srcEvent.clientY;

      for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x);
        var dy = Math.abs(y - t.y);

        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
          return true;
        }
      }

      return false;
    }

    var TouchMouseInput =
    /*#__PURE__*/
    function () {
      var TouchMouseInput =
      /*#__PURE__*/
      function (_Input) {
        _inheritsLoose(TouchMouseInput, _Input);

        function TouchMouseInput(_manager, callback) {
          var _this;

          _this = _Input.call(this, _manager, callback) || this;

          _this.handler = function (manager, inputEvent, inputData) {
            var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
            var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
              return;
            } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


            if (isTouch) {
              recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
            } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
              return;
            }

            _this.callback(manager, inputEvent, inputData);
          };

          _this.touch = new TouchInput(_this.manager, _this.handler);
          _this.mouse = new MouseInput(_this.manager, _this.handler);
          _this.primaryTouch = null;
          _this.lastTouches = [];
          return _this;
        }
        /**
         * @private
         * handle mouse and touch events
         * @param {Hammer} manager
         * @param {String} inputEvent
         * @param {Object} inputData
         */


        var _proto = TouchMouseInput.prototype;
        /**
         * @private
         * remove the event listeners
         */

        _proto.destroy = function destroy() {
          this.touch.destroy();
          this.mouse.destroy();
        };

        return TouchMouseInput;
      }(Input);

      return TouchMouseInput;
    }();
    /**
     * @private
     * create new input type manager
     * called by the Manager constructor
     * @param {Hammer} manager
     * @returns {Input}
     */


    function createInputInstance(manager) {
      var Type; // let inputClass = manager.options.inputClass;

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

      return new Type(manager, inputHandler);
    }
    /**
     * @private
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

    var STATE_POSSIBLE = 1;
    var STATE_BEGAN = 2;
    var STATE_CHANGED = 4;
    var STATE_ENDED = 8;
    var STATE_RECOGNIZED = STATE_ENDED;
    var STATE_CANCELLED = 16;
    var STATE_FAILED = 32;
    /**
     * @private
     * get a unique id
     * @returns {number} uniqueId
     */

    var _uniqueId = 1;

    function uniqueId() {
      return _uniqueId++;
    }
    /**
     * @private
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
     * @private
     * get a usable string, used as event postfix
     * @param {constant} state
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
     * @private
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

    /**
     * @private
     * Recognizer
     * Every recognizer needs to extend from this class.
     * @constructor
     * @param {Object} options
     */


    var Recognizer =
    /*#__PURE__*/
    function () {
      function Recognizer(options) {
        if (options === void 0) {
          options = {};
        }

        this.options = _extends({
          enable: true
        }, options);
        this.id = uniqueId();
        this.manager = null; // default is enable true

        this.state = STATE_POSSIBLE;
        this.simultaneous = {};
        this.requireFail = [];
      }
      /**
       * @private
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */


      var _proto = Recognizer.prototype;

      _proto.set = function set(options) {
        assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

        this.manager && this.manager.touchAction.update();
        return this;
      };
      /**
       * @private
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.recognizeWith = function recognizeWith(otherRecognizer) {
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
      };
      /**
       * @private
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
          return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
      };
      /**
       * @private
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.requireFailure = function requireFailure(otherRecognizer) {
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
      };
      /**
       * @private
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */


      _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
          return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);

        if (index > -1) {
          this.requireFail.splice(index, 1);
        }

        return this;
      };
      /**
       * @private
       * has require failures boolean
       * @returns {boolean}
       */


      _proto.hasRequireFailures = function hasRequireFailures() {
        return this.requireFail.length > 0;
      };
      /**
       * @private
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */


      _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
      };
      /**
       * @private
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */


      _proto.emit = function emit(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
          self.manager.emit(event, input);
        } // 'panstart' and 'panmove'


        if (state < STATE_ENDED) {
          emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) {
          // additional event(panleft, panright, pinchin, pinchout...)
          emit(input.additionalEvent);
        } // panend and pancancel


        if (state >= STATE_ENDED) {
          emit(self.options.event + stateStr(state));
        }
      };
      /**
       * @private
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */


      _proto.tryEmit = function tryEmit(input) {
        if (this.canEmit()) {
          return this.emit(input);
        } // it's failing anyway


        this.state = STATE_FAILED;
      };
      /**
       * @private
       * can we emit?
       * @returns {boolean}
       */


      _proto.canEmit = function canEmit() {
        var i = 0;

        while (i < this.requireFail.length) {
          if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
            return false;
          }

          i++;
        }

        return true;
      };
      /**
       * @private
       * update the recognizer
       * @param {Object} inputData
       */


      _proto.recognize = function recognize(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
          this.reset();
          this.state = STATE_FAILED;
          return;
        } // reset when we've reached the end


        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
          this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
        // so trigger an event

        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
          this.tryEmit(inputDataClone);
        }
      };
      /**
       * @private
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {constant} STATE
       */

      /* jshint ignore:start */


      _proto.process = function process(inputData) {};
      /* jshint ignore:end */

      /**
       * @private
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */


      _proto.getTouchAction = function getTouchAction() {};
      /**
       * @private
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */


      _proto.reset = function reset() {};

      return Recognizer;
    }();

    var defaults = {
      /**
       * @private
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: false,

      /**
       * @private
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: TOUCH_ACTION_COMPUTE,

      /**
       * @private
       * @type {Boolean}
       * @default true
       */
      enable: true,

      /**
       * @private
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,

      /**
       * @private
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,

      /**
       * @private
       * Default recognizer setup when calling `Hammer()`
       * When creating a new Manager these will be skipped.
       * @type {Array}
       */
      preset: [],

      /**
       * @private
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
        /**
         * @private
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: "none",

        /**
         * @private
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: "none",

        /**
         * @private
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: "none",

        /**
         * @private
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: "none",

        /**
         * @private
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: "none",

        /**
         * @private
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var STOP = 1;
    var FORCED_STOP = 2;
    /**
     * @private
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
      each(manager.options.cssProps, function (value, name) {
        prop = prefixed(element.style, name);

        if (add) {
          manager.oldCssProps[prop] = element.style[prop];
          element.style[prop] = value;
        } else {
          element.style[prop] = manager.oldCssProps[prop] || "";
        }
      });

      if (!add) {
        manager.oldCssProps = {};
      }
    }
    /**
     * @private
     * trigger dom event
     * @param {String} event
     * @param {Object} data
     */


    function triggerDomEvent(event, data) {
      var gestureEvent = document.createEvent("Event");
      gestureEvent.initEvent(event, true, true);
      gestureEvent.gesture = data;
      data.target.dispatchEvent(gestureEvent);
    }
    /**
    * @private
     * Manager
     * @param {HTMLElement} element
     * @param {Object} [options]
     * @constructor
     */


    var Manager =
    /*#__PURE__*/
    function () {
      function Manager(element, options) {
        var _this = this;

        this.options = assign$1({}, defaults, options || {});
        this.options.inputTarget = this.options.inputTarget || element;
        this.handlers = {};
        this.session = {};
        this.recognizers = [];
        this.oldCssProps = {};
        this.element = element;
        this.input = createInputInstance(this);
        this.touchAction = new TouchAction(this, this.options.touchAction);
        toggleCssProps(this, true);
        each(this.options.recognizers, function (item) {
          var recognizer = _this.add(new item[0](item[1]));

          item[2] && recognizer.recognizeWith(item[2]);
          item[3] && recognizer.requireFailure(item[3]);
        }, this);
      }
      /**
       * @private
       * set options
       * @param {Object} options
       * @returns {Manager}
       */


      var _proto = Manager.prototype;

      _proto.set = function set(options) {
        assign$1(this.options, options); // Options that need a little more setup

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
      };
      /**
       * @private
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */


      _proto.stop = function stop(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
      };
      /**
       * @private
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */


      _proto.recognize = function recognize(inputData) {
        var session = this.session;

        if (session.stopped) {
          return;
        } // run the touch-action polyfill


        this.touchAction.preventDefaults(inputData);
        var recognizer;
        var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`

        var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
        // or when we're in a new session

        if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
          session.curRecognizer = null;
          curRecognizer = null;
        }

        var i = 0;

        while (i < recognizers.length) {
          recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
          // 1.   allow if the session is NOT forced stopped (see the .stop() method)
          // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
          //      that is being recognized.
          // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
          //      this can be setup with the `recognizeWith()` method on the recognizer.

          if (session.stopped !== FORCED_STOP && ( // 1
          !curRecognizer || recognizer === curRecognizer || // 2
          recognizer.canRecognizeWith(curRecognizer))) {
            // 3
            recognizer.recognize(inputData);
          } else {
            recognizer.reset();
          } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
          // current active recognizer. but only if we don't already have an active recognizer


          if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
            session.curRecognizer = recognizer;
            curRecognizer = recognizer;
          }

          i++;
        }
      };
      /**
       * @private
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */


      _proto.get = function get(recognizer) {
        if (recognizer instanceof Recognizer) {
          return recognizer;
        }

        var recognizers = this.recognizers;

        for (var i = 0; i < recognizers.length; i++) {
          if (recognizers[i].options.event === recognizer) {
            return recognizers[i];
          }
        }

        return null;
      };
      /**
       * @private add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */


      _proto.add = function add(recognizer) {
        if (invokeArrayArg(recognizer, "add", this)) {
          return this;
        } // remove existing


        var existing = this.get(recognizer.options.event);

        if (existing) {
          this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;
        this.touchAction.update();
        return recognizer;
      };
      /**
       * @private
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */


      _proto.remove = function remove(recognizer) {
        if (invokeArrayArg(recognizer, "remove", this)) {
          return this;
        }

        var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

        if (recognizer) {
          var recognizers = this.recognizers;
          var index = inArray(recognizers, targetRecognizer);

          if (index !== -1) {
            recognizers.splice(index, 1);
            this.touchAction.update();
          }
        }

        return this;
      };
      /**
       * @private
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */


      _proto.on = function on(events, handler) {
        if (events === undefined || handler === undefined) {
          return this;
        }

        var handlers = this.handlers;
        each(splitStr(events), function (event) {
          handlers[event] = handlers[event] || [];
          handlers[event].push(handler);
        });
        return this;
      };
      /**
       * @private unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */


      _proto.off = function off(events, handler) {
        if (events === undefined) {
          return this;
        }

        var handlers = this.handlers;
        each(splitStr(events), function (event) {
          if (!handler) {
            delete handlers[event];
          } else {
            handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
          }
        });
        return this;
      };
      /**
       * @private emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */


      _proto.emit = function emit(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
          triggerDomEvent(event, data);
        } // no handlers, so skip it all


        var handlers = this.handlers[event] && this.handlers[event].slice();

        if (!handlers || !handlers.length) {
          return;
        }

        data.type = event;

        data.preventDefault = function () {
          data.srcEvent.preventDefault();
        };

        var i = 0;

        while (i < handlers.length) {
          handlers[i](data);
          i++;
        }
      };
      /**
       * @private
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */


      _proto.destroy = function destroy() {
        this.element && toggleCssProps(this, false);
        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
      };

      return Manager;
    }();

    var SINGLE_TOUCH_INPUT_MAP = {
      touchstart: INPUT_START,
      touchmove: INPUT_MOVE,
      touchend: INPUT_END,
      touchcancel: INPUT_CANCEL
    };
    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
    /**
     * @private
     * Touch events input
     * @constructor
     * @extends Input
     */

    var SingleTouchInput =
    /*#__PURE__*/
    function (_Input) {
      _inheritsLoose(SingleTouchInput, _Input);

      function SingleTouchInput() {
        var _this;

        var proto = SingleTouchInput.prototype;
        proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
        proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
        _this = _Input.apply(this, arguments) || this;
        _this.started = false;
        return _this;
      }

      var _proto = SingleTouchInput.prototype;

      _proto.handler = function handler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

        if (type === INPUT_START) {
          this.started = true;
        }

        if (!this.started) {
          return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
          this.started = false;
        }

        this.callback(this.manager, type, {
          pointers: touches[0],
          changedPointers: touches[1],
          pointerType: INPUT_TYPE_TOUCH,
          srcEvent: ev
        });
      };

      return SingleTouchInput;
    }(Input);

    function normalizeSingleTouches(ev, type) {
      var all = toArray(ev.touches);
      var changed = toArray(ev.changedTouches);

      if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
      }

      return [all, changed];
    }
    /**
     * @private
     * This recognizer is just used as a base for the simple attribute recognizers.
     * @constructor
     * @extends Recognizer
     */


    var AttrRecognizer =
    /*#__PURE__*/
    function (_Recognizer) {
      _inheritsLoose(AttrRecognizer, _Recognizer);

      function AttrRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _Recognizer.call(this, _extends({
          pointers: 1
        }, options)) || this;
      }
      /**
       * @private
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */


      var _proto = AttrRecognizer.prototype;

      _proto.attrTest = function attrTest(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
      };
      /**
       * @private
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */


      _proto.process = function process(input) {
        var state = this.state;
        var eventType = input.eventType;
        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

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
      };

      return AttrRecognizer;
    }(Recognizer);
    /**
     * @private
     * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
     * a single tap.
     *
     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
     * multi-taps being recognized.
     * @constructor
     * @extends Recognizer
     */


    var TapRecognizer =
    /*#__PURE__*/
    function (_Recognizer) {
      _inheritsLoose(TapRecognizer, _Recognizer);

      function TapRecognizer(options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _Recognizer.call(this, _extends({
          event: 'tap',
          pointers: 1,
          taps: 1,
          interval: 300,
          // max time between the multi-tap taps
          time: 250,
          // max time of the pointer to be down (like finger on the screen)
          threshold: 9,
          // a minimal movement is ok, but keep it low
          posThreshold: 10
        }, options)) || this; // previous time and center,
        // used for tap counting

        _this.pTime = false;
        _this.pCenter = false;
        _this._timer = null;
        _this._input = null;
        _this.count = 0;
        return _this;
      }

      var _proto = TapRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        return [TOUCH_ACTION_MANIPULATION];
      };

      _proto.process = function process(input) {
        var _this2 = this;

        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;
        this.reset();

        if (input.eventType & INPUT_START && this.count === 0) {
          return this.failTimeout();
        } // we only allow little movement
        // and we've reached an end event, so a tap is possible


        if (validMovement && validTouchTime && validPointers) {
          if (input.eventType !== INPUT_END) {
            return this.failTimeout();
          }

          var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
          var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
          this.pTime = input.timeStamp;
          this.pCenter = input.center;

          if (!validMultiTap || !validInterval) {
            this.count = 1;
          } else {
            this.count += 1;
          }

          this._input = input; // if tap count matches we have recognized it,
          // else it has began recognizing...

          var tapCount = this.count % options.taps;

          if (tapCount === 0) {
            // no failing requirements, immediately trigger the tap event
            // or wait as long as the multitap interval to trigger
            if (!this.hasRequireFailures()) {
              return STATE_RECOGNIZED;
            } else {
              this._timer = setTimeout(function () {
                _this2.state = STATE_RECOGNIZED;

                _this2.tryEmit();
              }, options.interval);
              return STATE_BEGAN;
            }
          }
        }

        return STATE_FAILED;
      };

      _proto.failTimeout = function failTimeout() {
        var _this3 = this;

        this._timer = setTimeout(function () {
          _this3.state = STATE_FAILED;
        }, this.options.interval);
        return STATE_FAILED;
      };

      _proto.reset = function reset() {
        clearTimeout(this._timer);
      };

      _proto.emit = function emit() {
        if (this.state === STATE_RECOGNIZED) {
          this._input.tapCount = this.count;
          this.manager.emit(this.options.event, this._input);
        }
      };

      return TapRecognizer;
    }(Recognizer);
    /**
     * @private
     * direction cons to string
     * @param {constant} direction
     * @returns {String}
     */


    function directionStr(direction) {
      if (direction === DIRECTION_DOWN) {
        return 'down';
      } else if (direction === DIRECTION_UP) {
        return 'up';
      } else if (direction === DIRECTION_LEFT) {
        return 'left';
      } else if (direction === DIRECTION_RIGHT) {
        return 'right';
      }

      return '';
    }
    /**
     * @private
     * Pan
     * Recognized when the pointer is down and moved in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */


    var PanRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(PanRecognizer, _AttrRecognizer);

      function PanRecognizer(options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _AttrRecognizer.call(this, _extends({
          event: 'pan',
          threshold: 10,
          pointers: 1,
          direction: DIRECTION_ALL
        }, options)) || this;
        _this.pX = null;
        _this.pY = null;
        return _this;
      }

      var _proto = PanRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        var direction = this.options.direction;
        var actions = [];

        if (direction & DIRECTION_HORIZONTAL) {
          actions.push(TOUCH_ACTION_PAN_Y);
        }

        if (direction & DIRECTION_VERTICAL) {
          actions.push(TOUCH_ACTION_PAN_X);
        }

        return actions;
      };

      _proto.directionTest = function directionTest(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY; // lock to axis?

        if (!(direction & options.direction)) {
          if (options.direction & DIRECTION_HORIZONTAL) {
            direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
            hasMoved = x !== this.pX;
            distance = Math.abs(input.deltaX);
          } else {
            direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
            hasMoved = y !== this.pY;
            distance = Math.abs(input.deltaY);
          }
        }

        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
      };

      _proto.attrTest = function attrTest(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
        this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
      };

      _proto.emit = function emit(input) {
        this.pX = input.deltaX;
        this.pY = input.deltaY;
        var direction = directionStr(input.direction);

        if (direction) {
          input.additionalEvent = this.options.event + direction;
        }

        _AttrRecognizer.prototype.emit.call(this, input);
      };

      return PanRecognizer;
    }(AttrRecognizer);
    /**
     * @private
     * Swipe
     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
     * @constructor
     * @extends AttrRecognizer
     */


    var SwipeRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

      function SwipeRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _AttrRecognizer.call(this, _extends({
          event: 'swipe',
          threshold: 10,
          velocity: 0.3,
          direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
          pointers: 1
        }, options)) || this;
      }

      var _proto = SwipeRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        return PanRecognizer.prototype.getTouchAction.call(this);
      };

      _proto.attrTest = function attrTest(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
          velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
          velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
          velocity = input.overallVelocityY;
        }

        return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
      };

      _proto.emit = function emit(input) {
        var direction = directionStr(input.offsetDirection);

        if (direction) {
          this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
      };

      return SwipeRecognizer;
    }(AttrRecognizer);
    /**
     * @private
     * Pinch
     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * @constructor
     * @extends AttrRecognizer
     */


    var PinchRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(PinchRecognizer, _AttrRecognizer);

      function PinchRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _AttrRecognizer.call(this, _extends({
          event: 'pinch',
          threshold: 0,
          pointers: 2
        }, options)) || this;
      }

      var _proto = PinchRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        return [TOUCH_ACTION_NONE];
      };

      _proto.attrTest = function attrTest(input) {
        return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
      };

      _proto.emit = function emit(input) {
        if (input.scale !== 1) {
          var inOut = input.scale < 1 ? 'in' : 'out';
          input.additionalEvent = this.options.event + inOut;
        }

        _AttrRecognizer.prototype.emit.call(this, input);
      };

      return PinchRecognizer;
    }(AttrRecognizer);
    /**
     * @private
     * Rotate
     * Recognized when two or more pointer are moving in a circular motion.
     * @constructor
     * @extends AttrRecognizer
     */


    var RotateRecognizer =
    /*#__PURE__*/
    function (_AttrRecognizer) {
      _inheritsLoose(RotateRecognizer, _AttrRecognizer);

      function RotateRecognizer(options) {
        if (options === void 0) {
          options = {};
        }

        return _AttrRecognizer.call(this, _extends({
          event: 'rotate',
          threshold: 0,
          pointers: 2
        }, options)) || this;
      }

      var _proto = RotateRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        return [TOUCH_ACTION_NONE];
      };

      _proto.attrTest = function attrTest(input) {
        return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
      };

      return RotateRecognizer;
    }(AttrRecognizer);
    /**
     * @private
     * Press
     * Recognized when the pointer is down for x ms without any movement.
     * @constructor
     * @extends Recognizer
     */


    var PressRecognizer =
    /*#__PURE__*/
    function (_Recognizer) {
      _inheritsLoose(PressRecognizer, _Recognizer);

      function PressRecognizer(options) {
        var _this;

        if (options === void 0) {
          options = {};
        }

        _this = _Recognizer.call(this, _extends({
          event: 'press',
          pointers: 1,
          time: 251,
          // minimal time of the pointer to be pressed
          threshold: 9
        }, options)) || this;
        _this._timer = null;
        _this._input = null;
        return _this;
      }

      var _proto = PressRecognizer.prototype;

      _proto.getTouchAction = function getTouchAction() {
        return [TOUCH_ACTION_AUTO];
      };

      _proto.process = function process(input) {
        var _this2 = this;

        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;
        this._input = input; // we only allow little movement
        // and we've reached an end event, so a tap is possible

        if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
          this.reset();
        } else if (input.eventType & INPUT_START) {
          this.reset();
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.time);
        } else if (input.eventType & INPUT_END) {
          return STATE_RECOGNIZED;
        }

        return STATE_FAILED;
      };

      _proto.reset = function reset() {
        clearTimeout(this._timer);
      };

      _proto.emit = function emit(input) {
        if (this.state !== STATE_RECOGNIZED) {
          return;
        }

        if (input && input.eventType & INPUT_END) {
          this.manager.emit(this.options.event + "up", input);
        } else {
          this._input.timeStamp = now();
          this.manager.emit(this.options.event, this._input);
        }
      };

      return PressRecognizer;
    }(Recognizer);

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/axes project is licensed under the MIT license

    @egjs/axes JavaScript library
    https://github.com/naver/egjs-axes

    @version 2.5.12
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

    var extendStatics$1 = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign$1 = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };
    /* eslint-disable no-new-func, no-nested-ternary */


    var win$1;

    if (typeof window === "undefined") {
      // window is undefined in node.js
      win$1 = {};
    } else {
      win$1 = window;
    } // export const DIRECTION_NONE = 1;


    var FIXED_DIGIT = 100000;

    var TRANSFORM = function () {
      if (typeof document === "undefined") {
        return "";
      }

      var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
      var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

      for (var i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
          return target[i];
        }
      }

      return "";
    }();

    function toArray$1(nodes) {
      // const el = Array.prototype.slice.call(nodes);
      // for IE8
      var el = [];

      for (var i = 0, len = nodes.length; i < len; i++) {
        el.push(nodes[i]);
      }

      return el;
    }

    function $(param, multi) {
      if (multi === void 0) {
        multi = false;
      }

      var el;

      if (typeof param === "string") {
        // String (HTML, Selector)
        // check if string is HTML tag format
        var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

        if (match) {
          // HTML
          var dummy = document.createElement("div");
          dummy.innerHTML = param;
          el = toArray$1(dummy.childNodes);
        } else {
          // Selector
          el = toArray$1(document.querySelectorAll(param));
        }

        if (!multi) {
          el = el.length >= 1 ? el[0] : undefined;
        }
      } else if (param === win$1) {
        // window
        el = param;
      } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
        // HTMLElement, Document
        el = param;
      } else if ("jQuery" in win$1 && param instanceof jQuery || param.constructor.prototype.jquery) {
        // jQuery
        el = multi ? param.toArray() : param.get(0);
      } else if (Array.isArray(param)) {
        el = param.map(function (v) {
          return $(v);
        });

        if (!multi) {
          el = el.length >= 1 ? el[0] : undefined;
        }
      }

      return el;
    }

    var raf = win$1.requestAnimationFrame || win$1.webkitRequestAnimationFrame;
    var caf = win$1.cancelAnimationFrame || win$1.webkitCancelAnimationFrame;

    if (raf && !caf) {
      var keyInfo_1 = {};
      var oldraf_1 = raf;

      raf = function (callback) {
        function wrapCallback(timestamp) {
          if (keyInfo_1[key]) {
            callback(timestamp);
          }
        }

        var key = oldraf_1(wrapCallback);
        keyInfo_1[key] = true;
        return key;
      };

      caf = function (key) {
        delete keyInfo_1[key];
      };
    } else if (!(raf && caf)) {
      raf = function (callback) {
        return win$1.setTimeout(function () {
          callback(win$1.performance && win$1.performance.now && win$1.performance.now() || new Date().getTime());
        }, 16);
      };

      caf = win$1.clearTimeout;
    }
    /**
     * A polyfill for the window.requestAnimationFrame() method.
     * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
     * @private
     */


    function requestAnimationFrame(fp) {
      return raf(fp);
    }
    /**
    * A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
    * @param {Number} key −	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() 메서드가 반환한 아이디 값</ko>
    * @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
    * @private
    */


    function cancelAnimationFrame(key) {
      caf(key);
    }

    function map(obj, callback) {
      var tranformed = {};

      for (var k in obj) {
        k && (tranformed[k] = callback(obj[k], k));
      }

      return tranformed;
    }

    function filter(obj, callback) {
      var filtered = {};

      for (var k in obj) {
        k && callback(obj[k], k) && (filtered[k] = obj[k]);
      }

      return filtered;
    }

    function every(obj, callback) {
      for (var k in obj) {
        if (k && !callback(obj[k], k)) {
          return false;
        }
      }

      return true;
    }

    function equal(target, base) {
      return every(target, function (v, k) {
        return v === base[k];
      });
    }

    function toFixed(num) {
      return Math.round(num * FIXED_DIGIT) / FIXED_DIGIT;
    }

    function getInsidePosition(destPos, range, circular, bounce) {
      var toDestPos = destPos;
      var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
      toDestPos = Math.max(targetRange[0], toDestPos);
      toDestPos = Math.min(targetRange[1], toDestPos);
      return +toFixed(toDestPos);
    } // determine outside


    function isOutside(pos, range) {
      return pos < range[0] || pos > range[1];
    }

    function getDuration(distance, deceleration) {
      var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

      return duration < 100 ? 0 : duration;
    }

    function isCircularable(destPos, range, circular) {
      return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
    }

    function getCirculatedPos(pos, range, circular, isAccurate) {
      var toPos = pos;
      var min = range[0];
      var max = range[1];
      var length = max - min;

      if (circular[1] && pos > max) {
        // right
        toPos = (toPos - max) % length + min;
      }

      if (circular[0] && pos < min) {
        // left
        toPos = (toPos - min) % length + max;
      }

      return isAccurate ? toPos : +toFixed(toPos);
    }

    function minMax(value, min, max) {
      return Math.max(Math.min(value, max), min);
    }

    var AnimationManager =
    /*#__PURE__*/
    function () {
      function AnimationManager(_a) {
        var options = _a.options,
            itm = _a.itm,
            em = _a.em,
            axm = _a.axm;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.animationEnd = this.animationEnd.bind(this);
      }

      var __proto = AnimationManager.prototype;

      __proto.getDuration = function (depaPos, destPos, wishDuration) {
        var _this = this;

        var duration;

        if (typeof wishDuration !== "undefined") {
          duration = wishDuration;
        } else {
          var durations_1 = map(destPos, function (v, k) {
            return getDuration(Math.abs(Math.abs(v) - Math.abs(depaPos[k])), _this.options.deceleration);
          });
          duration = Object.keys(durations_1).reduce(function (max, v) {
            return Math.max(max, durations_1[v]);
          }, -Infinity);
        }

        return minMax(duration, this.options.minimumDuration, this.options.maximumDuration);
      };

      __proto.createAnimationParam = function (pos, duration, option) {
        var depaPos = this.axm.get();
        var destPos = pos;
        var inputEvent = option && option.event || null;
        return {
          depaPos: depaPos,
          destPos: destPos,
          duration: minMax(duration, this.options.minimumDuration, this.options.maximumDuration),
          delta: this.axm.getDelta(depaPos, destPos),
          inputEvent: inputEvent,
          input: option && option.input || null,
          isTrusted: !!inputEvent,
          done: this.animationEnd
        };
      };

      __proto.grab = function (axes, option) {
        if (this._animateParam && axes.length) {
          var orgPos_1 = this.axm.get(axes);
          var pos = this.axm.map(orgPos_1, function (v, opt) {
            return getCirculatedPos(v, opt.range, opt.circular, false);
          });

          if (!every(pos, function (v, k) {
            return orgPos_1[k] === v;
          })) {
            this.em.triggerChange(pos, false, orgPos_1, option, !!option);
          }

          this._animateParam = null;
          this._raf && cancelAnimationFrame(this._raf);
          this._raf = null;
          this.em.triggerAnimationEnd(!!(option && option.event));
        }
      };

      __proto.getEventInfo = function () {
        if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
          return {
            input: this._animateParam.input,
            event: this._animateParam.inputEvent
          };
        } else {
          return null;
        }
      };

      __proto.restore = function (option) {
        var pos = this.axm.get();
        var destPos = this.axm.map(pos, function (v, opt) {
          return Math.min(opt.range[1], Math.max(opt.range[0], v));
        });
        this.animateTo(destPos, this.getDuration(pos, destPos), option);
      };

      __proto.animationEnd = function () {
        var beforeParam = this.getEventInfo();
        this._animateParam = null; // for Circular

        var circularTargets = this.axm.filter(this.axm.get(), function (v, opt) {
          return isCircularable(v, opt.range, opt.circular);
        });
        Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, opt) {
          return getCirculatedPos(v, opt.range, opt.circular, false);
        }));
        this.itm.setInterrupt(false);
        this.em.triggerAnimationEnd(!!beforeParam);

        if (this.axm.isOutside()) {
          this.restore(beforeParam);
        } else {
          this.finish(!!beforeParam);
        }
      };

      __proto.finish = function (isTrusted) {
        this._animateParam = null;
        this.itm.setInterrupt(false);
        this.em.triggerFinish(isTrusted);
      };

      __proto.animateLoop = function (param, complete) {
        if (param.duration) {
          this._animateParam = __assign$1({}, param);
          var info_1 = this._animateParam;
          var self_1 = this;
          var prevPos_1 = info_1.depaPos;
          info_1.startTime = new Date().getTime();

          (function loop() {
            self_1._raf = null;
            var easingPer = self_1.easing((new Date().getTime() - info_1.startTime) / param.duration);
            var toPos = map(info_1.depaPos, function (pos, key) {
              return pos + info_1.delta[key] * easingPer;
            });
            var isCanceled = !self_1.em.triggerChange(toPos, false, prevPos_1);
            prevPos_1 = map(toPos, function (v) {
              return toFixed(v);
            });

            if (easingPer >= 1) {
              var destPos = param.destPos;

              if (!equal(destPos, self_1.axm.get(Object.keys(destPos)))) {
                self_1.em.triggerChange(destPos, true, prevPos_1);
              }

              complete();
              return;
            } else if (isCanceled) {
              self_1.finish(false);
            } else {
              // animationEnd
              self_1._raf = requestAnimationFrame(loop);
            }
          })();
        } else {
          this.em.triggerChange(param.destPos, true);
          complete();
        }
      };

      __proto.getUserControll = function (param) {
        var userWish = param.setTo();
        userWish.destPos = this.axm.get(userWish.destPos);
        userWish.duration = minMax(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
        return userWish;
      };

      __proto.animateTo = function (destPos, duration, option) {
        var _this = this;

        var param = this.createAnimationParam(destPos, duration, option);

        var depaPos = __assign$1({}, param.depaPos);

        var retTrigger = this.em.triggerAnimationStart(param); // to control

        var userWish = this.getUserControll(param); // You can't stop the 'animationStart' event when 'circular' is true.

        if (!retTrigger && this.axm.every(userWish.destPos, function (v, opt) {
          return isCircularable(v, opt.range, opt.circular);
        })) {
          console.warn("You can't stop the 'animation' event when 'circular' is true.");
        }

        if (retTrigger && !equal(userWish.destPos, depaPos)) {
          var inputEvent = option && option.event || null;
          this.animateLoop({
            depaPos: depaPos,
            destPos: userWish.destPos,
            duration: userWish.duration,
            delta: this.axm.getDelta(depaPos, userWish.destPos),
            isTrusted: !!inputEvent,
            inputEvent: inputEvent,
            input: option && option.input || null
          }, function () {
            return _this.animationEnd();
          });
        }
      };

      __proto.easing = function (p) {
        return p > 1 ? 1 : this.options.easing(p);
      };

      __proto.setTo = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        var axes = Object.keys(pos);
        this.grab(axes);
        var orgPos = this.axm.get(axes);

        if (equal(pos, orgPos)) {
          return this;
        }

        this.itm.setInterrupt(true);
        var movedPos = filter(pos, function (v, k) {
          return orgPos[k] !== v;
        });

        if (!Object.keys(movedPos).length) {
          return this;
        }

        movedPos = this.axm.map(movedPos, function (v, opt) {
          var range = opt.range,
              circular = opt.circular;

          if (circular && (circular[0] || circular[1])) {
            return v;
          } else {
            return getInsidePosition(v, range, circular);
          }
        });

        if (equal(movedPos, orgPos)) {
          return this;
        }

        if (duration > 0) {
          this.animateTo(movedPos, duration);
        } else {
          this.em.triggerChange(movedPos);
          this.finish(false);
        }

        return this;
      };

      __proto.setBy = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        return this.setTo(map(this.axm.get(Object.keys(pos)), function (v, k) {
          return v + pos[k];
        }), duration);
      };

      return AnimationManager;
    }();

    var EventManager =
    /*#__PURE__*/
    function () {
      function EventManager(axes) {
        this.axes = axes;
      }
      /**
       * This event is fired when a user holds an element on the screen of the device.
       * @ko 사용자가 기기의 화면에 손을 대고 있을 때 발생하는 이벤트
       * @name eg.Axes#hold
       * @event
       * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Object.<string, number>} pos coordinate <ko>좌표 정보</ko>
       * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("hold", function(event) {
       *   // event.pos
       *   // event.input
       *   // event.inputEvent
       *   // isTrusted
       * });
       */


      var __proto = EventManager.prototype;

      __proto.triggerHold = function (pos, option) {
        this.axes.trigger("hold", {
          pos: pos,
          input: option.input || null,
          inputEvent: option.event || null,
          isTrusted: true
        });
      };
      /**
       * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
       * @ko 'change' 이벤트 이후 이동할 좌표를 지정한다. change이벤트의 holding 값이 true일 경우에 동작한다
       * @name set
      * @function
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("change", function(event) {
       *   event.holding && event.set({x: 10});
       * });
       */

      /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
       * @ko 'release' 또는 'animationStart' 이벤트 이후 이동할 좌표를 지정한다.
       * @name setTo
      * @function
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("animationStart", function(event) {
       *   event.setTo({x: 10}, 2000);
       * });
       */

      /**
       * This event is fired when a user release an element on the screen of the device.
       * @ko 사용자가 기기의 화면에서 손을 뗐을 때 발생하는 이벤트
       * @name eg.Axes#release
       * @event
       * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>손을 뗐을 때의 좌표 </ko>
       * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>손을 뗀 뒤에 이동할 좌표</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {Object} input The instance of inputType where the event occurred<ko>이벤트가 발생한 inputType 인스턴스</ko>
       * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("release", function(event) {
       *   // event.depaPos
       *   // event.destPos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.setTo
       *   // event.isTrusted
       *
       *   // if you want to change the animation coordinates to move after the 'release' event.
       *   event.setTo({x: 10}, 2000);
       * });
       */


      __proto.triggerRelease = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        this.axes.trigger("release", param);
      };
      /**
       * This event is fired when coordinate changes.
       * @ko 좌표가 변경됐을 때 발생하는 이벤트
       * @name eg.Axes#change
       * @event
       * @type {object} The object of data to be sent when the event is fired <ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Object.<string, number>} pos  The coordinate <ko>좌표</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>사용자가 기기의 화면을 누르고 있는지 여부</ko>
       * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType으로 부터 받은 이벤트 객체. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>이벤트 이후 이동할 좌표를 지정한다. holding 값이 true일 경우에 동작한다.</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("change", function(event) {
       *   // event.pos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.holding
       *   // event.set
       *   // event.isTrusted
       *
       *   // if you want to change the coordinates to move after the 'change' event.
       *   // it works when the holding value of the change event is true.
       *   event.holding && event.set({x: 10});
       * });
       */


      __proto.triggerChange = function (pos, isAccurate, depaPos, option, holding) {
        if (holding === void 0) {
          holding = false;
        }

        var am = this.am;
        var axm = am.axm;
        var eventInfo = am.getEventInfo();
        var moveTo = axm.moveTo(pos, isAccurate, depaPos);
        var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
        var param = {
          pos: moveTo.pos,
          delta: moveTo.delta,
          holding: holding,
          inputEvent: inputEvent,
          isTrusted: !!inputEvent,
          input: option && option.input || eventInfo && eventInfo.input || null,
          set: inputEvent ? this.createUserControll(moveTo.pos) : function () {}
        };
        var result = this.axes.trigger("change", param);
        inputEvent && axm.set(param.set()["destPos"]);
        return result;
      };
      /**
       * This event is fired when animation starts.
       * @ko 에니메이션이 시작할 때 발생한다.
       * @name eg.Axes#animationStart
       * @event
       * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>애니메이션이 시작 되었을 때의 좌표 </ko>
       * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>이동할 좌표. 이값을 변경하여 애니메이션을 동작시킬수 있다</ko>
       * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>좌표의 변화량</ko>
       * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>애니메이션 진행 시간(단위: ms). 이값을 변경하여 애니메이션의 이동시간을 조절할 수 있다.</ko>
       * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>이벤트가 발생한 inputType 인스턴스. 애니메이션에 의해 값이 변경될 경우에는 'null'을 반환한다.</ko>
       * @property {Object} inputEvent The event object received from inputType <ko>inputType으로 부터 받은 이벤트 객체</ko>
       * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>이벤트 이후 이동할 애니메이션 좌표를 지정한다</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("release", function(event) {
       *   // event.depaPos
       *   // event.destPos
       *   // event.delta
       *   // event.input
       *   // event.inputEvent
       *   // event.setTo
       *   // event.isTrusted
       *
       *   // if you want to change the animation coordinates to move after the 'animationStart' event.
       *   event.setTo({x: 10}, 2000);
       * });
       */


      __proto.triggerAnimationStart = function (param) {
        param.setTo = this.createUserControll(param.destPos, param.duration);
        return this.axes.trigger("animationStart", param);
      };
      /**
       * This event is fired when animation ends.
       * @ko 에니메이션이 끝났을 때 발생한다.
       * @name eg.Axes#animationEnd
       * @event
       * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("animationEnd", function(event) {
       *   // event.isTrusted
       * });
       */


      __proto.triggerAnimationEnd = function (isTrusted) {
        if (isTrusted === void 0) {
          isTrusted = false;
        }

        this.axes.trigger("animationEnd", {
          isTrusted: isTrusted
        });
      };
      /**
       * This event is fired when all actions have been completed.
       * @ko 에니메이션이 끝났을 때 발생한다.
       * @name eg.Axes#finish
       * @event
       * @type {object} The object of data to be sent when the event is fired<ko>이벤트가 발생할 때 전달되는 데이터 객체</ko>
       * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>사용자의 액션에 의해 이벤트가 발생하였으면 true, 스크립트나 API호출에 의해 발생하였을 경우에는 false를 반환한다.</ko>
       *
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "zoom": {
       *      range: [50, 30]
       *   }
       * }).on("finish", function(event) {
       *   // event.isTrusted
       * });
       */


      __proto.triggerFinish = function (isTrusted) {
        if (isTrusted === void 0) {
          isTrusted = false;
        }

        this.axes.trigger("finish", {
          isTrusted: isTrusted
        });
      };

      __proto.createUserControll = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        } // to controll


        var userControl = {
          destPos: __assign$1({}, pos),
          duration: duration
        };
        return function (toPos, userDuration) {
          toPos && (userControl.destPos = __assign$1({}, toPos));
          userDuration !== undefined && (userControl.duration = userDuration);
          return userControl;
        };
      };

      __proto.setAnimationManager = function (am) {
        this.am = am;
      };

      __proto.destroy = function () {
        this.axes.off();
      };

      return EventManager;
    }();

    var InterruptManager =
    /*#__PURE__*/
    function () {
      function InterruptManager(options) {
        this.options = options;
        this._prevented = false; //  check whether the animation event was prevented
      }

      var __proto = InterruptManager.prototype;

      __proto.isInterrupting = function () {
        // when interruptable is 'true', return value is always 'true'.
        return this.options.interruptable || this._prevented;
      };

      __proto.isInterrupted = function () {
        return !this.options.interruptable && this._prevented;
      };

      __proto.setInterrupt = function (prevented) {
        !this.options.interruptable && (this._prevented = prevented);
      };

      return InterruptManager;
    }();

    var AxisManager =
    /*#__PURE__*/
    function () {
      function AxisManager(axis, options) {
        var _this = this;

        this.axis = axis;
        this.options = options;

        this._complementOptions();

        this._pos = Object.keys(this.axis).reduce(function (acc, v) {
          acc[v] = _this.axis[v].range[0];
          return acc;
        }, {});
      }
      /**
         * set up 'css' expression
         * @private
         */


      var __proto = AxisManager.prototype;

      __proto._complementOptions = function () {
        var _this = this;

        Object.keys(this.axis).forEach(function (axis) {
          _this.axis[axis] = __assign$1({
            range: [0, 100],
            bounce: [0, 0],
            circular: [false, false]
          }, _this.axis[axis]);
          ["bounce", "circular"].forEach(function (v) {
            var axisOption = _this.axis;
            var key = axisOption[axis][v];

            if (/string|number|boolean/.test(typeof key)) {
              axisOption[axis][v] = [key, key];
            }
          });
        });
      };

      __proto.getDelta = function (depaPos, destPos) {
        var fullDepaPos = this.get(depaPos);
        return map(this.get(destPos), function (v, k) {
          return v - fullDepaPos[k];
        });
      };

      __proto.get = function (axes) {
        var _this = this;

        if (axes && Array.isArray(axes)) {
          return axes.reduce(function (acc, v) {
            if (v && v in _this._pos) {
              acc[v] = _this._pos[v];
            }

            return acc;
          }, {});
        } else {
          return __assign$1({}, this._pos, axes || {});
        }
      };

      __proto.moveTo = function (pos, isAccurate, depaPos) {
        if (depaPos === void 0) {
          depaPos = this._pos;
        }

        var delta = map(this._pos, function (v, key) {
          return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
        });
        this.set(this.map(pos, function (v, opt) {
          return opt ? getCirculatedPos(v, opt.range, opt.circular, isAccurate) : 0;
        }));
        return {
          pos: __assign$1({}, this._pos),
          delta: delta
        };
      };

      __proto.set = function (pos) {
        for (var k in pos) {
          if (k && k in this._pos) {
            this._pos[k] = pos[k];
          }
        }
      };

      __proto.every = function (pos, callback) {
        var axisOptions = this.axis;
        return every(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.filter = function (pos, callback) {
        var axisOptions = this.axis;
        return filter(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.map = function (pos, callback) {
        var axisOptions = this.axis;
        return map(pos, function (value, key) {
          return callback(value, axisOptions[key], key);
        });
      };

      __proto.isOutside = function (axes) {
        return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
          return !isOutside(v, opt.range);
        });
      };

      return AxisManager;
    }();

    var InputObserver =
    /*#__PURE__*/
    function () {
      function InputObserver(_a) {
        var options = _a.options,
            itm = _a.itm,
            em = _a.em,
            axm = _a.axm,
            am = _a.am;
        this.isOutside = false;
        this.moveDistance = null;
        this.isStopped = false;
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.am = am;
      } // when move pointer is held in outside


      var __proto = InputObserver.prototype;

      __proto.atOutside = function (pos) {
        var _this = this;

        if (this.isOutside) {
          return this.axm.map(pos, function (v, opt) {
            var tn = opt.range[0] - opt.bounce[0];
            var tx = opt.range[1] + opt.bounce[1];
            return v > tx ? tx : v < tn ? tn : v;
          });
        } else {
          // when start pointer is held in inside
          // get a initialization slope value to prevent smooth animation.
          var initSlope_1 = this.am.easing(0.00001) / 0.00001;
          return this.axm.map(pos, function (v, opt) {
            var min = opt.range[0];
            var max = opt.range[1];
            var out = opt.bounce;
            var circular = opt.circular;

            if (circular && (circular[0] || circular[1])) {
              return v;
            } else if (v < min) {
              // left
              return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
            } else if (v > max) {
              // right
              return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
            }

            return v;
          });
        }
      };

      __proto.get = function (input) {
        return this.axm.get(input.axes);
      };

      __proto.hold = function (input, event) {
        if (this.itm.isInterrupted() || !input.axes.length) {
          return;
        }

        var changeOption = {
          input: input,
          event: event
        };
        this.isStopped = false;
        this.itm.setInterrupt(true);
        this.am.grab(input.axes, changeOption);
        !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
        this.isOutside = this.axm.isOutside(input.axes);
        this.moveDistance = this.axm.get(input.axes);
      };

      __proto.change = function (input, event, offset) {
        if (this.isStopped || !this.itm.isInterrupting() || this.axm.every(offset, function (v) {
          return v === 0;
        })) {
          return;
        }

        var depaPos = this.moveDistance || this.axm.get(input.axes);
        var destPos; // for outside logic

        destPos = map(depaPos, function (v, k) {
          return v + (offset[k] || 0);
        });
        this.moveDistance && (this.moveDistance = destPos); // from outside to inside

        if (this.isOutside && this.axm.every(depaPos, function (v, opt) {
          return !isOutside(v, opt.range);
        })) {
          this.isOutside = false;
        }

        depaPos = this.atOutside(depaPos);
        destPos = this.atOutside(destPos);
        var isCanceled = !this.em.triggerChange(destPos, false, depaPos, {
          input: input,
          event: event
        }, true);

        if (isCanceled) {
          this.isStopped = true;
          this.moveDistance = null;
          this.am.finish(false);
        }
      };

      __proto.release = function (input, event, offset, inputDuration) {
        if (this.isStopped || !this.itm.isInterrupting() || !this.moveDistance) {
          return;
        }

        var pos = this.axm.get(input.axes);
        var depaPos = this.axm.get();
        var destPos = this.axm.get(this.axm.map(offset, function (v, opt, k) {
          if (opt.circular && (opt.circular[0] || opt.circular[1])) {
            return pos[k] + v;
          } else {
            return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
          }
        }));
        var duration = this.am.getDuration(destPos, pos, inputDuration);

        if (duration === 0) {
          destPos = __assign$1({}, depaPos);
        } // prepare params


        var param = {
          depaPos: depaPos,
          destPos: destPos,
          duration: duration,
          delta: this.axm.getDelta(depaPos, destPos),
          inputEvent: event,
          input: input,
          isTrusted: true
        };
        this.em.triggerRelease(param);
        this.moveDistance = null; // to contol

        var userWish = this.am.getUserControll(param);
        var isEqual = equal(userWish.destPos, depaPos);
        var changeOption = {
          input: input,
          event: event
        };

        if (isEqual || userWish.duration === 0) {
          !isEqual && this.em.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
          this.itm.setInterrupt(false);

          if (this.axm.isOutside()) {
            this.am.restore(changeOption);
          } else {
            this.em.triggerFinish(true);
          }
        } else {
          this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
        }
      };

      return InputObserver;
    }();
    /**
     * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
     * @ko 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.
     * @property {Number[]} [range] The coordinate of range <ko>좌표 범위</ko>
     * @property {Number} [range.0=0] The coordinate of the minimum <ko>최소 좌표</ko>
     * @property {Number} [range.1=0] The coordinate of the maximum <ko>최대 좌표</ko>
     * @property {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>바운스 영역의 크기. 사용자의 동작에 따라 좌표가 좌표 영역을 넘어 바운스 영역의 크기만큼 더 이동할 수 있다. 사용자가 끌어다 놓는 동작을 했을 때 좌표가 바운스 영역에 있으면, 바운스 효과가 적용된 좌표가 다시 좌표 영역 안으로 들어온다</ko>
     * @property {Number} [bounce.0=0] The size of coordinate of the minimum area <ko>최소 좌표 바운스 영역의 크기</ko>
     * @property {Number} [bounce.1=0] The size of coordinate of the maximum area <ko>최대 좌표 바운스 영역의 크기</ko>
     * @property {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>순환 여부. 'true'로 설정한 방향의 좌표 영역 밖으로 엘리먼트가 이동하면 반대 방향에서 엘리먼트가 나타난다</ko>
     * @property {Boolean} [circular.0=false] Indicates whether to circulate to the coordinate of the minimum <ko>최소 좌표 방향의 순환 여부</ko>
     * @property {Boolean} [circular.1=false] Indicates whether to circulate to the coordinate of the maximum <ko>최대 좌표 방향의 순환 여부</ko>
    **/

    /**
     * @typedef {Object} AxesOption The option object of the eg.Axes module
     * @ko eg.Axes 모듈의 옵션 객체
     * @property {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>애니메이션에 적용할 easing 함수</ko>
     * @property {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최대 좌표 이동 시간</ko>
     * @property {Number} [minimumDuration=0] Minimum duration of the animation <ko>가속도에 의해 애니메이션이 동작할 때의 최소 좌표 이동 시간</ko>
     * @property {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>사용자의 동작으로 가속도가 적용된 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다</ko>
     * @property {Boolean} [interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>진행 중인 애니메이션 중지 가능 여부.<br>- true: 사용자의 동작이나 API로 애니메이션을 중지할 수 있다.<br>- false: 애니메이션이 진행 중일 때는 사용자의 동작이나 API가 적용되지 않는다</ko>
    **/

    /**
     * @class eg.Axes
     * @classdesc A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
     * @ko 터치 입력 장치나 마우스와 같은 다양한 입력 장치를 통해 전달 받은 사용자의 동작을 논리적인 가상 좌표로 변경하는 모듈이다. 사용자 동작에 반응하는 UI를 손쉽게 만들수 있다.
     * @extends eg.Component
     *
     * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes가 관리하는 축 정보. 축의 키는 논리적인 가상 좌표계로 사용할 이름을 지정한다.</ko>
     * @param {AxesOption} [options] The option object of the eg.Axes module<ko>eg.Axes 모듈의 옵션 객체</ko>
     * @param {Object.<string, number>} [startPos] The coordinates to be moved when creating an instance. not triggering change event.<ko>인스턴스 생성시 이동할 좌표, change 이벤트는 발생하지 않음.</ko>
     *
     * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
     * @example
     *
     * // 1. Initialize eg.Axes
     * const axes = new eg.Axes({
     *	something1: {
     *		range: [0, 150],
     *		bounce: 50
     *	},
     *	something2: {
     *		range: [0, 200],
     *		bounce: 100
     *	},
     *	somethingN: {
     *		range: [1, 10],
     *	}
     * }, {
     *  deceleration : 0.0024
     * });
     *
     * // 2. attach event handler
     * axes.on({
     *	"hold" : function(evt) {
     *	},
     *	"release" : function(evt) {
     *	},
     *	"animationStart" : function(evt) {
     *	},
     *	"animationEnd" : function(evt) {
     *	},
     *	"change" : function(evt) {
     *	}
     * });
     *
     * // 3. Initialize inputTypes
     * const panInputArea = new eg.Axes.PanInput("#area", {
     *	scale: [0.5, 1]
     * });
     * const panInputHmove = new eg.Axes.PanInput("#hmove");
     * const panInputVmove = new eg.Axes.PanInput("#vmove");
     * const pinchInputArea = new eg.Axes.PinchInput("#area", {
     *	scale: 1.5
     * });
     *
     * // 4. Connect eg.Axes and InputTypes
     * // [PanInput] When the mouse or touchscreen is down and moved.
     * // Connect the 'something2' axis to the mouse or touchscreen x position and
     * // connect the 'somethingN' axis to the mouse or touchscreen y position.
     * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
     *
     * // Connect only one 'something1' axis to the mouse or touchscreen x position.
     * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
     *
     * // Connect only one 'something2' axis to the mouse or touchscreen y position.
     * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
     *
     * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
     * axes.connect("something2", pinchInputArea);
     */


    var Axes =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Axes, _super);

      function Axes(axis, options, startPos) {
        if (axis === void 0) {
          axis = {};
        }

        var _this = _super.call(this) || this;

        _this.axis = axis;
        _this._inputs = [];
        _this.options = __assign$1({
          easing: function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
          },
          interruptable: true,
          maximumDuration: Infinity,
          minimumDuration: 0,
          deceleration: 0.0006
        }, options);
        _this.itm = new InterruptManager(_this.options);
        _this.axm = new AxisManager(_this.axis, _this.options);
        _this.em = new EventManager(_this);
        _this.am = new AnimationManager(_this);
        _this.io = new InputObserver(_this);

        _this.em.setAnimationManager(_this.am);

        startPos && _this.em.triggerChange(startPos);
        return _this;
      }
      /**
       * Connect the axis of eg.Axes to the inputType.
       * @ko eg.Axes의 축과 inputType을 연결한다
       * @method eg.Axes#connect
       * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType과 연결할 축의 이름</ko>
       * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes의 축과 연결할 inputType 인스턴스<ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   }
       * });
       *
       * axes.connect("x", new eg.Axes.PanInput("#area1"))
       *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
       *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
       *    .connect(["x"], new eg.Axes.PanInput("#area4"))
       *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
       *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
       */


      var __proto = Axes.prototype;

      __proto.connect = function (axes, inputType) {
        var mapped;

        if (typeof axes === "string") {
          mapped = axes.split(" ");
        } else {
          mapped = axes.concat();
        } // check same instance


        if (~this._inputs.indexOf(inputType)) {
          this.disconnect(inputType);
        } // check same element in hammer type for share


        if ("hammer" in inputType) {
          var targets = this._inputs.filter(function (v) {
            return v.hammer && v.element === inputType.element;
          });

          if (targets.length) {
            inputType.hammer = targets[0].hammer;
          }
        }

        inputType.mapAxes(mapped);
        inputType.connect(this.io);

        this._inputs.push(inputType);

        return this;
      };
      /**
       * Disconnect the axis of eg.Axes from the inputType.
       * @ko eg.Axes의 축과 inputType의 연결을 끊는다.
       * @method eg.Axes#disconnect
       * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes의 축과 연결한 inputType 인스턴스<ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   }
       * });
       *
       * const input1 = new eg.Axes.PanInput("#area1");
       * const input2 = new eg.Axes.PanInput("#area2");
       * const input3 = new eg.Axes.PanInput("#area3");
       *
       * axes.connect("x", input1);
       *    .connect("x xOther", input2)
       *    .connect(["xOther", "x"], input3);
       *
       * axes.disconnect(input1); // disconnects input1
       * axes.disconnect(); // disconnects all of them
       */


      __proto.disconnect = function (inputType) {
        if (inputType) {
          var index = this._inputs.indexOf(inputType);

          if (index >= 0) {
            this._inputs[index].disconnect();

            this._inputs.splice(index, 1);
          }
        } else {
          this._inputs.forEach(function (v) {
            return v.disconnect();
          });

          this._inputs = [];
        }

        return this;
      };
      /**
       * Returns the current position of the coordinates.
       * @ko 좌표의 현재 위치를 반환한다
       * @method eg.Axes#get
       * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
       * @return {Object.<string, number>} Axis coordinate information <ko>축 좌표 정보</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
       * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
       */


      __proto.get = function (axes) {
        return this.axm.get(axes);
      };
      /**
       * Moves an axis to specific coordinates.
       * @ko 좌표를 이동한다.
       * @method eg.Axes#setTo
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.setTo({"x": 30, "zoom": 60});
       * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
       *
       * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
       *
       * // after 1000 ms
       * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
       */


      __proto.setTo = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        this.am.setTo(pos, duration);
        return this;
      };
      /**
       * Moves an axis from the current coordinates to specific coordinates.
       * @ko 현재 좌표를 기준으로 좌표를 이동한다.
       * @method eg.Axes#setBy
       * @param {Object.<string, number>} pos The coordinate to move to <ko>이동할 좌표</ko>
       * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
       * @return {eg.Axes} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.setBy({"x": 30, "zoom": 10});
       * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
       *
       * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
       *
       * // after 1000 ms
       * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
       */


      __proto.setBy = function (pos, duration) {
        if (duration === void 0) {
          duration = 0;
        }

        this.am.setBy(pos, duration);
        return this;
      };
      /**
       * Returns whether there is a coordinate in the bounce area of ​​the target axis.
       * @ko 대상 축 중 bounce영역에 좌표가 존재하는지를 반환한다
       * @method eg.Axes#isBounceArea
       * @param {Object} [axes] The names of the axis <ko>축 이름들</ko>
       * @return {Boolen} Whether the bounce area exists. <ko>bounce 영역 존재 여부</ko>
       * @example
       * const axes = new eg.Axes({
       *   "x": {
       *      range: [0, 100]
       *   },
       *   "xOther": {
       *      range: [-100, 100]
       *   },
       * 	 "zoom": {
       *      range: [50, 30]
       *   }
       * });
       *
       * axes.isBounceArea(["x"]);
       * axes.isBounceArea(["x", "zoom"]);
       * axes.isBounceArea();
       */


      __proto.isBounceArea = function (axes) {
        return this.axm.isOutside(axes);
      };
      /**
      * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
      * @ko 모듈에 사용한 속성, 이벤트를 해제한다. 모든 inputType과의 연결을 끊는다.
      * @method eg.Axes#destroy
      */


      __proto.destroy = function () {
        this.disconnect();
        this.em.destroy();
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @type {String}
       * @example
       * eg.Axes.VERSION;  // ex) 3.3.3
       * @memberof eg.Axes
       */


      Axes.VERSION = "2.5.12";
      /**
       * @name eg.Axes.TRANSFORM
       * @desc Returns the transform attribute with CSS vendor prefixes.
       * @ko CSS vendor prefixes를 붙인 transform 속성을 반환한다.
       *
       * @constant
       * @type {String}
       * @example
       * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
       */

      Axes.TRANSFORM = TRANSFORM;
      /**
       * @name eg.Axes.DIRECTION_NONE
       * @constant
       * @type {Number}
       */

      Axes.DIRECTION_NONE = DIRECTION_NONE;
      /**
       * @name eg.Axes.DIRECTION_LEFT
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_LEFT = DIRECTION_LEFT;
      /**
       * @name eg.Axes.DIRECTION_RIGHT
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_RIGHT = DIRECTION_RIGHT;
      /**
       * @name eg.Axes.DIRECTION_UP
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_UP = DIRECTION_UP;
      /**
       * @name eg.Axes.DIRECTION_DOWN
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_DOWN = DIRECTION_DOWN;
      /**
       * @name eg.Axes.DIRECTION_HORIZONTAL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
      /**
       * @name eg.Axes.DIRECTION_VERTICAL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
      /**
       * @name eg.Axes.DIRECTION_ALL
       * @constant
       * @type {Number}
      */

      Axes.DIRECTION_ALL = DIRECTION_ALL;
      return Axes;
    }(Component);

    var SUPPORT_POINTER_EVENTS$1 = "PointerEvent" in win$1 || "MSPointerEvent" in win$1;
    var SUPPORT_TOUCH$1 = "ontouchstart" in win$1;
    var UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";

    function toAxis(source, offset) {
      return offset.reduce(function (acc, v, i) {
        if (source[i]) {
          acc[source[i]] = v;
        }

        return acc;
      }, {});
    }

    function createHammer(element, options) {
      try {
        // create Hammer
        return new Manager(element, __assign$1({}, options));
      } catch (e) {
        return null;
      }
    }

    function convertInputType(inputType) {
      if (inputType === void 0) {
        inputType = [];
      }

      var hasTouch = false;
      var hasMouse = false;
      var hasPointer = false;
      inputType.forEach(function (v) {
        switch (v) {
          case "mouse":
            hasMouse = true;
            break;

          case "touch":
            hasTouch = SUPPORT_TOUCH$1;
            break;

          case "pointer":
            hasPointer = SUPPORT_POINTER_EVENTS$1;
          // no default
        }
      });

      if (hasPointer) {
        return PointerEventInput;
      } else if (hasTouch && hasMouse) {
        return TouchMouseInput;
      } else if (hasTouch) {
        return TouchInput;
      } else if (hasMouse) {
        return MouseInput;
      }

      return null;
    }

    function getDirectionByAngle(angle, thresholdAngle) {
      if (thresholdAngle < 0 || thresholdAngle > 90) {
        return DIRECTION_NONE;
      }

      var toAngle = Math.abs(angle);
      return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL;
    }

    function getNextOffset(speeds, deceleration) {
      var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
      var duration = Math.abs(normalSpeed / -deceleration);
      return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
    }

    function useDirection(checkType, direction, userDirection) {
      if (userDirection) {
        return !!(direction === DIRECTION_ALL || direction & checkType && userDirection & checkType);
      } else {
        return !!(direction & checkType);
      }
    }
    /**
     * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
     * @ko eg.Axes.PanInput 모듈의 옵션 객체
     * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>입력 장치 종류.<br>- touch: 터치 입력 장치<br>- mouse: 마우스</ko>
     * @property {Number[]} [scale] Coordinate scale that a user can move<ko>사용자의 동작으로 이동하는 좌표의 배율</ko>
     * @property {Number} [scale.0=1] horizontal axis scale <ko>수평축 배율</ko>
     * @property {Number} [scale.1=1] vertical axis scale <ko>수직축 배율</ko>
     * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>사용자의 동작이 가로 방향인지 세로 방향인지 판단하는 기준 각도(0~90)</ko>
     * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>사용자의 Pan 동작을 인식하기 위해산 최소한의 거리</ko>
     * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager의 옵션</ko>
    **/

    /**
     * @class eg.Axes.PanInput
     * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
     * @ko 마우스나 터치 스크린을 누르고 움직일때의 변화량을 eg.Axes에 전달하는 모듈. 두개 이하의 축을 사용한다.
     *
     * @example
     * const pan = new eg.Axes.PanInput("#area", {
     * 		inputType: ["touch"],
     * 		scale: [1, 1.3],
     * });
     *
     * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
     * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
     * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
     *
     * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
     * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
     *
     * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
     * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
     *
     * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput 모듈을 사용할 엘리먼트</ko>
     * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput 모듈의 옵션 객체</ko>
     */


    var PanInput =
    /*#__PURE__*/
    function () {
      function PanInput(el, options) {
        this.axes = [];
        this.hammer = null;
        this.element = null;
        this.panRecognizer = null;
        /**
         * Hammer helps you add support for touch gestures to your page
         *
         * @external Hammer
         * @see {@link http://hammerjs.github.io|Hammer.JS}
         * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
         * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
         */

        if (typeof Manager === "undefined") {
          throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
        }

        this.element = $(el);
        this.options = __assign$1({
          inputType: ["touch", "mouse", "pointer"],
          scale: [1, 1],
          thresholdAngle: 45,
          threshold: 0,
          hammerManagerOptions: {
            // css properties were removed due to usablility issue
            // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
            cssProps: {
              userSelect: "none",
              touchSelect: "none",
              touchCallout: "none",
              userDrag: "none"
            }
          }
        }, options);
        this.onHammerInput = this.onHammerInput.bind(this);
        this.onPanmove = this.onPanmove.bind(this);
        this.onPanend = this.onPanend.bind(this);
      }

      var __proto = PanInput.prototype;

      __proto.mapAxes = function (axes) {
        var useHorizontal = !!axes[0];
        var useVertical = !!axes[1];

        if (useHorizontal && useVertical) {
          this._direction = DIRECTION_ALL;
        } else if (useHorizontal) {
          this._direction = DIRECTION_HORIZONTAL;
        } else if (useVertical) {
          this._direction = DIRECTION_VERTICAL;
        } else {
          this._direction = DIRECTION_NONE;
        }

        this.axes = axes;
      };

      __proto.connect = function (observer) {
        var hammerOption = {
          direction: this._direction,
          threshold: this.options.threshold
        };

        if (this.hammer) {
          // for sharing hammer instance.
          // hammer remove previous PanRecognizer.
          this.removeRecognizer();
          this.dettachEvent();
        } else {
          var keyValue = this.element[UNIQUEKEY];

          if (!keyValue) {
            keyValue = String(Math.round(Math.random() * new Date().getTime()));
          }

          var inputClass = convertInputType(this.options.inputType);

          if (!inputClass) {
            throw new Error("Wrong inputType parameter!");
          }

          this.hammer = createHammer(this.element, __assign$1({
            inputClass: inputClass
          }, this.options.hammerManagerOptions));
          this.element[UNIQUEKEY] = keyValue;
        }

        this.panRecognizer = new PanRecognizer(hammerOption);
        this.hammer.add(this.panRecognizer);
        this.attachEvent(observer);
        return this;
      };

      __proto.disconnect = function () {
        this.removeRecognizer();

        if (this.hammer) {
          this.dettachEvent();
        }

        this._direction = DIRECTION_NONE;
        return this;
      };
      /**
      * Destroys elements, properties, and events used in a module.
      * @ko 모듈에 사용한 엘리먼트와 속성, 이벤트를 해제한다.
      * @method eg.Axes.PanInput#destroy
      */


      __proto.destroy = function () {
        this.disconnect();

        if (this.hammer && this.hammer.recognizers.length === 0) {
          this.hammer.destroy();
        }

        delete this.element[UNIQUEKEY];
        this.element = null;
        this.hammer = null;
      };
      /**
       * Enables input devices
       * @ko 입력 장치를 사용할 수 있게 한다
       * @method eg.Axes.PanInput#enable
       * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.enable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = true);
        return this;
      };
      /**
       * Disables input devices
       * @ko 입력 장치를 사용할 수 없게 한다.
       * @method eg.Axes.PanInput#disable
       * @return {eg.Axes.PanInput} An instance of a module itself <ko>모듈 자신의 인스턴스</ko>
       */


      __proto.disable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = false);
        return this;
      };
      /**
       * Returns whether to use an input device
       * @ko 입력 장치를 사용 여부를 반환한다.
       * @method eg.Axes.PanInput#isEnable
       * @return {Boolean} Whether to use an input device <ko>입력장치 사용여부</ko>
       */


      __proto.isEnable = function () {
        return !!(this.hammer && this.hammer.get("pan").options.enable);
      };

      __proto.removeRecognizer = function () {
        if (this.hammer && this.panRecognizer) {
          this.hammer.remove(this.panRecognizer);
          this.panRecognizer = null;
        }
      };

      __proto.onHammerInput = function (event) {
        if (this.isEnable()) {
          if (event.isFirst) {
            this.observer.hold(this, event);
          } else if (event.isFinal) {
            this.onPanend(event);
          }
        }
      };

      __proto.onPanmove = function (event) {
        var userDirection = getDirectionByAngle(event.angle, this.options.thresholdAngle); // not support offset properties in Hammerjs - start

        var prevInput = this.hammer.session.prevInput;
        /* eslint-disable no-param-reassign */

        if (prevInput) {
          event.offsetX = event.deltaX - prevInput.deltaX;
          event.offsetY = event.deltaY - prevInput.deltaY;
        } else {
          event.offsetX = 0;
          event.offsetY = 0;
        }

        var offset = this.getOffset([event.offsetX, event.offsetY], [useDirection(DIRECTION_HORIZONTAL, this._direction, userDirection), useDirection(DIRECTION_VERTICAL, this._direction, userDirection)]);
        var prevent = offset.some(function (v) {
          return v !== 0;
        });

        if (prevent) {
          event.srcEvent.preventDefault();
          event.srcEvent.stopPropagation();
        }

        event.preventSystemEvent = prevent;
        prevent && this.observer.change(this, event, toAxis(this.axes, offset));
      };

      __proto.onPanend = function (event) {
        var offset = this.getOffset([Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1), Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)], [useDirection(DIRECTION_HORIZONTAL, this._direction), useDirection(DIRECTION_VERTICAL, this._direction)]);
        offset = getNextOffset(offset, this.observer.options.deceleration);
        this.observer.release(this, event, toAxis(this.axes, offset));
      };

      __proto.attachEvent = function (observer) {
        this.observer = observer;
        this.hammer.on("hammer.input", this.onHammerInput).on("panstart panmove", this.onPanmove);
      };

      __proto.dettachEvent = function () {
        this.hammer.off("hammer.input", this.onHammerInput).off("panstart panmove", this.onPanmove);
        this.observer = null;
      };

      __proto.getOffset = function (properties, direction) {
        var offset = [0, 0];
        var scale = this.options.scale;

        if (direction[0]) {
          offset[0] = properties[0] * scale[0];
        }

        if (direction[1]) {
          offset[1] = properties[1] * scale[1];
        }

        return offset;
      };

      return PanInput;
    }();

    function merge$1(target) {
      var srcs = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        srcs[_i - 1] = arguments[_i];
      }

      srcs.forEach(function (source) {
        Object.keys(source).forEach(function (key) {
          var value = source[key];
          target[key] = value;
        });
      });
      return target;
    }
    function parseElement(element) {
      if (!Array.isArray(element)) {
        element = [element];
      }

      var elements = [];
      element.forEach(function (el) {
        if (isString(el)) {
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = el;
          elements.push.apply(elements, toArray$2(tempDiv.children));
        } else {
          elements.push(el);
        }
      });
      return elements;
    } // Check whether browser supports transform: translate3d
    // https://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support

    var checkTranslateSupport = function () {
      var transforms = {
        webkitTransform: "-webkit-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        OTransform: "-o-transform",
        transform: "transform"
      };
      var supportedStyle = document.documentElement.style;
      var transformName = "";

      for (var prefixedTransform in transforms) {
        if (prefixedTransform in supportedStyle) {
          transformName = prefixedTransform;
        }
      }

      if (!transformName) {
        throw new Error("Browser doesn't support CSS3 2D Transforms.");
      }

      var el = document.createElement("div");
      document.documentElement.insertBefore(el, null);
      el.style[transformName] = "translate3d(1px, 1px, 1px)";
      var styleVal = window.getComputedStyle(el).getPropertyValue(transforms[transformName]);
      el.parentElement.removeChild(el);
      var transformInfo = {
        name: transformName,
        has3d: styleVal.length > 0 && styleVal !== "none"
      };

      checkTranslateSupport = function () {
        return transformInfo;
      };

      return transformInfo;
    };
    function isString(value) {
      return typeof value === "string";
    } // Get class list of element as string array

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        if (element.className.indexOf(className) < 0) {
          element.className = (element.className + " " + className).replace(/\s{2,}/g, " ");
        }
      }
    }
    function applyCSS(element, cssObj) {
      Object.keys(cssObj).forEach(function (property) {
        element.style[property] = cssObj[property];
      });
    }
    function clamp(val, min, max) {
      return Math.max(Math.min(val, max), min);
    } // Min: inclusive, Max: exclusive

    function isBetween(val, min, max) {
      return val >= min && val <= max;
    }
    function toArray$2(iterable) {
      return [].slice.call(iterable);
    }
    function isArray(arr) {
      return arr && arr.constructor === Array;
    }
    function parseArithmeticExpression(cssValue, base, defaultVal) {
      // Set base / 2 to default value, if it's undefined
      var defaultValue = defaultVal != null ? defaultVal : base / 2;
      var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

      if (typeof cssValue === "number") {
        return clamp(cssValue, 0, base);
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
          return defaultValue;
        }

        if (unit === "%") {
          parsedValue = parsedValue / 100 * base;
        }

        calculatedValue += sign === "+" ? parsedValue : -parsedValue; // Match next occurrence

        ++idx;
        matchResult = cssRegex.exec(cssValue);
      } // None-matched


      if (idx === 0) {
        return defaultValue;
      } // Clamp between 0 ~ base


      return clamp(calculatedValue, 0, base);
    }
    function getProgress(pos, range) {
      // start, anchor, end
      // -1 , 0 , 1
      var min = range[0],
          center = range[1],
          max = range[2];

      if (pos > center && max - center) {
        // 0 ~ 1
        return (pos - center) / (max - center);
      } else if (pos < center && center - min) {
        // -1 ~ 0
        return (pos - center) / (center - min);
      } else if (pos !== center && max - min) {
        return (pos - min) / (max - min);
      }

      return 0;
    }
    function findIndex(iterable, callback) {
      for (var i = 0; i < iterable.length; i += 1) {
        var element = iterable[i];

        if (element && callback(element)) {
          return i;
        }
      }

      return -1;
    } // return [0, 1, ...., max - 1]

    function counter(max) {
      var counterArray = [];

      for (var i = 0; i < max; i += 1) {
        counterArray[i] = i;
      }

      return counterArray;
    }

    var DEFAULT_MOVE_TYPE_OPTIONS = {
      snap: {
        type: "snap",
        count: 1
      },
      freeScroll: {
        type: "freeScroll"
      }
    };
    var DEFAULT_OPTIONS = {
      classPrefix: "eg-flick",
      deceleration: 0.0075,
      horizontal: true,
      circular: false,
      infinite: false,
      infiniteThreshold: 0,
      lastIndex: Infinity,
      threshold: 40,
      duration: 100,
      panelEffect: function (x) {
        return 1 - Math.pow(1 - x, 3);
      },
      defaultIndex: 0,
      inputType: ["touch", "mouse"],
      thresholdAngle: 45,
      bounce: 10,
      autoResize: false,
      adaptive: false,
      zIndex: 2000,
      bound: false,
      overflow: false,
      hanger: "50%",
      anchor: "50%",
      gap: 0,
      moveType: DEFAULT_MOVE_TYPE_OPTIONS.snap
    };
    var DEFAULT_VIEWPORT_CSS = {
      position: "relative",
      zIndex: DEFAULT_OPTIONS.zIndex,
      width: "100%",
      height: "100%",
      // willChange: "transform",
      overflow: "hidden"
    };
    var DEFAULT_CAMERA_CSS = {
      width: "100%",
      height: "100%",
      willChange: "transform"
    };
    var DEFAULT_PANEL_CSS = {
      position: "absolute"
    };
    var EVENTS = {
      HOLD_START: "holdStart",
      HOLD_END: "holdEnd",
      MOVE_START: "moveStart",
      MOVE: "move",
      MOVE_END: "moveEnd",
      CHANGE: "change",
      RESTORE: "restore",
      SELECT: "select",
      NEED_PANEL: "needPanel"
    };
    var AXES_EVENTS = {
      HOLD: "hold",
      CHANGE: "change",
      RELEASE: "release",
      ANIMATION_END: "animationEnd",
      FINISH: "finish"
    };
    var STATE_TYPE = {
      IDLE: 0,
      HOLDING: 1,
      DRAGGING: 2,
      ANIMATING: 3,
      DISABLED: 4
    };
    var DIRECTION = {
      PREV: "PREV",
      NEXT: "NEXT"
    };
    var TRANSFORM$1 = checkTranslateSupport();

    var Panel =
    /*#__PURE__*/
    function () {
      function Panel(element, index, options) {
        this.element = element;
        this.prevSibling = null;
        this.nextSibling = null;
        this.state = {
          index: index,
          position: 0,
          relativeAnchorPosition: 0,
          size: 0,
          clonedPanels: [],
          isClone: false,
          cloneIndex: -1,
          originalStyle: {
            className: element.getAttribute("class") || null,
            style: element.getAttribute("style") || null
          },
          cachedBbox: null
        };
        this.options = options;

        if (options.classPrefix) {
          addClass(element, options.classPrefix + "-panel");
        } // Update size info after applying panel css


        applyCSS(this.element, DEFAULT_PANEL_CSS);
      }

      var __proto = Panel.prototype;

      __proto.resize = function () {
        var state = this.state;
        var bbox = this.getBbox();
        state.size = this.options.horizontal ? bbox.width : bbox.height;
        state.relativeAnchorPosition = parseArithmeticExpression(this.options.anchor, state.size);

        if (!state.isClone) {
          state.clonedPanels.forEach(function (panel) {
            return panel.resize();
          });
        }
      };

      __proto.reset = function () {
        this.state.cachedBbox = null;
      };

      __proto.destroy = function () {
        var el = this.element;
        var originalStyle = this.state.originalStyle;
        originalStyle.className ? el.setAttribute("class", originalStyle.className) : el.removeAttribute("class");
        originalStyle.style ? el.setAttribute("style", originalStyle.style) : el.removeAttribute("style"); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.getElement = function () {
        return this.element;
      };

      __proto.getAnchorPosition = function () {
        return this.state.position + this.state.relativeAnchorPosition;
      };

      __proto.getRelativeAnchorPosition = function () {
        return this.state.relativeAnchorPosition;
      };

      __proto.getIndex = function () {
        return this.state.index;
      };

      __proto.getPosition = function () {
        return this.state.position;
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getBbox = function () {
        var state = this.state;

        if (!state.cachedBbox) {
          state.cachedBbox = this.element.getBoundingClientRect();
        }

        return state.cachedBbox;
      };

      __proto.isClone = function () {
        return this.state.isClone;
      };

      __proto.getCloneIndex = function () {
        return this.state.cloneIndex;
      };

      __proto.getClonedPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getClonedPanels() : state.clonedPanels;
      };

      __proto.getIdenticalPanels = function () {
        var state = this.state;
        return state.isClone ? this.original.getIdenticalPanels() : [this].concat(state.clonedPanels);
      };

      __proto.getOriginalPanel = function () {
        return this.state.isClone ? this.original : this;
      };

      __proto.setIndex = function (index) {
        var state = this.state;
        state.index = index;
        state.clonedPanels.forEach(function (panel) {
          return panel.state.index = index;
        });
      };

      __proto.setPosition = function (pos) {
        var state = this.state;
        var options = this.options;
        var elementStyle = this.element.style;
        state.position = pos;
        options.horizontal ? elementStyle.left = pos + "px" : elementStyle.top = pos + "px";
      };

      __proto.clone = function (cloneIndex) {
        var state = this.state;
        var cloneElement = this.element.cloneNode(true);
        var clonedPanel = new Panel(cloneElement, state.index, this.options);
        var clonedState = clonedPanel.state;
        clonedPanel.original = this;
        clonedState.isClone = true;
        clonedState.cloneIndex = cloneIndex; // Inherit some state values

        clonedState.size = state.size;
        clonedState.relativeAnchorPosition = state.relativeAnchorPosition;
        clonedState.originalStyle = state.originalStyle;
        clonedState.cachedBbox = state.cachedBbox;
        state.clonedPanels.push(clonedPanel);
        return clonedPanel;
      };

      __proto.remove = function () {
        var element = this.element;
        element.parentNode.removeChild(element);

        if (!this.state.isClone) {
          this.removeClonedPanelsAfter(0);
        }
      };

      __proto.removeClonedPanelsAfter = function (start) {
        var state = this.state;
        var removingPanels = state.clonedPanels.splice(start);
        removingPanels.forEach(function (panel) {
          panel.remove();
        });
      };

      return Panel;
    }();

    var PanelManager =
    /*#__PURE__*/
    function () {
      function PanelManager(cameraElement, options) {
        this.cameraElement = cameraElement;
        this.panels = [];
        this.clones = [];
        this.range = {
          min: -1,
          max: -1
        };
        this.length = 0;
        this.options = options;
        this.lastIndex = options.lastIndex;
      }

      var __proto = PanelManager.prototype;

      __proto.firstPanel = function () {
        return this.panels[this.range.min];
      };

      __proto.lastPanel = function () {
        return this.panels[this.range.max];
      };

      __proto.allPanels = function () {
        return this.panels.concat(this.clonedPanels());
      };

      __proto.originalPanels = function () {
        return this.panels;
      };

      __proto.clonedPanels = function () {
        return this.clones.reduce(function (allClones, clones) {
          return allClones.concat(clones);
        }, []);
      };

      __proto.has = function (index) {
        return !!this.panels[index];
      };

      __proto.get = function (index) {
        return this.panels[index];
      };

      __proto.getPanelCount = function () {
        return this.length;
      };

      __proto.getLastIndex = function () {
        return this.lastIndex;
      };

      __proto.getRange = function () {
        return this.range;
      };

      __proto.getCloneCount = function () {
        return this.clones.length;
      };

      __proto.setLastIndex = function (lastIndex) {
        this.lastIndex = lastIndex;
        var firstPanel = this.firstPanel();
        var lastPanel = this.lastPanel();

        if (!firstPanel || !lastPanel) {
          return; // no meaning of updating range & length
        } // Remove panels above new last index


        var range = this.range;

        if (lastPanel.getIndex() > lastIndex) {
          var removingPanels = this.panels.splice(lastIndex + 1);
          removingPanels.forEach(function (panel) {
            return panel.remove();
          });
          this.length -= removingPanels.length;
          var firstRemovedPanel = removingPanels.filter(function (panel) {
            return !!panel;
          })[0];
          var possibleLastPanel = firstRemovedPanel.prevSibling;

          if (possibleLastPanel) {
            range.max = possibleLastPanel.getIndex();
          } else {
            range.min = -1;
            range.max = -1;
          }
        }
      };

      __proto.append = function (newPanels) {
        var range = this.range;

        (_a = this.panels).push.apply(_a, newPanels);

        if (newPanels.length > 0) {
          range.min = Math.max(0, range.min);
          range.max += newPanels.length;
          this.length += newPanels.length;
        }

        var _a;
      }; // Insert at index
      // Returns pushed elements from index, inserting at 'empty' position doesn't push elements behind it


      __proto.insert = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var cameraElement = this.cameraElement;
        var isCircular = this.options.circular;
        var lastIndex = this.lastIndex; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        var fragment = document.createDocumentFragment();
        newPanels.forEach(function (panel) {
          return fragment.appendChild(panel.getElement());
        });
        cameraElement.insertBefore(fragment, siblingElement);
        var pushedIndex = newPanels.length; // Like when setting index 50 while visible panels are 0, 1, 2

        if (index > range.max) {
          newPanels.forEach(function (panel, offset) {
            panels[index + offset] = panel;
          });
        } else {
          var panelsAfterIndex = panels.slice(index, index + newPanels.length); // Find empty from beginning

          var emptyPanelCount = findIndex(panelsAfterIndex, function (panel) {
            return !!panel;
          });

          if (emptyPanelCount < 0) {
            // All empty
            emptyPanelCount = panelsAfterIndex.length;
          }

          pushedIndex = newPanels.length - emptyPanelCount; // Insert removing empty panels

          panels.splice.apply(panels, [index, emptyPanelCount].concat(newPanels)); // Remove panels after last index

          if (panels.length > lastIndex + 1) {
            var removedPanels = panels.splice(lastIndex + 1).filter(function (panel) {
              return Boolean(panel);
            });
            removedPanels.forEach(function (panel) {
              return panel.remove();
            });
            this.length -= removedPanels.length;
          }
        } // Update index of previous panels


        if (pushedIndex > 0) {
          panels.slice(index + newPanels.length).forEach(function (panel) {
            panel.setIndex(panel.getIndex() + pushedIndex);
          });
        }

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length - pushedIndex, nextSibling);
        } // Update state


        this.length += newPanels.length;
        this.updateIndex(index);
        return pushedIndex;
      };

      __proto.replace = function (index, newPanels) {
        var panels = this.panels;
        var range = this.range;
        var cameraElement = this.cameraElement;
        var isCircular = this.options.circular; // Find first panel that index is greater than inserting index

        var nextSibling = this.findFirstPanelFrom(index + newPanels.length); // if it's null, element will be inserted at last position
        // https://developer.mozilla.org/ko/docs/Web/API/Node/insertBefore#Syntax

        var firstPanel = this.firstPanel();
        var siblingElement = nextSibling ? nextSibling.getElement() : isCircular && firstPanel ? firstPanel.getClonedPanels()[0].getElement() : null; // Insert panels before sibling element

        var fragment = document.createDocumentFragment();
        newPanels.forEach(function (panel) {
          return fragment.appendChild(panel.getElement());
        });
        cameraElement.insertBefore(fragment, siblingElement);

        if (index > range.max) {
          // Temporarily insert null at index to use splice()
          panels[index] = null;
        }

        var replacedPanels = panels.splice.apply(panels, [index, newPanels.length].concat(newPanels));
        var wasNonEmptyCount = replacedPanels.filter(function (panel) {
          return Boolean(panel);
        }).length;
        replacedPanels.forEach(function (panel) {
          if (panel) {
            panel.remove();
          }
        }); // Suppose inserting [1, 2, 3] at 0 position when there were [empty, 1]
        // So length should be increased by 3(inserting panels) - 1(non-empty panels)

        this.length += newPanels.length - wasNonEmptyCount;
        this.updateIndex(index);

        if (isCircular) {
          this.addNewClones(index, newPanels, newPanels.length, nextSibling);
        }
      };

      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        var isCircular = this.options.circular;
        var panels = this.panels;
        var clones = this.clones; // Delete count should be equal or larger than 0

        deleteCount = Math.max(deleteCount, 0);
        var deletedPanels = panels.splice(index, deleteCount).filter(function (panel) {
          return !!panel;
        });
        deletedPanels.forEach(function (panel) {
          panel.remove();
        });

        if (isCircular) {
          clones.forEach(function (cloneSet) {
            cloneSet.splice(index, deleteCount);
          });
        } // Update indexes


        panels.slice(index).forEach(function (panel) {
          panel.setIndex(panel.getIndex() - deleteCount);
        }); // Check last panel is empty

        var lastIndex = panels.length - 1;

        if (!panels[lastIndex]) {
          var reversedPanels = panels.concat().reverse();
          var nonEmptyIndexFromLast = findIndex(reversedPanels, function (panel) {
            return !!panel;
          });
          lastIndex = nonEmptyIndexFromLast < 0 ? -1 // All empty
          : lastIndex - nonEmptyIndexFromLast; // Remove all empty panels from last

          panels.splice(lastIndex + 1);

          if (isCircular) {
            clones.forEach(function (cloneSet) {
              cloneSet.splice(lastIndex + 1);
            });
          }
        } // Update range & length


        this.range = {
          min: findIndex(panels, function (panel) {
            return !!panel;
          }),
          max: lastIndex
        };
        this.length -= deletedPanels.length;

        if (this.length <= 0) {
          // Reset clones
          this.clones = [];
        }

        return deletedPanels;
      };

      __proto.chainAllPanels = function () {
        var allPanels = this.allPanels().filter(function (panel) {
          return !!panel;
        });
        var allPanelsCount = allPanels.length;

        if (allPanelsCount <= 0) {
          return;
        }

        allPanels.forEach(function (panel, idx) {
          var prevPanel = idx > 0 ? allPanels[idx - 1] : null;
          var nextPanel = idx < allPanelsCount - 1 ? allPanels[idx + 1] : null;
          panel.prevSibling = prevPanel;
          panel.nextSibling = nextPanel;
        });

        if (this.options.circular) {
          var firstPanel = allPanels[0];
          var lastPanel = allPanels[allPanelsCount - 1];
          firstPanel.prevSibling = lastPanel;
          lastPanel.nextSibling = firstPanel;
        }
      };

      __proto.insertClones = function (cloneIndex, index, clonedPanels, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 0;
        }

        var clones = this.clones;
        var lastIndex = this.lastIndex;

        if (!clones[cloneIndex]) {
          var newClones_1 = [];
          clonedPanels.forEach(function (panel, offset) {
            newClones_1[index + offset] = panel;
          });
          clones[cloneIndex] = newClones_1;
        } else {
          var insertTarget_1 = clones[cloneIndex];

          if (index >= insertTarget_1.length) {
            clonedPanels.forEach(function (panel, offset) {
              insertTarget_1[index + offset] = panel;
            });
          } else {
            insertTarget_1.splice.apply(insertTarget_1, [index, deleteCount].concat(clonedPanels)); // Remove panels after last index

            if (clonedPanels.length > lastIndex + 1) {
              clonedPanels.splice(lastIndex + 1);
            }
          }
        }
      }; // clones are operating in set


      __proto.removeClonesAfter = function (cloneIndex) {
        var panels = this.panels;
        panels.forEach(function (panel) {
          panel.removeClonedPanelsAfter(cloneIndex);
        });
        this.clones.splice(cloneIndex);
      }; // Clear both original & cloned


      __proto.clear = function () {
        this.panels.forEach(function (panel) {
          panel.remove();
          panel.removeClonedPanelsAfter(0);
        });
        this.panels = [];
        this.clones = [];
        this.length = 0;
        this.range = {
          min: -1,
          max: -1
        };
      };

      __proto.clearClone = function () {
        this.panels.forEach(function (panel) {
          panel.removeClonedPanelsAfter(0);
        });
        this.clones = [];
      };

      __proto.findPanelOf = function (element) {
        var allPanels = this.allPanels();

        for (var _i = 0, allPanels_1 = allPanels; _i < allPanels_1.length; _i++) {
          var panel = allPanels_1[_i];

          if (!panel) {
            continue;
          }

          var panelElement = panel.getElement();

          if (panelElement.contains(element)) {
            return panel;
          }
        }
      };

      __proto.findFirstPanelFrom = function (index) {
        for (var _i = 0, _a = this.panels; _i < _a.length; _i++) {
          var panel = _a[_i];

          if (panel && panel.getIndex() >= index) {
            return panel;
          }
        }
      };

      __proto.addNewClones = function (index, originalPanels, deleteCount, nextSibling) {
        var cameraElement = this.cameraElement;
        var cloneCount = this.getCloneCount();
        var lastPanel = this.lastPanel();
        var lastPanelClones = lastPanel ? lastPanel.getClonedPanels() : [];
        var nextSiblingClones = nextSibling ? nextSibling.getClonedPanels() : [];

        var _loop_1 = function (cloneIndex) {
          var cloneNextSibling = nextSiblingClones[cloneIndex];
          var lastPanelSibling = lastPanelClones[cloneIndex];
          var cloneSiblingElement = cloneNextSibling ? cloneNextSibling.getElement() : lastPanelSibling ? lastPanelSibling.getElement().nextElementSibling : null;
          var newClones = originalPanels.map(function (panel) {
            var clone = panel.clone(cloneIndex);
            cameraElement.insertBefore(clone.getElement(), cloneSiblingElement);
            return clone;
          });
          this_1.insertClones(cloneIndex, index, newClones, deleteCount);
        };

        var this_1 = this;

        for (var _i = 0, _a = counter(cloneCount); _i < _a.length; _i++) {
          var cloneIndex = _a[_i];

          _loop_1(cloneIndex);
        }
      };

      __proto.updateIndex = function (insertingIndex) {
        var panels = this.panels;
        var range = this.range;
        var newLastIndex = panels.length - 1;

        if (newLastIndex > range.max) {
          range.max = newLastIndex;
        }

        if (insertingIndex < range.min || range.min < 0) {
          range.min = insertingIndex;
        }
      };

      return PanelManager;
    }();

    var State =
    /*#__PURE__*/
    function () {
      function State() {
        this.delta = 0;
        this.direction = null;
        this.targetPanel = null;
        this.targetOffset = 0;
        this.lastPosition = 0;
      }

      var __proto = State.prototype;

      __proto.onEnter = function (prevState) {
        this.delta = prevState.delta;
        this.direction = prevState.direction;
        this.targetPanel = prevState.targetPanel;
        this.targetOffset = prevState.targetOffset;
        this.lastPosition = prevState.lastPosition;
      };

      __proto.onExit = function (nextState) {// DO NOTHING
      };

      __proto.onHold = function (e, context) {// DO NOTHING
      };

      __proto.onChange = function (e, context) {// DO NOTHING
      };

      __proto.onRelease = function (e, context) {// DO NOTHING
      };

      __proto.onAnimationEnd = function (e, context) {// DO NOTHING
      };

      __proto.onFinish = function (e, context) {// DO NOTHING
      };

      return State;
    }();

    var IdleState =
    /*#__PURE__*/
    function (_super) {
      __extends(IdleState, _super);

      function IdleState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.IDLE;
        _this.holding = false;
        _this.playing = false;
        return _this;
      }

      var __proto = IdleState.prototype;

      __proto.onEnter = function () {
        this.direction = null;
        this.targetPanel = null;
        this.delta = 0;
        this.targetOffset = 0;
        this.lastPosition = 0;
      };

      __proto.onHold = function (e, _a) {
        var flicking = _a.flicking,
            viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Shouldn't do any action until any panels on flicking area

        if (flicking.getPanelCount() <= 0) {
          transitTo(STATE_TYPE.DISABLED);
          return;
        }

        this.lastPosition = viewport.getCameraPosition();
        triggerEvent(EVENTS.HOLD_START, e, true).onSuccess(function () {
          transitTo(STATE_TYPE.HOLDING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      }; // By methods call


      __proto.onChange = function (e, context) {
        var triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        triggerEvent(EVENTS.MOVE_START, e, false).onSuccess(function () {
          // Trigger AnimatingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.ANIMATING).onChange(e, context);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      return IdleState;
    }(State);

    var HoldingState =
    /*#__PURE__*/
    function (_super) {
      __extends(HoldingState, _super);

      function HoldingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.HOLDING;
        _this.holding = true;
        _this.playing = true;
        _this.releaseEvent = null;
        return _this;
      }

      var __proto = HoldingState.prototype;

      __proto.onChange = function (e, context) {
        var flicking = context.flicking,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        var offset = flicking.options.horizontal ? e.inputEvent.offsetX : e.inputEvent.offsetY;
        this.direction = offset < 0 ? DIRECTION.NEXT : DIRECTION.PREV;
        triggerEvent(EVENTS.MOVE_START, e, true).onSuccess(function () {
          // Trigger DraggingState's onChange, to trigger "move" event immediately
          transitTo(STATE_TYPE.DRAGGING).onChange(e, context);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onRelease = function (e, context) {
        var viewport = context.viewport,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo;
        triggerEvent(EVENTS.HOLD_END, e, true);

        if (e.delta.flick !== 0) {
          // Sometimes "release" event on axes triggered before "change" event
          // Especially if user flicked panel fast in really short amount of time
          // if delta is not zero, that means above case happened.
          // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
          // At least one move event should be included between holdStart and holdEnd
          e.setTo({
            flick: viewport.getCameraPosition()
          }, 0);
          transitTo(STATE_TYPE.IDLE);
          return;
        } // Can't handle select event here,
        // As "finish" axes event happens


        this.releaseEvent = e;
      };

      __proto.onFinish = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Should transite to IDLE state before select event
        // As user expects hold is already finished

        transitTo(STATE_TYPE.IDLE);

        if (!this.releaseEvent) {
          return;
        } // Handle release event here
        // To prevent finish event called twice


        var releaseEvent = this.releaseEvent; // Static click

        var clickedElement = releaseEvent.inputEvent.srcEvent.target;
        var clickedPanel = viewport.panelManager.findPanelOf(clickedElement);
        var cameraPosition = viewport.getCameraPosition();

        if (clickedPanel) {
          var clickedPanelPosition = clickedPanel.getPosition();
          var direction = clickedPanelPosition > cameraPosition ? DIRECTION.NEXT : clickedPanelPosition < cameraPosition ? DIRECTION.PREV : null; // Don't provide axes event, to use axes instance instead

          triggerEvent(EVENTS.SELECT, null, true, {
            direction: direction,
            index: clickedPanel.getIndex(),
            panel: viewport.castToFlickingPanel(clickedPanel)
          });
        }
      };

      return HoldingState;
    }(State);

    var DraggingState =
    /*#__PURE__*/
    function (_super) {
      __extends(DraggingState, _super);

      function DraggingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.DRAGGING;
        _this.holding = true;
        _this.playing = true;
        return _this;
      }

      var __proto = DraggingState.prototype;

      __proto.onEnter = function (prevState) {
        _super.prototype.onEnter.call(this, prevState);

        this.delta = 0;
      };

      __proto.onChange = function (e, _a) {
        var moveCamera = _a.moveCamera,
            transitTo = _a.transitTo;

        if (!e.delta.flick) {
          return;
        }

        moveCamera(e).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onRelease = function (e, context) {
        var flicking = context.flicking,
            viewport = context.viewport,
            triggerEvent = context.triggerEvent,
            transitTo = context.transitTo,
            stopCamera = context.stopCamera;
        var delta = this.delta;
        var options = flicking.options;
        var horizontal = options.horizontal;
        var defaultDuration = options.duration;
        var halfGap = options.gap / 2;
        var moveType = options.moveType;
        var isFreeScroll = moveType.type === "freeScroll";
        var snapCount = isFreeScroll ? Infinity : moveType.count;
        var inputEvent = e.inputEvent;
        var eventDelta = Math.abs(e.delta.flick);
        var velocity = horizontal ? inputEvent.velocityX : inputEvent.velocityY;
        var inputDelta = horizontal ? inputEvent.deltaX : inputEvent.deltaY;
        var isNextDirection = Math.abs(velocity) > 1 ? velocity < 0 : Math.abs(delta) > 0 ? delta > 0 : inputDelta < 0;
        var swipeDistance = Math.max(Math.abs(delta), Math.abs(inputDelta));
        var swipeAngle = inputEvent.deltaX ? Math.abs(180 * Math.atan(inputEvent.deltaY / inputEvent.deltaX) / Math.PI) : 90;
        var belowAngleThreshold = horizontal ? swipeAngle <= options.thresholdAngle : swipeAngle > options.thresholdAngle;
        var overThreshold = swipeDistance >= options.threshold && belowAngleThreshold; // Update last position to cope with Axes's animating behavior
        // Axes uses start position when animation start

        this.lastPosition = viewport.getCameraPosition();
        triggerEvent(EVENTS.HOLD_END, e, true);

        if (!overThreshold && this.targetPanel) {
          // Interrupted while animating
          viewport.moveTo(this.targetPanel, "", e, this.targetOffset);
          transitTo(STATE_TYPE.ANIMATING);
          return;
        }

        var currentPanel = viewport.getCurrentPanel();
        var nearestPanel = viewport.getNearestPanel();

        if (!currentPanel || !nearestPanel) {
          // There're no panels
          e.stop();
          transitTo(STATE_TYPE.IDLE);
          return;
        } // Minimum distance needed to decide prev/next panel as nearest

        /*
         * |  Prev  |     Next     |
         * |--------|--------------|
         * [][      |<-Anchor    ][] <- Panel + Half-Gap
         */


        var minimumDistanceToChange = isNextDirection ? currentPanel.getSize() - currentPanel.getRelativeAnchorPosition() + halfGap : currentPanel.getRelativeAnchorPosition() + halfGap;
        minimumDistanceToChange = Math.max(minimumDistanceToChange, options.threshold);
        var duration = defaultDuration;
        var panelToMove;
        var offset = 0;

        if (overThreshold) {
          if (snapCount > 1 && eventDelta > minimumDistanceToChange) {
            var basePanel = isFreeScroll ? nearestPanel : viewport.findNearestIdenticalPanel(currentPanel); // FreeScroll & snap

            var _a = this.findPanelWhenSnapIsOn({
              isNextDirection: isNextDirection,
              e: e,
              viewport: viewport,
              basePanel: basePanel
            }),
                panelAtDestPos = _a.panelAtDestPos,
                snapOffset = _a.snapOffset,
                indexDiff = _a.indexDiff;

            panelToMove = panelAtDestPos;
            offset = snapOffset;
            duration = clamp(e.duration, defaultDuration, defaultDuration * indexDiff);
          } else if (!isFreeScroll && !viewport.isOutOfBound() && (swipeDistance <= minimumDistanceToChange || !options.circular && nearestPanel.getIndex() === currentPanel.getIndex())) {
            panelToMove = this.findAdjacentPanel(isNextDirection, viewport);
          } else {
            panelToMove = nearestPanel;
          }
        } else {
          panelToMove = options.circular ? this.findRestorePanelInCircularMode(isNextDirection, viewport) : currentPanel;
        }

        var panelPosition = panelToMove.getPosition() + offset;
        var movingToSamePanel = panelPosition === currentPanel.getPosition();
        var eventType = !overThreshold || movingToSamePanel ? isFreeScroll ? "" : EVENTS.RESTORE : EVENTS.CHANGE;
        viewport.moveTo(panelToMove, eventType, e, offset, duration).onSuccess(function () {
          transitTo(STATE_TYPE.ANIMATING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
          stopCamera(e);
        });
      };

      __proto.findRestorePanelInCircularMode = function (isNextDirection, viewport) {
        var originalPanel = viewport.getCurrentPanel().getOriginalPanel();
        var hangerPosition = viewport.getHangerPosition();
        var firstClonedPanel = originalPanel.getIdenticalPanels()[1];
        var lapped = Math.abs(originalPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition);
        var panelToMove = !isNextDirection && lapped ? firstClonedPanel : originalPanel;
        return panelToMove;
      };

      __proto.findPanelWhenSnapIsOn = function (params) {
        var isNextDirection = params.isNextDirection,
            e = params.e,
            viewport = params.viewport,
            basePanel = params.basePanel;
        var options = viewport.options;
        var scrollAreaSize = viewport.getScrollAreaSize();
        var indexRange = viewport.panelManager.getRange();
        var halfGap = options.gap / 2;
        var estimatedHangerPos = e.destPos.flick + viewport.getRelativeHangerPosition();
        var moveType = options.moveType;
        var snapCount = moveType.type === "freeScroll" ? Infinity : moveType.count;
        var panelToMove = basePanel;
        var passedPanelCount = 0;
        var cycleIndex = panelToMove.getIndex() === indexRange.min ? basePanel.getCloneIndex() + 1 : 0;

        while (passedPanelCount < snapCount) {
          var siblingPanel = isNextDirection ? panelToMove.nextSibling : panelToMove.prevSibling;

          if (!siblingPanel) {
            break;
          }

          var panelIndex = panelToMove.getIndex();
          var siblingIndex = siblingPanel.getIndex();

          if (isNextDirection && siblingIndex <= panelIndex || !isNextDirection && siblingIndex >= panelIndex) {
            cycleIndex = isNextDirection ? cycleIndex + 1 : cycleIndex - 1;
          }

          panelToMove = siblingPanel;
          passedPanelCount += 1; // Since panlToMove holds also cloned panels, we should use original panel's position

          var originalPanel = panelToMove.getOriginalPanel();
          var panelPosition = originalPanel.getPosition() + cycleIndex * scrollAreaSize;
          var panelSize = originalPanel.getSize(); // Current panelToMove contains destPos

          if (isNextDirection && panelPosition + panelSize + halfGap > estimatedHangerPos || !isNextDirection && panelPosition - halfGap < estimatedHangerPos) {
            break;
          }
        }

        var originalPosition = panelToMove.getOriginalPanel().getPosition();
        var offset = cycleIndex * scrollAreaSize - (panelToMove.getPosition() - originalPosition);
        return {
          panelAtDestPos: panelToMove,
          snapOffset: offset,
          indexDiff: passedPanelCount
        };
      };

      __proto.findAdjacentPanel = function (isNextDirection, viewport) {
        var options = viewport.options;
        var currentIndex = viewport.getCurrentIndex();
        var currentPanel = viewport.panelManager.get(currentIndex);
        var hangerPosition = viewport.getHangerPosition();
        var firstClonedPanel = currentPanel.getIdenticalPanels()[1];
        var lapped = options.circular && Math.abs(currentPanel.getAnchorPosition() - hangerPosition) > Math.abs(firstClonedPanel.getAnchorPosition() - hangerPosition); // If lapped in circular mode, use first cloned panel as base panel

        var basePanel = lapped ? firstClonedPanel : currentPanel;
        var adjacentPanel = isNextDirection ? basePanel.nextSibling : basePanel.prevSibling;
        var panelToMove = adjacentPanel ? adjacentPanel : basePanel;
        return panelToMove;
      };

      return DraggingState;
    }(State);

    var AnimatingState =
    /*#__PURE__*/
    function (_super) {
      __extends(AnimatingState, _super);

      function AnimatingState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.ANIMATING;
        _this.holding = false;
        _this.playing = true;
        return _this;
      }

      var __proto = AnimatingState.prototype;

      __proto.onEnter = function (e) {
        _super.prototype.onEnter.call(this, e);

        this.delta = 0;
      };

      __proto.onHold = function (e, _a) {
        var viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo; // Update current panel as current nearest panel

        this.lastPosition = viewport.getCameraPosition();
        viewport.setCurrentPanel(viewport.getNearestPanel());
        triggerEvent(EVENTS.HOLD_START, e, true).onSuccess(function () {
          transitTo(STATE_TYPE.DRAGGING);
        }).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onChange = function (e, _a) {
        var moveCamera = _a.moveCamera,
            transitTo = _a.transitTo;

        if (!e.delta.flick) {
          return;
        }

        moveCamera(e).onStopped(function () {
          transitTo(STATE_TYPE.DISABLED);
        });
      };

      __proto.onFinish = function (e, _a) {
        var flicking = _a.flicking,
            viewport = _a.viewport,
            triggerEvent = _a.triggerEvent,
            transitTo = _a.transitTo;
        var isTrusted = e && e.isTrusted;
        viewport.options.bound ? viewport.setCurrentPanel(this.targetPanel) : viewport.setCurrentPanel(viewport.getNearestPanel());
        transitTo(STATE_TYPE.IDLE);
        triggerEvent(EVENTS.MOVE_END, e, isTrusted, {
          direction: this.direction
        });

        if (flicking.options.adaptive) {
          viewport.updateAdaptiveSize();
        }
      };

      return AnimatingState;
    }(State);

    var DisabledState =
    /*#__PURE__*/
    function (_super) {
      __extends(DisabledState, _super);

      function DisabledState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.type = STATE_TYPE.DISABLED;
        _this.holding = false;
        _this.playing = true;
        return _this;
      }

      var __proto = DisabledState.prototype;

      __proto.onAnimationEnd = function (e, _a) {
        var transitTo = _a.transitTo;
        transitTo(STATE_TYPE.IDLE);
      };

      __proto.onRelease = function (e, _a) {
        var transitTo = _a.transitTo; // This is needed when stopped hold start event

        if (e.delta.flick === 0) {
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

        this.state = new IdleState();

        this.transitTo = function (nextStateType) {
          var currentState = _this.state;

          if (currentState.type !== nextStateType) {
            var nextState = void 0;

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

            currentState.onExit(nextState);
            nextState.onEnter(currentState);
            _this.state = nextState;
          }

          return _this.state;
        };
      }

      var __proto = StateMachine.prototype;

      __proto.fire = function (eventType, e, context) {
        var currentState = this.state;

        switch (eventType) {
          case AXES_EVENTS.HOLD:
            currentState.onHold(e, context);
            break;

          case AXES_EVENTS.CHANGE:
            currentState.onChange(e, context);
            break;

          case AXES_EVENTS.RELEASE:
            currentState.onRelease(e, context);
            break;

          case AXES_EVENTS.ANIMATION_END:
            currentState.onAnimationEnd(e, context);
            break;

          case AXES_EVENTS.FINISH:
            currentState.onFinish(e, context);
            break;
        }
      };

      __proto.getState = function () {
        return this.state;
      };

      return StateMachine;
    }();

    var Viewport =
    /*#__PURE__*/
    function () {
      function Viewport(flicking, viewportElement, cameraElement, options, triggerEvent) {
        var _this = this;

        this.stopCamera = function (axesEvent) {
          if (axesEvent && axesEvent.setTo) {
            axesEvent.setTo({
              flick: _this.state.position
            }, 0);
          }

          _this.stateMachine.transitTo(STATE_TYPE.IDLE);
        };

        this.castToFlickingPanel = function (panel, offset) {
          if (offset === void 0) {
            offset = 0;
          }

          var viewport = _this;
          var options = viewport.options;
          return {
            getElement: function () {
              return panel.getElement();
            },
            getIndex: function () {
              return panel.getIndex();
            },
            getPosition: function () {
              return panel.getPosition() + offset;
            },
            getAnchorPosition: function () {
              return this.getPosition() + panel.getRelativeAnchorPosition();
            },
            getSize: function () {
              return panel.getSize();
            },
            getProgress: function () {
              var progress = NaN; // single

              var panelCount = viewport.panelManager.getPanelCount();
              var scrollAreaSize = viewport.getScrollAreaSize();
              var relativeIndex = (options.circular ? Math.floor(this.getPosition() / scrollAreaSize) * panelCount : 0) + this.getIndex();
              progress = relativeIndex - viewport.getCurrentProgress();
              return progress;
            },
            getOutsetProgress: function () {
              var outsetProgress = NaN;
              var outsetRange = [-this.getSize(), viewport.getRelativeHangerPosition() - panel.getRelativeAnchorPosition(), viewport.getSize()];
              var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
              outsetProgress = getProgress(relativePanelPosition, outsetRange);
              return outsetProgress;
            },
            getVisibleRatio: function () {
              var visibleRatio = 0;
              var panelSize = panel.getSize();
              var relativePanelPosition = this.getPosition() - viewport.getCameraPosition();
              var rightRelativePanelPosition = relativePanelPosition + panelSize;
              var visibleSize = Math.min(viewport.getSize(), rightRelativePanelPosition) - Math.max(relativePanelPosition, 0);
              visibleRatio = visibleSize >= 0 ? visibleSize / panelSize : 0;
              return visibleRatio;
            },
            focus: function (duration) {
              var currentPanel = viewport.getCurrentPanel();
              var hangerPosition = viewport.getHangerPosition();
              var anchorPosition = panel.getAnchorPosition();

              if (hangerPosition === anchorPosition || !currentPanel) {
                return;
              }

              var currentPosition = currentPanel.getPosition();
              var eventType = currentPosition === this.getPosition() ? "" : EVENTS.CHANGE;
              viewport.moveTo(panel, eventType, null, offset, duration);
            },
            update: function (updateFunction) {
              panel.getIdenticalPanels().forEach(function (eachPanel) {
                return updateFunction(eachPanel.getElement());
              });
            },
            prev: function () {
              var prevSibling = panel.prevSibling;

              if (!prevSibling) {
                return null;
              }

              var currentIndex = this.getIndex();
              var prevIndex = prevSibling.getIndex();
              var hasEmptyPanelBetween = currentIndex - prevIndex > 1;
              var notYetMinPanel = options.infinite && currentIndex > 0 && prevIndex > currentIndex;

              if (hasEmptyPanelBetween || notYetMinPanel) {
                // Empty panel exists between
                return null;
              }

              var prevPanelSize = prevSibling.getSize();
              var newPosition = this.getPosition() - prevPanelSize - options.gap;
              var newOffset = newPosition - prevSibling.getPosition();
              return viewport.castToFlickingPanel(prevSibling, newOffset);
            },
            next: function () {
              var nextSibling = panel.nextSibling;
              var lastIndex = viewport.panelManager.getLastIndex();

              if (!nextSibling) {
                return null;
              }

              var currentIndex = this.getIndex();
              var nextIndex = nextSibling.getIndex();
              var hasEmptyPanelBetween = nextIndex - currentIndex > 1;
              var notYetMaxPanel = options.infinite && currentIndex < lastIndex && nextIndex < currentIndex;

              if (hasEmptyPanelBetween || notYetMaxPanel) {
                return null;
              }

              var newPosition = this.getPosition() + panel.getSize() + options.gap;
              var newOffset = newPosition - nextSibling.getPosition();
              return viewport.castToFlickingPanel(nextSibling, newOffset);
            },
            insertBefore: function (element) {
              var parsedElements = parseElement(element);
              var firstPanel = viewport.panelManager.firstPanel();
              var prevSibling = panel.prevSibling; // Finding correct inserting index
              // While it should insert removing empty spaces,
              // It also should have to be bigger than prevSibling' s index

              var targetIndex = prevSibling && firstPanel.getIndex() !== this.getIndex() ? Math.max(prevSibling.getIndex() + 1, panel.getIndex() - parsedElements.length) : Math.max(panel.getIndex() - parsedElements.length, 0);
              return viewport.insert(targetIndex, parsedElements);
            },
            insertAfter: function (element) {
              return viewport.insert(panel.getIndex() + 1, element);
            },
            remove: function () {
              return viewport.remove(panel.getIndex())[0];
            }
          };
        };

        this.flicking = flicking;
        this.viewportElement = viewportElement;
        this.cameraElement = cameraElement;
        this.triggerEvent = triggerEvent;
        this.state = {
          size: 0,
          position: 0,
          relativeHangerPosition: 0,
          scrollArea: {
            prev: 0,
            next: 0
          },
          translate: TRANSFORM$1,
          infiniteThreshold: 0,
          checkedIndexes: []
        };
        this.options = options;
        this.stateMachine = new StateMachine();
        this.panelManager = new PanelManager(cameraElement, options);
        this.build();
      }

      var __proto = Viewport.prototype;

      __proto.moveTo = function (panel, eventType, axesEvent, offset, duration) {
        var _this = this;

        if (offset === void 0) {
          offset = 0;
        }

        if (duration === void 0) {
          duration = this.options.duration;
        }

        var state = this.state;
        var currentState = this.stateMachine.getState();
        var freeScroll = this.options.moveType.type === "freeScroll";
        var currentPosition = state.position;
        var castedPanel = this.castToFlickingPanel(panel, offset);
        var estimatedPosition = castedPanel.getAnchorPosition() - state.relativeHangerPosition;
        estimatedPosition = this.canSetBoundMode() ? clamp(estimatedPosition, state.scrollArea.prev, state.scrollArea.next) : estimatedPosition;
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        var direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;
        var eventResult;

        if (eventType === EVENTS.CHANGE) {
          eventResult = this.triggerEvent(EVENTS.CHANGE, axesEvent, isTrusted, {
            index: panel.getIndex(),
            panel: castedPanel,
            direction: direction
          });
        } else if (eventType === EVENTS.RESTORE) {
          eventResult = this.triggerEvent(EVENTS.RESTORE, axesEvent, isTrusted);
        } else {
          eventResult = {
            onSuccess: function (callback) {
              callback();
              return this;
            },
            onStopped: function () {
              return this;
            }
          };
        }

        eventResult.onSuccess(function () {
          currentState.targetPanel = panel;
          currentState.targetOffset = offset;
          currentState.direction = estimatedPosition > currentPosition ? DIRECTION.NEXT : DIRECTION.PREV;

          if (estimatedPosition === currentPosition) {
            // no move
            _this.nearestPanel = panel;
            _this.currentPanel = panel;
          }

          if (axesEvent && axesEvent.setTo) {
            // freeScroll only occurs in release events
            axesEvent.setTo({
              flick: freeScroll ? axesEvent.destPos.flick : estimatedPosition
            }, duration);
          } else {
            _this.axes.setTo({
              flick: estimatedPosition
            }, duration);
          }
        });
        return eventResult;
      };

      __proto.moveCamera = function (pos, axesEvent) {
        var state = this.state;
        var options = this.options;
        var transform = state.translate.name; // Update position & nearestPanel

        state.position = pos;
        this.nearestPanel = this.findNearestPanel();
        var nearestPanel = this.nearestPanel;
        var originalNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0;
        this.checkNeedPanel(axesEvent); // Possibly modified after need panel, if it's looped

        var modifiedNearestPosition = nearestPanel ? nearestPanel.getPosition() : 0;
        pos += modifiedNearestPosition - originalNearestPosition;
        state.position = pos;
        var moveVector = options.horizontal ? [-pos, 0] : [0, -pos];
        var moveCoord = moveVector.map(function (coord) {
          return Math.round(coord) + "px";
        }).join(", ");
        this.cameraElement.style[transform] = state.translate.has3d ? "translate3d(" + moveCoord + ", 0px)" : "translate(" + moveCoord + ")";
      };

      __proto.resize = function () {
        var panelManager = this.panelManager;
        this.updateSize();
        this.updateOriginalPanelPositions();
        this.updateAdaptiveSize();
        this.updateScrollArea(); // Clone panels in circular mode

        if (this.options.circular && panelManager.getPanelCount() > 0) {
          this.clonePanels();
          this.updateClonedPanelPositions();
        }

        panelManager.chainAllPanels();
        this.updateCameraPosition();
      }; // Find nearest anchor from current hanger position


      __proto.findNearestPanel = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var hangerPosition = this.getHangerPosition();

        if (this.isOutOfBound()) {
          var position = state.position;
          return position <= state.scrollArea.prev ? panelManager.firstPanel() : panelManager.lastPanel();
        }

        return this.findNearestPanelAt(hangerPosition);
      };

      __proto.findNearestPanelAt = function (position) {
        var panelManager = this.panelManager;
        var allPanels = panelManager.allPanels();
        var minimumDistance = Infinity;
        var nearestPanel;

        for (var _i = 0, allPanels_1 = allPanels; _i < allPanels_1.length; _i++) {
          var panel = allPanels_1[_i];

          if (!panel) {
            continue;
          }

          var prevPosition = panel.getPosition();
          var nextPosition = prevPosition + panel.getSize(); // Use shortest distance from panel's range

          var distance = isBetween(position, prevPosition, nextPosition) ? 0 : Math.min(Math.abs(prevPosition - position), Math.abs(nextPosition - position));

          if (distance > minimumDistance) {
            break;
          } else if (distance === minimumDistance) {
            var minimumAnchorDistance = Math.abs(position - nearestPanel.getAnchorPosition());
            var anchorDistance = Math.abs(position - panel.getAnchorPosition());

            if (anchorDistance > minimumAnchorDistance) {
              break;
            }
          }

          minimumDistance = distance;
          nearestPanel = panel;
        }

        return nearestPanel;
      };

      __proto.findNearestIdenticalPanel = function (panel) {
        var nearest = panel;
        var shortestDistance = Infinity;
        var hangerPosition = this.getHangerPosition();
        var identicals = panel.getIdenticalPanels();
        identicals.forEach(function (identical) {
          var anchorPosition = identical.getAnchorPosition();
          var distance = Math.abs(anchorPosition - hangerPosition);

          if (distance < shortestDistance) {
            nearest = identical;
            shortestDistance = distance;
          }
        });
        return nearest;
      }; // Find shortest camera position that distance is minimum


      __proto.findShortestPositionToPanel = function (panel) {
        var state = this.state;
        var options = this.options;
        var anchorPosition = panel.getAnchorPosition();
        var hangerPosition = this.getHangerPosition();
        var distance = Math.abs(hangerPosition - anchorPosition);
        var scrollAreaSize = state.scrollArea.next - state.scrollArea.prev;

        if (!options.circular) {
          var position = anchorPosition - state.relativeHangerPosition;
          return this.canSetBoundMode() ? clamp(position, state.scrollArea.prev, state.scrollArea.next) : position;
        } else {
          // If going out of viewport border is more efficient way of moving, choose that position
          return distance <= scrollAreaSize - distance ? anchorPosition - state.relativeHangerPosition : anchorPosition > hangerPosition // PREV TO NEXT
          ? anchorPosition - state.relativeHangerPosition - scrollAreaSize // NEXT TO PREV
          : anchorPosition - state.relativeHangerPosition + scrollAreaSize;
        }
      };

      __proto.enable = function () {
        this.panInput.enable();
      };

      __proto.disable = function () {
        this.panInput.disable();
      };

      __proto.insert = function (index, element) {
        var _this = this;

        var lastIndex = this.panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var state = this.state;
        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this.options);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        var pushedIndex = this.panelManager.insert(index, panels);

        if (!this.currentPanel) {
          this.currentPanel = panels[0];
        } // Update checked indexes in infinite mode


        state.checkedIndexes.forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1]; // Can fill part of indexes in range

          if (isBetween(index, min, max)) {
            // Remove checked index from list
            state.checkedIndexes.splice(idx, 1);
          } else if (index < min) {
            // Push checked index
            state.checkedIndexes.splice(idx, 1, [min + pushedIndex, max + pushedIndex]);
          }
        });
        this.resize();
        return panels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.replace = function (index, element) {
        var _this = this;

        var panelManager = this.panelManager;
        var lastIndex = panelManager.getLastIndex(); // Index should not below 0

        if (index < 0 || index > lastIndex) {
          return [];
        }

        var state = this.state;
        var parsedElements = parseElement(element);
        var panels = parsedElements.map(function (el, idx) {
          return new Panel(el, index + idx, _this.options);
        }).slice(0, lastIndex - index + 1);

        if (panels.length <= 0) {
          return [];
        }

        panelManager.replace(index, panels);
        var currentPanel = this.currentPanel;

        if (!currentPanel) {
          this.currentPanel = panels[0];
        } else if (isBetween(currentPanel.getIndex(), index, index + panels.length - 1)) {
          // Current panel is replaced
          this.currentPanel = panelManager.get(currentPanel.getIndex());
        } // Update checked indexes in infinite mode


        state.checkedIndexes.forEach(function (indexes, idx) {
          var min = indexes[0],
              max = indexes[1]; // Can fill part of indexes in range

          if (index <= max && index + panels.length > min) {
            // Remove checked index from list
            state.checkedIndexes.splice(idx, 1);
          }
        });
        this.resize();
        return panels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.remove = function (index, deleteCount) {
        var _this = this;

        if (deleteCount === void 0) {
          deleteCount = 1;
        } // Index should not below 0


        index = Math.max(index, 0);
        var panelManager = this.panelManager;
        var currentIndex = this.getCurrentIndex();
        var removedPanels = panelManager.remove(index, deleteCount);

        if (isBetween(currentIndex, index, index + deleteCount - 1)) {
          // Current panel is removed
          // Use panel at removing index - 1 as new current panel if it exists
          var newCurrentIndex = Math.max(index - 1, panelManager.getRange().min);
          this.currentPanel = panelManager.get(newCurrentIndex);
        }

        this.resize();
        return removedPanels.map(function (panel) {
          return _this.castToFlickingPanel(panel);
        });
      };

      __proto.updateAdaptiveSize = function () {
        var options = this.options;
        var horizontal = options.horizontal;
        var currentPanel = this.getCurrentPanel();

        if (!currentPanel) {
          return;
        }

        var sizeToApply;

        if (options.adaptive) {
          var panelBbox = currentPanel.getBbox();
          sizeToApply = horizontal ? panelBbox.height : panelBbox.width;
        } else {
          // Find minimum height of panels to maximum panel size
          var maximumPanelSize = this.panelManager.originalPanels().reduce(function (maximum, panel) {
            var panelBbox = panel.getBbox();
            return Math.max(maximum, horizontal ? panelBbox.height : panelBbox.width);
          }, 0);
          sizeToApply = maximumPanelSize;
        }

        var viewportStyle = this.viewportElement.style;

        if (horizontal) {
          viewportStyle.height = sizeToApply + "px";
          viewportStyle.minHeight = "100%";
          viewportStyle.width = "100%";
        } else {
          viewportStyle.width = sizeToApply + "px";
          viewportStyle.minWidth = "100%";
          viewportStyle.height = "100%";
        }
      };

      __proto.destroy = function () {
        var viewportElement = this.viewportElement;
        var wrapper = viewportElement.parentElement;
        wrapper.removeChild(viewportElement);
        this.axes.destroy();
        this.panInput.destroy();
        this.panelManager.originalPanels().forEach(function (panel) {
          wrapper.appendChild(panel.getElement());
          panel.destroy();
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };

      __proto.restore = function (status) {
        var panels = status.panels;
        var cameraElement = this.cameraElement;
        var panelManager = this.panelManager; // Restore index

        panelManager.clear();
        cameraElement.innerHTML = status.panels.map(function (panel) {
          return panel.html;
        }).join("");
        this.createPanels();
        this.currentPanel = panelManager.get(status.index); // Reset panel index

        panelManager.originalPanels().forEach(function (panel, idx) {
          panel.setIndex(panels[idx].index);
        });
        this.resize();
        this.axes.setTo({
          flick: status.position
        }, 0);
        this.moveCamera(status.position);
      };

      __proto.getCurrentPanel = function () {
        return this.currentPanel;
      };

      __proto.getCurrentIndex = function () {
        var currentPanel = this.currentPanel;
        return currentPanel ? currentPanel.getIndex() : -1;
      };

      __proto.getNearestPanel = function () {
        return this.nearestPanel;
      }; // Get progress from nearest panel


      __proto.getCurrentProgress = function () {
        var currentState = this.stateMachine.getState();
        var nearestPanel = currentState.playing || currentState.holding ? this.nearestPanel : this.currentPanel;
        var panelManager = this.panelManager;

        if (!nearestPanel) {
          // There're no panels
          return NaN;
        }

        var _a = this.getScrollArea(),
            prevRange = _a.prev,
            nextRange = _a.next;

        var cameraPosition = this.getCameraPosition();
        var isOutOfBound = this.isOutOfBound();
        var prevPanel = nearestPanel.prevSibling;
        var nextPanel = nearestPanel.nextSibling;
        var hangerPosition = this.getHangerPosition();
        var nearestAnchorPos = nearestPanel.getAnchorPosition();

        if (isOutOfBound && prevPanel && nextPanel && cameraPosition < nextRange // On the basis of anchor, prevPanel is nearestPanel.
        && hangerPosition - prevPanel.getAnchorPosition() < nearestAnchorPos - hangerPosition) {
          nearestPanel = prevPanel;
          nextPanel = nearestPanel.nextSibling;
          prevPanel = nearestPanel.prevSibling;
          nearestAnchorPos = nearestPanel.getAnchorPosition();
        }

        var nearestIndex = nearestPanel.getIndex() + (nearestPanel.getCloneIndex() + 1) * panelManager.getPanelCount();
        var nearestSize = nearestPanel.getSize();

        if (isOutOfBound) {
          var relativeHangerPosition = this.getRelativeHangerPosition();

          if (nearestAnchorPos > nextRange + relativeHangerPosition) {
            // next bounce area: hangerPosition - relativeHangerPosition - nextRange
            hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - nextRange;
          } else if (nearestAnchorPos < prevRange + relativeHangerPosition) {
            // prev bounce area: hangerPosition - relativeHangerPosition - prevRange
            hangerPosition = nearestAnchorPos + hangerPosition - relativeHangerPosition - prevRange;
          }
        }

        var hangerIsNextToNearestPanel = hangerPosition >= nearestAnchorPos;
        var gap = this.options.gap;
        var basePosition = nearestAnchorPos;
        var targetPosition = nearestAnchorPos;

        if (hangerIsNextToNearestPanel) {
          targetPosition = nextPanel ? nextPanel.getAnchorPosition() : nearestAnchorPos + nearestSize + gap;
        } else {
          basePosition = prevPanel ? prevPanel.getAnchorPosition() : basePosition = nearestAnchorPos - nearestSize - gap;
        }

        var progressBetween = (hangerPosition - basePosition) / (targetPosition - basePosition);
        var startIndex = hangerIsNextToNearestPanel ? nearestIndex : prevPanel ? prevPanel.getIndex() : nearestIndex - 1;
        return startIndex + progressBetween;
      };

      __proto.getSize = function () {
        return this.state.size;
      };

      __proto.getScrollArea = function () {
        return this.state.scrollArea;
      };

      __proto.isOutOfBound = function () {
        var state = this.state;
        var options = this.options;
        var scrollArea = state.scrollArea;
        return !options.circular && options.bound && (state.position <= scrollArea.prev || state.position >= scrollArea.next);
      };

      __proto.getScrollAreaSize = function () {
        var scrollArea = this.state.scrollArea;
        return scrollArea.next - scrollArea.prev;
      };

      __proto.getRelativeHangerPosition = function () {
        return this.state.relativeHangerPosition;
      };

      __proto.getHangerPosition = function () {
        return this.state.position + this.state.relativeHangerPosition;
      };

      __proto.getCameraPosition = function () {
        return this.state.position;
      };

      __proto.setCurrentPanel = function (panel) {
        this.currentPanel = panel;
      };

      __proto.setLastIndex = function (index) {
        var currentPanel = this.currentPanel;
        var panelManager = this.panelManager;
        panelManager.setLastIndex(index);

        if (currentPanel && currentPanel.getIndex() > index) {
          this.currentPanel = panelManager.lastPanel();
        }

        this.resize();
      };

      __proto.connectAxesHandler = function (handlers) {
        var axes = this.axes;
        this.axesHandlers = handlers;
        axes.on(handlers);
      };

      __proto.build = function () {
        this.applyCSSValue();
        this.setAxesInstance();
        this.createPanels();
        this.setDefaultPanel();
        this.resize();
        this.moveToDefaultPanel();
      };

      __proto.applyCSSValue = function () {
        var options = this.options;
        var viewportElement = this.viewportElement;
        var cameraElement = this.cameraElement;
        var classPrefix = options.classPrefix; // Set default css values for each element

        viewportElement.className = classPrefix + "-viewport";
        cameraElement.className = classPrefix + "-camera";
        applyCSS(viewportElement, DEFAULT_VIEWPORT_CSS);
        applyCSS(cameraElement, DEFAULT_CAMERA_CSS);

        if (options.zIndex) {
          viewportElement.style.zIndex = "" + options.zIndex;
        }

        if (options.overflow) {
          viewportElement.style.overflow = "visible";
        }
      };

      __proto.setAxesInstance = function () {
        var state = this.state;
        var options = this.options;
        var scrollArea = state.scrollArea;
        var horizontal = options.horizontal;
        this.axes = new Axes({
          flick: {
            range: [scrollArea.prev, scrollArea.next],
            circular: options.circular,
            bounce: [0, 0]
          }
        }, {
          easing: options.panelEffect,
          deceleration: options.deceleration,
          interruptable: true
        });
        this.panInput = new PanInput(this.viewportElement, {
          inputType: options.inputType,
          thresholdAngle: options.thresholdAngle,
          scale: options.horizontal ? [-1, 0] : [0, -1]
        });
        this.axes.connect(horizontal ? ["flick", ""] : ["", "flick"], this.panInput);
      };

      __proto.createPanels = function () {
        var _this = this; // Panel elements were attached to camera element by Flicking class


        var panelElements = this.cameraElement.children; // Initialize panels

        var panels = toArray$2(panelElements).map(function (el, idx) {
          return new Panel(el, idx, _this.options);
        });

        if (panels.length > 0) {
          this.panelManager.append(panels);
        }
      };

      __proto.setDefaultPanel = function () {
        var options = this.options;
        var panelManager = this.panelManager;
        var indexRange = this.panelManager.getRange();
        var index = clamp(options.defaultIndex, indexRange.min, indexRange.max);
        this.currentPanel = panelManager.get(index);
      };

      __proto.clonePanels = function () {
        var _this = this;

        var state = this.state;
        var panelManager = this.panelManager;
        var viewportSize = state.size;
        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel(); // There're no panels exist

        if (!firstPanel) {
          return;
        }

        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + this.options.gap;
        var visibleAreaSize = viewportSize + firstPanel.getRelativeAnchorPosition(); // For each panels, clone itself while last panel's position + size is below viewport size

        var panels = panelManager.originalPanels();
        var cloneCount = Math.ceil(visibleAreaSize / sumOriginalPanelSize);
        var prevCloneCount = panelManager.getCloneCount();

        if (cloneCount > prevCloneCount) {
          var _loop_1 = function (cloneIndex) {
            var clones = panels.map(function (origPanel) {
              var clonedPanel = origPanel.clone(cloneIndex);

              _this.cameraElement.appendChild(clonedPanel.getElement());

              return clonedPanel;
            });
            panelManager.insertClones(cloneIndex, 0, clones);
          }; // should clone more


          for (var cloneIndex = prevCloneCount; cloneIndex < cloneCount; cloneIndex++) {
            _loop_1(cloneIndex);
          }
        } else if (cloneCount < prevCloneCount) {
          // should remove some
          panelManager.removeClonesAfter(cloneCount);
        }
      };

      __proto.moveToDefaultPanel = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var options = this.options;
        var indexRange = this.panelManager.getRange();
        var defaultIndex = clamp(options.defaultIndex, indexRange.min, indexRange.max);
        var defaultPanel = panelManager.get(defaultIndex);
        var defaultPosition = 0;

        if (defaultPanel) {
          defaultPosition = defaultPanel.getAnchorPosition() - state.relativeHangerPosition;
          defaultPosition = this.canSetBoundMode() ? clamp(defaultPosition, state.scrollArea.prev, state.scrollArea.next) : defaultPosition;
        }

        this.moveCamera(defaultPosition);
        this.axes.setTo({
          flick: defaultPosition
        }, 0);
      };

      __proto.canSetBoundMode = function () {
        var state = this.state;
        var options = this.options;
        var lastPanel = this.panelManager.lastPanel();

        if (!lastPanel) {
          return false;
        }

        var summedPanelSize = lastPanel.getPosition() + lastPanel.getSize();
        return options.bound && !options.circular && summedPanelSize >= state.size;
      };

      __proto.updateSize = function () {
        var state = this.state;
        var options = this.options;
        var viewportElement = this.viewportElement;
        var panels = this.panelManager.originalPanels();

        if (!options.horizontal) {
          // Don't preserve previous width for adaptive resizing
          viewportElement.style.width = "";
          viewportElement.style.minWidth = "";
        }

        var bbox = viewportElement.getBoundingClientRect(); // Update size & hanger position

        state.size = options.horizontal ? bbox.width : bbox.height;
        state.relativeHangerPosition = parseArithmeticExpression(options.hanger, state.size);
        state.infiniteThreshold = parseArithmeticExpression(options.infiniteThreshold, state.size); // Resize all panels

        panels.forEach(function (panel) {
          panel.resize();
        });
      };

      __proto.updateOriginalPanelPositions = function () {
        var gap = this.options.gap;
        var panelManager = this.panelManager;
        var firstPanel = panelManager.firstPanel();
        var panels = panelManager.originalPanels();

        if (!firstPanel) {
          return;
        }

        var currentPanel = this.currentPanel;
        var nearestPanel = this.nearestPanel;
        var currentState = this.stateMachine.getState();
        var scrollArea = this.state.scrollArea; // Update panel position && fit to wrapper

        var nextPanelPos = firstPanel.getPosition();
        var maintainingPanel = firstPanel;

        if ((currentState.holding || currentState.playing) && nearestPanel) {
          // We should maintain nearestPanel's position
          var looped = !isBetween(currentState.lastPosition + currentState.delta, scrollArea.prev, scrollArea.next);
          maintainingPanel = looped ? currentPanel : nearestPanel;
        } else if (firstPanel.getIndex() > 0) {
          maintainingPanel = currentPanel;
        }

        var panelsBeforeMaintainPanel = panels.slice(0, maintainingPanel.getIndex() + (maintainingPanel.getCloneIndex() + 1) * panels.length);
        var accumulatedSize = panelsBeforeMaintainPanel.reduce(function (total, panel) {
          return total + panel.getSize() + gap;
        }, 0);
        nextPanelPos = maintainingPanel.getPosition() - accumulatedSize;
        panels.forEach(function (panel) {
          var newPosition = nextPanelPos;
          var currentPosition = panel.getPosition();
          var panelSize = panel.getSize();

          if (currentPosition !== newPosition) {
            panel.setPosition(newPosition);
          }

          nextPanelPos += panelSize + gap;
        });
      };

      __proto.updateClonedPanelPositions = function () {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var clonedPanels = panelManager.clonedPanels().filter(function (panel) {
          return !!panel;
        });
        var scrollArea = state.scrollArea;
        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel();

        if (!firstPanel) {
          return;
        }

        var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap; // Locate all cloned panels linearly first

        for (var _i = 0, clonedPanels_1 = clonedPanels; _i < clonedPanels_1.length; _i++) {
          var panel = clonedPanels_1[_i];

          if (!panel) {
            continue;
          }

          var origPanel = panel.getOriginalPanel();
          var cloneIndex = panel.getCloneIndex();
          var cloneBasePos = sumOriginalPanelSize * (cloneIndex + 1);
          var clonedPanelPos = cloneBasePos + origPanel.getPosition();
          panel.setPosition(clonedPanelPos);
        }

        var lastReplacePosition = firstPanel.getPosition(); // reverse() pollutes original array, so copy it with concat()

        for (var _a = 0, _b = clonedPanels.concat().reverse(); _a < _b.length; _a++) {
          var panel = _b[_a];
          var panelSize = panel.getSize();
          var replacePosition = lastReplacePosition - panelSize - options.gap;

          if (replacePosition + panelSize <= scrollArea.prev) {
            // Replace is not meaningful, as it won't be seen in current scroll area
            break;
          }

          panel.setPosition(replacePosition);
          lastReplacePosition = replacePosition;
        }
      };

      __proto.updateScrollArea = function () {
        var state = this.state;
        var panelManager = this.panelManager;
        var options = this.options;
        var axes = this.axes; // Set viewport scrollable area

        var firstPanel = panelManager.firstPanel();
        var lastPanel = panelManager.lastPanel();
        var relativeHangerPosition = state.relativeHangerPosition;

        if (!firstPanel) {
          state.scrollArea = {
            prev: 0,
            next: 0
          };
        } else if (this.canSetBoundMode()) {
          state.scrollArea = {
            prev: firstPanel.getPosition(),
            next: lastPanel.getPosition() + lastPanel.getSize() - state.size
          };
        } else if (options.circular) {
          var sumOriginalPanelSize = lastPanel.getPosition() + lastPanel.getSize() - firstPanel.getPosition() + options.gap; // Maximum scroll extends to first clone sequence's first panel

          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
            next: sumOriginalPanelSize + firstPanel.getAnchorPosition() - relativeHangerPosition
          };
        } else {
          state.scrollArea = {
            prev: firstPanel.getAnchorPosition() - relativeHangerPosition,
            next: lastPanel.getAnchorPosition() - relativeHangerPosition
          };
        }

        var viewportSize = state.size;
        var bounce = options.bounce;
        var parsedBounce = bounce;

        if (isArray(bounce)) {
          parsedBounce = bounce.map(function (val) {
            return parseArithmeticExpression(val, viewportSize, DEFAULT_OPTIONS.bounce);
          });
        } else {
          var parsedVal = parseArithmeticExpression(bounce, viewportSize, DEFAULT_OPTIONS.bounce);
          parsedBounce = [parsedVal, parsedVal];
        } // Update axes range and bounce


        var flick = axes.axis.flick;
        flick.range = [state.scrollArea.prev, state.scrollArea.next];
        flick.bounce = parsedBounce;
      }; // Update camera position after resizing


      __proto.updateCameraPosition = function () {
        var state = this.state;
        var axes = this.axes;
        var currentPanel = this.getCurrentPanel();
        var currentState = this.stateMachine.getState();

        if (!currentPanel || currentState.holding || currentState.playing) {
          return;
        }

        var newPosition = currentPanel.getAnchorPosition() - state.relativeHangerPosition;

        if (this.canSetBoundMode()) {
          newPosition = clamp(newPosition, state.scrollArea.prev, state.scrollArea.next);
        } // Pause & resume axes to prevent axes's "change" event triggered
        // This should be done before moveCamera, as moveCamera can trigger needPanel


        this.axes.off();
        axes.setTo({
          flick: newPosition
        }, 0);
        this.axes.on(this.axesHandlers);
        this.moveCamera(newPosition);
      };

      __proto.checkNeedPanel = function (axesEvent) {
        var state = this.state;
        var options = this.options;
        var panelManager = this.panelManager;
        var currentPanel = this.currentPanel;
        var nearestPanel = this.nearestPanel;
        var currentState = this.stateMachine.getState();

        if (!options.infinite) {
          return;
        }

        var gap = options.gap;
        var infiniteThreshold = state.infiniteThreshold;
        var maxLastIndex = panelManager.getLastIndex();

        if (maxLastIndex < 0) {
          return;
        }

        if (!currentPanel || !nearestPanel) {
          // There're no panels
          this.triggerNeedPanel({
            axesEvent: axesEvent,
            index: 0,
            direction: null,
            indexRange: {
              min: 0,
              max: maxLastIndex,
              length: maxLastIndex + 1
            }
          });
          return;
        }

        var originalNearestPosition = nearestPanel.getPosition(); // Check next direction

        var checkingPanel = !currentState.holding && !currentState.playing ? currentPanel : nearestPanel;

        while (checkingPanel) {
          var currentIndex = checkingPanel.getIndex();
          var nextSibling = checkingPanel.nextSibling;
          var lastPanel = panelManager.lastPanel();
          var atLastPanel = currentIndex === lastPanel.getIndex();
          var nextIndex = !atLastPanel && nextSibling ? nextSibling.getIndex() : maxLastIndex + 1;
          var currentNearestPosition = nearestPanel.getPosition();
          var panelRight = checkingPanel.getPosition() + checkingPanel.getSize() - (currentNearestPosition - originalNearestPosition);
          var cameraNext = state.position + state.size; // There're empty panels between

          var emptyPanelExistsBetween = nextIndex - currentIndex > 1; // Expected prev panel's left position is smaller than camera position

          var overThreshold = panelRight + gap - infiniteThreshold <= cameraNext;

          if (emptyPanelExistsBetween && overThreshold) {
            this.triggerNeedPanel({
              axesEvent: axesEvent,
              index: checkingPanel.getIndex(),
              siblingPanel: checkingPanel,
              direction: DIRECTION.NEXT,
              indexRange: {
                min: currentIndex + 1,
                max: nextIndex - 1,
                length: nextIndex - currentIndex - 1
              }
            });
          } // Trigger needPanel in circular & at max panel index


          if (options.circular && currentIndex === maxLastIndex && overThreshold) {
            var firstPanel = panelManager.firstPanel();
            var firstIndex = firstPanel.getIndex();

            if (firstIndex > 0) {
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                index: checkingPanel.getIndex(),
                siblingPanel: checkingPanel,
                direction: DIRECTION.NEXT,
                indexRange: {
                  min: 0,
                  max: firstIndex - 1,
                  length: firstIndex
                }
              });
            }
          } // Check whether insertion happened


          lastPanel = panelManager.lastPanel();
          atLastPanel = currentIndex === lastPanel.getIndex();

          if (atLastPanel || !overThreshold) {
            break;
          }

          checkingPanel = checkingPanel.nextSibling;
        } // Check prev direction


        checkingPanel = nearestPanel;

        while (checkingPanel) {
          var cameraPrev = state.position;
          var checkingIndex = checkingPanel.getIndex();
          var prevSibling = checkingPanel.prevSibling;
          var firstPanel = panelManager.firstPanel();
          var atFirstPanel = checkingIndex === firstPanel.getIndex();
          var prevIndex = !atFirstPanel && prevSibling ? prevSibling.getIndex() : -1;
          var currentNearestPosition = nearestPanel.getPosition();
          var panelLeft = checkingPanel.getPosition() - (currentNearestPosition - originalNearestPosition); // There're empty panels between

          var emptyPanelExistsBetween = checkingIndex - prevIndex > 1; // Expected prev panel's right position is smaller than camera position

          var overThreshold = panelLeft - gap + infiniteThreshold >= cameraPrev;

          if (emptyPanelExistsBetween && overThreshold) {
            this.triggerNeedPanel({
              axesEvent: axesEvent,
              index: checkingPanel.getIndex(),
              siblingPanel: checkingPanel,
              direction: DIRECTION.PREV,
              indexRange: {
                min: prevIndex + 1,
                max: checkingIndex - 1,
                length: checkingIndex - prevIndex - 1
              }
            });
          } // Trigger needPanel in circular & at panel 0


          if (options.circular && checkingIndex === 0 && overThreshold) {
            var lastPanel = panelManager.lastPanel();
            var lastIndex = lastPanel.getIndex();

            if (lastIndex < maxLastIndex) {
              this.triggerNeedPanel({
                axesEvent: axesEvent,
                index: checkingPanel.getIndex(),
                siblingPanel: checkingPanel,
                direction: DIRECTION.PREV,
                indexRange: {
                  min: lastIndex + 1,
                  max: maxLastIndex,
                  length: maxLastIndex - lastIndex
                }
              });
            }
          } // Check whether insertion happened


          firstPanel = panelManager.firstPanel();
          atFirstPanel = checkingIndex === firstPanel.getIndex(); // Looped in circular mode

          if (atFirstPanel || !overThreshold) {
            break;
          }

          checkingPanel = checkingPanel.prevSibling;
        }
      };

      __proto.triggerNeedPanel = function (params) {
        var axesEvent = params.axesEvent,
            index = params.index,
            siblingPanel = params.siblingPanel,
            direction = params.direction,
            indexRange = params.indexRange;
        var checkedIndexes = this.state.checkedIndexes;
        var alreadyTriggered = checkedIndexes.some(function (_a) {
          var min = _a[0],
              max = _a[1];
          return min === indexRange.min || max === indexRange.max;
        });
        var hasHandler = this.flicking.hasOn(EVENTS.NEED_PANEL);

        if (alreadyTriggered || !hasHandler) {
          return;
        } // Should done before triggering event, as we can directly add panels by event callback


        checkedIndexes.push([indexRange.min, indexRange.max]);
        var isTrusted = axesEvent ? axesEvent.isTrusted : false;
        var panel = siblingPanel ? this.castToFlickingPanel(siblingPanel) : null;
        this.triggerEvent(EVENTS.NEED_PANEL, axesEvent, isTrusted, {
          index: index,
          panel: panel,
          direction: direction,
          range: indexRange
        });
      };

      return Viewport;
    }();

    /**
     * @memberof eg
     * @extends eg.Component
     * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest" , "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
     * @requires {@link https://github.com/naver/egjs-component|eg.Component}
     * @requires {@link https://github.com/naver/egjs-axes|eg.Axes}
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>이징 함수 Cheat Sheet {@link http://easings.net/}</ko>
     */

    var Flicking =
    /*#__PURE__*/
    function (_super) {
      __extends(Flicking, _super);
      /**
       * @param element A base element for the eg.Flicking module. When specifying a value as a `string` type, you must specify a css selector string to select the element.<ko>eg.Flicking 모듈을 사용할 기준 요소. `string`타입으로 값 지정시 요소를 선택하기 위한 css 선택자 문자열을 지정해야 한다.</ko>
       * @param options An option object of the eg.Flicking module<ko>eg.Flicking 모듈의 옵션 객체</ko>
       * @param {string} [options.classPrefix="eg-flick"] A prefix of class name will be added for the panels, viewport and camera.<ko>패널들과 뷰포트, 카메라에 추가될 클래스 이름의 접두사.</ko>
       * @param {number} [options.deceleration=0.0075] Deceleration value for panel movement animation for animation triggered by manual user input. Higher value means shorter running time.<ko>사용자의 동작으로 가속도가 적용된 패널 이동 애니메이션의 감속도. 값이 높을수록 애니메이션 실행 시간이 짧아진다.</ko>
       * @param {boolean} [options.horizontal=true] Direction of panel movement. (true: horizontal, false: vertical)<ko>패널 이동 방향. (true: 가로방향, false: 세로방향)</ko>
       * @param {boolean} [options.circular=false] Enables circular mode, which connects first/last panel for continuous scrolling<ko>순환 모드를 활성화한다. 순환 모드에서는 양 끝의 패널이 서로 연결되어 끊김없는 스크롤이 가능하다.</ko>
       * @param {boolean} [options.infinite=false] Enables infinite mode, which can automatically trigger needPanel until reaching last panel's index reaches lastIndex<ko>무한 모드를 활성화한다. 무한 모드에서는 needPanel 이벤트를 자동으로 트리거한다. 해당 동작은 마지막 패널의 인덱스가 lastIndex와 일치할때까지 일어난다.</ko>
       * @param {number} [options.infiniteThreshold=0] A Threshold from viewport edge before triggering `needPanel` event in infinite mode.<ko>무한 모드에서 `needPanel`이벤트가 발생하기 위한 뷰포트 끝으로부터의 최대 거리.</ko>
       * @param {number} [options.lastIndex=Infinity] Maximum panel index that Flicking can set. Flicking won't trigger `needPanel` when event's panel index is greater than it.<br>Also, if last panel's index reached given index, you can't add more panels.<ko>Flicking이 설정 가능한 패널의 최대 인덱스. `needPanel` 이벤트에 지정된 인덱스가 최대 패널의 개수보다 같거나 커야 하는 경우에 이벤트를 트리거하지 않게 한다.<br>또한, 마지막 패널의 인덱스가 주어진 인덱스와 동일할 경우, 새로운 패널을 더 이상 추가할 수 없다.</ko>
       * @param {number} [options.threshold=40] Movement threshold to change panel(unit: pixel). It should be dragged above the threshold to change current panel.<ko>패널 변경을 위한 이동 임계값 (단위: 픽셀). 주어진 값 이상으로 스크롤해야만 패널 변경이 가능하다.</ko>
       * @param {number} [options.duration=100] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @param {function} [options.panelEffect=x => 1 - Math.pow(1 - x, 3)] An easing function applied to the panel movement animation. Default value is `easeOutCubic`.<ko>패널 이동 애니메이션에 적용할 easing함수. 기본값은 `easeOutCubic`이다.</ko>
       * @param {number} [options.defaultIndex=0] Index of panel to set as default when initializing. A zero-based integer.<ko>초기화시 지정할 디폴트 패널의 인덱스로, 0부터 시작하는 정수.</ko>
       * @param {string[]} [options.inputType=["touch,"mouse"]] Types of input devices to enable.({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Reference})<ko>활성화할 입력 장치 종류. ({@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption 참고})</ko>
       * @param {number} [options.thresholdAngle=45] The threshold angle value(0 ~ 90).<br>If input angle from click/touched position is above or below this value in horizontal and vertical mode each, scrolling won't happen.<ko>스크롤 동작을 막기 위한 임계각(0 ~ 90).<br>클릭/터치한 지점으로부터 계산된 사용자 입력의 각도가 horizontal/vertical 모드에서 각각 크거나 작으면, 스크롤 동작이 이루어지지 않는다.</ko>
       * @param {number|string|number[]|string[]} [options.bounce=[10,10]] The size value of the bounce area. Only can be enabled when `circular=false`.<br>You can set different bounce value for prev/next direction by using array.<br>`number` for px value, and `string` for px, and % value relative to viewport size.(ex - 0, "10px", "20%")<ko>바운스 영역의 크기값. `circular=false`인 경우에만 사용할 수 있다.<br>배열을 통해 prev/next 방향에 대해 서로 다른 바운스 값을 지정 가능하다.<br>`number`를 통해 px값을, `stirng`을 통해 px 혹은 뷰포트 크기 대비 %값을 사용할 수 있다.(ex - 0, "10px", "20%")</ko>
       * @param {boolean} [options.autoResize=false] Whether resize() method should be called automatically after window resize event.<ko>window의 `resize` 이벤트 이후 자동으로 resize()메소드를 호출할지의 여부.</ko>
       * @param {boolean} [options.adaptive=false] Whether the height(horizontal)/width(vertical) of the viewport element reflects the height/width value of the panel after completing the movement.<ko>목적 패널로 이동한 후 그 패널의 높이(horizontal)/너비(vertical)값을 뷰포트 요소의 높이/너비값에 반영할지 여부.</ko>
       * @param {number} [options.zIndex=2000] z-index value for viewport element.<ko>뷰포트 엘리먼트의 z-index 값.</ko>
       * @param {boolean} [options.bound=false] Prevent view from going out of first/last panel. Only can be enabled when `circular=false`.<ko>뷰가 첫번째와 마지막 패널 밖으로 나가는 것을 막아준다. `circular=false`인 경우에만 사용할 수 있다.</ko>
       * @param {boolean} [options.overflow=false] Disables CSS property `overflow: hidden` in viewport if `true`.<ko>`true`로 설정시 뷰포트에 `overflow: hidden` 속성을 해제한다.</ko>
       * @param {string} [options.hanger="50%"] Reference position of hanger in viewport, which hangs panel anchors should be stopped at.<br>Should be provided in px or % value of viewport size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>뷰포트 내부의 행어의 위치. 패널의 앵커들이 뷰포트 내에서 멈추는 지점에 해당한다.<br>px값이나, 뷰포트의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {string} [options.anchor="50%"] Reference position of anchor in panels, which can be hanged by viewport hanger.<br>Should be provided in px or % value of panel size.<br>You can combinate those values with plus/minus sign<br>ex) "50", "100px", "0%", "25% + 100px"<ko>패널 내부의 앵커의 위치. 뷰포트의 행어와 연계하여 패널이 화면 내에서 멈추는 지점을 설정할 수 있다.<br>px값이나, 패널의 크기 대비 %값을 사용할 수 있고, 이를 + 혹은 - 기호로 연계하여 사용할 수도 있다.<br>예) "50", "100px", "0%", "25% + 100px"</ko>
       * @param {number} [options.gap=0] Space between each panels. Should be given in number.(px).<ko>패널간에 부여할 간격의 크기를 나타내는 숫자.(px)</ko>
       * @param {eg.Flicking.MoveTypeOption} [options.moveType="snap"] Movement style by user input.(ex: snap, freeScroll)<ko>사용자 입력에 의한 이동 방식.(ex: snap, freeScroll)</ko>
       */


      function Flicking(element, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.plugins = [];

        _this.triggerEvent = function (eventName, axesEvent, isTrusted, params) {
          if (params === void 0) {
            params = {};
          }

          var viewport = _this.viewport;
          var canceled = true; // Ignore events before viewport is initialized

          if (viewport) {
            var state = viewport.stateMachine.getState();

            var _a = viewport.getScrollArea(),
                prev = _a.prev,
                next = _a.next;

            var pos = viewport.getCameraPosition();
            var progress = getProgress(pos, [prev, prev, next]);

            if (_this.options.circular) {
              progress %= 1;
            }

            canceled = !_super.prototype.trigger.call(_this, eventName, merge$1({
              type: eventName,
              index: _this.getIndex(),
              panel: _this.getCurrentPanel(),
              direction: state.direction,
              holding: state.holding,
              progress: progress,
              axesEvent: axesEvent,
              isTrusted: isTrusted
            }, params));
          }

          return {
            onSuccess: function (callback) {
              if (!canceled) {
                callback();
              }

              return this;
            },
            onStopped: function (callback) {
              if (canceled) {
                callback();
              }

              return this;
            }
          };
        }; // Return result of "move" event triggered


        _this.moveCamera = function (axesEvent) {
          var viewport = _this.viewport;
          var state = viewport.stateMachine.getState();
          var options = _this.options;
          var pos = axesEvent.pos.flick;
          var previousPosition = viewport.getCameraPosition();

          if (axesEvent.isTrusted && state.holding) {
            var inputOffset = options.horizontal ? axesEvent.inputEvent.offsetX : axesEvent.inputEvent.offsetY;
            var isNextDirection = inputOffset < 0;
            var cameraChange = pos - previousPosition;
            var looped = isNextDirection === pos < previousPosition;

            if (options.circular && looped) {
              // Reached at max/min range of axes
              var scrollAreaSize = viewport.getScrollAreaSize();
              cameraChange = -Math.sign(cameraChange) * (scrollAreaSize - Math.abs(cameraChange));
            }

            var currentDirection = cameraChange === 0 ? state.direction : cameraChange > 0 ? DIRECTION.NEXT : DIRECTION.PREV;
            state.direction = currentDirection;
          }

          state.delta += axesEvent.delta.flick;
          viewport.moveCamera(pos, axesEvent);
          return _this.triggerEvent(EVENTS.MOVE, axesEvent, axesEvent.isTrusted).onStopped(function () {
            // Undo camera movement
            viewport.moveCamera(previousPosition, axesEvent);
          });
        }; // Set flicking wrapper user provided


        var wrapper;

        if (isString(element)) {
          wrapper = document.querySelector(element);

          if (!wrapper) {
            throw new Error("Base element doesn't exist.");
          }
        } else if (element.nodeName && element.nodeType === 1) {
          wrapper = element;
        } else {
          throw new Error("Element should be provided in string or HTMLElement.");
        }

        _this.wrapper = wrapper; // Override default options

        _this.options = merge$1({}, DEFAULT_OPTIONS, options); // Override moveType option

        var currentOptions = _this.options;
        var moveType = currentOptions.moveType;

        if (moveType in DEFAULT_MOVE_TYPE_OPTIONS) {
          currentOptions.moveType = DEFAULT_MOVE_TYPE_OPTIONS[moveType];
        }

        _this.build();

        return _this;
      }
      /**
       * Move to the previous panel if it exists.
       * @ko 이전 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      var __proto = Flicking.prototype;

      __proto.prev = function (duration) {
        var options = this.options;
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var currentIndex = viewport.getCurrentIndex();
        var indexRange = panelManager.getRange();
        var panelCount = panelManager.getPanelCount();
        var lastIndex = panelManager.getLastIndex();
        var minimumRange = options.infinite ? 0 : indexRange.min;
        var prevIndex = currentIndex - 1;

        if (prevIndex < minimumRange) {
          prevIndex = this.options.circular && panelCount > 0 ? options.infinite ? lastIndex : indexRange.max : -1;
        }

        return this.moveTo(prevIndex, duration);
      };
      /**
       * Move to the next panel if it exists.
       * @ko 다음 패널이 존재시 해당 패널로 이동한다.
       * @param [duration=options.duration] Duration of the panel movement animation(unit: ms).<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.next = function (duration) {
        var options = this.options;
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var currentIndex = viewport.getCurrentIndex();
        var indexRange = panelManager.getRange();
        var panelCount = panelManager.getPanelCount();
        var lastIndex = panelManager.getLastIndex();
        var maximumRange = options.infinite ? lastIndex : indexRange.max;
        var nextIndex = currentIndex + 1;

        if (nextIndex > maximumRange) {
          nextIndex = options.circular && panelCount > 0 ? options.infinite ? 0 : indexRange.min : -1;
        }

        return this.moveTo(nextIndex, duration);
      };
      /**
       * Move to the panel of given index.
       * @ko 주어진 인덱스에 해당하는 패널로 이동한다.
       * @param index The index number of the panel to move.<ko>이동할 패널의 인덱스 번호.</ko>
       * @param duration [duration=options.duration] Duration of the panel movement.(unit: ms)<ko>패널 이동 애니메이션 진행 시간.(단위: ms)</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.moveTo = function (index, duration) {
        var viewport = this.viewport;
        var panel = viewport.panelManager.get(index);
        var state = viewport.stateMachine.getState();

        if (!panel || state.type !== STATE_TYPE.IDLE) {
          return this;
        }

        var anchorPosition = panel.getAnchorPosition();
        var hangerPosition = viewport.getHangerPosition();
        var offset = 0;

        if (this.options.circular) {
          var scrollAreaSize = viewport.getScrollAreaSize(); // Check all three possible locations, find the nearest position among them.

          var possiblePositions = [anchorPosition - scrollAreaSize, anchorPosition, anchorPosition + scrollAreaSize];
          var nearestPosition = possiblePositions.reduce(function (nearest, current) {
            return Math.abs(current - hangerPosition) < Math.abs(nearest - hangerPosition) ? current : nearest;
          }, Infinity);
          offset = nearestPosition - anchorPosition;
        }

        var currentIndex = this.getIndex();

        if (hangerPosition === anchorPosition + offset && currentIndex === index) {
          return this;
        }

        var eventType = panel.getIndex() === viewport.getCurrentIndex() ? "" : EVENTS.CHANGE;
        viewport.moveTo(panel, eventType, null, offset, duration);
        return this;
      };
      /**
       * Return index of the current panel. `-1` if no panel exists.
       * @ko 현재 패널의 인덱스 번호를 반환한다. 패널이 하나도 없을 경우 `-1`을 반환한다.
       * @return Current panel's index, zero-based integer.<ko>현재 패널의 인덱스 번호. 0부터 시작하는 정수.</ko>
       */


      __proto.getIndex = function () {
        return this.viewport.getCurrentIndex();
      };
      /**
       * Return the wrapper element user provided in constructor.
       * @ko 사용자가 생성자에서 제공한 래퍼 엘리먼트를 반환한다.
       * @return Wrapper element user provided.<ko>사용자가 제공한 래퍼 엘리먼트.</ko>
       */


      __proto.getElement = function () {
        return this.wrapper;
      };
      /**
       * Return current panel. `null` if no panel exists.
       * @ko 현재 패널을 반환한다. 패널이 하나도 없을 경우 `null`을 반환한다.
       * @return Current panel.<ko>현재 패널.</ko>
       */


      __proto.getCurrentPanel = function () {
        var viewport = this.viewport;
        var panel = viewport.getCurrentPanel();
        return panel ? viewport.castToFlickingPanel(panel) : null;
      };
      /**
       * Return the panel of given index. `null` if it doesn't exists.
       * @ko 주어진 인덱스에 해당하는 패널을 반환한다. 해당 패널이 존재하지 않을 시 `null`이다.
       * @return Panel of given index.<ko>주어진 인덱스에 해당하는 패널.</ko>
       */


      __proto.getPanel = function (index) {
        var viewport = this.viewport;
        var panel = viewport.panelManager.get(index);
        return panel ? viewport.castToFlickingPanel(panel) : null;
      };
      /**
       * Return all panels.
       * @ko 모든 패널들을 반환한다.
       * @param - Should include cloned panels or not.<ko>복사된 패널들을 포함할지의 여부.</ko>
       * @return All panels.<ko>모든 패널들.</ko>
       */


      __proto.getAllPanels = function (includeClone) {
        var viewport = this.viewport;
        var panelManager = viewport.panelManager;
        var panels = includeClone ? panelManager.allPanels() : panelManager.originalPanels();
        return panels.filter(function (panel) {
          return !!panel;
        }).map(function (panel) {
          return viewport.castToFlickingPanel(panel);
        });
      };
      /**
       * Return the panels currently shown in viewport area.
       * @ko 현재 뷰포트 영역에서 보여지고 있는 패널들을 반환한다.
       * @return Panels currently shown in viewport area.<ko>현재 뷰포트 영역에 보여지는 패널들</ko>
       */


      __proto.getVisiblePanels = function () {
        return this.getAllPanels(true).filter(function (panel) {
          var outsetProgress = panel.getOutsetProgress();
          return outsetProgress > -1 && outsetProgress < 1;
        });
      };
      /**
       * Return length of original panels.
       * @ko 원본 패널의 개수를 반환한다.
       * @return Length of original panels.<ko>원본 패널의 개수</ko>
       */


      __proto.getPanelCount = function () {
        return this.viewport.panelManager.getPanelCount();
      };
      /**
       * Set last panel index for `infinite' mode.<br>[needPanel]{@link eg.Flicking#events:needPanel} won't be triggered anymore when last panel's index reaches it.<br>Also, you can't add more panels after it.
       * @ko `infinite` 모드에서 적용되는 패널의 최대 인덱스를 설정한다.<br>마지막 패널의 인덱스가 설정한 값에 도달할 경우 더 이상 [needPanel]{@link eg.Flicking#events:needPanel} 이벤트가 발생되지 않는다.<br>또한, 설정한 인덱스 이후로 새로운 패널을 추가할 수 없다.
       * @param - Last panel index.
       * @see {@link eg.Flicking.FlickingOptions}
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.setLastIndex = function (index) {
        this.viewport.setLastIndex(index);
        return this;
      };
      /**
       * Return panel movement animation.
       * @ko 현재 패널 이동 애니메이션이 진행 중인지를 반환한다.
       * @return Is animating or not.<ko>애니메이션 진행 여부.</ko>
       */


      __proto.isPlaying = function () {
        return this.viewport.stateMachine.getState().playing;
      };
      /**
       * Unblock input devices.
       * @ko 막았던 입력 장치로부터의 입력을 푼다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.enableInput = function () {
        this.viewport.enable();
        return this;
      };
      /**
       * Block input devices.
       * @ko 입력 장치로부터의 입력을 막는다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.disableInput = function () {
        this.viewport.disable();
        return this;
      };
      /**
       * Get current flicking status. You can restore current state by giving returned value to [setStatus()]{@link eg.Flicking#setStatus}.
       * @ko 현재 상태 값을 반환한다. 반환받은 값을 [setStatus()]{@link eg.Flicking#setStatus} 메소드의 인자로 지정하면 현재 상태를 복원할 수 있다.
       * @return An object with current status value information.<ko>현재 상태값 정보를 가진 객체.</ko>
       */


      __proto.getStatus = function () {
        var viewport = this.viewport;
        var panels = viewport.panelManager.originalPanels().filter(function (panel) {
          return !!panel;
        }).map(function (panel) {
          return {
            html: panel.getElement().outerHTML,
            index: panel.getIndex()
          };
        });
        return {
          index: viewport.getCurrentIndex(),
          panels: panels,
          position: viewport.getCameraPosition()
        };
      };
      /**
       * Restore to the state of the `status`.
       * @ko `status`의 상태로 복원한다.
       * @param status Status value to be restored. You can specify the return value of the [getStatus()]{@link eg.Flicking#getStatus} method.<ko>복원할 상태 값. [getStatus()]{@link eg.Flicking#getStatus}메서드의 반환값을 지정하면 된다.</ko>
       */


      __proto.setStatus = function (status) {
        this.viewport.restore(status);
      };
      /**
       * Add plugins that can have different effects on Flicking.
       * @ko 플리킹에 다양한 효과를 부여할 수 있는 플러그인을 추가한다.
       * @param - The plugin(s) to add.<ko>추가할 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.addPlugins = function (plugins) {
        var _this = this;

        var newPlugins = [].concat(plugins);
        newPlugins.forEach(function (plugin) {
          plugin.init(_this);
        });
        this.plugins = this.plugins.concat(newPlugins);
        return this;
      };
      /**
       * Remove plugins from Flicking.
       * @ko 플리킹으로부터 플러그인들을 제거한다.
       * @param - The plugin(s) to remove.<ko>제거 플러그인(들).</ko>
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.removePlugins = function (plugins) {
        var _this = this;

        var currentPlugins = this.plugins;
        var removedPlugins = [].concat(plugins);
        removedPlugins.forEach(function (plugin) {
          var index = currentPlugins.indexOf(plugin);

          if (index > -1) {
            currentPlugins.splice(index, 1);
          }

          plugin.destroy(_this);
        });
        return this;
      };
      /**
       * Return the reference element and all its children to the state they were in before the instance was created. Remove all attached event handlers. Specify `null` for all attributes of the instance (including inherited attributes).
       * @ko 기준 요소와 그 하위 패널들을 인스턴스 생성전의 상태로 되돌린다. 부착된 모든 이벤트 핸들러를 탈거한다. 인스턴스의 모든 속성(상속받은 속성포함)에 `null`을 지정한다.
       * @example
       * const flick = new eg.Flicking("#flick");
       * flick.destroy();
       * console.log(flick.moveTo); // null
       */


      __proto.destroy = function () {
        var _this = this;

        this.off();
        this.viewport.destroy();
        this.plugins.forEach(function (plugin) {
          plugin.destroy(_this);
        }); // release resources

        for (var x in this) {
          this[x] = null;
        }
      };
      /**
       * Update panels to current state.
       * @ko 패널들을 현재 상태에 맞춰 갱신한다.
       * @return {eg.Flicking} The instance itself.<ko>인스턴스 자기 자신.</ko>
       */


      __proto.resize = function () {
        var viewport = this.viewport;
        viewport.panelManager.allPanels().forEach(function (panel) {
          return panel.reset();
        });
        viewport.resize();
        return this;
      };
      /**
       * Add new panels at the beginning of panels.
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
        var viewport = this.viewport;
        var parsedElements = parseElement(element);
        var insertingIndex = Math.max(viewport.panelManager.getRange().min - parsedElements.length, 0);
        return viewport.insert(insertingIndex, parsedElements);
      };
      /**
       * Add new panels at the end of panels.
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
        var viewport = this.viewport;
        return viewport.insert(viewport.panelManager.getRange().max + 1, element);
      };
      /**
       * Replace existing panels with new panels from given index. If target index is empty, add new panel at target index.
       * @ko 주어진 인덱스로부터의 패널들을 새로운 패널들로 교체한다. 인덱스에 해당하는 자리가 비어있다면, 새로운 패널을 해당 자리에 집어넣는다.
       * @param index - Start index to replace new panels.<ko>새로운 패널들로 교체할 시작 인덱스</ko>
       * @param element - Either HTMLElement, HTML string, or array of them.<br>It can be also HTML string of multiple elements with same depth.<ko>HTMLElement 혹은 HTML 문자열, 혹은 그것들의 배열도 가능하다.<br>또한, 같은 depth의 여러 개의 엘리먼트에 해당하는 HTML 문자열도 가능하다.</ko>
       * @return Array of created panels by replace.<ko>교체되어 새롭게 추가된 패널들의 배열</ko>
       * @example
       * // Suppose there were no panels at initialization
       * const flicking = new eg.Flicking("#flick");
       *
       * // This will add new panel at index 3,
       * // Index 0, 1, 2 is empty at this moment.
       * // [empty, empty, empty, PANEL]
       * flicking.replace(3, document.createElement("div"));
       *
       * // As index 2 was empty, this will also add new panel at index 2.
       * // [empty, empty, PANEL, PANEL]
       * flicking.replace(2, "\<div\>Panel\</div\>");
       *
       * // Index 3 was not empty, so it will replace previous one.
       * // It will also add new panels at index 4 and 5.
       * // before - [empty, empty, PANEL, PANEL]
       * // after - [empty, empty, PANEL, NEW_PANEL, NEW_PANEL, NEW_PANEL]
       * flicking.replace(3, ["\<div\>Panel\</div\>", "\<div\>Panel\</div\>", "\<div\>Panel\</div\>"])
       */


      __proto.replace = function (index, element) {
        return this.viewport.replace(index, element);
      };
      /**
       * Remove panel at target index. This will decrease index of panels behind it.
       * @ko `index`에 해당하는 자리의 패널을 제거한다. 수행시 `index` 이후의 패널들의 인덱스가 감소된다.
       * @param index - Index of panel to remove.<ko>제거할 패널의 인덱스</ko>
       * @param {number} [deleteCount=1] - Number of panels to remove from index.<ko>`index` 이후로 제거할 패널의 개수.</ko>
       * @return Array of removed panels<ko>제거된 패널들의 배열</ko>
       */


      __proto.remove = function (index, deleteCount) {
        if (deleteCount === void 0) {
          deleteCount = 1;
        }

        return this.viewport.remove(index, deleteCount);
      };

      __proto.build = function () {
        this.initViewport();
        this.listenInput();
        this.listenResize();
      };

      __proto.initViewport = function () {
        var wrapper = this.wrapper;
        var options = this.options;
        var cameraElement = document.createElement("div"); // Make all panels to be a child of camera element
        // wrapper <- viewport <- camera <- panels[1...n]

        toArray$2(wrapper.children).forEach(function (child) {
          cameraElement.appendChild(child);
        }); // Clipping area for camera element

        var viewportElement = document.createElement("div");
        viewportElement.appendChild(cameraElement); // Add viewport element to wrapper

        wrapper.appendChild(viewportElement); // Make viewport instance with panel container element

        this.viewport = new Viewport(this, viewportElement, cameraElement, options, this.triggerEvent);
      };

      __proto.listenInput = function () {
        var flicking = this;
        var viewport = flicking.viewport;
        var stateMachine = viewport.stateMachine; // Set event context

        flicking.eventContext = {
          flicking: flicking,
          viewport: flicking.viewport,
          transitTo: stateMachine.transitTo,
          triggerEvent: flicking.triggerEvent,
          moveCamera: flicking.moveCamera,
          stopCamera: viewport.stopCamera
        };
        var handlers = {};

        var _loop_1 = function (key) {
          var eventType = AXES_EVENTS[key];

          handlers[eventType] = function (e) {
            return stateMachine.fire(eventType, e, flicking.eventContext);
          };
        };

        for (var key in AXES_EVENTS) {
          _loop_1(key);
        } // Connect Axes instance with PanInput


        flicking.viewport.connectAxesHandler(handlers);
      };

      __proto.listenResize = function () {
        var _this = this;

        if (this.options.autoResize) {
          window.addEventListener("resize", function () {
            _this.resize();
          });
        }
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @example
       * eg.Flicking.VERSION;  // ex) 3.0.0
       * @memberof eg.Flicking
       */


      Flicking.VERSION = "3.0.0";
      /**
       * Direction constant - "PREV" or "NEXT"
       * @ko 방향 상수 - "PREV" 또는 "NEXT"
       * @example
       * eg.Flicking.DIRECTION.PREV; // "PREV"
       * eg.Flicking.DIRECTION.NEXT; // "NEXT"
       */

      Flicking.DIRECTION = DIRECTION;
      /**
       * Event type object
       * @ko 이벤트 이름 문자열들을 담은 객체
       */

      Flicking.EVENTS = EVENTS;
      return Flicking;
    }(Component);

    return Flicking;

}));
//# sourceMappingURL=flicking.pkgd.js.map
