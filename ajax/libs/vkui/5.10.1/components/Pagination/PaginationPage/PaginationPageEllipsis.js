import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Text } from "../../Typography/Text/Text";
import { usePaginationPageClassNames } from "./usePaginationPageClasses";
export var PaginationPageEllipsis = function(_param) {
    var className = _param.className, disabled = _param.disabled, restProps = _object_without_properties(_param, [
        "className",
        "disabled"
    ]);
    var paginationClassNames = usePaginationPageClassNames({
        isCurrent: false,
        disabled: disabled
    });
    return /*#__PURE__*/ React.createElement(Text, _object_spread({
        className: classNames(paginationClassNames, "vkuiPaginationPage--type-ellipsis", className)
    }, restProps), "…");
};

//# sourceMappingURL=PaginationPageEllipsis.js.map