'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from "react";
import { classNames, noop } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useVirtualKeyboardState } from "../../hooks/useVirtualKeyboardState.js";
import { Keys, pressedKey } from "../../lib/accessibility.js";
import { useCSSTransition } from "../../lib/animation/index.js";
import { useBottomSheet } from "../../lib/sheet/index.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { useConfigProvider } from "../ConfigProvider/ConfigProviderContext.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { ModalOutlet } from "../ModalOutlet/ModalOutlet.js";
import { ModalOverlay as ModalOverlayDefault } from "../ModalOverlay/ModalOverlay.js";
import { ModalPageBase } from "./ModalPageBase.js";
import styles from "./ModalPage.module.css";
const transitionStateClassNames = {
    appear: styles['documentStateEnter'],
    appearing: styles['documentStateEntering'],
    enter: styles['documentStateEnter'],
    entering: styles['documentStateEntering'],
    exiting: styles['documentStateExiting'],
    exited: styles['documentStateExited']
};
/**
 * В компоненте заложена вся логика модального окна.
 *
 * @private
 */ export const ModalPageInternal = ({ open, header, footer, size: desktopMaxWidth, height, children, className, style, snapPoint, onSnapPointChange, getModalContentRef, ModalOverlay = ModalOverlayDefault, modalOverlayTestId, modalContentTestId, modalDismissButtonTestId, modalDismissButtonLabel = 'Закрыть', outsideButtons, noFocusToDialog, hideCloseButton, preventClose, disableContentPanningGesture, restoreFocus, onOpen, onOpened, onClose = noop, onClosed, disableFocusTrap, ...restProps })=>{
    const { hasCustomPanelHeaderAfter } = useConfigProvider();
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
    const { sizeX, isDesktop } = useAdaptivityWithJSMediaQueries();
    const bottomSheetEnabled = !isDesktop && !preventClose && transitionState !== 'exited';
    const { opened: keyboardOpened } = useVirtualKeyboardState(bottomSheetEnabled);
    const [{ initialStyle, setSheetEl, setSheetScrollEl, setBackdropEl }, bottomSheetEventHandlers] = useBottomSheet(bottomSheetEnabled, {
        blocked: keyboardOpened,
        snapPoint,
        sheetCSSProperty: '--vkui_internal_ModalPageDocument--snapPoint',
        backdropCSSProperty: '--vkui_internal--modal-overlay--opacity',
        onSnapPointChange,
        onDismiss () {
            onClose('swipe-down');
        }
    });
    const documentStyle = keyboardOpened ? {
        '--vkui_internal_ModalPageDocument--safeAreaInsetBottom': '0px',
        ...initialStyle
    } : initialStyle;
    const handleSheetRef = useExternRef(setSheetEl, ref);
    const handleSheetScrollRef = useExternRef(setSheetScrollEl, getModalContentRef);
    const [desktopMaxWidthClassName, desktopMaxWidthStyle] = resolveDesktopMaxWidth(isDesktop ? desktopMaxWidth : 's');
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
    return /*#__PURE__*/ _jsxs(ModalOutlet, {
        hidden: hidden,
        isDesktop: isDesktop,
        onKeyDown: handleEscKeyDown,
        children: [
            modalOverlay,
            /*#__PURE__*/ _jsx(FocusTrap, {
                ...restProps,
                autoFocus: !noFocusToDialog,
                restoreFocus: restoreFocus,
                role: "dialog",
                "aria-modal": "true",
                disabled: !opened || hidden || disableFocusTrap,
                className: classNames(className, styles.host, isDesktop ? styles.hostDesktop : styles.hostMobile, !isDesktop && (hasCustomPanelHeaderAfter ? styles.hostMobileSafeAreaInsetTopWithCustomOffset : styles.hostMobileSafeAreaInsetTop), desktopMaxWidthClassName, sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular'),
                style: mergeStyle(mergeStyle(desktopMaxWidthStyle, getHeightCSSVariable(height)), style),
                children: /*#__PURE__*/ _jsx(ModalPageBase, {
                    ...bottomSheetEventHandlers,
                    getRootRef: handleSheetRef,
                    getRef: handleSheetScrollRef,
                    style: documentStyle,
                    className: classNames(isDesktop ? styles.documentDesktop : styles.documentMobile, transitionStateClassNames[transitionState]),
                    onTransitionEnd: onTransitionEnd,
                    isDesktop: isDesktop,
                    disableContentPanningGesture: disableContentPanningGesture,
                    header: header,
                    footer: footer,
                    outsideButtons: outsideButtons,
                    modalContentTestId: modalContentTestId,
                    modalDismissButtonTestId: modalDismissButtonTestId,
                    modalDismissButtonLabel: modalDismissButtonLabel,
                    hideCloseButton: hideCloseButton,
                    closable: closable,
                    onClose: onClose,
                    children: children
                })
            })
        ]
    });
};
const desktopMaxWidthClassNames = {
    s: styles['hostDesktopMaxWidthS'],
    m: styles['hostDesktopMaxWidthM'],
    l: styles['hostDesktopMaxWidthL']
};
function resolveDesktopMaxWidth(desktopMaxWidth = 's') {
    if (typeof desktopMaxWidth === 'string') {
        return [
            desktopMaxWidthClassNames[desktopMaxWidth],
            undefined
        ];
    }
    return [
        undefined,
        typeof desktopMaxWidth === 'number' ? {
            '--vkui_internal_ModalPage--desktopMaxWidth': `${desktopMaxWidth}px`
        } : undefined
    ];
}
function getHeightCSSVariable(height) {
    return height !== undefined ? {
        '--vkui_internal_ModalPage--userHeight': typeof height === 'number' ? `${height}px` : height
    } : undefined;
}

//# sourceMappingURL=ModalPageInternal.js.map