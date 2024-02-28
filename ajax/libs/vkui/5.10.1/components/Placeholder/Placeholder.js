import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
import { Headline } from "../Typography/Headline/Headline";
import { Title } from "../Typography/Title/Title";
var PlaceholderContainer = function(_param) /*#__PURE__*/ {
    var stretched = _param.stretched, _param_withPadding = _param.withPadding, withPadding = _param_withPadding === void 0 ? true : _param_withPadding, restProps = _object_without_properties(_param, [
        "stretched",
        "withPadding"
    ]);
    return React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", withPadding && "vkuiPlaceholder--withPadding")
    }, restProps));
};
var PlaceholderIcon = function(props) {
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: "vkuiPlaceholder__icon"
    }, props));
};
var PlaceholderHeader = function(_param) /*#__PURE__*/ {
    var className = _param.className, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return React.createElement(Title, _object_spread({
        level: "2",
        weight: "2",
        className: classNames(className, "vkuiPlaceholder__header")
    }, restProps));
};
var PlaceholderText = function(_param) /*#__PURE__*/ {
    var className = _param.className, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return React.createElement(Headline, _object_spread({
        weight: "3",
        className: classNames(className, "vkuiPlaceholder__text")
    }, restProps));
};
var PlaceholderActions = function(props) {
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: "vkuiPlaceholder__action"
    }, props));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export var Placeholder = function(_param) /*#__PURE__*/ {
    var icon = _param.icon, header = _param.header, children = _param.children, action = _param.action, _param_withPadding = _param.withPadding, withPadding = _param_withPadding === void 0 ? true : _param_withPadding, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "children",
        "action",
        "withPadding"
    ]);
    return React.createElement(PlaceholderContainer, _object_spread({
        withPadding: withPadding
    }, restProps), hasReactNode(icon) && /*#__PURE__*/ React.createElement(PlaceholderIcon, null, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(PlaceholderHeader, null, header), hasReactNode(children) && /*#__PURE__*/ React.createElement(PlaceholderText, null, children), hasReactNode(action) && /*#__PURE__*/ React.createElement(PlaceholderActions, null, action));
};
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map