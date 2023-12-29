import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
                return isLarge ? /*#__PURE__*/ React.createElement(Title, _object_spread({
                    level: "2",
                    weight: "2"
                }, restProps)) : /*#__PURE__*/ React.createElement(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
            case 'secondary':
                return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                    weight: "1",
                    caps: true
                }, restProps));
            case 'tertiary':
                return /*#__PURE__*/ React.createElement(Title, _object_spread({
                    weight: "1",
                    level: "3"
                }, restProps));
        }
    }
    switch(mode){
        case 'primary':
            return isLarge ? /*#__PURE__*/ React.createElement(Title, _object_spread({
                level: "2",
                weight: "2"
            }, restProps)) : /*#__PURE__*/ React.createElement(Headline, _object_spread({
                weight: "2"
            }, restProps));
        case 'secondary':
            return /*#__PURE__*/ React.createElement(Footnote, _object_spread({
                weight: "1",
                caps: true
            }, restProps));
        case 'tertiary':
            return /*#__PURE__*/ React.createElement(Headline, _object_spread({
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
    var { mode = 'primary', size = 'regular', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "size",
        "Component",
        "children",
        "subtitle",
        "subtitleComponent",
        "indicator",
        "aside",
        "multiline"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiHeader", stylesMode[mode], size === 'large' && "vkuiHeader--large", isPrimitiveReactNode(indicator) && "vkuiHeader--pi", hasReactNode(subtitle) && "vkuiHeader--with-subtitle")
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiHeader__main"
    }, /*#__PURE__*/ React.createElement(HeaderContent, {
        className: "vkuiHeader__content",
        Component: Component,
        mode: mode,
        size: size
    }, /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiHeader__content-in", multiline && "vkuiHeader__content--multiline")
    }, children), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiHeader__indicator",
        weight: "2"
    }, indicator)), hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Subhead, {
        className: classNames("vkuiHeader__subtitle", multiline && "vkuiHeader__content--multiline"),
        Component: subtitleComponent
    }, subtitle)), hasReactNode(aside) && /*#__PURE__*/ React.createElement(Paragraph, {
        className: "vkuiHeader__aside",
        Component: "span"
    }, aside));
};

//# sourceMappingURL=Header.js.map