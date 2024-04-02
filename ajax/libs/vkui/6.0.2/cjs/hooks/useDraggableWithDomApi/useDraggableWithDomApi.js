"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDraggableWithDomApi", {
    enumerable: true,
    get: function() {
        return useDraggableWithDomApi;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _autoScroll = require("./autoScroll");
const _constants = require("./constants");
const _utils = require("./utils");
const useDraggableWithDomApi = ({ elRef: draggingElRef, onDragFinish })=>{
    const [dragging, setDragging] = _react.useState(false);
    const lastClientYRef = _react.useRef(0);
    const lastDragShiftYRef = _react.useRef(0);
    const scrollElRef = _react.useRef(null);
    const lastScrollTopRef = _react.useRef(0);
    const scrollControllerRef = _react.useRef(null);
    const initializeScrollRefs = (draggableEl)=>{
        const node = (0, _dom.getNearestOverflowAncestor)(draggableEl);
        if (node) {
            scrollElRef.current = node;
            lastScrollTopRef.current = (0, _dom.getNodeScroll)(node).scrollTop;
            scrollControllerRef.current = (0, _autoScroll.createAutoScrollController)(scrollElRef.current);
        }
    };
    const cleanupScrollRefs = ()=>{
        var _scrollControllerRef_current;
        lastScrollTopRef.current = 0;
        (_scrollControllerRef_current = scrollControllerRef.current) === null || _scrollControllerRef_current === void 0 ? void 0 : _scrollControllerRef_current.stop();
        scrollElRef.current = scrollControllerRef.current = null;
    };
    const lastDragDirectionRef = _react.useRef(undefined);
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
    const itemStartIndexRef = _react.useRef(_constants.ITEM_INITIAL_INDEX);
    const itemEndIndexRef = _react.useRef(_constants.ITEM_INITIAL_INDEX);
    const draggingItemRef = _react.useRef(null);
    const placeholderItemRef = _react.useRef(null);
    const siblingItemsRef = _react.useRef([]);
    const initializeItems = (draggingEl)=>{
        const draggingElRect = (0, _dom.getBoundingClientRect)(draggingEl, true);
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
            } else if (el.getAttribute(_constants.DATA_DRAGGABLE_PLACEHOLDER_KEY) !== null) {
                placeholderItemRef.current = {
                    index,
                    el,
                    draggingElRect
                };
            } else {
                siblingItemsRef.current.push({
                    index,
                    el,
                    shifted: itemStartIndexRef.current !== _constants.ITEM_INITIAL_INDEX && itemStartIndexRef.current < index,
                    draggingElRect
                }); // prettier-ignore
            }
        });
        if (placeholderItemRef.current) {
            (0, _utils.setInitialPlaceholderItemStyles)(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            (0, _utils.setInitialDraggingItemStyles)(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(_utils.setInitialSiblingItemStyles); // 2. repaint
    };
    const cleanupItems = ()=>{
        if (placeholderItemRef.current) {
            (0, _utils.unsetInitialPlaceholderItemStyles)(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            (0, _utils.unsetInitialDraggingItemStyles)(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(_utils.unsetInitialSiblingItemStyles); // 2. repaint
        siblingItemsRef.current = [];
        placeholderItemRef.current = draggingItemRef.current = null;
        const swappedItemIndexRange = {
            from: itemStartIndexRef.current,
            to: itemEndIndexRef.current
        };
        itemStartIndexRef.current = itemEndIndexRef.current = _constants.ITEM_INITIAL_INDEX;
        return swappedItemIndexRange;
    };
    const getShiftAndUnshiftItemsPreparedData = (clientY)=>{
        const shiftItemEls = [];
        const unshiftItemEls = [];
        itemEndIndexRef.current = itemStartIndexRef.current;
        siblingItemsRef.current.forEach((siblingItem)=>{
            const { isOverEl, isUnderEl } = (0, _utils.getTargetIsOverOrUnderElData)(clientY, (0, _dom.getBoundingClientRect)(siblingItem.el));
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
        shiftItemEls.forEach(_utils.setSiblingItemsShiftStyles);
        unshiftItemEls.forEach(_utils.setSiblingItemsShiftStyles);
    };
    const schedulingAutoScrollTimeoutIdRef = _react.useRef(null);
    const clearSchedulingAutoScrollTimeout = ()=>{
        if (schedulingAutoScrollTimeoutIdRef.current) {
            clearTimeout(schedulingAutoScrollTimeoutIdRef.current);
            schedulingAutoScrollTimeoutIdRef.current = null;
        }
    };
    const tryAutoScroll = ()=>{
        if (scrollControllerRef.current) {
            scrollControllerRef.current.tryAutoScroll(()=>{
                return scrollElRef.current ? (0, _autoScroll.getAutoScrollingData)(lastClientYRef.current, scrollElRef.current) : {
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
        }, _constants.AUTO_SCROLL_START_DELAY);
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
                (0, _utils.setDraggingItemShiftStyles)(draggingEl, lastDragShiftYRef.current);
            } else {
                const [shiftItemEls, unshiftItemEls] = getShiftAndUnshiftItemsPreparedData(lastClientYRef.current);
                (0, _utils.setDraggingItemShiftStyles)(draggingEl, lastDragShiftYRef.current);
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
    const handleScroll = _react.useCallback(()=>{
        if (!draggingElRef.current || !scrollElRef.current) {
            return;
        }
        const nextScrollTop = (0, _dom.getNodeScroll)(scrollElRef.current).scrollTop;
        lastDragDirectionRef.current = toggleDragDirection(lastScrollTopRef.current, nextScrollTop);
        const scrollDiff = lastScrollTopRef.current - nextScrollTop;
        const clientYWithScrollOffset = lastClientYRef.current + scrollDiff;
        lastScrollTopRef.current = nextScrollTop;
        const [shiftItemEls, unshiftItemEls] = getShiftAndUnshiftItemsPreparedData(clientYWithScrollOffset);
        setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
    }, [
        draggingElRef
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function recalculateOnScroll() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>function componentWillUnmount() {
            if (placeholderItemRef.current) {
                (0, _utils.unsetInitialPlaceholderItemStyles)(placeholderItemRef.current);
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