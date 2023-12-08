import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon16Chevron, Icon24Chevron } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
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
    let Icon = Icon24Chevron;
    if (size === 'm') {
        Icon = Icon16Chevron;
    }
    return /*#__PURE__*/ React.createElement(Icon, {
        className: "vkuiScrollArrow__defaultIcon"
    });
};
/**
 * Компонент стрелки. Используется в [HorizontalScroll](#/HorizontalScroll) и [Gallery](#/Gallery).
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export const ScrollArrow = (_param)=>{
    var { size = 'l', offsetY, direction, label: labelProp, children = /*#__PURE__*/ React.createElement(ArrowIcon, {
        size: size
    }) } = _param, restProps = _object_without_properties(_param, [
        "size",
        "offsetY",
        "direction",
        "label",
        "children"
    ]);
    const label = labelProp !== null && labelProp !== void 0 ? labelProp : labelDirection[direction];
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "button",
        type: "button",
        baseClassName: classNames("vkuiScrollArrow", stylesSize[size], stylesDirection[direction])
    }, restProps), label && /*#__PURE__*/ React.createElement(VisuallyHidden, null, label), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiScrollArrow__icon",
        style: offsetY ? {
            top: offsetY
        } : undefined
    }, children));
};

//# sourceMappingURL=ScrollArrow.js.map