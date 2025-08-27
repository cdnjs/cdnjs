'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { AppRootContext } from "../AppRoot/AppRootContext.js";
import { NavPanelIdContext } from "../NavIdContext/NavIdContext.js";
import { OnboardingTooltipContainer } from "../OnboardingTooltip/OnboardingTooltipContainer.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Touch } from "../Touch/Touch.js";
import styles from "./Panel.module.css";
const sizeXClassNames = {
    none: styles.sizeXNone,
    compact: styles.sizeXCompact,
    regular: styles.sizeXRegular
};
const stylesMode = {
    none: styles.modeNone,
    plain: styles.modePlain,
    card: styles.modeCard
};
/**
 * @see https://vkui.io/components/panel
 */ export const Panel = ({ centered = false, children, nav, mode: modeProp, disableBackground, ...restProps })=>{
    const { sizeX = 'none' } = useAdaptivity();
    const mode = usePanelMode(modeProp, sizeX);
    return /*#__PURE__*/ _jsx(NavPanelIdContext.Provider, {
        value: restProps.id || nav,
        children: /*#__PURE__*/ _jsx(RootComponent, {
            ...restProps,
            baseClassName: classNames(styles.host, sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', disableBackground && styles.disableBackground, stylesMode[mode]),
            children: /*#__PURE__*/ _jsxs(Touch, {
                Component: OnboardingTooltipContainer,
                className: classNames(styles.in, 'vkuiInternalPanel__in'),
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: styles.inBefore
                    }),
                    centered ? /*#__PURE__*/ _jsx("div", {
                        className: styles.centered,
                        children: children
                    }) : children,
                    /*#__PURE__*/ _jsx("div", {
                        className: styles.inAfter
                    })
                ]
            })
        })
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