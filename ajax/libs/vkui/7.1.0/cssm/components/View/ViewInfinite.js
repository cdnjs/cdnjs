'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { withContext } from "../../hoc/withContext.js";
import { withPlatform } from "../../hoc/withPlatform.js";
import { canUseDOM, withDOM } from "../../lib/dom.js";
import { getNavId } from "../../lib/getNavId.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { ScrollContext } from "../AppRoot/ScrollContext.js";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext.js";
import { NavViewIdContext } from "../NavIdContext/NavIdContext.js";
import { NavTransitionProvider } from "../NavTransitionContext/NavTransitionContext.js";
import { NavTransitionDirectionProvider } from "../NavTransitionDirectionContext/NavTransitionDirectionContext.js";
import { SplitColContext } from "../SplitCol/SplitColContext.js";
import { Touch } from "../Touch/Touch.js";
import { getSwipeBackPredicates, hasHorizontalScrollableElementWithScrolledToLeft, swipeBackExcluded } from "./utils.js";
import styles from "./View.module.css";
const warn = warnOnce('ViewInfinite');
export let scrollsCache = {};
class ViewInfiniteComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            animated: false,
            visiblePanels: [
                props.activePanel
            ],
            activePanel: props.activePanel,
            isBack: undefined,
            prevPanel: null,
            nextPanel: null,
            swipingBack: undefined,
            swipeBackStartX: 0,
            swipeBackShift: 0,
            swipeBackNextPanel: null,
            swipeBackPrevPanel: null,
            swipeBackResult: null,
            browserSwipe: false
        };
    }
    static defaultProps = {
        history: []
    };
    swipeBackPrevented = false;
    scrolls = scrollsCache[getNavId(this.props, warn)] || {};
    transitionFinishTimeout = undefined;
    animationFinishTimeout = undefined;
    get document() {
        return this.props.document;
    }
    get window() {
        return this.props.window;
    }
    get panels() {
        return React.Children.toArray(this.props.children);
    }
    panelNodes = {};
    componentWillUnmount() {
        const id = getNavId(this.props);
        if (id) {
            scrollsCache[id] = this.scrolls;
        }
        if (this.animationFinishTimeout) {
            clearTimeout(this.animationFinishTimeout);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // Нужен переход
        if (prevProps.activePanel !== this.props.activePanel && !prevState.swipingBack && !prevState.browserSwipe) {
            let isBack = false;
            if (this.props.isBackCheck) {
                isBack = this.props.isBackCheck({
                    from: prevProps.activePanel,
                    to: this.props.activePanel
                });
            } else {
                const firstLayerId = this.panels.map((panel)=>getNavId(panel.props, warn)).find((id)=>id === prevProps.activePanel || id === this.props.activePanel);
                isBack = firstLayerId === this.props.activePanel;
            }
            this.blurActiveElement();
            const prevScrolls = this.scrolls[prevProps.activePanel] || [];
            const scrolls = {
                ...this.scrolls,
                [prevProps.activePanel]: [
                    ...prevScrolls,
                    this.props.scroll?.getScroll({
                        compensateKeyboardHeight: false
                    }).y
                ]
            };
            this.scrolls = scrolls;
            if (this.shouldDisableTransitionMotion()) {
                this.flushTransition(prevProps.activePanel, isBack);
            } else {
                this.setState({
                    visiblePanels: [
                        prevProps.activePanel,
                        this.props.activePanel
                    ],
                    prevPanel: prevProps.activePanel,
                    nextPanel: this.props.activePanel,
                    activePanel: null,
                    animated: true,
                    isBack
                });
            }
        }
        // Закончилась анимация свайпа назад
        if (prevProps.activePanel !== this.props.activePanel && prevState.swipingBack) {
            const nextPanel = this.state.swipeBackNextPanel;
            const prevPanel = this.state.swipeBackPrevPanel;
            let scrollPosition = undefined;
            this.scrolls = {
                ...this.scrolls
            };
            if (prevPanel !== null) {
                const prevPanelScrolls = [
                    ...this.scrolls[prevPanel] || []
                ].slice(0, -1);
                this.scrolls[prevPanel] = prevPanelScrolls;
            }
            if (nextPanel !== null) {
                const newPanelScrolls = [
                    ...this.scrolls[nextPanel] || []
                ];
                scrollPosition = newPanelScrolls.pop();
                this.scrolls[nextPanel] = newPanelScrolls;
            }
            this.setState({
                swipeBackPrevPanel: null,
                swipeBackNextPanel: null,
                swipingBack: false,
                swipeBackResult: null,
                swipeBackStartX: 0,
                swipeBackShift: 0,
                activePanel: nextPanel,
                visiblePanels: [
                    nextPanel
                ]
            }, ()=>{
                this.props.scroll?.scrollTo(0, scrollPosition);
                prevProps.onTransition && prevProps.onTransition({
                    isBack: true,
                    from: prevPanel,
                    to: nextPanel
                });
            });
        }
        // Началась анимация завершения свайпа назад.
        if (!prevState.swipeBackResult && this.state.swipeBackResult) {
            this.waitTransitionFinish(this.pickPanel(this.state.swipeBackNextPanel), this.swipingBackTransitionEndHandler);
        }
        // Если свайп назад отменился (когда пользователь недостаточно сильно свайпнул)
        if (prevState.swipeBackResult === 'fail' && !this.state.swipeBackResult && this.state.activePanel !== null) {
            const newPanelScrolls = [
                ...this.scrolls[this.state.activePanel] || []
            ];
            const scrollPosition = newPanelScrolls.pop();
            this.scrolls = {
                ...this.scrolls,
                [this.state.activePanel]: newPanelScrolls
            };
            this.props.scroll?.scrollTo(0, scrollPosition);
        }
        // Закончился Safari свайп
        if (prevProps.activePanel !== this.props.activePanel && this.state.browserSwipe) {
            this.setState({
                browserSwipe: false,
                nextPanel: null,
                prevPanel: null,
                animated: false,
                visiblePanels: [
                    this.props.activePanel
                ],
                activePanel: this.props.activePanel
            });
        }
    }
    shouldDisableTransitionMotion() {
        return this.props.configProvider?.transitionMotionEnabled === false || !this.props.splitCol?.animate || this.props.platform === 'vkcom';
    }
    transitionDisposer = noop;
    disposeTransition() {
        this.transitionDisposer();
        this.transitionDisposer = noop;
    }
    waitTransitionFinish(elem, eventHandler) {
        if (this.shouldDisableTransitionMotion()) {
            this.disposeTransition();
            this.transitionFinishTimeout = setTimeout(eventHandler);
        } else if (elem) {
            this.disposeTransition();
            elem.addEventListener('transitionend', eventHandler);
            this.transitionDisposer = ()=>{
                elem.removeEventListener('transitionend', eventHandler);
            };
        } else {
            if (this.transitionFinishTimeout) {
                clearTimeout(this.transitionFinishTimeout);
            }
            this.transitionFinishTimeout = setTimeout(eventHandler, this.props.platform === 'android' || this.props.platform === 'vkcom' ? 300 : 600);
        }
    }
    blurActiveElement() {
        if (typeof this.window !== 'undefined' && this.document?.activeElement) {
            this.document.activeElement.blur();
        }
    }
    pickPanel(id) {
        if (id === null) {
            return undefined;
        }
        return this.panelNodes[id];
    }
    flushTransition(prevPanel, isBack) {
        const activePanel = this.props.activePanel;
        const prevPanelScrolls = [
            ...this.scrolls[prevPanel] || []
        ].slice(0, -1);
        const newPanelScrolls = [
            ...this.scrolls[activePanel] || []
        ];
        const scrollPosition = isBack ? newPanelScrolls.pop() : 0;
        if (isBack) {
            this.scrolls = {
                ...this.scrolls,
                [prevPanel]: prevPanelScrolls,
                [activePanel]: newPanelScrolls
            };
        }
        this.setState({
            prevPanel: null,
            nextPanel: null,
            visiblePanels: [
                activePanel
            ],
            activePanel: activePanel,
            animated: false,
            isBack
        }, ()=>{
            this.props.scroll?.scrollTo(0, isBack ? scrollPosition : 0);
            this.props.onTransition && this.props.onTransition({
                isBack,
                from: prevPanel,
                to: activePanel
            });
        });
    }
    transitionEndHandler = ()=>{
        if (this.state.prevPanel !== null) {
            this.flushTransition(this.state.prevPanel, Boolean(this.state.isBack));
        }
    };
    swipingBackTransitionEndHandler = (e)=>{
        // indexOf because of vendor prefixes in old browsers
        if (!e || e.propertyName.includes('transform') && e.target === this.pickPanel(this.state.swipeBackNextPanel)) {
            switch(this.state.swipeBackResult){
                case 'fail':
                    this.onSwipeBackCancel();
                    break;
                case 'success':
                    this.onSwipeBackSuccess();
            }
        }
    };
    onSwipeBackSuccess() {
        this.props.onSwipeBack && this.props.onSwipeBack();
    }
    onSwipeBackCancel() {
        this.props.onSwipeBackCancel && this.props.onSwipeBackCancel();
        this.setState({
            swipeBackPrevPanel: null,
            swipeBackNextPanel: null,
            swipingBack: false,
            swipeBackResult: null,
            swipeBackStartX: 0,
            swipeBackShift: 0
        });
    }
    handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext = (event)=>{
        if (this.state.browserSwipe) {
            return;
        }
        const { swipeBackTriggered, viewportStartEdgeTouched, viewportEndEdgeTouched } = getSwipeBackPredicates(event.startX, event.shiftX, this.window.innerWidth);
        if ((viewportStartEdgeTouched || viewportEndEdgeTouched) && swipeBackTriggered) {
            this.setState({
                browserSwipe: true
            });
        }
    };
    handleTouchMoveXForIOSSwipeBackSimulation = (event)=>{
        if (this.swipeBackPrevented || swipeBackExcluded(event)) {
            return;
        }
        const { swipedToOpposite, swipeBackTriggered, viewportStartEdgeTouched } = getSwipeBackPredicates(event.startX, event.shiftX, this.window.innerWidth);
        if (this.state.animated && swipeBackTriggered) {
            return;
        }
        if (!this.state.swipingBack && this.props.history && this.props.history.length > 1) {
            if (swipedToOpposite) {
                this.swipeBackPrevented = true;
                return;
            }
            if (!swipeBackTriggered) {
                return;
            }
            if (!viewportStartEdgeTouched && hasHorizontalScrollableElementWithScrolledToLeft(event.originalEvent.target)) {
                this.swipeBackPrevented = true;
                return;
            }
            // Начался свайп назад
            if (this.props.onSwipeBackStart) {
                const payload = this.props.onSwipeBackStart(this.state.activePanel);
                if (payload === 'prevent') {
                    this.swipeBackPrevented = true;
                    return;
                }
            }
            if (this.state.activePanel !== null) {
                // Note: вызываем закрытие клавиатуры. В iOS это нативное поведение при свайпе.
                this.blurActiveElement();
                const prevScrolls = this.scrolls[this.state.activePanel] || [];
                this.scrolls = {
                    ...this.scrolls,
                    [this.state.activePanel]: [
                        ...prevScrolls,
                        this.props.scroll?.getScroll().y
                    ]
                };
            }
            this.setState({
                swipingBack: true,
                swipeBackStartX: event.startX,
                swipeBackPrevPanel: this.state.activePanel,
                swipeBackNextPanel: this.props.history.slice(-2)[0]
            });
        }
        if (this.state.swipingBack) {
            if (event.shiftX < 0) {
                this.setState({
                    swipeBackShift: 0
                });
            } else if (event.shiftX > this.window.innerWidth - this.state.swipeBackStartX) {
                this.setState({
                    swipeBackShift: this.window.innerWidth
                });
            } else {
                this.setState({
                    swipeBackShift: event.shiftX
                });
            }
        }
    };
    handleTouchEndForIOSSwipeBackSimulation = (event)=>{
        this.swipeBackPrevented = false;
        if (this.state.swipingBack && this.window) {
            const speed = this.state.swipeBackShift / event.duration * 1000;
            if (this.state.swipeBackShift === 0) {
                this.onSwipeBackCancel();
            } else if (this.state.swipeBackShift >= this.window.innerWidth) {
                this.onSwipeBackSuccess();
            } else if (speed > 250 || this.state.swipeBackShift >= this.window.innerWidth / 2) {
                this.setState({
                    swipeBackResult: 'success'
                });
            } else {
                this.setState({
                    swipeBackResult: 'fail'
                });
            }
        }
    };
    calcPanelSwipeStyles(panelId) {
        if (!canUseDOM || !this.window) {
            return {};
        }
        const isPrev = panelId === this.state.swipeBackPrevPanel;
        const isNext = panelId === this.state.swipeBackNextPanel;
        if (!isPrev && !isNext || this.state.swipeBackResult) {
            return {};
        }
        let prevPanelTranslate = `${this.state.swipeBackShift}px`;
        let nextPanelTranslate = `${-50 + this.state.swipeBackShift * 100 / this.window.innerWidth / 2}%`;
        let prevPanelShadow = 0.3 * (this.window.innerWidth - this.state.swipeBackShift) / this.window.innerWidth;
        if (this.state.swipeBackResult) {
            return isPrev ? {
                boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})`
            } : {};
        }
        if (isNext) {
            return {
                transform: `translate3d(${nextPanelTranslate}, 0, 0)`
            };
        }
        if (isPrev) {
            return {
                transform: `translate3d(${prevPanelTranslate}, 0, 0)`,
                boxShadow: `-2px 0 12px rgba(0, 0, 0, ${prevPanelShadow})`
            };
        }
        return {};
    }
    render() {
        const { platform, activePanel: _1, splitCol, configProvider, history, id, nav, onTransition, onSwipeBack, onSwipeBackStart, onSwipeBackCancel, window, document, scroll, isBackCheck, className, ...restProps } = this.props;
        const { prevPanel, nextPanel, activePanel, isBack, animated, swipeBackPrevPanel, swipeBackNextPanel, swipeBackResult, swipingBack } = this.state;
        const panels = this.panels.filter((panel)=>{
            const panelId = getNavId(panel.props, warn);
            return panelId !== undefined && this.state.visiblePanels.includes(panelId) || panelId === swipeBackPrevPanel || panelId === swipeBackNextPanel;
        }).sort((panel)=>{
            const panelId = getNavId(panel.props, warn);
            const isPrevPanel = panelId === prevPanel || panelId === swipeBackPrevPanel;
            const isNextPanel = panelId === nextPanel || panelId === swipeBackNextPanel;
            if (isNextPanel) {
                return swipingBack || this.state.isBack ? -1 : 1;
            }
            if (isPrevPanel) {
                return swipingBack || this.state.isBack ? 1 : -1;
            }
            return 0;
        });
        const disableAnimation = this.shouldDisableTransitionMotion();
        const iOSSwipeBackSimulationEnabled = !disableAnimation && platform === 'ios' && configProvider?.isWebView && Boolean(onSwipeBack);
        return /*#__PURE__*/ _jsx(NavViewIdContext.Provider, {
            value: id || nav,
            children: /*#__PURE__*/ _jsx(Touch, {
                Component: "section",
                ...restProps,
                className: classNames(styles.host, platform === 'ios' && classNames(styles.ios, 'vkuiInternalView--ios'), !disableAnimation && this.state.animated && styles.animated, !disableAnimation && this.state.swipingBack && styles.swipingBack, disableAnimation && styles.noMotion, className),
                onMoveX: iOSSwipeBackSimulationEnabled ? this.handleTouchMoveXForIOSSwipeBackSimulation : platform === 'ios' ? this.handleTouchMoveXForNativeIOSSwipeBackOrSwipeNext : undefined,
                onEnd: iOSSwipeBackSimulationEnabled ? this.handleTouchEndForIOSSwipeBackSimulation : undefined,
                children: /*#__PURE__*/ _jsx("div", {
                    className: styles.panels,
                    children: panels.map((panel)=>{
                        const panelId = getNavId(panel.props, warn);
                        const isPrev = panelId === prevPanel || panelId === swipeBackPrevPanel;
                        const compensateScroll = isPrev || panelId === swipeBackNextPanel || panelId === nextPanel && isBack;
                        const isTransitionTarget = animated && panelId === (isBack ? prevPanel : nextPanel);
                        const scrollList = panelId && this.scrolls[panelId] || [];
                        const scroll = scrollList[scrollList.length - 1] || 0;
                        return /*#__PURE__*/ _jsx("div", {
                            className: classNames(styles.panel, panelId === activePanel && styles.panelActive, panelId === prevPanel && styles.panelPrev, panelId === nextPanel && styles.panelNext, panelId === swipeBackPrevPanel && styles.panelSwipeBackPrev, panelId === swipeBackNextPanel && styles.panelSwipeBackNext, swipeBackResult === 'success' && styles.panelSwipeBackSuccess, swipeBackResult === 'fail' && styles.panelSwipeBackFailed),
                            onAnimationEnd: isTransitionTarget ? this.transitionEndHandler : undefined,
                            ref: (el)=>{
                                panelId !== undefined && (this.panelNodes[panelId] = el);
                            },
                            style: this.calcPanelSwipeStyles(panelId),
                            children: /*#__PURE__*/ _jsx("div", {
                                className: styles.panelIn,
                                style: {
                                    marginTop: compensateScroll ? -scroll : undefined
                                },
                                children: /*#__PURE__*/ _jsx(NavTransitionDirectionProvider, {
                                    isBack: swipingBack || isBack,
                                    children: /*#__PURE__*/ _jsx(NavTransitionProvider, {
                                        entering: panelId === nextPanel || panelId === swipeBackNextPanel,
                                        children: panel
                                    })
                                })
                            })
                        }, panelId);
                    })
                })
            })
        });
    }
}
export const ViewInfinite = withContext(withContext(withContext(withPlatform(withDOM(ViewInfiniteComponent)), SplitColContext, 'splitCol'), ConfigProviderContext, 'configProvider'), ScrollContext, 'scroll');

//# sourceMappingURL=ViewInfinite.js.map