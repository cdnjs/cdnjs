'use client';
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
import styles from "./SplitCol.module.css";
const breakpointClassNames = {
    none: classNames(styles.viewWidthNone, 'vkuiInternalSplitCol--viewWidth-none'),
    tabletMinus: styles.viewWidthTabletMinus,
    smallTabletPlus: styles.viewWidthSmallTabletPlus,
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
    const { children, width, maxWidth, minWidth, animate: animateProp, fixed, autoSpaced, stretchedOnMobile, getRootRef, ...restProps } = props;
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseStyle: {
            width,
            maxWidth,
            minWidth
        },
        getRootRef: baseRef,
        baseClassName: classNames(styles.host, viewWidthToClassName(breakpointClassNames, viewWidth), autoSpaced && classNames(styles.spacedAuto, 'vkuiInternalSplitCol--spaced-auto'), fixed && styles.fixed, stretchedOnMobile && styles.stretchedOnMobile),
        children: /*#__PURE__*/ _jsx(SplitColContext.Provider, {
            value: contextValue,
            children: fixed ? /*#__PURE__*/ _jsx("div", {
                className: styles.fixedInner,
                children: children
            }) : children
        })
    });
};

//# sourceMappingURL=SplitCol.js.map