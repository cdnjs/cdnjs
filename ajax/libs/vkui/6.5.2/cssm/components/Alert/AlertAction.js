import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Button } from '../Button/Button';
import { Tappable } from '../Tappable/Tappable';
import styles from './Alert.module.css';
const AlertActionIos = ({ mode, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        className: classNames(styles['Alert__action'], mode === 'destructive' && styles['Alert__action--mode-destructive'], mode === 'cancel' && styles['Alert__action--mode-cancel']),
        ...restProps
    });
};
const AlertActionBase = ({ mode, ...restProps })=>{
    const platform = usePlatform();
    let buttonMode = 'tertiary';
    if (platform === 'vkcom') {
        buttonMode = mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ _jsx(Button, {
        className: classNames(styles['Alert__button'], mode === 'cancel' && styles['Alert__button--mode-cancel']),
        mode: buttonMode,
        size: "m",
        ...restProps
    });
};
export const AlertAction = (props)=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(AlertActionIos, {
            ...props
        });
    }
    return /*#__PURE__*/ _jsx(AlertActionBase, {
        ...props
    });
};

//# sourceMappingURL=AlertAction.js.map