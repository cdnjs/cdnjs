import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { callMultiple } from '../../lib/callMultiple';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Clickable.module.css';
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = ({ href, onClick, onClickCapture, ...restProps })=>/*#__PURE__*/ React.createElement(RootComponent, restProps);
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ const RealClickable = ({ baseClassName, children, focusVisibleMode = 'inside', ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: focusVisibleMode
    });
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(baseClassName, focusVisibleClassNames, styles['Clickable__host']),
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus),
        ...restProps
    }, children);
};
/**
 * Проверяем, является ли компонент кликабельным
 */ function checkClickable(props) {
    return (props.href !== undefined || props.onClick !== undefined || props.onClickCapture !== undefined) && !props.disabled;
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
            'role': 'link',
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
 */ export const Clickable = ({ focusVisibleMode = 'inside', ...restProps })=>{
    const commonProps = component(restProps);
    const isClickable = checkClickable(restProps);
    if (isClickable) {
        return /*#__PURE__*/ React.createElement(RealClickable, {
            focusVisibleMode: focusVisibleMode,
            ...commonProps,
            ...restProps
        });
    }
    return /*#__PURE__*/ React.createElement(NonClickable, {
        ...commonProps,
        ...restProps
    });
};

//# sourceMappingURL=Clickable.js.map