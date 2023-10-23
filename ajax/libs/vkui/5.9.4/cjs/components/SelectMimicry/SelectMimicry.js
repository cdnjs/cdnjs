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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAutoFocus = require("../../hooks/useAutoFocus");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _select = require("../../lib/select");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _FormField = require("../FormField/FormField");
var _SelectTypography = require("../SelectTypography/SelectTypography");
var sizeYClassNames = _define_property._({
    none: "vkuiSelect--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSelect--sizeY-compact");
var SelectMimicry = function(_param) {
    var _param_tabIndex = _param.tabIndex, tabIndex = _param_tabIndex === void 0 ? 0 : _param_tabIndex, placeholder = _param.placeholder, children = _param.children, align = _param.align, getRootRef = _param.getRootRef, multiline = _param.multiline, disabled = _param.disabled, onClick = _param.onClick, before = _param.before, _param_after = _param.after, after = _param_after === void 0 ? /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, null) : _param_after, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, status = _param.status, className = _param.className, autoFocus = _param.autoFocus, restProps = _object_without_properties._(_param, [
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
    var rootRef = (0, _useExternRef.useExternRef)(getRootRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var title = children || placeholder;
    (0, _useAutoFocus.useAutoFocus)(rootRef, autoFocus);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, _object_spread_props._(_object_spread._({}, restProps), {
        tabIndex: disabled ? undefined : tabIndex,
        className: (0, _vkjs.classNames)("vkuiSelect", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], !children && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === "center" && "vkuiSelect--align-center", align === "right" && "vkuiSelect--align-right", before && "vkuiSelect--hasBefore", className),
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