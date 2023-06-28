"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Input", {
    enumerable: true,
    get: function() {
        return Input;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _formField = require("../FormField/FormField");
var sizeYClassNames = _defineProperty({
    none: "vkuiInput--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiInput--sizeY-compact");
var Input = function(_param) {
    var _param_type = _param.type, type = _param_type === void 0 ? "text" : _param_type, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, style = _param.style, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _objectWithoutProperties(_param, [
        "type",
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "mode"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_formField.FormField, {
        style: style,
        className: (0, _vkjs.classNames)("vkuiInput", align === "right" && "vkuiInput--align-right", align === "center" && "vkuiInput--align-center", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ _react.createElement("input", _objectSpreadProps(_objectSpread({}, restProps), {
        type: type,
        className: "vkuiInput__el",
        ref: getRef
    })));
};

//# sourceMappingURL=Input.js.map