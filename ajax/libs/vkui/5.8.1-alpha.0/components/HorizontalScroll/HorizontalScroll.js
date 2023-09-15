import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { useEventListener } from "../../hooks/useEventListener";
import { useExternRef } from "../../hooks/useExternRef";
import { easeInOutSine } from "../../lib/fx";
import { RootComponent } from "../RootComponent/RootComponent";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow";
/**
 * timing method
 */ function now() {
    return performance && performance.now ? performance.now() : Date.now();
}
/**
 * Округляем el.scrollLeft
 * https://github.com/VKCOM/VKUI/pull/2445
 */ var roundUpElementScrollLeft = function(el) {
    return Math.ceil(el.scrollLeft);
};
/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */ var SCROLL_ONE_FRAME_TIME = 250;
function doScroll(param) {
    var scrollElement = param.scrollElement, getScrollPosition = param.getScrollPosition, animationQueue = param.animationQueue, onScrollToRightBorder = param.onScrollToRightBorder, onScrollEnd = param.onScrollEnd, onScrollStart = param.onScrollStart, initialScrollWidth = param.initialScrollWidth, _param_scrollAnimationDuration = param.scrollAnimationDuration, scrollAnimationDuration = _param_scrollAnimationDuration === void 0 ? SCROLL_ONE_FRAME_TIME : _param_scrollAnimationDuration;
    if (!scrollElement || !getScrollPosition) {
        return;
    }
    /**
   * максимальное значение сдвига влево
   */ var maxLeft = initialScrollWidth - scrollElement.offsetWidth;
    var startLeft = roundUpElementScrollLeft(scrollElement);
    var endLeft = getScrollPosition(startLeft);
    onScrollStart();
    if (endLeft >= maxLeft) {
        onScrollToRightBorder();
        endLeft = maxLeft;
    }
    var startTime = now();
    (function scroll() {
        if (!scrollElement) {
            onScrollEnd();
            return;
        }
        var time = now();
        var elapsed = Math.min((time - startTime) / scrollAnimationDuration, 1);
        var value = easeInOutSine(elapsed);
        var currentLeft = startLeft + (endLeft - startLeft) * value;
        scrollElement.scrollLeft = Math.ceil(currentLeft);
        if (roundUpElementScrollLeft(scrollElement) !== Math.max(0, endLeft) && elapsed !== 1) {
            requestAnimationFrame(scroll);
            return;
        }
        onScrollEnd();
        animationQueue.shift();
        if (animationQueue.length > 0) {
            animationQueue[0]();
        }
    })();
}
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalScroll
 */ export var HorizontalScroll = function(_param) {
    var children = _param.children, getScrollToLeft = _param.getScrollToLeft, getScrollToRight = _param.getScrollToRight, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_arrowSize = _param.arrowSize, arrowSize = _param_arrowSize === void 0 ? "l" : _param_arrowSize, arrowOffsetY = _param.arrowOffsetY, _param_scrollAnimationDuration = _param.scrollAnimationDuration, scrollAnimationDuration = _param_scrollAnimationDuration === void 0 ? SCROLL_ONE_FRAME_TIME : _param_scrollAnimationDuration, getRef = _param.getRef, _param_scrollOnAnyWheel = _param.scrollOnAnyWheel, scrollOnAnyWheel = _param_scrollOnAnyWheel === void 0 ? false : _param_scrollOnAnyWheel, restProps = _object_without_properties(_param, [
        "children",
        "getScrollToLeft",
        "getScrollToRight",
        "showArrows",
        "arrowSize",
        "arrowOffsetY",
        "scrollAnimationDuration",
        "getRef",
        "scrollOnAnyWheel"
    ]);
    var _React_useState = _sliced_to_array(React.useState(false), 2), canScrollLeft = _React_useState[0], setCanScrollLeft = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), canScrollRight = _React_useState1[0], setCanScrollRight = _React_useState1[1];
    var isCustomScrollingRef = React.useRef(false);
    var scrollerRef = useExternRef(getRef);
    var animationQueue = React.useRef([]);
    var hasPointer = useAdaptivityHasPointer();
    var scrollTo = React.useCallback(function(getScrollPosition) {
        var scrollElement = scrollerRef.current;
        animationQueue.current.push(function() {
            var _scrollElement_firstElementChild, _scrollElement;
            return doScroll({
                scrollElement: scrollElement,
                getScrollPosition: getScrollPosition,
                animationQueue: animationQueue.current,
                onScrollToRightBorder: function() {
                    return setCanScrollRight(false);
                },
                onScrollEnd: function() {
                    return isCustomScrollingRef.current = false;
                },
                onScrollStart: function() {
                    return isCustomScrollingRef.current = true;
                },
                initialScrollWidth: ((_scrollElement = scrollElement) === null || _scrollElement === void 0 ? void 0 : (_scrollElement_firstElementChild = _scrollElement.firstElementChild) === null || _scrollElement_firstElementChild === void 0 ? void 0 : _scrollElement_firstElementChild.scrollWidth) || 0,
                scrollAnimationDuration: scrollAnimationDuration
            });
        });
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }, [
        scrollAnimationDuration,
        scrollerRef
    ]);
    var scrollToLeft = React.useCallback(function() {
        var getScrollPosition = getScrollToLeft !== null && getScrollToLeft !== void 0 ? getScrollToLeft : function(i) {
            return i - scrollerRef.current.offsetWidth;
        };
        scrollTo(getScrollPosition);
    }, [
        getScrollToLeft,
        scrollTo,
        scrollerRef
    ]);
    var scrollToRight = React.useCallback(function() {
        var getScrollPosition = getScrollToRight !== null && getScrollToRight !== void 0 ? getScrollToRight : function(i) {
            return i + scrollerRef.current.offsetWidth;
        };
        scrollTo(getScrollPosition);
    }, [
        getScrollToRight,
        scrollTo,
        scrollerRef
    ]);
    var calculateArrowsVisibility = React.useCallback(function() {
        if (showArrows && hasPointer && scrollerRef.current && !isCustomScrollingRef.current) {
            var scrollElement = scrollerRef.current;
            setCanScrollLeft(scrollElement.scrollLeft > 0);
            setCanScrollRight(roundUpElementScrollLeft(scrollElement) + scrollElement.offsetWidth < scrollElement.scrollWidth);
        }
    }, [
        hasPointer,
        scrollerRef,
        showArrows
    ]);
    var scrollEvent = useEventListener("scroll", calculateArrowsVisibility);
    React.useEffect(function addScrollerRefToScrollEvent() {
        if (!scrollerRef.current) {
            return noop;
        }
        scrollEvent.add(scrollerRef.current);
        return scrollEvent.remove;
    }, [
        scrollEvent,
        scrollerRef
    ]);
    React.useEffect(calculateArrowsVisibility, [
        calculateArrowsVisibility,
        children
    ]);
    /**
   * Прокрутка с помощью любого колеса мыши
   */ var onwheel = React.useCallback(function(e) {
        scrollerRef.current.scrollBy({
            left: e.deltaX + e.deltaY,
            behavior: "auto"
        });
        e.preventDefault();
    }, [
        scrollerRef
    ]);
    var wheelEvent = useEventListener("wheel", onwheel);
    React.useEffect(function addScrollerRefToWheelEvent() {
        if (!scrollerRef.current || !scrollOnAnyWheel) {
            return noop;
        }
        wheelEvent.add(scrollerRef.current);
        return wheelEvent.remove;
    }, [
        wheelEvent,
        scrollerRef,
        scrollOnAnyWheel
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiHorizontalScroll", "vkuiInternalHorizontalScroll", showArrows === "always" && "vkuiHorizontalScroll--withConstArrows"),
        onMouseEnter: calculateArrowsVisibility
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollLeft && /*#__PURE__*/ React.createElement(ScrollArrow, {
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "left",
        className: classNames("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowLeft"),
        onClick: scrollToLeft
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/ React.createElement(ScrollArrow, {
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "right",
        className: classNames("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowRight"),
        onClick: scrollToRight
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHorizontalScroll__in",
        ref: scrollerRef
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHorizontalScroll__in-wrapper"
    }, children)));
};

//# sourceMappingURL=HorizontalScroll.js.map