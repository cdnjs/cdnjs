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
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var sizeYClassNames = _defineProperty({
    none: "vkuiFormField--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiFormField--sizeY-compact");
var FormField = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, children = _param.children, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, disabled = _param.disabled, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useState = _slicedToArray(_react.useState(false), 2), hover = _React_useState[0], setHover = _React_useState[1];
    var handleMouseEnter = function(e) {
        e.stopPropagation();
        setHover(true);
    };
    var handleMouseLeave = function(e) {
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRootRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: (0, _vkjs.classNames)("vkuiFormField", mode === "default" && "vkuiFormField--mode-default", status !== "default" && ({
            error: "vkuiFormField--status-error",
            valid: "vkuiFormField--status-valid"
        })[status], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", className)
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