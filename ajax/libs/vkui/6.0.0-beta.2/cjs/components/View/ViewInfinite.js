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
    ViewInfinite: function() {
        return ViewInfinite;
    },
    scrollsCache: function() {
        return scrollsCache;
    }
});
const _define_property = require("@swc/helpers/_/_define_property");
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _withContext = require("../../hoc/withContext");
const _withPlatform = require("../../hoc/withPlatform");
const _dom = require("../../lib/dom");
const _getNavId = require("../../lib/getNavId");
const _supportEvents = require("../../lib/supportEvents");
const _warnOnce = require("../../lib/warnOnce");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _NavIdContext = require("../NavIdContext/NavIdContext");
const _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
const _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
const _SplitColContext = require("../SplitCol/SplitColContext");
const _Touch = require("../Touch/Touch");
const _utils = require("./utils");
const warn = (0, _warnOnce.warnOnce)('ViewInfinite');
let scrollsCache = {};
var _React_Component;
class ViewInfiniteComponent extends (_React_Component = _react.Component) {
    get document() {
        return this.props.document;
    }
    get window() {
        return this.props.window;
    }
    get panels() {
        return _react.Children.toArray(this.props.children);
    }
    componentWillUnmount() {
        const id = (0, _getNavId.getNavId)(this.props);
        if (id) {
            scrollsCache[id] = this.scrolls;
        }
        if (this.animationFinishTimeout) {
            clearTimeout(this.animationFinishTimeout);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // Нужен переход
        if (prevProps.activePanel !== this.props.activePanel && !prevState.swipingBack && !prevState.browserSwipe) {
            var _this_props_scroll;
            let isBack = false;
            if (this.props.isBackCheck) {
                isBack = this.props.isBackCheck({
                    from: prevProps.activePanel,
                    to: this.props.activePanel
                });
            } else {
                const firstLayerId = this.panels.map((panel)=>(0, _getNavId.getNavId)(panel.props, warn)).find((id)=>id === prevProps.activePanel || id === this.props.activePanel);
                isBack = firstLayerId === this.props.activePanel;
            }
            this.blurActiveElement();
            const prevScrolls = this.scrolls[prevProps.activePanel] || [];
            const scrolls = _object_spread_props._(_object_spread._({}, this.scrolls), {
                [prevProps.activePanel]: [
                    ...prevScrolls,
                    (_this_props_scroll = this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.getScroll().y
                ]
            });
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
                    isBack
                });
                // Фолбек анимации перехода
                if (!_supportEvents.animationEvent.supported) {
                    if (this.animationFinishTimeout) {
                        clearTimeout(this.animationFinishTimeout);
                    }
                    this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === 'android' || this.props.platform === 'vkcom' ? 300 : 600);
                }
            }
        }
        // Закончилась анимация свайпа назад
        if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
            const nextPanel = this.state.swipeBackNextPanel;
            const prevPanel = this.state.swipeBackPrevPanel;
            let scrollPosition = undefined;
            this.scrolls = _object_spread._({}, this.scrolls);
            if (prevPanel !== null) {
                const prevPanelScrolls = [
                    ...this.scrolls[prevPanel] || []
                ].slice(0, -1);
                this.scrolls[prevPanel] = prevPanelScrolls;
            }
            if (nextPanel !== null) {
                const newPanelScrolls = [
                    ...this.scrolls[nextPanel] || []
                ];
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
            }, ()=>{
                var _this_props_scroll;
                (_this_props_scroll = this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.scrollTo(0, scrollPosition);
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
        if (prevState.swipeBackResult === 'fail' && !this.state.swipeBackResult && this.state.activePanel !== null) {
            var _this_props_scroll1;
            const newPanelScrolls = [
                ...this.scrolls[this.state.activePanel] || []
            ];
            const scrollPosition = newPanelScrolls.pop();
            this.scrolls = _object_spread_props._(_object_spread._({}, this.scrolls), {
                [this.state.activePanel]: newPanelScrolls
            });
            (_this_props_scroll1 = this.props.scroll) === null || _this_props_scroll1 === void 0 ? void 0 : _this_props_scroll1.scrollTo(0, scrollPosition);
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
    shouldDisableTransitionMotion() {
        var _this_props_configProvider, _this_props_splitCol;
        return ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.transitionMotionEnabled) === false || !((_this_props_splitCol = this.props.splitCol) === null || _this_props_splitCol === void 0 ? void 0 : _this_props_splitCol.animate) || this.props.platform === 'vkcom';
    }
    waitTransitionFinish(elem, eventHandler) {
        if (_supportEvents.transitionEvent.supported && _supportEvents.transitionEvent.name && elem) {
            elem.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
            elem.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
        } else {
            if (this.transitionFinishTimeout) {
                clearTimeout(this.transitionFinishTimeout);
            }
            this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === 'android' || this.props.platform === 'vkcom' ? 300 : 600);
        }
    }
    blurActiveElement() {
        var _this_document;
        if (typeof this.window !== 'undefined' && ((_this_document = this.document) === null || _this_document === void 0 ? void 0 : _this_document.activeElement)) {
            this.document.activeElement.blur();
        }
    }
    pickPanel(id) {
        if (id === null) {
            return undefined;
        }
        return this.panelNodes[id];
    }
    flushTransition(prevPanel, isBack) {
        const activePanel = this.props.activePanel;
        const prevPanelScrolls = [
            ...this.scrolls[prevPanel] || []
        ].slice(0, -1);
        const newPanelScrolls = [
            ...this.scrolls[activePanel] || []
        ];
        const scrollPosition = isBack ? newPanelScrolls.pop() : 0;
        if (isBack) {
            this.scrolls = _object_spread_props._(_object_spread._({}, this.scrolls), {
                [prevPanel]: prevPanelScrolls,
                [activePanel]: newPanelScrolls
            });
        }
        this.setState({
            prevPanel: null,
            nextPanel: null,
            visiblePanels: [
                activePanel
            ],
            activePanel: activePanel,
            animated: false,
            isBack
        }, ()=>{
            var _this_props_scroll;
            (_this_props_scroll = this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.scrollTo(0, isBack ? scrollPosition : 0);
            this.props.onTransition && this.props.onTransition({
                isBack,
                from: prevPanel,
                to: activePanel
            });
        });
    }
    onSwipeBackSuccess() {
        this.props.onSwipeBack && this.props.onSwipeBack();
    }
    onSwipeBackCancel() {
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
    calcPanelSwipeStyles(panelId) {
        if (!_dom.canUseDOM || !this.window) {
            return {};
        }
        const isPrev = panelId === this.state.swipeBackPrevPanel;
        const isNext = panelId === this.state.swipeBackNextPanel;
        if (!isPrev && !isNext || this.state.swipeBackResult) {
            return {};
        }
        let prevPanelTranslate = `${this.state.swipeBackShift}px`;
        let nextPanelTranslate = `${-50 + this.state.swipeBackShift * 100 / this.window.innerWidth / 2}%`;
        let prevPanelShadow = 0.3 * (this.window.innerWidth - this.state.swipeBackShift) / this.window.innerWidth;
        if (this.state.swipeBackResult) {
            return isPrev ? {
                boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})`
            } : {};
        }
        if (isNext) {
            return {
                transform: `translate3d(${nextPanelTranslate}, 0, 0)`,
                WebkitTransform: `translate3d(${nextPanelTranslate}, 0, 0)`
            };
        }
        if (isPrev) {
            return {
                transform: `translate3d(${prevPanelTranslate}, 0, 0)`,
                WebkitTransform: `translate3d(${prevPanelTranslate}, 0, 0)`,
                boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})`
            };
        }
        return {};
    }
    render() {
        const _this_props = this.props, { platform, activePanel: _1, splitCol, configProvider, history, id, nav, onTransition, onSwipeBack, onSwipeBackStart, onSwipeBackCancel, window, document, scroll, isBackCheck, className } = _this_props, restProps = _object_without_properties._(_this_props, [
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
        const { prevPanel, nextPanel, activePanel, isBack, animated, swipeBackPrevPanel, swipeBackNextPanel, swipeBackResult, swipingBack } = this.state;
        const panels = this.panels.filter((panel)=>{
            const panelId = (0, _getNavId.getNavId)(panel.props, warn);
            return panelId !== undefined && this.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
        }).sort((panel)=>{
            const panelId = (0, _getNavId.getNavId)(panel.props, warn);
            const isPrevPanel = panelId === prevPanel || panelId === swipeBackPrevPanel;
            const isNextPanel = panelId === nextPanel || panelId === swipeBackNextPanel;
            if (isNextPanel) {
                return swipingBack || this.state.isBack ? -1 : 1;
            }
            if (isPrevPanel) {
                return swipingBack || this.state.isBack ? 1 : -1;
            }
            return 0;
        });
        const disableAnimation = this.shouldDisableTransitionMotion();
        const iOSSwipeBackSimulationEnabled = !disableAnimation && platform === 'ios' && (configProvider === null || configProvider === void 0 ? void 0 : configProvider.isWebView) && Boolean(onSwipeBack);
        return /*#__PURE__*/ _react.createElement(_NavIdContext.NavViewIdContext.Provider, {
            value: id || nav
        }, /*#__PURE__*/ _react.createElement(_Touch.Touch, _object_spread_props._(_object_spread._({
            Component: "section"
        }, restProps), {
            className: (0, _vkjs.classNames)("vkuiView", platform === 'ios' && (0, _vkjs.classNames)("vkuiView--ios", 'vkuiInternalView--ios'), !disableAnimation && this.state.animated && "vkuiView--animated", !disableAnimation && this.state.swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
            onMoveX: iOSSwipeBackSimulationEnabled ? this.handleTouchMoveXForIOSSwipeBackSimulation : platform === 'ios' ? this.handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
            onEnd: iOSSwipeBackSimulationEnabled ? this.handleTouchEndForIOSSwipeBackSimulation : undefined
        }), /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiView__panels"
        }, panels.map((panel)=>{
            const panelId = (0, _getNavId.getNavId)(panel.props, warn);
            const isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
            const compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
            const isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
            const scrollList = panelId && this.scrolls[panelId] || [];
            const scroll = scrollList[scrollList.length - 1] || 0;
            return /*#__PURE__*/ _react.createElement("div", {
                className: (0, _vkjs.classNames)("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === 'success' && "vkuiView__panel--swipe-back-success", swipeBackResult === 'fail' && "vkuiView__panel--swipe-back-failed"),
                onAnimationEnd: isTransitionTarget ? this.transitionEndHandler : undefined,
                ref: (el)=>panelId !== undefined && (this.panelNodes[panelId] = el),
                style: this.calcPanelSwipeStyles(panelId),
                key: panelId
            }, /*#__PURE__*/ _react.createElement("div", {
                className: "vkuiView__panel-in",
                style: {
                    marginTop: compensateScroll ? -scroll : undefined
                }
            }, /*#__PURE__*/ _react.createElement(_NavTransitionDirectionContext.NavTransitionDirectionProvider, {
                isBack: swipingBack || isBack
            }, /*#__PURE__*/ _react.createElement(_NavTransitionContext.NavTransitionProvider, {
                entering: panelId === nextPanel || panelId === swipeBackNextPanel
            }, panel))));
        }))));
    }
    constructor(props){
        super(props);
        _define_property._(this, "swipeBackPrevented", false);
        _define_property._(this, "scrolls", scrollsCache[(0, _getNavId.getNavId)(this.props, warn)] || {});
        _define_property._(this, "transitionFinishTimeout", undefined);
        _define_property._(this, "animationFinishTimeout", undefined);
        _define_property._(this, "panelNodes", {});
        _define_property._(this, "transitionEndHandler", (e)=>{
            if ((!e || [
                "vkuianimation-ios-next-forward",
                "vkuianimation-ios-prev-back",
                "vkuianimation-view-next-forward",
                "vkuianimation-view-prev-back"
            ].includes(e.animationName)) && this.state.prevPanel !== null) {
                this.flushTransition(this.state.prevPanel, Boolean(this.state.isBack));
            }
        });
        _define_property._(this, "swipingBackTransitionEndHandler", (e)=>{
            // indexOf because of vendor prefixes in old browsers
            if (!e || e.propertyName.includes('transform') && e.target === this.pickPanel(this.state.swipeBackNextPanel)) {
                switch(this.state.swipeBackResult){
                    case 'fail':
                        this.onSwipeBackCancel();
                        break;
                    case 'success':
                        this.onSwipeBackSuccess();
                }
            }
        });
        _define_property._(this, "handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext", (event)=>{
            if (this.state.browserSwipe) {
                return;
            }
            const { swipeBackTriggered, viewportStartEdgeTouched, viewportEndEdgeTouched } = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, this.window.innerWidth);
            if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
                this.setState({
                    browserSwipe: true
                });
            }
        });
        _define_property._(this, "handleTouchMoveXForIOSSwipeBackSimulation", (event)=>{
            if (this.swipeBackPrevented || (0, _utils.swipeBackExcluded)(event)) {
                return;
            }
            const { swipedToOpposite, swipeBackTriggered, viewportStartEdgeTouched } = (0, _utils.getSwipeBackPredicates)(event.startX, event.shiftX, this.window.innerWidth);
            if (this.state.animated && swipeBackTriggered) {
                return;
            }
            if (!this.state.swipingBack && this.props.history && this.props.history.length > 1) {
                if (swipedToOpposite) {
                    this.swipeBackPrevented = true;
                    return;
                }
                if (!swipeBackTriggered) {
                    return;
                }
                if (!viewportStartEdgeTouched && (0, _utils.hasHorizontalScrollableElementWithScrolledToLeft)(event.originalEvent.target)) {
                    this.swipeBackPrevented = true;
                    return;
                }
                // Начался свайп назад
                if (this.props.onSwipeBackStart) {
                    const payload = this.props.onSwipeBackStart(this.state.activePanel);
                    if (payload === 'prevent') {
                        this.swipeBackPrevented = true;
                        return;
                    }
                }
                if (this.state.activePanel !== null) {
                    var _this_props_scroll;
                    // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                    this.blurActiveElement();
                    const prevScrolls = this.scrolls[this.state.activePanel] || [];
                    this.scrolls = _object_spread_props._(_object_spread._({}, this.scrolls), {
                        [this.state.activePanel]: [
                            ...prevScrolls,
                            (_this_props_scroll = this.props.scroll) === null || _this_props_scroll === void 0 ? void 0 : _this_props_scroll.getScroll().y
                        ]
                    });
                }
                this.setState({
                    swipingBack: true,
                    swipeBackStartX: event.startX,
                    swipeBackPrevPanel: this.state.activePanel,
                    swipeBackNextPanel: this.props.history.slice(-2)[0]
                });
            }
            if (this.state.swipingBack) {
                if (event.shiftX < 0) {
                    this.setState({
                        swipeBackShift: 0
                    });
                } else if (event.shiftX > this.window.innerWidth - this.state.swipeBackStartX) {
                    this.setState({
                        swipeBackShift: this.window.innerWidth
                    });
                } else {
                    this.setState({
                        swipeBackShift: event.shiftX
                    });
                }
            }
        });
        _define_property._(this, "handleTouchEndForIOSSwipeBackSimulation", (event)=>{
            this.swipeBackPrevented = false;
            if (this.state.swipingBack && this.window) {
                const speed = this.state.swipeBackShift / event.duration * 1000;
                if (this.state.swipeBackShift === 0) {
                    this.onSwipeBackCancel();
                } else if (this.state.swipeBackShift >= this.window.innerWidth) {
                    this.onSwipeBackSuccess();
                } else if (speed > 250 || this.state.swipeBackShift >= this.window.innerWidth / 2) {
                    this.setState({
                        swipeBackResult: 'success'
                    });
                } else {
                    this.setState({
                        swipeBackResult: 'fail'
                    });
                }
            }
        });
        this.state = {
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
    }
}
_define_property._(ViewInfiniteComponent, "defaultProps", {
    history: []
});
const ViewInfinite = (0, _withContext.withContext)((0, _withContext.withContext)((0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)(ViewInfiniteComponent)), _SplitColContext.SplitColContext, 'splitCol'), _ConfigProviderContext.ConfigProviderContext, 'configProvider'), _ScrollContext.ScrollContext, 'scroll');

//# sourceMappingURL=ViewInfinite.js.map