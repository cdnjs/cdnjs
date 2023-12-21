import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
export const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
export const OnboardingTooltipContainer = /*#__PURE__*/ React.forwardRef((_param, ref)=>{
    var { fixed = false } = _param, props = _object_without_properties(_param, [
        "fixed"
    ]);
    props[onboardingTooltipContainerAttr] = fixed ? 'fixed' : 'true';
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, props), {
        ref: ref
    }));
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map