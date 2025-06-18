import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable.js";
import { Text } from "../../Typography/Text/Text.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import { getPaginationPageClassNames } from "./usePaginationPageClasses.js";
import styles from "./PaginationPage.module.css";
const getTappablePropsFromPaginationPage = (opts)=>{
    const { isCurrent = false, getPageLabel, children, className, disabled, sizeY, ...restProps } = opts;
    const pageClassNames = getPaginationPageClassNames({
        isCurrent,
        disabled,
        sizeY
    });
    const pageLabel = getPageLabel?.(isCurrent);
    return {
        'className': classNames(pageClassNames, className),
        'activeMode': styles.stateActive,
        'hoverMode': styles.stateHover,
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
        'data-page': children,
        ...restProps
    };
};
export const PaginationPageButton = ({ renderPageButton, ...restProps })=>{
    const tappableProps = getTappablePropsFromPaginationPage(restProps);
    if (typeof renderPageButton === 'function') {
        return renderPageButton(tappableProps);
    }
    return /*#__PURE__*/ _jsx(Tappable, {
        ...tappableProps
    });
};

//# sourceMappingURL=PaginationPageButton.js.map