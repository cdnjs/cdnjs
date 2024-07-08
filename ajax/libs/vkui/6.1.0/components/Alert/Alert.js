import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { stopPropagation } from '../../lib/utils';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { IconButton } from '../IconButton/IconButton';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { AlertActions } from './AlertActions';
import { AlertHeader, AlertText } from './AlertTypography';
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export const Alert = (_param)=>{
    var { actions = [], actionsLayout = 'horizontal', children, className, style, text, header, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "actions",
        "actionsLayout",
        "children",
        "className",
        "style",
        "text",
        "header",
        "onClose",
        "dismissLabel",
        "renderAction",
        "actionsAlign",
        "dismissButtonMode",
        "dismissButtonTestId",
        "getRootRef"
    ]);
    const generatedId = React.useId();
    const headerId = `vkui-alert-${generatedId}-header`;
    const textId = `vkui-alert-${generatedId}-text`;
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const { waitTransitionFinish } = useWaitTransitionFinish();
    const [closing, setClosing] = React.useState(false);
    const isDismissButtonVisible = isDesktop && platform !== 'ios';
    const elementRef = React.useRef(null);
    const timeout = platform === 'ios' ? 300 : 200;
    const close = React.useCallback(()=>{
        setClosing(true);
        waitTransitionFinish(elementRef.current, (e)=>{
            if (!e || e.propertyName === 'opacity') {
                onClose();
            }
        }, timeout);
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        timeout
    ]);
    const onItemClick = React.useCallback((item)=>{
        const { action, autoCloseDisabled = false } = item;
        if (!autoCloseDisabled) {
            setClosing(true);
            waitTransitionFinish(elementRef.current, (e)=>{
                if (!e || e.propertyName === 'opacity') {
                    onClose();
                    action && action();
                }
            }, timeout);
        } else {
            action && action({
                close
            });
        }
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        close,
        timeout
    ]);
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close,
        getRootRef: getRootRef,
        children: /*#__PURE__*/ _jsxs(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
            getRootRef: elementRef,
            onClick: stopPropagation,
            onClose: close,
            timeout: timeout,
            className: classNames("vkuiAlert", platform === 'ios' && "vkuiAlert--ios", platform === 'vkcom' && "vkuiAlert--vkcom", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
            role: "alertdialog",
            "aria-modal": true,
            "aria-labelledby": headerId,
            "aria-describedby": textId,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: classNames("vkuiAlert__content", dismissButtonMode === 'inside' && "vkuiAlert__content--withButton"),
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
                            className: classNames("vkuiAlert__dismiss", 'vkuiInternalAlert__dismiss'),
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
        }))
    });
};

//# sourceMappingURL=Alert.js.map