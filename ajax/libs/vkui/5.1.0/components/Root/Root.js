import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "activeView", "onTransition", "nav", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { SplitColContext } from '../SplitCol/SplitCol';
import { ScrollContext } from '../AppRoot/ScrollContext';
import { NavTransitionProvider } from '../NavTransitionContext/NavTransitionContext';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useTimeout } from '../../hooks/useTimeout';
import { usePlatform } from '../../hooks/usePlatform';
var warn = warnOnce('Root');

/**
 * @see https://vkcom.github.io/VKUI/#/Root
 */
export var Root = function Root(_ref) {
  var children = _ref.children,
    _activeView = _ref.activeView,
    onTransition = _ref.onTransition,
    nav = _ref.nav,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var scroll = React.useContext(ScrollContext);
  var platform = usePlatform();
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var scrolls = React.useRef({}).current;
  var viewNodes = React.useRef({}).current;
  var _useConfigProvider = useConfigProvider(),
    _useConfigProvider$tr = _useConfigProvider.transitionMotionEnabled,
    transitionMotionEnabled = _useConfigProvider$tr === void 0 ? true : _useConfigProvider$tr;
  var _React$useContext = React.useContext(SplitColContext),
    animate = _React$useContext.animate;
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
        transition: !disableAnimation,
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
  }, [activeView]);

  // Нужен переход
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
  }, [transition, prevView]);
  var fallbackTransition = useTimeout(finishTransition, platform === Platform.IOS ? 600 : 300);
  React.useEffect(function () {
    if (!transition) {
      fallbackTransition.clear();
      return;
    }
    fallbackTransition.set();
  }, [fallbackTransition, transition]);
  var onAnimationEnd = function onAnimationEnd(e) {
    if (['vkui-root-android-animation-hide-back', 'vkui-root-android-animation-show-forward', 'vkui-root-ios-animation-hide-back', 'vkui-root-ios-animation-show-forward'].includes(e.animationName)) {
      finishTransition();
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiRoot", platform === Platform.IOS && "vkuiRoot--ios", transition && "vkuiRoot--transition", className)
  }), views.map(function (view) {
    var _scrolls$viewId;
    var viewId = getNavId(view.props, warn);
    if (viewId !== activeView && !(transition && viewId === prevView)) {
      return null;
    }
    var isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
    var compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
    return /*#__PURE__*/React.createElement("div", {
      key: viewId,
      ref: function ref(e) {
        return viewId && (viewNodes[viewId] = e);
      },
      onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
      className: classNames("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward")
    }, /*#__PURE__*/React.createElement(NavTransitionProvider, {
      entering: transition && viewId === activeView
    }, /*#__PURE__*/React.createElement("div", {
      className: "vkuiRoot__scrollCompensation",
      style: {
        marginTop: compensateScroll ? viewId && -((_scrolls$viewId = scrolls[viewId]) !== null && _scrolls$viewId !== void 0 ? _scrolls$viewId : 0) : undefined
      }
    }, view)));
  }));
};
//# sourceMappingURL=Root.js.map