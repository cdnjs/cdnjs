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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useExternRef = require("../../hooks/useExternRef");
const _floating = require("../../lib/floating");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _DefaultIcon = require("../FloatingArrow/DefaultIcon");
const _FloatingArrow = require("../FloatingArrow/FloatingArrow");
const _RootComponent = require("../RootComponent/RootComponent");
const Popper = (_param)=>{
    var { // UseFloatingMiddlewaresBootstrapProps
    placement: placementProp = 'bottom-start', sameWidth, hideWhenReferenceHidden, offsetByMainAxis = 8, offsetByCrossAxis = 0, arrow, arrowHeight = _DefaultIcon.DEFAULT_ARROW_HEIGHT, arrowPadding = _DefaultIcon.DEFAULT_ARROW_PADDING, customMiddlewares, // UseFloatingProps
    autoUpdateOnTargetResize = false, // ArrowProps
    arrowProps, ArrowIcon = _DefaultIcon.DefaultIcon, // rest
    targetRef, getRootRef, children, usePortal = true, style: styleProp, onPlacementChange } = _param, restProps = _object_without_properties._(_param, [
        "placement",
        "sameWidth",
        "hideWhenReferenceHidden",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "arrow",
        "arrowHeight",
        "arrowPadding",
        "customMiddlewares",
        "autoUpdateOnTargetResize",
        "arrowProps",
        "ArrowIcon",
        "targetRef",
        "getRootRef",
        "children",
        "usePortal",
        "style",
        "onPlacementChange"
    ]);
    const [arrowRef, setArrowRef] = _react.useState(null);
    const { strictPlacement, middlewares } = (0, _floating.useFloatingMiddlewaresBootstrap)({
        placement: placementProp,
        sameWidth,
        arrow,
        arrowRef,
        arrowHeight,
        arrowPadding,
        offsetByMainAxis,
        offsetByCrossAxis,
        hideWhenReferenceHidden,
        customMiddlewares
    });
    const { x: floatingDataX, y: floatingDataY, strategy: floatingPositionStrategy, placement: resolvedPlacement, refs, middlewareData } = (0, _floating.useFloating)({
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted (...args) {
            /* istanbul ignore next: не знаю как проверить */ return (0, _floating.autoUpdateFloatingElement)(...args, {
                elementResize: autoUpdateOnTargetResize
            });
        }
    });
    (0, _floating.usePlacementChangeCallback)(resolvedPlacement, onPlacementChange);
    const { arrow: arrowCoords } = middlewareData;
    const handleRootRef = (0, _useExternRef.useExternRef)(refs.setFloating, getRootRef);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        refs.setReference('current' in targetRef ? targetRef.current : targetRef);
    }, [
        refs.setReference,
        targetRef
    ]);
    const dropdown = /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiPopper",
        getRootRef: handleRootRef,
        style: _object_spread._({}, styleProp, (0, _floating.convertFloatingDataToReactCSSProperties)(floatingPositionStrategy, floatingDataX, floatingDataY, sameWidth ? null : undefined, middlewareData))
    }), arrow && /*#__PURE__*/ _react.createElement(_FloatingArrow.FloatingArrow, _object_spread_props._(_object_spread._({}, arrowProps), {
        coords: arrowCoords,
        placement: resolvedPlacement,
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    })), children);
    return /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, {
        usePortal: usePortal
    }, dropdown);
};

//# sourceMappingURL=Popper.js.map