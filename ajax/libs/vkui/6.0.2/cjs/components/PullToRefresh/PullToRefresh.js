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
const _usePlatform = require("../../hooks/usePlatform");
const _usePrevious = require("../../hooks/usePrevious");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _FixedLayout = require("../FixedLayout/FixedLayout");
const _Touch = require("../Touch/Touch");
const _TouchContext = /*#__PURE__*/ _interop_require_default._(require("../Touch/TouchContext"));
const _PullToRefreshSpinner = require("./PullToRefreshSpinner");
const WAIT_FETCHING_TIMEOUT_MS = 1000;
function cancelEvent(event) {
    /* istanbul ignore if: неясно в какой ситуации `event` из `Touch` может быть не определён */ if (!event) {
        return false;
    }
    if ('preventDefault' in event.originalEvent && event.originalEvent.cancelable) {
        event.originalEvent.preventDefault();
    }
    if ('stopPropagation' in event.originalEvent) {
        event.originalEvent.stopPropagation();
    }
    return false;
}
const PullToRefresh = (_param)=>{
    var { children, isFetching, onRefresh, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "isFetching",
        "onRefresh",
        "className"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const scroll = (0, _ScrollContext.useScroll)();
    const { window, document } = (0, _dom.useDOM)();
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
    const waitFetchingTimeoutId = _react.useRef();
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
            clearTimeout(waitFetchingTimeoutId.current);
        }
    }, [
        isFetching,
        prevIsFetching
    ]);
    const runRefreshing = _react.useCallback(()=>{
        if (!refreshing && onRefresh) {
            // cleanup if the consumer does not start fetching in 1s
            clearTimeout(waitFetchingTimeoutId.current);
            waitFetchingTimeoutId.current = setTimeout(onRefreshingFinish, WAIT_FETCHING_TIMEOUT_MS);
            setRefreshing(true);
            setSpinnerY((prevSpinnerY)=>platform === 'ios' ? prevSpinnerY : initParams.refreshing);
            onRefresh();
        }
    }, [
        refreshing,
        onRefresh,
        onRefreshingFinish,
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
            /* istanbul ignore if: TODO написать тест */ } else {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function toggleBodyOverscrollBehavior() {
        /* istanbul ignore if: невозможный кейс, т.к. в SSR эффекты не вызываются. Проверка на будущее, если вдруг эффект будет вызываться. */ if (!window || !document) {
            return;
        }
        /**
       * ⚠️ В частности, необходимо для iOS 15. Начиная с этой версии в Safari добавили
       * pull-to-refresh. CSS св-во `overflow-behavior` появился только с iOS 16.
       *
       * Во вторую очередь, полезна блокированием скролла, чтобы пользователь дождался обновления
       * данных.
       */ /* istanbul ignore next: в jest не протестировать */ const handleWindowTouchMoveForPreventIOSViewportBounce = (event)=>{
            event.preventDefault();
            event.stopPropagation();
        };
        if (watching || refreshing) {
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.add('vkui--disable-overscroll-behavior');
            /* istanbul ignore next: в jest не протестировать */ window.addEventListener('touchmove', handleWindowTouchMoveForPreventIOSViewportBounce, {
                passive: false
            });
        }
        return ()=>{
            // eslint-disable-next-line no-restricted-properties
            document.documentElement.classList.remove('vkui--disable-overscroll-behavior');
            /* istanbul ignore next: в jest не протестировать */ window.removeEventListener('touchmove', handleWindowTouchMoveForPreventIOSViewportBounce);
        };
    }, [
        window,
        document,
        watching,
        refreshing
    ]);
    const startYRef = _react.useRef(0);
    const onTouchStart = (event)=>{
        if (refreshing) {
            cancelEvent(event);
            return;
        }
        setTouchDown(true);
        startYRef.current = event.startY;
    };
    const iosRefreshStartedRef = _react.useRef(false);
    const onTouchMove = (event)=>{
        const { isY, shiftY } = event;
        const { start, max } = initParams;
        const pageYOffset = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        if (watching && touchDown) {
            cancelEvent(event);
            const { positionMultiplier, maxY } = initParams;
            const shift = Math.max(0, shiftY - touchY.current);
            const currentY = (0, _math.clamp)(start + shift * positionMultiplier, start, maxY);
            const progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;
            setSpinnerY(currentY);
            setSpinnerProgress((0, _math.clamp)(progress, 0, 80));
            setCanRefresh(progress > 80);
            setContentShift((currentY + 10) * 2.3);
            const iosCanStartRefreshDuringGesture = platform === 'ios' && progress > 85 && !refreshing && !iosRefreshStartedRef.current;
            if (iosCanStartRefreshDuringGesture) {
                iosRefreshStartedRef.current = true;
                runRefreshing();
            }
        } else if (isY && pageYOffset === 0 && shiftY > 0 && !refreshing && touchDown) {
            cancelEvent(event);
            touchY.current = shiftY;
            setWatching(true);
            setSpinnerY(start);
            setSpinnerProgress(0);
        }
    };
    const onTouchEnd = ()=>{
        setWatching(false);
        setTouchDown(false);
        iosRefreshStartedRef.current = false;
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