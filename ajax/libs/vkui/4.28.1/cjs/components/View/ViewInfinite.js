"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewInfinite = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _supportEvents = require("../../lib/supportEvents");

var _getClassName = require("../../helpers/getClassName");

var _platform = require("../../lib/platform");

var _Touch = require("../Touch/Touch");

var _withPlatform = require("../../hoc/withPlatform");

var _withContext = require("../../hoc/withContext");

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _SplitCol = require("../SplitCol/SplitCol");

var _AppRootPortal = require("../AppRoot/AppRootPortal");

var _dom = require("../../lib/dom");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _utils = require("./utils");

var _excluded = ["popout", "modal", "platform", "activePanel", "splitCol", "configProvider", "history", "id", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "window", "document", "scroll", "isBackCheck"];
var warn = (0, _warnOnce.warnOnce)("ViewInfinite");
var SwipeBackResults;

(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));

var scrollsCache = {};

var ViewInfiniteComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ViewInfiniteComponent, _React$Component);

  var _super = (0, _createSuper2.default)(ViewInfiniteComponent);

  function ViewInfiniteComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ViewInfiniteComponent);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "scrolls", scrollsCache[(0, _getNavId.getNavId)(_this.props, warn)] || {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transitionFinishTimeout", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "animationFinishTimeout", undefined);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "panelNodes", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transitionEndHandler", function (e) {
      if ((!e || ["vkui-animation-ios-next-forward", "vkui-animation-ios-prev-back", "vkui-animation-view-next-forward", "vkui-animation-view-prev-back"].includes(e.animationName)) && _this.state.prevPanel !== null) {
        _this.flushTransition(_this.state.prevPanel, Boolean(_this.state.isBack));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "swipingBackTransitionEndHandler", function (e) {
      // indexOf because of vendor prefixes in old browsers
      if (!e || e.propertyName.includes("transform") && e.target === _this.pickPanel(_this.state.swipeBackNextPanel)) {
        switch (_this.state.swipeBackResult) {
          case SwipeBackResults.fail:
            _this.onSwipeBackCancel();

            break;

          case SwipeBackResults.success:
            _this.onSwipeBackSuccess();

        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onMoveX", function (e) {
      if ((0, _utils.swipeBackExcluded)(e) || !_this.window) {
        return;
      }

      var _this$props = _this.props,
          platform = _this$props.platform,
          configProvider = _this$props.configProvider;

      if (platform === _platform.IOS && !(configProvider !== null && configProvider !== void 0 && configProvider.isWebView) && (e.startX <= 70 || e.startX >= _this.window.innerWidth - 70) && !_this.state.browserSwipe) {
        _this.setState({
          browserSwipe: true
        });
      }

      if (platform === _platform.IOS && configProvider !== null && configProvider !== void 0 && configProvider.isWebView && _this.props.onSwipeBack) {
        var _this$props$history$l, _this$props$history;

        if (_this.state.animated && e.startX <= 70) {
          return;
        }

        if (e.startX <= 70 && !_this.state.swipingBack && ((_this$props$history$l = (_this$props$history = _this.props.history) === null || _this$props$history === void 0 ? void 0 : _this$props$history.length) !== null && _this$props$history$l !== void 0 ? _this$props$history$l : 0) > 1) {
          if (_this.state.activePanel !== null) {
            var _this$props$scroll;

            var prevScrolls = _this.scrolls[_this.state.activePanel] || [];
            _this.scrolls = (0, _objectSpread6.default)((0, _objectSpread6.default)({}, _this.scrolls), {}, (0, _defineProperty2.default)({}, _this.state.activePanel, [].concat((0, _toConsumableArray2.default)(prevScrolls), [(_this$props$scroll = _this.props.scroll) === null || _this$props$scroll === void 0 ? void 0 : _this$props$scroll.getScroll().y])));
          }

          _this.setState({
            swipingBack: true,
            swipebackStartX: e.startX,
            swipeBackPrevPanel: _this.state.activePanel,
            swipeBackNextPanel: _this.props.history.slice(-2)[0]
          });
        }

        if (_this.state.swipingBack) {
          var swipeBackShift;

          if (e.shiftX < 0) {
            swipeBackShift = 0;
          } else if (e.shiftX > _this.window.innerWidth - _this.state.swipebackStartX) {
            swipeBackShift = _this.window.innerWidth;
          } else {
            swipeBackShift = e.shiftX;
          }

          _this.setState({
            swipeBackShift: swipeBackShift
          });
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEnd", function (e) {
      if (_this.state.swipingBack && _this.window) {
        var speed = _this.state.swipeBackShift / e.duration * 1000;

        if (_this.state.swipeBackShift === 0) {
          _this.onSwipeBackCancel();
        } else if (_this.state.swipeBackShift >= _this.window.innerWidth) {
          _this.onSwipeBackSuccess();
        } else if (speed > 250 || _this.state.swipebackStartX + _this.state.swipeBackShift > _this.window.innerWidth / 2) {
          _this.setState({
            swipeBackResult: SwipeBackResults.success
          });
        } else {
          _this.setState({
            swipeBackResult: SwipeBackResults.fail
          });
        }
      }
    });
    _this.state = {
      animated: false,
      visiblePanels: [props.activePanel],
      activePanel: props.activePanel,
      isBack: undefined,
      prevPanel: null,
      nextPanel: null,
      swipingBack: false,
      swipebackStartX: 0,
      swipeBackShift: 0,
      swipeBackNextPanel: null,
      swipeBackPrevPanel: null,
      swipeBackResult: null,
      browserSwipe: false
    };
    return _this;
  }

  (0, _createClass2.default)(ViewInfiniteComponent, [{
    key: "document",
    get: function get() {
      return this.props.document;
    }
  }, {
    key: "window",
    get: function get() {
      return this.props.window;
    }
  }, {
    key: "panels",
    get: function get() {
      return React.Children.toArray(this.props.children);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var id = (0, _getNavId.getNavId)(this.props);

      if (id) {
        scrollsCache[id] = this.scrolls;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      this.props.popout && !prevProps.popout && this.blurActiveElement();
      this.props.modal && !prevProps.modal && this.blurActiveElement(); // Нужен переход

      if (prevProps.activePanel !== this.props.activePanel && !prevState.swipingBack && !prevState.browserSwipe) {
        var _this$props$scroll2;

        var isBack = false;

        if (this.props.isBackCheck) {
          isBack = this.props.isBackCheck({
            from: prevProps.activePanel,
            to: this.props.activePanel
          });
        } else {
          var firstLayerId = this.panels.map(function (panel) {
            return (0, _getNavId.getNavId)(panel.props, warn);
          }).find(function (id) {
            return id === prevProps.activePanel || id === _this2.props.activePanel;
          });
          isBack = firstLayerId === this.props.activePanel;
        }

        this.blurActiveElement();
        var prevScrolls = this.scrolls[prevProps.activePanel] || [];
        var scrolls = (0, _objectSpread6.default)((0, _objectSpread6.default)({}, this.scrolls), {}, (0, _defineProperty2.default)({}, prevProps.activePanel, [].concat((0, _toConsumableArray2.default)(prevScrolls), [(_this$props$scroll2 = this.props.scroll) === null || _this$props$scroll2 === void 0 ? void 0 : _this$props$scroll2.getScroll().y])));
        this.scrolls = scrolls;

        if (this.shouldDisableTransitionMotion()) {
          this.flushTransition(prevProps.activePanel, isBack);
        } else {
          this.setState({
            visiblePanels: [prevProps.activePanel, this.props.activePanel],
            prevPanel: prevProps.activePanel,
            nextPanel: this.props.activePanel,
            activePanel: null,
            animated: true,
            isBack: isBack
          }); // Фолбек анимации перехода

          if (!_supportEvents.animationEvent.supported) {
            if (this.animationFinishTimeout) {
              clearTimeout(this.animationFinishTimeout);
            }

            this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? 300 : 600);
          }
        }
      } // Закончилась анимация свайпа назад


      if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
        var nextPanel = this.state.swipeBackNextPanel;
        var prevPanel = this.state.swipeBackPrevPanel;
        var scrollPosition = undefined;
        this.scrolls = (0, _objectSpread6.default)({}, this.scrolls);

        if (prevPanel !== null) {
          var prevPanelScrolls = (0, _toConsumableArray2.default)(this.scrolls[prevPanel] || []).slice(0, -1);
          this.scrolls[prevPanel] = prevPanelScrolls;
        }

        if (nextPanel !== null) {
          var newPanelScrolls = (0, _toConsumableArray2.default)(this.scrolls[nextPanel] || []);
          scrollPosition = newPanelScrolls.pop();
          this.scrolls[nextPanel] = newPanelScrolls;
        }

        this.setState({
          swipeBackPrevPanel: null,
          swipeBackNextPanel: null,
          swipingBack: false,
          swipeBackResult: null,
          swipebackStartX: 0,
          swipeBackShift: 0,
          activePanel: nextPanel,
          visiblePanels: [nextPanel]
        }, function () {
          var _this2$props$scroll;

          (_this2$props$scroll = _this2.props.scroll) === null || _this2$props$scroll === void 0 ? void 0 : _this2$props$scroll.scrollTo(0, scrollPosition);
          prevProps.onTransition && prevProps.onTransition({
            isBack: true,
            from: prevPanel,
            to: nextPanel
          });
        });
      } // Начался свайп назад


      if (!prevState.swipingBack && this.state.swipingBack) {
        this.props.onSwipeBackStart && this.props.onSwipeBackStart();
      } // Началась анимация завершения свайпа назад.


      if (!prevState.swipeBackResult && this.state.swipeBackResult) {
        this.waitTransitionFinish(this.pickPanel(this.state.swipeBackNextPanel), this.swipingBackTransitionEndHandler);
      } // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)


      if (prevState.swipeBackResult === SwipeBackResults.fail && !this.state.swipeBackResult && this.state.activePanel !== null) {
        var _this$props$scroll3;

        var _newPanelScrolls = (0, _toConsumableArray2.default)(this.scrolls[this.state.activePanel] || []);

        var _scrollPosition = _newPanelScrolls.pop();

        this.scrolls = (0, _objectSpread6.default)((0, _objectSpread6.default)({}, this.scrolls), {}, (0, _defineProperty2.default)({}, this.state.activePanel, _newPanelScrolls));
        (_this$props$scroll3 = this.props.scroll) === null || _this$props$scroll3 === void 0 ? void 0 : _this$props$scroll3.scrollTo(0, _scrollPosition);
      } // Закончился Safari свайп


      if (prevProps.activePanel !== this.props.activePanel && this.state.browserSwipe) {
        this.setState({
          browserSwipe: false,
          nextPanel: null,
          prevPanel: null,
          animated: false,
          visiblePanels: [this.props.activePanel],
          activePanel: this.props.activePanel
        });
      }
    }
  }, {
    key: "shouldDisableTransitionMotion",
    value: function shouldDisableTransitionMotion() {
      var _this$props$configPro, _this$props$splitCol;

      return ((_this$props$configPro = this.props.configProvider) === null || _this$props$configPro === void 0 ? void 0 : _this$props$configPro.transitionMotionEnabled) === false || !((_this$props$splitCol = this.props.splitCol) !== null && _this$props$splitCol !== void 0 && _this$props$splitCol.animate);
    }
  }, {
    key: "waitTransitionFinish",
    value: function waitTransitionFinish(elem, eventHandler) {
      if (_supportEvents.transitionEvent.supported && _supportEvents.transitionEvent.name && elem) {
        elem.removeEventListener(_supportEvents.transitionEvent.name, eventHandler);
        elem.addEventListener(_supportEvents.transitionEvent.name, eventHandler);
      } else {
        if (this.transitionFinishTimeout) {
          clearTimeout(this.transitionFinishTimeout);
        }

        this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === _platform.ANDROID || this.props.platform === _platform.VKCOM ? 300 : 600);
      }
    }
  }, {
    key: "blurActiveElement",
    value: function blurActiveElement() {
      var _this$document;

      if (typeof this.window !== "undefined" && (_this$document = this.document) !== null && _this$document !== void 0 && _this$document.activeElement) {
        this.document.activeElement.blur();
      }
    }
  }, {
    key: "pickPanel",
    value: function pickPanel(id) {
      if (id === null) {
        return undefined;
      }

      return this.panelNodes[id];
    }
  }, {
    key: "flushTransition",
    value: function flushTransition(prevPanel, isBack) {
      var _this3 = this;

      var activePanel = this.props.activePanel;
      var prevPanelScrolls = (0, _toConsumableArray2.default)(this.scrolls[prevPanel] || []).slice(0, -1);
      var newPanelScrolls = (0, _toConsumableArray2.default)(this.scrolls[activePanel] || []);
      var scrollPosition = isBack ? newPanelScrolls.pop() : 0;

      if (isBack) {
        var _objectSpread5;

        this.scrolls = (0, _objectSpread6.default)((0, _objectSpread6.default)({}, this.scrolls), {}, (_objectSpread5 = {}, (0, _defineProperty2.default)(_objectSpread5, prevPanel, prevPanelScrolls), (0, _defineProperty2.default)(_objectSpread5, activePanel, newPanelScrolls), _objectSpread5));
      }

      this.setState({
        prevPanel: null,
        nextPanel: null,
        visiblePanels: [activePanel],
        activePanel: activePanel,
        animated: false,
        isBack: undefined
      }, function () {
        var _this3$props$scroll;

        (_this3$props$scroll = _this3.props.scroll) === null || _this3$props$scroll === void 0 ? void 0 : _this3$props$scroll.scrollTo(0, isBack ? scrollPosition : 0);
        _this3.props.onTransition && _this3.props.onTransition({
          isBack: isBack,
          from: prevPanel,
          to: activePanel
        });
      });
    }
  }, {
    key: "onSwipeBackSuccess",
    value: function onSwipeBackSuccess() {
      this.props.onSwipeBack && this.props.onSwipeBack();
    }
  }, {
    key: "onSwipeBackCancel",
    value: function onSwipeBackCancel() {
      this.props.onSwipeBackCancel && this.props.onSwipeBackCancel();
      this.setState({
        swipeBackPrevPanel: null,
        swipeBackNextPanel: null,
        swipingBack: false,
        swipeBackResult: null,
        swipebackStartX: 0,
        swipeBackShift: 0
      });
    }
  }, {
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
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          popout = _this$props2.popout,
          modal = _this$props2.modal,
          platform = _this$props2.platform,
          _1 = _this$props2.activePanel,
          splitCol = _this$props2.splitCol,
          configProvider = _this$props2.configProvider,
          history = _this$props2.history,
          id = _this$props2.id,
          nav = _this$props2.nav,
          onTransition = _this$props2.onTransition,
          onSwipeBack = _this$props2.onSwipeBack,
          onSwipeBackStart = _this$props2.onSwipeBackStart,
          onSwipeBackCancel = _this$props2.onSwipeBackCancel,
          window = _this$props2.window,
          document = _this$props2.document,
          scroll = _this$props2.scroll,
          isBackCheck = _this$props2.isBackCheck,
          restProps = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
      var _this$state = this.state,
          prevPanel = _this$state.prevPanel,
          nextPanel = _this$state.nextPanel,
          activePanel = _this$state.activePanel,
          isBack = _this$state.isBack,
          animated = _this$state.animated,
          swipeBackPrevPanel = _this$state.swipeBackPrevPanel,
          swipeBackNextPanel = _this$state.swipeBackNextPanel,
          swipeBackResult = _this$state.swipeBackResult,
          swipingBack = _this$state.swipingBack;
      var hasPopout = !!popout;
      var hasModal = !!modal;
      var panels = this.panels.filter(function (panel) {
        var panelId = (0, _getNavId.getNavId)(panel.props, warn);
        return panelId !== undefined && _this4.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
      }).sort(function (panel) {
        var panelId = (0, _getNavId.getNavId)(panel.props, warn);
        var isPrevPanel = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var isNextPanel = panelId === nextPanel || panelId === swipeBackNextPanel;

        if (isNextPanel) {
          return swipingBack || _this4.state.isBack ? -1 : 1;
        }

        if (isPrevPanel) {
          return swipingBack || _this4.state.isBack ? 1 : -1;
        }

        return 0;
      });
      var disableAnimation = this.shouldDisableTransitionMotion();
      var modifiers = {
        "View--animated": !disableAnimation && this.state.animated,
        "View--swiping-back": !disableAnimation && this.state.swipingBack,
        "View--no-motion": disableAnimation
      };
      return (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({
        Component: "section"
      }, restProps, {
        vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("View", platform), modifiers),
        onMoveX: this.onMoveX,
        onEnd: this.onEnd
      }), (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "View__panels"
      }, panels.map(function (panel) {
        var panelId = (0, _getNavId.getNavId)(panel.props, warn);
        var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        var scrollList = panelId && _this4.scrolls[panelId] || [];
        var scroll = scrollList[scrollList.length - 1] || 0;
        return (0, _jsxRuntime.createScopedElement)("div", {
          vkuiClass: (0, _classNames.classNames)("View__panel", {
            "View__panel--active": panelId === activePanel,
            "View__panel--prev": panelId === prevPanel,
            "View__panel--next": panelId === nextPanel,
            "View__panel--swipe-back-prev": panelId === swipeBackPrevPanel,
            "View__panel--swipe-back-next": panelId === swipeBackNextPanel,
            "View__panel--swipe-back-success": swipeBackResult === SwipeBackResults.success,
            "View__panel--swipe-back-failed": swipeBackResult === SwipeBackResults.fail
          }),
          onAnimationEnd: isTransitionTarget ? _this4.transitionEndHandler : undefined,
          ref: function ref(el) {
            return panelId !== undefined && (_this4.panelNodes[panelId] = el);
          },
          style: _this4.calcPanelSwipeStyles(panelId),
          key: panelId
        }, (0, _jsxRuntime.createScopedElement)("div", {
          vkuiClass: "View__panel-in",
          style: {
            marginTop: compensateScroll ? -scroll : undefined
          }
        }, (0, _jsxRuntime.createScopedElement)(_NavTransitionContext.NavTransitionProvider, {
          entering: panelId === nextPanel || panelId === swipeBackNextPanel
        }, panel)));
      })), (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, null, hasPopout && (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "View__popout"
      }, popout), hasModal && (0, _jsxRuntime.createScopedElement)("div", {
        vkuiClass: "View__modal"
      }, modal)));
    }
  }]);
  return ViewInfiniteComponent;
}(React.Component);

(0, _defineProperty2.default)(ViewInfiniteComponent, "defaultProps", {
  history: []
});
var ViewInfinite = (0, _withContext.withContext)((0, _withContext.withContext)((0, _withContext.withContext)((0, _withPlatform.withPlatform)((0, _dom.withDOM)(ViewInfiniteComponent)), _SplitCol.SplitColContext, "splitCol"), _ConfigProviderContext.ConfigProviderContext, "configProvider"), _ScrollContext.ScrollContext, "scroll");
exports.ViewInfinite = ViewInfinite;
//# sourceMappingURL=ViewInfinite.js.map