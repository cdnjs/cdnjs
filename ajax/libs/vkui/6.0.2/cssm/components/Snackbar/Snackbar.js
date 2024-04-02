import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { ViewWidth } from '../../lib/adaptivity';
import { rubber } from '../../lib/touch';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { Button } from '../Button/Button';
import { RootComponent } from '../RootComponent/RootComponent';
import { Touch } from '../Touch/Touch';
import { Basic } from './subcomponents/Basic/Basic';
import styles from './Snackbar.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */ export const Snackbar = ({ children, layout: layoutProps, action, before, after, duration = 4000, onActionClick, onClose, mode = 'default', subtitle, offsetY, style, ...restProps })=>{
    const platform = usePlatform();
    const { viewWidth } = useAdaptivityWithJSMediaQueries();
    const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;
    const { waitTransitionFinish } = useWaitTransitionFinish();
    const [closing, setClosing] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const shiftXPercentRef = React.useRef(0);
    const shiftXCurrentRef = React.useRef(0);
    const bodyElRef = React.useRef(null);
    const innerElRef = React.useRef(null);
    const animationFrameRef = React.useRef(null);
    const transitionFinishDurationFallback = platform === 'ios' ? 320 : 400;
    const close = ()=>{
        setClosing(true);
        waitTransitionFinish(innerElRef.current, ()=>{
            onClose();
        }, transitionFinishDurationFallback);
    };
    const handleActionClick = (e)=>{
        close();
        if (action && typeof onActionClick === 'function') {
            onActionClick(e);
        }
    };
    const closeTimeout = useTimeout(close, duration);
    const setBodyTransform = (percent)=>{
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(()=>{
            if (bodyElRef.current) {
                bodyElRef.current.style.transform = `translate3d(${percent}%, 0, 0)`;
            }
        });
    };
    const onTouchStart = closeTimeout.clear;
    const onTouchMoveX = (event)=>{
        const { shiftX, originalEvent } = event;
        originalEvent.preventDefault();
        if (!touched) {
            setTouched(true);
        }
        shiftXPercentRef.current = shiftX / (bodyElRef.current?.offsetWidth ?? 0) * 100;
        shiftXCurrentRef.current = rubber(shiftXPercentRef.current, 72, 1.2, platform !== 'ios');
        setBodyTransform(shiftXCurrentRef.current);
    };
    const onTouchEnd = (e)=>{
        let callback;
        if (touched) {
            let shiftXCurrent = shiftXCurrentRef.current;
            const expectTranslateY = shiftXCurrent / e.duration * 240 * 0.6;
            shiftXCurrent = shiftXCurrent + expectTranslateY;
            if (isDesktop && shiftXCurrent <= -50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, ()=>{
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(-120);
            } else if (!isDesktop && shiftXCurrent >= 50) {
                closeTimeout.clear();
                waitTransitionFinish(bodyElRef.current, ()=>{
                    onClose();
                }, transitionFinishDurationFallback);
                setBodyTransform(120);
            } else {
                callback = ()=>{
                    closeTimeout.set();
                    setBodyTransform(0);
                };
            }
        } else {
            closeTimeout.set();
        }
        setTouched(false);
        callback && requestAnimationFrame(callback);
    };
    React.useEffect(()=>closeTimeout.set(), [
        closeTimeout
    ]);
    const layout = layoutProps || (after || isDesktop || subtitle ? 'vertical' : 'horizontal');
    return /*#__PURE__*/ React.createElement(AppRootPortal, null, /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Snackbar'], platform === 'ios' && styles['Snackbar--ios'], closing && styles['Snackbar--closing'], touched && styles['Snackbar--touched'], isDesktop && styles['Snackbar--desktop']),
        style: offsetY ? {
            ...style,
            bottom: offsetY
        } : style
    }, /*#__PURE__*/ React.createElement(Touch, {
        className: styles['Snackbar__in'],
        getRootRef: innerElRef,
        onStart: onTouchStart,
        onMoveX: onTouchMoveX,
        onEnd: onTouchEnd
    }, /*#__PURE__*/ React.createElement(Basic, {
        className: styles['Snackbar__snackbar'],
        getRootRef: bodyElRef,
        layout: layout,
        mode: mode,
        before: before,
        subtitle: subtitle,
        action: action && /*#__PURE__*/ React.createElement(Button, {
            align: "left",
            mode: "link",
            appearance: mode === 'dark' ? 'overlay' : 'accent',
            size: "s",
            onClick: handleActionClick
        }, action),
        after: after
    }, children))));
};
Snackbar.Basic = Basic;

//# sourceMappingURL=Snackbar.js.map