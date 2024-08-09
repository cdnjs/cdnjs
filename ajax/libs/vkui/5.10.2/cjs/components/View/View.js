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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _usePrevious = require("../../hooks/usePrevious");
var _useTimeout = require("../../hooks/useTimeout");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _supportEvents = require("../../lib/supportEvents");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _NavIdContext = require("../NavIdContext/NavIdContext");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
var _SplitColContext = require("../SplitCol/SplitColContext");
var _Touch = require("../Touch/Touch");
var _utils = require("./utils");
var SwipeBackResults;
(function(SwipeBackResults) {
    SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
    SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
var scrollsCache = {};
var warn = (0, _warnOnce.warnOnce)("View");
var View = function(_param) {
    var activePanelProp = _param.activePanel, history = _param.history, nav = _param.nav, onTransition = _param.onTransition, onSwipeBack = _param.onSwipeBack, onSwipeBackStart = _param.onSwipeBackStart, onSwipeBackCancelProp = _param.onSwipeBackCancel, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
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
    var id = (0, _getNavId.getNavId)({
        nav: nav,
        id: restProps.id
    });
    var scrolls = _react.useRef(scrollsCache[id] || {});
    var afterTransition = _react.useRef(_vkjs.noop);
    _react.useEffect(function() {
        return function() {
            if (id) {
                scrollsCache[id] = scrolls.current;
            }
        };
    });
    var panelNodes = _react.useRef({});
    var _useDOM = (0, _dom.useDOM)(), window = _useDOM.window, document = _useDOM.document;
    var scroll = (0, _ScrollContext.useScroll)();
    var configProvider = (0, _ConfigProviderContext.useConfigProvider)();
    var splitCol = (0, _SplitColContext.useSplitCol)();
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), animated = _React_useState[0], setAnimated = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState([
        activePanelProp
    ]), 2), visiblePanels = _React_useState1[0], setVisiblePanels = _React_useState1[1];
    var _React_useState2 = _sliced_to_array._(_react.useState(activePanelProp), 2), activePanel = _React_useState2[0], setActivePanel = _React_useState2[1];
    var _React_useState3 = _sliced_to_array._(_react.useState(undefined), 2), isBack = _React_useState3[0], setIsBack = _React_useState3[1];
    var _React_useState4 = _sliced_to_array._(_react.useState(null), 2), prevPanel = _React_useState4[0], setPrevPanel = _React_useState4[1];
    var _React_useState5 = _sliced_to_array._(_react.useState(null), 2), nextPanel = _React_useState5[0], setNextPanel = _React_useState5[1];
    var swipeBackPrevented = _react.useRef(false);
    var _React_useState6 = _sliced_to_array._(_react.useState(undefined), 2), swipingBack = _React_useState6[0], setSwipingBack = _React_useState6[1];
    var _React_useState7 = _sliced_to_array._(_react.useState(0), 2), swipeBackStartX = _React_useState7[0], setSwipeBackStartX = _React_useState7[1];
    var _React_useState8 = _sliced_to_array._(_react.useState(0), 2), swipeBackShift = _React_useState8[0], setSwipeBackShift = _React_useState8[1];
    var _React_useState9 = _sliced_to_array._(_react.useState(null), 2), swipeBackNextPanel = _React_useState9[0], setSwipeBackNextPanel = _React_useState9[1];
    var _React_useState10 = _sliced_to_array._(_react.useState(null), 2), swipeBackPrevPanel = _React_useState10[0], setSwipeBackPrevPanel = _React_useState10[1];
    var _React_useState11 = _sliced_to_array._(_react.useState(null), 2), swipeBackResult = _React_useState11[0], setSwipeBackResult = _React_useState11[1];
    var _React_useState12 = _sliced_to_array._(_react.useState(false), 2), browserSwipe = _React_useState12[0], setBrowserSwipe = _React_useState12[1];
    var prevActivePanel = (0, _usePrevious.usePrevious)(activePanelProp);
    var prevSwipingBack = (0, _usePrevious.usePrevious)(swipingBack);
    var prevBrowserSwipe = (0, _usePrevious.usePrevious)(browserSwipe);
    var prevSwipeBackResult = (0, _usePrevious.usePrevious)(swipeBackResult);
    var prevSwipeBackShift = (0, _usePrevious.usePrevious)(swipeBackShift);
    var prevSwipeBackPrevPanel = (0, _usePrevious.usePrevious)(swipeBackPrevPanel);
    var prevOnTransition = (0, _usePrevious.usePrevious)(onTransition);
    var panels = _react.Children.toArray(children).filter(function(panel) {
        var panelId = (0, _getNavId.getNavId)(panel.props, warn);
        return panelId !== undefined && visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
    });
    var disableAnimation = !configProvider.transitionMotionEnabled || !splitCol.animate || platform === _platform.Platform.VKCOM;
    var iOSSwipeBackSimulationEnabled = !disableAnimation && platform === _platform.Platform.IOS && configProvider.isWebView && Boolean(onSwipeBack);
    var pickPanel = function(id) {
        if (id === null) {
            return null;
        }
        return panelNodes.current[id];
    };
    var flushTransition = _react.useCallback(function(prevPanel, isBackTransition) {
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
        afterTransition.current = function() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        afterTransition.current();
        afterTransition.current = _vkjs.noop;
    }, [
        afterTransition.current
    ]);
    var transitionEndHandler = _react.useCallback(function(e) {
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
    var waitTransitionFinish = (0, _useWaitTransitionFinish.useWaitTransitionFinish)().waitTransitionFinish;
    var animationFinishTimeout = (0, _useTimeout.useTimeout)(transitionEndHandler, platform === _platform.Platform.IOS ? 600 : 300);
    var onSwipeBackSuccess = _react.useCallback(function() {
        onSwipeBack && onSwipeBack();
    }, [
        onSwipeBack
    ]);
    var onSwipeBackCancel = _react.useCallback(function() {
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
    var swipingBackTransitionEndHandler = _react.useCallback(function(e) {
        // indexOf because of vendor prefixes in old browsers
        if (!e || (e === null || e === void 0 ? void 0 : e.propertyName.includes("transform")) && (e === null || e === void 0 ? void 0 : e.target) === pickPanel(swipeBackNextPanel)) {
            switch(swipeBackResult){
                case 1:
                    onSwipeBackCancel();
                    break;
                case 2:
                    onSwipeBackSuccess();
            }
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
        swipeBackNextPanel,
        swipeBackResult
    ]);
    var handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext = function(event) {
        if (browserSwipe) {
            return;
        }
        var _getSwipeBackPredicates = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, window.innerWidth), swipeBackTriggered = _getSwipeBackPredicates.swipeBackTriggered, viewportStartEdgeTouched = _getSwipeBackPredicates.viewportStartEdgeTouched, viewportEndEdgeTouched = _getSwipeBackPredicates.viewportEndEdgeTouched;
        if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
            setBrowserSwipe(true);
        }
    };
    var handleTouchMoveXForIOSSwipeBackSimulation = function(event) {
        if (swipeBackPrevented.current || (0, _utils.swipeBackExcluded)(event)) {
            return;
        }
        var _getSwipeBackPredicates = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, window.innerWidth), swipedToOpposite = _getSwipeBackPredicates.swipedToOpposite, swipeBackTriggered = _getSwipeBackPredicates.swipeBackTriggered, viewportStartEdgeTouched = _getSwipeBackPredicates.viewportStartEdgeTouched;
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
                var payload = onSwipeBackStart(activePanel);
                if (payload === "prevent") {
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
    var handleTouchEndForIOSSwipeBackSimulation = function(event) {
        swipeBackPrevented.current = false;
        if (swipingBack) {
            var speed = swipeBackShift / event.duration * 1000;
            var _window_innerWidth;
            if (swipeBackShift === 0) {
                onSwipeBackCancel();
            } else if (swipeBackShift >= ((_window_innerWidth = window.innerWidth) !== null && _window_innerWidth !== void 0 ? _window_innerWidth : 0)) {
                onSwipeBackSuccess();
            } else if (speed > 250 || swipeBackShift >= window.innerWidth / 2) {
                setSwipeBackResult(2);
            } else {
                setSwipeBackResult(1);
            }
        }
    };
    var calcPanelSwipeStyles = function(panelId) {
        if (!_dom.canUseDOM || !window) {
            return {};
        }
        var isPrev = panelId === swipeBackPrevPanel;
        var isNext = panelId === swipeBackNextPanel;
        if (!isPrev && !isNext || swipeBackResult) {
            return {};
        }
        var prevPanelTranslate = "".concat(swipeBackShift, "px");
        var nextPanelTranslate = "".concat(-50 + swipeBackShift * 100 / window.innerWidth / 2, "%");
        if (isNext) {
            return {
                transform: "translate3d(".concat(nextPanelTranslate, ", 0, 0)"),
                WebkitTransform: "translate3d(".concat(nextPanelTranslate, ", 0, 0)")
            };
        }
        if (isPrev) {
            return {
                transform: "translate3d(".concat(prevPanelTranslate, ", 0, 0)"),
                WebkitTransform: "translate3d(".concat(prevPanelTranslate, ", 0, 0)")
            };
        }
        return {};
    };
    var calcPanelSwipeBackOverlayStyles = function(panelId) {
        if (!_dom.canUseDOM || !window) {
            return {};
        }
        var isNext = panelId === swipeBackNextPanel;
        if (!isNext) {
            return {};
        }
        var calculatedOpacity = 1 - swipeBackShift / window.innerWidth;
        var opacityOnSwipeEnd = swipeBackResult === 2 ? 0 : swipeBackResult === 1 ? 1 : null;
        return {
            display: "block",
            opacity: opacityOnSwipeEnd === null ? calculatedOpacity : opacityOnSwipeEnd
        };
    };
    _react.useEffect(function() {
        // Нужен переход
        if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
            var firstLayerId = _react.Children.toArray(children).map(function(panel) {
                return (0, _getNavId.getNavId)(panel.props, warn);
            }).find(function(id) {
                return id === prevActivePanel || id === activePanelProp;
            });
            var isBackTransition = firstLayerId === activePanelProp;
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
            var nextPanel = activePanelProp;
            var prevPanel = prevActivePanel;
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
            afterTransition.current = function() {
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
            waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === _platform.Platform.IOS ? 600 : 300);
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
        var swipeBackCancelledInTheMiddleOfAction = prevSwipeBackResult === 1 && !swipeBackResult;
        var swipeBackCancelledByMovingPanelBackToInitialPoint = prevSwipingBack && !swipingBack && prevSwipeBackShift === 0;
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
        className: (0, _vkjs.classNames)("vkuiView", platform === _platform.Platform.IOS && (0, _vkjs.classNames)("vkuiView--ios", "vkuiInternalView--ios"), !disableAnimation && animated && "vkuiView--animated", !disableAnimation && swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
        onMoveX: iOSSwipeBackSimulationEnabled ? handleTouchMoveXForIOSSwipeBackSimulation : platform === _platform.Platform.IOS ? handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
        onEnd: iOSSwipeBackSimulationEnabled ? handleTouchEndForIOSSwipeBackSimulation : undefined
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiView__panels"
    }, panels.map(function(panel) {
        var panelId = (0, _getNavId.getNavId)(panel.props, warn);
        var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        var _scrolls_current_panelId;
        return /*#__PURE__*/ _react.createElement("div", {
            className: (0, _vkjs.classNames)("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === 2 && "vkuiView__panel--swipe-back-success", swipeBackResult === 1 && "vkuiView__panel--swipe-back-failed"),
            onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
            ref: function(el) {
                return panelId !== undefined && (panelNodes.current[panelId] = el);
            },
            style: calcPanelSwipeStyles(panelId),
            key: panelId
        }, platform === _platform.Platform.IOS && /*#__PURE__*/ _react.createElement("div", {
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