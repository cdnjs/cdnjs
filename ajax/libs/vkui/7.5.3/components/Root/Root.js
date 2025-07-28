'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useDOM } from "../../lib/dom.js";
import { getNavId } from "../../lib/getNavId.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { ScrollContext } from "../AppRoot/ScrollContext.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext.js";
import { NavTransitionDirectionProvider } from "../NavTransitionDirectionContext/NavTransitionDirectionContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { SplitColContext } from "../SplitCol/SplitColContext.js";
/* eslint-enable jsdoc/require-jsdoc */ const warn = warnOnce('Root');
/**
 * @see https://vkui.io/components/root
 */ export const Root = (_param)=>{
    var { children, activeView: _activeView, onTransition, nav } = _param, restProps = _object_without_properties(_param, [
        "children",
        "activeView",
        "onTransition",
        "nav"
    ]);
    const scroll = React.useContext(ScrollContext);
    const platform = usePlatform();
    const { document } = useDOM();
    const scrolls = React.useRef({}).current;
    const viewNodes = React.useRef({}).current;
    const { transitionMotionEnabled = true } = useConfigProvider();
    const { animate } = React.useContext(SplitColContext);
    const disableAnimation = !transitionMotionEnabled || !animate;
    const views = React.Children.toArray(children);
    const [{ prevView, activeView, transition, isBack }, _setState] = React.useState({
        activeView: _activeView,
        transition: false
    });
    const transitionTo = (panel)=>{
        if (panel !== activeView) {
            const viewIds = views.map((view)=>getNavId(view.props, warn));
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
    const finishTransition = React.useCallback(()=>_setState({
            activeView,
            prevView,
            isBack,
            transition: false
        }), [
        activeView,
        isBack,
        prevView
    ]);
    useIsomorphicLayoutEffect(()=>{
        document.activeElement.blur();
    }, [
        activeView
    ]);
    // Нужен переход
    useIsomorphicLayoutEffect(()=>transitionTo(_activeView), [
        _activeView
    ]);
    useIsomorphicLayoutEffect(()=>{
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
    React.useEffect(function onAnimationEndFallback() {
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiRoot__host", platform === 'ios' && "vkuiRoot__ios", transition && "vkuiRoot__transition"),
        children: views.map((view)=>{
            const viewId = getNavId(view.props, warn);
            if (viewId !== activeView && !(transition && viewId === prevView)) {
                return null;
            }
            const isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
            const compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
            var _scrolls_viewId;
            return /*#__PURE__*/ _jsx("div", {
                ref: (e)=>{
                    viewId && (viewNodes[viewId] = e);
                },
                onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
                className: classNames("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__viewHideBack", transition && viewId === prevView && !isBack && "vkuiRoot__viewHideForward", transition && viewId === activeView && isBack && "vkuiRoot__viewShowBack", transition && viewId === activeView && !isBack && "vkuiRoot__viewShowForward"),
                children: /*#__PURE__*/ _jsx(NavTransitionDirectionProvider, {
                    isBack: isBack,
                    children: /*#__PURE__*/ _jsx(NavTransitionProvider, {
                        entering: transition && viewId === activeView,
                        children: /*#__PURE__*/ _jsx("div", {
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