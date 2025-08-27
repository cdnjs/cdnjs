/* eslint-disable jsdoc/require-jsdoc */ import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron, Icon24ChevronCompactRight } from "@vkontakte/icons";
const iconSize = {
    s: Icon16Chevron,
    m: Icon24ChevronCompactRight
};
export const Chevron = ({ size = 'm', ...restProps })=>{
    const Icon = iconSize[size];
    return /*#__PURE__*/ _jsx(Icon, {
        ...restProps
    });
};

//# sourceMappingURL=Chevron.js.map