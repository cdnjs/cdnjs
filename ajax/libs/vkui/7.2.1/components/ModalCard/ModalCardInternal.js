'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusTrap } from "../../hooks/useFocusTrap.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useVirtualKeyboardState } from "../../hooks/useVirtualKeyboardState.js";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { useCSSTransition } from "../../lib/animation/index.js";
import { useBottomSheet } from "../../lib/sheet/index.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { ModalCardBase } from "../ModalCardBase/ModalCardBase.js";
import { ModalOutlet } from "../ModalOutlet/ModalOutlet.js";
import { ModalOverlay as ModalOverlayDefault } from "../ModalOverlay/ModalOverlay.js";
const sizeByPlatformClassNames = {
    vkcom: "vkuiModalCard__hostMaxWidthS",
    ios: "vkuiModalCard__hostMaxWidthM",
    android: "vkuiModalCard__hostMaxWidthL"
};
const transitionStateClassNames = {
    appear: "vkuiModalCard__hostStateEnter",
    appearing: "vkuiModalCard__hostStateEntering",
    enter: "vkuiModalCard__hostStateEnter",
    entering: "vkuiModalCard__hostStateEntering",
    exiting: "vkuiModalCard__hostStateExiting",
    exited: "vkuiModalCard__hostStateExited"
};
/**
 * В компоненте заложена вся логика модального окна.
 *
 * @private
 */ export const ModalCardInternal = (_param)=>{
    var { icon, title, titleComponent, description, descriptionComponent, children, actions, size, open, style: styleProp, className, preventClose, ModalOverlay = ModalOverlayDefault, modalOverlayTestId, modalDismissButtonTestId, getRootRef, dismissButtonMode, dismissLabel, noFocusToDialog, restoreFocus, onOpen, onOpened, onClose = noop, onClosed, disableFocusTrap } = _param, restProps = _object_without_properties(_param, [
        "icon",
        "title",
        "titleComponent",
        "description",
        "descriptionComponent",
        "children",
        "actions",
        "size",
        "open",
        "style",
        "className",
        "preventClose",
        "ModalOverlay",
        "modalOverlayTestId",
        "modalDismissButtonTestId",
        "getRootRef",
        "dismissButtonMode",
        "dismissLabel",
        "noFocusToDialog",
        "restoreFocus",
        "onOpen",
        "onOpened",
        "onClose",
        "onClosed",
        "disableFocusTrap"
    ]);
    const platform = usePlatform();
    const [transitionState, { ref, onTransitionEnd }] = useCSSTransition(open, {
        enableAppear: true,
        onEnter () {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        },
        onEntered () {
            onOpened === null || onOpened === void 0 ? void 0 : onOpened();
        },
        onExited () {
            onClosed === null || onClosed === void 0 ? void 0 : onClosed();
        }
    });
    const opened = transitionState === 'appeared' || transitionState === 'entered';
    const hidden = transitionState === 'exited';
    const closable = !preventClose && opened;
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const bottomSheetEnabled = !isDesktop && !preventClose && transitionState !== 'exited';
    const { opened: keyboardOpened } = useVirtualKeyboardState(bottomSheetEnabled);
    const [{ setSheetEl, setBackdropEl }, bottomSheetEventHandlers] = useBottomSheet(bottomSheetEnabled, {
        blocked: keyboardOpened,
        snapPoint: 'auto',
        sheetCSSProperty: '--vkui_internal_ModalCard--translateY',
        backdropCSSProperty: '--vkui_internal--modal-overlay--opacity',
        onDismiss () {
            onClose === null || onClose === void 0 ? void 0 : onClose('swipe-down');
        }
    });
    const handleRef = useExternRef(setSheetEl, ref, getRootRef);
    const style = keyboardOpened ? _object_spread_props(_object_spread({}, styleProp), {
        '--vkui_internal_ModalCard--safeAreaInsetBottom': '0px'
    }) : styleProp;
    const modalOverlay = /*#__PURE__*/ _jsx(ModalOverlay, {
        getRootRef: setBackdropEl,
        "data-testid": modalOverlayTestId,
        visible: open,
        onClick: closable ? function handleBackdropClick(event) {
            onClose('click-overlay', event);
        } : undefined
    });
    const handleEscKeyDown = useCallback((event)=>{
        if (closable && pressedKey(event) === Keys.ESCAPE) {
            onClose('escape-key');
        }
    }, [
        closable,
        onClose
    ]);
    useScrollLock(!hidden);
    useFocusTrap(ref, {
        autoFocus: !noFocusToDialog,
        disabled: !opened || hidden || disableFocusTrap,
        restoreFocus
    });
    return /*#__PURE__*/ _jsxs(ModalOutlet, {
        hidden: hidden,
        isDesktop: isDesktop,
        onKeyDown: handleEscKeyDown,
        children: [
            modalOverlay,
            /*#__PURE__*/ _jsx(ModalCardBase, _object_spread_props(_object_spread(_object_spread_props(_object_spread({}, restProps), {
                tabIndex: -1,
                role: "dialog",
                "aria-modal": "true",
                getRootRef: handleRef,
                style: style,
                className: classNames("vkuiModalCard__host", isDesktop ? "vkuiModalCard__hostDesktop" : "vkuiModalCard__hostMobile", sizeByPlatformClassNames[platform], transitionStateClassNames[transitionState], className),
                onTransitionEnd: onTransitionEnd
            }), bottomSheetEventHandlers), {
                icon: icon,
                title: title,
                titleComponent: titleComponent,
                description: description,
                descriptionComponent: descriptionComponent,
                actions: actions,
                onClose: ()=>onClose('click-close-button'),
                size: size,
                modalDismissButtonTestId: modalDismissButtonTestId,
                dismissButtonMode: dismissButtonMode,
                dismissLabel: dismissLabel,
                children: children
            }))
        ]
    });
};

//# sourceMappingURL=ModalCardInternal.js.map