import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { ViewWidth, viewWidthToClassName } from '../../lib/adaptivity';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../../lib/matchMedia';
import { RootComponent } from '../RootComponent/RootComponent';
import { SplitColContext } from './SplitColContext';
const breakpointClassNames = {
    none: classNames("vkuiSplitCol--viewWidth-none", 'vkuiInternalSplitCol--viewWidth-none'),
    tabletMinus: "vkuiSplitCol--viewWidth-tabletMinus",
    smallTabletPlus: "vkuiSplitCol--viewWidth-smallTabletPlus",
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
 * @see https://vkcom.github.io/VKUI/#/SplitCol
 */ export const SplitCol = (props)=>{
    const { children, width, maxWidth, minWidth, animate: animateProp, fixed, style, autoSpaced, stretchedOnMobile, getRootRef } = props, restProps = _object_without_properties(props, [
        "children",
        "width",
        "maxWidth",
        "minWidth",
        "animate",
        "fixed",
        "style",
        "autoSpaced",
        "stretchedOnMobile",
        "getRootRef"
    ]);
    const baseRef = useExternRef(getRootRef);
    const { viewWidth } = useAdaptivity();
    const animate = useTransitionAnimate(animateProp);
    const contextValue = useObjectMemo({
        colRef: baseRef,
        animate
    });
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread_props(_object_spread({}, style), {
            width: width,
            maxWidth: maxWidth,
            minWidth: minWidth
        }),
        getRootRef: baseRef,
        baseClassName: classNames("vkuiSplitCol", viewWidthToClassName(breakpointClassNames, viewWidth), autoSpaced && classNames("vkuiSplitCol--spaced-auto", 'vkuiInternalSplitCol--spaced-auto'), fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile")
    }), /*#__PURE__*/ React.createElement(SplitColContext.Provider, {
        value: contextValue
    }, fixed ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSplitCol__fixedInner"
    }, children) : children));
};

//# sourceMappingURL=SplitCol.js.map