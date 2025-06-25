import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { Flex } from "../Flex/Flex.js";
/**
 * @private
 */ export const ModalOutsideButtons = (_param)=>{
    var { className, children } = _param, restProps = _object_without_properties(_param, [
        "className",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(Flex, _object_spread_props(_object_spread({
        direction: "column",
        className: classNames("vkuiModalOutsideButtons__host", className)
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=ModalOutsideButtons.js.map