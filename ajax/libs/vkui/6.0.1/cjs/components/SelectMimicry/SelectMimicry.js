"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectMimicry", {
    enumerable: true,
    get: function() {
        return SelectMimicry;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useAutoFocus = require("../../hooks/useAutoFocus");
const _useExternRef = require("../../hooks/useExternRef");
const _select = require("../../lib/select");
const _DropdownIcon = require("../DropdownIcon/DropdownIcon");
const _FormField = require("../FormField/FormField");
const _SelectTypography = require("../SelectTypography/SelectTypography");
const sizeYClassNames = {
    none: "vkuiSelect--sizeY-none",
    ['compact']: "vkuiSelect--sizeY-compact"
};
const SelectMimicry = (_param)=>{
    var { tabIndex = 0, placeholder, children, align, getRootRef, multiline, disabled, onClick, before, after = /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, null), selectType = 'default', status, className, autoFocus } = _param, restProps = _object_without_properties._(_param, [
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
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const title = children || placeholder;
    (0, _useAutoFocus.useAutoFocus)(rootRef, autoFocus);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, _object_spread_props._(_object_spread._({}, restProps), {
        tabIndex: disabled ? undefined : tabIndex,
        className: (0, _vkjs.classNames)("vkuiSelect", sizeY !== 'regular' && sizeYClassNames[sizeY], !children && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === 'center' && "vkuiSelect--align-center", align === 'right' && "vkuiSelect--align-right", before && "vkuiSelect--hasBefore", className),
        getRootRef: rootRef,
        onClick: disabled ? undefined : onClick,
        disabled: disabled,
        before: before,
        after: after,
        mode: (0, _select.getFormFieldModeFromSelectType)(selectType),
        status: status
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSelect__container"
    }, /*#__PURE__*/ _react.createElement(_SelectTypography.SelectTypography, {
        selectType: selectType,
        className: "vkuiSelect__title"
    }, title)));
};

//# sourceMappingURL=SelectMimicry.js.map