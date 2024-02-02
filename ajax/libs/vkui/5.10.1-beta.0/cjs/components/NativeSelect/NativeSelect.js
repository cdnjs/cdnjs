"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NativeSelect", {
    enumerable: true,
    get: function() {
        return NativeSelect;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _select = require("../../lib/select");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _DropdownIcon = require("../DropdownIcon/DropdownIcon");
var _FormField = require("../FormField/FormField");
var _SelectTypography = require("../SelectTypography/SelectTypography");
var sizeYClassNames = _define_property._({
    none: "vkuiSelect--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSelect--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ var NativeSelect = function(_param) {
    var style = _param.style, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, align = _param.align, placeholder = _param.placeholder, children = _param.children, className = _param.className, getRef = _param.getRef, getRootRef = _param.getRootRef, disabled = _param.disabled, multiline = _param.multiline, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, status = _param.status, _param_icon = _param.icon, icon = _param_icon === void 0 ? /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, null) : _param_icon, before = _param.before, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties._(_param, [
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
    var _React_useState = _sliced_to_array._(_react.useState(""), 2), title = _React_useState[0], setTitle = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(false), 2), empty = _React_useState1[0], setEmpty = _React_useState1[1];
    var _useEnsuredControl1 = _sliced_to_array._((0, _useEnsuredControl.useEnsuredControl)({
        defaultValue: defaultValue,
        disabled: disabled,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl1[0], onChange = _useEnsuredControl1[1];
    var selectRef = (0, _useExternRef.useExternRef)(getRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
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
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        Component: "div",
        className: (0, _vkjs.classNames)("vkuiSelect", "vkuiInternalNativeSelect", before && "vkuiSelect--hasBefore", empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === "center" && "vkuiSelect--align-center", align === "right" && "vkuiSelect--align-right", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        before: before,
        after: icon,
        status: status,
        mode: (0, _select.getFormFieldModeFromSelectType)(selectType)
    }, /*#__PURE__*/ _react.createElement("select", _object_spread_props._(_object_spread._({}, restProps), {
        disabled: disabled,
        className: "vkuiSelect__el",
        onChange: onChange,
        value: value,
        ref: selectRef
    }), placeholder && /*#__PURE__*/ _react.createElement("option", {
        value: ""
    }, placeholder), children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSelect__container",
        "aria-hidden": true
    }, /*#__PURE__*/ _react.createElement(_SelectTypography.SelectTypography, {
        className: "vkuiSelect__title",
        selectType: selectType
    }, title)));
};

//# sourceMappingURL=NativeSelect.js.map