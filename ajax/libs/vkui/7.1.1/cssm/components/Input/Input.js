'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { FormField } from "../FormField/FormField.js";
import { UnstyledTextField } from "../UnstyledTextField/UnstyledTextField.js";
import styles from "./Input.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export const Input = ({ type = 'text', align = 'left', getRef, className, getRootRef, style, before, after, status, mode, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(FormField, {
        style: style,
        className: classNames(styles.host, align === 'right' && styles.alignRight, align === 'center' && styles.alignCenter, sizeY !== 'regular' && sizeYClassNames[sizeY], before && styles.hasBefore, after && styles.hasAfter, className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status,
        children: /*#__PURE__*/ _jsx(UnstyledTextField, {
            ...restProps,
            as: "input",
            type: type,
            className: styles.el,
            getRootRef: getRef
        })
    });
};

//# sourceMappingURL=Input.js.map