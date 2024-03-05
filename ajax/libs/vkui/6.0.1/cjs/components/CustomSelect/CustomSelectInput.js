"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectInput", {
    enumerable: true,
    get: function() {
        return CustomSelectInput;
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
const _useFocusWithin = require("../../hooks/useFocusWithin");
const _usePlatform = require("../../hooks/usePlatform");
const _select = require("../../lib/select");
const _FormField = require("../FormField/FormField");
const _SelectTypography = require("../SelectTypography/SelectTypography");
const _Text = require("../Typography/Text/Text");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiCustomSelectInput--sizeY-none",
    compact: "vkuiCustomSelectInput--sizeY-compact"
};
const CustomSelectInput = (_param)=>{
    var { align = 'left', getRef, className, getRootRef, style, before, after, status, children, placeholder, selectType = 'default', multiline, disabled, fetching, labelTextTestId } = _param, restProps = _object_without_properties._(_param, [
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "children",
        "placeholder",
        "selectType",
        "multiline",
        "disabled",
        "fetching",
        "labelTextTestId"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const title = children || placeholder;
    const showLabelOrPlaceholder = !Boolean(restProps.value);
    const handleRootRef = (0, _useExternRef.useExternRef)(getRootRef);
    const focusWithin = (0, _useFocusWithin.useFocusWithin)(handleRootRef);
    const input = /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({
        type: "text"
    }, restProps), {
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: (0, _vkjs.classNames)("vkuiCustomSelectInput__el", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "vkuiCustomSelectInput__el--cursor-pointer"),
        getRootRef: getRef,
        placeholder: children ? '' : placeholder
    }));
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        Component: "div",
        style: style,
        className: (0, _vkjs.classNames)("vkuiCustomSelectInput", align === 'right' && "vkuiCustomSelectInput--align-right", align === 'center' && "vkuiCustomSelectInput--align-center", !children && "vkuiCustomSelectInput--empty", multiline && "vkuiCustomSelectInput--multiline", sizeY !== 'regular' && sizeYClassNames[sizeY], before && "vkuiCustomSelectInput--hasBefore", after && "vkuiCustomSelectInput--hasAfter", className),
        getRootRef: handleRootRef,
        before: before,
        after: after,
        disabled: disabled,
        mode: (0, _select.getFormFieldModeFromSelectType)(selectType),
        status: status
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectInput__input-group"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCustomSelectInput__container", className),
        tabIndex: -1,
        "aria-hidden": true,
        "data-testid": labelTextTestId
    }, /*#__PURE__*/ _react.createElement(_SelectTypography.SelectTypography, {
        selectType: selectType,
        className: "vkuiCustomSelectInput__title"
    }, showLabelOrPlaceholder && title)), restProps.readOnly && platform === 'ios' ? /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, input) : input));
};

//# sourceMappingURL=CustomSelectInput.js.map