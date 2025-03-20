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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useStableCallback = require("../../hooks/useStableCallback");
const _dom = require("../../lib/dom");
const _touch = require("../../lib/touch");
const Touch = (_param)=>{
    var { onStart, onStartX, onStartY, onMove, onMoveX, onMoveY, onEnter, onLeave, onEnd, onEndX, onEndY, onClickCapture, usePointerHover, slideThreshold = 5, useCapture = false, Component = 'div', getRootRef, noSlideClick = false, stopPropagation = false } = _param, restProps = _object_without_properties._(_param, [
        "onStart",
        "onStartX",
        "onStartY",
        "onMove",
        "onMoveX",
        "onMoveY",
        "onEnter",
        "onLeave",
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
    const [isTouchEnabled] = _react.useState(_touch.touchEnabled);
    const gestureRef = _react.useRef(null);
    const didSlide = _react.useRef(false);
    const disposeTargetNativeGestureEvents = _react.useRef(null);
    const cleanupTargetNativeGestureEvents = ()=>{
        gestureRef.current = null;
        if (disposeTargetNativeGestureEvents.current) {
            disposeTargetNativeGestureEvents.current();
            disposeTargetNativeGestureEvents.current = null;
        }
    };
    _react.useEffect(()=>cleanupTargetNativeGestureEvents, []);
    /**
   * Note: используем `useStableCallback()`, чтобы не терялась область видимости `onEnd`/`onEndX`/`onEndY`.
   */ const handleNativePointerUp = (0, _useStableCallback.useStableCallback)((event)=>{
        const gesture = gestureRef.current;
        /* istanbul ignore if: нужно для Typescript */ if (!gesture) {
            return;
        }
        if (gesture.isPressed) {
            dispatchUserHandlers(event, gesture, [
                onEnd,
                onEndX,
                onEndY
            ], stopPropagation);
        }
        if (isTouchEnabled) {
            // https://github.com/VKCOM/VKUI/issues/4414
            // если тач-устройство и был зафиксирован touchmove,
            // то событие клика не вызывается
            if (gesture.isSlide) {
                didSlide.current = false;
            }
            // Если это был тач-евент, симулируем отмену hover
            if (onLeave) {
                onLeave(event);
            }
        } else {
            didSlide.current = Boolean(gesture.isSlide);
        }
        cleanupTargetNativeGestureEvents();
    });
    /**
   * Note: используем `useStableCallback()`, чтобы не терялась область видимости `onMove`/`onMoveX`/`onMoveY`.
   */ const handleNativePointerMove = (0, _useStableCallback.useStableCallback)((event)=>{
        const gesture = gestureRef.current;
        /* istanbul ignore if: нужно для Typescript */ if (!gesture) {
            return;
        }
        const clientX = (0, _touch.coordX)(event);
        const clientY = (0, _touch.coordY)(event);
        // смещения
        const shiftX = clientX - gesture.startX;
        const shiftY = clientY - gesture.startY;
        // абсолютные значения смещений
        const shiftXAbs = Math.abs(shiftX);
        const shiftYAbs = Math.abs(shiftY);
        // Если определяем мультитач, то прерываем жест
        if ('touches' in event && event.touches.length > 1) {
            return handleNativePointerUp(event);
        }
        // если мы ещё не определились
        if (!gesture.isX && !gesture.isY) {
            const willBeX = shiftXAbs >= slideThreshold && shiftXAbs > shiftYAbs;
            const willBeY = shiftYAbs >= slideThreshold && shiftYAbs > shiftXAbs;
            const willBeSlidedX = willBeX && (!!onMoveX || !!onMove);
            const willBeSlidedY = willBeY && (!!onMoveY || !!onMove);
            gesture.isY = willBeY;
            gesture.isX = willBeX;
            gesture.isSlideX = willBeSlidedX;
            gesture.isSlideY = willBeSlidedY;
            gesture.isSlide = willBeSlidedX || willBeSlidedY;
        }
        if (gesture.isSlide) {
            gesture.clientX = clientX;
            gesture.clientY = clientY;
            gesture.shiftX = shiftX;
            gesture.shiftY = shiftY;
            gesture.shiftXAbs = shiftXAbs;
            gesture.shiftYAbs = shiftYAbs;
            dispatchUserHandlers(event, gesture, [
                onMove,
                onMoveX,
                onMoveY
            ], stopPropagation);
        }
    });
    const handlePointerDown = (event)=>{
        const nativeEvent = event.nativeEvent;
        gestureRef.current = initGesture((0, _touch.coordX)(nativeEvent), (0, _touch.coordY)(nativeEvent));
        const shouldCallDirectionHandlerOnlyIsSlide = false;
        dispatchUserHandlers(event, gestureRef.current, [
            onStart,
            onStartX,
            onStartY
        ], stopPropagation, shouldCallDirectionHandlerOnlyIsSlide);
        const eventOptions = {
            capture: useCapture,
            passive: false
        };
        // FIXME: заменить touch/mouse-события ниже на pointer-события после того, как бразуеры из
        // .browserslistrc начнут поддерживать его (см. https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#browser_compatibility).
        if (isTouchEnabled) {
            if ((0, _dom.isHTMLElement)(event.target)) {
                // Тач-события не всплывают, поэтому навешиваем события на целевой элемент
                // см. #235, #1968, https://stackoverflow.com/a/45760014
                const target = event.target;
                target.addEventListener('touchmove', handleNativePointerMove, eventOptions);
                target.addEventListener('touchend', handleNativePointerUp, eventOptions);
                target.addEventListener('touchcancel', handleNativePointerUp, eventOptions);
                disposeTargetNativeGestureEvents.current = ()=>{
                    target.removeEventListener('touchmove', handleNativePointerMove, eventOptions);
                    target.removeEventListener('touchend', handleNativePointerUp, eventOptions);
                    target.removeEventListener('touchcancel', handleNativePointerUp, eventOptions);
                };
            }
        } else {
            // Используем события на Document, т.к. mouse-события на целевом элементе могут теряться при
            // выходе за границы этого элемента.
            const doc = (0, _dom.getWindow)(event.currentTarget).document;
            doc.addEventListener('mousemove', handleNativePointerMove, eventOptions);
            doc.addEventListener('mouseup', handleNativePointerUp, eventOptions);
            doc.addEventListener('mouseleave', handleNativePointerUp, eventOptions);
            disposeTargetNativeGestureEvents.current = ()=>{
                doc.removeEventListener('mousemove', handleNativePointerMove, eventOptions);
                doc.removeEventListener('mouseup', handleNativePointerUp, eventOptions);
                doc.removeEventListener('mouseleave', handleNativePointerUp, eventOptions);
            };
        }
    };
    const handlePointerEnter = onEnter ? (event)=>onEnter(event.nativeEvent) : undefined;
    const handlePointerLeave = onLeave ? (event)=>onLeave(event.nativeEvent) : undefined;
    /**
   * Отменяет нативное браузерное поведение для вложенных ссылок и изображений
   */ const handleDragStart = (event)=>{
        const target = event.target;
        if (target.tagName === 'A' || target.tagName === 'IMG') {
            event.preventDefault();
        }
    };
    /**
   * Отменяет переход по вложенной ссылке, если был зафиксирован свайп
   */ const handleClickCapture = (event)=>{
        if (!didSlide.current) {
            return onClickCapture && onClickCapture(event);
        }
        if (noSlideClick) {
            event.stopPropagation();
            // https://github.com/VKCOM/VKUI/issues/1977
            // https://github.com/VKCOM/VKUI/issues/3892
            event.preventDefault();
        } else {
            onClickCapture && onClickCapture(event);
        }
        didSlide.current = false;
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRootRef,
        onDragStart: handleDragStart,
        onClickCapture: handleClickCapture,
        // onEnter
        onPointerEnter: usePointerHover ? handlePointerEnter : undefined,
        onMouseEnter: !usePointerHover ? handlePointerEnter : undefined,
        // onLeave
        onPointerLeave: usePointerHover ? handlePointerLeave : undefined,
        onMouseLeave: !usePointerHover ? handlePointerLeave : undefined,
        // handlePointerDown
        onTouchStartCapture: isTouchEnabled && useCapture ? handlePointerDown : undefined,
        onTouchStart: isTouchEnabled && !useCapture ? handlePointerDown : undefined,
        onMouseDownCapture: !isTouchEnabled && useCapture ? handlePointerDown : undefined,
        onMouseDown: !isTouchEnabled && !useCapture ? handlePointerDown : undefined
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
function dispatchUserHandlers(event, gesture, [handler, handlerX, handlerY], stopPropagation, shouldCallDirectionHandlerOnlyIsSlide = true) {
    if (stopPropagation) {
        event.stopPropagation();
    }
    const data = _object_spread_props._(_object_spread._({}, gesture), {
        originalEvent: event,
        duration: Date.now() - gesture.startT.getTime()
    });
    if (handler) {
        handler(data);
    }
    if (handlerX) {
        if (shouldCallDirectionHandlerOnlyIsSlide) {
            if (gesture.isSlideX) {
                handlerX(data);
            }
        } else {
            handlerX(data);
        }
    }
    if (handlerY) {
        if (shouldCallDirectionHandlerOnlyIsSlide) {
            if (gesture.isSlideY) {
                handlerY(data);
            }
        } else {
            handlerY(data);
        }
    }
}

//# sourceMappingURL=Touch.js.map