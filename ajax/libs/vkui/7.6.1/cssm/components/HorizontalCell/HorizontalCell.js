import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
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
const textAlignClassNames = {
    center: styles.textAlignCenter,
    end: styles.textAlignEnd
};
/**
 * @see https://vkui.io/components/horizontal-cell
 */ export const HorizontalCell = ({ className, title, style, subtitle, size = 's', children = /*#__PURE__*/ _jsx(Avatar, {
    size: 56
}), getRootRef, getRef, extraSubtitle, textAlign = size === 's' ? 'center' : 'start', noPadding = false, TitleComponent = size === 's' ? Caption : Subhead, ...restProps })=>{
    const hasTypography = hasReactNode(title) || hasReactNode(subtitle) || hasReactNode(extraSubtitle);
    const customProperties = typeof size === 'number' ? {
        [CUSTOM_CSS_TOKEN_FOR_CELL_WIDTH]: `${size}px`
    } : undefined;
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        style: mergeStyle(customProperties, style),
        className: classNames(styles.host, typeof size === 'string' && stylesSize[size], size !== 'auto' && styles.sized, typeof size === 'number' && styles.customSize, noPadding && styles.noPadding, className),
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
                    className: classNames(styles.content, textAlign !== 'start' && textAlignClassNames[textAlign]),
                    children: [
                        hasReactNode(title) && /*#__PURE__*/ _jsx(TitleComponent, {
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