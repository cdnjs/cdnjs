"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _SplitCol = require("../SplitCol/SplitCol");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _dom = require("../../lib/dom");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _useTimeout = require("../../hooks/useTimeout");
var _usePlatform = require("../../hooks/usePlatform");
var _excluded = ["children", "activeView", "onTransition", "nav", "className"];
var warn = (0, _warnOnce.warnOnce)('Root');

/**
 * @see https://vkcom.github.io/VKUI/#/Root
 */
var Root = function Root(_ref) {
  var children = _ref.children,
    _activeView = _ref.activeView,
    onTransition = _ref.onTransition,
    nav = _ref.nav,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var scroll = React.useContext(_ScrollContext.ScrollContext);
  var platform = (0, _usePlatform.usePlatform)();
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var scrolls = React.useRef({}).current;
  var viewNodes = React.useRef({}).current;
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    _useConfigProvider$tr = _useConfigProvider.transitionMotionEnabled,
    transitionMotionEnabled = _useConfigProvider$tr === void 0 ? true : _useConfigProvider$tr;
  var _React$useContext = React.useContext(_SplitCol.SplitColContext),
    animate = _React$useContext.animate;
  var disableAnimation = !transitionMotionEnabled || !animate;
  var views = React.Children.toArray(children);
  var _React$useState = React.useState({
      activeView: _activeView,
      transition: false
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    _React$useState2$ = _React$useState2[0],
    prevView = _React$useState2$.prevView,
    activeView = _React$useState2$.activeView,
    transition = _React$useState2$.transition,
    isBack = _React$useState2$.isBack,
    _setState = _React$useState2[1];
  var transitionTo = function transitionTo(panel) {
    if (panel !== activeView) {
      var viewIds = views.map(function (view) {
        return (0, _getNavId.getNavId)(view.props, warn);
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
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    document.activeElement.blur();
  }, [activeView]);

  // Нужен переход
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    return transitionTo(_activeView);
  }, [_activeView]);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
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
  var fallbackTransition = (0, _useTimeout.useTimeout)(finishTransition, platform === _platform.Platform.IOS ? 600 : 300);
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
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiRoot", platform === _platform.Platform.IOS && "vkuiRoot--ios", transition && "vkuiRoot--transition", className)
  }), views.map(function (view) {
    var _scrolls$viewId;
    var viewId = (0, _getNavId.getNavId)(view.props, warn);
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
      className: (0, _vkjs.classNames)("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward")
    }, /*#__PURE__*/React.createElement(_NavTransitionContext.NavTransitionProvider, {
      entering: transition && viewId === activeView
    }, /*#__PURE__*/React.createElement("div", {
      className: "vkuiRoot__scrollCompensation",
      style: {
        marginTop: compensateScroll ? viewId && -((_scrolls$viewId = scrolls[viewId]) !== null && _scrolls$viewId !== void 0 ? _scrolls$viewId : 0) : undefined
      }
    }, view)));
  }));
};
exports.Root = Root;
//# sourceMappingURL=Root.js.map