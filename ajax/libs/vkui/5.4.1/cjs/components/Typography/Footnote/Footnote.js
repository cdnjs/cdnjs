"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Footnote", {
    enumerable: true,
    get: function() {
        return Footnote;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _typography = require("../Typography");
var Footnote = function(_param) /*#__PURE__*/ {
    var className = _param.className, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _objectWithoutProperties(_param, [
        "className",
        "caps",
        "Component",
        "normalize"
    ]);
    return _react.createElement(_typography.Typography, _objectSpread({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, "vkuiFootnote", caps && "vkuiFootnote--caps")
    }, restProps));
};

//# sourceMappingURL=Footnote.js.map