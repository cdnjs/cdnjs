import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { usePrevious } from "../../hooks/usePrevious";
import { useTimeout } from "../../hooks/useTimeout";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { blurActiveElement, canUseDOM, useDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { animationEvent } from "../../lib/supportEvents";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { useScroll } from "../AppRoot/ScrollContext";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { NavTransitionDirectionProvider } from "../NavTransitionDirectionContext/NavTransitionDirectionContext";
import { useSplitCol } from "../SplitCol/SplitColContext";
import { Touch } from "../Touch/Touch";
import { swipeBackExcluded } from "./utils";
var SWIPE_BACK_AREA = 70;
var SwipeBackResults;
(function(SwipeBackResults) {
    SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
    SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
export var scrollsCache = {};
var warn = warnOnce("View");
/**
 * @see https://vkcom.github.io/VKUI/#/View
 */ export var View = function(_param) {
    var activePanelProp = _param.activePanel, history = _param.history, nav = _param.nav, onTransition = _param.onTransition, onSwipeBack = _param.onSwipeBack, onSwipeBackStart = _param.onSwipeBackStart, onSwipeBackCancelProp = _param.onSwipeBackCancel, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
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
    var _configProvider, _splitCol;
    var scrolls = React.useRef(scrollsCache[getNavId({
        nav: nav,
        id: restProps.id
    })] || {});
    var afterTransition = React.useRef(noop);
    React.useEffect(function() {
        return function() {
            var id = getNavId({
                nav: nav,
                id: restProps.id
            });
            if (id) {
                scrollsCache[id] = scrolls.current;
            }
        };
    });
    var panelNodes = React.useRef({});
    var _useDOM = useDOM(), window = _useDOM.window, document = _useDOM.document;
    var scroll = useScroll();
    var configProvider = useConfigProvider();
    var splitCol = useSplitCol();
    var platform = usePlatform();
    var _React_useState = _sliced_to_array(React.useState(false), 2), animated = _React_useState[0], setAnimated = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState([
        activePanelProp
    ]), 2), visiblePanels = _React_useState1[0], setVisiblePanels = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(activePanelProp), 2), activePanel = _React_useState2[0], setActivePanel = _React_useState2[1];
    var _React_useState3 = _sliced_to_array(React.useState(undefined), 2), isBack = _React_useState3[0], setIsBack = _React_useState3[1];
    var _React_useState4 = _sliced_to_array(React.useState(null), 2), prevPanel = _React_useState4[0], setPrevPanel = _React_useState4[1];
    var _React_useState5 = _sliced_to_array(React.useState(null), 2), nextPanel = _React_useState5[0], setNextPanel = _React_useState5[1];
    var _React_useState6 = _sliced_to_array(React.useState(undefined), 2), swipingBack = _React_useState6[0], setSwipingBack = _React_useState6[1];
    var _React_useState7 = _sliced_to_array(React.useState(false), 2), swipeBackPrevented = _React_useState7[0], setSwipeBackPrevented = _React_useState7[1];
    var _React_useState8 = _sliced_to_array(React.useState(0), 2), swipeBackStartX = _React_useState8[0], setSwipeBackStartX = _React_useState8[1];
    var _React_useState9 = _sliced_to_array(React.useState(0), 2), swipeBackShift = _React_useState9[0], setSwipeBackShift = _React_useState9[1];
    var _React_useState10 = _sliced_to_array(React.useState(null), 2), swipeBackNextPanel = _React_useState10[0], setSwipeBackNextPanel = _React_useState10[1];
    var _React_useState11 = _sliced_to_array(React.useState(null), 2), swipeBackPrevPanel = _React_useState11[0], setSwipeBackPrevPanel = _React_useState11[1];
    var _React_useState12 = _sliced_to_array(React.useState(null), 2), swipeBackResult = _React_useState12[0], setSwipeBackResult = _React_useState12[1];
    var _React_useState13 = _sliced_to_array(React.useState(false), 2), browserSwipe = _React_useState13[0], setBrowserSwipe = _React_useState13[1];
    var prevActivePanel = usePrevious(activePanelProp);
    var prevSwipingBack = usePrevious(swipingBack);
    var prevBrowserSwipe = usePrevious(browserSwipe);
    var prevSwipeBackResult = usePrevious(swipeBackResult);
    var prevSwipeBackPrevPanel = usePrevious(swipeBackPrevPanel);
    var prevOnTransition = usePrevious(onTransition);
    var panels = React.Children.toArray(children).filter(function(panel) {
        var panelId = getNavId(panel.props, warn);
        return panelId !== undefined && visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
    });
    var disableAnimation = ((_configProvider = configProvider) === null || _configProvider === void 0 ? void 0 : _configProvider.transitionMotionEnabled) === false || !((_splitCol = splitCol) === null || _splitCol === void 0 ? void 0 : _splitCol.animate) || platform === Platform.VKCOM;
    var pickPanel = function(id) {
        if (id === null) {
            return null;
        }
        return panelNodes.current[id];
    };
    var flushTransition = React.useCallback(function(prevPanel, isBackTransition) {
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
            var _scroll;
            (_scroll = scroll) === null || _scroll === void 0 ? void 0 : _scroll.scrollTo(0, isBackTransition ? scrolls.current[activePanelProp] : 0);
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
    useIsomorphicLayoutEffect(function() {
        afterTransition.current();
        afterTransition.current = noop;
    }, [
        afterTransition.current
    ]);
    var transitionEndHandler = React.useCallback(function(e) {
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
    var waitTransitionFinish = useWaitTransitionFinish().waitTransitionFinish;
    var animationFinishTimeout = useTimeout(transitionEndHandler, platform === Platform.IOS ? 600 : 300);
    var onSwipeBackSuccess = React.useCallback(function() {
        onSwipeBack && onSwipeBack();
    }, [
        onSwipeBack
    ]);
    var onSwipeBackCancel = React.useCallback(function() {
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
    var swipingBackTransitionEndHandler = React.useCallback(function(e) {
        var _e, _e1;
        // indexOf because of vendor prefixes in old browsers
        if (!e || ((_e = e) === null || _e === void 0 ? void 0 : _e.propertyName.includes("transform")) && ((_e1 = e) === null || _e1 === void 0 ? void 0 : _e1.target) === pickPanel(swipeBackNextPanel)) {
            switch(swipeBackResult){
                case SwipeBackResults.fail:
                    onSwipeBackCancel();
                    break;
                case SwipeBackResults.success:
                    onSwipeBackSuccess();
            }
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
        swipeBackNextPanel,
        swipeBackResult
    ]);
    var onMoveX = function(event) {
        var _configProvider;
        if (platform !== Platform.IOS || swipeBackPrevented || swipeBackExcluded(event) || disableAnimation) {
            return;
        }
        if (!((_configProvider = configProvider) === null || _configProvider === void 0 ? void 0 : _configProvider.isWebView)) {
            if ((event.startX <= SWIPE_BACK_AREA || event.startX >= window.innerWidth - SWIPE_BACK_AREA) && !browserSwipe) {
                setBrowserSwipe(true);
            }
            return;
        }
        if (!onSwipeBack || animated && event.startX <= SWIPE_BACK_AREA) {
            return;
        }
        if (!swipingBack && event.startX <= SWIPE_BACK_AREA && history && history.length > 1) {
            // Начался свайп назад
            if (onSwipeBackStart) {
                var payload = onSwipeBackStart(activePanel);
                if (payload === "prevent") {
                    setSwipeBackPrevented(true);
                    return;
                }
            }
            if (activePanel !== null) {
                var _scroll;
                // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                blurActiveElement(document);
                scrolls.current[activePanel] = (_scroll = scroll) === null || _scroll === void 0 ? void 0 : _scroll.getScroll().y;
            }
            setSwipingBack(true);
            setSwipeBackStartX(event.startX);
            setSwipeBackPrevPanel(activePanel);
            setSwipeBackNextPanel(history.slice(-2)[0]);
        }
        if (swipingBack) {
            var swipeBackShift = 0;
            if (event.shiftX < 0) {
                swipeBackShift = 0;
            } else if (event.shiftX > window.innerWidth - swipeBackStartX) {
                swipeBackShift = window.innerWidth;
            } else {
                swipeBackShift = event.shiftX;
            }
            setSwipeBackShift(swipeBackShift);
        }
    };
    var onEnd = React.useCallback(function(event) {
        if (swipingBack) {
            var speed = swipeBackShift / event.duration * 1000;
            var _window_innerWidth;
            if (swipeBackShift === 0) {
                onSwipeBackCancel();
            } else if (swipeBackShift >= ((_window_innerWidth = window.innerWidth) !== null && _window_innerWidth !== void 0 ? _window_innerWidth : 0)) {
                onSwipeBackSuccess();
            } else if (speed > 250 || swipeBackStartX + swipeBackShift > window.innerWidth / 2) {
                setSwipeBackResult(SwipeBackResults.success);
            } else {
                setSwipeBackResult(SwipeBackResults.fail);
            }
        }
        if (swipeBackPrevented) {
            setSwipeBackPrevented(false);
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
        swipeBackShift,
        swipeBackStartX,
        swipingBack,
        swipeBackPrevented,
        window
    ]);
    var calcPanelSwipeStyles = function(panelId) {
        if (!canUseDOM || !window) {
            return {};
        }
        var isPrev = panelId === swipeBackPrevPanel;
        var isNext = panelId === swipeBackNextPanel;
        if (!isPrev && !isNext || swipeBackResult) {
            return {};
        }
        var prevPanelTranslate = "".concat(swipeBackShift, "px");
        var nextPanelTranslate = "".concat(-50 + swipeBackShift * 100 / window.innerWidth / 2, "%");
        var prevPanelShadow = 0.3 * (window.innerWidth - swipeBackShift) / window.innerWidth;
        if (swipeBackResult) {
            return isPrev ? {
                boxShadow: "-2px 0 12px rgba(0, 0, 0, ".concat(prevPanelShadow, ")")
            } : {};
        }
        if (isNext) {
            return {
                transform: "translate3d(".concat(nextPanelTranslate, ", 0, 0)"),
                WebkitTransform: "translate3d(".concat(nextPanelTranslate, ", 0, 0)")
            };
        }
        if (isPrev) {
            return {
                transform: "translate3d(".concat(prevPanelTranslate, ", 0, 0)"),
                WebkitTransform: "translate3d(".concat(prevPanelTranslate, ", 0, 0)"),
                boxShadow: "-2px 0 12px rgba(0, 0, 0, ".concat(prevPanelShadow, ")")
            };
        }
        return {};
    };
    React.useEffect(function() {
        // Нужен переход
        if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
            var _scroll;
            var firstLayerId = React.Children.toArray(children).map(function(panel) {
                return getNavId(panel.props, warn);
            }).find(function(id) {
                return id === prevActivePanel || id === activePanelProp;
            });
            var isBackTransition = firstLayerId === activePanelProp;
            scrolls.current[prevActivePanel] = (_scroll = scroll) === null || _scroll === void 0 ? void 0 : _scroll.getScroll().y;
            if (disableAnimation) {
                flushTransition(prevActivePanel, isBackTransition);
            } else {
                blurActiveElement(document);
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
                if (!animationEvent.supported) {
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
                    var _scroll;
                    (_scroll = scroll) === null || _scroll === void 0 ? void 0 : _scroll.scrollTo(0, scrolls.current[nextPanel]);
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
            waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === Platform.IOS ? 600 : 300);
        }
        // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
        if (prevSwipeBackResult === SwipeBackResults.fail && !swipeBackResult && activePanel !== null) {
            var _scroll1;
            (_scroll1 = scroll) === null || _scroll1 === void 0 ? void 0 : _scroll1.scrollTo(0, scrolls.current[activePanel]);
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
        onSwipeBackStart,
        panels,
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
        swipingBack,
        swipingBackTransitionEndHandler,
        waitTransitionFinish
    ]);
    return /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        className: classNames("vkuiView", platform === Platform.IOS && classNames("vkuiView--ios", "vkuiInternalView--ios"), !disableAnimation && animated && "vkuiView--animated", !disableAnimation && swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
        onMoveX: onMoveX,
        onEnd: onEnd
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiView__panels"
    }, panels.map(function(panel) {
        var panelId = getNavId(panel.props, warn);
        var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        var _scrolls_current_panelId;
        return /*#__PURE__*/ React.createElement("div", {
            className: classNames("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === SwipeBackResults.success && "vkuiView__panel--swipe-back-success", swipeBackResult === SwipeBackResults.fail && "vkuiView__panel--swipe-back-failed"),
            onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
            ref: function(el) {
                return panelId !== undefined && (panelNodes.current[panelId] = el);
            },
            style: calcPanelSwipeStyles(panelId),
            key: panelId
        }, /*#__PURE__*/ React.createElement("div", {
            className: "vkuiView__panel-in",
            style: {
                marginTop: compensateScroll ? -((_scrolls_current_panelId = scrolls.current[panelId]) !== null && _scrolls_current_panelId !== void 0 ? _scrolls_current_panelId : 0) : undefined
            }
        }, /*#__PURE__*/ React.createElement(NavTransitionDirectionProvider, {
            isBack: swipingBack || isBack
        }, /*#__PURE__*/ React.createElement(NavTransitionProvider, {
            entering: panelId === nextPanel || panelId === swipeBackNextPanel
        }, panel))));
    })));
};

//# sourceMappingURL=View.js.map