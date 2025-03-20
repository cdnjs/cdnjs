import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel, Icon24Dismiss } from "@vkontakte/icons";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
export function ModalCardBaseCloseButton({ children = 'Закрыть', testId, mode, onClose }) {
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    if (isDesktop && mode === 'outside') {
        return /*#__PURE__*/ _jsx(ModalDismissButton, {
            "data-testid": testId,
            onClick: onClose,
            children: children
        });
    }
    if (mode === 'inside' || platform === 'ios' && !isDesktop) {
        return /*#__PURE__*/ _jsxs(Tappable, {
            className: "vkuiModalCardBase__dismiss",
            onClick: onClose,
            hoverMode: "opacity",
            activeMode: "opacity",
            "data-testid": testId,
            children: [
                /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: children
                }),
                platform === 'ios' ? /*#__PURE__*/ _jsx(Icon24Dismiss, {}) : /*#__PURE__*/ _jsx(Icon20Cancel, {})
            ]
        });
    }
    return null;
}

//# sourceMappingURL=ModalCardBaseCloseButton.js.map