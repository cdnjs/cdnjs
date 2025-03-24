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
    none: "Panel__sizeXNone--6p-KQ",
    compact: "Panel__sizeXCompact--6jbNE",
    regular: "Panel__sizeXRegular--p7yxL"
};
const stylesMode = {
    none: "Panel__modeNone--QDOMK",
    plain: "Panel__modePlain--BSGKb",
    card: "Panel__modeCard--8-tAY"
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
            baseClassName: classNames("Panel__host--e9Sg1", sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', disableBackground && "Panel__disableBackground--Hf1Ai", stylesMode[mode]),
            children: /*#__PURE__*/ _jsxs(Touch, {
                Component: OnboardingTooltipContainer,
                className: classNames("Panel__in--9Xh6o", 'vkuiInternalPanel__in'),
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: "Panel__inBefore--eNTlA"
                    }),
                    centered ? /*#__PURE__*/ _jsx("div", {
                        className: "Panel__centered--To8BZ",
                        children: children
                    }) : children,
                    /*#__PURE__*/ _jsx("div", {
                        className: "Panel__inAfter--LAyWt"
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