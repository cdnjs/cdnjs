import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Title } from "../Typography/Title/Title.js";
const PlaceholderContainer = (_param)=>{
    var { stretched, noPadding = false } = _param, restProps = _object_without_properties(_param, [
        "stretched",
        "noPadding"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("Placeholder__host--oC7FF", stretched && "Placeholder__stretched--aFpIk", !noPadding && "Placeholder__withPadding--Mjs-P")
    }, restProps));
};
const PlaceholderIcon = (props)=>/*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: "Placeholder__icon--TPxV5"
    }, props));
const PlaceholderTitle = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Title, _object_spread({
        level: "2",
        weight: "2",
        className: classNames(className, "Placeholder__title--qUDs0")
    }, restProps));
};
const PlaceholderDescription = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Headline, _object_spread({
        weight: "3",
        className: classNames(className, "Placeholder__description--bNilr")
    }, restProps));
};
const PlaceholderActions = (props)=>/*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: "Placeholder__action--U716H"
    }, props));
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export const Placeholder = (_param)=>{
    var { icon, title, children, action, noPadding = false } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "title",
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
            hasReactNode(title) && /*#__PURE__*/ _jsx(PlaceholderTitle, {
                children: title
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(PlaceholderDescription, {
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
Placeholder.Title = PlaceholderTitle;
Placeholder.Description = PlaceholderDescription;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map