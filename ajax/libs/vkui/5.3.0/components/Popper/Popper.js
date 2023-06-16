import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import _to_consumable_array from "@swc/helpers/src/_to_consumable_array.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, sizeMiddleware, useFloating } from "../../lib/floating";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { ARROW_HEIGHT, ARROW_PADDING, PopperArrow } from "../PopperArrow/PopperArrow";
/**
 * @see https://vkcom.github.io/VKUI/#/Popper
 */ export var Popper = function(_param) {
    var targetRef = _param.targetRef, children = _param.children, getRef = _param.getRef, tmp = _param.placement, placementProp = tmp === void 0 ? "bottom-start" : tmp, onPlacementChange = _param.onPlacementChange, arrow = _param.arrow, arrowClassName = _param.arrowClassName, sameWidth = _param.sameWidth, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, _param_offsetSkidding = _param.offsetSkidding, offsetSkidding = _param_offsetSkidding === void 0 ? 0 : _param_offsetSkidding, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, _param_autoUpdateOnTargetResize = _param.autoUpdateOnTargetResize, autoUpdateOnTargetResize = _param_autoUpdateOnTargetResize === void 0 ? false : _param_autoUpdateOnTargetResize, styleProp = _param.style, customMiddlewares = _param.customMiddlewares, renderContent = _param.renderContent, className = _param.className, restProps = _object_without_properties(_param, [
        "targetRef",
        "children",
        "getRef",
        "placement",
        "onPlacementChange",
        "arrow",
        "arrowClassName",
        "sameWidth",
        "offsetDistance",
        "offsetSkidding",
        "forcePortal",
        "autoUpdateOnTargetResize",
        "style",
        "customMiddlewares",
        "renderContent",
        "className"
    ]);
    var arrowRef = React.useRef(null);
    var isNotAutoPlacement = checkIsNotAutoPlacement(placementProp);
    var memoizedMiddlewares = React.useMemo(function() {
        var middlewares = [
            offsetMiddleware({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + ARROW_HEIGHT : offsetDistance
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
                padding: ARROW_PADDING
            }));
        }
        return middlewares;
    }, [
        arrow,
        sameWidth,
        offsetSkidding,
        offsetDistance,
        customMiddlewares,
        placementProp,
        isNotAutoPlacement
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
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, floatingPositionStrategy = _useFloating.strategy, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow;
    var handleRootRef = useExternRef(refs.setFloating, getRef);
    React.useEffect(function() {
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    React.useEffect(function() {
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    var dropdown = /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiPopper", className),
        ref: handleRootRef,
        style: _object_spread({}, styleProp, convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined))
    }), arrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: arrowRef
    }), renderContent ? renderContent({
        className: ""
    }) : children);
    return /*#__PURE__*/ React.createElement(AppRootPortal, {
        forcePortal: forcePortal
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map