import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Text } from '../../Typography/Text/Text';
import { usePaginationPageClassNames } from './usePaginationPageClasses';
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
        className: classNames(paginationClassNames, "vkuiPaginationPage--type-ellipsis", className)
    }, restProps), {
        children: "…"
    }));
};

//# sourceMappingURL=PaginationPageEllipsis.js.map