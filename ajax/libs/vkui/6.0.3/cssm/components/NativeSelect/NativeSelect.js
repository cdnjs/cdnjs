import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { callMultiple } from '../../lib/callMultiple';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import styles from '../Select/Select.module.css';
const sizeYClassNames = {
    none: styles['Select--sizeY-none'],
    ['compact']: styles['Select--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ const NativeSelect = ({ style, align, placeholder, children, className, getRef, getRootRef, disabled, multiline, selectType = 'default', status, icon = /*#__PURE__*/ React.createElement(DropdownIcon, null), before, onChange, ...restProps })=>{
    const [title, setTitle] = React.useState('');
    const [empty, setEmpty] = React.useState(false);
    const selectRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    const checkSelectedOption = ()=>{
        const selectedOption = selectRef.current?.options[selectRef.current.selectedIndex];
        if (selectedOption) {
            setTitle(selectedOption.text);
            setEmpty(selectedOption.value === '' && placeholder != null);
        }
    };
    useIsomorphicLayoutEffect(checkSelectedOption, [
        children
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        className: classNames(styles['Select'], 'vkuiInternalNativeSelect', before && styles['Select--hasBefore'], empty && styles['Select--empty'], multiline && styles['Select--multiline'], align === 'center' && styles['Select--align-center'], align === 'right' && styles['Select--align-right'], sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: getFormFieldModeFromSelectType(selectType)
    }, /*#__PURE__*/ React.createElement("select", {
        ...restProps,
        disabled: disabled,
        className: styles['Select__el'],
        onChange: callMultiple(onChange, checkSelectedOption),
        ref: selectRef
    }, placeholder && /*#__PURE__*/ React.createElement("option", {
        value: ""
    }, placeholder), children), /*#__PURE__*/ React.createElement("div", {
        className: styles['Select__container'],
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        className: styles['Select__title'],
        selectType: selectType
    }, title)));
};
export { NativeSelect };

//# sourceMappingURL=NativeSelect.js.map