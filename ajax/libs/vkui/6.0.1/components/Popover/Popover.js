import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { injectAriaExpandedPropByRole } from '../../lib/accessibility';
import { animationFadeClassNames, transformOriginClassNames } from '../../lib/cssAnimation';
import { useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from '../../lib/floating';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { FocusTrap } from '../FocusTrap/FocusTrap';
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = (_param)=>{
    var { // UsePopoverProps
    placement: expectedPlacement = 'bottom-start', onPlacementChange, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, // uncontrolled
    defaultShown = false, // controlled
    shown: shownProp, onShownChange, // Для AppRootPortal
    usePortal = true, // FocusTrapProps
    autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
    role } = _param, restPopoverProps = _object_without_properties(_param, [
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
    const { middlewares, strictPlacement } = useFloatingMiddlewaresBootstrap({
        placement: expectedPlacement,
        offsetByMainAxis,
        offsetByCrossAxis,
        sameWidth,
        hideWhenReferenceHidden
    });
    const { placement, shown, willBeHide, refs, referenceProps, floatingProps, onClose, onRestoreFocus, onEscapeKeyDown } = useFloatingWithInteractions({
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
    usePlacementChangeCallback(placement, onPlacementChange);
    const [, child] = usePatchChildren(children, injectAriaExpandedPropByRole(referenceProps, shown, role), refs.setReference);
    let popover = null;
    if (shown) {
        floatingProps.style.zIndex = String(zIndex);
        popover = /*#__PURE__*/ React.createElement(AppRootPortal, {
            usePortal: usePortal
        }, /*#__PURE__*/ React.createElement("div", _object_spread({
            ref: refs.setFloating,
            className: "vkuiPopover"
        }, floatingProps), /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({}, restPopoverProps), {
            role: role,
            className: classNames("vkuiPopover__in", noStyling ? undefined : "vkuiPopover__in--withStyling", willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[placement], className),
            autoFocus: disableInteractive ? false : autoFocus,
            restoreFocus: restoreFocus ? onRestoreFocus : false,
            onClose: onEscapeKeyDown
        }), typeof content === 'function' ? content({
            onClose
        }) : content)));
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, popover);
};

//# sourceMappingURL=Popover.js.map