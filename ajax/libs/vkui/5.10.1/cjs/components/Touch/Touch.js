"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Touch", {
    enumerable: true,
    get: function() {
        return Touch;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useEventListener = require("../../hooks/useEventListener");
var _useExternRef = require("../../hooks/useExternRef");
var _dom = require("../../lib/dom");
var _touch = require("../../lib/touch");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var Touch = function(_param) {
    var onMove = function onMove(e) {
        var _gesture_current;
        var _ref = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {}, isPressed = _ref.isPressed, isX = _ref.isX, isY = _ref.isY, _ref_startX = _ref.startX, startX = _ref_startX === void 0 ? 0 : _ref_startX, _ref_startY = _ref.startY, startY = _ref_startY === void 0 ? 0 : _ref_startY;
        if (isPressed) {
            var _gesture_current1;
            var clientX = (0, _touch.coordX)(e);
            var clientY = (0, _touch.coordY)(e);
            // смещения
            var shiftX = clientX - startX;
            var shiftY = clientY - startY;
            // абсолютные значения смещений
            var shiftXAbs = Math.abs(shiftX);
            var shiftYAbs = Math.abs(shiftY);
            // Если определяем мультитач, то прерываем жест
            if (!!e.touches && e.touches.length > 1) {
                return onEnd(e);
            }
            // если мы ещё не определились
            if (!isX && !isY) {
                var willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
                var willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
                var willBeSlidedX = willBeX && (!!onMoveX || !!_onMove);
                var willBeSlidedY = willBeY && (!!onMoveY || !!_onMove);
                if (gesture.current) {
                    Object.assign(gesture.current, {
                        isY: willBeY,
                        isX: willBeX,
                        isSlideX: willBeSlidedX,
                        isSlideY: willBeSlidedY,
                        isSlide: willBeSlidedX || willBeSlidedY
                    });
                }
            }
            if ((_gesture_current1 = gesture.current) === null || _gesture_current1 === void 0 ? void 0 : _gesture_current1.isSlide) {
                Object.assign(gesture.current, {
                    clientX: clientX,
                    clientY: clientY,
                    shiftX: shiftX,
                    shiftY: shiftY,
                    shiftXAbs: shiftXAbs,
                    shiftYAbs: shiftYAbs
                });
                handle(e, [
                    _onMove,
                    gesture.current.isSlideX && onMoveX,
                    gesture.current.isSlideY && onMoveY
                ]);
            }
        }
    };
    var onEnd = function onEnd(e) {
        var _gesture_current;
        var _ref = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {}, isPressed = _ref.isPressed, isSlide = _ref.isSlide, isSlideX = _ref.isSlideX, isSlideY = _ref.isSlideY;
        if (isPressed) {
            handle(e, [
                _onEnd,
                isSlideY && onEndY,
                isSlideX && onEndX
            ]);
        }
        var isTouchEnabled = (0, _touch.touchEnabled)();
        if (isTouchEnabled && isSlide) {
            // https://github.com/VKCOM/VKUI/issues/4414
            // если тач-устройство и был зафиксирован touchmove,
            // то событие клика не вызывается
            didSlide.current = false;
        } else {
            didSlide.current = Boolean(isSlide);
        }
        gesture.current = {};
        // Если это был тач-евент, симулируем отмену hover
        if (isTouchEnabled) {
            onLeave && onLeave(e);
        }
        unsubscribe();
    };
    var subscribe = function subscribe(el) {
        if (el) {
            listeners.forEach(function(l) {
                return l.add(el);
            });
        }
    };
    var unsubscribe = function unsubscribe() {
        listeners.forEach(function(l) {
            return l.remove();
        });
    };
    var onStart = _param.onStart, onStartX = _param.onStartX, onStartY = _param.onStartY, _onMove = _param.onMove, onMoveX = _param.onMoveX, onMoveY = _param.onMoveY, onLeave = _param.onLeave, onEnter = _param.onEnter, _onEnd = _param.onEnd, onEndX = _param.onEndX, onEndY = _param.onEndY, onClickCapture = _param.onClickCapture, usePointerHover = _param.usePointerHover, _param_slideThreshold = _param.slideThreshold, slideThreshold = _param_slideThreshold === void 0 ? 5 : _param_slideThreshold, _param_useCapture = _param.useCapture, useCapture = _param_useCapture === void 0 ? false : _param_useCapture, _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, getRootRef = _param.getRootRef, _param_noSlideClick = _param.noSlideClick, noSlideClick = _param_noSlideClick === void 0 ? false : _param_noSlideClick, _param_stopPropagation = _param.stopPropagation, stopPropagation = _param_stopPropagation === void 0 ? false : _param_stopPropagation, restProps = _object_without_properties._(_param, [
        "onStart",
        "onStartX",
        "onStartY",
        "onMove",
        "onMoveX",
        "onMoveY",
        "onLeave",
        "onEnter",
        "onEnd",
        "onEndX",
        "onEndY",
        "onClickCapture",
        "usePointerHover",
        "slideThreshold",
        "useCapture",
        "Component",
        "getRootRef",
        "noSlideClick",
        "stopPropagation"
    ]);
    var document = (0, _dom.useDOM)().document;
    var events = _react.useMemo(_touch.getSupportedEvents, []);
    var didSlide = _react.useRef(false);
    var gesture = _react.useRef(null);
    var handle = function(e, handlers) {
        stopPropagation && e.stopPropagation();
        handlers.forEach(function(cb) {
            var _gesture_current_startT, _gesture_current;
            var _gesture_current_startT_getTime;
            var duration = Date.now() - ((_gesture_current_startT_getTime = (_gesture_current = gesture.current) === null || _gesture_current === void 0 ? void 0 : (_gesture_current_startT = _gesture_current.startT) === null || _gesture_current_startT === void 0 ? void 0 : _gesture_current_startT.getTime()) !== null && _gesture_current_startT_getTime !== void 0 ? _gesture_current_startT_getTime : 0);
            cb && cb(_object_spread_props._(_object_spread._({}, gesture.current), {
                duration: duration,
                originalEvent: e
            }));
        });
    };
    var enterHandler = (0, _useEventListener.useEventListener)(usePointerHover ? "pointerenter" : "mouseenter", onEnter);
    var leaveHandler = (0, _useEventListener.useEventListener)(usePointerHover ? "pointerleave" : "mouseleave", onLeave);
    var startHandler = (0, _useEventListener.useEventListener)(events[0], function(e) {
        gesture.current = initGesture((0, _touch.coordX)(e), (0, _touch.coordY)(e));
        handle(e, [
            onStart,
            onStartX,
            onStartY
        ]);
        // 1 line, 2 bad specs, 2 workarounds:
        subscribe((0, _touch.touchEnabled)() ? // see: #235, #1968, https://stackoverflow.com/a/45760014
        e.target : // if pointer goes outside container.
        // Can be fixed by PointerEvents' setPointerCapture later
        document);
    }, {
        capture: useCapture,
        passive: false
    });
    var containerRef = (0, _useExternRef.useExternRef)(getRootRef);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        var el = containerRef.current;
        if (el) {
            enterHandler.add(el);
            leaveHandler.add(el);
            startHandler.add(el);
        }
    }, [
        Component
    ]);
    var listenerParams = {
        capture: useCapture,
        passive: false
    };
    var listeners = [
        (0, _useEventListener.useEventListener)(events[1], onMove, listenerParams),
        (0, _useEventListener.useEventListener)(events[2], onEnd, listenerParams),
        (0, _useEventListener.useEventListener)(events[3], onEnd, listenerParams)
    ];
    /**
   * Обработчик событий dragstart
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */ var onDragStart = function(e) {
        var target = e.target;
        if (target.tagName === "A" || target.tagName === "IMG") {
            e.preventDefault();
        }
    };
    /**
   * Обработчик клика по компоненту
   * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
   */ var postGestureClick = function(e) {
        if (!didSlide.current) {
            return onClickCapture && onClickCapture(e);
        }
        if (noSlideClick) {
            e.stopPropagation();
            // https://github.com/VKCOM/VKUI/issues/1977
            // https://github.com/VKCOM/VKUI/issues/3892
            e.preventDefault();
        } else {
            onClickCapture && onClickCapture(e);
        }
        didSlide.current = false;
    };
    return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, restProps), {
        onDragStart: onDragStart,
        onClickCapture: postGestureClick,
        ref: containerRef
    }));
};
function initGesture(startX, startY) {
    return {
        startX: startX,
        startY: startY,
        startT: new Date(),
        duration: 0,
        isPressed: true,
        isY: false,
        isX: false,
        isSlideX: false,
        isSlideY: false,
        isSlide: false,
        clientX: 0,
        clientY: 0,
        shiftX: 0,
        shiftY: 0,
        shiftXAbs: 0,
        shiftYAbs: 0
    };
}

//# sourceMappingURL=Touch.js.map