import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { NativeSelect } from '../NativeSelect/NativeSelect';
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export const Select = (_param)=>{
    var { children, className } = _param, props = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, clearButtonTestId, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, noMaxHeight, autoHideScrollbar, autoHideScrollbarDelay, labelTextTestId, nativeSelectTestId, after, mode, pattern, minLength, maxLength, readOnly, getSelectInputRef, overscrollBehavior, beforeAlign, afterAlign } = props, restProps = _object_without_properties(props, [
        "options",
        "searchable",
        "emptyText",
        "onInputChange",
        "filterFn",
        "popupDirection",
        "renderOption",
        "renderDropdown",
        "fetching",
        "onClose",
        "onOpen",
        "icon",
        "ClearButton",
        "allowClearButton",
        "clearButtonTestId",
        "dropdownOffsetDistance",
        "dropdownAutoWidth",
        "forceDropdownPortal",
        "noMaxHeight",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "labelTextTestId",
        "nativeSelectTestId",
        "after",
        "mode",
        "pattern",
        "minLength",
        "maxLength",
        "readOnly",
        "getSelectInputRef",
        "overscrollBehavior",
        "beforeAlign",
        "afterAlign"
    ]);
    const { deviceType } = useAdaptivityConditionalRender();
    const nativeProps = restProps;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            deviceType.desktop && /*#__PURE__*/ _jsx(CustomSelect, _object_spread({
                className: classNames(className, deviceType.desktop.className)
            }, props)),
            deviceType.mobile && /*#__PURE__*/ _jsx(NativeSelect, _object_spread_props(_object_spread({
                className: classNames(className, deviceType.mobile.className)
            }, nativeProps), {
                children: options.map(({ label, value, disabled })=>/*#__PURE__*/ _jsx("option", {
                        value: value,
                        disabled: disabled,
                        children: label
                    }, `${value}`))
            }))
        ]
    });
};

//# sourceMappingURL=Select.js.map