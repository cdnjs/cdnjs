"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoRow = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Headline = require("../Typography/Headline/Headline");
var _excluded = ["header", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */
var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Headline.Headline, (0, _extends2.default)({}, restProps, {
    Component: "span",
    className: (0, _vkjs.classNames)("vkuiInfoRow", className),
    weight: "3"
  }), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    Component: "span",
    className: "vkuiInfoRow__header"
  }, header), children);
};
exports.InfoRow = InfoRow;
//# sourceMappingURL=InfoRow.js.map