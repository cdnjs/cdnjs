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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const stylesSize = {
    m: "vkuiScrollArrow--size-m",
    l: "vkuiScrollArrow--size-l"
};
const stylesDirection = {
    up: "vkuiScrollArrow--direction-up",
    right: "vkuiScrollArrow--direction-right",
    down: "vkuiScrollArrow--direction-down",
    left: "vkuiScrollArrow--direction-left"
};
const labelDirection = {
    up: 'Назад',
    right: 'Вперед',
    down: 'Вперед',
    left: 'Назад'
};
const ArrowIcon = ({ size })=>{
    let Icon = _icons.Icon24Chevron;
    if (size === 'm') {
        Icon = _icons.Icon16Chevron;
    }
    return /*#__PURE__*/ _react.createElement(Icon, {
        className: "vkuiScrollArrow__defaultIcon"
    });
};
const ScrollArrow = (_param)=>{
    var { size = 'l', offsetY, direction, label: labelProp, children = /*#__PURE__*/ _react.createElement(ArrowIcon, {
        size: size
    }) } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "offsetY",
        "direction",
        "label",
        "children"
    ]);
    const label = labelProp !== null && labelProp !== void 0 ? labelProp : labelDirection[direction];
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "button",
        type: "button",
        baseClassName: (0, _vkjs.classNames)("vkuiScrollArrow", stylesSize[size], stylesDirection[direction])
    }, restProps), label && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, label), /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map