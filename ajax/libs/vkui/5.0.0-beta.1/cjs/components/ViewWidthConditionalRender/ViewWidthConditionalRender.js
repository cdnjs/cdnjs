"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewWidthConditionalRender = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _getViewWidthClassName = require("../../helpers/getViewWidthClassName");

var _utils = require("../../lib/utils");

var _adaptivity = require("../../lib/adaptivity");

var ViewWidthConditionalRender = function ViewWidthConditionalRender(_ref) {
  var mobile = _ref.mobile,
      desktop = _ref.desktop;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth;

  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (0, _utils.hasReactNode)(mobile) && (viewWidth === undefined || viewWidth < _adaptivity.ViewWidth.TABLET) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _getViewWidthClassName.getViewWidthClassName)("ViewWidthConditionalRender__mobile", viewWidth)
  }, mobile), (0, _utils.hasReactNode)(desktop) && (viewWidth === undefined || viewWidth >= _adaptivity.ViewWidth.TABLET) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _getViewWidthClassName.getViewWidthClassName)("ViewWidthConditionalRender__desktop", viewWidth)
  }, desktop));
};

exports.ViewWidthConditionalRender = ViewWidthConditionalRender;
//# sourceMappingURL=ViewWidthConditionalRender.js.map