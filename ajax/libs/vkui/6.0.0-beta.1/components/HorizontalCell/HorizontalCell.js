import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Avatar } from '../Avatar/Avatar';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Subhead } from '../Typography/Subhead/Subhead';
const stylesSize = {
    s: "vkuiHorizontalCell--size-s",
    m: "vkuiHorizontalCell--size-m",
    l: "vkuiHorizontalCell--size-l"
};
const CellTypography = (_param)=>{
    var { size, children } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children"
    ]);
    return size === 's' ? /*#__PURE__*/ React.createElement(Caption, restProps, children) : /*#__PURE__*/ React.createElement(Subhead, restProps, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */ export const HorizontalCell = (_param)=>{
    var { className, header, style, subtitle, size = 's', children = /*#__PURE__*/ React.createElement(Avatar, {
        size: 56
    }), getRootRef, getRef, extraSubtitle } = _param, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: style,
        className: classNames("vkuiHorizontalCell", stylesSize[size], className)
    }, /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: "vkuiHorizontalCell__body",
        getRootRef: getRef
    }, restProps), hasReactNode(children) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHorizontalCell__image"
    }, children), (header || subtitle || extraSubtitle) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHorizontalCell__content"
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(CellTypography, {
        size: size
    }, header), hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, subtitle), hasReactNode(extraSubtitle) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiHorizontalCell__subtitle"
    }, extraSubtitle))));
};

//# sourceMappingURL=HorizontalCell.js.map