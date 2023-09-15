import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { Tappable } from "../Tappable/Tappable";
import { Subhead } from "../Typography/Subhead/Subhead";
import { RichCellIcon } from "./RichCellIcon/RichCellIcon";
var sizeYClassNames = _define_property({
    none: "vkuiRichCell--sizeY-none"
}, SizeType.COMPACT, "vkuiRichCell--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export var RichCell = function(_param) {
    var subhead = _param.subhead, children = _param.children, text = _param.text, caption = _param.caption, before = _param.before, after = _param.after, afterCaption = _param.afterCaption, bottom = _param.bottom, actions = _param.actions, multiline = _param.multiline, className = _param.className, restProps = _object_without_properties(_param, [
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
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className)
    }), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__content-before"
    }, subhead && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "div",
        className: "vkuiRichCell__subhead"
    }, subhead), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__children"
    }, children), text && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__text"
    }, text), caption && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "div",
        className: "vkuiRichCell__caption"
    }, caption)), (after || afterCaption) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__content-after"
    }, after && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__after-children"
    }, after), afterCaption && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__after-caption"
    }, afterCaption))), bottom && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__bottom"
    }, bottom), actions && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiRichCell__actions"
    }, actions)));
};
RichCell.Icon = RichCellIcon;

//# sourceMappingURL=RichCell.js.map