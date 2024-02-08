"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetDefaultIosCloseItem", {
    enumerable: true,
    get: function() {
        return ActionSheetDefaultIosCloseItem;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ActionSheetItem = require("../ActionSheetItem/ActionSheetItem");
const ActionSheetDefaultIosCloseItem = (props)=>{
    return /*#__PURE__*/ _react.createElement(_ActionSheetItem.ActionSheetItem, _object_spread._({
        mode: "cancel",
        isCancelItem: true
    }, props), "Отмена");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map