import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Avatar } from "../Avatar/Avatar.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import styles from "./HorizontalCell.module.css";
const stylesSize = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL
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
        className: classNames(styles.host, stylesSize[size], className),
        children: /*#__PURE__*/ _jsxs(Tappable, {
            className: styles.body,
            getRootRef: getRef,
            ...restProps,
            children: [
                hasReactNode(children) && /*#__PURE__*/ _jsx("div", {
                    className: styles.image,
                    children: children
                }),
                (header || subtitle || extraSubtitle) && /*#__PURE__*/ _jsxs("div", {
                    className: styles.content,
                    children: [
                        hasReactNode(header) && /*#__PURE__*/ _jsx(CellTypography, {
                            size: size,
                            children: header
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