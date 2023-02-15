import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "isFetching", "onRefresh", "className"];
import * as React from 'react';
import { useDOM } from '../../lib/dom';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { runTapticImpactOccurred } from '../../lib/taptic';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { usePlatform } from '../../hooks/usePlatform';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useScroll } from '../AppRoot/ScrollContext';
import { Touch } from '../Touch/Touch';
import { FixedLayout } from '../FixedLayout/FixedLayout';
import { PullToRefreshSpinner } from './PullToRefreshSpinner';
import TouchRootContext from '../Touch/TouchContext';
import { usePrevious } from '../../hooks/usePrevious';
import { useTimeout } from '../../hooks/useTimeout';
import { clamp } from '../../helpers/math';
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
export var PullToRefresh = function PullToRefresh(_ref) {
  var children = _ref.children,
    isFetching = _ref.isFetching,
    onRefresh = _ref.onRefresh,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var scroll = useScroll();
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var prevIsFetching = usePrevious(isFetching);
  var initParams = React.useMemo(function () {
    return {
      start: platform === Platform.IOS ? -10 : -45,
      max: platform === Platform.IOS ? 50 : 80,
      maxY: platform === Platform.IOS ? 400 : 80,
      refreshing: platform === Platform.IOS ? 36 : 50,
      positionMultiplier: platform === Platform.IOS ? 0.21 : 1
    };
  }, [platform]);
  var _React$useState = React.useState(initParams.start),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    spinnerY = _React$useState2[0],
    setSpinnerY = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    watching = _React$useState4[0],
    setWatching = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    refreshing = _React$useState6[0],
    setRefreshing = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    canRefresh = _React$useState8[0],
    setCanRefresh = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    touchDown = _React$useState10[0],
    setTouchDown = _React$useState10[1];
  var prevTouchDown = usePrevious(touchDown);
  var touchY = React.useRef(0);
  var _React$useState11 = React.useState(0),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    contentShift = _React$useState12[0],
    setContentShift = _React$useState12[1];
  var _React$useState13 = React.useState(0),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    spinnerProgress = _React$useState14[0],
    setSpinnerProgress = _React$useState14[1];
  var onWindowTouchMove = function onWindowTouchMove(event) {
    if (refreshing) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  useGlobalEventListener(document, 'touchmove', onWindowTouchMove, TOUCH_MOVE_EVENT_PARAMS);
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
  var _useTimeout = useTimeout(onRefreshingFinish, 1000),
    setWaitFetchingTimeout = _useTimeout.set,
    clearWaitFetchingTimeout = _useTimeout.clear;
  useIsomorphicLayoutEffect(function () {
    if (prevIsFetching !== undefined && prevIsFetching && !isFetching) {
      onRefreshingFinish();
    }
  }, [prevIsFetching, isFetching, onRefreshingFinish]);
  useIsomorphicLayoutEffect(function () {
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
        return platform === Platform.IOS ? prevSpinnerY : initParams.refreshing;
      });
      onRefresh();
      runTapticImpactOccurred('light');
    }
  }, [refreshing, onRefresh, setWaitFetchingTimeout, platform, initParams.refreshing]);
  useIsomorphicLayoutEffect(function () {
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
      var currentY = clamp(start + shift * positionMultiplier, start, maxY);
      var progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;
      setSpinnerY(currentY);
      setSpinnerProgress(clamp(progress, 0, 80));
      setCanRefresh(progress > 80);
      setContentShift((currentY + 10) * 2.3);
      if (progress > 85 && !refreshing && platform === Platform.IOS) {
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
  if (platform === Platform.IOS && refreshing && !touchDown) {
    contentTransform = 'translate3d(0, 100px, 0)';
  } else if (platform === Platform.IOS && (contentShift || refreshing)) {
    contentTransform = "translate3d(0, ".concat(contentShift, "px, 0)");
  }
  return /*#__PURE__*/React.createElement(TouchRootContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(Touch, _extends({}, restProps, {
    onStart: onTouchStart,
    onMove: onTouchMove,
    onEnd: onTouchEnd,
    className: classNames("vkuiPullToRefresh", platform === Platform.IOS && "vkuiPullToRefresh--ios", watching && "vkuiPullToRefresh--watching", refreshing && "vkuiPullToRefresh--refreshing", className)
  }), /*#__PURE__*/React.createElement(FixedLayout, {
    className: "vkuiPullToRefresh__controls"
  }, /*#__PURE__*/React.createElement(PullToRefreshSpinner, {
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
//# sourceMappingURL=PullToRefresh.js.map