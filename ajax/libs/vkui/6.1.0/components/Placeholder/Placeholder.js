import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { Headline } from '../Typography/Headline/Headline';
import { Title } from '../Typography/Title/Title';
const PlaceholderContainer = (_param)=>{
    var { stretched, noPadding = false } = _param, restProps = _object_without_properties(_param, [
        "stretched",
        "noPadding"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", !noPadding && "vkuiPlaceholder--withPadding")
    }, restProps));
};
const PlaceholderIcon = (props)=>/*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: "vkuiPlaceholder__icon"
    }, props));
const PlaceholderHeader = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Title, _object_spread({
        level: "2",
        weight: "2",
        className: classNames(className, "vkuiPlaceholder__header")
    }, restProps));
};
const PlaceholderText = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Headline, _object_spread({
        weight: "3",
        className: classNames(className, "vkuiPlaceholder__text")
    }, restProps));
};
const PlaceholderActions = (props)=>/*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: "vkuiPlaceholder__action"
    }, props));
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export const Placeholder = (_param)=>{
    var { icon, header, children, action, noPadding = false } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "children",
        "action",
        "noPadding"
    ]);
    return /*#__PURE__*/ _jsxs(PlaceholderContainer, _object_spread_props(_object_spread({
        noPadding: noPadding
    }, restProps), {
        children: [
            hasReactNode(icon) && /*#__PURE__*/ _jsx(PlaceholderIcon, {
                children: icon
            }),
            hasReactNode(header) && /*#__PURE__*/ _jsx(PlaceholderHeader, {
                children: header
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(PlaceholderText, {
                children: children
            }),
            hasReactNode(action) && /*#__PURE__*/ _jsx(PlaceholderActions, {
                children: action
            })
        ]
    }));
};
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map