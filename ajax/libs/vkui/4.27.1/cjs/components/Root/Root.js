"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _platform = require("../../lib/platform");

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _SplitCol = require("../SplitCol/SplitCol");

var _AppRootPortal = require("../AppRoot/AppRootPortal");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");

var _getNavId = require("../../lib/getNavId");

var _warnOnce = require("../../lib/warnOnce");

var _dom = require("../../lib/dom");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useTimeout = require("../../hooks/useTimeout");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["popout", "modal", "children", "activeView", "onTransition", "nav"];
var warn = (0, _warnOnce.warnOnce)("Root");

var Root = function Root(_ref) {
  var _ref$popout = _ref.popout,
      popout = _ref$popout === void 0 ? null : _ref$popout,
      modal = _ref.modal,
      children = _ref.children,
      _activeView = _ref.activeView,
      onTransition = _ref.onTransition,
      nav = _ref.nav,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var scroll = React.useContext(_ScrollContext.ScrollContext);
  var platform = (0, _usePlatform.usePlatform)();

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var scrolls = React.useRef({}).current;
  var viewNodes = React.useRef({}).current;

  var _React$useContext = React.useContext(_ConfigProviderContext.ConfigProviderContext),
      _React$useContext$tra = _React$useContext.transitionMotionEnabled,
      transitionMotionEnabled = _React$useContext$tra === void 0 ? true : _React$useContext$tra;

  var _React$useContext2 = React.useContext(_SplitCol.SplitColContext),
      animate = _React$useContext2.animate;

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
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    document.activeElement.blur();
  }, [!!popout, activeView]); // Нужен переход

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
  }, [transition]);
  var fallbackTransition = (0, _useTimeout.useTimeout)(finishTransition, platform === _platform.IOS ? 600 : 300);
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

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Root", platform), {
      "Root--transition": !disableAnimation && transition,
      "Root--no-motion": disableAnimation
    })
  }), views.map(function (view) {
    var _scrolls$viewId;

    var viewId = (0, _getNavId.getNavId)(view.props, warn);

    if (viewId !== activeView && !(transition && viewId === prevView)) {
      return null;
    }

    var isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
    var compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
    return (0, _jsxRuntime.createScopedElement)("div", {
      key: viewId,
      ref: function ref(e) {
        return viewId && (viewNodes[viewId] = e);
      },
      onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
      vkuiClass: (0, _classNames.classNames)("Root__view", {
        "Root__view--hide-back": transition && viewId === prevView && isBack,
        "Root__view--hide-forward": transition && viewId === prevView && !isBack,
        "Root__view--show-back": transition && viewId === activeView && isBack,
        "Root__view--show-forward": transition && viewId === activeView && !isBack,
        "Root__view--active": !transition && viewId === activeView
      })
    }, (0, _jsxRuntime.createScopedElement)(_NavTransitionContext.NavTransitionProvider, {
      entering: transition && viewId === activeView
    }, (0, _jsxRuntime.createScopedElement)("div", {
      vkuiClass: "Root__scrollCompensation",
      style: {
        marginTop: compensateScroll ? viewId && -((_scrolls$viewId = scrolls[viewId]) !== null && _scrolls$viewId !== void 0 ? _scrolls$viewId : 0) : undefined
      }
    }, view)));
  }), (0, _jsxRuntime.createScopedElement)(_AppRootPortal.AppRootPortal, null, !!popout && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Root__popout"
  }, popout), !!modal && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Root__modal"
  }, modal)));
}; // eslint-disable-next-line import/no-default-export


var _default = Root;
exports.default = _default;
//# sourceMappingURL=Root.js.map