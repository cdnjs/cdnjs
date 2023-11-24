import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import mitt from 'mitt';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { shouldTriggerClickOnEnterOrSpace } from '../../lib/accessibility';
import { SizeType } from '../../lib/adaptivity';
import { callMultiple } from '../../lib/callMultiple';
import { getOffsetRect } from '../../lib/offset';
import { Platform } from '../../lib/platform';
import { coordX, coordY } from '../../lib/touch';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { Touch } from '../Touch/Touch';
import TouchRootContext from '../Touch/TouchContext';
import styles from './Tappable.module.css';
const sizeXClassNames = {
    none: styles['Tappable--sizeX-none'],
    compact: styles['Tappable--sizeX-compact']
};
const stylesHoverMode = {
    background: styles['Tappable--hover-background'],
    opacity: styles['Tappable--hover-opacity']
};
const stylesActiveMode = {
    background: styles['Tappable--active-background'],
    opacity: styles['Tappable--active-opacity']
};
const WAVE_LIVE = 225;
export const ACTIVE_DELAY = 70;
export const ACTIVE_EFFECT_DELAY = 600;
const activeBus = mitt();
const TapState = {
    none: 0,
    pending: 1,
    active: 2,
    exiting: 3
};
const TappableContext = /*#__PURE__*/ React.createContext({
    onHoverChange: noop
});
function isPresetStateMode(stateMode) {
    switch(stateMode){
        case 'opacity':
        case 'background':
            return true;
        default:
            return false;
    }
}
function useActivity(hasActive, stopDelay) {
    const id = React.useMemo(()=>Math.round(Math.random() * 1e8).toString(16), []);
    const [activity, setActivity] = React.useState(TapState.none);
    const _stop = ()=>setActivity(TapState.none);
    const start = ()=>hasActive && setActivity(TapState.active);
    const delayStart = ()=>{
        hasActive && setActivity(TapState.pending);
    };
    const activeTimeout = useTimeout(start, ACTIVE_DELAY);
    const stopTimeout = useTimeout(_stop, stopDelay);
    useIsomorphicLayoutEffect(()=>{
        if (activity === TapState.pending) {
            activeTimeout.set();
            return activeTimeout.clear;
        }
        if (activity === TapState.exiting) {
            return stopTimeout.clear;
        }
        if (activity === TapState.active) {
            activeBus.emit('active', id);
        }
        return noop;
    }, [
        activity
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (activity === TapState.none) {
            return noop;
        }
        const onActiveChange = (activeId)=>{
            activeId !== id && _stop();
        };
        activeBus.on('active', onActiveChange);
        return ()=>activeBus.off('active', onActiveChange);
    }, [
        activity === TapState.none
    ]);
    useIsomorphicLayoutEffect(()=>{
        !hasActive && _stop();
    }, [
        hasActive
    ]);
    const stop = (delay)=>{
        if (delay) {
            setActivity(TapState.exiting);
            return stopTimeout.set(delay);
        }
        _stop();
    };
    return [
        activity,
        {
            delayStart,
            start,
            stop
        }
    ];
}
/**
 * @see https://vkcom.github.io/VKUI/#/Tappable
 */ export const Tappable = ({ children, Component, onClick, onKeyDown: _onKeyDown, activeEffectDelay = ACTIVE_EFFECT_DELAY, stopPropagation = false, getRootRef, hasHover: _hasHover = true, hoverMode = 'background', hasActive: _hasActive = true, activeMode = 'background', focusVisibleMode = 'inside', onEnter, onLeave, className, hovered: hoveredProp, activated: activatedProp, borderRadiusMode = 'auto', ...props })=>{
    Component = Component || (props.href ? 'a' : 'div');
    const { onHoverChange } = React.useContext(TappableContext);
    const insideTouchRoot = React.useContext(TouchRootContext);
    const platform = usePlatform();
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const { sizeX = 'none', hasHover: hasHoverContext = true } = useAdaptivity();
    const hasPointerContext = useAdaptivityHasPointer();
    const [clicks, setClicks] = React.useState([]);
    const [childHover, setChildHover] = React.useState(false);
    const { value: _hovered, setTrue: setHoveredTrue, setFalse: setHoveredFalse } = useBooleanState(false);
    const hovered = (_hovered || hoveredProp) && !props.disabled;
    const hasActive = _hasActive && !childHover && !props.disabled;
    const hasHover = hasHoverContext && _hasHover && !childHover;
    const isCustomElement = Component !== 'a' && Component !== 'button' && Component !== 'label' && !props.contentEditable;
    const isPresetHoverMode = isPresetStateMode(hoverMode);
    const isPresetActiveMode = isPresetStateMode(activeMode);
    const [activity, { start, stop, delayStart }] = useActivity(hasActive, activeEffectDelay);
    const active = activity === TapState.active || activity === TapState.exiting;
    const activated = (active || activatedProp) && !props.disabled;
    const containerRef = useExternRef(getRootRef);
    // hover propagation
    const childContext = React.useRef({
        onHoverChange: setChildHover
    }).current;
    useIsomorphicLayoutEffect(()=>{
        if (!hovered) {
            return noop;
        }
        onHoverChange(true);
        return ()=>onHoverChange(false);
    }, [
        hovered
    ]);
    /*
   * [a11y]
   * Обрабатывает событие onkeydown
   * для кастомных доступных элементов:
   * - role="link" (активация по Enter)
   * - role="button" (активация по Space и Enter)
   */ function onKeyDown(e) {
        if (isCustomElement && shouldTriggerClickOnEnterOrSpace(e)) {
            e.preventDefault();
            containerRef.current?.click();
        }
    }
    const needWaves = platform === Platform.ANDROID && !hasPointerContext && hasActive && activeMode === 'background';
    const clearClicks = useTimeout(()=>setClicks([]), WAVE_LIVE);
    function addClick(x, y) {
        const dateNow = Date.now();
        const filteredClicks = clicks.filter((click)=>click.id + WAVE_LIVE > dateNow);
        setClicks([
            ...filteredClicks,
            {
                x,
                y,
                id: dateNow
            }
        ]);
        clearClicks.set();
    }
    function onStart({ originalEvent }) {
        if (hasActive) {
            if (originalEvent.touches && originalEvent.touches.length > 1) {
                // r сожалению я так и не понял, что это делает и можно ли упихнуть его в Touch
                return stop();
            }
            if (needWaves) {
                const { top, left } = getOffsetRect(containerRef.current);
                const x = coordX(originalEvent) - (left ?? 0);
                const y = coordY(originalEvent) - (top ?? 0);
                addClick(x, y);
            }
            delayStart();
        }
    }
    function onMove({ isSlide }) {
        if (isSlide) {
            stop();
        }
    }
    function onEnd({ duration }) {
        if (activity === TapState.none) {
            return;
        }
        if (activity === TapState.pending) {
            // активировать при коротком тапе
            start();
        }
        // отключить без задержки при длинном тапе
        const activeDuration = duration - ACTIVE_DELAY;
        stop(activeDuration >= 100 ? 0 : activeEffectDelay - activeDuration);
    }
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: !props.disabled && focusVisible,
        mode: focusVisibleMode
    });
    const classes = classNames(className, styles['Tappable'], 'vkuiInternalTappable', platform === Platform.IOS && styles['Tappable--ios'], sizeX !== SizeType.REGULAR && sizeXClassNames[sizeX], hasHover && styles['Tappable--hasHover'], hasActive && styles['Tappable--hasActive'], hasHover && hovered && !isPresetHoverMode && hoverMode, hasActive && activated && !isPresetActiveMode && activeMode, hasHover && hovered && isPresetHoverMode && stylesHoverMode[hoverMode], hasActive && activated && isPresetActiveMode && stylesActiveMode[activeMode], borderRadiusMode === 'inherit' && styles['Tappable--borderRadiusInherit'], focusVisibleClassNames);
    const handlers = {
        onStart: callMultiple(onStart, props.onStart),
        onMove: callMultiple(onMove, props.onMove),
        onEnd: callMultiple(onEnd, props.onEnd),
        onClick,
        onKeyDown: callMultiple(onKeyDown, _onKeyDown)
    };
    const role = props.href ? 'link' : 'button';
    return /*#__PURE__*/ React.createElement(Touch, {
        onEnter: callMultiple(setHoveredTrue, onEnter),
        onLeave: callMultiple(setHoveredFalse, onLeave),
        type: Component === 'button' ? 'button' : undefined,
        tabIndex: isCustomElement && !props.disabled ? 0 : undefined,
        role: isCustomElement ? role : undefined,
        "aria-disabled": isCustomElement ? props.disabled : undefined,
        stopPropagation: stopPropagation && !insideTouchRoot && !props.disabled,
        ...props,
        slideThreshold: 20,
        usePointerHover: true,
        className: classes,
        Component: Component,
        getRootRef: containerRef,
        onBlur: callMultiple(onBlur, props.onBlur),
        onFocus: callMultiple(onFocus, props.onFocus),
        ...props.disabled ? {} : handlers
    }, /*#__PURE__*/ React.createElement(TappableContext.Provider, {
        value: childContext
    }, children), needWaves && /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: styles.Tappable__waves
    }, clicks.map((wave)=>/*#__PURE__*/ React.createElement("span", {
            key: wave.id,
            className: styles.Tappable__wave,
            style: {
                top: wave.y,
                left: wave.x
            }
        }))), (hasHover && hoverMode === 'background' || hasActive && activeMode === 'background') && /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: styles.Tappable__stateLayer
    }));
};

//# sourceMappingURL=Tappable.js.map