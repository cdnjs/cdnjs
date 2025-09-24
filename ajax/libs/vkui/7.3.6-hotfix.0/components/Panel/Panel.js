'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { AppRootContext } from "../AppRoot/AppRootContext.js";
import { NavPanelIdContext } from "../NavIdContext/NavIdContext.js";
import { OnboardingTooltipContainer } from "../OnboardingTooltip/OnboardingTooltipContainer.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Touch } from "../Touch/Touch.js";
const sizeXClassNames = {
    none: "vkuiPanel__sizeXNone",
    compact: "vkuiPanel__sizeXCompact",
    regular: "vkuiPanel__sizeXRegular"
};
const stylesMode = {
    none: "vkuiPanel__modeNone",
    plain: "vkuiPanel__modePlain",
    card: "vkuiPanel__modeCard"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */ export const Panel = (_param)=>{
    var { centered = false, children, nav, mode: modeProp, disableBackground } = _param, restProps = _object_without_properties(_param, [
        "centered",
        "children",
        "nav",
        "mode",
        "disableBackground"
    ]);
    const { sizeX = 'none' } = useAdaptivity();
    const mode = usePanelMode(modeProp, sizeX);
    return /*#__PURE__*/ _jsx(NavPanelIdContext.Provider, {
        value: restProps.id || nav,
        children: /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
            baseClassName: classNames("vkuiPanel__host", sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', disableBackground && "vkuiPanel__disableBackground", stylesMode[mode]),
            children: /*#__PURE__*/ _jsxs(Touch, {
                Component: OnboardingTooltipContainer,
                className: classNames("vkuiPanel__in", 'vkuiInternalPanel__in'),
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "vkuiPanel__inBefore"
                    }),
                    centered ? /*#__PURE__*/ _jsx("div", {
                        className: "vkuiPanel__centered",
                        children: children
                    }) : children,
                    /*#__PURE__*/ _jsx("div", {
                        className: "vkuiPanel__inAfter"
                    })
                ]
            })
        }))
    });
};
function usePanelMode(modeProp, sizeX) {
    const { layout } = React.useContext(AppRootContext);
    if (modeProp) {
        return modeProp;
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== 'none') {
        return sizeX === 'regular' ? 'card' : 'plain';
    }
    return 'none';
}

//# sourceMappingURL=Panel.js.map