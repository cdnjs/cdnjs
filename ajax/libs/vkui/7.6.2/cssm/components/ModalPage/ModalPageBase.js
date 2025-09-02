'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import { Icon20Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE } from "../../lib/sheet/index.js";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton.js";
import { ModalOutsideButtons } from "../ModalOutsideButtons/ModalOutsideButtons.js";
import { ModalPageContent } from "../ModalPageContent/ModalPageContent.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./ModalPage.module.css";
export const ModalPageBase = ({ isDesktop, getRef, disableContentPanningGesture, header, children, footer, outsideButtons, modalContentTestId, modalDismissButtonTestId, modalDismissButtonLabel, hideCloseButton, closable, onClose = noop, ...restProps })=>{
    const disableContentPanningGestureProp = disableContentPanningGesture ? BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE : undefined;
    const closeButton = hideCloseButton || !isDesktop ? null : /*#__PURE__*/ _jsx(ModalOutsideButton, {
        "data-testid": modalDismissButtonTestId,
        onClick: closable ? function handleDismissButtonClick(event) {
            onClose('click-close-button', event);
        } : noop,
        "aria-label": modalDismissButtonLabel,
        children: /*#__PURE__*/ _jsx(Icon20Cancel, {})
    });
    return /*#__PURE__*/ _jsxs(RootComponent, {
        role: "document",
        baseClassName: styles.document,
        ...restProps,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles.children, isDesktop ? styles.childrenDesktop : styles.childrenMobile),
                children: [
                    hasReactNode(header) && header,
                    /*#__PURE__*/ _jsx(ModalPageContent, {
                        getRootRef: getRef,
                        "data-testid": modalContentTestId,
                        ...disableContentPanningGestureProp,
                        children: children
                    }),
                    hasReactNode(footer) && footer
                ]
            }),
            isDesktop && (closeButton || outsideButtons) && /*#__PURE__*/ _jsxs(ModalOutsideButtons, {
                children: [
                    closeButton,
                    outsideButtons
                ]
            })
        ]
    });
};

//# sourceMappingURL=ModalPageBase.js.map