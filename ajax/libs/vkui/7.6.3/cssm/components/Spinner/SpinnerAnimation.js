'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import { useReducedMotion } from "../../lib/animation/index.js";
export function SpinnerAnimation({ size = 'm' }) {
    const isReducedMotion = useReducedMotion();
    if (isReducedMotion === undefined) {
        return null;
    }
    if (isReducedMotion) {
        return /*#__PURE__*/ _jsx("animate", {
            attributeName: "opacity",
            keyTimes: "0; 0.5; 1",
            values: "1; 0.1; 1",
            begin: "0s",
            dur: "2s",
            repeatCount: "indefinite"
        });
    }
    const center = {
        s: 8,
        m: 12,
        l: 16,
        xl: 22
    }[size];
    return /*#__PURE__*/ _jsx("animateTransform", {
        attributeType: "XML",
        attributeName: "transform",
        type: "rotate",
        from: `0 ${center} ${center}`,
        to: `360 ${center} ${center}`,
        dur: "0.7s",
        repeatCount: "indefinite"
    });
}

//# sourceMappingURL=SpinnerAnimation.js.map