'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Header.module.css";
const sizeClassNames = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
    xl: styles.sizeXl
};
const HeaderContent = ({ size, ...restProps })=>{
    switch(size){
        case 'xl':
            return /*#__PURE__*/ _jsx(Title, {
                level: "2",
                weight: "1",
                ...restProps
            });
        case 'l':
            return /*#__PURE__*/ _jsx(Title, {
                level: "3",
                weight: "1",
                ...restProps
            });
        case 'm':
            return /*#__PURE__*/ _jsx(Headline, {
                ...restProps
            });
        case 's':
            return /*#__PURE__*/ _jsx(Footnote, {
                caps: true,
                weight: "1",
                ...restProps
            });
    }
    return null;
};
const Subtitle = ({ subtitleComponent, children, multiline, size })=>{
    const SubtitleElement = size === 'm' || size === 's' ? Caption : Subhead;
    return /*#__PURE__*/ _jsx(SubtitleElement, {
        className: classNames(styles.subtitle, multiline && styles.contentMultiline),
        Component: subtitleComponent,
        children: children
    });
};
/**
 * @see https://vkui.io/components/group#header
 */ export const Header = ({ size = 'm', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, after, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, sizeClassNames[size], isPrimitiveReactNode(indicator) && styles.pi),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.before, subtitle && styles.beforeWithSubtitle),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.main,
                children: [
                    /*#__PURE__*/ _jsxs(HeaderContent, {
                        className: styles.content,
                        Component: Component,
                        size: size,
                        children: [
                            beforeTitle && /*#__PURE__*/ _jsx("div", {
                                className: styles.contentBefore,
                                children: beforeTitle
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                className: classNames(styles.contentIn, multiline && styles.contentMultiline),
                                children: children
                            }),
                            afterTitle && /*#__PURE__*/ _jsx("div", {
                                className: styles.contentAfter,
                                children: afterTitle
                            }),
                            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Footnote, {
                                className: styles.indicator,
                                weight: "2",
                                children: indicator
                            })
                        ]
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsxs("div", {
                        className: styles.subtitleWrapper,
                        children: [
                            beforeSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: styles.subtitleBefore,
                                children: beforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Subtitle, {
                                multiline: multiline,
                                subtitleComponent: subtitleComponent,
                                size: size,
                                children: subtitle
                            }),
                            afterSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: styles.subtitleAfter,
                                children: afterSubtitle
                            })
                        ]
                    })
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx(Paragraph, {
                className: styles.after,
                Component: "span",
                children: after
            })
        ]
    });
};

//# sourceMappingURL=Header.js.map