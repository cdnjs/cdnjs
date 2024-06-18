import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { useDirection } from '../../hooks/useDirection';
import { useEventListener } from '../../hooks/useEventListener';
import { useExternRef } from '../../hooks/useExternRef';
import { easeInOutSine } from '../../lib/fx';
import { RootComponent } from '../RootComponent/RootComponent';
import { ScrollArrow } from '../ScrollArrow/ScrollArrow';
import styles from './HorizontalScroll.module.css';
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
 * @see https://vkcom.github.io/VKUI/#/HorizontalScroll
 */ export const HorizontalScroll = ({ children, getScrollToLeft, getScrollToRight, showArrows = true, arrowSize = 'l', arrowOffsetY, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME, getRef, scrollOnAnyWheel = false, ...restProps })=>{
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    const [directionRef, textDirection = 'ltr'] = useDirection();
    const setCanScrollStart = textDirection === 'ltr' ? setCanScrollLeft : setCanScrollRight;
    const setCanScrollEnd = textDirection === 'ltr' ? setCanScrollRight : setCanScrollLeft;
    const isCustomScrollingRef = React.useRef(false);
    const scrollerRef = useExternRef(getRef, directionRef);
    const animationQueue = React.useRef([]);
    const hasPointer = useAdaptivityHasPointer();
    const scrollTo = React.useCallback((getScrollPosition)=>{
        const scrollElement = scrollerRef.current;
        animationQueue.current.push(()=>doScroll({
                scrollElement,
                getScrollPosition,
                animationQueue: animationQueue.current,
                onScrollToEndBorder: ()=>setCanScrollEnd(false),
                onScrollEnd: ()=>isCustomScrollingRef.current = false,
                onScrollStart: ()=>isCustomScrollingRef.current = true,
                initialScrollWidth: scrollElement?.firstElementChild?.scrollWidth || 0,
                scrollAnimationDuration,
                textDirection
            }));
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }, [
        scrollerRef,
        scrollAnimationDuration,
        textDirection,
        setCanScrollEnd
    ]);
    const scrollToLeft = React.useCallback(()=>{
        const getScrollPosition = getScrollToLeft ?? ((i)=>i - scrollerRef.current.offsetWidth);
        scrollTo(getScrollPosition);
    }, [
        getScrollToLeft,
        scrollTo,
        scrollerRef
    ]);
    const scrollToRight = React.useCallback(()=>{
        const getScrollPosition = getScrollToRight ?? ((i)=>i + scrollerRef.current.offsetWidth);
        scrollTo(getScrollPosition);
    }, [
        getScrollToRight,
        scrollTo,
        scrollerRef
    ]);
    const calculateArrowsVisibility = React.useCallback(()=>{
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
    const scrollEvent = useEventListener('scroll', calculateArrowsVisibility);
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
   */ const onwheel = React.useCallback((e)=>{
        scrollerRef.current.scrollBy({
            left: e.deltaX + e.deltaY,
            behavior: 'auto'
        });
        e.preventDefault();
    }, [
        scrollerRef
    ]);
    const wheelEvent = useEventListener('wheel', onwheel);
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
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['HorizontalScroll'], 'vkuiInternalHorizontalScroll', showArrows === 'always' && styles['HorizontalScroll--withConstArrows']),
        onMouseEnter: calculateArrowsVisibility
    }, showArrows && (hasPointer || hasPointer === undefined) && canScrollLeft && /*#__PURE__*/ React.createElement(ScrollArrow, {
        "data-testid": process.env.NODE_ENV === 'test' ? 'ScrollArrow' : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "left",
        "aria-hidden": true,
        tabIndex: -1,
        className: classNames(styles['HorizontalScroll__arrow'], styles['HorizontalScroll__arrowLeft']),
        onClick: scrollToLeft
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/ React.createElement(ScrollArrow, {
        "data-testid": process.env.NODE_ENV === 'test' ? 'ScrollArrow' : undefined,
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "right",
        "aria-hidden": true,
        tabIndex: -1,
        className: classNames(styles['HorizontalScroll__arrow'], styles['HorizontalScroll__arrowRight']),
        onClick: scrollToRight
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['HorizontalScroll__in'],
        ref: scrollerRef
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['HorizontalScroll__in-wrapper']
    }, children)));
};

//# sourceMappingURL=HorizontalScroll.js.map