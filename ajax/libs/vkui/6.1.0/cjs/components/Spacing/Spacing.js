"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ALLOWED_SIZES: function() {
        return ALLOWED_SIZES;
    },
    Spacing: function() {
        return Spacing;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _RootComponent = require("../RootComponent/RootComponent");
const ALLOWED_SIZES = [
    '3xs',
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl'
];
const Spacing = (_param)=>{
    var { size = 'm', style: styleProp } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "style"
    ]);
    const style = _object_spread._({}, getSizeStyle(size), styleProp);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiSpacing",
        style: style
    }));
};
function getSizeStyle(size) {
    const sizeValue = getSizeValue(size);
    return {
        height: sizeValue,
        padding: `calc(${sizeValue} / 2px) 0`
    };
}
function getSizeValue(size) {
    return typeof size === 'string' ? `var(--vkui--spacing_size_${size})` : size;
}

//# sourceMappingURL=Spacing.js.map