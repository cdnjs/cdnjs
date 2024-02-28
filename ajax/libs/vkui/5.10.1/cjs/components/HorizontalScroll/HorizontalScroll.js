"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HorizontalScroll", {
    enumerable: true,
    get: function() {
        return HorizontalScroll;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _useDirection = require("../../hooks/useDirection");
var _useEventListener = require("../../hooks/useEventListener");
var _useExternRef = require("../../hooks/useExternRef");
var _fx = require("../../lib/fx");
var _RootComponent = require("../RootComponent/RootComponent");
var _ScrollArrow = require("../ScrollArrow/ScrollArrow");
/**
 * timing method
 */ function now() {
    return performance && performance.now ? performance.now() : Date.now();
}
/**
 * Округление к большему по модулю
 *
 * ## Пример
 *
 * ```ts
 * import { strict as assert } from 'node:assert';
 *
 * assert.equal(roundingAwayFromZero(5.1), 6)
 * assert.equal(roundingAwayFromZero(-5.1), -6)
 * ```
 */ function roundingAwayFromZero(value) {
    return value > 0 ? Math.ceil(value) : Math.floor(value);
}
/**
 * Округляем el.scrollLeft
 * https://github.com/VKCOM/VKUI/pull/2445
 */ var roundUpElementScrollLeft = function(el) {
    return roundingAwayFromZero(el.scrollLeft);
};
/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */ var SCROLL_ONE_FRAME_TIME = 250;
function doScroll(param) {
    var scrollElement = param.scrollElement, getScrollPosition = param.getScrollPosition, animationQueue = param.animationQueue, onScrollToEndBorder = param.onScrollToEndBorder, onScrollEnd = param.onScrollEnd, onScrollStart = param.onScrollStart, initialScrollWidth = param.initialScrollWidth, _param_scrollAnimationDuration = param.scrollAnimationDuration, scrollAnimationDuration = _param_scrollAnimationDuration === void 0 ? SCROLL_ONE_FRAME_TIME : _param_scrollAnimationDuration, textDirection = param.textDirection;
    if (!scrollElement || !getScrollPosition) {
        return;
    }
    /**
   * крайнее значение сдвига
   */ var extremeScrollLeft = (textDirection === "ltr" ? 1 : -1) * (initialScrollWidth - scrollElement.offsetWidth);
    var startScrollLeft = roundUpElementScrollLeft(scrollElement);
    var endScrollLeft = getScrollPosition(startScrollLeft);
    onScrollStart();
    /**
   * Если окончание прокрутки вышло за ноль
   */ if (startScrollLeft * endScrollLeft < 0) {
        endScrollLeft = 0;
    }
    if (Math.abs(endScrollLeft) >= Math.abs(extremeScrollLeft)) {
        onScrollToEndBorder();
        endScrollLeft = extremeScrollLeft;
    }
    var startTime = now();
    (function scroll() {
        if (!scrollElement) {
            onScrollEnd();
            return;
        }
        var time = now();
        var elapsed = Math.min((time - startTime) / scrollAnimationDuration, 1);
        var value = (0, _fx.easeInOutSine)(elapsed);
        var currentScrollLeft = startScrollLeft + (endScrollLeft - startScrollLeft) * value;
        scrollElement.scrollLeft = roundingAwayFromZero(currentScrollLeft);
        var scrollEnd = textDirection === "ltr" ? Math.max(0, endScrollLeft) : Math.min(0, endScrollLeft);
        if (roundUpElementScrollLeft(scrollElement) !== scrollEnd && elapsed !== 1) {
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
var HorizontalScroll = function(_param) {
    var children = _param.children, getScrollToLeft = _param.getScrollToLeft, getScrollToRight = _param.getScrollToRight, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_arrowSize = _param.arrowSize, arrowSize = _param_arrowSize === void 0 ? "l" : _param_arrowSize, arrowOffsetY = _param.arrowOffsetY, _param_scrollAnimationDuration = _param.scrollAnimationDuration, scrollAnimationDuration = _param_scrollAnimationDuration === void 0 ? SCROLL_ONE_FRAME_TIME : _param_scrollAnimationDuration, getRef = _param.getRef, _param_scrollOnAnyWheel = _param.scrollOnAnyWheel, scrollOnAnyWheel = _param_scrollOnAnyWheel === void 0 ? false : _param_scrollOnAnyWheel, restProps = _object_without_properties._(_param, [
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
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), canScrollLeft = _React_useState[0], setCanScrollLeft = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(false), 2), canScrollRight = _React_useState1[0], setCanScrollRight = _React_useState1[1];
    var _useDirection1 = _sliced_to_array._((0, _useDirection.useDirection)(), 2), directionRef = _useDirection1[0], tmp = _useDirection1[1], textDirection = tmp === void 0 ? "ltr" : tmp;
    var setCanScrollStart = textDirection === "ltr" ? setCanScrollLeft : setCanScrollRight;
    var setCanScrollEnd = textDirection === "ltr" ? setCanScrollRight : setCanScrollLeft;
    var isCustomScrollingRef = _react.useRef(false);
    var scrollerRef = (0, _useExternRef.useExternRef)(getRef, directionRef);
    var animationQueue = _react.useRef([]);
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    var scrollTo = _react.useCallback(function(getScrollPosition) {
        var scrollElement = scrollerRef.current;
        animationQueue.current.push(function() {
            var _scrollElement_firstElementChild;
            return doScroll({
                scrollElement: scrollElement,
                getScrollPosition: getScrollPosition,
                animationQueue: animationQueue.current,
                onScrollToEndBorder: function() {
                    return setCanScrollEnd(false);
                },
                onScrollEnd: function() {
                    return isCustomScrollingRef.current = false;
                },
                onScrollStart: function() {
                    return isCustomScrollingRef.current = true;
                },
                initialScrollWidth: (scrollElement === null || scrollElement === void 0 ? void 0 : (_scrollElement_firstElementChild = scrollElement.firstElementChild) === null || _scrollElement_firstElementChild === void 0 ? void 0 : _scrollElement_firstElementChild.scrollWidth) || 0,
                scrollAnimationDuration: scrollAnimationDuration,
                textDirection: textDirection
            });
        });
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }, [
        scrollerRef,
        scrollAnimationDuration,
        textDirection,
        setCanScrollEnd
    ]);
    var scrollToLeft = _react.useCallback(function() {
        var getScrollPosition = getScrollToLeft !== null && getScrollToLeft !== void 0 ? getScrollToLeft : function(i) {
            return i - scrollerRef.current.offsetWidth;
        };
        scrollTo(getScrollPosition);
    }, [
        getScrollToLeft,
        scrollTo,
        scrollerRef
    ]);
    var scrollToRight = _react.useCallback(function() {
        var getScrollPosition = getScrollToRight !== null && getScrollToRight !== void 0 ? getScrollToRight : function(i) {
            return i + scrollerRef.current.offsetWidth;
        };
        scrollTo(getScrollPosition);
    }, [
        getScrollToRight,
        scrollTo,
        scrollerRef
    ]);
    var calculateArrowsVisibility = _react.useCallback(function() {
        if (showArrows && hasPointer && scrollerRef.current && !isCustomScrollingRef.current) {
            var scrollElement = scrollerRef.current;
            setCanScrollStart(scrollElement.scrollLeft !== 0);
            setCanScrollEnd(Math.abs(roundUpElementScrollLeft(scrollElement)) + scrollElement.offsetWidth < scrollElement.scrollWidth);
        }
    }, [
        showArrows,
        hasPointer,
        scrollerRef,
        setCanScrollStart,
        setCanScrollEnd
    ]);
    var scrollEvent = (0, _useEventListener.useEventListener)("scroll", calculateArrowsVisibility);
    _react.useEffect(function addScrollerRefToScrollEvent() {
        if (!scrollerRef.current) {
            return _vkjs.noop;
        }
        scrollEvent.add(scrollerRef.current);
        return scrollEvent.remove;
    }, [
        scrollEvent,
        scrollerRef
    ]);
    _react.useEffect(calculateArrowsVisibility, [
        calculateArrowsVisibility,
        children
    ]);
    /**
   * Прокрутка с помощью любого колеса мыши
   */ var onwheel = _react.useCallback(function(e) {
        scrollerRef.current.scrollBy({
            left: e.deltaX + e.deltaY,
            behavior: "auto"
        });
        e.preventDefault();
    }, [
        scrollerRef
    ]);
    var wheelEvent = (0, _useEventListener.useEventListener)("wheel", onwheel);
    _react.useEffect(function addScrollerRefToWheelEvent() {
        if (!scrollerRef.current || !scrollOnAnyWheel) {
            return _vkjs.noop;
        }
        wheelEvent.add(scrollerRef.current);
        return wheelEvent.remove;
    }, [
        wheelEvent,
        scrollerRef,
        scrollOnAnyWheel
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiHorizontalScroll", "vkuiInternalHorizontalScroll", showArrows === "always" && "vkuiHorizontalScroll--withConstArrows"),
        onMouseEnter: calculateArrowsVisibility
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollLeft && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        "data-testid": process.env.NODE_ENV === "test" ? "ScrollArrow" : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "left",
        "aria-hidden": true,
        className: (0, _vkjs.classNames)("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowLeft"),
        onClick: scrollToLeft
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        "data-testid": process.env.NODE_ENV === "test" ? "ScrollArrow" : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "right",
        "aria-hidden": true,
        className: (0, _vkjs.classNames)("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowRight"),
        onClick: scrollToRight
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalScroll__in",
        ref: scrollerRef
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalScroll__in-wrapper"
    }, children)));
};

//# sourceMappingURL=HorizontalScroll.js.map