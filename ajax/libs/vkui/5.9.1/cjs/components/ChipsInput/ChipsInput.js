"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChipsInput", {
    enumerable: true,
    get: function() {
        return ChipsInput;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _ChipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _FormField = require("../FormField/FormField");
var ChipsInput = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _object_without_properties._(_param, [
        "style",
        "className",
        "getRootRef",
        "before",
        "after",
        "status",
        "mode"
    ]);
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        getRootRef: getRootRef,
        className: (0, _vkjs.classNames)("vkuiChipsInput", "vkuiInternalChipsInput", className),
        style: style,
        disabled: restProps.disabled,
        before: before,
        after: after,
        role: "application",
        "aria-disabled": restProps.disabled,
        "aria-readonly": restProps.readOnly,
        status: status,
        mode: mode
    }, /*#__PURE__*/ _react.createElement(_ChipsInputBase.ChipsInputBase, restProps));
};

//# sourceMappingURL=ChipsInput.js.map