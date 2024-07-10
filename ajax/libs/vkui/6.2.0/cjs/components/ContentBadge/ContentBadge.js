"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContentBadge", {
    enumerable: true,
    get: function() {
        return ContentBadge;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Caption = require("../Typography/Caption/Caption");
const _Footnote = require("../Typography/Footnote/Footnote");
const _ContentBadgeContext = require("./ContentBadgeContext");
const _ContentBadgeSlotIcon = require("./ContentBadgeSlotIcon");
const appearanceClassNames = {
    'accent': {
        primary: "vkuiContentBadge--primary-accent",
        secondary: "vkuiContentBadge--secondary-accent",
        outline: "vkuiContentBadge--outline-accent"
    },
    'neutral': {
        primary: "vkuiContentBadge--primary-neutral",
        secondary: "vkuiContentBadge--secondary-neutral",
        outline: "vkuiContentBadge--outline-neutral"
    },
    'accent-green': {
        primary: "vkuiContentBadge--primary-accent-green",
        secondary: "vkuiContentBadge--secondary-accent-green",
        outline: "vkuiContentBadge--outline-accent-green"
    },
    'accent-red': {
        primary: "vkuiContentBadge--primary-accent-red",
        secondary: "vkuiContentBadge--secondary-accent-red",
        outline: "vkuiContentBadge--outline-accent-red"
    },
    'overlay': {
        primary: "vkuiContentBadge--primary-overlay",
        secondary: "vkuiContentBadge--secondary-overlay",
        outline: "vkuiContentBadge--outline-overlay"
    }
};
const sizeClassNames = {
    s: "vkuiContentBadge--size-s",
    m: "vkuiContentBadge--size-m",
    l: "vkuiContentBadge--size-l"
};
const ContentBadge = (_param)=>{
    var { appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', className, children } = _param, restProps = _object_without_properties._(_param, [
        "appearance",
        "mode",
        "capsule",
        "size",
        "weight",
        "className",
        "children"
    ]);
    const TypographyComponent = size === 'l' ? _Footnote.Footnote : _Caption.Caption;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(TypographyComponent, _object_spread_props._(_object_spread._({}, restProps), {
        weight: weight,
        normalize: true,
        className: (0, _vkjs.classNames)(className, "vkuiContentBadge", size !== 's' && capsule && "vkuiContentBadge--capsule", mode === 'outline' && "vkuiContentBadge--mode-outline", appearanceClassNames[appearance][mode], sizeClassNames[size]),
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_ContentBadgeContext.ContentBadgeContext.Provider, {
            value: {
                isSingleChild: _react.Children.count(children) === 1,
                size
            },
            children: children
        })
    }));
};
ContentBadge.displayName = 'ContentBadge';
ContentBadge.SlotIcon = _ContentBadgeSlotIcon.ContentBadgeSlotIcon;
ContentBadge.SlotIcon.displayName = 'ContentBadge.SlotIcon';

//# sourceMappingURL=ContentBadge.js.map