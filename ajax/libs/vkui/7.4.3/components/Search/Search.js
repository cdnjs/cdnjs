'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = (_param)=>{
    var { id: idProp, before = /*#__PURE__*/ _jsx(Icon16SearchOutline, {}), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon: iconProp, onIconClick, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', clearButtonTestId, noPadding, getRootRef, findButtonText = 'Найти', findButtonTestId, onFindButtonClick } = _param, inputProps = _object_without_properties(_param, [
        "id",
        "before",
        "className",
        "placeholder",
        "after",
        "getRef",
        "icon",
        "onIconClick",
        "style",
        "autoComplete",
        "onChange",
        "iconLabel",
        "clearLabel",
        "clearButtonTestId",
        "noPadding",
        "getRootRef",
        "findButtonText",
        "findButtonTestId",
        "onFindButtonClick"
    ]);
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
        var _Object_getOwnPropertyDescriptor, _inputRef_current;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const nativeInputValueSetter = (_Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')) === null || _Object_getOwnPropertyDescriptor === void 0 ? void 0 : _Object_getOwnPropertyDescriptor.set;
        nativeInputValueSetter === null || nativeInputValueSetter === void 0 ? void 0 : nativeInputValueSetter.call(inputRef.current, '');
        const ev2 = new Event('input', {
            bubbles: true
        });
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.dispatchEvent(ev2);
    }, [
        inputRef
    ]);
    const onIconClickStart = React.useCallback((e)=>onIconClick === null || onIconClick === void 0 ? void 0 : onIconClick(e), [
        onIconClick
    ]);
    const onIconCancelClickStart = React.useCallback((e)=>{
        var _inputRef_current;
        e.preventDefault();
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
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
    const renderIconButton = (icon, props = {})=>/*#__PURE__*/ _jsxs(IconButton, _object_spread_props(_object_spread({
            hoverMode: "opacity",
            onPointerDown: onIconClickStart,
            className: "vkuiSearch__icon",
            onFocus: setFocusedTrue,
            onBlur: setFocusedFalse,
            onClick: noop
        }, props), {
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: iconLabel
                }),
                icon
            ]
        }));
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames('vkuiInternalSearch', "vkuiSearch__host", sizeY === 'none' && "vkuiSearch__sizeYNone", sizeY === 'compact' && "vkuiSearch__sizeYCompact", isFocused && "vkuiSearch__focused", hasValue && "vkuiSearch__hasValue", hasAfter && "vkuiSearch__hasAfter", iconProp && "vkuiSearch__hasIcon", inputProps.disabled && "vkuiSearch__disabled", !noPadding && "vkuiSearch__withPadding", isRtl && "vkuiSearch__rtl", className),
        ref: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiSearch__field",
                children: [
                    /*#__PURE__*/ _jsx("label", {
                        htmlFor: inputId,
                        className: "vkuiSearch__label",
                        children: placeholder
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiSearch__input",
                        children: [
                            before,
                            /*#__PURE__*/ _jsx(Headline, _object_spread_props(_object_spread({
                                Component: "input",
                                type: "search",
                                level: "1",
                                weight: "3"
                            }, inputProps), {
                                id: inputId,
                                placeholder: placeholder,
                                autoComplete: autoComplete,
                                getRootRef: inputRef,
                                className: "vkuiSearch__nativeInput",
                                onFocus: onFocus,
                                onBlur: onBlur,
                                onChange: callMultiple(onChange, checkHasValue)
                            }))
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiSearch__controls",
                        children: [
                            iconProp && (typeof iconProp === 'function' ? iconProp(renderIconButton) : renderIconButton(iconProp)),
                            /*#__PURE__*/ _jsxs(IconButton, {
                                hoverMode: "opacity",
                                onPointerDown: onIconCancelClickStart,
                                onClick: onCancel,
                                className: "vkuiSearch__icon",
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
                                className: classNames("vkuiSearch__findButton", adaptiveSizeY.compact.className),
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
                className: "vkuiSearch__after",
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
                        className: "vkuiSearch__afterTextClip",
                        children: after
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=Search.js.map