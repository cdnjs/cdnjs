"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Spinner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _icons = require("@vkontakte/icons");
var _excluded = ["size", "aria-label", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */
var Spinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'regular' : _ref$size,
    _ref$ariaLabel = _ref['aria-label'],
    ariaLabel = _ref$ariaLabel === void 0 ? 'Загружается...' : _ref$ariaLabel,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var SpinnerIcon = {
    small: _icons.Icon16Spinner,
    regular: _icons.Icon24Spinner,
    medium: _icons.Icon32Spinner,
    large: _icons.Icon44Spinner
  }[size];
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    role: "status",
    "aria-label": ariaLabel
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiSpinner", className)
  }), /*#__PURE__*/React.createElement(SpinnerIcon, {
    className: "vkuiSpinner__self"
  }));
});
exports.Spinner = Spinner;
Spinner.displayName = 'Spinner';
//# sourceMappingURL=Spinner.js.map