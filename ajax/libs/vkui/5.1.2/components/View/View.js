import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["activePanel", "history", "nav", "onTransition", "onSwipeBack", "onSwipeBackStart", "onSwipeBackCancel", "children", "className"];
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { animationEvent } from '../../lib/supportEvents';
import { Platform } from '../../lib/platform';
import { Touch } from '../Touch/Touch';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { useSplitCol } from '../SplitCol/SplitCol';
import { canUseDOM, useDOM, blurActiveElement } from '../../lib/dom';
import { useScroll } from '../AppRoot/ScrollContext';
import { NavTransitionProvider } from '../NavTransitionContext/NavTransitionContext';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { usePlatform } from '../../hooks/usePlatform';
import { swipeBackExcluded } from './utils';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { useTimeout } from '../../hooks/useTimeout';
import { usePrevious } from '../../hooks/usePrevious';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
var SWIPE_BACK_AREA = 70;
var SwipeBackResults;
(function (SwipeBackResults) {
  SwipeBackResults[SwipeBackResults["fail"] = 1] = "fail";
  SwipeBackResults[SwipeBackResults["success"] = 2] = "success";
})(SwipeBackResults || (SwipeBackResults = {}));
export var scrollsCache = {};
var warn = warnOnce('View');

/**
 * @see https://vkcom.github.io/VKUI/#/View
 */
