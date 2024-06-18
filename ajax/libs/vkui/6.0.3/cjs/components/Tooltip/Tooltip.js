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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("@vkontakte/vkui-floating-ui/utils/dom");
const _useExternRef = require("../../hooks/useExternRef");
const _usePatchChildren = require("../../hooks/usePatchChildren");
const _accessibility = require("../../lib/accessibility");
const _cssAnimation = require("../../lib/cssAnimation");
const _floating = require("../../lib/floating");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _TooltipBase = require("../TooltipBase/TooltipBase");
const _Subhead = require("../Typography/Subhead/Subhead");
const Tooltip = (_param)=>{
    var { // UseFloatingMiddlewaresBootstrapOptions
    placement: placementProp = 'bottom', arrowPadding = 10, arrowHeight = 8, offsetByMainAxis = 8, offsetByCrossAxis = 0, hideWhenReferenceHidden, // useFloatingWithInteractions
    defaultShown, shown: shownProp, onShownChange, hoverDelay = 150, // инверсированные св-ва для useFloatingWithInteractions
    enableInteractive = false, disableArrow = false, disableCloseAfterClick = false, // Reference
    children, // AppRootProps
    usePortal, // TooltipBaseProps
    id: idProp, getRootRef, text, header, appearance = 'neutral', style: styleProp, className, zIndex = 'var(--vkui--z_index_popout)', onPlacementChange } = _param, popperProps = _object_without_properties._(_param, [
        "placement",
        "arrowPadding",
        "arrowHeight",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "hideWhenReferenceHidden",
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
        "text",
        "header",
        "appearance",
        "style",
        "className",
        "zIndex",
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
        arrowHeight
    });
    const { shown, willBeHide, placement, refs, referenceProps, floatingProps, middlewareData, onEscapeKeyDown } = (0, _floating.useFloatingWithInteractions)({
        defaultShown,
        shown: shownProp,
        onShownChange,
        placement: strictPlacement,
        trigger: [
            'hover',
            'focus'
        ],
        hoverDelay,
        closeAfterClick: !disableCloseAfterClick,
        disableInteractive: !enableInteractive,
        middlewares
    });
    const tooltipRef = (0, _useExternRef.useExternRef)(getRootRef, refs.setFloating);
    (0, _floating.usePlacementChangeCallback)(placement, onPlacementChange);
    let tooltip = null;
    if (shown) {
        referenceProps['aria-describedby'] = tooltipId;
        floatingProps.style.zIndex = zIndex;
        if (styleProp) {
            Object.assign(floatingProps.style, styleProp);
        }
        tooltip = /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, {
            usePortal: usePortal
        }, /*#__PURE__*/ _react.createElement(_TooltipBase.TooltipBase, _object_spread_props._(_object_spread._({}, popperProps, floatingProps), {
            id: tooltipId,
            getRootRef: tooltipRef,
            appearance: appearance,
            arrowProps: disableArrow ? undefined : {
                placement,
                coords: (0, _floating.getArrowCoordsByMiddlewareData)(middlewareData),
                getRootRef: setArrowRef
            },
            text: /*#__PURE__*/ _react.createElement(_react.Fragment, null, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
                weight: "2"
            }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, null, text)),
            className: (0, _vkjs.classNames)(willBeHide ? _cssAnimation.animationFadeClassNames.out : _cssAnimation.animationFadeClassNames.in, className)
        })));
    }
    const [childRef, child] = (0, _usePatchChildren.usePatchChildren)(children, referenceProps, refs.setReference);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function handleGlobalKeyDownIfTooltipShown() {
        if (!onEscapeKeyDown || !shown) {
            return;
        }
        const handleKeyDown = (event)=>{
            if ((0, _accessibility.pressedKey)(event) === _accessibility.Keys.ESCAPE) {
                onEscapeKeyDown();
            }
        };
        const doc = (0, _dom.getWindow)(childRef.current).document;
        doc.addEventListener('keydown', handleKeyDown, {
            passive: true,
            capture: true
        });
        return ()=>{
            doc.removeEventListener('keydown', handleKeyDown, {
                capture: true
            });
        };
    }, [
        shown,
        childRef,
        onEscapeKeyDown
    ]);
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, tooltip);
};

//# sourceMappingURL=Tooltip.js.map