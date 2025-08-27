'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron, Icon24Chevron } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ScrollArrow.module.css";
const stylesSize = {
    s: styles.sizeS,
    m: styles.sizeM
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
    if (size === 's') {
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
 * @see https://vkui.io/components/scroll-arrow
 */ export const ScrollArrow = ({ size = 'm', offsetY, direction, label: labelProp, children = /*#__PURE__*/ _jsx(ArrowIcon, {
    size: size
}), ...restProps })=>{
    const textDirection = useConfigDirection();
    const label = labelProp ?? labelDirection[direction];
    return /*#__PURE__*/ _jsxs(RootComponent, {
        Component: "button",
        type: "button",
        baseClassName: classNames(styles.host, stylesSize[size], stylesDirection[direction], textDirection === 'rtl' && styles.rtl),
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