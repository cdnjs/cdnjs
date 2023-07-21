"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "File", {
    enumerable: true,
    get: function() {
        return File;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _Button = require("../Button/Button");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var File = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? "Выберите файл" : _param_children, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, size = _param.size, mode = _param.mode, stretched = _param.stretched, before = _param.before, after = _param.after, loading = _param.loading, className = _param.className, style = _param.style, getRef = _param.getRef, getRootRef = _param.getRootRef, appearance = _param.appearance, restProps = _object_without_properties._(_param, [
        "children",
        "align",
        "size",
        "mode",
        "stretched",
        "before",
        "after",
        "loading",
        "className",
        "style",
        "getRef",
        "getRootRef",
        "appearance"
    ]);
    return /*#__PURE__*/ _react.createElement(_Button.Button, {
        Component: "label",
        align: align,
        className: className,
        stretched: stretched,
        mode: mode,
        appearance: appearance,
        size: size,
        before: before,
        after: after,
        loading: loading,
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "file",
        getRootRef: getRef
    })), children);
};

//# sourceMappingURL=File.js.map