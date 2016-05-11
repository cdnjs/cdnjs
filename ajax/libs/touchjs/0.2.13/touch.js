/*! touchjs v0.2.13  2014-02-24 */
'use strict';
(function(root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory); //Register as a module.
    } else {
        root.touch = factory();
    }
}(this, function() {

var utils = {};

utils.PCevts = {
    'touchstart': 'mousedown',
    'touchmove': 'mousemove',
    'touchend': 'mouseup',
    'touchcancel': 'mouseout'
};

utils.hasTouch = ('ontouchstart' in window);

utils.getType = function(obj) {
    return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
};

utils.getSelector = function(el) {
    if (el.id) {
        return "#" + el.id;
    }
    if (el.className) {
        var cns = el.className.split(/\s+/);
        return "." + cns.join(".");
    } else if (el === document) {
        return "body";
    } else {
        return el.tagName.toLowerCase();
    }
};

utils.matchSelector = function(target, selector) {
    return target.webkitMatchesSelector(selector);
};

utils.getEventListeners = function(el) {
    return el.listeners;
};

utils.getPCevts = function(evt) {
    return this.PCevts[evt] || evt;
};

utils.forceReflow = function() {
    var tempDivID = "reflowDivBlock";
    var domTreeOpDiv = document.getElementById(tempDivID);
    if (!domTreeOpDiv) {
        domTreeOpDiv = document.createElement("div");
        domTreeOpDiv.id = tempDivID;
        document.body.appendChild(domTreeOpDiv);
    }
    var parentNode = domTreeOpDiv.parentNode;
    var nextSibling = domTreeOpDiv.nextSibling;
    parentNode.removeChild(domTreeOpDiv);
    parentNode.insertBefore(domTreeOpDiv, nextSibling);
};

utils.simpleClone = function(obj) {
	return Object.create(obj);
};

utils.getPosOfEvent = function(ev) {
    if (this.hasTouch) {
        var posi = [];
        var src = null;

        for (var t = 0, len = ev.touches.length; t < len; t++) {
            src = ev.touches[t];
            posi.push({
                x: src.pageX,
                y: src.pageY
            });
        }
        return posi;
    } else {
        return [{
            x: ev.pageX,
            y: ev.pageY
        }];
    }
};

utils.getDistance = function(pos1, pos2) {
    var x = pos2.x - pos1.x,
        y = pos2.y - pos1.y;
    return Math.sqrt((x * x) + (y * y));
};

utils.getFingers = function(ev) {
    return ev.touches ? ev.touches.length : 1;
};

utils.calScale = function(pstart, pmove) {
    if (pstart.length >= 2 && pmove.length >= 2) {
        var disStart = this.getDistance(pstart[1], pstart[0]);
        var disEnd = this.getDistance(pmove[1], pmove[0]);

        return disEnd / disStart;
    }
    return 1;
};

utils.getAngle = function(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
};

utils.getAngle180 = function(p1, p2) {
    var agl = Math.atan((p2.y - p1.y) * -1 / (p2.x - p1.x)) * (180 / Math.PI);
    return (agl < 0 ? (agl + 180) : agl);
};

utils.getDirectionFromAngle = function(agl) {
    var directions = {
        up: agl < -45 && agl > -135,
        down: agl >= 45 && agl < 135,
        left: agl >= 135 || agl <= -135,
        right: agl >= -45 && agl <= 45
    };
    for (var key in directions) {
        if (directions[key]) return key;
    }
    return null;
};

utils.getXYByElement = function(el) {
    var left = 0,
        top = 0;

    while (el.offsetParent) {
        left += el.offsetLeft;
        top += el.offsetTop;
        el = el.offsetParent;
    }
    return {
        left: left,
        top: top
    };
};

utils.reset = function() {
    startEvent = moveEvent = endEvent = null;
    __tapped = __touchStart = startSwiping = startPinch = false;
    startDrag = false;
    pos = {};
    __rotation_single_finger = false;
};

utils.isTouchMove = function(ev) {
    return (ev.type === 'touchmove' || ev.type === 'mousemove');
};

utils.isTouchEnd = function(ev) {
    return (ev.type === 'touchend' || ev.type === 'mouseup' || ev.type === 'touchcancel');
};

utils.env = (function() {
    var os = {}, ua = navigator.userAgent,
        android = ua.match(/(Android)[\s\/]+([\d\.]+)/),
        ios = ua.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
        wp = ua.match(/(Windows\s+Phone)\s([\d\.]+)/),
        isWebkit = /WebKit\/[\d.]+/i.test(ua),
        isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(ua) && !/CriOS/i.test(ua) && !/MQQBrowser/i.test(ua))) : false;
    if (android) {
        os.android = true;
        os.version = android[2];
    }
    if (ios) {
        os.ios = true;
        os.version = ios[2].replace(/_/g, '.');
        os.ios7 = /^7/.test(os.version);
        if (ios[1] === 'iPad') {
            os.ipad = true;
        } else if (ios[1] === 'iPhone') {
            os.iphone = true;
            os.iphone5 = screen.height == 568;
        } else if (ios[1] === 'iPod') {
            os.ipod = true;
        }
    }
    if (wp) {
        os.wp = true;
        os.version = wp[2];
        os.wp8 = /^8/.test(os.version);
    }
    if (isWebkit) {
        os.webkit = true;
    }
    if (isSafari) {
        os.safari = true;
    }
    return os;
})();

