import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import styles from './FormLayout.module.css';
const preventDefault = (e)=>e.preventDefault();
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */ export const FormLayout = ({ children, Component = 'form', getRef, getRootRef, onSubmit = preventDefault, className, ...restProps })=>{
    const formLayoutRef = useExternRef(getRef, getRootRef);
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        className: classNames(styles['FormLayout'], className),
        onSubmit: onSubmit,
        ref: formLayoutRef
    }, children, Component === 'form' && /*#__PURE__*/ React.createElement("input", {
        type: "submit",
        className: styles['FormLayout__submit'],
        value: ""
    }));
};

//# sourceMappingURL=FormLayout.js.map