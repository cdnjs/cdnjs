'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useMediaQueries } from "../../hooks/useMediaQueries.js";
import { ViewWidth, viewWidthToClassName } from "../../lib/adaptivity/index.js";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../../lib/matchMedia.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { SplitColContext } from "./SplitColContext.js";
const breakpointClassNames = {
    none: classNames("vkuiSplitCol__viewWidthNone", 'vkuiInternalSplitCol--viewWidth-none'),
    tabletMinus: "vkuiSplitCol__viewWidthTabletMinus",
    smallTabletPlus: "vkuiSplitCol__viewWidthSmallTabletPlus",
    tabletPlus: 'vkuiInternalSplitCol--viewWidth-tabletPlus'
};
function useTransitionAnimate(animateProp) {
    const { viewWidth } = useAdaptivity();
    const [animate, setAnimate] = React.useState(Boolean(animateProp));
    const mediaQueries = useMediaQueries();
    React.useEffect(()=>{
        if (animateProp !== undefined) {
            setAnimate(animateProp);
            return;
        }
        if (viewWidth !== undefined) {
            setAnimate(viewWidth < ViewWidth.TABLET);
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        const listener = ()=>setAnimate(!mediaQueries.smallTabletPlus.matches);
        listener();
        matchMediaListAddListener(mediaQueries.smallTabletPlus, listener);
        return ()=>{
            matchMediaListRemoveListener(mediaQueries.smallTabletPlus, listener);
        };
    }, [
        animateProp,
        viewWidth,
        mediaQueries
    ]);
    return animate;
}
/**
 * @see https://vkui.io/components/split-layout#split-col
 */ export const SplitCol = (props)=>{
    const { children, width, maxWidth, minWidth, animate: animateProp, fixed, autoSpaced, stretchedOnMobile, getRootRef } = props, restProps = _object_without_properties(props, [
        "children",
        "width",
        "maxWidth",
        "minWidth",
        "animate",
        "fixed",
        "autoSpaced",
        "stretchedOnMobile",
        "getRootRef"
    ]);
    const baseRef = useExternRef(getRootRef);
    const { viewWidth } = useAdaptivity();
    const animate = useTransitionAnimate(animateProp);
    const contextValue = React.useMemo(()=>({
            colRef: baseRef,
            animate
        }), [
        animate,
        baseRef
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseStyle: {
            width,
            maxWidth,
            minWidth
        },
        getRootRef: baseRef,
        baseClassName: classNames("vkuiSplitCol__host", viewWidthToClassName(breakpointClassNames, viewWidth), autoSpaced && classNames("vkuiSplitCol__spacedAuto", 'vkuiInternalSplitCol--spaced-auto'), fixed && "vkuiSplitCol__fixed", stretchedOnMobile && "vkuiSplitCol__stretchedOnMobile"),
        children: /*#__PURE__*/ _jsx(SplitColContext.Provider, {
            value: contextValue,
            children: fixed ? /*#__PURE__*/ _jsx("div", {
                className: "vkuiSplitCol__fixedInner",
                children: children
            }) : children
        })
    }));
};

//# sourceMappingURL=SplitCol.js.map