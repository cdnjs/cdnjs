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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _Button = require("../Button/Button");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const File = (_param)=>{
    var { children = 'Выберите файл', align = 'left', size, mode, stretched, before, after, loading, className, style, getRef, getRootRef, appearance } = _param, restProps = _object_without_properties._(_param, [
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
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({
        title: ""
    }, restProps), {
        Component: "input",
        type: "file",
        getRootRef: getRef
    })), children);
};

//# sourceMappingURL=File.js.map