import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Title } from '../Typography/Title/Title';
import styles from './Header.module.css';
const HeaderContent = ({ mode, size, ...restProps })=>{
    const isLarge = size === 'large';
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
    primary: styles['Header--mode-primary'],
    secondary: styles['Header--mode-secondary'],
    tertiary: styles['Header--mode-tertiary']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export const Header = ({ mode = 'primary', size = 'regular', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Header'], stylesMode[mode], size === 'large' && styles['Header--large'], isPrimitiveReactNode(indicator) && styles['Header--pi'], hasReactNode(subtitle) && styles['Header--with-subtitle']),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['Header__before'], subtitle && styles['Header__before--withSubtitle']),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Header__main'],
                children: [
                    /*#__PURE__*/ _jsxs(HeaderContent, {
                        className: styles['Header__content'],
                        Component: Component,
                        mode: mode,
                        size: size,
                        children: [
                            beforeTitle && /*#__PURE__*/ _jsx("div", {
                                className: styles['Header__content__before'],
                                children: beforeTitle
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                className: classNames(styles['Header__content-in'], multiline && styles['Header__content--multiline']),
                                children: children
                            }),
                            afterTitle && /*#__PURE__*/ _jsx("div", {
                                className: styles['Header__content__after'],
                                children: afterTitle
                            }),
                            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Footnote, {
                                className: styles['Header__indicator'],
                                weight: "2",
                                children: indicator
                            })
                        ]
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsxs("div", {
                        className: styles['Header__subtitleWrapper'],
                        children: [
                            beforeSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: styles['Header__subtitleBefore'],
                                children: beforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Subhead, {
                                className: classNames(styles['Header__subtitle'], multiline && styles['Header__content--multiline']),
                                Component: subtitleComponent,
                                children: subtitle
                            }),
                            afterSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: styles['Header__subtitleAfter'],
                                children: afterSubtitle
                            })
                        ]
                    })
                ]
            }),
            hasReactNode(aside) && /*#__PURE__*/ _jsx(Paragraph, {
                className: styles['Header__aside'],
                Component: "span",
                children: aside
            })
        ]
    });
};

//# sourceMappingURL=Header.js.map