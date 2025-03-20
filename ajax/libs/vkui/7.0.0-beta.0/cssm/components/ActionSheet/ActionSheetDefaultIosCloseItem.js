import { jsx as _jsx } from "react/jsx-runtime";
import { ActionSheetItem } from "../ActionSheetItem/ActionSheetItem.js";
export const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ _jsx(ActionSheetItem, {
        mode: "cancel",
        isCancelItem: true,
        ...props,
        children: "Отмена"
    });
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map