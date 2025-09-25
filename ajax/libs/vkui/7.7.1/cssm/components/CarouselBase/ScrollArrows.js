'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow.js";
import styles from "./CarouselBase.module.css";
const stylesArrowAreaHeight = {
    stretch: styles.arrowAreaStretch,
    fit: styles.arrowAreaFit
};
export const getArrowClassName = (side, arrowAreaHeight, focusVisible)=>{
    return classNames(styles.arrow, side === 'start' ? styles.arrowStart : styles.arrowEnd, stylesArrowAreaHeight[arrowAreaHeight], focusVisible && styles.arrowFocusVisible);
};
export const ScrollArrows = ({ hasPointer, canSlideLeft, canSlideRight, onSlideRight, onSlideLeft, showArrows = false, arrowSize = 'm', arrowAreaHeight = 'stretch', arrowPrevLabel, arrowNextLabel, nextArrowTestId, prevArrowTestId, slidesContainerId })=>{
    const { focusVisible: prevArrowFocusVisible, ...prevArrowFocusHandlers } = useFocusVisible();
    const { focusVisible: nextArrowFocusVisible, ...nextArrowFocusHandlers } = useFocusVisible();
    return showArrows && hasPointer ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            canSlideLeft && /*#__PURE__*/ _jsx(ScrollArrow, {
                className: getArrowClassName('start', arrowAreaHeight, prevArrowFocusVisible),
                direction: "left",
                onClick: onSlideLeft,
                size: arrowSize,
                "data-testid": prevArrowTestId,
                label: arrowPrevLabel,
                "aria-controls": slidesContainerId,
                ...prevArrowFocusHandlers
            }),
            canSlideRight && /*#__PURE__*/ _jsx(ScrollArrow, {
                className: getArrowClassName('end', arrowAreaHeight, nextArrowFocusVisible),
                direction: "right",
                onClick: onSlideRight,
                size: arrowSize,
                "data-testid": nextArrowTestId,
                label: arrowNextLabel,
                "aria-controls": slidesContainerId,
                ...nextArrowFocusHandlers
            })
        ]
    }) : null;
};

//# sourceMappingURL=ScrollArrows.js.map