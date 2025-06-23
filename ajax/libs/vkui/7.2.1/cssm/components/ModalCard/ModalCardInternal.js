'use client';
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
import styles from "./ModalCard.module.css";
const sizeByPlatformClassNames = {
    vkcom: styles['hostMaxWidthS'],
    ios: styles['hostMaxWidthM'],
    android: styles['hostMaxWidthL']
};
const transitionStateClassNames = {
    appear: styles['hostStateEnter'],
    appearing: styles['hostStateEntering'],
    enter: styles['hostStateEnter'],
    entering: styles['hostStateEntering'],
    exiting: styles['hostStateExiting'],
    exited: styles['hostStateExited']
};
/**
 * В компоненте заложена вся логика модального окна.
 *
 * @private
 */ export const ModalCardInternal = ({ icon, title, titleComponent, description, descriptionComponent, children, actions, size, open, style: styleProp, className, preventClose, ModalOverlay = ModalOverlayDefault, modalOverlayTestId, modalDismissButtonTestId, getRootRef, dismissButtonMode, dismissLabel, noFocusToDialog, restoreFocus, onOpen, onOpened, onClose = noop, onClosed, disableFocusTrap, ...restProps })=>{
    const platform = usePlatform();
    const [transitionState, { ref, onTransitionEnd }] = useCSSTransition(open, {
        enableAppear: true,
        onEnter () {
            onOpen?.();
        },
        onEntered () {
            onOpened?.();
        },
        onExited () {
            onClosed?.();
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
            onClose?.('swipe-down');
        }
    });
    const handleRef = useExternRef(setSheetEl, ref, getRootRef);
    const style = keyboardOpened ? {
        ...styleProp,
        '--vkui_internal_ModalCard--safeAreaInsetBottom': '0px'
    } : styleProp;
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
            /*#__PURE__*/ _jsx(ModalCardBase, {
                ...restProps,
                tabIndex: -1,
                role: "dialog",
                "aria-modal": "true",
                getRootRef: handleRef,
                style: style,
                className: classNames(styles.host, isDesktop ? styles.hostDesktop : styles.hostMobile, sizeByPlatformClassNames[platform], transitionStateClassNames[transitionState], className),
                onTransitionEnd: onTransitionEnd,
                ...bottomSheetEventHandlers,
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
            })
        ]
    });
};

//# sourceMappingURL=ModalCardInternal.js.map