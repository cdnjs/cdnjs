"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tooltip", {
    enumerable: true,
    get: function() {
        return Tooltip;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _reactdom = /*#__PURE__*/ _interop_require_default._(require("react-dom"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var _floating = require("../../lib/floating");
var _warnOnce = require("../../lib/warnOnce");
var _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
var _TooltipBase = require("../TooltipBase/TooltipBase");
var _TooltipContainer = require("./TooltipContainer");
var isDOMTypeElement = function(element) {
    return /*#__PURE__*/ _react.isValidElement(element) && typeof element.type === "string";
};
var warn = (0, _warnOnce.warnOnce)("Tooltip");
function mapAlignX(x) {
    switch(x){
        case "left":
            return "start";
        case "right":
            return "end";
        default:
            return "";
    }
}
function getDefaultPlacement(alignX, alignY) {
    return [
        alignY || "bottom",
        mapAlignX(alignX || "left")
    ].filter(function(p) {
        return !!p;
    }).join("-");
}
function isVerticalPlacement(placement) {
    return placement.startsWith("top") || placement.startsWith("bottom");
}
var Tooltip = function(_param) {
    var children = _param.children, tmp = _param.isShown, isShownProp = tmp === void 0 ? true : tmp, _param_offsetX = _param.offsetX, offsetX = _param_offsetX === void 0 ? 0 : _param_offsetX, _param_offsetY = _param.offsetY, offsetY = _param_offsetY === void 0 ? 15 : _param_offsetY, alignX = _param.alignX, alignY = _param.alignY, onClose = _param.onClose, _param_cornerOffset = _param.cornerOffset, cornerOffset = _param_cornerOffset === void 0 ? 0 : _param_cornerOffset, cornerAbsoluteOffset = _param.cornerAbsoluteOffset, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, _param_arrowPadding = _param.arrowPadding, arrowPadding = _param_arrowPadding === void 0 ? 14 : _param_arrowPadding, getRootRef = _param.getRootRef, placementProp = _param.placement, _param_maxWidth = _param.maxWidth, maxWidth = _param_maxWidth === void 0 ? _TooltipBase.TOOLTIP_MAX_WIDTH : _param_maxWidth, restProps = _object_without_properties._(_param, [
        "children",
        "isShown",
        "offsetX",
        "offsetY",
        "alignX",
        "alignY",
        "onClose",
        "cornerOffset",
        "cornerAbsoluteOffset",
        "arrow",
        "arrowPadding",
        "getRootRef",
        "placement",
        "maxWidth"
    ]);
    var _React_useState = _sliced_to_array._(_react.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(null), 2), target = _React_useState1[0], setTarget = _React_useState1[1];
    /* eslint-disable no-restricted-properties */ var tooltipContainer = _react.useMemo(function() {
        return target === null || target === void 0 ? void 0 : target.closest("[".concat(_TooltipContainer.tooltipContainerAttr, "]"));
    }, [
        target
    ]);
    var entering = (0, _NavTransitionContext.useNavTransition)().entering;
    var isShown = isShownProp && tooltipContainer && !entering;
    var placement = placementProp || getDefaultPlacement(alignX, alignY);
    var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placement);
    if (process.env.NODE_ENV === "development") {
        var multiChildren = _react.Children.count(children) > 1;
        // Empty children is a noop
        var primitiveChild = (0, _vkjs.hasReactNode)(children) && typeof children !== "object";
        (multiChildren || primitiveChild) && warn([
            "children должен быть одним React элементом, получено",
            multiChildren && "несколько",
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(" "), "error");
    }
    var floatingPositionStrategy = _react.useMemo(function() {
        return (target === null || target === void 0 ? void 0 : target.style.position) === "fixed" ? "fixed" : "absolute";
    }, [
        target
    ]);
    if (process.env.NODE_ENV === "development" && target && !tooltipContainer) {
        throw new Error("Use TooltipContainer for Tooltip outside Panel (see docs)");
    }
    var memoizedMiddlewares = _react.useMemo(function() {
        var middlewares = [
            (0, _floating.offsetMiddleware)({
                crossAxis: offsetX,
                mainAxis: offsetY
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push((0, _floating.flipMiddleware)());
        } else {
            middlewares.push((0, _floating.autoPlacementMiddleware)({
                alignment: placement ? (0, _floating.getAutoPlacementAlign)(placement) : null
            }));
        }
        middlewares.push((0, _floating.shiftMiddleware)());
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push((0, _floating.arrowMiddleware)({
                element: arrowRef,
                padding: arrowPadding
            }));
            middlewares.push({
                name: "arrowOffset",
                fn: function fn(param) {
                    var placement = param.placement, middlewareData = param.middlewareData;
                    if (!middlewareData.arrow) {
                        return Promise.resolve({});
                    }
                    if (isVerticalPlacement(placement)) {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.x = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.x !== undefined) {
                            middlewareData.arrow.x += cornerOffset;
                        }
                    } else {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.y = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.y !== undefined) {
                            middlewareData.arrow.y += cornerOffset;
                        }
                    }
                    return Promise.resolve({});
                }
            });
        }
        return middlewares;
    }, [
        arrow,
        arrowRef,
        arrowPadding,
        cornerAbsoluteOffset,
        cornerOffset,
        offsetX,
        offsetY,
        placement,
        isNotAutoPlacement
    ]);
    var _useFloating = (0, _floating.useFloating)({
        strategy: floatingPositionStrategy,
        placement: isNotAutoPlacement ? placement : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: _floating.autoUpdateFloatingElement
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow;
    var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/ _react.isValidElement(children) ? children.props.getRootRef : null;
    var patchedRef = (0, _useExternRef.useExternRef)(setTarget, refs.setReference, childRef);
    var child = /*#__PURE__*/ _react.isValidElement(children) ? /*#__PURE__*/ _react.cloneElement(children, _define_property._({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children;
    var tooltipBaseRef = (0, _useExternRef.useExternRef)(refs.setFloating, getRootRef);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, isShown && target != null && /*#__PURE__*/ _reactdom.default.createPortal(/*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_TooltipBase.TooltipBase, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: tooltipBaseRef,
        floatingStyle: (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY),
        withArrow: arrow,
        arrowCoords: arrowCoords,
        arrowPlacement: resolvedPlacement,
        getArrowRef: setArrowRef,
        maxWidth: maxWidth
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTooltip__overlay",
        onClickCapture: onClose
    })), tooltipContainer));
};

//# sourceMappingURL=Tooltip.js.map