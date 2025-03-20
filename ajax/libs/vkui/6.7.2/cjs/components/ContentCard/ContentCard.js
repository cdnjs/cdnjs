"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContentCard", {
    enumerable: true,
    get: function() {
        return ContentCard;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _utils = require("../../lib/utils");
const _Card = require("../Card/Card");
const _Tappable = require("../Tappable/Tappable");
const _Caption = require("../Typography/Caption/Caption");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Headline = require("../Typography/Headline/Headline");
const _Text = require("../Typography/Text/Text");
const ContentCard = (_param)=>{
    var { subtitle, header, headerComponent = 'span', text, caption, // card props
    className, mode = 'shadow', style, getRootRef, // img props
    getRef, maxHeight, src, srcSet, alt = '', width, height, crossOrigin, decoding, loading, referrerPolicy, sizes, useMap, fetchPriority, hasHover = false, hasActive = false, // TODO [>=7]: поменять тег на li https://github.com/VKCOM/VKUI/issues/7336
    Component = 'div' } = _param, restProps = _object_without_properties._(_param, [
        "subtitle",
        "header",
        "headerComponent",
        "text",
        "caption",
        "className",
        "mode",
        "style",
        "getRootRef",
        "getRef",
        "maxHeight",
        "src",
        "srcSet",
        "alt",
        "width",
        "height",
        "crossOrigin",
        "decoding",
        "loading",
        "referrerPolicy",
        "sizes",
        "useMap",
        "fetchPriority",
        "hasHover",
        "hasActive",
        "Component"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Card.Card, {
        mode: mode,
        getRootRef: getRootRef,
        Component: Component,
        style: style,
        className: (0, _vkjs.classNames)(restProps.disabled && "vkuiContentCard--disabled", className),
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
            hasHover: hasHover,
            hasActive: hasActive,
            className: "vkuiContentCard__tappable",
            children: [
                (src || srcSet) && /*#__PURE__*/ (0, _jsxruntime.jsx)("img", _object_spread_props._(_object_spread._({
                    ref: getRef,
                    className: "vkuiContentCard__img",
                    src: src,
                    srcSet: srcSet,
                    alt: alt,
                    crossOrigin: crossOrigin,
                    decoding: decoding,
                    loading: loading,
                    referrerPolicy: referrerPolicy,
                    sizes: sizes,
                    useMap: useMap
                }, (0, _utils.getFetchPriorityProp)(fetchPriority)), {
                    height: height,
                    style: {
                        maxHeight
                    },
                    width: "100%"
                })),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    className: "vkuiContentCard__body",
                    children: [
                        (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Caption.Caption, {
                            className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__subtitle"),
                            weight: "1",
                            level: "3",
                            caps: true,
                            children: subtitle
                        }),
                        (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, {
                            className: "vkuiContentCard__text",
                            weight: "2",
                            level: "1",
                            Component: headerComponent,
                            children: header
                        }),
                        (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
                            className: "vkuiContentCard__text",
                            children: text
                        }),
                        (0, _vkjs.hasReactNode)(caption) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                            className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__caption"),
                            children: caption
                        })
                    ]
                })
            ]
        }))
    });
};

//# sourceMappingURL=ContentCard.js.map