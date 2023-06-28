import * as React from 'react';
import { ActionSheetItem } from '../ActionSheetItem/ActionSheetItem';
export const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ React.createElement(ActionSheetItem, {
        autoClose: true,
        mode: "cancel",
        ...props
    }, "Отменить");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map