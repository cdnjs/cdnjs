import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Avatar } from '../Avatar/Avatar';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './HorizontalCell.module.css';
const stylesSize = {
    s: styles['HorizontalCell--size-s'],
    m: styles['HorizontalCell--size-m'],
    l: styles['HorizontalCell--size-l']
};
const CellTypography = ({ size, children, ...restProps })=>{
    return size === 's' ? /*#__PURE__*/ React.createElement(Caption, restProps, children) : /*#__PURE__*/ React.createElement(Subhead, restProps, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */ export const HorizontalCell = ({ className, header, style, subtitle, size = 's', children = /*#__PURE__*/ React.createElement(Avatar, {
    size: 56
}), getRootRef, getRef, extraSubtitle, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        ref: getRootRef,
        style: style,
        className: classNames(styles['HorizontalCell'], stylesSize[size], className)
    }, /*#__PURE__*/ React.createElement(Tappable, {
        className: styles['HorizontalCell__body'],
        getRootRef: getRef,
        ...restProps
    }, hasReactNode(children) && /*#__PURE__*/ React.createElement("div", {
        className: styles['HorizontalCell__image']
    }, children), (header || subtitle || extraSubtitle) && /*#__PURE__*/ React.createElement("div", {
        className: styles['HorizontalCell__content']
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(CellTypography, {
        size: size
    }, header), hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['HorizontalCell__subtitle']
    }, subtitle), hasReactNode(extraSubtitle) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['HorizontalCell__subtitle']
    }, extraSubtitle))));
};

//# sourceMappingURL=HorizontalCell.js.map