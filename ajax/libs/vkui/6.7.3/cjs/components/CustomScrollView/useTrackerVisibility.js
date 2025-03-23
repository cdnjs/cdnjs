"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTrackerVisibility", {
    enumerable: true,
    get: function() {
        return useTrackerVisibility;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const useTrackerVisibility = (autoHideScrollbar = false, autoHideScrollbarDelay = 500)=>{
    const [visibility, setVisibility] = _react.useState(autoHideScrollbar ? 'hidden' : 'visible');
    const isMouseOver = _react.useRef(false);
    const isTrackerDragging = _react.useRef(false);
    _react.useEffect(()=>{
        setVisibility(autoHideScrollbar ? 'hidden' : 'visible');
    }, [
        autoHideScrollbar
    ]);
    const onTrackerDragStart = _react.useCallback(()=>{
        isTrackerDragging.current = true;
        setVisibility('visible');
    }, []);
    const onTrackerDragStop = _react.useCallback(()=>{
        isTrackerDragging.current = false;
        if (!isMouseOver.current) {
            setVisibility('temporary-visible');
        }
    }, []);
    const onTrackerMouseEnter = _react.useCallback(()=>{
        isMouseOver.current = true;
        setVisibility('visible');
    }, []);
    const onTrackerMouseLeave = _react.useCallback(()=>{
        isMouseOver.current = false;
        if (!isTrackerDragging.current) {
            setVisibility('temporary-visible');
        }
    }, []);
    const onTargetScroll = _react.useCallback(()=>{
        if (isMouseOver.current || isTrackerDragging.current) {
            return;
        }
        setVisibility('temporary-visible');
    }, []);
    _react.useEffect(function hideAfterDelay() {
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