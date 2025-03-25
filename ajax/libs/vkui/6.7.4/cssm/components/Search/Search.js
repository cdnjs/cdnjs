import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useExternRef } from '../../hooks/useExternRef';
import { useNativeFormResetListener } from '../../hooks/useNativeFormResetListener';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { touchEnabled } from '../../lib/touch';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Headline } from '../Typography/Headline/Headline';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Search.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = ({ id: idProp, before = /*#__PURE__*/ _jsx(Icon16SearchOutline, {}), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon: iconProp, onIconClick, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', noPadding, getRootRef, findButtonText = 'Найти', onFindButtonClick, ...inputProps })=>{
    const inputRef = useExternRef(getRef);
    const { value: isFocused, setTrue: setFocusedTrue, setFalse: setFocusedFalse } = useBooleanState(false);
    const generatedId = React.useId();
    const inputId = idProp ? idProp : `search-${generatedId}`;
    const [hasValue, setHasValue] = React.useState(()=>Boolean(inputProps.value || inputProps.defaultValue));
    const checkHasValue = (e)=>setHasValue(Boolean(e.currentTarget.value));
    const { sizeY = 'none' } = useAdaptivity();
    const { sizeY: adaptiveSizeY } = useAdaptivityConditionalRender();
    const platform = usePlatform();
    const hasAfter = platform === 'ios' && hasReactNode(after);
    const onFocus = (e)=>{
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    const onBlur = (e)=>{
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    const onCancel = React.useCallback(()=>{
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        const ev2 = new Event('input', {
            bubbles: true
        });
        inputRef.current?.dispatchEvent(ev2);
    }, [
        inputRef
    ]);
    const onIconClickStart = React.useCallback((e)=>onIconClick?.(e), [
        onIconClick
    ]);
    const onIconCancelClickStart = React.useCallback((e)=>{
        e.preventDefault();
        inputRef.current?.focus();
        if (touchEnabled()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (inputProps.value !== undefined) {
            setHasValue(Boolean(inputProps.value));
        }
    }, [
        inputProps.value
    ]);
    useNativeFormResetListener(inputRef, ()=>{
        setHasValue(Boolean(inputProps.defaultValue));
    });
    const renderIconButton = (icon, props = {})=>/*#__PURE__*/ _jsxs(IconButton, {
            hoverMode: "opacity",
            onPointerDown: onIconClickStart,
            className: styles['Search__icon'],
            onFocus: setFocusedTrue,
            onBlur: setFocusedFalse,
            onClick: noop,
            ...props,
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: iconLabel
                }),
                icon
            ]
        });
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames('vkuiInternalSearch', styles['Search'], sizeY === 'none' && styles['Search--sizeY-none'], sizeY === 'compact' && styles['Search--sizeY-compact'], isFocused && styles['Search--focused'], hasValue && styles['Search--has-value'], hasAfter && styles['Search--has-after'], iconProp && styles['Search--has-icon'], inputProps.disabled && styles['Search--disabled'], !noPadding && styles['Search--withPadding'], className),
        ref: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Search__field'],
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        htmlFor: inputId,
                        className: styles['Search__label'],
                        children: placeholder
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['Search__input'],
                        children: [
                            before,
                            /*#__PURE__*/ _jsx(Headline, {
                                Component: "input",
                                type: "search",
                                level: "1",
                                weight: "3",
                                ...inputProps,
                                id: inputId,
                                placeholder: placeholder,
                                autoComplete: autoComplete,
                                getRootRef: inputRef,
                                className: styles['Search__nativeInput'],
                                onFocus: onFocus,
                                onBlur: onBlur,
                                onChange: callMultiple(onChange, checkHasValue)
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['Search__controls'],
                        children: [
                            iconProp && (typeof iconProp === 'function' ? iconProp(renderIconButton) : renderIconButton(iconProp)),
                            /*#__PURE__*/ _jsxs(IconButton, {
                                hoverMode: "opacity",
                                onPointerDown: onIconCancelClickStart,
                                onClick: onCancel,
                                className: styles['Search__icon'],
                                tabIndex: hasValue ? undefined : -1,
                                disabled: inputProps.disabled,
                                children: [
                                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                                        children: clearLabel
                                    }),
                                    platform === 'ios' ? /*#__PURE__*/ _jsx(Icon16Clear, {}) : /*#__PURE__*/ _jsx(Icon24Cancel, {})
                                ]
                            }),
                            adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ _jsx(Button, {
                                mode: "primary",
                                size: "m",
                                className: classNames(styles['Search__findButton'], adaptiveSizeY.compact.className),
                                focusVisibleMode: "inside",
                                onClick: onFindButtonClick,
                                tabIndex: hasValue ? undefined : -1,
                                children: findButtonText
                            })
                        ]
                    })
                ]
            }),
            hasAfter && /*#__PURE__*/ _jsx("div", {
                className: styles['Search__after'],
                children: /*#__PURE__*/ _jsx(Button, {
                    mode: "tertiary",
                    size: "m",
                    focusVisibleMode: "inside",
                    hoverMode: "opacity",
                    activeMode: "opacity",
                    onClick: onCancel,
                    onFocus: setFocusedTrue,
                    onBlur: setFocusedFalse,
                    children: /*#__PURE__*/ _jsx("span", {
                        className: styles['Search__afterTextClip'],
                        children: after
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=Search.js.map