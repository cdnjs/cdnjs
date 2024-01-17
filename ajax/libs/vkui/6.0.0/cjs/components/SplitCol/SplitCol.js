"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SplitCol", {
    enumerable: true,
    get: function() {
        return SplitCol;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _useMediaQueries = require("../../hooks/useMediaQueries");
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _adaptivity = require("../../lib/adaptivity");
const _matchMedia = require("../../lib/matchMedia");
const _RootComponent = require("../RootComponent/RootComponent");
const _SplitColContext = require("./SplitColContext");
const breakpointClassNames = {
    none: (0, _vkjs.classNames)("vkuiSplitCol--viewWidth-none", 'vkuiInternalSplitCol--viewWidth-none'),
    tabletMinus: "vkuiSplitCol--viewWidth-tabletMinus",
    smallTabletPlus: "vkuiSplitCol--viewWidth-smallTabletPlus",
    tabletPlus: 'vkuiInternalSplitCol--viewWidth-tabletPlus'
};
function useTransitionAnimate(animateProp) {
    const { viewWidth } = (0, _useAdaptivity.useAdaptivity)();
    const [animate, setAnimate] = _react.useState(Boolean(animateProp));
    const mediaQueries = (0, _useMediaQueries.useMediaQueries)();
    _react.useEffect(()=>{
        if (animateProp !== undefined) {
            setAnimate(animateProp);
            return;
        }
        if (viewWidth !== undefined) {
            setAnimate(viewWidth < _adaptivity.ViewWidth.TABLET);
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        const listener = ()=>setAnimate(!mediaQueries.smallTabletPlus.matches);
        listener();
        (0, _matchMedia.matchMediaListAddListener)(mediaQueries.smallTabletPlus, listener);
        return ()=>{
            (0, _matchMedia.matchMediaListRemoveListener)(mediaQueries.smallTabletPlus, listener);
        };
    }, [
        animateProp,
        viewWidth,
        mediaQueries
    ]);
    return animate;
}
const SplitCol = (props)=>{
    const { children, width, maxWidth, minWidth, animate: animateProp, fixed, style, autoSpaced, stretchedOnMobile, getRootRef } = props, restProps = _object_without_properties._(props, [
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
    const baseRef = (0, _useExternRef.useExternRef)(getRootRef);
    const { viewWidth } = (0, _useAdaptivity.useAdaptivity)();
    const animate = useTransitionAnimate(animateProp);
    const contextValue = (0, _useObjectMemo.useObjectMemo)({
        colRef: baseRef,
        animate
    });
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        style: _object_spread_props._(_object_spread._({}, style), {
            width: width,
            maxWidth: maxWidth,
            minWidth: minWidth
        }),
        getRootRef: baseRef,
        baseClassName: (0, _vkjs.classNames)("vkuiSplitCol", (0, _adaptivity.viewWidthToClassName)(breakpointClassNames, viewWidth), autoSpaced && (0, _vkjs.classNames)("vkuiSplitCol--spaced-auto", 'vkuiInternalSplitCol--spaced-auto'), fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile")
    }), /*#__PURE__*/ _react.createElement(_SplitColContext.SplitColContext.Provider, {
        value: contextValue
    }, fixed ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSplitCol__fixedInner"
    }, children) : children));
};

//# sourceMappingURL=SplitCol.js.map