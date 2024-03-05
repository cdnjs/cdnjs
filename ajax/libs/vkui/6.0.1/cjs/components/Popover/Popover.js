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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePatchChildren = require("../../hooks/usePatchChildren");
const _accessibility = require("../../lib/accessibility");
const _cssAnimation = require("../../lib/cssAnimation");
const _floating = require("../../lib/floating");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const Popover = (_param)=>{
    var { // UsePopoverProps
    placement: expectedPlacement = 'bottom-start', onPlacementChange, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, // uncontrolled
    defaultShown = false, // controlled
    shown: shownProp, onShownChange, // Для AppRootPortal
    usePortal = true, // FocusTrapProps
    autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
    role } = _param, restPopoverProps = _object_without_properties._(_param, [
        "placement",
        "onPlacementChange",
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
        "defaultShown",
        "shown",
        "onShownChange",
        "usePortal",
        "autoFocus",
        "restoreFocus",
        "className",
        "children",
        "noStyling",
        "zIndex",
        "role"
    ]);
    const { middlewares, strictPlacement } = (0, _floating.useFloatingMiddlewaresBootstrap)({
        placement: expectedPlacement,
        offsetByMainAxis,
        offsetByCrossAxis,
        sameWidth,
        hideWhenReferenceHidden
    });
    const { placement, shown, willBeHide, refs, referenceProps, floatingProps, onClose, onRestoreFocus, onEscapeKeyDown } = (0, _floating.useFloatingWithInteractions)({
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
        onShownChange
    });
    (0, _floating.usePlacementChangeCallback)(placement, onPlacementChange);
    const [, child] = (0, _usePatchChildren.usePatchChildren)(children, (0, _accessibility.injectAriaExpandedPropByRole)(referenceProps, shown, role), refs.setReference);
    let popover = null;
    if (shown) {
        floatingProps.style.zIndex = String(zIndex);
        popover = /*#__PURE__*/ _react.createElement(_AppRootPortal.AppRootPortal, {
            usePortal: usePortal
        }, /*#__PURE__*/ _react.createElement("div", _object_spread._({
            ref: refs.setFloating,
            className: "vkuiPopover"
        }, floatingProps), /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restPopoverProps), {
            role: role,
            className: (0, _vkjs.classNames)("vkuiPopover__in", noStyling ? undefined : "vkuiPopover__in--withStyling", willBeHide ? _cssAnimation.animationFadeClassNames.out : _cssAnimation.animationFadeClassNames.in, _cssAnimation.transformOriginClassNames[placement], className),
            autoFocus: disableInteractive ? false : autoFocus,
            restoreFocus: restoreFocus ? onRestoreFocus : false,
            onClose: onEscapeKeyDown
        }), typeof content === 'function' ? content({
            onClose
        }) : content)));
    }
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, child, popover);
};

//# sourceMappingURL=Popover.js.map