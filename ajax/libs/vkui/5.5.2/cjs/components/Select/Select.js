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
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _NativeSelect = require("../NativeSelect/NativeSelect");
var Select = function(_param) {
    var children = _param.children, _param_options = _param.options, options = _param_options === void 0 ? [] : _param_options, popupDirection = _param.popupDirection, renderOption = _param.renderOption, allowClearButton = _param.allowClearButton, ClearButton = _param.ClearButton, props = _object_without_properties._(_param, [
        "children",
        "options",
        "popupDirection",
        "renderOption",
        "allowClearButton",
        "ClearButton"
    ]);
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ _react.createElement(_CustomSelect.CustomSelect, _object_spread._({
        options: options,
        popupDirection: popupDirection,
        renderOption: renderOption,
        allowClearButton: allowClearButton,
        ClearButton: ClearButton
    }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ _react.createElement(_NativeSelect.NativeSelect, props, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ _react.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map