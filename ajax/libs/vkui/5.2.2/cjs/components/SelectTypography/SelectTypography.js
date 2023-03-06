"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTypography = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _excluded = ["selectType", "children", "className"];
var sizeYClassNames = {
  none: "vkuiSelectTypography--sizeY-none",
  compact: "vkuiSelectTypography--sizeY-compact"
};
var platformClassNames = {
  vkcom: "vkuiSelectTypography--vkcom",
  android: "vkuiSelectTypography--android"
};
var selectTypeClassNames = {
  default: "vkuiSelectTypography--selectType-default",
  plain: "vkuiSelectTypography--selectType-plain",
  accent: "vkuiSelectTypography--selectType-accent"
};
/**
 * @private
 */
var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelectTypography", platformClassNames[platform], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], selectTypeClassNames[selectType], className)
  }, restProps), children);
};
exports.SelectTypography = SelectTypography;
//# sourceMappingURL=SelectTypography.js.map