import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import ReactDOM from "react-dom";
import { hasReactNode } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, useFloating } from "../../lib/floating";
import { warnOnce } from "../../lib/warnOnce";
import { useNavTransition } from "../NavTransitionContext/NavTransitionContext";
import { TOOLTIP_MAX_WIDTH, TooltipBase } from "../TooltipBase/TooltipBase";
import { tooltipContainerAttr } from "./TooltipContainer";
var isDOMTypeElement = function(element) {
    return /*#__PURE__*/ React.isValidElement(element) && typeof element.type === "string";
};
var warn = warnOnce("Tooltip");
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
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export var Tooltip = function(_param) {
    var children = _param.children, tmp = _param.isShown, isShownProp = tmp === void 0 ? true : tmp, _param_offsetX = _param.offsetX, offsetX = _param_offsetX === void 0 ? 0 : _param_offsetX, _param_offsetY = _param.offsetY, offsetY = _param_offsetY === void 0 ? 15 : _param_offsetY, alignX = _param.alignX, alignY = _param.alignY, onClose = _param.onClose, _param_cornerOffset = _param.cornerOffset, cornerOffset = _param_cornerOffset === void 0 ? 0 : _param_cornerOffset, cornerAbsoluteOffset = _param.cornerAbsoluteOffset, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, _param_arrowPadding = _param.arrowPadding, arrowPadding = _param_arrowPadding === void 0 ? 14 : _param_arrowPadding, getRootRef = _param.getRootRef, placementProp = _param.placement, _param_maxWidth = _param.maxWidth, maxWidth = _param_maxWidth === void 0 ? TOOLTIP_MAX_WIDTH : _param_maxWidth, restProps = _object_without_properties(_param, [
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
    var _React_useState = _sliced_to_array(React.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(null), 2), target = _React_useState1[0], setTarget = _React_useState1[1];
    /* eslint-disable no-restricted-properties */ var tooltipContainer = React.useMemo(function() {
        return target === null || target === void 0 ? void 0 : target.closest("[".concat(tooltipContainerAttr, "]"));
    }, [
        target
    ]);
    var entering = useNavTransition().entering;
    var isShown = isShownProp && tooltipContainer && !entering;
    var placement = placementProp || getDefaultPlacement(alignX, alignY);
    var isNotAutoPlacement = checkIsNotAutoPlacement(placement);
    if (process.env.NODE_ENV === "development") {
        var multiChildren = React.Children.count(children) > 1;
        // Empty children is a noop
        var primitiveChild = hasReactNode(children) && typeof children !== "object";
        (multiChildren || primitiveChild) && warn([
            "children должен быть одним React элементом, получено",
            multiChildren && "несколько",
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(" "), "error");
    }
    var floatingPositionStrategy = React.useMemo(function() {
        return (target === null || target === void 0 ? void 0 : target.style.position) === "fixed" ? "fixed" : "absolute";
    }, [
        target
    ]);
    if (process.env.NODE_ENV === "development" && target && !tooltipContainer) {
        throw new Error("Use TooltipContainer for Tooltip outside Panel (see docs)");
    }
    var memoizedMiddlewares = React.useMemo(function() {
        var middlewares = [
            offsetMiddleware({
                crossAxis: offsetX,
                mainAxis: offsetY
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push(flipMiddleware());
        } else {
            middlewares.push(autoPlacementMiddleware({
                alignment: placement ? getAutoPlacementAlign(placement) : null
            }));
        }
        middlewares.push(shiftMiddleware());
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push(arrowMiddleware({
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
    var _useFloating = useFloating({
        strategy: floatingPositionStrategy,
        placement: isNotAutoPlacement ? placement : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: autoUpdateFloatingElement
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow;
    var childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/ React.isValidElement(children) ? children.props.getRootRef : null;
    var patchedRef = useExternRef(setTarget, refs.setReference, childRef);
    var child = /*#__PURE__*/ React.isValidElement(children) ? /*#__PURE__*/ React.cloneElement(children, _define_property({}, isDOMTypeElement(children) ? "ref" : "getRootRef", patchedRef)) : children;
    var tooltipBaseRef = useExternRef(refs.setFloating, getRootRef);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TooltipBase, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: tooltipBaseRef,
        floatingStyle: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY),
        withArrow: arrow,
        arrowCoords: arrowCoords,
        arrowPlacement: resolvedPlacement,
        getArrowRef: setArrowRef,
        maxWidth: maxWidth
    })), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTooltip__overlay",
        onClickCapture: onClose
    })), tooltipContainer));
};

//# sourceMappingURL=Tooltip.js.map