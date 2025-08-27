import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { SimpleCell } from "../SimpleCell/SimpleCell.js";
export const appearanceClassNames = {
    accent: "vkuiCellButton__appearanceAccent",
    neutral: "vkuiCellButton__appearanceNeutral",
    negative: "vkuiCellButton__appearanceNegative"
};
/**
 * @see https://vkui.io/components/cell-button
 */ export const CellButton = (_param)=>{
    var { centered = false, appearance = 'accent', className } = _param, restProps = _object_without_properties(_param, [
        "centered",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ _jsx(SimpleCell, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiCellButton__host", appearanceClassNames[appearance], centered && "vkuiCellButton__centered", className)
    }));
};

//# sourceMappingURL=CellButton.js.map