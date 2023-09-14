"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ScrollArrow", {
    enumerable: true,
    get: function() {
        return ScrollArrow;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _RootComponent = require("../RootComponent/RootComponent");
var stylesSize = {
    m: "vkuiScrollArrow--size-m",
    l: "vkuiScrollArrow--size-l"
};
var stylesDirection = {
    left: "vkuiScrollArrow--direction-left",
    right: "vkuiScrollArrow--direction-right"
};
var ArrowIcon = function(param) {
    var size = param.size, direction = param.direction;
    if (size === "m") {
        return direction === "left" ? /*#__PURE__*/ _react.createElement(_icons.Icon16ChevronLeft, null) : /*#__PURE__*/ _react.createElement(_icons.Icon16Chevron, null);
    }
    return direction === "left" ? /*#__PURE__*/ _react.createElement(_icons.Icon24ChevronCompactLeft, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24Chevron, null);
};
var ScrollArrow = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, offsetY = _param.offsetY, direction = _param.direction, _param_children = _param.children, children = _param_children === void 0 ? /*#__PURE__*/ _react.createElement(ArrowIcon, {
        direction: direction,
        size: size
    }) : _param_children, restProps = _object_without_properties._(_param, [
        "size",
        "offsetY",
        "direction",
        "children"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "button",
        baseClassName: (0, _vkjs.classNames)("vkuiScrollArrow", stylesSize[size], stylesDirection[direction])
    }, restProps), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map