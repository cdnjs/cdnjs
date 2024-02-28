import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { getFormFieldModeFromSelectType } from "../../lib/select";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { SelectTypography } from "../SelectTypography/SelectTypography";
var sizeYClassNames = _define_property({
    none: "vkuiSelect--sizeY-none"
}, SizeType.COMPACT, "vkuiSelect--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ var NativeSelect = function(_param) {
    var style = _param.style, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, align = _param.align, placeholder = _param.placeholder, children = _param.children, className = _param.className, getRef = _param.getRef, getRootRef = _param.getRootRef, disabled = _param.disabled, multiline = _param.multiline, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, status = _param.status, _param_icon = _param.icon, icon = _param_icon === void 0 ? /*#__PURE__*/ React.createElement(DropdownIcon, null) : _param_icon, before = _param.before, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties(_param, [
        "style",
        "defaultValue",
        "align",
        "placeholder",
        "children",
        "className",
        "getRef",
        "getRootRef",
        "disabled",
        "multiline",
        "selectType",
        "status",
        "icon",
        "before",
        "onChange",
        "value"
    ]);
    var _React_useState = _sliced_to_array(React.useState(""), 2), title = _React_useState[0], setTitle = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), empty = _React_useState1[0], setEmpty = _React_useState1[1];
    var _useEnsuredControl = _sliced_to_array(useEnsuredControl({
        defaultValue: defaultValue,
        disabled: disabled,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl[0], onChange = _useEnsuredControl[1];
    var selectRef = useExternRef(getRef);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    useIsomorphicLayoutEffect(function() {
        var _selectRef_current;
        var selectedOption = (_selectRef_current = selectRef.current) === null || _selectRef_current === void 0 ? void 0 : _selectRef_current.options[selectRef.current.selectedIndex];
        if (selectedOption) {
            setTitle(selectedOption.text);
            setEmpty(selectedOption.value === "" && placeholder != null);
        }
    }, [
        value,
        children
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        Component: "div",
        className: classNames("vkuiSelect", "vkuiInternalNativeSelect", before && "vkuiSelect--hasBefore", empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === "center" && "vkuiSelect--align-center", align === "right" && "vkuiSelect--align-right", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: getFormFieldModeFromSelectType(selectType)
    }, /*#__PURE__*/ React.createElement("select", _object_spread_props(_object_spread({}, restProps), {
        disabled: disabled,
        className: "vkuiSelect__el",
        onChange: onChange,
        value: value,
        ref: selectRef
    }), placeholder && /*#__PURE__*/ React.createElement("option", {
        value: ""
    }, placeholder), children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSelect__container",
        "aria-hidden": true
    }, /*#__PURE__*/ React.createElement(SelectTypography, {
        className: "vkuiSelect__title",
        selectType: selectType
    }, title)));
};
export { NativeSelect };

//# sourceMappingURL=NativeSelect.js.map