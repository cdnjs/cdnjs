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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _useGlobalEscKeyDown = require("../../hooks/useGlobalEscKeyDown");
const _usePatchChildren = require("../../hooks/usePatchChildren");
const _animation = require("../../lib/animation");
const _floating = require("../../lib/floating");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _TooltipBase = require("../TooltipBase/TooltipBase");
const Tooltip = (_param)=>{
    var { // UseFloatingMiddlewaresBootstrapOptions
    placement: placementProp = 'bottom', arrowPadding = 10, arrowHeight = 8, offsetByMainAxis = 8, offsetByCrossAxis = 0, hideWhenReferenceHidden, disableFlipMiddleware = false, disableTriggerOnFocus = false, // useFloatingWithInteractions
    defaultShown, shown: shownProp, onShownChange, hoverDelay = 150, // инверсированные св-ва для useFloatingWithInteractions
    enableInteractive = false, disableArrow = false, disableCloseAfterClick = false, // Reference
    children, // AppRootProps
    usePortal, // TooltipBaseProps
    id: idProp, getRootRef, appearance = 'neutral', style: styleProp, className, zIndex = 'var(--vkui--z_index_popout)', closable, onPlacementChange } = _param, popperProps = _object_without_properties._(_param, [
        "placement",
        "arrowPadding",
        "arrowHeight",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "hideWhenReferenceHidden",
        "disableFlipMiddleware",
        "disableTriggerOnFocus",
        "defaultShown",
        "shown",
        "onShownChange",
        "hoverDelay",
        "enableInteractive",
        "disableArrow",
        "disableCloseAfterClick",
        "children",
        "usePortal",
        "id",
        "getRootRef",
        "appearance",
        "style",
        "className",
        "zIndex",
        "closable",
        "onPlacementChange"
    ]);
    const generatedId = _react.useId();
    const tooltipId = idProp || generatedId;
    const [arrowRef, setArrowRef] = _react.useState(null);
    const { middlewares, strictPlacement } = (0, _floating.useFloatingMiddlewaresBootstrap)({
        placement: placementProp,
        offsetByMainAxis,
        offsetByCrossAxis,
        hideWhenReferenceHidden,
        arrow: !disableArrow,
        arrowRef,
        arrowPadding,
        arrowHeight,
        disableFlipMiddleware
    });
    const { shown, willBeHide, placement, refs, referenceProps, floatingProps, middlewareData, onClose, onEscapeKeyDown } = (0, _floating.useFloatingWithInteractions)({
        defaultShown,
        shown: shownProp,
        onShownChange,
        placement: strictPlacement,
        trigger: disableTriggerOnFocus ? 'hover' : [
            'hover',
            'focus'
        ],
        hoverDelay,
        closeAfterClick: !disableCloseAfterClick,
        disableInteractive: !enableInteractive,
        middlewares
    });
    const tooltipRef = (0, _useExternRef.useExternRef)(getRootRef, refs.setFloating);
    (0, _floating.usePlacementChangeCallback)(placementProp, placement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        tooltip = /*#__PURE__*/ (0, _jsxruntime.jsx)(_AppRootPortal.AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_TooltipBase.TooltipBase, _object_spread_props._(_object_spread._({}, popperProps, floatingProps), {
                style: _object_spread._(_object_spread_props._(_object_spread._({}, floatingProps.style), {
                    zIndex
                }), styleProp),
                id: tooltipId,
                getRootRef: tooltipRef,
                appearance: appearance,
                arrowProps: disableArrow ? undefined : {
                    placement,
                    coords: (0, _floating.getArrowCoordsByMiddlewareData)(middlewareData),
                    getRootRef: setArrowRef
                },
                className: (0, _vkjs.classNames)(willBeHide ? _animation.animationFadeClassNames.out : _animation.animationFadeClassNames.in, className),
                onCloseIconClick: closable ? onClose : undefined
            }))
        });
    }
    const [, child] = (0, _usePatchChildren.usePatchChildren)(children, _object_spread._({}, referenceProps, shown && {
        'aria-describedby': tooltipId
    }), refs.setReference);
    (0, _useGlobalEscKeyDown.useGlobalEscKeyDown)(shown, onEscapeKeyDown);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
        children: [
            child,
            tooltip
        ]
    });
};

//# sourceMappingURL=Tooltip.js.map