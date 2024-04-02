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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _Tappable = require("../Tappable/Tappable");
const _Subhead = require("../Typography/Subhead/Subhead");
const _RichCellIcon = require("./RichCellIcon/RichCellIcon");
const sizeYClassNames = {
    none: "vkuiRichCell--sizeY-none",
    ['compact']: "vkuiRichCell--sizeY-compact"
};
const RichCell = (_param)=>{
    var { subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className } = _param, restProps = _object_without_properties._(_param, [
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
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== 'regular' && sizeYClassNames[sizeY], className)
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