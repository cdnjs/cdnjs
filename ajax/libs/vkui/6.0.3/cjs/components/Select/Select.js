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
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
const _CustomSelect = require("../CustomSelect/CustomSelect");
const _NativeSelect = require("../NativeSelect/NativeSelect");
const Select = (_param)=>{
    var { children } = _param, props = _object_without_properties._(_param, [
        "children"
    ]);
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, clearButtonTestId, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, noMaxHeight, autoHideScrollbar, autoHideScrollbarDelay, labelTextTestId, nativeSelectTestId, after, mode } = props, restProps = _object_without_properties._(props, [
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
        "mode"
    ]);
    const hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    const nativeProps = restProps;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, props), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ _react.createElement(_NativeSelect.NativeSelect, nativeProps, options.map(({ label, value })=>/*#__PURE__*/ _react.createElement("option", {
            value: value,
            key: `${value}`
        }, label))));
};

//# sourceMappingURL=Select.js.map