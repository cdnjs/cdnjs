"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subhead = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../../hooks/useAdaptivity");
var _adaptivity = require("../../../lib/adaptivity");
var _excluded = ["className", "children", "weight", "Component"];
var sizeYClassNames = (0, _defineProperty2.default)({
  none: "vkuiSubhead--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSubhead--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Subhead
 */
var Subhead = function Subhead(_ref) {
  var className = _ref.className,
    children = _ref.children,
    weight = _ref.weight,
    _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'h5' : _ref$Component,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)(className, "vkuiSubhead", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], weight && styles["Subhead--weight-".concat(weight)])
  }), children);
};
exports.Subhead = Subhead;
var styles = {
  "Subhead--weight-1": "vkuiSubhead--weight-1",
  "Subhead--weight-2": "vkuiSubhead--weight-2",
  "Subhead--weight-3": "vkuiSubhead--weight-3"
};
//# sourceMappingURL=Subhead.js.map