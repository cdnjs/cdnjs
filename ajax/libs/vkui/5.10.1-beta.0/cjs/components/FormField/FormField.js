"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormField", {
    enumerable: true,
    get: function() {
        return FormField;
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
var _useExternRef = require("../../hooks/useExternRef");
var _useFocusVisibleClassName = require("../../hooks/useFocusVisibleClassName");
var _useFocusWithin = require("../../hooks/useFocusWithin");
var _adaptivity = require("../../lib/adaptivity");
var sizeYClassNames = _define_property._({
    none: "vkuiFormField--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiFormField--sizeY-compact");
var stylesStatus = {
    error: "vkuiFormField--status-error",
    valid: "vkuiFormField--status-valid"
};
var FormField = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, children = _param.children, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, disabled = _param.disabled, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, className = _param.className, restProps = _object_without_properties._(_param, [
        "Component",
        "status",
        "children",
        "getRootRef",
        "before",
        "after",
        "disabled",
        "mode",
        "className"
    ]);
    var elRef = (0, _useExternRef.useExternRef)(getRootRef);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useState = _sliced_to_array._(_react.useState(false), 2), hover = _React_useState[0], setHover = _React_useState[1];
    var focusWithin = (0, _useFocusWithin.useFocusWithin)(elRef);
    var focusVisibleClassNames = (0, _useFocusVisibleClassName.useFocusVisibleClassName)({
        focusVisible: focusWithin,
        mode: "vkuiFormField--focus-visible"
    });
    var handleMouseEnter = function(e) {
        e.stopPropagation();
        setHover(true);
    };
    var handleMouseLeave = function(e) {
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, restProps), {
        ref: elRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: (0, _vkjs.classNames)("vkuiFormField", mode === "default" && "vkuiFormField--mode-default", status !== "default" && stylesStatus[status], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", focusVisibleClassNames, className)
    }), before && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiFormField__before"
    }, before), children, after && /*#__PURE__*/ _react.createElement("span", {
        className: (0, _vkjs.classNames)("vkuiFormField__after", "vkuiInternalFormField__after")
    }, after), /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: "vkuiFormField__border"
    }));
};

//# sourceMappingURL=FormField.js.map