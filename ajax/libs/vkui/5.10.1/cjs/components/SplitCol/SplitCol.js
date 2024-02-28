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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _useMediaQueries = require("../../hooks/useMediaQueries");
var _useObjectMemo = require("../../hooks/useObjectMemo");
var _adaptivity = require("../../lib/adaptivity");
var _matchMedia = require("../../lib/matchMedia");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var _SplitColContext = require("./SplitColContext");
var breakpointClassNames = {
    none: (0, _vkjs.classNames)("vkuiSplitCol--viewWidth-none", "vkuiInternalSplitCol--viewWidth-none"),
    tabletMinus: "vkuiSplitCol--viewWidth-tabletMinus",
    smallTabletPlus: "vkuiSplitCol--viewWidth-smallTabletPlus",
    tabletPlus: "vkuiInternalSplitCol--viewWidth-tabletPlus"
};
function useTransitionAnimate(animateProp) {
    var viewWidth = (0, _useAdaptivity.useAdaptivity)().viewWidth;
    var _React_useState = _sliced_to_array._(_react.useState(Boolean(animateProp)), 2), animate = _React_useState[0], setAnimate = _React_useState[1];
    var mediaQueries = (0, _useMediaQueries.useMediaQueries)();
    _react.useEffect(function() {
        if (animateProp !== undefined) {
            setAnimate(animateProp);
            return;
        }
        if (viewWidth !== undefined) {
            setAnimate(viewWidth < _adaptivity.ViewWidth.TABLET);
            return;
        }
        // eslint-disable-next-line no-restricted-properties
        var listener = function() {
            return setAnimate(!mediaQueries.smallTabletPlus.matches);
        };
        listener();
        (0, _matchMedia.matchMediaListAddListener)(mediaQueries.smallTabletPlus, listener);
        return function() {
            (0, _matchMedia.matchMediaListRemoveListener)(mediaQueries.smallTabletPlus, listener);
        };
    }, [
        animateProp,
        viewWidth,
        mediaQueries
    ]);
    return animate;
}
var warn = (0, _warnOnce.warnOnce)("SplitCol");
var SplitCol = function(props) {
    var children = props.children, width = props.width, maxWidth = props.maxWidth, minWidth = props.minWidth, spaced = props.spaced, animateProp = props.animate, fixed = props.fixed, style = props.style, autoSpaced = props.autoSpaced, stretchedOnMobile = props.stretchedOnMobile, getRootRef = props.getRootRef, restProps = _object_without_properties._(props, [
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
    var baseRef = (0, _useExternRef.useExternRef)(getRootRef);
    var viewWidth = (0, _useAdaptivity.useAdaptivity)().viewWidth;
    var animate = useTransitionAnimate(animateProp);
    var contextValue = (0, _useObjectMemo.useObjectMemo)({
        colRef: baseRef,
        animate: animate
    });
    if (process.env.NODE_ENV === "development" && spaced !== undefined) {
        // TODO [>=6]: Удалить spaced
        warn("Свойство spaced устарело и будет удалено в v6. Используйте autoSpaced");
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        style: _object_spread_props._(_object_spread._({}, style), {
            width: width,
            maxWidth: maxWidth,
            minWidth: minWidth
        }),
        getRootRef: baseRef,
        baseClassName: (0, _vkjs.classNames)("vkuiSplitCol", (0, _adaptivity.viewWidthToClassName)(breakpointClassNames, viewWidth), spaced && (0, _vkjs.classNames)("vkuiSplitCol--spaced", "vkuiInternalSplitCol--spaced"), spaced === undefined && (0, _vkjs.classNames)("vkuiSplitCol--spaced-none", "vkuiInternalSplitCol--spaced-none"), autoSpaced && (0, _vkjs.classNames)("vkuiSplitCol--spaced-auto", "vkuiInternalSplitCol--spaced-auto"), fixed && "vkuiSplitCol--fixed", stretchedOnMobile && "vkuiSplitCol--stretched-on-mobile")
    }), /*#__PURE__*/ _react.createElement(_SplitColContext.SplitColContext.Provider, {
        value: contextValue
    }, fixed ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSplitCol__fixedInner"
    }, children) : children));
};

//# sourceMappingURL=SplitCol.js.map