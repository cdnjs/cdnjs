import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAutoFocus } from '../../hooks/useAutoFocus';
import { useExternRef } from '../../hooks/useExternRef';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
import styles from '../Select/Select.module.css';
const sizeYClassNames = {
    none: styles['Select--sizeY-none'],
    ['compact']: styles['Select--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */ export const SelectMimicry = ({ tabIndex = 0, placeholder, children, align, getRootRef, multiline, disabled, onClick, before, after = /*#__PURE__*/ React.createElement(DropdownIcon, null), selectType = 'default', status, className, autoFocus, ...restProps })=>{
    const rootRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    useAutoFocus(rootRef, autoFocus);
    return /*#__PURE__*/ React.createElement(FormField, {
        ...restProps,
        tabIndex: disabled ? undefined : tabIndex,
        className: classNames(styles['Select'], sizeY !== 'regular' && sizeYClassNames[sizeY], !children && styles['Select--empty'], multiline && styles['Select--multiline'], align === 'center' && styles['Select--align-center'], align === 'right' && styles['Select--align-right'], before && styles['Select--hasBefore'], className),
        getRootRef: rootRef,
        onClick: disabled ? undefined : onClick,
        disabled: disabled,
        before: before,
        after: after,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Select__container']
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        selectType: selectType,
        className: styles['Select__title']
    }, title)));
};

//# sourceMappingURL=SelectMimicry.js.map