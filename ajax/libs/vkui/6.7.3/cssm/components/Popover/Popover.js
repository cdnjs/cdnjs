import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePatchChildren } from '../../hooks/usePatchChildren';
import { injectAriaExpandedPropByRole } from '../../lib/accessibility';
import { animationFadeClassNames, transformOriginClassNames } from '../../lib/animation';
import { useFloatingMiddlewaresBootstrap, useFloatingWithInteractions, usePlacementChangeCallback } from '../../lib/floating';
import { AppRootPortal } from '../AppRoot/AppRootPortal';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from '../FloatingArrow/DefaultIcon';
import { FloatingArrow } from '../FloatingArrow/FloatingArrow';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import styles from './Popover.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = ({ // UsePopoverProps
arrow: withArrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, placement: expectedPlacement = 'bottom-start', onPlacementChange, disableFlipMiddleware = false, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, keepMounted = false, customMiddlewares, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange, onShownChanged, // Для AppRootPortal
usePortal = true, // Для FloatingArrow
arrowProps, ArrowIcon = DefaultIcon, // FocusTrapProps
autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
role = 'dialog', ...restPopoverProps })=>{
    const [arrowRef, setArrowRef] = React.useState(null);
    const { middlewares, strictPlacement } = useFloatingMiddlewaresBootstrap({
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
    const { placement: resolvedPlacement, shown, willBeHide, refs, referenceProps, floatingProps, middlewareData, onClose, onRestoreFocus, onEscapeKeyDown } = useFloatingWithInteractions({
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
    usePlacementChangeCallback(expectedPlacement, resolvedPlacement, onPlacementChange);
    const [, child] = usePatchChildren(children, injectAriaExpandedPropByRole(referenceProps, shown, role), refs.setReference);
    let popover = null;
    if (shown || keepMounted) {
        const hidden = keepMounted && !shown;
        let arrow = null;
        if (withArrow) {
            const { arrow: arrowCoords } = middlewareData;
            arrow = /*#__PURE__*/ _jsx(FloatingArrow, {
                iconClassName: noStyling ? undefined : styles['Popover__arrow'],
                ...arrowProps,
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef,
                Icon: ArrowIcon
            });
        }
        popover = /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx("div", {
                ref: refs.setFloating,
                className: classNames(styles['Popover'], hidden && styles['Popover--hidden']),
                ...floatingProps,
                style: {
                    zIndex: !hidden ? zIndex : undefined,
                    ...floatingProps.style
                },
                children: /*#__PURE__*/ _jsxs(FocusTrap, {
                    ...restPopoverProps,
                    role: role,
                    className: classNames(styles['Popover__in'], noStyling ? undefined : styles['Popover__in--withStyling'], willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[resolvedPlacement], className),
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
                })
            })
        });
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            child,
            popover
        ]
    });
};

//# sourceMappingURL=Popover.js.map