import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
export const usePopover = (_param)=>{
    var { // UsePopoverProps
    arrow: withArrow, arrowHeight = DEFAULT_ARROW_HEIGHT, arrowPadding = DEFAULT_ARROW_PADDING, placement = 'bottom-start', onPlacementChange, disableFlipMiddleware = false, trigger = 'click', strategy, content, hoverDelay = 150, closeAfterClick, offsetByMainAxis = 8, offsetByCrossAxis = 0, sameWidth, hideWhenReferenceHidden, onReferenceHiddenChange, disabled, disableInteractive, disableCloseOnClickOutside, disableCloseOnEscKey, keepMounted = false, customMiddlewares, // uncontrolled
    defaultShown = false, // controlled
    shown: shownProp, onShownChange, onShownChanged, // Для AppRootPortal
    usePortal = true, // Для FloatingArrow
    arrowProps, ArrowIcon = DefaultIcon, // FocusTrapProps
    autoFocus = true, restoreFocus = true, className, noStyling = false, zIndex = 'var(--vkui--z_index_popout)', disableFocusTrap, // a11y
    role = 'dialog' } = _param, restPopoverProps = _object_without_properties(_param, [
        "arrow",
        "arrowHeight",
        "arrowPadding",
        "placement",
        "onPlacementChange",
        "disableFlipMiddleware",
        "trigger",
        "strategy",
        "content",
        "hoverDelay",
        "closeAfterClick",
        "offsetByMainAxis",
        "offsetByCrossAxis",
        "sameWidth",
        "hideWhenReferenceHidden",
        "onReferenceHiddenChange",
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
        "noStyling",
        "zIndex",
        "disableFocusTrap",
        "role"
    ]);
    const renderFloatingComponent = React.useCallback(({ shown, middlewareData, placement: resolvedPlacement, setArrowRef, floatingRef, floatingProps, willBeHide, onRestoreFocus, onClose })=>{
        if (!shown && !keepMounted) {
            return null;
        }
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
        return /*#__PURE__*/ _jsx(AppRootPortal, {
            usePortal: usePortal,
            children: /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                ref: floatingRef,
                className: classNames("vkuiPopover__host", hidden && "vkuiPopover__hidden")
            }, floatingProps), {
                style: _object_spread({
                    zIndex: !hidden ? zIndex : undefined
                }, floatingProps.style),
                children: /*#__PURE__*/ _jsxs(FocusTrap, _object_spread_props(_object_spread({}, restPopoverProps), {
                    role: role,
                    className: classNames("vkuiPopover__in", noStyling ? undefined : "vkuiPopover__inWithStyling", willBeHide ? animationFadeClassNames.out : animationFadeClassNames.in, transformOriginClassNames[resolvedPlacement], className),
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
                }))
            }))
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
    const remapReferenceProps = useCallback((_param)=>{
        var { shown } = _param, referenceProps = _object_without_properties(_param, [
            "shown"
        ]);
        return injectAriaExpandedPropByRole(referenceProps, shown, role);
    }, [
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