"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OnboardingTooltip", {
    enumerable: true,
    get: function() {
        return OnboardingTooltip;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const _usePatchChildren = require("../../hooks/usePatchChildren");
const _createPortal = require("../../lib/createPortal");
const _floating = require("../../lib/floating");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _warnOnce = require("../../lib/warnOnce");
const _DefaultIcon = require("../FloatingArrow/DefaultIcon");
const _NavTransitionContext = require("../NavTransitionContext/NavTransitionContext");
const _TooltipBase = require("../TooltipBase/TooltipBase");
const _OnboardingTooltipContainer = require("./OnboardingTooltipContainer");
const warn = (0, _warnOnce.warnOnce)('OnboardingTooltip');
const OnboardingTooltip = (_param)=>{
    var { id: idProp, children, shown: shownProp = true, arrowPadding = _DefaultIcon.DEFAULT_ARROW_PADDING, arrowHeight = _DefaultIcon.DEFAULT_ARROW_HEIGHT, offsetByMainAxis = 0, offsetByCrossAxis = 0, arrowOffset = 0, isStaticArrowOffset = false, onClose, placement: placementProp = 'bottom-start', maxWidth = _TooltipBase.TOOLTIP_MAX_WIDTH, style: styleProp, getRootRef, disableArrow = false, onPlacementChange } = _param, restProps = _object_without_properties._(_param, [
        "id",
        "children",
        "shown",
        "arrowPadding",
        "arrowHeight",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "arrowOffset",
        "isStaticArrowOffset",
        "onClose",
        "placement",
        "maxWidth",
        "style",
        "getRootRef",
        "disableArrow",
        "onPlacementChange"
    ]);
    const generatedId = _react.useId();
    const tooltipId = idProp || generatedId;
    const { entering } = (0, _NavTransitionContext.useNavTransition)();
    const [arrowRef, setArrowRef] = _react.useState(null);
    const [tooltipContainer, setTooltipContainer] = _react.useState(null);
    const [positionStrategy, setPositionStrategy] = _react.useState('absolute');
    const shown = shownProp && tooltipContainer && !entering;
    const { middlewares, strictPlacement } = (0, _floating.useFloatingMiddlewaresBootstrap)({
        placement: placementProp,
        offsetByMainAxis,
        offsetByCrossAxis,
        arrowRef,
        arrow: !disableArrow,
        arrowHeight,
        arrowPadding
    });
    const { x: floatingDataX, y: floatingDataY, refs, placement: resolvedPlacement, middlewareData: { arrow: arrowCoords } } = (0, _floating.useFloating)({
        strategy: positionStrategy,
        placement: strictPlacement,
        middleware: middlewares,
        whileElementsMounted: _floating.autoUpdateFloatingElement
    });
    const tooltipRef = (0, _useExternRef.useExternRef)(getRootRef, refs.setFloating);
    const [childRef, child] = (0, _usePatchChildren.usePatchChildren)(children, {
        'aria-describedby': shown ? tooltipId : undefined
    });
    (0, _floating.usePlacementChangeCallback)(resolvedPlacement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        const floatingStyle = (0, _floating.convertFloatingDataToReactCSSProperties)(positionStrategy, floatingDataX, floatingDataY);
        if (styleProp) {
            Object.assign(floatingStyle, styleProp);
        }
        tooltip = (0, _createPortal.createPortal)(/*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement(_TooltipBase.TooltipBase, _object_spread_props._(_object_spread._({}, restProps), {
            id: tooltipId,
            getRootRef: tooltipRef,
            style: floatingStyle,
            maxWidth: maxWidth,
            arrowProps: disableArrow ? undefined : {
                offset: arrowOffset,
                isStaticOffset: isStaticArrowOffset,
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef
            }
        })), /*#__PURE__*/ _react.createElement("div", {
            className: "vkuiOnboardingTooltip__overlay",
            onClickCapture: onClose
        })), tooltipContainer);
    }
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function initialize() {
        const referenceEl = childRef.current;
        if (referenceEl) {
            setTooltipContainer(referenceEl.closest(`[${_OnboardingTooltipContainer.onboardingTooltipContainerAttr}]`));
            setPositionStrategy(referenceEl.style.position === 'fixed' ? 'fixed' : 'absolute');
            refs.setReference(referenceEl);
        }
    }, [
        childRef
    ]);
    if (process.env.NODE_ENV === 'development') {
        const multiChildren = _react.Children.count(children) > 1;
        // Empty children is a noop
        const primitiveChild = (0, _vkjs.hasReactNode)(children) && typeof children !== 'object';
        (multiChildren || primitiveChild) && warn([
            'children должен быть одним React элементом, получено',
            multiChildren && 'несколько',
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(' '), 'error');
        if (refs.reference.current && !tooltipContainer) {
            throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
        }
    }
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, tooltip);
};

//# sourceMappingURL=OnboardingTooltip.js.map