/** 底层事件绑定/代理支持  */
var engine = {
    proxyid: 0,
    proxies: [],
    trigger: function(el, evt, detail) {

        detail = detail || {};
        var e, opt = {
                bubbles: true,
                cancelable: true,
                detail: detail
            };

        try {
            if (typeof CustomEvent !== 'undefined') {
                e = new CustomEvent(evt, opt);
                if (el) {
                    el.dispatchEvent(e);
                }
            } else {
                e = document.createEvent("CustomEvent");
                e.initCustomEvent(evt, true, true, detail);
                if (el) {
                    el.dispatchEvent(e);
                }
            }
        } catch (ex) {
            console.warn("Touch.js is not supported by environment.");
        }
    },
    bind: function(el, evt, handler) {
        el.listeners = el.listeners || {};
        if (!el.listeners[evt]) {
            el.listeners[evt] = [handler];
        } else {
            el.listeners[evt].push(handler);
        }
        var proxy = function(e) {
            if (utils.env.ios7) {
                utils.forceReflow();
            }
            e.originEvent = e;
            for (var p in e.detail) {
                if (p !== 'type') {
                    e[p] = e.detail[p];
                }
            }
            e.startRotate = function() {
                __rotation_single_finger = true;
            };
            var returnValue = handler.call(e.target, e);
            if (typeof returnValue !== "undefined" && !returnValue) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        handler.proxy = handler.proxy || {};
        if (!handler.proxy[evt]) {
            handler.proxy[evt] = [this.proxyid++];
        } else {
            handler.proxy[evt].push(this.proxyid++);
        }
        this.proxies.push(proxy);
        if (el.addEventListener) {
            el.addEventListener(evt, proxy, false);
        }
    },
    unbind: function(el, evt, handler) {
        if (!handler) {
            var handlers = el.listeners[evt];
            if (handlers && handlers.length) {
                handlers.forEach(function(handler) {
                    el.removeEventListener(evt, handler, false);
                });
            }
        } else {
            var proxyids = handler.proxy[evt];
            if (proxyids && proxyids.length) {
                proxyids.forEach(function(proxyid) {
                    if (el.removeEventListener) {
                        el.removeEventListener(evt, this.proxies[this.proxyid], false);
                    }
                });
            }
        }
    },
    delegate: function(el, evt, sel, handler) {
        var proxy = function(e) {
            var target, returnValue;
            e.originEvent = e;
            for (var p in e.detail) {
                if (p !== 'type') {
                    e[p] = e.detail[p];
                }
            }
            e.startRotate = function() {
                __rotation_single_finger = true;
            };
            var integrateSelector = utils.getSelector(el) + " " + sel;
            var match = utils.matchSelector(e.target, integrateSelector);
            var ischild = utils.matchSelector(e.target, integrateSelector + " " + e.target.nodeName);
            if (!match && ischild) {
                if (utils.env.ios7) {
                    utils.forceReflow();
                }
                target = e.target;
                while (!utils.matchSelector(target, integrateSelector)) {
                    target = target.parentNode;
                }
                returnValue = handler.call(e.target, e);
                if (typeof returnValue !== "undefined" && !returnValue) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            } else {
                if (utils.env.ios7) {
                    utils.forceReflow();
                }
                if (match || ischild) {
                    returnValue = handler.call(e.target, e);
                    if (typeof returnValue !== "undefined" && !returnValue) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }
            }
        };
        handler.proxy = handler.proxy || {};
        if (!handler.proxy[evt]) {
            handler.proxy[evt] = [this.proxyid++];
        } else {
            handler.proxy[evt].push(this.proxyid++);
        }
        this.proxies.push(proxy);
        el.listeners = el.listeners || {};
        if (!el.listeners[evt]) {
            el.listeners[evt] = [proxy];
        } else {
            el.listeners[evt].push(proxy);
        }
        if (el.addEventListener) {
            el.addEventListener(evt, proxy, false);
        }
    },
    undelegate: function(el, evt, sel, handler) {
        if (!handler) {
            var listeners = el.listeners[evt];
            listeners.forEach(function(proxy) {
                el.removeEventListener(evt, proxy, false);
            });
        } else {
            var proxyids = handler.proxy[evt];
            if (proxyids.length) {
                proxyids.forEach(function(proxyid) {
                    if (el.removeEventListener) {
                        el.removeEventListener(evt, this.proxies[this.proxyid], false);
                    }
                });
            }
        }
    }
};

var config = {
    tap: true,
    doubleTap: true,
    tapMaxDistance: 10,
    hold: true,
    tapTime: 200,
    holdTime: 650,
    maxDoubleTapInterval: 300,
    swipe: true,
    swipeTime: 300,
    swipeMinDistance: 18,
    swipeFactor: 5,
    drag: true,
    pinch: true,
    minScaleRate: 0,
    minRotationAngle: 0
};

var smrEventList = {
    TOUCH_START: 'touchstart',
    TOUCH_MOVE: 'touchmove',
    TOUCH_END: 'touchend',
    TOUCH_CANCEL: 'touchcancel',
    MOUSE_DOWN: 'mousedown',
    MOUSE_MOVE: 'mousemove',
    MOUSE_UP: 'mouseup',
    CLICK: 'click',
    PINCH_START: 'pinchstart',
    PINCH_END: 'pinchend',
    PINCH: 'pinch',
    PINCH_IN: 'pinchin',
    PINCH_OUT: 'pinchout',
    ROTATION_LEFT: 'rotateleft',
    ROTATION_RIGHT: 'rotateright',
    ROTATION: 'rotate',
    SWIPE_START: 'swipestart',
    SWIPING: 'swiping',
    SWIPE_END: 'swipeend',
    SWIPE_LEFT: 'swipeleft',
    SWIPE_RIGHT: 'swiperight',
    SWIPE_UP: 'swipeup',
    SWIPE_DOWN: 'swipedown',
    SWIPE: 'swipe',
    DRAG: 'drag',
    DRAGSTART: 'dragstart',
    DRAGEND: 'dragend',
    HOLD: 'hold',
    TAP: 'tap',
    DOUBLE_TAP: 'doubletap'
};

/** 手势识别 */
var pos = {
    start: null,
    move: null,
    end: null
};

var startTime = 0;
var fingers = 0;
var startEvent = null;
var moveEvent = null;
var endEvent = null;
var startSwiping = false;
var startPinch = false;
var startDrag = false;

var __offset = {};
var __touchStart = false;
var __holdTimer = null;
var __tapped = false;
var __lastTapEndTime = null;
var __tapTimer = null;

var __scale_last_rate = 1;
var __rotation_single_finger = false;
var __rotation_single_start = [];
var __initial_angle = 0;
var __rotation = 0;

var __prev_tapped_end_time = 0;
var __prev_tapped_pos = null;

var gestures = {
    getAngleDiff: function(currentPos) {
        var diff = parseInt(__initial_angle - utils.getAngle180(currentPos[0], currentPos[1]), 10);
        var count = 0;

        while (Math.abs(diff - __rotation) > 90 && count++ < 50) {
            if (__rotation < 0) {
                diff -= 180;
            } else {
                diff += 180;
            }
        }
        __rotation = parseInt(diff, 10);
        return __rotation;
    },
    pinch: function(ev) {
        var el = ev.target;
        if (config.pinch) {
            if (!__touchStart) return;
            if (utils.getFingers(ev) < 2) {
                if (!utils.isTouchEnd(ev)) return;
            }
            var scale = utils.calScale(pos.start, pos.move);
            var rotation = this.getAngleDiff(pos.move);
            var eventObj = {
                type: '',
                originEvent: ev,
                scale: scale,
                rotation: rotation,
                direction: (rotation > 0 ? 'right' : 'left'),
                fingersCount: utils.getFingers(ev)
            };
            if (!startPinch) {
                startPinch = true;
                eventObj.fingerStatus = "start";
                engine.trigger(el, smrEventList.PINCH_START, eventObj);
            } else if (utils.isTouchMove(ev)) {
                eventObj.fingerStatus = "move";
                engine.trigger(el, smrEventList.PINCH, eventObj);
            } else if (utils.isTouchEnd(ev)) {
                eventObj.fingerStatus = "end";
                engine.trigger(el, smrEventList.PINCH_END, eventObj);
                utils.reset();
            }

            if (Math.abs(1 - scale) > config.minScaleRate) {
                var scaleEv = utils.simpleClone(eventObj);

                //手势放大, 触发pinchout事件
                var scale_diff = 0.00000000001; //防止touchend的scale与__scale_last_rate相等，不触发事件的情况。
                if (scale > __scale_last_rate) {
                    __scale_last_rate = scale - scale_diff;
                    engine.trigger(el, smrEventList.PINCH_OUT, scaleEv, false);
                } //手势缩小,触发pinchin事件
                else if (scale < __scale_last_rate) {
                    __scale_last_rate = scale + scale_diff;
                    engine.trigger(el, smrEventList.PINCH_IN, scaleEv, false);
                }

                if (utils.isTouchEnd(ev)) {
                    __scale_last_rate = 1;
                }
            }

            if (Math.abs(rotation) > config.minRotationAngle) {
                var rotationEv = utils.simpleClone(eventObj),
                    eventType;

                eventType = rotation > 0 ? smrEventList.ROTATION_RIGHT : smrEventList.ROTATION_LEFT;
                engine.trigger(el, eventType, rotationEv, false);
                engine.trigger(el, smrEventList.ROTATION, eventObj);
            }

        }
    },
    rotateSingleFinger: function(ev) {
        var el = ev.target;
        if (__rotation_single_finger && utils.getFingers(ev) < 2) {
            if (!pos.move) return;
            if (__rotation_single_start.length < 2) {
                var docOff = utils.getXYByElement(el);

                __rotation_single_start = [{
                        x: docOff.left + el.offsetWidth / 2,
                        y: docOff.top + el.offsetHeight / 2
                    },
                    pos.move[0]
                ];
                __initial_angle = parseInt(utils.getAngle180(__rotation_single_start[0], __rotation_single_start[1]), 10);
            }
            var move = [__rotation_single_start[0], pos.move[0]];
            var rotation = this.getAngleDiff(move);
            var eventObj = {
                type: '',
                originEvent: ev,
                rotation: rotation,
                direction: (rotation > 0 ? 'right' : 'left'),
                fingersCount: utils.getFingers(ev)
            };
            if (utils.isTouchMove(ev)) {
                eventObj.fingerStatus = "move";
            } else if (utils.isTouchEnd(ev) || ev.type === 'mouseout') {
                eventObj.fingerStatus = "end";
                engine.trigger(el, smrEventList.PINCH_END, eventObj);
                utils.reset();
            }
            var eventType = rotation > 0 ? smrEventList.ROTATION_RIGHT : smrEventList.ROTATION_LEFT;
            engine.trigger(el, eventType, eventObj);
            engine.trigger(el, smrEventList.ROTATION, eventObj);
        }
    },
    swipe: function(ev) {
        var el = ev.target;
        if (!__touchStart || !pos.move || utils.getFingers(ev) > 1) {
            return;
        }

        var now = Date.now();
        var touchTime = now - startTime;
        var distance = utils.getDistance(pos.start[0], pos.move[0]);
        var position = {
            x: pos.move[0].x - __offset.left,
            y: pos.move[0].y - __offset.top
        };
        var angle = utils.getAngle(pos.start[0], pos.move[0]);
        var direction = utils.getDirectionFromAngle(angle);
        var touchSecond = touchTime / 1000;
        var factor = ((10 - config.swipeFactor) * 10 * touchSecond * touchSecond);
        var eventObj = {
            type: smrEventList.SWIPE,
            originEvent: ev,
            position: position,
            direction: direction,
            distance: distance,
            distanceX: pos.move[0].x - pos.start[0].x,
            distanceY: pos.move[0].y - pos.start[0].y,
            x: pos.move[0].x - pos.start[0].x,
            y: pos.move[0].y - pos.start[0].y,
            angle: angle,
            duration: touchTime,
            fingersCount: utils.getFingers(ev),
            factor: factor
        };
        if (config.swipe) {
            var swipeTo = function() {
                var elt = smrEventList;
                switch (direction) {
                    case 'up':
                        engine.trigger(el, elt.SWIPE_UP, eventObj);
                        break;
                    case 'down':
                        engine.trigger(el, elt.SWIPE_DOWN, eventObj);
                        break;
                    case 'left':
                        engine.trigger(el, elt.SWIPE_LEFT, eventObj);
                        break;
                    case 'right':
                        engine.trigger(el, elt.SWIPE_RIGHT, eventObj);
                        break;
                }
            };

            if (!startSwiping) {
                eventObj.fingerStatus = eventObj.swipe = 'start';
                startSwiping = true;
                engine.trigger(el, smrEventList.SWIPE_START, eventObj);
            } else if (utils.isTouchMove(ev)) {
                eventObj.fingerStatus = eventObj.swipe = 'move';
                engine.trigger(el, smrEventList.SWIPING, eventObj);

                if (touchTime > config.swipeTime && touchTime < config.swipeTime + 50 && distance > config.swipeMinDistance) {
                    swipeTo();
                    engine.trigger(el, smrEventList.SWIPE, eventObj, false);
                }
            } else if (utils.isTouchEnd(ev) || ev.type === 'mouseout') {
                eventObj.fingerStatus = eventObj.swipe = 'end';
                engine.trigger(el, smrEventList.SWIPE_END, eventObj);

                if (config.swipeTime > touchTime && distance > config.swipeMinDistance) {
                    swipeTo();
                    engine.trigger(el, smrEventList.SWIPE, eventObj, false);
                }
            }
        }

        if (config.drag) {
            if (!startDrag) {
                eventObj.fingerStatus = eventObj.swipe = 'start';
                startDrag = true;
                engine.trigger(el, smrEventList.DRAGSTART, eventObj);
            } else if (utils.isTouchMove(ev)) {
                eventObj.fingerStatus = eventObj.swipe = 'move';
                engine.trigger(el, smrEventList.DRAG, eventObj);
            } else if (utils.isTouchEnd(ev)) {
                eventObj.fingerStatus = eventObj.swipe = 'end';
                engine.trigger(el, smrEventList.DRAGEND, eventObj);
            }

        }
    },
    tap: function(ev) {
        var el = ev.target;
        if (config.tap) {
            var now = Date.now();
            var touchTime = now - startTime;
            var distance = utils.getDistance(pos.start[0], pos.move ? pos.move[0] : pos.start[0]);

            clearTimeout(__holdTimer);
            var isDoubleTap = (function() {
                if (__prev_tapped_pos && config.doubleTap && (startTime - __prev_tapped_end_time) < config.maxDoubleTapInterval) {
                    var doubleDis = utils.getDistance(__prev_tapped_pos, pos.start[0]);
                    if (doubleDis < 16) return true;
                }
                return false;
            })();

            if (isDoubleTap) {
                clearTimeout(__tapTimer);
                engine.trigger(el, smrEventList.DOUBLE_TAP, {
                    type: smrEventList.DOUBLE_TAP,
                    originEvent: ev,
                    position: pos.start[0]
                });
                return;
            }

            if (config.tapMaxDistance < distance) return;

            if (config.holdTime > touchTime && utils.getFingers(ev) <= 1) {
                __tapped = true;
                __prev_tapped_end_time = now;
                __prev_tapped_pos = pos.start[0];
                __tapTimer = setTimeout(function() {
                        engine.trigger(el, smrEventList.TAP, {
                            type: smrEventList.TAP,
                            originEvent: ev,
                            fingersCount: utils.getFingers(ev),
                            position: __prev_tapped_pos
                        });
                    },
                    config.tapTime);
            }
        }
    },
    hold: function(ev) {
        var el = ev.target;
        if (config.hold) {
            clearTimeout(__holdTimer);

            __holdTimer = setTimeout(function() {
                    if (!pos.start) return;
                    var distance = utils.getDistance(pos.start[0], pos.move ? pos.move[0] : pos.start[0]);
                    if (config.tapMaxDistance < distance) return;

                    if (!__tapped) {
                        engine.trigger(el, "hold", {
                            type: 'hold',
                            originEvent: ev,
                            fingersCount: utils.getFingers(ev),
                            position: pos.start[0]
                        });
                    }
                },
                config.holdTime);
        }
    }
};

var handlerOriginEvent = function(ev) {

    var el = ev.target;
    switch (ev.type) {
        case 'touchstart':
        case 'mousedown':
            __rotation_single_start = [];
            __touchStart = true;
            if (!pos.start || pos.start.length < 2) {
                pos.start = utils.getPosOfEvent(ev);
            }
            if (utils.getFingers(ev) >= 2) {
                __initial_angle = parseInt(utils.getAngle180(pos.start[0], pos.start[1]), 10);
            }

            startTime = Date.now();
            startEvent = ev;
            __offset = {};

            var box = el.getBoundingClientRect();
            var docEl = document.documentElement;
            __offset = {
                top: box.top + (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0),
                left: box.left + (window.pageXOffset || docEl.scrollLeft) - (docEl.clientLeft || 0)
            };

            gestures.hold(ev);
            break;
        case 'touchmove':
        case 'mousemove':
            if (!__touchStart || !pos.start) return;
            pos.move = utils.getPosOfEvent(ev);
            if (utils.getFingers(ev) >= 2) {
                gestures.pinch(ev);
            } else if (__rotation_single_finger) {
                gestures.rotateSingleFinger(ev);
            } else {
                gestures.swipe(ev);
            }
            break;
        case 'touchend':
        case 'touchcancel':
        case 'mouseup':
        case 'mouseout':
            if (!__touchStart) return;
            endEvent = ev;

            if (startPinch) {
                gestures.pinch(ev);
            } else if (__rotation_single_finger) {
                gestures.rotateSingleFinger(ev);
            } else if (startSwiping) {
                gestures.swipe(ev);
            } else {
                gestures.tap(ev);
            }

            utils.reset();
            __initial_angle = 0;
            __rotation = 0;
            if (ev.touches && ev.touches.length === 1) {
                __touchStart = true;
                __rotation_single_finger = true;
            }
            break;
    }
};

var _on = function() {

    var evts, handler, evtMap, sel, args = arguments;
    if (args.length < 2 || args > 4) {
        return console.error("unexpected arguments!");
    }
    var els = utils.getType(args[0]) === 'string' ? document.querySelectorAll(args[0]) : args[0];
    els = els.length ? Array.prototype.slice.call(els) : [els];
    //事件绑定
    if (args.length === 3 && utils.getType(args[1]) === 'string') {
        evts = args[1].split(" ");
        handler = args[2];
        evts.forEach(function(evt) {
            if (!utils.hasTouch) {
                evt = utils.getPCevts(evt);
            }
            els.forEach(function(el) {
                engine.bind(el, evt, handler);
            });
        });
        return;
    }

    function evtMapDelegate(evt) {
        if (!utils.hasTouch) {
            evt = utils.getPCevts(evt);
        }
        els.forEach(function(el) {
            engine.delegate(el, evt, sel, evtMap[evt]);
        });
    }
    //mapEvent delegate
    if (args.length === 3 && utils.getType(args[1]) === 'object') {
        evtMap = args[1];
        sel = args[2];
        for (var evt1 in evtMap) {
            evtMapDelegate(evt1);
        }
        return;
    }

    function evtMapBind(evt) {
        if (!utils.hasTouch) {
            evt = utils.getPCevts(evt);
        }
        els.forEach(function(el) {
            engine.bind(el, evt, evtMap[evt]);
        });
    }

    //mapEvent bind
    if (args.length === 2 && utils.getType(args[1]) === 'object') {
        evtMap = args[1];
        for (var evt2 in evtMap) {
            evtMapBind(evt2);
        }
        return;
    }

    //兼容factor config
    if (args.length === 4 && utils.getType(args[2]) === "object") {
        evts = args[1].split(" ");
        handler = args[3];
        evts.forEach(function(evt) {
            if (!utils.hasTouch) {
                evt = utils.getPCevts(evt);
            }
            els.forEach(function(el) {
                engine.bind(el, evt, handler);
            });
        });
        return;
    }

    //事件代理
    if (args.length === 4) {
        var el = els[0];
        evts = args[1].split(" ");
        sel = args[2];
        handler = args[3];
        evts.forEach(function(evt) {
            if (!utils.hasTouch) {
                evt = utils.getPCevts(evt);
            }
            engine.delegate(el, evt, sel, handler);
        });
        return;
    }
};

var _off = function() {
    var evts, handler;
    var args = arguments;
    if (args.length < 1 || args.length > 4) {
        return console.error("unexpected arguments!");
    }
    var els = utils.getType(args[0]) === 'string' ? document.querySelectorAll(args[0]) : args[0];
    els = els.length ? Array.prototype.slice.call(els) : [els];

    if (args.length === 1 || args.length === 2) {
        els.forEach(function(el) {
            evts = args[1] ? args[1].split(" ") : Object.keys(el.listeners);
            if (evts.length) {
                evts.forEach(function(evt) {
                    if (!utils.hasTouch) {
                        evt = utils.getPCevts(evt);
                    }
                    engine.unbind(el, evt);
                    engine.undelegate(el, evt);
                });
            }
        });
        return;
    }

    if (args.length === 3 && utils.getType(args[2]) === 'function') {
        handler = args[2];
        els.forEach(function(el) {
            evts = args[1].split(" ");
            evts.forEach(function(evt) {
                if (!utils.hasTouch) {
                    evt = utils.getPCevts(evt);
                }
                engine.unbind(el, evt, handler);
            });
        });
        return;
    }

    if (args.length === 3 && utils.getType(args[2]) === 'string') {
        var sel = args[2];
        els.forEach(function(el) {
            evts = args[1].split(" ");
            evts.forEach(function(evt) {
                if (!utils.hasTouch) {
                    evt = utils.getPCevts(evt);
                }
                engine.undelegate(el, evt, sel);
            });
        });
        return;
    }

    if (args.length === 4) {
        handler = args[3];
        els.forEach(function(el) {
            evts = args[1].split(" ");
            evts.forEach(function(evt) {
                if (!utils.hasTouch) {
                    evt = utils.getPCevts(evt);
                }
                engine.undelegate(el, evt, sel, handler);
            });
        });
        return;
    }
};

var _dispatch = function(el, evt, detail) {
    var args = arguments;
    if (!utils.hasTouch) {
        evt = utils.getPCevts(evt);
    }
    var els = utils.getType(args[0]) === 'string' ? document.querySelectorAll(args[0]) : args[0];
    els = els.length ? Array.prototype.call(els) : [els];

    els.forEach(function(el) {
        engine.trigger(el, evt, detail);
    });
};

    //init gesture
    function init() {

        var mouseEvents = 'mouseup mousedown mousemove mouseout',
            touchEvents = 'touchstart touchmove touchend touchcancel';
        var bindingEvents = utils.hasTouch ? touchEvents : mouseEvents;

        bindingEvents.split(" ").forEach(function(evt) {
            document.addEventListener(evt, handlerOriginEvent, false);
        });
    }

    init();

    var exports = {};

    exports.on = exports.bind = exports.live = _on;
    exports.off = exports.unbind = exports.die = _off;
    exports.config = config;
    exports.trigger = _dispatch;

    return exports;
}));