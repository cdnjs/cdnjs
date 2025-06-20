'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useExternRef } from "../../hooks/useExternRef.js";
import { OnboardingTooltipContext } from "./OnboardingTooltipContext.js";
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef(({ fixed = false, Component = 'div', ...props }, ref)=>{
    const containerRef = useExternRef(ref);
    const dataProps = {
        [onboardingTooltipContainerAttr]: fixed ? 'fixed' : 'true'
    };
    return /*#__PURE__*/ _jsx(OnboardingTooltipContext.Provider, {
        value: {
            containerRef
        },
        children: /*#__PURE__*/ _jsx(Component, {
            ...dataProps,
            ...props,
            ref: containerRef
        })
    });
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map