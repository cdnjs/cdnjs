"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Snackbar", {
    enumerable: true,
    get: function() {
        return Snackbar;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _useFocusWithin = require("../../hooks/useFocusWithin");
const _useGlobalEscKeyDown = require("../../hooks/useGlobalEscKeyDown");
const _useMediaQueries = require("../../hooks/useMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _animation = require("../../lib/animation");
const _dom = require("../../lib/dom");
const _touch = require("../../lib/touch");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _Button = require("../Button/Button");
const _RootComponent = require("../RootComponent/RootComponent");
const _Basic = require("./subcomponents/Basic/Basic");
const _utils = require("./utils");
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
const Snackbar = (_param)=>{
    var { placement = 'bottom-start', children, layout, action, before, after, duration = 4000, onActionClick, onClose, mode = 'default', subtitle, offsetY, style, getRootRef } = _param, restProps = _object_without_properties._(_param, [
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
    const platform = (0, _usePlatform.usePlatform)();
    const [open, setOpen] = _react.useState(true);
    const [touched, setTouched] = _react.useState(false);
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const focused = (0, _useFocusWithin.useFocusWithin)(rootRef);
    const inRef = _react.useRef(null);
    const panGestureRecognizer = _react.useRef(null);
    const shiftDataRef = _react.useRef(null);
    const rafRef = _react.useRef(null);
    const closeTimeoutIdRef = _react.useRef();
    const mediaQueries = (0, _useMediaQueries.useMediaQueries)();
    const [animationState, animationHandlers] = (0, _animation.useCSSKeyframesAnimationController)(open ? 'enter' : 'exit', {
        onExited: onClose
    });
    const clearRAF = _react.useCallback(()=>{
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);
    const updateShiftAxisCSSProperties = _react.useCallback((x, y, direction)=>{
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
    const close = _react.useCallback(()=>{
        setOpen(false);
    }, []);
    const handleActionClick = (event)=>{
        close();
        if (action) {
            onActionClick === null || onActionClick === void 0 ? void 0 : onActionClick(event);
        }
    };
    const handleTouchStart = (event)=>{
        panGestureRecognizer.current = new _touch.UIPanGestureRecognizer();
        panGestureRecognizer.current.setStartCoords(event.nativeEvent);
        shiftDataRef.current = (0, _utils.getInitialShiftData)(rootRef.current.offsetWidth, rootRef.current.offsetHeight, mediaQueries);
        setTouched(true);
    };
    const handleTouchMove = (event)=>{
        if (shiftDataRef.current && panGestureRecognizer.current) {
            panGestureRecognizer.current.setInitialTimeOnce();
            panGestureRecognizer.current.setEndCoords(event.nativeEvent);
            shiftDataRef.current = (0, _utils.getMovedShiftData)(placement, shiftDataRef.current, panGestureRecognizer.current.delta());
            if (shiftDataRef.current.shifted) {
                updateShiftAxisCSSProperties(shiftDataRef.current.x, shiftDataRef.current.y, shiftDataRef.current.direction);
            }
        }
    };
    const handleTouchEnd = ()=>{
        if (touched && shiftDataRef.current && panGestureRecognizer.current && (0, _utils.shouldBeClosedByShiftData)(placement, shiftDataRef.current, (0, _dom.getRelativeBoundingClientRect)(rootRef.current, inRef.current), panGestureRecognizer.current.velocity())) {
            close();
        }
        setTouched(false);
    };
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function closeAfterDelay() {
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
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function clearUserInteractionDataAfterTouchEnd() {
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
    _react.useEffect(()=>clearRAF, [
        clearRAF
    ]);
    (0, _useGlobalEscKeyDown.useGlobalEscKeyDown)(open, close);
    if (animationState === 'exited') {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        role: "presentation",
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar", platform === 'ios' && "vkuiSnackbar--ios", touched && "vkuiSnackbar--touched", placementClassNames[placement], animationStateClassNames[animationState]),
        style: (0, _utils.resolveOffsetYCssStyle)(placement, style, offsetY),
        getRootRef: rootRef,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
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
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Basic.Basic, {
                mode: mode,
                layout: layout,
                before: before,
                after: after,
                subtitle: subtitle,
                action: action && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Button.Button, {
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
Snackbar.Basic = _Basic.Basic;

//# sourceMappingURL=Snackbar.js.map