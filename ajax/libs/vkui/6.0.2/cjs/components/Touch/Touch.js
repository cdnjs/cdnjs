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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useEventListener = require("../../hooks/useEventListener");
const _useExternRef = require("../../hooks/useExternRef");
const _dom = require("../../lib/dom");
const _touch = require("../../lib/touch");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const Touch = (_param)=>{
    var { onStart, onStartX, onStartY, onMove: _onMove, onMoveX, onMoveY, onLeave, onEnter, onEnd: _onEnd, onEndX, onEndY, onClickCapture, usePointerHover, slideThreshold = 5, useCapture = false, Component = 'div', getRootRef, noSlideClick = false, stopPropagation = false } = _param, restProps = _object_without_properties._(_param, [
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
    const { document } = (0, _dom.useDOM)();
    const events = _react.useMemo(_touch.getSupportedEvents, []);
    const didSlide = _react.useRef(false);
    const gesture = _react.useRef(null);
    const handle = (e, handlers)=>{
        stopPropagation && e.stopPropagation();
        handlers.forEach((cb)=>{
            var _gesture_current_startT, _gesture_current;
            var _gesture_current_startT_getTime;
            const duration = Date.now() - ((_gesture_current_startT_getTime = (_gesture_current = gesture.current) === null || _gesture_current === void 0 ? void 0 : (_gesture_current_startT = _gesture_current.startT) === null || _gesture_current_startT === void 0 ? void 0 : _gesture_current_startT.getTime()) !== null && _gesture_current_startT_getTime !== void 0 ? _gesture_current_startT_getTime : 0);
            cb && cb(_object_spread_props._(_object_spread._({}, gesture.current), {
                duration,
                originalEvent: e
            }));
        });
    };
    const enterHandler = (0, _useEventListener.useEventListener)(usePointerHover ? 'pointerenter' : 'mouseenter', onEnter);
    const leaveHandler = (0, _useEventListener.useEventListener)(usePointerHover ? 'pointerleave' : 'mouseleave', onLeave);
    const startHandler = (0, _useEventListener.useEventListener)(events[0], (e)=>{
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
    const containerRef = (0, _useExternRef.useExternRef)(getRootRef);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        const el = containerRef.current;
        if (el) {
            enterHandler.add(el);
            leaveHandler.add(el);
            startHandler.add(el);
        }
    }, [
        Component
    ]);
    function onMove(e) {
        var _gesture_current;
        const { isPressed, isX, isY, startX = 0, startY = 0 } = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {};
        if (isPressed) {
            var _gesture_current1;
            const clientX = (0, _touch.coordX)(e);
            const clientY = (0, _touch.coordY)(e);
            // смещения
            const shiftX = clientX - startX;
            const shiftY = clientY - startY;
            // абсолютные значения смещений
            const shiftXAbs = Math.abs(shiftX);
            const shiftYAbs = Math.abs(shiftY);
            // Если определяем мультитач, то прерываем жест
            if (!!e.touches && e.touches.length > 1) {
                return onEnd(e);
            }
            // если мы ещё не определились
            if (!isX && !isY) {
                const willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
                const willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
                const willBeSlidedX = willBeX && (!!onMoveX || !!_onMove);
                const willBeSlidedY = willBeY && (!!onMoveY || !!_onMove);
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
                    clientX,
                    clientY,
                    shiftX,
                    shiftY,
                    shiftXAbs,
                    shiftYAbs
                });
                handle(e, [
                    _onMove,
                    gesture.current.isSlideX && onMoveX,
                    gesture.current.isSlideY && onMoveY
                ]);
            }
        }
    }
    function onEnd(e) {
        var _gesture_current;
        const { isPressed, isSlide, isSlideX, isSlideY } = (_gesture_current = gesture.current) !== null && _gesture_current !== void 0 ? _gesture_current : {};
        if (isPressed) {
            handle(e, [
                _onEnd,
                isSlideY && onEndY,
                isSlideX && onEndX
            ]);
        }
        const isTouchEnabled = (0, _touch.touchEnabled)();
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
    }
    const listenerParams = {
        capture: useCapture,
        passive: false
    };
    const listeners = [
        (0, _useEventListener.useEventListener)(events[1], onMove, listenerParams),
        (0, _useEventListener.useEventListener)(events[2], onEnd, listenerParams),
        (0, _useEventListener.useEventListener)(events[3], onEnd, listenerParams)
    ];
    function subscribe(el) {
        if (el) {
            listeners.forEach((l)=>l.add(el));
        }
    }
    function unsubscribe() {
        listeners.forEach((l)=>l.remove());
    }
    /**
   * Обработчик событий dragstart
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */ const onDragStart = (e)=>{
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'IMG') {
            e.preventDefault();
        }
    };
    /**
   * Обработчик клика по компоненту
   * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
   */ const postGestureClick = (e)=>{
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
        startX,
        startY,
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