/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/axes project is licensed under the MIT license
 * 
 * @egjs/axes JavaScript library
 * 
 * 
 * @version 2.0.0-rc.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@egjs/component"), require("hammerjs"));
	else if(typeof define === 'function' && define.amd)
		define("Axes", ["@egjs/component", "hammerjs"], factory);
	else if(typeof exports === 'object')
		exports["Axes"] = factory(require("@egjs/component"), require("hammerjs"));
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Axes"] = factory(root["eg"]["Component"], root["Hammer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
;
var AxisManager = (function () {
    function AxisManager(options) {
        var _this = this;
        this.options = options;
        this._pos = Object.keys(this.options.axis).reduce(function (acc, v) {
            acc[v] = _this.options.axis[v].range[0];
            return acc;
        }, {});
    }
    AxisManager.equal = function (pos1, pos2) {
        for (var k in pos1) {
            if (pos1[k] !== pos2[k]) {
                return false;
            }
        }
        return true;
    };
    AxisManager.prototype.get = function (axes) {
        var _this = this;
        if (axes) {
            return axes.reduce(function (acc, v) {
                if (v) {
                    acc[v] = _this._pos[v];
                }
                return acc;
            }, {});
        }
        else {
            return __assign({}, this._pos);
        }
    };
    AxisManager.prototype.moveTo = function (pos) {
        for (var k in pos) {
            if (k) {
                this._pos[k] = pos[k];
            }
        }
        return __assign({}, this._pos);
    };
    AxisManager.prototype.every = function (pos, callback) {
        var axisOptions = this.options.axis;
        for (var k in pos) {
            if (k) {
                if (!callback(pos[k], k, axisOptions[k])) {
                    return false;
                }
            }
        }
        return true;
    };
    AxisManager.prototype.filter = function (pos, callback) {
        var filtered = {};
        var axisOptions = this.options.axis;
        for (var k in pos) {
            if (k) {
                callback(pos[k], k, axisOptions[k]) && (filtered[k] = pos[k]);
            }
        }
        return filtered;
    };
    AxisManager.prototype.map = function (pos, callback) {
        var tranformed = {};
        var axisOptions = this.options.axis;
        for (var k in pos) {
            if (k) {
                tranformed[k] = callback(pos[k], k, axisOptions[k]);
            }
        }
        return tranformed;
    };
    return AxisManager;
}());
exports.AxisManager = AxisManager;
;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate = {
    getInsidePosition: function (destPos, range, circular, bounce) {
        var includeBounce = !!bounce;
        var targetRange = includeBounce ?
            [range[0] - bounce[0], range[1] + bounce[1]] : range.concat();
        var toDestPos = destPos;
        if (!circular[0]) {
            toDestPos = Math.max(targetRange[0], toDestPos);
        }
        if (!circular[1]) {
            toDestPos = Math.min(targetRange[1], toDestPos);
        }
        return Math.min(range[1], Math.max(range[0], toDestPos));
    },
    // determine outside
    isOutside: function (pos, range) {
        return pos < range[0] || pos > range[1];
    },
    getDuration: function (distance, deceleration) {
        var duration = Math.sqrt(distance / deceleration * 2);
        // when duration is under 100, then value is zero
        return duration < 100 ? 0 : duration;
    },
    isCircular: function (destPos, range, circular) {
        return (circular[1] && destPos > range[1]) ||
            (circular[0] && destPos < range[0]);
    },
    getCirculatedPos: function (pos, range, circular) {
        var toPos = pos;
        var min = range[0];
        var max = range[1];
        var length = max - min;
        if (circular[1] && pos > max) {
            toPos = (toPos - max) % length + min;
        }
        if (circular[0] && pos < min) {
            toPos = (toPos - min) % length + max;
        }
        return +toPos.toFixed(5);
    },
};
exports.default = Coordinate;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIQUEKEY = "__MOVABLECOORD__";
exports.SUPPORT_TOUCH = "ontouchstart" in window;
exports.TRANSFORM = (function () {
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];
    for (var i = 0, len = target.length; i < len; i++) {
        if (target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Axes = __webpack_require__(4);

var _Axes2 = _interopRequireDefault(_Axes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Axes2.default.VERSION = "2.0.0-rc.1"; /**
                                        * Copyright (c) NAVER Corp.
                                        * egjs-axes projects are licensed under the MIT license
                                        */

module.exports = _Axes2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component = __webpack_require__(5);
var AnimationManager_1 = __webpack_require__(6);
var EventManager_1 = __webpack_require__(7);
var InterruptManager_1 = __webpack_require__(8);
var AxisManager_1 = __webpack_require__(0);
var InputObserver_1 = __webpack_require__(9);
var HammerInput_1 = __webpack_require__(10);
var const_1 = __webpack_require__(2);
/**
 * Copyright (c) NAVER Corp.
 * egjs-axes projects are licensed under the MIT license
 */
/**
 * A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.
 * @alias eg.Axes
 * @extends eg.Component
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 */
var Axes = (function (_super) {
    __extends(Axes, _super);
    function Axes(options) {
        var _this = _super.call(this) || this;
        _this.options = __assign({
            easing: function easeOutCubic(x) {
                return 1 - Math.pow(1 - x, 3);
            },
            interruptable: true,
            maximumDuration: Infinity,
            deceleration: 0.0006,
            axis: {},
        }, options);
        _this._complementOptions();
        _this._em = new EventManager_1.EventManager(_this);
        _this._axm = new AxisManager_1.AxisManager(_this.options);
        _this._itm = new InterruptManager_1.InterruptManager(_this.options);
        _this._am = new AnimationManager_1.AnimationManager(_this.options, _this._itm, _this._em, _this._axm);
        _this._io = new InputObserver_1.InputObserver(_this.options, _this._itm, _this._em, _this._axm, _this._am);
        return _this;
    }
    /**
     * set up 'css' expression
     * @private
     */
    Axes.prototype._complementOptions = function () {
        var _this = this;
        Object.keys(this.options.axis).forEach(function (axis) {
            _this.options.axis[axis] = __assign({
                range: [0, 100],
                bounce: [0, 0],
                margin: [0, 0],
                circular: [false, false]
            }, _this.options.axis[axis]);
            ["bounce", "margin", "circular"].forEach(function (v) {
                var axisOption = _this.options.axis;
                var key = axisOption[axis][v];
                if (/string|number|boolean/.test(typeof key)) {
                    axisOption[axis][v] = [key, key];
                }
            });
        });
    };
    Axes.prototype.mapInput = function (axes, inputType) {
        var mapped;
        if (typeof axes === "string") {
            mapped = [axes];
        }
        else {
            mapped = axes.concat();
        }
        inputType.mapAxes(mapped);
        inputType.create(this._io);
        return this;
    };
    Axes.prototype.get = function (axes) {
        return this._axm.get(axes);
    };
    Axes.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        this._am.setTo(pos, duration);
        return this;
    };
    Axes.prototype.destroy = function () {
        this._em.destroy();
    };
    Axes.HammerInput = HammerInput_1.HammerInput;
    Axes.TRANSFORM = const_1.TRANSFORM;
    return Axes;
}(Component));
exports.default = Axes;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinate_1 = __webpack_require__(1);
var AxisManager_1 = __webpack_require__(0);
var AnimationManager = (function () {
    function AnimationManager(options, itm, em, axm) {
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
    }
    AnimationManager.prototype.grab = function (axes) {
        if (this._animateParam && !axes.length) {
            var orgPos_1 = this.axm.get(axes);
            var pos = this.axm.map(orgPos_1, function (v, k, opt) { return Coordinate_1.default.getCirculatedPos(v, opt.range, opt.circular); });
            if (!this.axm.every(pos, function (v, k) { return orgPos_1[k] === v; })) {
                this.em.triggerChange(this.axm.moveTo(pos), true);
            }
            this._animateParam = null;
            this._raf && window.cancelAnimationFrame(this._raf);
            this._raf = null;
            // this.em.trigger("animationEnd");
        }
    };
    AnimationManager.prototype.createAnimationParam = function (absPos, duration, inputEvent) {
        if (inputEvent === void 0) { inputEvent = null; }
        var maximumDuration = this.options.maximumDuration;
        var depaPos = this.axm.get(Object.keys(absPos));
        var destPos = this.axm.map(absPos, function (v, k, opt) {
            // depaPos[k],
            return Coordinate_1.default.getInsidePosition(v, opt.range, opt.circular, opt.bounce);
        });
        // remove unnecessary axis
        destPos = this.axm.filter(destPos, function (v, k) { return depaPos[k] !== v; });
        depaPos = this.axm.filter(depaPos, function (v, k) { return k in destPos; });
        // destPos = this.apmCoordinate.isOutToOut(pos, destPos, min, max) ? pos : destPos;
        var distance = this.axm.map(destPos, function (v, k) { return v - depaPos[k]; });
        return {
            depaPos: depaPos,
            destPos: destPos,
            isBounce: this.axm.every(destPos, function (v, k, opt) { return Coordinate_1.default.isOutside(v, opt.range); }),
            isCircular: this.axm.every(destPos, function (v, k, opt) { return Coordinate_1.default.isCircular(v, opt.range, opt.circular); }),
            duration: maximumDuration > duration ? duration : maximumDuration,
            distance: distance,
            inputEvent: inputEvent,
        };
    };
    AnimationManager.prototype.restore = function (axes, complete, inputEvent) {
        var _this = this;
        if (inputEvent === void 0) { inputEvent = null; }
        var pos = this.axm.get(axes);
        var destPos = this.axm.map(pos, function (v, k, opt) { return Math.min(opt.range[1], Math.max(opt.range[0], v)); });
        var durations = this.axm.map(destPos, function (v) { return Coordinate_1.default.getDuration(v, _this.options.deceleration); });
        this.animateLoop(this.createAnimationParam(destPos, Object.keys(durations).reduce(function (max, v) { return Math.max(max, durations[v]); }, -Infinity), inputEvent), complete);
    };
    AnimationManager.prototype.animationEnd = function () {
        this._animateParam = null;
        // for Circular
        this.setTo(this.axm.map(this.axm.get(), function (v, k, opt) { return Coordinate_1.default.getCirculatedPos(Math.round(v), opt.range, opt.circular); }));
        this.itm.setInterrupt(false);
        /**
         * This event is fired when animation ends.
         * @ko 에니메이션이 끝났을 때 발생한다.
         * @name eg.MovableCoord#animationEnd
         * @event
         */
        this.em.trigger("animationEnd");
    };
    AnimationManager.prototype.animateLoop = function (param, complete) {
        this._animateParam = __assign({}, param);
        this._animateParam.startTime = new Date().getTime();
        if (param.duration) {
            var info_1 = this._animateParam;
            var self_1 = this;
            (function loop() {
                self_1._raf = null;
                if (self_1.frame(info_1) >= 1) {
                    complete();
                    return;
                } // animationEnd
                self_1._raf = window.requestAnimationFrame(loop);
            })();
        }
        else {
            this.em.triggerChange(this.axm.moveTo(param.destPos));
            complete();
        }
    };
    AnimationManager.prototype.animateTo = function (absPos, duration, inputEvent) {
        var _this = this;
        if (inputEvent === void 0) { inputEvent = null; }
        var param = this.createAnimationParam(absPos, duration, inputEvent);
        var retTrigger = this.em.trigger("animationStart", param);
        // You can't stop the 'animationStart' event when 'circular' is true.
        if (param.isCircular && !retTrigger) {
            throw new Error("You can't stop the 'animation' event when 'circular' is true.");
        }
        if (retTrigger) {
            var queue_1 = [];
            var dequeue_1 = function () {
                var task = queue_1.shift();
                task && task.call(this);
            };
            if (!AxisManager_1.AxisManager.equal(param.depaPos, param.destPos)) {
                queue_1.push(function () { return _this.animateLoop(param, dequeue_1); });
            }
            if (this.axm.every(param.destPos, function (v, k, opt) { return Coordinate_1.default.isOutside(v, opt.range); })) {
                queue_1.push(function () { return _this.restore(Object.keys(param.destPos), dequeue_1, inputEvent); });
            }
            queue_1.push(function () { return _this.animationEnd(); });
            dequeue_1();
        }
    };
    // animation frame (0~1)
    AnimationManager.prototype.frame = function (param) {
        var curTime = new Date().getTime() - param.startTime;
        var easingPer = this.easing(curTime / param.duration);
        var toPos = param.depaPos;
        toPos = this.axm.map(toPos, function (v, k, opt) {
            v += (param.destPos[k] - v) * easingPer;
            return Coordinate_1.default.getCirculatedPos(v, opt.range, opt.circular);
        });
        this.em.triggerChange(this.axm.moveTo(toPos));
        return easingPer;
    };
    AnimationManager.prototype.easing = function (p) {
        // console.log("easing", p, this.options.easing(p));
        return p > 1 ? 1 : this.options.easing(p);
    };
    /**
     * Moves an element to specific coordinates.
     * @ko 좌표를 이동한다.
     * @method eg.MovableCoord#setTo
     * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
     * @param {Number} y The Y coordinate to move to  <ko>이동할 y좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
     */
    AnimationManager.prototype.setTo = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        var axes = Object.keys(pos);
        this.grab(axes);
        var orgPos = this.axm.get(axes);
        if (AxisManager_1.AxisManager.equal(pos, orgPos)) {
            return this;
        }
        this.itm.setInterrupt(true);
        var movedPos = this.axm.filter(pos, function (v, k) { return orgPos[k] !== v; });
        if (!Object.keys(movedPos).length) {
            return;
        }
        movedPos = this.axm.map(movedPos, function (v, k, opt) {
            v = Coordinate_1.default.getInsidePosition(v, opt.range, opt.circular);
            return duration ? v : Coordinate_1.default.getCirculatedPos(v, opt.range, opt.circular);
        });
        if (AxisManager_1.AxisManager.equal(movedPos, orgPos)) {
            return this;
        }
        else if (duration) {
            this.animateTo(movedPos, duration);
        }
        else {
            this.em.triggerChange(this.axm.moveTo(movedPos));
            this.itm.setInterrupt(false);
        }
        return this;
    };
    /**
     * Moves an element from the current coordinates to specific coordinates. The change event is fired when the method is executed.
     * @ko 현재 좌표를 기준으로 좌표를 이동한다. 메서드가 실행되면 change 이벤트가 발생한다
     * @method eg.MovableCoord#setBy
     * @param {Number} x The X coordinate to move to <ko>이동할 x좌표</ko>
     * @param {Number} y The Y coordinate to move to <ko>이동할 y좌표</ko>
     * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>애니메이션 진행 시간(단위: ms)</ko>
     * @return {eg.MovableCoord} An instance of a module itself <ko>자신의 인스턴스</ko>
     */
    AnimationManager.prototype.setBy = function (pos, duration) {
        if (duration === void 0) { duration = 0; }
        return this.setTo(this.axm.map(this.axm.get(Object.keys(pos)), function (v, k) { return v + pos[k]; }), duration);
    };
    return AnimationManager;
}());
exports.AnimationManager = AnimationManager;
;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventManager = (function () {
    function EventManager(axes) {
        this.axes = axes;
    }
    EventManager.prototype.trigger = function (name, option) {
        return this.axes.trigger(name, option);
    };
    // trigger 'change' event
    EventManager.prototype.triggerChange = function (pos, event) {
        if (event === void 0) { event = null; }
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
        this.trigger("change", {
            pos: pos,
            holding: event !== null,
            inputEvent: event,
        });
    };
    EventManager.prototype.destroy = function () {
        this.axes.off();
    };
    return EventManager;
}());
exports.EventManager = EventManager;
;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InterruptManager = (function () {
    function InterruptManager(options) {
        this.options = options;
        this._prevented = false; //  check whether the animation event was prevented
    }
    InterruptManager.prototype.isInterrupting = function () {
        // when interruptable is 'true', return value is always 'true'.
        return this.options.interruptable || this._prevented;
    };
    InterruptManager.prototype.isInterrupted = function () {
        return !this.options.interruptable && this._prevented;
    };
    InterruptManager.prototype.setInterrupt = function (prevented) {
        !this.options.interruptable && (this._prevented = prevented);
    };
    return InterruptManager;
}());
exports.InterruptManager = InterruptManager;
;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AxisManager_1 = __webpack_require__(0);
var Coordinate_1 = __webpack_require__(1);
var InputObserver = (function () {
    function InputObserver(options, itm, em, axm, am) {
        this.options = options;
        this.itm = itm;
        this.em = em;
        this.axm = axm;
        this.am = am;
        this.isOutside = false;
    }
    InputObserver.prototype.hold = function (inputType, event) {
        if (this.itm.isInterrupted() || !inputType.axes.length) {
            return;
        }
        this.itm.setInterrupt(true);
        this.am.grab(inputType.axes);
        var pos = this.axm.get();
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
        this.em.trigger("hold", {
            pos: pos,
            inputEvent: event,
        });
        this.isOutside = !this.axm.every(pos, function (v, k, opt) { return !Coordinate_1.default.isOutside(v, opt.range); });
        this.moveDistance = this.axm.get(inputType.axes);
    };
    InputObserver.prototype.change = function (inputType, event, offset) {
        if (!this.itm.isInterrupting() || this.axm.every(offset, function (v) { return v === 0; })) {
            return;
        }
        var depaPos = this.axm.get(inputType.axes);
        // for outside logic
        this.moveDistance = this.axm.map(this.moveDistance, function (v, k) { return v + offset[k]; });
        var destPos = this.axm.map(this.moveDistance, function (v, k, opt) {
            return Coordinate_1.default.getCirculatedPos(v, opt.range, opt.circular);
        });
        // from outside to inside
        if (this.isOutside &&
            this.axm.every(depaPos, function (v, k, opt) { return !Coordinate_1.default.isOutside(v, opt.range); })) {
            this.isOutside = false;
        }
        destPos = this.atOutside(destPos, this.isOutside);
        this.em.triggerChange(this.axm.moveTo(destPos), event);
    };
    // when move pointer is held in outside
    InputObserver.prototype.atOutside = function (pos, isOutside) {
        var _this = this;
        if (isOutside) {
            return this.axm.map(pos, function (v, k, opt) {
                var tn = opt.range[0] - (opt.margin[0] + opt.bounce[0]);
                var tx = opt.range[1] + (opt.margin[1] + opt.bounce[1]);
                return v > tx ? tx : (v < tn ? tn : v);
            });
        }
        else {
            // when start pointer is held in inside
            // get a initialization slope value to prevent smooth animation.
            var initSlope_1 = this.am.easing(0.00001) / 0.00001;
            return this.axm.map(pos, function (v, k, opt) {
                var min = opt.range[0];
                var max = opt.range[1];
                var out = [opt.margin[0] + opt.bounce[0], opt.margin[1] + opt.bounce[1]];
                if (out[0] === 0 && out[1] === 0) {
                    return v;
                }
                if (v < min) {
                    return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
                }
                else if (v > max) {
                    return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
                }
                return v;
            });
        }
    };
    InputObserver.prototype.release = function (inputType, event, offset) {
        var _this = this;
        if (!this.itm.isInterrupting()) {
            return;
        }
        var pos = this.axm.get(inputType.axes);
        var depaPos = this.axm.get();
        var destPos = this.axm.map(offset, function (v, k, opt) {
            return Coordinate_1.default.getInsidePosition(pos[k] + v, opt.range, opt.circular);
        });
        var isAnimate = false;
        var duration = 0;
        if (!AxisManager_1.AxisManager.equal(destPos, pos)) {
            var durations_1 = this.axm.map(destPos, function (v, k) { return Coordinate_1.default.getDuration(Math.abs(Math.abs(v) - Math.abs(pos[k])), _this.options.deceleration); });
            duration = Object.keys(durations_1).reduce(function (max, v) { return Math.max(max, durations_1[v]); }, -Infinity);
            if (duration === 0) {
                // console.log("--------moveTo on release---------");
                this.em.triggerChange(this.axm.moveTo(destPos), event);
            }
            else {
                isAnimate = true;
            }
        }
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
        this.em.trigger("release", {
            depaPos: depaPos,
            destPos: __assign({}, depaPos, destPos),
            inputEvent: event
        });
        this.moveDistance = null;
        if (isAnimate) {
            // console.log("--------animation---------");
            this.am.animateTo(destPos, this.options.maximumDuration > duration ? duration : this.options.maximumDuration);
        }
        else {
            this.itm.setInterrupt(false);
        }
    };
    return InputObserver;
}());
exports.InputObserver = InputObserver;
;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hammer = __webpack_require__(11);
var const_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(12);
var InputType_1 = __webpack_require__(13);
/**
 * Hammer helps you add support for touch gestures to your page
 *
 * @external Hammer
 * @see {@link http://hammerjs.github.io|Hammer.JS}
 * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
 * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.MovableCoord module removes all default CSS properties provided by Hammer.JS
 */
if (typeof Hammer === "undefined") {
    throw new Error("The Hammerjs must be loaded before eg.MovableCoord.\nhttp://hammerjs.github.io/");
}
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["DIRECTION_NONE"] = 1] = "DIRECTION_NONE";
    DIRECTION[DIRECTION["DIRECTION_HORIZONTAL"] = 6] = "DIRECTION_HORIZONTAL";
    DIRECTION[DIRECTION["DIRECTION_VERTICAL"] = 24] = "DIRECTION_VERTICAL";
    DIRECTION[DIRECTION["DIRECTION_ALL"] = 30] = "DIRECTION_ALL";
})(DIRECTION || (DIRECTION = {}));
var HammerInput = (function (_super) {
    __extends(HammerInput, _super);
    function HammerInput(el, options) {
        var _this = _super.call(this) || this;
        _this._element = utils_1.$(el);
        _this.options = __assign({
            inputType: ["touch", "mouse"],
            scale: [1, 1],
            thresholdAngle: 45
        }, options);
        return _this;
    }
    HammerInput.convertHammerInputType = function (inputType) {
        var hasTouch = false;
        var hasMouse = false;
        var inputs = inputType || [];
        inputs.forEach(function (v) {
            switch (v) {
                case "mouse":
                    hasMouse = true;
                    break;
                case "touch": hasTouch = const_1.SUPPORT_TOUCH;
            }
        });
        return (hasTouch && Hammer.TouchInput) ||
            (hasMouse && Hammer.MouseInput) || null;
    };
    // get user's direction
    HammerInput.getDirectionByAngle = function (angle, thresholdAngle) {
        if (thresholdAngle < 0 || thresholdAngle > 90) {
            return DIRECTION.DIRECTION_NONE;
        }
        var toAngle = Math.abs(angle);
        return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ?
            DIRECTION.DIRECTION_VERTICAL : DIRECTION.DIRECTION_HORIZONTAL;
    };
    HammerInput.getNextOffset = function (speeds, deceleration) {
        var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
        var duration = Math.abs(normalSpeed / -deceleration);
        return [
            speeds[0] / 2 * duration,
            speeds[1] / 2 * duration
        ];
    };
    HammerInput.useDirection = function (checkType, direction, userDirection) {
        if (userDirection) {
            return !!(direction & DIRECTION.DIRECTION_ALL ||
                (direction & checkType && userDirection & checkType));
        }
        else {
            return !!(direction & DIRECTION.DIRECTION_ALL ||
                (direction & checkType));
        }
    };
    HammerInput.prototype.mapAxes = function (axes) {
        var useHorizontal = !!axes[0];
        var useVertical = !!axes[1];
        if (useHorizontal && useVertical) {
            this._direction = DIRECTION.DIRECTION_ALL;
        }
        else if (useHorizontal) {
            this._direction = DIRECTION.DIRECTION_HORIZONTAL;
        }
        else if (useVertical) {
            this._direction = DIRECTION.DIRECTION_VERTICAL;
        }
        else {
            this._direction = DIRECTION.DIRECTION_NONE;
        }
        this.axes = axes;
    };
    HammerInput.prototype.create = function (observer) {
        var _this = this;
        var inputClass = HammerInput.convertHammerInputType(this.options.inputType);
        if (!inputClass) {
            throw new Error("Wrong inputType parameter!");
        }
        var keyValue = this._element[const_1.UNIQUEKEY];
        if (keyValue) {
            this.hammer.destroy();
        }
        else {
            keyValue = String(Math.round(Math.random() * new Date().getTime()));
        }
        this.hammer = this.createHammer(inputClass)
            .on("hammer.input", function (event) {
            if (event.isFirst) {
                observer.hold(_this, event);
            }
            else if (event.isFinal) {
                _this.onRelease(observer, event);
            }
        }).on("panstart panmove", function (event) {
            _this.onChange(observer, event);
        });
        this._element[const_1.UNIQUEKEY] = keyValue;
        return this;
    };
    HammerInput.prototype.destroy = function () {
        if (this._element[const_1.UNIQUEKEY]) {
            this.hammer.off("hammer.input panstart panmove panend");
            this.hammer.destroy();
            delete this._element[const_1.UNIQUEKEY];
        }
        this.hammer = null;
        this._element = null;
        this.options = {};
        return this;
    };
    HammerInput.prototype.createHammer = function (inputClass) {
        try {
            // create Hammer
            return new Hammer.Manager(this._element, {
                recognizers: [
                    [
                        Hammer.Pan, {
                            direction: this._direction,
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
                inputClass: inputClass,
            });
        }
        catch (e) {
            return null;
        }
    };
    HammerInput.prototype.getOffset = function (properties, useDirection) {
        var offset = [0, 0];
        var scale = this.options.scale;
        if (useDirection[0]) {
            offset[0] = (properties[0] * scale[0]);
        }
        if (useDirection[1]) {
            offset[1] = (properties[1] * scale[1]);
        }
        return offset;
    };
    HammerInput.prototype.onChange = function (observer, event) {
        var userDirection = HammerInput.getDirectionByAngle(event.angle, this.options.thresholdAngle);
        // not support offset properties in Hammerjs - start
        var prevInput = this.hammer.session.prevInput;
        /* eslint-disable no-param-reassign */
        if (prevInput) {
            event.offsetX = event.deltaX - prevInput.deltaX;
            event.offsetY = event.deltaY - prevInput.deltaY;
        }
        else {
            event.offsetX = 0;
            event.offsetY = 0;
        }
        var offset = this.getOffset([event.offsetX, event.offsetY], [
            HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction, userDirection),
            HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction, userDirection)
        ]);
        var prevent = offset.some(function (v) { return v !== 0; });
        if (prevent) {
            event.srcEvent.preventDefault();
            event.srcEvent.stopPropagation();
        }
        event.preventSystemEvent = prevent;
        prevent && observer.change(this, event, this.toAxis(offset));
    };
    HammerInput.prototype.onRelease = function (observer, event) {
        var offset = this.getOffset([
            Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1),
            Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)
        ], [
            HammerInput.useDirection(DIRECTION.DIRECTION_HORIZONTAL, this._direction),
            HammerInput.useDirection(DIRECTION.DIRECTION_VERTICAL, this._direction)
        ]);
        offset = HammerInput.getNextOffset(offset, observer.options.deceleration);
        observer.release(this, event, this.toAxis(offset));
    };
    HammerInput.prototype.toAxis = function (offset) {
        var _this = this;
        return offset.reduce(function (acc, v, i) {
            if (_this.axes[i]) {
                acc[_this.axes[i]] = v;
            }
            return acc;
        }, {});
    };
    HammerInput.prototype.enable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = true);
    };
    HammerInput.prototype.disable = function () {
        this.hammer && (this.hammer.get("pan").options.enable = false);
    };
    HammerInput.prototype.isEnable = function () {
        return this.hammer && this.hammer.get("pan").options.enable;
    };
    return HammerInput;
}(InputType_1.InputType));
exports.HammerInput = HammerInput;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// declare var jQuery: any;
Object.defineProperty(exports, "__esModule", { value: true });
function $(param, multi) {
    if (multi === void 0) { multi = false; }
    var el;
    if (typeof param === "string") {
        // check if string is HTML tag format
        var match = param.match(/^<([a-z]+)\s*([^>]*)>/);
        // creating element
        if (match) {
            var dummy = document.createElement("div");
            dummy.innerHTML = param;
            el = Array.prototype.slice.call(dummy.childNodes);
        }
        else {
            el = Array.prototype.slice.call(document.querySelectorAll(param));
        }
        if (!multi) {
            el = el.length >= 1 ? el[0] : undefined;
        }
    }
    else if (param.nodeName &&
        (param.nodeType === 1 || param.nodeType === 9)) {
        el = param;
    }
    else if (("jQuery" in window && param instanceof jQuery) ||
        param.constructor.prototype.jquery) {
        el = multi ? param.toArray() : param.get(0);
    }
    return el;
}
exports.$ = $;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputType = (function () {
    function InputType() {
    }
    InputType.prototype.mapAxes = function (axes) {
        this.axes = axes;
    };
    return InputType;
}());
exports.InputType = InputType;


/***/ })
/******/ ]);
});