import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron, Icon24Chevron } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ScrollArrow.module.css";
const stylesSize = {
    m: styles.sizeM,
    l: styles.sizeL
};
const stylesDirection = {
    up: styles.directionUp,
    right: styles.directionRight,
    down: styles.directionDown,
    left: styles.directionLeft
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
    return /*#__PURE__*/ _jsx(Icon, {
        className: styles.defaultIcon
    });
};
/**
 * Компонент стрелки. Используется в [HorizontalScroll](#/HorizontalScroll) и [Gallery](#/Gallery).
 *
 * @since 5.4.0
 * @see https://vkcom.github.io/VKUI/#/ScrollArrow
 */ export const ScrollArrow = ({ size = 'l', offsetY, direction, label: labelProp, children = /*#__PURE__*/ _jsx(ArrowIcon, {
    size: size
}), ...restProps })=>{
    const label = labelProp ?? labelDirection[direction];
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "button",
        type: "button",
        baseClassName: classNames(styles.host, stylesSize[size], stylesDirection[direction]),
        ...restProps,
        children: [
            label && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: label
            }),
            /*#__PURE__*/ _jsx("span", {
                className: styles.icon,
                style: offsetY ? {
                    top: offsetY
                } : undefined,
                children: children
            })
        ]
    });
};

//# sourceMappingURL=ScrollArrow.js.map