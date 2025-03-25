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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Typography = require("../Typography");
const sizeYClassNames = {
    none: "vkuiFootnote--sizeY-none",
    compact: "vkuiFootnote--sizeY-compact"
};
const Footnote = (_param)=>{
    var { className, caps, Component = 'span', normalize = true, inline = false } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "caps",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: (0, _vkjs.classNames)(className, sizeY !== 'regular' && sizeYClassNames[sizeY], "vkuiFootnote", caps && "vkuiFootnote--caps")
    }, restProps));
};

//# sourceMappingURL=Footnote.js.map