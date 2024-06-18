"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Headline", {
    enumerable: true,
    get: function() {
        return Headline;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const _Typography = require("../Typography");
const stylesLevel = {
    '1': "vkuiHeadline--level-1",
    '2': "vkuiHeadline--level-2"
};
const sizeYClassNames = {
    none: "vkuiHeadline--sizeY-none",
    ['compact']: "vkuiHeadline--sizeY-compact"
};
const Headline = (_param)=>{
    var { className, weight = '3', level = '1', Component = 'span', normalize = true } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "weight",
        "level",
        "Component",
        "normalize"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        weight: weight,
        className: (0, _vkjs.classNames)(className, sizeY !== 'regular' && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Headline.js.map