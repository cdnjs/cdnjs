"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceConditionalRender = void 0;
var React = _interopRequireWildcard(require("react"));
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getViewWidthClassName = require("../../helpers/getViewWidthClassName");
var _utils = require("../../lib/utils");
var DeviceConditionalRender = function DeviceConditionalRender(_ref) {
  var mobile = _ref.mobile,
    desktop = _ref.desktop;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    viewWidth = _useAdaptivity.viewWidth;
  return /*#__PURE__*/React.createElement(React.Fragment, null, (0, _utils.hasReactNode)(mobile) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getViewWidthClassName.getViewWidthClassName)("vkuiDeviceConditionalRender__mobile", viewWidth)
  }, mobile), (0, _utils.hasReactNode)(desktop) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getViewWidthClassName.getViewWidthClassName)("vkuiDeviceConditionalRender__desktop", viewWidth)
  }, desktop));
};
exports.DeviceConditionalRender = DeviceConditionalRender;
//# sourceMappingURL=DeviceConditionalRender.js.map