'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useStableCallback } from "../../../hooks/useStableCallback.js";
import { DropdownIcon } from "../../DropdownIcon/DropdownIcon.js";
import { NOT_SELECTED } from "../../NativeSelect/NativeSelect.js";
import { CustomSelectClearButton } from "../CustomSelectClearButton.js";
/* eslint-enable jsdoc/require-jsdoc */ export function useAfterItems({ value, nativeSelectValue, isControlledOutside, opened, allowClearButton, ClearButton = CustomSelectClearButton, onClearButtonClick, clearButtonTestId, disabled, readOnly, icon: iconProp }) {
    const onClearButtonClickCb = useStableCallback(onClearButtonClick);
    const controlledValueSet = isControlledOutside && value !== NOT_SELECTED.CUSTOM;
    const uncontrolledValueSet = !isControlledOutside && nativeSelectValue !== NOT_SELECTED.NATIVE;
    const clearButtonShown = allowClearButton && !opened && (controlledValueSet || uncontrolledValueSet);
    const clearButton = React.useMemo(()=>{
        if (!clearButtonShown) {
            return null;
        }
        return /*#__PURE__*/ _jsx(ClearButton, {
            className: iconProp === undefined ? "vkuiCustomSelect__clearIcon" : undefined,
            onClick: onClearButtonClickCb,
            disabled: disabled,
            "data-testid": clearButtonTestId
        });
    }, [
        clearButtonShown,
        ClearButton,
        iconProp,
        onClearButtonClickCb,
        disabled,
        clearButtonTestId
    ]);
    const icon = React.useMemo(()=>{
        if (iconProp !== undefined) {
            return iconProp;
        }
        return /*#__PURE__*/ _jsx(DropdownIcon, {
            className: clearButtonShown ? "vkuiCustomSelect__dropdownIcon" : undefined,
            opened: opened
        });
    }, [
        clearButtonShown,
        iconProp,
        opened
    ]);
    return React.useMemo(()=>!readOnly && (icon || clearButtonShown) && /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                clearButton,
                icon
            ]
        }), [
        clearButton,
        clearButtonShown,
        icon,
        readOnly
    ]);
}

//# sourceMappingURL=useAfterItems.js.map