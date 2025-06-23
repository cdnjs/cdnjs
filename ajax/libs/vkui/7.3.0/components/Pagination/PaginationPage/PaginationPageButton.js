/* eslint-disable jsdoc/require-jsdoc */ import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable.js";
import { Text } from "../../Typography/Text/Text.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import { getPaginationPageClassNames } from "./usePaginationPageClasses.js";
const getTappablePropsFromPaginationPage = (opts)=>{
    const { isCurrent = false, getPageLabel, children, className, disabled, sizeY } = opts, restProps = _object_without_properties(opts, [
        "isCurrent",
        "getPageLabel",
        "children",
        "className",
        "disabled",
        "sizeY"
    ]);
    const pageClassNames = getPaginationPageClassNames({
        isCurrent,
        disabled,
        sizeY
    });
    const pageLabel = getPageLabel === null || getPageLabel === void 0 ? void 0 : getPageLabel(isCurrent);
    return _object_spread({
        'className': classNames(pageClassNames, className),
        'activeMode': "vkuiPaginationPage__stateActive",
        'hoverMode': "vkuiPaginationPage__stateHover",
        'focusVisibleMode': 'outside',
        'aria-current': isCurrent ? true : undefined,
        'disabled': disabled,
        'children': /*#__PURE__*/ _jsxs(Text, {
            normalize: false,
            children: [
                pageLabel && /*#__PURE__*/ _jsxs(VisuallyHidden, {
                    children: [
                        pageLabel,
                        " "
                    ]
                }),
                children
            ]
        }),
        'data-page': children
    }, restProps);
};
export const PaginationPageButton = (_param)=>{
    var { renderPageButton } = _param, restProps = _object_without_properties(_param, [
        "renderPageButton"
    ]);
    const tappableProps = getTappablePropsFromPaginationPage(restProps);
    if (typeof renderPageButton === 'function') {
        return renderPageButton(tappableProps);
    }
    return /*#__PURE__*/ _jsx(Tappable, _object_spread({}, tappableProps));
};

//# sourceMappingURL=PaginationPageButton.js.map