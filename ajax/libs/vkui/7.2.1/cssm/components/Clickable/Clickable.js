import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { RealClickable } from "./RealClickable.js";
import styles from "./Clickable.module.css";
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = ({ href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, focusVisibleMode, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
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
            Component,
            disabled
        };
    } else if (href !== undefined) {
        return {
            Component: 'a',
            /**
       * Если ссылка отключена, добавляем атрибуты для доступности.
       *
       * - Тег `a` не поддерживает атрибут disabled, поэтому используем `aria-disabled`
       * - Тег `a` без `href` не является ссылкой, поэтому добавляем `role="link"`
       *
       * https://w3c.github.io/html-aria/#example-communicate-a-disabled-link-with-aria
       */ ...disabled && {
                'aria-disabled': true,
                'role': 'link'
            }
        };
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return {
            Component: 'div',
            role: 'button',
            ...disabled ? {
                'aria-disabled': true
            } : {
                tabIndex: 0
            }
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
 */ export const Clickable = (props)=>{
    const commonProps = component(props);
    const isClickable = checkClickable(props);
    const Component = isClickable ? RealClickable : NonClickable;
    const { baseClassName, disabled, ...restProps } = props;
    return /*#__PURE__*/ _jsx(Component, {
        baseClassName: classNames(baseClassName, styles.host),
        ...commonProps,
        ...restProps
    });
};

//# sourceMappingURL=Clickable.js.map