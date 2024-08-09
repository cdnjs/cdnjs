import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { useAdaptivityHasPointer } from "../../hooks/useAdaptivityHasPointer";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { NativeSelect } from "../NativeSelect/NativeSelect";
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */ export var Select = function(_param) {
    var children = _param.children, props = _object_without_properties(_param, [
        "children"
    ]);
    var _props_options = props.options, options = _props_options === void 0 ? [] : _props_options, searchable = props.searchable, emptyText = props.emptyText, onInputChange = props.onInputChange, filterFn = props.filterFn, popupDirection = props.popupDirection, renderOption = props.renderOption, renderDropdown = props.renderDropdown, fetching = props.fetching, onClose = props.onClose, onOpen = props.onOpen, icon = props.icon, ClearButton = props.ClearButton, allowClearButton = props.allowClearButton, clearButtonTestId = props.clearButtonTestId, dropdownOffsetDistance = props.dropdownOffsetDistance, fixDropdownWidth = props.fixDropdownWidth, forceDropdownPortal = props.forceDropdownPortal, noMaxHeight = props.noMaxHeight, autoHideScrollbar = props.autoHideScrollbar, autoHideScrollbarDelay = props.autoHideScrollbarDelay, labelTextTestId = props.labelTextTestId, nativeSelectTestId = props.nativeSelectTestId, after = props.after, mode = props.mode, restProps = _object_without_properties(props, [
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
        "fixDropdownWidth",
        "forceDropdownPortal",
        "noMaxHeight",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "labelTextTestId",
        "nativeSelectTestId",
        "after",
        "mode"
    ]);
    var hasPointer = useAdaptivityHasPointer();
    var nativeProps = restProps;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/ React.createElement(CustomSelect, props), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/ React.createElement(NativeSelect, nativeProps, options.map(function(param) {
        var label = param.label, value = param.value;
        return /*#__PURE__*/ React.createElement("option", {
            value: value,
            key: "".concat(value)
        }, label);
    })));
};

//# sourceMappingURL=Select.js.map