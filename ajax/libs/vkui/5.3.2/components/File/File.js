import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Button } from "../Button/Button";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */ export var File = function(_param) {
    var _param_children = _param.children, children = _param_children === void 0 ? "Выберите файл" : _param_children, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, size = _param.size, mode = _param.mode, stretched = _param.stretched, before = _param.before, after = _param.after, loading = _param.loading, className = _param.className, style = _param.style, getRef = _param.getRef, getRootRef = _param.getRootRef, appearance = _param.appearance, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement(Button, {
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
    }, /*#__PURE__*/ React.createElement(VisuallyHiddenInput, _object_spread_props(_object_spread({}, restProps), {
        type: "file",
        getRef: getRef
    })), children);
};

//# sourceMappingURL=File.js.map