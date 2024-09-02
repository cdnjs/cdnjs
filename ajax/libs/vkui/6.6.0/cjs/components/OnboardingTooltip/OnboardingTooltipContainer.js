"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    OnboardingTooltipContainer: function() {
        return OnboardingTooltipContainer;
    },
    onboardingTooltipContainerAttr: function() {
        return onboardingTooltipContainerAttr;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const onboardingTooltipContainerAttr = 'data-onboarding-tooltip-container';
const OnboardingTooltipContainer = /*#__PURE__*/ _react.forwardRef((_param, ref)=>{
    var { fixed = false, Component = 'div' } = _param, props = _object_without_properties._(_param, [
        "fixed",
        "Component"
    ]);
    const dataProps = {
        [onboardingTooltipContainerAttr]: fixed ? 'fixed' : 'true'
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, _object_spread_props._(_object_spread._({}, dataProps, props), {
        ref: ref
    }));
});
OnboardingTooltipContainer.displayName = 'OnboardingTooltipContainer';

//# sourceMappingURL=OnboardingTooltipContainer.js.map