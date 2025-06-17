'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Touch } from "../Touch/Touch.js";
import styles from "./CarouselBase.module.css";
export const CarouselViewPort = ({ slideTestId, slideWidth, onStart, onMoveX, onEnd, getRootRef, layerRef, children, setSlideRef })=>{
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
            children: React.Children.map(children, (item, i)=>/*#__PURE__*/ _jsx("div", {
                    className: styles.slide,
                    "data-testid": slideTestId?.(i),
                    ref: (el)=>setSlideRef(el, i),
                    children: item
                }, `slide-${i}`))
        })
    });
};

//# sourceMappingURL=CarouselViewPort.js.map