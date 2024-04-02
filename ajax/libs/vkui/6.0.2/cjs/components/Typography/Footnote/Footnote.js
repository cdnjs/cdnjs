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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Typography = require("../Typography");
const Footnote = (_param)=>{
    var { className, caps, Component = 'span', normalize = true } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, "vkuiFootnote", caps && "vkuiFootnote--caps")
    }, restProps));
};

//# sourceMappingURL=Footnote.js.map