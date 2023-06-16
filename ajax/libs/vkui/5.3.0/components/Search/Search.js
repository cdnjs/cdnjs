import _define_property from "@swc/helpers/src/_define_property.mjs";
import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _sliced_to_array from "@swc/helpers/src/_sliced_to_array.mjs";
import * as React from "react";
import { Icon16Clear, Icon16SearchOutline, Icon24Cancel } from "@vkontakte/icons";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { Touch } from "../Touch/Touch";
import { Headline } from "../Typography/Headline/Headline";
import { Title } from "../Typography/Title/Title";
var sizeYClassNames = _define_property({
    none: "vkuiSearch--sizeY-none"
}, SizeType.REGULAR, "vkuiSearch--sizeY-regular");
var SearchPlaceholderTypography = function(_param) {
    var children = _param.children, restProps = _object_without_properties(_param, [
        "children"
    ]);
    var platform = usePlatform();
    switch(platform){
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Title, _object_spread_props(_object_spread({}, restProps), {
                level: "3",
                weight: "3"
            }), children);
        default:
            return /*#__PURE__*/ React.createElement(Headline, _object_spread_props(_object_spread({}, restProps), {
                weight: "3"
            }), children);
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Search
 */ export var Search = function(_param) {
    var _param_before = _param.before, before = _param_before === void 0 ? /*#__PURE__*/ React.createElement(Icon16SearchOutline, null) : _param_before, className = _param.className, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_placeholder = _param.placeholder, placeholder = _param_placeholder === void 0 ? "Поиск" : _param_placeholder, _param_after = _param.after, after = _param_after === void 0 ? "Отмена" : _param_after, getRef = _param.getRef, icon = _param.icon, _param_onIconClick = _param.onIconClick, onIconClick = _param_onIconClick === void 0 ? noop : _param_onIconClick, style = _param.style, _param_autoComplete = _param.autoComplete, autoComplete = _param_autoComplete === void 0 ? "off" : _param_autoComplete, onChangeProp = _param.onChange, valueProp = _param.value, inputProps = _object_without_properties(_param, [
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
        "value"
    ]);
    var inputRef = useExternRef(getRef);
    var _React_useState = _sliced_to_array(React.useState(false), 2), isFocused = _React_useState[0], setFocused = _React_useState[1];
    var _useEnsuredControl = _sliced_to_array(useEnsuredControl({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl[0], onChange = _useEnsuredControl[1];
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var platform = usePlatform();
    var onFocus = function(e) {
        setFocused(true);
        inputProps.onFocus && inputProps.onFocus(e);
    };
    var onBlur = function(e) {
        setFocused(false);
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
        onCancel();
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiSearch", sizeY !== SizeType.COMPACT && sizeYClassNames[sizeY], isFocused && "vkuiSearch--focused", value && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__width"
    }), /*#__PURE__*/ React.createElement("label", {
        className: "vkuiSearch__control"
    }, /*#__PURE__*/ React.createElement("input", _object_spread_props(_object_spread({
        type: "search"
    }, inputProps), {
        autoComplete: autoComplete,
        ref: inputRef,
        className: "vkuiSearch__input",
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        value: value
    })), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__after-width"
    }, after), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__placeholder"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__placeholder-in"
    }, before, /*#__PURE__*/ React.createElement(SearchPlaceholderTypography, {
        className: "vkuiSearch__placeholder-text"
    }, placeholder)), isFocused && platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__after-width"
    }, after))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__after"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__icons"
    }, icon && /*#__PURE__*/ React.createElement(Touch, {
        onStart: onIconClickStart,
        className: "vkuiSearch__icon"
    }, icon), !!value && /*#__PURE__*/ React.createElement(Touch, {
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon"
    }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon16Clear, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null))), platform === Platform.IOS && after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSearch__after-in",
        onClick: onCancel
    }, after))));
};

//# sourceMappingURL=Search.js.map