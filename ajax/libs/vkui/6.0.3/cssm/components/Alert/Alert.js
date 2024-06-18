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
import styles from './Alert.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export const Alert = ({ actions = [], actionsLayout = 'horizontal', children, className, style, text, header, onClose, dismissLabel = 'Закрыть предупреждение', renderAction, actionsAlign, dismissButtonMode = 'outside', dismissButtonTestId, getRootRef, ...restProps })=>{
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
            action && action();
        }
    }, [
        elementRef,
        waitTransitionFinish,
        onClose,
        timeout
    ]);
    useScrollLock();
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        className: className,
        closing: closing,
        style: style,
        onClick: close,
        getRootRef: getRootRef
    }, /*#__PURE__*/ React.createElement(FocusTrap, {
        ...restProps,
        getRootRef: elementRef,
        onClick: stopPropagation,
        onClose: close,
        timeout: timeout,
        className: classNames(styles['Alert'], platform === 'ios' && styles['Alert--ios'], platform === 'vkcom' && styles['Alert--vkcom'], closing && styles['Alert--closing'], isDesktop && styles['Alert--desktop']),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": headerId,
        "aria-describedby": textId
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['Alert__content'], dismissButtonMode === 'inside' && styles['Alert__content--withButton'])
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(AlertHeader, {
        id: headerId
    }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(AlertText, {
        id: textId
    }, text), children, isDismissButtonVisible && dismissButtonMode === 'inside' && /*#__PURE__*/ React.createElement(IconButton, {
        label: dismissLabel,
        className: classNames(styles['Alert__dismiss'], 'vkuiInternalAlert__dismiss'),
        onClick: close,
        hoverMode: "opacity",
        activeMode: "opacity",
        "data-testid": dismissButtonTestId
    }, /*#__PURE__*/ React.createElement(Icon20Cancel, null))), /*#__PURE__*/ React.createElement(AlertActions, {
        actions: actions,
        actionsAlign: actionsAlign,
        actionsLayout: actionsLayout,
        renderAction: renderAction,
        onItemClick: onItemClick
    }), isDismissButtonVisible && dismissButtonMode === 'outside' && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: close,
        "data-testid": dismissButtonTestId
    }, dismissLabel)));
};

//# sourceMappingURL=Alert.js.map