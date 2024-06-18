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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Typography = require("../Typography");
const stylesLevel = {
    '1': "vkuiCaption--level-1",
    '2': "vkuiCaption--level-2",
    '3': "vkuiCaption--level-3"
};
const Caption = (_param)=>{
    var { className, level = '1', caps, Component = 'span', normalize = true } = _param, restProps = _object_without_properties._(_param, [
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