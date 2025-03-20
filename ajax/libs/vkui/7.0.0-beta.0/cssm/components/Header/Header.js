import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Header.module.css";
const HeaderContent = ({ mode, size, ...restProps })=>{
    const isLarge = size === 'l';
    const platform = usePlatform();
    if (platform === 'ios') {
        switch(mode){
            case 'primary':
                return isLarge ? /*#__PURE__*/ _jsx(Title, {
                    level: "2",
                    weight: "2",
                    ...restProps
                }) : /*#__PURE__*/ _jsx(Title, {
                    weight: "1",
                    level: "3",
                    ...restProps
                });
            case 'secondary':
                return /*#__PURE__*/ _jsx(Footnote, {
                    weight: "1",
                    caps: true,
                    ...restProps
                });
            case 'tertiary':
                return /*#__PURE__*/ _jsx(Title, {
                    weight: "1",
                    level: "3",
                    ...restProps
                });
        }
    }
    switch(mode){
        case 'primary':
            return isLarge ? /*#__PURE__*/ _jsx(Title, {
                level: "2",
                weight: "2",
                ...restProps
            }) : /*#__PURE__*/ _jsx(Headline, {
                weight: "2",
                ...restProps
            });
        case 'secondary':
            return /*#__PURE__*/ _jsx(Footnote, {
                weight: "1",
                caps: true,
                ...restProps
            });
        case 'tertiary':
            return /*#__PURE__*/ _jsx(Headline, {
                weight: "2",
                ...restProps
            });
    }
    return null;
};
const stylesMode = {
    primary: styles.modePrimary,
    secondary: styles.modeSecondary,
    tertiary: styles.modeTertiary
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export const Header = ({ mode = 'primary', size = 'm', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, stylesMode[mode], size === 'l' && styles.large, isPrimitiveReactNode(indicator) && styles.pi, hasReactNode(subtitle) && styles.withSubtitle),
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
                        mode: mode,
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
                            /*#__PURE__*/ _jsx(Subhead, {
                                className: classNames(styles.subtitle, multiline && styles.contentMultiline),
                                Component: subtitleComponent,
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
            hasReactNode(aside) && /*#__PURE__*/ _jsx(Paragraph, {
                className: styles.aside,
                Component: "span",
                children: aside
            })
        ]
    });
};

//# sourceMappingURL=Header.js.map