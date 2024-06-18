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
 */ export const ScreenSpinner = ({ style, className, state = 'loading', size = 'large', onClick, children = 'Пожалуйста, подождите...', ...restProps })=>{
    const hideSpinner = state === 'done' || state === 'error';
    const Icon = {
        loading: ()=>null,
        cancelable: Icon24Cancel,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    useScrollLock();
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        noBackground: true,
        className: classNames(styles['ScreenSpinner'], state === 'cancelable' && styles['ScreenSpinner--clickable'], className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ScreenSpinner__container'],
        onClick: onClick
    }, /*#__PURE__*/ React.createElement(Spinner, {
        className: classNames(styles['ScreenSpinner__spinner'], hideSpinner && styles['ScreenSpinner__spinner--hidden']),
        size: size,
        ...restProps
    }, children), /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ScreenSpinner__icon'], state === 'done' && styles['ScreenSpinner__icon--state-done'])
    }, /*#__PURE__*/ React.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map