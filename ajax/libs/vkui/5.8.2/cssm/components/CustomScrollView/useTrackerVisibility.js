import * as React from 'react';
import { useTimeout } from '../../hooks/useTimeout';
/**
 * Хук, который позволяет управлять видимостью ползунка скроллбара.
 * @param autoHideScrollbar - скрывать ли ползунок скроллбара
 * @param autoHideScrollbarDelay - через какое кол-во миллисекунд ползунок скроллбара скрывается
 * @returns Объект, содержащий параметры, которые позволяют управлять видимостью ползунка
 */ export const useTrackerVisibility = (autoHideScrollbar = false, autoHideScrollbarDelay = 500)=>{
    const [trackerVisible, setTrackerVisible] = React.useState(!autoHideScrollbar);
    const isMouseOver = React.useRef(false);
    const isTrackerDragging = React.useRef(false);
    const { set: setVisibilityTimeout, clear: clearVisibilityTimeout } = useTimeout(()=>setTrackerVisible(false), autoHideScrollbarDelay);
    const onTrackerDragStart = React.useCallback(()=>{
        clearVisibilityTimeout();
        setTrackerVisible(true);
        isTrackerDragging.current = true;
    }, [
        clearVisibilityTimeout
    ]);
    const onTrackerDragStop = React.useCallback(()=>{
        isTrackerDragging.current = false;
        if (!isMouseOver.current) {
            setVisibilityTimeout();
        }
    }, [
        setVisibilityTimeout,
        isMouseOver
    ]);
    /**
   * Позволяет "запланировать" скрытие ползунка через delay миллисекунд. Если тайм-аут не успевает сработать, то каждый
   * последующий вызов функции откладывает скрытие ползунка на delay миллисекунд
   */ const queueTrackerVisibility = React.useCallback(()=>{
        if (isTrackerDragging.current) {
            return;
        }
        setTrackerVisible(true);
        setVisibilityTimeout();
    }, [
        setVisibilityTimeout
    ]);
    const onTrackerMouseEnter = React.useCallback(()=>{
        clearVisibilityTimeout();
        isMouseOver.current = true;
        setTrackerVisible(true);
    }, [
        clearVisibilityTimeout
    ]);
    const onTrackerMouseLeave = React.useCallback(()=>{
        queueTrackerVisibility();
        isMouseOver.current = false;
    }, [
        queueTrackerVisibility
    ]);
    const onTargetScroll = React.useCallback(()=>{
        queueTrackerVisibility();
    }, [
        queueTrackerVisibility
    ]);
    return {
        trackerVisible,
        onTrackerDragStart,
        onTrackerDragStop,
        onTrackerMouseEnter,
        onTrackerMouseLeave,
        onTargetScroll
    };
};

//# sourceMappingURL=useTrackerVisibility.js.map