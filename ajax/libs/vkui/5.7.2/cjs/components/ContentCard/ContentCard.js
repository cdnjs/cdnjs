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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Card = require("../Card/Card");
var _Tappable = require("../Tappable/Tappable");
var _Caption = require("../Typography/Caption/Caption");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _Text = require("../Typography/Text/Text");
var ContentCard = function(_param) {
    var subtitle = _param.subtitle, header = _param.header, text = _param.text, caption = _param.caption, // card props
    className = _param.className, _param_mode = _param.mode, mode = _param_mode === void 0 ? "shadow" : _param_mode, style = _param.style, getRootRef = _param.getRootRef, // img props
    getRef = _param.getRef, maxHeight = _param.maxHeight, src = _param.src, srcSet = _param.srcSet, _param_alt = _param.alt, alt = _param_alt === void 0 ? "" : _param_alt, width = _param.width, height = _param.height, crossOrigin = _param.crossOrigin, decoding = _param.decoding, loading = _param.loading, referrerPolicy = _param.referrerPolicy, sizes = _param.sizes, useMap = _param.useMap, _param_hasHover = _param.hasHover, hasHover = _param_hasHover === void 0 ? false : _param_hasHover, _param_hasActive = _param.hasActive, hasActive = _param_hasActive === void 0 ? false : _param_hasActive, restProps = _object_without_properties._(_param, [
        "subtitle",
        "header",
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
        "hasHover",
        "hasActive"
    ]);
    return /*#__PURE__*/ _react.createElement(_Card.Card, {
        mode: mode,
        getRootRef: getRootRef,
        style: style,
        className: (0, _vkjs.classNames)(restProps.disabled && "vkuiContentCard--disabled", className)
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        disabled: restProps.disabled || !restProps.onClick && !restProps.href,
        hasHover: hasHover,
        hasActive: hasActive,
        className: "vkuiContentCard__tappable"
    }), (src || srcSet) && /*#__PURE__*/ _react.createElement("img", {
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
        useMap: useMap,
        height: height,
        style: {
            maxHeight: maxHeight
        },
        width: "100%"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiContentCard__body"
    }, (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ _react.createElement(_Caption.Caption, {
        className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__subtitle"),
        weight: "1",
        level: "3",
        caps: true
    }, subtitle), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        className: "vkuiContentCard__text",
        weight: "2",
        level: "1"
    }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiContentCard__text"
    }, text), (0, _vkjs.hasReactNode)(caption) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__caption")
    }, caption))));
};

//# sourceMappingURL=ContentCard.js.map