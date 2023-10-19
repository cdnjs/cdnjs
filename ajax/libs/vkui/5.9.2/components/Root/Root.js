import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { useTimeout } from "../../hooks/useTimeout";
import { useDOM } from "../../lib/dom";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { warnOnce } from "../../lib/warnOnce";
import { ScrollContext } from "../AppRoot/ScrollContext";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext";
import { NavTransitionDirectionProvider } from "../NavTransitionDirectionContext/NavTransitionDirectionContext";
import { RootComponent } from "../RootComponent/RootComponent";
import { SplitColContext } from "../SplitCol/SplitColContext";
var warn = warnOnce("Root");
/**
 * @see https://vkcom.github.io/VKUI/#/Root
 */ export var Root = function(_param) {
    var children = _param.children, _activeView = _param.activeView, onTransition = _param.onTransition, nav = _param.nav, restProps = _object_without_properties(_param, [
        "children",
        "activeView",
        "onTransition",
        "nav"
    ]);
    var scroll = React.useContext(ScrollContext);
    var platform = usePlatform();
    var document = useDOM().document;
    var scrolls = React.useRef({}).current;
    var viewNodes = React.useRef({}).current;
    var _useConfigProvider = useConfigProvider(), _useConfigProvider_transitionMotionEnabled = _useConfigProvider.transitionMotionEnabled, transitionMotionEnabled = _useConfigProvider_transitionMotionEnabled === void 0 ? true : _useConfigProvider_transitionMotionEnabled;
    var animate = React.useContext(SplitColContext).animate;
    var disableAnimation = !transitionMotionEnabled || !animate;
    var views = React.Children.toArray(children);
    var _React_useState = _sliced_to_array(React.useState({
        activeView: _activeView,
        transition: false
    }), 2), _React_useState_ = _React_useState[0], prevView = _React_useState_.prevView, activeView = _React_useState_.activeView, transition = _React_useState_.transition, isBack = _React_useState_.isBack, _setState = _React_useState[1];
    var transitionTo = function(panel) {
        if (panel !== activeView) {
            var viewIds = views.map(function(view) {
                return getNavId(view.props, warn);
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
    var finishTransition = React.useCallback(function() {
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
    useIsomorphicLayoutEffect(function() {
        document.activeElement.blur();
    }, [
        activeView
    ]);
    // Нужен переход
    useIsomorphicLayoutEffect(function() {
        return transitionTo(_activeView);
    }, [
        _activeView
    ]);
    useIsomorphicLayoutEffect(function() {
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
    var fallbackTransition = useTimeout(finishTransition, platform === Platform.IOS ? 600 : 300);
    React.useEffect(function() {
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiRoot", platform === Platform.IOS && "vkuiRoot--ios", transition && "vkuiRoot--transition")
    }), views.map(function(view) {
        var viewId = getNavId(view.props, warn);
        if (viewId !== activeView && !(transition && viewId === prevView)) {
            return null;
        }
        var isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
        var compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
        var _scrolls_viewId;
        return /*#__PURE__*/ React.createElement("div", {
            key: viewId,
            ref: function(e) {
                return viewId && (viewNodes[viewId] = e);
            },
            onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
            className: classNames("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward")
        }, /*#__PURE__*/ React.createElement(NavTransitionDirectionProvider, {
            isBack: isBack
        }, /*#__PURE__*/ React.createElement(NavTransitionProvider, {
            entering: transition && viewId === activeView
        }, /*#__PURE__*/ React.createElement("div", {
            className: "vkuiRoot__scrollCompensation",
            style: {
                marginTop: compensateScroll ? viewId && -((_scrolls_viewId = scrolls[viewId]) !== null && _scrolls_viewId !== void 0 ? _scrolls_viewId : 0) : undefined
            }
        }, view))));
    }));
};

//# sourceMappingURL=Root.js.map