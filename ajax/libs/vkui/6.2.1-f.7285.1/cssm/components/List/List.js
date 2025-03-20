import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = ({ children, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(RootComponent, {
        role: "list",
        ...restProps,
        children: [
            children,
            /*#__PURE__*/ _jsx("div", {
                "aria-hidden": true,
                ...DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP
            })
        ]
    });
};

//# sourceMappingURL=List.js.map