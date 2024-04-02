import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { callMultiple } from '../../lib/callMultiple';
import { mergeCalls } from '../../lib/mergeCalls';
import { useStateWithDelay } from './useStateWithDelay';
export const DEFAULT_ACTIVE_EFFECT_DELAY = 600;
export const ACTIVE_DELAY = 70;
/**
 * Управляет наведением на компонент, игнорирует тач события
 */ function useHover({ hovered, hoverClassName, hasHover = true }) {
    const [hoveredState, setHover] = React.useState(false);
    const hover = hasHover && (hovered || hoveredState) ? hoverClassName : undefined;
    const onPointerEnter = (e)=>{
        if (e.pointerType === 'touch') {
            return;
        }
        setHover(true);
    };
    const onPointerLeave = ()=>{
        setHover(false);
    };
    return {
        hover,
        onPointerEnter: hasHover ? onPointerEnter : noop,
        onPointerLeave: hasHover ? onPointerLeave : noop
    };
}
/**
 * Управляет активацией компонента
 */ function useActive({ activated, activeClassName, activeEffectDelay, hasActive = true }) {
    const [activatedState, setActivated] = useStateWithDelay(false);
    // Список нажатий которые не требуется отменять
    const pointersUp = React.useMemo(()=>new Set(), []);
    const active = hasActive && (activated || activatedState) ? activeClassName : undefined;
    const onPointerDown = ()=>setActivated(true, ACTIVE_DELAY);
    const onPointerCancel = (e)=>{
        if (pointersUp.has(e.pointerId)) {
            pointersUp.delete(e.pointerId);
            return;
        }
        setActivated(false);
    };
    const onPointerUp = (e)=>{
        pointersUp.add(e.pointerId);
        setActivated(true);
        setActivated(false, activeEffectDelay);
    };
    return {
        active,
        onPointerLeave: hasActive ? onPointerCancel : noop,
        onPointerDown: hasActive ? onPointerDown : noop,
        onPointerCancel: hasActive ? onPointerCancel : noop,
        onPointerUp: hasActive ? onPointerUp : noop
    };
}
export const ClickableLockStateContext = /*#__PURE__*/ React.createContext(undefined);
/**
 * Блокирует стейт на всплытие
 */ export function useLockState() {
    const setLockBubbling = React.useContext(ClickableLockStateContext) || noop;
    const [lockState, setLockState] = React.useState(false);
    const setLockBubblingImmediate = callMultiple(setLockState, setLockBubbling);
    return [
        lockState,
        setLockBubbling,
        setLockBubblingImmediate
    ];
}
/**
 * Управляет состоянием компонента
 */ export function useState(_param) {
    var { hasHover, hasActive } = _param, restProps = _object_without_properties(_param, [
        "hasHover",
        "hasActive"
    ]);
    const [lockState, setLockBubbling, setLockBubblingImmediate] = useLockState();
    const props = _object_spread({
        hasHover: hasHover && !lockState,
        hasActive: hasActive && !lockState
    }, restProps);
    const _useHover = useHover(_object_spread({}, props)), { hover } = _useHover, hoverEvent = _object_without_properties(_useHover, [
        "hover"
    ]);
    const _useActive = useActive(props), { active } = _useActive, activeEvent = _object_without_properties(_useActive, [
        "active"
    ]);
    const stateClassName = classNames(hover, active);
    const handlers = mergeCalls(hoverEvent, activeEvent);
    React.useEffect(()=>{
        setLockBubbling(!!stateClassName);
    }, [
        setLockBubbling,
        stateClassName
    ]);
    return _object_spread({
        stateClassName,
        setLockBubblingImmediate
    }, handlers);
}

//# sourceMappingURL=useState.js.map