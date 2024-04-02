import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Banner } from '../Banner/Banner';
import styles from './FormStatus.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */ export const FormStatus = ({ mode, children, className, role = mode === 'error' ? 'alert' : 'status', ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Banner, {
        ...restProps,
        role: role,
        subheader: children,
        className: classNames('vkuiInternalFormStatus', mode === 'error' && classNames(styles['FormStatus--mode-error'], 'vkuiInternalFormStatus--mode-error'), className)
    });
};

//# sourceMappingURL=FormStatus.js.map