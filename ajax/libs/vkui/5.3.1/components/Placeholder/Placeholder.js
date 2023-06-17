import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Headline } from "../Typography/Headline/Headline";
import { Title } from "../Typography/Title/Title";
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export var Placeholder = function(_param) /*#__PURE__*/ {
    var icon = _param.icon, header = _param.header, action = _param.action, children = _param.children, stretched = _param.stretched, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "action",
        "children",
        "stretched",
        "getRootRef",
        "className"
    ]);
    return React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPlaceholder__in"
    }, hasReactNode(icon) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPlaceholder__icon"
    }, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(Title, {
        level: "2",
        weight: "2",
        className: "vkuiPlaceholder__header"
    }, header), hasReactNode(children) && /*#__PURE__*/ React.createElement(Headline, {
        weight: "3",
        className: "vkuiPlaceholder__text"
    }, children), hasReactNode(action) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiPlaceholder__action"
    }, action)));
};

//# sourceMappingURL=Placeholder.js.map