"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    View: function() {
        return View;
    },
    scrollsCache: function() {
        return scrollsCache;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _usePrevious = require("../../hooks/usePrevious");
const _useTimeout = require("../../hooks/useTimeout");
const _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
const _dom = require("../../lib/dom");
const _getNavId = require("../../lib/getNavId");
const _supportEvents = require("../../lib/supportEvents");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _NavIdContext = require("../NavIdContext/NavIdContext");
const _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
const _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
const _SplitColContext = require("../SplitCol/SplitColContext");
const _Touch = require("../Touch/Touch");
const _utils = require("./utils");
let scrollsCache = {};
const warn = (0, _warnOnce.warnOnce)('View');
const View = (_param)=>{
    var { activePanel: activePanelProp, history, nav, onTransition, onSwipeBack, onSwipeBackStart, onSwipeBackCancel: onSwipeBackCancelProp, children, className } = _param, restProps = _object_without_properties._(_param, [
        "activePanel",
        "history",
        "nav",
        "onTransition",
        "onSwipeBack",
        "onSwipeBackStart",
        "onSwipeBackCancel",
        "children",
        "className"
    ]);
    const id = (0, _getNavId.getNavId)({
        nav,
        id: restProps.id
    });
    const scrolls = _react.useRef(scrollsCache[id] || {});
    const afterTransition = _react.useRef(_vkjs.noop);
    _react.useEffect(()=>()=>{
            if (id) {
                scrollsCache[id] = scrolls.current;
            }
        });
    const panelNodes = _react.useRef({});
    const { window, document } = (0, _dom.useDOM)();
    const scroll = (0, _ScrollContext.useScroll)();
    const configProvider = (0, _ConfigProviderContext.useConfigProvider)();
    const splitCol = (0, _SplitColContext.useSplitCol)();
    const platform = (0, _usePlatform.usePlatform)();
    const [animated, setAnimated] = _react.useState(false);
    const [visiblePanels, setVisiblePanels] = _react.useState([
        activePanelProp
    ]);
    const [activePanel, setActivePanel] = _react.useState(activePanelProp);
    const [isBack, setIsBack] = _react.useState(undefined);
    const [prevPanel, setPrevPanel] = _react.useState(null);
    const [nextPanel, setNextPanel] = _react.useState(null);
    const swipeBackPrevented = _react.useRef(false);
    const [swipingBack, setSwipingBack] = _react.useState(undefined);
    const [swipeBackStartX, setSwipeBackStartX] = _react.useState(0);
    const [swipeBackShift, setSwipeBackShift] = _react.useState(0);
    const [swipeBackNextPanel, setSwipeBackNextPanel] = _react.useState(null);
    const [swipeBackPrevPanel, setSwipeBackPrevPanel] = _react.useState(null);
    const [swipeBackResult, setSwipeBackResult] = _react.useState(null);
    const [browserSwipe, setBrowserSwipe] = _react.useState(false);
    const prevActivePanel = (0, _usePrevious.usePrevious)(activePanelProp);
    const prevSwipingBack = (0, _usePrevious.usePrevious)(swipingBack);
    const prevBrowserSwipe = (0, _usePrevious.usePrevious)(browserSwipe);
    const prevSwipeBackResult = (0, _usePrevious.usePrevious)(swipeBackResult);
    const prevSwipeBackShift = (0, _usePrevious.usePrevious)(swipeBackShift);
    const prevSwipeBackPrevPanel = (0, _usePrevious.usePrevious)(swipeBackPrevPanel);
    const prevOnTransition = (0, _usePrevious.usePrevious)(onTransition);
    const panels = _react.Children.toArray(children).filter((panel)=>{
        const panelId = (0, _getNavId.getNavId)(panel.props, warn);
        return panelId !== undefined && visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
    });
    const disableAnimation = !configProvider.transitionMotionEnabled || !splitCol.animate || platform === 'vkcom';
    const iOSSwipeBackSimulationEnabled = !disableAnimation && platform === 'ios' && configProvider.isWebView && Boolean(onSwipeBack);
    const pickPanel = (id)=>{
        if (id === null) {
            return null;
        }
        return panelNodes.current[id];
    };
    const flushTransition = _react.useCallback((prevPanel, isBackTransition)=>{
        if (isBackTransition) {
            scrolls.current[prevPanel] = 0;
        }
        setPrevPanel(null);
        setNextPanel(null);
        setVisiblePanels([
            activePanelProp
        ]);
        setActivePanel(activePanelProp);
        setAnimated(false);
        setIsBack(isBackTransition);
        afterTransition.current = ()=>{
            scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, isBackTransition ? scrolls.current[activePanelProp] : 0);
            onTransition && onTransition({
                isBack: isBackTransition,
                from: prevPanel,
                to: activePanelProp
            });
        };
    }, [
        activePanelProp,
        onTransition,
        scroll
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        afterTransition.current();
        afterTransition.current = _vkjs.noop;
    }, [
        afterTransition.current
    ]);
    const transitionEndHandler = _react.useCallback((e)=>{
        if ((!e || [
            "vkuianimation-ios-next-forward",
            "vkuianimation-ios-prev-back",
            "vkuianimation-view-next-forward",
            "vkuianimation-view-prev-back"
        ].includes(e.animationName)) && prevPanel !== null) {
            flushTransition(prevPanel, Boolean(isBack));
        }
    }, [
        flushTransition,
        isBack,
        prevPanel
    ]);
    const { waitTransitionFinish } = (0, _useWaitTransitionFinish.useWaitTransitionFinish)();
    const animationFinishTimeout = (0, _useTimeout.useTimeout)(transitionEndHandler, platform === 'ios' ? 600 : 300);
    const onSwipeBackSuccess = _react.useCallback(()=>{
        onSwipeBack && onSwipeBack();
    }, [
        onSwipeBack
    ]);
    const onSwipeBackCancel = _react.useCallback(()=>{
        onSwipeBackCancelProp && onSwipeBackCancelProp();
        setSwipeBackPrevPanel(null);
        setSwipeBackNextPanel(null);
        setSwipingBack(false);
        setSwipeBackResult(null);
        setSwipeBackStartX(0);
        setSwipeBackShift(0);
    }, [
        onSwipeBackCancelProp
    ]);
    const swipingBackTransitionEndHandler = _react.useCallback((e)=>{
        // indexOf because of vendor prefixes in old browsers
        if (!e || (e === null || e === void 0 ? void 0 : e.propertyName.includes('transform')) && (e === null || e === void 0 ? void 0 : e.target) === pickPanel(swipeBackNextPanel)) {
            switch(swipeBackResult){
                case 'fail':
                    onSwipeBackCancel();
                    break;
                case 'success':
                    onSwipeBackSuccess();
            }
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
        swipeBackNextPanel,
        swipeBackResult
    ]);
    const handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext = (event)=>{
        if (browserSwipe) {
            return;
        }
        const { swipeBackTriggered, viewportStartEdgeTouched, viewportEndEdgeTouched } = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, window.innerWidth);
        if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
            setBrowserSwipe(true);
        }
    };
    const handleTouchMoveXForIOSSwipeBackSimulation = (event)=>{
        if (swipeBackPrevented.current || (0, _utils.swipeBackExcluded)(event)) {
            return;
        }
        const { swipedToOpposite, swipeBackTriggered, viewportStartEdgeTouched } = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, window.innerWidth);
        if (animated && swipeBackTriggered) {
            return;
        }
        if (!swipingBack && history && history.length > 1) {
            if (swipedToOpposite) {
                swipeBackPrevented.current = true;
                return;
            }
            if (!swipeBackTriggered) {
                return;
            }
            if (!viewportStartEdgeTouched && (0, _utils.hasHorizontalScrollableElementWithScrolledToLeft)(event.originalEvent.target)) {
                swipeBackPrevented.current = true;
                return;
            }
            // Начался свайп назад
            if (onSwipeBackStart) {
                const payload = onSwipeBackStart(activePanel);
                if (payload === 'prevent') {
                    swipeBackPrevented.current = true;
                    return;
                }
            }
            if (activePanel !== null) {
                // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                (0, _dom.blurActiveElement)(document);
                scrolls.current[activePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
            }
            setSwipingBack(true);
            setSwipeBackStartX(event.startX);
            setSwipeBackPrevPanel(activePanel);
            setSwipeBackNextPanel(history.slice(-2)[0]);
        }
        if (swipingBack) {
            if (event.shiftX < 0) {
                setSwipeBackShift(0);
            } else if (event.shiftX > window.innerWidth - swipeBackStartX) {
                setSwipeBackShift(window.innerWidth);
            } else {
                setSwipeBackShift(event.shiftX);
            }
        }
    };
    const handleTouchEndForIOSSwipeBackSimulation = (event)=>{
        swipeBackPrevented.current = false;
        if (swipingBack) {
            const speed = swipeBackShift / event.duration * 1000;
            var _window_innerWidth;
            if (swipeBackShift === 0) {
                onSwipeBackCancel();
            } else if (swipeBackShift >= ((_window_innerWidth = window.innerWidth) !== null && _window_innerWidth !== void 0 ? _window_innerWidth : 0)) {
                onSwipeBackSuccess();
            } else if (speed > 250 || swipeBackShift >= window.innerWidth / 2) {
                setSwipeBackResult('success');
            } else {
                setSwipeBackResult('fail');
            }
        }
    };
    const calcPanelSwipeStyles = (panelId)=>{
        if (!_dom.canUseDOM || !window) {
            return {};
        }
        const isPrev = panelId === swipeBackPrevPanel;
        const isNext = panelId === swipeBackNextPanel;
        if (!isPrev && !isNext || swipeBackResult) {
            return {};
        }
        let prevPanelTranslate = `${swipeBackShift}px`;
        let nextPanelTranslate = `${-50 + swipeBackShift * 100 / window.innerWidth / 2}%`;
        if (isNext) {
            return {
                transform: `translate3d(${nextPanelTranslate}, 0, 0)`,
                WebkitTransform: `translate3d(${nextPanelTranslate}, 0, 0)`
            };
        }
        if (isPrev) {
            return {
                transform: `translate3d(${prevPanelTranslate}, 0, 0)`,
                WebkitTransform: `translate3d(${prevPanelTranslate}, 0, 0)`
            };
        }
        return {};
    };
    const calcPanelSwipeBackOverlayStyles = (panelId)=>{
        if (!_dom.canUseDOM || !window) {
            return {};
        }
        const isNext = panelId === swipeBackNextPanel;
        if (!isNext) {
            return {};
        }
        const calculatedOpacity = 1 - swipeBackShift / window.innerWidth;
        const opacityOnSwipeEnd = swipeBackResult === 'success' ? 0 : swipeBackResult === 'fail' ? 1 : null;
        return {
            display: 'block',
            opacity: opacityOnSwipeEnd === null ? calculatedOpacity : opacityOnSwipeEnd
        };
    };
    _react.useEffect(()=>{
        // Нужен переход
        if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
            const firstLayerId = _react.Children.toArray(children).map((panel)=>(0, _getNavId.getNavId)(panel.props, warn)).find((id)=>id === prevActivePanel || id === activePanelProp);
            const isBackTransition = firstLayerId === activePanelProp;
            scrolls.current[prevActivePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
            if (disableAnimation) {
                flushTransition(prevActivePanel, isBackTransition);
            } else {
                (0, _dom.blurActiveElement)(document);
                setVisiblePanels([
                    prevActivePanel,
                    activePanelProp
                ]);
                setPrevPanel(prevActivePanel);
                setNextPanel(activePanelProp);
                setActivePanel(null);
                setAnimated(true);
                setIsBack(isBackTransition);
                // Фолбек анимации перехода
                if (!_supportEvents.animationEvent.supported) {
                    animationFinishTimeout.set();
                }
            }
        }
        // Закончилась анимация свайпа назад
        if (prevActivePanel && prevActivePanel !== activePanelProp && prevSwipingBack) {
            const nextPanel = activePanelProp;
            const prevPanel = prevActivePanel;
            if (prevSwipeBackPrevPanel) {
                scrolls.current[prevSwipeBackPrevPanel] = 0;
            }
            setSwipeBackPrevPanel(null);
            setSwipeBackNextPanel(null);
            setSwipingBack(false);
            setSwipeBackResult(null);
            setSwipeBackStartX(0);
            setSwipeBackShift(0);
            setActivePanel(nextPanel);
            setVisiblePanels([
                nextPanel
            ]);
            setIsBack(true);
            afterTransition.current = ()=>{
                if (nextPanel !== null) {
                    scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, scrolls.current[nextPanel]);
                }
                prevOnTransition && prevOnTransition({
                    isBack: true,
                    from: prevPanel,
                    to: nextPanel
                });
            };
        }
        // Началась анимация завершения свайпа назад.
        if (!prevSwipeBackResult && swipeBackResult) {
            waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === 'ios' ? 600 : 300);
        }
        // Закончился Safari свайп
        if (prevActivePanel !== activePanelProp && browserSwipe) {
            setBrowserSwipe(false);
            setNextPanel(null);
            setPrevPanel(null);
            setAnimated(false);
            setVisiblePanels([
                activePanelProp
            ]);
            setActivePanel(activePanelProp);
        }
    }, [
        activePanelProp,
        activePanel,
        animationFinishTimeout,
        browserSwipe,
        children,
        disableAnimation,
        document,
        flushTransition,
        platform,
        prevActivePanel,
        prevBrowserSwipe,
        prevOnTransition,
        prevSwipeBackPrevPanel,
        prevSwipeBackResult,
        prevSwipingBack,
        scroll,
        swipeBackNextPanel,
        swipeBackResult,
        swipingBackTransitionEndHandler,
        waitTransitionFinish
    ]);
    _react.useEffect(function restoreScrollPositionWhenSwipeBackIsCancelled() {
        // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
        const swipeBackCancelledInTheMiddleOfAction = prevSwipeBackResult === 'fail' && !swipeBackResult;
        const swipeBackCancelledByMovingPanelBackToInitialPoint = prevSwipingBack && !swipingBack && prevSwipeBackShift === 0;
        if ((swipeBackCancelledInTheMiddleOfAction || swipeBackCancelledByMovingPanelBackToInitialPoint) && activePanel !== null) {
            scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, scrolls.current[activePanel]);
        }
    }, [
        prevSwipeBackResult,
        swipeBackResult,
        prevSwipingBack,
        swipingBack,
        prevSwipeBackShift,
        activePanel,
        scroll
    ]);
    return /*#__PURE__*/ _react.createElement(_NavIdContext.NavViewIdContext.Provider, {
        value: id
    }, /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread_props._(_object_spread._({
        Component: "section"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiView", platform === 'ios' && (0, _vkjs.classNames)("vkuiView--ios", 'vkuiInternalView--ios'), !disableAnimation && animated && "vkuiView--animated", !disableAnimation && swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
        onMoveX: iOSSwipeBackSimulationEnabled ? handleTouchMoveXForIOSSwipeBackSimulation : platform === 'ios' ? handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
        onEnd: iOSSwipeBackSimulationEnabled ? handleTouchEndForIOSSwipeBackSimulation : undefined
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiView__panels"
    }, panels.map((panel)=>{
        const panelId = (0, _getNavId.getNavId)(panel.props, warn);
        const isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        const isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        const compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        var _scrolls_current_panelId;
        return /*#__PURE__*/ _react.createElement("div", {
            className: (0, _vkjs.classNames)("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === 'success' && "vkuiView__panel--swipe-back-success", swipeBackResult === 'fail' && "vkuiView__panel--swipe-back-failed"),
            onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
            ref: (el)=>panelId !== undefined && (panelNodes.current[panelId] = el),
            style: calcPanelSwipeStyles(panelId),
            key: panelId
        }, platform === 'ios' && /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiView__panel-overlay",
            style: calcPanelSwipeBackOverlayStyles(panelId)
        }), /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiView__panel-in",
            style: {
                marginTop: compensateScroll ? -((_scrolls_current_panelId = scrolls.current[panelId]) !== null && _scrolls_current_panelId !== void 0 ? _scrolls_current_panelId : 0) : undefined
            }
        }, /*#__PURE__*/ _react.createElement(_NavTransitionDirectionContext.NavTransitionDirectionProvider, {
            isBack: swipingBack || isBack
        }, /*#__PURE__*/ _react.createElement(_NavTransitionContext.NavTransitionProvider, {
            entering: panelId === nextPanel || panelId === swipeBackNextPanel
        }, panel))));
    }))));
};

//# sourceMappingURL=View.js.map