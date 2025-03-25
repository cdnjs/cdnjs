import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Avatar } from "../Avatar/Avatar.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import styles from "./HorizontalCell.module.css";
export const CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH = '--vkui_internal--cell_width';
const stylesSize = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
    xl: styles.sizeXL,
    auto: styles.sizeAuto
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
 */ export const HorizontalCell = ({ className, title, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
    size: 56
}), getRootRef, getRef, extraSubtitle, ...restProps })=>{
    const hasTypography = hasReactNode(title) || hasReactNode(subtitle) || hasReactNode(extraSubtitle);
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: {
            ...typeof size === 'number' && {
                [CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH]: `${size}px`
            },
            ...style
        },
        className: classNames(styles.host, typeof size === 'string' && stylesSize[size], size !== 'auto' && styles.sized, className),
        children: /*#__PURE__*/ _jsxs(Tappable, {
            className: styles.body,
            getRootRef: getRef,
            ...restProps,
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: styles.image,
                    children: children
                }),
                hasTypography && /*#__PURE__*/ _jsxs("div", {
                    className: styles.content,
                    children: [
                        hasReactNode(title) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
                            children: title
                        }),
                        hasReactNode(subtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: styles.subtitle,
                            children: subtitle
                        }),
                        hasReactNode(extraSubtitle) && /*#__PURE__*/ _jsx(Footnote, {
                            className: styles.subtitle,
                            children: extraSubtitle
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=HorizontalCell.js.map