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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _dom = require("../../lib/dom");
const _getNavId = require("../../lib/getNavId");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
const _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
const _NavTransitionDirectionContext = require("../NavTransitionDirectionContext/NavTransitionDirectionContext");
const _RootComponent = require("../RootComponent/RootComponent");
const _SplitColContext = require("../SplitCol/SplitColContext");
const warn = (0, _warnOnce.warnOnce)('Root');
const Root = (_param)=>{
    var { children, activeView: _activeView, onTransition, nav } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "activeView",
        "onTransition",
        "nav"
    ]);
    const scroll = _react.useContext(_ScrollContext.ScrollContext);
    const platform = (0, _usePlatform.usePlatform)();
    const { document } = (0, _dom.useDOM)();
    const scrolls = _react.useRef({}).current;
    const viewNodes = _react.useRef({}).current;
    const { transitionMotionEnabled = true } = (0, _ConfigProviderContext.useConfigProvider)();
    const { animate } = _react.useContext(_SplitColContext.SplitColContext);
    const disableAnimation = !transitionMotionEnabled || !animate;
    const views = _react.Children.toArray(children);
    const [{ prevView, activeView, transition, isBack }, _setState] = _react.useState({
        activeView: _activeView,
        transition: false
    });
    const transitionTo = (panel)=>{
        if (panel !== activeView) {
            const viewIds = views.map((view)=>(0, _getNavId.getNavId)(view.props, warn));
            const isBack = viewIds.indexOf(panel) < viewIds.indexOf(activeView);
            scrolls[activeView] = scroll.getScroll().y;
            _setState({
                activeView: panel,
                prevView: activeView,
                transition: !disableAnimation,
                isBack
            });
        }
    };
    const finishTransition = _react.useCallback(()=>_setState({
            activeView,
            prevView,
            isBack,
            transition: false
        }), [
        activeView,
        isBack,
        prevView
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        document.activeElement.blur();
    }, [
        activeView
    ]);
    // Нужен переход
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>transitionTo(_activeView), [
        _activeView
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
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
    _react.useEffect(function onAnimationEndFallback() {
        if (transition && disableAnimation) {
            finishTransition();
        }
    }, [
        transition,
        disableAnimation,
        finishTransition
    ]);
    const onAnimationEnd = ()=>{
        finishTransition();
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiRoot", platform === 'ios' && "vkuiRoot--ios", transition && "vkuiRoot--transition"),
        children: views.map((view)=>{
            const viewId = (0, _getNavId.getNavId)(view.props, warn);
            if (viewId !== activeView && !(transition && viewId === prevView)) {
                return null;
            }
            const isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
            const compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
            var _scrolls_viewId;
            return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                ref: (e)=>viewId && (viewNodes[viewId] = e),
                onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
                className: (0, _vkjs.classNames)("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward"),
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavTransitionDirectionContext.NavTransitionDirectionProvider, {
                    isBack: isBack,
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavTransitionContext.NavTransitionProvider, {
                        entering: transition && viewId === activeView,
                        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                            className: "vkuiRoot__scrollCompensation",
                            style: {
                                marginTop: compensateScroll ? viewId && -((_scrolls_viewId = scrolls[viewId]) !== null && _scrolls_viewId !== void 0 ? _scrolls_viewId : 0) : undefined
                            },
                            children: view
                        })
                    })
                })
            }, viewId);
        })
    }));
};

//# sourceMappingURL=Root.js.map