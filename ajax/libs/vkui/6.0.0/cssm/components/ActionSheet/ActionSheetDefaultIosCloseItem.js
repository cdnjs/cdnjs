import * as React from 'react';
import { ActionSheetItem } from '../ActionSheetItem/ActionSheetItem';
export const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ React.createElement(ActionSheetItem, {
        mode: "cancel",
        isCancelItem: true,
        ...props
    }, "Отмена");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map