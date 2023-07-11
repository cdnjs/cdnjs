import * as React from 'react';
export const tooltipContainerAttr = 'data-tooltip-container';
export const TooltipContainer = /*#__PURE__*/ React.forwardRef(function TooltipContainer({ fixed = false, ...props }, ref) {
    props[tooltipContainerAttr] = fixed ? 'fixed' : 'true';
    return /*#__PURE__*/ React.createElement("div", {
        ...props,
        ref: ref
    });
});

//# sourceMappingURL=TooltipContainer.js.map