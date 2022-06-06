"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _excluded = ["mode"];

/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */
var Badge = function Badge(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "new" : _ref$mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("Badge", "Badge--".concat(mode))
  }, restProps));
};

exports.Badge = Badge;
//# sourceMappingURL=Badge.js.map