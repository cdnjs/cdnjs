import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "getScrollToLeft", "getScrollToRight", "showArrows", "arrowSize", "scrollAnimationDuration", "getRef", "className"];
import * as React from 'react';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { HorizontalScrollArrow } from './HorizontalScrollArrow';
import { easeInOutSine } from '../../lib/fx';
import { useEventListener } from '../../hooks/useEventListener';
import { useExternRef } from '../../hooks/useExternRef';
import { classNames } from '@vkontakte/vkjs';
import "./HorizontalScroll.module.css";
/**
 * timing method
 */
function now() {
  return performance && performance.now ? performance.now() : Date.now();
}

/**
 * Округляем el.scrollLeft
 * https://github.com/VKCOM/VKUI/pull/2445
 */
var roundUpElementScrollLeft = function roundUpElementScrollLeft(el) {
  return Math.ceil(el.scrollLeft);
};

/**
 * Код анимации скрола, на основе полифила: https://github.com/iamdustan/smoothscroll
 * Константа взята из полифила (468), на дизайн-ревью уточнили до 250
 * @var {number} SCROLL_ONE_FRAME_TIME время анимации скролла
 */
var SCROLL_ONE_FRAME_TIME = 250;
function doScroll(_ref) {
  var scrollElement = _ref.scrollElement,
    getScrollPosition = _ref.getScrollPosition,
    animationQueue = _ref.animationQueue,
    onScrollToRightBorder = _ref.onScrollToRightBorder,
    onScrollEnd = _ref.onScrollEnd,
    onScrollStart = _ref.onScrollStart,
    initialScrollWidth = _ref.initialScrollWidth,
    _ref$scrollAnimationD = _ref.scrollAnimationDuration,
    scrollAnimationDuration = _ref$scrollAnimationD === void 0 ? SCROLL_ONE_FRAME_TIME : _ref$scrollAnimationD;
  if (!scrollElement || !getScrollPosition) {
    return;
  }

  /**
   * максимальное значение сдвига влево
   */
  var maxLeft = initialScrollWidth - scrollElement.offsetWidth;
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
 */
export var HorizontalScroll = function HorizontalScroll(_ref2) {
  var children = _ref2.children,
    getScrollToLeft = _ref2.getScrollToLeft,
    getScrollToRight = _ref2.getScrollToRight,
    _ref2$showArrows = _ref2.showArrows,
    showArrows = _ref2$showArrows === void 0 ? true : _ref2$showArrows,
    _ref2$arrowSize = _ref2.arrowSize,
    arrowSize = _ref2$arrowSize === void 0 ? 'l' : _ref2$arrowSize,
    _ref2$scrollAnimation = _ref2.scrollAnimationDuration,
    scrollAnimationDuration = _ref2$scrollAnimation === void 0 ? SCROLL_ONE_FRAME_TIME : _ref2$scrollAnimation,
    getRef = _ref2.getRef,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    canScrollLeft = _React$useState2[0],
    setCanScrollLeft = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    canScrollRight = _React$useState4[0],
    setCanScrollRight = _React$useState4[1];
  var isCustomScrollingRef = React.useRef(false);
  var scrollerRef = useExternRef(getRef);
  var animationQueue = React.useRef([]);
  var hasPointer = useAdaptivityHasPointer();
  var scrollTo = React.useCallback(function (getScrollPosition) {
    var scrollElement = scrollerRef.current;
    animationQueue.current.push(function () {
      var _scrollElement$firstE;
      return doScroll({
        scrollElement: scrollElement,
        getScrollPosition: getScrollPosition,
        animationQueue: animationQueue.current,
        onScrollToRightBorder: function onScrollToRightBorder() {
          return setCanScrollRight(false);
        },
        onScrollEnd: function onScrollEnd() {
          return isCustomScrollingRef.current = false;
        },
        onScrollStart: function onScrollStart() {
          return isCustomScrollingRef.current = true;
        },
        initialScrollWidth: (scrollElement === null || scrollElement === void 0 ? void 0 : (_scrollElement$firstE = scrollElement.firstElementChild) === null || _scrollElement$firstE === void 0 ? void 0 : _scrollElement$firstE.scrollWidth) || 0,
        scrollAnimationDuration: scrollAnimationDuration
      });
    });
    if (animationQueue.current.length === 1) {
      animationQueue.current[0]();
    }
  }, [scrollAnimationDuration, scrollerRef]);
  var scrollToLeft = React.useCallback(function () {
    var getScrollPosition = getScrollToLeft !== null && getScrollToLeft !== void 0 ? getScrollToLeft : function (i) {
      return i - scrollerRef.current.offsetWidth;
    };
    scrollTo(getScrollPosition);
  }, [getScrollToLeft, scrollTo, scrollerRef]);
  var scrollToRight = React.useCallback(function () {
    var getScrollPosition = getScrollToRight !== null && getScrollToRight !== void 0 ? getScrollToRight : function (i) {
      return i + scrollerRef.current.offsetWidth;
    };
    scrollTo(getScrollPosition);
  }, [getScrollToRight, scrollTo, scrollerRef]);
  var onscroll = React.useCallback(function () {
    if (showArrows && hasPointer && scrollerRef.current && !isCustomScrollingRef.current) {
      var scrollElement = scrollerRef.current;
      setCanScrollLeft(scrollElement.scrollLeft > 0);
      setCanScrollRight(roundUpElementScrollLeft(scrollElement) + scrollElement.offsetWidth < scrollElement.scrollWidth);
    }
  }, [hasPointer, scrollerRef, showArrows]);
  var scrollEvent = useEventListener('scroll', onscroll);
  React.useEffect(function () {
    if (scrollerRef.current) {
      scrollEvent.add(scrollerRef.current);
    }
  }, [scrollEvent, scrollerRef]);
  React.useEffect(onscroll, [scrollerRef, children, onscroll]);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiHorizontalScroll", showArrows === 'always' && "vkuiHorizontalScroll--withConstArrows", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalScroll__in",
    ref: scrollerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalScroll__in-wrapper"
  }, children)), showArrows && (hasPointer || hasPointer === undefined) && canScrollLeft && /*#__PURE__*/React.createElement(HorizontalScrollArrow, {
    size: arrowSize,
    direction: "left",
    className: "vkuiHorizontalScroll__arrowLeft",
    onClick: scrollToLeft
  }), showArrows && (hasPointer || hasPointer === undefined) && canScrollRight && /*#__PURE__*/React.createElement(HorizontalScrollArrow, {
    size: arrowSize,
    direction: "right",
    className: "vkuiHorizontalScroll__arrowRight",
    onClick: scrollToRight
  }));
};
//# sourceMappingURL=HorizontalScroll.js.map