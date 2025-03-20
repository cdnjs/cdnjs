"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Popover", {
    enumerable: true,
    get: function() {
        return Popover;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePatchChildren = require("../../hooks/usePatchChildren");
const _accessibility = require("../../lib/accessibility");
const _animation = require("../../lib/animation");
const _floating = require("../../lib/floating");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _DefaultIcon = require("../FloatingArrow/DefaultIcon");
const _FloatingArrow = require("../FloatingArrow/FloatingArrow");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const Popover = (_param)=>{
    var { // UsePopoverProps
    arrow: withArrow, arrowHeight = _DefaultIcon.DEFAULT_ARROW_HEIGHT, arrowPadding = _DefaultIcon.DEFAULT_ARROW_PADDING, placement: expectedPlacement = 'bottom-start', onPlacementChange, disableFlipMiddleware = false, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, keepMounted = false, customMiddlewares, // uncontrolled
    defaultShown = false, // controlled
    shown: shownProp, onShownChange, onShownChanged, // Для AppRootPortal
    usePortal = true, // Для FloatingArrow
    arrowProps, ArrowIcon = _DefaultIcon.DefaultIcon, // FocusTrapProps
    autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
    role = 'dialog' } = _param, restPopoverProps = _object_without_properties._(_param, [
        "arrow",
        "arrowHeight",
        "arrowPadding",
        "placement",
        "onPlacementChange",
        "disableFlipMiddleware",
        "trigger",
        "content",
        "hoverDelay",
        "closeAfterClick",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "sameWidth",
        "hideWhenReferenceHidden",
        "disabled",
        "disableInteractive",
        "disableCloseOnClickOutside",
        "disableCloseOnEscKey",
        "keepMounted",
        "customMiddlewares",
        "defaultShown",
        "shown",
        "onShownChange",
        "onShownChanged",
        "usePortal",
        "arrowProps",
        "ArrowIcon",
        "autoFocus",
        "restoreFocus",
        "className",
        "children",
        "noStyling",
        "zIndex",
        "role"
    ]);
    const [arrowRef, setArrowRef] = _react.useState(null);
    const { middlewares, strictPlacement } = (0, _floating.useFloatingMiddlewaresBootstrap)({
        arrow: withArrow,
        arrowRef,
        arrowHeight,
        arrowPadding,
        placement: expectedPlacement,
        offsetByMainAxis,
        offsetByCrossAxis,
        sameWidth,
        hideWhenReferenceHidden,
        disableFlipMiddleware,
        customMiddlewares
    });
    const { placement: resolvedPlacement, shown, willBeHide, refs, referenceProps, floatingProps, middlewareData, onClose, onRestoreFocus, onEscapeKeyDown } = (0, _floating.useFloatingWithInteractions)({
        middlewares,
        placement: strictPlacement,
        trigger,
        hoverDelay,
        closeAfterClick,
        disabled,
        disableInteractive,
        disableCloseOnClickOutside,
        disableCloseOnEscKey,
        defaultShown,
        shown: shownProp,
        onShownChange,
        onShownChanged
    });
    (0, _floating.usePlacementChangeCallback)(expectedPlacement, resolvedPlacement, onPlacementChange);
    const [, child] = (0, _usePatchChildren.usePatchChildren)(children, (0, _accessibility.injectAriaExpandedPropByRole)(referenceProps, shown, role), refs.setReference);
    let popover = null;
    if (shown || keepMounted) {
        const hidden = keepMounted && !shown;
        let arrow = null;
        if (withArrow) {
            const { arrow: arrowCoords } = middlewareData;
            arrow = /*#__PURE__*/ (0, _jsxruntime.jsx)(_FloatingArrow.FloatingArrow, _object_spread_props._(_object_spread._({
                iconClassName: noStyling ? undefined : "vkuiPopover__arrow"
            }, arrowProps), {
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef,
                Icon: ArrowIcon
            }));
        }
        popover = /*#__PURE__*/ (0, _jsxruntime.jsx)(_AppRootPortal.AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
                ref: refs.setFloating,
                className: (0, _vkjs.classNames)("vkuiPopover", hidden && "vkuiPopover--hidden")
            }, floatingProps), {
                style: _object_spread._({
                    zIndex: !hidden ? zIndex : undefined
                }, floatingProps.style),
                children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restPopoverProps), {
                    role: role,
                    className: (0, _vkjs.classNames)("vkuiPopover__in", noStyling ? undefined : "vkuiPopover__in--withStyling", willBeHide ? _animation.animationFadeClassNames.out : _animation.animationFadeClassNames.in, _animation.transformOriginClassNames[resolvedPlacement], className),
                    mount: !hidden,
                    disabled: hidden,
                    autoFocus: disableInteractive ? false : autoFocus,
                    restoreFocus: restoreFocus ? onRestoreFocus : false,
                    onClose: onEscapeKeyDown,
                    children: [
                        arrow,
                        typeof content === 'function' ? content({
                            onClose
                        }) : content
                    ]
                }))
            }))
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_react.Fragment, {
        children: [
            child,
            popover
        ]
    });
};

//# sourceMappingURL=Popover.js.map