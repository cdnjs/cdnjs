import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", !noPadding && "vkuiPlaceholder--withPadding")
    }, restProps));
};
const PlaceholderIcon = (props)=>/*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: "vkuiPlaceholder__icon"
    }, props));
const PlaceholderHeader = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Title, _object_spread({
        level: "2",
        weight: "2",
        className: classNames(className, "vkuiPlaceholder__header")
    }, restProps));
};
const PlaceholderText = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Headline, _object_spread({
        weight: "3",
        className: classNames(className, "vkuiPlaceholder__text")
    }, restProps));
};
const PlaceholderActions = (props)=>/*#__PURE__*/ React.createElement(RootComponent, _object_spread({
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
    return /*#__PURE__*/ React.createElement(PlaceholderContainer, _object_spread({
        noPadding: noPadding
    }, restProps), hasReactNode(icon) && /*#__PURE__*/ React.createElement(PlaceholderIcon, null, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(PlaceholderHeader, null, header), hasReactNode(children) && /*#__PURE__*/ React.createElement(PlaceholderText, null, children), hasReactNode(action) && /*#__PURE__*/ React.createElement(PlaceholderActions, null, action));
};
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map