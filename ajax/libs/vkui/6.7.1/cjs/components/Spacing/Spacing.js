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
    CUSTOM_CSS_TOKEN_FOR_USER_GAP: function() {
        return CUSTOM_CSS_TOKEN_FOR_USER_GAP;
    },
    Spacing: function() {
        return Spacing;
    },
    sizesClassNames: function() {
        return sizesClassNames;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--Spacing_gap';
const sizesClassNames = {
    '3xs': "vkuiSpacing--3xs",
    '2xs': "vkuiSpacing--2xs",
    'xs': "vkuiSpacing--xs",
    's': "vkuiSpacing--s",
    'm': "vkuiSpacing--m",
    'l': "vkuiSpacing--l",
    'xl': "vkuiSpacing--xl",
    '2xl': "vkuiSpacing--2xl",
    '3xl': "vkuiSpacing--3xl",
    '4xl': "vkuiSpacing--4xl"
};
const Spacing = (_param)=>{
    var { size = 'm', style } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "style"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        style: _object_spread._({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: `${size}px`
        }, style),
        baseClassName: (0, _vkjs.classNames)("vkuiSpacing", typeof size === 'string' && sizesClassNames[size])
    }));
};

//# sourceMappingURL=Spacing.js.map