import * as React from 'react';
import { useEventListener } from '../../hooks/useEventListener';
import { useExternRef } from '../../hooks/useExternRef';
import { useDOM } from '../../lib/dom';
import { coordX, coordY, getSupportedEvents, touchEnabled } from '../../lib/touch';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
/**
 * @see https://vkcom.github.io/VKUI/#/Touch
 */ export const Touch = ({ onStart, onStartX, onStartY, onMove: _onMove, onMoveX, onMoveY, onLeave, onEnter, onEnd: _onEnd, onEndX, onEndY, onClickCapture, usePointerHover, slideThreshold = 5, useCapture = false, Component = 'div', getRootRef, noSlideClick = false, stopPropagation = false, ...restProps })=>{
    const { document } = useDOM();
    const events = React.useMemo(getSupportedEvents, []);
    const didSlide = React.useRef(false);
    const gesture = React.useRef(null);
    const handle = (e, handlers)=>{
        stopPropagation && e.stopPropagation();
        handlers.forEach((cb)=>{
            const duration = Date.now() - (gesture.current?.startT?.getTime() ?? 0);
            cb && cb({
                ...gesture.current,
                duration,
                originalEvent: e
            });
        });
    };
    const enterHandler = useEventListener(usePointerHover ? 'pointerenter' : 'mouseenter', onEnter);
    const leaveHandler = useEventListener(usePointerHover ? 'pointerleave' : 'mouseleave', onLeave);
    const startHandler = useEventListener(events[0], (e)=>{
        gesture.current = initGesture(coordX(e), coordY(e));
        handle(e, [
            onStart,
            onStartX,
            onStartY
        ]);
        // 1 line, 2 bad specs, 2 workarounds:
        subscribe(touchEnabled() ? // see: #235, #1968, https://stackoverflow.com/a/45760014
        e.target : // if pointer goes outside container.
        // Can be fixed by PointerEvents' setPointerCapture later
        document);
    }, {
        capture: useCapture,
        passive: false
    });
    const containerRef = useExternRef(getRootRef);
    useIsomorphicLayoutEffect(()=>{
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
        const { isPressed, isX, isY, startX = 0, startY = 0 } = gesture.current ?? {};
        if (isPressed) {
            const clientX = coordX(e);
            const clientY = coordY(e);
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
            if (gesture.current?.isSlide) {
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
        const { isPressed, isSlide, isSlideX, isSlideY } = gesture.current ?? {};
        if (isPressed) {
            handle(e, [
                _onEnd,
                isSlideY && onEndY,
                isSlideX && onEndX
            ]);
        }
        const isTouchEnabled = touchEnabled();
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
        useEventListener(events[1], onMove, listenerParams),
        useEventListener(events[2], onEnd, listenerParams),
        useEventListener(events[3], onEnd, listenerParams)
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
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        onDragStart: onDragStart,
        onClickCapture: postGestureClick,
        ref: containerRef
    });
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