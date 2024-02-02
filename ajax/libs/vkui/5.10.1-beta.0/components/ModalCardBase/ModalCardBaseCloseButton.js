import * as React from "react";
import { Icon20Cancel, Icon24Dismiss } from "@vkontakte/icons";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { Tappable } from "../Tappable/Tappable";
export function ModalCardBaseCloseButton(param) {
    var dismissLabel = param.dismissLabel, testId = param.testId, mode = param.mode, onClose = param.onClose;
    var platform = usePlatform();
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    if (isDesktop && mode === "outside") {
        return /*#__PURE__*/ React.createElement(ModalDismissButton, {
            "aria-label": dismissLabel,
            "data-testid": testId,
            onClick: onClose
        });
    }
    if (mode === "inside" || platform === Platform.IOS && !isDesktop) {
        return /*#__PURE__*/ React.createElement(Tappable, {
            "aria-label": dismissLabel,
            className: "vkuiModalCardBase__dismiss",
            onClick: onClose,
            hoverMode: "opacity",
            activeMode: "opacity",
            "data-testid": testId
        }, platform === Platform.IOS ? /*#__PURE__*/ React.createElement(Icon24Dismiss, null) : /*#__PURE__*/ React.createElement(Icon20Cancel, null));
    }
    return null;
}

//# sourceMappingURL=ModalCardBaseCloseButton.js.map