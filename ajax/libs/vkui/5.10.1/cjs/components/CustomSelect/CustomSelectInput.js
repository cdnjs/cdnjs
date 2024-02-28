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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useExternRef = require("../../hooks/useExternRef");
var _useFocusWithin = require("../../hooks/useFocusWithin");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _select = require("../../lib/select");
var _FormField = require("../FormField/FormField");
var _SelectTypography = require("../SelectTypography/SelectTypography");
var _Text = require("../Typography/Text/Text");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _define_property._({
    none: "vkuiCustomSelectInput--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiCustomSelectInput--sizeY-compact");
var CustomSelectInput = function(_param) {
    var _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, style = _param.style, before = _param.before, after = _param.after, status = _param.status, children = _param.children, placeholder = _param.placeholder, _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, multiline = _param.multiline, disabled = _param.disabled, fetching = _param.fetching, labelTextTestId = _param.labelTextTestId, restProps = _object_without_properties._(_param, [
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
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var title = children || placeholder;
    var showLabelOrPlaceholder = !Boolean(restProps.value);
    var handleRootRef = (0, _useExternRef.useExternRef)(getRootRef);
    var focusWithin = (0, _useFocusWithin.useFocusWithin)(handleRootRef);
    var input = /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({
        type: "text"
    }, restProps), {
        disabled: disabled && !fetching,
        readOnly: restProps.readOnly || disabled && fetching,
        Component: "input",
        normalize: false,
        className: (0, _vkjs.classNames)("vkuiCustomSelectInput__el", (restProps.readOnly || showLabelOrPlaceholder && !focusWithin) && "vkuiCustomSelectInput__el--cursor-pointer"),
        getRootRef: getRef,
        placeholder: children ? "" : placeholder
    }));
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        Component: "div",
        style: style,
        className: (0, _vkjs.classNames)("vkuiCustomSelectInput", align === "right" && "vkuiCustomSelectInput--align-right", align === "center" && "vkuiCustomSelectInput--align-center", !children && "vkuiCustomSelectInput--empty", multiline && "vkuiCustomSelectInput--multiline", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], before && "vkuiCustomSelectInput--hasBefore", after && "vkuiCustomSelectInput--hasAfter", className),
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
    }, showLabelOrPlaceholder && title)), restProps.readOnly && platform === "ios" ? /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, input) : input));
};

//# sourceMappingURL=CustomSelectInput.js.map