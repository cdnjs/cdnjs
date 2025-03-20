"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubnavigationButton", {
    enumerable: true,
    get: function() {
        return SubnavigationButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _Tappable = require("../Tappable/Tappable");
const _Caption = require("../Typography/Caption/Caption");
const _Subhead = require("../Typography/Subhead/Subhead");
const appearanceStyles = {
    accent: "vkuiSubnavigationButton--appearance-accent",
    neutral: "vkuiSubnavigationButton--appearance-neutral"
};
const modeStyles = {
    primary: "vkuiSubnavigationButton--mode-primary",
    outline: "vkuiSubnavigationButton--mode-outline",
    tertiary: "vkuiSubnavigationButton--mode-tertiary"
};
const sizeStyles = {
    s: "vkuiSubnavigationButton--size-s",
    m: "vkuiSubnavigationButton--size-m",
    l: "vkuiSubnavigationButton--size-l"
};
const sizeYClassNames = {
    none: "vkuiSubnavigationButton--sizeY-none",
    compact: "vkuiSubnavigationButton--sizeY-compact"
};
const SubnavigationButtonTypography = (_param)=>{
    var { textLevel } = _param, restProps = _object_without_properties._(_param, [
        "textLevel"
    ]);
    if (textLevel === '1') {
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, _object_spread._({}, restProps));
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Caption.Caption, _object_spread._({
        level: textLevel === '2' ? '1' : '2'
    }, restProps));
};
const SubnavigationButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, expandable, children, className } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "appearance",
        "size",
        "selected",
        "textLevel",
        "before",
        "after",
        "expandable",
        "children",
        "className"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        hasActive: false,
        focusVisibleMode: "outside",
        className: (0, _vkjs.classNames)("vkuiSubnavigationButton", sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && "vkuiSubnavigationButton--selected", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("span", {
            className: "vkuiSubnavigationButton__in",
            children: [
                before && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    className: "vkuiSubnavigationButton__before",
                    children: before
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(SubnavigationButtonTypography, {
                    textLevel: textLevel,
                    className: "vkuiSubnavigationButton__label",
                    Component: "span",
                    children: children
                }),
                after && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                    className: "vkuiSubnavigationButton__after",
                    children: after
                }),
                expandable && /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon16Dropdown, {
                    className: "vkuiSubnavigationButton__expandableIcon"
                })
            ]
        })
    }));
};

//# sourceMappingURL=SubnavigationButton.js.map