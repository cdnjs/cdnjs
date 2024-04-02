import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import * as React from 'react';
import { ActionSheetItem } from '../ActionSheetItem/ActionSheetItem';
export const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ React.createElement(ActionSheetItem, _object_spread({
        mode: "cancel",
        isCancelItem: true
    }, props), "Отмена");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map