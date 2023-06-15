"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["mode", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */
var RadioGroup = function RadioGroup(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'vertical' : _ref$mode,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiRadioGroup", styles["RadioGroup--mode-".concat(mode)], className)
  }, restProps), children);
};
exports.RadioGroup = RadioGroup;
var styles = {
  "RadioGroup--mode-horizontal": "vkuiRadioGroup--mode-horizontal",
  "RadioGroup--mode-vertical": "vkuiRadioGroup--mode-vertical"
};
//# sourceMappingURL=RadioGroup.js.map