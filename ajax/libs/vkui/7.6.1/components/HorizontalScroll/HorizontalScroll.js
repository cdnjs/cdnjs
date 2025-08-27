'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { easeInOutSine } from "../../lib/fx.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow.js";
/**
 * Timing method.
 */ function now() {
    return performance && performance.now ? performance.now() : Date.now();
}
/**
 * Округление к большему по модулю.
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
 * https://github.com/VKCOM/VKUI/pull/2445.
 */ const roundUpElementScrollLeft = (el)=>roundingAwayFromZero(el.scrollLeft);
/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250.
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */ const SCROLL_ONE_FRAME_TIME = 250;
function doScroll({ scrollElement, getScrollPosition, animationQueue, onScrollToEndBorder, onScrollEnd, onScrollStart, initialScrollWidth, scrollAnimationDuration, textDirection }) {
    if (!scrollElement || !getScrollPosition) {
        return;
    }
    /**
   * Крайнее значение сдвига.
   */ const extremeScrollLeft = (textDirection === 'ltr' ? 1 : -1) * (initialScrollWidth - scrollElement.offsetWidth);
    const startScrollLeft = roundUpElementScrollLeft(scrollElement);
    const remappedStartScrollLeft = startScrollLeft * (textDirection === 'rtl' ? -1 : 1);
    let endScrollLeft = getScrollPosition(remappedStartScrollLeft);
    const diff = endScrollLeft - remappedStartScrollLeft;
    if (textDirection === 'rtl') {
        endScrollLeft = startScrollLeft - diff;
    }
    onScrollStart();
    /**
   * Если окончание прокрутки вышло за ноль.
   */ if (startScrollLeft * endScrollLeft < 0) {
        endScrollLeft = 0;
    }
    if (Math.abs(endScrollLeft) >= Math.abs(extremeScrollLeft)) {
        onScrollToEndBorder();
        endScrollLeft = extremeScrollLeft;
    }
    const startTime = now();
    (function scroll() {
        const time = now();
        const elapsed = Math.min((time - startTime) / scrollAnimationDuration, 1);
        const value = easeInOutSine(elapsed);
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
/**
 * @see https://vkui.io/components/horizontal-scroll
 */ export const HorizontalScroll = (_param)=>{
    var { children, getScrollToLeft, getScrollToRight, showArrows = true, arrowSize = 'm', arrowOffsetY, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME, getRef, scrollOnAnyWheel = false, prevButtonTestId, nextButtonTestId, // ContentWrapper
    ContentWrapperComponent = 'div', contentWrapperRef, contentWrapperClassName } = _param, restProps = _object_without_properties(_param, [
        "children",
        "getScrollToLeft",
        "getScrollToRight",
        "showArrows",
        "arrowSize",
        "arrowOffsetY",
        "scrollAnimationDuration",
        "getRef",
        "scrollOnAnyWheel",
        "prevButtonTestId",
        "nextButtonTestId",
        "ContentWrapperComponent",
        "contentWrapperRef",
        "contentWrapperClassName"
    ]);
    const [canScrollStart, setCanScrollStart] = React.useState(false);
    const [canScrollEnd, setCanScrollEnd] = React.useState(false);
    const _useFocusVisible = useFocusVisible(), { focusVisible } = _useFocusVisible, focusEvents = _object_without_properties(_useFocusVisible, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible
    });
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const isCustomScrollingRef = React.useRef(false);
    const scrollerRef = useExternRef(getRef);
    const animationQueue = React.useRef([]);
    const hasPointer = useAdaptivityHasPointer();
    const scrollTo = React.useCallback((getScrollPosition)=>{
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
                textDirection: direction
            });
        });
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }, [
        scrollerRef,
        scrollAnimationDuration,
        direction,
        setCanScrollEnd
    ]);
    const scrollToStart = React.useCallback(()=>{
        const getScrollPosition = getScrollToLeft !== null && getScrollToLeft !== void 0 ? getScrollToLeft : (i)=>i - scrollerRef.current.offsetWidth;
        scrollTo(getScrollPosition);
    }, [
        getScrollToLeft,
        scrollTo,
        scrollerRef
    ]);
    const scrollToEnd = React.useCallback(()=>{
        const getScrollPosition = getScrollToRight !== null && getScrollToRight !== void 0 ? getScrollToRight : (i)=>i + scrollerRef.current.offsetWidth;
        scrollTo(getScrollPosition);
    }, [
        getScrollToRight,
        scrollTo,
        scrollerRef
    ]);
    const calculateArrowsVisibility = React.useCallback(()=>{
        if (showArrows && hasPointer && scrollerRef.current && !isCustomScrollingRef.current) {
            const scrollElement = scrollerRef.current;
            const scrollLeft = scrollElement.scrollLeft;
            setCanScrollStart(isRtl ? scrollLeft < 0 : scrollLeft > 0);
            setCanScrollEnd(Math.abs(roundUpElementScrollLeft(scrollElement)) + scrollElement.offsetWidth < scrollElement.scrollWidth);
        }
    }, [
        showArrows,
        hasPointer,
        scrollerRef,
        isRtl
    ]);
    React.useEffect(calculateArrowsVisibility, [
        calculateArrowsVisibility,
        children
    ]);
    useIsomorphicLayoutEffect(function addWheelEventHandler() {
        const scrollEl = scrollerRef.current;
        if (!scrollEl) {
            return noop;
        }
        /**
       * Прокрутка с помощью любого колеса мыши.
       */ const onWheel = (e)=>{
            scrollerRef.current.scrollBy({
                left: e.deltaX + e.deltaY,
                behavior: 'auto'
            });
            e.preventDefault();
        };
        const listenerOptions = {
            passive: false
        };
        if (scrollOnAnyWheel) {
            scrollEl.addEventListener('wheel', onWheel, listenerOptions);
        }
        scrollEl.addEventListener('scroll', calculateArrowsVisibility, listenerOptions);
        return ()=>{
            if (scrollOnAnyWheel) {
                // @ts-expect-error: TS2769 В интерфейсе EventListenerOptions для wheel нет passive свойства
                scrollEl.removeEventListener('wheel', onWheel, listenerOptions);
            }
            // @ts-expect-error: TS2769 В интерфейсе EventListenerOptions для scroll нет passive свойства
            scrollEl.removeEventListener('scroll', calculateArrowsVisibility, listenerOptions);
        };
    }, [
        scrollOnAnyWheel,
        calculateArrowsVisibility,
        scrollerRef
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiHorizontalScroll__host", 'vkuiInternalHorizontalScroll', showArrows === 'always' && "vkuiHorizontalScroll__withConstArrows", isRtl && "vkuiHorizontalScroll__rtl"),
        onMouseEnter: calculateArrowsVisibility,
        children: [
            showArrows && (hasPointer || hasPointer === undefined) && canScrollStart && /*#__PURE__*/ _jsx(ScrollArrow, {
                "data-testid": prevButtonTestId,
                size: arrowSize,
                offsetY: arrowOffsetY,
                direction: "left",
                "aria-hidden": true,
                tabIndex: -1,
                className: classNames("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowLeft"),
                onClick: scrollToStart
            }),
            showArrows && (hasPointer || hasPointer === undefined) && canScrollEnd && /*#__PURE__*/ _jsx(ScrollArrow, {
                "data-testid": nextButtonTestId,
                size: arrowSize,
                offsetY: arrowOffsetY,
                direction: "right",
                "aria-hidden": true,
                tabIndex: -1,
                className: classNames("vkuiHorizontalScroll__arrow", "vkuiHorizontalScroll__arrowRight"),
                onClick: scrollToEnd
            }),
            /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                className: classNames("vkuiHorizontalScroll__in", focusVisibleClassNames),
                ref: scrollerRef,
                tabIndex: 0
            }, focusEvents), {
                children: /*#__PURE__*/ _jsx(ContentWrapperComponent, {
                    className: classNames("vkuiHorizontalScroll__inWrapper", contentWrapperClassName),
                    ref: contentWrapperRef,
                    children: children
                })
            }))
        ]
    }));
};

//# sourceMappingURL=HorizontalScroll.js.map