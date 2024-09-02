import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CustomSelectInput.module.css';
const sizeYClassNames = {
    none: styles['CustomSelectInput--sizeY-none'],
    compact: styles['CustomSelectInput--sizeY-compact']
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = ({ align = 'left', getRef, className, getRootRef, style, before, after, status, selectedOptionLabel, selectType = 'default', multiline, disabled, fetching, labelTextTestId, searchable, ...restInputProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const handleRootRef = useExternRef(getRootRef);
    const platform = usePlatform();
    const input = /*#__PURE__*/ _jsx(SelectTypography, {
        selectType: selectType,
        type: "text",
        ...restInputProps,
        disabled: disabled && !fetching,
        readOnly: restInputProps.readOnly || !searchable || disabled && fetching,
        Component: "input",
        normalize: false,
        className: styles['CustomSelectInput__input'],
        getRootRef: getRef
    });
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames(styles['CustomSelectInput'], align === 'right' && styles['CustomSelectInput--align-right'], align === 'center' && styles['CustomSelectInput--align-center'], !selectedOptionLabel && styles['CustomSelectInput--empty'], multiline && styles['CustomSelectInput--multiline'], sizeY !== 'regular' && sizeYClassNames[sizeY], before && styles['CustomSelectInput--hasBefore'], after && styles['CustomSelectInput--hasAfter'], className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles['CustomSelectInput__input-group'],
            children: [
                !searchable && platform === 'ios' ? /*#__PURE__*/ _jsx(VisuallyHidden, {
                    children: input
                }) : input,
                /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles['CustomSelectInput__label-wrapper'], className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: styles['CustomSelectInput__label'],
                        children: selectedOptionLabel || restInputProps.placeholder
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=CustomSelectInput.js.map