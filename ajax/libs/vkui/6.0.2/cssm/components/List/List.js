import * as React from 'react';
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = ({ children, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        role: "list",
        ...restProps
    }, children, /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        ...DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP
    }));
};

//# sourceMappingURL=List.js.map