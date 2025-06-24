import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Separator } from "../../Separator/Separator.js";
export const CellButtonGroupSeparator = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Separator, _object_spread_props(_object_spread({
        className: classNames("vkuiCellButtonGroupSeparator__root", className)
    }, restProps), {
        direction: "vertical",
        padding: true
    }));
};

//# sourceMappingURL=CellButtonGroupSeparator.js.map