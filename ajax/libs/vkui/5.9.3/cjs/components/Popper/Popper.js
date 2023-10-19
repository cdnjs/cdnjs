"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Popper", {
    enumerable: true,
    get: function() {
        return Popper;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useExternRef = require("../../hooks/useExternRef");
var _floating = require("../../lib/floating");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _AppRootPortal = require("../AppRoot/AppRootPortal");
var _DefaultIcon = require("../PopperArrow/DefaultIcon");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _RootComponent = require("../RootComponent/RootComponent");
var Popper = function(_param) {
    var targetRef = _param.targetRef, children = _param.children, getRef = _param.getRef, tmp = _param.placement, placementProp = tmp === void 0 ? "bottom-start" : tmp, onPlacementChange = _param.onPlacementChange, arrow = _param.arrow, _param_arrowHeight = _param.arrowHeight, arrowHeight = _param_arrowHeight === void 0 ? _DefaultIcon.DEFAULT_ARROW_HEIGHT : _param_arrowHeight, _param_arrowPadding = _param.arrowPadding, arrowPadding = _param_arrowPadding === void 0 ? _DefaultIcon.DEFAULT_ARROW_PADDING : _param_arrowPadding, arrowClassName = _param.arrowClassName, _param_ArrowIcon = _param.ArrowIcon, ArrowIcon = _param_ArrowIcon === void 0 ? _DefaultIcon.DefaultIcon : _param_ArrowIcon, sameWidth = _param.sameWidth, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 8 : _param_offsetDistance, _param_offsetSkidding = _param.offsetSkidding, offsetSkidding = _param_offsetSkidding === void 0 ? 0 : _param_offsetSkidding, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, portalRoot = _param.portalRoot, _param_autoUpdateOnTargetResize = _param.autoUpdateOnTargetResize, autoUpdateOnTargetResize = _param_autoUpdateOnTargetResize === void 0 ? false : _param_autoUpdateOnTargetResize, styleProp = _param.style, customMiddlewares = _param.customMiddlewares, renderContent = _param.renderContent, getRootRef = _param.getRootRef, hideWhenReferenceHidden = _param.hideWhenReferenceHidden, restProps = _object_without_properties._(_param, [
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
    var _React_useState = _sliced_to_array._(_react.useState(null), 2), arrowRef = _React_useState[0], setArrowRef = _React_useState[1];
    var isNotAutoPlacement = (0, _floating.checkIsNotAutoPlacement)(placementProp);
    var memoizedMiddlewares = _react.useMemo(function() {
        var middlewares = [
            (0, _floating.offsetMiddleware)({
                crossAxis: offsetSkidding,
                mainAxis: arrow ? offsetDistance + arrowHeight : offsetDistance
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push((0, _floating.flipMiddleware)());
        } else {
            middlewares.push((0, _floating.autoPlacementMiddleware)({
                alignment: (0, _floating.getAutoPlacementAlign)(placementProp)
            }));
        }
        middlewares.push((0, _floating.shiftMiddleware)());
        if (sameWidth) {
            middlewares.push((0, _floating.sizeMiddleware)({
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
            (_middlewares = middlewares).push.apply(_middlewares, _to_consumable_array._(customMiddlewares));
        }
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push((0, _floating.arrowMiddleware)({
                element: arrowRef,
                padding: arrowPadding
            }));
        }
        if (hideWhenReferenceHidden) {
            middlewares.push((0, _floating.hideMiddleware)());
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
    var _useFloating = (0, _floating.useFloating)({
        placement: isNotAutoPlacement ? placementProp : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: function whileElementsMounted() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            return _floating.autoUpdateFloatingElement.apply(void 0, _to_consumable_array._(args).concat([
                {
                    elementResize: autoUpdateOnTargetResize
                }
            ]));
        }
    }), floatingDataX = _useFloating.x, floatingDataY = _useFloating.y, floatingPositionStrategy = _useFloating.strategy, resolvedPlacement = _useFloating.placement, refs = _useFloating.refs, _useFloating_middlewareData = _useFloating.middlewareData, arrowCoords = _useFloating_middlewareData.arrow, hide = _useFloating_middlewareData.hide;
    // TODO [>=6]: убрать getRef
    var handleRootRef = (0, _useExternRef.useExternRef)(refs.setFloating, getRef, getRootRef);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        refs.setReference(targetRef.current);
    }, [
        refs,
        targetRef
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (resolvedPlacement && onPlacementChange) {
            onPlacementChange({
                placement: resolvedPlacement
            });
        }
    }, [
        onPlacementChange,
        resolvedPlacement
    ]);
    var dropdown = /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiPopper",
        getRootRef: handleRootRef,
        style: _object_spread._({}, styleProp, (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined), (hide === null || hide === void 0 ? void 0 : hide.referenceHidden) && {
            visibility: "hidden"
        })
    }), arrow && /*#__PURE__*/ _react.createElement(_PopperArrow.PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: arrowClassName,
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    }), renderContent ? renderContent({
        className: ""
    }) : children);
    return /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, {
        forcePortal: forcePortal,
        portalRoot: portalRoot
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map