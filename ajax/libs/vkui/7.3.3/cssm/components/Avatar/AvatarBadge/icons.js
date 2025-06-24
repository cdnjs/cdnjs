/* eslint-disable jsdoc/require-jsdoc */ import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon12Circle as Icon12CircleLib, Icon12OnlineMobile as Icon12OnlineMobileLib } from "@vkontakte/icons";
export const Icon12Circle = ({ width, height, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Icon12CircleLib, {
        ...restProps,
        width: width >= 24 ? 15 : 12,
        height: height >= 24 ? 15 : 12
    });
};
export const Icon12OnlineMobile = ({ width, height, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Icon12OnlineMobileLib, {
        ...restProps,
        width: width >= 24 ? 9 : 8,
        height: height >= 24 ? 15 : 12
    });
};

//# sourceMappingURL=icons.js.map