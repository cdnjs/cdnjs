'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20ChevronUp, Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender/index.js";
export const DropdownIcon = (_param)=>{
    var { opened = false, className } = _param, restProps = _object_without_properties(_param, [
        "opened",
        "className"
    ]);
    const { sizeY } = useAdaptivityConditionalRender();
    const IconCompact = opened ? Icon20ChevronUp : Icon20Dropdown;
    const IconRegular = opened ? Icon24ChevronUp : Icon24ChevronDown;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            sizeY.compact && /*#__PURE__*/ _jsx(IconCompact, _object_spread({
                className: classNames(sizeY.compact.className, className)
            }, restProps)),
            sizeY.regular && /*#__PURE__*/ _jsx(IconRegular, _object_spread({
                className: classNames(sizeY.regular.className, className)
            }, restProps))
        ]
    });
};

//# sourceMappingURL=DropdownIcon.js.map