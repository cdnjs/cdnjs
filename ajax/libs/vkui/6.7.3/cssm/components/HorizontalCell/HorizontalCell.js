import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return size === 's' ? /*#__PURE__*/ _jsx(Caption, {
        ...restProps,
        children: children
    }) : /*#__PURE__*/ _jsx(Subhead, {
        ...restProps,
        children: children
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */ export const HorizontalCell = ({ className, header, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
    size: 56
}), getRootRef, getRef, extraSubtitle, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: style,
        className: classNames(styles['HorizontalCell'], stylesSize[size], className),
        children: /*#__PURE__*/ _jsxs(Tappable, {
            className: styles['HorizontalCell__body'],
            getRootRef: getRef,
            ...restProps,
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: styles['HorizontalCell__image'],
                    children: children
                }),
                (header || subtitle || extraSubtitle) && /*#__PURE__*/ _jsxs("div", {
                    className: styles['HorizontalCell__content'],
                    children: [
                        hasReactNode(header) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
                            children: header
                        }),
                        hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: styles['HorizontalCell__subtitle'],
                            children: subtitle
                        }),
                        hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: styles['HorizontalCell__subtitle'],
                            children: extraSubtitle
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=HorizontalCell.js.map