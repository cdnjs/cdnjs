"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Caption", {
    enumerable: true,
    get: function() {
        return Caption;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _typography = require("../Typography");
var Caption = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _objectWithoutProperties(_param, [
        "className",
        "level",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ _react.createElement(_typography.Typography, _objectSpread({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, caps && "vkuiCaption--caps", {
            "1": "vkuiCaption--level-1",
            "2": "vkuiCaption--level-2",
            "3": "vkuiCaption--level-3"
        }[level])
    }, restProps));
};

//# sourceMappingURL=Caption.js.map