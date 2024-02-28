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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Avatar = require("../Avatar/Avatar");
var _Tappable = require("../Tappable/Tappable");
var _Caption = require("../Typography/Caption/Caption");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Subhead = require("../Typography/Subhead/Subhead");
var stylesSize = {
    s: "vkuiHorizontalCell--size-s",
    m: "vkuiHorizontalCell--size-m",
    l: "vkuiHorizontalCell--size-l"
};
var CellTypography = function(_param) {
    var size = _param.size, children = _param.children, restProps = _object_without_properties._(_param, [
        "size",
        "children"
    ]);
    return size === "s" ? /*#__PURE__*/ _react.createElement(_Caption.Caption, restProps, children) : /*#__PURE__*/ _react.createElement(_Subhead.Subhead, restProps, children);
};
var HorizontalCell = function(_param) {
    var className = _param.className, header = _param.header, style = _param.style, subtitle = _param.subtitle, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_children = _param.children, children = _param_children === void 0 ? /*#__PURE__*/ _react.createElement(_Avatar.Avatar, {
        size: 56
    }) : _param_children, getRootRef = _param.getRootRef, getRef = _param.getRef, extraSubtitle = _param.extraSubtitle, restProps = _object_without_properties._(_param, [
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