import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { NativeSelect } from "../NativeSelect/NativeSelect";
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export var Select = function(_param) {
    var children = _param.children, _param_options = _param.options, options = _param_options === void 0 ? [] : _param_options, popupDirection = _param.popupDirection, renderOption = _param.renderOption, props = _object_without_properties(_param, [
        "children",
        "options",
        "popupDirection",
        "renderOption"
    ]);
    var hasPointer = useAdaptivityHasPointer();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ React.createElement(CustomSelect, _object_spread({
        options: options,
        popupDirection: popupDirection,
        renderOption: renderOption
    }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ React.createElement(NativeSelect, props, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ React.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map