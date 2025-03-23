import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import { ActionSheetItem } from '../ActionSheetItem/ActionSheetItem';
export const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ _jsx(ActionSheetItem, _object_spread_props(_object_spread({
        mode: "cancel",
        isCancelItem: true
    }, props), {
        children: "Отмена"
    }));
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map