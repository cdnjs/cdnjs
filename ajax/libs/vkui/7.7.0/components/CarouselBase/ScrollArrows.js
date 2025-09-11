'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFocusVisible } from "../../hooks/useFocusVisible.js";
import { ScrollArrow } from "../ScrollArrow/ScrollArrow.js";
const stylesArrowAreaHeight = {
    stretch: "vkuiCarouselBase__arrowAreaStretch",
    fit: "vkuiCarouselBase__arrowAreaFit"
};
export const getArrowClassName = (side, arrowAreaHeight, focusVisible)=>{
    return classNames("vkuiCarouselBase__arrow", side === 'start' ? "vkuiCarouselBase__arrowStart" : "vkuiCarouselBase__arrowEnd", stylesArrowAreaHeight[arrowAreaHeight], focusVisible && "vkuiCarouselBase__arrowFocusVisible");
};
export const ScrollArrows = ({ hasPointer, canSlideLeft, canSlideRight, onSlideRight, onSlideLeft, showArrows = false, arrowSize = 'm', arrowAreaHeight = 'stretch', arrowPrevLabel, arrowNextLabel, nextArrowTestId, prevArrowTestId, slidesContainerId })=>{
    const _useFocusVisible = useFocusVisible(), { focusVisible: prevArrowFocusVisible } = _useFocusVisible, prevArrowFocusHandlers = _object_without_properties(_useFocusVisible, [
        "focusVisible"
    ]);
    const _useFocusVisible1 = useFocusVisible(), { focusVisible: nextArrowFocusVisible } = _useFocusVisible1, nextArrowFocusHandlers = _object_without_properties(_useFocusVisible1, [
        "focusVisible"
    ]);
    return showArrows && hasPointer ? /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            canSlideLeft && /*#__PURE__*/ _jsx(ScrollArrow, _object_spread({
                className: getArrowClassName('start', arrowAreaHeight, prevArrowFocusVisible),
                direction: "left",
                onClick: onSlideLeft,
                size: arrowSize,
                "data-testid": prevArrowTestId,
                label: arrowPrevLabel,
                "aria-controls": slidesContainerId
            }, prevArrowFocusHandlers)),
            canSlideRight && /*#__PURE__*/ _jsx(ScrollArrow, _object_spread({
                className: getArrowClassName('end', arrowAreaHeight, nextArrowFocusVisible),
                direction: "right",
                onClick: onSlideRight,
                size: arrowSize,
                "data-testid": nextArrowTestId,
                label: arrowNextLabel,
                "aria-controls": slidesContainerId
            }, nextArrowFocusHandlers))
        ]
    }) : null;
};

//# sourceMappingURL=ScrollArrows.js.map