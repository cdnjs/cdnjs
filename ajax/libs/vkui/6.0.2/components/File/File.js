import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Button } from '../Button/Button';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/File
 */ export const File = (_param)=>{
    var { children = 'Выберите файл', align = 'left', size, mode, stretched, before, after, loading, className, style, getRef, getRootRef, appearance } = _param, restProps = _object_without_properties(_param, [
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
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({
        title: ""
    }, restProps), {
        Component: "input",
        type: "file",
        getRootRef: getRef
    })), children);
};

//# sourceMappingURL=File.js.map