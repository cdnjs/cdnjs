'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { DefaultIcon } from "../FloatingArrow/DefaultIcon.js";
import { FloatingArrow } from "../FloatingArrow/FloatingArrow.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./TooltipBase.module.css";
export const TOOLTIP_MAX_WIDTH = 220;
const stylesAppearance = {
    accent: styles.appearanceAccent,
    white: styles.appearanceWhite,
    black: styles.appearanceBlack,
    inversion: styles.appearanceInversion
};
/**
 * Низкоуровневый компонент для отрисовки тултипа.
 * @private
 */ export const TooltipBase = ({ appearance = 'accent', arrowProps, ArrowIcon = DefaultIcon, description, title, titleId, maxWidth = TOOLTIP_MAX_WIDTH, closeIconLabel = 'Закрыть', onCloseIconClick, className, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip",
        children: [
            arrowProps && /*#__PURE__*/ _jsx(FloatingArrow, {
                ...arrowProps,
                iconClassName: classNames(styles.arrow, arrowProps.iconClassName),
                Icon: ArrowIcon
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.content,
                style: maxWidth !== null ? {
                    maxWidth
                } : undefined,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        children: [
                            hasReactNode(title) && /*#__PURE__*/ _jsx(Subhead, {
                                id: titleId,
                                className: styles.title,
                                weight: "2",
                                children: title
                            }),
                            hasReactNode(description) && /*#__PURE__*/ _jsx(Subhead, {
                                className: styles.description,
                                children: description
                            })
                        ]
                    }),
                    typeof onCloseIconClick === 'function' && /*#__PURE__*/ _jsxs(Tappable, {
                        Component: "button",
                        className: styles.closeButton,
                        hoverMode: "opacity",
                        activeMode: "opacity",
                        onClick: onCloseIconClick,
                        children: [
                            /*#__PURE__*/ _jsx(VisuallyHidden, {
                                children: closeIconLabel
                            }),
                            /*#__PURE__*/ _jsx(Icon16Cancel, {
                                display: "block"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=TooltipBase.js.map