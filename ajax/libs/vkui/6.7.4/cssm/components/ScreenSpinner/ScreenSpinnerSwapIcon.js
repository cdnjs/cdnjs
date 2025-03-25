import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Icon24Cancel } from '@vkontakte/icons';
import { mergeCalls } from '../../lib/mergeCalls';
import { clickByKeyboardHandler } from '../../lib/utils';
import { RootComponent } from '../RootComponent/RootComponent';
import { Icon48CancelCircle } from './Icon48CancelCircle';
import { Icon48DoneOutline } from './Icon48DoneOutline';
import { ScreenSpinnerContext } from './context';
import styles from './ScreenSpinner.module.css';
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
ScreenSpinnerCancelIcon.displayName = 'ScreenSpinnerCancelIcon';
export const ScreenSpinnerSwapIcon = ({ cancelLabel, ...restProps })=>{
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
ScreenSpinnerSwapIcon.displayName = 'ScreenSpinnerSwapIcon';

//# sourceMappingURL=ScreenSpinnerSwapIcon.js.map