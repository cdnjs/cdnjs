import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { RealClickable } from "./RealClickable.js";
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = (_param)=>{
    var { href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, focusVisibleMode } = _param, restProps = _object_without_properties(_param, [
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
        "focusVisibleMode"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({}, restProps));
};
/**
 * Проверяем, является ли компонент кликабельным
 */ export function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined || props.Component === 'a' || props.Component === 'button' || props.Component === 'label' || props.Component === 'input') && !props.disabled;
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
            Component: 'div',
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
 * - a11y компонентов
 */ export const Clickable = (props)=>{
    const commonProps = component(props);
    const isClickable = checkClickable(props);
    const Component = isClickable ? RealClickable : NonClickable;
    const { baseClassName, disabled } = props, restProps = _object_without_properties(props, [
        "baseClassName",
        "disabled"
    ]);
    return /*#__PURE__*/ _jsx(Component, _object_spread({
        baseClassName: classNames(baseClassName, "vkuiClickable__host")
    }, commonProps, restProps));
};

//# sourceMappingURL=Clickable.js.map