import { jsx as _jsx } from "react/jsx-runtime";
import { ActionSheetItem } from "../ActionSheetItem/ActionSheetItem.js";
export const ActionSheetDefaultIosCloseItem = ({ children = 'Отмена', ...restProps })=>{
    return /*#__PURE__*/ _jsx(ActionSheetItem, {
        mode: "cancel",
        isCancelItem: true,
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map