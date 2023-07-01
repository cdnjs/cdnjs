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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _chipsInputBase = require("../ChipsInputBase/ChipsInputBase");
var _formField = require("../FormField/FormField");
var ChipsInput = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _objectWithoutProperties(_param, [
        "style",
        "className",
        "getRootRef",
        "before",
        "after",
        "status",
        "mode"
    ]);
    return /*#__PURE__*/ _react.createElement(_formField.FormField, {
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
    }, /*#__PURE__*/ _react.createElement(_chipsInputBase.ChipsInputBase, restProps));
};

//# sourceMappingURL=ChipsInput.js.map