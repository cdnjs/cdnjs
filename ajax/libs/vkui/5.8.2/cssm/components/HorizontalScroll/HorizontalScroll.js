import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
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
 * Округляем el.scrollLeft
 * https://github.com/VKCOM/VKUI/pull/2445
 */ const roundUpElementScrollLeft = (el)=>Math.ceil(el.scrollLeft);
/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */ const SCROLL_ONE_FRAME_TIME = 250;
function doScroll({ scrollElement, getScrollPosition, animationQueue, onScrollToRightBorder, onScrollEnd, onScrollStart, initialScrollWidth, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME }) {
    if (!scrollElement || !getScrollPosition) {
        return;
    }
    /**
   * максимальное значение сдвига влево
   */ const maxLeft = initialScrollWidth - scrollElement.offsetWidth;
    let startLeft = roundUpElementScrollLeft(scrollElement);
    let endLeft = getScrollPosition(startLeft);
    onScrollStart();
    if (endLeft >= maxLeft) {
        onScrollToRightBorder();
        endLeft = maxLeft;
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
        const currentLeft = startLeft + (endLeft - startLeft) * value;
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
 */ export const HorizontalScroll = ({ children, getScrollToLeft, getScrollToRight, showArrows = true, arrowSize = 'l', arrowOffsetY, scrollAnimationDuration = SCROLL_ONE_FRAME_TIME, getRef, scrollOnAnyWheel = false, ...restProps })=>{
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    const isCustomScrollingRef = React.useRef(false);
    const scrollerRef = useExternRef(getRef);
    const animationQueue = React.useRef([]);
    const hasPointer = useAdaptivityHasPointer();
    const scrollTo = React.useCallback((getScrollPosition)=>{
        const scrollElement = scrollerRef.current;
        animationQueue.current.push(()=>doScroll({
                scrollElement,
                getScrollPosition,
                animationQueue: animationQueue.current,
                onScrollToRightBorder: ()=>setCanScrollRight(false),
                onScrollEnd: ()=>isCustomScrollingRef.current = false,
                onScrollStart: ()=>isCustomScrollingRef.current = true,
                initialScrollWidth: scrollElement?.firstElementChild?.scrollWidth || 0,
                scrollAnimationDuration
            }));
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }, [
        scrollAnimationDuration,
        scrollerRef
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
            setCanScrollLeft(scrollElement.scrollLeft > 0);
            setCanScrollRight(roundUpElementScrollLeft(scrollElement) + scrollElement.offsetWidth < scrollElement.scrollWidth);
        }
    }, [
        hasPointer,
        scrollerRef,
        showArrows
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
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "left",
        className: classNames(styles['HorizontalScroll__arrow'], styles['HorizontalScroll__arrowLeft']),
        onClick: scrollToLeft
    }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/ React.createElement(ScrollArrow, {
        size: arrowSize,
        offsetY: arrowOffsetY,
        direction: "right",
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