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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _touch = require("../Touch/Touch");
var _headline = require("../Typography/Headline/Headline");
var _title = require("../Typography/Title/Title");
var sizeYClassNames = _defineProperty({
    none: "vkuiSearch--sizeY-none"
}, _adaptivity.SizeType.REGULAR, "vkuiSearch--sizeY-regular");
var SearchPlaceholderTypography = function(_param) {
    var children = _param.children, restProps = _objectWithoutProperties(_param, [
        "children"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    switch(platform){
        case _platform.Platform.IOS:
            return /*#__PURE__*/ _react.createElement(_title.Title, _objectSpreadProps(_objectSpread({}, restProps), {
                level: "3",
                weight: "3"
            }), children);
        default:
            return /*#__PURE__*/ _react.createElement(_headline.Headline, _objectSpreadProps(_objectSpread({}, restProps), {
                weight: "3"
            }), children);
    }
};
var Search = function(_param) {
    var _param_before = _param.before, before = _param_before === void 0 ? /*#__PURE__*/ _react.createElement(_icons.Icon16SearchOutline, null) : _param_before, className = _param.className, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_placeholder = _param.placeholder, placeholder = _param_placeholder === void 0 ? "Поиск" : _param_placeholder, _param_after = _param.after, after = _param_after === void 0 ? "Отмена" : _param_after, getRef = _param.getRef, icon = _param.icon, _param_onIconClick = _param.onIconClick, onIconClick = _param_onIconClick === void 0 ? _vkjs.noop : _param_onIconClick, style = _param.style, _param_autoComplete = _param.autoComplete, autoComplete = _param_autoComplete === void 0 ? "off" : _param_autoComplete, onChangeProp = _param.onChange, valueProp = _param.value, inputProps = _objectWithoutProperties(_param, [
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
    var inputRef = (0, _useExternRef.useExternRef)(getRef);
    var _React_useState = _slicedToArray(_react.useState(false), 2), isFocused = _React_useState[0], setFocused = _React_useState[1];
    var _useEnsuredControl1 = _slicedToArray((0, _useEnsuredControl.useEnsuredControl)({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl1[0], onChange = _useEnsuredControl1[1];
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var platform = (0, _usePlatform.usePlatform)();
    var onFocus = function(e) {
        setFocused(true);
        inputProps.onFocus && inputProps.onFocus(e);
    };
    var onBlur = function(e) {
        setFocused(false);
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
        onCancel();
    }, [
        inputRef,
        onCancel
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiSearch", sizeY !== _adaptivity.SizeType.COMPACT && sizeYClassNames[sizeY], isFocused && "vkuiSearch--focused", value && "vkuiSearch--has-value", after && "vkuiSearch--has-after", icon && "vkuiSearch--has-icon", className),
        style: style
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__width"
    }), /*#__PURE__*/ _react.createElement("label", {
        className: "vkuiSearch__control"
    }, /*#__PURE__*/ _react.createElement("input", _objectSpreadProps(_objectSpread({
        type: "search"
    }, inputProps), {
        autoComplete: autoComplete,
        ref: inputRef,
        className: "vkuiSearch__input",
        onFocus: onFocus,
        onBlur: onBlur,
        onChange: onChange,
        value: value
    })), platform === _platform.Platform.IOS && after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__after-width"
    }, after), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__placeholder"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__placeholder-in"
    }, before, /*#__PURE__*/ _react.createElement(SearchPlaceholderTypography, {
        className: "vkuiSearch__placeholder-text"
    }, placeholder)), isFocused && platform === _platform.Platform.IOS && after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__after-width"
    }, after))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__after"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__icons"
    }, icon && /*#__PURE__*/ _react.createElement(_touch.Touch, {
        onStart: onIconClickStart,
        className: "vkuiSearch__icon"
    }, icon), !!value && /*#__PURE__*/ _react.createElement(_touch.Touch, {
        onStart: onIconCancelClickStart,
        onClick: onCancel,
        className: "vkuiSearch__icon"
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_icons.Icon16Clear, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Cancel, null))), platform === _platform.Platform.IOS && after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSearch__after-in",
        onClick: onCancel
    }, after))));
};

//# sourceMappingURL=Search.js.map