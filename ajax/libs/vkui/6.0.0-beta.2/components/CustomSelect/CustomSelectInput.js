import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const sizeYClassNames = {
    none: "vkuiCustomSelectInput--sizeY-none",
    compact: "vkuiCustomSelectInput--sizeY-compact"
};
/**
 * @since 5.10.0
 * @private
 */ export const CustomSelectInput = (_param)=>{
    var { align = 'left', getRef, className, getRootRef, style, before, after, status, children, placeholder, selectType = 'default', multiline, disabled, fetching, labelTextTestId } = _param, restProps = _object_without_properties(_param, [
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "children",
        "placeholder",
        "selectType",
        "multiline",
        "disabled",
        "fetching",
        "labelTextTestId"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const title = children || placeholder;
    const showLabelOrPlaceholder = !Boolean(restProps.value);
    const handleRootRef = useExternRef(getRootRef);
    const focusWithin = useFocusWithin(handleRootRef);
    const input = /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({
        type: "text"
    }, restProps), {
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: classNames("vkuiCustomSelectInput__el", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "vkuiCustomSelectInput__el--cursor-pointer"),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    }));
    const platform = usePlatform();
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        style: style,
        className: classNames("vkuiCustomSelectInput", align === 'right' && "vkuiCustomSelectInput--align-right", align === 'center' && "vkuiCustomSelectInput--align-center", !children && "vkuiCustomSelectInput--empty", multiline && "vkuiCustomSelectInput--multiline", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiCustomSelectInput--hasBefore", after && "vkuiCustomSelectInput--hasAfter", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCustomSelectInput__input-group"
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCustomSelectInput__container", className),
        tabIndex: -1,
        "aria-hidden": true,
        "data-testid": labelTextTestId
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        selectType: selectType,
        className: "vkuiCustomSelectInput__title"
    }, showLabelOrPlaceholder && title)), restProps.readOnly && platform === 'ios' ? /*#__PURE__*/ React.createElement(VisuallyHidden, null, input) : input));
};

//# sourceMappingURL=CustomSelectInput.js.map