import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { NativeSelect } from '../NativeSelect/NativeSelect';
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export const Select = ({ children, className, ...props })=>{
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, clearButtonTestId, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, noMaxHeight, autoHideScrollbar, autoHideScrollbarDelay, labelTextTestId, nativeSelectTestId, after, mode, pattern, minLength, maxLength, readOnly, getSelectInputRef, overscrollBehavior, beforeAlign, afterAlign, ...restProps } = props;
    const { deviceType } = useAdaptivityConditionalRender();
    const nativeProps = restProps;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            deviceType.desktop && /*#__PURE__*/ _jsx(CustomSelect, {
                className: classNames(className, deviceType.desktop.className),
                ...props
            }),
            deviceType.mobile && /*#__PURE__*/ _jsx(NativeSelect, {
                className: classNames(className, deviceType.mobile.className),
                ...nativeProps,
                children: options.map(({ label, value, disabled })=>/*#__PURE__*/ _jsx("option", {
                        value: value,
                        disabled: disabled,
                        children: label
                    }, `${value}`))
            })
        ]
    });
};

//# sourceMappingURL=Select.js.map