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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Typography = require("../Typography");
var stylesLevel = {
    "1": "vkuiCaption--level-1",
    "2": "vkuiCaption--level-2",
    "3": "vkuiCaption--level-3"
};
var Caption = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties._(_param, [
        "className",
        "level",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, caps && "vkuiCaption--caps", stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Caption.js.map