import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { getFetchPriorityProp } from "../../lib/utils.js";
import { Card } from "../Card/Card.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Text } from "../Typography/Text/Text.js";
import styles from "./ContentCard.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */ export const ContentCard = ({ overTitle, title, titleComponent = 'span', description, caption, // card props
className, mode = 'shadow', style, getRootRef, // img props
getRef, maxHeight, src, srcSet, alt = '', width = '100%', height, crossOrigin, decoding, loading, referrerPolicy, sizes, useMap, fetchPriority, imageObjectFit, hasHover = false, hasActive = false, Component = 'li', ...restProps })=>{
    return /*#__PURE__*/ _jsx(Card, {
        mode: mode,
        getRootRef: getRootRef,
        Component: Component,
        style: style,
        className: classNames(restProps.disabled && styles.disabled, className),
        children: /*#__PURE__*/ _jsxs(Tappable, {
            ...restProps,
            hasHover: hasHover,
            hasActive: hasActive,
            className: styles.tappable,
            children: [
                (src || srcSet) && /*#__PURE__*/ _jsx("img", {
                    ref: getRef,
                    className: styles.img,
                    src: src,
                    srcSet: srcSet,
                    alt: alt,
                    crossOrigin: crossOrigin,
                    decoding: decoding,
                    loading: loading,
                    referrerPolicy: referrerPolicy,
                    sizes: sizes,
                    useMap: useMap,
                    ...getFetchPriorityProp(fetchPriority),
                    height: height,
                    width: width,
                    style: {
                        maxHeight,
                        objectFit: imageObjectFit
                    }
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: styles.body,
                    children: [
                        hasReactNode(overTitle) && /*#__PURE__*/ _jsx(Caption, {
                            className: classNames(styles.text, styles.overTitle),
                            weight: "1",
                            level: "3",
                            caps: true,
                            children: overTitle
                        }),
                        hasReactNode(title) && /*#__PURE__*/ _jsx(Headline, {
                            className: styles.text,
                            weight: "2",
                            level: "1",
                            Component: titleComponent,
                            children: title
                        }),
                        hasReactNode(description) && /*#__PURE__*/ _jsx(Text, {
                            className: styles.text,
                            children: description
                        }),
                        hasReactNode(caption) && /*#__PURE__*/ _jsx(Footnote, {
                            className: classNames(styles.text, styles.caption),
                            children: caption
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=ContentCard.js.map