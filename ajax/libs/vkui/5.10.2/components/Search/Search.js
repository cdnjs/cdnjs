import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from "@vkontakte/icons";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
import { useBooleanState } from "../../hooks/useBooleanState";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { useId } from "../../hooks/useId";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { touchEnabled } from "../../lib/touch";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Headline } from "../Typography/Headline/Headline";
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export var Search = function(_param) {
    var idProp = _param.id, _param_before = _param.before, before = _param_before === void 0 ? /*#__PURE__*/ React.createElement(Icon16SearchOutline, null) : _param_before, className = _param.className, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_placeholder = _param.placeholder, placeholder = _param_placeholder === void 0 ? "Поиск" : _param_placeholder, _param_after = _param.after, after = _param_after === void 0 ? "Отмена" : _param_after, getRef = _param.getRef, icon = _param.icon, _param_onIconClick = _param.onIconClick, onIconClick = _param_onIconClick === void 0 ? noop : _param_onIconClick, style = _param.style, _param_autoComplete = _param.autoComplete, autoComplete = _param_autoComplete === void 0 ? "off" : _param_autoComplete, onChangeProp = _param.onChange, valueProp = _param.value, iconAriaLabel = _param.iconAriaLabel, _param_clearAriaLabel = _param.clearAriaLabel, clearAriaLabel = _param_clearAriaLabel === void 0 ? "Очистить" : _param_clearAriaLabel, noPadding = _param.noPadding, getRootRef = _param.getRootRef, _param_findButtonText = _param.findButtonText, findButtonText = _param_findButtonText === void 0 ? "Найти" : _param_findButtonText, onFindButtonClick = _param.onFindButtonClick, inputProps = _object_without_properties(_param, [
        "id",
        "before",
        "className",
        "defaultValue",
        "placeholder",
        "after",
        "getRef",
        "icon",
        "onIconClick",
        "style",
        "autoComplete",
        "onChange",
        "value",
        "iconAriaLabel",
        "clearAriaLabel",
        "noPadding",
        "getRootRef",
        "findButtonText",
        "onFindButtonClick"
    ]);
    var inputRef = useExternRef(getRef);
    var _useBooleanState = useBooleanState(false), isFocused = _useBooleanState.value, setFocusedTrue = _useBooleanState.setTrue, setFocusedFalse = _useBooleanState.setFalse;
    var generatedId = useId();
    var inputId = idProp ? idProp : "search-".concat(generatedId);
    var _useEnsuredControl = _sliced_to_array(useEnsuredControl({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl[0], onChange = _useEnsuredControl[1];
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useAdaptivityConditionalRender = useAdaptivityConditionalRender(), adaptiveSizeY = _useAdaptivityConditionalRender.sizeY;
    var platform = usePlatform();
    var onFocus = function(e) {
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    var onBlur = function(e) {
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    var onCancel = React.useCallback(function() {
        var _Object_getOwnPropertyDescriptor, _inputRef_current;
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var nativeInputValueSetter = (_Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) === null || _Object_getOwnPropertyDescriptor === void 0 ? void 0 : _Object_getOwnPropertyDescriptor.set;
        nativeInputValueSetter === null || nativeInputValueSetter === void 0 ? void 0 : nativeInputValueSetter.call(inputRef.current, "");
        var ev2 = new Event("input", {
            bubbles: true
        });
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.dispatchEvent(ev2);
    }, [
        inputRef
    ]);
    var onIconClickStart = React.useCallback(function(e) {
        return onIconClick(e.originalEvent);
    }, [
        onIconClick
    ]);
    var onIconCancelClickStart = React.useCallback(function(e) {
        var _inputRef_current;
        e.originalEvent.preventDefault();
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        if (touchEnabled()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiInternalSearch", "vkuiSearch", sizeY === "none" && "vkuiSearch--sizeY-none", sizeY === SizeType.COMPACT && "vkuiSearch--sizeY-compact", isFocused && "vkuiSearch--focused", value && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", inputProps.disabled && "vkuiSearch--disabled", !noPadding && "vkuiSearch--withPadding", className),
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
        onChange: onChange,
        value: value
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__controls"
    }, icon && /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onStart: onIconClickStart,
        className: "vkuiSearch__icon",
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse,
        "aria-label": iconAriaLabel
    }, icon), /*#__PURE__*/ React.createElement(IconButton, {
        hoverMode: "opacity",
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon",
        "aria-label": clearAriaLabel,
        tabIndex: value ? undefined : -1
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon16Clear, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)), adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ React.createElement(Button, {
        mode: "primary",
        size: "m",
        className: classNames("vkuiSearch__findButton", adaptiveSizeY.compact.className),
        focusVisibleMode: "inside",
        onClick: onFindButtonClick,
        tabIndex: value ? undefined : -1
    }, findButtonText))), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement(Button, {
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