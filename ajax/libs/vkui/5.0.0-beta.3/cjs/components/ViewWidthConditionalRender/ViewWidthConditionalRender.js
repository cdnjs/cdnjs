"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewWidthConditionalRender = void 0;
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, (0, _utils.hasReactNode)(mobile) && (viewWidth === undefined || viewWidth < _adaptivity.ViewWidth.TABLET) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getViewWidthClassName.getViewWidthClassName)("vkuiViewWidthConditionalRender__mobile", viewWidth)
  }, mobile), (0, _utils.hasReactNode)(desktop) && (viewWidth === undefined || viewWidth >= _adaptivity.ViewWidth.TABLET) && /*#__PURE__*/React.createElement("div", {
    className: (0, _getViewWidthClassName.getViewWidthClassName)("vkuiViewWidthConditionalRender__desktop", viewWidth)
  }, desktop));
};
exports.ViewWidthConditionalRender = ViewWidthConditionalRender;
//# sourceMappingURL=ViewWidthConditionalRender.js.map