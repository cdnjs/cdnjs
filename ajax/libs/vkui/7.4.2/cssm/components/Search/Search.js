'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender/index.js";
import { useBooleanState } from "../../hooks/useBooleanState.js";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useNativeFormResetListener } from "../../hooks/useNativeFormResetListener.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { callMultiple } from "../../lib/callMultiple.js";
import { touchEnabled } from "../../lib/touch/index.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
import { Button } from "../Button/Button.js";
import { IconButton } from "../IconButton/IconButton.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./Search.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = ({ id: idProp, before = /*#__PURE__*/ _jsx(Icon16SearchOutline, {}), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon: iconProp, onIconClick, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', clearButtonTestId, noPadding, getRootRef, findButtonText = 'Найти', findButtonTestId, onFindButtonClick, ...inputProps })=>{
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
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
            className: styles.icon,
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
        className: classNames('vkuiInternalSearch', styles.host, sizeY === 'none' && styles.sizeYNone, sizeY === 'compact' && styles.sizeYCompact, isFocused && styles.focused, hasValue && styles.hasValue, hasAfter && styles.hasAfter, iconProp && styles.hasIcon, inputProps.disabled && styles.disabled, !noPadding && styles.withPadding, isRtl && styles.rtl, className),
        ref: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles.field,
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        htmlFor: inputId,
                        className: styles.label,
                        children: placeholder
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.input,
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
                                className: styles.nativeInput,
                                onFocus: onFocus,
                                onBlur: onBlur,
                                onChange: callMultiple(onChange, checkHasValue)
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles.controls,
                        children: [
                            iconProp && (typeof iconProp === 'function' ? iconProp(renderIconButton) : renderIconButton(iconProp)),
                            /*#__PURE__*/ _jsxs(IconButton, {
                                hoverMode: "opacity",
                                onPointerDown: onIconCancelClickStart,
                                onClick: onCancel,
                                className: styles.icon,
                                tabIndex: hasValue ? undefined : -1,
                                disabled: inputProps.disabled,
                                "data-testid": clearButtonTestId,
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
                                className: classNames(styles.findButton, adaptiveSizeY.compact.className),
                                focusVisibleMode: "inside",
                                onClick: onFindButtonClick,
                                tabIndex: hasValue ? undefined : -1,
                                "data-testid": findButtonTestId,
                                children: findButtonText
                            })
                        ]
                    })
                ]
            }),
            hasAfter && /*#__PURE__*/ _jsx("div", {
                className: styles.after,
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
                        className: styles.afterTextClip,
                        children: after
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=Search.js.map