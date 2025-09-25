'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { Touch } from "../Touch/Touch.js";
import styles from "./CarouselBase.module.css";
const defaultSlideLabel = (index, slidesCount)=>`${index + 1} из ${slidesCount}`;
export const CarouselViewPort = ({ slideTestId, slideWidth, slideLabel = defaultSlideLabel, slideRoleDescription = 'Слайд', onChange, onStart, onMoveX, onEnd, getRootRef, layerRef, children, setSlideRef, slidesContainerId })=>{
    const slidesCount = React.Children.count(children);
    const onSlideFocus = React.useCallback((e)=>onChange?.(Number(e.currentTarget.dataset.index)), [
        onChange
    ]);
    return /*#__PURE__*/ _jsx(Touch, {
        className: styles.viewport,
        onStartX: onStart,
        onMoveX: onMoveX,
        onEnd: onEnd,
        style: {
            width: slideWidth === 'custom' ? '100%' : slideWidth
        },
        noSlideClick: true,
        getRootRef: getRootRef,
        children: /*#__PURE__*/ _jsx("div", {
            className: styles.layer,
            ref: layerRef,
            id: slidesContainerId,
            children: React.Children.map(children, (item, i)=>/*#__PURE__*/ _jsx("div", {
                    role: "group",
                    "aria-roledescription": slideRoleDescription,
                    "aria-label": typeof slideLabel === 'function' ? slideLabel(i, slidesCount) : slideLabel,
                    className: styles.slide,
                    "data-testid": slideTestId?.(i),
                    ref: (el)=>setSlideRef(el, i),
                    "data-index": i,
                    tabIndex: 0,
                    onFocus: onSlideFocus,
                    children: item
                }, `slide-${i}`))
        })
    });
};

//# sourceMappingURL=CarouselViewPort.js.map