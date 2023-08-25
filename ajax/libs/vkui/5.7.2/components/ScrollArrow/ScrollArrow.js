import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Chevron, Icon16ChevronLeft, Icon24Chevron, Icon24ChevronCompactLeft } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
var ArrowIcon = function(param) {
    var size = param.size, direction = param.direction;
    if (size === "m") {
        return direction === "left" ? /*#__PURE__*/ React.createElement(Icon16ChevronLeft, null) : /*#__PURE__*/ React.createElement(Icon16Chevron, null);
    }
    return direction === "left" ? /*#__PURE__*/ React.createElement(Icon24ChevronCompactLeft, null) : /*#__PURE__*/ React.createElement(Icon24Chevron, null);
};
/**
 * Компонент стрелки из HorizontalScroll
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export var ScrollArrow = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, offsetY = _param.offsetY, direction = _param.direction, className = _param.className, getRootRef = _param.getRootRef, _param_children = _param.children, children = _param_children === void 0 ? /*#__PURE__*/ React.createElement(ArrowIcon, {
        direction: direction,
        size: size
    }) : _param_children, restProps = _object_without_properties(_param, [
        "size",
        "offsetY",
        "direction",
        "className",
        "getRootRef",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement("button", _object_spread({
        className: classNames("vkuiScrollArrow", {
            m: "vkuiScrollArrow--size-m",
            l: "vkuiScrollArrow--size-l"
        }[size], {
            left: "vkuiScrollArrow--direction-left",
            right: "vkuiScrollArrow--direction-right"
        }[direction], className),
        ref: getRootRef
    }, restProps), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map