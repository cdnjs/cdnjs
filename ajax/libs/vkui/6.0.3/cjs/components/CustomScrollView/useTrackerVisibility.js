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
const _useTimeout = require("../../hooks/useTimeout");
const useTrackerVisibility = (autoHideScrollbar = false, autoHideScrollbarDelay = 500)=>{
    const [trackerVisible, setTrackerVisible] = _react.useState(!autoHideScrollbar);
    const isMouseOver = _react.useRef(false);
    const isTrackerDragging = _react.useRef(false);
    const { set: setVisibilityTimeout, clear: clearVisibilityTimeout } = (0, _useTimeout.useTimeout)(()=>setTrackerVisible(false), autoHideScrollbarDelay);
    const onTrackerDragStart = _react.useCallback(()=>{
        clearVisibilityTimeout();
        setTrackerVisible(true);
        isTrackerDragging.current = true;
    }, [
        clearVisibilityTimeout
    ]);
    const onTrackerDragStop = _react.useCallback(()=>{
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
   */ const queueTrackerVisibility = _react.useCallback(()=>{
        if (isTrackerDragging.current) {
            return;
        }
        setTrackerVisible(true);
        setVisibilityTimeout();
    }, [
        setVisibilityTimeout
    ]);
    const onTrackerMouseEnter = _react.useCallback(()=>{
        clearVisibilityTimeout();
        isMouseOver.current = true;
        setTrackerVisible(true);
    }, [
        clearVisibilityTimeout
    ]);
    const onTrackerMouseLeave = _react.useCallback(()=>{
        queueTrackerVisibility();
        isMouseOver.current = false;
    }, [
        queueTrackerVisibility
    ]);
    const onTargetScroll = _react.useCallback(()=>{
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