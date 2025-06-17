'use client';
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
import styles from "./Root.module.css";
const warn = warnOnce('Root');
/**
 * @see https://vkcom.github.io/VKUI/#/Root
 */ export const Root = ({ children, activeView: _activeView, onTransition, nav, ...restProps })=>{
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, transition && styles.transition),
        children: views.map((view)=>{
            const viewId = getNavId(view.props, warn);
            if (viewId !== activeView && !(transition && viewId === prevView)) {
                return null;
            }
            const isTransitionTarget = transition && viewId === (isBack ? prevView : activeView);
            const compensateScroll = transition && (viewId === prevView || isBack && viewId === activeView);
            return /*#__PURE__*/ _jsx("div", {
                ref: (e)=>{
                    viewId && (viewNodes[viewId] = e);
                },
                onAnimationEnd: isTransitionTarget ? onAnimationEnd : undefined,
                className: classNames(styles.view, transition && viewId === prevView && isBack && styles.viewHideBack, transition && viewId === prevView && !isBack && styles.viewHideForward, transition && viewId === activeView && isBack && styles.viewShowBack, transition && viewId === activeView && !isBack && styles.viewShowForward),
                children: /*#__PURE__*/ _jsx(NavTransitionDirectionProvider, {
                    isBack: isBack,
                    children: /*#__PURE__*/ _jsx(NavTransitionProvider, {
                        entering: transition && viewId === activeView,
                        children: /*#__PURE__*/ _jsx("div", {
                            className: styles.scrollCompensation,
                            style: {
                                marginTop: compensateScroll ? viewId && -(scrolls[viewId] ?? 0) : undefined
                            },
                            children: view
                        })
                    })
                })
            }, viewId);
        })
    });
};

//# sourceMappingURL=Root.js.map