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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _avatar = require("../Avatar/Avatar");
var _tappable = require("../Tappable/Tappable");
var _caption = require("../Typography/Caption/Caption");
var _footnote = require("../Typography/Footnote/Footnote");
var _subhead = require("../Typography/Subhead/Subhead");
var CellTypography = function(_param) {
    var size = _param.size, children = _param.children, restProps = _objectWithoutProperties(_param, [
        "size",
        "children"
    ]);
    return size === "s" ? /*#__PURE__*/ _react.createElement(_caption.Caption, restProps, children) : /*#__PURE__*/ _react.createElement(_subhead.Subhead, restProps, children);
};
var HorizontalCell = function(_param) {
    var className = _param.className, header = _param.header, style = _param.style, subtitle = _param.subtitle, _param_size = _param.size, size = _param_size === void 0 ? "s" : _param_size, _param_children = _param.children, children = _param_children === void 0 ? /*#__PURE__*/ _react.createElement(_avatar.Avatar, {
        size: 56
    }) : _param_children, getRootRef = _param.getRootRef, getRef = _param.getRef, extraSubtitle = _param.extraSubtitle, restProps = _objectWithoutProperties(_param, [
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
        className: (0, _vkjs.classNames)("vkuiHorizontalCell", {
            s: "vkuiHorizontalCell--size-s",
            m: "vkuiHorizontalCell--size-m",
            l: "vkuiHorizontalCell--size-l"
        }[size], className)
    }, /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpread({
        className: "vkuiHorizontalCell__body",
        getRootRef: getRef
    }, restProps), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalCell__image"
    }, children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiHorizontalCell__content"
    }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(CellTypography, {
        size: size
    }, header), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, subtitle), (0, _vkjs.hasReactNode)(extraSubtitle) && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, extraSubtitle))));
};

//# sourceMappingURL=HorizontalCell.js.map