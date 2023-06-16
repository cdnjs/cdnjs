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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useEnsuredControl = require("../../hooks/useEnsuredControl");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _dropdownIcon = require("../DropdownIcon/DropdownIcon");
var _formField = require("../FormField/FormField");
var _selectTypography = require("../SelectTypography/SelectTypography");
var sizeYClassNames = _defineProperty({
    none: "vkuiSelect--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSelect--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/NativeSelect
 */ var NativeSelect = function(_param) {
    var style = _param.style, _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, align = _param.align, placeholder = _param.placeholder, children = _param.children, className = _param.className, getRef = _param.getRef, getRootRef = _param.getRootRef, disabled = _param.disabled, multiline = _param.multiline, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, status = _param.status, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _objectWithoutProperties(_param, [
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
        "onChange",
        "value"
    ]);
    var _React_useState = _slicedToArray(_react.useState(""), 2), title = _React_useState[0], setTitle = _React_useState[1];
    var _React_useState1 = _slicedToArray(_react.useState(false), 2), empty = _React_useState1[0], setEmpty = _React_useState1[1];
    var _useEnsuredControl1 = _slicedToArray((0, _useEnsuredControl.useEnsuredControl)({
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
    return /*#__PURE__*/ _react.createElement(_formField.FormField, {
        Component: "label",
        className: (0, _vkjs.classNames)("vkuiSelect", "vkuiInternalNativeSelect", empty && "vkuiSelect--empty", multiline && "vkuiSelect--multiline", (placeholder === null || placeholder === void 0 ? void 0 : placeholder.length) && "vkuiSelect--hasPlaceholder", align === "center" && "vkuiSelect--align-center", align === "right" && "vkuiSelect--align-right", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: disabled,
        after: /*#__PURE__*/ _react.createElement(_dropdownIcon.DropdownIcon, null),
        status: status
    }, /*#__PURE__*/ _react.createElement("select", _objectSpreadProps(_objectSpread({}, restProps), {
        disabled: disabled,
        className: "vkuiSelect__el",
        onChange: onChange,
        value: value,
        ref: selectRef
    }), placeholder && /*#__PURE__*/ _react.createElement("option", {
        value: ""
    }, placeholder), children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSelect__container"
    }, /*#__PURE__*/ _react.createElement(_selectTypography.SelectTypography, {
        className: "vkuiSelect__title",
        selectType: selectType
    }, title)));
};

//# sourceMappingURL=NativeSelect.js.map