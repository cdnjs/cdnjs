"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Subhead", {
    enumerable: true,
    get: function() {
        return Subhead;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Typography = require("../Typography");
const sizeYClassNames = {
    none: "vkuiSubhead--sizeY-none",
    compact: "vkuiSubhead--sizeY-compact"
};
const Subhead = (_param)=>{
    var { className, Component = 'span', normalize = true, inline = false } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: (0, _vkjs.classNames)(className, "vkuiSubhead", sizeY !== 'regular' && sizeYClassNames[sizeY])
    }, restProps));
};

//# sourceMappingURL=Subhead.js.map