"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Header", {
    enumerable: true,
    get: function() {
        return Header;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _RootComponent = require("../RootComponent/RootComponent");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Headline = require("../Typography/Headline/Headline");
const _Paragraph = require("../Typography/Paragraph/Paragraph");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Title = require("../Typography/Title/Title");
const HeaderContent = (_param)=>{
    var { mode, size } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "size"
    ]);
    const isLarge = size === 'large';
    const platform = (0, _usePlatform.usePlatform)();
    if (platform === 'ios') {
        switch(mode){
            case 'primary':
                return isLarge ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, _object_spread._({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, _object_spread._({
                    weight: "1",
                    level: "3"
                }, restProps));
            case 'secondary':
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, _object_spread._({
                    weight: "1",
                    caps: true
                }, restProps));
            case 'tertiary':
                return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, _object_spread._({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    switch(mode){
        case 'primary':
            return isLarge ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, _object_spread._({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, _object_spread._({
                weight: "2"
            }, restProps));
        case 'secondary':
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, _object_spread._({
                weight: "1",
                caps: true
            }, restProps));
        case 'tertiary':
            return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, _object_spread._({
                weight: "2"
            }, restProps));
    }
    return null;
};
const stylesMode = {
    primary: "vkuiHeader--mode-primary",
    secondary: "vkuiHeader--mode-secondary",
    tertiary: "vkuiHeader--mode-tertiary"
};
const Header = (_param)=>{
    var { mode = 'primary', size = 'regular', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "size",
        "Component",
        "children",
        "subtitle",
        "subtitleComponent",
        "indicator",
        "aside",
        "multiline",
        "before",
        "beforeTitle",
        "afterTitle",
        "beforeSubtitle",
        "afterSubtitle"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiHeader", stylesMode[mode], size === 'large' && "vkuiHeader--large", (0, _vkjs.isPrimitiveReactNode)(indicator) && "vkuiHeader--pi", (0, _vkjs.hasReactNode)(subtitle) && "vkuiHeader--with-subtitle"),
        children: [
            before && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: (0, _vkjs.classNames)("vkuiHeader__before", subtitle && "vkuiHeader__before--withSubtitle"),
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiHeader__main",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)(HeaderContent, {
                        className: "vkuiHeader__content",
                        Component: Component,
                        mode: mode,
                        size: size,
                        children: [
                            beforeTitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiHeader__content__before",
                                children: beforeTitle
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                className: (0, _vkjs.classNames)("vkuiHeader__content-in", multiline && "vkuiHeader__content--multiline"),
                                children: children
                            }),
                            afterTitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiHeader__content__after",
                                children: afterTitle
                            }),
                            (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                                className: "vkuiHeader__indicator",
                                weight: "2",
                                children: indicator
                            })
                        ]
                    }),
                    (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiHeader__subtitleWrapper",
                        children: [
                            beforeSubtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiHeader__subtitleBefore",
                                children: beforeSubtitle
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                                className: (0, _vkjs.classNames)("vkuiHeader__subtitle", multiline && "vkuiHeader__content--multiline"),
                                Component: subtitleComponent,
                                children: subtitle
                            }),
                            afterSubtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiHeader__subtitleAfter",
                                children: afterSubtitle
                            })
                        ]
                    })
                ]
            }),
            (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Paragraph.Paragraph, {
                className: "vkuiHeader__aside",
                Component: "span",
                children: aside
            })
        ]
    }));
};

//# sourceMappingURL=Header.js.map