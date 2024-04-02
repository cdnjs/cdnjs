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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
const _useDirection = require("../../hooks/useDirection");
const _useEventListener = require("../../hooks/useEventListener");
const _useExternRef = require("../../hooks/useExternRef");
const _fx = require("../../lib/fx");
const _RootComponent = require("../RootComponent/RootComponent");
const _ScrollArrow = require("../ScrollArrow/ScrollArrow");
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
 */ const roundUpElementScrollLeft = (el)=>roundingAwayFromZero(el.scrollLeft);
/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */ const SCROLL_ONE_FRAME_TIME = 250;
function doScroll({ scrollElement, getScrollPosition, animationQueue, onScrollToEndBorder, onScrollEnd, onScrollStart, initialScrollWidth, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME, textDirection }) {
    if (!scrollElement || !getScrollPosition) {
        return;
    }
    /**
   * крайнее значение сдвига
   */ const extremeScrollLeft = (textDirection === 'ltr' ? 1 : -1) * (initialScrollWidth - scrollElement.offsetWidth);
    let startScrollLeft = roundUpElementScrollLeft(scrollElement);
    let endScrollLeft = getScrollPosition(startScrollLeft);
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
    const startTime = now();
    (function scroll() {
        if (!scrollElement) {
            onScrollEnd();
            return;
        }
        const time = now();
        const elapsed = Math.min((time - startTime) / scrollAnimationDuration, 1);
        const value = (0, _fx.easeInOutSine)(elapsed);
        const currentScrollLeft = startScrollLeft + (endScrollLeft - startScrollLeft) * value;
        scrollElement.scrollLeft = roundingAwayFromZero(currentScrollLeft);
        const scrollEnd = textDirection === 'ltr' ? Math.max(0, endScrollLeft) : Math.min(0, endScrollLeft);
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
const HorizontalScroll = (_param)=>{
    var { children, getScrollToLeft, getScrollToRight, showArrows = true, arrowSize = 'l', arrowOffsetY, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME, getRef, scrollOnAnyWheel = false } = _param, restProps = _object_without_properties._(_param, [
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
    const [canScrollLeft, setCanScrollLeft] = _react.useState(false);
    const [canScrollRight, setCanScrollRight] = _react.useState(false);
    const [directionRef, textDirection = 'ltr'] = (0, _useDirection.useDirection)();
    const setCanScrollStart = textDirection === 'ltr' ? setCanScrollLeft : setCanScrollRight;
    const setCanScrollEnd = textDirection === 'ltr' ? setCanScrollRight : setCanScrollLeft;
    const isCustomScrollingRef = _react.useRef(false);
    const scrollerRef = (0, _useExternRef.useExternRef)(getRef, directionRef);
    const animationQueue = _react.useRef([]);
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const scrollTo = _react.useCallback((getScrollPosition)=>{
        const scrollElement = scrollerRef.current;
        animationQueue.current.push(()=>{
            var _scrollElement_firstElementChild;
            return doScroll({
                scrollElement,
                getScrollPosition,
                animationQueue: animationQueue.current,
                onScrollToEndBorder: ()=>setCanScrollEnd(false),
                onScrollEnd: ()=>isCustomScrollingRef.current = false,
                onScrollStart: ()=>isCustomScrollingRef.current = true,
                initialScrollWidth: (scrollElement === null || scrollElement === void 0 ? void 0 : (_scrollElement_firstElementChild = scrollElement.firstElementChild) === null || _scrollElement_firstElementChild === void 0 ? void 0 : _scrollElement_firstElementChild.scrollWidth) || 0,
                scrollAnimationDuration,
                textDirection
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
    const scrollToLeft = _react.useCallback(()=>{
        const getScrollPosition = getScrollToLeft !== null && getScrollToLeft !== void 0 ? getScrollToLeft : (i)=>i - scrollerRef.current.offsetWidth;
        scrollTo(getScrollPosition);
    }, [
        getScrollToLeft,
        scrollTo,
        scrollerRef
    ]);
    const scrollToRight = _react.useCallback(()=>{
        const getScrollPosition = getScrollToRight !== null && getScrollToRight !== void 0 ? getScrollToRight : (i)=>i + scrollerRef.current.offsetWidth;
        scrollTo(getScrollPosition);
    }, [
        getScrollToRight,
        scrollTo,
        scrollerRef
    ]);
    const calculateArrowsVisibility = _react.useCallback(()=>{
        if (showArrows && hasPointer && scrollerRef.current && !isCustomScrollingRef.current) {
            const scrollElement = scrollerRef.current;
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
    const scrollEvent = (0, _useEventListener.useEventListener)('scroll', calculateArrowsVisibility);
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
   */ const onwheel = _react.useCallback((e)=>{
        scrollerRef.current.scrollBy({
            left: e.deltaX + e.deltaY,
            behavior: 'auto'
        });
        e.preventDefault();
    }, [
        scrollerRef
    ]);
    const wheelEvent = (0, _useEventListener.useEventListener)('wheel', onwheel);
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
        baseClassName: (0, _vkjs.classNames)("vkuiHorizontalScroll", 'vkuiInternalHorizontalScroll', showArrows === 'always' && "vkuiHorizontalScroll--withConstArrows"),
        onMouseEnter: calculateArrowsVisibility
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollLeft && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        "data-testid": process.env.NODE_ENV === 'test' ? 'ScrollArrow' : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "left",
        "aria-hidden": true,
        tabIndex: -1,
        className: (0, _vkjs.classNames)("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowLeft"),
        onClick: scrollToLeft
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/ _react.createElement(_ScrollArrow.ScrollArrow, {
        "data-testid": process.env.NODE_ENV === 'test' ? 'ScrollArrow' : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "right",
        "aria-hidden": true,
        tabIndex: -1,
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