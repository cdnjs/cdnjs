import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
/**
 * @see https://vkcom.github.io/VKUI/#/Popover
 */ export const Popover = (_param)=>{
    var { // UsePopoverProps
    arrow: withArrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, placement: expectedPlacement = 'bottom-start', onPlacementChange, disableFlipMiddleware = false, trigger = 'click', content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, keepMounted = false, customMiddlewares, // uncontrolled
    defaultShown = false, // controlled
    shown: shownProp, onShownChange, onShownChanged, // Для AppRootPortal
    usePortal = true, // Для FloatingArrow
    arrowProps, ArrowIcon = DefaultIcon, // FocusTrapProps
    autoFocus = true, restoreFocus = true, className, children, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', // a11y
    role = 'dialog' } = _param, restPopoverProps = _object_without_properties(_param, [
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
            arrow = /*#__PURE__*/ _jsx(FloatingArrow, _object_spread_props(_object_spread({
                iconClassName: noStyling ? undefined : "vkuiPopover__arrow"
            }, arrowProps), {
                coords: arrowCoords,
                placement: resolvedPlacement,
                getRootRef: setArrowRef,
                Icon: ArrowIcon
            }));
        }
        popover = /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                ref: refs.setFloating,
                className: classNames("vkuiPopover", hidden && "vkuiPopover--hidden")
            }, floatingProps), {
                style: _object_spread({
                    zIndex: !hidden ? zIndex : undefined
                }, floatingProps.style),
                children: /*#__PURE__*/ _jsxs(FocusTrap, _object_spread_props(_object_spread({}, restPopoverProps), {
                    role: role,
                    className: classNames("vkuiPopover__in", noStyling ? undefined : "vkuiPopover__in--withStyling", willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[resolvedPlacement], className),
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
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            child,
            popover
        ]
    });
};

//# sourceMappingURL=Popover.js.map