"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PullToRefresh", {
    enumerable: true,
    get: function() {
        return PullToRefresh;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
const _usePlatform = require("../../hooks/usePlatform");
const _usePrevious = require("../../hooks/usePrevious");
const _useTimeout = require("../../hooks/useTimeout");
const _dom = require("../../lib/dom");
const _touch = require("../../lib/touch");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FixedLayout = require("../FixedLayout/FixedLayout");
const _Touch = require("../Touch/Touch");
const _TouchContext = /*#__PURE__*/ _interop_require_default._(require("../Touch/TouchContext"));
const _PullToRefreshSpinner = require("./PullToRefreshSpinner");
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
const TOUCH_MOVE_EVENT_PARAMS = {
    cancelable: true,
    passive: false
};
const PullToRefresh = (_param)=>{
    var { children, isFetching, onRefresh, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "isFetching",
        "onRefresh",
        "className"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const scroll = (0, _ScrollContext.useScroll)();
    const { document } = (0, _dom.useDOM)();
    const prevIsFetching = (0, _usePrevious.usePrevious)(isFetching);
    const initParams = _react.useMemo(()=>({
            start: platform === 'ios' ? -10 : -45,
            max: platform === 'ios' ? 50 : 80,
            maxY: platform === 'ios' ? 400 : 80,
            refreshing: platform === 'ios' ? 36 : 50,
            positionMultiplier: platform === 'ios' ? 0.21 : 1
        }), [
        platform
    ]);
    const [spinnerY, setSpinnerY] = _react.useState(initParams.start);
    const [watching, setWatching] = _react.useState(false);
    const [refreshing, setRefreshing] = _react.useState(false);
    const [canRefresh, setCanRefresh] = _react.useState(false);
    const [touchDown, setTouchDown] = _react.useState(false);
    const prevTouchDown = (0, _usePrevious.usePrevious)(touchDown);
    const touchY = _react.useRef(0);
    const [contentShift, setContentShift] = _react.useState(0);
    const [spinnerProgress, setSpinnerProgress] = _react.useState(0);
    const resetRefreshingState = _react.useCallback(()=>{
        setWatching(false);
        setCanRefresh(false);
        setRefreshing(false);
        setSpinnerY(initParams.start);
        setSpinnerProgress(0);
        setContentShift(0);
    }, [
        initParams
    ]);
    const onRefreshingFinish = _react.useCallback(()=>{
        if (!touchDown) {
            resetRefreshingState();
        }
    }, [
        touchDown,
        resetRefreshingState
    ]);
    const { set: setWaitFetchingTimeout, clear: clearWaitFetchingTimeout } = (0, _useTimeout.useTimeout)(onRefreshingFinish, 1000);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (prevIsFetching !== undefined && prevIsFetching && !isFetching) {
            onRefreshingFinish();
        }
    }, [
        prevIsFetching,
        isFetching,
        onRefreshingFinish
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (prevIsFetching !== undefined && !prevIsFetching && isFetching) {
            clearWaitFetchingTimeout();
        }
    }, [
        isFetching,
        prevIsFetching,
        clearWaitFetchingTimeout
    ]);
    const runRefreshing = _react.useCallback(()=>{
        if (!refreshing && onRefresh) {
            // cleanup if the consumer does not start fetching in 1s
            setWaitFetchingTimeout();
            setRefreshing(true);
            setSpinnerY((prevSpinnerY)=>platform === 'ios' ? prevSpinnerY : initParams.refreshing);
            onRefresh();
        }
    }, [
        refreshing,
        onRefresh,
        setWaitFetchingTimeout,
        platform,
        initParams.refreshing
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
    const startYRef = _react.useRef(0);
    const onTouchStart = (e)=>{
        if (refreshing) {
            cancelEvent(e);
        }
        setTouchDown(true);
        startYRef.current = e.startY;
        if (document) {
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.add('vkui--disable-overscroll-behavior');
        }
    };
    const shouldPreventTouchMove = (event)=>{
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
     * */ const shiftY = (0, _touch.coordY)(event) - startYRef.current;
        const pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        const isRefreshGestureStarted = pageYOffset === 0 && shiftY > 0 && touchDown;
        return isRefreshGestureStarted;
    };
    const onWindowTouchMove = (event)=>{
        if (shouldPreventTouchMove(event)) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    (0, _useGlobalEventListener.useGlobalEventListener)(document, 'touchmove', onWindowTouchMove, TOUCH_MOVE_EVENT_PARAMS);
    const onTouchMove = (e)=>{
        const { isY, shiftY } = e;
        const { start, max } = initParams;
        const pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        if (watching && touchDown) {
            cancelEvent(e);
            const { positionMultiplier, maxY } = initParams;
            const shift = Math.max(0, shiftY - touchY.current);
            const currentY = (0, _math.clamp)(start + shift * positionMultiplier, start, maxY);
            const progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;
            setSpinnerY(currentY);
            setSpinnerProgress((0, _math.clamp)(progress, 0, 80));
            setCanRefresh(progress > 80);
            setContentShift((currentY + 10) * 2.3);
            if (progress > 85 && !refreshing && platform === 'ios') {
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
    const onTouchEnd = ()=>{
        setWatching(false);
        setTouchDown(false);
        // восстанавливаем overscroll behavior
        if (document) {
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.remove('vkui--disable-overscroll-behavior');
        }
    };
    const spinnerTransform = `translate3d(0, ${spinnerY}px, 0)`;
    let contentTransform = '';
    if (platform === 'ios' && refreshing && !touchDown) {
        contentTransform = 'translate3d(0, 100px, 0)';
    } else if (platform === 'ios' && (contentShift || refreshing)) {
        contentTransform = `translate3d(0, ${contentShift}px, 0)`;
    }
    return /*#__PURE__*/ _react.createElement(_TouchContext.default.Provider, {
        value: true
    }, /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread_props._(_object_spread._({
        "aria-live": "polite",
        "aria-busy": !!isFetching
    }, restProps), {
        onStart: onTouchStart,
        onMove: onTouchMove,
        onEnd: onTouchEnd,
        className: (0, _vkjs.classNames)("vkuiPullToRefresh", platform === 'ios' && "vkuiPullToRefresh--ios", watching && "vkuiPullToRefresh--watching", refreshing && "vkuiPullToRefresh--refreshing", className)
    }), /*#__PURE__*/ _react.createElement(_FixedLayout.FixedLayout, {
        className: "vkuiPullToRefresh__controls",
        useParentWidth: true
    }, /*#__PURE__*/ _react.createElement(_PullToRefreshSpinner.PullToRefreshSpinner, {
        style: {
            transform: spinnerTransform,
            WebkitTransform: spinnerTransform,
            opacity: watching || refreshing || canRefresh ? 1 : 0
        },
        on: refreshing,
        progress: refreshing ? undefined : spinnerProgress
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPullToRefresh__content",
        style: {
            transform: contentTransform,
            WebkitTransform: contentTransform
        }
    }, children)));
};

//# sourceMappingURL=PullToRefresh.js.map