export var View = function View(_ref) {
  var activePanelProp = _ref.activePanel,
    history = _ref.history,
    nav = _ref.nav,
    onTransition = _ref.onTransition,
    onSwipeBack = _ref.onSwipeBack,
    onSwipeBackStart = _ref.onSwipeBackStart,
    onSwipeBackCancelProp = _ref.onSwipeBackCancel,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
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
  var _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    swipeBackPrevented = _React$useState16[0],
    setSwipeBackPrevented = _React$useState16[1];
  var _React$useState17 = React.useState(0),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    swipeBackStartX = _React$useState18[0],
    setSwipeBackStartX = _React$useState18[1];
  var _React$useState19 = React.useState(0),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    swipeBackShift = _React$useState20[0],
    setSwipeBackShift = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    swipeBackNextPanel = _React$useState22[0],
    setSwipeBackNextPanel = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    swipeBackPrevPanel = _React$useState24[0],
    setSwipeBackPrevPanel = _React$useState24[1];
  var _React$useState25 = React.useState(null),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    swipeBackResult = _React$useState26[0],
    setSwipeBackResult = _React$useState26[1];
  var _React$useState27 = React.useState(false),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    browserSwipe = _React$useState28[0],
    setBrowserSwipe = _React$useState28[1];
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
  var disableAnimation = (configProvider === null || configProvider === void 0 ? void 0 : configProvider.transitionMotionEnabled) === false || !(splitCol !== null && splitCol !== void 0 && splitCol.animate) || platform === Platform.VKCOM;
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
    if ((!e || ['vkui-animation-ios-next-forward', 'vkui-animation-ios-prev-back', 'vkui-animation-view-next-forward', 'vkui-animation-view-prev-back'].includes(e.animationName)) && prevPanel !== null) {
      flushTransition(prevPanel, Boolean(isBack));
    }
  }, [flushTransition, isBack, prevPanel]);
  var _useWaitTransitionFin = useWaitTransitionFinish(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var animationFinishTimeout = useTimeout(transitionEndHandler, platform === Platform.IOS ? 600 : 300);
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
    if (!e || e !== null && e !== void 0 && e.propertyName.includes('transform') && (e === null || e === void 0 ? void 0 : e.target) === pickPanel(swipeBackNextPanel)) {
      switch (swipeBackResult) {
        case SwipeBackResults.fail:
          onSwipeBackCancel();
          break;
        case SwipeBackResults.success:
          onSwipeBackSuccess();
      }
    }
  }, [onSwipeBackCancel, onSwipeBackSuccess, swipeBackNextPanel, swipeBackResult]);
  var onMoveX = function onMoveX(event) {
    if (platform !== Platform.IOS || swipeBackPrevented || swipeBackExcluded(event) || disableAnimation) {
      return;
    }
    if (!(configProvider !== null && configProvider !== void 0 && configProvider.isWebView)) {
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
        if (payload === 'prevent') {
          setSwipeBackPrevented(true);
          return;
        }
      }
      if (activePanel !== null) {
        // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
        blurActiveElement(document);
        scrolls.current[activePanel] = scroll === null || scroll === void 0 ? void 0 : scroll.getScroll().y;
      }
      setSwipingBack(true);
      setSwipeBackStartX(event.startX);
      setSwipeBackPrevPanel(activePanel);
      setSwipeBackNextPanel(history.slice(-2)[0]);
    }
    if (swipingBack) {
      var _swipeBackShift = 0;
      if (event.shiftX < 0) {
        _swipeBackShift = 0;
      } else if (event.shiftX > window.innerWidth - swipeBackStartX) {
        _swipeBackShift = window.innerWidth;
      } else {
        _swipeBackShift = event.shiftX;
      }
      setSwipeBackShift(_swipeBackShift);
    }
  };
  var onEnd = React.useCallback(function (event) {
    if (swipingBack) {
      var _innerWidth;
      var speed = swipeBackShift / event.duration * 1000;
      if (swipeBackShift === 0) {
        onSwipeBackCancel();
      } else if (swipeBackShift >= ((_innerWidth = window.innerWidth) !== null && _innerWidth !== void 0 ? _innerWidth : 0)) {
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
  }, [onSwipeBackCancel, onSwipeBackSuccess, swipeBackShift, swipeBackStartX, swipingBack, swipeBackPrevented, window]);
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

    // Началась анимация завершения свайпа назад.
    if (!prevSwipeBackResult && swipeBackResult) {
      waitTransitionFinish(pickPanel(swipeBackNextPanel), swipingBackTransitionEndHandler, platform === Platform.IOS ? 600 : 300);
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
  return /*#__PURE__*/React.createElement(Touch, _extends({
    Component: "section"
  }, restProps, {
    className: classNames("vkuiView", platform === Platform.IOS && "vkuiView--ios", !disableAnimation && animated && "vkuiView--animated", !disableAnimation && swipingBack && "vkuiView--swiping-back", disableAnimation && "vkuiView--no-motion", className),
    onMoveX: onMoveX,
    onEnd: onEnd
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiView__panels"
  }, panels.map(function (panel) {
    var _scrolls$current$pane;
    var panelId = getNavId(panel.props, warn);
    var isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
    var isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
    var compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames("vkuiView__panel", panelId === activePanel && "vkuiView__panel--active", panelId === prevPanel && "vkuiView__panel--prev", panelId === nextPanel && "vkuiView__panel--next", panelId === swipeBackPrevPanel && "vkuiView__panel--swipe-back-prev", panelId === swipeBackNextPanel && "vkuiView__panel--swipe-back-next", swipeBackResult === SwipeBackResults.success && "vkuiView__panel--swipe-back-success", swipeBackResult === SwipeBackResults.fail && "vkuiView__panel--swipe-back-failed"),
      onAnimationEnd: isTransitionTarget ? transitionEndHandler : undefined,
      ref: function ref(el) {
        return panelId !== undefined && (panelNodes.current[panelId] = el);
      },
      style: calcPanelSwipeStyles(panelId),
      key: panelId
    }, /*#__PURE__*/React.createElement("div", {
      className: "vkuiView__panel-in",
      style: {
        marginTop: compensateScroll ? -((_scrolls$current$pane = scrolls.current[panelId]) !== null && _scrolls$current$pane !== void 0 ? _scrolls$current$pane : 0) : undefined
      }
    }, /*#__PURE__*/React.createElement(NavTransitionProvider, {
      entering: panelId === nextPanel || panelId === swipeBackNextPanel
    }, panel)));
  })));
};
//# sourceMappingURL=View.js.map