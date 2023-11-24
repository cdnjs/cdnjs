import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { usePrevious } from "../../hooks/usePrevious";
import { useTimeout } from "../../hooks/useTimeout";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
import { runTapticImpactOccurred } from "../../lib/taptic";
import { coordY } from "../../lib/touch";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useScroll } from "../AppRoot/ScrollContext";
import { FixedLayout } from "../FixedLayout/FixedLayout";
import { Touch } from "../Touch/Touch";
import TouchRootContext from "../Touch/TouchContext";
import { PullToRefreshSpinner } from "./PullToRefreshSpinner";
function cancelEvent(event) {
    if (!event) {
        return false;
    }
    while(event.originalEvent){
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
 */ export var PullToRefresh = function(_param) {
    var children = _param.children, isFetching = _param.isFetching, onRefresh = _param.onRefresh, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "isFetching",
        "onRefresh",
        "className"
    ]);
    var platform = usePlatform();
    var scroll = useScroll();
    var document = useDOM().document;
    var prevIsFetching = usePrevious(isFetching);
    var initParams = React.useMemo(function() {
        return {
            start: platform === Platform.IOS ? -10 : -45,
            max: platform === Platform.IOS ? 50 : 80,
            maxY: platform === Platform.IOS ? 400 : 80,
            refreshing: platform === Platform.IOS ? 36 : 50,
            positionMultiplier: platform === Platform.IOS ? 0.21 : 1
        };
    }, [
        platform
    ]);
    var _React_useState = _sliced_to_array(React.useState(initParams.start), 2), spinnerY = _React_useState[0], setSpinnerY = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), watching = _React_useState1[0], setWatching = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(false), 2), refreshing = _React_useState2[0], setRefreshing = _React_useState2[1];
    var _React_useState3 = _sliced_to_array(React.useState(false), 2), canRefresh = _React_useState3[0], setCanRefresh = _React_useState3[1];
    var _React_useState4 = _sliced_to_array(React.useState(false), 2), touchDown = _React_useState4[0], setTouchDown = _React_useState4[1];
    var prevTouchDown = usePrevious(touchDown);
    var touchY = React.useRef(0);
    var _React_useState5 = _sliced_to_array(React.useState(0), 2), contentShift = _React_useState5[0], setContentShift = _React_useState5[1];
    var _React_useState6 = _sliced_to_array(React.useState(0), 2), spinnerProgress = _React_useState6[0], setSpinnerProgress = _React_useState6[1];
    var resetRefreshingState = React.useCallback(function() {
        setWatching(false);
        setCanRefresh(false);
        setRefreshing(false);
        setSpinnerY(initParams.start);
        setSpinnerProgress(0);
        setContentShift(0);
    }, [
        initParams
    ]);
    var onRefreshingFinish = React.useCallback(function() {
        if (!touchDown) {
            resetRefreshingState();
        }
    }, [
        touchDown,
        resetRefreshingState
    ]);
    var _useTimeout = useTimeout(onRefreshingFinish, 1000), setWaitFetchingTimeout = _useTimeout.set, clearWaitFetchingTimeout = _useTimeout.clear;
    useIsomorphicLayoutEffect(function() {
        if (prevIsFetching !== undefined && prevIsFetching && !isFetching) {
            onRefreshingFinish();
        }
    }, [
        prevIsFetching,
        isFetching,
        onRefreshingFinish
    ]);
    useIsomorphicLayoutEffect(function() {
        if (prevIsFetching !== undefined && !prevIsFetching && isFetching) {
            clearWaitFetchingTimeout();
        }
    }, [
        isFetching,
        prevIsFetching,
        clearWaitFetchingTimeout
    ]);
    var runRefreshing = React.useCallback(function() {
        if (!refreshing && onRefresh) {
            // cleanup if the consumer does not start fetching in 1s
            setWaitFetchingTimeout();
            setRefreshing(true);
            setSpinnerY(function(prevSpinnerY) {
                return platform === Platform.IOS ? prevSpinnerY : initParams.refreshing;
            });
            var runTapticImpactOccurredCalled = onRefresh();
            // TODO [>=6]: удалить блок кода (#5049)
            if (!runTapticImpactOccurredCalled) {
                runTapticImpactOccurred("light");
            }
        }
    }, [
        refreshing,
        onRefresh,
        setWaitFetchingTimeout,
        platform,
        initParams.refreshing
    ]);
    useIsomorphicLayoutEffect(function() {
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
    }, [
        initParams,
        prevIsFetching,
        isFetching,
        onRefreshingFinish,
        prevTouchDown,
        touchDown,
        refreshing,
        canRefresh,
        runRefreshing
    ]);
    var startYRef = React.useRef(0);
    var onTouchStart = function(e) {
        if (refreshing) {
            cancelEvent(e);
        }
        setTouchDown(true);
        startYRef.current = e.startY;
        if (document) {
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.add("vkui--disable-overscroll-behavior");
        }
    };
    var shouldPreventTouchMove = function(event) {
        if (watching || refreshing) {
            return true;
        }
        /* Нам нужно запретить touchmove у документа как только стало понятно, что
     * начинается pull.
     * состояния watching и refreshing устанавливаются слишком поздно и браузер
     * может успеть начать нативный pull to refresh.
     *
     * Этот код является запасным вариантом, на случай, если css свойство
     * overscroll-behavior не поддерживается
     * */ var shiftY = coordY(event) - startYRef.current;
        var pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        var isRefreshGestureStarted = pageYOffset === 0 && shiftY > 0 && touchDown;
        return isRefreshGestureStarted;
    };
    var onWindowTouchMove = function(event) {
        if (shouldPreventTouchMove(event)) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    useGlobalEventListener(document, "touchmove", onWindowTouchMove, TOUCH_MOVE_EVENT_PARAMS);
    var onTouchMove = function(e) {
        var isY = e.isY, shiftY = e.shiftY;
        var start = initParams.start, max = initParams.max;
        var pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        if (watching && touchDown) {
            cancelEvent(e);
            var positionMultiplier = initParams.positionMultiplier, maxY = initParams.maxY;
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
    var onTouchEnd = function() {
        setWatching(false);
        setTouchDown(false);
        // восстанавливаем overscroll behavior
        if (document) {
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.remove("vkui--disable-overscroll-behavior");
        }
    };
    var spinnerTransform = "translate3d(0, ".concat(spinnerY, "px, 0)");
    var contentTransform = "";
    if (platform === Platform.IOS && refreshing && !touchDown) {
        contentTransform = "translate3d(0, 100px, 0)";
    } else if (platform === Platform.IOS && (contentShift || refreshing)) {
        contentTransform = "translate3d(0, ".concat(contentShift, "px, 0)");
    }
    return /*#__PURE__*/ React.createElement(TouchRootContext.Provider, {
        value: true
    }, /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({}, restProps), {
        onStart: onTouchStart,
        onMove: onTouchMove,
        onEnd: onTouchEnd,
        className: classNames("vkuiPullToRefresh", platform === Platform.IOS && "vkuiPullToRefresh--ios", watching && "vkuiPullToRefresh--watching", refreshing && "vkuiPullToRefresh--refreshing", className)
    }), /*#__PURE__*/ React.createElement(FixedLayout, {
        className: "vkuiPullToRefresh__controls",
        useParentWidth: true
    }, /*#__PURE__*/ React.createElement(PullToRefreshSpinner, {
        style: {
            transform: spinnerTransform,
            WebkitTransform: spinnerTransform,
            opacity: watching || refreshing || canRefresh ? 1 : 0
        },
        on: refreshing,
        progress: refreshing ? undefined : spinnerProgress
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPullToRefresh__content",
        style: {
            transform: contentTransform,
            WebkitTransform: contentTransform
        }
    }, children)));
};

//# sourceMappingURL=PullToRefresh.js.map