import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { mergeCalls } from '../../lib/mergeCalls';
import { clickByKeyboardHandler } from '../../lib/utils';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { RootComponent } from '../RootComponent/RootComponent';
import { Spinner } from '../Spinner/Spinner';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
import styles from './ScreenSpinner.module.css';
export const ScreenSpinnerContext = /*#__PURE__*/ React.createContext({
    state: 'loading'
});
const stateClassNames = {
    cancelable: styles['ScreenSpinner--state-cancelable'],
    done: styles['ScreenSpinner--state-done'],
    error: styles['ScreenSpinner--state-error']
};
const ScreenSpinnerLoader = ({ size = 'large', children = 'Пожалуйста, подождите...', ...restProps })=>{
    return /*#__PURE__*/ _jsx(Spinner, {
        className: styles['ScreenSpinner__spinner'],
        size: size,
        ...restProps,
        children: children
    });
};
ScreenSpinnerLoader.displayName = 'ScreenSpinner.Loader';
const ScreenSpinnerCancelIcon = ({ onKeyDown, 'aria-label': ariaLabel = 'Отменить', ...restProps })=>{
    const handlers = mergeCalls({
        onKeyDown: clickByKeyboardHandler
    }, {
        onKeyDown
    });
    let clickableProps = {
        ...handlers,
        'tabIndex': 0,
        'role': 'button',
        'aria-label': ariaLabel
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles['ScreenSpinner__icon'],
        ...clickableProps,
        ...restProps,
        children: /*#__PURE__*/ _jsx(Icon24Cancel, {})
    });
};
const ScreenSpinnerSwapIcon = ({ cancelLabel, ...restProps })=>{
    const { state } = React.useContext(ScreenSpinnerContext);
    if (state === 'cancelable') {
        return /*#__PURE__*/ _jsx(ScreenSpinnerCancelIcon, {
            "aria-label": cancelLabel,
            ...restProps
        });
    }
    const Icon = {
        loading: ()=>null,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles['ScreenSpinner__icon'],
        ...restProps,
        children: /*#__PURE__*/ _jsx(Icon, {})
    });
};
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinner.SwapIcon';
const ScreenSpinnerContainer = ({ state = 'loading', ...restProps })=>{
    return /*#__PURE__*/ _jsx(ScreenSpinnerContext.Provider, {
        value: {
            state
        },
        children: /*#__PURE__*/ _jsx(RootComponent, {
            baseClassName: classNames(styles['ScreenSpinner'], state !== 'loading' && stateClassNames[state]),
            ...restProps
        })
    });
};
ScreenSpinnerContainer.displayName = 'ScreenSpinner.Container';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = ({ style, className, state = 'loading', onClick, cancelLabel, ...restProps })=>{
    useScrollLock();
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        className: className,
        style: style,
        noBackground: true,
        children: /*#__PURE__*/ _jsxs(ScreenSpinnerContainer, {
            state: state,
            children: [
                /*#__PURE__*/ _jsx(ScreenSpinnerLoader, {
                    ...restProps
                }),
                /*#__PURE__*/ _jsx(ScreenSpinnerSwapIcon, {
                    onClick: onClick,
                    cancelLabel: cancelLabel
                })
            ]
        })
    });
};
ScreenSpinner.displayName = 'ScreenSpinner';
ScreenSpinner.Container = ScreenSpinnerContainer;
ScreenSpinner.Container.displayName = 'ScreenSpinner.Container';
ScreenSpinner.Loader = ScreenSpinnerLoader;
ScreenSpinner.Loader.displayName = 'ScreenSpinner.Loader';
ScreenSpinner.SwapIcon = ScreenSpinnerSwapIcon;
ScreenSpinner.SwapIcon.displayName = 'ScreenSpinner.SwapIcon';

//# sourceMappingURL=ScreenSpinner.js.map