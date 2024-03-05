import * as React from 'react';
import { getBoundingClientRect, getNearestOverflowAncestor, getNodeScroll } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { createAutoScrollController, getAutoScrollingData } from './autoScroll';
import { AUTO_SCROLL_START_DELAY, DATA_DRAGGABLE_PLACEHOLDER_KEY, ITEM_INITIAL_INDEX } from './constants';
import { getTargetIsOverOrUnderElData, setDraggingItemShiftStyles, setInitialDraggingItemStyles, setInitialPlaceholderItemStyles, setInitialSiblingItemStyles, setSiblingItemsShiftStyles, unsetInitialDraggingItemStyles, unsetInitialPlaceholderItemStyles, unsetInitialSiblingItemStyles } from './utils';
export const useDraggableWithDomApi = ({ elRef: draggingElRef, onDragFinish })=>{
    const [dragging, setDragging] = React.useState(false);
    const lastClientYRef = React.useRef(0);
    const lastDragShiftYRef = React.useRef(0);
    const scrollElRef = React.useRef(null);
    const lastScrollTopRef = React.useRef(0);
    const scrollControllerRef = React.useRef(null);
    const initializeScrollRefs = (draggableEl)=>{
        const node = getNearestOverflowAncestor(draggableEl);
        if (node) {
            scrollElRef.current = node;
            lastScrollTopRef.current = getNodeScroll(node).scrollTop;
            scrollControllerRef.current = createAutoScrollController(scrollElRef.current);
        }
    };
    const cleanupScrollRefs = ()=>{
        var _scrollControllerRef_current;
        lastScrollTopRef.current = 0;
        (_scrollControllerRef_current = scrollControllerRef.current) === null || _scrollControllerRef_current === void 0 ? void 0 : _scrollControllerRef_current.stop();
        scrollElRef.current = scrollControllerRef.current = null;
    };
    const lastDragDirectionRef = React.useRef(undefined);
    const toggleDragDirection = (prevShiftY, nextShiftY)=>{
        const shiftYDiff = prevShiftY - nextShiftY;
        if (shiftYDiff < 0) {
            return 'down';
        }
        if (shiftYDiff > 0) {
            return 'up';
        }
        return lastDragDirectionRef.current;
    };
    const itemStartIndexRef = React.useRef(ITEM_INITIAL_INDEX);
    const itemEndIndexRef = React.useRef(ITEM_INITIAL_INDEX);
    const draggingItemRef = React.useRef(null);
    const placeholderItemRef = React.useRef(null);
    const siblingItemsRef = React.useRef([]);
    const initializeItems = (draggingEl)=>{
        const draggingElRect = getBoundingClientRect(draggingEl, true);
        const { children } = draggingEl.parentElement || {
            children: []
        };
        Array.prototype.forEach.call(children, (el, index)=>{
            if (el === draggingEl) {
                itemStartIndexRef.current = itemEndIndexRef.current = index;
                draggingItemRef.current = {
                    index,
                    el,
                    draggingElRect
                };
            } else if (el.getAttribute(DATA_DRAGGABLE_PLACEHOLDER_KEY) !== null) {
                placeholderItemRef.current = {
                    index,
                    el,
                    draggingElRect
                };
            } else {
                siblingItemsRef.current.push({
                    index,
                    el,
                    shifted: itemStartIndexRef.current !== ITEM_INITIAL_INDEX && itemStartIndexRef.current < index,
                    draggingElRect
                }); // prettier-ignore
            }
        });
        if (placeholderItemRef.current) {
            setInitialPlaceholderItemStyles(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            setInitialDraggingItemStyles(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(setInitialSiblingItemStyles); // 2. repaint
    };
    const cleanupItems = ()=>{
        if (placeholderItemRef.current) {
            unsetInitialPlaceholderItemStyles(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            unsetInitialDraggingItemStyles(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(unsetInitialSiblingItemStyles); // 2. repaint
        siblingItemsRef.current = [];
        placeholderItemRef.current = draggingItemRef.current = null;
        const swappedItemIndexRange = {
            from: itemStartIndexRef.current,
            to: itemEndIndexRef.current
        };
        itemStartIndexRef.current = itemEndIndexRef.current = ITEM_INITIAL_INDEX;
        return swappedItemIndexRange;
    };
    const getShiftAndUnshiftItemsPreparedData = (clientY)=>{
        const shiftItemEls = [];
        const unshiftItemEls = [];
        itemEndIndexRef.current = itemStartIndexRef.current;
        siblingItemsRef.current.forEach((siblingItem)=>{
            const { isOverEl, isUnderEl } = getTargetIsOverOrUnderElData(clientY, getBoundingClientRect(siblingItem.el));
            if (itemStartIndexRef.current < siblingItem.index) {
                if (isOverEl) {
                    itemEndIndexRef.current = itemEndIndexRef.current + 1;
                    if (lastDragDirectionRef.current === 'down' && siblingItem.shifted) {
                        siblingItem.shifted = false;
                        shiftItemEls.push([
                            siblingItem,
                            'up'
                        ]);
                    }
                }
                if (isUnderEl) {
                    if (lastDragDirectionRef.current === 'up' && !siblingItem.shifted) {
                        siblingItem.shifted = true;
                        unshiftItemEls.push([
                            siblingItem,
                            'down'
                        ]);
                    }
                }
            } else if (itemStartIndexRef.current > siblingItem.index) {
                if (isUnderEl) {
                    itemEndIndexRef.current = itemEndIndexRef.current - 1;
                    if (lastDragDirectionRef.current === 'up' && !siblingItem.shifted) {
                        siblingItem.shifted = true;
                        shiftItemEls.push([
                            siblingItem,
                            'down'
                        ]);
                    }
                }
                if (isOverEl) {
                    if (lastDragDirectionRef.current === 'down' && siblingItem.shifted) {
                        siblingItem.shifted = false;
                        unshiftItemEls.push([
                            siblingItem,
                            'up'
                        ]);
                    }
                }
            }
        });
        return [
            shiftItemEls,
            unshiftItemEls
        ];
    };
    const setShiftAndUnshiftItemStyles = (shiftItemEls, unshiftItemEls)=>{
        shiftItemEls.forEach(setSiblingItemsShiftStyles);
        unshiftItemEls.forEach(setSiblingItemsShiftStyles);
    };
    const schedulingAutoScrollTimeoutIdRef = React.useRef(null);
    const clearSchedulingAutoScrollTimeout = ()=>{
        if (schedulingAutoScrollTimeoutIdRef.current) {
            clearTimeout(schedulingAutoScrollTimeoutIdRef.current);
            schedulingAutoScrollTimeoutIdRef.current = null;
        }
    };
    const tryAutoScroll = ()=>{
        if (scrollControllerRef.current) {
            scrollControllerRef.current.tryAutoScroll(()=>{
                return scrollElRef.current ? getAutoScrollingData(lastClientYRef.current, scrollElRef.current) : {
                    shouldScrolling: false,
                    y: 0
                };
            });
        }
    };
    const schedulingAutoScroll = ()=>{
        clearSchedulingAutoScrollTimeout();
        schedulingAutoScrollTimeoutIdRef.current = setTimeout(()=>{
            schedulingAutoScrollTimeoutIdRef.current = null;
            tryAutoScroll();
        }, AUTO_SCROLL_START_DELAY);
    };
    const onDragStart = (event)=>{
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    const onDragMove = (event)=>{
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        const draggingEl = draggingElRef.current;
        if (!draggingEl) {
            return;
        }
        if (dragging) {
            lastDragDirectionRef.current = toggleDragDirection(lastDragShiftYRef.current, event.shiftY);
            lastDragShiftYRef.current = event.shiftY;
            lastClientYRef.current = event.clientY;
            if (scrollControllerRef.current && scrollControllerRef.current.isRunning) {
                setDraggingItemShiftStyles(draggingEl, lastDragShiftYRef.current);
            } else {
                const [shiftItemEls, unshiftItemEls] = getShiftAndUnshiftItemsPreparedData(lastClientYRef.current);
                setDraggingItemShiftStyles(draggingEl, lastDragShiftYRef.current);
                setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
                schedulingAutoScroll();
            }
        } else {
            setDragging((prevDragging)=>{
                // На случай, если onDragMove успеет вызваться ещё раз до того, как `dragging` выставится в
                // `true`
                if (prevDragging) {
                    return prevDragging;
                }
                initializeScrollRefs(draggingEl);
                initializeItems(draggingEl);
                return true;
            });
        }
    };
    const onDragEnd = (event)=>{
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        clearSchedulingAutoScrollTimeout();
        cleanupScrollRefs();
        lastClientYRef.current = lastDragShiftYRef.current = 0;
        lastDragDirectionRef.current = undefined;
        if (dragging) {
            const swappedItemRange = cleanupItems();
            if (onDragFinish) {
                onDragFinish(swappedItemRange);
            }
            setDragging(false);
        }
    };
    const handleScroll = React.useCallback(()=>{
        if (!draggingElRef.current || !scrollElRef.current) {
            return;
        }
        const nextScrollTop = getNodeScroll(scrollElRef.current).scrollTop;
        lastDragDirectionRef.current = toggleDragDirection(lastScrollTopRef.current, nextScrollTop);
        const scrollDiff = lastScrollTopRef.current - nextScrollTop;
        const clientYWithScrollOffset = lastClientYRef.current + scrollDiff;
        lastScrollTopRef.current = nextScrollTop;
        const [shiftItemEls, unshiftItemEls] = getShiftAndUnshiftItemsPreparedData(clientYWithScrollOffset);
        setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
    }, [
        draggingElRef
    ]);
    useIsomorphicLayoutEffect(function recalculateOnScroll() {
        const scrollEl = scrollElRef.current;
        if (!dragging || !scrollEl) {
            return;
        }
        scrollEl.addEventListener('scroll', handleScroll);
        return ()=>{
            if (scrollEl) {
                scrollEl.removeEventListener('scroll', handleScroll);
            }
        };
    }, [
        dragging,
        handleScroll
    ]);
    useIsomorphicLayoutEffect(()=>function componentWillUnmount() {
            if (placeholderItemRef.current) {
                unsetInitialPlaceholderItemStyles(placeholderItemRef.current);
            }
        }, []);
    return {
        dragging,
        onDragStart,
        onDragMove,
        onDragEnd
    };
};

//# sourceMappingURL=useDraggableWithDomApi.js.map