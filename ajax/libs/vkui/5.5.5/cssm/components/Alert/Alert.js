import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { usePlatform } from '../../hooks/usePlatform';
import { useWaitTransitionFinish } from '../../hooks/useWaitTransitionFinish';
import { Platform } from '../../lib/platform';
import { stopPropagation } from '../../lib/utils';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { Button } from '../Button/Button';
import { FocusTrap } from '../FocusTrap/FocusTrap';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import styles from './Alert.module.css';
const AlertHeader = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Title, {
                className: styles['Alert__header'],
                weight: "1",
                level: "3",
                ...props
            });
        default:
            return /*#__PURE__*/ React.createElement(Title, {
                className: styles['Alert__header'],
                weight: "2",
                level: "2",
                ...props
            });
    }
};
const AlertText = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case Platform.VKCOM:
            return /*#__PURE__*/ React.createElement(Footnote, {
                className: styles['Alert__text'],
                ...props
            });
        case Platform.IOS:
            return /*#__PURE__*/ React.createElement(Caption, {
                className: styles['Alert__text'],
                ...props
            });
        default:
            return /*#__PURE__*/ React.createElement(Text, {
                Component: "span",
                className: styles['Alert__text'],
                weight: "3",
                ...props
            });
    }
};
const AlertAction = ({ action , onItemClick , ...restProps })=>{
    const platform = usePlatform();
    const handleItemClick = React.useCallback(()=>onItemClick(action), [
        onItemClick,
        action
    ]);
    if (platform === Platform.IOS) {
        const { title , action: actionProp , autoClose , mode , ...restActionProps } = action;
        return /*#__PURE__*/ React.createElement(Tappable, {
            Component: restActionProps.href ? 'a' : 'button',
            className: classNames(styles['Alert__action'], mode === 'destructive' && styles['Alert__action--mode-destructive'], mode === 'cancel' && styles['Alert__action--mode-cancel']),
            onClick: handleItemClick,
            ...restActionProps,
            ...restProps
        }, title);
    }
    let mode = 'tertiary';
    if (platform === Platform.VKCOM) {
        mode = action.mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ React.createElement(Button, {
        className: classNames(styles['Alert__button'], action.mode === 'cancel' && styles['Alert__button--mode-cancel']),
        mode: mode,
        size: "m",
        onClick: handleItemClick,
        Component: action.Component,
        href: action.href,
        target: action.target
    }, action.title);
};
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */ export const Alert = ({ actions =[] , actionsLayout ='horizontal' , children , className , style , text , header , onClose , dismissLabel ='Закрыть предупреждение' , ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop  } = useAdaptivityWithJSMediaQueries();
    const { waitTransitionFinish  } = useWaitTransitionFinish();
    const [closing, setClosing] = React.useState(false);
    const elementRef = React.useRef(null);
    const resolvedActionsLayout = platform === Platform.VKCOM ? 'horizontal' : actionsLayout;
    const timeout = platform === Platform.IOS ? 300 : 200;
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
        const { action , autoClose  } = item;
        if (autoClose) {
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
        onClick: close
    }, /*#__PURE__*/ React.createElement(FocusTrap, {
        ...restProps,
        getRootRef: elementRef,
        onClick: stopPropagation,
        onClose: close,
        timeout: timeout,
        className: classNames(styles['Alert'], platform === Platform.IOS && styles['Alert--ios'], platform === Platform.VKCOM && styles['Alert--vkcom'], resolvedActionsLayout === 'vertical' ? styles['Alert--v'] : styles['Alert--h'], closing && styles['Alert--closing'], isDesktop && styles['Alert--desktop']),
        role: "alertdialog",
        "aria-modal": true,
        "aria-labelledby": "vkui--alert--title",
        "aria-describedby": "vkui--alert--desc"
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Alert__content']
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(AlertHeader, {
        id: "vkui--alert--title"
    }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(AlertText, {
        id: "vkui--alert--desc"
    }, text), children), /*#__PURE__*/ React.createElement("div", {
        className: styles['Alert__actions']
    }, actions.map((action, i)=>/*#__PURE__*/ React.createElement(AlertAction, {
            key: i,
            action: action,
            onItemClick: onItemClick
        }))), isDesktop && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: close,
        "aria-label": dismissLabel
    })));
};

//# sourceMappingURL=Alert.js.map