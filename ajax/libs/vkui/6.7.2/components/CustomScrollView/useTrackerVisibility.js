import * as React from 'react';
/**
 * Хук, который позволяет управлять видимостью ползунка скроллбара.
 * @param autoHideScrollbar - скрывать ли ползунок скроллбара
 * @param autoHideScrollbarDelay - через какое кол-во миллисекунд ползунок скроллбара скрывается
 * @returns Объект, содержащий параметры, которые позволяют управлять видимостью ползунка
 */ export const useTrackerVisibility = (autoHideScrollbar = false, autoHideScrollbarDelay = 500)=>{
    const [visibility, setVisibility] = React.useState(autoHideScrollbar ? 'hidden' : 'visible');
    const isMouseOver = React.useRef(false);
    const isTrackerDragging = React.useRef(false);
    React.useEffect(()=>{
        setVisibility(autoHideScrollbar ? 'hidden' : 'visible');
    }, [
        autoHideScrollbar
    ]);
    const onTrackerDragStart = React.useCallback(()=>{
        isTrackerDragging.current = true;
        setVisibility('visible');
    }, []);
    const onTrackerDragStop = React.useCallback(()=>{
        isTrackerDragging.current = false;
        if (!isMouseOver.current) {
            setVisibility('temporary-visible');
        }
    }, []);
    const onTrackerMouseEnter = React.useCallback(()=>{
        isMouseOver.current = true;
        setVisibility('visible');
    }, []);
    const onTrackerMouseLeave = React.useCallback(()=>{
        isMouseOver.current = false;
        if (!isTrackerDragging.current) {
            setVisibility('temporary-visible');
        }
    }, []);
    const onTargetScroll = React.useCallback(()=>{
        if (isMouseOver.current || isTrackerDragging.current) {
            return;
        }
        setVisibility('temporary-visible');
    }, []);
    React.useEffect(function hideAfterDelay() {
        let timeoutId = null;
        if (visibility === 'temporary-visible') {
            timeoutId = setTimeout(()=>{
                setVisibility('hidden');
            }, autoHideScrollbarDelay);
        }
        return function clearHideAfterDelay() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [
        visibility,
        autoHideScrollbarDelay
    ]);
    return {
        trackerVisible: visibility !== 'hidden',
        onTrackerDragStart,
        onTrackerDragStop,
        onTrackerMouseEnter,
        onTrackerMouseLeave,
        onTargetScroll
    };
};

//# sourceMappingURL=useTrackerVisibility.js.map