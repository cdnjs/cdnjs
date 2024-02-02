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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ActionSheetItem = require("../ActionSheetItem/ActionSheetItem");
var ActionSheetDefaultIosCloseItem = function(props) {
    return /*#__PURE__*/ _react.createElement(_ActionSheetItem.ActionSheetItem, _object_spread._({
        autoClose: true,
        mode: "cancel",
        isCancelItem: true
    }, props), "Отмена");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map