"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ClickableLockStateContext: function() {
        return ClickableLockStateContext;
    },
    DEFAULT_ACTIVE_EFFECT_DELAY: function() {
        return DEFAULT_ACTIVE_EFFECT_DELAY;
    },
    useState: function() {
        return useState;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _mergeCalls = require("../../lib/mergeCalls");
const _useStateWithDelay = require("./useStateWithDelay");
const DEFAULT_ACTIVE_EFFECT_DELAY = 600;
const ACTIVE_DELAY = 70;
/**
 * Управляет наведением на компонент, игнорирует тач события
 */ function useHover({ hovered, hasHover = true, lockState, setParentStateLock }) {
    const [hoveredStateLocal, setHoveredStateLocal] = _react.useState(false);
    const prevIsHoveredRef = _react.useRef(undefined);
    const handleHover = _react.useCallback((isHover)=>{
        setHoveredStateLocal(isHover);
        const isHovered = calculateStateValue({
            hasState: hasHover,
            isLocked: lockState,
            stateValueControlled: Boolean(hovered),
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
    const isHovered = calculateStateValue({
        hasState: hasHover,
        isLocked: lockState,
        stateValueControlled: Boolean(hovered),
        stateValueLocal: hoveredStateLocal
    });
    return {
        isHovered,
        onPointerEnter: hasHover ? onPointerEnter : _vkjs.noop,
        onPointerLeave: hasHover ? onPointerLeave : _vkjs.noop
    };
}
/**
 * Управляет активацией компонента
 */ function useActive({ activated, activeEffectDelay, hasActive = true, lockStateRef, setParentStateLock }) {
    // передаём setParentStateLock, чтобы функция вызывалась вместе с установкой стейта,
    // если установка отложена c помощью delay, то и вызов будет отложен
    const [activatedState, setActivated] = (0, _useStateWithDelay.useStateWithDelay)(false, 0, setParentStateLock);
    // Список нажатий которые не требуется отменять
    const pointersUp = _react.useMemo(()=>new Set(), []);
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
    const isActivated = calculateStateValue({
        hasState: hasActive,
        isLocked: lockStateRef.current,
        stateValueControlled: Boolean(activated),
        stateValueLocal: activatedState
    });
    return {
        isActivated,
        onPointerLeave: hasActive ? onPointerCancel : _vkjs.noop,
        onPointerDown: hasActive ? onPointerDown : _vkjs.noop,
        onPointerCancel: hasActive ? onPointerCancel : _vkjs.noop,
        onPointerUp: hasActive ? onPointerUp : _vkjs.noop
    };
}
const ClickableLockStateContext = /*#__PURE__*/ _react.createContext({
    lockHoverStateBubbling: undefined,
    lockActiveStateBubbling: undefined
});
/**
 * Блокирует стейт на всплытие
 */ function useLockState(setParentStateLockBubbling) {
    const [lockState, setLockState] = _react.useState(false);
    const setStateLockBubblingImmediate = _react.useCallback((isLock)=>{
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
    const lockStateRef = _react.useRef(false);
    const setStateLockBubblingImmediate = _react.useCallback((isLock)=>{
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
function useState(_param) {
    var { hovered, hasHover, hasActive, unlockParentHover } = _param, restProps = _object_without_properties._(_param, [
        "hovered",
        "hasHover",
        "hasActive",
        "unlockParentHover"
    ]);
    const { lockHoverStateBubbling = _vkjs.noop, lockActiveStateBubbling = _vkjs.noop } = _react.useContext(ClickableLockStateContext);
    const [lockHoverState, setParentStateLockHoverBubbling, setLockHoverBubblingImmediate] = useLockState(unlockParentHover ? _vkjs.noop : lockHoverStateBubbling);
    const [lockActiveStateRef, setParentStateLockActiveBubbling, setLockActiveBubblingImmediate] = useLockRef(lockActiveStateBubbling);
    const _useHover = useHover({
        hasHover,
        hovered,
        lockState: lockHoverState,
        setParentStateLock: setParentStateLockHoverBubbling
    }), { isHovered } = _useHover, hoverEvent = _object_without_properties._(_useHover, [
        "isHovered"
    ]);
    const _useActive = useActive(_object_spread_props._(_object_spread._({}, restProps), {
        lockStateRef: lockActiveStateRef,
        setParentStateLock: setParentStateLockActiveBubbling
    })), { isActivated } = _useActive, activeEvent = _object_without_properties._(_useActive, [
        "isActivated"
    ]);
    const stateClassName = (0, _vkjs.classNames)(isHovered && restProps.hoverClassName, isActivated && restProps.activeClassName);
    const handlers = (0, _mergeCalls.mergeCalls)(hoverEvent, activeEvent);
    return _object_spread._({
        stateClassName,
        setLockHoverBubblingImmediate,
        setLockActiveBubblingImmediate
    }, handlers);
}
// Общая функция для определения конечного состояния active/hovered
function calculateStateValue({ hasState, isLocked, stateValueControlled, stateValueLocal }) {
    return hasState && !isLocked && (stateValueControlled || stateValueLocal);
}

//# sourceMappingURL=useState.js.map