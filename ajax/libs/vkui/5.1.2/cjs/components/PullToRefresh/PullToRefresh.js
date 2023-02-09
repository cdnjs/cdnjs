"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullToRefresh = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _dom = require("../../lib/dom");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _taptic = require("../../lib/taptic");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _usePlatform = require("../../hooks/usePlatform");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _Touch = require("../Touch/Touch");
var _FixedLayout = require("../FixedLayout/FixedLayout");
var _PullToRefreshSpinner = require("./PullToRefreshSpinner");
var _TouchContext = _interopRequireDefault(require("../Touch/TouchContext"));
var _usePrevious = require("../../hooks/usePrevious");
var _useTimeout2 = require("../../hooks/useTimeout");
var _math = require("../../helpers/math");
var _excluded = ["children", "isFetching", "onRefresh", "className"];
function cancelEvent(event) {
  if (!event) {
    return false;
  }
  while (event.originalEvent) {
    event = event.originalEvent;
  }
  if (event.preventDefault && event.cancelable) {
    event.preventDefault();
  }
  if (event.stopPropagation) {
    event.stopPropagation();
  }
  return false;
}
var TOUCH_MOVE_EVENT_PARAMS = {
  cancelable: true,
  passive: false
};

/**
 * @see https://vkcom.github.io/VKUI/#/PullToRefresh
 */
