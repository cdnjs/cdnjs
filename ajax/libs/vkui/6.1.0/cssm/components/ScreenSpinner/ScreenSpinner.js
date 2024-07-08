import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return /*#__PURE__*/ _jsx(PopoutWrapper, {
        noBackground: true,
        className: classNames(styles['ScreenSpinner'], state === 'cancelable' && styles['ScreenSpinner--clickable'], className),
        style: style,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles['ScreenSpinner__container'],
            onClick: onClick,
            children: [
                /*#__PURE__*/ _jsx(Spinner, {
                    className: classNames(styles['ScreenSpinner__spinner'], hideSpinner && styles['ScreenSpinner__spinner--hidden']),
                    size: size,
                    ...restProps,
                    children: children
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles['ScreenSpinner__icon'], state === 'done' && styles['ScreenSpinner__icon--state-done']),
                    children: /*#__PURE__*/ _jsx(Icon, {})
                })
            ]
        })
    });
};

//# sourceMappingURL=ScreenSpinner.js.map