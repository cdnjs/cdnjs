"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeYConditionalRender = void 0;
var React = _interopRequireWildcard(require("react"));
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _utils = require("../../lib/utils");
var _adaptivity = require("../../lib/adaptivity");
var SizeYConditionalRender = function SizeYConditionalRender(_ref) {
  var compact = _ref.compact,
    regular = _ref.regular;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, (0, _utils.hasReactNode)(compact) && (sizeY === undefined || sizeY === _adaptivity.SizeType.COMPACT) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getSizeYClassName.getSizeYClassName)("vkuiSizeYCompact", sizeY)
  }, compact), (0, _utils.hasReactNode)(regular) && (sizeY === undefined || sizeY === _adaptivity.SizeType.REGULAR) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getSizeYClassName.getSizeYClassName)("vkuiSizeYRegular", sizeY)
  }, regular));
};
exports.SizeYConditionalRender = SizeYConditionalRender;
//# sourceMappingURL=SizeYConditionalRender.js.map