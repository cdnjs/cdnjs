/* eslint-disable jsdoc/require-jsdoc */ import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
/**
 * @private
 */ export const ModalOutlet = (_param)=>{
    var { className, hidden, isDesktop, children, getRootRef, disableModalOverlay } = _param, restProps = _object_without_properties(_param, [
        "className",
        "hidden",
        "isDesktop",
        "children",
        "getRootRef",
        "disableModalOverlay"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
        ref: getRootRef,
        className: classNames(className, "vkuiModalOutlet__host", isDesktop && "vkuiModalOutlet__hostDesktop", disableModalOverlay && "vkuiModalOutlet__disableModalOverlay"),
        hidden: hidden,
        "aria-hidden": hidden
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=ModalOutlet.js.map