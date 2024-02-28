import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { useMediaQueries } from "../../hooks/useMediaQueries";
import { useObjectMemo } from "../../hooks/useObjectMemo";
import { ViewWidth, viewWidthToClassName } from "../../lib/adaptivity";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../../lib/matchMedia";
import { warnOnce } from "../../lib/warnOnce";
import { RootComponent } from "../RootComponent/RootComponent";
import { SplitColContext } from "./SplitColContext";
var breakpointClassNames = {
    none: classNames("vkuiSplitCol--viewWidth-none", "vkuiInternalSplitCol--viewWidth-none"),
    tabletMinus: "vkuiSplitCol--viewWidth-tabletMinus",
    smallTabletPlus: "vkuiSplitCol--viewWidth-smallTabletPlus",
    tabletPlus: "vkuiInternalSplitCol--viewWidth-tabletPlus"
};
function useTransitionAnimate(animateProp) {
    var viewWidth = useAdaptivity().viewWidth;
    var _React_useState = _sliced_to_array(React.useState(Boolean(animateProp)), 2), animate = _React_useState[0], setAnimate = _React_useState[1];
    var mediaQueries = useMediaQueries();
    React.useEffect(function() {
        if (animateProp !== undefined) {
            setAnimate(animateProp);
            return;
        }
        if (viewWidth !== undefined) {
            setAnimate(viewWidth < ViewWidth.TABLET);
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        var listener = function() {
            return setAnimate(!mediaQueries.smallTabletPlus.matches);
        };
        listener();
        matchMediaListAddListener(mediaQueries.smallTabletPlus, listener);
        return function() {
            matchMediaListRemoveListener(mediaQueries.smallTabletPlus, listener);
        };
    }, [
        animateProp,
        viewWidth,
        mediaQueries
    ]);
    return animate;
}
var warn = warnOnce("SplitCol");
/**
 * @see https://vkcom.github.io/VKUI/#/SplitCol
 */ export var SplitCol = function(props) {
    var children = props.children, width = props.width, maxWidth = props.maxWidth, minWidth = props.minWidth, spaced = props.spaced, animateProp = props.animate, fixed = props.fixed, style = props.style, autoSpaced = props.autoSpaced, stretchedOnMobile = props.stretchedOnMobile, getRootRef = props.getRootRef, restProps = _object_without_properties(props, [
        "children",
        "width",
        "maxWidth",
        "minWidth",
        "spaced",
        "animate",
        "fixed",
        "style",
        "autoSpaced",
        "stretchedOnMobile",
        "getRootRef"
    ]);
    var baseRef = useExternRef(getRootRef);
    var viewWidth = useAdaptivity().viewWidth;
    var animate = useTransitionAnimate(animateProp);
    var contextValue = useObjectMemo({
        colRef: baseRef,
        animate: animate
    });
    if (process.env.NODE_ENV === "development" && spaced !== undefined) {
        // TODO [>=6]: Удалить spaced
        warn("Свойство spaced устарело и будет удалено в v6. Используйте autoSpaced");
    }
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread_props(_object_spread({}, style), {
            width: width,
            maxWidth: maxWidth,
            minWidth: minWidth
        }),
        getRootRef: baseRef,
        baseClassName: classNames("vkuiSplitCol", viewWidthToClassName(breakpointClassNames, viewWidth), spaced && classNames("vkuiSplitCol--spaced", "vkuiInternalSplitCol--spaced"), spaced === undefined && classNames("vkuiSplitCol--spaced-none", "vkuiInternalSplitCol--spaced-none"), autoSpaced && classNames("vkuiSplitCol--spaced-auto", "vkuiInternalSplitCol--spaced-auto"), fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile")
    }), /*#__PURE__*/ React.createElement(SplitColContext.Provider, {
        value: contextValue
    }, fixed ? /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSplitCol__fixedInner"
    }, children) : children));
};

//# sourceMappingURL=SplitCol.js.map