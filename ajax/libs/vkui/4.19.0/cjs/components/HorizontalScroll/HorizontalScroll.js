"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _HorizontalScrollArrow = _interopRequireDefault(require("./HorizontalScrollArrow"));

var _fx = require("../../lib/fx");

var _useEventListener = require("../../hooks/useEventListener");

var _useExternRef = require("../../hooks/useExternRef");

var _excluded = ["children", "getScrollToLeft", "getScrollToRight", "showArrows", "scrollAnimationDuration", "hasMouse", "getRef"];

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
    var value = (0, _fx.easeInOutSine)(elapsed);
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

var HorizontalScroll = function HorizontalScroll(props) {
  var children = props.children,
      getScrollToLeft = props.getScrollToLeft,
      getScrollToRight = props.getScrollToRight,
      showArrows = props.showArrows,
      scrollAnimationDuration = props.scrollAnimationDuration,
      hasMouse = props.hasMouse,
      getRef = props.getRef,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      canScrollLeft = _React$useState2[0],
      setCanScrollLeft = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      canScrollRight = _React$useState4[0],
      setCanScrollRight = _React$useState4[1];

  var isCustomScrollingRef = React.useRef(false);
  var scrollerRef = (0, _useExternRef.useExternRef)(getRef);
  var animationQueue = React.useRef([]);
  var platform = (0, _usePlatform.usePlatform)();

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
  }, [hasMouse]);
  var scrollEvent = (0, _useEventListener.useEventListener)('scroll', onscroll);
  React.useEffect(function () {
    return scrollEvent.add(scrollerRef.current);
  }, []);
  React.useEffect(onscroll, [scrollerRef, children]);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _getClassName.getClassName)('HorizontalScroll', platform)
  }), showArrows && hasMouse && canScrollLeft && (0, _jsxRuntime.createScopedElement)(_HorizontalScrollArrow.default, {
    direction: "left",
    onClick: function onClick() {
      return scrollTo(getScrollToLeft);
    }
  }), showArrows && hasMouse && canScrollRight && (0, _jsxRuntime.createScopedElement)(_HorizontalScrollArrow.default, {
    direction: "right",
    onClick: function onClick() {
      return scrollTo(getScrollToRight);
    }
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "HorizontalScroll__in",
    ref: scrollerRef
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "HorizontalScroll__in-wrapper"
  }, children)));
};

HorizontalScroll.defaultProps = {
  showArrows: true
};

var _default = (0, _withAdaptivity.withAdaptivity)(HorizontalScroll, {
  hasMouse: true
});

exports.default = _default;
//# sourceMappingURL=HorizontalScroll.js.map