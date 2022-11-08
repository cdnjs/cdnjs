"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollsCache = exports.View = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _supportEvents = require("../../lib/supportEvents");
var _platform = require("../../lib/platform");
var _Touch = require("../Touch/Touch");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _SplitCol = require("../SplitCol/SplitCol");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _dom = require("../../lib/dom");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("./utils");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _useTimeout = require("../../hooks/useTimeout");
var _usePrevious = require("../../hooks/usePrevious");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _utils2 = require("../../lib/utils");
var _excluded = ["popout", "modal", "activePanel", "history", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "children"];
var SwipeBackResults;
(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
var scrollsCache = {};
exports.scrollsCache = scrollsCache;
var warn = (0, _warnOnce.warnOnce)("View");

/**
 * @see https://vkcom.github.io/VKUI/#/View
 */
var View = function View(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    activePanelProp = _ref.activePanel,
    history = _ref.history,
    nav = _ref.nav,
    onTransition = _ref.onTransition,
    onSwipeBack = _ref.onSwipeBack,
    onSwipeBackStart = _ref.onSwipeBackStart,
    onSwipeBackCancelProp = _ref.onSwipeBackCancel,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  if (process.env.NODE_ENV === "development") {
    popout && warn("Свойство popout устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
    modal && warn("Свойство modal устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
  }
  var scrolls = React.useRef(scrollsCache[(0, _getNavId.getNavId)({
    nav: nav,
    id: restProps.id
  })] || {});
  var afterTransition = React.useRef(_utils2.noop);
  React.useEffect(function () {
    return function () {
      var id = (0, _getNavId.getNavId)({
        nav: nav,
        id: restProps.id
      });
      if (id) {
        scrollsCache[id] = scrolls.current;
      }
    };
  });
  var panelNodes = React.useRef({});
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window,
    document = _useDOM.document;
  var scroll = (0, _ScrollContext.useScroll)();
  var configProvider = (0, _ConfigProviderContext.useConfigProvider)();
  var splitCol = (0, _SplitCol.useSplitCol)();
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    animated = _React$useState2[0],
    setAnimated = _React$useState2[1];
  var _React$useState3 = React.useState([activePanelProp]),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    visiblePanels = _React$useState4[0],
    setVisiblePanels = _React$useState4[1];
  var _React$useState5 = React.useState(activePanelProp),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    activePanel = _React$useState6[0],
    setActivePanel = _React$useState6[1];
  var _React$useState7 = React.useState(undefined),
    _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
    isBack = _React$useState8[0],
    setIsBack = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
    prevPanel = _React$useState10[0],
    setPrevPanel = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
    nextPanel = _React$useState12[0],
    setNextPanel = _React$useState12[1];
  var _React$useState13 = React.useState(false),
    _React$useState14 = (0, _slicedToArray2.default)(_React$useState13, 2),
    swipingBack = _React$useState14[0],
    setSwipingBack = _React$useState14[1];
  var _React$useState15 = React.useState(0),
    _React$useState16 = (0, _slicedToArray2.default)(_React$useState15, 2),
    swipeBackStartX = _React$useState16[0],
    setSwipeBackStartX = _React$useState16[1];
  var _React$useState17 = React.useState(0),
    _React$useState18 = (0, _slicedToArray2.default)(_React$useState17, 2),
    swipeBackShift = _React$useState18[0],
    setSwipeBackShift = _React$useState18[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = (0, _slicedToArray2.default)(_React$useState19, 2),
    swipeBackNextPanel = _React$useState20[0],
    setSwipeBackNextPanel = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = (0, _slicedToArray2.default)(_React$useState21, 2),
    swipeBackPrevPanel = _React$useState22[0],
    setSwipeBackPrevPanel = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = (0, _slicedToArray2.default)(_React$useState23, 2),
    swipeBackResult = _React$useState24[0],
    setSwipeBackResult = _React$useState24[1];
  var _React$useState25 = React.useState(false),
    _React$useState26 = (0, _slicedToArray2.default)(_React$useState25, 2),
    browserSwipe = _React$useState26[0],
    setBrowserSwipe = _React$useState26[1];
  var prevActivePanel = (0, _usePrevious.usePrevious)(activePanelProp);
  var prevSwipingBack = (0, _usePrevious.usePrevious)(swipingBack);
  var prevBrowserSwipe = (0, _usePrevious.usePrevious)(browserSwipe);
  var prevSwipeBackResult = (0, _usePrevious.usePrevious)(swipeBackResult);
  var prevSwipeBackPrevPanel = (0, _usePrevious.usePrevious)(swipeBackPrevPanel);
  var prevOnTransition = (0, _usePrevious.usePrevious)(onTransition);
  var panels = React.Children.toArray(children).filter(function (panel) {
    var panelId = (0, _getNavId.getNavId)(panel.props, warn);
    return panelId !== undefined && visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
  });
  var disableAnimation = (configProvider === null || configProvider === void 0 ? void 0 : configProvider.transitionMotionEnabled) === false || !(splitCol !== null && splitCol !== void 0 && splitCol.animate);
  var pickPanel = function pickPanel(id) {
    if (id === null) {
      return null;
    }
    return panelNodes.current[id];
  };
  var flushTransition = React.useCallback(function (prevPanel, isBackTransition) {
    if (isBackTransition) {
      scrolls.current[prevPanel] = 0;
    }
    setPrevPanel(null);
    setNextPanel(null);
    setVisiblePanels([activePanelProp]);
    setActivePanel(activePanelProp);
    setAnimated(false);
    setIsBack(undefined);
    afterTransition.current = function () {
      scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, isBackTransition ? scrolls.current[activePanelProp] : 0);
      onTransition && onTransition({
        isBack: isBackTransition,
        from: prevPanel,
        to: activePanelProp
      });
    };
  }, [activePanelProp, onTransition, scroll]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    afterTransition.current();
    afterTransition.current = _utils2.noop;
  }, [afterTransition.current]);
  var transitionEndHandler = React.useCallback(function (e) {
    if ((!e || ["vkui-animation-ios-next-forward", "vkui-animation-ios-prev-back", "vkui-animation-view-next-forward", "vkui-animation-view-prev-back"].includes(e.animationName)) && prevPanel !== null) {
      flushTransition(prevPanel, Boolean(isBack));
    }
  }, [flushTransition, isBack, prevPanel]);
  var _useWaitTransitionFin = (0, _useWaitTransitionFinish.useWaitTransitionFinish)(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var animationFinishTimeout = (0, _useTimeout.useTimeout)(transitionEndHandler, platform === _platform.IOS ? 600 : 300);
  var onSwipeBackSuccess = React.useCallback(function () {
    onSwipeBack && onSwipeBack();
  }, [onSwipeBack]);
  var onSwipeBackCancel = React.useCallback(function () {
    onSwipeBackCancelProp && onSwipeBackCancelProp();
    setSwipeBackPrevPanel(null);
    setSwipeBackNextPanel(null);
    setSwipingBack(false);
    setSwipeBackResult(null);
    setSwipeBackStartX(0);
    setSwipeBackShift(0);
  }, [onSwipeBackCancelProp]);
  var swipingBackTransitionEndHandler = React.useCallback(function (e) {
    // indexOf because of vendor prefixes in old browsers
    if (!e || e !== null && e !== void 0 && e.propertyName.includes("transform") && (e === null || e === void 0 ? void 0 : e.target) === pickPanel(swipeBackNextPanel)) {
      switch (swipeBackResult) {
        case SwipeBackResults.fail:
          onSwipeBackCancel();
          break;
        case SwipeBackResults.success:
          onSwipeBackSuccess();
      }
    }
  }, [onSwipeBackCancel, onSwipeBackSuccess, swipeBackNextPanel, swipeBackResult]);
  var onMoveX = function onMoveX(e) {
    if ((0, _utils.swipeBackExcluded)(e)) {
      return;
    }
    if (platform === _platform.IOS && !(configProvider !== null && configProvider !== void 0 && configProvider.isWebView) && (e.startX <= 70 || e.startX >= window.innerWidth - 70) && !browserSwipe) {
      setBrowserSwipe(true);
    }
    if (platform === _platform.IOS && configProvider !== null && configProvider !== void 0 && configProvider.isWebView && onSwipeBack) {
      if (animated && e.startX <= 70 || !window) {
        return;
      }
      if (e.startX <= 70 && !swipingBack && history && history.length > 1) {
        if (activePanel !== null) {
          // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
          (0, _dom.blurActiveElement)(document);
          scrolls.current[activePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
        }
        setSwipingBack(true);
        setSwipeBackStartX(e.startX);
        setSwipeBackPrevPanel(activePanel);
        setSwipeBackNextPanel(history.slice(-2)[0]);
      }
      if (swipingBack) {
        var _swipeBackShift = 0;
        if (e.shiftX < 0) {
          _swipeBackShift = 0;
        } else if (e.shiftX > window.innerWidth - swipeBackStartX) {
          _swipeBackShift = window === null || window === void 0 ? void 0 : window.innerWidth;
        } else {
          _swipeBackShift = e.shiftX;
        }
        setSwipeBackShift(_swipeBackShift);
      }
    }
  };
  var onEnd = React.useCallback(function (e) {
    if (swipingBack && window) {
      var _window$innerWidth;
      var speed = swipeBackShift / e.duration * 1000;
      if (swipeBackShift === 0) {
        onSwipeBackCancel();
      } else if (swipeBackShift >= ((_window$innerWidth = window === null || window === void 0 ? void 0 : window.innerWidth) !== null && _window$innerWidth !== void 0 ? _window$innerWidth : 0)) {
        onSwipeBackSuccess();
      } else if (speed > 250 || swipeBackStartX + swipeBackShift > window.innerWidth / 2) {
        setSwipeBackResult(SwipeBackResults.success);
      } else {
        setSwipeBackResult(SwipeBackResults.fail);
      }
    }
  }, [onSwipeBackCancel, onSwipeBackSuccess, swipeBackShift, swipeBackStartX, swipingBack, window]);
  var calcPanelSwipeStyles = function calcPanelSwipeStyles(panelId) {
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
  React.useEffect(function () {
    popout && (0, _dom.blurActiveElement)(document);
  }, [document, popout]);
  React.useEffect(function () {
    // Нужен переход
    if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
      var firstLayerId = React.Children.toArray(children).map(function (panel) {
        return (0, _getNavId.getNavId)(panel.props, warn);
      }).find(function (id) {
        return id === prevActivePanel || id === activePanelProp;
      });
      var isBackTransition = firstLayerId === activePanelProp;
      scrolls.current[prevActivePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
      if (disableAnimation) {
        flushTransition(prevActivePanel, isBackTransition);
      } else {
        (0, _dom.blurActiveElement)(document);
        setVisiblePanels([prevActivePanel, activePanelProp]);
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
      var _nextPanel = activePanelProp;
      var _prevPanel = prevActivePanel;
      if (prevSwipeBackPrevPanel) {
        scrolls.current[prevSwipeBackPrevPanel] = 0;
      }
      setSwipeBackPrevPanel(null);
      setSwipeBackNextPanel(null);
      setSwipingBack(false);
      setSwipeBackResult(null);
      setSwipeBackStartX(0);
      setSwipeBackShift(0);
      setActivePanel(_nextPanel);
      setVisiblePanels([_nextPanel]);
      afterTransition.current = function () {
        if (_nextPanel !== null) {
          scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, scrolls.current[_nextPanel]);
        }
        prevOnTransition && prevOnTransition({
          isBack: true,
          from: _prevPanel,
          to: _nextPanel
        });
      };
    }

    // Начался свайп назад
    if (!prevSwipingBack && swipingBack) {
      onSwipeBackStart && onSwipeBackStart();
    }

    // Началась анимация завершения свайпа назад.
    if (!prevSwipeBackResult && swipeBackResult) {
      waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === _platform.IOS ? 600 : 300);
    }

    // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
    if (prevSwipeBackResult === SwipeBackResults.fail && !swipeBackResult && activePanel !== null) {
      scroll === null || scroll === void 0 ? void 0 : scroll.scrollTo(0, scrolls.current[activePanel]);
    }

    // Закончился Safari свайп
    if (prevActivePanel !== activePanelProp && browserSwipe) {
      setBrowserSwipe(false);
      setNextPanel(null);
      setPrevPanel(null);
      setAnimated(false);
      setVisiblePanels([activePanelProp]);
      setActivePanel(activePanelProp);
    }
  }, [activePanelProp, activePanel, animationFinishTimeout, browserSwipe, children, disableAnimation, document, flushTransition, onSwipeBackStart, panels, platform, prevActivePanel, prevBrowserSwipe, prevOnTransition, prevSwipeBackPrevPanel, prevSwipeBackResult, prevSwipingBack, scroll, swipeBackNextPanel, swipeBackResult, swipingBack, swipingBackTransitionEndHandler, waitTransitionFinish]);
  return (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({
    Component: "section"
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)("View", platform === _platform.IOS && "View--ios", !disableAnimation && animated && "View--animated", !disableAnimation && swipingBack && "View--swiping-back", disableAnimation && "View--no-motion"),
    onMoveX: onMoveX,
    onEnd: onEnd
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "View__panels"
  }, panels.map(function (panel) {
    var _scrolls$current;
    var panelId = (0, _getNavId.getNavId)(panel.props, warn);
    var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
    var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
    var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
    return (0, _jsxRuntime.createScopedElement)("div", {
      vkuiClass: (0, _classNames.classNames)("View__panel", panelId === activePanel && "View__panel--active", panelId === prevPanel && "View__panel--prev", panelId === nextPanel && "View__panel--next", panelId === swipeBackPrevPanel && "View__panel--swipe-back-prev", panelId === swipeBackNextPanel && "View__panel--swipe-back-next", swipeBackResult === SwipeBackResults.success && "View__panel--swipe-back-success", swipeBackResult === SwipeBackResults.fail && "View__panel--swipe-back-failed"),
      onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
      ref: function ref(el) {
        return panelId !== undefined && (panelNodes.current[panelId] = el);
      },
      style: calcPanelSwipeStyles(panelId),
      key: panelId
    }, (0, _jsxRuntime.createScopedElement)("div", {
      vkuiClass: "View__panel-in",
      style: {
        marginTop: compensateScroll ? -((_scrolls$current = scrolls.current[panelId]) !== null && _scrolls$current !== void 0 ? _scrolls$current : 0) : undefined
      }
    }, (0, _jsxRuntime.createScopedElement)(_NavTransitionContext.NavTransitionProvider, {
      entering: panelId === nextPanel || panelId === swipeBackNextPanel
    }, panel)));
  })), (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, null, !!popout && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "View__popout"
  }, popout), !!modal && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "View__modal"
  }, modal)));
};
exports.View = View;
//# sourceMappingURL=View.js.map