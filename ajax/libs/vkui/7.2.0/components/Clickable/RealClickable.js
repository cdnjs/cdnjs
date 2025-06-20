'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { clickByKeyboardHandler } from "../../lib/utils.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { ClickableLockStateContext, DEFAULT_ACTIVE_EFFECT_DELAY, useState } from "./useState.js";
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ export const RealClickable = (_param)=>{
    var { baseClassName, children, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, hasHoverWithChildren, unlockParentHover, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown } = _param, restProps = _object_without_properties(_param, [
        "baseClassName",
        "children",
        "focusVisibleMode",
        "activeClassName",
        "hoverClassName",
        "activeEffectDelay",
        "hasHover",
        "hasActive",
        "hovered",
        "activated",
        "hasHoverWithChildren",
        "unlockParentHover",
        "onPointerEnter",
        "onPointerLeave",
        "onPointerDown",
        "onPointerCancel",
        "onPointerUp",
        "onBlur",
        "onFocus",
        "onKeyDown"
    ]);
    const _useFocusVisible = useFocusVisible(), { focusVisible } = _useFocusVisible, focusEvents = _object_without_properties(_useFocusVisible, [
        "focusVisible"
    ]);
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: focusVisibleMode
    });
    const _useState = useState({
        activeClassName,
        hoverClassName,
        activeEffectDelay,
        hasHover,
        hasActive,
        hovered,
        activated,
        unlockParentHover
    }), { stateClassName, setLockHoverBubblingImmediate, setLockActiveBubblingImmediate } = _useState, stateEvents = _object_without_properties(_useState, [
        "stateClassName",
        "setLockHoverBubblingImmediate",
        "setLockActiveBubblingImmediate"
    ]);
    const handlers = mergeCalls(focusEvents, stateEvents, {
        onKeyDown: clickByKeyboardHandler
    }, {
        onPointerEnter,
        onPointerLeave,
        onPointerDown,
        onPointerCancel,
        onPointerUp,
        onBlur,
        onFocus,
        onKeyDown
    });
    const lockStateContextValue = React.useMemo(()=>({
            lockHoverStateBubbling: hasHoverWithChildren ? noop : setLockHoverBubblingImmediate,
            lockActiveStateBubbling: setLockActiveBubblingImmediate
        }), [
        setLockHoverBubblingImmediate,
        setLockActiveBubblingImmediate,
        hasHoverWithChildren
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: classNames(baseClassName, "vkuiClickable__realClickable", focusVisibleClassNames, stateClassName)
    }, handlers, restProps), {
        children: /*#__PURE__*/ _jsx(ClickableLockStateContext.Provider, {
            value: lockStateContextValue,
            children: children
        })
    }));
};

//# sourceMappingURL=RealClickable.js.map