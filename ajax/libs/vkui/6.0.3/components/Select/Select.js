import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { useAdaptivityHasPointer } from '../../hooks/useAdaptivityHasPointer';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { NativeSelect } from '../NativeSelect/NativeSelect';
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export const Select = (_param)=>{
    var { children } = _param, props = _object_without_properties(_param, [
        "children"
    ]);
    const { options = [], searchable, emptyText, onInputChange, filterFn, popupDirection, renderOption, renderDropdown, fetching, onClose, onOpen, icon, ClearButton, allowClearButton, clearButtonTestId, dropdownOffsetDistance, dropdownAutoWidth, forceDropdownPortal, noMaxHeight, autoHideScrollbar, autoHideScrollbarDelay, labelTextTestId, nativeSelectTestId, after, mode } = props, restProps = _object_without_properties(props, [
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
        "mode"
    ]);
    const hasPointer = useAdaptivityHasPointer();
    const nativeProps = restProps;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ React.createElement(CustomSelect, props), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ React.createElement(NativeSelect, nativeProps, options.map(({ label, value })=>/*#__PURE__*/ React.createElement("option", {
            value: value,
            key: `${value}`
        }, label))));
};

//# sourceMappingURL=Select.js.map