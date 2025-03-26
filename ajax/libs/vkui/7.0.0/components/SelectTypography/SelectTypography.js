import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "../Typography/Text/Text.js";
/**
 * @private
 */ export const SelectTypography = (_param)=>{
    var { selectType = 'default', children } = _param, restProps = _object_without_properties(_param, [
        "selectType",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
        weight: selectType === 'accent' ? '2' : '3'
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=SelectTypography.js.map