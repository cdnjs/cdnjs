import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable";
import { Text } from "../../Typography/Text/Text";
import { getPageAriaLabelDefault } from "../utils";
import { usePaginationPageClassNames } from "./usePaginationPageClasses";
export var PaginationPageButton = function(_param) {
    var _param_isCurrent = _param.isCurrent, isCurrent = _param_isCurrent === void 0 ? false : _param_isCurrent, _param_getPageAriaLabel = _param.getPageAriaLabel, getPageAriaLabel = _param_getPageAriaLabel === void 0 ? getPageAriaLabelDefault : _param_getPageAriaLabel, children = _param.children, className = _param.className, disabled = _param.disabled, restProps = _object_without_properties(_param, [
        "isCurrent",
        "getPageAriaLabel",
        "children",
        "className",
        "disabled"
    ]);
    var paginationClassNames = usePaginationPageClassNames({
        isCurrent: isCurrent,
        disabled: disabled
    });
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        className: classNames(paginationClassNames, className),
        activeMode: "vkuiPaginationPage--state-active",
        hoverMode: "vkuiPaginationPage--state-hover",
        hasActive: !isCurrent,
        hasHover: !isCurrent,
        focusVisibleMode: "outside",
        "data-page": children,
        "aria-current": isCurrent ? true : undefined,
        "aria-label": getPageAriaLabel(children, isCurrent),
        disabled: disabled
    }, restProps), /*#__PURE__*/ React.createElement(Text, {
        normalize: false
    }, children));
};

//# sourceMappingURL=PaginationPageButton.js.map