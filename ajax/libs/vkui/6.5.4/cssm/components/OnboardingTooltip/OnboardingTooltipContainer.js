import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef(({ fixed = false, Component = 'div', ...props }, ref)=>{
    props[onboardingTooltipContainerAttr] = fixed ? 'fixed' : 'true';
    return /*#__PURE__*/ _jsx(Component, {
        ...props,
        ref: ref
    });
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map