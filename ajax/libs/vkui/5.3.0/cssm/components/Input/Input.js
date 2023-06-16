import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { SizeType } from '../../lib/adaptivity';
import { FormField } from '../FormField/FormField';
import styles from './Input.module.css';
const sizeYClassNames = {
    none: styles['Input--sizeY-none'],
    [SizeType.COMPACT]: styles['Input--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export const Input = ({ type ='text' , align ='left' , getRef , className , getRootRef , style , before , after , status , mode , ...restProps })=>{
    const { sizeY ='none'  } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(FormField, {
        style: style,
        className: classNames(styles['Input'], align === 'right' && styles['Input--align-right'], align === 'center' && styles['Input--align-center'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], before && styles['Input--hasBefore'], after && styles['Input--hasAfter'], className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ React.createElement("input", {
        ...restProps,
        type: type,
        className: styles['Input__el'],
        ref: getRef
    }));
};

//# sourceMappingURL=Input.js.map