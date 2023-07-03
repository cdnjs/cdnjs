import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ChipsInputBase } from "../ChipsInputBase/ChipsInputBase";
import { FormField } from "../FormField/FormField";
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsInput
 */ export var ChipsInput = function(_param) {
    var style = _param.style, className = _param.className, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "getRootRef",
        "before",
        "after",
        "status",
        "mode"
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        getRootRef: getRootRef,
        className: classNames("vkuiChipsInput", "vkuiInternalChipsInput", className),
        style: style,
        disabled: restProps.disabled,
        before: before,
        after: after,
        role: "application",
        "aria-disabled": restProps.disabled,
        "aria-readonly": restProps.readOnly,
        status: status,
        mode: mode
    }, /*#__PURE__*/ React.createElement(ChipsInputBase, restProps));
};

//# sourceMappingURL=ChipsInput.js.map