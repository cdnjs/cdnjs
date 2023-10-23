import { _ as _assert_this_initialized } from "@swc/helpers/_/_assert_this_initialized";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _inherits } from "@swc/helpers/_/_inherits";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _create_super } from "@swc/helpers/_/_create_super";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { withContext } from "../../hoc/withContext";
import { withPlatform } from "../../hoc/withPlatform";
import { canUseDOM, withDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { animationEvent, transitionEvent } from "../../lib/supportEvents";
import { warnOnce } from "../../lib/warnOnce";
import { ScrollContext } from "../AppRoot/ScrollContext";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import { NavViewIdContext } from "../NavIdContext/NavIdContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { NavTransitionDirectionProvider } from "../NavTransitionDirectionContext/NavTransitionDirectionContext";
import { SplitColContext } from "../SplitCol/SplitColContext";
import { Touch } from "../Touch/Touch";
import { getSwipeBackPredicates, hasHorizontalScrollableElementWithScrolledToLeft, swipeBackExcluded } from "./utils";
var warn = warnOnce("ViewInfinite");
var SwipeBackResults;
(function(SwipeBackResults) {
    SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
    SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
export var scrollsCache = {};
var _React_Component;
var ViewInfiniteComponent = /*#__PURE__*/ function(_superClass) {
    "use strict";
    _inherits(ViewInfiniteComponent, _superClass);
    var _super = _create_super(ViewInfiniteComponent);
    function ViewInfiniteComponent(props) {
        _class_call_check(this, ViewInfiniteComponent);
        var _this;
        _this = _super.call(this, props);
        _define_property(_assert_this_initialized(_this), "swipeBackPrevented", false);
        _define_property(_assert_this_initialized(_this), "scrolls", scrollsCache[getNavId(_this.props, warn)] || {});
        _define_property(_assert_this_initialized(_this), "transitionFinishTimeout", undefined);
        _define_property(_assert_this_initialized(_this), "animationFinishTimeout", undefined);
        _define_property(_assert_this_initialized(_this), "panelNodes", {});
        _define_property(_assert_this_initialized(_this), "transitionEndHandler", function(e) {
            if ((!e || [
                "vkuianimation-ios-next-forward",
                "vkuianimation-ios-prev-back",
                "vkuianimation-view-next-forward",
                "vkuianimation-view-prev-back"
            ].includes(e.animationName)) && _this.state.prevPanel !== null) {
                _this.flushTransition(_this.state.prevPanel, Boolean(_this.state.isBack));
            }
        });
        _define_property(_assert_this_initialized(_this), "swipingBackTransitionEndHandler", function(e) {
            // indexOf because of vendor prefixes in old browsers
            if (!e || e.propertyName.includes("transform") && e.target === _this.pickPanel(_this.state.swipeBackNextPanel)) {
                switch(_this.state.swipeBackResult){
                    case 1:
                        _this.onSwipeBackCancel();
                        break;
                    case 2:
                        _this.onSwipeBackSuccess();
                }
            }
        });
        _define_property(_assert_this_initialized(_this), "handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext", function(event) {
            if (_this.state.browserSwipe) {
                return;
            }
            var _getSwipeBackPredicates = getSwipeBackPredicates(event.startX, event.shiftX, _this.window.innerWidth), swipeBackTriggered = _getSwipeBackPredicates.swipeBackTriggered, viewportStartEdgeTouched = _getSwipeBackPredicates.viewportStartEdgeTouched, viewportEndEdgeTouched = _getSwipeBackPredicates.viewportEndEdgeTouched;
            if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
                _this.setState({
                    browserSwipe: true
                });
            }
        });
        _define_property(_assert_this_initialized(_this), "handleTouchMoveXForIOSSwipeBackSimulation", function(event) {
            if (_this.swipeBackPrevented || swipeBackExcluded(event)) {
                return;
            }
            var _getSwipeBackPredicates = getSwipeBackPredicates(event.startX, event.shiftX, _this.window.innerWidth), swipedToOpposite = _getSwipeBackPredicates.swipedToOpposite, swipeBackTriggered = _getSwipeBackPredicates.swipeBackTriggered, viewportStartEdgeTouched = _getSwipeBackPredicates.viewportStartEdgeTouched;
            if (_this.state.animated && swipeBackTriggered) {
                return;
            }
            if (!_this.state.swipingBack && _this.props.history && _this.props.history.length > 1) {
                if (swipedToOpposite) {
                    _this.swipeBackPrevented = true;
                    return;
                }
                if (!swipeBackTriggered) {
                    return;
                }
                if (!viewportStartEdgeTouched && hasHorizontalScrollableElementWithScrolledToLeft(event.originalEvent.target)) {
                    _this.swipeBackPrevented = true;
                    return;
                }
                // Начался свайп назад
                if (_this.props.onSwipeBackStart) {
                    var payload = _this.props.onSwipeBackStart(_this.state.activePanel);
                    if (payload === "prevent") {
                        _this.swipeBackPrevented = true;
                        return;
                    }
                }
                if (_this.state.activePanel !== null) {
                    var _this_props_scroll;
                    // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                    _this.blurActiveElement();
                    var prevScrolls = _this.scrolls[_this.state.activePanel] || [];
                    _this.scrolls = _object_spread_props(_object_spread({}, _this.scrolls), _define_property({}, _this.state.activePanel, _to_consumable_array(prevScrolls).concat([
                        (_this_props_scroll = _this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.getScroll().y
                    ])));
                }
                _this.setState({
                    swipingBack: true,
                    swipeBackStartX: event.startX,
                    swipeBackPrevPanel: _this.state.activePanel,
                    swipeBackNextPanel: _this.props.history.slice(-2)[0]
                });
            }
            if (_this.state.swipingBack) {
                if (event.shiftX < 0) {
                    _this.setState({
                        swipeBackShift: 0
                    });
                } else if (event.shiftX > _this.window.innerWidth - _this.state.swipeBackStartX) {
                    _this.setState({
                        swipeBackShift: _this.window.innerWidth
                    });
                } else {
                    _this.setState({
                        swipeBackShift: event.shiftX
                    });
                }
            }
        });
        _define_property(_assert_this_initialized(_this), "handleTouchEndForIOSSwipeBackSimulation", function(event) {
            _this.swipeBackPrevented = false;
            if (_this.state.swipingBack && _this.window) {
                var speed = _this.state.swipeBackShift / event.duration * 1000;
                if (_this.state.swipeBackShift === 0) {
                    _this.onSwipeBackCancel();
                } else if (_this.state.swipeBackShift >= _this.window.innerWidth) {
                    _this.onSwipeBackSuccess();
                } else if (speed > 250 || _this.state.swipeBackShift >= _this.window.innerWidth / 2) {
                    _this.setState({
                        swipeBackResult: 2
                    });
                } else {
                    _this.setState({
                        swipeBackResult: 1
                    });
                }
            }
        });
        _this.state = {
            animated: false,
            visiblePanels: [
                props.activePanel
            ],
            activePanel: props.activePanel,
            isBack: undefined,
            prevPanel: null,
            nextPanel: null,
            swipingBack: undefined,
            swipeBackStartX: 0,
            swipeBackShift: 0,
            swipeBackNextPanel: null,
            swipeBackPrevPanel: null,
            swipeBackResult: null,
            browserSwipe: false
        };
        return _this;
    }
    _create_class(ViewInfiniteComponent, [
        {
            key: "document",
            get: function get() {
                return this.props.document;
            }
        },
        {
            key: "window",
            get: function get() {
                return this.props.window;
            }
        },
        {
            key: "panels",
            get: function get() {
                return React.Children.toArray(this.props.children);
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                var id = getNavId(this.props);
                if (id) {
                    scrollsCache[id] = this.scrolls;
                }
                if (this.animationFinishTimeout) {
                    clearTimeout(this.animationFinishTimeout);
                }
            }
        },
        {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                var _this = this;
                // Нужен переход
                if (prevProps.activePanel !== this.props.activePanel && !prevState.swipingBack && !prevState.browserSwipe) {
                    var _this_props_scroll;
                    var isBack = false;
                    if (this.props.isBackCheck) {
                        isBack = this.props.isBackCheck({
                            from: prevProps.activePanel,
                            to: this.props.activePanel
                        });
                    } else {
                        var firstLayerId = this.panels.map(function(panel) {
                            return getNavId(panel.props, warn);
                        }).find(function(id) {
                            return id === prevProps.activePanel || id === _this.props.activePanel;
                        });
                        isBack = firstLayerId === this.props.activePanel;
                    }
                    this.blurActiveElement();
                    var prevScrolls = this.scrolls[prevProps.activePanel] || [];
                    var scrolls = _object_spread_props(_object_spread({}, this.scrolls), _define_property({}, prevProps.activePanel, _to_consumable_array(prevScrolls).concat([
                        (_this_props_scroll = this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.getScroll().y
                    ])));
                    this.scrolls = scrolls;
                    if (this.shouldDisableTransitionMotion()) {
                        this.flushTransition(prevProps.activePanel, isBack);
                    } else {
                        this.setState({
                            visiblePanels: [
                                prevProps.activePanel,
                                this.props.activePanel
                            ],
                            prevPanel: prevProps.activePanel,
                            nextPanel: this.props.activePanel,
                            activePanel: null,
                            animated: true,
                            isBack: isBack
                        });
                        // Фолбек анимации перехода
                        if (!animationEvent.supported) {
                            if (this.animationFinishTimeout) {
                                clearTimeout(this.animationFinishTimeout);
                            }
                            this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === Platform.ANDROID || this.props.platform === Platform.VKCOM ? 300 : 600);
                        }
                    }
                }
                // Закончилась анимация свайпа назад
                if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
                    var nextPanel = this.state.swipeBackNextPanel;
                    var prevPanel = this.state.swipeBackPrevPanel;
                    var scrollPosition = undefined;
                    this.scrolls = _object_spread({}, this.scrolls);
                    if (prevPanel !== null) {
                        var prevPanelScrolls = _to_consumable_array(this.scrolls[prevPanel] || []).slice(0, -1);
                        this.scrolls[prevPanel] = prevPanelScrolls;
                    }
                    if (nextPanel !== null) {
                        var newPanelScrolls = _to_consumable_array(this.scrolls[nextPanel] || []);
                        scrollPosition = newPanelScrolls.pop();
                        this.scrolls[nextPanel] = newPanelScrolls;
                    }
                    this.setState({
                        swipeBackPrevPanel: null,
                        swipeBackNextPanel: null,
                        swipingBack: false,
                        swipeBackResult: null,
                        swipeBackStartX: 0,
                        swipeBackShift: 0,
                        activePanel: nextPanel,
                        visiblePanels: [
                            nextPanel
                        ]
                    }, function() {
                        var _this_props_scroll;
                        (_this_props_scroll = _this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.scrollTo(0, scrollPosition);
                        prevProps.onTransition && prevProps.onTransition({
                            isBack: true,
                            from: prevPanel,
                            to: nextPanel
                        });
                    });
                }
                // Началась анимация завершения свайпа назад.
                if (!prevState.swipeBackResult && this.state.swipeBackResult) {
                    this.waitTransitionFinish(this.pickPanel(this.state.swipeBackNextPanel), this.swipingBackTransitionEndHandler);
                }
                // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
                if (prevState.swipeBackResult === 1 && !this.state.swipeBackResult && this.state.activePanel !== null) {
                    var _this_props_scroll1;
                    var newPanelScrolls1 = _to_consumable_array(this.scrolls[this.state.activePanel] || []);
                    var scrollPosition1 = newPanelScrolls1.pop();
                    this.scrolls = _object_spread_props(_object_spread({}, this.scrolls), _define_property({}, this.state.activePanel, newPanelScrolls1));
                    (_this_props_scroll1 = this.props.scroll) === null || _this_props_scroll1 === void 0 ? void 0 : _this_props_scroll1.scrollTo(0, scrollPosition1);
                }
                // Закончился Safari свайп
                if (prevProps.activePanel !== this.props.activePanel && this.state.browserSwipe) {
                    this.setState({
                        browserSwipe: false,
                        nextPanel: null,
                        prevPanel: null,
                        animated: false,
                        visiblePanels: [
                            this.props.activePanel
                        ],
                        activePanel: this.props.activePanel
                    });
                }
            }
        },
        {
            key: "shouldDisableTransitionMotion",
            value: function shouldDisableTransitionMotion() {
                var _this_props_configProvider, _this_props_splitCol;
                return ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.transitionMotionEnabled) === false || !((_this_props_splitCol = this.props.splitCol) === null || _this_props_splitCol === void 0 ? void 0 : _this_props_splitCol.animate) || this.props.platform === Platform.VKCOM;
            }
        },
        {
            key: "waitTransitionFinish",
            value: function waitTransitionFinish(elem, eventHandler) {
                if (transitionEvent.supported && transitionEvent.name && elem) {
                    elem.removeEventListener(transitionEvent.name, eventHandler);
                    elem.addEventListener(transitionEvent.name, eventHandler);
                } else {
                    if (this.transitionFinishTimeout) {
                        clearTimeout(this.transitionFinishTimeout);
                    }
                    this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === Platform.ANDROID || this.props.platform === Platform.VKCOM ? 300 : 600);
                }
            }
        },
        {
            key: "blurActiveElement",
            value: function blurActiveElement() {
                var _this_document;
                if (typeof this.window !== "undefined" && ((_this_document = this.document) === null || _this_document === void 0 ? void 0 : _this_document.activeElement)) {
                    this.document.activeElement.blur();
                }
            }
        },
        {
            key: "pickPanel",
            value: function pickPanel(id) {
                if (id === null) {
                    return undefined;
                }
                return this.panelNodes[id];
            }
        },
        {
            key: "flushTransition",
            value: function flushTransition(prevPanel, isBack) {
                var _this = this;
                var activePanel = this.props.activePanel;
                var prevPanelScrolls = _to_consumable_array(this.scrolls[prevPanel] || []).slice(0, -1);
                var newPanelScrolls = _to_consumable_array(this.scrolls[activePanel] || []);
                var scrollPosition = isBack ? newPanelScrolls.pop() : 0;
                if (isBack) {
                    var _obj;
                    this.scrolls = _object_spread_props(_object_spread({}, this.scrolls), (_obj = {}, _define_property(_obj, prevPanel, prevPanelScrolls), _define_property(_obj, activePanel, newPanelScrolls), _obj));
                }
                this.setState({
                    prevPanel: null,
                    nextPanel: null,
                    visiblePanels: [
                        activePanel
                    ],
                    activePanel: activePanel,
                    animated: false,
                    isBack: isBack
                }, function() {
                    var _this_props_scroll;
                    (_this_props_scroll = _this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.scrollTo(0, isBack ? scrollPosition : 0);
                    _this.props.onTransition && _this.props.onTransition({
                        isBack: isBack,
                        from: prevPanel,
                        to: activePanel
                    });
                });
            }
        },
        {
            key: "onSwipeBackSuccess",
            value: function onSwipeBackSuccess() {
                this.props.onSwipeBack && this.props.onSwipeBack();
            }
        },
        {
            key: "onSwipeBackCancel",
            value: function onSwipeBackCancel() {
                this.props.onSwipeBackCancel && this.props.onSwipeBackCancel();
                this.setState({
                    swipeBackPrevPanel: null,
                    swipeBackNextPanel: null,
                    swipingBack: false,
                    swipeBackResult: null,
                    swipeBackStartX: 0,
                    swipeBackShift: 0
                });
            }
        },
        {
            key: "calcPanelSwipeStyles",
            value: function calcPanelSwipeStyles(panelId) {
                if (!canUseDOM || !this.window) {
                    return {};
                }
                var isPrev = panelId === this.state.swipeBackPrevPanel;
                var isNext = panelId === this.state.swipeBackNextPanel;
                if (!isPrev && !isNext || this.state.swipeBackResult) {
                    return {};
                }
                var prevPanelTranslate = "".concat(this.state.swipeBackShift, "px");
                var nextPanelTranslate = "".concat(-50 + this.state.swipeBackShift * 100 / this.window.innerWidth / 2, "%");
                var prevPanelShadow = 0.3 * (this.window.innerWidth - this.state.swipeBackShift) / this.window.innerWidth;
                if (this.state.swipeBackResult) {
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
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var _this_props = this.props, platform = _this_props.platform, _1 = _this_props.activePanel, splitCol = _this_props.splitCol, configProvider = _this_props.configProvider, history = _this_props.history, id = _this_props.id, nav = _this_props.nav, onTransition = _this_props.onTransition, onSwipeBack = _this_props.onSwipeBack, onSwipeBackStart = _this_props.onSwipeBackStart, onSwipeBackCancel = _this_props.onSwipeBackCancel, window = _this_props.window, document = _this_props.document, scroll = _this_props.scroll, isBackCheck = _this_props.isBackCheck, className = _this_props.className, restProps = _object_without_properties(_this_props, [
                    "platform",
                    "activePanel",
                    "splitCol",
                    "configProvider",
                    "history",
                    "id",
                    "nav",
                    "onTransition",
                    "onSwipeBack",
                    "onSwipeBackStart",
                    "onSwipeBackCancel",
                    "window",
                    "document",
                    "scroll",
                    "isBackCheck",
                    "className"
                ]);
                var _this_state = this.state, prevPanel = _this_state.prevPanel, nextPanel = _this_state.nextPanel, activePanel = _this_state.activePanel, isBack = _this_state.isBack, animated = _this_state.animated, swipeBackPrevPanel = _this_state.swipeBackPrevPanel, swipeBackNextPanel = _this_state.swipeBackNextPanel, swipeBackResult = _this_state.swipeBackResult, swipingBack = _this_state.swipingBack;
                var panels = this.panels.filter(function(panel) {
                    var panelId = getNavId(panel.props, warn);
                    return panelId !== undefined && _this.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
                }).sort(function(panel) {
                    var panelId = getNavId(panel.props, warn);
                    var isPrevPanel = panelId === prevPanel || panelId === swipeBackPrevPanel;
                    var isNextPanel = panelId === nextPanel || panelId === swipeBackNextPanel;
                    if (isNextPanel) {
                        return swipingBack || _this.state.isBack ? -1 : 1;
                    }
                    if (isPrevPanel) {
                        return swipingBack || _this.state.isBack ? 1 : -1;
                    }
                    return 0;
                });
                var disableAnimation = this.shouldDisableTransitionMotion();
                var iOSSwipeBackSimulationEnabled = !disableAnimation && platform === Platform.IOS && (configProvider === null || configProvider === void 0 ? void 0 : configProvider.isWebView) && Boolean(onSwipeBack);
                return /*#__PURE__*/ React.createElement(NavViewIdContext.Provider, {
                    value: id || nav
                }, /*#__PURE__*/ React.createElement(Touch, _object_spread_props(_object_spread({
                    Component: "section"
                }, restProps), {
                    className: classNames("vkuiView", platform === Platform.IOS && classNames("vkuiView--ios", "vkuiInternalView--ios"), !disableAnimation && this.state.animated && "vkuiView--animated", !disableAnimation && this.state.swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
                    onMoveX: iOSSwipeBackSimulationEnabled ? this.handleTouchMoveXForIOSSwipeBackSimulation : platform === Platform.IOS ? this.handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
                    onEnd: iOSSwipeBackSimulationEnabled ? this.handleTouchEndForIOSSwipeBackSimulation : undefined
                }), /*#__PURE__*/ React.createElement("div", {
                    className: "vkuiView__panels"
                }, panels.map(function(panel) {
                    var panelId = getNavId(panel.props, warn);
                    var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
                    var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
                    var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
                    var scrollList = panelId && _this.scrolls[panelId] || [];
                    var scroll = scrollList[scrollList.length - 1] || 0;
                    return /*#__PURE__*/ React.createElement("div", {
                        className: classNames("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === 2 && "vkuiView__panel--swipe-back-success", swipeBackResult === 1 && "vkuiView__panel--swipe-back-failed"),
                        onAnimationEnd: isTransitionTarget ? _this.transitionEndHandler : undefined,
                        ref: function(el) {
                            return panelId !== undefined && (_this.panelNodes[panelId] = el);
                        },
                        style: _this.calcPanelSwipeStyles(panelId),
                        key: panelId
                    }, /*#__PURE__*/ React.createElement("div", {
                        className: "vkuiView__panel-in",
                        style: {
                            marginTop: compensateScroll ? -scroll : undefined
                        }
                    }, /*#__PURE__*/ React.createElement(NavTransitionDirectionProvider, {
                        isBack: swipingBack || isBack
                    }, /*#__PURE__*/ React.createElement(NavTransitionProvider, {
                        entering: panelId === nextPanel || panelId === swipeBackNextPanel
                    }, panel))));
                }))));
            }
        }
    ]);
    return ViewInfiniteComponent;
}(_React_Component = React.Component);
_define_property(ViewInfiniteComponent, "defaultProps", {
    history: []
});
export var ViewInfinite = withContext(withContext(withContext(withPlatform(withDOM(ViewInfiniteComponent)), SplitColContext, "splitCol"), ConfigProviderContext, "configProvider"), ScrollContext, "scroll");

//# sourceMappingURL=ViewInfinite.js.map