import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["popout", "modal", "platform", "activePanel", "splitCol", "configProvider", "history", "id", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "window", "document", "scroll", "isBackCheck"];
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
var warn = warnOnce("ViewInfinite");
var SwipeBackResults;

(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));

var scrollsCache = {};

var ViewInfiniteComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(ViewInfiniteComponent, _React$Component);

  var _super = _createSuper(ViewInfiniteComponent);

  function ViewInfiniteComponent(props) {
    var _this;

    _classCallCheck(this, ViewInfiniteComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "scrolls", scrollsCache[getNavId(_this.props, warn)] || {});

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

    _defineProperty(_assertThisInitialized(_this), "onMoveX", function (e) {
      if (swipeBackExcluded(e) || !_this.window) {
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

        if (_this.state.animated && e.startX <= 70) {
          return;
        }

        if (e.startX <= 70 && !_this.state.swipingBack && ((_this$props$history$l = (_this$props$history = _this.props.history) === null || _this$props$history === void 0 ? void 0 : _this$props$history.length) !== null && _this$props$history$l !== void 0 ? _this$props$history$l : 0) > 1) {
          if (_this.state.activePanel !== null) {
            var _this$props$scroll;

            var prevScrolls = _this.scrolls[_this.state.activePanel] || [];
            _this.scrolls = _objectSpread(_objectSpread({}, _this.scrolls), {}, _defineProperty({}, _this.state.activePanel, [].concat(_toConsumableArray(prevScrolls), [(_this$props$scroll = _this.props.scroll) === null || _this$props$scroll === void 0 ? void 0 : _this$props$scroll.getScroll().y])));
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

    _defineProperty(_assertThisInitialized(_this), "onEnd", function (e) {
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

  _createClass(ViewInfiniteComponent, [{
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

        var isBack = false;

        if (this.props.isBackCheck) {
          isBack = this.props.isBackCheck({
            from: prevProps.activePanel,
            to: this.props.activePanel
          });
        } else {
          var firstLayerId = this.panels.map(function (panel) {
            return getNavId(panel.props, warn);
          }).find(function (id) {
            return id === prevProps.activePanel || id === _this2.props.activePanel;
          });
          isBack = firstLayerId === this.props.activePanel;
        }

        this.blurActiveElement();
        var prevScrolls = this.scrolls[prevProps.activePanel] || [];

        var scrolls = _objectSpread(_objectSpread({}, this.scrolls), {}, _defineProperty({}, prevProps.activePanel, [].concat(_toConsumableArray(prevScrolls), [(_this$props$scroll2 = this.props.scroll) === null || _this$props$scroll2 === void 0 ? void 0 : _this$props$scroll2.getScroll().y])));

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

          if (!animationEvent.supported) {
            if (this.animationFinishTimeout) {
              clearTimeout(this.animationFinishTimeout);
            }

            this.animationFinishTimeout = setTimeout(this.transitionEndHandler, this.props.platform === ANDROID || this.props.platform === VKCOM ? 300 : 600);
          }
        }
      } // Закончилась анимация свайпа назад


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

        var _newPanelScrolls = _toConsumableArray(this.scrolls[this.state.activePanel] || []);

        var _scrollPosition = _newPanelScrolls.pop();

        this.scrolls = _objectSpread(_objectSpread({}, this.scrolls), {}, _defineProperty({}, this.state.activePanel, _newPanelScrolls));
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

      var prevPanelScrolls = _toConsumableArray(this.scrolls[prevPanel] || []).slice(0, -1);

      var newPanelScrolls = _toConsumableArray(this.scrolls[activePanel] || []);

      var scrollPosition = isBack ? newPanelScrolls.pop() : 0;

      if (isBack) {
        var _objectSpread5;

        this.scrolls = _objectSpread(_objectSpread({}, this.scrolls), {}, (_objectSpread5 = {}, _defineProperty(_objectSpread5, prevPanel, prevPanelScrolls), _defineProperty(_objectSpread5, activePanel, newPanelScrolls), _objectSpread5));
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
          restProps = _objectWithoutProperties(_this$props2, _excluded);

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
        var panelId = getNavId(panel.props, warn);
        return panelId !== undefined && _this4.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
      }).sort(function (panel) {
        var panelId = getNavId(panel.props, warn);
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
      return createScopedElement(Touch, _extends({
        Component: "section"
      }, restProps, {
        vkuiClass: classNames(getClassName("View", platform), modifiers),
        onMoveX: this.onMoveX,
        onEnd: this.onEnd
      }), createScopedElement("div", {
        vkuiClass: "View__panels"
      }, panels.map(function (panel) {
        var panelId = getNavId(panel.props, warn);
        var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
        var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
        var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
        var scrollList = panelId && _this4.scrolls[panelId] || [];
        var scroll = scrollList[scrollList.length - 1] || 0;
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
            marginTop: compensateScroll ? -scroll : undefined
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

  return ViewInfiniteComponent;
}(React.Component);

_defineProperty(ViewInfiniteComponent, "defaultProps", {
  history: []
});

export var ViewInfinite = withContext(withContext(withContext(withPlatform(withDOM(ViewInfiniteComponent)), SplitColContext, "splitCol"), ConfigProviderContext, "configProvider"), ScrollContext, "scroll");
//# sourceMappingURL=ViewInfinite.js.map