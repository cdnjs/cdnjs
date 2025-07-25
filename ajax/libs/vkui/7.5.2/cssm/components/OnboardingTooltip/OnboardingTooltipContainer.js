import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef(({ fixed = false, Component = 'div', ...props }, ref)=>{
    const dataProps = {
        [onboardingTooltipContainerAttr]: fixed ? 'fixed' : 'true'
    };
    return /*#__PURE__*/ _jsx(Component, {
        ...dataProps,
        ...props,
        ref: ref
    });
});
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(OnboardingTooltipContainer, 'OnboardingTooltipContainer');
}

//# sourceMappingURL=OnboardingTooltipContainer.js.map