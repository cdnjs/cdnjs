'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import { Icon20Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE } from "../../lib/sheet/index.js";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton.js";
import { ModalOutsideButtons } from "../ModalOutsideButtons/ModalOutsideButtons.js";
import { ModalPageContent } from "../ModalPageContent/ModalPageContent.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const ModalPageBase = (_param)=>{
    var { isDesktop, getRef, disableContentPanningGesture, header, children, footer, outsideButtons, modalContentTestId, modalDismissButtonTestId, modalDismissButtonLabel, hideCloseButton, closable, onClose = noop } = _param, restProps = _object_without_properties(_param, [
        "isDesktop",
        "getRef",
        "disableContentPanningGesture",
        "header",
        "children",
        "footer",
        "outsideButtons",
        "modalContentTestId",
        "modalDismissButtonTestId",
        "modalDismissButtonLabel",
        "hideCloseButton",
        "closable",
        "onClose"
    ]);
    const disableContentPanningGestureProp = disableContentPanningGesture ? BLOCK_SHEET_BEHAVIOR_DATA_ATTRIBUTE : undefined;
    const closeButton = hideCloseButton || !isDesktop ? null : /*#__PURE__*/ _jsx(ModalOutsideButton, {
        "data-testid": modalDismissButtonTestId,
        onClick: closable ? function handleDismissButtonClick(event) {
            onClose('click-close-button', event);
        } : noop,
        "aria-label": modalDismissButtonLabel,
        children: /*#__PURE__*/ _jsx(Icon20Cancel, {})
    });
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        role: "document",
        baseClassName: "vkuiModalPage__document"
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: classNames("vkuiModalPage__children", isDesktop ? "vkuiModalPage__childrenDesktop" : "vkuiModalPage__childrenMobile"),
                children: [
                    hasReactNode(header) && header,
                    /*#__PURE__*/ _jsx(ModalPageContent, _object_spread_props(_object_spread({
                        getRootRef: getRef,
                        "data-testid": modalContentTestId
                    }, disableContentPanningGestureProp), {
                        children: children
                    })),
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
    }));
};

//# sourceMappingURL=ModalPageBase.js.map