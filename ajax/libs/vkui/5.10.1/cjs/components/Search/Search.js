"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Search", {
    enumerable: true,
    get: function() {
        return Search;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _useBooleanState = require("../../hooks/useBooleanState");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _useId = require("../../hooks/useId");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _touch = require("../../lib/touch");
var _Button = require("../Button/Button");
var _IconButton = require("../IconButton/IconButton");
var _Headline = require("../Typography/Headline/Headline");
var Search = function(_param) {
    var idProp = _param.id, _param_before = _param.before, before = _param_before === void 0 ? /*#__PURE__*/ _react.createElement(_icons.Icon16SearchOutline, null) : _param_before, className = _param.className, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_placeholder = _param.placeholder, placeholder = _param_placeholder === void 0 ? "Поиск" : _param_placeholder, _param_after = _param.after, after = _param_after === void 0 ? "Отмена" : _param_after, getRef = _param.getRef, icon = _param.icon, _param_onIconClick = _param.onIconClick, onIconClick = _param_onIconClick === void 0 ? _vkjs.noop : _param_onIconClick, style = _param.style, _param_autoComplete = _param.autoComplete, autoComplete = _param_autoComplete === void 0 ? "off" : _param_autoComplete, onChangeProp = _param.onChange, valueProp = _param.value, iconAriaLabel = _param.iconAriaLabel, _param_clearAriaLabel = _param.clearAriaLabel, clearAriaLabel = _param_clearAriaLabel === void 0 ? "Очистить" : _param_clearAriaLabel, noPadding = _param.noPadding, getRootRef = _param.getRootRef, _param_findButtonText = _param.findButtonText, findButtonText = _param_findButtonText === void 0 ? "Найти" : _param_findButtonText, onFindButtonClick = _param.onFindButtonClick, inputProps = _object_without_properties._(_param, [
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
    var inputRef = (0, _useExternRef.useExternRef)(getRef);
    var _useBooleanState1 = (0, _useBooleanState.useBooleanState)(false), isFocused = _useBooleanState1.value, setFocusedTrue = _useBooleanState1.setTrue, setFocusedFalse = _useBooleanState1.setFalse;
    var generatedId = (0, _useId.useId)();
    var inputId = idProp ? idProp : "search-".concat(generatedId);
    var _useEnsuredControl1 = _sliced_to_array._((0, _useEnsuredControl.useEnsuredControl)({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl1[0], onChange = _useEnsuredControl1[1];
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useAdaptivityConditionalRender1 = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(), adaptiveSizeY = _useAdaptivityConditionalRender1.sizeY;
    var platform = (0, _usePlatform.usePlatform)();
    var onFocus = function(e) {
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    var onBlur = function(e) {
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    var onCancel = _react.useCallback(function() {
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
    var onIconClickStart = _react.useCallback(function(e) {
        return onIconClick(e.originalEvent);
    }, [
        onIconClick
    ]);
    var onIconCancelClickStart = _react.useCallback(function(e) {
        var _inputRef_current;
        e.originalEvent.preventDefault();
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        if ((0, _touch.touchEnabled)()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiInternalSearch", "vkuiSearch", sizeY === "none" && "vkuiSearch--sizeY-none", sizeY === _adaptivity.SizeType.COMPACT && "vkuiSearch--sizeY-compact", isFocused && "vkuiSearch--focused", value && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", inputProps.disabled && "vkuiSearch--disabled", !noPadding && "vkuiSearch--withPadding", className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__field"
    }, /*#__PURE__*/ _react.createElement("label", {
        htmlFor: inputId,
        className: "vkuiSearch__label"
    }, placeholder), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__input"
    }, before, /*#__PURE__*/ _react.createElement(_Headline.Headline, _object_spread_props._(_object_spread._({
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
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__controls"
    }, icon && /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hoverMode: "opacity",
        onStart: onIconClickStart,
        className: "vkuiSearch__icon",
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse,
        "aria-label": iconAriaLabel
    }, icon), /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hoverMode: "opacity",
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon",
        "aria-label": clearAriaLabel,
        tabIndex: value ? undefined : -1
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null)), adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ _react.createElement(_Button.Button, {
        mode: "primary",
        size: "m",
        className: (0, _vkjs.classNames)("vkuiSearch__findButton", adaptiveSizeY.compact.className),
        focusVisibleMode: "inside",
        onClick: onFindButtonClick,
        tabIndex: value ? undefined : -1
    }, findButtonText))), platform === _platform.Platform.IOS && after && /*#__PURE__*/ _react.createElement(_Button.Button, {
        mode: "tertiary",
        size: "m",
        className: "vkuiSearch__after",
        focusVisibleMode: "inside",
        onClick: onCancel,
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse
    }, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSearch__afterText"
    }, after)));
};

//# sourceMappingURL=Search.js.map