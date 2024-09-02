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
    var { size = 'm', style, className } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "style",
        "className"
    ]);
    if (typeof size === 'string') {
        className = className ? (0, _vkjs.classNames)(sizesClassNames[size], className) : sizesClassNames[size];
    } else {
        if (style) {
            // @ts-expect-error: TS7053 В React.CSSProperties не учитывается Custom Properties
            style[CUSTOM_CSS_TOKEN_FOR_USER_GAP] = size;
        } else {
            // @ts-expect-error: TS2353 В React.CSSProperties не учитывается Custom Properties
            style = {
                [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: size
            };
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        style: style,
        className: className,
        baseClassName: "vkuiSpacing"
    }));
};

//# sourceMappingURL=Spacing.js.map