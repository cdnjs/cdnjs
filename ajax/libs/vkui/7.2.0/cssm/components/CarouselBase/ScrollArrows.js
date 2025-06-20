'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow.js";
import styles from "./CarouselBase.module.css";
const stylesArrowAreaHeight = {
    stretch: styles.arrowAreaStretch,
    fit: styles.arrowAreaFit
};
export const getArrowClassName = (side, arrowAreaHeight)=>{
    return classNames(styles.arrow, side === 'start' ? styles.arrowStart : styles.arrowEnd, stylesArrowAreaHeight[arrowAreaHeight]);
};
export const ScrollArrows = ({ hasPointer, canSlideLeft, canSlideRight, onSlideRight, onSlideLeft, showArrows = false, arrowSize = 'm', arrowAreaHeight = 'stretch', nextArrowTestId, prevArrowTestId })=>{
    return showArrows && hasPointer ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            canSlideLeft && /*#__PURE__*/ _jsx(ScrollArrow, {
                className: getArrowClassName('start', arrowAreaHeight),
                direction: "left",
                onClick: onSlideLeft,
                size: arrowSize,
                "data-testid": prevArrowTestId
            }),
            canSlideRight && /*#__PURE__*/ _jsx(ScrollArrow, {
                className: getArrowClassName('end', arrowAreaHeight),
                direction: "right",
                onClick: onSlideRight,
                size: arrowSize,
                "data-testid": nextArrowTestId
            })
        ]
    }) : null;
};

//# sourceMappingURL=ScrollArrows.js.map