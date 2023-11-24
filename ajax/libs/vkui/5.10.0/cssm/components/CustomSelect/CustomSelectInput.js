import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import { SizeType } from '../../lib/adaptivity';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import { Text } from '../Typography/Text/Text';
import styles from './CustomSelectInput.module.css';
const sizeYClassNames = {
    none: styles['CustomSelectInput--sizeY-none'],
    [SizeType.COMPACT]: styles['CustomSelectInput--sizeY-compact']
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
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        style: style,
        className: classNames(styles['CustomSelectInput'], align === 'right' && styles['CustomSelectInput--align-right'], align === 'center' && styles['CustomSelectInput--align-center'], !children && styles['CustomSelectInput--empty'], multiline && styles['CustomSelectInput--multiline'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], before && styles['CustomSelectInput--hasBefore'], after && styles['CustomSelectInput--hasAfter'], className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['CustomSelectInput__input-group']
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['CustomSelectInput__container'], className),
        tabIndex: -1,
        "aria-hidden": true,
        "data-testid": labelTextTestId
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        selectType: selectType,
        className: styles['CustomSelectInput__title']
    }, showLabelOrPlaceholder && title)), /*#__PURE__*/ React.createElement(Text, {
        ...restProps,
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        type: "text",
        className: classNames(styles['CustomSelectInput__el'], (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && styles['CustomSelectInput__el--cursor-pointer']),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    })));
};

//# sourceMappingURL=CustomSelectInput.js.map