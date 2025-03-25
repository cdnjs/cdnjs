"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DisplayTitle", {
    enumerable: true,
    get: function() {
        return DisplayTitle;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Typography = require("../Typography");
const stylesLevel = {
    '1': "vkuiDisplayTitle--level-1",
    '2': "vkuiDisplayTitle--level-2",
    '3': "vkuiDisplayTitle--level-3",
    '4': "vkuiDisplayTitle--level-4"
};
const sizeYClassNames = {
    none: "vkuiDisplayTitle--sizeY-none",
    compact: "vkuiDisplayTitle--sizeY-compact"
};
const DisplayTitle = (_param)=>{
    var { className, level = '1', Component = 'span', normalize = true, inline = false } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "level",
        "Component",
        "normalize",
        "inline"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        inline: inline,
        className: (0, _vkjs.classNames)(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=DisplayTitle.js.map