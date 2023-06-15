"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["mode", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */
var Badge = function Badge(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'new' : _ref$mode,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiBadge", styles["Badge--mode-".concat(mode)], className)
  }, restProps));
};
exports.Badge = Badge;
var styles = {
  "Badge--mode-new": "vkuiBadge--mode-new",
  "Badge--mode-prominent": "vkuiBadge--mode-prominent"
};
//# sourceMappingURL=Badge.js.map