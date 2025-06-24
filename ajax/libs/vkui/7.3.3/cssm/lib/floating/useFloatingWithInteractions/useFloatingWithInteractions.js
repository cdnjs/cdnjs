import * as React from "react";
import { debounce, noop } from "@vkontakte/vkjs";
import { getWindow, isHTMLElement } from "@vkontakte/vkui-floating-ui/utils/dom";
import { useCustomEnsuredControl } from "../../../hooks/useEnsuredControl.js";
import { useGlobalOnClickOutside } from "../../../hooks/useGlobalOnClickOutside.js";
import { useStableCallback } from "../../../hooks/useStableCallback.js";
import { contains, getActiveElementByAnotherElement } from "../../dom.js";
import { useIsomorphicLayoutEffect } from "../../useIsomorphicLayoutEffect.js";
import { autoUpdateFloatingElement, useFloating } from "../adapters.js";
import { convertFloatingDataToReactCSSProperties } from "../functions.js";
import { DEFAULT_TRIGGER } from "./constants.js";
import { useResolveTriggerType } from "./useResolveTriggerType.js";
const whileElementsMounted = (...args)=>/* istanbul ignore next: не знаю как проверить */ autoUpdateFloatingElement(...args, {
        elementResize: true
    });
/**
 * @private
 */ export const useFloatingWithInteractions = ({ trigger = DEFAULT_TRIGGER, // UseFloating
placement: placementProp = 'bottom', strategy: strategyProp = 'fixed', middlewares, hoverDelay = 0, closeAfterClick = false, // disables
disabled = false, disableInteractive = false, disableCloseOnClickOutside = false, disableCloseOnEscKey = false, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange: onShownChangeProp, onShownChanged: onShownChangedProp })=>{
    const memoizedValue = React.useMemo(()=>shownProp !== undefined ? {
            shown: shownProp
        } : undefined, [
        shownProp
    ]);
    const [shownLocalState, setShownLocalState] = useCustomEnsuredControl({
        value: memoizedValue,
        disabled,
        defaultValue: {
            shown: defaultShown
        },
        onChange: useStableCallback(({ shown, reason })=>{
            if (onShownChangeProp) {
                onShownChangeProp(shown, reason);
            }
        })
    });
    const onShownChanged = useStableCallback(onShownChangedProp ? onShownChangedProp : noop);
    const [shownFinalState, setShownFinalState] = React.useState(()=>shownLocalState.shown);
    const [willBeHide, setWillBeHide] = React.useState(false);
    const hasCSSAnimation = React.useRef(false);
    const blockMouseEnterRef = React.useRef(false);
    const blockFocusRef = React.useRef(false);
    const blurTimeoutRef = React.useRef(undefined);
    const handleCloseOnReferenceClickOutsideDisabled = disabled || disableCloseOnClickOutside || willBeHide || !shownLocalState.shown;
    const handleCloseOnFloatingClickOutsideDisabled = disableInteractive || handleCloseOnReferenceClickOutsideDisabled;
    const { triggerOnFocus, triggerOnClick, triggerOnHover } = useResolveTriggerType(trigger);
    // Библиотека `floating-ui`
    const { placement, x, y, strategy, refs, middlewareData } = useFloating({
        strategy: strategyProp,
        placement: placementProp,
        middleware: middlewares,
        whileElementsMounted
    });
    const commitShownLocalState = React.useCallback((nextShown, reason)=>{
        setShownLocalState((prevState)=>{
            if (prevState.shown !== nextShown || prevState.reason !== reason) {
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
    const showWithDelay = React.useMemo(()=>debounce(()=>commitShownLocalState(true, 'hover'), mouseEnterDelay), [
        mouseEnterDelay,
        commitShownLocalState
    ]);
    const hideWithDelay = React.useMemo(()=>debounce(()=>commitShownLocalState(false, 'hover'), mouseLeaveDelay), [
        mouseLeaveDelay,
        commitShownLocalState
    ]);
    const handleFocusOnReference = useStableCallback(()=>{
        // Повторный вызов события фокуса - следствие клика на reference-элемент
        if (shownLocalState.shown) {
            if (!closeAfterClick && shownLocalState.reason === 'hover') {
                return;
            }
            commitShownLocalState(false, 'focus');
            return;
        }
        if (blockFocusRef.current) {
            /* istanbul ignore next: в Jest не воспроизводится баг на вебе (cм. onRestoreFocus) */ blockFocusRef.current = false;
            return;
        }
        commitShownLocalState(true, 'focus');
    });
    const handleBlurOnReference = useStableCallback((event)=>{
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
            /* istanbul ignore if: не умеем симулировать уход из текущего окна */ if (!relatedTarget && getActiveElementByAnotherElement(reference) === reference) {
                /* istanbul ignore next */ return;
            }
            // Если пользователь нажал на всплывающий элемент, то не закрываем всплывающий элемент.
            // Note: для этого элемент должен быть фокусируемый (например, за счёт `tabindex="-1"`).
            if (contains(refs.floating.current, relatedTarget) || contains(reference, relatedTarget)) {
                return;
            }
            commitShownLocalState(false, 'focus');
        });
    });
    const handleClickOnReference = useStableCallback(()=>{
        // Предыдущий триггер (фокус) уже вызвал открытие/закрытие всплывающего окна, игнорируем вызов
        if (shownLocalState.reason === 'focus') {
            commitShownLocalState(shownLocalState.shown, 'click');
            return;
        }
        commitShownLocalState(!shownLocalState.shown, 'click');
    });
    const handleClickOnReferenceForOnlyClose = useStableCallback(()=>{
        blockMouseEnterRef.current = true;
        commitShownLocalState(false, 'click');
    });
    const handleMouseEnterOnBoth = useStableCallback((event)=>{
        if (willBeHide && event.currentTarget === refs.floating.current) {
            return;
        }
        showWithDelay.cancel();
        hideWithDelay.cancel();
        if (!blockMouseEnterRef.current && !shownLocalState.shown) {
            showWithDelay();
        }
    });
    const handleMouseLeaveOnBothForHoverAndFocusStates = useStableCallback((event)=>{
        if (willBeHide && event.currentTarget === refs.floating.current) {
            return;
        }
        blockFocusRef.current = false;
        blockMouseEnterRef.current = false;
        if (triggerOnHover) {
            showWithDelay.cancel();
            hideWithDelay.cancel();
            hideWithDelay();
        }
    });
    const handleFloatingAnimationStart = ()=>{
        hasCSSAnimation.current = true;
    };
    const handleFloatingAnimationEnd = ()=>{
        if (willBeHide) {
            setShownFinalState(false);
            setWillBeHide(false);
            onShownChanged(false, shownLocalState.reason);
        }
    };
    const handleOnClose = React.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'callback');
    }, [
        commitShownLocalState
    ]);
    const handleRestoreFocus = React.useCallback((restoreFocus = true)=>{
        if (!restoreFocus) {
            return false;
        }
        if (restoreFocus === true) {
            return triggerOnFocus ? blockFocusRef.current : true;
        } else if (restoreFocus === 'anchor-element') {
            return refs.reference.current;
        } else if (restoreFocus instanceof HTMLElement) {
            return restoreFocus;
        }
        return false;
    }, [
        refs.reference,
        triggerOnFocus
    ]);
    const handleEscapeKeyDown = React.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'escape-key');
    }, [
        commitShownLocalState
    ]);
    const handleClickOutside = React.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'click-outside');
    }, [
        commitShownLocalState
    ]);
    useGlobalOnClickOutside(handleClickOutside, handleCloseOnReferenceClickOutsideDisabled ? null : refs.reference, handleCloseOnFloatingClickOutsideDisabled ? null : refs.floating);
    useIsomorphicLayoutEffect(/**
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
            /* istanbul ignore if: не умеем симулировать уход из текущего окна */ if (!shownLocalState.shown && isHTMLElement(reference) && reference === getActiveElementByAnotherElement(reference)) {
                /* istanbul ignore next */ blockFocusRef.current = true;
            }
        };
        const win = getWindow(refs.reference.current);
        win.addEventListener('blur', handleGlobalBlur);
        return ()=>{
            win.removeEventListener('blur', handleGlobalBlur);
        };
    }, [
        triggerOnFocus,
        refs.reference,
        shownLocalState
    ]);
    useIsomorphicLayoutEffect(function resolveShownStates() {
        if (willBeHide || shownLocalState.shown === shownFinalState) {
            return;
        }
        if (shownLocalState.shown) {
            setShownFinalState(true);
            onShownChanged(true, shownLocalState.reason);
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
        willBeHide,
        onShownChanged
    ]);
    const referencePropsRef = React.useRef({});
    const floatingPropsRef = React.useRef({
        style: {}
    });
    useIsomorphicLayoutEffect(()=>{
        referencePropsRef.current = {};
    }, [
        triggerOnHover,
        triggerOnFocus,
        triggerOnClick
    ]);
    if (shownFinalState) {
        floatingPropsRef.current.style = convertFloatingDataToReactCSSProperties({
            strategy,
            x,
            y,
            middlewareData
        });
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