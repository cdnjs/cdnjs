import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
const directionStyle = {
    row: "vkuicomponents__row",
    column: "vkuicomponents__column"
};
export const DropZoneGrid = (_param)=>{
    var { direction = 'column' } = _param, props = _object_without_properties(_param, [
        "direction"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("vkuicomponents__host", directionStyle[direction])
    }, props));
};
DropZoneGrid.displayName = 'DropZoneGrid';

//# sourceMappingURL=DropZoneGrid.js.map