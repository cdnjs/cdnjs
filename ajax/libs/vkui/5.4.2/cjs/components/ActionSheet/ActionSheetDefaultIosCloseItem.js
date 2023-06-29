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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _actionSheetItem = require("../ActionSheetItem/ActionSheetItem");
var ActionSheetDefaultIosCloseItem = function(props) {
    return /*#__PURE__*/ _react.createElement(_actionSheetItem.ActionSheetItem, _objectSpread({
        autoClose: true,
        mode: "cancel"
    }, props), "Отмена");
};

//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map