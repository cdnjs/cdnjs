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

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _platform = require("../../lib/platform");

var _utils = require("../../lib/utils");

var _excluded = ["size", "platform"],
    _excluded2 = ["mode", "size", "children"];

var CounterTypography = function CounterTypography(_ref) {
  var size = _ref.size,
      platform = _ref.platform,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return size === 's' ? (0, _jsxRuntime.createScopedElement)(_Caption.default, (0, _extends2.default)({
    level: "2",
    weight: platform === _platform.VKCOM ? 'medium' : 'regular'
  }, restProps)) : (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
    weight: "medium"
  }, restProps));
};

var Counter = function Counter(props) {
  var mode = props.mode,
      size = props.size,
      children = props.children,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();

  if (React.Children.count(children) === 0) {
    return null;
  }

  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Counter', platform), "Counter--".concat(mode), "Counter--s-".concat(size))
  }), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)(CounterTypography, {
    platform: platform,
    size: size,
    vkuiClass: "Counter__in"
  }, children));
};

Counter.defaultProps = {
  mode: 'secondary',
  size: 'm'
};

var _default = /*#__PURE__*/React.memo(Counter);

exports.default = _default;
//# sourceMappingURL=Counter.js.map