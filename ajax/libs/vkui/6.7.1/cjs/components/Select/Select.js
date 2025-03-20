"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Select", {
    enumerable: true,
    get: function() {
        return Select;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const _CustomSelect = require("../CustomSelect/CustomSelect");
const _NativeSelect = require("../NativeSelect/NativeSelect");
const Select = (_param)=>{
    var { children, className } = _param, props = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, clearButtonTestId, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, noMaxHeight, autoHideScrollbar, autoHideScrollbarDelay, labelTextTestId, nativeSelectTestId, after, mode, pattern, minLength, maxLength, readOnly, getSelectInputRef, overscrollBehavior, beforeAlign, afterAlign } = props, restProps = _object_without_properties._(props, [
        "options",
        "searchable",
        "emptyText",
        "onInputChange",
        "filterFn",
        "popupDirection",
        "renderOption",
        "renderDropdown",
        "fetching",
        "onClose",
        "onOpen",
        "icon",
        "ClearButton",
        "allowClearButton",
        "clearButtonTestId",
        "dropdownOffsetDistance",
        "dropdownAutoWidth",
        "forceDropdownPortal",
        "noMaxHeight",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "labelTextTestId",
        "nativeSelectTestId",
        "after",
        "mode",
        "pattern",
        "minLength",
        "maxLength",
        "readOnly",
        "getSelectInputRef",
        "overscrollBehavior",
        "beforeAlign",
        "afterAlign"
    ]);
    const { deviceType } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    const nativeProps = restProps;
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
        children: [
            deviceType.desktop && /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelect.CustomSelect, _object_spread._({
                className: (0, _vkjs.classNames)(className, deviceType.desktop.className)
            }, props)),
            deviceType.mobile && /*#__PURE__*/ (0, _jsxruntime.jsx)(_NativeSelect.NativeSelect, _object_spread_props._(_object_spread._({
                className: (0, _vkjs.classNames)(className, deviceType.mobile.className)
            }, nativeProps), {
                children: options.map(({ label, value, disabled })=>/*#__PURE__*/ (0, _jsxruntime.jsx)("option", {
                        value: value,
                        disabled: disabled,
                        children: label
                    }, `${value}`))
            }))
        ]
    });
};

//# sourceMappingURL=Select.js.map