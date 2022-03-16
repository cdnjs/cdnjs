import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "children", "activeView", "onTransition", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { IOS } from "../../lib/platform";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import { SplitColContext } from "../SplitCol/SplitCol";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { ScrollContext } from "../AppRoot/ScrollContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useTimeout } from "../../hooks/useTimeout";
import { usePlatform } from "../../hooks/usePlatform";
import "./Root.css";
var warn = warnOnce("Root");

var Root = function Root(_ref) {
  var _ref$popout = _ref.popout,
      popout = _ref$popout === void 0 ? null : _ref$popout,
      modal = _ref.modal,
      children = _ref.children,
      _activeView = _ref.activeView,
      onTransition = _ref.onTransition,
      nav = _ref.nav,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var scroll = React.useContext(ScrollContext);
  var platform = usePlatform();

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var scrolls = React.useRef({}).current;
  var viewNodes = React.useRef({}).current;

  var _React$useContext = React.useContext(ConfigProviderContext),
      _React$useContext$tra = _React$useContext.transitionMotionEnabled,
      transitionMotionEnabled = _React$useContext$tra === void 0 ? true : _React$useContext$tra;

  var _React$useContext2 = React.useContext(SplitColContext),
      animate = _React$useContext2.animate;

  var disableAnimation = !transitionMotionEnabled || !animate;
  var views = React.Children.toArray(children);

  var _React$useState = React.useState({
    activeView: _activeView,
    transition: false
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      prevView = _React$useState2$.prevView,
      activeView = _React$useState2$.activeView,
      transition = _React$useState2$.transition,
      isBack = _React$useState2$.isBack,
      _setState = _React$useState2[1];

  var transitionTo = function transitionTo(panel) {
    if (panel !== activeView) {
      var viewIds = views.map(function (view) {
        return getNavId(view.props, warn);
      });

      var _isBack = viewIds.indexOf(panel) < viewIds.indexOf(activeView);

      scrolls[activeView] = scroll.getScroll().y;

      _setState({
        activeView: panel,
        prevView: activeView,
        transition: true,
        isBack: _isBack
      });
    }
  };

  var finishTransition = React.useCallback(function () {
    return _setState({
      activeView: activeView,
      prevView: prevView,
      isBack: isBack,
      transition: false
    });
  }, [activeView, isBack, prevView]);
  useIsomorphicLayoutEffect(function () {
    document.activeElement.blur();
  }, [!!popout, activeView]); // Нужен переход

  useIsomorphicLayoutEffect(function () {
    return transitionTo(_activeView);
  }, [_activeView]);
  useIsomorphicLayoutEffect(function () {
    if (!transition && prevView) {
      // Закончился переход
      scroll.scrollTo(0, isBack ? scrolls[activeView] : 0);
      onTransition && onTransition({
        isBack: Boolean(isBack),
        from: prevView,
        to: activeView
      });
    }
  }, [transition]);
  var fallbackTransition = useTimeout(finishTransition, platform === IOS ? 600 : 300);
  React.useEffect(function () {
    if (!transition) {
      fallbackTransition.clear();
      return;
    }

    disableAnimation ? finishTransition() : fallbackTransition.set();
  }, [disableAnimation, fallbackTransition, finishTransition, transition]);

  var onAnimationEnd = function onAnimationEnd(e) {
    if (["vkui-root-android-animation-hide-back", "vkui-root-android-animation-show-forward", "vkui-root-ios-animation-hide-back", "vkui-root-ios-animation-show-forward"].includes(e.animationName)) {
      finishTransition();
    }
  };

  if (process.env.NODE_ENV === "development") {
    popout && warn("Свойство popout устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
    modal && warn("Свойство modal устарело и будет удалено в 5.0.0. Используйте одноименное свойство у SplitLayout.");
  }

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("Root", platform), {
      "Root--transition": !disableAnimation && transition,
      "Root--no-motion": disableAnimation
    })
  }), views.map(function (view) {
    var _scrolls$viewId;

    var viewId = getNavId(view.props, warn);

    if (viewId !== activeView && !(transition && viewId === prevView)) {
      return null;
    }

    var isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
    var compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
    return createScopedElement("div", {
      key: viewId,
      ref: function ref(e) {
        return viewId && (viewNodes[viewId] = e);
      },
      onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
      vkuiClass: classNames("Root__view", {
        "Root__view--hide-back": transition && viewId === prevView && isBack,
        "Root__view--hide-forward": transition && viewId === prevView && !isBack,
        "Root__view--show-back": transition && viewId === activeView && isBack,
        "Root__view--show-forward": transition && viewId === activeView && !isBack,
        "Root__view--active": !transition && viewId === activeView
      })
    }, createScopedElement(NavTransitionProvider, {
      entering: transition && viewId === activeView
    }, createScopedElement("div", {
      vkuiClass: "Root__scrollCompensation",
      style: {
        marginTop: compensateScroll ? viewId && -((_scrolls$viewId = scrolls[viewId]) !== null && _scrolls$viewId !== void 0 ? _scrolls$viewId : 0) : undefined
      }
    }, view)));
  }), createScopedElement(AppRootPortal, null, !!popout && createScopedElement("div", {
    vkuiClass: "Root__popout"
  }, popout), !!modal && createScopedElement("div", {
    vkuiClass: "Root__modal"
  }, modal)));
}; // eslint-disable-next-line import/no-default-export


export default Root;
//# sourceMappingURL=Root.js.map