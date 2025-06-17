import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { RealClickable } from "./RealClickable.js";
import styles from "./Clickable.module.css";
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = ({ href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps
    });
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
 */ export const Clickable = ({ focusVisibleMode = 'inside', baseClassName: baseClassNameProp, ...restProps })=>{
    const commonProps = component(restProps);
    const isClickable = checkClickable(restProps);
    const baseClassName = classNames(baseClassNameProp, styles.host);
    if (isClickable) {
        return /*#__PURE__*/ _jsx(RealClickable, {
            baseClassName: baseClassName,
            focusVisibleMode: focusVisibleMode,
            ...commonProps,
            ...restProps
        });
    }
    return /*#__PURE__*/ _jsx(NonClickable, {
        baseClassName: baseClassName,
        ...commonProps,
        ...restProps
    });
};

//# sourceMappingURL=Clickable.js.map