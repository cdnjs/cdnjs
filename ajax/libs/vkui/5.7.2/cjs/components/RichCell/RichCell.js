"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichCell", {
    enumerable: true,
    get: function() {
        return RichCell;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var _RichCellIcon = require("./RichCellIcon/RichCellIcon");
var sizeYClassNames = _define_property._({
    none: "vkuiRichCell--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiRichCell--sizeY-compact");
var RichCell = function(_param) {
    var subhead = _param.subhead, children = _param.children, text = _param.text, caption = _param.caption, before = _param.before, after = _param.after, afterCaption = _param.afterCaption, bottom = _param.bottom, actions = _param.actions, multiline = _param.multiline, className = _param.className, restProps = _object_without_properties._(_param, [
        "subhead",
        "children",
        "text",
        "caption",
        "before",
        "after",
        "afterCaption",
        "bottom",
        "actions",
        "multiline",
        "className"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className)
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content-before"
    }, subhead && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        Component: "div",
        className: "vkuiRichCell__subhead"
    }, subhead), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__children"
    }, children), text && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__text"
    }, text), caption && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        Component: "div",
        className: "vkuiRichCell__caption"
    }, caption)), (after || afterCaption) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content-after"
    }, after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__after-children"
    }, after), afterCaption && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__after-caption"
    }, afterCaption))), bottom && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__bottom"
    }, bottom), actions && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__actions"
    }, actions)));
};
RichCell.Icon = _RichCellIcon.RichCellIcon;

//# sourceMappingURL=RichCell.js.map