"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Root", {
    enumerable: true,
    get: function() {
        return Root;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _dom = require("../../lib/dom");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _warnOnce = require("../../lib/warnOnce");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _SplitColContext = require("../SplitCol/SplitColContext");
var warn = (0, _warnOnce.warnOnce)("Root");
var Root = function(_param) {
    var children = _param.children, _activeView = _param.activeView, onTransition = _param.onTransition, nav = _param.nav, restProps = _object_without_properties._(_param, [
        "children",
        "activeView",
        "onTransition",
        "nav"
    ]);
    var scroll = _react.useContext(_ScrollContext.ScrollContext);
    var platform = (0, _usePlatform.usePlatform)();
    var document = (0, _dom.useDOM)().document;
    var scrolls = _react.useRef({}).current;
    var viewNodes = _react.useRef({}).current;
    var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(), _useConfigProvider_transitionMotionEnabled = _useConfigProvider.transitionMotionEnabled, transitionMotionEnabled = _useConfigProvider_transitionMotionEnabled === void 0 ? true : _useConfigProvider_transitionMotionEnabled;
    var animate = _react.useContext(_SplitColContext.SplitColContext).animate;
    var disableAnimation = !transitionMotionEnabled || !animate;
    var views = _react.Children.toArray(children);
    var _React_useState = _sliced_to_array._(_react.useState({
        activeView: _activeView,
        transition: false
    }), 2), _React_useState_ = _React_useState[0], prevView = _React_useState_.prevView, activeView = _React_useState_.activeView, transition = _React_useState_.transition, isBack = _React_useState_.isBack, _setState = _React_useState[1];
    var transitionTo = function(panel) {
        if (panel !== activeView) {
            var viewIds = views.map(function(view) {
                return (0, _getNavId.getNavId)(view.props, warn);
            });
            var isBack = viewIds.indexOf(panel) < viewIds.indexOf(activeView);
            scrolls[activeView] = scroll.getScroll().y;
            _setState({
                activeView: panel,
                prevView: activeView,
                transition: !disableAnimation,
                isBack: isBack
            });
        }
    };
    var finishTransition = _react.useCallback(function() {
        return _setState({
            activeView: activeView,
            prevView: prevView,
            isBack: isBack,
            transition: false
        });
    }, [
        activeView,
        isBack,
        prevView
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        document.activeElement.blur();
    }, [
        activeView
    ]);
    // Нужен переход
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        return transitionTo(_activeView);
    }, [
        _activeView
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (!transition && prevView) {
            // Закончился переход
            scroll.scrollTo(0, isBack ? scrolls[activeView] : 0);
            onTransition && onTransition({
                isBack: Boolean(isBack),
                from: prevView,
                to: activeView
            });
        }
    }, [
        transition,
        prevView
    ]);
    var fallbackTransition = (0, _useTimeout.useTimeout)(finishTransition, platform === _platform.Platform.IOS ? 600 : 300);
    _react.useEffect(function() {
        if (!transition) {
            fallbackTransition.clear();
            return;
        }
        fallbackTransition.set();
    }, [
        fallbackTransition,
        transition
    ]);
    var onAnimationEnd = function(e) {
        if ([
            "vkuiroot-android-animation-hide-back",
            "vkuiroot-android-animation-show-forward",
            "vkuiroot-ios-animation-hide-back",
            "vkuiroot-ios-animation-show-forward"
        ].includes(e.animationName)) {
            finishTransition();
        }
    };
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiRoot", platform === _platform.Platform.IOS && "vkuiRoot--ios", transition && "vkuiRoot--transition")
    }), views.map(function(view) {
        var viewId = (0, _getNavId.getNavId)(view.props, warn);
        if (viewId !== activeView && !(transition && viewId === prevView)) {
            return null;
        }
        var isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
        var compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
        var _scrolls_viewId;
        return /*#__PURE__*/ _react.createElement("div", {
            key: viewId,
            ref: function(e) {
                return viewId && (viewNodes[viewId] = e);
            },
            onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
            className: (0, _vkjs.classNames)("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward")
        }, /*#__PURE__*/ _react.createElement(_NavTransitionDirectionContext.NavTransitionDirectionProvider, {
            isBack: isBack
        }, /*#__PURE__*/ _react.createElement(_NavTransitionContext.NavTransitionProvider, {
            entering: transition && viewId === activeView
        }, /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiRoot__scrollCompensation",
            style: {
                marginTop: compensateScroll ? viewId && -((_scrolls_viewId = scrolls[viewId]) !== null && _scrolls_viewId !== void 0 ? _scrolls_viewId : 0) : undefined
            }
        }, view))));
    }));
};

//# sourceMappingURL=Root.js.map