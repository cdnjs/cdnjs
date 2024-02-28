import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAutoFocus } from "../../hooks/useAutoFocus";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { getFormFieldModeFromSelectType } from "../../lib/select";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { SelectTypography } from "../SelectTypography/SelectTypography";
var sizeYClassNames = _define_property({
    none: "vkuiSelect--sizeY-none"
}, SizeType.COMPACT, "vkuiSelect--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/SelectMimicry
 */ export var SelectMimicry = function(_param) {
    var _param_tabIndex = _param.tabIndex, tabIndex = _param_tabIndex === void 0 ? 0 : _param_tabIndex, placeholder = _param.placeholder, children = _param.children, align = _param.align, getRootRef = _param.getRootRef, multiline = _param.multiline, disabled = _param.disabled, onClick = _param.onClick, before = _param.before, _param_after = _param.after, after = _param_after === void 0 ? /*#__PURE__*/ React.createElement(DropdownIcon, null) : _param_after, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, status = _param.status, className = _param.className, autoFocus = _param.autoFocus, restProps = _object_without_properties(_param, [
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
    var rootRef = useExternRef(getRootRef);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var title = children || placeholder;
    useAutoFocus(rootRef, autoFocus);
    return /*#__PURE__*/ React.createElement(FormField, _object_spread_props(_object_spread({}, restProps), {
        tabIndex: disabled ? undefined : tabIndex,
        className: classNames("vkuiSelect", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], !children && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === "center" && "vkuiSelect--align-center", align === "right" && "vkuiSelect--align-right", before && "vkuiSelect--hasBefore", className),
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