import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAutoFocus } from '../../hooks/useAutoFocus';
import { useExternRef } from '../../hooks/useExternRef';
import { getFormFieldModeFromSelectType } from '../../lib/select';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { SelectTypography } from '../SelectTypography/SelectTypography';
const sizeYClassNames = {
    none: "vkuiSelect--sizeY-none",
    ['compact']: "vkuiSelect--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */ export const SelectMimicry = (_param)=>{
    var { tabIndex = 0, placeholder, children, align, getRootRef, multiline, disabled, onClick, before, after = /*#__PURE__*/ React.createElement(DropdownIcon, null), selectType = 'default', status, className, autoFocus } = _param, restProps = _object_without_properties(_param, [
        "tabIndex",
        "placeholder",
        "children",
        "align",
        "getRootRef",
        "multiline",
        "disabled",
        "onClick",
        "before",
        "after",
        "selectType",
        "status",
        "className",
        "autoFocus"
    ]);
    const rootRef = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    useAutoFocus(rootRef, autoFocus);
    return /*#__PURE__*/ React.createElement(FormField, _object_spread_props(_object_spread({}, restProps), {
        tabIndex: disabled ? undefined : tabIndex,
        className: classNames("vkuiSelect", sizeY !== 'regular' && sizeYClassNames[sizeY], !children && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === 'center' && "vkuiSelect--align-center", align === 'right' && "vkuiSelect--align-right", before && "vkuiSelect--hasBefore", className),
        getRootRef: rootRef,
        onClick: disabled ? undefined : onClick,
        disabled: disabled,
        before: before,
        after: after,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSelect__container"
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        selectType: selectType,
        className: "vkuiSelect__title"
    }, title)));
};

//# sourceMappingURL=SelectMimicry.js.map