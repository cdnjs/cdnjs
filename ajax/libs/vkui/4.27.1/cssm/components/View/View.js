import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["popout", "modal", "platform", "activePanel", "splitCol", "configProvider", "history", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "window", "document", "scroll"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { transitionEvent, animationEvent } from "../../lib/supportEvents";
import { getClassName } from "../../helpers/getClassName";
import { IOS, ANDROID, VKCOM } from "../../lib/platform";
import { Touch } from "../Touch/Touch";
import { withPlatform } from "../../hoc/withPlatform";
import { withContext } from "../../hoc/withContext";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import { SplitColContext } from "../SplitCol/SplitCol";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { canUseDOM, withDOM } from "../../lib/dom";
import { ScrollContext } from "../AppRoot/ScrollContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { swipeBackExcluded } from "./utils";
import "./View.css";
var SwipeBackResults;

(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));

export var scrollsCache = {};
var warn = warnOnce("View");

var View = /*#__PURE__*/function (_React$Component) {
  _inherits(View, _React$Component);

  var _super = _createSuper(View);

  function View(props) {
    var _this;

    _classCallCheck(this, View);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "scrolls", scrollsCache[getNavId(_this.props)] || {});

    _defineProperty(_assertThisInitialized(_this), "transitionFinishTimeout", undefined);

    _defineProperty(_assertThisInitialized(_this), "animationFinishTimeout", undefined);

    _defineProperty(_assertThisInitialized(_this), "panelNodes", {});

    _defineProperty(_assertThisInitialized(_this), "transitionEndHandler", function (e) {
      if ((!e || ["vkui-animation-ios-next-forward", "vkui-animation-ios-prev-back", "vkui-animation-view-next-forward", "vkui-animation-view-prev-back"].includes(e.animationName)) && _this.state.prevPanel !== null) {
        _this.flushTransition(_this.state.prevPanel, Boolean(_this.state.isBack));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "swipingBackTransitionEndHandler", function (e) {
      // indexOf because of vendor prefixes in old browsers
      if (!e || e !== null && e !== void 0 && e.propertyName.includes("transform") && (e === null || e === void 0 ? void 0 : e.target) === _this.pickPanel(_this.state.swipeBackNextPanel)) {
        switch (_this.state.swipeBackResult) {
          case SwipeBackResults.fail:
            _this.onSwipeBackCancel();

            break;

          case SwipeBackResults.success:
            _this.onSwipeBackSuccess();

        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveX", function (e) {
      if (swipeBackExcluded(e)) {
        return;
      }

      var _this$props = _this.props,
          platform = _this$props.platform,
          configProvider = _this$props.configProvider;

      if (platform === IOS && !(configProvider !== null && configProvider !== void 0 && configProvider.isWebView) && (e.startX <= 70 || e.startX >= _this.window.innerWidth - 70) && !_this.state.browserSwipe) {
        _this.setState({
          browserSwipe: true
        });
      }

      if (platform === IOS && configProvider !== null && configProvider !== void 0 && configProvider.isWebView && _this.props.onSwipeBack) {
        var _this$props$history$l, _this$props$history;

        if (_this.state.animated && e.startX <= 70 || !_this.window) {
          return;
        }

        if (e.startX <= 70 && !_this.state.swipingBack && ((_this$props$history$l = (_this$props$history = _this.props.history) === null || _this$props$history === void 0 ? void 0 : _this$props$history.length) !== null && _this$props$history$l !== void 0 ? _this$props$history$l : 0) > 1) {
          if (_this.state.activePanel !== null) {
            var _this$props$scroll;

            _this.scrolls[_this.state.activePanel] = (_this$props$scroll = _this.props.scroll) === null || _this$props$scroll === void 0 ? void 0 : _this$props$scroll.getScroll().y;
          }

          _this.setState({
            swipingBack: true,
            swipebackStartX: e.startX,
            swipeBackPrevPanel: _this.state.activePanel,
            swipeBackNextPanel: _this.props.history.slice(-2)[0]
          });
        }

        if (_this.state.swipingBack) {
          var swipeBackShift = 0;

          if (e.shiftX < 0) {
            swipeBackShift = 0;
          } else if (e.shiftX > _this.window.innerWidth - _this.state.swipebackStartX) {
            var _this$window;

            swipeBackShift = (_this$window = _this.window) === null || _this$window === void 0 ? void 0 : _this$window.innerWidth;
          } else {
            swipeBackShift = e.shiftX;
          }

          _this.setState({
            swipeBackShift: swipeBackShift
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEnd", function (e) {
      if (_this.state.swipingBack && _this.window) {
        var _this$window$innerWid, _this$window2;

        var speed = _this.state.swipeBackShift / e.duration * 1000;

        if (_this.state.swipeBackShift === 0) {
          _this.onSwipeBackCancel();
        } else if (_this.state.swipeBackShift >= ((_this$window$innerWid = (_this$window2 = _this.window) === null || _this$window2 === void 0 ? void 0 : _this$window2.innerWidth) !== null && _this$window$innerWid !== void 0 ? _this$window$innerWid : 0)) {
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

  _createClass(View, [{
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
    key: "componentDidMount",
    value: function componentDidMount() {
      if (process.env.NODE_ENV === "development") {
        var _this$props2 = this.props,
            popout = _this$props2.popout,
            modal = _this$props2.modal;
        popout && warn("Свойство popout устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
        modal && warn("Свойство modal устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var id = getNavId(this.props);

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

        var firstLayerId = this.panels.map(function (panel) {
          return getNavId(panel.props, warn);
        }).find(function (id) {
          return id === prevProps.activePanel || id === _this2.props.activePanel;
        });
        var isBack = firstLayerId === this.props.activePanel;
        this.scrolls[prevProps.activePanel] = (_this$props$scroll2 = this.props.scroll) === null || _this$props$scroll2 === void 0 ? void 0 : _this$props$scroll2.getScroll().y;

        if (this.shouldDisableTransitionMotion()) {
          this.flushTransition(prevProps.activePanel, isBack);
        } else {
          this.blurActiveElement();
          this.setState({
            visiblePanels: [prevProps.activePanel, this.props.activePanel],
            prevPanel: prevProps.activePanel,
            nextPanel: this.props.activePanel,
            activePanel: null,
            animated: true,
            isBack: isBack
          }); // Фолбек анимации перехода

          if (!animationEvent.supported) {
            if (this.animationFinishTimeout) {
              clearTimeout(this.animationFinishTimeout);
            }

            this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === ANDROID || this.props.platform === VKCOM ? 300 : 600);
          }
        }
      } // Закончилась анимация свайпа назад


      if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
        var nextPanel = this.props.activePanel;
        var prevPanel = prevProps.activePanel;

        if (prevState.swipeBackPrevPanel !== null) {
          this.scrolls[prevState.swipeBackPrevPanel] = 0;
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
          if (_this2.state.activePanel !== null) {
            var _this2$props$scroll;

            (_this2$props$scroll = _this2.props.scroll) === null || _this2$props$scroll === void 0 ? void 0 : _this2$props$scroll.scrollTo(0, _this2.scrolls[_this2.state.activePanel]);
          }

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

        (_this$props$scroll3 = this.props.scroll) === null || _this$props$scroll3 === void 0 ? void 0 : _this$props$scroll3.scrollTo(0, this.scrolls[this.state.activePanel]);
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
      if (transitionEvent.supported && transitionEvent.name && elem) {
        elem.removeEventListener(transitionEvent.name, eventHandler);
        elem.addEventListener(transitionEvent.name, eventHandler);
      } else {
        if (this.transitionFinishTimeout) {
          clearTimeout(this.transitionFinishTimeout);
        }

        this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === ANDROID || this.props.platform === VKCOM ? 300 : 600);
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

      if (isBack) {
        this.scrolls[prevPanel] = 0;
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

        (_this3$props$scroll = _this3.props.scroll) === null || _this3$props$scroll === void 0 ? void 0 : _this3$props$scroll.scrollTo(0, isBack ? _this3.scrolls[activePanel] : 0);
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
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          popout = _this$props3.popout,
          modal = _this$props3.modal,
          platform = _this$props3.platform,
          _1 = _this$props3.activePanel,
          splitCol = _this$props3.splitCol,
          configProvider = _this$props3.configProvider,
          history = _this$props3.history,
          nav = _this$props3.nav,
          onTransition = _this$props3.onTransition,
          onSwipeBack = _this$props3.onSwipeBack,
          onSwipeBackStart = _this$props3.onSwipeBackStart,
          onSwipeBackCancel = _this$props3.onSwipeBackCancel,
          window = _this$props3.window,
          document = _this$props3.document,
          scroll = _this$props3.scroll,
          restProps = _objectWithoutProperties(_this$props3, _excluded);

      var _this$state = this.state,
          prevPanel = _this$state.prevPanel,
          nextPanel = _this$state.nextPanel,
          activePanel = _this$state.activePanel,
          swipeBackPrevPanel = _this$state.swipeBackPrevPanel,
          swipeBackNextPanel = _this$state.swipeBackNextPanel,
          swipeBackResult = _this$state.swipeBackResult,
          isBack = _this$state.isBack,
          animated = _this$state.animated;
      var hasPopout = !!popout;
      var hasModal = !!modal;
      var panels = this.panels.filter(function (panel) {
        var panelId = getNavId(panel.props, warn);
        return panelId !== undefined && _this4.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
      });
      var disableAnimation = this.shouldDisableTransitionMotion();
      var modifiers = {
        "View--animated": !disableAnimation && animated,
        "View--swiping-back": !disableAnimation && this.state.swipingBack,
        "View--no-motion": disableAnimation
      };
      return createScopedElement(Touch, _extends({
        Component: "section"
      }, restProps, {
        vkuiClass: classNames(getClassName("View", platform), modifiers),
        onMoveX: this.onMoveX,
        onEnd: this.onEnd
      }), createScopedElement("div", {
        vkuiClass: "View__panels"
      }, panels.map(function (panel) {
        var _this4$scrolls;

        var panelId = getNavId(panel.props, warn);
        var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        return createScopedElement("div", {
          vkuiClass: classNames("View__panel", {
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
        }, createScopedElement("div", {
          vkuiClass: "View__panel-in",
          style: {
            marginTop: compensateScroll ? -((_this4$scrolls = _this4.scrolls[panelId]) !== null && _this4$scrolls !== void 0 ? _this4$scrolls : 0) : undefined
          }
        }, createScopedElement(NavTransitionProvider, {
          entering: panelId === nextPanel || panelId === swipeBackNextPanel
        }, panel)));
      })), createScopedElement(AppRootPortal, null, hasPopout && createScopedElement("div", {
        vkuiClass: "View__popout"
      }, popout), hasModal && createScopedElement("div", {
        vkuiClass: "View__modal"
      }, modal)));
    }
  }]);

  return View;
}(React.Component); // eslint-disable-next-line import/no-default-export


_defineProperty(View, "defaultProps", {
  history: []
});

export default withContext(withContext(withContext(withPlatform(withDOM(View)), SplitColContext, "splitCol"), ConfigProviderContext, "configProvider"), ScrollContext, "scroll");
//# sourceMappingURL=View.js.map