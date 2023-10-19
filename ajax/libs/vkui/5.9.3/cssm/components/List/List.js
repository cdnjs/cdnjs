import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { ListContext } from './ListContext';
import styles from './List.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = ({ children, ...restProps })=>{
    const [isDragging, toggleDrag] = React.useState(false);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        role: "list",
        ...restProps,
        baseClassName: classNames(styles['List'], isDragging && 'vkuiInternalList--dragging')
    }, /*#__PURE__*/ React.createElement(ListContext.Provider, {
        value: React.useMemo(()=>({
                toggleDrag
            }), [])
    }, children));
};

//# sourceMappingURL=List.js.map