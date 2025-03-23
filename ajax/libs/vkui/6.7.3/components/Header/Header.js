import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const HeaderContent = (_param)=>{
    var { mode, size } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "size"
    ]);
    const isLarge = size === 'large';
    const platform = usePlatform();
    if (platform === 'ios') {
        switch(mode){
            case 'primary':
                return isLarge ? /*#__PURE__*/ _jsx(Title, _object_spread({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ _jsx(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
            case 'secondary':
                return /*#__PURE__*/ _jsx(Footnote, _object_spread({
                    weight: "1",
                    caps: true
                }, restProps));
            case 'tertiary':
                return /*#__PURE__*/ _jsx(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    switch(mode){
        case 'primary':
            return isLarge ? /*#__PURE__*/ _jsx(Title, _object_spread({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ _jsx(Headline, _object_spread({
                weight: "2"
            }, restProps));
        case 'secondary':
            return /*#__PURE__*/ _jsx(Footnote, _object_spread({
                weight: "1",
                caps: true
            }, restProps));
        case 'tertiary':
            return /*#__PURE__*/ _jsx(Headline, _object_spread({
                weight: "2"
            }, restProps));
    }
    return null;
};
const stylesMode = {
    primary: "vkuiHeader--mode-primary",
    secondary: "vkuiHeader--mode-secondary",
    tertiary: "vkuiHeader--mode-tertiary"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export const Header = (_param)=>{
    var { mode = 'primary', size = 'regular', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline, before, beforeTitle, afterTitle, beforeSubtitle, afterSubtitle } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "size",
        "Component",
        "children",
        "subtitle",
        "subtitleComponent",
        "indicator",
        "aside",
        "multiline",
        "before",
        "beforeTitle",
        "afterTitle",
        "beforeSubtitle",
        "afterSubtitle"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiHeader", stylesMode[mode], size === 'large' && "vkuiHeader--large", isPrimitiveReactNode(indicator) && "vkuiHeader--pi", hasReactNode(subtitle) && "vkuiHeader--with-subtitle"),
        children: [
            before && /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiHeader__before", subtitle && "vkuiHeader__before--withSubtitle"),
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiHeader__main",
                children: [
                    /*#__PURE__*/ _jsxs(HeaderContent, {
                        className: "vkuiHeader__content",
                        Component: Component,
                        mode: mode,
                        size: size,
                        children: [
                            beforeTitle && /*#__PURE__*/ _jsx("div", {
                                className: "vkuiHeader__content__before",
                                children: beforeTitle
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                className: classNames("vkuiHeader__content-in", multiline && "vkuiHeader__content--multiline"),
                                children: children
                            }),
                            afterTitle && /*#__PURE__*/ _jsx("div", {
                                className: "vkuiHeader__content__after",
                                children: afterTitle
                            }),
                            hasReactNode(indicator) && /*#__PURE__*/ _jsx(Footnote, {
                                className: "vkuiHeader__indicator",
                                weight: "2",
                                children: indicator
                            })
                        ]
                    }),
                    hasReactNode(subtitle) && /*#__PURE__*/ _jsxs("div", {
                        className: "vkuiHeader__subtitleWrapper",
                        children: [
                            beforeSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: "vkuiHeader__subtitleBefore",
                                children: beforeSubtitle
                            }),
                            /*#__PURE__*/ _jsx(Subhead, {
                                className: classNames("vkuiHeader__subtitle", multiline && "vkuiHeader__content--multiline"),
                                Component: subtitleComponent,
                                children: subtitle
                            }),
                            afterSubtitle && /*#__PURE__*/ _jsx("div", {
                                className: "vkuiHeader__subtitleAfter",
                                children: afterSubtitle
                            })
                        ]
                    })
                ]
            }),
            hasReactNode(aside) && /*#__PURE__*/ _jsx(Paragraph, {
                className: "vkuiHeader__aside",
                Component: "span",
                children: aside
            })
        ]
    }));
};

//# sourceMappingURL=Header.js.map