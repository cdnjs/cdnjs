import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from "react";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useFloatingElement } from "../../hooks/useFloatingElement.js";
import { injectAriaExpandedPropByRole } from "../../lib/accessibility.js";
import { animationFadeClassNames, transformOriginClassNames } from "../../lib/animation/index.js";
import { AppRootPortal } from "../AppRoot/AppRootPortal.js";
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING, DefaultIcon } from "../FloatingArrow/DefaultIcon.js";
import { FloatingArrow } from "../FloatingArrow/FloatingArrow.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import styles from "./Popover.module.css";
export const usePopover = ({ // UsePopoverProps
arrow: withArrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, placement = 'bottom-start', onPlacementChange, disableFlipMiddleware = false, disableShiftMiddleware = false, trigger = 'click', strategy, content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, onReferenceHiddenChange, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, keepMounted = false, customMiddlewares, // uncontrolled
defaultShown = false, // controlled
shown: shownProp, onShownChange, onShownChanged, // Для AppRootPortal
usePortal = true, // Для FloatingArrow
arrowProps, ArrowIcon = DefaultIcon, // FocusTrapProps
autoFocus = true, restoreFocus = true, className, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', disableFocusTrap, // a11y
role = 'dialog', ...restPopoverProps })=>{
    const renderFloatingComponent = React.useCallback(({ shown, middlewareData, placement: resolvedPlacement, setArrowRef, floatingRef, floatingProps, willBeHide, onRestoreFocus, onClose })=>{
        if (!shown && !keepMounted) {
            return null;
        }
        const hidden = keepMounted && !shown;
        let arrow = null;
        if (withArrow) {
            const { arrow: arrowCoords } = middlewareData;
            arrow = /*#__PURE__*/ _jsx(FloatingArrow, {
                iconClassName: noStyling ? undefined : styles.arrow,
                ...arrowProps,
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef,
                Icon: ArrowIcon
            });
        }
        return /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx("div", {
                ref: floatingRef,
                className: classNames(styles.host, hidden && styles.hidden),
                ...floatingProps,
                style: {
                    zIndex: !hidden ? zIndex : undefined,
                    ...floatingProps.style
                },
                children: /*#__PURE__*/ _jsxs(FocusTrap, {
                    ...restPopoverProps,
                    role: role,
                    className: classNames(styles.in, noStyling ? undefined : styles.inWithStyling, willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[resolvedPlacement], className),
                    mount: !hidden,
                    disabled: hidden || disableFocusTrap,
                    autoFocus: disableInteractive ? false : autoFocus,
                    restoreFocus: restoreFocus ? ()=>onRestoreFocus(restoreFocus) : false,
                    children: [
                        arrow,
                        typeof content === 'function' ? content({
                            onClose
                        }) : content
                    ]
                })
            })
        });
    }, [
        ArrowIcon,
        arrowProps,
        autoFocus,
        className,
        content,
        disableFocusTrap,
        disableInteractive,
        keepMounted,
        noStyling,
        restPopoverProps,
        restoreFocus,
        role,
        usePortal,
        withArrow,
        zIndex
    ]);
    const remapReferenceProps = useCallback(({ shown, ...referenceProps })=>injectAriaExpandedPropByRole(referenceProps, shown, role), [
        role
    ]);
    const { anchorRef, anchorProps, component } = useFloatingElement({
        arrow: withArrow,
        arrowHeight,
        arrowPadding,
        placement,
        offsetByMainAxis,
        offsetByCrossAxis,
        sameWidth,
        hideWhenReferenceHidden,
        disableFlipMiddleware,
        disableShiftMiddleware,
        customMiddlewares,
        trigger,
        strategy,
        hoverDelay,
        onReferenceHiddenChange,
        closeAfterClick,
        disabled,
        disableInteractive,
        disableCloseOnClickOutside,
        disableCloseOnEscKey,
        defaultShown,
        shown: shownProp,
        onShownChange,
        onShownChanged,
        onPlacementChange,
        renderFloatingComponent,
        remapReferenceProps
    });
    return {
        anchorRef,
        anchorProps,
        popover: component
    };
};

//# sourceMappingURL=usePopover.js.map