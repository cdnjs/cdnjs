'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { CustomScrollView } from "../CustomScrollView/CustomScrollView.js";
export const ModalPageContent = (_param)=>{
    var { children, className, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "getRootRef"
    ]);
    return /*#__PURE__*/ _jsx(CustomScrollView, _object_spread_props(_object_spread({
        className: classNames(className, "vkuiModalPageContent__host"),
        getRootRef: getRootRef
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=ModalPageContent.js.map