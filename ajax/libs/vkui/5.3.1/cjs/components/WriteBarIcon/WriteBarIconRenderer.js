"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WriteBarIconRenderer", {
    enumerable: true,
    get: function() {
        return WriteBarIconRenderer;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var WriteBarIconRenderer = function(param) {
    var IconCompact = param.IconCompact, IconRegular = param.IconRegular;
    var sizeY = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)().sizeY;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, sizeY.compact && /*#__PURE__*/ _react.createElement(IconCompact, {
        className: sizeY.compact.className
    }), sizeY.regular && /*#__PURE__*/ _react.createElement(IconRegular, {
        className: sizeY.regular.className
    }));
};

//# sourceMappingURL=WriteBarIconRenderer.js.map