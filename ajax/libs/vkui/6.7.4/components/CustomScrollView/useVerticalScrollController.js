import * as React from 'react';
import { useTrackerVisibility } from './useTrackerVisibility';
export const useVerticalScrollController = (boxRef, autoHideScrollbar, autoHideScrollbarDelay)=>{
    const barY = React.useRef(null);
    const verticalRatio = React.useRef(NaN);
    const lastTrackerTop = React.useRef(0);
    const clientHeight = React.useRef(0);
    const trackerHeight = React.useRef(0);
    const scrollHeight = React.useRef(0);
    const startY = React.useRef(0);
    const trackerTop = React.useRef(0);
    const trackerY = React.useRef(null);
    const { trackerVisible, onTargetScroll, onTrackerDragStart, onTrackerDragStop, onTrackerMouseEnter, onTrackerMouseLeave } = useTrackerVisibility(autoHideScrollbar, autoHideScrollbarDelay);
    const setVerticalTrackerPosition = (scrollTop)=>{
        lastTrackerTop.current = scrollTop;
        if (trackerY.current !== null) {
            trackerY.current.style.transform = `translate(0, ${scrollTop}px)`;
        }
    };
    const setTrackerPositionFromScroll = (scrollTop)=>{
        const progress = scrollTop / (scrollHeight.current - clientHeight.current);
        setVerticalTrackerPosition((clientHeight.current - trackerHeight.current) * progress);
    };
    const resize = ()=>{
        if (!boxRef.current || !barY.current || !trackerY.current) {
            return;
        }
        const localClientHeight = boxRef.current.clientHeight;
        const localScrollHeight = boxRef.current.scrollHeight;
        const localVerticalRatio = localClientHeight / localScrollHeight;
        const localTrackerHeight = Math.max(localClientHeight * localVerticalRatio, 40);
        verticalRatio.current = localVerticalRatio;
        clientHeight.current = localClientHeight;
        scrollHeight.current = localScrollHeight;
        trackerHeight.current = localTrackerHeight;
        const currentScrollTop = boxRef.current.scrollTop;
        if (localVerticalRatio >= 1) {
            barY.current.style.display = 'none';
        } else {
            barY.current.style.display = '';
            trackerY.current.style.height = `${localTrackerHeight}px`;
            setTrackerPositionFromScroll(currentScrollTop);
        }
    };
    const setScrollPositionFromTracker = (trackerTop)=>{
        const progress = trackerTop / (clientHeight.current - trackerHeight.current);
        if (boxRef.current !== null) {
            boxRef.current.scroll({
                top: (scrollHeight.current - clientHeight.current) * progress
            });
        }
    };
    const dragging = (e)=>{
        const diff = e.clientY - startY.current;
        const position = Math.min(Math.max(trackerTop.current + diff, 0), clientHeight.current - trackerHeight.current);
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
        setTrackerPositionFromScroll(boxRef.current.scrollTop);
    };
    const dragStart = (e)=>{
        startY.current = e.clientY;
        trackerTop.current = lastTrackerTop.current;
        if (autoHideScrollbar) {
            onTrackerDragStart();
        }
    };
    return {
        barRef: barY,
        trackerVisible,
        trackerRef: trackerY,
        resize,
        dragging,
        dragEnd,
        scroll,
        dragStart,
        trackerMouseEnter: onTrackerMouseEnter,
        trackerMouseLeave: onTrackerMouseLeave
    };
};

//# sourceMappingURL=useVerticalScrollController.js.map