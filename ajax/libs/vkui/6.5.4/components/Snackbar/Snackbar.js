import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import { useGlobalEscKeyDown } from '../../hooks/useGlobalEscKeyDown';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { useCSSKeyframesAnimationController } from '../../lib/animation';
import { getRelativeBoundingClientRect } from '../../lib/dom';
import { UIPanGestureRecognizer } from '../../lib/touch';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { Button } from '../Button/Button';
import { RootComponent } from '../RootComponent/RootComponent';
import { Basic } from './subcomponents/Basic/Basic';
import { getInitialShiftData, getMovedShiftData, resolveOffsetYCssStyle, shouldBeClosedByShiftData } from './utils';
const placementClassNames = {
    'top-start': "vkuiSnackbar--placement-top-start",
    'top': "vkuiSnackbar--placement-top",
    'top-end': "vkuiSnackbar--placement-top-end",
    'bottom-start': "vkuiSnackbar--placement-bottom-start",
    'bottom': "vkuiSnackbar--placement-bottom",
    'bottom-end': "vkuiSnackbar--placement-bottom-end"
};
const animationStateClassNames = {
    enter: "vkuiSnackbar--state-enter",
    entering: "vkuiSnackbar--state-entering",
    entered: "vkuiSnackbar--state-entered",
    exit: "vkuiSnackbar--state-exit",
    exiting: "vkuiSnackbar--state-exiting",
    exited: undefined
};
/**
 * @see https://vkcom.github.io/VKUI/#/Snackbar
 */ export const Snackbar = (_param)=>{
    var { placement = 'bottom-start', children, layout, action, before, after, duration = 4000, onActionClick, onClose, mode = 'default', subtitle, offsetY, style, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "placement",
        "children",
        "layout",
        "action",
        "before",
        "after",
        "duration",
        "onActionClick",
        "onClose",
        "mode",
        "subtitle",
        "offsetY",
        "style",
        "getRootRef"
    ]);
    const platform = usePlatform();
    const [open, setOpen] = React.useState(true);
    const [touched, setTouched] = React.useState(false);
    const rootRef = useExternRef(getRootRef);
    const focused = useFocusWithin(rootRef);
    const inRef = React.useRef(null);
    const panGestureRecognizer = React.useRef(null);
    const shiftDataRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const closeTimeoutIdRef = React.useRef();
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
            onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick(event);
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
            shiftDataRef.current = getMovedShiftData(placement, shiftDataRef.current, panGestureRecognizer.current.delta());
            if (shiftDataRef.current.shifted) {
                updateShiftAxisCSSProperties(shiftDataRef.current.x, shiftDataRef.current.y, shiftDataRef.current.direction);
            }
        }
    };
    const handleTouchEnd = ()=>{
        if (touched && shiftDataRef.current && panGestureRecognizer.current && shouldBeClosedByShiftData(placement, shiftDataRef.current, getRelativeBoundingClientRect(rootRef.current, inRef.current), panGestureRecognizer.current.velocity())) {
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        role: "presentation",
        baseClassName: classNames("vkuiSnackbar", platform === 'ios' && "vkuiSnackbar--ios", touched && "vkuiSnackbar--touched", placementClassNames[placement], animationStateClassNames[animationState]),
        style: resolveOffsetYCssStyle(placement, style, offsetY),
        getRootRef: rootRef,
        children: /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
            role: "alert",
            className: "vkuiSnackbar__in",
            ref: inRef,
            // mobile
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
            // desktop
            onMouseDown: handleTouchStart,
            onMouseMove: handleTouchMove,
            onMouseUp: handleTouchEnd,
            onMouseLeave: handleTouchEnd
        }, animationHandlers), {
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
        }))
    }));
};
Snackbar.Basic = Basic;

//# sourceMappingURL=Snackbar.js.map