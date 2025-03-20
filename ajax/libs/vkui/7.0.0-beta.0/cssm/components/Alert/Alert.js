import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode, noop } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { useCSSKeyframesAnimationController } from "../../lib/animation/index.js";
import { stopPropagation } from "../../lib/utils.js";
import { useScrollLock } from "../AppRoot/ScrollContext.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
import { IconButton } from "../IconButton/IconButton.js";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton.js";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper.js";
import { AlertActions } from "./AlertActions.js";
import { AlertHeader, AlertText } from "./AlertTypography.js";
import styles from "./Alert.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export const Alert = ({ actions, actionsLayout = 'horizontal', children, className, style, text, header, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, getRootRef, ...restProps })=>{
    const generatedId = React.useId();
    const headerId = `vkui-alert-${generatedId}-header`;
    const textId = `vkui-alert-${generatedId}-text`;
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const [closing, setClosing] = React.useState(false);
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
        setClosing(true);
    }, []);
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
            setClosing(true);
        }
    }, [
        close
    ]);
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close,
        getRootRef: getRootRef,
        children: /*#__PURE__*/ _jsxs(FocusTrap, {
            ...restProps,
            ...animationHandlers,
            getRootRef: elementRef,
            onClick: stopPropagation,
            onClose: close,
            autoFocus: animationState === 'entered',
            className: classNames(styles.host, platform === 'ios' && styles.ios, platform === 'vkcom' && styles.vkcom, closing ? styles.closing : styles.opening, isDesktop && styles.desktop),
            role: "alertdialog",
            "aria-modal": true,
            "aria-labelledby": headerId,
            "aria-describedby": textId,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: classNames(styles.content, dismissButtonMode === 'inside' && styles.contentWithButton),
                    children: [
                        hasReactNode(header) && /*#__PURE__*/ _jsx(AlertHeader, {
                            id: headerId,
                            children: header
                        }),
                        hasReactNode(text) && /*#__PURE__*/ _jsx(AlertText, {
                            id: textId,
                            children: text
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
                /*#__PURE__*/ _jsx(AlertActions, {
                    actions: actions,
                    actionsAlign: actionsAlign,
                    actionsLayout: actionsLayout,
                    renderAction: renderAction,
                    onItemClick: onItemClick
                }),
                isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ _jsx(ModalDismissButton, {
                    onClick: close,
                    "data-testid": dismissButtonTestId,
                    children: dismissLabel
                })
            ]
        })
    });
};

//# sourceMappingURL=Alert.js.map