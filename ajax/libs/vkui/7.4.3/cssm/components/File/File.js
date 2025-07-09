import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button } from "../Button/Button.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */ export const File = ({ children = 'Выберите файл', align = 'left', size, mode, stretched, before, after, loading, className, style, getRef, getRootRef, appearance, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(Button, {
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
        disabled: restProps.disabled,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                title: "",
                ...restProps,
                Component: "input",
                type: "file",
                getRootRef: getRef
            }),
            children
        ]
    });
};

//# sourceMappingURL=File.js.map