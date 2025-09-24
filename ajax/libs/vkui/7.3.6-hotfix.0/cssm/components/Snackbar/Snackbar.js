'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
import { useGlobalEscKeyDown } from "../../hooks/useGlobalEscKeyDown.js";
import { useMediaQueries } from "../../hooks/useMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { getRelativeBoundingClientRect } from "../../lib/dom.js";
import { UIPanGestureRecognizer } from "../../lib/touch/index.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { Button } from "../Button/Button.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Basic } from "./subcomponents/Basic/Basic.js";
import { getInitialShiftData, getMovedShiftData, resolveOffsetYCssStyle, shouldBeClosedByShiftData } from "./utils.js";
import styles from "./Snackbar.module.css";
const placementClassNames = {
    'top-start': styles.placementTopStart,
    'top': styles.placementTop,
    'top-end': styles.placementTopEnd,
    'bottom-start': styles.placementBottomStart,
    'bottom': styles.placementBottom,
    'bottom-end': styles.placementBottomEnd
};
const animationStateClassNames = {
    enter: styles.stateEnter,
    entering: styles.stateEntering,
    entered: styles.stateEntered,
    exit: styles.stateExit,
    exiting: styles.stateExiting,
    exited: undefined
};
/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */ export const Snackbar = ({ placement = 'bottom-start', children, layout, action, before, after, duration = 4000, onActionClick, onClose, mode = 'default', subtitle, offsetY, getRootRef, ...restProps })=>{
    const platform = usePlatform();
    const [open, setOpen] = React.useState(true);
    const [touched, setTouched] = React.useState(false);
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const rootRef = useExternRef(getRootRef);
    const focused = useFocusWithin(rootRef);
    const inRef = React.useRef(null);
    const panGestureRecognizer = React.useRef(null);
    const shiftDataRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const closeTimeoutIdRef = React.useRef(undefined);
    const mediaQueries = useMediaQueries();
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(open ? 'enter' : 'exit', {
        onExited: onClose
    });
    const clearRAF = React.useCallback(()=>{
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);
    const updateShiftAxisCSSProperties = React.useCallback((x, y, direction)=>{
        rafRef.current = requestAnimationFrame(()=>{
            if (rootRef.current) {
                x === null ? rootRef.current.style.removeProperty('--vkui_internal--snackbar_shift_x') : rootRef.current.style.setProperty('--vkui_internal--snackbar_shift_x', `${x}px`);
                y === null ? rootRef.current.style.removeProperty('--vkui_internal--snackbar_shift_y') : rootRef.current.style.setProperty('--vkui_internal--snackbar_shift_y', `${y}px`);
                direction === null ? rootRef.current.style.removeProperty('--vkui_internal--snackbar_direction') : /* istanbul ignore next: TODO чтобы протестировать кейс, нужно мокать useMediaQueries(), чтобы перебивать mediaQueries.smallTabletPlus.matches */ rootRef.current.style.setProperty('--vkui_internal--snackbar_direction', `${direction}`);
            }
        });
    }, [
        rootRef
    ]);
    const close = React.useCallback(()=>{
        setOpen(false);
    }, []);
    const handleActionClick = (event)=>{
        close();
        if (action) {
            onActionClick?.(event);
        }
    };
    const handleTouchStart = (event)=>{
        panGestureRecognizer.current = new UIPanGestureRecognizer();
        panGestureRecognizer.current.setStartCoords(event.nativeEvent);
        shiftDataRef.current = getInitialShiftData(rootRef.current.offsetWidth, rootRef.current.offsetHeight, mediaQueries);
        setTouched(true);
    };
    const handleTouchMove = (event)=>{
        if (shiftDataRef.current && panGestureRecognizer.current) {
            panGestureRecognizer.current.setInitialTimeOnce();
            panGestureRecognizer.current.setEndCoords(event.nativeEvent);
            shiftDataRef.current = getMovedShiftData(placement, shiftDataRef.current, panGestureRecognizer.current.delta(), isRtl);
            if (shiftDataRef.current.shifted) {
                updateShiftAxisCSSProperties(shiftDataRef.current.x, shiftDataRef.current.y, shiftDataRef.current.direction);
            }
        }
    };
    const handleTouchEnd = ()=>{
        if (touched && shiftDataRef.current && panGestureRecognizer.current && shouldBeClosedByShiftData(placement, shiftDataRef.current, getRelativeBoundingClientRect(rootRef.current, inRef.current), panGestureRecognizer.current.velocity(), isRtl)) {
            close();
        }
        setTouched(false);
    };
    useIsomorphicLayoutEffect(function closeAfterDelay() {
        if (!open || focused || touched || animationState !== 'entered') {
            return;
        }
        closeTimeoutIdRef.current = setTimeout(close, duration);
        return function preventCloseAfterDelayOnUnmount() {
            clearTimeout(closeTimeoutIdRef.current);
        };
    }, [
        open,
        focused,
        touched,
        animationState,
        close,
        duration
    ]);
    useIsomorphicLayoutEffect(function clearUserInteractionDataAfterTouchEnd() {
        if (!touched) {
            clearRAF();
            shiftDataRef.current = null;
            panGestureRecognizer.current = null;
            if (open) {
                updateShiftAxisCSSProperties(null, null, null);
            }
        }
    }, [
        touched,
        open,
        updateShiftAxisCSSProperties,
        clearRAF
    ]);
    React.useEffect(()=>clearRAF, [
        clearRAF
    ]);
    useGlobalEscKeyDown(open, close);
    if (animationState === 'exited') {
        return null;
    }
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        role: "presentation",
        baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, touched && styles.touched, placementClassNames[placement], animationStateClassNames[animationState], isRtl && styles.rtl),
        baseStyle: resolveOffsetYCssStyle(placement, offsetY),
        getRootRef: rootRef,
        children: /*#__PURE__*/ _jsx("div", {
            role: "alert",
            className: styles.in,
            ref: inRef,
            // mobile
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            // desktop
            onMouseDown: handleTouchStart,
            onMouseMove: handleTouchMove,
            onMouseUp: handleTouchEnd,
            onMouseLeave: handleTouchEnd,
            ...animationHandlers,
            children: /*#__PURE__*/ _jsx(Basic, {
                mode: mode,
                layout: layout,
                before: before,
                after: after,
                subtitle: subtitle,
                action: action && /*#__PURE__*/ _jsx(Button, {
                    align: "left",
                    mode: "link",
                    appearance: mode === 'dark' ? /* istanbul ignore next: проверяется в e2e */ 'overlay' : 'accent',
                    size: "s",
                    onClick: handleActionClick,
                    children: action
                }),
                children: children
            })
        })
    });
};
Snackbar.Basic = Basic;

//# sourceMappingURL=Snackbar.js.map