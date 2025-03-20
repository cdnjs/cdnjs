import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useFocusWithin } from "../../hooks/useFocusWithin.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { getFormFieldModeFromSelectType } from "../../lib/select.js";
import { FormField } from "../FormField/FormField.js";
import { SelectTypography } from "../SelectTypography/SelectTypography.js";
import { Text } from "../Typography/Text/Text.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const sizeYClassNames = {
    none: "vkuiCustomSelect__sizeYNone",
    compact: "vkuiCustomSelect__sizeYCompact"
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
    const input = /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
        type: "text"
    }, restProps), {
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: classNames("vkuiCustomSelect__el", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "vkuiCustomSelect__elCursorPointer"),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    }));
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FormField, {
        Component: "div",
        style: style,
        className: classNames("vkuiCustomSelect__host", align === 'right' && "vkuiCustomSelect__alignRight", align === 'center' && "vkuiCustomSelect__alignCenter", !children && "vkuiCustomSelect__empty", multiline && "vkuiCustomSelect__multiline", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiCustomSelect__hasBefore", after && "vkuiCustomSelect__hasAfter", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: getFormFieldModeFromSelectType(selectType),
        status: status,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "vkuiCustomSelect__inputGroup",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiCustomSelect__container", className),
                    tabIndex: -1,
                    "aria-hidden": true,
                    "data-testid": labelTextTestId,
                    children: /*#__PURE__*/ _jsx(SelectTypography, {
                        selectType: selectType,
                        className: "vkuiCustomSelect__title",
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