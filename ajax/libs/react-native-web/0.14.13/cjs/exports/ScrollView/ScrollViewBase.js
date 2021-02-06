"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function normalizeScrollEvent(e) {
  return {
    nativeEvent: {
      contentOffset: {
        get x() {
          return e.target.scrollLeft;
        },

        get y() {
          return e.target.scrollTop;
        }

      },
      contentSize: {
        get height() {
          return e.target.scrollHeight;
        },

        get width() {
          return e.target.scrollWidth;
        }

      },
      layoutMeasurement: {
        get height() {
          return e.target.offsetHeight;
        },

        get width() {
          return e.target.offsetWidth;
        }

      }
    },
    timeStamp: Date.now()
  };
}

function shouldEmitScrollEvent(lastTick, eventThrottle) {
  var timeSinceLastTick = Date.now() - lastTick;
  return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
}
/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */


var ScrollViewBase = (0, React.forwardRef)(function (props, forwardedRef) {
  var accessibilityLabel = props.accessibilityLabel,
      accessibilityRole = props.accessibilityRole,
      accessibilityState = props.accessibilityState,
      children = props.children,
      importantForAccessibility = props.importantForAccessibility,
      nativeID = props.nativeID,
      onLayout = props.onLayout,
      onScroll = props.onScroll,
      onTouchMove = props.onTouchMove,
      onWheel = props.onWheel,
      pointerEvents = props.pointerEvents,
      _props$scrollEnabled = props.scrollEnabled,
      scrollEnabled = _props$scrollEnabled === void 0 ? true : _props$scrollEnabled,
      _props$scrollEventThr = props.scrollEventThrottle,
      scrollEventThrottle = _props$scrollEventThr === void 0 ? 0 : _props$scrollEventThr,
      showsHorizontalScrollIndicator = props.showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator = props.showsVerticalScrollIndicator,
      style = props.style,
      dataSet = props.dataSet,
      testID = props.testID;
  var scrollState = (0, React.useRef)({
    isScrolling: false,
    scrollLastTick: 0
  });
  var scrollTimeout = (0, React.useRef)(null);
  var scrollRef = (0, React.useRef)(null);

  function createPreventableScrollHandler(handler) {
    return function (e) {
      if (scrollEnabled) {
        if (handler) {
          handler(e);
        }
      }
    };
  }

  function handleScroll(e) {
    e.stopPropagation();

    if (e.target === scrollRef.current) {
      e.persist(); // A scroll happened, so the scroll resets the scrollend timeout.

      if (scrollTimeout.current != null) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(function () {
        handleScrollEnd(e);
      }, 100);

      if (scrollState.current.isScrolling) {
        // Scroll last tick may have changed, check if we need to notify
        if (shouldEmitScrollEvent(scrollState.current.scrollLastTick, scrollEventThrottle)) {
          handleScrollTick(e);
        }
      } else {
        // Weren't scrolling, so we must have just started
        handleScrollStart(e);
      }
    }
  }

  function handleScrollStart(e) {
    scrollState.current.isScrolling = true;
    handleScrollTick(e);
  }

  function handleScrollTick(e) {
    scrollState.current.scrollLastTick = Date.now();

    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  function handleScrollEnd(e) {
    scrollState.current.isScrolling = false;

    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  var hideScrollbar = showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;
  return React.createElement(_View.default, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: accessibilityRole,
    accessibilityState: accessibilityState,
    children: children,
    dataSet: dataSet,
    importantForAccessibility: importantForAccessibility,
    nativeID: nativeID,
    onLayout: onLayout,
    onScroll: handleScroll,
    onTouchMove: createPreventableScrollHandler(onTouchMove),
    onWheel: createPreventableScrollHandler(onWheel),
    pointerEvents: pointerEvents,
    ref: (0, _useMergeRefs.default)(scrollRef, forwardedRef),
    style: [style, !scrollEnabled && styles.scrollDisabled, hideScrollbar && styles.hideScrollbar],
    testID: testID
  });
}); // Chrome doesn't support e.preventDefault in this case; touch-action must be
// used to disable scrolling.
// https://developers.google.com/web/updates/2017/01/scrolling-intervention

var styles = _StyleSheet.default.create({
  scrollDisabled: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    touchAction: 'none'
  },
  hideScrollbar: {
    scrollbarWidth: 'none'
  }
});

var _default = ScrollViewBase;
exports.default = _default;
module.exports = exports.default;