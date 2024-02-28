import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { clamp } from '../../helpers/math';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { usePlatform } from '../../hooks/usePlatform';
import { usePrevious } from '../../hooks/usePrevious';
import { useTimeout } from '../../hooks/useTimeout';
import { useDOM } from '../../lib/dom';
import { Platform } from '../../lib/platform';
import { runTapticImpactOccurred } from '../../lib/taptic';
import { coordY } from '../../lib/touch';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useScroll } from '../AppRoot/ScrollContext';
import { FixedLayout } from '../FixedLayout/FixedLayout';
import { Touch } from '../Touch/Touch';
import TouchRootContext from '../Touch/TouchContext';
import { PullToRefreshSpinner } from './PullToRefreshSpinner';
import styles from './PullToRefresh.module.css';
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
/**
 * @see https://vkcom.github.io/VKUI/#/PullToRefresh
 */ export const PullToRefresh = ({ children, isFetching, onRefresh, className, ...restProps })=>{
    const platform = usePlatform();
    const scroll = useScroll();
    const { document } = useDOM();
    const prevIsFetching = usePrevious(isFetching);
    const initParams = React.useMemo(()=>({
            start: platform === Platform.IOS ? -10 : -45,
            max: platform === Platform.IOS ? 50 : 80,
            maxY: platform === Platform.IOS ? 400 : 80,
            refreshing: platform === Platform.IOS ? 36 : 50,
            positionMultiplier: platform === Platform.IOS ? 0.21 : 1
        }), [
        platform
    ]);
    const [spinnerY, setSpinnerY] = React.useState(initParams.start);
    const [watching, setWatching] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [canRefresh, setCanRefresh] = React.useState(false);
    const [touchDown, setTouchDown] = React.useState(false);
    const prevTouchDown = usePrevious(touchDown);
    const touchY = React.useRef(0);
    const [contentShift, setContentShift] = React.useState(0);
    const [spinnerProgress, setSpinnerProgress] = React.useState(0);
    const resetRefreshingState = React.useCallback(()=>{
        setWatching(false);
        setCanRefresh(false);
        setRefreshing(false);
        setSpinnerY(initParams.start);
        setSpinnerProgress(0);
        setContentShift(0);
    }, [
        initParams
    ]);
    const onRefreshingFinish = React.useCallback(()=>{
        if (!touchDown) {
            resetRefreshingState();
        }
    }, [
        touchDown,
        resetRefreshingState
    ]);
    const { set: setWaitFetchingTimeout, clear: clearWaitFetchingTimeout } = useTimeout(onRefreshingFinish, 1000);
    useIsomorphicLayoutEffect(()=>{
        if (prevIsFetching !== undefined && prevIsFetching && !isFetching) {
            onRefreshingFinish();
        }
    }, [
        prevIsFetching,
        isFetching,
        onRefreshingFinish
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (prevIsFetching !== undefined && !prevIsFetching && isFetching) {
            clearWaitFetchingTimeout();
        }
    }, [
        isFetching,
        prevIsFetching,
        clearWaitFetchingTimeout
    ]);
    const runRefreshing = React.useCallback(()=>{
        if (!refreshing && onRefresh) {
            // cleanup if the consumer does not start fetching in 1s
            setWaitFetchingTimeout();
            setRefreshing(true);
            setSpinnerY((prevSpinnerY)=>platform === Platform.IOS ? prevSpinnerY : initParams.refreshing);
            const runTapticImpactOccurredCalled = onRefresh();
            // TODO [>=6]: удалить блок кода (#5049)
            if (!runTapticImpactOccurredCalled) {
                runTapticImpactOccurred('light');
            }
        }
    }, [
        refreshing,
        onRefresh,
        setWaitFetchingTimeout,
        platform,
        initParams.refreshing
    ]);
    useIsomorphicLayoutEffect(()=>{
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
    const startYRef = React.useRef(0);
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
     * */ const shiftY = coordY(event) - startYRef.current;
        const pageYOffset = scroll?.getScroll().y;
        const isRefreshGestureStarted = pageYOffset === 0 && shiftY > 0 && touchDown;
        return isRefreshGestureStarted;
    };
    const onWindowTouchMove = (event)=>{
        if (shouldPreventTouchMove(event)) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    useGlobalEventListener(document, 'touchmove', onWindowTouchMove, TOUCH_MOVE_EVENT_PARAMS);
    const onTouchMove = (e)=>{
        const { isY, shiftY } = e;
        const { start, max } = initParams;
        const pageYOffset = scroll?.getScroll().y;
        if (watching && touchDown) {
            cancelEvent(e);
            const { positionMultiplier, maxY } = initParams;
            const shift = Math.max(0, shiftY - touchY.current);
            const currentY = clamp(start + shift * positionMultiplier, start, maxY);
            const progress = currentY > -10 ? Math.abs((currentY + 10) / max) * 80 : 0;
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
    if (platform === Platform.IOS && refreshing && !touchDown) {
        contentTransform = 'translate3d(0, 100px, 0)';
    } else if (platform === Platform.IOS && (contentShift || refreshing)) {
        contentTransform = `translate3d(0, ${contentShift}px, 0)`;
    }
    return /*#__PURE__*/ React.createElement(TouchRootContext.Provider, {
        value: true
    }, /*#__PURE__*/ React.createElement(Touch, {
        ...restProps,
        onStart: onTouchStart,
        onMove: onTouchMove,
        onEnd: onTouchEnd,
        className: classNames(styles['PullToRefresh'], platform === Platform.IOS && styles['PullToRefresh--ios'], watching && styles['PullToRefresh--watching'], refreshing && styles['PullToRefresh--refreshing'], className)
    }, /*#__PURE__*/ React.createElement(FixedLayout, {
        className: styles['PullToRefresh__controls'],
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
        className: styles['PullToRefresh__content'],
        style: {
            transform: contentTransform,
            WebkitTransform: contentTransform
        }
    }, children)));
};

//# sourceMappingURL=PullToRefresh.js.map