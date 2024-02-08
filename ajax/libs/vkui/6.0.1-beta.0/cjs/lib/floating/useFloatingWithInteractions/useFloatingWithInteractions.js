"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useFloatingWithInteractions", {
    enumerable: true,
    get: function() {
        return useFloatingWithInteractions;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("@vkontakte/vkui-floating-ui/utils/dom");
const _useEnsuredControl = require("../../../hooks/useEnsuredControl");
const _useGlobalOnClickOutside = require("../../../hooks/useGlobalOnClickOutside");
const _useStableCallback = require("../../../hooks/useStableCallback");
const _dom1 = require("../../dom");
const _useIsomorphicLayoutEffect = require("../../useIsomorphicLayoutEffect");
const _adapters = require("../adapters");
const _functions = require("../functions");
const _constants = require("./constants");
const _useResolveTriggerType = require("./useResolveTriggerType");
const whileElementsMounted = (...args)=>/* istanbul ignore next: не знаю как проверить */ (0, _adapters.autoUpdateFloatingElement)(...args, {
        elementResize: true
    });
const useFloatingWithInteractions = ({ trigger = _constants.DEFAULT_TRIGGER, // UseFloating
placement: placementProp = 'bottom', middlewares, hoverDelay = 0, closeAfterClick = false, // disables
disabled = false, disableInteractive = false, disableCloseOnClickOutside = false, disableCloseOnEscKey = false, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange: onShownChangeProp })=>{
    const memoizedValue = _react.useMemo(()=>shownProp !== undefined ? {
            shown: shownProp
        } : undefined, [
        shownProp
    ]);
    const [shownLocalState, setShownLocalState] = (0, _useEnsuredControl.useCustomEnsuredControl)({
        value: memoizedValue,
        disabled,
        defaultValue: {
            shown: defaultShown
        },
        onChange: (0, _useStableCallback.useStableCallback)(({ shown, reason })=>{
            if (onShownChangeProp) {
                onShownChangeProp(shown, reason);
            }
        })
    });
    const [shownFinalState, setShownFinalState] = _react.useState(()=>shownLocalState.shown);
    const [willBeHide, setWillBeHide] = _react.useState(false);
    const hasCSSAnimation = _react.useRef(false);
    const blockMouseEnterRef = _react.useRef(false);
    const blockFocusRef = _react.useRef(false);
    const blurTimeoutRef = _react.useRef();
    const handleCloseOnReferenceClickOutsideDisabled = disabled || disableCloseOnClickOutside || willBeHide || !shownLocalState.shown;
    const handleCloseOnFloatingClickOutsideDisabled = disableInteractive || handleCloseOnReferenceClickOutsideDisabled;
    const { triggerOnFocus, triggerOnClick, triggerOnHover } = (0, _useResolveTriggerType.useResolveTriggerType)(trigger);
    // Библиотека `floating-ui`
    const { placement, x, y, strategy, refs, middlewareData } = (0, _adapters.useFloating)({
        strategy: 'fixed',
        placement: placementProp,
        middleware: middlewares,
        whileElementsMounted
    });
    const commitShownLocalState = _react.useCallback((nextShown, reason)=>{
        setShownLocalState((prevState)=>{
            if (prevState.shown !== nextShown) {
                return {
                    shown: nextShown,
                    reason
                };
            }
            /* istanbul ignore next: страховка, если вдруг на момент вызова обновления состояния, оно уже будет актуальным */ return prevState;
        });
    }, [
        setShownLocalState
    ]);
    const [mouseEnterDelay, mouseLeaveDelay] = typeof hoverDelay === 'number' ? [
        hoverDelay,
        hoverDelay
    ] : hoverDelay;
    const showWithDelay = _react.useMemo(()=>(0, _vkjs.debounce)(()=>commitShownLocalState(true, 'hover'), mouseEnterDelay), [
        mouseEnterDelay,
        commitShownLocalState
    ]);
    const hideWithDelay = _react.useMemo(()=>(0, _vkjs.debounce)(()=>commitShownLocalState(false, 'hover'), mouseLeaveDelay), [
        mouseLeaveDelay,
        commitShownLocalState
    ]);
    const handleFocusOnReference = (0, _useStableCallback.useStableCallback)(()=>{
        if (blockFocusRef.current) {
            /* istanbul ignore next: в Jest не воспроизводится баг на вебе (cм. onRestoreFocus) */ blockFocusRef.current = false;
            return;
        }
        commitShownLocalState(true, 'focus');
    });
    const handleBlurOnReference = (0, _useStableCallback.useStableCallback)((event)=>{
        blockFocusRef.current = false;
        blockMouseEnterRef.current = false;
        if (!shownLocalState.shown) {
            clearTimeout(blurTimeoutRef.current);
            return;
        }
        const relatedTarget = event.relatedTarget;
        blurTimeoutRef.current = setTimeout(function waitWindowBlurFire() {
            const reference = refs.reference.current;
            // Если пользователь покинул текущее окно в открытом состоянии, то
            // не закрываем всплывающий элемент.
            /* istanbul ignore if: не умеем симулировать уход из текущего окна */ if (!relatedTarget && (0, _dom1.getActiveElementByAnotherElement)(reference) === reference) {
                /* istanbul ignore next */ return;
            }
            // Если пользователь нажал на всплывающий элемент, то не закрываем всплывающий элемент.
            // Note: для этого элемент должен быть фокусируемый (например, за счёт `tabindex="-1"`).
            if ((0, _dom1.contains)(refs.floating.current, relatedTarget) || (0, _dom1.contains)(reference, relatedTarget)) {
                return;
            }
            commitShownLocalState(false, 'focus');
        });
    });
    const handleClickOnReference = (0, _useStableCallback.useStableCallback)(()=>{
        commitShownLocalState(!shownLocalState.shown, 'click');
    });
    const handleClickOnReferenceForOnlyClose = (0, _useStableCallback.useStableCallback)(()=>{
        blockMouseEnterRef.current = true;
        commitShownLocalState(false, 'click');
    });
    const handleMouseEnterOnBoth = (0, _useStableCallback.useStableCallback)(()=>{
        showWithDelay.cancel();
        hideWithDelay.cancel();
        if (!blockMouseEnterRef.current && !shownLocalState.shown) {
            showWithDelay();
        }
    });
    const handleMouseLeaveOnBothForHoverAndFocusStates = (0, _useStableCallback.useStableCallback)(()=>{
        blockFocusRef.current = false;
        blockMouseEnterRef.current = false;
        if (triggerOnHover) {
            showWithDelay.cancel();
            hideWithDelay.cancel();
            if (shownLocalState.reason !== 'focus' && shownLocalState.reason !== 'click') {
                hideWithDelay();
            }
        }
    });
    const handleFloatingAnimationStart = ()=>{
        hasCSSAnimation.current = true;
    };
    const handleFloatingAnimationEnd = ()=>{
        if (willBeHide) {
            setShownFinalState(false);
            setWillBeHide(false);
        }
    };
    const handleOnClose = _react.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'callback');
    }, [
        commitShownLocalState
    ]);
    const handleRestoreFocus = _react.useCallback(()=>triggerOnFocus ? blockFocusRef.current : true, [
        triggerOnFocus
    ]);
    const handleEscapeKeyDown = _react.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'escape-key');
    }, [
        commitShownLocalState
    ]);
    const handleClickOutside = _react.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'click-outside');
    }, [
        commitShownLocalState
    ]);
    (0, _useGlobalOnClickOutside.useGlobalOnClickOutside)(handleClickOutside, handleCloseOnReferenceClickOutsideDisabled ? null : refs.reference, handleCloseOnFloatingClickOutsideDisabled ? null : refs.floating);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(/**
     * Если пользователь покинул активное окно и:
     * 1. целевой элемент был в состоянии фокуса;
     * 2. всплывающий элемент был закрытом состоянии;
     * то фокус должен быть заблокирован, когда пользователь вернётся обратно. Иначе покажется
     * всплывающий элемент.
     */ function setGlobalBlurForTriggerOnFocus() {
        if (!triggerOnFocus || !refs.reference.current) {
            return;
        }
        const handleGlobalBlur = ()=>{
            /* istanbul ignore next */ const reference = refs.reference.current;
            /* istanbul ignore if: не умеем симулировать уход из текущего окна */ if (!shownLocalState.shown && (0, _dom.isHTMLElement)(reference) && reference === (0, _dom1.getActiveElementByAnotherElement)(reference)) {
                /* istanbul ignore next */ blockFocusRef.current = true;
            }
        };
        const win = (0, _dom.getWindow)(refs.reference.current);
        win.addEventListener('blur', handleGlobalBlur);
        return ()=>{
            win.removeEventListener('blur', handleGlobalBlur);
        };
    }, [
        triggerOnFocus,
        refs.reference,
        shownLocalState
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function resolveShownStates() {
        if (willBeHide || shownLocalState.shown === shownFinalState) {
            return;
        }
        if (shownLocalState.shown) {
            setShownFinalState(true);
        } else if (hasCSSAnimation.current && !willBeHide) {
            setWillBeHide(true);
        } else {
            setShownFinalState(false);
        }
        return ()=>{
            clearTimeout(blurTimeoutRef.current);
        };
    }, [
        shownLocalState,
        shownFinalState,
        willBeHide
    ]);
    const referencePropsRef = _react.useRef({});
    const floatingPropsRef = _react.useRef({
        style: {}
    });
    if (shownFinalState) {
        floatingPropsRef.current.style = (0, _functions.convertFloatingDataToReactCSSProperties)(strategy, x, y, undefined, middlewareData);
        if (disableInteractive) {
            floatingPropsRef.current.style.pointerEvents = 'none';
        }
    }
    if (triggerOnFocus) {
        referencePropsRef.current.onFocus = handleFocusOnReference;
        referencePropsRef.current.onBlur = handleBlurOnReference;
    }
    if (triggerOnClick) {
        referencePropsRef.current.onClick = handleClickOnReference;
    }
    if (triggerOnHover) {
        referencePropsRef.current.onMouseOver = handleMouseEnterOnBoth;
        if (closeAfterClick && !triggerOnClick) {
            referencePropsRef.current.onClick = handleClickOnReferenceForOnlyClose;
        }
        if (!disableInteractive) {
            floatingPropsRef.current.onMouseOver = handleMouseEnterOnBoth;
        }
    }
    if (triggerOnHover || triggerOnFocus) {
        referencePropsRef.current.onMouseLeave = handleMouseLeaveOnBothForHoverAndFocusStates;
        if (!disableInteractive) {
            floatingPropsRef.current.onMouseLeave = handleMouseLeaveOnBothForHoverAndFocusStates;
        }
    }
    if (shownFinalState) {
        floatingPropsRef.current.onAnimationStart = handleFloatingAnimationStart;
        floatingPropsRef.current.onAnimationEnd = handleFloatingAnimationEnd;
    }
    return {
        placement,
        shown: shownFinalState,
        willBeHide,
        refs,
        referenceProps: referencePropsRef.current,
        floatingProps: floatingPropsRef.current,
        middlewareData,
        onClose: handleOnClose,
        // FocusTrap уже определяет нажатие на ESC, поэтому название события содержит конкретный код
        // кнопки вместо просто onKeyDown.
        onEscapeKeyDown: !shownFinalState || disableCloseOnEscKey ? undefined : handleEscapeKeyDown,
        // [Обход баги с FocusTrap]
        //
        // Если сфокусироваться на целевой элемент через нажатие, а потом нажать в область за пределами
        // целевого и всплывающего элемента, то появляется моргание из-за того, что FocusTrap
        // восстанавливает фокус, из-за чего всплывающий элемент снова показывается за счёт
        // `handleFocusOnReference`, а потом скрывается за счёт `handleBlurOnReference`.
        onRestoreFocus: handleRestoreFocus
    };
};

//# sourceMappingURL=useFloatingWithInteractions.js.map