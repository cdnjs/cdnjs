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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _customSelect = require("../CustomSelect/CustomSelect");
var _nativeSelect = require("../NativeSelect/NativeSelect");
var Select = function(_param) {
    var children = _param.children, _param_options = _param.options, options = _param_options === void 0 ? [] : _param_options, popupDirection = _param.popupDirection, renderOption = _param.renderOption, allowClearButton = _param.allowClearButton, ClearButton = _param.ClearButton, props = _objectWithoutProperties(_param, [
        "children",
        "options",
        "popupDirection",
        "renderOption",
        "allowClearButton",
        "ClearButton"
    ]);
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ _react.createElement(_customSelect.CustomSelect, _objectSpread({
        options: options,
        popupDirection: popupDirection,
        renderOption: renderOption,
        allowClearButton: allowClearButton,
        ClearButton: ClearButton
    }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ _react.createElement(_nativeSelect.NativeSelect, props, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ _react.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map