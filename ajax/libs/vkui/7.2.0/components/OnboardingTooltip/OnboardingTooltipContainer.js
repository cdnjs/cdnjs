'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useExternRef } from "../../hooks/useExternRef.js";
import { OnboardingTooltipContext } from "./OnboardingTooltipContext.js";
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef((_param, ref)=>{
    var { fixed = false, Component = 'div' } = _param, props = _object_without_properties(_param, [
        "fixed",
        "Component"
    ]);
    const containerRef = useExternRef(ref);
    const dataProps = {
        [onboardingTooltipContainerAttr]: fixed ? 'fixed' : 'true'
    };
    return /*#__PURE__*/ _jsx(OnboardingTooltipContext.Provider, {
        value: {
            containerRef
        },
        children: /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({}, dataProps, props), {
            ref: containerRef
        }))
    });
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map