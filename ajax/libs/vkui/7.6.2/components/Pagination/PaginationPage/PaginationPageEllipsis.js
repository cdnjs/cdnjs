'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable jsdoc/require-jsdoc */ import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Text } from "../../Typography/Text/Text.js";
import { usePaginationPageClassNames } from "./usePaginationPageClasses.js";
export const PaginationPageEllipsis = (_param)=>{
    var { className, disabled } = _param, restProps = _object_without_properties(_param, [
        "className",
        "disabled"
    ]);
    const paginationClassNames = usePaginationPageClassNames({
        isCurrent: false,
        disabled
    });
    return /*#__PURE__*/ _jsx(Text, _object_spread_props(_object_spread({
        className: classNames(paginationClassNames, "vkuiPaginationPage__typeEllipsis", className)
    }, restProps), {
        children: "…"
    }));
};

//# sourceMappingURL=PaginationPageEllipsis.js.map