import * as React from 'react';
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef(({ fixed = false, ...props }, ref)=>{
    props[onboardingTooltipContainerAttr] = fixed ? 'fixed' : 'true';
    return /*#__PURE__*/ React.createElement("div", {
        ...props,
        ref: ref
    });
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map