import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from '@vkontakte/icons';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { useBooleanState } from '../../hooks/useBooleanState';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { callMultiple } from '../../lib/callMultiple';
import { touchEnabled } from '../../lib/touch';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Headline } from '../Typography/Headline/Headline';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export const Search = (_param)=>{
    var { id: idProp, before = /*#__PURE__*/ React.createElement(Icon16SearchOutline, null), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon, onIconClick = noop, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', noPadding, getRootRef, findButtonText = 'Найти', onFindButtonClick } = _param, inputProps = _object_without_properties(_param, [
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
        "noPadding",
        "getRootRef",
        "findButtonText",
        "onFindButtonClick"
    ]);
    const inputRef = useExternRef(getRef);
    const { value: isFocused, setTrue: setFocusedTrue, setFalse: setFocusedFalse } = useBooleanState(false);
    const generatedId = React.useId();
    const inputId = idProp ? idProp : `search-${generatedId}`;
    const [hasValue, setHasValue] = React.useState(()=>Boolean(inputProps.value || inputProps.defaultValue));
    const checkHasValue = (e)=>setHasValue(Boolean(e.currentTarget.value));
    const { sizeY = 'none' } = useAdaptivity();
    const { sizeY: adaptiveSizeY } = useAdaptivityConditionalRender();
    const platform = usePlatform();
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
    const onIconClickStart = React.useCallback((e)=>onIconClick(e), [
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
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames('vkuiInternalSearch', "vkuiSearch", sizeY === 'none' && "vkuiSearch--sizeY-none", sizeY === 'compact' && "vkuiSearch--sizeY-compact", isFocused && "vkuiSearch--focused", hasValue && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", inputProps.disabled && "vkuiSearch--disabled", !noPadding && "vkuiSearch--withPadding", className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__field"
    }, /*#__PURE__*/ React.createElement("label", {
        htmlFor: inputId,
        className: "vkuiSearch__label"
    }, placeholder), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__input"
    }, before, /*#__PURE__*/ React.createElement(Headline, _object_spread_props(_object_spread({
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
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__controls"
    }, icon && /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onPointerDown: onIconClickStart,
        className: "vkuiSearch__icon",
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse,
        onClick: noop
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, iconLabel), icon), /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onPointerDown: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon",
        tabIndex: hasValue ? undefined : -1
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, clearLabel), platform === 'ios' ? /*#__PURE__*/ React.createElement(Icon16Clear, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)), adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ React.createElement(Button, {
        mode: "primary",
        size: "m",
        className: classNames("vkuiSearch__findButton", adaptiveSizeY.compact.className),
        focusVisibleMode: "inside",
        onClick: onFindButtonClick,
        tabIndex: hasValue ? undefined : -1
    }, findButtonText))), platform === 'ios' && after && /*#__PURE__*/ React.createElement(Button, {
        mode: "tertiary",
        size: "m",
        className: "vkuiSearch__after",
        focusVisibleMode: "inside",
        onClick: onCancel,
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse
    }, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSearch__afterText"
    }, after)));
};

//# sourceMappingURL=Search.js.map