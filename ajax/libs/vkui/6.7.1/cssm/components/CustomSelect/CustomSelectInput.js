import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import { usePlatform } from '../../hooks/usePlatform';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import { Text } from '../Typography/Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './CustomSelectInput.module.css';
const sizeYClassNames = {
    none: styles['CustomSelectInput--sizeY-none'],
    compact: styles['CustomSelectInput--sizeY-compact']
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = ({ align = 'left', getRef, className, getRootRef, style, before, after, status, children, placeholder, selectType = 'default', multiline, disabled, fetching, labelTextTestId, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    const showLabelOrPlaceholder = !Boolean(restProps.value);
    const handleRootRef = useExternRef(getRootRef);
    const focusWithin = useFocusWithin(handleRootRef);
    const input = /*#__PURE__*/ _jsx(Text, {
        type: "text",
        ...restProps,
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: classNames(styles['CustomSelectInput__el'], (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && styles['CustomSelectInput__el--cursor-pointer']),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    });
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames(styles['CustomSelectInput'], align === 'right' && styles['CustomSelectInput--align-right'], align === 'center' && styles['CustomSelectInput--align-center'], !children && styles['CustomSelectInput--empty'], multiline && styles['CustomSelectInput--multiline'], sizeY !== 'regular' && sizeYClassNames[sizeY], before && styles['CustomSelectInput--hasBefore'], after && styles['CustomSelectInput--hasAfter'], className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: styles['CustomSelectInput__input-group'],
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles['CustomSelectInput__container'], className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: styles['CustomSelectInput__title'],
                        children: showLabelOrPlaceholder && title
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