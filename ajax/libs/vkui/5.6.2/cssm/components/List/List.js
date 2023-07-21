import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ListContext } from './ListContext';
import styles from './List.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = ({ children, className, ...restProps })=>{
    const [isDragging, toggleDrag] = React.useState(false);
    return /*#__PURE__*/ React.createElement("div", {
        role: "list",
        ...restProps,
        className: classNames(styles['List'], isDragging && 'vkuiInternalList--dragging', className)
    }, /*#__PURE__*/ React.createElement(ListContext.Provider, {
        value: React.useMemo(()=>({
                toggleDrag
            }), [])
    }, children));
};

//# sourceMappingURL=List.js.map