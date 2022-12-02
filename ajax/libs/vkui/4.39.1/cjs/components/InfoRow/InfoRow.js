"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoRow = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _Subhead = require("../Typography/Subhead/Subhead");
var _Headline = require("../Typography/Headline/Headline");
var _utils = require("../../lib/utils");
var _excluded = ["header", "children"];
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */
var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
    Component: "span"
  }, restProps, {
    vkuiClass: "InfoRow",
    weight: "3"
  }), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "span",
    vkuiClass: "InfoRow__header"
  }, header), children);
};
exports.InfoRow = InfoRow;
//# sourceMappingURL=InfoRow.js.map