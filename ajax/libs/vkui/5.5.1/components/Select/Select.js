import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { NativeSelect } from "../NativeSelect/NativeSelect";
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export var Select = function(_param) {
    var children = _param.children, _param_options = _param.options, options = _param_options === void 0 ? [] : _param_options, popupDirection = _param.popupDirection, renderOption = _param.renderOption, allowClearButton = _param.allowClearButton, ClearButton = _param.ClearButton, props = _object_without_properties(_param, [
        "children",
        "options",
        "popupDirection",
        "renderOption",
        "allowClearButton",
        "ClearButton"
    ]);
    var hasPointer = useAdaptivityHasPointer();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ React.createElement(CustomSelect, _object_spread({
        options: options,
        popupDirection: popupDirection,
        renderOption: renderOption,
        allowClearButton: allowClearButton,
        ClearButton: ClearButton
    }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ React.createElement(NativeSelect, props, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ React.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map