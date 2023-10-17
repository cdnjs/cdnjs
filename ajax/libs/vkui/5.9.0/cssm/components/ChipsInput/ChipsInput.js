import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ChipsInputBase } from '../ChipsInputBase/ChipsInputBase';
import { FormField } from '../FormField/FormField';
import styles from './ChipsInput.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export const ChipsInput = ({ style, className, getRootRef, before, after, status, mode, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(FormField, {
        getRootRef: getRootRef,
        className: classNames(styles['ChipsInput'], 'vkuiInternalChipsInput', className),
        style: style,
        disabled: restProps.disabled,
        before: before,
        after: after,
        role: "application",
        "aria-disabled": restProps.disabled,
        "aria-readonly": restProps.readOnly,
        status: status,
        mode: mode
    }, /*#__PURE__*/ React.createElement(ChipsInputBase, restProps));
};

//# sourceMappingURL=ChipsInput.js.map