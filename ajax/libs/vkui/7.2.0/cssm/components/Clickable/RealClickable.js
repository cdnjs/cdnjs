'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName.js";
import { mergeCalls } from "../../lib/mergeCalls.js";
import { clickByKeyboardHandler } from "../../lib/utils.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { ClickableLockStateContext, DEFAULT_ACTIVE_EFFECT_DELAY, useState } from "./useState.js";
import styles from "./Clickable.module.css";
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ export const RealClickable = ({ baseClassName, children, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, hasHoverWithChildren, unlockParentHover, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown, ...restProps })=>{
    const { focusVisible, ...focusEvents } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: focusVisibleMode
    });
    const { stateClassName, setLockHoverBubblingImmediate, setLockActiveBubblingImmediate, ...stateEvents } = useState({
        activeClassName,
        hoverClassName,
        activeEffectDelay,
        hasHover,
        hasActive,
        hovered,
        activated,
        unlockParentHover
    });
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(baseClassName, styles.realClickable, focusVisibleClassNames, stateClassName),
        ...handlers,
        ...restProps,
        children: /*#__PURE__*/ _jsx(ClickableLockStateContext.Provider, {
            value: lockStateContextValue,
            children: children
        })
    });
};

//# sourceMappingURL=RealClickable.js.map