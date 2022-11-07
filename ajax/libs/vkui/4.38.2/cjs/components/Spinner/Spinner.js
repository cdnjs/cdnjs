"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _excluded = ["size", "aria-label"];

/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */
var Spinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "regular" : _ref$size,
      _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Загружается..." : _ref$ariaLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var SpinnerIcon = {
    small: _icons.Icon16Spinner,
    regular: _icons.Icon24Spinner,
    medium: _icons.Icon32Spinner,
    large: _icons.Icon44Spinner
  }[size];
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    role: "status",
    "aria-label": ariaLabel
  }, restProps, {
    vkuiClass: "Spinner"
  }), (0, _jsxRuntime.createScopedElement)(SpinnerIcon, {
    "aria-hidden": "true",
    vkuiClass: "Spinner__self"
  }));
});
exports.Spinner = Spinner;
Spinner.displayName = "Spinner";
//# sourceMappingURL=Spinner.js.map