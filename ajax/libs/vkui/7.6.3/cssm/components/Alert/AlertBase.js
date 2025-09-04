'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { stopPropagation } from "../../lib/utils.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { IconButton } from "../IconButton/IconButton.js";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton.js";
import { AlertActions } from "./AlertActions.js";
import { AlertDescription, AlertTitle } from "./AlertTypography.js";
import styles from "./Alert.module.css";
export const AlertBase = ({ actions, actionsLayout = 'horizontal', children, title, description, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, onClick, allowClickPropagation = false, titleTestId, descriptionTestId, closing, setClosing, ...restProps })=>{
    const generatedId = React.useId();
    const titleId = `vkui-alert-${generatedId}-title`;
    const descriptionId = `vkui-alert-${generatedId}-description`;
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const itemActionCallbackRef = React.useRef(noop);
    const [animationState, animationHandlers] = useCSSKeyframesAnimationController(closing ? 'exit' : 'enter', {
        onExited () {
            itemActionCallbackRef.current();
            itemActionCallbackRef.current = noop;
            onClose();
        }
    });
    const isDismissButtonVisible = isDesktop && platform !== 'ios';
    const elementRef = React.useRef(null);
    const close = React.useCallback(()=>{
        setClosing?.(true);
    }, [
        setClosing
    ]);
    const onItemClick = React.useCallback((item)=>{
        const { action: itemAction, autoCloseDisabled = false } = item;
        if (autoCloseDisabled) {
            itemAction && itemAction({
                close
            });
        } else {
            if (itemAction) {
                itemActionCallbackRef.current = itemAction;
            }
            setClosing?.(true);
        }
    }, [
        close,
        setClosing
    ]);
    const handleClick = allowClickPropagation ? onClick : (event)=>{
        stopPropagation(event);
        onClick?.(event);
    };
    return /*#__PURE__*/ _jsxs(FocusTrap, {
        ...animationHandlers,
        onClick: handleClick,
        getRootRef: elementRef,
        onClose: close,
        autoFocus: animationState === 'entered',
        className: classNames(styles.host, platform === 'ios' && styles.ios, platform === 'vkcom' && styles.vkcom, closing ? styles.closing : styles.opening, isDesktop && styles.desktop),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": titleId,
        "aria-describedby": descriptionId,
        ...restProps,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: classNames(styles.content, dismissButtonMode === 'inside' && styles.contentWithButton),
                children: [
                    hasReactNode(title) && /*#__PURE__*/ _jsx(AlertTitle, {
                        "data-testid": titleTestId,
                        id: titleId,
                        children: title
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsx(AlertDescription, {
                        "data-testid": descriptionTestId,
                        id: descriptionId,
                        children: description
                    }),
                    children,
                    isDismissButtonVisible && dismissButtonMode === 'inside' && /*#__PURE__*/ _jsx(IconButton, {
                        label: dismissLabel,
                        className: classNames(styles.dismiss, 'vkuiInternalAlert__dismiss'),
                        onClick: close,
                        hoverMode: "opacity",
                        activeMode: "opacity",
                        "data-testid": dismissButtonTestId,
                        children: /*#__PURE__*/ _jsx(Icon20Cancel, {})
                    })
                ]
            }),
            isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ _jsx(ModalDismissButton, {
                onClick: close,
                "data-testid": dismissButtonTestId,
                children: dismissLabel
            }),
            /*#__PURE__*/ _jsx(AlertActions, {
                actions: actions,
                actionsAlign: actionsAlign,
                actionsLayout: actionsLayout,
                renderAction: renderAction,
                onItemClick: onItemClick
            })
        ]
    });
};

//# sourceMappingURL=AlertBase.js.map