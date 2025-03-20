import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { usePrevious } from '../../hooks/usePrevious';
import { blurActiveElement, useDOM } from '../../lib/dom';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { useScroll } from '../AppRoot/ScrollContext';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { NavViewIdContext } from '../NavIdContext/NavIdContext';
import { NavTransitionProvider } from '../NavTransitionContext/NavTransitionContext';
import { NavTransitionDirectionProvider } from '../NavTransitionDirectionContext/NavTransitionDirectionContext';
import { useSplitCol } from '../SplitCol/SplitColContext';
import { Touch } from '../Touch/Touch';
import { useLayoutEffectCall } from './useLayoutEffectCall';
import { getSwipeBackPredicates, hasHorizontalScrollableElementWithScrolledToLeft, swipeBackExcluded } from './utils';
import styles from './View.module.css';
export let scrollsCache = {};
const warn = warnOnce('View');
/**
 * @see https://vkcom.github.io/VKUI/#/View
 */ export const View = ({ activePanel: activePanelProp, history, nav, onTransition, onSwipeBack, onSwipeBackStart, onSwipeBackCancel: onSwipeBackCancelProp, children, className, ...restProps })=>{
    const id = getNavId({
        nav,
        id: restProps.id
    });
    const scrolls = React.useRef(scrollsCache[id] || {});
    const layoutEffectCall = useLayoutEffectCall();
    React.useEffect(()=>()=>{
            if (id) {
                scrollsCache[id] = scrolls.current;
            }
        });
    const panelNodes = React.useRef({});
    const { window, document } = useDOM();
    const scroll = useScroll();
    const configProvider = useConfigProvider();
    const splitCol = useSplitCol();
    const platform = usePlatform();
    const [animated, setAnimated] = React.useState(false);
    const [visiblePanels, setVisiblePanels] = React.useState([
        activePanelProp
    ]);
    const [activePanel, setActivePanel] = React.useState(activePanelProp);
    const [isBack, setIsBack] = React.useState(undefined);
    const [prevPanel, setPrevPanel] = React.useState(null);
    const [nextPanel, setNextPanel] = React.useState(null);
    const swipeBackPrevented = React.useRef(false);
    const [swipingBack, setSwipingBack] = React.useState(undefined);
    const [swipeBackStartX, setSwipeBackStartX] = React.useState(0);
    const [swipeBackShift, setSwipeBackShift] = React.useState(0);
    const [swipeBackNextPanel, setSwipeBackNextPanel] = React.useState(null);
    const [swipeBackPrevPanel, setSwipeBackPrevPanel] = React.useState(null);
    const [swipeBackResult, setSwipeBackResult] = React.useState(null);
    const [browserSwipe, setBrowserSwipe] = React.useState(false);
    const prevActivePanel = usePrevious(activePanelProp);
    const prevSwipingBack = usePrevious(swipingBack);
    const prevBrowserSwipe = usePrevious(browserSwipe);
    const prevSwipeBackResult = usePrevious(swipeBackResult);
    const prevSwipeBackShift = usePrevious(swipeBackShift);
    const prevSwipeBackPrevPanel = usePrevious(swipeBackPrevPanel);
    const prevOnTransition = usePrevious(onTransition);
    const panels = React.Children.toArray(children).filter((panel)=>{
        const panelId = getNavId(panel.props, warn);
        return panelId !== undefined && visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
    });
    const disableAnimation = !configProvider.transitionMotionEnabled || !splitCol.animate || platform === 'vkcom';
    const iOSSwipeBackSimulationEnabled = !disableAnimation && platform === 'ios' && configProvider.isWebView && Boolean(onSwipeBack);
    const flushTransition = React.useCallback((prevPanel, isBackTransition)=>{
        if (isBackTransition) {
            scrolls.current[prevPanel] = 0;
        }
        setPrevPanel(null);
        setNextPanel(null);
        setVisiblePanels([
            activePanelProp
        ]);
        setActivePanel(activePanelProp);
        setAnimated(false);
        setIsBack(isBackTransition);
        layoutEffectCall(()=>{
            scroll?.scrollTo(0, isBackTransition ? scrolls.current[activePanelProp] : 0);
            onTransition && onTransition({
                isBack: isBackTransition,
                from: prevPanel,
                to: activePanelProp
            });
        });
    }, [
        activePanelProp,
        layoutEffectCall,
        onTransition,
        scroll
    ]);
    const handleAnimatedTargetAnimationEnd = ()=>{
        if (prevPanel !== null) {
            flushTransition(prevPanel, Boolean(isBack));
        }
    };
    const onSwipeBackSuccess = React.useCallback(()=>{
        onSwipeBack && onSwipeBack();
    }, [
        onSwipeBack
    ]);
    const onSwipeBackCancel = React.useCallback(()=>{
        onSwipeBackCancelProp && onSwipeBackCancelProp();
        setSwipeBackPrevPanel(null);
        setSwipeBackNextPanel(null);
        setSwipingBack(false);
        setSwipeBackResult(null);
        setSwipeBackStartX(0);
        setSwipeBackShift(0);
    }, [
        onSwipeBackCancelProp
    ]);
    const swipingBackTransitionEndHandler = React.useCallback(()=>{
        switch(swipeBackResult){
            case 'fail':
                onSwipeBackCancel();
                break;
            case 'success':
                onSwipeBackSuccess();
        }
    }, [
        onSwipeBackCancel,
        onSwipeBackSuccess,
        swipeBackResult
    ]);
    const handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext = (event)=>{
        if (browserSwipe) {
            return;
        }
        const { swipeBackTriggered, viewportStartEdgeTouched, viewportEndEdgeTouched } = getSwipeBackPredicates(event.startX, event.shiftX, window.innerWidth);
        if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
            setBrowserSwipe(true);
        }
    };
    const handleTouchMoveXForIOSSwipeBackSimulation = (event)=>{
        if (swipeBackPrevented.current || swipeBackExcluded(event)) {
            return;
        }
        const { swipedToOpposite, swipeBackTriggered, viewportStartEdgeTouched } = getSwipeBackPredicates(event.startX, event.shiftX, window.innerWidth);
        if (animated && swipeBackTriggered) {
            return;
        }
        if (!swipingBack && history && history.length > 1) {
            if (swipedToOpposite) {
                swipeBackPrevented.current = true;
                return;
            }
            if (!swipeBackTriggered) {
                return;
            }
            if (!viewportStartEdgeTouched && hasHorizontalScrollableElementWithScrolledToLeft(event.originalEvent.target)) {
                swipeBackPrevented.current = true;
                return;
            }
            // Начался свайп назад
            if (onSwipeBackStart) {
                const payload = onSwipeBackStart(activePanel);
                if (payload === 'prevent') {
                    swipeBackPrevented.current = true;
                    return;
                }
            }
            if (activePanel !== null) {
                // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                blurActiveElement(document);
                scrolls.current[activePanel] = scroll?.getScroll().y;
            }
            setSwipingBack(true);
            setSwipeBackStartX(event.startX);
            setSwipeBackPrevPanel(activePanel);
            setSwipeBackNextPanel(history.slice(-2)[0]);
        }
        if (swipingBack) {
            if (event.shiftX < 0) {
                setSwipeBackShift(0);
            } else if (event.shiftX > window.innerWidth - swipeBackStartX) {
                setSwipeBackShift(window.innerWidth);
            } else {
                setSwipeBackShift(event.shiftX);
            }
        }
    };
    const handleTouchEndForIOSSwipeBackSimulation = (event)=>{
        swipeBackPrevented.current = false;
        if (swipingBack) {
            const speed = swipeBackShift / event.duration * 1000;
            if (swipeBackShift === 0) {
                onSwipeBackCancel();
            } else if (swipeBackShift >= (window.innerWidth ?? 0)) {
                onSwipeBackSuccess();
            } else if (speed > 250 || swipeBackShift >= window.innerWidth / 2) {
                setSwipeBackResult('success');
            } else {
                setSwipeBackResult('fail');
            }
        }
    };
    const calcPanelSwipeStyles = (isPrev, isNext)=>{
        if (!isPrev && !isNext || swipeBackResult) {
            return {};
        }
        if (isNext) {
            return window ? {
                transform: `translate3d(${-50 + swipeBackShift * 100 / window.innerWidth / 2}%, 0, 0)`
            } : {};
        }
        if (isPrev) {
            return {
                transform: `translate3d(${swipeBackShift}px, 0, 0)`
            };
        }
        return {};
    };
    const calcPanelSwipeBackOverlayStyles = (isNext)=>{
        if (!window || !isNext) {
            return {};
        }
        const opacityOnSwipeEnd = swipeBackResult === 'success' ? 0 : swipeBackResult === 'fail' ? 1 : null;
        return {
            display: 'block',
            opacity: opacityOnSwipeEnd === null ? 1 - swipeBackShift / window.innerWidth : opacityOnSwipeEnd
        };
    };
    const handleSwipeBackTargetTransitionEnd = (event)=>{
        if (event.propertyName.includes('transform')) {
            swipingBackTransitionEndHandler();
        }
    };
    React.useEffect(()=>{
        // Нужен переход
        if (prevActivePanel && prevActivePanel !== activePanelProp && !prevSwipingBack && !prevBrowserSwipe) {
            const firstLayerId = React.Children.toArray(children).map((panel)=>getNavId(panel.props, warn)).find((id)=>id === prevActivePanel || id === activePanelProp);
            const isBackTransition = firstLayerId === activePanelProp;
            scrolls.current[prevActivePanel] = scroll?.getScroll({
                compensateKeyboardHeight: false
            }).y;
            if (disableAnimation) {
                flushTransition(prevActivePanel, isBackTransition);
            } else {
                blurActiveElement(document);
                setVisiblePanels([
                    prevActivePanel,
                    activePanelProp
                ]);
                setPrevPanel(prevActivePanel);
                setNextPanel(activePanelProp);
                setActivePanel(null);
                setAnimated(true);
                setIsBack(isBackTransition);
            }
        }
        // Закончилась анимация свайпа назад
        if (prevActivePanel && prevActivePanel !== activePanelProp && prevSwipingBack) {
            const nextPanel = activePanelProp;
            const prevPanel = prevActivePanel;
            if (prevSwipeBackPrevPanel) {
                scrolls.current[prevSwipeBackPrevPanel] = 0;
            }
            setSwipeBackPrevPanel(null);
            setSwipeBackNextPanel(null);
            setSwipingBack(false);
            setSwipeBackResult(null);
            setSwipeBackStartX(0);
            setSwipeBackShift(0);
            setActivePanel(nextPanel);
            setVisiblePanels([
                nextPanel
            ]);
            setIsBack(true);
            layoutEffectCall(()=>{
                if (nextPanel !== null) {
                    scroll?.scrollTo(0, scrolls.current[nextPanel]);
                }
                prevOnTransition && prevOnTransition({
                    isBack: true,
                    from: prevPanel,
                    to: nextPanel
                });
            });
        }
        // Началась анимация завершения свайпа назад.
        // см. `onTransitionEnd()`
        // Закончился Safari свайп
        if (prevActivePanel !== activePanelProp && browserSwipe) {
            setBrowserSwipe(false);
            setNextPanel(null);
            setPrevPanel(null);
            setAnimated(false);
            setVisiblePanels([
                activePanelProp
            ]);
            setActivePanel(activePanelProp);
        }
    }, [
        activePanelProp,
        activePanel,
        browserSwipe,
        children,
        disableAnimation,
        document,
        flushTransition,
        prevActivePanel,
        prevBrowserSwipe,
        prevOnTransition,
        prevSwipeBackPrevPanel,
        prevSwipeBackResult,
        prevSwipingBack,
        scroll,
        swipeBackNextPanel,
        swipeBackResult,
        layoutEffectCall
    ]);
    React.useEffect(function restoreScrollPositionWhenSwipeBackIsCancelled() {
        // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
        const swipeBackCancelledInTheMiddleOfAction = prevSwipeBackResult === 'fail' && !swipeBackResult;
        const swipeBackCancelledByMovingPanelBackToInitialPoint = prevSwipingBack && !swipingBack && prevSwipeBackShift === 0;
        if ((swipeBackCancelledInTheMiddleOfAction || swipeBackCancelledByMovingPanelBackToInitialPoint) && activePanel !== null) {
            scroll?.scrollTo(0, scrolls.current[activePanel]);
        }
    }, [
        prevSwipeBackResult,
        swipeBackResult,
        prevSwipingBack,
        swipingBack,
        prevSwipeBackShift,
        activePanel,
        scroll
    ]);
    return /*#__PURE__*/ _jsx(NavViewIdContext.Provider, {
        value: id,
        children: /*#__PURE__*/ _jsx(Touch, {
            Component: "section",
            ...restProps,
            className: classNames(styles['View'], platform === 'ios' && classNames(styles['View--ios'], 'vkuiInternalView--ios'), !disableAnimation && animated && styles['View--animated'], !disableAnimation && swipingBack && styles['View--swiping-back'], disableAnimation && styles['View--no-motion'], className),
            onMoveX: iOSSwipeBackSimulationEnabled ? handleTouchMoveXForIOSSwipeBackSimulation : platform === 'ios' ? handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
            onEnd: iOSSwipeBackSimulationEnabled ? handleTouchEndForIOSSwipeBackSimulation : undefined,
            children: /*#__PURE__*/ _jsx("div", {
                className: styles['View__panels'],
                children: panels.map((panel)=>{
                    const panelId = getNavId(panel.props, warn);
                    const isPanelActive = panelId === activePanel;
                    const isPanelPrev = panelId === prevPanel;
                    const isPanelNext = panelId === nextPanel;
                    const isAnimatedTarget = animated && (isBack ? isPanelPrev : isPanelNext);
                    const isSwipeBackPrev = panelId === swipeBackPrevPanel;
                    const isSwipeBackNext = panelId === swipeBackNextPanel;
                    const isSwipeBackTarget = swipeBackResult && isSwipeBackPrev;
                    let scrollCompensateStyle = undefined;
                    if (isPanelPrev || isPanelNext && isBack || isSwipeBackPrev || isSwipeBackNext) {
                        const marginTop = scrolls.current[panelId];
                        if (marginTop !== undefined) {
                            scrollCompensateStyle = {
                                marginTop: -1 * marginTop
                            };
                        }
                    }
                    return /*#__PURE__*/ _jsxs("div", {
                        className: classNames(styles['View__panel'], isPanelActive && styles['View__panel--active'], isPanelPrev && styles['View__panel--prev'], isPanelNext && styles['View__panel--next'], isSwipeBackPrev && styles['View__panel--swipe-back-prev'], isSwipeBackNext && styles['View__panel--swipe-back-next'], swipeBackResult === 'success' && styles['View__panel--swipe-back-success'], swipeBackResult === 'fail' && styles['View__panel--swipe-back-failed']),
                        onTransitionEnd: isSwipeBackTarget ? handleSwipeBackTargetTransitionEnd : undefined,
                        onAnimationEnd: isAnimatedTarget ? handleAnimatedTargetAnimationEnd : undefined,
                        ref: (el)=>panelId !== undefined && (panelNodes.current[panelId] = el),
                        style: calcPanelSwipeStyles(isSwipeBackPrev, isSwipeBackNext),
                        children: [
                            platform === 'ios' && /*#__PURE__*/ _jsx("div", {
                                className: styles['View__panel-overlay'],
                                style: calcPanelSwipeBackOverlayStyles(isSwipeBackNext)
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: styles['View__panel-in'],
                                style: scrollCompensateStyle,
                                children: /*#__PURE__*/ _jsx(NavTransitionDirectionProvider, {
                                    isBack: swipingBack || isBack,
                                    children: /*#__PURE__*/ _jsx(NavTransitionProvider, {
                                        entering: panelId === nextPanel || panelId === swipeBackNextPanel,
                                        children: panel
                                    })
                                })
                            })
                        ]
                    }, panelId);
                })
            })
        })
    });
};

//# sourceMappingURL=View.js.map