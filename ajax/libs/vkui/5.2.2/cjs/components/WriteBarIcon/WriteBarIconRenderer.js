"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBarIconRenderer = void 0;
var React = _interopRequireWildcard(require("react"));
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var WriteBarIconRenderer = function WriteBarIconRenderer(_ref) {
  var IconCompact = _ref.IconCompact,
    IconRegular = _ref.IconRegular;
  var _useAdaptivityConditi = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(),
    sizeY = _useAdaptivityConditi.sizeY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizeY.compact && /*#__PURE__*/React.createElement(IconCompact, {
    className: sizeY.compact.className
  }), sizeY.regular && /*#__PURE__*/React.createElement(IconRegular, {
    className: sizeY.regular.className
  }));
};
exports.WriteBarIconRenderer = WriteBarIconRenderer;
//# sourceMappingURL=WriteBarIconRenderer.js.map