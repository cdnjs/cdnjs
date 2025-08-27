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
function nonClickableProps(_param) {
    var { href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, focusVisibleMode, DefaultComponent, Component } = _param, restProps = _object_without_properties(_param, [
        "href",
        "onClick",
        "onClickCapture",
        "activeClassName",
        "hoverClassName",
        "hasActive",
        "hasHover",
        "hovered",
        "unlockParentHover",
        "activated",
        "activeEffectDelay",
        "focusVisibleMode",
        "DefaultComponent",
        "Component"
    ]);
    return _object_spread_props(_object_spread({
        Component: Component || DefaultComponent
    }, restProps), {
        lockStateContextValue: {
            lockHoverStateBubbling: undefined,
            lockActiveStateBubbling: undefined
        }
    });
}
function useClickableProps(_param) {
    var { baseClassName, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, hasHoverWithChildren, unlockParentHover, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown, DefaultComponent } = _param, restProps = _object_without_properties(_param, [
        "baseClassName",
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
        "onKeyDown",
        "DefaultComponent"
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
    return _object_spread_props(_object_spread({
        baseClassName: classNames(baseClassName, "vkuiClickable__realClickable", focusVisibleClassNames, stateClassName)
    }, handlers, restProps), {
        lockStateContextValue
    });
}
function useProps(props) {
    const commonProps = component(props);
    const isClickable = checkClickable(props);
    const { baseClassName, disabled, Component } = props, restProps = _object_without_properties(props, [
        "baseClassName",
        "disabled",
        "Component"
    ]);
    const nextProps = _object_spread({
        baseClassName: classNames(baseClassName, "vkuiClickable__host")
    }, commonProps, restProps);
    const clickableProps = useClickableProps(nextProps);
    return isClickable ? clickableProps : nonClickableProps(nextProps);
}
/**
 * Проверяем, является ли компонент кликабельным.
 */ export function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined || props.Component === 'a' || props.Component === 'button' || props.Component === 'label' || props.Component === 'input') && !props.disabled;
}
/**
 * Определяет правильный компонент и его свойства.
 *
 * - если передан Component, используем его
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 */ function component({ Component, DefaultComponent = 'div', onClick, onClickCapture, href, disabled }) {
    if (Component !== undefined) {
        return {
            Component,
            disabled
        };
    } else if (href !== undefined) {
        return _object_spread({
            Component: 'a'
        }, disabled && {
            'aria-disabled': true,
            'role': 'link'
        });
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return _object_spread({
            Component: DefaultComponent,
            role: 'button'
        }, disabled ? {
            'aria-disabled': true
        } : {
            tabIndex: 0
        });
    }
    return {};
}
/**
 * Базовый кликабельный корневой компонент.
 *
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 *
 * Отвечает за:
 *
 * - стейты наведения и нажатия
 * - a11y компонентов.
 */ export const Clickable = (props)=>{
    const _useProps = useProps(props), { lockStateContextValue, children } = _useProps, restProps = _object_without_properties(_useProps, [
        "lockStateContextValue",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        children: /*#__PURE__*/ _jsx(ClickableLockStateContext.Provider, {
            value: lockStateContextValue,
            children: children
        })
    }));
};

//# sourceMappingURL=Clickable.js.map