'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel, Icon24Dismiss } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { AdaptivityContext } from "../AdaptivityProvider/AdaptivityContext.js";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton.js";
import { ModalOutsideButtons } from "../ModalOutsideButtons/ModalOutsideButtons.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Spacing } from "../Spacing/Spacing.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Subhead } from "../Typography/Subhead/Subhead.js";
import { Title } from "../Typography/Title/Title.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./ModalCardBase.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export const ModalCardBase = ({ icon, title, titleComponent = 'span', description, descriptionComponent = 'span', children, actions, onClose, dismissLabel = 'Закрыть', size: sizeProp, modalDismissButtonTestId, dismissButtonMode = 'outside', preventClose, outsideButtons, titleId, ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const size = isDesktop ? sizeProp : undefined;
    const withSafeZone = !icon && (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop && dismissButtonMode !== 'none');
    const hasTitle = hasReactNode(title);
    const hasDescription = hasReactNode(description);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames('vkuiInternalModalCardBase', platform === 'ios' && styles.ios, isDesktop && styles.desktop, withSafeZone && styles.withSafeZone),
        baseStyle: {
            maxWidth: size
        },
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles.container,
            children: [
                hasReactNode(icon) && /*#__PURE__*/ _jsx("div", {
                    className: styles.icon,
                    children: icon
                }),
                hasReactNode(title) && /*#__PURE__*/ _jsx(Title, {
                    id: titleId,
                    level: "2",
                    weight: "2",
                    className: styles.title,
                    Component: titleComponent,
                    children: title
                }),
                hasTitle && hasDescription && /*#__PURE__*/ _jsx(Spacing, {
                    size: 8
                }),
                hasDescription && /*#__PURE__*/ _jsx(AdaptivityContext.Provider, {
                    value: {
                        sizeY: 'regular'
                    },
                    children: /*#__PURE__*/ _jsx(Subhead, {
                        className: styles.description,
                        Component: descriptionComponent,
                        children: description
                    })
                }),
                children,
                hasReactNode(actions) && /*#__PURE__*/ _jsx("div", {
                    className: styles.actions,
                    children: actions
                }),
                isDesktop && (dismissButtonMode === 'outside' || outsideButtons) && /*#__PURE__*/ _jsxs(ModalOutsideButtons, {
                    children: [
                        dismissButtonMode === 'outside' && /*#__PURE__*/ _jsx(ModalOutsideButton, {
                            "aria-label": dismissLabel,
                            "data-testid": modalDismissButtonTestId,
                            onClick: onClose,
                            children: /*#__PURE__*/ _jsx(Icon20Cancel, {})
                        }),
                        outsideButtons
                    ]
                }),
                (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop && dismissButtonMode !== 'none') && /*#__PURE__*/ _jsxs(Tappable, {
                    className: styles.dismiss,
                    onClick: onClose,
                    hoverMode: "opacity",
                    activeMode: "opacity",
                    "data-testid": modalDismissButtonTestId,
                    children: [
                        /*#__PURE__*/ _jsx(VisuallyHidden, {
                            children: dismissLabel
                        }),
                        platform === 'ios' ? /*#__PURE__*/ _jsx(Icon24Dismiss, {}) : /*#__PURE__*/ _jsx(Icon20Cancel, {})
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=ModalCardBase.js.map