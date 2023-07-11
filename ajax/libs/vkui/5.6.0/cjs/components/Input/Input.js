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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _FormField = require("../FormField/FormField");
var _Text = require("../Typography/Text/Text");
var sizeYClassNames = _define_property._({
    none: "vkuiInput--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiInput--sizeY-compact");
var Input = function(_param) {
    var _param_type = _param.type, type = _param_type === void 0 ? "text" : _param_type, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, style = _param.style, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _object_without_properties._(_param, [
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
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        style: style,
        className: (0, _vkjs.classNames)("vkuiInput", align === "right" && "vkuiInput--align-right", align === "center" && "vkuiInput--align-center", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        normalize: false,
        type: type,
        className: "vkuiInput__el",
        getRootRef: getRef
    })));
};

//# sourceMappingURL=Input.js.map