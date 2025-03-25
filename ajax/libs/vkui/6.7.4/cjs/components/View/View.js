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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _usePrevious = require("../../hooks/usePrevious");
const _dom = require("../../lib/dom");
const _getNavId = require("../../lib/getNavId");
const _warnOnce = require("../../lib/warnOnce");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _NavIdContext = require("../NavIdContext/NavIdContext");
const _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
const _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
const _SplitColContext = require("../SplitCol/SplitColContext");
const _Touch = require("../Touch/Touch");
const _useLayoutEffectCall = require("./useLayoutEffectCall");
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
    const layoutEffectCall = (0, _useLayoutEffectCall.useLayoutEffectCall)();
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
        layoutEffectCall(()=>{
            scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, isBackTransition ? scrolls.current[activePanelProp] : 0);
            onTransition && onTransition({
                isBack: isBackTransition,
                from: prevPanel,
                to: activePanelProp
            });
        });
    }, [
        activePanelProp,
        layoutEffectCall,
        onTransition,
        scroll
    ]);
    const handleAnimatedTargetAnimationEnd = ()=>{
        if (prevPanel !== null) {
            flushTransition(prevPanel, Boolean(isBack));
        }
    };
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
    const swipingBackTransitionEndHandler = _react.useCallback(()=>{
        switch(swipeBackResult){
            case 'fail':
                onSwipeBackCancel();
                break;
            case 'success':
                onSwipeBackSuccess();
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
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
    const calcPanelSwipeStyles = (isPrev, isNext)=>{
        if (!isPrev && !isNext || swipeBackResult) {
            return {};
        }
        if (isNext) {
            return window ? {
                transform: `translate3d(${-50 + swipeBackShift * 100 / window.innerWidth / 2}%, 0, 0)`
            } : {};
        }
        if (isPrev) {
            return {
                transform: `translate3d(${swipeBackShift}px, 0, 0)`
            };
        }
        return {};
    };
    const calcPanelSwipeBackOverlayStyles = (isNext)=>{
        if (!window || !isNext) {
            return {};
        }
        const opacityOnSwipeEnd = swipeBackResult === 'success' ? 0 : swipeBackResult === 'fail' ? 1 : null;
        return {
            display: 'block',
            opacity: opacityOnSwipeEnd === null ? 1 - swipeBackShift / window.innerWidth : opacityOnSwipeEnd
        };
    };
    const handleSwipeBackTargetTransitionEnd = (event)=>{
        if (event.propertyName.includes('transform')) {
            swipingBackTransitionEndHandler();
        }
    };
    _react.useEffect(()=>{
        // Нужен переход
        if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
            const firstLayerId = _react.Children.toArray(children).map((panel)=>(0, _getNavId.getNavId)(panel.props, warn)).find((id)=>id === prevActivePanel || id === activePanelProp);
            const isBackTransition = firstLayerId === activePanelProp;
            scrolls.current[prevActivePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll({
                compensateKeyboardHeight: false
            }).y;
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
            layoutEffectCall(()=>{
                if (nextPanel !== null) {
                    scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, scrolls.current[nextPanel]);
                }
                prevOnTransition && prevOnTransition({
                    isBack: true,
                    from: prevPanel,
                    to: nextPanel
                });
            });
        }
        // Началась анимация завершения свайпа назад.
        // см. `onTransitionEnd()`
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
        browserSwipe,
        children,
        disableAnimation,
        document,
        flushTransition,
        prevActivePanel,
        prevBrowserSwipe,
        prevOnTransition,
        prevSwipeBackPrevPanel,
        prevSwipeBackResult,
        prevSwipingBack,
        scroll,
        swipeBackNextPanel,
        swipeBackResult,
        layoutEffectCall
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavIdContext.NavViewIdContext.Provider, {
        value: id,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Touch.Touch, _object_spread_props._(_object_spread._({
            Component: "section"
        }, restProps), {
            className: (0, _vkjs.classNames)("vkuiView", platform === 'ios' && (0, _vkjs.classNames)("vkuiView--ios", 'vkuiInternalView--ios'), !disableAnimation && animated && "vkuiView--animated", !disableAnimation && swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
            onMoveX: iOSSwipeBackSimulationEnabled ? handleTouchMoveXForIOSSwipeBackSimulation : platform === 'ios' ? handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
            onEnd: iOSSwipeBackSimulationEnabled ? handleTouchEndForIOSSwipeBackSimulation : undefined,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiView__panels",
                children: panels.map((panel)=>{
                    const panelId = (0, _getNavId.getNavId)(panel.props, warn);
                    const isPanelActive = panelId === activePanel;
                    const isPanelPrev = panelId === prevPanel;
                    const isPanelNext = panelId === nextPanel;
                    const isAnimatedTarget = animated && (isBack ? isPanelPrev : isPanelNext);
                    const isSwipeBackPrev = panelId === swipeBackPrevPanel;
                    const isSwipeBackNext = panelId === swipeBackNextPanel;
                    const isSwipeBackTarget = swipeBackResult && isSwipeBackPrev;
                    let scrollCompensateStyle = undefined;
                    if (isPanelPrev || isPanelNext && isBack || isSwipeBackPrev || isSwipeBackNext) {
                        const marginTop = scrolls.current[panelId];
                        if (marginTop !== undefined) {
                            scrollCompensateStyle = {
                                marginTop: -1 * marginTop
                            };
                        }
                    }
                    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: (0, _vkjs.classNames)("vkuiView__panel", isPanelActive && "vkuiView__panel--active", isPanelPrev && "vkuiView__panel--prev", isPanelNext && "vkuiView__panel--next", isSwipeBackPrev && "vkuiView__panel--swipe-back-prev", isSwipeBackNext && "vkuiView__panel--swipe-back-next", swipeBackResult === 'success' && "vkuiView__panel--swipe-back-success", swipeBackResult === 'fail' && "vkuiView__panel--swipe-back-failed"),
                        onTransitionEnd: isSwipeBackTarget ? handleSwipeBackTargetTransitionEnd : undefined,
                        onAnimationEnd: isAnimatedTarget ? handleAnimatedTargetAnimationEnd : undefined,
                        ref: (el)=>panelId !== undefined && (panelNodes.current[panelId] = el),
                        style: calcPanelSwipeStyles(isSwipeBackPrev, isSwipeBackNext),
                        children: [
                            platform === 'ios' && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiView__panel-overlay",
                                style: calcPanelSwipeBackOverlayStyles(isSwipeBackNext)
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiView__panel-in",
                                style: scrollCompensateStyle,
                                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavTransitionDirectionContext.NavTransitionDirectionProvider, {
                                    isBack: swipingBack || isBack,
                                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavTransitionContext.NavTransitionProvider, {
                                        entering: panelId === nextPanel || panelId === swipeBackNextPanel,
                                        children: panel
                                    })
                                })
                            })
                        ]
                    }, panelId);
                })
            })
        }))
    });
};

//# sourceMappingURL=View.js.map