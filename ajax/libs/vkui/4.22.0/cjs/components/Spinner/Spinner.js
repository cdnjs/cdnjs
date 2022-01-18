"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["size"];

var Spinner = function Spinner(_ref) {
  var size = _ref.size,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var SpinnerIcon = _icons.Icon24Spinner;

  if (size === 'large') {
    SpinnerIcon = _icons.Icon44Spinner;
  }

  if (size === 'medium') {
    SpinnerIcon = _icons.Icon32Spinner;
  }

  if (size === 'small') {
    SpinnerIcon = _icons.Icon16Spinner;
  }

  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    role: "status"
  }, restProps, {
    vkuiClass: (0, _getClassName.getClassName)('Spinner', platform)
  }), (0, _jsxRuntime.createScopedElement)(SpinnerIcon, {
    "aria-hidden": "true",
    vkuiClass: "Spinner__self"
  }));
};

Spinner.defaultProps = {
  'size': 'regular',
  'aria-label': 'Загружается...'
};

var _default = /*#__PURE__*/React.memo(Spinner);

exports.default = _default;
//# sourceMappingURL=Spinner.js.map