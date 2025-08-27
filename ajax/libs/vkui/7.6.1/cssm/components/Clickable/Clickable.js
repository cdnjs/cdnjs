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
function nonClickableProps({ href, onClick, onClickCapture, activeClassName, hoverClassName, hasActive, hasHover, hovered, unlockParentHover, activated, activeEffectDelay, focusVisibleMode, DefaultComponent, Component, ...restProps }) {
    return {
        Component: Component || DefaultComponent,
        ...restProps,
        lockStateContextValue: {
            lockHoverStateBubbling: undefined,
            lockActiveStateBubbling: undefined
        }
    };
}
function useClickableProps({ baseClassName, focusVisibleMode = 'inside', activeClassName, hoverClassName, activeEffectDelay = DEFAULT_ACTIVE_EFFECT_DELAY, hasHover = true, hasActive = true, hovered, activated, hasHoverWithChildren, unlockParentHover, onPointerEnter, onPointerLeave, onPointerDown, onPointerCancel, onPointerUp, onBlur, onFocus, onKeyDown, DefaultComponent, ...restProps }) {
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
    return {
        baseClassName: classNames(baseClassName, styles.realClickable, focusVisibleClassNames, stateClassName),
        ...handlers,
        ...restProps,
        lockStateContextValue
    };
}
function useProps(props) {
    const commonProps = component(props);
    const isClickable = checkClickable(props);
    const { baseClassName, disabled, Component, ...restProps } = props;
    const nextProps = {
        baseClassName: classNames(baseClassName, styles.host),
        ...commonProps,
        ...restProps
    };
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
        return {
            Component: 'a',
            /**
       * Если ссылка отключена, добавляем атрибуты для доступности.
       *
       * - Тег `a` не поддерживает атрибут disabled, поэтому используем `aria-disabled`
       * - Тег `a` без `href` не является ссылкой, поэтому добавляем `role="link"`.
       *
       * @see см. https://w3c.github.io/html-aria/#example-communicate-a-disabled-link-with-aria.
       *
       */ ...disabled && {
                'aria-disabled': true,
                'role': 'link'
            }
        };
    } else if (onClick !== undefined || onClickCapture !== undefined) {
        return {
            Component: DefaultComponent,
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
 * - a11y компонентов.
 */ export const Clickable = (props)=>{
    const { lockStateContextValue, children, ...restProps } = useProps(props);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        children: /*#__PURE__*/ _jsx(ClickableLockStateContext.Provider, {
            value: lockStateContextValue,
            children: children
        })
    });
};

//# sourceMappingURL=Clickable.js.map