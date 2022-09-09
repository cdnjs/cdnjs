"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeXConditionalRender = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getSizeXClassName = require("../../helpers/getSizeXClassName");

var _utils = require("../../lib/utils");

var _adaptivity = require("../../lib/adaptivity");

var SizeXConditionalRender = function SizeXConditionalRender(_ref) {
  var compact = _ref.compact,
      regular = _ref.regular;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _utils.hasReactNode)(compact) && (sizeX === undefined || sizeX === _adaptivity.SizeType.COMPACT) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getSizeXClassName.getSizeXClassName)("SizeXCompact", sizeX))
  }, compact), (0, _utils.hasReactNode)(regular) && (sizeX === undefined || sizeX === _adaptivity.SizeType.REGULAR) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getSizeXClassName.getSizeXClassName)("SizeXRegular", sizeX))
  }, regular));
};

exports.SizeXConditionalRender = SizeXConditionalRender;
//# sourceMappingURL=SizeXConditionalRender.js.map