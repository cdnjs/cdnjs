import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { useStateWithDelay } from "./useStateWithDelay.js";
export const DEFAULT_ACTIVE_EFFECT_DELAY = 600;
const ACTIVE_DELAY = 70;
/**
 * Управляет наведением на компонент, игнорирует тач события
 */ function useHover({ hovered, hasHover = true, lockState, setParentStateLock }) {
    const [hoveredStateLocal, setHoveredStateLocal] = React.useState(false);
    const prevIsHoveredRef = React.useRef(undefined);
    const handleHover = React.useCallback((isHover)=>{
        setHoveredStateLocal(isHover);
        const isHovered = hovered ?? calculateStateValue({
            hasState: hasHover,
            isLocked: lockState,
            stateValueLocal: isHover
        });
        // проверка сделана чтобы реже вызывать обновление состояния
        // контекста родителя
        if (isHovered !== prevIsHoveredRef.current) {
            prevIsHoveredRef.current = isHovered;
            setParentStateLock(isHovered);
        }
    }, [
        setParentStateLock,
        hasHover,
        hovered,
        lockState
    ]);
    const onPointerEnter = (e)=>{
        if (e.pointerType === 'touch') {
            return;
        }
        handleHover(true);
    };
    const onPointerLeave = ()=>{
        handleHover(false);
    };
    const isHovered = hovered ?? calculateStateValue({
        hasState: hasHover,
        isLocked: lockState,
        stateValueLocal: hoveredStateLocal
    });
    return {
        isHovered,
        onPointerEnter: hasHover ? onPointerEnter : noop,
        onPointerLeave: hasHover ? onPointerLeave : noop
    };
}
/**
 * Управляет активацией компонента
 */ function useActive({ activated, activeEffectDelay, hasActive = true, lockStateRef, setParentStateLock }) {
    // передаём setParentStateLock, чтобы функция вызывалась вместе с установкой стейта,
    // если установка отложена c помощью delay, то и вызов будет отложен
    const [activatedState, setActivated] = useStateWithDelay(false, 0, setParentStateLock);
    // Список нажатий которые не требуется отменять
    const pointersUp = React.useMemo(()=>new Set(), []);
    const onPointerDown = ()=>{
        if (lockStateRef.current) {
            return;
        }
        setActivated(true, ACTIVE_DELAY);
        // намеренно выставляем lock, так как setActivated вызов отложен
        // а у отложенного setActivated setParentStateLock тоже вызовится отложенно
        // родитель сейчас тоже обработает это же событие PointerDown
        // если мы не залочим activatedState у родителя сейчас, то родитель выставит active состояние
        setParentStateLock(true);
    };
    const onPointerCancel = (e)=>{
        if (pointersUp.has(e.pointerId)) {
            pointersUp.delete(e.pointerId);
            return;
        }
        setActivated(false);
    };
    const onPointerUp = (e)=>{
        pointersUp.add(e.pointerId);
        if (lockStateRef.current) {
            return;
        }
        setActivated(true);
        setActivated(false, activeEffectDelay);
    };
    const isActivated = activated ?? calculateStateValue({
        hasState: hasActive,
        isLocked: lockStateRef.current,
        stateValueLocal: activatedState
    });
    return {
        isActivated,
        onPointerLeave: hasActive ? onPointerCancel : noop,
        onPointerDown: hasActive ? onPointerDown : noop,
        onPointerCancel: hasActive ? onPointerCancel : noop,
        onPointerUp: hasActive ? onPointerUp : noop
    };
}
export const ClickableLockStateContext = /*#__PURE__*/ React.createContext({
    lockHoverStateBubbling: undefined,
    lockActiveStateBubbling: undefined
});
/**
 * Блокирует стейт на всплытие
 */ function useLockState(setParentStateLockBubbling) {
    const [lockState, setLockState] = React.useState(false);
    const setStateLockBubblingImmediate = React.useCallback((isLock)=>{
        setLockState(isLock);
        setParentStateLockBubbling(isLock);
    }, [
        setParentStateLockBubbling
    ]);
    return [
        lockState,
        setParentStateLockBubbling,
        setStateLockBubblingImmediate
    ];
}
function useLockRef(setParentStateLockBubbling) {
    const lockStateRef = React.useRef(false);
    const setStateLockBubblingImmediate = React.useCallback((isLock)=>{
        lockStateRef.current = isLock;
        setParentStateLockBubbling(isLock);
    }, [
        setParentStateLockBubbling
    ]);
    return [
        lockStateRef,
        setParentStateLockBubbling,
        setStateLockBubblingImmediate
    ];
}
/**
 * Управляет состоянием компонента
 */ export function useState({ hovered, hasHover, activated, hasActive, activeEffectDelay, unlockParentHover, hoverClassName, activeClassName }) {
    const { lockHoverStateBubbling = noop, lockActiveStateBubbling = noop } = React.useContext(ClickableLockStateContext);
    const [lockHoverState, setParentStateLockHoverBubbling, setLockHoverBubblingImmediate] = useLockState(unlockParentHover ? noop : lockHoverStateBubbling);
    const [lockActiveStateRef, setParentStateLockActiveBubbling, setLockActiveBubblingImmediate] = useLockRef(lockActiveStateBubbling);
    const { isHovered, ...hoverEvent } = useHover({
        hasHover,
        hovered,
        lockState: lockHoverState,
        setParentStateLock: setParentStateLockHoverBubbling
    });
    const { isActivated, ...activeEvent } = useActive({
        activated,
        hasActive,
        activeEffectDelay,
        lockStateRef: lockActiveStateRef,
        setParentStateLock: setParentStateLockActiveBubbling
    });
    const stateClassName = classNames(isHovered && hoverClassName, isActivated && activeClassName);
    const handlers = mergeCalls(hoverEvent, activeEvent);
    return {
        stateClassName,
        setLockHoverBubblingImmediate,
        setLockActiveBubblingImmediate,
        ...handlers
    };
}
// Общая функция для определения конечного состояния active/hovered
function calculateStateValue({ hasState, isLocked, stateValueLocal }) {
    return hasState && !isLocked && stateValueLocal;
}

//# sourceMappingURL=useState.js.map