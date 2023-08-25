import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Text } from "../Typography/Text/Text";
/**
 * @private
 */ export var SelectTypography = function(_param) {
    var _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, children = _param.children, restProps = _object_without_properties(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement(Text, _object_spread({
        weight: selectType === "accent" ? "2" : "3"
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map