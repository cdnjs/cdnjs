import * as React from 'react';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { NativeSelect } from '../NativeSelect/NativeSelect';
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export const Select = ({ children, ...props })=>{
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, selectType, autoHideScrollbar, autoHideScrollbarDelay, ...nativeProps // TODO: https://github.com/Microsoft/TypeScript/issues/12936
     } = props;
    const hasPointer = useAdaptivityHasPointer();
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ React.createElement(CustomSelect, props), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ React.createElement(NativeSelect, nativeProps, options.map(({ label, value })=>/*#__PURE__*/ React.createElement("option", {
            value: value,
            key: `${value}`
        }, label))));
};

//# sourceMappingURL=Select.js.map