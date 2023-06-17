"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewInfinite", {
    enumerable: true,
    get: function() {
        return ViewInfinite;
    }
});
var _assertThisInitialized = require("@swc/helpers/lib/_assert_this_initialized.js").default;
var _classCallCheck = require("@swc/helpers/lib/_class_call_check.js").default;
var _createClass = require("@swc/helpers/lib/_create_class.js").default;
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _inherits = require("@swc/helpers/lib/_inherits.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _toConsumableArray = require("@swc/helpers/lib/_to_consumable_array.js").default;
var _createSuper = require("@swc/helpers/lib/_create_super.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _withContext = require("../../hoc/withContext");
var _withPlatform = require("../../hoc/withPlatform");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _supportEvents = require("../../lib/supportEvents");
var _warnOnce = require("../../lib/warnOnce");
var _scrollContext = require("../AppRoot/ScrollContext");
var _configProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _navTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _splitColContext = require("../SplitCol/SplitColContext");
var _touch = require("../Touch/Touch");
var _utils = require("./utils");
var warn = (0, _warnOnce.warnOnce)("ViewInfinite");
var SwipeBackResults;
(function(SwipeBackResults) {
    SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
    SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
var scrollsCache = {};
var _React_Component;
var ViewInfiniteComponent = /*#__PURE__*/ function(_superClass) {
    "use strict";
    _inherits(ViewInfiniteComponent, _superClass);
    var _super = _createSuper(ViewInfiniteComponent);
    function ViewInfiniteComponent(props) {
        _classCallCheck(this, ViewInfiniteComponent);
        var _this;
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "scrolls", scrollsCache[(0, _getNavId.getNavId)(_this.props, warn)] || {});
        _defineProperty(_assertThisInitialized(_this), "transitionFinishTimeout", undefined);
        _defineProperty(_assertThisInitialized(_this), "animationFinishTimeout", undefined);
        _defineProperty(_assertThisInitialized(_this), "panelNodes", {});
        _defineProperty(_assertThisInitialized(_this), "transitionEndHandler", function(e) {
            if ((!e || [
                "vkui-animation-ios-next-forward",
                "vkui-animation-ios-prev-back",
                "vkui-animation-view-next-forward",
                "vkui-animation-view-prev-back"
            ].includes(e.animationName)) && _this.state.prevPanel !== null) {
                _this.flushTransition(_this.state.prevPanel, Boolean(_this.state.isBack));
            }
        });
        _defineProperty(_assertThisInitialized(_this), "swipingBackTransitionEndHandler", function(e) {
            // indexOf because of vendor prefixes in old browsers
            if (!e || e.propertyName.includes("transform") && e.target === _this.pickPanel(_this.state.swipeBackNextPanel)) {
                switch(_this.state.swipeBackResult){
                    case SwipeBackResults.fail:
                        _this.onSwipeBackCancel();
                        break;
                    case SwipeBackResults.success:
                        _this.onSwipeBackSuccess();
                }
            }
        });
        _defineProperty(_assertThisInitialized(_this), "onMoveX", function(event) {
            var _this_props_configProvider;
            if (!_this.window || _this.props.platform !== _platform.Platform.IOS || _this.state.swipeBackPrevented || (0, _utils.swipeBackExcluded)(event) || _this.shouldDisableTransitionMotion()) {
                return;
            }
            if (!((_this_props_configProvider = _this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.isWebView)) {
                if ((event.startX <= ViewInfiniteComponent.SWIPE_BACK_AREA || event.startX >= _this.window.innerWidth - ViewInfiniteComponent.SWIPE_BACK_AREA) && !_this.state.browserSwipe) {
                    _this.setState({
                        browserSwipe: true
                    });
                }
                return;
            }
            if (!_this.props.onSwipeBack || _this.state.animated && event.startX <= ViewInfiniteComponent.SWIPE_BACK_AREA) {
                return;
            }
            if (!_this.state.swipingBack && event.startX <= ViewInfiniteComponent.SWIPE_BACK_AREA && _this.props.history && _this.props.history.length > 1) {
                if (_this.props.onSwipeBackStart) {
                    var payload = _this.props.onSwipeBackStart(_this.state.activePanel);
                    if (payload === "prevent") {
                        _this.setState({
                            swipeBackPrevented: true
                        });
                        return;
                    }
                }
                if (_this.state.activePanel !== null) {
                    var _this_props_scroll;
                    // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                    _this.blurActiveElement();
                    var prevScrolls = _this.scrolls[_this.state.activePanel] || [];
                    _this.scrolls = _objectSpreadProps(_objectSpread({}, _this.scrolls), _defineProperty({}, _this.state.activePanel, _toConsumableArray(prevScrolls).concat([
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
                var swipeBackShift;
                if (event.shiftX < 0) {
                    swipeBackShift = 0;
                } else if (event.shiftX > _this.window.innerWidth - _this.state.swipeBackStartX) {
                    swipeBackShift = _this.window.innerWidth;
                } else {
                    swipeBackShift = event.shiftX;
                }
                _this.setState({
                    swipeBackShift: swipeBackShift
                });
            }
        });
        _defineProperty(_assertThisInitialized(_this), "onEnd", function(event) {
            if (_this.state.swipingBack && _this.window) {
                var speed = _this.state.swipeBackShift / event.duration * 1000;
                if (_this.state.swipeBackShift === 0) {
                    _this.onSwipeBackCancel();
                } else if (_this.state.swipeBackShift >= _this.window.innerWidth) {
                    _this.onSwipeBackSuccess();
                } else if (speed > 250 || _this.state.swipeBackStartX + _this.state.swipeBackShift > _this.window.innerWidth / 2) {
                    _this.setState({
                        swipeBackResult: SwipeBackResults.success
                    });
                } else {
                    _this.setState({
                        swipeBackResult: SwipeBackResults.fail
                    });
                }
            }
            if (_this.state.swipeBackPrevented) {
                _this.setState({
                    swipeBackPrevented: false
                });
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
            swipingBack: false,
            swipeBackPrevented: false,
            swipeBackStartX: 0,
            swipeBackShift: 0,
            swipeBackNextPanel: null,
            swipeBackPrevPanel: null,
            swipeBackResult: null,
            browserSwipe: false
        };
        return _this;
    }
    _createClass(ViewInfiniteComponent, [
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
                return _react.Children.toArray(this.props.children);
            }
        },
        {
            key: "componentWillUnmount",
            value: function componentWillUnmount() {
                var id = (0, _getNavId.getNavId)(this.props);
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
                            return (0, _getNavId.getNavId)(panel.props, warn);
                        }).find(function(id) {
                            return id === prevProps.activePanel || id === _this.props.activePanel;
                        });
                        isBack = firstLayerId === this.props.activePanel;
                    }
                    this.blurActiveElement();
                    var prevScrolls = this.scrolls[prevProps.activePanel] || [];
                    var scrolls = _objectSpreadProps(_objectSpread({}, this.scrolls), _defineProperty({}, prevProps.activePanel, _toConsumableArray(prevScrolls).concat([
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
                        if (!_supportEvents.animationEvent.supported) {
                            if (this.animationFinishTimeout) {
                                clearTimeout(this.animationFinishTimeout);
                            }
                            this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === _platform.Platform.ANDROID || this.props.platform === _platform.Platform.VKCOM ? 300 : 600);
                        }
                    }
                }
                // Закончилась анимация свайпа назад
                if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
                    var nextPanel = this.state.swipeBackNextPanel;
                    var prevPanel = this.state.swipeBackPrevPanel;
                    var scrollPosition = undefined;
                    this.scrolls = _objectSpread({}, this.scrolls);
                    if (prevPanel !== null) {
                        var prevPanelScrolls = _toConsumableArray(this.scrolls[prevPanel] || []).slice(0, -1);
                        this.scrolls[prevPanel] = prevPanelScrolls;
                    }
                    if (nextPanel !== null) {
                        var newPanelScrolls = _toConsumableArray(this.scrolls[nextPanel] || []);
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
                if (prevState.swipeBackResult === SwipeBackResults.fail && !this.state.swipeBackResult && this.state.activePanel !== null) {
                    var _this_props_scroll1;
                    var newPanelScrolls1 = _toConsumableArray(this.scrolls[this.state.activePanel] || []);
                    var scrollPosition1 = newPanelScrolls1.pop();
                    this.scrolls = _objectSpreadProps(_objectSpread({}, this.scrolls), _defineProperty({}, this.state.activePanel, newPanelScrolls1));
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
                return ((_this_props_configProvider = this.props.configProvider) === null || _this_props_configProvider === void 0 ? void 0 : _this_props_configProvider.transitionMotionEnabled) === false || !((_this_props_splitCol = this.props.splitCol) === null || _this_props_splitCol === void 0 ? void 0 : _this_props_splitCol.animate) || this.props.platform === _platform.Platform.VKCOM;
            }
        },
        {
            key: "waitTransitionFinish",
            value: function waitTransitionFinish(elem, eventHandler) {
                if (_supportEvents.transitionEvent.supported && _supportEvents.transitionEvent.name && elem) {
                    elem.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
                    elem.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
                } else {
                    if (this.transitionFinishTimeout) {
                        clearTimeout(this.transitionFinishTimeout);
                    }
                    this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === _platform.Platform.ANDROID || this.props.platform === _platform.Platform.VKCOM ? 300 : 600);
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
                var prevPanelScrolls = _toConsumableArray(this.scrolls[prevPanel] || []).slice(0, -1);
                var newPanelScrolls = _toConsumableArray(this.scrolls[activePanel] || []);
                var scrollPosition = isBack ? newPanelScrolls.pop() : 0;
                if (isBack) {
                    var _obj;
                    this.scrolls = _objectSpreadProps(_objectSpread({}, this.scrolls), (_obj = {}, _defineProperty(_obj, prevPanel, prevPanelScrolls), _defineProperty(_obj, activePanel, newPanelScrolls), _obj));
                }
                this.setState({
                    prevPanel: null,
                    nextPanel: null,
                    visiblePanels: [
                        activePanel
                    ],
                    activePanel: activePanel,
                    animated: false,
                    isBack: undefined
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
                if (!_dom.canUseDOM || !this.window) {
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
                var _this_props = this.props, platform = _this_props.platform, _1 = _this_props.activePanel, splitCol = _this_props.splitCol, configProvider = _this_props.configProvider, history = _this_props.history, id = _this_props.id, nav = _this_props.nav, onTransition = _this_props.onTransition, onSwipeBack = _this_props.onSwipeBack, onSwipeBackStart = _this_props.onSwipeBackStart, onSwipeBackCancel = _this_props.onSwipeBackCancel, window = _this_props.window, document = _this_props.document, scroll = _this_props.scroll, isBackCheck = _this_props.isBackCheck, className = _this_props.className, restProps = _objectWithoutProperties(_this_props, [
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
                    var panelId = (0, _getNavId.getNavId)(panel.props, warn);
                    return panelId !== undefined && _this.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
                }).sort(function(panel) {
                    var panelId = (0, _getNavId.getNavId)(panel.props, warn);
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
                return /*#__PURE__*/ _react.createElement(_touch.Touch, _objectSpreadProps(_objectSpread({
                    Component: "section"
                }, restProps), {
                    className: (0, _vkjs.classNames)("vkuiView", platform === _platform.Platform.IOS && "vkuiView--ios", !disableAnimation && this.state.animated && "vkuiView--animated", !disableAnimation && this.state.swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
                    onMoveX: this.onMoveX,
                    onEnd: this.onEnd
                }), /*#__PURE__*/ _react.createElement("div", {
                    className: "vkuiView__panels"
                }, panels.map(function(panel) {
                    var panelId = (0, _getNavId.getNavId)(panel.props, warn);
                    var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
                    var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
                    var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
                    var scrollList = panelId && _this.scrolls[panelId] || [];
                    var scroll = scrollList[scrollList.length - 1] || 0;
                    return /*#__PURE__*/ _react.createElement("div", {
                        className: (0, _vkjs.classNames)("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === SwipeBackResults.success && "vkuiView__panel--swipe-back-success", swipeBackResult === SwipeBackResults.fail && "vkuiView__panel--swipe-back-failed"),
                        onAnimationEnd: isTransitionTarget ? _this.transitionEndHandler : undefined,
                        ref: function(el) {
                            return panelId !== undefined && (_this.panelNodes[panelId] = el);
                        },
                        style: _this.calcPanelSwipeStyles(panelId),
                        key: panelId
                    }, /*#__PURE__*/ _react.createElement("div", {
                        className: "vkuiView__panel-in",
                        style: {
                            marginTop: compensateScroll ? -scroll : undefined
                        }
                    }, /*#__PURE__*/ _react.createElement(_navTransitionContext.NavTransitionProvider, {
                        entering: panelId === nextPanel || panelId === swipeBackNextPanel
                    }, panel)));
                })));
            }
        }
    ]);
    return ViewInfiniteComponent;
}(_React_Component = _react.Component);
_defineProperty(ViewInfiniteComponent, "SWIPE_BACK_AREA", 70);
_defineProperty(ViewInfiniteComponent, "defaultProps", {
    history: []
});
var ViewInfinite = (0, _withContext.withContext)((0, _withContext.withContext)((0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)(ViewInfiniteComponent)), _splitColContext.SplitColContext, "splitCol"), _configProviderContext.ConfigProviderContext, "configProvider"), _scrollContext.ScrollContext, "scroll");

//# sourceMappingURL=ViewInfinite.js.map