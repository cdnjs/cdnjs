import * as React from 'react';
import { debounce } from '@vkontakte/vkjs';
import { getWindow, isHTMLElement } from '@vkontakte/vkui-floating-ui/utils/dom';
import { useCustomEnsuredControl } from '../../../hooks/useEnsuredControl';
import { useGlobalOnClickOutside } from '../../../hooks/useGlobalOnClickOutside';
import { useStableCallback } from '../../../hooks/useStableCallback';
import { contains, getActiveElementByAnotherElement } from '../../dom';
import { useIsomorphicLayoutEffect } from '../../useIsomorphicLayoutEffect';
import { autoUpdateFloatingElement, useFloating } from '../adapters';
import { convertFloatingDataToReactCSSProperties } from '../functions';
import { DEFAULT_TRIGGER } from './constants';
import { useResolveTriggerType } from './useResolveTriggerType';
const whileElementsMounted = (...args)=>/* istanbul ignore next: не знаю как проверить */ autoUpdateFloatingElement(...args, {
        elementResize: true
    });
/**
 * @private
 */ export const useFloatingWithInteractions = ({ trigger = DEFAULT_TRIGGER, // UseFloating
placement: placementProp = 'bottom', middlewares, hoverDelay = 0, closeAfterClick = false, // disables
disabled = false, disableInteractive = false, disableCloseOnClickOutside = false, disableCloseOnEscKey = false, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange: onShownChangeProp })=>{
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
    const [shownFinalState, setShownFinalState] = React.useState(()=>shownLocalState.shown);
    const [willBeHide, setWillBeHide] = React.useState(false);
    const hasCSSAnimation = React.useRef(false);
    const blockMouseEnterRef = React.useRef(false);
    const blockFocusRef = React.useRef(false);
    const blurTimeoutRef = React.useRef();
    const handleCloseOnReferenceClickOutsideDisabled = disabled || disableCloseOnClickOutside || willBeHide || !shownLocalState.shown;
    const handleCloseOnFloatingClickOutsideDisabled = disableInteractive || handleCloseOnReferenceClickOutsideDisabled;
    const { triggerOnFocus, triggerOnClick, triggerOnHover } = useResolveTriggerType(trigger);
    // Библиотека `floating-ui`
    const { placement, x, y, strategy, refs, middlewareData } = useFloating({
        strategy: 'fixed',
        placement: placementProp,
        middleware: middlewares,
        whileElementsMounted
    });
    const commitShownLocalState = React.useCallback((nextShown, reason)=>{
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
    const showWithDelay = React.useMemo(()=>debounce(()=>commitShownLocalState(true, 'hover'), mouseEnterDelay), [
        mouseEnterDelay,
        commitShownLocalState
    ]);
    const hideWithDelay = React.useMemo(()=>debounce(()=>commitShownLocalState(false, 'hover'), mouseLeaveDelay), [
        mouseLeaveDelay,
        commitShownLocalState
    ]);
    const handleFocusOnReference = useStableCallback(()=>{
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
        commitShownLocalState(!shownLocalState.shown, 'click');
    });
    const handleClickOnReferenceForOnlyClose = useStableCallback(()=>{
        blockMouseEnterRef.current = true;
        commitShownLocalState(false, 'click');
    });
    const handleMouseEnterOnBoth = useStableCallback(()=>{
        showWithDelay.cancel();
        hideWithDelay.cancel();
        if (!blockMouseEnterRef.current && !shownLocalState.shown) {
            showWithDelay();
        }
    });
    const handleMouseLeaveOnBothForHoverAndFocusStates = useStableCallback(()=>{
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
    const handleOnClose = React.useCallback(()=>{
        blockFocusRef.current = true;
        commitShownLocalState(false, 'callback');
    }, [
        commitShownLocalState
    ]);
    const handleRestoreFocus = React.useCallback(()=>triggerOnFocus ? blockFocusRef.current : true, [
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
    const referencePropsRef = React.useRef({});
    const floatingPropsRef = React.useRef({
        style: {}
    });
    if (shownFinalState) {
        floatingPropsRef.current.style = convertFloatingDataToReactCSSProperties(strategy, x, y, undefined, middlewareData);
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