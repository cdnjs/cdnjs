import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { mergeCalls } from '../../lib/mergeCalls';
import { clickByKeyboardHandler } from '../../lib/utils';
import { RootComponent } from '../RootComponent/RootComponent';
import { ClickableLockStateContext, DEFAULT_ACTIVE_EFFECT_DELAY, useState } from './useState';
import styles from './Clickable.module.css';
/**
 * Некликабельный компонент. Отключаем возможность нажимать на компонент.
 */ const NonClickable = ({ href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        ...restProps
    });
/**
 * Кликабельный компонент. Добавляем кучу обвесов
 */ const RealClickable = ({ baseClassName, children, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, hasHoverWithChildren, unlockParentHover, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown, ...restProps })=>{
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
        baseClassName: classNames(baseClassName, styles['Clickable__realClickable'], focusVisibleClassNames, stateClassName),
        ...handlers,
        ...restProps,
        children: /*#__PURE__*/ _jsx(ClickableLockStateContext.Provider, {
            value: lockStateContextValue,
            children: children
        })
    });
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
const getUserAgentResetClassName = (Component)=>{
    if (Component === 'a') {
        return styles.Clickable__resetLinkStyle;
    }
    if (Component === 'button') {
        return styles.Clickable__resetButtonStyle;
    }
    return;
};
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
    const baseClassName = classNames(baseClassNameProp, getUserAgentResetClassName(commonProps.Component), styles['Clickable__host']);
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