import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "getScrollToLeft", "getScrollToRight", "showArrows", "scrollAnimationDuration", "hasMouse", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import HorizontalScrollArrow from "./HorizontalScrollArrow";
import { easeInOutSine } from "../../lib/fx";
import { useEventListener } from "../../hooks/useEventListener";
import { useExternRef } from "../../hooks/useExternRef";
import { classNames } from "../../lib/classNames";
import "./HorizontalScroll.css";

/**
 * timing method
 */
function now() {
  return performance && performance.now ? performance.now() : Date.now();
}
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
  var startLeft = scrollElement.scrollLeft;
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

    if (scrollElement.scrollLeft !== Math.max(0, endLeft)) {
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

var HorizontalScroll = function HorizontalScroll(_ref2) {
  var children = _ref2.children,
      getScrollToLeft = _ref2.getScrollToLeft,
      getScrollToRight = _ref2.getScrollToRight,
      _ref2$showArrows = _ref2.showArrows,
      showArrows = _ref2$showArrows === void 0 ? true : _ref2$showArrows,
      _ref2$scrollAnimation = _ref2.scrollAnimationDuration,
      scrollAnimationDuration = _ref2$scrollAnimation === void 0 ? SCROLL_ONE_FRAME_TIME : _ref2$scrollAnimation,
      hasMouse = _ref2.hasMouse,
      getRef = _ref2.getRef,
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

  function scrollTo(getScrollPosition) {
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
  }

  var onscroll = React.useCallback(function () {
    if (showArrows && hasMouse && scrollerRef.current && !isCustomScrollingRef.current) {
      var scrollElement = scrollerRef.current;
      setCanScrollLeft(scrollElement.scrollLeft > 0);
      setCanScrollRight(scrollElement.scrollLeft + scrollElement.offsetWidth < scrollElement.scrollWidth);
    }
  }, [hasMouse, scrollerRef, showArrows]);
  var scrollEvent = useEventListener("scroll", onscroll);
  React.useEffect(function () {
    if (scrollerRef.current) {
      scrollEvent.add(scrollerRef.current);
    }
  }, [scrollEvent, scrollerRef]);
  React.useEffect(onscroll, [scrollerRef, children, onscroll]);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("HorizontalScroll", _defineProperty({}, "HorizontalScroll--withConstArrows", showArrows === "always"))
  }), showArrows && hasMouse && canScrollLeft && createScopedElement(HorizontalScrollArrow, {
    direction: "left",
    onClick: function onClick() {
      if (getScrollToLeft) {
        scrollTo(getScrollToLeft);
      }
    }
  }), showArrows && hasMouse && canScrollRight && createScopedElement(HorizontalScrollArrow, {
    direction: "right",
    onClick: function onClick() {
      if (getScrollToRight) {
        scrollTo(getScrollToRight);
      }
    }
  }), createScopedElement("div", {
    vkuiClass: "HorizontalScroll__in",
    ref: scrollerRef
  }, createScopedElement("div", {
    vkuiClass: "HorizontalScroll__in-wrapper"
  }, children)));
}; // eslint-disable-next-line import/no-default-export


export default withAdaptivity(HorizontalScroll, {
  hasMouse: true
});
//# sourceMappingURL=HorizontalScroll.js.map