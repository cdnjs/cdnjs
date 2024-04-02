"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HorizontalCell", {
    enumerable: true,
    get: function() {
        return HorizontalCell;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Avatar = require("../Avatar/Avatar");
const _Tappable = require("../Tappable/Tappable");
const _Caption = require("../Typography/Caption/Caption");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Subhead = require("../Typography/Subhead/Subhead");
const stylesSize = {
    s: "vkuiHorizontalCell--size-s",
    m: "vkuiHorizontalCell--size-m",
    l: "vkuiHorizontalCell--size-l"
};
const CellTypography = (_param)=>{
    var { size, children } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "children"
    ]);
    return size === 's' ? /*#__PURE__*/ _react.createElement(_Caption.Caption, restProps, children) : /*#__PURE__*/ _react.createElement(_Subhead.Subhead, restProps, children);
};
const HorizontalCell = (_param)=>{
    var { className, header, style, subtitle, size = 's', children = /*#__PURE__*/ _react.createElement(_Avatar.Avatar, {
        size: 56
    }), getRootRef, getRef, extraSubtitle } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "header",
        "style",
        "subtitle",
        "size",
        "children",
        "getRootRef",
        "getRef",
        "extraSubtitle"
    ]);
    return /*#__PURE__*/ _react.createElement("div", {
        ref: getRootRef,
        style: style,
        className: (0, _vkjs.classNames)("vkuiHorizontalCell", stylesSize[size], className)
    }, /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        className: "vkuiHorizontalCell__body",
        getRootRef: getRef
    }, restProps), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalCell__image"
    }, children), (header || subtitle || extraSubtitle) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalCell__content"
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(CellTypography, {
        size: size
    }, header), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, subtitle), (0, _vkjs.hasReactNode)(extraSubtitle) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, extraSubtitle))));
};

//# sourceMappingURL=HorizontalCell.js.map