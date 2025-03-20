"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useHorizontalScrollController", {
    enumerable: true,
    get: function() {
        return useHorizontalScrollController;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useTrackerVisibility = require("./useTrackerVisibility");
const useHorizontalScrollController = (boxRef, autoHideScrollbar, autoHideScrollbarDelay)=>{
    const barX = _react.useRef(null);
    const horizontalRatio = _react.useRef(NaN);
    const lastTrackerLeft = _react.useRef(0);
    const clientWidth = _react.useRef(0);
    const trackerWidth = _react.useRef(0);
    const scrollWidth = _react.useRef(0);
    const startX = _react.useRef(0);
    const trackerLeft = _react.useRef(0);
    const trackerX = _react.useRef(null);
    const { trackerVisible, onTargetScroll, onTrackerDragStart, onTrackerDragStop, onTrackerMouseEnter, onTrackerMouseLeave } = (0, _useTrackerVisibility.useTrackerVisibility)(autoHideScrollbar, autoHideScrollbarDelay);
    const setHorizontalTrackerPosition = (scrollLeft)=>{
        lastTrackerLeft.current = scrollLeft;
        if (trackerX.current !== null) {
            trackerX.current.style.transform = `translate(${scrollLeft}px, 0)`;
        }
    };
    const setTrackerPositionFromScroll = (scrollLeft)=>{
        const progress = scrollLeft / (scrollWidth.current - clientWidth.current);
        setHorizontalTrackerPosition((clientWidth.current - trackerWidth.current) * progress);
    };
    const resize = ()=>{
        if (!boxRef.current || !barX.current || !trackerX.current) {
            return;
        }
        const localClientWidth = boxRef.current.clientWidth;
        const localScrollWidth = boxRef.current.scrollWidth;
        const localVerticalRatio = localClientWidth / localScrollWidth;
        const localTrackerWidth = Math.max(localClientWidth * localVerticalRatio, 40);
        horizontalRatio.current = localVerticalRatio;
        clientWidth.current = localClientWidth;
        scrollWidth.current = localScrollWidth;
        trackerWidth.current = localTrackerWidth;
        const currentScrollLeft = boxRef.current.scrollLeft;
        if (localVerticalRatio >= 1) {
            barX.current.style.display = 'none';
        } else {
            barX.current.style.display = '';
            trackerX.current.style.width = `${localTrackerWidth}px`;
            setTrackerPositionFromScroll(currentScrollLeft);
        }
    };
    const setScrollPositionFromTracker = (trackerLeft)=>{
        const progress = trackerLeft / (clientWidth.current - trackerWidth.current);
        if (boxRef.current !== null) {
            boxRef.current.scroll({
                left: (scrollWidth.current - clientWidth.current) * progress
            });
        }
    };
    const dragging = (e)=>{
        const diff = e.clientX - startX.current;
        const position = Math.min(Math.max(trackerLeft.current + diff, 0), clientWidth.current - trackerWidth.current);
        setScrollPositionFromTracker(position);
    };
    const dragEnd = ()=>{
        if (autoHideScrollbar) {
            onTrackerDragStop();
        }
    };
    const scroll = ()=>{
        if (!boxRef.current) {
            return;
        }
        if (autoHideScrollbar) {
            onTargetScroll();
        }
        setTrackerPositionFromScroll(boxRef.current.scrollLeft);
    };
    const dragStart = (e)=>{
        startX.current = e.clientX;
        trackerLeft.current = lastTrackerLeft.current;
        if (autoHideScrollbar) {
            onTrackerDragStart();
        }
    };
    return {
        barRef: barX,
        trackerVisible,
        trackerRef: trackerX,
        resize,
        dragging,
        dragEnd,
        scroll,
        dragStart,
        trackerMouseEnter: onTrackerMouseEnter,
        trackerMouseLeave: onTrackerMouseLeave
    };
};

//# sourceMappingURL=useHorizontalScrollController.js.map