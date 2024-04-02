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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _callMultiple = require("../../lib/callMultiple");
const _select = require("../../lib/select");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _DropdownIcon = require("../DropdownIcon/DropdownIcon");
const _FormField = require("../FormField/FormField");
const _SelectTypography = require("../SelectTypography/SelectTypography");
const sizeYClassNames = {
    none: "vkuiSelect--sizeY-none",
    ['compact']: "vkuiSelect--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ const NativeSelect = (_param)=>{
    var { style, align, placeholder, children, className, getRef, getRootRef, disabled, multiline, selectType = 'default', status, icon = /*#__PURE__*/ _react.createElement(_DropdownIcon.DropdownIcon, null), before, onChange } = _param, restProps = _object_without_properties._(_param, [
        "style",
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
        "onChange"
    ]);
    const [title, setTitle] = _react.useState('');
    const [empty, setEmpty] = _react.useState(false);
    const selectRef = (0, _useExternRef.useExternRef)(getRef);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const checkSelectedOption = ()=>{
        var _selectRef_current;
        const selectedOption = (_selectRef_current = selectRef.current) === null || _selectRef_current === void 0 ? void 0 : _selectRef_current.options[selectRef.current.selectedIndex];
        if (selectedOption) {
            setTitle(selectedOption.text);
            setEmpty(selectedOption.value === '' && placeholder != null);
        }
    };
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(checkSelectedOption, [
        children
    ]);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        Component: "div",
        className: (0, _vkjs.classNames)("vkuiSelect", 'vkuiInternalNativeSelect', before && "vkuiSelect--hasBefore", empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", align === 'center' && "vkuiSelect--align-center", align === 'right' && "vkuiSelect--align-right", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
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
        onChange: (0, _callMultiple.callMultiple)(onChange, checkSelectedOption),
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