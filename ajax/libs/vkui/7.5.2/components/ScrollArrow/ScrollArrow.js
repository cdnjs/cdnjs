'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron, Icon24Chevron } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const stylesSize = {
    s: "vkuiScrollArrow__sizeS",
    m: "vkuiScrollArrow__sizeM"
};
const stylesDirection = {
    up: "vkuiScrollArrow__directionUp",
    right: "vkuiScrollArrow__directionRight",
    down: "vkuiScrollArrow__directionDown",
    left: "vkuiScrollArrow__directionLeft"
};
const labelDirection = {
    up: 'Назад',
    right: 'Вперед',
    down: 'Вперед',
    left: 'Назад'
};
const ArrowIcon = ({ size })=>{
    let Icon = Icon24Chevron;
    if (size === 's') {
        Icon = Icon16Chevron;
    }
    return /*#__PURE__*/ _jsx(Icon, {
        className: "vkuiScrollArrow__defaultIcon"
    });
};
/**
 * Компонент стрелки. Используется в [HorizontalScroll](#/HorizontalScroll) и [Gallery](#/Gallery).
 *
 * @since 5.4.0
 * @see https://vkui.io/components/scroll-arrow
 */ export const ScrollArrow = (_param)=>{
    var { size = 'm', offsetY, direction, label: labelProp, children = /*#__PURE__*/ _jsx(ArrowIcon, {
        size: size
    }) } = _param, restProps = _object_without_properties(_param, [
        "size",
        "offsetY",
        "direction",
        "label",
        "children"
    ]);
    const textDirection = useConfigDirection();
    const label = labelProp !== null && labelProp !== void 0 ? labelProp : labelDirection[direction];
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        Component: "button",
        type: "button",
        baseClassName: classNames("vkuiScrollArrow__host", stylesSize[size], stylesDirection[direction], textDirection === 'rtl' && "vkuiScrollArrow__rtl")
    }, restProps), {
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            /*#__PURE__*/ _jsx("span", {
                className: "vkuiScrollArrow__icon",
                style: offsetY ? {
                    top: offsetY
                } : undefined,
                children: children
            })
        ]
    }));
};

//# sourceMappingURL=ScrollArrow.js.map