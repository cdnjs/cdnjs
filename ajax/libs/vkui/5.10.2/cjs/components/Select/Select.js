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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _NativeSelect = require("../NativeSelect/NativeSelect");
var Select = function(_param) {
    var children = _param.children, props = _object_without_properties._(_param, [
        "children"
    ]);
    var _props_options = props.options, options = _props_options === void 0 ? [] : _props_options, searchable = props.searchable, emptyText = props.emptyText, onInputChange = props.onInputChange, filterFn = props.filterFn, popupDirection = props.popupDirection, renderOption = props.renderOption, renderDropdown = props.renderDropdown, fetching = props.fetching, onClose = props.onClose, onOpen = props.onOpen, icon = props.icon, ClearButton = props.ClearButton, allowClearButton = props.allowClearButton, clearButtonTestId = props.clearButtonTestId, dropdownOffsetDistance = props.dropdownOffsetDistance, fixDropdownWidth = props.fixDropdownWidth, forceDropdownPortal = props.forceDropdownPortal, noMaxHeight = props.noMaxHeight, autoHideScrollbar = props.autoHideScrollbar, autoHideScrollbarDelay = props.autoHideScrollbarDelay, labelTextTestId = props.labelTextTestId, nativeSelectTestId = props.nativeSelectTestId, after = props.after, mode = props.mode, restProps = _object_without_properties._(props, [
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
        "fixDropdownWidth",
        "forceDropdownPortal",
        "noMaxHeight",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "labelTextTestId",
        "nativeSelectTestId",
        "after",
        "mode"
    ]);
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    var nativeProps = restProps;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, props), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ _react.createElement(_NativeSelect.NativeSelect, nativeProps, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ _react.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map