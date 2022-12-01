"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDefaultIosCloseItem = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _ActionSheetItem = require("../ActionSheetItem/ActionSheetItem");
var ActionSheetDefaultIosCloseItem = function ActionSheetDefaultIosCloseItem(props) {
  return /*#__PURE__*/React.createElement(_ActionSheetItem.ActionSheetItem, (0, _extends2.default)({
    autoClose: true,
    mode: "cancel"
  }, props), "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C");
};
exports.ActionSheetDefaultIosCloseItem = ActionSheetDefaultIosCloseItem;
//# sourceMappingURL=ActionSheetDefaultIosCloseItem.js.map