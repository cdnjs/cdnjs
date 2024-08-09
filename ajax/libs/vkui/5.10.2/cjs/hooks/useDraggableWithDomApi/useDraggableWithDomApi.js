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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../../lib/dom");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _autoScroll = require("./autoScroll");
var _constants = require("./constants");
var _utils = require("./utils");
var useDraggableWithDomApi = function(param) {
    var draggingElRef = param.elRef, onDragFinish = param.onDragFinish;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), dragging = _React_useState[0], setDragging = _React_useState[1];
    var lastClientYRef = _react.useRef(0);
    var lastDragShiftYRef = _react.useRef(0);
    var scrollElRef = _react.useRef(null);
    var lastScrollTopRef = _react.useRef(0);
    var scrollControllerRef = _react.useRef(null);
    var initializeScrollRefs = function(draggableEl) {
        var node = (0, _dom.getNearestOverflowAncestor)(draggableEl);
        if (node) {
            scrollElRef.current = node;
            lastScrollTopRef.current = (0, _dom.getNodeScroll)(node).scrollTop;
            scrollControllerRef.current = (0, _autoScroll.createAutoScrollController)(scrollElRef.current);
        }
    };
    var cleanupScrollRefs = function() {
        var _scrollControllerRef_current;
        lastScrollTopRef.current = 0;
        (_scrollControllerRef_current = scrollControllerRef.current) === null || _scrollControllerRef_current === void 0 ? void 0 : _scrollControllerRef_current.stop();
        scrollElRef.current = scrollControllerRef.current = null;
    };
    var lastDragDirectionRef = _react.useRef(undefined);
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
    var itemStartIndexRef = _react.useRef(_constants.ITEM_INITIAL_INDEX);
    var itemEndIndexRef = _react.useRef(_constants.ITEM_INITIAL_INDEX);
    var draggingItemRef = _react.useRef(null);
    var placeholderItemRef = _react.useRef(null);
    var siblingItemsRef = _react.useRef([]);
    var initializeItems = function(draggingEl) {
        var draggingElRect = (0, _dom.getBoundingClientRect)(draggingEl, true);
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
            } else if (el.getAttribute(_constants.DATA_DRAGGABLE_PLACEHOLDER_KEY) !== null) {
                placeholderItemRef.current = {
                    index: index,
                    el: el,
                    draggingElRect: draggingElRect
                };
            } else {
                siblingItemsRef.current.push({
                    index: index,
                    el: el,
                    shifted: itemStartIndexRef.current !== _constants.ITEM_INITIAL_INDEX && itemStartIndexRef.current < index,
                    draggingElRect: draggingElRect
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
    var cleanupItems = function() {
        if (placeholderItemRef.current) {
            (0, _utils.unsetInitialPlaceholderItemStyles)(placeholderItemRef.current); // 1. reflow
        }
        if (draggingItemRef.current) {
            (0, _utils.unsetInitialDraggingItemStyles)(draggingItemRef.current); // 2. repaint
        }
        siblingItemsRef.current.forEach(_utils.unsetInitialSiblingItemStyles); // 2. repaint
        siblingItemsRef.current = [];
        placeholderItemRef.current = draggingItemRef.current = null;
        var swappedItemIndexRange = {
            from: itemStartIndexRef.current,
            to: itemEndIndexRef.current
        };
        itemStartIndexRef.current = itemEndIndexRef.current = _constants.ITEM_INITIAL_INDEX;
        return swappedItemIndexRange;
    };
    var getShiftAndUnshiftItemsPreparedData = function(clientY) {
        var shiftItemEls = [];
        var unshiftItemEls = [];
        itemEndIndexRef.current = itemStartIndexRef.current;
        siblingItemsRef.current.forEach(function(siblingItem) {
            var _getTargetIsOverOrUnderElData = (0, _utils.getTargetIsOverOrUnderElData)(clientY, (0, _dom.getBoundingClientRect)(siblingItem.el)), isOverEl = _getTargetIsOverOrUnderElData.isOverEl, isUnderEl = _getTargetIsOverOrUnderElData.isUnderEl;
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
        shiftItemEls.forEach(_utils.setSiblingItemsShiftStyles);
        unshiftItemEls.forEach(_utils.setSiblingItemsShiftStyles);
    };
    var schedulingAutoScrollTimeoutIdRef = _react.useRef(null);
    var clearSchedulingAutoScrollTimeout = function() {
        if (schedulingAutoScrollTimeoutIdRef.current) {
            clearTimeout(schedulingAutoScrollTimeoutIdRef.current);
            schedulingAutoScrollTimeoutIdRef.current = null;
        }
    };
    var tryAutoScroll = function() {
        if (scrollControllerRef.current) {
            scrollControllerRef.current.tryAutoScroll(function() {
                return scrollElRef.current ? (0, _autoScroll.getAutoScrollingData)(lastClientYRef.current, scrollElRef.current) : {
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
        }, _constants.AUTO_SCROLL_START_DELAY);
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
                (0, _utils.setDraggingItemShiftStyles)(draggingEl, lastDragShiftYRef.current);
            } else {
                var _getShiftAndUnshiftItemsPreparedData = _sliced_to_array._(getShiftAndUnshiftItemsPreparedData(lastClientYRef.current), 2), shiftItemEls = _getShiftAndUnshiftItemsPreparedData[0], unshiftItemEls = _getShiftAndUnshiftItemsPreparedData[1];
                (0, _utils.setDraggingItemShiftStyles)(draggingEl, lastDragShiftYRef.current);
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
    var handleScroll = _react.useCallback(function() {
        if (!draggingElRef.current || !scrollElRef.current) {
            return;
        }
        var nextScrollTop = (0, _dom.getNodeScroll)(scrollElRef.current).scrollTop;
        lastDragDirectionRef.current = toggleDragDirection(lastScrollTopRef.current, nextScrollTop);
        var scrollDiff = lastScrollTopRef.current - nextScrollTop;
        var clientYWithScrollOffset = lastClientYRef.current + scrollDiff;
        lastScrollTopRef.current = nextScrollTop;
        var _getShiftAndUnshiftItemsPreparedData = _sliced_to_array._(getShiftAndUnshiftItemsPreparedData(clientYWithScrollOffset), 2), shiftItemEls = _getShiftAndUnshiftItemsPreparedData[0], unshiftItemEls = _getShiftAndUnshiftItemsPreparedData[1];
        setShiftAndUnshiftItemStyles(shiftItemEls, unshiftItemEls);
    }, [
        draggingElRef
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function recalculateOnScroll() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        return function componentWillUnmount() {
            if (placeholderItemRef.current) {
                (0, _utils.unsetInitialPlaceholderItemStyles)(placeholderItemRef.current);
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