import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useScrollLock } from '../AppRoot/ScrollContext';
import { PopoutWrapper } from '../PopoutWrapper/PopoutWrapper';
import { Spinner } from '../Spinner/Spinner';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
import styles from './ScreenSpinner.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export const ScreenSpinner = ({ style , className , state ='loading' , size ='large' , 'aria-label': ariaLabel = 'Пожалуйста, подождите...' , onClick , ...restProps })=>{
    const hideSpinner = state === 'done' || state === 'error';
    const Icon = {
        loading: ()=>null,
        cancelable: Icon24Cancel,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    useScrollLock();
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        hasMask: false,
        className: classNames(styles['ScreenSpinner'], hideSpinner && styles['ScreenSpinner--hideSpinner'], state === 'cancelable' && styles['ScreenSpinner--state-cancelable'], state === 'done' && styles['ScreenSpinner--state-done'], className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ScreenSpinner__container'],
        onClick: onClick
    }, /*#__PURE__*/ React.createElement(Spinner, {
        className: styles['ScreenSpinner__spinner'],
        size: size,
        "aria-label": ariaLabel,
        ...restProps
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['ScreenSpinner__icon']
    }, /*#__PURE__*/ React.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map