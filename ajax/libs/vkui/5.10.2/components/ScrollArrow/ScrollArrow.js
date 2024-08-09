import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Chevron, Icon24Chevron } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesSize = {
    m: "vkuiScrollArrow--size-m",
    l: "vkuiScrollArrow--size-l"
};
var stylesDirection = {
    up: "vkuiScrollArrow--direction-up",
    right: "vkuiScrollArrow--direction-right",
    down: "vkuiScrollArrow--direction-down",
    left: "vkuiScrollArrow--direction-left"
};
var ArrowIcon = function(param) {
    var size = param.size;
    var Icon = Icon24Chevron;
    if (size === "m") {
        Icon = Icon16Chevron;
    }
    return /*#__PURE__*/ React.createElement(Icon, {
        className: "vkuiScrollArrow__defaultIcon"
    });
};
/**
 * Компонент стрелки из HorizontalScroll
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export var ScrollArrow = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, offsetY = _param.offsetY, direction = _param.direction, _param_children = _param.children, children = _param_children === void 0 ? /*#__PURE__*/ React.createElement(ArrowIcon, {
        size: size
    }) : _param_children, restProps = _object_without_properties(_param, [
        "size",
        "offsetY",
        "direction",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "button",
        type: "button",
        baseClassName: classNames("vkuiScrollArrow", stylesSize[size], stylesDirection[direction])
    }, restProps), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map