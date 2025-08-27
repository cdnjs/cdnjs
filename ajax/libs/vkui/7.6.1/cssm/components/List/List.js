import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from "../../hooks/useDraggableWithDomApi/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./List.module.css";
/**
 * @see https://vkui.io/components/cell#list
 */ export const List = ({ children, gap = 0, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        role: "list",
        baseClassName: styles.host,
        baseStyle: {
            gridGap: gap
        },
        ...restProps,
        children: [
            children,
            /*#__PURE__*/ _jsx("div", {
                "aria-hidden": true,
                ...DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP,
                className: styles.placeholder
            })
        ]
    });
};

//# sourceMappingURL=List.js.map