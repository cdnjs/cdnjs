import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
import styles from './Input.module.css';
const sizeYClassNames = {
    none: styles['Input--sizeY-none'],
    ['compact']: styles['Input--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export const Input = ({ type = 'text', align = 'left', getRef, className, getRootRef, style, before, after, status, mode, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(FormField, {
        style: style,
        className: classNames(styles['Input'], align === 'right' && styles['Input--align-right'], align === 'center' && styles['Input--align-center'], sizeY !== 'regular' && sizeYClassNames[sizeY], before && styles['Input--hasBefore'], after && styles['Input--hasAfter'], className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, {
        ...restProps,
        Component: "input",
        normalize: false,
        type: type,
        className: styles['Input__el'],
        getRootRef: getRef
    }));
};

//# sourceMappingURL=Input.js.map