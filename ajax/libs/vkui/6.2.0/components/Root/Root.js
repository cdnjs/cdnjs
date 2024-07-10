import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { useDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { warnOnce } from '../../lib/warnOnce';
import { ScrollContext } from '../AppRoot/ScrollContext';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { NavTransitionProvider } from '../NavTransitionContext/NavTransitionContext';
import { NavTransitionDirectionProvider } from '../NavTransitionDirectionContext/NavTransitionDirectionContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { SplitColContext } from '../SplitCol/SplitColContext';
const warn = warnOnce('Root');
/**
 * @see https://vkcom.github.io/VKUI/#/Root
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
        baseClassName: classNames("vkuiRoot", platform === 'ios' && "vkuiRoot--ios", transition && "vkuiRoot--transition"),
        children: views.map((view)=>{
            const viewId = getNavId(view.props, warn);
            if (viewId !== activeView && !(transition && viewId === prevView)) {
                return null;
            }
            const isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
            const compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
            var _scrolls_viewId;
            return /*#__PURE__*/ _jsx("div", {
                ref: (e)=>viewId && (viewNodes[viewId] = e),
                onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
                className: classNames("vkuiRoot__view", transition && viewId === prevView && isBack && "vkuiRoot__view--hide-back", transition && viewId === prevView && !isBack && "vkuiRoot__view--hide-forward", transition && viewId === activeView && isBack && "vkuiRoot__view--show-back", transition && viewId === activeView && !isBack && "vkuiRoot__view--show-forward"),
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