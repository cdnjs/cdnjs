import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { getBoundingClientRect, getNearestOverflowAncestor, getNodeScroll } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { createAutoScrollController, getAutoScrollingData } from "./autoScroll";
import { AUTO_SCROLL_START_DELAY, DATA_DRAGGABLE_PLACEHOLDER_KEY, ITEM_INITIAL_INDEX } from "./constants";
import { getTargetIsOverOrUnderElData, setDraggingItemShiftStyles, setInitialDraggingItemStyles, setInitialPlaceholderItemStyles, setInitialSiblingItemStyles, setSiblingItemsShiftStyles, unsetInitialDraggingItemStyles, unsetInitialPlaceholderItemStyles, unsetInitialSiblingItemStyles } from "./utils";
export var useDraggableWithDomApi = function(param) {
    var draggingElRef = param.elRef, onDragFinish = param.onDragFinish;
    var _React_useState = _sliced_to_array(React.useState(false), 2), dragging = _React_useState[0], setDragging = _React_useState[1];
    var lastClientYRef = React.useRef(0);
    var lastDragShiftYRef = React.useRef(0);
    var scrollElRef = React.useRef(null);
    var lastScrollTopRef = React.useRef(0);
    var scrollControllerRef = React.useRef(null);
    var initializeScrollRefs = function(draggableEl) {
        var node = getNearestOverflowAncestor(draggableEl);
        if (node) {
            scrollElRef.current = node;
            lastScrollTopRef.current = getNodeScroll(node).scrollTop;
            scrollControllerRef.current = createAutoScrollController(scrollElRef.current);
        }
    };
    var cleanupScrollRefs = function() {
        var _scrollControllerRef_current;
        lastScrollTopRef.current = 0;
        (_scrollControllerRef_current = scrollControllerRef.current) === null || _scrollControllerRef_current === void 0 ? void 0 : _scrollControllerRef_current.stop();
        scrollElRef.current = scrollControllerRef.current = null;
    };
    var lastDragDirectionRef = React.useRef(undefined);
    var toggleDragDirection = function(prevShiftY, nextShiftY) {
        var shiftYDiff = prevShiftY - nextShiftY;
        if (shiftYDiff < 0) {
            return "down";
        }
        if (shiftYDiff > 0) {
            return "up";
        }
        return lastDragDirectionRef.current;
    };
    var itemStartIndexRef = React.useRef(ITEM_INITIAL_INDEX);
    var itemEndIndexRef = React.useRef(ITEM_INITIAL_INDEX);
    var draggingItemRef = React.useRef(null);
    var placeholderItemRef = React.useRef(null);
    var siblingItemsRef = React.useRef([]);
    var initializeItems = function(draggingEl) {
        var draggingElRect = getBoundingClientRect(draggingEl, true);
        var children = (draggingEl.parentElement || {
            children: []
        }).children;
        Array.prototype.forEach.call(children, function(el, index) {
            if (el === draggingEl) {
                itemStartIndexRef.current = itemEndIndexRef.current = index;
                draggingItemRef.current = {
                    index: index,
                    el: el,
                    draggingElRect: draggingElRect
                };
            } else if (el.getAttribute(DATA_DRAGGABLE_PLACEHOLDER_KEY) !== null) {
                placeholderItemRef.current = {
                    index: index,
                    el: el,
                    draggingElRect: draggingElRect
                };
            } else {
                siblingItemsRef.current.push({
                    index: index,
                    el: el,
                    shifted: itemStartIndexRef.current !== ITEM_INITIAL_INDEX && itemStartIndexRef.current < index,
                    draggingElRect: draggingElRect
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
    var cleanupItems = function() {
        if (placeholderItemRef.current) {
            unsetInitialPlaceholderItemStyles(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            unsetInitialDraggingItemStyles(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(unsetInitialSiblingItemStyles); // 2. repaint
        siblingItemsRef.current = [];
        placeholderItemRef.current = draggingItemRef.current = null;
        var swappedItemIndexRange = {
            from: itemStartIndexRef.current,
            to: itemEndIndexRef.current
        };
        itemStartIndexRef.current = itemEndIndexRef.current = ITEM_INITIAL_INDEX;
        return swappedItemIndexRange;
    };
    var getShiftAndUnshiftItemsPreparedData = function(clientY) {
        var shiftItemEls = [];
        var unshiftItemEls = [];
        itemEndIndexRef.current = itemStartIndexRef.current;
        siblingItemsRef.current.forEach(function(siblingItem) {
            var _getTargetIsOverOrUnderElData = getTargetIsOverOrUnderElData(clientY, getBoundingClientRect(siblingItem.el)), isOverEl = _getTargetIsOverOrUnderElData.isOverEl, isUnderEl = _getTargetIsOverOrUnderElData.isUnderEl;
            if (itemStartIndexRef.current < siblingItem.index) {
                if (isOverEl) {
                    itemEndIndexRef.current = itemEndIndexRef.current + 1;
                    if (lastDragDirectionRef.current === "down" && siblingItem.shifted) {
                        siblingItem.shifted = false;
                        shiftItemEls.push([
                            siblingItem,
                            "up"
                        ]);
                    }
                }
                if (isUnderEl) {
                    if (lastDragDirectionRef.current === "up" && !siblingItem.shifted) {
                        siblingItem.shifted = true;
                        unshiftItemEls.push([
                            siblingItem,
                            "down"
                        ]);
                    }
                }
            } else if (itemStartIndexRef.current > siblingItem.index) {
                if (isUnderEl) {
                    itemEndIndexRef.current = itemEndIndexRef.current - 1;
                    if (lastDragDirectionRef.current === "up" && !siblingItem.shifted) {
                        siblingItem.shifted = true;
                        shiftItemEls.push([
                            siblingItem,
                            "down"
                        ]);
                    }
                }
                if (isOverEl) {
                    if (lastDragDirectionRef.current === "down" && siblingItem.shifted) {
                        siblingItem.shifted = false;
                        unshiftItemEls.push([
                            siblingItem,
                            "up"
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
    var setShiftAndUnshiftItemStyles = function(shiftItemEls, unshiftItemEls) {
        shiftItemEls.forEach(setSiblingItemsShiftStyles);
        unshiftItemEls.forEach(setSiblingItemsShiftStyles);
    };
    var schedulingAutoScrollTimeoutIdRef = React.useRef(null);
    var clearSchedulingAutoScrollTimeout = function() {
        if (schedulingAutoScrollTimeoutIdRef.current) {
            clearTimeout(schedulingAutoScrollTimeoutIdRef.current);
            schedulingAutoScrollTimeoutIdRef.current = null;
        }
    };
    var tryAutoScroll = function() {
        if (scrollControllerRef.current) {
            scrollControllerRef.current.tryAutoScroll(function() {
                return scrollElRef.current ? getAutoScrollingData(lastClientYRef.current, scrollElRef.current) : {
                    shouldScrolling: false,
                    y: 0
                };
            });
        }
    };
    var schedulingAutoScroll = function() {
        clearSchedulingAutoScrollTimeout();
        schedulingAutoScrollTimeoutIdRef.current = setTimeout(function() {
            schedulingAutoScrollTimeoutIdRef.current = null;
            tryAutoScroll();
        }, AUTO_SCROLL_START_DELAY);
    };
    var onDragStart = function(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    };
    var onDragMove = function(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        var draggingEl = draggingElRef.current;
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
                var _getShiftAndUnshiftItemsPreparedData = _sliced_to_array(getShiftAndUnshiftItemsPreparedData(lastClientYRef.current), 2), shiftItemEls = _getShiftAndUnshiftItemsPreparedData[0], unshiftItemEls = _getShiftAndUnshiftItemsPreparedData[1];
                setDraggingItemShiftStyles(draggingEl, lastDragShiftYRef.current);
                setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
                schedulingAutoScroll();
            }
        } else {
            setDragging(function(prevDragging) {
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
    var onDragEnd = function(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        clearSchedulingAutoScrollTimeout();
        cleanupScrollRefs();
        lastClientYRef.current = lastDragShiftYRef.current = 0;
        lastDragDirectionRef.current = undefined;
        if (dragging) {
            var swappedItemRange = cleanupItems();
            if (onDragFinish) {
                onDragFinish(swappedItemRange);
            }
            setDragging(false);
        }
    };
    var handleScroll = React.useCallback(function() {
        if (!draggingElRef.current || !scrollElRef.current) {
            return;
        }
        var nextScrollTop = getNodeScroll(scrollElRef.current).scrollTop;
        lastDragDirectionRef.current = toggleDragDirection(lastScrollTopRef.current, nextScrollTop);
        var scrollDiff = lastScrollTopRef.current - nextScrollTop;
        var clientYWithScrollOffset = lastClientYRef.current + scrollDiff;
        lastScrollTopRef.current = nextScrollTop;
        var _getShiftAndUnshiftItemsPreparedData = _sliced_to_array(getShiftAndUnshiftItemsPreparedData(clientYWithScrollOffset), 2), shiftItemEls = _getShiftAndUnshiftItemsPreparedData[0], unshiftItemEls = _getShiftAndUnshiftItemsPreparedData[1];
        setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
    }, [
        draggingElRef
    ]);
    useIsomorphicLayoutEffect(function recalculateOnScroll() {
        var scrollEl = scrollElRef.current;
        if (!dragging || !scrollEl) {
            return;
        }
        scrollEl.addEventListener("scroll", handleScroll);
        return function() {
            if (scrollEl) {
                scrollEl.removeEventListener("scroll", handleScroll);
            }
        };
    }, [
        dragging,
        handleScroll
    ]);
    useIsomorphicLayoutEffect(function() {
        return function componentWillUnmount() {
            if (placeholderItemRef.current) {
                unsetInitialPlaceholderItemStyles(placeholderItemRef.current);
            }
        };
    }, []);
    return {
        dragging: dragging,
        onDragStart: onDragStart,
        onDragMove: onDragMove,
        onDragEnd: onDragEnd
    };
};

//# sourceMappingURL=useDraggableWithDomApi.js.map