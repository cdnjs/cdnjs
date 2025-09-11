'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { useExternRef } from "../../../hooks/useExternRef.js";
import { useFocusWithin } from "../../../hooks/useFocusWithin.js";
import { usePlatform } from "../../../hooks/usePlatform.js";
import { getFormFieldModeFromSelectType } from "../../../lib/select.js";
import { FormField } from "../../FormField/FormField.js";
import { SelectTypography } from "../../SelectTypography/SelectTypography.js";
import { Text } from "../../Typography/Text/Text.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./CustomSelectInput.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = ({ align = 'left', getRef, className, getRootRef, style, before, after, status, children, placeholder, selectType = 'default', multiline, disabled, fetching, labelTextTestId, searchable, accessible, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    const showLabelOrPlaceholder = !Boolean(restProps.value);
    const handleRootRef = useExternRef(getRootRef);
    const focusWithin = useFocusWithin(handleRootRef);
    const inputReadonly = restProps.readOnly || disabled && fetching;
    const input = /*#__PURE__*/ _jsx(Text, {
        type: "text",
        ...restProps,
        disabled: disabled && !fetching,
        readOnly: inputReadonly,
        Component: "input",
        normalize: false,
        className: classNames(styles.el, (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && styles.elCursorPointer),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    });
    const inputHidden = React.useMemo(()=>{
        if (accessible) {
            if (!searchable) {
                return true;
            }
            return !focusWithin || inputReadonly && !fetching;
        } else {
            return false;
        }
    }, [
        accessible,
        fetching,
        focusWithin,
        inputReadonly,
        searchable
    ]);
    const labelHidden = showLabelOrPlaceholder ? false : !inputHidden;
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames(styles.host, align === 'right' && styles.alignRight, align === 'center' && styles.alignCenter, !children && styles.empty, multiline && styles.multiline, sizeY !== 'regular' && sizeYClassNames[sizeY], before && styles.hasBefore, after && styles.hasAfter, inputHidden && styles.inputHidden, labelHidden && styles.labelHidden, accessible && styles.accessible, restProps.value && styles.hasInputValue, className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles.inputGroup,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles.container, className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: styles.title,
                        children: title
                    })
                }),
                restProps.readOnly && platform === 'ios' ? /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: input
                }) : input
            ]
        })
    });
};

//# sourceMappingURL=CustomSelectInput.js.map