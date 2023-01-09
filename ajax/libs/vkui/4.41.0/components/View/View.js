import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "activePanel", "history", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { animationEvent } from "../../lib/supportEvents";
import { IOS } from "../../lib/platform";
import { Touch } from "../Touch/Touch";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { useSplitCol } from "../SplitCol/SplitCol";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { canUseDOM, useDOM, blurActiveElement } from "../../lib/dom";
import { useScroll } from "../AppRoot/ScrollContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { usePlatform } from "../../hooks/usePlatform";
import { swipeBackExcluded } from "./utils";
import { useWaitTransitionFinish } from "../../hooks/useWaitTransitionFinish";
import { useTimeout } from "../../hooks/useTimeout";
import { usePrevious } from "../../hooks/usePrevious";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { noop } from "../../lib/utils";
var SwipeBackResults;
(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
export var scrollsCache = {};
var warn = warnOnce("View");

/**
 * @see https://vkcom.github.io/VKUI/#/View
 */
export var View = function View(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  if (process.env.NODE_ENV === "development") {
    popout && warn("Свойство popout устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
    modal && warn("Свойство modal устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
  }
  var scrolls = React.useRef(scrollsCache[getNavId({
    nav: nav,
    id: restProps.id
  })] || {});
  var afterTransition = React.useRef(noop);
  React.useEffect(function () {
    return function () {
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
  var _useDOM = useDOM(),
    window = _useDOM.window,
    document = _useDOM.document;
  var scroll = useScroll();
  var configProvider = useConfigProvider();
  var splitCol = useSplitCol();
  var platform = usePlatform();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    animated = _React$useState2[0],
    setAnimated = _React$useState2[1];
  var _React$useState3 = React.useState([activePanelProp]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    visiblePanels = _React$useState4[0],
    setVisiblePanels = _React$useState4[1];
  var _React$useState5 = React.useState(activePanelProp),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    activePanel = _React$useState6[0],
    setActivePanel = _React$useState6[1];
  var _React$useState7 = React.useState(undefined),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    isBack = _React$useState8[0],
    setIsBack = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    prevPanel = _React$useState10[0],
    setPrevPanel = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    nextPanel = _React$useState12[0],
    setNextPanel = _React$useState12[1];
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    swipingBack = _React$useState14[0],
    setSwipingBack = _React$useState14[1];
  var _React$useState15 = React.useState(0),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    swipeBackStartX = _React$useState16[0],
    setSwipeBackStartX = _React$useState16[1];
  var _React$useState17 = React.useState(0),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    swipeBackShift = _React$useState18[0],
    setSwipeBackShift = _React$useState18[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    swipeBackNextPanel = _React$useState20[0],
    setSwipeBackNextPanel = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    swipeBackPrevPanel = _React$useState22[0],
    setSwipeBackPrevPanel = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    swipeBackResult = _React$useState24[0],
    setSwipeBackResult = _React$useState24[1];
  var _React$useState25 = React.useState(false),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    browserSwipe = _React$useState26[0],
    setBrowserSwipe = _React$useState26[1];
  var prevActivePanel = usePrevious(activePanelProp);
  var prevSwipingBack = usePrevious(swipingBack);
  var prevBrowserSwipe = usePrevious(browserSwipe);
  var prevSwipeBackResult = usePrevious(swipeBackResult);
  var prevSwipeBackPrevPanel = usePrevious(swipeBackPrevPanel);
  var prevOnTransition = usePrevious(onTransition);
  var panels = React.Children.toArray(children).filter(function (panel) {
    var panelId = getNavId(panel.props, warn);
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
  useIsomorphicLayoutEffect(function () {
    afterTransition.current();
    afterTransition.current = noop;
  }, [afterTransition.current]);
  var transitionEndHandler = React.useCallback(function (e) {
    if ((!e || ["vkui-animation-ios-next-forward", "vkui-animation-ios-prev-back", "vkui-animation-view-next-forward", "vkui-animation-view-prev-back"].includes(e.animationName)) && prevPanel !== null) {
      flushTransition(prevPanel, Boolean(isBack));
    }
  }, [flushTransition, isBack, prevPanel]);
  var _useWaitTransitionFin = useWaitTransitionFinish(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var animationFinishTimeout = useTimeout(transitionEndHandler, platform === IOS ? 600 : 300);
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
    if (swipeBackExcluded(e)) {
      return;
    }
    if (platform === IOS && !(configProvider !== null && configProvider !== void 0 && configProvider.isWebView) && (e.startX <= 70 || e.startX >= window.innerWidth - 70) && !browserSwipe) {
      setBrowserSwipe(true);
    }
    if (platform === IOS && configProvider !== null && configProvider !== void 0 && configProvider.isWebView && onSwipeBack) {
      if (animated && e.startX <= 70 || !window) {
        return;
      }
      if (e.startX <= 70 && !swipingBack && history && history.length > 1) {
        if (activePanel !== null) {
          // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
          blurActiveElement(document);
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
  React.useEffect(function () {
    popout && blurActiveElement(document);
  }, [document, popout]);
  React.useEffect(function () {
    // Нужен переход
    if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
      var firstLayerId = React.Children.toArray(children).map(function (panel) {
        return getNavId(panel.props, warn);
      }).find(function (id) {
        return id === prevActivePanel || id === activePanelProp;
      });
      var isBackTransition = firstLayerId === activePanelProp;
      scrolls.current[prevActivePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
      if (disableAnimation) {
        flushTransition(prevActivePanel, isBackTransition);
      } else {
        blurActiveElement(document);
        setVisiblePanels([prevActivePanel, activePanelProp]);
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
      waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === IOS ? 600 : 300);
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
  return createScopedElement(Touch, _extends({
    Component: "section"
  }, restProps, {
    vkuiClass: classNames("View", platform === IOS && "View--ios", !disableAnimation && animated && "View--animated", !disableAnimation && swipingBack && "View--swiping-back", disableAnimation && "View--no-motion"),
    onMoveX: onMoveX,
    onEnd: onEnd
  }), createScopedElement("div", {
    vkuiClass: "View__panels"
  }, panels.map(function (panel) {
    var _scrolls$current;
    var panelId = getNavId(panel.props, warn);
    var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
    var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
    var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
    return createScopedElement("div", {
      vkuiClass: classNames("View__panel", panelId === activePanel && "View__panel--active", panelId === prevPanel && "View__panel--prev", panelId === nextPanel && "View__panel--next", panelId === swipeBackPrevPanel && "View__panel--swipe-back-prev", panelId === swipeBackNextPanel && "View__panel--swipe-back-next", swipeBackResult === SwipeBackResults.success && "View__panel--swipe-back-success", swipeBackResult === SwipeBackResults.fail && "View__panel--swipe-back-failed"),
      onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
      ref: function ref(el) {
        return panelId !== undefined && (panelNodes.current[panelId] = el);
      },
      style: calcPanelSwipeStyles(panelId),
      key: panelId
    }, createScopedElement("div", {
      vkuiClass: "View__panel-in",
      style: {
        marginTop: compensateScroll ? -((_scrolls$current = scrolls.current[panelId]) !== null && _scrolls$current !== void 0 ? _scrolls$current : 0) : undefined
      }
    }, createScopedElement(NavTransitionProvider, {
      entering: panelId === nextPanel || panelId === swipeBackNextPanel
    }, panel)));
  })), createScopedElement(AppRootPortal, null, !!popout && createScopedElement("div", {
    vkuiClass: "View__popout"
  }, popout), !!modal && createScopedElement("div", {
    vkuiClass: "View__modal"
  }, modal)));
};
//# sourceMappingURL=View.js.map