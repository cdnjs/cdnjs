import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { RichCellIcon } from './RichCellIcon/RichCellIcon';
const sizeYClassNames = {
    none: "vkuiRichCell--sizeY-none",
    ['compact']: "vkuiRichCell--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */ export const RichCell = (_param)=>{
    var { subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className } = _param, restProps = _object_without_properties(_param, [
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
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== 'regular' && sizeYClassNames[sizeY], className)
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