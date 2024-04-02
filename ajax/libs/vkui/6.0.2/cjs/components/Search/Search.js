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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const _useBooleanState = require("../../hooks/useBooleanState");
const _useExternRef = require("../../hooks/useExternRef");
const _usePlatform = require("../../hooks/usePlatform");
const _callMultiple = require("../../lib/callMultiple");
const _touch = require("../../lib/touch");
const _Button = require("../Button/Button");
const _IconButton = require("../IconButton/IconButton");
const _Headline = require("../Typography/Headline/Headline");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const Search = (_param)=>{
    var { id: idProp, before = /*#__PURE__*/ _react.createElement(_icons.Icon16SearchOutline, null), className, placeholder = 'Поиск', after = 'Отмена', getRef, icon, onIconClick = _vkjs.noop, style, autoComplete = 'off', onChange, iconLabel, clearLabel = 'Очистить', noPadding, getRootRef, findButtonText = 'Найти', onFindButtonClick } = _param, inputProps = _object_without_properties._(_param, [
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
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const { value: isFocused, setTrue: setFocusedTrue, setFalse: setFocusedFalse } = (0, _useBooleanState.useBooleanState)(false);
    const generatedId = _react.useId();
    const inputId = idProp ? idProp : `search-${generatedId}`;
    const [hasValue, setHasValue] = _react.useState(()=>Boolean(inputProps.value || inputProps.defaultValue));
    const checkHasValue = (e)=>setHasValue(Boolean(e.currentTarget.value));
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { sizeY: adaptiveSizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    const platform = (0, _usePlatform.usePlatform)();
    const onFocus = (e)=>{
        setFocusedTrue();
        inputProps.onFocus && inputProps.onFocus(e);
    };
    const onBlur = (e)=>{
        setFocusedFalse();
        inputProps.onBlur && inputProps.onBlur(e);
    };
    const onCancel = _react.useCallback(()=>{
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
    const onIconClickStart = _react.useCallback((e)=>onIconClick(e), [
        onIconClick
    ]);
    const onIconCancelClickStart = _react.useCallback((e)=>{
        var _inputRef_current;
        e.preventDefault();
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        if ((0, _touch.touchEnabled)()) {
            onCancel();
        }
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)('vkuiInternalSearch', "vkuiSearch", sizeY === 'none' && "vkuiSearch--sizeY-none", sizeY === 'compact' && "vkuiSearch--sizeY-compact", isFocused && "vkuiSearch--focused", hasValue && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", inputProps.disabled && "vkuiSearch--disabled", !noPadding && "vkuiSearch--withPadding", className),
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
        onChange: (0, _callMultiple.callMultiple)(onChange, checkHasValue)
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__controls"
    }, icon && /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hoverMode: "opacity",
        onPointerDown: onIconClickStart,
        className: "vkuiSearch__icon",
        onFocus: setFocusedTrue,
        onBlur: setFocusedFalse,
        onClick: _vkjs.noop
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, iconLabel), icon), /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        hoverMode: "opacity",
        onPointerDown: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon",
        tabIndex: hasValue ? undefined : -1
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, clearLabel), platform === 'ios' ? /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null)), adaptiveSizeY.compact && onFindButtonClick && /*#__PURE__*/ _react.createElement(_Button.Button, {
        mode: "primary",
        size: "m",
        className: (0, _vkjs.classNames)("vkuiSearch__findButton", adaptiveSizeY.compact.className),
        focusVisibleMode: "inside",
        onClick: onFindButtonClick,
        tabIndex: hasValue ? undefined : -1
    }, findButtonText))), platform === 'ios' && after && /*#__PURE__*/ _react.createElement(_Button.Button, {
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