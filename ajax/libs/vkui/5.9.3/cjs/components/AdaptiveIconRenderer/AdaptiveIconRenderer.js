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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var AdaptiveIconRenderer = function(param) {
    var IconCompact = param.IconCompact, IconRegular = param.IconRegular;
    var sizeY = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)().sizeY;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, sizeY.compact && /*#__PURE__*/ _react.createElement(IconCompact, {
        className: sizeY.compact.className
    }), sizeY.regular && /*#__PURE__*/ _react.createElement(IconRegular, {
        className: sizeY.regular.className
    }));
};

//# sourceMappingURL=AdaptiveIconRenderer.js.map