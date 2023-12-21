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
    ACTIVE_DELAY: function() {
        return ACTIVE_DELAY;
    },
    ClickableLockStateContext: function() {
        return ClickableLockStateContext;
    },
    DEFAULT_ACTIVE_EFFECT_DELAY: function() {
        return DEFAULT_ACTIVE_EFFECT_DELAY;
    },
    useLockState: function() {
        return useLockState;
    },
    useState: function() {
        return useState;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _callMultiple = require("../../lib/callMultiple");
const _mergeCalls = require("../../lib/mergeCalls");
const _useStateWithDelay = require("./useStateWithDelay");
const DEFAULT_ACTIVE_EFFECT_DELAY = 600;
const ACTIVE_DELAY = 70;
/**
 * Управляет наведением на компонент, игнорирует тач события
 */ function useHover({ hovered, hoverClassName, hasHover = true }) {
    const [hoveredState, setHover] = _react.useState(false);
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
        onPointerEnter: hasHover ? onPointerEnter : _vkjs.noop,
        onPointerLeave: hasHover ? onPointerLeave : _vkjs.noop
    };
}
/**
 * Управляет активацией компонента
 */ function useActive({ activated, activeClassName, activeEffectDelay, hasActive = true }) {
    const [activatedState, setActivated] = (0, _useStateWithDelay.useStateWithDelay)(false);
    // Список нажатий которые не требуется отменять
    const pointersUp = _react.useMemo(()=>new Set(), []);
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
        onPointerLeave: hasActive ? onPointerCancel : _vkjs.noop,
        onPointerDown: hasActive ? onPointerDown : _vkjs.noop,
        onPointerCancel: hasActive ? onPointerCancel : _vkjs.noop,
        onPointerUp: hasActive ? onPointerUp : _vkjs.noop
    };
}
const ClickableLockStateContext = /*#__PURE__*/ _react.createContext(undefined);
function useLockState() {
    const setLockBubbling = _react.useContext(ClickableLockStateContext) || _vkjs.noop;
    const [lockState, setLockState] = _react.useState(false);
    const setLockBubblingImmediate = (0, _callMultiple.callMultiple)(setLockState, setLockBubbling);
    return [
        lockState,
        setLockBubbling,
        setLockBubblingImmediate
    ];
}
function useState(_param) {
    var { hasHover, hasActive } = _param, restProps = _object_without_properties._(_param, [
        "hasHover",
        "hasActive"
    ]);
    const [lockState, setLockBubbling, setLockBubblingImmediate] = useLockState();
    const props = _object_spread._({
        hasHover: hasHover && !lockState,
        hasActive: hasActive && !lockState
    }, restProps);
    const _useHover = useHover(_object_spread._({}, props)), { hover } = _useHover, hoverEvent = _object_without_properties._(_useHover, [
        "hover"
    ]);
    const _useActive = useActive(props), { active } = _useActive, activeEvent = _object_without_properties._(_useActive, [
        "active"
    ]);
    const stateClassName = (0, _vkjs.classNames)(hover, active);
    const handlers = (0, _mergeCalls.mergeCalls)(hoverEvent, activeEvent);
    _react.useEffect(()=>{
        setLockBubbling(!!stateClassName);
    }, [
        setLockBubbling,
        stateClassName
    ]);
    return _object_spread._({
        stateClassName,
        setLockBubblingImmediate
    }, handlers);
}

//# sourceMappingURL=useState.js.map