"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdaptiveIconRenderer", {
    enumerable: true,
    get: function() {
        return AdaptiveIconRenderer;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const AdaptiveIconRenderer = ({ IconCompact, IconRegular })=>{
    const { sizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, sizeY.compact && /*#__PURE__*/ _react.createElement(IconCompact, {
        className: sizeY.compact.className
    }), sizeY.regular && /*#__PURE__*/ _react.createElement(IconRegular, {
        className: sizeY.regular.className
    }));
};

//# sourceMappingURL=AdaptiveIconRenderer.js.map