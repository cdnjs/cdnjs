import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
/**
 * @see https://vkui.io/components/modal-dismiss-button
 */ export const ModalDismissButton = (_param)=>{
    var { children = 'Закрыть', className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _jsxs(ModalOutsideButton, _object_spread_props(_object_spread({
        className: classNames("vkuiModalDismissButton__host", className)
    }, restProps), {
        children: [
            children && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ _jsx(Icon20Cancel, {})
        ]
    }));
};

//# sourceMappingURL=ModalDismissButton.js.map