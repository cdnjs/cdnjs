import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { ActionSheetItem } from "../ActionSheetItem/ActionSheetItem.js";
export const ActionSheetDefaultIosCloseItem = (_param)=>{
    var { children = 'Отмена' } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    return /*#__PURE__*/ _jsx(ActionSheetItem, _object_spread_props(_object_spread({
        mode: "cancel",
        isCancelItem: true
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map