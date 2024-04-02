import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { mergeCalls } from '../../lib/mergeCalls';
import { RootComponent } from '../RootComponent/RootComponent';
import { useKeyboard } from './useKeyboard';
import { ClickableLockStateContext, DEFAULT_ACTIVE_EFFECT_DELAY, useState } from './useState';
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = (_param)=>{
    var { href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, activated, activeEffectDelay } = _param, restProps = _object_without_properties(_param, [
        "href",
        "onClick",
        "onClickCapture",
        "activeClassName",
        "hoverClassName",
        "hasActive",
        "hasHover",
        "hovered",
        "activated",
        "activeEffectDelay"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, restProps);
};
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ const RealClickable = (_param)=>{
    var { baseClassName, children, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown } = _param, restProps = _object_without_properties(_param, [
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
        activated
    }), { stateClassName, setLockBubblingImmediate } = _useState, stateEvents = _object_without_properties(_useState, [
        "stateClassName",
        "setLockBubblingImmediate"
    ]);
    const keyboardHandlers = useKeyboard();
    const handlers = mergeCalls(focusEvents, stateEvents, keyboardHandlers, {
        onPointerEnter,
        onPointerLeave,
        onPointerDown,
        onPointerCancel,
        onPointerUp,
        onBlur,
        onFocus,
        onKeyDown
    });
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames(baseClassName, "vkuiClickable__realClickable", focusVisibleClassNames, stateClassName)
    }, handlers, restProps), /*#__PURE__*/ React.createElement(ClickableLockStateContext.Provider, {
        value: setLockBubblingImmediate
    }, children));
};
/**
 * Проверяем, является ли компонент кликабельным
 */ export function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined || props.Component === 'label') && !props.disabled;
}
/**
 * Определяет правильный компонент и его свойства
 *
 * - если передан Component, используем его
 * - при передаче `href` превратится в `a`,
 * - при передаче `onClick` превратится в `div` c `role="button"` и `tabIndex="0"`.
 * - иначе используется `div`.
 */ function component({ Component, onClick, onClickCapture, href, disabled }) {
    if (Component !== undefined) {
        return {
            Component
        };
    } else if (href !== undefined) {
        return {
            'Component': 'a',
            'aria-disabled': disabled
        };
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return {
            'Component': 'div',
            'role': 'button',
            'tabIndex': disabled ? undefined : 0,
            'aria-disabled': disabled
        };
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
 * - a11y компонентов
 */ export const Clickable = (_param)=>{
    var { focusVisibleMode = 'inside', baseClassName: baseClassNameProp } = _param, restProps = _object_without_properties(_param, [
        "focusVisibleMode",
        "baseClassName"
    ]);
    const commonProps = component(restProps);
    const isClickable = checkClickable(restProps);
    const baseClassName = classNames(baseClassNameProp, "vkuiClickable__host");
    if (isClickable) {
        return /*#__PURE__*/ React.createElement(RealClickable, _object_spread({
            baseClassName: baseClassName,
            focusVisibleMode: focusVisibleMode
        }, commonProps, restProps));
    }
    return /*#__PURE__*/ React.createElement(NonClickable, _object_spread({
        baseClassName: baseClassName
    }, commonProps, restProps));
};

//# sourceMappingURL=Clickable.js.map