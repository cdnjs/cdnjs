import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import * as React from "react";
import { useExternRef } from "../../hooks/useExternRef";
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, hideMiddleware, offsetMiddleware, shiftMiddleware, sizeMiddleware, useFloating } from "../../lib/floating";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from "../PopperArrow/DefaultIcon";
import { PopperArrow } from "../PopperArrow/PopperArrow";
import { RootComponent } from "../RootComponent/RootComponent";
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export var Popper = function(_param) {
    var targetRef = _param.targetRef, children = _param.children, getRef = _param.getRef, tmp = _param.placement, placementProp = tmp === void 0 ? "bottom-start" : tmp, onPlacementChange = _param.onPlacementChange, arrow = _param.arrow, _param_arrowHeight = _param.arrowHeight, arrowHeight = _param_arrowHeight === void 0 ? DEFAULT_ARROW_HEIGHT : _param_arrowHeight, _param_arrowPadding = _param.arrowPadding, arrowPadding = _param_arrowPadding === void 0 ? DEFAULT_ARROW_PADDING : _param_arrowPadding, arrowClassName = _param.arrowClassName, _param_ArrowIcon = _param.ArrowIcon, ArrowIcon = _param_ArrowIcon === void 0 ? DefaultIcon : _param_ArrowIcon, sameWidth = _param.sameWidth, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, _param_offsetSkidding = _param.offsetSkidding, offsetSkidding = _param_offsetSkidding === void 0 ? 0 : _param_offsetSkidding, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, portalRoot = _param.portalRoot, _param_autoUpdateOnTargetResize = _param.autoUpdateOnTargetResize, autoUpdateOnTargetResize = _param_autoUpdateOnTargetResize === void 0 ? false : _param_autoUpdateOnTargetResize, styleProp = _param.style, customMiddlewares = _param.customMiddlewares, renderContent = _param.renderContent, getRootRef = _param.getRootRef, hideWhenReferenceHidden = _param.hideWhenReferenceHidden, restProps = _object_without_properties(_param, [
        "targetRef",
        "children",
        "getRef",
        "placement",
        "onPlacementChange",
        "arrow",
        "arrowHeight",
        "arrowPadding",
        "arrowClassName",
        "ArrowIcon",
        "sameWidth",
        "offsetDistance",
        "offsetSkidding",
        "forcePortal",
        "portalRoot",
        "autoUpdateOnTargetResize",
        "style",
        "customMiddlewares",
        "renderContent",
        "getRootRef",
        "hideWhenReferenceHidden"
    ]);
    var _React_useState = _sliced_to_array(React.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var isNotAutoPlacement = checkIsNotAutoPlacement(placementProp);
    var memoizedMiddlewares = React.useMemo(function() {
        var middlewares = [
            offsetMiddleware({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + arrowHeight : offsetDistance
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push(flipMiddleware());
        } else {
            middlewares.push(autoPlacementMiddleware({
                alignment: getAutoPlacementAlign(placementProp)
            }));
        }
        middlewares.push(shiftMiddleware());
        if (sameWidth) {
            middlewares.push(sizeMiddleware({
                apply: function apply(param) {
                    var rects = param.rects, elements = param.elements;
                    Object.assign(elements.floating.style, {
                        width: "".concat(rects.reference.width, "px")
                    });
                }
            }));
        }
        if (customMiddlewares) {
            var _middlewares;
            (_middlewares = middlewares).push.apply(_middlewares, _to_consumable_array(customMiddlewares));
        }
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push(arrowMiddleware({
                element: arrowRef,
                padding: arrowPadding
            }));
        }
        if (hideWhenReferenceHidden) {
            middlewares.push(hideMiddleware());
        }
        return middlewares;
    }, [
        offsetSkidding,
        arrowRef,
        arrow,
        arrowHeight,
        arrowPadding,
        offsetDistance,
        isNotAutoPlacement,
        sameWidth,
        customMiddlewares,
        placementProp,
        hideWhenReferenceHidden
    ]);
    var _useFloating = useFloating({
        placement: isNotAutoPlacement ? placementProp : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: function whileElementsMounted() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return autoUpdateFloatingElement.apply(void 0, _to_consumable_array(args).concat([
                {
                    elementResize: autoUpdateOnTargetResize
                }
            ]));
        }
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, floatingPositionStrategy = _useFloating.strategy, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow, hide = _useFloating_middlewareData.hide;
    // TODO [>=6]: убрать getRef
    var handleRootRef = useExternRef(refs.setFloating, getRef, getRootRef);
    useIsomorphicLayoutEffect(function() {
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    useIsomorphicLayoutEffect(function() {
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    var dropdown = /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: "vkuiPopper",
        getRootRef: handleRootRef,
        style: _object_spread({}, styleProp, convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined), (hide === null || hide === void 0 ? void 0 : hide.referenceHidden) && {
            visibility: "hidden"
        })
    }), arrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    }), renderContent ? renderContent({
        className: ""
    }) : children);
    return /*#__PURE__*/ React.createElement(AppRootPortal, {
        forcePortal: forcePortal,
        portalRoot: portalRoot
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map