var PullToRefresh = function PullToRefresh(_ref) {
  var children = _ref.children,
    isFetching = _ref.isFetching,
    onRefresh = _ref.onRefresh,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var scroll = (0, _ScrollContext.useScroll)();
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var prevIsFetching = (0, _usePrevious.usePrevious)(isFetching);
  var initParams = React.useMemo(function () {
    return {
      start: platform === _platform.Platform.IOS ? -10 : -45,
      max: platform === _platform.Platform.IOS ? 50 : 80,
      maxY: platform === _platform.Platform.IOS ? 400 : 80,
      refreshing: platform === _platform.Platform.IOS ? 36 : 50,
      positionMultiplier: platform === _platform.Platform.IOS ? 0.21 : 1
    };
  }, [platform]);
  var _React$useState = React.useState(initParams.start),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    spinnerY = _React$useState2[0],
    setSpinnerY = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    watching = _React$useState4[0],
    setWatching = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    refreshing = _React$useState6[0],
    setRefreshing = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
    canRefresh = _React$useState8[0],
    setCanRefresh = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
    touchDown = _React$useState10[0],
    setTouchDown = _React$useState10[1];
  var prevTouchDown = (0, _usePrevious.usePrevious)(touchDown);
  var touchY = React.useRef(0);
  var _React$useState11 = React.useState(0),
    _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
    contentShift = _React$useState12[0],
    setContentShift = _React$useState12[1];
  var _React$useState13 = React.useState(0),
    _React$useState14 = (0, _slicedToArray2.default)(_React$useState13, 2),
    spinnerProgress = _React$useState14[0],
    setSpinnerProgress = _React$useState14[1];
  var onWindowTouchMove = function onWindowTouchMove(event) {
    if (refreshing) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'touchmove', onWindowTouchMove, TOUCH_MOVE_EVENT_PARAMS);
  var resetRefreshingState = React.useCallback(function () {
    setWatching(false);
    setCanRefresh(false);
    setRefreshing(false);
    setSpinnerY(initParams.start);
    setSpinnerProgress(0);
    setContentShift(0);
  }, [initParams]);
  var onRefreshingFinish = React.useCallback(function () {
    if (!touchDown) {
      resetRefreshingState();
    }
  }, [touchDown, resetRefreshingState]);
  var _useTimeout = (0, _useTimeout2.useTimeout)(onRefreshingFinish, 1000),
    setWaitFetchingTimeout = _useTimeout.set,
    clearWaitFetchingTimeout = _useTimeout.clear;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (prevIsFetching !== undefined && prevIsFetching && !isFetching) {
      onRefreshingFinish();
    }
  }, [prevIsFetching, isFetching, onRefreshingFinish]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (prevIsFetching !== undefined && !prevIsFetching && isFetching) {
      clearWaitFetchingTimeout();
    }
  }, [isFetching, prevIsFetching, clearWaitFetchingTimeout]);
  var runRefreshing = React.useCallback(function () {
    if (!refreshing && onRefresh) {
      // cleanup if the consumer does not start fetching in 1s
      setWaitFetchingTimeout();
      setRefreshing(true);
      setSpinnerY(function (prevSpinnerY) {
        return platform === _platform.Platform.IOS ? prevSpinnerY : initParams.refreshing;
      });
      onRefresh();
      (0, _taptic.runTapticImpactOccurred)('light');
    }
  }, [refreshing, onRefresh, setWaitFetchingTimeout, platform, initParams.refreshing]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (prevTouchDown !== undefined && prevTouchDown && !touchDown) {
      if (!refreshing && canRefresh) {
        runRefreshing();
      } else if (refreshing && !isFetching) {
        // only iOS can start refresh before gesture end
        resetRefreshingState();
      } else {
        // refreshing && isFetching: refresh in progress
        // OR !refreshing && !canRefresh: pull was not strong enough
        setSpinnerY(refreshing ? initParams.refreshing : initParams.start);
        setSpinnerProgress(0);
        setContentShift(0);
      }
    }
  }, [initParams, prevIsFetching, isFetching, onRefreshingFinish, prevTouchDown, touchDown, refreshing, canRefresh, runRefreshing]);
  var onTouchStart = function onTouchStart(e) {
    if (refreshing) {
      cancelEvent(e);
    }
    setTouchDown(true);
  };
  var onTouchMove = function onTouchMove(e) {
    var isY = e.isY,
      shiftY = e.shiftY;
    var start = initParams.start,
      max = initParams.max;
    var pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
    if (watching && touchDown) {
      cancelEvent(e);
      var positionMultiplier = initParams.positionMultiplier,
        maxY = initParams.maxY;
      var shift = Math.max(0, shiftY - touchY.current);
      var currentY = (0, _math.clamp)(start + shift * positionMultiplier, start, maxY);
      var progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;
      setSpinnerY(currentY);
      setSpinnerProgress((0, _math.clamp)(progress, 0, 80));
      setCanRefresh(progress > 80);
      setContentShift((currentY + 10) * 2.3);
      if (progress > 85 && !refreshing && platform === _platform.Platform.IOS) {
        runRefreshing();
      }
    } else if (isY && pageYOffset === 0 && shiftY > 0 && !refreshing && touchDown) {
      cancelEvent(e);
      touchY.current = shiftY;
      setWatching(true);
      setSpinnerY(start);
      setSpinnerProgress(0);
    }
  };
  var onTouchEnd = function onTouchEnd() {
    setWatching(false);
    setTouchDown(false);
  };
  var spinnerTransform = "translate3d(0, ".concat(spinnerY, "px, 0)");
  var contentTransform = '';
  if (platform === _platform.Platform.IOS && refreshing && !touchDown) {
    contentTransform = 'translate3d(0, 100px, 0)';
  } else if (platform === _platform.Platform.IOS && (contentShift || refreshing)) {
    contentTransform = "translate3d(0, ".concat(contentShift, "px, 0)");
  }
  return /*#__PURE__*/React.createElement(_TouchContext.default.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(_Touch.Touch, (0, _extends2.default)({}, restProps, {
    onStart: onTouchStart,
    onMove: onTouchMove,
    onEnd: onTouchEnd,
    className: (0, _vkjs.classNames)("vkuiPullToRefresh", platform === _platform.Platform.IOS && "vkuiPullToRefresh--ios", watching && "vkuiPullToRefresh--watching", refreshing && "vkuiPullToRefresh--refreshing", className)
  }), /*#__PURE__*/React.createElement(_FixedLayout.FixedLayout, {
    className: "vkuiPullToRefresh__controls"
  }, /*#__PURE__*/React.createElement(_PullToRefreshSpinner.PullToRefreshSpinner, {
    style: {
      transform: spinnerTransform,
      WebkitTransform: spinnerTransform,
      opacity: watching || refreshing || canRefresh ? 1 : 0
    },
    on: refreshing,
    progress: refreshing ? undefined : spinnerProgress
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPullToRefresh__content",
    style: {
      transform: contentTransform,
      WebkitTransform: contentTransform
    }
  }, children)));
};
exports.PullToRefresh = PullToRefresh;
//# sourceMappingURL=PullToRefresh.js.map