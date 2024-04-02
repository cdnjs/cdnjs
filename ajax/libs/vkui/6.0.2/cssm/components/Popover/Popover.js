import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { injectAriaExpandedPropByRole } from '../../lib/accessibility';
import { animationFadeClassNames, transformOriginClassNames } from '../../lib/cssAnimation';
import { useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from '../../lib/floating';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import styles from './Popover.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = ({ // UsePopoverProps
placement: expectedPlacement = 'bottom-start', onPlacementChange, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange, // Для AppRootPortal
usePortal = true, // FocusTrapProps
autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
role, ...restPopoverProps })=>{
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
        }, /*#__PURE__*/ React.createElement("div", {
            ref: refs.setFloating,
            className: styles['Popover'],
            ...floatingProps
        }, /*#__PURE__*/ React.createElement(FocusTrap, {
            ...restPopoverProps,
            role: role,
            className: classNames(styles['Popover__in'], noStyling ? undefined : styles['Popover__in--withStyling'], willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[placement], className),
            autoFocus: disableInteractive ? false : autoFocus,
            restoreFocus: restoreFocus ? onRestoreFocus : false,
            onClose: onEscapeKeyDown
        }, typeof content === 'function' ? content({
            onClose
        }) : content)));
    }
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, popover);
};

//# sourceMappingURL=Popover.js.map